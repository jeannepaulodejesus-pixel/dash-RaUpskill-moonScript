# MoonScript: From Routine to Run

Day 1 of the MoonScript Apps Script upskilling track for Reporting Analysts, rebuilt from a 24-slide deck as an immersive, scroll-driven web app.

One reporting procedure (build the active-employee list from `employees.master_roster`) becomes executable in front of you. As you scroll, a beam of light acts as the program counter. It lights the same step in the plain-language procedure, the code, and the spreadsheet at once.

The same source runs two ways:

| Target | Output | How it runs |
|---|---|---|
| Static site | `dist/web/` | Open with any static server, or host it anywhere (GitHub Pages, Netlify, Cloudflare Pages) |
| Apps Script web app | `dist/gas/` | `clasp push` into a standalone Apps Script project, deploy as a web app |

## Use it

- **Self-paced:** scroll. Each lesson also has Previous and Next step buttons.
- **Presenting:** add `?mode=present` or press **P**.
  - **PageDown/PageUp** (or a clicker) jump beat by beat.
  - **N** opens speaker notes: teaching point, misconception, cue, bridge.
  - **T** shows the minutes per slide. **F** goes full screen. **Esc** exits.
- **Deep links:** `#recognize`, `#translate`, `#read`, `#run`, `#verify`, `#day2`. Under Apps Script, these go through `google.script.history`.
- **Reduced motion:** honoured. The hero holds a static layered composition, and lessons step without travel.

## Develop

```bash
npm install          # playwright-core, only for the verification harness
npm test             # teaching logic and platform adapter (node --test)
npm run build        # dist/web and dist/gas
npm run serve        # build, then serve dist/web on http://localhost:4500
```

Source layout:

```
src/index.html          semantic markup for all 24 slides (+ partials/)
src/styles.css          theme tokens and layout (the engine CSS is untouched)
src/engine/             scrollcraft engine, verbatim
src/roster.js           the teaching logic: the Day 1 script's behaviour, pure functions
src/data/lessons.js     headlines, timings, speaker notes, lesson step maps
src/env.js              platform adapter: static vs Apps Script (history, location, storage, clipboard)
src/app.js              Program Counter, lessons, interactions, presenter mode
gas/Code.gs             doGet + include()
assets/img/             generated photography (WebP + JPEG)
```

## Apps Script deployment

```bash
npm run build -- --ref v1.0.0
cd dist/gas
clasp create --type webapp --title "MoonScript: From Routine to Run"   # first time only
clasp push -f
clasp deploy -d "v1.0.0"
```

- **No OAuth scopes.** Every example is computed in the browser from labelled sample data, so visitors are never asked to authorize.
- **Execute as** the user accessing the web app. Access is set in `gas/appsscript.json`.
- **Viewport:** HtmlService ignores `<meta name="viewport">` in the file, so `doGet` adds it with `addMetaTag`.
- **Images** load from jsDelivr, pinned to the release tag (`--ref`), because HtmlService only serves the project's HTML files. Tag a release before deploying a build that points at it.
- **Embedding** in Google Sites: uncomment `setXFrameOptionsMode(ALLOWALL)` in `Code.gs`.

## Honesty notes

- The roster is **sample data** mirroring the workbook's shape. Names are fictional. It includes the text `"NULL"` and an empty cell on purpose.
- The Apps Script editor on slide 16 is a **schematic**, not a screenshot. Replace it with a cropped capture of your prepared sandbox and one annotation.
- The execution log is **simulated** in the browser by the same logic the script runs. It is labelled as such on the page.
- Photography was generated locally (SD1.5 via ComfyUI, SAM2 cutout, Real-ESRGAN upscale). No text is baked into any image.
