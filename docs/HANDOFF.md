# Handoff log

Append-only. Newest entry at the bottom. One entry per working session: what changed, what was verified, what is open.

---

## 2026-09-30 · Claude Code · v1.0.0 build and agent setup

**Changed**

- Built MoonScript Day 1 (commits `810a4fc`, `7e23c7b`) and tagged `v1.0.0`.
- Deployed the Apps Script web app (deployment `@2`).
- Added agent collaboration files:
  - `AGENTS.md` and `CLAUDE.md`
  - `.editorconfig`
  - this log
  - in-repo `tools/serve.mjs`; `npm run serve` no longer depends on Claude's plugin cache
  - `tools/shoot.mjs`, a wrapper for the external scroll-craft harness

**Verified**

- `npm test`: 14/14 pass.
- scroll-craft harness at desktop, 390×844 and reduced motion: no dead scroll, contrast ≥ 4.5:1, no console errors or failed requests.
- `check:gas`: Apps Script code path, 7/7 CDN images, fonts, `google.script.history`, pinning, deep links.
- Presenter mode steps through all 24 slides plus the Break.

**Open**

- The live `/exec` URL is not yet opened in a signed-in browser.
- Not yet tested on a real phone.
- Slides 16 and 20 need real cropped screenshots of the sandbox editor. They show a labelled schematic until then.
- Slide 4 turn: the mapping table replaces the checklist and code pair rather than joining it. It could be stronger.
- `assets/img/far.jpg` and `far.webp` had uncommitted modifications in the working tree at the time of this entry (larger files, source unknown). They were left uncommitted for the user to confirm. If they are intended, follow the image procedure in `AGENTS.md` (commit, new tag, build with `--ref`, deploy).
