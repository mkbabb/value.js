#!/usr/bin/env node
/**
 * abrogation-sweep.mjs — the inv-N-10 pin-bump abrogation sweep.
 *
 * Two of the structural defeats from the abrogation ledger (§4), cheap enough
 * to run on every CI push, run at every glass-ui pin/dist move:
 *
 *   1 · EXPORTS-MAP DIFF — every `@mkbabb/glass-ui/<subpath>` import specifier
 *       used across demo/ must resolve to a live entry in the installed
 *       glass-ui `package.json#exports`. A sibling subpath rename/removal (e.g.
 *       the `glass-carousel` boot-fatal — a subpath no published version ever
 *       shipped) is caught HERE, at the diff, before it dead-imports the demo.
 *
 *   2 · RETIRED-CLASSES SWEEP — every class name in glass-ui's upstream
 *       abrogation manifest (`.retired-classes.txt`) is grepped against demo/
 *       class usage. A retired CSS class silently no-ops (the P9 failure mode:
 *       a class that "cannot error"), so the manifest is the only signal — any
 *       surviving consumer is a phantom-class hit and fails the sweep.
 *
 * The typecheck-vs-fresh-d.ts, cold-cache boot-smoke, and e2e steps of the
 * ledger §4 sweep are the inv-N-1 gates wired separately in ci.yml; this script
 * is steps 1–2 — judgment + grep, no proof-script idiom.
 *
 * Exit codes: 0 = both halves clean; non-zero = any dead subpath or any
 * surviving retired-class consumer (the offending sites are printed).
 *
 * KNOWN EXPECTED RED (N-open, do NOT silence): the retired-classes half hits
 * `glass-elevated` at MixResultDisplay.vue (chartered to N.W5.E → glass-floating)
 * and `glass-subtle` in the gradient editors (this sweep surfaced it — see the
 * W1.B lane report; also N.W5.E). The sweep is correct to be red here; the fix
 * is a downstream wave's, never a weakening of this gate.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative, extname } from "node:path";

const REPO_ROOT = resolve(import.meta.dirname, "..");
const DEMO_DIR = join(REPO_ROOT, "demo");
const GLASS_UI_PKG = join(
    REPO_ROOT,
    "node_modules/@mkbabb/glass-ui/package.json",
);
// Prefer the installed manifest (what the build actually resolves); fall back
// to the sibling source checkout when running against a non-installed tree.
const RETIRED_CLASSES_CANDIDATES = [
    join(REPO_ROOT, "node_modules/@mkbabb/glass-ui/.retired-classes.txt"),
    resolve(REPO_ROOT, "../glass-ui/.retired-classes.txt"),
];

const SCANNED_EXTS = new Set([".vue", ".ts", ".css", ".html", ".mts", ".js", ".mjs"]);

/** Recursively collect scannable demo files (skips node_modules/dist). */
function collectFiles(dir, acc = []) {
    for (const name of readdirSync(dir)) {
        if (name === "node_modules" || name === "dist" || name === ".vite") continue;
        const full = join(dir, name);
        const st = statSync(full);
        if (st.isDirectory()) collectFiles(full, acc);
        else if (SCANNED_EXTS.has(extname(name))) acc.push(full);
    }
    return acc;
}

const demoFiles = collectFiles(DEMO_DIR);
let failed = false;

// ── Half 1 · exports-map diff ────────────────────────────────────────────────
function exportsMapDiff() {
    const pkg = JSON.parse(readFileSync(GLASS_UI_PKG, "utf8"));
    const exportsMap = pkg.exports ?? {};
    // Live subpath keys: drop the wildcard "*" entries to compare exactly; a
    // wildcard key (e.g. "./fonts/*") matches any specifier under its prefix.
    const exactKeys = new Set(Object.keys(exportsMap).filter((k) => !k.includes("*")));
    const wildcardPrefixes = Object.keys(exportsMap)
        .filter((k) => k.endsWith("/*"))
        .map((k) => k.slice(0, -1)); // "./fonts/" for "./fonts/*"

    // Match `@mkbabb/glass-ui[/<subpath>]` ONLY where it sits inside a quoted
    // string — the syntactic position of every real module specifier (ESM
    // `import … from "…"`, dynamic `import("…")`, CSS `@import "…"`). Quoting
    // excludes prose/comment mentions (e.g. the `@mkbabb/glass-ui/styles/…`
    // reference in a CSS comment), which are not imports and must not flag.
    // The closing quote terminates the specifier, so the captured subpath is
    // exactly the consumed path — no trailing punctuation bleed.
    const SPEC_RE =
        /["'`]@mkbabb\/glass-ui(\/[A-Za-z0-9._/-]+)?["'`]/g;

    const dead = []; // { spec, file, line }
    for (const file of demoFiles) {
        const text = readFileSync(file, "utf8");
        const lines = text.split("\n");
        lines.forEach((lineText, i) => {
            let m;
            SPEC_RE.lastIndex = 0;
            while ((m = SPEC_RE.exec(lineText)) !== null) {
                const sub = m[1] ?? ""; // "/dock" or ""
                const spec = `@mkbabb/glass-ui${sub}`;
                const key = sub === "" ? "." : `.${sub}`;
                const live =
                    exactKeys.has(key) ||
                    wildcardPrefixes.some((p) => key.startsWith(p));
                if (!live) {
                    dead.push({
                        spec,
                        file: relative(REPO_ROOT, file),
                        line: i + 1,
                    });
                }
            }
        });
    }

    // De-dup identical (spec,file,line) tuples (a spec can appear twice/line).
    const seen = new Set();
    const uniqueDead = dead.filter((d) => {
        const k = `${d.file}:${d.line}:${d.spec}`;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });

    console.log(`\n── exports-map diff (${exactKeys.size} live subpaths) ──`);
    if (uniqueDead.length === 0) {
        console.log("  ✓ every @mkbabb/glass-ui/<subpath> import resolves to a live exports entry");
    } else {
        failed = true;
        console.error(`  ✗ ${uniqueDead.length} dead subpath import(s):`);
        for (const d of uniqueDead)
            console.error(`      ${d.file}:${d.line}  →  ${d.spec}  (no exports entry)`);
    }
}

// ── Half 2 · retired-classes sweep ──────────────────────────────────────────
function retiredClassesSweep() {
    const manifestPath = RETIRED_CLASSES_CANDIDATES.find((p) => existsSync(p));
    if (!manifestPath) {
        failed = true;
        console.error(
            "\n── retired-classes sweep ──\n  ✗ no .retired-classes.txt found (checked: " +
                RETIRED_CLASSES_CANDIDATES.map((p) => relative(REPO_ROOT, p)).join(", ") +
                ")",
        );
        return;
    }

    const classes = readFileSync(manifestPath, "utf8")
        .split("\n")
        .map((l) => l.replace(/#.*$/, "").trim()) // strip trailing comments
        .filter((l) => l.length > 0);

    console.log(
        `\n── retired-classes sweep (${classes.length} entries · ${relative(REPO_ROOT, manifestPath)}) ──`,
    );

    const hits = []; // { cls, file, line, text }
    for (const cls of classes) {
        // Match the class as a whole token: bounded by start/end or a non-class
        // character (whitespace, quote, dot, colon, backtick, brace, etc.). The
        // CSS class grammar is [A-Za-z0-9_-]; a class name embedded in a longer
        // identifier (a different class that merely contains this string) must
        // NOT match — so the boundary forbids those continuation chars.
        const esc = cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(`(^|[^A-Za-z0-9_-])${esc}([^A-Za-z0-9_-]|$)`);
        for (const file of demoFiles) {
            const lines = readFileSync(file, "utf8").split("\n");
            lines.forEach((lineText, i) => {
                if (re.test(lineText))
                    hits.push({
                        cls,
                        file: relative(REPO_ROOT, file),
                        line: i + 1,
                        text: lineText.trim().slice(0, 120),
                    });
            });
        }
    }

    if (hits.length === 0) {
        console.log("  ✓ zero retired-class consumers in demo/");
    } else {
        failed = true;
        console.error(`  ✗ ${hits.length} retired-class hit(s):`);
        for (const h of hits)
            console.error(`      [${h.cls}] ${h.file}:${h.line}  ${h.text}`);
    }
}

exportsMapDiff();
retiredClassesSweep();

if (failed) {
    console.error("\n[abrogation-sweep] FAIL — abrogation truth violated (see hits above).");
    process.exit(1);
}
console.log("\n[abrogation-sweep] PASS — exports map + retired classes clean.");
