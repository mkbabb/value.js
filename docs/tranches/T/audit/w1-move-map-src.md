# T.W1-src — THE MOVE-MAP (old path → new path)

The W1-src lane's binding MOVE-MAP (the Q1 mitigation, T.W1 §The MOVE-MAP). Every
downstream wave re-derives its `file:line` anchors against this table at wave-open
(PP-11). Committed with each batch; the src tree is writer-disjoint from demo/api.

**Frame** (`t-coloc-src §0`): the 3.x public surface is a NAME SET — the 8 `exports`
keys + the symbol sets of `src/index.ts` and the 7 `src/subpaths/*.ts` barrels. Every
row below is **name-preserving at the barrels** (semver-free); the fresh-build dts
symbol diff is ADDITIVE-ONLY across the whole lane (the §5.3 FORBIDS ledger).

**Base**: `tranche-t` post-keystone (`879ea36` — the demo-dogfood keystone + Q15's 8
promotions already landed; demo speaks only the 8 public keys, so every src move below
collapses to a one-barrel edit + internal-import + test-import update).

---

## Batch 1 — the `test/` mirror (§5; pure move, lowest risk)

The test tree mirrors the src shape. Tests are run by vitest (esbuild + the `@src`
alias) and are in NEITHER tsconfig — so this batch cannot touch the frozen dts surface
or `npm run typecheck`; only vitest's runtime resolution matters. Moved files convert
their `"../src…"` specifiers to the depth-invariant `@src` alias (already in
`vitest.config.ts`); `vitest.config.ts include` widens `test/*.ts` → `test/**/*.ts`.

Files kept at `test/` root (pure leaves + meta/cross-cutting shadows of no single
module): `math` · `easing` · `easing-export-stability` · `utils` ·
`color-picker-lifecycle` · `dts-published-surface` · `docs-source-snippets` ·
`parser-snapshot` (colocated `__snapshots__/`, unchanged) · `refactor-fixes` ·
`recursion-guard` · `tranche-f` · `tranche-q-1.2.0` · `aurora-motion` (demo) ·
`gradient-parse` (demo) · `view-accents` (demo).

| Old path | New path |
|---|---|
| `test/gamut-mapping.test.ts` | `test/units/color/gamut/gamut-mapping.test.ts` |
| `test/gamut-raytrace.test.ts` | `test/units/color/gamut/gamut-raytrace.test.ts` |
| `test/gamut-boundary.test.ts` | `test/units/color/gamut/gamut-boundary.test.ts` |
| `test/okhsl.test.ts` | `test/units/color/gamut/okhsl.test.ts` |
| `test/oklch-slice-boundary.test.ts` | `test/units/color/gamut/oklch-slice-boundary.test.ts` |
| `test/color-conversions.test.ts` | `test/units/color/conversions/color-conversions.test.ts` |
| `test/color-jzazbz.test.ts` | `test/units/color/conversions/color-jzazbz.test.ts` |
| `test/srgb-transfer-darkband.test.ts` | `test/units/color/conversions/srgb-transfer-darkband.test.ts` |
| `test/color-classes.test.ts` | `test/units/color/color-classes.test.ts` |
| `test/color-contrast.test.ts` | `test/units/color/color-contrast.test.ts` |
| `test/color-difference.test.ts` | `test/units/color/color-difference.test.ts` |
| `test/color-emit.test.ts` | `test/units/color/color-emit.test.ts` |
| `test/color-filter.test.ts` | `test/units/color/color-filter.test.ts` |
| `test/colorFilter-spsa.test.ts` | `test/units/color/colorFilter-spsa.test.ts` |
| `test/color-function.test.ts` | `test/units/color/color-function.test.ts` |
| `test/color-hdr-spaces.test.ts` | `test/units/color/color-hdr-spaces.test.ts` |
| `test/color-hue-interpolation.test.ts` | `test/units/color/color-hue-interpolation.test.ts` |
| `test/color-into.test.ts` | `test/units/color/color-into.test.ts` |
| `test/color-mix.test.ts` | `test/units/color/color-mix.test.ts` |
| `test/color-none.test.ts` | `test/units/color/color-none.test.ts` |
| `test/color-normalize.test.ts` | `test/units/color/color-normalize.test.ts` |
| `test/color-ramp.test.ts` | `test/units/color/color-ramp.test.ts` |
| `test/color-relative.test.ts` | `test/units/color/color-relative.test.ts` |
| `test/color-roundtrip.test.ts` | `test/units/color/color-roundtrip.test.ts` |
| `test/color-sentinels.test.ts` | `test/units/color/color-sentinels.test.ts` |
| `test/color-validation.test.ts` | `test/units/color/color-validation.test.ts` |
| `test/matrix.test.ts` | `test/units/color/matrix.test.ts` |
| `test/unit-normalize.test.ts` | `test/units/unit-normalize.test.ts` |
| `test/unit-utils.test.ts` | `test/units/unit-utils.test.ts` |
| `test/units-interpolate.test.ts` | `test/units/units-interpolate.test.ts` |
| `test/value-unit.test.ts` | `test/units/value-unit.test.ts` |
| `test/computed-endpoint-cache.test.ts` | `test/units/computed-endpoint-cache.test.ts` |
| `test/parsing-easing.test.ts` | `test/parsing/timeline/parsing-easing.test.ts` |
| `test/scroll-timeline.test.ts` | `test/parsing/timeline/scroll-timeline.test.ts` |
| `test/parsing-stylesheet.test.ts` | `test/parsing/stylesheet/parsing-stylesheet.test.ts` |
| `test/parsing-extract.test.ts` | `test/parsing/stylesheet/parsing-extract.test.ts` |
| `test/parsing-extract-functions.test.ts` | `test/parsing/stylesheet/parsing-extract-functions.test.ts` |
| `test/parsing-serialize.test.ts` | `test/parsing/stylesheet/parsing-serialize.test.ts` |
| `test/grammar-2026-atrules.test.ts` | `test/parsing/stylesheet/grammar-2026-atrules.test.ts` |
| `test/parsing.test.ts` | `test/parsing/parsing.test.ts` |
| `test/parsing-sub-value.test.ts` | `test/parsing/parsing-sub-value.test.ts` |
| `test/parsing-balanced-scan.test.ts` | `test/parsing/parsing-balanced-scan.test.ts` |
| `test/parsing-memo-bounds.test.ts` | `test/parsing/parsing-memo-bounds.test.ts` |
| `test/parsing-sibling-index.test.ts` | `test/parsing/parsing-sibling-index.test.ts` |
| `test/parsing-animation-shorthand.test.ts` | `test/parsing/parsing-animation-shorthand.test.ts` |
| `test/grammar-2026-values.test.ts` | `test/parsing/grammar-2026-values.test.ts` |
| `test/math-functions.test.ts` | `test/parsing/math-functions.test.ts` |
| `test/diagnostics-sink.test.ts` | `test/parsing/diagnostics-sink.test.ts` |
| `test/round-trip.test.ts` | `test/parsing/round-trip.test.ts` |
| `test/decompose-targeted.test.ts` | `test/transform/decompose-targeted.test.ts` |
| `test/path-geometry.test.ts` | `test/transform/path-geometry.test.ts` |
| `test/quantize.test.ts` | `test/quantize/quantize.test.ts` |
| `test/quantize-chroma-weight.test.ts` | `test/quantize/quantize-chroma-weight.test.ts` |

Config: `vitest.config.ts` `include: ["test/*.ts"]` → `["test/**/*.ts"]`.

---

## Batch 2 — `parsing/{color,timeline,stylesheet}/` (§3; barrel-touching)

The three parse clusters the census flagged (each with cluster-private members)
become subdirs with an `index.ts` barrel (named re-exports only, never `export *`).
The flat parse core stays: `index` · `units` · `math` · `utils` ·
`animation-shorthand` · `syntax`. dts symbol diff: **0 removed / 0 added**
(byte-identical public surface); vitest 2158/68; lib-tsc 0; build clean.

| Old path | New path |
|---|---|
| `src/parsing/color.ts` | `src/parsing/color/color.ts` |
| `src/parsing/color-unit.ts` | `src/parsing/color/color-unit.ts` |
| `src/parsing/relative-color.ts` | `src/parsing/color/relative-color.ts` |
| — | `src/parsing/color/index.ts` (NEW barrel) |
| `src/parsing/easing.ts` | `src/parsing/timeline/easing.ts` |
| `src/parsing/scroll-timeline.ts` | `src/parsing/timeline/scroll-timeline.ts` |
| — | `src/parsing/timeline/index.ts` (NEW barrel) |
| `src/parsing/stylesheet.ts` | `src/parsing/stylesheet/stylesheet.ts` |
| `src/parsing/stylesheet-types.ts` | `src/parsing/stylesheet/stylesheet-types.ts` |
| `src/parsing/extract.ts` | `src/parsing/stylesheet/extract.ts` |
| `src/parsing/serialize.ts` | `src/parsing/stylesheet/serialize.ts` |
| — | `src/parsing/stylesheet/index.ts` (NEW barrel) |

Specifier repoints (name-preserving; `parsing/color` + `parsing/stylesheet`
HEADS resolve to their new barrels UNCHANGED): the moved-renamed leaves
`parsing/easing`→`parsing/timeline/easing`, `parsing/scroll-timeline`→
`parsing/timeline/scroll-timeline`, `parsing/extract`→`parsing/stylesheet/extract`,
`parsing/serialize`→`parsing/stylesheet/serialize` in `src/index.ts` +
`src/subpaths/{easing,parsing}.ts` + `src/parsing/animation-shorthand.ts` (the
`./extract` type import) + the mirrored tests. `src/parsing/CLAUDE.md` refreshed
(§6, bound to the move).

---

## Batch 3 — `units/color/gamut/` (§4a; barrel-touching)

The Ottosson gamut family (one concern across four top-level files) becomes a
colocated subdir. dts diff **0 removed / 0 added**; lib-tsc 0; build clean;
vitest 2158/68.

| Old path | New path |
|---|---|
| `src/units/color/gamut.ts` | `src/units/color/gamut/gamut.ts` |
| `src/units/color/gamut-raytrace.ts` | `src/units/color/gamut/raytrace.ts` |
| `src/units/color/boundary.ts` | `src/units/color/gamut/boundary.ts` |
| `src/units/color/okhsl.ts` | `src/units/color/gamut/okhsl.ts` |
| — | `src/units/color/gamut/index.ts` (NEW barrel — re-exports the gamut.ts head) |

Specifier repoints: `units/color/gamut` HEAD resolves to the new barrel UNCHANGED
(dispatch's `./gamut`, quantize, src/index gamut block, tests). The barrel
re-exports the gamut.ts head ONLY — deliberately NOT eager-aggregating
`boundary.ts` (its top-level `TARGETS` matrix math cycles through
`conversions/xyz-extended → dispatch`; aggregating it reorders that cycle and
undefines the matrices — caught by vitest, root-caused, avoided). The other
leaves repoint to their leaf paths: `units/color/gamut-raytrace`→
`units/color/gamut/raytrace`, `units/color/boundary`→`units/color/gamut/boundary`,
`units/color/okhsl`→`units/color/gamut/okhsl` in `src/index.ts` +
`src/subpaths/color.ts` + the mirrored tests.

---

## Batch 4 — the `color/constants.ts` split (§4b; barrel-touching)

The 3-concern god-table splits by concern. **Amendment to the audit grouping**:
the illuminant white-point cluster (`WHITE_POINT_*`, `WHITE_POINTS`, `WhitePoint`)
is broadly-shared colorimetric REFERENCE DATA (consumed across `base.ts`,
`conversions/{lab,xyz-extended}.ts`, `gamut/boundary.ts` — spanning subsystems,
the same class as `COLOR_SPACE_RANGES`), so it STAYS in constants.ts beside the
ranges. Only the OKLab/LMS **transform matrices** (the conversion machinery) move.
This also keeps the EXEMPT `assets/docs/xyz.md` `constants?source` snippet valid
(it displays the white-point matrices) — no assets/docs edit, honoring the
never-touch fence. dts diff **0 removed / 0 added**; lib-tsc 0; vitest 2158/68;
subpath-budget GREEN.

| Symbol group | From | To |
|---|---|---|
| ranges/bounds + **white points** (WHITE_POINT_*, WHITE_POINTS, WhitePoint) | `color/constants.ts` | **STAYS** (`color/constants.ts`) |
| OKLab/LMS transform matrices (XYZ_TO_LMS_MATRIX, LMS_TO_XYZ_MATRIX, LMS_TO_OKLAB_MATRIX, OKLAB_TO_LMS_MATRIX, LMS_TO_LINEAR_SRGB, LINEAR_SRGB_TO_LMS, OKLAB_TO_LMS_COEFF) | `color/constants.ts` | `color/conversions/matrices.ts` (NEW) |
| `GAMUT_SECTOR_COEFFICIENTS` | `color/constants.ts` | `color/gamut/gamut.ts` (its sole consumer) |

Consumers repointed to `conversions/matrices`: `conversions/{oklab,direct}.ts`,
`gamut/gamut.ts`. Public re-export of the matrices (src/index.ts +
subpaths/color.ts) → `conversions/matrices`; of GAMUT_SECTOR_COEFFICIENTS → the
gamut barrel; white points + ranges stay on `constants`. `units/color/CLAUDE.md`
refreshed (§6, covers Batch 3 + Batch 4).

---

## Batch 5 — the hue-swept boundary sampler (T-21; NEW code, additive)

Not a move — the T-21 src item. `gamut/boundary.ts` gains, beside
`sampleOKLChSliceBoundary`, the hue-swept envelope sampler the gradient
instrument (W6-2) consumes: per L row the min/max in-gamut chroma across a swept
hue interval (three truth regimes), with the zero-alloc `Into` twin + the
peak-cusp referent for the cusp-adaptive axis. A single-hue interval degenerates
to the exact slice. Geometry stays library-owned. NEW public exports on the
`./color` subpath (semver-MINOR, additive — dts diff **+3 / 0 removed**):

| Symbol | Kind |
|---|---|
| `sampleOKLChHueSweepBoundary` | fn (allocating) |
| `sampleOKLChHueSweepBoundaryInto` | fn (zero-alloc `Into` twin) |
| `OKLChHueSweepBoundary` | interface |

Exported from `src/subpaths/color.ts` (mirrors `sampleOKLChSliceBoundary`'s
`./color`-only placement). Tests: `test/units/color/gamut/oklch-hue-sweep-boundary.test.ts`
(13 cases — envelope correctness cross-checked against the slice sampler, single-hue
degeneracy, cusp envelope, achromatic, the Into twin, validation). vitest 2171/69.
