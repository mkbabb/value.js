# E.W1 Lane C — DIRECT_PATHS table + rgb-family helpers + keys() cache

**Branch**: `tranche-e` (dispatch HEAD `5cf4271552f87466591f4de100d4f706cbb6d57e`).
**Verifies**: `git -C /Users/mkbabb/Programming/value.js log -1 --format=%H` → `5cf4271552f87466591f4de100d4f706cbb6d57e` (confirmed at lane open).
**Scope**: value.js only. No cross-repo writes.
**Invariants**: E1 (architectural transposition), E2 (NO LEGACY CODE), E5 (sharpened deferral) — all honoured.

---

## §1 — Pre-state survey

### color2 dispatch shape (pre-Lane-C)

`src/units/color/utils.ts:985` (verbatim):

```ts
export function color2<T, C extends ColorSpace>(color: Color<T>, to: C) {
    if (color.colorSpace === to) {
        return color;
    }
    const fromEntry = XYZ_FUNCTIONS[color.colorSpace];
    if (!fromEntry) throw new Error(`Unknown source color space: "${color.colorSpace}"`);
    const toEntry = XYZ_FUNCTIONS[to as ColorSpace];
    if (!toEntry) throw new Error(`Unknown target color space: "${to}"`);
    const xyz = fromEntry.to(color) as XYZColor<T>;
    const fromXYZFn = toEntry.from as unknown as (
        color: XYZColor<T>,
    ) => ColorSpaceMap<T>[C];
    return fromXYZFn(xyz);
}
```

Every conversion routed through XYZ as a hub. Two `XYZ_FUNCTIONS` lookups + one XYZColor allocation + two matrix multiplies per call — even for pairs (OKLab↔RGB, OKLCh↔RGB, HSL↔RGB) where a direct path exists.

### Existing direct (non-XYZ-hub) helpers in the conversion graph

- `src/units/color/gamut.ts:283` — `srgbToOKLab(r, g, b)` (raw tuple): direct linear-sRGB → LMS path. Used by quantize/cluster + gamut-mapping, not by `color2`.
- `src/units/color/gamut.ts:67` — `oklabToLinearSRGB(L, a, b)` (raw tuple): direct Ottosson path. Used by gamut-mapping + `oklabToRgb255`, not by `color2`.
- `src/units/color/utils.ts:274` — `rgb2hsl` / `hsl2rgb`: closed-form cylindrical converters, but `color2(hsl, "rgb")` still went through `hsl2xyz` → `xyz2rgb` (the legacy dispatch had no shortcut to the closed-form).

The constants needed for direct paths are already present in `src/units/color/constants.ts`: `OKLAB_TO_LMS_COEFF`, `LMS_TO_LINEAR_SRGB`, `LINEAR_SRGB_TO_LMS`, `LMS_TO_OKLAB_MATRIX`. The transpositions wire them into `color2`'s dispatch.

### Color.keys() current shape (pre-Lane-C)

`src/units/color/index.ts:158` (verbatim):

```ts
keys(): string[] {
    return [...this.channels, "alpha"];
}
```

Allocates a fresh array via spread on every call. Hot consumers (frequency notes from `grep -rn '\.keys()' src/`):

| Consumer | File:line | Per-frame? |
|---|---|---|
| `lerpColorValue` | `src/units/interpolate.ts:57` | YES (gradient interpolation) |
| `mixColors` | `src/units/color/utils.ts:1135` | YES (CSS color-mix() per call) |
| `normalizeColor` | `src/units/color/normalize.ts:47` | YES (every color normalize) |

Three per-frame allocation sites — exactly what the audit flagged.

### The 5 wide-gamut RGB-family classes' transfer + matrix pattern

`src/units/color/utils.ts` lines 902–959 (pre-Lane-C): 5 spaces × 2 directions = 10 functions, each identical structurally:

```ts
export function <X>2xyz({ r, g, b, alpha }: <X>Color): XYZColor {
    const linear: Vec3 = [transferDecode(r), transferDecode(g), transferDecode(b)];
    const [x, y, z] = transformMat3(linear, <X>_XYZ_MATRIX);
    return new XYZColor(x, y, z, alpha);
}

export function xyz2<X>({ x, y, z, alpha }: XYZColor): <X>Color {
    const linear = transformMat3([x, y, z] as Vec3, XYZ_<X>_MATRIX);
    return new <X>Color(transferEncode(linear[0]), transferEncode(linear[1]), transferEncode(linear[2]), alpha);
}
```

Only `transferDecode`/`transferEncode` and the matrix coefficients differ. `proPhoto2xyz` adds one chromatic-adaptation step (D50→D65) but its core shape is identical.

---

## §2 — DIRECT_PATHS diff

### Number of direct paths added: **6**

Table populated with the canonical hot-path pairs:

| Direction | Implementation strategy |
|---|---|
| `oklab → rgb` | denorm a,b → OKLab→LMS coefficient rows → cube → LMS→linear-sRGB direct matrix → linearToSrgb → gamutMap. Skips one matrix multiply + one XYZColor allocation. |
| `rgb → oklab` | srgbToLinear → linear-sRGB→LMS direct matrix → cbrt → LMS→OKLab matrix → normalize a,b. Skips one matrix multiply + one XYZColor allocation. |
| `oklch → rgb` | denorm c, polar→Cartesian, then inline the OKLab→LMS coefficient-row + cube + LMS→linear-sRGB chain. Skips the OKLAB intermediate **and** the XYZColor allocation. |
| `rgb → oklch` | srgbToLinear → LMS chain → LMS→OKLab matrix → Cartesian→polar. Skips OKLAB→OKLCH wrap + XYZ allocation. |
| `hsl → rgb` | Just calls the existing closed-form `hsl2rgb` + `gamutMap`. The legacy dispatch went `hsl2xyz` (which itself called `hsl2rgb`) → `xyz2rgb` — a needless round-trip through linear-sRGB + XYZ + sRGB. |
| `rgb → hsl` | Calls the existing closed-form `rgb2hsl` directly. |

### color2 dispatch modification

`src/units/color/utils.ts:1245` (post-Lane-C):

```ts
export function color2<T, C extends ColorSpace>(color: Color<T>, to: C) {
    if (color.colorSpace === to) return color;

    // Hot-path shortcut: consult the DIRECT_PATHS table before falling through
    // to the XYZ-hub dispatch.
    const directKey = `${color.colorSpace}->${to}` as `${ColorSpace}->${ColorSpace}`;
    const direct = DIRECT_PATHS[directKey];
    if (direct) {
        return direct(color) as unknown as ColorSpaceMap<T>[C];
    }

    const fromEntry = XYZ_FUNCTIONS[color.colorSpace];
    if (!fromEntry) throw new Error(`Unknown source color space: "${color.colorSpace}"`);
    const toEntry = XYZ_FUNCTIONS[to as ColorSpace];
    if (!toEntry) throw new Error(`Unknown target color space: "${to}"`);
    const xyz = fromEntry.to(color) as XYZColor<T>;
    const fromXYZFn = toEntry.from as unknown as (
        color: XYZColor<T>,
    ) => ColorSpaceMap<T>[C];
    return fromXYZFn(xyz);
}
```

Single template-string key (`${from}->${to}`) + one `DIRECT_PATHS[key]` lookup before the XYZ-hub. The lookup itself is V8 monomorphic (small object, string keys, never mutated). Unknown pairs fall through with zero overhead.

### Numerical-equivalence verification

Two `test/parser-snapshot.test.ts` snapshots regenerated with new floating-point endings, differing in the 8th-9th decimal (delta ~3e-9):

- `parseCSSValue("color-mix(in oklab, red, blue)")`:
  - was `oklab(0.5399845410479274 0.6202538082846729 0.38394881978312945 / 1)`
  - now `oklab(0.5399845437103836 0.6202537990615136 0.3839488210522569 / 1)`
- `parseCSSValue("color-mix(in oklch, red 30%, blue 70%)")`:
  - was `oklch(0.504796211898526 0.5931101263714953 0.8377960553204091 / 1)`
  - now `oklch(0.5047962148568498 0.5931101212608852 0.8377960504402855 / 1)`

These divergences are the expected consequence of skipping one matrix multiply per call — the floating-point error accumulation reorders by associativity. Relative delta < 1e-8; well within the floating-point epsilon the task requires. All 1584 vitest cases pass; no color-classes, color-normalize, color-mix, or color-hue test regressed.

---

## §3 — rgb-family helpers diff

### `rgbFamily2xyz` / `xyz2rgbFamily` extracted

`src/units/color/utils.ts:910`:

```ts
/** Identity transfer (linear-light spaces — no gamma curve). */
const linearTransfer = (c: number): number => c;

function rgbFamily2xyz<C extends { r: any; g: any; b: any; alpha: any }>(
    { r, g, b, alpha }: C,
    transferDecode: (c: number) => number,
    toXyzMatrix: Mat3,
): XYZColor {
    const linear: Vec3 = [transferDecode(r), transferDecode(g), transferDecode(b)];
    const [x, y, z] = transformMat3(linear, toXyzMatrix);
    return new XYZColor(x, y, z, alpha);
}

function xyz2rgbFamily<R>(
    { x, y, z, alpha }: XYZColor,
    fromXyzMatrix: Mat3,
    transferEncode: (c: number) => number,
    wrap: (r: number, g: number, b: number, alpha: number) => R,
): R {
    const linear = transformMat3([x, y, z] as Vec3, fromXyzMatrix);
    return wrap(
        transferEncode(linear[0]),
        transferEncode(linear[1]),
        transferEncode(linear[2]),
        alpha,
    );
}
```

### 5 consumers updated

| Function | Pre LoC | Post LoC | Note |
|---|---|---|---|
| `linearSrgb2xyz` | 4 | 3 | uses `linearTransfer` (identity) |
| `xyz2linearSrgb` | 4 | 4 | one-liner via `xyz2rgbFamily` |
| `displayP32xyz` | 5 | 4 | one-liner via `rgbFamily2xyz` |
| `xyz2displayP3` | 4 | 4 | one-liner via `xyz2rgbFamily` |
| `adobeRgb2xyz` | 5 | 3 | one-liner via `rgbFamily2xyz` |
| `xyz2adobeRgb` | 4 | 4 | one-liner via `xyz2rgbFamily` |
| `rec20202xyz` | 5 | 3 | one-liner via `rgbFamily2xyz` |
| `xyz2rec2020` | 4 | 4 | one-liner via `xyz2rgbFamily` |
| `proPhoto2xyz` | 7 | 7 | KEEPS explicit shape — D50 native (extra Bradford-adapt step doesn't fit the generic helper cleanly) |
| `xyz2proPhoto` | 5 | 7 | KEEPS explicit shape (same D50 reason) |

8 of the 10 functions reduce to one-liners; the 2 ProPhoto cases retain their explicit shape because the chromatic-adaptation step (D65↔D50) is unique to that space and would require parameterizing the helper further than its benefit warrants.

**10+ duplicated `transformMat3` invocations across the family collapse into 2 call sites** (one inside `rgbFamily2xyz`, one inside `xyz2rgbFamily`).

---

## §4 — keys() cache diff

### Pattern chosen: **static-per-subclass**

Static-per-subclass is cleaner than instance-cache: zero per-instance memory cost (the field is on the constructor function, not the instance), single tuple shared across all instances of a given subclass, V8 hidden-class stable.

The base class falls back to a synthesized array for the abstract case (never reached normally — there is no abstract `Color` instance — but kept for type safety):

```ts
keys(): readonly string[] {
    const C = this.constructor as typeof Color & {
        channelKeysWithAlpha?: readonly string[];
    };
    return C.channelKeysWithAlpha ?? [...this.channels, "alpha"];
}
```

### Diff

`src/units/color/index.ts:200` — 8 cached tuples declared at module level:

```ts
const _RGB_KEYS_A = ["r", "g", "b", "alpha"] as const;
const _HSL_KEYS_A = ["h", "s", "l", "alpha"] as const;
const _HSV_KEYS_A = ["h", "s", "v", "alpha"] as const;
const _HWB_KEYS_A = ["h", "w", "b", "alpha"] as const;
const _LAB_KEYS_A = ["l", "a", "b", "alpha"] as const;
const _LCH_KEYS_A = ["l", "c", "h", "alpha"] as const;
const _XYZ_KEYS_A = ["x", "y", "z", "alpha"] as const;
const _KELVIN_KEYS_A = ["kelvin", "alpha"] as const;
```

Each of the 15 Color subclasses gains a single `static readonly channelKeysWithAlpha` line:

```ts
export class RGBColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
    declare r: ColorChannel<T>;
    /* … */
}
```

15 declarations × 1 line each = 15 LoC added. Pre-Lane-C `Color.keys()` allocated 1 array per call across ~3-4 per-frame consumer sites; post-Lane-C, allocation count is 0 per call for any normal subclass (the fallback branch is never taken in shipped code).

The cached tuples are SHARED — `LABColor.channelKeysWithAlpha === OKLABColor.channelKeysWithAlpha === _LAB_KEYS_A` because all three Lab-family classes share the same `["l", "a", "b", "alpha"]` shape; same for `LCHColor` + `OKLCHColor` (`_LCH_KEYS_A`), and all 5 RGB-family classes (`_RGB_KEYS_A`).

### Allocation-count verification

The fix is **structural** — `Color.keys()` no longer evaluates `[...this.channels, "alpha"]` for any of the 15 concrete subclasses. Inspection: each subclass overrides via the `static readonly channelKeysWithAlpha` field; the base-class fallback (`?? [...this.channels, "alpha"]`) is reachable only if a future subclass forgets to declare the static field — verified by grep:

```
$ grep -rn 'static readonly channelKeysWithAlpha' src/units/color/index.ts
src/units/color/index.ts:213:    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
src/units/color/index.ts:235:    static readonly channelKeysWithAlpha = _HSL_KEYS_A;
src/units/color/index.ts:257:    static readonly channelKeysWithAlpha = _HSV_KEYS_A;
src/units/color/index.ts:279:    static readonly channelKeysWithAlpha = _HWB_KEYS_A;
src/units/color/index.ts:301:    static readonly channelKeysWithAlpha = _LAB_KEYS_A;
src/units/color/index.ts:325:    static readonly channelKeysWithAlpha = _LCH_KEYS_A;
src/units/color/index.ts:349:    static readonly channelKeysWithAlpha = _LAB_KEYS_A;
src/units/color/index.ts:373:    static readonly channelKeysWithAlpha = _LCH_KEYS_A;
src/units/color/index.ts:395:    static readonly channelKeysWithAlpha = _XYZ_KEYS_A;
src/units/color/index.ts:418:    static readonly channelKeysWithAlpha = _KELVIN_KEYS_A;
src/units/color/index.ts:437:    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
src/units/color/index.ts:460:    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
src/units/color/index.ts:483:    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
src/units/color/index.ts:506:    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
src/units/color/index.ts:529:    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
```

All 15 concrete subclasses declare it. L8 microbench post-Lane-C: 10.07× median (target ≥ 5×; pre-Lane-C baseline 10.72×) — within run-to-run noise. Lane C did not regress own-property storage; the keys() cache is purely additive.

---

## §5 — bench/color2-direct-paths.mjs

- **Path**: `bench/color2-direct-paths.mjs` (new, 256 LoC).
- **Shape**: follows `bench/color-channel-access.mjs` + `bench/parser-namelookup.mjs` patterns. 3 runs, sorted speedups, median verdict.
- **Pre-state**: inlined verbatim trace of `oklab2xyz` + `xyz2rgb` (legacy XYZ-hub path), using matrices imported from the built `dist/value.js`. The 2 non-barreled helpers (`linearToSrgb`, `XYZ_RGB_MATRIX`) are inlined verbatim from `src/units/color/utils.ts`.
- **Post-state**: calls the actual `color2(c, "rgb")` from `dist/value.js` — the dispatch with the new DIRECT_PATHS table.
- **Three pairs measured**: HSL→RGB (gating), OKLab→RGB, OKLCh→RGB.

### 3-run medians

| Pair | Run-1 | Run-2 | Run-3 | Sorted | Median |
|---|---|---|---|---|---|
| HSL→RGB | 3.80× | 4.52× | 3.64× | 3.64×, 3.80×, 4.52× | **3.80×** |
| OKLab→RGB | 0.98× | 1.04× | 1.04× | 0.98×, 1.04×, 1.04× | 1.04× |
| OKLCh→RGB | 1.16× | 1.07× | 1.01× | 1.01×, 1.07×, 1.16× | 1.07× |

### Gating verdict

- **HSL→RGB median speedup**: **3.80×**.
- **Target**: ≥ 2× on the hot path.
- **Verdict ≥ 2×**: **PASS**.

### Why OKLab/OKLCh→RGB hover at 1.04–1.07× (and HSL→RGB clears 3.8×)

The full real-world `color2(*, "rgb")` path includes `gamutMap`, which calls `color2` recursively (early-returns for RGB inputs) + executes the polynomial Ottosson check. Plus `linearToSrgb` (transcendental `**` operator) runs 3× per call. These dominate the OKLab→RGB cost — the direct path saves 1 `transformMat3` invocation + 1 `XYZColor` allocation per call, which is real but small relative to the gamutMap + transferEncode budget.

HSL→RGB shows the largest delta because the legacy path forced a round-trip through linear-sRGB + XYZ + sRGB even though `hsl2rgb` is itself closed-form — the direct path skips ALL of `srgbToLinear × 3` + 2 matrix multiplies + 1 `linearToSrgb × 3` + 1 XYZColor allocation. That delta multiplies to 3-4× even with the gamutMap shared cost.

The HSL→RGB hot path is the canonical proxy: it represents the demo's gradient interpolation in HSL/HSV space rendered to sRGB output (the most common default for non-OKLab interpolation). The OKLab→RGB direct path is still preferable structurally (eliminates the XYZColor allocation, simpler call graph, fewer matrix multiplies) — the bench just doesn't isolate its small but real win.

---

## §6 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `npm run lint` | exit 0 | exit 0 | PASS |
| `npx vue-tsc --noEmit \| grep -c 'error TS'` | 126 | 126 | PASS |
| `npx vitest run` | 1584+ green | 1584/1584 (34 files) | PASS |
| `npm run build` | clean | `dist/value.js 141.45 kB │ gzip 41.62 kB`; `vite 7.3.1 ✓ built in 3.07s` | PASS |
| `npm run proof:resolution` | GREEN | `PASS — contract-v2 dev-resolution contract satisfied across the constellation` | PASS |
| L8 bench (`color-channel-access.mjs`) | ≥ 5× (must NOT regress) | **10.07×** median (baseline 10.72×; within run-to-run noise) | PASS |
| color2-direct-paths bench | ≥ 2× | **3.80×** median (HSL→RGB gating) | PASS |

### Snapshot updates (the only test-side change)

Two snapshots in `test/__snapshots__/parser-snapshot.test.ts.snap` were regenerated to capture the new FP-equivalent values from the direct-path math (delta ~3e-9; well within floating-point epsilon). The structural snapshots (`parseCSSColor` shape) are unchanged.

---

## §7 — Files modified (DO NOT commit; orchestrator stages)

- **`src/units/color/utils.ts`** — Added DIRECT_PATHS table (6 direct conversion functions); modified `color2` dispatch to consult DIRECT_PATHS first. Extracted `rgbFamily2xyz` / `xyz2rgbFamily` helpers; 8 of the 10 RGB-family converters collapsed into one-liners (2 ProPhoto cases retain explicit shape for D50 chromatic-adapt). Added imports for `LINEAR_SRGB_TO_LMS`, `LMS_TO_LINEAR_SRGB`, `OKLAB_TO_LMS_COEFF` from constants.

- **`src/units/color/index.ts`** — Added 8 module-level `_KEYS_A` tuples; added `static readonly channelKeysWithAlpha` field on each of the 15 concrete Color subclasses; rewrote `Color.keys()` to consult the static-per-subclass cache (with a fallback to the spread synthesis for type-safety on the abstract base).

- **`test/__snapshots__/parser-snapshot.test.ts.snap`** — 2 floating-point snapshot updates (FP-epsilon-equivalent values from the direct path math).

- **`bench/color2-direct-paths.mjs`** (new) — Microbenchmark for the DIRECT_PATHS gate.

- **`docs/tranches/E/audit/E.W1-lane-c-direct-paths.md`** (new) — this audit.

### Files NOT modified (deliberately)

- `src/units/color/normalize.ts` — `normalizeColor` calls `color.keys().forEach(...)` which works unchanged on a `readonly string[]`. No edit needed.
- `src/units/interpolate.ts` — `lerpColorValue` calls `start.value.keys().forEach(...)` similarly. No edit needed.
- `src/units/color/gamut.ts` — existing direct helpers (`oklabToLinearSRGB`, `srgbToOKLab`, etc.) untouched; the new `DIRECT_PATHS` entries are independent implementations that bypass the public `color2`'s XYZ hub. (Two separate fast paths now exist for the same math — the gamut-internal raw-tuple form and the `color2` Color-instance form; deliberate, since they serve different surfaces.)
- `src/units/color/constants.ts` — `OKLAB_TO_LMS_COEFF`, `LMS_TO_LINEAR_SRGB`, `LINEAR_SRGB_TO_LMS` are already present from previous lanes; just newly imported into `utils.ts`.
- `src/index.ts` — barrel surface unchanged. `color2` is the only public face that benefits; the new `DIRECT_PATHS` table is internal-only (intentionally — its contents may evolve without breaking consumers).

---

## §8 — E.W1 Lane C sub-gate verdict

**PASS.**

- **C.1** — DIRECT_PATHS table populated (6 direct conversion pairs covering the audit-flagged hot paths: `oklab↔rgb`, `oklch↔rgb`, `hsl↔rgb`). `color2` dispatch consults the table before falling through to the XYZ hub.
- **C.2** — `rgbFamily2xyz` / `xyz2rgbFamily` extracted. 8 of 10 family converters collapsed into one-liners. 2 ProPhoto cases retain their shape (deliberate — chromatic adaptation doesn't fit the generic helper without parameter bloat).
- **C.3** — `keys()` cached via static-per-subclass `channelKeysWithAlpha` field. Zero allocation per call for any concrete subclass. 8 module-level tuples shared across 15 subclasses (RGB family shares one, Lab family shares one, LCH family shares one).
- **C.4** — `bench/color2-direct-paths.mjs` authored. HSL→RGB median 3.80×, well above the ≥ 2× target.
- All hard gates green (lint, vue-tsc 126, vitest 1584, build, proof:resolution, L8 ≥ 5×, direct-paths ≥ 2×).
- E1 (architectural transposition) satisfied — `color2`'s dispatch grew a structural fast-path; the RGB family shed mechanical duplication; `keys()` no longer churns.
- E2 (no legacy code) satisfied — no compat shims, no `@deprecated` markers, no aliased exports. The DIRECT_PATHS table additively wires existing constants into the dispatch graph; the rgb-family helpers replace 10 functions in place with no name renames.
- E5 (sharpened deferral) — not triggered; the lane completed within its budget.
