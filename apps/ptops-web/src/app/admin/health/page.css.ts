import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { theme } from '@secureloop/design-system';
import { space, radius, fontSize, fontFamily, fontWeight } from '@secureloop/design-system';

export const page = style({
  padding: `${space.s6} ${space.s7}`,
});

// ─── Page header ──────────────────────────────────────────────────
export const pageHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s3,
  marginBottom: space.s5,
});

export const pageTitle = style({
  fontFamily: fontFamily.display,
  fontWeight: fontWeight.semibold,
  fontSize: fontSize['2xl'],
  color: theme.ink['100'],
  margin: 0,
  flex: 1,
});

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s2,
});

// ─── Health status bar ────────────────────────────────────────────
export const healthBar = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  padding: `${space.s4} ${space.s5}`,
  display: 'flex',
  alignItems: 'center',
  gap: space.s4,
  marginBottom: space.s4,
});

export const healthBarDegraded = style({
  background: theme.sev.highBg,
  borderColor: theme.sev.high,
  backgroundImage: `linear-gradient(to right, ${theme.sev.highBg} 0%, transparent 200px)`,
});

export const trafficLight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  flexShrink: 0,
});

export const trafficCircle = style({
  width: '14px',
  height: '14px',
  borderRadius: radius.full,
});

export const trafficCircleVariants = styleVariants({
  green: { background: theme.sev.good },
  amber: { background: theme.sev.medium },
  red: { background: theme.sev.critical },
  dimGreen: { background: theme.sev.goodBg },
  dimAmber: { background: theme.sev.mediumBg },
  dimRed: { background: theme.sev.criticalBg },
});

export const healthStatusLabel = style({
  fontFamily: fontFamily.display,
  fontWeight: fontWeight.semibold,
  fontSize: fontSize.xl,
  color: theme.ink['100'],
  flex: 1,
});

export const healthBarMeta = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '2px',
  fontSize: fontSize.label,
  color: theme.ink['40'],
});

// ─── Incident banner ──────────────────────────────────────────────
export const incidentBanner = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s3,
  padding: `${space.s3} ${space.s4}`,
  background: theme.sev.criticalBg,
  border: `1px solid ${theme.sev.critical}`,
  borderRadius: radius.sm,
  marginBottom: space.s5,
});

export const incidentIcon = style({
  color: theme.sev.critical,
  flexShrink: 0,
});

export const incidentText = style({
  fontSize: fontSize.body,
  color: theme.ink['80'],
  flex: 1,
});

// ─── Body grid ────────────────────────────────────────────────────
export const bodyGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 380px',
  gap: space.s4,
  alignItems: 'start',
  marginBottom: space.s5,
});

// ─── Metrics grid ─────────────────────────────────────────────────
export const metricsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: space.s4,
});

export const metricTile = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  padding: space.s4,
});

export const tileTop = style({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: space.s3,
});

export const tileIconWrap = style({
  width: '32px',
  height: '32px',
  borderRadius: radius.sm,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  marginRight: space.s3,
});

export const tileIconVariants = styleVariants({
  good: { background: theme.sev.goodBg, color: theme.sev.good },
  warn: { background: theme.sev.highBg, color: theme.sev.high },
  crit: { background: theme.sev.criticalBg, color: theme.sev.critical },
});

export const tileTitle = style({
  fontWeight: fontWeight.semibold,
  color: theme.ink['100'],
  fontSize: fontSize.body,
  marginBottom: '2px',
  flex: 1,
});

export const tileSub = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
});

export const tileBadge = style({
  display: 'inline-flex',
  padding: '2px 8px',
  borderRadius: radius.full,
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
  flexShrink: 0,
});

export const tileBadgeVariants = styleVariants({
  good: { background: theme.sev.goodBg, color: theme.sev.good },
  warn: { background: theme.sev.highBg, color: theme.sev.high },
  crit: { background: theme.sev.criticalBg, color: theme.sev.critical },
});

export const tileStats = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: space.s3,
  marginBottom: space.s3,
});

export const tileStat = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const tileStatLabel = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
});

export const tileStatValue = style({
  fontFamily: fontFamily.mono,
  fontSize: fontSize.lg,
  fontWeight: fontWeight.semibold,
  color: theme.ink['100'],
});

// ─── Sparkline SVG ────────────────────────────────────────────────
export const sparkline = style({
  width: '100%',
  height: '60px',
  display: 'block',
});

// ─── Tenant impact sidebar ────────────────────────────────────────
export const sidebar = style({
  position: 'sticky',
  top: `calc(56px + ${space.s6})`,
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  overflow: 'hidden',
});

export const sidebarHeader = style({
  padding: `${space.s4} ${space.s5}`,
  borderBottom: `1px solid ${theme.line.default}`,
  fontWeight: fontWeight.semibold,
  fontSize: fontSize.body,
  color: theme.ink['100'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const impactList = style({
  padding: `${space.s2} 0`,
});

export const impactItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: space.s3,
  padding: `${space.s3} ${space.s5}`,
  borderBottom: `1px solid ${theme.line.default}`,
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const impactBadge = style({
  display: 'inline-flex',
  padding: '2px 6px',
  borderRadius: radius.xs,
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
  flexShrink: 0,
});

export const impactBadgeVariants = styleVariants({
  crit: { background: theme.sev.criticalBg, color: theme.sev.critical },
  high: { background: theme.sev.highBg, color: theme.sev.high },
  warn: { background: theme.sev.mediumBg, color: theme.sev.medium },
});

export const impactTenantName = style({
  fontWeight: fontWeight.medium,
  color: theme.ink['80'],
  fontSize: fontSize.body,
  marginBottom: '2px',
});

export const impactDesc = style({ fontSize: fontSize.label, color: theme.ink['60'] });
export const impactUsers = style({ fontSize: fontSize.label, color: theme.ink['40'], marginTop: '2px' });

// ─── Incident timeline table ──────────────────────────────────────
export const timelineSection = style({ marginTop: space.s2 });

export const timelineSectionTitle = style({
  fontSize: fontSize.lg,
  fontWeight: fontWeight.semibold,
  color: theme.ink['100'],
  marginBottom: space.s3,
});

export const timelineTable = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  overflow: 'hidden',
});

export const timelineHeader = style({
  display: 'grid',
  gridTemplateColumns: '120px 1fr 80px 1.5fr 80px 120px',
  padding: `10px ${space.s4}`,
  borderBottom: `1px solid ${theme.line.default}`,
  background: theme.bg.raised,
});

export const timelineRow = style({
  display: 'grid',
  gridTemplateColumns: '120px 1fr 80px 1.5fr 80px 120px',
  padding: `${space.s3} ${space.s4}`,
  borderBottom: `1px solid ${theme.line.default}`,
  alignItems: 'center',
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const thCell = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  fontWeight: fontWeight.medium,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
});

export const tdCell = style({ fontSize: fontSize.body, color: theme.ink['80'] });
export const tdMono = style({ fontFamily: fontFamily.mono, fontSize: fontSize.label, color: theme.ink['60'] });

const pulseAnim = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.3 },
});

export const openStatusDot = style({
  width: '8px',
  height: '8px',
  borderRadius: radius.full,
  background: theme.sev.critical,
  display: 'inline-block',
  marginRight: '6px',
  animationName: pulseAnim,
  animationDuration: '1.4s',
  animationIterationCount: 'infinite',
});

export const statusBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 8px',
  borderRadius: radius.full,
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
});

export const statusBadgeVariants = styleVariants({
  open: { background: theme.sev.criticalBg, color: theme.sev.critical },
  investigating: { background: theme.sev.highBg, color: theme.sev.high },
  mitigated: { background: theme.sev.mediumBg, color: theme.sev.medium },
  resolved: { background: theme.sev.goodBg, color: theme.sev.good },
});
