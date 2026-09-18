#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { liveGateEnvironment, repositoryStateSha256 } from "./gate-runtime.mjs";
import { canonicalize, compareCanonicalText, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import {
    computeModuleGraphs,
    deriveTargetTests,
    fileSha256,
    gitIdentity,
    hashWithout,
    keyframesDeliveryProjection,
    keyframesPhysicalPathProjection,
    readStrictJson,
    requireCanonicalFile,
    requireGitTopLevel,
    same,
    sha256,
    walkRegularFiles,
} from "./keyframes-contract.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";
import {
    canonicalDemoTextLoaderPath,
    keyframesAuthorityProjection,
    materializeKeyframesGitAfterTree,
    mergeKeyframesAuthorityNodes,
    validateCanonicalDemoTextLoader,
    validateHistoricalKeyframesReturn,
    validateMirroredSourceAssertion,
} from "./keyframes-proof-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const canonicalTargetPath = resolve(root, "KEYFRAMES-TARGET-PATHS.json");
const inventoryValidator = resolve(root, "tools/validate-keyframes-current-inventory.mjs");
const targetValidator = resolve(root, "tools/validate-target-paths.mjs");
let ledgerPath;
let offlineReturns = false;
let historicalReplay = false;
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--ledger" && process.argv[index + 1]) ledgerPath = resolve(process.argv[++index]);
    else if (process.argv[index] === "--offline-returns") offlineReturns = true;
    else if (process.argv[index] === "--historical-replay") historicalReplay = true;
    else {
        process.stderr.write("usage: node validate-keyframes-target-transpose.mjs --ledger <path> [--offline-returns] [--historical-replay]\n");
        process.exit(2);
    }
}
if (!ledgerPath) {
    process.stderr.write("usage: node validate-keyframes-target-transpose.mjs --ledger <path> [--offline-returns] [--historical-replay]\n");
    process.exit(2);
}

const failures = [];
const fail = (message) => failures.push(message);
const exactKeys = (value, expected, pointer) => {
    const actual = value && typeof value === "object" && !Array.isArray(value) ? Object.keys(value).sort(compareCanonicalText) : [];
    const wanted = [...expected].sort(compareCanonicalText);
    if (!same(actual, wanted)) fail(`${pointer}: exact keys ${wanted.join(", ")} required`);
};
const checkedEvidence = (evidence, pointer) => {
    try {
        requireCanonicalFile(evidence?.path, `${pointer}/path`);
        const actual = fileSha256(evidence.path);
        if (evidence.file_sha256 !== actual) fail(`${pointer}/file_sha256: computed ${actual}`);
        return evidence.path;
    } catch (error) {
        fail(`${pointer}: ${error.message}`);
    }
};

function decisionForRow(scope, row, introduced = false) {
    const decision = introduced ? {
        decision_id: `introduced:${scope}:${row.kind}:${row.target_id}`,
        scope,
        kind: row.kind,
        disposition: "introduce",
        target_id: row.target_id,
        target_sha256: row.target_sha256,
        rationale: row.rationale,
        decision_hash: "",
    } : row.disposition === "delete" ? {
        decision_id: `current:${scope}:${row.kind}:${row.current_id}`,
        scope,
        kind: row.kind,
        current_id: row.current_id,
        current_sha256: row.current_sha256,
        disposition: "delete",
        rationale: row.rationale,
        tombstone: row.tombstone,
        decision_hash: "",
    } : {
        decision_id: `current:${scope}:${row.kind}:${row.current_id}`,
        scope,
        kind: row.kind,
        current_id: row.current_id,
        current_sha256: row.current_sha256,
        disposition: row.disposition,
        target_id: row.target_id,
        target_sha256: row.target_sha256,
        rationale: row.rationale,
        decision_hash: "",
    };
    decision.decision_hash = hashWithout(decision, "decision_hash");
    return decision;
}

const waveContracts = loadWaveContracts();
function strictAncestors(waveId) {
    const result = new Set();
    const visit = (id) => {
        for (const dependency of waveContracts.get(id)?.contract.dependencies ?? []) {
            if (!result.has(dependency)) {
                result.add(dependency);
                visit(dependency);
            }
        }
    };
    visit(waveId);
    return result;
}

const returnCache = new Map();
function validatedUniversalReturn(evidence, pointer, expectedWave, mode) {
    const path = checkedEvidence(evidence, pointer);
    if (!path) return undefined;
    const key = `${mode}\0${path}\0${expectedWave}\0${ledger.wave_id}`;
    if (returnCache.has(key)) return returnCache.get(key);
    let loaded;
    try {
        loaded = validateHistoricalKeyframesReturn(evidence, expectedWave, ledger.wave_id, mode);
    } catch (error) {
        fail(`${pointer}: ${error.message}`);
    }
    returnCache.set(key, loaded);
    return loaded;
}

let ledger;
try {
    ledger = readStrictJson(ledgerPath, "/ledger");
    const schema = readStrictJson(resolve(root, "keyframes-target-transpose.schema.json"), "/schema");
    failures.push(...validateJsonSchema(ledger, schema));
} catch (error) {
    fail(`/ledger: ${error.message}`);
}

if (!ledger) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
const ledgerHash = hashWithout(ledger, "manifest_hash");
if (ledger.manifest_hash !== ledgerHash) fail(`/manifest_hash: computed ${ledgerHash}`);

let inventory;
let inventoryReceipt;
try {
    const path = checkedEvidence(ledger.current_inventory, "/current_inventory");
    if (path) {
        inventory = readStrictJson(path, "/current_inventory");
        if (inventory.inventory_hash !== ledger.current_inventory.inventory_hash) fail(`/current_inventory/inventory_hash: binding mismatch`);
        const validation = spawnSync(process.execPath, [inventoryValidator, "--inventory", path, "--replay"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
        if (validation.status !== 0) fail(`/current_inventory: snapshot replay validation failed: ${(validation.stderr || validation.stdout).trim()}`);
        else inventoryReceipt = parseJsonStrict(validation.stdout.trim());
        const expectedWave = ledger.scope === "library" ? "K00" : "M00";
        if (inventory.scope !== ledger.scope || inventory.wave_id !== expectedWave) fail(`/current_inventory: ${expectedWave} ${ledger.scope} inventory required`);
        if (inventory.repository?.path === ledger.repository?.path) fail(`/current_inventory/repository/path: immutable current worktree must be distinct from final repository path`);
    }
} catch (error) {
    fail(`/current_inventory: ${error.message}`);
}

let currentReturn;
if (inventory) {
    const loadedCurrentReturn = validatedUniversalReturn(
        ledger.current_inventory.return,
        "/current_inventory/return",
        inventory.wave_id,
        "historical-certificate",
    );
    currentReturn = loadedCurrentReturn?.returned;
    if (currentReturn) {
        if (currentReturn.wave_id !== inventory.wave_id || currentReturn.status !== "COMPLETE") {
            fail(`/current_inventory/return: exact COMPLETE ${inventory.wave_id} return required`);
        }
        const annex = currentReturn.annexes?.["keyframes-current-inventory"];
        exactKeys(annex, ["schema", "wave_id", "scope", "inventory", "capture_receipt", "replay_receipt"], "/current_inventory/return/annex");
        if (annex?.schema !== "vnext-keyframes-current-inventory-return-annex/1" || annex.wave_id !== inventory.wave_id || annex.scope !== ledger.scope) {
            fail(`/current_inventory/return/annex: typed inventory annex identity mismatch`);
        }
        if (annex?.inventory?.path !== ledger.current_inventory.path
            || annex?.inventory?.file_sha256 !== ledger.current_inventory.file_sha256
            || annex?.inventory?.inventory_hash !== ledger.current_inventory.inventory_hash) {
            fail(`/current_inventory/return/annex/inventory: exact inventory binding required`);
        }
        for (const [receiptKind, expectedMode] of [["capture_receipt", "capture"], ["replay_receipt", "replay"]]) {
            const receiptPath = checkedEvidence(annex?.[receiptKind], `/current_inventory/return/annex/${receiptKind}`);
            if (!receiptPath) continue;
            try {
                const persisted = readStrictJson(receiptPath, `/current_inventory/return/annex/${receiptKind}`);
                if (persisted.receipt_hash !== annex[receiptKind].receipt_hash || persisted.receipt_hash !== hashWithout(persisted, "receipt_hash")) {
                    fail(`/current_inventory/return/annex/${receiptKind}: self-hash mismatch`);
                }
                if (persisted.mode !== expectedMode) fail(`/current_inventory/return/annex/${receiptKind}: ${expectedMode} receipt required`);
                if (receiptKind === "replay_receipt" && inventoryReceipt && !same(persisted, inventoryReceipt)) {
                    fail(`/current_inventory/return/annex/replay_receipt: persisted receipt differs from fresh snapshot replay`);
                }
            } catch (error) {
                fail(`/current_inventory/return/annex/${receiptKind}: ${error.message}`);
            }
        }
    }
}

let target;
try {
    if (ledger.target_paths.path !== canonicalTargetPath) fail(`/target_paths/path: canonical ${canonicalTargetPath} required`);
    const path = checkedEvidence(ledger.target_paths, "/target_paths");
    if (path) {
        target = readStrictJson(path, "/target_paths");
        const targetHash = hashWithout(target, "manifest_sha256");
        if (target.schema !== "vnext-keyframes-target-paths/1" || target.manifest_sha256 !== targetHash
            || ledger.target_paths.manifest_sha256 !== targetHash) fail(`/target_paths: exact self-hashed Keyframes authority required`);
        const validation = spawnSync(process.execPath, [targetValidator, "--keyframes-manifest", path], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
        if (validation.status !== 0) fail(`/target_paths: canonical validator failed: ${(validation.stderr || validation.stdout).trim()}`);
    }
} catch (error) {
    fail(`/target_paths: ${error.message}`);
}

let localDecisions;
try {
    const path = checkedEvidence(ledger.local_decisions, "/local_decisions");
    if (path) {
        localDecisions = readStrictJson(path, "/local_decisions");
        const schema = readStrictJson(resolve(root, "keyframes-target-decisions.schema.json"), "/decision_schema");
        failures.push(...validateJsonSchema(localDecisions, schema).map((message) => `/local_decisions${message}`));
        if (localDecisions.schema !== "vnext-keyframes-local-target-decisions/1" || localDecisions.wave_id !== ledger.wave_id || localDecisions.scope !== ledger.scope) {
            fail(`/local_decisions: exact local wave/scope receipt required`);
        }
        const annexHash = hashWithout(localDecisions, "annex_hash");
        if (localDecisions.annex_hash !== annexHash || ledger.local_decisions.annex_hash !== annexHash) fail(`/local_decisions/annex_hash: computed ${annexHash}`);
    }
} catch (error) {
    fail(`/local_decisions: ${error.message}`);
}

let physical;
let gitTruth;
let replayTree;
try {
    const physicalPath = checkedEvidence(ledger.physical_truth, "/physical_truth");
    if (physicalPath) {
        physical = readStrictJson(physicalPath, "/physical_truth");
        const schema = readStrictJson(resolve(root, "keyframes-physical-transpose.schema.json"), "/physical_schema");
        failures.push(...validateJsonSchema(physical, schema).map((message) => `/physical_truth${message}`));
        const receiptHash = hashWithout(physical, "receipt_hash");
        if (physical.receipt_hash !== receiptHash || ledger.physical_truth.receipt_hash !== receiptHash) {
            fail(`/physical_truth/receipt_hash: computed ${receiptHash}`);
        }
        if (physical.wave_id !== ledger.wave_id || physical.scope !== ledger.scope
            || !same(physical.current_snapshot, { file_sha256: inventory?.snapshot?.file_sha256, files_sha256: inventory?.snapshot?.files_sha256 })
            || physical.final_repository_state_sha256 !== ledger.repository.repository_state_sha256
            || physical.target_manifest_sha256 !== ledger.target_paths.manifest_sha256) {
            fail(`/physical_truth: exact snapshot/final-repository/target authority binding required`);
        }
        replayTree = materializeKeyframesGitAfterTree(physical.git_truth.path);
        gitTruth = replayTree.verified;
        if (gitTruth.file_sha256 !== physical.git_truth?.file_sha256
            || gitTruth.receipt.receipt_hash !== physical.git_truth?.receipt_hash) {
            fail(`/physical_truth/git_truth: exact executable Git receipt binding required`);
        }
        if (gitTruth.receipt.repository.canonical_realpath !== ledger.repository.path
            || gitTruth.receipt.repository.branch !== ledger.repository.branch
            || gitTruth.receipt.repository.before_head !== inventory?.repository?.head
            || gitTruth.receipt.repository.after_head !== ledger.repository.head
            || gitTruth.receipt.repository.after_status_sha256 !== ledger.repository.dirty_sha256) {
            fail(`/physical_truth/git_truth/repository: exact current-inventory to final-repository Git epoch required`);
        }
    }
} catch (error) {
    fail(`/physical_truth: ${error.message}`);
}

let expectedFiles = [];
let computedGraphs;
let finalTargets = new Map();
let testExecution;
if (target && replayTree) {
    try {
        const repositoryRoot = replayTree.root;
        if (!historicalReplay) {
            requireGitTopLevel(ledger.repository.path);
            const live = gitIdentity(ledger.repository.path);
            for (const member of ["branch", "head", "dirty_sha256"]) {
                if (ledger.repository[member] !== live[member]) fail(`/repository/${member}: live ${live[member]}`);
            }
            const state = repositoryStateSha256(ledger.repository.path);
            if (ledger.repository.repository_state_sha256 !== state) fail(`/repository/repository_state_sha256: live ${state}`);
        }

        const section = target[ledger.scope];
        const sourceFiles = walkRegularFiles(repositoryRoot, section.root);
        const testFiles = walkRegularFiles(repositoryRoot, section.test.root);
        const expectedSourcePaths = [...section.files].sort(compareCanonicalText);
        const expectedTestPaths = deriveTargetTests(target, ledger.scope).sort(compareCanonicalText);
        if (!same(sourceFiles.map(({ path }) => path), expectedSourcePaths)) fail(`/result/files: final source tree does not exactly materialize target authority`);
        if (!same(testFiles.map(({ path }) => path), expectedTestPaths)) fail(`/result/files: final external-test tree does not exactly materialize target vector`);
        const supportFiles = [
            ...(section.support_roots ?? []).flatMap((supportRoot) => walkRegularFiles(repositoryRoot, supportRoot)),
            ...(section.support_files ?? []).map((path) => {
                const absolute = resolve(repositoryRoot, path);
                requireCanonicalFile(absolute, `/result/support/${path}`);
                const bytes = readFileSync(absolute);
                return { path, bytes: bytes.length, sha256: sha256(bytes) };
            }),
        ];
        expectedFiles = [
            ...sourceFiles.map((file) => ({ kind: "source", ...file })),
            ...testFiles.map((file) => ({ kind: "test", ...file })),
            ...supportFiles.map((file) => ({ kind: "support", ...file })),
        ].sort((left, right) => compareCanonicalText(`${left.kind}\0${left.path}`, `${right.kind}\0${right.path}`));
        const fileKeys = expectedFiles.map(({ kind, path }) => `${kind}\0${path}`);
        if (new Set(fileKeys).size !== fileKeys.length) fail(`/result/files: authority roots overlap`);
        if (!same(ledger.result.files, expectedFiles)) fail(`/result/files: exact live file/hash/byte vector required`);

        const supportPaths = expectedFiles.filter(({ kind }) => kind === "support").map(({ path }) => path);
        const exceptions = ledger.result.support_exceptions;
        const exceptionPaths = exceptions.map(({ path }) => path);
        if (new Set(exceptionPaths).size !== exceptionPaths.length || !same(exceptionPaths, [...exceptionPaths].sort(compareCanonicalText))
            || !same(exceptionPaths, supportPaths)) fail(`/result/support_exceptions: one exact typed row per support file required`);
        for (const [index, row] of exceptions.entries()) {
            const expectedClass = row.path === canonicalDemoTextLoaderPath ? "tool"
                : row.path.startsWith("bench/") ? "benchmark"
                : row.path.startsWith("proof/fixtures/") ? "fixture"
                    : row.path.startsWith("proof/tools/") ? "tool" : "proof";
            if (row.class !== expectedClass) fail(`/result/support_exceptions/${index}/class: expected ${expectedClass}`);
        }

        computedGraphs = computeModuleGraphs(repositoryRoot, expectedFiles.map(({ path }) => path));
        if (!same(ledger.result.graphs, computedGraphs)) fail(`/result/graphs: exact runtime and type-inclusive graphs required`);
        if (computedGraphs.runtime.sccs.length || computedGraphs.type.sccs.length) fail(`/result/graphs: final runtime and type-inclusive graphs must have zero SCCs`);
        finalTargets = new Map(expectedFiles.map((file) => [`${file.kind}\0${file.path}`, file]));

        const expectedScript = ledger.scope === "library" ? "proof:k22t-target-tests" : "proof:m10t-target-tests";
        if (ledger.test_contract.script !== expectedScript) fail(`/test_contract/script: expected ${expectedScript}`);
        if (!Number.isInteger(ledger.test_contract.timeout_ms) || ledger.test_contract.timeout_ms < 1000 || ledger.test_contract.timeout_ms > 120000) {
            fail(`/test_contract/timeout_ms: bounded 1000..120000 integer required`);
        }
        const testVector = deriveTargetTests(target, ledger.scope);
        const expectedLoaderPath = canonicalDemoTextLoaderPath;
        const expectedCommand = ledger.scope === "library"
            ? `node --test ${testVector.join(" ")}`
            : `node --experimental-loader ./proof/demo-text-loader.mjs --test ${testVector.join(" ")}`;
        if (ledger.test_contract.command !== expectedCommand) {
            fail(`/test_contract/command: exact scope-derived test command required`);
        }
        if (ledger.scope === "library") {
            if (ledger.test_contract.loader !== null) fail(`/test_contract/loader: library target tests require no loader`);
        } else {
            exactKeys(ledger.test_contract.loader, ["path", "sha256"], "/test_contract/loader");
            if (ledger.test_contract.loader?.path !== expectedLoaderPath) {
                fail(`/test_contract/loader/path: expected ${expectedLoaderPath}`);
            } else {
                try {
                    const loaderPath = resolve(repositoryRoot, expectedLoaderPath);
                    requireCanonicalFile(loaderPath, "/test_contract/loader/path");
                    const loaderHash = fileSha256(loaderPath);
                    if (ledger.test_contract.loader.sha256 !== loaderHash) {
                        fail(`/test_contract/loader/sha256: computed ${loaderHash}`);
                    }
                    validateCanonicalDemoTextLoader(loaderPath);
                } catch (error) {
                    fail(`/test_contract/loader: ${error.message}`);
                }
            }
        }
        for (let index = 0; index < testVector.length; index += 1) {
            const testPath = testVector[index];
            const sourcePath = section.files[index];
            const sourceEdges = computedGraphs.runtime.edges.filter(({ from, to }) => from === testPath && to.startsWith(`${section.root}/`));
            if (sourceEdges.length !== 1 || sourceEdges[0].to !== sourcePath) {
                fail(`/test_contract/pairing/${testPath}: exactly one runtime import of mirrored source ${sourcePath} required`);
                continue;
            }
            const edge = sourceEdges[0];
            try {
                validateMirroredSourceAssertion(testPath, readFileSync(resolve(repositoryRoot, testPath), "utf8"), edge.specifier);
            } catch (error) {
                fail(`/test_contract/pairing/${testPath}: ${error.message}`);
            }
        }
        const packageManifest = parseJsonStrict(readFileSync(resolve(repositoryRoot, "package.json")));
        if (packageManifest.scripts?.[expectedScript] !== ledger.test_contract.command
            || packageManifest.scripts?.[expectedScript] !== expectedCommand) {
            fail(`/test_contract/script: package.json must declare the exact bound scope-derived test command`);
        } else {
            const args = ledger.scope === "library"
                ? ["--test", ...testVector]
                : ["--experimental-loader", "./proof/demo-text-loader.mjs", "--test", ...testVector];
            const execution = spawnSync(process.execPath, args, {
                cwd: repositoryRoot,
                encoding: null,
                timeout: ledger.test_contract.timeout_ms,
                maxBuffer: 128 * 1024 * 1024,
                env: liveGateEnvironment(),
                shell: false,
            });
            testExecution = {
                command: "node",
                args,
                timeout_ms: ledger.test_contract.timeout_ms,
                script_sha256: sha256(expectedCommand),
                loader: ledger.test_contract.loader,
                exit_code: execution.status,
                signal: execution.signal ?? "",
            };
            if (execution.error?.code === "ETIMEDOUT") fail(`/test_contract: bounded test command timed out`);
            else if (execution.status !== 0) fail(`/test_contract: freshly executed test command failed with ${execution.status}`);
        }
    } catch (error) {
        fail(`/repository: ${error.message}`);
    }
}

const decisionSchema = readStrictJson(resolve(root, "keyframes-target-decisions.schema.json"), "/decision_schema");
const ancestorSet = strictAncestors(ledger.wave_id);
const ownerBand = ledger.scope === "library" ? "K" : "M";
const decisionAnnexCache = new Map();
const ownerAuthorizationIdentities = new Map();
if (currentReturn) {
    const loaded = returnCache.get(`historical-certificate\0${ledger.current_inventory.return.path}\0${currentReturn.wave_id}\0${ledger.wave_id}`);
    if (loaded?.node) {
        try {
            mergeKeyframesAuthorityNodes(ownerAuthorizationIdentities, [loaded.node], "current inventory artifact edge");
        } catch (error) {
            fail(`/current_inventory/return: ${error.message}`);
        }
    }
}

function decisionFromOwner(owner, expected, pointer) {
    if (owner.decision_id !== expected.decision_id || owner.decision_hash !== expected.decision_hash) {
        fail(`${pointer}: owner decision ID/hash does not bind the exact row`);
    }
    let annex;
    let returned;
    if (owner.kind === "terminal-return") {
        if (!owner.wave_id.startsWith(ownerBand) || !ancestorSet.has(owner.wave_id)) {
            fail(`${pointer}/wave_id: strict canonical ${ownerBand}-band ancestor of ${ledger.wave_id} required`);
        }
        const loaded = validatedUniversalReturn(owner.return, `${pointer}/return`, owner.wave_id, "immutable-authority");
        returned = loaded?.returned;
        if (!returned) return;
        try {
            mergeKeyframesAuthorityNodes(
                ownerAuthorizationIdentities,
                loaded.authorization_closure?.nodes,
                `${pointer}/return/authorization_closure`,
            );
        } catch (error) {
            fail(`${pointer}/return: ${error.message}`);
        }
        if (returned.wave_id !== owner.wave_id) {
            fail(`${pointer}/return: central-policy-authorized terminal return required`);
        }
        annex = returned.annexes?.["keyframes-target-decisions"];
        if (!decisionAnnexCache.has(owner.return.path)) {
            failures.push(...validateJsonSchema(annex, decisionSchema).map((message) => `${pointer}/return/annex${message}`));
            if (annex?.schema !== "vnext-keyframes-target-decisions/1" || annex.wave_id !== owner.wave_id || annex.scope !== ledger.scope) {
                fail(`${pointer}/return/annex: exact owner wave/scope decision annex required`);
            }
            const hash = hashWithout(annex, "annex_hash");
            if (annex?.annex_hash !== hash) fail(`${pointer}/return/annex/annex_hash: computed ${hash}`);
            const ids = (annex?.decisions ?? []).map(({ decision_id }) => decision_id);
            if (new Set(ids).size !== ids.length || !same(ids, [...ids].sort(compareCanonicalText))) fail(`${pointer}/return/annex/decisions: exact unique decision ID canonical text order required`);
            decisionAnnexCache.set(owner.return.path, annex);
        }
    } else {
        if (owner.wave_id !== ledger.wave_id || !same(owner.local_decisions, ledger.local_decisions)) {
            fail(`${pointer}/local_decisions: must bind the ledger's exact local decision receipt`);
        }
        annex = localDecisions;
    }
    const matches = (annex?.decisions ?? []).filter(({ decision_id }) => decision_id === expected.decision_id);
    if (matches.length !== 1 || !same(matches[0], expected)) fail(`${pointer}: exact persisted owner decision not found`);
    if (expected.disposition === "delete" && owner.kind === "terminal-return") {
        if (!returned.annexes?.["deletion-judgment"]
            || !(returned.terminal_disposition?.deletions ?? []).some(({ decision_id, decision_hash }) => decision_id === expected.decision_id && decision_hash === expected.decision_hash)) {
            fail(`${pointer}: delete requires the owner's universal deletion annex and exact terminal deletion decision`);
        }
    }
}

let expectedPhysicalEffects = [];
let expectedDelivery;
if (inventory && finalTargets.size) {
    const currentNodes = inventory.nodes.filter(({ kind }) => kind !== "export");
    const current = new Map(currentNodes.map((node) => [`${node.kind}\0${node.id}`, node]));
    const rowKeys = ledger.rows.map(({ kind, current_id }) => `${kind}\0${current_id}`);
    if (new Set(rowKeys).size !== rowKeys.length || !same(rowKeys, [...rowKeys].sort(compareCanonicalText))) fail(`/rows: exact unique kind/current_id canonical text order required`);
    if (!same(rowKeys, [...current.keys()].sort(compareCanonicalText))) fail(`/rows: every current file node must appear exactly once`);
    const primary = new Set();
    const folds = [];
    const targetOwnerWave = new Map();
    const finalPaths = new Set(expectedFiles.map(({ path }) => path));
    for (const [index, row] of ledger.rows.entries()) {
        const pointer = `/rows/${index}`;
        const node = current.get(`${row.kind}\0${row.current_id}`);
        if (!node) continue;
        if (row.current_sha256 !== node.sha256) fail(`${pointer}/current_sha256: current inventory mismatch`);
        const expectedDecision = decisionForRow(ledger.scope, row);
        decisionFromOwner(row.owner, expectedDecision, `${pointer}/owner`);
        if (row.disposition === "keep" && row.target_id !== row.current_id) fail(`${pointer}: keep requires the identical path`);
        if (["move", "fold"].includes(row.disposition) && row.target_id === row.current_id) fail(`${pointer}: ${row.disposition} requires a distinct path`);
        if (row.disposition !== "delete") {
            const targetKey = `${row.kind}\0${row.target_id}`;
            const targetFile = finalTargets.get(targetKey);
            if (!targetFile) fail(`${pointer}/target_id: invented or wrong-kind final target`);
            else if (row.target_sha256 !== targetFile.sha256) fail(`${pointer}/target_sha256: final file digest mismatch`);
            if (row.disposition === "fold") folds.push([pointer, targetKey]);
            else if (primary.has(targetKey)) fail(`${pointer}/target_id: duplicate primary owner`);
            else {
                primary.add(targetKey);
                targetOwnerWave.set(targetKey, row.owner.wave_id);
            }
        }
        if (["move", "fold", "delete"].includes(row.disposition) && finalPaths.has(row.current_id)) {
            fail(`${pointer}: ${row.disposition} old coordinate ${row.current_id} remains materialized in the final tree`);
        }
        if (row.disposition === "delete" || ["move", "fold"].includes(row.disposition)
            || (row.disposition === "keep" && row.current_sha256 !== row.target_sha256)) {
            expectedPhysicalEffects.push({
                decision_id: expectedDecision.decision_id,
                kind: row.kind,
                effect: row.disposition === "delete" ? "remove"
                    : row.disposition === "keep" ? "replace-in-place" : "remove-and-materialize",
                current_path: row.current_id,
                current_sha256: row.current_sha256,
                target_path: row.disposition === "delete" ? null : row.target_id,
                target_sha256: row.disposition === "delete" ? null : row.target_sha256,
                decision_owner_wave_id: row.owner.wave_id,
                physical_owner_wave_id: row.disposition === "delete" ? row.owner.wave_id : ledger.wave_id,
            });
        }
    }
    const introducedKeys = ledger.introduced_targets.map(({ kind, target_id }) => `${kind}\0${target_id}`);
    if (new Set(introducedKeys).size !== introducedKeys.length || !same(introducedKeys, [...introducedKeys].sort(compareCanonicalText))) {
        fail(`/introduced_targets: exact unique kind/target_id canonical text order required`);
    }
    for (const [index, row] of ledger.introduced_targets.entries()) {
        const pointer = `/introduced_targets/${index}`;
        const targetKey = `${row.kind}\0${row.target_id}`;
        const targetFile = finalTargets.get(targetKey);
        if (!targetFile) fail(`${pointer}/target_id: invented or wrong-kind final target`);
        else if (row.target_sha256 !== targetFile.sha256) fail(`${pointer}/target_sha256: final file digest mismatch`);
        decisionFromOwner(row.owner, decisionForRow(ledger.scope, row, true), `${pointer}/owner`);
        if (primary.has(targetKey)) fail(`${pointer}/target_id: target already has a primary owner`);
        primary.add(targetKey);
        targetOwnerWave.set(targetKey, row.owner.wave_id);
        const expectedDecision = decisionForRow(ledger.scope, row, true);
        expectedPhysicalEffects.push({
            decision_id: expectedDecision.decision_id,
            kind: row.kind,
            effect: "materialize",
            current_path: null,
            current_sha256: null,
            target_path: row.target_id,
            target_sha256: row.target_sha256,
            decision_owner_wave_id: row.owner.wave_id,
            physical_owner_wave_id: ledger.wave_id,
        });
    }
    for (const [pointer, targetKey] of folds) if (!primary.has(targetKey)) fail(`${pointer}/target_id: fold target lacks a primary owner`);
    if (!same([...primary].sort(compareCanonicalText), [...finalTargets.keys()].sort(compareCanonicalText))) fail(`/rows+/introduced_targets: primary owners must cover every final file target exactly once`);
    for (const [index, row] of ledger.result.support_exceptions.entries()) {
        const owner = targetOwnerWave.get(`support\0${row.path}`);
        if (row.owner_wave_id !== owner) fail(`/result/support_exceptions/${index}/owner_wave_id: must equal disposition owner ${owner}`);
    }
    expectedPhysicalEffects.sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id));
    expectedDelivery = keyframesDeliveryProjection(expectedFiles, ledger.rows);
    if (!same(ledger.result.delivery, expectedDelivery)) fail(`/result/delivery: exact source/test/support/removal/replacement projection required`);
}

if (inventory && expectedDelivery && physical && gitTruth) {
    if (!same(physical.effects, expectedPhysicalEffects)) fail(`/physical_truth/effects: exact physical removal/replacement effects required`);
    if (!same(physical.delivery, expectedDelivery) || !same(physical.delivery, ledger.result.delivery)) {
        fail(`/physical_truth/delivery: exact ledger delivery projection required`);
    }
    const allPaths = keyframesPhysicalPathProjection(physical.effects);
    if (!same(allPaths.deleted_paths, physical.delivery.removed_paths)
        || !same(allPaths.modified_paths, physical.delivery.replaced_paths)) {
        fail(`/physical_truth/delivery: removal/replacement paths must exactly project all physical effects`);
    }
    const ownedPaths = keyframesPhysicalPathProjection(physical.effects, ledger.wave_id);
    for (const kind of ["deleted", "added", "modified"]) {
        if (!same(ownedPaths[`${kind}_paths`], gitTruth.receipt[`${kind}_paths`])) {
            fail(`/physical_truth/git_truth/${kind}_paths: must exactly equal ${ledger.wave_id}-owned physical effects`);
        }
    }
}

if (failures.length) {
    replayTree?.cleanup();
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const receipt = {
    schema: "vnext-keyframes-target-transpose-validation/1",
    mode: "immutable-git-replay",
    ledger: { path: ledgerPath, file_sha256: fileSha256(ledgerPath), manifest_hash: ledger.manifest_hash },
    wave_id: ledger.wave_id,
    scope: ledger.scope,
    repository_state_sha256: ledger.repository.repository_state_sha256,
    current_inventory_hash: ledger.current_inventory.inventory_hash,
    current_inventory_return_hash: ledger.current_inventory.return.return_hash,
    target_manifest_sha256: ledger.target_paths.manifest_sha256,
    files: expectedFiles.length,
    current_files: inventory.nodes.filter(({ kind }) => kind !== "export").length,
    introduced: ledger.introduced_targets.length,
    deleted: ledger.rows.filter(({ disposition }) => disposition === "delete").length,
    runtime_graph_hash: computedGraphs.runtime.graph_hash,
    type_graph_hash: computedGraphs.type.graph_hash,
    physical_truth_receipt_hash: ledger.physical_truth.receipt_hash,
    git_truth_receipt_hash: physical?.git_truth?.receipt_hash,
    owner_authorization: keyframesAuthorityProjection(ownerAuthorizationIdentities),
    git_after: {
        head: gitTruth.receipt.repository.after_head,
        snapshot_hash: replayTree.after.snapshot_hash,
        files_sha256: replayTree.after.files_sha256,
    },
    delivery: expectedDelivery,
    test_execution: testExecution,
    semantic_hash: "",
    receipt_hash: "",
};
const semanticReceipt = { ...receipt };
delete semanticReceipt.semantic_hash;
delete semanticReceipt.receipt_hash;
receipt.semantic_hash = sha256(canonicalize(semanticReceipt));
receipt.receipt_hash = hashWithout(receipt, "receipt_hash");
const receiptSchema = readStrictJson(resolve(root, "keyframes-target-transpose-validation.schema.json"), "/receipt_schema");
const receiptFailures = validateJsonSchema(receipt, receiptSchema);
replayTree.cleanup();
if (receiptFailures.length) {
    process.stderr.write(`${receiptFailures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify(receipt)}\n`);
