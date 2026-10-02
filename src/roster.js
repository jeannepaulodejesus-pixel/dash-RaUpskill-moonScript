/* PressRun teaching logic.
   Pure functions, no DOM. The same procedure the page traces is the one a
   learner runs in Apps Script; only the SpreadsheetApp calls are modelled here,
   because the browser has no spreadsheet. Everything the page shows as a result
   is computed by these functions from the labelled sample roster. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PressRoster = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var SOURCE = 'employees.master_roster';
  var TARGET = 'training.active_roster';
  var OUTPUT_HEADER = ['Employee_ID', 'Employee_Name', 'Account_Name'];

  // Sample data mirroring the shape of employees.master_roster. Names are
  // fictional. Sheet row 3 (values[2]) is Priya Nair, the record the page
  // follows through every beat. Row 5 holds the literal text "NULL" and row 10 an empty cell,
  // because the real workbook contains both and they are not the same thing.
  var SAMPLE = [
    ['Employee_ID', 'Employee_Name', 'Account_Name', 'Status', 'Supervisor'],
    ['E-1041', 'Amara Reyes', 'Northwind Retail', 'Active', 'L. Santos'],
    ['E-1042', 'Priya Nair', 'Harbor Telecom', 'Active', 'M. Cruz'],
    ['E-1043', 'Jonah Park', 'Northwind Retail', 'Inactive', 'L. Santos'],
    ['E-1044', 'Tomas Villanueva', 'Harbor Telecom', 'NULL', 'M. Cruz'],
    ['E-1045', 'Grace Mendoza', 'Summit Health', 'Active', 'R. Lim'],
    ['E-1046', 'Rafael Ocampo', 'Summit Health', 'Active', 'R. Lim'],
    ['E-1047', 'Lea Dizon', 'Northwind Retail', 'Inactive', 'L. Santos'],
    ['E-1048', 'Marco Bautista', 'Harbor Telecom', 'Active', 'M. Cruz'],
    ['E-1049', 'Ines Tan', 'Summit Health', '', 'R. Lim'],
    ['E-1050', 'Kai Robles', 'Northwind Retail', 'Active', 'L. Santos']
  ];

  // The complete Day 1 script. Line numbers on the page come from this array,
  // so an excerpt and the full script can never disagree.
  var SCRIPT = [
    "function buildActiveRoster() {",
    "  // Read the roster once, keep Active records, write the result once.",
    "  const ss = SpreadsheetApp.getActiveSpreadsheet();",
    "  const source = ss.getSheetByName('employees.master_roster');",
    "  const values = source.getDataRange().getValues();",
    "",
    "  const output = [['Employee_ID', 'Employee_Name', 'Account_Name']];",
    "  for (let i = 1; i < values.length; i++) {",
    "    const row = values[i];",
    "    if (row[3] === 'Active') {",
    "      output.push([row[0], row[1], row[2]]);",
    "    }",
    "  }",
    "",
    "  let target = ss.getSheetByName('training.active_roster');",
    "  if (!target) target = ss.insertSheet('training.active_roster');",
    "  target.clearContents();",
    "  target.getRange(1, 1, output.length, 3).setValues(output);",
    "  Logger.log('Wrote ' + (output.length - 1) + ' active employees');",
    "}"
  ];

  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  /* The rule, exactly as line 10 states it: strict equality with a string.
     'NULL' is text, '' is an empty cell, neither equals 'Active'. */
  function isIncluded(row, status) {
    return row[3] === (status === undefined ? 'Active' : status);
  }

  /* Lines 7 to 13: walk every record after the header, keep matches, and
     select three fields in a fixed order. */
  function selectActiveRows(values, status) {
    var output = [OUTPUT_HEADER.slice()];
    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      if (isIncluded(row, status)) output.push([row[0], row[1], row[2]]);
    }
    return output;
  }

  /* A manual filter, done the way an analyst would in the sheet UI: filter the
     Status column, then copy three columns. Used on the verification beat to
     check the script's result against an independent method. */
  function manualFilter(values, status) {
    var want = status === undefined ? 'Active' : status;
    return [OUTPUT_HEADER.slice()].concat(
      values.slice(1)
        .filter(function (r) { return String(r[3]) === want; })
        .map(function (r) { return [r[0], r[1], r[2]]; })
    );
  }

  function makeWorkbook() {
    var sheets = {};
    sheets[SOURCE] = clone(SAMPLE);
    return { sheets: sheets };
  }

  function clock(n) {
    var s = 9 * 3600 + 14 * 60 + 2 + n; // fixed, so screenshots are stable
    var p = function (x) { return (x < 10 ? '0' : '') + x; };
    return p(Math.floor(s / 3600)) + ':' + p(Math.floor(s / 60) % 60) + ':' + p(s % 60);
  }

  /* Model one execution of buildActiveRoster against a workbook.
     opts.sourceName  sheet name typed on line 4 (default: the real one)
     opts.status      value compared on line 10 (default: 'Active')
     Returns the log an execution would show, the output written, and, when the
     source sheet does not exist, the same TypeError Apps Script raises at line 5
     (getSheetByName returns null, and null has no getDataRange). */
  function run(workbook, opts) {
    opts = opts || {};
    var sourceName = opts.sourceName === undefined ? SOURCE : opts.sourceName;
    var log = [{ t: clock(0), level: 'Notice', text: 'Execution started' }];
    var src = Object.prototype.hasOwnProperty.call(workbook.sheets, sourceName) ? workbook.sheets[sourceName] : null;
    if (src === null) {
      var err = {
        kind: 'execution',
        line: 5,
        message: "TypeError: Cannot read properties of null (reading 'getDataRange')",
        at: 'buildActiveRoster @ Code.gs:5'
      };
      log.push({ t: clock(1), level: 'Error', text: err.message + '\n' + err.at });
      return { ok: false, error: err, log: log, output: null, workbook: workbook };
    }
    var output = selectActiveRows(src, opts.status);
    // Lines 15 to 18: find or create the target, clear it, write in one call.
    workbook.sheets[TARGET] = output.map(function (r) { return r.slice(); });
    log.push({ t: clock(1), level: 'Info', text: 'Wrote ' + (output.length - 1) + ' active employees' });
    log.push({ t: clock(2), level: 'Notice', text: 'Execution completed' });
    return { ok: true, error: null, log: log, output: output, workbook: workbook };
  }

  /* The wrong way, kept only to show on the verification beat why the script
     clears before it writes: appending on every run duplicates records. */
  function runAppending(workbook) {
    var out = selectActiveRows(workbook.sheets[SOURCE]);
    var prev = workbook.sheets[TARGET] || [OUTPUT_HEADER.slice()];
    workbook.sheets[TARGET] = prev.concat(out.slice(1));
    return workbook.sheets[TARGET];
  }

  /* Compare two outputs the way the verification beat does: included IDs,
     excluded IDs, field order, and row count. */
  function compare(a, b) {
    var ids = function (t) { return t.slice(1).map(function (r) { return r[0]; }); };
    var ia = ids(a), ib = ids(b);
    return {
      sameHeader: a[0].join('|') === b[0].join('|'),
      sameCount: ia.length === ib.length,
      sameIds: ia.join('|') === ib.join('|'),
      missing: ib.filter(function (x) { return ia.indexOf(x) < 0; }),
      extra: ia.filter(function (x) { return ib.indexOf(x) < 0; })
    };
  }

  function excluded(values, status) {
    return values.slice(1).filter(function (r) { return !isIncluded(r, status); });
  }

  // Distinguish three things the workbook can hold in a Status cell.
  function describeStatus(v) {
    if (v === null) return 'JavaScript null (no value)';
    if (v === '') return 'an empty cell (empty string)';
    if (v === 'NULL') return 'the text "NULL" (four letters)';
    return 'the text "' + v + '"';
  }

  // Gmail draft example: exactly the body the example code on slide 19 builds.
  function summaryText(output) {
    return 'Active roster refreshed.\n' + (output.length - 1) + ' active employees written to ' + TARGET + '.';
  }

  return {
    SOURCE: SOURCE, TARGET: TARGET, OUTPUT_HEADER: OUTPUT_HEADER,
    SAMPLE: SAMPLE, SCRIPT: SCRIPT,
    isIncluded: isIncluded, selectActiveRows: selectActiveRows, manualFilter: manualFilter,
    makeWorkbook: makeWorkbook, run: run, runAppending: runAppending, compare: compare,
    excluded: excluded, describeStatus: describeStatus, summaryText: summaryText
  };
});
