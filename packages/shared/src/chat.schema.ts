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
  chatRoomId: z.number(),
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
