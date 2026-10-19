// SERVED MODEL: claude-opus-5-5
// X.P.W8 `.cust2` evidence: L-G2 row delta, `.semi`'s banked read (2847, bench/records/W8semi/equiv-1.json.gz) → this unit's read.
//   node bench/records/W8cust2/delta.mjs bench/records/W8cust2/equiv-1.json.gz
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
const before = JSON.parse(gunzipSync(readFileSync("bench/records/W8semi/equiv-1.json.gz"))).rows;
const file = process.argv[2] ?? "bench/records/W8cust2/equiv-1.json.gz";
const after = JSON.parse(file.endsWith(".gz") ? gunzipSync(readFileSync(file)) : readFileSync(file, "utf8")).rows;
const k = (r) => `${r.section}\u0000${r.key}`;
const b = new Map(before.map((r) => [k(r), r]));
const a = new Map(after.map((r) => [k(r), r]));
const same = (x, y) => JSON.stringify(x.arm) === JSON.stringify(y.arm);
const out = { identical: 0, gone: [], moved: [], new: [] };
for (const [key, r] of a) {
    const p = b.get(key);
    if (!p) out.new.push(r); else if (same(p, r)) out.identical++; else out.moved.push(r);
}
for (const [key, r] of b) if (!a.has(key)) out.gone.push(r);
console.log(`identical ${out.identical} · gone ${out.gone.length} · moved ${out.moved.length} · new ${out.new.length}`);
for (const kind of ["gone", "moved", "new"]) for (const r of out[kind].slice(0, 40)) console.log(kind, JSON.stringify(r).slice(0, 400));
