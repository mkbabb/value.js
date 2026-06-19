/**
 * OKLab / OKLCH conversions.
 *
 * OKLab is Björn Ottosson's perceptually-uniform space — distinct lineage
 * from CIE Lab (see `lab.ts`). OKLab routes to the XYZ hub through the LMS
 * cone-response stage; OKLCH is its polar form. The Lab↔OKLab bridges
 * (`oklab2lab` / `lab2oklab`) compose via XYZ.
 *
 * G.W1 Lane B — extracted from `src/units/color/utils.ts` (G3 decomposition).
 */

import type { Vec3 } from "../matrix";
import { transformMat3Into } from "../matrix";
import { ch, LABColor, OKLABColor, OKLCHColor, XYZColor } from "..";
import { scale } from "../../../math";
import {
    COLOR_SPACE_RANGES,
    LMS_TO_OKLAB_MATRIX,
    LMS_TO_XYZ_MATRIX,
    OKLAB_TO_LMS_MATRIX,
    XYZ_TO_LMS_MATRIX,
} from "../constants";
import { lab2xyz, xyz2lab } from "./lab";

// ── Module-scoped scratch Vec3 buffers (O.W3 zero-alloc) ──
//
// `oklab2xyz` / `xyz2oklab` are leaf functions on the XYZ-hub rAF hot path; they
// never re-enter themselves and never sub-call anything that touches these
// buffers. Single-threaded JS makes the in-place reuse re-entrancy-safe (the same
// argument the `ANIMATION_SCRATCH` string buffer in `units/color/index.ts`
// relies on). Each function fully populates its scratch before the next stage
// reads it, so a write in `oklab2xyz` cannot leak into `xyz2oklab`.
const _scratchA: Vec3 = [0, 0, 0];
const _scratchB: Vec3 = [0, 0, 0];

// ── OKLab ↔ XYZ ──

// Input and output values in range [0, 1]
export function oklab2xyz({ l, a, b, alpha }: OKLABColor): XYZColor {
    a = ch(scale(
        a,
        0,
        1,
        COLOR_SPACE_RANGES.oklab.a.number.min,
        COLOR_SPACE_RANGES.oklab.a.number.max,
    ));
    b = ch(scale(
        b,
        0,
        1,
        COLOR_SPACE_RANGES.oklab.b.number.min,
        COLOR_SPACE_RANGES.oklab.b.number.max,
    ));

    // Convert OKLab to LMS (into _scratchA — zero tuple allocs)
    _scratchA[0] = l;
    _scratchA[1] = a;
    _scratchA[2] = b;
    transformMat3Into(_scratchA, OKLAB_TO_LMS_MATRIX, _scratchB);

    // Apply non-linearity (LMS to linear LMS) — cube in place
    _scratchB[0] = _scratchB[0] * _scratchB[0] * _scratchB[0];
    _scratchB[1] = _scratchB[1] * _scratchB[1] * _scratchB[1];
    _scratchB[2] = _scratchB[2] * _scratchB[2] * _scratchB[2];

    // Convert linear LMS to XYZ
    transformMat3Into(_scratchB, LMS_TO_XYZ_MATRIX, _scratchA);

    return new XYZColor(_scratchA[0], _scratchA[1], _scratchA[2], alpha);
}

// Input and output values in range [0, 1]
export function xyz2oklab(xyz: XYZColor): OKLABColor {
    const { x, y, z } = xyz;

    // Convert XYZ to linear LMS (into _scratchA — zero tuple allocs)
    _scratchA[0] = x;
    _scratchA[1] = y;
    _scratchA[2] = z;
    transformMat3Into(_scratchA, XYZ_TO_LMS_MATRIX, _scratchB);

    // Apply non-linearity (linear LMS to LMS) — cube-root in place
    _scratchB[0] = Math.cbrt(_scratchB[0]);
    _scratchB[1] = Math.cbrt(_scratchB[1]);
    _scratchB[2] = Math.cbrt(_scratchB[2]);

    // Convert LMS to OKLab
    transformMat3Into(_scratchB, LMS_TO_OKLAB_MATRIX, _scratchA);
    const l = _scratchA[0];
    const a = _scratchA[1];
    const b = _scratchA[2];

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
        xyz.alpha,
    );
}

// ── Lab ↔ OKLab bridges (compose via XYZ) ──

// Input and output values in range [0, 1]
export function oklab2lab(oklab: OKLABColor): LABColor {
    const xyz = oklab2xyz(oklab);
    return xyz2lab(xyz);
}

// Input and output values in range [0, 1]
export function lab2oklab(lab: LABColor): OKLABColor {
    const xyz = lab2xyz(lab);
    return xyz2oklab(xyz);
}

// ── OKLCH (polar form of OKLab) ──

// Input and output values in range [0, 1]
export function oklab2oklch({ l, a, b, alpha }: OKLABColor): OKLCHColor {
    // Denormalize a,b from [0,1] to OKLab range [-0.4, 0.4]
    a = ch(scale(a, 0, 1, COLOR_SPACE_RANGES.oklab.a.number.min, COLOR_SPACE_RANGES.oklab.a.number.max));
    b = ch(scale(b, 0, 1, COLOR_SPACE_RANGES.oklab.b.number.min, COLOR_SPACE_RANGES.oklab.b.number.max));

    const c = Math.hypot(a, b);

    let h = Math.atan2(b, a) / (2 * Math.PI);
    if (h < 0) h += 1;

    return new OKLCHColor(
        l,
        scale(c, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max),
        h,
        alpha,
    );
}

// Input and output values in range [0, 1]
export function oklch2oklab({ l, c, h, alpha }: OKLCHColor): OKLABColor {
    // Denormalize c from [0,1] to OKLCh range [0, 0.5]
    c = ch(scale(c, 0, 1, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max));

    const hRad = h * 2 * Math.PI;
    const a = Math.cos(hRad) * c;
    const b = Math.sin(hRad) * c;

    return new OKLABColor(
        l,
        scale(a, COLOR_SPACE_RANGES.oklab.a.number.min, COLOR_SPACE_RANGES.oklab.a.number.max),
        scale(b, COLOR_SPACE_RANGES.oklab.b.number.min, COLOR_SPACE_RANGES.oklab.b.number.max),
        alpha,
    );
}

// Input and output values in range [0, 1]
export function oklch2lab(oklch: OKLCHColor): LABColor {
    return oklab2lab(oklch2oklab(oklch));
}

export function lab2oklch(lab: LABColor): OKLCHColor {
    return oklab2oklch(lab2oklab(lab));
}

// ── XYZ-hub composition for OKLCH ──

export function oklch2xyz(oklch: OKLCHColor): XYZColor {
    const oklab = oklch2oklab(oklch);
    return oklab2xyz(oklab);
}

export function xyz2oklch(xyz: XYZColor): OKLCHColor {
    const oklab = xyz2oklab(xyz);
    return oklab2oklch(oklab);
}
