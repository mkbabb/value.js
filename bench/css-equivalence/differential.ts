// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.h — THE DIFFERENTIAL: value.js's BBNF grammar (`src/css/bbnf`, the candidate) against the
// shipping hand parser (`src/css/grammar.ts`, the incumbent), over the six parse entries both
// carry. Ported from the retired seam's `css-equivalence/lib/differential.mjs` (evidence
// `docs/tranches/X/parse-that/evidence/W6/retired-seam/`): the same cell verdicts, the same RED
// triggers, the same declared convention, and the rulings read through the verbatim ports in `lib/`.
//
// THE CONVENTION, CARRIED UNCHANGED: where no ruling governs a disagreement it counts AGAINST the
// candidate — candidate-accepts/incumbent-rejects is MIS_ACCEPT, the reverse FALSE_REJECT_IN_SHAPE,
// both RED. A ruling is consulted only for a cell already read RED, and it governs only when the
// candidate's verdict is the one the ruling found correct (fail-closed). There is no
// COVERAGE_NARROWING leg: the BBNF grammar declares every head the incumbent reads.
//
// THE INCUMBENT IS value.js HEAD, not the 4.0.0 tarball the seam compared against: `.h` measures the
// grammar `.x` will swap in against the parser it retires.
//
// X.P.W6.x (2026-09-23): `.x` deleted the hand parser from `src/`; this harness moved from
// `test/css/equivalence/` to `bench/css-equivalence/` with it, and the incumbent is now passed in —
// the retired parser read back from git at its pinned commit (`bench/retired.ts`), never a copy.

import { isDeepStrictEqual } from "node:util";

import * as bbnf from "../../src/css/bbnf/index";
import { adjudicator, ruledValue } from "./lib/adjudications.mjs";
import type { CellResult } from "./lib/ruled.mjs";
import { resolveRuling } from "./lib/ruled.mjs";
import { resolveW6 } from "./w6-classes";

export const ENTRIES = [
    "parseCssColor",
    "parseCssScalar",
    "parseCssValue",
    "parseCssValues",
    "parseKeyframeSelector",
    "parseTimingFunction",
] as const;
export type Entry = (typeof ENTRIES)[number];

export const CELL = {
    AGREE: "AGREE",
    DECLARED_DIVERGENCE: "DECLARED_DIVERGENCE",
    FIXTURE_R1: "FIXTURE_R1",
    DIVERGENT_VALUE: "DIVERGENT_VALUE",
    MIS_ACCEPT: "MIS_ACCEPT",
    FALSE_REJECT_IN_SHAPE: "FALSE_REJECT_IN_SHAPE",
    CANDIDATE_THREW: "CANDIDATE_THREW",
    CANDIDATE_SHAPE: "CANDIDATE_SHAPE",
    ADJUDICATION_UNHONOURED: "ADJUDICATION_UNHONOURED",
} as const;
export type Verdict = (typeof CELL)[keyof typeof CELL];

/** The authority's RED triggers, by name — each one cell of MIRROR-DEFECTS. */
export const RED_TRIGGERS: readonly Verdict[] = [
    CELL.DIVERGENT_VALUE,
    CELL.MIS_ACCEPT,
    CELL.FALSE_REJECT_IN_SHAPE,
    CELL.CANDIDATE_THREW,
    CELL.CANDIDATE_SHAPE,
    CELL.ADJUDICATION_UNHONOURED,
];

export type Cell = { verdict: Verdict; why: string | null; ruling?: string };
type Fn = (source: string) => unknown;

/** One call, its throw recorded as a verdict (a candidate throw is RED; an incumbent throw is R1's). */
export function call(fn: Fn, source: string): CellResult {
    try {
        return { threw: false, value: fn(source) as CellResult["value"] };
    } catch (error) {
        return { threw: true, value: { ok: false, diagnostics: [{ code: `threw ${String(error)}` }] } };
    }
}

const ok = (r: CellResult) => !r.threw && r.value?.ok === true;
const code = (r: CellResult) => r.value?.diagnostics?.[0]?.code ?? "?";

/** The frozen result law: `ok:true` carries no diagnostics, `ok:false` at least one. */
function shapeFault(r: CellResult): string | null {
    const v = r.value;
    if (v === null || typeof v !== "object") return "not an object";
    if (v.ok === true) return Array.isArray(v.diagnostics) && v.diagnostics.length === 0 ? null : "ok:true with diagnostics";
    if (v.ok === false) return Array.isArray(v.diagnostics) && v.diagnostics.length > 0 ? null : "ok:false with EMPTY diagnostics";
    return "`ok` is neither true nor false";
}

const CANDIDATE: Record<Entry, Fn> = bbnf;

/** The value a ruling requires of the candidate, given the incumbent's (PB-03 · PB-04/05; identity elsewhere). */
const owed = (input: string, value: unknown) => ruledValue(input, value).value;

type Resolve = ReturnType<typeof adjudicator>;

/** One cell, before the per-cell rulings and the W6 classes — the seam's `classifyCell`, carried. */
function classify(input: string, incumbent: CellResult, candidate: CellResult, resolve: Resolve, incumbentAccepts: (s: string) => boolean): Cell {
    if (candidate.threw) return { verdict: CELL.CANDIDATE_THREW, why: code(candidate) };
    const fault = shapeFault(candidate);
    if (fault) return { verdict: CELL.CANDIDATE_SHAPE, why: fault };
    if (incumbent.threw) return { verdict: CELL.FIXTURE_R1, why: `incumbent ${code(incumbent)}; candidate ok:${ok(candidate)}` };

    const incOk = ok(incumbent);
    const candOk = ok(candidate);
    const same = () => isDeepStrictEqual(owed(input, incumbent.value?.value), candidate.value?.value);
    const adjudicated = resolve(input, incumbentAccepts);

    if (adjudicated) {
        const wants = adjudicated.expected === "accept";
        if (candOk !== wants)
            return { verdict: CELL.ADJUDICATION_UNHONOURED, why: `${adjudicated.id} requires ${adjudicated.expected}; candidate ${candOk ? "accepts" : "rejects"}`, ruling: adjudicated.id };
        if (candOk && incOk && !adjudicated.valueDiffers && !same())
            return { verdict: CELL.DIVERGENT_VALUE, why: `${adjudicated.id} is not value-differing, yet the values differ`, ruling: adjudicated.id };
        return { verdict: candOk === incOk && (!candOk || same()) ? CELL.AGREE : CELL.DECLARED_DIVERGENCE, why: `${adjudicated.id} honoured (${adjudicated.expected})`, ruling: adjudicated.id };
    }
    if (incOk && candOk) return same() ? { verdict: CELL.AGREE, why: null } : { verdict: CELL.DIVERGENT_VALUE, why: "values differ" };
    if (!incOk && !candOk) return { verdict: CELL.AGREE, why: null };
    if (incOk) return { verdict: CELL.FALSE_REJECT_IN_SHAPE, why: `incumbent accepts; candidate rejects ${code(candidate)}` };
    return { verdict: CELL.MIS_ACCEPT, why: `incumbent rejects ${code(incumbent)}; candidate accepts` };
}

export type Miss = { entry: Entry; input: string; verdict: Verdict; why: string | null };
export type Row = { entry: Entry; cells: number; tally: Record<Verdict, number>; rulings: Record<string, number>; misses: Miss[] };

/**
 * One entry over the corpus: every cell classified, a RED cell handed to the rulings, then to the W6
 * classes. `candidateFn` is the BBNF entry; the falsifier alone passes another.
 */
export function runEntry(
    entry: Entry,
    sources: readonly string[],
    incumbent: Readonly<Record<Entry, Fn>>,
    candidateFn: Fn = CANDIDATE[entry],
): Row {
    const inc = incumbent[entry];
    const cand = candidateFn;
    const resolve = adjudicator(entry);
    const incumbentAccepts = (s: string) => ok(call(inc, s));
    const cellOf = (s: string, candidate: CellResult) => classify(s, call(inc, s), candidate, resolve, incumbentAccepts);
    const reclassify = (s: string) => {
        const candidate = call(cand, s);
        const cell = cellOf(s, candidate);
        return { verdict: cell.verdict, red: RED_TRIGGERS.includes(cell.verdict), candidate };
    };

    const tally = Object.fromEntries(Object.values(CELL).map((k) => [k, 0])) as Record<Verdict, number>;
    const rulings: Record<string, number> = {};
    const misses: Miss[] = [];
    for (const input of sources) {
        const incumbent = call(inc, input);
        const candidate = call(cand, input);
        let cell = classify(input, incumbent, candidate, resolve, incumbentAccepts);
        if (RED_TRIGGERS.includes(cell.verdict)) {
            const perCell = resolveRuling({ entry, input, candidate, reclassify });
            if (perCell !== null)
                cell = perCell.honoured
                    ? { verdict: CELL.DECLARED_DIVERGENCE, why: perCell.why, ruling: perCell.rulingId }
                    : { verdict: CELL.ADJUDICATION_UNHONOURED, why: perCell.why, ruling: perCell.rulingId };
            else
                cell = resolveW6({
                    entry,
                    input,
                    incumbent,
                    candidate,
                    cell,
                    reclassify: (s) => cellOf(s, call(cand, s)),
                    run: { incumbent: (s) => call(inc, s), candidate: (s) => call(cand, s) },
                    red: (v) => RED_TRIGGERS.includes(v),
                });
        }
        tally[cell.verdict] += 1;
        if (cell.ruling && cell.verdict !== CELL.AGREE) rulings[cell.ruling] = (rulings[cell.ruling] ?? 0) + 1;
        if (RED_TRIGGERS.includes(cell.verdict)) misses.push({ entry, input, verdict: cell.verdict, why: cell.why });
    }
    return { entry, cells: sources.length, tally, rulings, misses };
}
