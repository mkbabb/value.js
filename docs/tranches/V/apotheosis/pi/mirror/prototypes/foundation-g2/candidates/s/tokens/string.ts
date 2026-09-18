import {
    all,
    any,
    dispatch,
    eof,
    regex,
    string,
    type Parser,
} from "@mkbabb/parse-that/core";

import type { CssEscape } from "./escape.js";

export type CssString = {
    value: string;
    quote: "\"" | "'";
    error: null | "unexpected-eof" | "newline";
};

type StringEnd = CssString["error"];

const replacementCharacter = "\uFFFD";

const preprocessReplacements = (value: string): string =>
    value.replace(/[\0\uD800-\uDFFF]/gu, replacementCharacter);

const preprocessWhitespace = (value: string): string =>
    value.replace(/\r\n?|\f/g, "\n");

const rawNewline = any(string("\r\n"), regex(/[\n\r\f]/)).map(() => "\n");
const rawWhitespaceCodePoint = any(
    string("\r\n"),
    regex(/[ \t\n\r\f]/),
).map(preprocessWhitespace);

const hexDigits = regex(/[0-9A-Fa-f]{1,6}/);
const decodeEscapedHex = (digits: string): CssEscape => {
    const codePoint = Number.parseInt(digits, 16);
    const invalid =
        codePoint === 0 ||
        codePoint > 0x10ffff ||
        (codePoint >= 0xd800 && codePoint <= 0xdfff);

    return {
        value: invalid ? replacementCharacter : String.fromCodePoint(codePoint),
        error: null,
    };
};

const escapedHex = hexDigits
    .skip(rawWhitespaceCodePoint.opt())
    .map<CssEscape>(decodeEscapedHex);

const escapedNonHex = regex(
    /(?:[^0-9A-Fa-f\n\r\f\0\uD800-\uDFFF]|[\0\uD800-\uDFFF])/u,
).map<CssEscape>((value) => ({
    value: preprocessReplacements(value),
    error: null,
}));

const stringEscapedEof = eof().map<CssEscape>(() => ({
    value: "",
    error: "unexpected-eof",
}));

const escapedNewline = rawNewline.map<CssEscape>(() => ({
    value: "",
    error: null,
}));

const stringAfterBackslash = any(
    dispatch<CssEscape>({
        "0-9": escapedHex,
        "A-F": escapedHex,
        "a-f": escapedHex,
        "\n\r\f": escapedNewline,
    }),
    escapedNonHex,
    stringEscapedEof,
);

const stringEscape = string("\\").next(stringAfterBackslash);
const preprocessedReplacement = regex(/[\0\uD800-\uDFFF]+/u).map<CssEscape>(
    (value) => ({
        value: preprocessReplacements(value),
        error: null,
    }),
);

const makeString = (quote: "\"" | "'"): Parser<CssString> => {
    const ordinary = (
        quote === "\""
            ? regex(/[^"\\\n\r\f\0\uD800-\uDFFF]+/u)
            : regex(/[^'\\\n\r\f\0\uD800-\uDFFF]+/u)
    ).map<CssEscape>((value) => ({ value, error: null }));
    const bodyPiece = any(
        dispatch<CssEscape>({ "\\": stringEscape }),
        ordinary,
        preprocessedReplacement,
    );
    const end = any(
        string(quote).map<StringEnd>(() => null),
        rawNewline.peek().map<StringEnd>(() => "newline"),
        eof().map<StringEnd>(() => "unexpected-eof"),
    );

    return string(quote)
        .next(all(bodyPiece.many(), end))
        .map<CssString>(([body, ending]) => ({
            value: body.map((piece) => piece.value).join(""),
            quote,
            error:
                ending === null &&
                body.some((piece) => piece.error === "unexpected-eof")
                    ? "unexpected-eof"
                    : ending,
        }));
};

const doubleQuotedString = makeString("\"");
const singleQuotedString = makeString("'");

export const cssString: Parser<CssString> = dispatch<CssString>({
    "\"": doubleQuotedString,
    "'": singleQuotedString,
});

