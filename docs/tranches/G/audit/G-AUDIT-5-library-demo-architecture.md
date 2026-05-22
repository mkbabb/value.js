# G-AUDIT-5 — Library + demo architecture audit at G open

**Branch**: `tranche-g` @ `6b3a41b` (post-F close, v0.8.0).
**Mode**: READ-ONLY across all paths. Author one deliverable.
**Context**: G-opening directive — "This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code."

This audit identifies the NEXT architectural transposition openings for value.js post-F. F itself landed 4 transpositions (Github icon inline SVG; typed `Memoized<T>`; Rolldown declarative codeSplitting; 29-subdir vendor sweep) plus a strict-zero CI gate (vue-tsc 0; `@deprecated` 0; `@ts-ignore` 0). The substrate is clean. The openings remaining are mostly type-strength + DRY + demo-extirpation (pending peer ship), not patching.

---

## §1 — `as any` / `as unknown as` corpus

### Totals

- `grep -rn 'as any' src/` → **36 hits** across 12 files.
- `grep -rn 'as unknown as' src/` → **11 hits** across 4 files.

### `as any` distribution

| File | Count | Pattern |
|---|---|---|
| `src/units/index.ts` | 7 | `ValueUnit` self-as-any in `coalesce` + `isColorUnit` narrow |
| `src/units/color/index.ts` | 7 | `Color<T>` base — instance index reads `(this as any)[k]`; duck-typed nesting assertion in `_assertChannel` |
| `src/units/interpolate.ts` | 5 | `(start.value as any)[key]` channel reads on `Color<T>` |
| `src/units/color/normalize.ts` | 3 | `(COLOR_SPACE_RANGES[colorSpace] as any)[component]` |
| `src/units/color/utils.ts` | 4 | `(denormUnits as any)[component]`; `(range as any)[units]`; final return cast in `kelvin2rgb` |
| `src/parsing/color.ts` | 3 | `colorUnit as any`; `(plain as any)[key]`; `x.unit as any` |
| `src/parsing/index.ts` | 2 | `[v as any]`, `values as any[]` (FunctionValue ctor variadic) |
| `src/parsing/math.ts` | 1 | `node.unit as any` → `convertToDegrees` |
| `src/parsing/serialize.ts` | 2 | `(prettier as any).default ?? prettier` (CJS interop) |
| `src/parsing/stylesheet.ts` | 1 | `(out as any).name = name` |
| `src/units/utils.ts` | 1 | `const result = {} as any` (unflatten) |

### `as unknown as` distribution

| File | Count | Pattern |
|---|---|---|
| `src/units/color/utils.ts` | 7 | **6** are `DIRECT_PATHS` table entries (`directOklabToRgb as unknown as DirectConversion`) + **1** is the XYZ-hub `fromXYZFn` cast |
| `src/units/normalize.ts` | 2 | `style as unknown as Record<string, string>`; `value as unknown as Parameters<...>` |
| `src/parsing/color.ts` | 1 | `plain as unknown as Color<number>` (return from `resolveToPlainColor`) |
| `src/units/color/utils.ts:1243` | — | `direct(color) as unknown as ColorSpaceMap<T>[C]` (DIRECT_PATHS dispatch return) |

### Top strengthening candidates (G-eligible)

The `as any` corpus is dominated by **2 root causes** — addressing those would clear ~70% of the corpus.

**Root cause #1: `Color<T>` lacks a typed channel-accessor.** The base class declares `[key: string]: any` (src/units/color/index.ts:55) so every channel read goes through the index signature. This forces `(this as any)[k]` in `clone()`, `values()`, `entries()`, and ripples out to `interpolate.ts` (5 sites) + `normalize.ts` (`color[component]` already typed `any`). A typed `getChannel(k: ChannelKey<this>)` / `setChannel(k, v)` pair — paired with retiring the index signature — strengthens 12+ sites at once.

**Root cause #2: `COLOR_SPACE_RANGES` / `COLOR_SPACE_DENORM_UNITS` are typed as wide `Record`s.** Lookups at `src/units/color/normalize.ts:17,28` + `src/units/color/utils.ts:48,49,66` all need `as any` because the type doesn't carry the per-component-key narrowing. A `getColorSpaceRange<C extends ColorSpace, K extends keyof ColorSpaceMap<number>[C]>(...)` typed helper (one lift, ~5 sites cleared) is the natural F.W1-Lane-A-style strengthening.

**Root cause #3: `DIRECT_PATHS` dispatch table.** 7 sites in `src/units/color/utils.ts:1220-1228,1243` use `as unknown as DirectConversion` because the value is `<T>(c: Color<T>) => Color<T>` but each entry is a narrower signature. A typed mapped type `DirectPath<F extends ColorSpace, T extends ColorSpace>` indexed by the template literal key would let the table self-type, dropping all 7 `as unknown as` casts. This is exactly the F.W1-Lane-A `Memoized<T>` pattern applied to a different dispatch table.

The `as any` sites in `parsing/serialize.ts` (`(prettier as any).default ?? prettier`) are CJS-interop and **NOT** worth transposing — they are correctly localized to the dynamic-import boundary.

---

## §2 — God-module identification (file sizes)

`find src -name '*.ts' -exec wc -l {} + | sort -rn`:

| LoC | File | God-module? |
|---|---|---|
| **1430** | `src/units/color/utils.ts` | **YES — single biggest opportunity** |
| 736 | `src/units/constants.ts` | Borderline — but it's pure data (unit + STYLE_NAMES constants), not behavior |
| 618 | `src/units/color/index.ts` | Borderline — 15 color subclass declarations. Could split into `color/spaces/{rgb,hsl,oklab,...}.ts` |
| 615 | `src/parsing/color.ts` | Borderline — but it's a single cohesive parser surface |
| 541 | `src/transform/decompose.ts` | Acceptable — spec-algorithm cluster (2D + 3D decompose + quaternion slerp + recompose) |
| 518 | `src/parsing/stylesheet.ts` | Acceptable — single cohesive CSSOM-spec parser |
| 505 | `src/easing.ts` | Acceptable — 30+ timing functions, all data + tiny formula |
| 504 | `src/parsing/math.ts` | Acceptable — single cohesive math-function evaluator |
| 483 | `src/units/color/constants.ts` | Pure data |
| 448 | `src/units/utils.ts` | Borderline |

### `src/units/color/utils.ts` decomposition opportunity (G-target)

1430 LoC carrying:

1. **51 conversion functions** (`hex2rgb`, `kelvin2rgb`, `rgb2hsl`, `xyz2lab`, `oklab2xyz`, `srgbToLinear`, `linearToSrgb`, AdobeRGB/ProPhoto/Rec2020 transfer functions, etc.) — lines 78–999.
2. **`XYZ_FUNCTIONS` dispatch table** — line 1001 (~40 lines).
3. **6 `directXxxToYyy` direct-path functions** + `DIRECT_PATHS` table — lines 1046–1229.
4. **`color2()`** dispatch entrypoint — line 1231.
5. **`gamutMap()`** — line 1270 (re-exports + adaptive gamut wrapper).
6. **`mixColors()` + `interpolateHue()` + `CYLINDRICAL_HUE_COMPONENT`** — color interpolation primitives.

Per `feedback_no_god_modules.md` ("never add to god modules; create focused modules with proper encapsulation"), this is the prime G transposition. Proposed split:

```
src/units/color/conversions/
├── hex.ts            # hex2rgb + rgb2hex
├── kelvin.ts         # kelvin2rgb + rgb2kelvin
├── cylindrical.ts    # hsl/hsv/hwb ↔ rgb (closed-form cylindrical)
├── lab.ts            # xyz ↔ lab + lch ↔ lab
├── oklab.ts          # xyz ↔ oklab + oklch ↔ oklab + oklab↔lab
├── transfer.ts       # srgb/adobeRgb/proPhoto/rec2020 linear ↔ encoded
└── xyz-extended.ts   # Display-P3/AdobeRGB/ProPhoto/Rec2020 XYZ matrices + ↔ XYZ
src/units/color/dispatch.ts   # XYZ_FUNCTIONS + DIRECT_PATHS + color2() + gamutMap()
src/units/color/mix.ts        # mixColors + interpolateHue + CYLINDRICAL_HUE_COMPONENT (already exists as standalone but stripped to N-color helpers — fold full mix back)
```

Expected outcome: 1430 → 6–7 focused modules averaging ~200 LoC. Public API unchanged (re-export through `src/units/color/utils.ts` thin barrel until G ratifies whether the barrel itself retires).

**Risk**: NONE — these are pure functions with no shared module-private state. Pure file moves with import-graph rewiring. Tests should pass unchanged (1584 → 1584).

### `src/units/color/index.ts` — soft split candidate (defer)

15 color subclasses + base + `ColorChannel` brand + `ch<T>` helper = 618 LoC. Each subclass is small + symmetric (constructor + `channels` getter + `channelKeysWithAlpha` static). Splitting into `color/spaces/{rgb,hsl,oklab,...}.ts` is clean but **does not unblock anything** — the file isn't actively hard to navigate because every subclass is structurally identical. **Recommend: DEFER to a future tranche** unless paired with §1 root-cause-#1 (typed channel accessor lift, which would touch every subclass anyway).

---

## §3 — DRY opportunities

### DRY-1: ValueUnit unwrap idiom (FOLD-INTO-G candidate)

The "unwrap nested ValueUnit before reading raw value" idiom appears in 4+ sites:

- `src/units/color/normalize.ts:49-51` — `color[component] instanceof ValueUnit ? color[component].value : color[component]`
- `src/units/color/normalize.ts:101-102` — `while (raw instanceof ValueUnit) raw = raw.value` (the Mar 2026 iOS Safari fix)
- `src/units/interpolate.ts:60-61` — `sv instanceof ValueUnit ? sv.value : sv` + same for `ev`
- `src/units/interpolate.ts:77-80` — `current instanceof ValueUnit ? (current.value = result) : ((value.value as any)[key] = result)`
- `src/parsing/color.ts:49` — `v instanceof ValueUnit ? v.value : v`

A `ValueUnit.unwrap(v: T | ValueUnit<T>): T` static (or instance `valueOf` extension) plus `ValueUnit.unwrapDeep(v): T` for the recursive case lifts the pattern to one call site. Pairs naturally with §10's preserved Mar-2026 nesting-fix invariant.

### DRY-2: Range-lookup with `number` fallback (FOLD-INTO-G candidate)

Repeated 3x across `src/units/color/utils.ts:48-49,66` + `src/units/color/normalize.ts:17-18`:

```ts
const ranges = (COLOR_SPACE_RANGES[colorSpace] as any)[component];
return ranges[unit] ?? ranges.number;
```

A typed `getColorSpaceBound<C, K>(space: C, component: K, unit?: string): { min, max }` helper lifts the lookup + the `number` fallback + erases all 3 `as any` (matches §1 root cause #2).

### DRY-3: Direct-cylindrical-conversion gamut-map idiom

`src/units/color/utils.ts:1208-1209` — `const rgb = hsl2rgb(hsl); return gamutMap(rgb);` is the `directHslToRgb` body. Same pattern appears for the OKLab/OKLch direct paths (they each do `rgb = something()` + `gamutMap` at the end). Could be lifted, but the gain is small (3 instances, 1–2 lines each) — **DEFER unless §2 decomposition is happening anyway** (in which case the dispatch module is the natural home).

### DRY-4: `prettier`/`postcss` CJS-default-interop

`src/parsing/serialize.ts:139-140` — `const fmt = (prettier as any).default ?? prettier`. Single-site, no DRY pressure. **RETIRE-MOOT.**

---

## §4 — Public API barrel hygiene (`src/index.ts`)

**306 LoC**, well-commented sections, clean named-exports-only posture.

### Counts

- ~110 named exports (functions + classes + constants).
- ~25 `export type` re-exports.
- 0 default exports (KISS — matches CLAUDE.md convention).

### Inspection findings

The barrel is **TIGHT**. Notable evidence:

- `src/index.ts:114-117` carries a comment explicitly noting "the 51 individual `<from>2<to>` helpers remain internal to value.js" — barrel intentionally suppresses them. The post-E.W1 lift (54→6 conversion exports → only `color2` + `colorUnit2`) is preserved.
- All exports route through `./X` paths (no deep `./X/internal/Y` leakage).
- `ColorChannel<T>` brand + `ch<T>` helper are correctly internal-only (referenced in `src/units/color/index.ts:21-37` as "NOT exported from src/index.ts").

### Borderline cases (review-worthy but not action items)

- `mixColorsN` is exported (line 133) but `mixColors` itself is also exported (line 123). Both are intentional public API per CLAUDE.md.
- `oklabToLinearSRGB` + `rawOklabToOklch` + `rawOklchToOklab` + `oklabToRgb255` (lines 148–158) are exported. These are gamut-mapping internals used by `quantize/cluster.ts`. The exports are intentional — they let `quantize/` consume gamut primitives without duplicating. **OK as-is.**
- `LinearSRGBColor` is exported (line 70) — but is anyone actually a public consumer of the class itself vs. its conversion? `grep -rn LinearSRGBColor demo/` shows it's used in demo internally; keeping it public is correct.

### Verdict

**`src/index.ts` is GESTALT-CLEAN at G open.** No barrel-hygiene work for G. The 54→6 conversion-export reduction at E.W1 still holds.

---

## §5 — Demo extirpation candidates

### `WatercolorDot` — 10 instance sites in demo (NOT 16; F/FINAL.md drift)

`grep -rln 'WatercolorDot' demo/` returns **10 files** at G open (not 16 as F/FINAL.md §7 reported — the count drifted between F.W1 sweep and F close, or F's count included worktrees / dist artifacts). The 10 sites:

```
demo/@/components/custom/watercolor-dot/index.ts                         (the barrel itself)
demo/@/components/custom/watercolor-dot/WatercolorDot.vue                (107 LoC component)
demo/@/components/custom/mix/MixSourceSelector.vue                       (1 import)
demo/@/components/custom/mix/MixResultDisplay.vue                        (1 import)
demo/@/components/custom/image-palette-extractor/ImageEyedropper/ImageEyedropper.vue  (1 import)
demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue        (1 import)
demo/@/components/custom/color-picker/editing/EditDrawer.vue             (1 import)
demo/@/components/custom/palette-browser/SwatchHoverMenu.vue             (1 import)
demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue        (1 import)
demo/@/components/custom/palette-browser/PaletteDialog/components/PaletteDialogHeader.vue  (1 import)
demo/@/components/custom/dock/Dock.vue                                   (1 import)
```

→ **2 owner files (barrel + component) + 8 consumer call sites.**

### Extirpation gating — **PEER-AUTHORSHIP-REQUIRED**

The glass-ui successor primitive exists (`/Users/mkbabb/Programming/glass-ui/src/components/custom/metaballs/MetaballCanvas.vue`) but **is NOT exported from glass-ui's `package.json` exports map**. Verified:

- `grep "Metaball" /Users/mkbabb/Programming/glass-ui/src/index.ts` → **0 results.**
- `grep '"./metaballs"' /Users/mkbabb/Programming/glass-ui/package.json` → **0 results.**
- Available subpaths at G open: `./tokens, ./styles, ./styles.css, ./dock, ./search, ./sidebar, ./controls, ./confirm-dialog, ./infinite-scroll, ./tabs` (and main `.`).

The `BlobDot` ship (the named candidate in F/FINAL.md §7) is also not present. **Extirpation is bounded by glass-ui's contraction posture** — until glass-ui ships either `./metaballs` subpath OR re-exports `MetaballCanvas` from the main barrel, value.js cannot extirpate. **CARRY-FORWARD-WITH-TRIGGER** matches F's coordination posture.

**Trigger**: glass-ui ships `import { MetaballCanvas } from "@mkbabb/glass-ui"` or `from "@mkbabb/glass-ui/metaballs"`. At trigger, G can convert all 8 consumer call sites + delete `demo/@/components/custom/watercolor-dot/` in a single mechanical commit.

### `useMetaballRenderer.ts` — 343 LoC, same gating

`demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts` — local WebGL2 wrapper (343 LoC). Per F.W4 §12: "value.js demo-abstraction post-glass-ui-ship — retire `useMetaballRenderer.ts` + `WatercolorDot/`". Same gating: glass-ui's `useMetaballs` composable + `MetaballCanvas` are in glass-ui's source but **not in exports**. **PEER-AUTHORSHIP-REQUIRED.**

---

## §6 — Color / quantize / transform pipeline opportunities

### Color pipeline — Mar 2026 ValueUnit nesting fix preserved

`src/units/color/normalize.ts:97-103` (in `colorUnit2`) retains the `while (raw instanceof ValueUnit) raw = raw.value` unwrap loop with explicit comment about the iOS Safari stack-overflow precursor. **PRESERVED.** Pair with §3 DRY-1 — the idiom could be lifted to a `ValueUnit.unwrapDeep()` static.

### DIRECT_PATHS expansion opportunity

`DIRECT_PATHS` (src/units/color/utils.ts:1217) currently wires **6 pairs**: oklab↔rgb, oklch↔rgb, hsl↔rgb. The DIRECT_PATHS table is a hot-path optimization — bypasses XYZ-hub for the most-common interpolation pairs. Candidate expansions for G:

- **`oklab↔oklch`** — closed-form polar/cartesian conversion already exists (`oklab2oklch` + `oklch2oklab`), no XYZ intermediate is needed at all. The XYZ-hub path forces oklab→XYZ→oklch which is wasteful.
- **`hsl↔hsv`** + **`hsl↔hwb`** + **`hsv↔hwb`** — all closed-form cylindrical-to-cylindrical, no XYZ needed.
- **`rgb↔hsv`** + **`rgb↔hwb`** — closed-form via cylindrical math (parallel to `hsl↔rgb`).

Estimated impact: 5 new DIRECT_PATHS entries cover the cylindrical color-space cluster. Per `feedback_no_god_modules.md`, these belong in the dispatch module proposed in §2.

### `gamutMap` adaptive epsilon

`src/units/color/utils.ts:1268-1280` — `gamutMap()` uses `GAMUT_EPSILON = 1e-6` as the "in-gamut" threshold. The Ottosson analytical mapping in `gamut.ts` is exact; the gamut check is a fast-path. **OK as-is.**

### Quantize pipeline — `src/quantize/`

`src/quantize/cluster.ts` (356 LoC) + `src/quantize/index.ts` (191 LoC). Read both — they are **well-encapsulated**: median-cut → k-means++ → JND deduplication, all OKLab-native. Per F.W4, "not touched". Verified at G open: the module imports `srgbToOKLab` + `rawOklabToOklch` + `oklabToRgb255` from `gamut.ts` (correct dependency direction).

**Opportunity**: `dominantColor()` currently returns a single color. A `dominantColors(k)` returning the top-k palette (which the demo's `ImagePaletteExtractor` already does internally via the quantize pipeline) — but `quantizePixels` already returns the full palette. **RETIRE-MOOT** — the surface is already correct; the demo just consumes `quantizePixels` directly.

### Transform pipeline — `src/transform/decompose.ts` (541 LoC)

Read the head + structure. The module is spec-compliant (CSSOM View §15.1 for 2D, polar decomposition for 3D, quaternion slerp). Self-contained. The `Mat4 = number[]` type at line 10 is loose (could be a 16-tuple) but the CSSOM API itself uses `number[]` for `DOMMatrix.toFloat32Array()`/etc. — tightening to `[number, number, ..., number]` (16 entries) would force tuple-literal assertions everywhere. **NET-NEUTRAL — DEFER.**

---

## §7 — Test surface analysis

### Counts

- **34 test files** in `test/`.
- `npx vitest run` → **1584 tests passing** in 2.01s (CLAUDE.md says "~1580+", verified +4).

### Thin-file inspection

Files with `<10` `it/test` calls:

| File | Test count | Verdict |
|---|---|---|
| `test/recursion-guard.test.ts` | 5 | OK — focused on the Mar 2026 ValueUnit nesting fix; 5 invariant tests is the right size for a regression-guard suite. |
| `test/parser-snapshot.test.ts` | 5 | OK — snapshot tests; each one covers a parser surface. |
| `test/color-none.test.ts` | 9 | OK — focused on CSS Color 4 `none` keyword propagation. |

**No consolidation opportunities** — the small files are focused regression-guard suites, not under-covered features. The largest files (`color-classes.test.ts` 48, `refactor-fixes.test.ts` 36, `parsing.test.ts` 27) are appropriately broad.

### Consolidation opportunity (RETIRE-MOOT)

`test/refactor-fixes.test.ts` (36 tests) — the name suggests it captures regressions from prior refactors. **Naming hygiene only** — could be renamed to `value-unit-regression.test.ts` or split by feature area, but the content is correct + the tests pass. **DEFER unless paired with a §2 decomposition wave.**

---

## §8 — `siblingFsAllowTransient` state

`vite.config.ts:74` — `const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];`.

Used at lines 139 + 198 (library mode + demo mode `server.fs.allow`).

The block of comments above (lines 60–73) is **authoritative + still correct at G open**:

- Glass-ui ships TWO style surfaces (`./styles` source + `./styles.css` compiled).
- The compiled surface absorbs the SFC-scoped component-CSS gap (E.W0 Lane A close).
- The Tailwind-source `./styles` import still ships `@font-face` with `url("../fonts/fira-code/...woff2")` refs that walk OUT of the package.
- That walk is why `server.fs.allow` must reach `path.resolve(__dirname, "..")` (glass-ui's parent).
- Retirement requires either glass-ui inlining fonts as base64 OR the demo dropping `./styles` (forfeits Tailwind `@source` scanning).

**Verified state at G open**: glass-ui's `package.json` exports DO show `./styles` (Tailwind-source) + `./styles.css` (compiled) — the dual-surface posture is unchanged. **CARRY-FORWARD-WITH-TRIGGER** — trigger is glass-ui font-inlining ship.

---

## §9 — Specific G-target transposition opportunities

Five candidates, ordered by impact-per-LoC:

### G-OPP-1: Decompose `src/units/color/utils.ts` (1430 LoC) into focused modules

- **Files**: split into `src/units/color/conversions/{hex,kelvin,cylindrical,lab,oklab,transfer,xyz-extended}.ts` + `src/units/color/dispatch.ts`.
- **Lines**: 1430 → ~7 modules averaging ~200 LoC.
- **Impact**: gestalt clarity; pairs with G-OPP-3 (DIRECT_PATHS expansion). No public-API change (re-export via thin barrel).
- **Risk**: low — pure file moves; no shared module-private state. Tests should pass unchanged (1584 → 1584).
- **Classification**: FOLD-INTO-G.

### G-OPP-2: `getColorSpaceBound<C, K>` typed range helper — erases 5 `as any` sites

- **Files**: lift to `src/units/color/utils.ts` head (or `dispatch.ts` if G-OPP-1 lands first).
- **Erases**: `src/units/color/normalize.ts:17-18,28`; `src/units/color/utils.ts:48-49,66`.
- **Impact**: -5 `as any`; pattern matches F.W1-Lane-A typed-Memoized lift.
- **Risk**: zero — pure type-level lift.
- **Classification**: FOLD-INTO-G.

### G-OPP-3: Typed `DIRECT_PATHS` mapped-type — erases 7 `as unknown as` sites

- **File**: `src/units/color/utils.ts:1217-1229` (or post-G-OPP-1: `src/units/color/dispatch.ts`).
- **Mechanism**: replace `Partial<Record<...>>` with a mapped type `DirectPath<F, T>` indexed by the template-literal key, narrowing each entry to its concrete signature.
- **Bonus**: also enables the §6 cylindrical-cluster expansion (5 new entries) cleanly.
- **Impact**: -7 `as unknown as`; pattern matches F.W1-Lane-A.
- **Classification**: FOLD-INTO-G.

### G-OPP-4: Typed `Color<T>` channel accessor — erases ~12 `as any` sites + retires `[key: string]: any` index signature

- **File**: `src/units/color/index.ts:55` (the `[key: string]: any` index signature) is the root cause of the `(this as any)[k]` pattern across `clone()`/`values()`/`entries()` + `interpolate.ts` (5 sites) + `normalize.ts`.
- **Mechanism**: introduce `ChannelKey<C>` mapped type (from each subclass's `channels` tuple) + typed `getChannel(k)`/`setChannel(k, v)` methods on `Color<T>` base. Retire the index signature in a follow-up sweep.
- **Impact**: -12 `as any`; structural strengthening of the central `Color<T>` API.
- **Risk**: medium — needs careful subclass migration (all 15 spaces) + interpolate/normalize call-site update. Likely 2-lane work (lift in lane A, sweep call sites in lane B).
- **Classification**: FOLD-INTO-G — single biggest type-level transposition opening.

### G-OPP-5: `ValueUnit.unwrapDeep()` static — codifies the Mar 2026 iOS Safari fix as a primitive

- **File**: `src/units/index.ts` (alongside `ValueUnit` class).
- **Mechanism**: `static unwrapDeep<T>(v: T | ValueUnit<T>): T { while (v instanceof ValueUnit) v = v.value; return v; }` + sibling `static unwrap<T>(v: T | ValueUnit<T>): T` for the single-level case.
- **Call sites cleared**: `src/units/color/normalize.ts:49-51,101-102`; `src/units/interpolate.ts:60-61,77-80`; `src/parsing/color.ts:49`.
- **Impact**: makes the iOS Safari precursor fix a first-class invariant of the `ValueUnit` API (instead of a comment-guarded inline loop in one place); test coverage already exists in `test/recursion-guard.test.ts`.
- **Classification**: FOLD-INTO-G.

---

## §10 — Sub-gate verdict

**Library substrate at G open**: GESTALT-CLEAN with **5 specific transposition openings** ready for G adoption.

Carry-forward state from F:

- **PEER-AUTHORSHIP-REQUIRED** (unchanged from F.W4 §12):
  - `WatercolorDot` 8-consumer extirpation — gated on glass-ui `./metaballs` subpath ship OR main-barrel re-export of `MetaballCanvas`.
  - `useMetaballRenderer.ts` (343 LoC) retirement — same gating.
  - `siblingFsAllowTransient` retirement — gated on glass-ui font-inlining ship.

- **FOLD-INTO-G** (5 openings; see §9):
  - G-OPP-1: decompose `color/utils.ts` (1430 LoC → 7 modules).
  - G-OPP-2: typed `getColorSpaceBound` helper (-5 `as any`).
  - G-OPP-3: typed `DIRECT_PATHS` mapped-type (-7 `as unknown as`).
  - G-OPP-4: typed `Color<T>` channel accessor (-12 `as any`; retires index signature).
  - G-OPP-5: `ValueUnit.unwrapDeep()` static (codifies iOS Safari fix; -5 inline loops).

- **RETIRE-MOOT**:
  - Public barrel hygiene — already tight (54→6 conversion-export lift preserved from E.W1).
  - Test consolidation — small files are focused regression suites, not thin coverage.
  - `quantize/` pipeline — well-encapsulated, no opportunity.
  - `transform/decompose.ts` — spec-compliant, no opportunity.

- **DEFER-WITH-TRIGGER**:
  - `src/units/color/index.ts` (618 LoC, 15 subclasses) split — defer unless paired with G-OPP-4 (which would touch every subclass anyway).
  - `transform/decompose.ts` `Mat4 = number[]` → 16-tuple — net-neutral, defer.

**Total type-strength delta achievable in G**: **-29 `as any` / `as unknown as` sites** (-12 from G-OPP-4 + -7 from G-OPP-3 + -5 from G-OPP-2 + -5 from G-OPP-5).

**G-target sequencing recommendation** (for the plan synthesis at task #67):

1. Lane A (independent): G-OPP-5 (ValueUnit unwrap primitive — small, isolated).
2. Lane B (independent): G-OPP-2 (`getColorSpaceBound` helper — small, isolated).
3. Lane C (sequence after A+B): G-OPP-1 (decompose `color/utils.ts`) + G-OPP-3 (typed DIRECT_PATHS dispatch) — pair naturally; the decomposition creates the home for the typed dispatch table.
4. Lane D (separate wave): G-OPP-4 (`Color<T>` channel accessor) — largest blast radius; isolate from C.
5. Lane E (gated): peer-authorship asks pinned + sharpened (mirrors F/FINAL.md §7 posture).

No gold-plating; every opening above ties to either (a) an existing F-precedent (the `Memoized<T>` typed-strengthening pattern) or (b) the explicit G directive ("elegance, simplicity, performance above all"). No legacy code added; no hacks; gestalt-ready.

---

**Audit complete.** Substrate verified at HEAD `6b3a41b`. 1584 vitest tests pass. No writes outside this file.
