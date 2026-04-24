# @secureloop/ui

React component library built on `@secureloop/design-system`.

## Components

| Category | Exports |
|---|---|
| Theme | `ThemeProvider`, `useTheme`, `ThemePicker`, `DensityToggle` |
| Shell | `Rail`, `RailItem`, `RailSpacer`, `Topbar`, `TopbarRight`, `TopbarSpacer`, `Crumbs`, `Main` |
| Primitives | `Button`, `Card` + `CardHead` + `CardBody`, `Badge`, `Chip`, `Input`, `Select`, `Modal`, `Icon` + `icons`, `Skeleton` + `SkeletonStack`, `EmptyState`, `LiveDot`, `Kbd` |
| Table | `TableWrap`, `TableToolbar`, `Table`, `TableHead`, `TableBody`, `TableHeaderCell`, `TableRow`, `TableCell`, `TableCheckbox`, `TableFooter` |
| Data viz | `Gauge` |
| Utils | `cn`, `useClickOutside` |

## Minimal app example

```tsx
import '@secureloop/design-system'; // register themes + global CSS
import {
  ThemeProvider, ThemePicker, DensityToggle,
  Rail, RailItem, RailSpacer, Topbar, TopbarRight, Crumbs, Main,
  Card, CardHead, CardBody, Button, Badge, Icon, icons
} from '@secureloop/ui';

export default function App() {
  return (
    <ThemeProvider defaultTheme="coffee-dark" storageKey="sl-theme">
      <Rail brandGlyph="S">
        <RailItem active label="Risk posture">
          <Icon size="20"><icons.pulse /></Icon>
        </RailItem>
        <RailItem label="Compliance">
          <Icon size="20"><icons.shield /></Icon>
        </RailItem>
        <RailSpacer />
        <RailItem label="Sign out">
          <Icon size="20"><icons.signOut /></Icon>
        </RailItem>
      </Rail>

      <Topbar>
        <Crumbs
          items={['SecureLoop', 'CISO', 'Risk Posture Dashboard']}
          pill="CISO-01-1"
        />
        <TopbarRight>
          <DensityToggle storageKey="sl-density" />
          <ThemePicker />
        </TopbarRight>
      </Topbar>

      <Main>
        <div style={{ padding: 24 }}>
          <Card elevation="card">
            <CardHead title="Overall risk score" meta="0 – 100" />
            <CardBody>
              <Badge tone="good">78 · ON TRACK</Badge>
              <Button variant="primary" style={{ marginTop: 16 }}>
                Refresh
              </Button>
            </CardBody>
          </Card>
        </div>
      </Main>
    </ThemeProvider>
  );
}
```

## Design principles enforced

- **Validation**: `Input` shows red border only on error. Valid renders inline check + "Valid" text — never a green border.
- **Toggles**: use `DensityToggle` or `Badge`/`Chip` patterns for segmented pills. No iOS-style switches.
- **Modal**: 880px (form) / 900px (wizard) widths baked in. × in header is the sole close. No Cancel button in wizard footer.
- **Focus**: 2px brand outline + 6px halo via `:focus-visible`. Never removed.
- **Icons**: stroke 1.8, sizes 12/14/16/20/24/32 only.
- **Typography**: `.sl-num` class applies tabular figures — use on all data values.
