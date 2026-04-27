import { forwardRef, type SVGAttributes, type ReactNode } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { iconBase, iconSize } from './Icon.css';
import { cn } from '../../utils/cn';

type IconSizeVariants = NonNullable<RecipeVariants<typeof iconSize>>;

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'color'>, IconSizeVariants {
  children: ReactNode;
  /** Stroke width — default 1.8 per DS v2 icon system */
  strokeWidth?: number;
  /** Inherits currentColor by default */
  color?: string;
}

/**
 * Inline SVG icon primitive. Per DS v2:
 *  - Stroke 1.8 (Lucide/Feather style)
 *  - Fixed sizes: 12 / 14 / 16 / 20 / 24 / 32
 *  - Wraps children as SVG paths/shapes
 *
 * For convenience, a preset `icons` map of common glyphs is exported below.
 *
 * @example
 *   <Icon size="20"><icons.check /></Icon>
 *   <Icon size="16"><path d="..." /></Icon>
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, strokeWidth = 1.8, color, className, children, ...rest }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconBase, iconSize({ size }), className)}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  ),
);
Icon.displayName = 'Icon';

// ─── Preset icon paths (named render-functions to keep bundle small) ──

export const icons = {
  check: () => <polyline points="20 6 9 17 4 12" />,
  x: () => (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  chevronDown: () => <polyline points="6 9 12 15 18 9" />,
  chevronRight: () => <polyline points="9 18 15 12 9 6" />,
  plus: () => (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  search: () => (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  alertTriangle: () => (
    <>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  info: () => (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
  download: () => (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </>
  ),
  refresh: () => (
    <>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </>
  ),
  user: () => (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  bell: () => (
    <>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </>
  ),
  signOut: () => (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </>
  ),
  shield: () => <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  lock: () => (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  pulse: () => <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
} as const;

export type IconName = keyof typeof icons;
