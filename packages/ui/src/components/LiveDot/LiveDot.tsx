import { forwardRef, type HTMLAttributes } from 'react';
import { pill, dot } from './LiveDot.css';
import { cn } from '../../utils/cn';

export interface LiveDotProps extends HTMLAttributes<HTMLSpanElement> {
  /** Label text — defaults to "LIVE" */
  label?: string;
  /** Interval description, e.g. "refresh 10s" */
  interval?: string;
}

/**
 * Real-time indicator pill with pulsing dot.
 * Canonical pattern from IE-03 and CISO-01.
 */
export const LiveDot = forwardRef<HTMLSpanElement, LiveDotProps>(
  ({ label = 'LIVE', interval, className, ...rest }, ref) => (
    <span ref={ref} className={cn(pill, className)} {...rest}>
      <span className={dot} />
      {label}
      {interval ? ` · ${interval}` : null}
    </span>
  ),
);
LiveDot.displayName = 'LiveDot';
