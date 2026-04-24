/**
 * @secureloop/design-system
 *
 * Token-based design system for the SecureLoop GRC Platform.
 *
 * v1 FROZEN foundations (fonts, type scale, spacing, radius, 4 palettes)
 * plus v2 ADDITIVE layer (elevation, motion, data-viz, density, rhythm).
 *
 * Import once at the app root to register global CSS:
 *   import '@secureloop/design-system';
 *
 * Then apply a theme class on body:
 *   <body class="t-coffee-dark" data-density="comfortable">
 */

// Side-effect: register all themes + global CSS
import './themes';
import './global/index.css';

// Named exports
export * from './tokens';
export * from './themes';
export * from './motion';
export * from './elevation';
export * from './dataviz';

// Re-export keyframes for downstream components
export { kf } from './global/index.css';
