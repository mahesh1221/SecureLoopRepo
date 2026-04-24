import { createGlobalThemeContract } from '@vanilla-extract/css';

/**
 * Theme contract — single source of truth for all 4 theme combos.
 * Each theme (coffee-dark, coffee-light, blue-dark, blue-light)
 * must provide every key below. Enforced by vanilla-extract at build time.
 *
 * CSS variables are prefixed with `--sl-` to avoid collisions.
 */
export const theme = createGlobalThemeContract(
  {
    // ─── Surface tokens ───────────────────────────────────────────
    bg: {
      page: 'bg-page',
      base: 'bg-base',
      raised: 'bg-raised',
      overlay: 'bg-overlay',
      hover: 'bg-hover',
    },

    // ─── Border / divider tokens ──────────────────────────────────
    line: {
      default: 'line',
      strong: 'line-strong',
    },

    // ─── Ink (text) tokens ────────────────────────────────────────
    ink: {
      '100': 'ink-100',
      '80': 'ink-80',
      '60': 'ink-60',
      '40': 'ink-40',
      '20': 'ink-20',
    },

    // ─── Brand tokens ─────────────────────────────────────────────
    brand: {
      default: 'brand',
      ink: 'brand-ink',
      dim: 'brand-dim',
      glow: 'brand-glow',
    },

    // ─── Severity tokens (reserved for risk status) ───────────────
    sev: {
      critical: 'sev-critical',
      criticalBg: 'sev-critical-bg',
      high: 'sev-high',
      highBg: 'sev-high-bg',
      medium: 'sev-medium',
      mediumBg: 'sev-medium-bg',
      low: 'sev-low',
      lowBg: 'sev-low-bg',
      good: 'status-good',
      goodBg: 'status-good-bg',
    },

    // ─── Elevation shadows (v2) ───────────────────────────────────
    elevation: {
      flat: 'e-flat',
      card: 'e-card',
      raised: 'e-raised',
      overlay: 'e-overlay',
      modal: 'e-modal',
    },

    // ─── Data visualisation palettes (v2) ─────────────────────────
    dv: {
      cat1: 'dv-cat-1',
      cat2: 'dv-cat-2',
      cat3: 'dv-cat-3',
      cat4: 'dv-cat-4',
      cat5: 'dv-cat-5',
      cat6: 'dv-cat-6',
      cat7: 'dv-cat-7',
      cat8: 'dv-cat-8',
      seq1: 'dv-seq-1',
      seq2: 'dv-seq-2',
      seq3: 'dv-seq-3',
      seq4: 'dv-seq-4',
      seq5: 'dv-seq-5',
      divNeg3: 'dv-div-neg-3',
      divNeg2: 'dv-div-neg-2',
      divNeg1: 'dv-div-neg-1',
      div0: 'dv-div-0',
      divPos1: 'dv-div-pos-1',
      divPos2: 'dv-div-pos-2',
      divPos3: 'dv-div-pos-3',
      grid: 'dv-grid',
      axis: 'dv-axis',
      track: 'dv-track',
    },

    // ─── Miscellaneous ────────────────────────────────────────────
    misc: {
      grainOpacity: 'grain-op',
      focusHalo: 'focus-halo',
    },
  },
  (_value, path) => `sl-${path.join('-')}`
);

export type Theme = typeof theme;
