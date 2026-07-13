#!/usr/bin/env node
// proof:css-parity — value.js O.W0 born-RED gate.
//
// Exercises the REAL parser/serializer over the BUILT artifact (dist/value.js)
// and asserts the REAL runtime observables for the three O.W0 breaches:
//
//   S1 — linear-gradient(red, blue) does NOT throw and yields a FunctionValue
//        named "linear-gradient" with two Color children (no-direction crash).
//   S2 — parseCSSStylesheet(".a { .b { color: red; } }") does NOT throw and
//        captures the outer .a rule (CSS Nesting crash).
//   S3 — parseCSSValue("linear(0, 0.5 50%, 1)").toString() === the spec form
//        (position hint space-separated, not comma-separated).
//
// This gate reads the BUILT dist (not source) — rebuild before running it. It
// does NOT catch-and-swallow the crashes: a swallowed throw would still fail the
// structural assertions (named FunctionValue / Color children / outer rule).
// It does NOT hard-code the toString output beyond the spec-correct string.

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

const { parseCSSValue, parseCSSStylesheet } = mod;

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

// ── S1: linear-gradient no-direction does not crash; FunctionValue + 2 colors ──
record("S1", "linear-gradient(red, blue) parses to FunctionValue w/ 2 Color children", () => {
    const g = parseCSSValue("linear-gradient(red, blue)"); // throws on born-RED
    assert(g != null, "parseCSSValue returned null");
    assert(
        g.name === "linear-gradient",
        `expected name "linear-gradient", got "${g?.name}"`,
    );
    assert(Array.isArray(g.values), "FunctionValue.values is not an array");
    const colors = g.values.filter((v) => v?.unit === "color");
    assert(
        colors.length === 2,
        `expected exactly two Color children, got ${colors.length}`,
    );
    // The Color child must carry a real Color value (not a swallowed stub).
    if (mod.Color) {
        assert(
            colors.every((c) => c.value instanceof mod.Color),
            "a Color child's value is not a Color instance",
        );
    }
});

// ── S1 regression: direction-first form still works ──
record("S1-reg", "linear-gradient(to right, red, blue) (direction-first) unaffected", () => {
    const g = parseCSSValue("linear-gradient(to right, red, blue)");
    assert(g?.name === "linear-gradient", "direction-first gradient name wrong");
    // direction (an angle) + two colors = 3 values
    assert(g.values.length === 3, `direction-first arity: got ${g.values.length}`);
});

// ── C7: radial-gradient family no-direction also does not crash ──
record("C7", "radial-gradient(circle, red, blue) does not throw", () => {
    const g = parseCSSValue("radial-gradient(circle, red, blue)");
    assert(g?.name === "radial-gradient", "radial-gradient name wrong");
});

// ── S2: CSS nesting does not crash; outer rule preserved ──
record("S2", '".a { .b { color: red; } }" parses; outer .a style rule preserved', () => {
    const ss = parseCSSStylesheet(".a { .b { color: red; } }"); // throws on born-RED
    assert(Array.isArray(ss), "parseCSSStylesheet did not return an array");
    const outer = ss.find((i) => i.kind === "style" && i.selectors.includes(".a"));
    assert(outer != null, 'no kind:"style" item with selector ".a"');
    // The nested rule must be captured as a child (the preferred fuller fix), not lost.
    assert(
        Array.isArray(outer.children) && outer.children.length === 1,
        "nested .b rule not captured as a child of .a",
    );
    const child = outer.children[0];
    assert(
        child.kind === "style" && child.selectors.includes(".b"),
        "nested child is not the .b style rule",
    );
});

// ── S2 regression: non-nested stylesheet unaffected ──
record("S2-reg", '".a { color: blue; }" (non-nested) unaffected', () => {
    const ss = parseCSSStylesheet(".a { color: blue; }");
    const item = ss.find((i) => i.kind === "style" && i.selectors.includes(".a"));
    assert(item != null, "non-nested .a rule missing");
    assert(item.declarations.length === 1, "non-nested declaration lost");
    // children must be absent (or empty) on a non-nested rule.
    assert(
        item.children == null || item.children.length === 0,
        "non-nested rule unexpectedly carries children",
    );
});

// ── C8: @keyframes unaffected ──
record("C8", "@keyframes stylesheet unaffected", () => {
    const ss = parseCSSStylesheet(
        "@keyframes fade { from { opacity: 0; } to { opacity: 1; } }",
    );
    assert(
        ss.some((i) => i.kind === "keyframes"),
        "@keyframes item missing",
    );
});

// ── S3: linear() position-hint space-separated ──
record("S3", 'parseCSSValue("linear(0, 0.5 50%, 1)").toString() round-trips spec form', () => {
    const out = parseCSSValue("linear(0, 0.5 50%, 1)").toString();
    assert(
        out === "linear(0, 0.5 50%, 1)",
        `expected "linear(0, 0.5 50%, 1)", got "${out}"`,
    );
});

// ── S3 regression: linear() without hints unaffected ──
record("S3-reg", 'parseCSSValue("linear(0, 1)").toString() unaffected', () => {
    const out = parseCSSValue("linear(0, 1)").toString();
    assert(out === "linear(0, 1)", `expected "linear(0, 1)", got "${out}"`);
});

// ── Report ──
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
    console.log(`proof:css-parity GREEN — ${results.length}/${results.length} clauses pass`);
    process.exit(0);
} else {
    console.log(`proof:css-parity RED — ${failed}/${results.length} clauses failed`);
    process.exit(1);
}
