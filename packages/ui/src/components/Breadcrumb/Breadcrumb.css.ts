import { style } from '@vanilla-extract/css';
import { theme, transition, fontFamily } from '@secureloop/design-system';

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '0 0 16px 0',
});

export const item = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '13px',
  fontFamily: fontFamily.ui,
  lineHeight: 1,
});

export const itemBtn = style({
  background: 'none',
  border: 'none',
  padding: '2px 4px',
  borderRadius: '3px',
  fontSize: '13px',
  fontFamily: fontFamily.ui,
  color: theme.ink['60'],
  cursor: 'pointer',
  transition: transition('color', 'fast'),
  selectors: {
    '&:hover': { color: theme.ink['100'] },
    '&:focus-visible': {
      outline: `2px solid ${theme.brand.default}`,
      outlineOffset: '2px',
    },
  },
});

export const itemCurrent = style({
  fontSize: '13px',
  fontFamily: fontFamily.ui,
  color: theme.ink['100'],
  fontWeight: 500,
  padding: '2px 4px',
});

export const separator = style({
  fontSize: '13px',
  color: theme.ink['40'],
  userSelect: 'none',
  flexShrink: 0,
});
