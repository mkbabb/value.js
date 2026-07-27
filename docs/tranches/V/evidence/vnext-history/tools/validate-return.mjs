#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, lstatSync, mkdtempSync, readFileSync, realpathSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve } from "node:path";

import {
    canonicalGateArgv,
    fileSha256,
    gateEnvironmentSha256,
    proofRunnerEnvironment,
    proofManifestPath,
    proofRunnerRelativePath,
    proofRunnerSha256,
    repositoryStateSha256,
} from "./gate-runtime.mjs";
import {
    implementationChallengeSha256,
    implementationGateContract,
    implementationSemanticSubjectSha256,
} from "./implementation-challenge.mjs";
import { compareCanonicalText, canonicalize, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import {
    assertSameConsumerUniverseImmutableProjection,
    consumerUniverseAnnexProjection,
    consumerUniverseDelta,
    validateConsumerRootSnapshotIndexReference,
    validateConsumerUniverseReceipt,
} from "./consumer-universe-return.mjs";
import { validateConsumerRootSnapshotIndex } from "./consumer-root-snapshot.mjs";
import { validateDeletionJudgment } from "./deletion-judgment.mjs";
import { validateDeletionTruthReceipt } from "./deletion-truth.mjs";
import { keyframesPhysicalPathProjection } from "./keyframes-contract.mjs";
import { validateResolvedReceipt, verifyResolvedReceiptFiles } from "./resolve-reopenings.mjs";
import { recursiveReturnValidatorArgs } from "./return-validation-mode.mjs";
import { loadWaveRegistry } from "./wave-contract.mjs";
import {
    edgePolicySha256,
    requireWaveEdgePolicy,
    requireWaveOutcome,
} from "./wave-edge-policy.mjs";

const arguments_ = process.argv.slice(2);
const path = arguments_.shift();
const modeFlag = ["--offline", "--historical-certificate", "--immutable-authority"].includes(arguments_[0])
    ? arguments_.shift()
    : undefined;
let consumerCaptureAuthorityPath;
let consumerCaptureAuthorityFileSha256;
let consumerCaptureAuthorityHash;
if (arguments_[0] === "--consumer-immutable-capture-authority" && arguments_.length === 4) {
    arguments_.shift();
    consumerCaptureAuthorityPath = arguments_.shift();
    consumerCaptureAuthorityFileSha256 = arguments_.shift();
    consumerCaptureAuthorityHash = arguments_.shift();
}
const immutableAuthority = modeFlag === "--immutable-authority";
const historicalCertificate = modeFlag === "--historical-certificate";
const offline = modeFlag === "--offline" || immutableAuthority || historicalCertificate;
const historicalGateReplay = immutableAuthority || historicalCertificate;
const consumerCaptureAuthorityArgs = consumerCaptureAuthorityPath === undefined
    ? []
    : ["--consumer-immutable-capture-authority", consumerCaptureAuthorityPath, consumerCaptureAuthorityFileSha256, consumerCaptureAuthorityHash];
if (!path || arguments_.length !== 0) {
    process.stderr.write("usage: node validate-return.mjs <wave-return.json> [--offline|--historical-certificate|--immutable-authority] [--consumer-immutable-capture-authority <path> <file-sha256> <authority-hash>]\n");
    process.exit(2);
}

if (!isAbsolute(path) || !existsSync(path)) {
    process.stderr.write(`/path: existing absolute return file required\n`);
    process.exit(1);
}
const rootMetadata = lstatSync(path);
if (!rootMetadata.isFile() || rootMetadata.isSymbolicLink() || realpathSync(path) !== path) {
    process.stderr.write(`/path: canonical regular non-symlink return file required\n`);
    process.exit(1);
}

const record = parseJsonStrict(readFileSync(path));
const schema = parseJsonStrict(
    readFileSync(new URL("../return.schema.json", import.meta.url)),
);
const gateReceiptSchema = parseJsonStrict(
    readFileSync(new URL("../gate-receipt.schema.json", import.meta.url)),
);
const failures = [];
const wavePattern = /^[PVKAGDMC]\d{2}[A-Z]?$/;
const hashPattern = /^[0-9a-f]{64}$/;
const { contracts: waveContracts, edge_policy: waveEdgePolicy } = loadWaveRegistry();
const apiSourceUrl = new URL("../api-contract.source.json", import.meta.url);
const apiSourceBytes = readFileSync(apiSourceUrl);
const apiSource = parseJsonStrict(apiSourceBytes);
const apiSourceSha256 = createHash("sha256").update(apiSourceBytes).digest("hex");
const apiHttpById = new Map(apiSource.http.map((operation) => [operation.id, operation]));
const apiHeadlessById = new Map(apiSource.headless.map((operation) => [operation.id, operation]));
const apiCoverageUrl = new URL("../API-RETURN-COVERAGE.json", import.meta.url);
const apiCoverage = parseJsonStrict(readFileSync(apiCoverageUrl));
const apiCoveragePreimage = structuredClone(apiCoverage);
delete apiCoveragePreimage.manifest_sha256;
const apiCoverageSha256 = createHash("sha256").update(canonicalize(apiCoveragePreimage)).digest("hex");
const apiCoverageByWave = new Map(apiCoverage.waves.map((row) => [row.wave_id, row]));
const apiCoverageValidatorPath = realpathSync(new URL("./validate-api-return-coverage.mjs", import.meta.url).pathname);
const parseThatReceiptValidatorPath = realpathSync(new URL("./validate-parse-that-package-receipt.mjs", import.meta.url).pathname);
const valueTransposeValidatorPath = realpathSync(new URL("./validate-value-target-transpose.mjs", import.meta.url).pathname);
const valueInventoryValidatorPath = realpathSync(new URL("./validate-value-current-inventory.mjs", import.meta.url).pathname);
const keyframesInventoryValidatorPath = realpathSync(new URL("./validate-keyframes-current-inventory.mjs", import.meta.url).pathname);
const keyframesTransposeValidatorPath = realpathSync(new URL("./validate-keyframes-target-transpose.mjs", import.meta.url).pathname);
const keyframesPublicPackageValidatorPath = realpathSync(new URL("./validate-keyframes-public-package.mjs", import.meta.url).pathname);
const keyframesDecisionSchemaPath = realpathSync(new URL("../keyframes-target-decisions.schema.json", import.meta.url).pathname);
const advancingStatuses = new Set(waveEdgePolicy.wave_outcomes.flatMap(({ advancing_statuses }) => advancing_statuses));
const reopeningStatuses = new Set(
    waveEdgePolicy.manifest.supersession?.allowed_statuses === "owner-advancing-plus-refused" ? ["REFUSED"] : [],
);
const terminalStatuses = new Set([...advancingStatuses, ...reopeningStatuses]);
const nonterminalStatuses = new Set(
    schema.properties.status.enum.filter((status) => !terminalStatuses.has(status)),
);
const deletionOwnerWaves = new Set([
    "V00B", "V29T",
    "K02", "K14", "K15", "K18", "K19", "K20", "K21", "K22", "K22T", "K23",
    "A03", "A07T", "A18", "A22S", "A23C",
    "G07", "D00",
    "M00", "M06", "M10T", "C03P", "C03",
]);
const validatorPath = realpathSync(new URL(import.meta.url).pathname);
let validationChain = [];
try {
    validationChain = JSON.parse(process.env.VNEXT_RETURN_VALIDATION_CHAIN ?? "[]");
    if (!Array.isArray(validationChain) || validationChain.some((item) => typeof item !== "string")) throw new Error("not a path array");
} catch (error) {
    process.stderr.write(`VNEXT_RETURN_VALIDATION_CHAIN: ${error.message}\n`);
    process.exit(2);
}
const currentReturnPath = realpathSync(path);
if (validationChain.includes(currentReturnPath)) {
    process.stderr.write(`/scope/dependency_returns: cyclic return-file chain reaches ${currentReturnPath}\n`);
    process.exit(1);
}
const childValidationChain = [...validationChain, currentReturnPath];

function fail(message) {
    failures.push(message);
}

const apiCoverageValidation = spawnSync(process.execPath, [apiCoverageValidatorPath], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
});
if (apiCoverageValidation.status !== 0) {
    fail(`/api_contract/api_return_coverage_sha256: canonical coverage manifest is invalid: ${apiCoverageValidation.stderr.trim()}`);
}
if (apiCoverage.manifest_sha256 !== apiCoverageSha256) {
    fail(`/api_contract/api_return_coverage_sha256: manifest self-hash ${apiCoverage.manifest_sha256}; computed ${apiCoverageSha256}`);
}
if (apiCoverage.authority?.api_contract_sha256 !== apiSourceSha256) {
    fail(`/api_contract/api_source_sha256: coverage authority ${apiCoverage.authority?.api_contract_sha256}; source ${apiSourceSha256}`);
}

function fileHash(file) {
    return fileSha256(file);
}

function verifyEvidencePath(file, expected, pointer) {
    if (typeof file !== "string" || typeof expected !== "string") return fail(`${pointer}: evidence path/hash is missing`);
    if (!existsSync(file)) return fail(`${pointer}: evidence file does not exist: ${file}`);
    if (!statSync(file).isFile()) return fail(`${pointer}: evidence path must be a persisted file: ${file}`);
    const actual = fileHash(file);
    if (actual !== expected) fail(`${pointer}: evidence hash ${actual}; expected ${expected}`);
}

function verifyCanonicalFilePath(file, pointer) {
    if (typeof file !== "string" || !isAbsolute(file)) {
        fail(`${pointer}: path must be absolute`);
        return false;
    }
    if (!existsSync(file) || !statSync(file).isFile()) return false;
    const canonical = realpathSync(file);
    if (file !== canonical) {
        fail(`${pointer}: path must be canonical ${canonical}`);
        return false;
    }
    return true;
}

function hashWithout(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    return createHash("sha256").update(canonicalize(preimage), "utf8").digest("hex");
}

function sameJson(left, right) {
    return canonicalize(left) === canonicalize(right);
}

function readBoundJson(binding, pointer) {
    verifyCanonicalFilePath(binding?.path, `${pointer}/path`);
    verifyEvidencePath(binding?.path, binding?.file_sha256, pointer);
    if (!existsSync(binding?.path ?? "") || !statSync(binding.path).isFile()) return undefined;
    try {
        return parseJsonStrict(readFileSync(binding.path));
    } catch (error) {
        fail(`${pointer}: strict JSON parse failed: ${error.message}`);
        return undefined;
    }
}

function requireEvidenceInputOnce(binding, pointer, sourceRecord = record) {
    const matches = (sourceRecord.evidence_inputs ?? []).filter((input) =>
        input.path === binding?.path && input.sha256 === binding?.file_sha256);
    if (matches.length !== 1) fail(`/evidence_inputs: ${pointer} must be content-addressed exactly once`);
}

function loadConsumerRootSnapshotIndex(reference, receipt, pointer, sourceRecord = record, {
    forbidOriginalRootReads = offline,
} = {}) {
    const validatedReference = validateConsumerRootSnapshotIndexReference(reference);
    requireEvidenceInputOnce(validatedReference, `${pointer} consumer root snapshot index`, sourceRecord);
    const validated = validateConsumerRootSnapshotIndex(validatedReference, receipt, {
        forbidOriginalRootReads,
    });
    return {
        reference: validatedReference,
        index: validated.index,
        validatedSnapshots: validated.validatedSnapshots,
    };
}

function loadConsumerCaptureAuthority() {
    const supplied = [consumerCaptureAuthorityPath, consumerCaptureAuthorityFileSha256, consumerCaptureAuthorityHash]
        .filter((value) => value !== undefined).length;
    if (supplied === 0) return undefined;
    if (supplied !== 3 || !hashPattern.test(consumerCaptureAuthorityFileSha256 ?? "")
        || !hashPattern.test(consumerCaptureAuthorityHash ?? "")) {
        fail("/consumer_immutable_capture_authority: complete path, file SHA-256, and authority hash are required");
        return undefined;
    }
    if (!verifyCanonicalFilePath(consumerCaptureAuthorityPath, "/consumer_immutable_capture_authority/path")) return undefined;
    const bytes = readFileSync(consumerCaptureAuthorityPath);
    const fileSha256 = createHash("sha256").update(bytes).digest("hex");
    if (fileSha256 !== consumerCaptureAuthorityFileSha256) {
        fail(`/consumer_immutable_capture_authority/file_sha256: computed ${fileSha256}`);
        return undefined;
    }
    try {
        const source = decodeUtf8Strict(bytes);
        const authority = parseJsonStrict(source);
        if (source !== `${canonicalize(authority)}\n`) throw new Error("authority must be exact RFC 8785/JCS plus one newline");
        if (canonicalize(Object.keys(authority).sort(compareCanonicalText))
            !== canonicalize(["authority_hash", "captures", "schema"])) {
            throw new Error("authority fields must be exact");
        }
        if (authority.schema !== "vnext-consumer-universe-immutable-capture-authority/1") {
            throw new Error("authority schema is invalid");
        }
        const preimage = structuredClone(authority);
        delete preimage.authority_hash;
        const authorityHash = createHash("sha256").update(canonicalize(preimage), "utf8").digest("hex");
        if (authority.authority_hash !== authorityHash || consumerCaptureAuthorityHash !== authorityHash) {
            throw new Error("authority hash drift");
        }
        if (!Array.isArray(authority.captures)) throw new Error("authority captures must be an array");
        const captures = new Map();
        for (const [index, entry] of authority.captures.entries()) {
            if (!entry || typeof entry !== "object" || Array.isArray(entry)
                || canonicalize(Object.keys(entry).sort(compareCanonicalText)) !== canonicalize(["immutable_capture", "receipt_path"])) {
                throw new Error(`capture row ${index + 1} fields must be exact`);
            }
            if (typeof entry.receipt_path !== "string" || !isAbsolute(entry.receipt_path)
                || resolve(entry.receipt_path) !== entry.receipt_path) {
                throw new Error(`capture row ${index + 1} receipt_path must be absolute and normalized`);
            }
            const capture = entry.immutable_capture;
            if (!capture || typeof capture !== "object" || Array.isArray(capture)
                || canonicalize(Object.keys(capture).sort(compareCanonicalText)) !== canonicalize(["capture_hash", "file_sha256", "path"])
                || typeof capture.path !== "string" || !isAbsolute(capture.path) || resolve(capture.path) !== capture.path
                || !hashPattern.test(capture.file_sha256 ?? "") || !hashPattern.test(capture.capture_hash ?? "")) {
                throw new Error(`capture row ${index + 1} immutable_capture is malformed`);
            }
            if (captures.has(entry.receipt_path)) throw new Error(`duplicate capture authority receipt ${entry.receipt_path}`);
            captures.set(entry.receipt_path, structuredClone(capture));
        }
        const receiptPaths = [...captures.keys()];
        if (canonicalize(receiptPaths) !== canonicalize([...receiptPaths].sort(compareCanonicalText))) {
            throw new Error("authority captures must be sorted by receipt_path");
        }
        return { authority, captures };
    } catch (error) {
        fail(`/consumer_immutable_capture_authority: ${error.message}`);
        return undefined;
    }
}

const consumerCaptureAuthority = loadConsumerCaptureAuthority();

function expectedConsumerImmutableCapture(candidate, receiptPath, pointer) {
    if (!offline) return candidate;
    return externallyAuthorizedConsumerImmutableCapture(receiptPath, pointer, candidate);
}

function externallyAuthorizedConsumerImmutableCapture(receiptPath, pointer, candidate = undefined) {
    if (!consumerCaptureAuthority) {
        throw new Error(`${pointer}: immutable validation requires an external caller-authenticated capture authority`);
    }
    const expected = consumerCaptureAuthority.captures.get(receiptPath);
    if (!expected) throw new Error(`${pointer}: external capture authority has no entry for ${receiptPath}`);
    if (candidate !== undefined && canonicalize(candidate) !== canonicalize(expected)) {
        throw new Error(`${pointer}: candidate capture reference differs from the external caller authority`);
    }
    return structuredClone(expected);
}

function isInside(root, path) {
    const fromRoot = relative(root, path);
    return fromRoot === "" || (!fromRoot.startsWith("..") && !isAbsolute(fromRoot));
}

function messageText(payload) {
    if (typeof payload?.content === "string") return payload.content;
    if (!Array.isArray(payload?.content)) return "";
    return payload.content.map((part) => typeof part?.text === "string" ? part.text : "").join("");
}

function readChallengeSession(actor, pointer, pinnedRoots, expectedPrompt, expectedAttestation) {
    const sessionPath = actor?.session_jsonl?.path;
    const reportPath = actor?.report?.path;
    if (!verifyCanonicalFilePath(sessionPath, `${pointer}/session_jsonl/path`)
        || !verifyCanonicalFilePath(reportPath, `${pointer}/report/path`)) return undefined;
    verifyEvidencePath(sessionPath, actor?.session_jsonl?.sha256, `${pointer}/session_jsonl`);
    verifyEvidencePath(reportPath, actor?.report?.sha256, `${pointer}/report`);
    for (const root of pinnedRoots) {
        if (isInside(root, sessionPath) || isInside(root, reportPath)) {
            fail(`${pointer}: session and report evidence must live outside every pinned repository`);
        }
    }
    try {
        const sessionText = decodeUtf8Strict(readFileSync(sessionPath));
        const records = sessionText.split("\n").filter(Boolean).map((line, index) => ({
            line: index + 1,
            value: parseJsonStrict(line),
        }));
        const recordTimes = records.map(({ value }, index) => {
            const timestamp = Date.parse(value.timestamp);
            if (!Number.isFinite(timestamp)) fail(`${pointer}/session_jsonl:${index + 1}: every record requires a valid timestamp`);
            return timestamp;
        });
        if (recordTimes.some((timestamp, index) => index > 0 && timestamp < recordTimes[index - 1])) {
            fail(`${pointer}/session_jsonl: record timestamps must be nondecreasing in file order`);
        }
        const metas = records.filter(({ value }) => value.type === "session_meta");
        const contexts = records.filter(({ value }) => value.type === "turn_context");
        const users = records.filter(({ value }) => value.type === "response_item"
            && value.payload?.type === "message" && value.payload?.role === "user");
        const finals = records.filter(({ value }) => value.type === "response_item"
            && value.payload?.type === "message" && value.payload?.role === "assistant"
            && value.payload?.phase === "final_answer");
        const completions = records.filter(({ value }) => value.type === "event_msg"
            && value.payload?.type === "task_complete");
        if (metas.length !== 1 || metas[0].value.payload?.id !== actor.session_id) {
            fail(`${pointer}/session_jsonl: session_meta must bind the exact session_id`);
        }
        if (contexts.length !== 1 || contexts[0].value.payload?.model !== "gpt-5.6-sol"
            || contexts[0].value.payload?.effort !== "ultra") {
            fail(`${pointer}/session_jsonl: expected exactly one declared gpt-5.6-sol ultra turn`);
        }
        if (users.length !== 1) fail(`${pointer}/session_jsonl: fresh review requires exactly one user message`);
        if (users.length === 1) {
            const content = users[0].value.payload?.content;
            if (!Array.isArray(content) || content.length !== 1
                || content[0]?.type !== "input_text"
                || canonicalize(Object.keys(content[0] ?? {}).sort()) !== canonicalize(["text", "type"])) {
                fail(`${pointer}/session_jsonl: user prompt must be exactly one input_text block with no attachment`);
            }
            if (messageText(users[0].value.payload) !== expectedPrompt) {
                fail(`${pointer}/session_jsonl: user prompt must bind the exact wave/contract/dependency/state epoch`);
            }
        }
        if (finals.length !== 1 || completions.length !== 1 || finals[0]?.line >= completions[0]?.line) {
            fail(`${pointer}/session_jsonl: one final authored report must precede one task_complete`);
        }
        if (metas.length === 1 && users.length === 1 && contexts.length === 1
            && finals.length === 1 && completions.length === 1
            && !(metas[0].line < users[0].line && users[0].line < contexts[0].line
                && contexts[0].line < finals[0].line && finals[0].line < completions[0].line)) {
            fail(`${pointer}/session_jsonl: required record order is session_meta, user, turn_context, final, task_complete`);
        }
        if (finals.length === 1) {
            const content = finals[0].value.payload?.content;
            if (!Array.isArray(content) || content.length !== 1
                || content[0]?.type !== "output_text"
                || canonicalize(Object.keys(content[0] ?? {}).sort()) !== canonicalize(["text", "type"])) {
                fail(`${pointer}/session_jsonl: final report must be exactly one output_text block`);
            }
        }
        const reportText = decodeUtf8Strict(readFileSync(reportPath));
        const attestationLine = `${expectedAttestation}\n`;
        if (!reportText.endsWith(attestationLine)
            || reportText.indexOf(expectedAttestation) !== reportText.lastIndexOf(expectedAttestation)) {
            fail(`${pointer}/report: terminal report must bind the full canonical challenge input`);
        }
        const substantiveReport = reportText.endsWith(attestationLine)
            ? reportText.slice(0, -attestationLine.length).trim()
            : "";
        if (substantiveReport.length < 24) {
            fail(`${pointer}/report: canonical challenge token cannot replace substantive terminal analysis`);
        }
        const authoredText = messageText(finals[0]?.value.payload);
        if (authoredText !== reportText || completions[0]?.value.payload?.last_agent_message !== reportText) {
            fail(`${pointer}/report: persisted report must be byte-identical to the session's final authored report`);
        }
        const startedAt = Date.parse(metas[0]?.value.timestamp);
        const completedAt = Date.parse(completions[0]?.value.timestamp);
        if (!Number.isFinite(startedAt) || !Number.isFinite(completedAt) || completedAt <= startedAt) {
            fail(`${pointer}/session_jsonl: session timestamps are invalid or reversed`);
        }
        return { startedAt, completedAt, reportText, sessionText, records: records.map(({ value }) => value) };
    } catch (error) {
        fail(`${pointer}/session_jsonl: strict transcript validation failed: ${error.message}`);
        return undefined;
    }
}

function inspect(value, pointer = "") {
    if (value === null) fail(`${pointer || "/"}: null is forbidden; use a typed not_applicable object or an empty collection`);
    if (typeof value === "number" && (!Number.isFinite(value) || !Number.isSafeInteger(value))) {
        fail(`${pointer || "/"}: numbers must be finite safe integers; measured decimals are evidence strings with units`);
    }
    if (Array.isArray(value)) value.forEach((item, index) => inspect(item, `${pointer}/${index}`));
    else if (value && typeof value === "object") {
        for (const [key, child] of Object.entries(value)) inspect(child, `${pointer}/${key}`);
    }
}

inspect(record);
failures.push(...validateJsonSchema(record, schema));
const allowed = new Set(Object.keys(schema.properties));
for (const required of schema.required) if (!(required in record)) fail(`/${required}: required property missing`);
for (const key of Object.keys(record)) if (!allowed.has(key)) fail(`/${key}: undeclared top-level property; use /annexes/<namespace>`);

if (record.schema !== "vnext-wave-return/2") fail("/schema: expected vnext-wave-return/2");
if (!wavePattern.test(record.wave_id ?? "")) fail("/wave_id: invalid wave ID");
if (!waveContracts.has(record.wave_id)) fail("/wave_id: wave is absent from the canonical registry");
if (!schema.properties.status.enum.includes(record.status)) fail(`/status: invalid status ${record.status}`);
if (!hashPattern.test(record.return_hash ?? "")) fail("/return_hash: expected lowercase SHA-256");
if (!Array.isArray(record.pins) || record.pins.length === 0) fail("/pins: at least one pin is required");
if (!Array.isArray(record.gates) || record.gates.length === 0) fail("/gates: at least one falsifiable gate is required");

const cleanGitStatusSha256 = createHash("sha256").update(Buffer.alloc(0)).digest("hex");
const historicalGateWorktrees = new Map();

function historicalGateWorktree(pin, pointer) {
    const key = `${pin?.path}\0${pin?.head}`;
    if (historicalGateWorktrees.has(key)) return historicalGateWorktrees.get(key);
    if (!pin || pin.dirty_after_sha256 !== cleanGitStatusSha256) {
        fail(`${pointer}: immutable historical gate replay requires a clean committed predecessor epoch`);
        historicalGateWorktrees.set(key, undefined);
        return undefined;
    }
    if (!existsSync(pin.path) || !statSync(pin.path).isDirectory() || realpathSync(pin.path) !== pin.path) {
        fail(`${pointer}: immutable predecessor Git root is unavailable or noncanonical`);
        historicalGateWorktrees.set(key, undefined);
        return undefined;
    }
    const rootProbe = spawnSync("git", ["-C", pin.path, "rev-parse", "--show-toplevel"], { encoding: "utf8" });
    const commitProbe = spawnSync("git", ["-C", pin.path, "cat-file", "-e", `${pin.head}^{commit}`], { encoding: "utf8" });
    if (rootProbe.status !== 0 || rootProbe.stdout.trim() !== pin.path || commitProbe.status !== 0) {
        fail(`${pointer}: immutable predecessor commit is unavailable from its exact Git root`);
        historicalGateWorktrees.set(key, undefined);
        return undefined;
    }
    const temporaryRoot = realpathSync(mkdtempSync(join(tmpdir(), "vnext-return-gate-replay-")));
    const worktree = join(temporaryRoot, "worktree");
    const add = spawnSync("git", ["-C", pin.path, "worktree", "add", "--detach", "--force", worktree, pin.head], {
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
    });
    if (add.status !== 0) {
        rmSync(temporaryRoot, { recursive: true, force: true });
        fail(`${pointer}: cannot materialize immutable predecessor commit: ${(add.stderr || add.stdout).trim()}`);
        historicalGateWorktrees.set(key, undefined);
        return undefined;
    }
    const canonicalWorktree = realpathSync(worktree);
    const head = spawnSync("git", ["-C", canonicalWorktree, "rev-parse", "HEAD"], { encoding: "utf8" });
    const status = spawnSync("git", ["-C", canonicalWorktree, "status", "--porcelain=v1", "-z", "--untracked-files=all"], { encoding: null });
    if (head.status !== 0 || head.stdout.trim() !== pin.head || status.status !== 0 || status.stdout.length !== 0) {
        spawnSync("git", ["-C", pin.path, "worktree", "remove", "--force", canonicalWorktree], { encoding: "utf8" });
        rmSync(temporaryRoot, { recursive: true, force: true });
        fail(`${pointer}: materialized predecessor epoch is not its exact clean commit`);
        historicalGateWorktrees.set(key, undefined);
        return undefined;
    }
    const materialized = { root: canonicalWorktree, temporaryRoot, repository: pin.path };
    historicalGateWorktrees.set(key, materialized);
    return materialized;
}

function cleanupHistoricalGateWorktrees() {
    for (const materialized of historicalGateWorktrees.values()) {
        if (!materialized) continue;
        spawnSync("git", ["-C", materialized.repository, "worktree", "remove", "--force", materialized.root], { encoding: "utf8" });
        rmSync(materialized.temporaryRoot, { recursive: true, force: true });
    }
    historicalGateWorktrees.clear();
}

function historicalBoundsAuthorityPath(binding, pins, pointer) {
    if (!historicalGateReplay) return undefined;
    if (!binding || typeof binding.path !== "string" || !isAbsolute(binding.path) || resolve(binding.path) !== binding.path) {
        throw new Error(`${pointer}: bounds authority logical path must be absolute, normalized, and nonescaping`);
    }
    const containing = (pins ?? []).map((pin, index) => {
        if (typeof pin?.path !== "string" || !isAbsolute(pin.path)) return undefined;
        const offset = relative(pin.path, binding.path);
        if (!offset || isAbsolute(offset) || offset.startsWith("..") || offset.includes("\\")
            || offset.split("/").some((part) => !part || part === "." || part === "..")) return undefined;
        return { pin, index, offset };
    }).filter(Boolean);
    if (containing.length !== 1) {
        throw new Error(`${pointer}: historical bounds authority must lie beneath exactly one return pin; observed ${containing.length}`);
    }
    const { pin, index, offset } = containing[0];
    const materialized = historicalGateWorktree(pin, `${pointer}/pin/${index}`);
    if (!materialized) throw new Error(`${pointer}: containing pin could not be materialized`);
    const tree = spawnSync("git", ["-C", materialized.root, "ls-tree", "-z", "--full-tree", pin.head, "--", offset], {
        encoding: null,
        maxBuffer: 4 * 1024 * 1024,
    });
    const rows = tree.status === 0 ? tree.stdout.toString("utf8").split("\0").filter(Boolean) : [];
    const match = rows.length === 1 ? /^(100644|100755) blob [0-9a-f]{40}\t(.+)$/.exec(rows[0]) : undefined;
    if (!match || match[2] !== offset) {
        throw new Error(`${pointer}: authority must be one tracked regular non-symlink file at the pinned commit`);
    }
    const mapped = resolve(materialized.root, offset);
    if (!existsSync(mapped)) throw new Error(`${pointer}: authority exists only in the mutable checkout, not the pinned commit`);
    const metadata = lstatSync(mapped);
    if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(mapped) !== mapped) {
        throw new Error(`${pointer}: materialized authority must be a canonical regular non-symlink file`);
    }
    return {
        verificationPath: mapped,
        allowedAdditionalWorktrees: [...historicalGateWorktrees.values()]
            .filter((candidate) => candidate?.repository === materialized.repository)
            .map(({ root }) => root)
            .sort(compareCanonicalText),
    };
}

function consumerBoundsOptions(binding, pins, pointer, validationMode, immutableCapture) {
    const historicalAuthority = validationMode === "live"
        ? historicalBoundsAuthorityPath(binding, pins, pointer)
        : undefined;
    return {
        boundsAuthority: binding,
        validationMode,
        ...(immutableCapture === undefined ? {} : { immutableCapture }),
        ...(historicalAuthority ? {
            boundsAuthorityVerificationPath: historicalAuthority.verificationPath,
            requireCanonicalBoundsAuthority: false,
            ...(validationMode === "live" ? {
                allowedAdditionalWorktrees: historicalAuthority.allowedAdditionalWorktrees,
            } : {}),
        } : {}),
    };
}

const waveContract = waveContracts.get(record.wave_id);
let rootOutcomePolicy;
try {
    rootOutcomePolicy = requireWaveOutcome(waveEdgePolicy, record.wave_id);
} catch (error) {
    fail(`/status: ${error.message}`);
}
const rootAdvancingOutcome = rootOutcomePolicy?.advancing_statuses.includes(record.status) === true;
const rootReopeningOutcome = reopeningStatuses.has(record.status);
const rootNonterminalOutcome = nonterminalStatuses.has(record.status);
if (!rootAdvancingOutcome && !rootReopeningOutcome && !rootNonterminalOutcome) {
    fail(`/status: ${record.status} is not an advancing outcome for ${record.wave_id}; expected ${JSON.stringify(rootOutcomePolicy?.advancing_statuses ?? [])}`);
}
if (immutableAuthority && !terminalStatuses.has(record.status)) {
    fail(`/status: immutable authority requires an advancing or reopening terminal outcome; found ${record.status}`);
}
const expectedDependencies = [...(waveContract?.contract.dependencies ?? [])].sort();
const dependencyReturns = record.scope?.dependency_returns ?? [];
const returnedDependencies = dependencyReturns.map(({ wave_id }) => wave_id);
if (new Set(returnedDependencies).size !== returnedDependencies.length) {
    fail("/scope/dependency_returns: direct predecessor wave IDs must be unique");
}
if (canonicalize(returnedDependencies) !== canonicalize([...returnedDependencies].sort())) {
    fail("/scope/dependency_returns: entries must be sorted by direct predecessor wave ID");
}
if (canonicalize(expectedDependencies) !== canonicalize([...returnedDependencies].sort())) {
    fail(`/scope/dependency_returns: expected exact direct predecessors ${expectedDependencies.join(",") || "None"}`);
}
if (record.scope?.wave_contract_sha256 !== waveContract?.sha256) {
    fail(`/scope/wave_contract_sha256: expected ${waveContract?.sha256}`);
}
const expectedSeedRequirements = [...(waveContract?.contract.seed_requirements ?? [])]
    .sort((left, right) => compareCanonicalText(left.id, right.id));
const returnedSeedRequirements = [...(record.scope?.seed_requirements_verified ?? [])]
    .sort((left, right) => compareCanonicalText(left.id, right.id));
if (new Set(returnedSeedRequirements.map(({ id }) => id)).size !== returnedSeedRequirements.length) {
    fail("/scope/seed_requirements_verified: seed requirement IDs must be unique");
}
if (canonicalize(returnedSeedRequirements) !== canonicalize(expectedSeedRequirements)) {
    fail("/scope/seed_requirements_verified: must equal the exact canonical seed-requirement projection");
}
if (record.scope?.mission !== waveContract?.contract.mission) {
    fail("/scope/mission: must equal the canonical wave mission");
}

function assertCanonicalWaveDagAcyclic() {
    const visited = new Set();
    const visiting = new Set();
    const walk = (waveId, trail) => {
        if (visiting.has(waveId)) {
            fail(`/scope/dependency_returns: canonical predecessor cycle ${[...trail, waveId].join(" -> ")}`);
            return;
        }
        if (visited.has(waveId)) return;
        const contract = waveContracts.get(waveId)?.contract;
        if (!contract) {
            fail(`/scope/dependency_returns: canonical predecessor ${waveId} is absent from the registry`);
            return;
        }
        visiting.add(waveId);
        for (const dependency of contract.dependencies) walk(dependency, [...trail, waveId]);
        visiting.delete(waveId);
        visited.add(waveId);
    };
    for (const waveId of waveContracts.keys()) walk(waveId, []);
}
assertCanonicalWaveDagAcyclic();

function certifiedRepositoryState(returned, pin, pointer) {
    const certifiedStates = [];
    for (const [gateIndex, gate] of (returned.gates ?? []).entries()) {
        try {
            if (!existsSync(gate.receipt?.path ?? "")) continue;
            const receipt = parseJsonStrict(readFileSync(gate.receipt.path));
            if (receipt.execution?.applicability === "applicable"
                && receipt.execution.pin_repository === pin.repository
                && receipt.execution.cwd === pin.path) {
                certifiedStates.push({ source: `gate ${gateIndex}`, sha256: receipt.execution.repository_state_sha256 });
            }
        } catch (error) {
            fail(`${pointer}: cannot read gate certificate: ${error.message}`);
        }
    }
    const challenge = returned.annexes?.["implementation-challenge"];
    if (challenge?.applicability === "applicable") {
        for (const [stateIndex, state] of (challenge.repository_states ?? []).entries()) {
            if (state.repository === pin.repository && state.path === pin.path) {
                certifiedStates.push({ source: `challenge ${stateIndex}`, sha256: state.sha256 });
            }
        }
    }
    const stateHashes = [...new Set(certifiedStates.map(({ sha256 }) => sha256))];
    if (stateHashes.length !== 1) {
        fail(`${pointer}: ${pin.repository} must expose one exact gate/challenge epoch; found ${JSON.stringify(certifiedStates)}`);
    }
    return stateHashes[0];
}

function expectedRepositoryStates(dependency, binding, pointer) {
    const pins = dependency.pins ?? [];
    const boundByKey = new Map((binding.repository_states ?? []).map((state) => [
        `${state.repository}\0${state.path}`,
        state,
    ]));
    const seen = new Set();
    const result = [];
    for (const [index, pin] of pins.entries()) {
        const key = `${pin.repository}\0${pin.path}`;
        if (seen.has(key)) {
            fail(`${pointer}/repository_states: dependency pin ${pin.repository} ${pin.path} is duplicated`);
            continue;
        }
        seen.add(key);
        const canonicalPath = pin.path;
        const sha256 = certifiedRepositoryState(dependency, pin, `${pointer}/repository_states`)
            ?? boundByKey.get(`${pin.repository}\0${canonicalPath}`)?.sha256
            ?? "";
        result.push({ repository: pin.repository, path: canonicalPath, sha256 });
    }
    return result.sort((left, right) => compareCanonicalText(
        `${left.repository}\0${left.path}`,
        `${right.repository}\0${right.path}`,
    ));
}

for (const [index, binding] of dependencyReturns.entries()) {
    const pointer = `/scope/dependency_returns/${index}`;
    verifyCanonicalFilePath(binding.path, `${pointer}/path`);
    verifyEvidencePath(binding.path, binding.file_sha256, pointer);
    if (!existsSync(binding.path) || !statSync(binding.path).isFile()) continue;
    let dependency;
    try {
        dependency = parseJsonStrict(readFileSync(binding.path));
    } catch (error) {
        fail(`${pointer}: strict dependency return parse failed: ${error.message}`);
        continue;
    }
    for (const error of validateJsonSchema(dependency, schema)) fail(`${pointer}/return${error}`);
    const dependencyContract = waveContracts.get(binding.wave_id);
    if (dependency.wave_id !== binding.wave_id) fail(`${pointer}/wave_id: bound file returns ${dependency.wave_id}`);
    try {
        const policy = requireWaveEdgePolicy(waveEdgePolicy, binding.wave_id, record.wave_id);
        if (!policy.allowed_statuses.includes(dependency.status)) {
            fail(`${pointer}/return/status: static predecessor ${policy.from} -> ${policy.to} requires ${JSON.stringify(policy.allowed_statuses)}; found ${dependency.status}`);
        }
    } catch (error) {
        fail(`${pointer}/return/status: ${error.message}`);
    }
    if (binding.return_hash !== dependency.return_hash) fail(`${pointer}/return_hash: does not match predecessor return`);
    if (binding.wave_contract_sha256 !== dependency.scope?.wave_contract_sha256) {
        fail(`${pointer}/wave_contract_sha256: does not match predecessor return`);
    }
    if (binding.wave_contract_sha256 !== dependencyContract?.sha256) {
        fail(`${pointer}/wave_contract_sha256: expected canonical ${dependencyContract?.sha256}`);
    }
    const dependencyPreimage = { ...dependency };
    delete dependencyPreimage.return_hash;
    const dependencyReturnHash = createHash("sha256").update(canonicalize(dependencyPreimage), "utf8").digest("hex");
    if (dependency.return_hash !== dependencyReturnHash) {
        fail(`${pointer}/return_hash: predecessor computed ${dependencyReturnHash}`);
    }
    const returnedStates = [...(binding.repository_states ?? [])]
        .map((state) => ({ ...state }))
        .sort((left, right) => compareCanonicalText(
            `${left.repository}\0${left.path}`,
            `${right.repository}\0${right.path}`,
        ));
    const expectedStates = expectedRepositoryStates(dependency, binding, pointer);
    if (canonicalize(returnedStates) !== canonicalize(expectedStates)) {
        fail(`${pointer}/repository_states: must bind the predecessor's exact current pinned repository states`);
    }
    const corpusHash = dependency.annexes?.closure?.inspected_corpus_sha256;
    if (corpusHash) {
        const inputs = (dependency.evidence_inputs ?? []).filter(({ sha256 }) => sha256 === corpusHash);
        if (inputs.length !== 1) fail(`${pointer}/corpus_epoch: predecessor does not bind exactly one corpus input`);
        const input = inputs[0];
        if (binding.corpus_epoch?.applicability !== "applicable" || binding.corpus_epoch.path !== input?.path || binding.corpus_epoch.sha256 !== corpusHash) {
            fail(`${pointer}/corpus_epoch: must bind the predecessor's exact inspected corpus input`);
        } else verifyEvidencePath(binding.corpus_epoch.path, binding.corpus_epoch.sha256, `${pointer}/corpus_epoch`);
    } else if (binding.corpus_epoch?.applicability !== "not_applicable") {
        fail(`${pointer}/corpus_epoch: only a predecessor with an inspected corpus epoch may claim one`);
    }
}

const authorizationClosure = { nodes: [], edges: [], closure_hash: "", descendant_closure_hash: "" };
const collectScopeClosure = true;
let managedDescendantValidationCount = 0;
if (collectScopeClosure) {
    const visited = new Set();
    const active = new Set([currentReturnPath]);
    const identityByWave = new Map();
    const rootFileSha256 = fileHash(currentReturnPath);
    const rootIdentity = canonicalize({
        path: currentReturnPath,
        file_sha256: rootFileSha256,
        return_hash: record.return_hash,
    });
    identityByWave.set(record.wave_id, rootIdentity);
    authorizationClosure.nodes.push({
        wave_id: record.wave_id,
        path: currentReturnPath,
        file_sha256: rootFileSha256,
        return_hash: record.return_hash,
        wave_contract_sha256: record.scope?.wave_contract_sha256,
        status: record.status,
    });

    const walk = (binding, consumerWaveId, pointer) => {
        if (typeof binding?.path !== "string" || !existsSync(binding.path) || !statSync(binding.path).isFile()) {
            fail(`${pointer}/path: immutable dependency return file is unavailable`);
            return;
        }
        const canonicalPath = realpathSync(binding.path);
        if (binding.path !== canonicalPath) {
            fail(`${pointer}/path: canonical dependency return path required ${canonicalPath}`);
            return;
        }
        const bytes = readFileSync(canonicalPath);
        const fileSha256 = createHash("sha256").update(bytes).digest("hex");
        let dependency;
        try {
            dependency = parseJsonStrict(bytes);
        } catch (error) {
            fail(`${pointer}: strict dependency return parse failed: ${error.message}`);
            return;
        }
        const preimage = { ...dependency };
        delete preimage.return_hash;
        const returnHash = createHash("sha256").update(canonicalize(preimage), "utf8").digest("hex");
        const contractSha256 = waveContracts.get(dependency.wave_id)?.sha256;
        if (binding.wave_id !== dependency.wave_id) fail(`${pointer}/wave_id: bound file returns ${dependency.wave_id}`);
        if (binding.file_sha256 !== fileSha256) fail(`${pointer}/file_sha256: computed ${fileSha256}`);
        if (binding.return_hash !== returnHash || dependency.return_hash !== returnHash) {
            fail(`${pointer}/return_hash: computed ${returnHash}`);
        }
        if (binding.wave_contract_sha256 !== dependency.scope?.wave_contract_sha256
            || binding.wave_contract_sha256 !== contractSha256) {
            fail(`${pointer}/wave_contract_sha256: exact canonical dependency contract required ${contractSha256}`);
        }
        let edgePolicy;
        try {
            edgePolicy = requireWaveEdgePolicy(waveEdgePolicy, dependency.wave_id, consumerWaveId);
        } catch (error) {
            fail(`${pointer}/status: ${error.message}`);
        }
        if (edgePolicy && !edgePolicy.allowed_statuses.includes(dependency.status)) {
            fail(`${pointer}/status: static predecessor ${edgePolicy.from} -> ${edgePolicy.to} requires ${JSON.stringify(edgePolicy.allowed_statuses)}; found ${dependency.status}`);
        }
        if (edgePolicy) authorizationClosure.edges.push({
            from: dependency.wave_id,
            to: consumerWaveId,
            return_hash: returnHash,
            status: dependency.status,
            role: edgePolicy.role,
            allowed_statuses: edgePolicy.allowed_statuses,
            edge_policy_sha256: edgePolicySha256(edgePolicy),
        });
        const identity = canonicalize({ path: canonicalPath, file_sha256: fileSha256, return_hash: returnHash });
        const priorIdentity = identityByWave.get(dependency.wave_id);
        if (priorIdentity && priorIdentity !== identity) {
            fail(`${pointer}: dependency wave ${dependency.wave_id} has conflicting immutable returns`);
            return;
        }
        identityByWave.set(dependency.wave_id, identity);
        if (active.has(canonicalPath)) {
            fail(`${pointer}: cyclic immutable dependency-return path reaches ${canonicalPath}`);
            return;
        }
        if (visited.has(identity)) return;
        visited.add(identity);
        authorizationClosure.nodes.push({
            wave_id: dependency.wave_id,
            path: canonicalPath,
            file_sha256: fileSha256,
            return_hash: returnHash,
            wave_contract_sha256: dependency.scope?.wave_contract_sha256,
            status: dependency.status,
        });
        if (immutableAuthority || !offline) {
            const child = spawnSync(process.execPath, [validatorPath, canonicalPath, "--historical-certificate", ...consumerCaptureAuthorityArgs], {
                encoding: "utf8",
                env: {
                    ...process.env,
                    VNEXT_RETURN_VALIDATION_CHAIN: JSON.stringify(childValidationChain),
                },
                maxBuffer: 128 * 1024 * 1024,
            });
            managedDescendantValidationCount += 1;
            if (child.status !== 0) {
                fail(`${pointer}: universal historical dependency validation failed: ${(child.stderr || child.stdout || child.error?.message || "unknown failure").trim()}`);
            } else {
                try {
                    const receipt = parseJsonStrict(child.stdout.trim());
                    if (receipt.mode !== "offline-historical-certificate"
                        || receipt.completion_eligible !== false
                        || receipt.proof_semantics?.accepted_at_epoch !== true
                        || receipt.proof_semantics?.holds_now !== false
                        || receipt.proof_semantics?.authorizes_decision !== false
                        || receipt.historical_gate_replay?.materialized_pin_count !== (dependency.pins ?? []).length
                        || receipt.historical_gate_replay?.executed_gate_count !== (dependency.gates ?? []).filter(({ kind }) => kind === "command").length
                        || !hashPattern.test(receipt.historical_gate_replay?.epoch_sha256 ?? "")
                        || receipt.wave_id !== dependency.wave_id
                        || receipt.status !== dependency.status
                        || receipt.return_hash !== returnHash) {
                        fail(`${pointer}: universal historical dependency receipt does not bind the exact immutable return`);
                    }
                } catch (error) {
                    fail(`${pointer}: universal historical dependency receipt is invalid: ${error.message}`);
                }
            }
        }
        active.add(canonicalPath);
        for (const [index, childBinding] of (dependency.scope?.dependency_returns ?? []).entries()) {
            walk(childBinding, dependency.wave_id, `${pointer}/return/scope/dependency_returns/${index}`);
        }
        active.delete(canonicalPath);
    };
    for (const [index, binding] of dependencyReturns.entries()) {
        walk(binding, record.wave_id, `/scope/dependency_returns/${index}`);
    }
    if ((immutableAuthority || !offline)
        && managedDescendantValidationCount !== authorizationClosure.nodes.length - 1) {
        fail(`/scope/dependency_returns: expected one managed validation per unique descendant; found ${managedDescendantValidationCount} for ${authorizationClosure.nodes.length - 1}`);
    }
    authorizationClosure.nodes.sort((left, right) => compareCanonicalText(
        `${left.wave_id}\0${left.return_hash}`,
        `${right.wave_id}\0${right.return_hash}`,
    ));
    authorizationClosure.edges.sort((left, right) => compareCanonicalText(
        `${left.from}\0${left.to}\0${left.return_hash}\0${left.status}\0${left.role}`,
        `${right.from}\0${right.to}\0${right.return_hash}\0${right.status}\0${right.role}`,
    ));
    authorizationClosure.closure_hash = createHash("sha256").update(canonicalize({
        nodes: authorizationClosure.nodes,
        edges: authorizationClosure.edges,
    }), "utf8").digest("hex");
    authorizationClosure.descendant_closure_hash = createHash("sha256").update(canonicalize({
        nodes: authorizationClosure.nodes.filter(({ wave_id }) => wave_id !== record.wave_id),
        edges: authorizationClosure.edges,
    }), "utf8").digest("hex");
}

const expectedGates = waveContract?.contract.gates ?? [];
if ((record.gates ?? []).length !== expectedGates.length) {
    fail(`/gates: expected the exact ${expectedGates.length}-gate canonical set`);
}
for (const [index, expectedGate] of expectedGates.entries()) {
    const returnedGate = record.gates?.[index];
    if (!returnedGate) continue;
    for (const [contractField, returnField] of [["id", "id"], ["kind", "kind"], ["subject", "command_or_probe"], ["expected", "expected"]]) {
        if (returnedGate[returnField] !== expectedGate[contractField]) {
            fail(`/gates/${index}/${returnField}: must equal canonical ${contractField} ${JSON.stringify(expectedGate[contractField])}`);
        }
    }
}

for (const [index, input] of (record.evidence_inputs ?? []).entries()) {
    verifyEvidencePath(input.path, input.sha256, `/evidence_inputs/${index}`);
    if (input.path.includes("/r1-opus-refuted/")) fail(`/evidence_inputs/${index}: quarantined evidence path is forbidden`);
}
const refusalRows = record.terminal_disposition?.refusals ?? [];
if (record.status === "REFUSED" && refusalRows.length === 0) {
    fail("/terminal_disposition/refusals: REFUSED requires at least one typed missing-capability row");
}
const refusalCodes = refusalRows.map(({ code }) => code);
if (new Set(refusalCodes).size !== refusalCodes.length) {
    fail("/terminal_disposition/refusals: refusal codes must be unique");
}
for (const [index, refusal] of refusalRows.entries()) {
    for (const [evidenceIndex, binding] of (refusal.evidence ?? []).entries()) {
        const matches = (record.evidence_inputs ?? []).filter(({ path: inputPath, sha256 }) => (
            inputPath === binding.path && sha256 === binding.sha256
        ));
        if (matches.length !== 1) {
            fail(`/terminal_disposition/refusals/${index}/evidence/${evidenceIndex}: no-fallback evidence must bind one exact evidence input`);
        }
    }
}
verifyEvidencePath(record.quarantine_attestation?.tool_log_path, record.quarantine_attestation?.tool_log_sha256, "/quarantine_attestation/tool_log");

function inspectEvidence(value, pointer = "") {
    if (Array.isArray(value)) return value.forEach((item, index) => inspectEvidence(item, `${pointer}/${index}`));
    if (!value || typeof value !== "object") return;
    if (typeof value.path === "string" && typeof value.sha256 === "string" && typeof value.description === "string") {
        verifyEvidencePath(value.path, value.sha256, pointer);
    }
    for (const [key, child] of Object.entries(value)) inspectEvidence(child, `${pointer}/${key}`);
}
inspectEvidence(record);

function waveIsAncestor(ancestor, descendant) {
    const visited = new Set();
    const walk = (waveId) => {
        if (waveId === ancestor) return true;
        if (visited.has(waveId)) return false;
        visited.add(waveId);
        return (waveContracts.get(waveId)?.contract.dependencies ?? []).some(walk);
    };
    return ancestor !== descendant && walk(descendant);
}

function collectTransitiveDeletionOwners(bindings) {
    const visited = new Set();
    const owners = new Map();
    const walk = (binding, pointer) => {
        if (!binding?.path || !existsSync(binding.path) || !statSync(binding.path).isFile()) return;
        const canonicalPath = realpathSync(binding.path);
        if (visited.has(canonicalPath)) return;
        visited.add(canonicalPath);
        if (binding.file_sha256 && fileHash(canonicalPath) !== binding.file_sha256) {
            fail(`${pointer}: transitive return file hash drift`);
            return;
        }
        let ancestor;
        try {
            ancestor = parseJsonStrict(readFileSync(canonicalPath));
        } catch (error) {
            fail(`${pointer}: transitive return parse failed: ${error.message}`);
            return;
        }
        const preimage = { ...ancestor };
        delete preimage.return_hash;
        const computed = createHash("sha256").update(canonicalize(preimage), "utf8").digest("hex");
        if (ancestor.return_hash !== computed || (binding.return_hash && binding.return_hash !== computed)) {
            fail(`${pointer}: transitive return self-hash drift`);
            return;
        }
        const deletion = ancestor.annexes?.["deletion-judgment"];
        if (deletion?.phase === "owner-precut") {
            const existing = owners.get(ancestor.wave_id);
            const identity = canonicalize({ path: canonicalPath, file_sha256: fileHash(canonicalPath), return_hash: computed, annex_hash: deletion.annex_hash });
            if (existing && existing !== identity) fail(`${pointer}: deletion owner ${ancestor.wave_id} has conflicting terminal returns`);
            owners.set(ancestor.wave_id, identity);
        }
        for (const [index, child] of (ancestor.scope?.dependency_returns ?? []).entries()) {
            walk(child, `${pointer}/scope/dependency_returns/${index}`);
        }
    };
    bindings.forEach((binding, index) => walk(binding, `/scope/dependency_returns/${index}`));
    return [...owners.keys()].sort();
}

const consumerAnnex = record.annexes?.["consumer-universe"];
let consumerSnapshotIndex;
const c00uBlockingConsumerReturn = record.wave_id === "C00U"
    && record.status === "BLOCKED"
    && consumerAnnex?.resolvable === false
    && Array.isArray(consumerAnnex.blockers)
    && consumerAnnex.blockers.length > 0;

function consumerBlockerRemainders({ receipt, universe }) {
    const ownersByFinding = new Map();
    for (const [kind, rows] of [["root", universe.roots], ["edge", universe.edges]]) {
        for (const row of rows.filter(({ disposition }) => disposition.status === "unavailable")) {
            const finding = `${kind}:${row.id}:unavailable:${row.disposition.retrigger.wave_id}:${row.disposition.retrigger.condition}`;
            if (ownersByFinding.has(finding)) throw new Error(`duplicate typed unavailable blocker ${JSON.stringify(finding)}`);
            ownersByFinding.set(finding, row.disposition.retrigger.wave_id);
        }
    }
    const expectedFindings = [...ownersByFinding.keys()].sort(compareCanonicalText);
    const receiptFindings = [...receipt.blockers].sort(compareCanonicalText);
    if (canonicalize(receiptFindings) !== canonicalize(expectedFindings)) {
        throw new Error("typed unavailable receipt blockers do not biject to unavailable root and edge dispositions");
    }
    return receipt.blockers.map((finding) => ({
        finding,
        owner: ownersByFinding.get(finding),
        blocking: true,
    }));
}

if (consumerAnnex && record.wave_id === "C00U") {
    if (record.status === "COMPLETE") {
        if (consumerAnnex.resolvable !== true || !Array.isArray(consumerAnnex.blockers) || consumerAnnex.blockers.length !== 0) {
            fail("/annexes/consumer-universe: C00U COMPLETE requires resolvable true and empty blockers");
        }
    } else if (record.status === "BLOCKED") {
        if (consumerAnnex.resolvable !== false || !Array.isArray(consumerAnnex.blockers) || consumerAnnex.blockers.length === 0) {
            fail("/annexes/consumer-universe: C00U BLOCKED requires resolvable false and nonempty blockers");
        }
    } else {
        fail(`/status: C00U consumer-universe return must be COMPLETE or BLOCKED; found ${record.status}`);
    }
}
if (consumerAnnex && record.wave_id === "C05"
    && (consumerAnnex.resolvable !== true || !Array.isArray(consumerAnnex.blockers) || consumerAnnex.blockers.length !== 0)) {
    fail("/annexes/consumer-universe: C05 requires resolvable true and empty blockers");
}

if (["C00U", "C05"].includes(record.wave_id)) {
    if (!consumerAnnex) {
        fail("/annexes/consumer-universe: C00U and C05 require the typed v2 receipt annex");
    } else {
        try {
            const immutableCapture = expectedConsumerImmutableCapture(
                consumerAnnex.immutable_capture,
                consumerAnnex.receipt_path,
                "/annexes/consumer-universe/immutable_capture",
            );
            requireEvidenceInputOnce(immutableCapture, "consumer-universe immutable capture certificate");
            const consumerOptions = consumerBoundsOptions(
                consumerAnnex.bounds_authority,
                record.pins,
                "/annexes/consumer-universe/bounds_authority",
                offline ? "immutable" : "live",
                immutableCapture,
            );
            consumerOptions.requireResolvable = !c00uBlockingConsumerReturn;
            const verified = validateConsumerUniverseReceipt(consumerAnnex.receipt_path, consumerOptions);
            consumerSnapshotIndex = loadConsumerRootSnapshotIndex(
                consumerAnnex.snapshot_index,
                verified.receipt,
                "/annexes/consumer-universe/snapshot_index",
            );
            const expectedProjection = consumerUniverseAnnexProjection(
                record.wave_id,
                consumerAnnex.receipt_path,
                verified,
                immutableCapture,
                consumerSnapshotIndex.reference,
            );
            const returnedProjection = { ...consumerAnnex };
            delete returnedProjection.baseline;
            if (canonicalize(returnedProjection) !== canonicalize(expectedProjection)) {
                fail("/annexes/consumer-universe: fields must exactly project the verified receipt and canonical authority");
            }

            if (!offline) {
                const fixture = mkdtempSync(resolve(tmpdir(), "vnext-consumer-return-"));
                try {
                    const output = resolve(realpathSync(fixture), "live-receipt.json");
                    const snapshotStore = resolve(realpathSync(fixture), "consumer-root-snapshots");
                    const snapshotIndexPath = resolve(realpathSync(fixture), "consumer-root-snapshot-index.json");
                    const resolver = realpathSync(new URL("./resolve-consumer-universe.mjs", import.meta.url).pathname);
                    const rerun = spawnSync(process.execPath, [
                        resolver,
                        "--input", consumerAnnex.input_path,
                        "--output", output,
                        "--snapshot-store", snapshotStore,
                        "--snapshot-index", snapshotIndexPath,
                    ], {
                        encoding: "utf8",
                        maxBuffer: 128 * 1024 * 1024,
                    });
                    const expectedResolverExit = c00uBlockingConsumerReturn ? 2 : 0;
                    if (rerun.status !== expectedResolverExit) {
                        fail(`/annexes/consumer-universe: live bounded resolver re-execution failed: ${(rerun.stderr || rerun.error?.message || "unknown failure").trim()}`);
                    } else {
                        const { immutableCapture: _capturedReceipt, ...liveConsumerOptions } = consumerOptions;
                        const live = validateConsumerUniverseReceipt(output, {
                            ...liveConsumerOptions,
                            validationMode: "live",
                            requireResolvable: !c00uBlockingConsumerReturn,
                        });
                        for (const member of ["roots", "edges", "blockers"]) {
                            if (canonicalize(live.receipt[member]) !== canonicalize(verified.receipt[member])) {
                                fail(`/annexes/consumer-universe: live ${member} rediscovery differs from the persisted receipt`);
                            }
                        }
                        if (live.receipt.resolvable !== verified.receipt.resolvable) {
                            fail("/annexes/consumer-universe: live resolvability differs from the persisted receipt");
                        }
                    }
                } finally {
                    rmSync(fixture, { recursive: true });
                }
            }

            if (record.wave_id === "C00U") {
                if (consumerAnnex.baseline?.applicability !== "not_applicable") {
                    fail("/annexes/consumer-universe/baseline: C00U has no earlier census baseline");
                }
                if (record.status === "COMPLETE") {
                    if (verified.receipt.resolvable !== true || verified.receipt.blockers.length !== 0) {
                        fail("/annexes/consumer-universe: C00U COMPLETE requires an exact dependency-green receipt");
                    }
                } else if (record.status === "BLOCKED") {
                    if (verified.receipt.resolvable !== false || verified.receipt.blockers.length === 0) {
                        fail("/annexes/consumer-universe: C00U BLOCKED requires a typed unavailable receipt");
                    } else {
                        const expectedRemainder = consumerBlockerRemainders(verified);
                        if (canonicalize(record.routed_remainder) !== canonicalize(expectedRemainder)) {
                            fail("/routed_remainder: C00U BLOCKED must exactly join every typed unavailable receipt blocker");
                        }
                    }
                } else {
                    fail(`/status: C00U consumer-universe return must be COMPLETE or BLOCKED; found ${record.status}`);
                }
            } else {
                const baseline = consumerAnnex.baseline;
                if (baseline?.applicability !== "applicable") {
                    fail("/annexes/consumer-universe/baseline: C05 must bind and diff its exact C00U predecessor");
                } else {
                    const binding = dependencyReturns.find(({ wave_id: waveId }) => waveId === "C00U");
                    if (!binding || !existsSync(binding.path)) {
                        fail("/annexes/consumer-universe/baseline: C00U dependency return is unavailable");
                    } else {
                        const c00u = parseJsonStrict(readFileSync(binding.path));
                        const prior = c00u.annexes?.["consumer-universe"];
                        const exactBindings = {
                            c00u_return_path: binding.path,
                            c00u_return_file_sha256: binding.file_sha256,
                            c00u_return_hash: binding.return_hash,
                            c00u_receipt_hash: prior?.receipt_hash,
                            c00u_epoch_sha256: prior?.epoch?.epoch_sha256,
                        };
                        for (const [field, expected] of Object.entries(exactBindings)) {
                            if (baseline[field] !== expected) fail(`/annexes/consumer-universe/baseline/${field}: must bind the exact C00U predecessor`);
                        }
                        if (prior?.receipt_hash === consumerAnnex.receipt_hash || prior?.epoch?.epoch_sha256 === consumerAnnex.epoch.epoch_sha256) {
                            fail("/annexes/consumer-universe/baseline: C05 must rerun, not copy, C00U's receipt or epoch");
                        }
                        if (typeof prior?.receipt_path === "string") {
                            const priorImmutableCapture = expectedConsumerImmutableCapture(
                                prior.immutable_capture,
                                prior.receipt_path,
                                "/annexes/consumer-universe/baseline/c00u/immutable_capture",
                            );
                            requireEvidenceInputOnce(
                                priorImmutableCapture,
                                "C00U predecessor consumer-universe immutable capture certificate",
                                c00u,
                            );
                            const priorOptions = consumerBoundsOptions(
                                prior.bounds_authority,
                                c00u.pins,
                                "/annexes/consumer-universe/baseline/c00u/bounds_authority",
                                "immutable",
                                priorImmutableCapture,
                            );
                            const priorVerified = validateConsumerUniverseReceipt(prior.receipt_path, priorOptions);
                            loadConsumerRootSnapshotIndex(
                                prior.snapshot_index,
                                priorVerified.receipt,
                                "/annexes/consumer-universe/baseline/c00u/snapshot_index",
                                c00u,
                            );
                            for (const [kind, before, after] of [
                                ["roots", priorVerified.receipt.roots, verified.receipt.roots],
                                ["edges", priorVerified.receipt.edges, verified.receipt.edges],
                            ]) {
                                const expected = consumerUniverseDelta(before, after);
                                const rows = [...(baseline[kind] ?? [])];
                                const identities = rows.map(({ id, change, before_sha256, after_sha256 }) => ({ id, change, before_sha256, after_sha256 }));
                                if (canonicalize(identities) !== canonicalize(expected)) {
                                    fail(`/annexes/consumer-universe/baseline/${kind}: must be the exact C00U→C05 semantic delta`);
                                }
                                if (new Set(rows.map(({ id }) => id)).size !== rows.length || canonicalize(rows.map(({ id }) => id)) !== canonicalize(rows.map(({ id }) => id).sort())) {
                                    fail(`/annexes/consumer-universe/baseline/${kind}: delta rows must be uniquely ID-sorted`);
                                }
                                for (const [index, row] of rows.entries()) {
                                    if (!waveContracts.has(row.owner_wave) || !waveIsAncestor(row.owner_wave, "C05")) {
                                        fail(`/annexes/consumer-universe/baseline/${kind}/${index}/owner_wave: delta owner must be a completed C05 ancestor`);
                                    }
                                    if ((row.change === "added") !== (row.before_sha256 === "absent") || (row.change === "removed") !== (row.after_sha256 === "absent")) {
                                        fail(`/annexes/consumer-universe/baseline/${kind}/${index}: change kind and absent side disagree`);
                                    }
                                }
                            }
                        } else {
                            fail("/annexes/consumer-universe/baseline: C00U immutable receipt binding is unavailable");
                        }
                        const deltaHash = createHash("sha256").update(canonicalize({ roots: baseline.roots, edges: baseline.edges }), "utf8").digest("hex");
                        if (baseline.delta_sha256 !== deltaHash) fail(`/annexes/consumer-universe/baseline/delta_sha256: computed ${deltaHash}`);
                    }
                }
            }
        } catch (error) {
            fail(`/annexes/consumer-universe: ${error.message}`);
        }
    }
} else if (consumerAnnex) {
    fail("/annexes/consumer-universe: only C00U or C05 may return this annex");
}

const deletionBinding = record.annexes?.["deletion-judgment"];
const terminalDeletionDecisions = record.terminal_disposition?.deletions ?? [];
const deliveredDeletionPaths = record.delivery?.deleted_paths ?? [];
const deletionRequired = ["C05", "C10"].includes(record.wave_id)
    || deletionOwnerWaves.has(record.wave_id)
    || record.status === "PRUNE"
    || terminalDeletionDecisions.length !== 0
    || deliveredDeletionPaths.length !== 0;
let deletionAnnex;
let deletionUniverse;
if (!deletionBinding) {
    if (deletionRequired) fail("/annexes/deletion-judgment: required for designated deletion owners, PRUNE, C05, and C10");
} else {
    const expectedPhase = record.wave_id === "C05" ? "c05-rehearsal" : record.wave_id === "C10" ? "c10-final" : "owner-precut";
    if (deletionBinding.wave_id !== record.wave_id) fail("/annexes/deletion-judgment/wave_id: must equal the returning wave");
    if (deletionBinding.phase !== expectedPhase) fail(`/annexes/deletion-judgment/phase: ${record.wave_id} requires ${expectedPhase}`);
    const canonicalDeletionPath = verifyCanonicalFilePath(deletionBinding.path, "/annexes/deletion-judgment/path");
    verifyEvidencePath(deletionBinding.path, deletionBinding.file_sha256, "/annexes/deletion-judgment");
    if (canonicalDeletionPath) {
        const matchingInputs = record.evidence_inputs.filter(({ path: inputPath, sha256 }) => inputPath === deletionBinding.path && sha256 === deletionBinding.file_sha256);
        if (matchingInputs.length !== 1) fail("/evidence_inputs: deletion-judgment annex file must be content-addressed exactly once");
        try {
            const candidateDeletionAnnex = parseJsonStrict(readFileSync(deletionBinding.path));
            const deletionImmutableCapture = offline
                ? externallyAuthorizedConsumerImmutableCapture(
                    candidateDeletionAnnex.consumer_scan.receipt_path,
                    "/annexes/deletion-judgment/consumer_scan/immutable_capture",
                )
                : record.wave_id === "C05" ? consumerAnnex?.immutable_capture : undefined;
            if (deletionImmutableCapture) {
                requireEvidenceInputOnce(
                    deletionImmutableCapture,
                    "deletion consumer-universe immutable capture certificate",
                );
            }
            const deletionConsumerOptions = consumerBoundsOptions(
                candidateDeletionAnnex.consumer_scan.bounds_authority,
                record.pins,
                "/annexes/deletion-judgment/consumer_scan/bounds_authority",
                offline ? "immutable" : "live",
                deletionImmutableCapture,
            );
            deletionUniverse = validateConsumerUniverseReceipt(
                candidateDeletionAnnex.consumer_scan.receipt_path,
                deletionConsumerOptions,
            );
            const deletionSnapshotIndex = loadConsumerRootSnapshotIndex(
                candidateDeletionAnnex.consumer_scan.snapshot_index,
                deletionUniverse.receipt,
                "/annexes/deletion-judgment/consumer_scan/snapshot_index",
            );
            if (canonicalize(candidateDeletionAnnex.root_snapshots) !== canonicalize(deletionSnapshotIndex.index.roots)) {
                throw new Error("/annexes/deletion-judgment/root_snapshots: must exactly equal the consumer snapshot index root vector");
            }
            const deletionSnapshotIndexes = new Map([
                [candidateDeletionAnnex.consumer_scan.receipt_path, deletionSnapshotIndex],
            ]);
            if (record.wave_id === "C10") {
                const c05Binding = candidateDeletionAnnex.consumer_scan.c05_return;
                const c05Return = readBoundJson(c05Binding, "/annexes/deletion-judgment/consumer_scan/c05_return");
                if (!c05Return || c05Return.wave_id !== "C05"
                    || c05Return.return_hash !== c05Binding?.return_hash
                    || c05Return.return_hash !== hashWithout(c05Return, "return_hash")) {
                    throw new Error("/annexes/deletion-judgment/consumer_scan/c05_return: exact self-hashed C05 return required");
                }
                const c05DeletionBinding = c05Return.annexes?.["deletion-judgment"];
                const c05DeletionAnnex = readBoundJson(
                    c05DeletionBinding,
                    "/annexes/deletion-judgment/consumer_scan/c05_return/annexes/deletion-judgment",
                );
                if (!c05DeletionAnnex || c05DeletionAnnex.wave_id !== "C05" || c05DeletionAnnex.phase !== "c05-rehearsal"
                    || c05DeletionAnnex.annex_hash !== c05DeletionBinding?.annex_hash
                    || c05DeletionAnnex.annex_hash !== hashWithout(c05DeletionAnnex, "annex_hash")) {
                    throw new Error("/annexes/deletion-judgment/consumer_scan/c05_return: exact self-hashed C05 deletion rehearsal required");
                }
                const c05ImmutableCapture = externallyAuthorizedConsumerImmutableCapture(
                    c05DeletionAnnex.consumer_scan.receipt_path,
                    "/annexes/deletion-judgment/consumer_scan/c05_return/immutable_capture",
                );
                const c05ConsumerOptions = consumerBoundsOptions(
                    c05DeletionAnnex.consumer_scan.bounds_authority,
                    c05Return.pins,
                    "/annexes/deletion-judgment/consumer_scan/c05_return/bounds_authority",
                    "immutable",
                    c05ImmutableCapture,
                );
                const c05Universe = validateConsumerUniverseReceipt(
                    c05DeletionAnnex.consumer_scan.receipt_path,
                    c05ConsumerOptions,
                );
                deletionSnapshotIndexes.set(
                    c05DeletionAnnex.consumer_scan.receipt_path,
                    loadConsumerRootSnapshotIndex(
                        c05DeletionAnnex.consumer_scan.snapshot_index,
                        c05Universe.receipt,
                        "/annexes/deletion-judgment/consumer_scan/c05_return/snapshot_index",
                        c05Return,
                        { forbidOriginalRootReads: true },
                    ),
                );
            }
            const resolveDeletionConsumerSnapshotIndex = (receiptPath, context) => {
                const result = deletionSnapshotIndexes.get(receiptPath);
                if (!result) throw new Error(`${context}: no externally verified consumer snapshot index for ${receiptPath}`);
                return result;
            };
            const expectedOwnerWaves = record.wave_id === "C05" ? collectTransitiveDeletionOwners(dependencyReturns) : undefined;
            validateDeletionJudgment(deletionBinding.path, {
                consumerValidationMode: offline ? "immutable" : "live",
                rerunConsumer: !offline,
                returnValidatorPath: validatorPath,
                returnValidationChain: childValidationChain,
                returnValidatorArgs: [
                    ...recursiveReturnValidatorArgs({ historicalGateReplay, offline }),
                    ...consumerCaptureAuthorityArgs,
                ],
                resolveBoundsAuthority: historicalGateReplay
                    ? (binding, pins, pointer) => historicalBoundsAuthorityPath(binding, pins, pointer)
                    : undefined,
                resolveConsumerImmutableCapture: offline || record.wave_id === "C10"
                    ? (receiptPath, pointer) => externallyAuthorizedConsumerImmutableCapture(receiptPath, pointer)
                    : undefined,
                resolveConsumerSnapshotIndex: offline || record.wave_id === "C10"
                    ? resolveDeletionConsumerSnapshotIndex
                    : undefined,
                boundsAuthorityPins: record.pins,
                expectedOwnerWaves,
            });
            deletionAnnex = candidateDeletionAnnex;
            if (deletionAnnex.annex_hash !== deletionBinding.annex_hash) fail("/annexes/deletion-judgment/annex_hash: does not bind the validated annex");
            const repositoriesByRoot = new Map(deletionUniverse.receipt.roots
                .filter(({ status }) => status === "included")
                .map((root) => [root.id, root.repository]));
            const projectEffect = ({ root_id, path }) => ({ repository: repositoriesByRoot.get(root_id), path });
            const projectEffects = (effects) => [...effects].map(projectEffect)
                .sort((left, right) => compareCanonicalText(`${left.repository}\0${left.path}`, `${right.repository}\0${right.path}`));
            const expectedDelivery = deletionAnnex.delivery_deleted.map(projectEffect)
                .sort((left, right) => compareCanonicalText(`${left.repository}\0${left.path}`, `${right.repository}\0${right.path}`));
            const expectedDecisions = deletionAnnex.decisions.map((decision) => ({
                decision_id: decision.decision_id,
                decision_hash: decision.decision_hash,
                file_effects: {
                    deleted: projectEffects(decision.file_effects.deleted),
                    modified: projectEffects(decision.file_effects.modified),
                },
            }));
            if (expectedDelivery.some(({ repository }) => !repository)) fail("/annexes/deletion-judgment: deleted effect names an unmapped repository root");
            if (expectedDecisions.some(({ file_effects }) => [...file_effects.deleted, ...file_effects.modified].some(({ repository }) => !repository))) {
                fail("/annexes/deletion-judgment: decision effect names an unmapped repository root");
            }
            if (canonicalize(deliveredDeletionPaths) !== canonicalize(expectedDelivery)) {
                fail("/delivery/deleted_paths: must exactly project validated physical deletions as repository-qualified paths");
            }
            if (canonicalize(terminalDeletionDecisions) !== canonicalize(expectedDecisions)) {
                fail("/terminal_disposition/deletions: must exactly project every validated deletion decision and file effect");
            }
            const pinnedRepositories = new Set((record.pins ?? []).map(({ repository }) => repository));
            for (const repository of new Set(expectedDecisions.flatMap(({ file_effects }) => [...file_effects.deleted, ...file_effects.modified].map((effect) => effect.repository)))) {
                if (!pinnedRepositories.has(repository)) fail(`/pins: deletion effect repository ${repository} is not pinned by this return`);
            }
            if (record.wave_id === "C05" && consumerAnnex) {
                try {
                    assertSameConsumerUniverseImmutableProjection(
                        deletionAnnex.consumer_scan,
                        consumerAnnex,
                        "C05 deletion/top-level complete canonical immutable consumer-universe projection",
                    );
                } catch {
                    fail("/annexes/deletion-judgment/consumer_scan: C05 rehearsal must use the complete canonical immutable consumer-universe projection");
                }
                if (canonicalize(deletionAnnex.consumer_scan.snapshot_index)
                    !== canonicalize(consumerSnapshotIndex?.reference)) {
                    fail("/annexes/deletion-judgment/consumer_scan/snapshot_index: C05 rehearsal must use the exact top-level consumer snapshot index");
                }
            }
        } catch (error) {
            fail(`/annexes/deletion-judgment: ${error.message}`);
        }
    }
}

const keyframesTargetDecisions = record.annexes?.["keyframes-target-decisions"];
if (keyframesTargetDecisions) {
    try {
        const decisionSchema = parseJsonStrict(readFileSync(keyframesDecisionSchemaPath));
        for (const error of validateJsonSchema(keyframesTargetDecisions, decisionSchema)) {
            fail(`/annexes/keyframes-target-decisions${error}`);
        }
        if (keyframesTargetDecisions.wave_id !== record.wave_id) {
            fail("/annexes/keyframes-target-decisions/wave_id: must equal the returning wave");
        }
        const computed = hashWithout(keyframesTargetDecisions, "annex_hash");
        if (keyframesTargetDecisions.annex_hash !== computed) {
            fail(`/annexes/keyframes-target-decisions/annex_hash: computed ${computed}`);
        }
        const decisions = keyframesTargetDecisions.decisions ?? [];
        const ids = decisions.map(({ decision_id }) => decision_id);
        if (new Set(ids).size !== ids.length || !sameJson(ids, [...ids].sort(compareCanonicalText))) {
            fail("/annexes/keyframes-target-decisions/decisions: decision IDs must be unique and canonically ordered");
        }
        for (const [index, decision] of decisions.entries()) {
            if (decision.scope !== keyframesTargetDecisions.scope) {
                fail(`/annexes/keyframes-target-decisions/decisions/${index}/scope: must equal the annex scope`);
            }
            const decisionHash = hashWithout(decision, "decision_hash");
            if (decision.decision_hash !== decisionHash) {
                fail(`/annexes/keyframes-target-decisions/decisions/${index}/decision_hash: computed ${decisionHash}`);
            }
            if (record.status === "PRUNE" && decision.disposition !== "delete") {
                fail(`/annexes/keyframes-target-decisions/decisions/${index}/disposition: PRUNE may project only delete`);
            }
            if (record.status === "KEEP" && decision.disposition === "delete") {
                fail(`/annexes/keyframes-target-decisions/decisions/${index}/disposition: KEEP cannot project delete`);
            }
        }
        if (keyframesTargetDecisions.schema === "vnext-keyframes-local-target-decisions/1"
            && !new Set(["K22T", "M10T"]).has(record.wave_id)) {
            fail("/annexes/keyframes-target-decisions/schema: local decisions belong only to K22T or M10T");
        }
    } catch (error) {
        fail(`/annexes/keyframes-target-decisions: ${error.message}`);
    }
}

const keyframesCurrentInventory = record.annexes?.["keyframes-current-inventory"];
const keyframesInventoryWave = new Map([["K00", "library"], ["M00", "demo"]]);
if (keyframesInventoryWave.has(record.wave_id)) {
    if (!keyframesCurrentInventory) {
        fail(`/annexes/keyframes-current-inventory: ${record.wave_id} requires the typed capture/replay inventory annex`);
    } else {
        const expectedScope = keyframesInventoryWave.get(record.wave_id);
        if (keyframesCurrentInventory.wave_id !== record.wave_id || keyframesCurrentInventory.scope !== expectedScope) {
            fail(`/annexes/keyframes-current-inventory: exact ${record.wave_id}/${expectedScope} identity required`);
        }
        const inventoryBinding = keyframesCurrentInventory.inventory;
        const inventory = readBoundJson(inventoryBinding, "/annexes/keyframes-current-inventory/inventory");
        if (inventory) {
            const inventoryHash = hashWithout(inventory, "inventory_hash");
            if (inventory.inventory_hash !== inventoryHash || inventoryBinding.inventory_hash !== inventoryHash) {
                fail(`/annexes/keyframes-current-inventory/inventory/inventory_hash: computed ${inventoryHash}`);
            }
            if (inventory.wave_id !== record.wave_id || inventory.scope !== expectedScope) {
                fail(`/annexes/keyframes-current-inventory/inventory: exact ${record.wave_id}/${expectedScope} artifact required`);
            }
        }
        const persistedReceipts = new Map();
        for (const [member, mode] of [["capture_receipt", "capture"], ["replay_receipt", "replay"]]) {
            const binding = keyframesCurrentInventory[member];
            const receipt = readBoundJson(binding, `/annexes/keyframes-current-inventory/${member}`);
            persistedReceipts.set(mode, receipt);
            if (!receipt) continue;
            const receiptHash = hashWithout(receipt, "receipt_hash");
            if (receipt.receipt_hash !== receiptHash || binding.receipt_hash !== receiptHash) {
                fail(`/annexes/keyframes-current-inventory/${member}/receipt_hash: computed ${receiptHash}`);
            }
            if (receipt.mode !== mode
                || receipt.wave_id !== record.wave_id
                || receipt.scope !== expectedScope
                || receipt.inventory?.path !== inventoryBinding?.path
                || receipt.inventory?.file_sha256 !== inventoryBinding?.file_sha256
                || receipt.inventory?.inventory_hash !== inventoryBinding?.inventory_hash) {
                fail(`/annexes/keyframes-current-inventory/${member}: must exactly project the bound inventory and ${mode} mode`);
            }
        }
        if (inventoryBinding?.path) {
            for (const mode of offline ? ["replay"] : ["capture", "replay"]) {
                const rerun = spawnSync(process.execPath, [
                    keyframesInventoryValidatorPath,
                    "--inventory", inventoryBinding.path,
                    mode === "capture" ? "--capture" : "--replay",
                ], { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
                if (rerun.status !== 0) {
                    fail(`/annexes/keyframes-current-inventory/${mode}_receipt: ${mode} validation failed: ${(rerun.stderr || rerun.stdout).trim()}`);
                } else {
                    try {
                        const fresh = parseJsonStrict(rerun.stdout.trim());
                        if (!sameJson(fresh, persistedReceipts.get(mode))) {
                            fail(`/annexes/keyframes-current-inventory/${mode}_receipt: persisted receipt differs from ${mode} validation`);
                        }
                    } catch (error) {
                        fail(`/annexes/keyframes-current-inventory/${mode}_receipt: fresh receipt parse failed: ${error.message}`);
                    }
                }
            }
        }
        for (const [member, binding] of [
            ["inventory", inventoryBinding],
            ["capture_receipt", keyframesCurrentInventory.capture_receipt],
            ["replay_receipt", keyframesCurrentInventory.replay_receipt],
        ]) requireEvidenceInputOnce(binding, `Keyframes ${record.wave_id} ${member}`);
    }
} else if (keyframesCurrentInventory) {
    fail("/annexes/keyframes-current-inventory: only K00 or M00 may return this annex");
}

const keyframesTargetTranspose = record.annexes?.["keyframes-target-transpose"];
const keyframesTransposeWave = new Map([["K22T", "library"], ["M10T", "demo"]]);
if (keyframesTransposeWave.has(record.wave_id)) {
    if (!keyframesTargetTranspose) {
        fail(`/annexes/keyframes-target-transpose: ${record.wave_id} requires the typed total-transpose annex`);
    } else {
        const expectedScope = keyframesTransposeWave.get(record.wave_id);
        if (keyframesTargetTranspose.wave_id !== record.wave_id || keyframesTargetTranspose.scope !== expectedScope) {
            fail(`/annexes/keyframes-target-transpose: exact ${record.wave_id}/${expectedScope} identity required`);
        }
        const ledger = readBoundJson(keyframesTargetTranspose.ledger, "/annexes/keyframes-target-transpose/ledger");
        if (ledger) {
            const ledgerHash = hashWithout(ledger, "manifest_hash");
            if (ledger.manifest_hash !== ledgerHash || keyframesTargetTranspose.ledger.manifest_hash !== ledgerHash) {
                fail(`/annexes/keyframes-target-transpose/ledger/manifest_hash: computed ${ledgerHash}`);
            }
            if (ledger.wave_id !== record.wave_id || ledger.scope !== expectedScope) {
                fail(`/annexes/keyframes-target-transpose/ledger: exact ${record.wave_id}/${expectedScope} ledger required`);
            }
            const projections = [
                ["current_inventory", ledger.current_inventory, ["path", "file_sha256", "inventory_hash"]],
                ["target_paths", ledger.target_paths, ["path", "file_sha256", "manifest_sha256"]],
                ["local_decisions", ledger.local_decisions, ["path", "file_sha256", "annex_hash"]],
                ["physical_truth", ledger.physical_truth, ["path", "file_sha256", "receipt_hash"]],
            ];
            for (const [member, source, keys] of projections) {
                const actual = Object.fromEntries(keys.map((key) => [key, keyframesTargetTranspose[member]?.[key]]));
                const expected = Object.fromEntries(keys.map((key) => [key, source?.[key]]));
                if (!sameJson(actual, expected)) {
                    fail(`/annexes/keyframes-target-transpose/${member}: must exactly project ledger.${member}`);
                }
            }
            const returnedCurrent = {
                path: keyframesTargetTranspose.current_inventory_return?.path,
                file_sha256: keyframesTargetTranspose.current_inventory_return?.file_sha256,
                return_hash: keyframesTargetTranspose.current_inventory_return?.return_hash,
            };
            if (!sameJson(returnedCurrent, ledger.current_inventory?.return)) {
                fail("/annexes/keyframes-target-transpose/current_inventory_return: must exactly project ledger.current_inventory.return");
            }
            if (keyframesTargetTranspose.repository_state_sha256 !== ledger.repository?.repository_state_sha256) {
                fail("/annexes/keyframes-target-transpose/repository_state_sha256: must exactly project the final ledger repository state");
            }
            if (!sameJson(keyframesTargetTranspose.delivery, ledger.result?.delivery)) {
                fail("/annexes/keyframes-target-transpose/delivery: must exactly project ledger.result.delivery");
            }
            if (!sameJson(record.delivery?.source ?? [], keyframesTargetTranspose.delivery?.source ?? [])
                || !sameJson(record.delivery?.tests ?? [], keyframesTargetTranspose.delivery?.tests ?? [])) {
                fail("/delivery: Keyframes transpose source and test delivery must equal the typed annex");
            }
        }

        const currentReturn = readBoundJson(
            keyframesTargetTranspose.current_inventory_return,
            "/annexes/keyframes-target-transpose/current_inventory_return",
        );
        const expectedCurrentWave = expectedScope === "library" ? "K00" : "M00";
        if (currentReturn && (
            currentReturn.wave_id !== expectedCurrentWave
            || !terminalStatuses.has(currentReturn.status)
            || currentReturn.return_hash !== keyframesTargetTranspose.current_inventory_return.return_hash
            || currentReturn.return_hash !== hashWithout(currentReturn, "return_hash")
            || !currentReturn.annexes?.["keyframes-current-inventory"]
        )) fail(`/annexes/keyframes-target-transpose/current_inventory_return: exact terminal ${expectedCurrentWave} inventory return required`);

        const physical = readBoundJson(keyframesTargetTranspose.physical_truth, "/annexes/keyframes-target-transpose/physical_truth");
        if (physical) {
            const receiptHash = hashWithout(physical, "receipt_hash");
            if (physical.receipt_hash !== receiptHash || keyframesTargetTranspose.physical_truth.receipt_hash !== receiptHash) {
                fail(`/annexes/keyframes-target-transpose/physical_truth/receipt_hash: computed ${receiptHash}`);
            }
            if (physical.wave_id !== record.wave_id || physical.scope !== expectedScope
                || physical.final_repository_state_sha256 !== keyframesTargetTranspose.repository_state_sha256
                || !sameJson(physical.delivery, keyframesTargetTranspose.delivery)) {
                fail("/annexes/keyframes-target-transpose/physical_truth: exact wave/scope/repository/delivery projection required");
            }
            try {
                const verifiedTruth = validateDeletionTruthReceipt(physical.git_truth?.path, { requireLiveAfter: false });
                if (verifiedTruth.file_sha256 !== physical.git_truth?.file_sha256
                    || verifiedTruth.receipt.receipt_hash !== physical.git_truth?.receipt_hash) {
                    fail("/annexes/keyframes-target-transpose/physical_truth/git_truth: exact executable Git receipt binding required");
                }
                const truthMatches = (deletionAnnex?.truth_receipts ?? []).filter((truth) =>
                    truth.owner_wave === record.wave_id
                    && truth.path === physical.git_truth?.path
                    && truth.file_sha256 === physical.git_truth?.file_sha256
                    && truth.receipt_hash === physical.git_truth?.receipt_hash);
                if (truthMatches.length !== 1) {
                    fail(`/annexes/deletion-judgment/truth_receipts: ${record.wave_id} must own the exact Keyframes transpose Git-truth receipt once`);
                } else {
                    const root = deletionUniverse?.receipt.roots.find(({ id, status }) => id === truthMatches[0].root_id && status === "included");
                    if (root?.canonical_realpath !== ledger?.repository?.path) {
                        fail("/annexes/keyframes-target-transpose/physical_truth/git_truth: deletion universe root must equal the final ledger repository");
                    }
                }
                const allPaths = keyframesPhysicalPathProjection(physical.effects ?? []);
                if (!sameJson(allPaths.deleted_paths, physical.delivery?.removed_paths ?? [])
                    || !sameJson(allPaths.modified_paths, physical.delivery?.replaced_paths ?? [])) {
                    fail("/annexes/keyframes-target-transpose/physical_truth/delivery: must exactly project all physical effects");
                }
                const ownedPaths = keyframesPhysicalPathProjection(physical.effects ?? [], record.wave_id);
                for (const kind of ["deleted", "added", "modified"]) {
                    if (!sameJson(ownedPaths[`${kind}_paths`], verifiedTruth.receipt[`${kind}_paths`])) {
                        fail(`/annexes/keyframes-target-transpose/physical_truth/git_truth/${kind}_paths: must exactly equal ${record.wave_id}-owned physical effects`);
                    }
                }
                requireEvidenceInputOnce(physical.git_truth, `Keyframes ${record.wave_id} executable Git truth`);
            } catch (error) {
                fail(`/annexes/keyframes-target-transpose/physical_truth/git_truth: ${error.message}`);
            }
        }

        const validationReceipt = readBoundJson(
            keyframesTargetTranspose.validation_receipt,
            "/annexes/keyframes-target-transpose/validation_receipt",
        );
        if (validationReceipt) {
            const receiptHash = hashWithout(validationReceipt, "receipt_hash");
            if (validationReceipt.receipt_hash !== receiptHash
                || keyframesTargetTranspose.validation_receipt.receipt_hash !== receiptHash) {
                fail(`/annexes/keyframes-target-transpose/validation_receipt/receipt_hash: computed ${receiptHash}`);
            }
            if (validationReceipt.ledger?.path !== keyframesTargetTranspose.ledger?.path
                || validationReceipt.ledger?.file_sha256 !== keyframesTargetTranspose.ledger?.file_sha256
                || validationReceipt.ledger?.manifest_hash !== keyframesTargetTranspose.ledger?.manifest_hash
                || validationReceipt.wave_id !== record.wave_id
                || validationReceipt.scope !== expectedScope
                || validationReceipt.repository_state_sha256 !== keyframesTargetTranspose.repository_state_sha256
                || validationReceipt.current_inventory_hash !== keyframesTargetTranspose.current_inventory?.inventory_hash
                || validationReceipt.current_inventory_return_hash !== keyframesTargetTranspose.current_inventory_return?.return_hash
                || validationReceipt.target_manifest_sha256 !== keyframesTargetTranspose.target_paths?.manifest_sha256
                || validationReceipt.physical_truth_receipt_hash !== keyframesTargetTranspose.physical_truth?.receipt_hash
                || validationReceipt.git_truth_receipt_hash !== physical?.git_truth?.receipt_hash
                || !sameJson(validationReceipt.delivery, keyframesTargetTranspose.delivery)) {
                fail("/annexes/keyframes-target-transpose/validation_receipt: must exactly project the typed transpose annex");
            }
        }
        if (!offline && keyframesTargetTranspose.ledger?.path) {
            const fresh = spawnSync(process.execPath, [
                keyframesTransposeValidatorPath,
                "--ledger", keyframesTargetTranspose.ledger.path,
                "--offline-returns",
                ...consumerCaptureAuthorityArgs,
            ], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
            if (fresh.status !== 0) {
                fail(`/annexes/keyframes-target-transpose/validation_receipt: live composed validation failed: ${(fresh.stderr || fresh.stdout).trim()}`);
            } else {
                try {
                    if (!sameJson(parseJsonStrict(fresh.stdout.trim()), validationReceipt)) {
                        fail("/annexes/keyframes-target-transpose/validation_receipt: persisted receipt differs from live composed validation");
                    }
                } catch (error) {
                    fail(`/annexes/keyframes-target-transpose/validation_receipt: fresh receipt parse failed: ${error.message}`);
                }
            }
        }
        for (const [member, binding] of [
            ["ledger", keyframesTargetTranspose.ledger],
            ["current_inventory", keyframesTargetTranspose.current_inventory],
            ["current_inventory_return", keyframesTargetTranspose.current_inventory_return],
            ["target_paths", keyframesTargetTranspose.target_paths],
            ["local_decisions", keyframesTargetTranspose.local_decisions],
            ["physical_truth", keyframesTargetTranspose.physical_truth],
            ["validation_receipt", keyframesTargetTranspose.validation_receipt],
        ]) requireEvidenceInputOnce(binding, `Keyframes ${record.wave_id} ${member}`);
    }
} else if (keyframesTargetTranspose) {
    fail("/annexes/keyframes-target-transpose: only K22T or M10T may return this annex");
}

const keyframesPublicPackage = record.annexes?.["keyframes-public-package"];
if (record.wave_id === "K23") {
    if (!keyframesPublicPackage) {
        fail("/annexes/keyframes-public-package: K23 requires the typed packed-public annex");
    } else {
        const manifest = readBoundJson(keyframesPublicPackage.manifest, "/annexes/keyframes-public-package/manifest");
        if (manifest) {
            const manifestHash = hashWithout(manifest, "manifest_hash");
            if (manifest.manifest_hash !== manifestHash || keyframesPublicPackage.manifest.manifest_hash !== manifestHash) {
                fail(`/annexes/keyframes-public-package/manifest/manifest_hash: computed ${manifestHash}`);
            }
            if (manifest.wave_id !== "K23") fail("/annexes/keyframes-public-package/manifest/wave_id: exact K23 manifest required");
            const targetProjection = {
                path: manifest.target_paths?.path,
                file_sha256: manifest.target_paths?.file_sha256,
                manifest_sha256: manifest.target_paths?.manifest_sha256,
            };
            if (!sameJson(keyframesPublicPackage.target_paths, targetProjection)) {
                fail("/annexes/keyframes-public-package/target_paths: must exactly project the package manifest");
            }
            const packageProjection = {
                name: manifest.package?.name,
                version: manifest.package?.version,
                tarball_sha256: manifest.package?.tarball?.sha256,
                tarball_sha512: manifest.package?.tarball?.sha512,
                integrity: manifest.package?.tarball?.integrity,
                archive_files_sha256: manifest.package?.archive?.files_sha256,
            };
            if (!sameJson(keyframesPublicPackage.package, packageProjection)) {
                fail("/annexes/keyframes-public-package/package: must exactly project packed archive identity");
            }
        }

        const sourceBindings = dependencyReturns.filter(({ wave_id }) => wave_id === "K22T");
        if (sourceBindings.length !== 1) {
            fail("/annexes/keyframes-public-package/source_transpose_return: exact K22T scope dependency row required");
        } else {
            const expected = {
                path: sourceBindings[0].path,
                file_sha256: sourceBindings[0].file_sha256,
                return_hash: sourceBindings[0].return_hash,
            };
            if (!sameJson(keyframesPublicPackage.source_transpose_return, expected)) {
                fail("/annexes/keyframes-public-package/source_transpose_return: must equal the K22T scope dependency row");
            }
        }
        const sourceReturn = readBoundJson(
            keyframesPublicPackage.source_transpose_return,
            "/annexes/keyframes-public-package/source_transpose_return",
        );
        const sourceOutcome = requireWaveOutcome(waveEdgePolicy, "K22T");
        if (sourceReturn && (
            sourceReturn.wave_id !== "K22T"
            || !sourceOutcome.advancing_statuses.includes(sourceReturn.status)
            || sourceReturn.return_hash !== keyframesPublicPackage.source_transpose_return.return_hash
            || sourceReturn.return_hash !== hashWithout(sourceReturn, "return_hash")
            || !sourceReturn.annexes?.["keyframes-target-transpose"]
        )) fail("/annexes/keyframes-public-package/source_transpose_return: exact terminal K22T transpose return required");

        const validationReceipt = readBoundJson(
            keyframesPublicPackage.validation_receipt,
            "/annexes/keyframes-public-package/validation_receipt",
        );
        if (validationReceipt) {
            const receiptHash = hashWithout(validationReceipt, "receipt_hash");
            if (validationReceipt.receipt_hash !== receiptHash
                || keyframesPublicPackage.validation_receipt.receipt_hash !== receiptHash) {
                fail(`/annexes/keyframes-public-package/validation_receipt/receipt_hash: computed ${receiptHash}`);
            }
            if (validationReceipt.manifest?.path !== keyframesPublicPackage.manifest?.path
                || validationReceipt.manifest?.file_sha256 !== keyframesPublicPackage.manifest?.file_sha256
                || validationReceipt.manifest?.manifest_hash !== keyframesPublicPackage.manifest?.manifest_hash
                || validationReceipt.target_manifest_sha256 !== keyframesPublicPackage.target_paths?.manifest_sha256
                || validationReceipt.tarball_sha512 !== keyframesPublicPackage.package?.tarball_sha512) {
                fail("/annexes/keyframes-public-package/validation_receipt: must exactly bind manifest, target and packed tarball");
            }
        }
        if (!offline && keyframesPublicPackage.manifest?.path) {
            const fresh = spawnSync(process.execPath, [
                keyframesPublicPackageValidatorPath,
                "--manifest", keyframesPublicPackage.manifest.path,
                ...consumerCaptureAuthorityArgs,
            ], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
            if (fresh.status !== 0) {
                fail(`/annexes/keyframes-public-package/validation_receipt: live packed validation failed: ${(fresh.stderr || fresh.stdout).trim()}`);
            } else {
                try {
                    if (!sameJson(parseJsonStrict(fresh.stdout.trim()), validationReceipt)) {
                        fail("/annexes/keyframes-public-package/validation_receipt: persisted receipt differs from live packed validation");
                    }
                } catch (error) {
                    fail(`/annexes/keyframes-public-package/validation_receipt: fresh receipt parse failed: ${error.message}`);
                }
            }
        }
        for (const [member, binding] of [
            ["manifest", keyframesPublicPackage.manifest],
            ["source_transpose_return", keyframesPublicPackage.source_transpose_return],
            ["target_paths", keyframesPublicPackage.target_paths],
            ["validation_receipt", keyframesPublicPackage.validation_receipt],
        ]) requireEvidenceInputOnce(binding, `Keyframes K23 ${member}`);
    }
} else if (keyframesPublicPackage) {
    fail("/annexes/keyframes-public-package: only K23 may return this annex");
}

const valueTargetDisposition = record.annexes?.["value-target-disposition"];
if (valueTargetDisposition) {
    if (valueTargetDisposition.wave_id !== record.wave_id) {
        fail("/annexes/value-target-disposition/wave_id: must equal the returning wave");
    }
    const decisions = valueTargetDisposition.decisions ?? [];
    const decisionIds = decisions.map(({ decision_id }) => decision_id);
    if (new Set(decisionIds).size !== decisionIds.length || canonicalize(decisionIds) !== canonicalize([...decisionIds].sort())) {
        fail("/annexes/value-target-disposition/decisions: decision IDs must be unique and canonically ordered");
    }
    for (const [index, decision] of decisions.entries()) {
        const pointer = `/annexes/value-target-disposition/decisions/${index}`;
        const preimage = { ...decision };
        delete preimage.decision_hash;
        const expectedDecisionHash = createHash("sha256")
            .update(canonicalize({ wave_id: record.wave_id, ...preimage }), "utf8")
            .digest("hex");
        if (decision.decision_hash !== expectedDecisionHash) {
            fail(`${pointer}/decision_hash: computed ${expectedDecisionHash}`);
        }
        if (decision.kind === "conditional-pair") {
            if (!rootAdvancingOutcome || decision.outcome !== record.status) {
                fail(`${pointer}/outcome: conditional-pair outcome must equal the terminal KEEP/PRUNE return status`);
            }
            continue;
        }
        if (decision.kind === "package-tombstone") {
            if (record.wave_id !== "V00C" || record.status !== "COMPLETE") {
                fail(`${pointer}: package tombstones require the terminal COMPLETE V00C owner return`);
            }
            continue;
        }
        if (decision.disposition === "keep" && decision.current_id !== decision.target_id) {
            fail(`${pointer}: keep requires identical current and target IDs`);
        }
        if (["move", "fold"].includes(decision.disposition) && decision.current_id === decision.target_id) {
            fail(`${pointer}: ${decision.disposition} requires distinct current and target IDs`);
        }
        if (record.status === "PRUNE" && decision.disposition !== "delete") {
            fail(`${pointer}/disposition: PRUNE may authorize only delete decisions`);
        }
        if (record.status === "KEEP" && decision.disposition === "delete") {
            fail(`${pointer}/disposition: KEEP cannot authorize delete decisions`);
        }
        if (record.status === "REFUSED") fail(`${pointer}: REFUSED cannot authorize a target disposition`);
    }
}

const valueCurrentInventory = record.annexes?.["value-current-inventory"];
if (record.wave_id === "V00A") {
    if (!valueCurrentInventory) {
        fail("/annexes/value-current-inventory: V00A requires the typed current-inventory binding");
    } else {
        const inventoryBinding = valueCurrentInventory.inventory;
        const captureBinding = valueCurrentInventory.capture_receipt;
        const replayBinding = valueCurrentInventory.replay_receipt;
        verifyCanonicalFilePath(inventoryBinding?.path, "/annexes/value-current-inventory/inventory/path");
        verifyEvidencePath(inventoryBinding?.path, inventoryBinding?.file_sha256, "/annexes/value-current-inventory/inventory");
        for (const [name, binding] of [["capture_receipt", captureBinding], ["replay_receipt", replayBinding]]) {
            verifyCanonicalFilePath(binding?.path, `/annexes/value-current-inventory/${name}/path`);
            verifyEvidencePath(binding?.path, binding?.file_sha256, `/annexes/value-current-inventory/${name}`);
        }
        let inventory;
        const persistedReceipts = new Map();
        try {
            inventory = parseJsonStrict(readFileSync(inventoryBinding.path));
            if (inventory.inventory_hash !== inventoryBinding.contract_hash) {
                fail("/annexes/value-current-inventory/inventory/contract_hash: does not bind inventory_hash");
            }
        } catch (error) {
            fail(`/annexes/value-current-inventory/inventory: strict JSON parse failed: ${error.message}`);
        }
        try {
            for (const [modeName, binding] of [["live", captureBinding], ["replay", replayBinding]]) {
                const persistedReceipt = parseJsonStrict(readFileSync(binding.path));
                persistedReceipts.set(modeName, persistedReceipt);
                const preimage = { ...persistedReceipt };
                delete preimage.receipt_hash;
                const receiptHash = createHash("sha256").update(canonicalize(preimage), "utf8").digest("hex");
                if (persistedReceipt.receipt_hash !== receiptHash || binding.receipt_hash !== receiptHash) {
                    fail(`/annexes/value-current-inventory/${modeName === "live" ? "capture" : "replay"}_receipt/receipt_hash: computed ${receiptHash}`);
                }
                if (persistedReceipt.mode !== modeName
                    || persistedReceipt.inventory_path !== inventoryBinding.path
                    || persistedReceipt.inventory_file_sha256 !== inventoryBinding.file_sha256
                    || persistedReceipt.inventory_hash !== inventoryBinding.contract_hash) {
                    fail(`/annexes/value-current-inventory/${modeName === "live" ? "capture" : "replay"}_receipt: must exactly project the bound inventory and mode`);
                }
            }
        } catch (error) {
            fail(`/annexes/value-current-inventory: strict receipt parse failed: ${error.message}`);
        }
        if (inventoryBinding?.path) {
            const modes = offline ? ["replay"] : ["live", "replay"];
            for (const validationMode of modes) {
                const rerun = spawnSync(process.execPath, [valueInventoryValidatorPath, "--inventory", inventoryBinding.path, "--mode", validationMode], {
                    encoding: "utf8",
                    maxBuffer: 128 * 1024 * 1024,
                });
                if (rerun.status !== 0) {
                    fail(`/annexes/value-current-inventory/${validationMode}_receipt: inventory validation failed: ${(rerun.stderr || rerun.stdout).trim()}`);
                } else {
                    try {
                        const rerunReceipt = parseJsonStrict(rerun.stdout.trim());
                        if (canonicalize(rerunReceipt) !== canonicalize(persistedReceipts.get(validationMode))) {
                            fail(`/annexes/value-current-inventory/${validationMode}_receipt: persisted receipt differs from ${validationMode} validation`);
                        }
                    } catch (error) {
                        fail(`/annexes/value-current-inventory/${validationMode}_receipt: receipt parse failed: ${error.message}`);
                    }
                }
            }
        }
        for (const [path, expectedHash] of [
            [inventoryBinding?.path, inventoryBinding?.file_sha256],
            [captureBinding?.path, captureBinding?.file_sha256],
            [replayBinding?.path, replayBinding?.file_sha256],
        ]) {
            const matches = (record.evidence_inputs ?? []).filter((input) => input.path === path && input.sha256 === expectedHash);
            if (matches.length !== 1) fail(`/evidence_inputs: V00A current-inventory artifact ${path} must be bound exactly once`);
        }
    }
} else if (valueCurrentInventory) {
    fail("/annexes/value-current-inventory: only V00A may return this annex");
}

const valueTargetTranspose = record.annexes?.["value-target-transpose"];
if (record.wave_id === "V29T") {
    if (!valueTargetTranspose) {
        fail("/annexes/value-target-transpose: V29T requires the typed total-transpose binding");
    } else {
        if (valueTargetTranspose.wave_id !== record.wave_id) fail("/annexes/value-target-transpose/wave_id: must equal V29T");
        const artifacts = [
            ["ledger", "manifest_hash"],
            ["current_inventory", "inventory_hash"],
            ["target_paths", "manifest_sha256"],
            ["conditional_resolutions", "manifest_hash"],
            ["css_execution_manifest", "manifest_hash"],
            ["public_surface", "manifest_hash"],
        ];
        const parsed = new Map();
        for (const [name, contractMember] of artifacts) {
            const binding = valueTargetTranspose[name];
            verifyCanonicalFilePath(binding?.path, `/annexes/value-target-transpose/${name}/path`);
            verifyEvidencePath(binding?.path, binding?.file_sha256, `/annexes/value-target-transpose/${name}`);
            if (!binding?.path || !existsSync(binding.path)) continue;
            try {
                const value = parseJsonStrict(readFileSync(binding.path));
                parsed.set(name, value);
                if (value?.[contractMember] !== binding.contract_hash) {
                    fail(`/annexes/value-target-transpose/${name}/contract_hash: does not bind ${contractMember}`);
                }
            } catch (error) {
                fail(`/annexes/value-target-transpose/${name}: strict JSON parse failed: ${error.message}`);
            }
        }
        const ledger = parsed.get("ledger");
        for (const [ledgerMember, annexMember] of [
            ["current_inventory", "current_inventory"],
            ["target_paths", "target_paths"],
            ["conditional_resolutions", "conditional_resolutions"],
            ["css_execution_manifest", "css_execution_manifest"],
            ["public_surface", "public_surface"],
        ]) {
            const evidence = ledger?.[ledgerMember];
            const binding = valueTargetTranspose[annexMember];
            if (evidence?.path !== binding?.path || evidence?.sha256 !== binding?.file_sha256) {
                fail(`/annexes/value-target-transpose/${annexMember}: must exactly project ledger.${ledgerMember}`);
            }
        }
        const inventoryReturnBinding = valueTargetTranspose.current_inventory_return;
        verifyCanonicalFilePath(inventoryReturnBinding?.path, "/annexes/value-target-transpose/current_inventory_return/path");
        verifyEvidencePath(inventoryReturnBinding?.path, inventoryReturnBinding?.file_sha256, "/annexes/value-target-transpose/current_inventory_return");
        if (inventoryReturnBinding?.path && existsSync(inventoryReturnBinding.path)) {
            try {
                const returned = parseJsonStrict(readFileSync(inventoryReturnBinding.path));
                const preimage = { ...returned };
                delete preimage.return_hash;
                const expectedReturnHash = createHash("sha256").update(canonicalize(preimage), "utf8").digest("hex");
                if (returned.wave_id !== "V00A" || returned.status !== "COMPLETE"
                    || returned.return_hash !== expectedReturnHash || inventoryReturnBinding.return_hash !== expectedReturnHash) {
                    fail("/annexes/value-target-transpose/current_inventory_return: exact terminal V00A return binding required");
                }
            } catch (error) {
                fail(`/annexes/value-target-transpose/current_inventory_return: strict return parse failed: ${error.message}`);
            }
        }
        if (ledger?.current_inventory_return?.path !== inventoryReturnBinding?.path
            || ledger?.current_inventory_return?.file_sha256 !== inventoryReturnBinding?.file_sha256
            || ledger?.current_inventory_return?.return_hash !== inventoryReturnBinding?.return_hash) {
            fail("/annexes/value-target-transpose/current_inventory_return: must exactly project ledger.current_inventory_return");
        }
        const physicalTruthBinding = valueTargetTranspose.physical_truth_receipt;
        verifyCanonicalFilePath(physicalTruthBinding?.path, "/annexes/value-target-transpose/physical_truth_receipt/path");
        verifyEvidencePath(physicalTruthBinding?.path, physicalTruthBinding?.file_sha256, "/annexes/value-target-transpose/physical_truth_receipt");
        if (ledger?.physical_truth?.receipt?.path !== physicalTruthBinding?.path
            || ledger?.physical_truth?.receipt?.file_sha256 !== physicalTruthBinding?.file_sha256
            || ledger?.physical_truth?.receipt?.receipt_hash !== physicalTruthBinding?.receipt_hash) {
            fail("/annexes/value-target-transpose/physical_truth_receipt: must exactly project ledger.physical_truth.receipt");
        }
        if (deletionAnnex) {
            const matches = (deletionAnnex.truth_receipts ?? []).filter((truth) =>
                truth.owner_wave === "V29T"
                && truth.path === physicalTruthBinding?.path
                && truth.file_sha256 === physicalTruthBinding?.file_sha256
                && truth.receipt_hash === physicalTruthBinding?.receipt_hash);
            if (matches.length !== 1) {
                fail("/annexes/deletion-judgment/truth_receipts: V29T must own the exact transpose physical-truth receipt once");
            }
        }
        if (ledger?.value_root?.path !== valueTargetTranspose.value_root
            || ledger?.value_root?.repository_state_sha256 !== valueTargetTranspose.repository_state_sha256) {
            fail("/annexes/value-target-transpose/value_root: must exactly project the ledger's final repository epoch");
        }
        if (existsSync(valueTargetTranspose.value_root ?? "") && !offline) {
            try {
                const liveState = repositoryStateSha256(valueTargetTranspose.value_root);
                if (liveState !== valueTargetTranspose.repository_state_sha256) {
                    fail(`/annexes/value-target-transpose/repository_state_sha256: live ${liveState}`);
                }
            } catch (error) {
                fail(`/annexes/value-target-transpose/repository_state_sha256: ${error.message}`);
            }
        }
        const validationReceipt = valueTargetTranspose.validation_receipt;
        verifyCanonicalFilePath(validationReceipt?.path, "/annexes/value-target-transpose/validation_receipt/path");
        verifyEvidencePath(validationReceipt?.path, validationReceipt?.file_sha256, "/annexes/value-target-transpose/validation_receipt");
        let persistedReceipt;
        if (validationReceipt?.path && existsSync(validationReceipt.path)) {
            try {
                persistedReceipt = parseJsonStrict(readFileSync(validationReceipt.path));
                const receiptPreimage = { ...persistedReceipt };
                delete receiptPreimage.receipt_hash;
                const expectedReceiptHash = createHash("sha256").update(canonicalize(receiptPreimage), "utf8").digest("hex");
                if (persistedReceipt.receipt_hash !== expectedReceiptHash || validationReceipt.receipt_hash !== expectedReceiptHash) {
                    fail(`/annexes/value-target-transpose/validation_receipt/receipt_hash: computed ${expectedReceiptHash}`);
                }
                if (persistedReceipt.schema !== "vnext-value-target-transpose-validation/1"
                    || persistedReceipt.ledger_path !== valueTargetTranspose.ledger?.path
                    || persistedReceipt.ledger_file_sha256 !== valueTargetTranspose.ledger?.file_sha256
                    || persistedReceipt.manifest_hash !== valueTargetTranspose.ledger?.contract_hash) {
                    fail(`/annexes/value-target-transpose/validation_receipt: must bind the exact composed ledger`);
                }
            } catch (error) {
                fail(`/annexes/value-target-transpose/validation_receipt: strict JSON parse failed: ${error.message}`);
            }
        }
        if (valueTargetTranspose.ledger?.path) {
            const composed = spawnSync(process.execPath, [
                valueTransposeValidatorPath,
                "--ledger", valueTargetTranspose.ledger.path,
                ...(offline ? ["--historical-replay"] : []),
                ...consumerCaptureAuthorityArgs,
            ], {
                encoding: "utf8",
                maxBuffer: 128 * 1024 * 1024,
            });
            if (composed.status !== 0) {
                fail(`/annexes/value-target-transpose/validation_receipt: ${offline ? "historical Git replay" : "live transpose"} validation failed: ${(composed.stderr || composed.stdout).trim()}`);
            } else {
                try {
                    const composedReceipt = parseJsonStrict(composed.stdout.trim());
                    if (!offline && canonicalize(composedReceipt) !== canonicalize(persistedReceipt)) {
                        fail("/annexes/value-target-transpose/validation_receipt: persisted receipt differs from live composed validation");
                    } else if (offline) {
                        if (composedReceipt.historical_replay?.completion_eligible !== false) {
                            fail("/annexes/value-target-transpose/validation_receipt: historical replay must remain non-completing");
                        }
                        const replayCore = {
                            schema: composedReceipt.schema,
                            ledger_path: composedReceipt.ledger_path,
                            ledger_file_sha256: composedReceipt.ledger_file_sha256,
                            manifest_hash: composedReceipt.manifest_hash,
                            value_root: composedReceipt.value_root,
                            owner_returns: composedReceipt.owner_returns,
                            owner_authorization: composedReceipt.owner_authorization,
                            counts: composedReceipt.counts,
                            joins_sha256: composedReceipt.joins_sha256,
                        };
                        const persistedCore = {
                            schema: persistedReceipt?.schema,
                            ledger_path: persistedReceipt?.ledger_path,
                            ledger_file_sha256: persistedReceipt?.ledger_file_sha256,
                            manifest_hash: persistedReceipt?.manifest_hash,
                            value_root: persistedReceipt?.value_root,
                            owner_returns: persistedReceipt?.owner_returns,
                            owner_authorization: persistedReceipt?.owner_authorization,
                            counts: persistedReceipt?.counts,
                            joins_sha256: persistedReceipt?.joins_sha256,
                        };
                        if (!sameJson(replayCore, persistedCore)) {
                            fail("/annexes/value-target-transpose/validation_receipt: persisted composed core differs from immutable historical Git replay");
                        }
                    }
                } catch (error) {
                    fail(`/annexes/value-target-transpose/validation_receipt: composed receipt parse failed: ${error.message}`);
                }
            }
        }
        const ownerAuthorization = persistedReceipt?.owner_authorization;
        const ownerNodes = ownerAuthorization?.nodes;
        if (!Array.isArray(ownerNodes)
            || ownerAuthorization.nodes_sha256 !== createHash("sha256").update(canonicalize(ownerNodes), "utf8").digest("hex")) {
            fail("/annexes/value-target-transpose/validation_receipt/owner_authorization: exact self-hashed owner identity vector required");
        } else {
            const scopeNodes = new Map(authorizationClosure.nodes.map((node) => [node.wave_id, node]));
            for (const [index, node] of ownerNodes.entries()) {
                const scoped = scopeNodes.get(node.wave_id);
                if (!scoped || !sameJson(scoped, node)) {
                    fail(`/annexes/value-target-transpose/validation_receipt/owner_authorization/nodes/${index}: owner history is not the exact V29T scope identity`);
                }
            }
        }
        const boundArtifacts = [
            ...artifacts.map(([name]) => valueTargetTranspose[name]),
            inventoryReturnBinding,
            physicalTruthBinding,
            validationReceipt,
        ];
        for (const binding of boundArtifacts) {
            const path = binding?.path;
            const expectedHash = binding?.file_sha256;
            const matches = (record.evidence_inputs ?? []).filter((input) => input.path === path && input.sha256 === expectedHash);
            if (matches.length !== 1) fail(`/evidence_inputs: V29T transpose artifact ${path} must be bound exactly once`);
        }
    }
} else if (valueTargetTranspose) {
    fail("/annexes/value-target-transpose: only V29T may return the transpose annex");
}

for (const [index, pin] of (record.pins ?? []).entries()) {
    if (terminalStatuses.has(record.status) && pin.dirty_after_sha256 !== cleanGitStatusSha256) {
        fail(`/pins/${index}/dirty_after_sha256: terminal authority requires a clean committed epoch`);
    }
    if (offline) continue;
    if (!existsSync(pin.path)) {
        fail(`/pins/${index}: repository path does not exist`);
        continue;
    }
    try {
        const head = execFileSync("git", ["-C", pin.path, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
        const branch = execFileSync("git", ["-C", pin.path, "rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" }).trim();
        const status = execFileSync("git", ["-C", pin.path, "status", "--porcelain=v1", "-z"]);
        const dirty = createHash("sha256").update(status).digest("hex");
        if (head !== pin.head) fail(`/pins/${index}/head: live ${head}; return ${pin.head}`);
        if (branch !== pin.branch) fail(`/pins/${index}/branch: live ${branch}; return ${pin.branch}`);
        if (dirty !== pin.dirty_after_sha256) fail(`/pins/${index}/dirty_after_sha256: live ${dirty}; return ${pin.dirty_after_sha256}`);
    } catch (error) {
        fail(`/pins/${index}: cannot verify git pin: ${error.message}`);
    }
}

const historicalEpochPins = [];
const historicalGateRows = [];
if (historicalGateReplay) {
    for (const [index, pin] of (record.pins ?? []).entries()) {
        const materialized = historicalGateWorktree(pin, `/pins/${index}/historical_replay`);
        if (!materialized) continue;
        try {
            const replayedState = repositoryStateSha256(materialized.root, { identityRoot: pin.path });
            const certifiedState = certifiedRepositoryState(record, pin, `/pins/${index}/historical_replay/repository_state_sha256`);
            if (replayedState !== certifiedState) {
                fail(`/pins/${index}/historical_replay/repository_state_sha256: materialized ${replayedState}; certificate ${certifiedState}`);
            }
            historicalEpochPins.push({
                repository: pin.repository,
                path: pin.path,
                head: pin.head,
                repository_state_sha256: replayedState,
            });
        } catch (error) {
            fail(`/pins/${index}/historical_replay: ${error.message}`);
        }
    }
}

const gateResults = Array.isArray(record.gates) ? record.gates.map(({ result }) => result) : [];
const gateStartedTimes = [];
const gateChallengeHashes = [];
let historicalGateReplayCount = 0;
for (const [index, gate] of (record.gates ?? []).entries()) {
    if (gate.kind === "command" && /^(?:true|false|:|echo(?:\s+.*)?|exit\s+0)$/i.test(gate.command_or_probe.trim())) {
        fail(`/gates/${index}/command_or_probe: trivial command cannot falsify the claim`);
    }
    const receiptPath = gate.receipt?.path;
    if (!existsSync(receiptPath ?? "")) continue;
    try {
        verifyCanonicalFilePath(receiptPath, `/gates/${index}/receipt/path`);
        const receipt = parseJsonStrict(readFileSync(receiptPath));
        for (const error of validateJsonSchema(receipt, gateReceiptSchema)) fail(`/gates/${index}/receipt${error}`);
        const receiptPreimage = { ...receipt };
        delete receiptPreimage.receipt_hash;
        const receiptHash = createHash("sha256").update(canonicalize(receiptPreimage), "utf8").digest("hex");
        if (receipt.receipt_hash !== receiptHash) fail(`/gates/${index}/receipt/receipt_hash: computed ${receiptHash}`);
        if (receipt.schema !== "vnext-gate-receipt/3") fail(`/gates/${index}/receipt/schema: expected vnext-gate-receipt/3`);
        if (receipt.wave_id !== record.wave_id) fail(`/gates/${index}/receipt/wave_id: does not match ${record.wave_id}`);
        if (receipt.gate_id !== gate.id) fail(`/gates/${index}/receipt/gate_id: does not match ${gate.id}`);
        if (receipt.kind !== gate.kind) fail(`/gates/${index}/receipt/kind: does not match ${gate.kind}`);
        if (receipt.subject !== gate.command_or_probe) fail(`/gates/${index}/receipt/subject: does not bind the returned gate`);
        if (receipt.expected !== gate.expected) fail(`/gates/${index}/receipt/expected: does not bind the returned gate`);
        if (receipt.wave_contract_sha256 !== waveContract?.sha256) {
            fail(`/gates/${index}/receipt/wave_contract_sha256: expected ${waveContract?.sha256}`);
        }
        gateChallengeHashes.push({ index, sha256: receipt.challenge_sha256 });
        if (receipt.result !== gate.result) fail(`/gates/${index}/receipt/result: does not match ${gate.result}`);
        const startedAt = Date.parse(receipt.started_at);
        const finishedAt = Date.parse(receipt.finished_at);
        if (!Number.isFinite(startedAt) || !Number.isFinite(finishedAt)) fail(`/gates/${index}/receipt: timestamps must be valid date-times`);
        else {
            gateStartedTimes.push(startedAt);
            if (finishedAt < startedAt) fail(`/gates/${index}/receipt: finished before it started`);
        }
        if (receipt.execution?.applicability === "applicable") {
            if (receipt.kind !== "command") fail(`/gates/${index}/receipt/execution: only command gates use process execution`);
            let safeToExecute = true;
            const unsafe = (message) => {
                safeToExecute = false;
                fail(`/gates/${index}/receipt/${message}`);
            };
            let argv;
            try {
                argv = canonicalGateArgv(receipt.subject, record.wave_id);
            } catch (error) {
                unsafe(`execution: ${error.message}`);
            }
            if (argv && (receipt.execution.command_token !== argv.commandToken || canonicalize(receipt.execution.args) !== canonicalize(argv.args))) {
                unsafe("execution: command token and args do not exactly realize the canonical subject");
            }
            let executablePath = receipt.execution.executable_path;
            if (!offline || historicalGateReplay) {
                try {
                    if (argv?.commandToken !== "node") throw new Error("direct proof command token must be node");
                    executablePath = realpathSync(process.execPath);
                    if (receipt.execution.executable_path !== executablePath) {
                        unsafe(`execution/executable_path: expected ${executablePath}`);
                    }
                    const executableHash = fileHash(executablePath);
                    if (receipt.execution.executable_sha256 !== executableHash) {
                        unsafe(`execution/executable_sha256: live ${executableHash}; receipt ${receipt.execution.executable_sha256}`);
                    }
                } catch (error) {
                    unsafe(`execution/executable_path: ${error.message}`);
                }
                const environmentHash = gateEnvironmentSha256();
                if (receipt.execution.environment_sha256 !== environmentHash) {
                    unsafe(`execution/environment_sha256: live ${environmentHash}; receipt ${receipt.execution.environment_sha256}`);
                }
            }
            verifyEvidencePath(receipt.execution.stdout_path, receipt.execution.stdout_sha256, `/gates/${index}/receipt/execution/stdout`);
            verifyEvidencePath(receipt.execution.stderr_path, receipt.execution.stderr_sha256, `/gates/${index}/receipt/execution/stderr`);
            verifyCanonicalFilePath(receipt.execution.stdout_path, `/gates/${index}/receipt/execution/stdout_path`);
            verifyCanonicalFilePath(receipt.execution.stderr_path, `/gates/${index}/receipt/execution/stderr_path`);
            let cwd = receipt.execution.cwd;
            let executionCwd = cwd;
            let replayedEpoch;
            const matchingPins = (record.pins ?? []).filter((pin) => pin.repository === receipt.execution.pin_repository);
            if (matchingPins.length !== 1) {
                unsafe("execution/pin_repository: must identify exactly one return pin");
            } else if (offline) {
                if (matchingPins[0].path !== cwd) {
                    unsafe("execution/cwd: must equal the exact identified recorded pin path");
                }
                if (historicalGateReplay) {
                    replayedEpoch = historicalGateWorktree(matchingPins[0], `/gates/${index}/receipt/execution/historical_replay`);
                    if (replayedEpoch) executionCwd = replayedEpoch.root;
                    else safeToExecute = false;
                }
            } else if (!existsSync(cwd) || !statSync(cwd).isDirectory()) {
                unsafe("execution/cwd: directory does not exist");
            } else {
                cwd = realpathSync(cwd);
                if (receipt.execution.cwd !== cwd) unsafe(`execution/cwd: must be canonical ${cwd}`);
                if (!existsSync(matchingPins[0].path) || realpathSync(matchingPins[0].path) !== cwd) {
                    unsafe("execution/cwd: must equal the exact identified pinned repository root");
                }
            }
            let repositoryStateBefore;
            if ((!offline || historicalGateReplay) && executionCwd) {
                try {
                    const runnerPath = resolve(executionCwd, proofRunnerRelativePath);
                    const entrypointPath = resolve(executionCwd, argv.entrypointRelative);
                    for (const [label, candidate] of [["runner", runnerPath], ["entrypoint", entrypointPath]]) {
                        const metadata = lstatSync(candidate);
                        if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(candidate) !== candidate) {
                            throw new Error(`${label} must be a canonical regular non-symlink file`);
                        }
                    }
                    const runnerHash = fileHash(runnerPath);
                    if (runnerHash !== proofRunnerSha256) {
                        throw new Error(`proof runner hash ${runnerHash} does not equal canonical ${proofRunnerSha256}`);
                    }
                } catch (error) {
                    unsafe(`execution/proof_runner: ${error.message}`);
                }
            }
            if (cwd && (!offline || historicalGateReplay) && executionCwd) {
                try {
                    repositoryStateBefore = repositoryStateSha256(executionCwd, replayedEpoch ? { identityRoot: cwd } : {});
                    if (receipt.execution.repository_state_sha256 !== repositoryStateBefore) {
                        unsafe(`execution/repository_state_sha256: ${historicalGateReplay ? "historical" : "live"} ${repositoryStateBefore}; receipt ${receipt.execution.repository_state_sha256}`);
                    }
                } catch (error) {
                    unsafe(`execution/repository_state_sha256: ${error.message}`);
                }
            }
            let manifestPath;
            if (cwd && argv) {
                try {
                    const recordedManifestPath = offline
                        ? resolve(cwd, argv.manifestRelative)
                        : proofManifestPath(cwd, argv.manifestRelative);
                    const fromRoot = relative(cwd, recordedManifestPath);
                    if (fromRoot.startsWith("..") || isAbsolute(fromRoot)) {
                        throw new Error("proof manifest escapes recorded gate cwd");
                    }
                    if (receipt.proof_manifest.path !== recordedManifestPath) {
                        unsafe(`proof_manifest/path: expected ${recordedManifestPath}`);
                    }
                    manifestPath = replayedEpoch
                        ? resolve(replayedEpoch.root, argv.manifestRelative)
                        : recordedManifestPath;
                    if (!offline || historicalGateReplay) {
                        verifyEvidencePath(manifestPath, receipt.proof_manifest.sha256, `/gates/${index}/receipt/proof_manifest`);
                    }
                    if ((!offline || historicalGateReplay) && existsSync(manifestPath)) {
                        const proofManifest = parseJsonStrict(readFileSync(manifestPath));
                        if (proofManifest.schema !== "vnext-proof-manifest/1") {
                            unsafe("proof_manifest/schema: expected vnext-proof-manifest/1");
                        }
                        if (proofManifest.wave_id !== record.wave_id) {
                            unsafe(`proof_manifest/wave_id: expected ${record.wave_id}`);
                        }
                        if (proofManifest.wave_contract_sha256 !== waveContract?.sha256) {
                            unsafe(`proof_manifest/wave_contract_sha256: expected ${waveContract?.sha256}`);
                        }
                        const manifestSeedRequirements = [...(proofManifest.seed_requirements ?? [])]
                            .sort((left, right) => compareCanonicalText(left.id, right.id));
                        if (new Set(manifestSeedRequirements.map(({ id }) => id)).size !== manifestSeedRequirements.length) {
                            unsafe("proof_manifest/seed_requirements: IDs must be unique");
                        }
                        if (canonicalize(manifestSeedRequirements) !== canonicalize(expectedSeedRequirements)) {
                            unsafe("proof_manifest/seed_requirements: must equal the exact canonical seed-requirement projection");
                        }
                    }
                } catch (error) {
                    unsafe(`proof_manifest: ${error.message}`);
                }
            }
            const inferred = receipt.execution.exit_code === 0 ? "pass" : "fail";
            if (receipt.result !== inferred) fail(`/gates/${index}/receipt/execution: exit ${receipt.execution.exit_code} implies ${inferred}`);
            if ((!offline || historicalGateReplay) && safeToExecute) {
                const live = spawnSync(executablePath, argv.args, {
                    cwd: executionCwd,
                    encoding: null,
                    env: proofRunnerEnvironment(),
                    maxBuffer: 128 * 1024 * 1024,
                    shell: false,
                });
                if (historicalGateReplay) {
                    historicalGateReplayCount += 1;
                    historicalGateRows.push({
                        gate_id: gate.id,
                        receipt_hash: receipt.receipt_hash,
                        pin_repository: receipt.execution.pin_repository,
                        stdout_sha256: createHash("sha256").update(live.stdout ?? Buffer.alloc(0)).digest("hex"),
                        stderr_sha256: createHash("sha256").update(live.stderr ?? Buffer.alloc(0)).digest("hex"),
                    });
                }
                if (live.error) {
                    fail(`/gates/${index}/receipt/execution/${historicalGateReplay ? "historical_replay" : "live"}: ${live.error.message}`);
                } else if (live.signal) {
                    fail(`/gates/${index}/receipt/execution/${historicalGateReplay ? "historical_replay" : "live"}: terminated by ${live.signal}`);
                } else {
                    if (live.status !== receipt.execution.exit_code) {
                        fail(`/gates/${index}/receipt/execution/${historicalGateReplay ? "historical_replay" : "live"}: exit ${live.status}; receipt ${receipt.execution.exit_code}`);
                    }
                    const liveStdoutHash = createHash("sha256").update(live.stdout ?? Buffer.alloc(0)).digest("hex");
                    const liveStderrHash = createHash("sha256").update(live.stderr ?? Buffer.alloc(0)).digest("hex");
                    if (liveStdoutHash !== receipt.execution.stdout_sha256) {
                        fail(`/gates/${index}/receipt/execution/${historicalGateReplay ? "historical_replay" : "live"}: stdout ${liveStdoutHash}; receipt ${receipt.execution.stdout_sha256}`);
                    }
                    if (liveStderrHash !== receipt.execution.stderr_sha256) {
                        fail(`/gates/${index}/receipt/execution/${historicalGateReplay ? "historical_replay" : "live"}: stderr ${liveStderrHash}; receipt ${receipt.execution.stderr_sha256}`);
                    }
                }
                try {
                    const repositoryStateAfter = repositoryStateSha256(executionCwd, replayedEpoch ? { identityRoot: cwd } : {});
                    if (repositoryStateAfter !== repositoryStateBefore) {
                        fail(`/gates/${index}/receipt/execution/${historicalGateReplay ? "historical_replay" : "live"}: proof mutated repository state ${repositoryStateBefore} -> ${repositoryStateAfter}`);
                    }
                } catch (error) {
                    fail(`/gates/${index}/receipt/execution/${historicalGateReplay ? "historical_replay" : "live"}: cannot digest post-run repository state: ${error.message}`);
                }
            }
        }
        for (const [evidenceIndex, evidence] of (receipt.evidence ?? []).entries()) {
            verifyEvidencePath(evidence.path, evidence.sha256, `/gates/${index}/receipt/evidence/${evidenceIndex}`);
        }
    } catch (error) {
        fail(`/gates/${index}/receipt: strict validation failed: ${error.message}`);
    }
}
if (gateChallengeHashes.length !== (record.gates ?? []).length) {
    fail(`/gates: every gate receipt must bind one exact implementation challenge hash`);
}
if (historicalGateReplay) {
    const expectedHistoricalGateReplays = (record.gates ?? [])
        .filter((gate) => gate.kind === "command")
        .length;
    if (historicalGateReplayCount !== expectedHistoricalGateReplays) {
        fail(`/gates: historical replay executed ${historicalGateReplayCount} of ${expectedHistoricalGateReplays} command gates`);
    }
    if (historicalEpochPins.length !== (record.pins ?? []).length) {
        fail(`/pins: historical replay materialized ${historicalEpochPins.length} of ${(record.pins ?? []).length} immutable pin epochs`);
    }
}
if (terminalStatuses.has(record.status) && gateResults.some((result) => result !== "pass")) {
    fail(`/status: ${record.status} requires every gate result to be pass`);
}
if (terminalStatuses.has(record.status) && record.routed_remainder?.some(({ blocking }) => blocking === true)) {
    fail(`/status: ${record.status} cannot carry a blocking routed remainder`);
}
if (terminalStatuses.has(record.status) && record.terminal_disposition?.no_legacy_paths !== true) {
    fail(`/terminal_disposition/no_legacy_paths: ${record.status} requires true`);
}
const repositoryPathKey = (value) => `${value?.repository}\0${value?.path}`;
const deliveredPathKeys = deliveredDeletionPaths.map(repositoryPathKey);
if (new Set(deliveredPathKeys).size !== deliveredPathKeys.length || canonicalize(deliveredPathKeys) !== canonicalize([...deliveredPathKeys].sort())) {
    fail("/delivery/deleted_paths: repository-qualified paths must be unique and canonically ordered");
}
const decisionIds = terminalDeletionDecisions.map(({ decision_id }) => decision_id);
if (new Set(decisionIds).size !== decisionIds.length || canonicalize(decisionIds) !== canonicalize([...decisionIds].sort())) {
    fail("/terminal_disposition/deletions: decisions must be uniquely ID-sorted");
}
const decidedPhysicalDeletionKeys = [];
for (const [index, decision] of terminalDeletionDecisions.entries()) {
    const effects = {
        deleted: decision.file_effects?.deleted ?? [],
        modified: decision.file_effects?.modified ?? [],
    };
    if (effects.deleted.length + effects.modified.length === 0) {
        fail(`/terminal_disposition/deletions/${index}/file_effects: a decision requires a physical deleted or modified file effect`);
    }
    for (const kind of ["deleted", "modified"]) {
        const keys = effects[kind].map(repositoryPathKey);
        if (new Set(keys).size !== keys.length || canonicalize(keys) !== canonicalize([...keys].sort())) {
            fail(`/terminal_disposition/deletions/${index}/file_effects/${kind}: repository-qualified effects must be unique and canonically ordered`);
        }
    }
    decidedPhysicalDeletionKeys.push(...effects.deleted.map(repositoryPathKey));
}
if (new Set(decidedPhysicalDeletionKeys).size !== decidedPhysicalDeletionKeys.length) {
    fail("/terminal_disposition/deletions: a physical deleted path may belong to exactly one decision");
}
if (canonicalize([...decidedPhysicalDeletionKeys].sort()) !== canonicalize([...deliveredPathKeys].sort())) {
    fail("/terminal_disposition/deletions: deleted effects must exactly cover delivery.deleted_paths");
}
if (record.status === "PRUNE" && terminalDeletionDecisions.length === 0) {
    fail("/status: PRUNE requires at least one exact deletion decision; a validated modified-only effect is sufficient");
}
const auditWaves = new Set(["P00", "P02", "P07", "V00A", "V01", "V02", "V10I", "V30", "V31", "K00", "K04I", "K24", "A00", "A01", "A26", "G00", "D00A", "D17A", "D18A", "D25", "M00", "M11", "C00U", "C00", "C06", "C07", "C08", "C09"]);
if (record.status === "NOT_CLEAN" && !auditWaves.has(record.wave_id)) {
    fail(`/status: NOT_CLEAN is audit-only; ${record.wave_id} is not an audit wave`);
}
const parserScopes = new Map([
    ["P00", "baseline"],
    ["P01", "prototype"],
    ["P02", "necessity-adjudication"],
    ["P03", "banked-proposal"],
    ["P04", "published-control"],
    ["P05", "control-crater"],
    ["P06", "consumer-crater"],
    ["P07", "acceptance"],
]);
const parserAnnex = record.annexes?.parser;
if (parserScopes.has(record.wave_id)) {
    if (!parserAnnex) fail(`/annexes/parser: required for ${record.wave_id}`);
    else {
        if (parserAnnex.scope_class !== parserScopes.get(record.wave_id)) fail(`/annexes/parser/scope_class: expected ${parserScopes.get(record.wave_id)}`);
        const invocationRequired = new Set(["P00", "P01", "P05", "P06", "P07"]).has(record.wave_id);
        if (invocationRequired && parserAnnex.parser_invocations < 1) fail("/annexes/parser/parser_invocations: this wave requires a nonvacuous parser execution");
        if (invocationRequired && parserAnnex.route_coverage?.length === 0) fail("/annexes/parser/route_coverage: this wave requires at least one exact exercised route");
        if (new Set(parserAnnex.route_coverage ?? []).size !== (parserAnnex.route_coverage ?? []).length) fail("/annexes/parser/route_coverage: routes must be unique");
        const controlEvidence = (parserAnnex.evidence ?? []).filter(({ sha256 }) => sha256 === parserAnnex.control_receipt_sha256);
        if (controlEvidence.length !== 1) fail("/annexes/parser/control_receipt_sha256: must bind exactly one receipt evidence row");
        else {
            const evidence = controlEvidence[0];
            verifyEvidencePath(evidence.path, evidence.sha256, "/annexes/parser/control_receipt");
            if (existsSync(evidence.path)) {
                const receipt = parseJsonStrict(readFileSync(evidence.path));
                const expectedPackage = {
                    name: receipt.package?.name,
                    version: receipt.package?.version,
                    registry_spec: receipt.package?.registry_spec,
                    branch: "unchanged-1.0.0-no-republish",
                    integrity: receipt.package?.integrity,
                    tarball_sha256: receipt.tarball?.sha256,
                    package_json_sha256: receipt.archive?.package_json_sha256,
                    file_count: receipt.archive?.file_count,
                    file_manifest_sha256: receipt.archive?.files_sha256,
                    runtime_files_sha256: receipt.archive?.runtime_files_sha256,
                    declaration_files_sha256: receipt.archive?.declaration_files_sha256,
                    export_conditions_sha256: receipt.archive?.export_conditions_sha256,
                    no_link_install_sha256: receipt.install?.tree_sha256,
                    receipt_hash: receipt.receipt_hash,
                };
                if (canonicalize(parserAnnex.package) !== canonicalize(expectedPackage)) fail("/annexes/parser/package: must exactly project the validated package receipt");
                if (!offline) {
                    const live = spawnSync(process.execPath, [parseThatReceiptValidatorPath, "--receipt", evidence.path], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
                    if (live.status !== 0) fail(`/annexes/parser/control_receipt: live package validation failed: ${(live.stderr || live.stdout).trim()}`);
                }
            }
        }
        const handoffEvidence = (parserAnnex.evidence ?? []).filter(({ sha256 }) => sha256 === parserAnnex.external_handoff_sha256);
        if (handoffEvidence.length !== 1) fail("/annexes/parser/external_handoff_sha256: must bind exactly one evidence row");
        for (const [index, evidence] of (parserAnnex.evidence ?? []).entries()) verifyEvidencePath(evidence.path, evidence.sha256, `/annexes/parser/evidence/${index}`);
        const blockerIds = (parserAnnex.blockers ?? []).map(({ defect_id }) => defect_id);
        if (new Set(blockerIds).size !== blockerIds.length || canonicalize(blockerIds) !== canonicalize([...blockerIds].sort())) fail("/annexes/parser/blockers: defect IDs must be unique and sorted");
        for (const [index, blocker] of (parserAnnex.blockers ?? []).entries()) {
            const matches = (parserAnnex.evidence ?? []).filter(({ sha256 }) => sha256 === blocker.evidence_sha256);
            if (matches.length !== 1) fail(`/annexes/parser/blockers/${index}/evidence_sha256: must bind exactly one annex evidence row`);
        }
        if (record.wave_id === "P07" && (parserAnnex.blockers ?? []).some(({ disposition }) => disposition === "blocks-adoption") && terminalStatuses.has(record.status)) {
            fail("/annexes/parser/blockers: P07 cannot return terminal acceptance with an adoption blocker");
        }
    }
} else if (parserAnnex) {
    fail(`/annexes/parser: only P00-P07 may return the parser annex`);
}
const challenge = record.annexes?.["implementation-challenge"];
const challengeExempt = auditWaves.has(record.wave_id) || nonterminalStatuses.has(record.status);
if (challengeExempt) {
    if (challenge?.applicability !== "not_applicable") {
        fail("/annexes/implementation-challenge: audit, BLOCKED, and NOT_CLEAN returns require typed not_applicable");
    }
} else if (terminalStatuses.has(record.status)) {
    if (challenge?.applicability !== "applicable") {
        fail(`/annexes/implementation-challenge: terminal implementation return ${record.wave_id} requires a final-state hostile triad`);
    } else {
        if (challenge.schema !== "vnext-implementation-challenge/1") {
            fail("/annexes/implementation-challenge/schema: expected vnext-implementation-challenge/1");
        }
        if (challenge.wave_id !== record.wave_id) fail("/annexes/implementation-challenge/wave_id: must equal the returning wave");
        if (challenge.wave_contract_sha256 !== record.scope?.wave_contract_sha256
            || challenge.wave_contract_sha256 !== waveContract?.sha256) {
            fail("/annexes/implementation-challenge/wave_contract_sha256: must bind the exact current wave contract");
        }

        const pinnedRoots = [];
        const expectedStates = [];
        for (const [index, pin] of (record.pins ?? []).entries()) {
            if (!existsSync(pin.path)) continue;
            const root = realpathSync(pin.path);
            pinnedRoots.push(root);
            let state = (challenge.repository_states ?? []).find(({ repository, path }) => repository === pin.repository && path === root)?.sha256 ?? "";
            if (!offline) {
                try {
                    state = repositoryStateSha256(root);
                } catch (error) {
                    fail(`/annexes/implementation-challenge/repository_states: cannot digest pin ${index}: ${error.message}`);
                }
            }
            expectedStates.push({ repository: pin.repository, path: root, sha256: state });
        }
        expectedStates.sort((left, right) => compareCanonicalText(`${left.repository}\0${left.path}`, `${right.repository}\0${right.path}`));
        const returnedStates = [...(challenge.repository_states ?? [])]
            .map((state) => ({ ...state, path: existsSync(state.path) ? realpathSync(state.path) : state.path }));
        const stateKeys = returnedStates.map(({ repository, path }) => `${repository}\0${path}`);
        if (new Set(stateKeys).size !== stateKeys.length) {
            fail("/annexes/implementation-challenge/repository_states: duplicate repository/path join");
        }
        if (canonicalize(returnedStates) !== canonicalize(expectedStates)) {
            fail("/annexes/implementation-challenge/repository_states: must equal the exact sorted final live pin states");
        }
        const challengeInputBase = {
            schema: "vnext-implementation-challenge-input/1",
            wave_id: record.wave_id,
            wave_contract_sha256: record.scope?.wave_contract_sha256,
            semantic_subject_sha256: implementationSemanticSubjectSha256(record),
            dependency_closure_sha256: authorizationClosure.descendant_closure_hash,
            direct_dependency_returns: (record.scope?.dependency_returns ?? []).map((binding) => ({
                wave_id: binding.wave_id,
                path: binding.path,
                file_sha256: binding.file_sha256,
                return_hash: binding.return_hash,
                wave_contract_sha256: binding.wave_contract_sha256,
            })),
            implementation_state: {
                pins: (record.pins ?? []).map((pin) => ({
                    repository: pin.repository,
                    path: pin.path,
                    head: pin.head,
                    dirty_after_sha256: pin.dirty_after_sha256,
                })),
                repository_states: returnedStates,
            },
            gate_contract: implementationGateContract(record.gates ?? []),
        };

        const critics = challenge.critics ?? [];
        if (canonicalize(critics.map(({ role }) => role)) !== canonicalize(["critic_a", "critic_b"])) {
            fail("/annexes/implementation-challenge/critics: exact ordered critic_a, critic_b roles required");
        }
        const actors = [...critics, challenge.adjudicator].filter(Boolean);
        for (const [index, actor] of actors.entries()) {
            const pointer = index < 2
                ? `/annexes/implementation-challenge/critics/${index}`
                : "/annexes/implementation-challenge/adjudicator";
            for (const axis of ["tranche_fit_optimality", "wave_contract_adherence_friction", "feature_behavior"]) {
                if (!Array.isArray(actor.axes?.[axis]) || actor.axes[axis].length === 0) {
                    fail(`${pointer}/axes/${axis}: mandatory gestalt axis requires evidence`);
                }
                for (const [evidenceIndex, evidence] of (actor.axes?.[axis] ?? []).entries()) {
                    verifyEvidencePath(evidence.path, evidence.sha256, `${pointer}/axes/${axis}/${evidenceIndex}`);
                }
            }
        }
        const sessionIds = actors.map(({ session_id }) => session_id);
        const sessionPaths = actors.map(({ session_jsonl }) => session_jsonl?.path);
        const sessionHashes = actors.map(({ session_jsonl }) => session_jsonl?.sha256);
        const reportPaths = actors.map(({ report }) => report?.path);
        const reportHashes = actors.map(({ report }) => report?.sha256);
        for (const [label, values] of [
            ["session IDs", sessionIds],
            ["session paths", sessionPaths],
            ["session hashes", sessionHashes],
            ["report paths", reportPaths],
            ["report hashes", reportHashes],
        ]) if (new Set(values).size !== actors.length) fail(`/annexes/implementation-challenge: all three ${label} must be distinct`);
        if (new Set([...sessionPaths, ...reportPaths]).size !== actors.length * 2) {
            fail("/annexes/implementation-challenge: session and report paths must be pairwise distinct");
        }

        const criticInputs = critics.map((actor) => ({
            ...challengeInputBase,
            role: actor.role,
            axes: actor.axes,
        }));
        const criticSessions = critics.map((actor, index) => {
            const input = canonicalize(criticInputs[index]);
            return readChallengeSession(
                actor,
                `/annexes/implementation-challenge/critics/${index}`,
                pinnedRoots,
                `ASSUME-WAVE-WRONG ${input}`,
                `VNEXT-CHALLENGE-INPUT ${input}`,
            );
        });
        const adjudicatorInput = {
            ...challengeInputBase,
            role: challenge.adjudicator?.role,
            axes: challenge.adjudicator?.axes,
            critics: critics.map((actor, index) => ({
                role: actor.role,
                report_path: actor.report?.path,
                report_sha256: actor.report?.sha256,
                report_content: criticSessions[index]?.reportText,
            })),
        };
        const adjudicatorInputText = canonicalize(adjudicatorInput);
        const adjudication = readChallengeSession(
            challenge.adjudicator,
            "/annexes/implementation-challenge/adjudicator",
            pinnedRoots,
            `ADJUDICATE-WAVE ${adjudicatorInputText}`,
            `VNEXT-CHALLENGE-INPUT ${adjudicatorInputText}`,
        );
        const expectedInputHashes = critics.map(({ report }) => report?.sha256);
        if (canonicalize(challenge.adjudicator?.input_report_sha256 ?? []) !== canonicalize(expectedInputHashes)) {
            fail("/annexes/implementation-challenge/adjudicator/input_report_sha256: must bind critic_a then critic_b report hashes");
        }
        for (const [index, session] of criticSessions.entries()) {
            const peerIndex = index === 0 ? 1 : 0;
            const peer = critics[peerIndex];
            const peerSession = criticSessions[peerIndex];
            const forbiddenPeerArtifacts = [
                peer?.session_id,
                peer?.session_jsonl?.path,
                peer?.session_jsonl?.sha256,
                peer?.report?.path,
                peer?.report?.sha256,
                peerSession?.reportText,
            ].filter((value) => typeof value === "string" && value.length > 0);
            const containsPeerArtifact = (value) => {
                if (typeof value === "string") return forbiddenPeerArtifacts.some((artifact) => value.includes(artifact));
                if (Array.isArray(value)) return value.some(containsPeerArtifact);
                if (value && typeof value === "object") return Object.values(value).some(containsPeerArtifact);
                return false;
            };
            if (containsPeerArtifact(session?.records ?? [])) {
                fail(`/annexes/implementation-challenge/critics/${index}: hostile critic accessed sibling session or report material`);
            }
        }
        if (adjudication) {
            const positions = expectedInputHashes.map((hash) => adjudication.reportText.indexOf(hash));
            if (positions.some((position) => position < 0) || positions[0] >= positions[1]) {
                fail("/annexes/implementation-challenge/adjudicator/report: must cite critic_a then critic_b report hashes");
            }
            const criticCompletion = Math.max(...criticSessions.filter(Boolean).map(({ completedAt }) => completedAt));
            if (criticSessions.filter(Boolean).length === 2 && adjudication.startedAt <= criticCompletion) {
                fail("/annexes/implementation-challenge/adjudicator: must start after both critics complete");
            }
            if (gateStartedTimes.length && gateStartedTimes.some((startedAt) => startedAt <= adjudication.completedAt)) {
                fail("/annexes/implementation-challenge: every hostile review must complete before the acceptance gate starts");
            }
        }
        if (critics.some(({ verdict, unresolved_findings }) => verdict !== "clean" || unresolved_findings?.length)
            || challenge.adjudicator?.verdict !== "ratified" || challenge.adjudicator?.unresolved_findings?.length) {
            fail("/annexes/implementation-challenge: terminal return requires two clean critics, ratification, and zero unresolved findings");
        }
    }
}
if (challenge) {
    const challengeHash = implementationChallengeSha256(challenge);
    for (const { index, sha256: returnedHash } of gateChallengeHashes) {
        if (returnedHash !== challengeHash) {
            fail(`/gates/${index}/receipt/challenge_sha256: expected exact implementation challenge ${challengeHash}`);
        }
    }
}
if (record.status === "NOT_CLEAN") {
    const closure = record.annexes?.closure;
    if (closure?.verdict !== "not_clean" || !Array.isArray(closure?.reopened_owners) || closure.reopened_owners.length === 0) {
        fail("/annexes/closure: NOT_CLEAN requires verdict=not_clean and at least one reopened owner");
    }
}
if (["C08", "C09"].includes(record.wave_id)) {
    const closure = record.annexes?.closure;
    if (!closure) fail("/annexes/closure: required for C08/C09");
    if (closure?.verdict === "clean" && closure.reopened_owners?.length !== 0) fail("/annexes/closure: clean verdict requires zero current reopenings");
    if (closure?.verdict === "not_clean" && closure.reopened_owners?.length === 0) fail("/annexes/closure: not_clean verdict requires current reopenings");
    const reopened = closure?.reopened_owners ?? [];
    if (canonicalize(reopened) !== canonicalize([...reopened].sort())) fail("/annexes/closure/reopened_owners: must be sorted");
    const resolvedIds = (closure?.resolved_reopenings ?? []).map(({ wave_id }) => wave_id);
    if (new Set(resolvedIds).size !== resolvedIds.length) fail("/annexes/closure/resolved_reopenings: wave IDs must be unique");
    if (canonicalize(resolvedIds) !== canonicalize([...resolvedIds].sort())) fail("/annexes/closure/resolved_reopenings: must be sorted by wave ID");
    const corpusInputs = record.evidence_inputs.filter(({ sha256 }) => sha256 === closure?.inspected_corpus_sha256);
    if (corpusInputs.length !== 1) fail("/annexes/closure/inspected_corpus_sha256: must bind exactly one persisted evidence input");
}
if (record.wave_id === "C08" && record.annexes?.closure?.resolved_dependency_receipt) {
    fail("/annexes/closure/resolved_dependency_receipt: C08 produces attempt returns; only C09 consumes the scheduling receipt");
}
if (record.wave_id === "C09") {
    const closure = record.annexes?.closure;
    const binding = closure?.resolved_dependency_receipt;
    if (!binding) {
        fail("/annexes/closure/resolved_dependency_receipt: required for C09");
    } else {
        verifyEvidencePath(binding.path, binding.sha256, "/annexes/closure/resolved_dependency_receipt");
        if (existsSync(binding.path)) {
            try {
                const receipt = parseJsonStrict(readFileSync(binding.path));
                for (const message of validateResolvedReceipt(receipt)) {
                    fail(`/annexes/closure/resolved_dependency_receipt${message}`);
                }
                verifyResolvedReceiptFiles(receipt);
                if (binding.receipt_hash !== receipt.receipt_hash) {
                    fail("/annexes/closure/resolved_dependency_receipt/receipt_hash: does not match the bound receipt");
                }
                if (closure.inspected_corpus_sha256 !== receipt.corpus_epoch.sha256) {
                    fail("/annexes/closure/inspected_corpus_sha256: does not match the resolved C08 corpus epoch");
                }
                const expectedResolutions = receipt.resolved_reopenings.map(({ wave_id, owner_return_hash }) => ({ wave_id, owner_return_hash }));
                if (canonicalize(closure.resolved_reopenings) !== canonicalize(expectedResolutions)) {
                    fail("/annexes/closure/resolved_reopenings: must equal the receipt's exact sorted owner IDs and return hashes");
                }
                const receiptInputs = record.evidence_inputs.filter((input) => input.path === binding.path && input.sha256 === binding.sha256);
                if (receiptInputs.length !== 1) {
                    fail("/evidence_inputs: C09 must bind the resolved dependency receipt exactly once");
                }
            } catch (error) {
                fail(`/annexes/closure/resolved_dependency_receipt: strict verification failed: ${error.message}`);
            }
        }
    }
}
if (record.wave_id === "C10") {
    const release = record.annexes?.release;
    if (!release) fail("/annexes/release: required for C10");
    const packages = release?.packages ?? [];
    const expectedPackages = new Map([
        ["@mkbabb/value.js", "5.0.0"],
        ["@mkbabb/keyframes.js", "7.0.0"],
        ["@mkbabb/glass-ui", "8.0.0"],
    ]);
    if (new Set(packages.map(({ name }) => name)).size !== expectedPackages.size) fail("/annexes/release/packages: expected each of value, keyframes and glass exactly once");
    for (const item of packages) if (expectedPackages.get(item.name) !== item.version) fail(`/annexes/release/packages: ${item.name} has wrong release version ${item.version}`);
    for (const [index, item] of packages.entries()) {
        const peerNames = (item.peer_dependencies ?? []).map(({ name }) => name);
        if (new Set(peerNames).size !== peerNames.length) fail(`/annexes/release/packages/${index}/peer_dependencies: duplicate peer`);
    }
    const glass = packages.find(({ name }) => name === "@mkbabb/glass-ui");
    const glassPeers = new Map((glass?.peer_dependencies ?? []).map((peer) => [peer.name, peer]));
    const requiredGlassPeers = new Map([
        ["@mkbabb/value.js", { range: "^5.0.0", optional: true }],
        ["@mkbabb/keyframes.js", { range: "^7.0.0", optional: true }],
        ["vue", { range: "^3.5.0", optional: false }],
        ["tailwindcss", { range: "^4.0.0", optional: false }],
    ]);
    for (const [name, expected] of requiredGlassPeers) {
        const actual = glassPeers.get(name);
        if (!actual || actual.range !== expected.range || actual.optional !== expected.optional) {
            fail(`/annexes/release/packages: Glass peer ${name} must be ${expected.range} optional=${expected.optional}`);
        }
    }
    for (const forbidden of ["reka-ui", "tw-animate-css", "class-variance-authority", "tailwind-merge"]) {
        if (glassPeers.has(forbidden)) fail(`/annexes/release/packages: Glass retains forbidden shadcn-era peer ${forbidden}`);
    }
    const services = new Set((release?.api_migrations ?? []).map(({ service }) => service));
    if (!services.has("value") || !services.has("fourier")) fail("/annexes/release/api_migrations: both services require applied migration receipts");
    if (release?.parse_that?.branch !== "unchanged-1.0.0-no-republish" || release?.parse_that?.version !== "1.0.0" || release?.parse_that?.published !== false) {
        fail("/annexes/release/parse_that: unchanged branch must remain 1.0.0 and unpublished");
    }
    if ((record.delivery?.migrations ?? []).length === 0 || terminalDeletionDecisions.length === 0) {
        fail("/delivery: C10 must name applied migrations and project the rehearsed terminal deletion decisions");
    }
    if (!deletionAnnex && (release?.removed_surfaces ?? []).length !== 0) {
        fail("/annexes/release/removed_surfaces: cannot project release removals without a validated C05-origin deletion annex");
    } else if (deletionAnnex && canonicalize(release?.removed_surfaces ?? []) !== canonicalize(deletionAnnex.c10_removed_surfaces)) {
        fail("/annexes/release/removed_surfaces: must exactly project the content-addressed C05-origin C10 deletion annex; synthetic release rows are forbidden");
    }
}
if (record.status === "BLOCKED" && !record.routed_remainder?.some(({ blocking }) => blocking === true)) {
    fail("/routed_remainder: BLOCKED requires at least one exact blocking remainder");
}
for (const [index, remainder] of (record.routed_remainder ?? []).entries()) {
    if (wavePattern.test(remainder.owner) && !waveContracts.has(remainder.owner)) fail(`/routed_remainder/${index}/owner: owner is absent from registry`);
}

function requireApplicable(section, reason) {
    if (record[section]?.applicability !== "applicable") fail(`/${section}: ${reason} requires an applicable section`);
}
if (/^A/.test(record.wave_id) || ["C03", "C06", "C10"].includes(record.wave_id)) requireApplicable("api_contract", record.wave_id);
if (/^[DM]/.test(record.wave_id) || /^G0[2-9]$/.test(record.wave_id) || ["C04", "C07"].includes(record.wave_id)) requireApplicable("visual", record.wave_id);
if (["V16A", "V16B", "V31", "K05", "K10", "K12", "K24", "G05", "D25", "M11", "C04", "C07", "C10"].includes(record.wave_id)) requireApplicable("performance", record.wave_id);
if (/^V(?:0[1-9]|1\d|2\d)$/.test(record.wave_id) || ["V10I", "V10S", "V10D", "K02", "K03", "K04I", "K04", "K06", "K07", "K08", "K09", "K10"].includes(record.wave_id)) requireApplicable("standards_operation_vector", record.wave_id);
if (/^C/.test(record.wave_id) || ["P06", "P07", "V31", "K24", "G07"].includes(record.wave_id)) requireApplicable("consumers", record.wave_id);

if (record.api_contract?.applicability === "applicable") {
    if (record.api_contract.api_source_sha256 !== apiSourceSha256) {
        fail(`/api_contract/api_source_sha256: expected canonical API source ${apiSourceSha256}`);
    }
    if (record.api_contract.api_return_coverage_sha256 !== apiCoverageSha256) {
        fail(`/api_contract/api_return_coverage_sha256: expected canonical coverage manifest ${apiCoverageSha256}`);
    }
    const coverage = apiCoverageByWave.get(record.wave_id);
    if (!coverage) fail(`/api_contract: ${record.wave_id} has no canonical API return-coverage row`);

    const vectors = [
        ["owned_http_operation_ids", apiHttpById, apiHeadlessById, coverage?.owned?.http ?? []],
        ["owned_headless_operation_ids", apiHeadlessById, apiHttpById, coverage?.owned?.headless ?? []],
        ["audited_http_operation_ids", apiHttpById, apiHeadlessById, coverage?.audited?.http ?? []],
        ["audited_headless_operation_ids", apiHeadlessById, apiHttpById, coverage?.audited?.headless ?? []],
    ];
    for (const [field, ownClass, otherClass, expected] of vectors) {
        const returned = record.api_contract[field] ?? [];
        if (new Set(returned).size !== returned.length) fail(`/api_contract/${field}: duplicate operation ID`);
        for (const [index, id] of returned.entries()) {
            if (!ownClass.has(id)) fail(`/api_contract/${field}/${index}: unknown or reclassified operation ${id}`);
            if (otherClass.has(id)) fail(`/api_contract/${field}/${index}: operation belongs to the other transport class`);
        }
        if (canonicalize(returned) !== canonicalize(expected)) {
            const returnedSet = new Set(returned);
            const expectedSet = new Set(expected);
            const missing = expected.filter((id) => !returnedSet.has(id));
            const extra = returned.filter((id) => !expectedSet.has(id));
            fail(`/api_contract/${field}: ${record.wave_id} exact vector differs; missing ${JSON.stringify(missing)}; extra ${JSON.stringify(extra)}`);
        }
    }
    for (const [kind, ownedField, auditedField] of [
        ["HTTP", "owned_http_operation_ids", "audited_http_operation_ids"],
        ["headless", "owned_headless_operation_ids", "audited_headless_operation_ids"],
    ]) {
        const owned = new Set(record.api_contract[ownedField] ?? []);
        const overlap = (record.api_contract[auditedField] ?? []).filter((id) => owned.has(id));
        if (overlap.length) fail(`/api_contract: owned/audited ${kind} overlap ${JSON.stringify(overlap)}`);
    }
}

for (const row of record.standards_operation_vector?.rows ?? []) {
    for (const axis of ["parse", "type", "evaluate", "resolve", "adapt", "exact", "edit", "canonical"]) {
        const status = row[axis]?.status;
        if (status === "delegated" && !["resolve", "adapt"].includes(axis)) fail(`/standards_operation_vector/${row.feature_key}/${axis}: delegation is legal only for resolve/adapt`);
        if (status === "preserved_syntax_only" && !["parse", "exact", "edit"].includes(axis)) fail(`/standards_operation_vector/${row.feature_key}/${axis}: preserve-only is legal only for parse/exact/edit`);
    }
}

const preimage = { ...record };
delete preimage.return_hash;
const computed = createHash("sha256").update(canonicalize(preimage), "utf8").digest("hex");
if (record.return_hash !== computed) fail(`/return_hash: found ${record.return_hash}; computed ${computed}`);

if (failures.length) {
    cleanupHistoricalGateWorktrees();
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const validationReceipt = {
    schema: record.schema,
    wave_id: record.wave_id,
    status: record.status,
    return_hash: computed,
    mode: immutableAuthority
        ? "offline-immutable-authority"
        : historicalCertificate
            ? "offline-historical-certificate"
            : offline
                ? "offline-historical-only"
                : "live-reexecution",
    completion_eligible: !offline && rootAdvancingOutcome,
    outcome_policy: {
        class: rootOutcomePolicy.outcome_class,
        advancing_statuses: rootOutcomePolicy.advancing_statuses,
        advancing: rootAdvancingOutcome,
        reopening: rootReopeningOutcome,
    },
    proof_semantics: {
        accepted_at_epoch: !offline || historicalGateReplay,
        holds_now: !offline,
        authorizes_decision: false,
    },
    ...(consumerCaptureAuthority ? {
        consumer_immutable_capture_authority: {
            path: consumerCaptureAuthorityPath,
            file_sha256: consumerCaptureAuthorityFileSha256,
            authority_hash: consumerCaptureAuthorityHash,
        },
    } : {}),
    ...(historicalGateReplay ? {
        historical_gate_replay: {
            materialized_pin_count: historicalEpochPins.length,
            executed_gate_count: historicalGateRows.length,
            epoch_sha256: createHash("sha256").update(canonicalize({
                pins: historicalEpochPins,
                gates: historicalGateRows,
            })).digest("hex"),
        },
    } : {}),
};
if (immutableAuthority) {
    validationReceipt.immutable_authority_eligible = true;
    validationReceipt.authorization_closure = {
        node_count: authorizationClosure.nodes.length,
        edge_count: authorizationClosure.edges.length,
        closure_hash: authorizationClosure.closure_hash,
        descendant_closure_hash: authorizationClosure.descendant_closure_hash,
        nodes: authorizationClosure.nodes,
        edges: authorizationClosure.edges,
        offline_validation_count: managedDescendantValidationCount,
    };
} else if (!offline) {
    validationReceipt.live_dependency_closure = {
        validation_mode: "immutable-historical-replay",
        unique_descendant_count: authorizationClosure.nodes.length - 1,
        executed_descendant_count: managedDescendantValidationCount,
        closure_hash: authorizationClosure.closure_hash,
    };
}
cleanupHistoricalGateWorktrees();
process.stdout.write(`${JSON.stringify(validationReceipt)}\n`);
