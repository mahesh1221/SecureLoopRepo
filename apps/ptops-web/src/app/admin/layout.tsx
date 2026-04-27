'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Rail, RailItem, RailSpacer, Topbar, TopbarSpacer, TopbarRight, Main } from '@secureloop/ui';
import { ThemePicker } from '@secureloop/ui';
import * as styles from './layout.css';

const NAV = [
  {
    href: '/admin/tenants',
    label: 'Tenants',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    href: '/admin/frameworks',
    label: 'Frameworks',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    href: '/admin/defaults',
    label: 'Platform Defaults',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
  {
    href: '/admin/integrations',
    label: 'Integrations',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
  {
    href: '/admin/health',
    label: 'Platform Health',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <Rail brandGlyph="SL">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
            <RailItem
              active={pathname.startsWith(item.href)}
              label={item.label}
            >
              {item.icon}
            </RailItem>
          </Link>
        ))}
        <RailSpacer />
        <RailItem label="Settings">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
          </svg>
        </RailItem>
      </Rail>

      <Topbar>
        <span className={styles.topbarProduct}>PTOps Suite</span>
        <span className={styles.topbarDivider} />
        <span className={styles.topbarSection}>Platform Admin</span>
        <TopbarSpacer />
        <TopbarRight>
          <ThemePicker />
        </TopbarRight>
      </Topbar>

      <Main>{children}</Main>
    </div>
  );
}
