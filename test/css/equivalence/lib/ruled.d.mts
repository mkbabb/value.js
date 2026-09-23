// SERVED MODEL: claude-opus-5-5
// X.P.W6.h — the types of the export `../differential.ts` reads from the verbatim port.

export type CellResult = { threw: boolean; value?: { ok: boolean; value?: unknown; diagnostics?: ReadonlyArray<{ code: string }> } | undefined };

/** The 41 per-cell rulings (ADJUDICATION-W4.md §2) and the F-w4f-1 class, by entry and input. */
export function resolveRuling(args: {
    entry: string;
    input: string;
    candidate: CellResult;
    reclassify: (source: string) => { verdict: string; red: boolean; candidate: CellResult };
}): { rulingId: string; honoured: boolean; why: string } | null;
