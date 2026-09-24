// Paired timing: every variant in ONE process on the SAME 29,944-source corpus; per entry: 2 warm-up
// passes each, then ROUNDS interleaved rounds with the order rotated each round; uptime recorded
// before and after every entry; medians + min; ratios to the retired hand parser (base) measured in
// the same rounds. ENTRIES / VARIANTS env narrow a run (for fresh-process isolation).
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { INPUTS, ENTRIES as ALL_ENTRIES } from "./equiv.mjs";
const here = path.resolve(import.meta.dirname, ".."), out = path.join(here, "out");
const ROUNDS = Number(process.env.ROUNDS ?? 9);
const ENTRIES = process.env.ENTRIES?.split(",") ?? ALL_ENTRIES;
const names = ["base", ...(process.env.VARIANTS?.split(",") ?? ["bbnf", "aot-full"])];
const V = {};
for (const n of names) V[n] = await import(path.join(out, `${n}.mjs`));
const uptime = () => execSync("uptime").toString().trim();
const res = { node: process.version, inputs: INPUTS.length, rounds: ROUNDS, variants: names, uptimeStart: uptime(), timing: {} };
const pass = (f) => { const t = performance.now(); for (const s of INPUTS) { try { f(s); } catch {} } return performance.now() - t; };
const med = (a) => { const b = [...a].sort((x, y) => x - y); const m = b.length >> 1; return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; };
for (const e of ENTRIES) {
    const ms = Object.fromEntries(names.map((n) => [n, []]));
    for (const n of names) { pass(V[n][e]); pass(V[n][e]); }
    const upBefore = uptime();
    for (let r = 0; r < ROUNDS; r++) for (const n of names.map((_, i) => names[(i + r) % names.length])) ms[n].push(pass(V[n][e]));
    const upAfter = uptime();
    const row = { uptimeBefore: upBefore, uptimeAfter: upAfter };
    for (const n of names) row[n] = { medianMs: +med(ms[n]).toFixed(2), minMs: +Math.min(...ms[n]).toFixed(2), rawMs: ms[n].map((x) => +x.toFixed(2)) };
    for (const n of names) { row[n].ratioMedian = +(row[n].medianMs / row.base.medianMs).toFixed(3); row[n].ratioMin = +(row[n].minMs / row.base.minMs).toFixed(3); }
    res.timing[e] = row;
    console.log(e.padEnd(22), names.map((n) => `${n}=${row[n].medianMs}ms x${row[n].ratioMedian} (min x${row[n].ratioMin})`).join("  "), "|", upBefore.replace(/.*load averages?: /, ""), "->", upAfter.replace(/.*load averages?: /, ""));
}
res.uptimeEnd = uptime();
writeFileSync(path.join(here, process.env.OUT ?? `bench-${Date.now()}.json`), JSON.stringify(res, null, 1));
