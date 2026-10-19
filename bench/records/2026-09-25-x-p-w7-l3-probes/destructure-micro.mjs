// SERVED MODEL: claude-opus-5-5
// X.P.W7.l3 micro-probe: array destructuring vs indexing in an action body (Firefox vs Chromium). Result: 24 vs 23 ms / 18.5 vs 18.4 ms — not a cause.
const { firefox, chromium } = await import("/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs");
const body = () => {
  const d = ([, rest, fault]) => ({ blocks: rest.length, fault });
  const x = (v) => ({ blocks: v[1].length, fault: v[2] });
  const run = (f) => { let s = 0; const t0 = performance.now(); for (let i = 0; i < 2e6; i++) { const r = f([i, [], i & 1 ? undefined : i]); s += r.blocks; } return performance.now() - t0; };
  const out = { d: [], x: [] };
  for (let k = 0; k < 7; k++) { out.d.push(run(d)); out.x.push(run(x)); }
  const med = (a) => a.sort((p, q) => p - q)[3];
  return { destructure: med(out.d), index: med(out.x) };
};
for (const L of [firefox, chromium]) { const b = await L.launch(); const p = await b.newPage(); console.log(L.name(), JSON.stringify(await p.evaluate(body))); await b.close(); }
