// SERVED MODEL: claude-opus-5-5
// X.P.W6.h — the types of the two exports `../differential.ts` reads from the verbatim port.

/** A ruling's answer for one cell: which id governs it and what verdict it requires. */
export type Resolution = {
    id: string;
    ids: string[];
    expected: "accept" | "reject";
    valueDiffers: boolean;
    literal: boolean;
};

/** `adjudicator(entry)(input, oracleAccepts)` — the literal rows, then the reject classes, then the repair test. */
export function adjudicator(entry: string): (input: string, oracleAccepts?: (source: string) => boolean) => Resolution | null;

/** PB-03's scaling then PB-04/05's clamp, applied to the incumbent's value — the value the ruling requires. */
export function ruledValue(src: string, value: unknown): { value: unknown; ids: string[] };
