// SERVED MODEL: claude-opus-5-5
// judge — DEEP NESTING: the largest n for which parseCssValue("calc(" ×n + "1px" + ")" ×n) answers WITHOUT
// throwing (RangeError), per arm, by bisection; and what the arm does just past it (throws vs refuses).
//   node judge/harness/depth.mjs [arm,…]
import { writeFileSync } from "node:fs";
import path from "node:path";
import { RESULTS, arm, uptime } from "./common.mjs";
const ARMS = (process.argv[2] ?? "retired,stock,tsc-emit-pos,jx-aot-pos,aot-text").split(",");
const src = (n) => "calc(".repeat(n) + "1px" + ")".repeat(n);
const out = { uptimeStart: uptime(), node: process.version, arms: {} };
for (const a of ARMS) {
    const f = (await arm(a)).fns.parseCssValue;
    const probe = (n) => { try { const r = f(src(n)); return { threw: false, ok: !!r?.ok }; } catch (e) { return { threw: true, name: e?.name, msg: String(e?.message ?? e).slice(0, 80) }; } };
    let lo = 1, hi = 20000;
    if (!probe(hi).threw) { out.arms[a] = { maxDepth: `>= ${hi}`, at: probe(hi) }; console.log(a, out.arms[a]); continue; }
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (probe(m).threw) hi = m; else lo = m; }
    out.arms[a] = { maxDepth: lo, atMax: probe(lo), past: probe(hi), at10: probe(10), at100: probe(100) };
    console.log(a.padEnd(14), JSON.stringify(out.arms[a]));
}
out.uptimeEnd = uptime();
writeFileSync(path.join(RESULTS, "depth.json"), JSON.stringify(out, null, 1));
