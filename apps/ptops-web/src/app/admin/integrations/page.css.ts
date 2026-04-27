import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '@secureloop/design-system';
import { space, radius, fontSize, fontFamily, fontWeight } from '@secureloop/design-system';

export const page = style({
  maxWidth: '1680px',
  margin: '0 auto',
  padding: `${space.s6} ${space.s7}`,
});

export const pageTitle = style({
  fontFamily: fontFamily.display,
  fontWeight: fontWeight.semibold,
  fontSize: fontSize['2xl'],
  color: theme.ink['100'],
  margin: `0 0 ${space.s1}`,
});

export const pageSubtitle = style({
  fontSize: fontSize.body,
  color: theme.ink['60'],
  marginBottom: space.s5,
});

// ─── KPI strip ────────────────────────────────────────────────────
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
  lineHeight: 1.1,
});

export const kpiValueVariants = styleVariants({
  good: { color: theme.sev.good },
  warn: { color: theme.sev.medium },
  crit: { color: theme.sev.critical },
  default: { color: theme.ink['100'] },
});

// ─── Tabs ─────────────────────────────────────────────────────────
export const tabBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  borderBottom: `1px solid ${theme.line.default}`,
  marginBottom: space.s5,
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
  selectors: { '&:hover': { color: theme.ink['100'] } },
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

// ─── Body grid ────────────────────────────────────────────────────
export const bodyGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gap: space.s4,
  alignItems: 'start',
});

// ─── Category head ────────────────────────────────────────────────
export const categoryHead = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s2,
  marginBottom: space.s3,
  marginTop: space.s5,
  selectors: { '&:first-of-type': { marginTop: 0 } },
});

export const categoryChip = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 8px',
  borderRadius: radius.full,
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
  background: theme.bg.overlay,
  color: theme.ink['60'],
});

export const categoryTitle = style({
  fontWeight: fontWeight.medium,
  color: theme.ink['80'],
  fontSize: fontSize.body,
  flex: 1,
});

// ─── Integration card grid ────────────────────────────────────────
export const intGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: space.s3,
  marginBottom: space.s4,
});

export const intCard = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  padding: space.s4,
  cursor: 'pointer',
  transition: 'border-color 120ms ease',
  selectors: {
    '&:hover': { borderColor: theme.line.strong },
    '&[data-selected="true"]': { background: theme.brand.dim, borderColor: theme.brand.default },
  },
});

export const intCardDisabled = style({ opacity: 0.55 });

export const intCardTop = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: space.s3,
  marginBottom: space.s3,
});

export const intLogo = style({
  width: '40px',
  height: '40px',
  borderRadius: radius.sm,
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  display: 'grid',
  placeItems: 'center',
  color: theme.ink['60'],
  flexShrink: 0,
  fontSize: fontSize.label,
  fontWeight: fontWeight.semibold,
  fontFamily: fontFamily.mono,
});

export const intInfo = style({ flex: 1 });

export const intName = style({
  fontWeight: fontWeight.semibold,
  color: theme.ink['100'],
  fontSize: fontSize.body,
  marginBottom: '2px',
});

export const intCategory = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
});

// ─── Segmented pill (enabled / disabled toggle) ───────────────────
export const segPill = style({
  display: 'flex',
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.full,
  padding: '2px',
  gap: '2px',
  flexShrink: 0,
});

export const segPillBtn = style({
  padding: '3px 10px',
  borderRadius: radius.full,
  border: 'none',
  background: 'transparent',
  fontSize: fontSize.label,
  color: theme.ink['60'],
  cursor: 'pointer',
  transition: 'all 120ms ease',
  selectors: { '&:hover': { color: theme.ink['80'] } },
});

export const segPillBtnActive = style({
  background: theme.brand.default,
  color: theme.brand.ink,
  fontWeight: fontWeight.medium,
});

export const intMeta = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: fontSize.label,
  color: theme.ink['40'],
  marginTop: space.s3,
});

// ─── Health dot ───────────────────────────────────────────────────
export const healthDot = style({
  width: '8px',
  height: '8px',
  borderRadius: radius.full,
  display: 'inline-block',
  marginRight: '4px',
});

export const healthDotVariants = styleVariants({
  good: { background: theme.sev.good },
  warn: { background: theme.sev.medium },
  crit: { background: theme.sev.critical },
  off: { background: theme.ink['40'] },
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
  gap: space.s3,
});

export const sidebarLogoBox = style({
  width: '40px',
  height: '40px',
  borderRadius: radius.sm,
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  color: theme.ink['60'],
  fontFamily: fontFamily.mono,
  fontSize: fontSize.label,
  fontWeight: fontWeight.semibold,
});

export const sidebarSection = style({
  padding: `${space.s4} ${space.s5}`,
  borderBottom: `1px solid ${theme.line.default}`,
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const sidebarSectionTitle = style({
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
  color: theme.ink['40'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: space.s3,
});

export const usageTenantItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${space.s2} 0`,
  borderBottom: `1px solid ${theme.line.default}`,
  fontSize: fontSize.body,
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const dangerBtn = style({
  width: '100%',
  padding: `${space.s2} ${space.s3}`,
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.sm,
  fontSize: fontSize.body,
  color: theme.ink['40'],
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 100ms ease',
  selectors: { '&:hover': { background: theme.sev.criticalBg, color: theme.sev.critical, borderColor: theme.sev.critical } },
});

// ─── Failure table ────────────────────────────────────────────────
export const failureSection = style({ marginTop: space.s5 });

export const failureSectionTitle = style({
  fontSize: fontSize.lg,
  fontWeight: fontWeight.semibold,
  color: theme.ink['100'],
  marginBottom: space.s3,
});

export const failureTable = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  overflow: 'hidden',
});

export const failureHeader = style({
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
  padding: `10px ${space.s4}`,
  borderBottom: `1px solid ${theme.line.default}`,
  background: theme.bg.raised,
});

export const failureRow = style({
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
  padding: `${space.s3} ${space.s4}`,
  borderBottom: `1px solid ${theme.line.default}`,
  alignItems: 'center',
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const failureThCell = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  fontWeight: fontWeight.medium,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
});

export const failureTdCell = style({ fontSize: fontSize.body, color: theme.ink['80'] });

export const errorBadge = style({
  display: 'inline-flex',
  padding: '2px 8px',
  borderRadius: radius.xs,
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
});

export const errorBadgeVariants = styleVariants({
  auth: { background: theme.sev.criticalBg, color: theme.sev.critical },
  rate: { background: theme.sev.highBg, color: theme.sev.high },
  conn: { background: theme.sev.mediumBg, color: theme.sev.medium },
});
