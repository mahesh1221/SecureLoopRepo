'use client';

import { ThemeProvider, FontLoader } from '@secureloop/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="coffee-dark">
      <FontLoader />
      {children}
    </ThemeProvider>
  );
}
