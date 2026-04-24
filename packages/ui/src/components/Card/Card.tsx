import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { card, cardHead, cardTitle, cardMeta, cardBody } from './Card.css';
import { cn } from '../../utils/cn';

type CardVariants = NonNullable<RecipeVariants<typeof card>>;

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardVariants {
  children?: ReactNode;
}

/**
 * Surface primitive — one of the 4 elevation tiers.
 * Default = card (1px shadow). Use raised for popovers, overlay for menus.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ elevation, interactive, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(card({ elevation, interactive }), className)}
      {...rest}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

// ─── Slot components ────────────────────────────────────────────────

export interface CardHeadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  meta?: ReactNode;
}

export const CardHead = forwardRef<HTMLDivElement, CardHeadProps>(
  ({ title, meta, className, children, ...rest }, ref) => (
    <div ref={ref} className={cn(cardHead, className)} {...rest}>
      {title !== undefined ? (
        <h2 className={cardTitle}>{title}</h2>
      ) : null}
      {meta !== undefined ? <span className={cardMeta}>{meta}</span> : null}
      {children}
    </div>
  )
);
CardHead.displayName = 'CardHead';

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn(cardBody, className)} {...rest}>
      {children}
    </div>
  )
);
CardBody.displayName = 'CardBody';
