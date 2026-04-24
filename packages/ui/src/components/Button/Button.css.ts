import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { theme, transition, fontFamily } from '@secureloop/design-system';

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '0 16px',
    height: 'var(--sl-input-h, 36px)',
    borderRadius: '6px',
    border: '1px solid transparent',
    fontSize: '13px',
    fontFamily: fontFamily.ui,
    fontWeight: 500,
    cursor: 'pointer',
    transition: `${transition('all', 'fast')}`,
    userSelect: 'none',
    whiteSpace: 'nowrap',
    selectors: {
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
      '&:active:not(:disabled)': {
        transform: 'scale(0.97)',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        background: theme.brand.default,
        color: theme.brand.ink,
        borderColor: theme.brand.default,
        fontWeight: 600,
        selectors: {
          '&:hover:not(:disabled)': {
            transform: 'translateY(-1px)',
            boxShadow: theme.elevation.raised,
          },
        },
      },
      ghost: {
        background: 'transparent',
        color: theme.ink['80'],
        borderColor: theme.line.default,
        selectors: {
          '&:hover:not(:disabled)': {
            background: theme.bg.hover,
            color: theme.ink['100'],
            borderColor: theme.line.strong,
          },
        },
      },
      danger: {
        background: theme.sev.critical,
        color: theme.brand.ink,
        borderColor: theme.sev.critical,
        fontWeight: 600,
        selectors: {
          '&:hover:not(:disabled)': {
            transform: 'translateY(-1px)',
            boxShadow: theme.elevation.raised,
          },
        },
      },
      subtle: {
        background: theme.bg.overlay,
        color: theme.ink['100'],
        borderColor: theme.line.default,
        selectors: {
          '&:hover:not(:disabled)': {
            background: theme.bg.hover,
            borderColor: theme.line.strong,
          },
        },
      },
    },
    size: {
      sm: { height: '28px', padding: '0 10px', fontSize: '11px' },
      md: {},
      lg: { height: '44px', padding: '0 20px', fontSize: '15px' },
    },
    fullWidth: {
      true: { width: '100%' },
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'md',
  },
});

export const iconSlot = style({
  width: '14px',
  height: '14px',
  flexShrink: 0,
});
