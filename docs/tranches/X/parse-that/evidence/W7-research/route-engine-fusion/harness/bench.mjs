// SERVED MODEL: claude-opus-5-5
// route engine-fusion — TIMING. One fresh node process per (entry[, arm]) cell; inside it the retired
// parser and the arms run interleaved: ROUNDS rounds, each round runs every arm once in a ROTATED
// order, gc() before every pass (one pass = all 29,944 sources through one entry). Every arm's ratio
// is paired PER ROUND with the retired pass of that same round; reported: median ms, min ms, median
// of paired ratios. `uptime` is recorded before and after every cell.
//   ARMS=a,b ROUNDS=11 MODE=joint|isolated OUTFILE=x.json node --expose-gc harness/bench.mjs [entry…]
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, armFns, load1, median, uptime } from "./common.mjs";

if (process.argv[2] === "child") {
    const [, , , entry, armList, roundsS] = process.argv;
    const arms = ["retired", ...armList.split(",")];
    const fns = {};
    for (const a of arms) fns[a] = (await armFns(a))[entry];
    const gc = globalThis.gc;
    const pass = (fn) => { gc(); const t = performance.now(); for (const s of INPUTS) fn(s); return performance.now() - t; };
    for (let w = 0; w < 2; w++) for (const a of arms) pass(fns[a]);
    const ms = Object.fromEntries(arms.map((a) => [a, []]));
    const R = +roundsS;
    for (let r = 0; r < R; r++) {
        const order = arms.map((_, i) => arms[(i + r) % arms.length]);
        for (const a of order) ms[a].push(pass(fns[a]));
    }
    const out = {};
    for (const a of arms) out[a] = { medianMs: +median(ms[a]).toFixed(2), minMs: +Math.min(...ms[a]).toFixed(2),
        pairedRatio: a === "retired" ? 1 : +median(ms[a].map((x, i) => x / ms.retired[i])).toFixed(3), ms: ms[a].map((x) => +x.toFixed(2)) };
    process.stdout.write(JSON.stringify(out));
    process.exit(0);
}
const ARMS = (process.env.ARMS ?? "stock,np-direct,fx-guard,fx-fused").split(",");
const ROUNDS = process.env.ROUNDS ?? "11";
const MODE = process.env.MODE ?? "joint";
const OUTFILE = process.env.OUTFILE ?? `bench-${MODE}-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
const only = process.argv.slice(2);
const entries = ENTRIES.filter((e) => only.length === 0 || only.includes(e));
const rep = { script: "bench.mjs", mode: MODE, rounds: +ROUNDS, arms: ARMS, node: process.version, sources: INPUTS.length, uptimeStart: uptime(), cells: [] };
console.log(rep.uptimeStart);
const REPS = +(process.env.REPS ?? 1);
for (let rep_i = 0; rep_i < REPS; rep_i++)
for (const entry of entries) for (const g of (MODE === "isolated" ? (rep_i % 2 ? [...ARMS].reverse() : ARMS).map((a) => [a]) : [rep_i % 2 ? [...ARMS].reverse() : ARMS])) {
    const u0 = uptime();
    const res = JSON.parse(execFileSync(process.execPath, ["--expose-gc", import.meta.filename, "child", entry, g.join(","), ROUNDS], { encoding: "utf8", maxBuffer: 1 << 24 }));
    const u1 = uptime();
    rep.cells.push({ rep: rep_i, entry, arms: g, uptimeBefore: u0, uptimeAfter: u1, res });
    console.log(entry.padEnd(22), "retired", res.retired.medianMs, "|", g.map((a) => `${a} ${res[a].medianMs}ms ×${res[a].pairedRatio}`).join(" | "), "| load", load1(u0), "->", load1(u1));
}
rep.uptimeEnd = uptime();
// summary: per (entry, arm) the median over reps of the paired ratio; and the min over reps
rep.summary = {};
for (const e of entries) rep.summary[e] = Object.fromEntries(ARMS.map((a) => {
    const rs = rep.cells.filter((c) => c.entry === e && c.arms.includes(a)).map((c) => c.res[a].pairedRatio);
    return [a, { pairedRatioMedian: +median(rs).toFixed(3), perRep: rs }];
}));
console.log(JSON.stringify(rep.summary));
writeFileSync(path.join(import.meta.dirname, "../out", OUTFILE), JSON.stringify(rep, null, 1));
console.log("wrote", OUTFILE);
