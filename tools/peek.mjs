// Quick visual peek: screenshots at fractions of total scroll height.
// Usage: node tools/peek.mjs <outdir> [width height] [count]
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
const [out = 'lab/peek', w = '1440', h = '900', n = '24'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
await page.goto(process.env.URL || 'http://localhost:4500/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
for (let i = 0; i < +n; i++) {
  const y = Math.round(total * i / (+n - 1));
  await page.evaluate(y => window.scrollTo(0, y), y);
  await page.waitForTimeout(450);
  await page.screenshot({ path: `${out}/${String(i).padStart(2, '0')}.png` });
}
await browser.close();
console.log('total', total);
