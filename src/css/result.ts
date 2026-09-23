/**
 * The `ParseResult` constructors every `./css` reader answers through: a
 * deep-frozen success carrying no diagnostics, or a failure carrying exactly
 * one `ParseIssue` (code · span · expected · the source slice it covers).
 *
 * A leaf: it reads no CSS text and imports only `./types`. It was carried by
 * `./grammar` — the hand-rolled parser X.P.W6.x deleted — and moved here
 * unchanged so the BBNF entries (`./bbnf`) and the stylesheet layer share one
 * result law.
 */
import type { ParseIssue, ParseResult } from "./types";

function deepFreeze<T>(value: T): T {
    if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
    for (const child of Object.values(value)) deepFreeze(child);
    return Object.freeze(value);
}

const EMPTY_DIAGNOSTICS = Object.freeze([]) as readonly [];

export const success = <T>(value: T): ParseResult<T> => Object.freeze({
    ok: true,
    value: deepFreeze(value),
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
