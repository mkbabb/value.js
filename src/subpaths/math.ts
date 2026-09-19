/**
 * `@mkbabb/value.js/math` — pure numeric math (O.W2). parse-that-FREE.
 *
 * The interpolation + bezier primitives over plain numbers — zero CSS grammar,
 * zero unit machinery.
 *
 * Failure protocol: this subpath carries ONE precondition policy, stated once
 * and enforced in code in `../foundation/math`'s module docstring — a violated
 * size precondition throws a `RangeError` naming the function and the
 * constraint, never an `undefined`, a `NaN` or a short write.
 */
export {
    clamp,
    scale,
    lerp,
    lerpArray,
    logerp,
    deCasteljau,
    cubicBezier,
    interpBezier,
    cubicBezierToString,
} from "../foundation/math";
