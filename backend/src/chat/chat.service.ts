import { ForbiddenException, Injectable } from "@nestjs/common";
import { and, desc, eq, inArray } from "drizzle-orm";
import { ChatRoomDetails } from "shared";
import { DatabaseService } from "src/db/database.service";
import { chatRoomMembers, chatRooms, messages } from "src/db/schema";

@Injectable()
export class ChatService {
  constructor(private readonly databaseService: DatabaseService) {}

  async loadRooms(userId: number): Promise<ChatRoomDetails[] | []> {
    const roomsWithData =
      await this.databaseService.db.query.chatRooms.findMany({
        where: inArray(
          chatRooms.id,
          this.databaseService.db
            .select({ id: chatRoomMembers.chatRoomId })
            .from(chatRoomMembers)
            .where(eq(chatRoomMembers.userId, userId)),
        ),
        with: {
          members: {
            with: {
              user: {
                columns: {
                  passwordHash: false,
                  email: false,
                  createdAt: false,
                },
              },
            },
          },
          messages: {
            orderBy: [desc(messages.createdAt)],
            limit: 1,
            columns: { chatRoomId: false, clientMessageId: false },
          },
        },
      });

    return roomsWithData.map(
      ({ members, messages: [lastMessage], ...room }) => ({
        ...room,
        members: members.map((member) => ({
          ...member.user,
          joinedAt: member.joinedAt,
        })),
        lastMessage: lastMessage ?? null,
      }),
    );
  }

  async loadRoom(roomId: number, userId: number) {
    const room = await this.databaseService.db.query.chatRooms.findFirst({
      where: and(
        eq(chatRooms.id, roomId),
        inArray(
          chatRooms.id,
          this.databaseService.db
            .select({
              id: chatRoomMembers.chatRoomId,
            })
            .from(chatRoomMembers)
            .where(eq(chatRoomMembers.userId, userId)),
        ),
      ),
      columns: { lastMessageAt: false, createdAt: false },
      with: {
        messages: {
          orderBy: [desc(messages.createdAt)],
          columns: { chatRoomId: false, clientMessageId: false },
        },
        members: {
          with: {
            user: {
              columns: { passwordHash: false, createdAt: false, email: false },
            },
          },
        },
      },
    });

    if (!room) throw new ForbiddenException();

    return {
      ...room,
      members: room.members.map((member) => ({
        ...member.user,
        joinedAt: member.joinedAt,
      })),
    };
  }
}
