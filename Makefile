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
