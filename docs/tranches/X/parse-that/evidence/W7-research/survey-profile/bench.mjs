// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — the PAIRED, INTERLEAVED per-entry timing of value.js's BBNF path
// against the retired hand parser, in ONE process, on the
// bench of record's corpus. Each round times one full pass over every source per arm, with the arm
// order rotated each round; gc() runs before every pass so no arm pays another's garbage.
//   node --expose-gc <dir>/bench.mjs [rounds=9] [entry…]      (cwd: value.js; after build.mjs)
import { isDeepStrictEqual } from "node:util";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, arms, load, median, uptime } from "./common.mjs";

const ROUNDS = Number(process.argv[2] ?? 9);
const ONLY = process.argv.slice(3);
const ALL = [...ENTRIES, "parseStylesheet"].filter((e) => ONLY.length === 0 || ONLY.includes(e));
const A = arms({ cand: await load("candidate"), ret: await load("retired") });
const gc = globalThis.gc ?? (() => {});
const names = Object.keys(A);

const report = { script: "bench.mjs", node: process.version, corpus: INPUTS.length, rounds: ROUNDS, uptimeStart: uptime(), entries: {} };
console.log(report.uptimeStart);

// First use compiles the grammar; not a steady-state cost (compile.mjs measures it).
A.bbnf.parseCssColor("red");

for (const entry of ALL) {
    // The BBNF-vs-retired agreement is context only (the differential of record classifies it).
    let agreeRetired = 0, bbnfOk = 0;
    const accepted = [], rejected = [];
    for (const s of INPUTS) {
        const b = A.bbnf[entry](s), r = A.retired[entry](s);
        if (isDeepStrictEqual(b, r)) agreeRetired++;
        if (b.ok) { bbnfOk++; accepted.push(s); } else rejected.push(s);
    }
    const sets = { all: INPUTS, accepted, rejected };
    const times = {};
    for (const set of Object.keys(sets)) { times[set] = {}; for (const a of names) times[set][a] = []; }
    const pass = (fn, xs) => { gc(); const t = performance.now(); for (const s of xs) fn(s); return performance.now() - t; };
    // warm-up: two passes each
    for (let w = 0; w < 2; w++) for (const a of names) pass(A[a][entry], INPUTS);
    const u0 = uptime();
    for (let r = 0; r < ROUNDS; r++) {
        const order = names.map((_, i) => names[(i + r) % names.length]);
        if (r % 2) order.reverse();
        for (const set of Object.keys(sets)) for (const a of order) times[set][a].push(pass(A[a][entry], sets[set]));
    }
    const u1 = uptime();
    const summ = {};
    for (const set of Object.keys(sets)) {
        const t = times[set];
        const ratio = (a) => median(t[a].map((x, i) => x / t.retired[i]));
        summ[set] = {
            n: sets[set].length,
            medianMs: Object.fromEntries(names.map((a) => [a, +median(t[a]).toFixed(2)])),
            minMs: Object.fromEntries(names.map((a) => [a, +Math.min(...t[a]).toFixed(2)])),
            bbnfOverRetired: { ofMedians: +(median(t.bbnf) / median(t.retired)).toFixed(2), ofMins: +(Math.min(...t.bbnf) / Math.min(...t.retired)).toFixed(2), pairedMedian: +ratio("bbnf").toFixed(2) },
            raw: t,
        };
    }
    report.entries[entry] = { uptimeBefore: u0, uptimeAfter: u1, bbnfOk, bbnfRejected: INPUTS.length - bbnfOk, agreeRetired, ...summ };
    const a = summ.all;
    console.log(`${entry.padEnd(22)} bbnf ${a.medianMs.bbnf}ms retired ${a.medianMs.retired}ms | ratio(med) ${a.bbnfOverRetired.ofMedians} (min) ${a.bbnfOverRetired.ofMins} (paired) ${a.bbnfOverRetired.pairedMedian} | acc ${summ.accepted.bbnfOverRetired.ofMedians} rej ${summ.rejected.bbnfOverRetired.ofMedians} | ok ${bbnfOk} agree ${agreeRetired} | ${u0.split("averages:")[1]} ->${u1.split("averages:")[1]}`);
}
report.uptimeEnd = uptime();
const out = path.join(import.meta.dirname, `bench-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
writeFileSync(out, JSON.stringify(report, null, 1));
console.log(report.uptimeEnd, "→", out);
