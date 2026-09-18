import { regex } from "@mkbabb/parse-that/core";

export const consumeNumber = regex(/[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/).map((representation) => Object.freeze({
    sign: representation.startsWith("+") ? "+" : representation.startsWith("-") ? "-" : null,
    type: representation.includes(".") || /[eE]/.test(representation) ? "number" : "integer",
    value: Number(representation),
}));
