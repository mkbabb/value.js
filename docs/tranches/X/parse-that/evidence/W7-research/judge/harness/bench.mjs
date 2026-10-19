// SERVED MODEL: claude-opus-5-5
// X.P.W7 research · judge — PAIRED, INTERLEAVED timing of every route's candidate against THE BASELINE
// (the retired hand parser) in ONE process, over the bench of record's corpus and its seven entries.
// A round times one full pass of every source per arm; the arm order rotates each round and reverses on
// odd rounds; gc() runs before every pass; every call is wrapped identically (try/catch) for every arm.
// `uptime` is recorded before and after every entry. Ratios are arm/retired: the median of the per-round
// paired ratios (the instrument of record, R-3), plus median/median and min/min.
//   node --expose-gc judge/harness/bench.mjs <label> <rounds> <arm,arm,…> [reverse=0|1] [entry…]
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, RESULTS, arm, load, median, uptime } from "./common.mjs";

const LABEL = process.argv[2] ?? "run";
const ROUNDS = Number(process.argv[3] ?? 11);
let ARMS = ["retired", ...(process.argv[4] ?? "tsc-proto-pos,tsc-emit-pos,aot-text,fx-final").split(",").filter((a) => a && a !== "retired")];
if (process.argv[5] === "1") ARMS = ARMS.reverse();
const ONLY = process.argv.slice(6);
const ALL = ENTRIES.filter((e) => ONLY.length === 0 || ONLY.includes(e));
const gc = globalThis.gc ?? (() => { throw new Error("run with --expose-gc"); });
const A = {};
for (const a of ARMS) A[a] = (await arm(a)).fns;
const report = { label: LABEL, node: process.version, corpus: INPUTS.length, rounds: ROUNDS, arms: ARMS, uptimeStart: uptime(), entries: {} };
const pass = (fn) => { gc(); const t = performance.now(); for (let i = 0; i < INPUTS.length; i++) { try { fn(INPUTS[i]); } catch { } } return performance.now() - t; };
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
        if (a !== "retired") {
            const pr = t[a].map((x, i) => x / t.retired[i]);
            out.ratio[a] = { paired: +median(pr).toFixed(3), pairedMax: +Math.max(...pr).toFixed(3), roundsBelow1: pr.filter((x) => x < 1).length,
                ofMedians: +(median(t[a]) / median(t.retired)).toFixed(3), ofMins: +(Math.min(...t[a]) / Math.min(...t.retired)).toFixed(3) };
        }
    }
    report.entries[entry] = out;
    console.log(`${entry.padEnd(22)} retired ${out.medianMs.retired}ms | ` + ARMS.filter((a) => a !== "retired")
        .map((a) => `${a} ×${out.ratio[a].paired} (min ×${out.ratio[a].ofMins}, ${out.ratio[a].roundsBelow1}/${ROUNDS}<1)`).join(" | ") + ` | load ${load(u0)} -> ${load(u1)}`);
}
report.uptimeEnd = uptime();
const file = path.join(RESULTS, `bench-${LABEL}.json`);
writeFileSync(file, JSON.stringify(report, null, 1));
console.log(report.uptimeEnd, "→", path.basename(file));
