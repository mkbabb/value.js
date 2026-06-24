#!/usr/bin/env node
// proof:grammar-q — value.js Tranche Q (VJ-Q6 + VJ-Q7, 1.2.0) born-RED gate.
//
// THE REAL OBSERVABLES (over the BUILT dist/value.js):
//   VJ-Q6 — the DASHED-FUNCTION call arm: `--ident(args)` parses to
//           `FunctionValue('--ident', [args])` (1.1.0 dropped it to a verbatim
//           string because `scanIdentFast` rejects the second dash). Plus the
//           `<syntax>` validator is reachable on the public resolve surface.
//   VJ-Q7 — `if()` MULTIBRANCH: the FULL ordered clause list, not the lossy
//           first-consequent + first-else collapse (1.1.0 dropped the middle).
//
// Run `npm run build` first.
//
//   C1 — --double(2, 3px) → FunctionValue('--double', [2, 3px]).
//   C2 — -infinity / single-dash math constants UNAFFECTED (non-regressive).
//   C3 — the <syntax> validator coerces typed args (validateSyntax/coerceToSyntax).
//   C4 — if(3-branch) emits all 3 branches (5 flat slots), round-trip-stable.
//   C5 — if(2-branch) is byte-identical to the prior 3-slot collapse.

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = resolve(__dirname, "..", "dist", "value.js");

let mod;
try {
    mod = await import(distPath);
} catch (e) {
    console.error(`FATAL: cannot import built dist at ${distPath}`);
    console.error(`  ${e?.stack ?? e}`);
    console.error("  Run `npm run build` first — this gate reads the artifact.");
    process.exit(1);
}

const { parseCSSValue, FunctionValue, validateSyntax, coerceToSyntax } = mod;

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

console.log("proof:grammar-q — VJ-Q6 dashed-call + <syntax> + VJ-Q7 if() multibranch\n");

// ── VJ-Q6 C1 — the dashed-function call arm ──
record("C1", "--double(2, 3px) parses to FunctionValue('--double', [2, 3px])", () => {
    const v = parseCSSValue("--double(2, 3px)");
    assert(v instanceof FunctionValue, `not a FunctionValue (got ${v?.constructor?.name})`);
    assert(v.name === "--double", `name = ${JSON.stringify(v.name)} (want --double)`);
    assert(v.values.length === 2, `values.length = ${v.values.length} (want 2)`);
    assert(v.values[0].toString() === "2", `arg0 = ${v.values[0].toString()}`);
    assert(v.values[1].toString() === "3px", `arg1 = ${v.values[1].toString()}`);
});

// ── VJ-Q6 C2 — single-dash math constants unaffected (non-regressive) ──
record("C2", "-infinity / calc(-infinity) unaffected by the dashed-call arm", () => {
    assert(parseCSSValue("calc(-infinity)") != null, "calc(-infinity) failed to parse");
    const inf = parseCSSValue("-infinity");
    assert(inf != null, "-infinity failed to parse");
});

// ── VJ-Q6 C3 — the <syntax> validator on the resolve path ──
record("C3", "the <syntax> validator is exposed + coerces typed args", () => {
    assert(typeof validateSyntax === "function", "validateSyntax is not exported");
    assert(typeof coerceToSyntax === "function", "coerceToSyntax is not exported");
    assert(validateSyntax("10px", "<length>") === true, "10px should match <length>");
    assert(validateSyntax("10px", "<color>") === false, "10px should NOT match <color>");
    assert(validateSyntax("red", "<color>") === true, "red should match <color>");
    assert(validateSyntax("5.5", "<integer>") === false, "5.5 should NOT match <integer>");
    assert(validateSyntax("auto", "auto | <length>") === true, "auto should match the keyword alt");
    assert(coerceToSyntax("red", "<length>") === null, "red should fail <length> coercion");
    assert(coerceToSyntax("10px", "<length>")?.toString() === "10px", "10px should coerce to <length>");
});

// ── VJ-Q7 C4 — if() multibranch emits all branches + round-trips ──
record("C4", "if(3-branch) emits all 3 branches (not the lossy 2-branch collapse)", () => {
    const input = "if(media(min-width: 100px): 1px; supports(display: grid): 2px; else: 3px)";
    const v = parseCSSValue(input);
    assert(v instanceof FunctionValue && v.name === "if", "not an if() FunctionValue");
    // 3 branches → [cond1, v1, cond2, v2, else] = 5 flat slots.
    assert(v.values.length === 5, `values.length = ${v.values.length} (want 5 — the middle branch was dropped)`);
    const out = v.toString();
    const out2 = parseCSSValue(out).toString();
    assert(out === out2, `not round-trip-stable: "${out}" vs "${out2}"`);
    assert(out.includes("supports(display: grid): 2px"), `the middle branch is missing from "${out}"`);
});

// ── VJ-Q7 C5 — the 2-branch form is byte-identical to the prior collapse ──
record("C5", "if(2-branch) stays the byte-identical 3-slot [cond, value, else]", () => {
    const v = parseCSSValue("if(media(min-width: 100px): 1px; else: 3px)");
    assert(v.values.length === 3, `values.length = ${v.values.length} (want 3)`);
    assert(
        v.toString() === "if(media(min-width: 100px): 1px; else: 3px)",
        `2-branch serialization drifted: ${v.toString()}`,
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
        `proof:grammar-q GREEN — ${results.length}/${results.length} clauses pass (VJ-Q6 + VJ-Q7 hold)`,
    );
    process.exit(0);
} else {
    console.log(`proof:grammar-q RED — ${failed}/${results.length} clauses fail`);
    process.exit(1);
}
