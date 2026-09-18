import type { ParseIssue, ParseResult } from "./types.js";

export const EMPTY_DIAGNOSTICS = [] as readonly [];

export const success = <T>(value: T): ParseResult<T> => ({
    ok: true,
    value,
    diagnostics: EMPTY_DIAGNOSTICS,
});

export const failure = <T>(
    source: string,
    code: ParseIssue["code"] = "css_syntax",
    expected: readonly string[] = [],
    start = 0,
    end?: number,
): ParseResult<T> => {
    const input = typeof source === "string" ? source : "";
    const finalEnd = end ?? input.length;
    return {
        ok: false,
        diagnostics: [{
            code,
            start,
            end: finalEnd,
            expected: [...expected],
            actual: input.slice(start, finalEnd) || null,
        }],
    };
};
