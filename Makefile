### Phony ###
.PHONY: frontend backend

### Local ###
frontend:
	pnpm --filter frontend dev

backend:
	pnpm --filter backend start:dev

database:
	pnpm --filter backend db:studio

### Tests ### 
test-backend:
	pnpm --filter backend test

test-backend-watch:
	pnpm --filter backend test:watch

test-backend-e2e:
	pnpm --filter backend test:e2e

test-frontend:
	pnpm --filter frontend test:run

test-frontend-watch:
	pnpm --filter frontend test

### Docker ###
dev-up:
	podman compose -p chat-app-dev -f compose.dev.yaml up --build -d

dev-start:
	podman compose -p chat-app-dev -f compose.dev.yaml up --build -d

dev-stop:
	podman compose -p chat-app-dev stop

dev-down:
	podman compose -p chat-app-dev down

prod-up:
	podman compose -p chat-app-prod -f compose.yaml up --build -d

prod-start:
	podman compose -p chat-app-prod -f compose.yaml up --build -d

prod-stop:
	podman compose -p chat-app-prod stop

prod-down:
	podman compose -p chat-app-prod down
