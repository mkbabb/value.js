import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const cellRoot = dirname(fileURLToPath(import.meta.url));
const featureId = "SYNTAX-CONSUME-NUMBER";
const generation = 8;
const seats = Object.freeze(["h", "b", "s", "d"]);
const comparators = Object.freeze(["live-regex", "deposed", "c14"]);
const subjects = Object.freeze([...seats, ...comparators]);
const shaPattern = /^[0-9a-f]{64}$/;
const baseEvidence = Object.freeze({
    "pre-author": "pre-author",
    "feature-row": "feature",
    "public-corpus": "public-corpus",
    "revealed-holdout-corpus": "revealed-holdout-corpus",
    "normalized-observations": "normalized-observations",
    runner: "runner",
    schedule: "schedule",
});
const seatEvidence = Object.freeze({ source: "candidate-source", author: "author-receipt", build: "build-manifest", bundle: "bundle", "public-correctness": "public-correctness", "holdout-correctness": "holdout-correctness" });
const comparatorEvidence = Object.freeze({ build: "comparator-build", bundle: "comparator-bundle", correctness: "comparator-correctness" });

function fail(message) { throw new Error(message); }
function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function identity(bytes) { return { sha256: sha256(bytes), bytes: bytes.length }; }
function parseJson(bytes, label) { try { return JSON.parse(bytes.toString("utf8")); } catch (error) { fail(`${label} is not JSON: ${String(error)}`); } }
function object(value, label) { if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be an object`); return value; }
function exactKeys(value, keys, label) { object(value, label); const actual = Object.keys(value).sort(); const expected = [...keys].sort(); if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${label} keys mismatch: ${actual.join(",")}`); }
function nonempty(value, label) { if (typeof value !== "string" || value.length === 0) fail(`${label} must be nonempty`); }
function hash(value, label) { if (typeof value !== "string" || !shaPattern.test(value)) fail(`${label} must be lowercase SHA-256`); }
function positive(value, label) { if (!Number.isInteger(value) || value < 1) fail(`${label} must be a positive integer`); }
function resolveUnder(root, path, label) { const absolute = resolve(root, path); if (absolute !== root && !absolute.startsWith(`${root}${sep}`)) fail(`${label} escapes evidence root`); return absolute; }
function rowsClosure(rows) { return sha256(Buffer.from([...rows].sort((a, b) => a.id.localeCompare(b.id)).map((row) => `${row.id}\0${row.kind}\0${row.path}\0${row.sha256}\0${row.bytes}\n`).join(""))); }
function attemptClosure(rowWithoutClosure) { return sha256(Buffer.from(`${JSON.stringify(rowWithoutClosure)}\n`)); }
function expectReject(fn, label) { try { fn(); } catch { return; } fail(`negative control did not reject: ${label}`); }

function requiredEvidence() {
    const required = new Map(Object.entries(baseEvidence));
    for (const seat of seats) for (const [suffix, kind] of Object.entries(seatEvidence)) required.set(`${seat}.${suffix}`, kind);
    for (const comparator of comparators) for (const [suffix, kind] of Object.entries(comparatorEvidence)) required.set(`${comparator}.${suffix}`, kind);
    return required;
}

function validateEvidenceRoot(manifestPath) {
    const absolute = resolve(manifestPath); const root = dirname(absolute); const bytes = readFileSync(absolute); const value = parseJson(bytes, "benchmark evidence root");
    exactKeys(value, ["feature_id", "generation", "status", "rows", "closure_sha256"], "benchmark evidence root");
    if (value.feature_id !== featureId || value.generation !== generation || value.status !== "EXACT_IMMUTABLE_EVIDENCE_ROOT") fail("benchmark evidence root identity/status mismatch");
    if (!Array.isArray(value.rows)) fail("benchmark evidence rows missing"); hash(value.closure_sha256, "benchmark evidence closure");
    const required = requiredEvidence(); const byId = new Map(); const byPath = new Set();
    for (const row of value.rows) {
        exactKeys(row, ["id", "kind", "path", "sha256", "bytes"], `evidence row ${row.id}`);
        nonempty(row.id, "evidence id"); nonempty(row.kind, "evidence kind"); nonempty(row.path, "evidence path"); hash(row.sha256, "evidence hash"); positive(row.bytes, "evidence bytes");
        if (byId.has(row.id) || byPath.has(row.path)) fail(`duplicate evidence id/path ${row.id}`); byId.set(row.id, row); byPath.add(row.path);
        const file = resolveUnder(root, row.path, row.id); const actual = identity(readFileSync(file)); if (actual.sha256 !== row.sha256 || actual.bytes !== row.bytes) fail(`${row.id}: evidence bytes drift`);
    }
    for (const [id, kind] of required) { const row = byId.get(id); if (!row || row.kind !== kind) fail(`missing/wrong required evidence ${id}/${kind}`); }
    if (byId.size !== required.size) fail("unexpected evidence rows are not allowed");
    if (rowsClosure(value.rows) !== value.closure_sha256) fail("benchmark evidence closure mismatch");
    return { path: absolute, root, bytes, value, identity: identity(bytes), byId };
}

function ledgerRows(path) {
    if (!existsSync(path)) return [];
    const text = readFileSync(path, "utf8"); if (text.length === 0) return []; if (!text.endsWith("\n")) fail("attempt ledger lacks final LF");
    const rows = [];
    for (const [index, line] of text.trimEnd().split("\n").entries()) {
        const row = parseJson(Buffer.from(line), `attempt ledger ${index + 1}`);
        exactKeys(row, ["ordinal", "feature_id", "generation", "attempt_id", "evidence_root_sha256", "runner_sha256", "schedule_sha256", "previous_ledger_closure_sha256", "raw_result", "status", "recorded_at", "ledger_closure_sha256"], `attempt ledger ${index + 1}`);
        if (row.ordinal !== index + 1 || row.feature_id !== featureId || row.generation !== generation || !["COMPLETE", "FAILED"].includes(row.status)) fail("attempt ledger identity/order/status mismatch");
        nonempty(row.attempt_id, "attempt id"); for (const key of ["evidence_root_sha256", "runner_sha256", "schedule_sha256", "previous_ledger_closure_sha256", "ledger_closure_sha256"]) hash(row[key], `attempt ${key}`);
        exactKeys(row.raw_result, ["path", "sha256", "bytes"], "attempt raw result"); nonempty(row.raw_result.path, "raw path"); hash(row.raw_result.sha256, "raw hash"); positive(row.raw_result.bytes, "raw bytes");
        if (!Number.isFinite(Date.parse(row.recorded_at))) fail("attempt recorded time invalid");
        const expectedPrevious = index === 0 ? "0".repeat(64) : rows[index - 1]?.ledger_closure_sha256;
        if (row.previous_ledger_closure_sha256 !== expectedPrevious) fail("attempt history chain broken");
        const { ledger_closure_sha256, ...core } = row; if (attemptClosure(core) !== ledger_closure_sha256) fail("attempt row closure mismatch"); rows.push(row);
    }
    return rows;
}

function validateRaw(raw, attemptId, evidence) {
    exactKeys(raw, ["feature_id", "generation", "attempt_id", "evidence_root_sha256", "runner_sha256", "schedule_sha256", "subjects", "status", "recorded_at"], "raw benchmark result");
    if (raw.feature_id !== featureId || raw.generation !== generation || raw.attempt_id !== attemptId || raw.evidence_root_sha256 !== evidence.identity.sha256 || raw.runner_sha256 !== evidence.byId.get("runner").sha256 || raw.schedule_sha256 !== evidence.byId.get("schedule").sha256 || !["COMPLETE", "FAILED"].includes(raw.status)) fail("raw benchmark identity mismatch");
    exactKeys(raw.subjects, subjects, "raw benchmark subjects");
    for (const subject of subjects) {
        const row = raw.subjects[subject]; exactKeys(row, ["status", "correctness_receipt_sha256", "samples_ms", "exit_code", "failures"], `raw subject ${subject}`);
        if (!(["MEASURED", "FAILED"].includes(row.status)) || !Array.isArray(row.samples_ms) || row.samples_ms.some((item) => typeof item !== "number" || !Number.isFinite(item) || item <= 0) || !Number.isInteger(row.exit_code) || !Array.isArray(row.failures)) fail(`${subject}: raw shape invalid`);
        const correctnessId = seats.includes(subject) ? `${subject}.holdout-correctness` : `${subject}.correctness`;
        if (row.correctness_receipt_sha256 !== evidence.byId.get(correctnessId).sha256) fail(`${subject}: raw correctness identity mismatch`);
        if (row.status === "MEASURED" && (row.samples_ms.length < 5 || row.exit_code !== 0 || row.failures.length !== 0)) fail(`${subject}: measured lane is not clean/comparable`);
        if (row.status === "FAILED" && row.failures.length === 0) fail(`${subject}: failure was erased`);
    }
    if (!Number.isFinite(Date.parse(raw.recorded_at))) fail("raw result time invalid");
}

function sealAttempt(evidencePath, rawInputPath, attemptRoot) {
    const evidence = validateEvidenceRoot(evidencePath); const rawInputBytes = readFileSync(resolve(rawInputPath)); const raw = parseJson(rawInputBytes, "raw input");
    if (!/^[a-z0-9][a-z0-9._-]{0,79}$/.test(raw.attempt_id)) fail("attempt id invalid"); validateRaw(raw, raw.attempt_id, evidence);
    const root = resolve(attemptRoot); const attemptDir = join(root, "attempts"); const ledgerPath = join(attemptDir, "ledger.jsonl"); const rawRel = `attempts/${raw.attempt_id}.raw.json`; const rawPath = resolveUnder(root, rawRel, "raw output");
    const prior = ledgerRows(ledgerPath); if (prior.some((row) => row.attempt_id === raw.attempt_id) || existsSync(rawPath)) fail("attempt id retired; retry erasure forbidden");
    mkdirSync(attemptDir, { recursive: true }); writeFileSync(rawPath, rawInputBytes, { flag: "wx", mode: 0o644 });
    const rawIdentity = identity(rawInputBytes); const core = { ordinal: prior.length + 1, feature_id: featureId, generation, attempt_id: raw.attempt_id, evidence_root_sha256: evidence.identity.sha256, runner_sha256: evidence.byId.get("runner").sha256, schedule_sha256: evidence.byId.get("schedule").sha256, previous_ledger_closure_sha256: prior.at(-1)?.ledger_closure_sha256 ?? "0".repeat(64), raw_result: { path: rawRel, ...rawIdentity }, status: raw.status, recorded_at: raw.recorded_at }; const row = { ...core, ledger_closure_sha256: attemptClosure(core) };
    appendFileSync(ledgerPath, `${JSON.stringify(row)}\n`, { encoding: "utf8", mode: 0o644 });
    const after = ledgerRows(ledgerPath); if (after.length !== prior.length + 1) fail("attempt append did not retain prior rows");
    return row;
}

function makeSyntheticEvidence(temp) {
    const root = join(temp, "evidence"); mkdirSync(root, { recursive: true }); const rows = [];
    for (const [id, kind] of requiredEvidence()) {
        const path = `objects/${id}.json`; const absolute = join(root, path); mkdirSync(dirname(absolute), { recursive: true }); const bytes = Buffer.from(`${JSON.stringify({ id, kind, exact: true })}\n`); writeFileSync(absolute, bytes); rows.push({ id, kind, path, ...identity(bytes) });
    }
    const value = { feature_id: featureId, generation, status: "EXACT_IMMUTABLE_EVIDENCE_ROOT", rows, closure_sha256: rowsClosure(rows) };
    const path = join(root, "evidence-root.json"); const bytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`); writeFileSync(path, bytes); return { root, path, bytes, value, byId: new Map(rows.map((row) => [row.id, row])) };
}

function makeRaw(attemptId, evidence, status = "COMPLETE") {
    const evidenceIdentity = identity(evidence.bytes);
    const subjectRows = Object.fromEntries(subjects.map((subject, index) => {
        const correctnessId = seats.includes(subject) ? `${subject}.holdout-correctness` : `${subject}.correctness`;
        return [subject, { status: "MEASURED", correctness_receipt_sha256: evidence.byId.get(correctnessId).sha256, samples_ms: [10 + index, 11 + index, 12 + index, 11.5 + index, 10.5 + index], exit_code: 0, failures: [] }];
    }));
    const value = { feature_id: featureId, generation, attempt_id: attemptId, evidence_root_sha256: evidenceIdentity.sha256, runner_sha256: evidence.byId.get("runner").sha256, schedule_sha256: evidence.byId.get("schedule").sha256, subjects: subjectRows, status, recorded_at: `2026-07-22T00:00:0${attemptId.endsWith("2") ? "2" : "1"}.000Z` };
    return { value, bytes: Buffer.from(`${JSON.stringify(value, null, 2)}\n`) };
}

function selfCheck() {
    const evidenceSchema = parseJson(readFileSync(join(cellRoot, "benchmark-evidence-root.schema.json")), "evidence schema"); const attemptSchema = parseJson(readFileSync(join(cellRoot, "benchmark-attempt.schema.json")), "attempt schema");
    if (evidenceSchema.$id !== "urn:value-js:syntax-consume-number:g8:benchmark-evidence-root" || attemptSchema.$id !== "urn:value-js:syntax-consume-number:g8:benchmark-attempt") fail("benchmark schema identities mismatch");
    const temp = mkdtempSync(join(tmpdir(), "value-g8-benchmark-"));
    try {
        const evidence = makeSyntheticEvidence(temp); const verified = validateEvidenceRoot(evidence.path); if (verified.byId.size !== 40) fail("synthetic evidence root is not exact 40-row closure");
        const attemptsRoot = join(temp, "attempt-output"); const raw1 = makeRaw("attempt-1", evidence); const raw2 = makeRaw("attempt-2", evidence); const raw1Path = join(temp, "attempt-1.input.json"); const raw2Path = join(temp, "attempt-2.input.json"); writeFileSync(raw1Path, raw1.bytes); writeFileSync(raw2Path, raw2.bytes);
        const first = sealAttempt(evidence.path, raw1Path, attemptsRoot); const second = sealAttempt(evidence.path, raw2Path, attemptsRoot);
        const ledgerPath = join(attemptsRoot, "attempts/ledger.jsonl"); const rows = ledgerRows(ledgerPath);
        if (rows.length !== 2 || first.ordinal !== 1 || second.ordinal !== 2 || second.previous_ledger_closure_sha256 !== first.ledger_closure_sha256 || (statSync(ledgerPath).mode & 0o200) === 0) fail("two-attempt append-only history chain or writable append mode failed");
        expectReject(() => sealAttempt(evidence.path, raw1Path, attemptsRoot), "retry erasure");
        const missing = structuredClone(evidence.value); missing.rows = missing.rows.filter((row) => row.id !== "h.source"); missing.closure_sha256 = rowsClosure(missing.rows); const missingPath = join(evidence.root, "missing.json"); writeFileSync(missingPath, `${JSON.stringify(missing)}\n`); expectReject(() => validateEvidenceRoot(missingPath), "missing candidate source identity");
        const badRaw = structuredClone(raw2.value); badRaw.subjects["live-regex"].correctness_receipt_sha256 = "0".repeat(64); expectReject(() => validateRaw(badRaw, "attempt-2", verified), "comparator correctness drift");
        return { status: "PASS", evidence_rows: verified.byId.size, evidence_root_closure_sha256: verified.value.closure_sha256, all_source_build_correctness_corpus_comparator_runner_schedule_identities_resolved: true, append_only_attempts: rows.length, attempt_ids: rows.map((row) => row.attempt_id), terminal_ledger_closure_sha256: rows.at(-1).ledger_closure_sha256, second_attempt_binds_first: true, ledger_owner_writable_without_chmod: true, raw_results_retained: rows.map((row) => row.raw_result.sha256), negative_controls: 3 };
    } finally { rmSync(temp, { recursive: true, force: true }); }
}

const [command, ...args] = process.argv.slice(2);
try {
    let output;
    if (command === "--self-check" || command === "--negative-controls") output = selfCheck();
    else if (command === "--validate-evidence-root") { if (args.length !== 1) fail("--validate-evidence-root requires one path"); const result = validateEvidenceRoot(args[0]); output = { status: "PASS", evidence_root_sha256: result.identity.sha256, rows: result.byId.size, closure_sha256: result.value.closure_sha256 }; }
    else if (command === "--seal-attempt") { if (args.length !== 3) fail("--seal-attempt requires evidence-root, raw-input, attempt-root"); output = sealAttempt(args[0], args[1], args[2]); }
    else fail("usage: --self-check | --negative-controls | --validate-evidence-root <path> | --seal-attempt <evidence-root> <raw-input> <attempt-root>");
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`); process.exitCode = 1;
}
