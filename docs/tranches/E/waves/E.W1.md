# E.W1 — Library architectural transposition + legacy retirement + barrel cleanup (v0.7.0 candidate)

**Opens after**: E.W0 close.
**Lanes**: 5 — A (legacy-clean + barrel surface cleanup — breaking), B (WhitePointColor lift), C (DIRECT_PATHS hot-paths + rgb-family helpers), D (152-branch nameParser + parser micro-fixes), E (type-tidy + CLAUDE.md drift fix).
**Status**: planned.

The architectural wave per the E-opening directive: "architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code." E1 + E2 invariants bind every lane. Lands 8 of the 15 transposition opportunities from `E-AUDIT-5 §9`; remaining 7 are distributed across E.W2 + E.W4 + ROUTE-FORWARD.

## Scope

### Lane A — Legacy-clean + barrel surface cleanup (breaking — v0.7.0 candidate)

Per `E-AUDIT-5 §8 + §9 items 1, 6, 7 + E-AUDIT-2 AUD-5.1, AUD-5.6, AUD-5.7`:

1. **Delete `lerpLegacy`** from `src/math.ts` + the barrel export in `src/index.ts`. Per `E-AUDIT-5 §8`: the lone `@deprecated` in `src/`, zero consumers anywhere. The D.W3 Lane C L11 transition-period justification is moot at v0.7.0.
2. **Move the 51 internal `<from>2<to>` conversion functions behind a `/internal` subpath**. `src/index.ts` currently re-exports 51 conversion helpers (`hex2rgb`, `rgb2hsl`, `xyz2oklab`, etc.) that should be PUBLIC ONLY as `color2<T,C>(value, "from", "to")` + `colorUnit2`. The 51 individual functions move to an internal-only export surface (e.g., `src/units/color/conversions.ts` un-re-exported from `index.ts`, OR a new `@mkbabb/value.js/internal/conversions` subpath that's explicitly experimental).
   - Decision at lane dispatch: subpath OR un-export? Subpath is more idiomatic if value.js's consumers (keyframes.js, fourier-analysis) need direct access; un-export is cleaner if nothing external consumes them.
3. **Move `vue-router` to `devDependencies`** in `package.json`. The library doesn't consume vue-router; the demo does. Currently mis-placed as runtime dep.
4. **Delete dead exports**: `BLACKLISTED_COALESCE_UNITS`, `STRING_UNITS`, `COLOR_UNITS` (the unit-tuple over-exposure per `E-AUDIT-5 §2`).
5. **Sweep for any other `@deprecated` / `Legacy` / `_old` / aliased-export markers** — none expected per `E-AUDIT-5 §8`, but verify.

**Breaking changes for v0.7.0** (record in CHANGELOG.md):
- `lerpLegacy` removed (zero consumers verified).
- 51 conversion functions removed from main barrel (route through `color2` + `colorUnit2` OR `/internal/conversions`).
- `BLACKLISTED_COALESCE_UNITS`, `STRING_UNITS`, `COLOR_UNITS` removed (consumers must declare own constants if needed).

**Sub-gate A**:
- `grep -rn '@deprecated' src/` returns zero.
- `grep -rn 'lerpLegacy' src/ demo/ test/ api/` returns zero (deletion complete).
- The 51 internal-conversion functions either un-exported from `src/index.ts` or routed through a `/internal` subpath.
- `vue-router` in `devDependencies`, not `dependencies`.
- `npm run proof:resolution` GREEN.
- vue-tsc 126 unchanged.
- vitest 1582+ (tests for retired exports updated).

### Lane B — `WhitePointColor<T>` lift

Per `E-AUDIT-5 §9 item 3 + E-AUDIT-2 AUD-5.3`:

Current structure has asymmetric inheritance:
```
Color<T>
├── RGBColor, HSLColor, HSVColor, HWBColor, LCHColor, OKLCHColor, KelvinColor, LinearSRGBColor, ...
└── WhitePointColor<T>  // ← intermediate class carrying `whitePoint` field
    ├── LABColor
    ├── OKLABColor
    └── XYZColor
```

But OKLCH inherits Color directly while OKLAB inherits WhitePointColor — the same color family (`oklab` ↔ `oklch`) splits across inheritance levels.

**Lift**: move the `whitePoint` field to `Color<T>` base (optional / default to D65). Delete `WhitePointColor<T>` intermediate class. The 3 affected subclasses (LAB, OKLAB, XYZ) inherit Color<T> directly and either override `whitePoint` to D50 in the constructor or rely on the new default.

**Sub-gate B**:
- `grep -rn 'WhitePointColor' src/` returns zero (class deleted).
- LAB, OKLAB, XYZ subclasses inherit Color<T> directly.
- Existing tests for white-point math pass unchanged (or updated for the constructor-default).
- vitest 1582+ green.
- L8 microbench median ≥ 5× preserved.

### Lane C — `DIRECT_PATHS` table for `color2()` hot paths + rgb-family helpers

Per `E-AUDIT-5 §9 items 4-5, 8 + E-AUDIT-2 AUD-5.4, AUD-5.5, AUD-5.8`:

1. **`DIRECT_PATHS` table** in `src/units/color/utils.ts` — for hot-path conversions skip the XYZ hub:
   ```ts
   const DIRECT_PATHS: Partial<Record<`${ColorSpace}->${ColorSpace}`, (color: Color) => Color>> = {
     "oklab->rgb": directOklabToRgb,
     "oklch->rgb": directOklchToRgb,
     "hsl->rgb": directHslToRgb,
     "rgb->oklab": directRgbToOklab,
     // ...
   };
   ```
   `color2(value, "from", "to")` consults the table first; falls through to the XYZ-hub path if no direct path exists.

2. **`rgbFamily2xyz` / `xyz2rgbFamily` helpers** — extract the shared transfer-function + matrix-multiply shape across the 5 wide-gamut classes (LinearSRGB, DisplayP3, AdobeRGB, ProPhotoRGB, Rec2020). Each has its own transfer function but shares the matrix-multiply structure.

3. **Cache `keys()` arrays on Color subclasses** — `Color.keys()` currently returns `[...this.channels, "alpha"]` (allocating per call). Cache the array on each subclass: `static readonly channelKeysWithAlpha: readonly string[] = [...this.channels, "alpha"];` (or instance equivalent). Eliminates allocation in `lerpColorValue`'s `forEach`.

**Sub-gate C**:
- `DIRECT_PATHS` table covers ≥ 4 hot-path pairs (oklab↔rgb, oklch↔rgb, hsl↔rgb at minimum).
- Bench: a NEW benchmark `bench/color2-direct-paths.mjs` measures `color2("oklab" → "rgb")` pre vs post. Expect ≥ 2× speedup on the hot path (no XYZ hub).
- `keys()` no longer allocates per call (verified via vitest + a small allocation-count assertion).
- vitest 1582+ green.
- L8 microbench (the original) still ≥ 5× — Color storage changes elsewhere (Lane B's lift) don't regress L8.

### Lane D — 152-branch `nameParser` replacement + parser micro-fixes

Per `E-AUDIT-5 §9 items 2, 9, 11 + E-AUDIT-2 AUD-2.10, AUD-5.2, AUD-5.9, AUD-5.11`:

1. **Replace 152-branch `any(...)` in `nameParser`** (`src/parsing/index.ts`) with a broad-regex (`/^[a-z][a-zA-Z0-9-]*/`) + Map-lookup chain. The 152-name lookup table is constructed at module init; subsequent lookups are O(1) Map.get instead of 152 sequential `any()` regex tests. The L14 deferred-from-D becomes structurally landable.

2. **Override `keyFn: (s) => s` on 3 string-parser memoize sites** — the default `JSON.stringify(args)` is overkill for string-only inputs; identity is faster + clearer. 3 sites in `src/parsing/` (verify exact locations).

3. **`tryParse` error: include a 16-char context window** in the thrown error. Currently `tryParse` failures lose context; the new shape captures the input substring around the failure offset for diagnostics.

**Sub-gate D**:
- `grep -rn 'any\(' src/parsing/index.ts` returns ≤ 5 (only the legitimate broad-disjunction sites; nameParser no longer one of them).
- `bench/parser-namelookup.mjs` (NEW) — measures `parseCSSColor("rebeccapurple")` (a named-color lookup) pre vs post; expect ≥ 5× speedup for the lookup hot path.
- `tryParse(p, "calc(1 + bad)")` throws an error whose message includes 16 chars around `"bad"`.
- vitest 1582+ green (test for the new context-window error shape added).

### Lane E — Type-tidy + CLAUDE.md drift fix

Per `E-AUDIT-5 §9 items 10, 12, 13 + E-AUDIT-2 AUD-5.10, AUD-5.12, AUD-5.13`:

1. **Clean 2 fixable `as any` in `units/normalize.ts:363,376`** + the `getUnitGroup` chain.
2. **Lift `ch<T>` brand-eraser to a single shared internal helper** — currently duplicated in `utils.ts` + `contrast.ts` (per D.W1 L8). One canonical export from `src/units/color/index.ts` (the brand declaration's home file). Update 2 consumers.
3. **Fix 5 CLAUDE.md files' stale LoC counts**:
   - `src/units/color/CLAUDE.md` (drift up to 71 lines per `E-AUDIT-5`)
   - Plus the root `CLAUDE.md` (post-L8 — the file count may have moved)
   - Plus `src/units/CLAUDE.md`, `src/parsing/CLAUDE.md`, `demo/CLAUDE.md` (verify post-E.W1 state).
4. **Strip drift footgun comments** — anywhere LoC counts are inline in CLAUDE.md, replace with file-tree-only listings (no counts) to prevent re-drift.

**Sub-gate E**:
- `grep -rn 'as any' src/units/normalize.ts` ≤ 1 (or zero — the audit named 2 fixable).
- `ch<T>` declared exactly once in `src/units/color/index.ts`; 2 consumers updated.
- All 5 CLAUDE.md files updated; no stale LoC counts.

## File bounds

| Lane | Files |
|---|---|
| A | `src/math.ts` (delete `lerpLegacy`), `src/index.ts` (barrel cleanup), `package.json` (move vue-router), `CHANGELOG.md` (v0.7.0 BREAKING entries), `docs/tranches/E/audit/E.W1-legacy-clean.md` (new) |
| B | `src/units/color/index.ts` (lift `whitePoint` to base; delete `WhitePointColor<T>`), `src/units/color/constants.ts` (verify), `docs/tranches/E/audit/E.W1-whitepoint-lift.md` (new) |
| C | `src/units/color/utils.ts` (DIRECT_PATHS table + rgb-family helpers), `src/units/color/index.ts` (keys cache), `bench/color2-direct-paths.mjs` (new), `docs/tranches/E/audit/E.W1-direct-paths.md` (new) |
| D | `src/parsing/index.ts` (nameParser replacement + memoize keyFn), `src/parsing/utils.ts` (tryParse context window), `bench/parser-namelookup.mjs` (new), `test/parsing-*.test.ts` (context-window assertions), `docs/tranches/E/audit/E.W1-parsing.md` (new) |
| E | `src/units/normalize.ts`, `src/units/color/utils.ts`, `src/units/color/contrast.ts`, `src/units/color/index.ts` (`ch<T>` lift), the 5 CLAUDE.md files, `docs/tranches/E/audit/E.W1-type-tidy.md` (new) |

## Gate

The conjunction of sub-gates A + B + C + D + E. Wave-level: `npm run build` clean; `vue-tsc` ≤ 126; `vitest` 1582+; smoke 21/21; `npm run lint` exit 0; `npm run proof:resolution` GREEN. **NEW E.W1 gates**:
- L8 microbench still ≥ 5× (no regression from the WhitePointColor lift or the keys-cache addition).
- DIRECT_PATHS bench ≥ 2× on hot paths.
- nameParser bench ≥ 5× on lookup hot paths.
- `bench/` directory has ≥ 3 benchmarks (color-channel-access + color2-direct-paths + parser-namelookup).

## Verification artefacts

5 per-lane audit docs + 3 benchmark scripts + the v0.7.0 BREAKING CHANGELOG additions.

## Commit plan

- `chore(library/w1): retire lerpLegacy + 51 internal-conversion barrel exports + vue-router devDep + dead unit-tuple exports (v0.7.0 BREAKING — E.W1 Lane A)`
- `refactor(library/w1): lift whitePoint to Color<T> base, delete WhitePointColor<T> intermediate (E.W1 Lane B)`
- `perf(library/w1): DIRECT_PATHS table for color2 hot paths + rgb-family helpers + keys() cache (E.W1 Lane C)`
- `perf(library/w1): 152-branch nameParser → broad-regex + Map-lookup; keyFn identity; tryParse context window (E.W1 Lane D)`
- `chore(library/w1): type-tidy as-any cleanup + ch<T> consolidation + 5 CLAUDE.md drift fix (E.W1 Lane E)`

## Dependencies

- Depends on: E.W0 (state-at-open clean).
- Blocks: E.W2 (api/ doesn't depend on library shape, but the v0.7.0 candidate-version cadence depends on E.W1 closing first).
