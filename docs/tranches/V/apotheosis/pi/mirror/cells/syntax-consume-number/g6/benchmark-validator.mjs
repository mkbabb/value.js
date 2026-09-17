import { createHash } from "node:crypto";
import { closeSync, existsSync, fsyncSync, mkdirSync, mkdtempSync, openSync, readFileSync, rmSync, writeFileSync, writeSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const cellRoot = dirname(fileURLToPath(import.meta.url));
const featureId = "SYNTAX-CONSUME-NUMBER";
const generation = 6;
const candidateKeys = Object.freeze(["h", "b", "s", "d"]);
const comparatorKeys = Object.freeze(["live-regex", "deposed", "c14"]);
const peerKeys = Object.freeze([...candidateKeys, ...comparatorKeys]);
const comparatorRegistry = Object.freeze({
    "live-regex": "c73c8ff2ca2da3ed9bcd7b2016ef00aba0416a79d1787d88943fc3ab0bdccad0",
    "deposed": "6c62368f6b4e6c1c28e6c0542bc86004c243fba6bb6d70ac0bba8435a81618eb",
    "c14": "2b57626fff0975276f7d46d84ffc01835bc83bfe4f28ce6b5855622f6a22f0d6",
});
const shaPattern = /^[0-9a-f]{64}$/;

function fail(message) { throw new Error(message); }
function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function identity(bytes) { return { sha256: sha256(bytes), bytes: bytes.length }; }
function parseJson(bytes, label) { try { return JSON.parse(bytes.toString("utf8")); } catch (error) { fail(`${label} is not JSON: ${String(error)}`); } }
function object(value, label) { if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be an object`); return value; }
function exactKeys(value, keys, label) { object(value, label); const actual = Object.keys(value).sort(); const expected = [...keys].sort(); if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${label} keys mismatch: ${actual.join(",")}`); }
function nonempty(value, label) { if (typeof value !== "string" || value.length === 0) fail(`${label} must be nonempty`); }
function hash(value, label) { if (typeof value !== "string" || !shaPattern.test(value)) fail(`${label} must be lowercase SHA-256`); }
function positive(value, label) { if (!Number.isInteger(value) || value < 1) fail(`${label} must be a positive integer`); }
function identityRow(value, label) { exactKeys(value, ["sha256", "bytes"], label); hash(value.sha256, `${label}.sha256`); positive(value.bytes, `${label}.bytes`); }
function hashMap(value, keys, label) { exactKeys(value, keys, label); for (const key of keys) hash(value[key], `${label}.${key}`); }
function timestamp(value, label) { nonempty(value, label); if (!Number.isFinite(Date.parse(value))) fail(`${label} must be an ISO date-time`); }
function nullableHash(value, label) { if (value !== null) hash(value, label); }
function assertUnder(root, path, label) { const absolute = resolve(root, path); if (absolute !== root && !absolute.startsWith(`${root}${sep}`)) fail(`${label} escapes evidence root`); return absolute; }

function verifySchemas() {
    const expected = {
        "benchmark-run-manifest.schema.json": "urn:value-js:syntax-consume-number:g6:benchmark-run-manifest",
        "benchmark-receipt.schema.json": "urn:value-js:syntax-consume-number:g6:benchmark-receipt",
    };
    for (const [path, id] of Object.entries(expected)) {
        const schema = parseJson(readFileSync(join(cellRoot, path)), path);
        if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema" || schema.$id !== id || schema.type !== "object" || schema.additionalProperties !== false) fail(`${path} exact schema identity mismatch`);
    }
}

function validateManifest(manifest) {
    exactKeys(manifest, ["feature_id", "generation", "status", "attempt_id", "pre_author_receipt", "operation", "candidates", "correctness", "comparators", "schedule", "environment", "evidence_paths", "sealed_at"], "benchmark run manifest");
    if (manifest.feature_id !== featureId || manifest.generation !== generation || manifest.status !== "SEALED_BEFORE_FIRST_TIMING") fail("benchmark manifest identity/status mismatch");
    if (!/^[a-z0-9][a-z0-9._-]{0,79}$/.test(manifest.attempt_id)) fail("benchmark attempt_id invalid");
    identityRow(manifest.pre_author_receipt, "benchmark pre-author receipt");
    exactKeys(manifest.operation, ["feature_row_sha256", "public_corpus_sha256", "revealed_holdout_corpus_sha256", "normalized_observations_sha256", "throughput_unit"], "benchmark operation");
    for (const key of ["feature_row_sha256", "public_corpus_sha256", "revealed_holdout_corpus_sha256", "normalized_observations_sha256"]) hash(manifest.operation[key], `benchmark operation.${key}`);
    if (manifest.operation.throughput_unit !== "UTF16_CODE_UNITS_PER_SECOND") fail("benchmark throughput unit mismatch");
    if (!Array.isArray(manifest.candidates) || manifest.candidates.length !== 4) fail("benchmark candidate count mismatch");
    for (const [index, row] of manifest.candidates.entries()) {
        exactKeys(row, ["seat", "source_sha256", "author_receipt_sha256", "build_manifest_sha256", "bundle_sha256", "export"], `benchmark candidate ${index}`);
        if (row.seat !== candidateKeys[index] || row.export !== "consumeNumber") fail("benchmark candidate seat/export order mismatch");
        for (const key of ["source_sha256", "author_receipt_sha256", "build_manifest_sha256", "bundle_sha256"]) hash(row[key], `benchmark candidate ${row.seat}.${key}`);
    }
    if (new Set(manifest.candidates.map((row) => row.source_sha256)).size !== 4 || new Set(manifest.candidates.map((row) => row.author_receipt_sha256)).size !== 4) fail("benchmark candidates are not exact distinct admitted sources/receipts");
    exactKeys(manifest.correctness, ["public_green_receipts", "holdout_green_receipts", "expected_public_observations_sha256", "expected_holdout_observations_sha256"], "benchmark correctness");
    hashMap(manifest.correctness.public_green_receipts, candidateKeys, "public green receipts");
    hashMap(manifest.correctness.holdout_green_receipts, candidateKeys, "holdout green receipts");
    hash(manifest.correctness.expected_public_observations_sha256, "expected public observations"); hash(manifest.correctness.expected_holdout_observations_sha256, "expected holdout observations");
    if (!Array.isArray(manifest.comparators) || manifest.comparators.length !== 3) fail("benchmark comparator count mismatch");
    for (const [index, row] of manifest.comparators.entries()) {
        exactKeys(row, ["id", "observed_bundle_sha256", "lane", "status", "reason", "build_manifest_sha256", "bundle_sha256", "semantic_green_receipt_sha256"], `comparator ${index}`);
        const id = comparatorKeys[index];
        if (row.id !== id || row.observed_bundle_sha256 !== comparatorRegistry[id] || row.lane !== "COMMON_PREFIX_SEMANTICS" || !["COMPARABLE", "NON_COMPARABLE"].includes(row.status)) fail(`comparator ${id} identity/lane mismatch`);
        nonempty(row.reason, `comparator ${id} reason`);
        for (const key of ["build_manifest_sha256", "bundle_sha256", "semantic_green_receipt_sha256"]) nullableHash(row[key], `comparator ${id}.${key}`);
        const values = [row.build_manifest_sha256, row.bundle_sha256, row.semantic_green_receipt_sha256];
        if (row.status === "COMPARABLE" ? values.some((item) => item === null) : values.some((item) => item !== null)) fail(`comparator ${id} comparable/build binding mismatch`);
    }
    exactKeys(manifest.schedule, ["warmups", "rounds", "batch", "cases_per_batch", "order_sha256", "paired", "one_sided_confidence", "bootstrap_seed", "bootstrap_resamples", "strict_win_upper_bound"], "benchmark schedule");
    for (const key of ["warmups", "rounds", "batch", "cases_per_batch", "bootstrap_seed", "bootstrap_resamples"]) positive(manifest.schedule[key], `benchmark schedule.${key}`);
    if (manifest.schedule.rounds < 5 || manifest.schedule.bootstrap_resamples < 1000 || manifest.schedule.bootstrap_seed > 0xffffffff || manifest.schedule.paired !== true || manifest.schedule.one_sided_confidence < 0.9 || manifest.schedule.one_sided_confidence > 0.999 || manifest.schedule.strict_win_upper_bound !== 1) fail("benchmark schedule statistical contract mismatch");
    hash(manifest.schedule.order_sha256, "benchmark schedule order");
    exactKeys(manifest.environment, ["node", "v8", "platform", "arch", "cpu", "runner_sha256"], "benchmark environment");
    for (const key of ["node", "v8", "platform", "arch", "cpu"]) nonempty(manifest.environment[key], `benchmark environment.${key}`);
    hash(manifest.environment.runner_sha256, "benchmark runner hash");
    exactKeys(manifest.evidence_paths, ["attempt_ledger", "raw_result"], "benchmark evidence paths");
    if (manifest.evidence_paths.attempt_ledger !== "attempts/ledger.jsonl" || manifest.evidence_paths.raw_result !== `attempts/${manifest.attempt_id}.raw.json`) fail("benchmark evidence path mismatch");
    timestamp(manifest.sealed_at, "benchmark seal time");
}

function validateRaw(raw, manifest, manifestIdentity) {
    exactKeys(raw, ["feature_id", "generation", "attempt_id", "run_manifest_sha256", "selected_candidate", "subjects", "allocation"], "benchmark raw result");
    if (raw.feature_id !== featureId || raw.generation !== generation || raw.attempt_id !== manifest.attempt_id || raw.run_manifest_sha256 !== manifestIdentity.sha256 || !candidateKeys.includes(raw.selected_candidate)) fail("benchmark raw identity/selection mismatch");
    exactKeys(raw.subjects, peerKeys, "benchmark raw subjects");
    for (const key of peerKeys) {
        const row = raw.subjects[key];
        exactKeys(row, ["status", "samples_ms", "utf16_code_units_per_sample", "invocations", "exit_code", "failures"], `raw subject ${key}`);
        if (!["MEASURED", "FAILED", "NON_COMPARABLE"].includes(row.status) || !Array.isArray(row.samples_ms) || !Array.isArray(row.failures)) fail(`raw subject ${key} status/arrays invalid`);
        if (row.samples_ms.some((item) => typeof item !== "number" || !Number.isFinite(item) || item <= 0)) fail(`raw subject ${key} samples invalid`);
        row.failures.forEach((item, index) => nonempty(item, `raw subject ${key} failure ${index}`));
        if (!Number.isInteger(row.invocations) || row.invocations < 0 || !Number.isInteger(row.utf16_code_units_per_sample) || row.utf16_code_units_per_sample < 0 || (row.exit_code !== null && !Number.isInteger(row.exit_code))) fail(`raw subject ${key} counts/exits invalid`);
        if (row.status === "MEASURED") {
            if (row.samples_ms.length !== manifest.schedule.rounds || row.invocations !== manifest.schedule.rounds * manifest.schedule.batch * manifest.schedule.cases_per_batch || row.utf16_code_units_per_sample < 1 || row.exit_code !== 0 || row.failures.length !== 0) fail(`raw measured subject ${key} shape mismatch`);
        } else if (row.status === "NON_COMPARABLE") {
            if (row.samples_ms.length !== 0 || row.invocations !== 0 || row.utf16_code_units_per_sample !== 0 || row.exit_code !== null || row.failures.length === 0) fail(`raw non-comparable subject ${key} shape mismatch`);
        } else if (row.failures.length === 0 || row.exit_code === 0) fail(`raw failed subject ${key} must retain failure and nonzero/null exit`);
    }
    for (const key of candidateKeys) if (raw.subjects[key].status === "NON_COMPARABLE") fail(`candidate ${key} cannot be NON_COMPARABLE`);
    for (const comparator of manifest.comparators) {
        const expected = comparator.status === "COMPARABLE" ? new Set(["MEASURED", "FAILED"]) : new Set(["NON_COMPARABLE"]);
        if (!expected.has(raw.subjects[comparator.id].status)) fail(`raw comparator ${comparator.id} status disagrees with sealed manifest`);
    }
    exactKeys(raw.allocation, ["status", "tool", "reason", "evidence_sha256"], "raw allocation");
    if (!['MEASURED', 'UNAVAILABLE'].includes(raw.allocation.status)) fail("allocation status invalid");
    nonempty(raw.allocation.tool, "allocation tool"); nonempty(raw.allocation.reason, "allocation reason"); nullableHash(raw.allocation.evidence_sha256, "allocation evidence");
    if (raw.allocation.status === "MEASURED" ? raw.allocation.evidence_sha256 === null : raw.allocation.evidence_sha256 !== null) fail("allocation evidence/status mismatch");
}

function median(values) { const sorted = [...values].sort((a, b) => a - b); const mid = Math.floor(sorted.length / 2); return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2; }
function mad(values, center) { return median(values.map((value) => Math.abs(value - center))); }
function xorshift(seed) { let state = seed >>> 0; return () => { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return (state >>> 0) / 0x100000000; }; }
function pairedStats(candidate, peer, schedule, salt) {
    if (candidate.length !== peer.length || candidate.length === 0) fail("paired sample length mismatch");
    const logs = candidate.map((value, index) => Math.log(value / peer[index]));
    const mean = logs.reduce((sum, value) => sum + value, 0) / logs.length;
    const random = xorshift((schedule.bootstrap_seed ^ salt) >>> 0 || 1);
    const bootstrap = [];
    for (let sample = 0; sample < schedule.bootstrap_resamples; sample += 1) {
        let total = 0;
        for (let index = 0; index < logs.length; index += 1) total += logs[Math.floor(random() * logs.length)];
        bootstrap.push(Math.exp(total / logs.length));
    }
    bootstrap.sort((a, b) => a - b);
    const quantile = Math.min(bootstrap.length - 1, Math.ceil(schedule.one_sided_confidence * bootstrap.length) - 1);
    return { geometric_mean_ratio: Math.exp(mean), upper_confidence_bound: bootstrap[quantile] };
}

function computeReceipt(manifest, manifestIdentity, raw, rawIdentity) {
    validateManifest(manifest); validateRaw(raw, manifest, manifestIdentity);
    const summaries = {};
    let invocations = 0;
    const exits = [];
    const failures = [];
    for (const key of peerKeys) {
        const row = raw.subjects[key];
        const measured = row.status === "MEASURED";
        const center = measured ? median(row.samples_ms) : null;
        summaries[key] = {
            status: row.status,
            median_ms: center,
            mad_ms: measured ? mad(row.samples_ms, center) : null,
            invocations: row.invocations,
            exit_code: row.exit_code,
            failures: [...row.failures],
            throughput: measured ? row.utf16_code_units_per_sample / (center / 1000) : null,
        };
        invocations += row.invocations;
        if (row.exit_code !== null) exits.push(row.exit_code);
        failures.push(...row.failures.map((message) => `${key}:${message}`));
    }
    const selected = raw.subjects[raw.selected_candidate];
    const paired = {}; const strictWins = {};
    for (const [index, key] of peerKeys.entries()) {
        const peer = raw.subjects[key];
        if (key === raw.selected_candidate) { paired[key] = null; strictWins[key] = "SELF"; }
        else if (selected.status !== "MEASURED" || peer.status === "FAILED") { paired[key] = null; strictWins[key] = false; }
        else if (peer.status === "NON_COMPARABLE") { paired[key] = null; strictWins[key] = "NON_COMPARABLE"; }
        else {
            paired[key] = pairedStats(selected.samples_ms, peer.samples_ms, manifest.schedule, index + 1);
            strictWins[key] = paired[key].upper_confidence_bound < manifest.schedule.strict_win_upper_bound;
        }
    }
    return {
        feature_id: featureId, generation, attempt_id: manifest.attempt_id, run_manifest: manifestIdentity, raw_result: rawIdentity,
        peer_keys: [...peerKeys], selected_candidate: raw.selected_candidate, summaries, paired_candidate_over_peer: paired, strict_wins: strictWins,
        allocation: raw.allocation, invocations, exits, failures, throughput_unit: "UTF16_CODE_UNITS_PER_SECOND", recomputed_by: "benchmark-validator.mjs",
        credit: "ZERO_UNTIL_SKEPTIC_AND_ADJUDICATOR_ACCEPTANCE",
    };
}

function validateReceiptShape(receipt) {
    exactKeys(receipt, ["feature_id", "generation", "attempt_id", "run_manifest", "raw_result", "peer_keys", "selected_candidate", "summaries", "paired_candidate_over_peer", "strict_wins", "allocation", "invocations", "exits", "failures", "throughput_unit", "recomputed_by", "credit"], "benchmark receipt");
    if (receipt.feature_id !== featureId || receipt.generation !== generation || JSON.stringify(receipt.peer_keys) !== JSON.stringify(peerKeys) || !candidateKeys.includes(receipt.selected_candidate)) fail("benchmark receipt identity/peer keys mismatch");
    identityRow(receipt.run_manifest, "receipt run manifest"); identityRow(receipt.raw_result, "receipt raw result");
    exactKeys(receipt.summaries, peerKeys, "receipt summaries"); exactKeys(receipt.paired_candidate_over_peer, peerKeys, "receipt pairwise keys"); exactKeys(receipt.strict_wins, peerKeys, "receipt strict-win keys");
    if (!Number.isInteger(receipt.invocations) || receipt.invocations < 1 || !Array.isArray(receipt.exits) || !Array.isArray(receipt.failures) || receipt.throughput_unit !== "UTF16_CODE_UNITS_PER_SECOND" || receipt.recomputed_by !== "benchmark-validator.mjs" || receipt.credit !== "ZERO_UNTIL_SKEPTIC_AND_ADJUDICATOR_ACCEPTANCE") fail("benchmark receipt totals/credit mismatch");
}

function ledgerRows(path) {
    if (!existsSync(path)) return [];
    const text = readFileSync(path, "utf8");
    if (text.length === 0) return [];
    if (!text.endsWith("\n")) fail("attempt ledger must end with LF");
    const rows = text.trimEnd().split("\n").map((line, index) => parseJson(Buffer.from(line), `attempt ledger row ${index + 1}`));
    const ids = new Set();
    for (const [index, row] of rows.entries()) {
        exactKeys(row, ["ordinal", "attempt_id", "run_manifest_sha256", "raw_sha256", "raw_bytes", "status", "recorded_at"], `attempt ledger row ${index + 1}`);
        if (row.ordinal !== index + 1 || ids.has(row.attempt_id) || !['COMPLETE', 'FAILED'].includes(row.status)) fail("attempt ledger ordinal/identity/status mismatch");
        ids.add(row.attempt_id); hash(row.run_manifest_sha256, "attempt manifest hash"); hash(row.raw_sha256, "attempt raw hash"); positive(row.raw_bytes, "attempt raw bytes"); timestamp(row.recorded_at, "attempt time");
    }
    return rows;
}

function appendLedger(path, row) {
    mkdirSync(dirname(path), { recursive: true });
    const fd = openSync(path, "a", 0o444);
    try { writeSync(fd, `${JSON.stringify(row)}\n`); fsyncSync(fd); } finally { closeSync(fd); }
}

function sealAttempt(manifestPath, rawInputPath, evidenceRoot) {
    verifySchemas();
    const manifestBytes = readFileSync(resolve(manifestPath)); const manifest = parseJson(manifestBytes, "benchmark manifest"); validateManifest(manifest);
    const manifestIdentity = identity(manifestBytes); const rawBytes = readFileSync(resolve(rawInputPath)); const rawIdentity = identity(rawBytes);
    const root = resolve(evidenceRoot); const ledgerPath = assertUnder(root, manifest.evidence_paths.attempt_ledger, "attempt ledger"); const rawPath = assertUnder(root, manifest.evidence_paths.raw_result, "raw result");
    const rows = ledgerRows(ledgerPath);
    if (rows.some((row) => row.attempt_id === manifest.attempt_id) || existsSync(rawPath)) fail("attempt_id is retired; retry erasure/reuse forbidden");
    mkdirSync(dirname(rawPath), { recursive: true }); writeFileSync(rawPath, rawBytes, { flag: "wx", mode: 0o444 });
    let receipt; let error;
    try { const raw = parseJson(rawBytes, "benchmark raw result"); receipt = computeReceipt(manifest, manifestIdentity, raw, rawIdentity); validateReceiptShape(receipt); }
    catch (caught) { error = caught; }
    appendLedger(ledgerPath, { ordinal: rows.length + 1, attempt_id: manifest.attempt_id, run_manifest_sha256: manifestIdentity.sha256, raw_sha256: rawIdentity.sha256, raw_bytes: rawIdentity.bytes, status: error ? "FAILED" : "COMPLETE", recorded_at: new Date().toISOString() });
    if (error) throw error;
    return receipt;
}

function synthetic() {
    const h = (char) => char.repeat(64);
    const manifest = {
        feature_id: featureId, generation, status: "SEALED_BEFORE_FIRST_TIMING", attempt_id: "self-check-1", pre_author_receipt: { sha256: h("1"), bytes: 10 },
        operation: { feature_row_sha256: h("2"), public_corpus_sha256: h("3"), revealed_holdout_corpus_sha256: h("4"), normalized_observations_sha256: h("5"), throughput_unit: "UTF16_CODE_UNITS_PER_SECOND" },
        candidates: candidateKeys.map((seat, index) => ({ seat, source_sha256: ["6", "7", "8", "9"][index].repeat(64), author_receipt_sha256: ["a", "b", "c", "d"][index].repeat(64), build_manifest_sha256: ["e", "f", "0", "1"][index].repeat(64), bundle_sha256: ["2", "3", "4", "5"][index].repeat(64), export: "consumeNumber" })),
        correctness: { public_green_receipts: { h: h("a"), b: h("b"), s: h("c"), d: h("d") }, holdout_green_receipts: { h: h("e"), b: h("f"), s: h("0"), d: h("1") }, expected_public_observations_sha256: h("2"), expected_holdout_observations_sha256: h("3") },
        comparators: [
            { id: "live-regex", observed_bundle_sha256: comparatorRegistry["live-regex"], lane: "COMMON_PREFIX_SEMANTICS", status: "COMPARABLE", reason: "reconstructed exact common-prefix operation", build_manifest_sha256: h("4"), bundle_sha256: h("5"), semantic_green_receipt_sha256: h("6") },
            { id: "deposed", observed_bundle_sha256: comparatorRegistry.deposed, lane: "COMMON_PREFIX_SEMANTICS", status: "NON_COMPARABLE", reason: "no reproducible operation-equivalent build closure", build_manifest_sha256: null, bundle_sha256: null, semantic_green_receipt_sha256: null },
            { id: "c14", observed_bundle_sha256: comparatorRegistry.c14, lane: "COMMON_PREFIX_SEMANTICS", status: "NON_COMPARABLE", reason: "no reproducible operation-equivalent build closure", build_manifest_sha256: null, bundle_sha256: null, semantic_green_receipt_sha256: null },
        ],
        schedule: { warmups: 2, rounds: 5, batch: 10, cases_per_batch: 20, order_sha256: h("7"), paired: true, one_sided_confidence: 0.95, bootstrap_seed: 12345, bootstrap_resamples: 1000, strict_win_upper_bound: 1 },
        environment: { node: process.version, v8: process.versions.v8, platform: process.platform, arch: process.arch, cpu: "self-check", runner_sha256: h("8") },
        evidence_paths: { attempt_ledger: "attempts/ledger.jsonl", raw_result: "attempts/self-check-1.raw.json" }, sealed_at: "2026-07-22T00:00:00.000Z",
    };
    const manifestBytes = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`); const manifestIdentity = identity(manifestBytes);
    const measured = (samples) => ({ status: "MEASURED", samples_ms: samples, utf16_code_units_per_sample: 100000, invocations: 1000, exit_code: 0, failures: [] });
    const unavailable = (reason) => ({ status: "NON_COMPARABLE", samples_ms: [], utf16_code_units_per_sample: 0, invocations: 0, exit_code: null, failures: [reason] });
    const raw = {
        feature_id: featureId, generation, attempt_id: manifest.attempt_id, run_manifest_sha256: manifestIdentity.sha256, selected_candidate: "d",
        subjects: {
            h: measured([10, 10.5, 9.5, 10.2, 9.8]), b: measured([9, 9.4, 8.8, 9.1, 8.9]), s: measured([8, 8.2, 7.8, 8.1, 7.9]), d: measured([6, 6.2, 5.8, 6.1, 5.9]),
            "live-regex": measured([11, 11.2, 10.8, 11.1, 10.9]), deposed: unavailable("NON_COMPARABLE: unreconstructable"), c14: unavailable("NON_COMPARABLE: unreconstructable"),
        },
        allocation: { status: "UNAVAILABLE", tool: "process.memoryUsage", reason: "cannot attribute per-parser transient allocations without intrusive GC tracing", evidence_sha256: null },
    };
    const rawBytes = Buffer.from(`${JSON.stringify(raw, null, 2)}\n`);
    return { manifest, manifestBytes, manifestIdentity, raw, rawBytes };
}

function expectReject(fn, label) { try { fn(); } catch { return; } fail(`negative control did not reject: ${label}`); }

function selfCheck() {
    verifySchemas();
    const sample = synthetic(); validateManifest(sample.manifest); validateRaw(sample.raw, sample.manifest, sample.manifestIdentity);
    const receipt = computeReceipt(sample.manifest, sample.manifestIdentity, sample.raw, identity(sample.rawBytes)); validateReceiptShape(receipt);
    if (receipt.strict_wins.h !== true || receipt.strict_wins.b !== true || receipt.strict_wins.s !== true || receipt.strict_wins["live-regex"] !== true || receipt.strict_wins.deposed !== "NON_COMPARABLE" || receipt.strict_wins.c14 !== "NON_COMPARABLE") fail("benchmark recomputation strict-win matrix mismatch");
    const drift = structuredClone(sample.manifest); drift.comparators[0].observed_bundle_sha256 = "0".repeat(64);
    expectReject(() => validateManifest(drift), "LIVE comparator identity drift");
    const badCorrectness = structuredClone(sample.manifest); delete badCorrectness.correctness.holdout_green_receipts;
    expectReject(() => validateManifest(badCorrectness), "missing holdout green receipts");
    const temp = mkdtempSync(join(tmpdir(), "value-g6-benchmark-"));
    try {
        const manifestPath = join(temp, "manifest.json"); const rawPath = join(temp, "input.raw.json"); const evidenceRoot = join(temp, "evidence");
        writeFileSync(manifestPath, sample.manifestBytes); writeFileSync(rawPath, sample.rawBytes);
        const sealed = sealAttempt(manifestPath, rawPath, evidenceRoot); validateReceiptShape(sealed);
        expectReject(() => sealAttempt(manifestPath, rawPath, evidenceRoot), "retired attempt retry");
        const retainedRaw = readFileSync(join(evidenceRoot, "attempts/self-check-1.raw.json"));
        if (sha256(retainedRaw) !== identity(sample.rawBytes).sha256 || ledgerRows(join(evidenceRoot, "attempts/ledger.jsonl")).length !== 1) fail("append-only lifecycle did not retain exact raw evidence");
    } finally { rmSync(temp, { recursive: true, force: true }); }
    return { schemas: 2, subjects: peerKeys, comparator_registry: comparatorRegistry, recomputation: "PASS", append_only_no_retry: "PASS" };
}

const [command, ...args] = process.argv.slice(2);
try {
    let output;
    if (command === "--self-check") output = selfCheck();
    else if (command === "--validate") {
        if (args.length !== 3) fail("--validate requires manifest, raw, receipt");
        verifySchemas(); const manifestBytes = readFileSync(resolve(args[0])); const rawBytes = readFileSync(resolve(args[1])); const receipt = parseJson(readFileSync(resolve(args[2])), "benchmark receipt");
        const recomputed = computeReceipt(parseJson(manifestBytes, "manifest"), identity(manifestBytes), parseJson(rawBytes, "raw"), identity(rawBytes)); validateReceiptShape(receipt);
        if (JSON.stringify(receipt) !== JSON.stringify(recomputed)) fail("benchmark receipt does not equal independent recomputation"); output = { status: "PASS", receipt_sha256: sha256(readFileSync(resolve(args[2]))) };
    } else if (command === "--seal-attempt") { if (args.length !== 3) fail("--seal-attempt requires manifest, raw input, evidence root"); output = sealAttempt(args[0], args[1], args[2]); }
    else fail("usage: --self-check | --validate <manifest> <raw> <receipt> | --seal-attempt <manifest> <raw> <evidence-root>");
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
}
