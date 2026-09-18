import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ParserState, type Parser } from "@mkbabb/parse-that";
import { describe, expect, it } from "vitest";

import {
    cssComment,
    cssEscape,
    cssIdentifier,
    cssSpacing,
    cssString,
    cssWhitespace,
    type CssEscape,
} from "../src/index.js";

type Fixture = {
    source: string;
    value?: string;
    quote?: '"' | "'";
    error?: null | string;
    errors?: string[];
    offset: number;
};

const fixturePath = fileURLToPath(new URL("../../../fixtures.json", import.meta.url));
const fixtures = JSON.parse(readFileSync(fixturePath, "utf8")) as Record<
    "escape" | "identifier" | "string" | "spacing",
    Fixture[]
>;

describe("frozen fixtures", () => {
    for (const fixture of fixtures.escape) {
        it(`escape ${JSON.stringify(fixture.source)}`, () => {
            const state = cssEscape.parseState(fixture.source);
            expect(state.isError).toBe(false);
            expect(state.value).toEqual({
                value: fixture.value,
                error: fixture.error,
            });
            expect(state.offset).toBe(fixture.offset);
        });
    }

    for (const fixture of fixtures.identifier) {
        it(`identifier ${JSON.stringify(fixture.source)}`, () => {
            const state = cssIdentifier.parseState(fixture.source);
            expect(state.isError).toBe(false);
            expect(state.value).toEqual({
                value: fixture.value,
                error: fixture.error,
            });
            expect(state.offset).toBe(fixture.offset);
        });
    }

    for (const fixture of fixtures.string) {
        it(`string ${JSON.stringify(fixture.source)}`, () => {
            const state = cssString.parseState(fixture.source);
            expect(state.isError).toBe(false);
            expect(state.value).toEqual({
                value: fixture.value,
                quote: fixture.quote,
                error: fixture.error,
            });
            expect(state.offset).toBe(fixture.offset);
        });
    }

    for (const fixture of fixtures.spacing) {
        it(`spacing ${JSON.stringify(fixture.source)}`, () => {
            const state = cssSpacing.parseState(fixture.source);
            expect(state.isError).toBe(false);
            expect(state.value).toEqual({ errors: fixture.errors });
            expect(state.offset).toBe(fixture.offset);
        });
    }
});

describe("preprocessing and escapes", () => {
    it("normalizes raw scalar hazards while retaining raw offsets", () => {
        expect(cssEscape.parseState("\\\0")).toMatchObject({
            offset: 2,
            value: { value: "\uFFFD", error: null },
        });
        expect(cssEscape.parseState("\\\uD800")).toMatchObject({
            offset: 2,
            value: { value: "\uFFFD", error: null },
        });
        expect(cssEscape.parseState("\\😀")).toMatchObject({
            offset: 3,
            value: { value: "😀", error: null },
        });
    });

    it("consumes exactly one preprocessed whitespace after hex", () => {
        expect(cssEscape.parseState("\\61\r\nx")).toMatchObject({
            offset: 5,
            value: { value: "a", error: null },
        });
        expect(cssEscape.parseState("\\61  x").offset).toBe(4);
    });

    it("rejects every raw spelling of backslash-newline transactionally", () => {
        for (const source of ["\\\n", "\\\r", "\\\r\n", "\\\f"]) {
            const state = cssEscape.parseState(source);
            expect(state.isError).toBe(true);
            expect(state.offset).toBe(0);
        }
    });
});

describe("identifiers", () => {
    it("implements the exact three-code-point start law", () => {
        for (const source of ["a", "_x", "--", "-x", "\\31 x", "-\\31 x"]) {
            expect(cssIdentifier.parseState(source).isError, source).toBe(false);
        }
        for (const source of ["-", "-1", "1x", "\\\n", "-\\\n"]) {
            const state = cssIdentifier.parseState(source);
            expect(state.isError, source).toBe(true);
            expect(state.offset, source).toBe(0);
        }
    });

    it("accepts every boundary of the June-2026 non-ASCII union", () => {
        const accepted = [
            0x00b7, 0x00c0, 0x00d6, 0x00d8, 0x00f6, 0x00f8, 0x037d, 0x037f, 0x1fff,
            0x200c, 0x200d, 0x203f, 0x2040, 0x2070, 0x218f, 0x2c00, 0x2fef, 0x3001,
            0xd7ff, 0xf900, 0xfdcf, 0xfdf0, 0xfffd, 0x10000, 0x10ffff,
        ];
        for (const codePoint of accepted) {
            const source = String.fromCodePoint(codePoint);
            expect(
                cssIdentifier.parseState(source).isError,
                `U+${codePoint.toString(16)}`,
            ).toBe(false);
        }
    });

    it("rejects raw excluded non-ASCII values but accepts them escaped", () => {
        const excluded = [
            0x0080, 0x00b6, 0x00b8, 0x00d7, 0x00f7, 0x037e, 0x200b, 0x200e, 0x203e,
            0x2041, 0x206f, 0x2190, 0x2bff, 0x2ff0, 0x3000, 0xfdd0, 0xfdef, 0xfffe,
            0xffff,
        ];
        for (const codePoint of excluded) {
            const source = String.fromCodePoint(codePoint);
            expect(
                cssIdentifier.parseState(source).isError,
                `raw U+${codePoint.toString(16)}`,
            ).toBe(true);
            expect(
                cssIdentifier.parseState(`\\${source}`).isError,
                `escaped U+${codePoint.toString(16)}`,
            ).toBe(false);
        }
    });

    it("preprocesses NUL and lone surrogates into valid U+FFFD", () => {
        expect(cssIdentifier.parse("\0x")).toEqual({ value: "\uFFFDx", error: null });
        expect(cssIdentifier.parse("\uD800x")).toEqual({
            value: "\uFFFDx",
            error: null,
        });
    });
});

describe("strings", () => {
    it("preprocesses content and removes every escaped newline spelling", () => {
        expect(cssString.parse('"\0\uD800"')).toEqual({
            value: "\uFFFD\uFFFD",
            quote: '"',
            error: null,
        });
        expect(cssString.parse("'a\\\r\nb\\\fc'")).toEqual({
            value: "abc",
            quote: "'",
            error: null,
        });
    });

    it("leaves each unescaped raw newline spelling unconsumed", () => {
        for (const newline of ["\n", "\r", "\r\n", "\f"]) {
            const state = cssString.parseState(`\"a${newline}b`);
            expect(state.value).toEqual({ value: "a", quote: '"', error: "newline" });
            expect(state.offset).toBe(2);
        }
    });
});

describe("whitespace and comments", () => {
    it("returns maximal preprocessed whitespace", () => {
        expect(cssWhitespace.parseState(" \t\r\n\fX")).toMatchObject({
            offset: 5,
            value: " \t\n\n",
        });
    });

    it("stops a comment at the first closing delimiter", () => {
        expect(cssComment.parseState("/*a*/b*/")).toMatchObject({
            offset: 5,
            value: { error: null },
        });
    });

    it("requires at least one spacing production", () => {
        expect(cssSpacing.parseState("").isError).toBe(true);
        expect(cssSpacing.parseState("x").isError).toBe(true);
    });
});

describe("linear hostile inputs", () => {
    it("handles million-code-unit direct terminals", () => {
        const million = "a".repeat(1_000_000);
        expect(cssIdentifier.parseState(million).offset).toBe(million.length);
        expect(cssString.parseState(`\"${million}`).offset).toBe(million.length + 1);
        expect(cssComment.parseState(`/*${million}`).offset).toBe(million.length + 2);
    });
});

describe("transactional failures", () => {
    const predecessor = { retained: true };

    function expectPredecessorRestored<T>(parser: Parser<T>, source: string): void {
        const state = new ParserState<T>(`!${source}`, predecessor as T, 1);

        parser.call(state);

        expect(state.isError).toBe(true);
        expect(state.offset).toBe(1);
        expect(state.value).toBe(predecessor);
    }

    it("restores the predecessor for every required export", () => {
        expectPredecessorRestored(cssEscape, "\\\n");
        expectPredecessorRestored(cssIdentifier, "1x");
        expectPredecessorRestored(cssString, "x");
        expectPredecessorRestored(cssWhitespace, "x");
        expectPredecessorRestored(cssComment, "x");
        expectPredecessorRestored(cssSpacing, "x");
    });

    it("covers the frozen escape transaction at offset zero", () => {
        const state = new ParserState<CssEscape>(
            "\\\n",
            predecessor as unknown as CssEscape,
        );

        cssEscape.call(state);

        expect(state).toMatchObject({ isError: true, offset: 0 });
        expect(state.value).toBe(predecessor);
    });
});
