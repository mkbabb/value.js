/**
 * usePerceivedRamp — the gradient's coalesced ramp projected into perceptual
 * coordinates (S.W5-8 / P1-6): OKLCH (L, C) trajectory points for the
 * perceived-space plate, per-stop beads, the running hue, and the iso-ΔE_OK
 * rung positions for the editing rail.
 *
 * ZERO new demo math (the binding W5-8 prohibition): every number here comes
 * from the library — `sampleCoalescedStops` (the ONE sampling law shared with
 * the coalesced serializer), `color2` (oklab/oklch projections), `deltaEOK`
 * (perceptual arc-length), `oklabToLinearSRGBInto` + `isInSRGBGamut` (the
 * sRGB membership predicate). The demo only reshapes library outputs into
 * paint-ready records.
 */

import { computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import { scale } from "@mkbabb/value.js/math";
import type { Color } from "@mkbabb/value.js/color";
import { COLOR_SPACE_RANGES } from "@mkbabb/value.js/color";
import { color2 } from "@mkbabb/value.js/color";
import {
    deltaEOK,
    isInSRGBGamut,
    oklabToLinearSRGBInto,
} from "@mkbabb/value.js/color";
import type { Vec3 } from "@mkbabb/value.js/color";
import { cssToRawColor, cssToRgb255 } from "@lib/color-utils";
import { sampleCoalescedStops } from "./useGradientCSS";
import type { GradientModelState } from "./useGradientModel";

/** A ramp sample in raw OKLab/OKLCH coordinates. */
export interface RampPoint {
    /** 0–100 along the ramp (the rail's axis). */
    position: number;
    /** raw OKLab/OKLCH lightness [0,1] */
    l: number;
    /** raw OKLCH chroma */
    c: number;
    /** raw OKLab a/b (deltaEOK + gamut-test currency) */
    a: number;
    b: number;
    /** OKLCH hue in degrees [0,360) — NaN when achromatic. */
    h: number;
    /** sRGB membership (the gamut-truth flag — drives the second net). */
    inSRGB: boolean;
}

/** A stop bead on the plate: a RampPoint plus identity + a canvas fill. */
export interface StopPoint extends RampPoint {
    id: string;
    /** Canvas-safe fill (8-bit sRGB — beads render like CSS-painted wells). */
    fill: string;
}

/**
 * One rung per ΔE_OK quantum ≈ 1.25 JND (`deltaEOK` JND ≈ 0.02 per the
 * library docs) — dense enough that bunching reads, sparse enough that a
 * calm ramp shows open rungs.
 */
const RUNG_DELTA_E = 0.025;
/** Rung ceiling — a violent full-sweep ramp widens its quantum instead. */
const MAX_RUNGS = 80;

const OKLAB_RANGES = COLOR_SPACE_RANGES.oklab;
const OKLCH_RANGES = COLOR_SPACE_RANGES.oklch;

const _lin: Vec3 = [0, 0, 0];

/** Project one raw model-space color into a RampPoint (library-only). */
function toRampPoint(color: Color<number>, position: number): RampPoint {
    const lab = color2(color, "oklab");
    const lch = color2(color, "oklch");

    const l = scale(
        lab.l as number,
        0,
        1,
        OKLAB_RANGES.l.number.min,
        OKLAB_RANGES.l.number.max,
    );
    const a = scale(
        lab.a as number,
        0,
        1,
        OKLAB_RANGES.a.number.min,
        OKLAB_RANGES.a.number.max,
    );
    const b = scale(
        lab.b as number,
        0,
        1,
        OKLAB_RANGES.b.number.min,
        OKLAB_RANGES.b.number.max,
    );
    const c = scale(
        lch.c as number,
        0,
        1,
        OKLCH_RANGES.c.number.min,
        OKLCH_RANGES.c.number.max,
    );
    const h = scale(
        lch.h as number,
        0,
        1,
        OKLCH_RANGES.h.number.min,
        OKLCH_RANGES.h.number.max,
    );

    oklabToLinearSRGBInto(l, a, b, _lin);
    const inSRGB = isInSRGBGamut(_lin[0], _lin[1], _lin[2]);

    return { position, l, c, a, b, h, inSRGB };
}

/**
 * The swept hue interval (T.W6-2): the ramp's OWN traversed hue path, encoded
 * as sampler endpoints. `start`/`end` are UNWRAPPED degrees (the library's
 * hue-sweep sampler docs: "direction and any 360° wrap are the caller's to
 * encode in the endpoints, matching the ramp's own hue path"); equal
 * endpoints when pinned to a selected stop (the degenerate single-hue slice)
 * or when the ramp is single-hue/achromatic.
 */
export interface SweptHues {
    start: number;
    end: number;
    /** true ⇒ a selected stop pins the plate to that stop's hue slice. */
    pinned: boolean;
}

export interface UsePerceivedRampReturn {
    /** The coalesced ramp as perceptual trajectory points. */
    points: ComputedRef<RampPoint[]>;
    /** The stops as plate beads. */
    stopPoints: ComputedRef<StopPoint[]>;
    /** The plate's slice hue: the selected stop's, else the ramp median. */
    runningHue: ComputedRef<number>;
    /** The hue interval the envelope plate sweeps (T.W6-2). */
    sweptHues: ComputedRef<SweptHues>;
    /** iso-ΔE_OK rung positions (0–100) for the editing rail. */
    rungs: ComputedRef<number[]>;
}

export function usePerceivedRamp(
    modelState: ComputedRef<GradientModelState>,
    selectedStopId: Ref<string | null>,
): UsePerceivedRampReturn {
    const points = computed<RampPoint[]>(() =>
        sampleCoalescedStops(modelState.value).map((s) =>
            toRampPoint(s.color, s.position),
        ),
    );

    const stopPoints = computed<StopPoint[]>(() => {
        const { stops, interpolationSpace } = modelState.value;
        const out: StopPoint[] = [];
        for (const stop of stops) {
            const raw = cssToRawColor(stop.cssColor, interpolationSpace);
            if (!raw) continue;
            const [r, g, b] = cssToRgb255(stop.cssColor);
            out.push({
                ...toRampPoint(raw, stop.position),
                id: stop.id,
                fill: `rgb(${r} ${g} ${b})`,
            });
        }
        return out;
    });

    // The slice hue: an instrument states its conditions — the plate renders
    // ONE hue's L×C slice. Selected stop wins (editing that stop, you see its
    // slice); otherwise the ramp's median chromatic sample. Always finite:
    // an all-achromatic ramp falls back to 0° (the trajectory then rides the
    // C=0 axis — truthfully chroma-free on any slice).
    const runningHue = computed<number>(() => {
        const sel = stopPoints.value.find((s) => s.id === selectedStopId.value);
        if (sel && Number.isFinite(sel.h) && sel.c > 1e-4) return sel.h;

        const pts = points.value;
        const chromatic = pts.filter((p) => Number.isFinite(p.h) && p.c > 1e-4);
        if (chromatic.length > 0) {
            return chromatic[Math.floor(chromatic.length / 2)]!.h;
        }
        return 0;
    });

    // The swept hue interval (T.W6-2): the envelope plate's hue window IS the
    // ramp's own traversed hue path — the sample points already carry the
    // library-interpolated hues (mixColors + hueMethod applied), so unwrapping
    // their sequence (nearest-angle continuation) recovers the true path,
    // including longer-arc and through-wrap trajectories, as the sampler's
    // linear [start, end] endpoints. A selected stop PINS the plate to that
    // stop's single-hue slice (the current behavior as the stated special
    // case). Reshaping library outputs only — no gamut geometry re-derived.
    const sweptHues = computed<SweptHues>(() => {
        const sel = stopPoints.value.find((s) => s.id === selectedStopId.value);
        if (sel && Number.isFinite(sel.h) && sel.c > 1e-4) {
            return { start: sel.h, end: sel.h, pinned: true };
        }

        let prev = NaN;
        let min = NaN;
        let max = NaN;
        for (const p of points.value) {
            if (!Number.isFinite(p.h) || p.c <= 1e-4) continue;
            let h = p.h;
            if (Number.isFinite(prev)) {
                while (h - prev > 180) h -= 360;
                while (h - prev < -180) h += 360;
            }
            prev = h;
            if (!Number.isFinite(min) || h < min) min = h;
            if (!Number.isFinite(max) || h > max) max = h;
        }
        if (!Number.isFinite(min)) {
            // All-achromatic ramp: the grey axis (runningHue's 0° fallback).
            return { start: 0, end: 0, pinned: false };
        }
        return { start: min, end: max, pinned: false };
    });

    // iso-ΔE_OK rungs: walk the ramp's cumulative perceptual arc-length and
    // drop a rung every RUNG_DELTA_E. Bunched rungs = fast perceptual change;
    // open rungs = a flat zone; a steps() interval reads as rung-free bands
    // with hard clusters at the risers (P1-6's "perceptual pacing" net).
    const rungs = computed<number[]>(() => {
        const pts = points.value;
        if (pts.length < 2) return [];

        let total = 0;
        const segs: { d: number; p0: number; p1: number }[] = [];
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i]!;
            const p1 = pts[i + 1]!;
            const d = deltaEOK(p0.l, p0.a, p0.b, p1.l, p1.a, p1.b);
            if (!Number.isFinite(d)) continue;
            segs.push({ d, p0: p0.position, p1: p1.position });
            total += d;
        }
        if (total < RUNG_DELTA_E) return [];

        const step = Math.max(RUNG_DELTA_E, total / MAX_RUNGS);
        const out: number[] = [];
        let cum = 0;
        let nextRung = step;
        for (const seg of segs) {
            while (nextRung <= cum + seg.d && seg.d > 0) {
                const t = (nextRung - cum) / seg.d;
                out.push(seg.p0 + t * (seg.p1 - seg.p0));
                nextRung += step;
            }
            cum += seg.d;
        }
        return out;
    });

    return { points, stopPoints, runningHue, sweptHues, rungs };
}
