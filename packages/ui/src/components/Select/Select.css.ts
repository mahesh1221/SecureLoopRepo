import { style } from '@vanilla-extract/css';
import { theme, transition, fontFamily } from '@secureloop/design-system';

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'stretch',
  width: '100%',
});

export const field = style({
  width: '100%',
  height: 'var(--sl-input-h, 36px)',
  padding: '0 32px 0 12px',
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: '6px',
  color: theme.ink['100'],
  fontFamily: fontFamily.ui,
  fontSize: '13px',
  appearance: 'none',
  cursor: 'pointer',
  outline: 'none',
  transition: transition('border-color', 'fast'),
  selectors: {
    '&:hover:not(:disabled)': { borderColor: theme.line.strong },
    '&:focus-visible': {
      borderColor: theme.brand.default,
      boxShadow: `0 0 0 3px ${theme.misc.focusHalo}`,
    },
    '&[aria-invalid="true"]': { borderColor: theme.sev.critical },
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  },
});

export const caret = style({
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: theme.ink['60'],
  pointerEvents: 'none',
  width: '14px',
  height: '14px',
});
