/**
 * Direct (non-XYZ-hub) conversion paths for the hot interpolation pairs.
 *
 * `color2()` routes most conversions through XYZ D65 as a hub. For the
 * highest-frequency CSS interpolation pairs (`oklab↔rgb`, `oklch↔rgb`,
 * `hsl↔rgb`), a direct path skips the XYZ intermediate — saving one matrix
 * multiply + one XYZColor allocation per call. Numerically equivalent to the
 * XYZ-hub path within floating-point epsilon (verified by `test/color-*`).
 *
 * The `dispatch.ts` `DIRECT_PATHS` table wires these into `color2()`.
 *
 * G.W1 Lane B — extracted from `src/units/color/utils.ts` (G3 decomposition).
 * E.W1 Lane C — original direct-path implementation.
 */

import { OKLABColor, OKLCHColor, RGBColor } from "..";
import type { HSLColor } from "..";
import { scale } from "../../../math";
import {
    COLOR_SPACE_RANGES,
    LINEAR_SRGB_TO_LMS,
    LMS_TO_LINEAR_SRGB,
    LMS_TO_OKLAB_MATRIX,
    OKLAB_TO_LMS_COEFF,
} from "../constants";
import { gamutMap } from "../dispatch";
import { hsl2rgb, rgb2hsl } from "./cylindrical";
import { linearToSrgb, srgbToLinear } from "./transfer";

// ──────────────────────────────────────────────────────────────────────────────
// All RGB direct paths route through `gamutMap` to match `xyz2rgb`'s default
// `correctGamut=true` semantics (callers downstream — `gamutMap` itself, the
// demo gradient interpolation, `colorUnit2` — rely on this).
//
// Path composition is the same operations in a different order — the math is
// associative across the linear stages, and the cube/cbrt non-linearity sits
// at the LMS layer in both paths.
// ──────────────────────────────────────────────────────────────────────────────

/** Direct OKLab → RGB. Skips XYZColor allocation + one matrix multiply. */
export function directOklabToRgb(oklab: OKLABColor): RGBColor {
    // Denormalize a, b from [0,1] to OKLab physical range (mirrors oklab2xyz).
    const a = scale(
        oklab.a as number, 0, 1,
        COLOR_SPACE_RANGES.oklab.a.number.min,
        COLOR_SPACE_RANGES.oklab.a.number.max,
    );
    const b = scale(
        oklab.b as number, 0, 1,
        COLOR_SPACE_RANGES.oklab.b.number.min,
        COLOR_SPACE_RANGES.oklab.b.number.max,
    );
    const L = oklab.l as number;

    // OKLab → LMS (cube-root domain) via OKLab→LMS coefficient rows.
    const l_ = L + OKLAB_TO_LMS_COEFF.l[1] * a + OKLAB_TO_LMS_COEFF.l[2] * b;
    const m_ = L + OKLAB_TO_LMS_COEFF.m[1] * a + OKLAB_TO_LMS_COEFF.m[2] * b;
    const s_ = L + OKLAB_TO_LMS_COEFF.s[1] * a + OKLAB_TO_LMS_COEFF.s[2] * b;

    // Cube to linear LMS.
    const lLin = l_ * l_ * l_;
    const mLin = m_ * m_ * m_;
    const sLin = s_ * s_ * s_;

    // Linear LMS → linear sRGB (Ottosson's direct matrix; no XYZ intermediate).
    const rLin =
        LMS_TO_LINEAR_SRGB[0] * lLin + LMS_TO_LINEAR_SRGB[1] * mLin + LMS_TO_LINEAR_SRGB[2] * sLin;
    const gLin =
        LMS_TO_LINEAR_SRGB[3] * lLin + LMS_TO_LINEAR_SRGB[4] * mLin + LMS_TO_LINEAR_SRGB[5] * sLin;
    const bLin =
        LMS_TO_LINEAR_SRGB[6] * lLin + LMS_TO_LINEAR_SRGB[7] * mLin + LMS_TO_LINEAR_SRGB[8] * sLin;

    // Linear sRGB → sRGB (transfer encode) — then gamut-map (matches xyz2rgb default).
    const rgb = gamutMap(new RGBColor(
        linearToSrgb(rLin), linearToSrgb(gLin), linearToSrgb(bLin), oklab.alpha,
    ));
    return new RGBColor(rgb.r, rgb.g, rgb.b, oklab.alpha);
}

/** Direct RGB → OKLab. Skips XYZColor allocation + one matrix multiply. */
export function directRgbToOklab(rgb: RGBColor): OKLABColor {
    const rLin = srgbToLinear(rgb.r as number);
    const gLin = srgbToLinear(rgb.g as number);
    const bLin = srgbToLinear(rgb.b as number);

    // Linear sRGB → LMS (cube-root domain).
    const l_ = Math.cbrt(
        LINEAR_SRGB_TO_LMS[0] * rLin + LINEAR_SRGB_TO_LMS[1] * gLin + LINEAR_SRGB_TO_LMS[2] * bLin,
    );
    const m_ = Math.cbrt(
        LINEAR_SRGB_TO_LMS[3] * rLin + LINEAR_SRGB_TO_LMS[4] * gLin + LINEAR_SRGB_TO_LMS[5] * bLin,
    );
    const s_ = Math.cbrt(
        LINEAR_SRGB_TO_LMS[6] * rLin + LINEAR_SRGB_TO_LMS[7] * gLin + LINEAR_SRGB_TO_LMS[8] * bLin,
    );

    // LMS → OKLab via the canonical LMS_TO_OKLAB_MATRIX.
    const l =
        LMS_TO_OKLAB_MATRIX[0] * l_ + LMS_TO_OKLAB_MATRIX[1] * m_ + LMS_TO_OKLAB_MATRIX[2] * s_;
    const a =
        LMS_TO_OKLAB_MATRIX[3] * l_ + LMS_TO_OKLAB_MATRIX[4] * m_ + LMS_TO_OKLAB_MATRIX[5] * s_;
    const b =
        LMS_TO_OKLAB_MATRIX[6] * l_ + LMS_TO_OKLAB_MATRIX[7] * m_ + LMS_TO_OKLAB_MATRIX[8] * s_;

    // Normalize a, b to [0,1] (matches xyz2oklab's output range).
    return new OKLABColor(
        l,
        scale(
            a,
            COLOR_SPACE_RANGES.oklab.a.number.min,
            COLOR_SPACE_RANGES.oklab.a.number.max,
        ),
        scale(
            b,
            COLOR_SPACE_RANGES.oklab.b.number.min,
            COLOR_SPACE_RANGES.oklab.b.number.max,
        ),
        rgb.alpha,
    );
}

/** Direct OKLCH → RGB. Polar → Cartesian → direct OKLab→RGB. */
export function directOklchToRgb(oklch: OKLCHColor): RGBColor {
    // Denormalize c from [0,1] to OKLCh physical range (mirrors oklch2oklab).
    const c = scale(
        oklch.c as number, 0, 1,
        COLOR_SPACE_RANGES.oklch.c.number.min,
        COLOR_SPACE_RANGES.oklch.c.number.max,
    );
    const hRad = (oklch.h as number) * 2 * Math.PI;
    const a = Math.cos(hRad) * c;
    const b = Math.sin(hRad) * c;

    // Convert raw Cartesian (a,b) directly through OKLab→LMS→linear sRGB
    // without rebuilding/renormalizing an OKLABColor instance.
    const L = oklch.l as number;
    const l_ = L + OKLAB_TO_LMS_COEFF.l[1] * a + OKLAB_TO_LMS_COEFF.l[2] * b;
    const m_ = L + OKLAB_TO_LMS_COEFF.m[1] * a + OKLAB_TO_LMS_COEFF.m[2] * b;
    const s_ = L + OKLAB_TO_LMS_COEFF.s[1] * a + OKLAB_TO_LMS_COEFF.s[2] * b;

    const lLin = l_ * l_ * l_;
    const mLin = m_ * m_ * m_;
    const sLin = s_ * s_ * s_;

    const rLin =
        LMS_TO_LINEAR_SRGB[0] * lLin + LMS_TO_LINEAR_SRGB[1] * mLin + LMS_TO_LINEAR_SRGB[2] * sLin;
    const gLin =
        LMS_TO_LINEAR_SRGB[3] * lLin + LMS_TO_LINEAR_SRGB[4] * mLin + LMS_TO_LINEAR_SRGB[5] * sLin;
    const bLin =
        LMS_TO_LINEAR_SRGB[6] * lLin + LMS_TO_LINEAR_SRGB[7] * mLin + LMS_TO_LINEAR_SRGB[8] * sLin;

    const rgb = gamutMap(new RGBColor(
        linearToSrgb(rLin), linearToSrgb(gLin), linearToSrgb(bLin), oklch.alpha,
    ));
    return new RGBColor(rgb.r, rgb.g, rgb.b, oklch.alpha);
}

/** Direct RGB → OKLCH. Direct RGB→OKLab Cartesian → polar (skip OKLABColor wrap). */
export function directRgbToOklch(rgb: RGBColor): OKLCHColor {
    const rLin = srgbToLinear(rgb.r as number);
    const gLin = srgbToLinear(rgb.g as number);
    const bLin = srgbToLinear(rgb.b as number);

    const l_ = Math.cbrt(
        LINEAR_SRGB_TO_LMS[0] * rLin + LINEAR_SRGB_TO_LMS[1] * gLin + LINEAR_SRGB_TO_LMS[2] * bLin,
    );
    const m_ = Math.cbrt(
        LINEAR_SRGB_TO_LMS[3] * rLin + LINEAR_SRGB_TO_LMS[4] * gLin + LINEAR_SRGB_TO_LMS[5] * bLin,
    );
    const s_ = Math.cbrt(
        LINEAR_SRGB_TO_LMS[6] * rLin + LINEAR_SRGB_TO_LMS[7] * gLin + LINEAR_SRGB_TO_LMS[8] * bLin,
    );

    const l =
        LMS_TO_OKLAB_MATRIX[0] * l_ + LMS_TO_OKLAB_MATRIX[1] * m_ + LMS_TO_OKLAB_MATRIX[2] * s_;
    const a =
        LMS_TO_OKLAB_MATRIX[3] * l_ + LMS_TO_OKLAB_MATRIX[4] * m_ + LMS_TO_OKLAB_MATRIX[5] * s_;
    const b =
        LMS_TO_OKLAB_MATRIX[6] * l_ + LMS_TO_OKLAB_MATRIX[7] * m_ + LMS_TO_OKLAB_MATRIX[8] * s_;

    // Cartesian → polar (mirrors oklab2oklch on raw values).
    const c = Math.hypot(a, b);
    let h = Math.atan2(b, a) / (2 * Math.PI);
    if (h < 0) h += 1;

    return new OKLCHColor(
        l,
        scale(
            c,
            COLOR_SPACE_RANGES.oklch.c.number.min,
            COLOR_SPACE_RANGES.oklch.c.number.max,
        ),
        h,
        rgb.alpha,
    );
}

/** Direct HSL → RGB. Already a closed-form cylindrical conversion (no XYZ). */
export function directHslToRgb(hsl: HSLColor): RGBColor {
    // `hsl2rgb` already implements the direct cylindrical conversion (no
    // XYZ intermediate at all) — the XYZ-hub path adds an unnecessary round
    // trip. Match `xyz2rgb`'s default by gamut-mapping the result.
    const rgb = hsl2rgb(hsl);
    return gamutMap(rgb);
}

/** Direct RGB → HSL. Already a closed-form cylindrical conversion (no XYZ). */
export function directRgbToHsl(rgb: RGBColor): HSLColor {
    return rgb2hsl(rgb);
}
