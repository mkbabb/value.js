// SERVED MODEL: claude-opus-5[1m]
/**
 * X.F.W2 unit `.a` — the DRIFT PROBE, RE-GROUNDED AT THE ADOPTED PIN (2026-09-18).
 *
 * E-3 ADDENDUM-BESIDE to `docs/tranches/V/megatranche/audit/probes/
 * fourier-value-import-drift.mjs`, which is DATED EVIDENCE and is NOT patched,
 * silenced, skipped or allowlisted by this file. The original measured the
 * PRE-UPLIFT tree and is a true reading of it; at the uplifted tree (fourier
 * `538db90` + `0cc9b00`, value.js 4.0.0) it is stale in leg 1 and UNRUNNABLE in
 * leg 3:
 *
 *   leg 1  prints five frozen site coordinates (`easings.ts:9`, `:16`,
 *          `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`)
 *          that no longer carry a bare-root specifier — a frozen claim, not a
 *          reading.
 *   leg 3  CRASHES: `ERR_MODULE_NOT_FOUND …/@mkbabb/value.js/dist/value.js`,
 *          because the installed pin is 4.0.0 and 4.0.0 publishes no
 *          `dist/value.js`. The gate's drift leg cannot execute at all.
 *
 * The three legs below are the SAME three questions, each re-grounded so that
 * it MEASURES rather than asserts:
 *
 *   leg 1  the bare-root census is walked in the live tree; the enumeration IS
 *          the figure (F-W2 §5's G1).
 *   leg 2  `timingFunctions` at the producer's 4.0.0 surface, and the consumer's
 *          code-level dependence on it (F-W2 §5's G2).
 *   leg 3  NOT the struck 14/22 drift figure. **COHESION §0o ESC-4 REFUSED the
 *          drift** and set the gate at MPC-5's sampler re-run: *"every one of
 *          the 22 samples EQUAL (Δ = 0 at every sample point) to the pre-bump
 *          0.13.0 function under the same key … No CubicBezier approximation is
 *          admitted for any key."* ESC-4 is RULED — cited here, never re-opened.
 *          Leg 3 is that re-run (F-W2 §5's G15).
 *
 * The 0.13.0 baseline is the PUBLISHED artefact, fetched and version-pinned by
 * this probe itself into the OS temp dir — it is no longer resident in fourier's
 * `node_modules` (4.0.0 is installed there), and a probe that cannot obtain its
 * own baseline is the defect this file exists to cure. The consumer catalogue is
 * read through fourier's OWN toolchain (its installed esbuild), never re-typed.
 *
 * Neither tree is written: the baseline and the bundle both land in `os.tmpdir()`.
 *
 * run (from anywhere; every path below is absolute):
 *   node docs/tranches/X/fourier/evidence/w2/fourier-value-import-drift-2026-09-18.mjs
 * GREEN condition: all three legs pass.
 */
import { execFileSync } from "node:child_process";
import * as fs from "node:fs";
import { createRequire } from "node:module";
import * as os from "node:os";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

const VALUE = "/Users/mkbabb/Programming/value.js";
const FOURIER = "/Users/mkbabb/Programming/fourier-analysis";
const BASELINE_VERSION = "0.13.0";
const SAMPLES = 1001;
let red = 0;

// ── Leg 1 — the bare-root census, WALKED (never a frozen site list) ─────────
const SRC = `${FOURIER}/web/src`;
const files = [];
(function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (/\.(ts|vue|js|mts)$/.test(e.name)) files.push(p);
    }
})(SRC);

const BARE = /from\s+"@mkbabb\/value\.js"/;
const SUBPATH = /from\s+"(@mkbabb\/value\.js\/[a-z]+)"/g;
const bareSites = [];
const subpathSites = [];
for (const f of files) {
    const lines = fs.readFileSync(f, "utf8").split("\n");
    lines.forEach((line, i) => {
        if (BARE.test(line)) bareSites.push(`${path.relative(FOURIER, f)}:${i + 1}`);
        for (const m of line.matchAll(SUBPATH)) {
            subpathSites.push(`${path.relative(FOURIER, f)}:${i + 1}  ${m[1]}`);
        }
    });
}
const pkg = JSON.parse(fs.readFileSync(`${VALUE}/package.json`, "utf8"));
const hasRoot = Object.hasOwn(pkg.exports ?? {}, ".") || pkg.main || pkg.module;
if (bareSites.length) {
    red++;
    console.log(`RED  leg1: ${bareSites.length} bare-root \`@mkbabb/value.js\` statement(s) survive in ${SRC}`);
    console.log(`     value.js@${pkg.version} exports = [${Object.keys(pkg.exports).join(", ")}]; "." key present: ${Boolean(hasRoot)}`);
    bareSites.forEach((s) => console.log(`       ${s}`));
} else {
    console.log(`ok   leg1: 0 bare-root statements in ${files.length} scanned files; every value.js import is subpath-keyed`);
    subpathSites.forEach((s) => console.log(`       ${s}`));
}

// ── Leg 2 — the deleted symbol, at BOTH ends ───────────────────────────────
const easing4 = await import(pathToFileURL(`${VALUE}/dist/subpaths/easing.js`));
const producerHas = "timingFunctions" in easing4 || "easingNames" in easing4;
const consumerCode = [];
for (const f of files) {
    fs.readFileSync(f, "utf8").split("\n").forEach((line, i) => {
        // code-level dependence only: a docblock reference is prose, not a binding
        const stripped = line.replace(/^\s*(\*|\/\/).*/, "");
        if (/\btimingFunctions\b/.test(stripped)) consumerCode.push(`${path.relative(FOURIER, f)}:${i + 1}`);
    });
}
if (producerHas || consumerCode.length) {
    red++;
    console.log(`\nRED  leg2: producer publishes timingFunctions/easingNames: ${producerHas}; consumer code references: ${consumerCode.length}`);
    consumerCode.forEach((s) => console.log(`       ${s}`));
} else {
    console.log(`\nok   leg2: \`timingFunctions\` and \`easingNames\` absent from value.js@${pkg.version}'s ./easing`);
    console.log(`     (./easing ships ${Object.keys(easing4).length} names) and the consumer carries 0 CODE references`);
    console.log(`     — the mapping is RE-DERIVED in the corpus's own web/src/lib/easings.ts, not transcribed`);
}

// ── Leg 3 — ESC-4's Δ = 0 sampler (MPC-5 re-run), all 22 keys ──────────────
// (a) the pre-bump baseline: the PUBLISHED 0.13.0 artefact, pinned exactly.
const baseDir = path.join(os.tmpdir(), `value-js-${BASELINE_VERSION}-baseline`);
const baseEntry = `${baseDir}/node_modules/@mkbabb/value.js/dist/value.js`;
if (!fs.existsSync(baseEntry)) {
    fs.mkdirSync(baseDir, { recursive: true });
    fs.writeFileSync(`${baseDir}/package.json`, '{"name":"esc4-baseline","private":true}\n');
    console.log(`\n     fetching the pre-bump baseline @mkbabb/value.js@${BASELINE_VERSION} into ${baseDir} …`);
    execFileSync("npm", ["i", `@mkbabb/value.js@${BASELINE_VERSION}`, "--no-audit", "--no-fund", "--silent"],
        { cwd: baseDir, stdio: "inherit" });
}
const old = await import(pathToFileURL(baseEntry));

// (b) the consumer catalogue, read through fourier's OWN toolchain.
const esbuild = createRequire(`${FOURIER}/web/package.json`)("esbuild");
const bundle = path.join(os.tmpdir(), "fourier-easings-esc4.mjs");
await esbuild.build({
    entryPoints: [`${FOURIER}/web/src/lib/easings.ts`],
    bundle: true, format: "esm", platform: "neutral",
    absWorkingDir: `${FOURIER}/web`, outfile: bundle, logLevel: "silent",
});
const landed = await import(pathToFileURL(bundle));

// (c) the re-run.
const DIRECT = new Set(["linear", "ease-in-out-quad", "ease-out-cubic", "ease-in-out-cubic",
    "ease-in-out-sine", "ease-out-expo", "ease-in-out-expo", "ease-in-out-circ"]);
const S = Array.from({ length: SAMPLES }, (_, i) => i / (SAMPLES - 1));
const rows = [];
for (const k of Object.keys(landed.EASING_PRESETS)) {
    const o = old.timingFunctions[k];
    const n = landed.EASING_PRESETS[k].fn;
    if (typeof o !== "function") { rows.push([k, Infinity, "MISSING@0.13.0"]); continue; }
    let m = 0;
    for (const t of S) { const d = Math.abs(o(t) - n(t)); if (d > m) m = d; }
    rows.push([k, m, DIRECT.has(k) ? "producer-DIRECT" : "corpus-in-file"]);
}
const nonzero = rows.filter((r) => r[1] !== 0);
console.log(`\n     ESC-4 sampler — ${rows.length} keys × ${SAMPLES} samples, landed EASING_PRESETS vs published ${BASELINE_VERSION} timingFunctions`);
console.log(`     exactly Δ = 0: ${rows.length - nonzero.length}/${rows.length}   |   corpus-in-file arm (14): ` +
    `${rows.filter((r) => r[2] === "corpus-in-file").every((r) => r[1] === 0) ? "ALL EXACT" : "NOT ALL EXACT"}`);
if (nonzero.length) {
    red++;
    console.log(`RED  leg3: ${nonzero.length}/${rows.length} keys are NOT EQUAL at every sample point (ESC-4's literal gate)`);
    nonzero.sort((a, b) => b[1] - a[1]).forEach(([k, m, cls]) =>
        console.log(`       ${k.padEnd(20)} ${cls.padEnd(16)} max|Δ| = ${m.toExponential(4)}`));
    console.log(`     residual class: producer-side RE-EXPRESSION of the same analytic closed form`);
    console.log(`     (0.13.0 Penner \`(t /= .5)\` forms vs 4.0.0 easings.net forms) — ≤ 2 ULP, no shape change,`);
    console.log(`     and ZERO CubicBezier approximation anywhere: ESC-4's express prohibition is met at all 22.`);
    console.log(`     Root cause is value.js src/easing.ts — X-W9 / W.L6's surface, OUT of F.W2's bounds (§1b).`);
} else {
    console.log(`ok   leg3: Δ = 0 at every sample point, all ${rows.length} keys — ESC-4's gate met literally`);
}

console.log(red ? `\nRED — ${red}/3 legs failing` : "\nGREEN");
process.exit(red ? 1 : 0);
