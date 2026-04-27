import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '@secureloop/design-system';
import { space, radius, fontSize, fontFamily, fontWeight } from '@secureloop/design-system';

export const page = style({
  padding: `${space.s6} ${space.s7}`,
});

// ─── Page header ──────────────────────────────────────────────────
export const pageHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: space.s6,
});

export const pageHeaderText = style({
  flex: 1,
});

export const pageTitle = style({
  fontFamily: fontFamily.display,
  fontWeight: fontWeight.semibold,
  fontSize: fontSize['2xl'],
  color: theme.ink['100'],
  margin: 0,
  lineHeight: 1.2,
});

export const pageSubtitle = style({
  fontSize: fontSize.body,
  color: theme.ink['60'],
  marginTop: space.s1,
});

export const pageActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s2,
  marginTop: '2px',
});

// ─── KPI row ──────────────────────────────────────────────────────
export const kpiRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: space.s4,
  marginBottom: space.s5,
});

export const kpiCard = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  padding: `${space.s4} ${space.s5}`,
});

export const kpiLabel = style({
  fontSize: fontSize.label,
  color: theme.ink['60'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: space.s1,
});

export const kpiValue = style({
  fontFamily: fontFamily.display,
  fontWeight: fontWeight.semibold,
  fontSize: fontSize['2xl'],
  color: theme.ink['100'],
  lineHeight: 1.1,
});

export const kpiSub = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  marginTop: space.s1,
});

export const kpiValueVariants = styleVariants({
  good: { color: theme.sev.good },
  warn: { color: theme.sev.medium },
  default: { color: theme.ink['100'] },
});

// ─── Tabs ─────────────────────────────────────────────────────────
export const tabBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  borderBottom: `1px solid ${theme.line.default}`,
  marginBottom: space.s4,
});

export const tabItem = style({
  padding: `10px ${space.s4}`,
  fontSize: fontSize.body,
  color: theme.ink['60'],
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  borderBottom: '2px solid transparent',
  marginBottom: '-1px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  transition: 'color 120ms ease',
  selectors: {
    '&:hover': { color: theme.ink['100'] },
  },
});

export const tabItemActive = style({
  color: theme.ink['100'],
  fontWeight: fontWeight.medium,
  borderBottom: `2px solid ${theme.brand.default}`,
});

export const tabCount = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  background: theme.bg.overlay,
  padding: '1px 6px',
  borderRadius: radius.full,
  fontFamily: fontFamily.mono,
});

// ─── Filter bar ───────────────────────────────────────────────────
export const filterBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s3,
  marginBottom: space.s4,
});

export const filterSpacer = style({ flex: 1 });

export const recordCount = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  fontFamily: fontFamily.mono,
});

// ─── Body grid ────────────────────────────────────────────────────
export const bodyGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gap: space.s4,
  alignItems: 'start',
});

// ─── Table ────────────────────────────────────────────────────────
export const tableWrap = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  overflow: 'hidden',
});

export const tableHeader = style({
  display: 'grid',
  gridTemplateColumns: '28px 1.5fr 110px 70px 100px 70px 70px 90px 130px 28px',
  padding: `10px ${space.s4}`,
  borderBottom: `1px solid ${theme.line.default}`,
  background: theme.bg.raised,
});

export const tableRow = style({
  display: 'grid',
  gridTemplateColumns: '28px 1.5fr 110px 70px 100px 70px 70px 90px 130px 28px',
  padding: `${space.s3} ${space.s4}`,
  borderBottom: `1px solid ${theme.line.default}`,
  cursor: 'pointer',
  transition: 'background 100ms ease',
  alignItems: 'center',
  selectors: {
    '&:last-child': { borderBottom: 'none' },
    '&:hover': { background: theme.bg.hover },
    '&[data-selected="true"]': { background: theme.brand.dim },
  },
});

export const thCell = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  fontWeight: fontWeight.medium,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  userSelect: 'none',
});

export const tdCell = style({
  fontSize: fontSize.body,
  color: theme.ink['80'],
});

export const tdMono = style({
  fontFamily: fontFamily.mono,
  fontSize: fontSize.label,
  color: theme.ink['60'],
});

export const tenantName = style({
  fontWeight: fontWeight.medium,
  color: theme.ink['100'],
  marginBottom: '2px',
});

export const tenantUrl = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  fontFamily: fontFamily.mono,
});

// Status dot
export const statusCell = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const statusDot = style({
  width: '8px',
  height: '8px',
  borderRadius: radius.full,
  flexShrink: 0,
});

export const statusDotVariants = styleVariants({
  active: { background: theme.sev.good },
  archived: { background: theme.ink['60'] },
  draft: { background: theme.sev.high },
  suspended: { background: theme.sev.critical },
});

export const statusLabel = style({
  fontSize: fontSize.body,
  color: theme.ink['80'],
});

export const statusHint = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  marginTop: '1px',
});

// Plan badge
export const planBadge = style({
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: radius.xs,
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
});

export const planBadgeVariants = styleVariants({
  enterprise: {
    background: theme.brand.dim,
    color: theme.brand.default,
  },
  pro: {
    background: theme.sev.lowBg,
    color: theme.sev.low,
  },
  starter: {
    background: theme.bg.overlay,
    color: theme.ink['60'],
  },
});

// Menu button
export const menuBtn = style({
  width: '24px',
  height: '24px',
  display: 'grid',
  placeItems: 'center',
  border: 'none',
  background: 'transparent',
  color: theme.ink['40'],
  cursor: 'pointer',
  borderRadius: radius.xs,
  selectors: {
    '&:hover': {
      background: theme.bg.hover,
      color: theme.ink['80'],
    },
  },
});

// ─── Detail sidebar ───────────────────────────────────────────────
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const sidebarTitle = style({
  fontWeight: fontWeight.semibold,
  fontSize: fontSize.lg,
  color: theme.ink['100'],
});

export const sidebarSection = style({
  padding: `${space.s4} ${space.s5}`,
  borderBottom: `1px solid ${theme.line.default}`,
  selectors: {
    '&:last-child': { borderBottom: 'none' },
  },
});

export const sidebarSectionTitle = style({
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
  color: theme.ink['40'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: space.s3,
});

export const metaGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: space.s3,
});

export const metaItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});

export const metaLabel = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
});

export const metaValue = style({
  fontSize: fontSize.body,
  color: theme.ink['100'],
  fontWeight: fontWeight.medium,
});

export const usageGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: space.s3,
});

export const usageStat = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});

export const usageValue = style({
  fontFamily: fontFamily.mono,
  fontSize: fontSize.xl,
  fontWeight: fontWeight.semibold,
  color: theme.ink['100'],
  lineHeight: 1.1,
});

export const usageLabel = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
});

export const activityList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space.s2,
});

export const activityItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const activityText = style({
  fontSize: fontSize.body,
  color: theme.ink['80'],
});

export const activityTime = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
});

export const quickActions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space.s2,
});

export const qaBtn = style({
  padding: `${space.s2} ${space.s3}`,
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.sm,
  fontSize: fontSize.body,
  color: theme.ink['80'],
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'background 100ms ease',
  selectors: {
    '&:hover': { background: theme.bg.hover, color: theme.ink['100'] },
  },
});

export const qaBtnDanger = style({
  padding: `${space.s2} ${space.s3}`,
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.sm,
  fontSize: fontSize.body,
  color: theme.ink['40'],
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 100ms ease',
  selectors: {
    '&:hover': { background: theme.sev.criticalBg, color: theme.sev.critical, borderColor: theme.sev.critical },
  },
});

export const emptyState = style({
  padding: `${space.s7} ${space.s5}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: space.s3,
  color: theme.ink['40'],
  fontSize: fontSize.body,
  textAlign: 'center',
});
