import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { root, illustration, title, description, cta } from './EmptyState.css';
import { cn } from '../../utils/cn';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional illustration — abstract SVG preferred over icons */
  illustration?: ReactNode;
  /** Short headline */
  title: ReactNode;
  /** Supporting context line */
  description?: ReactNode;
  /** Primary action */
  action?: ReactNode;
}

/**
 * Empty state primitive. Per DS v2:
 *  - Abstract SVG illustration (NOT an icon)
 *  - Headline + supporting line + optional CTA
 *  - Centered in a card-like container
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      illustration: illus,
      title: titleNode,
      description: descNode,
      action,
      className,
      ...rest
    },
    ref
  ) => (
    <div ref={ref} className={cn(root, className)} {...rest}>
      {illus && <div className={illustration}>{illus}</div>}
      <h3 className={title}>{titleNode}</h3>
      {descNode && <p className={description}>{descNode}</p>}
      {action && <div className={cta}>{action}</div>}
    </div>
  )
);
EmptyState.displayName = 'EmptyState';

// ─── Preset illustrations ─────────────────────────────────────────

/**
 * Generic "no data yet" illustration — abstract dotted grid with card + plus.
 */
export function EmptyIllustrationNoData() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sl-empty-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--sl-ink-20)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="280" height="200" fill="url(#sl-empty-dots)" opacity="0.4" />
      <rect x="70" y="40" width="140" height="110" rx="8" fill="var(--sl-bg-raised)" stroke="var(--sl-ink-40)" strokeWidth="1.5" />
      <rect x="85" y="55" width="50" height="5" rx="2" fill="var(--sl-ink-40)" />
      <rect x="85" y="68" width="80" height="3" rx="1.5" fill="var(--sl-ink-20)" />
      <rect x="85" y="76" width="70" height="3" rx="1.5" fill="var(--sl-ink-20)" />
      <rect x="85" y="95" width="110" height="3" rx="1.5" fill="var(--sl-ink-20)" />
      <rect x="85" y="103" width="95" height="3" rx="1.5" fill="var(--sl-ink-20)" />
      <circle cx="210" cy="130" r="22" fill="var(--sl-brand-dim)" stroke="var(--sl-brand)" strokeWidth="1.5" />
      <path d="M210 122 L210 138 M202 130 L218 130" stroke="var(--sl-brand)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
