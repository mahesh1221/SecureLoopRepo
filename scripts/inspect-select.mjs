import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });

await page.goto('http://localhost:3000/admin/tenants/new', {
  waitUntil: 'networkidle',
  timeout: 15000,
});
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  // Find caret SVGs via their polyline content
  const results = [];

  document.querySelectorAll('select').forEach((el, i) => {
    const cs = getComputedStyle(el);
    results.push({
      type: 'select',
      index: i,
      classAttr: el.getAttribute('class'),
      height: cs.height,
      width: cs.width,
      appearance: cs.appearance || cs.webkitAppearance,
    });
  });

  document.querySelectorAll('svg').forEach((el, i) => {
    if (i > 8) return;
    const cs = getComputedStyle(el);
    results.push({
      type: 'svg',
      index: i,
      classAttr: el.getAttribute('class'),
      width: cs.width,
      height: cs.height,
    });
  });

  // Search all stylesheets for Select_caret or Select_field
  const found = [];
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      Array.from(sheet.cssRules || []).forEach((rule) => {
        const text = rule.cssText || '';
        if (text.includes('Select_') || text.includes('select') || text.includes('caret')) {
          found.push(text.slice(0, 200));
        }
      });
    } catch {}
  });

  return { elements: results, selectRules: found };
});

console.log('ELEMENTS:');
info.elements.forEach((e) => console.log(JSON.stringify(e)));
console.log('\nSELECT-RELATED CSS RULES:');
info.selectRules.forEach((r) => console.log(r));
console.log('\nTotal Select CSS rules found:', info.selectRules.length);

await browser.close();
