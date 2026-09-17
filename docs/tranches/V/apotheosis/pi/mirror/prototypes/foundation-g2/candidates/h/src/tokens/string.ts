import { all, any, eof, regex, string, type Parser } from "@mkbabb/parse-that/core";

import { cssEscape } from "./escape.js";

export type CssString = {
    value: string;
    quote: '"' | "'";
    error: null | "unexpected-eof" | "newline";
};

function preprocessString(value: string): string {
    return value.replace(/\0|[\uD800-\uDFFF]/gu, "\uFFFD");
}

const escapedNewline = string("\\")
    .next(regex(/\r\n|[\n\r\f]/))
    .map(() => "");

/* A trailing backslash is consumed by the string algorithm but appends nothing. */
const stringEofEscape = string("\\")
    .skip(eof())
    .map(() => "");

const stringEscape = cssEscape.map((escape) => escape.value);

type StringEnding = {
    error: CssString["error"];
};

function quotedString(quote: '"' | "'", text: Parser<string>): Parser<CssString> {
    const body = any(
        text.map(preprocessString),
        escapedNewline,
        stringEofEscape,
        stringEscape,
    ).many();

    const ending: Parser<StringEnding> = any(
        string(quote).map((): StringEnding => ({ error: null })),
        regex(/\r\n|[\n\r\f]/)
            .peek()
            .map((): StringEnding => ({ error: "newline" })),
        eof().map((): StringEnding => ({ error: "unexpected-eof" })),
    );

    return string(quote)
        .next(all(body, ending))
        .map(
            ([pieces, result]): CssString => ({
                value: pieces.join(""),
                quote,
                error: result.error,
            }),
        );
}

const doubleQuotedString = quotedString('"', regex(/[^"\\\n\r\f]+/u));
const singleQuotedString = quotedString("'", regex(/[^'\\\n\r\f]+/u));

export const cssString: Parser<CssString> = any(doubleQuotedString, singleQuotedString);
