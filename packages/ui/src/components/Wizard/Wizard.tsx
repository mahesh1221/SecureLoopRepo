import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  backdrop,
  dialog,
  header as headerCls,
  headerTitle,
  closeBtn,
  stepDotsRow,
  dot,
  body as bodyCls,
  footer as footerCls,
  footerSpacer,
  backBtn,
} from './Wizard.css';

export interface WizardStep {
  label: string;
  content: ReactNode;
}

export interface WizardProps {
  open: boolean;
  steps: WizardStep[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
  title: string;
  /** Label for the primary action. Defaults to "Next"; on last step defaults to "Done". */
  nextLabel?: string;
  /** Disable the primary action button */
  nextDisabled?: boolean;
}

export function Wizard({
  open,
  steps,
  currentStep,
  onNext,
  onBack,
  onClose,
  title,
  nextLabel,
  nextDisabled = false,
}: WizardProps) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const primaryLabel = nextLabel ?? (isLast ? 'Done' : 'Next');

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

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
    <div className={backdrop} role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={dialog}
      >
        {/* Header */}
        <header className={headerCls}>
          <h2 className={headerTitle}>{title}</h2>
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
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        {/* Step dots */}
        <div className={stepDotsRow} role="list" aria-label="Steps">
          {steps.map((step, i) => {
            const variant =
              i === currentStep ? 'active' : i < currentStep ? 'done' : 'upcoming';
            return (
              <div
                key={step.label}
                role="listitem"
                className={dot[variant]}
                aria-label={`Step ${i + 1}: ${step.label}${i === currentStep ? ' (current)' : i < currentStep ? ' (completed)' : ''}`}
              />
            );
          })}
        </div>

        {/* Body */}
        <div className={bodyCls}>
          {steps[currentStep]?.content}
        </div>

        {/* Footer — Back (hidden on step 0) + primary action. No Cancel. */}
        <footer className={footerCls}>
          <button
            type="button"
            className={backBtn}
            onClick={onBack}
            data-hidden={isFirst ? 'true' : 'false'}
            aria-hidden={isFirst}
            tabIndex={isFirst ? -1 : undefined}
          >
            Back
          </button>
          <div className={footerSpacer} />
          <PrimaryButton onClick={onNext} disabled={nextDisabled}>
            {primaryLabel}
          </PrimaryButton>
        </footer>
      </div>
    </div>,
    document.body
  );
}

Wizard.displayName = 'Wizard';

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '36px',
        padding: '0 16px',
        borderRadius: '6px',
        border: 'none',
        background: 'var(--sl-brand)',
        color: 'var(--sl-brand-ink)',
        fontSize: '13px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  );
}
