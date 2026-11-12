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

## 2026-11-06 · Claude Code: presenter script

Branch `main`, uncommitted (no commit was asked for).

**Changed**

- Request: "create a full presentation script that is interactive with the audience and helps me help them better understand the concept in .md". Added `docs/PRESENTER-SCRIPT.md`: a slide-by-slide facilitation script for all 24 slides and the break (SAY / DO / ASK / LISTEN FOR / WATCH OUT / BRIDGE), an interaction toolkit, three running threads (Priya Nair, a prediction board, the text "NULL"), an exit ticket, likely questions and recovery plays.
- Headlines quoted verbatim from `lessons.js`. Every number in its answer key was computed with `src/roster.js` (6 active; 12 after an appending rerun; 0 for lowercase `active`; 2 Inactive; 1 NULL); the file says how to recompute them. No em dashes, no time-saving claims.

- Request: "omit the \"present\" button". Removed the Present button from the rail (`index.html`), its `presentBtn` wiring in `app.js` and the `.rail__tool` styles. Presenter mode is unchanged and still opens with the P key or `?mode=present`; Esc leaves it.

**Verified**

- Answer key values checked by running `roster.js` in node.
- `npm test` 14/14, `npm run build`, `npm run check:gas` (no console errors; image failures are the known `v1.0.0` CDN ref issue). In Chrome at 1440x900: no button in the rail, chapter list still centred, P turns presenter mode and the HUD on, Esc turns it off, `?mode=present` opens in presenter mode, no page errors.

**Open**

- If the sample roster or script changes, the answer key and the per-slide tables in the presenter script must be updated with them (rule 1).

## 2026-11-06 · Claude Code: slide folio

Branch `main`, uncommitted (no commit was asked for).

**Changed**

- Request: "add a footer watermark that indicates which slide am i on". Added a folio (the printer's word for a page number) fixed in the bottom-right foot margin: `Slide 07 / 24`, or `Break` at the break.
  - `index.html`: `.folio` after the timer panel.
  - `app.js`: `renderFolio()` reads the same `currentSlide` that `detectSlide()` keeps for the presenter notes, so the two always agree. The total is counted from `D.chapters` (numbered slides only), not hard-coded.
  - `styles.css`: a small smoked pill, `pointer-events: none`. It rises above the break timer when that is open and hides while speaker notes are open (they cover that corner).

**Verified**

- `npm test` 14/14, `npm run build`, `npm run check:gas` (no console errors).
- `npm run check:contrast`: first pass flagged the folio label on the daylight close (2.76:1); backing darkened and label lifted to `--ink-2`, rerun has no folio failures.
- Screenshots at 1440x900 (slides 5, break, 24) and 390x844 (slide 9). Playwright: folio moves to `bottom: 78px` with the timer open, `display: none` with notes open, no page errors.

**Open**

- Not on a real phone. On narrow screens it can sit over the lower edge of a pane; it is click-through, so nothing is blocked.

## 2026-11-10 · Claude Code: notes PDF and PPTX

Branch `main`, uncommitted (no commit was asked for). No repo source changed.

**Changed**

- Request: "for the pdf file, add in the notes, the questions are in the file, also create a pptx file". The PDF is `~/Downloads/PressRun-Day1.pdf` (77 page screenshots of the 24 slides plus the break, several per slide on the stepped slides). Pages were mapped to slides by reading each page's folio.
- `~/Downloads/PressRun-Day1-with-notes.pdf`: A4 notes pages, slide on top and notes below, one per source page, with a front page (labels, interaction toolkit, three threads), a back page (likely questions, recovery plays) and bookmarks per slide. The original PDF is untouched.
- `~/Downloads/PressRun-Day1.pptx`: 77 full-bleed 16:9 slides from the original JPEGs, the same notes as speaker notes, alt text, sections per chapter.
- Notes come from `docs/PRESENTER-SCRIPT.md`, split per page. On step pages, "ASK BEFORE YOU ADVANCE" is the next step's question, so its answer lands on the next page.

**Verified**

- PPTX passes the pptx skill's `validate.py`; notes read back for all 77 slides. PDF pages rendered and checked visually; no notes overflowed.

**Open**

- PPTX not opened in PowerPoint or Keynote here (no LibreOffice; Quick Look timed out on the 24 MB file).
- The build scripts lived in the session scratchpad and were not kept. If the page or the script changes, the notes need regenerating.

## 2026-11-11 · Claude Code: Apps Script images 404

Branch `claude/cdn-v1.1.0`, pushed. Tag `v1.1.0` pushed.

**Changed**

- Request: "I've deployed it to appscript. the problem is the images is not loading". Cause: the Apps Script build loads images from jsDelivr at `v<package version>`, which was still `v1.0.0`. That tag predates the Press Run images (it holds the old MoonScript `desk`/`moon`/`far` set), so all 11 image URLs returned 404.
- `package.json` / `package-lock.json` version 1.0.0 to 1.1.0, so the default ref is `v1.1.0`. This matters because `gas:push` and `gas:deploy` rebuild without `--ref`.
- Tag `v1.1.0` on the fix commit. AGENTS.md: release tag line and the "Changing an image" steps now say to bump the version.

**Verified**

- `npm test` 14/14, `npm run build` (gas assets point at `@v1.1.0`), `npm run check:gas`: no console errors, no failed requests.
- All 11 images return 200 `image/webp` from jsDelivr at `@v1.1.0` (three 404'd for about 20 s right after the tag push, then resolved).

**Open**

- `npm run gas:deploy` was blocked by the agent's permission check; the user runs it. Until then the live app still serves the `v1.0.0` URLs.
- Branch needs merging into `main`. The tag already points at the branch commit, so the live images don't depend on the merge.

## 2026-11-11 · Claude Code: deployed the image fix

Branch `claude/cdn-v1.1.0`.

**Changed**

- Request: "deploy it". `npm run gas:deploy` failed with "Project settings not found": there was no `.clasp.json` on this Mac. `clasp list` showed two projects for this deck; the AGENTS.md deployment ID belonged to the old "MoonScript: From…" project. The user chose the "PressRun: Routine…" project, deployment @2.
- Wrote a local `.clasp.json` for the PressRun project, pushed, and moved deployment `AKfycbxwGWUe…IjGXzg` from @2 to @3 ("v1.1.0: Press Run images from jsDelivr"). Same URL.
- `package.json` `gas:deploy` and AGENTS.md now name the PressRun deployment and script ID.

**Verified**

- `clasp push` sent 5 files built against `@v1.1.0`; `clasp list-deployments` shows @3.

**Open**

- The live page needs Google sign-in, so it was not loaded here. The user should hard-refresh it to confirm the images.
- PressRun deployment @1 (`AKfycbwXzsSy…l8GwhA`) still serves the v1.0.0 build, so its images 404. Retire it or move it to @3 if anyone has that link.

## 2026-11-11 · Claude Code: The Preset (Revision 6), for review

Branch `claude/preset-analogy` in worktree `.claude/worktrees/preset-analogy`, branched from `claude/cdn-v1.1.0`. Not merged, not pushed, not tagged, not deployed: the user asked to check and approve it first.

**Changed**

- Request: "revise the analogy used. Old printing press looks too old school, i need something a gen z and a millenial would relate to". The user chose The Preset (from The Preset, The Speedrun, The Choreo) and renamed the product **OneTap**. Rationale and lesson mapping in `BRIEF.md` (Revision 6); row and two "taken" bullets in `scrollcraft/FINGERPRINTS.md`.
- 9 Codex imagegen images (prompts verbatim in `docs/ASSET-PROMPTS.md`; raw PNGs and the runner in `lab/gen/preset/`). Exported by the rewritten `tools/export-assets.py` to 10 WebP files: `room`, `room-day`, `desk`, `desk-day`, `prints-far`, `rest`, cutouts `camera` and `phone`, and `shot-raw` / `shot-edit` (one photograph, flattened and preset-graded in code). Removed the 11 print-shop images (they stay in tag `v1.1.0`).
- `index.html`: name, favicon and wordmark (two sliders), world plates (RAW and edit), hero planes (camera, desk, phone), passages (prints plate, `data-ms-edit` word, `data-ms-split` divider), peak sweep line, close plates, Read intertitle line ("Watch the sync").
- `app.js`: globals renamed `OneTapRoster` / `OneTapData` / `OneTapEnv` (also `roster.js`, `env.js`, `lessons.js`, `build.mjs`); bridge ends are slider knobs; hero planes `camera` / `phone`, lamp glow re-measured; world crossfades RAW to edit with both plates moving together; passages drag a before/after divider instead of a roller.
- `styles.css`: graphite room tokens (`--shop-*` renamed `--room-*`), cooler pane tint and rim, hero re-measured on `room.webp`, passage word raw/edit and the divider, peak grade line and `rowDevelop`, reduced-motion hides the divider.
- `lessons.js`: six speaker-note cues reworded to the preset (slides 1 to 4, 17, 18, 21, 24). Headlines untouched. `docs/PRESENTER-SCRIPT.md`: the analogy table and every print-shop line rewritten.
- Version 1.1.0 to 1.2.0 (`package.json`, `package-lock.json`), so the Apps Script build points at `v1.2.0`. AGENTS.md, README, `gas/Code.gs` title updated.

**Verified**

- `npm test` 14/14, `npm run build`.
- Screenshots at 1440 x 900 and 390 x 844, plus reduced motion: hero (rest, approach, sheet facing), all three passages mid-sweep, Read, break, peak (loop and written), check, predict (world taking the grade), close. No console errors, no failed requests on the static build.
- `npm run check:contrast`: only the 4 known `mark.warn` underline false positives.
- `npm run check:gas`: no console errors; the 8 new images 404 from jsDelivr because tag `v1.2.0` does not exist yet. Expected until approval.
- `npm run shots` not run (scroll-craft harness not used this session).

**Open (after the user approves)**

- Merge, then tag `v1.2.0` on a commit that contains the images and push it; check the images return 200 from jsDelivr; then `npm run gas:deploy`.
- The Apps Script project is still titled "PressRun: Routine…" in Drive; the page title (`doGet`) now says OneTap. Rename the project in the editor if wanted.
- The storage key prefix `moonscript:` and the package name are unchanged on purpose.

## 2026-11-12 · Claude Code: OneTap deployed as its own Apps Script project

Branch `claude/preset-analogy`, pushed. Tag `v1.2.0` pushed. Not merged into `main`.

**Changed**

- Request: "deploy the new analogy into appscript as a separate appscript project". Created the standalone project "OneTap: From Routine to Run" (script `17YWR_B3…h7s-51a`) with `clasp create-script`, pushed the build and created deployment `AKfycbxRPiE6…z5VhxVFa` @1 ("v1.2.0: OneTap (The Preset)"). Access and execute-as come from `gas/appsscript.json` as before.
- `package.json` `gas:deploy` and AGENTS.md now target the OneTap deployment on this branch. The PressRun project and its deployment are untouched and still serve the print-shop build.
- Tag `v1.2.0` on this branch so jsDelivr serves The Preset images to the Apps Script build.

**Verified**

- `npm test` 14/14, `npm run build` (gas assets point at `@v1.2.0`), `clasp push` sent 5 files.

**Open**

- The live page needs Google sign-in, so it was not loaded here. The user should open the deployment URL and confirm the images.
- Branch still needs merging into `main` if OneTap replaces PressRun as the main line. Until then, `gas:deploy` on `claude/cdn-v1.1.0` still targets PressRun, and on this branch it targets OneTap.

## 2026-11-12 · Claude Code: OneTap merged into `main` and redeployed

Branch `claude/preset-analogy`, fast-forwarded into `main`.

**Changed**

- Request: "merge the preset analogy to main", then "add the handoff entry and deploy OneTap". `origin/main` fast-forwarded from `1f5e3a4` to `5fa385d`. This also brought the `claude/cdn-v1.1.0` commits (Apps Script image fix, PressRun deployment target) into `main`, since the preset branch was built on them.
- `main` is now OneTap: `gas:deploy` from `main` targets the OneTap deployment. The PressRun source lives on `claude/cdn-v1.1.0` and tag `v1.1.0`; keep both while the PressRun deployment stays live.
- `npm run gas:deploy`: OneTap deployment `AKfycbxRPiE6…z5VhxVFa` is now @2.

**Verified**

- `npm test` 14/14 and `npm run build` before the merge.
- All 10 images return 200 from jsDelivr at `@v1.2.0`.
- `clasp push` sent 5 files; `clasp deploy` reported @2.

**Open**

- The live page needs Google sign-in, so it was not loaded here. The user should open the deployment URL and confirm it renders with images.
- The Drive project title and the `moonscript:` storage prefix are unchanged (see the entries above).

## 2026-11-12 · Claude Code: slide 24 previews the Day 2 workbook

Branch `claude/day2-close`, off `main`. Not merged, not deployed.

**Changed**

- Request: "check the gs_data.json in the downloads folder. these is the supposed training data for the Day 2, tailor the last slide of the deck with it". The file is the Day 2 exercise workbook: the WFM Apps Script Beginner Playground (Instructions plus 120 Raw Data calls, a sandbox extract adapted to a public call-center dataset).
- New `src/data/day2.js` (`OneTapDay2`): Raw Data copied unchanged, the nine tools exercise rule 4 asks for, and the three output tabs with their required columns. Loaded by `build.mjs` before `app.js`.
- Slide 24 (`buildClose` in `app.js`): the "Change the rule" demo is replaced by a Day 2 workbook pane next to the procedure sheet. It shows a **Sandbox extract** label, the source link, the function name `buildWfmBeginnerReport()`, each tool with the line where the Day 1 script used it (only `else` is new), and a sheet with four tabs (Raw Data, then the three tabs the script creates). Counts are computed from the data: 120 calls, 8 agents, 5 days, 15 abandoned with empty speed and rating. The output tabs show what is required, never the answers.
- Tabs follow the ARIA tab pattern (arrow keys, Home, End); arrows don't step slides in presenter mode. Panels share one grid cell so the pinned slide doesn't change height.
- Speaker notes for slides 23 and 24, and `docs/PRESENTER-SCRIPT.md` (Verify row, checklist, slide 23 bridge and rule table, slide 24 rewritten). AGENTS.md: map entry and a fifth honesty label.
- `test/day2.test.js` added to `npm test`.

**Verified**

- `npm test` 17/17, `npm run build`, `npm run check:gas` (no console errors, no failed requests), `npm run check:contrast` (only the 4 known `mark.warn` false positives).
- Screenshots of slide 24 at 1440 x 900 and 390 x 844, every tab, keyboard switching. Everything fits on one desktop screen; mobile hides the procedure sheet (as before) and the tool list.

**Open**

- The Day 2 sequence pills (Read, Modify, Run, Inspect, Troubleshoot) are deck copy and unchanged, but the workbook asks learners to write a new function, not modify one. Confirm with the user.
- Merge into `main` and `npm run gas:deploy` when approved. No image changes, so no new tag is needed.

## 2026-11-12 · Claude Code: Day 2 close merged and deployed

- Request: "merge day2-close into main and deploy it". `main` fast-forwarded from `2a407bd` to `cf5cdb9`; `npm test` 17/17 and `npm run build` passed first.
- `npm run gas:deploy` (script `17YWR_B3…h7s-51a`): OneTap deployment `AKfycbxRPiE6…z5VhxVFa` is now @3. No image changes, so it still loads from tag `v1.2.0`.
- Open: the user should load the live page (it needs Google sign-in) and check slide 24. The Read / Modify / Run / Inspect / Troubleshoot wording question from the previous entry is still open.

## 2026-11-12 · Claude Code: slide 24 pair fits together

Branch `claude/close-fit`, off `main`. Not merged, not deployed.

**Changed**

- Request: "the header and 'The Procedure' sheet does not seem well fit with the workbook", then "also update the presenter script".
- Slide 24 now draws the headline as a pair: the procedure card is labelled **Day 1 · traced today** and ends with "Written as `buildActiveRoster()`, 20 lines" (computed from `R.SCRIPT`); an arrow sits between it and the pane, now labelled **Day 2 · your script**. Card and pane share one top and one height (`align-items: stretch`).
- The sheet shows all ten Raw Data columns without clipping (smaller type, tighter cells, Topic and the header row wrap) and two calls (Diane abandoned, Becky answered) instead of three.
- A short-desktop rule (`min-width: 861px and max-height: 820px`) tightens the headline, gaps and tool chips, so the pair, the Day 2 sequence and the footer fit at 1280 x 720 and 1366 x 768. Arrow-key tab focus no longer scrolls the page.
- `docs/PRESENTER-SCRIPT.md` slide 24 rewritten to walk the pair left to right. Also removed leftover lines of the old slide 24 section (a stray rule table and the "blank editor" close) that the previous session's edit left behind on `main`. Slide 24 speaker-note cue updated to match.

**Verified**

- `npm test` 17/17, `npm run build`, `npm run check:gas` (no console errors, no failed requests), `npm run check:contrast` (only the 4 known `mark.warn` false positives).
- Screenshots at 1440 x 900, 1366 x 768, 1280 x 720 and 390 x 844; every tab at each size.

**Open**

- Merge into `main` and `npm run gas:deploy` when approved.
- The Modify wording question from the earlier entry is still open.

## 2026-11-12 · Claude Code: slide 24 pane drops the source line

Branch `claude/close-fit`. Request: omit "Adapted from a public call-center dataset. Your function: buildWfmBeginnerReport()". Removed from the pane (`app.js`) with its `.d2__src` styles. The **Sandbox extract** label stays, so the honesty label holds; `SOURCE_REPO` and `FN` stay in `src/data/day2.js` as provenance. The presenter script still gives the function name aloud. `npm test` 17/17; screenshots at 1440 x 900 and 1280 x 720. Still not merged or deployed.

## 2026-11-12 · Claude Code: close-fit merged and deployed

Request: "merge close-fit into main and deploy it". `main` fast-forwarded from `698a551` to `7b89344` after `npm test` 17/17 and `npm run build`. `npm run gas:deploy`: OneTap deployment `AKfycbxRPiE6…z5VhxVFa` is now @4 (images still from `v1.2.0`). Open: check slide 24 on the live page (Google sign-in); the Modify wording question.

## 2026-11-12 · Claude Code: slide 24 card shows the Day 2 procedure

Branch `claude/day2-procedure`, off `main`. Not merged, not deployed.

- Request: "tailor the 'The Procedure' to the day 2, it's misleading". The card showed the Day 1 roster steps next to the Day 2 workbook.
- New `PROCEDURE` and `RULE` in `src/data/day2.js`: five plain steps built from the workbook's exercise rules 5 to 10 and acceptance criteria 1 to 3, and exercise rule 9 word for word as the card's last line. The card is now labelled **Day 2 · in plain steps**; class `close__day1` renamed `close__proc`.
- Slide 24 speaker notes and `docs/PRESENTER-SCRIPT.md` slide 24 opening rewritten for the new card. Test added: the procedure names every output tab and keeps Raw Data read only.
- Verified: `npm test` 18/18, `npm run check:gas` (no console errors, no failed requests), `npm run check:contrast` (only the 4 known `mark.warn` false positives), screenshots at 1440 x 900 and 1280 x 720.
