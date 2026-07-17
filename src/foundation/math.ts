// Constrains a value between a lower and upper bound
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

// Linear mapping of a value from one range to another
export function scale(
    value: number,
    fromMin: number,
    fromMax: number,
    toMin: number = 0,
    toMax: number = 1,
) {
    // Calculate slope of the linear function
    const slope = (toMax - toMin) / (fromMax - fromMin);

    // Check for division by zero
    if (fromMax === fromMin) {
        throw new Error("fromMax and fromMin cannot be equal");
    }

    // Apply linear transformation
    return (value - fromMin) * slope + toMin;
}

// Linear interpolation between two values.
// Canonical (a, b, t) — value-pair first, parameter last.
export function lerp(start: number, end: number, t: number) {
    // t is the interpolation factor [0, 1]
    return (1 - t) * start + t * end;
}

/**
 * SoA (struct-of-arrays) bulk lerp (Wave D2). Interpolates `K` numeric channels
 * in one flat loop over contiguous `Float64Array`s, writing into a caller-owned
 * `out` buffer — eliminating the AoS pointer-chase and the per-channel closure
 * dispatch of K independent `{value}` carriers.
 *
 * **This is a *consumer-facing* SoA carrier, not an internal interpolation
 * primitive.** value.js's own multi-channel paths cannot adopt it: the color
 * path (`lerpColorValue`) has a per-channel hue special-case + heterogeneous
 * destination writes, and `interpolateDecomposed` is a one-shot. The substrate
 * that *does* consume it is **keyframes.js** — its `FrameCompiler` packs every
 * plain-numeric channel of a compiled segment into parallel `Float64Array`s and
 * drives one `lerpArray` call per playhead sample (the J.W6 S2 ADOPT; the
 * consume-edge contract is locked by `keyframes.js/test/lerparray-adopt.test.ts`
 * — API + `(1-t)·from + t·to` semantics + a K=8 cube-transform equivalence
 * witness). So `lerpArray` is NOT an orphan: it generalized to the downstream
 * animation engine it was built for, not to value.js's own interp loops. The
 * N.W7.B perf-truth lane's verdict is therefore KEEP-and-document (E1.N1).
 *
 * It is pixel-identical to K independent `lerp()` calls. MEASURE-FIRST (the
 * charter's land bar): SLOWER at K=1, BITES from K≥2 — measured on this machine
 * (bench/numeric-soa.mjs) at 1.56× (K=2) → 4.25× (K=64), so callers use it only
 * for multi-channel (K≥2) frames. D1 monomorphization is NOT shipped (a measured
 * non-win, r-interpolation-carrier).
 *
 * `start`, `stop`, `out` must share the same length; only `out` is written.
 */
export function lerpArray(
    start: Float64Array,
    stop: Float64Array,
    t: number,
    out: Float64Array,
): Float64Array {
    const n = start.length;
    const u = 1 - t;
    for (let i = 0; i < n; i++) {
        out[i] = u * start[i]! + t * stop[i]!;
    }
    return out;
}

// Logarithmic (geometric) interpolation between two values.
// Canonical (a, b, t) — value-pair first, parameter last, mirroring `lerp`.
// The pre-3.0.0 order was `logerp(t, start, end)`; the t-first form was a
// public-surface footgun against its t-last `lerp` sibling (S.W1 / Q2 reorder).
export function logerp(start: number, end: number, t: number) {
    // Prevent division by zero or log(0)
    start = start === 0 ? 1e-9 : start;
    // Interpolate in logarithmic space
    return start * Math.pow(end / start, t);
}

// De Casteljau's algorithm for Bézier curve evaluation
export function deCasteljau(t: number, points: readonly number[]) {
    const n = points.length - 1;
    const b = [...points];
    // Iteratively interpolate points
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= n - i; j++) {
            b[j] = lerp(b[j]!, b[j + 1]!, t);
        }
    }
    return b[0]!;
}

// Cubic Bézier curve evaluation
export function cubicBezier(t: number, x1: number, y1: number, x2: number, y2: number) {
    // Evaluate x and y components separately
    return [deCasteljau(t, [0, x1, x2, 1]), deCasteljau(t, [0, y1, y2, 1])] as const;
}

// Generalized Bézier curve interpolation
export function interpBezier(t: number, points: readonly (readonly [x: number, y: number])[]) {
    // Separate x and y coordinates
    const xCoords = points.map((xy) => xy[0]!);
    const yCoords = points.map((xy) => xy[1]!);
    // Interpolate x and y separately
    return [deCasteljau(t, xCoords), deCasteljau(t, yCoords)] as const;
}

export function cubicBezierToString(x1: number, y1: number, x2: number, y2: number) {
    const formatNumber = (n: number) => {
        let s = n.toFixed(2);
        return s;
    };

    return `cubic-bezier(${formatNumber(x1)}, ${formatNumber(y1)}, ${formatNumber(x2)}, ${formatNumber(y2)})`;
}
