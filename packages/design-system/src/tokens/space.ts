/**
 * v1 FROZEN — spacing scale
 *
 * Only these 7 values. Never introduce new spacing values.
 * Note: the system historically uses --s-1 through --s-7 in CSS.
 * Here we expose by canonical pixel name for better DX in JS,
 * and preserve the --s-N contract in the generated CSS vars.
 */
export const space = {
  s1: '4px',
  s2: '8px',
  s3: '12px',
  s4: '16px',
  s5: '24px',
  s6: '32px',
  s7: '48px',
} as const;

export type SpaceToken = keyof typeof space;

/**
 * v1 FROZEN — radius scale
 * Only these 4 values.
 */
export const radius = {
  xs: '3px',
  sm: '6px',
  md: '10px',
  full: '999px',
} as const;

export type RadiusToken = keyof typeof radius;

/**
 * v2 ADDITIVE — density modes
 * Toggle via data-density on body. Changes row height + padding
 * WITHOUT touching the type scale.
 */
export const density = {
  comfortable: {
    rowHeight: '44px',
    cardPaddingY: '20px',
    cardPaddingX: '24px',
    tableCellY: '11px',
    inputHeight: '36px',
  },
  compact: {
    rowHeight: '32px',
    cardPaddingY: '14px',
    cardPaddingX: '18px',
    tableCellY: '6px',
    inputHeight: '30px',
  },
} as const;

export type DensityMode = keyof typeof density;

/**
 * v2 ADDITIVE — breakpoints
 * Reference only for Phase 1 (desktop-first). Mobile reflow Phase 2.
 */
export const breakpoints = {
  sm: '640px', // phone
  md: '900px', // tablet
  lg: '1200px', // laptop
  xl: '1440px', // desktop
  '2xl': '1760px', // wide
} as const;

export type BreakpointToken = keyof typeof breakpoints;
