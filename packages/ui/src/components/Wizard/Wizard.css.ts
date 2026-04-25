import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { theme, transition, fontFamily, easing, duration } from '@secureloop/design-system';

const riseIn = keyframes({
  from: { opacity: 0, transform: 'translateY(8px) scale(0.98)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
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
  animation: `${fadeIn} ${duration.slow} ${easing.out}`,
});

export const dialog = style({
  background: theme.bg.raised,
  border: `1px solid ${theme.line.strong}`,
  borderRadius: '10px',
  boxShadow: theme.elevation.modal,
  maxWidth: '900px',
  width: '100%',
  maxHeight: 'calc(100vh - 64px)',
  display: 'flex',
  flexDirection: 'column',
  animation: `${riseIn} ${duration.slow} ${easing.out}`,
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
  flexShrink: 0,
  transition: transition('all', 'fast'),
  selectors: {
    '&:hover': { background: theme.bg.hover, color: theme.ink['100'] },
    '&:focus-visible': {
      outline: `2px solid ${theme.brand.default}`,
      outlineOffset: '2px',
    },
  },
});

export const stepDotsRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '16px 24px 0',
  flexShrink: 0,
});

export const dot = styleVariants({
  active: {
    width: '24px',
    height: '8px',
    borderRadius: '999px',
    background: theme.brand.default,
    transition: transition('all', 'base'),
  },
  done: {
    width: '8px',
    height: '8px',
    borderRadius: '999px',
    background: theme.brand.default,
    opacity: 0.5,
    transition: transition('all', 'base'),
  },
  upcoming: {
    width: '8px',
    height: '8px',
    borderRadius: '999px',
    background: theme.line.strong,
    transition: transition('all', 'base'),
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

export const backBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  height: '36px',
  padding: '0 16px',
  borderRadius: '6px',
  border: `1px solid ${theme.line.default}`,
  background: 'transparent',
  color: theme.ink['80'],
  fontSize: '13px',
  fontFamily: fontFamily.ui,
  fontWeight: 500,
  cursor: 'pointer',
  transition: transition('all', 'fast'),
  selectors: {
    '&:hover:not(:disabled)': {
      background: theme.bg.hover,
      color: theme.ink['100'],
      borderColor: theme.line.strong,
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.brand.default}`,
      outlineOffset: '2px',
    },
    '&[data-hidden="true"]': {
      display: 'none',
    },
  },
});
