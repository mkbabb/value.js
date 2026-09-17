import { dispatch, regex, type Parser } from "@mkbabb/parse-that/core";

const preprocessWhitespace = (value: string): string =>
    value.replace(/\r\n?|\f/g, "\n");

export const cssWhitespace: Parser<string> = dispatch<string>({
    " \t\n\r\f": regex(/[ \t\n\r\f]+/).map(preprocessWhitespace),
});

