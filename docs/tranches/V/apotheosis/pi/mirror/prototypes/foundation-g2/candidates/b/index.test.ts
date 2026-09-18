import { ParserState, type Parser } from "@mkbabb/parse-that/core";
import { describe, expect, it } from "vitest";

import fixtures from "../../fixtures.json" with { type: "json" };
import {
    cssComment,
    cssEscape,
    cssIdentifier,
    cssSpacing,
    cssString,
    cssWhitespace,
} from "./index.js";

const expectParse = (
    parser: { parseState(source: string): { value: unknown; offset: number; isError: boolean } },
    source: string,
    value: unknown,
    offset: number,
) => {
    const state = parser.parseState(source);
    expect(state.isError).toBe(false);
    expect(state.value).toEqual(value);
    expect(state.offset).toBe(offset);
};

describe("frozen fixtures", () => {
    it.each(fixtures.escape)("escape $source", ({ source, offset, ...value }) => {
        expectParse(cssEscape, source, value, offset);
    });

    it.each(fixtures.identifier)("identifier $source", ({ source, offset, ...value }) => {
        expectParse(cssIdentifier, source, value, offset);
    });

    it.each(fixtures.string)("string $source", ({ source, offset, ...value }) => {
        expectParse(cssString, source, value, offset);
    });

    it.each(fixtures.spacing)("spacing $source", ({ source, offset, ...value }) => {
        expectParse(cssSpacing, source, value, offset);
    });
});

describe("CSS Syntax boundaries", () => {
    it("preprocesses code points while retaining raw source offsets", () => {
        expectParse(cssWhitespace, "\r\n\f\r\t ", "\n\n\n\t ", 6);
        expectParse(cssIdentifier, "\0\ud800x", { value: "\ufffd\ufffdx", error: null }, 3);
        expectParse(cssString, "\"\0\udfff\"", {
            value: "\ufffd\ufffd",
            quote: "\"",
            error: null,
        }, 4);
    });

    it("accepts only the pinned non-ASCII ident union", () => {
        for (const source of ["\u00b7", "\u037d", "\u037f", "\u200c", "\u2040", "\ufeff", "\ud800\udc00"]) {
            expect(cssIdentifier.parseState(source).isError).toBe(false);
        }
        for (const source of ["\u00b6", "\u00d7", "\u037e", "\u200b", "\u206f", "\u2ff0", "\ufffe"]) {
            const state = cssIdentifier.parseState(source);
            expect(state.isError, source.codePointAt(0)?.toString(16)).toBe(true);
            expect(state.offset).toBe(0);
        }
        expectParse(cssIdentifier, "\\200b", { value: "\u200b", error: null }, 5);
    });

    it("enforces the three-code-point identifier start law", () => {
        for (const source of ["a", "_", "--", "-a", "-\\31 ", "\\31 ", "\\"]) {
            expect(cssIdentifier.parseState(source).isError, source).toBe(false);
        }
        for (const source of ["-", "-1", "1a", "\\\n", "-\\\n"]) {
            const state = cssIdentifier.parseState(source);
            expect(state.isError, source).toBe(true);
            expect(state.offset).toBe(0);
        }
    });

    it("handles escape bounds, terminator whitespace, and simple preprocessing", () => {
        expectParse(cssEscape, "\\1234567", { value: "\ufffd", error: null }, 7);
        expectParse(cssEscape, "\\41\r\nx", { value: "A", error: null }, 5);
        expectParse(cssEscape, "\\\0", { value: "\ufffd", error: null }, 2);
        expect(cssEscape.parseState("\\\r").isError).toBe(true);
    });

    it("leaves a bad string newline unconsumed and removes escaped newlines", () => {
        expectParse(cssString, "'a\\\r\nb'", { value: "ab", quote: "'", error: null }, 7);
        expectParse(cssString, "'a\rb", { value: "a", quote: "'", error: "newline" }, 2);
    });

    it("stops comments at the first close and recovers at EOF", () => {
        expectParse(cssComment, "/**/x", { error: null }, 4);
        expectParse(cssComment, "/*/**/*/", { error: null }, 6);
        expectParse(cssComment, "/*", { error: "unexpected-eof" }, 2);
        expectParse(cssSpacing, "/*x", { errors: ["unexpected-eof-comment"] }, 3);
    });

    it("fails transactionally", () => {
        for (const [parser, source] of [
            [cssEscape, "x"],
            [cssIdentifier, "-1"],
            [cssString, "x"],
            [cssWhitespace, "x"],
            [cssComment, "/x"],
            [cssSpacing, "x"],
        ] as const) {
            const state = parser.parseState(source);
            expect(state.isError).toBe(true);
            expect(state.offset).toBe(0);
        }
    });

    it.each([
        ["cssEscape", cssEscape, "\\\n"],
        ["cssIdentifier", cssIdentifier, "-1"],
        ["cssString", cssString, "x"],
        ["cssWhitespace", cssWhitespace, "x"],
        ["cssComment", cssComment, "/x"],
        ["cssSpacing", cssSpacing, "x"],
    ] as const)("restores the predecessor value when %s fails", (_name, parser, source) => {
        const predecessor = { sentinel: "predecessor" };
        const state = new ParserState<unknown>(source, predecessor);

        (parser as unknown as Parser<unknown>).call(state);

        expect(state.isError).toBe(true);
        expect(state.offset).toBe(0);
        expect(state.value).toBe(predecessor);
    });

    it("remains stack-safe on million-code-unit inputs", () => {
        const identifier = "a".repeat(1_000_000);
        expect(cssIdentifier.parseState(identifier).offset).toBe(identifier.length);
        const comment = `/*${"x".repeat(999_996)}*/`;
        expect(cssComment.parseState(comment).offset).toBe(comment.length);
    }, 20_000);
});
