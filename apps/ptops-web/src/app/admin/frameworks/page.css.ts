import { style, styleVariants } from '@vanilla-extract/css';
import { theme, kf } from '@secureloop/design-system';
import { space, radius, fontSize, fontFamily, fontWeight } from '@secureloop/design-system';

export const page = style({
  padding: `${space.s6} ${space.s7}`,
});

export const pageTitle = style({
  fontFamily: fontFamily.display,
  fontWeight: fontWeight.semibold,
  fontSize: fontSize['2xl'],
  color: theme.ink['100'],
  margin: 0,
  marginBottom: space.s1,
});

export const pageSubtitle = style({
  fontSize: fontSize.body,
  color: theme.ink['60'],
  marginBottom: space.s5,
});

// ─── Tenant selector bar ──────────────────────────────────────────
export const tenantBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s3,
  padding: `${space.s3} ${space.s4}`,
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  marginBottom: space.s5,
});

export const tenantBarIcon = style({
  width: '32px',
  height: '32px',
  borderRadius: radius.sm,
  background: theme.brand.dim,
  display: 'grid',
  placeItems: 'center',
  color: theme.brand.default,
  flexShrink: 0,
});

export const tenantBarName = style({
  fontWeight: fontWeight.medium,
  color: theme.ink['100'],
  fontSize: fontSize.body,
  flex: 1,
});

export const processingPulse = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: fontSize.label,
  color: theme.sev.high,
});

export const pulseDot = style({
  width: '8px',
  height: '8px',
  borderRadius: radius.full,
  background: theme.sev.high,
  animationName: kf.pulse,
  animationDuration: '1.4s',
  animationIterationCount: 'infinite',
});

// ─── Body grid ────────────────────────────────────────────────────
export const bodyGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 340px',
  gap: space.s4,
  alignItems: 'start',
});

// ─── Phase head ───────────────────────────────────────────────────
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
});

export const phaseChipP1 = style({ background: theme.sev.goodBg, color: theme.sev.good });
export const phaseChipP2 = style({ background: theme.sev.lowBg, color: theme.sev.low });

export const phaseTitle = style({
  fontWeight: fontWeight.medium,
  color: theme.ink['80'],
  fontSize: fontSize.body,
  flex: 1,
});

export const phaseCount = style({ fontSize: fontSize.label, color: theme.ink['40'] });

// ─── Framework grid ───────────────────────────────────────────────
export const fwGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: space.s3,
  marginBottom: space.s4,
});

export const fwCard = style({
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  padding: space.s4,
  transition: 'border-color 120ms ease',
  selectors: {
    '&:hover': { borderColor: theme.line.strong },
  },
});

export const fwCardProcessing = style({
  borderColor: theme.sev.high,
  selectors: {
    '&:hover': { borderColor: theme.sev.high },
  },
});

export const fwCardDisabled = style({
  opacity: 0.55,
});

export const fwCardHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: space.s3,
});

export const fwCardTitle = style({
  fontWeight: fontWeight.semibold,
  color: theme.ink['100'],
  fontSize: fontSize.body,
  flex: 1,
});

export const fwCardDesc = style({
  fontSize: fontSize.label,
  color: theme.ink['60'],
  marginBottom: space.s3,
  lineHeight: 1.5,
});

export const fwBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '2px 8px',
  borderRadius: radius.full,
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
});

export const fwBadgeVariants = styleVariants({
  enabled: { background: theme.sev.goodBg, color: theme.sev.good },
  processing: { background: theme.sev.highBg, color: theme.sev.high },
  disabled: { background: theme.bg.overlay, color: theme.ink['60'] },
});

export const progressWrap = style({
  marginTop: space.s3,
});

export const progressBar = style({
  height: '4px',
  background: theme.line.default,
  borderRadius: radius.full,
  overflow: 'hidden',
  marginBottom: '6px',
});

export const progressFill = style({
  height: '100%',
  background: theme.sev.high,
  borderRadius: radius.full,
  transition: 'width 300ms ease',
});

export const progressText = style({
  fontSize: fontSize.label,
  color: theme.ink['60'],
  display: 'flex',
  justifyContent: 'space-between',
});

export const upgradeBanner = style({
  marginTop: space.s3,
  padding: `${space.s2} ${space.s3}`,
  background: theme.sev.lowBg,
  border: `1px solid ${theme.sev.low}`,
  borderRadius: radius.xs,
  fontSize: fontSize.label,
  color: theme.sev.low,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

// ─── Sidebar ──────────────────────────────────────────────────────
export const sidebar = style({
  position: 'sticky',
  top: `calc(56px + ${space.s6})`,
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  overflow: 'hidden',
});

export const sidebarSection = style({
  padding: `${space.s4} ${space.s5}`,
  borderBottom: `1px solid ${theme.line.default}`,
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const sidebarTitle = style({
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
  color: theme.ink['40'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: space.s3,
});

export const statRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: space.s2,
});

export const statLabel = style({ fontSize: fontSize.body, color: theme.ink['60'] });
export const statValue = style({ fontFamily: fontFamily.mono, fontSize: fontSize.body, color: theme.ink['100'], fontWeight: fontWeight.medium });

export const queueItem = style({
  marginBottom: space.s3,
});

export const queueItemName = style({
  fontSize: fontSize.body,
  color: theme.ink['80'],
  fontWeight: fontWeight.medium,
  marginBottom: '4px',
  display: 'flex',
  justifyContent: 'space-between',
});

export const queueProgressBar = style({
  height: '3px',
  background: theme.line.default,
  borderRadius: radius.full,
  overflow: 'hidden',
});

export const queueProgressFill = style({
  height: '100%',
  background: theme.sev.high,
  borderRadius: radius.full,
});

export const bulkActions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space.s2,
});

export const bulkBtn = style({
  padding: `${space.s2} ${space.s3}`,
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.sm,
  fontSize: fontSize.body,
  color: theme.ink['80'],
  cursor: 'pointer',
  textAlign: 'left',
  selectors: { '&:hover': { background: theme.bg.hover, color: theme.ink['100'] } },
});
