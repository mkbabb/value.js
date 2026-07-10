#!/usr/bin/env node
/**
 * abrogation-sweep.mjs — the inv-N-10 pin-bump abrogation sweep.
 *
 * Two of the structural defeats from the abrogation ledger (§4), cheap enough
 * to run on every CI push, run at every glass-ui pin/dist move:
 *
 *   1 · EXPORTS-MAP DIFF + NAMED-EXPORT CHECK — two orthogonal drift axes:
 *       (A) every `@mkbabb/glass-ui/<subpath>` import specifier used across
 *       demo/ must resolve to a live entry in the installed glass-ui
 *       `package.json#exports` (a subpath rename/removal — e.g. the
 *       `glass-carousel` boot-fatal — is caught HERE); AND (B) every named
 *       runtime binding imported/re-exported from a LIVE specifier must exist
 *       in that dist module's actual export set. Axis B closes the §6
 *       blind-spot: a REMOVED named export (the Tabs→SegmentedTabs drift) is a
 *       live specifier but a dead binding, so axis A alone stays green while
 *       gh-pages LINK-fails. The check reads the ground truth (`Object.keys` of
 *       the resolved module) and trips before the build does.
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
 * History: at N-open this sweep was deliberately RED on `glass-elevated` +
 * `glass-subtle` ×2 (it surfaced the latter — see the W1.B lane report);
 * N.W5.E extirpated all three and the sweep has been green since. If it
 * reds again, the fix is always at the consuming site or the upstream
 * manifest — never a weakening of this gate.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative, extname } from "node:path";

const REPO_ROOT = resolve(import.meta.dirname, "..", "..");
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

// ── Half 1 · exports-map diff + named-export check ───────────────────────────
// Two orthogonal drift axes are closed here (the abrogation ledger §6):
//   A · SPECIFIER resolution — every `@mkbabb/glass-ui[/sub]` specifier must
//       resolve to a live entry in the installed exports map (a subpath
//       rename/removal is caught HERE).
//   B · NAMED-EXPORT existence — every named runtime binding imported OR
//       re-exported from a LIVE glass-ui specifier must actually exist in that
//       dist module's export set. A removed named export (the Tabs→SegmentedTabs
//       drift: the shim re-exports `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`
//       from a barrel that no longer exports them) is a valid `.` specifier but
//       a dead binding — precisely the abrogation axis A blind-spots. The check
//       reads the GROUND TRUTH (`Object.keys` of the dynamically-imported
//       module, not a static parse guess) and trips at grep+resolve time,
//       BEFORE the gh-pages LINK phase fails on it.
async function exportsMapDiff() {
    const pkg = JSON.parse(readFileSync(GLASS_UI_PKG, "utf8"));
    const exportsMap = pkg.exports ?? {};
    // Live subpath keys: drop the wildcard "*" entries to compare exactly; a
    // wildcard key (e.g. "./fonts/*") matches any specifier under its prefix.
    const exactKeys = new Set(Object.keys(exportsMap).filter((k) => !k.includes("*")));
    const wildcardPrefixes = Object.keys(exportsMap)
        .filter((k) => k.endsWith("/*"))
        .map((k) => k.slice(0, -1)); // "./fonts/" for "./fonts/*"

    const isLiveSpec = (spec) => {
        const sub = spec.slice("@mkbabb/glass-ui".length); // "" or "/tabs"
        const key = sub === "" ? "." : `.${sub}`;
        return exactKeys.has(key) || wildcardPrefixes.some((p) => key.startsWith(p));
    };

    // Match `@mkbabb/glass-ui[/<subpath>]` ONLY where it sits inside a quoted
    // string — the syntactic position of every real module specifier (ESM
    // `import … from "…"`, dynamic `import("…")`, CSS `@import "…"`). Quoting
    // excludes prose/comment mentions (e.g. the `@mkbabb/glass-ui/styles/…`
    // reference in a CSS comment), which are not imports and must not flag.
    // The closing quote terminates the specifier, so the captured subpath is
    // exactly the consumed path — no trailing punctuation bleed.
    const SPEC_RE =
        /["'`]@mkbabb\/glass-ui(\/[A-Za-z0-9._/-]+)?["'`]/g;

    // Axis B — named-binding statements: `import`/`export … { … } from
    // "@mkbabb/glass-ui[/sub]"`. Group 1 marks a WHOLE-clause `type` (an
    // `import type { … }` / `export type { … }` re-export — type-only, no
    // runtime binding, skipped). Group 2 is the brace list; `[^}]` spans
    // newlines so a multi-line list is captured whole. Group 3 is the specifier.
    const NAMED_RE =
        /(?:import|export)\s+(type\s+)?\{([^}]*)\}\s*from\s*["'`](@mkbabb\/glass-ui(?:\/[A-Za-z0-9._/-]+)?)["'`]/g;

    const dead = []; // { spec, file, line }  — axis A
    const namedUses = []; // { spec, binding, file, line }  — axis B
    for (const file of demoFiles) {
        const text = readFileSync(file, "utf8");
        const lines = text.split("\n");
        lines.forEach((lineText, i) => {
            let m;
            SPEC_RE.lastIndex = 0;
            while ((m = SPEC_RE.exec(lineText)) !== null) {
                const sub = m[1] ?? ""; // "/dock" or ""
                const spec = `@mkbabb/glass-ui${sub}`;
                if (!isLiveSpec(spec)) {
                    dead.push({
                        spec,
                        file: relative(REPO_ROOT, file),
                        line: i + 1,
                    });
                }
            }
        });
        // Axis-B scan runs over the WHOLE file text (a named statement may span
        // lines); the statement's start line is recovered by counting newlines.
        let nm;
        NAMED_RE.lastIndex = 0;
        while ((nm = NAMED_RE.exec(text)) !== null) {
            if (nm[1]) continue; // whole-clause `type` re-export — no runtime binding
            const spec = nm[3];
            const line = text.slice(0, nm.index).split("\n").length;
            for (const raw of nm[2].split(",")) {
                const s = raw.trim();
                if (!s) continue; // trailing comma / empty
                if (/^type\s/.test(s)) continue; // inline `type X` — type-only
                const binding = s.split(/\s+as\s+/)[0].trim(); // source name (pre-`as`)
                if (binding)
                    namedUses.push({
                        spec,
                        binding,
                        file: relative(REPO_ROOT, file),
                        line,
                    });
            }
        }
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

    // Axis B — resolve each LIVE specifier ONCE (cached) to its module and read
    // the ground-truth export set; a dead specifier is already reported above
    // (and cannot be imported), so it is skipped here.
    const exportSetCache = new Map();
    const exportSetOf = async (spec) => {
        if (!exportSetCache.has(spec))
            exportSetCache.set(spec, new Set(Object.keys(await import(spec))));
        return exportSetCache.get(spec);
    };

    const deadNamed = [];
    for (const use of namedUses) {
        if (!isLiveSpec(use.spec)) continue;
        const set = await exportSetOf(use.spec);
        if (!set.has(use.binding)) deadNamed.push(use);
    }

    console.log(
        `\n── named-export check (${namedUses.length} bindings across ${exportSetCache.size} live glass-ui module(s)) ──`,
    );
    if (deadNamed.length === 0) {
        console.log("  ✓ every named glass-ui import/re-export resolves to a live export");
    } else {
        failed = true;
        console.error(`  ✗ ${deadNamed.length} dead named binding(s):`);
        for (const d of deadNamed)
            console.error(
                `      ${d.file}:${d.line}  →  { ${d.binding} } from "${d.spec}"  (not exported)`,
            );
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

await exportsMapDiff();
retiredClassesSweep();

if (failed) {
    console.error("\n[abrogation-sweep] FAIL — abrogation truth violated (see hits above).");
    process.exit(1);
}
console.log("\n[abrogation-sweep] PASS — exports map + retired classes clean.");
