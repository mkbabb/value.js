// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.o` — THE BENCH OF RECORD (R-3): every cell in its own fresh process (bench.mjs), ≥ 3 reps, the arm list
// reversed on odd reps, the entry order rotated per rep. HYGIENE (the judge's clean.mjs rule, promoted): a cell whose
// retired passes spread ≥ 1.6× is SET ASIDE — never averaged in — and re-run (≤ 3 re-runs per position); every
// set-aside cell is kept in the record and counted. The record carries every cell's `uptime` lines.
// GATES read from the clean cells (arm vs retired, paired median ratio):
//   whole-7/7      every entry's whole-corpus cells all < 1.00        accepted-7/7   every entry's accepted cells all < 1.00
//   (rejected halves and the large-sheet cells are recorded beside them; G-acc/rej reads both halves)
//   large-eq       parseStylesheet on the equal-work prefix corpus (X.P.W7 `.eq`, ADDENDUM (g)) all < 1.00: the large
//                  cell of record; `large` (the whole sheets, unequal work) is INFO, listed beside it, never folded in
//   O-2 (.o only)  on the product: median whole-corpus ratio ≥ 1.3 on all 7 entries and ≥ 4 on parseStylesheet
//   node bench/paired/isolated.mjs <tag> [arms=product] [reps=3] [rounds=11] [classes=whole,acc,rej,large-eq,large] [entries=all]
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BUILD, ENTRIES, HERE, RECORDS, median, uptime } from "./common.mjs";

const [TAG = "run", ARMS = "product", REPS = "3", ROUNDS = "11", CLASSES = "whole,acc,rej,large-eq,large", ONLY = ""] = process.argv.slice(2);
const SPREAD = 1.6, RERUNS = 3;
if (Number(REPS) < 3 || Number(ROUNDS) < 11) throw new Error("the bench of record is ≥ 3 reps × ≥ 11 rounds");
const entries = ONLY ? ONLY.split(",") : ENTRIES;
const classes = CLASSES.split(",");
const cellsDir = path.join(BUILD, "cells", TAG);
mkdirSync(cellsDir, { recursive: true });
const provenance = JSON.parse(readFileSync(path.join(BUILD, "provenance.json"), "utf8"));
const record = { tag: TAG, instrument: "bench/paired (X.P.W7 .o)", arms: ARMS.split(","), reps: Number(REPS), rounds: Number(ROUNDS), spreadRule: SPREAD,
    provenance, uptimeStart: uptime(), cells: [] };
const cellOf = (entry, cls, rep, attempt) => {
    const out = path.join(cellsDir, `${entry}-${cls}-rep${rep}-a${attempt}.json`);
    execFileSync(process.execPath, ["--expose-gc", path.join(HERE, "bench.mjs"), entry, cls, ARMS, ROUNDS, String(rep % 2), out], { stdio: "inherit" });
    return { rep, attempt, ...JSON.parse(readFileSync(out, "utf8")) };
};
for (let rep = 0; rep < Number(REPS); rep++) {
    const order = entries.map((_, i) => entries[(i + rep) % entries.length]);
    for (const cls of classes) for (const entry of order) {
        if (cls.startsWith("large") && entry !== "parseStylesheet") continue;
        for (let attempt = 0; attempt <= RERUNS; attempt++) {
            const c = cellOf(entry, cls, rep, attempt);
            c.clean = c.retiredSpread < SPREAD;
            record.cells.push(c);
            if (c.clean) break;
        }
    }
}
record.uptimeEnd = uptime();
const summary = {};
for (const a of record.arms) for (const cls of classes) for (const e of entries) {
    const all = record.cells.filter((c) => c.class === cls && c.entry === e);
    if (all.length === 0) continue;
    const clean = all.filter((c) => c.clean).map((c) => c.ratio[a].paired);
    // R-v-3: every rep is reported — the set-aside cells' ratios stand beside the clean ones (never averaged in).
    const every = all.map((c) => ({ rep: c.rep, attempt: c.attempt, k: c.k, clean: c.clean, spread: c.retiredSpread, paired: c.ratio[a].paired }));
    (summary[a] ??= {})[`${cls}|${e}`] = { cleanCells: clean.length, setAside: all.length - clean.length, ratios: clean, every,
        median: clean.length ? +median(clean).toFixed(3) : null, max: clean.length ? Math.max(...clean) : null, allBelow1: clean.length > 0 && clean.every((x) => x < 1) };
}
const gate = (a, cls) => { const rows = ENTRIES.map((e) => summary[a][`${cls}|${e}`]).filter(Boolean); const green = rows.filter((r) => r.allBelow1).length;
    return { green, of: 7, read: rows.length, verdict: rows.length === 7 && green === 7 ? "GREEN" : "RED" }; };
record.summary = summary;
record.gates = Object.fromEntries(record.arms.map((a) => [a, {
    "whole-7/7": classes.includes("whole") ? gate(a, "whole") : null, "accepted-7/7": classes.includes("acc") ? gate(a, "acc") : null,
    "rejected-7/7 (G-acc/rej, recorded)": classes.includes("rej") ? gate(a, "rej") : null,
    "large-eq (equal work, ADDENDUM (g))": classes.includes("large-eq") && summary[a]["large-eq|parseStylesheet"]
        ? { ratios: summary[a]["large-eq|parseStylesheet"].ratios, verdict: summary[a]["large-eq|parseStylesheet"].allBelow1 ? "GREEN" : "RED" } : null,
    "large (whole sheets, INFO)": classes.includes("large") && summary[a]["large|parseStylesheet"] ? { ratios: summary[a]["large|parseStylesheet"].ratios } : null,
    "O-2 (stock/retired >= 1.3 all 7, >= 4 parseStylesheet)": classes.includes("whole") ? (() => {
        const med = Object.fromEntries(ENTRIES.map((e) => [e, summary[a][`whole|${e}`]?.median ?? null]));
        const ok = ENTRIES.every((e) => med[e] !== null && med[e] >= 1.3) && med.parseStylesheet >= 4;
        return { medians: med, verdict: ok ? "HOLDS" : "DOES NOT HOLD" };
    })() : null,
}]));
mkdirSync(RECORDS, { recursive: true });
const file = path.join(RECORDS, `2026-09-23-x-p-w7-${TAG}.json`);
writeFileSync(file, JSON.stringify(record, null, 1) + "\n");
console.log("\nSUMMARY (clean cells' paired median ratio arm/retired; set-aside counted)");
for (const [a, rows] of Object.entries(summary)) for (const [k, v] of Object.entries(rows))
    console.log(a, k.padEnd(34), `clean ${v.cleanCells} (set aside ${v.setAside}) · ${v.ratios.join("/")} · median ${v.median} · every ` +
        v.every.map((c) => `r${c.rep}a${c.attempt} k${c.k} x${c.paired}${c.clean ? "" : ` SET-ASIDE(spread ${c.spread})`}`).join(" "));
console.log(JSON.stringify(record.gates, null, 1));
console.log(record.uptimeStart, "\n", record.uptimeEnd, "→", path.relative(process.cwd(), file));
