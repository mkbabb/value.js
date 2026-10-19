// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — each entry timed in its OWN fresh process (no cross-entry pollution, no order
// effect), `reps` times, via bench.mjs; then the per-entry paired ratios are gathered into one table.
//   node harness/isolated.mjs [rounds=9] [reps=2] [arms=proto,proto-pos,emit-pos]
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES } from "./common.mjs";
const [R = "9", REPS = "2", ARMS = "proto,proto-pos,emit-pos"] = process.argv.slice(2);
const SEAT = path.resolve(import.meta.dirname, "..");
const table = {};
for (let rep = 0; rep < Number(REPS); rep++) for (const e of ENTRIES) {
    const label = `iso-${e}-${rep}`;
    execFileSync(process.execPath, ["--expose-gc", path.join(SEAT, "harness/bench.mjs"), label, R, ARMS, e], { stdio: "inherit" });
    const r = JSON.parse(readFileSync(path.join(SEAT, "results", `bench-${label}.json`), "utf8")).entries[e];
    (table[e] ??= []).push({ ratio: r.ratio, medianMs: r.medianMs, uptimeBefore: r.uptimeBefore, uptimeAfter: r.uptimeAfter });
}
writeFileSync(path.join(SEAT, "results", "isolated.json"), JSON.stringify(table, null, 1));
for (const [e, rows] of Object.entries(table)) console.log(e.padEnd(22), rows.map((x) => Object.entries(x.ratio).map(([a, v]) => `${a} ×${v.paired}`).join(" ")).join(" || "));
