import { any, regex, type Parser } from "@mkbabb/parse-that/core";

export type CssEscape = {
    value: string;
    error: null | "unexpected-eof";
};

const hexEscape = regex(
    /\\[0-9A-Fa-f]{1,6}(?:\r\n|[ \t\n\r\f])?/,
).map((terminal): CssEscape => {
    const value = Number.parseInt(terminal.slice(1), 16);
    return {
        value: value === 0 || value > 0x10ffff || (value >= 0xd800 && value <= 0xdfff)
            ? "\ufffd"
            : String.fromCodePoint(value),
        error: null,
    };
});

const escapedCodePoint = regex(
    /\\[^\n\r\f0-9A-Fa-f]/u,
).map((terminal): CssEscape => {
    const value = terminal.slice(1);
    return {
        value: value === "\0" ||
            (value.length === 1 && value.charCodeAt(0) >= 0xd800 && value.charCodeAt(0) <= 0xdfff)
            ? "\ufffd"
            : value,
        error: null,
    };
});

const escapedEof = regex(/\\(?![\s\S])/).map((): CssEscape => ({
    value: "\ufffd",
    error: "unexpected-eof",
}));

export const cssEscape: Parser<CssEscape> = any(
    hexEscape,
    escapedEof,
    escapedCodePoint,
);
