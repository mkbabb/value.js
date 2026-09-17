import { all, any, eof, regex, string, type Parser } from "@mkbabb/parse-that/core";

import { cssEscape } from "./escape.js";

export type CssString = {
    value: string;
    quote: "\"" | "'";
    error: null | "unexpected-eof" | "newline";
};

type StringPiece = {
    value: string;
    error: null | "unexpected-eof";
};

const literalPiece = (value: string): StringPiece => ({ value, error: null });
const joinString = (pieces: readonly StringPiece[]) => ({
    value: pieces.map(({ value }) => value).join(""),
    error: pieces.some(({ error }) => error !== null)
        ? "unexpected-eof" as const
        : null,
});

const backslash = string("\\");
const newline = any(
    string("\r\n").map(() => "\n"),
    regex(/[\n\r\f]/).map(() => "\n"),
);
const preprocessedCodePoint = any(
    string("\r\n").map(() => "\n"),
    regex(/[\s\S]/u).map((value) =>
        value === "\0" ||
        (value.length === 1 && value.charCodeAt(0) >= 0xd800 && value.charCodeAt(0) <= 0xdfff)
            ? "\ufffd"
            : value === "\r" || value === "\f"
              ? "\n"
              : value,
    ),
);

const stringEscapeEof = backslash
    .next(eof())
    .map((): StringPiece => ({ value: "", error: "unexpected-eof" }));
const escapedNewline = backslash.next(newline).map(() => literalPiece(""));
const stringEscape = cssEscape.map(({ value }) => literalPiece(value));

const quotedString = (quote: "\"" | "'"): Parser<CssString> => {
    const ordinary = preprocessedCodePoint
        .minus(any(string(quote), backslash, newline))
        .map(literalPiece);
    const piece = any(escapedNewline, stringEscapeEof, stringEscape, ordinary);
    const terminator = any(
        string(quote).map(() => null),
        newline.peek().map(() => "newline" as const),
        eof().map(() => "unexpected-eof" as const),
    );

    return all(string(quote), piece.many(), terminator).map(([, pieces, ending]) => {
        const result = joinString(pieces);
        return {
            value: result.value,
            quote,
            error: ending ?? result.error,
        };
    });
};

export const cssString: Parser<CssString> = any(
    quotedString("\""),
    quotedString("'"),
);
