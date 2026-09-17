import { any, eof, regex, string, type Parser } from "@mkbabb/parse-that/core";

export type CssComment = {
    error: null | "unexpected-eof";
};

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

const commentBodyCodePoint = preprocessedCodePoint.minus(string("*/"));

export const cssComment: Parser<CssComment> = string("/*")
    .next(commentBodyCodePoint.many())
    .then(any(
        string("*/").map(() => null),
        eof().map(() => "unexpected-eof" as const),
    ))
    .map(([, error]) => ({ error }));

