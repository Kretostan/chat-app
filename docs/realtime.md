# Real-time (WebSocket) – Contract

## Transport

- **Library:** `ws` via `@nestjs/platform-ws` (NestJS Gateway).
- **Port:** Same as HTTP (`:3001` dev / `:3000` prod).
- **Auth:** JWT from httpOnly cookie `access_token`. Browser sends it automatically (same origin). Verified in `handleConnection` via `JwtService`.

## Wire format

All messages are **JSON strings**:

### Client → Server

| Field | Type | Description |
|-------|------|-------------|
| `event` | `string` | Event name |
| `data` | `object` | Payload |
| `ackId` | `string?` | Optional ACK identifier |

### Server → Client

| Field | Type | Description |
|-------|------|-------------|
| `event` | `string` | Event name |
| `data` | `object` | Payload |

### ACK (Server → Client)

| Field | Type | Description |
|-------|------|-------------|
| `event` | `"ack"` | Fixed identifier |
| `data.ackId` | `string` | ID from the original request |
| `data.status` | `"ok" \| "error"` | Operation status |
| `data.data` | `object?` | Payload on success |
| `data.message` | `string?` | Error message |

## Rules

- **Reconnect:** Exponential backoff (1s → 30s), client-side
- **ACK:** Client waits for ACK with matching `ackId`. 5s timeout → UI shows "failed to send"
- **Idempotency:** `clientMessageId` — unique constraint `(userId, clientMessageId)` in DB
- **Room Logic:** Server manages a `roomId → Set<WebSocket>` map via `WsService`

## Events (MVP)

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `message:send` | `{ roomId, content, clientMessageId }` | Send a message |
| `room:join` | `{ roomId }` | Subscribe to a room |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `message:new` | `{ id, userId, chatRoomId, content, createdAt, clientMessageId }` | New message in room |
| `exception` | `{ status: "error", message }` | Validation or auth error |

## Production (Nginx)

```nginx
location /ws {
    proxy_pass http://backend:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    ...
}
```

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
