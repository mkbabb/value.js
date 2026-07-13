#!/usr/bin/env node
// proof:lib-correctness — value.js Tranche U (U.W-LIB) born-RED gate mirror.
//
// The test:dist discharge of the born-RED slate `test/tranche-u-lib.test.ts`
// (the DEFERRED row the slate author booked at authorship): the now-GREEN
// BEHAVIORAL legs re-asserted against the BUILT artifact (dist/value.js), so a
// dist-level regression of any U.W-LIB cure is caught in CI without the vitest
// source harness. Each clause guards ONE cured defect confirmed shipping in
// published 3.1.0.
//
// Behavioral legs only (the two SOURCE-TREE census gates — LIB-G6's raw-reader
// re-enumeration and LIB-G12's {from}2{to} naming scan — read src/, not the
// artifact, so they stay in the vitest slate; there is no dist behavior to
// mirror). Governing verdicts: docs/tranches/U/audit/w-lib/DECISION.md.
//
//   G1  — parseCSSValue must not SILENTLY truncate trailing tokens (U-F29:
//         loud-fail — a typed CSSParseError throw — OR full-value retention).
//   G2  — color-mix serializes PHYSICAL-range CSS, not leaked [0,1] (U-F30).
//   G3  — relative-color serializes physical, and calc evaluates on physical
//         bindings (U-F30 composite: normalize-on-construct).
//   G4  — GUARD: the direct-parse path is UNCHANGED (the R-2 double-denorm
//         tripwire — physical channels round-trip verbatim).
//   G5  — a re-fed color-mix does not double-normalize (glass-ui's colorUnit2
//         pipeline: physical 76.5 → 76.5/255 = 0.3, not 0.3 → 0.00118).
//   G7  — single-arg transforms respect axis cardinality (U-F31).
//   G8  — forward trig sin/cos/tan resolve UNITLESS (U-F32).
//   G9  — positioned gradient stops round-trip to valid space-joined CSS (U-F33).
//   G10 — dispatch exposes RAW out-of-gamut channels via { gamut: 'raw' } (U-F74).
//   G11 — decompose/recompose 2D round-trips + 2D-aware interpolate (U-F35).
//
// Exercises the REAL parser/serializer/dispatch over dist/value.js. Run
// `npm run build` first.

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

const {
    parseCSSValue,
    parseCSSColor,
    normalizeColorUnit,
    evaluateMathFunction,
    color2,
    DisplayP3Color,
    decomposeMatrix2D,
    recomposeMatrix2D,
    interpolateDecomposed,
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
const assertEq = (actual, expected, ctx) => {
    if (actual !== expected) {
        throw new Error(`${ctx}: "${actual}", expected "${expected}"`);
    }
};

console.log("proof:lib-correctness — the U.W-LIB born-RED slate, mirrored to dist\n");

// G1 — no silent truncation. Cure-shape-agnostic: a LOUD-FAIL throw OR a
// full-value retention both clear "no silent drop"; the bare first token does not.
const noSilentDrop = (input, banned, mustInclude) => {
    let out;
    let threw = false;
    try {
        out = parseCSSValue(input).toString();
    } catch {
        threw = true;
    }
    if (threw) return; // loud-fail cure
    assert(out !== banned, `"${input}" silently truncated to "${out}"`);
    for (const tok of mustInclude) {
        assert(out.includes(tok), `"${input}" dropped "${tok}" (got "${out}")`);
    }
};

record("G1", "parseCSSValue does not silently truncate trailing tokens", () => {
    noSilentDrop("1px solid red", "1px", ["solid", "red"]);
    noSilentDrop("0 0 4px red", "0", ["4px"]);
    noSilentDrop("translate(10px) rotate(45deg)", null, ["rotate"]);
});

record("G2", "color-mix serializes physical-range CSS (rgb 76.5 0 178.5)", () => {
    assertEq(
        parseCSSColor("color-mix(in srgb, red 30%, blue)").toString(),
        "rgb(76.5 0 178.5)",
        "color-mix(in srgb, red 30%, blue)",
    );
});

record("G3", "relative-color serializes physical; calc on physical bindings", () => {
    assertEq(
        parseCSSColor("rgb(from red r g b)").toString(),
        "rgb(255 0 0)",
        "rgb(from red r g b)",
    );
    assertEq(
        parseCSSColor("rgb(from red calc(r + 10) g b)").toString(),
        "rgb(265 0 0)",
        "rgb(from red calc(r + 10) g b)",
    );
});

record("G4", "GUARD — direct-parse path unchanged (physical verbatim)", () => {
    assertEq(
        parseCSSColor("rgb(76.5 0 178.5)").toString(),
        "rgb(76.5 0 178.5)",
        "rgb(76.5 0 178.5)",
    );
    assertEq(
        parseCSSColor("rgb(255 0 0)").toString(),
        "rgb(255 0 0)",
        "rgb(255 0 0)",
    );
});

record("G5", "re-fed color-mix does not double-normalize (r ≈ 0.3)", () => {
    const mixed = parseCSSColor("color-mix(in srgb, red 30%, blue)");
    const renorm = normalizeColorUnit(mixed);
    const r = Number(renorm.value.entries().find(([k]) => k === "r")[1]);
    assert(
        Math.abs(r - 0.3) < 0.01,
        `re-fed r = ${r}, expected ≈ 0.3 (double-normalize would give ≈ 0.00118)`,
    );
});

record("G7", "single-arg transforms respect axis cardinality", () => {
    const rot = parseCSSValue("rotate(45deg)").toString();
    assertEq(rot, "rotateZ(45deg)", "rotate(45deg)");
    assert(!rot.includes("rotateX") && !rot.includes("rotateY"), `rotate fanned out: ${rot}`);
    const scl = parseCSSValue("scale(2)").toString();
    assert(!scl.includes("scaleZ"), `scale(2) grew a scaleZ: ${scl}`);
    const tr = parseCSSValue("translate(10px)").toString();
    assert(
        !tr.includes("translateZ") && !tr.includes("translateY(10px)"),
        `translate(10px) pushed onto Y/Z: ${tr}`,
    );
});

record("G8", "forward trig sin/cos/tan resolve unitless", () => {
    const s = evaluateMathFunction(parseCSSValue("sin(30deg)"));
    assert(s != null, "evaluateMathFunction(sin(30deg)) is null");
    assert(Math.abs(s.value - 0.5) < 1e-9, `sin(30deg) value = ${s.value}, expected 0.5`);
    assert(
        s.unit === "" || s.unit == null,
        `sin(30deg) carried a unit "${s.unit}" (must be unitless)`,
    );
    const c = evaluateMathFunction(parseCSSValue("calc(sin(30deg)*100px)"));
    assert(c != null, "calc(sin(30deg)*100px) is null");
    assert(Math.abs(c.value - 50) < 1e-6, `calc value = ${c.value}, expected 50`);
    assertEq(c.unit, "px", "calc(sin(30deg)*100px) unit");
});

record("G9", "positioned gradient stops round-trip to valid space-joined CSS", () => {
    assertEq(
        parseCSSValue("linear-gradient(90deg, red 20%, blue 80%)").toString(),
        "linear-gradient(90deg, rgb(255 0 0) 20%, rgb(0 0 255) 80%)",
        "linear-gradient(90deg, red 20%, blue 80%)",
    );
});

record("G10", "dispatch exposes raw out-of-gamut channels via { gamut: 'raw' }", () => {
    const p3green = new DisplayP3Color(0, 1, 0); // out of sRGB gamut
    const raw = color2(p3green, "rgb", { gamut: "raw" });
    const channels = raw
        .entries()
        .filter(([k]) => k !== "alpha")
        .map(([, v]) => Number(v));
    const hasOOB = channels.some((c) => c < -1e-6 || c > 1 + 1e-6);
    assert(hasOOB, `no OOB channel reported: [${channels.join(", ")}]`);
});

record("G11", "decompose/recompose 2D round-trips + 2D-aware interpolate", () => {
    const M = [2, 0, 0, 3, 10, 20]; // scale(2,3) translate(10,20)
    const back = recomposeMatrix2D(decomposeMatrix2D(...M));
    assertEq(back.length, 6, "recomposeMatrix2D result length");
    for (let i = 0; i < 6; i++) {
        assert(
            Math.abs(back[i] - M[i]) < 1e-6,
            `recompose[${i}] = ${back[i]}, expected ${M[i]}`,
        );
    }
    const a = decomposeMatrix2D(1, 0, 0, 1, 0, 0);
    const b = decomposeMatrix2D(1, 0, 0, 1, 10, 0);
    const mid = interpolateDecomposed(a, b, 0.5);
    assert(
        typeof mid.translateX === "number" && !Number.isNaN(mid.translateX),
        `interpolateDecomposed 2D translateX = ${mid.translateX}`,
    );
    assert(
        Math.abs(mid.translateX - 5) < 1e-6,
        `interpolated translateX = ${mid.translateX}, expected 5`,
    );
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
        `proof:lib-correctness GREEN — ${results.length}/${results.length} clauses pass (U.W-LIB cures hold)`,
    );
    process.exit(0);
} else {
    console.log(
        `proof:lib-correctness RED — ${failed}/${results.length} clauses fail`,
    );
    process.exit(1);
}
