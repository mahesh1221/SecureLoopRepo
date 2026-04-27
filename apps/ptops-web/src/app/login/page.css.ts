import { style } from '@vanilla-extract/css';

export const page = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: 'var(--sl-bg-page)',
});

export const card = style({
  width: '100%',
  maxWidth: '420px',
  padding: '32px',
  borderRadius: '10px',
  background: 'var(--sl-bg-overlay)',
  border: '1px solid var(--sl-line-strong)',
  boxShadow: 'var(--sl-elev-overlay, 0 16px 32px -16px rgba(0, 0, 0, 0.4))',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const brandRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '8px',
});

export const brandGlyph = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '6px',
  background: 'var(--sl-brand)',
  color: 'var(--sl-brand-ink)',
  fontFamily: 'var(--sl-font-display)',
  fontWeight: 700,
  fontSize: '15px',
  letterSpacing: '0.02em',
});

export const brandWord = style({
  fontFamily: 'var(--sl-font-display)',
  fontWeight: 600,
  fontSize: '20px',
  color: 'var(--sl-ink-100)',
  letterSpacing: '-0.01em',
});

export const title = style({
  fontFamily: 'var(--sl-font-display)',
  fontWeight: 600,
  fontSize: '28px',
  color: 'var(--sl-ink-100)',
  margin: 0,
  letterSpacing: '-0.02em',
});

export const subtitle = style({
  fontSize: '13px',
  color: 'var(--sl-ink-60)',
  margin: '0 0 8px 0',
  lineHeight: 1.5,
});

export const fieldLabel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontSize: '11px',
  fontWeight: 500,
  color: 'var(--sl-ink-80)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
});

export const error = style({
  padding: '10px 12px',
  borderRadius: '6px',
  background: 'var(--sl-crit-bg, rgba(255, 107, 91, 0.14))',
  color: 'var(--sl-crit, #FF6B5B)',
  fontSize: '13px',
  fontFamily: 'var(--sl-font-body)',
});

export const hint = style({
  fontSize: '11px',
  color: 'var(--sl-ink-40)',
  margin: '8px 0 0 0',
  textAlign: 'center',
});
