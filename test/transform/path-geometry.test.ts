import { describe, expect, it } from "vitest";
import {
    PathGeometry,
    getTotalLength,
    getPointAtLength,
} from "@src/transform/path";

describe("path geometry — getTotalLength (VJ-F1)", () => {
    it("measures a horizontal line", () => {
        expect(getTotalLength("M0 0 L100 0")).toBeCloseTo(100);
    });

    it("measures an L-shaped two-segment polyline", () => {
        expect(getTotalLength("M0 0 L100 0 L100 100")).toBeCloseTo(200);
    });

    it("measures a closed square via Z", () => {
        // 4 sides of 50 = 200; Z closes back to the start.
        expect(getTotalLength("M0 0 L50 0 L50 50 L0 50 Z")).toBeCloseTo(200);
    });

    it("measures a quarter circle arc within tolerance", () => {
        // Quarter of a unit-radius-100 circle: arc length = (pi/2)*100 ≈ 157.08.
        const len = getTotalLength("M100 0 A100 100 0 0 1 0 100");
        expect(len).toBeCloseTo(157.08, 0);
    });

    it("handles relative commands", () => {
        // m moves, then two relative lines of 100 each.
        expect(getTotalLength("m0 0 l100 0 l0 100")).toBeCloseTo(200);
    });

    it("returns 0 for an empty / degenerate single-point path", () => {
        expect(getTotalLength("M50 50")).toBe(0);
        expect(getTotalLength("")).toBe(0);
    });
});

describe("path geometry — getPointAtLength (VJ-F1)", () => {
    it("samples the midpoint of a horizontal line", () => {
        const p = getPointAtLength("M0 0 L100 0", 50);
        expect(p.x).toBeCloseTo(50);
        expect(p.y).toBeCloseTo(0);
    });

    it("samples across a segment boundary on an L-shape", () => {
        // Total 200; length 150 = 100 along the bottom + 50 up the right side.
        const p = getPointAtLength("M0 0 L100 0 L100 100", 150);
        expect(p.x).toBeCloseTo(100);
        expect(p.y).toBeCloseTo(50);
    });

    it("clamps length 0 to the start point", () => {
        const p = getPointAtLength("M10 20 L100 20", 0);
        expect(p.x).toBeCloseTo(10);
        expect(p.y).toBeCloseTo(20);
    });

    it("clamps an over-long length to the endpoint", () => {
        const p = getPointAtLength("M0 0 L100 0", 9999);
        expect(p.x).toBeCloseTo(100);
        expect(p.y).toBeCloseTo(0);
    });

    it("clamps a negative length to the start point", () => {
        const p = getPointAtLength("M0 0 L100 0", -50);
        expect(p.x).toBeCloseTo(0);
        expect(p.y).toBeCloseTo(0);
    });

    it("samples a cubic Bezier endpoint exactly", () => {
        // A cubic from (0,0) to (100,0); the endpoint must be reached at total.
        const geo = new PathGeometry("M0 0 C25 50 75 50 100 0");
        const end = geo.getPointAtLength(geo.getTotalLength());
        expect(end.x).toBeCloseTo(100, 1);
        expect(end.y).toBeCloseTo(0, 1);
    });

    it("a cubic's midpoint lies on the curve (symmetric S-curve apex)", () => {
        // Symmetric cubic: the arc-length midpoint is at x=50 by symmetry.
        const geo = new PathGeometry("M0 0 C25 50 75 50 100 0");
        const mid = geo.getPointAtLength(geo.getTotalLength() / 2);
        expect(mid.x).toBeCloseTo(50, 1);
    });
});

describe("path geometry — PathGeometry reuse + smooth shortcuts + tangents", () => {
    it("parses once and samples many times (cached cumulative table)", () => {
        const geo = new PathGeometry("M0 0 L100 0 L100 100");
        expect(geo.getTotalLength()).toBeCloseTo(200);
        expect(geo.getPointAtLength(50).x).toBeCloseTo(50);
        expect(geo.getPointAtLength(150).y).toBeCloseTo(50);
        // getPointAtT mirrors getPointAtLength over normalized [0,1].
        expect(geo.getPointAtT(0.25).x).toBeCloseTo(50);
        expect(geo.getPointAtT(1).y).toBeCloseTo(100);
    });

    it("resolves the smooth cubic shortcut S (reflected control point)", () => {
        // C then S: the S reflects the previous control point. Endpoint reached.
        const geo = new PathGeometry("M0 0 C10 40 40 40 50 0 S90 -40 100 0");
        const end = geo.getPointAtLength(geo.getTotalLength());
        expect(end.x).toBeCloseTo(100, 1);
        expect(end.y).toBeCloseTo(0, 1);
    });

    it("resolves the smooth quadratic shortcut T", () => {
        const geo = new PathGeometry("M0 0 Q25 50 50 0 T100 0");
        const end = geo.getPointAtLength(geo.getTotalLength());
        expect(end.x).toBeCloseTo(100, 1);
        expect(end.y).toBeCloseTo(0, 1);
    });

    it("exposes the tangent angle for orient-along-path (rotate: auto)", () => {
        const geo = new PathGeometry("M0 0 L100 0 L100 100");
        // Along the bottom: tangent points +x (angle 0).
        expect(geo.sampleAtLength(50).angle).toBeCloseTo(0);
        // Up the right side: tangent points +y (angle pi/2).
        expect(geo.sampleAtLength(150).angle).toBeCloseTo(Math.PI / 2);
    });

    it("handles H and V (horizontal / vertical line) commands", () => {
        expect(getTotalLength("M0 0 H100 V100")).toBeCloseTo(200);
        const p = getPointAtLength("M0 0 H100 V100", 150);
        expect(p.x).toBeCloseTo(100);
        expect(p.y).toBeCloseTo(50);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// X.W9.b — `./transform` totality over malformed `d` data (G6 · G7 · G8).
//
// SVG 1.1 §8.3 states the error-handling rule for path data: the path renders
// "up to, but not including, the path command containing the first error". That
// rule is the module's contract, so a public entry returns the geometry of the
// well-formed prefix and never throws on a string.
// ─────────────────────────────────────────────────────────────────────────────

describe("path geometry — M-less path data is total, not a TypeError (G6)", () => {
    // Every drawing command, each used before any `moveto`, plus the
    // leading-whitespace spelling. SVG 1.1 §8.3.2: path data must begin with a
    // moveto, so the first command IS the first error and nothing renders.
    const MLESS = [
        "L 10 10",
        "l 10 10",
        "H 50",
        "V 50",
        "C 1 1 2 2 3 3",
        "Q 1 1 2 2",
        "A 5 5 0 0 1 10 10",
        "T 10 10",
        "S 1 1 2 2",
        "   L 10 10",
    ] as const;

    it.each(MLESS)("getTotalLength(%j) returns 0 instead of throwing", (d) => {
        expect(() => getTotalLength(d)).not.toThrow();
        expect(getTotalLength(d)).toBe(0);
    });

    it("samples an M-less path as the origin, with a finite angle", () => {
        const geo = new PathGeometry("L 10 10");
        expect(geo.getTotalLength()).toBe(0);
        expect(geo.getPointAtLength(50)).toEqual({ x: 0, y: 0 });
        expect(geo.sampleAtLength(50).angle).toBe(0);
    });

    it("keeps the well-formed prefix when the error is later in the data", () => {
        // The `moveto` + first `lineto` are whole; the `%` is the first error.
        expect(getTotalLength("M0 0 L3 4 % 9 9")).toBeCloseTo(5);
    });
});

describe("path geometry — arc flags are positional, one character (G7)", () => {
    // SVG 1.1 §8.3.9: `flag ::= "0" | "1"`. A flag is a CHARACTER, so
    // `0 0120 10` is (flag 0)(flag 1)(20)(10) — not the number 120.
    const ARC_FIXTURES: readonly (readonly [string, string, string])[] = [
        [
            "two half-arcs of a r=5 circle",
            "M 10 10 A 5 5 0 0 1 20 10 A 5 5 0 0 1 10 10",
            "M10 10A5 5 0 0120 10A5 5 0 0110 10",
        ],
        [
            // Committed SVGO output: `convertPathData` with the SVGO v1 default
            // `noSpaceAfterFlags: true`, run over a 24x24 circle icon
            // (`<circle cx="12" cy="12" r="10"/>` → arcs). The two flags and the
            // following coordinate are glued into the run `100 20`.
            "SVGO convertPathData, flags unspaced",
            "M 12 2 A 10 10 0 1 0 12 22 A 10 10 0 1 0 12 2 Z",
            "M12 2a10 10 0 100 20 10 10 0 100-20z",
        ],
        [
            // The same icon as SVGO v2+ emits it (spaced flags, glued sign).
            "SVGO convertPathData, flags spaced",
            "M 12 2 A 10 10 0 1 0 12 22 A 10 10 0 1 0 12 2 Z",
            "M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z",
        ],
    ];

    it.each(ARC_FIXTURES)(
        "%s: the compact spelling measures the expanded one",
        (_name, expanded, compact) => {
            const le = getTotalLength(expanded);
            const lc = getTotalLength(compact);
            expect(Math.abs(le - lc)).toBeLessThan(1e-6);
            expect(lc).toBeGreaterThan(0);
        },
    );

    it("measures the r=5 circle's circumference within flattening tolerance", () => {
        // 2πr = 31.4159…; the polyline is inscribed, so it reads a hair short.
        expect(getTotalLength("M10 10A5 5 0 0120 10A5 5 0 0110 10")).toBeCloseTo(
            2 * Math.PI * 5,
            1,
        );
    });

    it("rejects a non-flag where SVG 1.1 §8.3.9 requires one", () => {
        // `2` is neither "0" nor "1": the arc is the first error, so only the
        // moveto renders.
        expect(getTotalLength("M0 0 A5 5 0 2 1 10 10")).toBe(0);
    });
});

describe("path geometry — truncated command runs honour `: number` (G8)", () => {
    // `tokenizePath` rejects a short argument group rather than reading past
    // its end; the declared return type is a number, so these are finite.
    const TRUNCATED: readonly (readonly [string, number])[] = [
        ["M 0 0 L 10", 0], // lineto missing its y
        ["M 0 0 C 1 1 2 2 3", 0], // cubic missing its final y
        ["M 0 0 Q 1 1 2", 0], // quadratic missing its final y
        ["M 0 0 A 5 5 0 0 1 10", 0], // arc missing its final y
        ["M 0 0 H", 0], // horizontal lineto with no argument
        ["M 0 0 L 3 4 L 5", 5], // the whole first lineto survives
        ["M 0 0 L 3 4 5", 5], // a short REPETITION drops, the whole one stays
    ];

    it.each(TRUNCATED)("getTotalLength(%j) → %f", (d, expected) => {
        const measured = getTotalLength(d);
        expect(Number.isFinite(measured)).toBe(true);
        expect(measured).toBeCloseTo(expected, 10);
    });

    it("is total over a garbage string", () => {
        for (const d of ["", "   ", "nonsense", "M", "M 0", "Z", "ZZZ", "0 0 1 1"]) {
            expect(() => getTotalLength(d)).not.toThrow();
            expect(Number.isFinite(getTotalLength(d))).toBe(true);
        }
    });
});
