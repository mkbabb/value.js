import { dispatch, regex } from "@mkbabb/parse-that/core";

type Sign = "+" | "-" | null;
type NumberType = "integer" | "number";
type CssNumber = { sign: Sign; type: NumberType; value: number };

const projectNumber = (representation: string): CssNumber => ({
    sign: representation[0] === "+" ? "+" : representation[0] === "-" ? "-" : null,
    type: representation.includes(".") || representation.includes("e") || representation.includes("E") ? "number" : "integer",
    value: Number(representation),
});

const signedNumber = regex(/[+-](?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?/).map(projectNumber);
const leadingDotNumber = regex(/\.\d+(?:[eE][+-]?\d+)?/).map(projectNumber);
const digitNumber = regex(/\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/).map(projectNumber);

export const consumeNumber = dispatch({
    "+-": signedNumber,
    ".": leadingDotNumber,
    "0-9": digitNumber,
});
