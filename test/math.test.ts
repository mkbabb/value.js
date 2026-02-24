import { describe, expect, it } from "vitest";
import {
    clamp,
    scale,
    lerp,
    logerp,
    deCasteljau,
    cubicBezier,
    interpBezier,
    cubicBezierToSVG,
    cubicBezierToString,
} from "../src/math";

describe("clamp", () => {
    it("should return the value when it is within the range", () => {
        expect(clamp(5, 0, 10)).toBe(5);
        expect(clamp(0.5, 0, 1)).toBe(0.5);
        expect(clamp(0, -10, 10)).toBe(0);
    });

    it("should clamp to the minimum when value is below range", () => {
        expect(clamp(-5, 0, 10)).toBe(0);
        expect(clamp(-100, -50, 50)).toBe(-50);
        expect(clamp(-Infinity, 0, 1)).toBe(0);
    });

    it("should clamp to the maximum when value is above range", () => {
        expect(clamp(15, 0, 10)).toBe(10);
        expect(clamp(100, -50, 50)).toBe(50);
        expect(clamp(Infinity, 0, 1)).toBe(1);
    });

    it("should return the boundary when value equals min or max", () => {
        expect(clamp(0, 0, 10)).toBe(0);
        expect(clamp(10, 0, 10)).toBe(10);
    });

    it("should work when min equals max", () => {
        expect(clamp(5, 3, 3)).toBe(3);
        expect(clamp(0, 3, 3)).toBe(3);
    });

    it("should handle negative ranges", () => {
        expect(clamp(-5, -10, -1)).toBe(-5);
        expect(clamp(0, -10, -1)).toBe(-1);
        expect(clamp(-20, -10, -1)).toBe(-10);
    });
});

describe("scale", () => {
    it("should map a value from one range to another", () => {
        expect(scale(5, 0, 10, 0, 100)).toBe(50);
        expect(scale(0, 0, 10, 0, 100)).toBe(0);
        expect(scale(10, 0, 10, 0, 100)).toBe(100);
    });

    it("should default toMin=0 and toMax=1", () => {
        expect(scale(5, 0, 10)).toBe(0.5);
        expect(scale(0, 0, 10)).toBe(0);
        expect(scale(10, 0, 10)).toBe(1);
    });

    it("should handle inverted output ranges", () => {
        expect(scale(0, 0, 10, 100, 0)).toBe(100);
        expect(scale(10, 0, 10, 100, 0)).toBe(0);
        expect(scale(5, 0, 10, 100, 0)).toBe(50);
    });

    it("should handle negative input ranges", () => {
        expect(scale(0, -10, 10, 0, 100)).toBe(50);
        expect(scale(-10, -10, 10, 0, 100)).toBe(0);
        expect(scale(10, -10, 10, 0, 100)).toBe(100);
    });

    it("should extrapolate values outside the input range", () => {
        expect(scale(20, 0, 10, 0, 100)).toBe(200);
        expect(scale(-5, 0, 10, 0, 100)).toBe(-50);
    });

    it("should throw when fromMin equals fromMax", () => {
        expect(() => scale(5, 5, 5, 0, 10)).toThrow(
            "fromMax and fromMin cannot be equal",
        );
    });

    it("should handle fractional values", () => {
        expect(scale(0.25, 0, 1, 0, 100)).toBe(25);
        expect(scale(0.75, 0, 1, 0, 100)).toBe(75);
    });
});

describe("lerp", () => {
    it("should return start when t=0", () => {
        expect(lerp(0, 10, 20)).toBe(10);
        expect(lerp(0, -5, 5)).toBe(-5);
        expect(lerp(0, 0, 100)).toBe(0);
    });

    it("should return end when t=1", () => {
        expect(lerp(1, 10, 20)).toBe(20);
        expect(lerp(1, -5, 5)).toBe(5);
        expect(lerp(1, 0, 100)).toBe(100);
    });

    it("should return midpoint when t=0.5", () => {
        expect(lerp(0.5, 0, 100)).toBe(50);
        expect(lerp(0.5, -10, 10)).toBe(0);
        expect(lerp(0.5, 20, 40)).toBe(30);
    });

    it("should interpolate at arbitrary t values", () => {
        expect(lerp(0.25, 0, 100)).toBe(25);
        expect(lerp(0.75, 0, 100)).toBe(75);
        expect(lerp(0.1, 0, 10)).toBeCloseTo(1);
    });

    it("should extrapolate beyond [0,1]", () => {
        expect(lerp(2, 0, 10)).toBe(20);
        expect(lerp(-1, 0, 10)).toBe(-10);
    });

    it("should handle equal start and end", () => {
        expect(lerp(0.5, 7, 7)).toBe(7);
        expect(lerp(0, 7, 7)).toBe(7);
        expect(lerp(1, 7, 7)).toBe(7);
    });

    it("should handle negative ranges", () => {
        expect(lerp(0.5, -100, -200)).toBe(-150);
        expect(lerp(0, -100, -200)).toBe(-100);
        expect(lerp(1, -100, -200)).toBe(-200);
    });
});

describe("logerp", () => {
    it("should return start when t=0", () => {
        expect(logerp(0, 1, 100)).toBeCloseTo(1);
        expect(logerp(0, 10, 1000)).toBeCloseTo(10);
    });

    it("should return end when t=1", () => {
        expect(logerp(1, 1, 100)).toBeCloseTo(100);
        expect(logerp(1, 10, 1000)).toBeCloseTo(1000);
    });

    it("should return geometric mean when t=0.5", () => {
        // geometric mean of 1 and 100 = 10
        expect(logerp(0.5, 1, 100)).toBeCloseTo(10);
        // geometric mean of 4 and 16 = 8
        expect(logerp(0.5, 4, 16)).toBeCloseTo(8);
    });

    it("should handle start=0 by substituting a small epsilon", () => {
        // When start is 0, it is replaced with 1e-9
        const result = logerp(0, 0, 100);
        expect(result).toBeCloseTo(1e-9);
        const resultEnd = logerp(1, 0, 100);
        expect(resultEnd).toBeCloseTo(100);
    });

    it("should interpolate logarithmically at arbitrary t values", () => {
        // logerp(0.25, 1, 10000) = 1 * (10000/1)^0.25 = 10
        expect(logerp(0.25, 1, 10000)).toBeCloseTo(10);
        // logerp(0.75, 1, 10000) = 1 * (10000/1)^0.75 = 1000
        expect(logerp(0.75, 1, 10000)).toBeCloseTo(1000);
    });

    it("should handle equal start and end", () => {
        expect(logerp(0, 5, 5)).toBeCloseTo(5);
        expect(logerp(0.5, 5, 5)).toBeCloseTo(5);
        expect(logerp(1, 5, 5)).toBeCloseTo(5);
    });
});

describe("deCasteljau", () => {
    it("should return the single point for a 0-degree curve", () => {
        expect(deCasteljau(0, [5])).toBe(5);
        expect(deCasteljau(0.5, [5])).toBe(5);
        expect(deCasteljau(1, [5])).toBe(5);
    });

    it("should evaluate a linear segment (2 points) as linear interpolation", () => {
        expect(deCasteljau(0, [0, 10])).toBe(0);
        expect(deCasteljau(0.5, [0, 10])).toBe(5);
        expect(deCasteljau(1, [0, 10])).toBe(10);
        expect(deCasteljau(0.25, [0, 100])).toBeCloseTo(25);
    });

    it("should evaluate a quadratic bezier (3 points)", () => {
        // Quadratic bezier: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
        // Points: [0, 1, 0] => B(0.5) = 0.25*0 + 0.5*1 + 0.25*0 = 0.5
        expect(deCasteljau(0, [0, 1, 0])).toBe(0);
        expect(deCasteljau(1, [0, 1, 0])).toBe(0);
        expect(deCasteljau(0.5, [0, 1, 0])).toBeCloseTo(0.5);
    });

    it("should evaluate a cubic bezier (4 points)", () => {
        // Cubic bezier with control points [0, 0, 1, 1] (linear-like)
        // At t=0 => 0, at t=1 => 1
        expect(deCasteljau(0, [0, 0, 1, 1])).toBeCloseTo(0);
        expect(deCasteljau(1, [0, 0, 1, 1])).toBeCloseTo(1);
        expect(deCasteljau(0.5, [0, 0, 1, 1])).toBeCloseTo(0.5);
    });

    it("should evaluate a cubic bezier with non-trivial control points", () => {
        // Points: [0, 0.5, 0.5, 1]
        // B(0.5) = (1-0.5)^3*0 + 3*(1-0.5)^2*0.5*0.5 + 3*(1-0.5)*0.5^2*0.5 + 0.5^3*1
        //        = 0 + 3*0.25*0.25 + 3*0.5*0.25*0.5 + 0.125
        //        = 0.1875 + 0.1875 + 0.125 = 0.5
        expect(deCasteljau(0.5, [0, 0.5, 0.5, 1])).toBeCloseTo(0.5);
    });

    it("should return the first point at t=0 and last point at t=1", () => {
        const points = [3, 7, 2, 9, 1];
        expect(deCasteljau(0, points)).toBeCloseTo(3);
        expect(deCasteljau(1, points)).toBeCloseTo(1);
    });
});

describe("cubicBezier", () => {
    it("should return [0, 0] at t=0", () => {
        const [x, y] = cubicBezier(0, 0.25, 0.1, 0.25, 1.0);
        expect(x).toBeCloseTo(0);
        expect(y).toBeCloseTo(0);
    });

    it("should return [1, 1] at t=1", () => {
        const [x, y] = cubicBezier(1, 0.25, 0.1, 0.25, 1.0);
        expect(x).toBeCloseTo(1);
        expect(y).toBeCloseTo(1);
    });

    it("should evaluate a linear bezier (0,0,1,1) as diagonal", () => {
        // When control points create a linear curve: x1=0,y1=0,x2=1,y2=1
        // The bezier should approximate the identity function
        const [x, y] = cubicBezier(0.5, 0, 0, 1, 1);
        expect(x).toBeCloseTo(0.5);
        expect(y).toBeCloseTo(0.5);
    });

    it("should evaluate ease-in-out (0.42, 0, 0.58, 1)", () => {
        const [x, y] = cubicBezier(0.5, 0.42, 0, 0.58, 1);
        expect(x).toBeCloseTo(0.5);
        expect(y).toBeCloseTo(0.5);
    });

    it("should evaluate ease (0.25, 0.1, 0.25, 1.0) at midpoint", () => {
        const [x, y] = cubicBezier(0.5, 0.25, 0.1, 0.25, 1.0);
        // x = deCasteljau(0.5, [0, 0.25, 0.25, 1]) = 0.3125
        // y = deCasteljau(0.5, [0, 0.1, 1.0, 1])
        //   = 3*(0.25)*(0.5)*0.1 + 3*(0.5)*(0.25)*1.0 + 0.125 = 0.5375
        expect(x).toBeCloseTo(0.3125);
        expect(y).toBeCloseTo(0.5375);
    });

    it("should return two-element array", () => {
        const result = cubicBezier(0.3, 0.1, 0.2, 0.3, 0.4);
        expect(result).toHaveLength(2);
        expect(typeof result[0]).toBe("number");
        expect(typeof result[1]).toBe("number");
    });
});

describe("interpBezier", () => {
    it("should return the first point at t=0", () => {
        const points = [
            [0, 0],
            [0.5, 1],
            [1, 0],
        ];
        const [x, y] = interpBezier(0, points);
        expect(x).toBeCloseTo(0);
        expect(y).toBeCloseTo(0);
    });

    it("should return the last point at t=1", () => {
        const points = [
            [0, 0],
            [0.5, 1],
            [1, 0],
        ];
        const [x, y] = interpBezier(1, points);
        expect(x).toBeCloseTo(1);
        expect(y).toBeCloseTo(0);
    });

    it("should evaluate a linear segment (two points)", () => {
        const points = [
            [0, 0],
            [10, 20],
        ];
        const [x, y] = interpBezier(0.5, points);
        expect(x).toBeCloseTo(5);
        expect(y).toBeCloseTo(10);
    });

    it("should evaluate a quadratic bezier (three points)", () => {
        const points = [
            [0, 0],
            [5, 10],
            [10, 0],
        ];
        const [x, y] = interpBezier(0.5, points);
        // Quadratic: x(0.5) = 0.25*0 + 0.5*5 + 0.25*10 = 5
        // Quadratic: y(0.5) = 0.25*0 + 0.5*10 + 0.25*0 = 5
        expect(x).toBeCloseTo(5);
        expect(y).toBeCloseTo(5);
    });

    it("should evaluate a cubic bezier (four points)", () => {
        const points = [
            [0, 0],
            [0.25, 0.1],
            [0.25, 1.0],
            [1, 1],
        ];
        const [x, y] = interpBezier(0, points);
        expect(x).toBeCloseTo(0);
        expect(y).toBeCloseTo(0);

        const [x1, y1] = interpBezier(1, points);
        expect(x1).toBeCloseTo(1);
        expect(y1).toBeCloseTo(1);
    });

    it("should match cubicBezier for equivalent inputs", () => {
        // cubicBezier(t, x1, y1, x2, y2) uses points [0, x1, x2, 1] and [0, y1, y2, 1]
        // interpBezier with [[0,0], [x1,y1], [x2,y2], [1,1]] should match
        const x1 = 0.4,
            y1 = 0.0,
            x2 = 0.6,
            y2 = 1.0;
        const t = 0.3;

        const [bx, by] = cubicBezier(t, x1, y1, x2, y2);
        const [ix, iy] = interpBezier(t, [
            [0, 0],
            [x1, y1],
            [x2, y2],
            [1, 1],
        ]);

        expect(ix).toBeCloseTo(bx);
        expect(iy).toBeCloseTo(by);
    });

    it("should handle higher-degree curves (5+ points)", () => {
        const points = [
            [0, 0],
            [1, 4],
            [3, 6],
            [5, 4],
            [6, 0],
        ];
        const [x0, y0] = interpBezier(0, points);
        expect(x0).toBeCloseTo(0);
        expect(y0).toBeCloseTo(0);

        const [x1, y1] = interpBezier(1, points);
        expect(x1).toBeCloseTo(6);
        expect(y1).toBeCloseTo(0);

        // Midpoint should be somewhere reasonable
        const [xm, ym] = interpBezier(0.5, points);
        expect(xm).toBeGreaterThan(0);
        expect(xm).toBeLessThan(6);
        expect(ym).toBeGreaterThan(0);
    });
});

describe("cubicBezierToSVG", () => {
    it("should return a string containing an SVG path element", () => {
        const result = cubicBezierToSVG(0.25, 0.1, 0.25, 1.0);
        expect(result).toContain("<path");
        expect(result).toContain('d="');
        expect(result).toContain("/>");
    });

    it("should start the path at M0 0", () => {
        const result = cubicBezierToSVG(0.25, 0.1, 0.25, 1.0);
        expect(result).toContain("M0 0");
    });

    it("should contain L (lineto) segments for the curve approximation", () => {
        const result = cubicBezierToSVG(0.42, 0, 0.58, 1);
        expect(result).toContain(" L");
    });

    it("should produce a path that ends near (1, 1)", () => {
        const result = cubicBezierToSVG(0.25, 0.1, 0.25, 1.0);
        // The last L segment should be close to L1 1
        // Extract all numbers from the last L command
        const matches = result.match(/L([\d.e+-]+) ([\d.e+-]+)/g);
        expect(matches).not.toBeNull();
        const lastMatch = matches![matches!.length - 1];
        const [, xStr, yStr] = lastMatch.match(/L([\d.e+-]+) ([\d.e+-]+)/)!;
        expect(parseFloat(xStr)).toBeCloseTo(1, 1);
        expect(parseFloat(yStr)).toBeCloseTo(1, 1);
    });

    it("should produce many path segments (step size 0.001)", () => {
        const result = cubicBezierToSVG(0.25, 0.1, 0.25, 1.0);
        const lineSegments = result.match(/ L/g);
        expect(lineSegments).not.toBeNull();
        // 1/0.001 = 1000 steps, so ~1000 or 1001 L segments
        expect(lineSegments!.length).toBeGreaterThanOrEqual(999);
    });

    it("should work with different control points", () => {
        const easeIn = cubicBezierToSVG(0.42, 0, 1, 1);
        const easeOut = cubicBezierToSVG(0, 0, 0.58, 1);
        expect(easeIn).toContain("<path");
        expect(easeOut).toContain("<path");
        // Different control points should produce different paths
        expect(easeIn).not.toBe(easeOut);
    });
});

describe("cubicBezierToString", () => {
    it("should produce a valid cubic-bezier() CSS string", () => {
        const result = cubicBezierToString(0.25, 0.1, 0.25, 1.0);
        expect(result).toBe("cubic-bezier(0.25, 0.10, 0.25, 1.00)");
    });

    it("should format numbers to two decimal places", () => {
        const result = cubicBezierToString(0, 0, 1, 1);
        expect(result).toBe("cubic-bezier(0.00, 0.00, 1.00, 1.00)");
    });

    it("should handle the standard ease curve", () => {
        const result = cubicBezierToString(0.25, 0.1, 0.25, 1);
        expect(result).toMatch(/^cubic-bezier\(.+\)$/);
        expect(result).toContain("0.25");
        expect(result).toContain("0.10");
        expect(result).toContain("1.00");
    });

    it("should handle ease-in-out", () => {
        const result = cubicBezierToString(0.42, 0, 0.58, 1);
        expect(result).toBe("cubic-bezier(0.42, 0.00, 0.58, 1.00)");
    });

    it("should handle values with many decimal places by rounding to 2", () => {
        const result = cubicBezierToString(0.123456, 0.789012, 0.345678, 0.901234);
        expect(result).toBe("cubic-bezier(0.12, 0.79, 0.35, 0.90)");
    });

    it("should handle integer values", () => {
        const result = cubicBezierToString(0, 0, 1, 1);
        expect(result).toBe("cubic-bezier(0.00, 0.00, 1.00, 1.00)");
    });

    it("should handle values greater than 1 (e.g., overshoot curves)", () => {
        const result = cubicBezierToString(0.68, -0.55, 0.27, 1.55);
        expect(result).toBe("cubic-bezier(0.68, -0.55, 0.27, 1.55)");
    });
});
