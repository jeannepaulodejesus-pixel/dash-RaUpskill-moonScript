# AGENTS.md: MoonScript, From Routine to Run

Instructions for any coding agent working in this repository: Codex, Claude Code, or others. `CLAUDE.md` imports this file, so both agents follow the same rules. Keep this file current when the project changes.

## What this is

Day 1 of the MoonScript Apps Script upskilling track for Reporting Analysts. It is a 24-slide deck rebuilt as a scroll-driven web app. One source tree builds two targets:

| Target | Folder | Runs as |
|---|---|---|
| Static site | `dist/web/` | Any static server |
| Apps Script web app | `dist/gas/` | HtmlService, pushed with clasp |

Live references:

- Repo: https://github.com/jeannepaulodejesus-pixel/dash-RaUpskill-moonScript
- Release tag `v1.0.0`: jsDelivr serves `assets/img/` from this tag to the Apps Script build.
- Apps Script deployment ID: `AKfycbyGfoGtxYVlMfFjAVm49ZABsSBmGQW8lNi8L5WUCMHj1tmMKxfQSeco9LW0VhENI044`. The script ID is in `.clasp.json`, which is local and gitignored.

Design intent and the feeling curve live in `BRIEF.md`. Read it before changing anything visual.

## Commands

Everything below runs from the repo root. None of it needs files outside the repo unless noted.

```bash
npm install            # dev only: playwright-core (for check:gas and shots)
npm test               # unit tests: teaching logic + platform adapter. Must stay green.
npm run build          # writes dist/web and dist/gas (add -- --ref vX.Y.Z to pin CDN assets)
npm run serve          # build, then serve dist/web on http://localhost:4500
npm run check:gas      # simulates HtmlService: sandboxed cross-origin iframe + google.script stand-in
npm run shots          # scroll-craft contact sheets; needs the external harness (see below)
```

- `check:gas` and `shots` need Google Chrome installed and a server on port 4500 (`npm run serve`) for `shots`.
- `shots` resolves the harness from `SCROLLCRAFT_SHOOT`, or from Claude's plugin cache by default. If the harness is missing, it exits 2 with a message. Treat that as "skipped", not "failed".
- `gas:push` and `gas:deploy` change the live Apps Script project. **Only run them when the user asks.**

### Codex sandbox notes

- Codex runs here in `workspace-write` mode. Writes outside this folder are blocked, and so is network access unless approved.
- Network is needed for `npm install`, `gh`, `clasp`, Google Fonts and jsDelivr. Request approval, or ask the user.
- The build, tests and static server need no network and nothing outside the repo.
- `dist/`, `lab/` and `node_modules/` are generated and gitignored. Don't read them for context; read `src/`.
- If every command fails with `helper_unknown_error: setup refresh had errors`, the cause is the Codex Windows sandbox setup, not this repo.
  - Check `%USERPROFILE%\.codex\.sandbox\sandbox.<date>.log` for `runtime read/execute validation failed`.
  - On 2026-09-30 the cause was abandoned `.staging-*` folders under `%LOCALAPPDATA%\OpenAI\Codex\runtimes\cua_node`. Moving them out fixed it.

## Map

```
src/index.html          semantic markup for all 24 slides; build fills <!--TRIPTYCH-->, <!--DAYS-->, <!--SCHEMATIC-->
src/partials/           triptych stage markup, editor schematic SVG
src/styles.css          all theming and layout (tokens at the top)
src/engine/             scrollcraft engine (scrollcraft.js / .css). VENDORED: do not edit
src/roster.js           the teaching logic: SAMPLE roster, SCRIPT (the 20-line Day 1 script), run(), compare()
src/data/lessons.js     slide headlines, minutes, speaker notes, Read-chapter step maps, quiz data
src/env.js              platform adapter: static vs Apps Script (history, location, storage, clipboard)
src/app.js              Program Counter, lessons, hero choreography, interactions, presenter mode
gas/Code.gs             doGet() + include(); gas/appsscript.json manifest (no OAuth scopes)
build.mjs               produces both targets; guards against "<?" in inlined JS/CSS
tools/serve.mjs         static server      tools/gas-sim.mjs   HtmlService simulation
tools/shoot.mjs         wrapper for the external scroll-craft harness
test/                   node --test suites
assets/img/             generated photography (WebP + JPEG). Originals live outside the repo (see Assets)
scrollcraft/FINGERPRINTS.md  scroll-craft uniqueness registry (append-only)
```

## Rules that must not break

1. **Script line numbers are data.** `R.SCRIPT` in `src/roster.js` is the Day 1 script. The step maps in `lessons.js`, the error lab (line 5), the predictions (line 10) and `test/roster.test.js` all refer to its line numbers. If you change the script, update every reference and the tests together.
2. **Sheet row 3 is Priya Nair (`values[2]`).** The Read chapter follows her record. The sample also keeps the text `"NULL"` (row 5) and an empty cell (row 10) on purpose.
3. **Every consequence is computed.** Results on the page come from `roster.js`. Never hard-code an output, a count, or a pass mark.
4. **Honesty labels stay.** These must remain visibly labelled:
   - sample data
   - the simulated execution log
   - the editor schematic on slide 16
   - adjacent examples on slide 19

   No invented statistics or time savings.
5. **Deck copy is verbatim.** Headlines in `lessons.js` and `index.html` are the deck's assertion headlines. No em dashes in visible copy.
6. **Engine untouched.** Bespoke behaviour goes in `app.js`, reading `--sc-p`, or better, scroll position directly.
7. **Platform access goes through `env.js`.** No direct `location`, `history`, `localStorage` or `navigator.clipboard` in `app.js`. HtmlService runs the page in a sandboxed iframe.
8. **No `<?` in any JS or CSS.** HtmlService would read it as a scriptlet. `build.mjs` throws if it finds one.
9. **Palette and meaning.**
   - Teal means active/selected; amber means exception. Always pair colour with text.
   - Small text on Paper uses `--teal-text` / `--amber-text`. The base values fail 4.5:1 there.
10. **Accessibility.** Keyboard reachable, visible focus, `aria-live` on changing text, reduced motion keeps all content (no travel, same information).
11. **No text baked into images.** Photography is atmosphere only.

## Apps Script specifics

- HtmlService ignores `<meta name="viewport">` in the file; `doGet` adds it with `addMetaTag`.
- Images load from `https://cdn.jsdelivr.net/gh/<repo>@<ref>/assets/img/`.
- **Changing an image means:**
  1. Commit it.
  2. Push a new tag.
  3. Build with `-- --ref <tag>`.
  4. Push and deploy.

  An untagged image never reaches the Apps Script version.
- The manifest has no OAuth scopes, so visitors are never asked to authorize. Adding any Workspace service call changes that. Discuss with the user first.
- Access is `ANYONE` (Google sign-in required), execute as `USER_ACCESSING`.

## Assets

Photography was generated locally with hybrid-gen (outside this repo, at `D:\GPT-Codex\Hybrid Image Generator\hybrid-gen`, project `p002_moonscript`). The user prefers local generation first. Cloud lanes spend quota and need the user's approval of the plan.

Style preamble, for consistency: cinematic night photograph, 35mm film, single cool moonlight key, true blacks, deep navy shadows, fine film grain, photographic realism, muted desaturated grade.

## Working together (Codex and Claude Code)

- **Branches.** Each agent works on its own branch (`codex/<topic>`, `claude/<topic>`) and merges into `main` through the user. Don't push to `main` or retag releases unless the user asks.
- **Before committing:** `npm test` and `npm run build` must pass. For visual changes, also run `npm run check:gas`, and `npm run shots` if the harness is available.
- **Handoff log.** Append a dated entry to `docs/HANDOFF.md` at the end of a working session: what changed, what was verified, what is open. Never rewrite earlier entries.
- **Don't clobber.** If a file changed since you last read it, re-read it before editing. The other agent may be mid-task.
- **Line endings are LF** (`.gitattributes`, `.editorconfig`). Don't commit CRLF churn.
- **Commit messages:** imperative subject, a body explaining why.
