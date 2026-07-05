#!/usr/bin/env node
// proof:contrast-color — value.js Tranche Q (VJ-Q1, 1.1.1) born-RED gate.
//
// THE REAL OBSERVABLE: `contrast-color(<color>)` (CSS Color L7, Baseline April
// 2026 — the library-LEADS catch-up) must parse to a CONCRETE `Color` resolved
// eagerly to the maximally-contrasting black/white per the WCAG 2.x contrast
// ratio. Born-RED on the UNFIXED tree: `parseCSSValue('contrast-color(red)')`
// is an opaque `FunctionValue` (the generic function fall-through), NOT a
// `Color`. GREEN only when the L7 arm evaluates it eagerly.
//
// Exercises the REAL parser over the BUILT artifact (dist/value.js) — NOT a
// source-grep. Run `npm run build` first.
//
//   C1 — `contrast-color(red)` parses to a concrete `Color` ValueUnit (unit ===
//        "color"), not an opaque `FunctionValue` (the born-RED witness).
//   C2 — the WCAG endpoint picks are CORRECT (black on light, white on dark) —
//        and DISTINCT from the OKLab-lightness `computeSafeAccent` metric: the
//        near-boundary case `contrast-color(gray)` resolves via the WCAG ratio,
//        not the OKLab L distance (a wrong-metric reuse would red here).
//   C3 — the WCAG leaf math: L(white)=1, L(black)=0, ratio(white,black)=21.
//
// (S.W0 W0-6: the former C4 — a documentation-consistency check on the dead
// BBNF grammar surface under src/parsing/grammars/ — was retired with that
// surface. C1–C3 exercise the REAL parser over dist/value.js and stay.)

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const distPath = resolve(repoRoot, "dist", "value.js");

let mod;
try {
    mod = await import(distPath);
} catch (e) {
    console.error(`FATAL: cannot import built dist at ${distPath}`);
    console.error(`  ${e?.stack ?? e}`);
    console.error("  Run `npm run build` first — this gate reads the artifact.");
    process.exit(1);
}

const {
    parseCSSValue,
    parseCSSColor,
    wcagRelativeLuminance,
    wcagContrastRatio,
    contrastColor,
    FunctionValue,
} = mod;

const results = [];
const record = (id, label, fn) => {
    try {
        fn();
        results.push({ id, label, pass: true });
    } catch (e) {
        results.push({ id, label, pass: false, err: e?.message ?? String(e) });
    }
};
const assert = (cond, msg) => {
    if (!cond) throw new Error(msg);
};

console.log(
    "proof:contrast-color — the contrast-color() L7 arm + the dead L6 stub delete\n",
);

// ── C1 — the born-RED witness: concrete Color, not opaque FunctionValue ──
record(
    "C1",
    "parseCSSValue('contrast-color(red)') is a concrete Color, not an opaque FunctionValue",
    () => {
        const v = parseCSSValue("contrast-color(red)");
        assert(
            !(v instanceof FunctionValue),
            `still an opaque FunctionValue — the L7 arm did not fire (got ${v?.constructor?.name})`,
        );
        assert(
            v?.unit === "color",
            `expected unit === "color", got ${JSON.stringify(v?.unit)}`,
        );
        assert(
            v?.value?.colorSpace != null,
            `expected a concrete Color value, got ${v?.value}`,
        );
    },
);

// ── C2 — the WCAG endpoint picks (DISTINCT from the OKLab-L accent metric) ──
record(
    "C2",
    "WCAG endpoint picks: black on light surfaces, white on dark (the WCAG ratio, not OKLab L)",
    () => {
        const pick = (s) => parseCSSValue(`contrast-color(${s})`).toString();
        assert(pick("red") === "rgb(0 0 0)", `contrast-color(red) → ${pick("red")} (want black)`);
        assert(pick("white") === "rgb(0 0 0)", `contrast-color(white) → ${pick("white")} (want black)`);
        assert(pick("black") === "rgb(255 255 255)", `contrast-color(black) → ${pick("black")} (want white)`);
        assert(pick("yellow") === "rgb(0 0 0)", `contrast-color(yellow) → ${pick("yellow")} (want black)`);
        assert(pick("navy") === "rgb(255 255 255)", `contrast-color(navy) → ${pick("navy")} (want white)`);

        // The metric-distinctness probe: #767676 (mid-gray, sRGB 0.4627) has
        // WCAG luminance ~0.1845 — ABOVE the white/black crossover (~0.1791), so
        // the WCAG metric picks BLACK. The OKLab-lightness `computeSafeAccent`
        // metric (DEFAULT_MIN_CONTRAST=0.35 in OKLab L; mid-gray oklab L ~0.55)
        // would push toward white — a wrong-metric reuse fails this clause.
        const mid = pick("#767676");
        assert(mid === "rgb(0 0 0)", `contrast-color(#767676) → ${mid} (WCAG picks black; OKLab-L reuse would mispick)`);
    },
);

// ── C3 — the WCAG leaf math (relative-luminance + contrast-ratio) ──
record(
    "C3",
    "WCAG leaf: L(white)=1, L(black)=0, ratio(white,black)=21",
    () => {
        const white = parseCSSColor("white").value;
        const black = parseCSSColor("black").value;
        assert(Math.abs(wcagRelativeLuminance(white) - 1) < 1e-9, "L(white) != 1");
        assert(Math.abs(wcagRelativeLuminance(black) - 0) < 1e-9, "L(black) != 0");
        assert(Math.abs(wcagContrastRatio(white, black) - 21) < 1e-9, "ratio(white,black) != 21");
        // contrastColor leaf is reachable + correct on a public-domain color.
        assert(contrastColor(parseCSSColor("red").value).toString() === "rgb(0 0 0)", "contrastColor(red) != black");
    },
);

let failed = 0;
for (const r of results) {
    if (r.pass) {
        console.log(`  PASS  ${r.id}  ${r.label}`);
    } else {
        failed++;
        console.log(`  FAIL  ${r.id}  ${r.label}`);
        console.log(`        → ${r.err}`);
    }
}

console.log("");
if (failed === 0) {
    console.log(
        `proof:contrast-color GREEN — ${results.length}/${results.length} clauses pass (VJ-Q1 holds)`,
    );
    process.exit(0);
} else {
    console.log(
        `proof:contrast-color RED — ${failed}/${results.length} clauses fail`,
    );
    process.exit(1);
}
