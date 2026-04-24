# Scaffold remediation tasks

> **Audience:** Claude Code
> **Read before acting:** `CLAUDE.md` (whole file), `docs/11_design_system_v2_draft.md` (v2 additive scope), existing `packages/design-system/` and `packages/ui/` source.
> **Do not modify** v1 token values, v2 spec, or frozen product decisions. Implement what is specified.

This document lists **every gap** in the current scaffold of `packages/design-system/` and `packages/ui/` against the combined authority of `CLAUDE.md` + DS v2 DRAFT. Work gaps in priority order (CRITICAL → HIGH → MEDIUM → LOW). Stop for Mahesh approval after each PRIORITY band.

---

## CRITICAL — blocks first screen build

### CR-1 · Wizard shell component

Build `packages/ui/src/components/Wizard/` with `Wizard.tsx`, `Wizard.css.ts`, `index.ts`.

Must enforce every rule in `CLAUDE.md` §7 for wizards:

- Modal-based (reuse `Modal` with `kind="wizard"` → 900px max-width).
- `×` in top-right header is the **sole** close affordance. **No Cancel button anywhere.**
- Footer contains **Back + primary action only**. No third button.
- On Step 1, Back uses `display: none` (not `visibility: hidden`).
- Step indicator at the top of the body (not in header). Use dot + label pattern; current step = brand fill, complete step = good fill, pending = line-strong stroke.
- Content area scrolls when content exceeds viewport; footer stays sticky.
- Step transitions: fade + translateY(8px → 0) using `duration.slow` + `easing.emphasized`.
- State-switcher sync: if component exposes multi-path nav (stepper click + Next/Back), mutate `currentStep` centrally — never per-handler.
- Component API:
  ```ts
  <Wizard open onClose title="Create engagement" currentStep={step} steps={[{id, label}, …]} onStepChange primaryAction={{label, onClick, disabled?}} onBack>
    {step === 0 && <StepOne />}
    {step === 1 && <StepTwo />}
    …
  </Wizard>
  ```
- Keyboard: Escape closes; Enter on primary action triggers it (unless focus is inside a multiline input).
- Add tests: renders each step, primary action click advances, Back hides on step 1, × closes.

### CR-2 · Callout component

Build `packages/ui/src/components/Callout/`.

Match the pattern locked in `CLAUDE.md` §7:

- **Layout:** chip (30px circle, brand-fill by default) + tint background + all-sides border + `align-items: center`.
- **Padding:** `16px 24px` (NOT 12/16 — that's too tight).
- **Variants:** `good`, `info`, `warn`, `crit`. Each variant colors the chip background (good/warn/crit) or keeps brand (info). Tint-bg uses `{variant}-bg` at 14% alpha. Border always `line-strong`.
- **Chip content:** icon (default: info/check/alert-triangle/alert-circle based on variant; accepts custom children).
- **Title + description slot:** title = `fontSize.lg` / `fontWeight.semibold` / tight letter-spacing; description = `fontSize.body` / `ink-80`.
- **Optional action slot:** right-aligned button, `variant="ghost"` + `size="sm"`.
- API:
  ```ts
  <Callout variant="warn" title="Retest expires in 3 days" action={<Button>Extend</Button>}>
    Risk will revert to Open if not retested by Nov 12.
  </Callout>
  ```
- Tests: each variant renders the right chip bg + tint, padding is exactly 16/24, title + description render, action slot fires.

### CR-3 · Make Breadcrumb clickable (drill-down navigation)

Modify `packages/ui/src/components/Shell/Shell.tsx` → `Crumbs`:

- Non-current items become `<button type="button">` (not `<span>`). Tab-reachable, focus-visible outlined.
- `CrumbsProps` gains `onNavigate?: (index: number) => void`.
- Clicking a non-current crumb calls `onNavigate(index)`. Current item stays a `<span>` with `aria-current="page"`.
- Hover on non-current crumb = underline + `ink-100` color; current stays `ink-100` + semibold.
- **Do not introduce a separate Back button anywhere.** Drill-up comes only from the breadcrumb.

### CR-4 · Font loader

Google Fonts must actually load, not just be declared.

Option A (preferred — library-level): add a `fonts.ts` or `fonts.css` to `packages/design-system/src/` that emits a `<link>` or `@import` for:
- Space Grotesk: weights 500, 600, 700
- IBM Plex Sans: weights 300, 400, 500, 600
- JetBrains Mono: weights 400, 500, 700

Option B (app-level): document in `packages/design-system/README.md` that consumer apps must install these via `next/font` or similar. If Option B, add a small `@font-face` fallback in `global/index.css.ts` that at least references `font-display: swap`.

Pick **Option A with `@import url('https://fonts.googleapis.com/css2?...')`** at the top of the generated global CSS. Simpler for consumers.

Verify: after build, `pnpm install` in a fresh Next.js app + importing `@secureloop/design-system/global.css` renders body text in IBM Plex Sans without explicit consumer setup.

---

## HIGH — required before auditor / export features

### HI-1 · Print styles

Implement `docs/11_design_system_v2_draft.md` §13 fully. Add a new file `packages/design-system/src/print/index.css.ts` with the `@media print` rules specified:

- Force light palette: white bg, black ink, grey lines.
- Hide `.rail`, `.topbar`, `.tp-btn`, `.no-print`.
- Cards: no shadow, 1px grey border, `page-break-inside: avoid`.
- Links: black + underlined.
- Severity-encoded prefixes: `■■■■ ` / `■■■ ` / `■■ ` / `■ ` for crit/high/med/low via `::before`.
- Add a `.pg-break` utility class for manual page breaks.

Import into `src/index.ts` so apps get it automatically.

### HI-2 · Error state components

Build `packages/ui/src/components/ErrorState/` with two exported primitives:

- **`ErrorStateInline`** — recoverable. Card-shaped container, `sev-high-bg` tint, 3px `sev-high` left border, icon + title + description + `<Button>Retry</Button>`. Uses DS v2 §6.3.
- **`ErrorStateBanner`** — blocking. Full-width at top of content area, `sev-critical-bg` tint, 3px `sev-critical` top or left border, title + description + details disclosure + `<Button>Contact support</Button>`.

Both:
- Expose a `<Disclosure>` for technical details (collapsible, closed by default).
- Accept `correlationId` prop; when set, render a copy-to-clipboard `<Kbd>` chip showing the ID in the technical details.
- Plain-language first; jargon behind disclosure.

---

## MEDIUM — polish / completeness

### ME-1 · Tabs component

Build `packages/ui/src/components/Tabs/`. Segmented-pill style for top-level sections, underline style for in-page subsections. Keyboard: arrow keys navigate, Enter/Space activates.

### ME-2 · Checkbox + Radio primitives

Build `packages/ui/src/components/Checkbox/` and `Radio/`. Custom styled (not native default). Enforce v1 locked validation pattern (border-on-error only; never green border for valid). Use `brand` color for checked fill.

### ME-3 · Generic segmented-pill Toggle

Extract the pattern from `DensityToggle` into a generic `packages/ui/src/components/Toggle/` with:
- `Toggle` = controlled binary segmented pill.
- `DensityToggle` then becomes a thin wrapper around `Toggle` with density-specific logic.
- No iOS-style switches — ever.

### ME-4 · Tooltip component

Implement DS v2 §8. 350ms hover delay, `bg-overlay` bg, `line-strong` border, `--e-raised` shadow, 8/12 padding, `fontSize.micro`. Positional (`top`/`right`/`bottom`/`left`) with collision detection (flip when near viewport edge).

### ME-5 · Skip links

Implement DS v2 §8. `<SkipLinks>` component rendered at the start of `<body>`. Two default links: "Skip to main content", "Skip to navigation". Visually hidden until keyboard-focused; on focus, reveal at top-left with brand bg + ink.

### ME-6 · Shared ESLint + Prettier config packages

- Create `packages/eslint-config/` exporting a flat config for React + TypeScript + vanilla-extract. Presets: recommended, browser, node.
- Root `.prettierrc` (JSON) with 2-space indent, single quotes, trailing commas = all, print width 100.
- Root `package.json` gains a `lint` script wiring both.
- Add `"lint": "eslint ."` and `"format": "prettier --write ."` to the root scripts.

### ME-7 · Table extensions

Extend `Table` per DS v2 §7:
- **Sticky header** on scroll (shadow appears on scroll).
- **First column pinning** when `<TableHeaderCell pinned>` / `<TableCell pinned>` used.
- **Column resize** via 4px hover zone on `<col>` dividers. Persists width in props (controlled).
- **Inline edit** — a `<TableCell editable onCommit={...}>` variant: double-click to enter edit mode, Enter saves, Esc cancels.

Test each in isolation first; wire together later.

---

## LOW — polish, can defer past first vertical slice

### LO-1 · Success check-draw animation

DS v2 §5.4. SVG with `stroke-dasharray` + `stroke-dashoffset` animated from full to 0. Duration `duration.slower`, easing `easing.emphasized`. Exported as `<SuccessCheck />` component taking a `size` prop.

### LO-2 · Number roll-up counter

DS v2 §5.5. `<NumberRoll value={100} />` counts from 0 → value over `duration.slower` using `requestAnimationFrame`. Class `.sl-num` for tabular figures applied automatically.

### LO-3 · Brand moments

DS v2 §14 — auth screen glow, loading splash logomark, success pulse, rare celebration confetti. Scope these per-screen later; not primitives in `packages/ui`.

### LO-4 · Command palette (⌘K)

DS v2 §8 (explicitly Phase 2). Skip for now.

### LO-5 · Add Turborepo

Deferred until service count > 5. When added: `turbo.json` with `build`, `typecheck`, `lint`, `test` pipelines; Remote Caching optional.

---

## Hand-off protocol

After finishing each band (CRITICAL, then HIGH, then MEDIUM):

1. Run `pnpm build` from repo root — must succeed with zero TypeScript errors.
2. Run `pnpm typecheck` — must pass.
3. If tests are present, run `pnpm test` — all must pass.
4. Update `CLAUDE.md` §12 checkboxes to reflect completion.
5. Stop and tell Mahesh the band is complete. Wait for approval before starting the next band.

Do not cross-band. Do not reorder. Do not skip tests because "they'll come later."

---

## Explicit NON-goals (do not do)

- Do not modify v1 tokens in any way.
- Do not add or modify locked patterns in `CLAUDE.md` §7.
- Do not violate exclusions in `CLAUDE.md` §8.
- Do not introduce mobile-responsive breakpoints in component implementations (breakpoints stay declared but unconsumed per DS v2 §15).
- Do not build services, workers, or apps yet. This remediation is for `packages/*` only.
- Do not change the backend stack, database choice, or event bus.
- Do not introduce new dependencies without explicit approval. Existing: React 18, vanilla-extract, tsup, TypeScript 5.5, pnpm.
