/**
 * envelopePlatePaint — canvas painters for the gradient page's HUE-SWEPT
 * ENVELOPE plate (T.W6-2 / T-21, superseding the single-hue
 * `perceivedSpacePaint`): the sRGB gamut envelope across the ramp's OWN swept
 * hues, painted as THREE TRUTH REGIMES instead of a binary single-hue mask —
 * a 2-D slice cannot carry a 3-D hue-varying trajectory's gamut truth, and
 * the old fixed-axis slice left the default seed ~⅔ permanent netting with
 * "in-gamut" beads floating in "out-of-gamut" hatch.
 *
 *   solid field   c ≤ cMin(L) — in-gamut at EVERY swept hue (colored at the
 *                 running hue: guaranteed in-gamut there by cMin's own law);
 *   half voice    cMin < c ≤ cMax — the ambiguous belt (in at some swept
 *                 hues, out at others): the register's PAPER ink alone;
 *   full netting  c > cMax(L) — out-of-gamut at EVERY swept hue: the
 *                 register's INK voice.
 *
 * Field and trajectory ink can never contradict BY CONSTRUCTION: every
 * trajectory point's hue lies inside the swept interval, so an in-gamut
 * point (its own hue) can never plot beyond cMax, and an out-of-gamut point
 * can never plot inside the solid field. A single-hue ramp degenerates to
 * the exact slice (cMin ≡ cMax — the belt vanishes, today's plate).
 *
 * The demo owns PAINT, never math: the envelope comes from the library's
 * `sampleOKLChHueSweepBoundary` (T.W1-src — passed in, never re-derived);
 * per-pixel color from `oklabToLinearSRGBInto`/`linearToSrgb`. The only
 * local arithmetic is the pixel↔(L,C) axis mapping and the hue's (cos,sin)
 * parameterization — the same unit-vector form `boundary.ts` documents.
 *
 * The C axis is CUSP-ADAPTIVE (the fixed `PLATE_C_MAX 0.4` died with the
 * slice — an axis sized for the blue cusp renders a green ramp as a sliver):
 * `C_axis = AXIS_HEADROOM · cuspCMax`, quantized with hysteresis so hue
 * drags never flap it, eased by the consumer so it never snaps. The netting
 * margin becomes a designed constant fraction at every hue.
 *
 * Netting grammar: the ONE registered 45° voice (`@lib/gamut-ink` — the one
 * home). The SECOND net (paper-under-dashed-ink) remains the trajectory's
 * sRGB-excess treatment, per its own flag.
 */

import type { OKLChHueSweepBoundary } from "@mkbabb/value.js/color";
import { linearToSrgb, oklabToLinearSRGBInto } from "@mkbabb/value.js/color";
import type { Vec3 } from "@mkbabb/value.js/color";
import { drawHatch, drawSecondNet } from "@lib/gamut-ink";
import type { ResolvedInks } from "@lib/gamut-ink";
import type { RampPoint, StopPoint } from "../../composables/usePerceivedRamp";

// ── The cusp-adaptive axis facility ──

/** Axis headroom over the peak swept cusp — the designed netting margin. */
export const AXIS_HEADROOM = 1.15;
/** Axis quantum (raw OKLab C) — the axis settles on these rungs only. */
export const AXIS_QUANTUM = 0.05;
/** Axis floor — an achromatic/near-achromatic sweep still shows a plate. */
export const AXIS_FLOOR = 0.1;

/** The axis rung for a peak cusp: ceil to the quantum, floored. */
export function quantizedAxis(cuspCMax: number): number {
    const target = AXIS_HEADROOM * cuspCMax;
    return Math.max(
        AXIS_FLOOR,
        Math.ceil(target / AXIS_QUANTUM - 1e-9) * AXIS_QUANTUM,
    );
}

/**
 * Quantized-with-hysteresis axis update. GROWS immediately (the field must
 * never overflow the plate); SHRINKS only once the target clears a margin
 * below the next rung down, so a hue drag hovering at a rung boundary never
 * flaps the axis. The consumer eases the DISPLAYED axis toward this rung.
 */
export function nextAxisQuantum(current: number, cuspCMax: number): number {
    const q = quantizedAxis(cuspCMax);
    if (q > current) return q;
    if (q < current && AXIS_HEADROOM * cuspCMax <= current - AXIS_QUANTUM - 0.01) {
        return q;
    }
    return current;
}

// ── Envelope row access (interleaved [L, cMin, cMax] rows) ──

/** Linear-interpolated envelope chroma at lightness `l` (1 = cMin, 2 = cMax). */
function envelopeCAt(
    envelope: OKLChHueSweepBoundary,
    l: number,
    which: 1 | 2,
): number {
    const n = envelope.count;
    if (n < 2) return 0;
    const f = Math.min(1, Math.max(0, l)) * (n - 1);
    const i = Math.min(n - 2, Math.floor(f));
    const t = f - i;
    const c0 = envelope.points[3 * i + which]!;
    const c1 = envelope.points[3 * (i + 1) + which]!;
    return c0 + t * (c1 - c0);
}

/** Whether the ambiguous belt exists at all (degenerate for single-hue sweeps). */
export function envelopeHasBelt(envelope: OKLChHueSweepBoundary): boolean {
    const n = envelope.count;
    for (let i = 0; i < n; i++) {
        if (envelope.points[3 * i + 2]! - envelope.points[3 * i + 1]! > 1e-4) {
            return true;
        }
    }
    return false;
}

// ── Field raster ──

/** Field raster ceiling (CSS px; rastered at ×dpr device resolution — the
 * owner rider's no-1x-upscaling clause; carried from the slice painter). */
const FIELD_MAX_W = 640;
const FIELD_MAX_H = 256;

const _lin: Vec3 = [0, 0, 0];

const toX = (c: number, w: number, axis: number) => (c / axis) * w;
const toY = (l: number, h: number) => (1 - l) * h;

/**
 * Paint the SOLID-REGIME color field into an offscreen raster at DEVICE
 * resolution: pixels with c ≤ cMin(L) (in-gamut at every swept hue) colored
 * at the running hue — in-gamut there by construction, never clamped. All
 * other pixels stay transparent: the plate's paper ground shows through and
 * carries the belt/netting voices. Rastered at the SETTLED axis rung; the
 * compositor rescales during axis easing.
 */
export function paintEnvelopeField(
    field: HTMLCanvasElement,
    cssW: number,
    cssH: number,
    dpr: number,
    runningHueDeg: number,
    envelope: OKLChHueSweepBoundary,
    axisCMax: number,
): void {
    const w = Math.max(2, Math.round(Math.min(FIELD_MAX_W, cssW) * dpr));
    const h = Math.max(2, Math.round(Math.min(FIELD_MAX_H, cssH) * dpr));
    field.width = w;
    field.height = h;
    const ctx = field.getContext("2d");
    if (!ctx) return;

    const hRad = (((runningHueDeg % 360) + 360) % 360) * (Math.PI / 180);
    const a_ = Math.cos(hRad);
    const b_ = Math.sin(hRad);

    const img = ctx.createImageData(w, h);
    const data = img.data;

    for (let y = 0; y < h; y++) {
        const l = 1 - (y + 0.5) / h;
        const cMin = envelopeCAt(envelope, l, 1);
        for (let x = 0; x < w; x++) {
            const c = ((x + 0.5) / w) * axisCMax;
            const idx = 4 * (y * w + x);
            if (c > cMin) continue; // transparent — the belt/netting ground
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

// ── Regime region paths ──

/** Trace one envelope polyline (bottom → top) onto a path. */
function tracePolyline(
    p: Path2D,
    envelope: OKLChHueSweepBoundary,
    w: number,
    h: number,
    axis: number,
    which: 1 | 2,
    reverse: boolean,
): void {
    const n = envelope.count;
    for (let k = 0; k < n; k++) {
        const i = reverse ? n - 1 - k : k;
        const x = toX(envelope.points[3 * i + which]!, w, axis);
        const y = toY(envelope.points[3 * i]!, h);
        if (k === 0 && !reverse) p.moveTo(x, y);
        else p.lineTo(x, y);
    }
}

/** The ambiguous belt: between the cMin and cMax polylines. */
function beltPath(
    envelope: OKLChHueSweepBoundary,
    w: number,
    h: number,
    axis: number,
): Path2D {
    const p = new Path2D();
    if (envelope.count < 2) return p;
    tracePolyline(p, envelope, w, h, axis, 1, false);
    tracePolyline(p, envelope, w, h, axis, 2, true);
    p.closePath();
    return p;
}

/** The full-netting region: right of the cMax polyline. */
function outerPath(
    envelope: OKLChHueSweepBoundary,
    w: number,
    h: number,
    axis: number,
): Path2D {
    const p = new Path2D();
    if (envelope.count < 2) {
        p.rect(0, 0, w, h);
        return p;
    }
    tracePolyline(p, envelope, w, h, axis, 2, false);
    p.lineTo(w, 0); // top-right
    p.lineTo(w, h); // bottom-right
    p.closePath();
    return p;
}

/** Stroke one envelope contour (cMin solid boundary / cMax hairline). */
function strokeContour(
    c: CanvasRenderingContext2D,
    envelope: OKLChHueSweepBoundary,
    w: number,
    h: number,
    axis: number,
    which: 1 | 2,
): void {
    const n = envelope.count;
    if (n < 2) return;
    c.beginPath();
    c.moveTo(
        toX(envelope.points[which]!, w, axis),
        toY(envelope.points[0]!, h),
    );
    for (let i = 1; i < n; i++) {
        c.lineTo(
            toX(envelope.points[3 * i + which]!, w, axis),
            toY(envelope.points[3 * i]!, h),
        );
    }
    c.stroke();
}

// ── The composite ──

export interface EnvelopePlatePaintOptions {
    /** Host CSS size (cached upstream — the draw path never reflows). */
    width: number;
    height: number;
    dpr: number;
    envelope: OKLChHueSweepBoundary;
    /** The DISPLAYED axis ceiling (eased; settles at the quantum rung). */
    axisCMax: number;
    /** The axis rung the field raster was painted at (the settled quantum). */
    fieldAxisCMax: number;
    /** The pre-painted device-resolution field raster (paintEnvelopeField). */
    field: HTMLCanvasElement;
    inks: ResolvedInks;
    points: RampPoint[];
    stops: StopPoint[];
    selectedId: string | null;
}

/**
 * Composite the whole plate:
 * field → belt half-voice → full netting → contours + cusp → trajectory → beads.
 */
export function paintEnvelopePlate(
    canvas: HTMLCanvasElement,
    o: EnvelopePlatePaintOptions,
): void {
    const { width: w, height: h, dpr, envelope, axisCMax } = o;
    const pxW = Math.max(1, Math.round(w * dpr));
    const pxH = Math.max(1, Math.round(h * dpr));
    if (canvas.width !== pxW) canvas.width = pxW;
    if (canvas.height !== pxH) canvas.height = pxH;

    const c = canvas.getContext("2d");
    if (!c) return;

    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);

    // 1 — the solid-regime color field. The raster spans C ∈ [0, fieldAxis];
    //     during axis easing the destination width rescales so the field's
    //     C-coordinates stay true on the displayed axis (1:1 once settled).
    c.imageSmoothingEnabled = true;
    c.drawImage(o.field, 0, 0, w * (o.fieldAxisCMax / axisCMax), h);

    // 2 — the ambiguous belt: the register's PAPER ink alone (half voice) —
    //     in-gamut at some swept hues, out at others; the instrument says
    //     "depends on hue" instead of lying either way.
    const hasBelt = envelopeHasBelt(envelope);
    if (hasBelt && o.inks.hatchPaper) {
        const belt = beltPath(envelope, w, h, axisCMax);
        c.save();
        c.clip(belt);
        drawHatch(c, w, h, 0, o.inks.hatchPaper);
        c.restore();
    }

    // 3 — full netting beyond cMax: the register's INK voice (out-of-gamut
    //     at EVERY swept hue — the unambiguous regime).
    if (o.inks.hatchInk) {
        const outer = outerPath(envelope, w, h, axisCMax);
        c.save();
        c.clip(outer);
        drawHatch(c, w, h, 0, o.inks.hatchInk);
        c.restore();
    }

    // 4 — contours: the definite in-gamut boundary (cMin) in the edge voice
    //     (degenerates to the slice contour when the belt vanishes); the
    //     cMax rim as a quieter hairline; the peak-cusp tick (instrument
    //     truth — the axis referent made visible).
    c.lineJoin = "round";
    c.strokeStyle = o.inks.edgeInk;
    c.lineWidth = 1.5;
    strokeContour(c, envelope, w, h, axisCMax, 1);
    if (hasBelt) {
        c.strokeStyle = o.inks.hatchInk ?? o.inks.edgeInk;
        c.lineWidth = 1;
        strokeContour(c, envelope, w, h, axisCMax, 2);
    }
    if (envelope.cuspCMax > 0) {
        const cx = toX(envelope.cuspCMax, w, axisCMax);
        const cy = toY(envelope.cuspLAtPeak, h);
        c.strokeStyle = o.inks.edgeInk;
        c.lineWidth = 1.5;
        c.beginPath();
        c.moveTo(cx - 3.5, cy);
        c.lineTo(cx + 3.5, cy);
        c.stroke();
    }

    // 5 — the trajectory: the coalesced ramp inked into the envelope. Each
    //     point carries its OWN true `inSRGB` flag (its own hue): in-gamut
    //     runs are solid ink; sRGB-excess runs carry the SECOND net — the
    //     facility's registered paper-under-ink dashed pair.
    const pts = o.points;
    if (pts.length >= 2) {
        c.lineJoin = "round";
        c.lineCap = "round";
        const inPath = new Path2D();
        const outPath = new Path2D();
        let hasOut = false;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i]!;
            const p1 = pts[i + 1]!;
            const out = !p0.inSRGB || !p1.inSRGB;
            const path = out ? outPath : inPath;
            hasOut ||= out;
            path.moveTo(toX(p0.c, w, axisCMax), toY(p0.l, h));
            path.lineTo(toX(p1.c, w, axisCMax), toY(p1.l, h));
        }
        c.strokeStyle = o.inks.edgeInk;
        c.lineWidth = 2;
        c.setLineDash([]);
        c.stroke(inPath);
        if (hasOut) {
            drawSecondNet(c, outPath, o.inks.edgeInk, o.inks.edgePaper);
        }
    }

    // 6 — stop beads ON the path (fill = the stop's own color; ring ink by
    //     the bead's own lightness — the spectrum plate's flip law).
    for (const s of o.stops) {
        const x = toX(s.c, w, axisCMax);
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
