// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — where parseStylesheet's time goes (probe, not a timing of record): the whole
// entry vs its first reader alone (`ruleList` over the source), per arm, interleaved, with retired
// parseStylesheet as the paired baseline.   node --expose-gc harness/sheet-split.mjs [rounds]
import path from "node:path";
import { INPUTS, OUT, median, uptime } from "./common.mjs";
const R = Number(process.argv[2] ?? 7);
const ret = await import(path.join(OUT, "retired.mjs"));
const arms = {};
for (const a of ["stock", "proto", "proto-text"]) arms[a] = await import(path.join(OUT, `${a}.mjs`));
const fns = { "retired.sheet": ret.parseStylesheet };
for (const [a, m] of Object.entries(arms)) { fns[`${a}.sheet`] = m.parseStylesheet; fns[`${a}.ruleList`] = m.sheet.ruleList; }
for (const f of Object.values(fns)) f("a{b:c}");
const t = Object.fromEntries(Object.keys(fns).map((k) => [k, []]));
const pass = (fn) => { gc(); const t0 = performance.now(); for (const s of INPUTS) fn(s); return performance.now() - t0; };
console.log(uptime());
for (let r = 0; r < R; r++) { const ks = Object.keys(fns); if (r % 2) ks.reverse(); for (const k of ks) t[k].push(pass(fns[k])); }
console.log(uptime());
const base = median(t["retired.sheet"]);
for (const [k, xs] of Object.entries(t)) console.log(k.padEnd(20), median(xs).toFixed(2), "ms  ×" + (median(xs) / base).toFixed(3), "of retired parseStylesheet");
