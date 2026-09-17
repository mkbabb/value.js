import { regex, type Parser } from "@mkbabb/parse-that/core";

function preprocessWhitespace(value: string): string {
    return value.replace(/\r\n?|\f/g, "\n");
}

export const cssWhitespace: Parser<string> =
    regex(/(?:\r\n|[ \t\n\r\f])+/).map(preprocessWhitespace);

