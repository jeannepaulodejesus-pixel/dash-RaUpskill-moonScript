const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

function load(globalObj) {
  const file = path.join(__dirname, '..', 'src', 'env.js');
  delete require.cache[require.resolve(file)];
  const saved = globalThis.self;
  globalThis.self = globalObj;
  try { return require(file); } finally { globalThis.self = saved; }
}

test('static: reads hash and query, pushes with history', () => {
  const pushed = [];
  const g = {
    location: { hash: '#read', search: '?mode=present&x=a%20b' },
    history: { pushState: (s, t, u) => pushed.push(u), replaceState() {} },
    addEventListener() {}
  };
  const env = load(g);
  assert.equal(env.platform(), 'static');
  env.getInitial(init => {
    assert.equal(init.hash, 'read');
    assert.deepEqual(init.params, { mode: 'present', x: 'a b' });
  });
  env.push('run');
  assert.deepEqual(pushed, ['#run']);
});

test('apps script: uses google.script.url and google.script.history', () => {
  const calls = [];
  const g = {
    google: { script: {
      url: { getLocation: cb => cb({ hash: 'verify', parameter: { mode: 'present' } }) },
      history: {
        push: (s, p, h) => calls.push(['push', h]),
        replace: (s, p, h) => calls.push(['replace', h]),
        setChangeHandler: fn => fn({ location: { hash: 'day2' } })
      }
    } }
  };
  const env = load(g);
  assert.equal(env.platform(), 'apps-script');
  let got;
  env.getInitial(i => { got = i; });
  assert.deepEqual(got, { hash: 'verify', params: { mode: 'present' } });
  env.push('read'); env.replace('run');
  assert.deepEqual(calls, [['push', 'read'], ['replace', 'run']]);
  let changed; env.onChange(h => { changed = h; });
  assert.equal(changed, 'day2');
});

test('store survives a blocked localStorage', () => {
  const g = { get localStorage() { throw new Error('blocked'); } };
  const env = load(g);
  env.store.set('seen', ['read']);
  assert.deepEqual(env.store.get('seen', []), ['read']);
  assert.equal(env.store.get('missing', 7), 7);
});
