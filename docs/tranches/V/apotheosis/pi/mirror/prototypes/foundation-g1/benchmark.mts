import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import os from "node:os";
import { pathToFileURL } from "node:url";

type State = { isError: boolean; offset: number; value: unknown };
type Parser = { parseState(input: string): State };
type Feature = keyof typeof corpora;
type Lane = `${"g1" | "g0"}-${"h" | "b" | "s"}`;

const corpora = {
    cssEscape: ["\\61 ", "\\000061", "\\1f600", "\\?", "\\0", "\\110000", "\\"],
    cssIdentifier: ["foo", "--custom-name", "-\\78", "p\\78", "😀wide", "\\31 23", "\0name", "\u00b7name", "\ufeffname"],
    cssString: ["\"plain\"", "'single'", "\"a\\26 b\"", "\"a\\\nb\"", "\"unterminated", "\"\0x\""],
    cssTrivia: ["", " \t\n", "/**/", "/* open", " \t/* one *//* two */\r\n"],
    cssPercentage: ["0%", "12%", "+.5%", "-1e2%", "6.022e23%", "1%%"],
    cssDimension: ["0px", "12PX", "-1.5e2rem", "1p\\78", "1foo", "1--x", "1\\", "2dppx!"],
} as const;

const featureNames = Object.keys(corpora) as Feature[];
const lanes = ["g1-h", "g1-b", "g1-s", "g0-h", "g0-b", "g0-s"] as const;
const parsers = {} as Record<Lane, Record<Feature, Parser>>;
for (const lane of lanes) {
    const [generation, seat] = lane.split("-") as ["g1" | "g0", "h" | "b" | "s"];
    const path = new URL(`../foundation-${generation}/candidates/${seat}/index.ts`, import.meta.url).pathname;
    parsers[lane] = await import(pathToFileURL(path).href) as Record<Feature, Parser>;
}

function authoritative(feature: Feature, state: State): string {
    return JSON.stringify([
        state.isError,
        state.offset,
        feature === "cssTrivia" ? typeof state.value : state.value,
    ]);
}

for (const feature of featureNames) {
    for (const input of corpora[feature]) {
        const reference = authoritative(feature, parsers["g1-h"][feature].parseState(input));
        assert.equal(JSON.parse(reference)[0], false, `${feature} is not a success: ${JSON.stringify(input)}`);
        for (const lane of lanes.slice(1)) {
            assert.equal(
                authoritative(feature, parsers[lane][feature].parseState(input)),
                reference,
                `${lane} differs for ${feature}: ${JSON.stringify(input)}`,
            );
        }
    }
}

const warmups = 4;
const samples = 21;
const cycles = 3_000;
const schedules: readonly (readonly Lane[])[] = [
    lanes,
    ["g0-s", "g0-b", "g0-h", "g1-s", "g1-b", "g1-h"],
    ["g1-b", "g0-h", "g1-s", "g0-b", "g1-h", "g0-s"],
];
let sink = 0;

function run(lane: Lane, feature: Feature): number {
    const parser = parsers[lane][feature];
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

for (let warmup = 0; warmup < warmups; warmup += 1) {
    for (const feature of featureNames) for (const lane of schedules[warmup % schedules.length]!) run(lane, feature);
}

const raw = Object.fromEntries(featureNames.map((feature) => [
    feature,
    Object.fromEntries(lanes.map((lane) => [lane, [] as number[]])),
])) as Record<Feature, Record<Lane, number[]>>;
const checksums = Object.fromEntries(featureNames.map((feature) => [
    feature,
    Object.fromEntries(lanes.map((lane) => [lane, 0])),
])) as Record<Feature, Record<Lane, number>>;

for (let sample = 0; sample < samples; sample += 1) {
    for (const feature of featureNames) {
        for (const lane of schedules[sample % schedules.length]!) {
            const started = process.hrtime.bigint();
            checksums[feature][lane] = run(lane, feature);
            raw[feature][lane].push(Number(process.hrtime.bigint() - started) / (cycles * corpora[feature].length));
        }
    }
}

const median = (values: readonly number[]): number => {
    const sorted = [...values].sort((left, right) => left - right);
    return sorted[Math.floor(sorted.length / 2)]!;
};

const results = Object.fromEntries(featureNames.map((feature) => {
    const medians = Object.fromEntries(lanes.map((lane) => [lane, median(raw[feature][lane])])) as Record<Lane, number>;
    return [feature, {
        common_inputs: corpora[feature].length,
        operations_per_sample: cycles * corpora[feature].length,
        medians_ns_per_parse: Object.fromEntries(lanes.map((lane) => [lane, Number(medians[lane].toFixed(2))])),
        g1_to_own_g0_ratio: {
            h: Number((medians["g1-h"] / medians["g0-h"]).toFixed(4)),
            b: Number((medians["g1-b"] / medians["g0-b"]).toFixed(4)),
            s: Number((medians["g1-s"] / medians["g0-s"]).toFixed(4)),
        },
        checksums: checksums[feature],
        samples_ns_per_parse: Object.fromEntries(lanes.map((lane) => [
            lane,
            raw[feature][lane].map((value) => Number(value.toFixed(2))),
        ])),
    }];
}));

process.stdout.write(`${JSON.stringify({
    schema: "value.pi.foundation-g1.continuous-benchmark/v1",
    subject_sha256: "687ac4941ab73f79fdf7abd21d997262a1c66ca15c51d04e2505d9c895631764",
    corpus_sha256: createHash("sha256").update(JSON.stringify(corpora)).digest("hex"),
    scope: "successful operation-equivalent common domain; G1 candidates versus their G0 direct-parser lineages; no LIVE public-door or full-parser claim",
    environment: {
        node: process.version,
        v8: process.versions.v8,
        platform: process.platform,
        arch: process.arch,
        cpu: os.cpus()[0]?.model ?? "unknown",
        logical_cpus: os.cpus().length,
    },
    method: { warmups, samples, cycles, schedules, import_and_construction_excluded: true },
    corpora,
    results,
    sink,
}, null, 2)}\n`);
