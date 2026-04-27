import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const PAGES = [
  { name: 'TenantList', path: '/admin/tenants' },
  { name: 'TenantWizard', path: '/admin/tenants/new' },
  { name: 'FrameworkConfig', path: '/admin/frameworks' },
  { name: 'PlatformDefaults', path: '/admin/defaults' },
  { name: 'GlobalIntegrations', path: '/admin/integrations' },
  { name: 'PlatformHealth', path: '/admin/health' },
];

const browser = await chromium.launch();

for (const p of PAGES) {
  const page = await browser.newPage();
  const errors = [];
  const warnings = [];

  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
    if (m.type() === 'warning') warnings.push(m.text());
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);

  console.log(`\n=== ${p.name} (${p.path}) ===`);
  if (errors.length === 0 && warnings.length === 0) {
    console.log('  ✓ No errors or warnings');
  } else {
    errors.forEach((e) => console.log('  ERROR:', e.slice(0, 300)));
    warnings.forEach((w) => console.log('  WARN:', w.slice(0, 200)));
  }

  await page.close();
}

await browser.close();
