import { style } from '@vanilla-extract/css';
import { theme, fontFamily, lineHeight } from '@secureloop/design-system';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '48px 24px',
  gap: '12px',
});

export const illustration = style({
  width: '100%',
  maxWidth: '280px',
  marginBottom: '8px',
});

export const title = style({
  fontFamily: fontFamily.display,
  fontWeight: 600,
  fontSize: '20px',
  letterSpacing: '-0.02em',
  lineHeight: lineHeight.tight,
  color: theme.ink['100'],
  margin: 0,
});

export const description = style({
  fontSize: '13px',
  color: theme.ink['60'],
  lineHeight: lineHeight.normal,
  maxWidth: '320px',
  margin: 0,
});

export const cta = style({
  marginTop: '16px',
});
