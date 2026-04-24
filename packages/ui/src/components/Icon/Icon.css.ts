import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const iconBase = style({
  display: 'inline-block',
  flexShrink: 0,
  verticalAlign: 'middle',
});

export const iconSize = recipe({
  variants: {
    size: {
      '12': { width: '12px', height: '12px' },
      '14': { width: '14px', height: '14px' },
      '16': { width: '16px', height: '16px' },
      '20': { width: '20px', height: '20px' },
      '24': { width: '24px', height: '24px' },
      '32': { width: '32px', height: '32px' },
    },
  },
  defaultVariants: { size: '16' },
});
