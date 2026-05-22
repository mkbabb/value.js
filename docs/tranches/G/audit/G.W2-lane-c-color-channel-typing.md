# G.W2 Lane C — Typed `Color<T>` channel accessor (G-OPP-4)

**Branch**: `tranche-g` @ `23ec904` (G.W2 Track-1-β execution).
**Scope**: retire the ~12 `as any` channel lookups across the color pipeline
(`color/index.ts` + `interpolate.ts` + `color/normalize.ts`) by introducing a
typed channel-accessor surface, per `G-AUDIT-5 §9 G-OPP-4` + `G.W2.md §"Lane C"`.
Also carries the **G2 invariant sweep** — drives `grep -rn 'as any' src/` to ≤ 5.

---

## BREAKING-decision protocol — run + verdict

### Step 1 — READ the index signature

`src/units/color/index.ts` declared `[key: string]: any` on the abstract
`Color<T>` base class. Every channel read/write — `(this as any)[k]` in
`clone()`/`values()`/`entries()`, plus ~5 sites in `interpolate.ts` and the
`color[component]` lookups in `normalize.ts` — routed through this `any` index.

### Step 2 — is it PUBLIC API surface?

`Color` **is** barrel-exported (`src/index.ts:58`). The decisive question is
whether removing the index signature is *observable to consumers*. It is:

```
demo/@/components/custom/color-picker/composables/useColorModel.ts:197,206
    color.value[component].value = value;          // component: string
demo/@/components/custom/color-picker/controls/ComponentSliders.vue:56,178
    model.color.value[component].value             // dynamic-keyed
demo/@/components/custom/color-picker/composables/useSliderGradients.ts:36
    step.value[component].value = t;
```

The demo dynamically indexes `Color` instances by a runtime `component: string`.
Removing `[key: string]: any` would make `color.value[component]` a type error
under vue-tsc's strict-zero gate — an **observable BREAKING change**.

### Step 3 — verdict

**Verdict: KEEP the index signature — change is INTERNAL, no CHANGELOG BREAKING
entry.**

Two independent reasons the signature stays:

1. **Public-surface dependency.** The demo (a barrel consumer) relies on dynamic
   channel access. Dropping the signature is BREAKING.

2. **Structural impossibility of tightening.** It also *cannot* be narrowed to a
   typed `[channel: string]: ColorChannel<T> | T` form. A TypeScript string
   index signature requires **every** declared class member to be assignable to
   the index value type. `Color<T>` carries non-channel members —
   `whitePoint: WhitePoint`, `colorSpace: ColorSpace`, and the
   `toString`/`values`/`entries`/`keys`/`clone`/… methods — whose types are not
   assignable to any channel-value union. `any` is the only index value type the
   heterogeneous class shape admits.

Because the signature stays, **G-OPP-4 is INTERNAL, not BREAKING**: the public
per-channel API (`color.l`, `color.c`, `color.r` — typed `ColorChannel<T>`
declared fields) is unchanged; the dynamic-access affordance is unchanged; only
the *internal pipeline* stops relying on the `any` leak. No v0.9.0 BREAKING
entry was added to `CHANGELOG.md`.

---

## The typed-accessor design

The index signature survives as the public dynamic-access affordance, but the
internal pipeline no longer *reads through* the `any` it produces. Two typed
helpers were lifted into `src/units/color/index.ts` alongside the `ch<T>` brand
helper:

```ts
/** Typed channel read — branded `ColorChannel<T>`, not `any`. */
export const channelOf = <T>(color: Color<T>, key: string): ColorChannel<T> =>
    color[key] as ColorChannel<T>;

/** Typed channel write — accepts a branded `ColorChannel<T>`. */
export const setChannel = <T>(
    color: Color<T>, key: string, value: ColorChannel<T>,
): void => { color[key] = value; };
```

`channelOf` reads a channel slot; `setChannel` writes one. Both localise the
single dynamic-index boundary *per direction* into one place each, and hand
callers a real `ColorChannel<T>` type. The lone `as ColorChannel<T>` inside
`channelOf` is a documented index-narrowing (re-asserting the index-signature
read), **not** an `as any` / `as unknown as` double cast. Both helpers are
zero-cost (a single property access; V8-inlined). `ch<T>` (the existing brand
helper) remains the canonical way to brand a raw computed value before a write.

The three `Color<T>` methods + the `interpolate.ts`/`normalize.ts`/`color.ts`
pipeline now route every channel read/write through `channelOf`/`setChannel` —
retiring the `(this as any)[k]` pattern repo-wide without re-introducing the
`any` leak.

---

## The ~12 `as any` channel sites retired (Lane C)

| # | File:line (pre) | Pre-state | Post-state |
|---|---|---|---|
| 1 | `color/index.ts:6` | `(value as any)?.toFixed?.(digits)` | `hasToFixed(value)` structural type-guard |
| 2 | `color/index.ts:100` | `(value as any).constructor?.name` | structural `{ constructor?; value? }` type |
| 3 | `color/index.ts:101` | `(value as any).value != null` | `vu.value` (structurally typed) |
| 4 | `color/index.ts:102` | `typeof (value as any).value` | `inner` (structurally typed) |
| 5 | `color/index.ts:103` | `(value as any).value.constructor?.name` | `inner.constructor?.name` |
| 6 | `color/index.ts:164` | `(cloned as any)[k] = clone((this as any)[k])` | `setChannel(cloned, k, clone(channelOf(this, k)))` |
| 7 | `color/index.ts:164` | (the `(this as any)[k]` read) | `channelOf(this, k)` |
| 8 | `color/index.ts:196` | `(this as any)[ch[i]!]` (`values()`) | `channelOf(this, keys[i]!)` |
| 9 | `color/index.ts:204` | `(this as any)[ch[i]!]` (`entries()`) | `channelOf(this, keys[i]!)` |
| 10 | `interpolate.ts:58` | `(start.value as any)[key]` | `channelOf(start.value, key)` |
| 11 | `interpolate.ts:59` | `(stop.value as any)[key]` | `channelOf(stop.value, key)` |
| 12 | `interpolate.ts:76` | `(value.value as any)[key]` (read) | `channelOf(value.value, key)` |
| 13 | `interpolate.ts:80` | `(value.value as any)[key] = result` | `setChannel(value.value, key, ch(result))` |

13 occurrences across the 3 pipeline files (the audit estimated "~12"). The
`formatNumber` + `_assertChannel` casts (#1–5) were genuine `unknown`-narrowing
sites — retired with structural type-guards / structural types rather than the
accessor, since they operate on un-channeled `unknown` input.

### Collateral typing win — `lerpColorValue` honest signature

`lerpColorValue` was typed `InterpolatedVar<Color>` (= `Color<number>`), but at
runtime its color channels can be raw `number`s *or* `ValueUnit<number>`
wrappers. A new local type `InterpColor = Color<ValueUnit<number> | number>`
captures the honest shape; `lerpColorValue`'s signature is now
`InterpolatedVar<InterpColor> → ValueUnit<InterpColor>`. This is a *widening*
(more accurate, non-breaking — `InterpolatedVar<Color>` is still assignable),
and it makes the per-channel `instanceof ValueUnit` branch type-check without a
cast.

---

## Sub-gate C evidence

| Check | Gate | Result |
|---|---|---|
| `as any` retired in the color pipeline | ~12 | **13** |
| index signature retired OR documented why it stays | — | **documented — KEEP (BREAKING + structural)** |
| `npx vue-tsc --noEmit \| grep -c "error TS"` | 0 | **0** |
| `npx vitest run` | 1584 / 34 GREEN | **1584 passed / 34 files** |
| `npm run build` | clean | **clean — `dist/value.js` 125.54 kB** (≤ 148,480 B) |
| BREAKING-vs-INTERNAL decision documented | — | **this doc — verdict: INTERNAL** |

```
$ npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
0

$ npx vitest run | tail
 Test Files  34 passed (34)
      Tests  1584 passed (1584)

$ npm run build | tail
dist/value.js  125.54 kB │ gzip: 38.47 kB
✓ built in 711ms
```

---

## G2 INVARIANT SWEEP — full `as any` corpus retirement

The G2 gate: **`grep -rn 'as any' src/ | wc -l` ≤ 5 at G.W2 close.** Lanes A+B+C
were the named mechanism; Lane C's owner drove the full repo-wide sweep. Starting
corpus (post-A+B): 31 `as any`. After Lane C's 13: 18 remained. The sweep
retired all 18.

### Full sweep table — every `as any` site, classified

| File:line (pre) | Pre-state | Disposition |
|---|---|---|
| `color/index.ts` ×7 | `formatNumber` + `_assertChannel` + `clone`/`values`/`entries` | RETIRED — Lane C (structural type-guards + `channelOf`/`setChannel`) |
| `interpolate.ts:58,59,76,80` | `(x.value as any)[key]` channel access | RETIRED — Lane C (`channelOf`/`setChannel`) |
| `interpolate.ts:30` | `COMPUTED_UNITS.includes(newStart.unit as any)` | RETIRED — `const computedUnits: readonly string[]` widening |
| `units/index.ts:47` | `isColorUnit(this as any)` | RETIRED — inlined `this.unit === "color"` check (no guard needed) |
| `units/index.ts:81,84,94` | `return this as any` (`coalesce`) | RETIRED — spurious; `ValueUnit<T,U>` is assignable to `ValueUnit<any,any>` |
| `units/index.ts:83` | `BLACKLISTED_COALESCE_UNITS.includes(this.unit as any)` | RETIRED — `const blacklisted: readonly string[]` widening |
| `units/index.ts:88` | `this.unit ??= right.unit as any` | RETIRED — `as U` genuine narrowing (added `U extends string` constraint) |
| `units/utils.ts:82` | `const result = {} as any` (`unflattenObject`) | RETIRED — `UnflattenNode` recursive type (`Record<string,unknown> \| unknown[]`) |
| `color/normalize.ts:102` | `(normalizeColorUnit(…) as any)` return coercion | RETIRED — `as ValueUnit<ColorSpaceMap<ValueUnit<number>>[C], "color">` (same cast the `else` branch already used) |
| `conversions/xyz-extended.ts:75` | `new RGBColor(…) as any` | RETIRED — spurious cast; dropped (ctor already returns `RGBColor`) |
| `parsing/math.ts:270` | `convertToDegrees(…, node.unit as any)` | RETIRED — `as (typeof ANGLE_UNITS)[number]` (guarded by `superType[0]==="angle"`) |
| `parsing/color.ts:231` | `convertToDegrees(…, x.unit as any)` | RETIRED — `as (typeof ANGLE_UNITS)[number]` (`CSSValueUnit.Angle` only yields angle units) |
| `parsing/stylesheet.ts:371` | `(out as any).name = name` | RETIRED — build the `{kind:"keyframes", name, rules}` object directly (no post-mutation) |
| `parsing/index.ts:100` | `new FunctionValue(k, [v as any])` | RETIRED — `transformObject: Record<string, ValueUnit \| FunctionValue>` |
| `parsing/index.ts:204` | `new FunctionValue(name, values as any[])` | RETIRED — `values: (ValueUnit \| FunctionValue)[]` narrowing |
| `parsing/serialize.ts:139` | `(prettier as any).default ?? prettier` | RETIRED — `interopDefault<M>(mod): M` with structural `{default?: M}` cast |
| `parsing/serialize.ts:140` | `(postcss as any).default ?? postcss` | RETIRED — same `interopDefault` helper |

### Final count

```
$ grep -rn 'as any' src/ | wc -l
0
```

**`as any` in `src/`: 31 → 0.** The G2 gate (≤ 5) **PASSES** with a margin of 5
— the irreducible floor is **0**. No cast-laundering: every retirement is a
genuine correct type. The two `parsing/serialize.ts` CJS-interop casts —
`G-AUDIT-5 §3 DRY-4` classified them "RETIRE-MOOT, correctly localized" — were
nonetheless honestly retired via a structural `{ default?: M }` interop helper
(no `any` erasure), so even the named-irreducible sites are gone.

### `as unknown as` corpus — final state

```
$ grep -rn 'as unknown as' src/ | wc -l
4
```

Unchanged from post-Lane-B (4). All 4 are genuine irreducible boundary casts:

| File:line | Cast | Why irreducible |
|---|---|---|
| `units/normalize.ts:110` | `style as unknown as Record<string, string>` | DOM `CSSStyleDeclaration` reinterpreted for dynamic property indexing — DOM-API boundary. |
| `units/normalize.ts:319` | `value as unknown as Parameters<typeof normalizeColorUnits>[0]` | `asColorValueUnit` — post-runtime-guard narrowing (`value.unit === "color"` checked one line above). |
| `color/dispatch.ts:222` | `toEntry.from as unknown as (color: XYZColor<T>) => …` | XYZ-hub `fromXYZFn` — `XYZ_FUNCTIONS` is a wide `Record`; `G.W2 Lane B` doc explicitly scoped this out (needs a separate `XYZ_FUNCTIONS` mapped-type lift). |
| `parsing/color.ts:59` | `color.clone() as unknown as Color<number>` | `resolveToPlainColor` — `clone()` preserves the subclass; the loop overwrites every channel slot with the unwrapped numeric value, reinterpreting `Color<ValueUnit<number>>` as `Color<number>`. |

The `parsing/serialize.ts` `as unknown as` count is unchanged — the new
`interopDefault` helper uses a plain `as { default?: M }`, not `as unknown as`.

### Barrel hygiene

`grep ': any' src/index.ts` → 0. The public barrel leaks no `any`. The Lane C
accessors (`channelOf`/`setChannel`) are **internal-only** — not re-exported from
`src/index.ts` (consistent with `ch<T>` / `ColorChannel<T>` per `G-AUDIT-5 §4`).

---

## Files modified (Lane C + G2 sweep)

- `src/units/color/index.ts` — typed `channelOf`/`setChannel` accessors;
  `formatNumber` structural `hasToFixed` guard; `_assertChannel` structural
  duck-typing; `clone`/`values`/`entries` routed through the accessors;
  BREAKING-decision verdict documented on the index signature.
- `src/units/interpolate.ts` — `channelOf`/`setChannel`/`ch` imports;
  `lerpColorValue` retyped to `InterpColor`; channel reads/writes via the
  accessors; `COMPUTED_UNITS.includes` widening.
- `src/units/color/normalize.ts` — `colorUnit2` inverse-branch return cast
  retyped; channel unwrap via `ValueUnit.unwrapDeep` (Lane D).
- `src/units/index.ts` — `U extends string` constraint on `ValueUnit`;
  `coalesce`/`toString` casts retired; unused `isColorUnit` import dropped.
- `src/units/utils.ts` — `isColorUnit` param widened to `ValueUnit`;
  `unflattenObject` `UnflattenNode` recursive type.
- `src/units/color/conversions/xyz-extended.ts` — spurious `as any` dropped.
- `src/parsing/math.ts` — `ANGLE_UNITS` type import; `convertToDegrees` cast.
- `src/parsing/color.ts` — `ch`/`channelOf`/`setChannel` + `ANGLE_UNITS`
  imports; `resolveToPlainColor` retyped; `convertToDegrees` cast.
- `src/parsing/stylesheet.ts` — keyframes object built with `name` directly.
- `src/parsing/index.ts` — `transformObject` + gradient `values` typed;
  `FunctionValue` ctor casts retired.
- `src/parsing/serialize.ts` — `interopDefault` structural CJS-interop helper.
</content>
</invoke>
