import { describe, expect, it } from "vitest";
import { normalizeNumericUnits, normalizeValueUnits } from "../src/units/normalize";
import { ValueUnit } from "../src/units";

describe("normalizeNumericUnits", () => {
    it("should keep two px values as px", () => {
        const a = new ValueUnit(10, "px", ["length", "absolute"]);
        const b = new ValueUnit(20, "px", ["length", "absolute"]);
        const [na, nb] = normalizeNumericUnits(a, b);

        expect(na.unit).toBe("px");
        expect(nb.unit).toBe("px");
        expect(na.value).toBe(10);
        expect(nb.value).toBe(20);
    });

    it("should normalize cm and px to the same base unit (px)", () => {
        const a = new ValueUnit(2.54, "cm", ["length", "absolute"]);
        const b = new ValueUnit(96, "px", ["length", "absolute"]);
        const [na, nb] = normalizeNumericUnits(a, b);

        expect(na.unit).toBe("px");
        expect(nb.unit).toBe("px");
        expect(na.value).toBeCloseTo(96, 4);
        expect(nb.value).toBeCloseTo(96, 4);
    });

    it("should normalize angle units to deg", () => {
        const a = new ValueUnit(Math.PI, "rad", ["angle"]);
        const b = new ValueUnit(180, "deg", ["angle"]);
        const [na, nb] = normalizeNumericUnits(a, b);

        expect(na.unit).toBe("deg");
        expect(nb.unit).toBe("deg");
        expect(na.value).toBeCloseTo(180, 4);
        expect(nb.value).toBeCloseTo(180, 4);
    });

    it("should normalize time units to ms", () => {
        const a = new ValueUnit(1, "s", ["time"]);
        const b = new ValueUnit(500, "ms", ["time"]);
        const [na, nb] = normalizeNumericUnits(a, b);

        expect(na.unit).toBe("ms");
        expect(nb.unit).toBe("ms");
        expect(na.value).toBeCloseTo(1000, 4);
        expect(nb.value).toBeCloseTo(500, 4);
    });

    it("should normalize resolution units to dpi", () => {
        const a = new ValueUnit(1, "dppx", ["resolution"]);
        const b = new ValueUnit(96, "dpi", ["resolution"]);
        const [na, nb] = normalizeNumericUnits(a, b);

        expect(na.unit).toBe("dpi");
        expect(nb.unit).toBe("dpi");
        expect(na.value).toBeCloseTo(96, 4);
        expect(nb.value).toBeCloseTo(96, 4);
    });

    it("should return clones when superTypes differ", () => {
        const a = new ValueUnit(10, "px", ["length", "absolute"]);
        const b = new ValueUnit(90, "deg", ["angle"]);
        const [na, nb] = normalizeNumericUnits(a, b);

        // Should be clones, not the originals
        expect(na).not.toBe(a);
        expect(nb).not.toBe(b);
        // Values should remain unchanged
        expect(na.value).toBe(10);
        expect(na.unit).toBe("px");
        expect(nb.value).toBe(90);
        expect(nb.unit).toBe("deg");
    });

    it("should not modify originals when inplace is false (default)", () => {
        const a = new ValueUnit(1, "in", ["length", "absolute"]);
        const b = new ValueUnit(50, "px", ["length", "absolute"]);
        const [na, nb] = normalizeNumericUnits(a, b);

        // Originals should be unchanged
        expect(a.value).toBe(1);
        expect(a.unit).toBe("in");
        expect(b.value).toBe(50);
        expect(b.unit).toBe("px");

        // Results should be normalized
        expect(na.value).toBeCloseTo(96, 4);
        expect(na.unit).toBe("px");
    });

    it("should modify originals when inplace is true", () => {
        const a = new ValueUnit(1, "in", ["length", "absolute"]);
        const b = new ValueUnit(50, "px", ["length", "absolute"]);
        const [na, nb] = normalizeNumericUnits(a, b, true);

        // Originals should be modified
        expect(a.value).toBeCloseTo(96, 4);
        expect(a.unit).toBe("px");
        expect(b.value).toBe(50);
        expect(b.unit).toBe("px");

        // Returned values should be the same references
        expect(na).toBe(a);
        expect(nb).toBe(b);
    });

    it("should handle em + px with same superType (length)", () => {
        const a = new ValueUnit(2, "em", ["length", "relative"]);
        const b = new ValueUnit(32, "px", ["length", "absolute"]);
        const [na, nb] = normalizeNumericUnits(a, b);

        // Both should have the same superType category
        expect(a.superType[0]).toBe(b.superType[0]);
        expect(na.unit).toBe("px");
        expect(nb.unit).toBe("px");
    });
});

describe("normalizeValueUnits", () => {
    it("should return an InterpolatedVar with start, stop, value, computed", () => {
        const a = new ValueUnit(10, "px", ["length", "absolute"]);
        const b = new ValueUnit(20, "px", ["length", "absolute"]);
        const result = normalizeValueUnits(a, b);

        expect(result).toHaveProperty("start");
        expect(result).toHaveProperty("stop");
        expect(result).toHaveProperty("value");
        expect(result).toHaveProperty("computed");
    });

    it("should normalize units when they differ", () => {
        const a = new ValueUnit(1, "in", ["length", "absolute"]);
        const b = new ValueUnit(50, "px", ["length", "absolute"]);
        const result = normalizeValueUnits(a, b);

        expect(result.start.unit).toBe("px");
        expect(result.stop.unit).toBe("px");
        expect(result.start.value).toBeCloseTo(96, 4);
        expect(result.stop.value).toBe(50);
    });

    it("should set computed to false for non-computed units", () => {
        const a = new ValueUnit(10, "px", ["length", "absolute"]);
        const b = new ValueUnit(20, "px", ["length", "absolute"]);
        const result = normalizeValueUnits(a, b);

        expect(result.computed).toBe(false);
    });

    it("should set computed to true when a unit is var or calc", () => {
        const a = new ValueUnit("--my-var", "var");
        const b = new ValueUnit(20, "px", ["length", "absolute"]);
        const result = normalizeValueUnits(a, b);

        expect(result.computed).toBe(true);
    });
});
