// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.l4 — allocation per pass (V8 total_allocated_bytes, 256 KB grain) of each arm over the large sheets, whole
// and per reader (the recorder arm's calls replayed).  node --expose-gc bench/paired/alloc.mjs <arm> [arm …]
import v8 from "node:v8";
const B = new URL(".", import.meta.url).pathname;
const c = await import(B + "common.mjs");
const S = c.largeSheets().map((x) => x.text);
const rec = await import(B + "_build/recorder.mjs");
globalThis.__recording = true; for (const s of S) rec.css.parseStylesheet(s); globalThis.__recording = false;
const calls = {}; for (const [n, ...a] of globalThis.__readerLog) (calls[n === "splitTopLevel" ? n + a[1] : n] ??= []).push(a);
const arms = process.argv.slice(2);
for (const a of arms) {
  const m = await import(B + `_build/${a}.mjs`);
  calls.parseCssValue = calls.declaration.map(([r]) => m.sheet.declaration(r)).filter(Boolean).map((d) => [d.value]);
  const fns = { parseCssValue: m.css.parseCssValue, splitTopLevel: m.splitTopLevel, ...m.sheet };
  const jobs = { whole: () => { for (const s of S) m.css.parseStylesheet(s); } };
  S.forEach((s, i) => (jobs["whole@" + i] = () => m.css.parseStylesheet(s)));
  for (const [n, xs] of Object.entries(calls)) { const f = fns[n.startsWith("splitTopLevel") ? "splitTopLevel" : n]; jobs[n] = () => { for (const x of xs) f(...x); }; }
  const out = {};
  for (const [n, j] of Object.entries(jobs)) { for (let w = 0; w < 10; w++) j(); const xs = []; for (let r = 0; r < 5; r++) { gc(); const b = v8.getHeapStatistics().total_allocated_bytes; j(); xs.push(v8.getHeapStatistics().total_allocated_bytes - b); } xs.sort((p, q) => p - q); out[n] = Math.round(xs[2] / 1024); }
  console.log(a, "KB", JSON.stringify(out));
}
