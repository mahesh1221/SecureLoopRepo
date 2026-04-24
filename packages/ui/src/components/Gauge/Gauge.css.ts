import { style } from '@vanilla-extract/css';
import { theme, fontFamily, lineHeight } from '@secureloop/design-system';

export const wrap = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
});

export const svgBox = style({
  position: 'relative',
  width: '280px',
  height: '280px',
});

export const svg = style({
  width: '100%',
  height: '100%',
});

export const track = style({
  fill: 'none',
  stroke: theme.dv.track,
  strokeWidth: '18',
});

export const progress = style({
  fill: 'none',
  strokeWidth: '18',
  strokeLinecap: 'round',
  transition: 'stroke-dashoffset 500ms cubic-bezier(.2,0,0,1)',
});

export const center = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

export const valueText = style({
  fontFamily: fontFamily.display,
  fontSize: '44px',
  fontWeight: 700,
  lineHeight: lineHeight.tight,
  letterSpacing: '-0.04em',
  color: theme.ink['100'],
  fontVariantNumeric: 'tabular-nums',
});

export const labelText = style({
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: theme.ink['60'],
  fontWeight: 600,
  fontFamily: fontFamily.mono,
  marginTop: '4px',
});
