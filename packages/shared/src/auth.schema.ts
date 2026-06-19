import z from "zod";

export const registerSchema = z
  .object({
    email: z.email("Invalid email"),
    username: z.string().min(3, "Username minimum 3 characters").max(30),
    password: z.string().min(8, "Password minimum 8 characters").max(128),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  login: z.string().min(3, "Login is required").max(30),
  password: z.string().min(8, "Password minimum 8 characters").max(128),
  deviceName: z.string().optional(),
  sessionUuid: z.string(),
});

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;

export type AuthValues = RegisterValues | LoginValues;
