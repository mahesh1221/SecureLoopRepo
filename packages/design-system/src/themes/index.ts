/**
 * Importing this module registers all 4 theme CSS bundles as globals.
 * Apply one theme by setting body class: t-coffee-dark, t-coffee-light,
 * t-blue-dark, or t-blue-light.
 *
 * Default: t-coffee-dark.
 */

export { theme } from './contract';
export type { Theme } from './contract';

// Side-effect imports — register global theme CSS
import './coffee-dark.css';
import './coffee-light.css';
import './blue-dark.css';
import './blue-light.css';

export const themes = ['coffee-dark', 'coffee-light', 'blue-dark', 'blue-light'] as const;

export type ThemeName = (typeof themes)[number];

export const themeFamilies = ['coffee', 'blue'] as const;
export type ThemeFamily = (typeof themeFamilies)[number];

export const themeModes = ['dark', 'light'] as const;
export type ThemeMode = (typeof themeModes)[number];

/**
 * Compose a theme name from family + mode.
 */
export function composeTheme(family: ThemeFamily, mode: ThemeMode): ThemeName {
  return `${family}-${mode}` as ThemeName;
}

/**
 * Decompose a theme name into family + mode.
 */
export function decomposeTheme(name: ThemeName): {
  family: ThemeFamily;
  mode: ThemeMode;
} {
  const [family, mode] = name.split('-') as [ThemeFamily, ThemeMode];
  return { family, mode };
}

export const DEFAULT_THEME: ThemeName = 'coffee-dark';
