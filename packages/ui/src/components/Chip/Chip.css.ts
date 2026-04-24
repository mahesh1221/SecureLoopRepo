import { recipe } from '@vanilla-extract/recipes';
import { theme, fontFamily, transition } from '@secureloop/design-system';

export const chip = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 500,
    fontFamily: fontFamily.ui,
    lineHeight: 1.4,
    transition: transition('all', 'fast'),
  },
  variants: {
    tone: {
      brand: {
        background: theme.brand.dim,
        border: `1px solid ${theme.line.strong}`,
        color: theme.ink['100'],
      },
      good: {
        background: theme.sev.goodBg,
        border: `1px solid ${theme.sev.good}`,
        color: theme.sev.good,
        fontWeight: 600,
      },
      critical: {
        background: theme.sev.criticalBg,
        border: `1px solid ${theme.sev.critical}`,
        color: theme.sev.critical,
        fontWeight: 600,
      },
      medium: {
        background: theme.sev.mediumBg,
        border: `1px solid ${theme.sev.medium}`,
        color: theme.sev.medium,
        fontWeight: 600,
      },
      neutral: {
        background: theme.bg.overlay,
        border: `1px solid ${theme.line.default}`,
        color: theme.ink['80'],
      },
    },
    clickable: {
      true: {
        cursor: 'pointer',
        selectors: {
          '&:hover': {
            borderColor: theme.line.strong,
            background: theme.bg.hover,
          },
        },
      },
    },
  },
  defaultVariants: {
    tone: 'brand',
  },
});
