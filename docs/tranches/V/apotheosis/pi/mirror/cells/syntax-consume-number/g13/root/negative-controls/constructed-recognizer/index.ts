import { Parser, all, any, regex } from "@mkbabb/parse-that/core";
const recognizer = new RegExp("[+-]?(?:[0-9]*\\.[0-9]+|[0-9]+)" + "(?:[eE][+-]?[0-9]+)?");
export const consumeNumber = regex(recognizer).map((raw) => Object.freeze({ sign: raw.startsWith("+") ? "+" as const : raw.startsWith("-") ? "-" as const : null, type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const, value: Number(raw) }));
