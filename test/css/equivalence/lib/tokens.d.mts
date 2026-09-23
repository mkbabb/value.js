// SERVED MODEL: claude-opus-5-5
// X.P.W6.h — the types of the exports `../w6-classes.ts` reads from the verbatim port.

export type Token = {
    kind: "ws" | "numeric" | "ident" | "function" | "string" | "punct";
    text: string;
    start: number;
    end: number;
    value?: number;
    unit?: string;
};
export type Call = { head: string; args: Token[][]; seps: string[]; closed: boolean; start: number };

export function tokenize(src: string): Token[];
export function callsOf(src: string, heads: readonly string[]): Call[];
export function soleNumeric(arg: Token[] | undefined): (Token & { value: number; unit: string }) | null;
export function spliceAll(src: string, edits: ReadonlyArray<{ start: number; end: number; text: string }>): string;
