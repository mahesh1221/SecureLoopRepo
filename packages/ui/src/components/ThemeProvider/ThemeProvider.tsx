import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_THEME,
  composeTheme,
  decomposeTheme,
  type ThemeFamily,
  type ThemeMode,
  type ThemeName,
} from '@secureloop/design-system';

export interface ThemeContextValue {
  theme: ThemeName;
  family: ThemeFamily;
  mode: ThemeMode;
  setTheme: (name: ThemeName) => void;
  setFamily: (family: ThemeFamily) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  /** Initial theme — defaults to coffee-dark */
  defaultTheme?: ThemeName;
  /** Apply theme class to document.body (default true) */
  applyToBody?: boolean;
  /** Persist user's choice to localStorage under this key */
  storageKey?: string;
  children: ReactNode;
}

/**
 * Provides theme state to the tree. Applies `t-{family}-{mode}` class
 * to document.body by default so CSS variables cascade everywhere.
 */
export function ThemeProvider({
  defaultTheme = DEFAULT_THEME,
  applyToBody = true,
  storageKey,
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (storageKey && typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(storageKey) as ThemeName | null;
      if (stored) return stored;
    }
    return defaultTheme;
  });

  const { family, mode } = decomposeTheme(theme);

  // Apply to body and persist
  useEffect(() => {
    if (!applyToBody || typeof document === 'undefined') return;
    const body = document.body;
    body.classList.remove(
      't-coffee-dark',
      't-coffee-light',
      't-blue-dark',
      't-blue-light'
    );
    body.classList.add(`t-${theme}`);

    if (storageKey) {
      window.localStorage.setItem(storageKey, theme);
    }
  }, [theme, applyToBody, storageKey]);

  const setTheme = useCallback((name: ThemeName) => setThemeState(name), []);

  const setFamily = useCallback(
    (f: ThemeFamily) =>
      setThemeState((prev) => {
        const { mode } = decomposeTheme(prev);
        return composeTheme(f, mode);
      }),
    []
  );

  const setMode = useCallback(
    (m: ThemeMode) =>
      setThemeState((prev) => {
        const { family } = decomposeTheme(prev);
        return composeTheme(family, m);
      }),
    []
  );

  const toggleMode = useCallback(
    () =>
      setThemeState((prev) => {
        const { family, mode } = decomposeTheme(prev);
        return composeTheme(family, mode === 'dark' ? 'light' : 'dark');
      }),
    []
  );

  return (
    <ThemeContext.Provider
      value={{ theme, family, mode, setTheme, setFamily, setMode, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return ctx;
}
