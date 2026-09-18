#!/usr/bin/env node
/**
 * value-src sweep seat — born-RED gate for the library-surface findings
 * (MTS-01..MTS-09). Runs against the BUILT artifact in `dist/`, i.e. the bytes
 * that ship, not the source tree.
 *
 *   npm run build && node docs/tranches/V/megatranche/audit/probes/src-surface-totality.mjs
 *
 * Exit 0 only when every block below is GREEN. RED today.
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

// ── MTS-05: decomposeMatrix3D must return null, not NaN, when singular ───────
const dg = TR.decomposeMatrix3D([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
const anyNaN = dg && [...dg.translate, ...dg.scale, ...dg.skew, ...dg.quaternion, ...dg.perspective].some(Number.isNaN);
anyNaN ? fail("MTS-05", `decomposeMatrix3D(singular) -> ${inspect(dg)} (expected null)`)
       : pass("MTS-05", `decomposeMatrix3D(singular) -> ${inspect(dg)}`);

// ── MTS-06: ./math return-type honesty ───────────────────────────────────────
const dc = M.deCasteljau(0.5, []);
Number.isFinite(dc) ? pass("MTS-06", `deCasteljau(t,[]) -> ${dc}`) : fail("MTS-06", `deCasteljau(0.5, []) -> ${inspect(dc)}, typed number`);
const ib = M.interpBezier(0.5, []);
ib.every(Number.isFinite) ? pass("MTS-06", `interpBezier(t,[]) -> ${inspect(ib)}`) : fail("MTS-06", `interpBezier(0.5, []) -> ${inspect(ib)}, typed [number, number]`);
const la = Array.from(M.lerpArray(new Float64Array([1, 2, 3]), new Float64Array([4, 5]), 0.5, new Float64Array(3)));
la.every(Number.isFinite) ? pass("MTS-06", `lerpArray(mismatched) -> ${inspect(la)}`) : fail("MTS-06", `lerpArray(len3, len2, .5, out3) -> ${inspect(la)} (silent NaN; docstring states the length contract, nothing enforces it)`);

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
