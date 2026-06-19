#!/usr/bin/env node
// proof:round-trip-idempotent — value.js O.W5 born-RED gate (inv-O-2).
//
// The SEMANTIC-IDEMPOTENCE invariant: parse(serialize(parse(s))) ≡ parse(s)
// (value-normalized, NOT byte/CST). This gate exercises the REAL parser and
// emitter from the BUILT artifact (dist/value.js) against REAL CSS strings and
// compares the REAL parse results — it is NOT a source-grep for `join(", ")`
// absence (the proxy the spec explicitly warns against). A re-ordering of
// `toString()` branches that still emits the wrong separator fails C1; an opaque
// at-rule serializer whose output re-parses as `unknown` fails C2.
//
//   C1 — linear() stop spacing: position hints space-separated, not comma.
//   C2 — @layer recursive: survives serialize→re-parse; extractKeyframes finds it.
//   C3 — gradient round-trip stable.
//   C4 — spring() author round-trip (moderate-supersede, D6).
//   C5 — color(in oklch …) round-trip canonical + stable.
//   C6 — the vitest test/round-trip.test.ts corpus is GREEN.
//
// Reads the BUILT dist — run `npm run build` first.

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const distPath = resolve(repoRoot, "dist", "value.js");

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
    parseCSSStylesheet,
    serializeStylesheet,
    extractKeyframes,
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

// ── C1: linear() position-hint space-separated (the comma-join breach) ──
record("C1", 'linear(0, 0.5 50%, 1) → space-separated position hint', () => {
    const out = parseCSSValue("linear(0, 0.5 50%, 1)").toString();
    assert(
        out === "linear(0, 0.5 50%, 1)",
        `expected "linear(0, 0.5 50%, 1)", got "${out}"`,
    );
    // Regression guard: the no-hint form must NOT gain a stray space.
    const noHint = parseCSSValue("linear(0, 0.5, 1)").toString();
    assert(noHint === "linear(0, 0.5, 1)", `no-hint form corrupted: "${noHint}"`);
});

// ── C2: @layer recursive survives round-trip; extractKeyframes finds "fade" ──
record(
    "C2",
    "@layer base { @keyframes fade { … } } survives serialize→re-parse; extractKeyframes finds fade",
    () => {
        const src =
            "@layer base { @keyframes fade { 0%{opacity:0} 100%{opacity:1} } }";
        const parsed1 = parseCSSStylesheet(src);
        // The @layer is captured as a typed recursive container (not opaque).
        const layer = parsed1.find(
            (i) => i.kind === "unknown" && i.atName === "layer",
        );
        assert(layer != null, "@layer not captured (kind:unknown, atName:layer)");
        assert(
            Array.isArray(layer.children) && layer.children.length === 1,
            "@layer body not recursively parsed into a typed child",
        );
        assert(
            layer.children[0].kind === "keyframes",
            "@layer child is not a typed @keyframes",
        );
        // Round-trip: serialize → re-parse → extractKeyframes still finds "fade".
        const serialized = serializeStylesheet(parsed1);
        const parsed2 = parseCSSStylesheet(serialized);
        const kf = extractKeyframes(parsed2);
        assert(
            kf instanceof Map && kf.has("fade"),
            `extractKeyframes lost "fade" after round-trip; keys: ${kf instanceof Map ? [...kf.keys()].join(",") : typeof kf}`,
        );
        // And the re-serialization is STABLE (string fixpoint).
        const serialized2 = serializeStylesheet(parsed2);
        assert(
            serialized === serialized2,
            "serialize→parse→serialize is not a fixpoint for @layer",
        );
    },
);

// ── C3: gradient round-trip stable ──
record("C3", "linear-gradient(to right, red, blue) round-trips stably", () => {
    const a = parseCSSValue("linear-gradient(to right, red, blue)").toString();
    const b = parseCSSValue(a).toString();
    assert(a === b, `gradient not a fixpoint: "${a}" vs "${b}"`);
    assert(a.startsWith("linear-gradient("), `not a gradient: "${a}"`);
    // The direction-first form must survive (a no-direction collapse would drop it).
    const dirForm = parseCSSValue(
        "linear-gradient(to bottom right, oklch(0.7 0.2 30), oklch(0.4 0.15 250))",
    ).toString();
    assert(
        parseCSSValue(dirForm).toString() === dirForm,
        `oklch gradient not a fixpoint: "${dirForm}"`,
    );
});

// ── C4: spring() author round-trip (D6 moderate-supersede) ──
record("C4", "spring(1, 100, 10, 0) author round-trip + lowers to linear()", () => {
    const out = parseCSSValue("spring(1, 100, 10, 0)").toString();
    assert(
        out === "spring(1, 100, 10, 0)",
        `spring author round-trip wrong: got "${out}"`,
    );
    // The lowering utility emits a self-idempotent linear().
    assert(
        typeof mod.lowerSpringEasing === "function",
        "lowerSpringEasing not exported from dist",
    );
    const lowered = mod.lowerSpringEasing(1, 100, 10, 0, 16);
    assert(lowered.startsWith("linear("), `lowering not a linear(): "${lowered}"`);
    assert(
        parseCSSValue(lowered).toString() === lowered,
        `lowered linear() not self-idempotent: "${lowered}"`,
    );
    // The lowered curve is REAL (rises off 0, ends at 1, overshoots for ζ<1).
    const outputs = lowered
        .slice("linear(".length, -1)
        .split(",")
        .map((s) => parseFloat(s.trim().split(/\s+/)[0]));
    assert(outputs[0] === 0, `lowered curve does not start at 0: ${outputs[0]}`);
    assert(
        outputs[outputs.length - 1] === 1,
        `lowered curve does not end at 1: ${outputs[outputs.length - 1]}`,
    );
    assert(outputs[1] > outputs[0], "lowered curve does not rise off 0");
    assert(Math.max(...outputs) > 1, "underdamped spring (ζ=0.5) should overshoot 1");
});

// ── C5: color(in oklch …) round-trip canonical + stable ──
record("C5", "color(in oklch 0.5 0.1 200) round-trips canonically (space-separated)", () => {
    const out = parseCSSValue("color(in oklch 0.5 0.1 200)").toString();
    assert(
        out === "color(in oklch 0.5 0.1 200)",
        `color() not canonical (space-separated): got "${out}"`,
    );
    // Fixpoint under re-parse.
    assert(
        parseCSSValue(out).toString() === out,
        `color() not a fixpoint: "${out}"`,
    );
});

// ── C6: the vitest round-trip corpus is GREEN ──
record("C6", "vitest test/round-trip.test.ts corpus green", () => {
    const res = spawnSync(
        "npx",
        ["vitest", "run", "test/round-trip.test.ts", "--reporter=dot"],
        { cwd: repoRoot, encoding: "utf8", stdio: "pipe" },
    );
    const out = (res.stdout ?? "") + (res.stderr ?? "");
    assert(
        res.status === 0,
        `vitest round-trip suite failed (exit ${res.status}):\n${out.slice(-2000)}`,
    );
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
    console.log(
        `proof:round-trip-idempotent GREEN — ${results.length}/${results.length} clauses pass (inv-O-2 holds)`,
    );
    process.exit(0);
} else {
    console.log(
        `proof:round-trip-idempotent RED — ${failed}/${results.length} clauses fail`,
    );
    process.exit(1);
}
