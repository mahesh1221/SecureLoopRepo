import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '@secureloop/design-system';
import { space, radius, fontSize, fontFamily, fontWeight } from '@secureloop/design-system';

// ─── Wizard body layout ───────────────────────────────────────────
export const wizardBody = style({
  display: 'grid',
  gridTemplateColumns: '1fr 380px',
  gap: space.s5,
  minHeight: '420px',
});

// ─── Clone bar ────────────────────────────────────────────────────
export const cloneBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s3,
  padding: `${space.s3} 0`,
  borderBottom: `1px solid ${theme.line.default}`,
  marginBottom: space.s5,
});

export const cloneLabel = style({
  fontSize: fontSize.body,
  color: theme.ink['80'],
  flex: 1,
});

// ─── Segmented pill (clone toggle) ────────────────────────────────
export const segPill = style({
  display: 'flex',
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.full,
  padding: '2px',
  gap: '2px',
});

export const segPillBtn = style({
  padding: '4px 14px',
  borderRadius: radius.full,
  border: 'none',
  background: 'transparent',
  fontSize: fontSize.label,
  color: theme.ink['60'],
  cursor: 'pointer',
  transition: 'all 120ms ease',
  selectors: {
    '&:hover': { color: theme.ink['80'] },
  },
});

export const segPillBtnActive = style({
  background: theme.brand.default,
  color: theme.brand.ink,
  fontWeight: fontWeight.medium,
});

// ─── Step label ───────────────────────────────────────────────────
export const stepLabel = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: space.s4,
});

export const stepTitle = style({
  fontFamily: fontFamily.display,
  fontWeight: fontWeight.semibold,
  fontSize: fontSize.xl,
  color: theme.ink['100'],
  margin: 0,
  marginBottom: space.s4,
});

// ─── Form sections ────────────────────────────────────────────────
export const formSection = style({
  marginBottom: space.s5,
});

export const formSectionTitle = style({
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
  color: theme.ink['40'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: space.s3,
});

export const formRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: space.s4,
  marginBottom: space.s3,
});

export const formField = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space.s1,
  marginBottom: space.s3,
});

export const formLabel = style({
  fontSize: fontSize.label,
  color: theme.ink['60'],
  fontWeight: fontWeight.medium,
});

// ─── Phase section heading ────────────────────────────────────────
export const phaseHead = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s2,
  marginBottom: space.s3,
  marginTop: space.s5,
  selectors: {
    '&:first-of-type': { marginTop: 0 },
  },
});

export const phaseChip = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 8px',
  borderRadius: radius.full,
  fontSize: fontSize.label,
  fontWeight: fontWeight.semibold,
  letterSpacing: '0.05em',
});

export const phaseChipP1 = style({
  background: theme.sev.goodBg,
  color: theme.sev.good,
});

export const phaseChipP2 = style({
  background: theme.sev.lowBg,
  color: theme.sev.low,
});

export const phaseTitle = style({
  fontSize: fontSize.body,
  fontWeight: fontWeight.medium,
  color: theme.ink['80'],
});

export const phaseCount = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  marginLeft: 'auto',
});

// ─── Framework grid ───────────────────────────────────────────────
export const fwGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: space.s2,
  marginBottom: space.s3,
});

export const fwCard = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s3,
  padding: space.s3,
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.sm,
  cursor: 'pointer',
  transition: 'border-color 120ms ease',
  selectors: {
    '&:hover': { borderColor: theme.line.strong },
    '&[data-checked="true"]': { borderColor: theme.brand.default, background: theme.brand.dim },
  },
});

export const fwName = style({
  fontSize: fontSize.body,
  color: theme.ink['80'],
  fontWeight: fontWeight.medium,
  flex: 1,
});

// ─── Preview sidebar ──────────────────────────────────────────────
export const previewSidebar = style({
  position: 'sticky',
  top: 0,
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.sm,
  padding: space.s4,
});

export const previewTitle = style({
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
  color: theme.ink['40'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: space.s3,
});

export const previewItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  marginBottom: space.s3,
});

export const previewLabel = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
});

export const previewValue = style({
  fontSize: fontSize.body,
  color: theme.ink['100'],
  fontWeight: fontWeight.medium,
});

export const previewDivider = style({
  height: '1px',
  background: theme.line.default,
  margin: `${space.s3} 0`,
});

// ─── SLA table (step 3) ───────────────────────────────────────────
export const slaTable = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const slaRow = style({
  display: 'grid',
  gridTemplateColumns: '80px 1fr 1fr 1fr',
  gap: space.s3,
  alignItems: 'center',
  padding: `${space.s2} 0`,
  borderBottom: `1px solid ${theme.line.default}`,
});

export const slaSev = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s2,
  fontSize: fontSize.body,
  fontWeight: fontWeight.medium,
});

export const slaDot = style({
  width: '8px',
  height: '8px',
  borderRadius: radius.full,
});

export const slaDotVariants = styleVariants({
  critical: { background: theme.sev.critical },
  high: { background: theme.sev.high },
  medium: { background: theme.sev.medium },
  low: { background: theme.sev.low },
});

export const slaStepper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
});

export const slaStepBtn = style({
  width: '28px',
  height: '28px',
  display: 'grid',
  placeItems: 'center',
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.xs,
  background: theme.bg.raised,
  color: theme.ink['80'],
  cursor: 'pointer',
  fontSize: fontSize.body,
  selectors: {
    '&:hover': { background: theme.bg.hover },
  },
});

export const slaInput = style({
  width: '56px',
  height: '28px',
  textAlign: 'center',
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.xs,
  background: theme.bg.raised,
  color: theme.ink['100'],
  fontSize: fontSize.body,
  fontFamily: fontFamily.mono,
  outline: 'none',
});

// ─── Admin user form (step 4) ─────────────────────────────────────
export const adminCard = style({
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  padding: space.s5,
  marginBottom: space.s4,
});

// ─── Activate step (step 5) ───────────────────────────────────────
export const activateList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space.s3,
});

export const activateItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s3,
  padding: space.s3,
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.sm,
});

export const activateIcon = style({
  width: '28px',
  height: '28px',
  borderRadius: radius.full,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
});

export const activateIconGood = style({
  background: theme.sev.goodBg,
  color: theme.sev.good,
});

export const activateText = style({
  fontSize: fontSize.body,
  color: theme.ink['80'],
});

export const activateSub = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
});
