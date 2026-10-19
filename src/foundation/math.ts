/**
 * `src/foundation/math` — the numeric primitives published as
 * `@mkbabb/value.js/math`.
 *
 * **Precondition policy — one policy, stated here once, enforced in code.**
 *
 * Every export states its own size preconditions and checks them itself, before
 * it computes anything from the offending argument. A violated precondition
 * throws a `RangeError` naming the function and the constraint it broke. No
 * export absorbs a violation into `undefined`, into `NaN`, or into a short
 * write: a mis-sized buffer is a caller defect, and it is reported at the call
 * that made it rather than as a poisoned frame several layers downstream.
 *
 * Each check is O(1) — a length comparison, never a per-element scan — so the
 * bulk path (`lerpArray`) keeps its hot-loop shape.
 *
 * Handing an export a value its published signature forbids (a `string` where
 * the `.d.ts` declares a `Float64Array`) is NOT this policy's subject: the
 * signature is the contract there.
 */

// Constrains a value between a lower and upper bound
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

// Linear mapping of a value from one range to another.
// Precondition: `fromMin !== fromMax` — an empty input range has no slope.
export function scale(
    value: number,
    fromMin: number,
    fromMax: number,
    toMin: number = 0,
    toMax: number = 1,
) {
    // Guarded ABOVE the division it exists for, so no infinite or NaN slope is
    // ever computed from an empty input range.
    if (fromMax === fromMin) {
        throw new RangeError("scale: fromMax and fromMin cannot be equal");
    }

    // Calculate slope of the linear function
    const slope = (toMax - toMin) / (fromMax - fromMin);

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
 * destination writes. (The matrix family this note once also named retired with
 * `src/transform/decompose.ts` at `4be22189`.) The substrate that *does* consume
 * it is **keyframes.js** — its `FrameCompiler` packs every
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
 * at 1.56× (K=2) → 4.25× (K=64), so callers use it only for multi-channel (K≥2)
 * frames. (Its harness, `bench/numeric-soa.mjs`, retired with the pre-v4 trees
 * at `164343c1`; the figures are the reading of record, not a live command.) D1
 * monomorphization is NOT shipped (a measured non-win, r-interpolation-carrier).
 *
 * Precondition: `start`, `stop` and `out` share one length; only `out` is
 * written, and nothing is written when the precondition does not hold.
 */
export function lerpArray(
    start: Float64Array,
    stop: Float64Array,
    t: number,
    out: Float64Array,
): Float64Array {
    const n = start.length;
    if (stop.length !== n || out.length !== n) {
        throw new RangeError(
            `lerpArray: start, stop and out must share one length; received ${n}, ${stop.length}, ${out.length}`,
        );
    }

    const u = 1 - t;
    for (let i = 0; i < n; i++) {
        // The check above pins all three lengths, so neither read runs off the
        // end. It can still come back empty — a JS caller may hand this a plain
        // array with a hole where a `Float64Array` is declared — so the reads
        // are narrowed rather than asserted away, which is also what keeps this
        // module free of non-null assertions. Measured at 1.00-1.02x the
        // un-narrowed body for K >= 2, the multi-channel band this carrier
        // exists for (evidence/W9/math-lerparray-shapes.txt).
        const from = start[i];
        const to = stop[i];
        if (from === undefined || to === undefined) {
            throw new RangeError(
                `lerpArray: ${from === undefined ? "start" : "stop"} holds no value at index ${i} of ${n}`,
            );
        }
        out[i] = u * from + t * to;
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

// De Casteljau's algorithm for Bézier curve evaluation.
// Precondition: `points` holds at least one control point.
export function deCasteljau(t: number, points: readonly number[]): number {
    if (points.length === 0) {
        throw new RangeError(
            "deCasteljau: points must hold at least one control point; received an empty array",
        );
    }

    const n = points.length - 1;
    const b = [...points];
    // Iteratively interpolate points. The check above pins the polygon's size,
    // so no read below runs off its end — but a read can still come back empty
    // (a hole in the caller's array), so each is narrowed rather than asserted
    // away, and an empty one is reported instead of multiplied into NaN.
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= n - i; j++) {
            const left = b[j];
            const right = b[j + 1];
            if (left === undefined || right === undefined) {
                throw new RangeError(
                    `deCasteljau: points must hold a number at every index; index ${left === undefined ? j : j + 1} of ${b.length} holds none`,
                );
            }
            b[j] = lerp(left, right, t);
        }
    }

    const value = b[0];
    if (value === undefined) {
        throw new RangeError(
            `deCasteljau: points must hold a number at every index; index 0 of ${b.length} holds none`,
        );
    }
    return value;
}

// Cubic Bézier curve evaluation
export function cubicBezier(t: number, x1: number, y1: number, x2: number, y2: number) {
    // Evaluate x and y components separately
    return [deCasteljau(t, [0, x1, x2, 1]), deCasteljau(t, [0, y1, y2, 1])] as const;
}

// Generalized Bézier curve interpolation.
// Precondition: `points` holds at least one control point.
export function interpBezier(t: number, points: readonly (readonly [x: number, y: number])[]) {
    if (points.length === 0) {
        throw new RangeError(
            "interpBezier: points must hold at least one control point; received an empty array",
        );
    }
    // Separate x and y coordinates — each point is a pair by type, so neither
    // read needs an assertion
    const xCoords = points.map((xy) => xy[0]);
    const yCoords = points.map((xy) => xy[1]);
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
