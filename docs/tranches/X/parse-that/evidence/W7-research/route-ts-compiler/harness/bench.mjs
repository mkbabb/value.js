// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — PAIRED, INTERLEAVED timing against THE BASELINE (the retired hand parser),
// in ONE process, over the bench of record's corpus (29,944 distinct sources) and its seven entries.
// A round times one full pass of every source per arm; the arm order rotates (and reverses on odd
// rounds); gc() runs before every pass. `uptime` is recorded before and after every entry.
// Ratios are arm/retired: the median of the per-round paired ratios, plus median/median and min/min.
//   node --expose-gc harness/bench.mjs <label> <rounds> <arm,arm,…> [entry…]
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, arm, median, uptime } from "./common.mjs";

const LABEL = process.argv[2] ?? "run";
const ROUNDS = Number(process.argv[3] ?? 9);
const ARMS = ["retired", ...(process.argv[4] ?? "stock,proto").split(",").filter((a) => a !== "retired")];
const ONLY = process.argv.slice(5);
const ALL = ENTRIES.filter((e) => ONLY.length === 0 || ONLY.includes(e));
const A = Object.fromEntries(await Promise.all(ARMS.map(async (a) => [a, await arm(a)])));
const gc = globalThis.gc ?? (() => { throw new Error("run with --expose-gc"); });
// First use compiles each BBNF arm's grammar: not a steady-state cost.
for (const a of ARMS) A[a].parseCssColor("red");

const report = { label: LABEL, node: process.version, corpus: INPUTS.length, rounds: ROUNDS, arms: ARMS, uptimeStart: uptime(), entries: {} };
console.log(report.uptimeStart);
const pass = (fn) => { gc(); const t = performance.now(); for (const s of INPUTS) fn(s); return performance.now() - t; };
for (const entry of ALL) {
    const t = Object.fromEntries(ARMS.map((a) => [a, []]));
    for (let w = 0; w < 2; w++) for (const a of ARMS) pass(A[a][entry]);
    const u0 = uptime();
    for (let r = 0; r < ROUNDS; r++) {
        const order = ARMS.map((_, i) => ARMS[(i + r) % ARMS.length]);
        if (r % 2) order.reverse();
        for (const a of order) t[a].push(pass(A[a][entry]));
    }
    const u1 = uptime();
    const out = { uptimeBefore: u0, uptimeAfter: u1, medianMs: {}, minMs: {}, ratio: {}, raw: t };
    for (const a of ARMS) {
        out.medianMs[a] = +median(t[a]).toFixed(2);
        out.minMs[a] = +Math.min(...t[a]).toFixed(2);
        if (a !== "retired") out.ratio[a] = {
            paired: +median(t[a].map((x, i) => x / t.retired[i])).toFixed(3),
            ofMedians: +(median(t[a]) / median(t.retired)).toFixed(3),
            ofMins: +(Math.min(...t[a]) / Math.min(...t.retired)).toFixed(3),
        };
    }
    report.entries[entry] = out;
    const la = (u) => u.split("averages:")[1]?.trim();
    console.log(`${entry.padEnd(22)} retired ${out.medianMs.retired}ms | ` + ARMS.filter((a) => a !== "retired")
        .map((a) => `${a} ${out.medianMs[a]}ms ×${out.ratio[a].paired} (min ×${out.ratio[a].ofMins})`).join(" | ") + ` | load ${la(u0)} -> ${la(u1)}`);
}
report.uptimeEnd = uptime();
const file = path.join(import.meta.dirname, "..", "results", `bench-${LABEL}.json`);
writeFileSync(file, JSON.stringify(report, null, 1));
console.log(report.uptimeEnd, "→", file);
