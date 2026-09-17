import { any, eof, regex, string, type Parser } from "@mkbabb/parse-that/core";

export type CssComment = {
    error: null | "unexpected-eof";
};

export type CssSpacing = {
    errors: readonly "unexpected-eof-comment"[];
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
const whitespaceCodePoint = any(
    string("\r\n").map(() => "\n"),
    regex(/[ \t\n\r\f]/).map((value) => value === "\r" || value === "\f" ? "\n" : value),
);

export const cssWhitespace: Parser<string> = whitespaceCodePoint
    .peek()
    .next(whitespaceCodePoint.many(1))
    .map((values) => values.join(""));

const commentBodyCodePoint = preprocessedCodePoint.minus(string("*/"));
export const cssComment: Parser<CssComment> = string("/*")
    .next(commentBodyCodePoint.many())
    .then(any(
        string("*/").map(() => null),
        eof().map(() => "unexpected-eof" as const),
    ))
    .map(([, error]) => ({ error }));

type SpacingPiece = string | CssComment;
const spacingPiece = any<Parser<SpacingPiece>[]>(
    cssWhitespace,
    cssComment,
);
export const cssSpacing: Parser<CssSpacing> = spacingPiece
    .peek()
    .next(spacingPiece.many(1))
    .map((pieces) => ({
        errors: pieces.flatMap((piece) =>
            typeof piece !== "string" && piece.error === "unexpected-eof"
                ? ["unexpected-eof-comment" as const]
                : [],
        ),
    }));
