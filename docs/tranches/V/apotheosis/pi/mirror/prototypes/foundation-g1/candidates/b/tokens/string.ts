import { any, eof, regex, string } from "@mkbabb/parse-that/core";

import { cssEscape } from "./code-point.js";

const REPLACEMENT = "\uFFFD";

function preprocessRawStringCodePoint(value: string): string {
    return value === "\0" || /^[\uD800-\uDFFF]$/u.test(value) ? REPLACEMENT : value;
}

const escapedNewline = string("\\")
    .next(regex(/(?:\r\n|[\n\r\f])/u))
    .map(() => "");
const escapedEndOfInput = string("\\").skip(eof()).map(() => "");

const stringBranch = (quote: "\"" | "'") => {
    const rawCodePoint = regex(quote === "\"" ? /[^"\\\n\r\f]/u : /[^'\\\n\r\f]/u)
        .map(preprocessRawStringCodePoint);
    const content = any(escapedNewline, escapedEndOfInput, cssEscape, rawCodePoint);
    const closingQuoteOrEof = any(string(quote), eof().map(() => ""));

    return string(quote)
        .next(content.many())
        .skip(closingQuoteOrEof)
        .map((parts) => parts.join(""));
};

export const cssString = any(stringBranch("\""), stringBranch("'"));
