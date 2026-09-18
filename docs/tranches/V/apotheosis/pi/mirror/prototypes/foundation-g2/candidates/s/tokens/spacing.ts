import {
    all,
    any,
    dispatch,
    eof,
    regex,
    string,
    type Parser,
} from "@mkbabb/parse-that/core";

export type CssComment = {
    error: null | "unexpected-eof";
};

export type CssSpacing = {
    errors: readonly "unexpected-eof-comment"[];
};

const preprocessWhitespace = (value: string): string =>
    value.replace(/\r\n?|\f/g, "\n");

export const cssWhitespace: Parser<string> = dispatch<string>({
    " \t\n\r\f": regex(/[ \t\n\r\f]+/).map(preprocessWhitespace),
});

const commentBody = any(regex(/[^*]+/), regex(/\*+(?!\/)/)).many();
const commentEnd = any(
    string("*/").map<CssComment["error"]>(() => null),
    eof().map<CssComment["error"]>(() => "unexpected-eof"),
);

export const cssComment: Parser<CssComment> = string("/*")
    .next(commentBody)
    .next(commentEnd)
    .map((error) => ({ error }));

type SpacingPart = null | "unexpected-eof-comment";

const spacingWhitespace = cssWhitespace.map<SpacingPart>(() => null);
const spacingComment = cssComment.map<SpacingPart>((comment) =>
    comment.error === "unexpected-eof" ? "unexpected-eof-comment" : null,
);

const spacingPart = dispatch<SpacingPart>({
    " \t\n\r\f": spacingWhitespace,
    "/": spacingComment,
});

export const cssSpacing: Parser<CssSpacing> = all(
    spacingPart,
    spacingPart.many(),
)
    .map((parts) => ({
        errors: [parts[0], ...parts[1]].filter(
            (part): part is "unexpected-eof-comment" => part !== null,
        ),
    }));

