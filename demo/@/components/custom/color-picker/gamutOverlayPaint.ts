/**
 * gamutOverlayPaint — the PAINT half of the gamut-truth overlay
 * (R.W3 Lane B / B2; lifted from `useGamutOverlay` per the god-module cap).
 *
 * Pure canvas painting + the token ink probe. No reactivity, no scheduling —
 * the composable (`composables/useGamutOverlay.ts`) owns the lens, the
 * boundary lifecycle, and WHEN to draw; this module owns HOW a boundary is
 * inked onto a 2D context. All geometry arrives as an engine-owned
 * `GamutBoundary`; all colors arrive as the four `--gamut-*` tokens resolved
 * through a computed-style probe (treatment §COLOR clause 1).
 *
 * Ink discipline (B1/B3): dual ink/paper pairs applied per segment by the
 * SHARED `spectrumLuma` regime (flip at 0.5 — the WatercolorDot's own
 * predicate; one function, never a copied constant). Scheme-aware pairing:
 * the dark-voiced pair contrasts on light field — in the light scheme that
 * is literally the treatment's "ink pair over light field, paper pair over
 * dark"; in the dark scheme the resolved voices swap roles so the contrast
 * law holds. The flip LOCATION is the invariant.
 *
 * The ink probe + hatch painter live at the netting idiom's ONE home,
 * `@lib/gamut-ink` (S.W5-8 lift) — this module re-exports them for its
 * composable (`useGamutOverlay`) and keeps only the spectrum-plate-specific
 * boundary paint.
 */

import type { GamutBoundary } from "@src/units/color/boundary";
import { DPR_CAP, drawHatch, HATCH_STEP } from "@lib/gamut-ink";
import type { ResolvedInks } from "@lib/gamut-ink";
import { spectrumFieldIsLight } from "./spectrumLuma";

export { createInkProbe, DPR_CAP } from "@lib/gamut-ink";
export type { ResolvedInks } from "@lib/gamut-ink";

const HATCH_DRIFT_PERIODS = 2; // hatch phase periods per full hue turn
const CROSSHAIR_R = 4.5; // 9px ink crosshair (B6)

// ── Geometry → canvas paths ──────────────────────────────────────────────────

const toX = (s: number, w: number) => s * w;
const toY = (v: number, h: number) => (1 - v) * h;

/** Bounds-safe polyline read (noUncheckedIndexedAccess). */
const pt = (b: GamutBoundary, i: number): number => b.points[i] ?? 0;

/** The visibly-clipped margin: contour → top-right corner → top edge. */
function oogRegionPath(b: GamutBoundary, w: number, h: number): Path2D {
    const p = new Path2D();
    p.moveTo(toX(pt(b, 0), w), toY(pt(b, 1), h));
    for (let i = 1; i < b.count; i++) {
        p.lineTo(toX(pt(b, 2 * i), w), toY(pt(b, 2 * i + 1), h));
    }
    p.lineTo(w, 0);
    p.closePath();
    return p;
}

/**
 * The luma-flip height at saturation `s`, found by bisecting the SHARED
 * luma model (share the function, never copy the constant — B3).
 */
function flipVAt(s: number): number {
    if (!spectrumFieldIsLight(s, 1)) return 1;
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 16; i++) {
        const mid = (lo + hi) / 2;
        if (spectrumFieldIsLight(s, mid)) hi = mid;
        else lo = mid;
    }
    return (lo + hi) / 2;
}

/** Light-field / dark-field regime regions, split on the shared flip. */
function regimeRegionPath(w: number, h: number, light: boolean): Path2D {
    const p = new Path2D();
    const cols = 32;
    p.moveTo(0, toY(flipVAt(0), h));
    for (let j = 1; j <= cols; j++) {
        const s = j / cols;
        p.lineTo(toX(s, w), toY(flipVAt(s), h));
    }
    if (light) {
        p.lineTo(w, 0);
        p.lineTo(0, 0);
    } else {
        p.lineTo(w, h);
        p.lineTo(0, h);
    }
    p.closePath();
    return p;
}

export interface PaintOptions {
    /** Host CSS size — cached upstream from the ResizeObserver; the draw
     * path must never force a reflow (13 ms vs 1 ms, measured). */
    width: number;
    height: number;
    inks: ResolvedInks;
    /** html.dark — swaps which resolved pair is the dark voice. */
    isDark: boolean;
    /** Plate hue in degrees — drives the hatch drift phase. */
    hueDeg: number;
    /** prefers-reduced-motion: reduce ⇒ hatch phase frozen at 0. */
    reduceMotion: boolean;
}

/**
 * Paint one boundary state onto the overlay canvas: (a) resize/clear,
 * (b) the registered dual-ink hatch over the clipped margin, (c) the JND
 * contour as a device-pixel hairline, (d) the innermost-point crosshair.
 * `count === 0` ⇒ the plate is cleared and nothing is stroked — the caption
 * alone states the fact (the blue-absence beat).
 */
export function paintGamutBoundary(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    boundary: GamutBoundary,
    o: PaintOptions,
): void {
    const { width: w, height: h } = o;
    if (w === 0 || h === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const W = Math.round(w * dpr);
    const H = Math.round(h * dpr);
    if (canvas.width !== W) canvas.width = W;
    if (canvas.height !== H) canvas.height = H;

    const c = ctx;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);

    if (boundary.count === 0) return;

    const { inks, isDark } = o;
    const lightFieldEdge = isDark ? inks.edgePaper : inks.edgeInk;
    const darkFieldEdge = isDark ? inks.edgeInk : inks.edgePaper;
    const lightFieldHatch = isDark ? inks.hatchPaper : inks.hatchInk;
    const darkFieldHatch = isDark ? inks.hatchInk : inks.hatchPaper;

    const oog = oogRegionPath(boundary, w, h);
    const lightRegion = regimeRegionPath(w, h, true);
    const darkRegion = regimeRegionPath(w, h, false);

    // (b) the registered dual hatch — drawn twice, same line geometry,
    // each pass clipped to (clipped margin ∩ luma regime).
    const phase = o.reduceMotion
        ? 0
        : (o.hueDeg / 360) * HATCH_DRIFT_PERIODS * HATCH_STEP;
    for (const [region, ink, edge] of [
        [lightRegion, lightFieldHatch, lightFieldEdge],
        [darkRegion, darkFieldHatch, darkFieldEdge],
    ] as const) {
        c.save();
        c.clip(oog);
        c.clip(region);
        if (ink) {
            drawHatch(c, w, h, phase, ink);
        } else {
            // Degraded probe-parse fallback: hatch in the edge ink, faint.
            c.globalAlpha = 0.35;
            drawHatch(c, w, h, phase, edge);
        }
        c.restore();
    }

    // (c) the JND contour as a device-pixel hairline, dual-ink per segment
    // by the SHARED luma regime at the segment midpoint.
    const lightPath = new Path2D();
    const darkPath = new Path2D();
    for (let i = 1; i < boundary.count; i++) {
        const s0 = pt(boundary, 2 * (i - 1));
        const v0 = pt(boundary, 2 * (i - 1) + 1);
        const s1 = pt(boundary, 2 * i);
        const v1 = pt(boundary, 2 * i + 1);
        const path = spectrumFieldIsLight((s0 + s1) / 2, (v0 + v1) / 2)
            ? lightPath
            : darkPath;
        path.moveTo(toX(s0, w), toY(v0, h));
        path.lineTo(toX(s1, w), toY(v1, h));
    }
    c.lineWidth = 1 / dpr; // a device-pixel hairline
    c.lineCap = "round";
    c.strokeStyle = lightFieldEdge;
    c.stroke(lightPath);
    c.strokeStyle = darkFieldEdge;
    c.stroke(darkPath);

    // (d — B6) the on-plate datum: a 9px ink crosshair at the contour's
    // innermost point (min s+v — consumer-side scan, boundary-api §9).
    let minIdx = 0;
    let minSum = Infinity;
    for (let i = 0; i < boundary.count; i++) {
        const sum = pt(boundary, 2 * i) + pt(boundary, 2 * i + 1);
        if (sum < minSum) {
            minSum = sum;
            minIdx = i;
        }
    }
    const dx = toX(pt(boundary, 2 * minIdx), w);
    const dy = toY(pt(boundary, 2 * minIdx + 1), h);
    const datum = new Path2D();
    datum.moveTo(dx - CROSSHAIR_R, dy);
    datum.lineTo(dx + CROSSHAIR_R, dy);
    datum.moveTo(dx, dy - CROSSHAIR_R);
    datum.lineTo(dx, dy + CROSSHAIR_R);
    c.lineWidth = 1;
    c.strokeStyle = spectrumFieldIsLight(
        pt(boundary, 2 * minIdx),
        pt(boundary, 2 * minIdx + 1),
    )
        ? lightFieldEdge
        : darkFieldEdge;
    // Stroked twice: the datum reads a step firmer than the hairline while
    // staying inside the token's ink (no fifth token).
    c.stroke(datum);
    c.stroke(datum);
}
