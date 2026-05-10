#!/bin/sh
# Generate /app/.env from the container's environment variables so that
# dotenv (called in api/server/index.js) picks up Railway-injected secrets
# instead of reading the empty .env file created during the Docker build.
printenv | while IFS='=' read -r key value; do
  # Skip variables that are empty or start with _ (shell internals)
  [ -z "$key" ] && continue
  printf '%s=%s\n' "$key" "$value"
done > /app/.env

exec "$@"
