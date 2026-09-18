#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { canonicalize, parseJsonStrict } from "./json-contract.mjs";
import { consumerFixtureRootIds } from "./consumer-universe-fixture.mjs";
import { createValueTargetTransposeFixture } from "./value-target-transpose-fixture.mjs";
import { validateAuthorizationClosure } from "./value-target-owner-return.mjs";

const validator = realpathSync(new URL("validate-value-target-transpose.mjs", import.meta.url).pathname);
const returnValidator = realpathSync(new URL("validate-return.mjs", import.meta.url).pathname);
const canonicalBoundsAuthority = realpathSync(new URL("../CONSUMER-UNIVERSE-BOUNDS.json", import.meta.url).pathname);
const directory = realpathSync(mkdtempSync(join(tmpdir(), "vnext-value-target-transpose-")));
const failures = [];
let positives = 0;
let adversarialRejections = 0;
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
let fixture;
let universal;

function finalize(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    value[member] = sha256(canonicalize(preimage));
    return value;
}

function writeJson(path, value) {
    writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function fileHash(path) {
    return sha256(readFileSync(path));
}

function git(repository, args) {
    const result = spawnSync("git", ["-C", repository, ...args], { encoding: "utf8" });
    if (result.status !== 0) throw new Error(`git ${args.join(" ")} failed: ${result.stderr || result.stdout}`);
    return result.stdout.trim();
}

function invoke(path) {
    return spawnSync(process.execPath, [
        validator,
        "--ledger", path,
        ...(fixture?.captureAuthorityArgs() ?? []),
    ], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
}

function runLedger(name, ledger) {
    finalize(ledger, "manifest_hash");
    const path = join(directory, `${name}.ledger.json`);
    writeJson(path, ledger);
    return invoke(realpathSync(path));
}

function reject(name, base, mutate, fragment) {
    const ledger = structuredClone(base);
    mutate(ledger);
    const result = runLedger(name, ledger);
    const output = `${result.stderr || ""}${result.stdout || ""}`;
    if (result.status === 0 || !output.includes(fragment)) {
        failures.push(`${name} did not reject ${JSON.stringify(fragment)}:\n${output}`);
    } else adversarialRejections += 1;
}

function artifactCopy(name, value, hashMember, mutate) {
    const copy = structuredClone(value);
    mutate(copy);
    finalize(copy, hashMember);
    const path = join(directory, `${name}.artifact.json`);
    writeJson(path, copy);
    return { value: copy, path: realpathSync(path), sha256: fileHash(path) };
}

function ownerReturnWithMissingInventoryAncestor(ownerReturn) {
    const returned = parseJsonStrict(readFileSync(ownerReturn.path));
    const binding = returned.scope.dependency_returns.find(({ wave_id }) => wave_id === "V00A");
    const ancestor = parseJsonStrict(readFileSync(binding.path));
    delete ancestor.annexes["value-current-inventory"];
    finalize(ancestor, "return_hash");
    const ancestorPath = join(directory, "transpose-v00a-missing-inventory.return.json");
    writeJson(ancestorPath, ancestor);
    binding.path = realpathSync(ancestorPath);
    binding.file_sha256 = fileHash(binding.path);
    binding.return_hash = ancestor.return_hash;
    finalize(returned, "return_hash");
    const returnPath = join(directory, "transpose-v00c-missing-inventory-ancestor.return.json");
    writeJson(returnPath, returned);
    const canonicalPath = realpathSync(returnPath);
    return { path: canonicalPath, file_sha256: fileHash(canonicalPath), return_hash: returned.return_hash };
}

try {
    fixture = createValueTargetTransposeFixture({ tempRoot: directory });
    const consumerRoots = fixture.consumer.receipt.roots;
    const consumerEdges = fixture.consumer.receipt.edges;
    if (canonicalize(consumerRoots.map(({ id }) => id))
            !== canonicalize(consumerFixtureRootIds)
        || consumerRoots.some(({ status }) => status !== "included")
        || consumerEdges.length !== 1
        || consumerEdges[0].source !== "value"
        || consumerEdges[0].target !== "parse-that"
        || consumerEdges[0].package !== "@mkbabb/parse-that"
        || consumerEdges[0].kind !== "runtime"
        || consumerEdges[0].observations.length !== fixture.artifacts.css.value.modules.length
        || fixture.consumer.containmentPreflight !== true) {
        failures.push("V29T fixture did not produce the exact contained fifteen-root parse-that consumer epoch");
    }
    if (!fixture.preflight.v00aLiveCaptureReplay || !fixture.preflight.forgedReplayRejected) {
        failures.push("V00A live capture/replay preflight did not execute both modes and reject its forged replay");
    } else {
        positives += 1;
        adversarialRejections += 1;
    }
    const base = fixture.ledger;
    const positive = invoke(fixture.ledgerPath);
    if (positive.status !== 0) failures.push(`positive real transpose rejected:\n${positive.stderr || positive.stdout}`);
    else {
        const receipt = JSON.parse(positive.stdout);
        if (
            receipt.schema !== "vnext-value-target-transpose-validation/1"
            || receipt.counts.current_nodes !== 222
            || receipt.counts.final_targets !== 222
            || receipt.counts.moves !== 2
            || receipt.counts.physical_paths !== 4
            || receipt.validators.current_inventory.mode !== "replay"
            || receipt.validators.target_paths.value.library.mode !== "final"
            || receipt.validators.public_surface.execution.install.link_count !== 0
        ) failures.push(`positive composed receipt has wrong projections: ${positive.stdout}`);
        else {
            positives += 1;
            universal = fixture.writeV29TUniversalReturn(receipt);
            const universalPositive = spawnSync(process.execPath, [
                returnValidator,
                universal.path,
                "--immutable-authority",
                ...fixture.captureAuthorityArgs(),
            ], {
                encoding: "utf8",
                maxBuffer: 256 * 1024 * 1024,
            });
            let authorizationReceipt;
            try {
                authorizationReceipt = JSON.parse(universalPositive.stdout);
            } catch {
                authorizationReceipt = undefined;
            }
            if (universalPositive.status !== 0
                || authorizationReceipt?.mode !== "offline-immutable-authority"
                || authorizationReceipt?.completion_eligible !== false
                || authorizationReceipt?.immutable_authority_eligible !== true
                || !Array.isArray(authorizationReceipt?.authorization_closure?.nodes)
                || authorizationReceipt.authorization_closure.offline_validation_count
                    !== authorizationReceipt.authorization_closure.nodes.length - 1) {
                failures.push(`positive universal V29T transpose return rejected:\n${universalPositive.stderr || universalPositive.stdout}`);
            } else {
                const closure = authorizationReceipt.authorization_closure;
                const waves = closure.nodes.map(({ wave_id }) => wave_id);
                if (new Set(waves).size !== waves.length || closure.edge_count <= closure.node_count - 1) {
                    failures.push("immutable authority did not deduplicate its diamond closure by immutable wave identity");
                } else {
                    positives += 1;
                    const wrongEdgeStatus = structuredClone(closure);
                    wrongEdgeStatus.edges[0].status = wrongEdgeStatus.edges[0].status === "COMPLETE" ? "KEEP" : "COMPLETE";
                    const edgeFailures = [];
                    validateAuthorizationClosure(wrongEdgeStatus, closure.nodes.find(({ wave_id }) => wave_id === "V29T"), "/wrong-edge-status", (failure) => edgeFailures.push(failure));
                    if (!edgeFailures.some((failure) => failure.includes("edge does not bind exact closure nodes"))) {
                        failures.push("authorization closure accepted an edge-specific status mismatch");
                    } else adversarialRejections += 1;
                    const nonValue = closure.nodes.find(({ wave_id }) => !wave_id.startsWith("V"));
                    if (!nonValue) failures.push("V29T fixture does not exercise a cross-band dependency root");
                    else {
                        const nonValueResult = spawnSync(process.execPath, [
                            returnValidator,
                            nonValue.path,
                            "--immutable-authority",
                            ...fixture.captureAuthorityArgs(),
                        ], {
                            encoding: "utf8",
                            maxBuffer: 256 * 1024 * 1024,
                        });
                        let nonValueReceipt;
                        try {
                            nonValueReceipt = parseJsonStrict(nonValueResult.stdout.trim());
                        } catch {
                            nonValueReceipt = undefined;
                        }
                        if (nonValueResult.status !== 0
                            || nonValueReceipt?.mode !== "offline-immutable-authority"
                            || nonValueReceipt?.wave_id !== nonValue.wave_id
                            || nonValueReceipt?.immutable_authority_eligible !== true) {
                            failures.push(`band-neutral immutable authority rejected ${nonValue.wave_id}: ${nonValueResult.stderr}${nonValueResult.stdout}`);
                        } else positives += 1;
                    }

                    const symlinkPath = join(directory, "v29t-root-symlink.return.json");
                    symlinkSync(universal.path, symlinkPath);
                    for (const mode of [[], ["--offline"], ["--immutable-authority"]]) {
                        const symlinkResult = spawnSync(process.execPath, [
                            returnValidator,
                            symlinkPath,
                            ...mode,
                            ...(mode.length ? fixture.captureAuthorityArgs() : []),
                        ], { encoding: "utf8" });
                        if (symlinkResult.status === 0
                            || !`${symlinkResult.stderr}${symlinkResult.stdout}`.includes("canonical regular non-symlink return file required")) {
                            failures.push(`root symlink was accepted in ${mode[0] ?? "live"} mode`);
                        } else adversarialRejections += 1;
                    }

                    const cycleResult = spawnSync(process.execPath, [
                        returnValidator,
                        universal.path,
                        "--immutable-authority",
                        ...fixture.captureAuthorityArgs(),
                    ], {
                        encoding: "utf8",
                        env: { ...process.env, VNEXT_RETURN_VALIDATION_CHAIN: JSON.stringify([universal.path]) },
                    });
                    if (cycleResult.status === 0
                        || !`${cycleResult.stderr}${cycleResult.stdout}`.includes("cyclic return-file chain")) {
                        failures.push("immutable authority accepted a cyclic concrete return-file chain");
                    } else adversarialRejections += 1;
                }
            }

            const liveUniversal = spawnSync(process.execPath, [returnValidator, universal.path], {
                encoding: "utf8",
                maxBuffer: 256 * 1024 * 1024,
            });
            const liveUniversalOutput = `${liveUniversal.stderr || ""}${liveUniversal.stdout || ""}`;
            const expectedLiveAuthorityRejection = `/annexes/deletion-judgment: live consumer-universe bounds authority must be ${canonicalBoundsAuthority}`;
            if (liveUniversal.status === 0 || !liveUniversalOutput.includes(expectedLiveAuthorityRejection)) {
                failures.push(`live V29T root did not reject its relocated bounds authority:\n${liveUniversalOutput}`);
            } else adversarialRejections += 1;

            const forged = structuredClone(universal.record);
            forged.annexes["value-target-transpose"].ledger.contract_hash = "0".repeat(64);
            finalize(forged, "return_hash");
            const forgedPath = join(directory, "v29t-forged-transpose-annex.return.json");
            writeJson(forgedPath, forged);
            const forgedResult = spawnSync(process.execPath, [
                returnValidator,
                realpathSync(forgedPath),
                "--immutable-authority",
                ...fixture.captureAuthorityArgs(),
            ], {
                encoding: "utf8",
                maxBuffer: 256 * 1024 * 1024,
            });
            const forgedOutput = `${forgedResult.stderr || ""}${forgedResult.stdout || ""}`;
            if (forgedResult.status === 0 || !forgedOutput.includes("/annexes/value-target-transpose/ledger/contract_hash")) {
                failures.push(`forged universal V29T transpose annex was not rejected:\n${forgedOutput}`);
            } else adversarialRejections += 1;

            const conflictingHistory = structuredClone(universal.record);
            const conflictingBinding = conflictingHistory.scope.dependency_returns.find(({ wave_id }) => wave_id === "V00C");
            const divergentV00C = fixture.artifacts.rawV00CReturn;
            conflictingBinding.path = divergentV00C.evidence.path;
            conflictingBinding.file_sha256 = divergentV00C.evidence.file_sha256;
            conflictingBinding.return_hash = divergentV00C.evidence.return_hash;
            conflictingBinding.wave_contract_sha256 = divergentV00C.record.scope.wave_contract_sha256;
            finalize(conflictingHistory, "return_hash");
            const conflictingHistoryPath = join(directory, "v29t-conflicting-wave-history.return.json");
            writeJson(conflictingHistoryPath, conflictingHistory);
            const conflictingHistoryResult = spawnSync(process.execPath, [
                returnValidator,
                realpathSync(conflictingHistoryPath),
                "--immutable-authority",
                ...fixture.captureAuthorityArgs(),
            ], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
            const conflictingHistoryOutput = `${conflictingHistoryResult.stderr || ""}${conflictingHistoryResult.stdout || ""}`;
            if (conflictingHistoryResult.status === 0
                || !conflictingHistoryOutput.includes("has conflicting immutable returns")) {
                failures.push(`conflicting immutable wave history was not rejected:\n${conflictingHistoryOutput}`);
            } else adversarialRejections += 1;

            const missingRowLedger = structuredClone(base);
            missingRowLedger.rows.pop();
            finalize(missingRowLedger, "manifest_hash");
            const missingRowLedgerPath = join(directory, "v29t-rehashed-missing-row.ledger.json");
            writeJson(missingRowLedgerPath, missingRowLedger);
            const missingRowReceipt = structuredClone(receipt);
            missingRowReceipt.ledger_path = realpathSync(missingRowLedgerPath);
            missingRowReceipt.ledger_file_sha256 = fileHash(missingRowLedgerPath);
            missingRowReceipt.manifest_hash = missingRowLedger.manifest_hash;
            finalize(missingRowReceipt, "receipt_hash");
            const missingRowReceiptPath = join(directory, "v29t-rehashed-missing-row.receipt.json");
            writeJson(missingRowReceiptPath, missingRowReceipt);
            const missingRowReturn = structuredClone(universal.record);
            const transpose = missingRowReturn.annexes["value-target-transpose"];
            transpose.ledger = {
                path: realpathSync(missingRowLedgerPath),
                file_sha256: fileHash(missingRowLedgerPath),
                contract_hash: missingRowLedger.manifest_hash,
            };
            transpose.validation_receipt = {
                path: realpathSync(missingRowReceiptPath),
                file_sha256: fileHash(missingRowReceiptPath),
                receipt_hash: missingRowReceipt.receipt_hash,
            };
            for (const [from, to] of [
                [fixture.ledgerPath, transpose.ledger],
                [receipt.ledger_path === fixture.ledgerPath ? universal.record.annexes["value-target-transpose"].validation_receipt.path : "", transpose.validation_receipt],
            ]) {
                const input = missingRowReturn.evidence_inputs.find((row) => row.path === from);
                if (input) {
                    input.path = to.path;
                    input.sha256 = to.file_sha256;
                }
            }
            finalize(missingRowReturn, "return_hash");
            const missingRowReturnPath = join(directory, "v29t-rehashed-missing-row.return.json");
            writeJson(missingRowReturnPath, missingRowReturn);
            const missingRowResult = spawnSync(process.execPath, [
                returnValidator,
                realpathSync(missingRowReturnPath),
                "--immutable-authority",
                ...fixture.captureAuthorityArgs(),
            ], {
                encoding: "utf8",
                maxBuffer: 256 * 1024 * 1024,
            });
            const missingRowOutput = `${missingRowResult.stderr || ""}${missingRowResult.stdout || ""}`;
            if (missingRowResult.status === 0 || !missingRowOutput.includes("must cover every V00A current node exactly once")) {
                failures.push(`rehashed missing-row V29T composed receipt was not rejected by immutable replay:\n${missingRowOutput}`);
            } else adversarialRejections += 1;
        }
    }

    reject("missing-current-row", base, (ledger) => { ledger.rows.pop(); }, "must cover every V00A current node exactly once");
    reject("wrong-current-hash", base, (ledger) => { ledger.rows[0].current_sha256 = "0".repeat(64); }, "does not bind current inventory");
    reject("wrong-result", base, (ledger) => { ledger.result.sources = ledger.result.sources.slice(1); }, "/result: must exactly project");
    reject("delete-reintroduce", base, (ledger) => {
        const row = ledger.rows.find(({ kind, disposition }) => kind === "source" && disposition === "keep");
        row.disposition = "delete";
        row.target_id = null;
        row.tombstone = "forged removal followed by reintroduction";
        ledger.introduced_targets = [{
            kind: "source",
            target_id: row.current_id,
            owner: structuredClone(row.owner),
            rationale: "forged reintroduction",
        }];
    }, "delete/reintroduce of the same target coordinate is forbidden");
    reject("duplicate-primary-target", base, (ledger) => {
        const candidates = ledger.rows.filter(({ kind, disposition }) => kind === "source" && disposition === "keep").slice(0, 2);
        candidates[1].disposition = "move";
        candidates[1].target_id = candidates[0].target_id;
    }, "duplicate primary target owner");

    reject("v29t-semantic-owner", base, (ledger) => { ledger.rows[0].owner.wave_id = "V29T"; }, "V29T cannot own semantic target decisions");
    reject("owner-outside-closure", base, (ledger) => { ledger.rows[0].owner.wave_id = "K00"; }, "not in V29T's transitive predecessor closure");
    reject("mixed-owner-return", base, (ledger) => {
        const v18h = ledger.conditional_resolutions.path;
        const resolutions = parseJsonStrict(readFileSync(v18h));
        ledger.rows[0].owner.return = structuredClone(resolutions.rows.find(({ owner }) => owner === "V18H").return);
    }, "each owner wave must use one exact cached return");
    reject("unknown-owner-decision", base, (ledger) => { ledger.rows[0].owner.decision_id = "node-source-forged"; }, "/owner/decision_hash: invalid owner-annex projection");

    reject("unbound-added-path", base, (ledger) => {
        ledger.physical_truth.effects[0].added.push("package.json");
        ledger.physical_truth.effects[0].added.sort();
    }, "must exactly bind every executable Git delta path");
    reject("missing-move-effect", base, (ledger) => { ledger.physical_truth.effects[0].decisions.pop(); }, "has no physical effect binding");
    reject("forged-effect-decision", base, (ledger) => { ledger.physical_truth.effects[0].decisions[0].decision_hash = "0".repeat(64); }, "unbound or forged semantic decision reference");
    reject("multiply-bound-physical-path", base, (ledger) => {
        ledger.physical_truth.effects[0].added.push(ledger.physical_truth.effects[0].deleted[0]);
        ledger.physical_truth.effects[0].added.sort();
    }, "is multiply bound");

    reject("wrong-final-repository-state", base, (ledger) => { ledger.value_root.repository_state_sha256 = "0".repeat(64); }, "/value_root/repository_state_sha256: live");
    reject("historical-inventory-scope-shrink", base, (ledger) => {
        const ownerRepository = fixture.artifacts.v16bReturn.record.pins[0].path;
        const copy = artifactCopy("inventory-scope-shrink", fixture.artifacts.inventory.value, "inventory_hash", (inventory) => {
            inventory.repository.path = ownerRepository;
        });
        ledger.current_inventory = { path: copy.path, sha256: copy.sha256 };
    }, "historical inventory must name the exact final transpose Git root");
    reject("duplicate-final-target-vector", base, (ledger) => {
        const copy = artifactCopy("duplicate-target", fixture.artifacts.target.value, "manifest_sha256", (target) => {
            target.library.files.push(target.library.files[0]);
        });
        ledger.target_paths = { path: copy.path, sha256: copy.sha256 };
    }, "/target_paths/library/files: duplicate values are forbidden");
    reject("missing-conditional-resolution", base, (ledger) => {
        const copy = artifactCopy("missing-resolution", fixture.artifacts.resolutions.manifest, "manifest_hash", (resolutions) => {
            resolutions.rows.pop();
        });
        ledger.conditional_resolutions = { path: copy.path, sha256: copy.sha256 };
    }, "/conditional_resolutions: exact validator failed");
    reject("css-target-binding-drift", base, (ledger) => {
        const copy = artifactCopy("css-drift", fixture.artifacts.css.value, "manifest_hash", (css) => {
            css.source.commit = "0".repeat(40);
        });
        ledger.css_execution_manifest = { path: copy.path, sha256: copy.sha256 };
    }, "/target_paths/authority/library/grammar_snapshot: must exactly bind");
    reject("missing-public-tombstone-decision", base, (ledger) => {
        const copy = artifactCopy("public-missing-tombstone", fixture.artifacts.publicSurface.manifest, "manifest_hash", (surface) => {
            surface.tombstones.pop();
        });
        ledger.public_surface = { path: copy.path, sha256: copy.sha256 };
    }, "typed target-disposition annex must exactly equal");
    reject("public-owner-with-unvalidated-ancestor", base, (ledger) => {
        const ownerReturn = ownerReturnWithMissingInventoryAncestor(fixture.artifacts.v00cReturn.evidence);
        const copy = artifactCopy("public-unvalidated-ancestor", fixture.artifacts.publicSurface.manifest, "manifest_hash", (surface) => {
            surface.tombstone_owner_return = ownerReturn;
            for (const tombstone of surface.tombstones) {
                tombstone.owner_return_hash = ownerReturn.return_hash;
                finalize(tombstone, "decision_sha256");
            }
        });
        ledger.public_surface = { path: copy.path, sha256: copy.sha256 };
    }, "/annexes/value-current-inventory: required property missing");

    reject("cross-owner-history", base, (ledger) => {
        const copy = artifactCopy("cross-owner-history", fixture.artifacts.resolutions.manifest, "manifest_hash", (resolutions) => {
            resolutions.rows.find(({ owner }) => owner === "V18H").return = structuredClone(fixture.artifacts.rawV18HReturn.evidence);
        });
        ledger.conditional_resolutions = { path: copy.path, sha256: copy.sha256 };
    }, "conflicting immutable owner histories");

    if (universal) {
        const driftPath = resolve(fixture.valueRoot, fixture.moves.moveSource);
        writeFileSync(driftPath, `${readFileSync(driftPath, "utf8")}\n// later checkout drift outside the V29T authority epoch\n`);
        git(fixture.valueRoot, ["add", fixture.moves.moveSource]);
        git(fixture.valueRoot, ["commit", "-m", "fixture later checkout drift"]);
        const staleLive = spawnSync(process.execPath, [returnValidator, universal.path], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
        if (staleLive.status === 0) failures.push("later checkout drift forged live V29T completion");
        else adversarialRejections += 1;
        const historical = spawnSync(process.execPath, [
            returnValidator,
            universal.path,
            "--immutable-authority",
            ...fixture.captureAuthorityArgs(),
        ], {
            encoding: "utf8",
            maxBuffer: 256 * 1024 * 1024,
        });
        if (historical.status !== 0 || !historical.stdout.includes('"completion_eligible":false')) {
            failures.push(`immutable after-head V29T replay failed after checkout drift:\n${historical.stderr || historical.stdout}`);
        } else positives += 1;
    }
} catch (error) {
    failures.push(error.stack ?? error.message);
} finally {
    rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({
    schema: "vnext-value-target-transpose-selftest/1",
    positives,
    adversarial_rejections: adversarialRejections,
    fixture: "real-git-npm-full-target",
})}\n`);
