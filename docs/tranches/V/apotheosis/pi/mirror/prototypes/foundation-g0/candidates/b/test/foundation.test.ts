import { ParserState, string } from "@mkbabb/parse-that/core";
import { describe, expect, it } from "vitest";

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

describe("CSS code points and identifiers", () => {
    it.each([
        ["\\61 ", "a", 4],
        ["\\000061", "a", 7],
        ["\\110000", "\uFFFD", 7],
        ["\\d800", "\uFFFD", 5],
        ["\\0", "\uFFFD", 2],
        ["\\1f600", "😀", 6],
        ["\\?", "?", 2],
        ["\\", "\uFFFD", 1],
    ])("decodes escape %j", (source, value, offset) => {
        expect(cssEscape.parseState(source)).toMatchObject({ isError: false, value, offset });
    });

    it.each(["\\\n", "\\\r", "\\\f", "\\\r\n"])("rejects newline escape %j transactionally", (source) => {
        const previous = { previous: true };
        const state = new ParserState<any>(source, previous);
        cssEscape.call(state);
        expect(state).toMatchObject({ isError: true, offset: 0, value: previous });
    });

    it("consumes one astral or preprocessed name code point", () => {
        expect(cssNameCodePoint.parseState("😀x")).toMatchObject({ value: "😀", offset: 2 });
        expect(cssNameCodePoint.parseState("\0x")).toMatchObject({ value: "\uFFFD", offset: 1 });
        expect(cssNameCodePoint.parseState("\uD800x")).toMatchObject({ value: "\uFFFD", offset: 1 });
    });

    it.each([
        ["foo!", "foo", 3],
        ["--", "--", 2],
        ["-x", "-x", 2],
        ["\\31 23", "123", 6],
        ["p\\78", "px", 4],
        ["-\\78", "-x", 4],
        ["\\", "\uFFFD", 1],
        ["\0x", "\uFFFDx", 2],
        ["\uD800x", "\uFFFDx", 2],
    ])("decodes maximal identifier %j", (source, value, offset) => {
        expect(cssIdentifier.parseState(source)).toMatchObject({ isError: false, value, offset });
    });

    it.each(["", "-", "-1", "9x", "\\\n", "-\\\n"])("rejects non-ident %j", (source) => {
        expect(cssIdentifier.parseState(source)).toMatchObject({ isError: true, offset: 0 });
    });

    it("parses from a nonzero parent offset and preserves the delimiter", () => {
        const state = new ParserState<any>("xxp\\78!", null, 2);
        cssIdentifier.call(state);
        expect(state).toMatchObject({ isError: false, value: "px", offset: 6 });
        expect(state.src[state.offset]).toBe("!");
    });
});

describe("CSS trivia and strings", () => {
    it("normalizes whitespace while retaining source offsets", () => {
        expect(cssWhitespace.parseState("\r\n\f ")).toMatchObject({ value: "\n\n ", offset: 4 });
        expect(cssComment.parseState("/* unterminated")).toMatchObject({ isError: false, offset: 15 });
        expect(cssTrivia.parseState(" \t/*x*/\n!")).toMatchObject({ isError: false, offset: 8 });
        expect(cssTrivia.parseState("")).toMatchObject({ isError: false, value: "", offset: 0 });
    });

    it.each([
        ["\"a\"", "a", 3],
        ["'a'", "a", 3],
        ["\"a\\26 b\"", "a&b", 8],
        ["\"a\\\nb\"", "ab", 6],
        ["\"a\\\r\nb\"", "ab", 7],
        ["\"a", "a", 2],
        ["\"a\\", "a", 3],
        ["\"\0\"", "\uFFFD", 3],
        ["\"\uD800\"", "\uFFFD", 3],
    ])("decodes string %j", (source, value, offset) => {
        expect(cssString.parseState(source)).toMatchObject({ isError: false, value, offset });
    });

    it.each(["\"a\nb\"", "'a\rb'", "\"a\fb\""])("rejects an unescaped newline %j transactionally", (source) => {
        expect(cssString.parseState(source)).toMatchObject({ isError: true, offset: 0 });
    });
});

describe("CSS numeric value productions", () => {
    it("composes percentages without consuming a delimiter", () => {
        expect(cssPercentage.parseState("-1e2%%")).toMatchObject({
            isError: false,
            offset: 5,
            value: { kind: "percentage", number: { sign: "-", type: "number", value: -100 } },
        });
        expect(cssPercentage.parseState("1e+%")).toMatchObject({ isError: true, offset: 0 });
        expect(cssPercentage.skip(string(";")).parse("12%;")).toEqual({
            kind: "percentage",
            number: { sign: null, type: "integer", value: 12 },
        });
    });

    it.each([
        ["12px", "px", "length", 4],
        ["-1.5e2PX", "px", "length", 8],
        ["1p\\78", "px", "length", 5],
        ["1Q", "q", "length", 2],
        ["1foo", "foo", null, 4],
        ["1--x", "--x", null, 4],
        ["1\\", "\uFFFD", null, 2],
        ["1px\\", "px\uFFFD", null, 4],
        ["1px\\\n", "px", "length", 3],
        ["1px\0", "px\uFFFD", null, 4],
        ["1e+px", "e", null, 2],
    ])("parses dimension %j", (source, unit, family, offset) => {
        expect(cssDimension.parseState(source)).toMatchObject({
            isError: false,
            offset,
            value: { kind: "dimension", unit, family },
        });
    });

    it("classifies every current unit and preserves unknown spelling", () => {
        const lengths = [
            "px", "cm", "mm", "q", "in", "pc", "pt", "em", "rem", "ex", "rex", "cap", "rcap", "ch",
            "rch", "ic", "ric", "lh", "rlh", "vw", "vh", "vi", "vb", "vmin", "vmax", "lvw", "lvh", "lvi",
            "lvb", "lvmin", "lvmax", "svw", "svh", "svi", "svb", "svmin", "svmax", "dvw", "dvh", "dvi",
            "dvb", "dvmin", "dvmax", "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax",
        ];
        const others = ["deg", "grad", "rad", "turn", "s", "ms", "hz", "khz", "dpi", "dpcm", "dppx", "x", "fr"];
        expect(lengths).toHaveLength(49);
        expect([...lengths, ...others]).toHaveLength(62);
        for (const unit of lengths) expect(classifyCssUnit(unit.toUpperCase())).toEqual({ unit, family: "length" });
        expect(classifyCssUnit("DEG")).toEqual({ unit: "deg", family: "angle" });
        expect(classifyCssUnit("MS")).toEqual({ unit: "ms", family: "time" });
        expect(classifyCssUnit("KHZ")).toEqual({ unit: "khz", family: "frequency" });
        expect(classifyCssUnit("DPPX")).toEqual({ unit: "dppx", family: "resolution" });
        expect(classifyCssUnit("FR")).toEqual({ unit: "fr", family: "flex" });
        expect(classifyCssUnit("Foo")).toBeNull();
        expect(cssDimension.parse("1Foo")).toMatchObject({ unit: "Foo", family: null });
    });

    it("keeps singleton identities and does not throw on large input", () => {
        const identities = [cssEscape.id, cssIdentifier.id, cssString.id, cssPercentage.id, cssDimension.id];
        for (let index = 0; index < 500; index += 1) cssDimension.parseState(`${index}px`);
        expect([cssEscape.id, cssIdentifier.id, cssString.id, cssPercentage.id, cssDimension.id]).toEqual(identities);
        expect(() => cssIdentifier.parseState(`a${"x".repeat(100_000)}!`)).not.toThrow();
    });
});
