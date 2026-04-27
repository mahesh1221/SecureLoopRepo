import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'http://localhost:3000';
const OUT = 'scripts/screenshots';
mkdirSync(OUT, { recursive: true });

const SCREENS = [
  { name: 'ADMIN-01-2_TenantList',         path: '/admin/tenants',       waitFor: '.sl-num, [data-selected]' },
  { name: 'ADMIN-01-1_TenantCreationWizard', path: '/admin/tenants/new',  waitFor: '[role="dialog"]' },
  { name: 'ADMIN-02_FrameworkConfig',       path: '/admin/frameworks',    waitFor: null },
  { name: 'ADMIN-03_PlatformDefaults',      path: '/admin/defaults',      waitFor: null },
  { name: 'ADMIN-04_GlobalIntegrations',    path: '/admin/integrations',  waitFor: null },
  { name: 'ADMIN-06_PlatformHealth',        path: '/admin/health',        waitFor: null },
];

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });

for (const screen of SCREENS) {
  console.log(`Capturing ${screen.name}...`);
  try {
    await page.goto(`${BASE}${screen.path}`, { waitUntil: 'commit', timeout: 15000 });
    await page.waitForTimeout(1200);
    if (screen.waitFor) {
      await page.waitForSelector(screen.waitFor, { timeout: 5000 }).catch(() => {});
    }
    await page.waitForTimeout(500);
    const file = join(OUT, `${screen.name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`  → ${file}`);
  } catch (err) {
    console.log(`  ✗ FAILED: ${err.message.split('\n')[0]}`);
  }
}

await browser.close();
console.log('Done.');
