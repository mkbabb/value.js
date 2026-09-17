import { any, Parser } from "@mkbabb/parse-that";
import { reject } from "../../../combinators.js";
import {
    closeCurlyToken, closeParenToken, closeSquareToken, cssToken, functionToken,
    openCurlyToken, openParenToken, openSquareToken, semicolonToken, triviaToken, urlToken,
} from "./tokens.js";
import type {
    CssComponentDocument, CssComponentValue, CssFunction, CssSimpleBlock, CssSyntaxIssue, CssToken,
} from "./types.js";

export const MAX_COMPONENT_DEPTH = 128;
const grammarCache = new Map<string, Parser<CssComponentValue>>();
const openingToken = any(functionToken, openParenToken, openSquareToken, openCurlyToken);
const closingKinds = new Set(["close-paren", "close-square", "close-curly"]);

function component(depth: number, topLevel: boolean, close?: Parser<CssToken>): Parser<CssComponentValue> {
    const closeKind = close === closeParenToken ? ")" : close === closeSquareToken ? "]" : close === closeCurlyToken ? "}" : "";
    const key = `${depth}:${topLevel ? 1 : 0}:${closeKind}`;
    const cached = grammarCache.get(key);
    if (cached !== undefined) return cached;
    const grammar = Parser.lazy<CssComponentValue>(() => {
        let ordinary: Parser<CssToken> = cssToken.minus(openingToken);
        if (topLevel) ordinary = ordinary.minus(semicolonToken);
        if (close !== undefined) ordinary = ordinary.minus(close);
        if (depth >= MAX_COMPONENT_DEPTH) return any(urlToken, triviaToken, ordinary);
        return any(
            urlToken,
            functionBlock(depth),
            simpleBlock("(", openParenToken, closeParenToken, depth),
            simpleBlock("[", openSquareToken, closeSquareToken, depth),
            simpleBlock("{", openCurlyToken, closeCurlyToken, depth),
            triviaToken,
            ordinary,
        );
    });
    grammarCache.set(key, grammar);
    return grammar;
}

function functionBlock(depth: number): Parser<CssFunction> {
    if (depth >= MAX_COMPONENT_DEPTH) return reject<CssFunction>();
    return functionToken.then(component(depth + 1, false, closeParenToken).many()).then(closeParenToken.opt())
        .map(([[head, value], close]) => ({
            kind: "function-block",
            name: String(head.value ?? ""),
            head,
            value,
            close: close ?? null,
            span: { start: head.span.start, end: close?.span.end ?? value.at(-1)?.span.end ?? head.span.end },
        }));
}

function simpleBlock(
    associated: CssSimpleBlock["associated"],
    openParser: Parser<CssToken>,
    closeParser: Parser<CssToken>,
    depth: number,
): Parser<CssSimpleBlock> {
    if (depth >= MAX_COMPONENT_DEPTH) return reject<CssSimpleBlock>();
    return openParser.then(component(depth + 1, false, closeParser).many()).then(closeParser.opt())
        .map(([[open, value], close]) => ({
            kind: "simple-block",
            associated,
            open,
            value,
            close: close ?? null,
            span: { start: open.span.start, end: close?.span.end ?? value.at(-1)?.span.end ?? open.span.end },
        }));
}

function syntaxIssues(components: readonly CssComponentValue[]): readonly CssSyntaxIssue[] {
    const issues: CssSyntaxIssue[] = [];
    const visit = (items: readonly CssComponentValue[]) => {
        for (const item of items) {
            if (item.kind === "comment") {
                if (!item.terminated) issues.push({
                    kind: "unterminated-comment", span: item.span,
                    expected: ["terminated comment"], actual: item.raw || null,
                });
                continue;
            }
            if (item.kind === "function-block" || item.kind === "simple-block") {
                visit(item.value);
                if (item.close === null) {
                    const expected = item.kind === "function-block" ? ")"
                        : item.associated === "(" ? ")" : item.associated === "[" ? "]" : "}";
                    issues.push({
                        kind: "unclosed-block",
                        span: { start: item.span.end, end: item.span.end },
                        expected: [expected], actual: null,
                        openOffset: item.kind === "function-block" ? item.head.span.start : item.open.span.start,
                    });
                }
                continue;
            }
            if (closingKinds.has(item.kind)) issues.push({
                kind: "unexpected-close", span: item.span,
                expected: ["component value"], actual: item.raw,
            });
            else if (item.kind === "bad-string") issues.push({
                kind: "bad-string", span: item.span, expected: ["string"], actual: item.raw,
            });
            else if (item.kind === "bad-url") issues.push({
                kind: "bad-url", span: item.span, expected: ["URL"], actual: item.raw,
            });
            else if (item.kind === "string" && item.terminated === false) issues.push({
                kind: "unterminated-string", span: item.span, expected: ["terminated string"], actual: item.raw,
            });
            else if (item.kind === "url" && item.terminated === false) issues.push({
                kind: "unterminated-url", span: item.span, expected: ["terminated URL"], actual: item.raw,
            });
        }
    };
    visit(components);
    return issues;
}

function document(value: readonly CssComponentValue[]): CssComponentDocument {
    return {
        value,
        issues: syntaxIssues(value),
        span: { start: value[0]?.span.start ?? 0, end: value.at(-1)?.span.end ?? 0 },
    };
}

function strict(parser: Parser<CssComponentDocument>): Parser<readonly CssComponentValue[]> {
    return new Parser((state) => {
        parser.call(state);
        if (state.isError) return state;
        const parsed = state.value as CssComponentDocument;
        const issue = parsed.issues.find(({ kind }) => kind === "unexpected-close" || kind === "unclosed-block");
        if (issue !== undefined) {
            state.offset = issue.span.start;
            state.furthest = issue.span.start;
            return state.err(undefined);
        }
        return state.ok(parsed.value);
    });
}

/** Recovering CSS Syntax component tree. Family grammars decide whether its issues are admissible. */
export const cssRecoveringComponentDocumentGrammar: Parser<CssComponentDocument> =
    component(0, false).many().eof().map(document);

export const cssRecoveringDeclarationValueGrammar: Parser<CssComponentDocument> =
    component(0, true).many(1).map(document);

/** Strict compatibility views used by the current public value/color/easing doors. */
export const cssComponentDocumentGrammar = strict(cssRecoveringComponentDocumentGrammar);

/** Consumes trailing trivia but leaves a caller-owned top-level semicolon. */
export const cssDeclarationValueGrammar = strict(cssRecoveringDeclarationValueGrammar);

export function parseComponentDocument(source: string): CssComponentDocument | undefined {
    const state = cssRecoveringComponentDocumentGrammar.parseState(source);
    return state.isError ? undefined : state.value;
}
