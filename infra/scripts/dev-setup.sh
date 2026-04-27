#!/usr/bin/env bash
# SecureLoop — first-run dev environment bootstrap.
# Idempotent: safe to re-run.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

echo "→ SecureLoop dev setup"

if ! command -v docker >/dev/null 2>&1; then
  echo "✗ docker not installed. Install Docker Desktop 4.30+ first." >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "✗ Docker daemon not running. Start Docker Desktop and re-run." >&2
  exit 1
fi

if [ ! -f .env ]; then
  cp .env.example .env
  echo "  · created .env from .env.example"
else
  echo "  · .env already present (left untouched)"
fi

echo "  · pulling images …"
docker compose pull --quiet

echo "  · starting stack …"
docker compose up -d

echo "  · waiting for healthchecks (up to 90s) …"
deadline=$(( $(date +%s) + 90 ))
while [ "$(date +%s)" -lt "$deadline" ]; do
  unhealthy=$(docker compose ps --format '{{.Name}} {{.Health}}' | awk '$2!="healthy"' | wc -l | tr -d ' ')
  if [ "$unhealthy" = "0" ]; then
    echo "  ✓ all services healthy"
    break
  fi
  sleep 3
done

echo
echo "✓ SecureLoop stack is up. Useful URLs:"
echo "    Postgres        localhost:5432   (user: secureloop)"
echo "    Redis           localhost:6379"
echo "    RabbitMQ mgmt   http://localhost:15672  (secureloop / secureloop_dev)"
echo "    Elasticsearch   http://localhost:9200"
echo "    MinIO console   http://localhost:9001   (secureloop / secureloop_dev)"
echo "    MailHog UI      http://localhost:8025"
echo
echo "  Next: pnpm install && pnpm dev"
