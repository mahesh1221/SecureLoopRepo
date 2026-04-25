import { globalStyle, globalFontFace, keyframes } from '@vanilla-extract/css';
import { theme } from '../themes/contract';
import { fontFamily, lineHeight } from '../tokens/typography';
import { density } from '../tokens/space';

// ─── Base reset ──────────────────────────────────────────────────
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
});

globalStyle('body', {
  background: theme.bg.page,
  color: theme.ink['100'],
  fontFamily: fontFamily.ui,
  fontSize: '13px',
  lineHeight: lineHeight.normal,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'optimizeLegibility',
});

// ─── Headings ────────────────────────────────────────────────────
globalStyle('h1, h2, h3, h4, h5, h6', {
  fontFamily: fontFamily.display,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  margin: 0,
  lineHeight: lineHeight.snug,
});

// ─── Focus ring (v1 locked) ──────────────────────────────────────
globalStyle(':focus', { outline: 'none' });
globalStyle(':focus-visible', {
  outline: `2px solid ${theme.brand.default}`,
  outlineOffset: '2px',
  boxShadow: `0 0 0 6px ${theme.misc.focusHalo}`,
});

// ─── v2 chrome: grain overlay ────────────────────────────────────
globalStyle('body::before', {
  content: '""',
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 9999,
  opacity: theme.misc.grainOpacity,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
});

// ─── v2 density modes via data-density on body ───────────────────
globalStyle('body[data-density="comfortable"]', {
  vars: {
    '--sl-row-h': density.comfortable.rowHeight,
    '--sl-card-pad-y': density.comfortable.cardPaddingY,
    '--sl-card-pad-x': density.comfortable.cardPaddingX,
    '--sl-table-cell-y': density.comfortable.tableCellY,
    '--sl-input-h': density.comfortable.inputHeight,
  },
});

globalStyle('body[data-density="compact"]', {
  vars: {
    '--sl-row-h': density.compact.rowHeight,
    '--sl-card-pad-y': density.compact.cardPaddingY,
    '--sl-card-pad-x': density.compact.cardPaddingX,
    '--sl-table-cell-y': density.compact.tableCellY,
    '--sl-input-h': density.compact.inputHeight,
  },
});

// ─── Tabular numerics helper ─────────────────────────────────────
globalStyle('.sl-num', {
  fontVariantNumeric: 'tabular-nums',
});

// ─── Shared keyframes exposed globally ───────────────────────────
export const kf = {
  fadeUp: keyframes({
    from: { opacity: 0, transform: 'translateY(8px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  }),
  fadeIn: keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }),
  scaleIn: keyframes({
    from: { opacity: 0, transform: 'scale(0.96)' },
    to: { opacity: 1, transform: 'scale(1)' },
  }),
  pulse: keyframes({
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.4 },
  }),
  shimmer: keyframes({
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
  }),
  riseIn: keyframes({
    from: { opacity: 0, transform: 'translateY(8px) scale(0.98)' },
    to: { opacity: 1, transform: 'translateY(0) scale(1)' },
  }),
};
