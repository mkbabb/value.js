# G.W2 Lane B — Typed `DIRECT_PATHS` mapped-type (G-OPP-3)

**Branch**: `tranche-g` @ `ab6c744` (G.W2 Track-1-α execution).
**Scope**: lift the `DIRECT_PATHS` conversion table from a `Partial<Record<…>>`
of a single generic signature to a precise mapped-type, retiring the 7
`as unknown as` casts on the table entries + the dispatch return, per
`G-AUDIT-5 §9 G-OPP-3` + `G.W2.md §"Lane B"`.

---

## The finding

`DIRECT_PATHS` (in `src/units/color/dispatch.ts`) is the perf-critical
direct-conversion table — it bypasses the XYZ hub for the 6 hottest
interpolation pairs (`oklab↔rgb`, `oklch↔rgb`, `hsl↔rgb`). Pre-state:

```ts
type DirectConversion = <T>(color: Color<T>) => Color<T>;

const DIRECT_PATHS: Partial<Record<`${ColorSpace}->${ColorSpace}`, DirectConversion>> = {
    "oklab->rgb": directOklabToRgb as unknown as DirectConversion,   // ×6
    …
};

// dispatch site:
return direct(color) as unknown as ColorSpaceMap<T>[C];              // ×1
```

The table value type was a single generic `<T>(c: Color<T>) => Color<T>`. The
per-pair direct functions have *narrower* concrete signatures —
`directOklabToRgb: (oklab: OKLABColor) => RGBColor`. Under `strictFunctionTypes`
a narrower function is not assignable to the wider generic (parameter
contravariance: a `Color<T>` is not an `OKLABColor`). Every entry needed
`as unknown as DirectConversion`; the dispatch return needed another double
cast. **7 `as unknown as` total** (`G-AUDIT-5 §1` root cause #3).

---

## The mapped-type design

```ts
/** A `From → To` direct conversion. Direct-path functions operate on numeric
 *  channels and build same-arity `number`-component colors. */
type DirectPath<From extends ColorSpace, To extends ColorSpace> = (
    color: ColorSpaceMap<number>[From],
) => ColorSpaceMap<number>[To];

/** Distributes over every `${From}->${To}` key; each entry is the exact
 *  `From → To` conversion signature (or absent). */
type DirectPathsTable = {
    [K in `${ColorSpace}->${ColorSpace}`]?:
        K extends `${infer From extends ColorSpace}->${infer To extends ColorSpace}`
            ? DirectPath<From, To>
            : never;
};

const DIRECT_PATHS: DirectPathsTable = {
    "oklab->rgb": directOklabToRgb,   // ← zero casts
    "rgb->oklab": directRgbToOklab,
    "oklch->rgb": directOklchToRgb,
    "rgb->oklch": directRgbToOklch,
    "hsl->rgb":   directHslToRgb,
    "rgb->hsl":   directRgbToHsl,
};
```

`DirectPathsTable` distributes over the `${From}->${To}` template-literal key
and uses **conditional-type inference** (`infer From extends ColorSpace`) to
derive the EXACT slot signature per pair. The `"oklab->rgb"` slot resolves to
`(color: OKLABColor<number>) => RGBColor<number>` — precisely the signature of
`directOklabToRgb`. All 6 entries type-check with zero casts.

### Component type — concrete `number`, not generic

The direct-path functions read numeric channels (`oklab.a as number`, …) and
build `number`-component result colors — they are concrete `(Color<number>) →
Color<number>` maps. A generic `<T>` slot was tried and rejected by `tsc`
(`TS2322`: a `number`-concrete function is not assignable to a `<T>` slot).
`number` is the honest component type for the table.

### Dispatch — the typed `getDirectPath` lookup

`color2()` consults the table by a **runtime-computed** template-literal key,
so TS cannot statically pick a single `DirectPathsTable` entry — a value-keyed
read collapses to the *union* of all 6 entry signatures, which is uncallable
(the union parameter would need the unsatisfiable `OKLABColor & RGBColor & …`
intersection).

The lookup is encapsulated in a typed helper whose return signature is narrowed
by the target space `C`:

```ts
const getDirectPath = <C extends ColorSpace>(
    from: ColorSpace, to: C,
): ((color: Color<number>) => ColorSpaceMap<number>[C]) | undefined => {
    const directKey = `${from}->${to}` as `${ColorSpace}->${ColorSpace}`;
    return DIRECT_PATHS[directKey] as
        | ((color: Color<number>) => ColorSpaceMap<number>[C]) | undefined;
};
```

`color2()` then dispatches cast-free of `as unknown as`:

```ts
const direct = getDirectPath<C>(color.colorSpace, to);
if (direct) return direct(color as Color<number>) as ColorSpaceMap<T>[C];
```

The lone `as` inside `getDirectPath` re-asserts the runtime-keyed table value as
the `C`-targeted signature — a documented index-narrowing, **not** a
type-erasing `as unknown as` double cast. `color2`'s return uses plain `as`
narrowings (`Color<T> → Color<number>`, `ColorSpaceMap<number>[C] →
ColorSpaceMap<T>[C]`) that `tsc` accepts as overlapping; the prior code's
`as unknown as` (full type-erasure) is gone. `color2`'s inferred return type is
unchanged (no explicit annotation added — that kept `gamutMap`'s pre-existing
`color2(…) as C` casts valid).

---

## Before / after cast sites

| # | File:line (pre) | Pre-state cast | Post-state |
|---|---|---|---|
| 1 | `dispatch.ts:129` | `directOklabToRgb as unknown as DirectConversion` | `directOklabToRgb` (slot-typed) |
| 2 | `dispatch.ts:130` | `directRgbToOklab as unknown as DirectConversion` | `directRgbToOklab` |
| 3 | `dispatch.ts:133` | `directOklchToRgb as unknown as DirectConversion` | `directOklchToRgb` |
| 4 | `dispatch.ts:134` | `directRgbToOklch as unknown as DirectConversion` | `directRgbToOklch` |
| 5 | `dispatch.ts:136` | `directHslToRgb  as unknown as DirectConversion` | `directHslToRgb` |
| 6 | `dispatch.ts:137` | `directRgbToHsl  as unknown as DirectConversion` | `directRgbToHsl` |
| 7 | `dispatch.ts:152` | `direct(color) as unknown as ColorSpaceMap<T>[C]` | `getDirectPath` typed lookup + plain `as` narrowing |

**7 `as unknown as` retired.** The `DirectConversion` type alias is deleted.

---

## Sub-gate B evidence

| Check | Gate | Result |
|---|---|---|
| `as unknown as DirectConversion` sites retired | 7 | **7** (6 entries + dispatch return) |
| DIRECT_PATHS HSL→RGB bench median | ≥ 2× | **4.37×** |
| `npx vue-tsc --noEmit \| grep -c "error TS"` | 0 | **0** |
| `npx vitest run` | 1584 / 34 GREEN | **1584 passed / 34 files** |
| `npm run build` | clean | **clean — `dist/value.js` 125.29 kB** (≤ 148,480 B) |

### Bench probe — `node bench/color2-direct-paths.mjs`

```
Summary:
  hsl→rgb   speedups (sorted): 4.32×, 4.37×, 4.51×
  hsl→rgb   median:            4.37×    [GATING]
  oklab→rgb median:            1.04×
  oklch→rgb median:            1.08×
  target:                      ≥ 2× (HSL→RGB hot path)
  verdict:                     PASS
```

The typed mapped-type does **not** pessimize the JIT — `DIRECT_PATHS` is still a
plain object literal at runtime; the mapped-type / conditional-inference work is
entirely compile-time and erased by emit. `getDirectPath` is a 2-statement
function V8 inlines. HSL→RGB median 4.37× ≥ 2× gate — clears with margin.

### tsc / vitest probe

```
$ npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
0

$ npx vitest run | tail
 Test Files  34 passed (34)
      Tests  1584 passed (1584)
```

---

## `as unknown as` corpus — pre / post Lane B

| Metric | Pre-Lane-B | Post-Lane-B |
|---|---|---|
| `grep -rn 'as unknown as' src/ \| wc -l` | 11 | 4 |
| `as unknown as` in `src/units/color/dispatch.ts` | 8 | 1 |

### Irreducible cast left in-bounds

`src/units/color/dispatch.ts:222` —
`const fromXYZFn = toEntry.from as unknown as (color: XYZColor<T>) => ColorSpaceMap<T>[C];`

This is the **XYZ-hub** dispatch cast — `XYZ_FUNCTIONS` is a wide
`Record<string, { to, from }>` whose `from` is `(c: XYZColor) => any`. It is
**not** a `DIRECT_PATHS` cast and is explicitly out of Lane B's named scope
(`G-AUDIT-5 §1` lists it as a separate line item — the XYZ-hub `fromXYZFn`
cast). Retiring it requires lifting `XYZ_FUNCTIONS` to its own typed mapped-type
(a separate, parallel transposition to G-OPP-3). Left untouched; noted here for
a follow-on lane.

The other 3 remaining `src/` `as unknown as` are outside Lanes A+B file bounds:
`src/units/normalize.ts:110,319` + `src/parsing/color.ts:52`.

## Files modified (Lane B)

- `src/units/color/dispatch.ts` — replaced `DirectConversion` alias +
  `Partial<Record<…>>` table type with `DirectPath<From,To>` +
  `DirectPathsTable` mapped-type; added the typed `getDirectPath` lookup;
  routed `color2`'s direct branch through it cast-free of `as unknown as`.
