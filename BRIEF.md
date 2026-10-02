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

---

## Revision 3: Through the Window (2026-10-02)

**Request (verbatim):** "the ux feels dull and cheap, the hero still looks cheap. your /goal is to make the web feel more premium just like how Nate Herks' web outputs"

**What read as cheap (observed on the revision 2 render):** the headline sat in a frosted card pasted over a flat photograph, so the hero was a website on top of a picture rather than a place. The desk, sheet and mug were the only depth; the window, moon and city were one plane. The rail was a heavy pill crossing the window. Section headings were modest and arrived with no motion. Selects were browser defaults.

**Authored decisions, under that request (the scroll-craft hero-depth standard):**

- **Layer contract.** One photograph (`far.webp`) is cut into registered planes by `tools/cut-hero.py`: the view outside (mullions and moon removed), the moon, the room with its three glass panes made transparent, then the existing desk, sheet and mug. A `.hero__scene` box reproduces object-fit: cover in CSS, so every plane is positioned in the photograph's own coordinates.
- **The headline is beyond the glass.** It sits between the view and the room, so two mullions cross it. Its placement was measured against every glyph box so the bars fall on an "n", an "o" and a word space; the type scales with the plate, so this holds at every desktop size. On phones the headline comes in front (too small to be crossed and stay readable). The kicker, lede and Begin stay in the room with the visitor.
- **One camera idea, three beats.** Walk to the window (the room grows around you, the desk drops away, the sheet lifts off it), pass through the glass (the room and mullions slide past on either side, the headline recedes), then the view dissolves into the blurred night every lesson is written on. This replaces revision 2's focus pull with an actual spatial move, and it tells the title's story: from the routine on the desk out into the run.
- **Safe fallback.** The cut planes replace the uncut photograph only after all of them decode, so the Apps Script build (whose CDN tag predates them) shows the complete original composition.
- **Chrome and type.** The rail is a full-width line over a progressive blur. Assertion headings are larger and lighter (weight 480, -0.05em) and rise out of a mask the first time they arrive. Glass panes have a cleaner rim and a bottom edge. Selects are styled.

**Feel check (cold scroll of the hero, then diffed):** curiosity (a room at night, words out in the sky) · approach (the room opens around you) · arrival (the sheet in your hands, the night behind it). It matches the intended "stillness, curiosity", and the hero now ends where the lesson begins: in the night.

---

## Revision 4: Passages (2026-10-02)

**Request (verbatim):** "add more animation on transitions. again, you may utilize codex cli -> imagegen to create assets"

**What read as flat:** sections handed over by simply scrolling in. The chapter intertitles were the only authored transitions, and they were a clip wipe plus a glass slab over the same bokeh as every other act. Panes appeared already in place.

**Authored decisions, under that request:**

- **Chapter passages.** Each chapter (Translate, Read, Verify) is reached through moonlit cloud, two new Codex imagegen plates generated on black. They are keyed to alpha by `tools/key-clouds.py`, using white with luminance alpha, which composites exactly like a screen blend. The far bank drifts slowly behind the chapter word, and the near masses rush past in front of it at about four times the rate. The word settles from a slight scale as it comes clear. The near cloud keeps a soft clearing over the word and its line, measured each frame, so the text never sits under bright cloud. A scrim pool appears under the text only while cloud is passing. Feeling: passing from one part of the night into the next.
- **Arrivals.** Glass panes in the flowing sections tilt up into place (perspective, 10deg, 64px), then a band of light runs once along the rim. They are staggered within a section, and headings still rise out of their mask. Pinned stages keep their own choreography.
- **Depth on the way through.** Assertions in flowing sections lag 7% behind their section, so heading and pane part as you pass.
- **The break.** A slow mist crosses the rising moon. It stays quiet: the authored silence is kept.
- **Reduced motion.** No travel. The far cloud holds still, the near cloud is hidden, panes and headings fade.

**Feel check (cold scroll, the passages only):** threshold (cloud thickens) · emergence (the word clears) · arrival (the lesson below). It matches the intent. Nothing in the teaching surfaces changed meaning.

---

## Revision 5: The Press Run (2026-10-02)

**Request (verbatim):** "reamagine the analogy away from moon, make it more relatable to what was being discussed, I also dont want it to be a cliche analogy, make it unique. you may generate images again in codex cli"

**Choice (the user's, from three offered: The Press Run, The Handover Note, The Player-Piano Roll):** The Press Run. The product is renamed to fit: **PressRun** (the user chose "Rename to fit"; the repo name stays).

**Why it fits the lesson, not just the look.** A reporting routine is a page copied out by hand every week. A script is the same page set once in type, proofed, and run as often as it is needed. The deck's own words already belong to a print shop: *line*, *sort* (slide 7; a sort is one piece of type), *proof*, *run*, *report*, *edition*, *typo*. Nothing in the analogy needs explaining to an analyst, and none of it is the usual recipe, robot, assembly line or light-beam metaphor.

| Lesson | In the shop |
|---|---|
| Recognize | The same page copied by hand, Monday to Friday |
| Clarify | Vague words cannot be set in type. Only exact sorts can. |
| Translate | Composing: each instruction set as a line of type |
| Read | Proofing. The three lanes are three plates; the Program Counter puts them **in register** |
| Break | The forme locked in the chase, the press at rest |
| Run (peak) | The press run: the impression cylinder passes and the active roster is printed |
| Verify | Pull a proof, check it against the manual filter, fix the typo in the forme |
| Triggers | The scheduled edition: when the press runs, and on whose authority |
| Close | Morning of the run: daylight in the shop, change the rule and run it again |

**Authored decisions:**

- **World.** One print shop before the morning run (`shop.webp`), fixed behind every act and blurred by the panes. The panes are smoked and warm now, not night blue; the rim catches lamp light. Daylight replaces dawn: the shop crossfades to `shop-day.webp` from Verify to the close.
- **Type.** Assertions, chapter words and the hero headline are set in a display serif (Newsreader), so the headlines read as set type. Geist stays for UI and body copy, Geist Mono for code.
- **Hero.** Planes: the back wall of type cabinets (far), the cylinder proof press standing in the room (mid, a true-alpha cutout, between the headline and the stone), the lamp's light, the imposing stone with a locked chase (near), the procedure sheet as an HTML proof lying on the stone, and a blurred ink brayer in the front corner. On scroll the stone and brayer drop away, the press slides past faster than the wall, and the proof lifts off the stone to face you, then the shop dissolves into the world.
- **Signature, renamed: the Register.** The Program Counter is unchanged in behaviour. Its bridge now ends in registration marks, because what it shows is three plates printing the same step in register.
- **Chapter passages: inking the word.** Each chapter word is first a blind impression (pressed, uninked, tone on tone). A brayer rolls across it with the scroll and the word is inked behind the roller. Behind it, a forme of type drifts out of focus. Feeling: the next part of the job is being set up.
- **The peak: an impression.** When the output is written, a dark impression cylinder passes over the lanes and the active roster arrives inked.
- **Teal and amber keep their meaning.** Teal is active and in register; amber is exception. On the shop ground they use `--teal-lit` / `--amber-lit`.

**Feeling curve:** unchanged from the table above (stillness, weary recognition, sharpening, "oh", orientation, grounding, play, growing competence, authored silence, awe, trust, possibility, tension to control, responsibility, confidence, resolve). The causes change: a shop before the run instead of a night office; a press at rest instead of a rising moon; an impression instead of a sweep of light.

**Tell-someone sentence:** "It's the site where your weekly report gets set in type: as you scroll, the same step lines up in the procedure, the code and the spreadsheet like plates in register, and then the press runs and the active roster is printed."

**Authored silence:** the Break is the press at rest under one lamp.
