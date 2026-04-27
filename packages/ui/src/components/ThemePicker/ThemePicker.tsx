import { useRef, useState } from 'react';
import {
  themeFamilies,
  themeModes,
  type ThemeFamily,
  type ThemeMode,
} from '@secureloop/design-system';
import { useTheme } from '../ThemeProvider';
import { useClickOutside } from '../../utils/useClickOutside';
import {
  wrap,
  toggle,
  swatches,
  sw,
  popover,
  section,
  sectionLabel,
  families,
  card,
  preview,
  cardName,
  cardDesc,
  modes,
  mode as modeCls,
} from './ThemePicker.css';

const familyLabels: Record<ThemeFamily, { name: string; desc: string }> = {
  coffee: { name: 'Coffee', desc: 'Warm · Investigation' },
  blue: { name: 'Blue', desc: 'Cool · Enterprise' },
};

const familySwatches: Record<ThemeFamily, [string, string, string]> = {
  coffee: ['#1A0F08', '#F3EEE2', '#6F4E37'],
  blue: ['#0F1E35', '#E8F4FD', '#1E5A8A'],
};

const modeLabels: Record<ThemeMode, string> = {
  dark: 'Dark',
  light: 'Light',
};

function ModeIcon({ mode }: { mode: ThemeMode }) {
  if (mode === 'dark') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export interface ThemePickerProps {
  /** Optional className for the root wrapper */
  className?: string;
}

/**
 * Theme picker popover — v1 locked UX pattern.
 * Single topbar button → popover with 2 family cards + 2 mode buttons.
 * Click outside or Escape closes.
 *
 * Must be rendered inside a <ThemeProvider>.
 */
export function ThemePicker({ className }: ThemePickerProps) {
  const { family, mode, setFamily, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, open, () => setOpen(false));

  const [s1, s2] = familySwatches[family];
  const label = `${familyLabels[family].name} · ${modeLabels[mode]}`;

  return (
    <div ref={ref} className={className ? `${wrap} ${className}` : wrap}>
      <button
        type="button"
        className={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={swatches}>
          <span className={sw} style={{ background: s1 }} />
          <span className={sw} style={{ background: s2 }} />
        </span>
        <span>{label}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className={popover} role="dialog" aria-label="Theme picker">
          <div className={section}>
            <div className={sectionLabel}>Palette family</div>
            <div className={families}>
              {themeFamilies.map((f) => {
                const [c1, c2, c3] = familySwatches[f];
                const { name, desc } = familyLabels[f];
                return (
                  <button
                    key={f}
                    type="button"
                    className={card}
                    data-active={f === family}
                    onClick={() => setFamily(f)}
                  >
                    <div className={preview}>
                      <span style={{ background: c1 }} />
                      <span style={{ background: c2 }} />
                      <span style={{ background: c3 }} />
                    </div>
                    <div className={cardName}>{name}</div>
                    <div className={cardDesc}>{desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={section}>
            <div className={sectionLabel}>Appearance</div>
            <div className={modes}>
              {themeModes.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={modeCls}
                  data-active={m === mode}
                  onClick={() => setMode(m)}
                >
                  <ModeIcon mode={m} />
                  {modeLabels[m]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
