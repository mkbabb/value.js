import { regex } from "@mkbabb/parse-that/core";

type CssNumber = {
    sign: "+" | "-" | null;
    type: "integer" | "number";
    value: number;
};

export const consumeNumber = regex(
    /[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[Ee][+-]?[0-9]+)?/,
).map((representation): CssNumber => {
    const head = representation.charCodeAt(0);
    return {
        sign: head === 43 ? "+" : head === 45 ? "-" : null,
        type: representation.indexOf(".") >= 0
            || representation.indexOf("e") >= 0
            || representation.indexOf("E") >= 0
            ? "number"
            : "integer",
        value: +representation,
    };
});
