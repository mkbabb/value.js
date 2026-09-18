import { dispatch, regex, type Parser } from "@mkbabb/parse-that/core";

type Sign = "+" | "-" | null;
type NumberType = "integer" | "number";
type CssNumber = { sign: Sign; type: NumberType; value: number };

const result = (representation: string, sign: Sign): CssNumber => ({
    sign,
    type: representation.includes(".") || /[eE]/.test(representation) ? "number" : "integer",
    value: Number(representation),
});

const signed = regex(/[+-](?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?/)
    .map((representation) => result(representation, representation[0] as "+" | "-"));

const leadingDot = regex(/\.[0-9]+(?:[eE][+-]?[0-9]+)?/)
    .map((representation) => result(representation, null));

const digitStart = regex(/[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/)
    .map((representation) => result(representation, null));

export const consumeNumber: Parser<CssNumber> = dispatch({
    "+-": signed,
    ".": leadingDot,
    "0-9": digitStart,
});
