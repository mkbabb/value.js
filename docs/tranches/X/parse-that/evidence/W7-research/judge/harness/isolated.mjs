// SERVED MODEL: claude-opus-5-5
// X.P.W7 research · judge — each entry timed in its OWN fresh process (no cross-entry pollution, no
// entry-order effect), `reps` times, arm order reversed on every other rep; per-entry paired ratios
// are gathered into one table with each cell's load readings.
//   node judge/harness/isolated.mjs <tag> [rounds=11] [reps=3] [arms=tsc-proto-pos,tsc-emit-pos,aot-text,fx-final] [entry,…]
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, RESULTS, uptime } from "./common.mjs";
const [TAG = "iso", R = "11", REPS = "3", ARMS = "tsc-proto-pos,tsc-emit-pos,aot-text,fx-final", ONLY = ""] = process.argv.slice(2);
const entries = ONLY ? ONLY.split(",") : ENTRIES;
const table = { tag: TAG, rounds: Number(R), reps: Number(REPS), arms: ARMS, uptimeStart: uptime(), cells: {} };
for (let rep = 0; rep < Number(REPS); rep++) for (const e of entries) {
    const label = `${TAG}-${e}-rep${rep}`;
    execFileSync(process.execPath, ["--expose-gc", path.join(import.meta.dirname, "bench.mjs"), label, R, ARMS, String(rep % 2), e], { stdio: "inherit" });
    const r = JSON.parse(readFileSync(path.join(RESULTS, `bench-${label}.json`), "utf8")).entries[e];
    (table.cells[e] ??= []).push({ rep, ratio: r.ratio, medianMs: r.medianMs, minMs: r.minMs, uptimeBefore: r.uptimeBefore, uptimeAfter: r.uptimeAfter });
}
table.uptimeEnd = uptime();
writeFileSync(path.join(RESULTS, `isolated-${TAG}.json`), JSON.stringify(table, null, 1));
console.log("\nSUMMARY (paired median ratio arm/retired per rep)");
for (const [e, rows] of Object.entries(table.cells)) {
    const arms = Object.keys(rows[0].ratio);
    console.log(e.padEnd(22), arms.map((a) => `${a} ${rows.map((x) => x.ratio[a].paired.toFixed(3)).join("/")}`).join(" | "));
}
console.log(table.uptimeStart, "\n", table.uptimeEnd);
