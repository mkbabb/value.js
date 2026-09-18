/**
 * `@mkbabb/value.js/transform` — matrix decomposition + path geometry (O.W2).
 *
 * `src/transform/*` is a pure leaf (zero parsing, zero parse-that): matrix
 * decompose/recompose/slerp + the DOM-free path-geometry sampler.
 */
export {
    decomposeMatrix2D,
    decomposeMatrix3D,
    recomposeMatrix2D,
    recomposeMatrix3D,
    slerp,
    interpolateDecomposed,
} from "../transform/decompose";
export type {
    DecomposedMatrix2D,
    DecomposedMatrix3D,
    Vec4,
    Mat4,
} from "../transform/decompose";

export { PathGeometry, getTotalLength, getPointAtLength } from "../transform/path";
export type { Point, PathSample } from "../transform/path";
