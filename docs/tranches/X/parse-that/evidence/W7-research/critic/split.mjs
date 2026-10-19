// SERVED MODEL: claude-opus-5-5
// critic — accepted-vs-rejected split of jx-aot-pos against the retired parser (same process, paired,
// interleaved, rotating+reversing order, gc before each pass, uptime before/after each entry).
// Reuses the judge's built arms in $TMPDIR/value-js-w7-judge (read-only).
//   node --expose-gc critic/split.mjs [rounds=9] [arm=jx-aot-pos]
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, arm, median, uptime } from "../judge/harness/common.mjs";
const R = Number(process.argv[2] ?? 9), ARM = process.argv[3] ?? "jx-aot-pos";
const gc = globalThis.gc;
const ret = (await arm("retired")).fns, cand = (await arm(ARM)).fns;
const report = { arm: ARM, rounds: R, uptimeStart: uptime(), entries: {} };
const pass = (fn, xs) => { gc(); const t = performance.now(); for (let i = 0; i < xs.length; i++) { try { fn(xs[i]); } catch {} } return performance.now() - t; };
for (const e of ENTRIES.filter((e) => e !== "parseStylesheet")) {
    const acc = [], rej = [];
    for (const s of INPUTS) { let ok = false; try { ok = ret[e](s)?.ok === true; } catch {} (ok ? acc : rej).push(s); }
    const out = { accepted: acc.length, rejected: rej.length };
    for (const [k, xs] of [["acc", acc], ["rej", rej]]) {
        const t = { r: [], c: [] };
        for (let w = 0; w < 2; w++) { pass(ret[e], xs); pass(cand[e], xs); }
        const u0 = uptime();
        for (let r = 0; r < R; r++) { const order = r % 2 ? ["c", "r"] : ["r", "c"]; for (const a of order) t[a].push(pass(a === "r" ? ret[e] : cand[e], xs)); }
        const u1 = uptime();
        const pr = t.c.map((x, i) => x / t.r[i]);
        out[k] = { paired: +median(pr).toFixed(3), below1: pr.filter((x) => x < 1).length, ofMins: +(Math.min(...t.c) / Math.min(...t.r)).toFixed(3), medMs: { retired: +median(t.r).toFixed(2), cand: +median(t.c).toFixed(2) }, uptimeBefore: u0, uptimeAfter: u1 };
    }
    report.entries[e] = out;
    console.log(e.padEnd(22), `acc n=${acc.length} x${out.acc.paired} (${out.acc.below1}/${R}) min x${out.acc.ofMins}`, "|", `rej n=${rej.length} x${out.rej.paired} (${out.rej.below1}/${R}) min x${out.rej.ofMins}`, "| load", out.acc.uptimeBefore.split("averages:")[1], "->", out.rej.uptimeAfter.split("averages:")[1]);
}
report.uptimeEnd = uptime();
writeFileSync(path.join(import.meta.dirname, `split-${ARM}.json`), JSON.stringify(report, null, 1));
