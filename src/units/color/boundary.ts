/**
 * `sampleGamutBoundary` — the sRGB-excess contour of a wide-RGB HSV plate
 * (R.W1.5; `boundary-api.md`, verbatim).
 *
 * For a fixed hue and a wide-gamut RGB target (display-p3 / a98-rgb /
 * prophoto-rgb / rec2020), the picker's HSV square is a bijection of the
 * TARGET's own gamut. This module samples the polyline separating the region
 * sRGB can represent from the region it cannot: for each column of saturation
 * `s ∈ [0,1]` it finds the value `v ∈ [0,1]` (upward from black) at which the
 * color first leaves sRGB — perceptually (`jnd`: ΔE-OK to its gamut-mapped form
 * exceeds the JND) or exactly (`raw`: cube-membership excess > 1e-6). value.js
 * alone computes this contour cheaply; the demo (R.W3) owns paint, never math.
 *
 * The field is opaque geometry in the unit square: `points = [s0,v0, s1,v1, …]`.
 * `sampleGamutBoundaryInto` is the 0-allocation rAF twin (the `color2Into`
 * idiom); `sampleGamutBoundary` is a 2-allocation veneer over it.
 *
 * Imports only from `units/color/*` — the `./color` subpath's parse-that-ZERO
 * invariant holds by construction. The per-space RGB↔XYZ matrices are consumed
 * as package-internal exports of `conversions/xyz-extended.ts` (in no barrel).
 */

import type { Mat3, Vec3 } from "./matrix";
import { multiplyMat3, transformMat3Into } from "./matrix";
import { WHITE_POINT_D50_D65 } from "./constants";
import {
    ADOBE_RGB_XYZ_MATRIX,
    DISPLAY_P3_XYZ_MATRIX,
    PROPHOTO_XYZ_D50_MATRIX,
    REC2020_XYZ_MATRIX,
    XYZ_RGB_MATRIX,
} from "./conversions/xyz-extended";
import {
    adobeRgbToLinear,
    linearToSrgb,
    proPhotoToLinear,
    rec2020ToLinear,
    srgbToLinear,
} from "./conversions/transfer";
import {
    DELTA_E_OK_JND,
    deltaEOK,
    gamutMapOKLabInto,
    srgbToOKLabInto,
} from "./gamut";

// ── Public types (boundary-api §2) ──────────────────────────────────────────

/** The wide RGB-family spaces whose sRGB excess the sampler measures. */
export type GamutBoundaryTarget =
    | "display-p3"
    | "a98-rgb"
    | "prophoto-rgb"
    | "rec2020";

/**
 * `"jnd"` (default) — the perceptual locus: `ΔE_OK(wide, gamutMapOKLab(wide)) >
 * DELTA_E_OK_JND` ("sRGB clipping of this coordinate is VISIBLE" — the drawn
 * instrument line). `"raw"` — exact cube-membership excess > 1e-6 (the
 * mathematically-true locus; for captions/diagnostics — it hugs the top edge
 * for any strictly-wider target).
 */
export type GamutBoundaryMode = "jnd" | "raw";

export interface SampleGamutBoundaryOptions {
    /** s-axis intervals across the square (samples = columns+1). Integer ≥ 2; default 96. */
    columns?: number;
    /** default `"jnd"`. */
    mode?: GamutBoundaryMode;
}

export interface GamutBoundary {
    /**
     * Interleaved `[s0,v0, s1,v1, …]` polyline in UNIT-SQUARE coordinates: `s ∈
     * [0,1]` rightward (HSV saturation), `v ∈ [0,1]` UPWARD from black (HSV
     * value — v=1 is the top edge; canvas y = (1−v)·height is the consumer's
     * affair). Point 0 is the tip on the top edge; subsequent points are
     * per-column roots, s strictly increasing, ending at s=1. Capacity is
     * `2·(columns+2)`; only the first `2·count` entries are valid.
     */
    points: Float64Array;
    /** valid point count. `0` ⇔ the whole square renders inside sRGB (absence is content). */
    count: number;
    /** fraction of the top edge outside the locus (`1 − tipS`); `0` when count === 0. */
    oogTopFrac: number;
}

// ── Target descriptors — combined wide-linear → linear-sRGB matrix + decode ──
//
// `M = XYZ_RGB · TARGET_XYZ` maps the target's linear-light channels straight
// into linear sRGB (ProPhoto folds its D50→D65 Bradford adaptation into the same
// product). Computed once at module load — the prototype's `TARGETS` table.

interface TargetDescriptor {
    M: Mat3;
    decode: (c: number) => number;
}

const TARGETS: Record<GamutBoundaryTarget, TargetDescriptor> = {
    "display-p3": {
        M: multiplyMat3(XYZ_RGB_MATRIX, DISPLAY_P3_XYZ_MATRIX),
        decode: srgbToLinear,
    },
    "a98-rgb": {
        M: multiplyMat3(XYZ_RGB_MATRIX, ADOBE_RGB_XYZ_MATRIX),
        decode: adobeRgbToLinear,
    },
    "prophoto-rgb": {
        M: multiplyMat3(
            multiplyMat3(XYZ_RGB_MATRIX, WHITE_POINT_D50_D65),
            PROPHOTO_XYZ_D50_MATRIX,
        ),
        decode: proPhotoToLinear,
    },
    rec2020: {
        M: multiplyMat3(XYZ_RGB_MATRIX, REC2020_XYZ_MATRIX),
        decode: rec2020ToLinear,
    },
};

// ── The field — module-private scalar pipeline (zero-alloc) ──────────────────

const RAW_EPS = 1e-6;
const BISECT_ITERS = 14; // ≈ 2⁻¹⁴ resolution in the unit square — sub-pixel.

// Single-threaded scratches (the sampler never re-enters itself; each is fully
// written before read within one field eval).
const _hsv: Vec3 = [0, 0, 0];
const _lin: Vec3 = [0, 0, 0];
const _ok1: [number, number, number] = [0, 0, 0];
const _ok2: [number, number, number] = [0, 0, 0];

/** Closed-form HSV → RGB (target coordinates); `hueDeg` already wrapped to [0,360). */
function hsvToRgbInto(hueDeg: number, s: number, v: number, out: Vec3): Vec3 {
    const hp = hueDeg / 60; // sextant coordinate [0,6)
    const c = v * s;
    const x = c * (1 - Math.abs((hp % 2) - 1));
    const m = v - c;

    let r: number;
    let g: number;
    let b: number;
    if (hp < 1) { r = c; g = x; b = 0; }
    else if (hp < 2) { r = x; g = c; b = 0; }
    else if (hp < 3) { r = 0; g = c; b = x; }
    else if (hp < 4) { r = 0; g = x; b = c; }
    else if (hp < 5) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    out[0] = r + m;
    out[1] = g + m;
    out[2] = b + m;
    return out;
}

/**
 * The signed boundary field at `(s, v)` for `hueDeg` / `target` / `mode`:
 * negative inside sRGB, positive outside, zero on the locus. `jnd` returns
 * `ΔE_OK − JND`; `raw` returns the cube-membership excess `− 1e-6`.
 */
function fieldAt(
    hueDeg: number, s: number, v: number,
    target: TargetDescriptor, mode: GamutBoundaryMode,
): number {
    hsvToRgbInto(hueDeg, s, v, _hsv);
    _lin[0] = target.decode(_hsv[0]);
    _lin[1] = target.decode(_hsv[1]);
    _lin[2] = target.decode(_hsv[2]);
    transformMat3Into(_lin, target.M, _lin); // → linear sRGB (possibly OOG)

    const r = _lin[0];
    const g = _lin[1];
    const b = _lin[2];

    if (mode === "raw") {
        // How far the worst channel sits outside the [0,1] cube (negative inside).
        return Math.max(-r, r - 1, -g, g - 1, -b, b - 1) - RAW_EPS;
    }

    // jnd: encode to sRGB (sign-aware transfer handles OOG channels), then the
    // OKLab ΔE to the analytically gamut-mapped form.
    srgbToOKLabInto(linearToSrgb(r), linearToSrgb(g), linearToSrgb(b), _ok1);
    gamutMapOKLabInto(_ok1[0], _ok1[1], _ok1[2], _ok2);
    return (
        deltaEOK(_ok1[0], _ok1[1], _ok1[2], _ok2[0], _ok2[1], _ok2[2]) -
        DELTA_E_OK_JND
    );
}

/** Bisect the top edge (v=1) between an in-gamut `sLo` and an OOG `sHi`. */
function bisectTopS(
    hueDeg: number, sLo: number, sHi: number,
    target: TargetDescriptor, mode: GamutBoundaryMode,
): number {
    for (let i = 0; i < BISECT_ITERS; i++) {
        const mid = (sLo + sHi) / 2;
        if (fieldAt(hueDeg, mid, 1, target, mode) > 0) sHi = mid;
        else sLo = mid;
    }
    return (sLo + sHi) / 2;
}

/** Bisect a column at saturation `s` for the v where the field crosses zero. */
function bisectColumnV(
    hueDeg: number, s: number,
    target: TargetDescriptor, mode: GamutBoundaryMode,
): number {
    let lo = 0; // black — always in sRGB
    let hi = 1; // top edge — OOG (caller guarantees)
    for (let i = 0; i < BISECT_ITERS; i++) {
        const mid = (lo + hi) / 2;
        if (fieldAt(hueDeg, s, mid, target, mode) > 0) hi = mid;
        else lo = mid;
    }
    return (lo + hi) / 2;
}

function validateColumns(columns: number): void {
    if (!Number.isInteger(columns) || columns < 2) {
        throw new RangeError(
            `sampleGamutBoundary: columns must be an integer ≥ 2, got ${columns}`,
        );
    }
}

/**
 * Zero-alloc out-param form (the `color2Into` / `mixColorsInto` idiom). Writes
 * into the caller-owned `out` (typically the object a prior
 * {@link sampleGamutBoundary} returned), sets `out.count` / `out.oogTopFrac`,
 * returns `out`. Requires `out.points.length ≥ 2·(columns+2)` — RangeError
 * otherwise. `out` MUST be caller-owned; single-threaded re-entrancy.
 */
export function sampleGamutBoundaryInto(
    hueDeg: number,
    target: GamutBoundaryTarget,
    out: GamutBoundary,
    options?: SampleGamutBoundaryOptions,
): GamutBoundary {
    const columns = options?.columns ?? 96;
    const mode: GamutBoundaryMode = options?.mode ?? "jnd";
    validateColumns(columns);

    if (out.points.length < 2 * (columns + 2)) {
        throw new RangeError(
            `sampleGamutBoundary: out.points capacity ${out.points.length} < required ${2 * (columns + 2)}`,
        );
    }

    // Non-finite hue (CSS `none`) is achromatic — greys never leave sRGB.
    if (!Number.isFinite(hueDeg)) {
        out.count = 0;
        out.oogTopFrac = 0;
        return out;
    }

    const hue = ((hueDeg % 360) + 360) % 360;
    const t = TARGETS[target];
    const n = columns;

    // Scan the top edge (v=1) for the first out-of-gamut column.
    let firstOOG = -1;
    for (let j = 0; j <= n; j++) {
        if (fieldAt(hue, j / n, 1, t, mode) > 0) {
            firstOOG = j;
            break;
        }
    }

    // The whole square renders inside sRGB — an empty (plate-clear) boundary.
    if (firstOOG < 0) {
        out.count = 0;
        out.oogTopFrac = 0;
        return out;
    }

    // Tip: the top-edge crossing. For any wide target, s=0 (achromatic) is in
    // sRGB, so firstOOG ≥ 1 and the tip bisects between the two neighbours; the
    // firstOOG===0 guard is defensive (degenerate; then the tip is the corner).
    const tipS =
        firstOOG === 0
            ? 0
            : bisectTopS(hue, (firstOOG - 1) / n, firstOOG / n, t, mode);

    const points = out.points;
    points[0] = tipS;
    points[1] = 1;
    let count = 1;

    // Per-column roots from the first OOG grid column to s=1.
    for (let j = firstOOG; j <= n; j++) {
        const s = j / n;
        // A column whose top re-enters gamut (non-monotone top-edge noise) has
        // no crossing; its root is the inert top-edge point v=1.
        const v = fieldAt(hue, s, 1, t, mode) > 0
            ? bisectColumnV(hue, s, t, mode)
            : 1;
        points[2 * count] = s;
        points[2 * count + 1] = v;
        count++;
    }

    out.count = count;
    out.oogTopFrac = 1 - tipS;
    return out;
}

/**
 * Allocating form — constructs a {@link GamutBoundary} sized to `columns` and
 * delegates to {@link sampleGamutBoundaryInto}. Exactly 2 allocations (the
 * result object + its `Float64Array`).
 */
export function sampleGamutBoundary(
    hueDeg: number,
    target: GamutBoundaryTarget,
    options?: SampleGamutBoundaryOptions,
): GamutBoundary {
    const columns = options?.columns ?? 96;
    validateColumns(columns);
    const out: GamutBoundary = {
        points: new Float64Array(2 * (columns + 2)),
        count: 0,
        oogTopFrac: 0,
    };
    return sampleGamutBoundaryInto(hueDeg, target, out, options);
}
