# G.W2 Lane A — Typed `getColorSpaceBound` color-space range helper (G-OPP-2)

**Branch**: `tranche-g` @ `ab6c744` (G.W2 Track-1-α execution).
**Scope**: retire the untyped `(COLOR_SPACE_RANGES[space] as any)[component]` /
`(COLOR_SPACE_DENORM_UNITS[space] as any)[component]` bound-lookups via a pair of
typed accessor helpers, per `G-AUDIT-5 §9 G-OPP-2` + `G.W2.md §"Lane A"`.

---

## The finding

`COLOR_SPACE_RANGES` and `COLOR_SPACE_DENORM_UNITS` (in
`src/units/color/constants.ts`) are `as const` — every per-space record carries
its full literal key set. But every `(space, component)` lookup widened the
result to `any` because the indexed-access type was suppressed with a cast:

```ts
// src/units/color/normalize.ts (pre-state)
const ranges = (COLOR_SPACE_RANGES[colorSpace] as any)[component];   // any
return ranges[unit] ?? ranges.number;                               // any

unit = inverse ? (COLOR_SPACE_DENORM_UNITS[colorSpace] as any)[component] : unit;

// src/units/color/dispatch.ts — getFormattedColorSpaceRange (pre-state)
const units = (denormUnits as any)[component];                      // any
let { min, max } = (range as any)[units] ?? (range as any)["number"];// any → any
```

The `any` leaked into the `{ min, max }` destructures and the `denormUnits`
reads. 5 `as any` occurrences across 2 files (`G-AUDIT-5 §1` root cause #2,
`§3 DRY-2`).

---

## The typed-wrapper design

Two helpers lifted into `src/units/color/constants.ts` (alongside the data they
read — `feedback_no_god_modules.md`: focused modules, no god-module growth):

```ts
export interface ColorSpaceBound { readonly min: number; readonly max: number; }

export const getColorSpaceBound = (
    colorSpace: ColorSpace, component: string, unit: string,
): ColorSpaceBound => { … };

export const getColorSpaceDenormUnit = (
    colorSpace: ColorSpace, component: string,
): string => { … };
```

Plus exported supporting types: `ColorSpaceRanges`, `ColorSpaceDenormUnits`,
`ColorComponent<C extends ColorSpace>` (per-space component key set).

### Design rationale — `component: string`, precise return type

The strengthening is on the **return type**, not the key constraint. Color
components are genuinely dynamic at every real call site — they are sourced from
`Color.keys()` (a `readonly string[]`) or the demo's `currentColorSpace` (a
`ColorSpace` *union*). A `K extends keyof RangesByColorSpace[C]` constraint only
narrows when `C` is a single space literal; under a space union it collapses to
the shared key (`"alpha"`), which would break the public
`normalizeColorUnitComponent` consumer in `demo/.../useColorModel.ts`.

So the helpers accept a plain `string` component (honest dynamic input) and
return a precise `ColorSpaceBound` / `string` instead of `any`. The single
`Record<…>` assertion inside each helper is the one dynamic-index boundary;
every caller is now cast-free and fully typed. `ColorComponent<C>` is still
exported for callers that *do* hold a concrete space literal.

The `?? (ranges.number as ColorSpaceBound)` keeps the CSS `number`-fallback —
`COLOR_SPACE_RANGES` always carries a `number` entry per component.

---

## Before / after cast sites

| # | File | Pre-state cast | Post-state |
|---|---|---|---|
| 1 | `normalize.ts:17` | `(COLOR_SPACE_RANGES[colorSpace] as any)[component]` | `getColorSpaceBound(colorSpace, component, unit)` |
| 2 | `normalize.ts:28` | `(COLOR_SPACE_DENORM_UNITS[colorSpace] as any)[component]` | `getColorSpaceDenormUnit(colorSpace, component)` |
| 3 | `dispatch.ts:73` | `(denormUnits as any)[component]` | `getColorSpaceDenormUnit(colorSpace, component)` |
| 4 | `dispatch.ts:74a` | `(range as any)[units]` | `getColorSpaceBound(colorSpace, component, units)` |
| 5 | `dispatch.ts:74b` | `(range as any)["number"]` | folded into `getColorSpaceBound`'s `?? number` fallback |

5 `as any` occurrences retired (occurrence-count; the two `dispatch.ts` casts
shared one source line). The former local `getColorSpaceBounds` closure in
`normalize.ts` is deleted — its job is now the exported `getColorSpaceBound`.

Collateral typing wins (no new casts introduced):
- `normalizeColorUnitComponent`'s `unit` param widened `string → string | undefined`
  — a numeric channel legitimately carries no unit; the forward path falls
  through to the `number` range. This matches the pre-existing runtime behaviour
  (the old code passed `color[component]?.unit`, possibly `undefined`, into an
  `any`-typed parameter).
- `normalizeColor`'s iteration reads `channel.unit` only inside an
  `instanceof ValueUnit` guard — no `?.` on a `number`.

---

## Sub-gate A evidence

| Check | Gate | Result |
|---|---|---|
| `as any` retired in `src/units/color/` | ≥ 5 | **5** (occurrence-count: `normalize.ts` 3→1, `dispatch.ts` 3→0) |
| `npx vue-tsc --noEmit \| grep -c "error TS"` | 0 | **0** |
| `npx vitest run` | 1584 / 34 GREEN | **1584 passed / 34 files** |
| `npm run build` | clean | **clean — `dist/value.js` 125.27 kB** (≤ 148,480 B) |

Probe output:

```
$ npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
0

$ npx vitest run | tail
 Test Files  34 passed (34)
      Tests  1584 passed (1584)

$ npm run build | tail
dist/value.js  125.27 kB │ gzip: 38.37 kB
✓ built in 691ms
```

---

## `as any` corpus — pre / post Lane A

| Metric | Pre-Lane-A | Post-Lane-A |
|---|---|---|
| `grep -rn 'as any' src/ \| wc -l` (line-count) | 35 | 31 |
| `grep -rno 'as any' src/ \| wc -l` (occurrence) | 37 | 32 |
| `as any` occurrences in `src/units/color/normalize.ts` | 3 | 1 |
| `as any` occurrences in `src/units/color/dispatch.ts` | 3 | 0 |

(Line-count drops by 4 because the two `dispatch.ts` casts shared source line
74; occurrence-count drops by the full 5.)

### Irreducible cast left in-bounds

`src/units/color/normalize.ts:102` —
`(normalizeColorUnit(…) as ValueUnit<Color<ValueUnit<number>>, "color">, true, true) as any)`
inside `colorUnit2`'s `inverse` branch. This is a **return-coercion** cast, not
a bound-lookup — it is not covered by G-OPP-2. It belongs to Phase-2 Lane C/D
typing of the `colorUnit2` return surface. Left untouched, in scope for a later
lane.

## Files modified (Lane A)

- `src/units/color/constants.ts` — added `getColorSpaceBound`,
  `getColorSpaceDenormUnit`, `ColorSpaceBound`, `ColorSpaceRanges`,
  `ColorSpaceDenormUnits`, `ColorComponent<C>`.
- `src/units/color/normalize.ts` — deleted local `getColorSpaceBounds`; routed
  `normalizeColorUnitComponent` + `normalizeColor` through the typed helpers.
- `src/units/color/dispatch.ts` — `getFormattedColorSpaceRange` rewritten over
  the typed helpers.
