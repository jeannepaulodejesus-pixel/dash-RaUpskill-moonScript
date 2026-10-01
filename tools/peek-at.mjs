// Screenshots at explicit scroll positions given as "selector@progress" or px.
// Usage: node tools/peek-at.mjs <outdir> <width> <height> <spec...>
//   spec: "#begin@0.5" (progress through a pinned act) or "1234" (absolute y)
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
const [out, w, h, ...specs] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, reducedMotion: process.env.REDUCED ? 'reduce' : 'no-preference' });
const page = await ctx.newPage();
await page.goto(process.env.URL || 'http://localhost:4500/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
let i = 0;
for (const s of specs) {
  const y = await page.evaluate((s) => {
    if (/^\d+$/.test(s)) return +s;
    const [sel, p] = s.split('@'); const el = document.querySelector(sel);
    const top = el.getBoundingClientRect().top + scrollY;
    return Math.round(top + parseFloat(p || 0) * Math.max(0, el.offsetHeight - innerHeight));
  }, s);
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}/${String(i++).padStart(2, '0')}.png` });
}
await browser.close();
