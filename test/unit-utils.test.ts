import { describe, expect, it } from "vitest";
import {
    isColorUnit,
    functionIdentityValue,
    convertToPixels,
    convertToDegrees,
    convertToMs,
    convertToDPI,
    convert2,
    flattenObject,
    unflattenObject,
    unflattenObjectToString,
    unpackMatrixValues,
} from "../src/units/utils";
import { ValueUnit, FunctionValue } from "../src/units";
import { Color, RGBColor } from "../src/units/color";

describe("isColorUnit", () => {
    it("should return true when unit is 'color'", () => {
        const color = new RGBColor(255, 0, 0);
        const vu = new ValueUnit(color, "color", ["color", "rgb"]);
        expect(isColorUnit(vu)).toBe(true);
    });

    it("should return false when unit is not 'color'", () => {
        const vu = new ValueUnit(10, "px", ["length", "absolute"]);
        expect(isColorUnit(vu as any)).toBe(false);
    });

    it("should return false for unitless values", () => {
        const vu = new ValueUnit(42);
        expect(isColorUnit(vu as any)).toBe(false);
    });
});

describe("convertToPixels", () => {
    it("should return px values unchanged", () => {
        expect(convertToPixels(100, "px")).toBe(100);
    });

    it("should convert cm to px (cm * 96 / 2.54)", () => {
        const result = convertToPixels(2.54, "cm");
        expect(result).toBeCloseTo(96, 6);
    });

    it("should convert mm to px (mm * 96 / 25.4)", () => {
        const result = convertToPixels(25.4, "mm");
        expect(result).toBeCloseTo(96, 6);
    });

    it("should convert in to px (in * 96)", () => {
        expect(convertToPixels(1, "in")).toBe(96);
        expect(convertToPixels(2, "in")).toBe(192);
    });

    it("should convert pt to px (pt * 4/3)", () => {
        const result = convertToPixels(12, "pt");
        expect(result).toBeCloseTo(16, 6);
    });

    it("should convert pc to px (pc * 16)", () => {
        expect(convertToPixels(1, "pc")).toBe(16);
        expect(convertToPixels(3, "pc")).toBe(48);
    });

    it("should handle zero values", () => {
        expect(convertToPixels(0, "cm")).toBe(0);
        expect(convertToPixels(0, "in")).toBe(0);
        expect(convertToPixels(0, "pt")).toBe(0);
    });
});

describe("convertToDegrees", () => {
    it("should return deg values unchanged", () => {
        expect(convertToDegrees(180, "deg")).toBe(180);
    });

    it("should convert grad to deg (grad * 0.9)", () => {
        expect(convertToDegrees(100, "grad")).toBeCloseTo(90, 6);
        expect(convertToDegrees(400, "grad")).toBeCloseTo(360, 6);
    });

    it("should convert rad to deg (rad * 180 / PI)", () => {
        expect(convertToDegrees(Math.PI, "rad")).toBeCloseTo(180, 6);
        expect(convertToDegrees(2 * Math.PI, "rad")).toBeCloseTo(360, 6);
    });

    it("should convert turn to deg (turn * 360)", () => {
        expect(convertToDegrees(1, "turn")).toBe(360);
        expect(convertToDegrees(0.5, "turn")).toBe(180);
        expect(convertToDegrees(0.25, "turn")).toBe(90);
    });

    it("should handle zero values", () => {
        expect(convertToDegrees(0, "grad")).toBe(0);
        expect(convertToDegrees(0, "rad")).toBe(0);
        expect(convertToDegrees(0, "turn")).toBe(0);
    });
});

describe("convertToMs", () => {
    it("should return ms values unchanged", () => {
        expect(convertToMs(500, "ms")).toBe(500);
    });

    it("should convert s to ms (s * 1000)", () => {
        expect(convertToMs(1, "s")).toBe(1000);
        expect(convertToMs(2.5, "s")).toBe(2500);
    });

    it("should handle zero", () => {
        expect(convertToMs(0, "s")).toBe(0);
    });
});

describe("convertToDPI", () => {
    it("should return dpi values unchanged", () => {
        expect(convertToDPI(96, "dpi")).toBe(96);
    });

    it("should convert dpcm to dpi (dpcm * 2.54)", () => {
        const result = convertToDPI(1, "dpcm");
        expect(result).toBeCloseTo(2.54, 6);
    });

    it("should convert dppx to dpi (dppx * 96)", () => {
        expect(convertToDPI(1, "dppx")).toBe(96);
        expect(convertToDPI(2, "dppx")).toBe(192);
    });
});

describe("convert2", () => {
    it("should convert between same-category length units", () => {
        // 1 inch = 96 px
        const result = convert2(1, "in", "px");
        expect(result).toBeCloseTo(96, 6);
    });

    it("should convert px to cm", () => {
        // 96 px = 2.54 cm
        const result = convert2(96, "px", "cm");
        expect(result).toBeCloseTo(2.54, 4);
    });

    it("should convert between angle units", () => {
        // 1 turn = 360 deg
        const result = convert2(1, "turn", "deg");
        expect(result).toBeCloseTo(360, 6);
    });

    it("should convert between time units", () => {
        // 1 s = 1000 ms
        const result = convert2(1, "s", "ms");
        expect(result).toBeCloseTo(1000, 6);
    });

    it("should convert between resolution units", () => {
        // 1 dppx = 96 dpi
        const result = convert2(1, "dppx", "dpi");
        expect(result).toBeCloseTo(96, 6);
    });

    it("should throw for incompatible units", () => {
        expect(() => convert2(1, "px", "deg")).toThrow("Incompatible units");
    });

    it("should return the same value when from and to are the same", () => {
        expect(convert2(42, "px", "px")).toBeCloseTo(42, 6);
        expect(convert2(90, "deg", "deg")).toBeCloseTo(90, 6);
    });
});

describe("flattenObject and unflattenObject", () => {
    it("should flatten a simple nested object", () => {
        const obj = { a: { b: 1 } };
        const flat = flattenObject(obj);
        expect(flat).toHaveProperty("a.b");
    });

    it("should unflatten a flat object back to nested", () => {
        const flat = { "a.b": [1], "a.c": [2] };
        const unflat = unflattenObject(flat);
        expect(unflat.a.b).toEqual([1]);
        expect(unflat.a.c).toEqual([2]);
    });

    it("should handle FunctionValue objects in flattenObject", () => {
        const fv = new FunctionValue("rotate", [
            new ValueUnit(45, "deg", ["angle"]),
        ]);
        const obj = { transform: fv };
        const flat = flattenObject(obj);
        expect(flat).toHaveProperty("transform.rotate");
    });

    it("should roundtrip flatten/unflatten for simple cases", () => {
        const flat = { "x.y": [10], "x.z": [20] };
        const unflat = unflattenObject(flat);
        expect(unflat.x.y).toEqual([10]);
        expect(unflat.x.z).toEqual([20]);
    });
});

describe("unpackMatrixValues", () => {
    it("should unpack a 2D matrix (6 values)", () => {
        // matrix(a, b, c, d, tx, ty) = matrix(1, 0, 0, 1, 10, 20)
        const fv = new FunctionValue("matrix", [
            new ValueUnit(1),
            new ValueUnit(0),
            new ValueUnit(0),
            new ValueUnit(1),
            new ValueUnit(10),
            new ValueUnit(20),
        ]);
        const result = unpackMatrixValues(fv);
        expect(result.scaleX).toBe(1);
        expect(result.scaleY).toBe(1);
        expect(result.translateX).toBe(10);
        expect(result.translateY).toBe(20);
        expect(result.skewX).toBe(0);
        expect(result.skewY).toBe(0);
    });

    it("emits 0 for the out-of-plane rotations of a 2D rotation matrix (lib-core P2-5)", () => {
        // matrix(cos, sin, -sin, cos, 0, 0) — a pure 45° in-plane rotation.
        // A 2D matrix is planar: only rotateZ is defined. The pre-fix branch
        // derived nonsense rotateX/rotateY (both ≈ π/4) via atan2 off the same
        // a/b/c/d cells; both MUST be identically 0 now.
        const c = Math.SQRT1_2; // cos 45° = sin 45° = √2/2
        const fv = new FunctionValue("matrix", [
            new ValueUnit(c),
            new ValueUnit(c),
            new ValueUnit(-c),
            new ValueUnit(c),
            new ValueUnit(0),
            new ValueUnit(0),
        ]);
        const result = unpackMatrixValues(fv);
        expect(result.rotateZ).toBeCloseTo(Math.PI / 4, 12);
        expect(result.rotateX).toBe(0);
        expect(result.rotateY).toBe(0);
    });

    it("should unpack a 3D matrix (16 values)", () => {
        // Identity matrix3d
        const values = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        const fv = new FunctionValue(
            "matrix3d",
            values.map((v) => new ValueUnit(v)),
        );
        const result = unpackMatrixValues(fv);
        expect(result.scaleX).toBe(1);
        expect(result.scaleY).toBe(1);
        expect(result.scaleZ).toBe(1);
        expect(result.translateX).toBe(0);
        expect(result.translateY).toBe(0);
        expect(result.translateZ).toBe(0);
    });

    it("should unpack a 3D matrix with 4 values (alternative form)", () => {
        const fv = new FunctionValue("matrix3d", [
            new ValueUnit(10),
            new ValueUnit(20),
            new ValueUnit(30),
            new ValueUnit(1),
        ]);
        const result = unpackMatrixValues(fv);
        expect(result.translateX).toBe(10);
        expect(result.translateY).toBe(20);
        expect(result.translateZ).toBe(30);
        expect(result.perspectiveW).toBe(1);
    });

    it("should throw for non-matrix function values", () => {
        const fv = new FunctionValue("rotate", [new ValueUnit(45, "deg")]);
        expect(() => unpackMatrixValues(fv)).toThrow(
            "Input must be a matrix or matrix3d value",
        );
    });
});

describe("functionIdentityValue (MCI-5 — identity-aware arity pad)", () => {
    it("returns the CSS multiplier identity 1 for brightness/contrast/saturate", () => {
        expect(functionIdentityValue("brightness")!.toString()).toBe("1");
        expect(functionIdentityValue("contrast")!.toString()).toBe("1");
        expect(functionIdentityValue("saturate")!.toString()).toBe("1");
        expect(functionIdentityValue("opacity")!.toString()).toBe("1");
    });

    it("returns the proportion identity 0 for grayscale/sepia/invert", () => {
        expect(functionIdentityValue("grayscale")!.toString()).toBe("0");
        expect(functionIdentityValue("sepia")!.toString()).toBe("0");
        expect(functionIdentityValue("invert")!.toString()).toBe("0");
    });

    it("carries the dimension: blur is 0px, hue-rotate is 0deg", () => {
        expect(functionIdentityValue("blur")!.toString()).toBe("0px");
        expect(functionIdentityValue("hue-rotate")!.toString()).toBe("0deg");
    });

    it("returns transform identities: scale 1, translate 0px, rotate/skew 0deg", () => {
        expect(functionIdentityValue("scale")!.toString()).toBe("1");
        expect(functionIdentityValue("scaleX")!.toString()).toBe("1");
        expect(functionIdentityValue("translate")!.toString()).toBe("0px");
        expect(functionIdentityValue("translateY")!.toString()).toBe("0px");
        expect(functionIdentityValue("rotate")!.toString()).toBe("0deg");
        expect(functionIdentityValue("skewX")!.toString()).toBe("0deg");
    });

    it("returns a ValueUnit whose unit + superType match a parsed sibling", () => {
        const blur = functionIdentityValue("blur")!;
        expect(blur).toBeInstanceOf(ValueUnit);
        expect(blur.value).toBe(0);
        expect(blur.unit).toBe("px");
        // Mirrors the parser's length leaf superType so normalizeValueUnits
        // reconciles the padded slot with the present sibling.
        expect(blur.superType).toEqual(["length", "absolute"]);

        const hueRot = functionIdentityValue("hue-rotate")!;
        expect(hueRot.unit).toBe("deg");
        expect(hueRot.superType).toEqual(["angle"]);

        const brightness = functionIdentityValue("brightness")!;
        expect(brightness.unit).toBeUndefined();
        expect(brightness.superType).toBeUndefined();
    });

    it("returns undefined for a function with no single-scalar identity", () => {
        // The pad falls back to its prior ValueUnit(0) for these — no worse than
        // pre-MCI-5.
        expect(functionIdentityValue("drop-shadow")).toBeUndefined();
        expect(functionIdentityValue("perspective")).toBeUndefined();
        expect(functionIdentityValue("totally-made-up")).toBeUndefined();
    });

    it("the brightness identity holds 1 at t=0 when padded then lerped", () => {
        // The witnessed gap: a bare ValueUnit(0) resolves 0 (black) at t=0; the
        // identity pad holds 1. Lerp brightness identity (1) -> 2 and assert the
        // endpoints directly (the value-domain half of the kf MCI-5 flip).
        const identity = functionIdentityValue("brightness")!;
        const start = Number(identity.value); // 1
        const stop = 2;
        const at = (t: number) => (1 - t) * start + t * stop;
        expect(at(0)).toBe(1); // holds the no-op identity at t=0, NOT 0
        expect(at(1)).toBe(2);
    });
});

describe("unflattenObjectToString (VJ-F4 — buffer-reusing serialize)", () => {
    it("serializes a nested flat key into a CSS function shorthand", () => {
        const flat = { transform: [["10px"]], "transform.translateX": [["10px"]] };
        const out = unflattenObjectToString(flat);
        expect(out.transform).toContain("translateX(10px)");
    });

    it("writes into a caller-supplied reuse target (returns the same object)", () => {
        const flat = { filter: [["blur(4px)"]], "filter.brightness": [[2]] };
        const reuse: Record<string, string> = {};
        const out = unflattenObjectToString(flat, reuse);
        expect(out).toBe(reuse); // wrote into the supplied map
    });

    it("is byte-identical with vs without the reuse target (isomorphism)", () => {
        const flat = {
            transform: [["10px"]],
            "transform.translateX": [["10px"]],
            "transform.rotate": [["45deg"]],
        };
        const fresh = unflattenObjectToString(flat);
        const reuse: Record<string, string> = {};
        const reused = unflattenObjectToString(flat, reuse);
        expect(reused).toEqual(fresh);
    });

    it("clears a stale key from a prior frame on reuse", () => {
        const reuse: Record<string, string> = {};
        unflattenObjectToString({ "transform.scale": [[2]] }, reuse);
        expect(reuse).toHaveProperty("transform");
        // A second frame with a DIFFERENT top-level key must not leak the first.
        unflattenObjectToString({ "filter.blur": [["4px"]] }, reuse);
        expect(reuse).not.toHaveProperty("transform");
        expect(reuse).toHaveProperty("filter");
    });

    it("preserves the single-key (no-nesting) value.toString() shape", () => {
        const flat = { opacity: [0.5] };
        const out = unflattenObjectToString(flat);
        expect(out.opacity).toBe("0.5");
    });
});
