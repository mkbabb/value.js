// SERVED MODEL: claude-opus-5-5
// X.P.W8 `.cust2` evidence: every L-G2 row new against `.semi`'s banked read, by section and by mechanism.
//   node bench/records/W8cust2/classify.mjs bench/records/W8cust2/equiv-1.json.gz
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
const before = JSON.parse(gunzipSync(readFileSync("bench/records/W8semi/equiv-1.json.gz"))).rows;
const file = process.argv[2] ?? "bench/records/W8cust2/equiv-1.json.gz";
const after = JSON.parse(file.endsWith(".gz") ? gunzipSync(readFileSync(file)) : readFileSync(file, "utf8")).rows;
const k = (r) => `${r.section}\u0000${r.key}`;
const b = new Set(before.map(k));
const rows = after.filter((r) => !b.has(k(r)));
// A `;` the product now holds inside a `[]`/`{}` block (outside strings): the mechanism `.cust2` opens.
function nestedSemi(s) {
    let depth = 0, quote = "";
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (quote) { if (c === "\\") i++; else if (c === quote) quote = ""; continue; }
        if (c === '"' || c === "'") quote = c;
        else if (c === "[" || c === "{" || c === "(") depth++;
        else if (c === "]" || c === "}" || c === ")") depth = Math.max(0, depth - 1);
        else if (c === ";" && depth > 0) return true;
    }
    return false;
}
const tally = {};
const odd = [];
for (const r of rows) {
    // The splitter's rows: the product cuts the same text at fewer `;`s (a `;` inside a `[]`/`{}` block no longer
    // cuts) — equal modulo whitespace and empty items (`semiItems` trims and drops empty runs).
    const W = (items) => items.join(";").replace(/\s+/g, "").replace(/;+/g, ";");
    const fewerCuts = r.section !== "reader:splitTopLevel(;)"
        || (Array.isArray(r.arm) && Array.isArray(r.golden) && r.arm.length < r.golden.length && W(r.arm) === W(r.golden));
    const cls = typeof r.source === "string" && /[[{]/.test(r.source) && nestedSemi(r.source) && fewerCuts ? "W8cust2-BLOCK" : "odd";
    const key = `${r.section} ${cls}`;
    tally[key] = (tally[key] ?? 0) + 1;
    if (cls === "odd" && odd.length < 12) odd.push(JSON.stringify(r).slice(0, 500));
}
console.log(`new ${rows.length}`, JSON.stringify(tally));
for (const o of odd) console.log("odd", o);
