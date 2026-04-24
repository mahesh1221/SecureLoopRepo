import { style } from '@vanilla-extract/css';
import { theme, fontFamily } from '@secureloop/design-system';

export const kbd = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px',
  padding: '2px 6px',
  background: theme.bg.base,
  border: `1px solid ${theme.line.strong}`,
  borderRadius: '3px',
  fontFamily: fontFamily.mono,
  fontSize: '10px',
  color: theme.ink['80'],
  fontWeight: 500,
  minWidth: '18px',
  height: '20px',
  whiteSpace: 'nowrap',
});

export const group = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
});

export const plus = style({
  color: theme.ink['40'],
  fontSize: '10px',
});
