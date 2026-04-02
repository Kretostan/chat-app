# Real-time (WebSocket) – Contract

## Transport

- **Library:** Socket.io (NestJS Gateway).
- **URL:** `wss://api.chatapp.com/`
- **Auth:** JWT extracted from `Cookie` during the handshake.

## Rules

- **Reconnect:** Client uses *Exponential Backoff* (start: 1s, max: 30s).
- **ACK (Acknowledgment):** **YES**. The client waits for a server callback
after sending a message. If a timeout occurs (5s),
the UI displays a "failed to send" state.
- **Idempotency:** `client_message_id` is **required**. The server ignores messages
with duplicate IDs from the same sender.
- **Room Logic:** Upon connection, the server automatically joins the socket
to "Rooms" named after the `conversation_id`.

## Events (MVP)

### Client → Server

- `subscribe`: `(conversation_id)` – Join a specific chat room.
- `send_message`: `{ conversation_id, body, client_message_id }`.

### Server → Client

- `new_message`: `{ id, conversation_id, sender_id, body, created_at,
client_message_id }`.
- `exception`: `{ status: "error", message: string }` – For validation or
permission errors.

## v0.2 Signaling (Multimedia)

- `call_initiate`: `{ conversation_id, type: 'audio' | 'video' }`.
- `call_offer / call_answer`: Signaling data for WebRTC peer-to-peer connection.

## Event Backlog

- `typing_start / typing_stop`
- `message_read` (updates DB status)
- `user_presence` (online/offline status)
