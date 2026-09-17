import { any, Parser } from "@mkbabb/parse-that";
import { atomic, decodedCodePoint, literalAtom, urlAtom, type AtomicMatch } from "./atom.js";
import type { CssToken, CssTokenKind, CssTrivia } from "./types.js";

const ESCAPE = String.raw`\\(?:[0-9a-f]{1,6}(?:\r\n|[\t\n\f\r ])?|[^0-9a-f\n\f\r])`;
const NAME_START = String.raw`(?:\x00|[A-Z_a-z]|[^\0-\x7f]|${ESCAPE})`;
const NAME = String.raw`(?:\x00|[-0-9A-Z_a-z]|[^\0-\x7f]|${ESCAPE})`;
const IDENT = String.raw`(?:--${NAME}*|-${NAME_START}${NAME}*|${NAME_START}${NAME}*)`;
const NUMBER = String.raw`[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?`;

function token<T>(
    parser: Parser<AtomicMatch<T>>,
    kind: CssTokenKind,
    fields: (match: AtomicMatch<T>) => Partial<CssToken> = () => ({}),
): Parser<CssToken> {
    return parser.map((match) => ({ kind, raw: match.raw, span: match.span, ...fields(match) }));
}

export function decodeCssName(raw: string): string {
    return replaceInvalidCodePoints(raw.replace(
        /\\([0-9a-f]{1,6})(?:\r\n|[\t\n\f\r ])?|\\([^\n\f\r])/gi,
        (_whole, hex: string | undefined, escaped: string | undefined) =>
            hex === undefined ? escaped ?? "" : decodedCodePoint(Number.parseInt(hex, 16)),
    ));
}

function replaceInvalidCodePoints(raw: string): string {
    let output = "";
    for (let index = 0; index < raw.length; index++) {
        const first = raw.charCodeAt(index);
        if (first === 0 || first >= 0xdc00 && first <= 0xdfff) output += "\uFFFD";
        else if (first >= 0xd800 && first <= 0xdbff) {
            const second = raw.charCodeAt(index + 1);
            if (second >= 0xdc00 && second <= 0xdfff) output += raw[index]! + raw[++index]!;
            else output += "\uFFFD";
        } else output += raw[index]!;
    }
    return output;
}

export const whitespaceToken: Parser<CssTrivia> = atomic(/(?:\r\n|[\t\n\f\r ])+/, (raw) => raw)
    .map(({ raw, span }) => ({ kind: "whitespace", raw, span, terminated: true }));

export const commentToken: Parser<CssTrivia> = atomic(/\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$)/, (raw) => raw)
    .map(({ raw, span }) => ({ kind: "comment", raw, span, terminated: raw.endsWith("*/") }));

export const triviaToken: Parser<CssTrivia> = any(whitespaceToken, commentToken);

const numberAtom = atomic(new RegExp(NUMBER), Number);
const identAtom = atomic(new RegExp(IDENT, "i"), (raw) => raw);

const numberType = (raw: string): "integer" | "number" => /[.eE]/.test(raw) ? "number" : "integer";

const dimensionToken: Parser<CssToken> = numberAtom.then(identAtom).map(([numeric, unit]) => ({
    kind: "dimension",
    raw: numeric.raw + unit.raw,
    span: { start: numeric.span.start, end: unit.span.end },
    value: numeric.value,
    unit: decodeCssName(unit.value),
    numberType: numberType(numeric.raw),
}));

const percentageToken: Parser<CssToken> = numberAtom.then(literalAtom("%", (raw) => raw)).map(([numeric, percent]) => ({
    kind: "percentage",
    raw: numeric.raw + percent.raw,
    span: { start: numeric.span.start, end: percent.span.end },
    value: numeric.value,
    unit: "%",
    numberType: numberType(numeric.raw),
}));

const numberToken = token(numberAtom, "number", ({ value, raw }) => ({
    value,
    unit: "",
    numberType: numberType(raw),
}));

const stringToken = token(
    atomic(/"(?:\\(?:\r\n|[\n\f\r]|[^\n\f\r])|[^"\\\n\f\r])*"|'(?:\\(?:\r\n|[\n\f\r]|[^\n\f\r])|[^'\\\n\f\r])*'/, (raw) => raw),
    "string",
    ({ raw }) => ({ value: decodeCssString(raw, true), terminated: true }),
);

const eofStringToken = token(
    atomic(/"(?:\\(?:\r\n|[\n\f\r]|[^\n\f\r])|\\(?=$)|[^"\\\n\f\r])*$|'(?:\\(?:\r\n|[\n\f\r]|[^\n\f\r])|\\(?=$)|[^'\\\n\f\r])*$/,
        (raw) => raw),
    "string",
    ({ raw }) => ({ value: decodeCssString(raw, false), terminated: false }),
);

const badStringToken = token(
    atomic(/"(?:\\(?:\r\n|[\n\f\r]|[^\n\f\r])|[^"\\\n\f\r])*(?=\r\n|[\n\f\r])|'(?:\\(?:\r\n|[\n\f\r]|[^\n\f\r])|[^'\\\n\f\r])*(?=\r\n|[\n\f\r])/, (raw) => raw),
    "bad-string",
);

function decodeCssString(raw: string, terminated: boolean): string {
    const end = terminated ? raw.length - 1 : raw.length;
    let output = "";
    for (let cursor = 1; cursor < end;) {
        if (raw[cursor] !== "\\") {
            const first = raw.charCodeAt(cursor);
            const second = raw.charCodeAt(cursor + 1);
            if (first >= 0xd800 && first <= 0xdbff && second >= 0xdc00 && second <= 0xdfff) {
                output += raw.slice(cursor, cursor + 2);
                cursor += 2;
            } else {
                output += first === 0 || first >= 0xd800 && first <= 0xdfff ? "\uFFFD" : raw[cursor]!;
                cursor++;
            }
            continue;
        }
        if (raw[cursor + 1] === "\r" && raw[cursor + 2] === "\n") { cursor += 3; continue; }
        if (raw[cursor + 1] === "\n" || raw[cursor + 1] === "\f" || raw[cursor + 1] === "\r") { cursor += 2; continue; }
        const hex = raw.slice(cursor + 1).match(/^[0-9a-f]{1,6}/i)?.[0];
        if (hex !== undefined) {
            output += decodedCodePoint(Number.parseInt(hex, 16));
            cursor += 1 + hex.length;
            if (raw[cursor] === "\r" && raw[cursor + 1] === "\n") cursor += 2;
            else if (raw[cursor] !== undefined && /[\t\n\f\r ]/.test(raw[cursor]!)) cursor++;
            continue;
        }
        output += replaceInvalidCodePoints(raw[cursor + 1] ?? "\uFFFD");
        cursor += 2;
    }
    return output;
}

const urlToken = urlAtom.map(({ raw, span, value }) => ({
    kind: value.bad ? "bad-url" : "url",
    raw,
    span,
    value: value.value,
    terminated: value.terminated,
} satisfies CssToken));

const functionToken = token(
    atomic(new RegExp(`${IDENT}\\(`, "i"), (raw) => raw.slice(0, -1)),
    "function",
    ({ value }) => ({ value: decodeCssName(value) }),
);

const identToken = token(atomic(new RegExp(IDENT, "i"), (raw) => raw), "ident", ({ value }) => ({ value: decodeCssName(value) }));
const atKeywordToken = token(atomic(new RegExp(`@${IDENT}`, "i"), (raw) => raw.slice(1)), "at-keyword", ({ value }) => ({ value: decodeCssName(value) }));
const hashToken = token(atomic(new RegExp(`#${NAME}+`, "i"), (raw) => raw.slice(1)), "hash", ({ value }) => ({
    value: decodeCssName(value),
    id: new RegExp(`^${IDENT}$`, "i").test(value),
}));

const punctuation = (raw: string, kind: CssTokenKind): Parser<CssToken> => token(literalAtom(raw, (value) => value), kind);

export const openParenToken = punctuation("(", "open-paren");
export const closeParenToken = punctuation(")", "close-paren");
export const openSquareToken = punctuation("[", "open-square");
export const closeSquareToken = punctuation("]", "close-square");
export const openCurlyToken = punctuation("{", "open-curly");
export const closeCurlyToken = punctuation("}", "close-curly");
export const commaToken = punctuation(",", "comma");
export const colonToken = punctuation(":", "colon");
export const semicolonToken = punctuation(";", "semicolon");

const cdoToken = token(literalAtom("<!--", (value) => value), "cdo");
const cdcToken = token(literalAtom("-->", (value) => value), "cdc");
const delimToken = token(atomic(/[^\t\n\f\r (),:;\[\]{}]/u, (raw) => raw), "delim", ({ value }) => ({
    value: replaceInvalidCodePoints(value),
}));

/** A complete CSS Syntax token, excluding trivia. */
export const cssToken: Parser<CssToken> = any(
    cdoToken, cdcToken, urlToken, stringToken, eofStringToken, badStringToken, hashToken, atKeywordToken,
    dimensionToken, percentageToken, numberToken, functionToken, identToken,
    commaToken, colonToken, semicolonToken, openParenToken, closeParenToken,
    openSquareToken, closeSquareToken, openCurlyToken, closeCurlyToken, delimToken,
);

export const nonStructuralToken: Parser<CssToken> = any(
    cdoToken, cdcToken, urlToken, stringToken, eofStringToken, badStringToken, hashToken, atKeywordToken,
    dimensionToken, percentageToken, numberToken, identToken, commaToken, colonToken,
    semicolonToken, delimToken,
);

export const topLevelValueToken: Parser<CssToken> = any(
    cdoToken, cdcToken, urlToken, stringToken, eofStringToken, badStringToken, hashToken, atKeywordToken,
    dimensionToken, percentageToken, numberToken, identToken, commaToken, colonToken, delimToken,
);

export { functionToken, identToken, numberToken, percentageToken, dimensionToken, urlToken };
