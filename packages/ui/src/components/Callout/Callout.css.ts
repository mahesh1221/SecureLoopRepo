import { style, styleVariants } from '@vanilla-extract/css';
import { theme, fontFamily, space } from '@secureloop/design-system';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: `${space.s4} ${space.s5}`,
  background: theme.brand.dim,
  border: `1px solid ${theme.line.strong}`,
  borderRadius: '6px',
});

export const chip = styleVariants({
  brand: {
    width: '30px',
    height: '30px',
    borderRadius: '999px',
    background: theme.brand.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: theme.brand.ink,
  },
  good: {
    width: '30px',
    height: '30px',
    borderRadius: '999px',
    background: theme.sev.good,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: theme.bg.page,
  },
  warn: {
    width: '30px',
    height: '30px',
    borderRadius: '999px',
    background: theme.sev.medium,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: theme.bg.page,
  },
  crit: {
    width: '30px',
    height: '30px',
    borderRadius: '999px',
    background: theme.sev.critical,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: theme.bg.page,
  },
});

export const content = style({
  flex: 1,
  fontSize: '13px',
  fontFamily: fontFamily.ui,
  color: theme.ink['100'],
  lineHeight: 1.5,
});
