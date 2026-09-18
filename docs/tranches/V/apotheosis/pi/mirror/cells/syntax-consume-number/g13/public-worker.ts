import { Parser, ParserState, regex, string } from "@mkbabb/parse-that/core";
import { consumeNumber } from "@candidate";
import { readFileSync } from "node:fs";

type Leaf = Readonly<{ sign: "+" | "-" | null; type: "integer" | "number"; value: number }>;
type Success = { id: string; source: string; offset: number; representation: string; end: number; value_kind?: string; type?: string; sign?: string | null };

if (!(consumeNumber instanceof Parser)) throw new Error("consumeNumber is not a parse-that Parser");
const corpus = JSON.parse(readFileSync(process.argv[2]!, "utf8"));
const fail = (message: string): never => { throw new Error(message); };

const expectedValue = (row: Success) => row.value_kind === "negative-zero" ? -0
    : row.value_kind === "positive-infinity" ? Infinity
    : row.value_kind === "negative-infinity" ? -Infinity
    : Number(row.representation);
const expectedLeaf = (row: Success): Leaf => Object.freeze({
    sign: row.sign === undefined ? row.representation.startsWith("+") ? "+" : row.representation.startsWith("-") ? "-" : null : row.sign as Leaf["sign"],
    type: (row.type ?? (row.representation.includes(".") || /[eE]/.test(row.representation) ? "number" : "integer")) as Leaf["type"],
    value: expectedValue(row),
});
const exactLeaf = (actual: unknown, expected: Leaf) => {
    if (typeof actual !== "object" || actual === null || Object.getPrototypeOf(actual) !== Object.prototype || !Object.isFrozen(actual)) return false;
    const leaf = actual as Leaf;
    const descriptors = Object.getOwnPropertyDescriptors(leaf) as Record<keyof Leaf, PropertyDescriptor>;
    const exactDescriptor = (key: keyof Leaf, value: unknown) => Object.hasOwn(descriptors, key)
        && descriptors[key].enumerable === true && descriptors[key].configurable === false
        && descriptors[key].writable === false && Object.hasOwn(descriptors[key], "value")
        && descriptors[key].get === undefined && descriptors[key].set === undefined
        && Object.is(descriptors[key].value, value);
    return Reflect.ownKeys(leaf).map(String).sort().join(",") === "sign,type,value"
        && exactDescriptor("sign", expected.sign) && exactDescriptor("type", expected.type) && exactDescriptor("value", expected.value);
};

const predecessor = (name: string): unknown => {
    switch (name) {
        case "undefined": return undefined;
        case "null": return null;
        case "false": return false;
        case "zero": return 0;
        case "empty-string": return "";
        case "array": return Object.freeze(["prior"]);
        case "object": return Object.freeze({ tag: "prior" });
        default: return fail(`unknown predecessor ${name}`);
    }
};

const seedDiagnostics = (state: ParserState<unknown>, offset: number) => {
    const seed = {
        furthest: offset + 100,
        expected: ["preexisting-ahead"],
        suggestions: [{ kind: "trailing-content" as const, message: "preexisting" }],
        secondarySpans: [{ offset: offset + 1, label: "preexisting" }],
    };
    state.furthest = seed.furthest;
    state.expected = [...seed.expected];
    state.suggestions = seed.suggestions.map((item) => ({ ...item }));
    state.secondarySpans = seed.secondarySpans.map((item) => ({ ...item }));
    return seed;
};

function runSuccess(row: Success) {
    const prior = Object.freeze({ tag: "success-prior" });
    const state = new ParserState<any>(row.source, prior, row.offset);
    const source = state.src;
    try { consumeNumber.call(state); } catch (error) { fail(`${row.id}: threw ${String(error)}`); }
    if (state.src !== source || state.isError || state.offset !== row.end || !exactLeaf(state.value, expectedLeaf(row))) fail(`${row.id}: observation mismatch`);
}

function runFailure(source: string, offset: number, priorName: string, diagnostics: string) {
    const prior = predecessor(priorName);
    const state = new ParserState<any>(source, prior, offset);
    const originalSource = state.src;
    const seed = diagnostics === "preseeded-ahead" ? seedDiagnostics(state, offset) : null;
    try { consumeNumber.call(state); } catch (error) { fail(`failure ${JSON.stringify(source)} threw ${String(error)}`); }
    if (state.src !== originalSource || !state.isError || state.offset !== offset || !Object.is(state.value, prior)) fail(`failure ${JSON.stringify(source)} at ${offset} was not transactional`);
    if (seed && (state.furthest !== seed.furthest || JSON.stringify(state.expected) !== JSON.stringify(seed.expected)
        || JSON.stringify(state.suggestions) !== JSON.stringify(seed.suggestions) || JSON.stringify(state.secondarySpans) !== JSON.stringify(seed.secondarySpans))) fail(`failure ${JSON.stringify(source)} changed ahead diagnostics`);
}

function generatedSuccesses(): Success[] {
    const out: Success[] = [];
    const matrix = corpus.success_matrix;
    for (const sign of matrix.signs) for (const mantissa of matrix.mantissas) for (const exponent of matrix.exponents) {
        const representation = `${sign}${mantissa}${exponent}`;
        const offset = matrix.offset_by_sign[sign || "none"];
        out.push({ id: `cross/${sign || "none"}/${mantissa}/${exponent || "none"}`, source: `${"@".repeat(offset)}${representation}]`, offset, representation, end: offset + representation.length });
    }
    const incomplete = corpus.incomplete_exponent_matrix;
    for (const sign of incomplete.signs) for (const mantissa of incomplete.mantissas) for (const suffix of incomplete.suffixes) {
        const representation = `${sign}${mantissa}`;
        out.push({ id: `rollback/${sign || "none"}/${mantissa}/${suffix}`, source: `${representation}${suffix}]`, offset: 0, representation, end: representation.length });
    }
    return [...out, ...corpus.special_success_cases, ...corpus.guarded_suffix_cases];
}

function parent(row: any): Parser<unknown> {
    const base = string(row.prefix).next(consumeNumber);
    if (row.kind === "percentage") return base.skip(string("%")).skip(string(row.suffix));
    if (row.kind === "dimension") return base.then(regex(/[a-zA-Z]+/)).skip(string(row.suffix));
    if (row.kind === "integer") return base.chain((leaf) => leaf.type === "integer" ? string(row.suffix).map(() => leaf) : string("\u0000").map(() => leaf));
    return base.skip(string(row.suffix));
}

function runComposition(row: any) {
    const state = new ParserState<any>(row.source, Object.freeze({ tag: "parent-prior" }), 0);
    try { parent(row).call(state); } catch (error) { fail(`${row.id}: parent threw ${String(error)}`); }
    if (!row.accepts) {
        if (!state.isError) fail(`${row.id}: should reject`);
        return;
    }
    if (state.isError || state.offset !== row.source.length) fail(`${row.id}: should accept completely`);
    const leaf = row.kind === "dimension" ? (state.value as [Leaf, string])[0] : state.value as Leaf;
    if (!Object.is(leaf.value, row.value)) fail(`${row.id}: parent value mismatch`);
    if (row.kind === "dimension" && (state.value as [Leaf, string])[1] !== row.unit) fail(`${row.id}: unit mismatch`);
}

const successes = generatedSuccesses();
for (const row of successes) runSuccess(row);
let failureRuns = 0;
for (const base of corpus.failure_sources) for (const offset of corpus.failure_offsets) for (const prior of corpus.predecessor_profiles) for (const diagnostics of corpus.diagnostics_profiles) {
    const source = offset === 0 ? base : `${"@".repeat(offset)}${base}`;
    runFailure(source, offset, prior, diagnostics);
    failureRuns++;
}
for (const row of corpus.composition_cases) runComposition(row);
let hostileRuns = 0;
for (const source of corpus.hostile_no_throw_sources) {
    const state = new ParserState<any>(source, Object.freeze({ tag: "hostile-prior" }), 0);
    try { consumeNumber.call(state); } catch (error) { fail(`hostile ${JSON.stringify(source)} threw ${String(error)}`); }
    if (state.src !== source || state.offset < 0 || state.offset > source.length) fail(`hostile ${JSON.stringify(source)} corrupted state`);
    hostileRuns++;
}
for (const required of corpus.signed_integer_exponents_required) if (!successes.some((row) => row.representation === required)) fail(`missing required cross-product ${required}`);

process.stdout.write(`${JSON.stringify({
    schema: "value.pi.syntax-consume-number.g13.public-result/v1",
    status: "PASS",
    success_cases: successes.length,
    failure_runs: failureRuns,
    guarded_suffixes: corpus.guarded_suffix_cases.length,
    failure_offsets: corpus.failure_offsets.length,
    hostile_runs: hostileRuns,
    composition_cases: corpus.composition_cases.length,
    signed_integer_exponents: corpus.signed_integer_exponents_required.length,
})}\n`);
