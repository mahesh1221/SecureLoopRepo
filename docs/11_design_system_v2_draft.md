# SecureLoop Design System v2 · DRAFT

**Status:** DRAFT · additive enhancements layered over DS v1 · NOT frozen
**Purpose:** Elevate the look and feel of SecureLoop for a corporate audience during front-end implementation, without touching any frozen v1 token.

---

## 0. Compatibility contract with DS v1

**Frozen — untouched:**
- Fonts (Space Grotesk / IBM Plex Sans / JetBrains Mono)
- Type scale (10 / 11 / 13 / 15 / 20 / 28 / 44)
- Spacing scale (4 / 8 / 12 / 16 / 24 / 32 / 48)
- Radius scale (3 / 6 / 10 / 999)
- All four theme palettes (Coffee Dark/Light · Blue Dark/Light)
- All locked patterns (validation, toggles, wizards, drill-down, modals, shell, callout)

**New in v2 — additive:**
Everything below is net-new. Nothing in v1 changes meaning or value. A v1 screen renders identically; a v2 screen picks up the new primitives as needed.

---

## 1. Elevation system (4-tier)

Consistent shadow scale with theme-aware opacities. All existing cards remain on `--e-card`; new tiers add depth without re-designing.

```css
/* Coffee Dark / Blue Dark — deeper shadows, warm/cool undertone */
--e-flat:   0 0 0 1px var(--line);
--e-card:   0 1px 2px rgba(0,0,0,.32), 0 1px 0 rgba(255,255,255,.02) inset;
--e-raised: 0 4px 12px rgba(0,0,0,.42), 0 1px 0 rgba(255,255,255,.03) inset;
--e-overlay:0 12px 32px rgba(0,0,0,.52), 0 0 0 1px var(--line-strong);
--e-modal:  0 24px 64px rgba(0,0,0,.64), 0 0 0 1px var(--line-strong);

/* Coffee Light / Blue Light — softer, cooler */
--e-flat:   0 0 0 1px var(--line);
--e-card:   0 1px 2px rgba(43,24,16,.06), 0 1px 3px rgba(43,24,16,.04);
--e-raised: 0 4px 10px rgba(43,24,16,.08), 0 1px 2px rgba(43,24,16,.06);
--e-overlay:0 12px 28px rgba(43,24,16,.12), 0 0 0 1px var(--line-strong);
--e-modal:  0 24px 56px rgba(43,24,16,.18), 0 0 0 1px var(--line-strong);
```

Usage: `.card`, `.kpi`, `.stat-tile` → `--e-card`. Popovers, sticky sidebars → `--e-raised`. Theme picker, dropdown menus → `--e-overlay`. Modals, wizards → `--e-modal`.

---

## 2. Motion tokens

Named durations + easing curves. No more ad-hoc `.15s` scattered everywhere.

```css
--dur-fast:    120ms;  /* hover, focus, small state changes */
--dur-base:    200ms;  /* standard transitions */
--dur-slow:    320ms;  /* modal rise, drawer open */
--dur-slower:  500ms;  /* success moments, orchestrated sequences */

--ease-out:         cubic-bezier(.2, .7, .2, 1);     /* standard exit */
--ease-in-out:      cubic-bezier(.4, 0, .2, 1);       /* symmetric */
--ease-spring:      cubic-bezier(.34, 1.56, .64, 1);  /* subtle overshoot — buttons, cards */
--ease-emphasized:  cubic-bezier(.2, 0, 0, 1);        /* hero moments, primary CTAs */
```

Rule: everything in v2 uses these. Example: `transition: all var(--dur-fast) var(--ease-out)`.

---

## 3. Density modes

Corporate power-users want dense. New users want comfortable. Single `data-density` attribute on `<body>` switches row heights + card padding globally.

```css
/* Comfortable (default) */
[data-density="comfortable"] {
  --row-h: 44px;
  --card-pad-y: var(--s-4);   /* 16 */
  --card-pad-x: var(--s-6);   /* 24 */
  --table-cell-y: 10px;
  --input-h: 36px;
}
/* Compact */
[data-density="compact"] {
  --row-h: 32px;
  --card-pad-y: var(--s-3);   /* 12 */
  --card-pad-x: var(--s-4);   /* 16 */
  --table-cell-y: 6px;
  --input-h: 30px;
}
```

Type scale is never compressed — only padding + row height. Headers stay the same rhythm.

---

## 4. Data-visualisation palette

Existing severity colors are for **status**, not charting. Charts need dedicated, colorblind-safe palettes.

### 4.1 Categorical (8 colors) — use up to 8 series side-by-side
```css
--dv-cat-1: #6F9CEB;   /* blue */
--dv-cat-2: #E8A23D;   /* amber */
--dv-cat-3: #5FB89D;   /* teal */
--dv-cat-4: #C678B8;   /* mauve */
--dv-cat-5: #D47766;   /* terracotta */
--dv-cat-6: #9BB86F;   /* olive */
--dv-cat-7: #7B8FB8;   /* slate */
--dv-cat-8: #D4A87A;   /* tan */
```
Order is deliberate: luminance-balanced so no series dominates. Tested against Deuteranopia + Protanopia.

### 4.2 Sequential (5-step) — heatmaps, intensity
```css
--dv-seq-1: #1F3A52;  /* darkest */
--dv-seq-2: #3A5F82;
--dv-seq-3: #5C87AE;
--dv-seq-4: #8AAFCF;
--dv-seq-5: #BFD6E8;  /* lightest */
```

### 4.3 Diverging (risk trending, variance from baseline)
```css
--dv-div-neg-3: #B85840;   /* strong negative */
--dv-div-neg-2: #D48870;
--dv-div-neg-1: #E8B9A8;
--dv-div-0:     #C9C0AA;   /* neutral — matches ink-20 */
--dv-div-pos-1: #A8C9B5;
--dv-div-pos-2: #70A888;
--dv-div-pos-3: #4A8860;   /* strong positive */
```

### 4.4 Chart chrome
```css
--dv-grid:  var(--line);         /* gridlines, barely there */
--dv-axis:  var(--ink-40);       /* axis labels */
--dv-track: var(--bg-overlay);   /* progress bar track */
```

**Rule:** severity colors (`--sev-*`) are reserved for risk/status communication. Never use them for neutral category encoding.

---

## 5. Micro-interaction library

Named, reusable motion patterns. Each is a CSS class + the tokens from §2.

### 5.1 Hover lift (cards, action tiles)
```css
.mi-lift { transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.mi-lift:hover { transform: translateY(-2px); box-shadow: var(--e-raised); }
```

### 5.2 Press scale (buttons, tiles)
```css
.mi-press:active { transform: scale(.97); transition: transform 80ms var(--ease-out); }
```

### 5.3 Skeleton shimmer (loading)
```css
.sk { background: linear-gradient(90deg, var(--bg-raised) 0%, var(--bg-hover) 50%, var(--bg-raised) 100%); background-size: 200% 100%; animation: sk-shim 1.4s linear infinite; border-radius: var(--r-sm); }
@keyframes sk-shim { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
```

### 5.4 Success check-draw (dialog confirmations)
Stroked SVG with `stroke-dasharray` + `stroke-dashoffset` animated from full to zero. Duration `--dur-slower` · easing `--ease-emphasized`.

### 5.5 Number roll-up counter (KPIs on load)
JS-driven count from 0 to target value over `--dur-slower`. Tabular figures only (see §9.1).

### 5.6 Row focus highlight (tables)
```css
.tbl tr { transition: background-color var(--dur-fast) var(--ease-out); }
.tbl tr:hover { background: var(--bg-hover); }
.tbl tr:focus-within { background: var(--brand-dim); box-shadow: inset 2px 0 0 var(--brand); }
```

### 5.7 Pulsing dot (LIVE, real-time)
Already established in IE-03. Now canonical.

### 5.8 Modal rise-in
Already in v1. Explicitly named `.mi-rise-in` with `--dur-slow --ease-emphasized`.

---

## 6. Empty / Loading / Error states

No more blank containers. Every data surface has three states defined.

### 6.1 Empty state
- Abstract SVG illustration (280×200), NOT an icon
- Uses `--ink-40` and `--ink-20` for soft, branded tone
- Headline (`--text-xl`, Space Grotesk 600) + supporting line (`--text-body`, ink-60)
- Optional primary CTA centered below
- Composition: card-centered, 64px top + bottom padding

### 6.2 Loading state
- **Skeleton screens** that match the final layout shape (not spinners for layouts)
- Spinner only for inline async actions (save, test connection) — 16px circular, 1.5 stroke, stroke-dasharray animated

### 6.3 Error state
- Recoverable: inline card with `sev-high-bg` tint + `sev-high` left border + Retry button
- Blocking: full-width banner at top of content area with `sev-critical-bg` + details link + Contact support
- Always: plain-language error + technical detail tucked behind a "Show technical details" expander

---

## 7. Table patterns

SecureLoop is data-heavy. Tables need to be first-class.

- **Sticky header row** with `--e-card` shadow on scroll
- **Resizable columns** via a 4px hover zone on column dividers
- **Column pinning** — first column (identifier) pins left with `--e-raised` shadow on scroll
- **Row selection** — checkbox column when bulk actions exist; selected row = `brand-dim` bg + 2px left `brand` border
- **Row hover** = `bg-hover`
- **Zebra** (optional, `[data-zebra="true"]`) = even rows `bg-overlay`
- **Inline edit** — double-click cell; cell grows 2px border `brand`, input inherits cell size, Enter saves, Esc cancels
- **Empty-table state** follows §6.1 inside the table container
- **Sort indicators** — up/down chevron next to sortable headers; active sort shows chevron in `ink-100` + column header bolded
- **Numeric columns** right-aligned, tabular figures (§9.1)

---

## 8. Keyboard & accessibility

- **Focus ring** stays v1-locked (2px brand outline, 2px offset).
- **Keyboard shortcut chip** — small pill showing ⌘K / Esc / Enter: `bg-base` + `line-strong` border + mono micro, 2px padding, radius 3. Shown inline next to actions or in a footer tip strip.
- **Command palette** — ⌘K opens full-screen overlay (uses `--e-modal`), search input at top, grouped results, keyboard-navigable. Phase 2 commit.
- **Skip links** — visible on keyboard focus at top of page: "Skip to main content" / "Skip to navigation".
- **Tooltip pattern** (new) — 350ms delay on hover; `bg-overlay` bg, `line-strong` border, `--e-raised` shadow, 8/12 padding, text-micro.

---

## 9. Typography rhythm

### 9.1 Line-height scale
```css
--lh-tight:   1.2;   /* display numbers, hero headlines */
--lh-snug:    1.4;   /* headings, titles */
--lh-normal:  1.5;   /* body text */
--lh-relaxed: 1.65;  /* long-form narrative, policy text */
```

### 9.2 Tabular figures
```css
.num { font-variant-numeric: tabular-nums; }
```
Apply to: every KPI value, every data table numeric column, every progress/percentage, every timer. Stops digit-width jitter on updates.

### 9.3 Letter-spacing by weight
- 700+ weight (headlines): `letter-spacing: -0.02em` (tightens slightly for optical balance)
- 400-600 (body): `letter-spacing: 0`
- Uppercase micro labels: `letter-spacing: 0.1em`
- Mono (JetBrains): `letter-spacing: 0` (already optimised)

---

## 10. Icon weight & size system

- **Stroke width:** 1.8 everywhere (Lucide/Feather style). Already de facto; now explicit.
- **Sizes (only these):** 12 / 14 / 16 / 20 / 24 / 32px.
- **Status icon variant** — filled circle background in status color + white/bg-page stroke icon inside. Used for success checks, warning triangles, info circles where extra emphasis is needed (reuses the IE-01 test-results check pattern).

---

## 11. Depth-of-hierarchy cues

Subtle touches that separate SecureLoop from generic dashboards.

### Dark mode
- Raised surfaces get a **1px inner top highlight** (`inset 0 1px 0 rgba(255,255,255,.03)`) — already baked into `--e-raised` above.
- Hover states gain a **2% additive warmth** (Coffee) or **2% additive cool** (Blue).

### Light mode
- Raised surfaces get a **subtle bottom shadow only** (no top highlight).
- Cards on hover dim their border slightly (`line` → `line-strong` via `--dur-fast`).

---

## 12. Chrome refinements

- **Grain overlay** — v1 default (0.025 dark / 0.05 light) stays. On specific hero surfaces (landing, auth, empty states) bump to 0.04 / 0.08 for a more paper-like feel.
- **Backdrop saturation** on modal open: `backdrop-filter: blur(8px) saturate(1.2)` — adds a subtle warmth to the backdrop that matches the palette family.
- **Focus ring on dark backgrounds** — add `0 0 0 4px var(--brand-dim)` halo in addition to the 2px outline for better visibility on high-contrast surfaces.

---

## 13. Print & export styles

Board reports, auditor evidence packages, and invoices need to survive print.

```css
@media print {
  :root { --bg-page: #fff; --ink-100: #000; --ink-80: #222; --line: #ccc; --line-strong: #888; }
  .rail, .topbar, .tp-btn, .no-print { display: none !important; }
  .card { box-shadow: none !important; border: 1px solid #ccc !important; page-break-inside: avoid; }
  a { color: #000; text-decoration: underline; }
  /* Severity — encoded for B&W */
  .sev-critical::before { content: "■■■■ "; }
  .sev-high::before     { content: "■■■ "; }
  .sev-medium::before   { content: "■■ "; }
  .sev-low::before      { content: "■ "; }
}
```

Plus: `.pg-break` utility for manual page breaks in long reports.

---

## 14. Brand moments

Places where SecureLoop earns a signature.

- **Auth screens** — centered SecureLoop mark with subtle Coffee-family gradient glow (`brand-glow` radial at 40% opacity) behind the form.
- **Empty states** — abstract SVG uses a consistent "investigation-grade" visual language: thin strokes, monospace accents, dotted grid backdrops.
- **Loading splash** (app boot) — logomark fades in, thin stroke circle rotates around it (1 rev per second), subtitle "Investigating your posture…" in Space Grotesk 500.
- **Success moments** (save complete, fix deployed) — brief check-draw animation + soft `brand-glow` halo pulse, then fade. 800ms total.
- **Celebration state** (rare — e.g. "All critical findings resolved") — subtle confetti of brand-ink squares falling for 1.5s. Reserved for genuinely earned moments; never for trivial saves.

---

## 15. Responsive reflow rules · Phase 2 ready

Define breakpoints now so v2 components can be built responsive-aware even if we don't ship mobile yet.

```css
--bp-sm:  640px;   /* phone */
--bp-md:  900px;   /* tablet */
--bp-lg:  1200px;  /* laptop */
--bp-xl:  1440px;  /* desktop */
--bp-2xl: 1760px;  /* wide */
```

Reflow rules (Phase 2):
- Below `--bp-lg`: sidebars collapse to bottom drawers.
- Below `--bp-md`: 64px rail becomes 56px bottom tab bar.
- Below `--bp-sm`: multi-column grids stack; tables get horizontal scroll with pinned first column.

---

## Appendix A · Roll-out priority for v2

If adopting piecemeal during front-end build:

1. §1 Elevation + §2 Motion + §9 Rhythm — lowest effort, biggest polish per pixel
2. §4 Data-viz palette + §7 Tables — biggest functional upgrade
3. §3 Density modes + §6 Empty/Loading/Error — power-user affordances
4. §5 Micro-interactions + §14 Brand moments — the "corporate premium" layer
5. §13 Print + §15 Responsive — ship-blocker for auditors + Phase 2 readiness

---

**End of DS v2 DRAFT · layered on DS v1 · nothing frozen yet**
