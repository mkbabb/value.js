#!/usr/bin/env node
// proof:subpath-resolve — value.js O.W2 gate. Asserts each of the 7 subpath
// `exports` targets exists after build, that the package.json exports map points
// at real files, and that importing the BUILT `./color` and `./math` chunks
// yields their expected symbols (Color from ./color, a math fn from ./math).
//
// Born-RED on today's tree: no subpath exports in package.json; dist chunks
// don't exist.

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFileSync, existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const results = [];
const record = (id, label, fn) =>
    Promise.resolve()
        .then(fn)
        .then(() => {
            results.push({ id, ok: true });
            console.log(`  PASS  ${id}  ${label}`);
        })
        .catch((e) => {
            results.push({ id, ok: false });
            console.log(`  FAIL  ${id}  ${label}`);
            console.log(`        ${e?.message ?? e}`);
        });
const assert = (cond, msg) => {
    if (!cond) throw new Error(msg);
};

console.log("proof:subpath-resolve — exports map targets + symbol resolution\n");

const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const SUBPATHS = [
    "color",
    "parsing",
    "math",
    "easing",
    "transform",
    "units",
    "quantize",
];

// R1 — exports map carries all 7 subpaths + "." unchanged.
await record("R1", "exports map has '.' + all 7 subpaths", () => {
    assert(pkg.exports["."], "exports['.'] missing");
    assert(
        pkg.exports["."].import === "./dist/value.js",
        "exports['.'].import is not ./dist/value.js (BC broken)",
    );
    for (const sp of SUBPATHS) {
        assert(pkg.exports[`./${sp}`], `exports['./${sp}'] missing`);
    }
});

// R2 — every exports target file exists on disk (import + types).
await record("R2", "every exports target resolves to a real file", () => {
    for (const [key, ent] of Object.entries(pkg.exports)) {
        for (const field of ["import", "types", "default"]) {
            const rel = ent[field];
            if (!rel) continue;
            assert(
                existsSync(resolve(root, rel)),
                `exports['${key}'].${field} → ${rel} does not exist (build first)`,
            );
        }
    }
});

// R3 — importing the built ./color yields Color (+ the color-name registry).
await record("R3", "built ./color exports Color + registerColorNames", async () => {
    const m = await import(resolve(root, "dist/subpaths/color.js"));
    assert(typeof m.Color === "function", "./color did not export Color");
    assert(
        typeof m.registerColorNames === "function",
        "./color did not export registerColorNames",
    );
    assert(typeof m.mixColors === "function", "./color did not export mixColors");
});

// R4 — importing the built ./math yields a math fn.
await record("R4", "built ./math exports lerp/clamp/scale", async () => {
    const m = await import(resolve(root, "dist/subpaths/math.js"));
    for (const fn of ["lerp", "clamp", "scale"]) {
        assert(typeof m[fn] === "function", `./math did not export ${fn}`);
    }
    assert(m.lerp(0, 10, 0.5) === 5, "./math lerp produced wrong result");
});

// R5 — ./units and ./parsing import without throwing + carry key symbols.
await record("R5", "built ./units + ./parsing resolve their key symbols", async () => {
    const u = await import(resolve(root, "dist/subpaths/units.js"));
    assert(typeof u.ValueUnit === "function", "./units lost ValueUnit");
    const p = await import(resolve(root, "dist/subpaths/parsing.js"));
    assert(typeof p.parseCSSValue === "function", "./parsing lost parseCSSValue");
});

const failed = results.filter((r) => !r.ok);
console.log(
    `\nproof:subpath-resolve — ${results.length - failed.length}/${results.length} clauses passed`,
);
if (failed.length) {
    console.error(`\nGATE RED: ${failed.length} clause(s) failed`);
    process.exit(1);
}
console.log("GATE GREEN: all 7 subpaths resolve with their expected symbols");
