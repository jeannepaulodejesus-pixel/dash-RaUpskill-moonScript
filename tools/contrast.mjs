// Contrast audit on the composited page, for text that sits on glass over a
// photograph (which the scroll-craft harness does not measure). At each scroll
// position it records every visible text element, hides all text, screenshots
// the bare frame, and compares each text colour with the worst pixel under it
// (the brightest for light text, the darkest for dark text, at the 95th
// percentile so one stray bokeh highlight does not decide it).
// Usage: node tools/contrast.mjs [steps=40] [width=1440] [height=900]
import { chromium } from 'playwright-core';

const [steps = '40', w = '1440', h = '900'] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
await page.goto(process.env.URL || 'http://localhost:4500/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);

const fails = new Map();
let checked = 0;
for (let i = 0; i < +steps; i++) {
  const y = Math.round(total * i / (+steps - 1));
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(500);
  const items = await page.evaluate(() => {
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode()) {
      const t = walker.currentNode;
      if (!t.textContent.trim()) continue;
      const el = t.parentElement;
      if (!el || seen.has(el)) continue;
      seen.add(el);
      if (el.closest('[aria-hidden="true"], .sheet, svg, noscript, [hidden], .vh')) continue;
      if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
      // effective opacity through ancestors
      let op = 1; for (let a = el; a; a = a.parentElement) op *= parseFloat(getComputedStyle(a).opacity);
      if (op < 0.9) continue;
      const range = document.createRange(); range.selectNodeContents(t);
      const r0 = range.getBoundingClientRect();
      // Clip to every scrolling or clipping ancestor: text scrolled out of a
      // code window is not on screen, whatever its bounding box says.
      const r = { left: r0.left, top: r0.top, right: r0.right, bottom: r0.bottom };
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        const o = getComputedStyle(a);
        if (o.overflowX !== 'visible' || o.overflowY !== 'visible') {
          const c = a.getBoundingClientRect();
          r.left = Math.max(r.left, c.left); r.top = Math.max(r.top, c.top);
          r.right = Math.min(r.right, c.right); r.bottom = Math.min(r.bottom, c.bottom);
        }
      }
      r.width = r.right - r.left; r.height = r.bottom - r.top;
      if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth) continue;
      const cs = getComputedStyle(el);
      const m = cs.color.match(/[\d.]+/g).map(Number);
      const size = parseFloat(cs.fontSize), weight = parseInt(cs.fontWeight, 10);
      out.push({
        text: t.textContent.trim().slice(0, 50), cls: el.className && typeof el.className === 'string' ? el.className : el.tagName.toLowerCase(),
        rgb: m.slice(0, 3), large: size >= 24 || (size >= 18.66 && weight >= 700),
        x: Math.max(0, r.left), y: Math.max(0, r.top), w: Math.min(innerWidth, r.right) - Math.max(0, r.left), h: Math.min(innerHeight, r.bottom) - Math.max(0, r.top)
      });
    }
    return out;
  });
  await page.addStyleTag({ content: '*{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;text-decoration-color:transparent!important}::marker{color:transparent!important}' }).then((h) => h.evaluate((s) => s.setAttribute('data-audit', '')));
  await page.waitForTimeout(120);
  const shot = (await page.screenshot()).toString('base64');
  await page.evaluate(() => document.querySelectorAll('style[data-audit]').forEach((s) => s.remove()));
  const res = await page.evaluate(async ({ shot, items }) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + shot; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const L = (r, gg, b) => 0.2126 * lin(r) + 0.7152 * lin(gg) + 0.0722 * lin(b);
    return items.map((it) => {
      const d = g.getImageData(Math.round(it.x), Math.round(it.y), Math.max(1, Math.round(it.w)), Math.max(1, Math.round(it.h))).data;
      const ls = []; for (let k = 0; k < d.length; k += 16) ls.push(L(d[k], d[k + 1], d[k + 2]));
      ls.sort((a, b) => a - b);
      const lt = L(...it.rgb), light = lt > 0.25;
      const bg = light ? ls[Math.floor(ls.length * 0.95)] : ls[Math.floor(ls.length * 0.05)];
      const ratio = (Math.max(lt, bg) + 0.05) / (Math.min(lt, bg) + 0.05);
      return { ...it, ratio: Math.round(ratio * 100) / 100 };
    });
  }, { shot, items });
  for (const r of res) {
    checked++;
    const need = r.large ? 3 : 4.5;
    if (r.ratio < need) {
      const k = r.cls + ' | ' + r.text;
      if (!fails.has(k) || fails.get(k).ratio > r.ratio) fails.set(k, { ratio: r.ratio, need, y });
    }
  }
}
await browser.close();
console.log(`checked ${checked} text runs at ${steps} positions`);
if (!fails.size) console.log('all text clears its contrast target');
for (const [k, v] of [...fails].sort((a, b) => a[1].ratio - b[1].ratio)) console.log(`${v.ratio.toFixed(2)} < ${v.need}  y=${v.y}  ${k}`);
