import { ParserState, string } from "@mkbabb/parse-that/core";
import type {
    DiagnosticSnapshot,
    NumberStartCase,
    NumberStartObservation,
    NumberStartParser,
} from "./contract.js";

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

function seededState(source: string, offset: number): ParserState<unknown> {
    const state = new ParserState<unknown>(source, Object.freeze({ seed: offset }), offset, false, offset - 1);
    state.expected = [`prior-${offset}`];
    state.suggestions.push({ kind: "trailing-content", message: `prior-${offset}` });
    state.secondarySpans.push({ offset, label: `prior-${offset}` });
    return state;
}

export function observeNumberStartAt(
    parser: NumberStartParser,
    source: string,
    offset: number,
): NumberStartObservation {
    const state = seededState(source, offset);
    const before = snapshot(state);
    try {
        parser.call(state as ParserState<boolean>);
    } catch {
        return Object.freeze({
            ok: false,
            value: null,
            startOffset: offset,
            endOffset: state.offset,
            diagnosticsBefore: before,
            diagnosticsAfter: snapshot(state),
            issue: "threw",
        });
    }
    const after = snapshot(state);
    const issue = state.isError
        ? "parser_error"
        : typeof state.value !== "boolean"
            ? "non_boolean"
            : state.offset !== offset
                ? "consumed_input"
                : !sameSnapshot(before, after)
                    ? "diagnostic_pollution"
                    : null;
    return Object.freeze({
        ok: issue === null,
        value: typeof state.value === "boolean" ? state.value : null,
        startOffset: offset,
        endOffset: state.offset,
        diagnosticsBefore: before,
        diagnosticsAfter: after,
        issue,
    });
}

export function assertNumberStartCase(
    parser: NumberStartParser,
    testCase: NumberStartCase,
): void {
    const source = testCase.source ?? String.fromCharCode(...(testCase.sourceUtf16 ?? []));
    const continuation = testCase.continuation
        ?? String.fromCharCode(...(testCase.continuationUtf16 ?? []));
    const observed = observeNumberStartAt(parser, source, testCase.offset);
    if (!observed.ok || observed.value !== testCase.starts) {
        throw new Error(`${testCase.id}: expected ${testCase.starts}, received ${JSON.stringify(observed)}`);
    }

    const state = seededState(source, testCase.offset);
    parser.call(state as ParserState<boolean>);
    string(continuation).call(state as ParserState<string>);
    if (state.isError || state.offset !== testCase.offset + continuation.length) {
        throw new Error(`${testCase.id}: downstream sentinel did not start at the unchanged offset`);
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
