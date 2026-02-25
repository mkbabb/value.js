import { assert, describe, expect, it } from "vitest";
import { CSSColor, parseCSSColor, parseCSSValueUnit } from "../src/parsing/units";
import { parseCSSValue, parseCSSTime, parseCSSPercent } from "../src/parsing/index";
import { parseResult } from "../src/parsing/utils";
import { UNITS } from "../src/units/constants";

const insertRandomWhitespace = (str: string) => {
    const whitespaceChars = [" ", "\t", "\n"];

    return str
        .split(" ")
        .map((word) => {
            if (Math.random() > 0.5) {
                return word;
            } else {
                const ws = whitespaceChars[
                    Math.floor(Math.random() * whitespaceChars.length)
                ].repeat(Math.floor(Math.random() * 10));

                return ws + word + ws;
            }
        })
        .join("");
};

// The parsable unit strings (exclude meta-units that are not directly parsable)
const PARSABLE_UNITS = UNITS.filter(
    (u): u is string =>
        u != null && u !== "" && !["var", "calc", "string", "color"].includes(u),
);

describe("CSSColor", () => {
    it("should parse CSS colors: rgb, rgba, hex, hsl, hsla, hsv, hwb, lab, lch, oklab, oklch, xyz, named, kelvin", () => {
        const colors = [
            // RGB / RGBA
            "rgb(0, 0, 0)",
            "rgba(0, 255, 0, 0)",
            "rgb(0, 255, 0 / 1)",

            // Hex (3-digit, 6-digit, 8-digit)
            "#000",
            "#ffffff",
            "#00ff00ff",

            // HSL / HSLA
            "hsl(0, 0%, 0%)",
            "hsla(0, 0%, 0% / 1)",

            // HSV / HSVA
            "hsv(0, 0%, 0%)",
            "hsva(0, 0%, 0%, 0)",

            // HWB / HWBA
            "hwb(0, 0%, 0%)",
            "hwba(0, 0%, 0%, 0)",

            // LAB / LABA
            "lab(0, 0%, 0%)",
            "laba(0, 0%, 0%, 0)",

            // LCH / LCHA
            "lch(0, 0%, 0%)",
            "lcha(0, 0%, 0%, 0)",

            // OKLAB / OKLABA
            "oklab(0, 0%, 0%)",
            "oklaba(0, 0%, 0%, 0)",

            // OKLCH / OKLCHA
            "oklch(0, 0%, 0%)",
            "oklcha(0, 0%, 0%, 0)",

            // XYZ / XYZA
            "xyz(0, 0%, 0%)",
            "xyza(0, 0%, 0%, 0)",

            // Named colors
            "aquamarine",
            "blue",

            // Kelvin
            "6500K",
        ];

        for (const color of colors) {
            const spacedColor = insertRandomWhitespace(color);
            const value = parseResult(CSSColor.Value, spacedColor);
            expect(value.status, `CSSColor.Value failed to parse: "${color}"`).toBe(
                true,
            );
        }
    });

    it("should fail to parse invalid CSS colors", () => {
        const colors = [
            "rgb(0, 0, 0, 0, 0)", // too many args
            "rgba(0, 255, 0, 0, 0)", // too many args
            "what!", // gibberish
        ];

        for (const color of colors) {
            const value = parseResult(CSSColor.Value, color);
            expect(value.status, `Should have failed on: "${color}"`).toBe(false);
        }
    });
});

describe("parseCSSColor", () => {
    it("should parse color strings and return a ValueUnit with unit 'color'", () => {
        const result = parseCSSColor("rgb(255, 0, 0)");
        expect(result.unit).toBe("color");
    });

    it("should parse hex colors", () => {
        const result = parseCSSColor("#ff0000");
        expect(result.unit).toBe("color");
    });

    it("should parse named colors", () => {
        const result = parseCSSColor("blue");
        expect(result.unit).toBe("color");
    });
});

describe("CSSValueUnit", () => {
    it("should parse all parsable CSS unit types", () => {
        PARSABLE_UNITS.forEach((unit) => {
            const cssValue = `1${unit}`;
            const value = parseCSSValueUnit(cssValue);
            assert.equal(
                value.toString(),
                `1${unit}`,
                `Failed to parse unit: "${unit}"`,
            );
        });
    });

    it("should parse all parsable CSS units with random whitespace", () => {
        PARSABLE_UNITS.forEach((unit) => {
            let cssValue = `1${unit}`;
            cssValue = insertRandomWhitespace(cssValue);
            const value = parseCSSValueUnit(cssValue);
            assert.equal(
                value.toString(),
                `1${unit}`,
                `Failed with whitespace for unit: "${unit}"`,
            );
        });
    });

    it("should parse CSS colors via parseCSSValueUnit and report unit as 'color'", () => {
        const colors = [
            "rgb(0, 0, 0)",
            "rgba(0, 255, 0, 0)",
            "#000",
            "#ffffff",
            "hsl(0, 0%, 0%)",
            "hsla(0, 0%, 0%, 0)",
            "aquamarine",
        ];

        colors.forEach((color) => {
            const value = parseCSSValueUnit(color);
            assert.equal(value.unit, "color", `Expected "color" unit for: "${color}"`);
        });
    });

    it("should parse a bare number as a unitless ValueUnit", () => {
        const value = parseCSSValueUnit("42");
        assert.equal(value.value, 42);
    });

    it("should parse negative values", () => {
        const value = parseCSSValueUnit("-10px");
        assert.equal(value.value, -10);
        assert.equal(value.unit, "px");
        assert.equal(value.toString(), "-10px");
    });

    it("should parse decimal values", () => {
        const value = parseCSSValueUnit("0.5em");
        assert.equal(value.value, 0.5);
        assert.equal(value.unit, "em");
        assert.equal(value.toString(), "0.5em");
    });
});

describe("parseCSSValue", () => {
    it("should parse simple value+unit strings", () => {
        const result = parseCSSValue("100px");
        expect(result.toString()).toBe("100px");
    });

    it("should parse a bare number", () => {
        const result = parseCSSValue("42");
        expect(result.valueOf()).toBe(42);
    });

    it("should parse var() functions", () => {
        const result = parseCSSValue("var(--foo)");
        expect(result.unit).toBe("var");
    });

    it("should parse calc() functions", () => {
        const result = parseCSSValue("calc(100px + 50px)");
        expect(result).toBeDefined();
    });

    it("should parse linear-gradient functions", () => {
        const result = parseCSSValue(
            "linear-gradient(to right, red, blue)",
        );
        expect(result).toBeDefined();
    });

    it("should parse color values", () => {
        const result = parseCSSValue("#ff0000");
        expect(result.unit).toBe("color");
    });

    it("should parse percentage values", () => {
        const result = parseCSSValue("50%");
        expect(result.valueOf()).toBe(50);
        expect(result.unit).toBe("%");
    });

    it("should parse angle values", () => {
        const result = parseCSSValue("90deg");
        expect(result.valueOf()).toBe(90);
        expect(result.unit).toBe("deg");
    });

    it("should parse time values", () => {
        const result = parseCSSValue("500ms");
        expect(result.valueOf()).toBe(500);
        expect(result.unit).toBe("ms");
    });
});

describe("parseCSSTime", () => {
    it("should parse milliseconds and return the numeric value", () => {
        assert.equal(parseCSSTime("1ms"), 1);
        assert.equal(parseCSSTime("100ms"), 100);
        assert.equal(parseCSSTime("10000ms"), 10000);
    });

    it("should parse seconds and convert to milliseconds", () => {
        assert.equal(parseCSSTime("1s"), 1000);
        assert.equal(parseCSSTime("0.5s"), 500);
        assert.equal(parseCSSTime("2s"), 2000);
    });
});

describe("parseCSSPercent", () => {
    it("should parse percentage strings and return the numeric value", () => {
        assert.equal(parseCSSPercent("50%"), 50);
        assert.equal(parseCSSPercent("0%"), 0);
        assert.equal(parseCSSPercent("100%"), 100);
    });

    it("should parse decimal percentages", () => {
        assert.equal(parseCSSPercent("33.3%"), 33.3);
        assert.equal(parseCSSPercent("0.1%"), 0.1);
    });

    it("should parse 'from' as 0% and 'to' as 100%", () => {
        assert.equal(parseCSSPercent("from"), 0);
        assert.equal(parseCSSPercent("to"), 100);
    });
});
