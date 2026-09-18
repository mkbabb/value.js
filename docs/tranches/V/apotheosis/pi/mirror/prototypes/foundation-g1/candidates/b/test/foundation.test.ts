import { ParserState, string } from "@mkbabb/parse-that/core";
import { describe, expect, it } from "vitest";

import * as publicApi from "../index.js";
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

describe("CSS escape and identifier boundaries", () => {
    it.each([
        ["\\61 ", "a", 4],
        ["\\000061", "a", 7],
        ["\\110000", "\uFFFD", 7],
        ["\\d800", "\uFFFD", 5],
        ["\\0", "\uFFFD", 2],
        ["\\1f600", "😀", 6],
        ["\\?", "?", 2],
        ["\\", "\uFFFD", 1],
        ["\\d ", "\r", 3],
        ["\\c ", "\f", 3],
    ])("decodes escape %j without preprocessing its result", (source, value, offset) => {
        expect(cssEscape.parseState(source)).toMatchObject({ isError: false, value, offset });
    });

    it.each(["\\\n", "\\\r", "\\\f", "\\\r\n"])("rejects newline escape %j with progress", (source) => {
        const state = cssEscape.parseState(source);
        expect(state).toMatchObject({ isError: true, offset: 0, furthest: 1 });
    });

    it.each([
        ["\0x", "\uFFFDx", 2], ["\uD800x", "\uFFFDx", 2],
        ["·x", "·x", 2], ["Àx", "Àx", 2], ["Öx", "Öx", 2],
        ["Øx", "Øx", 2], ["öx", "öx", 2], ["øx", "øx", 2],
        ["ͽx", "ͽx", 2], ["Ϳx", "Ϳx", 2], ["\u200Cx", "\u200Cx", 2],
        ["\u200Dx", "\u200Dx", 2], ["ⁿx", "ⁿx", 2], ["⿯x", "⿯x", 2],
        ["、x", "、x", 2], ["퟿x", "퟿x", 2], ["豈x", "豈x", 2],
        ["ﷰx", "ﷰx", 2], ["\uFEFFx", "\uFEFFx", 2], ["�x", "�x", 2], ["𐀀x", "𐀀x", 3],
    ])("accepts exact raw identifier member %j", (source, value, offset) => {
        expect(cssIdentifier.parseState(source)).toMatchObject({ isError: false, value, offset });
    });

    it.each([
        "\u0080x", "\u00A0x", "×x", "÷x", ";x", "\u200Ex", "\u2041x",
        "\u206Fx", "←x", "\u2FF0x", "\uE000x", "﷐x", "\uFFFEx",
    ])("rejects excluded raw identifier member %j", (source) => {
        expect(cssIdentifier.parseState(source)).toMatchObject({ isError: true, offset: 0 });
        expect(cssNameCodePoint.parseState(source)).toMatchObject({ isError: true, offset: 0 });
        expect(cssIdentifier.parseState(`a${source}`)).toMatchObject({
            isError: false,
            value: "a",
            offset: 1,
        });
    });

    it.each([
        ["\\80 x", "\u0080x", 5],
        ["\\a0 x", "\u00A0x", 5],
        ["\\200e x", "\u200Ex", 7],
        ["\\feff x", "\uFEFFx", 7],
        ["x\\d ", "x\r", 4],
        ["x\\c ", "x\f", 4],
    ])("accepts escaped values outside the raw union %j", (source, value, offset) => {
        expect(cssIdentifier.parseState(source)).toMatchObject({ isError: false, value, offset });
    });

    it.each([
        ["foo!", "foo", 3], ["--", "--", 2], ["-x", "-x", 2],
        ["\\31 23", "123", 6], ["p\\78", "px", 4], ["-\\78", "-x", 4],
    ])("retains the B prefix-alternative identifier topology for %j", (source, value, offset) => {
        expect(cssIdentifier.parseState(source)).toMatchObject({ isError: false, value, offset });
    });

    it("rolls back failures while retaining useful nonzero-offset progress", () => {
        const prefix = "😀@@";
        const cases = [
            [cssEscape, "\\\n", 5],
            [cssIdentifier, "-\\\n", 6],
        ] as const;

        for (const [parser, suffix, furthest] of cases) {
            const state = new ParserState<any>(prefix + suffix, { prior: true }, 4);
            parser.call(state);
            expect(state).toMatchObject({ isError: true, offset: 4, furthest });
        }
    });
});

describe("CSS strings and trivia", () => {
    it.each([
        ["\"a\"", "a", 3], ["'a'", "a", 3], ["\"a\\26 b\"", "a&b", 8],
        ["\"a\\\nb\"", "ab", 6], ["\"a\\\r\nb\"", "ab", 7],
        ["\"a", "a", 2], ["\"a\\", "a", 3], ["\"\0\"", "\uFFFD", 3],
        ["\"\uD800\"", "\uFFFD", 3], ["\"\\22", "\"", 4], ["'\\27", "'", 4],
        ["\"\\d \"", "\r", 5], ["\"\\c \"", "\f", 5], ["\"x\\22y\"", "x\"y", 7],
    ])("decodes string %j from recognized branches", (source, value, offset) => {
        expect(cssString.parseState(source)).toMatchObject({ isError: false, value, offset });
    });

    it.each(["\"a\nb\"", "'a\rb'", "\"a\fb\""])("rejects unescaped newline %j with progress", (source) => {
        const state = cssString.parseState(source);
        expect(state).toMatchObject({ isError: true, offset: 0, furthest: 2 });
    });

    it("composes whitespace, comments, and trivia without a token-wide regex", () => {
        expect(cssWhitespace.parseState("\r\n\f ")).toMatchObject({ value: "\n\n ", offset: 4 });
        expect(cssComment.parseState("/* unterminated")).toMatchObject({ isError: false, offset: 15 });
        expect(cssTrivia.parseState(" \t/*x*/\n!")).toMatchObject({ isError: false, offset: 8 });
        expect(cssTrivia.parseState("")).toMatchObject({ isError: false, value: "", offset: 0 });
    });
});

describe("CSS numeric value leaves and state isolation", () => {
    it("composes percentages transactionally and freshly", () => {
        expect(cssPercentage.parseState("-1e2%%")).toMatchObject({
            isError: false,
            offset: 5,
            value: { kind: "percentage", number: { sign: "-", type: "number", value: -100 } },
        });
        const first = cssPercentage.parse("12%");
        const second = cssPercentage.parse("12%");
        expect(first).toEqual(second);
        expect(first).not.toBe(second);
        expect(first.number).not.toBe(second.number);
        expect(cssPercentage.skip(string(";")).parse("12%;")).toEqual(first);
    });

    it.each([
        ["12px", "px", "length", 4], ["-1.5e2PX", "px", "length", 8],
        ["1p\\78", "px", "length", 5], ["1Q", "q", "length", 2],
        ["1foo", "foo", null, 4], ["1--x", "--x", null, 4],
        ["1\\", "\uFFFD", null, 2], ["1px\\", "px\uFFFD", null, 4],
        ["1px\\\n", "px", "length", 3], ["1px\0", "px\uFFFD", null, 4],
        ["1e+px", "e", null, 2], ["1px\u0080", "px", "length", 3],
        ["1\\80 ", "\u0080", null, 5], ["1x\\d ", "x\r", null, 5],
        ["1px!", "px", "length", 3], ["1\uFEFF", "\uFEFF", null, 2],
    ])("parses dimension %j at its exact identifier boundary", (source, unit, family, offset) => {
        expect(cssDimension.parseState(source)).toMatchObject({
            isError: false,
            offset,
            value: { kind: "dimension", unit, family },
        });
    });

    it.each(["1\u0080", "1\u00A0", "1\u200E"])(
        "rejects a dimension starting with excluded raw point %j",
        (source) => expect(cssDimension.parseState(source)).toMatchObject({ isError: true, offset: 0 }),
    );

    it("returns fresh classification and parse objects despite hostile mutation", () => {
        const first = classifyCssUnit("PX")!;
        const second = classifyCssUnit("px")!;
        expect(first).not.toBe(second);
        first.unit = "poison";
        first.family = "angle";

        expect(classifyCssUnit("px")).toEqual({ unit: "px", family: "length" });
        const parsed = cssDimension.parse("1px");
        expect(parsed).toMatchObject({ unit: "px", family: "length" });
        expect(parsed).not.toBe(cssDimension.parse("1px"));
        expect(parsed.number).not.toBe(cssDimension.parse("1px").number);
    });

    it("retains dimension and percentage failure progress", () => {
        const prefix = "😀@@";
        const percentageState = new ParserState<any>(prefix + "12x", { prior: true }, 4);
        cssPercentage.call(percentageState);
        expect(percentageState).toMatchObject({ isError: true, offset: 4, furthest: 6 });

        const dimensionState = new ParserState<any>(prefix + "1-", { prior: true }, 4);
        cssDimension.call(dimensionState);
        expect(dimensionState).toMatchObject({ isError: true, offset: 4, furthest: 6 });
    });

    it("keeps singleton identity, explicit public surface, parent composition, and hostile-call safety", () => {
        expect(Object.keys(publicApi).sort()).toEqual([
            "classifyCssUnit", "cssComment", "cssDimension", "cssEscape", "cssIdentifier",
            "cssNameCodePoint", "cssPercentage", "cssString", "cssTrivia", "cssWhitespace",
        ]);
        const identities = [cssEscape.id, cssIdentifier.id, cssString.id, cssPercentage.id, cssDimension.id];
        expect(cssDimension.skip(string("!")).parse("1px!")).toMatchObject({ unit: "px", family: "length" });
        expect(() => cssIdentifier.parseState(`a${"x".repeat(100_000)}!`)).not.toThrow();
        expect([cssEscape.id, cssIdentifier.id, cssString.id, cssPercentage.id, cssDimension.id]).toEqual(identities);
    });
});
