# G.W2 — Typed strengthening (`as any` corpus retirement; G2 invariant)

**Opens after**: G.W1 close.
**Lanes**: 4 — A (G-OPP-2 typed `getColorSpaceBound<C,K>`), B (G-OPP-3 typed `DIRECT_PATHS` mapped-type), C (G-OPP-4 typed `Color<T>` channel accessor; potential BREAKING), D (G-OPP-5 `ValueUnit.unwrapDeep()` static).
**Status**: planned.

## Scope

G.W2 retires 29 of 36 `as any` + 11 `as unknown as` sites in `src/` via 4 typed-wrapper introductions. Target at G.W2 close: **`grep -rn 'as any' src/ | wc -l` ≤ 5** (G2 invariant).

### Lane A — G-OPP-2: Typed `getColorSpaceBound<C extends ColorSpace, K extends keyof RangesByColorSpace[C]>(...)`

Per `audit/G-AUDIT-5 §9`: a typed helper that closes ~5 `as any` lookups in `src/units/color/normalize.ts` + `src/units/color/utils.ts` (post-decomposition: `src/units/color/dispatch.ts`).

Strategy:
1. Read the existing untyped bound-lookups.
2. Introduce `getColorSpaceBound<C, K>` with proper conditional types referencing `COLOR_SPACE_RANGES` + `COLOR_SPACE_DENORM_UNITS` (per `src/units/color/constants.ts`).
3. Replace ~5 untyped sites with the typed helper.
4. Verify type narrowing works: `npx vue-tsc --noEmit | grep -c 'error TS'` = 0.

**Sub-gate A**:
- ≥ 5 `as any` sites retired in `src/units/color/`.
- vitest 1584/34 GREEN; vue-tsc 0; build clean.

### Lane B — G-OPP-3: Typed `DIRECT_PATHS` mapped-type

Per `audit/G-AUDIT-5 §9`: the existing `DIRECT_PATHS` const (the perf-critical conversion table) uses `as unknown as DirectConversion` casts in 7 places. A mapped-type `DirectPathsTable<From, To>` retires all 7 casts.

Strategy:
1. Read `DIRECT_PATHS` definition (post-decomposition: in `src/units/color/dispatch.ts`).
2. Lift the type to `type DirectPathsTable = { [From in ColorSpace]?: { [To in ColorSpace]?: (...) => ... } }` with proper conditional return types per from→to.
3. Apply to the existing table — the existing entries should type-check without the `as unknown as` casts.

**Sub-gate B**:
- 7 `as unknown as DirectConversion` sites retired.
- DIRECT_PATHS bench ≥ 2× (HSL→RGB; ensure typing didn't pessimize JIT).
- vitest 1584/34 GREEN; vue-tsc 0; build clean.

### Lane C — G-OPP-4: Typed `Color<T>` channel accessor (potential BREAKING)

Per `audit/G-AUDIT-5 §9`: `src/units/color/index.ts:55` has `[key: string]: any` index signature on the `Color<T>` base class. ~12 `as any` lookups across `interpolate.ts` + `normalize.ts` rely on this.

**BREAKING decision protocol**:
1. At dispatch, READ `src/units/color/index.ts:55` to confirm whether `[key: string]: any` is part of the PUBLIC API surface (exported in `src/index.ts` barrel).
2. If PUBLIC and removing it would break consumers using dynamic property access (`color["L"]`, `color["c"]`, etc.): the change IS BREAKING → v0.9.0 lone BREAKING.
3. If INTERNAL only (the public surface uses `color.L`, `color.c`, etc. via the `ColorChannel` branded type per CLAUDE.md): the change is INTERNAL.

Strategy:
1. Introduce a typed channel-accessor helper or generic-param-narrowed shape: `interface Color<T extends ColorSpace> { readonly [K in ChannelOf<T>]: ColorChannel }` or similar.
2. The `ch<T>` helper (existing per CLAUDE.md) becomes the canonical accessor.
3. Migrate the ~12 `as any` sites to `ch(color, "L")` or direct typed access.
4. If BREAKING: add a CHANGELOG v0.9.0 BREAKING entry (lone breaking).

**Sub-gate C**:
- 12 `as any` sites retired in the color pipeline.
- `Color<T>` index signature retired OR documented why it must stay.
- vitest 1584/34 GREEN; vue-tsc 0; build clean.
- BREAKING vs INTERNAL decision documented in `audit/G.W2-lane-c-color-channel-typing.md`.

### Lane D — G-OPP-5: `ValueUnit.unwrapDeep()` static (codifies Mar 2026 iOS Safari nesting fix)

Per `audit/G-AUDIT-5 §9` + memory `migration-details.md`'s "ValueUnit nesting bug" entry: the `while (raw instanceof ValueUnit) raw = raw.value` pattern is inlined ~5 times across the codebase. Lift to a static helper `ValueUnit.unwrapDeep(x)`.

Strategy:
1. Add `static unwrapDeep<T>(x: T): T extends ValueUnit ? T['value'] : T` to `src/units/index.ts` `ValueUnit` class.
2. Replace 5 inline while-loop sites with `ValueUnit.unwrapDeep(raw)`.

**Sub-gate D**:
- ~5 inline while-loop sites retired.
- vitest 1584/34 GREEN (especially the recursion-guard suite that exercises iOS Safari nesting protection).
- vue-tsc 0.

## File bounds

| Lane | Files |
|---|---|
| A | `src/units/color/normalize.ts`, `src/units/color/dispatch.ts` (post-decomp), `audit/G.W2-lane-a-getColorSpaceBound.md` (new) |
| B | `src/units/color/dispatch.ts`, `audit/G.W2-lane-b-typed-DIRECT_PATHS.md` (new) |
| C | `src/units/color/index.ts`, `src/units/color/interpolate.ts`, `src/units/color/normalize.ts`, `src/index.ts` (barrel — verify no leakage), `CHANGELOG.md` (if BREAKING), `audit/G.W2-lane-c-color-channel-typing.md` (new) |
| D | `src/units/index.ts` (ValueUnit class), `src/units/color/normalize.ts` (inline-loop sites), and any other 3-4 sites identified via grep, `audit/G.W2-lane-d-unwrapDeep.md` (new) |

## Gate

Conjunction of sub-gates A + B + C + D. Wave-level (G2 invariant):
- `grep -rn 'as any' src/ | wc -l` ≤ 5 (was 36).
- `grep -rn 'as unknown as' src/ | wc -l` ≤ 4 (was 11).
- vue-tsc 0 errors.
- vitest 1584/34 GREEN.
- All bench medians ≥ gates (especially DIRECT_PATHS — Lane B must not pessimize the HSL→RGB path).
- `npm run build` clean; `dist/value.js` ≤ 148,480 bytes.

## Commit plan

- `refactor(library/w2): typed getColorSpaceBound<C,K> helper (G-OPP-2; G.W2 Lane A)`
- `refactor(library/w2): typed DIRECT_PATHS mapped-type (G-OPP-3; G.W2 Lane B)`
- `refactor(library/w2)!: typed Color<T> channel accessor + retire [key: string]: any (G-OPP-4; G.W2 Lane C)` — `!` only if BREAKING per dispatch decision.
- `refactor(library/w2): ValueUnit.unwrapDeep() static — codifies Mar 2026 iOS Safari nesting fix (G-OPP-5; G.W2 Lane D)`

## Dependencies

- Depends on: G.W1 close (color/utils.ts decomposition — typed strengthening targets the new focused modules).
- Blocks: G.W3 (proof:as-any-budget enforces the post-G.W2 count).
