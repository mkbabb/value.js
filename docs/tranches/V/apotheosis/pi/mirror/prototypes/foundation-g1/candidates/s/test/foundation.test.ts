import { describe, expect, it } from "vitest";
import { any, string } from "@mkbabb/parse-that/core";
import type { Parser } from "@mkbabb/parse-that/core";
import {
    classifyCssUnit,
    cssComment,
    cssDimension,
    cssEscape,
    cssIdentifier,
    cssNameCodePoint,
    cssPercentage,
    cssString,
    cssTrivia,
    cssWhitespace,
} from "../index.js";

type TestParser<T> = {
    parseState(source: string): {
        isError: boolean;
        value: T;
        offset: number;
        furthest: number;
    };
};

const expectSuccess = <T>(
    parser: TestParser<T>,
    source: string,
    value: T,
    offset = source.length,
) => {
    const state = parser.parseState(source);
    expect(state.isError, source).toBe(false);
    expect(state.value, source).toEqual(value);
    expect(state.offset, source).toBe(offset);
};

const expectFailure = (
    parser: TestParser<unknown>,
    source: string,
    furthest?: number,
) => {
    const state = parser.parseState(source);
    expect(state.isError, source).toBe(true);
    expect(state.offset, source).toBe(0);
    if (furthest !== undefined) expect(state.furthest, source).toBe(furthest);
};

describe("G1 raw identifier domain", () => {
    it("accepts the exact union boundaries plus preprocessed raw values", () => {
        for (const [source, value, offset] of [
            ["\0x", "�x", 2], ["\ud800x", "�x", 2], ["·x", "·x", 2],
            ["Àx", "Àx", 2], ["Öx", "Öx", 2], ["Øx", "Øx", 2],
            ["öx", "öx", 2], ["øx", "øx", 2], ["ͽx", "ͽx", 2],
            ["Ϳx", "Ϳx", 2], ["\u200cx", "\u200cx", 2], ["\u200dx", "\u200dx", 2],
            ["ⁿx", "ⁿx", 2], ["⿯x", "⿯x", 2], ["、x", "、x", 2],
            ["퟿x", "퟿x", 2], ["豈x", "豈x", 2], ["ﷰx", "ﷰx", 2],
            ["\ufeffx", "\ufeffx", 2], ["�x", "�x", 2], ["𐀀x", "𐀀x", 3],
        ] as const) {
            expectSuccess(cssIdentifier, source, value, offset);
        }
    });

    it("rejects excluded raw points at start and preserves them as delimiters", () => {
        for (const point of [
            "\u0080", "\u00a0", "×", "÷", ";", "\u200e", "⁁", "\u206f",
            "←", "\u2ff0", "\ue000", "\ufdd0", "\ufffe",
        ]) {
            expectFailure(cssIdentifier, point + "x", 0);
            expectSuccess(cssIdentifier, "a" + point + "x", "a", 1);
        }
    });

    it("does not revalidate decoded escapes against the raw union", () => {
        for (const [source, value, offset] of [
            ["\\80 x", "\u0080x", 5],
            ["\\a0 x", "\u00a0x", 5],
            ["\\200e x", "\u200ex", 7],
            ["\\feff x", "\ufeffx", 7],
            ["x\\d ", "x\r", 4],
            ["x\\c ", "x\f", 4],
        ] as const) {
            expectSuccess(cssIdentifier, source, value, offset);
        }
    });
});

describe("escape, trivia, and string leaves", () => {
    it("decodes escapes without post-decoding preprocessing", () => {
        for (const [source, value, offset] of [
            ["\\61 ", "a", 4], ["\\000061", "a", 7], ["\\110000", "�", 7],
            ["\\d800", "�", 5], ["\\0", "�", 2], ["\\1f600", "😀", 6],
            ["\\?", "?", 2], ["\\", "�", 1], ["\\d ", "\r", 3],
            ["\\c ", "\f", 3],
        ] as const) {
            expectSuccess(cssEscape, source, value, offset);
        }
        for (const source of ["\\\n", "\\\r", "\\\f", "\\\r\n"]) {
            expectFailure(cssEscape, source, 1);
        }
        expectSuccess(any(cssEscape, string("\\")), "\\\n", "\\", 1);
        expectSuccess(cssNameCodePoint, "\udfff", "�");
    });

    it("keeps direct whitespace/comment/trivia composition", () => {
        expectSuccess(cssWhitespace, "\r\n!", "\n", 2);
        expectSuccess(cssComment, "/*x", "x");
        expectSuccess(cssTrivia, " \t/*x*/\n!", " \tx\n", 8);
        expectSuccess(cssTrivia, "", "", 0);
    });

    it("recognizes closure by grammar branch, including escaped terminal quotes", () => {
        for (const [source, value, offset] of [
            ["\"\\22", "\"", 4], ["'\\27", "'", 4],
            ["\"\\d \"", "\r", 5], ["\"\\c \"", "\f", 5],
            ["\"x\\22y\"", "x\"y", 7], ["\"a\\\nb\"", "ab", 6],
            ["\"a\\", "a", 3], ["\"\0\"", "�", 3],
        ] as const) {
            expectSuccess(cssString, source, value, offset);
        }
        for (const source of ["\"a\nb\"", "'a\rb'", "\"a\fb\""]) {
            expectFailure(cssString, source, 2);
        }
    });
});

describe("numeric composition and immutable results", () => {
    it("preserves excluded raw delimiters when parsing dimensions", () => {
        for (const [source, unit, family, offset] of [
            ["1px\u0080", "px", "length", 3],
            ["1\\80 ", "\u0080", null, 5],
            ["1x\\d ", "x\r", null, 5],
            ["1px!", "px", "length", 3],
            ["1\ufeff", "\ufeff", null, 2],
        ] as const) {
            const state = cssDimension.parseState(source);
            expect(state.isError, source).toBe(false);
            expect(state.offset, source).toBe(offset);
            expect(state.value.unit, source).toBe(unit);
            expect(state.value.family, source).toBe(family);
        }
        for (const source of ["1\u0080", "1\u00a0", "1\u200e"]) {
            expectFailure(cssDimension, source, 1);
        }
    });

    it("returns fresh classifier, percentage, dimension, and numeric objects", () => {
        for (const unit of ["px", "PX", "deg", "ms", "khz", "dppx", "fr"]) {
            const first = classifyCssUnit(unit);
            const second = classifyCssUnit(unit);
            expect(first).toEqual(second);
            expect(first).not.toBe(second);
            if (first !== null) {
                first.unit = "poison";
                first.family = "angle";
            }
            expect(classifyCssUnit(unit)).toEqual(second);
        }

        const percentageA = cssPercentage.parseState("12%").value;
        const percentageB = cssPercentage.parseState("12%").value;
        expect(percentageA).not.toBe(percentageB);
        expect(percentageA.number).not.toBe(percentageB.number);

        const dimensionA = cssDimension.parseState("1px").value;
        dimensionA.unit = "poison";
        dimensionA.number.value = 999;
        expect(cssDimension.parseState("1px").value).toEqual({
            kind: "dimension",
            number: { sign: null, type: "integer", value: 1 },
            unit: "px",
            family: "length",
        });
    });
});

describe("state and composition invariants", () => {
    it("rolls aggregate failures back with useful furthest progress", () => {
        for (const [parser, source, furthest] of [
            [cssEscape, "\\\n", 1],
            [cssIdentifier, "-\\\n", 2],
            [cssString, "\"a\nb\"", 2],
            [cssPercentage, "1e+%", 1],
            [cssDimension, "1-", 2],
        ] as const) {
            expectFailure(parser, source, furthest);
        }
    });

    it("retains absolute progress inside a failing nonzero-offset parent", () => {
        const prefix = string("😀@@");
        const expectPrefixedFailure = <T>(parser: Parser<T>, source: string, furthest: number) => {
            expectFailure(prefix.next(parser), "😀@@" + source, furthest);
        };
        expectPrefixedFailure(cssEscape, "\\\n", 5);
        expectPrefixedFailure(cssIdentifier, "-\\\n", 6);
        expectPrefixedFailure(cssString, "\"a\nb\"", 6);
        expectPrefixedFailure(cssPercentage, "1e+%", 5);
        expectPrefixedFailure(cssDimension, "1-", 6);
    });

    it("preserves delimiters, singleton identity, and large-input safety", async () => {
        expectSuccess(string("@").next(cssIdentifier).skip(string(";")), "@p\\78;", "px", 6);
        const again = await import("../index.js");
        expect(again.cssIdentifier).toBe(cssIdentifier);
        expect(again.cssString).toBe(cssString);
        expect(again.cssDimension).toBe(cssDimension);

        const source = "a".repeat(100_000) + ";";
        expectSuccess(cssIdentifier, source, "a".repeat(100_000), 100_000);
    });
});
