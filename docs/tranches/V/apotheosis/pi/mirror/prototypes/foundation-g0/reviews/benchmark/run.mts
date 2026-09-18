import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import os from "node:os";
import { pathToFileURL } from "node:url";

type State = {
    isError: boolean;
    offset: number;
    value: unknown;
};

type Parser = {
    parseState(input: string): State;
};

type Candidate = Record<Feature, Parser>;
type Feature = keyof typeof corpora;
type Seat = "h" | "b" | "s";

const corpora = {
    cssEscape: ["\\61 ", "\\000061", "\\1f600", "\\?", "\\0", "\\110000", "\\"],
    cssIdentifier: ["foo", "--custom-name", "-\\78", "p\\78", "😀wide", "\\31 23", "\0name"],
    cssString: ["\"plain\"", "'single'", "\"a\\26 b\"", "\"a\\\nb\"", "\"unterminated", "\"\0x\""],
    cssTrivia: ["", " \t\n", "/**/", "/* open", " \t/* one *//* two */\r\n"],
    cssPercentage: ["0%", "12%", "+.5%", "-1e2%", "6.022e23%", "1%%"],
    cssDimension: ["0px", "12PX", "-1.5e2rem", "1p\\78", "1foo", "1--x", "1\\", "2dppx!"],
} as const;

const root = new URL("../../", import.meta.url);
const candidates = {} as Record<Seat, Candidate>;
for (const seat of ["h", "b", "s"] as const) {
    candidates[seat] = await import(pathToFileURL(new URL(`candidates/${seat}/index.ts`, root).pathname).href) as Candidate;
}

function signature(feature: Feature, state: State): string {
    return JSON.stringify([
        state.isError,
        state.offset,
        feature === "cssTrivia" ? typeof state.value : state.value,
    ]);
}

const commonCorpusSha256 = createHash("sha256")
    .update(JSON.stringify(corpora))
    .digest("hex");

for (const [feature, inputs] of Object.entries(corpora) as Array<[Feature, readonly string[]]>) {
    for (const input of inputs) {
        const signatures = (["h", "b", "s"] as const).map((seat) =>
            signature(feature, candidates[seat][feature].parseState(input)),
        );
        assert.equal(signatures[1], signatures[0], `${feature} differs on ${JSON.stringify(input)}: B`);
        assert.equal(signatures[2], signatures[0], `${feature} differs on ${JSON.stringify(input)}: S`);
        assert.equal(JSON.parse(signatures[0]!)[0], false, `${feature} input is not a shared success`);
    }
}

const warmupRounds = 4;
const samples = 25;
const cyclesPerSample = 4_000;
const schedule: readonly (readonly Seat[])[] = [
    ["h", "b", "s"],
    ["b", "s", "h"],
    ["s", "h", "b"],
];

let sink = 0;

function run(seat: Seat, feature: Feature, cycles: number): number {
    const parser = candidates[seat][feature];
    const inputs = corpora[feature];
    let checksum = 0;
    for (let cycle = 0; cycle < cycles; cycle += 1) {
        for (const input of inputs) {
            const state = parser.parseState(input);
            checksum = (checksum + state.offset + JSON.stringify(state.value).length) >>> 0;
        }
    }
    sink = (sink ^ checksum) >>> 0;
    return checksum;
}

const features = Object.keys(corpora) as Feature[];
for (let warmup = 0; warmup < warmupRounds; warmup += 1) {
    for (const feature of features) {
        for (const seat of schedule[warmup % schedule.length]!) run(seat, feature, cyclesPerSample);
    }
}

const raw = Object.fromEntries(features.map((feature) => [
    feature,
    { h: [] as number[], b: [] as number[], s: [] as number[] },
])) as Record<Feature, Record<Seat, number[]>>;
const checksums = Object.fromEntries(features.map((feature) => [
    feature,
    { h: 0, b: 0, s: 0 },
])) as Record<Feature, Record<Seat, number>>;

for (let sample = 0; sample < samples; sample += 1) {
    for (const feature of features) {
        for (const seat of schedule[sample % schedule.length]!) {
            const started = process.hrtime.bigint();
            checksums[feature][seat] = run(seat, feature, cyclesPerSample);
            const elapsed = Number(process.hrtime.bigint() - started);
            raw[feature][seat].push(elapsed / (cyclesPerSample * corpora[feature].length));
        }
    }
}

function quantile(values: readonly number[], position: number): number {
    const sorted = [...values].sort((left, right) => left - right);
    const index = (sorted.length - 1) * position;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) return sorted[lower]!;
    return sorted[lower]! + (sorted[upper]! - sorted[lower]!) * (index - lower);
}

const results = Object.fromEntries(features.map((feature) => {
    const seats = Object.fromEntries((["h", "b", "s"] as const).map((seat) => {
        const values = raw[feature][seat];
        const median = quantile(values, 0.5);
        const q1 = quantile(values, 0.25);
        const q3 = quantile(values, 0.75);
        return [seat, {
            median_ns_per_parse: Number(median.toFixed(2)),
            q1_ns_per_parse: Number(q1.toFixed(2)),
            q3_ns_per_parse: Number(q3.toFixed(2)),
            iqr_ns_per_parse: Number((q3 - q1).toFixed(2)),
            checksum: checksums[feature][seat],
            samples_ns_per_parse: values.map((value) => Number(value.toFixed(2))),
        }];
    }));
    const medians = Object.fromEntries(Object.entries(seats).map(([seat, value]) =>
        [seat, (value as { median_ns_per_parse: number }).median_ns_per_parse],
    )) as Record<Seat, number>;
    return [feature, {
        operations_per_sample: cyclesPerSample * corpora[feature].length,
        seats,
        ratios_to_fastest: Object.fromEntries((["h", "b", "s"] as const).map((seat) =>
            [seat, Number((medians[seat] / Math.min(...Object.values(medians))).toFixed(4))],
        )),
    }];
}));

process.stdout.write(`${JSON.stringify({
    schema: "value.pi.foundation.benchmark-review/v1",
    subject_sha256: "22ec8f1270f3ffa5b75ed8be85c43069e62f71d383d43be12ba29821b8f4b207",
    common_corpus_sha256: commonCorpusSha256,
    environment: {
        node: process.version,
        platform: process.platform,
        arch: process.arch,
        cpu: os.cpus()[0]?.model ?? "unknown",
        logical_cpus: os.cpus().length,
    },
    method: {
        warmup_rounds: warmupRounds,
        samples,
        cycles_per_sample: cyclesPerSample,
        schedule,
        clock: "process.hrtime.bigint",
        import_and_construction_excluded: true,
        successful_common_inputs_only: true,
    },
    corpus: corpora,
    results,
    sink,
}, null, 2)}\n`);
