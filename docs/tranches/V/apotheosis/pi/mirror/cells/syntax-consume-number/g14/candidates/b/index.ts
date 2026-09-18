import { Parser, all, any, regex, string } from "@mkbabb/parse-that/core";

type Sign = "+" | "-" | null;
type NumberType = "integer" | "number";
type CssNumber = { sign: Sign; type: NumberType; value: number };
type Mantissa = { representation: string; fractional: boolean };

const transaction = <T>(inner: Parser<T>): Parser<T> => new Parser<T>((state) => {
    const saved = state.save();
    inner.call(state);
    if (state.isError) {
        state.restore(saved);
        state.isError = true;
    }
    return state;
});

const signCharacter = () => any(string("+"), string("-"))
    .map((value): Exclude<Sign, null> => value === "+" ? "+" : "-");
const sign = signCharacter().opt().map((value): Sign => value ?? null);
const digits = regex(/[0-9]+/);

const fraction = () => all(string("."), digits)
    .map(([point, fractionalDigits]) => `${point}${fractionalDigits}`);
const integerMantissa = all(digits, fraction().opt())
    .map(([integerDigits, fractionalPart]): Mantissa => ({
        representation: `${integerDigits}${fractionalPart ?? ""}`,
        fractional: fractionalPart !== undefined,
    }));
const leadingFraction = fraction().map((representation): Mantissa => ({
    representation,
    fractional: true,
}));
const mantissa = any(integerMantissa, leadingFraction);
const exponentSign = signCharacter().opt().map((value) => value ?? "");

const exponent = all(
    any(string("e"), string("E")),
    exponentSign,
    digits,
).map(([marker, exponentSign, exponentDigits]) =>
    `${marker}${exponentSign}${exponentDigits}`
);

const representation = all(sign, mantissa, exponent.opt())
    .map(([parsedSign, parsedMantissa, parsedExponent]): CssNumber => {
        const sourceRepresentation = `${parsedSign ?? ""}${parsedMantissa.representation}${parsedExponent ?? ""}`;
        return {
            sign: parsedSign,
            type: parsedMantissa.fractional || parsedExponent !== undefined ? "number" : "integer",
            value: Number(sourceRepresentation),
        };
    });

export const consumeNumber: Parser<CssNumber> = transaction(representation);
