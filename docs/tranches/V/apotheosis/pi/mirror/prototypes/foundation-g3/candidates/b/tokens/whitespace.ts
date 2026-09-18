import { any, regex, string, type Parser } from "@mkbabb/parse-that/core";

const whitespaceCodePoint = any(
    string("\r\n").map(() => "\n"),
    regex(/[ \t\n\r\f]/).map((value) =>
        value === "\r" || value === "\f" ? "\n" : value,
    ),
);

export const cssWhitespace: Parser<string> = whitespaceCodePoint
    .peek()
    .next(whitespaceCodePoint.many(1))
    .map((values) => values.join(""));

