# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **This file is the single source of truth for Claude Code working in this repo.**
> Read it fully on every new session. Do not re-litigate decisions marked FROZEN.
> If you believe a FROZEN decision is wrong, stop and ask Mahesh before acting.

---

## 0. Commands

```bash
# Install
pnpm install

# Build all packages
pnpm build

# Watch mode (all packages in parallel)
pnpm dev

# Typecheck across workspace
pnpm typecheck

# Build / typecheck a single package
pnpm --filter @secureloop/design-system build
pnpm --filter @secureloop/ui typecheck

# Clean dist + node_modules
pnpm clean
```

> **Not yet wired:** `pnpm lint`, `pnpm test`, and `pnpm gen:types` are referenced in §11 but do not exist yet — `lint` and `test` are pending remediation task ME-6 (ESLint/Prettier) and first service scaffold; `gen:types` is pending `packages/api-types`.

---

## 1. Product context

**Product:** SecureLoop GRC Platform — a Penetration Testing Operations Platform (PTOps Suite) + Customer Portal (SecureLoop Portal).

**Core insight:** VAPT is currently treated as a point-in-time event, not a continuous risk management process. Remediation fails because IT/Dev/Cloud team effort is never accounted for in workload. SecureLoop's differentiator: control owners trigger fixes directly from the portal via multiple modalities (API, IaC, scripts, pipelines, manual instructions) — not static PDF reports.

**Two integrated products:**
- **PTOps Suite** — VAPT firms, MSSPs, freelancers
- **SecureLoop Portal** — enterprise CISOs and security teams

**Business model:** Use internally at Cybrilliant → license to VAPT firms → open to enterprise → marketplace (Phase 3). Global from day one.

**Scope:** All 77 user stories in Phase 1. No MVP subset.

**Founder:** Mahesh (CISO-founder). Address as Mahesh in all responses.

---

## 2. Personas (13)

CISO · CTRL (Control Owner) · TSTR (Tester) · SENG (Security Engineer) · TEAM · DM (Delivery Manager) · FIN · LGL · SUB (Subcontractor) · AUD (Auditor) · ADMIN · IE (Integration Engineer) · BO (Business Owner)

---

## 3. Architecture — FROZEN

| Layer | Decision |
|---|---|
| Architecture style | Microservices |
| Repo structure | Monorepo via pnpm workspaces (Turborepo deferred — add when service count >5) |
| Backend (business services) | TypeScript + Node.js 20 + Fastify |
| Backend (AI Gateway ONLY) | Python ≥ 3.12 + FastAPI |
| Workers | TypeScript + BullMQ (RabbitMQ as transport) |
| Frontend | TypeScript + Next.js 15 (App Router) + React 18 |
| Frontend styling | vanilla-extract (zero-runtime, type-safe CSS-in-TS) |
| Package bundling | tsup (for `packages/*` libraries) |
| Deployment target | Cloud-agnostic Kubernetes (Phase 2 concern) |
| Dev environment | Local-first via Docker Compose |
| Auth | JWT + OAuth 2.0 + SAML 2.0 |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Search | Elasticsearch 8 |
| Async messaging | RabbitMQ 3.13 |
| Object store | MinIO (dev) / S3-compatible (prod) |
| AI | Anthropic Claude API via AI Gateway (swappable, credit-based billing) |
| API style | REST with OpenAPI 3.1 contracts; types generated into shared package |
| Inter-service comms | HTTP (sync) + RabbitMQ (async events) |
| Observability | OpenTelemetry traces + Pino structured logs + Prometheus metrics |

**Why TypeScript monorepo:** shared types (OpenAPI → TS), Claude Code works dramatically better with cross-service visibility, one runtime to operate. **Why Python for AI Gateway only:** richer LLM/SBOM/graph library ecosystem; isolated behind HTTP so it's swappable.

---

## 4. Monorepo layout — FROZEN

```
secureloop/
├── CLAUDE.md                          ← this file
├── README.md
├── package.json                       ← root workspace
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── .env.example
├── docker-compose.yml                 ← local dev stack
├── docker-compose.override.yml        ← gitignored, per-dev tweaks
│
├── apps/
│   ├── ptops-web/                     ← Next.js — PTOps Suite (tester/SE/DM/FIN/LGL/ADMIN/IE)
│   └── portal-web/                    ← Next.js — SecureLoop Portal (CISO/CTRL/TEAM/BO/AUD/SUB)
│
├── services/
│   ├── auth/                          ← JWT, OAuth, SAML, SSO, RBAC (TS)
│   ├── tenants/                       ← tenant provisioning, config, framework toggles (TS)
│   ├── users/                         ← user profiles, persona assignments (TS)
│   ├── engagements/                   ← VAPT engagement lifecycle, scope, quotes (TS)
│   ├── findings/                      ← vulnerabilities, KB, dedup, severity (TS)
│   ├── reports/                       ← 3-step approval workflow, exports (TS)
│   ├── risk/                          ← risk scoring, acceptance, cyber posture score (TS)
│   ├── remediation/                   ← fix recipes, execution records, retest (TS)
│   ├── compliance/                    ← framework mapping, audit deadlines, scoring (TS)
│   ├── assets/                        ← asset inventory, criticality, SBOM (TS)
│   ├── integrations/                  ← scanner polling, SBOM ingestion, webhooks (TS)
│   ├── notifications/                 ← email, Slack, Teams, PagerDuty routing (TS)
│   ├── billing/                       ← P&L, AI credits, margins, subcontractor costs (TS)
│   ├── audit-log/                     ← immutable event log, admin annotations (TS)
│   ├── files/                         ← object store abstraction, evidence, exports (TS)
│   └── ai-gateway/                    ← Claude API orchestration, credit meter (Python, FastAPI)
│
├── workers/
│   ├── report-exporter/               ← PDF+zip generation (TS)
│   ├── scanner-poller/                ← continuous scanner polling (TS)
│   ├── sbom-processor/                ← SBOM parse, transitive analysis (TS → calls ai-gateway)
│   ├── notification-dispatcher/       ← async notification fan-out (TS)
│   └── risk-recalculator/             ← recompute scores on events (TS)
│
├── packages/
│   ├── design-system/                 ← CSS vars, tokens, theme switcher, base components
│   ├── ui/                            ← shared React components built on design-system
│   ├── api-types/                     ← generated TS types from OpenAPI specs
│   ├── api-client/                    ← typed fetch wrappers for each service
│   ├── auth-client/                   ← JWT/OAuth/SAML client helpers
│   ├── event-contracts/               ← RabbitMQ event schemas (Zod + JSON Schema)
│   ├── config/                        ← env loading, validation (Zod)
│   ├── logger/                        ← Pino config, correlation IDs
│   ├── telemetry/                     ← OpenTelemetry setup
│   ├── db/                            ← Postgres client, migration runner, base repositories
│   ├── testing/                       ← shared test utils, fixtures, MSW handlers
│   └── eslint-config/                 ← shared ESLint rules
│
├── contracts/
│   ├── openapi/                       ← one .yaml per service
│   │   ├── auth.yaml
│   │   ├── findings.yaml
│   │   └── ...
│   └── events/                        ← RabbitMQ event schemas (JSON Schema)
│
├── infra/
│   ├── docker/                        ← per-service Dockerfiles
│   ├── k8s/                           ← Helm charts (Phase 2)
│   └── scripts/                       ← dev setup, seed, reset
│
├── docs/                              ← SOURCE OF TRUTH (converted from .docx)
│   ├── 01_product_definition_personas.md
│   ├── 02_user_stories.md
│   ├── 03_data_model.md
│   ├── 04_api_contracts.md
│   ├── 05_technical_architecture.md
│   ├── 06_non_functional_requirements.md
│   ├── 07_integration_catalogue.md
│   ├── 08_governance_compliance_model.md
│   ├── 09_wireframe_specs/             ← one .md per persona part
│   ├── 10_decision_log.md              ← frozen decisions (this doc's source)
│   ├── 11_design_system_v2_draft.md    ← v2 additive spec, authoritative for v2 scope (see §5.5)
│   ├── 12_story_to_service_map.md      ← which service owns which story
│   └── 13_scaffold_remediation_tasks.md ← open gaps in current packages/* scaffold
│
└── wireframes/                        ← hi-fi HTML wireframes (visual truth)
    ├── CISO/
    ├── CTRL/
    ├── TSTR/
    └── SENG/
```

**Rule:** No service in `services/` imports from another service directly. Cross-service calls go through `packages/api-client`. Cross-service events go through `packages/event-contracts`.

---

## 5. File naming — FROZEN

- Wireframes: `SecureLoop_<PERSONA>-<NUM>_<ScreenName>_v<N>.html`
  Example: `SecureLoop_CISO-05_SLAEscalation_v1.html`
- Services: `services/<kebab-name>/` — singular domain noun or short phrase.
- Packages: `packages/<kebab-name>/` — scoped as `@secureloop/<name>`.
- OpenAPI specs: `contracts/openapi/<service-name>.yaml`.
- Migrations: `services/<svc>/migrations/NNNN_<snake_case_description>.sql` (sequential, zero-padded).
- Tests: co-located as `*.test.ts` for units, `*.integration.test.ts` for integration, `apps/*/e2e/` for Playwright.

---

## 5.5. Design system authority — READ THIS BEFORE ANY UI WORK

The SecureLoop design system is authoritative across **three** sources. Each has a specific role. If any two conflict, use this precedence:

1. **`packages/design-system/` and `packages/ui/` source code** — HIGHEST AUTHORITY. The code is the runtime truth. When spec diverges from code, the CODE wins — raise a remediation task to align the spec, do not modify the code to match a conflicting spec.
2. **`docs/11_design_system_v2_draft.md`** — authoritative for everything the packages do not yet implement: v2 additive scope (elevation, motion, density, data-viz palettes, micro-interactions, empty/loading/error states, table patterns, keyboard/accessibility extensions, typography rhythm, icon system, chrome refinements, print styles, responsive rules, brand moments).
3. **`wireframes/<PERSONA>/*.html`** — WINS for layout and visual composition of specific screens. Pixel-match the wireframe.

> **Note:** §6, §7, and §8 of this file contain token values, locked patterns, and exclusions as **passive reference only** — they are not authoritative sources. The authoritative values live in `packages/design-system/`.

### Build rule for `packages/design-system/` and `packages/ui/`

When building or modifying either package:

- Source tokens and theme values **from `packages/design-system/src/tokens/*`** — these are the runtime truth.
- Source v2 tokens and patterns **from `docs/11_design_system_v2_draft.md`** — implement faithfully for anything not yet in the packages.
- Use wireframes ONLY to confirm visual composition of final screens, not to derive component APIs.
- If both the packages and v2 doc are silent on a behaviour → STOP and ask Mahesh. Do not guess.

### What lives where

| Source | Role |
|---|---|
| `packages/design-system/src/tokens/*` | Token values as TS/CSS — highest authority |
| `packages/design-system/src/themes/*` | Theme palettes + elevation/dataviz vars |
| `packages/design-system/src/{elevation,motion,dataviz}/*` | v2 additive token modules |
| `packages/ui/src/components/*` | React components built on design-system |
| `docs/11_design_system_v2_draft.md` | v2 additive spec — fallback for unimplemented scope |
| `wireframes/<PERSONA>/*.html` | Final screen composition reference |

---

## 6. Design tokens — FROZEN (never modify)

**Fonts** (load via Google Fonts):
- Space Grotesk — display, weights 500–700
- IBM Plex Sans — UI body, weight 300 and 400–600
- JetBrains Mono — data, weights 400–700

**Type scale (ONLY these values):** `10 / 11 / 13 / 15 / 20 / 28 / 44 px`

**Radius (ONLY these):** `3 / 6 / 10 / 999 px`

**Spacing (ONLY these):** `4 / 8 / 12 / 16 / 24 / 32 / 48 px`

**Themes:** 2 families × 2 modes = 4 combos via body classes.
- `coffee dark` (DEFAULT — every new screen starts here)
- `coffee light`
- `blue dark`
- `blue light`

### Coffee Dark
```css
--bg-page:#120804; --bg-base:#1A0F08; --bg-raised:#25170D; --bg-overlay:#2B1810; --bg-hover:#3D2817;
--line:rgba(243,238,226,.07); --line-strong:rgba(243,238,226,.14);
--ink-100:#F3EEE2; --ink-80:#D4CBB0; --ink-60:#A69B80; --ink-40:#7A7058; --ink-20:#3D3428;
--brand:#F3EEE2; --brand-ink:#120804; --brand-dim:rgba(243,238,226,.12); --brand-glow:rgba(243,238,226,.22);
/* Severity */ --crit:#FF6B5B; --high:#FFB04D; --med:#FFD97A; --low:#7AB8E5; --good:#8FE5B3;
```

### Coffee Light
```css
--bg-page:#F3EEE2; --bg-base:#FBF8F1; --bg-raised:#EDE7D8; --bg-overlay:#FFFDF7; --bg-hover:#E5DDC9;
--line:rgba(43,24,16,.10); --line-strong:rgba(43,24,16,.18);
--ink-100:#2B1810; --ink-80:#4A2E1D; --ink-60:#6B5544; --ink-40:#907D68; --ink-20:#C9C0AA;
--brand:#6F4E37; --brand-ink:#F3EEE2; --brand-dim:rgba(111,78,55,.14); --brand-glow:rgba(111,78,55,.24);
--crit:#C94637; --high:#B8651D; --med:#9E7F10; --low:#2E86C1; --good:#2E8B50;
```

### Blue Dark
```css
--bg-page:#0A1628; --bg-base:#0F1E35; --bg-raised:#162B48; --bg-overlay:#1C3557; --bg-hover:#22406B;
--line:rgba(232,244,253,.08); --line-strong:rgba(232,244,253,.15);
--ink-100:#E8F4FD; --ink-80:#C0D5E8; --ink-60:#7A96B4; --ink-40:#556F8A; --ink-20:#2C4058;
--brand:#E8F4FD; --brand-ink:#0A1628; --brand-dim:rgba(232,244,253,.12); --brand-glow:rgba(232,244,253,.22);
--crit:#FF7A6B; --high:#FFB347; --med:#FFD97A; --low:#7AB8E5; --good:#7EE0A8;
```

### Blue Light
```css
--bg-page:#F2F8FD; --bg-base:#FFFFFF; --bg-raised:#E5EFF8; --bg-overlay:#FFFFFF; --bg-hover:#D5E4F1;
--line:rgba(10,22,40,.08); --line-strong:rgba(10,22,40,.16);
--ink-100:#0A1628; --ink-80:#1F3A5C; --ink-60:#4A6380; --ink-40:#7A8FA8; --ink-20:#B5C5D8;
--brand:#1E5A8A; --brand-ink:#F2F8FD; --brand-dim:rgba(30,90,138,.14); --brand-glow:rgba(30,90,138,.24);
--crit:#C73E3A; --high:#C17A1A; --med:#9E7F10; --low:#2E86C1; --good:#2E8B50;
```

Every severity has a `-bg` variant at ~14% alpha.

---

## 7. Locked UI patterns — NEVER violate

| Pattern | Rule |
|---|---|
| Validation | Borders ONLY on error. Valid = no border + inline checkmark + "Valid" text. **Never a green border.** |
| Toggles | Segmented pill `[A | B]` for binary. **Never iOS switches.** Same pattern as theme toggle. |
| Wizards | `×` in top-right header is the SOLE close affordance. **No Cancel button in footer.** Footer = Back + primary action only. Step 1 Back uses `display:none`, not `visibility:hidden`. |
| Wizard width | 900px (wizards), 880px (forms) |
| Drill-down | Breadcrumb at top of content area (not topbar). Clicking any non-current item navigates up. **No separate Back button.** |
| Modals | Backdrop `rgba(0,0,0,.52)` + `blur(8px)` in dark. Open animation: `riseIn 320ms cubic-bezier(.2,.7,.2,1)`. |
| Dashboard shell | 64px left rail + 56px topbar + content area. Grain overlay 0.025 dark / 0.05 light. |
| Theme picker | Single topbar button → popover with 2 family cards + 2 mode buttons. Click outside or Escape closes. Default = Coffee Dark. |
| State-switcher sync | Multi-path nav (stepper + next/back + switcher) — sync active-class centrally inside state-mutation functions, never per-handler. |
| Focus | `:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }` — **never remove.** |
| Callout | chip (30px circle, brand-fill) + tint-bg (brand-dim) + all-sides-border (line-strong) + `align-items:center`. Chip variants: good/warn/crit via bg color. Padding: `var(--s-4) var(--s-5)` = 16/24 (not 12/16). |
| Attack path colour | Red attack-path constant across all themes. |
| Graphs | Pure SVG, theme-responsive via `data-role` + MutationObserver. |
| Layout | Top-align siblings. No left-border-bar banners. Consistent card padding. Tight label+value align. |

---

## 8. Exclusions — NEVER do these

- No user-selectable accent colours.
- No border on valid state.
- No iOS-style switches.
- No Cancel button in wizard footer.
- No mobile-responsive breakpoints (desktop-first; mobile is Phase 2).
- No emojis in UI.
- No custom icon library — inline SVG Feather/Lucide paths only.
- No new type/radius/spacing values beyond the scale above.
- No direct service-to-service imports — go through `api-client` or events.
- No business logic in Next.js server components — server components fetch only, services own logic.

---

## 9. Key product decisions — FROZEN

| Area | Decision |
|---|---|
| Risk acceptance authority | Business Owner (not CISO). CISO facilitates and communicates in business language. |
| Fix execution | Human-triggered always. Never auto-executed. |
| AI pricing | Credit-based add-on, per session. Anthropic Claude API (swappable). |
| Report approval | 3-step: tester → SE → DM |
| Retest SLA | Configurable per tenant |
| Compliance mapping authority | Security Engineer (can add/remove freely) |
| Subcontractor findings | DM review queue before confirmation |
| Auditor access | Time-limited, scoped only |
| DM approval gate | Findings visibility — titles + severity only until final report delivered |
| Risk score drivers | CVSS + asset criticality + financial impact + operational impact + compliance impact (breakdown shown) |
| Asset criticality | Mandatory, assigned by senior accountable person |
| Board report exports | PDF + CSV/JSON/YAML/XML as zip |
| Expired risk acceptances | Escalate to configurable Security Committee or individual |
| Cyber posture score | Unified 0–100 (security risk + compliance + remediation performance). Weighted formula configurable by CISO. |

**Phase 1 compliance frameworks (auto-mapped at launch):**
NIST-CSF, CIS v8, SOC2 Type II, OWASP ASVS, CSA CCM.

**Phase 2 frameworks:**
PCI-DSS, ISO 27001, HIPAA, CMMC, FedRAMP, SAMA, NESA IAR, MITRE ATT&CK.

Admin configures frameworks per customer.

See `docs/10_decision_log.md` for the full per-story decision table (CISO-03 through IE-04, TEAM-03, BO-01/02, ADMIN-01/07, SENG-09/12, TSTR-01/02, DM-01/03, FIN-01, AUD-02/04, CTRL-03/06).

---

## 10. Wireframes — source of visual truth

Hi-fi HTML wireframes for frozen personas (CISO, CTRL, TSTR, SENG v1) live in `D:\Projects\VAPTOS\SecureLoopRepo\Wireframe Designs\<PERSONA>\`.

Design system source: `packages/design-system/` (tokens) and `packages/ui/` (components).

**When building a screen, always:**
1. Open the corresponding HTML wireframe in `Wireframe Designs/<PERSONA>/`.
2. Match the wireframe pixel-accurately. Do not improvise layout.
3. Map every visual element to existing components in `packages/ui/`. If missing, propose adding it — never inline-style.
4. Use ONLY tokens from §6. Use ONLY patterns from §7.

---

## 11. Working rules for Claude Code

### Behaviour
1. **State assumptions before acting.** If uncertain, stop and ask Mahesh. Never proceed on unverified assumptions.
2. **Direct answers only.** No preambles. No "what's next" suggestions. No status recaps. No unsolicited elaboration.
3. **Never offer alternatives to frozen decisions.** Never ask "are you sure" about locked patterns.
4. **Brevity after delivery.** After delivering files, 2–3 lines max. Detail goes into files, not chat.
5. **Audit before delivery.** Run the output-validator skill before presenting any deliverable.
6. **Freeze protocol.** After every delivered output, ask "Freeze?" and wait for confirmation before proceeding.
7. **packages/ui rule.** When working on any file inside `packages/ui/`, always apply `frontend-design` and `impeccable:audit` rules automatically without being asked.

### Workflow for any code task
1. Read relevant docs in `/docs` first (user story + data model + API contract for the feature).
2. If a wireframe exists, open it.
3. Identify the service(s) touched via `docs/12_story_to_service_map.md`.
4. Write or update the OpenAPI contract in `contracts/openapi/` FIRST.
5. Regenerate types (`pnpm gen:types` — available once `packages/api-types` is scaffolded).
6. Write database migration if schema changes.
7. Implement service handler + tests.
8. Implement UI in the relevant `apps/*-web/`.
9. Update `docs/10_decision_log.md` if a new decision was made.
10. Run `pnpm typecheck` before declaring done (`pnpm lint && pnpm test` gates are pending ME-6 and first service).

### Styling with vanilla-extract

- Style files are `<Component>.css.ts` — not `.module.css` or inline styles.
- Import `theme` from `@secureloop/design-system` for all token references:
  ```ts
  import { theme } from '@secureloop/design-system';
  import { style, styleVariants } from '@vanilla-extract/css';

  export const root = style({ color: theme.ink['100'] });
  ```
- Use `recipe()` from `@vanilla-extract/recipes` for multi-variant components (see `Button.css.ts`).
- Never hardcode hex values — always reference a token from `theme.*` or the typed token objects (`fontSize`, `space`, `radius`).
- Theme classes applied to `<body>`: `t-coffee-dark` | `t-coffee-light` | `t-blue-dark` | `t-blue-light`
- Density attribute on `<body>`: `data-density="comfortable"` | `data-density="compact"`
- Default: `t-coffee-dark` + `data-density="comfortable"` (set by `ThemeProvider`)

### Git
- Branch naming: `<persona>-<NUM>/<kebab-slug>` e.g. `ciso-01/risk-dashboard`.
- Commit style: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).
- Never commit `.env`, `node_modules`, `dist`, `.turbo`, `coverage`.
- PR must reference story ID in title.

### Testing policy
- Unit tests: Vitest, co-located.
- Integration tests: Vitest + Testcontainers (spin real Postgres/Redis per test suite).
- E2E: Playwright in `apps/*-web/e2e/`.
- Minimum coverage per service: 80% lines, 75% branches. No gate on UI.
- Every new API endpoint needs at least one integration test covering happy path + one error path.

### Security defaults (non-negotiable)
- All service endpoints require auth except explicit public list in `services/auth/`.
- All tenant-scoped queries MUST filter by `tenant_id` at the repository layer — never trust callers.
- Secrets never in code. Use `.env` locally (gitignored), secrets manager in prod.
- Input validation with Zod at every API boundary.
- Audit-log every state-changing action via the `audit-log` service.
- PII fields tagged at schema level; redact in logs by default.

### Observability defaults
- Every service initialises OpenTelemetry on boot via `@secureloop/telemetry`.
- Every request gets a `correlation_id` header propagated across services and into logs.
- Pino logger with `tenant_id`, `user_id`, `correlation_id` in every log line.

---

## 12. First milestones (current state)

**Current repo state (2026-04-24):** Only `packages/design-system` and `packages/ui` are scaffolded. `apps/`, `services/`, `workers/`, `contracts/`, `infra/`, and `wireframes/` directories do not exist yet. The `docs/` directory contains only `11_design_system_v2_draft.md` and `13_scaffold_remediation_tasks.md` — all other doc files (01–10, 12) are pending.

1. ✅ Repo root files scaffolded (package.json, pnpm-workspace.yaml, tsconfig.base.json, .gitignore, .editorconfig, README.md).
2. ✅ `docs/11_design_system_v2_draft.md` placed.
3. ✅ `packages/design-system` built — v1 tokens + v2 additive (elevation, motion, dataviz, density, typography rhythm, 4 themes, global CSS, default = coffee-dark).
4. ✅ `packages/ui` built — 18 components: ThemeProvider, ThemePicker, DensityToggle, Shell (Rail/Topbar/Crumbs/Main), Button, Card, Badge, Chip, Input, Select, Modal, Table (10 sub-parts), Icon + 16 glyphs, Skeleton, EmptyState, LiveDot, Kbd, Gauge.
5. 🔧 **Remediation outstanding** — see `docs/13_scaffold_remediation_tasks.md`. Must be completed before first screen build. Gaps: Wizard, Callout, Breadcrumb interactivity, font loader, Tooltip, skip-links, print styles, Checkbox/Radio, Tabs, inline/banner error states, extended Table features, Prettier/ESLint shared config.
6. `services/auth` + `services/tenants` + `services/users` (foundation) — after remediation.
7. `services/assets` + `services/findings` (data spine).
8. Docker Compose stack (Postgres/Redis/RabbitMQ/ES/MinIO/MailHog).
9. First vertical slice: **CISO-01 Risk Dashboard** end-to-end — DB → API → UI.

---

## 13. Escalation triggers

Stop and ask Mahesh immediately if:
- A spec conflicts with a frozen decision.
- A wireframe conflicts with a user story.
- An OpenAPI contract change would break an existing consumer.
- A data-model change requires a destructive migration.
- An external integration requires a third-party credential decision.
- A compliance framework's requirement cannot be met with current design.

---

## 14. What "done" means for any story

- [ ] OpenAPI contract merged.
- [ ] DB migration merged and reversible.
- [ ] Service handler + repository + tests.
- [ ] UI screen matching wireframe, using only tokens + patterns.
- [ ] Audit-log events emitted for state changes.
- [ ] Integration test covering happy + one error path.
- [ ] Story entry in `docs/12_story_to_service_map.md` marked complete.
- [ ] `docs/10_decision_log.md` updated if any new decision was made.
- [ ] Lint + typecheck + test all green.
