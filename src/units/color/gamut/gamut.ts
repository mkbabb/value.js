/**
 * Analytical sRGB gamut mapping based on Bjorn Ottosson's ok_color.h
 * https://bottosson.github.io/posts/gamutclipping/
 *
 * Strategy: adaptive L0 (alpha=1.0) — deterministic, zero-iteration,
 * perceptually correct in OKLab with exact hue preservation. The anchor
 * chroma-pull (alpha·C) lets light-saturated out-of-gamut colors keep their
 * vividness instead of washing toward mid-lightness (the U10 cure); it is
 * self-limited (exact at L=0.5) and hue-exact by construction.
 *
 * MIT License — Copyright (c) 2021 Bjorn Ottosson
 */

import { COLOR_SPACE_RANGES } from "../constants";
import {
    LINEAR_SRGB_TO_LMS,
    LMS_TO_LINEAR_SRGB,
    LMS_TO_XYZ_MATRIX,
    OKLAB_TO_LMS_COEFF,
    OKLAB_TO_LMS_MATRIX,
} from "../conversions/matrices";
import { clamp, scale } from "../../../math";
// The sRGB transfer pair is sourced from the `conversions/transfer.ts` leaf
// (S.W1-1 DRY cure). The former inline twin here duplicated the pair with the
// SAME decode-threshold defect; the "circular dep with utils.ts" justification
// for the copy went stale when the G.W1 Lane B decomposition made `transfer.ts`
// a zero-import leaf — importing it introduces no cycle. `clamp` likewise folds
// onto `../../math` (already the home of `scale`, imported above).
import { linearToSrgb, srgbToLinear } from "../conversions/transfer";

// Gamut sector coefficients for Ottosson's analytical max-saturation solver
// (T.W1-src §4b — colocated with `computeMaxSaturation` below, its sole consumer;
// moved verbatim out of color/constants.ts). Each sector has polynomial
// coefficients (k0-k4) and LMS→sRGB channel weights (wl,wm,ws). Public API — the
// barrels re-export it under the same name.
export const GAMUT_SECTOR_COEFFICIENTS = [
    {
        // Red sector: -1.88170328*a - 0.80936493*b > 1
        test: (a: number, b: number) => -1.88170328 * a - 0.80936493 * b > 1,
        k0: +1.19086277, k1: +1.76576728, k2: +0.59662641,
        k3: +0.75515197, k4: +0.56771245,
        wl: +4.0767416621, wm: -3.3077115913, ws: +0.2309699292,
    },
    {
        // Green sector: 1.81444104*a - 1.19445276*b > 1
        test: (a: number, b: number) => 1.81444104 * a - 1.19445276 * b > 1,
        k0: +0.73956515, k1: -0.45954404, k2: +0.08285427,
        k3: +0.12541070, k4: +0.14503204,
        wl: -1.2684380046, wm: +2.6097574011, ws: -0.3413193965,
    },
    {
        // Blue sector (fallback)
        test: () => true,
        k0: +1.35733652, k1: -0.00915799, k2: -1.15130210,
        k3: -0.50559606, k4: +0.00692167,
        wl: -0.0041960863, wm: -0.7034186147, ws: +1.7076147010,
    },
] as const;

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
// R.W1 U10 (Q7 RATIFIED): un-wash light-saturated colors; self-limited at L=0.5,
// hue-exact. Exported (S.W1-10) so the raytrace mapper shares the IDENTICAL
// adaptive-L0 anchor — the two differ ONLY in how they locate the boundary
// crossing along that shared ray, never in the ray itself.
export const GAMUT_ALPHA = 1.0;

/**
 * Core gamut mapping in raw OKLab space.
 * Adaptive L0 strategy (alpha=1.0) — preserves hue exactly.
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

// ── R.W1.5 (boundary-api §5) — the zero-alloc Into companions ──
//
// `srgbToOKLabInto` / `gamutMapOKLabInto` are the out-param twins of
// `srgbToOKLab` / `gamutMapOKLab` — byte-identical arithmetic, no per-call tuple
// or cusp-object allocation, so the gamut-boundary sampler's inner field is
// honestly zero-alloc. They are consumed only by `boundary.ts` and are kept OUT
// of every barrel until a public consumer is named. Single-threaded re-entrancy
// (the module scratches are fully written before any read) — the same argument
// the `color2Into` / `xyz2rgbFamilyInto` scratches rely on.

// Shared linear-sRGB scratch for the in-line `oklabToLinearSRGB` (avoids the
// 3-tuple return). Written then immediately read within one call; the two
// sequential uses inside `gamutMapOKLabInto` (in-gamut probe, then cusp) never
// overlap.
const _oklabLinScratch: [number, number, number] = [0, 0, 0];

/** Out-param `oklabToLinearSRGB` — same 9 multiplies, no tuple allocation.
 *  Package-internal export (S.W1-6): the OKLCh-slice boundary sampler in
 *  `boundary.ts` bisects raw-OKLab chroma through it with zero per-step alloc.
 *  In no barrel — the public color surface stays geometry-only. */
export function oklabToLinearSRGBInto(
    L: number, a: number, b: number,
    out: [number, number, number],
): [number, number, number] {
    const l_ = L + OKLAB_TO_LMS_COEFF.l[1] * a + OKLAB_TO_LMS_COEFF.l[2] * b;
    const m_ = L + OKLAB_TO_LMS_COEFF.m[1] * a + OKLAB_TO_LMS_COEFF.m[2] * b;
    const s_ = L + OKLAB_TO_LMS_COEFF.s[1] * a + OKLAB_TO_LMS_COEFF.s[2] * b;
    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;
    out[0] = LMS_TO_LINEAR_SRGB[0] * l + LMS_TO_LINEAR_SRGB[1] * m + LMS_TO_LINEAR_SRGB[2] * s;
    out[1] = LMS_TO_LINEAR_SRGB[3] * l + LMS_TO_LINEAR_SRGB[4] * m + LMS_TO_LINEAR_SRGB[5] * s;
    out[2] = LMS_TO_LINEAR_SRGB[6] * l + LMS_TO_LINEAR_SRGB[7] * m + LMS_TO_LINEAR_SRGB[8] * s;
    return out;
}

// Module-scoped cusp scratch — replaces `findCusp`'s per-call `{L, C}` alloc.
const _cuspScratch: { L: number; C: number } = { L: 0, C: 0 };

/** Out-param `findCusp` — writes into `_cuspScratch`; identical to `findCusp`. */
function findCuspInto(a_: number, b_: number): { L: number; C: number } {
    const S_cusp = computeMaxSaturation(a_, b_);
    oklabToLinearSRGBInto(1, S_cusp * a_, S_cusp * b_, _oklabLinScratch);
    const L_cusp = Math.cbrt(
        1 / Math.max(_oklabLinScratch[0], _oklabLinScratch[1], _oklabLinScratch[2]),
    );
    _cuspScratch.L = L_cusp;
    _cuspScratch.C = L_cusp * S_cusp;
    return _cuspScratch;
}

/** Out-param twin of {@link srgbToOKLab} — writes (L,a,b) into `out`. */
export function srgbToOKLabInto(
    r: number, g: number, b: number,
    out: [number, number, number],
): [number, number, number] {
    const rLin = srgbToLinear(r);
    const gLin = srgbToLinear(g);
    const bLin = srgbToLinear(b);

    const l_ = Math.cbrt(LINEAR_SRGB_TO_LMS[0] * rLin + LINEAR_SRGB_TO_LMS[1] * gLin + LINEAR_SRGB_TO_LMS[2] * bLin);
    const m_ = Math.cbrt(LINEAR_SRGB_TO_LMS[3] * rLin + LINEAR_SRGB_TO_LMS[4] * gLin + LINEAR_SRGB_TO_LMS[5] * bLin);
    const s_ = Math.cbrt(LINEAR_SRGB_TO_LMS[6] * rLin + LINEAR_SRGB_TO_LMS[7] * gLin + LINEAR_SRGB_TO_LMS[8] * bLin);

    out[0] = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    out[1] = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    out[2] = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
    return out;
}

/**
 * Out-param twin of {@link gamutMapOKLab} — byte-identical math (the in-gamut
 * early-out copies L,a,b through; the OOG path reuses `_cuspScratch` via
 * `findCuspInto`, exactly as `gamutMapOKLab` calls `findCusp`). No allocation.
 */
export function gamutMapOKLabInto(
    L: number, a: number, b: number,
    out: [number, number, number],
): [number, number, number] {
    const lin = oklabToLinearSRGBInto(L, a, b, _oklabLinScratch);
    if (isInSRGBGamut(lin[0], lin[1], lin[2])) {
        out[0] = L; out[1] = a; out[2] = b;
        return out;
    }

    const C = Math.max(GAMUT_EPS, Math.sqrt(a * a + b * b));
    const a_ = a / C;
    const b_ = b / C;

    const cusp = findCuspInto(a_, b_);

    const Ld = L - 0.5;
    const e1 = 0.5 + Math.abs(Ld) + GAMUT_ALPHA * C;
    const L0 = 0.5 * (1 + Math.sign(Ld) * (e1 - Math.sqrt(e1 * e1 - 2 * Math.abs(Ld))));

    const t = findGamutIntersection(a_, b_, L, C, L0, cusp);

    const L_mapped = L0 * (1 - t) + t * L;
    const C_mapped = t * C;

    out[0] = L_mapped;
    out[1] = C_mapped * a_;
    out[2] = C_mapped * b_;
    return out;
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

// ── Raw tuple conversions (promoted from quantize/cluster.ts) ──

/** OKLab (L,a,b) → OKLCH (L,C,H) with H in degrees [0,360). */
export function rawOklabToOklch(L: number, a: number, b: number): [number, number, number] {
    const C = Math.sqrt(a * a + b * b);
    let H = Math.atan2(b, a) * (180 / Math.PI);
    if (H < 0) H += 360;
    return [L, C, H];
}

/** OKLCH (L,C,H) → OKLab (L,a,b). H in degrees. */
export function rawOklchToOklab(L: number, C: number, H: number): [number, number, number] {
    const hRad = (H * Math.PI) / 180;
    return [L, C * Math.cos(hRad), C * Math.sin(hRad)];
}

/** OKLab → clamped sRGB [0,255]. */
export function oklabToRgb255(L: number, a: number, b: number): [number, number, number] {
    const [rLin, gLin, bLin] = oklabToLinearSRGB(L, a, b);
    return [
        Math.round(clamp(linearToSrgb(rLin), 0, 1) * 255),
        Math.round(clamp(linearToSrgb(gLin), 0, 1) * 255),
        Math.round(clamp(linearToSrgb(bLin), 0, 1) * 255),
    ];
}

// ── Zero-alloc OKLCH → XYZ-D65 tuple (VJ-P1 color2Into support) ──
//
// The bit-faithful tuple form of `conversions/oklab.ts` `oklch2xyz`
// (= `oklab2xyz(oklch2oklab(oklch))`) — same arithmetic, no intermediate
// OKLABColor/XYZColor wrapper allocation. It is the OKLCH→hub leg of the
// `color2Into` egress path: the `gamutMapToRgbSpace` bisection probe is always
// OKLCH, so writing its XYZ-hub coordinates into a caller-owned scratch (rather
// than allocating an OKLABColor *and* an XYZColor per bisection step) removes the
// two per-step intermediate allocs the 24-step loop otherwise churns.
//
// FAITHFULNESS (the C3 golden is bit-stable): the operations mirror
// `oklch2oklab` then `oklab2xyz` exactly — including the [0,1]↔physical-range
// `scale` round-trip on a,b — so the result is identical to the wrapper path
// modulo no floating-point reordering. Inputs are NORMALIZED OKLCH (l,c,h ∈
// [0,1], as the dispatch hands them); the output is raw XYZ-D65.
//
// `out` is a caller-owned 3-tuple (never the source) written in place + returned.
export function oklchToXYZTuple(
    l: number,
    c: number,
    h: number,
    out: [number, number, number],
): [number, number, number] {
    // oklch2oklab: denormalize c → [0,0.5]; polar → Cartesian (raw a,b).
    const cDenorm = scale(c, 0, 1, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max);
    const hRad = h * 2 * Math.PI;
    const aRaw = Math.cos(hRad) * cDenorm;
    const bRaw = Math.sin(hRad) * cDenorm;

    // The OKLABColor wrapper would normalize a,b → [0,1] and `oklab2xyz` would
    // immediately denormalize them back to the raw range — a round-trip that is
    // arithmetically the identity but carries a tiny FP signature. Replay it so
    // the XYZ output is bit-identical to the wrapper path (the C3 golden).
    const a = scale(
        scale(aRaw, COLOR_SPACE_RANGES.oklab.a.number.min, COLOR_SPACE_RANGES.oklab.a.number.max),
        0, 1, COLOR_SPACE_RANGES.oklab.a.number.min, COLOR_SPACE_RANGES.oklab.a.number.max,
    );
    const b = scale(
        scale(bRaw, COLOR_SPACE_RANGES.oklab.b.number.min, COLOR_SPACE_RANGES.oklab.b.number.max),
        0, 1, COLOR_SPACE_RANGES.oklab.b.number.min, COLOR_SPACE_RANGES.oklab.b.number.max,
    );

    // oklab2xyz: [l,a,b] → LMS (cube-root domain) → cube → XYZ.
    const lLms = OKLAB_TO_LMS_MATRIX[0] * l + OKLAB_TO_LMS_MATRIX[1] * a + OKLAB_TO_LMS_MATRIX[2] * b;
    const mLms = OKLAB_TO_LMS_MATRIX[3] * l + OKLAB_TO_LMS_MATRIX[4] * a + OKLAB_TO_LMS_MATRIX[5] * b;
    const sLms = OKLAB_TO_LMS_MATRIX[6] * l + OKLAB_TO_LMS_MATRIX[7] * a + OKLAB_TO_LMS_MATRIX[8] * b;

    const lLin = lLms * lLms * lLms;
    const mLin = mLms * mLms * mLms;
    const sLin = sLms * sLms * sLms;

    out[0] = LMS_TO_XYZ_MATRIX[0] * lLin + LMS_TO_XYZ_MATRIX[1] * mLin + LMS_TO_XYZ_MATRIX[2] * sLin;
    out[1] = LMS_TO_XYZ_MATRIX[3] * lLin + LMS_TO_XYZ_MATRIX[4] * mLin + LMS_TO_XYZ_MATRIX[5] * sLin;
    out[2] = LMS_TO_XYZ_MATRIX[6] * lLin + LMS_TO_XYZ_MATRIX[7] * mLin + LMS_TO_XYZ_MATRIX[8] * sLin;
    return out;
}
