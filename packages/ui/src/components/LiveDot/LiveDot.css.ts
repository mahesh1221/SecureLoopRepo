import { style, keyframes } from '@vanilla-extract/css';
import { theme, fontFamily } from '@secureloop/design-system';

const pulseKf = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.4 },
});

export const pill = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '5px 12px',
  background: theme.sev.goodBg,
  color: theme.sev.good,
  border: `1px solid ${theme.sev.good}`,
  borderRadius: '999px',
  fontFamily: fontFamily.mono,
  fontSize: '11px',
  fontWeight: 600,
});

export const dot = style({
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  background: theme.sev.good,
  animation: `${pulseKf} 1.5s infinite`,
  flexShrink: 0,
});
