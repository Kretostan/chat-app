import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email"),
  username: z.string().min(3, "Username minimum 3 characters"),
  password: z.string().min(6, "Password minimum 6 characters")
});

export const loginSchema = z.object({
  login: z.string().min(1, "Login is required"),
  password: z.string().min(6, "Password minimum 6 characters")
});

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;

export type AuthValues = RegisterValues | LoginValues;
