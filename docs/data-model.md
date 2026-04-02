# Data Model (PostgreSQL)

## Entities (MVP)

### users

**Description:** Application users and their credentials.

- `id`: uuid (PK, default: uuid_generate_v4())
- `email`: varchar(255) (unique, index)
- `password_hash`: text
- `display_name`: varchar(50)
- `avatar_url`: text (nullable)
- `created_at`: timestamptz (default: now())
- `updated_at`: timestamptz (default: now())

### conversations (chats)

**Description:** Groups or 1:1 direct messages.

- `id`: uuid (PK)
- `type`: enum ('dm', 'group')
- `title`: varchar(100) (nullable – usually empty for DMs)
- `last_message_at`: timestamptz (used for sorting the chat list in UI)
- `created_at`: timestamptz

### conversation_members

**Description:** Junction table (M:N) connecting users to conversations.

- `conversation_id`: uuid (FK, PK)
- `user_id`: uuid (FK, PK)
- `role`: enum ('member', 'admin') (default: 'member')
- `joined_at`: timestamptz (default: now())

**Indexes:**

- Composite Index on `(user_id, conversation_id)` for fast retrieval
of a user's chat list.

### messages

**Description:** The content of the conversations.

- `id`: uuid (PK)
- `conversation_id`: uuid (FK, index)
- `sender_id`: uuid (FK)
- `body`: text (max 4,000 characters)
- `client_message_id`: uuid (unique per `sender_id` to prevent duplicates
during re-transmission)
- `created_at`: timestamptz (index DESC)

---

## Consistency Rules / Notes

- **Access Control:** Every query to `messages` must join with `conversation_members`
to verify the `request.user_id` belongs to that specific chat.
- **Pagination:** Uses a `(created_at, id)` keyset as a cursor to ensure stability
when scrolling while new messages arrive.
- **Integrity:** Deleting a user should not delete messages
(set `sender_id` to null or "Deleted User"), but deleting a conversation
performs a cascade delete on members and messages.
