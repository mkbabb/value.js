import { ParserState, string } from "@mkbabb/parse-that/core";
import { disableDiagnostics, enableDiagnostics } from "@mkbabb/parse-that/diagnostics";
import type { SecondarySpan, Suggestion } from "@mkbabb/parse-that/diagnostics";
import type {
    CompositionObservation,
    DiagnosticProfileId,
    DiagnosticSummary,
    DiagnosticsMode,
    MappedPreprocessingCase,
    NumberStartCase,
    NumberStartFixtures,
    NumberStartParser,
    PredecessorValue,
    SourcePrefix,
} from "./contract.js";

export const diagnosticProfileOrder = Object.freeze([
    "default-present-undefined",
    "absent-before",
    "undefined-before-multi",
    "empty-at",
    "multi-at",
    "multi-beyond",
    "multi-source-end",
] as const satisfies readonly DiagnosticProfileId[]);

export const diagnosticsModeOrder = Object.freeze([
    "disabled",
    "enabled",
] as const satisfies readonly DiagnosticsMode[]);

const predecessorFactories = Object.freeze([
    (_caseId: string, _mode: DiagnosticsMode): PredecessorValue => null,
    (_caseId: string, _mode: DiagnosticsMode): PredecessorValue => false,
    (_caseId: string, _mode: DiagnosticsMode): PredecessorValue => 0,
    (_caseId: string, _mode: DiagnosticsMode): PredecessorValue => "",
    (caseId: string, _mode: DiagnosticsMode): PredecessorValue => Object.freeze([caseId]),
    (caseId: string, mode: DiagnosticsMode): PredecessorValue => Object.freeze({ caseId, mode }),
]);

const fromSourcePrefix = (prefix: SourcePrefix): string =>
    prefix.text ?? String.fromCharCode(...(prefix.utf16 ?? []));

const rawMappedSource = (testCase: MappedPreprocessingCase): string =>
    testCase.raw ?? String.fromCharCode(...(testCase.rawUtf16 ?? []));

const rawMappedContinuation = (testCase: MappedPreprocessingCase): string =>
    testCase.rawContinuation
    ?? String.fromCharCode(...(testCase.rawContinuationUtf16 ?? []));

export function materializePublicCases(fixtures: NumberStartFixtures): readonly NumberStartCase[] {
    const result: NumberStartCase[] = [];
    for (const sourcePrefix of fixtures.positive_matrix.sourcePrefixes) {
        const before = fromSourcePrefix(sourcePrefix);
        for (const numberPrefix of fixtures.positive_matrix.numberPrefixes) {
            for (const digit of fixtures.positive_matrix.digits) {
                const spelling = `${numberPrefix}${digit}`;
                result.push(Object.freeze({
                    id: `T/${sourcePrefix.id}/${JSON.stringify(numberPrefix)}/${digit}`,
                    source: `${before}${spelling}${fixtures.positive_matrix.tail}`,
                    offset: before.length,
                    starts: true,
                    continuation: spelling,
                    positionKind: "retained",
                }));
            }
        }
    }
    for (const sourcePrefix of fixtures.negative_matrix.sourcePrefixes) {
        const before = fromSourcePrefix(sourcePrefix);
        for (const spelling of fixtures.negative_matrix.spellings) {
            result.push(Object.freeze({
                id: `F/${sourcePrefix.id}/${JSON.stringify(spelling)}`,
                source: `${before}${spelling}${fixtures.negative_matrix.tail}`,
                offset: before.length,
                starts: false,
                continuation: spelling,
                positionKind: "retained",
            }));
        }
    }
    for (const mapped of fixtures.mapped_preprocessing_cases) {
        result.push(Object.freeze({
            id: `${mapped.id}/raw`,
            source: rawMappedSource(mapped),
            offset: mapped.rawOffset,
            starts: mapped.starts,
            continuation: rawMappedContinuation(mapped),
            positionKind: mapped.rawOffset === rawMappedSource(mapped).length ? "eof" : "retained",
        }));
        result.push(Object.freeze({
            id: `${mapped.id}/preprocessed`,
            source: mapped.preprocessed,
            offset: mapped.preprocessedOffset,
            starts: mapped.starts,
            continuation: mapped.preprocessedContinuation,
            positionKind: mapped.preprocessedOffset === mapped.preprocessed.length ? "eof" : "retained",
        }));
    }
    return Object.freeze(result);
}

export function materializeNumberStartHostile(id: string): NumberStartCase {
    switch (id) {
        case "H-PREFIX-1M-TRUE": return Object.freeze({
            id, source: `${"x".repeat(1_000_000)}+.9`, offset: 1_000_000,
            starts: true, continuation: "+.9", positionKind: "retained",
        });
        case "H-ASTRAL-PREFIX-1M-FALSE": return Object.freeze({
            id, source: `${"💩".repeat(500_000)}-x`, offset: 1_000_000,
            starts: false, continuation: "-x", positionKind: "retained",
        });
        case "H-CR-PREFIX-1M-TRUE": return Object.freeze({
            id, source: `${"\r".repeat(1_000_000)}-9`, offset: 1_000_000,
            starts: true, continuation: "-9", positionKind: "retained",
        });
        default: throw new Error(`unknown hostile fixture: ${id}`);
    }
}

type DiagnosticIdentity = Readonly<{
    furthest: number;
    expectedOwn: boolean;
    expectedReference: string[] | undefined;
    expectedValues: readonly string[] | undefined;
    suggestionsReference: Suggestion[];
    suggestionReferences: readonly Suggestion[];
    suggestionValues: readonly Readonly<Suggestion & { openOffsetOwn: boolean }>[];
    spansReference: SecondarySpan[];
    spanReferences: readonly SecondarySpan[];
    spanValues: readonly Readonly<SecondarySpan>[];
}>;

const hasOwn = (value: object, key: PropertyKey): boolean =>
    Object.prototype.hasOwnProperty.call(value, key);

function captureDiagnosticIdentity(state: ParserState<unknown>): DiagnosticIdentity {
    return {
        furthest: state.furthest,
        expectedOwn: hasOwn(state, "expected"),
        expectedReference: state.expected,
        expectedValues: state.expected === undefined ? undefined : [...state.expected],
        suggestionsReference: state.suggestions,
        suggestionReferences: [...state.suggestions],
        suggestionValues: state.suggestions.map((item) => ({
            ...item,
            openOffsetOwn: hasOwn(item, "openOffset"),
        })),
        spansReference: state.secondarySpans,
        spanReferences: [...state.secondarySpans],
        spanValues: state.secondarySpans.map((item) => ({ ...item })),
    };
}

function suggestionMatches(left: Suggestion, right: Readonly<Suggestion & { openOffsetOwn: boolean }>): boolean {
    return left.kind === right.kind
        && left.message === right.message
        && hasOwn(left, "openOffset") === right.openOffsetOwn
        && left.openOffset === right.openOffset;
}

function diagnosticsMatch(state: ParserState<unknown>, before: DiagnosticIdentity): boolean {
    return state.furthest === before.furthest
        && hasOwn(state, "expected") === before.expectedOwn
        && state.expected === before.expectedReference
        && (state.expected === undefined
            ? before.expectedValues === undefined
            : before.expectedValues !== undefined
                && state.expected.length === before.expectedValues.length
                && state.expected.every((item, index) => item === before.expectedValues?.[index]))
        && state.suggestions === before.suggestionsReference
        && state.suggestions.length === before.suggestionReferences.length
        && state.suggestions.every((item, index) =>
            item === before.suggestionReferences[index]
            && before.suggestionValues[index] !== undefined
            && suggestionMatches(item, before.suggestionValues[index]!))
        && state.secondarySpans === before.spansReference
        && state.secondarySpans.length === before.spanReferences.length
        && state.secondarySpans.every((item, index) =>
            item === before.spanReferences[index]
            && item.offset === before.spanValues[index]?.offset
            && item.label === before.spanValues[index]?.label);
}

function summarize(state: ParserState<unknown>): DiagnosticSummary {
    const expectedPresence = !hasOwn(state, "expected")
        ? "absent"
        : state.expected === undefined
            ? "undefined"
            : "array";
    return Object.freeze({
        furthest: state.furthest,
        expectedPresence,
        expected: state.expected === undefined ? undefined : Object.freeze([...state.expected]),
        suggestionCount: state.suggestions.length,
        secondarySpanCount: state.secondarySpans.length,
    });
}

function setDiagnosticsMode(mode: DiagnosticsMode): void {
    if (mode === "enabled") enableDiagnostics();
    else disableDiagnostics();
}

function diagnosticsModeMatches(mode: DiagnosticsMode): boolean {
    const probe = new ParserState<string>("x", "probe");
    string("y").call(probe);
    const observedEnabled = Array.isArray(probe.expected) && probe.expected.length > 0;
    return observedEnabled === (mode === "enabled");
}

function applyProfile(
    state: ParserState<unknown>,
    profile: DiagnosticProfileId,
    candidateOffset: number,
): void {
    const before = Math.max(-1, candidateOffset - 1);
    const beyond = candidateOffset < state.src.length ? candidateOffset + 1 : candidateOffset;
    switch (profile) {
        case "default-present-undefined":
            return;
        case "absent-before":
            state.furthest = before;
            delete state.expected;
            state.suggestions.push({ kind: "trailing-content", message: "absent-before" });
            return;
        case "undefined-before-multi":
            state.furthest = before;
            state.suggestions.push(
                { kind: "trailing-content", message: "before-a" },
                { kind: "unclosed-delimiter", message: "before-b", openOffset: candidateOffset },
            );
            state.secondarySpans.push({ offset: candidateOffset, label: "before" });
            return;
        case "empty-at":
            state.furthest = candidateOffset;
            state.expected = [];
            state.secondarySpans.push(
                { offset: candidateOffset, label: "at-a" },
                { offset: candidateOffset, label: "at-b" },
            );
            return;
        case "multi-at":
            state.furthest = candidateOffset;
            state.expected = ["alpha", "beta"];
            state.suggestions.push(
                { kind: "trailing-content", message: "at-a" },
                { kind: "unclosed-delimiter", message: "at-b", openOffset: candidateOffset },
            );
            state.secondarySpans.push(
                { offset: candidateOffset, label: "at-a" },
                { offset: candidateOffset, label: "at-b" },
            );
            return;
        case "multi-beyond":
            state.furthest = beyond;
            state.expected = ["beyond"];
            state.suggestions.push({ kind: "trailing-content", message: "beyond" });
            state.secondarySpans.push(
                { offset: candidateOffset, label: "beyond-a" },
                { offset: beyond, label: "beyond-b" },
                { offset: state.src.length, label: "beyond-c" },
            );
            return;
        case "multi-source-end":
            state.furthest = state.src.length;
            state.expected = ["end", "tail"];
            state.suggestions.push({ kind: "unclosed-delimiter", message: "end", openOffset: 0 });
            state.secondarySpans.push({ offset: state.src.length, label: "end" });
    }
}

const predecessorKind = (value: PredecessorValue): string => {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value;
};

export function observeNumberStartInComposition(
    parser: NumberStartParser,
    testCase: NumberStartCase,
    diagnosticsMode: DiagnosticsMode,
    diagnosticProfile: DiagnosticProfileId,
    predecessorIndex: number,
): CompositionObservation {
    const prefix = testCase.source.slice(0, testCase.offset);
    const predecessorFactory = predecessorFactories[predecessorIndex % predecessorFactories.length]!;
    const predecessor = predecessorFactory(testCase.id, diagnosticsMode);
    const state = new ParserState<unknown>(testCase.source, `entry:${testCase.id}`);
    applyProfile(state, diagnosticProfile, testCase.offset);
    const beforeIdentity = captureDiagnosticIdentity(state);
    const beforeSummary = summarize(state);

    if (prefix.length !== testCase.offset
        || !testCase.source.startsWith(testCase.continuation, testCase.offset)) {
        return Object.freeze({
            ok: false, value: null, diagnosticsMode, diagnosticProfile,
            predecessorKind: predecessorKind(predecessor), candidateStart: testCase.offset,
            finalOffset: state.offset, diagnosticsBefore: beforeSummary,
            diagnosticsAfter: summarize(state), issue: "invalid_fixture",
        });
    }

    const composed = string(prefix)
        .map(() => predecessor)
        .next(parser)
        .skip(string(testCase.continuation));

    let resultState: ParserState<unknown> = state;
    let threw = false;
    setDiagnosticsMode(diagnosticsMode);
    try {
        resultState = composed.call(state as ParserState<boolean>);
    } catch {
        threw = true;
    }
    const modePreserved = diagnosticsModeMatches(diagnosticsMode);
    disableDiagnostics();

    const afterSummary = summarize(resultState);
    const expectedOffset = testCase.offset + testCase.continuation.length;
    const issue = threw
        ? "threw"
        : resultState !== state
            ? "state_identity_changed"
            : resultState.isError
                ? "outer_error"
                : typeof resultState.value !== "boolean"
                    ? "non_boolean"
                    : resultState.offset !== expectedOffset
                        ? "wrong_offset"
                        : !diagnosticsMatch(resultState, beforeIdentity)
                            ? "diagnostic_identity_or_value_changed"
                            : !modePreserved
                                ? "diagnostics_mode_changed"
                                : null;
    return Object.freeze({
        ok: issue === null,
        value: typeof resultState.value === "boolean" ? resultState.value : null,
        diagnosticsMode,
        diagnosticProfile,
        predecessorKind: predecessorKind(predecessor),
        candidateStart: testCase.offset,
        finalOffset: resultState.offset,
        diagnosticsBefore: beforeSummary,
        diagnosticsAfter: afterSummary,
        issue,
    });
}

export function assertNumberStartCase(
    parser: NumberStartParser,
    testCase: NumberStartCase,
    caseIndex: number,
): void {
    for (const [modeIndex, mode] of diagnosticsModeOrder.entries()) {
        for (const [profileIndex, profile] of diagnosticProfileOrder.entries()) {
            for (let predecessorIndex = 0; predecessorIndex < predecessorFactories.length; predecessorIndex += 1) {
                const observation = observeNumberStartInComposition(
                    parser,
                    testCase,
                    mode,
                    profile,
                    caseIndex + modeIndex + profileIndex + predecessorIndex,
                );
                if (!observation.ok || observation.value !== testCase.starts) {
                    throw new Error(
                        `${testCase.id}/${mode}/${profile}/${predecessorIndex}: expected ${testCase.starts}, received ${JSON.stringify(observation)}`,
                    );
                }
            }
        }
    }
}
