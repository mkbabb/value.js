/**
 * Perceptual color-difference metrics (R.W1.6 · R-3).
 *
 * value.js has carried only Euclidean ΔE-OK (`gamut.ts deltaEOK`, the JND gate
 * on the analytical gamut map). This module adds the two SOTA metrics the wider
 * ecosystem (colorjs / culori) exposes and that better quantization / dedup want:
 *
 *  - **ΔE-2000** (CIEDE2000) — the CIE-standard perceptual distance in CIELAB,
 *    with the lightness/chroma/hue weighting + the blue-region rotation term
 *    (Sharma, Wu & Dalal 2005). Operates on CIE L*a*b* (the library's `lab`
 *    space: L ∈ [0,100], a,b ∈ physical).
 *  - **ΔE-ITP** (ITU-R BT.2124) — the HDR-ready metric over ICtCp (BT.2100),
 *    `720·√(ΔI² + (½ΔCt)² + ΔCp²)`, where one unit ≈ one JND. `rawXyz2ictcp`
 *    exposes the ICtCp transform itself (shared math with the deferred R-6
 *    Jzazbz/ICtCp spaces).
 *
 * All three are PURE numeric functions — no `Color` plumbing, no space registry
 * churn — mirroring `deltaEOK`'s raw-argument style so quantize / gamut callers
 * compose them over coordinates they already hold.
 *
 * S.W1-6 adds `rawIctcp2xyz` — the INVERSE of `rawXyz2ictcp`, the second half of the
 * ICtCp perceptual round-trip (Q9). It lifts the SAME BT.2100 matrices +
 * PQ constants the forward already ships (per the ratification's "lift, don't
 * re-derive"), inverting them via the library's own `invertMat3`.
 */

import type { Mat3 } from "./matrix";
import { invertMat3, transformMat3 } from "./matrix";

// ── ΔE-2000 (CIEDE2000) ─────────────────────────────────────────────────────

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const POW25_7 = 25 ** 7; // the chroma-rolloff pivot G/Rc share

/**
 * CIEDE2000 color difference between two CIE L*a*b* colors (Sharma, Wu & Dalal
 * 2005 formulation — the reference against which implementations are validated).
 *
 * Inputs are CIELAB coordinates (the library's `lab` space: L ∈ [0,100], a,b in
 * physical units). `kL`/`kC`/`kH` are the parametric weighting factors (all 1
 * for the reference conditions). Symmetric and non-negative; 0 iff the two
 * colors coincide.
 */
export function deltaE2000(
    L1: number, a1: number, b1: number,
    L2: number, a2: number, b2: number,
    kL: number = 1, kC: number = 1, kH: number = 1,
): number {
    const C1 = Math.hypot(a1, b1);
    const C2 = Math.hypot(a2, b2);
    const Cbar = (C1 + C2) / 2;
    const Cbar7 = Cbar ** 7;
    const G = 0.5 * (1 - Math.sqrt(Cbar7 / (Cbar7 + POW25_7)));

    const a1p = (1 + G) * a1;
    const a2p = (1 + G) * a2;
    const C1p = Math.hypot(a1p, b1);
    const C2p = Math.hypot(a2p, b2);

    // h'∈[0,360); atan2(0,0)=0 is the achromatic convention (hue term is then
    // gated to zero by the C1p·C2p===0 guards below, so the exact value is inert).
    let h1p = Math.atan2(b1, a1p) * RAD2DEG;
    if (h1p < 0) h1p += 360;
    let h2p = Math.atan2(b2, a2p) * RAD2DEG;
    if (h2p < 0) h2p += 360;

    const dLp = L2 - L1;
    const dCp = C2p - C1p;

    let dhp: number;
    if (C1p * C2p === 0) {
        dhp = 0;
    } else {
        dhp = h2p - h1p;
        if (dhp > 180) dhp -= 360;
        else if (dhp < -180) dhp += 360;
    }
    const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * DEG2RAD) / 2);

    const Lbarp = (L1 + L2) / 2;
    const Cbarp = (C1p + C2p) / 2;

    let hbarp: number;
    if (C1p * C2p === 0) {
        hbarp = h1p + h2p;
    } else if (Math.abs(h1p - h2p) > 180) {
        hbarp = (h1p + h2p + 360) / 2;
    } else {
        hbarp = (h1p + h2p) / 2;
    }

    const T =
        1 -
        0.17 * Math.cos((hbarp - 30) * DEG2RAD) +
        0.24 * Math.cos(2 * hbarp * DEG2RAD) +
        0.32 * Math.cos((3 * hbarp + 6) * DEG2RAD) -
        0.20 * Math.cos((4 * hbarp - 63) * DEG2RAD);

    const dTheta = 30 * Math.exp(-(((hbarp - 275) / 25) ** 2));
    const Cbarp7 = Cbarp ** 7;
    const Rc = 2 * Math.sqrt(Cbarp7 / (Cbarp7 + POW25_7));
    const Sl =
        1 + (0.015 * (Lbarp - 50) ** 2) / Math.sqrt(20 + (Lbarp - 50) ** 2);
    const Sc = 1 + 0.045 * Cbarp;
    const Sh = 1 + 0.015 * Cbarp * T;
    const Rt = -Math.sin(2 * dTheta * DEG2RAD) * Rc;

    const lTerm = dLp / (kL * Sl);
    const cTerm = dCp / (kC * Sc);
    const hTerm = dHp / (kH * Sh);

    return Math.sqrt(
        lTerm * lTerm + cTerm * cTerm + hTerm * hTerm + Rt * cTerm * hTerm,
    );
}

// ── ΔE-ITP (ITU-R BT.2124) over ICtCp (BT.2100) ─────────────────────────────
//
// The transform + PQ constants match the ITU-R BT.2100 / BT.2124 specification
// (and culori's `itp` mode bit-for-bit): relative XYZ (media white Y=1) is
// scaled to absolute cd/m² by the BT.2408 media-white luminance, run through the
// crosstalk XYZ→LMS matrix, PQ-encoded, then the LMS'→ICtCp matrix. `Ct` (the
// `t` channel) is the raw BT.2100 value; the ΔE applies the ½ weighting.

/** BT.2408 media-white luminance: relative Y=1 ↦ 203 cd/m² (PQ code 58). */
const ITP_YW = 203;

// PQ EOTF⁻¹ constants (Rec. BT.2100-2), `v` in [0, 1e4] cd/m².
const PQ_M1 = 0.1593017578125;
const PQ_M2 = 78.84375;
const PQ_C1 = 0.8359375;
const PQ_C2 = 18.8515625;
const PQ_C3 = 18.6875;

/** PQ (Perceptual Quantizer) EOTF⁻¹ — absolute luminance [0,1e4] → signal [0,1]. */
function pqEncode(v: number): number {
    if (v < 0) return 0;
    const c = (v / 1e4) ** PQ_M1;
    return ((PQ_C1 + PQ_C2 * c) / (1 + PQ_C3 * c)) ** PQ_M2;
}

/**
 * Convert relative XYZ (D65, media white Y=1 — the library's `XYZColor`
 * coordinates) to ICtCp (BT.2100), returning `[I, Ct, Cp]`. `Ct` is the raw
 * BT.2100 tritanopic channel (the ½ factor lives in {@link deltaEITP}).
 *
 * Exposed as a building block: it is the shared front-end for the deferred R-6
 * ICtCp / Jzazbz perceptual spaces.
 */
export function rawXyz2ictcp(x: number, y: number, z: number): [number, number, number] {
    const absX = Math.max(x * ITP_YW, 0);
    const absY = Math.max(y * ITP_YW, 0);
    const absZ = Math.max(z * ITP_YW, 0);

    // XYZ (absolute) → LMS crosstalk matrix (BT.2100).
    const l = pqEncode(
        0.3592832590121217 * absX +
            0.6976051147779502 * absY -
            0.0358915932320289 * absZ,
    );
    const m = pqEncode(
        -0.1920808463704995 * absX +
            1.1004767970374323 * absY +
            0.0753748658519118 * absZ,
    );
    const s = pqEncode(
        0.0070797844607477 * absX +
            0.0748396662186366 * absY +
            0.8433265453898765 * absZ,
    );

    // LMS' → ICtCp (BT.2100 integer/4096 coefficients).
    const I = 0.5 * l + 0.5 * m;
    const Ct = 1.61376953125 * l - 3.323486328125 * m + 1.709716796875 * s;
    const Cp = 4.378173828125 * l - 4.24560546875 * m - 0.132568359375 * s;

    return [I, Ct, Cp];
}

// ── ICtCp → XYZ inverse (S.W1-6, Q9 — the ICtCp perceptual round-trip) ───────
//
// The exact inverse of {@link rawXyz2ictcp}: the two BT.2100 matrices the forward
// applies inline, materialised as row-major `Mat3` constants and inverted with
// the library's `invertMat3` (no re-derived coefficients). The forward clamps
// negative absolute values to 0 (the `Math.max`/`pqEncode` guards), so the
// round-trip is exact only for non-negative XYZ (every real color); for those it
// reproduces the input to ~1e-14 (validated in `color-difference.test.ts`
// against the independent `scratchpad/perceptual_oracle.py`).

/** XYZ(abs)→LMS crosstalk (BT.2100) — the forward's inline matrix, materialised. */
const XYZ_TO_LMS_ICTCP: Mat3 = [
    0.3592832590121217, 0.6976051147779502, -0.0358915932320289,
    -0.1920808463704995, 1.1004767970374323, 0.0753748658519118,
    0.0070797844607477, 0.0748396662186366, 0.8433265453898765,
];
const LMS_TO_XYZ_ICTCP: Mat3 = invertMat3(XYZ_TO_LMS_ICTCP);

/** LMS'→ICtCp (BT.2100 integer/4096 coefficients) — the forward's inline matrix. */
const LMSP_TO_ICTCP: Mat3 = [
    0.5, 0.5, 0,
    1.61376953125, -3.323486328125, 1.709716796875,
    4.378173828125, -4.24560546875, -0.132568359375,
];
const ICTCP_TO_LMSP: Mat3 = invertMat3(LMSP_TO_ICTCP);

/** PQ (Perceptual Quantizer) EOTF — signal [0,1] → absolute luminance [0,1e4].
 *  The exact inverse of {@link pqEncode}: solve `N^(1/m2) = (c1+c2·c)/(1+c3·c)`
 *  for `c`, then `v = 1e4·c^(1/m1)`. */
function pqDecode(N: number): number {
    const p = Math.max(N, 0) ** (1 / PQ_M2);
    const num = Math.max(p - PQ_C1, 0);
    const den = PQ_C2 - PQ_C3 * p;
    return 1e4 * (num / den) ** (1 / PQ_M1);
}

/**
 * Convert ICtCp (BT.2100 `[I, Ct, Cp]`, as {@link rawXyz2ictcp} produces) back to
 * relative XYZ (D65, media white Y=1 — the library's `XYZColor` coordinates).
 * The exact inverse of {@link rawXyz2ictcp} for non-negative XYZ.
 */
export function rawIctcp2xyz(I: number, Ct: number, Cp: number): [number, number, number] {
    // ICtCp → LMS' → (PQ decode) absolute LMS → absolute XYZ → relative XYZ.
    const [lp, mp, sp] = transformMat3([I, Ct, Cp], ICTCP_TO_LMSP);
    const lms: [number, number, number] = [pqDecode(lp), pqDecode(mp), pqDecode(sp)];
    const [ax, ay, az] = transformMat3(lms, LMS_TO_XYZ_ICTCP);
    return [ax / ITP_YW, ay / ITP_YW, az / ITP_YW];
}

/**
 * ΔE-ITP (ITU-R BT.2124) between two ICtCp colors (`[I, Ct, Cp]` as
 * {@link rawXyz2ictcp} produces): `720·√(ΔI² + (½ΔCt)² + ΔCp²)`. One unit ≈ one
 * JND. Symmetric and non-negative.
 */
export function deltaEITP(
    I1: number, Ct1: number, Cp1: number,
    I2: number, Ct2: number, Cp2: number,
): number {
    const dI = I1 - I2;
    const dT = 0.5 * (Ct1 - Ct2);
    const dP = Cp1 - Cp2;
    return 720 * Math.sqrt(dI * dI + dT * dT + dP * dP);
}
