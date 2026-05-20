import { describe, expect, it } from "vitest";
import { parseCSSValue, parseCSSTime, parseCSSPercent } from "../src/parsing/index";
import { parseCSSValueUnit } from "../src/parsing/units";
import { parseCSSColor } from "../src/parsing/color";
import { parseResult } from "../src/parsing/utils";
import { CSSColor } from "../src/parsing/color";

/**
 * Snapshot equivalence tests for BBNF migration.
 *
 * These capture the exact output of all parsers on a comprehensive
 * input corpus. After BBNF migration, identical outputs verify
 * functional equivalence.
 */

const VALUE_CORPUS = [
    // Length units
    "10px", "2.5em", "100rem", "50vh", "75vw", "-3.14mm", "0pt",
    // Angle units
    "90deg", "1.5rad", "200grad", "0.5turn",
    // Time units
    "500ms", "1.5s",
    // Resolution
    "96dpi", "2dppx",
    // Percentage
    "100%", "0%", "33.3%",
    // Bare numbers
    "42", "0", "-1", "3.14", "1e2",
    // None
    "none",
    // Slash
    "/",
];

const COLOR_CORPUS = [
    // Hex
    "#ff0000", "#000", "#ffffff", "#00ff00ff",
    // RGB / RGBA
    "rgb(255, 0, 0)", "rgba(0, 255, 0, 0.5)", "rgb(0 128 255 / 0.8)",
    // HSL / HSLA
    "hsl(120, 50%, 50%)", "hsla(0, 100%, 50%, 1)", "hsl(120deg 50% 50%)",
    // HSV / HSVA
    "hsv(0, 100%, 100%)",
    // HWB
    "hwb(120, 10%, 20%)",
    // LAB
    "lab(50, 20, -30)",
    // LCH
    "lch(50, 30, 120)",
    // OKLAB
    "oklab(0.5, 0.1, -0.1)",
    // OKLCH
    "oklch(0.7, 0.15, 180)",
    // XYZ
    "xyz(0.5, 0.5, 0.5)",
    // Named colors
    "red", "blue", "transparent", "aquamarine",
    // Kelvin
    "6500K",
    // color()
    "color(srgb 1 0 0)",
    "color(display-p3 1 0 0)",
    "color(srgb-linear 0.5 0.5 0.5)",
    // color-mix()
    "color-mix(in oklab, red, blue)",
    "color-mix(in oklch, red 30%, blue 70%)",
    "color-mix(in hsl, hsl(0, 100%, 50%), hsl(120, 100%, 50%))",
];

const FUNCTION_CORPUS = [
    "var(--x)",
    "var(--custom-property, fallback)",
    "calc(100% - 20px)",
    "calc(50px + 50px)",
    "cubic-bezier(0.25, 0.1, 0.25, 1)",
    "translate(10px, 20px)",
    "translateX(10px)",
    "scale(2)",
    "scaleY(0.5)",
    "rotate(45deg)",
    "linear-gradient(to right, red, blue)",
    "linear-gradient(90deg, #000, #fff)",
];

describe("BBNF Equivalence: parseCSSValueUnit", () => {
    for (const input of VALUE_CORPUS) {
        it(`parseCSSValueUnit("${input}")`, () => {
            const result = parseCSSValueUnit(input);
            expect({
                value: result.value,
                unit: result.unit,
                superType: result.superType,
            }).toMatchSnapshot();
        });
    }
});

describe("BBNF Equivalence: parseCSSColor", () => {
    for (const input of COLOR_CORPUS) {
        it(`parseCSSColor("${input}")`, () => {
            const result = parseCSSColor(input);
            expect({
                unit: result.unit,
                superType: result.superType,
                colorSpace: result.value?.colorSpace,
            }).toMatchSnapshot();
        });
    }
});

/** Safely serialize a parse result for snapshot comparison. */
function serializeResult(v: any): any {
    if (v == null) return v;
    if (typeof v === "number" || typeof v === "string" || typeof v === "boolean") return v;
    if (typeof v.valueOf === "function" && typeof v.valueOf() !== "object") {
        return { value: v.valueOf(), unit: v.unit, superType: v.superType, toString: v.toString() };
    }
    return v.toString();
}

describe("BBNF Equivalence: parseCSSValue", () => {
    const FULL_CORPUS = [...VALUE_CORPUS, ...COLOR_CORPUS, ...FUNCTION_CORPUS];
    for (const input of FULL_CORPUS) {
        it(`parseCSSValue("${input}")`, () => {
            const result = parseCSSValue(input);
            expect(serializeResult(result)).toMatchSnapshot();
        });
    }
});

describe("BBNF Equivalence: parseCSSTime", () => {
    const TIME_INPUTS = ["1ms", "100ms", "0.5s", "2s"];
    for (const input of TIME_INPUTS) {
        it(`parseCSSTime("${input}") = ${parseCSSTime(input)}`, () => {
            expect(parseCSSTime(input)).toMatchSnapshot();
        });
    }
});

describe("BBNF Equivalence: parseCSSPercent", () => {
    const PCT_INPUTS = ["0%", "50%", "100%", "33.3%", "from", "to"];
    for (const input of PCT_INPUTS) {
        it(`parseCSSPercent("${input}") = ${parseCSSPercent(input)}`, () => {
            expect(parseCSSPercent(input)).toMatchSnapshot();
        });
    }
});
