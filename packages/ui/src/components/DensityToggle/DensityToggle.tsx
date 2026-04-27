import { useCallback, useEffect, useState } from 'react';
import type { DensityMode } from '@secureloop/design-system';
import { pill, pillBtn, pillBtnOn } from './DensityToggle.css';
import { cn } from '../../utils/cn';

export interface DensityToggleProps {
  /** Initial density — defaults to comfortable */
  defaultDensity?: DensityMode;
  /** Apply attribute to document.body (default true) */
  applyToBody?: boolean;
  /** Persist user's choice to localStorage under this key */
  storageKey?: string;
  /** Controlled value override */
  value?: DensityMode;
  /** Controlled change handler */
  onChange?: (density: DensityMode) => void;
}

/**
 * Segmented-pill toggle for comfortable ↔ compact density.
 * Writes `data-density` to document.body so CSS tokens cascade.
 */
export function DensityToggle({
  defaultDensity = 'comfortable',
  applyToBody = true,
  storageKey,
  value,
  onChange,
}: DensityToggleProps) {
  const [internal, setInternal] = useState<DensityMode>(() => {
    if (value) return value;
    if (storageKey && typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(storageKey) as DensityMode | null;
      if (stored) return stored;
    }
    return defaultDensity;
  });

  const density = value ?? internal;

  useEffect(() => {
    if (!applyToBody || typeof document === 'undefined') return;
    document.body.setAttribute('data-density', density);
    if (storageKey) window.localStorage.setItem(storageKey, density);
  }, [density, applyToBody, storageKey]);

  const update = useCallback(
    (next: DensityMode) => {
      if (!value) setInternal(next);
      onChange?.(next);
    },
    [value, onChange],
  );

  return (
    <div className={pill} role="radiogroup" aria-label="Density">
      <button
        type="button"
        role="radio"
        aria-checked={density === 'comfortable'}
        className={cn(pillBtn, density === 'comfortable' && pillBtnOn)}
        onClick={() => update('comfortable')}
      >
        Comfortable
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={density === 'compact'}
        className={cn(pillBtn, density === 'compact' && pillBtnOn)}
        onClick={() => update('compact')}
      >
        Compact
      </button>
    </div>
  );
}
