import { useEffect, type RefObject } from 'react';

/**
 * Fires `handler` when the user clicks outside the given element,
 * or presses Escape. Used by modals, popovers, dropdowns.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  handler: () => void
): void {
  useEffect(() => {
    if (!enabled) return;

    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handler();
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEscape);
    };
  }, [ref, enabled, handler]);
}
