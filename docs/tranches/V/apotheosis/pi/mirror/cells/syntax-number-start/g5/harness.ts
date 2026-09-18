import { ParserState, string } from "@mkbabb/parse-that/core";
import { disableDiagnostics, enableDiagnostics } from "@mkbabb/parse-that/diagnostics";
import type { SecondarySpan, Suggestion } from "@mkbabb/parse-that/diagnostics";
import {
    assertNumberStartCase as assertGeneration4Case,
    diagnosticProfileOrder,
    diagnosticsModeOrder,
    materializeEndpointCases,
    materializeNumberStartHostile,
    materializePublicCases,
} from "../g4/harness.js";
import type {
    DefaultPredecessorObservation,
    DiagnosticProfileId,
    DiagnosticSummary,
    DiagnosticsMode,
    EndpointFixtures,
    NumberStartCase,
    NumberStartFixtures,
    NumberStartParser,
} from "./contract.js";

export {
    diagnosticProfileOrder,
    diagnosticsModeOrder,
    materializeEndpointCases,
    materializeNumberStartHostile,
    materializePublicCases,
};
export type { EndpointFixtures, NumberStartFixtures };

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

function suggestionMatches(left: Suggestion, right: Readonly<Suggestion & { openOffsetOwn: boolean }>): boolean {
    return left.kind === right.kind
        && left.message === right.message
        && hasOwn(left, "openOffset") === right.openOffsetOwn
        && left.openOffset === right.openOffset;
}

function stateMatches(state: ParserState<unknown>, before: StateIdentity): boolean {
    return hasOwn(state, "src") === before.sourceOwn
        && state.src === before.sourceValue
        && state.furthest === before.furthest
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

function runDefaultRaw(
    parser: NumberStartParser,
    testCase: NumberStartCase,
    mode: DiagnosticsMode,
    profile: DiagnosticProfileId,
): DefaultPredecessorObservation {
    const state = new ParserState<unknown>(testCase.source, undefined, testCase.offset);
    applyProfile(state, profile, testCase.offset);
    const before = captureStateIdentity(state);
    const beforeSummary = summarize(state);
    let returned: ParserState<unknown> = state;
    let threw = false;
    setDiagnosticsMode(mode);
    try {
        returned = parser.parser(state as ParserState<boolean>);
    } catch {
        threw = true;
    }
    const modePreserved = diagnosticsModeMatches(mode);
    disableDiagnostics();
    const issue = threw
        ? "threw"
        : returned !== state
            ? "returned_different_state"
            : hasOwn(state, "src") !== before.sourceOwn || state.src !== before.sourceValue
                ? "source_property_or_value_changed"
                : state.isError
                    ? "parser_error"
                    : typeof state.value !== "boolean"
                        ? "non_boolean"
                        : state.offset !== testCase.offset
                            ? "wrong_offset"
                            : !stateMatches(state, before)
                                ? "diagnostic_identity_or_value_changed"
                                : !modePreserved
                                    ? "diagnostics_mode_changed"
                                    : null;
    return Object.freeze({
        lane: "raw-child-default-undefined",
        ok: issue === null,
        value: typeof state.value === "boolean" ? state.value : null,
        diagnosticsMode: mode,
        diagnosticProfile: profile,
        candidateOffset: testCase.offset,
        finalOffset: state.offset,
        diagnosticsBefore: beforeSummary,
        diagnosticsAfter: summarize(state),
        issue,
    });
}

function runDefaultComposition(
    parser: NumberStartParser,
    testCase: NumberStartCase,
    mode: DiagnosticsMode,
    profile: DiagnosticProfileId,
): DefaultPredecessorObservation {
    const prefix = testCase.source.slice(0, testCase.offset);
    const state = new ParserState<unknown>(testCase.source, `entry:${testCase.id}`);
    applyProfile(state, profile, testCase.offset);
    const before = captureStateIdentity(state);
    const beforeSummary = summarize(state);
    if (prefix.length !== testCase.offset
        || !testCase.source.startsWith(testCase.continuation, testCase.offset)) {
        return Object.freeze({
            lane: "ordinary-parent-default-undefined", ok: false, value: null,
            diagnosticsMode: mode, diagnosticProfile: profile,
            candidateOffset: testCase.offset, finalOffset: state.offset,
            diagnosticsBefore: beforeSummary, diagnosticsAfter: summarize(state),
            issue: "invalid_fixture",
        });
    }
    const composed = string(prefix)
        .map(() => undefined)
        .next(parser)
        .skip(string(testCase.continuation));
    let returned: ParserState<unknown> = state;
    let threw = false;
    setDiagnosticsMode(mode);
    try {
        returned = composed.call(state as ParserState<boolean>);
    } catch {
        threw = true;
    }
    const modePreserved = diagnosticsModeMatches(mode);
    disableDiagnostics();
    const expectedOffset = testCase.offset + testCase.continuation.length;
    const issue = threw
        ? "threw"
        : returned !== state
            ? "returned_different_state"
            : hasOwn(state, "src") !== before.sourceOwn || state.src !== before.sourceValue
                ? "source_property_or_value_changed"
                : state.isError
                    ? "parser_error"
                    : typeof state.value !== "boolean"
                        ? "non_boolean"
                        : state.offset !== expectedOffset
                            ? "wrong_offset"
                            : !stateMatches(state, before)
                                ? "diagnostic_identity_or_value_changed"
                                : !modePreserved
                                    ? "diagnostics_mode_changed"
                                    : null;
    return Object.freeze({
        lane: "ordinary-parent-default-undefined",
        ok: issue === null,
        value: typeof state.value === "boolean" ? state.value : null,
        diagnosticsMode: mode,
        diagnosticProfile: profile,
        candidateOffset: testCase.offset,
        finalOffset: state.offset,
        diagnosticsBefore: beforeSummary,
        diagnosticsAfter: summarize(state),
        issue,
    });
}

export function assertNumberStartCase(
    parser: NumberStartParser,
    testCase: NumberStartCase,
    caseIndex: number,
): void {
    assertGeneration4Case(parser, testCase, caseIndex);
    for (const mode of diagnosticsModeOrder) {
        for (const profile of diagnosticProfileOrder) {
            for (const observation of [
                runDefaultRaw(parser, testCase, mode, profile),
                runDefaultComposition(parser, testCase, mode, profile),
            ]) {
                if (!observation.ok || observation.value !== testCase.starts) {
                    throw new Error(
                        `${testCase.id}/${observation.lane}/${mode}/${profile}: expected ${testCase.starts}, received ${JSON.stringify(observation)}`,
                    );
                }
            }
        }
    }
}
