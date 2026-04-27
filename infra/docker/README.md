# `infra/docker/` — shared Dockerfiles

Phase 2 concern. Will hold:

- `node-base.Dockerfile` — shared Node 20 base image for `services/*` and `workers/*`
- `python-base.Dockerfile` — shared Python 3.12 base for `services/ai-gateway`
- `nginx-dev.conf` — optional reverse proxy for local dev

Per-service Dockerfiles live in each `services/<name>/Dockerfile` and `workers/<name>/Dockerfile`.

The local dev stack (Postgres, Redis, RabbitMQ, Elasticsearch, MinIO, MailHog) uses upstream images directly via `docker-compose.yml` at the repo root — no custom builds needed.
