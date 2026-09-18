import type {
    NumberStartCase,
    NumberStartObservation,
    NumberStartParser,
} from "./contract.js";

export function observeNumberStart(
    parser: NumberStartParser,
    source: string,
): NumberStartObservation {
    const state = parser.parseState(source);
    if (state.isError) {
        return Object.freeze({
            ok: false,
            value: null,
            offset: state.offset,
            diagnostics: Object.freeze(["parser_error"] as const),
        });
    }
    if (typeof state.value !== "boolean") {
        return Object.freeze({
            ok: false,
            value: null,
            offset: state.offset,
            diagnostics: Object.freeze(["non_boolean"] as const),
        });
    }
    if (state.offset !== 0) {
        return Object.freeze({
            ok: false,
            value: null,
            offset: state.offset,
            diagnostics: Object.freeze(["consumed_input"] as const),
        });
    }
    return Object.freeze({
        ok: true,
        value: state.value,
        offset: 0,
        diagnostics: Object.freeze([] as const),
    });
}

export function assertNumberStartCase(
    parser: NumberStartParser,
    testCase: NumberStartCase,
): void {
    const observed = observeNumberStart(parser, testCase.source);
    if (!observed.ok || observed.value !== testCase.starts) {
        throw new Error(`${testCase.id}: expected ${testCase.starts}, received ${JSON.stringify(observed)}`);
    }
}

export function materializeNumberStartHostile(id: string): string {
    switch (id) {
        case "H-DIGIT-1M": return "9".repeat(1_000_000);
        case "H-PLUS-DOT-DIGIT-1M": return `+.${"9".repeat(1_000_000)}`;
        case "H-PLUS-DOT-NAME-1M": return `+.${"x".repeat(1_000_000)}`;
        case "H-ASTRAL-1M-UTF16": return "💩".repeat(500_000);
        default: throw new Error(`unknown hostile fixture: ${id}`);
    }
}
