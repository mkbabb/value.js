#!/usr/bin/env node
// proof:serialize-fidelity — value.js Tranche Q (VJ-Q9, 1.2.0) born-RED gate.
//
// THE REAL OBSERVABLE: a CSS color round-trips VERBATIM through parse →
// serialize. Two LIVE breaches on 1.1.0 (the kf Q.WD2 grammar-fuzz tripwires):
//   (S1) a powerless `none` channel (CSS Color 4 `<number>`-or-`none`) serialized
//        as `NaN` — `oklch(0.6 none 200)` → `oklch(0.6 NaN 200)` (a NaN channel
//        re-parses to a different unit type → the kf structural-equality oracle
//        fails).
//   (S2) the `color(<space> …)` function wrapper DROPPED on round-trip —
//        `color(display-p3 1 0 0)` → `display-p3(1 0 0)` (a different function
//        name → equality fails; the bare `display-p3(…)` form is invalid CSS).
//
// Exercises the REAL parser/serializer over the BUILT artifact (dist/value.js).
// Run `npm run build` first.
//
//   C1 — none-channel round-trip: oklch(0.6 none 200) serializes `none`, not NaN.
//   C2 — color()-wrapper round-trip: color(display-p3 1 0 0) keeps the wrapper.
//   C3 — multi-none + none alpha round-trips verbatim.
//   C4 — the named-color form is UNAFFECTED (rgb/oklch keep their bare name()).

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = resolve(__dirname, "..", "..", "dist", "value.js");

let mod;
try {
    mod = await import(distPath);
} catch (e) {
    console.error(`FATAL: cannot import built dist at ${distPath}`);
    console.error(`  ${e?.stack ?? e}`);
    console.error("  Run `npm run build` first — this gate reads the artifact.");
    process.exit(1);
}

const { parseCSSValue } = mod;

const results = [];
const record = (id, label, fn) => {
    try {
        fn();
        results.push({ id, label, pass: true });
    } catch (e) {
        results.push({ id, label, pass: false, err: e?.message ?? String(e) });
    }
};
const assertRT = (input, expected) => {
    const out = parseCSSValue(input).toString();
    if (out !== expected) {
        throw new Error(`"${input}" → "${out}", expected "${expected}"`);
    }
};

console.log("proof:serialize-fidelity — none-channel + color()-wrapper round-trip\n");

record("C1", "oklch(0.6 none 200) serializes `none`, not NaN", () => {
    assertRT("oklch(0.6 none 200)", "oklch(0.6 none 200)");
});

record("C2", "color(display-p3 1 0 0) preserves the color() wrapper", () => {
    assertRT("color(display-p3 1 0 0)", "color(display-p3 1 0 0)");
    assertRT("color(rec2020 0.5 0.3 0.1)", "color(rec2020 0.5 0.3 0.1)");
});

record("C3", "multi-none + none alpha + wrapper round-trip verbatim", () => {
    assertRT("oklch(0.5 none none / none)", "oklch(0.5 none none / none)");
    assertRT("color(display-p3 1 0 0 / 0.5)", "color(display-p3 1 0 0 / 0.5)");
});

record("C4", "the named-color form is unaffected (rgb/oklch keep bare name())", () => {
    assertRT("rgb(255 0 0)", "rgb(255 0 0)");
    assertRT("oklch(0.6 0.2 200)", "oklch(0.6 0.2 200)");
});

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
        `proof:serialize-fidelity GREEN — ${results.length}/${results.length} clauses pass (VJ-Q9 holds)`,
    );
    process.exit(0);
} else {
    console.log(
        `proof:serialize-fidelity RED — ${failed}/${results.length} clauses fail`,
    );
    process.exit(1);
}
