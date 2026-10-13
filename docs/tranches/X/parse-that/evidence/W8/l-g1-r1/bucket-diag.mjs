// SERVED MODEL: claude-opus-5-5
// scratch diagnostic: per-bucket product/retired cost on the rej class, in one engine
const { build } = await import("/Users/mkbabb/Programming/value.js/node_modules/esbuild/lib/main.js");
import { writeFileSync } from "node:fs";
import path from "node:path";
const REPO = "/Users/mkbabb/Programming/value.js";
const { BUILD, INPUTS } = await import(path.join(REPO, "bench/paired/common.mjs"));
const [ENG = "firefox", ENTRY = "parseCssColor", CLS = "rej"] = process.argv.slice(2);
const S = import.meta.dirname;
const entryFile = path.join(S, "diag-entry.mjs");
writeFileSync(entryFile, `import * as R from ${JSON.stringify(path.join(BUILD, "retired.mjs"))};
import * as P from ${JSON.stringify(path.join(BUILD, "product.mjs"))};
P.css.parseCssColor("red");
globalThis.diag = (entry, cls, inputs) => {
  const fr = entry === "parseStylesheet" ? R.parseStylesheet : R.hand[entry], fp = P.css[entry];
  const acc = (s) => { try { return fr(s)?.ok === true; } catch { return false; } };
  const xs = inputs.filter((s) => cls === "acc" ? acc(s) : !acc(s));
  const bucket = (s) => { const t = s.trim(); const c = t[0] ?? ""; const fn = /^[-a-zA-Z_][-\\w]*\\(/.test(t);
    const multi = /[\\s,\\/]/.test(t.replace(/\\([^]*\\)/g, ""));
    const head = c === "" ? "empty" : c === "#" ? "hash" : /[0-9.+]/.test(c) || (c === "-" && /[0-9.]/.test(t[1] ?? "")) ? "num" : c === '"' || c === "'" ? "str" : fn ? "fn:" + t.slice(0, t.indexOf("(")).toLowerCase().replace(/^(rgb|hsl)a?$/, "$1").slice(0, 14) : /[a-zA-Z_-]/.test(c) ? "ident" : "other";
    return head + (multi && !fn ? "+multi" : ""); };
  const groups = new Map(); for (const s of xs) { const b = bucket(s); (groups.get(b) ?? groups.set(b, []).get(b)).push(s); }
  const pass = (fn, a, k) => { const t = performance.now(); for (let j = 0; j < k; j++) for (let i = 0; i < a.length; i++) { try { fn(a[i]); } catch {} } return performance.now() - t; };
  for (let w = 0; w < 5; w++) { pass(fr, xs, 1); pass(fp, xs, 1); }
  const out = [];
  for (const [b, a] of groups) {
    let k = 1; while (Math.min(pass(fr, a, k), pass(fr, a, k), pass(fr, a, k)) < 8) k *= 2;
    let r = Infinity, p = Infinity;
    for (let q = 0; q < 15; q++) { if (q & 1) { r = Math.min(r, pass(fr, a, k)); p = Math.min(p, pass(fp, a, k)); } else { p = Math.min(p, pass(fp, a, k)); r = Math.min(r, pass(fr, a, k)); } }
    let chars = 0; for (const s of a) chars += s.length;
    out.push({ b, n: a.length, avgLen: +(chars / a.length).toFixed(1), k, rNs: +(r * 1e6 / k / a.length).toFixed(0), pNs: +(p * 1e6 / k / a.length).toFixed(0), ratio: +(p / r).toFixed(3), sample: a[0].slice(0, 40) });
  }
  out.sort((x, y) => y.n * y.pNs - x.n * x.pNs);
  return out;
};`);
const bundle = path.join(S, "diag-bundle.js");
await build({ entryPoints: [entryFile], outfile: bundle, bundle: true, format: "iife", platform: "browser", target: "es2022", logLevel: "warning", absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")], define: { "process.env.NODE_ENV": '"production"' } });
const pw = await import(path.join(REPO, "node_modules/playwright/index.mjs"));
const browser = await pw[ENG].launch(ENG === "firefox" ? { firefoxUserPrefs: { "privacy.reduceTimerPrecision": false } } : {});
const page = await browser.newPage();
await page.addScriptTag({ path: bundle });
const out = await page.evaluate(([e, c, x]) => globalThis.diag(e, c, x), [ENTRY, CLS, INPUTS]);
await browser.close();
let tr = 0, tp = 0; for (const o of out) { tr += o.n * o.rNs; tp += o.n * o.pNs; }
console.log(`${ENG} ${ENTRY} ${CLS}: weighted ratio ${(tp / tr).toFixed(3)}`);
for (const o of out) console.log(`${o.b.padEnd(22)} n=${String(o.n).padStart(6)} len=${String(o.avgLen).padStart(6)} ret=${String(o.rNs).padStart(6)}ns prod=${String(o.pNs).padStart(6)}ns x${o.ratio} share=${(100 * o.n * o.pNs / tp).toFixed(1)}%  ${JSON.stringify(o.sample)}`);
