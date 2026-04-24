# @secureloop/design-system

Token-based design system for the SecureLoop GRC Platform.

## What's inside

- **Tokens** (v1 frozen): `fontFamily`, `fontSize`, `fontWeight`, `space`, `radius`
- **Typography rhythm** (v2): `lineHeight`, `letterSpacing`
- **Themes**: 4 theme combos (Coffee Dark/Light, Blue Dark/Light) registered as global CSS via vanilla-extract
- **Motion** (v2): `duration`, `easing`, `transition()` helper
- **Elevation** (v2): 4-tier shadow system (`flat`, `card`, `raised`, `overlay`, `modal`)
- **Data viz** (v2): `categorical[]` (8), `sequential[]` (5), `diverging[]` (7) palettes
- **Density** (v2): comfortable ↔ compact modes applied via `body[data-density]`
- **Breakpoints** (v2): reference tokens for Phase 2 responsive work

## Usage

```ts
// app root — import once; registers all themes + global CSS
import '@secureloop/design-system';

// elsewhere — import tokens in vanilla-extract stylesheets
import { theme, transition, catAt } from '@secureloop/design-system';
import { style } from '@vanilla-extract/css';

export const myCard = style({
  background: theme.bg.raised,
  boxShadow: theme.elevation.card,
  transition: transition('box-shadow', 'base'),
});
```

## Apply a theme

Set a body class and density attribute:

```html
<body class="t-coffee-dark" data-density="comfortable">
  ...
</body>
```

Available theme classes:
- `t-coffee-dark` (default)
- `t-coffee-light`
- `t-blue-dark`
- `t-blue-light`

Density modes:
- `data-density="comfortable"` (default)
- `data-density="compact"`

## Frozen contract

Nothing in v1 tokens changes value. v2 additions are strictly additive.
CSS variables prefixed `--sl-*` to avoid collisions.
