import { Parser, any, dispatch, eof, regex, string } from "@mkbabb/parse-that/core";
import { cssEscape } from "./code-point.js";

const replacement = "\uFFFD";

const decodeStringCodePoint = (value: string): string => {
    const codePoint = value.codePointAt(0);
    return codePoint === undefined
        || codePoint === 0
        || codePoint >= 0xd800 && codePoint <= 0xdfff
        ? replacement
        : String.fromCodePoint(codePoint);
};

const escapedNewline = regex(/\\(?:\r\n|[\n\r\f])/).map(() => "");
const terminalBackslash = string("\\").skip(eof()).map(() => "");

const quotedString = (quote: "\"" | "'") => {
    const ordinary = (quote === "\""
        ? regex(/[^"\\\n\r\f]/u)
        : regex(/[^'\\\n\r\f]/u))
        .map(decodeStringCodePoint);
    const content = Parser.lazy(() => any(escapedNewline, terminalBackslash, cssEscape, ordinary));
    const end = any(string(quote), eof().map(() => ""));

    return string(quote)
        .next(content.many())
        .skip(end)
        .map((parts) => parts.join(""));
};

const doubleQuotedString = quotedString("\"");
const singleQuotedString = quotedString("'");

export const cssString = dispatch({
    "\"": doubleQuotedString,
    "'": singleQuotedString,
});
