// SERVED MODEL: claude-opus-5-5
// X.P.W8 `.e` evidence: L-G2 row delta, `.x`s banked read (981) → this unit's read.
import { readFileSync, writeFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
const before = JSON.parse(gunzipSync(readFileSync("bench/records/W8x/equiv-1.json.gz"))).rows;
const after = JSON.parse(readFileSync(process.argv[2] ?? "bench/records/W8e/equiv-1.json", "utf8")).rows;
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
writeFileSync(process.argv[3] ?? "bench/records/W8e/delta.json", JSON.stringify(out, null, 1));
