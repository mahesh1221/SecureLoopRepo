import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { theme, transition, fontFamily } from '@secureloop/design-system';

export const card = recipe({
  base: {
    background: theme.bg.raised,
    border: `1px solid ${theme.line.default}`,
    borderRadius: '10px',
    padding: 'var(--sl-card-pad-y, 20px) var(--sl-card-pad-x, 24px)',
    transition: `
      ${transition('padding', 'base')},
      ${transition('box-shadow', 'base')},
      ${transition('border-color', 'fast')}
    `,
    selectors: {
      '&:hover': {
        borderColor: theme.line.strong,
      },
    },
  },
  variants: {
    elevation: {
      flat: { boxShadow: theme.elevation.flat },
      card: { boxShadow: theme.elevation.card },
      raised: { boxShadow: theme.elevation.raised },
      overlay: { boxShadow: theme.elevation.overlay },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        selectors: {
          '&:hover': {
            boxShadow: theme.elevation.raised,
            transform: 'translateY(-1px)',
          },
        },
      },
    },
  },
  defaultVariants: {
    elevation: 'card',
  },
});

export const cardHead = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '12px',
  marginBottom: '16px',
});

export const cardTitle = style({
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  fontFamily: fontFamily.display,
  color: theme.ink['100'],
  margin: 0,
});

export const cardMeta = style({
  fontSize: '10px',
  fontFamily: fontFamily.mono,
  color: theme.ink['60'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontWeight: 600,
});

export const cardBody = style({
  // slot — consumer controls spacing
});
