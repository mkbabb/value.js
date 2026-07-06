/**
 * perceivedSpacePaint — canvas painters for the gradient page's
 * perceived-space plate (S.W5-8 / P1-6): the OKLCH L×C slice at the running
 * hue, the sRGB gamut-truth hatch, the coalesced ramp as an inked trajectory,
 * and the stop beads sitting ON the path.
 *
 * The demo owns PAINT, never math: the slice contour + cusp come from the
 * library's `sampleOKLChSliceBoundary` (S.W1-6 — passed in, never re-derived),
 * per-pixel color from `oklabToLinearSRGBInto`/`linearToSrgb`, membership
 * from the boundary polyline itself. The only local arithmetic is the
 * pixel↔(L,C) axis mapping and the hue's (cos, sin) parameterization — the
 * same unit-vector form `boundary.ts` documents for its own axes.
 *
 * Netting grammar (the ONE idiom, from the spectrum plate): the out-of-sRGB
 * region is hatched in the registered 45° voice (`@lib/gamut-ink` — the one
 * home). Over the plate's PAPER ground a single ink voice suffices (the
 * scheme flips `--foreground` for us); the PAPER voice is reserved for the
 * second net — the trajectory's sRGB-excess segments under a wide
 * interpolation space, drawn as a registered ink-over-paper pair.
 */

import type { OKLChSliceBoundary } from "@src/units/color/boundary";
import { linearToSrgb } from "@src/units/color/conversions/transfer";
import { oklabToLinearSRGBInto } from "@src/units/color/gamut";
import type { Vec3 } from "@src/units/color/matrix";
import { drawHatch } from "@lib/gamut-ink";
import type { ResolvedInks } from "@lib/gamut-ink";
import type { RampPoint, StopPoint } from "./composables/usePerceivedRamp";

/**
 * The C axis paint scale. The sRGB cusp peaks ≈0.322 (blue) and wide-space
 * trajectories stay well under 0.4, so 0.4 keeps the sRGB tongue occupying
 * ~80% of the plate width — an axis choice (paint), not a gamut fact: the
 * model range (`COLOR_SPACE_RANGES.oklch.c` → 0.5) would waste a third of
 * the plate as permanent hatch.
 */
export const PLATE_C_MAX = 0.4;

/** Field raster ceiling (CSS px) — the smooth field upscales cleanly; the
 * boundary STROKE at full resolution keeps the instrument edge crisp. */
const FIELD_MAX_W = 288;
const FIELD_MAX_H = 128;

const _lin: Vec3 = [0, 0, 0];

const toX = (c: number, w: number) => (c / PLATE_C_MAX) * w;
const toY = (l: number, h: number) => (1 - l) * h;

/** Linear-interpolated max in-gamut chroma at lightness L (boundary law). */
function boundaryCAt(boundary: OKLChSliceBoundary, l: number): number {
    const n = boundary.count;
    if (n < 2) return 0;
    const f = Math.min(1, Math.max(0, l)) * (n - 1);
    const i = Math.min(n - 2, Math.floor(f));
    const t = f - i;
    const c0 = boundary.points[2 * i + 1]!;
    const c1 = boundary.points[2 * (i + 1) + 1]!;
    return c0 + t * (c1 - c0);
}

/**
 * Paint the in-gamut slice field into an offscreen raster (low-res; the
 * caller upscales). Out-of-gamut pixels stay transparent — the plate's
 * paper ground shows through and carries the hatch.
 */
export function paintSliceField(
    field: HTMLCanvasElement,
    cssW: number,
    cssH: number,
    hueDeg: number,
    boundary: OKLChSliceBoundary,
): void {
    const w = Math.max(2, Math.min(FIELD_MAX_W, Math.round(cssW / 2)));
    const h = Math.max(2, Math.min(FIELD_MAX_H, Math.round(cssH / 2)));
    field.width = w;
    field.height = h;
    const ctx = field.getContext("2d");
    if (!ctx) return;

    const hRad = (((hueDeg % 360) + 360) % 360) * (Math.PI / 180);
    const a_ = Math.cos(hRad);
    const b_ = Math.sin(hRad);

    const img = ctx.createImageData(w, h);
    const data = img.data;

    for (let y = 0; y < h; y++) {
        const l = 1 - (y + 0.5) / h;
        const cMax = boundaryCAt(boundary, l);
        for (let x = 0; x < w; x++) {
            const c = ((x + 0.5) / w) * PLATE_C_MAX;
            const idx = 4 * (y * w + x);
            if (c > cMax) continue; // transparent — the hatch's ground
            oklabToLinearSRGBInto(l, c * a_, c * b_, _lin);
            data[idx] = Math.round(
                255 * Math.min(1, Math.max(0, linearToSrgb(_lin[0]))),
            );
            data[idx + 1] = Math.round(
                255 * Math.min(1, Math.max(0, linearToSrgb(_lin[1]))),
            );
            data[idx + 2] = Math.round(
                255 * Math.min(1, Math.max(0, linearToSrgb(_lin[2]))),
            );
            data[idx + 3] = 255;
        }
    }
    ctx.putImageData(img, 0, 0);
}

/** The out-of-sRGB region as a Path2D (right of the boundary polyline). */
function outOfGamutPath(
    boundary: OKLChSliceBoundary,
    w: number,
    h: number,
): Path2D {
    const p = new Path2D();
    const n = boundary.count;
    if (n < 2) {
        p.rect(0, 0, w, h);
        return p;
    }
    // Boundary points run L: 0 → 1 (bottom → top of the plate).
    p.moveTo(toX(boundary.points[1]!, w), toY(boundary.points[0]!, h));
    for (let i = 1; i < n; i++) {
        p.lineTo(
            toX(boundary.points[2 * i + 1]!, w),
            toY(boundary.points[2 * i]!, h),
        );
    }
    p.lineTo(w, 0); // top-right
    p.lineTo(w, h); // bottom-right
    p.closePath();
    return p;
}

export interface PlatePaintOptions {
    /** Host CSS size (cached upstream — the draw path never reflows). */
    width: number;
    height: number;
    dpr: number;
    hueDeg: number;
    boundary: OKLChSliceBoundary;
    /** The pre-painted low-res field raster (paintSliceField). */
    field: HTMLCanvasElement;
    inks: ResolvedInks;
    points: RampPoint[];
    stops: StopPoint[];
    selectedId: string | null;
}

/** Composite the whole plate: field → hatch → boundary+cusp → trajectory → beads. */
export function paintPerceivedSpacePlate(
    canvas: HTMLCanvasElement,
    o: PlatePaintOptions,
): void {
    const { width: w, height: h, dpr } = o;
    const pxW = Math.max(1, Math.round(w * dpr));
    const pxH = Math.max(1, Math.round(h * dpr));
    if (canvas.width !== pxW) canvas.width = pxW;
    if (canvas.height !== pxH) canvas.height = pxH;

    const c = canvas.getContext("2d");
    if (!c) return;

    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);

    // 1 — the in-gamut color field (upscaled smooth; edge covered by stroke).
    c.imageSmoothingEnabled = true;
    c.drawImage(o.field, 0, 0, w, h);

    // 2 — gamut-truth hatch over the out-of-sRGB ground (one ink voice over
    //     the plate's own paper; scheme-true because --foreground flips).
    if (o.inks.hatchInk) {
        const region = outOfGamutPath(o.boundary, w, h);
        c.save();
        c.clip(region);
        drawHatch(c, w, h, 0, o.inks.hatchInk);
        c.restore();
    }

    // 3 — the boundary contour + the analytical cusp tick (instrument truth).
    const n = o.boundary.count;
    if (n >= 2) {
        c.strokeStyle = o.inks.edgeInk;
        c.lineWidth = 1.5;
        c.lineJoin = "round";
        c.beginPath();
        c.moveTo(toX(o.boundary.points[1]!, w), toY(o.boundary.points[0]!, h));
        for (let i = 1; i < n; i++) {
            c.lineTo(
                toX(o.boundary.points[2 * i + 1]!, w),
                toY(o.boundary.points[2 * i]!, h),
            );
        }
        c.stroke();

        if (o.boundary.cuspC > 0) {
            const cx = toX(o.boundary.cuspC, w);
            const cy = toY(o.boundary.cuspL, h);
            c.beginPath();
            c.moveTo(cx - 3.5, cy);
            c.lineTo(cx + 3.5, cy);
            c.stroke();
        }
    }

    // 4 — the trajectory: the coalesced ramp inked into the slice. In-gamut
    //     runs are solid ink; sRGB-excess runs (wide interpolation spaces)
    //     carry the SECOND net — a registered paper-under-ink dashed pair.
    const pts = o.points;
    if (pts.length >= 2) {
        c.lineJoin = "round";
        c.lineCap = "round";
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i]!;
            const p1 = pts[i + 1]!;
            const out = !p0.inSRGB || !p1.inSRGB;
            const x0 = toX(p0.c, w);
            const y0 = toY(p0.l, h);
            const x1 = toX(p1.c, w);
            const y1 = toY(p1.l, h);

            if (out && o.inks.edgePaper) {
                c.strokeStyle = o.inks.edgePaper;
                c.lineWidth = 3.5;
                c.setLineDash([]);
                c.beginPath();
                c.moveTo(x0, y0);
                c.lineTo(x1, y1);
                c.stroke();
                c.strokeStyle = o.inks.edgeInk;
                c.lineWidth = 1.5;
                c.setLineDash([3, 3]);
            } else {
                c.strokeStyle = o.inks.edgeInk;
                c.lineWidth = 2;
                c.setLineDash([]);
            }
            c.beginPath();
            c.moveTo(x0, y0);
            c.lineTo(x1, y1);
            c.stroke();
        }
        c.setLineDash([]);
    }

    // 5 — stop beads ON the path (fill = the stop's own color; ring ink by
    //     the bead's own lightness — the spectrum plate's flip law).
    for (const s of o.stops) {
        const x = toX(s.c, w);
        const y = toY(s.l, h);
        const selected = s.id === o.selectedId;
        const r = selected ? 6.5 : 4.5;

        c.beginPath();
        c.arc(x, y, r, 0, Math.PI * 2);
        c.fillStyle = s.fill;
        c.fill();

        c.lineWidth = selected ? 2 : 1.5;
        c.strokeStyle = s.l > 0.5 ? o.inks.edgeInk : o.inks.edgePaper;
        c.stroke();

        if (selected) {
            c.beginPath();
            c.arc(x, y, r + 2.5, 0, Math.PI * 2);
            c.lineWidth = 1;
            c.strokeStyle = s.l > 0.5 ? o.inks.edgePaper : o.inks.edgeInk;
            c.stroke();
        }
    }
}
