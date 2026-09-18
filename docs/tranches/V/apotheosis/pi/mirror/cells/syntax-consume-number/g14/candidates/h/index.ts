import { regex } from "@mkbabb/parse-that/core";

type CssNumber = {
    sign: "+" | "-" | null;
    type: "integer" | "number";
    value: number;
};

export const consumeNumber = regex(/[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?/).map(
    (representation): CssNumber => ({
        sign: representation[0] === "+" ? "+" : representation[0] === "-" ? "-" : null,
        type: /[.eE]/.test(representation) ? "number" : "integer",
        value: Number(representation),
    }),
);
