import { regex } from "@mkbabb/parse-that/core";

type CssNumber = {
    sign: "+" | "-" | null;
    type: "integer" | "number";
    value: number;
};

export const consumeNumber = regex(
    /[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[Ee][+-]?[0-9]+)?/,
).map((representation): CssNumber => ({
    sign: representation[0] === "+" ? "+" : representation[0] === "-" ? "-" : null,
    type: representation.includes(".") || representation.includes("e") || representation.includes("E")
        ? "number"
        : "integer",
    value: Number(representation),
}));
