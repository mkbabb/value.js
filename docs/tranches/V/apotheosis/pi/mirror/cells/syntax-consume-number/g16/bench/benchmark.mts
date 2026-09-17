import { fork, type ChildProcess } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import {
    closeSync, fsyncSync, lstatSync, openSync, readFileSync, readdirSync, readlinkSync, writeSync,
} from "node:fs";
import { cpus, release, totalmem } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { ParserState } from "@mkbabb/parse-that/core";
import { consumeNumber as h2Number } from "../../g15/optimization/h2/index.ts";
import { number as deposedNumber } from "../../g7/authorities/historical-utils.ts";

type Sign = "+" | "-" | null;
type NumberType = "integer" | "number";
type Leaf = { sign: Sign; type: NumberType; value: number };
type Observation = { end: number; leaf: Leaf };
type Family = "integer" | "decimal" | "exponent" | "css_continuation"
    | "rollback_maximal_prefix" | "nonzero_offset" | "mantissa_16" | "mantissa_64" | "mantissa_128";
type Case = {
    id: string;
    family: Family;
    source: string;
    offset: number;
    end: number;
    sign: Sign;
    type: NumberType;
    binary64_be_hex: string;
};
type LaneId = "h2" | "deposed";
type Lane = { id: LaneId; run: (source: string, offset: number) => Observation };
type FileBinding = { path: string; sha256: string };
type TreeBinding = FileBinding & { id: string; files_or_links: number; ledger_bytes: number };
type Manifest = {
    schema: string;
    status: string;
    corpus: { path: string; sha256: string; cases: number; required_families: Record<Family, number> };
    correctness_evidence: { path: string; sha256: string; schema: string; required_status: string };
    attempt: { raw_path: string; timing_executed: boolean };
    protocol: {
        replicate_count: number;
        replicate_seeds_uint32: number[];
        warmup_blocks: number;
        warmup_blocks_per_order: number;
        sample_blocks: number;
        sample_blocks_per_order: number;
        full_corpus_repetitions_per_lane_per_block: number;
        t_critical_one_sided_95_df_29: number;
        child_timeout_ms: number;
        child_exec_argv_append: string;
        worker_stderr_policy: string;
    };
    bindings: {
        runtime: {
            node: { path: string; version: string; sha256: string };
            files: FileBinding[];
            trees: TreeBinding[];
        };
        lanes: Array<FileBinding & { id: LaneId }>;
        harness: { files: FileBinding[] };
    };
};
type CorrectnessEvidence = {
    schema: string;
    status: string;
    cases: number;
    lane_observations: number;
    corpus_sha256: string;
    h2_sha256: string;
    deposed_sha256: string;
    benchmark_source_sha256: string;
    observations_sha256: string;
};
type WorkResult = { numeric_sink: number; structural_sink: number; operations: number };
type SampleBlock = {
    event: "sample_block";
    attempt_id: string;
    replicate_index: number;
    seed_uint32: number;
    block_index: number;
    order: LaneId[];
    lanes: Record<LaneId, { elapsed_ns: number; operations: number; checksum_sha256: string }>;
    log_ratio_h2_over_deposed: number;
};
type ReplicateSummary = {
    event: "replicate_summary";
    attempt_id: string;
    replicate_index: number;
    seed_uint32: number;
    sample_blocks: number;
    d_r_mean_log_ratio_h2_over_deposed: number;
};
type WorkerPhase = "environment" | "preflight" | "warmup" | "samples" | "summary";
type WorkerState = {
    phase: WorkerPhase;
    sampleRatios: number[];
    aggregate?: number;
};

const here = dirname(fileURLToPath(import.meta.url));
const harnessPath = resolve(here, "benchmark.mts");
const manifestPath = resolve(here, "benchmark-manifest.json");
const mirrorRoot = resolve(here, "../../../..");
const repoRoot = resolve(mirrorRoot, "../../../../../..");
const placeholder = "PRE_TIMING_SHA256_PLACEHOLDER";
const disabledLoaderWarning = "--disable-warning=DEP0205";
const rowKeys = ["id", "family", "source", "offset", "end", "sign", "type", "binary64_be_hex"];
const laneIds: readonly LaneId[] = ["h2", "deposed"];

const fail = (message: string): never => { throw new Error(message); };
const asError = (value: unknown): Error => value instanceof Error ? value : new Error(String(value));
const readJson = <T,>(path: string): T => JSON.parse(readFileSync(path, "utf8")) as T;
const sha256 = (value: string | Uint8Array): string => createHash("sha256").update(value).digest("hex");
const hashFile = (path: string): string => sha256(readFileSync(path));
const isHash = (value: string): boolean => /^[0-9a-f]{64}$/.test(value);
const childExecArgv = (): string[] => process.execArgv.includes(disabledLoaderWarning)
    ? [...process.execArgv]
    : [...process.execArgv, disabledLoaderWarning];

function assertKeys(label: string, value: Record<string, unknown>, expected: readonly string[]): void {
    if (canonical(Reflect.ownKeys(value)) !== canonical(expected)) fail(`${label}: exact fields mismatch`);
}

function assertIsoDate(label: string, value: unknown): void {
    if (typeof value !== "string" || !Number.isFinite(Date.parse(value))) fail(`${label}: invalid timestamp`);
}

const canonical = (value: unknown): string => {
    if (value === null || typeof value !== "object") return JSON.stringify(value);
    if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonical(record[key])}`).join(",")}}`;
};

const bits = (value: number): string => {
    const bytes = Buffer.allocUnsafe(8);
    bytes.writeDoubleBE(value, 0);
    return bytes.toString("hex");
};

const environment = () => ({
    node: process.version,
    v8: process.versions.v8,
    exec_path: process.execPath,
    exec_argv: process.execArgv,
    platform: process.platform,
    arch: process.arch,
    os_release: release(),
    cpu_model: cpus()[0]?.model ?? "UNKNOWN",
    logical_cpus: cpus().length,
    total_memory_bytes: totalmem(),
    pid: process.pid,
});

const h2: Lane = {
    id: "h2",
    run(source, offset) {
        const state = new ParserState<Leaf>(source, undefined, offset);
        h2Number.call(state);
        if (state.isError || typeof state.value !== "object" || state.value === null) fail("h2 parser failure");
        return { end: state.offset, leaf: state.value };
    },
};

const deposed: Lane = {
    id: "deposed",
    run(source, offset) {
        const state = new ParserState<number>(source, undefined, offset);
        deposedNumber.call(state);
        if (state.isError || typeof state.value !== "number") fail("deposed parser failure");
        const end = state.offset;
        const representation = source.slice(offset, end);
        const first = representation[0];
        const leaf: Leaf = {
            sign: first === "+" || first === "-" ? first : null,
            type: representation.includes(".") || /[eE]/.test(representation) ? "number" : "integer",
            value: state.value,
        };
        return { end, leaf };
    },
};

const lanes: readonly Lane[] = [h2, deposed];

function assertLeaf(label: string, actual: unknown, expected: Case): asserts actual is Leaf {
    if (typeof actual !== "object" || actual === null || Object.getPrototypeOf(actual) !== Object.prototype) {
        fail(`${label}: leaf must be a plain object`);
    }
    const object = actual as object;
    if (Object.isFrozen(object) || Object.isSealed(object) || !Object.isExtensible(object)) {
        fail(`${label}: leaf must be mutable`);
    }
    if (canonical(Reflect.ownKeys(object)) !== canonical(["sign", "type", "value"])) fail(`${label}: leaf keys`);
    const descriptors = Object.getOwnPropertyDescriptors(object);
    for (const key of ["sign", "type", "value"] as const) {
        const descriptor = descriptors[key];
        if (!descriptor || !descriptor.enumerable || !descriptor.configurable || !descriptor.writable
            || descriptor.get !== undefined || descriptor.set !== undefined || !Object.hasOwn(descriptor, "value")) {
            fail(`${label}: ${key} must be an ordinary mutable data property`);
        }
    }
    const leaf = actual as Leaf;
    if (leaf.sign !== expected.sign || leaf.type !== expected.type || bits(leaf.value) !== expected.binary64_be_hex) {
        fail(`${label}: leaf semantics mismatch`);
    }
}

function assertObservation(label: string, actual: Observation, expected: Case): void {
    if (Object.getPrototypeOf(actual) !== Object.prototype || Object.isFrozen(actual)
        || Object.isSealed(actual) || !Object.isExtensible(actual)
        || canonical(Reflect.ownKeys(actual)) !== canonical(["end", "leaf"])) {
        fail(`${label}: observation wrapper shape/mutability mismatch`);
    }
    if (actual.end !== expected.end) fail(`${label}: end ${actual.end} != ${expected.end}`);
    assertLeaf(label, actual.leaf, expected);
}

function validateCorpus(rows: readonly Case[], manifest: Manifest): void {
    if (rows.length !== 64 || manifest.corpus.cases !== 64) fail("corpus must contain exactly 64 rows");
    const ids = new Set<string>();
    const families = new Map<Family, number>();
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index]!;
        if (canonical(Object.keys(row)) !== canonical(rowKeys)) fail(`${row.id}: corpus fields differ from the exact contract`);
        if (row.id !== `c${String(index + 1).padStart(2, "0")}` || ids.has(row.id)) fail(`${row.id}: id/order mismatch`);
        if (!Object.hasOwn(manifest.corpus.required_families, row.family)) fail(`${row.id}: unknown family`);
        if (!Number.isInteger(row.offset) || !Number.isInteger(row.end)
            || row.offset < 0 || row.end <= row.offset || row.end > row.source.length) fail(`${row.id}: invalid UTF-16 span`);
        if (row.sign !== null && row.sign !== "-" && row.sign !== "+") fail(`${row.id}: invalid sign`);
        if (row.type !== "integer" && row.type !== "number") fail(`${row.id}: invalid type`);
        if (!/^[0-9a-f]{16}$/.test(row.binary64_be_hex)) fail(`${row.id}: invalid binary64 encoding`);
        const representation = row.source.slice(row.offset, row.end);
        if (representation.startsWith("+")) fail(`${row.id}: plus-sign differences are excluded from timing`);
        const unsigned = representation.startsWith("-") ? representation.slice(1) : representation;
        if (/^0[0-9]/.test(unsigned)) fail(`${row.id}: multiple-leading-zero differences are excluded from timing`);
        if (bits(Number(representation)) !== row.binary64_be_hex) fail(`${row.id}: declared binary64 does not match its span`);
        ids.add(row.id);
        families.set(row.family, (families.get(row.family) ?? 0) + 1);
    }
    for (const [family, count] of Object.entries(manifest.corpus.required_families) as Array<[Family, number]>) {
        if (families.get(family) !== count) fail(`${family}: family count mismatch`);
    }
    for (const digits of [16, 64, 128] as const) {
        const family = `mantissa_${digits}` as Family;
        for (const row of rows.filter((value) => value.family === family)) {
            const representation = row.source.slice(row.offset, row.end);
            const mantissa = representation.replace(/^[+-]/, "").split(/[eE]/, 1)[0]!;
            if (mantissa.replace(".", "").length !== digits) fail(`${row.id}: mantissa is not ${digits} digits`);
        }
    }
}

function semanticValidation(rows: readonly Case[]): CorrectnessEvidence {
    const observations: unknown[] = [];
    for (const lane of lanes) for (const row of rows) {
        const observation = lane.run(row.source, row.offset);
        assertObservation(`${lane.id}/${row.id}`, observation, row);
        observations.push({
            lane: lane.id,
            row: row.id,
            end: observation.end,
            sign: observation.leaf.sign,
            type: observation.leaf.type,
            binary64_be_hex: bits(observation.leaf.value),
        });
    }
    return {
        schema: "value.pi.syntax-consume-number.g16.correctness-evidence/v1",
        status: "PASS_EXACT_TWO_LANES_64_CASES_NO_TIMING",
        cases: rows.length,
        lane_observations: observations.length,
        corpus_sha256: hashFile(resolve(repoRoot, manifest.corpus.path)),
        h2_sha256: hashFile(resolve(repoRoot, laneBinding("h2").path)),
        deposed_sha256: hashFile(resolve(repoRoot, laneBinding("deposed").path)),
        benchmark_source_sha256: hashFile(harnessPath),
        observations_sha256: sha256(`${canonical(observations)}\n`),
    };
}

function treeLedger(base: string): Omit<TreeBinding, "id" | "path" | "sha256"> & { ledger_sha256: string } {
    const ledgerRows: string[] = [];
    const visit = (directory: string): void => {
        for (const name of readdirSync(directory).sort()) {
            const path = join(directory, name);
            const stat = lstatSync(path);
            const local = relative(base, path).split(sep).join("/");
            if (stat.isDirectory()) visit(path);
            else if (stat.isSymbolicLink()) ledgerRows.push(`L  ${local}  ${readlinkSync(path)}\n`);
            else if (stat.isFile()) {
                ledgerRows.push(`F  ${hashFile(path)}  ${stat.size}  ${(stat.mode & 0o777).toString(8).padStart(4, "0")}  ${local}\n`);
            } else fail(`unsupported package-tree entry: ${path}`);
        }
    };
    visit(base);
    const ledger = ledgerRows.join("");
    return {
        files_or_links: ledgerRows.length,
        ledger_bytes: Buffer.byteLength(ledger),
        ledger_sha256: sha256(ledger),
    };
}

function laneBinding(id: LaneId): FileBinding & { id: LaneId } {
    const row = manifest.bindings.lanes.find((value) => value.id === id);
    return row ?? fail(`${id}: missing lane binding`);
}

function verifyBaseBindings(value: Manifest, allowPlaceholders: boolean): void {
    if (value.schema !== "value.pi.syntax-consume-number.g16.confirmatory-benchmark/v1") fail("manifest schema mismatch");
    if (value.attempt.timing_executed !== false) fail("manifest cannot claim timing was executed");
    const protocol = value.protocol;
    if (protocol.replicate_count !== 30 || protocol.replicate_seeds_uint32.length !== 30
        || new Set(protocol.replicate_seeds_uint32).size !== 30
        || protocol.replicate_seeds_uint32.some((seed) => !Number.isInteger(seed) || seed < 0 || seed > 0xffff_ffff)) {
        fail("replicate seed/cardinality contract mismatch");
    }
    if (protocol.warmup_blocks !== 4 || protocol.warmup_blocks_per_order !== 2
        || protocol.sample_blocks !== 12 || protocol.sample_blocks_per_order !== 6
        || protocol.full_corpus_repetitions_per_lane_per_block !== 5000
        || protocol.t_critical_one_sided_95_df_29 !== 1.6991270265
        || protocol.child_exec_argv_append !== disabledLoaderWarning
        || protocol.worker_stderr_policy !== "REJECT_ANY_NONEMPTY_STDERR_AFTER_SUPPRESSING_ONLY_DEP0205") {
        fail("fixed protocol mismatch");
    }
    if (value.bindings.lanes.length !== 2
        || canonical(value.bindings.lanes.map(({ id }) => id)) !== canonical(laneIds)) fail("only h2 and deposed may be bound");
    for (const binding of value.bindings.lanes) {
        if (!isHash(binding.sha256) || hashFile(resolve(repoRoot, binding.path)) !== binding.sha256) {
            fail(`${binding.id}: exact source binding mismatch`);
        }
    }
    if (!isHash(value.corpus.sha256) || hashFile(resolve(repoRoot, value.corpus.path)) !== value.corpus.sha256) {
        fail("corpus binding mismatch");
    }
    const node = value.bindings.runtime.node;
    if (process.version !== node.version || process.execPath !== node.path || hashFile(process.execPath) !== node.sha256) {
        fail("Node runtime binding mismatch");
    }
    for (const binding of value.bindings.runtime.files) {
        if (hashFile(resolve(repoRoot, binding.path)) !== binding.sha256) fail(`runtime file binding mismatch: ${binding.path}`);
    }
    for (const tree of value.bindings.runtime.trees) {
        const actual = treeLedger(resolve(repoRoot, tree.path));
        if (actual.files_or_links !== tree.files_or_links || actual.ledger_bytes !== tree.ledger_bytes
            || actual.ledger_sha256 !== tree.sha256) fail(`${tree.id}: runtime tree binding mismatch`);
    }
    for (const binding of value.bindings.harness.files) {
        if (binding.sha256 === placeholder && allowPlaceholders) continue;
        if (!isHash(binding.sha256) || hashFile(resolve(repoRoot, binding.path)) !== binding.sha256) {
            fail(`harness file binding mismatch: ${binding.path}`);
        }
    }
}

function verifyFrozenBindings(value: Manifest): CorrectnessEvidence {
    verifyBaseBindings(value, false);
    if (value.status !== "FROZEN_READY_FOR_FIRST_ATTEMPT") fail("manifest remains in pre-timing placeholder state");
    const binding = value.correctness_evidence;
    if (!isHash(binding.sha256)) fail("correctness evidence hash remains a pre-timing placeholder");
    const path = resolve(repoRoot, binding.path);
    if (hashFile(path) !== binding.sha256) fail("correctness evidence binding mismatch");
    const evidence = readJson<CorrectnessEvidence>(path);
    if (evidence.schema !== binding.schema || evidence.status !== binding.required_status
        || evidence.cases !== 64 || evidence.lane_observations !== 128
        || evidence.corpus_sha256 !== value.corpus.sha256
        || evidence.h2_sha256 !== laneBinding("h2").sha256
        || evidence.deposed_sha256 !== laneBinding("deposed").sha256
        || evidence.benchmark_source_sha256 !== hashFile(harnessPath)
        || !isHash(evidence.observations_sha256)) fail("correctness evidence content mismatch");
    return evidence;
}

const random = (seed: number): (() => number) => {
    let state = seed >>> 0;
    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let value = state;
        value = Math.imul(value ^ value >>> 15, value | 1);
        value ^= value + Math.imul(value ^ value >>> 7, value | 61);
        return ((value ^ value >>> 14) >>> 0) / 0x1_0000_0000;
    };
};

function pairedOrders(seed: number, blocksPerOrder: number): LaneId[][] {
    const orders: LaneId[][] = [];
    for (let index = 0; index < blocksPerOrder; index++) {
        orders.push(["h2", "deposed"], ["deposed", "h2"]);
    }
    const next = random(seed);
    for (let index = orders.length - 1; index > 0; index--) {
        const other = Math.floor(next() * (index + 1));
        [orders[index], orders[other]] = [orders[other]!, orders[index]!];
    }
    return orders;
}

function assertPairedOrders(orders: readonly (readonly LaneId[])[], blocksPerOrder: number): void {
    if (orders.length !== blocksPerOrder * 2
        || orders.filter((order) => canonical(order) === canonical(["h2", "deposed"])).length !== blocksPerOrder
        || orders.filter((order) => canonical(order) === canonical(["deposed", "h2"])).length !== blocksPerOrder) {
        fail("paired order balance mismatch");
    }
}

function runWork(lane: Lane, rows: readonly Case[], repetitions: number): WorkResult {
    let numericSink = 0;
    let structuralSink = 0;
    for (let repetition = 0; repetition < repetitions; repetition++) for (let index = 0; index < rows.length; index++) {
        const row = rows[index]!;
        const observation = lane.run(row.source, row.offset);
        const leaf = observation.leaf;
        numericSink += leaf.value * ((index % 7) + 1);
        structuralSink += observation.end * 3 + (leaf.sign === "-" ? 11 : leaf.sign === "+" ? 7 : 5)
            + (leaf.type === "number" ? 13 : 17);
    }
    return { numeric_sink: numericSink, structural_sink: structuralSink, operations: rows.length * repetitions };
}

const workDigest = (work: WorkResult): string => sha256(`${canonical({
    numeric_sink_binary64_be_hex: bits(work.numeric_sink),
    structural_sink: work.structural_sink,
    operations: work.operations,
})}\n`);

async function sendIpc(value: unknown): Promise<void> {
    if (typeof process.send !== "function") fail("worker requires controller IPC");
    await new Promise<void>((accept, reject) => {
        process.send!(value, (error: Error | null) => error ? reject(error) : accept());
    });
}

async function worker(value: Manifest, replicateIndex: number, seed: number): Promise<void> {
    const attemptId = process.env["G16_BENCH_ATTEMPT_ID"] ?? fail("worker requires controller attempt id");
    if (!/^[0-9a-f-]{36}$/.test(attemptId)) fail("worker requires controller attempt id");
    if (!Number.isInteger(replicateIndex) || replicateIndex < 0 || replicateIndex >= value.protocol.replicate_count
        || value.protocol.replicate_seeds_uint32[replicateIndex] !== seed) fail("worker replicate/seed mismatch");
    verifyBaseBindings(value, false);
    const rows = readJson<Case[]>(resolve(repoRoot, value.corpus.path));
    validateCorpus(rows, value);
    await sendIpc({
        event: "child_environment", attempt_id: attemptId, replicate_index: replicateIndex,
        seed_uint32: seed, at: new Date().toISOString(), value: environment(),
    });
    const correctness = semanticValidation(rows);
    await sendIpc({
        event: "semantic_preflight", attempt_id: attemptId, replicate_index: replicateIndex,
        seed_uint32: seed, at: new Date().toISOString(), value: correctness,
    });

    const warmups = pairedOrders(seed ^ 0xa5a5_a5a5, value.protocol.warmup_blocks_per_order);
    assertPairedOrders(warmups, value.protocol.warmup_blocks_per_order);
    for (const order of warmups) for (const id of order) {
        runWork(lanes.find((lane) => lane.id === id)!, rows, value.protocol.full_corpus_repetitions_per_lane_per_block);
    }
    await sendIpc({
        event: "warmup_complete", attempt_id: attemptId, replicate_index: replicateIndex,
        seed_uint32: seed, blocks: warmups.length, orders: warmups,
    });

    const orders = pairedOrders(seed, value.protocol.sample_blocks_per_order);
    assertPairedOrders(orders, value.protocol.sample_blocks_per_order);
    const logRatios: number[] = [];
    for (let blockIndex = 0; blockIndex < orders.length; blockIndex++) {
        const order = orders[blockIndex]!;
        const elapsed = {} as Record<LaneId, number>;
        const results = {} as Record<LaneId, WorkResult>;
        for (const id of order) {
            const lane = lanes.find((candidate) => candidate.id === id)!;
            const before = process.hrtime.bigint();
            const result = runWork(lane, rows, value.protocol.full_corpus_repetitions_per_lane_per_block);
            const duration = Number(process.hrtime.bigint() - before);
            if (!Number.isSafeInteger(duration) || duration <= 0) fail(`replicate ${replicateIndex} block ${blockIndex}: invalid duration`);
            elapsed[id] = duration;
            results[id] = result;
        }
        const h2Digest = workDigest(results.h2);
        const deposedDigest = workDigest(results.deposed);
        if (h2Digest !== deposedDigest) fail(`replicate ${replicateIndex} block ${blockIndex}: checksum mismatch`);
        const logRatio = Math.log(elapsed.h2 / elapsed.deposed);
        if (!Number.isFinite(logRatio)) fail(`replicate ${replicateIndex} block ${blockIndex}: invalid log ratio`);
        logRatios.push(logRatio);
        const event: SampleBlock = {
            event: "sample_block",
            attempt_id: attemptId,
            replicate_index: replicateIndex,
            seed_uint32: seed,
            block_index: blockIndex,
            order,
            lanes: {
                h2: { elapsed_ns: elapsed.h2, operations: results.h2.operations, checksum_sha256: h2Digest },
                deposed: { elapsed_ns: elapsed.deposed, operations: results.deposed.operations, checksum_sha256: deposedDigest },
            },
            log_ratio_h2_over_deposed: logRatio,
        };
        await sendIpc(event);
    }
    const d = logRatios.reduce((sum, value_) => sum + value_, 0) / logRatios.length;
    const summary: ReplicateSummary = {
        event: "replicate_summary",
        attempt_id: attemptId,
        replicate_index: replicateIndex,
        seed_uint32: seed,
        sample_blocks: logRatios.length,
        d_r_mean_log_ratio_h2_over_deposed: d,
    };
    await sendIpc(summary);
    process.disconnect?.();
}

function validateWorkerEvent(
    message: unknown,
    attemptId: string,
    replicateIndex: number,
    seed: number,
    expectedCorrectness: CorrectnessEvidence,
    expectedExecArgv: readonly string[],
    state: WorkerState,
): void {
    if (typeof message !== "object" || message === null) fail("non-object worker message");
    const event = message as Record<string, unknown>;
    if (event["attempt_id"] !== attemptId || event["replicate_index"] !== replicateIndex || event["seed_uint32"] !== seed
        || typeof event["event"] !== "string") fail("worker message envelope mismatch");
    if (event["event"] === "child_environment") {
        if (state.phase !== "environment") fail("worker environment phase mismatch");
        assertKeys("worker environment event", event,
            ["event", "attempt_id", "replicate_index", "seed_uint32", "at", "value"]);
        assertIsoDate("worker environment", event["at"]);
        if (typeof event["value"] !== "object" || event["value"] === null) fail("worker environment value mismatch");
        const environmentValue = event["value"] as Record<string, unknown>;
        assertKeys("worker environment value", environmentValue,
            ["node", "v8", "exec_path", "exec_argv", "platform", "arch", "os_release", "cpu_model",
                "logical_cpus", "total_memory_bytes", "pid"]);
        if (environmentValue["node"] !== manifest.bindings.runtime.node.version
            || environmentValue["exec_path"] !== manifest.bindings.runtime.node.path
            || canonical(environmentValue["exec_argv"]) !== canonical(expectedExecArgv)
            || environmentValue["platform"] !== process.platform || environmentValue["arch"] !== process.arch
            || typeof environmentValue["v8"] !== "string" || typeof environmentValue["os_release"] !== "string"
            || typeof environmentValue["cpu_model"] !== "string"
            || !Number.isInteger(environmentValue["logical_cpus"]) || !Number.isInteger(environmentValue["total_memory_bytes"])
            || !Number.isInteger(environmentValue["pid"])) fail("worker environment content mismatch");
        state.phase = "preflight";
    } else if (event["event"] === "semantic_preflight") {
        if (state.phase !== "preflight") fail("worker semantic phase mismatch");
        assertKeys("worker semantic event", event,
            ["event", "attempt_id", "replicate_index", "seed_uint32", "at", "value"]);
        assertIsoDate("worker semantic preflight", event["at"]);
        if (canonical(event["value"]) !== canonical(expectedCorrectness)) fail("worker semantic preflight mismatch");
        state.phase = "warmup";
    } else if (event["event"] === "warmup_complete") {
        if (state.phase !== "warmup") fail("worker warmup phase mismatch");
        assertKeys("worker warmup event", event,
            ["event", "attempt_id", "replicate_index", "seed_uint32", "blocks", "orders"]);
        const expectedOrders = pairedOrders(seed ^ 0xa5a5_a5a5, manifest.protocol.warmup_blocks_per_order);
        if (event["blocks"] !== manifest.protocol.warmup_blocks
            || canonical(event["orders"]) !== canonical(expectedOrders)) fail("worker warmup evidence mismatch");
        state.phase = "samples";
    } else if (event["event"] === "sample_block") {
        if (state.phase !== "samples") fail("worker sample phase mismatch");
        assertKeys("worker sample event", event,
            ["event", "attempt_id", "replicate_index", "seed_uint32", "block_index", "order", "lanes",
                "log_ratio_h2_over_deposed"]);
        const blockIndex = state.sampleRatios.length;
        const expectedOrder = pairedOrders(seed, manifest.protocol.sample_blocks_per_order)[blockIndex];
        if (event["block_index"] !== blockIndex || !expectedOrder
            || canonical(event["order"]) !== canonical(expectedOrder)) fail("worker sample block sequence/order mismatch");
        if (typeof event["lanes"] !== "object" || event["lanes"] === null) fail("worker sample lanes mismatch");
        const laneValues = event["lanes"] as Record<string, unknown>;
        assertKeys("worker sample lanes", laneValues, ["h2", "deposed"]);
        const elapsed = {} as Record<LaneId, number>;
        const checksums = {} as Record<LaneId, string>;
        for (const id of laneIds) {
            if (typeof laneValues[id] !== "object" || laneValues[id] === null) fail(`${id}: worker lane payload mismatch`);
            const laneValue = laneValues[id] as Record<string, unknown>;
            assertKeys(`${id}: worker lane payload`, laneValue, ["elapsed_ns", "operations", "checksum_sha256"]);
            if (!Number.isSafeInteger(laneValue["elapsed_ns"]) || (laneValue["elapsed_ns"] as number) <= 0
                || laneValue["operations"] !== manifest.protocol.full_corpus_repetitions_per_lane_per_block * manifest.corpus.cases
                || typeof laneValue["checksum_sha256"] !== "string" || !isHash(laneValue["checksum_sha256"])) {
                fail(`${id}: worker lane payload content mismatch`);
            }
            elapsed[id] = laneValue["elapsed_ns"] as number;
            checksums[id] = laneValue["checksum_sha256"] as string;
        }
        if (checksums.h2 !== checksums.deposed) fail("worker sample checksum mismatch");
        const recomputed = Math.log(elapsed.h2 / elapsed.deposed);
        if (!Number.isFinite(recomputed) || !Object.is(event["log_ratio_h2_over_deposed"], recomputed)) {
            fail("worker sample log ratio mismatch");
        }
        state.sampleRatios.push(recomputed);
    } else if (event["event"] === "replicate_summary") {
        if (state.phase !== "samples" || state.sampleRatios.length !== manifest.protocol.sample_blocks) {
            fail("worker summary phase mismatch");
        }
        assertKeys("worker summary event", event,
            ["event", "attempt_id", "replicate_index", "seed_uint32", "sample_blocks",
                "d_r_mean_log_ratio_h2_over_deposed"]);
        const summary = message as ReplicateSummary;
        const aggregate = state.sampleRatios.reduce((sum, value) => sum + value, 0) / state.sampleRatios.length;
        if (summary.sample_blocks !== manifest.protocol.sample_blocks
            || !Number.isFinite(summary.d_r_mean_log_ratio_h2_over_deposed)
            || !Object.is(summary.d_r_mean_log_ratio_h2_over_deposed, aggregate)) {
            fail("worker replicate summary mismatch");
        }
        state.aggregate = aggregate;
        state.phase = "summary";
    } else fail(`unexpected worker event: ${event["event"]}`);
}

async function runReplicate(
    value: Manifest,
    attemptId: string,
    replicateIndex: number,
    seed: number,
    expectedCorrectness: CorrectnessEvidence,
    append: (event: unknown) => void,
): Promise<number> {
    append({ event: "child_spawn", attempt_id: attemptId, replicate_index: replicateIndex, seed_uint32: seed, at: new Date().toISOString() });
    const child: ChildProcess = fork(harnessPath, ["--worker", String(replicateIndex), String(seed)], {
        cwd: mirrorRoot,
        execPath: process.execPath,
        execArgv: childExecArgv(),
        env: { ...process.env, G16_BENCH_ATTEMPT_ID: attemptId },
        stdio: ["ignore", "ignore", "pipe", "ipc"],
    });
    const state: WorkerState = { phase: "environment", sampleRatios: [] };
    let protocolError: Error | undefined;
    let spawnError: Error | undefined;
    let stderr = "";
    child.stderr!.setEncoding("utf8");
    child.stderr!.on("data", (chunk: string) => {
        if (Buffer.byteLength(stderr) + Buffer.byteLength(chunk) <= 1_000_000) stderr += chunk;
        else {
            protocolError = new Error("worker stderr exceeded one megabyte");
            child.kill("SIGKILL");
        }
    });
    child.on("message", (message: unknown) => {
        if (protocolError) return;
        try {
            validateWorkerEvent(message, attemptId, replicateIndex, seed, expectedCorrectness, childExecArgv(), state);
            append(message);
        } catch (error) {
            protocolError = asError(error);
            child.kill("SIGKILL");
        }
    });
    child.once("error", (error) => { spawnError = error; });
    const timeout = setTimeout(() => {
        protocolError = new Error(`replicate ${replicateIndex}: child timeout`);
        child.kill("SIGKILL");
    }, value.protocol.child_timeout_ms);
    const exit = await new Promise<{ code: number | null; signal: NodeJS.Signals | null }>((accept) => {
        child.once("close", (code, signal) => accept({ code, signal }));
    });
    clearTimeout(timeout);
    append({
        event: "child_exit", attempt_id: attemptId, replicate_index: replicateIndex, seed_uint32: seed,
        at: new Date().toISOString(), code: exit.code, signal: exit.signal,
        stderr_bytes: Buffer.byteLength(stderr), stderr_sha256: sha256(stderr),
    });
    if (spawnError) throw spawnError;
    if (protocolError) throw protocolError;
    if (exit.code !== 0 || exit.signal !== null || stderr.length !== 0) fail(`replicate ${replicateIndex}: worker failed`);
    const aggregate = state.aggregate;
    if (state.phase !== "summary" || state.sampleRatios.length !== value.protocol.sample_blocks) {
        fail(`replicate ${replicateIndex}: incomplete worker evidence`);
    }
    return aggregate ?? fail(`replicate ${replicateIndex}: missing controller aggregate`);
}

function processInference(values: readonly number[], critical: number) {
    if (values.length !== 30) fail("inference requires exactly 30 process aggregates");
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1);
    const sd = Math.sqrt(variance);
    const upper = mean + critical * sd / Math.sqrt(30);
    return {
        estimator: "ONLY_PREDECLARED_PROCESS_AGGREGATE_MEAN_LOG_RATIO",
        n_process_aggregates: 30,
        df: 29,
        t_critical_one_sided_95_df_29: critical,
        d_r_values: values,
        mean_log_ratio: mean,
        sample_sd_log_ratio: sd,
        one_sided_95_upper_log_ratio: upper,
        pass_strict_upper_below_zero: upper < 0,
        qualification: upper < 0 ? "PASS" as const : "FAIL" as const,
    };
}

async function runFirstAttempt(value: Manifest): Promise<void> {
    const rawPath = resolve(repoRoot, value.attempt.raw_path);
    const attemptId = randomUUID();
    const descriptor = openSync(rawPath, "wx", 0o444);
    let closed = false;
    const append = (event: unknown): void => {
        const bytes = Buffer.from(`${JSON.stringify(event)}\n`);
        let offset = 0;
        while (offset < bytes.length) {
            const written = writeSync(descriptor, bytes, offset, bytes.length - offset, null);
            if (!Number.isSafeInteger(written) || written <= 0) fail("raw evidence short write");
            offset += written;
        }
        fsyncSync(descriptor);
    };
    const close = (): void => {
        if (closed) return;
        let firstError: Error | undefined;
        try { fsyncSync(descriptor); } catch (error) { firstError = asError(error); }
        try { closeSync(descriptor); } catch (error) { firstError ??= asError(error); }
        closed = true;
        if (firstError) throw firstError;
    };
    let failure: Error | undefined;
    let qualification: "PASS" | "FAIL" | undefined;
    try {
        append({
            event: "start", attempt_id: attemptId, at: new Date().toISOString(),
            manifest_sha256: hashFile(manifestPath), argv: process.argv, cwd: process.cwd(),
        });
        const correctness = verifyFrozenBindings(value);
        append({
            event: "bindings_verified", attempt_id: attemptId, at: new Date().toISOString(),
            corpus_sha256: value.corpus.sha256,
            h2_sha256: laneBinding("h2").sha256,
            deposed_sha256: laneBinding("deposed").sha256,
            correctness_evidence_sha256: value.correctness_evidence.sha256,
            correctness_observations_sha256: correctness.observations_sha256,
        });
        append({ event: "controller_environment", attempt_id: attemptId, at: new Date().toISOString(), value: environment() });
        const processAggregates: number[] = [];
        for (let replicateIndex = 0; replicateIndex < value.protocol.replicate_count; replicateIndex++) {
            const seed = value.protocol.replicate_seeds_uint32[replicateIndex]!;
            const aggregate = await runReplicate(value, attemptId, replicateIndex, seed, correctness, append);
            processAggregates.push(aggregate);
        }
        const inference = processInference(processAggregates, value.protocol.t_critical_one_sided_95_df_29);
        append({ event: "inference", attempt_id: attemptId, at: new Date().toISOString(), value: inference });
        append({ event: "terminal", attempt_id: attemptId, at: new Date().toISOString(), status: "COMPLETE_FIRST_ATTEMPT" });
        qualification = inference.qualification;
    } catch (error) {
        failure = asError(error);
        try {
            append({
                event: "terminal", attempt_id: attemptId, at: new Date().toISOString(),
                status: "CONSUMED_FAILED_FIRST_ATTEMPT_ZERO_CREDIT",
                error_name: failure.name, error_message: failure.message,
            });
        } catch (persistenceError) {
            failure = new Error(`${failure.message}; failure evidence persistence also failed: ${asError(persistenceError).message}`);
        }
    } finally {
        try { close(); } catch (closeError) {
            failure ??= asError(closeError);
        }
    }
    if (failure) {
        process.stderr.write(`${failure.stack ?? failure.message}\n`);
        process.exitCode = 1;
    } else {
        process.stdout.write(`${JSON.stringify({ status: "COMPLETE", raw_path: value.attempt.raw_path, qualification })}\n`);
    }
}

async function workerLaunchSmoke(): Promise<unknown> {
    const child = fork(harnessPath, ["--loader-smoke-worker"], {
        cwd: mirrorRoot,
        execPath: process.execPath,
        execArgv: childExecArgv(),
        env: { ...process.env },
        stdio: ["ignore", "pipe", "pipe", "ipc"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout!.setEncoding("utf8");
    child.stderr!.setEncoding("utf8");
    child.stdout!.on("data", (chunk: string) => { stdout += chunk; });
    child.stderr!.on("data", (chunk: string) => { stderr += chunk; });
    const exit = await new Promise<{ code: number | null; signal: NodeJS.Signals | null }>((accept) => {
        child.once("close", (code, signal) => accept({ code, signal }));
    });
    if (exit.code !== 0 || exit.signal !== null || stderr !== "") fail("loader smoke child failed");
    const observed = JSON.parse(stdout) as Record<string, unknown>;
    if (canonical(observed["exec_argv"]) !== canonical(childExecArgv())) fail("loader smoke exec argv mismatch");
    return {
        schema: "value.pi.syntax-consume-number.g16.worker-launch-smoke/v1",
        status: "PASS_NO_TIMING_CHILD_STDERR_EMPTY",
        child_stderr_bytes: 0,
        child_exec_argv: observed["exec_argv"],
    };
}

function selfTest(value: Manifest): unknown {
    verifyBaseBindings(value, true);
    const rows = readJson<Case[]>(resolve(repoRoot, value.corpus.path));
    validateCorpus(rows, value);
    for (const seed of value.protocol.replicate_seeds_uint32) {
        assertPairedOrders(pairedOrders(seed ^ 0xa5a5_a5a5, value.protocol.warmup_blocks_per_order), 2);
        assertPairedOrders(pairedOrders(seed, value.protocol.sample_blocks_per_order), 6);
    }
    const fixture = processInference(Array.from({ length: 30 }, () => -0.1), value.protocol.t_critical_one_sided_95_df_29);
    if (fixture.df !== 29 || Math.abs(fixture.one_sided_95_upper_log_ratio - (-0.1)) > Number.EPSILON
        || fixture.qualification !== "PASS") {
        fail("process inference self-test failed");
    }
    const harnessPlaceholders = value.bindings.harness.files
        .filter((binding) => binding.sha256 === placeholder)
        .map((binding) => binding.path);
    const correctnessPlaceholder = value.correctness_evidence.sha256 === placeholder;
    return {
        schema: "value.pi.syntax-consume-number.g16.self-test/v1",
        status: harnessPlaceholders.length === 0 && !correctnessPlaceholder
            ? "PASS_FROZEN_STRUCTURE_NO_TIMING"
            : "PASS_STRUCTURE_NO_TIMING_PRE_TIMING_PLACEHOLDERS_ALLOWED",
        corpus_cases: rows.length,
        replicate_processes: value.protocol.replicate_count,
        warmup_blocks_per_process: value.protocol.warmup_blocks,
        sample_blocks_per_process: value.protocol.sample_blocks,
        total_retained_sample_blocks: value.protocol.replicate_count * value.protocol.sample_blocks,
        harness_placeholders: harnessPlaceholders,
        correctness_evidence_placeholder: correctnessPlaceholder,
    };
}

const manifest = readJson<Manifest>(manifestPath);

async function main(): Promise<void> {
    const command = process.argv[2];
    if (command === "--self-test" && process.argv.length === 3) {
        process.stdout.write(`${JSON.stringify(selfTest(manifest))}\n`);
    } else if (command === "--validate" && process.argv.length === 3) {
        verifyBaseBindings(manifest, true);
        const rows = readJson<Case[]>(resolve(repoRoot, manifest.corpus.path));
        validateCorpus(rows, manifest);
        process.stdout.write(`${JSON.stringify(semanticValidation(rows))}\n`);
    } else if (command === "--worker-launch-smoke" && process.argv.length === 3) {
        process.stdout.write(`${JSON.stringify(await workerLaunchSmoke())}\n`);
    } else if (command === "--loader-smoke-worker" && process.argv.length === 3) {
        process.stdout.write(`${JSON.stringify(environment())}\n`);
    } else if (command === "--run-first-attempt" && process.argv.length === 3) {
        await runFirstAttempt(manifest);
    } else if (command === "--worker" && process.argv.length === 5) {
        await worker(manifest, Number(process.argv[3]), Number(process.argv[4]));
    } else {
        fail("usage: benchmark.mts --self-test|--validate|--worker-launch-smoke|--run-first-attempt");
    }
}

await main();
