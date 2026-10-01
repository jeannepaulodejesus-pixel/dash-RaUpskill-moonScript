# BRIEF: MoonScript, From Routine to Run (Day 1)

**Self-authored under explicit creative delegation.** The request was "give me your best shot". Every decision below is derived from the Day 1 deck outline (its design theme, palette, motif, progress segments and teaching pattern). Nothing contradicts it, and no user quotations are invented.

## The eight topics

1. **Vibe:** quiet, lit, precise. Gradual understanding. References (non-web): a desk lamp left on after hours, a patent drawing being inked line by line, the moment a darkroom print resolves.
2. **Journey (from the deck):** reporting friction → executable SOP → explicit mapping → JavaScript mechanics → demonstrated output → operating limits → Day 2.
3. **Energy curve:** calm open; steady through Translate; concentrated in Read; silence at the Break; the loudest moment is the full run; sober in Verify; resolved at the close.
4. **Feeling:** see the curve below. The one moment is the full run.
5. **What no other site does:** the scroll *executes* the procedure. A beam of moonlight is the program counter.
6. **Aesthetic family:** premium-minimal leaning editorial. The deck asks for it: midnight and paper grounds, one teal accent, amber for exceptions only.
7. **One world or scenes:** distinct scenes. Chapters hard-cut between Midnight (transitions) and Paper (teaching), as the deck specifies.
8. **Assets supplied:** none. Photography is generated locally with hybrid-gen (SD1.5 on the local GPU), cut out with SAM2, and upscaled. The Apps Script editor is a labelled schematic until real screenshots are captured from the sandbox.

## Grammar: Lit Procedure (new)

A triptych working surface. The unit is a *beat* on a persistent three-lane stage: **Instruction | Code | Consequence**. Lanes never move, because the deck says to preserve spatial positions. There are five chapters (Recognize, Translate, Read, Run, Verify) and the progress rail is the only chrome. The hero is a layered photographic desk whose sheet becomes the paper. The close is a real input.

**Bans:** scrub video, kinetic character splitting, spotlight, magnetic CTA, card grids, centred teaching copy, fake screenshots or terminals, invented numbers.

## Signature move: the Moonlight Program Counter

Scroll progress selects one step. That step lights the same instruction in all three lanes at once. A thin light bridge joins the three. In the loop, the counter walks row by row and `output` grows. Every consequence is computed from the sample roster by `src/roster.js`.

## Feeling curve (written before the acts)

| # | Act | Feeling | Cause |
|---|---|---|---|
| 0 | Hero | Stillness, curiosity | Midnight desk, moon, one procedure card; planes separate |
| 1 | Recurrence | Weary recognition | The same checklist slides past Monday to Friday |
| 2 | Clarify | Sharpening | Vague words struck in amber, explicit rules beside them |
| 3 | The turn | "Oh." | The checklist stays and its executable twin wipes in |
| 4 | Where it fits | Orientation | Tools by task, services, a sort you do yourself |
| 5 | Meet the data | Grounding | The roster, four columns lit, "NULL" flagged |
| 6 | Translate | Play | Match five terms to the procedure |
| 7 | Read | Growing competence | The pinned triptych, beam walking each concept |
| 8 | Break | **Authored silence** | Midnight, a rising moon, only the procedure |
| 9 | **Peak: the run** | Awe, then relief | The full script executes; the output tab materializes |
| 10 | Check | Trust | Script vs manual filter; rerun without duplicates |
| 11 | Wider | Possibility | A Gmail draft body computed from the output |
| 12 | Break it | Tension → control | Type a wrong sheet name, read the located error, fix it |
| 13 | Operate | Responsibility | Triggers, authority, operating conditions |
| 14 | Predict | Confidence | Three predictions, answers light the code |
| 15 | Close | Resolve | Dawn on the same desk; change the rule and run it |

**Peak:** "After the quiet break, the whole script I'd been reading piece by piece ran on its own. The moonlight swept through every line and the active list appeared." It lives in the Run chapter, holds the largest span on the page (9 viewport-heights), and is the only full-bleed moment besides the hero and the close.

**Tell-someone sentence:** "It's the site where a beam of moonlight runs the script line by line as you scroll, lighting the same step in the procedure, the code and the spreadsheet, and then the whole thing runs by itself and the active roster appears."

**Authored silence:** the Break section (a full viewport of midnight and a rising moon) is intentional, not dead scroll.

## Delivery constraints

- The same source runs as a static site and inside Google Apps Script HtmlService. See the README.
- Data is a labelled sample mirroring `employees.master_roster`. Names are fictional.

---

## Revision 2: Night Glass (2026-10-02)

**Request (verbatim):** "reimagine the UI design. The current web looks cheap, utilize the taste skill in /nateherk-design:scroll-craft to further improve the design. I want you to add glasmorphism design. also, im authorizing your to use my computer and leverage my codex cli and regenerate the assets via imagegen function."

**What read as cheap (observed on the v1.0.0 render):** most of the page was flat Paper with plain tables, one document-like section after another; type sat at one size and one weight; the dawn desk had carved wavy grain; the hero desk stopped short of the right edge (an engine `max-width: 100%` cap).

**Authored decisions, under that request:**

- **Glass as a specific effect, not decoration.** One night outside the office window (`night.webp`, out-of-focus city bokeh under the moon) is fixed behind every act. Teaching surfaces are panes of glass in front of it, so every blur, tint and rim is made by real imagery behind the pane. Paper survives only as the procedure sheet: the one warm, physical object in a room of glass.
- **The deck's Midnight / Paper hard cut becomes Night / Glass.** Teal still means active and amber still means exception, on lightened stops for the dark ground; the paper sheet keeps the darkened stops.
- **Hero exit is a focus pull.** The headline sits on a frosted pane over the window. On scroll the sheet lifts to face you while the window and desk dissolve into the blurred night: the room goes out of focus and leaves the world the lesson is written on.
- **Chapter beam as glass.** The moonbeam on each intertitle is a slab of glass that crosses the chapter word with the scroll and blurs what it passes. The body line stays above it so it is never obscured.
- **First light.** The world crossfades toward a matched dawn plate from the Verify chapter (30%) and fully at the close, where the re-shot dawn window and desk hold.
- **Type.** Geist at variable weights: display 500 to 520 with tight tracking, chapter words at 360. Light-on-dark compensation in line height and secondary ink.

**Feel check (cold scroll, one word per act, then diffed with the curve above):** stillness, then focus (hero) · weary (recurrence) · sharpening (clarify) · "oh" (turn) · orientation (tools, services, sort) · grounding (data) · play (terms) · competence (read) · silence (break) · awe (run) · trust (check) · possibility (wider) · tension (errors) · responsibility (triggers, ops) · confidence (predict) · resolve (close). It matches the intended curve. The hero now ends in "focus" rather than "the sheet becomes the paper", a deliberate change. Risk noted: tools, services, sort and data are four consecutive glass-over-bokeh acts; varied anchors (split, trail, offset, stacked) carry the difference, not the material.
