import { createGlobalTheme } from '@vanilla-extract/css';
import { theme } from './contract';

/**
 * Coffee Dark — the default theme.
 * Applied via body.t-coffee-dark class (global scope).
 *
 * v1 palette values are FROZEN. v2 additions (elevation, dv palette)
 * are additive and do not modify v1 tokens.
 */
createGlobalTheme('body.t-coffee-dark', theme, {
  bg: {
    page: '#120804',
    base: '#1A0F08',
    raised: '#25170D',
    overlay: '#2B1810',
    hover: '#3D2817',
  },
  line: {
    default: 'rgba(243, 238, 226, 0.07)',
    strong: 'rgba(243, 238, 226, 0.14)',
  },
  ink: {
    '100': '#F3EEE2',
    '80': '#D4CBB0',
    '60': '#A69B80',
    '40': '#7A7058',
    '20': '#3D3428',
  },
  brand: {
    default: '#F3EEE2',
    ink: '#120804',
    dim: 'rgba(243, 238, 226, 0.12)',
    glow: 'rgba(243, 238, 226, 0.22)',
  },
  sev: {
    critical: '#FF6B5B',
    criticalBg: 'rgba(255, 107, 91, 0.14)',
    high: '#FFB04D',
    highBg: 'rgba(255, 176, 77, 0.14)',
    medium: '#FFD97A',
    mediumBg: 'rgba(255, 217, 122, 0.14)',
    low: '#7AB8E5',
    lowBg: 'rgba(122, 184, 229, 0.14)',
    good: '#8FE5B3',
    goodBg: 'rgba(143, 229, 179, 0.14)',
  },
  // ─── v2 elevation ──────────────────────────────────────────────
  elevation: {
    flat: '0 0 0 1px rgba(243, 238, 226, 0.07)',
    card: '0 1px 2px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.02)',
    raised: '0 4px 12px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.03)',
    overlay: '0 12px 32px rgba(0,0,0,0.52), 0 0 0 1px rgba(243,238,226,0.14)',
    modal: '0 24px 64px rgba(0,0,0,0.64), 0 0 0 1px rgba(243,238,226,0.14)',
  },
  // ─── v2 data viz ───────────────────────────────────────────────
  dv: {
    cat1: '#6F9CEB',
    cat2: '#E8A23D',
    cat3: '#5FB89D',
    cat4: '#C678B8',
    cat5: '#D47766',
    cat6: '#9BB86F',
    cat7: '#7B8FB8',
    cat8: '#D4A87A',
    seq1: '#1F3A52',
    seq2: '#3A5F82',
    seq3: '#5C87AE',
    seq4: '#8AAFCF',
    seq5: '#BFD6E8',
    divNeg3: '#B85840',
    divNeg2: '#D48870',
    divNeg1: '#E8B9A8',
    div0: '#C9C0AA',
    divPos1: '#A8C9B5',
    divPos2: '#70A888',
    divPos3: '#4A8860',
    grid: 'rgba(243, 238, 226, 0.07)',
    axis: '#7A7058',
    track: '#2B1810',
  },
  misc: {
    grainOpacity: '0.025',
    focusHalo: 'rgba(243, 238, 226, 0.22)',
  },
});
