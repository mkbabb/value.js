#!/usr/bin/env node
/**
 * Verifies dist/ dts emission is at the flat layout (post-W12-unblocker e1549e0).
 *
 * - dist/index.d.ts MUST exist (the public barrel typings; matches
 *   package.json "types" + exports["."].types).
 * - dist/units/, dist/parsing/, etc. dirs may exist with per-subdir dts.
 * - dist/src/ MUST NOT exist (regression to per-source emission).
 *
 * Exit 0 on PASS; exit 1 with diagnostic on FAIL.
 *
 * Added at F.W3 Lane D (regression guard for the W12-unblocker fix).
 */
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(import.meta.dirname, "../dist");
const errors = [];

if (!fs.existsSync(path.join(dist, "index.d.ts"))) {
    errors.push("dist/index.d.ts MISSING (W12-unblocker regression)");
}
if (fs.existsSync(path.join(dist, "src"))) {
    errors.push("dist/src/ PRESENT (W12-unblocker regression — should be flat)");
}

if (errors.length > 0) {
    console.error("[proof:dts-layout] FAIL");
    errors.forEach((e) => console.error("  - " + e));
    process.exit(1);
}
console.log("[proof:dts-layout] PASS — flat dist/ dts emission");
