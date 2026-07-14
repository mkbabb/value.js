#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// domain-edges.mjs — V pass-4 charter-δ · the NG-4 reconciliation instrument.
//
// THE DURABLE-INSTRUMENT LAW: committed + re-runnable from repo root against any
// tree. This is the instrument δ uses to rule β's color-merge (NG-4) HONESTLY:
// it counts CROSS-DOMAIN runtime import edges, the metric β MOVES (it turns 13
// parsing/color→units edges intramural but GAINS 5 units/color→parsing edges).
//
//   node docs/tranches/V/design/pass-4/instruments/domain-edges.mjs [rootdir]
//   node .../domain-edges.mjs src --json
//   node .../domain-edges.mjs src --pair units/color parsing   # a specific edge class
//
// A DOMAIN = the top-level src/ subdirectory a file lives in:
//   parsing · units · units/color · transform · quantize · subpaths · root
// (units/color is split from units because it is the color capsule β merges INTO;
//  this is the granularity that makes β's "+5 units/color→parsing" edges visible.)
//
// An EDGE is a unique directed (srcDomain → dstDomain) file-pair where srcFile
// contains a non-type-only `import/export … from "<spec>"` resolving to dstFile
// and srcDomain ≠ dstDomain. Type-only edges are runtime-erased → excluded (the
// same discipline as α's census). Dedup by (srcFile,dstFile).
//
// WHY δ measures this: a god-module CARVE is INTRA-domain (color.ts → color.ts +
// siblings under parsing/color) → it leaves the cross-domain edge count
// UNCHANGED. β's merge is INTER-domain → it changes it. So this instrument is the
// clean discriminator between "reduce complexity" (δ's carves, XDOM-neutral) and
// "better structure / re-coupling" (β's merge, XDOM +5 into the kernel).
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname, relative } from "node:path";

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") flags.json = true;
    else if (a === "--pair") { flags.pairFrom = argv[++i]; flags.pairTo = argv[++i]; }
    else if (a === "--merge-sim") flags.mergeSim = true;
    else positional.push(a);
}
const ROOT = resolve(positional[0] || "src");
// SRC = the scanned root itself, so domain classification is tree-PORTABLE
// (works against `src`, a `git archive` extract, or any worktree — the
// durable-instrument law). Domains are the immediate children of ROOT.
const SRC = ROOT;

function walk(dir, acc = []) {
    for (const e of readdirSync(dir)) {
        const p = join(dir, e);
        const s = statSync(p);
        if (s.isDirectory()) {
            if (e === "node_modules" || e === "dist") continue;
            walk(p, acc);
        } else if (/\.ts$/.test(e) && !/\.d\.ts$/.test(e) && !/\.test\.ts$/.test(e)) acc.push(p);
    }
    return acc;
}

// Domain of a file = its top-level src/ subtree, with units/color split out.
// --merge-sim: relabel parsing/color/* as units/color (β's `PHYS=1` physical
// census — measures the post-`git mv parsing/color→units/color/parse` graph
// WITHOUT mutating the tree, so the NG-4 reconciliation is durable + reset-free).
function domainOf(file) {
    const rel = relative(SRC, file);
    if (rel.startsWith("..")) return "external";
    const parts = rel.split("/");
    if (flags.mergeSim && parts[0] === "parsing" && parts[1] === "color") return "units/color";
    if (parts.length === 1) return "root"; // src/easing.ts, src/math.ts, src/utils.ts, src/index.ts
    if (parts[0] === "units" && parts[1] === "color") return "units/color";
    return parts[0]; // parsing | units | transform | quantize | subpaths
}

const EXTS = ["", ".ts", "/index.ts"];
function tryResolve(base) {
    for (const ext of EXTS) {
        const cand = base + ext;
        try { if (statSync(cand).isFile()) return cand; } catch {}
    }
    return null;
}
function resolveSpec(spec, fromFile) {
    if (!spec.startsWith(".")) return null; // bare specifiers = external (parse-that, vue, …)
    return tryResolve(resolve(dirname(fromFile), spec));
}

// import/export … from "spec"; capture whether it is `import type` / `export type`
const IMPORT_RE = /(?:import|export)\s+(type\s+)?[^;'"]*?\bfrom\s*['"]([^'"]+)['"]/g;

const files = walk(ROOT);
const edges = new Set();            // "srcFile\tdstFile" (runtime only)
const domainEdges = new Map();      // "srcDom→dstDom" -> Set of "srcFile→dstFile"
for (const f of files) {
    const src = readFileSync(f, "utf8");
    const srcDom = domainOf(f);
    let m; IMPORT_RE.lastIndex = 0;
    while ((m = IMPORT_RE.exec(src))) {
        const typeOnly = !!m[1];
        if (typeOnly) continue;
        const r = resolveSpec(m[2], f);
        if (!r) continue;
        const dstDom = domainOf(r);
        if (srcDom === dstDom) continue;      // intramural — not a cross-domain edge
        const key = `${f}\t${r}`;
        if (edges.has(key)) continue;
        edges.add(key);
        const dk = `${srcDom} → ${dstDom}`;
        if (!domainEdges.has(dk)) domainEdges.set(dk, new Set());
        domainEdges.get(dk).add(`${relative(SRC, f)} → ${relative(SRC, r)}`);
    }
}

const rows = [...domainEdges.entries()]
    .map(([k, set]) => ({ edge: k, count: set.size, pairs: [...set].sort() }))
    .sort((a, b) => b.count - a.count);
const XDOM = rows.reduce((a, r) => a + r.count, 0);

if (flags.pairFrom) {
    const dk = `${flags.pairFrom} → ${flags.pairTo}`;
    const row = rows.find((r) => r.edge === dk);
    console.log(`=== edge class ${dk} : ${row ? row.count : 0} ===`);
    if (row) for (const p of row.pairs) console.log(`  ${p}`);
    process.exit(0);
}

if (flags.json) {
    console.log(JSON.stringify({ XDOM, directions: rows.length, rows }, null, 2));
} else {
    console.log(`=== V pass-4 δ · CROSS-DOMAIN runtime edges (${relative(process.cwd(), ROOT) || "."}) ===\n`);
    console.log(`XDOM (total cross-domain runtime file-PAIRS)   : ${XDOM}`);
    console.log(`distinct coupling DIRECTIONS (srcDom → dstDom) : ${rows.length}\n`);
    console.log(`  count  edge class (srcDomain → dstDomain)`);
    for (const r of rows) console.log(`  ${String(r.count).padStart(5)}  ${r.edge}`);
    console.log(`\n── the two orthogonal readings (NG-4, stated honestly) ──`);
    console.log(`• The DIRECTION SET (this count of distinct srcDom→dstDom relations) is the`);
    console.log(`  coupling TOPOLOGY. β's color merge ADDS a direction ('units/color → parsing',`);
    console.log(`  0→5, a capsule→kernel dependency). A δ god-module CARVE adds NO new direction`);
    console.log(`  (it splits WITHIN a domain) — the direction set is carve-invariant.`);
    console.log(`• The file-PAIR count (XDOM) is NOT carve-invariant: a carve RAISES it (more`);
    console.log(`  source files cross an EXISTING boundary). β LOWERS it (−5, relabeling 11`);
    console.log(`  parsing→color edges intramural) — but that is a relocation win, not a`);
    console.log(`  complexity-reduction win (G500/OVER500/MAXLOC are untouched by β). Use`);
    console.log(`  complexity-scan.mjs for the ceiling metric; use the DIRECTION SET here.`);
}
