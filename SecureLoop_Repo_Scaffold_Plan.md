# SecureLoop — Repository Scaffold Plan

> Companion to `CLAUDE.md`. This document describes **how to create the repo from zero** and **what each folder contains on day 1**.
> Execute this plan once locally (or via Claude Code) to produce a working monorepo ready for feature work.

---

## 1. Stack summary (for quick reference)

| Concern | Choice |
|---|---|
| Package manager | pnpm 9+ |
| Monorepo tool | Turborepo |
| Node | 20 LTS |
| Python (AI Gateway only) | 3.12 |
| Frontend | Next.js 15, React 19, TypeScript 5 |
| Backend framework (TS) | Fastify 5 + Zod |
| Backend framework (Py) | FastAPI + Pydantic v2 |
| ORM / DB layer | Drizzle ORM (Postgres) |
| Migrations | Drizzle Kit |
| Queue | BullMQ over RabbitMQ |
| OpenAPI tooling | `@apidevtools/swagger-cli` + `openapi-typescript` |
| Event validation | Zod + JSON Schema (ajv) |
| Testing | Vitest, Testcontainers, Playwright |
| Lint / format | ESLint 9, Prettier, `@secureloop/eslint-config` |
| Logging | Pino |
| Tracing | OpenTelemetry SDK |
| Metrics | Prometheus client |
| Container | Docker + Docker Compose |

---

## 2. Prerequisites

- Node 20 LTS (via `nvm` or `fnm`)
- pnpm 9+ (`npm i -g pnpm`)
- Python 3.12 + uv (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
- Docker Desktop 4.30+
- Git 2.40+

---

## 3. Root layout

```
secureloop/
├── .github/
│   └── workflows/
│       ├── ci.yml                     ← lint + typecheck + test + build on PR
│       └── openapi-drift.yml          ← fails if generated types drift
├── .vscode/
│   ├── extensions.json                ← recommended extensions
│   └── settings.json                  ← editor defaults
├── .gitignore
├── .editorconfig
├── .nvmrc                             ← 20
├── .prettierrc
├── .prettierignore
├── .env.example                       ← all env vars documented
├── CLAUDE.md                          ← Claude Code rules (already produced)
├── README.md                          ← quickstart: clone → pnpm i → docker compose up → pnpm dev
├── CHANGELOG.md
├── LICENSE
├── package.json                       ← root workspace
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── docker-compose.yml                 ← Postgres, Redis, RabbitMQ, ES, MinIO, MailHog
├── docker-compose.override.yml        ← gitignored template
│
├── apps/                              ← §4
├── services/                          ← §5
├── workers/                           ← §6
├── packages/                          ← §7
├── contracts/                         ← §8
├── infra/                             ← §9
├── docs/                              ← §10
├── wireframes/                        ← §11
└── scripts/                           ← §12
```

---

## 4. `apps/` — user-facing Next.js applications

Two separate Next.js apps that share `packages/ui` and `packages/design-system`.

```
apps/
├── ptops-web/                         ← PTOps Suite
│   ├── app/                           ← App Router
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── e2e/                           ← Playwright specs
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
└── portal-web/                        ← SecureLoop Portal
    ├── app/
    ├── components/
    ├── lib/
    ├── public/
    ├── e2e/
    ├── next.config.ts
    ├── package.json
    └── tsconfig.json
```

**Persona-to-app mapping:**
- **PTOps Suite:** TSTR, SENG, DM, FIN, LGL, ADMIN, IE, SUB
- **SecureLoop Portal:** CISO, CTRL, TEAM, BO, AUD

*(SUB primarily uses PTOps; AUD is Portal-only per frozen decision.)*

---

## 5. `services/` — backend microservices (TypeScript)

Each service is a Fastify app with this layout:

```
services/<name>/
├── src/
│   ├── index.ts                       ← entry
│   ├── server.ts                      ← Fastify builder (used by tests too)
│   ├── config.ts                      ← Zod-validated env
│   ├── routes/                        ← route handlers
│   ├── services/                      ← domain logic
│   ├── repositories/                  ← DB access (tenant-scoped)
│   ├── events/                        ← publishers + subscribers
│   ├── schemas/                       ← Zod request/response
│   └── migrations/                    ← SQL migrations (Drizzle Kit)
├── tests/
│   ├── unit/
│   └── integration/
├── Dockerfile
├── package.json
└── tsconfig.json
```

**Services (16 total):** `auth`, `tenants`, `users`, `engagements`, `findings`, `reports`, `risk`, `remediation`, `compliance`, `assets`, `integrations`, `notifications`, `billing`, `audit-log`, `files`, `ai-gateway` (Python).

**Python service layout (ai-gateway only):**

```
services/ai-gateway/
├── src/
│   ├── main.py                        ← FastAPI entry
│   ├── config.py                      ← Pydantic settings
│   ├── routes/
│   ├── prompts/                       ← prompt templates (versioned)
│   ├── providers/                     ← anthropic_claude.py, abstract_provider.py
│   ├── credit_meter/                  ← session credit tracking
│   ├── sbom/                          ← CycloneDX/SPDX parsers
│   └── reachability/                  ← graph analysis
├── tests/
├── pyproject.toml                     ← managed by uv
├── Dockerfile
└── README.md
```

---

## 6. `workers/` — async job processors

Each worker is a small TS app that subscribes to BullMQ queues and/or RabbitMQ topics.

```
workers/
├── report-exporter/                   ← PDF+zip generation
├── scanner-poller/                    ← continuous scanner polling (per tenant config)
├── sbom-processor/                    ← calls ai-gateway for analysis
├── notification-dispatcher/           ← fan-out to email/Slack/Teams/PagerDuty
└── risk-recalculator/                 ← recompute scores on findings events
```

Standard worker layout:
```
workers/<name>/
├── src/
│   ├── index.ts                       ← worker entry
│   ├── processor.ts                   ← job handler
│   └── config.ts
├── tests/
├── Dockerfile
└── package.json
```

---

## 7. `packages/` — shared libraries

```
packages/
├── design-system/                     ← CSS variables, theme switcher, font loading
│   └── src/{tokens,themes,global.css,theme-switcher.ts}
├── ui/                                ← React components (buttons, inputs, modals, wizards)
│   └── src/{Button,Input,Modal,Wizard,Callout,...}
├── api-types/                         ← GENERATED from contracts/openapi/*.yaml
│   └── src/{auth,findings,...}.ts
├── api-client/                        ← typed fetch wrappers
│   └── src/{auth.ts,findings.ts,...}
├── auth-client/                       ← JWT/OAuth/SAML helpers for apps + services
├── event-contracts/                   ← RabbitMQ schemas (Zod + JSON Schema)
│   └── src/{findings-created,report-approved,...}.ts
├── config/                            ← loadEnv<T>() with Zod validation
├── logger/                            ← Pino factory + correlation-id context
├── telemetry/                         ← OpenTelemetry bootstrap
├── db/                                ← Drizzle client factory + base repository
│   └── src/{client.ts,tenant-scoped-repo.ts,migration-runner.ts}
├── testing/                           ← fixtures, MSW handlers, testcontainer helpers
└── eslint-config/                     ← shared ESLint rules
```

Each package uses `"name": "@secureloop/<name>"` in its `package.json`.

---

## 8. `contracts/` — source of truth for inter-service communication

```
contracts/
├── openapi/
│   ├── auth.yaml
│   ├── tenants.yaml
│   ├── users.yaml
│   ├── engagements.yaml
│   ├── findings.yaml
│   ├── reports.yaml
│   ├── risk.yaml
│   ├── remediation.yaml
│   ├── compliance.yaml
│   ├── assets.yaml
│   ├── integrations.yaml
│   ├── notifications.yaml
│   ├── billing.yaml
│   ├── audit-log.yaml
│   ├── files.yaml
│   └── ai-gateway.yaml
└── events/
    ├── README.md                      ← naming convention: <domain>.<entity>.<verb>
    ├── findings.created.json
    ├── findings.severity-changed.json
    ├── reports.approval-requested.json
    ├── reports.delivered.json
    ├── risk.acceptance-expired.json
    ├── assets.criticality-changed.json
    └── ...
```

**Contract rules:**
- OpenAPI change requires PR review.
- Breaking change bumps API version in the URL (`/v1` → `/v2`).
- `pnpm gen:types` regenerates `packages/api-types` from all OpenAPI files.
- CI fails if generated types drift from committed.

---

## 9. `infra/` — deployment + ops

```
infra/
├── docker/
│   ├── node-base.Dockerfile           ← shared Node base image
│   ├── python-base.Dockerfile         ← shared Python base
│   └── nginx-dev.conf                 ← optional reverse proxy for dev
├── k8s/                               ← Phase 2; empty for now with placeholder README
└── scripts/
    ├── dev-setup.sh                   ← first-run bootstrap
    ├── seed.ts                        ← seed DB with tenants + personas + sample engagement
    └── reset.sh                       ← nuke + recreate local stack
```

---

## 10. `docs/` — SOURCE OF TRUTH (converted from `.docx`)

Each document in your current project must be converted to Markdown and committed here.

```
docs/
├── 01_product_definition_personas.md
├── 02_user_stories.md
├── 03_data_model.md
├── 04_api_contracts.md
├── 05_technical_architecture.md
├── 06_non_functional_requirements.md
├── 07_integration_catalogue.md
├── 08_governance_compliance_model.md
├── 09_wireframe_specs/
│   ├── part1_ciso_ctrl_team_bo.md
│   ├── part2_tstr.md
│   ├── part2_seng.md
│   ├── part2_dm.md
│   ├── part3a_fin.md
│   ├── part3b_lgl_sub.md
│   ├── part3c_aud.md
│   └── part4_admin_ie.md
├── 10_decision_log.md                 ← frozen decisions (expanded from memory)
├── 11_design_system_v1.md             ← the current SecureLoop_DesignSystem_v1.md
└── 12_story_to_service_map.md         ← MUST CREATE: 77 stories → owning service
```

**Conversion:** `pandoc <file>.docx -o <file>.md --wrap=none`. Review each file once after conversion for table formatting.

**`12_story_to_service_map.md` is critical** — it tells Claude Code which service owns each story. Format:

```markdown
| Story | Title | Primary Service | Secondary Services | UI App |
|---|---|---|---|---|
| CISO-01 | Risk Dashboard | risk | findings, compliance, assets | portal-web |
| CISO-03 | Board Report Export | reports | risk, compliance | portal-web |
| CTRL-03 | Fix Execution Record | remediation | audit-log, findings | portal-web |
| ... | ... | ... | ... | ... |
```

---

## 11. `wireframes/`

Move existing hi-fi HTMLs here, organised by persona.

```
wireframes/
├── CISO/
│   ├── CISO-01_RiskDashboard_v1.html
│   ├── CISO-03_BoardReportExport_v1.html
│   └── ...
├── CTRL/
├── TSTR/
└── SENG/
```

---

## 12. `scripts/` — repo-level utilities

```
scripts/
├── gen-types.ts                       ← OpenAPI → packages/api-types
├── gen-events.ts                      ← JSON Schema → packages/event-contracts types
├── check-openapi-drift.ts             ← CI guard
├── new-service.ts                     ← scaffolds a new service folder from template
└── doc-convert.sh                     ← batch convert .docx → .md for /docs
```

---

## 13. `docker-compose.yml` services (local dev)

| Service | Image | Port | Purpose |
|---|---|---|---|
| postgres | `postgres:16-alpine` | 5432 | primary DB |
| redis | `redis:7-alpine` | 6379 | cache, rate limit, BullMQ backend |
| rabbitmq | `rabbitmq:3.13-management` | 5672 / 15672 | event bus |
| elasticsearch | `elasticsearch:8.14.0` | 9200 | findings/evidence search |
| minio | `minio/minio` | 9000 / 9001 | object store (reports, SBOMs, evidence) |
| mailhog | `mailhog/mailhog` | 1025 / 8025 | dev email capture |

Each persisted via named volumes. Healthchecks on every service. `depends_on` with `condition: service_healthy` for app services that need them.

---

## 14. Root `package.json` scripts (high level)

```json
{
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "test:integration": "turbo run test:integration",
    "test:e2e": "turbo run test:e2e --filter=...-web",
    "gen:types": "tsx scripts/gen-types.ts",
    "gen:events": "tsx scripts/gen-events.ts",
    "db:migrate": "turbo run db:migrate",
    "db:seed": "tsx infra/scripts/seed.ts",
    "stack:up": "docker compose up -d",
    "stack:down": "docker compose down",
    "stack:reset": "bash infra/scripts/reset.sh",
    "docs:convert": "bash scripts/doc-convert.sh",
    "new:service": "tsx scripts/new-service.ts"
  }
}
```

---

## 15. Day-0 build order (exact sequence for Claude Code)

1. **Init repo** — `pnpm init`, add `pnpm-workspace.yaml`, `turbo.json`, `.gitignore`, `tsconfig.base.json`, `CLAUDE.md`, `README.md`.
2. **Docker Compose** — boot Postgres/Redis/RabbitMQ/ES/MinIO/MailHog.
3. **`packages/config` + `packages/logger` + `packages/telemetry`** — foundation used by all services.
4. **`packages/design-system`** — port tokens from `SecureLoop_DesignSystem_v1.md` to CSS vars + TS.
5. **`packages/db`** — Drizzle client factory + tenant-scoped repository base.
6. **`contracts/openapi/auth.yaml`** — minimal auth spec.
7. **`packages/api-types` codegen wiring** — `pnpm gen:types` works.
8. **`services/auth` + `services/tenants` + `services/users`** — foundation trio.
9. **`packages/ui`** base components (Button, Input, Modal, Wizard shell, Callout).
10. **`apps/portal-web` scaffold** — login page first, using `ui` + `design-system`.
11. **Convert all 9 `.docx` files to `.md` into `/docs`.**
12. **Produce `docs/12_story_to_service_map.md`** — full 77-story mapping.
13. **First vertical slice: CISO-01 Risk Dashboard** — end-to-end through findings + risk + compliance + assets + UI.

---

## 16. What Claude Code should NOT do on day 0

- Do not scaffold all 16 services at once. Create them as they are needed.
- Do not write business logic before the OpenAPI contract for that endpoint exists.
- Do not create a Kubernetes deployment — Phase 2.
- Do not set up CI/CD pipelines beyond the basic lint+typecheck+test GitHub Actions workflow.
- Do not attempt mobile responsive layouts — desktop-first per frozen decision.

---

## 17. Handoff to Claude Code

When starting with Claude Code for the first time in this repo:

```
1. Clone the repo.
2. Open the repo root in VS Code or your editor.
3. Start Claude Code: `claude-code`.
4. First prompt to Claude Code:
   "Read CLAUDE.md fully. Read docs/10_decision_log.md. Read docs/11_design_system_v1.md.
    Then confirm you understand the frozen decisions before we start §15 step 1."
5. Proceed one step at a time from §15 Day-0 build order.
```
