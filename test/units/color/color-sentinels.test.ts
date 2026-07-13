import { describe, expect, it } from "vitest";
import { parseCSSColor } from "@src/parsing/color";
import { FunctionValue, ValueUnit } from "@src/units";
import { RGBColor } from "@src/units/color";

describe("VJ-3 currentColor sentinel", () => {
    it("parses currentColor to a typed color-keyword sentinel, not an RGB triple", () => {
        const cc = parseCSSColor("currentColor");
        expect(cc).toBeInstanceOf(ValueUnit);
        expect(cc.unit).toBe("color-keyword");
        expect(cc.value).toBe("currentColor"); // NOT baked to a Color
        expect(cc.superType).toEqual(["color"]);
    });

    it("is case-insensitive but serialises the canonical camelCase spelling", () => {
        expect(parseCSSColor("CURRENTCOLOR").value).toBe("currentColor");
        expect(parseCSSColor("currentcolor").value).toBe("currentColor");
    });

    it("survives a parse → serialize round-trip verbatim", () => {
        expect(parseCSSColor("currentColor").toString()).toBe("currentColor");
    });
});

describe("VJ-3 light-dark() sentinel", () => {
    it("parses light-dark() to a FunctionValue sentinel of two colors", () => {
        const ld = parseCSSColor("light-dark(white, black)");
        expect(ld.unit).toBe("color-keyword");
        const fn = ld.value as FunctionValue;
        expect(fn).toBeInstanceOf(FunctionValue);
        expect(fn.name).toBe("light-dark");
        expect(fn.values).toHaveLength(2);
    });

    it("resolves each arm to a real color (not deferred at the leaf level)", () => {
        const ld = parseCSSColor("light-dark(white, black)");
        const fn = ld.value as FunctionValue;
        // The arms are concrete colors; only the per-scheme PICK is deferred.
        expect((fn.values[0] as ValueUnit).value).toBeInstanceOf(RGBColor);
        expect((fn.values[1] as ValueUnit).value).toBeInstanceOf(RGBColor);
    });

    it("survives a parse → serialize round-trip as a light-dark() string", () => {
        const out = parseCSSColor("light-dark(white, black)").toString();
        expect(out).toMatch(/^light-dark\(/);
        expect(out).toContain("rgb(255 255 255)");
        expect(out).toContain("rgb(0 0 0)");
    });

    it("is case-insensitive on the function name", () => {
        const ld = parseCSSColor("LIGHT-DARK(white, black)");
        expect((ld.value as FunctionValue).name).toBe("light-dark");
    });

    it("nests a currentColor sentinel un-baked inside an arm", () => {
        const ld = parseCSSColor("light-dark(currentColor, red)");
        const fn = ld.value as FunctionValue;
        const arm0 = fn.values[0] as ValueUnit;
        expect(arm0.unit).toBe("color-keyword");
        expect(arm0.value).toBe("currentColor");
    });

    it("accepts functional-syntax colors in the arms", () => {
        const ld = parseCSSColor("light-dark(oklch(0.7 0.1 200), rgb(10 20 30))");
        const fn = ld.value as FunctionValue;
        expect(fn.values).toHaveLength(2);
        expect((fn.values[0] as ValueUnit).value).toBeInstanceOf(Object);
    });
});

describe("VJ-3 sentinel additions are byte-stable for existing inputs", () => {
    it("named colors in the l-bucket still resolve to RGB (lavender)", () => {
        expect(parseCSSColor("lavender").value).toBeInstanceOf(RGBColor);
    });

    it("named colors in the c-bucket still resolve to RGB (coral)", () => {
        expect(parseCSSColor("coral").value).toBeInstanceOf(RGBColor);
    });

    it("color-mix() in the c-bucket still parses", () => {
        const mix = parseCSSColor("color-mix(in oklab, red, blue)");
        expect(mix.unit).toBe("color");
        expect(mix.value).toBeInstanceOf(Object);
    });

    it("lab()/lch() in the l-bucket still parse", () => {
        expect(parseCSSColor("lab(50% 40 59.5)").unit).toBe("color");
        expect(parseCSSColor("lch(52.2% 72.2 50)").unit).toBe("color");
    });
});
