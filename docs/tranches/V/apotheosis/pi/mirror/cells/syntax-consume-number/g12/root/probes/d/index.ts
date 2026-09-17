import { dispatch, regex } from "@mkbabb/parse-that/core";
const digit = regex(/[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/);
const dot = regex(/\.[0-9]+(?:[eE][+-]?[0-9]+)?/);
const signed = regex(/[+-](?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?/);
export const consumeNumber = dispatch({ "+-": signed, ".": dot, "0-9": digit }).map((raw) => Object.freeze({ sign: raw[0] === "+" ? "+" as const : raw[0] === "-" ? "-" as const : null, type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const, value: Number(raw) }));
