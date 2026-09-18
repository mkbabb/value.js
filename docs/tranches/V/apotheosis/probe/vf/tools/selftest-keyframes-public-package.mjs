#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path";

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
import {
    prepareConsumerFixtureConstellation,
    resolveConsumerFixtureUniverse,
} from "./consumer-universe-fixture.mjs";
import { liveCasualtyHits } from "./deletion-judgment.mjs";
import {
    computeVirtualModuleGraphs,
    fileSha256,
    gitIdentity,
    hashWithout,
    inspectTarball,
    sha256,
    sha512,
} from "./keyframes-contract.mjs";
import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";
import { projectImmutableDependencyClosure } from "./value-target-owner-return.mjs";

const validator = resolve(new URL("validate-keyframes-public-package.mjs", import.meta.url).pathname);
const proofValidator = resolve(new URL("validate-keyframes-public-package-proof.mjs", import.meta.url).pathname);
const returnValidator = resolve(new URL("validate-return.mjs", import.meta.url).pathname);
const transposeSelftest = resolve(new URL("selftest-keyframes-target-transpose.mjs", import.meta.url).pathname);
const deletionTruthTool = resolve(new URL("deletion-truth.mjs", import.meta.url).pathname);
let sourceDescriptorArgument;
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--source-descriptor" && process.argv[index + 1]) sourceDescriptorArgument = resolve(process.argv[++index]);
    else {
        process.stderr.write("usage: node selftest-keyframes-public-package.mjs [--source-descriptor <emitted-K22T-descriptor>]\n");
        process.exit(2);
    }
}
const targetPath = realpathSync(resolve(new URL("../KEYFRAMES-TARGET-PATHS.json", import.meta.url).pathname));
const target = parseJsonStrict(readFileSync(targetPath));
const contracts = loadWaveContracts();
const directory = realpathSync(mkdtempSync(join(tmpdir(), "vnext-keyframes-package-")));
const packageFixtureRoot = join(directory, "package-consumer-epoch");
const stage = join(packageFixtureRoot, "consumer-constellation", "keyframes");
const packageRoot = join(stage, "package");
const valueStage = join(directory, "value-stage");
const valuePackageRoot = join(valueStage, "package");
const failures = [];
let valueTarballEvidence;
let sourceFixtureRoot;
let sourceTransposeValidation;
const residueCategories = ["consumers", "declarations", "documentation", "manifests-exports", "packed-artifacts", "source"];
const write = (path, bytes) => {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, bytes);
};
const writeJson = (path, value) => write(path, `${JSON.stringify(value, null, 2)}\n`);
const writeCanonical = (path, value) => write(path, `${canonicalize(value)}\n`);
const notApplicable = (reason) => ({ applicability: "not_applicable", reason });
const evidenceObject = (path, description = "self-test evidence") => ({ path, sha256: fileSha256(path), description });

function finalized(value) {
    value.manifest_hash = hashWithout(value, "manifest_hash");
    return value;
}

function finalize(value, member) {
    value[member] = hashWithout(value, member);
    return value;
}

function deletionDecisionHash(decision) {
    const preimage = structuredClone(decision);
    delete preimage.origin;
    delete preimage.decision_hash;
    return sha256(canonicalize(preimage));
}

function runTool(command, args, context) {
    const result = spawnSync(command, args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (result.status !== 0) throw new Error(`${context}: ${(result.stderr || result.stdout).trim()}`);
    return result.stdout;
}

function initializeRepository(repository) {
    mkdirSync(repository, { recursive: true });
    execFileSync("git", ["init", "--initial-branch=fixture", repository], { stdio: "ignore" });
    execFileSync("git", ["-C", repository, "config", "user.email", "fixture@example.invalid"]);
    execFileSync("git", ["-C", repository, "config", "user.name", "Fixture"]);
}

function commit(repository) {
    execFileSync("git", ["-C", repository, "add", "."]);
    execFileSync("git", ["-C", repository, "commit", "-m", "fixture"], { stdio: "ignore" });
}

function closure(graph, entry) {
    const adjacency = new Map(graph.nodes.map((node) => [node, []]));
    for (const { from, to } of graph.edges) adjacency.get(from)?.push(to);
    const seen = new Set();
    const pending = [entry];
    while (pending.length) {
        const node = pending.pop();
        if (seen.has(node)) continue;
        seen.add(node);
        pending.push(...(adjacency.get(node) ?? []));
    }
    return [...seen].sort(compareCanonicalText);
}

function pack(name) {
    const path = join(directory, `${name}.tgz`);
    execFileSync("/usr/bin/tar", ["-czf", path, "-C", stage, "package"]);
    return path;
}

function valueFixture() {
    mkdirSync(valuePackageRoot, { recursive: true });
    writeJson(join(valuePackageRoot, "package.json"), {
        name: "@mkbabb/value.js",
        version: "5.0.0",
        type: "module",
        exports: { ".": { types: "./index.d.ts", import: "./index.js" } },
    });
    write(join(valuePackageRoot, "index.js"), "export const value = 1;\n");
    write(join(valuePackageRoot, "index.d.ts"), "export declare const value: number;\n");
    const path = join(directory, "value-5.0.0.tgz");
    execFileSync("/usr/bin/tar", ["-czf", path, "-C", valueStage, "package"]);
    const inspected = inspectTarball(path);
    valueTarballEvidence = { path, sha256: inspected.sha256, sha512: inspected.sha512, integrity: inspected.integrity };
}

function fixtureFiles({ version = "7.0.0", rootEngineImport = false, wildcard = false, externalImport = "" } = {}) {
    rmSync(packageRoot, { recursive: true, force: true });
    mkdirSync(packageRoot, { recursive: true });
    writeJson(join(packageRoot, "package.json"), {
        name: "@mkbabb/keyframes.js",
        version,
        type: "module",
        dependencies: { "@mkbabb/value.js": "^5.0.0" },
        exports: {
            ".": { types: "./dist/index.d.ts", import: "./dist/index.js" },
            "./engine": { types: "./dist/engine.d.ts", import: "./dist/engine.js" },
        },
    });
    const sideEffect = `${rootEngineImport ? 'import "./engine.js";\n' : ""}${externalImport ? `import ${JSON.stringify(externalImport)};\n` : ""}`;
    const typeSideEffect = `${rootEngineImport ? 'import "./engine.js";\n' : ""}${externalImport ? `import ${JSON.stringify(externalImport)};\n` : ""}`;
    write(join(packageRoot, "dist/index.js"), `${sideEffect}${wildcard ? 'export * from "./light.js";' : 'export { play } from "./light.js";'}\n`);
    write(join(packageRoot, "dist/light.js"), "export const play = () => {};\n");
    write(join(packageRoot, "dist/engine.js"), 'export { runEngine } from "./heavy.js";\n');
    write(join(packageRoot, "dist/heavy.js"), "export const runEngine = () => {};\n");
    write(join(packageRoot, "dist/index.d.ts"), `${typeSideEffect}${wildcard ? 'export * from "./light.js";' : 'export { play } from "./light.js";\nexport type { Program } from "./light.js";'}\n`);
    write(join(packageRoot, "dist/light.d.ts"), "export interface Program { id: string }\nexport declare const play: () => void;\n");
    write(join(packageRoot, "dist/engine.d.ts"), 'export { runEngine } from "./heavy.js";\nexport type { EnginePlan } from "./heavy.js";\n');
    write(join(packageRoot, "dist/heavy.d.ts"), "export interface EnginePlan { id: string }\nexport declare const runEngine: () => void;\n");
}

function manifestFor(tarballPath) {
    const inspected = inspectTarball(tarballPath);
    const runtimePaths = inspected.files.map(({ path }) => path).filter((path) => /\.(?:cjs|mjs|js)$/.test(path));
    const declarationPaths = inspected.files.map(({ path }) => path).filter((path) => /\.d\.(?:cts|mts|ts)$/.test(path));
    const graphs = {
        runtime: computeVirtualModuleGraphs(inspected.contents, runtimePaths).runtime,
        type: computeVirtualModuleGraphs(inspected.contents, declarationPaths).type,
    };
    const rootRuntime = "dist/index.js";
    const rootDeclaration = "dist/index.d.ts";
    const engineRuntime = "dist/engine.js";
    const engineDeclaration = "dist/engine.d.ts";
    const declarationHash = (path) => sha256(inspected.contents.get(path));
    const runtimeHash = (path) => sha512(inspected.contents.get(path));
    const exports = [
        { id: ".#Program:type", specifier: ".", symbol: "Program", surface: "type", source: "src/index.ts", declaration: { path: rootDeclaration, sha256: declarationHash(rootDeclaration) } },
        { id: ".#play:runtime", specifier: ".", symbol: "play", surface: "runtime", source: "src/index.ts", declaration: { path: rootDeclaration, sha256: declarationHash(rootDeclaration) }, runtime: { path: rootRuntime, sha512: runtimeHash(rootRuntime) } },
        { id: "./engine#EnginePlan:type", specifier: "./engine", symbol: "EnginePlan", surface: "type", source: "src/entries/heavy.ts", declaration: { path: engineDeclaration, sha256: declarationHash(engineDeclaration) } },
        { id: "./engine#runEngine:runtime", specifier: "./engine", symbol: "runEngine", surface: "runtime", source: "src/entries/heavy.ts", declaration: { path: engineDeclaration, sha256: declarationHash(engineDeclaration) }, runtime: { path: engineRuntime, sha512: runtimeHash(engineRuntime) } },
    ].sort((left, right) => compareCanonicalText(left.id, right.id));
    return finalized({
        schema: "vnext-keyframes-public-package/1",
        wave_id: "K23",
        source_transpose_validation: structuredClone(sourceTransposeValidation),
        target_paths: { path: targetPath, file_sha256: fileSha256(targetPath), manifest_sha256: target.manifest_sha256 },
        package: {
            name: "@mkbabb/keyframes.js",
            version: "7.0.0",
            tarball: { path: tarballPath, sha256: inspected.sha256, sha512: inspected.sha512, integrity: inspected.integrity },
            archive: {
                package_json_sha256: sha256(inspected.contents.get("package.json")),
                files: inspected.files,
                files_sha256: sha256(canonicalize(inspected.files)),
            },
        },
        exports,
        graphs,
        boundary: {
            root: { specifier: ".", source: "src/index.ts", runtime_entry: rootRuntime, declaration_entry: rootDeclaration, runtime_closure: closure(graphs.runtime, rootRuntime), type_closure: closure(graphs.type, rootDeclaration) },
            engine: { specifier: "./engine", source: "src/entries/heavy.ts", runtime_entry: engineRuntime, declaration_entry: engineDeclaration, runtime_closure: closure(graphs.runtime, engineRuntime), type_closure: closure(graphs.type, engineDeclaration) },
        },
        install_contract: {
            package_manager: "npm",
            source: "exact-tarball",
            network: "offline",
            lifecycle_scripts: "forbidden",
            workspace_links: [],
            dependencies: [{ name: "@mkbabb/value.js", version: "5.0.0", tarball: valueTarballEvidence }],
            timeout_ms: 5000,
            probes: [
                { specifier: ".", runtime_symbols: ["play"], type_symbols: ["Program"] },
                { specifier: "./engine", runtime_symbols: ["runEngine"], type_symbols: ["EnginePlan"] },
            ],
        },
        manifest_hash: "",
    });
}

function makeDeletionJudgment(repository, gitTruthBinding, gitTruth, consumer, proof) {
    const tombstoneName = "K23PublicLoaderCut";
    const decisionId = "k23-public-loader-cut";
    const tombstonePath = realpathSync(join(repository, "TOMBSTONES.md"));
    const hits = liveCasualtyHits(consumer.receipt, [tombstoneName], {
        ignoredDirectoryNames: parseJsonStrict(readFileSync(consumer.authorityBinding.path)).bounds.ignored_directory_names,
    });
    const allowed = hits.map((hit) => ({
        ...hit,
        classification: "tombstone",
        reason: "intentional current package-loader tombstone",
        evidence: [evidenceObject(tombstonePath, "package-loader tombstone")],
    })).sort((left, right) => compareCanonicalText(
        canonicalize({ root_id: left.root_id, path: left.path, pattern: left.pattern, line: left.line, file_sha256: left.file_sha256 }),
        canonicalize({ root_id: right.root_id, path: right.path, pattern: right.pattern, line: right.line, file_sha256: right.file_sha256 }),
    ));
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
        patterns: [tombstoneName],
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
        owner_wave: "K23",
        origin: { kind: "current-wave" },
        surface: { kind: "facility", name: tombstoneName },
        file_effects: fileEffects,
        intrinsic_job: { claim: "the loader mirror has no independent job after native package boundaries", evidence: [proof] },
        judgment: "retired",
        replacement: { applicability: "not_applicable", reason: "native dynamic import replaces the loader mirror", evidence: [proof] },
        casualty_scan: casualtyScan,
        tombstone: { name: tombstoneName, evidence: evidenceObject(tombstonePath, "package-loader tombstone") },
        zero_residue: { categories: residueCategories.map((category) => ({ category, matches: 0, evidence: [proof] })) },
        decision_hash: "",
    };
    decision.decision_hash = deletionDecisionHash(decision);
    const annex = finalize({
        schema: "vnext-deletion-judgment/1",
        phase: "owner-precut",
        wave_id: "K23",
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
        truth_receipts: [{ owner_wave: "K23", root_id: "keyframes", ...gitTruthBinding }],
        delivery_deleted: gitTruth.deleted_paths.map((path) => ({ root_id: "keyframes", path })),
        disposition_deletions: [{ decision_id: decision.decision_id, file_effects: fileEffects }],
        ancestor_returns: [],
        decisions: [decision],
        c10_removed_surfaces: [],
        annex_hash: "",
    }, "annex_hash");
    const path = join(directory, "k23-deletion-judgment.json");
    writeCanonical(path, annex);
    return { annex, path, decision };
}

function gateReceipt(repository, evidence) {
    const contract = contracts.get("K23");
    const gate = contract.contract.gates[0];
    const argv = canonicalGateArgv(gate.subject, "K23");
    const executable = resolveCommand(argv.commandToken);
    const execution = spawnSync(executable, argv.args, {
        cwd: repository,
        encoding: null,
        env: proofRunnerEnvironment(),
        maxBuffer: 64 * 1024 * 1024,
        shell: false,
    });
    if (execution.error || execution.signal || execution.status !== 0) {
        throw new Error(`K23 fixture gate failed: ${execution.error?.message ?? execution.signal ?? execution.status}`);
    }
    const stdoutPath = join(directory, "k23.stdout");
    const stderrPath = join(directory, "k23.stderr");
    write(stdoutPath, execution.stdout);
    write(stderrPath, execution.stderr);
    const receipt = finalize({
        schema: "vnext-gate-receipt/3",
        wave_id: "K23",
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
    }, "receipt_hash");
    const path = join(directory, "k23.gate-receipt.json");
    writeJson(path, receipt);
    return { receipt, binding: { path, sha256: fileSha256(path), description: "K23 live gate receipt" } };
}

function writeJsonl(path, records) {
    write(path, `${records.map((record) => JSON.stringify(record)).join("\n")}\n`);
}

function challengeActor(waveId, evidence, role, reportText, startedAt, completedAt, challengeInput) {
    const stem = `${waveId.toLowerCase()}-${role}`;
    const sessionId = `session-${stem}`;
    const reportPath = join(directory, `${stem}.report.md`);
    const sessionPath = join(directory, `${stem}.session.jsonl`);
    const challengeInputText = canonicalize(challengeInput);
    const epochReport = `${reportText.trimEnd()}\nVNEXT-CHALLENGE-INPUT ${challengeInputText}\n`;
    write(reportPath, epochReport);
    writeJsonl(sessionPath, [
        { timestamp: new Date(startedAt).toISOString(), type: "session_meta", payload: { id: sessionId } },
        { timestamp: new Date(startedAt + 100).toISOString(), type: "response_item", payload: { type: "message", role: "user", content: [{ type: "input_text", text: `${role === "adjudicator" ? "ADJUDICATE-WAVE" : "ASSUME-WAVE-WRONG"} ${challengeInputText}` }] } },
        { timestamp: new Date(startedAt + 200).toISOString(), type: "turn_context", payload: { model: "gpt-5.6-sol", effort: "ultra" } },
        { timestamp: new Date(completedAt - 100).toISOString(), type: "response_item", payload: { type: "message", role: "assistant", phase: "final_answer", content: [{ type: "output_text", text: epochReport }] } },
        { timestamp: new Date(completedAt).toISOString(), type: "event_msg", payload: { type: "task_complete", last_agent_message: epochReport } },
    ]);
    return {
        role,
        posture: role === "adjudicator" ? "adjudicate-not-vote" : "assume-wave-wrong",
        session_id: sessionId,
        session_jsonl: { path: sessionPath, sha256: fileSha256(sessionPath), description: `${role} fresh Sol-ultra session` },
        report: { path: reportPath, sha256: fileSha256(reportPath), description: `${role} final-state challenge report` },
        axes: challengeInput.axes,
        verdict: role === "adjudicator" ? "ratified" : "clean",
        unresolved_findings: [],
    };
}

function implementationChallenge(record, repository, evidence, gate, dependencies) {
    const waveId = record.wave_id;
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
    const criticA = challengeActor(waveId, evidence, "critic_a", `${waveId} critic A found the final semantic boundary coherent.\n`, gateStart - 7000, gateStart - 5000, { ...inputBase, role: "critic_a", axes: axes() });
    const criticB = challengeActor(waveId, evidence, "critic_b", `${waveId} critic B independently found the final semantic boundary coherent.\n`, gateStart - 6500, gateStart - 4500, { ...inputBase, role: "critic_b", axes: axes() });
    const inputHashes = [criticA.report.sha256, criticB.report.sha256];
    const adjudicator = challengeActor(
        waveId,
        evidence,
        "adjudicator",
        `${waveId} adjudication ratifies critic_a ${inputHashes[0]} then critic_b ${inputHashes[1]}.\n`,
        gateStart - 4000,
        gateStart - 3000,
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
    adjudicator.input_report_sha256 = inputHashes;
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

function dependencyBinding(path, returned) {
    const repositoryStates = returned.annexes?.["implementation-challenge"]?.repository_states;
    if (!Array.isArray(repositoryStates) || !repositoryStates.length) {
        throw new Error("genuine K22T source return requires specialized repository-state evidence");
    }
    return {
        wave_id: "K22T",
        path,
        file_sha256: fileSha256(path),
        return_hash: returned.return_hash,
        wave_contract_sha256: contracts.get("K22T").sha256,
        repository_states: structuredClone(repositoryStates),
        corpus_epoch: notApplicable("K22T predecessor fixture has no inspected corpus epoch"),
    };
}

function k23Return({
    repository,
    evidence,
    dependency,
    gate,
    deletion,
    manifest,
    manifestPath,
    validationReceipt,
    validationPath,
}) {
    const identity = gitIdentity(repository);
    const contract = contracts.get("K23");
    const manifestBinding = {
        path: manifestPath,
        file_sha256: fileSha256(manifestPath),
        manifest_hash: manifest.manifest_hash,
    };
    const sourceBinding = {
        path: dependency.path,
        file_sha256: dependency.file_sha256,
        return_hash: dependency.return_hash,
    };
    const targetBinding = {
        path: manifest.target_paths.path,
        file_sha256: manifest.target_paths.file_sha256,
        manifest_sha256: manifest.target_paths.manifest_sha256,
    };
    const validationBinding = {
        path: validationPath,
        file_sha256: fileSha256(validationPath),
        receipt_hash: validationReceipt.receipt_hash,
    };
    const projectEffects = (kind) => deletion.decision.file_effects[kind]
        .map(({ path }) => ({ repository: "fixture", path }))
        .sort((left, right) => compareCanonicalText(`${left.repository}\0${left.path}`, `${right.repository}\0${right.path}`));
    const deletedEffects = projectEffects("deleted");
    const modifiedEffects = projectEffects("modified");
    const record = {
        schema: "vnext-wave-return/2",
        wave_id: "K23",
        status: "COMPLETE",
        return_hash: "",
        evidence_inputs: [
            { path: evidence.path, sha256: evidence.sha256, purpose: "K23 universal package fixture control", class: "generated" },
            { path: deletion.path, sha256: fileSha256(deletion.path), purpose: "K23 owner-precut deletion judgment", class: "generated" },
            { path: manifestBinding.path, sha256: manifestBinding.file_sha256, purpose: "K23 exact public package manifest", class: "generated" },
            { path: sourceBinding.path, sha256: sourceBinding.file_sha256, purpose: "K23 terminal K22T source transpose return", class: "generated" },
            { path: targetBinding.path, sha256: targetBinding.file_sha256, purpose: "K23 canonical target paths", class: "seed" },
            { path: validationBinding.path, sha256: validationBinding.file_sha256, purpose: "K23 packed package validation receipt", class: "runtime" },
        ],
        quarantine_attestation: {
            forbidden_path: "/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/vnext/r1-opus-refuted/",
            read: false,
            tool_log_path: evidence.path,
            tool_log_sha256: evidence.sha256,
        },
        pins: [{
            repository: "fixture",
            path: repository,
            branch: identity.branch,
            head: identity.head,
            dirty_before_sha256: identity.dirty_sha256,
            dirty_after_sha256: identity.dirty_sha256,
        }],
        scope: {
            mission: contract.contract.mission,
            wave_contract_sha256: contract.sha256,
            seed_requirements_verified: contract.contract.seed_requirements,
            dependency_returns: [dependency],
            files_intended: ["legacy/loadAnimationEngine.js"],
            files_changed: ["legacy/loadAnimationEngine.js"],
        },
        born_red: {
            witness: contract.contract.born_red,
            reproduction: "node docs/tranches/V/vnext/tools/selftest-keyframes-public-package.mjs",
            observed_failure: "a package receipt could previously float beside an unrelated transpose return",
            evidence: [evidence],
        },
        delivery: { source: [], tests: [], exports: [], deleted_paths: deletedEffects, migrations: [] },
        dag_delta: notApplicable("K23 package fixture does not assert a repository DAG delta"),
        gates: [{
            id: contract.contract.gates[0].id,
            kind: contract.contract.gates[0].kind,
            command_or_probe: contract.contract.gates[0].subject,
            expected: contract.contract.gates[0].expected,
            result: "pass",
            receipt: gate.binding,
            evidence: [evidence],
        }],
        api_contract: notApplicable("K23 has no API operation in this fixture"),
        visual: notApplicable("K23 has no visual claim in this fixture"),
        performance: notApplicable("K23 has no performance claim in this fixture"),
        limits: notApplicable("K23 has no limit claim in this fixture"),
        consumers: notApplicable("K23 has no consumer claim in this fixture"),
        terminal_disposition: {
            kept: ["exact @mkbabb/keyframes.js@7.0.0 package boundary"],
            pruned: [],
            deletions: [{
                decision_id: deletion.decision.decision_id,
                decision_hash: deletion.decision.decision_hash,
                file_effects: { deleted: deletedEffects, modified: modifiedEffects },
            }],
            refusals: [],
            no_legacy_paths: true,
            standards_compatibility: [],
        },
        standards_operation_vector: notApplicable("K23 does not decide standards features"),
        routed_remainder: [],
        verdict: "K23 exact public package and source transpose binding are complete",
        annexes: {
            "implementation-challenge": notApplicable("K23 challenge is sealed after semantic assembly"),
            "deletion-judgment": {
                schema: "vnext-deletion-judgment-return-annex/1",
                wave_id: "K23",
                phase: "owner-precut",
                path: deletion.path,
                file_sha256: fileSha256(deletion.path),
                annex_hash: deletion.annex.annex_hash,
            },
            "keyframes-public-package": {
                schema: "vnext-keyframes-public-package-return-annex/1",
                wave_id: "K23",
                manifest: manifestBinding,
                source_transpose_return: sourceBinding,
                target_paths: targetBinding,
                package: {
                    name: manifest.package.name,
                    version: manifest.package.version,
                    tarball_sha256: manifest.package.tarball.sha256,
                    tarball_sha512: manifest.package.tarball.sha512,
                    integrity: manifest.package.tarball.integrity,
                    archive_files_sha256: manifest.package.archive.files_sha256,
                },
                validation_receipt: validationBinding,
            },
        },
    };
    record.annexes["implementation-challenge"] = implementationChallenge(
        record,
        repository,
        evidence,
        gate,
        [dependency],
    );
    sealGateReceiptChallenge(gate.receipt, record.annexes["implementation-challenge"]);
    writeJson(gate.binding.path, gate.receipt);
    gate.binding.sha256 = fileSha256(gate.binding.path);
    record.gates[0].receipt = structuredClone(gate.binding);
    return finalize(record, "return_hash");
}

function run(name, value, { snapshotOut } = {}) {
    const path = join(directory, `${name}.json`);
    writeJson(path, finalized(value));
    const args = [validator, "--manifest", path, "--snapshot-out", snapshotOut ?? join(directory, `${name}.snapshot.json`)];
    return spawnSync(process.execPath, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function reject(name, base, mutate, fragment) {
    const value = structuredClone(base);
    mutate(value);
    const result = run(name, value);
    if (result.status === 0 || !result.stderr.includes(fragment)) failures.push(`${name} did not fail with ${fragment}: ${result.stderr}${result.stdout}`);
}

try {
    const sourceDescriptorPath = sourceDescriptorArgument ?? join(directory, "k22t-source-descriptor.json");
    if (!sourceDescriptorArgument) {
        const emittedSource = spawnSync(process.execPath, [transposeSelftest, "--emit-k22t-fixture", sourceDescriptorPath], {
            encoding: "utf8",
            maxBuffer: 256 * 1024 * 1024,
        });
        if (emittedSource.status !== 0) throw new Error(`genuine K22T source fixture failed: ${emittedSource.stderr}${emittedSource.stdout}`);
    }
    const sourceDescriptor = parseJsonStrict(readFileSync(sourceDescriptorPath));
    const sourceRootCandidate = realpathSync(sourceDescriptor.root);
    const fromTemp = relative(realpathSync(tmpdir()), sourceRootCandidate);
    if (!fromTemp || fromTemp.startsWith("..") || isAbsolute(fromTemp) || !basename(sourceRootCandidate).startsWith("vnext-keyframes-transpose-")) {
        throw new Error(`K22T emitter root is not one exact dedicated temporary fixture`);
    }
    sourceFixtureRoot = sourceRootCandidate;
    for (const binding of [sourceDescriptor.return, sourceDescriptor.ledger, sourceDescriptor.receipt]) {
        const canonical = realpathSync(binding.path);
        const fromRoot = relative(sourceFixtureRoot, canonical);
        if (!fromRoot || fromRoot.startsWith("..") || isAbsolute(fromRoot)) throw new Error(`K22T emitter artifact escapes its dedicated root`);
    }
    sourceTransposeValidation = {
        wave_id: "K22T",
        scope: "library",
        return: sourceDescriptor.return,
        ledger: sourceDescriptor.ledger,
        receipt: sourceDescriptor.receipt,
    };
    mkdirSync(packageFixtureRoot, { recursive: true });
    const packageConstellation = prepareConsumerFixtureConstellation({
        fixtureRoot: packageFixtureRoot,
        primary: {
            id: "keyframes",
            path: stage,
            repository: "fixture",
            ownerWave: "K23",
        },
    });
    valueFixture();
    fixtureFiles();
    initializeRepository(stage);
    const k23ProofRunner = proofRunnerFixture("test/proof/k23/run.mjs");
    writeJson(join(stage, "package.json"), {
        name: "vnext-k23-universal-fixture",
        version: "1.0.0",
        private: true,
    });
    write(join(stage, k23ProofRunner.relative_path), k23ProofRunner.source);
    write(join(stage, "test/proof/k23/run.mjs"), [
        'import { readFileSync } from "node:fs";',
        `const expectedEnvironmentKeys = ${JSON.stringify(proofEnvironmentKeys)};`,
        'if (JSON.stringify(Object.keys(process.env).sort()) !== JSON.stringify(expectedEnvironmentKeys)) throw new Error("proof environment keys differ");',
        'const marker = process.argv.indexOf("--manifest");',
        'if (marker < 0 || !process.argv[marker + 1]) throw new Error("missing --manifest");',
        'const manifest = JSON.parse(readFileSync(process.argv[marker + 1], "utf8"));',
        'if (manifest.result !== "pass") process.exit(23);',
        'process.stdout.write(`PASS ${manifest.wave_id}\\n`);',
        "",
    ].join("\n"));
    writeJson(join(stage, "test/proof/k23/manifest.json"), {
        schema: "vnext-proof-manifest/1",
        wave_id: "K23",
        wave_contract_sha256: contracts.get("K23").sha256,
        seed_requirements: contracts.get("K23").contract.seed_requirements,
        result: "pass",
    });
    write(join(stage, "TOMBSTONES.md"), "K23PublicLoaderCut\n");
    write(join(stage, "legacy/loadAnimationEngine.js"), "export const loadAnimationEngine = () => 'legacy';\n");
    commit(stage);

    const gitBeforePath = join(directory, "k23-git-before.json");
    const gitAfterPath = join(directory, "k23-git-after.json");
    const gitTruthPath = join(directory, "k23-git-truth.json");
    runTool(process.execPath, [deletionTruthTool, "snapshot", "--phase", "before", "--repository", stage, "--output", gitBeforePath], "K23 before Git snapshot");
    unlinkSync(join(stage, "legacy/loadAnimationEngine.js"));
    commit(stage);
    runTool(process.execPath, [deletionTruthTool, "snapshot", "--phase", "after", "--repository", stage, "--output", gitAfterPath], "K23 after Git snapshot");
    runTool(process.execPath, [deletionTruthTool, "delta", "--before", gitBeforePath, "--after", gitAfterPath, "--output", gitTruthPath], "K23 Git truth delta");
    const gitTruth = parseJsonStrict(readFileSync(gitTruthPath));
    const gitTruthBinding = { path: gitTruthPath, file_sha256: fileSha256(gitTruthPath), receipt_hash: gitTruth.receipt_hash };
    const evidencePath = join(directory, "k23-evidence.txt");
    write(evidencePath, "observed exact K23 package and source-return binding control\n");
    const evidence = evidenceObject(evidencePath, "K23 universal package fixture control");
    const consumer = resolveConsumerFixtureUniverse({
        constellation: packageConstellation,
        name: "k23-consumer-universe",
        ownerWave: "K23",
        edges: [{
            id: "keyframes:value:manifest",
            source: "keyframes",
            target: "value",
            package: "@mkbabb/value.js",
            specifier: "^5.0.0",
            kind: "manifest",
            evidencePaths: [join(packageRoot, "package.json")],
        }],
    });
    const deletion = makeDeletionJudgment(stage, gitTruthBinding, gitTruth, consumer, evidence);

    const tarball = pack("positive-package");
    const base = manifestFor(tarball);
    const snapshotPath = join(directory, "k23-package.snapshot.json");
    const positive = run("positive", structuredClone(base), { snapshotOut: snapshotPath });
    if (positive.status !== 0 || !positive.stdout.includes('"surface_rows":4') || !positive.stdout.includes('"package":"@mkbabb/keyframes.js@7.0.0"')) {
        throw new Error(`positive package prerequisite failed: ${positive.stderr}${positive.stdout}`);
    }
    const validationReceipt = positive.status === 0 ? parseJsonStrict(positive.stdout.trim()) : {};
    const validationPath = join(directory, "k23-validation-receipt.json");
    writeJson(validationPath, validationReceipt);
    const forgedCertificateSnapshot = parseJsonStrict(readFileSync(snapshotPath));
    forgedCertificateSnapshot.source_transpose_validation.historical_certificate.historical_gate_replay.epoch_sha256 = "e".repeat(64);
    finalize(forgedCertificateSnapshot, "snapshot_hash");
    const forgedCertificateSnapshotPath = join(directory, "forged-k22t-certificate.snapshot.json");
    writeCanonical(forgedCertificateSnapshotPath, forgedCertificateSnapshot);
    const forgedCertificateReplay = spawnSync(process.execPath, [validator, "--snapshot", forgedCertificateSnapshotPath], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
    if (forgedCertificateReplay.status === 0
        || !forgedCertificateReplay.stderr.includes("persisted certificate differs from fresh historical K22T gate replay")) {
        failures.push(`rehashed K22T historical certificate was not rejected by fresh gate replay: ${forgedCertificateReplay.stderr}${forgedCertificateReplay.stdout}`);
    }
    const weakLiveOnly = spawnSync(process.execPath, [validator, "--manifest", join(directory, "positive.json")], {
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
    });
    if (weakLiveOnly.status !== 2 || !weakLiveOnly.stderr.includes("--snapshot-out")) {
        failures.push(`live-only K23 validation path was not rejected at the interface: ${weakLiveOnly.stderr}${weakLiveOnly.stdout}`);
    }
    const absentDuringReplay = [join(directory, "positive.json"), tarball, valueTarballEvidence.path]
        .map((path) => ({ path, bytes: readFileSync(path) }));
    for (const { path } of absentDuringReplay) unlinkSync(path);
    const replay = spawnSync(process.execPath, [proofValidator, "--receipt", validationPath, "--snapshot", snapshotPath], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    for (const { path, bytes } of absentDuringReplay) write(path, bytes);
    if (replay.status !== 0 || replay.stdout !== positive.stdout) {
        failures.push(`immutable package snapshot did not exactly replay the live semantic receipt: ${replay.stderr}LIVE ${positive.stdout}REPLAY ${replay.stdout}`);
    }
    const rehashedReceipt = structuredClone(validationReceipt);
    rehashedReceipt.surface_rows += 1;
    const rehashedReceiptSemantic = structuredClone(rehashedReceipt);
    delete rehashedReceiptSemantic.semantic_hash;
    delete rehashedReceiptSemantic.receipt_hash;
    rehashedReceipt.semantic_hash = sha256(canonicalize(rehashedReceiptSemantic));
    rehashedReceipt.receipt_hash = hashWithout(rehashedReceipt, "receipt_hash");
    const rehashedReceiptPath = join(directory, "rehashed-package-receipt.json");
    writeJson(rehashedReceiptPath, rehashedReceipt);
    const rehashedReceiptResult = spawnSync(process.execPath, [proofValidator, "--receipt", rehashedReceiptPath, "--snapshot", snapshotPath], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
    if (rehashedReceiptResult.status === 0 || !rehashedReceiptResult.stderr.includes("differs from immutable semantic replay")) {
        failures.push(`self-consistent rehashed package receipt was not rejected by immutable replay: ${rehashedReceiptResult.stderr}${rehashedReceiptResult.stdout}`);
    }
    const rehashedSnapshot = parseJsonStrict(readFileSync(snapshotPath));
    const rehashedManifest = parseJsonStrict(Buffer.from(rehashedSnapshot.manifest.bytes_base64, "base64"));
    rehashedManifest.package.archive.files_sha256 = "e".repeat(64);
    rehashedManifest.manifest_hash = hashWithout(rehashedManifest, "manifest_hash");
    const rehashedManifestBytes = Buffer.from(`${JSON.stringify(rehashedManifest, null, 2)}\n`);
    rehashedSnapshot.manifest.bytes = rehashedManifestBytes.length;
    rehashedSnapshot.manifest.file_sha256 = sha256(rehashedManifestBytes);
    rehashedSnapshot.manifest.manifest_hash = rehashedManifest.manifest_hash;
    rehashedSnapshot.manifest.bytes_base64 = rehashedManifestBytes.toString("base64");
    rehashedSnapshot.snapshot_hash = hashWithout(rehashedSnapshot, "snapshot_hash");
    const rehashedSnapshotPath = join(directory, "rehashed-manifest.snapshot.json");
    writeCanonical(rehashedSnapshotPath, rehashedSnapshot);
    const rehashedReplay = spawnSync(process.execPath, [validator, "--snapshot", rehashedSnapshotPath], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    if (rehashedReplay.status === 0 || !rehashedReplay.stderr.includes("/package/archive/files_sha256")) {
        failures.push(`self-consistent rehashed manifest was not rejected by archive semantics: ${rehashedReplay.stderr}${rehashedReplay.stdout}`);
    }
    const forgedSourceReceipt = parseJsonStrict(readFileSync(sourceTransposeValidation.receipt.path));
    forgedSourceReceipt.runtime_graph_hash = "d".repeat(64);
    const forgedSourceSemantic = structuredClone(forgedSourceReceipt);
    delete forgedSourceSemantic.semantic_hash;
    delete forgedSourceSemantic.receipt_hash;
    forgedSourceReceipt.semantic_hash = sha256(canonicalize(forgedSourceSemantic));
    forgedSourceReceipt.receipt_hash = hashWithout(forgedSourceReceipt, "receipt_hash");
    const forgedSourceReceiptPath = join(directory, "forged-k22t-validation-receipt.json");
    writeJson(forgedSourceReceiptPath, forgedSourceReceipt);
    const forgedSourceReturn = parseJsonStrict(readFileSync(sourceTransposeValidation.return.path));
    forgedSourceReturn.annexes["keyframes-target-transpose"].validation_receipt = {
        path: forgedSourceReceiptPath,
        file_sha256: fileSha256(forgedSourceReceiptPath),
        receipt_hash: forgedSourceReceipt.receipt_hash,
    };
    const forgedSourceEvidence = forgedSourceReturn.evidence_inputs.find(
        ({ path }) => path === sourceTransposeValidation.receipt.path,
    );
    if (!forgedSourceEvidence) throw new Error("K22T fixture does not content-address its transpose receipt");
    forgedSourceEvidence.path = forgedSourceReceiptPath;
    forgedSourceEvidence.sha256 = fileSha256(forgedSourceReceiptPath);
    const originalSourceGateBinding = forgedSourceReturn.gates[0].receipt;
    const forgedSourceGateReceipt = parseJsonStrict(readFileSync(originalSourceGateBinding.path));
    const forgedSourceGatePath = join(directory, "forged-k22t.gate-receipt.json");
    writeJson(forgedSourceGatePath, forgedSourceGateReceipt);
    const forgedSourceGate = {
        receipt: forgedSourceGateReceipt,
        binding: {
            path: forgedSourceGatePath,
            sha256: fileSha256(forgedSourceGatePath),
            description: "K22T coherently rebound forged-source gate receipt",
        },
    };
    forgedSourceReturn.gates[0].receipt = structuredClone(forgedSourceGate.binding);
    forgedSourceReturn.annexes["implementation-challenge"] = implementationChallenge(
        forgedSourceReturn,
        forgedSourceReturn.pins[0].path,
        evidence,
        forgedSourceGate,
        forgedSourceReturn.scope.dependency_returns,
    );
    sealGateReceiptChallenge(
        forgedSourceGate.receipt,
        forgedSourceReturn.annexes["implementation-challenge"],
    );
    writeJson(forgedSourceGate.binding.path, forgedSourceGate.receipt);
    forgedSourceGate.binding.sha256 = fileSha256(forgedSourceGate.binding.path);
    forgedSourceReturn.gates[0].receipt = structuredClone(forgedSourceGate.binding);
    forgedSourceReturn.return_hash = hashWithout(forgedSourceReturn, "return_hash");
    const forgedSourceReturnPath = join(directory, "forged-k22t.return.json");
    writeJson(forgedSourceReturnPath, forgedSourceReturn);
    const forgedSourceManifest = structuredClone(base);
    forgedSourceManifest.source_transpose_validation.return = {
        path: forgedSourceReturnPath,
        file_sha256: fileSha256(forgedSourceReturnPath),
        return_hash: forgedSourceReturn.return_hash,
    };
    forgedSourceManifest.source_transpose_validation.receipt = {
        path: forgedSourceReceiptPath,
        file_sha256: fileSha256(forgedSourceReceiptPath),
        semantic_hash: forgedSourceReceipt.semantic_hash,
        receipt_hash: forgedSourceReceipt.receipt_hash,
    };
    const forgedSourceResult = run("forged-source-receipt", forgedSourceManifest);
    if (forgedSourceResult.status === 0 || !forgedSourceResult.stderr.includes("persisted receipt differs from immutable K22T ledger replay")) {
        failures.push(`self-consistent forged K22T source receipt was not rejected by immutable replay: ${forgedSourceResult.stderr}${forgedSourceResult.stdout}`);
    }
    const sourceReturnPath = sourceTransposeValidation.return.path;
    const sourceReturn = parseJsonStrict(readFileSync(sourceReturnPath));
    for (const status of ["KEEP", "REFUSED"]) {
        const wrongStatusReturn = structuredClone(sourceReturn);
        wrongStatusReturn.status = status;
        wrongStatusReturn.return_hash = hashWithout(wrongStatusReturn, "return_hash");
        const wrongStatusReturnPath = join(directory, `wrong-k22t-${status.toLowerCase()}.return.json`);
        writeJson(wrongStatusReturnPath, wrongStatusReturn);
        const wrongStatusManifest = structuredClone(base);
        wrongStatusManifest.source_transpose_validation.return = {
            path: wrongStatusReturnPath,
            file_sha256: fileSha256(wrongStatusReturnPath),
            return_hash: wrongStatusReturn.return_hash,
        };
        const wrongStatusResult = run(`wrong-k22t-${status.toLowerCase()}-status`, wrongStatusManifest);
        const expectedStatusFailure = "/source_transpose_validation/return: exact terminal self-hashed K22T return required";
        if (wrongStatusResult.status === 0 || !wrongStatusResult.stderr.includes(expectedStatusFailure)) {
            failures.push(`self-consistent K22T ${status} artifact edge was not rejected: ${wrongStatusResult.stderr}${wrongStatusResult.stdout}`);
        }
    }
    const dependency = dependencyBinding(sourceReturnPath, sourceReturn);
    const gate = gateReceipt(stage, evidence);
    const universal = k23Return({
        repository: stage,
        evidence,
        dependency,
        gate,
        deletion,
        manifest: base,
        manifestPath: realpathSync(join(directory, "positive.json")),
        validationReceipt,
        validationPath,
    });
    const universalPath = join(directory, "k23.return.json");
    writeJson(universalPath, universal);
    const universalPositive = spawnSync(process.execPath, [returnValidator, universalPath, "--historical-certificate"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (universalPositive.status !== 0 || !universalPositive.stdout.includes('"wave_id":"K23"') || !universalPositive.stdout.includes('"mode":"offline-historical-certificate"')) {
        failures.push(`positive universal K23 package/source-return binding failed: ${universalPositive.stderr}${universalPositive.stdout}`);
    }
    const specializedUniversal = spawnSync(process.execPath, [proofValidator, "--return", universalPath], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
    if (specializedUniversal.status !== 0 || specializedUniversal.stdout !== positive.stdout) {
        failures.push(`positive specialized universal K23 package/source replay failed: ${specializedUniversal.stderr}${specializedUniversal.stdout}`);
    }
    const forgedUniversal = structuredClone(universal);
    forgedUniversal.annexes["keyframes-public-package"].source_transpose_return.return_hash = "f".repeat(64);
    finalize(forgedUniversal, "return_hash");
    const forgedUniversalPath = join(directory, "forged-k23-source-return.return.json");
    writeJson(forgedUniversalPath, forgedUniversal);
    const universalForgery = spawnSync(process.execPath, [returnValidator, forgedUniversalPath, "--historical-certificate"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    const expectedUniversalForgery = "/annexes/keyframes-public-package/source_transpose_return: must equal the K22T scope dependency row";
    if (universalForgery.status === 0 || !universalForgery.stderr.includes(expectedUniversalForgery)) {
        failures.push(`forged K23 source-return binding did not fail specifically: ${universalForgery.stderr}${universalForgery.stdout}`);
    }

    reject("wrong-tarball-hash", base, (value) => { value.package.tarball.sha256 = "1".repeat(64); }, "/package/tarball/sha256");
    reject("missing-archive-row", base, (value) => value.package.archive.files.pop(), "/package/archive/files");
    reject("wrong-archive-hash", base, (value) => { value.package.archive.files_sha256 = "2".repeat(64); }, "/package/archive/files_sha256");
    reject("wrong-target-hash", base, (value) => { value.target_paths.manifest_sha256 = "3".repeat(64); }, "/target_paths");
    reject("forged-export-id", base, (value) => { value.exports[0].id = ".#Forged:type"; }, "/exports");
    reject("missing-export", base, (value) => value.exports.pop(), "/exports");
    reject("wrong-export-source", base, (value) => { value.exports[0].source = "src/model/program.ts"; }, "/exports");
    reject("wrong-runtime-binding", base, (value) => { value.exports.find(({ surface }) => surface === "runtime").runtime.sha512 = "4".repeat(128); }, "/exports");
    reject("graph-edge-drift", base, (value) => value.graphs.runtime.edges.pop(), "/graphs");
    reject("invented-scc", base, (value) => { value.graphs.runtime.sccs = [["dist/index.js"]]; }, "/graphs");
    reject("boundary-drift", base, (value) => value.boundary.root.runtime_closure.push("dist/engine.js"), "/boundary");
    reject("forged-pass-observation", base, (value) => { value.install_contract.observations = [{ status: "PASS" }]; }, "/install_contract/observations");
    reject("stale-probe-vector", base, (value) => value.install_contract.probes[0].runtime_symbols.push("staleSymbol"), "/install_contract/probes");

    fixtureFiles({ rootEngineImport: true });
    const leaky = manifestFor(pack("leaky-package"));
    const leakyResult = run("root-loads-engine", leaky);
    if (leakyResult.status === 0 || !leakyResult.stderr.includes("root/light closure reaches engine/heavy")) {
        failures.push(`root-loads-engine did not fail at boundary: ${leakyResult.stderr}${leakyResult.stdout}`);
    }

    fixtureFiles({ version: "7.0.1" });
    const wrongVersion = manifestFor(pack("wrong-version-package"));
    const wrongVersionResult = run("packed-version-drift", wrongVersion);
    if (wrongVersionResult.status === 0 || !wrongVersionResult.stderr.includes("@mkbabb/keyframes.js@7.0.0")) {
        failures.push(`packed-version-drift did not fail: ${wrongVersionResult.stderr}${wrongVersionResult.stdout}`);
    }

    fixtureFiles({ wildcard: true });
    const wildcard = manifestFor(pack("wildcard-package"));
    const wildcardResult = run("wildcard-export", wildcard);
    if (wildcardResult.status === 0 || !wildcardResult.stderr.includes("wildcard and namespace exports are forbidden")) {
        failures.push(`wildcard-export did not fail: ${wildcardResult.stderr}${wildcardResult.stdout}`);
    }

    fixtureFiles({ externalImport: "workspace:fixture" });
    const workspaceImport = manifestFor(pack("workspace-import-package"));
    const workspaceResult = run("workspace-import", workspaceImport);
    if (workspaceResult.status === 0 || !workspaceResult.stderr.includes("source, workspace and absolute imports are forbidden")) {
        failures.push(`workspace-import did not fail: ${workspaceResult.stderr}${workspaceResult.stdout}`);
    }

    fixtureFiles();
    write(join(packageRoot, "dist/light.js"), "while (true) {}\nexport const play = () => {};\n");
    const timeoutManifest = manifestFor(pack("timeout-package"));
    timeoutManifest.install_contract.timeout_ms = 1000;
    const timeoutResult = run("runtime-timeout", timeoutManifest);
    if (timeoutResult.status === 0 || !timeoutResult.stderr.includes("process timed out")) {
        failures.push(`runtime-timeout did not fail: ${timeoutResult.stderr}${timeoutResult.stdout}`);
    }
} finally {
    if (sourceFixtureRoot && existsSync(sourceFixtureRoot)) rmSync(sourceFixtureRoot, { recursive: true, force: true });
    if (sourceDescriptorArgument && existsSync(sourceDescriptorArgument)) unlinkSync(sourceDescriptorArgument);
    rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({ schema: "vnext-keyframes-public-package-selftest/1", direct_positive: 2, universal_positive: 1, direct_rejections: 25, universal_rejections: 1 })}\n`);
