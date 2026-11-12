const test = require('node:test');
const assert = require('node:assert/strict');
const W = require('../src/data/day2.js');
const R = require('../src/roster.js');

test('Raw Data keeps the workbook header and a full row per call', () => {
  assert.deepEqual(W.RAW[0], ['Call Id', 'Agent', 'Date', 'Time', 'Topic', 'Answered (Y/N)', 'Resolved',
    'Speed of answer in seconds', 'AvgTalkDuration', 'Satisfaction rating']);
  for (const r of W.RAW) assert.equal(r.length, W.RAW[0].length);
  const ids = W.RAW.slice(1).map((r) => r[0]);
  assert.equal(new Set(ids).size, ids.length);
});

test('distinct values come back in first-seen order', () => {
  const dates = W.distinct('Date');
  assert.equal(dates[0], W.RAW[1][2]);
  assert.deepEqual(dates, dates.slice().sort());
});

test('tool lines point at the Day 1 script, and missing parts read as new', () => {
  const at = (label) => W.toolLines(R.SCRIPT, W.TOOLS.find((t) => t.label === label));
  const [values] = at('getValues()');
  assert.match(R.SCRIPT[values.line - 1], /getValues\(/);
  const [ifPart, elsePart] = at('if/else');
  assert.equal(ifPart.line, 10);
  assert.equal(elsePart.line, 0);
});

test('the Day 2 procedure names every output tab and keeps Raw Data read only', () => {
  for (const o of W.OUTPUTS) assert.ok(W.PROCEDURE.some((s) => s.includes(o.name)), o.name);
  assert.match(W.PROCEDURE[0], /Raw Data.*Do not edit/);
});
