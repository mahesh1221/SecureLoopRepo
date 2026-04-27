import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Wizard, type WizardStep } from './Wizard';

const steps: WizardStep[] = [
  { label: 'Org', content: <div>step-one-body</div> },
  { label: 'Frameworks', content: <div>step-two-body</div> },
  { label: 'Confirm', content: <div>step-three-body</div> },
];

function noop() {}

describe('Wizard (CR-1)', () => {
  it('renders only the current step body', () => {
    render(
      <Wizard
        open
        steps={steps}
        currentStep={1}
        title="Create tenant"
        onNext={noop}
        onBack={noop}
        onClose={noop}
      />,
    );
    expect(screen.queryByText('step-one-body')).not.toBeInTheDocument();
    expect(screen.getByText('step-two-body')).toBeInTheDocument();
    expect(screen.queryByText('step-three-body')).not.toBeInTheDocument();
  });

  it('does not render when open=false', () => {
    const { container } = render(
      <Wizard
        open={false}
        steps={steps}
        currentStep={0}
        title="t"
        onNext={noop}
        onBack={noop}
        onClose={noop}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('clicking the primary button calls onNext', async () => {
    const onNext = vi.fn();
    render(
      <Wizard
        open
        steps={steps}
        currentStep={0}
        title="t"
        onNext={onNext}
        onBack={noop}
        onClose={noop}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('on the last step the primary button label is "Done"', () => {
    render(
      <Wizard
        open
        steps={steps}
        currentStep={steps.length - 1}
        title="t"
        onNext={noop}
        onBack={noop}
        onClose={noop}
      />,
    );
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
  });

  it('Back button is hidden via data-hidden on step 0 (display:none, not visibility:hidden)', () => {
    render(
      <Wizard
        open
        steps={steps}
        currentStep={0}
        title="t"
        onNext={noop}
        onBack={noop}
        onClose={noop}
      />,
    );
    // Wizard portals into document.body, so query from there.
    const back = document.body.querySelector<HTMLButtonElement>('button[data-hidden]');
    expect(back).not.toBeNull();
    expect(back).toHaveTextContent('Back');
    expect(back).toHaveAttribute('data-hidden', 'true');
    expect(back).toHaveAttribute('aria-hidden', 'true');
    expect(back).toHaveAttribute('tabindex', '-1');
  });

  it('Back button is shown on later steps and clicking it calls onBack', async () => {
    const onBack = vi.fn();
    render(
      <Wizard
        open
        steps={steps}
        currentStep={1}
        title="t"
        onNext={noop}
        onBack={onBack}
        onClose={noop}
      />,
    );
    const back = screen.getByRole('button', { name: 'Back' });
    expect(back).toHaveAttribute('data-hidden', 'false');
    await userEvent.click(back);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('clicking the × close button calls onClose', async () => {
    const onClose = vi.fn();
    render(
      <Wizard
        open
        steps={steps}
        currentStep={0}
        title="t"
        onNext={noop}
        onBack={noop}
        onClose={onClose}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('pressing Escape calls onClose (keyboard a11y)', async () => {
    const onClose = vi.fn();
    render(
      <Wizard
        open
        steps={steps}
        currentStep={0}
        title="t"
        onNext={noop}
        onBack={noop}
        onClose={onClose}
      />,
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders no Cancel button anywhere (locked pattern: only × and primary)', () => {
    render(
      <Wizard
        open
        steps={steps}
        currentStep={0}
        title="t"
        onNext={noop}
        onBack={noop}
        onClose={noop}
      />,
    );
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
  });

  it('disables the primary action when nextDisabled is true', () => {
    render(
      <Wizard
        open
        steps={steps}
        currentStep={0}
        title="t"
        nextDisabled
        onNext={noop}
        onBack={noop}
        onClose={noop}
      />,
    );
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });
});
