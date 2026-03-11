dev-up:
	docker compose -p chat-app-dev -f compose.dev.yaml --env-file .env.development up --build -d

dev-start:
	docker compose -p chat-app-dev -f compose.dev.yaml --env-file .env.development up --build -d

dev-stop:
	docker compose -p chat-app-dev stop

dev-down:
	docker compose -p chat-app-dev down

prod-up:
	docker compose -p chat-app-prod -f compose.yaml --env-file .env up --build -d

prod-start:
	docker compose -p chat-app-prod -f compose.yaml --env-file .env up --build -d

prod-stop:
	docker compose -p chat-app-prod stop

prod-down:
	docker compose -p chat-app-prod down
