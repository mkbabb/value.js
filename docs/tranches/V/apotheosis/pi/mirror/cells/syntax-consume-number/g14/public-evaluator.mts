import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Parser, ParserState, regex, string } from "@mkbabb/parse-that/core";

type Sign = "+" | "-" | null;
type NumberType = "integer" | "number";
type CssNumber = { sign: Sign; type: NumberType; value: number };
type Success = {
    id: string;
    source: string;
    offset: number;
    representation: string;
    end: number;
    value_kind?: "finite" | "negative-zero" | "positive-infinity" | "negative-infinity";
    type?: NumberType;
    sign?: Sign;
};
type ParentCase = {
    id: string;
    source: string;
    prefix: string;
    suffix: string;
    kind: "percentage" | "dimension" | "integer" | "delimited";
    accepts: boolean;
    value?: number;
    unit?: string;
};

const here = dirname(fileURLToPath(import.meta.url));
const fail = (message: string): never => { throw new Error(message); };
const json = (path: string): any => JSON.parse(readFileSync(path, "utf8"));
const sha256 = (path: string): string => createHash("sha256").update(readFileSync(path)).digest("hex");

const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== "--candidate") fail("usage: public-evaluator.mts --candidate <index.ts|index.js>");

const featurePath = resolve(here, "feature.json");
const feature = json(featurePath);
const candidateInterfacePath = resolve(here, feature.candidate_interface.path);
if (sha256(candidateInterfacePath) !== feature.candidate_interface.sha256) fail("candidate interface hash mismatch");
const manifestPath = resolve(here, feature.fixtures.manifest.path);
if (sha256(manifestPath) !== feature.fixtures.manifest.sha256) fail("fixture manifest hash mismatch");
const manifest = json(manifestPath);
const basePath = resolve(dirname(manifestPath), manifest.base.path);
const repairsPath = resolve(dirname(manifestPath), manifest.repairs.path);
if (sha256(basePath) !== manifest.base.sha256) fail("G13 public corpus hash mismatch");
if (sha256(repairsPath) !== manifest.repairs.sha256) fail("G14 repair corpus hash mismatch");

const base = json(basePath);
const repairs = json(repairsPath);
const candidatePath = resolve(args[1]!);
const candidateModule = await import(`${pathToFileURL(candidatePath).href}?g14=${sha256(candidatePath)}`);
const consumeNumber: unknown = candidateModule.consumeNumber;
if (!(consumeNumber instanceof Parser)) fail("candidate must export consumeNumber as a parse-that Parser");
const parser = consumeNumber as Parser<CssNumber>;

const expectedValue = (row: Success): number => row.value_kind === "negative-zero" ? -0
    : row.value_kind === "positive-infinity" ? Infinity
    : row.value_kind === "negative-infinity" ? -Infinity
    : Number(row.representation);
const expectedLeaf = (row: Success): CssNumber => ({
    sign: row.sign === undefined
        ? row.representation.startsWith("+") ? "+" : row.representation.startsWith("-") ? "-" : null
        : row.sign,
    type: row.type ?? (row.representation.includes(".") || /[eE]/.test(row.representation) ? "number" : "integer"),
    value: expectedValue(row),
});

function assertExactMutableLeaf(id: string, actual: unknown, expected: CssNumber): asserts actual is CssNumber {
    if (typeof actual !== "object" || actual === null || Object.getPrototypeOf(actual) !== Object.prototype) fail(`${id}: result is not an ordinary object`);
    if (Object.isFrozen(actual) || Object.isSealed(actual) || !Object.isExtensible(actual)) fail(`${id}: result must be mutable, configurable, and extensible`);
    if (JSON.stringify(Reflect.ownKeys(actual)) !== JSON.stringify(["sign", "type", "value"])) fail(`${id}: result keys are not exactly sign,type,value`);
    const descriptors = Object.getOwnPropertyDescriptors(actual) as Record<string, PropertyDescriptor>;
    for (const [key, value] of Object.entries(expected)) {
        const descriptor = descriptors[key];
        if (!descriptor || descriptor.enumerable !== true || descriptor.configurable !== true || descriptor.writable !== true
            || !Object.hasOwn(descriptor, "value") || descriptor.get !== undefined || descriptor.set !== undefined
            || !Object.is(descriptor.value, value)) fail(`${id}: descriptor/value mismatch for ${key}`);
    }
}

const predecessor = (name: string): unknown => {
    switch (name) {
        case "undefined": return undefined;
        case "null": return null;
        case "false": return false;
        case "zero": return 0;
        case "empty-string": return "";
        case "array": return Object.freeze(["prior"]);
        case "object": return Object.freeze({ tag: "prior" });
        default: return fail(`unknown predecessor profile ${name}`);
    }
};

const snapshotDiagnostics = (state: ParserState<unknown>) => JSON.stringify({
    furthest: state.furthest,
    expected: state.expected,
    suggestions: state.suggestions,
    secondarySpans: state.secondarySpans,
});

const seedAheadDiagnostics = (state: ParserState<unknown>, offset: number) => {
    state.furthest = offset + 100;
    state.expected = ["preexisting-ahead"];
    state.suggestions = [{ kind: "trailing-content", message: "preexisting" }];
    state.secondarySpans = [{ offset: offset + 1, label: "preexisting" }];
};

function runSuccess(row: Success) {
    const prior = Object.freeze({ tag: "success-prior" });
    const state = new ParserState<unknown>(row.source, prior, row.offset);
    const source = state.src;
    try { parser.call(state as ParserState<CssNumber>); } catch (error) { fail(`${row.id}: threw ${String(error)}`); }
    if (state.src !== source || state.isError || state.offset !== row.end) fail(`${row.id}: success boundary mismatch`);
    assertExactMutableLeaf(row.id, state.value, expectedLeaf(row));
}

let ordinaryFailureRuns = 0;
let aheadFailureRuns = 0;
function runFailure(source: string, offset: number, priorName: string, diagnostics: "ordinary" | "preseeded-ahead") {
    const prior = predecessor(priorName);
    const state = new ParserState<unknown>(source, prior, offset);
    const originalSource = state.src;
    if (diagnostics === "preseeded-ahead") seedAheadDiagnostics(state, offset);
    const before = snapshotDiagnostics(state);
    try { parser.call(state as ParserState<CssNumber>); } catch (error) { fail(`failure ${JSON.stringify(source)} at ${offset} threw ${String(error)}`); }
    if (state.src !== originalSource || !state.isError || state.offset !== offset || !Object.is(state.value, prior)) fail(`failure ${JSON.stringify(source)} at ${offset} was not transactional`);
    if (!Number.isInteger(state.furthest) || state.furthest < -1 || state.furthest > source.length + 100
        || (state.expected !== undefined && (!Array.isArray(state.expected) || state.expected.some((item) => typeof item !== "string")))
        || !Array.isArray(state.suggestions) || !Array.isArray(state.secondarySpans)) fail(`failure ${JSON.stringify(source)} emitted malformed diagnostics`);
    if (diagnostics === "preseeded-ahead") {
        if (snapshotDiagnostics(state) !== before) fail(`failure ${JSON.stringify(source)} changed pre-existing ahead diagnostics`);
        aheadFailureRuns++;
    } else {
        ordinaryFailureRuns++;
    }
}

function generatedSuccesses(): Success[] {
    const rows: Success[] = [];
    for (const sign of base.success_matrix.signs as string[])
        for (const mantissa of base.success_matrix.mantissas as string[])
            for (const exponent of base.success_matrix.exponents as string[]) {
                const representation = `${sign}${mantissa}${exponent}`;
                const offset = base.success_matrix.offset_by_sign[sign || "none"];
                rows.push({ id: `cross/${sign || "none"}/${mantissa}/${exponent || "none"}`, source: `${"@".repeat(offset)}${representation}]`, offset, representation, end: offset + representation.length });
            }
    for (const sign of base.incomplete_exponent_matrix.signs as string[])
        for (const mantissa of base.incomplete_exponent_matrix.mantissas as string[])
            for (const suffix of base.incomplete_exponent_matrix.suffixes as string[]) {
                const representation = `${sign}${mantissa}`;
                rows.push({ id: `rollback/${sign || "none"}/${mantissa}/${suffix}`, source: `${representation}${suffix}]`, offset: 0, representation, end: representation.length });
            }
    return [...rows, ...base.special_success_cases, ...base.guarded_suffix_cases];
}

function parent(row: ParentCase): Parser<unknown> {
    const numeric = string(row.prefix).next(parser);
    if (row.kind === "percentage") return numeric.skip(string("%")).skip(string(row.suffix));
    if (row.kind === "dimension") return numeric.then(regex(/[a-zA-Z]+/)).skip(string(row.suffix));
    if (row.kind === "integer") return numeric.chain((leaf) => leaf.type === "integer" ? string(row.suffix).map(() => leaf) : string("\u0000").map(() => leaf));
    return numeric.skip(string(row.suffix));
}

function runComposition(row: ParentCase) {
    const prior = Object.freeze({ tag: "parent-prior" });
    const state = new ParserState<unknown>(row.source, prior, 0);
    const source = state.src;
    try { parent(row).call(state); } catch (error) { fail(`${row.id}: parent threw ${String(error)}`); }
    if (!row.accepts) {
        if (!state.isError || state.src !== source) fail(`${row.id}: invalid parent composition was accepted or changed source`);
        return;
    }
    if (state.isError || state.src !== source || state.offset !== row.source.length) fail(`${row.id}: valid parent composition rejected`);
    const leaf = row.kind === "dimension" ? (state.value as [CssNumber, string])[0] : state.value as CssNumber;
    if (!Object.is(leaf.value, row.value)) fail(`${row.id}: parent value mismatch`);
    if (row.kind === "dimension" && (state.value as [CssNumber, string])[1] !== row.unit) fail(`${row.id}: parent unit mismatch`);
}

const inheritedSuccesses = generatedSuccesses();
const completeCases = repairs.complete_cases as Success[];
const repeatedCases = repairs.repeated_fraction_prefix_cases as Success[];
for (const row of [...inheritedSuccesses, ...completeCases, ...repeatedCases]) runSuccess(row);

for (const raw of base.failure_sources as string[])
    for (const offset of base.failure_offsets as number[])
        for (const prior of base.predecessor_profiles as string[])
            for (const diagnostics of base.diagnostics_profiles as Array<"ordinary" | "preseeded-ahead">) {
                const source = offset === 0 ? raw : `${"@".repeat(offset)}${raw}`;
                runFailure(source, offset, prior, diagnostics);
            }

const parentCases = [...base.composition_cases, ...repairs.repeated_fraction_parent_cases] as ParentCase[];
for (const row of parentCases) runComposition(row);

let hostileRuns = 0;
for (const source of base.hostile_no_throw_sources as string[]) {
    const prior = Object.freeze({ tag: "hostile-prior" });
    const state = new ParserState<unknown>(source, prior, 0);
    try { parser.call(state as ParserState<CssNumber>); } catch (error) { fail(`hostile ${JSON.stringify(source)} threw ${String(error)}`); }
    if (state.src !== source || state.offset < 0 || state.offset > source.length) fail(`hostile ${JSON.stringify(source)} corrupted state`);
    if (state.isError) {
        if (state.offset !== 0 || !Object.is(state.value, prior)) fail(`hostile ${JSON.stringify(source)} failed non-transactionally`);
    } else {
        assertExactMutableLeaf(`hostile ${JSON.stringify(source)}`, state.value, state.value as CssNumber);
    }
    hostileRuns++;
}

process.stdout.write(`${JSON.stringify({
    schema: "value.pi.syntax-consume-number.g14.public-result/v1",
    status: "PASS",
    inherited_successes: inheritedSuccesses.length,
    complete_cases: completeCases.length,
    repeated_fraction_prefix_cases: repeatedCases.length,
    failure_runs: ordinaryFailureRuns + aheadFailureRuns,
    ordinary_failure_runs: ordinaryFailureRuns,
    ordinary_failure_class: feature.failure.ordinary_diagnostics.classification,
    ahead_failure_runs: aheadFailureRuns,
    parent_cases: parentCases.length,
    repeated_fraction_parent_cases: repairs.repeated_fraction_parent_cases.length,
    hostile_runs: hostileRuns,
    corpus: { base_sha256: manifest.base.sha256, repairs_sha256: manifest.repairs.sha256 },
})}\n`);
