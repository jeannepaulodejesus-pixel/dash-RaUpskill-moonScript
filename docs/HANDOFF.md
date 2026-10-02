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


---

## 2026-09-30 · Codex · Desk hero foreground

**Changed**

- Replaced `assets/img/desk.jpg` and `assets/img/desk.webp` on `main`, following the user's explicit branch instruction.
- Generated one editorial walnut desk photograph using the built-in imagegen tool. Used `desk.jpg` as the camera reference and the current `far.webp` as the moonlight/palette reference.
- The generated source is 1675 × 939. Exported both formats at 2200 × 1232 using Lanczos resizing with a minimal centered aspect crop. JPEG: 567,619 bytes; WebP: 221,112 bytes.
- Preserved the existing asset names consumed by the hero. Existing window-image and `.vscode/` changes were retained.

**Verified**

- Both exports decode successfully and have the requested 2200 × 1232 dimensions.
- `npm test`: 14/14 pass. `npm run build`: both targets pass.
- `npm run check:gas`: Apps Script platform, 7/7 images, no console errors or failed requests. This simulation loads release-tagged CDN assets, not the regenerated local desk.
- `npm run shots`: 70 captures, no dead scroll, all measured media cues at least 4.5:1. Inspected `lab/shots/00.png`: the separate procedure card remains on the clear tabletop and lighting matches the upper-right moon.

**Open**

- Files are working-tree changes on `main`. Apps Script still references `v1.0.0`; the new image needs a future authorized commit, release tag, tagged build, push, and deployment to reach that target.

**Final generation prompt (built-in imagegen)**

```text
Use case: photorealistic-natural
Asset type: MoonScript website hero foreground, one photograph exported as desk.jpg and desk.webp.
Primary request: Recreate the attached desk camera angle as a close editorial photograph of a finely crafted dark walnut desk. Show restrained, authentic wood grain, a clean empty surface, precise joinery, and soft moonlight grazing the edges.
Input images: Image 1 (desk.jpg) is the camera angle and desk silhouette reference only; replace its exaggerated grain and unnatural curves with believable fine walnut. Image 2 (far.webp) is lighting and palette reference only; do not include its window, skyline, books, papers, or other objects in the output.
Composition/framing: Wide 2200 x 1232 landscape framing. Oblique close view from above, looking across the tabletop with its front edge running diagonally from lower left toward middle right; retain the reference's broad tabletop plane and dark vertical apron below. The tabletop occupies nearly the entire frame. Preserve a broad uninterrupted center-right surface suitable for a separate procedure card overlaid later by the website. Full bleed with no black letterbox bars.
Style/medium: Close editorial photograph, photographic realism, 35mm film, subtle fine film grain, muted desaturated grade. A real crafted rectangular walnut desk with straight edges and precise subtle joinery.
Lighting/mood: Single soft cool moonlight key from upper right/back right, matching the moon at the upper right in Image 2. Gentle grazing edge highlights, deep navy shadows and true blacks. Dark walnut remains readable and has natural muted brown undertones, restrained satin finish, no warm artificial lighting.
Materials/textures: Fine restrained authentic walnut grain with subtle natural variation and correct scale; clean smooth flat surface. No oversized black grooves, no concentric swirls, no repeated parallel ridges, no exaggerated knots.
Constraints: No objects, procedure cards, writing, text, logos, watermark, repeating patterns, artificial-looking curves, warped edges, glossy CGI finish, or carved grain. Generate just the empty desk photograph.
```

---

## 2026-10-02 · Claude Code · Night Glass redesign

Branch `claude/glass-redesign`, uncommitted at the end of the session (the user had not asked for a commit).

**Changed**

- Redesigned the UI as "Night Glass", at the user's request ("the current web looks cheap", add glassmorphism, use the scroll-craft taste rules). Rationale and feel check are in `BRIEF.md` under Revision 2; there's a new row in `scrollcraft/FINGERPRINTS.md`.
  - A fixed night world (`.world`: `night.webp`, crossfading to `dawn.webp` from Verify to the close) sits behind every act. Teaching surfaces are `.glass` panes; paper is kept only for the procedure sheet.
  - Hero: the headline sits on a frosted pane. On exit, the window and desk dissolve into the blurred night (focus pull) instead of the old Paper wipe. The `hero__paper` and `hero__scrim` planes are gone.
  - Chapter intertitles: the moonbeam is a glass slab (`.chapter__pane`) driven by `--sc-p`.
  - The peak keeps the far window behind the glass lanes, with feathered stage edges. The sweep is now a glass band.
  - `src/styles.css` rewritten. `src/index.html` restructured (split layouts for tools, ops and predict; data stacked; tables wrapped in panes). `app.js` gained `worldFrame()` (drift and dawn) and `bindSheen()` (a pointer highlight on panes, fine pointer only, off under reduced motion).
  - Fixed a v1.0.0 bug: the engine's `img { max-width: 100% }` cut the 108%-wide hero desk short at the right edge.
  - Fixed mobile: the run lesson had collapsed into two squeezed columns (desktop `data-kind` rule outranked the mobile rule). Wide tables now scroll inside their pane.
- Regenerated all photography with the Codex CLI's built-in image generation (user-authorized): `far`, `desk`, `mug` (true alpha), `moon`, `far-dawn` and `desk-dawn` (matched to the night plates), plus the new `night` and `dawn` world plates. Prompts and the export recipe are in `docs/ASSET-PROMPTS.md`. This supersedes the uncommitted `desk`/`far` edits from the 2026-09-30 Codex entry.
- Added `tools/contrast.mjs` (`npm run check:contrast`), `tools/peek.mjs` and `tools/peek-at.mjs`. Updated `AGENTS.md` (new rule 12 on glass and backdrop roots, palette note, assets route, commands).

**Verified**

- `npm test` 14/14 and `npm run build` pass.
- `npm run shots`, `shots:mobile` and `shots:reduced`: no dead scroll, all media cues ≥ 4.5:1, no console errors or failed requests. Contact sheets inspected at desktop, 390 × 844 and reduced motion.
- `npm run check:contrast` (40 positions, about 3,000 text runs): remaining reports are known artifacts (the `mark.warn` underline sampled as background, text under the fixed rail, the transient peak sweep).
- `npm run check:gas`: works in the sandboxed iframe with no console errors. Only `night.webp` and `dawn.webp` fail, because the CDN ref is still `v1.0.0`. Without them the page degrades to flat night glass and stays readable (screenshot checked).

**Open**

- To ship to Apps Script: commit, tag a new release (e.g. `v1.1.0`), build with `-- --ref v1.1.0`, then `gas:deploy`. Not done; it needs the user's go-ahead.
- Not yet tested on a real phone. `backdrop-filter` cost on low-end mobile GPUs is unmeasured; the `@supports not` fallback covers browsers without it.
- Tools, services, sort and data are four consecutive glass-over-bokeh acts. Layout anchors vary, but the material does not.

---

## 2026-10-02 · Claude Code · Premium pass: Through the Window

Branch `claude/premium-pass`, uncommitted at the end of the session (the user had not asked for a commit).

**Changed**

- Request: "the ux feels dull and cheap, the hero still looks cheap". Rationale in `BRIEF.md` (Revision 3); new row in `scrollcraft/FINGERPRINTS.md`.
- Hero rebuilt as registered depth planes cut from `far.webp` by the new `tools/cut-hero.py` (Python: Pillow, NumPy, opencv-python-headless): `hero-sky.webp`, `hero-room.webp`, `hero-moon.webp` (WebP with alpha; no JPEG twins). The headline sits beyond the glass and the mullions cross it; the placement is measured (see the comment on `.hero__head`). Scroll is a three-beat walk through the window (`heroFrame()` in `app.js`), span 1.7 to 2.4, with fine-pointer parallax (`bindHeroPointer()`). `layerHero()` swaps from the uncut photo only when every plane has decoded.
- Rail: full-width chrome over a progressive blur, `is-solid` after the hero. The logo's crescent is now an SVG mask (it used to paint `--rail-bg`, which would show on a transparent bar). Notes mode moves the rail's right edge instead of translating it.
- Type: larger, lighter `.assert`; pinned and split contexts are capped; ledes after headings are larger. Headings rise out of a mask on arrival (`bindArrivals()`, `.ms-js .assert`), opacity only under reduced motion.
- Glass rim and shadow refined; styled selects; the Workday label lifted to `--ink-2` for contrast.

**Verified**

- `npm test` 14/14, `npm run build` both targets.
- `npm run shots`: 70 captures, no dead scroll, all media cues at least 4.5:1. Hero inspected at desktop 1440x900 and 1920x1080 (opening, 0.25, 0.45, 0.62, end) and phone 390x844 (opening, 0.3, 0.6). Reduced motion: a static, complete composition.
- Fallback: with the three new planes blocked, the hero shows the uncut photograph with the headline and stays complete.
- `npm run check:gas`: no console errors. Failed requests are the new hero planes plus `night`/`dawn`, because the CDN ref is still `v1.0.0`; the hero falls back as above.
- `npm run check:contrast`: the remaining reports are the known `mark.warn` underline, text passing under the rail band (y < 64) and the transient peak sweep.

**Open**

- Apps Script needs a new tag (e.g. `v1.1.0`) that includes the hero planes, a build with `-- --ref v1.1.0`, then `gas:deploy`. Not done; it needs the user's go-ahead.
- Not tested on a real phone. Mid-approach (about 0.2 to 0.35 of the hero) the moving mullions briefly cover thin letters; this happens in motion, by design.
- If `far.webp` changes, rerun `tools/cut-hero.py` and re-measure the headline placement.

---

## 2026-10-02 · Claude Code · Transitions: Passages

Same branch `claude/premium-pass`, still uncommitted.

**Changed**

- Request: "add more animation on transitions" (Codex imagegen authorized). Rationale in `BRIEF.md` (Revision 4); row in `scrollcraft/FINGERPRINTS.md`.
- New assets: `cloud-far.webp`, `cloud-near.webp`. Generated with `codex exec --enable image_generation` (prompts in `docs/ASSET-PROMPTS.md`), raw PNGs in `lab/gen/cloud-*/`, keyed by the new `tools/key-clouds.py` (white with luminance alpha, which equals a screen blend; edges feathered).
- `index.html`: a `.passage` (far) and `.passage--near` plane plus a `.chapter__scrim` in each chapter intertitle; `.pause__mist` in the break.
- `app.js`: `bindArrivals()` now also arrives glass panes (`.ms-arrive`, staggered `--d`); new `bindTransitions()` / `transitionsFrame()` drive the passages, the clearing (`--cx/--cy/--cw/--ch` on the near plane's mask), the mist and heading depth (`translate`), reading every rect before writing anything.
- `styles.css`: passage planes and masks, `@property --sweep` rim light, arrival states, reduced-motion overrides. The rail's blur band is denser, and Present has a faint fill (it sat over bright cloud).

**Verified**

- `npm test` 14/14, `npm run build`.
- `npm run shots`, `shots:mobile`, `shots:reduced`: no dead scroll, no console errors, no failed requests.
- Passages inspected at six positions (Read, desktop), at three positions (Translate), and on a phone (Verify). Reduced motion inspected. A pane arrival was filmed in 180 ms frames.
- `npm run check:contrast`: chapter word and line pass at every sampled frame (they failed at 1.7:1 before the clearing). The remaining reports are the known `mark.warn` underline, text under the rail band (the "Run again" button at y=24), and the peak sweep.
- `npm run check:gas`: no console errors; the new clouds join the other untagged assets on the failed list (CDN ref still `v1.0.0`). Without them, chapters fall back to the previous look.

**Open**

- The release tag and Apps Script deploy are still not done (now including the two cloud planes).
- Not tested on a real phone. Passages animate three large alpha WebPs per chapter on scroll; GPU cost on low-end phones is unmeasured.

---

## 2026-10-02 · Claude Code · Reimagined: The Press Run (renamed PressRun)

Same branch `claude/premium-pass`, uncommitted (no commit was asked for).

**Changed**

- Request: "reamagine the analogy away from moon, make it more relatable to what was being discussed, I also dont want it to be a cliche analogy, make it unique. you may generate images again in codex cli". The user chose The Press Run from three offered analogies, and chose to rename the product to fit: **PressRun**. Rationale, lesson-to-shop mapping and feeling curve in `BRIEF.md` (Revision 5); row and a "taken" bullet in `scrollcraft/FINGERPRINTS.md`.
- 11 new images from `codex exec --enable image_generation` (prompts verbatim in `docs/ASSET-PROMPTS.md`; raw PNGs in `lab/gen/press/`, exported by the new `tools/export-assets.py`): plates `shop`, `shop-day`, `hero-shop`, `hero-shop-day`, `stone`, `stone-day`, `type-far`, `rest`; true-alpha cutouts `press`, `brayer`, `roller`. WebP only.
- Removed the moon-era assets (`night`, `dawn`, `far`, `desk`, `mug`, `moon`, `far-dawn`, `desk-dawn` and their JPEGs, `far.lqip.txt`) and the hero/cloud cuts with their tools (`cut-hero.py`, `key-clouds.py`). The tracked files remain in git history and in tag `v1.0.0`. The uncommitted Revision 3/4 work was never in git, so its last build (`dist/`), its assets and its two tools are archived in `lab/archive-moon/` (gitignored, local only).
- `index.html`: name, favicon and wordmark (a registration mark), Newsreader font, world plates, the hero rebuilt as print-shop planes, the passages (type plate, `data-ms-ink` word, roller), break, peak cylinder, close plates, and the Read intertitle line ("Watch the register: ...").
- `app.js`: `heroFrame()` for wall/press/stone/brayer; `bindTransitions()`/`transitionsFrame()` now ink each chapter word behind the roller (blind copy is `aria-hidden`); register marks at the bridge ends; world drifts to daylight. Globals renamed `PressRoster`/`PressData`/`PressEnv` (also `build.mjs`, `roster.js`, `env.js`, `lessons.js`). The storage key prefix `moonscript:` and package name are unchanged on purpose.
- `styles.css`: warm print-shop tokens (navy rgba values remapped), Newsreader for display type, hero planes measured on `hero-shop.webp` (comment above `.hero__stage`), passage/ink styles, impression cylinder and inked rows at the peak, reduced-motion rules.
- Two speaker notes reworded (desk to stone, light to register). Headlines untouched.

**Verified**

- `npm test` 14/14, `npm run build`.
- `npm run shots`, `shots:mobile`, `shots:reduced`: no dead scroll, all media cues at least 4.5:1, no console errors, no failed requests.
- Looked at: hero at 0, 0.3, 0.5, 0.85 (1440x900) and phone (390x844, opening and 0.4); the Read passage at six roller positions; clarify, read lesson, break, peak end, close; reduced-motion hero and Verify passage.
- `npm run check:contrast` (2,931 runs, 40 positions): only the four known `mark.warn` underline false positives remain.
- `npm run check:gas`: no console errors. All new images fail from the CDN because the ref is still `v1.0.0`; the page stays readable on the dark ground but the photography is missing there until a new tag.

**Open**

- To ship to Apps Script: commit, tag (e.g. `v1.1.0`), `npm run build -- --ref v1.1.0`, `gas:deploy`. The Apps Script project title also changes on the next push (`Code.gs`). Not done; needs the user's go-ahead.
- The repo and package names still say moonscript (the user asked to keep the repo name).
- Not tested on a real phone.
