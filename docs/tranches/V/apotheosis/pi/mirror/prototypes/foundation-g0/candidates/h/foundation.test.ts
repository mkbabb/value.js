import { all, string } from "@mkbabb/parse-that/core";
import { describe, expect, it } from "vitest";
import {
    classifyCssUnit,
    cssComment,
    cssDimension,
    cssEscape,
    cssIdentifier,
    cssPercentage,
    cssString,
    cssTrivia,
    cssWhitespace,
} from "./index.js";

const success = <T>(parser: { parseState(source: string): { isError: boolean; value: T; offset: number } }, source: string) => {
    const state = parser.parseState(source);
    expect(state.isError, source).toBe(false);
    return state;
};

const failure = (parser: { parseState(source: string): { isError: boolean; offset: number } }, source: string) => {
    const state = parser.parseState(source);
    expect(state.isError, source).toBe(true);
    expect(state.offset, source).toBe(0);
};

describe("CSS code points and identifiers", () => {
    it("decodes escapes without losing source offsets", () => {
        for (const [source, value, offset] of [
            ["\\61 ", "a", 4], ["\\000061", "a", 7], ["\\110000", "�", 7],
            ["\\d800", "�", 5], ["\\0", "�", 2], ["\\1f600", "😀", 6],
            ["\\?", "?", 2], ["\\", "�", 1],
        ] as const) {
            expect(success(cssEscape, source)).toMatchObject({ value, offset });
        }
        for (const source of ["\\\n", "\\\r", "\\\f", "\\\r\n"]) failure(cssEscape, source);
    });

    it("applies the three-code-point start rule and consumes maximal names", () => {
        for (const [source, value, offset] of [
            ["foo!", "foo", 3], ["--", "--", 2], ["--x", "--x", 3], ["-x", "-x", 2],
            ["_x", "_x", 2], ["😀", "😀", 2], ["\\31 23", "123", 6],
            ["p\\78", "px", 4], ["-\\78", "-x", 4], ["\\", "�", 1],
            ["\0x", "�x", 2], ["\ud800x", "�x", 2],
        ] as const) {
            expect(success(cssIdentifier, source)).toMatchObject({ value, offset });
        }
        for (const source of ["", "-", "-1", "9x", "\\\n", "-\\\n"]) failure(cssIdentifier, source);
    });
});

describe("CSS trivia and strings", () => {
    it("composes normalized whitespace and comments, including EOF comments", () => {
        expect(success(cssWhitespace, "\r\n")).toMatchObject({ value: "\n", offset: 2 });
        expect(success(cssComment, "/*x")).toMatchObject({ value: "x", offset: 3 });
        expect(success(cssTrivia, " \t/*x*/\n!").offset).toBe(8);
        expect(success(cssTrivia, "").offset).toBe(0);
    });

    it("decodes strings, line continuations, preprocessing, and EOF close", () => {
        for (const [source, value, offset] of [
            ["\"a\"", "a", 3], ["'a'", "a", 3], ["\"a\\26 b\"", "a&b", 8],
            ["\"a\\\nb\"", "ab", 6], ["\"a\\\r\nb\"", "ab", 7], ["\"a", "a", 2],
            ["\"a\\", "a", 3], ["\"\0\"", "�", 3], ["\"\ud800\"", "�", 3],
        ] as const) {
            expect(success(cssString, source)).toMatchObject({ value, offset });
        }
        for (const source of ["\"a\nb\"", "'a\rb'", "\"a\fb\""]) failure(cssString, source);
    });
});

describe("CSS numeric values", () => {
    it("composes the accepted number into percentages transactionally", () => {
        expect(success(cssPercentage, "+.5%")).toMatchObject({
            value: { kind: "percentage", number: { sign: "+", type: "number", value: 0.5 } },
            offset: 4,
        });
        expect(success(cssPercentage, "1%%").offset).toBe(2);
        for (const source of ["%", "+%", "1e+%", "1 %"]) failure(cssPercentage, source);
    });

    it("parses complete decoded unit identifiers and classifies all 62 units", () => {
        expect(success(cssDimension, "-1.5e2PX")).toMatchObject({
            value: { kind: "dimension", number: { value: -150 }, unit: "px", family: "length" },
            offset: 8,
        });
        expect(success(cssDimension, "1p\\78")).toMatchObject({ value: { unit: "px", family: "length" }, offset: 5 });
        expect(success(cssDimension, "1px\\")).toMatchObject({ value: { unit: "px�", family: null }, offset: 4 });
        expect(success(cssDimension, "1px\\\n")).toMatchObject({ value: { unit: "px", family: "length" }, offset: 3 });
        expect(success(cssDimension, "1e+px")).toMatchObject({ value: { unit: "e", family: null }, offset: 2 });

        const expectedCounts = { length: 49, angle: 4, time: 2, frequency: 2, resolution: 4, flex: 1 };
        const units = [
            ...["px", "cm", "mm", "q", "in", "pc", "pt", "em", "rem", "ex", "rex", "cap", "rcap", "ch", "rch", "ic", "ric", "lh", "rlh", "vw", "vh", "vi", "vb", "vmin", "vmax", "lvw", "lvh", "lvi", "lvb", "lvmin", "lvmax", "svw", "svh", "svi", "svb", "svmin", "svmax", "dvw", "dvh", "dvi", "dvb", "dvmin", "dvmax", "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax"].map((unit) => [unit, "length"] as const),
            ...["deg", "grad", "rad", "turn"].map((unit) => [unit, "angle"] as const),
            ...["s", "ms"].map((unit) => [unit, "time"] as const),
            ...["hz", "khz"].map((unit) => [unit, "frequency"] as const),
            ...["dpi", "dpcm", "dppx", "x"].map((unit) => [unit, "resolution"] as const),
            ["fr", "flex"] as const,
        ];
        expect(units).toHaveLength(62);
        for (const [unit, family] of units) expect(classifyCssUnit(unit.toUpperCase())).toEqual({ unit, family });
        expect(Object.fromEntries(Object.keys(expectedCounts).map((family) => [family, units.filter(([, value]) => value === family).length]))).toEqual(expectedCounts);
        expect(classifyCssUnit("fóo")).toBeNull();
    });
});

describe("composition and hardening", () => {
    it("preserves delimiters and supports nonzero parent offsets", () => {
        const parent = all(string("@"), cssIdentifier, string("!")).map(([, name]) => name);
        expect(success(parent, "@foo!")).toMatchObject({ value: "foo", offset: 5 });
        expect(success(cssDimension, "1px,")).toMatchObject({ value: { unit: "px" }, offset: 3 });
    });

    it("keeps module parsers stable and does not throw on large inputs", () => {
        expect(cssIdentifier).toBe(cssIdentifier);
        expect(() => cssComment.parseState(`/*${"*".repeat(100_000)}`)).not.toThrow();
        expect(() => cssIdentifier.parseState(`a${"x".repeat(100_000)}`)).not.toThrow();
    });
});
