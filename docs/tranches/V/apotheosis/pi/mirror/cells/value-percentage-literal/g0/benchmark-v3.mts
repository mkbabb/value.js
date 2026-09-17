import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { cpus, release } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { percentageLiteral } from "./candidates/h2/index.ts";
import { priorPercentageParser } from "./benchmark-peers.ts";
import { parseCssScalar as rejectedPublic } from "../../../grammar/value.ts";
import { parseCssScalar as livePublic } from "../../../../../../../../../src/css/grammar.ts";

type Lane = "h2-public" | "live-public" | "rejected-public" | "h2-internal" | "prior-internal";
type Manifest = {
    files: Array<{ path: string; sha256: string }>;
    trees: Array<{ root: string; ledgerSha256: string }>;
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

const percentageDocument = percentageLiteral.eof();
const laneNames: readonly Lane[] = ["h2-public", "live-public", "rejected-public", "h2-internal", "prior-internal"];
const emptyDiagnostics = Object.freeze([]) as readonly [];

function sha256(bytes: string | Buffer): string {
    return createHash("sha256").update(bytes).digest("hex");
}

function h2Public(source: string) {
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
    if (lane === "h2-internal") {
        const state = percentageLiteral.parseState(source);
        return state.isError || state.offset !== source.length ? null : state.value.number.value;
    }
    if (lane === "prior-internal") return priorPercentageParser(source)?.number.value ?? null;
    const result = lane === "h2-public" ? h2Public(source)
        : lane === "live-public" ? livePublic(source)
            : rejectedPublic(source);
    return result?.ok === true && result.value.kind === "scalar"
        && result.value.payload.type === "number" && result.value.payload.unit === "%"
        ? result.value.payload.value : null;
}

function validate(lane: Lane, corpus: readonly string[]): string {
    const transcript = corpus.map((source) => {
        const actual = parseValue(lane, source);
        const expected = Number(source.slice(0, -1));
        if (actual === null || !Object.is(actual, expected)) throw new Error(`semantic mismatch: ${lane}:${source}`);
        return [source, Object.is(actual, -0) ? "-0" : actual];
    });
    return sha256(JSON.stringify(transcript));
}

function run(lane: Lane, corpus: readonly string[], iterations: number): number {
    let checksum = 0;
    for (let iteration = 0; iteration < iterations; iteration += 1) {
        for (const source of corpus) {
            const value = parseValue(lane, source);
            if (value === null) throw new Error(`timed failure: ${lane}:${source}`);
            checksum += value + source.length;
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
        if (sha256(readFileSync(resolve(file.path))) !== file.sha256) throw new Error(`file hash mismatch: ${file.path}`);
    }
    for (const tree of manifest.trees) {
        const root = resolve(tree.root);
        const paths: string[] = [];
        const visit = (directory: string) => {
            for (const name of readdirSync(directory).sort()) {
                const path = resolve(directory, name);
                if (statSync(path).isDirectory()) visit(path);
                else paths.push(path);
            }
        };
        visit(root);
        const ledger = paths.map((path) => `${sha256(readFileSync(path))}  ${path.slice(root.length + 1)}\n`).join("");
        if (sha256(ledger) !== tree.ledgerSha256) throw new Error(`tree hash mismatch: ${tree.root}`);
    }
    return { manifest, manifestSha256: sha256(bytes) };
}

function worker(manifestPath: string, replicate: number): void {
    const { manifest, manifestSha256 } = validateManifest(manifestPath);
    const transcripts = Object.fromEntries(laneNames.map((lane) => [lane, validate(lane, manifest.corpus)])) as Record<Lane, string>;
    if (new Set(Object.values(transcripts)).size !== 1) throw new Error("normalized transcript mismatch");
    const warmup = Object.fromEntries(laneNames.map((lane) => [lane,
        run(lane, manifest.corpus, manifest.protocol.warmupIterations)])) as Record<Lane, number>;
    const elapsed = Object.fromEntries(laneNames.map((lane) => [lane, [] as number[]])) as Record<Lane, number[]>;
    const timedChecksums = Object.fromEntries(laneNames.map((lane) => [lane, [] as number[]])) as Record<Lane, number[]>;
    const orders: Lane[][] = [];

    for (let block = 0; block < manifest.protocol.blocksPerReplicate; block += 1) {
        const order = schedule(replicate, block);
        orders.push(order);
        for (const lane of order) {
            const started = process.hrtime.bigint();
            const checksum = run(lane, manifest.corpus, manifest.protocol.sampleIterations);
            const ended = process.hrtime.bigint();
            const expected = warmup[lane] * (manifest.protocol.sampleIterations / manifest.protocol.warmupIterations);
            if (Math.abs(checksum - expected) > Math.max(1, Math.abs(expected)) * 1e-12) throw new Error(`checksum:${lane}`);
            elapsed[lane].push(Number(ended - started));
            timedChecksums[lane].push(checksum);
        }
    }
    console.log(JSON.stringify({
        event: "worker", manifestSha256, replicate, pid: process.pid,
        node: process.version, v8: process.versions.v8, orders,
        normalizedTranscriptSha256: Object.values(transcripts)[0],
        elapsedNs: elapsed, timedChecksums,
        operationsPerBlock: manifest.protocol.sampleIterations * manifest.corpus.length,
    }));
}

function median(values: readonly number[]): number {
    const ordered = [...values].sort((left, right) => left - right);
    const middle = Math.floor(ordered.length / 2);
    return ordered.length % 2 === 0 ? (ordered[middle - 1]! + ordered[middle]!) / 2 : ordered[middle]!;
}

function summary(values: readonly number[], tCritical: number) {
    const meanLog = values.reduce((sum, value) => sum + value, 0) / values.length;
    const sampleSdLog = Math.sqrt(values.reduce((sum, value) => sum + (value - meanLog) ** 2, 0) / (values.length - 1));
    const oneSided95UpperLog = meanLog + tCritical * sampleSdLog / Math.sqrt(values.length);
    const medianLog = median(values);
    return {
        n: values.length, meanLog, sampleSdLog, medianLog,
        madLog: median(values.map((value) => Math.abs(value - medianLog))),
        oneSided95UpperLog,
        geometricMeanRatio: Math.exp(meanLog),
        oneSided95UpperRatio: Math.exp(oneSided95UpperLog),
        strictWin: oneSided95UpperLog < 0,
    };
}

function controller(manifestPath: string, outputPath: string): void {
    const { manifest, manifestSha256 } = validateManifest(manifestPath);
    const script = fileURLToPath(import.meta.url);
    const workers = [];
    for (let replicate = 0; replicate < manifest.protocol.replicates; replicate += 1) {
        const child = spawnSync(process.execPath,
            [...process.execArgv, script, "--worker", manifestPath, String(replicate)], {
                cwd: process.cwd(), encoding: "utf8", timeout: 30_000, maxBuffer: 1_000_000,
            });
        if (child.status !== 0) throw new Error(`worker ${replicate}: ${child.stderr}`);
        workers.push({ ...JSON.parse(child.stdout.trim()), exitCode: child.status, signal: child.signal,
            stderrBytes: Buffer.byteLength(child.stderr), stderrSha256: sha256(child.stderr) });
    }
    const comparisons = Object.fromEntries(manifest.protocol.comparisons.map(([candidate, peer]) => {
        const logs = workers.map((row) => Math.log(
            row.elapsedNs[candidate].reduce((sum: number, value: number) => sum + value, 0)
            / row.elapsedNs[peer].reduce((sum: number, value: number) => sum + value, 0),
        ));
        return [`${candidate}_over_${peer}`, { logs, ...summary(logs, manifest.protocol.tCriticalOneSided95Df19) }];
    }));
    const result = {
        schema: "value.pi.percentage-literal.benchmark/v3",
        status: Object.values(comparisons).every((value: any) => value.strictWin) ? "PASS" : "FAIL",
        executedAt: new Date().toISOString(), manifestPath, manifestSha256,
        controller: { pid: process.pid, argv: process.argv, execArgv: process.execArgv },
        environment: { node: process.version, v8: process.versions.v8, platform: process.platform,
            arch: process.arch, release: release(), cpu: cpus()[0]?.model ?? "unknown", logicalCpus: cpus().length,
            allocation: "UNAVAILABLE: no stable per-operation allocator instrumentation in Node/V8" },
        protocol: manifest.protocol, comparisons, workers,
    };
    writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
    console.log(JSON.stringify({ outputPath, status: result.status, comparisons }, null, 2));
}

if (process.argv[2] === "--worker") worker(resolve(process.argv[3]!), Number(process.argv[4]));
else {
    const manifestPath = process.argv[2];
    const outputPath = process.argv[3];
    if (manifestPath === undefined || outputPath === undefined) throw new Error("usage: benchmark-v3 <manifest> <output>");
    controller(resolve(manifestPath), resolve(outputPath));
}
