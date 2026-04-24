import { recipe } from '@vanilla-extract/recipes';
import { theme, fontFamily } from '@secureloop/design-system';

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '3px',
    fontFamily: fontFamily.mono,
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    lineHeight: 1.4,
  },
  variants: {
    tone: {
      critical: {
        background: theme.sev.criticalBg,
        color: theme.sev.critical,
      },
      high: {
        background: theme.sev.highBg,
        color: theme.sev.high,
      },
      medium: {
        background: theme.sev.mediumBg,
        color: theme.sev.medium,
      },
      low: {
        background: theme.sev.lowBg,
        color: theme.sev.low,
      },
      good: {
        background: theme.sev.goodBg,
        color: theme.sev.good,
      },
      neutral: {
        background: theme.bg.overlay,
        color: theme.ink['60'],
        border: `1px solid ${theme.line.default}`,
      },
      brand: {
        background: theme.brand.dim,
        color: theme.ink['100'],
        border: `1px solid ${theme.line.strong}`,
      },
    },
    outline: {
      true: {
        background: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
      },
    },
  },
  compoundVariants: [
    { variants: { tone: 'critical', outline: true }, style: { borderColor: theme.sev.critical } },
    { variants: { tone: 'high', outline: true }, style: { borderColor: theme.sev.high } },
    { variants: { tone: 'medium', outline: true }, style: { borderColor: theme.sev.medium } },
    { variants: { tone: 'low', outline: true }, style: { borderColor: theme.sev.low } },
    { variants: { tone: 'good', outline: true }, style: { borderColor: theme.sev.good } },
  ],
  defaultVariants: {
    tone: 'neutral',
  },
});
