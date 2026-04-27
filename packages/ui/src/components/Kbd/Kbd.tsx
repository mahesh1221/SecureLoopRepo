import { forwardRef, Fragment, type HTMLAttributes } from 'react';
import { kbd, group, plus } from './Kbd.css';
import { cn } from '../../utils/cn';

export interface KbdProps extends HTMLAttributes<HTMLSpanElement> {
  /** Single key or array of keys to be joined with "+" */
  keys?: string | string[];
  children?: React.ReactNode;
}

/**
 * Keyboard-shortcut chip. Renders one or more keys joined with "+" separators.
 *
 * @example
 *   <Kbd>⌘</Kbd>
 *   <Kbd keys={['⌘', 'K']} />
 */
export const Kbd = forwardRef<HTMLSpanElement, KbdProps>(
  ({ keys, children, className, ...rest }, ref) => {
    if (keys === undefined) {
      return (
        <span ref={ref} className={cn(kbd, className)} {...rest}>
          {children}
        </span>
      );
    }

    const list = Array.isArray(keys) ? keys : [keys];
    if (list.length === 1) {
      return (
        <span ref={ref} className={cn(kbd, className)} {...rest}>
          {list[0]}
        </span>
      );
    }

    return (
      <span ref={ref} className={cn(group, className)} {...rest}>
        {list.map((k, i) => (
          <Fragment key={`${k}-${i}`}>
            {i > 0 && <span className={plus}>+</span>}
            <span className={kbd}>{k}</span>
          </Fragment>
        ))}
      </span>
    );
  },
);
Kbd.displayName = 'Kbd';
