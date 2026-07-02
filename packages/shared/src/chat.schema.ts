import { z } from "zod";

export const chatRoomSchema = z.object({
  id: z.number(),
  name: z.string().max(12).nullable(),
  type: z.string().default("dm"),
  isPrivate: z.boolean().default(true),
  createdAt: z.iso.datetime(),
  lastMessageAt: z.string().nullable(),
});

export const chatRoomMemberSchema = z.object({
  id: z.number(),
  userId: z.number(),
  chatRoomId: z.number(),
  joinedAt: z.iso.datetime(),
});

export const messageSchema = z.object({
  id: z.number(),
  content: z.string().min(1).max(4000),
  userId: z.number(),
  createdAt: z.iso.datetime(),
  clientMessageId: z.string().nullable(),
});

export const createRoomSchema = z
  .object({
    name: z.string().max(12).optional(),
    type: z.string().default("dm"),
    isPrivate: z.boolean().default(true),
    userIds: z.array(z.number()).min(2),
  })
  .refine((data) => data.type !== "group" || !!data.name, {
    error: "Group requires a name",
    path: ["name"],
  });

export const createMessageSchema = z.object({
  content: z.string().min(1).max(4000),
  roomId: z.number(),
  clientMessageId: z.string(),
});

export const roomMemberInfoSchema = z.object({
  id: z.number(),
  username: z.string(),
  avatarUrl: z.string().nullable(),
  joinedAt: z.iso.datetime(),
});

export const lastMessageInfoSchema = z.object({
  id: z.number(),
  content: z.string().min(1).max(4000),
  userId: z.number(),
  createdAt: z.iso.datetime(),
  clientMessageId: z.string().nullable(),
});

export const chatRoomDetailsSchema = chatRoomSchema.extend({
  members: z.array(roomMemberInfoSchema),
  lastMessage: lastMessageInfoSchema.nullable(),
});

export const messagesPaginationSchema = z.object({
  cursor: z.coerce.number().optional(),
  limit: z.coerce.number().min(1).max(100).default(50),
});

export const roomsPaginationSchema = z.object({
  cursor: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\|\d+$/)
    .optional(),
  limit: z.coerce.number().min(1).max(100).default(30),
});

export const paginatedMessagesSchema = z.object({
  messages: z.array(messageSchema),
  hasMore: z.boolean(),
  cursor: z.number().nullable(),
});

export const paginatedRoomsSchema = z.object({
  rooms: z.array(chatRoomDetailsSchema),
  hasMore: z.boolean(),
  cursor: z.string().nullable(),
});

export type RoomMemberInfo = z.infer<typeof roomMemberInfoSchema>;
export type ChatRoomDetails = z.infer<typeof chatRoomDetailsSchema>;
export type PaginatedMessages = z.infer<typeof paginatedMessagesSchema>;
export type MessagesPagination = z.infer<typeof messagesPaginationSchema>;
export type RoomsPagination = z.infer<typeof roomsPaginationSchema>;
export type PaginatedRooms = z.infer<typeof paginatedRoomsSchema>;
