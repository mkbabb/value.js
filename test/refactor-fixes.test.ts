import { describe, it, expect } from "vitest";
import { CSSCubicBezier, steppedEase } from "../src/easing";
import { parseCSSValue } from "../src/parsing";
import { parseCSSValueUnit } from "../src/parsing/units";
import { convertAbsoluteUnitToPixels } from "../src/units/utils";
import {
    decomposeMatrix2D,
    decomposeMatrix3D,
    recomposeMatrix3D,
    slerp,
} from "../src/transform/decompose";
import type { Vec4 } from "../src/transform/decompose";

// ---------------------------------------------------------------------------
// 1. CSSCubicBezier Newton-Raphson solver accuracy
// ---------------------------------------------------------------------------
describe("CSSCubicBezier Newton-Raphson solver", () => {
    it("ease (0.25, 0.1, 0.25, 1) at t=0.5 matches browser output (~0.8024)", () => {
        const ease = CSSCubicBezier(0.25, 0.1, 0.25, 1);
        // Chrome/Firefox report ease(0.5) ~ 0.8024033546
        expect(ease(0.5)).toBeCloseTo(0.8024, 3);
    });

    it("linear bezier (0, 0, 1, 1) at t=0.5 equals 0.5", () => {
        const linearBez = CSSCubicBezier(0, 0, 1, 1);
        expect(linearBez(0.5)).toBeCloseTo(0.5, 6);
    });

    it("boundary: f(0) = 0", () => {
        const ease = CSSCubicBezier(0.25, 0.1, 0.25, 1);
        expect(ease(0)).toBe(0);
    });

    it("boundary: f(1) = 1", () => {
        const ease = CSSCubicBezier(0.25, 0.1, 0.25, 1);
        expect(ease(1)).toBe(1);
    });

    it("ease-in (0.42, 0, 1, 1) is monotonically increasing", () => {
        const easeIn = CSSCubicBezier(0.42, 0, 1, 1);
        let prev = 0;
        for (let t = 0.05; t <= 1; t += 0.05) {
            const val = easeIn(t);
            expect(val).toBeGreaterThanOrEqual(prev);
            prev = val;
        }
    });
});

// ---------------------------------------------------------------------------
// 2. steppedEase all 4 jump terms match CSS spec
// ---------------------------------------------------------------------------
describe("steppedEase jump terms (CSS spec)", () => {
    describe("jump-start with 4 steps", () => {
        const fn = steppedEase(4, "jump-start")!;

        it("t=0 -> 0 (ceil(0)/4 = 0)", () => {
            expect(fn(0)).toBe(0);
        });

        it("t=0.1 -> 0.25 (ceil(0.4)/4 = 1/4)", () => {
            expect(fn(0.1)).toBe(0.25);
        });

        it("t=0.5 -> 0.5 (ceil(2)/4 = 2/4)", () => {
            expect(fn(0.5)).toBe(0.5);
        });
    });

    describe("jump-end with 4 steps", () => {
        const fn = steppedEase(4, "jump-end")!;

        it("t=0 -> 0", () => {
            expect(fn(0)).toBe(0);
        });

        it("t=0.24 -> 0 (floor(0.96)/4 = 0)", () => {
            expect(fn(0.24)).toBe(0);
        });

        it("t=0.25 -> 0.25 (floor(1)/4 = 0.25)", () => {
            expect(fn(0.25)).toBe(0.25);
        });
    });

    describe("jump-none with 4 steps", () => {
        const fn = steppedEase(4, "jump-none")!;

        it("t=0 -> 0", () => {
            expect(fn(0)).toBe(0);
        });

        it("t=1 -> 1 (floor(3)/3 = 1)", () => {
            expect(fn(1)).toBe(1);
        });

        it("uses floor(t*(n-1))/(n-1) formula", () => {
            // With n=4, formula is floor(t*3)/3
            // t=0.5 -> floor(1.5)/3 = 1/3
            expect(fn(0.5)).toBeCloseTo(1 / 3, 10);
        });
    });

    describe("jump-both with 4 steps", () => {
        const fn = steppedEase(4, "jump-both")!;

        it("t=0 -> 0 (floor(0)/5 = 0)", () => {
            expect(fn(0)).toBe(0);
        });

        it("uses floor(t*(n+1))/(n+1) formula", () => {
            // With n=4, formula is floor(t*5)/5
            // t=0.3 -> floor(1.5)/5 = 1/5 = 0.2
            expect(fn(0.3)).toBe(0.2);
        });

        it("t=1 -> 1 (floor(5)/5 = 1)", () => {
            expect(fn(1)).toBe(1);
        });
    });
});

// ---------------------------------------------------------------------------
// 3. OKLab L range
// ---------------------------------------------------------------------------
describe("OKLab L range", () => {
    it("oklab(0.5 0.1 -0.1) parses L as ~0.5 (not ~50)", () => {
        const result = parseCSSValue("oklab(0.5 0.1 -0.1)");
        // The parsed value is a ValueUnit wrapping an OKLABColor
        expect(result).toBeDefined();
        expect(result.unit).toBe("color");

        const color = result.value as any;
        expect(color.colorSpace).toBe("oklab");

        // L in OKLab is [0, 1] range; the raw parsed value should be 0.5,
        // not scaled to 50 (which would happen if the range was incorrectly set to [0, 100])
        const lValue = color.l instanceof Object ? color.l.value ?? color.l : color.l;
        expect(lValue).toBeCloseTo(0.5, 3);
    });
});

// ---------------------------------------------------------------------------
// 4. Q conversion
// ---------------------------------------------------------------------------
describe("Q unit conversion", () => {
    it("1Q = 96 / (25.4 * 4) px (approximately 0.9449 px)", () => {
        const onePx = convertAbsoluteUnitToPixels(1, "Q");
        const expected = 96 / (25.4 * 4); // ~0.944881889...
        expect(onePx).toBeCloseTo(expected, 6);
    });

    it("0.25Q ~ 0.236 px", () => {
        const px = convertAbsoluteUnitToPixels(0.25, "Q");
        const expected = 0.25 * (96 / (25.4 * 4)); // ~0.23622...
        expect(px).toBeCloseTo(expected, 6);
        expect(px).toBeCloseTo(0.236, 2);
    });

    it("px passes through unchanged", () => {
        expect(convertAbsoluteUnitToPixels(100, "px")).toBe(100);
    });
});

// ---------------------------------------------------------------------------
// 5. skewZ exclusion
// ---------------------------------------------------------------------------
describe("skewZ exclusion", () => {
    it("skew(10deg) produces only skewX and skewY, not skewZ", () => {
        const result = parseCSSValue("skew(10deg)");
        // The parser returns a ValueArray of FunctionValues for transform shorthands
        expect(result).toBeDefined();

        // Flatten to check function names
        const items = Array.isArray(result) ? result : [result];
        const names: string[] = [];

        for (const item of items) {
            if ("name" in item) {
                names.push(item.name);
            } else if (Array.isArray(item)) {
                for (const sub of item) {
                    if ("name" in sub) {
                        names.push(sub.name);
                    }
                }
            }
        }

        expect(names).toContain("skewX");
        expect(names).toContain("skewY");
        expect(names).not.toContain("skewZ");
    });
});

// ---------------------------------------------------------------------------
// 6. var() nested fallback
// ---------------------------------------------------------------------------
describe("var() nested fallback", () => {
    it("var(--a, var(--b, red)) parses as a single var ValueUnit", () => {
        const result = parseCSSValue("var(--a, var(--b, red))");
        expect(result).toBeDefined();
        expect(result.unit).toBe("var");
        // The value should contain the full inner content: --a, var(--b, red)
        const val = String(result.value);
        expect(val).toContain("--a");
        expect(val).toContain("var(--b, red)");
    });

    it("simple var(--foo) parses correctly", () => {
        const result = parseCSSValue("var(--foo)");
        expect(result).toBeDefined();
        expect(result.unit).toBe("var");
        expect(String(result.value)).toContain("--foo");
    });
});

// ---------------------------------------------------------------------------
// 7. Matrix decomposition round-trip
// ---------------------------------------------------------------------------
describe("Matrix decomposition round-trip", () => {
    describe("2D decomposition", () => {
        it("identity matrix decomposes to no transform", () => {
            // matrix(1, 0, 0, 1, 0, 0) = identity
            const d = decomposeMatrix2D(1, 0, 0, 1, 0, 0);
            expect(d.translateX).toBeCloseTo(0, 10);
            expect(d.translateY).toBeCloseTo(0, 10);
            expect(d.scaleX).toBeCloseTo(1, 10);
            expect(d.scaleY).toBeCloseTo(1, 10);
            expect(d.angle).toBeCloseTo(0, 10);
            expect(d.skew).toBeCloseTo(0, 10);
        });

        it("translation matrix decomposes correctly", () => {
            // matrix(1, 0, 0, 1, 100, 200)
            const d = decomposeMatrix2D(1, 0, 0, 1, 100, 200);
            expect(d.translateX).toBeCloseTo(100, 10);
            expect(d.translateY).toBeCloseTo(200, 10);
            expect(d.scaleX).toBeCloseTo(1, 10);
            expect(d.scaleY).toBeCloseTo(1, 10);
        });

        it("90-degree rotation decomposes correctly", () => {
            // rotate(90deg): matrix(cos90, sin90, -sin90, cos90, 0, 0) = (0, 1, -1, 0, 0, 0)
            const d = decomposeMatrix2D(0, 1, -1, 0, 0, 0);
            expect(d.angle).toBeCloseTo(Math.PI / 2, 6);
            expect(d.scaleX).toBeCloseTo(1, 6);
            expect(d.scaleY).toBeCloseTo(1, 6);
        });
    });

    describe("3D decompose -> recompose round-trip", () => {
        it("identity matrix produces identity after round-trip", () => {
            // CSS column-major identity: [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]
            const identity = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ];

            const decomposed = decomposeMatrix3D(identity);
            expect(decomposed).not.toBeNull();

            const recomposed = recomposeMatrix3D(decomposed!);

            // Check each element of the recomposed matrix matches identity
            for (let i = 0; i < 16; i++) {
                expect(recomposed[i]).toBeCloseTo(identity[i], 6);
            }
        });

        it("rotation + translation preserves values through round-trip", () => {
            // 90-degree rotation around Z + translation (100, 50, 0)
            // CSS column-major: rotate(90deg) + translate(100, 50)
            const cos90 = Math.cos(Math.PI / 2);
            const sin90 = Math.sin(Math.PI / 2);

            // rotation around Z in CSS column-major order:
            // col0=[cos,sin,0,0], col1=[-sin,cos,0,0], col2=[0,0,1,0], col3=[tx,ty,tz,1]
            const matrix = [
                cos90, sin90, 0, 0,
                -sin90, cos90, 0, 0,
                0, 0, 1, 0,
                100, 50, 0, 1,
            ];

            const decomposed = decomposeMatrix3D(matrix);
            expect(decomposed).not.toBeNull();

            // Verify translation is preserved
            expect(decomposed!.translate[0]).toBeCloseTo(100, 4);
            expect(decomposed!.translate[1]).toBeCloseTo(50, 4);
            expect(decomposed!.translate[2]).toBeCloseTo(0, 4);

            // Round-trip
            const recomposed = recomposeMatrix3D(decomposed!);
            for (let i = 0; i < 16; i++) {
                expect(recomposed[i]).toBeCloseTo(matrix[i], 4);
            }
        });
    });

    describe("quaternion slerp", () => {
        it("slerp between identity and 90-degree Z rotation at t=0.5 gives 45 degrees", () => {
            // Identity quaternion: [0, 0, 0, 1]
            const qIdentity: Vec4 = [0, 0, 0, 1];

            // 90-degree rotation around Z axis:
            // quaternion = [0, 0, sin(45deg), cos(45deg)]
            const angle = Math.PI / 2;
            const halfAngle = angle / 2;
            const q90: Vec4 = [0, 0, Math.sin(halfAngle), Math.cos(halfAngle)];

            const result = slerp(qIdentity, q90, 0.5);

            // At t=0.5, we expect 45-degree rotation around Z
            // quaternion = [0, 0, sin(22.5deg), cos(22.5deg)]
            const expectedHalf = Math.PI / 4;
            const halfExpected = expectedHalf / 2;
            const expectedQ: Vec4 = [0, 0, Math.sin(halfExpected), Math.cos(halfExpected)];

            expect(result[0]).toBeCloseTo(expectedQ[0], 6);
            expect(result[1]).toBeCloseTo(expectedQ[1], 6);
            expect(result[2]).toBeCloseTo(expectedQ[2], 6);
            expect(result[3]).toBeCloseTo(expectedQ[3], 6);
        });

        it("slerp at t=0 returns start quaternion", () => {
            const qa: Vec4 = [0, 0, 0, 1];
            const qb: Vec4 = [0, 0, Math.sin(Math.PI / 4), Math.cos(Math.PI / 4)];

            const result = slerp(qa, qb, 0);
            expect(result[0]).toBeCloseTo(qa[0], 6);
            expect(result[1]).toBeCloseTo(qa[1], 6);
            expect(result[2]).toBeCloseTo(qa[2], 6);
            expect(result[3]).toBeCloseTo(qa[3], 6);
        });

        it("slerp at t=1 returns end quaternion", () => {
            const qa: Vec4 = [0, 0, 0, 1];
            const qb: Vec4 = [0, 0, Math.sin(Math.PI / 4), Math.cos(Math.PI / 4)];

            const result = slerp(qa, qb, 1);
            expect(result[0]).toBeCloseTo(qb[0], 6);
            expect(result[1]).toBeCloseTo(qb[1], 6);
            expect(result[2]).toBeCloseTo(qb[2], 6);
            expect(result[3]).toBeCloseTo(qb[3], 6);
        });
    });
});

// ---------------------------------------------------------------------------
// 8. Frequency units
// ---------------------------------------------------------------------------
describe("Frequency units", () => {
    it("440Hz parses with correct value and superType", () => {
        const result = parseCSSValueUnit("440Hz");
        expect(result).toBeDefined();
        expect(result.value).toBe(440);
        expect(result.unit).toBe("Hz");
        expect(result.superType).toContain("frequency");
    });

    it("2.5kHz parses with correct value and superType", () => {
        const result = parseCSSValueUnit("2.5kHz");
        expect(result).toBeDefined();
        expect(result.value).toBe(2.5);
        expect(result.unit).toBe("kHz");
        expect(result.superType).toContain("frequency");
    });
});

// ---------------------------------------------------------------------------
// 9. Flex units
// ---------------------------------------------------------------------------
describe("Flex units", () => {
    it("1fr parses with correct value and superType", () => {
        const result = parseCSSValueUnit("1fr");
        expect(result).toBeDefined();
        expect(result.value).toBe(1);
        expect(result.unit).toBe("fr");
        expect(result.superType).toContain("flex");
    });

    it("2.5fr parses correctly", () => {
        const result = parseCSSValueUnit("2.5fr");
        expect(result).toBeDefined();
        expect(result.value).toBe(2.5);
        expect(result.unit).toBe("fr");
        expect(result.superType).toContain("flex");
    });
});
