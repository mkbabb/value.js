// SERVED MODEL: claude-opus-5-5
// X.P.W8 `.ifsemi` evidence: L-G2 row delta, `.cust2`'s banked read (3371, bench/records/W8cust2/equiv-1.json.gz) → this unit's read.
//   node bench/records/W8ifsemi/delta.mjs bench/records/W8ifsemi/equiv-1.json.gz
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
const load = (f) => JSON.parse(f.endsWith(".gz") ? gunzipSync(readFileSync(f)) : readFileSync(f, "utf8")).rows;
const before = load("bench/records/W8cust2/equiv-1.json.gz");
const after = load(process.argv[2] ?? "bench/records/W8ifsemi/equiv-1.json.gz");
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
