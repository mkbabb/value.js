/**
 * `@mkbabb/value.js/transform` — DOM-free SVG path geometry (O.W2).
 *
 * `src/transform/*` is a pure leaf (zero parsing, zero parse-that): the
 * path-geometry sampler that measures and samples an SVG `d` string with no
 * `SVGGeometryElement` and no DOM.
 *
 * The matrix decompose/recompose/slerp family was retired at X.W9.b (CC-094)
 * against a measured zero-consumer census; no shim and no forwarding export
 * stands in its place.
 */
export { PathGeometry, getTotalLength, getPointAtLength } from "../transform/path";
export type { Point, PathSample } from "../transform/path";
