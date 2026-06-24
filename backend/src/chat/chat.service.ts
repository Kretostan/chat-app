import { Injectable } from "@nestjs/common";
import { desc, eq, inArray } from "drizzle-orm";
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
          members: { with: { user: true } },
          messages: {
            orderBy: [desc(messages.createdAt)],
            limit: 1,
          },
        },
      });

    return roomsWithData.map(
      ({ members, messages: [lastMessage], ...room }) => ({
        ...room,
        members: members.map((m) => ({ ...m.user, joinedAt: m.joinedAt })),
        lastMessage: lastMessage ?? null,
      }),
    );
  }
}
