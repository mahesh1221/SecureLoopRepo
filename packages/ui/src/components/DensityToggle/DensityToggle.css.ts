import { style } from '@vanilla-extract/css';
import { theme, transition, fontFamily } from '@secureloop/design-system';

export const pill = style({
  display: 'inline-flex',
  background: theme.bg.overlay,
  border: `1px solid ${theme.line.default}`,
  borderRadius: '999px',
  padding: '2px',
});

export const pillBtn = style({
  background: 'transparent',
  border: 'none',
  padding: '4px 10px',
  borderRadius: '999px',
  fontSize: '10px',
  color: theme.ink['60'],
  cursor: 'pointer',
  fontFamily: fontFamily.ui,
  fontWeight: 500,
  transition: transition('all', 'fast'),
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
});

export const pillBtnOn = style({
  background: theme.brand.default,
  color: theme.brand.ink,
  fontWeight: 600,
});
