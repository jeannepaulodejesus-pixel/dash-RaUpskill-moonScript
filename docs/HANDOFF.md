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
