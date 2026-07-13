#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// proof:dts-surface — the published `.d.ts` surface gate (U.W-ORACLE · U-F43).
//
// MOVED here (never deleted) from `test/dts-published-surface.test.ts`, which
// ran a full `npm run build` inside a vitest `beforeAll` for these two string
// checks — ~70–80% of the unit-suite wall time. This gate's home is the CI-wired
// `test:dist` slate (`package.json`), where `npm run build` ALREADY runs as the
// slate's FIRST step, so the check reads the FRESH dist for FREE — no second
// build, and the vitest unit suite becomes build-free (G-ORACLE-4).
//
// THE CHECK (R.W1.3, verbatim intent): a fresh build must carry the
// `extractFunctions` walker (VJ-CSS1, shipped since 1.1.0) into BOTH published
// declaration files — the root barrel (`src/index.ts`) and the
// `@mkbabb/value.js/parsing` subpath barrel (`src/subpaths/parsing.ts`). This
// locks the type surface against silently losing the export while source imports
// keep passing (the pass-2 "dist-only" scare — refuted, and locked here).
//
// Run standalone as `node scripts/gates/proof-dts-surface.mjs` AFTER a build, or
// (canonically) as part of `npm run test:dist`, which builds first.
// ─────────────────────────────────────────────────────────────────────────────

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const SYMBOL = "extractFunctions";
const CHECKS = [
    {
        file: "dist/index.d.ts",
        label: "root barrel (src/index.ts)",
    },
    {
        file: "dist/subpaths/parsing.d.ts",
        label: "parsing subpath barrel (src/subpaths/parsing.ts)",
    },
];

const failures = [];
for (const { file, label } of CHECKS) {
    const abs = path.join(ROOT, file);
    if (!existsSync(abs)) {
        failures.push(
            `${file} is missing — did the build run? (test:dist builds first; ` +
                `standalone, run \`npm run build\` before this gate). [${label}]`,
        );
        continue;
    }
    const dts = readFileSync(abs, "utf8");
    if (!dts.includes(SYMBOL)) {
        failures.push(
            `${file} no longer exports \`${SYMBOL}\` — the published type ` +
                `surface silently dropped it. [${label}]`,
        );
    } else {
        console.log(`[proof:dts-surface] OK  ${file} exports ${SYMBOL} (${label})`);
    }
}

if (failures.length > 0) {
    console.error("\n[proof:dts-surface] FAILED:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
}

console.log("[proof:dts-surface] PASS — the published .d.ts surface carries the walker.");
