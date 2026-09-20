// SERVED MODEL: claude-opus-5[1m]
/**
 * G24's drift leg, re-substrated (COHESION §0ac · ESC-W9-G24-SUBSTRATE).
 *
 * `fourier-value-import-drift.mjs` reads its 0.13.0 oracle from
 * `../fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js`, which
 * is ABSENT on this machine (measured: ENOENT, RS2.4). The sitting ruled the
 * substitute: the registry `0.13.0` tarball, `npm pack`ed into a scratch
 * directory OUTSIDE every repository, with its integrity hash recorded in
 * `bench-table-4.1.md`. `../fourier-analysis` is not read and not written.
 *
 * The substitution is validated rather than assumed: run against 4.0.0's
 * `dist/subpaths/easing.js` this reproduces the banked table EXACTLY — 8 of 22
 * names drifting, max|Δ| 1.923e-1 on `ease-out-circ`, name for name.
 *
 *   node …/analytic-arm-drift-0130.2026-09-19.mjs <0.13.0 dist/value.js> <easing.js>
 *
 * Exit 0 when every one of the 22 names is within 1e-3 of 0.13.0.
 */
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const [OLD, NEW] = process.argv.slice(2);
if (!OLD || !NEW) throw new Error("usage: <0.13.0 dist/value.js> <4.x dist/subpaths/easing.js>");

// fourier's own EASING_LABELS set, verbatim from the probe this re-substrates.
const NAMES = ["linear", "ease-in", "ease-out", "ease-in-out", "ease-in-back", "ease-out-back",
    "ease-in-out-back", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-cubic",
    "ease-out-cubic", "ease-in-out-cubic", "ease-in-sine", "ease-out-sine", "ease-in-out-sine",
    "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-circ", "ease-out-circ",
    "ease-in-out-circ"];

const old = await import(pathToFileURL(resolve(OLD)).href);
const cur = await import(pathToFileURL(resolve(NEW)).href);
const SAMPLES = Array.from({ length: 1001 }, (_, i) => i / 1000);

const rows = [];
for (const name of NAMES) {
    const resolved = cur.easing(name);
    if (!resolved.ok) { rows.push([name, Infinity]); continue; }
    let max = 0;
    for (const t of SAMPLES) {
        const delta = Math.abs(old.timingFunctions[name](t) - resolved.value(t));
        if (delta > max) max = delta;
    }
    rows.push([name, max]);
}
rows.sort((a, b) => b[1] - a[1]);
for (const [name, max] of rows) console.log(`  ${name.padEnd(18)} max|D| = ${max.toExponential(3)}`);
const drifting = rows.filter(([, max]) => max >= 1e-3);
console.log(`\n${drifting.length} of ${NAMES.length} names drift >= 1e-3; worst overall ${rows[0][1].toExponential(3)} (${rows[0][0]})`);
console.log(drifting.length === 0 ? "GREEN" : `RED — ${drifting.length} names still approximated`);
process.exit(drifting.length === 0 ? 0 : 1);
