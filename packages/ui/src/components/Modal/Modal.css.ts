import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { theme, transition, fontFamily } from '@secureloop/design-system';

const fadeKf = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const riseIn = keyframes({
  from: { opacity: 0, transform: 'translateY(8px) scale(0.98)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
});

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.52)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  zIndex: 500,
  display: 'grid',
  placeItems: 'center',
  padding: '32px',
  animation: `${fadeKf} 320ms cubic-bezier(.2,0,0,1)`,
});

export const dialog = recipe({
  base: {
    background: theme.bg.raised,
    border: `1px solid ${theme.line.strong}`,
    borderRadius: '10px',
    boxShadow: theme.elevation.modal,
    maxHeight: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    animation: `${riseIn} 320ms cubic-bezier(.2,0,0,1)`,
    width: '100%',
  },
  variants: {
    kind: {
      form: { maxWidth: '880px' }, // v1 locked
      wizard: { maxWidth: '900px' }, // v1 locked
      confirm: { maxWidth: '520px' },
      custom: {},
    },
  },
  defaultVariants: { kind: 'form' },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px 24px',
  borderBottom: `1px solid ${theme.line.default}`,
  flexShrink: 0,
});

export const headerTitle = style({
  flex: 1,
  fontFamily: fontFamily.display,
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: theme.ink['100'],
  margin: 0,
});

export const closeBtn = style({
  width: '32px',
  height: '32px',
  borderRadius: '6px',
  border: 'none',
  background: 'transparent',
  color: theme.ink['60'],
  cursor: 'pointer',
  display: 'grid',
  placeItems: 'center',
  transition: transition('all', 'fast'),
  selectors: {
    '&:hover': { background: theme.bg.hover, color: theme.ink['100'] },
  },
});

export const body = style({
  padding: '24px',
  overflowY: 'auto',
  flex: 1,
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px 24px',
  borderTop: `1px solid ${theme.line.default}`,
  flexShrink: 0,
  background: theme.bg.overlay,
});

export const footerSpacer = style({ flex: 1 });
