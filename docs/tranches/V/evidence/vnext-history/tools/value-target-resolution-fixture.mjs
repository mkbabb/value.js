import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    copyFileSync,
    existsSync,
    mkdirSync,
    readFileSync,
    realpathSync,
    writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

import {
    canonicalGateArgv,
    fileSha256,
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
import {
    consumerFixtureDeletionScan,
    prepareConsumerFixtureConstellation,
    resolveConsumerFixtureUniverse,
} from "./consumer-universe-fixture.mjs";
import {
    consumerCaptureEvidenceInputs,
    createConsumerImmutableCaptureAuthorityFixture,
} from "./consumer-immutable-capture-authority-fixture.mjs";
import { compareCanonicalText, canonicalize, parseJsonStrict } from "./json-contract.mjs";
import { resolveGitIdentity } from "./resolve-consumer-universe.mjs";
import { projectImmutableDependencyClosure, valueTargetDecisionHash } from "./value-target-owner-return.mjs";
import { loadWaveRegistry } from "./wave-contract.mjs";
import { requireWaveEdgePolicy, requireWaveOutcome } from "./wave-edge-policy.mjs";

const trancheRoot = resolve(dirname(new URL(import.meta.url).pathname), "..");
const deletionTruthPath = resolve(dirname(new URL(import.meta.url).pathname), "deletion-truth.mjs");
const valueInventoryValidatorPath = resolve(dirname(new URL(import.meta.url).pathname), "validate-value-current-inventory.mjs");
const ownerWaves = ["V16B", "V18H", "V18V", "V24"];
const waveRegistry = loadWaveRegistry();
const contracts = waveRegistry.contracts;
const edgePolicy = waveRegistry.edge_policy;
const executableFixtureWaves = (() => {
    const waves = new Set([...ownerWaves, "V00A", "V00C", "V29T"]);
    const visit = (waveId) => {
        for (const dependency of contracts.get(waveId)?.contract.dependencies ?? []) {
            if (waves.has(dependency)) continue;
            waves.add(dependency);
            visit(dependency);
        }
    };
    [...waves].forEach(visit);
    return [...waves].sort();
})();
const proofEntrypointPaths = executableFixtureWaves.map((waveId) => `test/proof/${waveId.toLowerCase()}/run.mjs`);
const residueCategories = ["consumers", "declarations", "documentation", "manifests-exports", "packed-artifacts", "source"];
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const notApplicable = (reason) => ({ applicability: "not_applicable", reason });
const auditWaves = new Set(["P00", "P02", "P07", "V00A", "V01", "V02", "V10I", "V30", "V31"]);
const requiresStandardsOperationVector = (waveId) => (
    /^V(?:0[1-9]|1\d|2\d)$/.test(waveId) || ["V10I", "V10S", "V10D"].includes(waveId)
);
const parserScopes = new Map([
    ["P00", "baseline"], ["P01", "prototype"], ["P02", "necessity-adjudication"],
    ["P03", "banked-proposal"], ["P04", "published-control"], ["P05", "control-crater"],
    ["P06", "consumer-crater"], ["P07", "acceptance"],
]);
const nodeExtensions = [".cjs", ".cts", ".js", ".jsx", ".mjs", ".mts", ".ts", ".tsx"];

function writeText(path, value) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, value);
}

function writeJson(path, value) {
    writeText(path, `${JSON.stringify(value, null, 2)}\n`);
}

function writeCanonical(path, value) {
    writeText(path, `${canonicalize(value)}\n`);
}

function finalize(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    value[member] = sha256(canonicalize(preimage));
    return value;
}

function git(repository, args, options = {}) {
    return execFileSync("git", ["-C", repository, ...args], options);
}

function gitText(repository, args) {
    return git(repository, args, { encoding: "utf8" }).trim();
}

function evidence(path, description) {
    const canonicalPath = realpathSync(path);
    return { path: canonicalPath, sha256: fileSha256(canonicalPath), description };
}

function gitStatusHash(repository) {
    return sha256(git(repository, ["status", "--porcelain=v1", "-z"]));
}

function runNode(arguments_, context) {
    const result = spawnSync(process.execPath, arguments_, {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
    if (result.status !== 0) {
        throw new Error(`${context}: ${(result.stderr || result.stdout || result.error?.message || "unknown failure").trim()}`);
    }
    return result.stdout;
}

function makeTruthReceipt(fixtureRoot, repository) {
    const beforePath = join(fixtureRoot, "deletion-before.json");
    const afterPath = join(fixtureRoot, "deletion-after.json");
    const receiptPath = join(fixtureRoot, "deletion-truth.json");
    runNode([deletionTruthPath, "snapshot", "--phase", "before", "--repository", repository, "--output", beforePath], "before truth snapshot");
    writeText(join(repository, "proof.txt"), "after: conditional facility candidate removed from the shared module\n");
    git(repository, ["add", "proof.txt"]);
    git(repository, ["commit", "-m", "fixture modified-only prune effect"]);
    runNode([deletionTruthPath, "snapshot", "--phase", "after", "--repository", repository, "--output", afterPath], "after truth snapshot");
    runNode([deletionTruthPath, "delta", "--before", beforePath, "--after", afterPath, "--output", receiptPath], "deletion truth delta");
    const receipt = parseJsonStrict(readFileSync(receiptPath));
    if (canonicalize(receipt.modified_paths) !== canonicalize(["proof.txt"]) || receipt.deleted_paths.length !== 0) {
        throw new Error("fixture deletion truth must have exactly one modified-file effect and no invented deletion");
    }
    return { receipt, path: realpathSync(receiptPath), fileSha256: fileSha256(receiptPath) };
}

function dependencyBinding(dependency, repository) {
    const challengeStates = dependency.record.annexes?.["implementation-challenge"]?.applicability === "applicable"
        ? dependency.record.annexes["implementation-challenge"].repository_states
        : [];
    return {
        wave_id: dependency.record.wave_id,
        path: dependency.path,
        file_sha256: dependency.fileSha256,
        return_hash: dependency.record.return_hash,
        wave_contract_sha256: dependency.record.scope.wave_contract_sha256,
        repository_states: dependency.record.pins.map((pin) => {
            const challengeState = challengeStates.find((state) => state.repository === pin.repository && state.path === pin.path);
            if (challengeState) return structuredClone(challengeState);
            for (const gate of dependency.record.gates) {
                const receipt = parseJsonStrict(readFileSync(gate.receipt.path));
                if (receipt.execution?.pin_repository === pin.repository && receipt.execution?.cwd === pin.path) {
                    return { repository: pin.repository, path: pin.path, sha256: receipt.execution.repository_state_sha256 };
                }
            }
            throw new Error(`dependency ${dependency.record.wave_id} pin ${pin.repository} has no certified state`);
        }).sort((left, right) => compareCanonicalText(`${left.repository}\0${left.path}`, `${right.repository}\0${right.path}`)),
        corpus_epoch: notApplicable("dependency has no inspected corpus epoch"),
    };
}

function gateReceipt(fixtureRoot, repository, commonEvidence, waveId, name = waveId.toLowerCase()) {
    const contract = contracts.get(waveId);
    const gate = contract.contract.gates[0];
    const argv = canonicalGateArgv(gate.subject, waveId);
    const executablePath = resolveCommand(argv.commandToken);
    const execution = spawnSync(executablePath, argv.args, {
        cwd: repository,
        encoding: null,
        env: proofRunnerEnvironment(),
        maxBuffer: 128 * 1024 * 1024,
        shell: false,
    });
    if (execution.error || execution.signal || execution.status !== 0) {
        throw new Error(`${waveId} fixture gate failed: ${execution.error?.message ?? execution.signal ?? execution.status}`);
    }
    const stdoutPath = join(fixtureRoot, `${name}.stdout`);
    const stderrPath = join(fixtureRoot, `${name}.stderr`);
    writeFileSync(stdoutPath, execution.stdout);
    writeFileSync(stderrPath, execution.stderr);
    const startedAt = Date.now();
    const receipt = {
        schema: "vnext-gate-receipt/3",
        wave_id: waveId,
        gate_id: gate.id,
        kind: gate.kind,
        subject: gate.subject,
        expected: gate.expected,
        wave_contract_sha256: contract.sha256,
        challenge_sha256: "0".repeat(64),
        proof_manifest: {
            path: proofManifestPath(repository, argv.manifestRelative),
            sha256: fileSha256(proofManifestPath(repository, argv.manifestRelative)),
        },
        started_at: new Date(startedAt).toISOString(),
        finished_at: new Date(startedAt + 250).toISOString(),
        result: "pass",
        execution: {
            applicability: "applicable",
            command_token: argv.commandToken,
            executable_path: executablePath,
            executable_sha256: fileSha256(executablePath),
            args: argv.args,
            cwd: repository,
            pin_repository: "resolution-fixture",
            repository_state_sha256: repositoryStateSha256(repository),
            environment_sha256: gateEnvironmentSha256(),
            exit_code: 0,
            stdout_path: realpathSync(stdoutPath),
            stdout_sha256: fileSha256(stdoutPath),
            stderr_path: realpathSync(stderrPath),
            stderr_sha256: fileSha256(stderrPath),
        },
        evidence: [commonEvidence],
        receipt_hash: "",
    };
    finalize(receipt, "receipt_hash");
    const path = join(fixtureRoot, `${name}.gate-receipt.json`);
    writeJson(path, receipt);
    return {
        receipt,
        path: realpathSync(path),
        binding: { path: realpathSync(path), sha256: fileSha256(path), description: `${waveId} executable npm gate receipt` },
    };
}

function sealGateRecord(gate, challenge) {
    sealGateReceiptChallenge(gate.receipt, challenge);
    writeJson(gate.path, gate.receipt);
    gate.binding.sha256 = fileSha256(gate.path);
    return gate;
}

function challengeActor(fixtureRoot, commonEvidence, waveId, role, sequence, startedAt, completedAt, reportText, challengeInput) {
    const stem = `${waveId.toLowerCase()}-${sequence}-${role}`;
    const sessionId = `session-${stem}`;
    const reportPath = join(fixtureRoot, `${stem}.report.md`);
    const sessionPath = join(fixtureRoot, `${stem}.session.jsonl`);
    const challengeInputText = canonicalize(challengeInput);
    const epochReportText = `${reportText.trimEnd()}\nVNEXT-CHALLENGE-INPUT ${challengeInputText}\n`;
    writeText(reportPath, epochReportText);
    const records = [
        { timestamp: new Date(startedAt).toISOString(), type: "session_meta", payload: { id: sessionId } },
        { timestamp: new Date(startedAt + 50).toISOString(), type: "response_item", payload: { type: "message", role: "user", content: [{ type: "input_text", text: `${role === "adjudicator" ? "ADJUDICATE-WAVE" : "ASSUME-WAVE-WRONG"} ${challengeInputText}` }] } },
        { timestamp: new Date(startedAt + 100).toISOString(), type: "turn_context", payload: { model: "gpt-5.6-sol", effort: "ultra" } },
        { timestamp: new Date(completedAt - 50).toISOString(), type: "response_item", payload: { type: "message", role: "assistant", phase: "final_answer", content: [{ type: "output_text", text: epochReportText }] } },
        { timestamp: new Date(completedAt).toISOString(), type: "event_msg", payload: { type: "task_complete", last_agent_message: epochReportText } },
    ];
    writeText(sessionPath, `${records.map((record) => JSON.stringify(record)).join("\n")}\n`);
    return {
        role,
        posture: role === "adjudicator" ? "adjudicate-not-vote" : "assume-wave-wrong",
        session_id: sessionId,
        session_jsonl: evidence(sessionPath, `${role} hostile-review session`),
        report: evidence(reportPath, `${role} hostile-review report`),
        axes: challengeInput.axes,
        verdict: role === "adjudicator" ? "ratified" : "clean",
        unresolved_findings: [],
    };
}

function implementationChallenge(fixtureRoot, repository, commonEvidence, waveId, gate, sequence, dependencyReturns, repositoryStates, semanticRecord) {
    const challengeInputBase = {
        schema: "vnext-implementation-challenge-input/1",
        wave_id: waveId,
        wave_contract_sha256: contracts.get(waveId).sha256,
        semantic_subject_sha256: implementationSemanticSubjectSha256(semanticRecord),
        dependency_closure_sha256: projectImmutableDependencyClosure(waveId, dependencyReturns).descendant_closure_hash,
        direct_dependency_returns: dependencyReturns.map((binding) => ({
            wave_id: binding.wave_id,
            path: binding.path,
            file_sha256: binding.file_sha256,
            return_hash: binding.return_hash,
            wave_contract_sha256: binding.wave_contract_sha256,
        })),
        implementation_state: {
            pins: repositoryStates.map((state) => ({
                repository: state.repository,
                path: state.path,
                head: state.head,
                dirty_after_sha256: state.dirty_after_sha256,
            })),
            repository_states: repositoryStates.map(({ repository, path, sha256: state }) => ({ repository, path, sha256: state })),
        },
        gate_contract: implementationGateContract(semanticRecord.gates),
    };
    const axes = () => ({
        tranche_fit_optimality: [commonEvidence],
        wave_contract_adherence_friction: [commonEvidence],
        feature_behavior: [commonEvidence],
    });
    const gateStart = Date.parse(gate.receipt.started_at);
    const criticA = challengeActor(
        fixtureRoot,
        commonEvidence,
        waveId,
        "critic_a",
        sequence,
        gateStart - 7000,
        gateStart - 5000,
        `${waveId} critic A found the terminal fixture internally coherent.\n`,
        { ...challengeInputBase, role: "critic_a", axes: axes() },
    );
    const criticB = challengeActor(
        fixtureRoot,
        commonEvidence,
        waveId,
        "critic_b",
        sequence,
        gateStart - 6500,
        gateStart - 4500,
        `${waveId} critic B independently found the terminal fixture internally coherent.\n`,
        { ...challengeInputBase, role: "critic_b", axes: axes() },
    );
    const inputHashes = [criticA.report.sha256, criticB.report.sha256];
    const adjudicator = challengeActor(
        fixtureRoot,
        commonEvidence,
        waveId,
        "adjudicator",
        sequence,
        gateStart - 4000,
        gateStart - 3000,
        `${waveId} adjudication ratifies critic_a ${inputHashes[0]} then critic_b ${inputHashes[1]}.\n`,
        {
            ...challengeInputBase,
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
    adjudicator.input_report_sha256 = inputHashes;
    return {
        schema: "vnext-implementation-challenge/1",
        applicability: "applicable",
        wave_id: waveId,
        wave_contract_sha256: contracts.get(waveId).sha256,
        repository_states: repositoryStates.map(({ repository: name, path, sha256: state }) => ({ repository: name, path, sha256: state })),
        critics: [criticA, criticB],
        adjudicator,
    };
}

function standardsSection(commonEvidence, waveId) {
    const outcome = (axis) => ({ status: "not_applicable", reason: `${axis} is outside the isolated ${waveId} decision fixture` });
    return {
        applicability: "applicable",
        manifest_sha256: commonEvidence.sha256,
        rows: [{
            feature_key: `fixture-${waveId.toLowerCase()}`,
            parse: outcome("parse"),
            type: outcome("type"),
            evaluate: outcome("evaluate"),
            resolve: outcome("resolve"),
            adapt: outcome("adapt"),
            exact: outcome("exact"),
            edit: outcome("edit"),
            canonical: outcome("canonical"),
            maturity_interop: "isolated conditional disposition fixture",
        }],
    };
}

function performanceSection(commonEvidence, waveId) {
    if (!["V16A", "V16B"].includes(waveId)) return notApplicable(`${waveId} has no mandatory performance section`);
    return {
        applicability: "applicable",
        environment: "isolated Node fixture",
        workload: "conditional owner proof",
        warmup: "one deterministic setup pass",
        samples: 1,
        metrics: ["gate pass"],
        allocation_memory: ["bounded fixture"],
        bundle_frame_energy: ["not material to semantic owner projection"],
        decision: "fixture proves the return contract, not facility worth",
        evidence: [commonEvidence],
    };
}

function deletionAnnex({ fixtureRoot, commonEvidence, consumer, truth, waveId, tombstonePath, pattern }) {
    const rootId = consumer.fixtureId;
    const deletedEffects = truth.receipt.deleted_paths.map((path) => ({
        root_id: rootId,
        path,
        truth_receipt_hash: truth.receipt.receipt_hash,
    }));
    const modifiedEffects = truth.receipt.modified_paths.map((path) => ({
        root_id: rootId,
        path,
        truth_receipt_hash: truth.receipt.receipt_hash,
    }));
    const effect = modifiedEffects[0] ?? deletedEffects[0];
    if (!effect) throw new Error(`${waveId} deletion fixture requires a deleted or modified physical effect`);
    const decisionId = `prune-${waveId.toLowerCase()}`;
    const tombstone = evidence(tombstonePath, `${waveId} by-name tombstone`);
    const roots = consumer.receipt.roots.map(({ id }) => ({
        root_id: id,
        status: "unaffected",
        evidence: [commonEvidence],
    })).sort((left, right) => compareCanonicalText(left.root_id, right.root_id));
    const allowedHits = [{
        root_id: rootId,
        path: basename(tombstonePath),
        pattern,
        line: readFileSync(tombstonePath, "utf8").split("\n").findIndex((line) => line.includes(pattern)) + 1,
        file_sha256: tombstone.sha256,
        classification: "tombstone",
        reason: "intentional current by-name tombstone",
        evidence: [tombstone],
    }];
    const casualtyScan = {
        consumer_receipt_hash: consumer.receipt.receipt_hash,
        patterns: [pattern],
        roots,
        active_hits: [],
        allowed_hits: allowedHits,
        scan_sha256: "",
    };
    casualtyScan.scan_sha256 = sha256(canonicalize({
        consumer_receipt_hash: casualtyScan.consumer_receipt_hash,
        decision_id: decisionId,
        patterns: casualtyScan.patterns,
        roots,
        active_hits: [],
        allowed_hits: allowedHits,
    }));
    const decision = {
        decision_id: decisionId,
        owner_wave: waveId,
        origin: { kind: "current-wave" },
        surface: { kind: "facility", name: pattern },
        file_effects: { deleted: deletedEffects, modified: modifiedEffects },
        intrinsic_job: { claim: "the conditional facility candidate has no retained intrinsic job", evidence: [commonEvidence] },
        judgment: "retired",
        replacement: {
            applicability: "not_applicable",
            reason: "the fixture records a terminal retire judgment",
            evidence: [commonEvidence],
        },
        casualty_scan: casualtyScan,
        tombstone: { name: pattern, evidence: tombstone },
        zero_residue: {
            categories: residueCategories.map((category) => ({ category, matches: 0, evidence: [commonEvidence] })),
        },
        decision_hash: "",
    };
    const decisionPreimage = structuredClone(decision);
    delete decisionPreimage.origin;
    delete decisionPreimage.decision_hash;
    decision.decision_hash = sha256(canonicalize(decisionPreimage));
    const annex = {
        schema: "vnext-deletion-judgment/1",
        phase: "owner-precut",
        wave_id: waveId,
        consumer_scan: consumerFixtureDeletionScan(consumer, "owner-precut"),
        root_snapshots: structuredClone(consumer.rootSnapshots),
        truth_receipts: [{
            owner_wave: waveId,
            root_id: rootId,
            path: truth.path,
            file_sha256: truth.fileSha256,
            receipt_hash: truth.receipt.receipt_hash,
        }],
        delivery_deleted: deletedEffects.map(({ root_id, path }) => ({ root_id, path })),
        disposition_deletions: [{ decision_id: decisionId, file_effects: decision.file_effects }],
        ancestor_returns: [],
        decisions: [decision],
        c10_removed_surfaces: [],
        annex_hash: "",
    };
    finalize(annex, "annex_hash");
    const path = join(fixtureRoot, `${waveId.toLowerCase()}.deletion-judgment.json`);
    writeCanonical(path, annex);
    return { annex, path: realpathSync(path), fileSha256: fileSha256(path), effect, decision, consumer };
}

function makeOwnerReturn({
    fixtureRoot,
    repository,
    commonEvidence,
    dependencies,
    gate,
    challengeSequence,
    deletion,
    waveId,
    status,
    pair,
}) {
    const contract = contracts.get(waveId);
    const identity = resolveGitIdentity(repository);
    const conditional = {
        decision_id: `conditional-${waveId.toLowerCase()}`,
        kind: "conditional-pair",
        source: pair.source,
        test: pair.test,
        outcome: status,
        decision_hash: "",
    };
    conditional.decision_hash = valueTargetDecisionHash(waveId, conditional);
    const deletionBinding = deletion ? {
        schema: "vnext-deletion-judgment-return-annex/1",
        wave_id: waveId,
        phase: "owner-precut",
        path: deletion.path,
        file_sha256: deletion.fileSha256,
        annex_hash: deletion.annex.annex_hash,
    } : undefined;
    const terminalDeletion = deletion ? [{
        decision_id: deletion.decision.decision_id,
        decision_hash: deletion.decision.decision_hash,
        file_effects: {
            deleted: [],
            modified: [{ repository: "resolution-fixture", path: deletion.effect.path }],
        },
    }] : [];
    const evidenceInputs = [{
        path: commonEvidence.path,
        sha256: commonEvidence.sha256,
        purpose: `${waveId} conditional disposition fixture`,
        class: "generated",
    }];
    if (deletion) evidenceInputs.push(
        { path: deletion.path, sha256: deletion.fileSha256, purpose: `${waveId} owner-precut deletion judgment`, class: "generated" },
        ...consumerCaptureEvidenceInputs(deletion.consumer, `${waveId} owner-precut consumer`),
    );
    const record = {
        schema: "vnext-wave-return/2",
        wave_id: waveId,
        status,
        return_hash: "",
        evidence_inputs: evidenceInputs,
        quarantine_attestation: {
            forbidden_path: "/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/vnext/r1-opus-refuted/",
            read: false,
            tool_log_path: commonEvidence.path,
            tool_log_sha256: commonEvidence.sha256,
        },
        pins: [{
            repository: "resolution-fixture",
            path: repository,
            branch: identity.branch,
            head: identity.head,
            dirty_before_sha256: gitStatusHash(repository),
            dirty_after_sha256: gitStatusHash(repository),
        }],
        scope: {
            mission: contract.contract.mission,
            wave_contract_sha256: contract.sha256,
            seed_requirements_verified: contract.contract.seed_requirements,
            dependency_returns: contract.contract.dependencies
                .map((dependency) => dependencyBinding(dependencies.get(dependency), repository))
                .sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id)),
            files_intended: [],
            files_changed: [],
        },
        born_red: {
            witness: contract.contract.born_red,
            reproduction: "node tools/selftest-value-target-resolutions.mjs",
            observed_failure: "a conditional outcome without its exact owner return could transpose ambiguously",
            evidence: [commonEvidence],
        },
        delivery: { source: [], tests: [], exports: [], deleted_paths: [], migrations: [] },
        dag_delta: notApplicable("the isolated resolution fixture does not alter the DAG"),
        gates: [{
            id: contract.contract.gates[0].id,
            kind: contract.contract.gates[0].kind,
            command_or_probe: contract.contract.gates[0].subject,
            expected: contract.contract.gates[0].expected,
            result: "pass",
            receipt: gate.binding,
            evidence: [commonEvidence],
        }],
        api_contract: notApplicable(`${waveId} has no API operation in this fixture`),
        visual: notApplicable(`${waveId} has no visual assertion in this fixture`),
        performance: performanceSection(commonEvidence, waveId),
        limits: notApplicable(`${waveId} has no limit assertion in this fixture`),
        consumers: notApplicable(`${waveId} has no consumer return section in this fixture`),
        terminal_disposition: {
            kept: status === "KEEP" ? [pair.source] : [],
            pruned: status === "PRUNE" ? [pair.source] : [],
            deletions: terminalDeletion,
            refusals: [],
            no_legacy_paths: true,
            standards_compatibility: [],
        },
        standards_operation_vector: standardsSection(commonEvidence, waveId),
        routed_remainder: [],
        verdict: `${waveId} fixture returns terminal ${status}`,
        annexes: {
            "value-target-disposition": {
                schema: "vnext-value-target-disposition-return-annex/1",
                wave_id: waveId,
                decisions: [conditional],
            },
            ...(deletionBinding ? { "deletion-judgment": deletionBinding } : {}),
        },
    };
    const challenge = implementationChallenge(
        fixtureRoot,
        repository,
        commonEvidence,
        waveId,
        gate,
        challengeSequence,
        record.scope.dependency_returns,
        record.pins.map((pin) => ({ ...pin, sha256: repositoryStateSha256(pin.path) })),
        record,
    );
    record.annexes["implementation-challenge"] = challenge;
    sealGateRecord(gate, challenge);
    record.gates[0].receipt = structuredClone(gate.binding);
    finalize(record, "return_hash");
    const path = join(fixtureRoot, `${waveId.toLowerCase()}-${status.toLowerCase()}.return.json`);
    writeJson(path, record);
    return {
        record,
        decision: conditional,
        path: realpathSync(path),
        fileSha256: fileSha256(path),
        evidence: { path: realpathSync(path), file_sha256: fileSha256(path), return_hash: record.return_hash },
    };
}

function initializeRepository(repository, pairs) {
    mkdirSync(repository, { recursive: true });
    const runner = proofRunnerFixture("test/proof/p00/run.mjs");
    const proofSource = [
        'import { readFileSync } from "node:fs";',
        `const expectedEnvironmentKeys = ${JSON.stringify(proofEnvironmentKeys)};`,
        'const actualEnvironmentKeys = Object.keys(process.env).sort();',
        'if (JSON.stringify(actualEnvironmentKeys) !== JSON.stringify(expectedEnvironmentKeys)) throw new Error(`proof environment differs: ${actualEnvironmentKeys.join(",")}`);',
        'const marker = process.argv.indexOf("--manifest");',
        'if (marker < 0 || !process.argv[marker + 1]) throw new Error("missing --manifest");',
        'const manifest = JSON.parse(readFileSync(process.argv[marker + 1], "utf8"));',
        'if (manifest.result !== "pass") process.exit(23);',
        'process.stdout.write(`PASS ${manifest.wave_id}\\n`);',
        "",
    ].join("\n");
    writeJson(join(repository, "package.json"), {
        name: "@mkbabb/value.js",
        version: "1.0.0",
        private: true,
        type: "module",
        exports: {
            "./fixture": {
                types: "./dist/fixture.d.ts",
                import: "./dist/fixture.js",
            },
        },
    });
    writeText(join(repository, runner.relative_path), runner.source);
    for (const waveId of executableFixtureWaves) {
        writeText(join(repository, "test", "proof", waveId.toLowerCase(), "run.mjs"), proofSource);
        writeJson(join(repository, "test", "proof", waveId.toLowerCase(), "manifest.json"), {
            schema: "vnext-proof-manifest/1",
            wave_id: waveId,
            wave_contract_sha256: contracts.get(waveId).sha256,
            seed_requirements: contracts.get(waveId).contract.seed_requirements,
            result: "pass",
        });
    }
    writeText(join(repository, "src", "fixture.ts"), "export const fixtureSource = true;\n");
    writeText(join(repository, "test", "fixture.test.ts"), "import { fixtureSource } from '../src/fixture.js';\nvoid fixtureSource;\n");
    writeText(join(repository, "dist", "fixture.js"), "export const fixtureRuntime = true;\n");
    writeText(join(repository, "dist", "fixture.d.ts"), "export declare const fixtureRuntime: true;\nexport interface fixtureType { readonly fixture: true }\n");
    writeText(join(repository, "proof.txt"), "before: conditional facility candidate shares this module\n");
    writeText(join(repository, "TOMBSTONES.md"), `${[
        ...ownerWaves.map((waveId) => `- ${pairs.get(waveId).pattern}`),
        "- vnext-resolution-fixture-v00b-tombstone",
    ].join("\n")}\n`);
    git(repository, ["init", "--initial-branch=main"]);
    if (gitText(repository, ["symbolic-ref", "--quiet", "--short", "HEAD"]) !== "main") {
        throw new Error("resolution fixture did not initialize on the exact main branch");
    }
    git(repository, ["config", "user.name", "Resolution Fixture"]);
    git(repository, ["config", "user.email", "resolution-fixture@example.invalid"]);
    git(repository, ["add", "."]);
    git(repository, ["commit", "-m", "fixture baseline"]);
    return realpathSync(repository);
}

function makeValueInventoryArtifacts(fixtureRoot, repository) {
    const snapshotRoot = join(fixtureRoot, "owner-inventory-snapshot");
    const capturedPaths = [
        "dist/fixture.d.ts",
        "dist/fixture.js",
        "package.json",
        "src/fixture.ts",
        "test/fixture.test.ts",
        ...proofEntrypointPaths,
    ];
    for (const relativePath of capturedPaths) {
        const destination = join(snapshotRoot, relativePath);
        mkdirSync(dirname(destination), { recursive: true });
        copyFileSync(join(repository, relativePath), destination);
    }
    const snapshotFiles = capturedPaths.map((relativePath) => ({
        path: relativePath,
        sha256: fileSha256(join(snapshotRoot, relativePath)),
    }));
    const inventory = {
        schema: "vnext-value-current-inventory/1",
        wave_id: "V00A",
        repository: {
            path: repository,
            branch: gitText(repository, ["symbolic-ref", "--quiet", "--short", "HEAD"]),
            head: gitText(repository, ["rev-parse", "HEAD"]),
            dirty_sha256: gitStatusHash(repository),
        },
        snapshot: {
            root: realpathSync(snapshotRoot),
            files: snapshotFiles,
            files_sha256: sha256(canonicalize(snapshotFiles)),
        },
        authority: {
            source_root: "src",
            test_root: "test",
            package_manifest: "package.json",
            node_extensions: nodeExtensions,
            package_manifest_sha256: fileSha256(join(repository, "package.json")),
        },
        test_exclusions: proofEntrypointPaths.map((path) => ({
            path,
            sha256: fileSha256(join(repository, path)),
            class: "nonlibrary",
            owner: "D00A",
            reason: "universal acceptance-proof entrypoint, not a library behavior test",
        })),
        nodes: [
            {
                kind: "export",
                id: "./fixture#fixtureRuntime:runtime",
                path: "dist/fixture.js",
                sha256: fileSha256(join(repository, "dist/fixture.js")),
                specifier: "./fixture",
                symbol: "fixtureRuntime",
                surface: "runtime",
            },
            {
                kind: "export",
                id: "./fixture#fixtureType:type",
                path: "dist/fixture.d.ts",
                sha256: fileSha256(join(repository, "dist/fixture.d.ts")),
                specifier: "./fixture",
                symbol: "fixtureType",
                surface: "type",
            },
            { kind: "source", id: "src/fixture.ts", path: "src/fixture.ts", sha256: fileSha256(join(repository, "src/fixture.ts")) },
            { kind: "test", id: "test/fixture.test.ts", path: "test/fixture.test.ts", sha256: fileSha256(join(repository, "test/fixture.test.ts")) },
        ],
        inventory_hash: "",
    };
    finalize(inventory, "inventory_hash");
    const inventoryPath = join(fixtureRoot, "owner-value-current-inventory.json");
    writeJson(inventoryPath, inventory);
    const receipts = new Map();
    for (const mode of ["live", "replay"]) {
        const receipt = parseJsonStrict(runNode([
            valueInventoryValidatorPath,
            "--inventory", inventoryPath,
            "--mode", mode,
        ], `owner V00A ${mode} inventory`));
        const receiptPath = join(fixtureRoot, `owner-value-current-inventory.${mode}.json`);
        writeJson(receiptPath, receipt);
        receipts.set(mode, {
            value: receipt,
            binding: { path: realpathSync(receiptPath), file_sha256: fileSha256(receiptPath), receipt_hash: receipt.receipt_hash },
        });
    }
    return {
        inventory: {
            value: inventory,
            binding: { path: realpathSync(inventoryPath), file_sha256: fileSha256(inventoryPath), contract_hash: inventory.inventory_hash },
        },
        capture: receipts.get("live"),
        replay: receipts.get("replay"),
    };
}

function makeParserFixture(fixtureRoot) {
    const stageRoot = join(fixtureRoot, "parse-that-stage");
    const packageRoot = join(stageRoot, "package");
    const installRoot = join(fixtureRoot, "parse-that-install");
    const installedPackage = join(installRoot, "node_modules", "@mkbabb", "parse-that");
    mkdirSync(packageRoot, { recursive: true });
    mkdirSync(installedPackage, { recursive: true });
    const packageJson = {
        name: "@mkbabb/parse-that",
        version: "1.0.0",
        main: "./index.js",
        types: "./index.d.ts",
        exports: { ".": { types: "./index.d.ts", default: "./index.js" } },
    };
    const files = new Map([
        ["package.json", `${JSON.stringify(packageJson, null, 2)}\n`],
        ["index.js", "export const parse = () => true;\n"],
        ["index.d.ts", "export declare const parse: () => boolean;\n"],
    ]);
    for (const [name, content] of files) {
        writeText(join(packageRoot, name), content);
        writeText(join(installedPackage, name), content);
    }
    const tarball = join(fixtureRoot, "mkbabb-parse-that-1.0.0.tgz");
    execFileSync("/usr/bin/tar", ["-czf", tarball, "-C", stageRoot, "package"]);
    const tarballBytes = readFileSync(tarball);
    const integrity = `sha512-${createHash("sha512").update(tarballBytes).digest("base64")}`;
    const rows = [...files].map(([path, content]) => ({
        path,
        bytes: Buffer.byteLength(content),
        sha256: sha256(content),
    })).sort((left, right) => compareCanonicalText(left.path, right.path));
    const resolved = "https://registry.npmjs.org/@mkbabb/parse-that/-/parse-that-1.0.0.tgz";
    const npmLsPath = join(fixtureRoot, "parse-that-npm-ls.json");
    const lockfilePath = join(installRoot, "package-lock.json");
    writeJson(npmLsPath, { dependencies: { "@mkbabb/parse-that": { version: "1.0.0", resolved } } });
    writeJson(lockfilePath, { lockfileVersion: 3, packages: { "node_modules/@mkbabb/parse-that": { version: "1.0.0", resolved, integrity } } });
    const receipt = {
        schema: "vnext-parse-that-package-receipt/1",
        package: { name: "@mkbabb/parse-that", version: "1.0.0", registry_spec: "@mkbabb/parse-that@1.0.0", integrity },
        tarball: { path: realpathSync(tarball), sha256: fileSha256(tarball) },
        archive: {
            package_json_sha256: rows.find(({ path }) => path === "package.json").sha256,
            file_count: rows.length,
            files_sha256: sha256(canonicalize(rows)),
            runtime_files_sha256: sha256(canonicalize(rows.filter(({ path }) => /\.(?:cjs|mjs|js)$/.test(path)))),
            declaration_files_sha256: sha256(canonicalize(rows.filter(({ path }) => /\.d\.(?:cts|mts|ts)$/.test(path)))),
            export_conditions_sha256: sha256(canonicalize({ exports: packageJson.exports, main: packageJson.main, module: null, types: packageJson.types })),
        },
        install: {
            root: installRoot,
            package_path: installedPackage,
            source_spec: "@mkbabb/parse-that@1.0.0",
            tree_sha256: sha256(canonicalize(rows)),
            npm_ls: { path: realpathSync(npmLsPath), sha256: fileSha256(npmLsPath) },
            lockfile: { path: realpathSync(lockfilePath), sha256: fileSha256(lockfilePath) },
            workspace_links: [],
        },
        receipt_hash: "",
    };
    finalize(receipt, "receipt_hash");
    const receiptPath = join(fixtureRoot, "parse-that-package-receipt.json");
    writeJson(receiptPath, receipt);
    const handoffPath = join(fixtureRoot, "parse-that-external-handoff.txt");
    writeText(handoffPath, "published-only parse-that 1.0.0; all novelty remains external\n");
    const receiptEvidence = evidence(receiptPath, "validated parse-that registry/no-link receipt");
    const handoffEvidence = evidence(handoffPath, "published-only external handoff");
    return (waveId) => ({
        schema: "vnext-parser-annex/1",
        scope_class: parserScopes.get(waveId),
        package: {
            name: receipt.package.name,
            version: receipt.package.version,
            registry_spec: receipt.package.registry_spec,
            branch: "unchanged-1.0.0-no-republish",
            integrity: receipt.package.integrity,
            tarball_sha256: receipt.tarball.sha256,
            package_json_sha256: receipt.archive.package_json_sha256,
            file_count: receipt.archive.file_count,
            file_manifest_sha256: receipt.archive.files_sha256,
            runtime_files_sha256: receipt.archive.runtime_files_sha256,
            declaration_files_sha256: receipt.archive.declaration_files_sha256,
            export_conditions_sha256: receipt.archive.export_conditions_sha256,
            no_link_install_sha256: receipt.install.tree_sha256,
            receipt_hash: receipt.receipt_hash,
        },
        coordinate_domains: ["original-utf16", "processed-utf16", "utf8-byte", "grammar-byte"],
        parser_invocations: new Set(["P00", "P01", "P05", "P06", "P07"]).has(waveId) ? 1 : 0,
        route_coverage: new Set(["P00", "P01", "P05", "P06", "P07"]).has(waveId) ? ["fixture:parse"] : [],
        control_receipt_sha256: receiptEvidence.sha256,
        external_handoff_sha256: handoffEvidence.sha256,
        blockers: [],
        evidence: [receiptEvidence, handoffEvidence],
    });
}

function applicableConsumers(commonEvidence, waveId) {
    const emptyClass = (name) => notApplicable(`${waveId} fixture has no ${name} consumer class`);
    return {
        applicability: "applicable",
        direct: emptyClass("direct"),
        peer: emptyClass("peer"),
        transitive: emptyClass("transitive"),
        casualties: [],
        migrations: [],
        packed_evidence: [commonEvidence],
    };
}

export function createValueTargetResolutionFixture({ tempRoot, formationTargetPath, consumerCaptureAuthority: suppliedConsumerCaptureAuthority }) {
    if (!tempRoot || !existsSync(tempRoot)) throw new Error("tempRoot must be an existing directory");
    const fixtureRoot = realpathSync(tempRoot);
    const consumerCaptureAuthority = suppliedConsumerCaptureAuthority
        ?? createConsumerImmutableCaptureAuthorityFixture({ fixtureRoot });
    const formationPath = realpathSync(formationTargetPath);
    const formation = parseJsonStrict(readFileSync(formationPath));
    const formationPreimage = structuredClone(formation);
    delete formationPreimage.manifest_sha256;
    const formationHash = sha256(canonicalize(formationPreimage));
    if (formation.manifest_sha256 !== formationHash) throw new Error("formation target self-hash drift");
    const conditionalPairs = new Map((formation.library?.conditional_paths ?? []).map((row) => [row.owner, {
        source: row.source,
        test: row.test,
        owner: row.owner,
        pattern: `vnext-resolution-fixture-${row.owner.toLowerCase()}-tombstone`,
    }]));
    if (ownerWaves.some((waveId) => !conditionalPairs.has(waveId)) || conditionalPairs.size !== ownerWaves.length) {
        throw new Error("formation target must expose the exact four conditional owner pairs");
    }

    const constellation = prepareConsumerFixtureConstellation({
        fixtureRoot,
        primary: {
            id: "value",
            repository: "resolution-fixture",
            ownerWave: "V16B",
        },
    });
    const repository = initializeRepository(constellation.primaryRepository, conditionalPairs);
    const commonPath = join(fixtureRoot, "evidence.txt");
    writeText(commonPath, "content-addressed resolution owner proof\n");
    const commonEvidence = evidence(commonPath, "resolution fixture evidence");
    const truth = makeTruthReceipt(fixtureRoot, repository);
    const consumer = resolveConsumerFixtureUniverse({
        constellation,
        name: "consumer-universe",
        edges: [],
    });
    consumerCaptureAuthority.register(consumer);
    const tombstonePath = realpathSync(join(repository, "TOMBSTONES.md"));
    const inventoryArtifacts = makeValueInventoryArtifacts(fixtureRoot, repository);
    const parserAnnex = makeParserFixture(fixtureRoot);
    const v00bDeletion = deletionAnnex({
        fixtureRoot,
        commonEvidence,
        consumer,
        truth,
        waveId: "V00B",
        tombstonePath,
        pattern: "vnext-resolution-fixture-v00b-tombstone",
    });
    const dependencies = new Map();
    let canonicalChallengeSequence = 100;

    function refreshImplementationChallenge(record) {
        const gateBinding = record.gates?.[0]?.receipt;
        if (!gateBinding?.path) throw new Error(`${record.wave_id} rebound return lacks its bound gate receipt`);
        const receipt = parseJsonStrict(readFileSync(gateBinding.path));
        receipt.schema = "vnext-gate-receipt/3";
        receipt.challenge_sha256 = "0".repeat(64);
        finalize(receipt, "receipt_hash");
        const gatePath = join(
            fixtureRoot,
            `rebound-${record.wave_id.toLowerCase()}-${canonicalChallengeSequence}.gate-receipt.json`,
        );
        writeJson(gatePath, receipt);
        const gate = {
            path: realpathSync(gatePath),
            receipt,
            binding: {
                path: realpathSync(gatePath),
                sha256: fileSha256(gatePath),
                description: `${record.wave_id} rebound executable npm gate receipt`,
            },
        };
        record.gates[0].receipt = structuredClone(gate.binding);
        const repositoryStates = record.pins.map((pin) => ({
            ...pin,
            path: realpathSync(pin.path),
            sha256: repositoryStateSha256(pin.path),
        })).sort((left, right) => (
            `${left.repository}\0${left.path}` < `${right.repository}\0${right.path}` ? -1
                : `${left.repository}\0${left.path}` > `${right.repository}\0${right.path}` ? 1 : 0
        ));
        const challenge = record.annexes?.["implementation-challenge"]?.applicability === "applicable"
            ? implementationChallenge(
                fixtureRoot,
                repository,
                commonEvidence,
                record.wave_id,
                gate,
                canonicalChallengeSequence++,
                record.scope.dependency_returns,
                repositoryStates,
                record,
            )
            : record.annexes?.["implementation-challenge"];
        record.annexes["implementation-challenge"] = challenge;
        sealGateRecord(gate, challenge);
        record.gates[0].receipt = structuredClone(gate.binding);
    }

    function makeCanonicalDependencyReturn(waveId, consumerWaveId) {
        const allowedStatuses = consumerWaveId
            ? requireWaveEdgePolicy(edgePolicy, waveId, consumerWaveId).allowed_statuses
            : requireWaveOutcome(edgePolicy, waveId).advancing_statuses;
        if (dependencies.has(waveId)) {
            const existing = dependencies.get(waveId);
            if (!allowedStatuses.includes(existing.record.status)) {
                throw new Error(
                    `${waveId} fixture status ${existing.record.status} cannot satisfy ${consumerWaveId ?? "root"} policy ${allowedStatuses.join("|")}`,
                );
            }
            return existing;
        }
        const contract = contracts.get(waveId);
        if (!contract) throw new Error(`missing dependency wave contract ${waveId}`);
        const directDependencies = contract.contract.dependencies.map((dependency) => (
            makeCanonicalDependencyReturn(dependency, waveId)
        ));
        const identity = resolveGitIdentity(repository);
        const gate = gateReceipt(fixtureRoot, repository, commonEvidence, waveId, `canonical-${waveId.toLowerCase()}`);
        const statusHash = gitStatusHash(repository);
        const pins = [{
            repository: "resolution-fixture",
            path: repository,
            branch: identity.branch,
            head: identity.head,
            dirty_before_sha256: statusHash,
            dirty_after_sha256: statusHash,
        }];
        const directBindings = directDependencies
            .map((dependency) => dependencyBinding(dependency, repository))
            .sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id));
        const deletion = waveId === "V00B" ? v00bDeletion : undefined;
        const deletionBinding = deletion ? {
            schema: "vnext-deletion-judgment-return-annex/1",
            wave_id: waveId,
            phase: "owner-precut",
            path: deletion.path,
            file_sha256: deletion.fileSha256,
            annex_hash: deletion.annex.annex_hash,
        } : undefined;
        const terminalDeletions = deletion ? [{
            decision_id: deletion.decision.decision_id,
            decision_hash: deletion.decision.decision_hash,
            file_effects: {
                deleted: [],
                modified: [{ repository: "resolution-fixture", path: deletion.effect.path }],
            },
        }] : [];
        const specialEvidence = [];
        const specialAnnexes = {};
        if (waveId === "V00A") {
            specialEvidence.push(
                { path: inventoryArtifacts.inventory.binding.path, sha256: inventoryArtifacts.inventory.binding.file_sha256, purpose: "executable owner-ancestry inventory", class: "generated" },
                { path: inventoryArtifacts.capture.binding.path, sha256: inventoryArtifacts.capture.binding.file_sha256, purpose: "executable owner-ancestry inventory capture", class: "runtime" },
                { path: inventoryArtifacts.replay.binding.path, sha256: inventoryArtifacts.replay.binding.file_sha256, purpose: "executable owner-ancestry inventory replay", class: "runtime" },
            );
            specialAnnexes["value-current-inventory"] = {
                schema: "vnext-value-current-inventory-return-annex/1",
                wave_id: "V00A",
                inventory: inventoryArtifacts.inventory.binding,
                capture_receipt: inventoryArtifacts.capture.binding,
                replay_receipt: inventoryArtifacts.replay.binding,
            };
        }
        if (deletion) {
            specialEvidence.push(
                {
                    path: deletion.path,
                    sha256: deletion.fileSha256,
                    purpose: `${waveId} executable owner-precut deletion judgment`,
                    class: "generated",
                },
                ...consumerCaptureEvidenceInputs(deletion.consumer, `${waveId} executable owner-precut consumer`),
            );
            specialAnnexes["deletion-judgment"] = deletionBinding;
        }
        if (parserScopes.has(waveId)) specialAnnexes.parser = parserAnnex(waveId);
        const record = {
            schema: "vnext-wave-return/2",
            wave_id: waveId,
            status: allowedStatuses[0],
            return_hash: "",
            evidence_inputs: [{
                path: commonEvidence.path,
                sha256: commonEvidence.sha256,
                purpose: `${waveId} executable owner-ancestry fixture`,
                class: "generated",
            }, ...specialEvidence],
            quarantine_attestation: {
                forbidden_path: "/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/vnext/r1-opus-refuted/",
                read: false,
                tool_log_path: commonEvidence.path,
                tool_log_sha256: commonEvidence.sha256,
            },
            pins,
            scope: {
                mission: contract.contract.mission,
                wave_contract_sha256: contract.sha256,
                seed_requirements_verified: contract.contract.seed_requirements,
                dependency_returns: directBindings,
                files_intended: [],
                files_changed: [],
            },
            born_red: {
                witness: contract.contract.born_red,
                reproduction: "node tools/selftest-value-target-resolutions.mjs",
                observed_failure: "an unvalidated dependency return could forge Value decision ancestry",
                evidence: [commonEvidence],
            },
            delivery: { source: [], tests: [], exports: [], deleted_paths: [], migrations: [] },
            dag_delta: notApplicable(`${waveId} executable owner-ancestry fixture does not alter the DAG`),
            gates: [{
                id: contract.contract.gates[0].id,
                kind: contract.contract.gates[0].kind,
                command_or_probe: contract.contract.gates[0].subject,
                expected: contract.contract.gates[0].expected,
                result: "pass",
                receipt: gate.binding,
                evidence: [commonEvidence],
            }],
            api_contract: notApplicable(`${waveId} owner-ancestry fixture has no API operation`),
            visual: notApplicable(`${waveId} owner-ancestry fixture has no visual assertion`),
            performance: performanceSection(commonEvidence, waveId),
            limits: notApplicable(`${waveId} owner-ancestry fixture has no limit assertion`),
            consumers: waveId === "P06"
                ? applicableConsumers(commonEvidence, waveId)
                : notApplicable(`${waveId} owner-ancestry fixture has no consumer assertion`),
            terminal_disposition: {
                kept: [`${waveId} executable owner-ancestry fixture`],
                pruned: [],
                deletions: terminalDeletions,
                refusals: [],
                no_legacy_paths: true,
                standards_compatibility: [],
            },
            standards_operation_vector: requiresStandardsOperationVector(waveId)
                ? standardsSection(commonEvidence, waveId)
                : notApplicable(`${waveId} owner-ancestry fixture has no standards assertion`),
            routed_remainder: [],
            verdict: `${waveId} executable owner ancestry is complete`,
            annexes: { ...specialAnnexes },
        };
        const challenge = auditWaves.has(waveId)
            ? notApplicable(`${waveId} is an audit wave in the executable owner-ancestry fixture`)
            : implementationChallenge(
                fixtureRoot,
                repository,
                commonEvidence,
                waveId,
                gate,
                canonicalChallengeSequence++,
                directBindings,
                pins.map((pin) => ({ ...pin, sha256: repositoryStateSha256(pin.path) })),
                record,
            );
        record.annexes["implementation-challenge"] = challenge;
        sealGateRecord(gate, challenge);
        record.gates[0].receipt = structuredClone(gate.binding);
        finalize(record, "return_hash");
        const path = join(fixtureRoot, `canonical-${waveId.toLowerCase()}.return.json`);
        writeJson(path, record);
        const result = {
            record,
            path: realpathSync(path),
            fileSha256: fileSha256(path),
            evidence: { path: realpathSync(path), file_sha256: fileSha256(path), return_hash: record.return_hash },
        };
        dependencies.set(waveId, result);
        return result;
    }

    for (const waveId of ownerWaves) {
        for (const dependency of contracts.get(waveId).contract.dependencies) {
            makeCanonicalDependencyReturn(dependency, waveId);
        }
    }
    makeCanonicalDependencyReturn("V00A");
    makeCanonicalDependencyReturn("V00B");
    const ownerReturns = new Map();
    for (const [sequence, waveId] of ownerWaves.entries()) {
        const pair = conditionalPairs.get(waveId);
        const deletion = deletionAnnex({
            fixtureRoot,
            commonEvidence,
            consumer,
            truth,
            waveId,
            tombstonePath,
            pattern: pair.pattern,
        });
        ownerReturns.set(waveId, new Map(["KEEP", "PRUNE"].map((status, statusIndex) => {
            const gate = gateReceipt(
                fixtureRoot,
                repository,
                commonEvidence,
                waveId,
                `${waveId.toLowerCase()}-${status.toLowerCase()}`,
            );
            return [status, makeOwnerReturn({
                fixtureRoot,
                repository,
                commonEvidence,
                dependencies,
                gate,
                challengeSequence: sequence * 2 + statusIndex + 1,
                deletion: status === "PRUNE" ? deletion : undefined,
                waveId,
                status,
                pair,
            })];
        })));
    }

    const structuralDependencies = new Map(dependencies);
    function dependencyFor(waveId, consumerWaveId) {
        if (!structuralDependencies.has(waveId)) {
            structuralDependencies.set(waveId, makeCanonicalDependencyReturn(waveId, consumerWaveId));
        } else if (consumerWaveId) {
            const dependency = structuralDependencies.get(waveId);
            const allowedStatuses = requireWaveEdgePolicy(edgePolicy, waveId, consumerWaveId).allowed_statuses;
            if (!allowedStatuses.includes(dependency.record.status)) {
                throw new Error(
                    `${waveId} fixture status ${dependency.record.status} cannot satisfy ${consumerWaveId} policy ${allowedStatuses.join("|")}`,
                );
            }
        }
        return structuralDependencies.get(waveId);
    }

    function writeReboundDependencyReturn(base, dependencyOverrides, name) {
        const record = structuredClone(base.record);
        record.scope.dependency_returns = record.scope.dependency_returns.map((binding) => (
            dependencyOverrides.has(binding.wave_id)
                ? dependencyBinding(dependencyOverrides.get(binding.wave_id), repository)
                : binding
        )).sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id));
        refreshImplementationChallenge(record);
        finalize(record, "return_hash");
        const path = join(fixtureRoot, `${name}.return.json`);
        writeJson(path, record);
        const canonicalPath = realpathSync(path);
        return {
            record,
            path: canonicalPath,
            fileSha256: fileSha256(canonicalPath),
            evidence: { path: canonicalPath, file_sha256: fileSha256(canonicalPath), return_hash: record.return_hash },
        };
    }

    function writeCoherentHistory({ roots, overrides = new Map(), name = "coherent" }) {
        const coherent = new Map();
        const active = new Set();
        const rebind = (waveId, consumerWaveId) => {
            if (coherent.has(waveId)) {
                const existing = coherent.get(waveId);
                if (consumerWaveId) {
                    const allowedStatuses = requireWaveEdgePolicy(edgePolicy, waveId, consumerWaveId).allowed_statuses;
                    if (!allowedStatuses.includes(existing.record.status)) {
                        throw new Error(
                            `${waveId} coherent status ${existing.record.status} cannot satisfy ${consumerWaveId} policy ${allowedStatuses.join("|")}`,
                        );
                    }
                }
                return existing;
            }
            if (active.has(waveId)) throw new Error(`coherent fixture ancestry cycle at ${waveId}`);
            active.add(waveId);
            const base = overrides.get(waveId) ?? dependencyFor(waveId, consumerWaveId);
            if (base?.record?.wave_id !== waveId) throw new Error(`coherent fixture override for ${waveId} is not wave-bound`);
            const contract = contracts.get(waveId);
            const record = structuredClone(base.record);
            record.scope.dependency_returns = contract.contract.dependencies
                .map((dependency) => dependencyBinding(rebind(dependency, waveId), repository))
                .sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id));
            refreshImplementationChallenge(record);
            finalize(record, "return_hash");
            const path = join(fixtureRoot, `${name}-${waveId.toLowerCase()}.return.json`);
            writeJson(path, record);
            const result = {
                record,
                path: realpathSync(path),
                fileSha256: fileSha256(path),
                evidence: { path: realpathSync(path), file_sha256: fileSha256(path), return_hash: record.return_hash },
                ...(base.decision ? { decision: structuredClone(base.decision) } : {}),
            };
            active.delete(waveId);
            coherent.set(waveId, result);
            return result;
        };
        for (const waveId of roots) rebind(waveId);
        return coherent;
    }

    function writeCompleteReturn({
        waveId,
        annexes,
        evidenceInputs = [],
        dependencyOverrides = new Map(),
        extraPins = [],
        deliveryDeletedPaths = [],
        terminalDeletions = [],
        name = waveId.toLowerCase(),
    }) {
        const contract = contracts.get(waveId);
        if (!contract) throw new Error(`missing wave contract ${waveId}`);
        const identity = resolveGitIdentity(repository);
        const gate = gateReceipt(fixtureRoot, repository, commonEvidence, waveId, `return-${name}`);
        const statusHash = gitStatusHash(repository);
        const pins = [{
            repository: "resolution-fixture",
            path: repository,
            branch: identity.branch,
            head: identity.head,
            dirty_before_sha256: statusHash,
            dirty_after_sha256: statusHash,
        }, ...extraPins];
        const dependencyReturns = contract.contract.dependencies
            .map((dependency) => dependencyBinding(
                dependencyOverrides.get(dependency) ?? dependencyFor(dependency, waveId),
                repository,
            ))
            .sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id));
        const challengeStates = pins.map((pin) => ({
            ...pin,
            sha256: repositoryStateSha256(pin.path),
        })).sort((left, right) => compareCanonicalText(`${left.repository}\0${left.path}`, `${right.repository}\0${right.path}`));
        const record = {
            schema: "vnext-wave-return/2",
            wave_id: waveId,
            status: requireWaveOutcome(edgePolicy, waveId).advancing_statuses[0],
            return_hash: "",
            evidence_inputs: [{
                path: commonEvidence.path,
                sha256: commonEvidence.sha256,
                purpose: `${waveId} reusable transpose fixture boundary`,
                class: "generated",
            }, ...evidenceInputs],
            quarantine_attestation: {
                forbidden_path: "/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/vnext/r1-opus-refuted/",
                read: false,
                tool_log_path: commonEvidence.path,
                tool_log_sha256: commonEvidence.sha256,
            },
            pins,
            scope: {
                mission: contract.contract.mission,
                wave_contract_sha256: contract.sha256,
                seed_requirements_verified: contract.contract.seed_requirements,
                dependency_returns: dependencyReturns,
                files_intended: [],
                files_changed: [],
            },
            born_red: {
                witness: contract.contract.born_red,
                reproduction: "node tools/selftest-value-target-transpose.mjs",
                observed_failure: "an unbound historical inventory or target decision could make the transpose ambiguous",
                evidence: [commonEvidence],
            },
            delivery: { source: [], tests: [], exports: [], deleted_paths: deliveryDeletedPaths, migrations: [] },
            dag_delta: notApplicable(`${waveId} reusable fixture does not assert a DAG delta`),
            gates: [{
                id: contract.contract.gates[0].id,
                kind: contract.contract.gates[0].kind,
                command_or_probe: contract.contract.gates[0].subject,
                expected: contract.contract.gates[0].expected,
                result: "pass",
                receipt: gate.binding,
                evidence: [commonEvidence],
            }],
            api_contract: notApplicable(`${waveId} reusable fixture has no API operation`),
            visual: notApplicable(`${waveId} reusable fixture has no visual assertion`),
            performance: performanceSection(commonEvidence, waveId),
            limits: notApplicable(`${waveId} reusable fixture has no limit assertion`),
            consumers: notApplicable(`${waveId} reusable fixture has no consumer assertion`),
            terminal_disposition: {
                kept: [`${waveId} reusable fixture`],
                pruned: [],
                deletions: terminalDeletions,
                refusals: [],
                no_legacy_paths: true,
                standards_compatibility: [],
            },
            standards_operation_vector: requiresStandardsOperationVector(waveId)
                ? standardsSection(commonEvidence, waveId)
                : notApplicable(`${waveId} reusable fixture has no standards assertion`),
            routed_remainder: [],
            verdict: `${waveId} reusable fixture is complete`,
            annexes: { ...annexes },
        };
        const challenge = auditWaves.has(waveId)
            ? notApplicable(`${waveId} is an audit wave with typed executable evidence`)
            : implementationChallenge(
                fixtureRoot,
                repository,
                commonEvidence,
                waveId,
                gate,
                50 + evidenceInputs.length,
                dependencyReturns,
                challengeStates,
                record,
            );
        record.annexes["implementation-challenge"] = challenge;
        sealGateRecord(gate, challenge);
        record.gates[0].receipt = structuredClone(gate.binding);
        finalize(record, "return_hash");
        const path = join(fixtureRoot, `${name}.return.json`);
        writeJson(path, record);
        return {
            record,
            path: realpathSync(path),
            fileSha256: fileSha256(path),
            evidence: { path: realpathSync(path), file_sha256: fileSha256(path), return_hash: record.return_hash },
        };
    }

    function writeV00AReturn({ inventory, captureReceipt, replayReceipt, name = "v00a-inventory" }) {
        return writeCompleteReturn({
            waveId: "V00A",
            name,
            evidenceInputs: [
                { path: inventory.path, sha256: inventory.file_sha256, purpose: "immutable Value current inventory", class: "generated" },
                { path: captureReceipt.path, sha256: captureReceipt.file_sha256, purpose: "Value inventory live-capture receipt", class: "runtime" },
                { path: replayReceipt.path, sha256: replayReceipt.file_sha256, purpose: "Value inventory immutable-replay receipt", class: "runtime" },
            ],
            annexes: {
                "value-current-inventory": {
                    schema: "vnext-value-current-inventory-return-annex/1",
                    wave_id: "V00A",
                    inventory,
                    capture_receipt: captureReceipt,
                    replay_receipt: replayReceipt,
                },
            },
        });
    }

    function writeV00CReturn({ v00aReturn, decisions, name = "v00c-target-decisions" }) {
        for (const decision of decisions) {
            if (decision.decision_hash !== valueTargetDecisionHash("V00C", decision)) {
                throw new Error(`invalid V00C decision hash ${decision.decision_id}`);
            }
        }
        const v00bReturn = writeReboundDependencyReturn(
            dependencyFor("V00B", "V00C"),
            new Map([["V00A", v00aReturn]]),
            `${name}-v00b`,
        );
        return writeCompleteReturn({
            waveId: "V00C",
            name,
            dependencyOverrides: new Map([["V00A", v00aReturn], ["V00B", v00bReturn]]),
            annexes: {
                "value-target-disposition": {
                    schema: "vnext-value-target-disposition-return-annex/1",
                    wave_id: "V00C",
                    decisions: [...decisions].sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id)),
                },
            },
        });
    }

    function writeV29TDeletion({ consumer, truth, tombstonePath, pattern }) {
        consumerCaptureAuthority.register(consumer);
        return deletionAnnex({
            fixtureRoot,
            commonEvidence,
            consumer,
            truth,
            waveId: "V29T",
            tombstonePath,
            pattern,
        });
    }

    function writeV29TReturn({ valueRoot, transposeAnnex, deletion, dependencyOverrides = new Map(), name = "v29t-target-transpose" }) {
        const repositoryName = "value-transpose-fixture";
        const valueIdentity = resolveGitIdentity(valueRoot);
        const dirtySha256 = gitStatusHash(valueRoot);
        const extraPin = {
            repository: repositoryName,
            path: realpathSync(valueRoot),
            branch: valueIdentity.branch,
            head: valueIdentity.head,
            dirty_before_sha256: dirtySha256,
            dirty_after_sha256: dirtySha256,
        };
        const artifactMembers = [
            "ledger",
            "current_inventory",
            "current_inventory_return",
            "target_paths",
            "conditional_resolutions",
            "css_execution_manifest",
            "public_surface",
            "physical_truth_receipt",
            "validation_receipt",
        ];
        const evidenceInputs = [{
            path: deletion.path,
            sha256: deletion.fileSha256,
            purpose: "V29T executable deletion judgment",
            class: "generated",
        }, ...consumerCaptureEvidenceInputs(deletion.consumer, "V29T executable deletion consumer"), ...artifactMembers.map((member) => ({
            path: transposeAnnex[member].path,
            sha256: transposeAnnex[member].file_sha256,
            purpose: `V29T ${member.replaceAll("_", " ")} binding`,
            class: member.endsWith("receipt") ? "runtime" : "generated",
        }))];
        const keys = evidenceInputs.map(({ path, sha256: hash }) => `${path}\0${hash}`);
        if (new Set(keys).size !== keys.length) throw new Error("V29T evidence bindings must be path/hash unique");
        const projectEffects = (effects) => effects.map(({ path }) => ({ repository: repositoryName, path }));
        const terminalDeletions = deletion.annex.decisions.map((decision) => ({
            decision_id: decision.decision_id,
            decision_hash: decision.decision_hash,
            file_effects: {
                deleted: projectEffects(decision.file_effects.deleted),
                modified: projectEffects(decision.file_effects.modified),
            },
        }));
        const deliveryDeletedPaths = deletion.annex.delivery_deleted.map(({ path }) => ({ repository: repositoryName, path }));
        return writeCompleteReturn({
            waveId: "V29T",
            name,
            dependencyOverrides,
            evidenceInputs,
            extraPins: [extraPin],
            deliveryDeletedPaths,
            terminalDeletions,
            annexes: {
                "deletion-judgment": {
                    schema: "vnext-deletion-judgment-return-annex/1",
                    wave_id: "V29T",
                    phase: "owner-precut",
                    path: deletion.path,
                    file_sha256: deletion.fileSha256,
                    annex_hash: deletion.annex.annex_hash,
                },
                "value-target-transpose": transposeAnnex,
            },
        });
    }

    function writeStandaloneV00CReturn({ decisions, name = "v00c-standalone-target-decisions" }) {
        return writeV00CReturn({ v00aReturn: dependencyFor("V00A", "V00C"), decisions, name });
    }

    function extendOwnerReturn({ waveId, status, decisions }) {
        const returned = ownerReturns.get(waveId)?.get(status);
        if (!returned) throw new Error(`missing ${waveId} ${status} fixture return`);
        const annex = returned.record.annexes["value-target-disposition"];
        for (const decision of decisions) {
            if (decision.decision_hash !== valueTargetDecisionHash(waveId, decision)) {
                throw new Error(`invalid ${waveId} decision hash ${decision.decision_id}`);
            }
        }
        annex.decisions = [...annex.decisions, ...decisions].sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id));
        refreshImplementationChallenge(returned.record);
        finalize(returned.record, "return_hash");
        writeJson(returned.path, returned.record);
        returned.fileSha256 = fileSha256(returned.path);
        returned.evidence = { path: returned.path, file_sha256: returned.fileSha256, return_hash: returned.record.return_hash };
        return returned;
    }

    function writeResolutions(outcomes, name = "value-target-resolutions") {
        const rows = [...conditionalPairs.values()]
            .sort((left, right) => compareCanonicalText(left.source, right.source))
            .map(({ source, test, owner }) => {
                const outcome = outcomes?.[owner];
                if (!new Set(["KEEP", "PRUNE"]).has(outcome)) throw new Error(`missing KEEP/PRUNE outcome for ${owner}`);
                const returned = ownerReturns.get(owner).get(outcome);
                return {
                    source,
                    test,
                    owner,
                    outcome,
                    decision_id: returned.decision.decision_id,
                    decision_hash: returned.decision.decision_hash,
                    return: returned.evidence,
                };
            });
        const manifest = {
            schema: "vnext-value-target-resolutions/1",
            wave_id: "V29T",
            formation_target: {
                path: formationPath,
                file_sha256: fileSha256(formationPath),
                manifest_hash: formationHash,
            },
            rows,
            manifest_hash: "",
        };
        finalize(manifest, "manifest_hash");
        const path = join(fixtureRoot, `${name}.json`);
        writeJson(path, manifest);
        return { manifest, path: realpathSync(path) };
    }

    return {
        fixtureRoot,
        repository,
        consumer,
        consumerCaptureAuthority,
        captureAuthorityArgs: () => consumerCaptureAuthority.captureAuthorityArgs(),
        consumerConstellation: constellation,
        formation: { path: formationPath, value: formation, manifestHash: formationHash },
        ownerReturns,
        extendOwnerReturn,
        writeV00AReturn,
        writeV00CReturn,
        writeV29TDeletion,
        writeV29TReturn,
        writeStandaloneV00CReturn,
        writeCoherentHistory,
        writeResolutions,
    };
}
