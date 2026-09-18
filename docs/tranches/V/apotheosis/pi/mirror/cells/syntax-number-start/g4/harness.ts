import { ParserState, string } from "@mkbabb/parse-that/core";
import { disableDiagnostics, enableDiagnostics } from "@mkbabb/parse-that/diagnostics";
import type { SecondarySpan, Suggestion } from "@mkbabb/parse-that/diagnostics";
import {
    assertNumberStartCase as assertCompositionCase,
    diagnosticProfileOrder,
    diagnosticsModeOrder,
    materializeNumberStartHostile,
    materializePublicCases,
    observeNumberStartInComposition,
} from "../g3/harness.js";
import type {
    DiagnosticProfileId,
    DiagnosticSummary,
    DiagnosticsMode,
    EndpointFixtures,
    NumberStartCase,
    NumberStartParser,
    PredecessorValue,
    RawChildObservation,
} from "./contract.js";

export {
    diagnosticProfileOrder,
    diagnosticsModeOrder,
    materializeNumberStartHostile,
    materializePublicCases,
    observeNumberStartInComposition,
};

export const materializeEndpointCases = (fixtures: EndpointFixtures): readonly NumberStartCase[] =>
    Object.freeze(fixtures.endpoint_cases.map((testCase) => Object.freeze({ ...testCase })));

const predecessorFactories = Object.freeze([
    (_caseId: string, _mode: DiagnosticsMode): PredecessorValue => null,
    (_caseId: string, _mode: DiagnosticsMode): PredecessorValue => false,
    (_caseId: string, _mode: DiagnosticsMode): PredecessorValue => 0,
    (_caseId: string, _mode: DiagnosticsMode): PredecessorValue => "",
    (caseId: string, _mode: DiagnosticsMode): PredecessorValue => Object.freeze([caseId]),
    (caseId: string, mode: DiagnosticsMode): PredecessorValue => Object.freeze({ caseId, mode }),
]);

type StateIdentity = Readonly<{
    sourceOwn: boolean;
    sourceValue: string;
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

function captureStateIdentity(state: ParserState<unknown>): StateIdentity {
    return {
        sourceOwn: hasOwn(state, "src"),
        sourceValue: state.src,
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

function sourceMatches(state: ParserState<unknown>, before: StateIdentity): boolean {
    return hasOwn(state, "src") === before.sourceOwn && state.src === before.sourceValue;
}

function suggestionMatches(left: Suggestion, right: Readonly<Suggestion & { openOffsetOwn: boolean }>): boolean {
    return left.kind === right.kind
        && left.message === right.message
        && hasOwn(left, "openOffset") === right.openOffsetOwn
        && left.openOffset === right.openOffset;
}

function diagnosticsMatch(state: ParserState<unknown>, before: StateIdentity): boolean {
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
        case "default-present-undefined": return;
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

export function observeNumberStartRawChild(
    parser: NumberStartParser,
    testCase: NumberStartCase,
    diagnosticsMode: DiagnosticsMode,
    diagnosticProfile: DiagnosticProfileId,
    predecessorIndex: number,
): RawChildObservation {
    const predecessorFactory = predecessorFactories[predecessorIndex % predecessorFactories.length]!;
    const predecessor = predecessorFactory(testCase.id, diagnosticsMode);
    const state = new ParserState<unknown>(testCase.source, predecessor, testCase.offset);
    applyProfile(state, diagnosticProfile, testCase.offset);
    const beforeIdentity = captureStateIdentity(state);
    const beforeSummary = summarize(state);
    let returned: ParserState<unknown> = state;
    let threw = false;
    setDiagnosticsMode(diagnosticsMode);
    try {
        returned = parser.parser(state as ParserState<boolean>);
    } catch {
        threw = true;
    }
    const modePreserved = diagnosticsModeMatches(diagnosticsMode);
    disableDiagnostics();
    const afterSummary = summarize(state);
    const issue = threw
        ? "threw"
        : returned !== state
            ? "returned_different_state"
            : !sourceMatches(state, beforeIdentity)
                ? "source_property_or_value_changed"
                : state.isError
                    ? "parser_error"
                    : typeof state.value !== "boolean"
                        ? "non_boolean"
                        : state.offset !== testCase.offset
                            ? "consumed_input"
                            : !diagnosticsMatch(state, beforeIdentity)
                                ? "diagnostic_identity_or_value_changed"
                                : !modePreserved
                                    ? "diagnostics_mode_changed"
                                    : null;
    return Object.freeze({
        lane: "raw-child",
        ok: issue === null,
        value: typeof state.value === "boolean" ? state.value : null,
        diagnosticsMode,
        diagnosticProfile,
        predecessorKind: predecessorKind(predecessor),
        candidateOffset: testCase.offset,
        finalOffset: state.offset,
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
                const observation = observeNumberStartRawChild(
                    parser,
                    testCase,
                    mode,
                    profile,
                    caseIndex + modeIndex + profileIndex + predecessorIndex,
                );
                if (!observation.ok || observation.value !== testCase.starts) {
                    throw new Error(
                        `${testCase.id}/raw/${mode}/${profile}/${predecessorIndex}: expected ${testCase.starts}, received ${JSON.stringify(observation)}`,
                    );
                }
            }
        }
    }
    assertCompositionCase(parser, testCase, caseIndex);
}
