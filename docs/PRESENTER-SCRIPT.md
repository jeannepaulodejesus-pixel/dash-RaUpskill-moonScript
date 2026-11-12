# OneTap Day 1: Presenter Script

**From Routine to Run.** A full, interactive facilitation script for the 24-slide OneTap page, for Reporting Analysts.

This script follows the page exactly: the headlines are the deck's, the code is the 20-line `buildActiveRoster` script in `src/roster.js`, and every answer below was computed from the sample roster in that file. If the sample or the script changes, recompute the answer key (see [Answer key](#answer-key)) before you present.

---

## How to read this script

Each slide uses the same labels, so you can scan quickly while presenting.

| Label | Meaning |
|---|---|
| **SAY** | Words to speak. Paraphrase freely; the ideas matter, not the wording. |
| **DO** | What to click, scroll or point at on the page. |
| **ASK** | A question for the room. Wait at least five seconds before you rescue anyone. |
| **LISTEN FOR** | Answers that show understanding, and answers that reveal a misconception. |
| **IF STUCK** | A smaller question or hint that gets the room moving again. |
| **WATCH OUT** | The misconception this slide exists to prevent. |
| **BRIDGE** | The sentence that hands off to the next slide. |

Times are the slide minutes from the Day 1 outline. They add up to 105 minutes. The session is booked for 115, which leaves about 10 minutes of slack for questions. Spend it in Read and Verify, not at the start.

---

## At a glance

| Chapter | Slides | Minutes | What the room should leave with | Main interaction |
|---|---|---|---|---|
| Recognize | 1 to 3 | 9 | Repetition makes a task a candidate. Vague words hide rules. | "Who did this list this week?" Rewrite a vague step. |
| Translate | 4 to 9 | 21 | A script is the checklist, written exactly. Tool fits workflow. | Sort three tasks. Prediction board. Match five terms. |
| Read | 10 to 15 | 29 | How to trace a script: function, variables, rows, condition, loop, services. | Predict each trace step before revealing it. |
| Break | | 5 | | Timer on screen. |
| Run | 16 to 19 | 22 | The run is the same five steps. Completed is not the same as correct. | Narrate the run as a room. Rerun vs append. |
| Verify | 20 to 24 | 19 | Errors have locations. Triggers have owners. Understanding means tracing. | Break it on purpose. Three predictions. Preview the Day 2 workbook. |

---

## Before the session

**Two days before**

- [ ] Open the page and click through every interactive piece once: the sort (slide 7), term matching (slide 9), the Read chapter, the full run (17), the check and rerun buttons (18), the error lab (20), predictions (23) and the Day 2 workbook tabs (24).
- [ ] Prepare the sandbox copy of the workbook with its bound script. Check the sheet names match exactly: `employees.master_roster` and `training.active_roster`.
- [ ] Run the script once yourself in the sandbox so you have seen the authorization prompt and know what it looks like on your account.
- [ ] Decide how people will answer: hands, sticky notes, a shared doc, or the meeting chat. Pick one and tell people at the start.

**On the day**

- [ ] Open the page full screen. Press **P** for presenter mode, **N** for notes, **T** for timing.
- [ ] Put a "Parking lot" somewhere visible (whiteboard, flip chart, or a pinned chat message) for questions that belong to Day 2.
- [ ] Put a "Prediction board" next to it. You will write one number on it during slide 8 and come back to it at slide 18.
- [ ] Have a pen. You will write down two or three things people say and quote them back later. Nothing builds trust faster.

**Presenter keys** (press **P** first)

| Key | Action |
|---|---|
| PgDn, Space, Right, Down | Next step |
| PgUp, Left, Up | Previous step |
| N | Speaker notes |
| T | Timing |
| F | Full screen |
| Esc | Leave presenter mode |

---

## Interaction toolkit

The script refers to these by name. Each one is designed so that **everyone** answers, not just the fastest person.

- **Think, then show.** Ask, then say "Don't answer yet. Ten seconds to think." Then everyone shows at once: hands, fingers (1, 2, 3 for options) or chat.
- **Chat waterfall** (remote). Everyone types the answer in chat but does not press Enter until you say "Go." This stops the first answer from steering everyone else.
- **Pair and share.** Ninety seconds with the person next to you, then call on two pairs. In remote sessions, use breakout rooms only if you have time; otherwise use the waterfall.
- **Fist to five.** "How confident are you that you could explain this to a colleague? Zero fingers is not at all, five is completely." Anything under three from several people means slow down.
- **Say it back.** Ask a volunteer to explain the last idea in their own words. Thank them, then fix only what is wrong.
- **Wrong on purpose.** State something incorrect and ask the room to correct you. Use sparingly and always resolve it clearly.

**Rule for every question:** wait. Silence for five seconds feels long to you and normal to them. If nobody answers after that, use the **IF STUCK** line, not the answer.

**When someone answers wrong:** find the part that is right, say it, then ask the room the narrower question that exposes the rest. "You're right that it starts at the top. What's in the very first row?"

---

## The analogy, and where it stops

The page is a photo edit. A weekly report done by hand is like editing every photo yourself, slider by slider, every week. A script is that edit **saved once as a preset**, checked, then applied in one tap as often as needed. Almost everyone in the room has used one: a Lightroom or VSCO preset, a CapCut template, a saved filter.

| Lesson | In the edit | One line you can use |
|---|---|---|
| Recognize | Editing the same kind of photo by hand, Monday to Friday | "We're doing every edit by hand." |
| Clarify | A vague word is not a setting | "'Make it pop' isn't a setting. 'Exposure +0.3' is." |
| Translate | Saving each instruction as one adjustment | "Same edit, now saved." |
| Read | The edit stack; the three columns show the same adjustment **in sync** | "When the same step lights up in all three, it's in sync." |
| Run | Applying the preset to the whole batch | "One tap. Watch the batch." |
| Verify | Before/after: compare it against the manual filter, fix the setting that's off | "A preset applies a bad setting just as fast as a good one." |
| Triggers | Auto-apply on import | "Who set it to auto-apply, and whose account is it running on?" |

**Where it stops.** Say this out loud once, at slide 4: a preset applies exactly the settings that were saved. So does a script. Neither one notices that a setting was wrong for this photo. That is why Verify exists.

Use the analogy to open and close a chapter, not on every slide. Once the real terms arrive, use the real terms.

---

## Threads that run through the whole day

Keep coming back to these three. They are what makes the day feel like one story instead of 24 slides.

1. **Priya Nair.** She is sheet row 3, `values[2]`, Status `Active`. The Read chapter follows her record. Whenever an idea gets abstract, ask "What happens to Priya?"
2. **The prediction board.** At slide 8 the room predicts how many people make the active list. At slide 17 the run answers it. At slide 18 you check it.
3. **The word "NULL".** Tomas Villanueva's Status is the four letters N, U, L, L. It is text, not missing data, and it is not `Active`. It appears at slide 8, 13, 17, 18 and 23. By the end, the room should spot it before you do.

---

# Chapter 1: Recognize (9 minutes)

**Energy:** calm. You are not selling anything yet. You are naming something they already know.

## Slide 1 · A reporting routine can become a reusable instruction. (2 min)

**DO.** Start on the hero, still. The procedure sheet is lying on the desk. Don't scroll yet.

**SAY.**
> "Good morning. Before we look at a single line of code, look at the sheet on the desk. Five steps: open the roster, identify active employees, select the fields, prepare the output, check the results. Some of you did exactly this, or something very like it, this week.
>
> By the end of today you'll be able to do three things: explain what a small Apps Script does, trace what goes in and what comes out, and say where a person still has to check. That last one matters most.
>
> One thing I want to be clear about: this is not a programming course. It's a reporting course that happens to end in a script."

**ASK** (show of hands, no wrong answers): "Hands up if you've ever followed a list like this one so many times you could do it half asleep."

**DO.** Count the hands out loud: "Most of the room." Then scroll.

**WATCH OUT.** People who think "I'm not technical" will decide in the first two minutes whether this session is for them. The "reporting course" line is for them.

**BRIDGE.** "Before any code, let's look at how often we already repeat this list."

## Slide 2 · Repeated reporting requires us to repeat the same instructions. (4 min)

**DO.** Let the week scroll past. Don't talk over it.

**SAY.**
> "Open, identify, select, prepare, check. Then again tomorrow, in the same order, by hand. Notice it's not hard. Nothing on this list is hard. What makes it a candidate for a script is that it comes back."

**ASK** (pair and share, 90 seconds): "Tell your neighbour one report you build that follows the same steps every time. What's the step you'd most like to never do by hand again?"

**DO.** Call on two pairs. Write their reports on the parking lot or a side board. You will reuse one of them at slide 24.

**LISTEN FOR.** Tasks with a clear trigger and clear steps (good candidates). Also listen for anyone who says "it saves X hours". Gently move off it.

**WATCH OUT.** "Automation is justified by time saved." We are not claiming a time saving today, and we're not inventing one.

> "I'm not going to put a number of hours on a slide. I don't have that number for your work, and neither does anyone else in this room yet. The reason is simpler: it repeats."

**BRIDGE.** "If we repeat it, it has to be written down well enough for someone else to follow."

## Slide 3 · Automation starts with a procedure another person could follow. (3 min)

**DO.** Reveal each amber word, one at a time, then its replacement.

**SAY.**
> "Each vague word hides a business rule. A script can't guess it, so we write it down."

**ASK** before each reveal (think, then show): "If I handed this step to a new hire on their first day, what would they ask me?"

| Vague step | The word | What a new hire would ask | The explicit step |
|---|---|---|---|
| Find the current people. | current | "Current as of when? Who counts?" | Keep records whose Status is exactly Active. |
| Grab the usual columns. | usual | "Which ones? In what order?" | Take Employee_ID, Employee_Name and Account_Name, in that order. |
| Put it in the report. | the report | "Which tab? Add to it or replace it?" | Replace the contents of training.active_roster. |
| Check it looks right. | looks right | "Right compared to what?" | Confirm the IDs and the count match a manual filter. |

**LISTEN FOR.** "What about people on leave?" or "What if the status is blank?" Those are perfect. Say: "Exactly. That's a business rule. Hold onto it; the data has a blank in it and we'll meet it."

**WATCH OUT.** "The script will work out what 'current' means." It won't. It does what it's told.

**SAY** (the preset line):
> "You can't save 'make it pop' as a preset. You can only save exact settings: exposure plus 0.3, contrast plus 10. Same here. 'Current' has to become 'Status is exactly Active'."

**BRIDGE.** "An explicit procedure is already most of a program. Let's write its twin."

---

# Chapter 2: Translate (21 minutes)

**Energy:** sharpening. This is where "oh, it's just my checklist" should happen.

## Slide 4 · A script expresses that procedure in executable steps. (3 min)

**DO.** Keep the checklist in place and let the code appear beside it. Then walk down the mapping table.

**SAY.**
> "Keep the checklist. Write its executable twin beside it. I'm going to introduce these words once, here, and from now on I'll use the real terms."

Walk the table top to bottom, pointing at the right-hand column each time:

| Familiar | Programming term | In our script |
|---|---|---|
| A named procedure | Function | line 1 |
| Information used during the procedure | Variables | lines 3 to 5 |
| A table of records | Arrays | `values`, `output` |
| An inclusion rule | Condition | line 10 |
| "Repeat for every employee" | Loop | line 8 |
| A scheduled reminder | Trigger | not used today |

**SAY** (the boundary, out loud, slowly):
> "Here's where the comparison stops. A script executes encoded instructions. It does not infer missing business rules, and it doesn't check whether the reporting definition is correct. A preset applies exactly the settings you saved, bad ones included. So does this."

**ASK** (fist to five): "How comfortable are you with the idea that the script is just the checklist, written exactly?"

**BRIDGE.** "Where does this kind of instruction belong among the tools we already use?"

## Slide 5 · The workflow determines the appropriate tool. (4 min)

**DO.** Walk the three **task rows**, not the tool columns.

**SAY.**
> "Excel automates too. Power Query, macros, Office Scripts: all real. So the question isn't which tool is better. It's where the workflow already lives. Ours lives in Google Workspace."

**ASK** (think, then show, three fingers): "For each row, put up one, two or three fingers. One: I'd use a formula. Two: I'd prepare it in Excel. Three: I'd want a script."

- "Calculate a value in every row."
- "Prepare and reshape data."
- "Coordinate Sheets, Forms, Drive and Gmail."

**LISTEN FOR.** Disagreement on row two is healthy. Let one person from each side explain. The answer is "it depends where the data is", and the table says so in its "Also workable" column.

**WATCH OUT.** "Excel can't automate." It can. If an Excel person in the room bristles, agree with them. You win the room by being fair to the tool they know.

**BRIDGE.** "Apps Script matters here because our work lives in Google Workspace. So what is it, actually?"

## Slide 6 · Apps Script connects instructions to Google Workspace services. (4 min)

**DO.** Point at the two colours in the code: JavaScript logic (runs in memory) and service calls (talk to Workspace).

**SAY.**
> "Two kinds of line. Most lines are plain JavaScript running in memory: compare, count, collect. A few lines are service calls. That's where the script actually touches Sheets, Forms, Drive or Gmail."

**ASK** (chat waterfall or hands): "Look at the code. Guess: are most lines talking to Google, or most lines thinking on their own?"

**LISTEN FOR.** "Most lines are logic." That's right. Then make the point: "That's why it's fast. It reads the sheet once, thinks in memory, writes once. You'll see that at slide 15."

**WATCH OUT.** "Every line talks to Google."

**BRIDGE.** "Not every reporting task has rules clear enough to hand over. Let's sort some."

## Slide 7 · Clear rules make a task easier to automate. (4 min)

**DO.** **Have the room sort before you click anything.** Then click the answers on the page so the feedback shows.

**SAY.**
> "Three tasks. For each one, does it have a rule a script can execute, or does it need a person's judgment?"

**ASK** (think, then show: thumbs up for "clear rule", thumbs sideways for "needs judgment"). One task at a time:

1. "Extract the active roster every morning." **Clear rule.** The inclusion rule is explicit: Status is Active.
2. "Run the standard data checks on a new extract." **Clear rule.** Each check is a stated condition a script can test.
3. "Explain an unexplained drop in performance." **Needs judgment.** No written rule exists yet. It needs investigation and context.

**LISTEN FOR.** On task 3, someone may say "a script could pull the numbers". Yes, and that's a great distinction:

> "Right. A script can gather the evidence. It can't decide what the evidence means. Gathering has rules. Explaining doesn't, yet."

**WATCH OUT.** "Anything repetitive should be automated, including interpretation."

**BRIDGE.** "Our first workflow is the clearest of the three: the active roster."

## Slide 8 · Our first workflow produces a verifiable active-employee list. (3 min)

**DO.** Show the roster. Point at the label: **sample data, names are fictional**. Point at the two amber cells: the text "NULL" (Tomas, row 5) and the empty cell (Ines, row 10).

**SAY.**
> "This is `employees.master_roster`. Four columns matter today: Employee_ID, Employee_Name, Account_Name and Status. The output goes to its own tab, `training.active_roster`, so the source is never touched. We never write to the roster.
>
> And let me say the scope literally: records marked Active in the supplied roster. Not historical headcount, not who's on leave. Exactly what the Status column says."

**ASK** (this is the **prediction board**, chat waterfall or written on sticky notes): "Count them now, by eye. How many people will be on the active list?"

**DO.** Write the room's most common answer on the prediction board. Also write any other answers that came up. **Don't reveal.**

**ASK** (follow-up, hands): "Two cells are marked amber. Tomas says NULL. Ines is empty. Hands up if you counted either of them as active."

**SAY.**
> "Hold that thought. We'll find out exactly what the script does with both."

**BRIDGE.** "Five words will carry the rest of the day."

## Slide 9 · Each programming term describes a familiar part of the task. (3 min)

**DO.** Participants match each term to a procedure step using the dropdowns, then press **Check matches**. If presenting to a room, read each term and let the room call the match before you choose it.

**SAY.**
> "Don't memorise these. Matching is enough. Each one gets its own slide next."

| Term | Example | Matches |
|---|---|---|
| value | `'Active'` | The word written in the Status cell |
| variable | `const values` | The copy of the roster we work from |
| function | `buildActiveRoster()` | The named procedure: prepare the active list |
| condition | `if (row[3] === 'Active')` | The inclusion rule |
| loop | `for (let i = 1; ...)` | Repeat for every employee |

**ASK** (fist to five, after checking): "How confident are you with these five words right now?" Expect threes. That's fine. Say so:

> "Threes are perfect. The next six slides turn those into fives."

**BRIDGE.** "Start with the container for everything: the function."

---

# Chapter 3: Read (29 minutes)

**Energy:** concentrated. This is the heart of the day. Go slower than feels natural.

**How the Read chapter works.** One pinned stage, three columns: the procedure, the code, and what happens to the data. Each scroll step lights the same step in all three. On the page that's called **the sync**: one adjustment synced across three views, joined by a line with a slider knob at each end.

**SAY** (once, at the start of the chapter):
> "One instruction at a time. Watch the sync: the same step lights up in all three columns. Procedure on the left, code in the middle, the data on the right. If you lose your place, look for the lit line."

**The rhythm for every slide in this chapter:**
1. Show the code line. **Before stepping forward, ask the room to predict what happens.**
2. Step forward. Read the narration on screen.
3. Ask one "What happens to Priya?" question.

## Slide 10 · A function groups instructions under one name. (4 min)

Four steps. Predict before each.

| Step | Lines | Ask before revealing | What the page says |
|---|---|---|---|
| 1 | 1 | "We've written `function buildActiveRoster()`. Has anything happened to the sheet yet?" | Writing it runs nothing. |
| 2 | 2 | "This line starts with `//`. What do you think Apps Script does with it?" | A comment explains intent; Apps Script ignores it. |
| 3 | 1, 20 | "Where does the procedure start and end?" | The braces `{ }` mark the start and end. |
| 4 | 3 to 5 | "Now someone presses Run. Which line runs first?" | Lines run top to bottom. |

**WATCH OUT.** "Writing the function runs it." The preset version helps: "Saving a preset doesn't edit anything. Nothing changes until you apply it."

**SAY** (the comment, worth a moment):
> "Line 2 is the most underrated line in the script. It says what the code is for in plain English. When you inherit someone else's script in six months, that line is the one you'll thank them for."

**BRIDGE.** "Inside the function, the procedure needs somewhere to hold values."

## Slide 11 · Variables hold the values a procedure needs. (5 min)

Five steps. This slide uses a short teaching excerpt, not the main script.

```js
const sheetName = 'employees.master_roster';
const status = 'Active';
let activeCount = 0;
const isActive = status === 'Active';
activeCount = activeCount + 1;
```

| Step | Ask before revealing | Answer |
|---|---|---|
| 1 | "`const` and some text in quotes. What kind of value is this?" | A string: text in quotes. `const` will not be reassigned. |
| 2 | "Why store the rule in a variable instead of typing it later?" | Stored once, used later; one place to change it. |
| 3 | "This one says `let`, not `const`. Why might that be?" | `let` can change. This is a number. |
| 4 | "Line 4 has three equals signs. What do you think the answer is?" | `===` compares. The answer is a boolean: `true`. |
| 5 | "And line 5 has only one. What's `activeCount` now?" | `=` assigns. `activeCount` is now `1`. |

**WATCH OUT.** This is the biggest trap of the day: `=` versus `===`.

**SAY** (write it on the board and leave it there all day):
> "One equals sign **puts** a value into a box. Three equals signs **asks a question** and gets true or false back."
>
> `=` puts &nbsp;&nbsp;&nbsp; `===` asks

**ASK** (say it back): "Someone tell me in your own words the difference between one equals sign and three."

**BRIDGE.** "The biggest value we hold is the whole table."

## Slide 12 · Reading a sheet produces rows and values that code can address. (5 min)

Four steps.

```js
const values = source.getDataRange().getValues();
values[0]      // the header row
values[2]      // sheet row 3: Priya Nair
values[2][3]   // column D of that row
```

**SAY.**
> "`getValues` reads the whole table into memory as rows of cells. A list of rows, and each row is a list of cells. Like a camera roll: a list of photos, and each photo has its details in the same order."

**ASK** before step 2 (chat waterfall): "The header is the very first row. What number do you think the code uses for it?"

**LISTEN FOR.** Many will say 1. That's the sheet's number, not the array's.

**ASK** before step 3, **the key question of the slide** (think, then show, fingers): "Priya is on sheet row 3. What number does the code use to reach her row? Show me with your fingers."

**DO.** Count the fingers out loud. Expect a mix of 2s and 3s. Then reveal: `values[2]`.

**SAY.**
> "Sheets count from 1. Arrays count from 0. And the header takes slot 0. So sheet row 3 is `values[2]`. This trips up everyone, including people who've written code for years. If you get it wrong this week, you're in good company. Just check it."

**ASK** before step 4: "Status is column D. A is 0, B is 1, C is 2. So D is...?" (3.) "So Priya's status cell D3 is `values[2][3]`. What's in it?" (`"Active"`.)

**WATCH OUT.** "Sheet row 3 is `values[3]`."

**DO** (optional, if the room is with you): Quick drill, rapid fire. "Header? `values[0]`. Sheet row 2, Amara? `values[1]`. Sheet row 5, Tomas? `values[4]`."

**BRIDGE.** "Now we can ask a question of one record."

## Slide 13 · A condition makes an inclusion rule explicit. (5 min)

Script lines 9 to 12. Four steps, three people.

```js
    const row = values[i];
    if (row[3] === 'Active') {
      output.push([row[0], row[1], row[2]]);
    }
```

**SAY.**
> "The sentence 'include employees whose Status is Active' becomes one `if`. Read it out loud with me: if row-three-of-the-record equals exactly the word Active."

**DO.** For each person, **ask first, then step**. Use thumbs up (included) or thumbs down (skipped).

| Person | Status cell | Ask | Answer |
|---|---|---|---|
| Priya Nair | `Active` | "Thumbs: is Priya in?" | `'Active' === 'Active'` is true. Included. |
| Jonah Park | `Inactive` | "Thumbs: is Jonah in?" | False. The push is skipped. |
| Tomas Villanueva | `NULL` | "Thumbs: is Tomas in?" | The text "NULL". Four letters, not missing data, and not Active. Skipped. |

**LISTEN FOR.** On Tomas, some people will hesitate or say "it's an error" or "it's empty". This is the moment.

**SAY.**
> "In the database world NULL means 'no value'. But in this sheet, somebody typed the four letters N, U, L, L. To the script that's just a word, like 'Banana'. And 'Banana' isn't 'Active'."

**ASK** (extension, not on the slide; good for a fast room): "Ines Tan's Status cell is completely empty. Is she in?" (No. An empty cell is an empty string, and that isn't `'Active'` either.) "So the rule handles both of them the same way, for different reasons."

**WATCH OUT.** "'NULL' in the sheet is JavaScript null."

**DO.** Glance at the prediction board. "Did anyone count Tomas or Ines on slide 8? You might want to revise."

**BRIDGE.** "One record at a time is fine for three. We need it for every record."

## Slide 14 · A loop applies the rule to each record. (5 min)

Script lines 7 to 13. Five steps.

```js
  const output = [['Employee_ID', 'Employee_Name', 'Account_Name']];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[3] === 'Active') {
      output.push([row[0], row[1], row[2]]);
    }
  }
```

**ASK** before anything moves (chat waterfall): "The loop says `let i = 1`. Arrays start at 0. So why does this start at 1?"

**LISTEN FOR.** "To skip the header." If nobody gets it: "What's in `values[0]`?"

**DO.** Follow the lit row down. Before each step, ask "Does output grow?"

| Step | i | Record | Output grows? | Output rows after |
|---|---|---|---|---|
| 1 | | (header written) | | 1: the header |
| 2 | 1 | Amara Reyes, Active | Yes | 2 |
| 3 | 2 | Priya Nair, Active | Yes | 3 |
| 4 | 3 | Jonah Park, Inactive | No | 3 |
| 5 | | (repeats until `i` reaches `values.length`) | | |

**SAY.**
> "The loop is the most boring part of the script, and that's the point. Every record meets exactly the same rule. No record gets special treatment because it's late on a Friday."

**ASK** (say it back): "In one sentence, what does the loop do?"

**WATCH OUT.** "The loop starts at 0."

**BRIDGE.** "The logic is done. How does it reach the spreadsheet?"

## Slide 15 · Apps Script services connect the logic to the spreadsheet. (5 min)

Four steps. Light each link of the chain, then show the three phases.

| Step | Lines | SAY |
|---|---|---|
| 1 | 3 | "`SpreadsheetApp.getActiveSpreadsheet()` returns the spreadsheet this script is bound to." |
| 2 | 4 | "`.getSheetByName(...)` reaches one sheet. The dot reaches into something; the parentheses do it." |
| 3 | 5 | "`.getDataRange()` selects the used range, and `.getValues()` reads it in one call." |
| 4 | 5, 18 | "Read once, process in memory, write once." |

**SAY** (the analogy for the dot chain):
> "Read it like an address. The spreadsheet, then the sheet inside it, then the range inside that, then the values. Each dot is 'go inside'."

**ASK** (wrong on purpose): "I've got a great idea. Instead of reading the whole sheet, let's read and write one cell at a time. Simpler, right? Who wants to tell me why that's a bad idea?"

**LISTEN FOR.** "It's slower", "more calls to Google". Confirm: every service call is a trip to Google. Two big trips beat two hundred small ones.

**WATCH OUT.** "Reading and writing cell by cell is fine."

**DO** (end-of-chapter check, fist to five): "Could you point at the line in this script that decides who's included?" Anyone below three: "Line 10. That's the one. If you only remember one line number today, make it 10."

**BRIDGE.** "After the break, we run it."

---

## Break · 5 minutes

**DO.** Click **Start the 5:00 break**. Leave the plain-language procedure on screen. The page shows the editing desk at rest under one lamp: laptop closed, phone face down.

**SAY.**
> "Five minutes. When you come back, the press runs. Before you go, look at the prediction board and decide if you want to change your number."

**DO** (during the break): Re-read the prediction board. Note the most popular wrong answer; you'll name it gently after the run.

---

# Chapter 4: Run (22 minutes)

**Energy:** grounding at slide 16, the loudest moment of the day at 17, then trust at 18.

## Slide 16 · A script needs the correct file, target sheet, and permissions. (5 min)

**DO.** Point at the label: **this is a schematic, not a screenshot.** Then switch to the prepared sandbox copy to show the real editor if you have it.

**SAY.**
> "Four things to find in the editor. The code, in `Code.gs`. The Run button, after you choose `buildActiveRoster` from the list. The execution log, which shows started, your log line, and completed or an error. And the authorization prompt."

**SAY** (slow down here; this is the slide that saves you support messages on Day 2):
> "The first time you run it, Google will show a scary-looking box asking you to allow the script to act as you. That is not an error. It's a permission. It's asking: 'May this script read and write your spreadsheet, as you?' Because it acts with your access."

**ASK** (hands): "Who's seen a box like that before and closed it because they thought something broke?" (Some hands. Laugh with them.)

**WATCH OUT.** "The authorization prompt is an error."

**BRIDGE.** "Everything is in place. Run it."

## Slide 17 · The script follows the procedure we already understand. (7 min)

This is **the peak**. On the page, the whole script runs against the sample roster, one record per step, and when the output is written the preset is applied: a before/after divider sweeps across the stage and the active roster develops from flat to full.

**DO.** Before you start, point at the prediction board.

**SAY.**
> "Before the run: our prediction was [read the board]. Let's find out."

**DO.** Step through. **Let the room narrate.** For each record, before you step, ask "In or out?" and let them call it together. It should start to feel like a chant by the fifth row.

| Record | Status | Room calls | Result |
|---|---|---|---|
| Amara Reyes | Active | In | Included |
| Priya Nair | Active | In | Included |
| Jonah Park | Inactive | Out | Skipped |
| Tomas Villanueva | the text "NULL" | Out | Skipped |
| Grace Mendoza | Active | In | Included |
| Rafael Ocampo | Active | In | Included |
| Lea Dizon | Inactive | Out | Skipped |
| Marco Bautista | Active | In | Included |
| Ines Tan | an empty cell | Out | Skipped |
| Kai Robles | Active | In | Included |

**DO.** Stop on two moments.

- **The status rule** (any row): "Same line 10, every time. Same rule for everyone."
- **The write** (line 18): Stop talking. Let the divider pass and the roster develop. Count two seconds of silence. Then:

> "Six. Six active employees, written in one call to `training.active_roster`."

**DO.** Turn to the prediction board.
> "We predicted [number]. [If right:] Well done. [If not:] Who counted Tomas? Who counted Ines? That's not a mistake on your part; that's the exact trap the rule is designed for."

**DO.** Point at the log and its label: **simulated in your browser with the sample roster, same logic, same result as Apps Script.**

**WATCH OUT.** "The script is doing something new." It's the same five steps you did by hand.

**ASK** (say it back): "Which of the five steps on the procedure sheet did the script just do?" (All five. Step 5 is the log line, which leads straight into the check.)

**BRIDGE.** "A completed execution is not yet a correct result."

## Slide 18 · A completed execution still requires an output check. (5 min)

**SAY.**
> "'Execution completed' means the script didn't crash. It doesn't mean the answer is right. A preset can apply cleanly and still be wrong for the photo. So we do a before/after and check it against something we trust: a manual filter, done the way you'd do it in the sheet."

**DO.** Walk the three checks on screen. For each one, ask the room to confirm by eye before you say "pass".

1. Included IDs match: 6 of 6.
2. Field order: Employee_ID, Employee_Name, Account_Name.
3. Excluded records accounted for: E-1043 (Inactive), E-1044 (the text "NULL"), E-1047 (Inactive), E-1049 (an empty cell).

**ASK** (prediction, chat waterfall) **before pressing anything**: "If I press Run again, how many rows will `training.active_roster` have?"

**DO.** Press **Run again**. It stays at 6. No duplicates.

**ASK**: "Now if the script appended instead of clearing first, and I press Run again, how many?"

**DO.** Press **Reset**, then **Run again, appending instead**. It jumps to 12, flagged as duplicates.

**SAY.**
> "That's why line 17 clears before line 18 writes. Clear, then write. Never append blindly. Imagine that report scheduled every morning for a month."

**DO.** Press **Reset** to leave the page clean.

**WATCH OUT.** "'Execution completed' means the output is right."

**BRIDGE.** "The same verified output can feed a wider workflow."

## Slide 19 · The same procedure can support a wider reporting workflow. (5 min)

**DO.** Show the Gmail draft. Point at the label: **prepared example, the draft body is computed from the output above, and a draft is created, never sent.** Then the adjacent examples, and their label: **separate from the workbook**.

**SAY.**
> "Here's the payoff of having a verified list. The same output can feed the next step. This example creates a Gmail draft with a summary: 'Active roster refreshed. 6 active employees written to training.active_roster.' It's a draft. A person still reads it and decides to send it."

**SAY** (the adjacent examples):
> "Two more, separate from today's workbook: a form collects requests and the responses land in a sheet this same procedure could read; and a copy of the verified list gets filed in Drive with a dated name. Same idea each time. Read, apply a rule, write somewhere."

**ASK** (pair and share, 2 minutes): "Go back to the report you named at slide 2. If it were a script, what would be the next step after it writes the output? Who gets told, and how?"

**DO.** Take two answers. Add good ones to the parking lot for Day 2.

**WATCH OUT.** "These are part of the workbook." They're separate, prepared examples.

**BRIDGE.** "Now let's break it on purpose."

---

# Chapter 5: Verify (19 minutes)

**Energy:** a little tension at 20, responsibility at 21 and 22, confidence at 23, resolve at 24.

## Slide 20 · An error becomes actionable when its location and cause are visible. (5 min)

**SAY.**
> "Break it on purpose, then decide when it should run and who is responsible. Three kinds of thing can go wrong, and they look very different."

**DO.** Walk the table briefly.

| Kind | What you see | Where to look |
|---|---|---|
| Syntax error | Won't save or run. A missing brace or quote. | The editor marks the line before anything runs. |
| Execution error | Starts, then stops with a message and a line number. | The execution log. |
| Incorrect result | Completes. The output is wrong. | Only an output check finds it. |

**DO.** Go to the error lab. The sheet name is already misspelled on purpose: `employees.master_rooster`.

**ASK** (chat waterfall) **before pressing Run**: "Read line 4 carefully. Will this work? If not, which line do you think will fail?"

**LISTEN FOR.** Most will spot "rooster". Fewer will guess the failure is on line **5**, not line 4. That's the interesting bit.

**DO.** Press **Run**. Read the log line by line, out loud:
> "TypeError: Cannot read properties of null, reading 'getDataRange'. At buildActiveRoster, Code.gs, line 5."

**SAY.**
> "Here's how to read that. Line 4 asked for a sheet called 'rooster'. No such sheet, so it got back `null`: nothing. Line 5 then tried to call `getDataRange` on nothing. The error shows up on line 5, but the cause is on line 4. Errors point at where it hurt, not always where the mistake is. So always look one line up."

**DO.** Fix the name to `employees.master_roster`. Run. Completed, 6 rows.

**DO.** Now the dangerous one. Change Status to lowercase `active`.

**ASK** (thumbs): "Will this one throw an error?"

**DO.** Press **Run**. It completes. Zero rows.

**SAY.**
> "No error. Execution completed. And it wrote nothing. Lowercase 'active' isn't 'Active': case matters. This is the worst kind of problem, because nothing tells you. Only an output check catches it. That's why slide 18 exists."

**WATCH OUT.** "Every error stops the script."

**DO.** Set Status back to `Active`.

**BRIDGE.** "Running it by hand is one option. Triggers change when, and as whom, it runs."

## Slide 21 · Triggers change when a function runs and whose authority it uses. (4 min)

**DO.** Walk the three rows. **Stop on the "Runs as" column.**

| Execution | When it runs | Runs as |
|---|---|---|
| Manual | When you press Run | You |
| Simple trigger | On a fixed event such as onOpen or onEdit | The person who caused the event |
| Installable trigger | On a schedule, form submit, or a change you configure | The account that created the trigger |

**SAY** (preset line):
> "This is auto-apply on import. Two questions: when does it fire, and whose account is it running as?"

**ASK** (pair and share, 90 seconds): "You set up a trigger to run this every morning. Six months later you move to another team and your account loses access. What happens to the report?"

**LISTEN FOR.** "It breaks", "it runs as me and fails", "nobody notices". All good. Make the point:
> "Ownership matters when people leave. A scheduled script needs an owner the way a report needs an owner."

**SAY** (two facts worth stating plainly):
> "Scheduled runs happen within a window, not at an exact second. And simple triggers can't use services that need authorization, like Gmail."

**WATCH OUT.** "A scheduled trigger runs at an exact second, or as the person who opens the file."

**BRIDGE.** "Unattended automation brings operating responsibilities."

## Slide 22 · Reliable automation depends on controlled inputs and maintained rules. (4 min)

**DO.** Read each pair left to right: the advantage, then the condition it needs.

**ASK** (pair and share, 90 seconds): "Pick one pair. Tell your neighbour about a time a manual report went wrong for exactly that reason." Take two stories.

**DO.** Map their stories back to the pairs:

| If the story is about... | It's this pair |
|---|---|
| A renamed sheet or column | Repeatability needs validated inputs |
| Someone lacking access | Integration needs permissions |
| Nobody noticing it failed | Unattended execution needs monitoring |
| It being slow or hitting a limit | Volume needs batch operations and quotas |
| Doubled rows | Reruns need safe replacement |
| "The definition of active changed" | Maintenance needs an owner |

**SAY.**
> "None of these are new problems. You already deal with all of them in manual reports. Scripting doesn't add them; it just means they happen with nobody watching."

**WATCH OUT.** "Quotas are something to memorise." They change. Keep current limits in the quotas reference linked on the page.

**BRIDGE.** "Check your understanding on three short tasks."

## Slide 23 · Understanding is visible when you can trace the next result. (4 min)

**SAY.**
> "Reading code doesn't mean memorising it. It means tracing it. Three questions. Answer before I click."

**DO.** For each question: chat waterfall or fingers, **collect everyone's answer**, then click.

| # | Question | Answer | Line |
|---|---|---|---|
| 1 | Tomas's Status cell holds the text "NULL". Is he included? | **No.** `'NULL' === 'Active'` is false. | 10 |
| 2 | Where does the result end up? | **training.active_roster.** Lines 15 to 18 find or create it, clear it, write there. | 15 to 18 |
| 3 | The team now wants Inactive records instead. Which line changes? | **Line 10.** Only the rule changes. Reading and writing stay the same. | 10 |

**DO.** After question 3, ask the follow-up:
> "If it's Inactive instead, how many rows do you expect?"
Answer: **2** (Jonah Park and Lea Dizon).

| Rule | Rows | Who |
|---|---|---|
| Active | 6 | Amara, Priya, Grace, Rafael, Marco, Kai |
| Inactive | 2 | Jonah, Lea |
| NULL | 1 | Tomas |

**DO** (fist to five, the last one of the day): "Could you trace this script for a colleague tomorrow?" Note the room. If most are fours and fives, say so out loud. They earned it.

**WATCH OUT.** "Reading code means memorising it."

**BRIDGE.** "Tomorrow you write one like it yourself. Here's what you'll work on."

## Slide 24 · Day 2 turns this demonstrated procedure into your own script. (2 min)

The slide is the headline drawn as a pair. Read it left to right: **this demonstrated procedure** is the paper card on the left (**Day 1 · traced today**), the arrow is **turns into**, and **your own script** is the pane on the right (**Day 2 · your script**). On a phone only the right pane shows.

**DO.** Start on the left card. It is the procedure from slide 3, and its last line names what it became: `buildActiveRoster()`, 20 lines.

**SAY.**
> "This is where we started this morning: five steps on paper. By now it's one function, twenty lines, and you can trace every one of them."

**DO.** Follow the arrow to the right pane. Point at the **Sandbox extract** label: a beginner-safe extract adapted to a public call-center dataset's schema, not real calls.

**SAY.**
> "Tomorrow you write one yourself: `buildWfmBeginnerReport()`. Same moves, new data: call-center calls instead of a roster."

**DO.** Point at the tool chips. Each one shows the line where today's script already used it. Only `else` is marked new.

**ASK.** "Which of these did you trace today?" (All but `else`. The `if` half of if/else is line 10.)

**DO.** Click through the four tabs under the sheet (arrow keys work too). The pane stays the same size, so the slide doesn't move.

| Tab | What the page shows |
|---|---|
| Raw Data | All 10 columns and the first two calls: Diane's (abandoned) and Becky's (answered). Below them, the counts: 120 calls, 8 agents, 5 days (2021-01-04 to 2021-01-08), 15 abandoned. Read only. |
| Cleaned Data | The script creates it: one row per call, so 120 rows. All 10 Raw Data columns plus six fields (Answered, Abandoned, Resolved and SLA flags, Talk Seconds, Wait Bucket), each with its rule. |
| Daily Summary | The script creates it: one row per date, so 5 rows, and its ten columns. |
| Agent Summary | The script creates it: one row per agent, so 8 rows, and its nine columns. |

The page shows what each tab must contain, never the computed answers. Counts above come from `src/data/day2.js`; if the workbook changes, the page follows it and this table must be updated.

**SAY** (on Raw Data, pointing at the two rows):
> "Two calls side by side. Becky's was answered: 25 seconds, rated 5. Diane's was abandoned, so her speed and rating are empty. All 15 abandoned calls look like that. Sound familiar? Empty is a value you have to decide about. That's Tomas's NULL all over again."

**SAY** (close):
> "This morning we started with a checklist on a desk. Now it's saved as a preset, checked against a manual filter, and you've watched it run. Day 2: you read, modify, run, inspect, and troubleshoot your own. And you won't start from nothing. You start from the moves you traced today."

**DO.** Point at the parking lot. "These are what we start with on Day 2." Then close.

**WATCH OUT.** "Day 2 needs new tools." Almost none: every tool on the list except `else` is already in today's script, at the line the chip shows.

---

## Exit ticket (2 minutes, or send it after)

Three questions, answered on a sticky note, a form, or in chat. Use them to decide where to start Day 2.

1. In one sentence: what does line 10 do?
2. Sheet row 7 is Rafael Ocampo. What does the code call his row?
3. A script finishes with "Execution completed". What's one thing you'd still check?

**Answers to look for.** (1) It keeps only records whose Status is exactly `Active`. (2) `values[6]`. (3) The count and IDs against a manual filter; the field order; that a rerun didn't duplicate rows.

If more than a third of the room misses question 2, open Day 2 with two minutes on counting from 0.

---

## Answer key

Computed from `src/roster.js` with the labelled sample roster. Names are fictional.

**The sample** (sheet row, ID, name, account, status)

| Row | `values[i]` | ID | Name | Account | Status | Included? |
|---|---|---|---|---|---|---|
| 1 | 0 | | (header) | | | |
| 2 | 1 | E-1041 | Amara Reyes | Northwind Retail | Active | Yes |
| 3 | 2 | E-1042 | **Priya Nair** | Harbor Telecom | Active | Yes |
| 4 | 3 | E-1043 | Jonah Park | Northwind Retail | Inactive | No |
| 5 | 4 | E-1044 | Tomas Villanueva | Harbor Telecom | the text "NULL" | No |
| 6 | 5 | E-1045 | Grace Mendoza | Summit Health | Active | Yes |
| 7 | 6 | E-1046 | Rafael Ocampo | Summit Health | Active | Yes |
| 8 | 7 | E-1047 | Lea Dizon | Northwind Retail | Inactive | No |
| 9 | 8 | E-1048 | Marco Bautista | Harbor Telecom | Active | Yes |
| 10 | 9 | E-1049 | Ines Tan | Summit Health | an empty cell | No |
| 11 | 10 | E-1050 | Kai Robles | Northwind Retail | Active | Yes |

**Results**

| Scenario | Result |
|---|---|
| Normal run | 6 rows written to `training.active_roster` |
| Run again (clear, then write) | Still 6 |
| Run again, appending | 12, with duplicates |
| Wrong sheet name on line 4 | `TypeError: Cannot read properties of null (reading 'getDataRange')` at `Code.gs:5` |
| Status `active` (lowercase) | Completes, 0 rows |
| Status `Inactive` | 2 rows: Jonah Park, Lea Dizon |
| Status `NULL` | 1 row: Tomas Villanueva |
| Gmail draft body | "Active roster refreshed. 6 active employees written to training.active_roster." |

**To recompute** after any change to the sample or the script:

```bash
node -e "const R=require('./src/roster.js');const r=R.run(R.makeWorkbook());console.log(r.output.length-1, r.output.slice(1).map(x=>x[1]).join(', '))"
```

**The script**, for reference (line numbers are the ones used all day):

```js
 1  function buildActiveRoster() {
 2    // Read the roster once, keep Active records, write the result once.
 3    const ss = SpreadsheetApp.getActiveSpreadsheet();
 4    const source = ss.getSheetByName('employees.master_roster');
 5    const values = source.getDataRange().getValues();
 6
 7    const output = [['Employee_ID', 'Employee_Name', 'Account_Name']];
 8    for (let i = 1; i < values.length; i++) {
 9      const row = values[i];
10      if (row[3] === 'Active') {
11        output.push([row[0], row[1], row[2]]);
12      }
13    }
14
15    let target = ss.getSheetByName('training.active_roster');
16    if (!target) target = ss.insertSheet('training.active_roster');
17    target.clearContents();
18    target.getRange(1, 1, output.length, 3).setValues(output);
19    Logger.log('Wrote ' + (output.length - 1) + ' active employees');
20  }
```

---

## Questions you are likely to get

**"Can I just use a filter view instead?"**
For a one-off, yes. A script earns its place when the steps repeat, feed another step, or need to run without you. Slide 5's question again: where does the workflow live?

**"Will this save me X hours?"**
"I don't have a number for your work, and I won't make one up. What I can say is that the steps stop depending on someone remembering them exactly." Then point at slide 22: it also comes with responsibilities.

**"What if someone renames the sheet?"**
Execution error on line 5, exactly what we saw at slide 20. That's the "validated inputs" pair on slide 22. Day 2 territory; add it to the parking lot.

**"What about trailing spaces, like 'Active '?"**
Excellent question. `'Active ' === 'Active'` is false, so that person would be skipped, silently. It's another incorrect-result case that only an output check catches. Parking lot for Day 2.

**"Does the script change the master roster?"**
No. It only reads `employees.master_roster`. It writes to `training.active_roster`.

**"Is this safe to give access to?"**
It acts with exactly the access you grant, as you (when run manually). That's what the authorization prompt asks. This page itself asks for no permissions at all.

**"Why JavaScript?"**
Apps Script is JavaScript plus Google's services. The logic lines on slide 6 are plain JavaScript; the service calls are what Apps Script adds.

**A question you can't answer.**
"I don't know. Let me put it on the parking lot and come back to you." Then actually come back.

---

## Recovery plays

**Running long.** Protect Read (slides 12 to 14), the full run (17), the output check (18), and the error lab (20). Compress slides 5, 6 and 22 to one minute each: say the headline, ask nothing, bridge.

**Room is quiet.** Switch to the chat waterfall or written answers; quiet rooms answer in writing. Ask smaller questions ("Thumbs: is Priya in?"), not bigger ones.

**One person answers everything.** "Great. Let's hear from someone who hasn't spoken yet," or use the waterfall so everyone answers at once.

**Someone is far ahead.** Give them the extension questions: Ines's empty cell (slide 13), the trailing-space question, or "What would you change to also include Account_Name 'Summit Health' only?"

**Someone is lost.** Bring them back to Priya. "Forget the code for a second. Is Priya on the list? Why?" Then show them the line that decided it.

**The page won't load or an interaction fails.** Everything in the answer key above is enough to teach from a whiteboard. Draw the sample table, write line 10, and trace by hand. The trace is the lesson; the page is the stage.
