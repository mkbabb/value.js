/**
 * BORN-RED — fourier-analysis' live value.js coupling, resolved against value.js@4.0.0.
 *
 * Leg 1: the bare specifier. fourier's 5 import sites all write `from "@mkbabb/value.js"`.
 *        4.0.0's package.json has NO "." exports key, no "main", no "module".
 * Leg 2: `timingFunctions` — 0 occurrences in value.js@4.0.0 src/; the symbol is gone.
 * Leg 3: curve drift. fourier's 22 EASING_LABELS names all still RESOLVE via
 *        `easing(name)`, but 8 of them return a cubic-bezier approximation where
 *        0.13.0 returned the analytic curve.
 *
 * run (from the value.js repo root):
 *   node docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs
 * GREEN condition: all three legs pass.
 */
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const VALUE = "/Users/mkbabb/Programming/value.js";
const FOURIER = "/Users/mkbabb/Programming/fourier-analysis";
const require = createRequire(import.meta.url);
let red = 0;

// ── Leg 1 — bare specifier resolution ───────────────────────────────────────
const pkg = require(`${VALUE}/package.json`);
const hasRoot = Object.hasOwn(pkg.exports ?? {}, ".") || pkg.main || pkg.module;
const SITES = [
    "web/src/components/equation/ConvergencePlot.vue:5",
    "web/src/components/equation/composables/useCurveTransition.ts:8",
    "web/src/components/equation/lib/harmonics.ts:5",
    "web/src/lib/easings.ts:9",
    "web/src/lib/easings.ts:16",
];
if (!hasRoot) {
    red++;
    console.log(`RED  leg1: value.js@${pkg.version} exports = [${Object.keys(pkg.exports).join(", ")}]`);
    console.log(`     no "." key / no "main" / no "module" — ERR_PACKAGE_PATH_NOT_EXPORTED at all ${SITES.length} fourier sites:`);
    SITES.forEach((s) => console.log(`       ${s}   import … from "@mkbabb/value.js"`));
} else console.log("ok   leg1: bare specifier resolves");

// ── Leg 2 — the deleted symbol ──────────────────────────────────────────────
const easing4 = await import(pathToFileURL(`${VALUE}/dist/subpaths/easing.js`));
if (!("timingFunctions" in easing4)) {
    red++;
    console.log(`\nRED  leg2: \`timingFunctions\` absent from every 4.0.0 subpath`);
    console.log(`     consumed at ${FOURIER}/web/src/lib/easings.ts:9,55-58 (Object.fromEntries over 22 label keys)`);
    console.log(`     ./easing ships ${Object.keys(easing4).length} names, flat: ${Object.keys(easing4).sort().join(" ")}`);
} else console.log("ok   leg2: timingFunctions present");

// ── Leg 3 — curve drift on the names that DO resolve ────────────────────────
const NAMES = ["linear","ease-in","ease-out","ease-in-out","ease-in-back","ease-out-back","ease-in-out-back",
    "ease-in-quad","ease-out-quad","ease-in-out-quad","ease-in-cubic","ease-out-cubic","ease-in-out-cubic",
    "ease-in-sine","ease-out-sine","ease-in-out-sine","ease-in-expo","ease-out-expo","ease-in-out-expo",
    "ease-in-circ","ease-out-circ","ease-in-out-circ"];
const old = await import(pathToFileURL(`${FOURIER}/web/node_modules/@mkbabb/value.js/dist/value.js`));
const S = Array.from({ length: 1001 }, (_, i) => i / 1000);
const drift = [];
for (const n of NAMES) {
    const r = easing4.easing(n);
    if (!r.ok) { drift.push([n, Infinity]); continue; }
    let m = 0;
    for (const t of S) { const d = Math.abs(old.timingFunctions[n](t) - r.value(t)); if (d > m) m = d; }
    if (m >= 1e-3) drift.push([n, m]);
}
if (drift.length) {
    red++;
    console.log(`\nRED  leg3: ${drift.length}/22 easing names change SHAPE between 0.13.0 and 4.0.0 (max|Δ| ≥ 1e-3)`);
    drift.sort((a, b) => b[1] - a[1]).forEach(([n, m]) => console.log(`       ${n.padEnd(18)} max|Δ| = ${m.toExponential(3)}`));
    console.log("     cause: 0.13.0's timingFunctions carried analytic in/out curves; 4.0.0 keeps only the");
    console.log("     in-out arms in DIRECT_EASINGS (src/easing.ts:113-132) and falls through to the");
    console.log("     cubic-bezier PRESETS table (src/easing.ts:62-92) for the rest.");
} else console.log("ok   leg3: no curve drift");

console.log(red ? `\nRED — ${red}/3 legs failing` : "\nGREEN");
process.exit(red ? 1 : 0);
