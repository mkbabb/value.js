import { ParserState, regex, string } from "@mkbabb/parse-that/core";
import type { Parser } from "@mkbabb/parse-that/core";
import { disableDiagnostics, enableDiagnostics } from "@mkbabb/parse-that/diagnostics";
import retainedJson from "../g5/fixtures/public-cases.json" with { type: "json" };
import controlsJson from "./fixtures/g8-controls.json" with { type: "json" };
import type {
    CompositionFixture,
    ConsumedNumber,
    ConsumeNumberParser,
    G8Controls,
    HostileConstruction,
    NumberLiteralCase,
    NumberLiteralExpected,
    RetainedPublicFixtureFile,
    WorkLimitReceipt,
} from "./contract.js";

export const retainedPublicFixtures = retainedJson as RetainedPublicFixtureFile;
export const g8Controls = controlsJson as unknown as G8Controls;

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
    state.furthest = state.src.length + g8Controls.diagnostics.preseed_ahead_delta;
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
        throw new Error(`${id}: enabled diagnostics must record nonempty expected strings`);
    }
    if (state.suggestions !== before.suggestionsRef || state.suggestions.length !== 0) {
        throw new Error(`${id}: failure must preserve the empty suggestions array`);
    }
    if (state.secondarySpans !== before.spansRef || state.secondarySpans.length !== 0) {
        throw new Error(`${id}: failure must preserve the empty secondarySpans array`);
    }
}

function expectedFromRepresentation(representation: string, start: number): NumberLiteralExpected {
    return {
        representation,
        value: Number(representation),
        type: representation.includes(".") || /[eE]/.test(representation) ? "number" : "integer",
        sign: representation.startsWith("+") ? "+" : representation.startsWith("-") ? "-" : null,
        start,
        end: start + representation.length,
    };
}

function assertSemanticLeaf(actual: unknown, expected: NumberLiteralExpected, id: string): asserts actual is ConsumedNumber {
    if (actual === null || typeof actual !== "object" || Array.isArray(actual)) throw new Error(`${id}: result is not one semantic object leaf`);
    if (Object.getPrototypeOf(actual) !== Object.prototype) throw new Error(`${id}: result does not have Object.prototype`);
    const ownKeys = Reflect.ownKeys(actual);
    if (ownKeys.some((key) => typeof key !== "string")) throw new Error(`${id}: result owns a symbol key`);
    const keys = (ownKeys as string[]).sort();
    if (keys.length !== semanticKeys.length || keys.some((key, index) => key !== semanticKeys[index])) {
        throw new Error(`${id}: result keys are not the exact semantic leaf keys`);
    }
    for (const key of semanticKeys) {
        const descriptor = Object.getOwnPropertyDescriptor(actual, key);
        if (descriptor === undefined || !("value" in descriptor)
            || descriptor.enumerable !== true || descriptor.configurable !== true || descriptor.writable !== true) {
            throw new Error(`${id}: ${key} is not an ordinary data property`);
        }
    }
    const value = actual as ConsumedNumber;
    if (value.type !== expected.type || value.sign !== expected.sign
        || !Object.is(value.value, expected.value) || !Object.is(value.value, Number(expected.representation))) {
        throw new Error(`${id}: semantic leaf mismatch`);
    }
}

function exerciseCase(parser: ConsumeNumberParser, testCase: NumberLiteralCase, predecessor: unknown, predecessorId: number): void {
    for (const mode of g8Controls.diagnostics.modes) {
        for (const profile of g8Controls.diagnostics.profiles) {
            const state = new ParserState<unknown>(testCase.source, predecessor, testCase.offset);
            if (profile === "preseeded-ahead") seedAhead(state);
            const before = captureState(state);
            const sourceOwn = own(state, "src");
            let returned: ParserState<ConsumedNumber> | undefined;
            let thrown: unknown;
            setMode(mode);
            try { returned = parser.call(state as ParserState<ConsumedNumber>); } catch (error) { thrown = error; }
            const modePreserved = modeStillMatches(mode);
            disableDiagnostics();
            const id = `${testCase.id}/predecessor-${predecessorId}/${mode}/${profile}`;
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

function impossible(): ReturnType<typeof regex> {
    return regex(/(?!)a/);
}

function compose(parser: ConsumeNumberParser, fixture: CompositionFixture): Parser<unknown> {
    switch (fixture.kind) {
        case "number": return parser;
        case "integer": return parser.chain((value) => value.type === "integer" ? string("").map(() => value) : impossible());
        case "percentage": return parser.skip(string("%"));
        case "dimension": return parser.then(regex(/[a-zA-Z]+/)).map(([value, unit]) => ({ value, unit }));
    }
}

function assertComposition(parser: ConsumeNumberParser, fixture: CompositionFixture): void {
    const operation = string(fixture.prefix).next(compose(parser, fixture)).skip(string(fixture.suffix));
    const initialValue = Object.freeze({ predecessor: fixture.id });
    const state = new ParserState<unknown>(fixture.source, initialValue, 0);
    const before = captureState(state);
    const returned = operation.call(state);
    if (returned !== state) throw new Error(`${fixture.id}: composition returned a different state`);
    if (fixture.accepts !== !state.isError) throw new Error(`${fixture.id}: composition acceptance mismatch`);
    if (!fixture.accepts) {
        if (state.offset !== 0 || !Object.is(state.value, before.value)) throw new Error(`${fixture.id}: composition failure was not transactional`);
        return;
    }
    if (fixture.representation === undefined || fixture.type === undefined) throw new Error(`${fixture.id}: accepted fixture lacks expected leaf`);
    const result = state.value as ConsumedNumber | { value: ConsumedNumber; unit: string };
    const leaf = fixture.kind === "dimension" ? (result as { value: ConsumedNumber; unit: string }).value : result as ConsumedNumber;
    const start = fixture.prefix.length;
    assertSemanticLeaf(leaf, expectedFromRepresentation(fixture.representation, start), fixture.id);
    if (fixture.source.slice(start, start + fixture.representation.length) !== fixture.representation) throw new Error(`${fixture.id}: wrong composed extent`);
    if (state.offset !== fixture.source.length) throw new Error(`${fixture.id}: composition did not consume the exact fixture`);
    if (fixture.kind === "dimension" && (result as { value: ConsumedNumber; unit: string }).unit !== fixture.unit) throw new Error(`${fixture.id}: wrong unit`);
}

export function materializeExactHostile(construction: HostileConstruction, totalSourceLength: number): NumberLiteralCase {
    if (!Number.isInteger(totalSourceLength) || totalSourceLength < 8) throw new Error("hostile total length must be an integer >= 8");
    let representation: string;
    let source: string;
    if (construction === "digits") {
        representation = "9".repeat(totalSourceLength - 1);
        source = `${representation};`;
    } else if (construction === "fraction") {
        representation = `0.${"9".repeat(totalSourceLength - 3)}`;
        source = `${representation};`;
    } else if (construction === "exponent") {
        representation = `1e${"9".repeat(totalSourceLength - 3)}`;
        source = `${representation};`;
    } else {
        representation = "9".repeat(totalSourceLength - 3);
        source = `${representation}e+;`;
    }
    if (source.length !== totalSourceLength) throw new Error(`${construction}: hostile source is not the exact declared UTF-16 length`);
    return { id: `${construction}-${totalSourceLength}`, source, offset: 0, expected: expectedFromRepresentation(representation, 0) };
}

function median(values: readonly number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)]!;
}

function invokeSemantically(parser: ConsumeNumberParser, fixture: NumberLiteralCase, now: () => number): number {
    const state = new ParserState<unknown>(fixture.source, undefined, 0);
    const start = now();
    const returned = parser.call(state as ParserState<ConsumedNumber>);
    const elapsed = now() - start;
    if (returned !== state || fixture.expected === null || state.isError || state.offset !== fixture.expected.end) throw new Error(`${fixture.id}: semantic completion failed`);
    assertSemanticLeaf(state.value, fixture.expected, fixture.id);
    if (state.src.length !== fixture.source.length || state.src.slice(0, state.offset) !== fixture.expected.representation) throw new Error(`${fixture.id}: source/extent mismatch`);
    if (!Number.isFinite(elapsed) || elapsed < 0 || elapsed > g8Controls.work_limit.per_invocation_timeout_ms) throw new Error(`${fixture.id}: each-call timeout exceeded`);
    return elapsed;
}

export function validatePublicFixtures(): void {
    if (retainedPublicFixtures.feature_id !== "SYNTAX-CONSUME-NUMBER" || retainedPublicFixtures.generation !== 5) throw new Error("retained fixture identity mismatch");
    if (g8Controls.feature_id !== "SYNTAX-CONSUME-NUMBER" || g8Controls.generation !== 8) throw new Error("G8 controls identity mismatch");
    const failureIds = retainedPublicFixtures.prefix_cases.filter((item) => item.expected === null).map((item) => item.id).sort();
    if (JSON.stringify(failureIds) !== JSON.stringify([...g8Controls.failure_case_ids].sort())) throw new Error("failure controls do not exactly cover public failures");
    if (predecessors.length !== 7 || g8Controls.predecessor_profiles.length !== 7) throw new Error("predecessor census must be exactly seven");
    const sizes = g8Controls.work_limit.exact_source_sizes_utf16_code_units;
    if (sizes.length !== 4 || sizes.some((size, index) => index > 0 && size !== sizes[index - 1]! * 2)) throw new Error("work-limit sizes must be four exact doublings");
    for (const construction of g8Controls.work_limit.constructions) for (const size of sizes) materializeExactHostile(construction, size);
}

export function runPublicHarness(parser: ConsumeNumberParser): Readonly<{ assertions: number; failures: number }> {
    validatePublicFixtures();
    const subordinate = retainedPublicFixtures.number_start_prefix_evidence.map((item): NumberLiteralCase => ({
        id: item.id,
        source: item.source,
        offset: item.offset,
        expected: expectedFromRepresentation(item.representation, item.offset),
    }));
    const successes = [...subordinate, ...retainedPublicFixtures.prefix_cases.filter((item) => item.expected !== null)];
    const failures = retainedPublicFixtures.prefix_cases.filter((item) => item.expected === null);
    successes.forEach((testCase, index) => exerciseCase(parser, testCase, predecessors[index % predecessors.length], index % predecessors.length));
    failures.forEach((testCase) => predecessors.forEach((predecessor, index) => exerciseCase(parser, testCase, predecessor, index)));
    retainedPublicFixtures.composition_cases.forEach((fixture) => assertComposition(parser, fixture));
    const diagnosticCells = g8Controls.diagnostics.modes.length * g8Controls.diagnostics.profiles.length;
    return Object.freeze({
        assertions: successes.length * diagnosticCells + failures.length * predecessors.length * diagnosticCells + retainedPublicFixtures.composition_cases.length,
        failures: failures.length * predecessors.length * diagnosticCells,
    });
}

export function runWorkLimitHarness(parser: ConsumeNumberParser, now: () => number = () => performance.now()): WorkLimitReceipt {
    validatePublicFixtures();
    disableDiagnostics();
    let invocations = 0;
    let semanticCompletions = 0;
    let timeoutChecks = 0;
    let maxRatio = 0;
    let maxEightfoldRatio = 0;
    let maxCaseMs = 0;
    let exactLengthsChecked = 0;
    for (const construction of g8Controls.work_limit.constructions) {
        const medians: number[] = [];
        for (const size of g8Controls.work_limit.exact_source_sizes_utf16_code_units) {
            const fixture = materializeExactHostile(construction, size);
            if (fixture.source.length !== size) throw new Error(`${fixture.id}: exact UTF-16 length drift`);
            exactLengthsChecked += 1;
            for (let warmup = 0; warmup < g8Controls.work_limit.warmups; warmup += 1) {
                maxCaseMs = Math.max(maxCaseMs, invokeSemantically(parser, fixture, now));
                invocations += 1; semanticCompletions += 1; timeoutChecks += 1;
            }
            const samples: number[] = [];
            for (let sample = 0; sample < g8Controls.work_limit.samples; sample += 1) {
                const elapsed = invokeSemantically(parser, fixture, now);
                samples.push(elapsed); maxCaseMs = Math.max(maxCaseMs, elapsed);
                invocations += 1; semanticCompletions += 1; timeoutChecks += 1;
            }
            medians.push(median(samples));
        }
        for (let index = 1; index < medians.length; index += 1) {
            const ratio = Math.max(medians[index]!, g8Controls.work_limit.timing_floor_ms) / Math.max(medians[index - 1]!, g8Controls.work_limit.timing_floor_ms);
            maxRatio = Math.max(maxRatio, ratio);
            if (ratio > g8Controls.work_limit.median_pair_ratio_ceiling) throw new Error(`${construction}: adjacent doubling ratio exceeded`);
        }
        const eightfold = Math.max(medians[3]!, g8Controls.work_limit.timing_floor_ms) / Math.max(medians[0]!, g8Controls.work_limit.timing_floor_ms);
        maxEightfoldRatio = Math.max(maxEightfoldRatio, eightfold);
        if (eightfold > g8Controls.work_limit.global_eightfold_ratio_ceiling) throw new Error(`${construction}: global scaling ratio exceeded`);
    }
    return Object.freeze({
        invocations,
        exact_lengths_checked: exactLengthsChecked,
        semantic_completions: semanticCompletions,
        timeout_checks: timeoutChecks,
        max_median_pair_ratio: maxRatio,
        max_eightfold_ratio: maxEightfoldRatio,
        max_case_ms: maxCaseMs,
        stack: "O(1)-FINITE-STATIC-DIRECT-COMBINATOR-GRAPH",
    });
}
