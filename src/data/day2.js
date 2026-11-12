/* OneTap Day 2 preview data, shown on slide 24.
   The Day 2 exercise workbook (gs_data.json from the facilitator, 2026-11-12):
   a beginner-safe sandbox extract adapted to a public call-center dataset's
   schema. Raw Data is copied unchanged; the page computes every count from it.
   The output tabs list only what the exercise asks for, never the answers. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.OneTapDay2 = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var TITLE = "WFM Apps Script Beginner Playground";
  var PURPOSE = "Use Google Apps Script fundamentals to automate a small call-center/WFM reporting task.";
  var SOURCE_REPO = "https://github.com/globalsmile/Call-Center-Analysis";
  var FN = 'buildWfmBeginnerReport';

  // The Raw Data tab, header first, exactly as in the workbook.
  var RAW = [
    ["Call Id", "Agent", "Date", "Time", "Topic", "Answered (Y/N)", "Resolved", "Speed of answer in seconds", "AvgTalkDuration", "Satisfaction rating"],
    ["ID0001", "Diane", "2021-01-04", "08:00:00", "Contract related", "N", "N", "", "00:00:00", ""],
    ["ID0002", "Becky", "2021-01-04", "08:20:00", "Payment related", "Y", "Y", 25, "0:02:12", 5],
    ["ID0003", "Stewart", "2021-01-04", "08:40:00", "Admin Support", "Y", "Y", 38, "0:02:49", 4],
    ["ID0004", "Jim", "2021-01-04", "09:00:00", "Technical Support", "Y", "Y", 51, "0:03:26", 3],
    ["ID0005", "Martha", "2021-01-04", "09:20:00", "Streaming", "Y", "Y", 64, "0:04:03", 3],
    ["ID0006", "Joe", "2021-01-04", "09:40:00", "Contract related", "Y", "Y", 77, "0:04:40", 3],
    ["ID0007", "Greg", "2021-01-04", "10:00:00", "Payment related", "Y", "Y", 90, "0:05:17", 3],
    ["ID0008", "Dan", "2021-01-04", "10:20:00", "Admin Support", "Y", "Y", 103, "0:05:54", 2],
    ["ID0009", "Diane", "2021-01-04", "10:40:00", "Technical Support", "Y", "Y", 13, "0:06:31", 4],
    ["ID0010", "Becky", "2021-01-04", "11:00:00", "Streaming", "Y", "Y", 26, "0:07:08", 5],
    ["ID0011", "Stewart", "2021-01-04", "11:20:00", "Contract related", "Y", "Y", 39, "0:07:45", 4],
    ["ID0012", "Jim", "2021-01-04", "11:40:00", "Payment related", "N", "N", "", "00:00:00", ""],
    ["ID0013", "Martha", "2021-01-04", "12:00:00", "Admin Support", "Y", "Y", 65, "0:08:59", 3],
    ["ID0014", "Joe", "2021-01-04", "12:20:00", "Technical Support", "Y", "Y", 78, "0:01:56", 2],
    ["ID0015", "Greg", "2021-01-04", "12:40:00", "Streaming", "Y", "Y", 91, "0:02:33", 2],
    ["ID0016", "Dan", "2021-01-04", "13:00:00", "Contract related", "Y", "Y", 104, "0:03:10", 2],
    ["ID0017", "Diane", "2021-01-04", "13:20:00", "Payment related", "Y", "Y", 14, "0:03:47", 5],
    ["ID0018", "Becky", "2021-01-04", "13:40:00", "Admin Support", "Y", "Y", 27, "0:04:24", 5],
    ["ID0019", "Stewart", "2021-01-04", "14:00:00", "Technical Support", "Y", "Y", 40, "0:05:01", 3],
    ["ID0020", "Jim", "2021-01-04", "14:20:00", "Streaming", "Y", "Y", 53, "0:05:38", 4],
    ["ID0021", "Martha", "2021-01-04", "14:40:00", "Contract related", "Y", "Y", 66, "0:06:15", 3],
    ["ID0022", "Joe", "2021-01-04", "15:00:00", "Payment related", "Y", "Y", 79, "0:06:52", 3],
    ["ID0023", "Greg", "2021-01-04", "15:20:00", "Admin Support", "N", "N", "", "00:00:00", ""],
    ["ID0024", "Dan", "2021-01-04", "15:40:00", "Technical Support", "Y", "Y", 105, "0:08:06", 1],
    ["ID0025", "Jim", "2021-01-05", "08:03:00", "Technical Support", "Y", "Y", 21, "0:02:28", 4],
    ["ID0026", "Martha", "2021-01-05", "08:23:00", "Streaming", "Y", "Y", 34, "0:03:05", 4],
    ["ID0027", "Joe", "2021-01-05", "08:43:00", "Contract related", "Y", "Y", 47, "0:03:42", 4],
    ["ID0028", "Greg", "2021-01-05", "09:03:00", "Payment related", "Y", "Y", 60, "0:04:19", 4],
    ["ID0029", "Dan", "2021-01-05", "09:23:00", "Admin Support", "Y", "Y", 73, "0:04:56", 3],
    ["ID0030", "Diane", "2021-01-05", "09:43:00", "Technical Support", "Y", "Y", 86, "0:05:33", 2],
    ["ID0031", "Becky", "2021-01-05", "10:03:00", "Streaming", "Y", "Y", 99, "0:06:10", 2],
    ["ID0032", "Stewart", "2021-01-05", "10:23:00", "Contract related", "Y", "N", 112, "0:06:47", 1],
    ["ID0033", "Jim", "2021-01-05", "10:43:00", "Payment related", "Y", "Y", 22, "0:07:24", 5],
    ["ID0034", "Martha", "2021-01-05", "11:03:00", "Admin Support", "Y", "Y", 35, "0:08:01", 4],
    ["ID0035", "Joe", "2021-01-05", "11:23:00", "Technical Support", "N", "N", "", "00:00:00", ""],
    ["ID0036", "Greg", "2021-01-05", "11:43:00", "Streaming", "Y", "Y", 61, "0:01:35", 3],
    ["ID0037", "Dan", "2021-01-05", "12:03:00", "Contract related", "Y", "Y", 74, "0:02:12", 3],
    ["ID0038", "Diane", "2021-01-05", "12:23:00", "Payment related", "Y", "Y", 87, "0:02:49", 3],
    ["ID0039", "Becky", "2021-01-05", "12:43:00", "Admin Support", "N", "N", "", "00:00:00", ""],
    ["ID0040", "Stewart", "2021-01-05", "13:03:00", "Technical Support", "Y", "N", 113, "0:04:03", 1],
    ["ID0041", "Jim", "2021-01-05", "13:23:00", "Streaming", "Y", "Y", 23, "0:04:40", 5],
    ["ID0042", "Martha", "2021-01-05", "13:43:00", "Contract related", "Y", "Y", 36, "0:05:17", 4],
    ["ID0043", "Joe", "2021-01-05", "14:03:00", "Payment related", "Y", "Y", 49, "0:05:54", 4],
    ["ID0044", "Greg", "2021-01-05", "14:23:00", "Admin Support", "Y", "Y", 62, "0:06:31", 3],
    ["ID0045", "Dan", "2021-01-05", "14:43:00", "Technical Support", "Y", "Y", 75, "0:07:08", 2],
    ["ID0046", "Diane", "2021-01-05", "15:03:00", "Streaming", "N", "N", "", "00:00:00", ""],
    ["ID0047", "Becky", "2021-01-05", "15:23:00", "Contract related", "Y", "Y", 101, "0:08:22", 2],
    ["ID0048", "Stewart", "2021-01-05", "15:43:00", "Payment related", "Y", "N", 114, "0:08:59", 1],
    ["ID0049", "Greg", "2021-01-06", "08:06:00", "Payment related", "Y", "Y", 30, "0:03:21", 5],
    ["ID0050", "Dan", "2021-01-06", "08:26:00", "Admin Support", "Y", "Y", 43, "0:03:58", 4],
    ["ID0051", "Diane", "2021-01-06", "08:46:00", "Technical Support", "Y", "Y", 56, "0:04:35", 3],
    ["ID0052", "Becky", "2021-01-06", "09:06:00", "Streaming", "Y", "Y", 69, "0:05:12", 3],
    ["ID0053", "Stewart", "2021-01-06", "09:26:00", "Contract related", "Y", "Y", 82, "0:05:49", 3],
    ["ID0054", "Jim", "2021-01-06", "09:46:00", "Payment related", "Y", "Y", 95, "0:06:26", 2],
    ["ID0055", "Martha", "2021-01-06", "10:06:00", "Admin Support", "Y", "N", 108, "0:07:03", 1],
    ["ID0056", "Joe", "2021-01-06", "10:26:00", "Technical Support", "N", "N", "", "00:00:00", ""],
    ["ID0057", "Greg", "2021-01-06", "10:46:00", "Streaming", "Y", "Y", 31, "0:08:17", 4],
    ["ID0058", "Dan", "2021-01-06", "11:06:00", "Contract related", "N", "N", "", "00:00:00", ""],
    ["ID0059", "Diane", "2021-01-06", "11:26:00", "Payment related", "Y", "Y", 57, "0:01:51", 4],
    ["ID0060", "Becky", "2021-01-06", "11:46:00", "Admin Support", "Y", "Y", 70, "0:02:28", 3],
    ["ID0061", "Stewart", "2021-01-06", "12:06:00", "Technical Support", "Y", "Y", 83, "0:03:05", 2],
    ["ID0062", "Jim", "2021-01-06", "12:26:00", "Streaming", "Y", "Y", 96, "0:03:42", 2],
    ["ID0063", "Martha", "2021-01-06", "12:46:00", "Contract related", "Y", "N", 109, "0:04:19", 1],
    ["ID0064", "Joe", "2021-01-06", "13:06:00", "Payment related", "Y", "Y", 19, "0:04:56", 5],
    ["ID0065", "Greg", "2021-01-06", "13:26:00", "Admin Support", "Y", "Y", 32, "0:05:33", 4],
    ["ID0066", "Dan", "2021-01-06", "13:46:00", "Technical Support", "Y", "Y", 45, "0:06:10", 3],
    ["ID0067", "Diane", "2021-01-06", "14:06:00", "Streaming", "Y", "Y", 58, "0:06:47", 4],
    ["ID0068", "Becky", "2021-01-06", "14:26:00", "Contract related", "Y", "Y", 71, "0:07:24", 3],
    ["ID0069", "Stewart", "2021-01-06", "14:46:00", "Payment related", "N", "N", "", "00:00:00", ""],
    ["ID0070", "Jim", "2021-01-06", "15:06:00", "Admin Support", "Y", "Y", 97, "0:08:38", 2],
    ["ID0071", "Martha", "2021-01-06", "15:26:00", "Technical Support", "Y", "N", 110, "0:01:35", 1],
    ["ID0072", "Joe", "2021-01-06", "15:46:00", "Streaming", "Y", "Y", 20, "0:02:12", 5],
    ["ID0073", "Becky", "2021-01-07", "08:09:00", "Streaming", "Y", "Y", 39, "0:04:14", 4],
    ["ID0074", "Stewart", "2021-01-07", "08:29:00", "Contract related", "Y", "Y", 52, "0:04:51", 4],
    ["ID0075", "Jim", "2021-01-07", "08:49:00", "Payment related", "Y", "Y", 65, "0:05:28", 3],
    ["ID0076", "Martha", "2021-01-07", "09:09:00", "Admin Support", "Y", "Y", 78, "0:06:05", 3],
    ["ID0077", "Joe", "2021-01-07", "09:29:00", "Technical Support", "Y", "Y", 91, "0:06:42", 1],
    ["ID0078", "Greg", "2021-01-07", "09:49:00", "Streaming", "Y", "N", 104, "0:07:19", 1],
    ["ID0079", "Dan", "2021-01-07", "10:09:00", "Contract related", "Y", "Y", 14, "0:07:56", 5],
    ["ID0080", "Diane", "2021-01-07", "10:29:00", "Payment related", "Y", "Y", 27, "0:08:33", 5],
    ["ID0081", "Becky", "2021-01-07", "10:49:00", "Admin Support", "N", "N", "", "00:00:00", ""],
    ["ID0082", "Stewart", "2021-01-07", "11:09:00", "Technical Support", "Y", "Y", 53, "0:02:07", 3],
    ["ID0083", "Jim", "2021-01-07", "11:29:00", "Streaming", "Y", "Y", 66, "0:02:44", 3],
    ["ID0084", "Martha", "2021-01-07", "11:49:00", "Contract related", "Y", "Y", 79, "0:03:21", 3],
    ["ID0085", "Joe", "2021-01-07", "12:09:00", "Payment related", "Y", "Y", 92, "0:03:58", 2],
    ["ID0086", "Greg", "2021-01-07", "12:29:00", "Admin Support", "Y", "N", 105, "0:04:35", 1],
    ["ID0087", "Dan", "2021-01-07", "12:49:00", "Technical Support", "Y", "Y", 15, "0:05:12", 4],
    ["ID0088", "Diane", "2021-01-07", "13:09:00", "Streaming", "Y", "Y", 28, "0:05:49", 5],
    ["ID0089", "Becky", "2021-01-07", "13:29:00", "Contract related", "N", "N", "", "00:00:00", ""],
    ["ID0090", "Stewart", "2021-01-07", "13:49:00", "Payment related", "Y", "Y", 54, "0:07:03", 4],
    ["ID0091", "Jim", "2021-01-07", "14:09:00", "Admin Support", "Y", "Y", 67, "0:07:40", 3],
    ["ID0092", "Martha", "2021-01-07", "14:29:00", "Technical Support", "N", "N", "", "00:00:00", ""],
    ["ID0093", "Joe", "2021-01-07", "14:49:00", "Streaming", "Y", "Y", 93, "0:08:54", 2],
    ["ID0094", "Greg", "2021-01-07", "15:09:00", "Contract related", "Y", "N", 106, "0:01:51", 1],
    ["ID0095", "Dan", "2021-01-07", "15:29:00", "Payment related", "Y", "Y", 16, "0:02:28", 5],
    ["ID0096", "Diane", "2021-01-07", "15:49:00", "Admin Support", "Y", "Y", 29, "0:03:05", 5],
    ["ID0097", "Martha", "2021-01-08", "08:02:00", "Admin Support", "Y", "Y", 48, "0:05:07", 4],
    ["ID0098", "Joe", "2021-01-08", "08:22:00", "Technical Support", "Y", "Y", 61, "0:05:44", 2],
    ["ID0099", "Greg", "2021-01-08", "08:42:00", "Streaming", "Y", "Y", 74, "0:06:21", 3],
    ["ID0100", "Dan", "2021-01-08", "09:02:00", "Contract related", "Y", "Y", 87, "0:06:58", 3],
    ["ID0101", "Diane", "2021-01-08", "09:22:00", "Payment related", "Y", "N", 100, "0:07:35", 1],
    ["ID0102", "Becky", "2021-01-08", "09:42:00", "Admin Support", "Y", "Y", 113, "0:08:12", 2],
    ["ID0103", "Stewart", "2021-01-08", "10:02:00", "Technical Support", "Y", "Y", 23, "0:08:49", 4],
    ["ID0104", "Jim", "2021-01-08", "10:22:00", "Streaming", "N", "N", "", "00:00:00", ""],
    ["ID0105", "Martha", "2021-01-08", "10:42:00", "Contract related", "Y", "Y", 49, "0:02:23", 4],
    ["ID0106", "Joe", "2021-01-08", "11:02:00", "Payment related", "Y", "Y", 62, "0:03:00", 3],
    ["ID0107", "Greg", "2021-01-08", "11:22:00", "Admin Support", "Y", "Y", 75, "0:03:37", 3],
    ["ID0108", "Dan", "2021-01-08", "11:42:00", "Technical Support", "Y", "Y", 88, "0:04:14", 2],
    ["ID0109", "Diane", "2021-01-08", "12:02:00", "Streaming", "N", "N", "", "00:00:00", ""],
    ["ID0110", "Becky", "2021-01-08", "12:22:00", "Contract related", "Y", "Y", 114, "0:05:28", 2],
    ["ID0111", "Stewart", "2021-01-08", "12:42:00", "Payment related", "Y", "Y", 24, "0:06:05", 5],
    ["ID0112", "Jim", "2021-01-08", "13:02:00", "Admin Support", "Y", "Y", 37, "0:06:42", 4],
    ["ID0113", "Martha", "2021-01-08", "13:22:00", "Technical Support", "Y", "Y", 50, "0:07:19", 3],
    ["ID0114", "Joe", "2021-01-08", "13:42:00", "Streaming", "Y", "Y", 63, "0:07:56", 3],
    ["ID0115", "Greg", "2021-01-08", "14:02:00", "Contract related", "N", "N", "", "00:00:00", ""],
    ["ID0116", "Dan", "2021-01-08", "14:22:00", "Payment related", "Y", "Y", 89, "0:09:10", 3],
    ["ID0117", "Diane", "2021-01-08", "14:42:00", "Admin Support", "Y", "N", 102, "0:02:07", 1],
    ["ID0118", "Becky", "2021-01-08", "15:02:00", "Technical Support", "Y", "Y", 12, "0:02:44", 4],
    ["ID0119", "Stewart", "2021-01-08", "15:22:00", "Streaming", "Y", "Y", 25, "0:03:21", 5],
    ["ID0120", "Jim", "2021-01-08", "15:42:00", "Contract related", "Y", "Y", 38, "0:03:58", 4]
  ];

  // Exercise rule 4, the tools the function must use. find: text to look for
  // in the Day 1 script, so the page can show where each one already appeared.
  var TOOLS = [
    { label: 'SpreadsheetApp', find: ['SpreadsheetApp'] },
    { label: 'getSheetByName()', find: ['getSheetByName('] },
    { label: 'getDataRange()', find: ['getDataRange('] },
    { label: 'getValues()', find: ['getValues('] },
    { label: 'setValues()', find: ['setValues('] },
    { label: 'arrays', find: ['[['] },
    { label: 'loops', find: ['for ('] },
    { label: 'if/else', find: ['if (', 'else'] },
    { label: 'Logger.log()', find: ['Logger.log('] }
  ];

  // The Day 2 procedure as plain steps, like slide 3's: exercise rules 5 to 10
  // and acceptance criteria 1 to 3. RULE is exercise rule 9, word for word.
  var PROCEDURE = [
    'Read the Raw Data tab. Do not edit it.',
    'Create or clear a tab named Cleaned Data: all raw rows plus calculated fields.',
    'Create or clear a tab named Daily Summary: one row per date.',
    'Create or clear a tab named Agent Summary: one row per agent.',
    'Confirm the script runs without errors and Raw Data is unchanged.'
  ];
  var RULE = 'Do not manually create the output tabs. The script must create them.';

  // The three tabs the script must create or clear. per: what one output row stands for.
  var OUTPUTS = [
    { name: 'Cleaned Data', per: 'call', add: [
      'Answered Flag: 1 if Answered (Y/N) = Y, else 0.',
      'Abandoned Flag: 1 if Answered (Y/N) = N, else 0.',
      'Resolved Flag: 1 if Resolved = Y, else 0.',
      'SLA Flag: 1 if answered and Speed of answer in seconds <= 60, else 0.',
      'Talk Seconds: convert AvgTalkDuration from HH:MM:SS to seconds.',
      'Wait Bucket: Abandoned, <=30s, 31-60s, or >60s.'
    ] },
    { name: 'Daily Summary', per: 'Date', metrics: ['Date', 'Total Calls', 'Answered Calls', 'Abandoned Calls', 'Answer Rate', 'Abandonment Rate', 'SLA %', 'ASA', 'AHT Seconds', 'Average Satisfaction'] },
    { name: 'Agent Summary', per: 'Agent', metrics: ['Agent', 'Total Calls', 'Answered Calls', 'Abandoned Calls', 'Answer Rate', 'SLA %', 'ASA', 'AHT Seconds', 'Average Satisfaction'] }
  ];

  // Distinct values of one Raw Data column, in first-seen order.
  function distinct(header) {
    var k = RAW[0].indexOf(header), seen = [];
    for (var i = 1; i < RAW.length; i++) if (seen.indexOf(RAW[i][k]) < 0) seen.push(RAW[i][k]);
    return seen;
  }

  // Where each tool appears in a script (1-based line numbers); missing parts are new.
  function toolLines(script, tool) {
    return tool.find.map(function (f) {
      for (var i = 0; i < script.length; i++) if (script[i].indexOf(f) >= 0) return { find: f, line: i + 1 };
      return { find: f, line: 0 };
    });
  }

  return {
    TITLE: TITLE, PURPOSE: PURPOSE, SOURCE_REPO: SOURCE_REPO, FN: FN, PROCEDURE: PROCEDURE, RULE: RULE,
    RAW: RAW, TOOLS: TOOLS, OUTPUTS: OUTPUTS, distinct: distinct, toolLines: toolLines
  };
});
