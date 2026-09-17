import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

import { percentageLiteral } from "../integration/grammar/css/l4/value-unit/percentage.ts";
import { priorPercentageParser } from "../../g0/benchmark-peers.ts";
import { parseCssScalar as rejectedPublic } from "../../../../grammar/value.ts";
import { parseCssScalar as livePublic } from "../../../../../../../../../../src/css/grammar.ts";

type Lane = "g2-public" | "live-public" | "rejected-public" | "g2-internal" | "prior-internal";
const lanes: Lane[] = ["g2-public", "live-public", "rejected-public", "g2-internal", "prior-internal"];
const root = new URL("../", import.meta.url);
const manifestUrl = new URL("./bench/manifest.json", root);
const manifest = JSON.parse(readFileSync(manifestUrl, "utf8"));
const corpusBytes = readFileSync(new URL("./bench/corpus.json", root));
const corpus = JSON.parse(corpusBytes.toString()) as string[];
const sha256 = (bytes: Uint8Array | string) => createHash("sha256").update(bytes).digest("hex");

assert.equal(sha256(corpusBytes), manifest.bindings.corpus_sha256);
assert.equal(sha256(readFileSync(new URL("./bench/benchmark.mts", root))), manifest.bindings.harness_sha256);
assert.equal(sha256(readFileSync(new URL("./integration/grammar/css/l4/value-unit/percentage.ts", root))), manifest.bindings.percentage_sha256);
assert.equal(sha256(readFileSync(new URL("./integration/grammar/css/l4/value-unit/numeric.ts", root))), manifest.bindings.numeric_sha256);

const percentageDocument = percentageLiteral.eof();
const emptyDiagnostics = Object.freeze([]) as readonly [];

function g2Public(source: string) {
    const state = percentageDocument.parseState(source);
    if (state.isError) return null;
    return Object.freeze({
        ok: true as const,
        value: Object.freeze({
            kind: "scalar" as const,
            payload: Object.freeze({ type: "number" as const, value: state.value.number.value, unit: "%" }),
        }),
        diagnostics: emptyDiagnostics,
    });
}

function parseValue(lane: Lane, source: string): number | null {
    if (lane === "g2-internal") {
        const state = percentageLiteral.parseState(source);
        return state.isError || state.offset !== source.length ? null : state.value.number.value;
    }
    if (lane === "prior-internal") return priorPercentageParser(source)?.number.value ?? null;
    const result = lane === "g2-public" ? g2Public(source)
        : lane === "live-public" ? livePublic(source)
            : rejectedPublic(source);
    return result?.ok === true && result.value.kind === "scalar"
        && result.value.payload.type === "number" && result.value.payload.unit === "%"
        ? result.value.payload.value
        : null;
}

const transcripts = Object.fromEntries(lanes.map((lane) => [lane, corpus.map((source) => {
    const value = parseValue(lane, source);
    assert.notEqual(value, null, `${lane}:${source}`);
    assert.ok(Object.is(value, Number(source.slice(0, -1))), `${lane}:${source}:value`);
    return Object.is(value, -0) ? "-0" : value;
})]));
assert.equal(new Set(Object.values(transcripts).map((value) => sha256(JSON.stringify(value)))).size, 1);

const cycles = manifest.protocol.cycles as number;
const warmups = manifest.protocol.warmups as number;
const samplesCount = manifest.protocol.samples as number;
const schedule = (index: number): Lane[] => [
    ...lanes.slice(index % lanes.length),
    ...lanes.slice(0, index % lanes.length),
];
const run = (lane: Lane): number => {
    let checksum = 0;
    const started = performance.now();
    for (let cycle = 0; cycle < cycles; cycle += 1) {
        for (const source of corpus) {
            const value = parseValue(lane, source);
            assert.notEqual(value, null);
            checksum += value! + source.length;
        }
    }
    assert.ok(Number.isFinite(checksum));
    return Math.round((performance.now() - started) * 1_000_000);
};

for (let index = 0; index < warmups; index += 1) {
    for (const lane of schedule(index)) run(lane);
}

const samples = Object.fromEntries(lanes.map((lane) => [lane, [] as number[]])) as Record<Lane, number[]>;
for (let index = 0; index < samplesCount; index += 1) {
    for (const lane of schedule(index)) samples[lane].push(run(lane));
}

const median = (values: readonly number[]): number => {
    const ordered = [...values].sort((a, b) => a - b);
    return ordered[Math.floor(ordered.length / 2)];
};
const mad = (values: readonly number[]): number => {
    const center = median(values);
    return median(values.map((value) => Math.abs(value - center)));
};
const comparison = (candidate: Lane, peer: Lane) => {
    const logs = samples[candidate].map((value, index) => Math.log(value / samples[peer][index]));
    const mean = logs.reduce((sum, value) => sum + value, 0) / logs.length;
    const variance = logs.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (logs.length - 1);
    const upper = mean + manifest.protocol.t_critical_one_sided_95_df_30 * Math.sqrt(variance / logs.length);
    return {
        candidate,
        peer,
        logs,
        geometric_mean_ratio: Math.exp(mean),
        one_sided_95_upper_ratio: Math.exp(upper),
        strict_win: upper < 0,
    };
};

const comparisons = {
    public_vs_live: comparison("g2-public", "live-public"),
    public_vs_rejected: comparison("g2-public", "rejected-public"),
    internal_vs_prior: comparison("g2-internal", "prior-internal"),
};
const raw = {
    schema: "value.pi.percentage-literal.g2.benchmark/v1",
    status: Object.values(comparisons).every((row) => row.strict_win) ? "PASS" : "FAIL",
    manifest_sha256: sha256(readFileSync(manifestUrl)),
    environment: {
        node: process.version,
        v8: process.versions.v8,
        platform: process.platform,
        arch: process.arch,
        cpu: "Apple M5 Max",
        hardware_model: "Mac17,7",
        memory_bytes: 137438953472,
        logical_cpus: 18,
        os: "macOS 26.4.1 build 25E253",
    },
    exits: { validation: 0, warmup: 0, timing: 0 },
    failures: [],
    allocation: "UNAVAILABLE: co-resident lanes make Node process-global heap/RSS non-attributable",
    throughput_unit: "nanoseconds per 16-input corpus block",
    invocations_per_sample: cycles * corpus.length,
    schedule_indices: Array.from({ length: samplesCount }, (_, index) => index % lanes.length),
    medians_ns: Object.fromEntries(lanes.map((lane) => [lane, median(samples[lane])])),
    mad_ns: Object.fromEntries(lanes.map((lane) => [lane, mad(samples[lane])])),
    samples_ns: samples,
    comparisons,
    claims: {
        public_live_win: comparisons.public_vs_live.strict_win,
        public_rejected_win: comparisons.public_vs_rejected.strict_win,
        internal_prior_win: comparisons.internal_vs_prior.strict_win,
        full_parser_win: false,
    },
};

writeFileSync(new URL("./bench/raw-attempt-1.json", root), `${JSON.stringify(raw, null, 2)}\n`, { flag: "wx" });
process.stdout.write(`${JSON.stringify({ status: raw.status, comparisons, medians_ns: raw.medians_ns }, null, 2)}\n`);

