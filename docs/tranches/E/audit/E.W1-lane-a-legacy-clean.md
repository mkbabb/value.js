# E.W1 Lane A — Legacy-clean + barrel cleanup

**Target HEAD**: `d9a1399817abf8a6d2f7cf377c02c6731beb120b` (tranche-e).
**Operator**: E.W1 Lane A agent.
**Date**: 2026-05-20.
**Mode**: read + write (src/, docs/, package.json, CHANGELOG.md). NO git mutation.

## §1 — Pre-state survey

### §1.1 — `lerpLegacy` callers in value.js's own scope

```
$ grep -rn 'lerpLegacy' src/ test/ demo/ api/ e2e/
src/math.ts:37:export const lerpLegacy = (t: number, start: number, end: number) =>
src/index.ts:220:    lerpLegacy,
demo/CLAUDE.md:145:- `lerp(a, b, t)` canonical arg order (D.W3 Lane C L11); `lerpLegacy(t, a, b)` aliased deprecated
```

- One definition (`src/math.ts:37`).
- One barrel re-export (`src/index.ts:220`).
- One documentation reference (`demo/CLAUDE.md`).
- **Zero** runtime call sites inside value.js (src/, demo/, api/, test/, e2e/).
- One **cross-repo** runtime consumer pattern: `keyframes.js/src/animation/numeric.ts:159` — silently broken against v0.6.0 (the E5 trigger). This is the reason A.1 keeps `lerpLegacy` alive.

### §1.2 — The 51 `<from>2<to>` functions in the `src/index.ts` barrel (pre-state)

Verified by reading the pre-edit `src/index.ts` lines 118-183. Pre-edit re-exports (alphabetized for clarity, 51 entries total):

```
adobeRgb2xyz, adobeRgbToLinear, displayP32xyz, hex2rgb, hsl2hsv, hsl2hwb, hsl2rgb,
hsl2xyz, hsv2hsl, hsv2xyz, hwb2hsl, hwb2xyz, kelvin2rgb, kelvin2xyz, lab2lch,
lab2oklab, lab2oklch, lab2xyz, lch2lab, lch2xyz, linearSrgb2xyz, linearToAdobeRgb,
linearToProPhoto, linearToRec2020, linearToSrgb, oklab2lab, oklab2oklch, oklab2xyz,
oklch2lab, oklch2oklab, oklch2xyz, proPhoto2xyz, proPhotoToLinear, rec20202xyz,
rec2020ToLinear, rgb2hex, rgb2hsl, rgb2kelvin, rgb2xyz, srgbToLinear, xyz2adobeRgb,
xyz2displayP3, xyz2hsl, xyz2hsv, xyz2hwb, xyz2kelvin, xyz2lab, xyz2lch, xyz2linearSrgb,
xyz2oklab, xyz2oklch, xyz2proPhoto, xyz2rec2020, xyz2rgb
```

Count: **54 entries** — the audit specified "51" was an approximation. The actual set covers (a) 8 RGB transfer-function pairs (sRGB / Adobe / ProPhoto / Rec2020), (b) ~22 XYZ-hub conversions (RGB/HSL/HSV/HWB/LAB/LCH/OKLAB/OKLCH/Kelvin/LinearSRGB/DisplayP3/AdobeRGB/ProPhoto/Rec2020 ↔ XYZ), (c) 12 inter-space helpers (HSL↔HSV/HWB, LAB↔LCH, OKLAB↔LAB, OKLAB↔OKLCH, OKLCH↔LAB), (d) the 4 hex/kelvin pairs.

### §1.3 — Cross-scope consumer survey of the 54 functions

Survey: `grep -rln "<from>2<to>" demo/ test/ api/ e2e/` for each of the 54 names.

| Function | demo/ | test/ | api/ | e2e/ | Notes |
|---|---|---|---|---|---|
| `hex2rgb` | 1 (`SearchFilterBar.vue:139`) | 1 | 0 | 0 | demo imports `@src/units/color/utils` (internal path) |
| `xyz2rgb` | 1 (`useColorGeneration.ts:24`) | 1 | 0 | 0 | demo imports `@src/units/color/utils` (internal path) |
| `oklch2xyz` | 1 (`useColorGeneration.ts:24`) | 1 | 0 | 0 | demo imports `@src/units/color/utils` (internal path) |
| Other 51 | 0 | 1 each | 0 | 0 | test/color-conversions.test.ts imports `../src/units/color/utils` (internal path) |

**Key finding**: ALL consumers of the 54 conversion functions import via the **internal path** (`@src/units/color/utils` alias OR `../src/units/color/utils` relative), NOT through `@mkbabb/value.js`'s public barrel. The functions remain defined in `src/units/color/utils.ts` (so `color2`'s dispatch table continues to call them internally). Un-exporting from `src/index.ts` does NOT break any in-tree consumer.

**Cross-repo** consumer survey (per `E-FOLD-3 §3`): keyframes.js does NOT import any of the 54 individual conversion functions — un-export is safe at the constellation level.

### §1.4 — Dead-export consumers

```
$ grep -rn 'BLACKLISTED_COALESCE_UNITS\|STRING_UNITS\|COLOR_UNITS' src/ demo/ test/ api/ e2e/
src/index.ts:17:    STRING_UNITS,
src/index.ts:18:    COLOR_UNITS,
src/index.ts:20:    BLACKLISTED_COALESCE_UNITS,
src/units/constants.ts:56:export const STRING_UNITS = ["string"] as const;
src/units/constants.ts:58:export const COLOR_UNITS = ["color"] as const;
src/units/constants.ts:71:    ...STRING_UNITS,
src/units/constants.ts:73:    ...COLOR_UNITS,
src/units/constants.ts:79:export const BLACKLISTED_COALESCE_UNITS = ["string", "var", "calc"] as const;
src/units/index.ts:3:import { BLACKLISTED_COALESCE_UNITS, UNITS } from "./constants";
src/units/index.ts:83:        if (BLACKLISTED_COALESCE_UNITS.includes(this.unit as any)) {
```

- `BLACKLISTED_COALESCE_UNITS`: ONE internal consumer (`src/units/index.ts:83`, inside `ValueUnit.coalesce()`). Definition stays in `src/units/constants.ts`; only the barrel re-export is removed.
- `STRING_UNITS` and `COLOR_UNITS`: defined in `src/units/constants.ts` and spread into the `UNITS` tuple at lines 71/73 (still needed internally for the union construction). Only the barrel re-export is removed.
- Zero demo/test/api/e2e consumers.

**Disposition**: safe to remove from the barrel; the definitions stay internal.

### §1.5 — vue-router consumers in src/

```
$ grep -rn 'vue-router' src/
(no results)
```

The library does not consume vue-router. Confirmed it is a demo-side dependency (used by `demo/`). Mis-placed in `dependencies`.

## §2 — Surveys + decisions

### A.1 — `lerpLegacy` JSDoc

**Pre-state JSDoc** (verbatim from `src/math.ts:33-36` pre-edit):

```ts
/**
 * @deprecated Legacy `lerp(t, a, b)` ordering. Migrate to `lerp(a, b, t)`.
 * Will be removed in the next tranche.
 */
```

**Post-state JSDoc** (per E.W1.md Lane A.1 spec):

```ts
/**
 * @deprecated Legacy `lerp(t, a, b)` ordering. Migrate to `lerp(a, b, t)`.
 * Will be removed after keyframes.js's `file:`-linked consumer migrates
 * the single call site at `keyframes.js/src/animation/numeric.ts:159`,
 * verified by `cd keyframes.js && npm test` passing against master value.js.
 * See value.js `docs/tranches/E/coordination/Q.md §5`.
 */
```

**Diff applied**: YES.

### A.2 — 54-conversion un-export

**Strategy decided**: UN-EXPORT (per `E-FOLD-3 §3` — zero external + zero in-tree-via-barrel consumers).

**Functions removed from `src/index.ts`** (the full 54-entry list from §1.2 above):

```
adobeRgb2xyz, adobeRgbToLinear, displayP32xyz, hex2rgb, hsl2hsv, hsl2hwb, hsl2rgb,
hsl2xyz, hsv2hsl, hsv2xyz, hwb2hsl, hwb2xyz, kelvin2rgb, kelvin2xyz, lab2lch,
lab2oklab, lab2oklch, lab2xyz, lch2lab, lch2xyz, linearSrgb2xyz, linearToAdobeRgb,
linearToProPhoto, linearToRec2020, linearToSrgb, oklab2lab, oklab2oklch, oklab2xyz,
oklch2lab, oklch2oklab, oklch2xyz, proPhoto2xyz, proPhotoToLinear, rec20202xyz,
rec2020ToLinear, rgb2hex, rgb2hsl, rgb2kelvin, rgb2xyz, srgbToLinear, xyz2adobeRgb,
xyz2displayP3, xyz2hsl, xyz2hsv, xyz2hwb, xyz2kelvin, xyz2lab, xyz2lch, xyz2linearSrgb,
xyz2oklab, xyz2oklch, xyz2proPhoto, xyz2rec2020, xyz2rgb
```

**Barrel survivors** in the same export block (the canonical public surface):

```
getFormattedColorSpaceRange, color2, gamutMap, interpolateHue, mixColors,
CYLINDRICAL_HUE_COMPONENT, computeSafeAccent, safeAccentColor,
needsContrastAdjustment, getOklchLightness
```

Plus the type re-export: `export type { HueInterpolationMethod }`.

**Internal call sites preserved**: `color2()` in `src/units/color/utils.ts` continues to call the 54 functions via its internal dispatch — no re-routing needed because the functions still live in the same file. `colorUnit2` in `src/units/color/normalize.ts` is unchanged.

**Tree-shaking note**: `sideEffects: false` is set in `package.json`. The 54 internal functions are now reachable ONLY through `color2`'s dispatch — Rollup/esbuild can DCE the unreached subset for any consumer that doesn't exercise the full conversion graph. Hence the −1,549-byte dist/value.js reduction (see §3.5).

### A.3 — vue-router move

- **Pre-state position**: `dependencies` (line 60 pre-edit).
- **Post-state position**: `devDependencies` (alphabetical between `vue-eslint-parser` and `vue-tsc`).
- **Diff applied**: YES.

### A.4 — Dead exports

| Export | In-tree non-barrel consumers | Cross-repo consumers | Action |
|---|---|---|---|
| `BLACKLISTED_COALESCE_UNITS` | 1 (`src/units/index.ts:3+83`) | 0 (keyframes.js does NOT import per E-FOLD-3 §3) | barrel re-export removed; definition stays |
| `STRING_UNITS` | 1 (`src/units/constants.ts:71` spread into `UNITS`) | 0 | barrel re-export removed; definition stays |
| `COLOR_UNITS` | 1 (`src/units/constants.ts:73` spread into `UNITS`) | 0 | barrel re-export removed; definition stays |

All three deleted from the `src/index.ts` barrel.

### A.5 — Sweep

**Final grep result**:

```
$ grep -rn '@deprecated\|_legacy\|Legacy\|_old\|\bOld\b' src/
src/math.ts:34: * @deprecated Legacy `lerp(t, a, b)` ordering. Migrate to `lerp(a, b, t)`.
src/math.ts:40:export const lerpLegacy = (t: number, start: number, end: number) =>
src/index.ts:166:    lerpLegacy,
```

**All survivors are the lerpLegacy JSDoc + the export + the barrel re-export**: YES. The grep matches `Legacy` in the JSDoc text and the `lerpLegacy` identifier itself. No other `@deprecated` / `_old` / `_legacy` / `\bOld\b` matches anywhere in src/.

### A.6 — CHANGELOG.md

- v0.7.0 entry added at top: **YES** (above the existing v0.6.0 entry).
- BREAKING / DEFERRED / INTERNAL sections present: **YES**.

## §3 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `npm run lint` | exit 0 | exit 0 | **PASS** |
| `npx vue-tsc --noEmit 2>&1 \| grep -c 'error TS'` | 126 (shadcn-vue residual cluster) | 126 | **PASS** |
| `npx vitest run` | 1582+ passing | 1582 / 1582 across 34 files | **PASS** |
| `npm run build` | clean | clean (2.56s, 33 modules) | **PASS** |
| `dist/value.js` size (raw) | recorded | **136,051 bytes** (pre: 137,600 — **−1,549**) | recorded |
| `dist/value.js` size (gzip) | recorded | **39.96 KB** (pre: 40.44 KB — **−0.48 KB**) | recorded |
| `npm run proof:resolution` | GREEN | `[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied` | **PASS** |

The dist/value.js shrinkage matches the un-export thesis: with the 54 conversion functions no longer reachable from the main entry, Rollup's tree-shaker DCEs the subset that `color2`'s dispatch path doesn't transitively cover. The ~1.5 KB raw / ~0.5 KB gzip reduction is the conservative-but-real measure of legacy surface area shed.

## §4 — Files modified (DO NOT commit; orchestrator stages)

- `src/math.ts` — `lerpLegacy` JSDoc replaced with the E5-compliant retirement-trigger text (A.1).
- `src/index.ts` — 54 `<from>2<to>` barrel re-exports removed; 3 dead exports (`BLACKLISTED_COALESCE_UNITS`, `STRING_UNITS`, `COLOR_UNITS`) removed; comment added to clarify the new public surface (A.2 + A.4).
- `package.json` — `vue-router` moved from `dependencies` (where it was alone with `@mkbabb/parse-that`) to `devDependencies` (alphabetical position between `vue-eslint-parser` and `vue-tsc`) (A.3).
- `CHANGELOG.md` — v0.7.0 entry added above v0.6.0 with BREAKING / DEFERRED / INTERNAL sections (A.6).
- `docs/tranches/E/audit/E.W1-lane-a-legacy-clean.md` — this audit doc (new).

## §5 — E.W1 Lane A sub-gate verdict

**PASS.** All A.1-A.6 tasks executed per E.W1.md spec + E-FOLD round amendments. All 5 verification gates green:

- lint exit 0.
- vue-tsc holds at 126 (no regression — the shadcn-vue residual cluster).
- vitest 1582 / 1582 across 34 files (test imports via internal path were the safety margin that kept all conversion-function tests passing without modification).
- build clean.
- proof:resolution GREEN.

Plus the **dist/value.js shrinkage by 1,549 bytes (−0.48 KB gzip)** confirms the un-export actually shed dead surface, not just hid it.

**E5 compliance** preserved: `lerpLegacy` survives with an upgraded JSDoc that records (a) the systemic blocker — keyframes.js's silently-broken `numeric.ts:159` consumer; (b) the smallest unblock — the §5.2 migration diff in `coordination/Q.md`; (c) the re-check trigger — `cd keyframes.js && npm test` passing against master value.js. The deprecation is now a routable contract, not a dead-letter office.

**E1 + E2 compliance** preserved: no legacy code retained without an active consumer pattern OR a documented trigger. The 54 conversion functions are not "legacy" — they remain the runtime substrate of `color2`; what changed is their visibility, not their identity. The 3 dead constant exports HAD zero consumers — they are the actual "no legacy code" deletion.

Lane A clears the way for Lanes B–E (`WhitePointColor<T>` lift, `DIRECT_PATHS` table, nameParser perf, type-tidy) without re-litigating the public surface.
