import { any, eof, regex, string } from "@mkbabb/parse-that/core";
import {
    cssEscape,
    cssNewline,
    decodePreprocessedCodePoint,
} from "./code-point.js";

const escapedNewline = string("\\").next(cssNewline).map(() => "");
const trailingBackslash = string("\\").skip(eof()).map(() => "");

const quoted = (quote: "\"" | "'") => {
    const rawCodePoint = regex(
        quote === "\"" ? /[^"\\\n\r\f]/u : /[^'\\\n\r\f]/u,
    ).map(decodePreprocessedCodePoint);

    const content = any(escapedNewline, trailingBackslash, cssEscape, rawCodePoint)
        .many()
        .map((parts) => parts.join(""));

    return string(quote).next(content).skip(any(string(quote), eof()));
};

export const cssString = any(quoted("\""), quoted("'"));
