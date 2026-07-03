/**
 * OKHSL / OKHSV — Björn Ottosson's perceptual HSL/HSV color models (R.W1.6 · R-2).
 * https://bottosson.github.io/posts/colorpicker/
 *
 * These are cylindrical *pickers* built on OKLab: unlike sRGB HSL/HSV they hold
 * perceived hue and lightness stable, curing the documented low-chroma hue drift
 * (the `oklch→HSV` roundtrip losing hue at C≈0 — MEMORY note). They reuse the
 * gamut machinery already in `gamut.ts` — `computeMaxSaturation`/`findCusp`/
 * `findGamutIntersection`/`oklabToLinearSRGB`/`srgbToOKLab` — rather than
 * re-deriving any color science, so the cusp geometry is single-sourced.
 *
 * Pure numeric conversions to/from gamma-encoded sRGB `[r,g,b] ∈ [0,1]³`. Hue is
 * in DEGREES `[0,360)` (matching `rawOklabToOklch`); s, l, v ∈ [0,1].
 */

import {
    computeMaxSaturation,
    findCusp,
    findGamutIntersection,
    oklabToLinearSRGB,
    srgbToOKLab,
} from "./gamut";
import { linearToSrgb } from "./conversions/transfer";

const TAU = 2 * Math.PI;
// Below this OKLab chroma a color is achromatic: the cusp geometry degenerates
// as L→{0,1} (the chroma range collapses to a point), and `srgbToOKLab` leaves a
// ~1e-8 a/b residual on a pure grey. 1e-6 is far below one JND (≈0.02) yet safely
// above that residual, so real colors are never flattened.
const ACHROMATIC_EPS = 1e-6;

// ── the "toe" — L_r perceptual-lightness estimate (Ottosson) ────────────────
const TOE_K1 = 0.206;
const TOE_K2 = 0.03;
const TOE_K3 = (1 + TOE_K1) / (1 + TOE_K2);

/** L → L_r: the toe that maps OKLab L to a perceptually-uniform lightness. */
function toe(x: number): number {
    return (
        0.5 *
        (TOE_K3 * x -
            TOE_K1 +
            Math.sqrt((TOE_K3 * x - TOE_K1) * (TOE_K3 * x - TOE_K1) + 4 * TOE_K2 * TOE_K3 * x))
    );
}

/** L_r → L: the inverse toe. */
function toeInv(x: number): number {
    return (x * x + TOE_K1 * x) / (TOE_K3 * (x + TOE_K2));
}

// ── ST helpers — cusp expressed as saturation (S=C/L) + top-slope (T=C/(1−L)) ─
interface ST {
    S: number;
    T: number;
}

function cuspToST(cuspL: number, cuspC: number): ST {
    return { S: cuspC / cuspL, T: cuspC / (1 - cuspL) };
}

/** Ottosson's polynomial approximation of the mid-point ST for a hue direction. */
function getSTMid(a_: number, b_: number): ST {
    const S =
        0.11516993 +
        1 /
            (7.4477897 +
                4.1590124 * b_ +
                a_ *
                    (-2.19557347 +
                        1.75198401 * b_ +
                        a_ *
                            (-2.13704948 -
                                10.02301043 * b_ +
                                a_ * (-4.24894561 + 5.38770819 * b_ + 4.69891013 * a_))));
    const T =
        0.11239642 +
        1 /
            (1.6132032 -
                0.68124379 * b_ +
                a_ *
                    (0.40370612 +
                        0.90148123 * b_ +
                        a_ *
                            (-0.27087943 +
                                0.6122399 * b_ +
                                a_ * (0.00299215 - 0.45399568 * b_ - 0.14661872 * a_))));
    return { S, T };
}

interface Cs {
    C0: number;
    CMid: number;
    CMax: number;
}

/** The three chroma anchors (C_0, C_mid, C_max) for OKHSL at (L, hue). */
function getCs(L: number, a_: number, b_: number): Cs {
    const cusp = findCusp(a_, b_);
    const CMax = findGamutIntersection(a_, b_, L, 1, L, cusp);
    const { S: SMax, T: TMax } = cuspToST(cusp.L, cusp.C);

    const k = CMax / Math.min(L * SMax, (1 - L) * TMax);

    const mid = getSTMid(a_, b_);
    const CaMid = L * mid.S;
    const CbMid = (1 - L) * mid.T;
    const CMid =
        0.9 *
        k *
        Math.sqrt(
            Math.sqrt(1 / (1 / (CaMid ** 4) + 1 / (CbMid ** 4))),
        );

    const Ca0 = L * 0.4;
    const Cb0 = (1 - L) * 0.8;
    const C0 = Math.sqrt(1 / (1 / (Ca0 * Ca0) + 1 / (Cb0 * Cb0)));

    return { C0, CMid, CMax };
}

const OKHSL_MID = 0.8;
const OKHSL_MID_INV = 1.25;

// ── OKHSL ───────────────────────────────────────────────────────────────────

/** OKHSL `(h°, s, l)` → gamma-encoded sRGB `[r,g,b] ∈ [0,1]³`. */
export function okhslToSrgb(h: number, s: number, l: number): [number, number, number] {
    if (l >= 1) return [1, 1, 1];
    if (l <= 0) return [0, 0, 0];

    const hRad = (h / 360) * TAU;
    const a_ = Math.cos(hRad);
    const b_ = Math.sin(hRad);
    const L = toeInv(l);

    const { C0, CMid, CMax } = getCs(L, a_, b_);

    let C: number;
    if (s < OKHSL_MID) {
        const t = OKHSL_MID_INV * s;
        const k1 = OKHSL_MID * C0;
        const k2 = 1 - k1 / CMid;
        C = (t * k1) / (1 - k2 * t);
    } else {
        const t = (s - OKHSL_MID) / (1 - OKHSL_MID);
        const k0 = CMid;
        const k1 = ((1 - OKHSL_MID) * CMid * CMid * OKHSL_MID_INV * OKHSL_MID_INV) / C0;
        const k2 = 1 - k1 / (CMax - CMid);
        C = k0 + (t * k1) / (1 - k2 * t);
    }

    const [rLin, gLin, bLin] = oklabToLinearSRGB(L, C * a_, C * b_);
    return [linearToSrgb(rLin), linearToSrgb(gLin), linearToSrgb(bLin)];
}

/** Gamma-encoded sRGB `[r,g,b] ∈ [0,1]³` → OKHSL `[h°, s, l]`. */
export function srgbToOkhsl(r: number, g: number, b: number): [number, number, number] {
    const [L, aRaw, bRaw] = srgbToOKLab(r, g, b);
    const C = Math.hypot(aRaw, bRaw);
    const l = toe(L);

    if (C < ACHROMATIC_EPS) {
        // Achromatic: hue is undefined, saturation is zero.
        return [0, 0, l];
    }

    const a_ = aRaw / C;
    const b_ = bRaw / C;
    let h = 0.5 + (0.5 * Math.atan2(-bRaw, -aRaw)) / Math.PI; // turns
    h -= Math.floor(h); // wrap to [0,1)

    const { C0, CMid, CMax } = getCs(L, a_, b_);

    let s: number;
    if (C < CMid) {
        const k1 = OKHSL_MID * C0;
        const k2 = 1 - k1 / CMid;
        const t = C / (k1 + k2 * C);
        s = t * OKHSL_MID;
    } else {
        const k0 = CMid;
        const k1 = ((1 - OKHSL_MID) * CMid * CMid * OKHSL_MID_INV * OKHSL_MID_INV) / C0;
        const k2 = 1 - k1 / (CMax - CMid);
        const t = (C - k0) / (k1 + k2 * (C - k0));
        s = OKHSL_MID + (1 - OKHSL_MID) * t;
    }

    return [h * 360, s, l];
}

// ── OKHSV ───────────────────────────────────────────────────────────────────

const OKHSV_S0 = 0.5;

/** OKHSV `(h°, s, v)` → gamma-encoded sRGB `[r,g,b] ∈ [0,1]³`. */
export function okhsvToSrgb(h: number, s: number, v: number): [number, number, number] {
    if (v <= 0) return [0, 0, 0];

    const hRad = (h / 360) * TAU;
    const a_ = Math.cos(hRad);
    const b_ = Math.sin(hRad);

    const cusp = findCusp(a_, b_);
    const { S: SMax, T: TMax } = cuspToST(cusp.L, cusp.C);
    const k = 1 - OKHSV_S0 / SMax;

    const denom = OKHSV_S0 + TMax - TMax * k * s;
    const Lv = 1 - (s * OKHSV_S0) / denom;
    const Cv = (s * TMax * OKHSV_S0) / denom;

    let L = v * Lv;
    let C = v * Cv;

    const Lvt = toeInv(Lv);
    const Cvt = (Cv * Lvt) / Lv;

    const Lnew = toeInv(L);
    C = L > 0 ? (C * Lnew) / L : 0;
    L = Lnew;

    const [rs, gs, bs] = oklabToLinearSRGB(Lvt, a_ * Cvt, b_ * Cvt);
    const scaleL = Math.cbrt(1 / Math.max(rs, gs, bs, 0));

    L *= scaleL;
    C *= scaleL;

    const [rLin, gLin, bLin] = oklabToLinearSRGB(L, C * a_, C * b_);
    return [linearToSrgb(rLin), linearToSrgb(gLin), linearToSrgb(bLin)];
}

/** Gamma-encoded sRGB `[r,g,b] ∈ [0,1]³` → OKHSV `[h°, s, v]`. */
export function srgbToOkhsv(r: number, g: number, b: number): [number, number, number] {
    const [L, aRaw, bRaw] = srgbToOKLab(r, g, b);
    const C = Math.hypot(aRaw, bRaw);

    if (C < ACHROMATIC_EPS) {
        // Achromatic: hue undefined, saturation zero; value is the toe lightness.
        return [0, 0, toe(L)];
    }

    const a_ = aRaw / C;
    const b_ = bRaw / C;
    let h = 0.5 + (0.5 * Math.atan2(-bRaw, -aRaw)) / Math.PI;
    h -= Math.floor(h);

    const cusp = findCusp(a_, b_);
    const { S: SMax, T: TMax } = cuspToST(cusp.L, cusp.C);
    const k = 1 - OKHSV_S0 / SMax;

    const t = TMax / (C + L * TMax);
    const Lv = t * L;
    const Cv = t * C;

    const Lvt = toeInv(Lv);
    const Cvt = (Cv * Lvt) / Lv;

    const [rs, gs, bs] = oklabToLinearSRGB(Lvt, a_ * Cvt, b_ * Cvt);
    const scaleL = Math.cbrt(1 / Math.max(rs, gs, bs, 0));

    let Ls = L / scaleL;
    let Cs = C / scaleL;
    Cs = (Cs * toe(Ls)) / Ls;
    Ls = toe(Ls);

    const v = Ls / Lv;
    const s = ((OKHSV_S0 + TMax) * Cv) / (TMax * OKHSV_S0 + TMax * k * Cv);

    return [h * 360, s, v];
}
