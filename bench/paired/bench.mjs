// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.o` (b)(c)(d) — ONE CELL of the paired instrument (R-3), run in its own fresh process by isolated.mjs.
// Promoted from the W7 judge's bench.mjs and the critic's split-rep.mjs. The retired hand parser is in the same
// process as every candidate arm. One cell = one entry × one input class:
//   whole   the 29,944 sources of record              acc / rej   the sources the retired parser accepts / refuses
//   large-eq  parseStylesheet on the EQUAL-WORK large corpus (X.P.W7 `.eq`, ADDENDUM (g)): each G-large sheet cut at the
//             common accepted prefix of both arms (bench/corpus/large-prefix-2026-09-25/, derived by prefix.mjs) — the
//             large cell of record
//   large   parseStylesheet on the WHOLE G-large sheets (sheets/MANIFEST.json) — INFO only: both arms refuse every
//           sheet, at different points on bulma (retired 32 declarations, product 946), so it compares unequal work
// A pass times every source of the class once per repetition; the repetition count k doubles until the retired
// parser's pass takes ≥ 20 ms (G-acc/rej: a small class, e.g. the 56 accepted keyframe selectors, is repeated to a
// fixed pass size), after a declared warm-up of 3 passes per arm at k = 1 (R-v-3). gc() runs before every pass; 2 warm-up passes per arm at k; ≥ 11 timed rounds; the arm order rotates
// every round and flips every full rotation (with two arms, rotate+reverse on odd rounds would cancel: the judge's
// rule assumed ≥ 3 arms); `rev=1` reverses the arm list for the whole cell. Every call is wrapped identically
// (try/catch) for every arm. `uptime` is read before and after the timed rounds; load is RECORDED, never gated
// (R-3 retires the quiesceRule). Ratio = arm/retired: the median of the per-round paired ratios (of record), with
// median/median and min/min beside it, and the retired passes' spread (max/min) for the hygiene rule.
//   node --expose-gc bench/paired/bench.mjs <entry> <class> <arms=product> <rounds=11> <rev=0|1> <out.json>
import { writeFileSync } from "node:fs";
import { ENTRIES, INPUTS, arm, largePrefixSheets, largeSheets, load1, median, uptime } from "./common.mjs";

const [ENTRY, CLASS = "whole", ARMS_ARG = "product", ROUNDS_ARG = "11", REV = "0", OUT] = process.argv.slice(2);
if (!ENTRIES.includes(ENTRY)) throw new Error(`entry ${ENTRY}`);
const ROUNDS = Number(ROUNDS_ARG);
const gc = globalThis.gc ?? (() => { throw new Error("run with --expose-gc"); });
let ARMS = ["retired", ...ARMS_ARG.split(",").filter((a) => a && a !== "retired")];
if (REV === "1") ARMS = ARMS.reverse();
const F = {};
for (const a of ARMS) F[a] = (await arm(a)).fns[ENTRY];
const accepts = (s) => { try { return F.retired(s)?.ok === true; } catch { return false; } };
const xs = CLASS === "whole" ? INPUTS : CLASS === "acc" ? INPUTS.filter(accepts) : CLASS === "rej" ? INPUTS.filter((s) => !accepts(s))
    : CLASS === "large" ? largeSheets().map((s) => s.text) : CLASS === "large-eq" ? largePrefixSheets().map((s) => s.text) : null;
if (xs === null || (CLASS.startsWith("large") && ENTRY !== "parseStylesheet")) throw new Error(`class ${CLASS} for ${ENTRY}`);
const pass = (fn, k) => { gc(); const t = performance.now(); for (let j = 0; j < k; j++) for (let i = 0; i < xs.length; i++) { try { fn(xs[i]); } catch { } } return performance.now() - t; };
// R-v-3 (X.P.W7.g): the DECLARED warm-up runs BEFORE the k-rule, identical for every arm (WARMUP passes at k = 1, in
// the cell's arm order). Before it, k was sized on the retired arm's cold first pass (its rep-0 is bimodal), so a
// large sheet could run at k = 1 and be set aside by a cold outlier.
const WARMUP = 3;
for (let w = 0; w < WARMUP; w++) for (const a of ARMS) pass(F[a], 1);
let k = 1;
while (pass(F.retired, k) < 20) k *= 2;
for (let w = 0; w < 2; w++) for (const a of ARMS) pass(F[a], k);
const t = Object.fromEntries(ARMS.map((a) => [a, []]));
const u0 = uptime();
for (let r = 0; r < ROUNDS; r++) {
    const order = ARMS.map((_, i) => ARMS[(i + r) % ARMS.length]);
    if (Math.floor(r / ARMS.length) % 2) order.reverse();
    for (const a of order) t[a].push(pass(F[a], k));
}
const u1 = uptime();
const cell = { entry: ENTRY, class: CLASS, n: xs.length, k, warmup: WARMUP, rounds: ROUNDS, arms: ARMS, rev: REV === "1", node: process.version,
    uptimeBefore: u0, uptimeAfter: u1, load: [load1(u0), load1(u1)], retiredSpread: +(Math.max(...t.retired) / Math.min(...t.retired)).toFixed(3),
    medianMs: {}, minMs: {}, ratio: {}, raw: t };
for (const a of ARMS) {
    cell.medianMs[a] = +median(t[a]).toFixed(3);
    cell.minMs[a] = +Math.min(...t[a]).toFixed(3);
    if (a === "retired") continue;
    const pr = t[a].map((x, i) => x / t.retired[i]);
    cell.ratio[a] = { paired: +median(pr).toFixed(3), pairedMax: +Math.max(...pr).toFixed(3), roundsBelow1: pr.filter((x) => x < 1).length,
        ofMedians: +(median(t[a]) / median(t.retired)).toFixed(3), ofMins: +(Math.min(...t[a]) / Math.min(...t.retired)).toFixed(3) };
}
if (OUT) writeFileSync(OUT, JSON.stringify(cell));
console.log(`${ENTRY.padEnd(22)} ${CLASS.padEnd(8)} n=${xs.length} k=${k} retired ${cell.medianMs.retired}ms spread ${cell.retiredSpread} | ` +
    ARMS.filter((a) => a !== "retired").map((a) => `${a} x${cell.ratio[a].paired} (${cell.ratio[a].roundsBelow1}/${ROUNDS}<1, min/min x${cell.ratio[a].ofMins})`).join(" | ") + ` | load ${cell.load.join(" -> ")}`);
