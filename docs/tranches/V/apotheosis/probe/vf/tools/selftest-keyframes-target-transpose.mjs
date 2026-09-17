#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, posix, resolve } from "node:path";

import {
    canonicalGateArgv,
    fileSha256 as gateFileSha256,
    gateEnvironmentSha256,
    proofRunnerEnvironment,
    proofEnvironmentKeys,
    proofManifestPath,
    proofRunnerFixture,
    repositoryStateSha256,
    resolveCommand,
} from "./gate-runtime.mjs";
import {
    implementationGateContract,
    implementationSemanticSubjectSha256,
    sealGateReceiptChallenge,
} from "./implementation-challenge.mjs";
import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";
import { liveCasualtyHits } from "./deletion-judgment.mjs";
import {
    prepareConsumerFixtureConstellation,
    resolveConsumerFixtureUniverse,
} from "./consumer-universe-fixture.mjs";
import {
    computeModuleGraphs,
    currentPackageExportNodes,
    deriveTargetTests,
    fileSha256,
    gitIdentity,
    hashWithout,
    inspectSnapshot,
    isColocatedTest,
    keyframesDeliveryProjection,
    same,
    sha256,
    walkRegularFiles,
} from "./keyframes-contract.mjs";
import {
    canonicalDemoTextLoaderPath,
    canonicalDemoTextLoaderSource,
    mergeKeyframesAuthorityNodes,
    validateCanonicalDemoTextLoader,
    validateKeyframesCurrentDependencyInterface,
    validateKeyframesDirectDependencyIdentities,
    validateKeyframesTransposeUniversalInterface,
    validateMirroredSourceAssertion,
} from "./keyframes-proof-contract.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";
import { projectImmutableDependencyClosure } from "./value-target-owner-return.mjs";

const validator = resolve(new URL("validate-keyframes-target-transpose.mjs", import.meta.url).pathname);
const returnValidator = resolve(new URL("validate-return.mjs", import.meta.url).pathname);
const inventoryValidator = resolve(new URL("validate-keyframes-current-inventory.mjs", import.meta.url).pathname);
const deletionTruthTool = resolve(new URL("deletion-truth.mjs", import.meta.url).pathname);
const targetPath = realpathSync(resolve(new URL("../KEYFRAMES-TARGET-PATHS.json", import.meta.url).pathname));
const target = parseJsonStrict(readFileSync(targetPath));
const contracts = loadWaveContracts();
let emitK22TFixturePath;
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--emit-k22t-fixture" && process.argv[index + 1]) emitK22TFixturePath = resolve(process.argv[++index]);
    else {
        process.stderr.write("usage: node selftest-keyframes-target-transpose.mjs [--emit-k22t-fixture <descriptor.json>]\n");
        process.exit(2);
    }
}
const directory = realpathSync(mkdtempSync(join(tmpdir(), "vnext-keyframes-transpose-")));
const libraryCurrentFixtureRoot = join(directory, "library-current-epoch");
const libraryFinalFixtureRoot = join(directory, "library-final-epoch");
const demoCurrentFixtureRoot = join(directory, "demo-current-epoch");
const demoFinalFixtureRoot = join(directory, "demo-final-epoch");
const currentRepository = join(libraryCurrentFixtureRoot, "consumer-constellation", "keyframes");
const finalRepository = join(libraryFinalFixtureRoot, "consumer-constellation", "keyframes");
const demoCurrentRepository = join(demoCurrentFixtureRoot, "consumer-constellation", "keyframes");
const demoFinalRepository = join(demoFinalFixtureRoot, "consumer-constellation", "keyframes");
const finalAuthorityRelativePath = "test/proof/final-consumer-universe-bounds.json";
const failures = [];
let emittedK22T;
const scopeFixtures = {
    library: {
        currentWaveId: "K00",
        transposeWaveId: "K22T",
        sourceRoot: "src",
        testRoot: "test/src",
        supportRoots: ["bench", "proof"],
        supportFiles: [],
        snapshotRoots: ["src", "test/src", "bench", "proof", "dist"],
        targetTestScript: "proof:k22t-target-tests",
        loaderPath: null,
    },
    demo: {
        currentWaveId: "M00",
        transposeWaveId: "M10T",
        sourceRoot: "demo",
        testRoot: "test/demo",
        supportRoots: [],
        supportFiles: [canonicalDemoTextLoaderPath],
        snapshotRoots: ["demo", "test/demo"],
        targetTestScript: "proof:m10t-target-tests",
        loaderPath: "proof/demo-text-loader.mjs",
    },
};
const write = (path, bytes) => {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, bytes);
};
const writeJson = (path, value) => write(path, `${JSON.stringify(value, null, 2)}\n`);
const git = (repository, ...args) => execFileSync("git", ["-C", repository, ...args], { encoding: "utf8" }).trim();
const notApplicable = (reason) => ({ applicability: "not_applicable", reason });
const evidenceObject = (path, description = "self-test evidence") => ({ path, sha256: fileSha256(path), description });
const visualFixture = (waveId, evidence) => ({
    applicability: "applicable",
    captures: [{
        route_state: `${waveId} fixture route`,
        viewport_theme: "fixture desktop light",
        pi: evidence,
        delta: evidence,
        semantic_input_evidence: [evidence],
    }],
});
const residueCategories = ["consumers", "declarations", "documentation", "manifests-exports", "packed-artifacts", "source"];

function finalized(value, member) {
    value[member] = hashWithout(value, member);
    return value;
}

function writeCanonical(path, value) {
    write(path, `${canonicalize(value)}\n`);
}

function deletionDecisionHash(decision) {
    const preimage = structuredClone(decision);
    delete preimage.origin;
    delete preimage.decision_hash;
    return sha256(canonicalize(preimage));
}

function makeDeletionJudgment(repository, gitTruthBinding, gitTruth, consumer, proof, waveId = "K22T") {
    const topologyName = `${waveId}TopologyCut`;
    const decisionId = `${waveId.toLowerCase()}-topology-cut`;
    const tombstonePath = realpathSync(join(repository, "TOMBSTONES.md"));
    const hits = liveCasualtyHits(consumer.receipt, [topologyName], {
        ignoredDirectoryNames: parseJsonStrict(readFileSync(consumer.authorityBinding.path)).bounds.ignored_directory_names,
    });
    const allowed = hits.map((hit) => {
        const tombstone = hit.path === "TOMBSTONES.md";
        const path = tombstone ? tombstonePath : realpathSync(join(repository, hit.path));
        return {
            ...hit,
            classification: tombstone ? "tombstone" : "archive",
            reason: tombstone ? "intentional current topology tombstone" : "canonical historical topology record",
            evidence: [evidenceObject(path, tombstone ? "topology tombstone" : "historical topology record")],
        };
    }).sort((left, right) => compareCanonicalText(canonicalize({ root_id: left.root_id, path: left.path, pattern: left.pattern, line: left.line, file_sha256: left.file_sha256 }), canonicalize({ root_id: right.root_id, path: right.path, pattern: right.pattern, line: right.line, file_sha256: right.file_sha256 })));
    const effect = (path) => ({ root_id: "keyframes", path, truth_receipt_hash: gitTruth.receipt_hash });
    const fileEffects = {
        deleted: gitTruth.deleted_paths.map(effect),
        modified: gitTruth.modified_paths.map(effect),
    };
    const roots = consumer.receipt.roots
        .filter(({ status }) => status === "included")
        .map(({ id }) => ({ root_id: id, status: "unaffected", evidence: [proof] }))
        .sort((left, right) => compareCanonicalText(left.root_id, right.root_id));
    const casualtyScan = {
        consumer_receipt_hash: consumer.receipt.receipt_hash,
        patterns: [topologyName],
        roots,
        active_hits: [],
        allowed_hits: allowed,
        scan_sha256: "",
    };
    casualtyScan.scan_sha256 = sha256(canonicalize({
        consumer_receipt_hash: casualtyScan.consumer_receipt_hash,
        decision_id: decisionId,
        patterns: casualtyScan.patterns,
        roots,
        active_hits: [],
        allowed_hits: allowed,
    }));
    const decision = {
        decision_id: decisionId,
        owner_wave: waveId,
        origin: { kind: "current-wave" },
        surface: { kind: "facility", name: topologyName },
        file_effects: fileEffects,
        intrinsic_job: { claim: "old topology coordinates have no surviving independent job", evidence: [proof] },
        judgment: "retired",
        replacement: { applicability: "not_applicable", reason: "accepted target modules replace the old coordinates", evidence: [proof] },
        casualty_scan: casualtyScan,
        tombstone: { name: topologyName, evidence: evidenceObject(tombstonePath, "topology tombstone") },
        zero_residue: { categories: residueCategories.map((category) => ({ category, matches: 0, evidence: [proof] })) },
        decision_hash: "",
    };
    decision.decision_hash = deletionDecisionHash(decision);
    const truthReference = { owner_wave: waveId, root_id: "keyframes", ...gitTruthBinding };
    const annex = finalized({
        schema: "vnext-deletion-judgment/1",
        phase: "owner-precut",
        wave_id: waveId,
        consumer_scan: {
            authority: "owner-precut",
            bounds_authority: consumer.authorityBinding,
            receipt_path: consumer.receiptPath,
            receipt_file_sha256: consumer.receiptFileSha256,
            receipt_hash: consumer.receipt.receipt_hash,
            epoch_sha256: consumer.receipt.epoch.epoch_sha256,
            bounds_sha256: consumer.receipt.epoch.bounds_sha256,
            roots_sha256: consumer.rootsSha256,
        },
        truth_receipts: [truthReference],
        delivery_deleted: gitTruth.deleted_paths.map((path) => ({ root_id: "keyframes", path })),
        disposition_deletions: [{ decision_id: decision.decision_id, file_effects: fileEffects }],
        ancestor_returns: [],
        decisions: [decision],
        c10_removed_surfaces: [],
        annex_hash: "",
    }, "annex_hash");
    const path = join(directory, `${waveId.toLowerCase()}-deletion-judgment.json`);
    writeCanonical(path, annex);
    return { annex, path, decision };
}

function initializeRepository(repository) {
    mkdirSync(repository, { recursive: true });
    execFileSync("git", ["init", "--initial-branch=fixture", repository], { stdio: "ignore" });
    git(repository, "config", "user.email", "fixture@example.invalid");
    git(repository, "config", "user.name", "Fixture");
}

function prepareKeyframesConstellation(fixtureRoot, ownerWave, authorityRelativePath) {
    mkdirSync(fixtureRoot, { recursive: true });
    return prepareConsumerFixtureConstellation({
        fixtureRoot,
        primary: {
            id: "keyframes",
            path: join(fixtureRoot, "consumer-constellation", "keyframes"),
            repository: "fixture",
            ownerWave,
        },
        ...(authorityRelativePath ? { authorityRelativePath } : {}),
    });
}

function commit(repository) {
    git(repository, "add", ".");
    git(repository, "commit", "-m", "fixture");
}

function runTool(command, args, context) {
    const result = spawnSync(command, args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (result.status !== 0) throw new Error(`${context}: ${(result.stderr || result.stdout).trim()}`);
    return result.stdout;
}

function decisionForRow(scope, row, introduced = false) {
    const value = introduced ? {
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
    value.decision_hash = hashWithout(value, "decision_hash");
    return value;
}

function genericReturn(waveId, evidence, repository) {
    const identity = gitIdentity(repository);
    const status = sha256(execFileSync("git", ["-C", repository, "status", "--porcelain=v1", "-z"]));
    const hash = "a".repeat(64);
    const binding = { path: evidence.path, sha256: evidence.sha256, description: "schema fixture" };
    const statePath = join(directory, `${repository.split("/").at(-1)}-${waveId.toLowerCase()}-state-certificate.json`);
    writeJson(statePath, {
        execution: {
            applicability: "applicable",
            pin_repository: "fixture",
            cwd: repository,
            repository_state_sha256: repositoryStateSha256(repository),
        },
    });
    const stateBinding = { path: statePath, sha256: fileSha256(statePath), description: `${waveId} fixture repository-state certificate` };
    const record = {
        schema: "vnext-wave-return/2",
        wave_id: waveId,
        status: contracts.get(waveId).contract.outcome_policy.advancing_statuses[0],
        return_hash: "",
        evidence_inputs: [{ path: evidence.path, sha256: evidence.sha256, purpose: "dependency schema fixture", class: "generated" }],
        quarantine_attestation: {
            forbidden_path: "/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/vnext/r1-opus-refuted/",
            read: false,
            tool_log_path: evidence.path,
            tool_log_sha256: evidence.sha256,
        },
        pins: [{ repository: "fixture", path: repository, branch: identity.branch, head: identity.head, dirty_before_sha256: status, dirty_after_sha256: status }],
        scope: {
            mission: contracts.get(waveId).contract.mission,
            wave_contract_sha256: contracts.get(waveId).sha256,
            seed_requirements_verified: contracts.get(waveId).contract.seed_requirements,
            dependency_returns: [],
            files_intended: [],
            files_changed: [],
        },
        born_red: { witness: "fixture witness", reproduction: "fixture reproduction", observed_failure: "fixture failure", evidence: [binding] },
        delivery: { source: [], tests: [], exports: [], deleted_paths: [], migrations: [] },
        dag_delta: notApplicable("dependency schema fixture"),
        gates: [{ id: "fixture", kind: "manual", command_or_probe: "fixture", expected: "fixture", result: "pass", receipt: stateBinding, evidence: [binding] }],
        api_contract: notApplicable("dependency schema fixture"),
        visual: notApplicable("dependency schema fixture"),
        performance: notApplicable("dependency schema fixture"),
        limits: notApplicable("dependency schema fixture"),
        consumers: notApplicable("dependency schema fixture"),
        terminal_disposition: { kept: ["fixture"], pruned: [], deletions: [], refusals: [], no_legacy_paths: true, standards_compatibility: [] },
        standards_operation_vector: notApplicable("dependency schema fixture"),
        routed_remainder: [],
        verdict: "fixture terminal dependency",
        annexes: { "implementation-challenge": notApplicable("dependency schema fixture") },
    };
    if (waveId === "V29T") {
        const artifact = { path: evidence.path, file_sha256: evidence.sha256, contract_hash: hash };
        const receipt = { path: evidence.path, file_sha256: evidence.sha256, receipt_hash: hash };
        record.annexes["deletion-judgment"] = { schema: "vnext-deletion-judgment-return-annex/1", wave_id: "V29T", phase: "owner-precut", path: evidence.path, file_sha256: evidence.sha256, annex_hash: hash };
        record.annexes["value-target-transpose"] = {
            schema: "vnext-value-target-transpose-return-annex/1",
            wave_id: "V29T",
            value_root: repository,
            repository_state_sha256: hash,
            ledger: artifact,
            current_inventory: artifact,
            current_inventory_return: { path: evidence.path, file_sha256: evidence.sha256, return_hash: hash },
            target_paths: artifact,
            conditional_resolutions: artifact,
            css_execution_manifest: artifact,
            public_surface: artifact,
            physical_truth_receipt: receipt,
            validation_receipt: receipt,
        };
    }
    if (waveId === "K23") {
        record.annexes["deletion-judgment"] = {
            schema: "vnext-deletion-judgment-return-annex/1",
            wave_id: "K23",
            phase: "owner-precut",
            path: evidence.path,
            file_sha256: evidence.sha256,
            annex_hash: hash,
        };
        record.annexes["keyframes-public-package"] = {
            schema: "vnext-keyframes-public-package-return-annex/1",
            wave_id: "K23",
            manifest: { path: evidence.path, file_sha256: evidence.sha256, manifest_hash: hash },
            source_transpose_return: { path: evidence.path, file_sha256: evidence.sha256, return_hash: hash },
            target_paths: { path: evidence.path, file_sha256: evidence.sha256, manifest_sha256: hash },
            package: {
                name: "@mkbabb/keyframes.js",
                version: "7.0.0",
                tarball_sha256: hash,
                tarball_sha512: hash.repeat(2),
                integrity: `sha512-${hash}`,
                archive_files_sha256: hash,
            },
            validation_receipt: { path: evidence.path, file_sha256: evidence.sha256, receipt_hash: hash },
        };
    }
    return finalized(record, "return_hash");
}

function gateReceipt(repository, evidence, waveId = "K00") {
    const contract = contracts.get(waveId);
    const gate = contract.contract.gates[0];
    const argv = canonicalGateArgv(gate.subject, waveId);
    const executable = resolveCommand(argv.commandToken);
    const execution = spawnSync(executable, argv.args, {
        cwd: repository,
        encoding: null,
        env: proofRunnerEnvironment(),
        maxBuffer: 32 * 1024 * 1024,
        shell: false,
    });
    if (execution.status !== 0) throw new Error(`${waveId} fixture gate failed: ${execution.stderr?.toString("utf8")}`);
    const stem = waveId.toLowerCase();
    const stdoutPath = join(directory, `${stem}.stdout`);
    const stderrPath = join(directory, `${stem}.stderr`);
    write(stdoutPath, execution.stdout);
    write(stderrPath, execution.stderr);
    const receipt = {
        schema: "vnext-gate-receipt/3",
        wave_id: waveId,
        gate_id: gate.id,
        kind: gate.kind,
        subject: gate.subject,
        expected: gate.expected,
        wave_contract_sha256: contract.sha256,
        challenge_sha256: "0".repeat(64),
        proof_manifest: { path: proofManifestPath(repository, argv.manifestRelative), sha256: fileSha256(proofManifestPath(repository, argv.manifestRelative)) },
        started_at: new Date(Date.now() - 1000).toISOString(),
        finished_at: new Date().toISOString(),
        result: "pass",
        execution: {
            applicability: "applicable",
            command_token: argv.commandToken,
            executable_path: executable,
            executable_sha256: gateFileSha256(executable),
            args: argv.args,
            cwd: repository,
            pin_repository: "fixture",
            repository_state_sha256: repositoryStateSha256(repository),
            environment_sha256: gateEnvironmentSha256(),
            exit_code: 0,
            stdout_path: stdoutPath,
            stdout_sha256: fileSha256(stdoutPath),
            stderr_path: stderrPath,
            stderr_sha256: fileSha256(stderrPath),
        },
        evidence: [evidence],
        receipt_hash: "",
    };
    finalized(receipt, "receipt_hash");
    const path = join(directory, `${stem}.gate-receipt.json`);
    writeJson(path, receipt);
    return { receipt, binding: { path, sha256: fileSha256(path), description: `${waveId} live gate receipt` } };
}

function sealReturnGate(record, gate) {
    sealGateReceiptChallenge(gate.receipt, record.annexes["implementation-challenge"]);
    writeJson(gate.binding.path, gate.receipt);
    gate.binding.sha256 = fileSha256(gate.binding.path);
    record.gates[0].receipt = structuredClone(gate.binding);
    return finalized(record, "return_hash");
}

function currentInventoryReturn({
    waveId,
    scope,
    repository,
    evidence,
    dependencies,
    gate,
    inventoryBinding,
    captureReceiptBinding,
    replayReceiptBinding,
    decisions,
    deletion = null,
}) {
    const contract = contracts.get(waveId);
    const identity = gitIdentity(repository);
    const status = sha256(execFileSync("git", ["-C", repository, "status", "--porcelain=v1", "-z"]));
    const decisionAnnex = finalized({
        schema: "vnext-keyframes-target-decisions/1",
        wave_id: waveId,
        scope,
        decisions: [...decisions].sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id)),
        annex_hash: "",
    }, "annex_hash");
    const deleted = deletion ? deletion.annex.delivery_deleted.map(({ path }) => ({ repository: "fixture", path })) : [];
    const terminalDeletions = deletion ? [{
        decision_id: deletion.decision.decision_id,
        decision_hash: deletion.decision.decision_hash,
        file_effects: {
            deleted: deletion.decision.file_effects.deleted.map(({ path }) => ({ repository: "fixture", path })),
            modified: deletion.decision.file_effects.modified.map(({ path }) => ({ repository: "fixture", path })),
        },
    }] : [];
    const record = {
        schema: "vnext-wave-return/2",
        wave_id: waveId,
        status: "COMPLETE",
        return_hash: "",
        evidence_inputs: [
            { path: evidence.path, sha256: evidence.sha256, purpose: "transpose self-test", class: "generated" },
            { path: inventoryBinding.path, sha256: inventoryBinding.file_sha256, purpose: `${waveId} exact current inventory`, class: "generated" },
            { path: captureReceiptBinding.path, sha256: captureReceiptBinding.file_sha256, purpose: `${waveId} inventory capture validation`, class: "generated" },
            { path: replayReceiptBinding.path, sha256: replayReceiptBinding.file_sha256, purpose: `${waveId} immutable inventory replay validation`, class: "generated" },
            ...(deletion ? [{ path: deletion.path, sha256: fileSha256(deletion.path), purpose: `${waveId} owner-precut deletion judgment`, class: "generated" }] : []),
        ],
        quarantine_attestation: {
            forbidden_path: "/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/vnext/r1-opus-refuted/",
            read: false,
            tool_log_path: evidence.path,
            tool_log_sha256: evidence.sha256,
        },
        pins: [{ repository: "fixture", path: repository, branch: identity.branch, head: identity.head, dirty_before_sha256: status, dirty_after_sha256: status }],
        scope: {
            mission: contract.contract.mission,
            wave_contract_sha256: contract.sha256,
            seed_requirements_verified: contract.contract.seed_requirements,
            dependency_returns: dependencies,
            files_intended: [],
            files_changed: [],
        },
        born_red: { witness: "current and target files could previously be listed without a total join", reproduction: "node tools/selftest-keyframes-target-transpose.mjs", observed_failure: "a missing current disposition was not represented", evidence: [evidence] },
        delivery: { source: [], tests: [], exports: [], deleted_paths: deleted, migrations: [] },
        dag_delta: notApplicable(`${waveId} is an inventory audit`),
        gates: [{
            id: contract.contract.gates[0].id,
            kind: contract.contract.gates[0].kind,
            command_or_probe: contract.contract.gates[0].subject,
            expected: contract.contract.gates[0].expected,
            result: "pass",
            receipt: gate.binding,
            evidence: [evidence],
        }],
        api_contract: notApplicable(`${waveId} has no API operation in this fixture`),
        visual: scope === "demo" ? visualFixture(waveId, evidence) : notApplicable(`${waveId} has no visual claim in this fixture`),
        performance: notApplicable(`${waveId} has no performance claim in this fixture`),
        limits: notApplicable(`${waveId} has no limit claim in this fixture`),
        consumers: notApplicable(`${waveId} has no consumer claim in this fixture`),
        terminal_disposition: { kept: [`exact ${waveId} inventory`], pruned: [], deletions: terminalDeletions, refusals: [], no_legacy_paths: true, standards_compatibility: [] },
        standards_operation_vector: notApplicable(`${waveId} does not decide standards features`),
        routed_remainder: [],
        verdict: `${waveId} fixture inventory is exact`,
        annexes: {
            "implementation-challenge": notApplicable(`${waveId} is audit-only`),
            ...(deletion ? {
                "deletion-judgment": {
                    schema: "vnext-deletion-judgment-return-annex/1",
                    wave_id: waveId,
                    phase: "owner-precut",
                    path: deletion.path,
                    file_sha256: fileSha256(deletion.path),
                    annex_hash: deletion.annex.annex_hash,
                },
            } : {}),
            "keyframes-current-inventory": {
                schema: "vnext-keyframes-current-inventory-return-annex/1",
                wave_id: waveId,
                scope,
                inventory: inventoryBinding,
                capture_receipt: captureReceiptBinding,
                replay_receipt: replayReceiptBinding,
            },
            "keyframes-target-decisions": decisionAnnex,
        },
    };
    return sealReturnGate(record, gate);
}

function challengeActor(waveId, role, sequence, reportText, startedAt, completedAt, evidence, challengeInput) {
    const sessionId = `session-${waveId.toLowerCase()}-${role}-${sequence}`;
    const sessionPath = join(directory, `${sessionId}.jsonl`);
    const reportPath = join(directory, `${sessionId}.md`);
    const challengeInputText = canonicalize(challengeInput);
    const epochReport = `${reportText.trimEnd()}\nVNEXT-CHALLENGE-INPUT ${challengeInputText}\n`;
    write(reportPath, epochReport);
    const records = [
        { timestamp: new Date(startedAt).toISOString(), type: "session_meta", payload: { id: sessionId } },
        { timestamp: new Date(startedAt + 100).toISOString(), type: "response_item", payload: { type: "message", role: "user", content: [{ type: "input_text", text: `${role === "adjudicator" ? "ADJUDICATE-WAVE" : "ASSUME-WAVE-WRONG"} ${challengeInputText}` }] } },
        { timestamp: new Date(startedAt + 200).toISOString(), type: "turn_context", payload: { model: "gpt-5.6-sol", effort: "ultra" } },
        { timestamp: new Date(completedAt - 100).toISOString(), type: "response_item", payload: { type: "message", role: "assistant", phase: "final_answer", content: [{ type: "output_text", text: epochReport }] } },
        { timestamp: new Date(completedAt).toISOString(), type: "event_msg", payload: { type: "task_complete", last_agent_message: epochReport } },
    ];
    write(sessionPath, `${records.map((record) => JSON.stringify(record)).join("\n")}\n`);
    return {
        role,
        posture: role === "adjudicator" ? "adjudicate-not-vote" : "assume-wave-wrong",
        session_id: sessionId,
        session_jsonl: { path: sessionPath, sha256: fileSha256(sessionPath), description: `${role} hostile session` },
        report: { path: reportPath, sha256: fileSha256(reportPath), description: `${role} hostile report` },
        axes: challengeInput.axes,
        verdict: role === "adjudicator" ? "ratified" : "clean",
        unresolved_findings: [],
    };
}

function implementationChallenge(record, repository, gate, evidence, dependencies, waveId = "K22T") {
    const identity = gitIdentity(repository);
    const repositoryStates = [{ repository: "fixture", path: repository, sha256: repositoryStateSha256(repository) }];
    const inputBase = {
        schema: "vnext-implementation-challenge-input/1",
        wave_id: waveId,
        wave_contract_sha256: contracts.get(waveId).sha256,
        semantic_subject_sha256: implementationSemanticSubjectSha256(record),
        dependency_closure_sha256: projectImmutableDependencyClosure(waveId, dependencies).descendant_closure_hash,
        direct_dependency_returns: dependencies.map(({ wave_id, path, file_sha256, return_hash, wave_contract_sha256 }) => ({
            wave_id, path, file_sha256, return_hash, wave_contract_sha256,
        })),
        implementation_state: {
            pins: [{ repository: "fixture", path: repository, head: identity.head, dirty_after_sha256: identity.dirty_sha256 }],
            repository_states: repositoryStates,
        },
        gate_contract: implementationGateContract(record.gates),
    };
    const axes = () => ({
        tranche_fit_optimality: [evidence],
        wave_contract_adherence_friction: [evidence],
        feature_behavior: [evidence],
    });
    const gateStart = Date.parse(gate.receipt.started_at);
    const criticA = challengeActor(waveId, "critic_a", 1, `${waveId} critic A found the composed transpose join clean.\n`, gateStart - 7000, gateStart - 6000, evidence, { ...inputBase, role: "critic_a", axes: axes() });
    const criticB = challengeActor(waveId, "critic_b", 1, `${waveId} critic B independently found the composed transpose join clean.\n`, gateStart - 6500, gateStart - 5500, evidence, { ...inputBase, role: "critic_b", axes: axes() });
    const hashes = [criticA.report.sha256, criticB.report.sha256];
    const adjudicator = challengeActor(
        waveId,
        "adjudicator",
        1,
        `${waveId} adjudication ratifies critic_a ${hashes[0]} then critic_b ${hashes[1]}.\n`,
        gateStart - 5000,
        gateStart - 4000,
        evidence,
        {
            ...inputBase,
            role: "adjudicator",
            axes: axes(),
            critics: [criticA, criticB].map((actor) => ({
                role: actor.role,
                report_path: actor.report.path,
                report_sha256: actor.report.sha256,
                report_content: readFileSync(actor.report.path, "utf8"),
            })),
        },
    );
    adjudicator.input_report_sha256 = hashes;
    return {
        schema: "vnext-implementation-challenge/1",
        applicability: "applicable",
        wave_id: waveId,
        wave_contract_sha256: contracts.get(waveId).sha256,
        repository_states: repositoryStates,
        critics: [criticA, criticB],
        adjudicator,
    };
}

function dependencyBinding(path, returned, repository) {
    return {
        wave_id: returned.wave_id,
        path,
        file_sha256: fileSha256(path),
        return_hash: returned.return_hash,
        wave_contract_sha256: contracts.get(returned.wave_id).sha256,
        repository_states: [{ repository: "fixture", path: repository, sha256: repositoryStateSha256(repository) }],
        corpus_epoch: notApplicable("fixture predecessor has no inspected corpus epoch"),
    };
}

function transposeReturn({
    waveId,
    scope,
    currentWaveId,
    repository,
    evidence,
    dependencies,
    gate,
    ledgerPath,
    ledger,
    inventoryBinding,
    ownerReturnPath,
    ownerReturn,
    localPath,
    localDecisions,
    physicalPath,
    physical,
    gitTruthBinding,
    validationPath,
    validationReceipt,
    deletion,
}) {
    const identity = gitIdentity(repository);
    const state = repositoryStateSha256(repository);
    const deleted = deletion.annex.delivery_deleted.map(({ path }) => ({ repository: "fixture", path }));
    const modified = deletion.decision.file_effects.modified.map(({ path }) => ({ repository: "fixture", path }));
    const deletedEffects = deletion.decision.file_effects.deleted.map(({ path }) => ({ repository: "fixture", path }));
    const artifactInputs = [
        { path: evidence.path, sha256: evidence.sha256, purpose: `${waveId} composed return fixture`, class: "generated" },
        { path: deletion.path, sha256: fileSha256(deletion.path), purpose: `${waveId} owner-precut deletion judgment`, class: "generated" },
        { path: ledgerPath, sha256: fileSha256(ledgerPath), purpose: `${waveId} total transpose ledger`, class: "generated" },
        { path: inventoryBinding.path, sha256: inventoryBinding.file_sha256, purpose: `${currentWaveId} immutable inventory`, class: "generated" },
        { path: ownerReturnPath, sha256: fileSha256(ownerReturnPath), purpose: `${currentWaveId} inventory return`, class: "generated" },
        { path: targetPath, sha256: fileSha256(targetPath), purpose: "canonical Keyframes target authority", class: "generated" },
        { path: localPath, sha256: fileSha256(localPath), purpose: `${waveId} local target decisions`, class: "generated" },
        { path: physicalPath, sha256: fileSha256(physicalPath), purpose: `${waveId} physical transpose receipt`, class: "generated" },
        { path: gitTruthBinding.path, sha256: gitTruthBinding.file_sha256, purpose: `${waveId} executable Git truth`, class: "generated" },
        { path: validationPath, sha256: fileSha256(validationPath), purpose: `${waveId} composed validation receipt`, class: "generated" },
    ];
    const record = {
        schema: "vnext-wave-return/2",
        wave_id: waveId,
        status: "COMPLETE",
        return_hash: "",
        evidence_inputs: artifactInputs,
        quarantine_attestation: {
            forbidden_path: "/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/vnext/r1-opus-refuted/",
            read: false,
            tool_log_path: evidence.path,
            tool_log_sha256: evidence.sha256,
        },
        pins: [{ repository: "fixture", path: repository, branch: identity.branch, head: identity.head, dirty_before_sha256: identity.dirty_sha256, dirty_after_sha256: identity.dirty_sha256 }],
        scope: {
            mission: contracts.get(waveId).contract.mission,
            wave_contract_sha256: contracts.get(waveId).sha256,
            seed_requirements_verified: contracts.get(waveId).contract.seed_requirements,
            dependency_returns: dependencies,
            files_intended: ledger.result.files.map(({ path }) => path),
            files_changed: [...ledger.result.delivery.removed_paths, ...ledger.result.delivery.replaced_paths],
        },
        born_red: { witness: "typed transpose truth was not joined to owner-precut Git truth", reproduction: "node tools/selftest-keyframes-target-transpose.mjs", observed_failure: "a forged physical receipt could float beside deletion judgment", evidence: [evidence] },
        delivery: { source: ledger.result.delivery.source, tests: ledger.result.delivery.tests, exports: [], deleted_paths: deleted, migrations: [] },
        dag_delta: notApplicable("fixture topology is proved by the typed transpose annex"),
        gates: [{
            id: contracts.get(waveId).contract.gates[0].id,
            kind: contracts.get(waveId).contract.gates[0].kind,
            command_or_probe: contracts.get(waveId).contract.gates[0].subject,
            expected: contracts.get(waveId).contract.gates[0].expected,
            result: "pass",
            receipt: gate.binding,
            evidence: [evidence],
        }],
        api_contract: notApplicable(`${waveId} owns no API operation`),
        visual: scope === "demo" ? visualFixture(waveId, evidence) : notApplicable(`${waveId} fixture makes no visual claim`),
        performance: notApplicable(`${waveId} fixture makes no performance claim`),
        limits: notApplicable(`${waveId} fixture makes no limit claim`),
        consumers: notApplicable(`${waveId} consumer truth is carried by deletion judgment`),
        terminal_disposition: {
            kept: ["exact Keyframes target topology"],
            pruned: [],
            deletions: [{ decision_id: deletion.decision.decision_id, decision_hash: deletion.decision.decision_hash, file_effects: { deleted: deletedEffects, modified } }],
            refusals: [],
            no_legacy_paths: true,
            standards_compatibility: [],
        },
        standards_operation_vector: notApplicable(`${waveId} does not decide standards features`),
        routed_remainder: [],
        verdict: `${waveId} typed transpose and owner-precut Git truth are exactly joined`,
        annexes: {
            "implementation-challenge": notApplicable(`${waveId} challenge is sealed after semantic assembly`),
            "deletion-judgment": {
                schema: "vnext-deletion-judgment-return-annex/1",
                wave_id: waveId,
                phase: "owner-precut",
                path: deletion.path,
                file_sha256: fileSha256(deletion.path),
                annex_hash: deletion.annex.annex_hash,
            },
            "keyframes-target-decisions": localDecisions,
            "keyframes-target-transpose": {
                schema: "vnext-keyframes-target-transpose-return-annex/1",
                wave_id: waveId,
                scope,
                repository_state_sha256: state,
                ledger: { path: ledgerPath, file_sha256: fileSha256(ledgerPath), manifest_hash: ledger.manifest_hash },
                current_inventory: inventoryBinding,
                current_inventory_return: { path: ownerReturnPath, file_sha256: fileSha256(ownerReturnPath), return_hash: ownerReturn.return_hash },
                target_paths: { path: targetPath, file_sha256: fileSha256(targetPath), manifest_sha256: target.manifest_sha256 },
                local_decisions: { path: localPath, file_sha256: fileSha256(localPath), annex_hash: localDecisions.annex_hash },
                physical_truth: { path: physicalPath, file_sha256: fileSha256(physicalPath), receipt_hash: physical.receipt_hash },
                delivery: ledger.result.delivery,
                validation_receipt: { path: validationPath, file_sha256: fileSha256(validationPath), receipt_hash: validationReceipt.receipt_hash },
            },
        },
    };
    record.annexes["implementation-challenge"] = implementationChallenge(
        record,
        repository,
        gate,
        evidence,
        dependencies,
        waveId,
    );
    return sealReturnGate(record, gate);
}

function makeCurrentSnapshot(repository, scope, stem = scope) {
    const fixture = scopeFixtures[scope];
    const staging = join(directory, `${stem}-current-snapshot-stage`);
    const root = join(staging, "snapshot");
    mkdirSync(root, { recursive: true });
    for (const path of fixture.snapshotRoots) cpSync(join(repository, path), join(root, path), { recursive: true });
    for (const path of fixture.supportFiles) {
        mkdirSync(dirname(join(root, path)), { recursive: true });
        cpSync(join(repository, path), join(root, path));
    }
    cpSync(join(repository, "package.json"), join(root, "package.json"));
    const path = join(directory, `${stem}.current.snapshot.tgz`);
    execFileSync("/usr/bin/tar", ["-czf", path, "-C", staging, "snapshot"]);
    const archive = inspectSnapshot(path);
    return { path, file_sha256: archive.sha256, files_sha256: sha256(canonicalize(archive.files)) };
}

function buildInventory(repository, snapshot, scope) {
    const fixture = scopeFixtures[scope];
    const authority = {
        source_root: fixture.sourceRoot,
        external_test_root: fixture.testRoot,
        support_roots: fixture.supportRoots,
        support_files: fixture.supportFiles,
        package_manifest: "package.json",
        package_manifest_sha256: fileSha256(join(repository, "package.json")),
    };
    const nodes = [];
    for (const file of walkRegularFiles(repository, authority.source_root)) nodes.push({ kind: isColocatedTest(file.path) ? "test" : "source", id: file.path, ...file });
    for (const file of walkRegularFiles(repository, authority.external_test_root)) nodes.push({ kind: "test", id: file.path, ...file });
    for (const supportRoot of authority.support_roots) for (const file of walkRegularFiles(repository, supportRoot)) nodes.push({ kind: "support", id: file.path, ...file });
    for (const path of authority.support_files) {
        const bytes = readFileSync(join(repository, path));
        nodes.push({ kind: "support", id: path, path, bytes: bytes.length, sha256: sha256(bytes) });
    }
    if (scope === "library") {
        nodes.push(...currentPackageExportNodes(repository, parseJsonStrict(readFileSync(join(repository, "package.json")))));
    }
    nodes.sort((left, right) => compareCanonicalText(`${left.kind}\0${left.id}`, `${right.kind}\0${right.id}`));
    return finalized({
        schema: "vnext-keyframes-current-inventory/1",
        wave_id: fixture.currentWaveId,
        scope,
        repository: { path: repository, ...gitIdentity(repository) },
        snapshot,
        authority,
        nodes,
        support_exceptions: nodes.filter(({ kind }) => kind === "support").map(({ path }) => ({
            path,
            class: path === canonicalDemoTextLoaderPath ? "tool" : path.startsWith("bench/") ? "benchmark" : "proof",
            owner_wave_id: fixture.currentWaveId,
            rationale: "pinned support file",
        })),
        graphs: computeModuleGraphs(repository, [...new Set(nodes.map(({ path }) => path))]),
        inventory_hash: "",
    }, "inventory_hash");
}

function materializeTargetTree(repository, scope, sourceBytes, testBytes) {
    const fixture = scopeFixtures[scope];
    rmSync(join(repository, fixture.sourceRoot), { recursive: true, force: true });
    rmSync(join(repository, fixture.testRoot), { recursive: true, force: true });
    const tests = deriveTargetTests(target, scope);
    for (let index = 0; index < target[scope].files.length; index += 1) {
        const sourcePath = target[scope].files[index];
        const testPath = tests[index];
        let specifier = posix.relative(posix.dirname(testPath), sourcePath);
        if (!specifier.startsWith(".")) specifier = `./${specifier}`;
        write(join(repository, sourcePath), sourceBytes(sourcePath, index));
        write(join(repository, testPath), testBytes({ sourcePath, testPath, specifier, index }));
    }
    return tests;
}

function collectFinalFiles(repository, scope) {
    const fixture = scopeFixtures[scope];
    return [
        ...walkRegularFiles(repository, fixture.sourceRoot).map((file) => ({ kind: "source", ...file })),
        ...walkRegularFiles(repository, fixture.testRoot).map((file) => ({ kind: "test", ...file })),
        ...fixture.supportRoots.flatMap((root) => walkRegularFiles(repository, root).map((file) => ({ kind: "support", ...file }))),
        ...fixture.supportFiles.map((path) => {
            const bytes = readFileSync(join(repository, path));
            return { kind: "support", path, bytes: bytes.length, sha256: sha256(bytes) };
        }),
    ].sort((left, right) => compareCanonicalText(`${left.kind}\0${left.path}`, `${right.kind}\0${right.path}`));
}

function buildTransposeRows(inventory, finalFiles, mappings, scope) {
    const finalByKey = new Map(finalFiles.map((file) => [`${file.kind}\0${file.path}`, file]));
    const currentFiles = inventory.nodes.filter(({ kind }) => kind !== "export");
    const rows = currentFiles.map((node) => {
        const mapping = mappings.get(`${node.kind}\0${node.id}`);
        if (!mapping) throw new Error(`${scope} fixture lacks a mapping for ${node.kind} ${node.id}`);
        const [disposition, targetId] = mapping;
        const final = targetId === null ? undefined : finalByKey.get(`${node.kind}\0${targetId}`);
        return {
            kind: node.kind,
            current_id: node.id,
            current_sha256: node.sha256,
            disposition,
            target_id: targetId,
            target_sha256: final?.sha256 ?? null,
            owner: {},
            rationale: `${disposition} fixture node`,
            tombstone: disposition === "delete" ? `retired ${node.id}` : null,
        };
    }).sort((left, right) => compareCanonicalText(`${left.kind}\0${left.current_id}`, `${right.kind}\0${right.current_id}`));
    const primary = new Set(rows.filter(({ disposition }) => !["fold", "delete"].includes(disposition)).map(({ kind, target_id }) => `${kind}\0${target_id}`));
    const introduced = finalFiles.filter((file) => !primary.has(`${file.kind}\0${file.path}`)).map((file) => ({
        kind: file.kind,
        target_id: file.path,
        target_sha256: file.sha256,
        owner: {},
        rationale: "introduced accepted target file",
    }));
    const decisions = [
        ...rows.map((row) => decisionForRow(scope, row)),
        ...introduced.map((row) => decisionForRow(scope, row, true)),
    ];
    return { currentFiles, decisions, finalByKey, introduced, rows };
}

function attachTerminalOwners(rows, introduced, scope, waveId, ownerReturnPath, ownerReturn) {
    const owner = (decision) => ({
        kind: "terminal-return",
        wave_id: waveId,
        return: { path: ownerReturnPath, file_sha256: fileSha256(ownerReturnPath), return_hash: ownerReturn.return_hash },
        decision_id: decision.decision_id,
        decision_hash: decision.decision_hash,
    });
    for (const row of rows) row.owner = owner(decisionForRow(scope, row));
    for (const row of introduced) row.owner = owner(decisionForRow(scope, row, true));
}

function attachLocalOwners(rows, introduced, scope, waveId, localPath, localDecisions) {
    const binding = { path: localPath, file_sha256: fileSha256(localPath), annex_hash: localDecisions.annex_hash };
    const owner = (decision) => ({
        kind: "local-decision",
        wave_id: waveId,
        local_decisions: binding,
        decision_id: decision.decision_id,
        decision_hash: decision.decision_hash,
    });
    for (const row of rows) row.owner = owner(decisionForRow(scope, row));
    for (const row of introduced) row.owner = owner(decisionForRow(scope, row, true));
}

function buildPhysicalTruth({ waveId, scope, inventory, repository, gitTruthBinding, finalFiles, rows, introduced }) {
    const delivery = keyframesDeliveryProjection(finalFiles, rows);
    const effects = [
        ...rows.filter(({ disposition, current_sha256, target_sha256 }) => disposition !== "keep" || current_sha256 !== target_sha256).map((row) => ({
            decision_id: decisionForRow(scope, row).decision_id,
            kind: row.kind,
            effect: row.disposition === "delete" ? "remove" : row.disposition === "keep" ? "replace-in-place" : "remove-and-materialize",
            current_path: row.current_id,
            current_sha256: row.current_sha256,
            target_path: row.disposition === "delete" ? null : row.target_id,
            target_sha256: row.disposition === "delete" ? null : row.target_sha256,
            decision_owner_wave_id: row.owner.wave_id,
            physical_owner_wave_id: row.disposition === "delete" ? row.owner.wave_id : waveId,
        })),
        ...introduced.map((row) => ({
            decision_id: decisionForRow(scope, row, true).decision_id,
            kind: row.kind,
            effect: "materialize",
            current_path: null,
            current_sha256: null,
            target_path: row.target_id,
            target_sha256: row.target_sha256,
            decision_owner_wave_id: row.owner.wave_id,
            physical_owner_wave_id: waveId,
        })),
    ].sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id));
    const physical = finalized({
        schema: "vnext-keyframes-physical-transpose/1",
        wave_id: waveId,
        scope,
        current_snapshot: { file_sha256: inventory.snapshot.file_sha256, files_sha256: inventory.snapshot.files_sha256 },
        final_repository_state_sha256: repositoryStateSha256(repository),
        target_manifest_sha256: target.manifest_sha256,
        git_truth: gitTruthBinding,
        effects,
        delivery,
        receipt_hash: "",
    }, "receipt_hash");
    return { delivery, effects, physical };
}

function buildTransposeLedger({
    scope,
    repository,
    inventoryBinding,
    ownerReturnPath,
    ownerReturn,
    localPath,
    localDecisions,
    physicalPath,
    physical,
    rows,
    introduced,
    finalFiles,
    supportExceptions = [],
}) {
    const fixture = scopeFixtures[scope];
    const testVector = deriveTargetTests(target, scope);
    const command = scope === "library"
        ? `node --test ${testVector.join(" ")}`
        : `node --experimental-loader ./proof/demo-text-loader.mjs --test ${testVector.join(" ")}`;
    const loader = fixture.loaderPath === null
        ? null
        : { path: fixture.loaderPath, sha256: fileSha256(join(repository, fixture.loaderPath)) };
    return finalized({
        schema: "vnext-keyframes-target-transpose/1",
        wave_id: fixture.transposeWaveId,
        scope,
        repository: { path: repository, ...gitIdentity(repository), repository_state_sha256: repositoryStateSha256(repository) },
        current_inventory: { ...inventoryBinding, return: { path: ownerReturnPath, file_sha256: fileSha256(ownerReturnPath), return_hash: ownerReturn.return_hash } },
        target_paths: { path: targetPath, file_sha256: fileSha256(targetPath), manifest_sha256: target.manifest_sha256 },
        local_decisions: { path: localPath, file_sha256: fileSha256(localPath), annex_hash: localDecisions.annex_hash },
        physical_truth: { path: physicalPath, file_sha256: fileSha256(physicalPath), receipt_hash: physical.receipt_hash },
        test_contract: { script: fixture.targetTestScript, command, loader, timeout_ms: 120000 },
        rows,
        introduced_targets: introduced,
        result: {
            files: finalFiles,
            support_exceptions: supportExceptions,
            graphs: computeModuleGraphs(repository, finalFiles.map(({ path }) => path)),
            delivery: physical.delivery,
        },
        manifest_hash: "",
    }, "manifest_hash");
}

function run(name, value, options = {}) {
    const { historical = false, ...spawnOptions } = options;
    const path = join(directory, `${name}.ledger.json`);
    writeJson(path, finalized(value, "manifest_hash"));
    return spawnSync(process.execPath, [validator, "--ledger", path, "--offline-returns", ...(historical ? ["--historical-replay"] : [])], {
        encoding: "utf8",
        maxBuffer: 128 * 1024 * 1024,
        ...spawnOptions,
    });
}

function reject(name, base, mutate, fragment, options = {}) {
    const value = structuredClone(base);
    mutate(value);
    const result = run(name, value, options);
    if (result.status === 0 || !result.stderr.includes(fragment)) failures.push(`${name} did not fail with ${fragment}: ${result.stderr}${result.stdout}`);
}

function expectThrows(name, operation, fragment) {
    try {
        operation();
        failures.push(`${name} did not reject`);
    } catch (error) {
        if (!String(error.message).includes(fragment)) failures.push(`${name} rejected with the wrong cause: ${error.message}`);
    }
}

function writeProofGateFixture(repository, waveId) {
    const stem = waveId.toLowerCase();
    const entrypoint = `test/proof/${stem}/run.mjs`;
    const runner = proofRunnerFixture(entrypoint);
    write(join(repository, runner.relative_path), runner.source);
    write(join(repository, entrypoint), `import { readFileSync } from "node:fs";\nconst expectedEnvironmentKeys=${JSON.stringify(proofEnvironmentKeys)};\nif(JSON.stringify(Object.keys(process.env).sort())!==JSON.stringify(expectedEnvironmentKeys))throw new Error("proof environment keys differ");\nconst i=process.argv.indexOf("--manifest");\nconst m=JSON.parse(readFileSync(process.argv[i+1],"utf8"));\nif(m.wave_id!==${JSON.stringify(waveId)}||m.result!=="pass")process.exit(2);\nprocess.stdout.write("PASS ${waveId}\\n");\n`);
    writeJson(join(repository, `test/proof/${stem}/manifest.json`), {
        schema: "vnext-proof-manifest/1",
        wave_id: waveId,
        wave_contract_sha256: contracts.get(waveId).sha256,
        seed_requirements: contracts.get(waveId).contract.seed_requirements,
        result: "pass",
    });
    return runner;
}

try {
    const assertionSpecifier = "./subject.ts";
    const assertionPrefix = `import assert from "node:assert/strict";\nimport { subject } from "${assertionSpecifier}";\n`;
    validateMirroredSourceAssertion(
        "positive-source-exercise.test.ts",
        `${assertionPrefix}const actual = subject + 1;\nassert.equal(actual, 2);\n`,
        assertionSpecifier,
    );
    validateMirroredSourceAssertion(
        "positive-source-receiver-exercise.test.ts",
        `${assertionPrefix}const actual = subject.valueOf();\nassert.equal(actual, 2);\n`,
        assertionSpecifier,
    );
    for (const [name, source] of [
        ["void-only-source-exercise", `${assertionPrefix}void subject;\nassert.equal(1, 1);\n`],
        ["message-only-source-exercise", `${assertionPrefix}assert.equal(1, 1, String(subject));\n`],
        ["ignored-argument-call-source-exercise", `${assertionPrefix}function ignore(_value) { return 1; }\nassert.equal(ignore(subject), 1);\n`],
        ["ignored-constructor-argument-source-exercise", `${assertionPrefix}class Ignore { constructor(_value) {} }\nassert.ok(new Ignore(subject));\n`],
        ["or-laundered-source-exercise", `${assertionPrefix}assert.ok(true || subject);\n`],
        ["and-laundered-source-exercise", `${assertionPrefix}assert.ok(false && subject);\n`],
        ["third-argument-source-exercise", `${assertionPrefix}assert.equal(1, 1, subject);\n`],
        ["discarded-derived-source-exercise", `${assertionPrefix}const actual = subject + 1;\nvoid actual;\nassert.equal(1, 1);\n`],
        ["uncalled-helper-source-exercise", `${assertionPrefix}function neverCalled() { assert.equal(subject, 1); }\nvoid neverCalled;\n`],
        ["dead-branch-source-exercise", `${assertionPrefix}if (false) assert.equal(subject, 1);\n`],
    ]) {
        expectThrows(name, () => validateMirroredSourceAssertion(`${name}.test.ts`, source, assertionSpecifier), "assertion actual/predicate");
    }
    const assertionTestPrefix = `${assertionPrefix}import test from "node:test";\n`;
    for (const [name, source, role] of [
        ["source-binding-shadow", `${assertionTestPrefix}test("source", () => { const subject = 1; assert.equal(subject, 1); });\n`, "source"],
        ["assertion-binding-shadow", `${assertionTestPrefix}test("assertion", () => { const assert = { equal() {} }; assert.equal(subject, 1); });\n`, "assertion"],
        ["test-binding-shadow", `${assertionTestPrefix}test("test", () => { const test = () => {}; assert.equal(subject, 1); });\n`, "test"],
    ]) {
        expectThrows(name, () => validateMirroredSourceAssertion(`${name}.test.ts`, source, assertionSpecifier), `lexically shadows imported ${role} proof binding`);
    }
    const constantLoaderPath = join(directory, "constant-demo-text-loader.mjs");
    write(constantLoaderPath, 'export async function load() { return { format: "module", shortCircuit: true, source: "export default \\\"constant\\\"" }; }\n');
    expectThrows("constant-demo-text-loader", () => validateCanonicalDemoTextLoader(constantLoaderPath), "exact canonical source-preserving loader required");

    prepareKeyframesConstellation(libraryCurrentFixtureRoot, "K00");
    const libraryFinalConstellation = prepareKeyframesConstellation(
        libraryFinalFixtureRoot,
        "K22T",
        finalAuthorityRelativePath,
    );
    cpSync(libraryFinalConstellation.authorityPath, join(currentRepository, finalAuthorityRelativePath));
    rmSync(finalRepository, { recursive: true, force: true });
    initializeRepository(currentRepository);
    writeJson(join(currentRepository, "package.json"), {
        name: "@mkbabb/keyframes.js",
        version: "6.0.0-fixture",
        type: "module",
        scripts: {
            "proof:k22t-target-tests": `node --test ${deriveTargetTests(target, "library").join(" ")}`,
        },
        exports: { ".": { types: "./dist/index.d.ts", import: "./dist/index.js" } },
    });
    write(join(currentRepository, ".npmrc"), "script-shell=/definitely/not-a-target-test-shell\n");
    writeProofGateFixture(currentRepository, "K00");
    writeProofGateFixture(currentRepository, "K22T");
    write(join(currentRepository, "TOMBSTONES.md"), "K22TTopologyCut\n");
    write(join(currentRepository, "docs/tranches/history.md"), "K22TTopologyCut\n");
    write(join(currentRepository, "src/index.ts"), "export const currentIndex = 1;\n");
    write(join(currentRepository, "src/old.ts"), "export const old = 1;\n");
    write(join(currentRepository, "src/fold.ts"), "export const fold = 1;\n");
    write(join(currentRepository, "test/src/old.test.ts"), "export {};\n");
    write(join(currentRepository, "bench/current.txt"), "benchmark support\n");
    write(join(currentRepository, "proof/current.txt"), "proof support\n");
    write(join(currentRepository, "dist/index.d.ts"), "export interface Program { id: string }\nexport declare const play: () => void;\n");
    write(join(currentRepository, "dist/index.js"), "export const play = () => {};\n");
    commit(currentRepository);

    execFileSync("git", ["clone", "--quiet", currentRepository, finalRepository]);
    git(finalRepository, "config", "user.email", "fixture@example.invalid");
    git(finalRepository, "config", "user.name", "Fixture");
    const gitBeforePath = join(directory, "k22t-git-before.json");
    runTool(process.execPath, [deletionTruthTool, "snapshot", "--phase", "before", "--repository", finalRepository, "--output", gitBeforePath], "K22T before Git snapshot");
    materializeTargetTree(
        finalRepository,
        "library",
        () => "export const subject = 1;\n",
        ({ sourcePath, specifier }) => `import test from "node:test";\nimport assert from "node:assert/strict";\nimport { subject } from "${specifier}";\ntest("mirrors ${sourcePath}", () => assert.equal(subject, 1));\n`,
    );
    write(join(finalRepository, "bench/current.txt"), "benchmark support\n");
    write(join(finalRepository, "proof/current.txt"), "proof support\n");
    commit(finalRepository);
    const gitAfterPath = join(directory, "k22t-git-after.json");
    const gitTruthPath = join(directory, "k22t-git-truth.json");
    runTool(process.execPath, [deletionTruthTool, "snapshot", "--phase", "after", "--repository", finalRepository, "--output", gitAfterPath], "K22T after Git snapshot");
    runTool(process.execPath, [deletionTruthTool, "delta", "--before", gitBeforePath, "--after", gitAfterPath, "--output", gitTruthPath], "K22T Git truth delta");
    const gitTruth = parseJsonStrict(readFileSync(gitTruthPath));
    const gitTruthBinding = { path: gitTruthPath, file_sha256: fileSha256(gitTruthPath), receipt_hash: gitTruth.receipt_hash };

    const currentSnapshot = makeCurrentSnapshot(currentRepository, "library", "library");
    const inventory = buildInventory(currentRepository, currentSnapshot, "library");
    const inventoryPath = join(directory, "current-inventory.json");
    writeJson(inventoryPath, inventory);
    const captureValidation = spawnSync(process.execPath, [inventoryValidator, "--inventory", inventoryPath, "--capture"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    if (captureValidation.status !== 0) throw new Error(`inventory capture fixture failed: ${captureValidation.stderr}`);
    const captureReceipt = parseJsonStrict(captureValidation.stdout.trim());
    const captureReceiptPath = join(directory, "current-inventory.capture.json");
    writeJson(captureReceiptPath, captureReceipt);
    const replayValidation = spawnSync(process.execPath, [inventoryValidator, "--inventory", inventoryPath, "--replay"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    if (replayValidation.status !== 0) throw new Error(`inventory replay fixture failed: ${replayValidation.stderr}`);
    const replayReceipt = parseJsonStrict(replayValidation.stdout.trim());
    const replayReceiptPath = join(directory, "current-inventory.replay.json");
    writeJson(replayReceiptPath, replayReceipt);

    const finalFiles = collectFinalFiles(finalRepository, "library");
    const mappings = new Map([
        ["source\0src/index.ts", ["keep", "src/index.ts"]],
        ["source\0src/old.ts", ["move", "src/model/program.ts"]],
        ["source\0src/fold.ts", ["fold", "src/model/program.ts"]],
        ["test\0test/src/old.test.ts", ["move", "test/src/model/program.test.ts"]],
        ["support\0bench/current.txt", ["keep", "bench/current.txt"]],
        ["support\0proof/current.txt", ["keep", "proof/current.txt"]],
    ]);
    const { currentFiles, decisions, finalByKey, introduced, rows } = buildTransposeRows(inventory, finalFiles, mappings, "library");

    const evidencePath = join(directory, "evidence.txt");
    write(evidencePath, "observed exact Keyframes transpose control\n");
    const evidence = evidenceObject(evidencePath);
    const dependency = genericReturn("V29T", evidence, currentRepository);
    const dependencyPath = join(directory, "v29t.return.json");
    writeJson(dependencyPath, dependency);
    const gate = gateReceipt(currentRepository, evidence);
    const inventoryBinding = { path: inventoryPath, file_sha256: fileSha256(inventoryPath), inventory_hash: inventory.inventory_hash };
    const captureReceiptBinding = { path: captureReceiptPath, file_sha256: fileSha256(captureReceiptPath), receipt_hash: captureReceipt.receipt_hash };
    const replayReceiptBinding = { path: replayReceiptPath, file_sha256: fileSha256(replayReceiptPath), receipt_hash: replayReceipt.receipt_hash };
    const ownerReturn = currentInventoryReturn({
        waveId: "K00",
        scope: "library",
        repository: currentRepository,
        evidence,
        dependencies: [dependencyBinding(dependencyPath, dependency, currentRepository)],
        gate,
        inventoryBinding,
        captureReceiptBinding,
        replayReceiptBinding,
        decisions,
    });
    const ownerReturnPath = join(directory, "k00.return.json");
    writeJson(ownerReturnPath, ownerReturn);
    const localDecisions = finalized({
        schema: "vnext-keyframes-local-target-decisions/1",
        wave_id: "K22T",
        scope: "library",
        decisions: [...decisions].sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id)),
        annex_hash: "",
    }, "annex_hash");
    const localPath = join(directory, "k22t-local-decisions.json");
    writeJson(localPath, localDecisions);
    attachLocalOwners(rows, introduced, "library", "K22T", localPath, localDecisions);
    const { delivery, effects, physical } = buildPhysicalTruth({
        waveId: "K22T",
        scope: "library",
        inventory,
        repository: finalRepository,
        gitTruthBinding,
        finalFiles,
        rows,
        introduced,
    });
    const physicalPath = join(directory, "k22t-physical-transpose.json");
    writeJson(physicalPath, physical);
    const base = buildTransposeLedger({
        scope: "library",
        repository: finalRepository,
        inventoryBinding,
        ownerReturnPath,
        ownerReturn,
        localPath,
        localDecisions,
        physicalPath,
        physical,
        rows,
        introduced,
        finalFiles,
        supportExceptions: [
            { path: "bench/current.txt", class: "benchmark", owner_wave_id: "K22T", rationale: "accepted benchmark support" },
            { path: "proof/current.txt", class: "proof", owner_wave_id: "K22T", rationale: "accepted proof support" },
        ],
    });

    const positive = run("positive", structuredClone(base));
    if (positive.status !== 0 || !positive.stdout.includes('"wave_id":"K22T"') || !positive.stdout.includes('"current_files":6')) {
        failures.push(`positive transpose failed: ${positive.stderr}${positive.stdout}`);
    }
    const ledgerPath = join(directory, "positive.ledger.json");
    const persistedLedger = parseJsonStrict(readFileSync(ledgerPath));
    const validationReceipt = positive.status === 0 ? parseJsonStrict(positive.stdout.trim()) : {};
    const historicalPositive = spawnSync(process.execPath, [validator, "--ledger", ledgerPath, "--offline-returns", "--historical-replay"], {
        encoding: "utf8",
        maxBuffer: 128 * 1024 * 1024,
    });
    if (historicalPositive.status !== 0 || positive.status !== 0
        || !same(parseJsonStrict(historicalPositive.stdout.trim()), validationReceipt)) {
        failures.push(`immutable historical K22T replay differed from direct validation: ${historicalPositive.stderr}${historicalPositive.stdout}`);
    }
    const validationPath = join(directory, "k22t-validation-receipt.json");
    writeJson(validationPath, validationReceipt);
    const consumer = resolveConsumerFixtureUniverse({
        constellation: libraryFinalConstellation,
        name: "k22t-consumer-universe",
        ownerWave: "K22T",
    });
    const deletion = makeDeletionJudgment(finalRepository, gitTruthBinding, gitTruth, consumer, evidence);
    const dependencyBindings = [];
    for (const waveId of [...contracts.get("K22T").contract.dependencies].sort(compareCanonicalText)) {
        if (waveId === "K00") {
            dependencyBindings.push(dependencyBinding(ownerReturnPath, ownerReturn, currentRepository));
            continue;
        }
        const returned = genericReturn(waveId, evidence, currentRepository);
        const path = join(directory, `${waveId.toLowerCase()}.return.json`);
        writeJson(path, returned);
        dependencyBindings.push(dependencyBinding(path, returned, currentRepository));
    }
    const k22tGate = gateReceipt(finalRepository, evidence, "K22T");
    const universal = transposeReturn({
        waveId: "K22T",
        scope: "library",
        currentWaveId: "K00",
        repository: finalRepository,
        evidence,
        dependencies: dependencyBindings,
        gate: k22tGate,
        ledgerPath,
        ledger: persistedLedger,
        inventoryBinding,
        ownerReturnPath,
        ownerReturn,
        localPath,
        localDecisions,
        physicalPath,
        physical,
        gitTruthBinding,
        validationPath,
        validationReceipt,
        deletion,
    });
    const universalPath = join(directory, "k22t.return.json");
    writeJson(universalPath, universal);
    const universalPositive = spawnSync(process.execPath, [returnValidator, universalPath, "--historical-certificate"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (universalPositive.status !== 0 || !universalPositive.stdout.includes('"mode":"offline-historical-certificate"')) {
        failures.push(`positive universal K22T transpose/deletion join failed: ${universalPositive.stderr}${universalPositive.stdout}`);
    }
    const originalDeletionBinding = universal.annexes["deletion-judgment"];
    const originalAuthorityBinding = deletion.annex.consumer_scan.bounds_authority;
    const originalAuthorityBytes = readFileSync(originalAuthorityBinding.path);
    const expectAuthorityRejected = (name, path, args, fragment) => {
        const result = spawnSync(process.execPath, [returnValidator, path, ...args], {
            encoding: "utf8",
            maxBuffer: 256 * 1024 * 1024,
        });
        const output = `${result.stderr}${result.stdout}`;
        if (result.status === 0 || !output.includes(fragment)) {
            failures.push(`${name} did not reject at the authority layer (${fragment}): ${output}`);
        }
    };
    const authorityReturnVariant = (name, mutateAnnex, mutateReturn = () => {}) => {
        const annex = structuredClone(deletion.annex);
        mutateAnnex(annex);
        finalized(annex, "annex_hash");
        const annexPath = join(directory, `${name}.deletion-judgment.json`);
        writeCanonical(annexPath, annex);
        const returned = structuredClone(universal);
        const binding = returned.annexes["deletion-judgment"];
        const evidenceInput = returned.evidence_inputs.find(({ path, sha256: digest }) =>
            path === originalDeletionBinding.path && digest === originalDeletionBinding.file_sha256);
        binding.path = realpathSync(annexPath);
        binding.file_sha256 = fileSha256(binding.path);
        binding.annex_hash = annex.annex_hash;
        if (!evidenceInput) throw new Error(`${name} cannot find the original deletion evidence input`);
        evidenceInput.path = binding.path;
        evidenceInput.sha256 = binding.file_sha256;
        mutateReturn(returned);
        finalized(returned, "return_hash");
        const returnPath = join(directory, `${name}.return.json`);
        writeJson(returnPath, returned);
        return realpathSync(returnPath);
    };
    const outsideAuthorityPath = join(directory, "outside-every-pin-consumer-bounds.json");
    write(outsideAuthorityPath, originalAuthorityBytes);
    expectAuthorityRejected(
        "authority-outside-every-pin",
        authorityReturnVariant("authority-outside-every-pin", (annex) => {
            annex.consumer_scan.bounds_authority.path = realpathSync(outsideAuthorityPath);
        }),
        ["--historical-certificate"],
        "exactly one return pin; observed 0",
    );
    const duplicatePin = structuredClone(universal);
    duplicatePin.pins.push(structuredClone(duplicatePin.pins[0]));
    finalized(duplicatePin, "return_hash");
    const duplicatePinPath = join(directory, "authority-two-containing-pins.return.json");
    writeJson(duplicatePinPath, duplicatePin);
    expectAuthorityRejected(
        "authority-two-containing-pins",
        realpathSync(duplicatePinPath),
        ["--historical-certificate"],
        "exactly one return pin; observed 2",
    );
    const untrackedAuthorityPath = join(finalRepository, "test/proof/untracked-consumer-bounds.json");
    write(untrackedAuthorityPath, originalAuthorityBytes);
    expectAuthorityRejected(
        "authority-untracked-at-pin",
        authorityReturnVariant("authority-untracked-at-pin", (annex) => {
            annex.consumer_scan.bounds_authority.path = realpathSync(untrackedAuthorityPath);
        }),
        ["--historical-certificate"],
        "tracked regular non-symlink file at the pinned commit",
    );
    unlinkSync(untrackedAuthorityPath);
    const symlinkAuthorityRepository = join(directory, "symlink-authority-pin");
    initializeRepository(symlinkAuthorityRepository);
    write(join(symlinkAuthorityRepository, "target.json"), originalAuthorityBytes);
    symlinkSync("target.json", join(symlinkAuthorityRepository, "authority.json"));
    commit(symlinkAuthorityRepository);
    const symlinkAuthorityIdentity = gitIdentity(symlinkAuthorityRepository);
    expectAuthorityRejected(
        "authority-symlink-at-pin",
        authorityReturnVariant(
            "authority-symlink-at-pin",
            (annex) => {
                annex.consumer_scan.bounds_authority.path = join(symlinkAuthorityRepository, "authority.json");
            },
            (returned) => {
                returned.pins.push({
                    repository: "symlink-authority-control",
                    path: realpathSync(symlinkAuthorityRepository),
                    branch: symlinkAuthorityIdentity.branch,
                    head: symlinkAuthorityIdentity.head,
                    dirty_before_sha256: symlinkAuthorityIdentity.dirty_sha256,
                    dirty_after_sha256: symlinkAuthorityIdentity.dirty_sha256,
                });
            },
        ),
        ["--historical-certificate"],
        "tracked regular non-symlink file at the pinned commit",
    );
    const changedAuthority = parseJsonStrict(originalAuthorityBytes);
    changedAuthority.purpose = `${changedAuthority.purpose} Mutable-checkout drift control.`;
    finalized(changedAuthority, "manifest_hash");
    writeCanonical(originalAuthorityBinding.path, changedAuthority);
    try {
        const changedBinding = {
            path: originalAuthorityBinding.path,
            file_sha256: fileSha256(originalAuthorityBinding.path),
            manifest_hash: changedAuthority.manifest_hash,
        };
        expectAuthorityRejected(
            "authority-bytes-changed-after-pin",
            authorityReturnVariant("authority-bytes-changed-after-pin", (annex) => {
                annex.consumer_scan.bounds_authority = changedBinding;
            }),
            ["--historical-certificate"],
            "file hash drift",
        );
    } finally {
        write(originalAuthorityBinding.path, originalAuthorityBytes);
    }
    const universalAnnex = universal.annexes["keyframes-target-transpose"];
    try {
        validateKeyframesCurrentDependencyInterface(universal, universalAnnex);
        validateKeyframesTransposeUniversalInterface(universal, universalAnnex, validationPath, universalPath);
    } catch (error) {
        failures.push(`positive specialized K22T interface failed: ${error.message}`);
    }
    for (const [waveId, status] of [
        ["K14", "COMPLETE"], ["K15", "COMPLETE"],
        ["K16", "COMPLETE"], ["K17", "COMPLETE"],
        ["K18", "COMPLETE"], ["K19", "COMPLETE"], ["K20", "COMPLETE"],
        ["K21", "COMPLETE"], ["K22", "REFUSED"],
    ]) {
        const forged = structuredClone(universal);
        const row = forged.scope.dependency_returns.find(({ wave_id }) => wave_id === waveId);
        const returned = parseJsonStrict(readFileSync(row.path));
        returned.status = status;
        finalized(returned, "return_hash");
        const path = join(directory, `wrong-status-${waveId.toLowerCase()}.return.json`);
        writeJson(path, returned);
        Object.assign(row, dependencyBinding(path, returned, currentRepository));
        expectThrows(
            `wrong-static-status-${waveId.toLowerCase()}`,
            () => validateKeyframesDirectDependencyIdentities(forged),
            ["K16", "K17"].includes(waveId) ? "requires KEEP" : "requires PRUNE",
        );
    }
    const directAuthority = validateKeyframesDirectDependencyIdentities(universal);
    const splitK00 = structuredClone(directAuthority.nodes.find(({ wave_id }) => wave_id === "K00"));
    splitK00.path = "/tmp/forged-k00.return.json";
    expectThrows(
        "split-k00-ancestry",
        () => {
            const identities = new Map();
            mergeKeyframesAuthorityNodes(identities, directAuthority.nodes, "direct dependencies");
            mergeKeyframesAuthorityNodes(identities, [splitK00], "owner closure");
        },
        "split ancestry gives K00 conflicting immutable identities",
    );
    emittedK22T = {
        root: directory,
        return: { path: universalPath, file_sha256: fileSha256(universalPath), return_hash: universal.return_hash },
        ledger: { path: ledgerPath, file_sha256: fileSha256(ledgerPath), manifest_hash: persistedLedger.manifest_hash },
        receipt: {
            path: validationPath,
            file_sha256: fileSha256(validationPath),
            semantic_hash: validationReceipt.semantic_hash,
            receipt_hash: validationReceipt.receipt_hash,
        },
    };
    const alternateK00 = structuredClone(ownerReturn);
    alternateK00.verdict = "alternate same-wave K00 return must not substitute for the bound inventory authority";
    finalized(alternateK00, "return_hash");
    const alternateK00Path = join(directory, "alternate-k00.return.json");
    writeJson(alternateK00Path, alternateK00);
    const alternateDependencyK22T = structuredClone(universal);
    const alternateDependencyRow = alternateDependencyK22T.scope.dependency_returns.find(({ wave_id }) => wave_id === "K00");
    Object.assign(alternateDependencyRow, dependencyBinding(alternateK00Path, alternateK00, currentRepository));
    expectThrows(
        "alternate-same-wave-k00-dependency",
        () => validateKeyframesCurrentDependencyInterface(alternateDependencyK22T, universalAnnex),
        "must equal the unique K00 scope dependency row",
    );
    for (const status of ["PRUNE", "REFUSED"]) {
        const nonCurrent = structuredClone(ownerReturn);
        nonCurrent.status = status;
        finalized(nonCurrent, "return_hash");
        const nonCurrentPath = join(directory, `${status.toLowerCase()}-k00.return.json`);
        writeJson(nonCurrentPath, nonCurrent);
        const forgedRecord = structuredClone(universal);
        const forgedAnnex = structuredClone(universalAnnex);
        const binding = { path: nonCurrentPath, file_sha256: fileSha256(nonCurrentPath), return_hash: nonCurrent.return_hash };
        Object.assign(forgedRecord.scope.dependency_returns.find(({ wave_id }) => wave_id === "K00"), binding);
        forgedAnnex.current_inventory_return = binding;
        expectThrows(
            `${status.toLowerCase()}-k00-current-dependency`,
            () => validateKeyframesCurrentDependencyInterface(forgedRecord, forgedAnnex),
            "requires COMPLETE",
        );
    }
    const forgedPhysical = structuredClone(physical);
    const forgedEffect = forgedPhysical.effects.find(({ effect }) => effect === "replace-in-place");
    forgedEffect.physical_owner_wave_id = "K00";
    finalized(forgedPhysical, "receipt_hash");
    const forgedPhysicalPath = join(directory, "forged-k22t-physical-transpose.json");
    writeJson(forgedPhysicalPath, forgedPhysical);
    const forgedLedger = structuredClone(persistedLedger);
    forgedLedger.physical_truth = { path: forgedPhysicalPath, file_sha256: fileSha256(forgedPhysicalPath), receipt_hash: forgedPhysical.receipt_hash };
    finalized(forgedLedger, "manifest_hash");
    const forgedLedgerPath = join(directory, "forged-k22t.ledger.json");
    writeJson(forgedLedgerPath, forgedLedger);
    const forgedValidation = structuredClone(validationReceipt);
    forgedValidation.ledger = { path: forgedLedgerPath, file_sha256: fileSha256(forgedLedgerPath), manifest_hash: forgedLedger.manifest_hash };
    forgedValidation.physical_truth_receipt_hash = forgedPhysical.receipt_hash;
    finalized(forgedValidation, "receipt_hash");
    const forgedValidationPath = join(directory, "forged-k22t-validation-receipt.json");
    writeJson(forgedValidationPath, forgedValidation);
    const forgedUniversal = structuredClone(universal);
    const transposeAnnex = forgedUniversal.annexes["keyframes-target-transpose"];
    transposeAnnex.ledger = { path: forgedLedgerPath, file_sha256: fileSha256(forgedLedgerPath), manifest_hash: forgedLedger.manifest_hash };
    transposeAnnex.physical_truth = { path: forgedPhysicalPath, file_sha256: fileSha256(forgedPhysicalPath), receipt_hash: forgedPhysical.receipt_hash };
    transposeAnnex.validation_receipt = { path: forgedValidationPath, file_sha256: fileSha256(forgedValidationPath), receipt_hash: forgedValidation.receipt_hash };
    for (const [oldPath, replacementPath] of [
        [ledgerPath, forgedLedgerPath],
        [physicalPath, forgedPhysicalPath],
        [validationPath, forgedValidationPath],
    ]) {
        const input = forgedUniversal.evidence_inputs.find(({ path }) => path === oldPath);
        input.path = replacementPath;
        input.sha256 = fileSha256(replacementPath);
    }
    finalized(forgedUniversal, "return_hash");
    const forgedUniversalPath = join(directory, "forged-k22t.return.json");
    writeJson(forgedUniversalPath, forgedUniversal);
    const universalForgery = spawnSync(process.execPath, [returnValidator, forgedUniversalPath, "--historical-certificate"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (universalForgery.status === 0 || !universalForgery.stderr.includes("must exactly equal K22T-owned physical effects")) {
        failures.push(`forged universal K22T transpose/deletion join was not rejected by the exact Git projection: ${universalForgery.stderr}${universalForgery.stdout}`);
    }

    reject("missing-current", base, (value) => value.rows.pop(), "every current file node");
    reject("wrong-current-hash", base, (value) => { value.rows[0].current_sha256 = "1".repeat(64); }, "current inventory mismatch");
    reject("invented-target", base, (value) => { value.rows.find(({ disposition }) => disposition === "move").target_id = "src/invented.ts"; }, "invented or wrong-kind");
    reject("missing-final-target", base, (value) => value.introduced_targets.pop(), "primary owners must cover every final file target");
    reject("duplicate-primary", base, (value) => value.introduced_targets.push(structuredClone(value.introduced_targets[0])), "exact unique kind/target_id");
    reject("wrong-result-file", base, (value) => { value.result.files[0].sha256 = "2".repeat(64); }, "/result/files");
    reject("graph-drift", base, (value) => value.result.graphs.runtime.edges.push({ from: "src/index.ts", to: "src/index.ts", specifier: "./index" }), "/result/graphs");
    reject("missing-support-type", base, (value) => value.result.support_exceptions.pop(), "one exact typed row");
    reject("wrong-owner-decision", base, (value) => { value.rows[0].owner.decision_hash = "3".repeat(64); }, "owner decision ID/hash");
    reject("unrelated-owner-wave", base, (value) => { value.rows[0].owner.wave_id = "P00"; }, "/local_decisions: must bind");
    reject("wrong-inventory-return", base, (value) => { value.current_inventory.return.return_hash = "4".repeat(64); }, "binding is stale, rehashed, or belongs to another wave");
    reject("local-receipt-drift", base, (value) => { value.local_decisions.annex_hash = "5".repeat(64); }, "/local_decisions/annex_hash");
    reject("future-owner-wave", base, (value) => { value.rows[0].owner.wave_id = "K23"; }, "/local_decisions: must bind");
    reject("delivery-omission", base, (value) => value.result.delivery.source.pop(), "/result/delivery");
    reject("synthetic-removed-path", base, (value) => {
        value.result.delivery.removed_paths.push("src/synthetic-removed.ts");
        value.result.delivery.removed_paths.sort(compareCanonicalText);
    }, "/result/delivery: exact source/test/support/removal/replacement projection required");
    reject("delete-reintroduce-old-coordinate", base, (value) => {
        const row = value.rows.find(({ current_id }) => current_id === "src/index.ts");
        row.disposition = "delete";
        row.target_id = null;
        row.target_sha256 = null;
        row.tombstone = "forged delete followed by reintroduction";
        value.introduced_targets.push({
            kind: row.kind,
            target_id: row.current_id,
            target_sha256: finalByKey.get(`${row.kind}\0${row.current_id}`).sha256,
            owner: structuredClone(row.owner),
            rationale: "forged reintroduction at the deleted coordinate",
        });
        value.introduced_targets.sort((left, right) => compareCanonicalText(`${left.kind}\0${left.target_id}`, `${right.kind}\0${right.target_id}`));
    }, "delete old coordinate src/index.ts remains materialized in the final tree");
    reject("move-reintroduce-old-coordinate", base, (value) => {
        const row = value.rows.find(({ current_id }) => current_id === "src/index.ts");
        const destination = value.introduced_targets.find(({ kind, target_id }) => kind === "source" && target_id !== row.current_id);
        row.disposition = "move";
        row.target_id = destination.target_id;
        row.target_sha256 = destination.target_sha256;
        value.introduced_targets.push({
            kind: row.kind,
            target_id: row.current_id,
            target_sha256: finalByKey.get(`${row.kind}\0${row.current_id}`).sha256,
            owner: structuredClone(row.owner),
            rationale: "forged materialization at the moved coordinate",
        });
        value.introduced_targets.sort((left, right) => compareCanonicalText(`${left.kind}\0${left.target_id}`, `${right.kind}\0${right.target_id}`));
    }, "move old coordinate src/index.ts remains materialized in the final tree");
    reject("physical-effect-forgery", base, (value) => {
        const forged = structuredClone(physical);
        forged.effects.pop();
        finalized(forged, "receipt_hash");
        const path = join(directory, "forged-physical.json");
        writeJson(path, forged);
        value.physical_truth = { path, file_sha256: fileSha256(path), receipt_hash: forged.receipt_hash };
    }, "/physical_truth/effects");
    reject("physical-delivery-forgery", base, (value) => {
        const forged = structuredClone(physical);
        forged.delivery.removed_paths.pop();
        finalized(forged, "receipt_hash");
        const path = join(directory, "forged-physical-delivery.json");
        writeJson(path, forged);
        value.physical_truth = { path, file_sha256: fileSha256(path), receipt_hash: forged.receipt_hash };
    }, "/physical_truth/delivery");

    for (const path of ["src", "test/src", "bench", "proof", "package.json"]) {
        rmSync(join(finalRepository, path), { recursive: true, force: true });
    }
    const deletedWorktreeReplay = spawnSync(process.execPath, [validator, "--ledger", ledgerPath, "--offline-returns", "--historical-replay"], {
        encoding: "utf8",
        maxBuffer: 128 * 1024 * 1024,
    });
    if (deletedWorktreeReplay.status !== 0
        || !same(parseJsonStrict(deletedWorktreeReplay.stdout.trim()), validationReceipt)) {
        failures.push(`K22T immutable replay failed after the live final artifacts were removed: ${deletedWorktreeReplay.stderr}${deletedWorktreeReplay.stdout}`);
    }
    execFileSync("git", ["-C", finalRepository, "checkout-index", "--all", "--force"]);

    const currentDrift = join(currentRepository, "untracked-drift.txt");
    write(currentDrift, "drift\n");
    const driftResult = spawnSync(process.execPath, [inventoryValidator, "--inventory", inventoryPath, "--replay"], {
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
    });
    if (driftResult.status !== 0) failures.push(`snapshot replay incorrectly depended on mutated old checkout: ${driftResult.stderr}${driftResult.stdout}`);
    unlinkSync(currentDrift);

    const demoCurrentConstellation = prepareKeyframesConstellation(demoCurrentFixtureRoot, "M00");
    const demoFinalConstellation = prepareKeyframesConstellation(
        demoFinalFixtureRoot,
        "M10T",
        finalAuthorityRelativePath,
    );
    cpSync(demoFinalConstellation.authorityPath, join(demoCurrentRepository, finalAuthorityRelativePath));
    rmSync(demoFinalRepository, { recursive: true, force: true });
    initializeRepository(demoCurrentRepository);
    const demoTestVector = deriveTargetTests(target, "demo");
    const demoTestCommand = `node --experimental-loader ./proof/demo-text-loader.mjs --test ${demoTestVector.join(" ")}`;
    writeJson(join(demoCurrentRepository, "package.json"), {
        name: "@mkbabb/keyframes.js",
        version: "6.0.0-demo-fixture",
        type: "module",
        scripts: {
            "proof:m10t-target-tests": demoTestCommand,
        },
        exports: { ".": { types: "./dist/index.d.ts", import: "./dist/index.js" } },
    });
    write(join(demoCurrentRepository, ".npmrc"), "script-shell=/definitely/not-a-target-test-shell\n");
    writeProofGateFixture(demoCurrentRepository, "M00");
    writeProofGateFixture(demoCurrentRepository, "M10T");
    write(join(demoCurrentRepository, canonicalDemoTextLoaderPath), canonicalDemoTextLoaderSource);
    validateCanonicalDemoTextLoader(join(demoCurrentRepository, canonicalDemoTextLoaderPath));
    write(join(demoCurrentRepository, "TOMBSTONES.md"), "M00TopologyCut\nM10TTopologyCut\n");
    write(join(demoCurrentRepository, "docs/tranches/history.md"), "M00TopologyCut\nM10TTopologyCut\n");
    write(join(demoCurrentRepository, "demo/app/main.ts"), 'export default "current-main";\n');
    write(join(demoCurrentRepository, "demo/legacy.ts"), 'export default "legacy";\n');
    write(join(demoCurrentRepository, "demo/fold.ts"), 'export default "fold";\n');
    write(join(demoCurrentRepository, "demo/rejected-vendor.ts"), 'export default "rejected vendor";\n');
    write(join(demoCurrentRepository, "test/demo/legacy.test.ts"), 'import legacy from "../../demo/legacy.ts";\nvoid legacy;\n');
    write(join(demoCurrentRepository, "dist/index.d.ts"), "export declare const play: () => void;\n");
    write(join(demoCurrentRepository, "dist/index.js"), "export const play = () => {};\n");
    commit(demoCurrentRepository);
    const m00GitBeforePath = join(directory, "m00-git-before.json");
    const m00GitAfterPath = join(directory, "m00-git-after.json");
    const m00GitTruthPath = join(directory, "m00-git-truth.json");
    runTool(process.execPath, [deletionTruthTool, "snapshot", "--phase", "before", "--repository", demoCurrentRepository, "--output", m00GitBeforePath], "M00 before Git snapshot");
    unlinkSync(join(demoCurrentRepository, "demo/rejected-vendor.ts"));
    commit(demoCurrentRepository);
    runTool(process.execPath, [deletionTruthTool, "snapshot", "--phase", "after", "--repository", demoCurrentRepository, "--output", m00GitAfterPath], "M00 after Git snapshot");
    runTool(process.execPath, [deletionTruthTool, "delta", "--before", m00GitBeforePath, "--after", m00GitAfterPath, "--output", m00GitTruthPath], "M00 Git truth delta");
    const m00GitTruth = parseJsonStrict(readFileSync(m00GitTruthPath));
    const m00GitTruthBinding = { path: m00GitTruthPath, file_sha256: fileSha256(m00GitTruthPath), receipt_hash: m00GitTruth.receipt_hash };

    execFileSync("git", ["clone", "--quiet", demoCurrentRepository, demoFinalRepository]);
    git(demoFinalRepository, "config", "user.email", "fixture@example.invalid");
    git(demoFinalRepository, "config", "user.name", "Fixture");
    const demoGitBeforePath = join(directory, "m10t-git-before.json");
    runTool(process.execPath, [deletionTruthTool, "snapshot", "--phase", "before", "--repository", demoFinalRepository, "--output", demoGitBeforePath], "M10T before Git snapshot");
    const demoTargetTests = materializeTargetTree(
        demoFinalRepository,
        "demo",
        (sourcePath, index) => {
            const marker = `fixture:${index}:${sourcePath}`;
            return sourcePath.endsWith(".ts") ? `export default ${JSON.stringify(marker)};\n` : `${marker}\n`;
        },
        ({ sourcePath, specifier, index }) => {
            const marker = `fixture:${index}:${sourcePath}`;
            return `import test from "node:test";\nimport assert from "node:assert/strict";\nimport sourceBytes from "${specifier}";\ntest("mirrors ${sourcePath}", () => assert.equal(sourceBytes.includes(${JSON.stringify(marker)}), true));\n`;
        },
    );
    commit(demoFinalRepository);
    const demoGitAfterPath = join(directory, "m10t-git-after.json");
    const demoGitTruthPath = join(directory, "m10t-git-truth.json");
    runTool(process.execPath, [deletionTruthTool, "snapshot", "--phase", "after", "--repository", demoFinalRepository, "--output", demoGitAfterPath], "M10T after Git snapshot");
    runTool(process.execPath, [deletionTruthTool, "delta", "--before", demoGitBeforePath, "--after", demoGitAfterPath, "--output", demoGitTruthPath], "M10T Git truth delta");
    const demoGitTruth = parseJsonStrict(readFileSync(demoGitTruthPath));
    const demoGitTruthBinding = { path: demoGitTruthPath, file_sha256: fileSha256(demoGitTruthPath), receipt_hash: demoGitTruth.receipt_hash };

    const demoSnapshot = makeCurrentSnapshot(demoCurrentRepository, "demo", "demo");
    const demoInventory = buildInventory(demoCurrentRepository, demoSnapshot, "demo");
    const demoInventoryPath = join(directory, "demo-current-inventory.json");
    writeJson(demoInventoryPath, demoInventory);
    const demoCaptureValidation = spawnSync(process.execPath, [inventoryValidator, "--inventory", demoInventoryPath, "--capture"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    if (demoCaptureValidation.status !== 0) throw new Error(`M00 inventory capture fixture failed: ${demoCaptureValidation.stderr}`);
    const demoCaptureReceipt = parseJsonStrict(demoCaptureValidation.stdout.trim());
    const demoCapturePath = join(directory, "demo-current-inventory.capture.json");
    writeJson(demoCapturePath, demoCaptureReceipt);
    const demoReplayValidation = spawnSync(process.execPath, [inventoryValidator, "--inventory", demoInventoryPath, "--replay"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    if (demoReplayValidation.status !== 0) throw new Error(`M00 inventory replay fixture failed: ${demoReplayValidation.stderr}`);
    const demoReplayReceipt = parseJsonStrict(demoReplayValidation.stdout.trim());
    const demoReplayPath = join(directory, "demo-current-inventory.replay.json");
    writeJson(demoReplayPath, demoReplayReceipt);
    if (demoInventory.nodes.some(({ kind }) => kind === "export")) failures.push("M00 demo inventory incorrectly captured library package exports");

    const demoFinalFiles = collectFinalFiles(demoFinalRepository, "demo");
    const demoMappings = new Map([
        ["source\0demo/app/main.ts", ["keep", "demo/app/main.ts"]],
        ["source\0demo/legacy.ts", ["move", "demo/state/model.ts"]],
        ["source\0demo/fold.ts", ["fold", "demo/state/model.ts"]],
        ["test\0test/demo/legacy.test.ts", ["move", "test/demo/state/model.test.ts"]],
        [`support\0${canonicalDemoTextLoaderPath}`, ["keep", canonicalDemoTextLoaderPath]],
    ]);
    const {
        currentFiles: demoCurrentFiles,
        decisions: demoDecisions,
        finalByKey: demoFinalByKey,
        introduced: demoIntroduced,
        rows: demoRows,
    } = buildTransposeRows(demoInventory, demoFinalFiles, demoMappings, "demo");
    const demoEvidencePath = join(directory, "demo-evidence.txt");
    write(demoEvidencePath, "observed exact Keyframes demo transpose control\n");
    const demoEvidence = evidenceObject(demoEvidencePath);
    const demoInventoryBinding = { path: demoInventoryPath, file_sha256: fileSha256(demoInventoryPath), inventory_hash: demoInventory.inventory_hash };
    const demoCaptureBinding = { path: demoCapturePath, file_sha256: fileSha256(demoCapturePath), receipt_hash: demoCaptureReceipt.receipt_hash };
    const demoReplayBinding = { path: demoReplayPath, file_sha256: fileSha256(demoReplayPath), receipt_hash: demoReplayReceipt.receipt_hash };
    const m00Consumer = resolveConsumerFixtureUniverse({
        constellation: demoCurrentConstellation,
        name: "m00-consumer-universe",
        ownerWave: "M00",
    });
    const m00Deletion = makeDeletionJudgment(demoCurrentRepository, m00GitTruthBinding, m00GitTruth, m00Consumer, demoEvidence, "M00");
    const m00Dependencies = [];
    for (const waveId of [...contracts.get("M00").contract.dependencies].sort(compareCanonicalText)) {
        const returned = genericReturn(waveId, demoEvidence, demoCurrentRepository);
        const path = join(directory, `m00-${waveId.toLowerCase()}.return.json`);
        writeJson(path, returned);
        m00Dependencies.push(dependencyBinding(path, returned, demoCurrentRepository));
    }
    const m00Gate = gateReceipt(demoCurrentRepository, demoEvidence, "M00");
    const m00Return = currentInventoryReturn({
        waveId: "M00",
        scope: "demo",
        repository: demoCurrentRepository,
        evidence: demoEvidence,
        dependencies: m00Dependencies,
        gate: m00Gate,
        inventoryBinding: demoInventoryBinding,
        captureReceiptBinding: demoCaptureBinding,
        replayReceiptBinding: demoReplayBinding,
        decisions: demoDecisions,
        deletion: m00Deletion,
    });
    const m00ReturnPath = join(directory, "m00.return.json");
    writeJson(m00ReturnPath, m00Return);
    const m00Universal = spawnSync(process.execPath, [returnValidator, m00ReturnPath, "--historical-certificate"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (m00Universal.status !== 0 || !m00Universal.stdout.includes('"mode":"offline-historical-certificate"')) {
        failures.push(`positive universal M00/demo inventory return failed: ${m00Universal.stderr}${m00Universal.stdout}`);
    }
    const forgedM00 = structuredClone(m00Return);
    forgedM00.annexes["keyframes-current-inventory"].scope = "library";
    finalized(forgedM00, "return_hash");
    const forgedM00Path = join(directory, "forged-m00.return.json");
    writeJson(forgedM00Path, forgedM00);
    const forgedM00Result = spawnSync(process.execPath, [returnValidator, forgedM00Path, "--historical-certificate"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (forgedM00Result.status === 0 || !forgedM00Result.stderr.includes("exact M00/demo identity")) {
        failures.push(`forged universal M00 typed inventory annex was not rejected: ${forgedM00Result.stderr}${forgedM00Result.stdout}`);
    }
    const demoLocalDecisions = finalized({
        schema: "vnext-keyframes-local-target-decisions/1",
        wave_id: "M10T",
        scope: "demo",
        decisions: [...demoDecisions].sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id)),
        annex_hash: "",
    }, "annex_hash");
    const demoLocalPath = join(directory, "m10t-local-decisions.json");
    writeJson(demoLocalPath, demoLocalDecisions);
    attachLocalOwners(demoRows, demoIntroduced, "demo", "M10T", demoLocalPath, demoLocalDecisions);
    const { physical: demoPhysical } = buildPhysicalTruth({
        waveId: "M10T",
        scope: "demo",
        inventory: demoInventory,
        repository: demoFinalRepository,
        gitTruthBinding: demoGitTruthBinding,
        finalFiles: demoFinalFiles,
        rows: demoRows,
        introduced: demoIntroduced,
    });
    const demoPhysicalPath = join(directory, "m10t-physical-transpose.json");
    writeJson(demoPhysicalPath, demoPhysical);
    const demoBase = buildTransposeLedger({
        scope: "demo",
        repository: demoFinalRepository,
        inventoryBinding: demoInventoryBinding,
        ownerReturnPath: m00ReturnPath,
        ownerReturn: m00Return,
        localPath: demoLocalPath,
        localDecisions: demoLocalDecisions,
        physicalPath: demoPhysicalPath,
        physical: demoPhysical,
        rows: demoRows,
        introduced: demoIntroduced,
        finalFiles: demoFinalFiles,
        supportExceptions: [{
            path: canonicalDemoTextLoaderPath,
            class: "tool",
            owner_wave_id: "M10T",
            rationale: "canonical source-preserving text loader required by executable demo target tests",
        }],
    });
    const demoPositive = run("demo-positive", structuredClone(demoBase));
    if (demoPositive.status !== 0
        || !demoPositive.stdout.includes('"wave_id":"M10T"')
        || !demoPositive.stdout.includes('"scope":"demo"')
        || !demoPositive.stdout.includes(`"current_files":${demoCurrentFiles.length}`)
        || !demoPositive.stdout.includes(`"files":${demoFinalFiles.length}`)) {
        failures.push(`positive M10T/demo transpose failed: ${demoPositive.stderr}${demoPositive.stdout}`);
    }
    const demoLedgerPath = join(directory, "demo-positive.ledger.json");
    const demoPersistedLedger = parseJsonStrict(readFileSync(demoLedgerPath));
    const demoValidationReceipt = demoPositive.status === 0 ? parseJsonStrict(demoPositive.stdout.trim()) : {};
    const demoHistoricalPositive = spawnSync(process.execPath, [validator, "--ledger", demoLedgerPath, "--offline-returns", "--historical-replay"], {
        encoding: "utf8",
        maxBuffer: 128 * 1024 * 1024,
    });
    if (demoHistoricalPositive.status !== 0 || demoPositive.status !== 0
        || !same(parseJsonStrict(demoHistoricalPositive.stdout.trim()), demoValidationReceipt)) {
        failures.push(`immutable historical M10T replay differed from direct validation: ${demoHistoricalPositive.stderr}${demoHistoricalPositive.stdout}`);
    }
    const demoValidationPath = join(directory, "m10t-validation-receipt.json");
    writeJson(demoValidationPath, demoValidationReceipt);

    reject("demo-owner-band-forgery", demoBase, (value) => {
        value.rows[0].owner.wave_id = "K00";
    }, "/local_decisions: must bind");
    reject("demo-old-coordinate-reintroduction", demoBase, (value) => {
        const row = value.rows.find(({ current_id }) => current_id === "demo/app/main.ts");
        const destination = value.introduced_targets.find(({ kind, target_id }) => kind === "source" && target_id !== row.current_id);
        row.disposition = "move";
        row.target_id = destination.target_id;
        row.target_sha256 = destination.target_sha256;
        value.introduced_targets.push({
            kind: row.kind,
            target_id: row.current_id,
            target_sha256: demoFinalByKey.get(`${row.kind}\0${row.current_id}`).sha256,
            owner: structuredClone(row.owner),
            rationale: "forged demo materialization at the moved coordinate",
        });
        value.introduced_targets.sort((left, right) => compareCanonicalText(`${left.kind}\0${left.target_id}`, `${right.kind}\0${right.target_id}`));
    }, "move old coordinate demo/app/main.ts remains materialized in the final tree");
    reject("demo-loader-command-forgery", demoBase, (value) => {
        value.test_contract.command = `node --test ${demoTargetTests.join(" ")}`;
    }, "/test_contract/command: exact scope-derived test command required");
    reject("demo-physical-scope-forgery", demoBase, (value) => {
        const forged = structuredClone(demoPhysical);
        forged.scope = "library";
        finalized(forged, "receipt_hash");
        const path = join(directory, "forged-m10t-physical-scope.json");
        writeJson(path, forged);
        value.physical_truth = { path, file_sha256: fileSha256(path), receipt_hash: forged.receipt_hash };
    }, "/physical_truth: exact snapshot/final-repository/target authority binding required");

    const demoConsumer = resolveConsumerFixtureUniverse({
        constellation: demoFinalConstellation,
        name: "m10t-consumer-universe",
        ownerWave: "M10T",
    });
    const demoDeletion = makeDeletionJudgment(demoFinalRepository, demoGitTruthBinding, demoGitTruth, demoConsumer, demoEvidence, "M10T");
    const m10tDependencies = [];
    for (const waveId of [...contracts.get("M10T").contract.dependencies].sort(compareCanonicalText)) {
        if (waveId === "M00") {
            m10tDependencies.push(dependencyBinding(m00ReturnPath, m00Return, demoCurrentRepository));
            continue;
        }
        const returned = genericReturn(waveId, demoEvidence, demoCurrentRepository);
        const path = join(directory, `m10t-${waveId.toLowerCase()}.return.json`);
        writeJson(path, returned);
        m10tDependencies.push(dependencyBinding(path, returned, demoCurrentRepository));
    }
    const m10tGate = gateReceipt(demoFinalRepository, demoEvidence, "M10T");
    const m10tReturn = transposeReturn({
        waveId: "M10T",
        scope: "demo",
        currentWaveId: "M00",
        repository: demoFinalRepository,
        evidence: demoEvidence,
        dependencies: m10tDependencies,
        gate: m10tGate,
        ledgerPath: demoLedgerPath,
        ledger: demoPersistedLedger,
        inventoryBinding: demoInventoryBinding,
        ownerReturnPath: m00ReturnPath,
        ownerReturn: m00Return,
        localPath: demoLocalPath,
        localDecisions: demoLocalDecisions,
        physicalPath: demoPhysicalPath,
        physical: demoPhysical,
        gitTruthBinding: demoGitTruthBinding,
        validationPath: demoValidationPath,
        validationReceipt: demoValidationReceipt,
        deletion: demoDeletion,
    });
    const m10tReturnPath = join(directory, "m10t.return.json");
    writeJson(m10tReturnPath, m10tReturn);
    const m10tUniversal = spawnSync(process.execPath, [returnValidator, m10tReturnPath, "--historical-certificate"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (m10tUniversal.status !== 0 || !m10tUniversal.stdout.includes('"mode":"offline-historical-certificate"')) {
        failures.push(`positive universal M10T/demo transpose/deletion join failed: ${m10tUniversal.stderr}${m10tUniversal.stdout}`);
    }
    const m10tAnnex = m10tReturn.annexes["keyframes-target-transpose"];
    try {
        validateKeyframesCurrentDependencyInterface(m10tReturn, m10tAnnex);
        validateKeyframesTransposeUniversalInterface(m10tReturn, m10tAnnex, demoValidationPath, m10tReturnPath);
    } catch (error) {
        failures.push(`positive specialized M10T interface failed: ${error.message}`);
    }
    const alternateM00 = structuredClone(m00Return);
    alternateM00.verdict = "alternate same-wave M00 return must not substitute for the bound demo inventory authority";
    finalized(alternateM00, "return_hash");
    const alternateM00Path = join(directory, "alternate-m00.return.json");
    writeJson(alternateM00Path, alternateM00);
    const alternateDependencyM10T = structuredClone(m10tReturn);
    Object.assign(
        alternateDependencyM10T.scope.dependency_returns.find(({ wave_id }) => wave_id === "M00"),
        dependencyBinding(alternateM00Path, alternateM00, demoCurrentRepository),
    );
    expectThrows(
        "alternate-same-wave-m00-dependency",
        () => validateKeyframesCurrentDependencyInterface(alternateDependencyM10T, m10tAnnex),
        "must equal the unique M00 scope dependency row",
    );
    const forgedM10T = structuredClone(m10tReturn);
    forgedM10T.annexes["keyframes-target-transpose"].scope = "library";
    finalized(forgedM10T, "return_hash");
    const forgedM10TPath = join(directory, "forged-m10t.return.json");
    writeJson(forgedM10TPath, forgedM10T);
    const forgedM10TResult = spawnSync(process.execPath, [returnValidator, forgedM10TPath, "--historical-certificate"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (forgedM10TResult.status === 0 || !forgedM10TResult.stderr.includes("exact M10T/demo identity")) {
        failures.push(`forged universal M10T typed transpose annex was not rejected: ${forgedM10TResult.stderr}${forgedM10TResult.stdout}`);
    }
} finally {
    if (!emitK22TFixturePath) rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    if (emitK22TFixturePath) rmSync(directory, { recursive: true, force: true });
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
if (emitK22TFixturePath) {
    if (!emittedK22T) {
        rmSync(directory, { recursive: true, force: true });
        throw new Error("K22T emitter completed without a validated source fixture");
    }
    writeJson(emitK22TFixturePath, emittedK22T);
}
process.stdout.write(`${JSON.stringify({
    schema: "vnext-keyframes-target-transpose-selftest/1",
    direct_positive: 6,
    universal_positive: 5,
    direct_rejections: 30,
    universal_rejections: 22,
    emitted_k22t_fixture: emitK22TFixturePath ?? null,
})}\n`);
