#!/usr/bin/env node
/**
 * E.W1 Lane D microbenchmark — 152-branch `nameParser` → broad-regex
 * + Set-lookup speedup gate.
 *
 * Compares:
 *   Scenario A (pre-transposition): a 155-branch `any(...)` of
 *     case-insensitive regexes, one per CSS color name (the original
 *     shape, faithfully reconstructed inline so the bench is hermetic).
 *   Scenario B (post-transposition): a single broad-identifier regex
 *     match followed by a `Set.has(name.toLowerCase())` lookup (the
 *     shape now in `src/parsing/color.ts`).
 *
 * Both scenarios mirror the actual `nameParser` shape — they consume an
 * identifier from the input and return whether it matched a known name.
 * The hot kernel reads a pool of distinct inputs (mix of known + unknown
 * names + mixed case) and counts matches. Distinct inputs thwart V8's
 * single-call-site monomorphic-inlining and represent the real workload
 * (parsing color values from CSS streams).
 *
 * The bench stays JS-only (no .ts import) so it runs under plain
 * `node ≥ 20` without a TS loader.
 *
 * Acceptance: post-transposition median speedup ≥ 5× over Node ≥ 20.
 *
 * Source ref:
 *   - docs/tranches/E/waves/E.W1.md Lane D (lines 99-113)
 *   - docs/tranches/E/audit/E-AUDIT-5-library-demo-architecture.md §9 item 2
 *   - bench/color-channel-access.mjs (D.W1 L8 reference shape)
 */

import { performance } from "node:perf_hooks";

// ─── COLOR_NAMES (subset — the canonical 147 CSS named colors + a
// handful of customs to mirror the actual COLOR_NAMES table size). ─────
// The bench is sensitive to N (the branch count), not the specific
// values, so we mirror the actual shape: 155 lowercase identifiers.
const COLOR_NAMES_LIST = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure",
    "beige", "bisque", "black", "blanchedalmond", "blue",
    "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse",
    "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson",
    "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray",
    "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen",
    "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
    "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise",
    "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey",
    "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia",
    "gainsboro", "ghostwhite", "gold", "goldenrod", "gray",
    "green", "greenyellow", "grey", "honeydew", "hotpink",
    "indianred", "indigo", "ivory", "khaki", "lavender",
    "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral",
    "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey",
    "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray",
    "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen",
    "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue",
    "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue",
    "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue",
    "mintcream", "mistyrose", "moccasin", "navajowhite", "navy",
    "oldlace", "olive", "olivedrab", "orange", "orangered",
    "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
    "papayawhip", "peachpuff", "peru", "pink", "plum",
    "powderblue", "purple", "rebeccapurple", "red", "rosybrown",
    "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen",
    "seashell", "sienna", "silver", "skyblue", "slateblue",
    "slategray", "slategrey", "snow", "springgreen", "steelblue",
    "tan", "teal", "thistle", "tomato", "transparent",
    "turquoise", "violet", "wheat", "white", "whitesmoke",
    "yellow", "yellowgreen",
    // ~8 customs to round out to ~155
    "shadyshroom", "patriarchalplum", "winterwind", "blackwellberry",
    "noiretumbre", "auroraflux", "dusketide", "vermillionsigil",
];

// Mirror the actual `nameParser` longest-first sort.
const SORTED = [...COLOR_NAMES_LIST].sort((a, b) => b.length - a.length);

// ─── Scenario A: pre-transposition (155-branch `any(...)` of istrings) ─
// `istring` is approximated as a case-insensitive regex per name. The
// `any()` semantics: try each in order until one matches. We anchor at
// the start of the input (parse-that's regex parser tests at the cursor).
function makeScenarioA() {
    const regexes = SORTED.map((n) => {
        // Same shape as parsing/utils.ts `istring`: escape regex meta-
        // chars (not relevant for these lowercase names but preserved
        // for fidelity) and apply the `i` flag.
        const escaped = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return new RegExp("^" + escaped, "i");
    });
    // The lookup table for `chain((x) => COLOR_NAMES[x.toLowerCase()])`.
    const names = Object.create(null);
    for (const n of COLOR_NAMES_LIST) names[n] = "#000000"; // value irrelevant
    return function tryParseA(input) {
        for (let i = 0; i < regexes.length; i++) {
            const m = regexes[i].exec(input);
            if (m) {
                const matched = m[0];
                return names[matched.toLowerCase()] != null;
            }
        }
        return false;
    };
}

// ─── Scenario B: post-transposition (broad regex + Set.has) ────────────
function makeScenarioB() {
    const ident = /^[a-zA-Z][a-zA-Z0-9-]*/;
    const known = new Set(COLOR_NAMES_LIST);
    return function tryParseB(input) {
        const m = ident.exec(input);
        if (!m) return false;
        const matched = m[0];
        return known.has(matched.toLowerCase());
    };
}

// ─── Workload pool ─────────────────────────────────────────────────────
// Mix of known names (varied cases), prefix-collision pairs, and
// unknowns. Representative of the actual parse stream (gradient stops,
// named-color literals in calc-adjacent positions, etc.).
const POOL = [
    "rebeccapurple", "REBECCAPURPLE", "Red", "DodgerBlue", "blue",
    "aquamarine", "aqua", "blackwellberry", "tomato", "transparent",
    "yellowgreen", "yellow", "navy", "orange", "orangered",
    "hotpink", "HOTPINK", "darkgoldenrod", "lightsteelblue", "magenta",
    "unknownname", "notacolor", "redwood", "redx", "auroraflux",
    "AURORAFLUX", "AntiqueWhite", "limegreen", "lime", "snow",
    "MidnightBlue", "papayawhip", "rosybrown", "ghostwhite", "ivory",
    "ZZZ", "a", "b", "ab", "xyz",
];

// ─── Configuration ─────────────────────────────────────────────────────
const ITERATIONS = 100_000;
const WARMUP_OUTER = 5_000;
const TARGET_SPEEDUP = 5;

const fmt = (ms) => ms.toFixed(3).padStart(8) + " ms";

// ─── Hot-loop kernel ───────────────────────────────────────────────────
function readAll(parser, pool) {
    let matches = 0;
    for (let i = 0; i < pool.length; i++) {
        if (parser(pool[i])) matches++;
    }
    return matches;
}

// ─── Bench harness ─────────────────────────────────────────────────────
function bench(label, parser) {
    // Warmup — let V8 settle hidden classes / inline caches.
    let sink = 0;
    for (let i = 0; i < WARMUP_OUTER; i++) sink += readAll(parser, POOL);
    if (sink === Infinity) console.log("never"); // prevent DCE

    const t0 = performance.now();
    let total = 0;
    for (let i = 0; i < ITERATIONS; i++) {
        total += readAll(parser, POOL);
    }
    const t1 = performance.now();
    if (total === Infinity) console.log("never");
    const ms = t1 - t0;
    console.log(`  ${label}: ${fmt(ms)}  (matches=${total.toLocaleString()})`);
    return ms;
}

console.log(
    `\nE.W1 Lane D — nameParser broad-regex + Set-lookup microbenchmark` +
        `\n  pool=${POOL.length} distinct inputs, outer-iter=${ITERATIONS.toLocaleString()},` +
        ` total name lookups/scenario = ${(POOL.length * ITERATIONS).toLocaleString()},` +
        `\n  branches collapsed: ${SORTED.length} → 1 regex + 1 Set.has,` +
        `\n  target speedup: ≥ ${TARGET_SPEEDUP}×\n`,
);

const runs = [];
for (let run = 1; run <= 3; run++) {
    console.log(`Run ${run}:`);
    const parserA = makeScenarioA();
    const parserB = makeScenarioB();

    const msA = bench("Scenario A (pre: 155-branch any() istring)  ", parserA);
    const msB = bench("Scenario B (post: broad-regex + Set.has)    ", parserB);
    const speedup = msA / msB;
    console.log(`  speedup: ${speedup.toFixed(2)}×\n`);
    runs.push({ msA, msB, speedup });
}

const speedups = runs.map((r) => r.speedup).sort((x, y) => x - y);
const median = speedups[1];
const pass = median >= TARGET_SPEEDUP;

console.log(`Summary:`);
console.log(`  speedups (sorted): ${speedups.map((s) => s.toFixed(2) + "×").join(", ")}`);
console.log(`  median speedup:    ${median.toFixed(2)}×`);
console.log(`  target:            ≥ ${TARGET_SPEEDUP}×`);
console.log(`  verdict:           ${pass ? "PASS" : "FAIL"}`);
console.log();

process.exit(pass ? 0 : 1);
