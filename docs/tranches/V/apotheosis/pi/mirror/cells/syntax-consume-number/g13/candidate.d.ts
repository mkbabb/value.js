declare module "@candidate" {
    import type { Parser } from "@mkbabb/parse-that/core";
    export const consumeNumber: Parser<Readonly<{ sign: "+" | "-" | null; type: "integer" | "number"; value: number }>>;
}
