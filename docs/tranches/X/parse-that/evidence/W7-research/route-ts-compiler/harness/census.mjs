// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — the PACKRAT ADVISOR: runs every entry over the corpus on the census arm and
// prints each rule's calls and its repeats at the same (source, offset) — where a memo could pay.
//   node harness/census.mjs
import path from "node:path";
import { writeFileSync } from "node:fs";
import { ENTRIES, INPUTS, OUT } from "./common.mjs";
const m = await import(path.join(OUT, "proto-pos-census.mjs"));
const out = {};
for (const e of ENTRIES) {
    for (const r of Object.values(m.__load.CENSUS)) { r.calls = 0; r.repeats = 0; }
    const fn = e === "parseStylesheet" ? m.parseStylesheet : m.bbnf[e];
    for (const s of INPUTS) fn(s);
    const rows = Object.entries(m.__load.CENSUS).filter(([, r]) => r.repeats > 0).sort((a, b) => b[1].repeats - a[1].repeats).slice(0, 6);
    out[e] = rows;
    console.log(e, rows.map(([k, r]) => `${k} ${r.repeats}/${r.calls}`).join(" · "));
}
writeFileSync(path.join(import.meta.dirname, "..", "results", "census.json"), JSON.stringify(out, null, 1));
