import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { chip } from './Chip.css';
import { cn } from '../../utils/cn';

type ChipVariants = NonNullable<RecipeVariants<typeof chip>>;

export interface ChipProps
  extends HTMLAttributes<HTMLSpanElement>,
    ChipVariants {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

/**
 * Pill-shaped label with optional icons. Used for identity chips,
 * per-tenant isolation indicators, filter pills, tenant/env tags.
 */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    { tone, clickable, leftIcon, rightIcon, className, children, ...rest },
    ref
  ) => (
    <span
      ref={ref}
      className={cn(chip({ tone, clickable }), className)}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </span>
  )
);
Chip.displayName = 'Chip';
