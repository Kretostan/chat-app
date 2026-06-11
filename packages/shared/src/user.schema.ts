import z from "zod";

export const publicUserSchema = z.object({
  id: z.number(),
  email: z.email(),
  username: z.string(),
  avatarUrl: z.string(),
  createdAt: z.string(),
  tokenVersion: z.number(),
});

export type PublicUser = z.infer<typeof publicUserSchema>;
