# SecureLoop Monorepo

Foundation for SecureLoop GRC Platform front-end development.

## Packages

| Package | Purpose |
|---|---|
| `@secureloop/design-system` | Design tokens, themes, CSS variables, motion/elevation/data-viz primitives. No React. |
| `@secureloop/ui` | React component library built on top of the design system. Vanilla-extract for styling. |

## Design System foundation

This monorepo implements **SecureLoop DS v2 DRAFT** which extends the frozen DS v1 with additive enhancements:

- v1 frozen tokens: fonts, type scale, spacing, radius, 4 theme palettes (Coffee/Blue × Dark/Light)
- v2 additive: 4-tier elevation, motion tokens, data-viz palettes (categorical / sequential / diverging), density modes, typography rhythm, breakpoints

## Stack

- **React 18** + **TypeScript 5.5**
- **vanilla-extract** for zero-runtime CSS-in-TS
- **pnpm** workspaces
- **tsup** for library bundling
- Peer-deps only for React — no lock-in

## Commands

```bash
pnpm install
pnpm build           # build all packages
pnpm dev             # watch mode on all packages
pnpm typecheck       # typecheck across workspace
```

## Workspace layout

```
packages/
├── design-system/   # tokens, CSS vars, theme classes
│   └── src/
│       ├── tokens/        # primitive v1 tokens (type/space/radius/fonts)
│       ├── themes/        # 4-theme palette contract
│       ├── elevation/     # 4-tier shadow system
│       ├── motion/        # duration + easing tokens
│       ├── dataviz/       # chart palettes (cat/seq/div)
│       └── global/        # global CSS, reset, grain
└── ui/              # React components
    └── src/
        ├── components/    # Button, Card, Table, Modal, Shell, etc.
        ├── primitives/    # low-level building blocks
        └── utils/         # hooks, helpers
```

## Licensing

Internal · Anthropic/SecureLoop — proprietary.
