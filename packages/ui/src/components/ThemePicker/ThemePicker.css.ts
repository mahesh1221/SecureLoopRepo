import { style, globalStyle, keyframes } from '@vanilla-extract/css';
import { theme, transition, fontFamily } from '@secureloop/design-system';

export const wrap = style({ position: 'relative' });

export const toggle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 10px',
  background: theme.bg.overlay,
  border: `1px solid ${theme.line.default}`,
  borderRadius: '6px',
  color: theme.ink['100'],
  fontSize: '11px',
  fontFamily: fontFamily.ui,
  cursor: 'pointer',
  transition: transition('all', 'fast'),
  selectors: {
    '&:hover': { borderColor: theme.line.strong },
  },
});

export const swatches = style({
  display: 'inline-flex',
  gap: '3px',
});

export const sw = style({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  border: `1px solid ${theme.line.strong}`,
});

const riseIn = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const popover = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  width: '320px',
  background: theme.bg.overlay,
  border: `1px solid ${theme.line.strong}`,
  borderRadius: '10px',
  padding: '16px',
  zIndex: 100,
  boxShadow: theme.elevation.overlay,
  animation: `${riseIn} 320ms cubic-bezier(.2,0,0,1)`,
});

export const section = style({
  marginBottom: '12px',
  selectors: { '&:last-child': { marginBottom: 0 } },
});

export const sectionLabel = style({
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: theme.ink['60'],
  fontWeight: 600,
  marginBottom: '8px',
});

export const families = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
});

export const card = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: '6px',
  padding: '10px',
  cursor: 'pointer',
  textAlign: 'left',
  fontFamily: fontFamily.ui,
  color: theme.ink['100'],
  transition: transition('all', 'fast'),
  selectors: {
    '&:hover': {
      borderColor: theme.line.strong,
      transform: 'translateY(-1px)',
      boxShadow: theme.elevation.card,
    },
    '&[data-active="true"]': {
      borderColor: theme.brand.default,
      background: theme.brand.dim,
    },
  },
});

export const preview = style({
  display: 'flex',
  gap: '3px',
  marginBottom: '8px',
  height: '18px',
  borderRadius: '3px',
  overflow: 'hidden',
});

globalStyle(`${preview} > span`, { flex: 1 });

export const cardName = style({
  fontFamily: fontFamily.display,
  fontWeight: 600,
  fontSize: '11px',
});

export const cardDesc = style({
  fontSize: '10px',
  color: theme.ink['60'],
  marginTop: '2px',
});

export const modes = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
});

export const mode = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: '6px',
  padding: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  fontSize: '11px',
  color: theme.ink['100'],
  fontFamily: fontFamily.ui,
  fontWeight: 500,
  transition: transition('all', 'fast'),
  selectors: {
    '&:hover': {
      borderColor: theme.line.strong,
      background: theme.bg.hover,
    },
    '&[data-active="true"]': {
      borderColor: theme.brand.default,
      background: theme.brand.dim,
    },
  },
});

globalStyle(`${mode} svg`, { width: '13px', height: '13px' });
