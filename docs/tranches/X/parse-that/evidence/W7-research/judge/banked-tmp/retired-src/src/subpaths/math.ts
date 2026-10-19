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
 *
 * Derived from `../foundation/math` (PSL-1): that module's own `export`
 * keywords draw the public/internal line and this file forwards them whole.
 */
export * from "../foundation/math";
