import { ParserState, regex, string } from "@mkbabb/parse-that/core";
import type { Parser } from "@mkbabb/parse-that/core";
import { disableDiagnostics, enableDiagnostics } from "@mkbabb/parse-that/diagnostics";
import retainedJson from "../g5/fixtures/public-cases.json" with { type: "json" };
import controlsJson from "./fixtures/g7-controls.json" with { type: "json" };
import type {
    CompositionFixture,
    ConsumedNumber,
    ConsumeNumberParser,
    G7Controls,
    HostileConstruction,
    NumberLiteralCase,
    NumberLiteralExpected,
    RetainedPublicFixtureFile,
    WorkLimitReceipt,
} from "./contract.js";

export const retainedPublicFixtures = retainedJson as RetainedPublicFixtureFile;
export const g7Controls = controlsJson as unknown as G7Controls;

type DiagnosticsMode = "disabled" | "enabled";
type StateProfile = "ordinary" | "preseeded-ahead";

const predecessors: readonly unknown[] = [
    undefined,
    null,
    false,
    0,
    "",
    Object.freeze(["prior"]),
    Object.freeze({ prior: true }),
];
const semanticKeys = Object.freeze(["sign", "type", "value"] as const);

function own(value: object, key: PropertyKey): boolean {
    return Object.prototype.hasOwnProperty.call(value, key);
}

function setMode(mode: DiagnosticsMode): void {
    if (mode === "enabled") enableDiagnostics();
    else disableDiagnostics();
}

function modeStillMatches(mode: DiagnosticsMode): boolean {
    const probe = new ParserState<string>("x", "prior");
    string("y").call(probe);
    return (Array.isArray(probe.expected) && probe.expected.length > 0) === (mode === "enabled");
}

function seedAhead(state: ParserState<unknown>): void {
    state.furthest = state.src.length + g7Controls.diagnostics.preseed_ahead_delta;
    state.expected = ["preexisting-a", "preexisting-b"];
    state.suggestions.push({ kind: "trailing-content", message: "preexisting" });
    state.secondarySpans.push({ offset: state.src.length, label: "preexisting" });
}

function captureState(state: ParserState<unknown>) {
    return {
        value: state.value,
        furthest: state.furthest,
        expectedOwn: own(state, "expected"),
        expectedRef: state.expected,
        expected: state.expected === undefined ? undefined : [...state.expected],
        suggestionsRef: state.suggestions,
        suggestions: state.suggestions.map((item) => ({ ...item })),
        spansRef: state.secondarySpans,
        spans: state.secondarySpans.map((item) => ({ ...item })),
    } as const;
}

function assertDiagnosticStateUnchanged(state: ParserState<unknown>, before: ReturnType<typeof captureState>, id: string): void {
    const unchanged = state.furthest === before.furthest
        && own(state, "expected") === before.expectedOwn
        && state.expected === before.expectedRef
        && JSON.stringify(state.expected) === JSON.stringify(before.expected)
        && state.suggestions === before.suggestionsRef
        && JSON.stringify(state.suggestions) === JSON.stringify(before.suggestions)
        && state.secondarySpans === before.spansRef
        && JSON.stringify(state.secondarySpans) === JSON.stringify(before.spans);
    if (!unchanged) throw new Error(`${id}: diagnostic state changed`);
}

function assertOrdinaryFailureDiagnostics(
    state: ParserState<unknown>,
    before: ReturnType<typeof captureState>,
    mode: DiagnosticsMode,
    entryOffset: number,
    id: string,
): void {
    if (state.furthest !== entryOffset) throw new Error(`${id}: furthest must equal the failed entry offset`);
    if (mode === "disabled") {
        if (state.expected !== undefined) throw new Error(`${id}: disabled diagnostics must leave expected undefined`);
    } else if (!Array.isArray(state.expected)
        || state.expected.length === 0
        || state.expected.some((item) => typeof item !== "string" || item.length === 0)) {
        throw new Error(`${id}: enabled diagnostics must record one or more nonempty expected strings`);
    }
    if (state.suggestions !== before.suggestionsRef || state.suggestions.length !== 0) {
        throw new Error(`${id}: failure must preserve the empty suggestions array`);
    }
    if (state.secondarySpans !== before.spansRef || state.secondarySpans.length !== 0) {
        throw new Error(`${id}: failure must preserve the empty secondarySpans array`);
    }
}

function assertSemanticLeaf(actual: unknown, expected: NumberLiteralExpected, id: string): asserts actual is ConsumedNumber {
    if (actual === null || typeof actual !== "object" || Array.isArray(actual)) {
        throw new Error(`${id}: result is not one semantic object leaf`);
    }
    if (Object.getPrototypeOf(actual) !== Object.prototype) {
        throw new Error(`${id}: result does not have Object.prototype`);
    }
    const ownKeys = Reflect.ownKeys(actual);
    if (ownKeys.some((key) => typeof key !== "string")) throw new Error(`${id}: result owns a symbol key`);
    const keys = (ownKeys as string[]).sort();
    if (keys.length !== semanticKeys.length || keys.some((key, index) => key !== semanticKeys[index])) {
        throw new Error(`${id}: result keys are not the exact semantic leaf keys`);
    }
    for (const key of semanticKeys) {
        const descriptor = Object.getOwnPropertyDescriptor(actual, key);
        if (descriptor === undefined
            || !Object.prototype.hasOwnProperty.call(descriptor, "value")
            || descriptor.enumerable !== true
            || descriptor.configurable !== true
            || descriptor.writable !== true) {
            throw new Error(`${id}: ${key} is not an ordinary data property`);
        }
    }
    const value = actual as ConsumedNumber;
    if (value.type !== expected.type
        || value.sign !== expected.sign
        || !Object.is(value.value, expected.value)
        || !Object.is(value.value, Number(expected.representation))) {
        throw new Error(`${id}: semantic leaf mismatch`);
    }
}

function assertRawCase(parser: ConsumeNumberParser, testCase: NumberLiteralCase, caseIndex: number): void {
    for (const mode of g7Controls.diagnostics.modes) {
        for (const profile of g7Controls.diagnostics.profiles) {
            const predecessor = predecessors[caseIndex % predecessors.length];
            const state = new ParserState<unknown>(testCase.source, predecessor, testCase.offset);
            if (profile === "preseeded-ahead") seedAhead(state);
            const before = captureState(state);
            const sourceOwn = own(state, "src");
            let returned: ParserState<ConsumedNumber> | undefined;
            let thrown: unknown;
            setMode(mode);
            try {
                returned = parser.call(state as ParserState<ConsumedNumber>);
            } catch (error) {
                thrown = error;
            }
            const modePreserved = modeStillMatches(mode);
            disableDiagnostics();
            const id = `${testCase.id}/${mode}/${profile}`;
            if (thrown !== undefined) throw new Error(`${id}: threw ${String(thrown)}`);
            if (returned !== state) throw new Error(`${id}: returned a different ParserState`);
            if (own(state, "src") !== sourceOwn || state.src !== testCase.source) throw new Error(`${id}: changed src`);
            if (!modePreserved) throw new Error(`${id}: changed global diagnostics mode`);
            if (testCase.expected === null) {
                if (!state.isError || state.offset !== testCase.offset) throw new Error(`${id}: failure consumed or succeeded`);
                if (!Object.is(state.value, before.value)) throw new Error(`${id}: failure changed predecessor value`);
                if (profile === "preseeded-ahead") assertDiagnosticStateUnchanged(state, before, id);
                else assertOrdinaryFailureDiagnostics(state, before, mode, testCase.offset, id);
            } else {
                if (state.isError || state.offset !== testCase.expected.end) throw new Error(`${id}: success offset/error mismatch`);
                assertSemanticLeaf(state.value, testCase.expected, id);
                if (profile === "preseeded-ahead") assertDiagnosticStateUnchanged(state, before, id);
                if (testCase.source.slice(testCase.expected.start, testCase.expected.end) !== testCase.expected.representation) {
                    throw new Error(`${id}: consumed representation mismatch`);
                }
            }
        }
    }
}

function impossible<T>(): ReturnType<typeof regex> {
    return regex(/(?!)a/) as ReturnType<typeof regex>;
}

function compose(parser: ConsumeNumberParser, fixture: CompositionFixture) {
    switch (fixture.kind) {
        case "number": return parser;
        case "integer": return parser.chain((value) => value.type === "integer" ? string("").map(() => value) : impossible<ConsumedNumber>());
        case "percentage": return parser.skip(string("%"));
        case "dimension": return parser.then(regex(/[a-zA-Z]+/)).map(([value, unit]) => ({ value, unit }));
    }
}

function assertComposition(parser: ConsumeNumberParser, fixture: CompositionFixture): void {
    const operation = string(fixture.prefix).next(compose(parser, fixture) as Parser<unknown>).skip(string(fixture.suffix));
    const state = operation.parseState(fixture.source);
    if (fixture.accepts !== !state.isError) throw new Error(`${fixture.id}: composition acceptance mismatch`);
    if (!fixture.accepts) return;
    const result = state.value as ConsumedNumber | { value: ConsumedNumber; unit: string };
    const leaf = fixture.kind === "dimension" ? (result as { value: ConsumedNumber; unit: string }).value : result as ConsumedNumber;
    if (leaf.type !== fixture.type) throw new Error(`${fixture.id}: wrong numeric leaf`);
    if (fixture.kind === "dimension" && (result as { value: ConsumedNumber; unit: string }).unit !== fixture.unit) {
        throw new Error(`${fixture.id}: wrong unit`);
    }
}

function materializeHostile(construction: HostileConstruction, count: number): NumberLiteralCase {
    const digits = "9".repeat(count);
    if (construction === "digits") {
        return { id: `${construction}-${count}`, source: `${digits};`, offset: 0, expected: { representation: digits, value: Number(digits), type: "integer", sign: null, start: 0, end: digits.length } };
    }
    if (construction === "fraction") {
        const representation = `0.${digits}`;
        return { id: `${construction}-${count}`, source: `${representation};`, offset: 0, expected: { representation, value: Number(representation), type: "number", sign: null, start: 0, end: representation.length } };
    }
    if (construction === "exponent") {
        const representation = `1e${digits}`;
        return { id: `${construction}-${count}`, source: `${representation};`, offset: 0, expected: { representation, value: Number(representation), type: "number", sign: null, start: 0, end: representation.length } };
    }
    return { id: `${construction}-${count}`, source: `${digits}e+;`, offset: 0, expected: { representation: digits, value: Number(digits), type: "integer", sign: null, start: 0, end: digits.length } };
}

function median(values: readonly number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)]!;
}

export function validatePublicFixtures(): void {
    if (retainedPublicFixtures.feature_id !== "SYNTAX-CONSUME-NUMBER" || retainedPublicFixtures.generation !== 5) {
        throw new Error("retained fixture identity mismatch");
    }
    if (g7Controls.feature_id !== "SYNTAX-CONSUME-NUMBER" || g7Controls.generation !== 7) throw new Error("G7 controls identity mismatch");
    const arms = retainedPublicFixtures.number_start_prefix_evidence.map((item) => item.arm);
    const expectedArms = ["digit", "plus-digit", "minus-digit", "dot-digit", "plus-dot-digit", "minus-dot-digit"];
    if (arms.length !== expectedArms.length || expectedArms.some((arm) => !arms.includes(arm as typeof arms[number]))) {
        throw new Error("subordinate §4.3.10 evidence is not exactly six true arms");
    }
    const failureIds = retainedPublicFixtures.prefix_cases.filter((item) => item.expected === null).map((item) => item.id).sort();
    if (JSON.stringify(failureIds) !== JSON.stringify([...g7Controls.failure_case_ids].sort())) {
        throw new Error("failure control IDs do not exactly cover public failures");
    }
    const sizes = g7Controls.work_limit.sizes_utf16_code_units;
    if (sizes.length !== 4 || sizes.some((size, index) => index > 0 && size !== sizes[index - 1]! * 2)) {
        throw new Error("work-limit sizes must be four exact doublings");
    }
}

export function runPublicHarness(parser: ConsumeNumberParser): Readonly<{ assertions: number; failures: number }> {
    validatePublicFixtures();
    const subordinate = retainedPublicFixtures.number_start_prefix_evidence.map((item): NumberLiteralCase => ({
        id: item.id,
        source: item.source,
        offset: item.offset,
        expected: {
            representation: item.representation,
            value: Number(item.representation),
            type: item.representation.includes(".") ? "number" : "integer",
            sign: item.representation.startsWith("+") ? "+" : item.representation.startsWith("-") ? "-" : null,
            start: item.offset,
            end: item.offset + item.representation.length,
        },
    }));
    const cases = [...subordinate, ...retainedPublicFixtures.prefix_cases];
    cases.forEach((testCase, index) => assertRawCase(parser, testCase, index));
    retainedPublicFixtures.composition_cases.forEach((fixture) => assertComposition(parser, fixture));
    return Object.freeze({
        assertions: cases.length * g7Controls.diagnostics.modes.length * g7Controls.diagnostics.profiles.length + retainedPublicFixtures.composition_cases.length,
        failures: g7Controls.failure_case_ids.length * g7Controls.diagnostics.modes.length * g7Controls.diagnostics.profiles.length,
    });
}

export function runWorkLimitHarness(parser: ConsumeNumberParser, now: () => number = () => performance.now()): WorkLimitReceipt {
    validatePublicFixtures();
    disableDiagnostics();
    let invocations = 0;
    let maxRatio = 0;
    let maxCaseMs = 0;
    for (const construction of g7Controls.work_limit.constructions) {
        const medians: number[] = [];
        for (const size of g7Controls.work_limit.sizes_utf16_code_units) {
            const fixture = materializeHostile(construction, size);
            for (let warmup = 0; warmup < g7Controls.work_limit.warmups; warmup += 1) {
                const state = new ParserState<unknown>(fixture.source, undefined, 0);
                parser.call(state as ParserState<ConsumedNumber>);
                if (state.isError || state.offset !== fixture.expected!.end) throw new Error(`${fixture.id}: warmup semantic failure`);
                invocations += 1;
            }
            const samples: number[] = [];
            for (let sample = 0; sample < g7Controls.work_limit.samples; sample += 1) {
                const state = new ParserState<unknown>(fixture.source, undefined, 0);
                const start = now();
                parser.call(state as ParserState<ConsumedNumber>);
                const elapsed = now() - start;
                if (state.isError || state.offset !== fixture.expected!.end) throw new Error(`${fixture.id}: measured semantic failure`);
                if (!Number.isFinite(elapsed) || elapsed < 0 || elapsed > g7Controls.work_limit.per_case_ceiling_ms) {
                    throw new Error(`${fixture.id}: per-case ceiling exceeded`);
                }
                maxCaseMs = Math.max(maxCaseMs, elapsed);
                samples.push(elapsed);
                invocations += 1;
            }
            medians.push(median(samples));
        }
        for (let index = 1; index < medians.length; index += 1) {
            const ratio = Math.max(medians[index]!, g7Controls.work_limit.timing_floor_ms)
                / Math.max(medians[index - 1]!, g7Controls.work_limit.timing_floor_ms);
            maxRatio = Math.max(maxRatio, ratio);
            if (ratio > g7Controls.work_limit.median_pair_ratio_ceiling) {
                throw new Error(`${construction}: hostile median scaling ratio ${ratio} exceeds ceiling`);
            }
        }
    }
    return Object.freeze({
        invocations,
        max_median_pair_ratio: maxRatio,
        max_case_ms: maxCaseMs,
        stack: "O(1)-FINITE-STATIC-COMBINATOR-GRAPH",
    });
}
