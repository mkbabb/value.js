#!/usr/bin/env node
// proof:size-graph — value.js U.W-CANON U-F64 born-RED gate (G-CANON-8, a
// STANDING CI-wired regression guard). Re-anchors the size budget from the
// post-split FACADE to the real CHUNK-GRAPH TOTAL.
//
// THE DEFECT (U-F64): CI gated `dist/value.js ≤ 145 KB`, but after the Rolldown
// codeSplitting layout landed, `dist/value.js` is a ~15 KB FACADE — it merely
// re-exports from hashed shared chunks (`dist/contrast-*.js`, `dist/scroll-
// timeline-*.js`, …). The facade byte-count is blind to those chunks: the `.`
// entry's REAL reachable payload is ~192 KB across ~11 modules, of which the
// facade is under 8%. A 180 KB regression in a shared chunk sailed under the
// 145 KB facade gate untouched.
//
// THE RE-ANCHOR: walk the dist import graph from `dist/value.js`, following every
// relative `import … from "./chunk"` edge, and sum the byte size of every
// reachable module — the same bundle-trace walk `proof:subpath-budget` uses. Gate
// the TOTAL against a real budget. Two clauses:
//   (1) graph-aware: the closure must span > 1 module (a facade-blind gate sees
//       exactly the one entry file — this clause structurally forbids regressing
//       to a facade byte-count).
//   (2) budget: the chunk-graph total ≤ BUDGET.
//
// Born-RED evidence: run against `ci.yml`'s prior step and the facade measures
// 14,973 B (PASS ≤ 145 KB) while the true reachable core is 192,250 B — the gate
// the gate replaced could not see it. This script measures the 192,250.

import { readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");
const distDir = resolve(root, "dist");

// The published `.` entry (the monolith facade). Re-anchor its budget to the
// full reachable chunk graph.
const ENTRY = "value.js";

// Budget over the CHUNK-GRAPH TOTAL (facade + every reachable hashed chunk).
// Anchored at the U.W-CANON measured `.` closure (192,250 B / 11 modules) with
// ~12% headroom: tight enough that a prettier-class re-bundle (+~300 KB) or a
// large new always-reachable module trips it instantly, loose enough for the
// legitimate perceptual-slate growth the tranches add. The whole-tarball gate in
// ci.yml (unpackedSize ≤ 440 KB) remains the structural backstop over the
// PUBLISHED payload; this gate guards the runtime `.`-graph a consumer executes.
const BUDGET = 215040; // 210 KB

function closureSizes(entryRel) {
    const seen = new Set();
    const queue = [resolve(distDir, entryRel)];
    const importRe = /from\s*["']([^"']+)["']/g;
    const modules = [];
    let total = 0;
    while (queue.length) {
        const f = queue.pop();
        if (seen.has(f) || !existsSync(f)) continue;
        seen.add(f);
        const size = statSync(f).size;
        total += size;
        modules.push({ file: relative(distDir, f), size });
        const src = readFileSync(f, "utf8");
        let m;
        while ((m = importRe.exec(src))) {
            if (m[1].startsWith(".")) queue.push(resolve(dirname(f), m[1]));
        }
    }
    return { total, modules };
}

console.log("proof:size-graph — the `.` chunk-graph total budget (U-F64 / G-CANON-8)\n");

if (!existsSync(resolve(distDir, ENTRY))) {
    console.error(`GATE RED: dist/${ENTRY} missing — run \`npm run build\` first`);
    process.exit(1);
}

const { total, modules } = closureSizes(ENTRY);
modules.sort((a, b) => b.size - a.size);

const facade = modules.find((m) => m.file === ENTRY)?.size ?? 0;
console.log(`  entry facade      dist/${ENTRY}  ${facade} B`);
console.log(`  reachable modules ${modules.length}`);
for (const m of modules) console.log(`    ${String(m.size).padStart(6)} B  ${m.file}`);
console.log(`\n  chunk-graph TOTAL: ${total} B   (budget ≤ ${BUDGET} B = ${(BUDGET / 1024).toFixed(0)} KB)`);
console.log(`  facade share:      ${((facade / total) * 100).toFixed(1)}% — the byte-count the facade gate saw`);

const failures = [];
// Clause 1 — graph-aware (structurally forbids regressing to a facade byte-count).
if (modules.length <= 1) {
    failures.push(
        `graph-blind: the closure spans only ${modules.length} module — the walk ` +
            `did not follow the chunk graph (a facade-only measure). Expected > 1.`,
    );
}
// Clause 2 — real budget over the real total.
if (total > BUDGET) {
    failures.push(
        `chunk-graph total ${total} B exceeds budget ${BUDGET} B — a shared chunk ` +
            `likely bloated (invisible to the old facade gate). Investigate the ` +
            `largest modules above.`,
    );
}

if (failures.length) {
    console.error(`\nGATE RED:`);
    for (const f of failures) console.error("  " + f);
    process.exit(1);
}
console.log(`\nGATE GREEN: the size budget measures the real ${modules.length}-module chunk graph, not the ${facade} B facade.`);
