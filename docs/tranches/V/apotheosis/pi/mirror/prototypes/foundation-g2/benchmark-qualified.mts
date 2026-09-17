import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

type State = { isError: boolean; offset: number; value: unknown };
type Candidate = Record<string, { parseState(source: string): State }>;
type Seat = "h" | "b" | "s";

const root = new URL("./", import.meta.url);
const manifest = JSON.parse(readFileSync(new URL("./benchmark-manifest.json", root), "utf8"));
const corpus = JSON.parse(readFileSync(new URL("./benchmark-corpus.json", root), "utf8")) as Record<string, string[]>;
const subjectBytes = readFileSync(new URL("./SUBJECT.json", root));
const corpusBytes = readFileSync(new URL("./benchmark-corpus.json", root));
const sha256 = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");

assert.equal(sha256(subjectBytes), manifest.bindings.subject_sha256);
assert.equal(sha256(corpusBytes), manifest.bindings.corpus_sha256);

const entries = {
    h: "./candidates/h/src/index.ts",
    b: "./candidates/b/index.ts",
    s: "./candidates/s/index.ts",
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
    return (performance.now() - start) * 1_000_000;
};

for (let warmup = 0; warmup < warmups; warmup += 1) {
    for (const operation of Object.keys(corpus)) {
        for (const seat of schedules[warmup % schedules.length]) run(operation, seat);
    }
}

const samples: Record<string, Record<Seat, number[]>> = {};
for (const operation of Object.keys(corpus)) {
    samples[operation] = { h: [], b: [], s: [] };
}
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
const oneSidedUpperRatio = (left: readonly number[], right: readonly number[]): number => {
    assert.equal(left.length, right.length);
    const logs = left.map((value, index) => Math.log(value / right[index]));
    const mean = logs.reduce((sum, value) => sum + value, 0) / logs.length;
    const variance = logs.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (logs.length - 1);
    const upper = mean + manifest.protocol.t_critical_one_sided_95_df_30 * Math.sqrt(variance / logs.length);
    return Math.exp(upper);
};

const summary = Object.fromEntries(Object.entries(samples).map(([operation, rows]) => {
    const medians = Object.fromEntries(seats.map((seat) => [seat, median(rows[seat])]));
    const dispersionMad = Object.fromEntries(seats.map((seat) => [seat, mad(rows[seat])]));
    const pairwiseUpper95 = Object.fromEntries(seats.flatMap((left) => seats
        .filter((right) => left !== right)
        .map((right) => [`${left}_over_${right}`, oneSidedUpperRatio(rows[left], rows[right])])));
    return [operation, { medians_ns: medians, mad_ns: dispersionMad, pairwise_upper_ratio_95: pairwiseUpper95 }];
}));

process.stdout.write(`${JSON.stringify({
    schema: "value.pi.foundation-g2.qualified-benchmark-raw/v1",
    status: "PASS_FIRST_QUALIFIED_ATTEMPT",
    manifest_sha256: sha256(readFileSync(new URL("./benchmark-manifest.json", root))),
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
        reason: "Node exposes only process-wide heap/RSS while all three immutable candidates are co-resident; per-candidate attribution would require a different predeclared child-process experiment.",
    },
    throughput_unit: "nanoseconds per fixed full-corpus block",
    invocations_per_sample: Object.fromEntries(Object.entries(corpus).map(([operation, sources]) => [operation, cycles * sources.length])),
    schedule_indices: Array.from({ length: sampleCount }, (_, index) => index % schedules.length),
    samples_ns: samples,
    summary,
    peer_dispositions: manifest.peers,
    claims: {
        candidate_relative: true,
        live_regex_win: false,
        historical_win: false,
        c14_win: false,
        full_parser_win: false,
    },
}, null, 2)}\n`);
