import { describe, expect, it } from "vitest";
import { any, string } from "@mkbabb/parse-that/core";
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

const expectSuccess = <T>(
    parser: { parseState(source: string): { isError: boolean; value: T; offset: number } },
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
    parser: { parseState(source: string): { isError: boolean; offset: number } },
    source: string,
) => {
    const state = parser.parseState(source);
    expect(state.isError, source).toBe(true);
    expect(state.offset, source).toBe(0);
};

describe("CSS code points", () => {
    it("decodes simple, hexadecimal, replacement, astral, and terminal escapes", () => {
        expectSuccess(cssEscape, "\\61 ", "a");
        expectSuccess(cssEscape, "\\000061", "a");
        expectSuccess(cssEscape, "\\110000", "�");
        expectSuccess(cssEscape, "\\d800", "�");
        expectSuccess(cssEscape, "\\0", "�");
        expectSuccess(cssEscape, "\\1f600", "😀");
        expectSuccess(cssEscape, "\\?", "?");
        expectSuccess(cssEscape, "\\", "�");
        expectSuccess(cssEscape, "\\61\r\nx", "a", 5);
    });

    it("rejects every escaped newline transactionally", () => {
        for (const source of ["\\\n", "\\\r", "\\\f", "\\\r\n"]) {
            expectFailure(cssEscape, source);
        }
        expectSuccess(any(cssEscape, string("\\")), "\\\n", "\\", 1);
    });

    it("normalizes NUL and lone surrogates but preserves scalar code points", () => {
        expectSuccess(cssNameCodePoint, "\0", "�");
        expectSuccess(cssNameCodePoint, "\ud800", "�");
        expectSuccess(cssNameCodePoint, "😀", "😀", 2);
    });
});

describe("CSS identifiers", () => {
    it("implements the three-code-point start rule and maximal decoded name", () => {
        for (const [source, value, offset] of [
            ["foo!", "foo", 3], ["--", "--", 2], ["--x", "--x", 3],
            ["-x", "-x", 2], ["_x", "_x", 2], ["é", "é", 1],
            ["😀", "😀", 2], ["\\31 23", "123", 6], ["p\\78", "px", 4],
            ["-\\78", "-x", 4], ["\\", "�", 1], ["\0x", "�x", 2],
            ["\ud800x", "�x", 2],
        ] as const) {
            expectSuccess(cssIdentifier, source, value, offset);
        }
    });

    it("rejects invalid starts without consuming them", () => {
        for (const source of ["", "-", "-1", "9x", "\\\n", "-\\\n"]) {
            expectFailure(cssIdentifier, source);
        }
        expectSuccess(any(cssIdentifier, string("-")), "-", "-");
    });

    it("composes at a nonzero offset and preserves its delimiter", () => {
        expectSuccess(string("@").next(cssIdentifier), "@p\\78;", "px", 5);
    });
});

describe("CSS trivia", () => {
    it("normalizes whitespace while preserving source offsets", () => {
        expectSuccess(cssWhitespace, " \t\n!", " \t\n", 3);
        expectSuccess(cssWhitespace, "\r\n!", "\n", 2);
        expectSuccess(cssWhitespace, "\r!", "\n", 1);
        expectSuccess(cssWhitespace, "\f!", "\n", 1);
    });

    it("consumes closed and EOF-terminated comments", () => {
        expectSuccess(cssComment, "/**/", "");
        expectSuccess(cssComment, "/*x*/", "x");
        expectSuccess(cssComment, "/*x", "x");
        expectSuccess(cssComment, "/*", "");
        expectSuccess(cssTrivia, " \t/*x*/\n!", " \tx\n", 8);
        expectSuccess(cssTrivia, "/*a*//*b*/x", "ab", 10);
        expectSuccess(cssTrivia, "", "", 0);
    });
});

describe("CSS strings", () => {
    it("decodes quoted content, escapes, continuations, replacement, and EOF close", () => {
        for (const [source, value, offset] of [
            ["\"a\"", "a", 3], ["'a'", "a", 3], ["\"a\\26 b\"", "a&b", 8],
            ["\"a\\\nb\"", "ab", 6], ["\"a\\\r\nb\"", "ab", 7],
            ["\"a", "a", 2], ["\"a\\", "a", 3], ["\"\0\"", "�", 3],
            ["\"\ud800\"", "�", 3], ["\"😀\"", "😀", 4],
        ] as const) {
            expectSuccess(cssString, source, value, offset);
        }
    });

    it("fails transactionally before an unescaped newline", () => {
        for (const source of ["\"a\nb\"", "'a\rb'", "\"a\fb\""]) {
            expectFailure(cssString, source);
        }
    });
});

describe("CSS numeric values", () => {
    it("composes the accepted number parser into percentages", () => {
        expectSuccess(cssPercentage, "12%", {
            kind: "percentage", number: { sign: null, type: "integer", value: 12 },
        });
        expectSuccess(cssPercentage, "+.5%", {
            kind: "percentage", number: { sign: "+", type: "number", value: 0.5 },
        });
        expectSuccess(cssPercentage, "-1e2%", {
            kind: "percentage", number: { sign: "-", type: "number", value: -100 },
        });
        expectSuccess(cssPercentage, "1%%", {
            kind: "percentage", number: { sign: null, type: "integer", value: 1 },
        }, 2);
        for (const source of ["%", "+%", "1e+%", "1 %"]) expectFailure(cssPercentage, source);
    });

    it("parses complete decoded identifiers as known or unknown units", () => {
        expectSuccess(cssDimension, "12px", {
            kind: "dimension", number: { sign: null, type: "integer", value: 12 },
            unit: "px", family: "length",
        });
        expectSuccess(cssDimension, "-1.5e2PX", {
            kind: "dimension", number: { sign: "-", type: "number", value: -150 },
            unit: "px", family: "length",
        });
        expectSuccess(cssDimension, "1p\\78", {
            kind: "dimension", number: { sign: null, type: "integer", value: 1 },
            unit: "px", family: "length",
        });
        expectSuccess(cssDimension, "1foo", {
            kind: "dimension", number: { sign: null, type: "integer", value: 1 },
            unit: "foo", family: null,
        });
        expectSuccess(cssDimension, "1px\\", {
            kind: "dimension", number: { sign: null, type: "integer", value: 1 },
            unit: "px�", family: null,
        });
        expectSuccess(cssDimension, "1px\\\n", {
            kind: "dimension", number: { sign: null, type: "integer", value: 1 },
            unit: "px", family: "length",
        }, 3);
        expectSuccess(cssDimension, "1e+px", {
            kind: "dimension", number: { sign: null, type: "integer", value: 1 },
            unit: "e", family: null,
        }, 2);
        for (const source of ["1", "1-", "1 %", ".px", "+px"]) expectFailure(cssDimension, source);
    });

    it("classifies all 62 known units case-insensitively", () => {
        const families = {
            length: [
                "px", "cm", "mm", "q", "in", "pc", "pt", "em", "rem", "ex", "rex", "cap", "rcap",
                "ch", "rch", "ic", "ric", "lh", "rlh", "vw", "vh", "vi", "vb", "vmin", "vmax",
                "lvw", "lvh", "lvi", "lvb", "lvmin", "lvmax", "svw", "svh", "svi", "svb", "svmin",
                "svmax", "dvw", "dvh", "dvi", "dvb", "dvmin", "dvmax", "cqw", "cqh", "cqi", "cqb",
                "cqmin", "cqmax",
            ],
            angle: ["deg", "grad", "rad", "turn"],
            time: ["s", "ms"],
            frequency: ["hz", "khz"],
            resolution: ["dpi", "dpcm", "dppx", "x"],
            flex: ["fr"],
        } as const;
        expect(Object.values(families).flat()).toHaveLength(62);
        for (const [family, units] of Object.entries(families)) {
            for (const unit of units) {
                expect(classifyCssUnit(unit.toUpperCase())).toEqual({ unit, family });
            }
        }
        expect(classifyCssUnit("Foo")).toBeNull();
    });
});

describe("candidate invariants", () => {
    it("rolls aggregate failures back while retaining useful furthest progress", () => {
        for (const [parser, source, furthest] of [
            [cssEscape, "\\\n", 1],
            [cssIdentifier, "-", 1],
            [cssString, "\"a\nb\"", 2],
            [cssPercentage, "1e+%", 1],
            [cssDimension, "1-", 2],
        ] as const) {
            const state = parser.parseState(source);
            expect(state.isError).toBe(true);
            expect(state.offset).toBe(0);
            expect(state.furthest).toBe(furthest);
        }
    });

    it("exports stable parser singletons", async () => {
        const again = await import("../index.js");
        expect(again.cssIdentifier).toBe(cssIdentifier);
        expect(again.cssString).toBe(cssString);
        expect(again.cssDimension).toBe(cssDimension);
    });

    it("does not throw or recurse on a large maximal name", () => {
        const source = "a".repeat(100_000) + ";";
        const state = cssIdentifier.parseState(source);
        expect(state.isError).toBe(false);
        expect(state.offset).toBe(100_000);
        expect(state.value).toHaveLength(100_000);
    });
});
