import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, readlinkSync, statSync } from "node:fs";
import { cpus, totalmem } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { isMainThread, parentPort, Worker, workerData } from "node:worker_threads";

type Sign = "+" | "-" | null;
type NumberType = "integer" | "number";
type Leaf = { sign: Sign; type: NumberType; value: number };
type Row = { id: string; raw: string; binary64_be_hex: string; sign: Sign; type: NumberType };
type Task = Row & { source: string; offset: number; end: number };
type Observation = { end: number; leaf: Leaf };
type Lane = { id: string; run: (task: Task, gate: boolean) => Observation };

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../../../../../../../../..");
const manifestPath = resolve(here, "benchmark-manifest.json");
const harnessPath = fileURLToPath(import.meta.url);
const fail = (message: string): never => { throw new Error(message); };
const sha256 = (bytes: string | Buffer): string => createHash("sha256").update(bytes).digest("hex");
const hashFile = (path: string): string => sha256(readFileSync(path));
const json = (path: string): any => JSON.parse(readFileSync(path, "utf8"));
const canonical = (value: any): string => value === null || typeof value !== "object"
    ? JSON.stringify(value)
    : Array.isArray(value)
        ? `[${value.map(canonical).join(",")}]`
        : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;

function treeLedger(base: string) {
    const rows: string[] = [];
    const visit = (directory: string) => {
        for (const name of readdirSync(directory).sort()) {
            const path = join(directory, name);
            const stat = lstatSync(path);
            const pathRel = relative(base, path).split(sep).join("/");
            if (stat.isDirectory()) visit(path);
            else if (stat.isSymbolicLink()) rows.push(`L  ${pathRel}  ${readlinkSync(path)}\n`);
            else if (stat.isFile()) rows.push(`F  ${hashFile(path)}  ${stat.size}  ${(stat.mode & 0o777).toString(8).padStart(4, "0")}  ${pathRel}\n`);
            else fail(`unsupported runtime entry ${path}`);
        }
    };
    visit(base);
    const ledger = rows.join("");
    return { files_or_links: rows.length, bytes: Buffer.byteLength(ledger), ledger_sha256: sha256(ledger) };
}

function verifyBindings(manifest: any) {
    if (manifest.status !== "FROZEN_PRE_TIMING_NO_RESULT") fail("manifest is not frozen pre-timing authority");
    if (process.version !== manifest.bindings.runtime.node.version) fail("Node version mismatch");
    if (process.execPath !== manifest.bindings.runtime.node.path) fail("Node executable path mismatch");
    if (hashFile(process.execPath) !== manifest.bindings.runtime.node.sha256) fail("Node executable hash mismatch");
    const groups = ["authority", "candidates", "peers", "runtime", "provenance", "harness"];
    for (const group of groups) for (const row of manifest.bindings[group].files ?? []) {
        const path = row.path.startsWith("/") ? row.path : resolve(repoRoot, row.path);
        const stat = statSync(path);
        if (hashFile(path) !== row.sha256 || stat.size !== row.bytes) fail(`${group} binding mismatch: ${row.path}`);
        if (row.mode !== undefined && (stat.mode & 0o777).toString(8).padStart(4, "0") !== row.mode) fail(`${group} mode mismatch: ${row.path}`);
    }
    for (const row of manifest.bindings.runtime.trees) {
        const actual = treeLedger(resolve(repoRoot, row.path));
        if (canonical(actual) !== canonical(row.ledger)) fail(`runtime tree binding mismatch: ${row.path}`);
    }
    if (hashFile(harnessPath) !== manifest.bindings.harness.sha256) fail("harness hash mismatch");
    const corpusBytes = Buffer.from(`${canonical(manifest.corpus.value)}\n`);
    if (sha256(corpusBytes) !== manifest.corpus.sha256 || corpusBytes.length !== manifest.corpus.bytes) fail("corpus hash mismatch");
}

const bits = (value: number): string => {
    const bytes = Buffer.allocUnsafe(8);
    bytes.writeDoubleBE(value, 0);
    return bytes.toString("hex");
};

function assertMutableLeaf(id: string, actual: unknown, expected: Leaf) {
    if (typeof actual !== "object" || actual === null || Object.getPrototypeOf(actual as object) !== Object.prototype) fail(`${id}: leaf prototype mismatch`);
    const object = actual as object;
    if (Object.isFrozen(object) || Object.isSealed(object) || !Object.isExtensible(object)) fail(`${id}: leaf is not ordinary mutable data`);
    if (JSON.stringify(Reflect.ownKeys(object)) !== JSON.stringify(["sign", "type", "value"])) fail(`${id}: leaf key mismatch`);
    const descriptors = Object.getOwnPropertyDescriptors(object) as Record<string, PropertyDescriptor>;
    for (const [key, value] of Object.entries(expected)) {
        const descriptor = descriptors[key];
        if (!descriptor || descriptor.enumerable !== true || descriptor.configurable !== true || descriptor.writable !== true
            || !Object.hasOwn(descriptor, "value") || descriptor.get !== undefined || descriptor.set !== undefined
            || !Object.is(descriptor.value, value)) fail(`${id}: leaf descriptor/value mismatch for ${key}`);
    }
}

function extract(task: Task): string {
    if (task.offset < 0 || task.end < task.offset || task.end > task.source.length) fail(`${task.id}: invalid task bounds`);
    return task.source.slice(task.offset, task.end);
}

function normalize(task: Task, token: string, localEnd: number, value: number): Observation {
    if (localEnd !== token.length) fail(`${task.id}: incomplete intrinsic consumption`);
    const leaf: Leaf = { sign: task.sign, type: task.type, value };
    return { end: task.offset + localEnd, leaf };
}

async function loadLanes(): Promise<Lane[]> {
    const [{ ParserState }, h, b, s, d, deposedModule, { build }] = await Promise.all([
        import("@mkbabb/parse-that/core"),
        import("./candidates/h/index.ts"),
        import("./candidates/b/index.ts"),
        import("./candidates/s/index.ts"),
        import("./candidates/d/index.ts"),
        import("../g7/authorities/historical-utils.ts"),
        import("esbuild"),
    ]);

    const candidateLane = (id: string, parser: any): Lane => ({
        id,
        run(task, gate) {
            const token = extract(task);
            const state = new ParserState<any>(token, undefined, 0);
            parser.call(state);
            if (state.isError || state.offset !== token.length || typeof state.value?.value !== "number") fail(`${id}/${task.id}: candidate parse failure`);
            if (gate) assertMutableLeaf(`${id}/${task.id}/intrinsic`, state.value, { sign: task.sign, type: task.type, value: state.value.value });
            return normalize(task, token, state.offset, state.value.value);
        },
    });

    const liveEntry = resolve(repoRoot, "src/css/grammar.ts");
    const parseThatEntry = resolve(here, "../../../node_modules/@mkbabb/parse-that/dist/parse.js");
    const [liveAdapter, c14Adapter] = await Promise.all([
        build({
            bundle: true,
            format: "esm",
            platform: "node",
            target: "node22",
            write: false,
            stdin: {
                resolveDir: repoRoot,
                sourcefile: "g14-live-adapter.mts",
                loader: "ts",
                contents: `
                    import { parseCssScalar } from ${JSON.stringify(liveEntry)};
                    export function run(raw) {
                        const result = parseCssScalar(raw);
                        return !result.ok || result.value.kind !== "scalar" || result.value.payload.type !== "number" || result.value.payload.unit !== ""
                            ? { ok: false }
                            : { ok: true, value: result.value.payload.value };
                    }
                `,
            },
        }),
        build({
            bundle: true,
            format: "esm",
            platform: "node",
            target: "node22",
            write: false,
            alias: { "@mkbabb/parse-that": parseThatEntry },
            stdin: {
                resolveDir: repoRoot,
                sourcefile: "g14-c14-adapter.mts",
                loader: "ts",
                contents: `
                    import { ParserState } from ${JSON.stringify(parseThatEntry)};
                    import { numberValue } from ${JSON.stringify(resolve(repoRoot, "docs/tranches/V/vnext/prototypes/c14-css/src/css/grammar/l4/value-unit.ts"))};
                    export function run(raw) {
                        const state = new ParserState(raw, undefined, 0);
                        numberValue.call(state);
                        return state.isError ? { ok: false, end: state.offset } : { ok: true, end: state.offset, value: state.value.value };
                    }
                `,
            },
        }),
    ]);
    const liveUrl = `data:text/javascript;base64,${Buffer.from(liveAdapter.outputFiles[0]!.contents).toString("base64")}`;
    const liveModule: { run: (raw: string) => { ok: boolean; value?: number } } = await import(liveUrl);
    const live: Lane = {
        id: "live_regex",
        run(task) {
            const token = extract(task);
            const result = liveModule.run(token);
            if (!result.ok || typeof result.value !== "number") return fail(`live_regex/${task.id}: production parse failure`);
            return normalize(task, token, token.length, result.value);
        },
    };

    const deposed: Lane = {
        id: "deposed",
        run(task) {
            const token = extract(task);
            const state = new ParserState<any>(token, undefined, 0);
            deposedModule.number.call(state);
            if (state.isError || typeof state.value !== "number") fail(`deposed/${task.id}: parser failure`);
            return normalize(task, token, state.offset, state.value);
        },
    };

    const c14Url = `data:text/javascript;base64,${Buffer.from(c14Adapter.outputFiles[0]!.contents).toString("base64")}`;
    const c14Module: { run: (raw: string) => { ok: boolean; end: number; value?: number } } = await import(c14Url);
    const c14: Lane = {
        id: "c14",
        run(task) {
            const token = extract(task);
            const result = c14Module.run(token);
            if (!result.ok || typeof result.value !== "number") fail(`c14/${task.id}: parser failure`);
            return normalize(task, token, result.end, result.value!);
        },
    };

    return [
        candidateLane("h", h.consumeNumber),
        candidateLane("b", b.consumeNumber),
        candidateLane("s", s.consumeNumber),
        candidateLane("d", d.consumeNumber),
        live,
        deposed,
        c14,
    ];
}

function taskRows(manifest: any): Task[] {
    const { prefix, suffix, rows } = manifest.corpus.value;
    return (rows as Row[]).map((row) => ({
        ...row,
        source: `${prefix}${row.raw}${suffix}`,
        offset: prefix.length,
        end: prefix.length + row.raw.length,
    }));
}

function correctnessGate(lanes: Lane[], tasks: Task[]) {
    for (const lane of lanes) for (const task of tasks) {
        const observation = lane.run(task, true);
        const expected: Leaf = { sign: task.sign, type: task.type, value: observation.leaf.value };
        if (observation.end !== task.end || bits(observation.leaf.value) !== task.binary64_be_hex) fail(`${lane.id}/${task.id}: correctness mismatch`);
        assertMutableLeaf(`${lane.id}/${task.id}/normalized`, observation.leaf, expected);
    }
    return Object.fromEntries(lanes.map((lane) => [lane.id, `PASS_${tasks.length}_OF_${tasks.length}_EXACT_LEAF_END_AND_BINARY64`]));
}

let blackhole = 0;
function workload(lane: Lane, tasks: Task[], repetitions: number): number {
    let sink = 0;
    for (let repetition = 0; repetition < repetitions; repetition++) for (let index = 0; index < tasks.length; index++) {
        const observation = lane.run(tasks[index]!, false);
        const leaf = observation.leaf;
        sink += Math.abs(leaf.value) * ((index % 7) + 1) + observation.end + (leaf.sign === "-" ? 2 : 1) + (leaf.type === "number" ? 4 : 3);
    }
    blackhole += sink;
    return sink;
}

const mean = (values: number[]): number => values.reduce((sum, value) => sum + value, 0) / values.length;
function pairedRule(candidate: number[], peer: number[], critical: number) {
    const differences = candidate.map((value, index) => Math.log(value) - Math.log(peer[index]!));
    const center = mean(differences);
    const variance = differences.reduce((sum, value) => sum + (value - center) ** 2, 0) / (differences.length - 1);
    const upper = center + critical * Math.sqrt(variance / differences.length);
    return {
        samples: differences.length,
        mean_log_ratio: center,
        standard_deviation_log_ratio: Math.sqrt(variance),
        one_sided_95_upper_log_ratio: upper,
        geometric_mean_ratio: Math.exp(center),
        one_sided_95_upper_ratio: Math.exp(upper),
        pass_strict_candidate_lt_peer: upper < 0,
    };
}

async function execute(mode: "validate" | "run", manifest: any) {
    const lanes = await loadLanes();
    const tasks = taskRows(manifest);
    const validation = correctnessGate(lanes, tasks);
    if (mode === "validate") return {
        schema: "value.pi.syntax-consume-number.g14.benchmark-validation/v1",
        status: "PASS_CORRECTNESS_ONLY_NO_TIMING_EXECUTED",
        validation,
        corpus_sha256: manifest.corpus.sha256,
        harness_sha256: manifest.bindings.harness.sha256,
    };

    const protocol = manifest.protocol;
    for (let round = 0; round < protocol.warmup_rounds; round++) {
        const start = round % lanes.length;
        const order = [...lanes.slice(start), ...lanes.slice(0, start)];
        for (const lane of order) workload(lane, tasks, protocol.warmup_repetitions);
    }

    const samples = Object.fromEntries(lanes.map((lane) => [lane.id, [] as number[]])) as Record<string, number[]>;
    const checksums = Object.fromEntries(lanes.map((lane) => [lane.id, [] as number[]])) as Record<string, number[]>;
    const orders: string[][] = [];
    for (let trial = 0; trial < protocol.trials; trial++) {
        const start = trial % lanes.length;
        const order = [...lanes.slice(start), ...lanes.slice(0, start)];
        orders.push(order.map((lane) => lane.id));
        for (const lane of order) {
            const before = process.hrtime.bigint();
            const checksum = workload(lane, tasks, protocol.repetitions_per_trial);
            const elapsed = Number(process.hrtime.bigint() - before);
            samples[lane.id]!.push(elapsed);
            checksums[lane.id]!.push(checksum);
        }
    }
    if (!Number.isFinite(blackhole)) fail("non-finite benchmark blackhole");
    const reference = checksums[lanes[0]!.id]!;
    for (const lane of lanes) for (let trial = 0; trial < protocol.trials; trial++) {
        if (!Object.is(checksums[lane.id]![trial], reference[trial])) fail(`${lane.id}: timed checksum mismatch`);
    }

    const comparisons: Record<string, Record<string, ReturnType<typeof pairedRule>>> = {};
    for (const candidate of ["h", "b", "s", "d"]) {
        comparisons[candidate] = {};
        for (const peer of ["live_regex", "deposed", "c14"]) {
            comparisons[candidate]![peer] = pairedRule(samples[candidate]!, samples[peer]!, protocol.statistics.t_critical_one_sided_95_df_20);
        }
    }
    const qualification = Object.fromEntries(Object.entries(comparisons).map(([candidate, peers]) => [
        candidate,
        Object.values(peers).every((comparison) => comparison.pass_strict_candidate_lt_peer)
            ? "PASS_STRICTLY_FASTER_THAN_ALL_THREE_PEERS"
            : "FAIL_NOT_STRICTLY_FASTER_THAN_ALL_THREE_PEERS",
    ]));

    return {
        schema: "value.pi.syntax-consume-number.g14.benchmark-result/v1",
        status: "TIMING_COMPLETE_CORRECTNESS_GATED_PROTOTYPE_EVIDENCE",
        manifest_sha256: hashFile(manifestPath),
        harness_sha256: manifest.bindings.harness.sha256,
        corpus_sha256: manifest.corpus.sha256,
        validation,
        protocol,
        environment: {
            node: process.version,
            v8: process.versions.v8,
            platform: process.platform,
            arch: process.arch,
            cpu_model: cpus()[0]?.model ?? "UNKNOWN",
            logical_cpus: cpus().length,
            total_memory_bytes: totalmem(),
            exec_argv: process.execArgv,
        },
        round_robin_orders: orders,
        samples_elapsed_ns: samples,
        comparisons,
        qualification,
        allocation_evidence: manifest.allocation_evidence,
    };
}

async function bounded(mode: "validate" | "run", manifest: any): Promise<any> {
    const worker = new Worker(new URL(import.meta.url), { workerData: { mode } });
    return await new Promise((accept, reject) => {
        const timer = setTimeout(() => {
            void worker.terminate();
            reject(new Error(`${mode} worker exceeded ${manifest.execution.worker_timeout_ms} ms and was terminated`));
        }, manifest.execution.worker_timeout_ms);
        worker.once("message", (message) => {
            clearTimeout(timer);
            void worker.terminate();
            message.ok ? accept(message.value) : reject(new Error(message.error));
        });
        worker.once("error", (error) => { clearTimeout(timer); reject(error); });
        worker.once("exit", (code) => { if (code !== 0) { clearTimeout(timer); reject(new Error(`worker exited ${code}`)); } });
    });
}

if (isMainThread) {
    const arg = process.argv[2];
    if (process.argv.length !== 3 || (arg !== "--validate" && arg !== "--run")) fail("usage: benchmark.mts --validate|--run");
    const manifest = json(manifestPath);
    verifyBindings(manifest);
    const value = await bounded(arg === "--validate" ? "validate" : "run", manifest);
    process.stdout.write(`${JSON.stringify(value)}\n`);
} else {
    try {
        const manifest = json(manifestPath);
        verifyBindings(manifest);
        parentPort!.postMessage({ ok: true, value: await execute(workerData.mode, manifest) });
    } catch (error) {
        parentPort!.postMessage({ ok: false, error: error instanceof Error ? error.stack ?? error.message : String(error) });
    }
}
