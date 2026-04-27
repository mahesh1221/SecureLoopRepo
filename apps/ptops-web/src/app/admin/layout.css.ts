import { style } from '@vanilla-extract/css';
import { theme } from '@secureloop/design-system';
import { fontFamily, fontSize, fontWeight } from '@secureloop/design-system';

export const shell = style({
  minHeight: '100vh',
  background: theme.bg.page,
});

export const topbarProduct = style({
  fontFamily: fontFamily.display,
  fontWeight: fontWeight.semibold,
  fontSize: fontSize.body,
  color: theme.ink['100'],
});

export const topbarDivider = style({
  width: '1px',
  height: '16px',
  background: theme.line.default,
});

export const topbarSection = style({
  fontSize: fontSize.body,
  color: theme.ink['60'],
});
