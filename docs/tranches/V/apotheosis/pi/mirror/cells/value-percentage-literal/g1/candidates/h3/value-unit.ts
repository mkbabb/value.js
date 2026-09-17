import { regex } from "@mkbabb/parse-that/core";

export type CssNumber = {
    sign: "+" | "-" | null;
    type: "integer" | "number";
    value: number;
};

export const CSS_NUMBER_SOURCE = String.raw`[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[Ee][+-]?[0-9]+)?`;

export const projectNumber = (representation: string): CssNumber => ({
    sign: representation[0] === "+" ? "+" : representation[0] === "-" ? "-" : null,
    type: representation.includes(".") || representation.includes("e") || representation.includes("E")
        ? "number"
        : "integer",
    value: Number(representation),
});

export const consumeNumber = regex(new RegExp(CSS_NUMBER_SOURCE)).map(projectNumber);

export const percentageLiteral = regex(new RegExp(`${CSS_NUMBER_SOURCE}%`)).map((representation) => ({
    kind: "percentage" as const,
    number: projectNumber(representation.slice(0, -1)),
}));
