import { readFileSync } from "node:fs";
import { ParserState, type Parser } from "@mkbabb/parse-that/core";
import { describe, expect, test } from "vitest";

import * as candidate from "./index.js";
import {
    cssComment,
    cssEscape,
    cssIdentifier,
    cssSpacing,
    cssString,
    cssWhitespace,
} from "./index.js";

type Fixture = {
    source: string;
    value?: string;
    quote?: "\"" | "'";
    error?: string | null;
    errors?: string[];
    offset: number;
};

type Fixtures = Record<"escape" | "identifier" | "string" | "spacing", Fixture[]>;

const fixtures = JSON.parse(
    readFileSync(new URL("../../fixtures.json", import.meta.url), "utf8"),
) as Fixtures;

test("exports exactly the six required runtime productions", () => {
    expect(Object.keys(candidate).sort()).toEqual([
        "cssComment",
        "cssEscape",
        "cssIdentifier",
        "cssSpacing",
        "cssString",
        "cssWhitespace",
    ]);
});

describe("frozen fixtures", () => {
    test.each(fixtures.escape)("escape $source", (fixture) => {
        const state = cssEscape.parseState(fixture.source);
        expect(state.isError).toBe(false);
        expect(state.value).toEqual({
            value: fixture.value,
            error: fixture.error,
        });
        expect(state.offset).toBe(fixture.offset);
    });

    test.each(fixtures.identifier)("identifier $source", (fixture) => {
        const state = cssIdentifier.parseState(fixture.source);
        expect(state.isError).toBe(false);
        expect(state.value).toEqual({
            value: fixture.value,
            error: fixture.error,
        });
        expect(state.offset).toBe(fixture.offset);
    });

    test.each(fixtures.string)("string $source", (fixture) => {
        const state = cssString.parseState(fixture.source);
        expect(state.isError).toBe(false);
        expect(state.value).toEqual({
            value: fixture.value,
            quote: fixture.quote,
            error: fixture.error,
        });
        expect(state.offset).toBe(fixture.offset);
    });

    test.each(fixtures.spacing)("spacing $source", (fixture) => {
        const state = cssSpacing.parseState(fixture.source);
        expect(state.isError).toBe(false);
        expect(state.value).toEqual({ errors: fixture.errors });
        expect(state.offset).toBe(fixture.offset);
    });
});

describe("preprocessing and boundary laws", () => {
    test("preprocesses raw whitespace without losing source offsets", () => {
        const state = cssWhitespace.parseState(" \r\n\f\r\t");
        expect(state.value).toBe(" \n\n\n\t");
        expect(state.offset).toBe(6);
    });

    test("preprocesses NUL and lone surrogates in semantic values", () => {
        expect(cssIdentifier.parse("\0\uD800x")).toEqual({
            value: "��x",
            error: null,
        });
        expect(cssString.parse("\"\0\uDC00\"")).toEqual({
            value: "��",
            quote: "\"",
            error: null,
        });
        expect(cssEscape.parse("\\\uD800")).toEqual({
            value: "�",
            error: null,
        });
    });

    test("implements the exact non-ASCII identifier union", () => {
        for (const source of ["\u00B7", "\u037F", "\u200C", "\u203F", "\uFEFF", "\u{10000}"]) {
            expect(cssIdentifier.parseState(source).isError).toBe(false);
        }
        for (const source of ["\u00B6", "\u00D7", "\u037E", "\u200B", "\u200E", "\u2041", "\u206F", "\u2190", "\u2FF0", "\u3000", "\uFDD0", "\uFFFE"]) {
            const state = cssIdentifier.parseState(source);
            expect(state.isError, source.codePointAt(0)?.toString(16)).toBe(true);
            expect(state.offset).toBe(0);
        }
        expect(cssIdentifier.parse("\\200b")).toEqual({
            value: "\u200B",
            error: null,
        });
    });

    test("enforces identifier starts and maximal continuation", () => {
        expect(cssIdentifier.parseState("-x.rest")).toMatchObject({
            value: { value: "-x", error: null },
            offset: 2,
            isError: false,
        });
        for (const source of ["-", "1x", "\\\n", "-\\\r\n"]) {
            const state = cssIdentifier.parseState(source);
            expect(state.isError).toBe(true);
            expect(state.offset).toBe(0);
            expect(state.furthest).toBeGreaterThanOrEqual(0);
        }
        expect(cssIdentifier.parse("\\")).toEqual({
            value: "�",
            error: "unexpected-eof",
        });
    });

    test("handles escape limits, whitespace, and EOF recovery", () => {
        expect(cssEscape.parseState("\\10ffff\r\nx")).toMatchObject({
            value: { value: "\u{10FFFF}", error: null },
            offset: 9,
            isError: false,
        });
        expect(cssEscape.parseState("\\1234567")).toMatchObject({
            value: { value: "�", error: null },
            offset: 7,
            isError: false,
        });
        const invalid = cssEscape.parseState("\\\f");
        expect(invalid.isError).toBe(true);
        expect(invalid.offset).toBe(0);
        expect(invalid.furthest).toBeGreaterThanOrEqual(1);
    });

    test("removes escaped newlines and preserves unescaped newlines", () => {
        expect(cssString.parse("'a\\\r\nb'")).toEqual({
            value: "ab",
            quote: "'",
            error: null,
        });
        const state = cssString.parseState("\"a\r\nb");
        expect(state.value).toEqual({ value: "a", quote: "\"", error: "newline" });
        expect(state.offset).toBe(2);
    });
});

describe("transactional failures", () => {
    const expectPredecessorRestored = <T>(
        parser: Parser<T>,
        source: string,
    ): void => {
        const predecessor = { source: "predecessor" };
        const state = new ParserState<T>(source, predecessor as T);

        parser.call(state);

        expect(state.isError).toBe(true);
        expect(state.offset).toBe(0);
        expect(state.value).toBe(predecessor);
        expect(state.furthest).toBeGreaterThanOrEqual(0);
    };

    test("restores the predecessor for every required export", () => {
        expectPredecessorRestored(cssEscape, "\\\n");
        expectPredecessorRestored(cssIdentifier, "-");
        expectPredecessorRestored(cssString, "x");
        expectPredecessorRestored(cssWhitespace, "x");
        expectPredecessorRestored(cssComment, "/");
        expectPredecessorRestored(cssSpacing, "x");
    });
});

describe("comments and spacing", () => {
    test("stops at the first comment closer", () => {
        expect(cssComment.parseState("/*a*/tail")).toMatchObject({
            value: { error: null },
            offset: 5,
            isError: false,
        });
    });

    test("recovers an unterminated comment at EOF", () => {
        expect(cssComment.parseState("/***")).toMatchObject({
            value: { error: "unexpected-eof" },
            offset: 4,
            isError: false,
        });
        expect(cssSpacing.parse("\t/***")).toEqual({
            errors: ["unexpected-eof-comment"],
        });
    });

    test("requires every exported spacing leaf to consume", () => {
        for (const parser of [cssWhitespace, cssComment, cssSpacing]) {
            const state = parser.parseState("");
            expect(state.isError).toBe(true);
            expect(state.offset).toBe(0);
        }
    });
});

describe("scale and hostile input", () => {
    test("consumes million-code-unit chunks", () => {
        const million = "a".repeat(1_000_000);
        expect(cssIdentifier.parseState(million).offset).toBe(million.length);
        expect(cssString.parseState(`"${million}"`).offset).toBe(million.length + 2);
        expect(cssComment.parseState(`/*${million}`)).toMatchObject({
            offset: million.length + 2,
            value: { error: "unexpected-eof" },
            isError: false,
        });
        expect(cssWhitespace.parseState(" ".repeat(1_000_000)).offset).toBe(1_000_000);
    });

    test("does not throw on hostile surrogate and backslash runs", () => {
        const hostile = `"${"\uD800\\".repeat(20_000)}`;
        expect(() => cssString.parseState(hostile)).not.toThrow();
    });
});
