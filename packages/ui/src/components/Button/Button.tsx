import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { button, iconSlot } from './Button.css';
import { cn } from '../../utils/cn';

type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    ButtonVariants {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
}

/**
 * Primary action component. Follows v1 locked pattern:
 * never rendered as primary in wizard footers (use × header close).
 *
 * @example
 *   <Button variant="primary">Save</Button>
 *   <Button variant="ghost" leftIcon={<RefreshIcon />}>Refresh</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, size, fullWidth, leftIcon, rightIcon, className, children, ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(button({ variant, size, fullWidth }), className)}
        {...rest}
      >
        {leftIcon && <span className={iconSlot}>{leftIcon}</span>}
        {children}
        {rightIcon && <span className={iconSlot}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
