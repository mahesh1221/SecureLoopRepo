import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:3000/admin/frameworks';
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(e.message));

try {
  await page.goto(url, { waitUntil: 'commit', timeout: 10000 });
  await page.waitForTimeout(3000);
} catch (e) {
  errors.push('goto: ' + e.message.split('\n')[0]);
}

console.log('Final URL:', page.url());
console.log('Console errors:', errors.slice(0, 8).join('\n') || '(none)');

await page.screenshot({ path: 'scripts/screenshots/debug.png', fullPage: true });
await browser.close();
