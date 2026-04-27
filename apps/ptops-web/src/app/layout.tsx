import type { Metadata } from 'next';
import { ThemeProvider, FontLoader } from '@secureloop/ui';
import '@secureloop/design-system/css';

export const metadata: Metadata = {
  title: 'SecureLoop PTOps Suite',
  description: 'Penetration Testing Operations Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="coffee-dark">
          <FontLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
