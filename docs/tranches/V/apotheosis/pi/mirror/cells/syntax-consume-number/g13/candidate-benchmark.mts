import { ParserState } from "@mkbabb/parse-that/core";
import { consumeNumber as hNumber } from "./candidates/h/index.ts";
import { consumeNumber as bNumber } from "./candidates/b/index.ts";
import { consumeNumber as sNumber } from "./candidates/s/index.ts";
import { consumeNumber as dNumber } from "./candidates/d/index.ts";
import { parseCssScalar } from "../../../../../../../../../src/css/grammar.ts";
import { number as historicalNumber } from "../g7/authorities/historical-utils.ts";
import { numberValue as c14NumberValue } from "../../../../../../vnext/prototypes/c14-css/src/css/grammar/l4/value-unit.ts";
import { createHash } from "node:crypto";
import { cpus, totalmem } from "node:os";

type Lane = { id: string; run: (raw: string) => number };
const fail = (message: string): never => { throw new Error(message); };
const bits = (value: number) => {
    const bytes = Buffer.allocUnsafe(8);
    bytes.writeDoubleBE(value, 0);
    return bytes.toString("hex");
};
const canonical = (value: any): string => value === null || typeof value !== "object"
    ? JSON.stringify(value)
    : Array.isArray(value)
        ? `[${value.map(canonical).join(",")}]`
        : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;

const signs = ["", "-"];
const mantissas = ["0", "1", "7", "42", "314159", "9007199", "0.5", "1.0", "7.25", "42.125", ".5", ".875"];
const exponents = ["", "e0", "e2", "E-2", "e+5", "E-5"];
const cases: Array<{ id: string; raw: string; binary64_be_hex: string }> = [];
let ordinal = 0;
for (const sign of signs) for (const mantissa of mantissas) for (const exponent of exponents) {
    const raw = `${sign}${mantissa}${exponent}`;
    cases.push({ id: `full-number/${String(++ordinal).padStart(3, "0")}`, raw, binary64_be_hex: bits(Number(raw)) });
}
const corpus = {
    schema: "value.pi.syntax-consume-number.g13.benchmark-corpus/v1",
    grammar_intersection: "-?(?:(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?|\\.[0-9]+)(?:[eE][+-]?[0-9]+)?; finite ECMAScript Number values only; complete source required",
    order: "sign, then mantissa, then exponent axes in the declared array order",
    axes: { signs, mantissas, exponents },
    cases,
};
const corpusBytes = Buffer.from(`${canonical(corpus)}\n`);

const candidate = (parser: any, raw: string) => {
    const state = new ParserState<any>(raw, undefined, 0);
    parser.call(state);
    if (state.isError || state.offset !== raw.length || typeof state.value?.value !== "number") return fail("candidate did not consume a complete benchmark number");
    return state.value.value;
};
const deposed = (raw: string) => {
    const state = new ParserState<any>(raw, undefined, 0);
    historicalNumber.call(state);
    if (state.isError || state.offset !== raw.length || typeof state.value !== "number") return fail("deposed door did not consume a complete benchmark number");
    return state.value;
};
const c14 = (raw: string) => {
    const state = new ParserState<any>(raw, undefined, 0);
    c14NumberValue.call(state);
    if (state.isError || state.offset !== raw.length || typeof state.value?.value !== "number") return fail("C14 door did not consume a complete benchmark number");
    return state.value.value;
};
const live = (raw: string) => {
    const result = parseCssScalar(raw);
    if (!result.ok || result.value.kind !== "scalar" || result.value.payload.type !== "number" || result.value.payload.unit !== "") return fail("LIVE regex door did not consume a complete benchmark number");
    return result.value.payload.value;
};

const lanes: Lane[] = [
    { id: "h", run: (raw) => candidate(hNumber, raw) },
    { id: "b", run: (raw) => candidate(bNumber, raw) },
    { id: "s", run: (raw) => candidate(sNumber, raw) },
    { id: "d", run: (raw) => candidate(dNumber, raw) },
    { id: "live_regex", run: live },
    { id: "deposed", run: deposed },
    { id: "c14", run: c14 },
];

for (const lane of lanes) for (const row of cases) {
    const actual = lane.run(row.raw);
    if (bits(actual) !== row.binary64_be_hex) fail(`${lane.id} validation mismatch for ${row.id}`);
}

const repetitionsPerTrial = 800;
const warmupRounds = 4;
const trialCount = 11;
const operationsPerTrial = repetitionsPerTrial * cases.length;
let blackhole = 0;
function workload(lane: Lane, repetitions: number) {
    let sink = 0;
    for (let repetition = 0; repetition < repetitions; repetition++) {
        for (let index = 0; index < cases.length; index++) sink += Math.abs(lane.run(cases[index]!.raw)) * ((index % 7) + 1);
    }
    blackhole += sink;
    return sink;
}
for (let round = 0; round < warmupRounds; round++) {
    const start = round % lanes.length;
    const order = [...lanes.slice(start), ...lanes.slice(0, start)];
    for (const lane of order) workload(lane, Math.ceil(repetitionsPerTrial / 4));
}

const samples = Object.fromEntries(lanes.map((lane) => [lane.id, [] as bigint[]]));
const roundRobinOrders: string[][] = [];
const checksums = Object.fromEntries(lanes.map((lane) => [lane.id, [] as number[]]));
for (let trial = 0; trial < trialCount; trial++) {
    const start = trial % lanes.length;
    const order = [...lanes.slice(start), ...lanes.slice(0, start)];
    roundRobinOrders.push(order.map((lane) => lane.id));
    for (const lane of order) {
        const before = process.hrtime.bigint();
        const checksum = workload(lane, repetitionsPerTrial);
        const elapsed = process.hrtime.bigint() - before;
        samples[lane.id]!.push(elapsed);
        checksums[lane.id]!.push(checksum);
    }
}
if (!Number.isFinite(blackhole)) fail("benchmark blackhole is not finite");
const referenceChecksums = checksums[lanes[0]!.id]!;
for (const lane of lanes) for (let index = 0; index < trialCount; index++) {
    if (!Object.is(checksums[lane.id]![index], referenceChecksums[index])) fail(`${lane.id} timed checksum mismatch`);
}

const median = (values: number[]) => {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle]! : (sorted[middle - 1]! + sorted[middle]!) / 2;
};
const percentile = (values: number[], fraction: number) => {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor((sorted.length - 1) * fraction)]!;
};
const results = Object.fromEntries(lanes.map((lane) => {
    const numeric = samples[lane.id]!.map(Number);
    const med = median(numeric);
    const mad = median(numeric.map((value) => Math.abs(value - med)));
    const q1 = percentile(numeric, 0.25);
    const q3 = percentile(numeric, 0.75);
    return [lane.id, {
        validation: "PASS_144_OF_144_EXACT_BINARY64_AND_COMPLETE_SOURCE",
        samples_elapsed_ns: samples[lane.id]!.map(String),
        median_elapsed_ns: String(Math.round(med)),
        median_absolute_deviation_ns: String(Math.round(mad)),
        q1_elapsed_ns: String(q1),
        q3_elapsed_ns: String(q3),
        interquartile_range_ns: String(q3 - q1),
        median_ns_per_operation: med / operationsPerTrial,
    }];
}));

process.stdout.write(`${JSON.stringify({
    schema: "value.pi.syntax-consume-number.g13.benchmark-run/v1",
    status: "PASS_CORRECTNESS_GATED_TIMING_COMPLETE_NO_PERFORMANCE_GATE",
    protocol: {
        clock: "process.hrtime.bigint",
        observable_operation: "complete source string -> real lane implementation -> normalized binary64 number; parser state and result construction included",
        validation_before_timing: "all lanes exactly match all corpus binary64 values and consume the complete source",
        corpus_order: "fixed; never shuffled",
        warmup_rounds: warmupRounds,
        trials: trialCount,
        schedule: "deterministic rotating round-robin",
        repetitions_per_trial: repetitionsPerTrial,
        operations_per_trial: operationsPerTrial,
        throughput_units_reported: false,
        performance_gate: null,
    },
    corpus: {
        sha256: createHash("sha256").update(corpusBytes).digest("hex"),
        bytes: corpusBytes.length,
        cases: cases.length,
        canonicalization: "recursively sorted object keys, declared array order, no insignificant whitespace, one terminal LF",
        value: corpus,
    },
    environment: {
        node: process.version,
        v8: process.versions.v8,
        platform: process.platform,
        arch: process.arch,
        cpu_model: cpus()[0]?.model ?? "UNKNOWN",
        logical_cpus: cpus().length,
        total_memory_bytes: totalmem(),
        argv: process.execArgv,
    },
    round_robin_orders: roundRobinOrders,
    results,
})}\n`);
