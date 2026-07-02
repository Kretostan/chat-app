import { Injectable, NotFoundException } from "@nestjs/common";
import { and, desc, eq, inArray, lt, sql } from "drizzle-orm";
import { PaginatedMessages, PaginatedRooms } from "shared";
import { DatabaseService } from "src/db/database.service";
import { chatRoomMembers, chatRooms, messages } from "src/db/schema";

@Injectable()
export class ChatService {
  constructor(private readonly databaseService: DatabaseService) {}

  async loadRooms(
    userId: number,
    cursor?: string,
    limit: number = 30,
  ): Promise<PaginatedRooms> {
    const joinedAtSubquery = sql<string>`
      SELECT ${chatRoomMembers.joinedAt}
      FROM ${chatRoomMembers}
      WHERE ${chatRoomMembers.chatRoomId} = ${chatRooms.id}
      AND ${chatRoomMembers.userId} = ${userId}
    `;

    const sortKey = sql<string>`COALESCE(${chatRooms.lastMessageAt}, ${joinedAtSubquery})`;

    const conditions = [
      inArray(
        chatRooms.id,
        this.databaseService.db
          .select({ id: chatRoomMembers.chatRoomId })
          .from(chatRoomMembers)
          .where(eq(chatRoomMembers.userId, userId)),
      ),
    ];

    if (cursor) {
      const [cursorTimestamp, cursorId] = cursor.split("|");
      conditions.push(
        sql`${sortKey} < ${cursorTimestamp} OR ${sortKey} = ${cursorTimestamp} AND ${chatRooms.id} < ${+cursorId}`,
      );
    }

    const roomsWithData =
      await this.databaseService.db.query.chatRooms.findMany({
        where: and(...conditions),
        limit: limit + 1,
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

    const hasMore = roomsWithData.length > limit;
    const items = hasMore ? roomsWithData.slice(0, limit) : roomsWithData;

    const rooms = roomsWithData.map(
      ({ members, messages: [lastMessage], ...room }) => ({
        ...room,
        members: members.map((member) => ({
          ...member.user,
          joinedAt: member.joinedAt,
        })),
        lastMessage: lastMessage ?? null,
      }),
    );

    const nextCursor = hasMore
      ? (() => {
          const last = items[items.length - 1];
          const userMember = last.members.find(
            (member) => member.userId,
            userId,
          );
          const sortValue =
            last.lastMessageAt ?? userMember?.joinedAt ?? last.createdAt;
          return `${sortValue}|${last.id}`;
        })()
      : null;
    return { rooms, hasMore, cursor: nextCursor };
  }

  async loadRoomDetails(roomId: number, userId: number) {
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
        members: {
          with: {
            user: {
              columns: { passwordHash: false, createdAt: false, email: false },
            },
          },
        },
      },
    });

    if (!room) throw new NotFoundException();

    return {
      ...room,
      members: room.members.map((member) => ({
        ...member.user,
        joinedAt: member.joinedAt,
      })),
    };
  }

  async loadMessages(
    roomdId: number,
    userId: number,
    cursor?: number,
    limit: number = 50,
  ): Promise<PaginatedMessages> {
    const [isMember] = await this.databaseService.db
      .select()
      .from(chatRoomMembers)
      .where(
        and(
          eq(chatRoomMembers.userId, userId),
          eq(chatRoomMembers.chatRoomId, roomdId),
        ),
      );

    if (!isMember) throw new NotFoundException();

    const results = await this.databaseService.db
      .select()
      .from(messages)
      .where(
        and(
          cursor ? lt(messages.id, cursor) : undefined,
          eq(messages.chatRoomId, roomdId),
        ),
      )
      .orderBy(desc(messages.id))
      .limit(limit + 1);

    const hasMore = results.length > limit;
    const items = hasMore ? results.slice(0, limit) : results;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return { messages: items, hasMore, cursor: nextCursor };
  }
}
