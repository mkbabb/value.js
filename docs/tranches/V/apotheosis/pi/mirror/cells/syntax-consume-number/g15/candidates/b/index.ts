import { all, any, regex, string } from "@mkbabb/parse-that/core";

type Sign = "+" | "-" | null;
type NumberType = "integer" | "number";
type CssNumber = { sign: Sign; type: NumberType; value: number };
type Mantissa = { representation: string; type: NumberType };

const plus = string("+");
const minus = string("-");
const explicitSign = any(plus, minus);
const sign = explicitSign.opt().map<Sign>((value) =>
    value === "+" ? "+" : value === "-" ? "-" : null,
);

const digits = regex(/[0-9]+/);
const point = string(".");

const digitsFraction = all(digits, point, digits).map<Mantissa>(
    ([whole, separator, fraction]) => ({
        representation: `${whole}${separator}${fraction}`,
        type: "number",
    }),
);

const leadingFraction = all(point, digits).map<Mantissa>(
    ([separator, fraction]) => ({
        representation: `${separator}${fraction}`,
        type: "number",
    }),
);

const integerMantissa = digits.map<Mantissa>((whole) => ({
    representation: whole,
    type: "integer",
}));

const mantissa = any(digitsFraction, leadingFraction, integerMantissa);

const exponentMarker = any(string("e"), string("E"));
const exponentSign = any(plus, minus);

const signedExponent = all(exponentMarker, exponentSign, digits).map(
    ([marker, expSign, exponentDigits]) => `${marker}${expSign}${exponentDigits}`,
);

const unsignedExponent = all(exponentMarker, digits).map(
    ([marker, exponentDigits]) => `${marker}${exponentDigits}`,
);

const exponent = any(signedExponent, unsignedExponent).opt();

const number = all(sign, mantissa, exponent).map<CssNumber>(
    ([signValue, mantissaValue, exponentValue]) => ({
        sign: signValue,
        type: exponentValue === undefined ? mantissaValue.type : "number",
        value: Number(
            `${signValue ?? ""}${mantissaValue.representation}${exponentValue ?? ""}`,
        ),
    }),
);

const startsNumber = regex(/(?=[+-]?(?:[0-9]|\.[0-9]))/);

export const consumeNumber = startsNumber.next(number);
