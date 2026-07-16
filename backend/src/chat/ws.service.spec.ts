import { Test, TestingModule } from "@nestjs/testing";
import { ChatRoomDetails } from "shared";
import { WebSocket } from "ws";
import { DatabaseService } from "../db/database.service";
import { WsService } from "./ws.service";

const createMockSocket = (id: number) =>
  ({
    readyState: WebSocket.OPEN,
    send: jest.fn(),
    close: jest.fn(),
    user: { id, username: `user${id}`, sessionId: 1 },
  }) as unknown as WebSocket;

describe("WsService", () => {
  let service: WsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WsService,
        {
          provide: DatabaseService,
          useValue: {
            db: {
              select: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<WsService>(WsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addClient", () => {
    it("should add a new socket for an existing user", () => {
      const s1 = createMockSocket(1);
      service.addClient(s1);

      expect(service["userSockets"].has(1)).toBe(true);
      expect(service["socketUsers"].get(s1)).toBe(1);
      expect(service["userSockets"].get(1).size).toBe(1);
    });

    it("should add multiple sockets for the same user (multiple sessions)", () => {
      const s1 = createMockSocket(1);
      const s2 = createMockSocket(1);
      service.addClient(s1);
      service.addClient(s2);

      expect(service["userSockets"].get(1).size).toBe(2);
    });

    it("should separate different users", () => {
      const s1 = createMockSocket(1);
      const s2 = createMockSocket(2);
      service.addClient(s1);
      service.addClient(s2);

      expect(service["userSockets"].get(1).size).toBe(1);
      expect(service["userSockets"].get(2).size).toBe(1);
    });
  });

  describe("removeClient", () => {
    it("should remove one socket for a user with multiple sockets", () => {
      const s1 = createMockSocket(1);
      const s2 = createMockSocket(1);
      service.addClient(s1);
      service.addClient(s2);

      expect(service["userSockets"].get(1).size).toBe(2);

      service.removeClient(s1);

      expect(service["userSockets"].get(1).size).toBe(1);
      expect([...service["userSockets"].get(1)]).not.toContain(s1);
    });

    it("should remove the user entirely when last socket disconnects", () => {
      const s1 = createMockSocket(1);
      service.addClient(s1);

      service.removeClient(s1);

      expect(service["userSockets"].has(1)).toBe(false);
    });

    it("should do nothing for a socket not in the map", () => {
      const s1 = createMockSocket(1);
      expect(() => service.removeClient(s1)).not.toThrow();
      expect(service["userSockets"].has(1)).toBe(false);
    });

    it("should remove correct user when multiple users are connected", () => {
      const s1 = createMockSocket(1);
      const s2 = createMockSocket(2);
      service.addClient(s1);
      service.addClient(s2);

      service.removeClient(s1);

      expect(service["userSockets"].has(1)).toBe(false);
      expect(service["userSockets"].has(2)).toBe(true);
    });
  });

  describe("handleSendMessage", () => {
    it("should broadcast to all members in the room", async () => {
      const s1 = createMockSocket(1);
      const s2 = createMockSocket(2);
      service.addClient(s1);
      service.addClient(s2);

      const mockMembers = [
        { userId: 1 },
        { userId: 2 },
        { userId: 3 }, // not connected
      ];

      (service["databaseService"].db.select as jest.Mock).mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockResolvedValue(mockMembers),
        }),
      } as never);

      const message = {
        event: "message:new",
        data: {
          id: 1,
          content: "hi",
          userId: 1,
          createdAt: new Date().toISOString(),
          chatRoomId: 42,
        },
        ackId: "abc-123",
      };
      await service.handleSendMessage(42, message);

      // s1 (sender) SHOULD also receive the broadcast back
      expect(s1.send).toHaveBeenCalled();

      // s2 should receive it
      expect(s2.send).toHaveBeenCalledTimes(1);
    });

    it("should send to all sockets when user has multiple active sessions", async () => {
      const s1 = createMockSocket(1);
      const s2Client = createMockSocket(1); // same user, different socket
      const s3 = createMockSocket(2);
      service.addClient(s1);
      service.addClient(s2Client);
      service.addClient(s3);

      jest.spyOn(service["databaseService"].db, "select").mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockResolvedValue([{ userId: 1 }, { userId: 2 }]),
        }),
      } as never);

      const message = {
        event: "message:new",
        data: {
          id: 1,
          content: "hi",
          userId: 1,
          createdAt: new Date().toISOString(),
          chatRoomId: 42,
        },
        ackId: "abc-123",
      };
      await service.handleSendMessage(42, message);

      expect(s1.send).toHaveBeenCalled();
      expect(s2Client.send).toHaveBeenCalled();
    });

    it("should skip sockets that are not OPEN", async () => {
      const s1 = createMockSocket(1);
      const sClosing: WebSocket = createMockSocket(2) as unknown as WebSocket;

      Object.defineProperty(sClosing, "readyState", {
        value: WebSocket.CLOSING,
        writable: true,
        configurable: true,
      });

      service.addClient(s1);
      service.addClient(sClosing);

      jest.spyOn(service["databaseService"].db, "select").mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockResolvedValue([{ userId: 1 }, { userId: 2 }]),
        }),
      } as never);

      const message = {
        event: "message:new",
        data: {
          id: 1,
          content: "hi",
          userId: 1,
          createdAt: new Date().toISOString(),
          chatRoomId: 42,
        },
        ackId: "abc-123",
      };
      await service.handleSendMessage(42, message);

      expect(s1.send).toHaveBeenCalled();
      expect(sClosing.send).not.toHaveBeenCalled();
    });

    it("should not throw when some members have no sockets", async () => {
      jest.spyOn(service["databaseService"].db, "select").mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockResolvedValue([
            { userId: 100 }, // not connected
            { userId: 200 }, // also not connected
          ]),
        }),
      } as never);

      const message = {
        event: "message:new",
        data: {
          id: 1,
          content: "hi",
          userId: 1,
          createdAt: new Date().toISOString(),
          chatRoomId: 42,
        },
        ackId: "abc-123",
      };
      await expect(
        service.handleSendMessage(42, message),
      ).resolves.toBeUndefined();
    });
  });

  describe("handleRoomCreate", () => {
    it("should broadcast room creation to all members except sender", async () => {
      const s1 = createMockSocket(1);
      const s2 = createMockSocket(2);
      service.addClient(s1);
      service.addClient(s2);

      const mockRoom: ChatRoomDetails = {
        id: 99,
        name: "My Room",
        type: "dm",
        isPrivate: true,
        createdAt: new Date().toISOString(),
        members: [
          {
            id: 1,
            username: "user1",
            avatarUrl: null,
            joinedAt: new Date().toISOString(),
          },
          {
            id: 2,
            username: "user2",
            avatarUrl: null,
            joinedAt: new Date().toISOString(),
          },
        ],
        lastMessage: null,
      };

      jest.spyOn(service["databaseService"].db, "select").mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockResolvedValue([{ userId: 1 }, { userId: 2 }]),
        }),
      } as never);

      await service.handleRoomCreate({
        event: "room:created",
        data: mockRoom,
        ackId: "abc-123",
      });

      // creator also receives room:created broadcast
      expect(s1.send).toHaveBeenCalled();

      // member s2 receives room data
      expect(s2.send).toHaveBeenCalledTimes(1);
    });

    it("should not broadcast to members without sockets", async () => {
      const s1 = createMockSocket(1);
      service.addClient(s1);

      const mockRoom: ChatRoomDetails = {
        id: 99,
        name: "My Room",
        type: "dm",
        isPrivate: true,
        createdAt: new Date().toISOString(),
        members: [
          {
            id: 1,
            username: "user1",
            avatarUrl: null,
            joinedAt: new Date().toISOString(),
          },
          {
            id: 3,
            username: "user3",
            avatarUrl: null,
            joinedAt: new Date().toISOString(),
          },
        ],
        lastMessage: null,
      };

      jest.spyOn(service["databaseService"].db, "select").mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockResolvedValue([{ userId: 1 }, { userId: 3 }]),
        }),
      } as never);

      await service.handleRoomCreate({
        event: "room:created",
        data: mockRoom,
        ackId: "abc-123",
      });

      expect(s1.send).toHaveBeenCalled(); // sender excluded
    });

    it("should handle empty member list gracefully", async () => {
      const s1 = createMockSocket(1);
      service.addClient(s1);

      const mockRoom: ChatRoomDetails = {
        id: 99,
        name: null,
        type: "dm",
        isPrivate: true,
        createdAt: new Date().toISOString(),
        members: [],
        lastMessage: null,
      };

      jest.spyOn(service["databaseService"].db, "select").mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockResolvedValue([]),
        }),
      } as never);

      await expect(
        service.handleRoomCreate({
          event: "room:created",
          data: mockRoom,
          ackId: "abc-123",
        }),
      ).resolves.toBeUndefined();
    });
  });

  describe("handleRoomJoin", () => {
    it("should broadcast to all members of the room", async () => {
      const s1 = createMockSocket(1);
      service.addClient(s1);

      jest.spyOn(service["databaseService"].db, "select").mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockResolvedValue([{ userId: 1 }]),
        }),
      } as never);

      const mockRoom: ChatRoomDetails = {
        id: 42,
        name: null,
        type: "dm",
        isPrivate: true,
        createdAt: new Date().toISOString(),
        members: [],
        lastMessage: null,
      };

      await service.handleRoomJoin({
        event: "room:joined",
        data: mockRoom,
        ackId: "abc-123",
      });

      expect(s1.send).toHaveBeenCalledWith(
        JSON.stringify({
          event: "room:joined",
          data: mockRoom,
          ackId: "abc-123",
        }),
      );
    });

    it("should not throw if user has no socket connections", async () => {
      const mockRoom: ChatRoomDetails = {
        id: 99,
        name: null,
        type: "dm",
        isPrivate: false,
        createdAt: new Date().toISOString(),
        members: [],
        lastMessage: null,
      };

      jest.spyOn(service["databaseService"].db, "select").mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockResolvedValue([{ userId: 999 }]),
        }),
      } as never);

      await expect(
        service.handleRoomJoin({
          event: "room:joined",
          data: mockRoom,
          ackId: "abc-123",
        }),
      ).resolves.toBeUndefined();
    });
  });
});
