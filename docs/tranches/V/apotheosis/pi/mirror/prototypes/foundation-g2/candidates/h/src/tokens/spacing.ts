import { all, any, eof, regex, string, type Parser } from "@mkbabb/parse-that/core";

export type CssComment = {
    error: null | "unexpected-eof";
};

export type CssSpacing = {
    errors: readonly "unexpected-eof-comment"[];
};

function preprocessWhitespace(value: string): string {
    return value.replace(/\r\n?|\f/g, "\n");
}

export const cssWhitespace: Parser<string> =
    regex(/(?:\r\n|[ \t\n\r\f])+/).map(preprocessWhitespace);

const commentBody = regex(/(?:[^*]|\*(?!\/))+/).opt();
const commentEnding: Parser<CssComment> = any(
    string("*/").map((): CssComment => ({ error: null })),
    eof().map((): CssComment => ({ error: "unexpected-eof" })),
);

export const cssComment: Parser<CssComment> = string("/*")
    .next(commentBody)
    .next(commentEnding);

type SpacingPiece = null | "unexpected-eof-comment";

const spacingWhitespace = cssWhitespace.map((): SpacingPiece => null);
const spacingComment = cssComment.map(
    (comment): SpacingPiece =>
        comment.error === "unexpected-eof" ? "unexpected-eof-comment" : null,
);

const spacingPiece = any(spacingWhitespace, spacingComment);

export const cssSpacing: Parser<CssSpacing> = all(
    spacingPiece,
    spacingPiece.many(),
).map(
    ([head, tail]): CssSpacing => ({
        errors: [head, ...tail].filter(
            (piece): piece is "unexpected-eof-comment" => piece !== null,
        ),
    }),
);
