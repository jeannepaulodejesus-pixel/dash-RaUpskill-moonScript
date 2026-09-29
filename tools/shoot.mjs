// Runs the scroll-craft verification harness (contact sheets, dead-scroll and
// contrast checks) against a running server. The harness belongs to the
// scroll-craft skill and is not vendored here; point SCROLLCRAFT_SHOOT at it
// if it lives somewhere other than the default below.
// Usage: node tools/shoot.mjs [harness args, e.g. --out lab/shots --steps 3]
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';

const harness = process.env.SCROLLCRAFT_SHOOT ||
  join(homedir(), '.claude/plugins/cache/nateherk/nateherk-design/0.3.0/skills/scroll-craft/scripts/shoot.mjs');

if (!existsSync(harness)) {
  console.error(`scroll-craft harness not found at:\n  ${harness}\nSet SCROLLCRAFT_SHOOT to its shoot.mjs, or skip this check (npm test and npm run check:gas do not need it).`);
  process.exit(2);
}
const args = process.argv.slice(2);
if (!args.includes('--url')) args.unshift('--url', 'http://localhost:4500');
const r = spawnSync(process.execPath, [harness, ...args], { stdio: 'inherit' });
process.exit(r.status ?? 1);
