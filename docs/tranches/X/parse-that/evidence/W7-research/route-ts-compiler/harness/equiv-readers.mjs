// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — READER-level equivalence: every exported reader of value.js
// src/css/bbnf/sheet.ts (+ splitTopLevel ×3) over every corpus source, candidate arm vs stock.
// Complements equiv.mjs (whose parseStylesheet row reaches only the readers the layer calls).
//   node harness/equiv-readers.mjs [arm=proto]
import { isDeepStrictEqual } from "node:util";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { INPUTS, OUT } from "./common.mjs";
const name = process.argv[2] ?? "proto";
const S = await import(path.join(OUT, "stock.mjs")), C = await import(path.join(OUT, `${name}.mjs`));
const call = (fn, ...a) => { try { return fn(...a); } catch (e) { return { threw: String(e?.message ?? e) }; } };
const readers = Object.keys(S.sheet).filter((k) => typeof S.sheet[k] === "function");
const rows = {};
let total = 0;
const check = (label, f, g) => {
    let m = 0; const samples = [];
    for (const s of INPUTS) { const a = call(f, s), b = call(g, s); if (!isDeepStrictEqual(a, b)) { m++; if (samples.length < 3) samples.push({ s, stock: a, cand: b }); } }
    rows[label] = { mismatches: m, samples }; total += m;
    console.log(label.padEnd(26), m, samples.length ? JSON.stringify(samples[0]).slice(0, 300) : "");
};
for (const r of readers) {
    if (r === "timelineArgs") { for (const kind of ["scroll", "view"]) check(`timelineArgs(${kind})`, (s) => S.sheet[r](kind, s), (s) => C.sheet[r](kind, s)); continue; }
    check(r, S.sheet[r], C.sheet[r]);
}
for (const sep of [",", ";", "space"]) check(`splitTopLevel(${sep})`, (s) => S.splitTopLevel(s, sep), (s) => C.splitTopLevel(s, sep));
console.log("TOTAL reader mismatches", total);
writeFileSync(path.join(import.meta.dirname, "..", "results", `equiv-readers-${name}.json`), JSON.stringify({ arm: name, corpus: INPUTS.length, total, rows }, null, 1));
