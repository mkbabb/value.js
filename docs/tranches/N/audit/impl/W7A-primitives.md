# N.W7.A-3 — the primitives slice (F3/VJ-F6, VJ-F1, VJ-F2, VJ-F4, MCI-5)

**Lane:** W7A-3 (impl). **Date:** 2026-06-11. **Branch:** `tranche-f-handoff`.
**Owner-scope honoured:** `src/**` + `test/**` only. No `package.json`, no
`vite.config.ts`, no `demo/`, no `api/`. Sibling repos read-only. No git
commit/push.
**Spec sheet:** `docs/tranches/N/audit/impl/W7A-recon.md` §6 (F3/VJ-F6), §7
(VJ-F1), §8 (VJ-F2), §9 (VJ-F4), §10 (MCI-5).
**Prior slices:** W7A-1 parsers (E1/E2/VJ-3) green; W7A-2 emit (B1/B2/B4) green
(1662 tests at slice start).

Five primitives landed: the LRU bound on `memoize`, the DOM-free path-geometry
sampler, the pluggable structured diagnostics sink, the buffer-reusing
`unflattenObjectToString`, and the identity-aware fn-arity pad. Every new public
symbol exports through the `src/index.ts` barrel; every feature carries vitest
coverage. Zero new `as any` / `as unknown as`.

---

## (1) F3 / VJ-F6 — LRU bound on `memoize`

**What landed.** `memoize` (`src/utils.ts`) eviction changed from FIFO to LRU. A
`Map` preserves insertion order, so `cache.keys().next().value` is the
first-inserted key. FIFO dropped that key outright; LRU now **promotes a key to
most-recently-used on every cache hit** (`cache.delete(key); cache.set(key,
cached)` re-appends it to the tail), so the head is always the
least-recently-*used* key. Under a flood exceeding `maxCacheSize`, a hot
(recently-touched) key survives where FIFO would evict it.

**Where.** `src/utils.ts:125-165` — the hit branch promotes; the eviction reads
the LRU head (renamed `oldestKey` → `lruKey`). Composes with the C4
`ttl === Infinity` no-clock fast path (promotion is independent of TTL — it only
reorders). No new export (the `MemoizeOptions` type already ships).

**Tests** (`test/utils.test.ts`, `describe("maxCacheSize (LRU — F3 / VJ-F6)")`):
`evicts the least-recently-used entry` (the no-touch case = FIFO-equivalent,
preserved) · **`promotes a touched key so it survives a flood (LRU, not FIFO)`**
(the biting gate: `f(1); f(2); f(1)/*touch*/; f(3)/*evict*/` → key 1 survives,
key 2 evicted — FIFO fails this) · `a cache hit reorders but does not change
size`.

---

## (2) VJ-F1 — path-geometry sampler

**What landed.** A new pure value-domain module `src/transform/path.ts` — the
DOM-free `getTotalLength` / `getPointAtLength` of `SVGGeometryElement`. Parses an
SVG `<path>` `d` string into absolute drawing segments, flattens curves
adaptively, builds a cumulative arc-length table, and samples a point (plus a
tangent angle for `rotate: auto`) at a given length or normalized `t`.

**Surface.**
- `class PathGeometry` — parse a `d` string ONCE; `getTotalLength()`,
  `getPointAtLength(length)`, `getPointAtT(t)`, `sampleAtLength(length)`
  (returns `{x, y, angle}`). The cumulative table is built at construction, so
  repeated sampling is a binary search + local interpolation.
- `getTotalLength(d)` / `getPointAtLength(d, length)` — one-shot free functions
  (parse-per-call; the recon's `SVGGeometryElement`-shaped names).
- types `Point`, `PathSample` (point + tangent `angle` in radians).

**Coverage of the grammar.** All commands `M/L/H/V/C/S/Q/T/A/Z` + their relative
lowercase forms; the smooth shortcuts `S`/`T` (implied control point reflects the
previous one, or coincides with the current point when the prior command was not
the matching curve); elliptical arcs `A` via the endpoint→center
parameterization (SVG 1.1 §F.6.5) with the out-of-range radius correction
(§F.6.6) and the large-arc/sweep flags; multiple subpaths (multiple `M`); closed
subpaths (`Z`). Cubic/quadratic Béziers are flattened by adaptive recursive
de Casteljau subdivision against a `0.1px` flatness tolerance (quadratics elevate
to cubics); arcs sample the parametric ellipse with segment count scaled by the
angular sweep. Length clamps to `[0, totalLength]` (over-long → endpoint,
negative → start); degenerate single-point paths return length 0.

**Where.** `src/transform/path.ts` (new, the sibling of `decompose.ts`'s matrix
geometry). Barrel: `src/index.ts` — `PathGeometry`, `getTotalLength`,
`getPointAtLength` + the `Point`/`PathSample` types.

**Scope decision.** The recon §7 flagged VJ-F1 as a BOOK-candidate (largest
net-new item). The N.md W7 row lists it as a full 12-item-ledger deliverable and
the lane assignment named it explicitly, so it shipped **in full** (the tranche
targets zero-deferral close). It is a pure-value-domain module with no DOM
coupling, so it adds no boot/runtime risk.

**Tests** (`test/path-geometry.test.ts`, 18): line/L-shape/closed-square/relative
lengths · quarter-circle arc length within tolerance · midpoint + cross-boundary
point sampling · clamp at 0 / over-long / negative · cubic endpoint + symmetric
midpoint · `PathGeometry` reuse + `getPointAtT` · `S`/`T` smooth shortcuts reach
the endpoint · tangent angle (0 along +x, π/2 up +y) · `H`/`V` commands.

---

## (3) VJ-F2 — pluggable structured diagnostics sink

**What landed.** A typed, opt-in `OnParseError` sink threaded through the parse
entry points `tryParse` / `parseResult` (`src/parsing/utils.ts`), producing a
csstree-`onParseError`-shaped `ParseDiagnostic` `{ message, offset, line, column,
expected?, input }` on a failed parse — replacing value.js's historical
silent-swallow / `console.error`.

**Where.** `src/parsing/utils.ts`:
- `interface ParseDiagnostic` + `type OnParseError` (exported).
- `buildDiagnostic(state, input)` — reads the parse-that `ParserState`'s
  `furthest ?? offset`, `expected`, and `getLineAndColumn`, builds the structured
  record (the `expected` field is attached only when present, per
  `exactOptionalPropertyTypes`).
- `tryParse(parser, input, onParseError?)` — emits to the sink BEFORE the throw
  (the fail-loud contract is preserved; the throw still fires).
- `parseResult(parser, input, onParseError?)` — emits on failure; the
  `{status, value}` shape is unchanged. Both sink args are optional, so every
  existing 2-arg caller is unaffected.
- Barrel: `src/index.ts` — the `ParseDiagnostic`/`OnParseError` types.

**parse-that surface honesty (recon §8/§13).** value.js pins parse-that
`^0.8.2` (the `^0.9` re-pin is W7.B scope, OUT-OF-SLICE per recon §13). The
installed `0.8.2` `ParserState` ALREADY carries `offset`, `furthest`, `isError`,
`expected?: string[]`, and `getLineAndColumn` — so the sink ships a properly
structured diagnostic TODAY, NOT a coarse stub. The one limitation measured
live: `0.8.2` rolls `furthest`/`offset` back to 0 on a `.then()` failure (the
deep-reach offset is not threaded through `then`); the `expected` set IS
reliable (`["/px/"]` correctly names what the grammar required). The diagnostic
surfaces whatever the state carries — the **offset sharpens automatically** when
W7.B re-pins to `^0.9` (PT-WAVE-1 threads `furthest` to the deepest reach), with
no value.js change required. The test documents this explicitly.

**Consume target.** keyframes.js `ResolvedKeyframes.diagnostics`
(`kf/src/animation/adapter.ts:18` — a field that does not yet exist; value.js
ships the producing surface, kf adds the field — kf BOOK).

**Tests** (`test/diagnostics-sink.test.ts`, 8): structured diagnostic on a
failed `tryParse` · throws-AND-emits (fail-loud) · success emits nothing ·
`parseResult` emits but keeps `{status,value}` · success leaves the sink
untouched · the sink is optional (2-arg callers unaffected) · surfaces the
`expected`-parser set for a multi-token grammar (with the offset-sharpens-at-
re-pin note) · no `console.error` on a failed parse (spy assertion — the F7
discipline).

---

## (4) VJ-F4 / F8 — buffer-reusing `unflattenObjectToString`

**What landed.** `unflattenObjectToString` (`src/units/utils.ts`) gained an
optional second `out` argument: a caller-supplied reuse target that is **cleared
and re-filled in place**, so a steady rAF serialize loop allocates no fresh
object per frame (the recon §9 "real per-frame garbage the W7 Strand-B diff-skip
chased"). The output is **byte-identical** to the no-arg form — the `.trim()`,
the leading-space join, and the single-key `values.toString()` shape are all
preserved exactly; the reuse path is purely opt-in.

**Where.** `src/units/utils.ts:115-...` — `result = out ?? {}`, then a stale-key
sweep (`for (k of Object.keys(out)) delete out[k]`) when a reuse target is
supplied, so a prior frame's top-level key cannot leak. The no-arg signature is
unchanged (default fresh `{}`); already exported via `src/index.ts:27`.

**Tests** (`test/unit-utils.test.ts`, `describe("unflattenObjectToString
(VJ-F4 …)")`, 5): nested key → CSS function shorthand · writes into the supplied
map (returns the same object) · byte-identical with vs without the reuse target
(isomorphism) · clears a stale key from a prior frame on reuse · preserves the
single-key (no-nesting) `value.toString()` shape.

---

## (5) MCI-5 — identity-aware fn-arity pad — **the live kf `it.fails` witness**

**What landed.** value.js now owns + exposes the per-CSS-function **identity
value** so an interpolation arity pad can be identity-aware. When one endpoint
has more filter/transform functions than the other (`filter: blur(4px)` vs
`blur(4px) brightness(2)`), the shorter side's absent slot must be padded with
the absent function's CSS identity — `brightness(1)`, NOT `new ValueUnit(0)` —
so the slot lerps `1 → 2` and holds the no-op `1` at `t=0` instead of `0`
(black, silent-wrong).

**Shape chosen (recon §10 offered two).** Shape #1: value.js ships the table +
helper; the keyframes pad consults it. This keeps the pad decoupled and the
identity knowledge value-domain-owned, exactly as the recon's value.js-side test
sketch specifies (`functionIdentityValue("brightness").toString() === "1"`).

**Where.**
- `src/units/constants.ts` — `FUNCTION_IDENTITY: Readonly<Record<string,
  {value: number; unit?: string}>>`: the `<filter-function>` /
  `<transform-function>` identities (`brightness`/`contrast`/`saturate`/`opacity`
  → 1; `grayscale`/`sepia`/`invert` → 0; `blur` → `0px`; `hue-rotate` → `0deg`;
  `scale*` → 1; `translate*` → `0px`; `rotate*`/`skew*` → `0deg`). Composite
  `drop-shadow`/`perspective` are intentionally absent (no single-scalar
  identity). Exported via the barrel.
- `src/units/utils.ts` — `functionIdentityValue(name, argIndex?):
  ValueUnit<number> | undefined`. Materialises the table entry into a
  `ValueUnit` carrying the identity unit + a parser-matching `superType`
  (`superTypeForUnit` helper mirrors `src/parsing/units.ts`: `blur` →
  `["length","absolute"]`, `hue-rotate` → `["angle"]`, multipliers →
  `undefined`), so `normalizeValueUnits` reconciles the padded slot with its
  present sibling. Returns `undefined` for an unknown / no-single-scalar
  function — the kf pad then falls back to its prior `ValueUnit(0)` (no worse
  than pre-MCI-5). `argIndex` is accepted for multi-arg symmetry (currently
  every supported fn's positional args share one identity scalar). Exported via
  the barrel.

**Witness — the cross-repo flip.** `../keyframes.js/test/interpolate-anything.test.ts:256`
`it.fails("filter brightness pad holds identity 1 at t=0 — value.js MCI-5 not
yet consumed")` is GREEN today (its inner `expect(paddedBrightnessAt(0)).toBe(1)`
fails against the live `ValueUnit(0)` pad at `kf/src/animation/utils.ts:316`).
value.js has now shipped the producing surface; when keyframes re-pins and routes
its `padToLength` through `functionIdentityValue`, the slot holds 1, the inner
assertion PASSES, the `it.fails` flips RED → kf removes the wrapper AND its
positive control. **value.js owns the producer; the pad re-wire + the witness
flip are kf BOOK** (two-repo coordinated flip, A4 P2). Confirmed the kf seam is
unchanged (sibling read-only): `padToLength` still `out.push(new ValueUnit(0))`.

**Tests** (`test/unit-utils.test.ts`, `describe("functionIdentityValue
(MCI-5 …)")`, 7): multiplier identity 1 (brightness/contrast/saturate/opacity) ·
proportion identity 0 (grayscale/sepia/invert) · dimensioned (blur 0px,
hue-rotate 0deg) · transform identities (scale 1, translate 0px, rotate/skew
0deg) · the `ValueUnit` unit + superType match a parsed sibling · `undefined`
for no-single-scalar (drop-shadow/perspective/unknown) · the brightness identity
holds 1 at t=0 when lerped 1→2 (the value-domain half of the kf flip).

---

## Gate outputs

- `npx vitest run` → **1702 passed (41 files)** — up from 1662 by the 40 new
  tests this slice adds (path-geometry 18, diagnostics-sink 8, functionIdentity
  7 + unflatten-reuse 5 in unit-utils, LRU 2 net + reordering in utils). ALL
  green; zero regression.
- `npm run build` → **green**; `.d.ts` emitted; the barrel exports
  `PathGeometry`/`getTotalLength`/`getPointAtLength`/`functionIdentityValue`/
  `FUNCTION_IDENTITY`/`ParseDiagnostic`/`OnParseError` resolve in
  `dist/index.d.ts`.
- `npm run lint` → **exit 0** (`eslint . --max-warnings=0`).
- `npx tsc --noEmit -p tsconfig.lib.json` → **exit 0** (library typecheck clean).

## Files touched

- `src/utils.ts` — F3/VJ-F6 LRU eviction (hit-promote + LRU-head evict).
- `src/transform/path.ts` (new) — VJ-F1 path-geometry sampler.
- `src/parsing/utils.ts` — VJ-F2 `ParseDiagnostic`/`OnParseError` + the sink
  threaded through `tryParse`/`parseResult`.
- `src/units/utils.ts` — VJ-F4 `out` reuse arg on `unflattenObjectToString`;
  MCI-5 `functionIdentityValue` + `superTypeForUnit`.
- `src/units/constants.ts` — MCI-5 `FUNCTION_IDENTITY` table.
- `src/index.ts` — barrel exports for all five items.
- `test/utils.test.ts` — LRU eviction + promotion coverage.
- `test/unit-utils.test.ts` — `functionIdentityValue` (7) + `unflattenObjectToString`
  reuse (5) coverage.
- `test/path-geometry.test.ts` (new) — VJ-F1 coverage (18).
- `test/diagnostics-sink.test.ts` (new) — VJ-F2 coverage (8).

## Type discipline

- **Zero new `as any`; zero new `as unknown as`** in any touched `src/` file
  (grep-verified). The path module is fully typed; the diagnostic builder narrows
  off a structural type, not a cast; `functionIdentityValue` flows through the
  `ValueUnit<number>` generic; the unflatten reuse path is `Record<string,string>`
  throughout.

## Notes for downstream / coordination

- **MCI-5 is the one live cross-repo flip.** keyframes.js must (a) re-pin to the
  value.js that ships `functionIdentityValue`, (b) route `padToLength`
  (`kf/src/animation/utils.ts:306,316`) through it (push
  `functionIdentityValue(fnName) ?? new ValueUnit(0)` instead of the bare
  `ValueUnit(0)`), (c) on the flip, remove the `it.fails` wrapper + its positive
  control at `interpolate-anything.test.ts:256/271`. Notify at 0.12.0.
- **VJ-F2 sharpens at the parse-that `^0.9` re-pin** (W7.B / recon §13) — the
  sink's offset becomes deep-reach-accurate with no value.js code change; the
  `expected` set is already accurate at `0.8.2`.
- **VJ-F1 consumers** (kf MotionPath / MorphSVG / DrawSVG, recon §7 `FB-3`) get
  DOM-free `getTotalLength`/`getPointAtLength`/`sampleAtLength` (with the
  `rotate: auto` tangent angle) — kf BOOK.
- **VJ-F4 / F3 are internal perf primitives** with no consumer flip — the demo
  + kf serialize/parse-cache paths can adopt the `out` reuse arg / the finite
  `maxCacheSize` cap when N.W7.B (perf-truth) wires them.
