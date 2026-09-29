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
