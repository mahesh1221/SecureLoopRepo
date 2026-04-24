import { theme } from '../themes/contract';

/**
 * v2 ADDITIVE — 4-tier elevation system.
 *
 * Usage example:
 *   import { elevation } from '@secureloop/design-system';
 *   style({ boxShadow: elevation.raised })
 */
export const elevation = {
  flat: theme.elevation.flat,
  card: theme.elevation.card,
  raised: theme.elevation.raised,
  overlay: theme.elevation.overlay,
  modal: theme.elevation.modal,
} as const;

export type ElevationToken = keyof typeof elevation;

/**
 * Elevation hierarchy for reference:
 *
 * | Tier    | Use case                                    |
 * |---------|---------------------------------------------|
 * | flat    | Dividers, inline sections                   |
 * | card    | KPIs, stat tiles, default cards             |
 * | raised  | Popovers, sticky sidebars, hovered cards    |
 * | overlay | Dropdowns, theme picker, context menus      |
 * | modal   | Dialogs, wizards, confirmations             |
 */
