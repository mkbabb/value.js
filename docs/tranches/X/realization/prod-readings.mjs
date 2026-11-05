#!/usr/bin/env node
// V-D2 (realization PLAN §2): the §0hr prod readings, put on the record.
//
// Emits one canonical row per served cell, read verbatim from the banked
// probe JSON (evidence/0hr/od/r{1,2,3}/od.json and evidence/0hr/od12/*/table.json).
//   node prod-readings.mjs            → print the rows
//   node prod-readings.mjs --check    → exit 0 only when the fenced block between
//                                       the V-D2 markers in COHESION.md is byte-equal
//                                       to the rows, and the OD-12 light log carries
//                                       ×2 cells (desk + mob) per run.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const X = join(dirname(fileURLToPath(import.meta.url)), "..");
const EV = join(X, "evidence/0hr");
const read = (p) => JSON.parse(readFileSync(join(EV, p), "utf8"));

const rows = [];
for (const r of ["r1", "r2", "r3"]) {
    for (const c of read(`od/${r}/od.json`)) {
        if (c.od === "9/10/11") {
            rows.push(
                `${r} OD-9/10/11 ${c.vp} ${c.scheme} clippedPx=${c.clippedPx} crownApplyOverlap=${c.crownApplyOverlap} badge.slot=${c.badge?.slot} pageErrors=${c.pageErrors}`,
            );
        } else if (c.od === "15") {
            rows.push(
                `${r} OD-15/19 ${c.w} ${c.scheme} ${c.route} stage=${c.stage} measure=${c.measurePx} spectrum=${c.spectrum.join("x")}`,
            );
        } else if (c.od === "3b") {
            rows.push(
                `${r} OD-3b ${c.vp} mineStatus=${c.mineStatus} Daraksha=${c.hasDaraksha} DarakshaGradient=${c.hasDarakshaGradient}`,
            );
        }
    }
}
const od12 = ["r1-desk", "r1-mob", "r2-desk", "r2-mob"];
for (const cell of od12) {
    const t = read(`od12/${cell}/table.json`);
    rows.push(`${cell} OD-12-light ${t.view.width}x${t.view.height} gate=${JSON.stringify(t.gate)}`);
}
const text = rows.join("\n") + "\n";

if (!process.argv.includes("--check")) {
    process.stdout.write(text);
    process.exit(0);
}

const fails = [];
const coh = readFileSync(join(X, "COHESION.md"), "utf8");
const m = coh.match(/<!-- V-D2 rows begin -->\n```\n([\s\S]*?)```\n<!-- V-D2 rows end -->/);
if (!m) fails.push("no V-D2 fenced block in COHESION.md");
else if (m[1] !== text) fails.push("COHESION V-D2 block differs from the banked JSON rows");
for (const run of ["r1", "r2"]) {
    const cells = od12.filter((c) => c.startsWith(run));
    if (cells.length !== 2) fails.push(`OD-12 light ${run}: ${cells.length} cells, want 2`);
}
for (const f of fails) console.error("RED", f);
console.log(fails.length ? `RED ${fails.length}` : `GREEN ${rows.length} rows byte-equal`);
process.exit(fails.length ? 1 : 0);
