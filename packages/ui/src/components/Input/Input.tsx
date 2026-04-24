import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import {
  inputRoot,
  label as labelCls,
  required as requiredCls,
  field,
  help as helpCls,
  helpError as helpErrorCls,
  valid as validCls,
} from './Input.css';
import { cn } from '../../utils/cn';

type FieldVariants = NonNullable<RecipeVariants<typeof field>>;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    FieldVariants {
  label?: ReactNode;
  help?: ReactNode;
  /** Error message — when set, border turns critical and ARIA attributes update. */
  error?: ReactNode;
  /** Show 'Valid' affordance instead of an error. v1 pattern: inline checkmark, NO green border. */
  showValid?: boolean;
  required?: boolean;
}

/**
 * Text input following the v1 locked validation pattern:
 *   - Valid = no border change, inline checkmark + "Valid" text
 *   - Error = red border + error message
 *   - Never a green border
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      help,
      error,
      showValid,
      mono,
      required,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const autoId = id ?? rest.name;

    return (
      <div className={inputRoot}>
        {label && (
          <label className={labelCls} htmlFor={autoId}>
            {label}
            {required && <span className={requiredCls}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={autoId}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hasError || help ? `${autoId}-desc` : undefined
          }
          required={required}
          className={cn(field({ mono }), className)}
          {...rest}
        />
        {hasError ? (
          <span id={`${autoId}-desc`} className={helpErrorCls}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </span>
        ) : showValid ? (
          <span className={validCls}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Valid
          </span>
        ) : help ? (
          <span id={`${autoId}-desc`} className={helpCls}>
            {help}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
