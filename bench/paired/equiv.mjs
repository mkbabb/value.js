// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.o` — EQUIVALENCE against the frozen golden oracle (promoted from the W7 judge's equiv.mjs). An arm's
// rows are regenerated over the oracle's own frozen inputs (INPUTS + the frozen reader-shaped corpus, never
// re-harvested) and compared row by row with `oracle/golden.ndjson.gz` — the canonical form is
// isDeepStrictEqual's relation (oracle.mjs `canon`). Each mismatch is classed by whether its source holds a code
// unit ≥ 128 (the F-b-4 class, accepted spec-correct by COHESION §0ck 1) and listed in the JSON report.
//   node bench/paired/equiv.mjs <arm> [out.json]     arm = product | banked:<name> (banked arms: entry + reader rows only)
import { writeFileSync } from "node:fs";
import path from "node:path";
import { INPUTS, arm } from "./common.mjs";
import { generate, readGolden } from "./oracle.mjs";

const NAME = process.argv[2] ?? "product";
const OUTFILE = process.argv[3];
const golden = readGolden().split("\n").filter(Boolean).map((l) => JSON.parse(l));
const reader = golden.filter(([s]) => s === "harvest").map(([, label, s]) => [label, s]);
const A = await arm(NAME);
const banked = NAME.startsWith("banked:");
const m = banked ? { css: { ...A.fns }, sheet: A.m.sheet, splitTopLevel: A.m.splitTopLevel } : A.m;
const rows = generate(m, reader, banked ? { entryAndReaderOnly: true } : undefined).split("\n").filter(Boolean).map((l) => JSON.parse(l));
const want = new Map(golden.filter(([s]) => s !== "harvest").map((r) => [JSON.stringify([r[0], r[1]]), r[2]]));
const nonAscii = (s) => /[^\x00-\x7f]/.test(s);
const sourceOf = (section, key) => (typeof key === "number" && !section.startsWith("collect:") ? INPUTS[key] : Array.isArray(key) && typeof key[0] === "string" ? key[0] : null);
const report = { arm: NAME, goldenRows: want.size, comparedRows: 0, missingRows: 0, mismatches: 0, mismatchesAsciiOnly: 0, bySection: {}, rows: [] };
for (const [section, key, val] of rows) {
    if (section === "harvest") continue;
    const k = JSON.stringify([section, key]);
    if (!want.has(k)) { report.missingRows++; continue; }
    report.comparedRows++;
    const g = want.get(k);
    if (JSON.stringify(g) === JSON.stringify(val)) continue;
    const src = sourceOf(section, key);
    report.mismatches++;
    if (src !== null && !nonAscii(src)) report.mismatchesAsciiOnly++;
    report.bySection[section] = (report.bySection[section] ?? 0) + 1;
    report.rows.push({ section, key, source: src, nonAscii: src === null ? null : nonAscii(src), golden: g, arm: val });
}
console.log(`${NAME}: compared ${report.comparedRows}/${report.goldenRows} rows · mismatches ${report.mismatches} (ASCII-only sources ${report.mismatchesAsciiOnly}) ·`, JSON.stringify(report.bySection));
if (OUTFILE) writeFileSync(path.resolve(OUTFILE), JSON.stringify(report, null, 1));
process.exitCode = report.mismatches === 0 ? 0 : 1;
