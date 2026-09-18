import { fork } from "node:child_process";
import { randomUUID } from "node:crypto";
import { closeSync, existsSync, openSync, writeSync } from "node:fs";
import { cpus, totalmem } from "node:os";
import { resolve } from "node:path";

import {
    candidateRegistry, fail, hashFile, here, json, manifestPath, mirrorRoot, repoRoot, verifyBindings,
} from "./bindings.ts";
import {
    checksumWork, deposed, loadCandidateLanes, semanticValidation, validateDeposed, type Case, type Lane,
} from "./lanes.ts";
import {
    assertBalanced, assertPositionBalanced, balancedBlocks, canonical, mad, median, pairedUpper, sha256,
} from "./protocol.ts";

const harnessPath = resolve(here, "benchmark.mts");
const emit = (value: unknown): void => { process.stdout.write(`${JSON.stringify(value)}\n`); };

const environment = () => ({
    node: process.version,
    v8: process.versions.v8,
    exec_path: process.execPath,
    exec_argv: process.execArgv,
    platform: process.platform,
    arch: process.arch,
    cpu_model: cpus()[0]?.model ?? "UNKNOWN",
    logical_cpus: cpus().length,
    total_memory_bytes: totalmem(),
});

function structuralSelfTest(manifest: any) {
    verifyBindings(manifest);
    const registry = candidateRegistry(manifest);
    for (const classification of ["common_domain", "corrected_only"] as const) {
        for (const row of manifest.corpus[classification] as Case[]) {
            if (!Number.isInteger(row.end) || row.end < 0 || row.end > row.source.length) {
                fail(`${classification}/${row.id}: declared end is outside source UTF-16 bounds`);
            }
        }
    }
    const ids = ["h", "b", "s", "d", "deposed"];
    if (canonical(registry.rows.map(({ id }) => id)) !== canonical(ids.slice(0, -1))) fail("candidate id/order mismatch");
    const warmups = balancedBlocks(ids, manifest.protocol.seed_uint32 ^ 0xa5a5a5a5, manifest.protocol.warmup_superblocks);
    assertPositionBalanced(warmups, ids, manifest.protocol.warmup_superblocks);
    const blocks = balancedBlocks(ids, manifest.protocol.seed_uint32, manifest.protocol.sample_superblocks);
    assertBalanced(blocks, ids, manifest.protocol.sample_superblocks);
    validateDeposed(manifest.corpus.common_domain as Case[]);
    const paired = pairedUpper([8, 9, 10], [10, 10, 10], 1);
    if (!(median([9, 1, 5]) === 5 && mad([1, 5, 9]) === 4 && paired.pairs === 3)) fail("statistics self-test failed");
    return {
        schema: "value.pi.syntax-consume-number.g15.benchmark-self-test/v1",
        status: "PASS_STRUCTURE_AND_DEPOSED_SEMANTICS_NO_CANDIDATE_IMPORT_NO_TIMING",
        manifest_sha256: hashFile(manifestPath),
        harness_files: manifest.bindings.harness.files,
        common_cases: manifest.corpus.common_domain.length,
        corrected_cases_declared_not_run: manifest.corpus.corrected_only.length,
        position_balanced_warmup_blocks: warmups.length,
        balanced_sample_blocks: blocks.length,
        raw_attempt_exists: existsSync(resolve(repoRoot, manifest.attempt.raw_path)),
    };
}

async function benchmarkWorker(manifest: any): Promise<void> {
    if (typeof process.send !== "function") fail("worker requires controller IPC; direct timing is forbidden");
    const send = (value: unknown): void => { process.send!(value); };
    const attemptId = process.env.G15_BENCH_ATTEMPT_ID;
    if (!attemptId || !/^[0-9a-f-]{36}$/.test(attemptId)) fail("worker requires controller attempt id");
    verifyBindings(manifest);
    const registry = candidateRegistry(manifest);
    const candidates = await loadCandidateLanes(registry.rows);
    const lanes = [...candidates, deposed];
    const ids = lanes.map((lane) => lane.id);
    const protocol = manifest.protocol;
    send({ event: "environment", attempt_id: attemptId, at: new Date().toISOString(), value: environment() });
    send({ event: "validation", attempt_id: attemptId, at: new Date().toISOString(), value: semanticValidation(candidates, manifest) });

    const common = manifest.corpus.common_domain as Case[];
    const warmups = balancedBlocks(ids, protocol.seed_uint32 ^ 0xa5a5a5a5, protocol.warmup_superblocks);
    assertPositionBalanced(warmups, ids, protocol.warmup_superblocks);
    for (const order of warmups) for (const id of order) {
        checksumWork(lanes.find((lane) => lane.id === id)!, common, protocol.warmup_repetitions);
    }
    send({ event: "warmup_complete", attempt_id: attemptId, at: new Date().toISOString(), blocks: warmups.length });

    const blocks = balancedBlocks(ids, protocol.seed_uint32, protocol.sample_superblocks);
    assertBalanced(blocks, ids, protocol.sample_superblocks);
    const samples = Object.fromEntries(ids.map((id) => [id, [] as number[]])) as Record<string, number[]>;
    for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
        const order = blocks[blockIndex]!;
        const laneSamples: Record<string, { elapsed_ns: number; operations: number; checksum_sha256: string }> = {};
        let referenceSink: number | undefined;
        for (const id of order) {
            const lane = lanes.find((value) => value.id === id)!;
            const before = process.hrtime.bigint();
            const checksum = checksumWork(lane, common, protocol.sample_repetitions);
            const elapsed = Number(process.hrtime.bigint() - before);
            if (referenceSink === undefined) referenceSink = checksum.sink;
            else if (!Object.is(referenceSink, checksum.sink)) fail(`${id}: block ${blockIndex} checksum mismatch`);
            samples[id]!.push(elapsed);
            laneSamples[id] = { elapsed_ns: elapsed, operations: checksum.operations, checksum_sha256: checksum.digest };
        }
        send({ event: "block", attempt_id: attemptId, classification: "common_domain", block_index: blockIndex, order, lanes: laneSamples });
    }

    const summaries = Object.fromEntries(ids.map((id) => [id, {
        samples: samples[id]!.length,
        median_elapsed_ns: median(samples[id]!),
        mad_elapsed_ns: mad(samples[id]!),
    }]));
    const comparisons = Object.fromEntries(candidates.map((lane) => [lane.id,
        pairedUpper(samples[lane.id]!, samples.deposed!, protocol.t_critical_one_sided_95_df_29),
    ]));
    send({
        event: "summary",
        attempt_id: attemptId,
        at: new Date().toISOString(),
        classification: "common_domain",
        blocks: blocks.length,
        summaries,
        comparisons,
        qualification: Object.fromEntries(Object.entries(comparisons).map(([id, result]) => [
            id,
            (result as ReturnType<typeof pairedUpper>).pass_strict_candidate_faster ? "PASS" : "FAIL",
        ])),
    });
}

async function validateCandidates(manifest: any) {
    verifyBindings(manifest);
    const registry = candidateRegistry(manifest);
    const candidates = await loadCandidateLanes(registry.rows);
    return {
        schema: "value.pi.syntax-consume-number.g15.benchmark-validation/v1",
        status: "PASS_SEMANTICS_NO_TIMING",
        candidate_registry_sha256: registry.hash,
        validation: semanticValidation(candidates, manifest),
    };
}

async function runFirstAttempt(manifest: any): Promise<void> {
    verifyBindings(manifest);
    const registry = candidateRegistry(manifest);
    const rawPath = resolve(repoRoot, manifest.attempt.raw_path);
    const attemptId = randomUUID();
    const descriptor = openSync(rawPath, "wx", 0o444);
    let stderr = "";
    let summarySeen = false;
    const append = (value: unknown): void => { writeSync(descriptor, `${JSON.stringify(value)}\n`); };
    append({
        event: "start", attempt_id: attemptId, at: new Date().toISOString(),
        manifest_sha256: hashFile(manifestPath), harness_sha256: hashFile(harnessPath),
        candidate_registry_sha256: registry.hash, argv: process.argv, cwd: process.cwd(),
    });
    append({ event: "environment", scope: "controller", attempt_id: attemptId, at: new Date().toISOString(), value: environment() });
    const child = fork(harnessPath, ["--worker"], {
        cwd: mirrorRoot,
        execPath: process.execPath,
        execArgv: process.execArgv,
        env: { ...process.env, G15_BENCH_ATTEMPT_ID: attemptId },
        stdio: ["ignore", "ignore", "pipe", "ipc"],
    });
    child.on("message", (message: unknown) => {
        const event = message as Record<string, unknown>;
        if (!event || typeof event !== "object" || event.attempt_id !== attemptId || typeof event.event !== "string") {
            append({ event: "invalid_worker_message", attempt_id: attemptId, at: new Date().toISOString(), digest: sha256(canonical(message)) });
            child.kill("SIGKILL");
            return;
        }
        if (event.event === "summary") summarySeen = true;
        append(event);
    });
    child.stderr!.setEncoding("utf8");
    child.stderr!.on("data", (chunk: string) => {
        if (Buffer.byteLength(stderr) < 1_000_000) stderr += chunk;
        else child.kill("SIGKILL");
    });
    const timeout = setTimeout(() => child.kill("SIGKILL"), manifest.protocol.timeout_ms);
    const exit = await new Promise<{ code: number | null; signal: NodeJS.Signals | null; error?: string }>((accept) => {
        let settled = false;
        const settle = (value: { code: number | null; signal: NodeJS.Signals | null; error?: string }): void => {
            if (!settled) { settled = true; accept(value); }
        };
        child.once("error", (error) => settle({ code: null, signal: null, error: error.message }));
        child.once("exit", (code, signal) => settle({ code, signal }));
    });
    clearTimeout(timeout);
    append({
        event: "exit", attempt_id: attemptId, at: new Date().toISOString(), code: exit.code,
        signal: exit.signal, spawn_error: exit.error ?? null, summary_seen: summarySeen,
        stderr_bytes: Buffer.byteLength(stderr), stderr_sha256: sha256(stderr),
        status: exit.code === 0 && summarySeen ? "COMPLETE_FIRST_ATTEMPT" : "CONSUMED_FAILED_FIRST_ATTEMPT_ZERO_CREDIT",
    });
    closeSync(descriptor);
    emit({ status: exit.code === 0 && summarySeen ? "COMPLETE" : "FAILED_ZERO_CREDIT", raw_path: manifest.attempt.raw_path });
    if (exit.code !== 0 || !summarySeen) process.exitCode = 1;
}

const manifest = json(manifestPath);
const argument = process.argv[2];
if (process.argv.length !== 3 || argument === undefined
    || !["--self-test", "--validate-candidates", "--run-first-attempt", "--worker"].includes(argument)) {
    fail("usage: benchmark.mts --self-test|--validate-candidates|--run-first-attempt");
}
if (argument === "--self-test") emit(structuralSelfTest(manifest));
else if (argument === "--validate-candidates") emit(await validateCandidates(manifest));
else if (argument === "--run-first-attempt") await runFirstAttempt(manifest);
else await benchmarkWorker(manifest);
