// SERVED MODEL: claude-opus-5-5
// X.P.W8 `.semi` evidence: every L-G2 delta row (vs `.e`'s banked 981) tested against W8semi-SEMI's mechanism —
// the source holds a `;`, and the product's refusal names one (`actual: ";"`); a gone row's source holds a `;`.
import { readFileSync } from "node:fs";
const d = JSON.parse(readFileSync(process.argv[2] ?? "bench/records/W8semi/delta-1.json", "utf8"));
const all = JSON.parse(readFileSync(process.argv[3] ?? "bench/records/W8semi/equiv-1.json", "utf8")).rows;
const byKey = new Map(all.map((r) => [`${r.section}\u0000${r.key}`, r]));
// A `{ "$same": section }` arm is that section's arm for the same key (the harness's dedup).
const arm = (r) => (r.arm && typeof r.arm.$same === "string" ? byKey.get(`${r.arm.$same}\u0000${r.key}`)?.arm : r.arm);
const names = (r) => JSON.stringify(arm(r) ?? null).includes('"actual":";"');
const tally = {};
const bump = (k) => (tally[k] = (tally[k] ?? 0) + 1);
const odd = [];
for (const kind of ["new", "moved", "gone"]) for (const r of d[kind]) {
    const semi = typeof r.source === "string" && r.source.includes(";");
    const k = `${kind}:${semi ? "has;" : "no;"}:${kind === "gone" ? "-" : names(r) ? "names;" : "other"}`;
    bump(k);
    if (!semi || (kind !== "gone" && !names(r))) odd.push({ kind, section: r.section, source: String(r.source).slice(0, 120), arm: JSON.stringify(r.arm).slice(0, 200) });
}
console.log(JSON.stringify(tally));
for (const o of odd.slice(0, 40)) console.log(JSON.stringify(o));
console.log(`odd ${odd.length}`);
