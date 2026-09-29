// Builds two targets from src/:
//   dist/web/  a static site (open index.html or serve the folder)
//   dist/gas/  an Apps Script project for clasp (Code.gs + HtmlService files)
// Usage: node build.mjs [--ref v1.0.0] [--repo owner/name]
// The Apps Script target loads images from jsDelivr, pinned to --ref, because
// HtmlService serves only the HTML files in the project.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = dirname(fileURLToPath(import.meta.url));
const src = (p) => join(root, 'src', p);
const read = (p) => readFileSync(p, 'utf8');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, arr) => (v.startsWith('--') ? a.concat([[v.slice(2), arr[i + 1]]]) : a), []));
const pkg = JSON.parse(read(join(root, 'package.json')));
const repo = args.repo || pkg.moonscript.repo;
const ref = args.ref || 'v' + pkg.version;
const CDN = `https://cdn.jsdelivr.net/gh/${repo}@${ref}/assets/img/`;

// Evaluate the content file the same way the browser does, to render the
// static parts of the page from the same data.
const sandbox = { self: {} };
vm.runInNewContext(read(src('data/lessons.js')), sandbox);
const D = sandbox.self.MoonData;

// Empty an output folder without removing it (a shell may be sitting in it).
const clean = (d) => { mkdirSync(d, { recursive: true }); for (const f of readdirSync(d)) rmSync(join(d, f), { recursive: true, force: true }); };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((d, i) =>
  `<article class="day${i === 4 ? ' day--last' : ''}"><p class="day__name">${d} <span>Workday ${i + 1}</span></p>` +
  `<ol>${D.dailyChecklist.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>` +
  `<p class="day__foot">${i === 4 ? 'Same list, same order, by hand. Next week it starts again.' : 'Done by hand'}</p></article>`
).join('\n      ');

let html = read(src('index.html'))
  .replaceAll('<!--TRIPTYCH-->', read(src('partials/triptych.html')))
  .replace('<!--SCHEMATIC-->', read(src('partials/schematic.svg')))
  .replace('<!--DAYS-->', days);

// Content hashes on the static build's URLs, so a redeploy is never served stale.
const hash = (f) => createHash('sha1').update(readFileSync(src(f))).digest('hex').slice(0, 8);
const CSS = ['engine/scrollcraft.css', 'styles.css'];
const JS = ['engine/scrollcraft.js', 'roster.js', 'data/lessons.js', 'env.js', 'app.js'];

// ---------------------------------------------------------------- web
const web = join(root, 'dist', 'web');
clean(web);
for (const f of [...CSS, ...JS]) { mkdirSync(dirname(join(web, f)), { recursive: true }); cpSync(src(f), join(web, f)); }
cpSync(join(root, 'assets', 'img'), join(web, 'assets', 'img'), { recursive: true, filter: (p) => !p.endsWith('.txt') });
writeFileSync(join(web, 'index.html'), html
  .replace('<!--VIEWPORT-->', '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">')
  .replace('<!--STYLES-->', CSS.map((f) => `<link rel="stylesheet" href="${f}?v=${hash(f)}">`).join('\n'))
  .replace('<!--SCRIPTS-->', JS.map((f) => `<script src="${f}?v=${hash(f)}"></script>`).join('\n'))
  .replaceAll('{{ASSET}}', 'assets/img/'));

// ---------------------------------------------------------------- gas
const gas = join(root, 'dist', 'gas');
clean(gas);
const styles = CSS.map((f) => read(src(f))).join('\n');
const scripts = JS.map((f) => `/* ${f} */\n` + read(src(f))).join('\n;\n');
for (const [name, body] of [['styles', styles], ['scripts', scripts]]) {
  // HtmlService evaluates <? ?> scriptlets in included files only when they are
  // templates; we include them raw, but a stray "<?" would still be a trap.
  if (body.includes('<?')) throw new Error(`${name} contains "<?", which HtmlService would misread`);
  if (/<\/script/i.test(body) && name === 'scripts') throw new Error('scripts contain a closing script tag');
}
writeFileSync(join(gas, 'Styles.html'), `<style>\n${styles}\n</style>\n`);
writeFileSync(join(gas, 'Scripts.html'), `<script>\n${scripts}\n</script>\n`);
writeFileSync(join(gas, 'Index.html'), html
  .replace('<!--VIEWPORT-->', '')
  .replace('<!--STYLES-->', "<?!= include('Styles'); ?>")
  .replace('<!--SCRIPTS-->', "<?!= include('Scripts'); ?>")
  .replaceAll('{{ASSET}}', CDN));
cpSync(join(root, 'gas', 'Code.gs'), join(gas, 'Code.gs'));
cpSync(join(root, 'gas', 'appsscript.json'), join(gas, 'appsscript.json'));
if (existsSync(join(root, '.clasp.json'))) cpSync(join(root, '.clasp.json'), join(gas, '.clasp.json'));

const kb = (p) => (readFileSync(p).length / 1024).toFixed(0) + ' KB';
console.log(`web  -> dist/web  (index.html ${kb(join(web, 'index.html'))})`);
console.log(`gas  -> dist/gas  (Index ${kb(join(gas, 'Index.html'))}, Styles ${kb(join(gas, 'Styles.html'))}, Scripts ${kb(join(gas, 'Scripts.html'))})`);
console.log(`assets for Apps Script: ${CDN}`);
