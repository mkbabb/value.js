#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

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
import { sealGateReceiptChallenge } from "./implementation-challenge.mjs";
import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";

import {
    computeModuleGraphs,
    currentPackageExportNodes,
    fileSha256,
    gitIdentity,
    hashWithout,
    inspectSnapshot,
    isColocatedTest,
    sha256,
    walkRegularFiles,
} from "./keyframes-contract.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";
import {
    canonicalDemoTextLoaderPath,
    canonicalDemoTextLoaderSource,
    validateKeyframesInventoryReceiptPair,
} from "./keyframes-proof-contract.mjs";

const validator = resolve(new URL("validate-keyframes-current-inventory.mjs", import.meta.url).pathname);
const returnValidator = resolve(new URL("validate-return.mjs", import.meta.url).pathname);
const contracts = loadWaveContracts();
const directory = realpathSync(mkdtempSync(join(tmpdir(), "vnext-keyframes-inventory-")));
const repository = join(directory, "repository");
const failures = [];
const inventoryScopes = {
    library: {
        waveId: "K00",
        sourceRoot: "src",
        externalTestRoot: "test/src",
        supportRoots: ["bench", "proof"],
        supportFiles: [],
        snapshotRoots: ["src", "test/src", "bench", "proof", "dist"],
    },
    demo: {
        waveId: "M00",
        sourceRoot: "demo",
        externalTestRoot: "test/demo",
        supportRoots: [],
        supportFiles: [canonicalDemoTextLoaderPath],
        snapshotRoots: ["demo", "test/demo"],
    },
};
const write = (path, bytes) => {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, bytes);
};
const writeJson = (path, value) => write(path, `${JSON.stringify(value, null, 2)}\n`);
const git = (...args) => execFileSync("git", ["-C", repository, ...args], { encoding: "utf8" }).trim();
const notApplicable = (reason) => ({ applicability: "not_applicable", reason });
const evidenceObject = (path, description) => ({ path, sha256: fileSha256(path), description });

function finalized(value) {
    value.inventory_hash = hashWithout(value, "inventory_hash");
    return value;
}

function finalizeMember(value, member) {
    value[member] = hashWithout(value, member);
    return value;
}

function genericV29TReturn(evidence) {
    const contract = contracts.get("V29T");
    const identity = gitIdentity(repository);
    const artifact = { path: evidence.path, file_sha256: evidence.sha256, contract_hash: "a".repeat(64) };
    const receipt = { path: evidence.path, file_sha256: evidence.sha256, receipt_hash: "a".repeat(64) };
    const stateReceiptPath = join(directory, "v29t-state-certificate.json");
    writeJson(stateReceiptPath, {
        execution: {
            applicability: "applicable",
            pin_repository: "fixture",
            cwd: repository,
            repository_state_sha256: repositoryStateSha256(repository),
        },
    });
    const stateReceipt = { path: stateReceiptPath, sha256: fileSha256(stateReceiptPath), description: "V29T fixture repository-state certificate" };
    return finalizeMember({
        schema: "vnext-wave-return/2",
        wave_id: "V29T",
        status: "COMPLETE",
        return_hash: "",
        evidence_inputs: [{ path: evidence.path, sha256: evidence.sha256, purpose: "dependency schema fixture", class: "generated" }],
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
            dependency_returns: [],
            files_intended: [],
            files_changed: [],
        },
        born_red: { witness: "fixture witness", reproduction: "fixture reproduction", observed_failure: "fixture failure", evidence: [evidence] },
        delivery: { source: [], tests: [], exports: [], deleted_paths: [], migrations: [] },
        dag_delta: notApplicable("dependency schema fixture"),
        gates: [{ id: "fixture", kind: "manual", command_or_probe: "fixture", expected: "fixture", result: "pass", receipt: stateReceipt, evidence: [evidence] }],
        api_contract: notApplicable("dependency schema fixture"),
        visual: notApplicable("dependency schema fixture"),
        performance: notApplicable("dependency schema fixture"),
        limits: notApplicable("dependency schema fixture"),
        consumers: notApplicable("dependency schema fixture"),
        terminal_disposition: { kept: ["fixture"], pruned: [], deletions: [], refusals: [], no_legacy_paths: true, standards_compatibility: [] },
        standards_operation_vector: notApplicable("dependency schema fixture"),
        routed_remainder: [],
        verdict: "fixture terminal dependency",
        annexes: {
            "implementation-challenge": notApplicable("dependency schema fixture"),
            "deletion-judgment": {
                schema: "vnext-deletion-judgment-return-annex/1",
                wave_id: "V29T",
                phase: "owner-precut",
                path: evidence.path,
                file_sha256: evidence.sha256,
                annex_hash: "a".repeat(64),
            },
            "value-target-transpose": {
                schema: "vnext-value-target-transpose-return-annex/1",
                wave_id: "V29T",
                value_root: repository,
                repository_state_sha256: "a".repeat(64),
                ledger: artifact,
                current_inventory: artifact,
                current_inventory_return: { path: evidence.path, file_sha256: evidence.sha256, return_hash: "a".repeat(64) },
                target_paths: artifact,
                conditional_resolutions: artifact,
                css_execution_manifest: artifact,
                public_surface: artifact,
                physical_truth_receipt: receipt,
                validation_receipt: receipt,
            },
        },
    }, "return_hash");
}

function dependencyBinding(path, returned) {
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

function gateReceipt(evidence) {
    const contract = contracts.get("K00");
    const gate = contract.contract.gates[0];
    const argv = canonicalGateArgv(gate.subject, "K00");
    const executable = resolveCommand(argv.commandToken);
    const execution = spawnSync(executable, argv.args, {
        cwd: repository,
        encoding: null,
        env: proofRunnerEnvironment(),
        maxBuffer: 32 * 1024 * 1024,
        shell: false,
    });
    if (execution.status !== 0) throw new Error(`K00 fixture gate failed: ${execution.stderr?.toString("utf8")}`);
    const stdoutPath = join(directory, "k00.stdout");
    const stderrPath = join(directory, "k00.stderr");
    write(stdoutPath, execution.stdout);
    write(stderrPath, execution.stderr);
    const receipt = finalizeMember({
        schema: "vnext-gate-receipt/3",
        wave_id: "K00",
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
    const path = join(directory, "k00.gate-receipt.json");
    writeJson(path, receipt);
    return {
        receipt,
        binding: { path, sha256: fileSha256(path), description: "K00 live gate receipt" },
    };
}

function k00Return({ evidence, dependency, gate, inventory, capture, replay }) {
    const contract = contracts.get("K00");
    const identity = gitIdentity(repository);
    const record = {
        schema: "vnext-wave-return/2",
        wave_id: "K00",
        status: "COMPLETE",
        return_hash: "",
        evidence_inputs: [
            { path: evidence.path, sha256: evidence.sha256, purpose: "K00 universal inventory control", class: "generated" },
            { path: inventory.path, sha256: inventory.file_sha256, purpose: "K00 exact current inventory", class: "generated" },
            { path: capture.path, sha256: capture.file_sha256, purpose: "K00 inventory capture validation", class: "generated" },
            { path: replay.path, sha256: replay.file_sha256, purpose: "K00 immutable inventory replay validation", class: "generated" },
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
            files_intended: [],
            files_changed: [],
        },
        born_red: {
            witness: contract.contract.born_red,
            reproduction: "node docs/tranches/V/vnext/tools/selftest-keyframes-current-inventory.mjs",
            observed_failure: "a current-inventory artifact could previously float beside an unrelated universal return",
            evidence: [evidence],
        },
        delivery: { source: [], tests: [], exports: [], deleted_paths: [], migrations: [] },
        dag_delta: notApplicable("K00 is an inventory audit"),
        gates: [{
            id: contract.contract.gates[0].id,
            kind: contract.contract.gates[0].kind,
            command_or_probe: contract.contract.gates[0].subject,
            expected: contract.contract.gates[0].expected,
            result: "pass",
            receipt: gate.binding,
            evidence: [evidence],
        }],
        api_contract: notApplicable("K00 has no API operation in this fixture"),
        visual: notApplicable("K00 has no visual claim in this fixture"),
        performance: notApplicable("K00 has no performance claim in this fixture"),
        limits: notApplicable("K00 has no limit claim in this fixture"),
        consumers: notApplicable("K00 has no consumer claim in this fixture"),
        terminal_disposition: { kept: ["exact K00 library inventory"], pruned: [], deletions: [], refusals: [], no_legacy_paths: true, standards_compatibility: [] },
        standards_operation_vector: notApplicable("K00 does not decide standards features"),
        routed_remainder: [],
        verdict: "K00 fixture inventory is exact",
        annexes: {
            "implementation-challenge": notApplicable("K00 is audit-only"),
            "keyframes-current-inventory": {
                schema: "vnext-keyframes-current-inventory-return-annex/1",
                wave_id: "K00",
                scope: "library",
                inventory,
                capture_receipt: capture,
                replay_receipt: replay,
            },
        },
    };
    sealGateReceiptChallenge(gate.receipt, record.annexes["implementation-challenge"]);
    writeJson(gate.binding.path, gate.receipt);
    gate.binding.sha256 = fileSha256(gate.binding.path);
    record.gates[0].receipt = structuredClone(gate.binding);
    return finalizeMember(record, "return_hash");
}

function run(name, value, mode = "capture") {
    const path = join(directory, `${name}.json`);
    writeJson(path, finalized(value));
    return spawnSync(process.execPath, [validator, "--inventory", path, `--${mode}`], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
}

function reject(name, base, mutate, fragment) {
    const value = structuredClone(base);
    mutate(value);
    const result = run(name, value);
    if (result.status === 0 || !result.stderr.includes(fragment)) {
        failures.push(`${name} did not fail with ${fragment}: ${result.stderr}${result.stdout}`);
    }
}

function fixtureInventory(scope) {
    const fixture = inventoryScopes[scope];
    const authority = {
        source_root: fixture.sourceRoot,
        external_test_root: fixture.externalTestRoot,
        support_roots: fixture.supportRoots,
        support_files: fixture.supportFiles,
        package_manifest: "package.json",
        package_manifest_sha256: fileSha256(join(repository, "package.json")),
    };
    const nodes = [];
    for (const file of walkRegularFiles(repository, authority.source_root)) {
        const kind = isColocatedTest(file.path) ? "test" : "source";
        nodes.push({ kind, id: file.path, ...file });
    }
    for (const file of walkRegularFiles(repository, authority.external_test_root)) nodes.push({ kind: "test", id: file.path, ...file });
    for (const root of authority.support_roots) {
        for (const file of walkRegularFiles(repository, root)) nodes.push({ kind: "support", id: file.path, ...file });
    }
    for (const path of authority.support_files) {
        const bytes = readFileSync(join(repository, path));
        nodes.push({ kind: "support", id: path, path, bytes: bytes.length, sha256: sha256(bytes) });
    }
    if (scope === "library") {
        nodes.push(...currentPackageExportNodes(repository, parseJsonStrict(readFileSync(join(repository, "package.json")))));
    }
    nodes.sort((left, right) => compareCanonicalText(`${left.kind}\0${left.id}`, `${right.kind}\0${right.id}`));
    const graphPaths = [...new Set(nodes.map(({ path }) => path))];
    const identity = gitIdentity(repository);
    return finalized({
        schema: "vnext-keyframes-current-inventory/1",
        wave_id: fixture.waveId,
        scope,
        repository: { path: repository, ...identity },
        snapshot: makeSnapshot(`${scope}-base`, scope),
        authority,
        nodes,
        support_exceptions: nodes.filter(({ kind }) => kind === "support").map(({ path }) => ({
            path,
            class: path === canonicalDemoTextLoaderPath ? "tool" : path.startsWith("bench/") ? "benchmark" : "proof",
            owner_wave_id: fixture.waveId,
            rationale: "pinned non-delivery proof or benchmark support",
        })),
        graphs: computeModuleGraphs(repository, graphPaths),
        inventory_hash: "",
    });
}

function makeSnapshot(name, scope, mutate = () => {}) {
    const fixture = inventoryScopes[scope];
    const staging = join(directory, `snapshot-stage-${name}`);
    const root = join(staging, "snapshot");
    mkdirSync(root, { recursive: true });
    for (const path of fixture.snapshotRoots) cpSync(join(repository, path), join(root, path), { recursive: true });
    for (const path of fixture.supportFiles) {
        mkdirSync(dirname(join(root, path)), { recursive: true });
        cpSync(join(repository, path), join(root, path));
    }
    cpSync(join(repository, "package.json"), join(root, "package.json"));
    mutate(root);
    const path = join(directory, `${name}.snapshot.tgz`);
    execFileSync("/usr/bin/tar", ["-czf", path, "-C", staging, "snapshot"]);
    try {
        const archive = inspectSnapshot(path);
        return { path, file_sha256: archive.sha256, files_sha256: sha256(canonicalize(archive.files)) };
    } catch {
        return { path, file_sha256: fileSha256(path), files_sha256: "0".repeat(64) };
    }
}

try {
    mkdirSync(repository, { recursive: true });
    execFileSync("git", ["init", "--initial-branch=fixture", repository], { stdio: "ignore" });
    git("config", "user.email", "fixture@example.invalid");
    git("config", "user.name", "Fixture");

    const proofRunner = proofRunnerFixture("test/proof/k00/run.mjs");
    const packageManifest = {
        name: "@mkbabb/keyframes.js",
        version: "6.0.0-fixture",
        type: "module",
        exports: { ".": { types: "./dist/index.d.ts", import: "./dist/index.js" } },
    };
    writeJson(join(repository, "package.json"), packageManifest);
    write(join(repository, proofRunner.relative_path), proofRunner.source);
    write(join(repository, "test/proof/k00/run.mjs"), [
        'import { readFileSync } from "node:fs";',
        `const expectedEnvironmentKeys = ${JSON.stringify(proofEnvironmentKeys)};`,
        'if (JSON.stringify(Object.keys(process.env).sort()) !== JSON.stringify(expectedEnvironmentKeys)) throw new Error("proof environment keys differ");',
        'const marker = process.argv.indexOf("--manifest");',
        'if (marker < 0 || !process.argv[marker + 1]) throw new Error("missing --manifest");',
        'const manifest = JSON.parse(readFileSync(process.argv[marker + 1], "utf8"));',
        'if (manifest.wave_id !== "K00" || manifest.result !== "pass") process.exit(2);',
        'process.stdout.write("PASS K00\\n");',
        "",
    ].join("\n"));
    writeJson(join(repository, "test/proof/k00/manifest.json"), {
        schema: "vnext-proof-manifest/1",
        wave_id: "K00",
        wave_contract_sha256: contracts.get("K00").sha256,
        seed_requirements: contracts.get("K00").contract.seed_requirements,
        result: "pass",
    });
    write(join(repository, "src/index.ts"), 'export { a } from "./a";\n');
    write(join(repository, "src/a.ts"), 'import { b } from "./b";\nexport type A = number;\nexport const a = b;\n');
    write(join(repository, "src/b.ts"), 'import type { A } from "./a";\nexport const b = 1;\nexport type B = A;\n');
    write(join(repository, "src/legacy.test.ts"), "export const legacyTest = true;\n");
    write(join(repository, "test/src/a.test.ts"), 'import { a } from "../../src/a";\nvoid a;\n');
    write(join(repository, "bench/run.ts"), 'import { a } from "../src/a";\nvoid a;\n');
    write(join(repository, "proof/check.mjs"), 'import "../dist/index.js";\n');
    write(join(repository, "demo/current.ts"), "export const demoCurrent = 1;\n");
    write(join(repository, "demo/widget.vue"), "export const demoWidget = 1;\n");
    write(join(repository, "demo/legacy.test.ts"), "export const colocatedDemoTest = true;\n");
    write(join(repository, "test/demo/current.test.ts"), 'import { demoCurrent } from "../../demo/current";\nvoid demoCurrent;\n');
    write(join(repository, canonicalDemoTextLoaderPath), canonicalDemoTextLoaderSource);
    write(join(repository, "dist/index.d.ts"), "export interface Config { duration: number }\nexport declare const play: () => void;\n");
    write(join(repository, "dist/index.js"), "export const play = () => {};\n");
    git("add", ".");
    git("commit", "-m", "fixture");

    const base = fixtureInventory("library");
    const positive = run("positive", structuredClone(base));
    if (positive.status !== 0 || !positive.stdout.includes('"source":3') || !positive.stdout.includes('"export":2')) {
        failures.push(`positive inventory failed: ${positive.stderr}${positive.stdout}`);
    }
    const replay = run("positive-replay", structuredClone(base), "replay");
    if (replay.status !== 0 || !replay.stdout.includes('"mode":"replay"')) {
        failures.push(`positive replay failed: ${replay.stderr}${replay.stdout}`);
    }

    const evidencePath = join(directory, "k00-evidence.txt");
    write(evidencePath, "observed exact K00 library inventory return control\n");
    const evidence = evidenceObject(evidencePath, "K00 universal inventory fixture control");
    const captureReceipt = JSON.parse(positive.stdout.trim());
    const captureReceiptPath = join(directory, "k00-current-inventory.capture.json");
    writeJson(captureReceiptPath, captureReceipt);
    const universalReplay = spawnSync(process.execPath, [validator, "--inventory", join(directory, "positive.json"), "--replay"], {
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
    });
    if (universalReplay.status !== 0) throw new Error(`K00 universal replay fixture failed: ${universalReplay.stderr}${universalReplay.stdout}`);
    const replayReceipt = JSON.parse(universalReplay.stdout.trim());
    const replayReceiptPath = join(directory, "k00-current-inventory.replay.json");
    writeJson(replayReceiptPath, replayReceipt);
    const dependency = genericV29TReturn(evidence);
    const dependencyPath = join(directory, "v29t.return.json");
    writeJson(dependencyPath, dependency);
    const universal = k00Return({
        evidence,
        dependency: dependencyBinding(dependencyPath, dependency),
        gate: gateReceipt(evidence),
        inventory: { path: join(directory, "positive.json"), file_sha256: fileSha256(join(directory, "positive.json")), inventory_hash: base.inventory_hash },
        capture: { path: captureReceiptPath, file_sha256: fileSha256(captureReceiptPath), receipt_hash: captureReceipt.receipt_hash },
        replay: { path: replayReceiptPath, file_sha256: fileSha256(replayReceiptPath), receipt_hash: replayReceipt.receipt_hash },
    });
    const universalPath = join(directory, "k00.return.json");
    writeJson(universalPath, universal);
    const universalPositive = spawnSync(process.execPath, [returnValidator, universalPath, "--historical-certificate"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (universalPositive.status !== 0
        || !universalPositive.stdout.includes('"wave_id":"K00"')
        || !universalPositive.stdout.includes('"mode":"offline-historical-certificate"')) {
        failures.push(`positive universal K00 library inventory return failed: ${universalPositive.stderr}${universalPositive.stdout}`);
    }
    const forgedUniversal = structuredClone(universal);
    forgedUniversal.annexes["keyframes-current-inventory"].capture_receipt.receipt_hash = "f".repeat(64);
    finalizeMember(forgedUniversal, "return_hash");
    const forgedUniversalPath = join(directory, "forged-k00-current-inventory.return.json");
    writeJson(forgedUniversalPath, forgedUniversal);
    const universalForgery = spawnSync(process.execPath, [returnValidator, forgedUniversalPath, "--historical-certificate"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (universalForgery.status === 0
        || !universalForgery.stderr.includes("/annexes/keyframes-current-inventory/capture_receipt/receipt_hash: computed")) {
        failures.push(`forged universal K00 typed inventory annex was not rejected specifically: ${universalForgery.stderr}${universalForgery.stdout}`);
    }
    const forgedCapture = structuredClone(captureReceipt);
    forgedCapture.counts.source += 1;
    const forgedTruth = {
        inventory: forgedCapture.inventory,
        snapshot: forgedCapture.snapshot,
        wave_id: forgedCapture.wave_id,
        scope: forgedCapture.scope,
        repository: forgedCapture.repository,
        counts: forgedCapture.counts,
        graph_hashes: forgedCapture.graph_hashes,
    };
    forgedCapture.truth_hash = sha256(canonicalize(forgedTruth));
    finalizeMember(forgedCapture, "receipt_hash");
    const forgedCapturePath = join(directory, "forged-k00-current-inventory.capture.json");
    writeJson(forgedCapturePath, forgedCapture);
    try {
        validateKeyframesInventoryReceiptPair(forgedCapturePath, replayReceiptPath);
        failures.push("rehashed K00 capture-content forgery passed exact capture/replay parity");
    } catch (error) {
        if (!error.message.includes("capture receipt must exactly equal")) failures.push(`capture-content forgery failed nonspecifically: ${error.message}`);
    }

    const demo = fixtureInventory("demo");
    const demoCapture = run("demo-positive", structuredClone(demo));
    if (demoCapture.status !== 0
        || !demoCapture.stdout.includes('"wave_id":"M00"')
        || !demoCapture.stdout.includes('"scope":"demo"')
        || !demoCapture.stdout.includes('"source":2')
        || !demoCapture.stdout.includes('"test":2')
        || !demoCapture.stdout.includes('"support":1')
        || !demoCapture.stdout.includes('"export":0')) {
        failures.push(`positive M00/demo inventory failed: ${demoCapture.stderr}${demoCapture.stdout}`);
    }
    const demoReplay = run("demo-positive-replay", structuredClone(demo), "replay");
    if (demoReplay.status !== 0 || !demoReplay.stdout.includes('"mode":"replay"')) {
        failures.push(`positive M00/demo replay failed: ${demoReplay.stderr}${demoReplay.stdout}`);
    }
    const demoCurrentPath = join(repository, "demo/current.ts");
    const demoCurrentBytes = readFileSync(demoCurrentPath);
    write(demoCurrentPath, "export const checkoutDriftMustNotAffectReplay = true;\n");
    const demoImmutableReplay = run("demo-immutable-replay", structuredClone(demo), "replay");
    if (demoImmutableReplay.status !== 0 || !demoImmutableReplay.stdout.includes('"mode":"replay"')) {
        failures.push(`M00/demo immutable replay depended on the live checkout: ${demoImmutableReplay.stderr}${demoImmutableReplay.stdout}`);
    }
    write(demoCurrentPath, demoCurrentBytes);

    reject("demo-export-leak", demo, (value) => {
        value.nodes.push(structuredClone(base.nodes.find(({ kind }) => kind === "export")));
        value.nodes.sort((left, right) => compareCanonicalText(`${left.kind}\0${left.id}`, `${right.kind}\0${right.id}`));
    }, "must exactly regenerate");

    reject("missing-node", base, (value) => value.nodes.pop(), "must exactly regenerate");
    reject("extra-node", base, (value) => value.nodes.push({ kind: "source", id: "src/invented.ts", path: "src/invented.ts", bytes: 1, sha256: "1".repeat(64) }), "must exactly regenerate");
    reject("wrong-node-hash", base, (value) => { value.nodes.find(({ kind }) => kind === "source").sha256 = "2".repeat(64); }, "must exactly regenerate");
    reject("wrong-head", base, (value) => { value.repository.head = "3".repeat(40); }, "/repository/head");
    reject("missing-support-decision", base, (value) => value.support_exceptions.pop(), "one typed row");
    reject("wrong-support-class", base, (value) => { value.support_exceptions[0].class = "proof"; }, "/class");
    reject("forged-export", base, (value) => { value.nodes.find(({ kind }) => kind === "export").id = ".#forged:type"; }, "must exactly regenerate");
    reject("graph-edge-drift", base, (value) => value.graphs.runtime.edges.pop(), "/graphs");
    reject("graph-scc-drift", base, (value) => { value.graphs.type.sccs = []; }, "/graphs");

    const dirtyPath = join(repository, "untracked.txt");
    write(dirtyPath, "dirty\n");
    reject("dirty-drift", base, () => {}, "/repository/dirty_sha256");
    unlinkSync(dirtyPath);

    writeJson(join(repository, "package.json"), { ...packageManifest, version: "6.0.1-drift" });
    reject("package-drift", base, () => {}, "/authority/package_manifest_sha256");
    writeJson(join(repository, "package.json"), packageManifest);

    const link = join(repository, "src/link.ts");
    symlinkSync(join(repository, "src/a.ts"), link);
    reject("source-symlink", base, () => {}, "symlink is forbidden");
    unlinkSync(link);

    const notRepository = join(directory, "not-a-repository");
    mkdirSync(notRepository);
    reject("not-git", base, (value) => { value.repository.path = notRepository; }, "/repository");

    reject("nested-fake-root", base, (value) => { value.repository.path = join(repository, "src"); }, "show-toplevel");
    reject("snapshot-mutated-byte", base, (value) => {
        value.snapshot = makeSnapshot("mutated-byte", "library", (root) => write(join(root, "src/a.ts"), "export const forged = true;\n"));
    }, "snapshot");
    reject("snapshot-missing-byte", base, (value) => {
        value.snapshot = makeSnapshot("missing-byte", "library", (root) => unlinkSync(join(root, "src/a.ts")));
    }, "snapshot");
    reject("snapshot-extra-byte", base, (value) => {
        value.snapshot = makeSnapshot("extra-byte", "library", (root) => write(join(root, "src/extra.ts"), "export {};\n"));
    }, "snapshot");
    reject("snapshot-symlink", base, (value) => {
        value.snapshot = makeSnapshot("symlink", "library", (root) => symlinkSync(join(root, "src/a.ts"), join(root, "src/link.ts")));
    }, "only regular files");
} finally {
    rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({ schema: "vnext-keyframes-current-inventory-selftest/1", positive: 5, universal_positive: 1, ordinary_rejections: 19, universal_rejections: 2 })}\n`);
