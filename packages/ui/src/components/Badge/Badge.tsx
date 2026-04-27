import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { badge } from './Badge.css';
import { cn } from '../../utils/cn';

type BadgeVariants = NonNullable<RecipeVariants<typeof badge>>;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeVariants {
  children?: ReactNode;
}

/**
 * Small tonal label. Tone maps to severity/status semantics.
 * Never use data-viz palette for badges — reserved for charts.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone, outline, className, children, ...rest }, ref) => (
    <span ref={ref} className={cn(badge({ tone, outline }), className)} {...rest}>
      {children}
    </span>
  ),
);
Badge.displayName = 'Badge';
