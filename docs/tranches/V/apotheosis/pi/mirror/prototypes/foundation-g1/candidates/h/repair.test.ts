import { all, ParserState, string } from "@mkbabb/parse-that/core";
import type { Parser } from "@mkbabb/parse-that/core";
import { describe, expect, it } from "vitest";
import {
    classifyCssUnit,
    cssDimension,
    cssEscape,
    cssIdentifier,
    cssPercentage,
    cssString,
} from "./index.js";

const success = <T>(
    parser: { parseState(source: string): { isError: boolean; value: T; offset: number } },
    source: string,
) => {
    const state = parser.parseState(source);
    expect(state.isError, source).toBe(false);
    return state;
};

const failure = (
    parser: { parseState(source: string): { isError: boolean; offset: number; furthest: number } },
    source: string,
) => {
    const state = parser.parseState(source);
    expect(state.isError, source).toBe(true);
    expect(state.offset, source).toBe(0);
    return state;
};

const parseAt = <T>(parser: Parser<T>, source: string, offset: number) =>
    parser.call(new ParserState<T>(source, undefined as T, offset));

describe("G1 exact identifier domain", () => {
    it("accepts every representative and boundary point in the restricted raw union", () => {
        for (const [source, value, offset] of [
            ["\0x", "�x", 2], ["\ud800x", "�x", 2], ["·x", "·x", 2],
            ["Àx", "Àx", 2], ["Öx", "Öx", 2], ["Øx", "Øx", 2],
            ["öx", "öx", 2], ["øx", "øx", 2], ["ͽx", "ͽx", 2],
            ["Ϳx", "Ϳx", 2], ["‌x", "‌x", 2], ["‍x", "‍x", 2],
            ["ⁿx", "ⁿx", 2], ["⿯x", "⿯x", 2], ["、x", "、x", 2],
            ["퟿x", "퟿x", 2], ["豈x", "豈x", 2], ["ﷰx", "ﷰx", 2],
            ["�x", "�x", 2], ["﻿x", "﻿x", 2], ["𐀀x", "𐀀x", 3],
        ] as const) {
            expect(success(cssIdentifier, source)).toMatchObject({ value, offset });
        }
    });

    it("rejects excluded raw points at start and preserves them as delimiters", () => {
        const excluded = [
            "\u0080", "\u00a0", "×", "÷", ";", "\u200e", "⁁",
            "\u206f", "←", "⿰", "\ue000", "﷐", "￾",
        ];

        for (const point of excluded) {
            failure(cssIdentifier, `${point}x`);
            expect(success(cssIdentifier, `a${point}x`)).toMatchObject({ value: "a", offset: 1 });
        }

        expect(success(cssDimension, `1px\u0080`)).toMatchObject({
            value: { unit: "px", family: "length" },
            offset: 3,
        });
        for (const point of ["\u0080", "\u00a0", "\u200e"]) {
            failure(cssDimension, `1${point}`);
        }
        expect(success(cssDimension, "1﻿")).toMatchObject({
            value: { unit: "﻿", family: null },
            offset: 2,
        });
    });

    it("allows excluded raw values when they are produced by escapes", () => {
        for (const [source, value, offset] of [
            ["\\80 x", "\u0080x", 5],
            ["\\a0 x", "\u00a0x", 5],
            ["\\200e x", "\u200ex", 7],
            ["\\feff x", "﻿x", 7],
            ["x\\d ", "x\r", 4],
            ["x\\c ", "x\f", 4],
        ] as const) {
            expect(success(cssIdentifier, source)).toMatchObject({ value, offset });
        }
    });
});

describe("G1 escape and string semantics", () => {
    it("does not preprocess decoded control escapes", () => {
        expect(success(cssEscape, "\\d ")).toMatchObject({ value: "\r", offset: 3 });
        expect(success(cssEscape, "\\c ")).toMatchObject({ value: "\f", offset: 3 });
        expect(success(cssString, "\"\\d \"")).toMatchObject({ value: "\r", offset: 5 });
        expect(success(cssString, "\"\\c \"")).toMatchObject({ value: "\f", offset: 5 });
    });

    it("treats escaped terminal quotes as content and closes only by grammar", () => {
        for (const [source, value, offset] of [
            ["\"\\22", "\"", 4],
            ["'\\27", "'", 4],
            ["\"x\\22y\"", "x\"y", 7],
        ] as const) {
            expect(success(cssString, source)).toMatchObject({ value, offset });
        }
    });

    it("rejects every raw newline spelling after a backslash with useful progress", () => {
        for (const source of ["\\\n", "\\\r", "\\\f", "\\\r\n"]) {
            expect(failure(cssEscape, source).furthest).toBe(1);
        }
    });
});

describe("G1 fresh results and parser state", () => {
    it("returns fresh classifier records and cannot poison later dimensions", () => {
        const first = classifyCssUnit("PX");
        const second = classifyCssUnit("px");
        expect(first).toEqual({ unit: "px", family: "length" });
        expect(second).toEqual(first);
        expect(second).not.toBe(first);

        if (first !== null) {
            first.unit = "poison";
            first.family = "angle";
        }

        expect(classifyCssUnit("px")).toEqual({ unit: "px", family: "length" });
        expect(success(cssDimension, "1px!")).toMatchObject({
            value: { unit: "px", family: "length" },
            offset: 3,
        });
    });

    it("returns fresh outer and nested result objects", () => {
        const firstPercentage = success(cssPercentage, "1%").value;
        const secondPercentage = success(cssPercentage, "1%").value;
        expect(secondPercentage).not.toBe(firstPercentage);
        expect(secondPercentage.number).not.toBe(firstPercentage.number);

        const firstDimension = success(cssDimension, "1px").value;
        const secondDimension = success(cssDimension, "1px").value;
        expect(secondDimension).not.toBe(firstDimension);
        expect(secondDimension.number).not.toBe(firstDimension.number);
    });

    it("rolls back at nonzero offsets while preserving diagnostic progress", () => {
        const prefix = "😀@@";
        const expectFailureAt = <T>(parser: Parser<T>, suffix: string, furthest: number) => {
            const state = parseAt(parser, prefix + suffix, prefix.length);
            expect(state.isError, suffix).toBe(true);
            expect(state.offset, suffix).toBe(prefix.length);
            expect(state.furthest, suffix).toBe(furthest);
        };

        expectFailureAt(cssEscape, "\\\n", 5);
        expectFailureAt(cssIdentifier, "-\\\n", 6);
        expectFailureAt(cssString, "\"a\nb\"", 6);
        expectFailureAt(cssDimension, "1-", 6);
    });

    it("remains directly parent-composable and preserves delimiters", () => {
        const parent = all(string("@"), cssDimension, string(","), cssPercentage, string("!"));
        expect(success(parent, "@1px,2%!")).toMatchObject({ offset: 8 });
        expect(success(cssDimension, "1px!")).toMatchObject({ offset: 3 });
        expect(success(cssDimension, "1\\80 ")).toMatchObject({
            value: { unit: "\u0080", family: null },
            offset: 5,
        });
        expect(success(cssDimension, "1x\\d ")).toMatchObject({
            value: { unit: "x\r", family: null },
            offset: 5,
        });
    });
});
