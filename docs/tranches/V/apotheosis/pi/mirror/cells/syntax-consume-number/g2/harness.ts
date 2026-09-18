import { ParserState, regex, string } from "@mkbabb/parse-that/core";
import type { Parser } from "@mkbabb/parse-that/core";
import { disableDiagnostics, enableDiagnostics } from "@mkbabb/parse-that/diagnostics";
import fixtureJson from "./fixtures/public-cases.json" with { type: "json" };
import type {
    CompositionFixture,
    ConsumedNumber,
    ConsumeNumberParser,
    HostileFixture,
    NumberLiteralCase,
    NumberLiteralExpected,
    PublicFixtureFile,
} from "./contract.js";

export const publicFixtures = fixtureJson as PublicFixtureFile;

type DiagnosticsMode = "disabled" | "enabled";
type StateProfile = "default" | "sealed-ahead";

const modes: readonly DiagnosticsMode[] = ["disabled", "enabled"];
const profiles: readonly StateProfile[] = ["default", "sealed-ahead"];
const predecessors: readonly unknown[] = [undefined, null, false, 0, "", Object.freeze(["prior"]), Object.freeze({ prior: true })];
const semanticKeys = Object.freeze(["sign", "type", "value"]);

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
    state.furthest = state.src.length + 17;
    state.expected = ["preexisting-a", "preexisting-b"];
    state.suggestions.push({ kind: "trailing-content", message: "preexisting" });
    state.secondarySpans.push({ offset: state.src.length, label: "preexisting" });
}

function captureSeed(state: ParserState<unknown>) {
    return {
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

function assertSeedUnchanged(state: ParserState<unknown>, before: ReturnType<typeof captureSeed>, id: string): void {
    const unchanged = state.furthest === before.furthest
        && own(state, "expected") === before.expectedOwn
        && state.expected === before.expectedRef
        && JSON.stringify(state.expected) === JSON.stringify(before.expected)
        && state.suggestions === before.suggestionsRef
        && JSON.stringify(state.suggestions) === JSON.stringify(before.suggestions)
        && state.secondarySpans === before.spansRef
        && JSON.stringify(state.secondarySpans) === JSON.stringify(before.spans);
    if (!unchanged) throw new Error(`${id}: preexisting diagnostic state changed`);
}

function assertSemanticLeaf(actual: unknown, expected: NumberLiteralExpected, id: string): asserts actual is ConsumedNumber {
    if (actual === null || typeof actual !== "object" || Array.isArray(actual)) {
        throw new Error(`${id}: result is not one semantic object leaf`);
    }
    const keys = Object.keys(actual).sort();
    if (keys.length !== semanticKeys.length || keys.some((key, index) => key !== semanticKeys[index])) {
        throw new Error(`${id}: result keys are not the exact semantic leaf keys: ${keys.join(",")}`);
    }
    const value = actual as ConsumedNumber;
    if (value.type !== expected.type
        || value.sign !== expected.sign
        || !Object.is(value.value, expected.value)
        || !Object.is(value.value, Number(expected.representation))) {
        throw new Error(`${id}: semantic leaf mismatch: ${JSON.stringify(value)}`);
    }
}

function assertRawCase(parser: ConsumeNumberParser, testCase: NumberLiteralCase, caseIndex: number): void {
    for (const mode of modes) {
        for (const profile of profiles) {
            const predecessor = predecessors[caseIndex % predecessors.length];
            const state = new ParserState<unknown>(testCase.source, predecessor, testCase.offset);
            if (profile === "sealed-ahead") seedAhead(state);
            const before = captureSeed(state);
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
            if (thrown !== undefined) throw new Error(`${testCase.id}/${mode}/${profile}: threw ${String(thrown)}`);
            if (returned !== state) throw new Error(`${testCase.id}/${mode}/${profile}: returned a different ParserState`);
            if (own(state, "src") !== sourceOwn || state.src !== testCase.source) {
                throw new Error(`${testCase.id}/${mode}/${profile}: changed ParserState.src`);
            }
            if (!modePreserved) throw new Error(`${testCase.id}/${mode}/${profile}: changed global diagnostics mode`);
            if (profile === "sealed-ahead") assertSeedUnchanged(state, before, `${testCase.id}/${mode}/${profile}`);
            if (testCase.expected === null) {
                if (!state.isError || state.offset !== testCase.offset) {
                    throw new Error(`${testCase.id}/${mode}/${profile}: failure consumed or succeeded`);
                }
            } else {
                if (state.isError || state.offset !== testCase.expected.end) {
                    throw new Error(`${testCase.id}/${mode}/${profile}: success offset/error mismatch`);
                }
                assertSemanticLeaf(state.value, testCase.expected, `${testCase.id}/${mode}/${profile}`);
                if (testCase.source.slice(testCase.expected.start, testCase.expected.end) !== testCase.expected.representation) {
                    throw new Error(`${testCase.id}/${mode}/${profile}: consumed source representation mismatch`);
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
        case "number":
            return parser;
        case "integer": {
            const checked = parser.chain((value) => value.type === "integer"
                ? string("").map(() => value)
                : impossible<ConsumedNumber>());
            return string("").next(checked);
        }
        case "percentage":
            return parser.skip(string("%"));
        case "dimension":
            return parser.then(regex(/[a-zA-Z]+/)).map(([value, unit]) => ({ value, unit }));
    }
}

function assertComposition(parser: ConsumeNumberParser, fixture: CompositionFixture): void {
    const body = compose(parser, fixture) as unknown as Parser<unknown>;
    const operation = string(fixture.prefix).next(body).skip(string(fixture.suffix));
    const state = operation.parseState(fixture.source);
    if (fixture.accepts !== !state.isError) {
        throw new Error(`${fixture.id}: composition acceptance mismatch at ${state.offset}`);
    }
    if (!fixture.accepts) return;
    const result = state.value as unknown as ConsumedNumber | { value: ConsumedNumber; unit: string };
    const leaf = fixture.kind === "dimension" ? (result as { value: ConsumedNumber; unit: string }).value : result as ConsumedNumber;
    if (leaf.type !== fixture.type) {
        throw new Error(`${fixture.id}: composition returned wrong numeric leaf`);
    }
    if (fixture.representation !== undefined
        && fixture.source.slice(fixture.prefix.length, fixture.prefix.length + fixture.representation.length) !== fixture.representation) {
        throw new Error(`${fixture.id}: composition spelling fixture mismatch`);
    }
    if (fixture.kind === "dimension" && (result as { value: ConsumedNumber; unit: string }).unit !== fixture.unit) {
        throw new Error(`${fixture.id}: dimension witness returned wrong unit`);
    }
}

function materializeHostile(fixture: HostileFixture): NumberLiteralCase {
    const digits = "9".repeat(fixture.count);
    if (fixture.construction === "digits") {
        return { id: fixture.id, source: `${digits};`, offset: 0, expected: { representation: digits, value: Number(digits), type: "integer", sign: null, start: 0, end: digits.length } };
    }
    if (fixture.construction === "fraction") {
        const representation = `0.${digits}`;
        return { id: fixture.id, source: `${representation};`, offset: 0, expected: { representation, value: Number(representation), type: "number", sign: null, start: 0, end: representation.length } };
    }
    if (fixture.construction === "exponent") {
        const representation = `1e${digits}`;
        return { id: fixture.id, source: `${representation};`, offset: 0, expected: { representation, value: Number(representation), type: "number", sign: null, start: 0, end: representation.length } };
    }
    return { id: fixture.id, source: `${digits}e+;`, offset: 0, expected: { representation: digits, value: Number(digits), type: "integer", sign: null, start: 0, end: digits.length } };
}

export function validatePublicFixtures(fixtures: PublicFixtureFile = publicFixtures): void {
    if (fixtures.feature_id !== "SYNTAX-CONSUME-NUMBER" || fixtures.generation !== 2) throw new Error("fixture identity mismatch");
    const arms = fixtures.number_start_prefix_evidence.map((item) => item.arm);
    const expectedArms = ["digit", "plus-digit", "minus-digit", "dot-digit", "plus-dot-digit", "minus-dot-digit"];
    if (arms.length !== expectedArms.length || expectedArms.some((arm) => !arms.includes(arm as typeof arms[number]))) {
        throw new Error("the subordinate §4.3.10 fixture set is not exactly the six true arms");
    }
    const ids = [
        ...fixtures.number_start_prefix_evidence.map((item) => item.id),
        ...fixtures.prefix_cases.map((item) => item.id),
        ...fixtures.composition_cases.map((item) => item.id),
        ...fixtures.hostile_cases.map((item) => item.id),
    ];
    if (new Set(ids).size !== ids.length) throw new Error("fixture IDs are not unique");
}

export function runPublicHarness(parser: ConsumeNumberParser): Readonly<{ assertions: number; hostile: number }> {
    validatePublicFixtures();
    const subordinate = publicFixtures.number_start_prefix_evidence.map((item): NumberLiteralCase => ({
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
    const cases = [...subordinate, ...publicFixtures.prefix_cases];
    cases.forEach((testCase, index) => assertRawCase(parser, testCase, index));
    publicFixtures.composition_cases.forEach((fixture) => assertComposition(parser, fixture));
    const hostile = publicFixtures.hostile_cases.map(materializeHostile);
    hostile.forEach((testCase, index) => assertRawCase(parser, testCase, cases.length + index));
    return Object.freeze({
        assertions: cases.length * modes.length * profiles.length + publicFixtures.composition_cases.length + hostile.length * modes.length * profiles.length,
        hostile: hostile.length,
    });
}
