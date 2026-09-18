import { dispatch, regex } from "@mkbabb/parse-that/core";

const signed = regex(/[+-](?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?/);
const dotted = regex(/\.[0-9]+(?:[eE][+-]?[0-9]+)?/);
const digit = regex(/[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/);

export const consumeNumber = dispatch({
    "+-": signed,
    ".": dotted,
    "0-9": digit,
}).map((representation) => Object.freeze({
    sign: representation.startsWith("+") ? "+" : representation.startsWith("-") ? "-" : null,
    type: representation.includes(".") || /[eE]/.test(representation) ? "number" : "integer",
    value: Number(representation),
}));
