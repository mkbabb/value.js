/**
 * Raytrace sRGB gamut mapping (S.W1-10 · R-4, discharged by ratification).
 *
 * A SECOND, independent gamut mapper that sits beside the analytical Ottosson
 * map in `gamut.ts`. Both reduce an out-of-gamut OKLab color toward the SAME
 * anchor — the adaptive `L0` (α = `GAMUT_ALPHA`), hue-exact by construction —
 * so they trace the IDENTICAL fixed-hue ray `(L0, 0) → (L, C)` in the OKLab
 * lightness×chroma plane. They differ in ONE thing: how they locate the sRGB
 * gamut-boundary crossing along that ray.
 *
 *   - `gamut.ts` (analytical): a polynomial cusp guess refined by ONE Halley
 *     step (`findGamutIntersection`). Zero-iteration — the production hot path.
 *   - here (raytrace): the EXACT crossing, found by bracketed root-finding of
 *     the cube-membership boundary along the ray (the boundary along a fixed-hue
 *     ray is a monotone cubic in `t`; we bisect its unit-cube crossing to
 *     ~2⁻⁴⁰). No polynomial, no approximation — the ray is literally traced into
 *     the sRGB cube and stopped at the surface.
 *
 * WHY THE DIVERGENCE IS THE POINT. Because both share the ray, they AGREE to
 * within the analytical's approximation error on the shared domain (a few 1e-4
 * ΔE-OK — see `gamut-raytrace.test.ts`, which pins the measured tolerance). The
 * raytrace is the EXACT reference the analytical approximates; its value is not
 * speed (it is slower) but exactness:
 *
 *   The raytraced color lands STRICTLY on the sRGB surface — its worst linear
 *   channel is 1 (or 0) to ~1e-9, so it is exactly renderable. The analytical
 *   single-Halley-step can leave a small (sub-eps, ≲1e-3) residual just off the
 *   surface, which the production clamp then absorbs — a tiny chroma nudge the
 *   raytrace never makes. So the raytrace is what you VALIDATE the analytical
 *   map against (it is the oracle's oracle), and what you reach for when exact
 *   boundary landing matters more than zero-iteration cost.
 *
 * Imports the analytical primitives (`oklabToLinearSRGB`,
 * `oklabToLinearSRGBInto`, `isInSRGBGamut`, `srgbToOKLab`, `GAMUT_ALPHA`) from
 * `gamut.ts` so the anchor + the membership test are the SAME code — the two
 * mappers can never drift on the ray, only on the crossing. Surfaced on the
 * color subpath as a reference/validation mapper, not a hot path.
 */

import { clamp } from "../../../math";
import {
    GAMUT_ALPHA,
    isInSRGBGamut,
    oklabToLinearSRGB,
    oklabToLinearSRGBInto,
    srgbToOKLab,
} from "./gamut";
import { linearToSrgb } from "../conversions/transfer";

const RAYTRACE_EPS = 1e-5; // matches gamut.ts GAMUT_EPS (min chroma floor).
// 2⁻⁴⁰ ≈ 9e-13 — the crossing is located to full f64 boundary precision, which
// is what makes the raytrace the EXACT reference vs the analytical's 1-step map.
const RAYTRACE_ITERS = 40;

// Single-threaded scratch (the mapper never re-enters itself; fully written
// before read within each membership probe).
const _rtLin: [number, number, number] = [0, 0, 0];

/**
 * The largest `t ∈ [0,1]` along the ray `(L0,0) → (L1,C1)` (fixed hue `a_,b_`)
 * whose OKLab point is still inside the sRGB cube — the EXACT ray/gamut-boundary
 * intersection, by bisection. `t=0` is the anchor grey `(L0,0)` (in gamut);
 * `t=1` is the out-of-gamut target; the sRGB gamut is star-shaped from the grey
 * axis, so membership flips exactly once and the bracket is valid.
 */
function raytraceIntersection(
    a_: number, b_: number,
    L1: number, C1: number,
    L0: number,
): number {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < RAYTRACE_ITERS; i++) {
        const mid = (lo + hi) / 2;
        const Lm = L0 * (1 - mid) + mid * L1;
        const Cm = mid * C1;
        oklabToLinearSRGBInto(Lm, Cm * a_, Cm * b_, _rtLin);
        if (isInSRGBGamut(_rtLin[0], _rtLin[1], _rtLin[2])) lo = mid;
        else hi = mid;
    }
    return lo; // largest in-gamut t — the mapped color is on the surface, inside.
}

/**
 * Raytrace gamut map in raw OKLab space — the exact-boundary twin of
 * {@link gamutMapOKLab}. Input/output raw OKLab (L ∈ [0,1], a,b ∈ [-0.4,0.4]).
 * In-gamut colors pass through unchanged; out-of-gamut colors are reduced along
 * the SAME adaptive-L0 ray the analytical map uses, but stopped at the EXACT
 * sRGB surface. Hue is preserved exactly (the `a_,b_` direction is untouched).
 */
export function gamutMapOKLabRaytrace(
    L: number, a: number, b: number,
): [number, number, number] {
    oklabToLinearSRGBInto(L, a, b, _rtLin);
    if (isInSRGBGamut(_rtLin[0], _rtLin[1], _rtLin[2])) {
        return [L, a, b];
    }

    const C = Math.max(RAYTRACE_EPS, Math.sqrt(a * a + b * b));
    const a_ = a / C;
    const b_ = b / C;

    // Adaptive L0 — byte-identical to gamut.ts's anchor (shared `GAMUT_ALPHA`),
    // so the ray traced here is the ray the analytical map approximates on.
    const Ld = L - 0.5;
    const e1 = 0.5 + Math.abs(Ld) + GAMUT_ALPHA * C;
    const L0 = 0.5 * (1 + Math.sign(Ld) * (e1 - Math.sqrt(e1 * e1 - 2 * Math.abs(Ld))));

    const t = raytraceIntersection(a_, b_, L, C, L0);

    const L_mapped = L0 * (1 - t) + t * L;
    const C_mapped = t * C;
    return [L_mapped, C_mapped * a_, C_mapped * b_];
}

/**
 * Map a possibly out-of-gamut sRGB color to in-gamut sRGB by raytracing the
 * OKLab reduction — the exact-boundary twin of {@link gamutMapSRGB}. Returns
 * clamped sRGB [0,1]³ (the residual clamp is a pure ~1e-9 FP snap, not the
 * ≲1e-3 the analytical map's clamp absorbs — the divergence this module exists
 * to make explicit).
 */
export function gamutMapSRGBRaytrace(
    r: number, g: number, b: number,
): [number, number, number] {
    if (r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1) {
        return [r, g, b];
    }
    const [L, a, bOk] = srgbToOKLab(r, g, b);
    const [Lm, am, bm] = gamutMapOKLabRaytrace(L, a, bOk);
    const [rLin, gLin, bLin] = oklabToLinearSRGB(Lm, am, bm);
    return [
        clamp(linearToSrgb(rLin), 0, 1),
        clamp(linearToSrgb(gLin), 0, 1),
        clamp(linearToSrgb(bLin), 0, 1),
    ];
}
