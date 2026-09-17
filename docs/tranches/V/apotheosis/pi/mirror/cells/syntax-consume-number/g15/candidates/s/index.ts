import { all, any, regex, string } from "@mkbabb/parse-that/core";
import type { Parser } from "@mkbabb/parse-that/core";

type Sign = "+" | "-" | null;
type NumberType = "integer" | "number";

export type CssNumber = {
    sign: Sign;
    type: NumberType;
    value: number;
};

type Mantissa = {
    representation: string;
    type: NumberType;
};

const decimalDigits = regex(/[0-9]+/);
const decimalPoint = string(".");
const plusSign = string("+");
const minusSign = string("-");
const empty = string("");
const exponentMarker = any(string("e"), string("E"));
const startsNumber = regex(/[+-]?(?:[0-9]|\.[0-9])/).peek().map(() => undefined);

const algebraicSign = any(plusSign, minusSign);
const signDecision = any(algebraicSign, empty);

const fractionalMantissa = all(decimalDigits, decimalPoint, decimalDigits).map(
    ([whole, point, fraction]): Mantissa => ({
        representation: `${whole}${point}${fraction}`,
        type: "number",
    }),
);

const integerMantissa = decimalDigits.map(
    (whole): Mantissa => ({
        representation: whole,
        type: "integer",
    }),
);

const leadingPointMantissa = all(decimalPoint, decimalDigits).map(
    ([point, fraction]): Mantissa => ({
        representation: `${point}${fraction}`,
        type: "number",
    }),
);

const mantissaShapeDecision = any(
    fractionalMantissa,
    integerMantissa,
    leadingPointMantissa,
);

const exponentSignDecision = any(algebraicSign, empty);
const presentExponent = all(
    exponentMarker,
    exponentSignDecision,
    decimalDigits,
).map(([marker, sign, digits]) => `${marker}${sign}${digits}`);
const exponentDecision = any(presentExponent, empty);

const stagedNumberBody = all(
    signDecision,
    mantissaShapeDecision,
    exponentDecision,
);
const stagedNumber = startsNumber.next(stagedNumberBody);

export const consumeNumber: Parser<CssNumber> = stagedNumber.map(
    ([sign, mantissa, exponent]): CssNumber => {
        const representation = `${sign}${mantissa.representation}${exponent}`;

        return {
            sign: sign === "" ? null : sign as Exclude<Sign, null>,
            type: exponent === "" ? mantissa.type : "number",
            value: Number(representation),
        };
    },
);
