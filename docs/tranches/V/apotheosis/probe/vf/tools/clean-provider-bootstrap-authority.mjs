import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { userInfo } from "node:os";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { cleanProviderBootstrapProjection } from "./clean-exec-contract.mjs";
import { canonicalize, decodeUtf8Strict, parseJsonStrict } from "./json-contract.mjs";

const trancheRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
export const canonicalCleanProviderBootstrapAuthorityPath = resolve(trancheRoot, "CLEAN-PROVIDER-BOOTSTRAP.json");

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const digest = /^[0-9a-f]{64}$/;
const exactBootstrapKeys = ["baseInstructions", "developer", "turnContext", "user", "worldState"];
const calibrationKeys = ["agent_path", "parent_session_id", "prefix_end_line", "prefix_sha256", "session_id", "session_jsonl"];

function exact(actual, expected, label) {
    if (canonicalize(actual) !== canonicalize(expected)) throw new Error(`${label} is not exact`);
}

function contained(base, candidate) {
    const offset = relative(base, candidate);
    return offset === "" || (!offset.startsWith(`..${sep}`) && offset !== ".." && !isAbsolute(offset));
}

function canonicalRegularFile(path, label) {
    if (!isAbsolute(path) || !existsSync(path)) throw new Error(`${label} must be an existing absolute file`);
    const metadata = lstatSync(path);
    if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(path) !== path) {
        throw new Error(`${label} must be a canonical regular non-symlink file`);
    }
}

function parseJsonLines(source, endLine) {
    const lines = source.split("\n");
    if (lines.at(-1) === "") lines.pop();
    if (lines.length < endLine) throw new Error("calibration prefix extends beyond the session JSONL");
    return {
        records: lines.slice(0, endLine).map((line, index) => ({ line: index + 1, value: parseJsonStrict(line) })),
        prefix: `${lines.slice(0, endLine).join("\n")}\n`,
    };
}

function validDigestMatrix(value, lengths) {
    return Array.isArray(value) && value.length === lengths.length
        && value.every((row, index) => Array.isArray(row) && row.length === lengths[index]
            && row.every((item) => digest.test(item)));
}

function validateBootstrapShape(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("bootstrap projection must be an object");
    exact(Object.keys(value).sort(), exactBootstrapKeys, "bootstrap projection keys");
    if (!digest.test(value.baseInstructions) || !digest.test(value.worldState) || !digest.test(value.turnContext)
        || !validDigestMatrix(value.developer, [5, 1, 1]) || !validDigestMatrix(value.user, [3])) {
        throw new Error("bootstrap projection has a malformed digest matrix");
    }
}

export function canonicalCleanProviderBootstrapAuthority() {
    canonicalRegularFile(canonicalCleanProviderBootstrapAuthorityPath, "canonical clean-provider bootstrap authority");
    const source = decodeUtf8Strict(readFileSync(canonicalCleanProviderBootstrapAuthorityPath));
    const manifest = parseJsonStrict(source);
    return {
        path: canonicalCleanProviderBootstrapAuthorityPath,
        file_sha256: sha256(source),
        manifest_hash: manifest.manifest_hash,
    };
}

export function validateCleanProviderBootstrapAuthority(
    binding = canonicalCleanProviderBootstrapAuthority(),
    {
        verificationPath = binding?.path,
        requireCanonicalPath = verificationPath === binding?.path,
        expectedParentSessionId,
        beforeTimestamp,
    } = {},
) {
    if (!binding || typeof binding !== "object" || Array.isArray(binding)) throw new Error("bootstrap-authority binding must be an object");
    exact(Object.keys(binding).sort(), ["file_sha256", "manifest_hash", "path"], "bootstrap-authority binding keys");
    if (!isAbsolute(binding.path) || !digest.test(binding.file_sha256) || !digest.test(binding.manifest_hash)) {
        throw new Error("bootstrap-authority binding is malformed");
    }
    if (requireCanonicalPath && binding.path !== canonicalCleanProviderBootstrapAuthorityPath) {
        throw new Error(`clean-provider bootstrap authority must be ${canonicalCleanProviderBootstrapAuthorityPath}`);
    }
    canonicalRegularFile(verificationPath, "clean-provider bootstrap authority verification path");
    if (requireCanonicalPath && verificationPath !== canonicalCleanProviderBootstrapAuthorityPath) {
        throw new Error(`clean-provider bootstrap verification path must be ${canonicalCleanProviderBootstrapAuthorityPath}`);
    }
    const authoritySource = decodeUtf8Strict(readFileSync(verificationPath));
    if (sha256(authoritySource) !== binding.file_sha256) throw new Error("bootstrap-authority file hash drift");
    const manifest = parseJsonStrict(authoritySource);
    exact(Object.keys(manifest).sort(), ["bootstrap", "calibrated_at", "calibration", "manifest_hash", "purpose", "schema"], "bootstrap-authority manifest keys");
    if (manifest.schema !== "vnext-clean-provider-bootstrap-authority/1" || typeof manifest.purpose !== "string" || manifest.purpose === "") {
        throw new Error("bootstrap-authority schema or purpose is invalid");
    }
    const preimage = structuredClone(manifest);
    delete preimage.manifest_hash;
    const manifestHash = sha256(canonicalize(preimage));
    if (manifest.manifest_hash !== manifestHash || binding.manifest_hash !== manifestHash) {
        throw new Error("bootstrap-authority manifest hash drift");
    }
    validateBootstrapShape(manifest.bootstrap);
    const calibration = manifest.calibration;
    if (!calibration || typeof calibration !== "object" || Array.isArray(calibration)) throw new Error("bootstrap calibration must be an object");
    exact(Object.keys(calibration).sort(), calibrationKeys, "bootstrap calibration keys");
    if (!/^\/root\/[a-z0-9_]+$/.test(calibration.agent_path) || !uuid.test(calibration.session_id)
        || !uuid.test(calibration.parent_session_id) || !Number.isSafeInteger(calibration.prefix_end_line)
        || calibration.prefix_end_line !== 8 || !digest.test(calibration.prefix_sha256)) {
        throw new Error("bootstrap calibration identity is malformed");
    }
    const sessionRoot = realpathSync(resolve(userInfo().homedir, ".codex", "sessions"));
    if (!isAbsolute(calibration.session_jsonl) || !contained(sessionRoot, calibration.session_jsonl)
        || !calibration.session_jsonl.includes(calibration.session_id) || !calibration.session_jsonl.endsWith(".jsonl")) {
        throw new Error("bootstrap calibration session path escapes the trusted session store");
    }
    canonicalRegularFile(calibration.session_jsonl, "bootstrap calibration session");
    const { records, prefix } = parseJsonLines(decodeUtf8Strict(readFileSync(calibration.session_jsonl)), calibration.prefix_end_line);
    if (sha256(prefix) !== calibration.prefix_sha256) throw new Error("bootstrap calibration prefix hash drift");
    const expectedOrder = [
        ["session_meta", null, null],
        ["event_msg", "task_started", null],
        ["response_item", "message", "developer"],
        ["response_item", "message", "developer"],
        ["response_item", "message", "developer"],
        ["response_item", "message", "user"],
        ["world_state", null, null],
        ["turn_context", null, null],
    ];
    exact(records.map(({ value }) => [value.type, value.payload?.type ?? null, value.payload?.role ?? null]), expectedOrder, "bootstrap calibration prefix grammar");
    const meta = records[0].value.payload;
    if (meta?.id !== calibration.session_id || meta?.session_id !== calibration.parent_session_id
        || meta?.parent_thread_id !== calibration.parent_session_id || meta?.agent_path !== calibration.agent_path) {
        throw new Error("bootstrap calibration session identity drift");
    }
    if (expectedParentSessionId !== undefined && calibration.parent_session_id !== expectedParentSessionId) {
        throw new Error("bootstrap calibration does not descend from the clean-pass coordinator");
    }
    const calibratedAt = records.at(-1)?.value?.timestamp;
    if (manifest.calibrated_at !== calibratedAt || !Number.isFinite(Date.parse(calibratedAt))) {
        throw new Error("bootstrap calibrated_at does not bind the terminal calibration prefix record");
    }
    if (beforeTimestamp !== undefined && !(Date.parse(calibratedAt) < Date.parse(beforeTimestamp))) {
        throw new Error("bootstrap calibration was not frozen before clean-pass custody began");
    }
    const observedProjection = cleanProviderBootstrapProjection(records);
    if (canonicalize(observedProjection) !== canonicalize(manifest.bootstrap)) {
        throw new Error("bootstrap projection differs from the pinned calibration transcript");
    }
    return { binding, manifest, bootstrap: manifest.bootstrap, calibrated_at: calibratedAt };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
    try {
        if (process.argv.length !== 2) throw new Error("usage: node clean-provider-bootstrap-authority.mjs");
        const result = validateCleanProviderBootstrapAuthority();
        process.stdout.write(`${JSON.stringify({
            schema: result.manifest.schema,
            calibrated_at: result.calibrated_at,
            calibration_session_id: result.manifest.calibration.session_id,
            manifest_hash: result.manifest.manifest_hash,
        }, null, 2)}\n`);
    } catch (error) {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
    }
}
