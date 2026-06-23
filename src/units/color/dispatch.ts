/**
 * Color-space conversion dispatch + interpolation primitives.
 *
 * `color2()` is the generic any-space → any-space converter. It consults the
 * `DIRECT_PATHS` table for the hot interpolation pairs (oklab/oklch/hsl ↔ rgb)
 * via the `getDirectPath` lookup — both the table and the direct-path functions
 * live in `conversions/direct.ts`. Otherwise it routes through XYZ D65 as the
 * hub via `XYZ_FUNCTIONS`.
 *
 * Also hosts `gamutMap()` (adaptive sRGB gamut wrapper), `interpolateHue()`,
 * `mixColors()` (CSS `color-mix()`), and the `getFormattedColorSpaceRange`
 * range-formatting helper. The `DIRECT_PATHS` table + `DirectPathsTable`
 * mapped-type + `getDirectPath` lookup live in `conversions/direct.ts` (G.W4).
 */

import { ch, channelOf, Color, OKLCHColor, RGBColor, setChannel, XYZColor } from ".";
import type { ColorSpaceMap } from ".";
import { clamp, lerp } from "../../math";
import {
    COLOR_SPACE_RANGES,
    COLOR_SYNTAX_FAMILY,
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
} from "./conversions/xyz-extended";
import { getDirectPath } from "./conversions/direct";

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

// ──────────────────────────────────────────────────────────────────────────────
// XYZ-hub dispatch table.
//
// `color2()` routes every non-direct conversion through XYZ D65 as a hub. The
// `XYZ_FUNCTIONS` table wires per-space `{ to, from }` converters keyed by
// `ColorSpace` — `to` lifts the source space into XYZ; `from` lowers XYZ into
// the target space. The typed `XyzFunctionsTable` mapped-type derives the exact
// per-slot signature so each converter type-checks at its slot cast-free
// (mirrors the `DirectPathsTable` precedent in `conversions/direct.ts`).
// ──────────────────────────────────────────────────────────────────────────────

/**
 * A pair of `{ to, from }` XYZ-hub converters for color space `C`. `to` lifts a
 * `C`-typed color into `XYZColor`; `from` lowers `XYZColor` into a `C`-typed
 * color. Component type is concrete `number` — the dispatch site reads numeric
 * channels and produces `number`-component colors (matches the per-space
 * `{from}2xyz` / `xyz2{to}` signatures in `conversions/`).
 */
type XyzFunctions<C extends ColorSpace> = {
    to: (color: ColorSpaceMap<number>[C]) => XYZColor;
    from: (color: XYZColor) => ColorSpaceMap<number>[C];
};

/**
 * Distributes over every `ColorSpace` key; each entry is the exact
 * `{ to, from }` signature pair for that space, derived by conditional-type
 * inference. The `xyz` slot resolves to identity `(XYZColor) => XYZColor`
 * naturally — no special-case needed.
 */
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
 * Typed `XYZ_FUNCTIONS` lookup pair (mirrors the `getDirectPath` precedent). A
 * value-keyed read collapses to the *union* of all per-slot signatures; the lone
 * `as` in each helper re-asserts the entry as the dispatch-site signature — a
 * documented index-narrowing, not a type-erasing double cast. `getXyzToFn`
 * widens its fn input to `Color<number>` (shared `[key: string]: any` index
 * signature), and the runtime `color.colorSpace` discriminant guarantees the
 * correct subclass is in hand.
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

// ──────────────────────────────────────────────────────────────────────────────
// DIRECT_PATHS hot-path table.
//
// `color2()` routes EVERY conversion through XYZ as a hub by default. For the
// highest-frequency CSS interpolation pairs (`oklab↔rgb`, `oklch↔rgb`,
// `hsl↔rgb`), the `DIRECT_PATHS` table — and its `getDirectPath` lookup — skip
// the XYZ intermediate. Both the table and the `directXxx` functions it wires
// live in `conversions/direct.ts` (their cohesion-honest home); `color2()`
// consults them via the imported `getDirectPath`.
// ──────────────────────────────────────────────────────────────────────────────

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
    const egress = color2(probe, target) as ColorSpaceMap<number>[ColorSpace];

    // Binary-search the largest chroma that stays inside the egress gamut.
    let lo = 0;
    let hi = cHigh;
    for (let i = 0; i < CHROMA_SEARCH_STEPS; i++) {
        const mid = (lo + hi) / 2;
        probe.c = ch(mid);
        const rgb = color2Into(probe, target, egress);
        if (rgbInGamut(rgb.r as number, rgb.g as number, rgb.b as number, GAMUT_EPSILON)) {
            lo = mid;
        } else {
            hi = mid;
        }
    }

    // Emit at the in-gamut chroma, clamping residual FP overshoot to the box.
    probe.c = ch(lo);
    const rgb = color2Into(probe, target, egress);
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

// --- Phase 2: Hue interpolation ---

export type HueInterpolationMethod = "shorter" | "longer" | "increasing" | "decreasing";

export const CYLINDRICAL_HUE_COMPONENT: Partial<Record<ColorSpace, string>> = {
    hsl: "h",
    hsv: "h",
    hwb: "h",
    lch: "h",
    oklch: "h",
};

/**
 * The WAAPI `<color-interpolation-method>` keyword for a target interp space
 * (N.W7.A B2 — the value.js half of the WAAPI color lift). Pairs with
 * `Color.toAnimationString(digits, outputSpace)`: the serializer emits a color
 * in the space's syntax family, and this produces the matching interp-method
 * keyword string a consumer (keyframes.js) hands to `KeyframeEffect` /
 * `easing`-adjacent APIs.
 *
 * For a polar space the hue-interpolation method is appended
 * (`oklch shorter hue`); legacy families have no interp keyword (sRGB is the
 * implicit default for `rgb()`/`hsl()`), so this returns `undefined` for them —
 * the legacy syntax family already pins sRGB interp without an explicit keyword.
 */
export function cssColorInterpKeyword(
    space: ColorSpace,
    hueMethod: HueInterpolationMethod = "shorter",
): string | undefined {
    if (COLOR_SYNTAX_FAMILY[space] === "legacy") return undefined;
    const hueComponent = CYLINDRICAL_HUE_COMPONENT[space];
    return hueComponent != null ? `${space} ${hueMethod} hue` : space;
}

/**
 * Interpolate between two hue values using the given method.
 * Hues are in [0, 1] (normalized). Returns an interpolated hue in [0, 1].
 * Handles NaN (CSS `none`): if one hue is NaN, the other's value is used.
 */
export function interpolateHue(
    h1: number,
    h2: number,
    t: number,
    method: HueInterpolationMethod = "shorter",
): number {
    // NaN handling: missing hue adopts other color's value
    if (Number.isNaN(h1) && Number.isNaN(h2)) return 0;
    if (Number.isNaN(h1)) return h2;
    if (Number.isNaN(h2)) return h1;

    let diff = h2 - h1;

    switch (method) {
        case "shorter":
            if (diff > 0.5) h1 += 1;
            else if (diff < -0.5) h2 += 1;
            break;
        case "longer":
            if (diff > 0 && diff < 0.5) h1 += 1;
            else if (diff > -0.5 && diff <= 0) h2 += 1;
            break;
        case "increasing":
            if (diff < 0) h2 += 1;
            break;
        case "decreasing":
            if (diff > 0) h1 += 1;
            break;
    }

    let result = h1 + t * (h2 - h1);
    // Normalize to [0, 1)
    result = ((result % 1) + 1) % 1;
    return result;
}

// --- Phase 3: Color mixing ---

/**
 * Mix two colors per CSS color-mix() specification.
 * Both colors should be normalized (components in [0, 1]).
 * Percentages p1, p2 are in [0, 1] (e.g. 0.5 = 50%).
 */
export function mixColors(
    col1: Color,
    col2: Color,
    p1: number,
    p2: number,
    space: ColorSpace = "oklab",
    hueMethod: HueInterpolationMethod = "shorter",
): Color {
    // Convert both to interpolation space
    const c1 = color2(col1, space);
    const c2 = color2(col2, space);

    // Percentage normalization per CSS spec
    if (p1 < 0) p1 = 0;
    if (p2 < 0) p2 = 0;

    const sum = p1 + p2;
    if (sum === 0) {
        // Both zero — treat as equal
        p1 = 0.5;
        p2 = 0.5;
    } else if (sum !== 1) {
        // Normalize so they sum to 1
        p1 = p1 / sum;
        p2 = p2 / sum;
    }

    // Alpha multiplier when sum < 1 (original, un-normalized)
    const alphaMultiplier = Math.min(sum, 1);

    const hueComponent = CYLINDRICAL_HUE_COMPONENT[space];

    // Get component keys (excluding alpha)
    const keys = c1.keys().filter((k) => k !== "alpha");

    // Handle alpha
    const a1 = Number.isNaN(c1.alpha as number) ? (c2.alpha as number) : (c1.alpha as number);
    const a2 = Number.isNaN(c2.alpha as number) ? (c1.alpha as number) : (c2.alpha as number);
    const resultAlpha = (lerp(a1, a2, p2)) * alphaMultiplier;

    // Premultiplied alpha interpolation for non-hue components
    const resultComponents: number[] = [];

    for (const key of keys) {
        let v1 = c1[key] as number;
        let v2 = c2[key] as number;

        // NaN handling: missing component adopts other color's value
        if (Number.isNaN(v1) && Number.isNaN(v2)) {
            resultComponents.push(0);
            continue;
        }
        if (Number.isNaN(v1)) v1 = v2;
        if (Number.isNaN(v2)) v2 = v1;

        if (key === hueComponent) {
            // Hue: use hue interpolation method (not premultiplied)
            resultComponents.push(interpolateHue(v1, v2, p2, hueMethod));
        } else {
            // Premultiplied alpha interpolation
            const premul1 = v1 * a1;
            const premul2 = v2 * a2;
            const mixed = lerp(premul1, premul2, p2);
            resultComponents.push(resultAlpha > 0 ? mixed / resultAlpha : 0);
        }
    }

    // Create result color in the interpolation space
    const ResultClass = c1.constructor as new (...args: any[]) => Color;
    const result = new ResultClass(...resultComponents, resultAlpha);

    return result;
}
