import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { theme, transition, fontFamily } from '@secureloop/design-system';

export const inputRoot = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const label = style({
  fontSize: '11px',
  color: theme.ink['60'],
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontWeight: 600,
  fontFamily: fontFamily.ui,
});

export const required = style({
  color: theme.sev.critical,
  marginLeft: '4px',
});

export const field = recipe({
  base: {
    width: '100%',
    height: 'var(--sl-input-h, 36px)',
    padding: '0 12px',
    background: theme.bg.base,
    border: `1px solid ${theme.line.default}`,
    borderRadius: '6px',
    color: theme.ink['100'],
    fontFamily: fontFamily.ui,
    fontSize: '13px',
    outline: 'none',
    transition: transition('border-color', 'fast'),
    selectors: {
      '&:hover:not(:disabled):not([aria-invalid="true"])': {
        borderColor: theme.line.strong,
      },
      '&:focus-visible': {
        borderColor: theme.brand.default,
        outline: 'none',
        boxShadow: `0 0 0 3px ${theme.misc.focusHalo}`,
      },
      // v1 locked: validation borders ONLY on error
      '&[aria-invalid="true"]': {
        borderColor: theme.sev.critical,
      },
      '&::placeholder': {
        color: theme.ink['40'],
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    mono: {
      true: {
        fontFamily: fontFamily.mono,
        fontSize: '11px',
      },
    },
  },
});

export const help = style({
  fontSize: '10px',
  color: theme.ink['60'],
  lineHeight: 1.4,
});

export const helpError = style({
  fontSize: '10px',
  color: theme.sev.critical,
  lineHeight: 1.4,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const valid = style({
  fontSize: '10px',
  color: theme.sev.good,
  lineHeight: 1.4,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});
