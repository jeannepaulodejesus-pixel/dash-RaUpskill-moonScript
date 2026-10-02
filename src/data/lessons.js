/* PressRun content. Headlines are the deck's assertion headlines verbatim.
   Notes follow the deck's speaker-note structure: point, misconception, cue,
   bridge. Minutes come from the Day 1 outline (115 minutes in total). */
(function (root) {
  'use strict';

  var chapters = [
    { id: 'recognize', label: 'Recognize', slides: [1, 2, 3] },
    { id: 'translate', label: 'Translate', slides: [4, 5, 6, 7, 8, 9] },
    { id: 'read', label: 'Read', slides: [10, 11, 12, 13, 14, 15] },
    { id: 'run', label: 'Run', slides: ['break', 16, 17, 18, 19] },
    { id: 'verify', label: 'Verify', slides: [20, 21, 22, 23, 24] }
  ];

  function n(point, misconception, cue, bridge) {
    return { point: point, misconception: misconception, cue: cue, bridge: bridge };
  }

  var slides = {
    1: { min: 2, title: 'A reporting routine can become a reusable instruction.',
      notes: n('Day 1 outcome: explain what a small Apps Script does, trace its input and output, and say where a person still has to check.',
        'That this is a programming course. It is a reporting course that ends in a script.',
        'Point at the procedure sheet on the stone: the proof. It stays with us all day.',
        'Before any code, look at how often we already repeat this card.') },
    2: { min: 4, title: 'Repeated reporting requires us to repeat the same instructions.',
      notes: n('The same five steps recur every workday. The recurrence, not the difficulty, is what makes it a candidate.',
        'That automation is justified by a time-saving figure. We are not claiming one.',
        'Let the week slide past. Ask who has done this exact list this week.',
        'If we repeat it, it has to be written down well enough for someone else to follow.') },
    3: { min: 3, title: 'Automation starts with a procedure another person could follow.',
      notes: n('Ambiguous words (current, usual, looks right) hide business rules. A script cannot guess them.',
        'That the script will work out what "current" means.',
        'Reveal each amber word, then its explicit replacement.',
        'An explicit procedure is already most of a program.') },
    4: { min: 3, title: 'A script expresses that procedure in executable steps.',
      notes: n('Introduce the SOP-to-code mapping once, then use real terms from here on.',
        'That the analogy is exact. A script executes encoded instructions; it does not infer missing rules or check that the reporting definition is right.',
        'Keep the checklist in place and let the code appear beside it.',
        'Where does this kind of instruction belong among the tools we already use?') },
    5: { min: 4, title: 'The workflow determines the appropriate tool.',
      notes: n('Match tool to task: formulas calculate, Excel workflows prepare data, Apps Script coordinates Workspace.',
        'That Excel cannot automate. It can (Power Query, VBA, Office Scripts). The question is where the workflow lives.',
        'Walk the three task rows, not the tool columns.',
        'Apps Script matters here because our work lives in Google Workspace.') },
    6: { min: 4, title: 'Apps Script connects instructions to Google Workspace services.',
      notes: n('JavaScript supplies the logic; services (Sheets, Forms, Drive, Gmail) do the Workspace work.',
        'That every line talks to Google. Most lines are plain JavaScript running in memory.',
        'Point at the two colours in the code: logic and service calls.',
        'Not every reporting task has rules clear enough to hand over.') },
    7: { min: 4, title: 'Clear rules make a task easier to automate.',
      notes: n('Recurring extraction and standard checks have executable rules. Explaining an unexplained decline needs judgment.',
        'That anything repetitive should be automated, including interpretation.',
        'Have the room sort the three tasks before revealing.',
        'Our first workflow is the clearest of the three: the active roster.') },
    8: { min: 3, title: 'Our first workflow produces a verifiable active-employee list.',
      notes: n('Meet employees.master_roster and the four columns we use. Output goes to a separate tab, training.active_roster.',
        'That we will edit the source. We never write to the roster.',
        'Say the scope literally: records marked Active in the supplied roster. Not historical headcount.',
        'Five words will carry the rest of the day.') },
    9: { min: 3, title: 'Each programming term describes a familiar part of the task.',
      notes: n('Pre-train five terms against roster examples: value, variable, function, condition, loop.',
        'That these need memorising now. Matching is enough; each gets its own slide next.',
        'Participants match terms to procedure steps, then check.',
        'Start with the container for everything: the function.') },
    10: { min: 4, title: 'A function groups instructions under one name.',
      notes: n('Definition names the steps; execution runs them, top to bottom. Comments explain and are ignored.',
        'That writing the function runs it.',
        'Step through: name, comment, braces, then Run.',
        'Inside the function, the procedure needs somewhere to hold values.') },
    11: { min: 5, title: 'Variables hold the values a procedure needs.',
      notes: n('const holds a value that will not be reassigned; let can change. Strings, numbers, booleans.',
        'That = compares. One equals sign assigns; === compares and answers true or false.',
        'Watch each box fill as its line runs.',
        'The biggest value we hold is the whole table.') },
    12: { min: 5, title: 'Reading a sheet produces rows and values that code can address.',
      notes: n('getValues returns a two-dimensional array: a list of rows, each a list of cells.',
        'That sheet row 3 is values[3]. Sheets count from 1, arrays from 0, and the header is values[0].',
        'Trace Priya Nair from cell D3 to values[2][3].',
        'Now we can ask a question of one record.') },
    13: { min: 5, title: 'A condition makes an inclusion rule explicit.',
      notes: n('The sentence "include employees whose status is Active" becomes one if statement.',
        'That "NULL" in the sheet is JavaScript null. It is four letters of text, and it is not Active.',
        'Run Priya (Active), Jonah (Inactive) and Tomas ("NULL") through the same rule.',
        'One record at a time is fine for three. We need it for every record.') },
    14: { min: 5, title: 'A loop applies the rule to each record.',
      notes: n('The for loop visits every row after the header and the output array grows with each match.',
        'That the loop starts at 0. It starts at 1 to skip the header row.',
        'Follow the lit row down; watch the output gain a line only on matches.',
        'The logic is done. How does it reach the spreadsheet?') },
    15: { min: 5, title: 'Apps Script services connect the logic to the spreadsheet.',
      notes: n('spreadsheet, sheet, range, values. A dot reaches a property or method; parentheses call it.',
        'That reading and writing cell by cell is fine. Read once, process in memory, write once.',
        'Light each link of the chain, then show the three phases.',
        'After the break, we run it.') },
    'break': { min: 5, title: 'Break',
      notes: n('Keep the plain-language procedure on screen.', '', 'Start the timer if you are presenting.', 'When we return, the whole procedure runs.') },
    16: { min: 5, title: 'A script needs the correct file, target sheet, and permissions.',
      notes: n('Show the prepared sandbox copy and its bound script: code, Run, execution log, authorization.',
        'That the authorization prompt is an error. It asks you to allow the script to act as you.',
        'Use the prepared copy. Validate sheet names before the session.',
        'Everything is in place. Run it.') },
    17: { min: 7, title: 'The script follows the procedure we already understand.',
      notes: n('Guided live run. Pause at each SOP step as its lines execute.',
        'That the script is doing something new. It is the same five steps.',
        'Let the register travel. Stop on the status rule and on the write.',
        'A completed execution is not yet a correct result.') },
    18: { min: 5, title: 'A completed execution still requires an output check.',
      notes: n('Compare against a manual filter: included IDs, excluded records, field order, and a rerun that replaces rather than duplicates.',
        'That "Execution completed" means the output is right.',
        'Press Run again and watch the row count stay the same.',
        'The same verified output can feed a wider workflow.') },
    19: { min: 5, title: 'The same procedure can support a wider reporting workflow.',
      notes: n('A Gmail draft can carry a summary or link. Forms intake and Drive storage are adjacent examples.',
        'That these are part of the workbook. They are separate, prepared examples.',
        'Show the draft body computed from today\'s output.',
        'Now break it on purpose.') },
    20: { min: 5, title: 'An error becomes actionable when its location and cause are visible.',
      notes: n('A wrong sheet name fails at line 5 with a located message. Fix and rerun.',
        'That every error stops the script. An incorrect result can finish without any error.',
        'Type a wrong name, read the log line by line, then correct it.',
        'Running it by hand is one option. Triggers change when and as whom it runs.') },
    21: { min: 4, title: 'Triggers change when a function runs and whose authority it uses.',
      notes: n('Manual, simple and installable triggers differ in timing, authorization and ownership.',
        'That a scheduled trigger runs at an exact second, or as the person who opens the file.',
        'Walk the three rows; stop on "runs as".',
        'Unattended automation brings operating responsibilities.') },
    22: { min: 4, title: 'Reliable automation depends on controlled inputs and maintained rules.',
      notes: n('Each advantage comes with a condition: validation, permissions, monitoring, quotas, safe reruns.',
        'That quotas are something to memorise. Keep current limits in reference notes.',
        'Read each pair left to right.',
        'Check your understanding on three short tasks.') },
    23: { min: 4, title: 'Understanding is visible when you can trace the next result.',
      notes: n('Predict inclusion, locate the output destination, and find the line a rule change touches.',
        'That reading code means memorising it. It means tracing it.',
        'Collect predictions before revealing each answer.',
        'Tomorrow you change the rule yourself.') },
    24: { min: 2, title: 'Day 2 turns this demonstrated procedure into your own script.',
      notes: n('Return to the opening procedure, now paired with verified output. Day 2: read, modify, run, inspect, troubleshoot.',
        'That Day 2 starts from a blank editor. It starts from this script in the sandbox.',
        'Let the room change the rule and run it once.',
        'Close.') }
  };

  // The explicit SOP from slide 3. Index = step number - 1.
  var sop = [
    { vague: 'Open the roster.', clear: 'Open the sheet employees.master_roster.', word: null },
    { vague: 'Find the current people.', clear: 'Keep records whose Status is exactly Active.', word: 'current' },
    { vague: 'Grab the usual columns.', clear: 'Take Employee_ID, Employee_Name and Account_Name, in that order.', word: 'usual' },
    { vague: 'Put it in the report.', clear: 'Replace the contents of training.active_roster.', word: 'the report' },
    { vague: 'Check it looks right.', clear: 'Confirm the IDs and the count match a manual filter.', word: 'looks right' }
  ];

  var dailyChecklist = [
    'Open the roster',
    'Identify active employees',
    'Select the fields',
    'Prepare the output',
    'Check the results'
  ];

  /* The Read chapter: six beats on one pinned triptych.
     code: either script line numbers (from PressRoster.SCRIPT) or a teaching
     excerpt given as { excerpt: [...] } with its own numbering.
     Each step lights sop (index), code (line numbers) and a consequence state. */
  var read = [
    { slide: 10, kind: 'fn', code: [1, 2, 3, 4, 5, '…', 20],
      steps: [
        { sop: null, code: [1], cons: 'define', say: 'function gives the procedure one name: buildActiveRoster. Writing it runs nothing.' },
        { sop: null, code: [2], cons: 'comment', say: 'A line starting with // is a comment. It explains the intent; Apps Script ignores it.' },
        { sop: null, code: [1, 20], cons: 'braces', say: 'The braces { } mark where the procedure starts and ends.' },
        { sop: 0, code: [3, 4, 5], cons: 'run', say: 'Execution: pressing Run calls the function, and its lines run top to bottom.' }
      ] },
    { slide: 11, kind: 'vars', excerpt: [
        "const sheetName = 'employees.master_roster';",
        "const status = 'Active';",
        "let activeCount = 0;",
        "const isActive = status === 'Active';",
        "activeCount = activeCount + 1;"
      ],
      steps: [
        { sop: 0, code: [1], cons: 1, say: 'const holds a value that will not be reassigned. This one is a string: text in quotes.' },
        { sop: 1, code: [2], cons: 2, say: 'Another string. The rule we care about, stored once, used later.' },
        { sop: 1, code: [3], cons: 3, say: 'let holds a value that can change. This one is a number.' },
        { sop: 1, code: [4], cons: 4, say: '=== compares. The answer is a boolean: true or false.' },
        { sop: 1, code: [5], cons: 5, say: '= assigns. It takes the right side and stores it on the left. activeCount is now 1.' }
      ] },
    { slide: 12, kind: 'array', excerpt: [
        "const values = source.getDataRange().getValues();",
        "values[0]      // the header row",
        "values[2]      // sheet row 3: Priya Nair",
        "values[2][3]   // column D of that row"
      ],
      steps: [
        { sop: 0, code: [1], cons: 'all', say: 'getValues reads the whole table into memory as rows of cells.' },
        { sop: 0, code: [2], cons: 'header', say: 'values[0] is the header. Arrays count from 0.' },
        { sop: 1, code: [3], cons: 'row', say: 'Sheet row 3 is values[2]. The sheet counts from 1; the array counts from 0.' },
        { sop: 1, code: [4], cons: 'cell', say: 'Column D is index 3, so cell D3 is values[2][3]: "Active".' }
      ] },
    { slide: 13, kind: 'trace', code: [9, 10, 11, 12],
      steps: [
        { sop: 1, code: [10], cons: null, say: 'The sentence "include employees whose Status is Active" becomes one if.' },
        { sop: 1, code: [10, 11], cons: 2, say: "Priya: row[3] is 'Active'. 'Active' === 'Active' is true, so she is included." },
        { sop: 1, code: [10], cons: 3, say: "Jonah: 'Inactive' === 'Active' is false. The push is skipped." },
        { sop: 1, code: [10], cons: 4, say: 'Tomas: the cell holds the text "NULL". Four letters, not missing data, and not Active.' }
      ] },
    { slide: 14, kind: 'loop', code: [7, 8, 9, 10, 11, 12, 13],
      steps: [
        { sop: 2, code: [7], cons: 0, say: 'output starts with the header row we want: three fields, fixed order.' },
        { sop: 1, code: [8, 9, 10, 11], cons: 1, say: 'i = 1: the first record after the header. Active, so it is pushed.' },
        { sop: 1, code: [8, 9, 10, 11], cons: 2, say: 'i = 2: Priya Nair. Active; output grows to three rows.' },
        { sop: 1, code: [8, 9, 10], cons: 3, say: 'i = 3: Jonah Park. Inactive. The rule is false; output does not grow.' },
        { sop: 1, code: [8, 13], cons: 10, say: 'The loop repeats until i reaches values.length. Every record meets the same rule.' }
      ] },
    { slide: 15, kind: 'chain', code: [3, 4, 5, '…', 18],
      steps: [
        { sop: 0, code: [3], cons: 1, say: 'SpreadsheetApp.getActiveSpreadsheet() returns the spreadsheet this script is bound to.' },
        { sop: 0, code: [4], cons: 2, say: '.getSheetByName(...) reaches one sheet. The dot accesses a method; the parentheses call it.' },
        { sop: 0, code: [5], cons: 3, say: '.getDataRange() selects the used range, and .getValues() reads it in one call.' },
        { sop: 3, code: [5, 18], cons: 4, say: 'Read once, process in memory, write once. Two service calls do the heavy work.' }
      ] }
  ];

  var sortTasks = [
    { id: 't1', text: 'Extract the active roster every morning.', answer: 'rule', why: 'The inclusion rule is explicit: Status is Active.' },
    { id: 't2', text: 'Run the standard data checks on a new extract.', answer: 'rule', why: 'Each check is a stated condition a script can test.' },
    { id: 't3', text: 'Explain an unexplained drop in performance.', answer: 'judgment', why: 'No written rule exists yet. It needs investigation and context.' }
  ];

  var terms = [
    { term: 'value', example: "'Active'", step: 'The word written in the Status cell' },
    { term: 'variable', example: 'const values', step: 'The copy of the roster we work from' },
    { term: 'function', example: 'buildActiveRoster()', step: 'The named procedure: prepare the active list' },
    { term: 'condition', example: "if (row[3] === 'Active')", step: 'The inclusion rule' },
    { term: 'loop', example: 'for (let i = 1; ...)', step: 'Repeat for every employee' }
  ];

  var predict = [
    { q: 'Tomas Villanueva\'s Status cell holds the text "NULL". Is he included?',
      options: ['Yes', 'No'], answer: 'No', line: [10],
      why: "'NULL' === 'Active' is false. The text NULL is not the word Active." },
    { q: 'Where does the result end up?',
      options: ['employees.master_roster', 'training.active_roster', 'The execution log only'], answer: 'training.active_roster', line: [15, 16, 17, 18],
      why: 'Lines 15 to 18 find or create training.active_roster, clear it, and write the output there.' },
    { q: 'The team now wants Inactive records instead. Which line changes?',
      options: ['Line 5', 'Line 10', 'Line 18'], answer: 'Line 10', line: [10],
      why: "Only the rule changes: row[3] === 'Inactive'. Reading and writing stay the same." }
  ];

  root.PressData = {
    chapters: chapters, slides: slides, sop: sop, dailyChecklist: dailyChecklist,
    read: read, sortTasks: sortTasks, terms: terms, predict: predict
  };
})(typeof self !== 'undefined' ? self : this);
