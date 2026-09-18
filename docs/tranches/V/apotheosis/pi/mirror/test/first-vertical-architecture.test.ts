import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Parser, string as literal } from "@mkbabb/parse-that";
import { describe, expect, it } from "vitest";
import * as live from "../../../../../../../dist/subpaths/css.js";
import * as colorModule from "../grammar/color.js";
import * as valueModule from "../grammar/value.js";
import { parseCssColor, parseCssValue } from "../index.js";
import type { ParseResult } from "../types.js";

type GrammarModule = Readonly<Record<string, unknown>>;

function projection<T>(result: ParseResult<T>): unknown {
    return result.ok
        ? { ok: true, value: result.value }
        : {
            ok: false,
            code: result.diagnostics[0]?.code,
            expected: result.diagnostics[0]?.expected,
        };
}

function requireGrammar(module: GrammarModule, name: string): Parser<unknown> {
    const grammar = module[name];
    expect(grammar, `${name} must be an exported parse-that Parser`).toBeInstanceOf(Parser);
    if (!(grammar instanceof Parser)) throw new Error(`${name} is not an exported parse-that Parser`);
    return grammar;
}

function expectAccepted(parse: (source: string) => ParseResult<unknown>, source: string): void {
    expect(parse(source).ok, source).toBe(true);
}

function expectRejected(parse: (source: string) => ParseResult<unknown>, source: string): void {
    expect(parse(source).ok, source).toBe(false);
}

describe("first vertical: parser-offset composition", () => {
    it("exports value and color grammars that stop before a caller-owned declaration delimiter", () => {
        const cases: readonly [Parser<unknown>, string][] = [
            [requireGrammar(valueModule, "cssValueGrammar"), "outer(inner(a, b/c), [d,e], {f/g})"],
            [requireGrammar(colorModule, "cssColorGrammar"), "rgb(12 34 56 / 50%)"],
        ];

        for (const [grammar, source] of cases) {
            const input = `${source};tail`;
            const state = grammar.parseState(input);
            expect(state.isError, source).toBe(false);
            expect(state.offset, source).toBe(source.length);
            expect(input.slice(state.offset), source).toBe(";tail");

            const composed = grammar.skip(literal(";")).parseState(input);
            expect(composed.isError, source).toBe(false);
            expect(composed.offset, source).toBe(source.length + 1);
            expect(input.slice(composed.offset), source).toBe("tail");
        }
    });

    it("keeps exported grammars on the same CSS-preprocessed dialect as public doors", () => {
        for (const source of ["a\r\nb", "a\fb", "\0", "a\0b", "url(a\0b)", "[a\0b]", "#a\0b"] as const) {
            const direct = requireGrammar(valueModule, "cssValueGrammar").parseState(source);
            expect(direct.isError, source).toBe(false);
            expect(direct.offset, source).toBe(source.length);
            expect(projection(parseCssValue(source)), source).toEqual(projection(direct.value as ParseResult<unknown>));
        }
        for (const source of [String.raw`r\65` + "\r\n" + "d", String.raw`#\31 23`] as const) {
            const direct = requireGrammar(colorModule, "cssColorGrammar").parseState(source);
            expect(direct.isError, source).toBe(false);
            expect(direct.offset, source).toBe(source.length);
            expect(direct.value).toMatchObject({ ok: true });
            expect(parseCssColor(source).ok, source).toBe(true);
        }
    });

    it("keeps EOF enforcement at the public door instead of swallowing suffixes", () => {
        for (const source of [
            "outer(inner(a, b/c), [d,e], {f/g})junk)",
            "outer(inner(a, b/c), [d,e], {f/g}));junk",
            "fn(a))junk",
        ] as const) expectRejected(parseCssValue, source);

        for (const source of [
            "rgb(12 34 56 / 50%)junk",
            "rgb(12 34 56 / 50%));junk",
            "red/**/junk",
        ] as const) expectRejected(parseCssColor, source);
    });

    it("preserves nested direct diagnostic spans instead of rebasing them onto substrings", () => {
        for (const source of ["fn(1e309)", "fn(fn(1e309))"] as const) {
            const direct = requireGrammar(valueModule, "cssValueGrammar").parseState(source);
            expect(direct.isError, source).toBe(false);
            expect(direct.value, source).toEqual(parseCssValue(source));
        }
        for (const source of ["red]", "1]", "rgb(1 2 3]"] as const) {
            const parsed = parseCssValue(source);
            expect(parsed.ok, source).toBe(false);
            if (!parsed.ok) expect(parsed.diagnostics[0].start, source).toBe(source.indexOf("]"));
        }
    });
});

describe("first vertical: CSS component-value structure", () => {
    it("parses nested functions, lists, and simple blocks without flattening their separators", () => {
        for (const source of [
            "outer(inner(a, b/c), [d,e], {f/g})",
            "fn([a, inner(b/c)] {d: e; f: g})",
            "calc((1px + var(--fallback, 2px)) / 2)",
            String.raw`fn(foo\,bar, nested(foo\)bar))`,
        ] as const) expectAccepted(parseCssValue, source);
    });

    it("rejects mismatched, unexpected, and unclosed delimiters and comments", () => {
        for (const source of [
            "fn([a,b})",
            "fn({a/b])",
            "fn((a])",
            "fn([a,b]",
            "fn(a))",
            "fn(a/* unterminated)",
            "foo/*",
            '"foo',
            "url(foo",
        ] as const) expectRejected(parseCssValue, source);

        for (const source of [
            "rgb(1 2 3]",
            "rgb([1] 2 3)",
            "rgb(1 2 3))",
            "rgb(1/* unterminated 2 3)",
        ] as const) expectRejected(parseCssColor, source);
    });

    it("treats CSS comments as trivia between tokens and at input boundaries", () => {
        for (const source of [
            "/**/foo",
            "foo/**/",
            "foo/**/bar",
            "fn(a/**/b)",
            "fn(a,/**/inner(b/**/c))",
        ] as const) expectAccepted(parseCssValue, source);

        for (const source of [
            "/**/red",
            "red/**/",
            "rgb(255/**/0/**/0)",
            "hsl(120deg/**/50%/**/50%/**///**/25%)",
        ] as const) expectAccepted(parseCssColor, source);
    });

    it("tokenizes CSS escapes before applying value and color semantics", () => {
        expect(projection(parseCssValue(String.raw`\66 oo`))).toEqual(projection(parseCssValue("foo")));
        const escapedDelimiter = parseCssValue(String.raw`fn(foo\,bar)`);
        expect(escapedDelimiter.ok).toBe(true);
        if (escapedDelimiter.ok) {
            expect(escapedDelimiter.value.kind).toBe("call");
            if (escapedDelimiter.value.kind === "call") expect(escapedDelimiter.value.args).toHaveLength(1);
        }
        expect(projection(parseCssColor(String.raw`\72 ed`))).toEqual(projection(parseCssColor("red")));
        expect(projection(parseCssColor(String.raw`r\65 d`))).toEqual(projection(parseCssColor("red")));
    });
});

describe("first vertical: differential and specification authority", () => {
    it("retains exact LIVE behavior for the compatible value and color corpus", () => {
        for (const source of [
            "1px",
            "a b / c",
            "outer(inner(1px), red)",
            "min(1px, 2px)",
        ] as const) {
            expect(projection(parseCssValue(source)), source).toEqual(projection(live.parseCssValue(source)));
        }

        for (const source of [
            "#1234",
            "rgb(12 34 56 / 50%)",
            "hsl(120deg 25% 75%)",
            "color(display-p3 0.1 0.2 0.3)",
        ] as const) {
            expect(projection(parseCssColor(source)), source).toEqual(projection(live.parseCssColor(source)));
        }
    });

    it("records CSS-tokenization corrections as explicit, bounded LIVE divergences", () => {
        for (const source of ["/**/foo", "foo/**/", String.raw`\66 oo`] as const) {
            expect(live.parseCssValue(source).ok, source).toBe(false);
            expect(parseCssValue(source).ok, source).toBe(true);
        }
        for (const source of ["/**/red", "red/**/", "rgb(255/**/0/**/0)", String.raw`\72 ed`] as const) {
            expect(live.parseCssColor(source).ok, source).toBe(false);
            expect(parseCssColor(source).ok, source).toBe(true);
        }
    });
});

describe("first vertical: narrow architecture guard", () => {
    it("does not reintroduce whole-remainder adapters or imperative util splitters", () => {
        const files = [
            new URL("../grammar/value.ts", import.meta.url),
            new URL("../grammar/color.ts", import.meta.url),
            new URL("../timeline.ts", import.meta.url),
        ];
        const forbiddenAdapter = /\b(?:complete|completeBody)\s*\(/;
        const forbiddenScanner = /\b(?:balancedUntil|splitTopLevel|splitValueTokens|emptyTopLevelItem)\b/;

        for (const url of files) {
            const source = readFileSync(fileURLToPath(url), "utf8");
            expect(source, fileURLToPath(url)).not.toMatch(forbiddenAdapter);
            expect(source, fileURLToPath(url)).not.toMatch(forbiddenScanner);
        }
    });
});
