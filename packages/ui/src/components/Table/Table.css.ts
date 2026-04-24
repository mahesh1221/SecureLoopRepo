import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { theme, transition, fontFamily } from '@secureloop/design-system';

export const wrap = style({
  background: theme.bg.raised,
  border: `1px solid ${theme.line.default}`,
  borderRadius: '10px',
  boxShadow: theme.elevation.card,
  overflow: 'hidden',
});

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderBottom: `1px solid ${theme.line.default}`,
  background: theme.bg.overlay,
});

export const scroll = style({
  overflowX: 'auto',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13px',
  background: theme.bg.raised,
});

export const thead = style({
  // sticky behaviour on ths
});

export const th = recipe({
  base: {
    padding: 'var(--sl-table-cell-y, 11px) 16px',
    background: theme.bg.overlay,
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: theme.ink['60'],
    fontWeight: 600,
    textAlign: 'left',
    borderBottom: `1px solid ${theme.line.default}`,
    position: 'sticky',
    top: 0,
    zIndex: 2,
    transition: transition('padding', 'base'),
    fontFamily: fontFamily.ui,
    whiteSpace: 'nowrap',
  },
  variants: {
    align: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
    sortable: {
      true: {
        cursor: 'pointer',
        userSelect: 'none',
        selectors: {
          '&:hover': { color: theme.ink['100'] },
        },
      },
    },
    active: {
      true: { color: theme.ink['100'] },
    },
    numeric: {
      true: { textAlign: 'right' },
    },
  },
});

export const chev = style({
  display: 'inline-block',
  marginLeft: '4px',
  opacity: 0.4,
  fontSize: '9px',
  transition: transition('opacity', 'fast'),
});

// Upgrade chev visibility when in sortable/active th
import { globalStyle as gs } from '@vanilla-extract/css';
gs(`th[data-sortable="true"]:hover .${chev}`, { opacity: 1 });
gs(`th[data-active="true"] .${chev}`, { opacity: 1, color: theme.brand.default });

export const td = recipe({
  base: {
    padding: 'var(--sl-table-cell-y, 11px) 16px',
    borderBottom: `1px solid ${theme.line.default}`,
    verticalAlign: 'middle',
    transition: transition('padding', 'base'),
    color: theme.ink['100'],
  },
  variants: {
    numeric: {
      true: {
        textAlign: 'right',
        fontFamily: fontFamily.mono,
        fontVariantNumeric: 'tabular-nums',
      },
    },
    mono: {
      true: {
        fontFamily: fontFamily.mono,
        fontSize: '11px',
        color: theme.ink['80'],
      },
    },
  },
});

export const tr = recipe({
  base: {
    transition: transition('background-color', 'fast'),
    selectors: {
      '&:hover': { background: theme.bg.hover },
      '&:last-child td': { borderBottom: 'none' },
    },
  },
  variants: {
    selected: {
      true: {
        background: theme.brand.dim,
        boxShadow: `inset 3px 0 0 ${theme.brand.default}`,
        selectors: {
          '&:hover': { background: theme.brand.dim },
        },
      },
    },
    clickable: {
      true: { cursor: 'pointer' },
    },
    zebra: {
      true: {
        selectors: {
          '&:nth-child(even)': { background: theme.bg.overlay },
          '&:nth-child(even):hover': { background: theme.bg.hover },
        },
      },
    },
  },
});

// Checkbox primitive for selection column
export const chk = style({
  width: '16px',
  height: '16px',
  border: `1px solid ${theme.line.strong}`,
  borderRadius: '3px',
  background: theme.bg.base,
  cursor: 'pointer',
  display: 'inline-grid',
  placeItems: 'center',
  transition: transition('all', 'fast'),
});

export const chkOn = style({
  background: theme.brand.default,
  borderColor: theme.brand.default,
});

globalStyle(`${chkOn}::after`, {
  content: '""',
  width: '8px',
  height: '4px',
  borderLeft: `2px solid ${theme.brand.ink}`,
  borderBottom: `2px solid ${theme.brand.ink}`,
  transform: 'rotate(-45deg) translateY(-1px)',
});

export const footer = style({
  padding: '12px 16px',
  background: theme.bg.overlay,
  borderTop: `1px solid ${theme.line.default}`,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '11px',
  color: theme.ink['60'],
});
