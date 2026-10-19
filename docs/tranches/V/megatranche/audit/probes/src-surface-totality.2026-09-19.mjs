#!/usr/bin/env node
// SERVED MODEL: claude-opus-5[1m]
/**
 * value-src sweep seat — the library-surface gate (MTS-01..MTS-09), DATED
 * SIBLING of `src-surface-totality.mjs`, 2026-09-19. Runs against the BUILT
 * artifact in `dist/`, i.e. the bytes that ship, not the source tree.
 *
 *   npm run build && node docs/tranches/V/megatranche/audit/probes/src-surface-totality.2026-09-19.mjs
 *
 * WHY A SIBLING AND NOT AN EDIT (E-3 — the dated instrument is immutable).
 * Two of the original's arms assert the PRE-CURE shape and can no longer run:
 * MTS-05 calls `decomposeMatrix3D`, which X.W9.b retired with its module
 * (G27), and MTS-06 asks `./math` to RETURN on a malformed input, which
 * X.W9.c replaced with an ordered, named rejection (G11). Left as they were
 * they would report a cure as a defect. COHESION §0ac
 * (`ESC-W9a-PROBE-UNRUNNABLE` / `ESC-W9c-MTS06-SUPERSEDED`) keeps the original
 * byte-untouched and re-points those two arms HERE, against the cured
 * contract, and makes this file G1's command of record. **Every other arm is
 * byte-identical to the original**; the two that moved say so at their block.
 *
 * Exit 0 only when every block below is GREEN.
 */
import { inspect } from "node:util";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../../../../../..");
const load = (p) => import(pathToFileURL(resolve(root, "dist/subpaths", p)).href);
const CSS = await load("css.js");
const TR = await load("transform.js");
const M = await load("math.js");

let red = 0;
const fail = (id, msg) => { red++; console.log(`RED  ${id}  ${msg}`); };
const pass = (id, msg) => console.log(`ok   ${id}  ${msg}`);
const throws = (fn) => { try { fn(); return null; } catch (e) { return e; } };

// ── MTS-01: prototype-chain lookup in NAMED_COLORS (src/css/grammar.ts:265) ──
// The reachable keys are the all-lowercase Object.prototype members, because
// line 265 lowercases before indexing.
const PROTO_KEYS = ["constructor", "__proto__"];
const CSS_EMBEDDED = [
    "a{color:constructor}",
    "a{color:__proto__}",
    "@keyframes k{from{color:constructor}}",
    "a{background:linear-gradient(constructor,red)}",
    "a{animation:x 1s steps(2,constructor)}",
];
for (const [name, arg2] of [["parseCssColor"], ["parseCssScalar"], ["parseCssValue"], ["parseCssValues"], ["coerceToSyntax", "*"]]) {
    for (const key of PROTO_KEYS) {
        const e = throws(() => (arg2 === undefined ? CSS[name](key) : CSS[name](key, arg2)));
        e ? fail("MTS-01", `${name}(${JSON.stringify(key)}) threw ${e.constructor.name}: ${e.message}`)
          : pass("MTS-01", `${name}(${JSON.stringify(key)}) returned`);
    }
}
for (const src of CSS_EMBEDDED) {
    const e = throws(() => CSS.parseStylesheet(src));
    e ? fail("MTS-01", `parseStylesheet(${JSON.stringify(src)}) threw ${e.constructor.name}: ${e.message}`)
      : pass("MTS-01", `parseStylesheet(${JSON.stringify(src)}) returned`);
}

// ── MTS-02: steps() alias resolves through Object.prototype ──────────────────
for (const src of ["steps(2, constructor)", "steps(2, __proto__)"]) {
    const r = CSS.parseTimingFunction(src);
    const pos = r.ok ? r.value.position : undefined;
    typeof pos === "string" || !r.ok
        ? pass("MTS-02", `${src} -> ${r.ok ? pos : "failure"}`)
        : fail("MTS-02", `${src} -> ok:true with position = ${inspect(pos)} (typeof ${typeof pos}), not a JumpPosition`);
}

// ── MTS-03: truncated argument runs return NaN instead of erroring ───────────
for (const d of ["M 0 0 L 10", "M 0 0 C 1 1 2 2 3", "M 0 0 Q 1 1 2", "M 0 0 L 3 4 L 5"]) {
    const v = TR.getTotalLength(d);
    Number.isFinite(v) ? pass("MTS-03", `${d} -> ${v}`) : fail("MTS-03", `getTotalLength(${JSON.stringify(d)}) -> ${v}`);
}

// ── MTS-04: SVG compact arc flags (SVG 1.1 §8.3.9 flag ::= "0" | "1") ────────
const EXPANDED = "M 10 10 A 5 5 0 0 1 20 10 A 5 5 0 0 1 10 10";
const COMPACT = "M10 10A5 5 0 0120 10A5 5 0 0110 10";
const le = TR.getTotalLength(EXPANDED), lc = TR.getTotalLength(COMPACT);
Math.abs(le - lc) < 1e-6
    ? pass("MTS-04", `compact == expanded (${lc})`)
    : fail("MTS-04", `compact arc flags mis-tokenized: expanded=${le} compact=${lc} (true circumference ${2 * Math.PI * 5})`);

// ── MTS-05: the matrix family is RETIRED, path geometry is PRESERVED ─────────
// Re-pointed 2026-09-19 (COHESION §0ac, ESC-W9a-PROBE-UNRUNNABLE). The original
// arm called `TR.decomposeMatrix3D(...)` and asked it to answer `null` on a
// singular matrix. X.W9.b retired that symbol with its module (CC-094 · G27)
// against a measured zero-consumer census — no shim, no forwarding export — so
// the original arm now throws on the CALL rather than measuring the contract.
// The cured contract is the retirement itself, stated in both directions.
const RETIRED = ["decomposeMatrix2D", "decomposeMatrix3D", "recomposeMatrix2D",
    "recomposeMatrix3D", "interpolateDecomposed", "slerp"];
const survivors = RETIRED.filter((name) => name in TR);
survivors.length === 0
    ? pass("MTS-05", `the six retired matrix symbols are absent from ./transform`)
    : fail("MTS-05", `./transform still exports ${survivors.length} retired symbol(s): ${survivors.join(", ")} (no shim, no forwarding export — G27)`);
const SEAM = ["PathGeometry", "getTotalLength", "getPointAtLength"];
const broken = SEAM.filter((name) => !(name in TR));
broken.length === 0
    ? pass("MTS-05", `the keyframes MorphSVG seam is intact (${SEAM.join(", ")})`)
    : fail("MTS-05", `the retirement broke the MorphSVG seam: ${broken.join(", ")} missing`);

// ── MTS-06: ./math ORDERS rejection; a violated precondition is named ────────
// Re-pointed 2026-09-19 (COHESION §0ac, ESC-W9c-MTS06-SUPERSEDED). The original
// arm asked these three to RETURN a finite value on a malformed input — it was
// written before the policy existed, when the honest complaint was the silent
// `undefined` / `[undefined, undefined]` / `[2.5, 3.5, NaN]`. X.W9.c enforced
// the sentence `src/foundation/math.ts:58` already stated: a violated size
// precondition raises a `RangeError` naming the function and the constraint.
// So the cured contract is the REJECTION, and its message is part of it —
// an anonymous throw would be no better than the NaN it replaced.
const rejects = (id, name, fn) => {
    const e = throws(fn);
    if (e === null) return fail("MTS-06", `${name} returned instead of rejecting its stated precondition`);
    if (!(e instanceof RangeError)) return fail("MTS-06", `${name} threw ${e.constructor.name}, not RangeError: ${e.message}`);
    if (!e.message.startsWith(`${id}:`)) return fail("MTS-06", `${name} threw an unnamed RangeError: ${e.message}`);
    return pass("MTS-06", `${name} -> RangeError: ${e.message}`);
};
rejects("deCasteljau", "deCasteljau(0.5, [])", () => M.deCasteljau(0.5, []));
rejects("interpBezier", "interpBezier(0.5, [])", () => M.interpBezier(0.5, []));
rejects("lerpArray", "lerpArray(len3, len2, .5, out3)", () =>
    M.lerpArray(new Float64Array([1, 2, 3]), new Float64Array([4, 5]), 0.5, new Float64Array(3)));

// ── MTS-08: the general value serializer must be on ./css ────────────────────
"serializeCssValue" in CSS
    ? pass("MTS-08", "serializeCssValue exported from ./css")
    : fail("MTS-08", "./css exports serializeCssColor + serializeTimelineOptions but NOT serializeCssValue; keyframes.js re-implements it at src/animation/compile/emit/css-text.ts:41 and the copies have diverged");

// ── MTS-09: ./css must be able to name its own return types ─────────────────
const dts = await import("node:fs").then((fs) => fs.readFileSync(resolve(root, "dist/subpaths/css.d.ts"), "utf8"));
const orphan = [...dts.matchAll(/^declare (?:type|interface) (\w+)/gm)].map((m) => m[1]);
orphan.length === 0
    ? pass("MTS-09", "no unexported declares in css.d.ts")
    : fail("MTS-09", `css.d.ts carries ${orphan.length} unexported declares referenced by the public signatures: ${orphan.join(", ")}`);

console.log(`\n${red === 0 ? "GREEN" : `RED — ${red} failing assertions`}`);
process.exit(red === 0 ? 0 : 1);
