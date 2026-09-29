const test = require('node:test');
const assert = require('node:assert/strict');
const R = require('../src/roster.js');

test('includes exactly the Active records, in sheet order', () => {
  const out = R.selectActiveRows(R.SAMPLE);
  assert.deepEqual(out[0], ['Employee_ID', 'Employee_Name', 'Account_Name']);
  assert.deepEqual(out.slice(1).map(r => r[0]), ['E-1041', 'E-1042', 'E-1045', 'E-1046', 'E-1048', 'E-1050']);
});

test('selects three fields in a fixed order and drops Status and Supervisor', () => {
  const out = R.selectActiveRows(R.SAMPLE);
  assert.equal(R.SAMPLE[2][1], 'Priya Nair');
  for (const r of out) assert.equal(r.length, 3);
  assert.deepEqual(out[2], ['E-1042', 'Priya Nair', 'Harbor Telecom']);
});

test('"NULL" text, empty cell and null are all excluded and are distinct', () => {
  assert.equal(R.isIncluded(['x', 'y', 'z', 'NULL']), false);
  assert.equal(R.isIncluded(['x', 'y', 'z', '']), false);
  assert.equal(R.isIncluded(['x', 'y', 'z', null]), false);
  assert.notEqual(R.describeStatus('NULL'), R.describeStatus(''));
  assert.notEqual(R.describeStatus(''), R.describeStatus(null));
});

test('the rule can be changed and the output follows it', () => {
  const inactive = R.selectActiveRows(R.SAMPLE, 'Inactive');
  assert.deepEqual(inactive.slice(1).map(r => r[0]), ['E-1043', 'E-1047']);
  const nul = R.selectActiveRows(R.SAMPLE, 'NULL');
  assert.deepEqual(nul.slice(1).map(r => r[0]), ['E-1044']);
});

test('script output matches an independent manual filter', () => {
  const c = R.compare(R.selectActiveRows(R.SAMPLE), R.manualFilter(R.SAMPLE));
  assert.ok(c.sameHeader && c.sameCount && c.sameIds);
  assert.deepEqual(c.missing, []);
  assert.deepEqual(c.extra, []);
});

test('a second run replaces output instead of duplicating it', () => {
  const wb = R.makeWorkbook();
  const a = R.run(wb);
  const b = R.run(wb);
  assert.equal(a.output.length, 7);
  assert.equal(wb.sheets[R.TARGET].length, 7);
  assert.deepEqual(a.output, b.output);
});

test('appending (the wrong way) duplicates records on rerun', () => {
  const wb = R.makeWorkbook();
  R.runAppending(wb);
  assert.equal(R.runAppending(wb).length, 13);
});

test('a wrong sheet name fails at line 5 with the Apps Script TypeError', () => {
  const r = R.run(R.makeWorkbook(), { sourceName: 'employees.master_rooster' });
  assert.equal(r.ok, false);
  assert.equal(r.error.line, 5);
  assert.match(r.error.message, /Cannot read properties of null \(reading 'getDataRange'\)/);
  assert.equal(r.log.at(-1).level, 'Error');
});

test('the source sheet is never modified', () => {
  const wb = R.makeWorkbook();
  const before = JSON.stringify(wb.sheets[R.SOURCE]);
  R.run(wb); R.run(wb, { status: 'Inactive' });
  assert.equal(JSON.stringify(wb.sheets[R.SOURCE]), before);
});

test('script line numbers used by the page point at the right statements', () => {
  assert.match(R.SCRIPT[4], /getDataRange\(\)\.getValues\(\)/); // line 5
  assert.match(R.SCRIPT[9], /row\[3\] === 'Active'/);            // line 10
  assert.match(R.SCRIPT[17], /setValues\(output\)/);             // line 18
  assert.equal(R.SCRIPT.length, 20);
});

test('summary text is computed from the output', () => {
  const t = R.summaryText(R.selectActiveRows(R.SAMPLE));
  assert.match(t, /6 active employees/);
  assert.match(t, /training\.active_roster/);
});
