import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  isCurrent: integer("is_current", { mode: "boolean" })
    .notNull()
    .default(false),
  deviceName: text("device_name"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  lastUsedAt: text("last_used_at").notNull(),
});

export const insertSessionsSchema = createInsertSchema(sessions);
export const selectSessionsSchema = createSelectSchema(sessions);
