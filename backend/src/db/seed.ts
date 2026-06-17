import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const url = process.env.DATABASE_URL ?? "file:./data/chat.db";
const filePath = url.replace("file:", "");
const sqlite = new Database(filePath);
const db = drizzle(sqlite, { schema });

async function main() {
  console.log("Seeding database...");

  // Clear existing data (reverse FK order)
  db.delete(schema.chatRoomMembers).run();
  db.delete(schema.messages).run();
  db.delete(schema.chatRooms).run();
  db.delete(schema.sessions).run();
  db.delete(schema.users).run();
  console.log("Cleared existing data.");

  const [alice] = await db
    .insert(schema.users)
    .values({
      username: "alice",
      email: "alice@example.com",
      passwordHash:
        "$2b$10$qur/2dobJwUKXoWGnIdlDOymUcEce2rEhcSZSFK1AGQ5DUlwenfmu",
      avatarUrl: null,
    })
    .returning();

  const [bob] = await db
    .insert(schema.users)
    .values({
      username: "bob",
      email: "bob@example.com",
      passwordHash:
        "$2b$10$qur/2dobJwUKXoWGnIdlDOymUcEce2rEhcSZSFK1AGQ5DUlwenfmu",
      avatarUrl: null,
    })
    .returning();

  const [charlie] = await db
    .insert(schema.users)
    .values({
      username: "charlie",
      email: "charlie@example.com",
      passwordHash:
        "$2b$10$qur/2dobJwUKXoWGnIdlDOymUcEce2rEhcSZSFK1AGQ5DUlwenfmu",
      avatarUrl: null,
    })
    .returning();

  console.log("Created users:", alice.username, bob.username, charlie.username);

  const [general] = await db
    .insert(schema.chatRooms)
    .values({ name: "General", isPrivate: false, type: "group" })
    .returning();

  const [random] = await db
    .insert(schema.chatRooms)
    .values({ name: "Random", isPrivate: false, type: "group" })
    .returning();

  const [secret] = await db
    .insert(schema.chatRooms)
    .values({ name: "Secret", isPrivate: true, type: "group" })
    .returning();

  const [dmAliceBob] = await db
    .insert(schema.chatRooms)
    .values({ name: null, isPrivate: true, type: "dm" })
    .returning();

  const [dmAliceCharlie] = await db
    .insert(schema.chatRooms)
    .values({ name: null, isPrivate: true, type: "dm" })
    .returning();

  const [dmBobCharlie] = await db
    .insert(schema.chatRooms)
    .values({ name: null, isPrivate: true, type: "dm" })
    .returning();

  console.log(
    "Created rooms:",
    general.name,
    random.name,
    secret.name,
    "(+3 DMs)",
  );

  const baseTime = new Date("2025-01-01T10:00:00.000Z");

  const messagesData = [
    {
      content: "Hey everyone! 👋",
      userId: alice.id,
      chatRoomId: general.id,
      createdAt: new Date(baseTime.getTime() + 0 * 60000).toISOString(),
    },
    {
      content: "Hi Alice! How are you?",
      userId: bob.id,
      chatRoomId: general.id,
      createdAt: new Date(baseTime.getTime() + 1 * 60000).toISOString(),
    },
    {
      content: "Doing great, thanks! Ready to build this chat app 🚀",
      userId: alice.id,
      chatRoomId: general.id,
      createdAt: new Date(baseTime.getTime() + 2 * 60000).toISOString(),
    },
    {
      content: "Same here! Let's go 💪",
      userId: charlie.id,
      chatRoomId: general.id,
      createdAt: new Date(baseTime.getTime() + 3 * 60000).toISOString(),
    },
    {
      content: "Good night everyone! 🌙",
      userId: charlie.id,
      chatRoomId: general.id,
      createdAt: new Date(baseTime.getTime() + 4 * 60000).toISOString(),
    },
    {
      content: "Anyone tried the new feature?",
      userId: bob.id,
      chatRoomId: random.id,
      createdAt: new Date(baseTime.getTime() + 5 * 60000).toISOString(),
    },
    {
      content: "Not yet, what is it?",
      userId: alice.id,
      chatRoomId: random.id,
      createdAt: new Date(baseTime.getTime() + 6 * 60000).toISOString(),
    },
    {
      content: "Real-time messaging with WebSockets!",
      userId: bob.id,
      chatRoomId: random.id,
      createdAt: new Date(baseTime.getTime() + 7 * 60000).toISOString(),
    },
    {
      content: "Sounds awesome 🔥",
      userId: charlie.id,
      chatRoomId: random.id,
      createdAt: new Date(baseTime.getTime() + 8 * 60000).toISOString(),
    },
    {
      content: "I'll check it out tonight",
      userId: alice.id,
      chatRoomId: random.id,
      createdAt: new Date(baseTime.getTime() + 9 * 60000).toISOString(),
    },
    {
      content: "Secret project update: v2 ships next week 🤫",
      userId: alice.id,
      chatRoomId: secret.id,
      createdAt: new Date(baseTime.getTime() + 10 * 60000).toISOString(),
    },
    // DM: alice ↔ bob
    {
      content: "Got any plans for the weekend?",
      userId: alice.id,
      chatRoomId: dmAliceBob.id,
      createdAt: new Date(baseTime.getTime() + 11 * 60000).toISOString(),
    },
    {
      content: "Not yet, you?",
      userId: bob.id,
      chatRoomId: dmAliceBob.id,
      createdAt: new Date(baseTime.getTime() + 12 * 60000).toISOString(),
    },
    // DM: alice ↔ charlie
    {
      content: "Did you see the PR I pushed?",
      userId: alice.id,
      chatRoomId: dmAliceCharlie.id,
      createdAt: new Date(baseTime.getTime() + 13 * 60000).toISOString(),
    },
    // DM: bob ↔ charlie
    {
      content: "Wanna grab a coffee later?",
      userId: bob.id,
      chatRoomId: dmBobCharlie.id,
      createdAt: new Date(baseTime.getTime() + 14 * 60000).toISOString(),
    },
    {
      content: "Sure! ☕",
      userId: charlie.id,
      chatRoomId: dmBobCharlie.id,
      createdAt: new Date(baseTime.getTime() + 15 * 60000).toISOString(),
    },
  ];

  db.insert(schema.chatRoomMembers)
    .values([
      { userId: alice.id, chatRoomId: general.id },
      { userId: bob.id, chatRoomId: general.id },
      { userId: charlie.id, chatRoomId: general.id },
      { userId: alice.id, chatRoomId: random.id },
      { userId: bob.id, chatRoomId: random.id },
      { userId: charlie.id, chatRoomId: random.id },
      { userId: alice.id, chatRoomId: secret.id },
      { userId: bob.id, chatRoomId: secret.id },
      // DM members
      { userId: alice.id, chatRoomId: dmAliceBob.id },
      { userId: bob.id, chatRoomId: dmAliceBob.id },
      { userId: alice.id, chatRoomId: dmAliceCharlie.id },
      { userId: charlie.id, chatRoomId: dmAliceCharlie.id },
      { userId: bob.id, chatRoomId: dmBobCharlie.id },
      { userId: charlie.id, chatRoomId: dmBobCharlie.id },
    ])
    .run();

  console.log("Created chat room members");

  for (const msg of messagesData) {
    await db.insert(schema.messages).values(msg);
  }

  console.log(`Seeded ${messagesData.length} messages`);

  db.update(schema.chatRooms)
    .set({ lastMessageAt: messagesData[4].createdAt })
    .where(eq(schema.chatRooms.id, general.id))
    .run();
  db.update(schema.chatRooms)
    .set({ lastMessageAt: messagesData[9].createdAt })
    .where(eq(schema.chatRooms.id, random.id))
    .run();
  db.update(schema.chatRooms)
    .set({ lastMessageAt: messagesData[10].createdAt })
    .where(eq(schema.chatRooms.id, secret.id))
    .run();
  db.update(schema.chatRooms)
    .set({ lastMessageAt: messagesData[12].createdAt })
    .where(eq(schema.chatRooms.id, dmAliceBob.id))
    .run();
  db.update(schema.chatRooms)
    .set({ lastMessageAt: messagesData[13].createdAt })
    .where(eq(schema.chatRooms.id, dmAliceCharlie.id))
    .run();
  db.update(schema.chatRooms)
    .set({ lastMessageAt: messagesData[15].createdAt })
    .where(eq(schema.chatRooms.id, dmBobCharlie.id))
    .run();

  console.log("Updated lastMessageAt for rooms");
  console.log("Done! ✅");
}

main().catch(console.error);
