# `infra/k8s/` — Kubernetes manifests

**Phase 2 concern.** Empty placeholder.

Local dev runs via Docker Compose (`docker-compose.yml` at repo root).
Production deployment to cloud-agnostic Kubernetes is deferred until Phase 2 — see CLAUDE.md §3.

When this directory is populated it will hold Helm charts under `charts/<service>/` plus a top-level `umbrella/` chart for environment-level deploys.
