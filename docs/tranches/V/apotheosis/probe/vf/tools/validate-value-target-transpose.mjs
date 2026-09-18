#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdtempSync, readFileSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { validateDeletionTruthReceipt } from "./deletion-truth.mjs";
import { repositoryStateSha256 } from "./gate-runtime.mjs";
import { compareCanonicalText, canonicalize, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import {
    loadUniversalWaveReturn,
    loadValueTargetOwnerReturn,
    mergeAuthorizationClosure,
    valueTargetDecisionHash,
} from "./value-target-owner-return.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inventoryValidator = resolve(root, "tools/validate-value-current-inventory.mjs");
const targetValidator = resolve(root, "tools/validate-target-paths.mjs");
const resolutionsValidator = resolve(root, "tools/validate-value-target-resolutions.mjs");
const cssValidator = resolve(root, "tools/validate-css-module-isomorphism.mjs");
const publicValidator = resolve(root, "tools/validate-value-public-surface.mjs");
const waveContracts = loadWaveContracts(root);

let ledgerPath;
let historicalReplay = false;
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--ledger" && process.argv[index + 1]) ledgerPath = resolve(process.argv[++index]);
    else if (process.argv[index] === "--historical-replay") historicalReplay = true;
    else {
        process.stderr.write("usage: node validate-value-target-transpose.mjs --ledger <path> [--historical-replay]\n");
        process.exit(2);
    }
}
if (!ledgerPath) {
    process.stderr.write("usage: node validate-value-target-transpose.mjs --ledger <path> [--historical-replay]\n");
    process.exit(2);
}

const failures = [];
const fail = (message) => failures.push(message);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const fileHash = (path) => sha256(readFileSync(path));
const nodeKey = ({ kind, id }) => `${kind}\0${id}`;
const rowKey = ({ kind, current_id }) => `${kind}\0${current_id}`;
const targetKey = ({ kind, target_id }) => `${kind}\0${target_id}`;
const decisionKey = ({ wave_id, decision_id, decision_hash }) => `${wave_id}\0${decision_id}\0${decision_hash}`;
let logicalValueRoot;
let replayRoot;
let replayCleanup;

function inside(base, candidate) {
    const fromBase = relative(base, candidate);
    return fromBase === "" || (!fromBase.startsWith(`..${sep}`) && fromBase !== ".." && !isAbsolute(fromBase));
}

function materializedPath(path) {
    if (!historicalReplay || !replayRoot || typeof path !== "string" || !isAbsolute(path) || !inside(logicalValueRoot, path)) return path;
    return resolve(replayRoot, relative(logicalValueRoot, path));
}

function selfHash(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    return sha256(canonicalize(preimage));
}

function checkedCanonicalFile(path, pointer) {
    if (typeof path !== "string" || !isAbsolute(path) || !existsSync(path)) {
        fail(`${pointer}: existing absolute file required`);
        return false;
    }
    const metadata = lstatSync(path);
    if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(path) !== path) {
        fail(`${pointer}: canonical regular non-symlink file required`);
        return false;
    }
    return true;
}

function checkedEvidence(evidence, pointer) {
    const path = materializedPath(evidence?.path);
    if (!checkedCanonicalFile(path, `${pointer}/path`)) return undefined;
    const actual = fileHash(path);
    if (actual !== evidence.sha256 && actual !== evidence.file_sha256) {
        fail(`${pointer}/${Object.hasOwn(evidence, "sha256") ? "sha256" : "file_sha256"}: computed ${actual}`);
    }
    return path;
}

function checkedJsonEvidence(evidence, pointer) {
    const path = checkedEvidence(evidence, pointer);
    if (!path) return undefined;
    try {
        return parseJsonStrict(readFileSync(path));
    } catch (error) {
        fail(`${pointer}: strict JSON parse failed: ${error.message}`);
        return undefined;
    }
}

function checkedSelfHash(value, member, pointer) {
    const computed = selfHash(value, member);
    if (value?.[member] !== computed) fail(`${pointer}/${member}: computed ${computed}`);
    return computed;
}

function parseValidatorReceipt(label, command, args) {
    const run = spawnSync(process.execPath, [command, ...args], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
    if (run.status !== 0) {
        fail(`${label}: exact validator failed: ${(run.stderr || run.stdout).trim()}`);
        return undefined;
    }
    try {
        return parseJsonStrict(run.stdout.trim());
    } catch (error) {
        fail(`${label}: validator receipt is not strict JSON: ${error.message}`);
        return undefined;
    }
}

function exactUnique(values, pointer, { sorted = false } = {}) {
    if (new Set(values).size !== values.length) fail(`${pointer}: duplicate values are forbidden`);
    if (sorted && canonicalize(values) !== canonicalize([...values].sort(compareCanonicalText))) {
        fail(`${pointer}: canonical text order required`);
    }
}

function exactRepository(path) {
    if (typeof path !== "string" || !isAbsolute(path) || !existsSync(path)) {
        fail("/value_root/path: existing absolute Git root required");
        return undefined;
    }
    const metadata = lstatSync(path);
    if (!metadata.isDirectory() || metadata.isSymbolicLink() || realpathSync(path) !== path) {
        fail("/value_root/path: canonical real non-symlink directory required");
        return undefined;
    }
    const run = spawnSync("git", ["-C", path, "rev-parse", "--show-toplevel"], { encoding: "utf8" });
    if (run.status !== 0 || run.stdout.trim() !== path) {
        fail("/value_root/path: path must be the exact Git repository root");
        return undefined;
    }
    return path;
}

function git(repository, args, label) {
    const run = spawnSync("git", ["-C", repository, ...args], {
        encoding: args.includes("-z") ? null : "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
    if (run.status !== 0) throw new Error(`${label}: ${(run.stderr || run.stdout || "git failed").toString().trim()}`);
    return run.stdout;
}

function materializeHistoricalReplay(ledgerRecord) {
    const truthBinding = ledgerRecord?.physical_truth?.receipt;
    if (!checkedCanonicalFile(truthBinding?.path, "/physical_truth/receipt/path")) return undefined;
    const truthFileSha256 = fileHash(truthBinding.path);
    if (truthBinding.file_sha256 !== truthFileSha256) {
        fail(`/physical_truth/receipt/file_sha256: computed ${truthFileSha256}`);
        return undefined;
    }
    let verified;
    try {
        verified = validateDeletionTruthReceipt(truthBinding.path, { requireLiveAfter: false });
    } catch (error) {
        fail(`/historical_replay: immutable Git truth rejected: ${error.message}`);
        return undefined;
    }
    const receipt = verified.receipt;
    if (receipt.receipt_hash !== truthBinding.receipt_hash) {
        fail(`/historical_replay: physical receipt hash does not bind the ledger`);
        return undefined;
    }
    let after;
    try {
        after = parseJsonStrict(readFileSync(receipt.after.path));
    } catch (error) {
        fail(`/historical_replay/after: strict snapshot parse failed: ${error.message}`);
        return undefined;
    }
    const repository = receipt.repository.canonical_realpath;
    const temporaryRoot = realpathSync(mkdtempSync(join(tmpdir(), "vnext-value-v29t-replay-")));
    const worktree = join(temporaryRoot, "worktree");
    try {
        git(repository, ["worktree", "add", "--detach", "--force", worktree, receipt.repository.after_head], "materialize historical after head");
        const tracked = git(worktree, ["ls-files", "-z"], "historical replay tracked census")
            .toString("utf8").split("\0").filter(Boolean).sort(compareCanonicalText);
        const expectedPaths = (after.files ?? []).map(({ path }) => path);
        if (canonicalize(tracked) !== canonicalize(expectedPaths)) {
            throw new Error("materialized tracked paths do not equal the bound after snapshot");
        }
        const materialized = [];
        for (const row of after.files ?? []) {
            const path = resolve(worktree, row.path);
            if (!inside(worktree, path) || !existsSync(path)) throw new Error(`missing materialized path ${row.path}`);
            const metadata = lstatSync(path);
            if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(path) !== path) {
                throw new Error(`noncanonical materialized path ${row.path}`);
            }
            const bytes = readFileSync(path);
            materialized.push({
                path: row.path,
                mode: metadata.mode & 0o111 ? "100755" : "100644",
                bytes: bytes.length,
                sha256: sha256(bytes),
            });
        }
        if (canonicalize(materialized) !== canonicalize(after.files)) {
            throw new Error("materialized after-head bytes or modes do not equal the bound after snapshot");
        }
        const head = git(worktree, ["rev-parse", "HEAD"], "historical replay head").toString().trim();
        const status = git(worktree, ["status", "--porcelain=v1", "-z", "--untracked-files=all"], "historical replay status");
        if (head !== receipt.repository.after_head || status.length !== 0) {
            throw new Error("materialized historical worktree is not the exact clean after head");
        }
    } catch (error) {
        spawnSync("git", ["-C", repository, "worktree", "remove", "--force", worktree], { encoding: "utf8" });
        rmSync(temporaryRoot, { recursive: true, force: true });
        fail(`/historical_replay: ${error.message}`);
        return undefined;
    }
    replayCleanup = () => {
        spawnSync("git", ["-C", repository, "worktree", "remove", "--force", worktree], { encoding: "utf8" });
        rmSync(temporaryRoot, { recursive: true, force: true });
    };
    return {
        root: realpathSync(worktree),
        repository,
        after_head: receipt.repository.after_head,
        after_snapshot_hash: receipt.after.snapshot_hash,
        after_files_sha256: receipt.after.files_sha256,
    };
}

function cleanupReplay() {
    replayCleanup?.();
    replayCleanup = undefined;
}

function transitivePredecessors(waveId) {
    const seen = new Set();
    const visit = (current) => {
        const entry = waveContracts.get(current);
        if (!entry) throw new Error(`unknown wave contract ${current}`);
        for (const dependency of entry.contract.dependencies) {
            if (seen.has(dependency)) continue;
            seen.add(dependency);
            visit(dependency);
        }
    };
    visit(waveId);
    return seen;
}

function ownerEvidenceProjection(evidence) {
    return {
        path: evidence?.path,
        file_sha256: evidence?.file_sha256,
        return_hash: evidence?.return_hash,
    };
}

function rowDecision(row) {
    const decision = {
        decision_id: row.owner.decision_id,
        kind: row.kind,
        current_id: row.current_id,
        current_sha256: row.current_sha256,
        disposition: row.disposition,
        ...(row.disposition === "delete" ? { tombstone: row.tombstone } : { target_id: row.target_id }),
        decision_hash: row.owner.decision_hash,
    };
    return decision;
}

function introducedDecision(row) {
    return {
        decision_id: row.owner.decision_id,
        kind: row.kind,
        disposition: "introduce",
        target_id: row.target_id,
        decision_hash: row.owner.decision_hash,
    };
}

function conditionalDecision(row) {
    return {
        decision_id: row.decision_id,
        kind: "conditional-pair",
        source: row.source,
        test: row.test,
        outcome: row.outcome,
        decision_hash: row.decision_hash,
    };
}

function tombstoneDecision(row) {
    const name = row.specifier === "." ? "root" : row.specifier.slice(2);
    const decision = {
        decision_id: `package-tombstone:${name}`,
        kind: "package-tombstone",
        specifier: row.specifier,
        disposition: "tombstone",
        rationale: row.rationale,
        decision_hash: "",
    };
    decision.decision_hash = valueTargetDecisionHash("V00C", decision);
    return decision;
}

let ledger;
try {
    if (checkedCanonicalFile(ledgerPath, "/ledger/path")) ledger = parseJsonStrict(readFileSync(ledgerPath));
    const schema = parseJsonStrict(readFileSync(resolve(root, "value-target-transpose.schema.json")));
    if (ledger) failures.push(...validateJsonSchema(ledger, schema));
} catch (error) {
    fail(`/ledger: ${error.message}`);
}

if (ledger) checkedSelfHash(ledger, "manifest_hash", "");
logicalValueRoot = ledger?.value_root?.path;
const historicalAuthority = ledger && historicalReplay ? materializeHistoricalReplay(ledger) : undefined;
if (historicalAuthority) replayRoot = historicalAuthority.root;
const valueRoot = ledger && exactRepository(historicalReplay ? replayRoot : logicalValueRoot);
if (valueRoot && !historicalReplay) {
    try {
        const state = repositoryStateSha256(valueRoot);
        if (ledger.value_root.repository_state_sha256 !== state) fail(`/value_root/repository_state_sha256: live ${state}`);
    } catch (error) {
        fail(`/value_root/repository_state_sha256: ${error.message}`);
    }
}

const inventory = ledger && checkedJsonEvidence(ledger.current_inventory, "/current_inventory");
const target = ledger && checkedJsonEvidence(ledger.target_paths, "/target_paths");
const resolutions = ledger && checkedJsonEvidence(ledger.conditional_resolutions, "/conditional_resolutions");
const css = ledger && checkedJsonEvidence(ledger.css_execution_manifest, "/css_execution_manifest");
const publicSurface = ledger && checkedJsonEvidence(ledger.public_surface, "/public_surface");

// Reject ledger-local contradictions before invoking any subordinate validator.
// The positive path still composes every executable gate below, while adversarial
// mutations that cannot affect those gates do not pay for repeated package installs
// or universal-return replay.
function runStructuralPreflight() {
    if (!ledger || !inventory || !target || !resolutions || !css || !publicSurface) return;

    checkedSelfHash(inventory, "inventory_hash", "/current_inventory");
    checkedSelfHash(target, "manifest_sha256", "/target_paths");
    checkedSelfHash(resolutions, "manifest_hash", "/conditional_resolutions");
    checkedSelfHash(css, "manifest_hash", "/css_execution_manifest");
    checkedSelfHash(publicSurface, "manifest_hash", "/public_surface");

    if (inventory.repository?.path !== logicalValueRoot) {
        fail("/current_inventory/repository/path: historical inventory must name the exact final transpose Git root");
    }
    const cssBinding = target.authority?.library?.grammar_snapshot;
    if (cssBinding?.path !== "test/proof/p00/css-module-isomorphism.execution.json"
        || resolve(logicalValueRoot ?? "/", cssBinding?.path ?? "") !== ledger.css_execution_manifest.path
        || cssBinding?.file_sha256 !== ledger.css_execution_manifest.sha256
        || cssBinding?.manifest_hash !== css.manifest_hash) {
        fail("/target_paths/authority/library/grammar_snapshot: must exactly bind the ledger CSS execution manifest");
    }
    if (
        publicSurface.target_paths?.path !== ledger.target_paths.path
        || publicSurface.target_paths?.file_sha256 !== ledger.target_paths.sha256
        || publicSurface.target_paths?.manifest_sha256 !== target.manifest_sha256
    ) fail("/public_surface/target_paths: must exactly bind the ledger final target");

    const expected = new Map();
    const sources = target.library?.files ?? [];
    const tests = target.library?.test?.files ?? [];
    const exports = (publicSurface.exports ?? []).map(({ id }) => id);
    exactUnique(sources, "/target_paths/library/files");
    exactUnique(tests, "/target_paths/library/test/files");
    exactUnique(exports, "/public_surface/exports/id", { sorted: true });
    for (const id of sources) expected.set(`source\0${id}`, { kind: "source", id });
    for (const id of tests) expected.set(`test\0${id}`, { kind: "test", id });
    for (const id of exports) {
        const key = `export\0${id}`;
        if (expected.has(key)) fail(`/public_surface/exports: duplicate final target ${id}`);
        expected.set(key, { kind: "export", id });
    }

    const current = new Map();
    const currentKeys = (inventory.nodes ?? []).map(nodeKey);
    exactUnique(currentKeys, "/current_inventory/nodes", { sorted: true });
    for (const node of inventory.nodes ?? []) current.set(nodeKey(node), node);

    let predecessorClosure = new Set();
    try {
        predecessorClosure = transitivePredecessors("V29T");
    } catch (error) {
        fail(`/owners: ${error.message}`);
    }
    const ownerReturns = new Map();
    const bindOwner = (waveId, evidence, pointer) => {
        if (waveId === "V29T") fail(`${pointer}/wave_id: V29T cannot own semantic target decisions`);
        if (!predecessorClosure.has(waveId)) {
            fail(`${pointer}/wave_id: ${waveId} is not in V29T's transitive predecessor closure`);
        }
        const projection = ownerEvidenceProjection(evidence);
        const prior = ownerReturns.get(waveId);
        if (prior && canonicalize(prior) !== canonicalize(projection)) {
            fail(`${pointer}/return: each owner wave must use one exact cached return`);
        } else ownerReturns.set(waveId, projection);
    };
    bindOwner("V00A", ledger.current_inventory_return, "/current_inventory_return");
    for (const [index, row] of (resolutions.rows ?? []).entries()) {
        bindOwner(row.owner, row.return, `/conditional_resolutions/rows/${index}`);
        const decision = conditionalDecision(row);
        if (decision.decision_hash !== valueTargetDecisionHash(row.owner, decision)) {
            fail(`/conditional_resolutions/rows/${index}/decision_hash: invalid owner-annex projection`);
        }
    }
    bindOwner("V00C", publicSurface.tombstone_owner_return, "/public_surface/tombstone_owner_return");
    for (const [index, row] of (publicSurface.tombstones ?? []).entries()) {
        if (row.owner_wave_id !== "V00C"
            || row.owner_return_hash !== publicSurface.tombstone_owner_return?.return_hash) {
            fail(`/public_surface/tombstones/${index}: must use the same cached V00C return`);
        }
        const decision = tombstoneDecision(row);
        if (decision.decision_hash !== valueTargetDecisionHash("V00C", decision)) {
            fail(`/public_surface/tombstones/${index}/decision_hash: invalid owner-annex projection`);
        }
    }

    const rowKeys = (ledger.rows ?? []).map(rowKey);
    exactUnique(rowKeys, "/rows", { sorted: true });
    if (canonicalize(rowKeys) !== canonicalize([...current.keys()])) {
        fail("/rows: must cover every V00A current node exactly once");
    }
    const primaryTargets = new Set();
    const foldTargets = [];
    const deletedCurrent = new Set();
    const semanticReferences = new Map();
    const physicalRequired = new Set();
    for (const [index, row] of (ledger.rows ?? []).entries()) {
        const pointer = `/rows/${index}`;
        const node = current.get(rowKey(row));
        if (!node) continue;
        if (row.current_sha256 !== node.sha256) fail(`${pointer}/current_sha256: does not bind current inventory`);
        bindOwner(row.owner.wave_id, row.owner.return, `${pointer}/owner`);
        const decision = rowDecision(row);
        if (decision.decision_hash !== valueTargetDecisionHash(row.owner.wave_id, decision)) {
            fail(`${pointer}/owner/decision_hash: invalid owner-annex projection`);
        }
        const reference = {
            wave_id: row.owner.wave_id,
            decision_id: row.owner.decision_id,
            decision_hash: row.owner.decision_hash,
        };
        semanticReferences.set(decisionKey(reference), { row, pointer, introduced: false });
        if (row.disposition !== "keep") physicalRequired.add(decisionKey(reference));
        if (row.disposition === "keep" && row.target_id !== row.current_id) {
            fail(`${pointer}: keep requires identical current and target IDs`);
        }
        if (["move", "fold"].includes(row.disposition) && row.target_id === row.current_id) {
            fail(`${pointer}: ${row.disposition} requires distinct IDs`);
        }
        if (row.disposition === "delete") {
            deletedCurrent.add(rowKey(row));
            if (expected.has(rowKey(row))) {
                fail(`${pointer}: delete/reintroduce of the same target coordinate is forbidden`);
            }
            continue;
        }
        const coordinate = targetKey(row);
        if (!expected.has(coordinate)) fail(`${pointer}/target_id: invented or wrong-kind target`);
        if (row.disposition === "fold") foldTargets.push([pointer, coordinate]);
        else if (primaryTargets.has(coordinate)) fail(`${pointer}/target_id: duplicate primary target owner`);
        else primaryTargets.add(coordinate);
    }

    const introducedKeys = (ledger.introduced_targets ?? []).map(targetKey);
    exactUnique(introducedKeys, "/introduced_targets", { sorted: true });
    for (const [index, row] of (ledger.introduced_targets ?? []).entries()) {
        const pointer = `/introduced_targets/${index}`;
        const coordinate = targetKey(row);
        if (!expected.has(coordinate)) fail(`${pointer}/target_id: invented or wrong-kind target`);
        if (current.has(coordinate) || deletedCurrent.has(coordinate)) {
            fail(`${pointer}/target_id: target is not genuinely introduced`);
        }
        if (primaryTargets.has(coordinate)) fail(`${pointer}/target_id: duplicate primary target owner`);
        primaryTargets.add(coordinate);
        bindOwner(row.owner.wave_id, row.owner.return, `${pointer}/owner`);
        const decision = introducedDecision(row);
        if (decision.decision_hash !== valueTargetDecisionHash(row.owner.wave_id, decision)) {
            fail(`${pointer}/owner/decision_hash: invalid owner-annex projection`);
        }
        const reference = {
            wave_id: row.owner.wave_id,
            decision_id: row.owner.decision_id,
            decision_hash: row.owner.decision_hash,
        };
        semanticReferences.set(decisionKey(reference), { row, pointer, introduced: true });
        physicalRequired.add(decisionKey(reference));
    }
    for (const [pointer, coordinate] of foldTargets) {
        if (!primaryTargets.has(coordinate)) fail(`${pointer}/target_id: fold target lacks a primary current or introduced owner`);
    }
    if (canonicalize([...primaryTargets].sort(compareCanonicalText)) !== canonicalize([...expected.keys()].sort(compareCanonicalText))) {
        fail("/rows+/introduced_targets: primary owners must cover every final target exactly once");
    }

    const expectedResult = { sources, tests, exports };
    if (canonicalize(ledger.result) !== canonicalize(expectedResult)) {
        fail("/result: must exactly project final source/test/export authority vectors");
    }

    let physical;
    const physicalPath = checkedEvidence(ledger.physical_truth?.receipt, "/physical_truth/receipt");
    if (physicalPath) {
        try {
            physical = parseJsonStrict(readFileSync(physicalPath));
        } catch (error) {
            fail(`/physical_truth/receipt: strict JSON parse failed: ${error.message}`);
        }
    }
    if (!physical) return;
    const observed = { deleted: [], added: [], modified: [] };
    const boundPaths = new Set();
    const usedReferences = new Set();
    for (const [index, effect] of (ledger.physical_truth.effects ?? []).entries()) {
        const pointer = `/physical_truth/effects/${index}`;
        if (![...effect.deleted, ...effect.added, ...effect.modified].length) {
            fail(`${pointer}: effect group must bind at least one physical change`);
        }
        for (const kind of ["deleted", "added", "modified"]) {
            exactUnique(effect[kind], `${pointer}/${kind}`, { sorted: true });
            for (const path of effect[kind]) {
                if (boundPaths.has(path)) fail(`${pointer}/${kind}: physical path ${path} is multiply bound`);
                boundPaths.add(path);
                observed[kind].push(path);
            }
        }
        const references = effect.decisions.map(decisionKey);
        exactUnique(references, `${pointer}/decisions`, { sorted: true });
        for (const [decisionIndex, reference] of effect.decisions.entries()) {
            const key = decisionKey(reference);
            if (!semanticReferences.has(key)) {
                fail(`${pointer}/decisions/${decisionIndex}: unbound or forged semantic decision reference`);
            }
            if (usedReferences.has(key)) {
                fail(`${pointer}/decisions/${decisionIndex}: semantic decision is split across effect groups`);
            }
            usedReferences.add(key);
        }
    }
    for (const kind of ["deleted", "added", "modified"]) {
        observed[kind].sort(compareCanonicalText);
        if (canonicalize(observed[kind]) !== canonicalize(physical[`${kind}_paths`])) {
            fail(`/physical_truth/effects/${kind}: must exactly bind every executable Git delta path`);
        }
    }
    for (const key of physicalRequired) {
        if (!usedReferences.has(key)) {
            fail(`/physical_truth/effects: non-keep semantic decision ${key.replaceAll("\0", "/")} has no physical effect binding`);
        }
    }
}

runStructuralPreflight();
if (failures.length) {
    cleanupReplay();
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const inventoryReceipt = ledger?.current_inventory?.path && parseValidatorReceipt(
    "/current_inventory",
    inventoryValidator,
    ["--inventory", materializedPath(ledger.current_inventory.path), "--mode", "replay"],
);
const resolutionsReceipt = ledger?.conditional_resolutions?.path && parseValidatorReceipt(
    "/conditional_resolutions",
    resolutionsValidator,
    ["--resolutions", materializedPath(ledger.conditional_resolutions.path)],
);
const cssReceipt = valueRoot && ledger?.css_execution_manifest?.path && parseValidatorReceipt(
    "/css_execution_manifest",
    cssValidator,
    [
        "--manifest", materializedPath(ledger.css_execution_manifest.path),
        "--typescript-root", resolve(valueRoot, "src/css/grammar"),
        "--test-root", resolve(valueRoot, "test/src/css/grammar"),
    ],
);
const targetReceipt = valueRoot && ledger?.target_paths?.path && ledger?.css_execution_manifest?.path
    && ledger?.conditional_resolutions?.path && parseValidatorReceipt(
        "/target_paths",
        targetValidator,
        [
            "--value-manifest", materializedPath(ledger.target_paths.path),
            "--value-root", valueRoot,
            "--css-manifest", materializedPath(ledger.css_execution_manifest.path),
            "--conditional-resolutions", materializedPath(ledger.conditional_resolutions.path),
            "--final",
        ],
    );
let publicReceipt;

if (inventoryReceipt && (
    inventoryReceipt.mode !== "replay"
    || inventoryReceipt.inventory_path !== materializedPath(ledger.current_inventory.path)
    || inventoryReceipt.inventory_file_sha256 !== ledger.current_inventory.sha256
    || inventoryReceipt.inventory_hash !== inventory?.inventory_hash
)) fail("/current_inventory: replay receipt does not bind the exact ledger artifact");
if (resolutionsReceipt && (
    resolutionsReceipt.resolutions_path !== materializedPath(ledger.conditional_resolutions.path)
    || resolutionsReceipt.resolutions_file_sha256 !== ledger.conditional_resolutions.sha256
    || resolutionsReceipt.manifest_hash !== resolutions?.manifest_hash
)) fail("/conditional_resolutions: validation receipt does not bind the exact ledger artifact");
if (cssReceipt && cssReceipt.manifest_hash !== css?.manifest_hash) {
    fail("/css_execution_manifest: validation receipt does not bind the exact CSS manifest");
}
if (targetReceipt && (
    targetReceipt.value?.library?.mode !== "final"
    || targetReceipt.value?.library?.topology !== "exact"
    || targetReceipt.value?.library?.conditional_pairs !== 0
    || targetReceipt.value?.library?.conditional_resolutions_sha256 !== resolutions?.manifest_hash
    || targetReceipt.value?.manifest_sha256 !== target?.manifest_sha256
)) fail("/target_paths: final validation receipt does not bind the exact target/CSS/resolutions join");

if (inventory) {
    checkedSelfHash(inventory, "inventory_hash", "/current_inventory");
    if (inventory.repository?.path !== logicalValueRoot) {
        fail("/current_inventory/repository/path: historical inventory must name the exact final transpose Git root");
    }
}
if (target) checkedSelfHash(target, "manifest_sha256", "/target_paths");
if (resolutions) checkedSelfHash(resolutions, "manifest_hash", "/conditional_resolutions");
if (css) checkedSelfHash(css, "manifest_hash", "/css_execution_manifest");
if (publicSurface) checkedSelfHash(publicSurface, "manifest_hash", "/public_surface");

if (target && css) {
    const binding = target.authority?.library?.grammar_snapshot;
    if (binding?.path !== "test/proof/p00/css-module-isomorphism.execution.json"
        || resolve(logicalValueRoot ?? "/", binding?.path ?? "") !== ledger.css_execution_manifest.path
        || binding?.file_sha256 !== ledger.css_execution_manifest.sha256
        || binding?.manifest_hash !== css.manifest_hash) {
        fail("/target_paths/authority/library/grammar_snapshot: must exactly bind the ledger CSS execution manifest");
    }
}
if (publicSurface && target && (
    publicSurface.target_paths?.path !== ledger.target_paths.path
    || publicSurface.target_paths?.file_sha256 !== ledger.target_paths.sha256
    || publicSurface.target_paths?.manifest_sha256 !== target.manifest_sha256
)) fail("/public_surface/target_paths: must exactly bind the ledger final target");

const universalReturnCache = new Map();
const ownerReturnByWave = new Map();
const typedOwners = new Map();
const expectedDecisions = new Map();
const ownerAuthorizationIdentities = new Map();
let predecessors = new Set();
try {
    predecessors = transitivePredecessors("V29T");
} catch (error) {
    fail(`/owners: ${error.message}`);
}

function bindWaveReturn(waveId, evidence, pointer, { typed = true } = {}) {
    if (waveId === "V29T") fail(`${pointer}/wave_id: V29T cannot own semantic target decisions`);
    if (!predecessors.has(waveId)) fail(`${pointer}/wave_id: ${waveId} is not in V29T's transitive predecessor closure`);
    const projection = ownerEvidenceProjection(evidence);
    const previous = ownerReturnByWave.get(waveId);
    if (previous && canonicalize(previous) !== canonicalize(projection)) {
        fail(`${pointer}/return: each owner wave must use one exact cached return`);
    } else ownerReturnByWave.set(waveId, projection);
    const owner = { wave_id: waveId, return: projection };
    const loaded = typed
        ? loadValueTargetOwnerReturn(owner, pointer, fail, universalReturnCache)
        : loadUniversalWaveReturn(owner, pointer, fail, universalReturnCache);
    mergeAuthorizationClosure(loaded, ownerAuthorizationIdentities, pointer, fail);
    if (typed && loaded) {
        if (loaded.decision_authorized !== true) fail(`${pointer}/return: typed owner helper did not authorize decisions`);
        typedOwners.set(waveId, loaded);
    }
    return loaded;
}

function expectOwnerDecision(waveId, evidence, decision, pointer) {
    const loaded = bindWaveReturn(waveId, evidence, pointer);
    if (!loaded) return;
    if (decision.decision_hash !== valueTargetDecisionHash(waveId, decision)) {
        fail(`${pointer}/decision_hash: invalid owner-annex projection`);
    }
    const ownerDecision = loaded.decisions.get(decision.decision_id);
    if (!ownerDecision || canonicalize(ownerDecision) !== canonicalize(decision)) {
        fail(`${pointer}: row must exactly project its universally validated owner decision annex`);
    }
    const ownerExpected = expectedDecisions.get(waveId) ?? new Map();
    if (ownerExpected.has(decision.decision_id)) fail(`${pointer}/decision_id: decision is bound more than once`);
    else ownerExpected.set(decision.decision_id, decision);
    expectedDecisions.set(waveId, ownerExpected);
}

let inventoryReturn;
if (ledger?.current_inventory_return) {
    const returnPath = checkedEvidence(ledger.current_inventory_return, "/current_inventory_return");
    if (returnPath) {
        inventoryReturn = bindWaveReturn("V00A", ledger.current_inventory_return, "/current_inventory_return", { typed: false });
        if (inventoryReturn?.returned.status !== "COMPLETE") fail("/current_inventory_return/status: terminal COMPLETE V00A return required");
        const annex = inventoryReturn?.returned.annexes?.["value-current-inventory"];
        if (
            annex?.inventory?.path !== ledger.current_inventory.path
            || annex?.inventory?.file_sha256 !== ledger.current_inventory.sha256
            || annex?.inventory?.contract_hash !== inventory?.inventory_hash
        ) fail("/current_inventory_return/annexes/value-current-inventory/inventory: must exactly bind the ledger inventory");
        const replayPath = checkedEvidence(annex?.replay_receipt, "/current_inventory_return/annexes/value-current-inventory/replay_receipt");
        if (replayPath) {
            try {
                const replay = parseJsonStrict(readFileSync(replayPath));
                if (canonicalize(replay) !== canonicalize(inventoryReceipt)) {
                    fail("/current_inventory_return/annexes/value-current-inventory/replay_receipt: differs from the transpose replay validation");
                }
            } catch (error) {
                fail(`/current_inventory_return/annexes/value-current-inventory/replay_receipt: ${error.message}`);
            }
        }
    }
}

if (resolutions) {
    for (const [index, row] of (resolutions.rows ?? []).entries()) {
        expectOwnerDecision(row.owner, row.return, conditionalDecision(row), `/conditional_resolutions/rows/${index}`);
    }
}

if (publicSurface) {
    const v00cEvidence = publicSurface.tombstone_owner_return;
    const loaded = bindWaveReturn("V00C", v00cEvidence, "/public_surface/tombstone_owner_return");
    if (loaded?.returned.status !== "COMPLETE") fail("/public_surface/tombstone_owner_return/status: terminal COMPLETE V00C return required");
    for (const [index, row] of (publicSurface.tombstones ?? []).entries()) {
        if (row.owner_wave_id !== "V00C" || row.owner_return_hash !== v00cEvidence?.return_hash) {
            fail(`/public_surface/tombstones/${index}: must use the same cached V00C return`);
        }
        expectOwnerDecision("V00C", v00cEvidence, tombstoneDecision(row), `/public_surface/tombstones/${index}`);
    }
}

const expectedTargets = new Map();
if (target) {
    const sources = target.library?.files ?? [];
    const tests = target.library?.test?.files ?? [];
    exactUnique(sources, "/target_paths/library/files");
    exactUnique(tests, "/target_paths/library/test/files");
    for (const id of sources) expectedTargets.set(`source\0${id}`, { kind: "source", id });
    for (const id of tests) expectedTargets.set(`test\0${id}`, { kind: "test", id });
}
if (publicSurface) {
    const exportIds = (publicSurface.exports ?? []).map(({ id }) => id);
    exactUnique(exportIds, "/public_surface/exports/id", { sorted: true });
    for (const id of exportIds) {
        const key = `export\0${id}`;
        if (expectedTargets.has(key)) fail(`/public_surface/exports: duplicate final target ${id}`);
        expectedTargets.set(key, { kind: "export", id });
    }
}

const current = new Map();
if (inventory) {
    const keys = (inventory.nodes ?? []).map(nodeKey);
    exactUnique(keys, "/current_inventory/nodes", { sorted: true });
    for (const node of inventory.nodes ?? []) current.set(nodeKey(node), node);
}

const semanticDecisionReferences = new Map();
const physicalRequired = new Set();
if (ledger && inventory) {
    const keys = ledger.rows.map(rowKey);
    exactUnique(keys, "/rows", { sorted: true });
    if (canonicalize(keys) !== canonicalize([...current.keys()])) fail("/rows: must cover every V00A current node exactly once");
    const primaryTargets = new Set();
    const foldTargets = [];
    const deletedCurrent = new Set();
    for (const [index, row] of ledger.rows.entries()) {
        const pointer = `/rows/${index}`;
        const node = current.get(rowKey(row));
        if (!node) continue;
        if (row.current_sha256 !== node.sha256) fail(`${pointer}/current_sha256: does not bind current inventory`);
        const decision = rowDecision(row);
        if (row.owner.decision_hash !== decision.decision_hash) fail(`${pointer}/owner/decision_hash: projection mismatch`);
        expectOwnerDecision(row.owner.wave_id, row.owner.return, decision, `${pointer}/owner`);
        const reference = { wave_id: row.owner.wave_id, decision_id: row.owner.decision_id, decision_hash: row.owner.decision_hash };
        semanticDecisionReferences.set(decisionKey(reference), { reference, row, pointer, introduced: false });
        if (row.disposition !== "keep") physicalRequired.add(decisionKey(reference));
        if (row.disposition === "keep" && row.target_id !== row.current_id) fail(`${pointer}: keep requires identical current and target IDs`);
        if (["move", "fold"].includes(row.disposition) && row.target_id === row.current_id) fail(`${pointer}: ${row.disposition} requires distinct IDs`);
        if (row.disposition === "delete") {
            deletedCurrent.add(rowKey(row));
            if (expectedTargets.has(rowKey(row))) fail(`${pointer}: delete/reintroduce of the same target coordinate is forbidden`);
            continue;
        }
        const targetCoordinate = targetKey(row);
        if (!expectedTargets.has(targetCoordinate)) fail(`${pointer}/target_id: invented or wrong-kind target`);
        if (row.disposition === "fold") foldTargets.push([pointer, targetCoordinate]);
        else if (primaryTargets.has(targetCoordinate)) fail(`${pointer}/target_id: duplicate primary target owner`);
        else primaryTargets.add(targetCoordinate);
    }

    const introducedKeys = ledger.introduced_targets.map(targetKey);
    exactUnique(introducedKeys, "/introduced_targets", { sorted: true });
    for (const [index, row] of ledger.introduced_targets.entries()) {
        const pointer = `/introduced_targets/${index}`;
        const coordinate = targetKey(row);
        if (!expectedTargets.has(coordinate)) fail(`${pointer}/target_id: invented or wrong-kind target`);
        if (current.has(coordinate) || deletedCurrent.has(coordinate)) fail(`${pointer}/target_id: target is not genuinely introduced`);
        if (primaryTargets.has(coordinate)) fail(`${pointer}/target_id: duplicate primary target owner`);
        primaryTargets.add(coordinate);
        const decision = introducedDecision(row);
        expectOwnerDecision(row.owner.wave_id, row.owner.return, decision, `${pointer}/owner`);
        const reference = { wave_id: row.owner.wave_id, decision_id: row.owner.decision_id, decision_hash: row.owner.decision_hash };
        semanticDecisionReferences.set(decisionKey(reference), { reference, row, pointer, introduced: true });
        physicalRequired.add(decisionKey(reference));
    }
    for (const [pointer, coordinate] of foldTargets) {
        if (!primaryTargets.has(coordinate)) fail(`${pointer}/target_id: fold target lacks a primary current or introduced owner`);
    }
    if (canonicalize([...primaryTargets].sort(compareCanonicalText)) !== canonicalize([...expectedTargets.keys()].sort(compareCanonicalText))) {
        fail("/rows+/introduced_targets: primary owners must cover every final target exactly once");
    }
}

for (const [waveId, loaded] of typedOwners) {
    const actual = [...loaded.decisions.values()].sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id));
    const expected = [...(expectedDecisions.get(waveId)?.values() ?? [])].sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id));
    if (canonicalize(actual) !== canonicalize(expected)) {
        fail(`/owners/${waveId}: typed target-disposition annex must exactly equal all ledger, resolution, and package-tombstone projections`);
    }
}

let physicalReceipt;
if (ledger?.physical_truth?.receipt) {
    const receiptPath = checkedEvidence(ledger.physical_truth.receipt, "/physical_truth/receipt");
    if (receiptPath) {
        try {
            const verified = validateDeletionTruthReceipt(receiptPath, { requireLiveAfter: !historicalReplay });
            physicalReceipt = verified.receipt;
            if (verified.file_sha256 !== ledger.physical_truth.receipt.file_sha256) {
                fail(`/physical_truth/receipt/file_sha256: computed ${verified.file_sha256}`);
            }
            if (physicalReceipt.receipt_hash !== ledger.physical_truth.receipt.receipt_hash) {
                fail(`/physical_truth/receipt/receipt_hash: computed ${physicalReceipt.receipt_hash}`);
            }
            if (physicalReceipt.repository.canonical_realpath !== logicalValueRoot) {
                fail("/physical_truth/receipt/repository: must measure the exact ledger value root");
            }
            if (inventory && (
                physicalReceipt.repository.before_head !== inventory.repository.head
                || physicalReceipt.repository.branch !== inventory.repository.branch
            )) {
                fail("/physical_truth/receipt/repository: before epoch must equal the V00A inventory Git head and branch");
            }
        } catch (error) {
            fail(`/physical_truth/receipt: executable Git truth verification failed: ${error.message}`);
        }
    }
}

if (ledger && physicalReceipt) {
    const observedByKind = { deleted: [], added: [], modified: [] };
    const boundPaths = new Set();
    const usedDecisionReferences = new Set();
    for (const [index, effect] of ledger.physical_truth.effects.entries()) {
        const pointer = `/physical_truth/effects/${index}`;
        const paths = [...effect.deleted, ...effect.added, ...effect.modified];
        if (!paths.length) fail(`${pointer}: effect group must bind at least one physical change`);
        for (const kind of ["deleted", "added", "modified"]) {
            exactUnique(effect[kind], `${pointer}/${kind}`, { sorted: true });
            for (const path of effect[kind]) {
                if (boundPaths.has(path)) fail(`${pointer}/${kind}: physical path ${path} is multiply bound`);
                boundPaths.add(path);
                observedByKind[kind].push(path);
            }
        }
        const references = effect.decisions.map(decisionKey);
        exactUnique(references, `${pointer}/decisions`, { sorted: true });
        for (const [decisionIndex, reference] of effect.decisions.entries()) {
            const key = decisionKey(reference);
            if (!semanticDecisionReferences.has(key)) fail(`${pointer}/decisions/${decisionIndex}: unbound or forged semantic decision reference`);
            if (usedDecisionReferences.has(key)) fail(`${pointer}/decisions/${decisionIndex}: semantic decision is split across effect groups`);
            usedDecisionReferences.add(key);
        }
    }
    for (const kind of ["deleted", "added", "modified"]) {
        observedByKind[kind].sort(compareCanonicalText);
        const expected = physicalReceipt[`${kind}_paths`];
        if (canonicalize(observedByKind[kind]) !== canonicalize(expected)) {
            fail(`/physical_truth/effects/${kind}: must exactly bind every executable Git delta path`);
        }
    }
    for (const key of physicalRequired) {
        if (!usedDecisionReferences.has(key)) fail(`/physical_truth/effects: non-keep semantic decision ${key.replaceAll("\0", "/")} has no physical effect binding`);
    }
    for (const key of usedDecisionReferences) {
        const bound = semanticDecisionReferences.get(key);
        const row = bound.row;
        const groups = ledger.physical_truth.effects.filter((effect) => effect.decisions.some((reference) => decisionKey(reference) === key));
        const changed = new Set(groups.flatMap((effect) => [...effect.deleted, ...effect.added, ...effect.modified]));
        if (!bound.introduced && row.disposition === "keep" && changed.has(row.current_id)) {
            fail(`${bound.pointer}: keep cannot authorize a physical change to its current path`);
        }
        if (!bound.introduced && ["delete", "move", "fold"].includes(row.disposition)
            && ["source", "test"].includes(row.kind) && !changed.has(row.current_id)) {
            fail(`${bound.pointer}: ${row.disposition} must bind deletion of its exact current path`);
        }
        if (!bound.introduced && row.disposition === "move" && ["source", "test"].includes(row.kind)
            && !changed.has(row.target_id)) {
            fail(`${bound.pointer}: move must bind addition of its exact target path`);
        }
        if (bound.introduced && ["source", "test"].includes(row.kind) && !changed.has(row.target_id)) {
            fail(`${bound.pointer}: introduced target must bind its exact added path`);
        }
    }
}

if (ledger && target && publicSurface) {
    const expectedResult = {
        sources: target.library.files,
        tests: target.library.test.files,
        exports: publicSurface.exports.map(({ id }) => id),
    };
    if (canonicalize(ledger.result) !== canonicalize(expectedResult)) {
        fail("/result: must exactly project final source/test/export authority vectors");
    }
}

if (failures.length === 0 && ledger?.public_surface?.path) {
    publicReceipt = parseValidatorReceipt(
        "/public_surface",
        publicValidator,
        ["--manifest", materializedPath(ledger.public_surface.path)],
    );
    if (publicReceipt && publicReceipt.manifest_hash !== publicSurface?.manifest_hash) {
        fail("/public_surface: validation receipt does not bind the exact public manifest");
    }
}

if (failures.length) {
    cleanupReplay();
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const ownerReturns = [...ownerReturnByWave].map(([wave_id, evidence]) => ({
    wave_id,
    ...evidence,
    status: universalReturnCache.get(`${evidence.path}\0${evidence.file_sha256}\0${evidence.return_hash}`)?.returned.status,
})).sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id));
const ownerAuthorizationNodes = [...ownerAuthorizationIdentities.values()]
    .sort((left, right) => compareCanonicalText(`${left.wave_id}\0${left.return_hash}`, `${right.wave_id}\0${right.return_hash}`));
const receipt = {
    schema: "vnext-value-target-transpose-validation/1",
    ledger_path: ledgerPath,
    ledger_file_sha256: fileHash(ledgerPath),
    manifest_hash: ledger.manifest_hash,
    value_root: ledger.value_root,
    validators: {
        current_inventory: inventoryReceipt,
        css_execution_manifest: cssReceipt,
        conditional_resolutions: resolutionsReceipt,
        target_paths: targetReceipt,
        public_surface: publicReceipt,
        physical_truth: {
            path: ledger.physical_truth.receipt.path,
            file_sha256: ledger.physical_truth.receipt.file_sha256,
            receipt_hash: ledger.physical_truth.receipt.receipt_hash,
            delta_sha256: physicalReceipt.delta_sha256,
        },
    },
    owner_returns: ownerReturns,
    owner_authorization: {
        nodes: ownerAuthorizationNodes,
        nodes_sha256: sha256(canonicalize(ownerAuthorizationNodes)),
    },
    counts: {
        current_nodes: inventory.nodes.length,
        final_targets: expectedTargets.size,
        deletions: ledger.rows.filter(({ disposition }) => disposition === "delete").length,
        moves: ledger.rows.filter(({ disposition }) => disposition === "move").length,
        folds: ledger.rows.filter(({ disposition }) => disposition === "fold").length,
        introduced: ledger.introduced_targets.length,
        physical_paths: physicalReceipt.counts.deleted + physicalReceipt.counts.added + physicalReceipt.counts.modified,
    },
    joins_sha256: sha256(canonicalize({
        current: inventory.nodes.map(nodeKey),
        target: [...expectedTargets.keys()],
        decisions: [...semanticDecisionReferences.keys()].sort(compareCanonicalText),
        deleted: physicalReceipt.deleted_paths,
        added: physicalReceipt.added_paths,
        modified: physicalReceipt.modified_paths,
    })),
};
if (historicalReplay) {
    receipt.historical_replay = {
        completion_eligible: false,
        authority_root: logicalValueRoot,
        after_head: historicalAuthority.after_head,
        after_snapshot_hash: historicalAuthority.after_snapshot_hash,
        after_files_sha256: historicalAuthority.after_files_sha256,
    };
}
receipt.receipt_hash = sha256(canonicalize(receipt));
cleanupReplay();
process.stdout.write(`${JSON.stringify(receipt)}\n`);
