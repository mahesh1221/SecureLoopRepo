#!/usr/bin/env bash
# SecureLoop — nuke + recreate local stack.
# DESTRUCTIVE: drops all volumes (Postgres data, MinIO objects, etc.).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

echo "⚠  This will DESTROY all local SecureLoop data (Postgres, Redis, RMQ, ES, MinIO)."
read -r -p "   Type 'reset' to confirm: " confirm
if [ "$confirm" != "reset" ]; then
  echo "✗ aborted"
  exit 1
fi

echo "→ tearing down …"
docker compose down -v --remove-orphans

echo "→ bringing stack back up …"
exec "$ROOT/infra/scripts/dev-setup.sh"
