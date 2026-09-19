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
 *
 * **Malformed `d` data is rejected, never truncated.** SVG 1.1 §8.3 states the
 * error-handling rule for path data: the path is rendered *"up to, but not
 * including, the path command containing the first error"*. That rule is this
 * module's totality contract — path data that does not begin with a `moveto`,
 * carries an incomplete argument group, or contains an unparsable token yields
 * the geometry of its well-formed prefix, and every public entry still returns
 * the finite `number` / `Point` its signature declares. Nothing here throws on
 * a string.
 */

export type Point = Readonly<{
    x: number;
    y: number;
}>;

/** A point plus the unit tangent direction (radians) of the path at that point. */
export type PathSample = Readonly<{
    x: number;
    y: number;
    /** Tangent angle in radians (atan2 of the path derivative), for `rotate: auto`. */
    angle: number;
}>;

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
// Tokenizer — split a `d` string into positional, fully-formed segments.
// ────────────────────────────────────────────────────────────────────────────

/** The ten path commands, in their canonical (absolute) spelling. */
type Op = "M" | "L" | "H" | "V" | "C" | "S" | "Q" | "T" | "A" | "Z";
/** Every command that takes arguments — i.e. every one but `Z`. */
type DrawOp = Exclude<Op, "Z">;

/**
 * One fully-formed segment: a command and exactly the arguments that command
 * declares, named. A repeated argument run (`L 1 1 2 2`) is one segment per
 * repetition, so the flattener never indexes an argument list and never reads
 * past its end.
 */
type Segment =
    | { readonly op: "M" | "L" | "T"; readonly rel: boolean; readonly x: number; readonly y: number }
    | { readonly op: "H" | "V"; readonly rel: boolean; readonly a: number }
    | {
          readonly op: "C"; readonly rel: boolean;
          readonly x1: number; readonly y1: number;
          readonly x2: number; readonly y2: number;
          readonly x: number; readonly y: number;
      }
    | {
          readonly op: "S"; readonly rel: boolean;
          readonly x2: number; readonly y2: number;
          readonly x: number; readonly y: number;
      }
    | {
          readonly op: "Q"; readonly rel: boolean;
          readonly qx: number; readonly qy: number;
          readonly x: number; readonly y: number;
      }
    | {
          readonly op: "A"; readonly rel: boolean;
          readonly rx: number; readonly ry: number; readonly rot: number;
          readonly largeArc: boolean; readonly sweep: boolean;
          readonly x: number; readonly y: number;
      }
    | { readonly op: "Z" };

const OPS: ReadonlySet<string> = new Set<Op>([
    "M", "L", "H", "V", "C", "S", "Q", "T", "A", "Z",
]);
const isOp = (ch: string): ch is Op => OPS.has(ch);

/** `wsp` / `comma-wsp` between tokens (SVG 1.1 §8.3.1). */
const SEPARATOR_RE = /[\s,]/;
// Number token, matched STICKILY at the cursor: optional sign,
// int/decimal/exponent. A sign is its own separator (`10-20`, `M0 0L10-5`).
const NUMBER_RE = /[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/y;

/**
 * Tokenize a path `d` string into fully-formed segments, positionally.
 *
 * Each command consumes exactly its own arity per repetition, so an arc's two
 * flags are read as single CHARACTERS — SVG 1.1 §8.3.9 `flag ::= "0" | "1"` —
 * and the compact spelling `A5 5 0 0120 10` that SVGO / Figma / Illustrator
 * emit tokenizes identically to the whitespace-delimited `A 5 5 0 0 1 20 10`.
 *
 * Malformed data is REJECTED, never truncated (SVG 1.1 §8.3): tokenizing stops
 * at the first command that does not begin the data with a `moveto`, cannot
 * complete an argument group, or is preceded by an unparsable token — and the
 * well-formed prefix is returned. A command whose repetition run ends short
 * keeps its complete repetitions and drops the partial one.
 */
function tokenizePath(d: string): Segment[] {
    const segments: Segment[] = [];
    const n = d.length;
    let i = 0;

    const skipSeparators = (): void => {
        while (i < n && SEPARATOR_RE.test(d.charAt(i))) i += 1;
    };

    const readNumber = (): number | null => {
        skipSeparators();
        NUMBER_RE.lastIndex = i;
        const match = NUMBER_RE.exec(d);
        if (match === null) return null;
        i = NUMBER_RE.lastIndex;
        return Number(match[0]);
    };

    const readPoint = (): Point | null => {
        const x = readNumber();
        if (x === null) return null;
        const y = readNumber();
        if (y === null) return null;
        return { x, y };
    };

    /** SVG 1.1 §8.3.9: an arc flag is one character, `"0"` or `"1"`. */
    const readFlag = (): boolean | null => {
        skipSeparators();
        const ch = d.charAt(i);
        if (ch !== "0" && ch !== "1") return null;
        i += 1;
        return ch === "1";
    };

    const atNumber = (): boolean => {
        skipSeparators();
        NUMBER_RE.lastIndex = i;
        return NUMBER_RE.exec(d) !== null;
    };

    /**
     * One repetition of `op`'s argument group, or `null` when the group is
     * incomplete. `repetition > 0` on a `moveto` is an implicit `lineto`
     * (SVG 1.1 §8.3.2).
     */
    const readSegment = (op: DrawOp, rel: boolean, repetition: number): Segment | null => {
        switch (op) {
            case "M":
            case "L":
            case "T": {
                const p = readPoint();
                if (p === null) return null;
                const kind = op === "M" && repetition > 0 ? "L" : op;
                return { op: kind, rel, x: p.x, y: p.y };
            }
            case "H":
            case "V": {
                const a = readNumber();
                if (a === null) return null;
                return { op, rel, a };
            }
            case "C": {
                const c1 = readPoint();
                const c2 = readPoint();
                const p = readPoint();
                if (c1 === null || c2 === null || p === null) return null;
                return { op, rel, x1: c1.x, y1: c1.y, x2: c2.x, y2: c2.y, x: p.x, y: p.y };
            }
            case "S": {
                const c2 = readPoint();
                const p = readPoint();
                if (c2 === null || p === null) return null;
                return { op, rel, x2: c2.x, y2: c2.y, x: p.x, y: p.y };
            }
            case "Q": {
                const q = readPoint();
                const p = readPoint();
                if (q === null || p === null) return null;
                return { op, rel, qx: q.x, qy: q.y, x: p.x, y: p.y };
            }
            case "A": {
                const rx = readNumber();
                const ry = readNumber();
                const rot = readNumber();
                const largeArc = readFlag();
                const sweep = readFlag();
                const p = readPoint();
                if (
                    rx === null || ry === null || rot === null ||
                    largeArc === null || sweep === null || p === null
                ) {
                    return null;
                }
                return { op, rel, rx, ry, rot, largeArc, sweep, x: p.x, y: p.y };
            }
        }
    };

    while (i < n) {
        skipSeparators();
        if (i >= n) break;

        const code = d.charAt(i);
        const op = code.toUpperCase();
        // A stray token is the first error: stop, keep the well-formed prefix.
        if (!isOp(op)) return segments;
        // SVG 1.1 §8.3.2: path data must begin with a moveto.
        if (segments.length === 0 && op !== "M") return segments;
        i += 1;

        if (op === "Z") {
            segments.push({ op });
            continue;
        }

        const rel = code !== op;
        for (let repetition = 0; ; repetition += 1) {
            const segment = readSegment(op, rel, repetition);
            // An incomplete group is the first error: drop it and everything
            // after it, keeping the repetitions that were whole.
            if (segment === null) return segments;
            segments.push(segment);
            if (!atNumber()) break;
        }
    }

    return segments;
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
    const prev = poly[poly.length - 1];
    // The first vertex of a polyline has no predecessor: its cumulative
    // arc-length is 0.
    const len = prev === undefined ? 0 : prev.len + lineDistance(prev.x, prev.y, x, y);
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
    const segments = tokenizePath(d);
    const poly: PolyVertex[] = [];

    // Current point, subpath start, and the previous control point (for S/T
    // smooth-shortcut reflection). `prevCubicCtrl`/`prevQuadCtrl` hold the last
    // cubic/quadratic control point, or null when the previous command was not
    // the matching curve type (then the reflection is the current point itself).
    // The tokenizer guarantees the first segment is a moveto, so there is no
    // "not started yet" state to carry.
    let cx = 0, cy = 0;
    let startX = 0, startY = 0;
    let prevCubicCtrl: Point | null = null;
    let prevQuadCtrl: Point | null = null;

    for (const segment of segments) {
        switch (segment.op) {
            case "M": {
                const nx = segment.rel ? cx + segment.x : segment.x;
                const ny = segment.rel ? cy + segment.y : segment.y;
                // A new subpath after a move with no draw — emit the move
                // target as a jump vertex so a following draw starts from it.
                pushVertex(poly, nx, ny);
                cx = startX = nx;
                cy = startY = ny;
                prevCubicCtrl = prevQuadCtrl = null;
                break;
            }
            case "L": {
                const nx = segment.rel ? cx + segment.x : segment.x;
                const ny = segment.rel ? cy + segment.y : segment.y;
                pushVertex(poly, nx, ny);
                cx = nx;
                cy = ny;
                prevCubicCtrl = prevQuadCtrl = null;
                break;
            }
            case "H": {
                const nx = segment.rel ? cx + segment.a : segment.a;
                pushVertex(poly, nx, cy);
                cx = nx;
                prevCubicCtrl = prevQuadCtrl = null;
                break;
            }
            case "V": {
                const ny = segment.rel ? cy + segment.a : segment.a;
                pushVertex(poly, cx, ny);
                cy = ny;
                prevCubicCtrl = prevQuadCtrl = null;
                break;
            }
            case "C": {
                const c1x = segment.rel ? cx + segment.x1 : segment.x1;
                const c1y = segment.rel ? cy + segment.y1 : segment.y1;
                const c2x = segment.rel ? cx + segment.x2 : segment.x2;
                const c2y = segment.rel ? cy + segment.y2 : segment.y2;
                const nx = segment.rel ? cx + segment.x : segment.x;
                const ny = segment.rel ? cy + segment.y : segment.y;
                flattenCubic(poly, cx, cy, c1x, c1y, c2x, c2y, nx, ny, 0);
                prevCubicCtrl = { x: c2x, y: c2y };
                prevQuadCtrl = null;
                cx = nx; cy = ny;
                break;
            }
            case "S": {
                const c2x = segment.rel ? cx + segment.x2 : segment.x2;
                const c2y = segment.rel ? cy + segment.y2 : segment.y2;
                const nx = segment.rel ? cx + segment.x : segment.x;
                const ny = segment.rel ? cy + segment.y : segment.y;
                // Reflect the previous cubic control point about the current
                // point; if the previous command was not a cubic, the control
                // point coincides with the current point.
                const c1x = prevCubicCtrl ? 2 * cx - prevCubicCtrl.x : cx;
                const c1y = prevCubicCtrl ? 2 * cy - prevCubicCtrl.y : cy;
                flattenCubic(poly, cx, cy, c1x, c1y, c2x, c2y, nx, ny, 0);
                prevCubicCtrl = { x: c2x, y: c2y };
                prevQuadCtrl = null;
                cx = nx; cy = ny;
                break;
            }
            case "Q": {
                const qx = segment.rel ? cx + segment.qx : segment.qx;
                const qy = segment.rel ? cy + segment.qy : segment.qy;
                const nx = segment.rel ? cx + segment.x : segment.x;
                const ny = segment.rel ? cy + segment.y : segment.y;
                flattenQuadratic(poly, cx, cy, qx, qy, nx, ny);
                prevQuadCtrl = { x: qx, y: qy };
                prevCubicCtrl = null;
                cx = nx; cy = ny;
                break;
            }
            case "T": {
                const nx = segment.rel ? cx + segment.x : segment.x;
                const ny = segment.rel ? cy + segment.y : segment.y;
                // Annotated: `prevQuadCtrl` is re-assigned from these two, and
                // the inference would otherwise be circular (TS7022).
                const qx: number = prevQuadCtrl ? 2 * cx - prevQuadCtrl.x : cx;
                const qy: number = prevQuadCtrl ? 2 * cy - prevQuadCtrl.y : cy;
                flattenQuadratic(poly, cx, cy, qx, qy, nx, ny);
                prevQuadCtrl = { x: qx, y: qy };
                prevCubicCtrl = null;
                cx = nx; cy = ny;
                break;
            }
            case "A": {
                const nx = segment.rel ? cx + segment.x : segment.x;
                const ny = segment.rel ? cy + segment.y : segment.y;
                flattenArc(
                    poly, cx, cy,
                    segment.rx, segment.ry, segment.rot,
                    segment.largeArc, segment.sweep,
                    nx, ny,
                );
                prevCubicCtrl = prevQuadCtrl = null;
                cx = nx; cy = ny;
                break;
            }
            case "Z": {
                pushVertex(poly, startX, startY);
                cx = startX;
                cy = startY;
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
        // An empty or unrenderable `d` flattens to no vertices — length 0.
        this.totalLength = this.poly[this.poly.length - 1]?.len ?? 0;
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
        const first = poly[0];
        if (first === undefined) return { x: 0, y: 0, angle: 0 };
        if (poly.length === 1) return { x: first.x, y: first.y, angle: 0 };

        // Every index below is kept inside `[0, poly.length)` by the search, so
        // the first vertex is only ever the identity of an unreachable read.
        const at = (k: number): PolyVertex => poly[k] ?? first;

        const total = this.totalLength;
        const target = Math.min(Math.max(length, 0), total);

        // Binary search for the segment [i-1, i] containing the target length.
        let lo = 0;
        let hi = poly.length - 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (at(mid).len < target) lo = mid + 1;
            else hi = mid;
        }
        // `lo` is the first vertex whose cumulative length ≥ target.
        const i = Math.max(1, lo);
        const a = at(i - 1);
        const b = at(i);
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
