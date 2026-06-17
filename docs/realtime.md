# Real-time (WebSocket) – Contract

## Transport

- **Library:** Socket.io (NestJS Gateway).
- **Auth:** JWT extracted from `Cookie` during the handshake.

## Rules

- **Reconnect:** Client uses *Exponential Backoff* (start: 1s, max: 30s).
- **ACK (Acknowledgment):** **YES**. The client waits for a server callback
after sending a message. If a timeout occurs (5s),
the UI displays a "failed to send" state.
- **Idempotency:** `clientMessageId` is **required**. The server ignores messages
with duplicate IDs from the same sender.
- **Room Logic:** Upon connection, the server automatically joins the socket
to rooms named after the `chatRoomId`.

## Events (MVP)

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `room:create` | `{ userIds: number[] }` | Create a conversation (DM or group) |
| `room:join` | `{ roomId }` | Join a room (subscribe to events) |
| `message:send` | `{ roomId, content, clientMessageId }` | Send a message |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `room:created` | `{ id, name, type, isPrivate, createdAt }` | Confirmation with new room data |
| `message:new` | `{ id, userId, chatRoomId, content, createdAt, clientMessageId }` | Broadcast new message to room |
| `exception` | `{ status: "error", message: string }` | Validation or permission error |

## v0.2 Signaling (Multimedia)

| Event | Direction | Payload |
|-------|-----------|---------|
| `call:initiate` | client → server | `{ roomId, type: 'audio' \| 'video' }` |
| `call:offer` | client → server | `{ roomId, sdp }` |
| `call:answer` | client → server | `{ roomId, sdp }` |
| `call:ice-candidate` | client → server | `{ roomId, candidate }` |
| `call:end` | client → server | End the call |

## Event Backlog

- `typing_start / typing_stop`
- `message_read` (updates DB status)
- `user_presence` (online/offline status)
