#!/usr/bin/env node
/**
 * CONSUMER-SURFACE COMPILE PROBE — the gate that would have caught the 4.0.0
 * public-surface defects at the cut.
 *
 * Every test in this repo resolves value.js by a DEEP `../src/...` path (19 of
 * 26 import statements in `test/`) or by a vite self-alias that rewrites the
 * specifier to a dist FILE PATH (vite.config.ts:41-50). Neither route ever asks
 * Node's exports map, and `tsc` is never run from a consumer's position. That
 * blindness is the mechanism behind MTS-09 (types unnameable from the subpath
 * that returns them), MTS-13(b) (`ColorFactory` unnameable), and FP-01 (the
 * deleted root entry that breaks fourier's five import sites).
 *
 * This probe stands OUTSIDE the repo's resolution shortcuts: it builds a throwaway
 * package whose only dependency is a symlink to this repo, then runs `tsc` and
 * Node's own resolver against it — exactly what a consumer does.
 *
 * LEG 1  types the public signatures RETURN must be nameable from the subpath
 *        that returns them.                     RED today: TS2459 x2
 * LEG 2  the root specifier `@mkbabb/value.js`. RED today: TS2307 + Node
 *        ERR_PACKAGE_PATH_NOT_EXPORTED (FP-01 — fourier's 5 sites; declaring
 *        the root retired is a legitimate GREEN, see the wave spec)
 *
 * Run: node docs/tranches/V/megatranche/audit/probes/consumer-surface-compile.mjs
 * Exit 1 while any leg is RED. L-9: measures only this repo's published surface.
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(fileURLToPath(import.meta.url), "../../../../../../..");
const TSC = path.join(REPO, "node_modules/.bin/tsc");

const LEG1 = `// LEG 1 — can a consumer NAME what the public functions hand back?
import type { CssValue } from "@mkbabb/value.js/css";
import type { ColorFactory } from "@mkbabb/value.js/color";
import { parseCssValues } from "@mkbabb/value.js/css";
export const f = (s: string): CssValue | null => {
    const r = parseCssValues(s);
    return r.ok ? r.value : null;
};
export type G = ColorFactory<"rgb">;
`;

const LEG2 = `// LEG 2 — the root specifier fourier consumes at 5 sites (FP-01)
import { easeInOutSine } from "@mkbabb/value.js";
export const x = easeInOutSine;
`;

const work = mkdtempSync(path.join(tmpdir(), "value-consumer-probe-"));
try {
    mkdirSync(path.join(work, "node_modules/@mkbabb"), { recursive: true });
    symlinkSync(REPO, path.join(work, "node_modules/@mkbabb/value.js"), "dir");
    writeFileSync(path.join(work, "package.json"), JSON.stringify({ name: "consumer-probe", private: true, type: "module" }));
    writeFileSync(path.join(work, "tsconfig.json"), JSON.stringify({
        compilerOptions: { strict: true, target: "ES2022", module: "ESNext", moduleResolution: "bundler", noEmit: true, skipLibCheck: false, types: [] },
        include: ["leg1.ts", "leg2.ts"],
    }));
    writeFileSync(path.join(work, "leg1.ts"), LEG1);
    writeFileSync(path.join(work, "leg2.ts"), LEG2);

    let out = "";
    try {
        execFileSync(TSC, ["--noEmit", "-p", "tsconfig.json"], { cwd: work, encoding: "utf8" });
    } catch (e) {
        out = String(e.stdout ?? "") + String(e.stderr ?? "");
    }

    const leg1 = out.split("\n").filter((l) => l.startsWith("leg1.ts"));
    const leg2 = out.split("\n").filter((l) => l.startsWith("leg2.ts"));

    let nodeRoot = "RESOLVED";
    try {
        execFileSync(process.execPath, ["--input-type=module", "-e", "import('@mkbabb/value.js')"], { cwd: work, encoding: "utf8", stdio: "pipe" });
    } catch (e) {
        nodeRoot = /ERR_PACKAGE_PATH_NOT_EXPORTED/.test(String(e.stderr)) ? "ERR_PACKAGE_PATH_NOT_EXPORTED" : "OTHER_FAILURE";
    }

    console.log("=== CONSUMER-SURFACE COMPILE PROBE ===\n");
    console.log(leg1.length === 0
        ? "ok   LEG1  public return types are nameable from their own subpath"
        : `RED  LEG1  ${leg1.length} public type(s) unnameable from the subpath that returns them:`);
    for (const l of leg1) console.log("       " + l);
    console.log(leg2.length === 0
        ? "ok   LEG2  root specifier `@mkbabb/value.js` type-resolves"
        : `RED  LEG2  root specifier does not type-resolve:`);
    for (const l of leg2) console.log("       " + l);
    console.log(`${nodeRoot === "RESOLVED" ? "ok  " : "RED "} LEG2  Node runtime resolution of the root specifier -> ${nodeRoot}`);
    console.log("       consumers: fourier web/src ConvergencePlot.vue:5, harmonics.ts:5,");
    console.log("       useCurveTransition.ts:8, easings.ts:9, easings.ts:16");

    const red = leg1.length + leg2.length + (nodeRoot === "RESOLVED" ? 0 : 1);
    console.log(`\n${red === 0 ? "GREEN" : "RED"} — ${red} failing assertion(s)`);
    process.exit(red === 0 ? 0 : 1);
} finally {
    rmSync(work, { recursive: true, force: true });
}
