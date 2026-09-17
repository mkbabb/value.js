import { any, regex, string, type Parser } from "@mkbabb/parse-that/core";

import { cssEscape } from "./escape.js";

export type CssIdentifier = {
    value: string;
    error: null | "unexpected-eof";
};

type IdentifierPiece = {
    value: string;
    error: null | "unexpected-eof";
};

const literalPiece = (value: string): IdentifierPiece => ({ value, error: null });
const joinIdentifier = (pieces: readonly IdentifierPiece[]): CssIdentifier => ({
    value: pieces.map(({ value }) => value).join(""),
    error: pieces.some(({ error }) => error !== null)
        ? "unexpected-eof"
        : null,
});

const asciiLetter = regex(/[A-Za-z]/);
const digit = regex(/[0-9]/);
const hyphen = string("-");
const replacementInput = any(
    string("\0"),
    regex(/[\uD800-\uDBFF]/).minus(regex(/[\uD800-\uDBFF][\uDC00-\uDFFF]/)),
    regex(/[\uDC00-\uDFFF]/),
).map(() => "\ufffd");
const nonAsciiIdent = regex(
    /[\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\u{10000}-\u{10FFFF}]/u,
);
const identStartCodePoint = any(
    asciiLetter,
    string("_"),
    replacementInput,
    nonAsciiIdent,
);
const identCodePoint = any(identStartCodePoint, digit, hyphen);
const namePiece = any(
    identCodePoint.map(literalPiece),
    cssEscape,
);
const hyphenIdentStart = regex(
    /-(?:-|[A-Za-z_\0\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\u{10000}-\u{10FFFF}]|[\uD800-\uDFFF]|\\(?:[0-9A-Fa-f]{1,6}(?:\r\n|[ \t\n\r\f])?|[^\n\r\f0-9A-Fa-f]|(?![\s\S])))/u,
);
const identStart = any(identStartCodePoint, hyphenIdentStart, cssEscape).peek();

export const cssIdentifier: Parser<CssIdentifier> = identStart
    .next(namePiece.many(1))
    .map(joinIdentifier);
