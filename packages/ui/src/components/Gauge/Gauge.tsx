import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { wrap, svgBox, svg, track, progress, center, valueText, labelText } from './Gauge.css';
import { cn } from '../../utils/cn';

export interface GaugeProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value */
  value: number;
  /** Minimum value (default 0) */
  min?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Label displayed beneath the value */
  label?: string;
  /** Override stroke color (falls back to zone-based color) */
  color?: string;
  /** Optional extra node rendered at the center (e.g. delta chip) */
  children?: ReactNode;
  /** RAG zones for color selection — defaults to 0-39 red, 40-69 amber, 70-100 green */
  zones?: {
    red: [number, number];
    amber: [number, number];
    green: [number, number];
  };
}

const RADIUS = 82;
const CIRC = 2 * Math.PI * RADIUS;

/**
 * Circular gauge used by risk-posture and cyber-posture dashboards.
 * Accepts value 0-100 (or custom min/max). Stroke color auto-selects
 * from RAG zones unless `color` prop is provided.
 */
export const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      label,
      color,
      children,
      zones = { red: [0, 39], amber: [40, 69], green: [70, 100] },
      className,
      ...rest
    },
    ref
  ) => {
    const clamped = Math.max(min, Math.min(max, value));
    const pct = (clamped - min) / (max - min);
    const dashOffset = CIRC * (1 - pct);

    // Auto zone color
    let strokeColor = color;
    if (!strokeColor) {
      if (clamped <= zones.red[1]) strokeColor = 'var(--sl-sev-critical)';
      else if (clamped <= zones.amber[1]) strokeColor = 'var(--sl-sev-high)';
      else strokeColor = 'var(--sl-status-good)';
    }

    return (
      <div
        ref={ref}
        className={cn(wrap, className)}
        role="img"
        aria-label={`${label ?? 'Gauge'}: ${value} out of ${max}`}
        {...rest}
      >
        <div className={svgBox}>
          <svg className={svg} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle className={track} cx="100" cy="100" r={RADIUS} />
            <circle
              className={progress}
              cx="100"
              cy="100"
              r={RADIUS}
              stroke={strokeColor}
              strokeDasharray={CIRC}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className={center}>
            <div className={valueText}>{clamped}</div>
            {label && <div className={labelText}>{label}</div>}
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Gauge.displayName = 'Gauge';
