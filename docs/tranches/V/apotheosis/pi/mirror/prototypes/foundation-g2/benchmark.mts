import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";

type State = { isError: boolean; offset: number; value: unknown };
type Candidate = Record<string, { parseState(source: string): State }>;

const entries = {
    h: "./candidates/h/src/index.ts",
    b: "./candidates/b/index.ts",
    s: "./candidates/s/index.ts",
} as const;

const candidates = Object.fromEntries(await Promise.all(
    Object.entries(entries).map(async ([seat, entry]) => [seat, await import(entry) as Candidate]),
)) as Record<keyof typeof entries, Candidate>;

const operations = {
    cssEscape: [String.raw`\61 `, String.raw`\000026`, String.raw`\😀`, "\\"],
    cssIdentifier: ["red", "--glass-slider-track-background", String.raw`r\65 d`, "λx", "a".repeat(256)],
    cssString: ['"hello"', String.raw`"a\41 b"`, "'a\\\nb'", '"unterminated', `"${"a".repeat(256)}"`],
    cssWhitespace: [" ", "\r\n\f\t", " ".repeat(256)],
    cssComment: ["/**/", "/* comment */", "/*unterminated", `/*${"a".repeat(256)}*/`],
    cssSpacing: [" /*a*/ ", "/*a*//*b*/", " /*unterminated", ` ${"/*a*/ ".repeat(32)}`],
} as const;

for (const [operation, sources] of Object.entries(operations)) {
    for (const source of sources) {
        const states = Object.fromEntries(Object.entries(candidates).map(([seat, candidate]) => [
            seat,
            (() => {
                const state = candidate[operation].parseState(source);
                return { isError: state.isError, offset: state.offset, value: state.value };
            })(),
        ]));
        assert.deepEqual(states.h, states.b, `${operation} H/B ${JSON.stringify(source)}`);
        assert.deepEqual(states.h, states.s, `${operation} H/S ${JSON.stringify(source)}`);
    }
}

const seats = ["h", "b", "s"] as const;
const schedules = [
    ["h", "b", "s"], ["h", "s", "b"],
    ["b", "h", "s"], ["b", "s", "h"],
    ["s", "h", "b"], ["s", "b", "h"],
] as const;
const cycles = 2_000;
const warmups = 6;
const samples = 31;

function run(operation: keyof typeof operations, seat: typeof seats[number]): number {
    const parser = candidates[seat][operation];
    const sources = operations[operation];
    const start = performance.now();
    let checksum = 0;
    for (let cycle = 0; cycle < cycles; cycle += 1) {
        for (const source of sources) {
            const state = parser.parseState(source);
            checksum += state.offset;
        }
    }
    assert.ok(checksum > 0);
    return performance.now() - start;
}

for (let warmup = 0; warmup < warmups; warmup += 1) {
    for (const operation of Object.keys(operations) as Array<keyof typeof operations>) {
        for (const seat of schedules[warmup % schedules.length]) run(operation, seat);
    }
}

const raw: Record<string, Record<string, number[]>> = {};
for (const operation of Object.keys(operations) as Array<keyof typeof operations>) {
    raw[operation] = Object.fromEntries(seats.map((seat) => [seat, []]));
}

for (let sample = 0; sample < samples; sample += 1) {
    const schedule = schedules[sample % schedules.length];
    for (const operation of Object.keys(operations) as Array<keyof typeof operations>) {
        for (const seat of schedule) raw[operation][seat].push(run(operation, seat));
    }
}

function median(values: readonly number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
}

const summary = Object.fromEntries(Object.entries(raw).map(([operation, rows]) => {
    const medians = Object.fromEntries(Object.entries(rows).map(([seat, values]) => [seat, median(values)]));
    const fastest = Math.min(...Object.values(medians));
    return [operation, {
        mediansMs: medians,
        ratioToFastest: Object.fromEntries(Object.entries(medians).map(([seat, value]) => [seat, value / fastest])),
    }];
}));

process.stdout.write(`${JSON.stringify({
    status: "DIRECTIONAL_ONLY",
    claim: "candidate-local operation-equivalent comparison; no public/full-parser/peer win",
    cycles,
    warmups,
    samples,
    schedules,
    summary,
    rawMs: raw,
}, null, 2)}\n`);
