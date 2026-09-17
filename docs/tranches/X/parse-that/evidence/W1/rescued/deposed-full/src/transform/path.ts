/**
 * Pure value-domain SVG path geometry (VJ-F1, tranche-N W7).
 *
 * Parses an SVG `<path>` `d` string into absolute drawing segments, computes
 * cumulative arc-length, and samples a point (plus a tangent angle for
 * orient-along-path) at a given length or normalized `t`. This is the
 * `getTotalLength`/`getPointAtLength`/`getPointAtPathLength` of
 * `SVGGeometryElement` **without a DOM** — so a consumer (keyframes.js
 * MotionPath / MorphSVG / DrawSVG) can drive motion along a path with no
 * `<path>` element.
 *
 * Supports every path command — `M/L/H/V/C/S/Q/T/A/Z` and their relative
 * lowercase forms — including the smooth shortcuts (`S`/`T`, whose implied
 * control point reflects the previous one), elliptical arcs (`A`, with the
 * large-arc / sweep flags and the out-of-range radius correction per SVG 1.1
 * §F.6), multiple subpaths (multiple `M`), and closed subpaths (`Z`).
 *
 * Bézier arc-length uses adaptive recursive subdivision against a flatness
 * tolerance; the cumulative table is built once at parse time so repeated
 * `getPointAtLength` calls are a binary search + a local interpolation.
 */

export interface Point {
    x: number;
    y: number;
}

/** A point plus the unit tangent direction (radians) of the path at that point. */
export interface PathSample extends Point {
    /** Tangent angle in radians (atan2 of the path derivative), for `rotate: auto`. */
    angle: number;
}

// A flattened path is a polyline: an ordered list of vertices with the
// cumulative arc-length at each. Curves are subdivided into line segments fine
// enough that the polyline length is within tolerance of the true arc-length.
interface PolyVertex {
    x: number;
    y: number;
    /** Cumulative arc-length from the path start to this vertex. */
    len: number;
}

/** Flatness tolerance for adaptive subdivision (px). Sub-pixel = visually exact. */
const FLATNESS = 0.1;
/** Recursion depth cap for subdivision (guards against degenerate curves). */
const MAX_SUBDIV_DEPTH = 24;

// ────────────────────────────────────────────────────────────────────────────
// Tokenizer — split a `d` string into (command, number[]) command groups.
// ────────────────────────────────────────────────────────────────────────────

/** A single parsed path command: its letter + its flat argument list. */
interface RawCommand {
    code: string;
    args: number[];
}

const COMMAND_RE = /[MmLlHhVvCcSsQqTtAaZz]/;
// Number token: optional sign, int/decimal/exponent. The leading sign may be
// glued to a prior number (`10-20`), so we tokenize greedily on this pattern.
const NUMBER_RE = /-?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g;

/**
 * Tokenize a path `d` string into raw command groups. Numbers may be separated
 * by whitespace, commas, or merely a sign change (`M0 0L10-5`); the number
 * regex handles the implicit separators.
 */
function tokenizePath(d: string): RawCommand[] {
    const commands: RawCommand[] = [];
    let i = 0;
    const n = d.length;

    while (i < n) {
        const ch = d[i]!;
        if (COMMAND_RE.test(ch)) {
            // Collect the argument run up to the next command letter.
            let j = i + 1;
            while (j < n && !COMMAND_RE.test(d[j]!)) j++;
            const argStr = d.slice(i + 1, j);
            const args =
                ch === "Z" || ch === "z"
                    ? []
                    : (argStr.match(NUMBER_RE) ?? []).map(Number);
            commands.push({ code: ch, args });
            i = j;
        } else {
            // Skip leading whitespace / stray separators.
            i++;
        }
    }

    return commands;
}

// ────────────────────────────────────────────────────────────────────────────
// Curve flattening — push subdivided line segments onto the polyline.
// ────────────────────────────────────────────────────────────────────────────

function lineDistance(ax: number, ay: number, bx: number, by: number): number {
    const dx = bx - ax;
    const dy = by - ay;
    return Math.hypot(dx, dy);
}

function pushVertex(poly: PolyVertex[], x: number, y: number): void {
    const prev = poly[poly.length - 1]!;
    const len = prev.len + lineDistance(prev.x, prev.y, x, y);
    poly.push({ x, y, len });
}

// Cubic Bézier point at parameter u.
function cubicAt(
    p0: number,
    p1: number,
    p2: number,
    p3: number,
    u: number,
): number {
    const v = 1 - u;
    return (
        v * v * v * p0 +
        3 * v * v * u * p1 +
        3 * v * u * u * p2 +
        u * u * u * p3
    );
}

/**
 * Adaptively subdivide a cubic Bézier into line segments fine enough that the
 * control polygon's deviation from the chord is below FLATNESS, then append the
 * endpoint vertices. The flatness test is the standard control-point distance
 * from the [start,end] chord.
 */
function flattenCubic(
    poly: PolyVertex[],
    x0: number, y0: number,
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    depth: number,
): void {
    if (depth >= MAX_SUBDIV_DEPTH) {
        pushVertex(poly, x3, y3);
        return;
    }

    // Distance of the two control points from the chord. If both are within
    // FLATNESS the segment is "flat enough" to render as a straight line.
    const dx = x3 - x0;
    const dy = y3 - y0;
    const d1 = Math.abs((x1 - x3) * dy - (y1 - y3) * dx);
    const d2 = Math.abs((x2 - x3) * dy - (y2 - y3) * dx);
    const chordSq = dx * dx + dy * dy;

    if ((d1 + d2) * (d1 + d2) < FLATNESS * FLATNESS * chordSq) {
        pushVertex(poly, x3, y3);
        return;
    }

    // de Casteljau split at u = 0.5.
    const x01 = (x0 + x1) / 2, y01 = (y0 + y1) / 2;
    const x12 = (x1 + x2) / 2, y12 = (y1 + y2) / 2;
    const x23 = (x2 + x3) / 2, y23 = (y2 + y3) / 2;
    const x012 = (x01 + x12) / 2, y012 = (y01 + y12) / 2;
    const x123 = (x12 + x23) / 2, y123 = (y12 + y23) / 2;
    const xm = (x012 + x123) / 2, ym = (y012 + y123) / 2;

    flattenCubic(poly, x0, y0, x01, y01, x012, y012, xm, ym, depth + 1);
    flattenCubic(poly, xm, ym, x123, y123, x23, y23, x3, y3, depth + 1);
}

/** Flatten a quadratic Bézier by elevating it to an equivalent cubic. */
function flattenQuadratic(
    poly: PolyVertex[],
    x0: number, y0: number,
    cx: number, cy: number,
    x1: number, y1: number,
): void {
    // Degree elevation: cubic control points from the quadratic.
    const c1x = x0 + (2 / 3) * (cx - x0);
    const c1y = y0 + (2 / 3) * (cy - y0);
    const c2x = x1 + (2 / 3) * (cx - x1);
    const c2y = y1 + (2 / 3) * (cy - y1);
    flattenCubic(poly, x0, y0, c1x, c1y, c2x, c2y, x1, y1, 0);
}

/**
 * Flatten an elliptical arc (SVG `A` command). Converts the endpoint
 * parameterization (rx, ry, x-axis-rotation, large-arc, sweep, endpoint) to
 * center parameterization (SVG 1.1 §F.6.5), then samples the parametric ellipse
 * into adaptive line segments.
 */
function flattenArc(
    poly: PolyVertex[],
    x0: number, y0: number,
    rx: number, ry: number,
    xAxisRotationDeg: number,
    largeArc: boolean, sweep: boolean,
    x1: number, y1: number,
): void {
    // Degenerate radius → straight line (SVG §F.6.2).
    if (rx === 0 || ry === 0) {
        pushVertex(poly, x1, y1);
        return;
    }

    rx = Math.abs(rx);
    ry = Math.abs(ry);
    const phi = (xAxisRotationDeg * Math.PI) / 180;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);

    // Step 1: compute (x1', y1') — the endpoint in the rotated frame.
    const dx2 = (x0 - x1) / 2;
    const dy2 = (y0 - y1) / 2;
    const x1p = cosPhi * dx2 + sinPhi * dy2;
    const y1p = -sinPhi * dx2 + cosPhi * dy2;

    // Radius correction (SVG §F.6.6): ensure the radii are large enough.
    const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
    if (lambda > 1) {
        const s = Math.sqrt(lambda);
        rx *= s;
        ry *= s;
    }

    // Step 2: compute the center (cx', cy') in the rotated frame.
    const rxSq = rx * rx;
    const rySq = ry * ry;
    const x1pSq = x1p * x1p;
    const y1pSq = y1p * y1p;
    let num = rxSq * rySq - rxSq * y1pSq - rySq * x1pSq;
    if (num < 0) num = 0;
    const den = rxSq * y1pSq + rySq * x1pSq;
    let coef = den === 0 ? 0 : Math.sqrt(num / den);
    if (largeArc === sweep) coef = -coef;
    const cxp = (coef * (rx * y1p)) / ry;
    const cyp = (coef * -(ry * x1p)) / rx;

    // Step 3: transform the center back to the original frame.
    const cx = cosPhi * cxp - sinPhi * cyp + (x0 + x1) / 2;
    const cy = sinPhi * cxp + cosPhi * cyp + (y0 + y1) / 2;

    // Step 4: compute the start angle and the angle sweep.
    const angle = (ux: number, uy: number, vx: number, vy: number): number => {
        const dot = ux * vx + uy * vy;
        const lenU = Math.hypot(ux, uy);
        const lenV = Math.hypot(vx, vy);
        let a = Math.acos(Math.min(1, Math.max(-1, dot / (lenU * lenV))));
        if (ux * vy - uy * vx < 0) a = -a;
        return a;
    };
    const theta1 = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
    let dTheta = angle(
        (x1p - cxp) / rx,
        (y1p - cyp) / ry,
        (-x1p - cxp) / rx,
        (-y1p - cyp) / ry,
    );
    if (!sweep && dTheta > 0) dTheta -= 2 * Math.PI;
    else if (sweep && dTheta < 0) dTheta += 2 * Math.PI;

    // Sample the parametric ellipse. Segment count scales with the angular
    // sweep so a near-full ellipse gets more segments than a small arc.
    const segments = Math.max(
        2,
        Math.ceil((Math.abs(dTheta) / (Math.PI / 2)) * 16),
    );
    for (let i = 1; i <= segments; i++) {
        const theta = theta1 + (dTheta * i) / segments;
        const ex = Math.cos(theta) * rx;
        const ey = Math.sin(theta) * ry;
        const px = cosPhi * ex - sinPhi * ey + cx;
        const py = sinPhi * ex + cosPhi * ey + cy;
        pushVertex(poly, px, py);
    }
}

// ────────────────────────────────────────────────────────────────────────────
// Path → polyline. Walks the absolute drawing state through each command.
// ────────────────────────────────────────────────────────────────────────────

function flattenPath(d: string): PolyVertex[] {
    const commands = tokenizePath(d);
    const poly: PolyVertex[] = [];

    // Current point, subpath start, and the previous control point (for S/T
    // smooth-shortcut reflection). `prevCubicCtrl`/`prevQuadCtrl` hold the last
    // cubic/quadratic control point, or null when the previous command was not
    // the matching curve type (then the reflection is the current point itself).
    let cx = 0, cy = 0;
    let startX = 0, startY = 0;
    let prevCubicCtrl: Point | null = null;
    let prevQuadCtrl: Point | null = null;
    let started = false;

    const begin = (x: number, y: number): void => {
        cx = x;
        cy = y;
        startX = x;
        startY = y;
        if (!started) {
            poly.push({ x, y, len: 0 });
            started = true;
        } else {
            // A new subpath after a move with no draw — emit the move target as
            // a zero-length jump vertex so a following draw starts from it.
            pushVertex(poly, x, y);
        }
    };

    for (const { code, args } of commands) {
        const rel = code === code.toLowerCase() && code !== code.toUpperCase();
        const upper = code.toUpperCase();

        switch (upper) {
            case "M": {
                // First pair is the move; subsequent pairs are implicit L.
                for (let k = 0; k < args.length; k += 2) {
                    let nx = args[k]!;
                    let ny = args[k + 1]!;
                    if (rel) {
                        nx += cx;
                        ny += cy;
                    }
                    if (k === 0) {
                        begin(nx, ny);
                    } else {
                        pushVertex(poly, nx, ny);
                        cx = nx;
                        cy = ny;
                    }
                }
                prevCubicCtrl = prevQuadCtrl = null;
                break;
            }
            case "L": {
                for (let k = 0; k < args.length; k += 2) {
                    let nx = args[k]!;
                    let ny = args[k + 1]!;
                    if (rel) {
                        nx += cx;
                        ny += cy;
                    }
                    pushVertex(poly, nx, ny);
                    cx = nx;
                    cy = ny;
                }
                prevCubicCtrl = prevQuadCtrl = null;
                break;
            }
            case "H": {
                for (const a of args) {
                    const nx = rel ? cx + a : a;
                    pushVertex(poly, nx, cy);
                    cx = nx;
                }
                prevCubicCtrl = prevQuadCtrl = null;
                break;
            }
            case "V": {
                for (const a of args) {
                    const ny = rel ? cy + a : a;
                    pushVertex(poly, cx, ny);
                    cy = ny;
                }
                prevCubicCtrl = prevQuadCtrl = null;
                break;
            }
            case "C": {
                for (let k = 0; k < args.length; k += 6) {
                    let c1x = args[k]!, c1y = args[k + 1]!;
                    let c2x = args[k + 2]!, c2y = args[k + 3]!;
                    let nx = args[k + 4]!, ny = args[k + 5]!;
                    if (rel) {
                        c1x += cx; c1y += cy;
                        c2x += cx; c2y += cy;
                        nx += cx; ny += cy;
                    }
                    flattenCubic(poly, cx, cy, c1x, c1y, c2x, c2y, nx, ny, 0);
                    prevCubicCtrl = { x: c2x, y: c2y };
                    cx = nx; cy = ny;
                }
                prevQuadCtrl = null;
                break;
            }
            case "S": {
                for (let k = 0; k < args.length; k += 4) {
                    let c2x = args[k]!, c2y = args[k + 1]!;
                    let nx = args[k + 2]!, ny = args[k + 3]!;
                    if (rel) {
                        c2x += cx; c2y += cy;
                        nx += cx; ny += cy;
                    }
                    // Reflect the previous cubic control point about the current
                    // point; if the previous command was not a cubic, the
                    // control point coincides with the current point.
                    const c1x = prevCubicCtrl ? 2 * cx - prevCubicCtrl.x : cx;
                    const c1y = prevCubicCtrl ? 2 * cy - prevCubicCtrl.y : cy;
                    flattenCubic(poly, cx, cy, c1x, c1y, c2x, c2y, nx, ny, 0);
                    prevCubicCtrl = { x: c2x, y: c2y };
                    cx = nx; cy = ny;
                }
                prevQuadCtrl = null;
                break;
            }
            case "Q": {
                for (let k = 0; k < args.length; k += 4) {
                    let qx = args[k]!, qy = args[k + 1]!;
                    let nx = args[k + 2]!, ny = args[k + 3]!;
                    if (rel) {
                        qx += cx; qy += cy;
                        nx += cx; ny += cy;
                    }
                    flattenQuadratic(poly, cx, cy, qx, qy, nx, ny);
                    prevQuadCtrl = { x: qx, y: qy };
                    cx = nx; cy = ny;
                }
                prevCubicCtrl = null;
                break;
            }
            case "T": {
                for (let k = 0; k < args.length; k += 2) {
                    let nx = args[k]!, ny = args[k + 1]!;
                    if (rel) {
                        nx += cx; ny += cy;
                    }
                    const qx: number = prevQuadCtrl ? 2 * cx - prevQuadCtrl.x : cx;
                    const qy: number = prevQuadCtrl ? 2 * cy - prevQuadCtrl.y : cy;
                    flattenQuadratic(poly, cx, cy, qx, qy, nx, ny);
                    prevQuadCtrl = { x: qx, y: qy };
                    cx = nx; cy = ny;
                }
                prevCubicCtrl = null;
                break;
            }
            case "A": {
                for (let k = 0; k < args.length; k += 7) {
                    const rx = args[k]!, ry = args[k + 1]!;
                    const rot = args[k + 2]!;
                    const largeArc = args[k + 3]! !== 0;
                    const sweep = args[k + 4]! !== 0;
                    let nx = args[k + 5]!, ny = args[k + 6]!;
                    if (rel) {
                        nx += cx; ny += cy;
                    }
                    flattenArc(poly, cx, cy, rx, ry, rot, largeArc, sweep, nx, ny);
                    cx = nx; cy = ny;
                }
                prevCubicCtrl = prevQuadCtrl = null;
                break;
            }
            case "Z": {
                if (started) {
                    pushVertex(poly, startX, startY);
                    cx = startX;
                    cy = startY;
                }
                prevCubicCtrl = prevQuadCtrl = null;
                break;
            }
        }
    }

    return poly;
}

// ────────────────────────────────────────────────────────────────────────────
// Public API.
// ────────────────────────────────────────────────────────────────────────────

/**
 * A pre-flattened path. Parse a `d` string ONCE into this, then call its
 * `getTotalLength` / `getPointAtLength` / `sampleAtLength` repeatedly without
 * re-parsing — the cumulative arc-length table is built at construction.
 */
export class PathGeometry {
    private readonly poly: PolyVertex[];
    readonly totalLength: number;

    constructor(d: string) {
        this.poly = flattenPath(d);
        this.totalLength =
            this.poly.length > 0 ? this.poly[this.poly.length - 1]!.len : 0;
    }

    getTotalLength(): number {
        return this.totalLength;
    }

    /**
     * The point at arc-length `length` along the path. `length` is clamped to
     * `[0, totalLength]` (an over-long length returns the endpoint, a negative
     * length the start point) — mirroring `SVGGeometryElement.getPointAtLength`.
     */
    getPointAtLength(length: number): Point {
        const { x, y } = this.sampleAtLength(length);
        return { x, y };
    }

    /** As `getPointAtLength`, but `t` is normalized to `[0, 1]` of total length. */
    getPointAtT(t: number): Point {
        return this.getPointAtLength(t * this.totalLength);
    }

    /**
     * The point AND tangent angle (radians) at arc-length `length`. The angle is
     * the `atan2` of the local path direction — the value `rotate: auto` of a
     * MotionPath consumes for orient-along-path.
     */
    sampleAtLength(length: number): PathSample {
        const poly = this.poly;
        if (poly.length === 0) return { x: 0, y: 0, angle: 0 };
        if (poly.length === 1) {
            const p = poly[0]!;
            return { x: p.x, y: p.y, angle: 0 };
        }

        const total = this.totalLength;
        const target = Math.min(Math.max(length, 0), total);

        // Binary search for the segment [i-1, i] containing the target length.
        let lo = 0;
        let hi = poly.length - 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (poly[mid]!.len < target) lo = mid + 1;
            else hi = mid;
        }
        // `lo` is the first vertex whose cumulative length ≥ target.
        const i = Math.max(1, lo);
        const a = poly[i - 1]!;
        const b = poly[i]!;
        const segLen = b.len - a.len;
        const u = segLen > 0 ? (target - a.len) / segLen : 0;

        return {
            x: a.x + (b.x - a.x) * u,
            y: a.y + (b.y - a.y) * u,
            angle: Math.atan2(b.y - a.y, b.x - a.x),
        };
    }
}

/**
 * The total arc-length of an SVG path `d` string. The DOM-free
 * `SVGGeometryElement.getTotalLength`. Parses on each call — for repeated
 * sampling of one path, construct a `PathGeometry` once and reuse it.
 */
export function getTotalLength(d: string): number {
    return new PathGeometry(d).getTotalLength();
}

/**
 * The point at arc-length `length` along an SVG path `d` string. The DOM-free
 * `SVGGeometryElement.getPointAtLength`. Parses on each call — for repeated
 * sampling, construct a `PathGeometry` once and reuse it.
 */
export function getPointAtLength(d: string, length: number): Point {
    return new PathGeometry(d).getPointAtLength(length);
}
