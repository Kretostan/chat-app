# API (REST) – Roadmap

## Documentation

- **Swagger UI:** `/docs`
- **OpenAPI JSON:** `/docs-json`

## Security

- **Mechanism:** JWT (AccessToken and RefreshToken stored in HttpOnly Cookies).
- **Security:** CSRF Protection required for cookie-based auth.
- **Error Codes:** - `401 Unauthorized`: Missing or expired token.
  - `403 Forbidden`: User is not a member of the requested conversation.

## Endpoints (MVP)

### Auth

- `POST /auth/register` – Create a new account.
- `POST /auth/login` – Establish session (sets cookies).
- `POST /auth/refresh` – Rotate AccessToken.
- `POST /auth/logout` – Clear session cookies.

### Users

- `GET /users/me` – Retrieve the current user's profile.
- `GET /users?search=...` – Find users to start a new conversation.

### Conversations

- `GET /conversations` – List all chats for the authenticated user (with snippets).
- `POST /conversations` – Create a DM (requires `target_user_id`) or a group.
- `GET /conversations/:id` – Retrieve chat details and member list.

### Messages

- `GET /conversations/:id/messages?cursor=...&limit=20` – Retrieve chat history
(cursor-based).
- `POST /conversations/:id/messages` – REST fallback for sending messages
if WS is unavailable.

## Conventions

- **Pagination:** `cursor` (Base64 string containing `created_at` and `id`).
- **Errors:** RFC 7807 (Problem Details for HTTP APIs) format.
- **Body Limits:** Maximum **4,000** characters for message bodies.
