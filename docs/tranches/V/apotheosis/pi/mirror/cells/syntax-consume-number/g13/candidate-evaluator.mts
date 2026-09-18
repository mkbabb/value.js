import { Parser, ParserState, regex, string } from "@mkbabb/parse-that/core";
import { consumeNumber } from "@candidate";
import { readFileSync } from "node:fs";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type HoldoutCase = {
    id: string;
    family: string;
    input: {
        source: string;
        offset_utf16: number;
        predecessor_profile?: string;
        diagnostics_profile?: string;
    };
    expect: {
        status: "success" | "failure";
        no_throw: boolean;
        source_unchanged: boolean;
        is_error: boolean;
        end_utf16: number;
        representation?: string;
        result?: {
            descriptor_profile: string;
            sign: "+" | "-" | null;
            type: "integer" | "number";
            value: { binary64_be_hex: string };
        };
        predecessor_profile_preserved?: string;
        diagnostics_profile_preserved?: string;
        hostile_bound_assertion?: string;
        parent_expectation?: Record<string, unknown>;
    };
};
type Corpus = {
    schema: string;
    cases: HoldoutCase[];
    limits: { source_utf16_length_max: number };
    predecessor_profiles: Record<string, Record<string, unknown>>;
    diagnostic_profiles: Record<string, Record<string, any>>;
    descriptor_profiles: Record<string, Record<string, any>>;
};

if (!(consumeNumber instanceof Parser)) throw new Error("consumeNumber is not a parse-that Parser");
const corpus = JSON.parse(readFileSync(process.argv[2]!, "utf8")) as Corpus;
if (corpus.schema !== "value.pi.syntax-consume-number.g13.holdout-corpus/v1") throw new Error("holdout corpus schema drift");

const binary64Hex = (value: number) => {
    const bytes = Buffer.allocUnsafe(8);
    bytes.writeDoubleBE(value, 0);
    return bytes.toString("hex");
};

function predecessor(name: string | undefined): unknown {
    const profile = name === undefined ? undefined : corpus.predecessor_profiles[name];
    if (name === undefined) return Object.freeze({ tag: "success-predecessor" });
    if (!profile) throw new Error(`unknown predecessor profile ${name}`);
    if (profile.value_kind === "undefined") return undefined;
    if (profile.value_kind === "negative-zero") return -0;
    const value = profile.value;
    if (Array.isArray(value)) return profile.frozen ? Object.freeze([...value]) : [...value];
    if (typeof value === "object" && value !== null) return profile.frozen ? Object.freeze({ ...value }) : { ...value };
    return value;
}

const diagnosticsSnapshot = (state: ParserState<unknown>) => JSON.stringify({
    furthest: state.furthest,
    expected: state.expected,
    suggestions: state.suggestions,
    secondarySpans: state.secondarySpans,
});

function seedDiagnostics(state: ParserState<unknown>, name: string | undefined) {
    if (name === undefined || name === "ordinary") return;
    const profile = corpus.diagnostic_profiles[name];
    if (!profile?.seed) throw new Error(`unknown diagnostic profile ${name}`);
    const seed = profile.seed;
    state.furthest = state.offset + seed.furthest_delta_from_offset;
    state.expected = [...seed.expected];
    state.suggestions = seed.suggestions.map((entry: object) => ({ ...entry }));
    state.secondarySpans = seed.secondary_spans.map((entry: any) => ({
        offset: state.offset + entry.offset_delta_from_offset,
        label: entry.label,
    }));
}

function checkLeaf(actual: unknown, expected: NonNullable<HoldoutCase["expect"]["result"]>, issues: string[]) {
    const profile = corpus.descriptor_profiles[expected.descriptor_profile];
    if (!profile) {
        issues.push(`unknown descriptor profile ${expected.descriptor_profile}`);
        return;
    }
    if (typeof actual !== "object" || actual === null) {
        issues.push("result is not an object");
        return;
    }
    const leaf = actual as Record<string, unknown>;
    if (profile.prototype === "Object.prototype" && Object.getPrototypeOf(leaf) !== Object.prototype) issues.push("result prototype mismatch");
    if (Object.isFrozen(leaf) !== profile.frozen) issues.push("result frozen state mismatch");
    if (Object.isExtensible(leaf) !== profile.extensible) issues.push("result extensibility mismatch");
    const keys = Reflect.ownKeys(leaf);
    if (keys.some((key) => typeof key !== "string") || JSON.stringify(keys) !== JSON.stringify(profile.own_keys_exact_order)) issues.push("result own-key order mismatch");
    const values: Record<string, unknown> = { sign: expected.sign, type: expected.type };
    for (const key of profile.own_keys_exact_order as string[]) {
        const descriptor = Object.getOwnPropertyDescriptor(leaf, key);
        const wanted = profile.properties[key];
        if (!descriptor || !wanted) {
            issues.push(`missing result descriptor ${key}`);
            continue;
        }
        if (descriptor.enumerable !== wanted.enumerable || descriptor.configurable !== wanted.configurable
            || descriptor.writable !== wanted.writable || !Object.hasOwn(descriptor, "value")
            || descriptor.get !== undefined || descriptor.set !== undefined) issues.push(`result descriptor mismatch ${key}`);
        if (key !== "value" && !Object.is(descriptor.value, values[key])) issues.push(`result value mismatch ${key}`);
    }
    if (typeof leaf.value !== "number" || binary64Hex(leaf.value) !== expected.value.binary64_be_hex) issues.push("result binary64 value mismatch");
}

function compositionParser(row: HoldoutCase): { parser: Parser<unknown>; expectedEnd?: number; complete?: boolean } {
    const parent = row.expect.parent_expectation! as Record<string, any>;
    if (parent.kind === "percentage") return { parser: consumeNumber.skip(string(parent.boundary)), expectedEnd: row.expect.end_utf16 + parent.boundary.length };
    if (parent.kind === "delimited") return { parser: consumeNumber.skip(string(parent.delimiter)), expectedEnd: row.expect.end_utf16 + parent.delimiter.length };
    if (parent.kind === "integer-only") {
        const parser = consumeNumber.chain((leaf: any) => leaf.type === "integer"
            ? string(parent.delimiter ?? "\u0000").map(() => leaf)
            : string("\u0000").map(() => leaf));
        return { parser, expectedEnd: parent.accepts ? row.expect.end_utf16 + parent.delimiter.length : undefined };
    }
    if (parent.kind === "dimension" && parent.accepts_complete_source === false) {
        return { parser: consumeNumber.then(regex(/[a-zA-Z]+/)), complete: false };
    }
    if (parent.kind === "dimension") return { parser: consumeNumber.then(string(parent.unit)), expectedEnd: row.expect.end_utf16 + parent.unit.length };
    throw new Error(`unknown composition parent ${String(parent.kind)}`);
}

function assess(row: HoldoutCase) {
    const issues: string[] = [];
    if (row.expect.hostile_bound_assertion === "source_utf16_length_lte_8192"
        && row.input.source.length > corpus.limits.source_utf16_length_max) issues.push("hostile source exceeds declared bound");
    const prior = predecessor(row.input.predecessor_profile);
    const state = new ParserState<any>(row.input.source, prior, row.input.offset_utf16);
    seedDiagnostics(state, row.input.diagnostics_profile);
    const beforeDiagnostics = diagnosticsSnapshot(state);
    const originalSource = state.src;
    let thrown: unknown;
    let returned: ParserState<any> | undefined;
    try { returned = consumeNumber.call(state); } catch (error) { thrown = error; }
    if (row.expect.no_throw && thrown !== undefined) issues.push(`threw ${String(thrown)}`);
    if (thrown === undefined && returned !== state) issues.push("returned a different ParserState");
    if (row.expect.source_unchanged && state.src !== originalSource) issues.push("source changed");
    if (state.isError !== row.expect.is_error) issues.push(`isError ${state.isError} != ${row.expect.is_error}`);
    if (state.offset !== row.expect.end_utf16) issues.push(`offset ${state.offset} != ${row.expect.end_utf16}`);

    if (row.expect.status === "failure") {
        if (row.expect.predecessor_profile_preserved !== row.input.predecessor_profile) issues.push("predecessor profile expectation/input mismatch");
        if (row.expect.diagnostics_profile_preserved !== row.input.diagnostics_profile) issues.push("diagnostics profile expectation/input mismatch");
        if (!Object.is(state.value, prior)) issues.push("predecessor identity/value changed");
        if (row.input.diagnostics_profile === "preseeded-ahead") {
            if (diagnosticsSnapshot(state) !== beforeDiagnostics) issues.push("preseeded-ahead diagnostics changed");
        } else if (row.input.diagnostics_profile !== "ordinary") issues.push(`unknown failure diagnostic profile ${String(row.input.diagnostics_profile)}`);
    } else {
        const representation = row.input.source.slice(row.input.offset_utf16, state.offset);
        if (representation !== row.expect.representation) issues.push("consumed representation mismatch");
        if (row.expect.result) checkLeaf(state.value, row.expect.result, issues);
    }

    if (row.expect.parent_expectation) {
        const parent = row.expect.parent_expectation as Record<string, any>;
        const composed = compositionParser(row);
        const parentState = new ParserState<any>(row.input.source, Object.freeze({ tag: "parent-prior" }), row.input.offset_utf16);
        let parentThrown: unknown;
        let parentReturned: ParserState<any> | undefined;
        try { parentReturned = composed.parser.call(parentState); } catch (error) { parentThrown = error; }
        if (parentThrown !== undefined) issues.push(`parent threw ${String(parentThrown)}`);
        if (parentThrown === undefined && parentReturned !== parentState) issues.push("parent returned a different ParserState");
        if (parent.accepts === true && (parentState.isError || parentState.offset !== composed.expectedEnd)) issues.push("parent acceptance/boundary mismatch");
        if (parent.accepts === false && !parentState.isError) issues.push("parent should reject");
        if (parent.accepts_complete_source === false && (parentState.isError || parentState.offset === row.input.source.length)) issues.push("parent complete-source disposition mismatch");
        if (parentState.src !== row.input.source) issues.push("parent changed source");
        if (parent.accepts === true && row.expect.result) {
            const parentLeaf = parent.kind === "dimension" ? parentState.value?.[0] : parentState.value;
            checkLeaf(parentLeaf, row.expect.result, issues);
            if (parent.kind === "dimension" && parentState.value?.[1] !== parent.unit) issues.push("parent dimension unit mismatch");
        }
    }
    return { id: row.id, family: row.family, status: issues.length === 0 ? "PASS" : "FAIL", issues };
}

const observations = corpus.cases.map(assess);
const familyOrder = [...new Set(corpus.cases.map((row) => row.family))];
const families = Object.fromEntries(familyOrder.map((family) => {
    const rows = observations.filter((row) => row.family === family);
    const failures = rows.filter((row) => row.status === "FAIL");
    return [family, {
        status: failures.length === 0 ? "PASS" : "FAIL",
        cases: rows.length,
        passed: rows.length - failures.length,
        failed: failures.length,
        failed_cases: failures.map(({ id, issues }) => ({ id, issues })),
    }];
}));
const failed = observations.filter((row) => row.status === "FAIL");
process.stdout.write(`${JSON.stringify({
    schema: "value.pi.syntax-consume-number.g13.candidate-evaluation/v1",
    status: failed.length === 0 ? "PASS" : "FAIL",
    cases: observations.length,
    passed: observations.length - failed.length,
    failed: failed.length,
    families,
})}\n`);
