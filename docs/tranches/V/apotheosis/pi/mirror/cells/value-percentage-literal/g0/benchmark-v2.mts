import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { cpus, release } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { percentageLiteral as h } from "./candidates/h/index.ts";
import { percentageLiteral as b } from "./candidates/b/index.ts";
import { percentageLiteral as s } from "./candidates/s/index.ts";
import { liveRegexPercentage, priorPercentageParser } from "./benchmark-peers.ts";

type Lane = "b" | "h" | "s" | "live-regex" | "prior-parser";
type CssPercentage = ReturnType<typeof liveRegexPercentage>;
type Manifest = {
    schema: string;
    files: Array<{ path: string; sha256: string }>;
    corpus: string[];
    protocol: {
        replicates: number;
        blocksPerReplicate: number;
        warmupIterations: number;
        sampleIterations: number;
        tCriticalOneSided95Df19: number;
        comparisons: Array<[Lane, Lane]>;
    };
};

const laneNames: readonly Lane[] = ["b", "h", "s", "live-regex", "prior-parser"];
const parsers = { b, h, s } as const;

function sha256(bytes: string | Buffer): string {
    return createHash("sha256").update(bytes).digest("hex");
}

function candidateParse(lane: "b" | "h" | "s", source: string): CssPercentage {
    const state = parsers[lane].parseState(source);
    return state.isError || state.offset !== source.length ? null : state.value;
}

function parse(lane: Lane, source: string): CssPercentage {
    return lane === "live-regex" ? liveRegexPercentage(source)
        : lane === "prior-parser" ? priorPercentageParser(source)
            : candidateParse(lane, source);
}

function representationType(source: string): "integer" | "number" {
    const representation = source.slice(0, -1);
    return representation.includes(".") || /e/i.test(representation) ? "number" : "integer";
}

function validate(lane: Lane, corpus: readonly string[]): string {
    const rows = corpus.map((source) => {
        const value = parse(lane, source);
        if (value === null || value.kind !== "percentage"
            || value.number.sign !== (source[0] === "+" ? "+" : source[0] === "-" ? "-" : null)
            || value.number.type !== representationType(source)
            || !Object.is(value.number.value, Number(source.slice(0, -1)))) {
            throw new Error(`semantic mismatch: ${lane}:${source}`);
        }
        return [source, value.number.sign, value.number.type,
            Object.is(value.number.value, -0) ? "-0" : value.number.value];
    });
    return sha256(JSON.stringify(rows));
}

function run(lane: Lane, corpus: readonly string[], iterations: number): number {
    let checksum = 0;
    for (let iteration = 0; iteration < iterations; iteration += 1) {
        for (const source of corpus) {
            const value = parse(lane, source);
            if (value === null) throw new Error(`timed failure: ${lane}:${source}`);
            checksum += value.number.value + source.length;
        }
    }
    return checksum;
}

function schedule(replicate: number, block: number): Lane[] {
    const shift = (replicate + block) % laneNames.length;
    return [...laneNames.slice(shift), ...laneNames.slice(0, shift)];
}

function validateManifest(manifestPath: string): { manifest: Manifest; manifestSha256: string } {
    const bytes = readFileSync(manifestPath);
    const manifest = JSON.parse(bytes.toString()) as Manifest;
    for (const file of manifest.files) {
        const actual = sha256(readFileSync(resolve(file.path)));
        if (actual !== file.sha256) throw new Error(`file hash mismatch: ${file.path}`);
    }
    return { manifest, manifestSha256: sha256(bytes) };
}

function worker(manifestPath: string, replicate: number): void {
    const { manifest, manifestSha256 } = validateManifest(manifestPath);
    const checksums = Object.fromEntries(laneNames.map((lane) => [lane, validate(lane, manifest.corpus)])) as Record<Lane, string>;
    if (new Set(Object.values(checksums)).size !== 1) throw new Error("normalized transcript mismatch");

    const warmup = Object.fromEntries(laneNames.map((lane) => [lane,
        run(lane, manifest.corpus, manifest.protocol.warmupIterations)])) as Record<Lane, number>;
    const elapsed = Object.fromEntries(laneNames.map((lane) => [lane, [] as number[]])) as Record<Lane, number[]>;
    const orders: Lane[][] = [];
    const timedChecksums = Object.fromEntries(laneNames.map((lane) => [lane, [] as number[]])) as Record<Lane, number[]>;

    for (let block = 0; block < manifest.protocol.blocksPerReplicate; block += 1) {
        const order = schedule(replicate, block);
        orders.push(order);
        for (const lane of order) {
            const started = process.hrtime.bigint();
            const checksum = run(lane, manifest.corpus, manifest.protocol.sampleIterations);
            const ended = process.hrtime.bigint();
            const expected = warmup[lane] * (manifest.protocol.sampleIterations / manifest.protocol.warmupIterations);
            if (Math.abs(checksum - expected) > Math.max(1, Math.abs(expected)) * 1e-12) {
                throw new Error(`checksum mismatch: ${lane}`);
            }
            elapsed[lane].push(Number(ended - started));
            timedChecksums[lane].push(checksum);
        }
    }

    console.log(JSON.stringify({
        event: "worker",
        manifestSha256,
        replicate,
        pid: process.pid,
        node: process.version,
        v8: process.versions.v8,
        orders,
        normalizedTranscriptSha256: Object.values(checksums)[0],
        elapsedNs: elapsed,
        timedChecksums,
        operationsPerBlock: manifest.protocol.sampleIterations * manifest.corpus.length,
    }));
}

function median(values: readonly number[]): number {
    const ordered = [...values].sort((left, right) => left - right);
    const middle = Math.floor(ordered.length / 2);
    return ordered.length % 2 === 0 ? (ordered[middle - 1]! + ordered[middle]!) / 2 : ordered[middle]!;
}

function summarize(values: readonly number[], tCritical: number) {
    const meanLog = values.reduce((sum, value) => sum + value, 0) / values.length;
    const variance = values.reduce((sum, value) => sum + (value - meanLog) ** 2, 0) / (values.length - 1);
    const sd = Math.sqrt(variance);
    const upperLog = meanLog + tCritical * sd / Math.sqrt(values.length);
    const center = median(values);
    return {
        n: values.length,
        meanLog,
        sampleSdLog: sd,
        medianLog: center,
        madLog: median(values.map((value) => Math.abs(value - center))),
        oneSided95UpperLog: upperLog,
        geometricMeanRatio: Math.exp(meanLog),
        oneSided95UpperRatio: Math.exp(upperLog),
        strictWin: upperLog < 0,
    };
}

function controller(manifestPath: string, outputPath: string): void {
    const { manifest, manifestSha256 } = validateManifest(manifestPath);
    const script = fileURLToPath(import.meta.url);
    const workers = [];

    for (let replicate = 0; replicate < manifest.protocol.replicates; replicate += 1) {
        const child = spawnSync(process.execPath,
            [...process.execArgv, script, "--worker", manifestPath, String(replicate)], {
                cwd: process.cwd(),
                encoding: "utf8",
                timeout: 30_000,
                maxBuffer: 1_000_000,
            });
        if (child.status !== 0) throw new Error(`worker ${replicate}: ${child.stderr}`);
        workers.push({
            ...JSON.parse(child.stdout.trim()),
            exitCode: child.status,
            signal: child.signal,
            stderrBytes: Buffer.byteLength(child.stderr),
            stderrSha256: sha256(child.stderr),
        });
    }

    const comparisons = Object.fromEntries(manifest.protocol.comparisons.map(([candidate, peer]) => {
        const logs = workers.map((row) => {
            const candidateMean = row.elapsedNs[candidate].reduce((sum: number, value: number) => sum + value, 0)
                / row.elapsedNs[candidate].length;
            const peerMean = row.elapsedNs[peer].reduce((sum: number, value: number) => sum + value, 0)
                / row.elapsedNs[peer].length;
            return Math.log(candidateMean / peerMean);
        });
        return [`${candidate}_over_${peer}`, { logs, ...summarize(logs, manifest.protocol.tCriticalOneSided95Df19) }];
    }));

    const result = {
        schema: "value.pi.percentage-literal.benchmark/v2",
        status: Object.values(comparisons).every((value: any) => value.strictWin) ? "PASS" : "FAIL",
        executedAt: new Date().toISOString(),
        manifestPath,
        manifestSha256,
        controller: { pid: process.pid, argv: process.argv, execArgv: process.execArgv },
        environment: {
            node: process.version,
            v8: process.versions.v8,
            platform: process.platform,
            arch: process.arch,
            release: release(),
            cpu: cpus()[0]?.model ?? "unknown",
            logicalCpus: cpus().length,
            allocation: "UNAVAILABLE: no stable per-operation allocator instrumentation in Node/V8",
        },
        protocol: manifest.protocol,
        comparisons,
        workers,
    };
    writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
    console.log(JSON.stringify({ outputPath, status: result.status, comparisons }, null, 2));
}

if (process.argv[2] === "--worker") worker(resolve(process.argv[3]!), Number(process.argv[4]));
else {
    const manifestPath = process.argv[2];
    const outputPath = process.argv[3];
    if (manifestPath === undefined || outputPath === undefined) {
        throw new Error("usage: tsx benchmark-v2.mts <manifest> <output>");
    }
    controller(resolve(manifestPath), resolve(outputPath));
}
