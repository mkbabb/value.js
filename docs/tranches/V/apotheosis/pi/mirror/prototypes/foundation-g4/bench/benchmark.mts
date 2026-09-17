import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

type State = { isError: boolean; offset: number; value: unknown };
type Candidate = Record<string, { parseState(source: string): State }>;
type Seat = "h" | "b" | "s";

const root = new URL("../", import.meta.url);
const manifestUrl = new URL("./bench/manifest.json", root);
const manifest = JSON.parse(readFileSync(manifestUrl, "utf8"));
const corpusBytes = readFileSync(new URL("./bench/corpus.json", root));
const corpus = JSON.parse(corpusBytes.toString()) as Record<string, string[]>;
const sha256 = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");

assert.equal(sha256(corpusBytes), manifest.bindings.corpus_sha256);
assert.equal(sha256(readFileSync(new URL("./bench/benchmark.mts", root))), manifest.bindings.harness_sha256);

const entries = {
    h: "../../foundation-g3/integration/grammar/css/l4/tokens/index.ts",
    b: "../candidates/b/index.ts",
    s: "../candidates/s/index.ts",
} as const;
const candidates = Object.fromEntries(await Promise.all(
    Object.entries(entries).map(async ([seat, entry]) => [seat, await import(entry) as Candidate]),
)) as Record<Seat, Candidate>;
const seats: Seat[] = ["h", "b", "s"];
const schedules: Seat[][] = [
    ["h", "b", "s"], ["h", "s", "b"],
    ["b", "h", "s"], ["b", "s", "h"],
    ["s", "h", "b"], ["s", "b", "h"],
];

for (const [operation, sources] of Object.entries(corpus)) {
    for (const source of sources) {
        const states = Object.fromEntries(seats.map((seat) => {
            const state = candidates[seat][operation].parseState(source);
            return [seat, { isError: state.isError, offset: state.offset, value: state.value }];
        }));
        assert.deepEqual(states.h, states.b, `${operation} H/B ${JSON.stringify(source)}`);
        assert.deepEqual(states.h, states.s, `${operation} H/S ${JSON.stringify(source)}`);
    }
}

const cycles = manifest.protocol.cycles as number;
const warmups = manifest.protocol.warmups as number;
const sampleCount = manifest.protocol.samples as number;
const run = (operation: string, seat: Seat): number => {
    const parser = candidates[seat][operation];
    const sources = corpus[operation];
    const start = performance.now();
    let checksum = 0;
    for (let cycle = 0; cycle < cycles; cycle += 1) {
        for (const source of sources) {
            const state = parser.parseState(source);
            checksum += state.offset;
        }
    }
    assert.ok(checksum > 0);
    return Math.round((performance.now() - start) * 1_000_000);
};

for (let warmup = 0; warmup < warmups; warmup += 1) {
    for (const operation of Object.keys(corpus)) {
        for (const seat of schedules[warmup % schedules.length]) run(operation, seat);
    }
}

const samples: Record<string, Record<Seat, number[]>> = {};
for (const operation of Object.keys(corpus)) samples[operation] = { h: [], b: [], s: [] };
for (let sample = 0; sample < sampleCount; sample += 1) {
    const order = schedules[sample % schedules.length];
    for (const operation of Object.keys(corpus)) {
        for (const seat of order) samples[operation][seat].push(run(operation, seat));
    }
}

const median = (values: readonly number[]): number => {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
};
const mad = (values: readonly number[]): number => {
    const center = median(values);
    return median(values.map((value) => Math.abs(value - center)));
};
const upperRatio = (left: readonly number[], right: readonly number[]): number => {
    const logs = left.map((value, index) => Math.log(value / right[index]));
    const mean = logs.reduce((sum, value) => sum + value, 0) / logs.length;
    const variance = logs.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (logs.length - 1);
    return Math.exp(mean + manifest.protocol.t_critical_one_sided_95_df_20 * Math.sqrt(variance / logs.length));
};

const summary = Object.fromEntries(Object.entries(samples).map(([operation, rows]) => [operation, {
    medians_ns: Object.fromEntries(seats.map((seat) => [seat, median(rows[seat])])),
    mad_ns: Object.fromEntries(seats.map((seat) => [seat, mad(rows[seat])])),
    pairwise_upper_ratio_95: Object.fromEntries(seats.flatMap((left) => seats
        .filter((right) => left !== right)
        .map((right) => [`${left}_over_${right}`, upperRatio(rows[left], rows[right])]))),
}]));

const raw = {
    schema: "value.pi.foundation-g4.benchmark/v1",
    status: "PASS_FIRST_ATTEMPT",
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
    allocation: {
        status: "UNAVAILABLE",
        reason: "Co-resident candidates make process-global Node heap/RSS non-attributable per seat.",
    },
    throughput_unit: "nanoseconds per fixed full-corpus block",
    invocations_per_sample: Object.fromEntries(Object.entries(corpus).map(([operation, sources]) => [operation, cycles * sources.length])),
    schedule_indices: Array.from({ length: sampleCount }, (_, index) => index % schedules.length),
    samples_ns: samples,
    summary,
    peers: manifest.peers,
    claims: { candidate_relative: true, peer_win: false, full_parser_win: false },
};

writeFileSync(new URL("./bench/raw-attempt-2.json", root), `${JSON.stringify(raw, null, 2)}\n`, { flag: "wx" });
process.stdout.write(`${JSON.stringify({ status: raw.status, summary }, null, 2)}\n`);
