/**
 * v2 ADDITIVE — motion tokens.
 * Named durations + easing curves. No more ad-hoc transition values.
 */

export const duration = {
  fast: '120ms', // hover, focus, small state changes
  base: '200ms', // standard transitions
  slow: '320ms', // modal rise, drawer open
  slower: '500ms', // success moments, orchestrated sequences
} as const;

export type DurationToken = keyof typeof duration;

export const easing = {
  /** Standard exit — most UI transitions */
  out: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
  /** Symmetric in-out */
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Spring with subtle overshoot — buttons, card lifts */
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** Emphasized — hero moments, primary CTAs, modal entry */
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
} as const;

export type EasingToken = keyof typeof easing;

/**
 * Convenience: compose a full transition shorthand.
 * @example
 *   transition('background', 'fast', 'out')  → 'background 120ms cubic-bezier(...)'
 *   transition('all', 'base')                → 'all 200ms cubic-bezier(...)'  (default out)
 */
export function transition(
  property: string,
  dur: DurationToken = 'base',
  ease: EasingToken = 'out',
): string {
  return `${property} ${duration[dur]} ${easing[ease]}`;
}
