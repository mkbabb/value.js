// SERVED MODEL: claude-opus-5-5
// X.P.W10 L-G2 row delta against the W9 `.pin` read (`.worktrees/w9pin/equiv-1.json`, kept here gzipped). It is
// the W8ifsemi read plus two collectAnimationOptions rows (delayUnit/durationUnit) that landed between W8 and W9.
//   node bench/records/W10/delta.mjs <equiv.json[.gz]>
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
const load = (f) => JSON.parse(f.endsWith(".gz") ? gunzipSync(readFileSync(f)) : readFileSync(f, "utf8")).rows;
const before = load("bench/records/W10/base-w9pin-equiv.json.gz");
const after = load(process.argv[2]);
const k = (r) => `${r.section}\u0000${JSON.stringify(r.key)}`;
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
for (const kind of ["gone", "moved", "new"]) for (const r of out[kind].slice(0, 60)) console.log(kind, JSON.stringify(r).slice(0, 500));
