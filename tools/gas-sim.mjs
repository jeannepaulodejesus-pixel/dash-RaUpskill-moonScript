// Offline check of the Apps Script target, for when the deployed /exec URL is
// behind a Google sign-in. It reproduces the parts of HtmlService that matter:
//   - evaluates dist/gas/Index.html's include() scriptlets like the template engine
//   - serves the page from a different origin, inside an <iframe sandbox> with the
//     flags Google uses for IFRAME mode
//   - provides google.script.url / google.script.history, so the page takes its
//     Apps Script code path (env.js), not the static one
// Then it drives the page with Playwright and reports what it saw.
// Usage: node tools/gas-sim.mjs [--width 1440 --height 900] [--hash read]
import http from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const gas = join(root, 'dist', 'gas');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const W = +arg('width', 1440), H = +arg('height', 900), HASH = arg('hash', '');
const out = join(root, 'lab', 'gas-sim'); mkdirSync(out, { recursive: true });

const inc = (n) => readFileSync(join(gas, n + '.html'), 'utf8');
let page = inc('Index').replace(/<\?!=\s*include\('(\w+)'\);?\s*\?>/g, (_, n) => inc(n));
if (page.includes('<?')) throw new Error('unevaluated scriptlet left in Index.html');
// What doGet adds with addMetaTag, and a stand-in for the google.script client API.
const shim = `<meta name="viewport" content="width=device-width, initial-scale=1"><script>
  window.__gasCalls = [];
  window.google = { script: {
    url: { getLocation: function (cb) { setTimeout(function () { cb({ hash: ${JSON.stringify(HASH)}, parameter: {}, parameters: {} }); }, 30); } },
    history: {
      push: function (s, p, h) { __gasCalls.push(['push', h]); },
      replace: function (s, p, h) { __gasCalls.push(['replace', h]); },
      setChangeHandler: function (fn) { window.__gasChange = fn; }
    }
  } };
</script>`;
page = page.replace('<head>', '<head>' + shim);

const host = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>html,body{margin:0;height:100%;background:#000}iframe{border:0;width:100%;height:100%;display:block}</style></head>
<body><iframe id="app" src="http://127.0.0.1:4611/" sandbox="allow-downloads allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe></body></html>`;

const s1 = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end(host); }).listen(4610);
const s2 = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end(page); }).listen(4611);

const require = createRequire(join(root, 'package.json'));
const { chromium } = require('playwright-core');
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome'].find((p) => { try { readFileSync(p); return true; } catch { return false; } });
const browser = await chromium.launch({ executablePath: exe, headless: true });
const ctx = await browser.newContext({ viewport: { width: W, height: H } });
const p = await ctx.newPage();
const errors = [], failed = [];
p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
p.on('requestfailed', (r) => failed.push(r.url()));
await p.goto('http://127.0.0.1:4610/', { waitUntil: 'networkidle' });
const f = p.frames().find((x) => x.url().startsWith('http://127.0.0.1:4611'));
await f.waitForFunction(() => document.documentElement.classList.contains('sc-ready'));
await p.waitForTimeout(600);

const report = await f.evaluate(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const r = { platform: document.documentElement.getAttribute('data-platform'), initialY: Math.round(scrollY) };
  r.imagesOk = [...document.images].filter((i) => i.complete && i.naturalWidth > 0).length + '/' + document.images.length;
  r.fonts = [...document.fonts].filter((x) => x.status === 'loaded').map((x) => x.family).filter((v, i, a) => a.indexOf(v) === i);
  r.viewportMeta = !!document.querySelector('meta[name=viewport]');
  document.querySelector('[data-ms-link="verify"]').click(); await wait(900);
  r.afterRailClickY = Math.round(scrollY); r.verifyTop = Math.round(document.getElementById('verify').getBoundingClientRect().top + scrollY);
  r.historyCalls = window.__gasCalls.slice();
  // A lesson must advance with scroll inside the iframe.
  const read = document.querySelector('[data-ms-lesson="read"]');
  const top = read.getBoundingClientRect().top + scrollY, travel = read.offsetHeight - innerHeight;
  scrollTo(0, top + travel * 0.5); await wait(400);
  r.readMid = document.querySelector('[data-ms-lesson="read"] [data-ms-title]').textContent;
  r.stickyTop = Math.round(read.querySelector('[data-sc-stage]').getBoundingClientRect().top);
  const lab = document.querySelector('[data-ms-lab]'); lab.querySelector('[data-lab-run]').click();
  r.labError = /getDataRange/.test(lab.innerText);
  return r;
});
if (HASH) report.deepLinked = await f.evaluate(() => Math.round(scrollY));
await p.screenshot({ path: join(out, `gas-${W}.png`) });
report.consoleErrors = errors; report.failedRequests = failed;
console.log(JSON.stringify(report, null, 2));
await browser.close(); s1.close(); s2.close();
