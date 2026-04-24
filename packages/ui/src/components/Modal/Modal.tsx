import {
  forwardRef,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import {
  backdrop,
  dialog,
  header as headerCls,
  headerTitle,
  closeBtn,
  body as bodyCls,
  footer as footerCls,
  footerSpacer,
} from './Modal.css';
import { cn } from '../../utils/cn';

type DialogVariants = NonNullable<RecipeVariants<typeof dialog>>;

export interface ModalProps extends DialogVariants {
  open: boolean;
  onClose: () => void;
  /** Title text for header */
  title?: ReactNode;
  /** Hide header entirely (useful for confirmations) */
  hideHeader?: boolean;
  /** Slot for footer content (buttons etc.) */
  footer?: ReactNode;
  /** Optional explicit close on backdrop click (default true) */
  closeOnBackdrop?: boolean;
  /** Children render as modal body */
  children?: ReactNode;
  className?: string;
}

/**
 * Modal overlay. Follows v1 locked patterns:
 *  - 880px forms / 900px wizards
 *  - × in top-right header is the SOLE close affordance
 *  - Footer = primary action(s), no Cancel in wizard footer
 *  - rgba(0,0,0,.52) + blur(8px) backdrop
 *  - riseIn 320ms cubic-bezier(.2,0,0,1)
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      kind,
      title,
      hideHeader,
      footer,
      closeOnBackdrop = true,
      children,
      className,
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Body scroll lock while open
    useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }, [open]);

    // Escape to close
    useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open || typeof document === 'undefined') return null;

    return createPortal(
      <div
        className={backdrop}
        onClick={
          closeOnBackdrop
            ? (e) => {
                if (e.target === e.currentTarget) onClose();
              }
            : undefined
        }
      >
        <div
          ref={(node) => {
            dialogRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          role="dialog"
          aria-modal="true"
          className={cn(dialog({ kind }), className)}
        >
          {!hideHeader && (
            <header className={headerCls}>
              {title && <h2 className={headerTitle}>{title}</h2>}
              <button
                type="button"
                className={closeBtn}
                onClick={onClose}
                aria-label="Close"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>
          )}
          <div className={bodyCls}>{children}</div>
          {footer && <footer className={footerCls}>{footer}</footer>}
        </div>
      </div>,
      document.body
    );
  }
);
Modal.displayName = 'Modal';

export const ModalFooterSpacer = () => <div className={footerSpacer} />;
