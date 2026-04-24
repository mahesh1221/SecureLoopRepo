/**
 * v1 FROZEN — type scale
 *
 * Only these 7 sizes. Never introduce new values.
 * Pair with line-height scale from ./typography-rhythm.ts (v2).
 */

export const fontSize = {
  micro: '10px',
  label: '11px',
  body: '13px',
  lg: '15px',
  xl: '20px',
  '2xl': '28px',
  hero: '44px',
} as const;

export type FontSizeToken = keyof typeof fontSize;

/**
 * v1 FROZEN — font stacks
 * Loaded via Google Fonts at app shell level.
 */
export const fontFamily = {
  display: `'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif`,
  ui: `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif`,
  mono: `'JetBrains Mono', Menlo, Monaco, Consolas, monospace`,
} as const;

export type FontFamilyToken = keyof typeof fontFamily;

/**
 * v1 FROZEN — font weights in use across the system
 */
export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export type FontWeightToken = keyof typeof fontWeight;

/**
 * v2 ADDITIVE — line-height rhythm
 * Pair these with v1 font sizes. No new font sizes introduced.
 */
export const lineHeight = {
  tight: 1.2, // display numbers, hero headlines
  snug: 1.4, // headings, titles
  normal: 1.5, // body text
  relaxed: 1.65, // long-form narrative, policy text
} as const;

export type LineHeightToken = keyof typeof lineHeight;

/**
 * v2 ADDITIVE — letter-spacing rules
 * Optical balance for heavy weights + uppercase micro labels.
 */
export const letterSpacing = {
  tight: '-0.02em', // 700+ weight headlines
  normal: '0',
  wide: '0.1em', // uppercase micro labels
} as const;

export type LetterSpacingToken = keyof typeof letterSpacing;
