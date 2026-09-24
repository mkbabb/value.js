// SERVED MODEL: claude-opus-5-5
// critic — ACCEPTED-ONLY subset, repeated inside each pass so every pass lasts >=10 ms (timer-safe);
// paired + interleaved vs the retired parser, rotating order, gc before each pass, uptime before/after.
//   node --expose-gc critic/split-rep.mjs [rounds=11] [arm=jx-aot-pos] [entry,...]
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, arm, median, uptime } from "../judge/harness/common.mjs";
const R = Number(process.argv[2] ?? 11), ARM = process.argv[3] ?? "jx-aot-pos";
const ONLY = (process.argv[4] ?? "").split(",").filter(Boolean);
const ret = (await arm("retired")).fns, cand = (await arm(ARM)).fns;
const report = { arm: ARM, rounds: R, uptimeStart: uptime(), entries: {} };
const pass = (fn, xs, k) => { gc(); const t = performance.now(); for (let j = 0; j < k; j++) for (let i = 0; i < xs.length; i++) { try { fn(xs[i]); } catch {} } return performance.now() - t; };
for (const e of ENTRIES.filter((e) => e !== "parseStylesheet" && (ONLY.length === 0 || ONLY.includes(e)))) {
    const acc = INPUTS.filter((s) => { try { return ret[e](s)?.ok === true; } catch { return false; } });
    let k = 1; while (pass(ret[e], acc, k) < 10) k *= 2;
    const t = { r: [], c: [] };
    for (let w = 0; w < 2; w++) { pass(ret[e], acc, k); pass(cand[e], acc, k); }
    const u0 = uptime();
    for (let r = 0; r < R; r++) { const order = r % 2 ? ["c", "r"] : ["r", "c"]; for (const a of order) t[a].push(pass(a === "r" ? ret[e] : cand[e], acc, k)); }
    const u1 = uptime();
    const pr = t.c.map((x, i) => x / t.r[i]);
    const out = { accepted: acc.length, reps: k, paired: +median(pr).toFixed(3), below1: pr.filter((x) => x < 1).length, ofMins: +(Math.min(...t.c) / Math.min(...t.r)).toFixed(3),
        medMs: { retired: +median(t.r).toFixed(2), cand: +median(t.c).toFixed(2) }, uptimeBefore: u0, uptimeAfter: u1 };
    report.entries[e] = out;
    console.log(e.padEnd(22), `accepted n=${acc.length} x${k}: x${out.paired} (${out.below1}/${R}<1) min/min x${out.ofMins} med ${out.medMs.retired}/${out.medMs.cand} ms | load`, u0.split("averages:")[1], "->", u1.split("averages:")[1]);
}
report.uptimeEnd = uptime();
writeFileSync(path.join(import.meta.dirname, `split-rep-${ARM}.json`), JSON.stringify(report, null, 1));
