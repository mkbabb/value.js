# N.W7.A — Library-asks recon spec sheet (the kf next-slice, 12 items)

**Lane:** N.W7.A (recon, READ-ONLY except this file).
**Date:** 2026-06-11.
**Sources read:** `docs/tranches/N/N.md §4` (the W7 row, 12-item ledger) · `docs/tranches/N/audit/lanes/A4.md`
(the verified ask census with provenance) · the canonical ask doc
`../keyframes.js/docs/tranches/F/valuejs-sota-handoff-v2.md` (AUTHORITATIVE charter) · the live
`it.fails`/positive-control witnesses in `../keyframes.js/test/` · the live value.js source tree at
HEAD `0cb5dd2` (branch `tranche-f-handoff`, version `0.11.2`).

**How to read this sheet.** Each section is one W7 ledger item. The three implementation lanes
(W7.A-impl parse/easing, W7.B-impl color/serialize, W7.C-impl numeric/perf — partition decided by
the dispatching agent) build EXACTLY from these sections. Every "Witness" cite is a live `file:line`
re-grounded by this lane; where keyframes has **no** runtime witness, the spec is derived from A4's
provenance and the F charter and is marked **DERIVED (no kf witness)**.

**Scope note (out-of-slice).** The N.md W7 row lists "parse-that `^0.9` re-pin" as a 12th bullet but
annotates it `[NOTE: the re-pin is W7.B scope — record it as out-of-slice]`. It is recorded in §13
below as **OUT-OF-SLICE** — it is a `package.json` dependency bump, not a library API, and belongs to
N.W7.B (perf-truth). It is NOT one of the 11 API items the three impl lanes build.

**Headline status (from A4 §2.3 + live grep).** Of the 12 items, the **only two with live kf
`it.fails`/born-RED witnesses** are MCI-5 (§9, `interpolate-anything.test.ts:256`) and — adjacently —
the SEAM-4 `rotate()` shorthand witness (`serialize-from-template.test.ts:143`, NOT one of the 12 but
the nearest neighbour, recorded in §14 as a free flip). The other 9 API items have **no kf runtime
witness** (kf consumes value.js's interp path through the single `lerpValue → iv._lerp` seam and never
imports these symbols by name yet); their specs are DERIVED from the F charter row + A4 provenance.

---

## 1. (E1) `linear()` parser → `LinearStop[]`

**Expected API.**
- New parser surface in `src/parsing/`: a `linear()` value parser producing `LinearStop[]` (the shape
  already exists: `src/easing.ts:28` `export interface LinearStop { output: number; input?: number }`).
- Wire it so `parseCSSValue("linear(0, 0.5 25% 75%, 1)")` resolves to a structured node feeding the
  **existing** `cssLinear` evaluator (`src/easing.ts:33` `export function cssLinear(stops): (t)=>number`).
- Charter-named entry: a `parseCSSEasing` / `parseLinearStops`-equivalent public function. F charter
  §Wave-E E1 names `index.ts:230` as the wire point. There is currently **no** `parseLinearStops` /
  `parseCSSEasing` exported from `src/parsing/index.ts` (grep = 0) and **no** parser producing
  `LinearStop[]` (A4 §2.3 E1: "`src/easing.ts` has `cssLinear` and `LinearStop` but no parser
  producing stops from a CSS string").

**Signature (proposed, from charter).**
```ts
// src/parsing/index.ts (or a new src/parsing/easing.ts)
export function parseLinearStops(input: string): LinearStop[];
// and/or a FunctionValue node routed through parseCSSValue for the generic path
```

**Semantics (CSS Easing Level 2 `linear()`).**
- Grammar: `linear( <linear-stop-list> )` where `<linear-stop-list> = <linear-stop>#`,
  `<linear-stop> = <number> <linear-stop-length>?`, `<linear-stop-length> = <percentage>{1,2}`.
- Structural fit named in the charter (E1 row): `sepBy(comma)` of
  `all(utils.number, percentage.opt(), percentage.opt())` per CSS Easing L2.
- A stop with **two** percentages is a flat segment: `0.5 25% 75%` → emit **two** `LinearStop`s with
  the same `output: 0.5` at `input: 25` and `input: 75` (matching `cssLinear`'s flat-segment handling
  at `src/easing.ts:56-60`). `input` is the 0–100 percentage; `output` is the (possibly-overshooting)
  easing value.
- First/last input default to 0/100; gaps fill by linear distribution — but the **evaluator already
  does this** (`src/easing.ts:41-60`), so the parser only needs to emit the raw stops; do NOT
  pre-resolve gaps in the parser (keep the division of labour: parser=syntax, `cssLinear`=resolution).

**Edge cases.**
- `linear(0, 1)` → two evenly-spaced stops (`[{output:0},{output:1}]`).
- Round-trip kf's own emitted spring: `linear(0, 0.234 4.17%, …, 1)` — the `springLinearStops`
  byte-match corpus (charter E1 gate, `px-kf-grammar PX-3`). This is the binding round-trip lock.
- Negative/overshoot outputs (`linear(0, -0.2, 1.4, 1)`) must parse (output is unbounded).
- Whitespace tolerance between number and percentage(s).

**Witness.** **DERIVED (no kf runtime witness in test/).** Provenance: A4 §2.3 (E1 ASKED-NOT-SHIPPED)
+ A4 §4.1 ("E1 `linear()` parser … G.W2 carried this as the re-pin's consume-leg") + A4 P2
("`kf/src/animation/utils.ts:106-130` `parseLinearStops` shim retires onto E1"). The kf-side shim is
the consume target, NOT a value.js test witness. Charter cite: `valuejs-sota-handoff-v2.md` Wave-E E1
(`easing.ts:33,28`; `index.ts:230`), **MED-HIGH**, Baseline Widely-Available 2026-06-11.

**Suggested owning module.** `src/parsing/index.ts` (where `handleCubicBezier` + `CSSFunction` live,
`:210-241`) — or lift a focused `src/parsing/easing.ts` if E1+E2+E3 grow past the god-module sense.
The `number`/`percentage` primitives are in `src/parsing/utils.ts` + `src/parsing/units.ts`. Export
the new function from `src/index.ts` (the `LinearStop` type is already exported at `src/index.ts:219`).

**Test sketch.**
```ts
import { parseLinearStops } from "@src/parsing"; import { cssLinear } from "@src/easing";
expect(parseLinearStops("linear(0, 0.5 25% 75%, 1)")).toEqual([
  { output: 0 }, { output: 0.5, input: 25 }, { output: 0.5, input: 75 }, { output: 1 }]);
// round-trip a kf-emitted spring byte-for-byte through cssLinear at sample points
const f = cssLinear(parseLinearStops("linear(0, 0.234 4.17%, 0.78 50%, 1)"));
expect(f(0)).toBeCloseTo(0); expect(f(1)).toBeCloseTo(1);
// boundary rejects: 'linear()' empty, 'linear(0,1,)' trailing comma
```

---

## 2. (E2) `steps()` argument parser → `{count, jumpTerm}`

**Expected API.**
- A `steps()` argument parser producing `{ count: number, jumpTerm }` feeding the **existing**
  `steppedEase` evaluator (`src/easing.ts:293` `export function steppedEase(steps, jumpTerm?)`).
- `jumpTerm` is the union the evaluator already accepts: `jump-start | jump-end | jump-none |
  jump-both | start | end` (see `src/easing.ts:297-309` switch + the `jumpTerms` tuple referenced at
  `:295`). The evaluator already maps both spec-canonical (`jump-*`) and legacy (`start`/`end`) forms.

**Signature (proposed).**
```ts
export function parseSteps(input: string): { count: number; jumpTerm: JumpTerm };
// or a FunctionValue("steps", [count, jumpTerm]) routed through parseCSSValue
```

**Semantics (CSS Easing L1 `steps()`).**
- Grammar: `steps( <integer> , <step-position>? )` where `<step-position> = jump-start | jump-end |
  jump-none | jump-both | start | end`.
- `count` is a positive integer; `jumpTerm` defaults to `jump-end` if omitted (matches
  `steppedEase`'s default param `= "jump-end"` at `src/easing.ts:295`).
- Round-trip: parsed args feed `steppedEase(count, jumpTerm)` and reproduce the step staircase.

**Edge cases.**
- `steps(4)` → `{count:4, jumpTerm:"jump-end"}` (default position).
- `steps(1, jump-none)` → the `steps<=1` guard in `jumpNone` (`src/easing.ts:288-290`) returns `t`.
- Reject `steps(0)` / `steps(-3)` / non-integer count per spec (count must be a positive integer;
  `jump-none` requires count > 1 to be meaningful but the evaluator guards it).
- `step-start` / `step-end` keyword shorthands are a **separate** CSS keyword surface (the evaluator
  has `stepStart`/`stepEnd` at `src/easing.ts:312-318`) — E2 is the `steps(...)` function form only;
  note in the PR whether the keyword shorthands are also wired (charter scopes E2 to the function).

**Witness.** **DERIVED (no kf runtime witness).** Provenance: A4 §2.3 (E2 ASKED-NOT-SHIPPED) +
A4 §7 (E2 verdict). Charter cite: `valuejs-sota-handoff-v2.md` Wave-E E2 (`easing.ts:293`),
**LOW-MED, bundle with E1** ("Same shape as E1; kf re-implements locally via `STEPS_LITERAL`").

**Suggested owning module.** Same as E1 — `src/parsing/index.ts` (or the lifted `src/parsing/easing.ts`).
Bundle the E2 PR with E1; both consume the same `number`/`integer` primitives in
`src/parsing/utils.ts`.

**Test sketch.**
```ts
expect(parseSteps("steps(4)")).toEqual({ count: 4, jumpTerm: "jump-end" });
expect(parseSteps("steps(3, jump-start)")).toEqual({ count: 3, jumpTerm: "jump-start" });
const f = steppedEase(parseSteps("steps(4, jump-end)").count, parseSteps("steps(4, jump-end)").jumpTerm);
expect(f(0)).toBe(0); expect(f(0.99)).toBeCloseTo(0.75);
expect(() => parseSteps("steps(0)")).toThrow();
```

---

## 3. (B1) Zero-alloc `toAnimationString` serializer

**Expected API.**
- Extend the **existing** precision serializer `Color.toFormattedString(digits)`
  (`src/units/color/index.ts:212-218`) into a `toAnimationString(digits, outputSpace?)` that writes
  channels into a **reused scratch buffer** (zero per-call array allocation). The *precision* half
  already exists; the *zero-alloc* half does not — `toFormattedString` still does
  `this.values().slice(0,-1).map(...)` = three array allocations (`:213-215`), and `toString`
  (`:201-209`) does the same.

**Signature (proposed, from charter §B1).**
```ts
// on the Color<T> base class in src/units/color/index.ts
toAnimationString(digits?: number, outputSpace?: ColorSpace): string;
```

**Semantics.**
- Output is a CSS color string ≤ ~28 chars (vs the current ~73-char full-precision form).
- 4–5 sig-figs is sub-JND (`DELTA_E_OK_JND = 0.02` — see `gamut.ts` `deltaEOK`); `toString` stays
  full-precision for round-trip/`format.ts`. So `toAnimationString` is the **apply-path** serializer,
  `toString`/`toFormattedString` remain the canonical/round-trip serializers.
- Must route the alpha clause through the **single choke point** `formatColor`
  (`src/units/color/index.ts:18-30`) which already omits `/ alpha` at alpha=1 (B1b, shipped). Do NOT
  re-introduce an `/ 1` emission.
- The `outputSpace` argument is B2's concern (§4 below) — B1 may land `outputSpace` as an accepted-
  but-default-undefined parameter and B2 fills its semantics; or B1 ships digits+zero-alloc only and
  B2 adds the overload. Decide at impl time; the charter pairs them (B1 "extended with `outputSpace`",
  §5 W9 S4).

**Edge cases.**
- `none`/NaN channels must serialize as `"none"` (the existing `toString` handles this at
  `:202-208`; `formatNumber` handles it at `:12-15`). The zero-alloc path must preserve this.
- Opaque vs alpha<1 (the B1b choke point).
- The scratch buffer must be safe under re-entrancy / nested calls (a single module-level scratch is
  unsafe if `toAnimationString` can recurse; prefer a per-call small fixed array or a documented
  single-threaded contract). **Flag for impl:** the charter says "reused scratch buffer" but value.js
  is consumed in a single-threaded rAF loop — a module-scoped buffer is acceptable IF no nested color
  serialize occurs per frame; verify against `lerpColorValue`'s call shape.

**Witness.** **DERIVED (no kf runtime witness).** Grep of `../keyframes.js/{src,test}` for
`toAnimationString` = 0 — kf does not yet consume it. Provenance: A4 §2.3 ("B1b shipped; B1 (the
zero-alloc portion) is still open") + A4 §7 (B1 verdict ASKED-NOT-SHIPPED). Charter cite:
`valuejs-sota-handoff-v2.md` Wave-B B1 (`color/index.ts:191-208`), defended by the §2.7 color bench
(B2-bench, see §11 perf-truth).

**Suggested owning module.** `src/units/color/index.ts` (the `Color<T>` base class, beside
`toFormattedString` at `:212`). Bench substrate: `bench/color-interp.mjs` already exists (authored at
F `c868f3d`) — extend it with a serialize-alloc case.

**Test sketch.**
```ts
const c = parseCSSColor("oklab(0.7 0.1 0.05)").value as OKLABColor;
expect(c.toAnimationString(3)).toBe("oklab(0.7 0.1 0.05)"); // no '/ 1'
const withA = parseCSSColor("oklab(0.7 0.1 0.05 / 0.5)").value;
expect(withA.toAnimationString(3)).toContain("/ 0.5");
// zero-alloc gate: a call-count/heap probe in the bench (not a unit assert) — see bench/color-interp.mjs
```

---

## 4. (B2) Output-space emit (corrected emit-space rule)

**Expected API.**
- An `outputSpace?: ColorSpace` option on the color serializer (`toString` / `toAnimationString`,
  `src/units/color/index.ts`) that serializes a stored color **as** a requested output space so the
  UA's *implicit* interpolation space equals the request.

**Semantics (CORRECTED rule — this is the load-bearing correction).**
- `<color-interpolation-method>` is a CSS **data type**, NOT a settable property. For animations the
  interp space is chosen *implicitly* by the keyframe color **syntax family** (CSS Color 4 §12: OKLab
  for non-legacy functional syntaxes, sRGB for legacy `rgb()`/`hsl()` comma forms).
- Therefore v1's "emit legacy pairs as `rgb()`" is **WRONG** as a blanket WAAPI rule (it would force
  sRGB interp, diverging from a default-`oklab` request). The corrected rule:
  - default request (`oklab`) → emit a **non-legacy** syntax family **regardless of input family** (so
    the UA interpolates in OKLab).
  - explicit `srgb` request → emit `rgb()`.
- B2-as-`rgb()` **is** still correct for `gradient` / `color-mix` and explicit-sRGB contexts.

**Edge cases.**
- A stored OKLab color with a default-`oklab` animation request must emit non-legacy even if the
  author wrote `rgb(...)`.
- The 4-clause WAAPI hard-equality gate (charter §5 W9 S4) is the kf-side consumer; value.js only owns
  the emit-space half + the `cssColorInterpKeyword(space, hueMethod)` helper named in §5
  ("value.js half: `cssColorInterpKeyword` + the non-legacy space-preserving serializer"). Whether to
  ship `cssColorInterpKeyword` in this slice is an impl decision — A4 lists it under the WAAPI lift,
  not the 12-item ledger; the ledger item is the **emit-space rule** on the serializer.

**Witness.** **DERIVED (no kf runtime witness).** Provenance: A4 §2.3 (B2 ASKED-NOT-SHIPPED,
"paired with the WAAPI color lift kf S4 that is also unshipped") + A4 §7 (B2 verdict). Charter cite:
`valuejs-sota-handoff-v2.md` Wave-B B2 + §5 W9 S4 (the 4-clause gate). `r-color-l4-l5 §3` is the
science citation for the correction.

**Suggested owning module.** `src/units/color/index.ts` (the serializer + a `ColorSpace`-family
classifier; "legacy vs non-legacy syntax family" is a small table — candidate home
`src/units/color/constants.ts` beside `COLOR_SPACE_DENORM_UNITS`). Bundle with B1 (same method).

**Test sketch.**
```ts
const c = parseCSSColor("rgb(255 0 0)").value; // stored sRGB
expect(c.toAnimationString(3, "oklab")).toMatch(/^oklab\(|^oklch\(/); // non-legacy emit
expect(c.toAnimationString(3, "srgb")).toMatch(/^rgb\(/);            // legacy emit
// round-trip parity per space: parse(emit(x)) deltaEOK x < JND
```

---

## 5. (B4) P3 egress gamut

**Expected API.**
- Gamut-map a color to the **egress RGB space's own gamut**, not unconditionally sRGB. A
  `color(display-p3 ...)` animation must stay in P3 on output, only sRGB-clipped on sRGB displays.

**Semantics.**
- Today the RGB direct paths route through `gamutMap(new RGBColor(...))` (`conversions/direct.ts:79`
  for OKLab→RGB, `:157` for OKLch→RGB) and `conversions/xyz-extended.ts` — `gamutMap`'s default is
  sRGB-gamut (`correctGamut=true` semantics, see `direct.ts:36-37`). So a `display-p3` egress is
  clipped to the **sRGB** gamut → silent desaturation of P3-only colors.
- The fix: gamut-map to the **egress** space's gamut. The egress space is known at the conversion
  site (the target RGB class: `DisplayP3Color`, `Rec2020Color`, `AdobeRGBColor`, etc., enumerated in
  `src/units/color/index.ts` + the `COLOR_SPACE_RANGES` in `constants.ts`). `gamutMap`
  (`src/units/color/dispatch.ts`) needs a target-space parameter or per-space gamut variants.
- `display-p3` is Baseline 2023; this is "the one real wide-gamut correctness gap" (charter B4).

**Edge cases.**
- An in-sRGB-gamut color is identical under either mapping (no regression on the common path).
- The Ottosson analytical sRGB map (`gamut.ts` `gamutMapSRGB`/`gamutMapOKLab`) is sRGB-specific; B4
  needs either a generalized boundary or a per-space cusp computation. **Flag:** this is the
  highest-science item of the slice — the analytical map's polynomial coefficients
  (`GAMUT_SECTOR_COEFFICIENTS` in `constants.ts`) are sRGB-fit. Generalizing to P3/Rec2020 may need
  per-space coefficients or a numeric fallback. Impl must decide analytical-per-space vs numeric-binary-
  search for non-sRGB egress, measure-first.
- Out-of-gamut even for P3 (deep Rec2020 colors) → map to P3 boundary.

**Witness.** **DERIVED (no kf runtime witness).** Provenance: A4 §2.3 (B4 ASKED-NOT-SHIPPED) +
A4 §7 (B4 verdict). Charter cite: `valuejs-sota-handoff-v2.md` Wave-B B4
(`conversions/xyz-extended.ts:74`, `direct.ts:79,157`).

**Suggested owning module.** `src/units/color/dispatch.ts` (`gamutMap`) + `src/units/color/gamut.ts`
(the analytical core) + the call sites in `src/units/color/conversions/{direct,xyz-extended}.ts`.
This is a color-science lane — pair the impl with the B1/B2 color lane.

**Test sketch.**
```ts
const p3 = parseCSSColor("color(display-p3 1 0 0)").value; // P3-red, outside sRGB
const out = color2(p3, "display-p3"); // egress P3, NOT sRGB-clipped
expect(out.r).toBeCloseTo(1, 5); // stays saturated in P3
// vs sRGB egress: color2(p3,"srgb") clips to the sRGB boundary (current behavior, unchanged)
```

---

## 6. (F3 / VJ-F6) LRU memoize bound

**Expected API.**
- Change `memoize` (`src/utils.ts:108-159`) eviction from **FIFO** to **LRU**, keeping the bound
  (`maxCacheSize`, currently defaults `Infinity` at `:114`).

**Semantics.**
- Current state: when capped, eviction drops `cache.keys().next().value` (`:148`) = the **oldest
  inserted** key = FIFO. A recently-*touched* (read-hit) key is NOT promoted, so under a flood it can
  be evicted despite being hot.
- LRU fix: on a cache **hit** (`:133-140`), promote the key to most-recently-used (delete + re-set, or
  use a `Map`'s insertion-order property: `cache.delete(key); cache.set(key, cached)`). On eviction,
  `cache.keys().next().value` then correctly yields the least-recently-*used* key.
- The C4 `ttl===Infinity` fast path (`:120-125,135,145`) is **already shipped** — do NOT disturb it;
  LRU promotion must compose with the no-clock path (promotion is independent of TTL).
- The bound is carried by the **primitive** (so the demo-scoped `tryParseCache` withhold stays
  correct — the primitive is safe by construction). `maxCacheSize` default may stay `Infinity` for
  back-compat, but the named consumers (parse caches, `getComputedValue`) should pass a finite cap.

**Edge cases.**
- Flood test: insert `cap+N` distinct keys; assert `cache.size <= cap` AND a key touched mid-flood
  survives (the LRU property FIFO fails — this is the biting gate).
- A hit must not change `cache.size`, only order.
- `shouldCache` (`:101,144`) interaction: a result that fails `shouldCache` is not inserted; LRU order
  unaffected.

**Witness.** **DERIVED (no kf runtime witness).** Provenance: A4 §2.3 (F3 ASKED-NOT-SHIPPED,
"`src/utils.ts:147` still uses `cache.keys().next().value` (FIFO)") + A4 §4.1 (F3 OPEN) + A4 §4.3
(VJ-7 / F3 `tryParseCache` unbounded eviction OPEN, `kf/J.PROGRESS.md:324`). Charter cite:
`valuejs-sota-handoff-v2.md` Wave-F F3 ("the single most-named item", `utils.ts:108-153`).
**Live confirm:** the FIFO eviction is at `src/utils.ts:147-149`.

**Suggested owning module.** `src/utils.ts` (the `memoize` primitive). No new export. Already exported
via `src/index.ts` (the `MemoizeOptions` type at `:201`).

**Test sketch.**
```ts
const f = memoize((x: number) => x * 2, { maxCacheSize: 2 });
f(1); f(2); f(1); /* touch key 1 */ f(3); /* evict LRU = key 2, NOT key 1 */
expect(f.cache.has("1")).toBe(true);  // survived the flood (LRU); FIFO would drop it
expect(f.cache.has("2")).toBe(false); // evicted as least-recently-used
expect(f.cache.size).toBe(2);
```

---

## 7. (VJ-F1 / F9) Path-geometry sampler

**Expected API.**
- A value-domain geometry sampler enabling MorphSVG/DrawSVG + the heavier MotionPath half:
  `getPointAtLength` / `getTotalLength` curve sampling over an SVG path string (or a parsed
  path-command list).

**Signature (proposed, from charter §F9).**
```ts
// new module src/transform/path.ts (or src/geometry/path.ts)
export function getTotalLength(path: string): number;
export function getPointAtLength(path: string, length: number): { x: number; y: number };
// possibly: parsePath(d: string): PathCommand[]; samplePath(cmds, t): Point;
```

**Semantics.**
- Parse an SVG path `d` string into commands (M/L/C/Q/A/Z + relative variants), compute cumulative
  arc-length, and sample a point (and optionally a tangent angle for `rotate: auto`) at a given length
  or normalized `t`.
- This is **pure value-domain geometry** (no DOM) — the whole point is to give kf MotionPath without a
  `<path>` element / `SVGGeometryElement.getPointAtLength`.
- Cubic/quadratic Bézier arc-length needs adaptive subdivision or Gauss-Legendre quadrature; arcs (`A`)
  need ellipse parameterization. Tangent for orient-along-path is the derivative.

**Edge cases.**
- Closed paths (`Z`), multiple subpaths (multiple `M`), relative commands, smooth curve shortcuts
  (`S`/`T`), elliptical arcs (`A` with large-arc/sweep flags).
- `length` beyond total → clamp to endpoint; `length` 0 → start point.
- Degenerate (single point) path.

**Witness.** **DERIVED (no kf runtime witness).** Provenance: A4 §2.3 (F9/VJ-F1 ASKED-NOT-SHIPPED,
"Still open in kf deferred ledger `FB-3 MorphSVG` in `J.PROGRESS.md:307`") + A4 §4.3 (FB-3 MorphSVG
OPEN). Charter cite: `valuejs-sota-handoff-v2.md` Wave-F F9 (`r-anim-libs-2026 F26-1b/1c`),
disposition **value.js-HANDOFF (BOOK)**, and §9 H-1 ledger ("MorphSVG / DrawSVG / numeric MotionPath
→ value.js-HANDOFF VJ-F1").

**Suggested owning module.** New focused module `src/transform/path.ts` (the `transform/` dir already
holds `decompose.ts` matrix geometry — path geometry is its sibling). Export the public sampler from
`src/index.ts`. **Scope flag:** this is the single largest net-new item (a small parser + arc-length
math); the lane should size it and consider BOOK-with-trigger if it threatens the 0.12.0 cut — A4 and
the charter both mark it BOOK. Confirm with the dispatching agent whether VJ-F1 is in the 0.12.0 cut
or BOOKed.

**Test sketch.**
```ts
expect(getTotalLength("M0 0 L100 0")).toBeCloseTo(100);
expect(getPointAtLength("M0 0 L100 0", 50)).toEqual({ x: 50, y: 0 });
expect(getPointAtLength("M0 0 L100 0 L100 100", 150)).toEqual({ x: 100, y: 50 });
// cubic: arc-length within tolerance of a subdivision reference
```

---

## 8. (VJ-F2 / F10) Diagnostics sink

**Expected API.**
- A structured parse-error sink (csstree-style `onParseError` shape) so kf can surface a `diagnostics`
  channel instead of value.js's silent-swallow / `console.error`.

**Signature (proposed, from charter §F10).**
```ts
// an opt-in diagnostics callback threaded through the parse entry points
interface ParseDiagnostic { message: string; offset: number; expected?: string[]; input: string; }
type OnParseError = (d: ParseDiagnostic) => void;
// e.g. parseCSSValue(input, { onParseError }) or a module-level setDiagnosticsSink(fn)
```

**Semantics.**
- On a failed/partial parse, emit a structured diagnostic (message + furthest offset + expected set)
  to the registered sink instead of `console.error`. The architectural root is the parse-that
  error-state move (parse-that PT-WAVE-1: error-state lives in module globals
  `lastFurthestOffset`/`lastExpected`/`collectedDiagnostics`, NOT on `ParserState`). value.js's side
  is the **surfacing**: expose the furthest-offset/expected as a structured object.
- Pairs with the F7 `console.error` leak fix (already shipped at `652aa71`, reorder-the-name-map) —
  F10 is the broader "give consumers a real diagnostics channel" surface. The live `parseState` calls
  are at `src/parsing/utils.ts:69,87` (`parser.parseState(input)`).
- kf's consumer is `ResolvedKeyframes.diagnostics` (`kf/src/animation/adapter.ts:18` per A4 §4.1) — a
  field that does NOT yet exist; value.js ships the producing surface, kf adds the field (kf BOOK).

**Edge cases.**
- A successful parse emits nothing.
- Multiple errors (multi-value parse) → multiple diagnostics or a furthest-only summary (decide; the
  charter says csstree `onParseError` shape, which is per-error).
- Must NOT regress F7 (no `console.error` on the registered-custom-color-name path).
- **Gated on parse-that.** The cleanest structured offset/expected requires parse-that's error-state
  on the instance (PT-WAVE-1) — value.js may only be able to ship a coarse sink until parse-that
  ships. **Flag for impl:** check the installed parse-that surface (value.js currently pins
  `^0.8.2`; the §13 re-pin to `^0.9.0` may be a prerequisite — coordinate W7.A diagnostics with the
  W7.B re-pin).

**Witness.** **DERIVED (no kf runtime witness).** Provenance: A4 §4.1 (VJ-F2 OPEN, "`ResolvedKeyframes`
has no `diagnostics` field `kf/src/animation/adapter.ts:18`") + A4 §4.3 (VJ-F2 diagnostics sink OPEN,
`kf/J.PROGRESS.md:326`). Charter cite: `valuejs-sota-handoff-v2.md` Wave-F F10
(`px-kf-grammar PX-5`, `px-parse-that-arch §4`), disposition **value.js-HANDOFF + kf BOOK**.

**Suggested owning module.** `src/parsing/utils.ts` (the `tryParse`/`parseResult` + `parseState`
seam at `:69,87`) — thread an optional sink through the parse entry points in `src/parsing/index.ts`
(`parseCSSValue`, `parseCSSColor`, `parseCSSValueUnit`). Export the `ParseDiagnostic`/`OnParseError`
types from `src/index.ts`.

**Test sketch.**
```ts
const seen: ParseDiagnostic[] = [];
parseCSSValue("rgb(notacolor", { onParseError: (d) => seen.push(d) });
expect(seen).toHaveLength(1);
expect(seen[0]).toMatchObject({ offset: expect.any(Number), input: "rgb(notacolor" });
// no console.error fired (spy assertion)
```

---

## 9. (VJ-F4 / F8) Buffer-reusing `unflattenObjectToString`

**Expected API.**
- Make `unflattenObjectToString` (`src/units/utils.ts:115-148`) write into a **caller-supplied** map
  and pre-compile the static skeleton, eliminating the per-frame serialize allocation.

**Signature (proposed, from charter §F8 / VJS-2).**
```ts
// src/units/utils.ts — extend the existing signature
export const unflattenObjectToString = (
  flatObj: Record<string, any[]>,
  out?: Record<string, string>,        // caller-supplied reuse target
): Record<string, string>;
// optionally a compiled-skeleton variant:
export const compileUnflattenSkeleton = (keys: string[]) => (flatObj, out?) => Record<string,string>;
```

**Semantics.**
- Today (`src/units/utils.ts:115-148`): allocates a fresh `result` object per call (`:118`), and for
  each flat key splits the key string (`:121`), builds `leftS`/`rightS`/`middleS` strings (`:126-142`)
  — all per-frame garbage. This is "the real per-frame garbage the W7 Strand-B diff-skip chased" — the
  alloc is the serialize, value.js-owned.
- Fix: (a) write into a caller-supplied `out` map (clear-and-reuse, no fresh object); (b) pre-compile
  the static skeleton — the `keys.split(".")` → `left(...)right` shape is invariant across frames for
  a fixed keyframe set, so compile it once and only splice the changing `middleS` (the interpolated
  values) per frame.
- **Isomorphism is binding:** output must be byte-identical to the current function (the demo + kf
  serialize path round-trips through this). The `.trim()` at `:144` and the leading-space join at
  `:142` must be preserved exactly.

**Edge cases.**
- A flat key with no nesting (`keys.length === 1`) → `middleS = values.toString()` (`:139`), no
  `left/right` wrap. Preserve.
- Multiple flat keys sharing a `propertyKey` (the `current += ...` accumulation at `:124,142`) —
  the reuse path must accumulate correctly into the supplied `out`.
- `kf must NOT re-open the W7 diff-skip` (charter) — this is the value.js-owned alloc fix; the kf-side
  diff-skip was measured to save ~0.

**Witness.** **DERIVED (no kf runtime witness).** Provenance: A4 §2.3 (F8/VJS-2 ASKED-NOT-SHIPPED,
"Write into a caller-supplied map, pre-compile the static skeleton"). N.md W7 row names it
"buffer-reusing unflatten VJ-F4". Charter cite: `valuejs-sota-handoff-v2.md` Wave-F F8 (VJS-2),
`a-engine-post-e F-ENG-2`, `a-runtime-remeasure RM-3`, disposition **value.js-HANDOFF**.
**Live confirm:** `src/units/utils.ts:115-148` allocates `result` fresh per call.

**Suggested owning module.** `src/units/utils.ts` (the existing function). Exported via
`src/index.ts:27`. Keep the no-arg signature working (default `out = {}`) for back-compat — the
reuse path is opt-in via the second arg.

**Test sketch.**
```ts
const flat = { transform: [[1,2]], "transform.translateX": [["10px"]] };
const a = unflattenObjectToString(flat);
const reuse = {} as Record<string,string>;
const b = unflattenObjectToString(flat, reuse);
expect(b).toBe(reuse);          // wrote into the supplied map
expect(b).toEqual(a);           // byte-identical output (isomorphism)
// alloc gate lives in a bench, not a unit test
```

---

## 10. (MCI-5) Identity-aware fn-arity pad — **HAS LIVE kf WITNESS**

**Expected API.**
- When two interpolation endpoints have **different leaf-array lengths** (one filter/transform has
  more functions than the other), pad the shorter side with each absent function's **CSS identity
  value**, NOT a bare `new ValueUnit(0)`.
- Concretely: `filter: blur(4px)` → `filter: blur(4px) brightness(2)` must pad the missing
  `brightness` slot with `brightness(1)` (CSS identity = 1), so it lerps `1 → 2` and holds 1 at t=0 —
  NOT `0 → 2` holding 0 (current behavior = black at t=0, silent-wrong).

**Where the pad lives.** The pad itself is in **keyframes** (`kf/src/animation/utils.ts:305-317`,
`createInterpVarValue` → `padToLength` pushes `new ValueUnit(0)`). But the FIX is **value-domain
knowledge value.js owns**: value.js must expose the per-CSS-function identity values so the pad can be
identity-aware. Two viable shapes (impl decides):
  1. value.js ships a `FUNCTION_IDENTITY` table / `functionIdentityValue(name, argIndex)` helper that
     kf's pad consults; or
  2. value.js's normalization/flatten produces identity-padded leaves itself (so kf's pad becomes a
     no-op / value.js owns the arity reconciliation in `normalizeValueUnits`).
- **No such table exists in value.js today** (grep for `FILTER_FUNCTION`/`brightness`/identity tables
  in `src/units/constants.ts` + `src/parsing/index.ts` = 0 — the only `brightness` is the
  colorFilter solver at `src/units/color/colorFilter.ts:142`, unrelated).

**Semantics — CSS function identity values (the table value.js must encode).**
- `filter` functions: `brightness(1)`, `contrast(1)`, `saturate(1)`, `opacity(1)`, `grayscale(0)`,
  `sepia(0)`, `invert(0)`, `blur(0)`, `hue-rotate(0deg)`, `drop-shadow(0 0 0 transparent)`.
- `transform` functions: `scale(1)`/`scaleX(1)`/`scaleY(1)`/`scaleZ(1)`, `translate(0)`...,
  `rotate(0deg)`..., `skew(0deg)`....
- The identity is per-function and sometimes per-argument (e.g. `scale` default 1, `translate`
  default 0). The unit matters: `hue-rotate` identity is `0deg`, `blur` is `0px`.

**Edge cases.**
- A function with no defined identity (custom/unknown) → fall back to the current `ValueUnit(0)` (or
  fail-loud). Decide.
- Asymmetric pad (left longer than right and vice versa) — `padToLength` pads whichever is shorter.
- The pad must produce a `ValueUnit` whose `unit`/`superType` match the present side so
  `normalizeValueUnits` (`src/units/normalize.ts:445-446`) reconciles them.

**Witness.** **LIVE kf `it.fails` witness — THE consume signal.**
`../keyframes.js/test/interpolate-anything.test.ts:256`:
```
it.fails("filter brightness pad holds identity 1 at t=0 — value.js MCI-5 not yet consumed", () => {
  expect(paddedBrightnessAt(0)).toBe(1);  // inner FAILS today (resolves 0); it.fails GREEN
});
```
The positive control at `:271` asserts the live wrong behavior `paddedBrightnessAt(0) === 0` (and `1
→ 2` reaching 2 at t=1). When value.js ships MCI-5 and kf re-pins, the slot holds 1, the inner test
PASSES, and `it.fails` **flips RED** — remove the wrapper AND the positive control in the same motion.
Provenance also: A4 §2.3 (MCI-5, "born-GREEN = not consumed") + A4 §4.1 (MCI-5 OPEN) + A4 §7.
The pad seam: `kf/src/animation/utils.ts:316` `out.push(new ValueUnit(0))`.

**Suggested owning module.** A new `FUNCTION_IDENTITY` table in `src/units/constants.ts` (beside
`STYLE_NAMES`/`MatrixValues`) + a `functionIdentityValue(name, argIndex?)` helper in
`src/units/utils.ts`, exported from `src/index.ts`. Coordinate with kf: kf's `padToLength`
(`utils.ts:306`) consumes the helper. **Two-repo coordinated flip** (A4 P2): value.js ships → kf
re-pins → the `it.fails` flips RED → kf removes the wrapper.

**Test sketch (value.js side).**
```ts
expect(functionIdentityValue("brightness").toString()).toBe("1");
expect(functionIdentityValue("blur").toString()).toBe("0px");
expect(functionIdentityValue("hue-rotate").toString()).toBe("0deg");
expect(functionIdentityValue("scale").toString()).toBe("1");
// integration: normalize blur(4px) vs blur(4px) brightness(2) pads brightness slot to identity 1
```
(The biting cross-repo gate is the kf `it.fails` flip, not a value.js unit test.)

---

## 11. (VJ-3) `light-dark()` / `currentColor` sentinels

**Expected API.**
- Parse `currentColor`, `light-dark(a, b)`, and (MED) system colors into **sentinel** values that do
  NOT bake to a fixed RGB — so a downstream consumer (kf) resolves them per-target via the computed
  seam.
- Sentinel shapes named in the charter §5 W9 S6:
  - `currentColor` → `ValueUnit("currentColor", "color-keyword")`
  - `light-dark(c1, c2)` → `FunctionValue("light-dark", [c1, c2])`

**Semantics.**
- Today these **hard parse-fail** in the live parser. The `light-dark()` form is in the BBNF grammar
  (`src/parsing/grammars/css-color.bbnf:90-93` `lightDark = "light-dark" << "(" , color , "," , color
  << ")"`) but the live `dispatch` table has **no `light-dark` branch** (the dispatch table is at
  `src/parsing/color.ts:568-593`; the `l` bucket is `any(labParser, lchParser, nameParser)` at `:572`
  — no `light-dark`). `currentColor` likewise does not parse (it would fall to `nameParser` and fail).
- The sentinel must survive normalization/interpolation WITHOUT being converted to RGB — kf resolves
  it at frame-prep against the **animation target's own** computed `color-scheme` (NOT `:root`'s, NOT
  a global `matchMedia` probe — the binding caveat in charter §F2 / `r-color-l4-l5 §4`). value.js only
  emits the sentinel; the per-target resolution is kf's FOLD (kf BOOK).

**Edge cases.**
- `light-dark()` nested inside other functions / as a gradient stop.
- `currentColor` as the whole value vs inside `color-mix(in oklab, currentColor, red)`.
- System colors (`Canvas`, `CanvasText`, `LinkText`, …) — MED priority; may be a follow-on.
- Feature-detect for sub-Baseline `light-dark()` (Baseline 2024-05-13) is a kf concern, not value.js.
- The dispatch-table addition must remain **byte-identical** for all currently-parsing inputs (the `l`
  and `c`(urrentColor starts with `c`) buckets gain a branch but named colors must still resolve —
  mirror the F7/A1 "nameParser retained last" discipline).

**Witness.** **DERIVED (no kf runtime witness).** Provenance: A4 §2.3 (F2/F2b
ASKED-NOT-SHIPPED, "`light-dark()` is in the BBNF grammar `css-color.bbnf:90-93` but not in the live
parser") + A4 §4.1 (F2 OPEN, "Not in live parser"). Charter cite:
`valuejs-sota-handoff-v2.md` Wave-F F2 + §5 W9 S6 (`color.ts:556-571`; `css-color.bbnf:90-124`),
**HIGH (currentColor / light-dark)**. **Live confirm:** no `light-dark` branch in the
`src/parsing/color.ts:568-593` dispatch table.

**Suggested owning module.** `src/parsing/color.ts` — add a `light-dark` parser to the `l`-letter
bucket (`:572`) and a `currentColor` keyword to the `c`-bucket / `nameParser` path (`:569`), plus the
sentinel `superType` `"color-keyword"`. The sentinel `ValueUnit`/`FunctionValue` constructors are in
`src/units/index.ts`. Note: `contrast-color()` (F2b) is a **separate** richer item — do NOT alias to
`safeAccentColor` (`src/units/color/contrast.ts:90`); the charter (§F2b) binds two distinct surfaces.
F2b is MED/BOOK, likely out of this 12-item slice.

**Test sketch.**
```ts
const cc = parseCSSColor("currentColor");
expect(cc.unit).toBe("color-keyword");
expect(cc.value).toBe("currentColor"); // NOT baked to an RGB triple
const ld = parseCSSColor("light-dark(white, black)").value as FunctionValue;
expect(ld.name).toBe("light-dark");
expect(ld.values).toHaveLength(2);
// regression: 'lavender' (an l-bucket named color) still parses to its RGB
expect(parseCSSColor("lavender").value).toBeInstanceOf(RGBColor);
```

---

## 12. (perf-truth — N.W7.B, recorded for completeness, NOT a W7.A API item)

The N.md W7 row item B ("perf-truth") and item C (cut 0.12.0) are **not** parser/library API asks —
they are the perf-routing + dist-hygiene + release lane (route demo `mixColors` onto the frozen-plan
path or demote `lerpArray`; evict prettier from dist; prune flat direct paths; endpoint-cache B3
fixes; F7 doc/test; predispatch dedup). They are recorded here so the three impl lanes know they are
NOT in the W7.A API-recon scope. The `lerpArray` SoA primitive (D2) is **already shipped**
(`src/math.ts:48`, exported `src/index.ts:175`, A4 §2.1) — perf-truth decides whether to wire the
demo onto it or demote it, not re-implement it.

---

## 13. OUT-OF-SLICE — parse-that `^0.9` re-pin (W7.B scope, per N.md note)

**Recorded as OUT-OF-SLICE.** N.md W7 lists "parse-that `^0.9` re-pin" but the row itself annotates it
`[NOTE: the re-pin is W7.B scope — record it as out-of-slice]`. It is a `package.json` dependency bump,
not a library API.
- **Live state:** value.js pins `"@mkbabb/parse-that": "^0.8.2"` (`package.json:62`); installed
  `node_modules/@mkbabb/parse-that` is `0.8.2`. keyframes pins `^0.9.0` (`kf/package.json:178`),
  installed `0.9.0`. This is the dual-realm gap (A4 §3.3, §6.3, §8 P0).
- **Why it matters to W7.A:** the VJ-F2 diagnostics sink (§8) wants parse-that's instance-threaded
  error-state (PT-WAVE-1), which lands in parse-that `^0.9.x`. So the diagnostics impl may **depend
  on** this re-pin landing first. Coordinate §8 with W7.B; if `^0.9.0` is not yet re-pinned when §8 is
  built, §8 ships a coarse sink and sharpens after the bump.
- **Disposition:** W7.B. Not built by the three W7.A impl lanes.

---

## 14. ADJACENT — SEAM-4 `rotate()` shorthand byte-witness (NOT one of the 12, recorded as a free flip)

Found while sweeping for `it.fails`. **NOT** in the N.md W7 12-item ledger, but a live born-RED kf
witness that flips when value.js fixes `rotate()` shorthand normalization — recorded so an impl lane
that touches transform flatten knows it exists.
- **Witness:** `../keyframes.js/test/serialize-from-template.test.ts:143`
  `it.fails("AUTHORED rotate(45deg) serializes byte-verbatim as rotate(45deg)")`. Positive control at
  `:158` asserts the live expansion: value.js's flatten expands 2D `rotate(45deg)` into
  `transform.rotateX / rotateY / rotateZ` (`:166-170`) — a DIFFERENT transform.
- **The value.js bug:** `src/units/utils.ts` `unpackMatrixValues` / the transform expansion expands a
  bare 2D `rotate(deg)` to all three axes instead of `rotateZ`. A4 §7 records SEAM-4 as
  ASKED-NOT-SHIPPED (kf J ask, `it.fails` present).
- **Disposition:** NOT a W7.A 12-item deliverable. Flag to the impl lane that touches transform
  decomposition (this overlaps F1 "unify matrix decompositions", also out-of-slice). Record only.

---

## Appendix — item → owning-module → witness-class quick map

| # | Item (N.md ledger id) | Owning module (suggested) | Witness |
|---|---|---|---|
| 1 | E1 `linear()` parser | `src/parsing/index.ts` (or new `parsing/easing.ts`) | DERIVED (kf shim `utils.ts:106-130` is consume target) |
| 2 | E2 `steps()` parser | same as E1 | DERIVED |
| 3 | B1 `toAnimationString` | `src/units/color/index.ts` (`Color` base, beside `:212`) | DERIVED (kf grep = 0) |
| 4 | B2 output-space emit | `src/units/color/index.ts` + `constants.ts` (family table) | DERIVED |
| 5 | B4 P3 egress gamut | `src/units/color/{dispatch,gamut}.ts` + `conversions/{direct,xyz-extended}.ts` | DERIVED |
| 6 | F3/VJ-F6 LRU memoize | `src/utils.ts` (`memoize`, FIFO at `:147`) | DERIVED |
| 7 | VJ-F1 path sampler | new `src/transform/path.ts` | DERIVED (kf `FB-3 MorphSVG`); BOOK-candidate |
| 8 | VJ-F2 diagnostics sink | `src/parsing/{utils,index}.ts` (`parseState` `:69,87`) | DERIVED; gated on §13 re-pin |
| 9 | VJ-F4/F8 buffer-reuse unflatten | `src/units/utils.ts` (`unflattenObjectToString:115`) | DERIVED |
| 10 | MCI-5 identity-aware pad | new `FUNCTION_IDENTITY` in `src/units/constants.ts` + `utils.ts` helper | **LIVE** `interpolate-anything.test.ts:256` |
| 11 | VJ-3 light-dark/currentColor sentinels | `src/parsing/color.ts` (dispatch table `:568-593`) | DERIVED (BBNF `css-color.bbnf:90-93`) |
| — | parse-that `^0.9` re-pin | `package.json:62` | OUT-OF-SLICE (W7.B) |
| — | SEAM-4 rotate() shorthand | `src/units/utils.ts` transform expansion | ADJACENT (not in 12); `serialize-from-template.test.ts:143` |

**Lanes that build from this sheet (suggested partition):**
- **Parse/easing lane:** §1 (E1), §2 (E2), §8 (VJ-F2 diagnostics), §11 (VJ-3 sentinels).
- **Color/serialize lane:** §3 (B1), §4 (B2), §5 (B4).
- **Numeric/perf lane:** §6 (F3 LRU), §9 (VJ-F4 unflatten), §10 (MCI-5 — coordinate the kf flip).
- **VJ-F1 path sampler (§7):** sized separately; BOOK-or-cut decision belongs to the dispatching agent.

---

## W7.A Verification

**Verifier lane:** N.W7.A verification. **Date:** 2026-06-11. **Branch:** `tranche-f-handoff` HEAD `0cb5dd2`.
**Gates run:** `npx vitest run` (1702 passed / 41 files) · `npm run build` (green) · `npm run lint` (exit 0) · `npm run typecheck` (vue-tsc lib + demo, exit 0).
**Trivial test-only fixes:** none (no src/ edits; no test edits needed).
**Cross-repo fidelity checked (2 per slice):** E1 kf-shim fidelity · MCI-5 kf `padToLength` witness.

### Per-item verdict table

| # | Item | Owning file(s) | Exported | Tests | Verdict |
|---|------|----------------|----------|-------|---------|
| 1 | E1 `parseLinearStops` | `src/parsing/easing.ts:78` | `src/index.ts:232` | `test/parsing-easing.test.ts` — 20 tests (11 in E1 describe) | **GREEN** |
| 2 | E2 `parseSteps` / `StepsArgs` / `JumpTerm` | `src/parsing/easing.ts:132` | `src/index.ts:232-233` | `test/parsing-easing.test.ts` — 20 tests (9 in E2 describe) | **GREEN** |
| 3 | B1 `Color.toAnimationString` (zero-alloc) | `src/units/color/index.ts:399` (`ANIMATION_SCRATCH:75`, `formatAnimationNumber:37`) | method on exported class; in `dist/units/color/index.d.ts` | `test/color-emit.test.ts` — 7 B1 tests | **GREEN** |
| 4 | B2 output-space emit + `cssColorInterpKeyword` | `src/units/color/dispatch.ts:334`; `src/units/color/constants.ts:235,256` | `src/index.ts:95-96,138` | `test/color-emit.test.ts` — 7 B2 + 3 interpKeyword tests | **GREEN** |
| 5 | B4 P3 egress gamut (`gamutMap` target-space) | `src/units/color/dispatch.ts:269` (`RGB_GAMUT_SPACES:201`, `gamutMapToRgbSpace:223`) | internal; called from `convertColorSpaceDenorm` | `test/color-emit.test.ts` — 5 B4 tests | **GREEN** |
| 6 | F3/VJ-F6 LRU `memoize` | `src/utils.ts:125-165` | no new export; `memoize` already exported | `test/utils.test.ts` — 3 LRU/maxCacheSize tests | **GREEN** |
| 7 | VJ-F1 path sampler (`PathGeometry`, `getTotalLength`, `getPointAtLength`) | `src/transform/path.ts` (new) | `src/index.ts:335` | `test/path-geometry.test.ts` — 18 tests | **GREEN** |
| 8 | VJ-F2 diagnostics sink (`ParseDiagnostic`, `OnParseError`) | `src/parsing/utils.ts:65,80` (`buildDiagnostic:88`, `tryParse` + `parseResult` wired) | `src/index.ts:313` (types) | `test/diagnostics-sink.test.ts` — 8 tests | **GREEN** |
| 9 | VJ-F4/F8 buffer-reuse `unflattenObjectToString` | `src/units/utils.ts:188` (optional `out` arg) | already exported `src/index.ts:27` | `test/unit-utils.test.ts` — 5 unflatten-reuse tests | **GREEN** |
| 10 | MCI-5 `FUNCTION_IDENTITY` + `functionIdentityValue` | `src/units/constants.ts:128`; `src/units/utils.ts:71` | `src/index.ts:25,39` | `test/unit-utils.test.ts` — 7 MCI-5 tests | **GREEN** |
| 11 | VJ-3 `currentColor` / `light-dark()` sentinels | `src/parsing/color.ts:568-617` (`currentColorParser`, `lightDarkParser`, dispatch-bucket wiring); `src/units/constants.ts:62` (`COLOR_UNITS`) | via `parseCSSColor` (already exported) | `test/color-sentinels.test.ts` — 13 tests | **GREEN** |
| — | parse-that `^0.9` re-pin | `package.json:62` (still `^0.8.2`) | — | — | OUT-OF-SLICE (W7.B) |

### Cross-repo fidelity notes

**E1 semantic fidelity (parse/easing slice).**
kf's local shim (`keyframes.js/src/animation/utils.ts:106-130`) is a manual CSV parser that splits on `,` then whitespace, strips the `%` suffix, and pushes `{ output, input }` stops. value.js's `parseLinearStops` uses the `sepBy` combinator over a `all(number, percentage.opt(), percentage.opt())` grammar — semantically equivalent: both emit raw stops without resolving gaps (resolution deferred to `cssLinear`). Flat-segment stops (two percentages) produce two `LinearStop`s sharing `output` in both implementations. The kf shim requires `stops.length >= 2`; value.js requires at least 1 stop (the `sepBy(comma, 1)` minimum). This is a soft divergence — kf's shim predates E1 and has a stricter lower bound; the authoritative value.js version accepts single-stop `linear()` (which the CSS spec permits). The kf shim is the **consume target**, not the reference; value.js is the spec-conformant implementation.

**MCI-5 live witness fidelity.**
`keyframes.js/test/interpolate-anything.test.ts:256` `it.fails("filter brightness pad holds identity 1 at t=0 — value.js MCI-5 not yet consumed")` is confirmed GREEN (inner `expect(paddedBrightnessAt(0)).toBe(1)` fails against the live `new ValueUnit(0)` at `kf/src/animation/utils.ts:316`). value.js now ships `functionIdentityValue("brightness").toString() === "1"` and `FUNCTION_IDENTITY`. The kf pad re-wire (replace `new ValueUnit(0)` with `functionIdentityValue(fnName) ?? new ValueUnit(0)`) is kf BOOK; the `it.fails` witness flips RED on that re-pin. value.js produces the correct answer; the two-repo flip is pending kf's side.

### Gate summary

| Gate | Result |
|------|--------|
| `npx vitest run` | **1702 passed / 41 files** (up from 1607 pre-W7; +95 net new tests) |
| `npm run build` | **green** (140 kB ESM; `.d.ts` flat layout; all new exports in `dist/index.d.ts`) |
| `npm run lint` | **exit 0** |
| `npm run typecheck` | **exit 0** (vue-tsc lib + demo strict-zero) |

**Overall verdict: GREEN. All 11 in-slice items implemented, exported, and tested. No gaps. No src/ edits needed by this verification lane.**
