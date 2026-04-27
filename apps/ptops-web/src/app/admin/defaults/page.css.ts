import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '@secureloop/design-system';
import { space, radius, fontSize, fontFamily, fontWeight } from '@secureloop/design-system';

export const page = style({
  maxWidth: '1520px',
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
  marginBottom: space.s4,
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
  transition: 'color 120ms ease',
  selectors: { '&:hover': { color: theme.ink['100'] } },
});

export const tabItemActive = style({
  color: theme.ink['100'],
  fontWeight: fontWeight.medium,
  borderBottom: `2px solid ${theme.brand.default}`,
});

// ─── Body grid ────────────────────────────────────────────────────
export const bodyGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 420px',
  gap: space.s5,
  alignItems: 'start',
});

// ─── Card ─────────────────────────────────────────────────────────
export const card = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  overflow: 'hidden',
  marginBottom: space.s4,
});

export const cardHeader = style({
  padding: `${space.s4} ${space.s5}`,
  borderBottom: `1px solid ${theme.line.default}`,
  fontWeight: fontWeight.semibold,
  fontSize: fontSize.lg,
  color: theme.ink['100'],
});

export const cardBody = style({
  padding: `${space.s4} ${space.s5}`,
});

// ─── SLA table ────────────────────────────────────────────────────
export const slaHeader = style({
  display: 'grid',
  gridTemplateColumns: '100px 1fr 1fr 1fr',
  gap: space.s3,
  padding: `${space.s2} 0`,
  borderBottom: `1px solid ${theme.line.default}`,
  marginBottom: space.s2,
});

export const slaRow = style({
  display: 'grid',
  gridTemplateColumns: '100px 1fr 1fr 1fr',
  gap: space.s3,
  alignItems: 'center',
  padding: `${space.s3} 0`,
  borderBottom: `1px solid ${theme.line.default}`,
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const slaSev = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: fontSize.body,
  fontWeight: fontWeight.medium,
  color: theme.ink['80'],
});

export const slaDot = style({
  width: '8px',
  height: '8px',
  borderRadius: radius.full,
  flexShrink: 0,
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
  selectors: { '&:hover': { background: theme.bg.hover } },
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

export const thCell = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  fontWeight: fontWeight.medium,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
});

// ─── Escalation chain ─────────────────────────────────────────────
export const escalationChain = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s2,
  overflowX: 'auto',
  padding: `${space.s2} 0`,
});

export const escalationArrow = style({
  color: theme.ink['40'],
  flexShrink: 0,
  fontSize: fontSize.lg,
});

export const escalationCard = style({
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.sm,
  padding: `${space.s3} ${space.s4}`,
  minWidth: '130px',
  flexShrink: 0,
});

export const escalationLevel = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '2px',
});

export const escalationDelay = style({
  fontFamily: fontFamily.mono,
  fontSize: fontSize.body,
  color: theme.ink['100'],
  fontWeight: fontWeight.medium,
});

// ─── Access policy rows ───────────────────────────────────────────
export const policyRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s3,
  padding: `${space.s3} 0`,
  borderBottom: `1px solid ${theme.line.default}`,
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const policyText = style({ flex: 1 });

export const policyLabel = style({
  fontSize: fontSize.body,
  fontWeight: fontWeight.medium,
  color: theme.ink['80'],
  marginBottom: '2px',
});

export const policyDesc = style({
  fontSize: fontSize.label,
  color: theme.ink['40'],
});

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
  padding: '4px 14px',
  borderRadius: radius.full,
  border: 'none',
  background: 'transparent',
  fontSize: fontSize.label,
  color: theme.ink['60'],
  cursor: 'pointer',
  transition: 'all 120ms ease',
  whiteSpace: 'nowrap',
  selectors: { '&:hover': { color: theme.ink['80'] } },
});

export const segPillBtnActive = style({
  background: theme.brand.default,
  color: theme.brand.ink,
  fontWeight: fontWeight.medium,
});

// ─── Sidebar ──────────────────────────────────────────────────────
export const sidebar = style({
  position: 'sticky',
  top: `calc(56px + ${space.s6})`,
  display: 'flex',
  flexDirection: 'column',
  gap: space.s4,
});

export const sidebarCard = style({
  background: theme.bg.base,
  border: `1px solid ${theme.line.default}`,
  borderRadius: radius.md,
  overflow: 'hidden',
});

export const sidebarCardHeader = style({
  padding: `${space.s3} ${space.s4}`,
  borderBottom: `1px solid ${theme.line.default}`,
  fontSize: fontSize.label,
  fontWeight: fontWeight.medium,
  color: theme.ink['40'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
});

export const sidebarCardBody = style({
  padding: `${space.s4}`,
});

export const impactStat = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${space.s2} 0`,
  borderBottom: `1px solid ${theme.line.default}`,
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const impactLabel = style({ fontSize: fontSize.body, color: theme.ink['60'] });
export const impactValue = style({ fontFamily: fontFamily.mono, fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: theme.ink['100'] });

export const diffItem = style({
  padding: `${space.s2} 0`,
  borderBottom: `1px solid ${theme.line.default}`,
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const diffLabel = style({ fontSize: fontSize.body, color: theme.ink['80'], marginBottom: '2px' });
export const diffOld = style({ fontSize: fontSize.label, color: theme.ink['40'], fontFamily: fontFamily.mono });
export const diffNew = style({ fontSize: fontSize.label, color: theme.sev.good, fontFamily: fontFamily.mono });

export const historyItem = style({
  padding: `${space.s2} 0`,
  borderBottom: `1px solid ${theme.line.default}`,
  selectors: { '&:last-child': { borderBottom: 'none' } },
});

export const historyText = style({ fontSize: fontSize.body, color: theme.ink['80'] });
export const historyTime = style({ fontSize: fontSize.label, color: theme.ink['40'], marginTop: '2px' });

// ─── Footer actions ───────────────────────────────────────────────
export const footerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.s3,
  padding: `${space.s4} 0`,
  marginTop: space.s2,
  borderTop: `1px solid ${theme.line.default}`,
});
