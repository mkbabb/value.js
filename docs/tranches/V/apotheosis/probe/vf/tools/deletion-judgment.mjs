#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    existsSync,
    lstatSync,
    mkdtempSync,
    readFileSync,
    realpathSync,
    rmSync,
    statSync,
} from "node:fs";
import { isAbsolute, join, posix, relative, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

import {
    consumerUniverseAnnexProjection,
    consumerUniverseDelta,
    consumerUniverseImmutableBindingProjection,
    validateConsumerUniverseReceipt,
} from "./consumer-universe-return.mjs";
import { validateDeletionTruthReceipt } from "./deletion-truth.mjs";
import { compareCanonicalText, canonicalize, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";
import { loadWaveEdgePolicy, requireWaveOutcome } from "./wave-edge-policy.mjs";

const toolPath = fileURLToPath(import.meta.url);
const trancheRoot = resolve(new URL("..", import.meta.url).pathname);
const schemaPath = resolve(trancheRoot, "deletion-judgment.schema.json");
const resolverPath = resolve(trancheRoot, "tools/resolve-consumer-universe.mjs");
const defaultReturnValidatorPath = resolve(trancheRoot, "tools/validate-return.mjs");
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const residueCategories = ["consumers", "declarations", "documentation", "manifests-exports", "packed-artifacts", "source"];
const waveContracts = loadWaveContracts();
const waveEdgePolicy = loadWaveEdgePolicy(trancheRoot, waveContracts);

function die(message) {
    throw new Error(message);
}

function requireCanonicalFile(path, label) {
    if (!isAbsolute(path) || !existsSync(path)) die(`${label} must be an existing absolute file: ${path}`);
    const metadata = lstatSync(path);
    if (metadata.isSymbolicLink() || !metadata.isFile()) die(`${label} must be a regular non-symlink file: ${path}`);
    if (realpathSync(path) !== path) die(`${label} must use canonical realpath ${realpathSync(path)}`);
}

function readStrict(path, label, { requireJcs = false } = {}) {
    requireCanonicalFile(path, label);
    const source = decodeUtf8Strict(readFileSync(path));
    let value;
    try {
        value = parseJsonStrict(source);
    } catch (error) {
        die(`${label} is not strict JSON: ${error.message}`);
    }
    if (requireJcs && source !== `${canonicalize(value)}\n`) die(`${label} must be exact JCS plus newline`);
    return { path, source, value, file_sha256: sha256(source) };
}

function verifyEvidence(evidence, context) {
    const seen = new Set();
    for (const [index, item] of evidence.entries()) {
        requireCanonicalFile(item.path, `${context} evidence ${index + 1}`);
        const actual = sha256(readFileSync(item.path));
        if (actual !== item.sha256) die(`${context} evidence ${index + 1} hash ${actual}; expected ${item.sha256}`);
        const key = `${item.path}\0${item.sha256}`;
        if (seen.has(key)) die(`${context} repeats evidence ${item.path}`);
        seen.add(key);
    }
}

function runGit(repository, args, context, allowFailure = false) {
    const result = spawnSync("git", ["-C", repository, ...args], { encoding: null, maxBuffer: 256 * 1024 * 1024 });
    if (result.error) die(`${context}: ${result.error.message}`);
    if (result.status !== 0) {
        if (allowFailure) return null;
        die(`${context}: git ${args.join(" ")} failed: ${result.stderr.toString("utf8").trim()}`);
    }
    return result.stdout;
}

function waveIsAncestor(ancestor, descendant) {
    if (ancestor === descendant) return false;
    const seen = new Set();
    const walk = (waveId) => {
        if (waveId === ancestor) return true;
        if (seen.has(waveId)) return false;
        seen.add(waveId);
        return (waveContracts.get(waveId)?.contract.dependencies ?? []).some(walk);
    };
    return walk(descendant);
}

function validateRelativePath(path, context) {
    if (!path || path.includes("\\") || path.startsWith("/") || posix.normalize(path) !== path || path.split("/").some((part) => !part || part === "." || part === "..")) {
        die(`${context} contains unsafe relative path ${JSON.stringify(path)}`);
    }
}

function refKey(item) {
    return `${item.root_id}\0${item.path}`;
}

function effectKey(item) {
    return `${item.root_id}\0${item.path}\0${item.truth_receipt_hash}`;
}

function exactSorted(values, key, context) {
    const keys = values.map(key);
    if (new Set(keys).size !== keys.length) die(`${context} contains a duplicate semantic row`);
    const expected = [...keys].sort(compareCanonicalText);
    if (canonicalize(keys) !== canonicalize(expected)) die(`${context} must be sorted canonically`);
}

function validateReturnBinding(binding, returnValidatorPath, { returnValidationChain, returnValidatorArgs }) {
    requireCanonicalFile(returnValidatorPath, "universal return validator");
    const live = spawnSync(process.execPath, [returnValidatorPath, binding.path, ...returnValidatorArgs], {
        encoding: "utf8",
        env: { ...process.env, VNEXT_RETURN_VALIDATION_CHAIN: JSON.stringify(returnValidationChain) },
        maxBuffer: 256 * 1024 * 1024,
    });
    if (live.status !== 0) die(`return ${binding.wave_id} failed universal live validation: ${(live.stderr || live.error?.message || "unknown failure").trim()}`);
    const record = readStrict(binding.path, `return ${binding.wave_id}`);
    if (record.file_sha256 !== binding.file_sha256) die(`return ${binding.wave_id} file hash drift`);
    const value = record.value;
    if (value.wave_id !== binding.wave_id || value.status !== binding.status) die(`return ${binding.wave_id} does not equal its bound owner identity`);
    const outcome = requireWaveOutcome(waveEdgePolicy, binding.wave_id);
    if (!outcome.advancing_statuses.includes(value.status)) {
        die(`return ${binding.wave_id} status ${value.status} does not advance its ${outcome.outcome_class} outcome; expected ${outcome.advancing_statuses.join(" or ")}`);
    }
    const preimage = structuredClone(value);
    delete preimage.return_hash;
    const computed = sha256(canonicalize(preimage));
    if (value.return_hash !== computed || binding.return_hash !== computed) die(`return ${binding.wave_id} self-hash drift`);
    return value;
}

function boundDeletionJudgment(returnRecord, context) {
    const binding = returnRecord.annexes?.["deletion-judgment"];
    if (!binding || binding.schema !== "vnext-deletion-judgment-return-annex/1") die(`${context} lacks a typed deletion-judgment annex binding`);
    const record = readStrict(binding.path, `${context} deletion judgment`, { requireJcs: true });
    if (binding.wave_id !== returnRecord.wave_id || record.value.wave_id !== returnRecord.wave_id || binding.phase !== record.value.phase) {
        die(`${context} deletion-judgment binding has the wrong wave or phase`);
    }
    if (binding.file_sha256 !== record.file_sha256) die(`${context} deletion-judgment file hash drift`);
    const annexHash = sha256(canonicalize(annexPreimage(record.value)));
    if (binding.annex_hash !== annexHash || record.value.annex_hash !== annexHash) die(`${context} deletion-judgment annex hash drift`);
    return record.value;
}

function rerunConsumerResolver(verified, receiptValidationOptions) {
    const fixture = realpathSync(mkdtempSync(resolve(tmpdir(), "vnext-deletion-consumer-")));
    try {
        const output = resolve(fixture, "receipt.json");
        const result = spawnSync(process.execPath, [resolverPath, "--input", verified.receipt.input.path, "--output", output], {
            encoding: "utf8",
            maxBuffer: 256 * 1024 * 1024,
        });
        if (result.status !== 0) die(`live pre-cut consumer resolver failed: ${(result.stderr || result.error?.message || "unknown failure").trim()}`);
        const live = validateConsumerUniverseReceipt(output, {
            ...receiptValidationOptions,
            validationMode: "live",
        });
        for (const member of ["roots", "edges"]) {
            if (canonicalize(live.receipt[member]) !== canonicalize(verified.receipt[member])) {
                die(`live pre-cut consumer ${member} differ from the frozen decision scan`);
            }
        }
    } finally {
        rmSync(fixture, { recursive: true, force: true });
    }
}

function scanRoot(root, patterns, ignoredDirectoryNames) {
    const repository = root.canonical_realpath;
    if (!existsSync(repository) || !statSync(repository).isDirectory() || realpathSync(repository) !== repository) {
        die(`included consumer root is unavailable or noncanonical: ${root.id}`);
    }
    const top = realpathSync(runGit(repository, ["rev-parse", "--show-toplevel"], `consumer root ${root.id}`).toString("utf8").trim());
    if (top !== repository) die(`consumer root ${root.id} is not its Git root`);
    const paths = runGit(repository, ["ls-files", "-co", "--exclude-standard", "-z"], `consumer scan ${root.id}`)
        .toString("utf8").split("\0").filter(Boolean);
    if (new Set(paths).size !== paths.length) die(`consumer scan ${root.id} returned duplicate paths`);
    const hits = [];
    for (const path of paths.sort(compareCanonicalText)) {
        validateRelativePath(path, `consumer scan ${root.id}`);
        if (path.split("/").some((part) => ignoredDirectoryNames.has(part))) continue;
        const absolute = join(repository, path);
        if (!existsSync(absolute)) continue;
        const metadata = lstatSync(absolute);
        if (metadata.isSymbolicLink()) die(`consumer scan ${root.id} encountered symlink ${path}`);
        if (!metadata.isFile()) die(`consumer scan ${root.id} encountered non-file ${path}`);
        if (metadata.size > 32 * 1024 * 1024) die(`consumer scan ${root.id} file exceeds 32 MiB: ${path}`);
        const contents = readFileSync(absolute);
        const fileHash = sha256(contents);
        for (const pattern of patterns) {
            const needle = Buffer.from(pattern, "utf8");
            let offset = contents.indexOf(needle);
            const lines = new Set();
            while (offset >= 0) {
                lines.add(1 + contents.subarray(0, offset).reduce((total, byte) => total + (byte === 10 ? 1 : 0), 0));
                offset = contents.indexOf(needle, offset + Math.max(1, needle.length));
            }
            for (const line of [...lines].sort((left, right) => left - right)) {
                hits.push({ root_id: root.id, path, pattern, line, file_sha256: fileHash });
            }
        }
    }
    return hits;
}

export function liveCasualtyHits(receipt, patterns, { ignoredDirectoryNames = [] } = {}) {
    const included = receipt.roots.filter(({ status }) => status === "included").sort((left, right) => compareCanonicalText(left.id, right.id));
    const ignored = new Set(ignoredDirectoryNames);
    return included.flatMap((root) => scanRoot(root, patterns, ignored)).sort((left, right) => compareCanonicalText(canonicalize(left), canonicalize(right)));
}

function scanHitCore(hit) {
    return {
        root_id: hit.root_id,
        path: hit.path,
        pattern: hit.pattern,
        line: hit.line,
        file_sha256: hit.file_sha256,
    };
}

function scanHitKey(hit) {
    return canonicalize(scanHitCore(hit));
}

function isCanonicalArchivePath(path) {
    return path.startsWith("docs/tranches/") || path.startsWith("archive/") || path.startsWith("archives/");
}

function decisionCore(decision) {
    const core = structuredClone(decision);
    delete core.origin;
    delete core.decision_hash;
    return core;
}

function expectedDecisionHash(decision) {
    return sha256(canonicalize(decisionCore(decision)));
}

function annexPreimage(annex) {
    const preimage = structuredClone(annex);
    delete preimage.annex_hash;
    return preimage;
}

function resolvedBoundsAuthorityOptions(resolveBoundsAuthority, binding, pins, context, validationMode) {
    if (resolveBoundsAuthority === undefined) return {};
    const resolved = resolveBoundsAuthority(binding, pins, context);
    const expectedKeys = ["allowedAdditionalWorktrees", "verificationPath"];
    if (resolved === null || typeof resolved !== "object" || Array.isArray(resolved)
        || canonicalize(Object.keys(resolved).sort(compareCanonicalText)) !== canonicalize(expectedKeys)) {
        die(`${context}: resolveBoundsAuthority must return exact { verificationPath, allowedAdditionalWorktrees } object`);
    }
    if (typeof resolved.verificationPath !== "string" || resolved.verificationPath.length === 0) {
        die(`${context}: resolveBoundsAuthority verificationPath must be a nonempty string`);
    }
    if (!Array.isArray(resolved.allowedAdditionalWorktrees)
        || resolved.allowedAdditionalWorktrees.some((path) => typeof path !== "string")) {
        die(`${context}: resolveBoundsAuthority allowedAdditionalWorktrees must be a string array`);
    }
    return {
        boundsAuthorityVerificationPath: resolved.verificationPath,
        requireCanonicalBoundsAuthority: false,
        ...(validationMode === "live" ? {
            allowedAdditionalWorktrees: resolved.allowedAdditionalWorktrees,
        } : {}),
    };
}

export function validateDeletionJudgmentRecord(annex, {
    consumerValidationMode = "live",
    rerunConsumer = true,
    returnValidatorPath = defaultReturnValidatorPath,
    returnValidationChain = [],
    returnValidatorArgs = [],
    resolveBoundsAuthority,
    boundsAuthorityPins = [],
    expectedOwnerWaves,
} = {}) {
    if (!Array.isArray(returnValidationChain) || returnValidationChain.some((path) => typeof path !== "string")) die("returnValidationChain must be a path array");
    if (!Array.isArray(returnValidatorArgs) || returnValidatorArgs.some((argument) => typeof argument !== "string")) die("returnValidatorArgs must be a string array");
    if (!["live", "immutable"].includes(consumerValidationMode)) die("consumerValidationMode must be live or immutable");
    if (resolveBoundsAuthority !== undefined && typeof resolveBoundsAuthority !== "function") die("resolveBoundsAuthority must be a function");
    if (!Array.isArray(boundsAuthorityPins)) die("boundsAuthorityPins must be an array");
    const returnValidationOptions = { returnValidationChain, returnValidatorArgs };
    const schemaRecord = readStrict(schemaPath, "deletion judgment schema");
    const schemaErrors = validateJsonSchema(annex, parseJsonStrict(schemaRecord.source));
    if (schemaErrors.length) die(`deletion judgment schema failure:\n${schemaErrors.join("\n")}`);
    const computedAnnexHash = sha256(canonicalize(annexPreimage(annex)));
    if (annex.annex_hash !== computedAnnexHash) die(`deletion judgment annex hash ${annex.annex_hash}; expected ${computedAnnexHash}`);
    if (!waveContracts.has(annex.wave_id)) die(`deletion judgment wave ${annex.wave_id} is absent from the registry`);
    if (annex.phase === "owner-precut" && (annex.wave_id === "C05" || annex.wave_id === "C10")) die("C05 and C10 are aggregate phases, not deletion owners");
    if ((annex.phase === "c05-rehearsal") !== (annex.wave_id === "C05")) die("only C05 may use c05-rehearsal, and C05 must use it");
    if ((annex.phase === "c10-final") !== (annex.wave_id === "C10")) die("only C10 may use c10-final, and C10 must use it");

    const receiptValidationOptions = (binding, pins, context, validationMode, immutableBinding) => ({
        boundsAuthority: binding,
        validationMode,
        ...(immutableBinding === undefined ? {} : { immutableBinding }),
        ...resolvedBoundsAuthorityOptions(resolveBoundsAuthority, binding, pins, context, validationMode),
    });
    const currentImmutableBinding = consumerUniverseImmutableBindingProjection(annex.consumer_scan);
    const consumerOptions = receiptValidationOptions(
        annex.consumer_scan.bounds_authority,
        boundsAuthorityPins,
        `${annex.wave_id} deletion consumer bounds authority`,
        consumerValidationMode,
        consumerValidationMode === "immutable" ? currentImmutableBinding : undefined,
    );
    const consumer = validateConsumerUniverseReceipt(annex.consumer_scan.receipt_path, consumerOptions);
    const verifiedImmutableBinding = consumerUniverseImmutableBindingProjection(
        consumerUniverseAnnexProjection("C00U", annex.consumer_scan.receipt_path, consumer),
    );
    const { schema: immutableBindingSchema, ...verifiedConsumerProjection } = verifiedImmutableBinding;
    const consumerProjection = {
        authority: annex.phase === "c10-final" ? "c10-final" : annex.phase === "c05-rehearsal" ? "c05-rehearsal" : "owner-precut",
        ...verifiedConsumerProjection,
    };
    if (immutableBindingSchema !== "vnext-consumer-universe-immutable-binding/1") die("consumer immutable binding schema drift");
    const returnedConsumerProjection = { ...annex.consumer_scan };
    delete returnedConsumerProjection.c05_return;
    delete returnedConsumerProjection.baseline_deletion_annex_hash;
    delete returnedConsumerProjection.baseline_receipt_hash;
    delete returnedConsumerProjection.baseline_epoch_sha256;
    delete returnedConsumerProjection.root_delta;
    delete returnedConsumerProjection.edge_delta;
    if (canonicalize(returnedConsumerProjection) !== canonicalize(consumerProjection)) die("consumer_scan must exactly project the fresh bounded resolver receipt");
    if (rerunConsumer) {
        if (consumerValidationMode !== "live") die("immutable deletion validation cannot rerun the live consumer resolver");
        rerunConsumerResolver(consumer, consumerOptions);
    }
    const includedRoots = consumer.receipt.roots.filter(({ status }) => status === "included");
    const includedRootIds = includedRoots.map(({ id }) => id).sort(compareCanonicalText);
    const rootsById = new Map(includedRoots.map((root) => [root.id, root]));
    const boundsAuthorityPath = consumerOptions.boundsAuthorityVerificationPath ?? consumer.bounds_authority.path;
    const boundsAuthority = readStrict(boundsAuthorityPath, "consumer-universe bounds authority").value;
    const ignoredDirectoryNames = boundsAuthority.bounds?.ignored_directory_names ?? [];

    if (annex.phase === "c10-final") {
        const c05 = validateReturnBinding(annex.consumer_scan.c05_return, returnValidatorPath, returnValidationOptions);
        if (c05.wave_id !== "C05") die("c10-final consumer scan must bind the exact successful C05 return");
        const c05Annex = boundDeletionJudgment(c05, "C05 return");
        const c05Errors = c05Annex ? validateJsonSchema(c05Annex, parseJsonStrict(schemaRecord.source)) : ["missing C05 deletion-judgment annex"];
        if (c05Errors.length || c05Annex.phase !== "c05-rehearsal" || c05Annex.wave_id !== "C05") {
            die(`c10-final baseline is not the typed C05 deletion rehearsal: ${c05Errors.join("; ")}`);
        }
        const c05Hash = sha256(canonicalize(annexPreimage(c05Annex)));
        if (c05Annex.annex_hash !== c05Hash || annex.consumer_scan.baseline_deletion_annex_hash !== c05Hash) {
            die("c10-final does not bind the exact content-addressed C05 deletion rehearsal");
        }
        for (const field of ["truth_receipts", "delivery_deleted", "disposition_deletions", "ancestor_returns", "decisions"]) {
            if (canonicalize(annex[field]) !== canonicalize(c05Annex[field])) {
                die(`c10-final ${field} does not exactly equal the rehearsed C05 owner union`);
            }
        }
        if (c05Annex.consumer_scan.receipt_hash !== annex.consumer_scan.baseline_receipt_hash
            || c05Annex.consumer_scan.epoch.epoch_sha256 !== annex.consumer_scan.baseline_epoch_sha256) {
            die("c10-final census baseline does not equal the content-addressed C05 deletion rehearsal receipt");
        }
        const c05ImmutableBinding = consumerUniverseImmutableBindingProjection(c05Annex.consumer_scan);
        const baselineOptions = receiptValidationOptions(
            c05Annex.consumer_scan.bounds_authority,
            c05.pins,
            "C05 deletion baseline bounds authority",
            "immutable",
            c05ImmutableBinding,
        );
        const baseline = validateConsumerUniverseReceipt(c05Annex.consumer_scan.receipt_path, baselineOptions);
        const verifiedC05Binding = consumerUniverseImmutableBindingProjection(
            consumerUniverseAnnexProjection("C00U", c05Annex.consumer_scan.receipt_path, baseline),
        );
        const { schema: c05BindingSchema, ...verifiedC05Projection } = verifiedC05Binding;
        const expectedC05Consumer = {
            authority: "c05-rehearsal",
            ...verifiedC05Projection,
        };
        if (c05BindingSchema !== "vnext-consumer-universe-immutable-binding/1") die("C05 consumer immutable binding schema drift");
        if (canonicalize(c05Annex.consumer_scan) !== canonicalize(expectedC05Consumer)) {
            die("content-addressed C05 deletion rehearsal does not exactly project its consumer receipt");
        }
        if (baseline.receipt.receipt_hash === consumer.receipt.receipt_hash || baseline.receipt.epoch.epoch_sha256 === consumer.receipt.epoch.epoch_sha256) {
            die("c10-final must rerun the census rather than copy the C05 receipt or epoch");
        }
        for (const [kind, expected, returned] of [
            ["root", consumerUniverseDelta(baseline.receipt.roots, consumer.receipt.roots), annex.consumer_scan.root_delta],
            ["edge", consumerUniverseDelta(baseline.receipt.edges, consumer.receipt.edges), annex.consumer_scan.edge_delta],
        ]) {
            exactSorted(returned, ({ id }) => id, `c10-final ${kind} delta`);
            const projection = returned.map(({ id, change, before_sha256, after_sha256 }) => ({ id, change, before_sha256, after_sha256 }));
            if (canonicalize(projection) !== canonicalize(expected)) die(`c10-final ${kind} delta is not the exact C05→C10 semantic diff`);
            for (const row of returned) {
                if (!waveContracts.has(row.owner_wave) || !waveIsAncestor(row.owner_wave, "C10")) die(`c10-final ${kind} delta ${row.id} lacks an ancestor owner`);
                verifyEvidence(row.evidence, `c10-final ${kind} delta ${row.id}`);
            }
            if (returned.length !== 0) die(`c10-final ${kind} delta is nonempty and must reopen before release`);
        }
    }

    exactSorted(annex.truth_receipts, (item) => `${item.owner_wave}\0${item.root_id}\0${item.receipt_hash}`, "truth_receipts");
    if (new Set(annex.truth_receipts.map(({ receipt_hash }) => receipt_hash)).size !== annex.truth_receipts.length) die("truth_receipts repeat a physical receipt hash");
    const actualDeleted = [];
    const actualDeletedEffects = [];
    const actualModifiedEffects = [];
    const truthByHash = new Map();
    for (const reference of annex.truth_receipts) {
        const truth = validateDeletionTruthReceipt(reference.path, { requireLiveAfter: false });
        if (truth.file_sha256 !== reference.file_sha256 || truth.receipt.receipt_hash !== reference.receipt_hash) {
            die(`truth receipt ${reference.root_id} hash binding drift`);
        }
        if (truth.receipt.deleted_paths.length === 0 && truth.receipt.modified_paths.length === 0) die(`truth receipt ${reference.root_id} has no deletion or modified-file effect`);
        const root = rootsById.get(reference.root_id);
        if (!root) die(`truth receipt ${reference.root_id} does not join an included consumer-universe root`);
        if (root.canonical_realpath !== truth.receipt.repository.canonical_realpath || root.branch !== truth.receipt.repository.branch) {
            die(`truth receipt ${reference.root_id} repository identity differs from the consumer scan`);
        }
        if (!runGit(root.canonical_realpath, ["merge-base", "--is-ancestor", truth.receipt.repository.after_head, root.head], `truth/consumer ancestry ${reference.root_id}`, true)) {
            die(`truth receipt ${reference.root_id} after HEAD is not an ancestor of the consumer scan HEAD`);
        }
        truthByHash.set(reference.receipt_hash, { reference, truth });
        for (const path of truth.receipt.deleted_paths) {
            actualDeleted.push({ root_id: reference.root_id, path });
            actualDeletedEffects.push({ root_id: reference.root_id, path, truth_receipt_hash: reference.receipt_hash });
        }
        for (const path of truth.receipt.modified_paths) {
            actualModifiedEffects.push({ root_id: reference.root_id, path, truth_receipt_hash: reference.receipt_hash });
        }
    }
    actualDeleted.sort((left, right) => compareCanonicalText(refKey(left), refKey(right)));
    exactSorted(actualDeleted, refKey, "actual deletion receipt union");
    actualDeletedEffects.sort((left, right) => compareCanonicalText(effectKey(left), effectKey(right)));
    actualModifiedEffects.sort((left, right) => compareCanonicalText(effectKey(left), effectKey(right)));
    exactSorted(actualDeletedEffects, effectKey, "actual deleted effect union");
    exactSorted(actualModifiedEffects, effectKey, "actual modified effect union");
    exactSorted(annex.delivery_deleted, refKey, "delivery_deleted");
    if (canonicalize(annex.delivery_deleted) !== canonicalize(actualDeleted)) die("delivery_deleted must equal only the live truth-receipt union");

    exactSorted(annex.ancestor_returns, ({ wave_id }) => wave_id, "ancestor_returns");
    const returnRecords = new Map();
    for (const binding of annex.ancestor_returns) {
        returnRecords.set(binding.wave_id, {
            binding,
            record: validateReturnBinding(binding, returnValidatorPath, returnValidationOptions),
        });
    }

    exactSorted(annex.decisions, ({ decision_id }) => decision_id, "decisions");
    exactSorted(annex.disposition_deletions, ({ decision_id }) => decision_id, "disposition_deletions");
    if (expectedOwnerWaves !== undefined) {
        if (annex.phase !== "c05-rehearsal") die("expectedOwnerWaves is authoritative only for the C05 rehearsal");
        if (!Array.isArray(expectedOwnerWaves) || expectedOwnerWaves.some((waveId) => typeof waveId !== "string")) die("expectedOwnerWaves must be a wave-ID array");
        const expected = [...expectedOwnerWaves];
        if (new Set(expected).size !== expected.length || canonicalize(expected) !== canonicalize([...expected].sort(compareCanonicalText))) {
            die("expectedOwnerWaves must be unique and canonically ordered");
        }
        for (const waveId of expected) if (!waveContracts.has(waveId) || !waveIsAncestor(waveId, "C05")) die(`expected deletion owner ${waveId} is not a C05 ancestor`);
        for (const [label, actual] of [
            ["decision", [...new Set(annex.decisions.map(({ owner_wave }) => owner_wave))].sort(compareCanonicalText)],
            ["truth-receipt", [...new Set(annex.truth_receipts.map(({ owner_wave }) => owner_wave))].sort(compareCanonicalText)],
        ]) {
            if (canonicalize(actual) !== canonicalize(expected)) die(`C05 ${label} owner union is not the exact transitive return-graph deletion-owner set`);
        }
    }
    const dispositionDeletedEffects = [];
    const dispositionModifiedEffects = [];
    const usedTruthReceipts = new Set();
    const usedReturns = new Set();

    for (const { reference } of truthByHash.values()) {
        if (annex.phase === "owner-precut") {
            if (reference.owner_wave !== annex.wave_id) die(`owner-precut truth receipt ${reference.receipt_hash} is not owned by the current wave`);
        } else {
            if (reference.owner_wave === annex.wave_id || !waveIsAncestor(reference.owner_wave, annex.wave_id)) {
                die(`${annex.wave_id} truth receipt ${reference.receipt_hash} has a synthetic or non-ancestor owner`);
            }
            const owner = returnRecords.get(reference.owner_wave);
            if (!owner) die(`${annex.wave_id} truth receipt ${reference.receipt_hash} lacks its successful owner return`);
            const ownerTruth = boundDeletionJudgment(owner.record, `${reference.owner_wave} return`).truth_receipts
                .find(({ receipt_hash }) => receipt_hash === reference.receipt_hash);
            if (!ownerTruth || canonicalize(ownerTruth) !== canonicalize(reference)) die(`${annex.wave_id} truth receipt ${reference.receipt_hash} was not copied from its owner return`);
            usedReturns.add(reference.owner_wave);
        }
    }
    const tombstones = new Set();
    for (const [index, decision] of annex.decisions.entries()) {
        const context = `decision ${decision.decision_id}`;
        if (decision.decision_hash !== expectedDecisionHash(decision)) die(`${context} decision hash drift`);
        exactSorted(decision.file_effects.deleted, effectKey, `${context} deleted effects`);
        exactSorted(decision.file_effects.modified, effectKey, `${context} modified effects`);
        if (decision.file_effects.deleted.length + decision.file_effects.modified.length === 0) die(`${context} has no physical deleted or modified file effect`);
        const disposition = annex.disposition_deletions[index];
        if (disposition?.decision_id !== decision.decision_id || canonicalize(disposition.file_effects) !== canonicalize(decision.file_effects)) {
            die(`${context} does not exactly join its disposition deletion row`);
        }
        for (const effect of decision.file_effects.deleted) {
            dispositionDeletedEffects.push(effect);
            usedTruthReceipts.add(effect.truth_receipt_hash);
        }
        for (const effect of decision.file_effects.modified) {
            if (!actualModifiedEffects.some((actual) => effectKey(actual) === effectKey(effect))) die(`${context} invents modified file effect ${effectKey(effect)}`);
            dispositionModifiedEffects.push(effect);
            usedTruthReceipts.add(effect.truth_receipt_hash);
        }
        verifyEvidence(decision.intrinsic_job.evidence, `${context} intrinsic job`);
        if (decision.judgment === "replaced" && decision.replacement.applicability !== "applicable") die(`${context} replaced judgment lacks a retained replacement`);
        if (decision.judgment === "retired" && decision.replacement.applicability !== "not_applicable") die(`${context} retired judgment lacks typed replacement inapplicability`);
        verifyEvidence(decision.replacement.evidence, `${context} replacement`);

        if (annex.phase === "owner-precut") {
            if (decision.owner_wave !== annex.wave_id || decision.origin.kind !== "current-wave") die(`${context} owner-precut origin must be the current wave`);
        } else {
            if (decision.owner_wave === annex.wave_id || decision.origin.kind !== "ancestor-return") die(`${context} is a synthetic ${annex.wave_id} deletion row`);
            if (!waveIsAncestor(decision.owner_wave, annex.wave_id)) die(`${context} owner is not a ${annex.wave_id} ancestor`);
            const origin = returnRecords.get(decision.owner_wave);
            if (!origin || origin.binding.return_hash !== decision.origin.owner_return_hash) die(`${context} lacks its exact successful ancestor owner return`);
            usedReturns.add(decision.owner_wave);
            const ownerDecision = boundDeletionJudgment(origin.record, `${decision.owner_wave} return`).decisions
                .find(({ decision_id }) => decision_id === decision.decision_id);
            if (!ownerDecision || ownerDecision.decision_hash !== decision.decision_hash || canonicalize(decisionCore(ownerDecision)) !== canonicalize(decisionCore(decision))) {
                die(`${context} was not copied exactly from its originating owner return`);
            }
        }

        if (decision.replacement.applicability === "applicable") {
            const owner = returnRecords.get(decision.replacement.owner_wave);
            if (!owner || owner.binding.return_hash !== decision.replacement.owner_return_hash) die(`${context} replacement lacks its exact successful owner return`);
            if (!waveIsAncestor(decision.replacement.owner_wave, decision.owner_wave)) die(`${context} replacement owner is not a transitive ancestor`);
            usedReturns.add(decision.replacement.owner_wave);
        }

        const patterns = decision.casualty_scan.patterns;
        exactSorted(patterns, (value) => value, `${context} casualty patterns`);
        if (!patterns.includes(decision.tombstone.name)) die(`${context} casualty patterns omit the exact tombstone name`);
        if (annex.phase === "owner-precut" && decision.casualty_scan.consumer_receipt_hash !== consumer.receipt.receipt_hash) {
            die(`${context} owner-precut casualty scan is not bound to the current consumer receipt`);
        }
        const observedHits = liveCasualtyHits(consumer.receipt, patterns, { ignoredDirectoryNames });
        exactSorted(decision.casualty_scan.active_hits, scanHitKey, `${context} active casualty hits`);
        exactSorted(decision.casualty_scan.allowed_hits, scanHitKey, `${context} allowed casualty hits`);
        const allowedKeys = new Set();
        let tombstoneHits = 0;
        for (const allowed of decision.casualty_scan.allowed_hits) {
            const key = scanHitKey(allowed);
            if (!observedHits.some((hit) => scanHitKey(hit) === key)) die(`${context} allowlists a casualty hit not found by the executable scan`);
            allowedKeys.add(key);
            verifyEvidence(allowed.evidence, `${context} allowed ${allowed.classification} hit`);
            const allowedRoot = rootsById.get(allowed.root_id);
            const allowedAbsolute = allowedRoot ? join(allowedRoot.canonical_realpath, allowed.path) : "";
            if (allowed.evidence.length !== 1 || allowed.evidence[0].path !== allowedAbsolute || allowed.evidence[0].sha256 !== allowed.file_sha256) {
                die(`${context} allowed ${allowed.classification} hit lacks exact by-file evidence`);
            }
            if (allowed.classification === "archive") {
                if (!isCanonicalArchivePath(allowed.path)) die(`${context} archive allowlist is outside canonical tranche/archive paths: ${allowed.path}`);
            } else {
                tombstoneHits += 1;
                if (allowed.pattern !== decision.tombstone.name) die(`${context} tombstone allowlist is not the exact tombstone name`);
                if (allowedAbsolute !== decision.tombstone.evidence.path || allowed.file_sha256 !== decision.tombstone.evidence.sha256) {
                    die(`${context} tombstone allowlist does not equal the by-name tombstone evidence`);
                }
            }
        }
        if (tombstoneHits !== 1) die(`${context} requires exactly one current intentional tombstone name hit`);
        const expectedActive = observedHits.filter((hit) => !allowedKeys.has(scanHitKey(hit)));
        if (canonicalize(decision.casualty_scan.active_hits) !== canonicalize(expectedActive)) die(`${context} active full-universe casualty hits drift`);
        if (expectedActive.length !== 0) die(`${context} has unmigrated active/runtime/declaration/manifest/current-doc consumer hits`);
        exactSorted(decision.casualty_scan.roots, ({ root_id }) => root_id, `${context} casualty roots`);
        if (canonicalize(decision.casualty_scan.roots.map(({ root_id }) => root_id)) !== canonicalize(includedRootIds)) {
            die(`${context} casualty scan does not disposition every included consumer root exactly once`);
        }
        const casualtyIds = new Set();
        for (const rootDisposition of decision.casualty_scan.roots) {
            if (rootDisposition.status === "unaffected") {
                verifyEvidence(rootDisposition.evidence, `${context} unaffected root ${rootDisposition.root_id}`);
                continue;
            }
            for (const casualty of rootDisposition.casualties) {
                if (casualty.consumer_root_id !== rootDisposition.root_id) die(`${context} casualty ${casualty.id} names the wrong root`);
                if (casualtyIds.has(casualty.id)) die(`${context} repeats casualty ${casualty.id}`);
                casualtyIds.add(casualty.id);
                const migration = returnRecords.get(casualty.migration_owner);
                if (!migration || migration.binding.return_hash !== casualty.migration_return_hash) die(`${context} casualty ${casualty.id} lacks its exact successful migration return`);
                if (!waveIsAncestor(casualty.migration_owner, decision.owner_wave)) die(`${context} casualty ${casualty.id} migration owner is not a transitive ancestor`);
                usedReturns.add(casualty.migration_owner);
                verifyEvidence(casualty.evidence, `${context} casualty ${casualty.id}`);
            }
        }
        const scanPreimage = {
            consumer_receipt_hash: decision.casualty_scan.consumer_receipt_hash,
            decision_id: decision.decision_id,
            patterns,
            roots: decision.casualty_scan.roots,
            active_hits: expectedActive,
            allowed_hits: decision.casualty_scan.allowed_hits,
        };
        if (decision.casualty_scan.scan_sha256 !== sha256(canonicalize(scanPreimage))) die(`${context} casualty scan hash drift`);

        if (tombstones.has(decision.tombstone.name)) die(`duplicate tombstone name ${decision.tombstone.name}`);
        tombstones.add(decision.tombstone.name);
        verifyEvidence([decision.tombstone.evidence], `${context} tombstone`);
        const categories = decision.zero_residue.categories;
        exactSorted(categories, ({ category }) => category, `${context} zero-residue categories`);
        if (canonicalize(categories.map(({ category }) => category)) !== canonicalize(residueCategories)) {
            die(`${context} zero residue must cover source/declarations/manifests-exports/packed-artifacts/consumers/documentation exactly`);
        }
        for (const category of categories) {
            if (category.matches !== 0) die(`${context} residue category ${category.category} is nonzero`);
            verifyEvidence(category.evidence, `${context} residue ${category.category}`);
        }
    }
    dispositionDeletedEffects.sort((left, right) => compareCanonicalText(effectKey(left), effectKey(right)));
    exactSorted(dispositionDeletedEffects, effectKey, "disposition physical deletion union");
    if (canonicalize(dispositionDeletedEffects) !== canonicalize(actualDeletedEffects)) die("disposition physical deletions must biject exactly to the truth-receipt union");
    dispositionModifiedEffects.sort((left, right) => compareCanonicalText(effectKey(left), effectKey(right)));
    exactSorted(dispositionModifiedEffects, effectKey, "disposition physical modification union");
    if (canonicalize(dispositionModifiedEffects) !== canonicalize(actualModifiedEffects)) die("disposition physical modifications must biject exactly to the truth-receipt union");
    for (const receiptHash of truthByHash.keys()) {
        if (!usedTruthReceipts.has(receiptHash)) die(`truth receipt ${receiptHash} is not joined to any deletion decision effect`);
    }

    exactSorted(annex.c10_removed_surfaces, ({ decision_id }) => decision_id, "c10_removed_surfaces");
    if (annex.phase !== "c10-final" && annex.c10_removed_surfaces.length !== 0) die("only C10 may author release removed-surface rows");
    if (annex.phase === "c10-final") {
        const projection = annex.decisions.map((decision) => ({
            decision_id: decision.decision_id,
            decision_hash: decision.decision_hash,
            owner_wave: decision.owner_wave,
            surface: decision.surface.name,
            tombstone: decision.tombstone.name,
        }));
        if (canonicalize(annex.c10_removed_surfaces) !== canonicalize(projection)) die("C10 removed surfaces must biject exactly to originating decisions and tombstones");
    }
    const used = [...usedReturns].sort(compareCanonicalText);
    if (canonicalize(used) !== canonicalize(annex.ancestor_returns.map(({ wave_id }) => wave_id))) die("ancestor_returns must equal exactly the replacement, migration, and C10-origin returns used by decisions");
    return {
        annex_hash: annex.annex_hash,
        actual_deleted: actualDeleted,
        decision_hashes: annex.decisions.map(({ decision_id, decision_hash }) => ({ decision_id, decision_hash })),
        consumer_receipt_hash: consumer.receipt.receipt_hash,
        consumer_epoch_sha256: consumer.receipt.epoch.epoch_sha256,
    };
}

export function validateDeletionJudgment(path, options = {}) {
    const record = readStrict(path, "deletion judgment", { requireJcs: true });
    return validateDeletionJudgmentRecord(record.value, options);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
    try {
        const path = process.argv[2];
        if (!path || process.argv.length !== 3) die("usage: node deletion-judgment.mjs <deletion-judgment.json>");
        const result = validateDeletionJudgment(resolve(path));
        process.stdout.write(`${canonicalize({ schema: "vnext-deletion-judgment-verification/1", valid: true, ...result })}\n`);
    } catch (error) {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
    }
}
