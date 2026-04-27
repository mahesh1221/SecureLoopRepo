'use client';

import { ThemeProvider, FontLoader } from '@secureloop/ui';
import { AuthProvider } from '../lib/auth';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="coffee-dark">
      <FontLoader />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
