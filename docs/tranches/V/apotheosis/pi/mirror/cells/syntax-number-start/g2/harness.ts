import { ParserState, string } from "@mkbabb/parse-that/core";
import type {
    CompositionObservation,
    DiagnosticSnapshot,
    NumberStartCase,
    NumberStartParser,
    PredecessorValue,
    SeedMode,
} from "./contract.js";

const predecessorFactories = Object.freeze([
    (_caseId: string, _mode: SeedMode): PredecessorValue => null,
    (_caseId: string, _mode: SeedMode): PredecessorValue => false,
    (_caseId: string, _mode: SeedMode): PredecessorValue => 0,
    (_caseId: string, _mode: SeedMode): PredecessorValue => "",
    (caseId: string, _mode: SeedMode): PredecessorValue => Object.freeze([caseId]),
    (caseId: string, mode: SeedMode): PredecessorValue => Object.freeze({ caseId, mode }),
]);

const sourceText = (testCase: NumberStartCase): string =>
    testCase.source ?? String.fromCharCode(...(testCase.sourceUtf16 ?? []));

const continuationText = (testCase: NumberStartCase): string =>
    testCase.continuation ?? String.fromCharCode(...(testCase.continuationUtf16 ?? []));

const cloneExpected = (value: string[] | undefined): string[] | undefined =>
    value === undefined ? undefined : [...value];

function snapshot(state: ParserState<unknown>): DiagnosticSnapshot {
    return Object.freeze({
        furthest: state.furthest,
        expected: cloneExpected(state.expected),
        suggestions: Object.freeze(state.suggestions.map((item) => Object.freeze({ ...item }))),
        secondarySpans: Object.freeze(state.secondarySpans.map((item) => Object.freeze({ ...item }))),
    });
}

const sameSnapshot = (left: DiagnosticSnapshot, right: DiagnosticSnapshot): boolean =>
    JSON.stringify(left) === JSON.stringify(right);

function initialState(source: string, testCase: NumberStartCase, mode: SeedMode): ParserState<unknown> {
    const state = new ParserState<unknown>(source, `entry:${testCase.id}:${mode}`);
    if (mode === "seeded") {
        state.furthest = -7;
        state.expected = [`prior:${testCase.id}`];
        state.suggestions.push({
            kind: "unclosed-delimiter",
            message: `prior:${testCase.id}`,
            openOffset: testCase.offset,
        });
        state.secondarySpans.push({ offset: testCase.offset, label: `prior:${testCase.id}` });
    }
    return state;
}

const predecessorKind = (value: PredecessorValue): string => {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value;
};

export function observeNumberStartInComposition(
    parser: NumberStartParser,
    testCase: NumberStartCase,
    seedMode: SeedMode,
    predecessorIndex: number,
): CompositionObservation {
    const source = sourceText(testCase);
    const continuation = continuationText(testCase);
    const prefix = source.slice(0, testCase.offset);
    const predecessorFactory = predecessorFactories[predecessorIndex % predecessorFactories.length]!;
    const predecessor = predecessorFactory(
        testCase.id,
        seedMode,
    );
    const state = initialState(source, testCase, seedMode);
    const before = snapshot(state);

    if (prefix.length !== testCase.offset || !source.startsWith(continuation, testCase.offset)) {
        return Object.freeze({
            ok: false,
            value: null,
            seedMode,
            predecessorKind: predecessorKind(predecessor),
            candidateStart: testCase.offset,
            finalOffset: state.offset,
            diagnosticsBefore: before,
            diagnosticsAfter: snapshot(state),
            issue: "invalid_fixture",
        });
    }

    const composed = string(prefix)
        .map(() => predecessor)
        .next(parser)
        .skip(string(continuation));

    try {
        composed.call(state as ParserState<boolean>);
    } catch {
        return Object.freeze({
            ok: false,
            value: null,
            seedMode,
            predecessorKind: predecessorKind(predecessor),
            candidateStart: testCase.offset,
            finalOffset: state.offset,
            diagnosticsBefore: before,
            diagnosticsAfter: snapshot(state),
            issue: "threw",
        });
    }

    const after = snapshot(state);
    const expectedOffset = testCase.offset + continuation.length;
    const issue = state.isError
        ? "outer_error"
        : typeof state.value !== "boolean"
            ? "non_boolean"
            : state.offset !== expectedOffset
                ? "wrong_offset"
                : !sameSnapshot(before, after)
                    ? "diagnostic_pollution"
                    : null;

    return Object.freeze({
        ok: issue === null,
        value: typeof state.value === "boolean" ? state.value : null,
        seedMode,
        predecessorKind: predecessorKind(predecessor),
        candidateStart: testCase.offset,
        finalOffset: state.offset,
        diagnosticsBefore: before,
        diagnosticsAfter: after,
        issue,
    });
}

export function assertNumberStartCase(
    parser: NumberStartParser,
    testCase: NumberStartCase,
    caseIndex: number,
): void {
    for (const [modeIndex, seedMode] of (["empty", "seeded"] as const).entries()) {
        for (let variant = 0; variant < predecessorFactories.length; variant += 1) {
            const observation = observeNumberStartInComposition(
                parser,
                testCase,
                seedMode,
                caseIndex + modeIndex + variant,
            );
            if (!observation.ok || observation.value !== testCase.starts) {
                throw new Error(
                    `${testCase.id}/${seedMode}/${variant}: expected ${testCase.starts}, received ${JSON.stringify(observation)}`,
                );
            }
        }
    }
}

export function materializeNumberStartHostile(id: string): Readonly<{
    source: string;
    offset: number;
    starts: boolean;
    continuation: string;
}> {
    switch (id) {
        case "H-PREFIX-1M-TRUE": return Object.freeze({
            source: `${"x".repeat(1_000_000)}+.5`, offset: 1_000_000, starts: true, continuation: "+",
        });
        case "H-ASTRAL-PREFIX-1M-FALSE": return Object.freeze({
            source: `${"💩".repeat(500_000)}+x`, offset: 1_000_000, starts: false, continuation: "+",
        });
        case "H-CR-PREFIX-1M-TRUE": return Object.freeze({
            source: `${"\r".repeat(1_000_000)}-.5`, offset: 1_000_000, starts: true, continuation: "-",
        });
        default: throw new Error(`unknown hostile fixture: ${id}`);
    }
}
