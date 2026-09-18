import { all, any, regex, type Parser } from "@mkbabb/parse-that/core";

import { cssEscape, type CssEscape } from "./escape.js";

export type CssIdentifier = {
    value: string;
    error: null | "unexpected-eof";
};

function preprocessIdentifier(value: string): string {
    return value.replace(/\0|[\uD800-\uDFFF]/gu, "\uFFFD");
}

/*
 * Literal June-2026 non-ASCII ident union. Raw NUL and lone UTF-16
 * surrogates are included because preprocessing turns them into U+FFFD.
 */
const directIdentifierRun = regex(
    /(?:--|-(?:[A-Za-z_\0\uD800-\uDFFF\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{10FFFF}])|[A-Za-z_\0\uD800-\uDFFF\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{10FFFF}])(?:[A-Za-z0-9_\-\0\uD800-\uDFFF\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{10FFFF}])*/u,
).map(
    (value): CssEscape => ({
        value: preprocessIdentifier(value),
        error: null,
    }),
);

const directNameRun = regex(
    /[A-Za-z0-9_\-\0\uD800-\uDFFF\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{10FFFF}]+/u,
).map(
    (value): CssEscape => ({
        value: preprocessIdentifier(value),
        error: null,
    }),
);

const hyphenEscape = all(regex(/-(?=\\(?:[^\n\r\f]|$))/u), cssEscape).map(
    ([, escape]): CssEscape => ({
        value: `-${escape.value}`,
        error: escape.error,
    }),
);

const identifierStart = any(directIdentifierRun, hyphenEscape, cssEscape);
const identifierRemainder = any(directNameRun, cssEscape).many();

export const cssIdentifier: Parser<CssIdentifier> = all(
    identifierStart,
    identifierRemainder,
).map(
    ([head, tail]): CssIdentifier => ({
        value: head.value + tail.map((piece) => piece.value).join(""),
        error:
            head.error ??
            (tail.some((piece) => piece.error !== null) ? "unexpected-eof" : null),
    }),
);
