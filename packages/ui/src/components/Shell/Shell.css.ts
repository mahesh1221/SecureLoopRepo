import { style } from '@vanilla-extract/css';
import { theme, transition, fontFamily } from '@secureloop/design-system';

// ─── Rail (left, 64px) ────────────────────────────────────────────
export const rail = style({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: '64px',
  background: theme.bg.base,
  borderRight: `1px solid ${theme.line.default}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '12px 0',
  gap: '6px',
  zIndex: 50,
});

export const brand = style({
  width: '40px',
  height: '40px',
  borderRadius: '6px',
  background: theme.brand.default,
  color: theme.brand.ink,
  display: 'grid',
  placeItems: 'center',
  fontFamily: fontFamily.display,
  fontWeight: 700,
  fontSize: '18px',
  marginBottom: '10px',
  boxShadow: theme.elevation.card,
});

export const railItem = style({
  width: '40px',
  height: '40px',
  borderRadius: '6px',
  display: 'grid',
  placeItems: 'center',
  color: theme.ink['60'],
  cursor: 'pointer',
  transition: transition('all', 'fast'),
  position: 'relative',
  border: 'none',
  background: 'transparent',
  selectors: {
    '&:hover': {
      background: theme.bg.hover,
      color: theme.ink['100'],
    },
    '&[data-active="true"]': {
      background: theme.brand.dim,
      color: theme.ink['100'],
    },
    '&[data-active="true"]::before': {
      content: '""',
      position: 'absolute',
      left: '-12px',
      top: '6px',
      bottom: '6px',
      width: '3px',
      background: theme.brand.default,
      borderRadius: '0 3px 3px 0',
    },
  },
});

export const railSpacer = style({ flex: 1 });

// ─── Topbar ───────────────────────────────────────────────────────
export const topbar = style({
  position: 'fixed',
  top: 0,
  left: '64px',
  right: 0,
  height: '56px',
  background: theme.bg.base,
  borderBottom: `1px solid ${theme.line.default}`,
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px',
  gap: '16px',
  zIndex: 40,
});

export const crumbs = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '11px',
  fontFamily: fontFamily.ui,
});

export const crumbSep = style({
  color: theme.ink['40'],
});

export const crumbCurrent = style({
  color: theme.ink['100'],
  fontWeight: 600,
});

export const crumbStep = style({
  color: theme.ink['60'],
});

export const idPill = style({
  marginLeft: '8px',
  padding: '2px 8px',
  background: theme.bg.overlay,
  border: `1px solid ${theme.line.default}`,
  borderRadius: '3px',
  fontFamily: fontFamily.mono,
  fontSize: '10px',
  color: theme.ink['60'],
  fontWeight: 600,
});

export const topbarSpacer = style({ flex: 1 });

export const topbarRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

// ─── Main content area ────────────────────────────────────────────
export const main = style({
  marginLeft: '64px',
  paddingTop: '56px',
  minHeight: '100vh',
});
