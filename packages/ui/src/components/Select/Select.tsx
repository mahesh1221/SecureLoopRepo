import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import { root, field, caret } from './Select.css';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Array of simple options, or provide children <option> nodes */
  options?: SelectOption[];
  error?: boolean;
  children?: ReactNode;
}

/**
 * Native <select> wrapper with themed chevron.
 * Validation pattern: error only on `aria-invalid` — never green border.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error, className, children, ...rest }, ref) => (
    <div className={root}>
      <select
        ref={ref}
        aria-invalid={error ? 'true' : 'false'}
        className={cn(field, className)}
        {...rest}
      >
        {options
          ? options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))
          : children}
      </select>
      <svg
        className={caret}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  )
);
Select.displayName = 'Select';
