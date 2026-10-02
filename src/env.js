/* Platform adapter. The page never touches location, history or storage
   directly; it goes through here, so the same source runs as a static site and
   inside the Apps Script HtmlService iframe, where the top window's URL is out
   of reach and google.script.history / google.script.url stand in for it. */
(function (root, factory) {
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PressEnv = api;
})(typeof self !== 'undefined' ? self : this, function (g) {
  'use strict';

  function gs() { return g.google && g.google.script; }
  function isGAS() { var s = gs(); return !!(s && s.history && s.url); }

  function parseSearch(search) {
    var out = {};
    (search || '').replace(/^\?/, '').split('&').forEach(function (kv) {
      if (!kv) return;
      var i = kv.indexOf('=');
      var k = decodeURIComponent(i < 0 ? kv : kv.slice(0, i));
      out[k] = i < 0 ? '' : decodeURIComponent(kv.slice(i + 1).replace(/\+/g, ' '));
    });
    return out;
  }

  /* Resolve the starting hash and query parameters. Asynchronous under Apps
     Script (getLocation is a callback), synchronous-but-callback on static. */
  function getInitial(cb) {
    if (isGAS()) {
      gs().url.getLocation(function (loc) {
        var p = {};
        var params = (loc && loc.parameter) || {};
        Object.keys(params).forEach(function (k) { p[k] = String(params[k]); });
        cb({ hash: (loc && loc.hash) || '', params: p });
      });
      return;
    }
    var l = g.location || { hash: '', search: '' };
    cb({ hash: (l.hash || '').replace(/^#/, ''), params: parseSearch(l.search) });
  }

  function push(hash, state) {
    if (isGAS()) { gs().history.push(state || {}, null, hash); return; }
    if (g.history && g.history.pushState) g.history.pushState(state || {}, '', '#' + hash);
  }

  function replace(hash, state) {
    if (isGAS()) { gs().history.replace(state || {}, null, hash); return; }
    if (g.history && g.history.replaceState) g.history.replaceState(state || {}, '', '#' + hash);
  }

  function onChange(cb) {
    if (isGAS()) {
      gs().history.setChangeHandler(function (e) { cb((e && e.location && e.location.hash) || ''); });
      return;
    }
    g.addEventListener('popstate', function () { cb((g.location.hash || '').replace(/^#/, '')); });
  }

  // Storage can be absent, full or blocked (private windows, partitioned
  // iframes). Progress is a convenience, so failure is silent.
  var mem = {};
  var store = {
    get: function (k, fallback) {
      try { var v = g.localStorage.getItem('moonscript:' + k); return v === null ? fallback : JSON.parse(v); }
      catch (e) { return k in mem ? mem[k] : fallback; }
    },
    set: function (k, v) {
      mem[k] = v;
      try { g.localStorage.setItem('moonscript:' + k, JSON.stringify(v)); } catch (e) { /* keep in memory */ }
    }
  };

  /* Copy text. The async Clipboard API is commonly blocked in a cross-origin
     iframe, so fall back to a selected textarea and execCommand. Resolves true
     when the copy is believed to have happened, false when the reader has to
     press Ctrl+C themselves (the text is left selected for them). */
  function copy(text) {
    return new Promise(function (resolve) {
      function legacy() {
        var ta = g.document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0'; ta.style.top = '0';
        g.document.body.appendChild(ta); ta.select();
        var ok = false;
        try { ok = g.document.execCommand('copy'); } catch (e) { ok = false; }
        ta.remove();
        resolve(ok);
      }
      try {
        if (g.navigator && g.navigator.clipboard && g.isSecureContext) {
          g.navigator.clipboard.writeText(text).then(function () { resolve(true); }, legacy);
          return;
        }
      } catch (e) { /* fall through */ }
      legacy();
    });
  }

  function fullscreen(el) {
    try {
      var fn = el.requestFullscreen || el.webkitRequestFullscreen;
      if (!fn) return Promise.resolve(false);
      var r = fn.call(el);
      return r && r.then ? r.then(function () { return true; }, function () { return false; }) : Promise.resolve(true);
    } catch (e) { return Promise.resolve(false); }
  }

  return {
    isGAS: isGAS, parseSearch: parseSearch, getInitial: getInitial,
    push: push, replace: replace, onChange: onChange, store: store,
    copy: copy, fullscreen: fullscreen,
    platform: function () { return isGAS() ? 'apps-script' : 'static'; }
  };
});
