#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// complexity-scan.mjs — V pass-4 charter-δ · the LIBRARY COMPLEXITY metric set.
//
// THE DURABLE-INSTRUMENT LAW (pass-3 Group-B / NG-2): this instrument is
// committed under docs/tranches/V/design/pass-4/instruments/ and is re-runnable
// from the repo root against ANY tree. It is the source of truth for δ's
// "metric that goes DOWN" claim — never a number pasted into a doc.
//
//   node docs/tranches/V/design/pass-4/instruments/complexity-scan.mjs [rootdir]
//   node .../complexity-scan.mjs src --json          # machine-readable
//   node .../complexity-scan.mjs src --gate 11        # exit 1 if G500 > 11 (born-RED)
//   node .../complexity-scan.mjs src --hotspots 15    # top-N cyclomatic hotspots
//
// rootdir defaults to "src" (the library). Excludes *.d.ts and *.test.ts.
//
// ── THE METRIC SET (each stated as a RULE, with its objective — NG-3 honesty) ──
//
// PRIMARY (ceiling compliance — the glass-ui STRUCTURE-SPEC 500-raw-line law,
// made scalar). Objective: "bring every LOGIC src file under the 500-line
// ceiling." The named ALTERNATIVE objective is "minimize net LoC" (dedup /
// delete) — a DIFFERENT, harder ask this metric set does NOT claim (see the
// honesty note printed at the foot of the report).
//
//   G500      count of files with LoC > 500  (the ceiling-violation count)
//   OVER500   Σ max(0, LoC − 500)            (total ceiling overage, one scalar)
//   MAXLOC    the single largest file        (the repo's tallest module)
//
// A carve that splits a >500 LOGIC file into ≤500 siblings reduces G500/OVER500;
// a `git mv` RELOCATION preserves all three (the NG-4 discriminator). That is the
// whole point: these metrics fall for a carve and stand still for a relocation.
//
// DIAGNOSTIC companions (named where complexity lives; not all "go down"):
//   IMPUREBARREL  index.ts barrels carrying LOCAL logic (a barrel that isn't one)
//   HOTSPOTS      top functions by cyclomatic proxy (decision-point count)
//
// HONESTY (NG-3): splitting a god-module does NOT reduce total LoC or total
// cyclomatic complexity — it redistributes them. What a carve buys is LOCALITY
// (max-file-LoC, files-over-ceiling, comprehensible-in-isolation units) and
// ceiling-law compliance. Net-LoC / total-cyclomatic reduction is a separate
// objective (delete / dedup code) the carve set does not pursue.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative, basename } from "node:path";

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") flags.json = true;
    else if (a === "--gate") flags.gate = Number(argv[++i]);
    else if (a === "--hotspots") flags.hotspots = Number(argv[++i]);
    else positional.push(a);
}
const ROOT = resolve(positional[0] || "src");
const CEILING = 500;
const HOTSPOT_N = flags.hotspots || 12;

// ── collect *.ts (exclude declaration + test files) ──
function walk(dir, acc = []) {
    for (const e of readdirSync(dir)) {
        const p = join(dir, e);
        const s = statSync(p);
        if (s.isDirectory()) {
            if (e === "node_modules" || e === "dist" || e === "__tests__") continue;
            walk(p, acc);
        } else if (/\.ts$/.test(e) && !/\.d\.ts$/.test(e) && !/\.test\.ts$/.test(e)) {
            acc.push(p);
        }
    }
    return acc;
}

// LoC = newline count (matches `wc -l`).
function loc(src) {
    const m = src.match(/\n/g);
    return m ? m.length : 0;
}

// ── impure-barrel detector ──
// A "barrel" is a file named index.ts. It is IMPURE if it declares LOCAL logic
// (a top-level const/function/class/interface that is NOT a bare `export {…}
// from` / `export * from` / `export type … from` re-export). A barrel should
// re-export; local logic at a barrel path is the smell.
function impureBarrelDecls(src) {
    const lines = src.split("\n");
    let count = 0;
    for (const raw of lines) {
        const l = raw.trim();
        // pure re-export forms — skip
        if (/^export\s+\*\s+from/.test(l)) continue;
        if (/^export\s+(type\s+)?\{/.test(l)) continue; // export { … } (from …) block start
        if (/^import\b/.test(l)) continue;
        // local declaration forms — count once at the declaration line
        if (/^(export\s+)?(async\s+)?function\s/.test(l)) count++;
        else if (/^(export\s+)?class\s/.test(l)) count++;
        else if (/^(export\s+)?(const|let)\s+[A-Za-z_$]/.test(l)) count++;
        else if (/^(export\s+)?interface\s/.test(l)) count++;
        else if (/^(export\s+)?enum\s/.test(l)) count++;
    }
    return count;
}

// ── cyclomatic proxy per function ──
// Not a true CFG cyclomatic number — a decision-point COUNT (the standard
// grep-cyclomatic proxy): 1 + occurrences of if/for/while/case/catch/&&/||/?:.
// Reported to NAME where the irreducible logic lives; a carve MOVES a hotspot to
// a sibling, it does not lower the hotspot's own number (the honesty companion).
function cyclomaticHotspots(src, file) {
    const spots = [];
    // match top-level + nested function/method headers with a following brace body
    const re = /(?:export\s+)?(?:async\s+)?function\s+([A-Za-z0-9_$]+)\s*(?:<[^>]*>)?\s*\(/g;
    let m;
    const lines = src.split("\n");
    // precompute line starts
    const starts = [];
    let off = 0;
    for (const ln of lines) { starts.push(off); off += ln.length + 1; }
    const lineAt = (idx) => {
        let lo = 0, hi = starts.length - 1;
        while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (starts[mid] <= idx) lo = mid; else hi = mid - 1; }
        return lo + 1;
    };
    while ((m = re.exec(src))) {
        const name = m[1];
        // find the body by brace matching from the first "{" after the "("
        let i = re.lastIndex;
        let depth = 0, bodyStart = -1;
        for (; i < src.length; i++) {
            const c = src[i];
            if (c === "(") depth++;
            else if (c === ")") depth--;
            else if (c === "{" && depth <= 0) { bodyStart = i; break; }
            else if (c === ";" && depth <= 0) break; // signature only (overload)
        }
        if (bodyStart < 0) continue;
        let bd = 0, bodyEnd = -1;
        for (i = bodyStart; i < src.length; i++) {
            const c = src[i];
            if (c === "{") bd++;
            else if (c === "}") { bd--; if (bd === 0) { bodyEnd = i; break; } }
        }
        if (bodyEnd < 0) continue;
        const body = src.slice(bodyStart, bodyEnd);
        const dp =
            (body.match(/\bif\b/g) || []).length +
            (body.match(/\bfor\b/g) || []).length +
            (body.match(/\bwhile\b/g) || []).length +
            (body.match(/\bcase\b/g) || []).length +
            (body.match(/\bcatch\b/g) || []).length +
            (body.match(/&&/g) || []).length +
            (body.match(/\|\|/g) || []).length +
            (body.match(/\?[^.:]/g) || []).length; // ternary-ish (excludes ?. and ?:)
        spots.push({ file, name, cyclomatic: dp + 1, line: lineAt(m.index) });
    }
    return spots;
}

// ── public-surface count per file ──
function exportCount(src) {
    return (src.match(/^export /gm) || []).length;
}

const files = walk(ROOT);
const records = files.map((f) => {
    const src = readFileSync(f, "utf8");
    return {
        file: relative(process.cwd(), f),
        loc: loc(src),
        exports: exportCount(src),
        impureBarrel: basename(f) === "index.ts" ? impureBarrelDecls(src) : 0,
        _src: src,
    };
});

const over = records.filter((r) => r.loc > CEILING).sort((a, b) => b.loc - a.loc);
const G500 = over.length;
const OVER500 = records.reduce((a, r) => a + Math.max(0, r.loc - CEILING), 0);
const MAXLOC = records.reduce((a, r) => Math.max(a, r.loc), 0);
const maxFile = records.find((r) => r.loc === MAXLOC);
const impureBarrels = records.filter((r) => r.impureBarrel > 0).sort((a, b) => b.loc - a.loc);
const totalLoc = records.reduce((a, r) => a + r.loc, 0);

const hotspots = [];
for (const r of records) for (const h of cyclomaticHotspots(r._src, r.file)) hotspots.push(h);
hotspots.sort((a, b) => b.cyclomatic - a.cyclomatic);

const summary = {
    root: relative(process.cwd(), ROOT) || ".",
    files: records.length,
    totalLoc,
    G500,
    OVER500,
    MAXLOC,
    maxFile: maxFile ? maxFile.file : null,
    impureBarrels: impureBarrels.length,
};

if (flags.json) {
    console.log(JSON.stringify({
        summary,
        over: over.map((r) => ({ file: r.file, loc: r.loc, exports: r.exports })),
        impureBarrels: impureBarrels.map((r) => ({ file: r.file, loc: r.loc, localDecls: r.impureBarrel })),
        hotspots: hotspots.slice(0, HOTSPOT_N),
    }, null, 2));
} else {
    console.log(`=== V pass-4 δ · COMPLEXITY SCAN (${summary.root}) ===\n`);
    console.log(`files scanned : ${summary.files}   total LoC : ${totalLoc}`);
    console.log(`\n── PRIMARY (ceiling compliance, ceiling=${CEILING}) ──`);
    console.log(`  G500     (files > ${CEILING} LoC) : ${G500}`);
    console.log(`  OVER500  (Σ max(0, LoC−${CEILING})) : ${OVER500}`);
    console.log(`  MAXLOC   (largest file)          : ${MAXLOC}  (${summary.maxFile})`);
    console.log(`\n── the ${G500} files over the ${CEILING}-line ceiling ──`);
    console.log(`  LoC\texports\tfile`);
    for (const r of over) console.log(`  ${r.loc}\t${r.exports}\t${r.file}`);
    console.log(`\n── DIAGNOSTIC: impure barrels (index.ts carrying local logic) ──`);
    if (impureBarrels.length === 0) console.log(`  (none)`);
    for (const r of impureBarrels) console.log(`  ${r.loc} LoC, ${r.impureBarrel} local decls : ${r.file}`);
    console.log(`\n── DIAGNOSTIC: top-${HOTSPOT_N} cyclomatic hotspots (decision-point proxy) ──`);
    console.log(`  (a carve MOVES these to siblings; it does NOT lower the per-fn number)`);
    for (const h of hotspots.slice(0, HOTSPOT_N)) console.log(`  ${String(h.cyclomatic).padStart(3)}  ${h.file}:${h.line}  ${h.name}()`);
    console.log(`\nHONESTY: net LoC (${totalLoc}) + total cyclomatic are ~invariant under a carve.`);
    console.log(`What falls is G500/OVER500/MAXLOC — ceiling compliance + locality, not total complexity.`);
}

if (flags.gate !== undefined) {
    if (G500 > flags.gate) {
        console.error(`\nGATE FAIL: G500=${G500} > ${flags.gate}`);
        process.exit(1);
    }
    console.error(`\nGATE PASS: G500=${G500} <= ${flags.gate}`);
}
