/**
 * Color-space conversion dispatch — the pure conversion core.
 *
 * `color2()` is the generic any-space → any-space converter. It consults the
 * `DIRECT_PATHS` table for the hot interpolation pairs (oklab/oklch/hsl ↔ rgb)
 * via the `getDirectPath` lookup — both the table and the direct-path functions
 * live in `conversions/direct.ts`. Otherwise it routes through XYZ D65 as the
 * hub via `XYZ_FUNCTIONS`.
 *
 * Also hosts `gamutMap()` (adaptive sRGB gamut wrapper) + the
 * `getFormattedColorSpaceRange` range-formatting helper. The `DIRECT_PATHS`
 * table + `DirectPathsTable` mapped-type + `getDirectPath` lookup live in
 * `conversions/direct.ts` (G.W4).
 *
 * The hue-interpolation + color-mixing cluster (`interpolateHue`, `mixColors`,
 * `mixColorsInto`, `cssColorInterpKeyword`, `CYLINDRICAL_HUE_COMPONENT`,
 * `HueInterpolationMethod`) was extracted to its cohesion-honest home,
 * `mix.ts` — the K-DISP real decomposition (R.W1.6; inverts the historical
 * `mix.ts → dispatch.ts` back-import).
 */

import { ch, channelOf, Color, OKLCHColor, RGBColor, setChannel, XYZColor } from ".";
import type { ColorSpaceMap } from ".";
import { clamp } from "../../math";
import {
    COLOR_SPACE_RANGES,
    getColorSpaceBound,
    getColorSpaceDenormUnit,
} from "./constants";
import type { ColorSpace } from "./constants";
import { deltaEOK, DELTA_E_OK_JND, gamutMapSRGB, oklchToXYZTuple } from "./gamut";
import { hex2rgb, rgb2hex } from "./conversions/hex";
import { kelvin2xyz, xyz2kelvin } from "./conversions/kelvin";
import {
    hsl2xyz,
    hsv2xyz,
    hwb2xyz,
    xyz2hsl,
    xyz2hsv,
    xyz2hwb,
} from "./conversions/cylindrical";
import { lab2xyz, lch2xyz, xyz2lab, xyz2lch } from "./conversions/lab";
import { oklab2xyz, oklch2xyz, xyz2oklab, xyz2oklch } from "./conversions/oklab";
import {
    adobeRgb2xyz,
    displayP32xyz,
    linearSrgb2xyz,
    proPhoto2xyz,
    rec20202xyz,
    rgb2xyz,
    xyz2adobeRgb,
    xyz2displayP3,
    xyz2linearSrgb,
    xyz2proPhoto,
    xyz2rec2020,
    xyz2rgb,
    // VJ-Q2 (1.2.0) — the egress out-param family.
    xyz2adobeRgbInto,
    xyz2displayP3Into,
    xyz2linearSrgbInto,
    xyz2proPhotoInto,
    xyz2rec2020Into,
} from "./conversions/xyz-extended";
import { getDirectPath } from "./conversions/direct";
import { registerColorConverters } from "./serialize";

export { hex2rgb, rgb2hex };
export { deltaEOK, isInSRGBGamut, DELTA_E_OK_JND } from "./gamut";

// ── Color-space range formatting ──

export const getFormattedColorSpaceRange = <T extends ColorSpace>(colorSpace: T) => {
    const ranges = COLOR_SPACE_RANGES[colorSpace];

    const acc: Record<string, { min: string; max: string }> = {};

    for (const component of Object.keys(ranges)) {
        const units = getColorSpaceDenormUnit(colorSpace, component);
        const { min, max } = getColorSpaceBound(colorSpace, component, units);

        acc[component] = { min: `${min}${units}`, max: `${max}${units}` };
    }

    return acc as ColorSpaceMap<{ min: string; max: string }>[T];
};

// ── XYZ-hub dispatch table ──
// `color2()` routes every non-direct conversion through XYZ D65. `XYZ_FUNCTIONS`
// wires per-space `{ to, from }` converters keyed by `ColorSpace` (`to` lifts
// into XYZ, `from` lowers back); the typed `XyzFunctionsTable` mapped-type gives
// each slot its exact signature cast-free (mirrors `conversions/direct.ts`).

/**
 * A `{ to, from }` XYZ-hub converter pair for space `C` — `to` lifts `C` into
 * `XYZColor`, `from` lowers it back. Component type is `number` (the dispatch
 * site reads numeric channels), matching the `conversions/` signatures.
 */
type XyzFunctions<C extends ColorSpace> = {
    to: (color: ColorSpaceMap<number>[C]) => XYZColor;
    from: (color: XYZColor) => ColorSpaceMap<number>[C];
};

/** Per-`ColorSpace` `{ to, from }` pairs by conditional-type inference; the
 *  `xyz` slot resolves to identity naturally. */
type XyzFunctionsTable = {
    [K in ColorSpace]: K extends ColorSpace ? XyzFunctions<K> : never;
};

const XYZ_FUNCTIONS: XyzFunctionsTable = {
    rgb: { to: rgb2xyz, from: xyz2rgb },

    hsl: { to: hsl2xyz, from: xyz2hsl },
    hsv: { to: hsv2xyz, from: xyz2hsv },
    hwb: { to: hwb2xyz, from: xyz2hwb },

    lab: { to: lab2xyz, from: xyz2lab },
    lch: { to: lch2xyz, from: xyz2lch },

    oklab: { to: oklab2xyz, from: xyz2oklab },
    oklch: { to: oklch2xyz, from: xyz2oklch },

    kelvin: { to: kelvin2xyz, from: xyz2kelvin },

    xyz: { to: (color: XYZColor) => color, from: (color: XYZColor) => color },

    "srgb-linear": { to: linearSrgb2xyz, from: xyz2linearSrgb },
    "display-p3": { to: displayP32xyz, from: xyz2displayP3 },
    "a98-rgb": { to: adobeRgb2xyz, from: xyz2adobeRgb },
    "prophoto-rgb": { to: proPhoto2xyz, from: xyz2proPhoto },
    rec2020: { to: rec20202xyz, from: xyz2rec2020 },
};

/**
 * Typed `XYZ_FUNCTIONS` lookups (mirrors `getDirectPath`). A value-keyed read
 * collapses to the union of per-slot signatures; the lone `as` re-asserts the
 * dispatch-site signature — a documented index-narrowing, NOT a type-erasing
 * double cast. The runtime `color.colorSpace` discriminant guarantees the
 * correct subclass.
 */
const getXyzToFn = (
    from: ColorSpace,
): ((color: Color<number>) => XYZColor) | undefined =>
    XYZ_FUNCTIONS[from]?.to as ((color: Color<number>) => XYZColor) | undefined;

const getXyzFromFn = <C extends ColorSpace>(
    to: C,
): ((color: XYZColor) => ColorSpaceMap<number>[C]) | undefined =>
    XYZ_FUNCTIONS[to]?.from as
        | ((color: XYZColor) => ColorSpaceMap<number>[C])
        | undefined;

// ── VJ-Q2 (1.2.0) — the egress OUT-PARAM registry ──
// The XYZ→RGB-family `*Into` companions, keyed by egress space. `color2Into`'s
// OKLCH fast path converts DIRECTLY into the caller's `out` — vs a per-step
// wrapper `copyChannelsInto` discarded (the dominant ~28 allocs/call on the
// gamut-bisection hot path). Only wide-gamut RGB spaces have an `Into` form;
// others fall back to the wrapper (off the hot path). Byte-identical math
// (`color-into.test.ts`).
type XyzIntoFn = (xyz: XYZColor, out: Color<number>) => Color<number>;
const XYZ_FROM_INTO: Partial<Record<ColorSpace, XyzIntoFn>> = {
    "srgb-linear": xyz2linearSrgbInto as XyzIntoFn,
    "display-p3": xyz2displayP3Into as XyzIntoFn,
    "a98-rgb": xyz2adobeRgbInto as XyzIntoFn,
    "prophoto-rgb": xyz2proPhotoInto as XyzIntoFn,
    rec2020: xyz2rec2020Into as XyzIntoFn,
};

const getXyzFromIntoFn = (to: ColorSpace): XyzIntoFn | undefined =>
    XYZ_FROM_INTO[to];

// ── DIRECT_PATHS hot-path table ──
// For the highest-frequency CSS interpolation pairs (`oklab↔rgb`, `oklch↔rgb`,
// `hsl↔rgb`), `DIRECT_PATHS` + its `getDirectPath` lookup skip the XYZ hub. The
// table + `directXxx` functions live in `conversions/direct.ts`; `color2()`
// consults them via the imported `getDirectPath`.

export function color2<T, C extends ColorSpace>(color: Color<T>, to: C) {
    if (color.colorSpace === to) {
        return color;
    }

    // Hot-path shortcut: consult the DIRECT_PATHS table before falling through
    // to the XYZ-hub dispatch. For the 6 wired pairs, skips a matrix multiply
    // + one XYZColor allocation per call. Numerically equivalent to the
    // XYZ-hub path within floating-point epsilon.
    const direct = getDirectPath<C>(color.colorSpace, to);
    if (direct) {
        return direct(color as Color<number>) as ColorSpaceMap<T>[C];
    }

    // XYZ-hub fallback — both halves via the typed lookups above.
    const toXYZFn = getXyzToFn(color.colorSpace);
    if (!toXYZFn) {
        throw new Error(`Unknown source color space: "${color.colorSpace}"`);
    }
    const xyz = toXYZFn(color as Color<number>) as XYZColor<T>;

    const fromXYZFn = getXyzFromFn<C>(to);
    if (!fromXYZFn) {
        throw new Error(`Unknown target color space: "${to}"`);
    }
    return fromXYZFn(xyz as XYZColor) as ColorSpaceMap<T>[C];
}

/** Copy every channel of `src` (including alpha) into `out` and return `out`. */
function copyChannelsInto<T>(src: Color<T>, out: Color<T>): Color<T> {
    const keys = src.channels;
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i]!;
        setChannel(out, k, ch(channelOf(src, k)));
    }
    out.alpha = src.alpha;
    return out;
}

// Module-scoped XYZ-hub scratch for the `color2Into` OKLCH fast path. The
// bisection probe is always OKLCH, so its hub coordinates are written here in
// place (zero alloc) rather than allocating an OKLABColor + an XYZColor per
// step. Re-entrancy-safe by the same single-threaded argument the conversion
// scratch buffers rely on — fully written before each egress read. Lazily
// constructed so it never trips the bundle's class-initialization ordering.
let _color2IntoXyzScratch: XYZColor | undefined;
const _color2IntoXyzTuple: [number, number, number] = [0, 0, 0];

/**
 * Out-param variant of {@link color2} (VJ-P1 zero-alloc, mirroring
 * `matrix.ts` `transformMat3Into`): converts `src` into color space `to` and
 * writes the resulting channels into the caller-owned `out` Color, returning
 * `out`. The headline win is the gamut-bisection egress (`gamutMapToRgbSpace`):
 * the 24-step loop reuses ONE egress scratch + this hub scratch, so the per-step
 * intermediate `OKLABColor`/`XYZColor` boxing that the wrapper-allocating
 * `color2` churns is eliminated.
 *
 * `out` MUST be a caller-owned scratch in the **target** space (its `channels`
 * are what receive the egress) and MUST NOT alias `src` — the OKLCH fast path
 * reads `src`'s channels into the hub scratch before any `out` write, but a
 * source-aliased `out` would corrupt a same-space copy. The single-threaded
 * re-entrancy argument documented on `color2`/`gamutMapToRgbSpace` applies.
 *
 * Behaviour matches `color2` bit-for-bit (the OKLCH leg replays the wrapper
 * path's `scale` round-trip — see `gamut.ts oklchToXYZTuple`).
 */
export function color2Into<T, C extends ColorSpace>(
    src: Color<T>,
    to: C,
    out: ColorSpaceMap<T>[C],
): ColorSpaceMap<T>[C] {
    // Same space — a channel copy (no conversion, no allocation).
    if (src.colorSpace === to) {
        return copyChannelsInto(src, out as Color<T>) as ColorSpaceMap<T>[C];
    }

    // Mirror `color2`'s dispatch ORDER so the result is bit-identical to it. The
    // 6 DIRECT_PATHS pairs (oklab/oklch/hsl ↔ rgb) take a different — but equally
    // valid — arithmetic route than the XYZ hub, so they must be honoured here
    // too; routing them through the hub would diverge in the last FP digits. The
    // gamut-bisection egress is always a WIDE-gamut RGB space (display-p3, …),
    // which has NO direct path, so the OKLCH zero-alloc fast path below is what
    // the per-frame hot path actually rides.
    const direct = getDirectPath<C>(src.colorSpace, to);
    if (direct) {
        const converted = direct(src as Color<number>) as unknown as Color<T>;
        return copyChannelsInto(converted, out as Color<T>) as ColorSpaceMap<T>[C];
    }

    // OKLCH source fast path (the gamut-bisection probe) — only reached for the
    // non-direct (wide-gamut) egress targets. Route the OKLCH→XYZ hub leg through
    // the in-place tuple + a scratch XYZColor (no per-step OKLABColor/XYZColor
    // alloc), then egress XYZ→target and copy into `out`. The egress wrapper is
    // the sole residual alloc; the dominant per-step boxing is gone.
    if (src.colorSpace === "oklch") {
        const oklch = src as Color<number>;
        const xyz = (_color2IntoXyzScratch ??= new XYZColor(0, 0, 0, 1));
        oklchToXYZTuple(
            oklch.l as number,
            oklch.c as number,
            oklch.h as number,
            _color2IntoXyzTuple,
        );
        xyz.x = ch(_color2IntoXyzTuple[0]);
        xyz.y = ch(_color2IntoXyzTuple[1]);
        xyz.z = ch(_color2IntoXyzTuple[2]);
        xyz.alpha = src.alpha as number;

        // VJ-Q2 (1.2.0): the wide-gamut egress converts DIRECTLY into `out` via
        // the `*Into` companion (no per-step wrapper alloc). For the rare
        // egress targets without an `Into` form, fall back to the wrapper +
        // `copyChannelsInto` (off the gamut hot path).
        const fromXYZIntoFn = getXyzFromIntoFn(to);
        if (fromXYZIntoFn) {
            fromXYZIntoFn(xyz, out as unknown as Color<number>);
            return out;
        }
        const fromXYZFn = getXyzFromFn<C>(to);
        if (!fromXYZFn) {
            throw new Error(`Unknown target color space: "${to}"`);
        }
        const egress = fromXYZFn(xyz) as unknown as Color<T>;
        return copyChannelsInto(egress, out as Color<T>) as ColorSpaceMap<T>[C];
    }

    // General fallback — delegate to `color2`'s XYZ-hub (correct for every pair)
    // and copy its result into `out`. Off the gamut hot path.
    const converted = color2(src, to) as unknown as Color<T>;
    return copyChannelsInto(converted, out as Color<T>) as ColorSpaceMap<T>[C];
}

const GAMUT_EPSILON = 1e-6;

/**
 * The RGB-family egress spaces whose gamut is the unit `[0,1]³` box in their own
 * coordinates. `gamutMap(color, targetSpace)` maps to the *target* space's gamut
 * — a `display-p3` animation stays in P3, sRGB-clipped only on an sRGB egress
 * (N.W7.A B4). The analytical Ottosson path (`gamutMapSRGB`) is sRGB-fit, so a
 * non-sRGB egress uses the numeric OKLCh-chroma reduction below.
 */
const RGB_GAMUT_SPACES: ReadonlySet<ColorSpace> = new Set<ColorSpace>([
    "rgb",
    "srgb-linear",
    "display-p3",
    "a98-rgb",
    "prophoto-rgb",
    "rec2020",
]);

/** Are this space's (already-converted) `r,g,b` channels within `[0,1]³`±eps? */
const rgbInGamut = (r: number, g: number, b: number, eps: number): boolean =>
    r >= -eps && r <= 1 + eps &&
    g >= -eps && g <= 1 + eps &&
    b >= -eps && b <= 1 + eps;

// Numeric egress gamut-map for the wide-gamut RGB spaces (B4). The analytical
// Ottosson map is sRGB-specific (its polynomial coefficients are sRGB-fit), so a
// `display-p3`/`rec2020`/… egress reduces chroma in OKLCh toward the egress
// boundary — the CSS Color 4 §13.2 reference strategy: hold L + H, binary-search
// the largest in-gamut chroma, then clamp the residual. Hue is preserved exactly.
const CHROMA_SEARCH_STEPS = 24; // 2^-24 ≈ 6e-8 chroma resolution — sub-JND.

// Module-scoped scratch OKLCHColor reused across every bisection step (O.W3
// zero-alloc). The per-step `new OKLCHColor(L, c, H, alpha)` allocation is the
// dominant GC pressure on the wide-gamut rAF egress path — one reused object
// replaces 24+ per call. Re-entrancy-safe: `gamutMapToRgbSpace` is single-pass,
// never re-enters itself, and the scratch is fully written (L,c,h,alpha) before
// each `color2()` read — the same single-threaded argument the conversion-layer
// scratch buffers rely on. Lazily constructed on first call (not at module load)
// so it never trips the bundle's class-initialization ordering.
let _scratchProbe: OKLCHColor | undefined;

// VJ-Q2 (1.2.0) S2 — a per-egress-space scratch color, reused across calls so the
// SEED egress conversion (`color2Into(probe, target, …)`) allocates ZERO wrappers
// (the prior `color2(probe, target)` seed allocated one egress wrapper + its XYZ/
// OKLab hub intermediates per call). Single-pass safe: `gamutMapToRgbSpace` never
// re-enters itself and the scratch is fully overwritten before each read.
const _egressScratch: Partial<Record<ColorSpace, Color<number>>> = {};

function gamutMapToRgbSpace<C extends Color>(color: C, target: ColorSpace): C {
    const probe = (_scratchProbe ??= new OKLCHColor(0, 0, 0, 1));
    // OKLCh working copy (normalized: L,c,h ∈ [0,1]). Reducing `c` desaturates.
    const oklch = color2(color, "oklch");
    const L = oklch.l as number;
    const H = oklch.h as number;
    const cHigh = oklch.c as number;
    const alpha = color.alpha as number;

    // Hoist the invariant probe scalars out of the loop body; only `c` varies
    // per step. The scratch OKLCHColor is mutated in place (no per-step alloc).
    // The per-step conversion now routes through `color2Into` (VJ-P1): it reuses
    // a single egress scratch + an OKLCH→XYZ hub scratch, so neither the egress
    // wrapper nor the OKLABColor/XYZColor hub intermediates are re-allocated per
    // step — the deferred O.W5 alloc tail is closed.
    probe.l = ch(L);
    probe.h = ch(H);
    probe.alpha = alpha;

    // Seed a single egress scratch in the target space from the first probe
    // conversion; every subsequent step reuses it via `color2Into` — the
    // VJ-P1 zero-alloc cure. `color2Into`'s OKLCH fast path routes the OKLCH→XYZ
    // hub leg through its own in-place tuple + scratch XYZColor, so the per-step
    // intermediate OKLABColor + XYZColor boxing (2 allocs/step) is eliminated;
    // the egress wrapper is reused across all 24 steps (1 alloc total, not 24).
    probe.c = ch((0 + cHigh) / 2);
    // Seed the per-space egress scratch ONCE (lazily); subsequent calls reuse it
    // via `color2Into` — no per-call seed wrapper alloc (VJ-Q2 S2). The first
    // seed for a never-seen target space pays one `color2` wrapper; every call
    // thereafter is zero-alloc on the seed.
    // `target` is a runtime `ColorSpace` (not a literal), so the egress scratch
    // is typed at the `Color<number>` width; the per-call `color2Into` writes
    // into it in-place (the concrete RGB-family subclass is fixed by `target`).
    let egress = _egressScratch[target] as Color<number> | undefined;
    if (egress === undefined) {
        egress = color2(probe, target) as Color<number>;
        _egressScratch[target] = egress;
    } else {
        color2Into(probe, target, egress as ColorSpaceMap<number>[ColorSpace]);
    }

    // Binary-search the largest chroma that stays inside the egress gamut.
    let lo = 0;
    let hi = cHigh;
    for (let i = 0; i < CHROMA_SEARCH_STEPS; i++) {
        const mid = (lo + hi) / 2;
        probe.c = ch(mid);
        const rgb = color2Into(
            probe,
            target,
            egress as ColorSpaceMap<number>[ColorSpace],
        ) as Color<number>;
        if (rgbInGamut(rgb.r as number, rgb.g as number, rgb.b as number, GAMUT_EPSILON)) {
            lo = mid;
        } else {
            hi = mid;
        }
    }

    // Emit at the in-gamut chroma, clamping residual FP overshoot to the box.
    probe.c = ch(lo);
    const rgb = color2Into(
        probe,
        target,
        egress as ColorSpaceMap<number>[ColorSpace],
    ) as Color<number>;
    const clamped = new (rgb.constructor as new (...a: number[]) => Color)(
        clamp(rgb.r as number, 0, 1),
        clamp(rgb.g as number, 0, 1),
        clamp(rgb.b as number, 0, 1),
        alpha,
    );
    return color2(clamped, color.colorSpace) as C;
}

/**
 * Gamut-map a color into the `targetSpace`'s gamut (default sRGB).
 *
 * The default (`targetSpace="rgb"`) is the historical sRGB behavior — the
 * zero-iteration Ottosson analytical map. A wide-gamut egress (`display-p3`,
 * `rec2020`, `a98-rgb`, `prophoto-rgb`, `srgb-linear`) maps to *that* space's
 * gamut instead, so a P3-only color stays saturated in P3 and is only
 * sRGB-clipped on an sRGB egress (N.W7.A B4). An in-target-gamut color is
 * identical under either mapping — the common path is unchanged.
 */
export function gamutMap<C extends Color>(
    color: C,
    targetSpace: ColorSpace = "rgb",
): C {
    const target: ColorSpace = RGB_GAMUT_SPACES.has(targetSpace)
        ? targetSpace
        : "rgb";

    const egress = color2(color, target);

    // Replace NaN ("none" keyword per CSS Color 4) with 0 for gamut purposes
    const r = Number.isNaN(egress.r as number) ? 0 : (egress.r as number);
    const g = Number.isNaN(egress.g as number) ? 0 : (egress.g as number);
    const b = Number.isNaN(egress.b as number) ? 0 : (egress.b as number);

    // Strictly in gamut — pass through
    if (r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1) {
        return color;
    }

    // Within epsilon of gamut — just clamp (avoids the OKLab round-trip for
    // tiny FP errors). Clamp in the egress coordinates, then convert back.
    if (rgbInGamut(r, g, b, GAMUT_EPSILON)) {
        const EgressClass = egress.constructor as new (...a: number[]) => Color;
        const clamped = new EgressClass(
            clamp(r, 0, 1), clamp(g, 0, 1), clamp(b, 0, 1), color.alpha as number,
        );
        return color2(clamped, color.colorSpace) as C;
    }

    // sRGB egress — the analytical Ottosson map (zero-iteration).
    if (target === "rgb") {
        const [sR, sG, sB] = gamutMapSRGB(r, g, b);
        const mappedRGB = new RGBColor(sR, sG, sB, color.alpha);
        return color2(mappedRGB, color.colorSpace) as C;
    }

    // Wide-gamut egress — the numeric OKLCh-chroma reduction toward the egress
    // boundary. Before the (24-step) bisection, a JND early-exit (CSS Color 4
    // §13.2 local-MINDE break): if the color is only slightly out-of-gamut, the
    // box-clamped version is perceptually identical (ΔE_OK < JND ≈ 0.02 — below
    // the human discrimination threshold), so the full chroma reduction would
    // converge to a result indistinguishable from the clamp. Clamp directly and
    // skip the bisection — eliminating ~100 Color allocs on the FP-overshoot case
    // typical of wide-gamut color arithmetic.
    const EgressClass = egress.constructor as new (...a: number[]) => Color;
    const clamped = new EgressClass(
        clamp(r, 0, 1), clamp(g, 0, 1), clamp(b, 0, 1), color.alpha as number,
    );
    const srcOKLab = color2(color, "oklab");
    const clampedOKLab = color2(clamped, "oklab");
    if (
        deltaEOK(
            srcOKLab.l as number, srcOKLab.a as number, srcOKLab.b as number,
            clampedOKLab.l as number, clampedOKLab.a as number, clampedOKLab.b as number,
        ) < DELTA_E_OK_JND
    ) {
        return color2(clamped, color.colorSpace) as C;
    }

    return gamutMapToRgbSpace(color, target);
}

// S.W1 W1-8 — wire the apply-path serializer's late-bound space converters.
// `serialize.ts` stays a LEAF (no static `./dispatch` import) so `base.ts` can
// import it without re-forming the dispatch → spaces eval cycle that TDZs the
// subclass `extends Color`; the registration closes the loop at dispatch's own
// module eval — long before any runtime `toAnimationString(_, outputSpace)`.
registerColorConverters(
    color2 as (color: Color<unknown>, to: ColorSpace) => Color<number>,
    gamutMap as (color: Color<unknown>, to: ColorSpace) => Color<number>,
);
