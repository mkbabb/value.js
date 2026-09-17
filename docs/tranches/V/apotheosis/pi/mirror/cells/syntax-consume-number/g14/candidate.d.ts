declare module "@candidate" {
    import type { Parser } from "@mkbabb/parse-that/core";

    export type CssNumber = {
        sign: "+" | "-" | null;
        type: "integer" | "number";
        value: number;
    };

    export const consumeNumber: Parser<CssNumber>;
}
