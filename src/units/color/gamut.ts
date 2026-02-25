/**
 * Analytical sRGB gamut mapping based on Bjorn Ottosson's ok_color.h
 * https://bottosson.github.io/posts/gamutclipping/
 *
 * Strategy: adaptive L0 (alpha=0.05) — deterministic, zero-iteration,
 * perceptually correct in OKLab with exact hue preservation.
 *
 * MIT License — Copyright (c) 2021 Bjorn Ottosson
 */

import {
    GAMUT_SECTOR_COEFFICIENTS,
    LINEAR_SRGB_TO_LMS,
    LMS_TO_LINEAR_SRGB,
    OKLAB_TO_LMS_COEFF,
} from "./constants";

// ── sRGB transfer functions (inlined to avoid circular dep with utils.ts) ──

const SRGB_GAMMA = 2.4;
const SRGB_OFFSET = 0.055;
const SRGB_SLOPE = 12.92;
const SRGB_TRANSITION = 0.04045;
const SRGB_LINEAR_TRANSITION = SRGB_TRANSITION / SRGB_SLOPE;

function srgbToLinear(channel: number): number {
    const sign = channel < 0 ? -1 : 1;
    const abs = channel * sign;
    if (abs <= SRGB_LINEAR_TRANSITION) {
        return channel / SRGB_SLOPE;
    }
    return sign * ((abs + SRGB_OFFSET) / (1 + SRGB_OFFSET)) ** SRGB_GAMMA;
}

function linearToSrgb(channel: number): number {
    const sign = channel < 0 ? -1 : 1;
    const abs = channel * sign;
    if (abs <= SRGB_LINEAR_TRANSITION) {
        return channel * SRGB_SLOPE;
    }
    return sign * ((1 + SRGB_OFFSET) * abs ** (1 / SRGB_GAMMA) - SRGB_OFFSET);
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

// ── Public API ──

// Euclidean deltaE in OKLab — JND ≈ 0.02
export const DELTA_E_OK_JND = 0.02;

export function deltaEOK(
    L1: number, a1: number, b1: number,
    L2: number, a2: number, b2: number,
): number {
    const dL = L1 - L2;
    const da = a1 - a2;
    const db = b1 - b2;
    return Math.sqrt(dL * dL + da * da + db * db);
}

/**
 * Direct OKLab→linear sRGB conversion (no XYZ intermediate).
 * L ∈ [0,1], a,b ∈ [-0.4,0.4] (raw OKLab, NOT normalized).
 */
export function oklabToLinearSRGB(L: number, a: number, b: number): [number, number, number] {
    // OKLab → LMS (cube-root domain)
    const l_ = L + OKLAB_TO_LMS_COEFF.l[1] * a + OKLAB_TO_LMS_COEFF.l[2] * b;
    const m_ = L + OKLAB_TO_LMS_COEFF.m[1] * a + OKLAB_TO_LMS_COEFF.m[2] * b;
    const s_ = L + OKLAB_TO_LMS_COEFF.s[1] * a + OKLAB_TO_LMS_COEFF.s[2] * b;

    // Cube to get linear LMS
    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    // LMS → linear sRGB
    return [
        LMS_TO_LINEAR_SRGB[0] * l + LMS_TO_LINEAR_SRGB[1] * m + LMS_TO_LINEAR_SRGB[2] * s,
        LMS_TO_LINEAR_SRGB[3] * l + LMS_TO_LINEAR_SRGB[4] * m + LMS_TO_LINEAR_SRGB[5] * s,
        LMS_TO_LINEAR_SRGB[6] * l + LMS_TO_LINEAR_SRGB[7] * m + LMS_TO_LINEAR_SRGB[8] * s,
    ];
}

/** Check if linear sRGB values are within the [0,1]³ gamut. */
export function isInSRGBGamut(r: number, g: number, b: number): boolean {
    return r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1;
}

/**
 * Compute the maximum saturation S = C/L for a given hue direction (a_, b_)
 * where a_² + b_² ≈ 1. Uses a polynomial initial guess refined by one
 * Halley's method step for cubic convergence.
 */
export function computeMaxSaturation(a_: number, b_: number): number {
    // Select hue sector coefficients
    const sector = GAMUT_SECTOR_COEFFICIENTS.find(s => s.test(a_, b_))!;
    const { k0, k1, k2, k3, k4, wl, wm, ws } = sector;

    // Initial polynomial approximation
    let S = k0 + k1 * a_ + k2 * b_ + k3 * a_ * a_ + k4 * a_ * b_;

    // Compute derivatives for Halley's method
    const k_l = OKLAB_TO_LMS_COEFF.l[1] * a_ + OKLAB_TO_LMS_COEFF.l[2] * b_;
    const k_m = OKLAB_TO_LMS_COEFF.m[1] * a_ + OKLAB_TO_LMS_COEFF.m[2] * b_;
    const k_s = OKLAB_TO_LMS_COEFF.s[1] * a_ + OKLAB_TO_LMS_COEFF.s[2] * b_;

    {
        const l_ = 1 + S * k_l;
        const m_ = 1 + S * k_m;
        const s_ = 1 + S * k_s;

        const l = l_ * l_ * l_;
        const m = m_ * m_ * m_;
        const s = s_ * s_ * s_;

        const l_dS = 3 * k_l * l_ * l_;
        const m_dS = 3 * k_m * m_ * m_;
        const s_dS = 3 * k_s * s_ * s_;

        const l_dS2 = 6 * k_l * k_l * l_;
        const m_dS2 = 6 * k_m * k_m * m_;
        const s_dS2 = 6 * k_s * k_s * s_;

        const f = wl * l + wm * m + ws * s;
        const f1 = wl * l_dS + wm * m_dS + ws * s_dS;
        const f2 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2;

        // One Halley's method step
        S = S - f * f1 / (f1 * f1 - 0.5 * f * f2);
    }

    return S;
}

/**
 * Find the cusp (L_cusp, C_cusp) — the point of maximum chroma on the
 * gamut boundary for a given hue direction.
 */
export function findCusp(a_: number, b_: number): { L: number; C: number } {
    const S_cusp = computeMaxSaturation(a_, b_);

    // Convert the max-saturation point to linear sRGB to find L_cusp
    const [r, g, b] = oklabToLinearSRGB(1, S_cusp * a_, S_cusp * b_);
    const L_cusp = Math.cbrt(1 / Math.max(r, g, b));
    const C_cusp = L_cusp * S_cusp;

    return { L: L_cusp, C: C_cusp };
}

/**
 * Find the parameter t where the ray from (L0, 0) through (L1, C1)
 * intersects the sRGB gamut boundary. Returns t ∈ [0,1].
 *
 * Lower half uses closed-form; upper half uses one Halley's method step.
 */
export function findGamutIntersection(
    a_: number, b_: number,
    L1: number, C1: number,
    L0: number,
    cusp: { L: number; C: number },
): number {
    let t: number;

    if ((L1 - L0) * cusp.C - (cusp.L - L0) * C1 <= 0) {
        // Lower half — closed form
        t = cusp.C * L0 / (C1 * cusp.L + cusp.C * (L0 - L1));
    } else {
        // Upper half — initial guess + one Halley step
        t = cusp.C * (L0 - 1) / (C1 * (cusp.L - 1) + cusp.C * (L0 - L1));

        const dL = L1 - L0;
        const dC = C1;

        const k_l = OKLAB_TO_LMS_COEFF.l[1] * a_ + OKLAB_TO_LMS_COEFF.l[2] * b_;
        const k_m = OKLAB_TO_LMS_COEFF.m[1] * a_ + OKLAB_TO_LMS_COEFF.m[2] * b_;
        const k_s = OKLAB_TO_LMS_COEFF.s[1] * a_ + OKLAB_TO_LMS_COEFF.s[2] * b_;

        const l_dt = dL + dC * k_l;
        const m_dt = dL + dC * k_m;
        const s_dt = dL + dC * k_s;

        {
            const L = L0 * (1 - t) + t * L1;
            const C = t * C1;

            const l_ = L + C * k_l;
            const m_ = L + C * k_m;
            const s_ = L + C * k_s;

            const l = l_ * l_ * l_;
            const m = m_ * m_ * m_;
            const s = s_ * s_ * s_;

            const ldt = 3 * l_dt * l_ * l_;
            const mdt = 3 * m_dt * m_ * m_;
            const sdt = 3 * s_dt * s_ * s_;

            const ldt2 = 6 * l_dt * l_dt * l_;
            const mdt2 = 6 * m_dt * m_dt * m_;
            const sdt2 = 6 * s_dt * s_dt * s_;

            // Check each sRGB channel, pick the smallest valid correction
            const r = LMS_TO_LINEAR_SRGB[0] * l + LMS_TO_LINEAR_SRGB[1] * m + LMS_TO_LINEAR_SRGB[2] * s - 1;
            const r1 = LMS_TO_LINEAR_SRGB[0] * ldt + LMS_TO_LINEAR_SRGB[1] * mdt + LMS_TO_LINEAR_SRGB[2] * sdt;
            const r2 = LMS_TO_LINEAR_SRGB[0] * ldt2 + LMS_TO_LINEAR_SRGB[1] * mdt2 + LMS_TO_LINEAR_SRGB[2] * sdt2;

            const u_r = r1 / (r1 * r1 - 0.5 * r * r2);
            let t_r = -r * u_r;

            const g = LMS_TO_LINEAR_SRGB[3] * l + LMS_TO_LINEAR_SRGB[4] * m + LMS_TO_LINEAR_SRGB[5] * s - 1;
            const g1 = LMS_TO_LINEAR_SRGB[3] * ldt + LMS_TO_LINEAR_SRGB[4] * mdt + LMS_TO_LINEAR_SRGB[5] * sdt;
            const g2 = LMS_TO_LINEAR_SRGB[3] * ldt2 + LMS_TO_LINEAR_SRGB[4] * mdt2 + LMS_TO_LINEAR_SRGB[5] * sdt2;

            const u_g = g1 / (g1 * g1 - 0.5 * g * g2);
            let t_g = -g * u_g;

            const b_val = LMS_TO_LINEAR_SRGB[6] * l + LMS_TO_LINEAR_SRGB[7] * m + LMS_TO_LINEAR_SRGB[8] * s - 1;
            const b1 = LMS_TO_LINEAR_SRGB[6] * ldt + LMS_TO_LINEAR_SRGB[7] * mdt + LMS_TO_LINEAR_SRGB[8] * sdt;
            const b2 = LMS_TO_LINEAR_SRGB[6] * ldt2 + LMS_TO_LINEAR_SRGB[7] * mdt2 + LMS_TO_LINEAR_SRGB[8] * sdt2;

            const u_b = b1 / (b1 * b1 - 0.5 * b_val * b2);
            let t_b = -b_val * u_b;

            t_r = u_r >= 0 ? t_r : Infinity;
            t_g = u_g >= 0 ? t_g : Infinity;
            t_b = u_b >= 0 ? t_b : Infinity;

            t += Math.min(t_r, t_g, t_b);
        }
    }

    return t;
}

const GAMUT_EPS = 0.00001;
const GAMUT_ALPHA = 0.05;

/**
 * Core gamut mapping in raw OKLab space.
 * Adaptive L0 strategy (alpha=0.05) — preserves hue exactly.
 *
 * Input/output: raw OKLab (L ∈ [0,1], a,b ∈ [-0.4,0.4]).
 * Returns the mapped (L, a, b) tuple.
 */
export function gamutMapOKLab(
    L: number, a: number, b: number,
): [number, number, number] {
    // Check if already in gamut
    const [rLin, gLin, bLin] = oklabToLinearSRGB(L, a, b);
    if (isInSRGBGamut(rLin, gLin, bLin)) {
        return [L, a, b];
    }

    // Compute chroma and hue direction
    const C = Math.max(GAMUT_EPS, Math.sqrt(a * a + b * b));
    const a_ = a / C;
    const b_ = b / C;

    // Find the cusp for this hue
    const cusp = findCusp(a_, b_);

    // Compute adaptive anchor L0
    const Ld = L - 0.5;
    const e1 = 0.5 + Math.abs(Ld) + GAMUT_ALPHA * C;
    const L0 = 0.5 * (1 + Math.sign(Ld) * (e1 - Math.sqrt(e1 * e1 - 2 * Math.abs(Ld))));

    // Find gamut intersection
    const t = findGamutIntersection(a_, b_, L, C, L0, cusp);

    // Map: move along the ray from L0 toward (L, C)
    const L_mapped = L0 * (1 - t) + t * L;
    const C_mapped = t * C;

    return [L_mapped, C_mapped * a_, C_mapped * b_];
}

/**
 * Convert sRGB (possibly out-of-gamut) to raw OKLab.
 * Uses the direct linear sRGB → LMS path.
 */
export function srgbToOKLab(r: number, g: number, b: number): [number, number, number] {
    const rLin = srgbToLinear(r);
    const gLin = srgbToLinear(g);
    const bLin = srgbToLinear(b);

    // linear sRGB → LMS (cube root)
    const l_ = Math.cbrt(LINEAR_SRGB_TO_LMS[0] * rLin + LINEAR_SRGB_TO_LMS[1] * gLin + LINEAR_SRGB_TO_LMS[2] * bLin);
    const m_ = Math.cbrt(LINEAR_SRGB_TO_LMS[3] * rLin + LINEAR_SRGB_TO_LMS[4] * gLin + LINEAR_SRGB_TO_LMS[5] * bLin);
    const s_ = Math.cbrt(LINEAR_SRGB_TO_LMS[6] * rLin + LINEAR_SRGB_TO_LMS[7] * gLin + LINEAR_SRGB_TO_LMS[8] * bLin);

    // LMS → OKLab (using Ottosson's canonical coefficients)
    return [
        0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    ];
}

/**
 * Map an sRGB color (components may be outside [0,1]) to in-gamut sRGB.
 * Returns clamped sRGB [0,1]³.
 */
export function gamutMapSRGB(
    r: number, g: number, b: number,
): [number, number, number] {
    if (r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1) {
        return [r, g, b];
    }

    const [L, a, bOk] = srgbToOKLab(r, g, b);
    const [Lm, am, bm] = gamutMapOKLab(L, a, bOk);
    const [rM, gM, bM] = oklabToLinearSRGB(Lm, am, bm);

    return [
        clamp(linearToSrgb(rM), 0, 1),
        clamp(linearToSrgb(gM), 0, 1),
        clamp(linearToSrgb(bM), 0, 1),
    ];
}
