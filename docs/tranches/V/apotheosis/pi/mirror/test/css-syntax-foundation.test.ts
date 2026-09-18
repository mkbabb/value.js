import { string } from "@mkbabb/parse-that";
import { describe, expect, it } from "vitest";
import {
    cssComponentDocumentGrammar,
    cssDeclarationValueGrammar,
    cssRecoveringComponentDocumentGrammar,
    MAX_COMPONENT_DEPTH,
} from "../grammar/css/l4/syntax/component-value.js";
import { preprocessCss } from "../grammar/css/l4/syntax/source.js";
import { decodeCssName } from "../grammar/css/l4/syntax/tokens.js";
import type { CssComponentValue, CssToken } from "../grammar/css/l4/syntax/types.js";

function parse(source: string): readonly CssComponentValue[] {
    const state = cssComponentDocumentGrammar.parseState(preprocessCss(source).source);
    expect(state.isError, source).toBe(false);
    return state.value;
}

describe("CSS Syntax L4 source and token foundation", () => {
    it("applies CSS preprocessing without losing original offset boundaries", () => {
        const processed = preprocessCss("a\r\nb\fc\0d\ud800e");
        expect(processed.source).toBe("a\nb\nc\uFFFDd\uFFFDe");
        expect(processed.offsets[2]).toBe(3);
        expect(processed.offsets.at(-1)).toBe(10);
    });

    it("tokenizes numbers, URL states, EOF comments, and surrogate escapes per CSS Syntax", () => {
        expect(parse("1.").map(({ kind }) => kind)).toEqual(["number", "delim"]);
        for (const source of ["1.0", "1e0", "1e+3", "1e2px"] as const) {
            expect(parse(source)[0]).toMatchObject({ numberType: "number" });
        }
        expect(parse("url(http://x)")[0]).toMatchObject({ kind: "url", value: "http://x" });
        expect(parse("url(a b)")[0]).toMatchObject({ kind: "bad-url" });
        expect(parse("url(foo")[0]).toMatchObject({ kind: "url", value: "foo", terminated: false });
        expect(parse(String.raw`u\72l(foo)`)[0]).toMatchObject({ kind: "url", value: "foo", terminated: true });
        expect(parse('"foo')[0]).toMatchObject({ kind: "string", value: "foo", terminated: false });
        expect(parse('"foo\\')[0]).toMatchObject({ kind: "string", value: "foo\uFFFD", terminated: false });
        expect(parse('"😀"')[0]).toMatchObject({ kind: "string", value: "😀", terminated: true });
        expect(parse("foo/*").at(-1)).toMatchObject({ kind: "comment", terminated: false });
        expect(decodeCssName(String.raw`\d800 `)).toBe("\uFFFD");
    });

    it("retains typed, spanned function and simple-block children", () => {
        const [root] = parse("fn(@x #id [a; b])");
        expect(root).toMatchObject({ kind: "function-block", name: "fn", span: { start: 0, end: 17 } });
        if (root?.kind !== "function-block") throw new Error("expected function block");
        expect(root.value.map(({ kind }) => kind)).toEqual([
            "at-keyword", "whitespace", "hash", "whitespace", "simple-block",
        ]);
        const square = root.value.at(-1);
        expect(square).toMatchObject({ kind: "simple-block", associated: "[" });
        if (square?.kind !== "simple-block") throw new Error("expected square block");
        expect(square.value.map(({ kind }) => kind)).toEqual(["ident", "semicolon", "whitespace", "ident"]);
        expect((root.value[2] as CssToken).id).toBe(true);
    });

    it("rejects mismatched delimiters and bounds hostile recursion without throwing", () => {
        for (const source of ["fn([a,b})", "fn(a]", "[a)"] as const) {
            expect(cssComponentDocumentGrammar.parseState(source).isError, source).toBe(true);
        }

        const accepted = "f(".repeat(MAX_COMPONENT_DEPTH) + "x" + ")".repeat(MAX_COMPONENT_DEPTH);
        const rejected = "f(".repeat(1_000) + "x" + ")".repeat(1_000);
        expect(() => cssComponentDocumentGrammar.parseState(accepted)).not.toThrow();
        expect(cssComponentDocumentGrammar.parseState(accepted).isError).toBe(false);
        expect(() => cssComponentDocumentGrammar.parseState(rejected)).not.toThrow();
        expect(cssComponentDocumentGrammar.parseState(rejected).isError).toBe(true);
    });

    it("recovers a lossless component tree before strict family validation", () => {
        const cases = [
            ["fn(a]", "function-block", ["unexpected-close", "unclosed-block"]],
            ["fn(a", "function-block", ["unclosed-block"]],
            ["[a)", "simple-block", ["unexpected-close", "unclosed-block"]],
            ["[a", "simple-block", ["unclosed-block"]],
            ["a]", "ident", ["unexpected-close"]],
        ] as const;
        for (const [source, rootKind, issueKinds] of cases) {
            const state = cssRecoveringComponentDocumentGrammar.parseState(source);
            expect(state.isError, source).toBe(false);
            expect(state.value.value[0]?.kind, source).toBe(rootKind);
            expect(state.value.issues.map(({ kind }) => kind), source).toEqual(issueKinds);
            expect(state.value.span, source).toEqual({ start: 0, end: source.length });
            expect(cssComponentDocumentGrammar.parseState(source).isError, source).toBe(true);
        }
        const fn = cssRecoveringComponentDocumentGrammar.parseState("fn(a]").value.value[0];
        expect(fn).toMatchObject({ kind: "function-block", close: null, span: { start: 0, end: 5 } });
        if (fn?.kind !== "function-block") throw new Error("expected recovered function");
        expect(fn.value.at(-1)).toMatchObject({ kind: "close-square", raw: "]", span: { start: 4, end: 5 } });
    });

    it("composes with caller-owned semicolons regardless of intervening trivia", () => {
        for (const input of ["foo;tail", "foo ;tail", "foo/**/;tail"] as const) {
            const state = cssDeclarationValueGrammar.skip(string(";")).parseState(input);
            expect(state.isError, input).toBe(false);
            expect(input.slice(state.offset), input).toBe("tail");
        }
    });
});
