import { describe, it, expect } from "vitest";
import { parseCSSValue } from "../src/parsing";
import { FunctionValue, ValueUnit } from "../src/units";
import { evaluateMathFunction } from "../src/parsing/math";
import { cssLinear } from "../src/easing";
import type { LinearStop } from "../src/easing";

// ────────────────────────────────────────────────────────────────
// calc() structured parsing
// ────────────────────────────────────────────────────────────────
describe("calc() structured parsing", () => {
    it("calc(100px + 50px) parses to a FunctionValue AST", () => {
        const result = parseCSSValue("calc(100px + 50px)");
        expect(result).toBeInstanceOf(FunctionValue);
        expect((result as FunctionValue).name).toBe("calc");
    });

    it("calc(100px + 50px) toString round-trips", () => {
        const result = parseCSSValue("calc(100px + 50px)");
        expect(result.toString()).toBe("calc(100px + 50px)");
    });

    it("calc(100% - 20px) preserves mixed units", () => {
        const result = parseCSSValue("calc(100% - 20px)");
        expect(result.toString()).toBe("calc(100% - 20px)");
    });

    it("calc(2 * 50px) handles multiplication", () => {
        const result = parseCSSValue("calc(2 * 50px)");
        expect(result).toBeInstanceOf(FunctionValue);
        const fn = result as FunctionValue;
        expect(fn.name).toBe("calc");
    });

    it("calc(100px / 2) handles division", () => {
        const result = parseCSSValue("calc(100px / 2)");
        expect(result).toBeInstanceOf(FunctionValue);
    });

    it("calc(50px + 50px) evaluates to 100", () => {
        const result = parseCSSValue("calc(50px + 50px)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(100);
        expect(evaluated!.unit).toBe("px");
    });

    it("calc(100 - 30) evaluates to 70 (unitless)", () => {
        const result = parseCSSValue("calc(100 - 30)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(70);
    });

    it("calc(10 * 5) evaluates to 50", () => {
        const result = parseCSSValue("calc(10 * 5)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(50);
    });

    it("calc(100 / 4) evaluates to 25", () => {
        const result = parseCSSValue("calc(100 / 4)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(25);
    });

    it("respects operator precedence: calc(2 + 3 * 4) = 14", () => {
        const result = parseCSSValue("calc(2 + 3 * 4)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(14);
    });

    it("nested calc: calc(calc(10 + 5) * 2) = 30", () => {
        const result = parseCSSValue("calc(calc(10 + 5) * 2)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(30);
    });
});

// ────────────────────────────────────────────────────────────────
// min(), max(), clamp()
// ────────────────────────────────────────────────────────────────
describe("min(), max(), clamp()", () => {
    it("min(100, 50) evaluates to 50", () => {
        const result = parseCSSValue("min(100, 50)");
        expect(result).toBeInstanceOf(FunctionValue);
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(50);
    });

    it("max(100, 50) evaluates to 100", () => {
        const result = parseCSSValue("max(100, 50)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(100);
    });

    it("min(10px, 20px, 5px) evaluates to 5", () => {
        const result = parseCSSValue("min(10px, 20px, 5px)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(5);
        expect(evaluated!.unit).toBe("px");
    });

    it("clamp(10, 5, 20) evaluates to 10 (val clamped to min)", () => {
        const result = parseCSSValue("clamp(10, 5, 20)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(10);
    });

    it("clamp(10, 15, 20) evaluates to 15 (val in range)", () => {
        const result = parseCSSValue("clamp(10, 15, 20)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(15);
    });

    it("clamp(10, 25, 20) evaluates to 20 (val clamped to max)", () => {
        const result = parseCSSValue("clamp(10, 25, 20)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(20);
    });

    it("min/max toString round-trips", () => {
        expect(parseCSSValue("min(100, 50)").toString()).toBe("min(100, 50)");
        expect(parseCSSValue("max(100, 50)").toString()).toBe("max(100, 50)");
        expect(parseCSSValue("clamp(10, 15, 20)").toString()).toBe("clamp(10, 15, 20)");
    });
});

// ────────────────────────────────────────────────────────────────
// round(), mod(), rem()
// ────────────────────────────────────────────────────────────────
describe("round(), mod(), rem()", () => {
    it("round(nearest, 23, 10) = 20", () => {
        const result = parseCSSValue("round(nearest, 23, 10)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(20);
    });

    it("round(up, 23, 10) = 30", () => {
        const result = parseCSSValue("round(up, 23, 10)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(30);
    });

    it("round(down, 23, 10) = 20", () => {
        const result = parseCSSValue("round(down, 23, 10)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(20);
    });

    it("round(to-zero, -23, 10) = -20", () => {
        const result = parseCSSValue("round(to-zero, -23, 10)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(-20);
    });

    it("mod(17, 5) = 2 (CSS mod: sign of divisor)", () => {
        const result = parseCSSValue("mod(17, 5)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(2);
    });

    it("mod(-17, 5) = 3 (CSS mod: result positive with positive divisor)", () => {
        const result = parseCSSValue("mod(-17, 5)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(3);
    });

    it("rem(-17, 5) = -2 (CSS rem: sign of dividend)", () => {
        const result = parseCSSValue("rem(-17, 5)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(-2);
    });
});

// ────────────────────────────────────────────────────────────────
// abs(), sign()
// ────────────────────────────────────────────────────────────────
describe("abs(), sign()", () => {
    it("abs(-42) = 42", () => {
        const result = parseCSSValue("abs(-42)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(42);
    });

    it("abs(42) = 42", () => {
        const result = parseCSSValue("abs(42)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(42);
    });

    it("sign(-42) = -1", () => {
        const result = parseCSSValue("sign(-42)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(-1);
    });

    it("sign(0) = 0", () => {
        const result = parseCSSValue("sign(0)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(0);
    });

    it("sign(100) = 1", () => {
        const result = parseCSSValue("sign(100)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(1);
    });
});

// ────────────────────────────────────────────────────────────────
// Trigonometric functions
// ────────────────────────────────────────────────────────────────
describe("Trigonometric functions", () => {
    it("sin(90deg) = 1", () => {
        const result = parseCSSValue("sin(90deg)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBeCloseTo(1, 10);
    });

    it("cos(0deg) = 1", () => {
        const result = parseCSSValue("cos(0deg)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBeCloseTo(1, 10);
    });

    it("cos(180deg) = -1", () => {
        const result = parseCSSValue("cos(180deg)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBeCloseTo(-1, 10);
    });

    it("tan(45deg) = 1", () => {
        const result = parseCSSValue("tan(45deg)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBeCloseTo(1, 10);
    });

    it("asin(1) returns angle in radians (~pi/2)", () => {
        const result = parseCSSValue("asin(1)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBeCloseTo(Math.PI / 2, 10);
        expect(evaluated!.unit).toBe("rad");
    });

    it("acos(0) returns angle in radians (~pi/2)", () => {
        const result = parseCSSValue("acos(0)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBeCloseTo(Math.PI / 2, 10);
    });

    it("atan(1) returns angle in radians (~pi/4)", () => {
        const result = parseCSSValue("atan(1)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBeCloseTo(Math.PI / 4, 10);
    });

    it("atan2(1, 1) returns pi/4", () => {
        const result = parseCSSValue("atan2(1, 1)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBeCloseTo(Math.PI / 4, 10);
    });
});

// ────────────────────────────────────────────────────────────────
// Exponential functions
// ────────────────────────────────────────────────────────────────
describe("Exponential functions", () => {
    it("pow(2, 10) = 1024", () => {
        const result = parseCSSValue("pow(2, 10)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(1024);
    });

    it("sqrt(144) = 12", () => {
        const result = parseCSSValue("sqrt(144)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(12);
    });

    it("hypot(3, 4) = 5", () => {
        const result = parseCSSValue("hypot(3, 4)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(5);
    });

    it("log(1) = 0 (natural log)", () => {
        const result = parseCSSValue("log(1)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(0);
    });

    it("exp(0) = 1", () => {
        const result = parseCSSValue("exp(0)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(1);
    });

    it("exp(1) = e", () => {
        const result = parseCSSValue("exp(1)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBeCloseTo(Math.E, 10);
    });
});

// ────────────────────────────────────────────────────────────────
// CSS constants
// ────────────────────────────────────────────────────────────────
describe("CSS constants", () => {
    it("pi parses as Math.PI", () => {
        const result = parseCSSValue("pi");
        expect(result).toBeInstanceOf(ValueUnit);
        expect((result as ValueUnit).value).toBeCloseTo(Math.PI, 10);
    });

    it("e parses as Math.E", () => {
        const result = parseCSSValue("e");
        expect(result).toBeInstanceOf(ValueUnit);
        expect((result as ValueUnit).value).toBeCloseTo(Math.E, 10);
    });

    it("infinity parses as Infinity", () => {
        const result = parseCSSValue("infinity");
        expect(result).toBeInstanceOf(ValueUnit);
        expect((result as ValueUnit).value).toBe(Infinity);
    });
});

// ────────────────────────────────────────────────────────────────
// Nested math functions
// ────────────────────────────────────────────────────────────────
describe("Nested math functions", () => {
    it("min(max(10, 20), 15) = 15", () => {
        const result = parseCSSValue("min(max(10, 20), 15)");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(15);
    });

    it("calc(min(10, 20) + max(3, 5)) = 15", () => {
        const result = parseCSSValue("calc(min(10, 20) + max(3, 5))");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(15);
    });

    it("abs(min(-5, -10)) = 10", () => {
        const result = parseCSSValue("abs(min(-5, -10))");
        const evaluated = evaluateMathFunction(result as FunctionValue);
        expect(evaluated).not.toBeNull();
        expect(evaluated!.value).toBe(10);
    });
});

// ────────────────────────────────────────────────────────────────
// CSS linear() easing
// ────────────────────────────────────────────────────────────────
describe("CSS linear() easing", () => {
    it("linear(0, 1) — two stops, identity", () => {
        const fn = cssLinear([{ output: 0 }, { output: 1 }]);
        expect(fn(0)).toBe(0);
        expect(fn(0.5)).toBeCloseTo(0.5, 10);
        expect(fn(1)).toBe(1);
    });

    it("linear(0, 0.5, 1) — three evenly-spaced stops", () => {
        const fn = cssLinear([{ output: 0 }, { output: 0.5 }, { output: 1 }]);
        expect(fn(0)).toBe(0);
        expect(fn(0.25)).toBeCloseTo(0.25, 10);
        expect(fn(0.5)).toBeCloseTo(0.5, 10);
        expect(fn(0.75)).toBeCloseTo(0.75, 10);
        expect(fn(1)).toBe(1);
    });

    it("linear(0, 0.25 75%, 1) — custom stop position", () => {
        const fn = cssLinear([
            { output: 0 },
            { output: 0.25, input: 75 },
            { output: 1 },
        ]);
        expect(fn(0)).toBe(0);
        // At t=0.75, output should be 0.25
        expect(fn(0.75)).toBeCloseTo(0.25, 10);
        expect(fn(1)).toBe(1);
    });

    it("single stop returns constant", () => {
        const fn = cssLinear([{ output: 0.5 }]);
        expect(fn(0)).toBe(0.5);
        expect(fn(0.5)).toBe(0.5);
        expect(fn(1)).toBe(0.5);
    });

    it("handles overshoot (output > 1)", () => {
        const fn = cssLinear([
            { output: 0 },
            { output: 1.5, input: 50 },
            { output: 1 },
        ]);
        expect(fn(0)).toBe(0);
        expect(fn(0.5)).toBeCloseTo(1.5, 10);
        expect(fn(1)).toBe(1);
    });

    it("clamps beyond range", () => {
        const fn = cssLinear([{ output: 0 }, { output: 1 }]);
        expect(fn(-0.5)).toBe(0);
        expect(fn(1.5)).toBe(1);
    });

    it("flat segment with two positions", () => {
        // When a stop has two input positions, it creates a flat segment
        // We model this as two stops with the same output
        const fn = cssLinear([
            { output: 0 },
            { output: 0.5, input: 25 },
            { output: 0.5, input: 75 },
            { output: 1 },
        ]);
        expect(fn(0)).toBe(0);
        expect(fn(0.25)).toBeCloseTo(0.5, 10);
        expect(fn(0.5)).toBeCloseTo(0.5, 10); // flat
        expect(fn(0.75)).toBeCloseTo(0.5, 10);
        expect(fn(1)).toBe(1);
    });
});
