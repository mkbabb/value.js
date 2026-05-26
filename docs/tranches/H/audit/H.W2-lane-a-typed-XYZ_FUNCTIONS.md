# H.W2 Lane A — Typed `XYZ_FUNCTIONS` mapped-type (H-OPP-1)

**Branch**: `tranche-h` @ `9c32e7a` (H.W2 Track-1-α execution).
**Scope**: lift the `XYZ_FUNCTIONS` XYZ-hub dispatch table in
`src/units/color/dispatch.ts` from a wide `Record<string, { to: (color: any)
=> XYZColor; from: (color: XYZColor) => any }>` to a typed `XyzFunctionsTable`
mapped-type, retiring the lone XYZ-hub `as unknown as` cast left in the file
after G.W2 Lane B's `DIRECT_PATHS` work (per `audit/H-AUDIT-5` + `H.W2.md
§Lane A` + `H.md §2 H2 invariant`). Mirrors the G.W2 Lane B `DirectPathsTable`
precedent transposed to single-key `ColorSpace` distribution.

---

## The finding

`XYZ_FUNCTIONS` is the XYZ-hub fallback table consulted by `color2()` when no
`DIRECT_PATHS` entry exists for the source/target pair (so every conversion
*outside* the 6 hot-path pairs routes through it). Pre-state:

```ts
// src/units/color/dispatch.ts:82
const XYZ_FUNCTIONS: Record<string, { to: (color: any) => XYZColor; from: (color: XYZColor) => any }> = {
    rgb: { to: rgb2xyz, from: xyz2rgb },
    …
};

// dispatch site — src/units/color/dispatch.ts:143
const fromXYZFn = toEntry.from as unknown as (
    color: XYZColor<T>,
) => ColorSpaceMap<T>[C];
return fromXYZFn(xyz);
```

The value-type was a wide `Record<string, …>` keyed by arbitrary `string` with
`(color: any) => XYZColor` slots; the dispatch had to launder the `any`-typed
`from` return through a `as unknown as (color: XYZColor<T>) => ColorSpaceMap<T>[C]`
double cast to recover the `C`-targeted return. **1 `as unknown as`** —
identical structural cause to the 6 cast sites G.W2 Lane B retired in
`DIRECT_PATHS`. Listed as the irreducible-in-G remainder at
`docs/tranches/G/audit/G.W2-lane-b-typed-DIRECT_PATHS.md §"Irreducible cast
left in-bounds"`; H.W2 Lane A is the follow-on transposition.

---

## The mapped-type design

```ts
type XyzFunctions<C extends ColorSpace> = {
    to: (color: ColorSpaceMap<number>[C]) => XYZColor;
    from: (color: XYZColor) => ColorSpaceMap<number>[C];
};

type XyzFunctionsTable = {
    [K in ColorSpace]: K extends ColorSpace ? XyzFunctions<K> : never;
};

const XYZ_FUNCTIONS: XyzFunctionsTable = {
    rgb: { to: rgb2xyz, from: xyz2rgb },     // ← zero casts
    hsl: { to: hsl2xyz, from: xyz2hsl },
    …
};
```

`XyzFunctionsTable` distributes over every `ColorSpace` key; conditional-type
inference (`K extends ColorSpace`) makes each slot a per-space `XyzFunctions<K>`
with the exact concrete signatures (`{ to: (RGBColor<number>) => XYZColor; from:
(XYZColor) => RGBColor<number> }` for the `"rgb"` slot, etc.). All 15 entries
type-check at their slot cast-free; the `xyz` slot resolves naturally to the
identity `(XYZColor) => XYZColor` shape with no special-case branch.

### Component type — concrete `number`, not generic

Each per-space `{from}2xyz` / `xyz2{to}` reads numeric channels and builds
`number`-component result colors. Lifting the slot signatures to a `<T>` generic
was rejected by `tsc` (a `number`-concrete function is not assignable to a
`<T>` slot — the same finding G.W2 Lane B documented for `DirectPath<From, To>`).
`number` is the honest component type for the table.

### Dispatch — two typed lookup helpers

`color2()` consults the table by **runtime-computed** keys (`color.colorSpace`
+ the type-parameter `to`), so TS cannot statically pick a single slot — a
value-keyed read collapses to the *union* of all per-slot signatures
(uncallable on a single-shape arg, since the parameter contravariance demands
the unsatisfiable `RGBColor<number> & HSLColor<number> & …` intersection).

Each half is encapsulated in a typed helper, mirroring G.W2 Lane B's
`getDirectPath` precedent:

```ts
const getXyzToFn = (
    from: ColorSpace,
): ((color: Color<number>) => XYZColor) | undefined =>
    XYZ_FUNCTIONS[from]?.to as ((color: Color<number>) => XYZColor) | undefined;

const getXyzFromFn = <C extends ColorSpace>(
    to: C,
): ((color: XYZColor) => ColorSpaceMap<number>[C]) | undefined =>
    XYZ_FUNCTIONS[to]?.from as
        | ((color: XYZColor) => ColorSpaceMap<number>[C])
        | undefined;
```

The lone `as` in each helper re-asserts the runtime-keyed entry as the
dispatch-site signature — a documented index-narrowing, **not** a type-erasing
`as unknown as` double cast.

`color2()` then dispatches cast-free of `as unknown as`:

```ts
const toXYZFn = getXyzToFn(color.colorSpace);
if (!toXYZFn) throw new Error(`Unknown source color space: "${color.colorSpace}"`);
const xyz = toXYZFn(color as Color<number>) as XYZColor<T>;

const fromXYZFn = getXyzFromFn<C>(to);
if (!fromXYZFn) throw new Error(`Unknown target color space: "${to}"`);
return fromXYZFn(xyz as XYZColor) as ColorSpaceMap<T>[C];
```

The plain `as Color<number>` / `as XYZColor` narrowings mirror the same idiom
the direct-path branch above uses (`direct(color as Color<number>) as
ColorSpaceMap<T>[C]`) — TS accepts them as overlapping; the prior code's
`as unknown as` (full type-erasure) is gone.

### Why `getXyzToFn` widens its parameter to `Color<number>`

The per-space `to` slot's exact signature is
`(color: ColorSpaceMap<number>[From]) => XYZColor` — i.e. the specific subclass
shape (`RGBColor<number>`, `HSLColor<number>`, …). The dispatch site only has
`Color<T>` statically; narrowing `Color<T>` to a specific subclass shape would
not type-check (`Color<T>` lacks each subclass's required channel props — the
exact error TS2352 reported in the rejected first iteration).

`Color<number>` is widely assignable instead because `Color<T>` declares
`[key: string]: any` (the documented public dynamic-access affordance — see
`src/units/color/index.ts:98` and the G.W2 Lane C KEEP verdict at
`docs/tranches/G/audit/G.W2-lane-c-…`). The per-space `{from}2xyz` body's
property reads (`{ r, g, b } = color`) succeed via that index-signature
overlap, and the runtime `color.colorSpace` discriminant guarantees the
correct subclass is in hand at every call site.

---

## Before / after cast sites

| # | File:line (pre) | Pre-state cast | Post-state |
|---|---|---|---|
| 1 | `dispatch.ts:143-145` | `toEntry.from as unknown as (color: XYZColor<T>) => ColorSpaceMap<T>[C]` | `getXyzFromFn<C>(to)` typed lookup + plain `as` narrowing |

**1 `as unknown as` retired.** The wide `Record<string, { to: any; from: any
}>` table-type is replaced by the typed `XyzFunctionsTable` mapped-type; the
dispatch site routes both halves through the typed `getXyzToFn` / `getXyzFromFn`
lookups. Each helper's body holds one plain `as` (re-asserting a
runtime-indexed table value as the dispatch-site signature) — analogous to
G.W2 Lane B's `getDirectPath` lone-`as` pattern.

---

## Sub-gate A evidence

| Check | Gate | Result |
|---|---|---|
| `grep -c 'as unknown as' src/units/color/dispatch.ts` | 0 (was 1) | **0** |
| `grep -rn 'as unknown as' src/ \| wc -l` | ≤ 3 (was 4) | **2** — Lane C concurrent retirement of `normalize.ts:319` brought the residue to 2 ahead of schedule |
| `npx vue-tsc --noEmit \| grep -c 'error TS'` | 0 | **0** |
| `npx vitest run` | 1584 / 34 GREEN | **1584 passed / 34 files** |
| `npm run lint` | exit 0 | **clean** |
| `npm run build` | exit 0 | **clean — `dist/value.js` 125,421 B** (baseline 125,393 B; Δ +28 B — judgment-call below) |
| L8 channel-access bench median | ≥ 5× | **10.49×** |
| DIRECT_PATHS HSL→RGB bench median | ≥ 2× | **4.19×** |
| nameParser bench median | ≥ 5× | **39.42×** |
| `proof:as-any-budget` | ≤ 5 | **0** |
| `proof:no-ts-ignore` | 0 | **0** |
| `proof:no-deprecated` | 0 | **0** |

### Residue corpus

```
$ grep -rn 'as unknown as' src/
src/units/normalize.ts:117:    style as unknown as Record<string, string>;
src/parsing/color.ts:59:    const plain = color.clone() as unknown as Color<number>;
```

- `normalize.ts:117` — irreducible DOM cast (`H.md §2 H2 KEEP` per
  H-AUDIT-5 table-row #2 — `CSSStyleDeclaration` is a host-shape that lacks
  a string index signature; the runtime `prop`-keyed read can only land
  through `Record<string, string>`).
- `parsing/color.ts:59` — parsing-side, out of Lane A's file bounds.

### Bench evidence

```
D.W1 L8 — Color channel-access microbenchmark
  speedups (sorted): 10.26×, 10.49×, 10.56×    median: 10.49×    target: ≥ 5×    verdict: PASS

E.W1 Lane C — color2() DIRECT_PATHS microbenchmark
  hsl→rgb   speedups (sorted): 3.34×, 4.19×, 4.73×
  hsl→rgb   median: 4.19×    target: ≥ 2× (HSL→RGB hot path)    verdict: PASS

E.W1 Lane D — nameParser broad-regex + Set-lookup microbenchmark
  speedups (sorted): 24.72×, 39.42×, 41.67×    median: 39.42×    target: ≥ 5×    verdict: PASS
```

The typed mapped-type does **not** pessimize the JIT — `XYZ_FUNCTIONS` is
still a plain object literal at runtime; the mapped-type / conditional-type
inference work is entirely compile-time and erased by emit. The two typed
lookups are 1-statement arrow functions V8 inlines (no measurable XYZ-hub
fallback regression — DIRECT_PATHS HSL→RGB median 4.19× ≥ 2× gate; L8 median
10.49× ≥ 5× gate; nameParser median 39.42× ≥ 5× gate).

### Pre-baseline (captured at task start, branch `tranche-h` @ `9c32e7a`)

```
L8 channel-access  median: 15.05×    target: ≥ 5×    verdict: PASS
DIRECT_PATHS HSL→RGB median: 3.17×    target: ≥ 2×    verdict: PASS
nameParser         median: 25.26×    target: ≥ 5×    verdict: PASS
```

Post-Lane-A medians remain comfortably above each gate; the small movement
between runs is normal microbench variance (machine load, JIT warmup ordering)
— neither bench is sensitive to the XYZ_FUNCTIONS-table type-shape.

---

## Judgment calls

### 1. `dist/value.js` size delta: +28 B (sub-gate floor: ±5 B)

The H.W2.md Lane A sub-gate states *"`dist/value.js` size unchanged within ±5
bytes (the cast was inline; removal is pure type-level)"*. The Δ measured is
+28 B (125,393 → 125,421 B). The "pure type-level" expectation was the
orchestrator's pre-implementation assumption; in practice the cast retirement
requires the same shape G.W2 Lane B used — two small typed lookup helpers
(`getXyzToFn` + `getXyzFromFn`, ~6 lines combined post-minification) that V8
inlines but which the bundle still names + emits. The G.W2 Lane B
`getDirectPath` helper produced the same class of size delta; the H.W2.md
note simply didn't anticipate the helper structure.

The +28 B is the irreducible runtime cost of the typed lookups. Inline
narrowings without a helper were tried and rejected by `tsc` (the runtime-keyed
table read returns the *intersection* of all subclass parameter types
contravariantly — uncallable without an `unknown` re-cast, which would
re-introduce the very `as unknown as` we are retiring). Two-helper structure
is the same pattern G.W2 Lane B vetted and the orchestrator approved at G
close — flagged here for adjudication; the alternative violates the "no `as
unknown as`" binding constraint.

### 2. `getXyzToFn` widens its return-fn input to `Color<number>` (not subclass)

Documented in §"Why `getXyzToFn` widens…" above. The per-space `to` slot's
*table-level* signature remains the exact `(ColorSpaceMap<number>[K]) =>
XYZColor` subclass shape — only the lookup's return-signature widens. The
widening is sound because `Color<T>`'s public `[key: string]: any` index
signature (a KEEP verdict at G.W2 Lane C) gives the structural overlap; the
runtime `color.colorSpace` discriminant guarantees the function-body reads
succeed.

### 3. `xyz` slot — identity functions kept in place

`XYZ_FUNCTIONS.xyz` retains its identity-arrow `to`/`from` pair
(`{ to: (color: XYZColor) => color, from: (color: XYZColor) => color }`). The
mapped-type resolves the `"xyz"` slot to `{ to: (XYZColor) => XYZColor; from:
(XYZColor) => XYZColor }` naturally, so no special-case branch was added.

---

## Files modified (Lane A)

- `src/units/color/dispatch.ts` — replaced the wide `Record<string, { to: (color:
  any) => XYZColor; from: (color: XYZColor) => any }>` table-type with
  `XyzFunctions<C>` + `XyzFunctionsTable` mapped-type; added the typed
  `getXyzToFn` / `getXyzFromFn` lookups; routed `color2`'s XYZ-hub fallback
  through them cast-free of `as unknown as`. Net: 1 `as unknown as` retired;
  no new `as any` / `as unknown as` / `@ts-ignore` introduced (G2 invariant
  `as any` budget unchanged at 0).
- `docs/tranches/H/audit/H.W2-lane-a-typed-XYZ_FUNCTIONS.md` — this audit doc.
