# B-e2e — Overlap with the vitest unit suite

**Tranche B assay lane "e2e-overlap".** Read-only, 2026-05-18.

An e2e test earns its keep only by testing integration / rendering / cross-component flow a unit test cannot. value.js has 1409 vitest unit tests across 26 files in `test/`. This lane measures how much e2e "coverage" merely re-runs library logic.

## Unit-suite coverage map (the overlap-relevant files)

| vitest file | covers |
|---|---|
| `color-validation.test.ts` (567 tests) | all 10 color spaces parsed (100 inputs), RGB round-trip, normalize round-trip, named-color expected-RGB, edge cases (transparent, `none`, hex shorthand≡longhand, case-insensitivity), 10×10 cross-space conversion |
| `color-conversions.test.ts` | hex/rgb/hsl/hsv/hwb/xyz/lab/lch/oklab/oklch/kelvin conversions with round-trip + known-value assertions |
| `parsing.test.ts` | CSSColor parsing every format; invalid-color rejection |
| `gamut-mapping.test.ts` | gamut map, intersection, deltaEOK |
| `color-mix.test.ts`, `color-hue-interpolation.test.ts`, `color-contrast.test.ts`, `color-normalize.test.ts`, `color-roundtrip.test.ts` | mixing, hue arcs, contrast pipeline, normalization, full round-trips |

## E2e overlap verdict

| e2e spec | library-logic assertions | redundant with | e2e-legitimate fraction | verdict |
|---|---|---|---|---|
| **color-visual-validation** | 3 of 4 test blocks — `parseCSSColor`+`colorUnit2` on the same 100 + 20 + 22 inputs | `color-validation.test.ts` (identical inputs, identical pipeline) | ~25% (only the `getComputedStyle` native-CSS cross-check is unique) | **NONE** |
| color-header-layout | ~10 (`isFinite` per space on rendered component values) | `color-validation.test.ts` (weakly) | ~75% | THIN |
| color-docs-rendering | 0 | — | ~92% (render-pipeline) | SUBSTANTIAL render, but see census (content-correctness, not flow) |
| color-space-switching | 0 | — | 100% but thin UI-config | THIN |
| color-picker | 0 | — | 100% | SUBSTANTIAL |
| the other 11 (palette/admin/mobile/slug/routing) | 0 | — | ~100% | SUBSTANTIAL flow |

## Total

Approximately **120–140 e2e assertions duplicate unit coverage**, almost all of them in `color-visual-validation.spec.ts`. That spec is a unit test routed through a headless Chromium for no added coverage — it multiplies runtime ~100×, adds browser-startup flakiness, and is fully owned by `color-validation.test.ts`.

`color-header-layout` has ~10 weak `isFinite` assertions also covered by the validation suite; its layout/aria assertions are e2e-legitimate.

## Conclusion

`color-visual-validation` must be deleted — its content belongs to (and is already in) the vitest suite. The other specs have no material library-logic redundancy; their disposition rests on the brittleness and target lanes.
