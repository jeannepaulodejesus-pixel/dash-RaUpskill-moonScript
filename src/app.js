/* MoonScript page logic.
   Everything bespoke lives here; the scrollcraft engine is untouched and only
   publishes --sc-p on each act. The signature move is the Program Counter: in a
   lesson act, scroll progress selects one step, and that step lights the same
   instruction in three lanes at once (procedure, code, consequence), joined by
   a thin light bridge. Every consequence is computed by MoonRoster from the
   labelled sample roster; nothing on the page is a painted result. */
(function () {
  'use strict';

  var R = window.MoonRoster, D = window.MoonData, E = window.MoonEnv;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var smallMQ = matchMedia('(max-width: 860px)');
  var doc = document;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var clamp = function (x, a, b) { return x < a ? a : x > b ? b : x; };
  var smooth = function (x) { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pOf(el) { var v = parseFloat(el.style.getPropertyValue('--sc-p')); return isNaN(v) ? 0 : v; }
  function topOf(el) { return el.getBoundingClientRect().top + window.scrollY; }
  var COLS = 'ABCDEFGHIJ';

  /* ------------------------------------------------------------------ code */
  var KW = /^(function|const|let|var|if|else|for|return|new|null|true|false|of|in)$/;
  var SVC = /^(SpreadsheetApp|Logger|GmailApp|DriveApp|FormApp)$/;
  function highlight(line) {
    var out = '', re = /(\/\/.*$)|('(?:[^'\\]|\\.)*'?)|(\b\d+\b)|([A-Za-z_$][\w$]*)|(\s+)|([\s\S])/g, m;
    while ((m = re.exec(line))) {
      if (m[1]) out += '<span class="t-com">' + esc(m[1]) + '</span>';
      else if (m[2]) out += '<span class="t-str">' + esc(m[2]) + '</span>';
      else if (m[3]) out += '<span class="t-num">' + m[3] + '</span>';
      else if (m[4]) {
        var w = m[4], after = line.slice(re.lastIndex), before = line.slice(0, m.index);
        if (KW.test(w)) out += '<span class="t-kw">' + w + '</span>';
        else if (SVC.test(w)) out += '<span class="t-svc">' + w + '</span>';
        else if (/^\s*\(/.test(after) && /\.\s*$/.test(before) && w !== 'push') out += '<span class="t-call">' + w + '</span>';
        else if (/^\s*\(/.test(after)) out += '<span class="t-fn">' + w + '</span>';
        else out += '<span class="t-id">' + w + '</span>';
      } else out += esc(m[5] || m[6]);
    }
    return out || ' ';
  }
  // lines: array of numbers (script lines), '…' (gap) or {n, text}
  function codeHTML(lines, source) {
    source = source || R.SCRIPT;
    return lines.map(function (l) {
      if (l === '…') return '<span class="ln ln--gap" aria-hidden="true"><span class="ln__n"></span><span class="ln__t">…</span></span>';
      var n = typeof l === 'number' ? l : l.n;
      var t = typeof l === 'number' ? source[n - 1] : l.text;
      return '<span class="ln" data-line="' + n + '"><span class="ln__n">' + n + '</span><span class="ln__t">' + highlight(t) + '</span></span>';
    }).join('');
  }
  function allLines(src) { return src.map(function (_, i) { return i + 1; }); }
  function litLines(pre, nums) {
    $$('.ln', pre).forEach(function (ln) {
      var on = nums.indexOf(+ln.getAttribute('data-line')) >= 0;
      ln.classList.toggle('is-lit', on);
    });
  }

  /* ----------------------------------------------------------- worksheet */
  // A real table styled as a worksheet. Sheet coordinates are 1-based rows and
  // lettered columns, which is exactly the thing slide 12 contrasts with the
  // zero-based array.
  function wsHTML(values, o) {
    o = o || {};
    var litRows = o.litRows || [], litCols = o.litCols || [], dimCols = o.dimCols || [];
    var litCells = o.litCells || [], marks = o.marks || {}, maxRows = o.maxRows || values.length;
    var h = '<table class="ws' + (o.compact ? ' ws--compact' : '') + '"><thead><tr><th class="ws__corner" scope="col"><span class="vh">Row</span></th>';
    for (var c = 0; c < values[0].length; c++) h += '<th scope="col" class="ws__col' + (litCols.indexOf(c) >= 0 ? ' is-litcol' : '') + '">' + COLS[c] + '</th>';
    h += '</tr></thead><tbody>';
    for (var r = 0; r < Math.min(values.length, maxRows); r++) {
      var sheetRow = r + 1, row = values[r];
      var rowCls = (litRows.indexOf(sheetRow) >= 0 ? ' is-lit' : '') + (marks[sheetRow] ? ' ' + marks[sheetRow] : '') + (r === 0 ? ' ws__head' : '');
      h += '<tr class="' + rowCls.trim() + '" data-row="' + sheetRow + '"><th scope="row" class="ws__rn">' + sheetRow + '</th>';
      for (var k = 0; k < row.length; k++) {
        var v = row[k], cls = [];
        if (litCols.indexOf(k) >= 0) cls.push('is-litcol');
        if (dimCols.indexOf(k) >= 0) cls.push('is-dim');
        if (litCells.indexOf(sheetRow + ':' + k) >= 0) cls.push('is-litcell');
        var warn = o.flagStatus && r > 0 && k === 3 && (v === 'NULL' || v === '');
        if (warn) cls.push('is-warn');
        var shown = v === '' ? '<span class="ws__empty">(empty)</span>' : esc(v);
        h += '<td class="' + cls.join(' ') + '"' + (litCells.indexOf(sheetRow + ':' + k) >= 0 ? ' data-lit' : '') + '>' + shown + '</td>';
      }
      h += '</tr>';
    }
    h += '</tbody></table>';
    if (o.tabs) {
      h += '<div class="ws__tabs" role="list">' + o.tabs.map(function (t) {
        return '<span role="listitem" class="ws__tab' + (t.active ? ' is-active' : '') + (t.proposed ? ' is-proposed' : '') + (t.fresh ? ' is-fresh' : '') + '">' + esc(t.name) + (t.proposed ? ' <em>proposed</em>' : '') + '</span>';
      }).join('') + '</div>';
    }
    return h;
  }
  function literal(v) { return v === '' ? "''" : "'" + v + "'"; }
  function arrHTML(values, o) {
    o = o || {};
    var rows = values.slice(0, o.maxRows || values.length);
    return '<div class="arr"><p class="arr__open">values = [</p>' + rows.map(function (row, i) {
      var cells = row.map(function (v, k) {
        var lit = o.litCell && o.litCell[0] === i && o.litCell[1] === k;
        return '<span class="arr__v' + (lit ? ' is-litcell' : '') + '"' + (lit ? ' data-lit' : '') + '>' + esc(literal(v)) + '</span>';
      }).join(', ');
      var on = o.litRow === i;
      return '<p class="arr__row' + (on ? ' is-lit' : '') + '"' + (on && !o.litCell ? ' data-lit' : '') + '><span class="arr__i">[' + i + ']</span> [' + cells + ']</p>';
    }).join('') + (o.more ? '<p class="arr__row arr__more">  …</p>' : '') + '<p class="arr__open">]</p></div>';
  }
  function logHTML(entries) {
    return '<ol class="log" aria-label="Execution log">' + entries.map(function (e) {
      return '<li class="log__' + e.level.toLowerCase() + '"><span class="log__t">' + e.t + '</span><span class="log__l">' + e.level + '</span><span class="log__m">' + esc(e.text) + '</span></li>';
    }).join('') + '</ol>';
  }

  /* ------------------------------------------------ static content builders */
  function buildStatic() {
    $$('[data-ms-script]').forEach(function (pre) { pre.innerHTML = codeHTML(allLines(R.SCRIPT)); });
    $$('[data-ms-sop-clear]').forEach(function (ol) {
      ol.innerHTML = D.sop.map(function (s) { return '<li>' + esc(s.clear) + '</li>'; }).join('');
    });
    var cl = $('[data-ms-clarify]');
    if (cl) cl.innerHTML = D.sop.map(function (s, i) {
      var vague = esc(s.vague);
      if (s.word) vague = vague.replace(esc(s.word), '<mark class="warn">' + esc(s.word) + '</mark>');
      return '<li class="clarify__item"><span class="clarify__n">' + (i + 1) + '</span>' +
        '<p class="clarify__vague"><span class="vh">Ambiguous: </span>' + vague + '</p>' +
        '<p class="clarify__clear"><span class="vh">Explicit: </span>' + esc(s.clear) + '</p></li>';
    }).join('');
    var roster = $('[data-ms-roster]');
    if (roster) roster.innerHTML = wsHTML(R.SAMPLE, {
      litCols: [0, 1, 2, 3], dimCols: [4], flagStatus: true, litCells: ['3:1'],
      tabs: [{ name: R.SOURCE, active: true }, { name: R.TARGET, proposed: true }]
    });
    var gm = $('[data-ms-code-block="gmail"]');
    var gmail = [
      "function draftSummary(output) {",
      "  const body = 'Active roster refreshed.\\n' +",
      "    (output.length - 1) + ' active employees written to training.active_roster.';",
      "  GmailApp.createDraft('reporting-team@example.com', 'Active roster', body);",
      "}"
    ];
    if (gm) gm.innerHTML = codeHTML(allLines(gmail), gmail);
    var draft = $('[data-ms-draft]');
    if (draft) draft.textContent = R.summaryText(R.selectActiveRows(R.SAMPLE));
  }

  /* ----------------------------------------------------------- Slide 7 sort */
  function buildSort() {
    var ul = $('[data-ms-sort]'); if (!ul) return;
    ul.innerHTML = D.sortTasks.map(function (t) {
      return '<li class="sort__item" data-id="' + t.id + '"><p class="sort__task">' + esc(t.text) + '</p>' +
        '<div class="seg" role="group" aria-label="Sort: ' + esc(t.text) + '">' +
        '<button type="button" class="seg__b" data-a="rule" aria-pressed="false">Clear rule</button>' +
        '<button type="button" class="seg__b" data-a="judgment" aria-pressed="false">Needs judgment</button></div>' +
        '<p class="fb" role="status" aria-live="polite"></p></li>';
    }).join('');
    ul.addEventListener('click', function (e) {
      var b = e.target.closest('.seg__b'); if (!b) return;
      var li = b.closest('.sort__item'), t = D.sortTasks.filter(function (x) { return x.id === li.getAttribute('data-id'); })[0];
      $$('.seg__b', li).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var ok = b.getAttribute('data-a') === t.answer;
      li.classList.toggle('is-ok', ok); li.classList.toggle('is-no', !ok);
      $('.fb', li).textContent = (ok ? 'Yes. ' : 'Not quite. ') + t.why;
    });
  }

  /* ---------------------------------------------------------- Slide 9 terms */
  function buildTerms() {
    var form = $('[data-ms-terms]'); if (!form) return;
    var steps = D.terms.map(function (t) { return t.step; });
    var order = [2, 4, 0, 3, 1]; // fixed shuffle so every room sees the same list
    var opts = '<option value="">Choose the matching step</option>' + order.map(function (i) { return '<option>' + esc(steps[i]) + '</option>'; }).join('');
    $('.terms__list', form).innerHTML = D.terms.map(function (t, i) {
      return '<li class="terms__item"><label for="term-' + i + '"><b>' + t.term + '</b> <code>' + esc(t.example) + '</code></label>' +
        '<select id="term-' + i + '" data-answer="' + esc(t.step) + '">' + opts + '</select><span class="terms__mark" aria-live="polite"></span></li>';
    }).join('');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var right = 0, sel = $$('select', form);
      sel.forEach(function (s) {
        var ok = s.value === s.getAttribute('data-answer');
        if (ok) right++;
        var li = s.closest('li'); li.classList.toggle('is-ok', ok); li.classList.toggle('is-no', !ok && s.value !== '');
        s.nextElementSibling.textContent = s.value === '' ? '' : ok ? 'Match' : 'Try again';
      });
      $('.terms__result', form).textContent = right + ' of ' + sel.length + ' matched.';
    });
  }

  /* ---------------------------------------------------------- Lesson engine */
  function sopHTML() {
    return D.sop.map(function (s, i) { return '<li data-sop="' + i + '"><span class="sop__n">' + (i + 1) + '</span><span>' + esc(s.clear) + '</span></li>'; }).join('');
  }

  function Lesson(el, beats) {
    this.el = el; this.beats = beats; this.flat = [];
    var self = this;
    beats.forEach(function (b, bi) { b.steps.forEach(function (s, si) { self.flat.push({ b: bi, s: si }); }); });
    this.N = this.flat.length; this.cur = -1; this.curBeat = -1;
    this.q = {
      kicker: $('[data-ms-kicker]', el), title: $('[data-ms-title]', el), sop: $('[data-ms-sop]', el),
      code: $('[data-ms-code]', el), win: $('[data-ms-code-window]', el), note: $('[data-ms-code-note]', el),
      cons: $('[data-ms-cons]', el), say: $('[data-ms-say]', el), count: $('[data-ms-count]', el),
      bridge: $('[data-ms-bridge]', el), tri: $('[data-ms-tri]', el)
    };
    this.q.sop.innerHTML = sopHTML();
    $('[data-ms-prev]', el).addEventListener('click', function () { self.go(self.cur - 1); });
    $('[data-ms-next]', el).addEventListener('click', function () { self.go(self.cur + 1); });
    this.apply(0);
  }
  Lesson.prototype.indexFor = function (p) {
    var q = clamp((p - 0.02) / 0.96, 0, 0.99999);
    return Math.floor(q * this.N);
  };
  Lesson.prototype.yFor = function (i) {
    var top = topOf(this.el), travel = this.el.offsetHeight - innerHeight;
    return top + (0.02 + ((i + 0.5) / this.N) * 0.96) * travel;
  };
  Lesson.prototype.go = function (i) {
    if (i < 0 || i >= this.N) return;
    this.apply(i);
    window.scrollTo({ top: this.yFor(i), behavior: reduce ? 'auto' : 'smooth' });
  };
  Lesson.prototype.update = function () {
    // Same formula the engine uses for a pinned act, computed here so the
    // lesson stays correct even when the engine's frame loop is paused.
    var travel = Math.max(1, this.el.offsetHeight - innerHeight);
    var i = this.indexFor(clamp((window.scrollY - topOf(this.el)) / travel, 0, 1));
    if (i !== this.cur) this.apply(i);
  };
  Lesson.prototype.slide = function () { return this.beats[Math.max(this.curBeat, 0)].slide; };
  Lesson.prototype.apply = function (i) {
    var f = this.flat[i], b = this.beats[f.b], step = b.steps[f.s], q = this.q;
    if (f.b !== this.curBeat) {
      this.curBeat = f.b;
      q.kicker.textContent = b.kicker || '';
      q.title.textContent = D.slides[b.slide].title;
      q.note.textContent = b.codeNote || '';
      q.code.innerHTML = codeHTML(b.lines, b.source);
      q.cons.innerHTML = b.init ? b.init() : '';
      this.el.setAttribute('data-kind', b.kind || '');
    }
    this.cur = i;
    $$('li', q.sop).forEach(function (li) { li.classList.toggle('is-lit', +li.getAttribute('data-sop') === step.sop); });
    litLines(q.code, step.code);
    if (b.render) b.render(q.cons, step, f.s);
    q.say.textContent = step.say;
    q.count.textContent = 'Step ' + (f.s + 1) + ' of ' + b.steps.length;
    $('[data-ms-prev]', this.el).disabled = i === 0;
    $('[data-ms-next]', this.el).disabled = i === this.N - 1;
    this.scrollCode();
    var self = this;
    requestAnimationFrame(function () { self.drawBridge(); });
  };
  Lesson.prototype.scrollCode = function () {
    var win = this.q.win, lit = $('.ln.is-lit', win);
    if (!lit || win.scrollHeight <= win.clientHeight + 2) return;
    var target = lit.offsetTop - win.clientHeight / 2 + lit.offsetHeight / 2;
    win.scrollTo({ top: Math.max(0, target), behavior: reduce ? 'auto' : 'smooth' });
  };
  /* The light bridge: two quiet curves joining the lit instruction, the lit
     code line and the lit consequence. Pure SVG, recomputed per step. */
  Lesson.prototype.drawBridge = function () {
    var svg = this.q.bridge, tri = this.q.tri;
    if (!svg || smallMQ.matches) { if (svg) svg.innerHTML = ''; return; }
    var T = tri.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + T.width + ' ' + T.height);
    var a = $('.sop li.is-lit', tri), b = $('.ln.is-lit', tri), c = $('[data-lit], .cons .is-lit', this.q.cons);
    var win = this.q.win.getBoundingClientRect();
    function mid(el, side) {
      var r = el.getBoundingClientRect();
      var y = clamp(r.top + r.height / 2, win.top + 4, win.bottom - 4);
      if (el.classList.contains('ln')) return { x: (side === 'l' ? r.left : Math.min(r.right, win.right)) - T.left, y: y - T.top };
      return { x: (side === 'l' ? r.left : r.right) - T.left, y: r.top + r.height / 2 - T.top };
    }
    function curve(p, q) {
      var dx = Math.max(24, (q.x - p.x) * 0.5);
      return '<path d="M' + p.x + ' ' + p.y + ' C ' + (p.x + dx) + ' ' + p.y + ', ' + (q.x - dx) + ' ' + q.y + ', ' + q.x + ' ' + q.y + '"/>' +
        '<circle cx="' + p.x + '" cy="' + p.y + '" r="2.5"/><circle cx="' + q.x + '" cy="' + q.y + '" r="2.5"/>';
    }
    var h = '';
    if (a && b) h += curve(mid(a, 'r'), mid(b, 'l'));
    if (b && c) h += curve(mid(b, 'r'), mid(c, 'l'));
    svg.innerHTML = h;
  };

  /* Read chapter beats (slides 10 to 15). */
  function readBeats() {
    var S = R.SAMPLE;
    var kickers = { 10: 'Function', 11: 'Variables', 12: 'Arrays', 13: 'Condition', 14: 'Loop', 15: 'Services' };
    return D.read.map(function (b) {
      var beat = { slide: b.slide, kind: b.kind, steps: b.steps, kicker: 'Slide ' + b.slide + ' · ' + kickers[b.slide] };
      if (b.excerpt) {
        beat.lines = b.excerpt.map(function (t, i) { return { n: i + 1, text: t }; });
        beat.codeNote = 'Teaching excerpt';
      } else { beat.lines = b.code; beat.codeNote = 'Code.gs'; }

      if (b.kind === 'fn') {
        var rows = [
          ['define', 'Definition', 'function buildActiveRoster() { … }', 'Names the steps. Nothing runs yet.'],
          ['comment', 'Comment', '// Read the roster once, …', 'Explains intent. Ignored when the script runs.'],
          ['braces', 'Body', '{ lines 2 to 19 }', 'Everything inside the braces belongs to the function.'],
          ['run', 'Execution', 'Run  ▸  line 3  ▸  line 4  ▸  line 5  ▸  …', 'Top to bottom, one line after another.']
        ];
        beat.init = function () {
          return '<div class="fnp">' + rows.map(function (r) {
            return '<div class="fnp__row" data-k="' + r[0] + '"><p class="fnp__k">' + r[1] + '</p><p class="fnp__v"><code>' + esc(r[2]) + '</code></p><p class="fnp__d">' + r[3] + '</p></div>';
          }).join('') + '</div>';
        };
        beat.render = function (cons, step, si) {
          $$('.fnp__row', cons).forEach(function (row, i) {
            var on = row.getAttribute('data-k') === step.cons;
            row.classList.toggle('is-lit', on); row.toggleAttribute('data-lit', on);
            row.classList.toggle('is-seen', i <= si);
          });
        };
      }

      if (b.kind === 'vars') {
        var vars = [
          ['sheetName', "'employees.master_roster'", 'string', 'const'],
          ['status', "'Active'", 'string', 'const'],
          ['activeCount', '0', 'number', 'let'],
          ['isActive', 'true', 'boolean', 'const'],
          ['activeCount', '1', 'number', 'let']
        ];
        beat.init = function () {
          return '<div class="vars">' + vars.slice(0, 4).map(function (v, i) {
            return '<div class="var" data-i="' + (i + 1) + '"><p class="var__k">' + v[3] + ' <b>' + v[0] + '</b></p><p class="var__v"><code>' + esc(v[1]) + '</code></p><p class="var__t">' + v[2] + '</p></div>';
          }).join('') + '<p class="vars__eq"><code>=</code> assigns a value. <code>===</code> compares and answers true or false.</p></div>';
        };
        beat.render = function (cons, step) {
          var k = step.cons;
          $$('.var', cons).forEach(function (el) {
            var i = +el.getAttribute('data-i');
            el.classList.toggle('is-on', i <= k || (k === 5 && i <= 4));
            var lit = i === k || (k === 5 && i === 3);
            el.classList.toggle('is-lit', lit); el.toggleAttribute('data-lit', lit);
          });
          var cnt = $('.var[data-i="3"] .var__v', cons);
          cnt.innerHTML = k === 5 ? '<code><s>0</s> 1</code>' : '<code>0</code>';
          $('.vars__eq', cons).classList.toggle('is-on', k >= 4);
        };
      }

      if (b.kind === 'array') {
        beat.init = function () { return '<div class="arrpair"><div class="arrpair__ws"></div><div class="arrpair__arr"></div></div>'; };
        beat.render = function (cons, step) {
          var st = step.cons, o = { maxRows: 4, compact: true, litCols: [], dimCols: [4] }, a = { maxRows: 4, more: true };
          if (st === 'all') { o.litRows = [1, 2, 3, 4]; }
          if (st === 'header') { o.litRows = [1]; a.litRow = 0; }
          if (st === 'row') { o.litRows = [3]; a.litRow = 2; }
          if (st === 'cell') { o.litCells = ['3:3']; a.litRow = 2; a.litCell = [2, 3]; }
          $('.arrpair__ws', cons).innerHTML = wsHTML(S, o) + '<p class="caption">Sheet: rows count from 1</p>';
          $('.arrpair__arr', cons).innerHTML = arrHTML(S, a) + '<p class="caption">Array: indexes count from 0</p>';
          if (st === 'all') $('.arrpair__ws table', cons).setAttribute('data-lit', '');
          if (st === 'header' || st === 'row') { var tr = $('.arrpair__ws tr.is-lit', cons); if (tr) tr.setAttribute('data-lit', ''); }
        };
      }

      if (b.kind === 'trace') {
        beat.init = function () {
          return '<div class="trace"><p class="trace__rule" data-rule>Rule: <code>row[3] === \'Active\'</code></p><div class="trace__rec"></div></div>';
        };
        beat.render = function (cons, step) {
          var box = $('.trace__rec', cons), rule = $('[data-rule]', cons);
          rule.classList.toggle('is-lit', step.cons === null); rule.toggleAttribute('data-lit', step.cons === null);
          if (step.cons === null) { box.innerHTML = '<p class="caption">One record at a time meets the same rule.</p>'; return; }
          var row = S[step.cons], ok = R.isIncluded(row), nullText = row[3] === 'NULL';
          box.innerHTML = '<div class="rec' + (ok ? ' is-in' : ' is-out') + (nullText ? ' is-warn' : '') + '" data-lit>' +
            '<p class="rec__who"><b>' + esc(row[1]) + '</b> <span>' + esc(row[0]) + ' · sheet row ' + (step.cons + 1) + '</span></p>' +
            '<p class="rec__eval"><code>' + esc(literal(row[3])) + " === 'Active'</code> <span class=\"chip " + (ok ? 'chip--true' : 'chip--false') + '">' + ok + '</span></p>' +
            '<p class="rec__out">' + (ok ? 'Included: pushed to output.' : 'Skipped: output unchanged.') + '</p>' +
            (nullText ? '<p class="rec__warn"><span class="tag tag--warn">Attention</span> ' + esc(R.describeStatus(row[3])) + ', not JavaScript <code>null</code>.</p>' : '') + '</div>';
        };
      }

      if (b.kind === 'loop') {
        beat.init = function () { return '<div class="looppair"><div class="looppair__ws"></div><div class="looppair__out"></div></div>'; };
        beat.render = function (cons, step) {
          var k = step.cons, marks = {};
          for (var r = 1; r <= k && r < S.length; r++) marks[r + 1] = R.isIncluded(S[r]) ? 'is-in' : 'is-out';
          $('.looppair__ws', cons).innerHTML = wsHTML(S, { compact: true, litRows: k > 0 ? [k + 1] : [], marks: marks, dimCols: [4] });
          var out = R.selectActiveRows(S.slice(0, Math.min(k, S.length - 1) + 1));
          $('.looppair__out', cons).innerHTML = '<p class="looppair__h">output <span>' + out.length + ' rows</span></p>' + arrHTML(out, { litRow: out.length - 1 });
          var lit = k > 0 ? $('.looppair__ws tr.is-lit', cons) : $('.looppair__out .arr__row.is-lit', cons);
          if (lit) lit.setAttribute('data-lit', '');
        };
      }

      if (b.kind === 'chain') {
        var last = COLS[S[0].length - 1] + S.length;
        var nodes = [
          ['Spreadsheet', 'The training copy this script is bound to', 'SpreadsheetApp.getActiveSpreadsheet()'],
          ['Sheet', R.SOURCE, '.getSheetByName(…)'],
          ['Range', 'A1:' + last + ', the used cells', '.getDataRange()'],
          ['Values', S.length + ' rows × ' + S[0].length + ' columns, in memory', '.getValues()']
        ];
        beat.init = function () {
          return '<div class="chain">' + nodes.map(function (n, i) {
            return '<div class="chain__n" data-i="' + (i + 1) + '"><p class="chain__k">' + n[0] + '</p><p class="chain__v">' + esc(n[1]) + '</p><p class="chain__c"><code>' + esc(n[2]) + '</code></p></div>';
          }).join('') + '<div class="phases"><div class="phase"><b>Read</b><span>1 call: <code>getValues()</code></span></div><div class="phase"><b>Process</b><span>In memory: ' + (S.length - 1) + ' records, no service calls</span></div><div class="phase"><b>Write</b><span>1 call: <code>setValues()</code></span></div></div></div>';
        };
        beat.render = function (cons, step) {
          var k = step.cons;
          $$('.chain__n', cons).forEach(function (el) {
            var i = +el.getAttribute('data-i');
            el.classList.toggle('is-on', i <= k);
            var lit = i === k && k < 4 || (k === 4 && i === 4);
            el.classList.toggle('is-lit', lit && k < 4); el.toggleAttribute('data-lit', lit && k < 4);
          });
          var ph = $('.phases', cons); ph.classList.toggle('is-on', k === 4); ph.toggleAttribute('data-lit', k === 4);
        };
      }
      return beat;
    });
  }

  /* The peak (slide 17): the whole procedure, end to end. */
  function runBeat() {
    var S = R.SAMPLE, steps = [];
    steps.push({ sop: 0, code: [3, 4, 5], say: 'Open the roster: the whole of employees.master_roster is read into memory in one call.', st: { ph: 'read', i: 0 } });
    steps.push({ sop: 2, code: [7], say: 'Start the output with three headers, in the agreed order.', st: { ph: 'loop', i: 0 } });
    for (var i = 1; i < S.length; i++) {
      var ok = R.isIncluded(S[i]);
      steps.push({ sop: 1, code: ok ? [8, 9, 10, 11] : [8, 9, 10],
        say: S[i][1] + ': Status is ' + R.describeStatus(S[i][3]) + '. ' + (ok ? 'Included.' : 'Skipped.'), st: { ph: 'loop', i: i } });
    }
    steps.push({ sop: 3, code: [15, 16], say: 'Find training.active_roster, or create it on the first run.', st: { ph: 'target', i: S.length - 1 } });
    steps.push({ sop: 3, code: [17], say: 'Clear it first, so a rerun replaces the list instead of duplicating it.', st: { ph: 'clear', i: S.length - 1 } });
    steps.push({ sop: 3, code: [18], say: 'Write every output row in one call.', st: { ph: 'write', i: S.length - 1 } });
    steps.push({ sop: 4, code: [19], say: 'Log the count. Execution completed. Next: check it against a manual filter.', st: { ph: 'log', i: S.length - 1 } });
    var result = R.run(R.makeWorkbook());
    // The four columns the procedure reads; Supervisor is not part of it.
    var S4 = S.map(function (r) { return r.slice(0, 4); });
    return {
      slide: 17, kind: 'run', kicker: 'Slide 17 · The full run', lines: allLines(R.SCRIPT), codeNote: 'Code.gs, complete', steps: steps,
      init: function () {
        return '<div class="runv"><div class="runv__sheet"></div><p class="runv__mem"></p><div class="runv__log"></div></div>';
      },
      render: function (cons, step) {
        var st = step.st, k = st.i, marks = {};
        for (var r = 1; r <= k; r++) marks[r + 1] = R.isIncluded(S[r]) ? 'is-in' : 'is-out';
        var targetShown = st.ph === 'target' || st.ph === 'clear' || st.ph === 'write' || st.ph === 'log';
        var written = st.ph === 'write' || st.ph === 'log';
        var tabs = [{ name: R.SOURCE, active: !written }];
        if (targetShown) tabs.push({ name: R.TARGET, active: written, fresh: st.ph === 'target' });
        var sheet = $('.runv__sheet', cons);
        if (written) {
          sheet.innerHTML = wsHTML(result.output, { compact: true, tabs: tabs, litRows: [] });
          sheet.classList.add('is-written');
          var tb = $('table', sheet); tb.setAttribute('data-lit', '');
          if (!reduce) cons.closest('.lesson').classList.add('is-sweep');
        } else {
          sheet.classList.remove('is-written');
          sheet.innerHTML = wsHTML(S4, { compact: true, flagStatus: true, tabs: tabs, litRows: st.ph === 'loop' && k > 0 ? [k + 1] : st.ph === 'read' ? allLines(S) : [], marks: marks });
          var lit = $('tr.is-lit', sheet); if (lit) lit.setAttribute('data-lit', ''); else $('table', sheet).setAttribute('data-lit', '');
          cons.closest('.lesson').classList.remove('is-sweep');
        }
        var inMem = R.selectActiveRows(S.slice(0, k + 1));
        $('.runv__mem', cons).innerHTML = st.ph === 'read' ? '<code>values</code> holds ' + S.length + ' rows in memory.' :
          '<code>output</code> holds ' + inMem.length + ' rows: the header' + (inMem.length > 1 ? ' and ' + (inMem.length - 1) + ' active employee' + (inMem.length > 2 ? 's' : '') : '') + '.';
        var log = [result.log[0]];
        if (st.ph === 'log') log = result.log;
        $('.runv__log', cons).innerHTML = logHTML(log) + '<p class="caption">Simulated in your browser with the sample roster. Same logic, same result as Apps Script.</p>';
      }
    };
  }

  /* --------------------------------------------------- Slide 18 · the check */
  function buildCheck() {
    var el = $('[data-ms-check]'); if (!el) return;
    var wb = R.makeWorkbook(), res = R.run(wb), manual = R.manualFilter(R.SAMPLE), cmp = R.compare(res.output, manual);
    var excl = R.excluded(R.SAMPLE);
    function mark(ok) { return '<span class="chip ' + (ok ? 'chip--true' : 'chip--false') + '">' + (ok ? 'Pass' : 'Fail') + '</span>'; }
    el.innerHTML =
      '<div class="check__col"><p class="check__h">Script output <code>' + R.TARGET + '</code></p>' + wsHTML(res.output, { compact: true }) + '</div>' +
      '<div class="check__col"><p class="check__h">Manual filter: Status is Active</p>' + wsHTML(manual, { compact: true }) + '</div>' +
      '<div class="check__list"><ul class="checks">' +
        '<li>' + mark(cmp.sameIds) + ' Included IDs match: ' + (manual.length - 1) + ' of ' + (manual.length - 1) + '</li>' +
        '<li>' + mark(cmp.sameHeader) + ' Field order: ' + R.OUTPUT_HEADER.join(', ') + '</li>' +
        '<li>' + mark(excl.length + manual.length - 1 === R.SAMPLE.length - 1) + ' Excluded records accounted for: ' + excl.map(function (r) { return esc(r[0]) + ' (' + esc(R.describeStatus(r[3])) + ')'; }).join('; ') + '</li>' +
      '</ul>' +
      '<div class="rerun"><p class="rerun__h">Second run</p><p class="rerun__n" role="status" aria-live="polite"></p>' +
      '<div class="row"><button type="button" class="btn btn--sm" data-rerun="replace">Run again</button>' +
      '<button type="button" class="btn btn--ghost btn--sm" data-rerun="append">Run again, appending instead</button>' +
      '<button type="button" class="btn btn--ghost btn--sm" data-rerun="reset">Reset</button></div></div></div>';
    var runs = 1;
    function show(warn) {
      var t = wb.sheets[R.TARGET], ids = t.slice(1).map(function (r) { return r[0]; });
      var dup = ids.length !== new Set(ids).size;
      var n = $('.rerun__n', el);
      n.innerHTML = '<b>' + (t.length - 1) + '</b> employee rows in <code>' + R.TARGET + '</code> after ' + runs + ' run' + (runs > 1 ? 's' : '') + '.' +
        (dup ? ' <span class="tag tag--warn">Duplicates</span> Appending repeated every record.' : ' No duplicates.');
      n.classList.toggle('is-warn', dup);
    }
    show();
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-rerun]'); if (!b) return;
      var a = b.getAttribute('data-rerun');
      if (a === 'reset') { wb = R.makeWorkbook(); R.run(wb); runs = 1; }
      else if (a === 'replace') { R.run(wb); runs++; }
      else { R.runAppending(wb); runs++; }
      show();
    });
  }

  /* ------------------------------------------------- Slide 20 · error lab */
  function buildLab() {
    var el = $('[data-ms-lab]'); if (!el) return;
    el.innerHTML =
      '<div class="lab__controls">' +
        '<label class="field"><span>Sheet name on line 4</span><input type="text" spellcheck="false" autocomplete="off" value="employees.master_rooster" data-lab-sheet></label>' +
        '<label class="field"><span>Status on line 10</span><select data-lab-status><option>Active</option><option>active</option></select></label>' +
        '<button type="button" class="btn" data-lab-run>Run</button>' +
      '</div>' +
      '<div class="lab__view"><pre class="code code--sm" data-lab-code aria-label="The lines that change"></pre><div class="lab__out" role="status" aria-live="polite"><p class="caption">Press Run. The sheet name is misspelled on purpose.</p></div></div>';
    var input = $('[data-lab-sheet]', el), status = $('[data-lab-status]', el), pre = $('[data-lab-code]', el), out = $('.lab__out', el);
    function lines() {
      var src = R.SCRIPT.slice();
      src[3] = "  const source = ss.getSheetByName('" + input.value + "');";
      src[9] = "    if (row[3] === '" + status.value + "') {";
      return src;
    }
    function draw(lit) { pre.innerHTML = codeHTML([3, 4, 5, '…', 10, 11, 12], lines()); litLines(pre, lit || []); }
    draw();
    input.addEventListener('input', function () { draw(); });
    status.addEventListener('change', function () { draw(); });
    $('[data-lab-run]', el).addEventListener('click', function () {
      var r = R.run(R.makeWorkbook(), { sourceName: input.value, status: status.value });
      if (!r.ok) {
        draw([4, 5]); pre.querySelector('[data-line="5"]').classList.add('is-err');
        out.innerHTML = logHTML(r.log) +
          '<p class="diag"><span class="tag tag--warn">Execution error</span> Line 4 asked for a sheet named <code>' + esc(input.value || '(nothing)') + '</code>. No sheet has that name, so <code>getSheetByName</code> returned <code>null</code>, and line 5 cannot call <code>getDataRange</code> on nothing. Fix the name and run again.</p>';
      } else if (r.output.length === 1) {
        draw([10]);
        out.innerHTML = logHTML(r.log) +
          '<p class="diag"><span class="tag tag--warn">Incorrect result</span> It completed without an error, and wrote 0 rows. <code>\'active\' === \'Active\'</code> is false: case matters. Only an output check catches this.</p>';
      } else {
        draw([18, 19]);
        out.innerHTML = logHTML(r.log) + '<p class="diag diag--ok"><span class="tag tag--ok">Completed</span> ' + (r.output.length - 1) + ' rows written. Now the output check applies.</p>';
      }
    });
  }

  /* ------------------------------------------------ Slide 23 · predictions */
  function buildPredict() {
    var el = $('[data-ms-predict]'); if (!el) return;
    el.innerHTML = D.predict.map(function (p, i) {
      return '<fieldset class="pq" data-i="' + i + '"><legend><span class="pq__n">' + (i + 1) + '</span>' + esc(p.q) + '</legend>' +
        '<div class="pq__opts">' + p.options.map(function (o) { return '<button type="button" class="seg__b" aria-pressed="false" data-o="' + esc(o) + '">' + esc(o) + '</button>'; }).join('') + '</div>' +
        '<div class="pq__a" hidden><p class="pq__why" role="status"></p><pre class="code code--sm">' + codeHTML(p.line.length > 1 ? p.line : [p.line[0] - 1, p.line[0], p.line[0] + 1]) + '</pre></div></fieldset>';
    }).join('');
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.seg__b'); if (!b) return;
      var fs = b.closest('.pq'), p = D.predict[+fs.getAttribute('data-i')];
      $$('.seg__b', fs).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var ok = b.getAttribute('data-o') === p.answer, a = $('.pq__a', fs);
      a.hidden = false; fs.classList.toggle('is-ok', ok); fs.classList.toggle('is-no', !ok);
      $('.pq__why', fs).innerHTML = '<b>' + (ok ? 'Yes.' : 'The answer is ' + esc(p.answer) + '.') + '</b> ' + esc(p.why);
      litLines($('pre', a), p.line);
    });
  }

  /* ------------------------------------------------------ Slide 24 · close */
  function buildClose() {
    var el = $('[data-ms-close]'); if (!el) return;
    el.innerHTML =
      '<div class="card-sheet card-sheet--sm"><p class="sheet__title">The procedure</p><ol class="sheet__steps">' + D.sop.map(function (s) { return '<li>' + esc(s.clear) + '</li>'; }).join('') + '</ol></div>' +
      '<div class="try">' +
        '<div class="try__row"><label class="field field--inline"><span>Change the rule</span><select data-try-status><option>Active</option><option>Inactive</option><option>NULL</option></select></label>' +
        '<button type="button" class="btn btn--moon btn--sm" data-try-run>Run</button></div>' +
        '<pre class="code code--sm" data-try-code></pre>' +
        '<div class="try__out" role="status" aria-live="polite"></div>' +
      '</div>';
    var sel = $('[data-try-status]', el), pre = $('[data-try-code]', el), out = $('.try__out', el);
    function lines() { var s = R.SCRIPT.slice(); s[9] = "    if (row[3] === '" + sel.value + "') {"; return s; }
    function draw() { pre.innerHTML = codeHTML([10, 11], lines()); litLines(pre, [10]); }
    function run() {
      var r = R.run(R.makeWorkbook(), { status: sel.value });
      var v = R.compare(r.output, R.manualFilter(R.SAMPLE, sel.value));
      out.innerHTML = wsHTML(r.output, { compact: true, tabs: [{ name: R.TARGET, active: true }] }) +
        '<p class="try__v"><span class="tag ' + (v.sameIds ? 'tag--ok' : 'tag--warn') + '">' + (v.sameIds ? 'Verified' : 'Mismatch') + '</span> ' +
        (r.output.length - 1) + ' rows, checked against a manual filter for Status ' + esc(literal(sel.value)) + '.</p>';
    }
    draw(); run();
    sel.addEventListener('change', draw);
    $('[data-try-run]', el).addEventListener('click', run);
  }

  /* ------------------------------------------------------------- hero */
  var hero = $('[data-ms-hero]'), planes = {};
  $$('[data-ms-plane]').forEach(function (p) { planes[p.getAttribute('data-ms-plane')] = p; });
  var lastHeroP = -1;
  function heroFrame() {
    if (!hero) return;
    var p = reduce ? 0 : pOf(hero);
    if (Math.abs(p - lastHeroP) < 0.0005) return;
    lastHeroP = p;
    var m = smallMQ.matches, e = smooth(p), t = smooth(clamp(p / 0.8, 0, 1));
    planes.far.style.transform = 'translate3d(0,' + (-3 * p) + 'vh,0) scale(' + (1.08 - 0.05 * p) + ')';
    planes.beam.style.opacity = String(0.95 - 0.7 * p);
    planes.beam.style.transform = 'translate3d(' + (8 * p) + 'vw,0,0) skewX(-14deg)';
    planes.copy.style.transform = 'translate3d(0,' + (-16 * e) + 'vh,0)';
    planes.copy.style.opacity = String(1 - smooth((p - 0.12) / 0.34));
    planes.copy.style.visibility = p > 0.5 ? 'hidden' : 'visible';
    planes.desk.style.transform = 'translate3d(0,' + (-24 * e) + 'vh,0) scale(' + (1 + 0.06 * p) + ')';
    planes.mug.style.transform = 'translate3d(' + (7 * e) + 'vw,' + (36 * e) + 'vh,0)';
    planes.mug.style.opacity = String(1 - smooth((p - 0.45) / 0.3));
    var rx = (m ? 48 : 58) * (1 - t), rz = -7 * (1 - t);
    var ty = (m ? 18 : 16) * (1 - t);           // from lying on the desk to centred
    var sc = (m ? 1 : 1) + (m ? 0.12 : 0.34) * t;
    planes.sheet.style.transform = 'translate3d(-50%,calc(-50% + ' + ty + 'vh),0) perspective(1400px) rotateX(' + rx + 'deg) rotateZ(' + rz + 'deg) scale(' + sc + ')';
    planes.sheet.style.setProperty('--shadow', String(1 - t));
    planes.paper.style.opacity = String(smooth((p - 0.62) / 0.3));
  }

  /* --------------------------------------------------- presenter + notes */
  var presenting = false, notesOpen = false, timingOn = false;
  var syncNow = function () {};
  var notesEl = $('[data-ms-notes]'), hud = $('[data-ms-hud]'), presentBtn = $('[data-ms-present]');
  var lessons = [];
  function chapterOf(slide) {
    for (var i = 0; i < D.chapters.length; i++) if (D.chapters[i].slides.indexOf(slide) >= 0) return D.chapters[i];
    return D.chapters[0];
  }
  var currentSlide = 1;
  function detectSlide() {
    var y = innerHeight * 0.45, found = null;
    $$('main > section').some(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) { found = s; return true; }
      return false;
    });
    if (!found) return currentSlide;
    if (found.hasAttribute('data-ms-lesson')) return found.__lesson ? found.__lesson.slide() : currentSlide;
    var v = found.getAttribute('data-slide');
    return v === 'break' ? 'break' : +v;
  }
  function renderNotes() {
    var s = D.slides[currentSlide]; if (!s) return;
    var ch = chapterOf(currentSlide);
    var label = currentSlide === 'break' ? 'Break' : 'Slide ' + currentSlide;
    $('[data-ms-hud-slide]').textContent = label + ' · ' + s.min + ' min · ' + ch.label;
    $('[data-ms-n-slide]').textContent = label + ' · ' + ch.label + (timingOn ? ' · ' + s.min + ' min' : '');
    $('[data-ms-n-title]').textContent = s.title;
    var n = s.notes, rows = [['Teaching point', n.point], ['Expected misconception', n.misconception], ['Cue', n.cue], ['Bridge', n.bridge]];
    $('[data-ms-n-body]').innerHTML = rows.filter(function (r) { return r[1]; }).map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('');
  }
  function setPresenting(on) {
    presenting = on;
    doc.documentElement.classList.toggle('is-presenting', on);
    presentBtn.setAttribute('aria-pressed', String(on));
    presentBtn.textContent = on ? 'Exit' : 'Present';
    hud.hidden = !on;
    if (!on) setNotes(false);
    renderNotes();
  }
  function setNotes(on) { notesOpen = on; notesEl.hidden = !on; doc.documentElement.classList.toggle('is-notes', on); renderNotes(); }

  function stops() {
    var ys = [];
    $$('main > section').forEach(function (s) {
      if (s.__lesson) { for (var i = 0; i < s.__lesson.N; i++) ys.push(s.__lesson.yFor(i)); return; }
      var ps = s.getAttribute('data-ms-stops');
      if (ps) {
        var top = topOf(s), travel = Math.max(0, s.offsetHeight - innerHeight);
        ps.split(/\s+/).forEach(function (p) { ys.push(top + parseFloat(p) * travel); });
        return;
      }
      if (s.hasAttribute('data-ms-stop')) ys.push(topOf(s) - railH());
    });
    ys.sort(function (a, b) { return a - b; });
    return ys.filter(function (y, i) { return i === 0 || y - ys[i - 1] > 8; }).map(function (y) { return Math.max(0, Math.round(y)); });
  }
  function railH() { var r = $('[data-ms-rail]'); return r ? r.offsetHeight + 8 : 0; }
  function step(dir) {
    var y = window.scrollY, list = stops(), target = null;
    if (dir > 0) { for (var i = 0; i < list.length; i++) if (list[i] > y + 4) { target = list[i]; break; } }
    else { for (var j = list.length - 1; j >= 0; j--) if (list[j] < y - 4) { target = list[j]; break; } }
    if (target !== null) {
      window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
      setTimeout(syncNow, 0); setTimeout(syncNow, 700);
    }
  }

  /* -------------------------------------------------- rail + deep links */
  var chapterEls = {};
  $$('[data-ms-chapter-start]').forEach(function (s) { chapterEls[s.getAttribute('data-ms-chapter-start')] = s; });
  var lastChapter = null, seen = E.store.get('seen', []);
  function railFrame() {
    var y = window.scrollY + innerHeight * 0.4, ids = D.chapters.map(function (c) { return c.id; });
    var starts = ids.map(function (id) { return id === 'recognize' ? 0 : topOf(chapterEls[id]); });
    var end = doc.documentElement.scrollHeight - innerHeight * 0.6;
    var active = ids[0];
    ids.forEach(function (id, i) {
      var s = starts[i], e2 = i + 1 < ids.length ? starts[i + 1] : end;
      var f = clamp((y - s) / Math.max(1, e2 - s), 0, 1);
      if (y >= s) active = id;
      var a = $('[data-ms-chapter="' + id + '"]');
      a.querySelector('.rail__seg i').style.transform = 'scaleX(' + f.toFixed(3) + ')';
      if (f >= 0.98 && seen.indexOf(id) < 0) { seen.push(id); E.store.set('seen', seen); }
      a.classList.toggle('is-done', seen.indexOf(id) >= 0 && f >= 0.98);
    });
    if (active !== lastChapter) {
      lastChapter = active;
      $$('[data-ms-chapter]').forEach(function (a) {
        var on = a.getAttribute('data-ms-chapter') === active;
        a.classList.toggle('is-current', on);
        if (on) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
      });
    }
  }
  function jump(id, instant) {
    var el = id === 'begin' ? null : doc.getElementById(id);
    var y = el ? topOf(el) - (el.classList.contains('chapter') ? 0 : railH()) : 0;
    window.scrollTo({ top: Math.max(0, y), behavior: instant || reduce ? 'auto' : 'smooth' });
    if (el && !instant) {
      var h = el.querySelector('h2, h1');
      if (h) { h.setAttribute('tabindex', '-1'); setTimeout(function () { h.focus({ preventScroll: true }); }, instant ? 0 : 500); }
    }
  }
  doc.addEventListener('click', function (e) {
    var a = e.target.closest('[data-ms-link]'); if (!a) return;
    e.preventDefault();
    var id = a.getAttribute('data-ms-link');
    jump(id); E.push(id);
  });

  /* --------------------------------------------------------------- timer */
  var timerT = null;
  function startTimer() {
    var panel = $('[data-ms-timer-panel]'), left = $('[data-ms-timer-left]'), end = Date.now() + 5 * 60 * 1000;
    panel.hidden = false;
    clearInterval(timerT);
    function tick() {
      var s = Math.max(0, Math.round((end - Date.now()) / 1000));
      left.textContent = Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
      if (s === 0) { clearInterval(timerT); left.textContent = 'Time'; }
    }
    tick(); timerT = setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------------- keys */
  doc.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea' || e.altKey || e.ctrlKey || e.metaKey) return;
    var k = e.key;
    if (k === 'p' || k === 'P') { setPresenting(!presenting); return; }
    if (!presenting) return;
    if (k === 'PageDown' || k === 'ArrowRight' || k === 'ArrowDown' || (k === ' ' && tag !== 'button')) { e.preventDefault(); step(1); }
    else if (k === 'PageUp' || k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); step(-1); }
    else if (k === 'n' || k === 'N') setNotes(!notesOpen);
    else if (k === 't' || k === 'T') { timingOn = !timingOn; renderNotes(); }
    else if (k === 'f' || k === 'F') E.fullscreen(doc.documentElement);
    else if (k === 'Escape') setPresenting(false);
  });

  /* ---------------------------------------------------------------- boot */
  function boot() {
    // Under reduced motion the hero keeps its composition but not its travel,
    // so it does not need the extra pinned scroll.
    if (reduce && hero) hero.setAttribute('data-sc-span', '1.02');
    buildStatic(); buildSort(); buildTerms(); buildCheck(); buildLab(); buildPredict(); buildClose();
    var readEl = $('[data-ms-lesson="read"]'), runEl = $('[data-ms-lesson="run"]');
    if (readEl) { readEl.__lesson = new Lesson(readEl, readBeats()); lessons.push(readEl.__lesson); }
    if (runEl) { runEl.__lesson = new Lesson(runEl, [runBeat()]); lessons.push(runEl.__lesson); }

    window.ScrollCraft.mount(doc.body);

    presentBtn.addEventListener('click', function () { setPresenting(!presenting); });
    $('[data-ms-notes-close]').addEventListener('click', function () { setNotes(false); });
    var tb = $('[data-ms-timer]'); if (tb) tb.addEventListener('click', startTimer);
    $('[data-ms-timer-stop]').addEventListener('click', function () { clearInterval(timerT); $('[data-ms-timer-panel]').hidden = true; });

    var lastY = -1, lastW = innerWidth;
    function sync() {
      var y = window.scrollY;
      if (y === lastY && innerWidth === lastW) return;
      lastY = y; lastW = innerWidth;
      lessons.forEach(function (l) { l.update(); });
      railFrame();
      var s = detectSlide();
      if (s !== currentSlide) { currentSlide = s; if (presenting) renderNotes(); }
    }
    syncNow = sync;
    function frame() { sync(); heroFrame(); requestAnimationFrame(frame); }
    requestAnimationFrame(frame);
    // rAF pauses in background windows (a presenter's second screen, a
    // hidden tab); scroll events do not, so notes and the rail stay correct.
    addEventListener('scroll', function () { setTimeout(sync, 0); }, { passive: true });
    addEventListener('resize', function () { lessons.forEach(function (l) { l.drawBridge(); }); lastHeroP = -1; });

    E.getInitial(function (init) {
      if (init.params.mode === 'present') setPresenting(true);
      if (init.hash && (init.hash === 'begin' || doc.getElementById(init.hash))) setTimeout(function () { jump(init.hash, true); }, 80);
    });
    E.onChange(function (hash) { if (hash) jump(hash); });
    doc.documentElement.setAttribute('data-platform', E.platform());
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})();
