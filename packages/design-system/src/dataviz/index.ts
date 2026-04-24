import { theme } from '../themes/contract';

/**
 * v2 ADDITIVE — data visualisation palettes.
 *
 * Severity colors (--sl-sev-*) are RESERVED for risk/status communication.
 * Never use them for neutral category encoding. Use these instead.
 */

export const categorical = [
  theme.dv.cat1,
  theme.dv.cat2,
  theme.dv.cat3,
  theme.dv.cat4,
  theme.dv.cat5,
  theme.dv.cat6,
  theme.dv.cat7,
  theme.dv.cat8,
] as const;

export const sequential = [
  theme.dv.seq1,
  theme.dv.seq2,
  theme.dv.seq3,
  theme.dv.seq4,
  theme.dv.seq5,
] as const;

export const diverging = [
  theme.dv.divNeg3,
  theme.dv.divNeg2,
  theme.dv.divNeg1,
  theme.dv.div0,
  theme.dv.divPos1,
  theme.dv.divPos2,
  theme.dv.divPos3,
] as const;

export const chartChrome = {
  grid: theme.dv.grid,
  axis: theme.dv.axis,
  track: theme.dv.track,
} as const;

/**
 * Pick a categorical color by series index.
 * Wraps around at 8.
 */
export function catAt(index: number): string {
  return categorical[index % categorical.length]!;
}

/**
 * Pick a sequential step 1-5.
 */
export function seqStep(step: 1 | 2 | 3 | 4 | 5): string {
  return sequential[step - 1]!;
}

/**
 * Pick a diverging step from -3 to +3.
 * 0 = neutral.
 */
export function divStep(step: -3 | -2 | -1 | 0 | 1 | 2 | 3): string {
  return diverging[step + 3]!;
}
