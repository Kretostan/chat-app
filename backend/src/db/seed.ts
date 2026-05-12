import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const url = process.env.DATABASE_URL ?? "file:./data/chat.db";
const filePath = url.replace("file:", "");
const sqlite = new Database(filePath);
const db = drizzle(sqlite, { schema });

async function main() {
  console.log("Seeding database...");

  // Clear existing data (reverse FK order)
  db.delete(schema.messages).run();
  db.delete(schema.chatRooms).run();
  db.delete(schema.users).run();
  console.log("Cleared existing data.");

  const [alice] = await db
    .insert(schema.users)
    .values({
      username: "alice",
      email: "alice@example.com",
      passwordHash: "$2b$10$placeholder_hash_alice",
      avatarUrl: null,
    })
    .returning();

  const [bob] = await db
    .insert(schema.users)
    .values({
      username: "bob",
      email: "bob@example.com",
      passwordHash: "$2b$10$placeholder_hash_bob",
      avatarUrl: null,
    })
    .returning();

  const [charlie] = await db
    .insert(schema.users)
    .values({
      username: "charlie",
      email: "charlie@example.com",
      passwordHash: "$2b$10$placeholder_hash_charlie",
      avatarUrl: null,
    })
    .returning();

  console.log("Created users:", alice.username, bob.username, charlie.username);

  const [general] = await db
    .insert(schema.chatRooms)
    .values({ name: "General", isPrivate: false })
    .returning();

  const [random] = await db
    .insert(schema.chatRooms)
    .values({ name: "Random", isPrivate: false })
    .returning();

  console.log("Created rooms:", general.name, random.name);

  const messagesData = [
    { content: "Hey everyone! 👋", userId: alice.id, chatRoomId: general.id },
    {
      content: "Hi Alice! How are you?",
      userId: bob.id,
      chatRoomId: general.id,
    },
    {
      content: "Doing great, thanks! Ready to build this chat app 🚀",
      userId: alice.id,
      chatRoomId: general.id,
    },
    {
      content: "Same here! Let's go 💪",
      userId: charlie.id,
      chatRoomId: general.id,
    },
    {
      content: "Anyone tried the new feature?",
      userId: bob.id,
      chatRoomId: random.id,
    },
    {
      content: "Not yet, what is it?",
      userId: alice.id,
      chatRoomId: random.id,
    },
    {
      content: "Real-time messaging with WebSockets!",
      userId: bob.id,
      chatRoomId: random.id,
    },
    { content: "Sounds awesome 🔥", userId: charlie.id, chatRoomId: random.id },
    {
      content: "I'll check it out tonight",
      userId: alice.id,
      chatRoomId: random.id,
    },
    {
      content: "Good night everyone! 🌙",
      userId: charlie.id,
      chatRoomId: general.id,
    },
  ];

  for (const msg of messagesData) {
    await db.insert(schema.messages).values(msg);
  }

  console.log(`Seeded ${messagesData.length} messages`);
  console.log("Done! ✅");
}

main().catch(console.error);
