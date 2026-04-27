import type { Metadata } from 'next';
import { Providers } from './providers';
import '@secureloop/design-system/css';
import '@secureloop/ui/css';

export const metadata: Metadata = {
  title: 'SecureLoop PTOps Suite',
  description: 'Penetration Testing Operations Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
