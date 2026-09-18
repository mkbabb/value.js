import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import { arch, availableParallelism, cpus, endianness, platform } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const featureId = "SYNTAX-CONSUME-NUMBER";
const generation = 4;
const seats = Object.freeze(["h", "b", "s", "d"]);
const orders = Object.freeze([
    Object.freeze(["h", "b", "d", "s"]),
    Object.freeze(["b", "s", "h", "d"]),
    Object.freeze(["s", "d", "b", "h"]),
    Object.freeze(["d", "h", "s", "b"]),
]);
const warmupRounds = 8;
const measuredRounds = 40;
const batchRepeats = 16;
const bootstrapResamples = 100_000;
const familywisePercentile = 0.9875;
const familywiseIndex = Math.ceil(familywisePercentile * bootstrapResamples) - 1;
const runnerFile = fileURLToPath(import.meta.url);
const schemaFile = resolve(dirname(runnerFile), "benchmark-receipt.schema.json");
const mask64 = (1n << 64n) - 1n;
const fnvOffset = 0xcbf29ce484222325n;
const fnvPrime = 0x100000001b3n;
const floatBytes = new ArrayBuffer(8);
const floatView = new DataView(floatBytes);
let retainedSink = 0n;

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const fold = (hash, value) => ((hash ^ (value & mask64)) * fnvPrime) & mask64;
const hex64 = (value) => value.toString(16).padStart(16, "0");

function captureFile(path, label) {
    const absolute = resolve(path);
    const canonical = realpathSync(absolute);
    const stat = lstatSync(canonical);
    if (canonical !== absolute || !stat.isFile() || stat.isSymbolicLink()) {
        throw new Error(`${label} is not one canonical regular file`);
    }
    return Object.freeze({ path: canonical, bytes: readFileSync(canonical) });
}

function closeFile(record) {
    if (realpathSync(record.path) !== record.path || !readFileSync(record.path).equals(record.bytes)) {
        throw new Error(`captured benchmark input changed before close: ${record.path}`);
    }
}

function exactKeys(value, expected, label) {
    if (value === null || typeof value !== "object" || Array.isArray(value)
        || JSON.stringify(Object.keys(value).sort()) !== JSON.stringify([...expected].sort())) {
        throw new Error(`${label} does not have the exact required keys`);
    }
}

function parseCorpus(record) {
    const corpus = JSON.parse(record.bytes.toString("utf8"));
    exactKeys(corpus, ["feature_id", "generation", "cases"], "corpus");
    if (corpus.feature_id !== featureId || corpus.generation !== generation
        || !Array.isArray(corpus.cases) || corpus.cases.length === 0) {
        throw new Error("benchmark corpus identity drift");
    }
    const ids = new Set();
    const cases = corpus.cases.map((item, index) => {
        exactKeys(item, ["id", "source", "offset"], `corpus case ${index}`);
        if (typeof item.id !== "string" || item.id.length === 0 || ids.has(item.id)
            || typeof item.source !== "string" || !Number.isSafeInteger(item.offset)
            || item.offset < 0 || item.offset > item.source.length) {
            throw new Error(`invalid benchmark corpus case ${index}`);
        }
        ids.add(item.id);
        return Object.freeze({ id: item.id, source: item.source, offset: item.offset });
    });
    return Object.freeze(cases);
}

async function loadBundle(record) {
    const url = `data:text/javascript;base64,${record.bytes.toString("base64")}#${sha256(record.bytes)}`;
    const bundle = await import(url);
    if (JSON.stringify(Object.keys(bundle).sort()) !== JSON.stringify(["candidates", "disableDiagnostics", "makeState"])) {
        throw new Error("benchmark bundle exports must be exactly candidates, disableDiagnostics, and makeState");
    }
    if (typeof bundle.makeState !== "function" || typeof bundle.disableDiagnostics !== "function") {
        throw new Error("benchmark bundle state/diagnostics exports are not functions");
    }
    exactKeys(bundle.candidates, seats, "benchmark candidates");
    for (const seat of seats) {
        if (bundle.candidates[seat] === null || typeof bundle.candidates[seat] !== "object"
            || typeof bundle.candidates[seat].call !== "function") {
            throw new Error(`benchmark candidate ${seat} lacks parser.call`);
        }
    }
    return bundle;
}

function observe(hash, caseIndex, state) {
    hash = fold(hash, BigInt(caseIndex + 1));
    hash = fold(hash, state.isError === true ? 1n : 0n);
    hash = fold(hash, BigInt(state.offset));
    if (state.isError === true) return fold(hash, 0xffffffffffffffffn);
    const leaf = state.value;
    if (leaf === null || typeof leaf !== "object") throw new Error("timed parser returned no semantic leaf");
    floatView.setFloat64(0, leaf.value, false);
    hash = fold(hash, floatView.getBigUint64(0, false));
    hash = fold(hash, leaf.type === "integer" ? 1n : leaf.type === "number" ? 2n : 0xffn);
    hash = fold(hash, leaf.sign === null ? 0n : leaf.sign === "+" ? 1n : leaf.sign === "-" ? 2n : 0xffn);
    return hash;
}

function execute(parser, makeState, cases, repeats) {
    let digest = fnvOffset;
    for (let repeat = 0; repeat < repeats; repeat += 1) {
        for (let index = 0; index < cases.length; index += 1) {
            const item = cases[index];
            const state = makeState(item.source, item.offset);
            const returned = parser.call(state);
            if (returned !== state || !Number.isSafeInteger(state.offset)) {
                throw new Error("timed parser returned a different or invalid state");
            }
            digest = observe(digest, index, state);
        }
    }
    retainedSink ^= digest;
    return digest;
}

function xorshift32(seed) {
    let value = seed >>> 0;
    return () => {
        value ^= value << 13;
        value ^= value >>> 17;
        value ^= value << 5;
        return value >>> 0;
    };
}

function geometricMeanLogRatios(samples, candidate, peer, indices = null) {
    let sum = 0;
    const count = indices === null ? samples.length : indices.length;
    for (let index = 0; index < count; index += 1) {
        const round = samples[indices === null ? index : indices[index]];
        sum += Math.log(Number(round.nanoseconds[candidate]) / Number(round.nanoseconds[peer]));
    }
    return Math.exp(sum / count);
}

function statistics(samples, seed, resamples = bootstrapResamples) {
    const random = xorshift32(seed);
    const output = {};
    const percentileIndex = resamples === bootstrapResamples
        ? familywiseIndex
        : Math.ceil(familywisePercentile * resamples) - 1;
    for (const candidate of seats) {
        const peers = seats.filter((seat) => seat !== candidate);
        const pairGeometricMeanRatio = Object.fromEntries(
            peers.map((peer) => [peer, geometricMeanLogRatios(samples, candidate, peer)]),
        );
        const maxima = new Float64Array(resamples);
        const indices = new Uint8Array(samples.length);
        for (let sample = 0; sample < resamples; sample += 1) {
            for (let index = 0; index < samples.length; index += 1) {
                indices[index] = Math.floor((random() / 0x1_0000_0000) * samples.length);
            }
            let maximum = -Infinity;
            for (const peer of peers) {
                maximum = Math.max(maximum, geometricMeanLogRatios(samples, candidate, peer, indices));
            }
            maxima[sample] = maximum;
        }
        maxima.sort();
        const upper = maxima[percentileIndex];
        output[candidate] = Object.freeze({
            pair_geometric_mean_ratio: pairGeometricMeanRatio,
            simultaneous_familywise_upper_ratio: upper,
            every_peer_strict_win: upper < 1 && Object.values(pairGeometricMeanRatio).every((ratio) => ratio < 1),
        });
    }
    const winners = seats.filter((seat) => output[seat].every_peer_strict_win);
    if (winners.length > 1) throw new Error("statistic produced multiple strict winners");
    return Object.freeze({
        method: "paired log-ratio geometric mean; shared-index bootstrap maximum over three peers; Bonferroni 0.05/4 candidate-family alpha",
        resamples,
        seed,
        familywise_percentile: familywisePercentile,
        percentile_rule: "sort ascending; index ceil(p*N)-1; no interpolation",
        candidates: output,
        winner: winners[0] ?? null,
    });
}

function assertSchedule() {
    for (const rounds of [warmupRounds, measuredRounds]) {
        if (rounds % seats.length !== 0) throw new Error("round count is not a multiple of four");
        const positionCounts = Object.fromEntries(seats.map((seat) => [seat, [0, 0, 0, 0]]));
        const adjacency = new Map();
        for (let round = 0; round < rounds; round += 1) {
            const order = orders[round % orders.length];
            order.forEach((seat, position) => { positionCounts[seat][position] += 1; });
            for (let index = 0; index < order.length - 1; index += 1) {
                const key = `${order[index]}>${order[index + 1]}`;
                adjacency.set(key, (adjacency.get(key) ?? 0) + 1);
            }
        }
        const perPosition = rounds / seats.length;
        if (Object.values(positionCounts).some((counts) => counts.some((count) => count !== perPosition))
            || adjacency.size !== 12
            || [...adjacency.values()].some((count) => count !== perPosition)) {
            throw new Error("four-seat Williams schedule is not position/adjoining-pair balanced");
        }
    }
}

function environment() {
    const cpuList = cpus();
    return Object.freeze({
        node: process.version,
        v8: process.versions.v8,
        uv: process.versions.uv,
        platform: platform(),
        arch: arch(),
        endianness: endianness(),
        cpu_model: cpuList[0]?.model ?? "UNKNOWN",
        logical_cpu_count: cpuList.length,
        available_parallelism: availableParallelism(),
        exec_argv: [...process.execArgv],
        pid: process.pid,
        timer: "process.hrtime.bigint",
        process_model: "one fresh process; all four seats share one captured self-contained bundle and one runtime",
    });
}

function policy(seed) {
    return Object.freeze({
        seats,
        orders,
        warmup_rounds: warmupRounds,
        measured_rounds: measuredRounds,
        batch_repeats: batchRepeats,
        bootstrap_resamples: bootstrapResamples,
        bootstrap_seed: seed,
        familywise_percentile: familywisePercentile,
        familywise_index: familywiseIndex,
        diagnostics: "disableDiagnostics immediately before preflight and before every round",
        gc: "require --expose-gc; call globalThis.gc twice before every warmup and measured round, outside timing",
        cases: "corpus strings, including hostile strings, are fully materialized before preflight/timing; fixed stored order",
        timed_operation: "for each case allocate state, call parser once, and fold O(1) case-index/error/offset/binary64/type/sign observations into one retained 64-bit FNV-1a digest",
        timed_exclusions: "no source slice, representation hash, corpus materialization, diagnostics toggle, GC, import, calibration, or correctness oracle",
        batching: "fixed 16 complete-corpus repeats; no calibration",
        failure: "any throw, invalid state, digest disagreement, nonpositive timer, or changed input aborts without a receipt; attempt_id is retired and no retry may replace it",
        allocation: "not measured and wholly non-adjudicative",
    });
}

async function run(attemptId, seedText, corpusPath, bundlePath) {
    if (!/^[A-Za-z0-9._-]+$/.test(attemptId)) throw new Error("attempt_id must be nonempty ASCII [A-Za-z0-9._-]");
    if (!/^[1-9][0-9]*$/.test(seedText)) throw new Error("bootstrap seed must be a nonzero decimal uint32");
    const seed = Number(seedText);
    if (!Number.isSafeInteger(seed) || seed > 0xffff_ffff) throw new Error("bootstrap seed exceeds uint32");
    if (JSON.stringify(process.execArgv) !== JSON.stringify(["--expose-gc"]) || typeof globalThis.gc !== "function") {
        throw new Error("benchmark run requires exact process flag --expose-gc and no other execArgv");
    }
    assertSchedule();
    const runnerRecord = captureFile(runnerFile, "benchmark runner");
    const schemaRecord = captureFile(schemaFile, "benchmark schema");
    JSON.parse(schemaRecord.bytes.toString("utf8"));
    const corpusRecord = captureFile(corpusPath, "materialized benchmark corpus");
    const bundleRecord = captureFile(bundlePath, "self-contained four-seat benchmark bundle");
    const cases = parseCorpus(corpusRecord);
    const bundle = await loadBundle(bundleRecord);
    bundle.disableDiagnostics();
    const preflight = Object.fromEntries(seats.map((seat) => [
        seat,
        hex64(execute(bundle.candidates[seat], bundle.makeState, cases, 1)),
    ]));
    if (new Set(Object.values(preflight)).size !== 1) throw new Error("candidate preflight observation digests disagree");
    let timedDigest;
    for (let round = 0; round < warmupRounds; round += 1) {
        globalThis.gc();
        globalThis.gc();
        bundle.disableDiagnostics();
        for (const seat of orders[round % orders.length]) {
            const digest = hex64(execute(bundle.candidates[seat], bundle.makeState, cases, batchRepeats));
            timedDigest ??= digest;
            if (digest !== timedDigest) throw new Error("warmup observation digests disagree");
        }
    }
    const samples = [];
    for (let round = 0; round < measuredRounds; round += 1) {
        globalThis.gc();
        globalThis.gc();
        bundle.disableDiagnostics();
        const order = orders[round % orders.length];
        const nanoseconds = {};
        const digests = {};
        for (const seat of order) {
            const start = process.hrtime.bigint();
            const digest = hex64(execute(bundle.candidates[seat], bundle.makeState, cases, batchRepeats));
            const elapsed = process.hrtime.bigint() - start;
            if (elapsed <= 0n || digest !== timedDigest) throw new Error("measured timer/digest failure");
            nanoseconds[seat] = elapsed.toString();
            digests[seat] = digest;
        }
        samples.push(Object.freeze({ round, order, nanoseconds, digests }));
    }
    const stats = statistics(samples, seed);
    closeFile(bundleRecord);
    closeFile(corpusRecord);
    closeFile(schemaRecord);
    closeFile(runnerRecord);
    return Object.freeze({
        schema_version: "syntax-consume-number.g4.benchmark/v1",
        feature_id: featureId,
        generation,
        attempt_id: attemptId,
        runner: {
            sha256: sha256(runnerRecord.bytes), bytes: runnerRecord.bytes.length,
            schema_sha256: sha256(schemaRecord.bytes), schema_bytes: schemaRecord.bytes.length,
        },
        inputs: {
            bundle_sha256: sha256(bundleRecord.bytes), bundle_bytes: bundleRecord.bytes.length,
            corpus_sha256: sha256(corpusRecord.bytes), corpus_bytes: corpusRecord.bytes.length,
            case_count: cases.length,
        },
        environment: environment(),
        policy: policy(seed),
        preflight_digest: Object.values(preflight)[0],
        samples,
        statistics: {
            method: stats.method,
            resamples: stats.resamples,
            seed: stats.seed,
            familywise_percentile: stats.familywise_percentile,
            percentile_rule: stats.percentile_rule,
            candidates: stats.candidates,
        },
        winner: stats.winner,
        allocation: { status: "NON_ADJUDICATIVE_NOT_MEASURED" },
        claims: "TIMING_RECEIPT_ONLY_NO_FEATURE_PARSER_INTEGRATION_OR_PRODUCTION_CREDIT",
    });
}

export function selfCheck() {
    assertSchedule();
    JSON.parse(readFileSync(schemaFile, "utf8"));
    const hostile = "9".repeat(32_768);
    const cases = Object.freeze([
        Object.freeze({ id: "self-short", source: "-0;", offset: 0 }),
        Object.freeze({ id: "self-hostile", source: hostile, offset: 0 }),
    ]);
    const makeState = (source, offset) => ({ source, offset, isError: false, value: undefined });
    const parser = {
        call(state) {
            state.offset = state.source.length;
            state.value = { value: state.source.startsWith("-") ? -0 : Infinity, type: "integer", sign: state.source.startsWith("-") ? "-" : null };
            return state;
        },
    };
    const digestA = execute(parser, makeState, cases, 2);
    const digestB = execute(parser, makeState, cases, 2);
    if (digestA !== digestB) throw new Error("O(1) observation-fold self-check is not deterministic");
    const factors = { h: 90n, b: 100n, s: 110n, d: 120n };
    const samples = Array.from({ length: measuredRounds }, (_, round) => ({
        round,
        order: orders[round % orders.length],
        nanoseconds: Object.fromEntries(seats.map((seat) => [seat, factors[seat].toString()])),
        digests: Object.fromEntries(seats.map((seat) => [seat, "0000000000000001"])),
    }));
    const result = statistics(samples, 0x564e554d, 2_000);
    if (result.winner !== "h") throw new Error("synthetic strict-winner self-check failed");
    return {
        featureId, generation, seats, orders, warmupRounds, measuredRounds,
        batchRepeats, bootstrapResamples, familywisePercentile, familywiseIndex,
        syntheticWinner: result.winner,
        syntheticDigest: hex64(digestA),
        observation: "O(1), preallocated Float64 DataView, no source slicing/hashing",
        retainedSink: hex64(retainedSink),
    };
}

if (resolve(process.argv[1] ?? "") === runnerFile) {
    if (process.argv[2] === "--self-check" && process.argv.length === 3) {
        process.stdout.write(`${JSON.stringify(selfCheck(), null, 2)}\n`);
    } else if (process.argv[2] === "--run" && process.argv.length === 7) {
        process.stdout.write(`${JSON.stringify(await run(process.argv[3], process.argv[4], process.argv[5], process.argv[6]), null, 2)}\n`);
    } else {
        throw new Error("usage: benchmark-runner.mjs --self-check | --run <attempt-id> <bootstrap-seed-uint32> <materialized-corpus.json> <self-contained-four-seat-bundle.mjs>");
    }
}
