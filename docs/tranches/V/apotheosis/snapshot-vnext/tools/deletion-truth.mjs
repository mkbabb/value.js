#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    existsSync,
    lstatSync,
    readFileSync,
    realpathSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, join, posix, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { compareCanonicalText, canonicalize, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";

const toolPath = fileURLToPath(import.meta.url);
const trancheRoot = resolve(dirname(toolPath), "..");
const snapshotSchemaPath = resolve(trancheRoot, "git-tree-snapshot.schema.json");
const receiptSchemaPath = resolve(trancheRoot, "deletion-delta-receipt.schema.json");
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const toolSha256 = () => sha256(readFileSync(toolPath));
const utf8Decoder = new TextDecoder("utf-8", { fatal: true });

function die(message) {
    throw new Error(message);
}

function readStrict(path, label) {
    if (!existsSync(path)) die(`${label} does not exist: ${path}`);
    if (path !== resolve(path)) die(`${label} path is not canonical: ${path}`);
    const metadata = lstatSync(path);
    if (metadata.isSymbolicLink()) die(`${label} must not be a symlink: ${path}`);
    if (!metadata.isFile()) die(`${label} is not a regular file: ${path}`);
    if (realpathSync(path) !== path) die(`${label} path does not equal its canonical realpath: ${path}`);
    const source = decodeUtf8Strict(readFileSync(path));
    try {
        return { path, source, value: parseJsonStrict(source) };
    } catch (error) {
        die(`${label} is not strict JSON: ${error.message}`);
    }
}

function parseFlags(args, allowed, required) {
    const values = {};
    for (let index = 0; index < args.length; index += 1) {
        const flag = args[index];
        if (!allowed.has(flag)) die(`unknown argument ${flag}`);
        const value = args[index + 1];
        if (!value || value.startsWith("--")) die(`${flag} requires a value`);
        if (values[flag]) die(`${flag} may appear only once`);
        values[flag] = value;
        index += 1;
    }
    for (const flag of required) if (!values[flag]) die(`${flag} is required`);
    return values;
}

function parseArguments(argv) {
    const command = argv[0];
    if (command === "snapshot") {
        const flags = parseFlags(argv.slice(1), new Set(["--phase", "--repository", "--output"]), ["--phase", "--repository", "--output"]);
        if (flags["--phase"] !== "before" && flags["--phase"] !== "after") die("--phase must be before or after");
        return {
            command,
            phase: flags["--phase"],
            repository: resolve(flags["--repository"]),
            output: resolve(flags["--output"]),
        };
    }
    if (command === "delta") {
        const flags = parseFlags(argv.slice(1), new Set(["--before", "--after", "--output"]), ["--before", "--after", "--output"]);
        return {
            command,
            before: resolve(flags["--before"]),
            after: resolve(flags["--after"]),
            output: resolve(flags["--output"]),
        };
    }
    if (command === "verify") {
        const flags = parseFlags(argv.slice(1), new Set(["--receipt"]), ["--receipt"]);
        return { command, receipt: resolve(flags["--receipt"]) };
    }
    die("usage: deletion-truth.mjs snapshot --phase <before|after> --repository <repo> --output <json> | delta --before <json> --after <json> --output <json> | verify --receipt <json>");
}

function git(repository, args, context, allowFailure = false) {
    const result = spawnSync("git", ["-C", repository, ...args], {
        encoding: null,
        maxBuffer: 256 * 1024 * 1024,
    });
    if (result.error) die(`${context}: could not execute git: ${result.error.message}`);
    if (result.status !== 0) {
        if (allowFailure) return null;
        die(`${context}: git ${args.join(" ")} failed: ${result.stderr.toString("utf8").trim()}`);
    }
    return result.stdout;
}

function nulStrings(buffer) {
    try {
        return utf8Decoder.decode(buffer).split("\0").filter(Boolean);
    } catch {
        die("Git emitted a non-UTF-8 path; canonical deletion receipts require lossless UTF-8 paths");
    }
}

function within(base, candidate) {
    const offset = relative(base, candidate);
    return offset === "" || (!offset.startsWith("..") && !isAbsolute(offset));
}

function validateRelativePath(path, context) {
    if (!path || path.includes("\0") || path.includes("\\") || path.startsWith("/") || posix.normalize(path) !== path) {
        die(`${context} contains unsafe path ${JSON.stringify(path)}`);
    }
    const segments = path.split("/");
    if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
        die(`${context} contains traversal path ${JSON.stringify(path)}`);
    }
}

function assertSortedUnique(values, context) {
    const sorted = [...values].sort(compareCanonicalText);
    if (canonicalize(values) !== canonicalize(sorted)) die(`${context} must use canonical text order`);
    if (new Set(values).size !== values.length) die(`${context} contains a duplicate path`);
}

function canonicalRepository(path) {
    if (!existsSync(path) || !statSync(path).isDirectory()) die(`repository is not a directory: ${path}`);
    const canonical = realpathSync(path);
    if (canonical !== path) die(`repository path must already be canonical and may not be a symlink: ${path} -> ${canonical}`);
    const top = realpathSync(git(canonical, ["rev-parse", "--show-toplevel"], "Git root").toString("utf8").trim());
    if (top !== canonical) die(`repository path must be the Git root exactly: ${canonical}; observed ${top}`);
    return canonical;
}

function fileRecord(repository, relativePath) {
    validateRelativePath(relativePath, "Git file inventory");
    const path = join(repository, relativePath);
    if (!existsSync(path)) return null;
    const metadata = lstatSync(path);
    if (metadata.isSymbolicLink()) die(`Git inventory contains forbidden symlink ${relativePath}`);
    if (!metadata.isFile()) die(`Git inventory contains non-file ${relativePath}`);
    const canonical = realpathSync(path);
    if (!within(repository, canonical)) die(`Git inventory path escapes repository ${relativePath} -> ${canonical}`);
    const contents = readFileSync(path);
    return {
        path: relativePath,
        mode: metadata.mode & 0o111 ? "100755" : "100644",
        bytes: contents.length,
        sha256: sha256(contents),
    };
}

function repositoryIdentity(repository) {
    const branchBuffer = git(repository, ["symbolic-ref", "--quiet", "--short", "HEAD"], "Git branch", true);
    if (!branchBuffer) die("detached HEAD cannot anchor a deletion snapshot");
    const status = git(repository, ["status", "--porcelain=v2", "-z", "--untracked-files=all"], "Git status");
    return {
        path: repository,
        canonical_realpath: repository,
        branch: branchBuffer.toString("utf8").trim(),
        head: git(repository, ["rev-parse", "HEAD"], "Git HEAD").toString("utf8").trim(),
        status_sha256: sha256(status),
        status_clean: status.length === 0,
    };
}

function workingFiles(repository) {
    const paths = nulStrings(git(repository, ["ls-files", "-co", "--exclude-standard", "-z"], "Git tracked/untracked census"));
    if (new Set(paths).size !== paths.length) die("git ls-files returned a duplicate tracked/untracked path");
    const records = paths.map((path) => fileRecord(repository, path)).filter(Boolean).sort((left, right) => compareCanonicalText(left.path, right.path));
    assertSortedUnique(records.map((item) => item.path), "working-tree files");
    return records;
}

function headFiles(repository, head) {
    const records = [];
    for (const row of nulStrings(git(repository, ["ls-tree", "-r", "-z", "--full-tree", head], "Git HEAD tree"))) {
        const separator = row.indexOf("\t");
        if (separator < 0) die("Git HEAD tree emitted a malformed row");
        const metadata = row.slice(0, separator).split(" ");
        const path = row.slice(separator + 1);
        validateRelativePath(path, "Git HEAD tree");
        const [mode, type, object] = metadata;
        if (mode === "120000") die(`Git HEAD contains forbidden symlink ${path}`);
        if (type !== "blob" || (mode !== "100644" && mode !== "100755")) {
            die(`Git HEAD contains unsupported ${mode} ${type} entry ${path}`);
        }
        const contents = git(repository, ["cat-file", "blob", object], `Git HEAD blob ${path}`);
        records.push({ path, mode, bytes: contents.length, sha256: sha256(contents) });
    }
    records.sort((left, right) => compareCanonicalText(left.path, right.path));
    assertSortedUnique(records.map((item) => item.path), "Git HEAD files");
    return records;
}

function measuredSnapshot(repository, phase) {
    const canonical = canonicalRepository(repository);
    const identity = repositoryIdentity(canonical);
    const files = workingFiles(canonical);
    return {
        schema: "vnext-git-tree-snapshot/1",
        phase,
        captured_at: new Date().toISOString(),
        tool_sha256: toolSha256(),
        repository: identity,
        files,
        files_sha256: sha256(canonicalize(files)),
        snapshot_hash: "",
    };
}

function snapshotPreimage(snapshot) {
    const preimage = structuredClone(snapshot);
    delete preimage.snapshot_hash;
    return preimage;
}

function finalizeSnapshot(snapshot) {
    snapshot.snapshot_hash = sha256(canonicalize(snapshotPreimage(snapshot)));
    return snapshot;
}

function ensureOutput(path, repository = undefined) {
    if (existsSync(path)) die(`refusing to overwrite output ${path}`);
    if (!existsSync(dirname(path)) || !statSync(dirname(path)).isDirectory()) die(`output parent is not a directory: ${dirname(path)}`);
    if (realpathSync(dirname(path)) !== dirname(path)) die(`output parent must not be a symlink: ${dirname(path)}`);
    if (repository && within(repository, path)) die(`snapshot/receipt output must be outside the measured repository: ${path}`);
}

function validateSchema(value, schemaRecord, context) {
    const errors = validateJsonSchema(value, schemaRecord.value);
    if (errors.length) die(`${context} schema failure:\n${errors.join("\n")}`);
}

function readSnapshot(path, schemaRecord, expectedPhase) {
    const record = readStrict(path, `${expectedPhase} snapshot`);
    validateSchema(record.value, schemaRecord, `${expectedPhase} snapshot`);
    if (record.source !== `${canonicalize(record.value)}\n`) die(`${expectedPhase} snapshot is not exact JCS plus newline`);
    const snapshot = record.value;
    if (snapshot.phase !== expectedPhase) die(`${path} is phase ${snapshot.phase}; expected ${expectedPhase}`);
    if (snapshot.tool_sha256 !== toolSha256()) die(`${expectedPhase} snapshot tool hash does not match the executing deletion tool`);
    const filesHash = sha256(canonicalize(snapshot.files));
    if (snapshot.files_sha256 !== filesHash) die(`${expectedPhase} snapshot files hash ${snapshot.files_sha256}; expected ${filesHash}`);
    const selfHash = sha256(canonicalize(snapshotPreimage(snapshot)));
    if (snapshot.snapshot_hash !== selfHash) die(`${expectedPhase} snapshot self-hash ${snapshot.snapshot_hash}; expected ${selfHash}`);
    assertSortedUnique(snapshot.files.map((item) => item.path), `${expectedPhase} snapshot files`);
    for (const item of snapshot.files) validateRelativePath(item.path, `${expectedPhase} snapshot`);
    return { ...record, file_sha256: sha256(record.source) };
}

function comparableSnapshot(snapshot) {
    return {
        repository: snapshot.repository,
        files: snapshot.files,
        files_sha256: snapshot.files_sha256,
    };
}

function assertLiveAfter(after, context) {
    const measured = measuredSnapshot(after.repository.canonical_realpath, "after");
    if (canonicalize(comparableSnapshot(measured)) !== canonicalize(comparableSnapshot(after))) {
        die(`${context}: after-state drifted from its frozen snapshot`);
    }
}

function computeDelta(beforeRecord, afterRecord, snapshotSchemaRecord, receiptSchemaRecord, { requireLiveAfter = true } = {}) {
    const before = beforeRecord.value;
    const after = afterRecord.value;
    if (!before.repository.status_clean || !after.repository.status_clean) die("before and after snapshots must be clean Git working trees");
    if (Date.parse(after.captured_at) < Date.parse(before.captured_at)) die("after snapshot predates before snapshot");
    for (const field of ["canonical_realpath", "branch"]) {
        if (before.repository[field] !== after.repository[field]) die(`before/after repository ${field} changed`);
    }
    const repository = canonicalRepository(before.repository.canonical_realpath);
    const liveIdentity = repositoryIdentity(repository);
    for (const field of ["canonical_realpath", "branch"]) {
        if (liveIdentity[field] !== after.repository[field]) die(`live repository ${field} changed after the after snapshot`);
    }
    if (!liveIdentity.status_clean) die("live repository drifted dirty after the clean after snapshot");
    if (requireLiveAfter && liveIdentity.head !== after.repository.head) die("live repository head changed after the after snapshot");
    if (!requireLiveAfter && !git(repository, ["merge-base", "--is-ancestor", after.repository.head, liveIdentity.head], "live descendant ancestry", true)) {
        die("live repository HEAD is not a descendant of the historical after snapshot");
    }
    if (!git(repository, ["merge-base", "--is-ancestor", before.repository.head, after.repository.head], "snapshot ancestry", true)) {
        die("before snapshot HEAD is not an ancestor of after snapshot HEAD");
    }
    const beforeTree = headFiles(repository, before.repository.head);
    const afterTree = headFiles(repository, after.repository.head);
    if (canonicalize(beforeTree) !== canonicalize(before.files)) die("before snapshot changed or does not equal its clean Git tree");
    if (canonicalize(afterTree) !== canonicalize(after.files)) die("after snapshot changed or does not equal its clean Git tree");
    if (requireLiveAfter) assertLiveAfter(after, "delta preflight");

    const beforeByPath = new Map(before.files.map((item) => [item.path, item]));
    const afterByPath = new Map(after.files.map((item) => [item.path, item]));
    const deletedPaths = before.files.filter((item) => !afterByPath.has(item.path)).map((item) => item.path);
    const addedPaths = after.files.filter((item) => !beforeByPath.has(item.path)).map((item) => item.path);
    const modifiedPaths = before.files
        .filter((item) => afterByPath.has(item.path) && canonicalize(item) !== canonicalize(afterByPath.get(item.path)))
        .map((item) => item.path);
    const unchangedPaths = before.files
        .filter((item) => afterByPath.has(item.path) && canonicalize(item) === canonicalize(afterByPath.get(item.path)))
        .map((item) => item.path);
    for (const [name, values] of Object.entries({ deletedPaths, addedPaths, modifiedPaths, unchangedPaths })) {
        assertSortedUnique(values, name);
    }
    const deltaVector = {
        deleted_paths: deletedPaths,
        added_paths: addedPaths,
        modified_paths: modifiedPaths,
        unchanged_paths: unchangedPaths,
    };
    const staticReceipt = {
        tool_sha256: toolSha256(),
        snapshot_schema_sha256: sha256(snapshotSchemaRecord.source),
        receipt_schema_sha256: sha256(receiptSchemaRecord.source),
        repository: {
            canonical_realpath: repository,
            branch: before.repository.branch,
            before_head: before.repository.head,
            after_head: after.repository.head,
            before_tree_sha256: sha256(canonicalize(beforeTree)),
            after_tree_sha256: sha256(canonicalize(afterTree)),
            before_status_sha256: before.repository.status_sha256,
            after_status_sha256: after.repository.status_sha256,
        },
        before: {
            path: beforeRecord.path,
            file_sha256: beforeRecord.file_sha256,
            snapshot_hash: before.snapshot_hash,
            files_sha256: before.files_sha256,
            captured_at: before.captured_at,
        },
        after: {
            path: afterRecord.path,
            file_sha256: afterRecord.file_sha256,
            snapshot_hash: after.snapshot_hash,
            files_sha256: after.files_sha256,
            captured_at: after.captured_at,
        },
        counts: {
            before: before.files.length,
            after: after.files.length,
            deleted: deletedPaths.length,
            added: addedPaths.length,
            modified: modifiedPaths.length,
            unchanged: unchangedPaths.length,
        },
        ...deltaVector,
        delta_sha256: sha256(canonicalize(deltaVector)),
    };
    if (requireLiveAfter) assertLiveAfter(after, "delta finalization");
    return staticReceipt;
}

function receiptPreimage(receipt) {
    const preimage = structuredClone(receipt);
    delete preimage.receipt_hash;
    return preimage;
}

function deltaCommand(paths, snapshotSchemaRecord, receiptSchemaRecord) {
    const before = readSnapshot(paths.before, snapshotSchemaRecord, "before");
    const after = readSnapshot(paths.after, snapshotSchemaRecord, "after");
    const staticReceipt = computeDelta(before, after, snapshotSchemaRecord, receiptSchemaRecord);
    ensureOutput(paths.output, staticReceipt.repository.canonical_realpath);
    const receipt = {
        schema: "vnext-deletion-delta-receipt/1",
        generated_at: new Date().toISOString(),
        ...staticReceipt,
        receipt_hash: "",
    };
    receipt.receipt_hash = sha256(canonicalize(receiptPreimage(receipt)));
    validateSchema(receipt, receiptSchemaRecord, "deletion delta receipt");
    assertLiveAfter(after.value, "receipt write");
    writeFileSync(paths.output, `${canonicalize(receipt)}\n`);
    process.stdout.write(`${canonicalize({
        schema: receipt.schema,
        receipt: paths.output,
        receipt_hash: receipt.receipt_hash,
        deleted: receipt.counts.deleted,
        added: receipt.counts.added,
        modified: receipt.counts.modified,
    })}\n`);
}

export function validateDeletionTruthReceipt(path, { requireLiveAfter = true } = {}) {
    const snapshotSchemaRecord = readStrict(snapshotSchemaPath, "snapshot schema");
    const receiptSchemaRecord = readStrict(receiptSchemaPath, "receipt schema");
    const record = readStrict(path, "deletion delta receipt");
    validateSchema(record.value, receiptSchemaRecord, "deletion delta receipt");
    if (record.source !== `${canonicalize(record.value)}\n`) die("deletion delta receipt is not exact JCS plus newline");
    const receipt = record.value;
    if (Date.parse(receipt.generated_at) < Date.parse(receipt.after.captured_at)) die("receipt predates its after snapshot");
    if (receipt.tool_sha256 !== toolSha256()) die("receipt tool hash does not match the executing deletion tool");
    if (receipt.snapshot_schema_sha256 !== sha256(snapshotSchemaRecord.source)) die("receipt snapshot schema hash is stale");
    if (receipt.receipt_schema_sha256 !== sha256(receiptSchemaRecord.source)) die("receipt schema hash is stale");
    const selfHash = sha256(canonicalize(receiptPreimage(receipt)));
    if (receipt.receipt_hash !== selfHash) die(`receipt self-hash ${receipt.receipt_hash}; expected ${selfHash}`);
    const before = readSnapshot(receipt.before.path, snapshotSchemaRecord, "before");
    const after = readSnapshot(receipt.after.path, snapshotSchemaRecord, "after");
    const expected = computeDelta(before, after, snapshotSchemaRecord, receiptSchemaRecord, { requireLiveAfter });
    for (const [key, value] of Object.entries(expected)) {
        if (canonicalize(receipt[key]) !== canonicalize(value)) die(`receipt ${key} does not equal the executable Git delta`);
    }
    return {
        receipt,
        file_sha256: sha256(record.source),
        snapshot_schema_sha256: sha256(snapshotSchemaRecord.source),
        receipt_schema_sha256: sha256(receiptSchemaRecord.source),
        tool_sha256: toolSha256(),
    };
}

function verifyCommand(path) {
    const verified = validateDeletionTruthReceipt(path);
    const { receipt } = verified;
    process.stdout.write(`${canonicalize({
        schema: "vnext-deletion-delta-verification/1",
        receipt: path,
        file_sha256: verified.file_sha256,
        receipt_hash: receipt.receipt_hash,
        deleted: receipt.counts.deleted,
        valid: true,
    })}\n`);
}

function snapshotCommand(paths, snapshotSchemaRecord) {
    const repository = canonicalRepository(paths.repository);
    ensureOutput(paths.output, repository);
    const snapshot = measuredSnapshot(repository, paths.phase);
    if (!snapshot.repository.status_clean) die(`${paths.phase} snapshot requires a clean Git working tree`);
    const baseline = headFiles(repository, snapshot.repository.head);
    if (canonicalize(baseline) !== canonicalize(snapshot.files)) die(`clean ${paths.phase} working tree does not equal HEAD bytes exactly`);
    finalizeSnapshot(snapshot);
    validateSchema(snapshot, snapshotSchemaRecord, `${paths.phase} snapshot`);
    const second = measuredSnapshot(repository, paths.phase);
    if (canonicalize(comparableSnapshot(second)) !== canonicalize(comparableSnapshot(snapshot))) {
        die(`${paths.phase} working tree drifted while its snapshot was being captured`);
    }
    writeFileSync(paths.output, `${canonicalize(snapshot)}\n`);
    process.stdout.write(`${canonicalize({
        schema: snapshot.schema,
        phase: snapshot.phase,
        snapshot: paths.output,
        snapshot_hash: snapshot.snapshot_hash,
        files: snapshot.files.length,
        clean: snapshot.repository.status_clean,
    })}\n`);
}

function main() {
    const paths = parseArguments(process.argv.slice(2));
    const snapshotSchemaRecord = readStrict(snapshotSchemaPath, "snapshot schema");
    const receiptSchemaRecord = readStrict(receiptSchemaPath, "receipt schema");
    if (paths.command === "snapshot") snapshotCommand(paths, snapshotSchemaRecord);
    else if (paths.command === "delta") deltaCommand(paths, snapshotSchemaRecord, receiptSchemaRecord);
    else verifyCommand(paths.receipt);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
    try {
        main();
    } catch (error) {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
    }
}
