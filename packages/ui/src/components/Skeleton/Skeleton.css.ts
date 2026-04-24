import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { theme } from '@secureloop/design-system';

const shimmer = keyframes({
  '0%': { backgroundPosition: '200% 0' },
  '100%': { backgroundPosition: '-200% 0' },
});

export const skeleton = recipe({
  base: {
    background: `linear-gradient(90deg, ${theme.bg.raised} 0%, ${theme.bg.hover} 50%, ${theme.bg.raised} 100%)`,
    backgroundSize: '200% 100%',
    animation: `${shimmer} 1.4s linear infinite`,
    borderRadius: '6px',
  },
  variants: {
    shape: {
      text: { height: '12px', width: '100%' },
      title: { height: '18px', width: '60%' },
      avatar: { width: '36px', height: '36px', borderRadius: '50%' },
      thumb: { width: '40px', height: '40px', borderRadius: '6px' },
      block: { width: '100%', height: '80px' },
    },
  },
  defaultVariants: { shape: 'text' },
});

export const stack = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
