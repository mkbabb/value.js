import { any, regex, type Parser } from "@mkbabb/parse-that/core";

export type CssEscape = {
    value: string;
    error: null | "unexpected-eof";
};

const REPLACEMENT = "\uFFFD";

function preprocessEscapedCodePoint(value: string): string {
    return value.replace(/\0|[\uD800-\uDFFF]/gu, REPLACEMENT);
}

function decodedHex(value: string): string {
    const codePoint = Number.parseInt(value, 16);
    return codePoint === 0 ||
        codePoint > 0x10ffff ||
        (codePoint >= 0xd800 && codePoint <= 0xdfff)
        ? REPLACEMENT
        : String.fromCodePoint(codePoint);
}

const hexadecimalEscape: Parser<CssEscape> = regex(
    /\\[0-9A-Fa-f]{1,6}(?:\r\n|[ \t\n\r\f])?/,
).map(
    (value): CssEscape => ({
        value: decodedHex(value.slice(1)),
        error: null,
    }),
);

const ordinaryEscape: Parser<CssEscape> = regex(/\\[^\n\r\f]/u).map(
    (value): CssEscape => ({
        value: preprocessEscapedCodePoint(value.slice(1)),
        error: null,
    }),
);

const eofEscape: Parser<CssEscape> = regex(/\\$/).map(
    (): CssEscape => ({
        value: REPLACEMENT,
        error: "unexpected-eof",
    }),
);

export const cssEscape: Parser<CssEscape> = any(
    hexadecimalEscape,
    eofEscape,
    ordinaryEscape,
);

