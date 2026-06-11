import { describe, expect, it } from "vitest";
import {
    PathGeometry,
    getTotalLength,
    getPointAtLength,
} from "../src/transform/path";

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
