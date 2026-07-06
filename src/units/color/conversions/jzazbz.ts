/**
 * Jzazbz ↔ XYZ (S.W1-11 · Q9 widening — Safdar, Kim, Luo, Cui, Melgosa 2017,
 * "Perceptually uniform color space for image signals including high dynamic
 * range and wide gamut").
 *
 * NET-NEW math (unlike ICtCp, whose transform already shipped inside `deltaEITP`
 * — see `difference.ts`). Jzazbz shares the Perceptual-Quantizer idea with ICtCp
 * but uses its OWN PQ variant (a different exponent set + a final `Jz`
 * non-linearity) plus a b/g cross-mixing of X,Y,Z before the cone response.
 *
 * CONVENTION (the ecosystem-standard colorjs `xyz-abs-d65` path): the input is
 * RELATIVE XYZ (D65, media white Y=1 — the library's `XYZColor` coordinates),
 * scaled to absolute cd/m² by the 203 media-white luminance (identical to the
 * ICtCp `ITP_YW`). Under this convention D65 white maps to `Jz ≈ 0.2220652`
 * (matching colorjs), the value pinned in `color-jzazbz.test.ts`. az/bz are the
 * red-green / yellow-blue opponent axes; NOTE Jzazbz is NOT perfectly achromatic
 * for greys (D65 white carries az≈-1.6e-4, bz≈-1.2e-4 — a real property of the
 * space, not an error), which the grey golden encodes.
 *
 * Both directions validated against the independent
 * `scratchpad/perceptual_oracle.py` transcription (self-inverse to ~1e-13).
 * Pure raw-value functions (no `Color` plumbing), mirroring `xyzToICtCp`.
 */

import type { Mat3 } from "../matrix";
import { invertMat3, transformMat3 } from "../matrix";
import { JzazbzColor, XYZColor } from "..";
import { scale } from "../../../math";
import { COLOR_SPACE_RANGES } from "../constants";

// ── constants (Safdar 2017) ──
const JZ_B = 1.15;
const JZ_G = 0.66;
const JZ_C1 = 3424 / 2 ** 12; // 0.8359375
const JZ_C2 = 2413 / 2 ** 7; // 18.8515625
const JZ_C3 = 2392 / 2 ** 7; // 18.6875
const JZ_N = 2610 / 2 ** 14; // 0.15930175781… (PQ exponent)
const JZ_P = (1.7 * 2523) / 2 ** 5; // 134.034375 (PQ exponent)
const JZ_D = -0.56;
const JZ_D0 = 1.6295499532821566e-11;

/** Media-white luminance — relative Y=1 ↦ 203 cd/m² (as ICtCp's `ITP_YW`). */
const JZ_YW = 203;

// XYZ' → LMS cone response (row-major).
const JZ_XYZ_TO_LMS: Mat3 = [
    0.41478972, 0.579999, 0.014648,
    -0.20151, 1.120649, 0.0531008,
    -0.0166008, 0.2648, 0.6684799,
];
const JZ_LMS_TO_XYZ: Mat3 = invertMat3(JZ_XYZ_TO_LMS);

// LMS' → Iz az bz (row-major).
const JZ_LMSP_TO_IAB: Mat3 = [
    0.5, 0.5, 0,
    3.524, -4.066708, 0.542708,
    0.199076, 1.096799, -1.295875,
];
const JZ_IAB_TO_LMSP: Mat3 = invertMat3(JZ_LMSP_TO_IAB);

/** Jzazbz PQ EOTF⁻¹ — absolute luminance [0,1e4] → signal (its own exponents). */
function jzPqEncode(v: number): number {
    if (v < 0) v = 0;
    const c = (v / 1e4) ** JZ_N;
    return ((JZ_C1 + JZ_C2 * c) / (1 + JZ_C3 * c)) ** JZ_P;
}

/** Jzazbz PQ EOTF — signal → absolute luminance (exact inverse of jzPqEncode). */
function jzPqDecode(N: number): number {
    const p = Math.max(N, 0) ** (1 / JZ_P);
    const num = Math.max(p - JZ_C1, 0);
    const den = JZ_C2 - JZ_C3 * p;
    return 1e4 * (num / den) ** (1 / JZ_N);
}

/**
 * Convert relative XYZ (D65, media white Y=1) to Jzazbz `[Jz, az, bz]`.
 * NET-NEW PQ-variant transfer (Safdar 2017); colorjs `xyz-abs-d65` convention.
 */
export function xyzToJzazbz(x: number, y: number, z: number): [number, number, number] {
    const Xa = Math.max(x * JZ_YW, 0);
    const Ya = Math.max(y * JZ_YW, 0);
    const Za = Math.max(z * JZ_YW, 0);

    // b/g cross-mix before the cone response.
    const Xm = JZ_B * Xa - (JZ_B - 1) * Za;
    const Ym = JZ_G * Ya - (JZ_G - 1) * Xa;

    const [l, m, s] = transformMat3([Xm, Ym, Za], JZ_XYZ_TO_LMS);
    const lp = jzPqEncode(l);
    const mp = jzPqEncode(m);
    const sp = jzPqEncode(s);

    const [Iz, az, bz] = transformMat3([lp, mp, sp], JZ_LMSP_TO_IAB);
    const Jz = ((1 + JZ_D) * Iz) / (1 + JZ_D * Iz) - JZ_D0;
    return [Jz, az, bz];
}

/**
 * Convert Jzazbz `[Jz, az, bz]` back to relative XYZ (D65, media white Y=1).
 * The exact inverse of {@link xyzToJzazbz} (self-inverse to ~1e-13 for real XYZ).
 */
export function jzazbzToXYZ(Jz: number, az: number, bz: number): [number, number, number] {
    const Iz = (Jz + JZ_D0) / (1 + JZ_D - JZ_D * (Jz + JZ_D0));

    const [lp, mp, sp] = transformMat3([Iz, az, bz], JZ_IAB_TO_LMSP);
    const lms: [number, number, number] = [jzPqDecode(lp), jzPqDecode(mp), jzPqDecode(sp)];

    const [Xm, Ym, Zm] = transformMat3(lms, JZ_LMS_TO_XYZ);
    const Xa = (Xm + (JZ_B - 1) * Zm) / JZ_B;
    const Ya = (Ym + (JZ_G - 1) * Xa) / JZ_G;
    return [Xa / JZ_YW, Ya / JZ_YW, Zm / JZ_YW];
}

// ── `color2()`-dispatch Color wrappers (S.W1 remediation, 3.1.0) ────────────
//
// The thin space wrapper the `XYZ_FUNCTIONS` hub keys by — adapting the raw
// `[number,number,number]` transforms above to the `{ to, from }` XYZColor
// signature, applying the [0,1] ⇄ physical normalization every conversion module
// honours (see `oklab.ts` / `conversions/ictcp.ts`). The XYZ hub carries relative
// physical XYZ (D65, Y=1 — exactly what `xyzToJzazbz` consumes); JzazbzColor
// carries [0,1]-normalized channels against `COLOR_SPACE_RANGES.jzazbz`.

const JR = COLOR_SPACE_RANGES.jzazbz;

/** XYZ (relative, Y=1) → Jzazbz. Physical [Jz,az,bz] normalized to [0,1]. */
export function xyz2jzazbz(xyz: XYZColor): JzazbzColor {
    const [Jz, az, bz] = xyzToJzazbz(xyz.x, xyz.y, xyz.z);
    return new JzazbzColor(
        scale(Jz, JR.jz.number.min, JR.jz.number.max),
        scale(az, JR.az.number.min, JR.az.number.max),
        scale(bz, JR.bz.number.min, JR.bz.number.max),
        xyz.alpha,
    );
}

/** Jzazbz → XYZ (relative, Y=1). [0,1] channels denormalized to physical. */
export function jzazbz2xyz(color: JzazbzColor): XYZColor {
    const Jz = scale(color.jz, 0, 1, JR.jz.number.min, JR.jz.number.max);
    const az = scale(color.az, 0, 1, JR.az.number.min, JR.az.number.max);
    const bz = scale(color.bz, 0, 1, JR.bz.number.min, JR.bz.number.max);
    const [x, y, z] = jzazbzToXYZ(Jz, az, bz);
    return new XYZColor(x, y, z, color.alpha);
}
