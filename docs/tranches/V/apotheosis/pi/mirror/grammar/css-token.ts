import { any, Parser, regex, string } from "@mkbabb/parse-that";

export const whitespaceChunk = regex(/[\t\n\f\r ]+/);
export const commentChunk = regex(/\/\*(?:[^*]|\*(?!\/))*\*\//);
const triviaChunk = any(whitespaceChunk, commentChunk);

/** Zero or more CSS whitespace/comment chunks. Always succeeds. */
export const trivia = triviaChunk.many().map(() => undefined);

/** One or more CSS whitespace/comment chunks. */
export const gap = triviaChunk.many(1).map(() => undefined);

/** Structural punctuation with CSS trivia accepted on both sides. */
export function punct(text: string): Parser<string> {
    return trivia.next(string(text)).skip(trivia);
}

const ESCAPE = String.raw`\\(?:[0-9a-fA-F]{1,6}[ \t\n\f\r]?|[^0-9a-fA-F\n\f\r])`;
const NAME_START = String.raw`(?:[A-Za-z_]|[^\0-\x7f]|${ESCAPE})`;
const NAME = String.raw`(?:[A-Za-z0-9_-]|[^\0-\x7f]|${ESCAPE})`;
const IDENT = String.raw`(?:--${NAME}*|-${NAME_START}${NAME}*|${NAME_START}${NAME}*)`;
const NUMBER = String.raw`[+-]?(?:\d+\.?(?:\d*)?|\.\d+)(?:[eE][+-]?\d+)?`;

export const identToken = regex(new RegExp(IDENT));
export const numberLexeme = regex(new RegExp(NUMBER));
export const unitLexeme = any(string("%"), identToken).opt();
export const numberUnitToken = numberLexeme.then(unitLexeme).map(([raw, unit]) => ({
    raw: `${raw}${unit ?? ""}`,
    value: Number(raw),
    unit: unit ?? "",
}));
export const numberToken = numberLexeme.map((raw) => Number(raw));
export const quotedToken = regex(/"(?:\\(?:\r\n|[\n\r\f]|[^\n\r\f])|[^"\\\n\r\f])*"|'(?:\\(?:\r\n|[\n\r\f]|[^\n\r\f])|[^'\\\n\r\f])*'/);
export const hexColorToken = regex(/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})/i);
export const functionName = identToken.skip(string("(")).map(decodeCssIdent);

export const operatorToken = any(
    string("<="), string(">="), string("=="), string("!="),
    string("+"), string("*"), string("-"), string("<"), string(">"),
    string("="), string(":"), string(";"),
);

export const comma = punct(",");
export const slash = trivia.next(regex(/\/(?!\*)/)).skip(trivia);
export const closeParen = trivia.next(string(")"));

export function decodeCssIdent(raw: string): string {
    return raw.replace(
        /\\([0-9a-fA-F]{1,6})(?:[ \t\n\f\r])?|\\([^\n\f\r])/g,
        (_whole, hex: string | undefined, escaped: string | undefined) => {
            if (hex === undefined) return escaped ?? "";
            const codePoint = Number.parseInt(hex, 16);
            return codePoint === 0 || codePoint > 0x10ffff
                ? "\uFFFD"
                : String.fromCodePoint(codePoint);
        },
    );
}
