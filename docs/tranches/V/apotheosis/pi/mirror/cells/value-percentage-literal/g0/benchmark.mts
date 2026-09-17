import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { cpus, release } from "node:os";
import { fileURLToPath } from "node:url";

import { percentageLiteral as h } from "./candidates/h/index.ts";
import { percentageLiteral as b } from "./candidates/b/index.ts";
import { percentageLiteral as s } from "./candidates/s/index.ts";
import { parseCssScalar as rejected } from "../../../grammar/value.ts";
import { parseCssScalar as live } from "../../../../../../../../../src/css/grammar.ts";

const corpus = [
    "0%", "+12%", "-.5%", "1.25e2%", "-0%", "+.0e-0%",
    "000%", "1E-2%", "100%", "101%", "-1000.125%", "5e-324%",
] as const;

type Lane = "h" | "b" | "s" | "live" | "rejected";
const laneNames: readonly Lane[] = ["h", "b", "s", "live", "rejected"];
const parsers = { h, b, s } as const;

function candidateRun(lane: "h" | "b" | "s", iterations: number): number {
    const parser = parsers[lane];
    let checksum = 0;
    for (let iteration = 0; iteration < iterations; iteration += 1) {
        for (const source of corpus) {
            const state = parser.parseState(source);
            if (state.isError || state.offset !== source.length) throw new Error(`${lane}:${source}`);
            checksum += state.value.number.value + state.offset;
        }
    }
    return checksum;
}

function peerRun(parser: typeof live, lane: "live" | "rejected", iterations: number): number {
    let checksum = 0;
    for (let iteration = 0; iteration < iterations; iteration += 1) {
        for (const source of corpus) {
            const result = parser(source);
            if (!result.ok || result.value.kind !== "scalar"
                || result.value.payload.type !== "number" || result.value.payload.unit !== "%") {
                throw new Error(`${lane}:${source}`);
            }
            checksum += result.value.payload.value + source.length;
        }
    }
    return checksum;
}

function runLane(lane: Lane, iterations: number): number {
    return lane === "live" || lane === "rejected"
        ? peerRun(lane === "live" ? live : rejected, lane, iterations)
        : candidateRun(lane, iterations);
}

function shuffle(seed: number): Lane[] {
    const values = [...laneNames];
    let state = seed >>> 0;
    for (let index = values.length - 1; index > 0; index -= 1) {
        state ^= state << 13;
        state ^= state >>> 17;
        state ^= state << 5;
        const other = (state >>> 0) % (index + 1);
        [values[index], values[other]] = [values[other]!, values[index]!];
    }
    return values;
}

function worker(seed: number): void {
    const warmupIterations = 1_000;
    const sampleIterations = 2_000;
    const blocks = 4;
    const elapsed = Object.fromEntries(laneNames.map((lane) => [lane, [] as number[]])) as Record<Lane, number[]>;
    const checksums = Object.fromEntries(laneNames.map((lane) => [lane, runLane(lane, warmupIterations)])) as Record<Lane, number>;

    for (let block = 0; block < blocks; block += 1) {
        for (const lane of shuffle(seed + block * 0x9e3779b9)) {
            const started = process.hrtime.bigint();
            const checksum = runLane(lane, sampleIterations);
            const ended = process.hrtime.bigint();
            const expected = checksums[lane] * (sampleIterations / warmupIterations);
            if (Math.abs(checksum - expected) > Math.max(1, Math.abs(expected)) * 1e-12) {
                throw new Error(`checksum:${lane}`);
            }
            elapsed[lane].push(Number(ended - started));
        }
    }

    console.log(JSON.stringify({ seed, elapsed, operationsPerBlock: sampleIterations * corpus.length }));
}

function inference(values: readonly number[]): { meanLog: number; sd: number; upperLog: number; ratio: number; upperRatio: number } {
    const meanLog = values.reduce((sum, value) => sum + value, 0) / values.length;
    const variance = values.reduce((sum, value) => sum + (value - meanLog) ** 2, 0) / (values.length - 1);
    const sd = Math.sqrt(variance);
    const upperLog = meanLog + 1.729 * sd / Math.sqrt(values.length);
    return { meanLog, sd, upperLog, ratio: Math.exp(meanLog), upperRatio: Math.exp(upperLog) };
}

function controller(): void {
    const replicates = 20;
    const script = fileURLToPath(import.meta.url);
    const rows: Array<{ seed: number; elapsed: Record<Lane, number[]>; operationsPerBlock: number }> = [];

    for (let replicate = 0; replicate < replicates; replicate += 1) {
        const seed = (0x51f15e + replicate * 0x9e3779b9) >>> 0;
        const child = spawnSync(process.execPath, [...process.execArgv, script, "--worker", String(seed)], {
            cwd: process.cwd(),
            encoding: "utf8",
            timeout: 30_000,
            maxBuffer: 1_000_000,
        });
        if (child.status !== 0) throw new Error(`worker ${replicate}: ${child.stderr}`);
        rows.push(JSON.parse(child.stdout.trim()));
    }

    const comparisons = {} as Record<string, ReturnType<typeof inference>>;
    for (const candidate of ["h", "b", "s"] as const) {
        for (const peer of ["live", "rejected"] as const) {
            comparisons[`${candidate}_over_${peer}`] = inference(rows.map((row) => {
                const candidateMean = row.elapsed[candidate].reduce((a, value) => a + value, 0) / row.elapsed[candidate].length;
                const peerMean = row.elapsed[peer].reduce((a, value) => a + value, 0) / row.elapsed[peer].length;
                return Math.log(candidateMean / peerMean);
            }));
        }
    }
    comparisons.h_over_b = inference(rows.map((row) => Math.log(
        row.elapsed.h.reduce((a, value) => a + value, 0)
        / row.elapsed.b.reduce((a, value) => a + value, 0),
    )));
    comparisons.h_over_s = inference(rows.map((row) => Math.log(
        row.elapsed.h.reduce((a, value) => a + value, 0)
        / row.elapsed.s.reduce((a, value) => a + value, 0),
    )));
    comparisons.b_over_h = inference(rows.map((row) => Math.log(
        row.elapsed.b.reduce((a, value) => a + value, 0)
        / row.elapsed.h.reduce((a, value) => a + value, 0),
    )));
    comparisons.b_over_s = inference(rows.map((row) => Math.log(
        row.elapsed.b.reduce((a, value) => a + value, 0)
        / row.elapsed.s.reduce((a, value) => a + value, 0),
    )));

    const result = {
        schema: "value.pi.percentage-literal.benchmark/v1",
        executedAt: new Date().toISOString(),
        environment: {
            node: process.version,
            v8: process.versions.v8,
            platform: process.platform,
            arch: process.arch,
            release: release(),
            cpu: cpus()[0]?.model ?? "unknown",
            logicalCpus: cpus().length,
        },
        corpus,
        protocol: { replicates, blocksPerReplicate: 4, operationsPerBlock: rows[0]?.operationsPerBlock, oneSidedTCriticalDf19: 1.729 },
        comparisons,
        rows,
    };
    const serialized = `${JSON.stringify(result, null, 2)}\n`;
    if (process.argv[2] === "--output") {
        const outputPath = process.argv[3];
        if (outputPath === undefined) throw new Error("missing output path");
        writeFileSync(outputPath, serialized, { flag: "wx" });
        console.log(JSON.stringify({ outputPath, comparisons }, null, 2));
    } else {
        console.log(serialized);
    }
}

if (process.argv[2] === "--worker") worker(Number(process.argv[3]));
else controller();
