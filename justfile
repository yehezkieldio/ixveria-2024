set dotenv-load

compose_path := "docker/infrastructure/docker-compose.yml"

up:
	docker compose --file {{compose_path}} --env-file .env up -d

down:
	docker compose --file {{compose_path}} --env-file .env down

logs:
	docker compose --file {{compose_path}} --env-file .env logs -f