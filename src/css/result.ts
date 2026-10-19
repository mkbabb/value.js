/**
 * The `ParseResult` constructors every `./css` reader answers through: a
 * frozen success carrying no diagnostics, or a failure carrying exactly one
 * `ParseIssue` (code · span · expected · the source slice it covers).
 *
 * Results are immutable, and a value is built frozen: every node a reader
 * publishes is frozen where it is constructed, so `success` freezes only its
 * own envelope and never walks the value again.
 *
 * A leaf: it reads no CSS text and imports only `./types`. It was carried by
 * `./grammar` — the hand-rolled parser X.P.W6.x deleted — and moved here
 * unchanged so the BBNF entries (`./bbnf`) and the stylesheet layer share one
 * result law.
 */
import type { ParseIssue, ParseResult } from "./types";

const EMPTY_DIAGNOSTICS = Object.freeze([]) as readonly [];

export const success = <T>(value: T): ParseResult<T> => Object.freeze({
    ok: true,
    value,
    diagnostics: EMPTY_DIAGNOSTICS,
});

export const failure = <T>(
    source: string,
    code: ParseIssue["code"] = "css_syntax",
    expected: readonly string[] = [],
    start = 0,
    end = source.length,
): ParseResult<T> => {
    const issue = Object.freeze({
        code,
        start,
        end,
        expected: Object.freeze([...expected]),
        actual: source.slice(start, end) || null,
    });
    const diagnostics = Object.freeze([issue]) as readonly [ParseIssue];
    return Object.freeze({ ok: false, diagnostics });
};
