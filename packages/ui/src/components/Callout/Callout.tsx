import { type ReactNode } from 'react';
import { container, chip as chipCls, content } from './Callout.css';

export type CalloutTone = 'brand' | 'good' | 'warn' | 'crit';

export interface CalloutProps {
  /** SVG icon node rendered inside the 30px circle chip */
  icon: ReactNode;
  /** Chip colour variant. Defaults to "brand". */
  tone?: CalloutTone;
  children?: ReactNode;
}

/**
 * Callout banner: 30px circle chip + brand-dim tint + line-strong border.
 * v1 locked pattern — padding 16/24, align-items center, no border on valid.
 */
export function Callout({ icon, tone = 'brand', children }: CalloutProps) {
  return (
    <div className={container} role="note">
      <div className={chipCls[tone]} aria-hidden="true">
        {icon}
      </div>
      <div className={content}>{children}</div>
    </div>
  );
}

Callout.displayName = 'Callout';
