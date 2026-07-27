/**
 * GROUND-A · the measurement engine.
 *
 * Runs every numbered production's probe inputs through the LIVE parser at
 * `src/css/*` (the subject under replacement) and classifies each production.
 * No spec is quoted here and no verdict is asserted here — this file only
 * measures. `productions.ts` holds what the spec owes; `denominator.test.ts`
 * locks the measurement.
 */
import * as css from "../../../../../../../src/css/index";
import type { Case, Entry, Production, Verdict } from "./productions";
import { PRODUCTIONS } from "./productions";

type Parse = (source: string, arg?: string) => { ok: boolean; diagnostics: readonly { code: string }[] };

const ENTRIES: Readonly<Record<Entry, Parse>> = {
    parseCssColor: css.parseCssColor,
    parseCssScalar: css.parseCssScalar,
    parseCssValue: css.parseCssValue,
    parseTimingFunction: css.parseTimingFunction,
    parseKeyframeSelector: css.parseKeyframeSelector,
    parseAnimationTimeline: css.parseAnimationTimeline,
    parseAnimationRange: css.parseAnimationRange,
    parseStylesheet: css.parseStylesheet,
    coerceToSyntax: (source, arg) => css.coerceToSyntax(source, arg ?? "*"),
};

export type Measurement = Readonly<{
    input: string;
    arg?: string;
    owed: Verdict;
    actual: Verdict;
    /** ParseIssue.code on REJECT; the thrown constructor name on THROW. */
    code: string | null;
    matches: boolean;
}>;

/**
 * How a production stands against the spec, most severe first.
 *
 * CRASH    — some input throws. A ParseResult library must never throw.
 * UNSOUND  — some input the spec forbids is accepted.
 * GAP      — some input the spec requires is refused with a generic code.
 * DEFERRED — every refusal of a spec-required input is the typed, deliberate
 *            `color_context_required` (context-free parser, by contract).
 * SHIPS    — every probe matches what the spec owes.
 */
export type Status = "CRASH" | "UNSOUND" | "GAP" | "DEFERRED" | "SHIPS";

export type Result = Readonly<{
    production: Production;
    measurements: readonly Measurement[];
    status: Status;
}>;

/** One probe against the live parser. Never throws — that is the point. */
export function probe(
    entry: Entry,
    input: string,
    arg?: string,
): Readonly<{ verdict: Verdict; code: string | null }> {
    const parse = ENTRIES[entry];
    try {
        const result = parse(input, arg);
        if (result.ok) return { verdict: "ACCEPT", code: null };
        return { verdict: "REJECT", code: result.diagnostics[0]?.code ?? null };
    } catch (error) {
        return { verdict: "THROW", code: (error as Error).constructor.name };
    }
}

function measureCase(entry: Entry, probeCase: Case): Measurement {
    const { verdict, code } = probe(entry, probeCase.input, probeCase.arg);
    return {
        input: probeCase.input,
        ...(probeCase.arg === undefined ? {} : { arg: probeCase.arg }),
        owed: probeCase.owed,
        actual: verdict,
        code,
        matches: verdict === probeCase.owed,
    };
}

function classify(measurements: readonly Measurement[]): Status {
    if (measurements.some((m) => m.actual === "THROW")) return "CRASH";
    const misses = measurements.filter((m) => !m.matches);
    if (misses.length === 0) return "SHIPS";
    if (misses.some((m) => m.owed === "REJECT" && m.actual === "ACCEPT")) return "UNSOUND";
    return misses.every((m) => m.code === "color_context_required") ? "DEFERRED" : "GAP";
}

export function measure(production: Production): Result {
    const measurements = production.cases.map((probeCase) => measureCase(production.entry, probeCase));
    return { production, measurements, status: classify(measurements) };
}

export function measureAll(): readonly Result[] {
    return PRODUCTIONS.map(measure);
}

export type Scoreboard = Readonly<{
    productions: number;
    probes: number;
    byStatus: Readonly<Record<Status, number>>;
    byTier: Readonly<Record<"1" | "2" | "3", Readonly<Record<Status, number>>>>;
}>;

const ZERO: Readonly<Record<Status, number>> = { CRASH: 0, UNSOUND: 0, GAP: 0, DEFERRED: 0, SHIPS: 0 };

export function scoreboard(results: readonly Result[]): Scoreboard {
    const byStatus: Record<Status, number> = { ...ZERO };
    const byTier: Record<"1" | "2" | "3", Record<Status, number>> = {
        "1": { ...ZERO },
        "2": { ...ZERO },
        "3": { ...ZERO },
    };
    let probes = 0;
    for (const result of results) {
        probes += result.measurements.length;
        byStatus[result.status] += 1;
        byTier[String(result.production.tier) as "1" | "2" | "3"][result.status] += 1;
    }
    return { productions: results.length, probes, byStatus, byTier };
}
