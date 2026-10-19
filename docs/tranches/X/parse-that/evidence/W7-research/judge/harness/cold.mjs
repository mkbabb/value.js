// SERVED MODEL: claude-opus-5-5
// judge — FIRST-USE cost: every arm in its own fresh process per round, arms rotated per round,
// `uptime` before and after; medians + min per arm, and each arm's median ratio to the retired parser's.
//   node judge/harness/cold.mjs [rounds=11] [arms=stock,tsc-proto-pos,tsc-emit-pos,aot-text,fx-final]
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { RESULTS, median, uptime } from "./common.mjs";
const R = Number(process.argv[2] ?? 11);
const TAG = process.argv[4] ?? "";
const ARMS = ["retired", ...(process.argv[3] ?? "stock,tsc-proto-pos,tsc-emit-pos,aot-text,fx-final").split(",")];
const rows = Object.fromEntries(ARMS.map((a) => [a, []]));
const u0 = uptime();
for (let r = 0; r < R; r++) for (const a of ARMS.map((_, i) => ARMS[(i + r) % ARMS.length]))
    rows[a].push(JSON.parse(execFileSync(process.execPath, [path.join(import.meta.dirname, "cold-child.mjs"), a], { encoding: "utf8" })));
const u1 = uptime();
const keys = ["importMs", "firstParseMs", "secondParseMs", "firstSheetMs"];
const summary = {};
for (const a of ARMS) {
    summary[a] = {};
    for (const k of keys) summary[a][k] = { median: +median(rows[a].map((x) => x[k])).toFixed(2), min: +Math.min(...rows[a].map((x) => x[k])).toFixed(2) };
    summary[a].importPlusFirst = +median(rows[a].map((x) => x.importMs + x.firstParseMs)).toFixed(2);
}
for (const a of ARMS) summary[a].ratioImportPlusFirstToRetired = +(summary[a].importPlusFirst / summary.retired.importPlusFirst).toFixed(2);
writeFileSync(path.join(RESULTS, `cold${TAG ? "-" + TAG : ""}.json`), JSON.stringify({ rounds: R, uptimeBefore: u0, uptimeAfter: u1, summary, rows }, null, 1));
for (const a of ARMS) console.log(a.padEnd(14), keys.map((k) => `${k} ${summary[a][k].median}`).join(" · "), `· import+first ${summary[a].importPlusFirst} (×${summary[a].ratioImportPlusFirstToRetired})`);
console.log(u0, "\n", u1);
