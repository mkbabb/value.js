import { regex } from "@mkbabb/parse-that";

const ESCAPE = String.raw`\\(?:[0-9a-f]{1,6}(?:\r\n|[\t\n\f\r ])?|[^0-9a-f\n\f\r])`;
const NAME_START = String.raw`(?:[A-Z_a-z]|[^\0-\x7f]|${ESCAPE})`;
const NAME = String.raw`(?:[-0-9A-Z_a-z]|[^\0-\x7f]|${ESCAPE})`;
const IDENT = String.raw`(?:--${NAME}*|-${NAME_START}${NAME}*|${NAME_START}${NAME}*)`;

const decodedCodePoint = (value: number): string =>
    value === 0 || value > 0x10ffff || value >= 0xd800 && value <= 0xdfff
        ? "\uFFFD"
        : String.fromCodePoint(value);

export function decodeIdentifier(raw: string): string {
    return raw.replace(
        /\\([0-9a-f]{1,6})(?:\r\n|[\t\n\f\r ])?|\\([^\n\f\r])/gi,
        (_match, hex: string | undefined, escaped: string | undefined) =>
            hex === undefined ? escaped ?? "" : decodedCodePoint(Number.parseInt(hex, 16)),
    );
}

/** Direct CSS grammar leaves. No tokenizer or intermediate token objects exist. */
export const identifierRaw = regex(new RegExp(IDENT, "i"));
export const identifier = identifierRaw.map(decodeIdentifier);
export const dashedIdentifier = regex(new RegExp(`--${NAME}+`, "i")).map(decodeIdentifier);
export const selectorIdentifier = identifier;
export const atKeyword = regex(new RegExp(`@${IDENT}`, "i")).map((raw) => decodeIdentifier(raw.slice(1)));
export const hash = regex(new RegExp(`#${NAME}+`, "i")).map((raw) => ({
    raw,
    value: decodeIdentifier(raw.slice(1)),
}));
export const cssString = regex(/"(?:\\(?:\r\n|[^\n\f\r])|[^"\\\n\f\r])*"|'(?:\\(?:\r\n|[^\n\f\r])|[^'\\\n\f\r])*'/);

export const tokenGrammar = identifier.or(cssString).or(hash.map(({ raw }) => raw));
