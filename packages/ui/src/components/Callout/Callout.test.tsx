import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Callout, type CalloutTone } from './Callout';

const Icon = () => <svg data-testid="icon" />;

describe('Callout (CR-2)', () => {
  it('renders icon and children content', () => {
    render(
      <Callout icon={<Icon />}>
        <strong>Heads up</strong>
        <p>Risk reverts on Nov 12</p>
      </Callout>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Risk reverts on Nov 12')).toBeInTheDocument();
  });

  it('exposes role="note" for assistive tech', () => {
    render(<Callout icon={<Icon />}>x</Callout>);
    expect(screen.getByRole('note')).toBeInTheDocument();
  });

  it('chip is aria-hidden so screen readers do not double-announce the icon', () => {
    const { container } = render(<Callout icon={<Icon />}>x</Callout>);
    const chip = container.querySelector('[aria-hidden="true"]');
    expect(chip).toBeInTheDocument();
    expect(chip).toContainElement(screen.getByTestId('icon'));
  });

  it.each<CalloutTone>(['brand', 'good', 'warn', 'crit'])(
    'renders tone="%s" with a distinct chip class',
    (tone) => {
      const { container } = render(
        <Callout icon={<Icon />} tone={tone}>
          x
        </Callout>,
      );
      const chip = container.querySelector('[aria-hidden="true"]') as HTMLElement;
      expect(chip).toBeInTheDocument();
      expect(chip.className).toMatch(/chip/i);
    },
  );

  it('different tones produce different chip classes (variant discrimination)', () => {
    const { container: a } = render(
      <Callout icon={<Icon />} tone="good">
        a
      </Callout>,
    );
    const { container: b } = render(
      <Callout icon={<Icon />} tone="crit">
        b
      </Callout>,
    );
    const chipA = a.querySelector('[aria-hidden="true"]')!.className;
    const chipB = b.querySelector('[aria-hidden="true"]')!.className;
    expect(chipA).not.toEqual(chipB);
  });

  it('defaults to tone="brand" when tone prop is omitted', () => {
    const { container: omitted } = render(<Callout icon={<Icon />}>x</Callout>);
    const { container: explicit } = render(
      <Callout icon={<Icon />} tone="brand">
        x
      </Callout>,
    );
    const a = omitted.querySelector('[aria-hidden="true"]')!.className;
    const b = explicit.querySelector('[aria-hidden="true"]')!.className;
    expect(a).toEqual(b);
  });
});
