import { Parser, regex, string } from "@mkbabb/parse-that/core";

type Sign = "+" | "-" | null;
type NumberType = "integer" | "number";
type CssNumber = { sign: Sign; type: NumberType; value: number };

const transaction = <T>(parser: Parser<T>): Parser<T> => new Parser<T>((state) => {
    const saved = state.save();
    parser.call(state);
    if (state.isError) {
        state.restore(saved);
        state.isError = true;
    }
    return state;
});

const sign = regex(/[+-]/)
    .map((value): Exclude<Sign, null> => value as Exclude<Sign, null>)
    .opt();
const digits = regex(/[0-9]+/);

const fraction = string(".")
    .then(digits)
    .map(([point, tail]) => point + tail);

const mantissa = digits.opt().chain((integer) => integer === undefined
    ? fraction.map((decimal) => ({ representation: decimal, type: "number" as const }))
    : fraction.opt().map((decimal) => ({
        representation: integer + (decimal ?? ""),
        type: decimal === undefined ? "integer" as const : "number" as const,
    })));

const exponent = regex(/[eE]/)
    .then(regex(/[+-]/).opt())
    .then(digits)
    .map(([[marker, exponentSign], exponentDigits]) => marker + (exponentSign ?? "") + exponentDigits);

const stagedNumber = sign
    .then(mantissa)
    .then(exponent.opt())
    .map(([[parsedSign, parsedMantissa], parsedExponent]): CssNumber => {
        const representation = (parsedSign ?? "")
            + parsedMantissa.representation
            + (parsedExponent ?? "");
        return {
            sign: parsedSign ?? null,
            type: parsedExponent === undefined ? parsedMantissa.type : "number",
            value: Number(representation),
        };
    });

export const consumeNumber: Parser<CssNumber> = transaction(stagedNumber);
