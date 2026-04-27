import { forwardRef, type HTMLAttributes } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { skeleton, stack } from './Skeleton.css';
import { cn } from '../../utils/cn';

type SkeletonVariants = NonNullable<RecipeVariants<typeof skeleton>>;

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement>, SkeletonVariants {
  /** Explicit width override */
  width?: string | number;
  /** Explicit height override */
  height?: string | number;
}

/**
 * Placeholder with shimmer animation. Match the shape of the final content
 * so the user sees the layout immediately.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ shape, width, height, className, style: styleProp, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(skeleton({ shape }), className)}
      style={{ width, height, ...styleProp }}
      aria-hidden="true"
      {...rest}
    />
  ),
);
Skeleton.displayName = 'Skeleton';

export interface SkeletonStackProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of skeleton lines to render */
  lines?: number;
}

/**
 * Convenience: vertical stack of text skeletons with varying widths
 * for a realistic "paragraph" loading shape.
 */
export const SkeletonStack = forwardRef<HTMLDivElement, SkeletonStackProps>(
  ({ lines = 3, className, ...rest }, ref) => {
    const widths = ['75%', '90%', '60%', '85%', '70%'];
    return (
      <div ref={ref} className={cn(stack, className)} {...rest}>
        {Array.from({ length: lines }, (_, i) => (
          <Skeleton key={i} shape="text" width={widths[i % widths.length]!} />
        ))}
      </div>
    );
  },
);
SkeletonStack.displayName = 'SkeletonStack';
