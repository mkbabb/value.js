#!/usr/bin/env node
// V-D11 · R-2 (X realization): the fourier drift instrument at the SUBPATH
// surface. The 0.13-era probe (`docs/tranches/V/megatranche/audit/probes/
// fourier-value-import-drift.mjs`, E-3: never edited) imports a root
// `dist/value.js` that 4.x does not ship, so it exits ERR_MODULE_NOT_FOUND.
// This file reads the published subpaths instead.
//
//   node scripts/probes/drift-subpath.mjs <unpacked value.js package dir> <unpacked 0.13.0 package dir>
//
// Leg 1  the registry coordinate: name@version and the exports keys; fourier's
//        consumed subpaths (./color ./value ./css ./easing) all resolve.
// Leg 2  `timingFunctions` (0.13's export) is absent and `easing(name)` is the
//        successor (recorded, not a drift: 4.0.0 ruled it).
// Leg 3  curve drift: fourier's 22 EASING_LABELS names through `easing(name)`
//        against 0.13.0's `timingFunctions`, max|Δ| < 1e-3 over 1001 samples.
// Exit 0 when legs 1 and 3 hold.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [VALUE, OLD] = process.argv.slice(2);
if (!VALUE || !OLD) {
    console.error("usage: drift-subpath.mjs <value pkg dir> <0.13.0 pkg dir>");
    process.exit(2);
}
let red = 0;
const pkg = JSON.parse(readFileSync(join(VALUE, "package.json"), "utf8"));
const subpaths = ["./color", "./value", "./css", "./easing"];
const resolved = {};
for (const sp of subpaths) {
    const target = pkg.exports?.[sp]?.import;
    if (!target) { red++; console.log(`RED  leg1: ${sp} not exported`); continue; }
    const mod = await import(pathToFileURL(join(VALUE, target)).href);
    resolved[sp] = Object.keys(mod).length;
}
console.log(`ok   leg1: ${pkg.name}@${pkg.version} · exports [${Object.keys(pkg.exports).join(", ")}] · ${subpaths.map((s) => `${s}=${resolved[s] ?? "—"}`).join(" ")}`);

const easing = await import(pathToFileURL(join(VALUE, pkg.exports["./easing"].import)).href);
console.log(`info leg2: timingFunctions ${"timingFunctions" in easing ? "PRESENT" : "absent"}; easing(name) ${typeof easing.easing === "function" ? "present" : "ABSENT"}`);
if (typeof easing.easing !== "function") red++;

const NAMES = ["linear", "ease-in", "ease-out", "ease-in-out", "ease-in-back", "ease-out-back", "ease-in-out-back",
    "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic",
    "ease-in-sine", "ease-out-sine", "ease-in-out-sine", "ease-in-expo", "ease-out-expo", "ease-in-out-expo",
    "ease-in-circ", "ease-out-circ", "ease-in-out-circ"];
const old = await import(pathToFileURL(join(OLD, "dist/value.js")).href);
const S = Array.from({ length: 1001 }, (_, i) => i / 1000);
let worst = 0;
const drift = [];
for (const n of NAMES) {
    const r = easing.easing(n);
    if (!r.ok) { drift.push([n, Infinity]); continue; }
    let m = 0;
    for (const t of S) m = Math.max(m, Math.abs(old.timingFunctions[n](t) - r.value(t)));
    worst = Math.max(worst, m);
    if (m >= 1e-3) drift.push([n, m]);
}
if (drift.length) {
    red++;
    console.log(`RED  leg3: ${drift.length}/22 names drift (max|Δ| ≥ 1e-3): ${drift.map(([n, m]) => `${n}=${m.toExponential(3)}`).join(" ")}`);
} else console.log(`ok   leg3: no curve drift over 22 names (worst max|Δ| = ${worst.toExponential(3)})`);
console.log(red ? `RED — ${red} failing` : `GREEN @ ${pkg.version}`);
process.exit(red ? 1 : 0);
