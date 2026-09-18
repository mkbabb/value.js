#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import {
    canonicalGateArgv,
    fileSha256,
    gateEnvironmentSha256,
    liveGateEnvironment,
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
import { compareCanonicalText, canonicalize, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import { prepareConsumerUniverseReturnModeFixture } from "./consumer-universe-return-mode-fixture.mjs";
import {
    consumerUniverseImmutableBindingProjection,
} from "./consumer-universe-return.mjs";
import { liveCasualtyHits } from "./deletion-judgment.mjs";
import { resolveGitIdentity } from "./resolve-consumer-universe.mjs";
import { projectImmutableDependencyClosure } from "./value-target-owner-return.mjs";
import { loadWaveRegistry } from "./wave-contract.mjs";

const validator = resolve(new URL("validate-return.mjs", import.meta.url).pathname);
const deletionJudgmentSelftest = resolve(new URL("selftest-deletion-judgment.mjs", import.meta.url).pathname);
const deletionTruth = resolve(new URL("deletion-truth.mjs", import.meta.url).pathname);
const directory = realpathSync(mkdtempSync(join(tmpdir(), "vnext-contract-selftest-")));
const consumerReturnFixtureRoot = join(directory, "consumer-return-mode");
const repo = join(directory, "fixture-repo");
const failures = [];
let adversarialRejections = 0;
let consumerReturnPositiveControls = 0;
let consumerReturnLiveBranchIsolations = 0;
let consumerReturnSchemaControls = 0;
let consumerReturnRejections = 0;
const { contracts, edge_policy: waveEdgePolicy } = loadWaveRegistry();
const apiManifestPath = resolve(new URL("../api-contract.source.json", import.meta.url).pathname);
const apiCoveragePath = resolve(new URL("../API-RETURN-COVERAGE.json", import.meta.url).pathname);
const apiCoverage = parseJsonStrict(readFileSync(apiCoveragePath));
const returnSchema = parseJsonStrict(readFileSync(resolve(new URL("../return.schema.json", import.meta.url).pathname)));
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const hashFile = (path) => fileSha256(path);
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
const writeCanonical = (path, value) => writeFileSync(path, `${canonicalize(value)}\n`);
const notApplicable = (reason) => ({ applicability: "not_applicable", reason });
const terminalStatuses = new Set([
    ...waveEdgePolicy.wave_outcomes.flatMap(({ advancing_statuses }) => advancing_statuses),
    ...(waveEdgePolicy.manifest.supersession?.allowed_statuses === "owner-advancing-plus-refused" ? ["REFUSED"] : []),
]);
const auditWaves = new Set(["P00", "P02", "P07", "V00A", "V01", "V02", "V10I", "V30", "V31", "K00", "K04I", "K24", "A00", "A01", "A26", "G00", "D00A", "D17A", "D18A", "D25", "M00", "M11", "C00U", "C00", "C06", "C07", "C08", "C09"]);

function apiSection(waveId, evidence) {
    const coverage = apiCoverage.waves.find((row) => row.wave_id === waveId);
    if (!coverage) throw new Error(`missing API coverage row ${waveId}`);
    return {
        applicability: "applicable",
        api_source_sha256: hashFile(apiManifestPath),
        api_return_coverage_sha256: apiCoverage.manifest_sha256,
        owned_http_operation_ids: coverage.owned.http,
        owned_headless_operation_ids: coverage.owned.headless,
        audited_http_operation_ids: coverage.audited.http,
        audited_headless_operation_ids: coverage.audited.headless,
        validators: ["validate-api-return-coverage.mjs"],
        authority_vectors: ["owned and audited vectors are disjoint"],
        representations: ["application/json and declared raw media"],
        cas_etag_idempotency: ["canonical API source vector"],
        authorization_privacy: ["canonical API source vector"],
        migrations: ["canonical API source vector"],
        evidence: [evidence],
    };
}

function finalize(value) {
    const preimage = structuredClone(value);
    delete preimage.return_hash;
    value.return_hash = sha256(canonicalize(preimage));
    return value;
}

function finalizeDeletionDecision(value) {
    const preimage = structuredClone(value);
    delete preimage.origin;
    delete preimage.decision_hash;
    value.decision_hash = sha256(canonicalize(preimage));
    return value;
}

function finalizeDeletionAnnex(value) {
    const preimage = structuredClone(value);
    delete preimage.annex_hash;
    value.annex_hash = sha256(canonicalize(preimage));
    return value;
}

function gitStatusHash() {
    return sha256(execFileSync("git", ["-C", repo, "status", "--porcelain=v1", "-z"]));
}

function repositoryPin(repository, name) {
    const dirty = sha256(execFileSync("git", ["-C", repository, "status", "--porcelain=v1", "-z"]));
    return {
        repository: name,
        path: realpathSync(repository),
        branch: execFileSync("git", ["-C", repository, "rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" }).trim(),
        head: execFileSync("git", ["-C", repository, "rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
        dirty_before_sha256: dirty,
        dirty_after_sha256: dirty,
    };
}

function run(name, value, flags = [], environment = {}, validatorPath = validator) {
    const path = join(directory, `${name}.return.json`);
    writeJson(path, finalize(value));
    return {
        path,
        result: spawnSync(process.execPath, [validatorPath, path, ...flags], {
            encoding: "utf8",
            env: { ...process.env, ...environment },
            maxBuffer: 128 * 1024 * 1024,
        }),
    };
}

function expectRejected(name, invocation, fragment) {
    if (invocation.result.status === 0 || !invocation.result.stderr.includes(fragment)) {
        failures.push(`${name} was not rejected by ${fragment}: ${invocation.result.stderr}`);
    } else adversarialRejections += 1;
}

function expectConsumerReturnRejected(name, invocation, fragment) {
    expectRejected(name, invocation, fragment);
    consumerReturnRejections += 1;
}

function expectOnlyFailures(name, invocation, expectedFailures) {
    const lines = invocation.result.stderr.split("\n").filter(Boolean);
    const expected = [...expectedFailures].sort(compareCanonicalText);
    const actual = [...lines].sort(compareCanonicalText);
    if (invocation.result.status === 0 || canonicalize(actual) !== canonicalize(expected)) {
        failures.push(`${name} did not isolate ${JSON.stringify(expected)}: status=${invocation.result.status}; stderr=${invocation.result.stderr}; stdout=${invocation.result.stdout}`);
    } else consumerReturnLiveBranchIsolations += 1;
}

function expectStructuralConsumerReturnAccepted(name, invocation, expectedRecord, expectedAdvancing) {
    let receipt;
    try {
        receipt = parseJsonStrict(invocation.result.stdout.trim());
    } catch {
        receipt = undefined;
    }
    if (invocation.result.status !== 0
        || invocation.result.stderr !== ""
        || receipt?.wave_id !== expectedRecord.wave_id
        || receipt?.status !== expectedRecord.status
        || receipt?.return_hash !== expectedRecord.return_hash
        || receipt?.mode !== "offline-historical-only"
        || receipt?.completion_eligible !== false
        || receipt?.outcome_policy?.advancing !== expectedAdvancing
        || receipt?.proof_semantics?.accepted_at_epoch !== false
        || receipt?.proof_semantics?.holds_now !== false
        || receipt?.proof_semantics?.authorizes_decision !== false) {
        failures.push(`${name} was not an exact exit-0 structural/non-completing return: status=${invocation.result.status}; stderr=${invocation.result.stderr}; stdout=${invocation.result.stdout}`);
    } else consumerReturnPositiveControls += 1;
}

try {
    mkdirSync(repo, { recursive: true });
    const waveIds = [...new Set([
        "P00", "V00A", "V00B", "V16B", "G00", "G01", "K21", "K22T", "A00", "A20", "C00U", "C05", "C10",
        ...contracts.get("C00U").contract.dependencies,
        ...contracts.get("C05").contract.dependencies,
        ...contracts.get("K21").contract.dependencies,
    ])].sort(compareCanonicalText);
    writeJson(join(repo, "package.json"), {
        name: "vnext-live-gate-fixture",
        version: "1.0.0",
        private: true,
    });
    const runner = proofRunnerFixture("test/proof/p00/run.mjs");
    mkdirSync(join(repo, ".vnext"), { recursive: true });
    writeFileSync(join(repo, runner.relative_path), runner.source);
    for (const waveId of waveIds) {
        const slug = waveId.toLowerCase();
        const manifestDirectory = join(repo, "test", "proof", slug);
        mkdirSync(manifestDirectory, { recursive: true });
        writeJson(join(manifestDirectory, "manifest.json"), {
            schema: "vnext-proof-manifest/1",
            wave_id: waveId,
            wave_contract_sha256: contracts.get(waveId).sha256,
            seed_requirements: contracts.get(waveId).contract.seed_requirements,
            result: "pass",
        });
        writeFileSync(join(manifestDirectory, "run.mjs"), [
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
        ].join("\n"));
    }
    const fakeScriptShell = join(repo, "fake-script-shell.sh");
    writeFileSync(fakeScriptShell, "#!/bin/sh\nprintf 'FAKE npm wrapper\\n'\nexit 0\n");
    chmodSync(fakeScriptShell, 0o755);
    writeFileSync(join(repo, ".npmrc"), "script-shell=./fake-script-shell.sh\n");
    const poisonedNodePath = join(repo, "node_modules", ".bin", "node");
    mkdirSync(resolve(poisonedNodePath, ".."), { recursive: true });
    writeFileSync(poisonedNodePath, "#!/bin/sh\nexit 91\n");
    chmodSync(poisonedNodePath, 0o755);
    const consumerReturnMode = await prepareConsumerUniverseReturnModeFixture({
        fixtureRoot: consumerReturnFixtureRoot,
        primary: {
            id: "value",
            repository: "value-fixture",
            ownerWave: "C00U",
            path: join(consumerReturnFixtureRoot, "consumer-constellation", "value"),
        },
    });
    if (hashFile(consumerReturnMode.validatorPath) !== hashFile(validator)) {
        failures.push("consumer return-mode fixture validator bytes differ from the canonical validate-return.mjs");
    }
    const deletionRepository = consumerReturnMode.constellation.primaryRepository;
    const deletedSurfacePath = join(deletionRepository, "src", "obsolete-surface.ts");
    const tombstonePath = join(deletionRepository, "TOMBSTONES.md");
    const archivePath = join(deletionRepository, "archive", "history.md");
    mkdirSync(resolve(deletedSurfacePath, ".."), { recursive: true });
    mkdirSync(resolve(archivePath, ".."), { recursive: true });
    writeFileSync(deletedSurfacePath, "export const ObsoleteSurface = true;\n");
    writeFileSync(tombstonePath, "ExistingTombstone\n");
    writeFileSync(archivePath, "ExistingHistory\n");
    execFileSync("git", ["-C", consumerReturnMode.constellation.primaryRepository, "init", "-b", "fixture-value"]);
    execFileSync("git", ["-C", consumerReturnMode.constellation.primaryRepository, "add", "."]);
    execFileSync("git", [
        "-C", consumerReturnMode.constellation.primaryRepository,
        "-c", "user.name=V-next Selftest",
        "-c", "user.email=vnext-selftest@invalid",
        "commit", "-m", "consumer fixture value evidence",
    ]);
    const deletionBeforePath = join(consumerReturnFixtureRoot, "obsolete-surface-before.json");
    const deletionAfterPath = join(consumerReturnFixtureRoot, "obsolete-surface-after.json");
    const deletionTruthPath = join(consumerReturnFixtureRoot, "obsolete-surface-truth.json");
    execFileSync(process.execPath, [deletionTruth, "snapshot", "--phase", "before", "--repository", deletionRepository, "--output", deletionBeforePath]);
    rmSync(deletedSurfacePath);
    writeFileSync(tombstonePath, "ExistingTombstone\nObsoleteSurface\n");
    writeFileSync(archivePath, "ExistingHistory\nObsoleteSurface\n");
    execFileSync("git", ["-C", deletionRepository, "add", "-A"]);
    execFileSync("git", [
        "-C", deletionRepository,
        "-c", "user.name=V-next Selftest",
        "-c", "user.email=vnext-selftest@invalid",
        "commit", "-m", "delete obsolete fixture surface",
    ]);
    execFileSync(process.execPath, [deletionTruth, "snapshot", "--phase", "after", "--repository", deletionRepository, "--output", deletionAfterPath]);
    execFileSync(process.execPath, [deletionTruth, "delta", "--before", deletionBeforePath, "--after", deletionAfterPath, "--output", deletionTruthPath]);
    const deletionTruthReceipt = parseJsonStrict(readFileSync(deletionTruthPath));
    execFileSync("git", ["-C", repo, "init", "-b", "main"]);
    execFileSync("git", ["-C", repo, "add", "."]);
    execFileSync("git", ["-C", repo, "-c", "user.name=V-next Selftest", "-c", "user.email=vnext-selftest@invalid", "commit", "-m", "fixture"]);

    const evidencePath = join(directory, "evidence.txt");
    writeFileSync(evidencePath, "observed exact control\n");
    const evidence = { path: evidencePath, sha256: hashFile(evidencePath), description: "self-test evidence" };
    const parseThatStage = join(directory, "parse-that-stage");
    const stagedPackage = join(parseThatStage, "package");
    const parseThatInstallRoot = join(directory, "parse-that-install");
    const installedPackage = join(parseThatInstallRoot, "node_modules", "@mkbabb", "parse-that");
    mkdirSync(stagedPackage, { recursive: true });
    mkdirSync(installedPackage, { recursive: true });
    const parseThatPackageJson = {
        name: "@mkbabb/parse-that",
        version: "1.0.0",
        main: "./index.js",
        types: "./index.d.ts",
        exports: { ".": { types: "./index.d.ts", default: "./index.js" } },
    };
    const parseThatFiles = new Map([
        ["package.json", `${JSON.stringify(parseThatPackageJson, null, 2)}\n`],
        ["index.js", "export const parse = () => true;\n"],
        ["index.d.ts", "export declare const parse: () => boolean;\n"],
    ]);
    for (const [name, content] of parseThatFiles) {
        writeFileSync(join(stagedPackage, name), content);
        writeFileSync(join(installedPackage, name), content);
    }
    const parseThatTarball = join(directory, "mkbabb-parse-that-1.0.0.tgz");
    execFileSync("/usr/bin/tar", ["-czf", parseThatTarball, "-C", parseThatStage, "package"]);
    const parseThatTarballBytes = readFileSync(parseThatTarball);
    const parseThatIntegrity = `sha512-${createHash("sha512").update(parseThatTarballBytes).digest("base64")}`;
    const parseThatRows = [...parseThatFiles].map(([path, content]) => ({
        path,
        bytes: Buffer.byteLength(content),
        sha256: sha256(content),
    })).sort((left, right) => compareCanonicalText(left.path, right.path));
    const parseThatResolved = "https://registry.npmjs.org/@mkbabb/parse-that/-/parse-that-1.0.0.tgz";
    const parseThatNpmLs = join(directory, "parse-that-npm-ls.json");
    const parseThatLockfile = join(parseThatInstallRoot, "package-lock.json");
    writeJson(parseThatNpmLs, { dependencies: { "@mkbabb/parse-that": { version: "1.0.0", resolved: parseThatResolved } } });
    writeJson(parseThatLockfile, { lockfileVersion: 3, packages: { "node_modules/@mkbabb/parse-that": { version: "1.0.0", resolved: parseThatResolved, integrity: parseThatIntegrity } } });
    const parseThatReceipt = {
        schema: "vnext-parse-that-package-receipt/1",
        package: {
            name: "@mkbabb/parse-that",
            version: "1.0.0",
            registry_spec: "@mkbabb/parse-that@1.0.0",
            integrity: parseThatIntegrity,
        },
        tarball: { path: parseThatTarball, sha256: hashFile(parseThatTarball) },
        archive: {
            package_json_sha256: parseThatRows.find(({ path }) => path === "package.json").sha256,
            file_count: parseThatRows.length,
            files_sha256: sha256(canonicalize(parseThatRows)),
            runtime_files_sha256: sha256(canonicalize(parseThatRows.filter(({ path }) => /\.(?:cjs|mjs|js)$/.test(path)))),
            declaration_files_sha256: sha256(canonicalize(parseThatRows.filter(({ path }) => /\.d\.(?:cts|mts|ts)$/.test(path)))),
            export_conditions_sha256: sha256(canonicalize({ exports: parseThatPackageJson.exports, main: parseThatPackageJson.main, module: null, types: parseThatPackageJson.types })),
        },
        install: {
            root: parseThatInstallRoot,
            package_path: installedPackage,
            source_spec: "@mkbabb/parse-that@1.0.0",
            tree_sha256: sha256(canonicalize(parseThatRows)),
            npm_ls: { path: parseThatNpmLs, sha256: hashFile(parseThatNpmLs) },
            lockfile: { path: parseThatLockfile, sha256: hashFile(parseThatLockfile) },
            workspace_links: [],
        },
        receipt_hash: "",
    };
    const parseThatReceiptPreimage = structuredClone(parseThatReceipt);
    delete parseThatReceiptPreimage.receipt_hash;
    parseThatReceipt.receipt_hash = sha256(canonicalize(parseThatReceiptPreimage));
    const parseThatReceiptPath = join(directory, "parse-that-package-receipt.json");
    writeJson(parseThatReceiptPath, parseThatReceipt);
    const parserHandoffPath = join(directory, "parse-that-external-handoff.txt");
    writeFileSync(parserHandoffPath, "published-only parse-that 1.0.0; all novelty remains external\n");
    const parserScope = new Map([
        ["P00", "baseline"], ["P01", "prototype"], ["P02", "necessity-adjudication"],
        ["P03", "banked-proposal"], ["P04", "published-control"], ["P05", "control-crater"],
        ["P06", "consumer-crater"], ["P07", "acceptance"],
    ]);

    function parserAnnex(waveId) {
        const receiptEvidence = { path: parseThatReceiptPath, sha256: hashFile(parseThatReceiptPath), description: "validated parse-that registry/no-link receipt" };
        const handoffEvidence = { path: parserHandoffPath, sha256: hashFile(parserHandoffPath), description: "published-only external handoff" };
        return {
            schema: "vnext-parser-annex/1",
            scope_class: parserScope.get(waveId),
            package: {
                name: parseThatReceipt.package.name,
                version: parseThatReceipt.package.version,
                registry_spec: parseThatReceipt.package.registry_spec,
                branch: "unchanged-1.0.0-no-republish",
                integrity: parseThatReceipt.package.integrity,
                tarball_sha256: parseThatReceipt.tarball.sha256,
                package_json_sha256: parseThatReceipt.archive.package_json_sha256,
                file_count: parseThatReceipt.archive.file_count,
                file_manifest_sha256: parseThatReceipt.archive.files_sha256,
                runtime_files_sha256: parseThatReceipt.archive.runtime_files_sha256,
                declaration_files_sha256: parseThatReceipt.archive.declaration_files_sha256,
                export_conditions_sha256: parseThatReceipt.archive.export_conditions_sha256,
                no_link_install_sha256: parseThatReceipt.install.tree_sha256,
                receipt_hash: parseThatReceipt.receipt_hash,
            },
            coordinate_domains: ["original-utf16", "processed-utf16", "utf8-byte", "grammar-byte"],
            parser_invocations: new Set(["P00", "P01", "P05", "P06", "P07"]).has(waveId) ? 1 : 0,
            route_coverage: new Set(["P00", "P01", "P05", "P06", "P07"]).has(waveId) ? ["fixture:parse"] : [],
            control_receipt_sha256: receiptEvidence.sha256,
            external_handoff_sha256: handoffEvidence.sha256,
            blockers: [],
            evidence: [receiptEvidence, handoffEvidence],
        };
    }
    const currentHead = () => execFileSync("git", ["-C", repo, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    const currentBranch = () => execFileSync("git", ["-C", repo, "rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" }).trim();
    const executablePath = realpathSync(process.execPath);
    const poisonedProofEnvironment = liveGateEnvironment({
        ...process.env,
        NODE_OPTIONS: "--require=/definitely-not-a-proof-input.cjs",
        VNEXT_RETURN_VALIDATION_CHAIN: "forbidden-proof-flag",
    });
    if (canonicalize(Object.keys(poisonedProofEnvironment).sort()) !== canonicalize(proofEnvironmentKeys)
        || "NODE_OPTIONS" in poisonedProofEnvironment
        || "VNEXT_RETURN_VALIDATION_CHAIN" in poisonedProofEnvironment
        || gateEnvironmentSha256({ ...process.env, VNEXT_RETURN_VALIDATION_CHAIN: "poison" }) !== gateEnvironmentSha256(process.env)) {
        failures.push("proof environment projection leaked or digested a non-allowlisted control flag");
    }

    function gateReceipt(waveId, name = waveId.toLowerCase()) {
        const contract = contracts.get(waveId);
        const gate = contract.contract.gates[0];
        const argv = canonicalGateArgv(gate.subject, waveId);
        const manifestPath = proofManifestPath(repo, argv.manifestRelative);
        const execution = spawnSync(executablePath, argv.args, {
            cwd: repo,
            encoding: null,
            env: proofRunnerEnvironment(),
            maxBuffer: 128 * 1024 * 1024,
            shell: false,
        });
        if (execution.error || execution.signal || execution.status !== 0) {
            throw new Error(`fixture ${waveId} proof failed: ${execution.error?.message ?? execution.signal ?? execution.status}`);
        }
        const stdoutPath = join(directory, `${name}.stdout`);
        const stderrPath = join(directory, `${name}.stderr`);
        writeFileSync(stdoutPath, execution.stdout);
        writeFileSync(stderrPath, execution.stderr);
        const receipt = {
            schema: "vnext-gate-receipt/3",
            wave_id: waveId,
            gate_id: gate.id,
            kind: gate.kind,
            subject: gate.subject,
            expected: gate.expected,
            wave_contract_sha256: contract.sha256,
            challenge_sha256: "0".repeat(64),
            proof_manifest: { path: manifestPath, sha256: hashFile(manifestPath) },
            started_at: new Date(Date.now() - 1000).toISOString(),
            finished_at: new Date().toISOString(),
            result: "pass",
            execution: {
                applicability: "applicable",
                command_token: argv.commandToken,
                executable_path: executablePath,
                executable_sha256: hashFile(executablePath),
                args: argv.args,
                cwd: repo,
                pin_repository: "fixture",
                repository_state_sha256: repositoryStateSha256(repo),
                environment_sha256: gateEnvironmentSha256(),
                exit_code: 0,
                stdout_path: stdoutPath,
                stdout_sha256: hashFile(stdoutPath),
                stderr_path: stderrPath,
                stderr_sha256: hashFile(stderrPath),
            },
            evidence: [evidence],
            receipt_hash: "",
        };
        const preimage = structuredClone(receipt);
        delete preimage.receipt_hash;
        receipt.receipt_hash = sha256(canonicalize(preimage));
        const receiptPath = join(directory, `${name}.gate-receipt.json`);
        writeJson(receiptPath, receipt);
        return { receipt, path: receiptPath, binding: { path: receiptPath, sha256: hashFile(receiptPath), description: `${waveId} live gate receipt` } };
    }

    let challengeSequence = 0;
    const axes = () => ({
        tranche_fit_optimality: [structuredClone(evidence)],
        wave_contract_adherence_friction: [structuredClone(evidence)],
        feature_behavior: [structuredClone(evidence)],
    });
    const writeJsonl = (path, records) => writeFileSync(path, `${records.map((record) => JSON.stringify(record)).join("\n")}\n`);
    const readJsonl = (path) => decodeUtf8Strict(readFileSync(path)).trimEnd().split("\n").map((line) => parseJsonStrict(line));

    function challengeActor(waveId, sequence, role, reportText, startedAt, completedAt, challengeInput) {
        const stem = `${waveId.toLowerCase()}-${sequence}-${role}`;
        const sessionId = `session-${stem}`;
        const reportPath = join(directory, `${stem}.report.md`);
        const sessionPath = join(directory, `${stem}.session.jsonl`);
        const challengeInputText = canonicalize(challengeInput);
        const epochReportText = `${reportText.trimEnd()}\nVNEXT-CHALLENGE-INPUT ${challengeInputText}\n`;
        writeFileSync(reportPath, epochReportText);
        writeJsonl(sessionPath, [
            { timestamp: new Date(startedAt).toISOString(), type: "session_meta", payload: { id: sessionId } },
            { timestamp: new Date(startedAt + 100).toISOString(), type: "response_item", payload: { type: "message", role: "user", content: [{ type: "input_text", text: `${role === "adjudicator" ? "ADJUDICATE-WAVE" : "ASSUME-WAVE-WRONG"} ${challengeInputText}` }] } },
            { timestamp: new Date(startedAt + 200).toISOString(), type: "turn_context", payload: { model: "gpt-5.6-sol", effort: "ultra" } },
            { timestamp: new Date(completedAt - 100).toISOString(), type: "response_item", payload: { type: "message", role: "assistant", phase: "final_answer", content: [{ type: "output_text", text: epochReportText }] } },
            { timestamp: new Date(completedAt).toISOString(), type: "event_msg", payload: { type: "task_complete", last_agent_message: epochReportText } },
        ]);
        return {
            role,
            posture: role === "adjudicator" ? "adjudicate-not-vote" : "assume-wave-wrong",
            session_id: sessionId,
            session_jsonl: { path: sessionPath, sha256: hashFile(sessionPath), description: `${role} content-attested Sol-ultra transcript` },
            report: { path: reportPath, sha256: hashFile(reportPath), description: `${role} final-state challenge report` },
            axes: challengeInput.axes,
            verdict: role === "adjudicator" ? "ratified" : "clean",
            unresolved_findings: [],
        };
    }

    function implementationChallenge(waveId, gateRecord, dependencies, pins, semanticRecord) {
        if (auditWaves.has(waveId)) return notApplicable(`${waveId} is audit-only`);
        const repositoryStates = pins.map((pin) => ({
            repository: pin.repository,
            path: pin.path,
            sha256: repositoryStateSha256(pin.path),
        })).sort((left, right) => compareCanonicalText(`${left.repository}\0${left.path}`, `${right.repository}\0${right.path}`));
        const challengeInputBase = {
            schema: "vnext-implementation-challenge-input/1",
            wave_id: waveId,
            wave_contract_sha256: contracts.get(waveId).sha256,
            semantic_subject_sha256: implementationSemanticSubjectSha256(semanticRecord),
            dependency_closure_sha256: projectImmutableDependencyClosure(waveId, dependencies).descendant_closure_hash,
            direct_dependency_returns: dependencies.map((binding) => ({
                wave_id: binding.wave_id,
                path: binding.path,
                file_sha256: binding.file_sha256,
                return_hash: binding.return_hash,
                wave_contract_sha256: binding.wave_contract_sha256,
            })),
            implementation_state: {
                pins: pins.map((pin) => ({
                    repository: pin.repository,
                    path: pin.path,
                    head: pin.head,
                    dirty_after_sha256: pin.dirty_after_sha256,
                })),
                repository_states: repositoryStates,
            },
            gate_contract: implementationGateContract(semanticRecord.gates),
        };
        const sequence = ++challengeSequence;
        const gateStart = Date.parse(gateRecord.receipt.started_at);
        const criticA = challengeActor(waveId, sequence, "critic_a", `${waveId} critic A found the final implementation coherent.\n`, gateStart - 7000, gateStart - 5000, {
            ...challengeInputBase,
            role: "critic_a",
            axes: axes(),
        });
        const criticB = challengeActor(waveId, sequence, "critic_b", `${waveId} critic B independently found the final implementation coherent.\n`, gateStart - 6500, gateStart - 4500, {
            ...challengeInputBase,
            role: "critic_b",
            axes: axes(),
        });
        const inputHashes = [criticA.report.sha256, criticB.report.sha256];
        const adjudicator = challengeActor(
            waveId,
            sequence,
            "adjudicator",
            `${waveId} adjudication ratifies critic_a ${inputHashes[0]} then critic_b ${inputHashes[1]}.\n`,
            gateStart - 4000,
            gateStart - 3000,
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
            repository_states: repositoryStates,
            critics: [criticA, criticB],
            adjudicator,
        };
    }

    function sealGateRecord(gateRecord, challenge) {
        sealGateReceiptChallenge(gateRecord.receipt, challenge);
        writeJson(gateRecord.path, gateRecord.receipt);
        gateRecord.binding.sha256 = hashFile(gateRecord.path);
        return gateRecord;
    }

    function baseRecord(waveId, gateRecord, dependencies = []) {
        const contract = contracts.get(waveId);
        const gate = contract.contract.gates[0];
        const status = gitStatusHash();
        const pins = [{
            repository: "fixture",
            path: repo,
            branch: currentBranch(),
            head: currentHead(),
            dirty_before_sha256: status,
            dirty_after_sha256: status,
        }];
        const record = {
            schema: "vnext-wave-return/2",
            wave_id: waveId,
            status: waveEdgePolicy.by_wave.get(waveId).advancing_statuses[0],
            return_hash: "",
            evidence_inputs: [{ path: evidencePath, sha256: hashFile(evidencePath), purpose: "contract self-test", class: "generated" }],
            quarantine_attestation: {
                forbidden_path: "/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/vnext/r1-opus-refuted/",
                read: false,
                tool_log_path: evidencePath,
                tool_log_sha256: hashFile(evidencePath),
            },
            pins,
            scope: {
                mission: contract.contract.mission,
                wave_contract_sha256: contract.sha256,
                seed_requirements_verified: contract.contract.seed_requirements,
                dependency_returns: dependencies,
                files_intended: [],
                files_changed: [],
            },
            born_red: {
                witness: "a caller-authored process claim could previously pass without executing its proof",
                reproduction: "node tools/selftest-contracts.mjs",
                observed_failure: "the v1 receipt accepted invented success bytes",
                evidence: [evidence],
            },
            delivery: { source: [], tests: [], exports: [], deleted_paths: [], migrations: [] },
            dag_delta: notApplicable("contract-only audit"),
            gates: [{
                id: gate.id,
                kind: gate.kind,
                command_or_probe: gate.subject,
                expected: gate.expected,
                result: "pass",
                receipt: gateRecord.binding,
                evidence: [evidence],
            }],
            api_contract: notApplicable(`${waveId} has no API operation in this fixture`),
            visual: notApplicable(`${waveId} has no visual claim in this fixture`),
            performance: notApplicable(`${waveId} has no performance claim in this fixture`),
            limits: notApplicable(`${waveId} has no limit claim in this fixture`),
            consumers: notApplicable(`${waveId} has no consumer claim in this fixture`),
            terminal_disposition: { kept: ["live proof control"], pruned: [], deletions: [], refusals: [], no_legacy_paths: true, standards_compatibility: [] },
            standards_operation_vector: notApplicable(`${waveId} does not decide standard features in this fixture`),
            routed_remainder: [],
            verdict: "live-reexecuted contract control passes",
            annexes: {
                ...(parserScope.has(waveId) ? { parser: parserAnnex(waveId) } : {}),
            },
        };
        const challenge = implementationChallenge(waveId, gateRecord, dependencies, pins, record);
        record.annexes["implementation-challenge"] = challenge;
        sealGateRecord(gateRecord, challenge);
        record.gates[0].receipt = structuredClone(gateRecord.binding);
        return record;
    }

    function rewriteReceipt(name, source, mutate) {
        const receipt = structuredClone(source.receipt);
        mutate(receipt);
        const preimage = structuredClone(receipt);
        delete preimage.receipt_hash;
        receipt.receipt_hash = sha256(canonicalize(preimage));
        const path = join(directory, `${name}.gate-receipt.json`);
        writeJson(path, receipt);
        return { receipt, path, binding: { path, sha256: hashFile(path), description: `${name} receipt` } };
    }

    function refreshImplementationChallenge(record, name) {
        const source = {
            receipt: parseJsonStrict(readFileSync(record.gates[0].receipt.path)),
        };
        const gateRecord = rewriteReceipt(`${name}-challenge-bound`, source, (receipt) => {
            receipt.schema = "vnext-gate-receipt/3";
            receipt.challenge_sha256 = "0".repeat(64);
        });
        record.gates[0].receipt = structuredClone(gateRecord.binding);
        const challenge = implementationChallenge(
            record.wave_id,
            gateRecord,
            record.scope.dependency_returns,
            record.pins,
            record,
        );
        record.annexes["implementation-challenge"] = challenge;
        sealGateRecord(gateRecord, challenge);
        record.gates[0].receipt = structuredClone(gateRecord.binding);
        return record;
    }

    function resealRecordGate(record, name) {
        const source = { receipt: parseJsonStrict(readFileSync(record.gates[0].receipt.path)) };
        const gateRecord = rewriteReceipt(`${name}-challenge-bound`, source, (receipt) => {
            receipt.schema = "vnext-gate-receipt/3";
            receipt.challenge_sha256 = "0".repeat(64);
        });
        sealGateRecord(gateRecord, record.annexes["implementation-challenge"]);
        record.gates[0].receipt = structuredClone(gateRecord.binding);
        return record;
    }

    const refusalRow = (code, capability, context) => ({
        code,
        capability,
        context,
        no_fallback: true,
        evidence: [structuredClone(evidence)],
    });

    function dependencyBinding(returnPath, dependency) {
        const repositoryStates = dependency.pins.map((pin) => {
            const certified = [];
            for (const gate of dependency.gates) {
                const returned = parseJsonStrict(readFileSync(gate.receipt.path));
                if (returned.execution?.applicability === "applicable"
                    && returned.execution.pin_repository === pin.repository
                    && returned.execution.cwd === pin.path) {
                    certified.push(returned.execution.repository_state_sha256);
                }
            }
            if (dependency.annexes["implementation-challenge"]?.applicability === "applicable") {
                for (const state of dependency.annexes["implementation-challenge"].repository_states) {
                    if (state.repository === pin.repository && state.path === pin.path) certified.push(state.sha256);
                }
            }
            const hashes = [...new Set(certified)];
            if (hashes.length !== 1) throw new Error(`fixture dependency ${dependency.wave_id} pin ${pin.repository} lacks one exact certified state`);
            return { repository: pin.repository, path: pin.path, sha256: hashes[0] };
        }).sort((left, right) => compareCanonicalText(
            `${left.repository}\0${left.path}`,
            `${right.repository}\0${right.path}`,
        ));
        return {
            wave_id: dependency.wave_id,
            path: returnPath,
            file_sha256: hashFile(returnPath),
            return_hash: dependency.return_hash,
            wave_contract_sha256: dependency.scope.wave_contract_sha256,
            repository_states: repositoryStates,
            corpus_epoch: notApplicable("predecessor has no inspected corpus epoch"),
        };
    }

    function persistReturn(name, record) {
        const path = join(directory, `${name}.return.json`);
        writeJson(path, finalize(record));
        return { path, record };
    }

    function deletionReturnBinding(path, record) {
        return {
            wave_id: record.wave_id,
            path,
            file_sha256: hashFile(path),
            return_hash: record.return_hash,
            status: record.status,
        };
    }

    function deletionAnnexBinding(waveId, phase, path, annex) {
        return {
            schema: "vnext-deletion-judgment-return-annex/1",
            wave_id: waveId,
            phase,
            path,
            file_sha256: hashFile(path),
            annex_hash: annex.annex_hash,
        };
    }

    function deletionConsumerScan(consumerAnnex, authority) {
        const binding = consumerUniverseImmutableBindingProjection(consumerAnnex);
        const { schema, ...projection } = binding;
        if (schema !== "vnext-consumer-universe-immutable-binding/1") {
            throw new Error(`consumer immutable binding schema drift: ${schema}`);
        }
        return { authority, ...projection };
    }

    const p00Gate = gateReceipt("P00");
    const p00 = baseRecord("P00", p00Gate);
    const valid = run("valid", structuredClone(p00));
    if (valid.result.status !== 0) failures.push(`valid return rejected: ${valid.result.stderr}`);
    const malformedUtf8Path = join(directory, "malformed-utf8.return.json");
    writeFileSync(malformedUtf8Path, Buffer.from([0x7b, 0x22, 0x78, 0x22, 0x3a, 0xff, 0x7d]));
    expectRejected("malformed UTF-8 return", {
        path: malformedUtf8Path,
        result: spawnSync(process.execPath, [validator, malformedUtf8Path], {
            encoding: "utf8",
            env: process.env,
            maxBuffer: 128 * 1024 * 1024,
        }),
    }, "malformed UTF-8");
    const flagIsolation = run("proof-flag-isolation", structuredClone(p00), [], { VNEXT_PROOF_FLAG_LEAK: "must-not-cross" });
    if (flagIsolation.result.status !== 0) {
        failures.push(`non-allowlisted validator flag leaked into the proof process: ${flagIsolation.result.stderr}${flagIsolation.result.stdout}`);
    }

    const v16bGate = gateReceipt("V16B", "v16b-semantic-subject");
    const v16bKeep = baseRecord("V16B", v16bGate);
    const reusedPruneTriad = structuredClone(v16bKeep);
    reusedPruneTriad.status = "PRUNE";
    expectRejected(
        "KEEP triad reused for PRUNE",
        run("keep-triad-reused-for-prune", reusedPruneTriad),
        "user prompt must bind the exact wave/contract/dependency/state epoch",
    );
    const reusedRefusedTriad = structuredClone(v16bKeep);
    reusedRefusedTriad.status = "REFUSED";
    reusedRefusedTriad.terminal_disposition.refusals = [refusalRow(
        "reused-triad-refusal",
        "conditional owner capability",
        "the control changes the semantic outcome without a fresh challenge",
    )];
    expectRejected(
        "KEEP triad reused for REFUSED",
        run("keep-triad-reused-for-refused", reusedRefusedTriad),
        "user prompt must bind the exact wave/contract/dependency/state epoch",
    );
    const emptyRefused = structuredClone(reusedRefusedTriad);
    emptyRefused.terminal_disposition.refusals = [];
    refreshImplementationChallenge(emptyRefused, "empty-refused");
    expectRejected(
        "REFUSED without typed refusal",
        run("refused-without-typed-refusal", emptyRefused),
        "REFUSED requires at least one typed missing-capability row",
    );

    const wrongRootOutcome = structuredClone(p00);
    wrongRootOutcome.status = "KEEP";
    expectRejected("wrong root outcome", run("wrong-root-outcome", wrongRootOutcome), "KEEP is not an advancing outcome for P00");

    const refusedRoot = structuredClone(p00);
    refusedRoot.status = "REFUSED";
    refusedRoot.terminal_disposition.refusals = [refusalRow(
        "fixture-capability-unavailable",
        "fixture terminal capability",
        "the hostile control intentionally withholds the capability and permits no fallback",
    )];
    refreshImplementationChallenge(refusedRoot, "refused-root");
    const refusedLive = run("refused-root-live", structuredClone(refusedRoot));
    let refusedLiveReceipt;
    try {
        refusedLiveReceipt = parseJsonStrict(refusedLive.result.stdout.trim());
    } catch {
        refusedLiveReceipt = undefined;
    }
    if (refusedLive.result.status !== 0
        || refusedLiveReceipt?.completion_eligible !== false
        || refusedLiveReceipt?.outcome_policy?.advancing !== false
        || refusedLiveReceipt?.outcome_policy?.reopening !== true
        || refusedLiveReceipt?.proof_semantics?.holds_now !== true) {
        failures.push(`REFUSED root was not preserved as live, non-advancing evidence: ${refusedLive.result.stderr}${refusedLive.result.stdout}`);
    }
    const refusedImmutable = run("refused-root-immutable", structuredClone(refusedRoot), ["--immutable-authority"]);
    let refusedImmutableReceipt;
    try {
        refusedImmutableReceipt = parseJsonStrict(refusedImmutable.result.stdout.trim());
    } catch {
        refusedImmutableReceipt = undefined;
    }
    if (refusedImmutable.result.status !== 0
        || refusedImmutableReceipt?.mode !== "offline-immutable-authority"
        || refusedImmutableReceipt?.completion_eligible !== false
        || refusedImmutableReceipt?.immutable_authority_eligible !== true
        || refusedImmutableReceipt?.proof_semantics?.authorizes_decision !== false) {
        failures.push(`REFUSED root did not produce exact non-advancing immutable evidence: ${refusedImmutable.result.stderr}${refusedImmutable.result.stdout}`);
    }
    expectRejected(
        "removed decision-authorization alias",
        run("removed-decision-authorization-alias", structuredClone(p00), ["--decision-authorization"]),
        "--immutable-authority",
    );

    const missingParserAnnex = structuredClone(p00);
    delete missingParserAnnex.annexes.parser;
    expectRejected("missing parser annex", run("missing-parser-annex", missingParserAnnex), "/annexes/parser");

    const zeroParserInvocations = structuredClone(p00);
    zeroParserInvocations.annexes.parser.parser_invocations = 0;
    expectRejected("zero parser invocations", run("zero-parser-invocations", zeroParserInvocations), "/annexes/parser/parser_invocations");

    const zeroParserRoutes = structuredClone(p00);
    zeroParserRoutes.annexes.parser.route_coverage = [];
    expectRejected("zero parser routes", run("zero-parser-routes", zeroParserRoutes), "/annexes/parser/route_coverage");

    const wrongParserProjection = structuredClone(p00);
    wrongParserProjection.annexes.parser.package.file_manifest_sha256 = "0".repeat(64);
    expectRejected("wrong parser package projection", run("wrong-parser-projection", wrongParserProjection), "/annexes/parser/package");

    const fakeReceiptPath = join(directory, "fake-parse-that-receipt.json");
    writeJson(fakeReceiptPath, {});
    const fakeParserReceipt = structuredClone(p00);
    fakeParserReceipt.annexes.parser.evidence[0] = {
        path: fakeReceiptPath,
        sha256: hashFile(fakeReceiptPath),
        description: "forged empty package receipt",
    };
    fakeParserReceipt.annexes.parser.control_receipt_sha256 = hashFile(fakeReceiptPath);
    expectRejected("fake parser package receipt", run("fake-parser-receipt", fakeParserReceipt), "/annexes/parser/package");

    const parserOnNonParserWave = baseRecord("A00", gateReceipt("A00", "a00-parser-annex"));
    parserOnNonParserWave.api_contract = apiSection("A00", evidence);
    parserOnNonParserWave.annexes.parser = parserAnnex("P00");
    expectRejected("parser annex on non-parser wave", run("parser-on-non-parser-wave", parserOnNonParserWave), "only P00-P07");

    const a00Gate = gateReceipt("A00");
    const a00 = baseRecord("A00", a00Gate);
    a00.api_contract = apiSection("A00", evidence);
    const validApiCoverage = run("valid-api-coverage", structuredClone(a00));
    if (validApiCoverage.result.status !== 0) failures.push(`valid API coverage return rejected: ${validApiCoverage.result.stderr}`);

    const a20Gate = gateReceipt("A20");
    const a20 = baseRecord("A20", a20Gate);
    a20.api_contract = apiSection("A20", evidence);
    const a20CoverageControl = run("a20-api-coverage-control", structuredClone(a20));
    const a20ExpectedDependencyFailure = "/scope/dependency_returns: expected exact direct predecessors A08,A09C";
    const a20Unexpected = a20CoverageControl.result.stderr
        .split("\n")
        .filter(Boolean)
        .filter((line) => line !== a20ExpectedDependencyFailure);
    if (a20CoverageControl.result.status === 0 || a20Unexpected.length) {
        failures.push(`A20 API coverage did not isolate the deliberately absent predecessors: ${a20CoverageControl.result.stderr}`);
    } else adversarialRejections += 1;
    const a20ZeroOwner = structuredClone(a20);
    a20ZeroOwner.api_contract.owned_http_operation_ids = [];
    expectRejected("A20 zero-owner escape", run("a20-zero-owner", a20ZeroOwner), "/api_contract/owned_http_operation_ids");

    const historical = structuredClone(p00);
    historical.pins[0].head = "0".repeat(40);
    const historicalLive = run("historical-live", structuredClone(historical));
    expectRejected("stale live pin", historicalLive, "/pins/0/head");
    const historicalOffline = run("historical-offline", structuredClone(historical), ["--offline"]);
    let historicalOfflineReceipt;
    try {
        historicalOfflineReceipt = parseJsonStrict(historicalOffline.result.stdout.trim());
    } catch {
        historicalOfflineReceipt = undefined;
    }
    if (historicalOffline.result.status !== 0
        || historicalOfflineReceipt?.mode !== "offline-historical-only"
        || historicalOfflineReceipt?.completion_eligible !== false
        || canonicalize(historicalOfflineReceipt?.proof_semantics) !== canonicalize({
            accepted_at_epoch: false,
            holds_now: false,
            authorizes_decision: false,
        })
        || "historical_gate_replay" in (historicalOfflineReceipt ?? {})
        || "immutable_authority_eligible" in (historicalOfflineReceipt ?? {})) {
        failures.push(`offline historical evidence was not explicitly non-completing: ${historicalOffline.result.stderr}${historicalOffline.result.stdout}`);
    }

    const historicalProofPath = join(repo, "test", "proof", "p00", "run.mjs");
    const historicalProof = readFileSync(historicalProofPath, "utf8");
    writeFileSync(historicalProofPath, `${historicalProof}\n// checkout advanced after the persisted return\n`);
    const staleCheckoutLive = run("historical-stale-checkout-live", structuredClone(p00));
    expectRejected("stale checkout live return", staleCheckoutLive, "repository_state_sha256");
    const staleCheckoutOffline = run("historical-stale-checkout-offline", structuredClone(p00), ["--offline"]);
    if (staleCheckoutOffline.result.status !== 0 || !staleCheckoutOffline.result.stdout.includes('"mode":"offline-historical-only"')) {
        failures.push(`offline historical replay consulted stale live checkout state: ${staleCheckoutOffline.result.stderr}${staleCheckoutOffline.result.stdout}`);
    }
    writeFileSync(historicalProofPath, historicalProof);

    const unbound = structuredClone(p00);
    unbound.gates[0].command_or_probe = "test -e /definitely/missing";
    expectRejected("unbound gate", run("unbound-gate", unbound), "must equal canonical subject");

    const npmWrapperGate = structuredClone(p00);
    npmWrapperGate.gates[0].command_or_probe = "npm run proof:p00 -- --manifest test/proof/p00/manifest.json";
    expectRejected("npm wrapper gate", run("npm-wrapper-gate", npmWrapperGate), "must equal canonical subject");

    const wrongContract = structuredClone(p00);
    wrongContract.scope.wave_contract_sha256 = "0".repeat(64);
    expectRejected("wrong wave contract", run("wrong-wave-contract", wrongContract), "/scope/wave_contract_sha256");

    const missingSeedProjection = structuredClone(p00);
    missingSeedProjection.scope.seed_requirements_verified = [];
    expectRejected("missing seed projection", run("missing-seed-projection", missingSeedProjection), "/scope/seed_requirements_verified");

    const staleReceiptContract = rewriteReceipt("stale-receipt-contract", p00Gate, (receipt) => {
        receipt.wave_contract_sha256 = "0".repeat(64);
    });
    const staleReceiptRecord = baseRecord("P00", staleReceiptContract);
    expectRejected("stale receipt contract", run("stale-receipt-contract", staleReceiptRecord), "/wave_contract_sha256");

    const extraGate = structuredClone(p00);
    extraGate.gates.push(structuredClone(extraGate.gates[0]));
    expectRejected("extra gate", run("extra-gate", extraGate), "exact 1-gate canonical set");

    const unadjudicatedDeletion = structuredClone(p00);
    unadjudicatedDeletion.delivery.deleted_paths = [{ repository: "fixture", path: "src/old.ts" }];
    expectRejected("unadjudicated deletion", run("unadjudicated-deletion", unadjudicatedDeletion), "/annexes/deletion-judgment: required");

    const stringDeletionPath = structuredClone(p00);
    stringDeletionPath.delivery.deleted_paths = ["src/old.ts"];
    expectRejected("string deletion path", run("string-deletion-path", stringDeletionPath), "/delivery/deleted_paths/0: expected object");

    const unqualifiedDecisionEffect = structuredClone(p00);
    unqualifiedDecisionEffect.terminal_disposition.deletions = [{
        decision_id: "old-surface",
        decision_hash: "0".repeat(64),
        file_effects: { deleted: ["src/old.ts"], modified: [] },
    }];
    expectRejected("unqualified decision effect", run("unqualified-decision-effect", unqualifiedDecisionEffect), "/terminal_disposition/deletions/0/file_effects/deleted/0: expected object");

    const fakeDeletionBinding = (waveId, phase, path = evidencePath) => ({
        schema: "vnext-deletion-judgment-return-annex/1",
        wave_id: waveId,
        phase,
        path,
        file_sha256: path === evidencePath ? hashFile(path) : "0".repeat(64),
        annex_hash: "0".repeat(64),
    });
    const wrongOwnerPhase = structuredClone(p00);
    wrongOwnerPhase.annexes["deletion-judgment"] = fakeDeletionBinding("P00", "c05-rehearsal");
    expectRejected("owner wrong deletion phase", run("owner-wrong-deletion-phase", wrongOwnerPhase), "P00 requires owner-precut");

    const wrongOwnerWave = structuredClone(p00);
    wrongOwnerWave.annexes["deletion-judgment"] = fakeDeletionBinding("K21", "owner-precut");
    expectRejected("owner wrong deletion wave", run("owner-wrong-deletion-wave", wrongOwnerWave), "must equal the returning wave");

    const missingDeletionAnnexFile = structuredClone(p00);
    missingDeletionAnnexFile.annexes["deletion-judgment"] = fakeDeletionBinding("P00", "owner-precut", join(directory, "missing-deletion-annex.json"));
    expectRejected("missing deletion annex file", run("missing-deletion-annex-file", missingDeletionAnnexFile), "evidence file does not exist");

    const applicableConsumers = () => ({
        applicability: "applicable",
        direct: { applicability: "applicable", items: ["fifteen-root bounded fixture"] },
        peer: notApplicable("consumer-universe return-mode control"),
        transitive: notApplicable("consumer-universe return-mode control"),
        casualties: [],
        migrations: [],
        packed_evidence: [structuredClone(evidence)],
    });
    const c00uBaseline = notApplicable("C00U is the first census");
    const c00uExpectedDependencyFailure = `/scope/dependency_returns: expected exact direct predecessors ${[...contracts.get("C00U").contract.dependencies].sort().join(",")}`;
    const c05ExpectedDependencyFailure = `/scope/dependency_returns: expected exact direct predecessors ${[...contracts.get("C05").contract.dependencies].sort().join(",")}`;

    const c00uGreenFixture = consumerReturnMode.resolve({
        name: "c00u-complete-universe",
        waveId: "C00U",
    });
    const c00uCompleteGate = gateReceipt("C00U", "c00u-consumer-complete");
    const c00uComplete = baseRecord("C00U", c00uCompleteGate);
    c00uComplete.consumers = applicableConsumers();
    c00uComplete.annexes["consumer-universe"] = {
        ...c00uGreenFixture.annex,
        baseline: c00uBaseline,
    };
    const c00uCompleteResult = run(
        "c00u-consumer-complete",
        c00uComplete,
        [],
        {},
        consumerReturnMode.validatorPath,
    );
    expectOnlyFailures("C00U COMPLETE consumer return", c00uCompleteResult, [c00uExpectedDependencyFailure]);

    const c00uWrongOuterStatus = structuredClone(c00uComplete);
    c00uWrongOuterStatus.status = "NOT_CLEAN";
    expectConsumerReturnRejected(
        "C00U wrong outer status",
        run("c00u-consumer-wrong-outer-status", c00uWrongOuterStatus, [], {}, consumerReturnMode.validatorPath),
        "/status: C00U consumer-universe return must be COMPLETE or BLOCKED; found NOT_CLEAN",
    );

    const structuralStubs = new Map();
    const makeStructuralStub = (waveId, dependencies = [], label = waveId.toLowerCase()) => {
        const gate = gateReceipt(waveId, `structural-${label}`);
        const record = baseRecord(waveId, gate, [...dependencies].sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id)));
        const persisted = persistReturn(`structural-${label}`, record);
        const result = { ...persisted, binding: dependencyBinding(persisted.path, persisted.record) };
        structuralStubs.set(waveId, result);
        return result;
    };
    for (const waveId of contracts.get("K21").contract.dependencies) makeStructuralStub(waveId);

    const deletionName = "ObsoleteSurface";
    const ignoredDirectoryNames = consumerReturnMode.constellation.authority.bounds.ignored_directory_names;
    const scanHitCore = ({ root_id, path, pattern, line, file_sha256 }) => ({ root_id, path, pattern, line, file_sha256 });
    const observedDeletionHits = liveCasualtyHits(c00uGreenFixture.receipt, [deletionName], { ignoredDirectoryNames });
    if (observedDeletionHits.length !== 2) {
        throw new Error(`structural deletion fixture expected tombstone plus archive hits; observed ${canonicalize(observedDeletionHits)}`);
    }
    const deletionEvidence = (path, description) => {
        const canonicalPath = realpathSync(path);
        return { path: canonicalPath, sha256: hashFile(canonicalPath), description };
    };
    const allowedDeletionHits = observedDeletionHits.map((hit) => {
        const tombstone = hit.path === "TOMBSTONES.md";
        const proofPath = tombstone ? tombstonePath : archivePath;
        return {
            ...hit,
            classification: tombstone ? "tombstone" : "archive",
            reason: tombstone ? "intentional current by-name tombstone" : "immutable archive history",
            evidence: [deletionEvidence(proofPath, tombstone ? "by-name tombstone ledger" : "canonical historical record")],
        };
    }).sort((left, right) => compareCanonicalText(canonicalize(scanHitCore(left)), canonicalize(scanHitCore(right))));
    const deletionRoots = c00uGreenFixture.receipt.roots
        .filter(({ status }) => status === "included")
        .map(({ id }) => ({ root_id: id, status: "unaffected", evidence: [structuredClone(evidence)] }))
        .sort((left, right) => compareCanonicalText(left.root_id, right.root_id));
    const deletionCasualtyScan = {
        consumer_receipt_hash: c00uGreenFixture.receipt.receipt_hash,
        patterns: [deletionName],
        roots: deletionRoots,
        active_hits: [],
        allowed_hits: allowedDeletionHits,
        scan_sha256: "",
    };
    deletionCasualtyScan.scan_sha256 = sha256(canonicalize({
        consumer_receipt_hash: deletionCasualtyScan.consumer_receipt_hash,
        decision_id: "obsolete-surface",
        patterns: deletionCasualtyScan.patterns,
        roots: deletionCasualtyScan.roots,
        active_hits: deletionCasualtyScan.active_hits,
        allowed_hits: deletionCasualtyScan.allowed_hits,
    }));
    const deletionTruthHash = deletionTruthReceipt.receipt_hash;
    const deletedEffects = [{ root_id: "value", path: "src/obsolete-surface.ts", truth_receipt_hash: deletionTruthHash }];
    const modifiedEffects = ["TOMBSTONES.md", "archive/history.md"]
        .map((path) => ({ root_id: "value", path, truth_receipt_hash: deletionTruthHash }))
        .sort((left, right) => compareCanonicalText(`${left.root_id}\0${left.path}`, `${right.root_id}\0${right.path}`));
    const ownerDecision = finalizeDeletionDecision({
        decision_id: "obsolete-surface",
        owner_wave: "K21",
        origin: { kind: "current-wave" },
        surface: { kind: "module", name: deletionName },
        file_effects: { deleted: deletedEffects, modified: modifiedEffects },
        intrinsic_job: { claim: "the obsolete fixture module has no retained intrinsic job", evidence: [structuredClone(evidence)] },
        judgment: "retired",
        replacement: {
            applicability: "not_applicable",
            reason: "the fixture module is intentionally retired after its consumers are proved absent",
            evidence: [structuredClone(evidence)],
        },
        casualty_scan: deletionCasualtyScan,
        tombstone: { name: deletionName, evidence: deletionEvidence(tombstonePath, "ObsoleteSurface tombstone") },
        zero_residue: {
            categories: ["consumers", "declarations", "documentation", "manifests-exports", "packed-artifacts", "source"]
                .map((category) => ({ category, matches: 0, evidence: [structuredClone(evidence)] })),
        },
        decision_hash: "",
    });
    const truthReference = {
        owner_wave: "K21",
        root_id: "value",
        path: realpathSync(deletionTruthPath),
        file_sha256: hashFile(deletionTruthPath),
        receipt_hash: deletionTruthHash,
    };
    const ownerDeletionAnnex = finalizeDeletionAnnex({
        schema: "vnext-deletion-judgment/1",
        phase: "owner-precut",
        wave_id: "K21",
        consumer_scan: deletionConsumerScan(c00uGreenFixture.annex, "owner-precut"),
        truth_receipts: [truthReference],
        delivery_deleted: [{ root_id: "value", path: "src/obsolete-surface.ts" }],
        disposition_deletions: [{ decision_id: ownerDecision.decision_id, file_effects: structuredClone(ownerDecision.file_effects) }],
        ancestor_returns: [],
        decisions: [ownerDecision],
        c10_removed_surfaces: [],
        annex_hash: "",
    });
    const ownerDeletionAnnexPath = join(directory, "structural-k21-deletion-annex.json");
    writeCanonical(ownerDeletionAnnexPath, ownerDeletionAnnex);
    const k21Dependencies = contracts.get("K21").contract.dependencies
        .map((waveId) => structuralStubs.get(waveId).binding)
        .sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id));
    const k21Record = baseRecord("K21", gateReceipt("K21", "structural-k21-owner"), k21Dependencies);
    const deletionRepositoryName = c00uGreenFixture.receipt.roots.find(({ id }) => id === "value").repository;
    k21Record.pins.push(repositoryPin(deletionRepository, deletionRepositoryName));
    k21Record.evidence_inputs.push({
        path: ownerDeletionAnnexPath,
        sha256: hashFile(ownerDeletionAnnexPath),
        purpose: "structural owner-precut deletion annex",
        class: "generated",
    });
    k21Record.delivery.deleted_paths = [{ repository: deletionRepositoryName, path: "src/obsolete-surface.ts" }];
    k21Record.terminal_disposition.pruned = ["ObsoleteSurface fixture module"];
    k21Record.terminal_disposition.deletions = [{
        decision_id: ownerDecision.decision_id,
        decision_hash: ownerDecision.decision_hash,
        file_effects: {
            deleted: ownerDecision.file_effects.deleted.map(({ path }) => ({ repository: deletionRepositoryName, path })),
            modified: ownerDecision.file_effects.modified.map(({ path }) => ({ repository: deletionRepositoryName, path })),
        },
    }];
    k21Record.annexes["deletion-judgment"] = deletionAnnexBinding("K21", "owner-precut", ownerDeletionAnnexPath, ownerDeletionAnnex);
    refreshImplementationChallenge(k21Record, "structural-k21-owner");
    const k21Structural = persistReturn("structural-k21-owner", k21Record);
    const k21ScopeBinding = dependencyBinding(k21Structural.path, k21Structural.record);
    const k22tStructural = makeStructuralStub("K22T", [k21ScopeBinding], "k22t-owner-history");
    const k24Structural = makeStructuralStub("K24", [k22tStructural.binding], "k24-owner-history");

    for (const waveId of contracts.get("C00U").contract.dependencies) {
        if (waveId !== "K24" && !structuralStubs.has(waveId)) makeStructuralStub(waveId);
    }
    const c00uStructuralDependencies = contracts.get("C00U").contract.dependencies
        .map((waveId) => waveId === "K24" ? k24Structural.binding : structuralStubs.get(waveId).binding)
        .sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id));
    const c00uCompleteStructural = baseRecord(
        "C00U",
        gateReceipt("C00U", "structural-c00u-complete"),
        c00uStructuralDependencies,
    );
    c00uCompleteStructural.consumers = applicableConsumers();
    c00uCompleteStructural.annexes["consumer-universe"] = {
        ...c00uGreenFixture.annex,
        baseline: c00uBaseline,
    };
    const c00uCompleteStructuralResult = run(
        "structural-c00u-complete",
        c00uCompleteStructural,
        ["--offline"],
        {},
        consumerReturnMode.validatorPath,
    );
    expectStructuralConsumerReturnAccepted(
        "fully composed C00U COMPLETE",
        c00uCompleteStructuralResult,
        c00uCompleteStructural,
        true,
    );

    const c05GreenFixture = consumerReturnMode.resolve({
        name: "c05-complete-universe",
        waveId: "C05",
    });
    const c05Baseline = {
        applicability: "applicable",
        c00u_return_path: c00uCompleteResult.path,
        c00u_return_file_sha256: hashFile(c00uCompleteResult.path),
        c00u_return_hash: c00uComplete.return_hash,
        c00u_receipt_hash: c00uGreenFixture.annex.receipt_hash,
        c00u_epoch_sha256: c00uGreenFixture.annex.epoch.epoch_sha256,
        roots: [],
        edges: [],
        delta_sha256: sha256(canonicalize({ roots: [], edges: [] })),
    };
    const c05GreenAnnex = { ...c05GreenFixture.annex, baseline: c05Baseline };
    const c05GreenAnnexErrors = validateJsonSchema(
        c05GreenAnnex,
        returnSchema.$defs.consumerUniverseAnnex,
        returnSchema,
    );
    if (c05GreenAnnexErrors.length) {
        failures.push(`C05 dependency-green consumer annex was rejected: ${c05GreenAnnexErrors.join("; ")}`);
    } else consumerReturnSchemaControls += 1;

    const c05GreenGate = gateReceipt("C05", "c05-consumer-green");
    const c05Green = baseRecord("C05", c05GreenGate);
    c05Green.consumers = applicableConsumers();
    c05Green.annexes["consumer-universe"] = {
        ...c05GreenFixture.annex,
        baseline: notApplicable("C05 baseline is deliberately absent in this isolated live-replay control"),
    };
    refreshImplementationChallenge(c05Green, "c05-consumer-green");
    const c05GreenResult = run("c05-consumer-green", c05Green, [], {}, consumerReturnMode.validatorPath);
    expectOnlyFailures("C05 dependency-green live receipt", c05GreenResult, [
        c05ExpectedDependencyFailure,
        "/annexes/consumer-universe/baseline: C05 must bind and diff its exact C00U predecessor",
        "/annexes/deletion-judgment: required for designated deletion owners, PRUNE, C05, and C10",
    ]);

    for (const waveId of contracts.get("C05").contract.dependencies) {
        if (waveId !== "C00U" && !structuralStubs.has(waveId)) makeStructuralStub(waveId);
    }
    const c00uStructuralBinding = dependencyBinding(c00uCompleteStructuralResult.path, c00uCompleteStructural);
    const c05StructuralDependencies = contracts.get("C05").contract.dependencies
        .map((waveId) => waveId === "C00U" ? c00uStructuralBinding : structuralStubs.get(waveId).binding)
        .sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id));
    const c05StructuralBaseline = {
        applicability: "applicable",
        c00u_return_path: c00uCompleteStructuralResult.path,
        c00u_return_file_sha256: hashFile(c00uCompleteStructuralResult.path),
        c00u_return_hash: c00uCompleteStructural.return_hash,
        c00u_receipt_hash: c00uGreenFixture.annex.receipt_hash,
        c00u_epoch_sha256: c00uGreenFixture.annex.epoch.epoch_sha256,
        roots: [],
        edges: [],
        delta_sha256: sha256(canonicalize({ roots: [], edges: [] })),
    };
    const c05OwnerDecision = structuredClone(ownerDecision);
    c05OwnerDecision.origin = { kind: "ancestor-return", owner_return_hash: k21Structural.record.return_hash };
    const c05DeletionAnnex = finalizeDeletionAnnex({
        schema: "vnext-deletion-judgment/1",
        phase: "c05-rehearsal",
        wave_id: "C05",
        consumer_scan: deletionConsumerScan(c05GreenFixture.annex, "c05-rehearsal"),
        truth_receipts: [structuredClone(truthReference)],
        delivery_deleted: [{ root_id: "value", path: "src/obsolete-surface.ts" }],
        disposition_deletions: [{ decision_id: c05OwnerDecision.decision_id, file_effects: structuredClone(c05OwnerDecision.file_effects) }],
        ancestor_returns: [deletionReturnBinding(k21Structural.path, k21Structural.record)],
        decisions: [c05OwnerDecision],
        c10_removed_surfaces: [],
        annex_hash: "",
    });
    const c05DeletionAnnexPath = join(directory, "structural-c05-deletion-annex.json");
    writeCanonical(c05DeletionAnnexPath, c05DeletionAnnex);
    const c05Structural = baseRecord(
        "C05",
        gateReceipt("C05", "structural-c05-complete"),
        c05StructuralDependencies,
    );
    c05Structural.pins.push(repositoryPin(deletionRepository, deletionRepositoryName));
    c05Structural.consumers = applicableConsumers();
    c05Structural.annexes["consumer-universe"] = {
        ...c05GreenFixture.annex,
        baseline: c05StructuralBaseline,
    };
    c05Structural.evidence_inputs.push({
        path: c05DeletionAnnexPath,
        sha256: hashFile(c05DeletionAnnexPath),
        purpose: "structural C05 deletion rehearsal annex",
        class: "generated",
    });
    c05Structural.delivery.deleted_paths = [{ repository: deletionRepositoryName, path: "src/obsolete-surface.ts" }];
    c05Structural.terminal_disposition.deletions = [{
        decision_id: c05OwnerDecision.decision_id,
        decision_hash: c05OwnerDecision.decision_hash,
        file_effects: {
            deleted: c05OwnerDecision.file_effects.deleted.map(({ path }) => ({ repository: deletionRepositoryName, path })),
            modified: c05OwnerDecision.file_effects.modified.map(({ path }) => ({ repository: deletionRepositoryName, path })),
        },
    }];
    c05Structural.annexes["deletion-judgment"] = deletionAnnexBinding(
        "C05",
        "c05-rehearsal",
        c05DeletionAnnexPath,
        c05DeletionAnnex,
    );
    refreshImplementationChallenge(c05Structural, "structural-c05-complete");
    const c05StructuralResult = run(
        "structural-c05-complete",
        c05Structural,
        ["--offline"],
        {},
        consumerReturnMode.validatorPath,
    );
    expectStructuralConsumerReturnAccepted(
        "fully composed C05 with real deletion rehearsal",
        c05StructuralResult,
        c05Structural,
        true,
    );

    const excludedAvailableRootPath = join(consumerReturnMode.constellation.constellationRoot, "atlas-stale");
    const excludedAvailableEvidencePath = join(excludedAvailableRootPath, "fixture-consumer-evidence.txt");
    mkdirSync(excludedAvailableRootPath, { recursive: true });
    writeFileSync(excludedAvailableEvidencePath, "isolated atlas-stale excluded consumer-universe evidence\n");
    execFileSync("git", ["-C", excludedAvailableRootPath, "init", "--initial-branch=fixture-atlas-stale"]);
    execFileSync("git", ["-C", excludedAvailableRootPath, "config", "user.name", "Consumer Fixture"]);
    execFileSync("git", ["-C", excludedAvailableRootPath, "config", "user.email", "consumer-fixture@example.invalid"]);
    execFileSync("git", ["-C", excludedAvailableRootPath, "add", "."]);
    execFileSync("git", ["-C", excludedAvailableRootPath, "commit", "-m", "fixture atlas-stale evidence"]);
    const incomingEdgePath = join(consumerReturnMode.constellation.roots["atlas-active"], "incoming-bbnf.ts");
    writeFileSync(incomingEdgePath, 'import { grammar } from "@mkbabb/bbnf-lang";\nexport const fixtureGrammar = grammar;\n');
    const unavailableCondition = "bbnf-lang checkout is restored:unavailable:C05:then C00U repeats the bounded census";
    const slidesUnavailableCondition = "the distinct Slides-K checkout is restored and its source edges are rescanned";
    const c00uBlockingFixture = consumerReturnMode.resolve({
        name: "c00u-blocked-universe",
        waveId: "C00U",
        expectedExit: 2,
        requireResolvable: false,
        edges: [
            {
                id: "atlas-active:bbnf-lang-runtime",
                source: "atlas-active",
                target: "bbnf-lang",
                package: "@mkbabb/bbnf-lang",
                specifier: "@mkbabb/bbnf-lang",
                kind: "runtime",
                ownerWave: "C00U",
                evidencePaths: [incomingEdgePath],
                disposition: {
                    status: "unavailable",
                    reason: "the required internal target checkout is unavailable",
                    retrigger: { wave_id: "C00U", condition: unavailableCondition },
                    evidencePaths: [consumerReturnMode.constellation.evidencePaths["atlas-active"]],
                },
            },
            {
                id: "slides-k:keyframes-runtime",
                source: "slides-k",
                target: "keyframes",
                package: "@mkbabb/keyframes.js",
                specifier: "@mkbabb/keyframes.js",
                kind: "runtime",
                ownerWave: "C02D",
                evidencePaths: [consumerReturnMode.constellation.evidencePaths["slides-k"]],
                disposition: {
                    status: "unavailable",
                    reason: "the source checkout required to observe the Slides-K edge is unavailable",
                    retrigger: { wave_id: "C02D", condition: slidesUnavailableCondition },
                    evidencePaths: [consumerReturnMode.constellation.evidencePaths["atlas-active"]],
                },
            },
        ],
        scenario({ universe, fixtureRoot, roots, evidencePaths, evidence: fixtureEvidence }) {
            const stableEvidence = fixtureEvidence(
                evidencePaths["atlas-active"],
                "available sibling proves the bounded unavailable-root observation",
            );
            for (const [rootId, reason, retrigger] of [
                ["bbnf-lang", "the mandatory bbnf-lang checkout is unavailable", { wave_id: "C00U", condition: unavailableCondition }],
                ["slides-k", "the distinct mandatory Slides-K checkout is unavailable", { wave_id: "C02D", condition: slidesUnavailableCondition }],
            ]) {
                const unavailableRoot = universe.roots.find(({ id }) => id === rootId);
                universe.discovery.evidence = universe.discovery.evidence.filter(({ path }) => path !== evidencePaths[rootId]);
                for (const observedSet of Object.values(unavailableRoot.provenance)) observedSet.evidence = [stableEvidence];
                unavailableRoot.disposition = {
                    status: "unavailable",
                    reason,
                    evidence: [stableEvidence],
                    retrigger,
                };
            }
            const excludedIdentity = resolveGitIdentity(excludedAvailableRootPath);
            const excludedEvidence = fixtureEvidence(
                excludedAvailableEvidencePath,
                "available excluded-root evidence",
            );
            universe.discovery.evidence.push(excludedEvidence);
            universe.roots.push({
                id: "atlas-stale",
                repository: "atlas-stale-fixture",
                path: excludedIdentity.canonical_realpath,
                canonical_realpath: excludedIdentity.canonical_realpath,
                branch: excludedIdentity.branch,
                head: excludedIdentity.head,
                dirty_sha256: excludedIdentity.dirty_sha256,
                provenance: {
                    origins: { values: excludedIdentity.origins, evidence: [excludedEvidence] },
                    worktrees: { values: excludedIdentity.worktrees, evidence: [excludedEvidence] },
                    deploy_roots: { values: [], evidence: [excludedEvidence] },
                },
                disposition: {
                    status: "excluded",
                    reason: "the observed stale Atlas checkout is retained as an explicitly excluded available root",
                    evidence: [excludedEvidence],
                },
            });
            universe.roots.sort((left, right) => compareCanonicalText(left.id, right.id));
            const unavailableSourceEdge = universe.edges.find(({ id }) => id === "slides-k:keyframes-runtime");
            unavailableSourceEdge.evidence = [stableEvidence];
            unavailableSourceEdge.disposition.evidence = [stableEvidence];
            renameSync(roots["bbnf-lang"], resolve(fixtureRoot, "unavailable-bbnf-lang"));
            renameSync(roots["slides-k"], resolve(fixtureRoot, "unavailable-slides-k"));
        },
    });
    const blockingRootsById = new Map(c00uBlockingFixture.receipt.roots.map((root) => [root.id, root]));
    const blockingEdgesById = new Map(c00uBlockingFixture.receipt.edges.map((edge) => [edge.id, edge]));
    const blockingRootCounts = Object.groupBy(c00uBlockingFixture.receipt.roots, ({ status }) => status);
    if (blockingRootsById.get("slides-k")?.status !== "unavailable"
        || blockingRootsById.get("atlas-stale")?.status !== "excluded"
        || blockingEdgesById.get("slides-k:keyframes-runtime")?.status !== "unavailable"
        || blockingEdgesById.get("slides-k:keyframes-runtime")?.observations.length !== 0
        || blockingEdgesById.get("atlas-active:bbnf-lang-runtime")?.status !== "unavailable"
        || blockingEdgesById.get("atlas-active:bbnf-lang-runtime")?.observations.length !== 1
        || c00uBlockingFixture.receipt.roots.length !== 16
        || blockingRootCounts.included?.length !== 13
        || blockingRootCounts.excluded?.length !== 1
        || blockingRootCounts.unavailable?.length !== 2
        || c00uBlockingFixture.receipt.edges.length !== 2
        || c00uBlockingFixture.receipt.edges.some(({ status }) => status !== "unavailable")
        || c00uBlockingFixture.receipt.edges.reduce((total, edge) => total + edge.observations.length, 0) !== 1
        || c00uBlockingFixture.receipt.blockers.length !== 4) {
        failures.push("consumer universal-return matrix lost Slides-K unavailable, excluded available-root, unavailable-source, or unavailable-target coverage");
    }
    const blockerOwners = new Map();
    for (const [kind, rows] of [["root", c00uBlockingFixture.validation.universe.roots], ["edge", c00uBlockingFixture.validation.universe.edges]]) {
        for (const row of rows.filter(({ disposition }) => disposition.status === "unavailable")) {
            blockerOwners.set(
                `${kind}:${row.id}:unavailable:${row.disposition.retrigger.wave_id}:${row.disposition.retrigger.condition}`,
                row.disposition.retrigger.wave_id,
            );
        }
    }
    const blockerRemainder = (finding) => ({ finding, owner: blockerOwners.get(finding), blocking: true });
    const c00uBlockedGate = gateReceipt("C00U", "c00u-consumer-blocked");
    const c00uBlocked = baseRecord("C00U", c00uBlockedGate);
    c00uBlocked.status = "BLOCKED";
    c00uBlocked.consumers = applicableConsumers();
    c00uBlocked.routed_remainder = c00uBlockingFixture.receipt.blockers.map(blockerRemainder);
    c00uBlocked.annexes["consumer-universe"] = {
        ...c00uBlockingFixture.annex,
        baseline: c00uBaseline,
    };
    const c00uBlockedResult = run(
        "c00u-consumer-blocked",
        c00uBlocked,
        [],
        {},
        consumerReturnMode.validatorPath,
    );
    expectOnlyFailures("C00U BLOCKED consumer return", c00uBlockedResult, [c00uExpectedDependencyFailure]);

    const c00uBlockedStructural = baseRecord(
        "C00U",
        gateReceipt("C00U", "structural-c00u-blocked"),
        c00uStructuralDependencies,
    );
    c00uBlockedStructural.status = "BLOCKED";
    c00uBlockedStructural.consumers = applicableConsumers();
    c00uBlockedStructural.routed_remainder = c00uBlockingFixture.receipt.blockers.map(blockerRemainder);
    c00uBlockedStructural.annexes["consumer-universe"] = {
        ...c00uBlockingFixture.annex,
        baseline: c00uBaseline,
    };
    const c00uBlockedStructuralResult = run(
        "structural-c00u-blocked",
        c00uBlockedStructural,
        ["--offline"],
        {},
        consumerReturnMode.validatorPath,
    );
    expectStructuralConsumerReturnAccepted(
        "fully composed C00U BLOCKED",
        c00uBlockedStructuralResult,
        c00uBlockedStructural,
        false,
    );

    const c00uEmptyBlockers = structuredClone(c00uBlocked);
    c00uEmptyBlockers.annexes["consumer-universe"].blockers = [];
    c00uEmptyBlockers.routed_remainder = [];
    expectConsumerReturnRejected(
        "C00U empty blockers",
        run("c00u-consumer-empty-blockers", c00uEmptyBlockers, [], {}, consumerReturnMode.validatorPath),
        "/annexes/consumer-universe: C00U BLOCKED requires resolvable false and nonempty blockers",
    );

    const c00uMismatchedBlockers = structuredClone(c00uBlocked);
    c00uMismatchedBlockers.annexes["consumer-universe"].blockers[0] += ":forged";
    expectConsumerReturnRejected(
        "C00U mismatched blockers",
        run("c00u-consumer-mismatched-blockers", c00uMismatchedBlockers, [], {}, consumerReturnMode.validatorPath),
        "/annexes/consumer-universe: fields must exactly project the verified receipt and canonical authority",
    );

    const c00uMismatchedRemainder = structuredClone(c00uBlocked);
    c00uMismatchedRemainder.routed_remainder[0].finding += ":forged";
    expectConsumerReturnRejected(
        "C00U mismatched routed remainder",
        run("c00u-consumer-mismatched-remainder", c00uMismatchedRemainder, [], {}, consumerReturnMode.validatorPath),
        "/routed_remainder: C00U BLOCKED must exactly join every typed unavailable receipt blocker",
    );

    const c00uExitTwoOutsideBlocked = structuredClone(c00uBlocked);
    c00uExitTwoOutsideBlocked.status = "COMPLETE";
    c00uExitTwoOutsideBlocked.routed_remainder = [];
    expectConsumerReturnRejected(
        "resolver exit 2 outside C00U BLOCKED",
        run("c00u-consumer-exit-two-outside-blocked", c00uExitTwoOutsideBlocked, [], {}, consumerReturnMode.validatorPath),
        "/annexes/consumer-universe: C00U COMPLETE requires resolvable true and empty blockers",
    );

    const c05ExitTwoGate = gateReceipt("C05", "c05-consumer-exit-two");
    const c05ExitTwo = baseRecord("C05", c05ExitTwoGate);
    c05ExitTwo.consumers = applicableConsumers();
    c05ExitTwo.annexes["consumer-universe"] = {
        ...c00uBlockingFixture.annex,
        wave_id: "C05",
        baseline: c05Baseline,
    };
    refreshImplementationChallenge(c05ExitTwo, "c05-consumer-exit-two");
    expectConsumerReturnRejected(
        "C05 rejects exit-2 receipt",
        run("c05-consumer-exit-two", c05ExitTwo, [], {}, consumerReturnMode.validatorPath),
        "/annexes/consumer-universe: C05 requires resolvable true and empty blockers",
    );

    const c05BlockedPredecessorGate = gateReceipt("C05", "c05-blocked-c00u-predecessor");
    const c05BlockedPredecessor = baseRecord("C05", c05BlockedPredecessorGate);
    c05BlockedPredecessor.consumers = applicableConsumers();
    c05BlockedPredecessor.scope.dependency_returns = [dependencyBinding(c00uBlockedResult.path, c00uBlocked)];
    expectConsumerReturnRejected(
        "C05 blocked C00U predecessor",
        run("c05-blocked-c00u-predecessor", c05BlockedPredecessor, [], {}, consumerReturnMode.validatorPath),
        '/scope/dependency_returns/0/return/status: static predecessor C00U -> C05 requires ["COMPLETE"]; found BLOCKED',
    );

    const c05Gate = gateReceipt("C05");
    const c05MissingDeletion = baseRecord("C05", c05Gate);
    expectRejected("C05 missing deletion rehearsal", run("c05-missing-deletion-rehearsal", c05MissingDeletion), "/annexes/deletion-judgment: required");

    const k21Gate = gateReceipt("K21");
    const k21PruneWithoutDecision = baseRecord("K21", k21Gate);
    k21PruneWithoutDecision.status = "PRUNE";
    k21PruneWithoutDecision.terminal_disposition.pruned = ["modified-only retired export"];
    expectRejected("PRUNE without deletion decision", run("prune-without-decision", k21PruneWithoutDecision), "PRUNE requires at least one exact deletion decision");

    const k21UnvalidatedModifiedOnly = structuredClone(k21PruneWithoutDecision);
    k21UnvalidatedModifiedOnly.terminal_disposition.deletions = [{
        decision_id: "modified-only-export",
        decision_hash: "0".repeat(64),
        file_effects: { deleted: [], modified: [{ repository: "fixture", path: "src/exports.ts" }] },
    }];
    expectRejected("unvalidated modified-only PRUNE", run("unvalidated-modified-only-prune", k21UnvalidatedModifiedOnly), "/annexes/deletion-judgment: required");

    const mismatchedExecution = rewriteReceipt("mismatched-execution", p00Gate, (receipt) => {
        receipt.execution.command_token = "node";
        receipt.execution.args = ["unrelated.mjs"];
    });
    expectRejected("mismatched execution", run("mismatched-execution", baseRecord("P00", mismatchedExecution)), "do not exactly realize the canonical subject");

    const forgedStdout = rewriteReceipt("forged-stdout", p00Gate, (receipt) => {
        receipt.execution.stdout_sha256 = "0".repeat(64);
    });
    expectRejected("forged stdout", run("forged-stdout", baseRecord("P00", forgedStdout)), "receipt/execution/stdout");

    const forgedExecutable = rewriteReceipt("forged-executable", p00Gate, (receipt) => {
        receipt.execution.executable_sha256 = "0".repeat(64);
    });
    expectRejected("forged executable", run("forged-executable", baseRecord("P00", forgedExecutable)), "executable_sha256");

    const leakedEnvironmentReceipt = rewriteReceipt("leaked-proof-environment", p00Gate, (receipt) => {
        receipt.execution.environment_sha256 = sha256(canonicalize({
            ...liveGateEnvironment(),
            VNEXT_PROOF_FLAG_LEAK: "smuggled",
        }));
    });
    expectRejected(
        "leaked proof environment",
        run("leaked-proof-environment", baseRecord("P00", leakedEnvironmentReceipt)),
        "execution/environment_sha256",
    );

    const wrongChallengeReceiptRecord = structuredClone(p00);
    const wrongChallengeReceipt = rewriteReceipt("wrong-gate-challenge-hash", {
        receipt: parseJsonStrict(readFileSync(p00.gates[0].receipt.path)),
    }, (receipt) => {
        receipt.challenge_sha256 = "f".repeat(64);
    });
    wrongChallengeReceiptRecord.gates[0].receipt = wrongChallengeReceipt.binding;
    expectRejected(
        "gate receipt wrong challenge hash",
        run("wrong-gate-challenge-hash", wrongChallengeReceiptRecord),
        "/receipt/challenge_sha256: expected exact implementation challenge",
    );

    const missingChallengeReceiptRecord = structuredClone(p00);
    const missingChallengeReceipt = rewriteReceipt("missing-gate-challenge-hash", {
        receipt: parseJsonStrict(readFileSync(p00.gates[0].receipt.path)),
    }, (receipt) => {
        delete receipt.challenge_sha256;
    });
    missingChallengeReceiptRecord.gates[0].receipt = missingChallengeReceipt.binding;
    expectRejected(
        "gate receipt missing challenge hash",
        run("missing-gate-challenge-hash", missingChallengeReceiptRecord),
        "/receipt/challenge_sha256: required property missing",
    );

    const forgedManifest = rewriteReceipt("forged-manifest", p00Gate, (receipt) => {
        receipt.proof_manifest.sha256 = "0".repeat(64);
    });
    expectRejected("forged manifest", run("forged-manifest", baseRecord("P00", forgedManifest)), "proof_manifest");

    const p00ManifestPath = join(repo, "test", "proof", "p00", "manifest.json");
    const originalP00Manifest = readFileSync(p00ManifestPath, "utf8");
    const wrongP00Manifest = JSON.parse(originalP00Manifest);
    wrongP00Manifest.seed_requirements = [];
    writeJson(p00ManifestPath, wrongP00Manifest);
    const unboundSeedManifest = rewriteReceipt("unbound-seed-manifest", p00Gate, (receipt) => {
        receipt.proof_manifest.sha256 = hashFile(p00ManifestPath);
        receipt.execution.repository_state_sha256 = repositoryStateSha256(repo);
    });
    const unboundSeedRecord = baseRecord("P00", unboundSeedManifest);
    expectRejected("unbound proof-manifest seed projection", run("unbound-seed-manifest", unboundSeedRecord), "proof_manifest/seed_requirements");
    writeFileSync(p00ManifestPath, originalP00Manifest);

    const v00aGate = gateReceipt("V00A");
    const v00a = finalize(baseRecord("V00A", v00aGate));
    const v00aPath = join(directory, "v00a.return.json");
    writeJson(v00aPath, v00a);
    const v00bGate = gateReceipt("V00B");
    const missingDesignatedOwnerAnnex = baseRecord("V00B", v00bGate, [dependencyBinding(v00aPath, v00a)]);
    expectRejected("designated owner missing deletion annex", run("designated-owner-missing-deletion-annex", missingDesignatedOwnerAnnex), "required for designated deletion owners");

    const g00Gate = gateReceipt("G00");
    const g00 = finalize(baseRecord("G00", g00Gate));
    const g00Path = join(directory, "g00.return.json");
    writeJson(g00Path, g00);
    const g01Gate = gateReceipt("G01");
    const g01 = baseRecord("G01", g01Gate, [dependencyBinding(g00Path, g00)]);
    const validDependency = run("valid-dependency", structuredClone(g01));
    if (validDependency.result.status !== 0) failures.push(`valid direct predecessor rejected: ${validDependency.result.stderr}`);

    const challengeFixture = () => baseRecord("G01", g01Gate, [dependencyBinding(g00Path, g00)]);
    const missingChallenge = challengeFixture();
    delete missingChallenge.annexes["implementation-challenge"];
    expectRejected("missing implementation challenge", run("missing-implementation-challenge", missingChallenge), "/annexes/implementation-challenge");

    const duplicateChallengeActor = challengeFixture();
    duplicateChallengeActor.annexes["implementation-challenge"].critics[1].session_id
        = duplicateChallengeActor.annexes["implementation-challenge"].critics[0].session_id;
    expectRejected("duplicate challenge actor", run("duplicate-challenge-actor", duplicateChallengeActor), "all three session IDs must be distinct");

    const missingChallengeAxis = challengeFixture();
    delete missingChallengeAxis.annexes["implementation-challenge"].critics[0].axes.feature_behavior;
    expectRejected("missing challenge axis", run("missing-challenge-axis", missingChallengeAxis), "/axes/feature_behavior: mandatory gestalt axis requires evidence");

    const staleChallengeAxisEvidence = challengeFixture();
    staleChallengeAxisEvidence.annexes["implementation-challenge"].critics[0].axes.feature_behavior[0].sha256 = "0".repeat(64);
    expectRejected("stale challenge axis evidence", run("stale-challenge-axis-evidence", staleChallengeAxisEvidence), "/axes/feature_behavior/0: evidence hash");

    const wrongChallengeTier = challengeFixture();
    const wrongTierActor = wrongChallengeTier.annexes["implementation-challenge"].critics[0];
    const wrongTierRecords = readJsonl(wrongTierActor.session_jsonl.path);
    wrongTierRecords.find(({ type }) => type === "turn_context").payload.model = "gpt-5.6-terra";
    writeJsonl(wrongTierActor.session_jsonl.path, wrongTierRecords);
    wrongTierActor.session_jsonl.sha256 = hashFile(wrongTierActor.session_jsonl.path);
    expectRejected("wrong challenge tier", run("wrong-challenge-tier", wrongChallengeTier), "expected exactly one declared gpt-5.6-sol ultra turn");

    const unauthoredChallengeReport = challengeFixture();
    const unauthoredActor = unauthoredChallengeReport.annexes["implementation-challenge"].critics[0];
    const unauthoredRecords = readJsonl(unauthoredActor.session_jsonl.path);
    unauthoredRecords.find(({ type, payload }) => type === "response_item" && payload?.phase === "final_answer")
        .payload.content[0].text = "coordinator-authored substitute\n";
    writeJsonl(unauthoredActor.session_jsonl.path, unauthoredRecords);
    unauthoredActor.session_jsonl.sha256 = hashFile(unauthoredActor.session_jsonl.path);
    expectRejected("unauthored challenge report", run("unauthored-challenge-report", unauthoredChallengeReport), "persisted report must be byte-identical");

    const staleChallengeSessionHash = challengeFixture();
    staleChallengeSessionHash.annexes["implementation-challenge"].critics[0].session_jsonl.sha256 = "0".repeat(64);
    expectRejected("stale challenge session hash", run("stale-challenge-session-hash", staleChallengeSessionHash), "/session_jsonl: evidence hash");

    const staleChallengeReportHash = challengeFixture();
    staleChallengeReportHash.annexes["implementation-challenge"].critics[0].report.sha256 = "0".repeat(64);
    expectRejected("stale challenge report hash", run("stale-challenge-report-hash", staleChallengeReportHash), "/report: evidence hash");

    const tokenOnlyPrompt = challengeFixture();
    const tokenPromptActor = tokenOnlyPrompt.annexes["implementation-challenge"].critics[0];
    const tokenPromptRecords = readJsonl(tokenPromptActor.session_jsonl.path);
    tokenPromptRecords.find(({ type, payload }) => type === "response_item" && payload?.role === "user")
        .payload.content[0].text = "ASSUME-WAVE-WRONG bound-token-only";
    writeJsonl(tokenPromptActor.session_jsonl.path, tokenPromptRecords);
    tokenPromptActor.session_jsonl.sha256 = hashFile(tokenPromptActor.session_jsonl.path);
    expectRejected("token-only challenge prompt", run("token-only-challenge-prompt", tokenOnlyPrompt), "user prompt must bind the exact wave/contract/dependency/state epoch");

    const futureReceiptPrompt = challengeFixture();
    const futureReceiptActor = futureReceiptPrompt.annexes["implementation-challenge"].critics[0];
    const futureReceiptRecords = readJsonl(futureReceiptActor.session_jsonl.path);
    futureReceiptRecords.find(({ type, payload }) => type === "response_item" && payload?.role === "user")
        .payload.content[0].text += ` FUTURE-RECEIPT ${futureReceiptPrompt.gates[0].receipt.path}`;
    writeJsonl(futureReceiptActor.session_jsonl.path, futureReceiptRecords);
    futureReceiptActor.session_jsonl.sha256 = hashFile(futureReceiptActor.session_jsonl.path);
    resealRecordGate(futureReceiptPrompt, "future-receipt-prompt");
    expectRejected(
        "pre-gate prompt contains future receipt",
        run("future-receipt-prompt", futureReceiptPrompt),
        "user prompt must bind the exact wave/contract/dependency/state epoch",
    );

    const attachedChallengePrompt = challengeFixture();
    const attachedPromptActor = attachedChallengePrompt.annexes["implementation-challenge"].critics[0];
    const attachedPromptRecords = readJsonl(attachedPromptActor.session_jsonl.path);
    attachedPromptRecords.find(({ type, payload }) => type === "response_item" && payload?.role === "user")
        .payload.content.push({ type: "input_file", path: evidencePath });
    writeJsonl(attachedPromptActor.session_jsonl.path, attachedPromptRecords);
    attachedPromptActor.session_jsonl.sha256 = hashFile(attachedPromptActor.session_jsonl.path);
    resealRecordGate(attachedChallengePrompt, "attached-challenge-prompt");
    expectRejected(
        "challenge prompt attachment",
        run("challenge-prompt-attachment", attachedChallengePrompt),
        "user prompt must be exactly one input_text block with no attachment",
    );

    const peerMaterialChallenge = challengeFixture();
    const peerMaterialActors = peerMaterialChallenge.annexes["implementation-challenge"].critics;
    const peerMaterialRecords = readJsonl(peerMaterialActors[0].session_jsonl.path);
    peerMaterialRecords.splice(-2, 0, {
        timestamp: peerMaterialRecords.at(-2).timestamp,
        type: "event_msg",
        payload: {
            type: "tool_result",
            peer_path: peerMaterialActors[1].report.path,
            peer_content: readFileSync(peerMaterialActors[1].report.path, "utf8"),
        },
    });
    writeJsonl(peerMaterialActors[0].session_jsonl.path, peerMaterialRecords);
    peerMaterialActors[0].session_jsonl.sha256 = hashFile(peerMaterialActors[0].session_jsonl.path);
    resealRecordGate(peerMaterialChallenge, "peer-material-challenge");
    expectRejected(
        "critic peer material attachment",
        run("critic-peer-material-attachment", peerMaterialChallenge),
        "hostile critic accessed sibling session or report material",
    );

    const tokenOnlyReport = challengeFixture();
    const tokenReportActor = tokenOnlyReport.annexes["implementation-challenge"].adjudicator;
    const originalTokenReport = readFileSync(tokenReportActor.report.path, "utf8");
    const tokenLine = originalTokenReport.split("\n").find((line) => line.startsWith("VNEXT-CHALLENGE-INPUT "));
    const tokenReportText = `${tokenLine}\n`;
    writeFileSync(tokenReportActor.report.path, tokenReportText);
    tokenReportActor.report.sha256 = hashFile(tokenReportActor.report.path);
    const tokenReportRecords = readJsonl(tokenReportActor.session_jsonl.path);
    tokenReportRecords.find(({ type, payload }) => type === "response_item" && payload?.phase === "final_answer")
        .payload.content[0].text = tokenReportText;
    tokenReportRecords.find(({ type, payload }) => type === "event_msg" && payload?.type === "task_complete")
        .payload.last_agent_message = tokenReportText;
    writeJsonl(tokenReportActor.session_jsonl.path, tokenReportRecords);
    tokenReportActor.session_jsonl.sha256 = hashFile(tokenReportActor.session_jsonl.path);
    expectRejected("token-only challenge report", run("token-only-challenge-report", tokenOnlyReport), "canonical challenge token cannot replace substantive terminal analysis");

    const staleChallengeState = challengeFixture();
    staleChallengeState.annexes["implementation-challenge"].repository_states[0].sha256 = "0".repeat(64);
    expectRejected("stale challenge state", run("stale-challenge-state", staleChallengeState), "must equal the exact sorted final live pin states");

    const reorderedChallengeInputs = challengeFixture();
    reorderedChallengeInputs.annexes["implementation-challenge"].adjudicator.input_report_sha256.reverse();
    expectRejected("reordered challenge inputs", run("reordered-challenge-inputs", reorderedChallengeInputs), "must bind critic_a then critic_b report hashes");

    const unresolvedChallenge = challengeFixture();
    unresolvedChallenge.annexes["implementation-challenge"].critics[0].unresolved_findings.push("feature behavior remains incongruous");
    expectRejected("unresolved challenge finding", run("unresolved-challenge-finding", unresolvedChallenge), "terminal return requires two clean critics, ratification, and zero unresolved findings");

    const prematureAdjudication = challengeFixture();
    const prematureActor = prematureAdjudication.annexes["implementation-challenge"].adjudicator;
    const prematureRecords = readJsonl(prematureActor.session_jsonl.path);
    const prematureStart = Date.parse(g01Gate.receipt.started_at) - 9000;
    prematureRecords.forEach((record, index) => { record.timestamp = new Date(prematureStart + index * 100).toISOString(); });
    writeJsonl(prematureActor.session_jsonl.path, prematureRecords);
    prematureActor.session_jsonl.sha256 = hashFile(prematureActor.session_jsonl.path);
    expectRejected("premature challenge adjudication", run("premature-challenge-adjudication", prematureAdjudication), "must start after both critics complete");

    const equalBoundaryAdjudication = challengeFixture();
    const equalBoundaryChallenge = equalBoundaryAdjudication.annexes["implementation-challenge"];
    const latestCriticCompletion = Math.max(...equalBoundaryChallenge.critics.map((actor) => {
        const records = readJsonl(actor.session_jsonl.path);
        return Date.parse(records.find(({ type, payload }) => type === "event_msg" && payload?.type === "task_complete").timestamp);
    }));
    const equalBoundaryActor = equalBoundaryChallenge.adjudicator;
    const equalBoundaryRecords = readJsonl(equalBoundaryActor.session_jsonl.path);
    const equalBoundaryDelta = latestCriticCompletion - Date.parse(equalBoundaryRecords[0].timestamp);
    equalBoundaryRecords.forEach((record) => {
        record.timestamp = new Date(Date.parse(record.timestamp) + equalBoundaryDelta).toISOString();
    });
    writeJsonl(equalBoundaryActor.session_jsonl.path, equalBoundaryRecords);
    equalBoundaryActor.session_jsonl.sha256 = hashFile(equalBoundaryActor.session_jsonl.path);
    expectRejected("equal-boundary challenge adjudication", run("equal-boundary-challenge-adjudication", equalBoundaryAdjudication), "must start after both critics complete");

    const reorderedChallengeSession = challengeFixture();
    const reorderedActor = reorderedChallengeSession.annexes["implementation-challenge"].critics[0];
    const reorderedRecords = readJsonl(reorderedActor.session_jsonl.path);
    const userIndex = reorderedRecords.findIndex(({ type, payload }) => type === "response_item" && payload?.role === "user");
    const finalIndex = reorderedRecords.findIndex(({ type, payload }) => type === "response_item" && payload?.phase === "final_answer");
    [reorderedRecords[userIndex], reorderedRecords[finalIndex]] = [reorderedRecords[finalIndex], reorderedRecords[userIndex]];
    writeJsonl(reorderedActor.session_jsonl.path, reorderedRecords);
    reorderedActor.session_jsonl.sha256 = hashFile(reorderedActor.session_jsonl.path);
    expectRejected("reordered challenge session", run("reordered-challenge-session", reorderedChallengeSession), "required record order is session_meta, user, turn_context, final, task_complete");

    const equalGateBoundary = challengeFixture();
    const equalGateAdjudicator = equalGateBoundary.annexes["implementation-challenge"].adjudicator;
    const equalGateRecords = readJsonl(equalGateAdjudicator.session_jsonl.path);
    const equalGateCompletion = Date.parse(equalGateRecords.find(({ type, payload }) => type === "event_msg" && payload?.type === "task_complete").timestamp);
    const equalGateReceipt = rewriteReceipt("equal-gate-boundary", {
        receipt: parseJsonStrict(readFileSync(equalGateBoundary.gates[0].receipt.path)),
    }, (receipt) => {
        receipt.started_at = new Date(equalGateCompletion).toISOString();
        receipt.finished_at = new Date(equalGateCompletion + 1000).toISOString();
    });
    equalGateBoundary.gates[0].receipt = equalGateReceipt.binding;
    expectRejected("equal gate boundary", run("equal-gate-boundary", equalGateBoundary), "every hostile review must complete before the acceptance gate starts");

    const missingDependency = structuredClone(g01);
    missingDependency.scope.dependency_returns = [];
    expectRejected("missing dependency", run("missing-dependency", missingDependency), "expected exact direct predecessors G00");

    const staleDependencyFile = structuredClone(g01);
    staleDependencyFile.scope.dependency_returns[0].file_sha256 = "0".repeat(64);
    expectRejected("stale dependency file", run("stale-dependency-file", staleDependencyFile), "/scope/dependency_returns/0: evidence hash");

    const staleDependencyContract = structuredClone(g01);
    staleDependencyContract.scope.dependency_returns[0].wave_contract_sha256 = "0".repeat(64);
    expectRejected("stale dependency contract", run("stale-dependency-contract", staleDependencyContract), "/wave_contract_sha256");

    const c10Gate = gateReceipt("C10");
    const c10 = baseRecord("C10", c10Gate);
    c10.scope.files_intended = ["src/old.ts"];
    c10.scope.files_changed = ["src/old.ts"];
    const deletedPath = { repository: "fixture", path: "src/old.ts" };
    c10.delivery = { source: [], tests: [], exports: [], deleted_paths: [deletedPath], migrations: ["value-001", "fourier-001"] };
    c10.api_contract = apiSection("C10", evidence);
    c10.performance = {
        applicability: "applicable",
        environment: "self-test",
        workload: "self-test",
        warmup: "one",
        samples: 1,
        metrics: ["one"],
        allocation_memory: ["one"],
        bundle_frame_energy: ["one"],
        decision: "self-test",
        evidence: [evidence],
    };
    c10.consumers = {
        applicability: "applicable",
        direct: notApplicable("self-test"),
        peer: notApplicable("self-test"),
        transitive: notApplicable("self-test"),
        casualties: [],
        migrations: [],
        packed_evidence: [evidence],
    };
    c10.terminal_disposition = {
        kept: [],
        pruned: ["legacy surface"],
        deletions: [{
            decision_id: "legacy-surface",
            decision_hash: "0".repeat(64),
            file_effects: { deleted: [deletedPath], modified: [] },
        }],
        refusals: [],
        no_legacy_paths: true,
        standards_compatibility: [],
    };
    const packageRecord = (name, version, peer_dependencies = []) => ({
        name,
        version,
        registry_integrity: `sha512-${"A".repeat(86)}==`,
        tarball_sha512: "0".repeat(128),
        manifest_sha256: "0".repeat(64),
        peer_dependencies,
        evidence: [evidence],
    });
    c10.annexes.release = {
        sequence: ["parse-that", "value", "keyframes", "glass-ui", "value-api", "fourier-api", "consumers", "smoke", "promote", "remove-temp-tag"],
        parse_that: { branch: "unchanged-1.0.0-no-republish", version: "1.0.0", published: false, evidence: [evidence] },
        packages: [
            packageRecord("@mkbabb/value.js", "5.0.0"),
            packageRecord("@mkbabb/keyframes.js", "7.0.0"),
            packageRecord("@mkbabb/glass-ui", "8.0.0", [
                { name: "@mkbabb/value.js", range: "^5.0.0", optional: true },
                { name: "@mkbabb/keyframes.js", range: "^7.0.0", optional: true },
                { name: "vue", range: "^3.5.0", optional: false },
                { name: "tailwindcss", range: "^4.0.0", optional: false },
            ]),
        ],
        api_migrations: [
            { service: "value", migration_id: "value-001", before_schema_sha256: "0".repeat(64), after_schema_sha256: "1".repeat(64), result: "applied", rollback_id: "value-rollback-001", evidence: [evidence] },
            { service: "fourier", migration_id: "fourier-001", before_schema_sha256: "0".repeat(64), after_schema_sha256: "1".repeat(64), result: "applied", rollback_id: "fourier-rollback-001", evidence: [evidence] },
        ],
        removed_surfaces: [{
            decision_id: "legacy-surface",
            decision_hash: "0".repeat(64),
            owner_wave: "K21",
            surface: "legacy surface",
            tombstone: "legacy surface removed",
        }],
        consumers: [{ root: repo, branch: currentBranch(), head: currentHead(), lock_sha256: "0".repeat(64), deployed_versions: ["value@5.0.0"], evidence: [evidence] }],
        smoke: [evidence],
        temporary_tag: { name: "vnext-cut", removed: true, evidence: [evidence] },
        rollback: { boundary: "before promote", procedure: "restore prior tags and schemas", evidence: [evidence] },
        unresolved_waves: [],
        new_contracts_only: true,
    };
    refreshImplementationChallenge(c10, "c10-release-control");
    const c10ReleaseControl = run("c10-release-control", structuredClone(c10));
    const c10ExpectedDependencyFailure = "/scope/dependency_returns: expected exact direct predecessors C09";
    const c10ExpectedDeletionFailure = "/annexes/deletion-judgment: required for designated deletion owners, PRUNE, C05, and C10";
    const c10ExpectedProjectionFailure = "/annexes/release/removed_surfaces: cannot project release removals without a validated C05-origin deletion annex";
    const c10Unexpected = c10ReleaseControl.result.stderr
        .split("\n")
        .filter(Boolean)
        .filter((line) => line !== c10ExpectedDependencyFailure && line !== c10ExpectedDeletionFailure && line !== c10ExpectedProjectionFailure);
    if (c10ReleaseControl.result.status === 0 || c10Unexpected.length) {
        failures.push(`C10 release section did not isolate the deliberately absent predecessor: ${c10ReleaseControl.result.stderr}`);
    } else adversarialRejections += 1;
    const c10MissingRelease = structuredClone(c10);
    delete c10MissingRelease.annexes.release;
    expectRejected("C10 missing release", run("c10-missing-release", c10MissingRelease), "/annexes/release: required for C10");
    const c10WrongDeletionPhase = structuredClone(c10);
    c10WrongDeletionPhase.annexes["deletion-judgment"] = fakeDeletionBinding("C10", "owner-precut");
    expectRejected("C10 wrong deletion phase", run("c10-wrong-deletion-phase", c10WrongDeletionPhase), "C10 requires c10-final");
    const c10SyntheticDelivery = structuredClone(c10);
    c10SyntheticDelivery.delivery.deleted_paths.push({ repository: "fixture", path: "src/synthetic.ts" });
    expectRejected("C10 synthetic delivery deletion", run("c10-synthetic-delivery-deletion", c10SyntheticDelivery), "deleted effects must exactly cover delivery.deleted_paths");
    const c10OverlappingDeletion = structuredClone(c10);
    c10OverlappingDeletion.terminal_disposition.deletions.push({
        decision_id: "second-surface",
        decision_hash: "1".repeat(64),
        file_effects: { deleted: [deletedPath], modified: [] },
    });
    expectRejected("C10 overlapping deletion owners", run("c10-overlapping-deletion-owners", c10OverlappingDeletion), "physical deleted path may belong to exactly one decision");
    const c10ForbiddenPeer = structuredClone(c10);
    c10ForbiddenPeer.annexes.release.packages.find(({ name }) => name === "@mkbabb/glass-ui").peer_dependencies.push({ name: "reka-ui", range: "^2.0.0", optional: false });
    expectRejected("C10 forbidden peer", run("c10-forbidden-peer", c10ForbiddenPeer), "forbidden shadcn-era peer reka-ui");
    const c10UnknownApi = structuredClone(c10);
    c10UnknownApi.api_contract.audited_http_operation_ids[0] = "value.not-a-real-operation";
    expectRejected("C10 unknown API", run("c10-unknown-api", c10UnknownApi), "unknown or reclassified operation");

    const c10ZeroApi = structuredClone(c10);
    c10ZeroApi.api_contract.owned_http_operation_ids = [];
    c10ZeroApi.api_contract.owned_headless_operation_ids = [];
    c10ZeroApi.api_contract.audited_http_operation_ids = [];
    c10ZeroApi.api_contract.audited_headless_operation_ids = [];
    expectRejected("C10 zero API escape", run("c10-zero-api", c10ZeroApi), "exact vector differs");

    const c10OverlappingApi = structuredClone(c10);
    c10OverlappingApi.api_contract.owned_http_operation_ids = [c10OverlappingApi.api_contract.audited_http_operation_ids[0]];
    expectRejected("C10 API overlap", run("c10-overlapping-api", c10OverlappingApi), "owned/audited HTTP overlap");

    const c10ReclassifiedApi = structuredClone(c10);
    const reclassifiedId = c10ReclassifiedApi.api_contract.audited_http_operation_ids.shift();
    c10ReclassifiedApi.api_contract.audited_headless_operation_ids.push(reclassifiedId);
    c10ReclassifiedApi.api_contract.audited_headless_operation_ids.sort();
    expectRejected("C10 API reclassification", run("c10-reclassified-api", c10ReclassifiedApi), "unknown or reclassified operation");

    const c10DuplicateApi = structuredClone(c10);
    c10DuplicateApi.api_contract.audited_http_operation_ids.push(c10DuplicateApi.api_contract.audited_http_operation_ids[0]);
    c10DuplicateApi.api_contract.audited_http_operation_ids.sort();
    expectRejected("C10 duplicate API", run("c10-duplicate-api", c10DuplicateApi), "duplicate operation ID");

    const c10DriftedApiSource = structuredClone(c10);
    c10DriftedApiSource.api_contract.api_source_sha256 = "0".repeat(64);
    expectRejected("C10 API source drift", run("c10-drifted-api-source", c10DriftedApiSource), "/api_contract/api_source_sha256");

    const c10DriftedApiCoverage = structuredClone(c10);
    c10DriftedApiCoverage.api_contract.api_return_coverage_sha256 = "0".repeat(64);
    expectRejected("C10 API coverage drift", run("c10-drifted-api-coverage", c10DriftedApiCoverage), "/api_contract/api_return_coverage_sha256");

    const c10MissingApiVector = structuredClone(c10);
    delete c10MissingApiVector.api_contract.owned_http_operation_ids;
    expectRejected("C10 missing API vector", run("c10-missing-api-vector", c10MissingApiVector), "/api_contract: expected exactly one oneOf branch");

    const c10LegacyApiShape = structuredClone(c10);
    c10LegacyApiShape.api_contract.operation_ids = [
        ...c10LegacyApiShape.api_contract.owned_http_operation_ids,
        ...c10LegacyApiShape.api_contract.audited_http_operation_ids,
    ].sort();
    c10LegacyApiShape.api_contract.headless_operations = [
        ...c10LegacyApiShape.api_contract.owned_headless_operation_ids,
        ...c10LegacyApiShape.api_contract.audited_headless_operation_ids,
    ].sort();
    c10LegacyApiShape.api_contract.manifest_sha256 = c10LegacyApiShape.api_contract.api_source_sha256;
    for (const field of [
        "api_source_sha256",
        "api_return_coverage_sha256",
        "owned_http_operation_ids",
        "owned_headless_operation_ids",
        "audited_http_operation_ids",
        "audited_headless_operation_ids",
    ]) delete c10LegacyApiShape.api_contract[field];
    expectRejected("C10 legacy API shape", run("c10-legacy-api-shape", c10LegacyApiShape), "/api_contract: expected exactly one oneOf branch");

    const nonterminalDependency = structuredClone(g00);
    nonterminalDependency.status = "BLOCKED";
    nonterminalDependency.routed_remainder = [{ owner: "P00", reason: "self-test", trigger: "self-test", evidence: [evidence], blocking: true }];
    finalize(nonterminalDependency);
    const nonterminalPath = join(directory, "nonterminal-g00.return.json");
    writeJson(nonterminalPath, nonterminalDependency);
    const nonterminalParent = structuredClone(g01);
    nonterminalParent.scope.dependency_returns = [dependencyBinding(nonterminalPath, nonterminalDependency)];
    expectRejected("nonterminal dependency", run("nonterminal-dependency", nonterminalParent), "static predecessor G00 -> G01 requires [\"COMPLETE\"]; found BLOCKED");

    const refusedDependency = structuredClone(g00);
    refusedDependency.status = "REFUSED";
    refusedDependency.terminal_disposition.refusals = [refusalRow(
        "fixture-predecessor-refused",
        "fixture predecessor capability",
        "the predecessor is deliberately unavailable and permits no fallback",
    )];
    refreshImplementationChallenge(refusedDependency, "refused-g00");
    finalize(refusedDependency);
    const refusedDependencyPath = join(directory, "refused-g00.return.json");
    writeJson(refusedDependencyPath, refusedDependency);
    const refusedDependencyParent = structuredClone(g01);
    refusedDependencyParent.scope.dependency_returns = [dependencyBinding(refusedDependencyPath, refusedDependency)];
    expectRejected("REFUSED static dependency", run("refused-static-dependency", refusedDependencyParent), "static predecessor G00 -> G01 requires [\"COMPLETE\"]; found REFUSED");

    const dirtyHistorical = structuredClone(g00);
    dirtyHistorical.pins[0].dirty_after_sha256 = "1".repeat(64);
    finalize(dirtyHistorical);
    expectRejected(
        "dirty historical certificate",
        run("dirty-historical-certificate", dirtyHistorical, ["--historical-certificate"]),
        "immutable historical gate replay requires a clean committed predecessor epoch",
    );

    const gitShimDirectory = join(directory, "git-no-materialization");
    mkdirSync(gitShimDirectory);
    const gitShimPath = join(gitShimDirectory, "git");
    const realGit = resolveCommand("git");
    writeFileSync(gitShimPath, [
        "#!/bin/sh",
        "case \" $* \" in",
        "  *\" worktree add \"*) exit 73 ;;",
        "esac",
        `exec ${JSON.stringify(realGit)} \"$@\"`,
        "",
    ].join("\n"));
    chmodSync(gitShimPath, 0o755);
    const noMaterialization = spawnSync(process.execPath, [validator, g00Path, "--historical-certificate"], {
        encoding: "utf8",
        env: { ...process.env, PATH: `${gitShimDirectory}:${process.env.PATH ?? ""}` },
        maxBuffer: 128 * 1024 * 1024,
    });
    if (noMaterialization.status === 0
        || !`${noMaterialization.stderr}${noMaterialization.stdout}`.includes("cannot materialize immutable predecessor commit")) {
        failures.push(`historical certificate survived failed commit materialization: ${noMaterialization.stderr}${noMaterialization.stdout}`);
    } else adversarialRejections += 1;

    writeFileSync(join(repo, "same-repository-advance.txt"), "root advanced after predecessor capture\n");
    execFileSync("git", ["-C", repo, "add", "same-repository-advance.txt"]);
    execFileSync("git", ["-C", repo, "-c", "user.name=V-next Selftest", "-c", "user.email=vnext-selftest@invalid", "commit", "-m", "advance root epoch"]);
    const advancedG01Gate = gateReceipt("G01", "g01-same-repository-advance");
    const advancedG01 = baseRecord("G01", advancedG01Gate, [dependencyBinding(g00Path, g00)]);
    const sameRepositoryAdvance = run("same-repository-advance", advancedG01);
    let sameRepositoryAdvanceReceipt;
    try {
        sameRepositoryAdvanceReceipt = parseJsonStrict(sameRepositoryAdvance.result.stdout.trim());
    } catch {
        sameRepositoryAdvanceReceipt = undefined;
    }
    if (sameRepositoryAdvance.result.status !== 0
        || sameRepositoryAdvanceReceipt?.completion_eligible !== true
        || sameRepositoryAdvanceReceipt?.live_dependency_closure?.unique_descendant_count !== 1
        || sameRepositoryAdvanceReceipt?.live_dependency_closure?.executed_descendant_count !== 1) {
        failures.push(`same-repository root advancement invalidated its immutable predecessor: ${sameRepositoryAdvance.result.stderr}${sameRepositoryAdvance.result.stdout}`);
    }

    const g00ProofPath = join(repo, "test", "proof", "g00", "run.mjs");
    const originalG00Proof = readFileSync(g00ProofPath, "utf8");
    writeFileSync(g00ProofPath, `${originalG00Proof}\nprocess.exit(29);\n`);
    execFileSync("git", ["-C", repo, "add", "test/proof/g00/run.mjs"]);
    execFileSync("git", ["-C", repo, "-c", "user.name=V-next Selftest", "-c", "user.email=vnext-selftest@invalid", "commit", "-m", "install never-executed proof claim"]);
    const neverExecutedReceipt = rewriteReceipt("never-executed-g00", g00Gate, (receipt) => {
        receipt.execution.repository_state_sha256 = repositoryStateSha256(repo);
    });
    const neverExecutedReturn = finalize(baseRecord("G00", neverExecutedReceipt));
    const neverExecutedPath = join(directory, "never-executed-g00.return.json");
    writeJson(neverExecutedPath, neverExecutedReturn);
    const neverExecuted = spawnSync(process.execPath, [validator, realpathSync(neverExecutedPath), "--historical-certificate"], {
        encoding: "utf8",
        maxBuffer: 128 * 1024 * 1024,
    });
    if (neverExecuted.status === 0
        || !`${neverExecuted.stderr}${neverExecuted.stdout}`.includes("historical_replay: exit 29; receipt 0")) {
        failures.push(`historical replay accepted a clean-commit proof claim that was never executed: ${neverExecuted.stderr}${neverExecuted.stdout}`);
    } else adversarialRejections += 1;

    const cyclicEnvironment = { VNEXT_RETURN_VALIDATION_CHAIN: JSON.stringify([valid.path]) };
    const cyclicResult = {
        path: valid.path,
        result: spawnSync(process.execPath, [validator, valid.path], {
            encoding: "utf8",
            env: { ...process.env, ...cyclicEnvironment },
        }),
    };
    expectRejected("cyclic return chain", cyclicResult, "cyclic return-file chain");

    const duplicatePath = join(directory, "duplicate.json");
    writeFileSync(duplicatePath, '{"schema":1,"schema":2}\n');
    const duplicate = spawnSync(process.execPath, [validator, duplicatePath], { encoding: "utf8" });
    if (duplicate.status === 0 || !duplicate.stderr.includes("duplicate object key")) failures.push("duplicate JSON key was not rejected");
    else adversarialRejections += 1;

    const poisoned = parseJsonStrict('{"__proto__":{"required_via_in":true}}');
    const poisonErrors = validateJsonSchema(poisoned, {
        type: "object",
        additionalProperties: false,
        required: ["required_via_in"],
        properties: {},
    });
    if (!Object.prototype.hasOwnProperty.call(poisoned, "__proto__")
        || "required_via_in" in poisoned
        || !poisonErrors.some((error) => error.includes("required property missing"))
        || !poisonErrors.some((error) => error.includes("additional property forbidden"))) {
        failures.push("__proto__ JSON key bypassed own-property schema validation");
    } else adversarialRejections += 1;

    const seedRequirement = {
        id: "SELFTEST-RETRIGGER",
        source: { seed: "kickoff", excerpt_sha256: "0".repeat(64) },
        phase: "formation",
        disposition: "banked",
        decision: "preserve the exact deferred obligation",
        amendments: [],
    };
    const seedErrors = (value) => validateJsonSchema(value, { $ref: "#/$defs/seedRequirement" }, returnSchema);
    if (!seedErrors(seedRequirement).some((error) => error.includes("/retrigger: required property missing"))) {
        failures.push("banked seed requirement without a retrigger was accepted");
    } else adversarialRejections += 1;
    const bankedWithRetrigger = { ...seedRequirement, retrigger: "named future trigger" };
    if (seedErrors(bankedWithRetrigger).length !== 0) failures.push("banked seed requirement with one retrigger was rejected");
    const foldedWithRetrigger = { ...bankedWithRetrigger, disposition: "folded" };
    if (!seedErrors(foldedWithRetrigger).some((error) => error.includes("value matches forbidden not schema"))) {
        failures.push("non-banked seed requirement smuggled a retrigger");
    } else adversarialRejections += 1;
    const foldedWithoutRetrigger = structuredClone(foldedWithRetrigger);
    delete foldedWithoutRetrigger.retrigger;
    if (seedErrors(foldedWithoutRetrigger).length !== 0) failures.push("exact folded seed requirement was rejected");

    const deletionChain = spawnSync(process.execPath, [deletionJudgmentSelftest], { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
    if (deletionChain.status !== 0 || !deletionChain.stdout.includes('"valid_c05_rehearsal_annexes":1') || !deletionChain.stdout.includes('"valid_c10_aggregate_annexes":1')) {
        failures.push(`standalone deletion-judgment chain failed inside the universal contract suite: ${deletionChain.stderr}${deletionChain.stdout}`);
    }

    if (!terminalStatuses.has(v00a.status)) failures.push("self-test predecessor fixture is not terminal");
} finally {
    rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({
    schema: "vnext-contract-selftest/2",
    live_gate_valid: 1,
    historical_noncompleting_valid: 1,
    live_dependency_valid: 1,
    nonadvancing_refused_root_valid: 1,
    immutable_refused_root_valid: 1,
    same_repository_epoch_advance_valid: 1,
    proof_environment_isolation_valid: 1,
    npm_configuration_ignored_valid: 1,
    release_section_validated: 1,
    api_coverage_valid: 1,
    api_owner_section_validated: 1,
    deletion_judgment_chain_valid: 1,
    consumer_universe_return_positive_controls: consumerReturnPositiveControls,
    consumer_universe_return_live_branch_isolations: consumerReturnLiveBranchIsolations,
    consumer_universe_return_schema_controls: consumerReturnSchemaControls,
    consumer_universe_return_rejections: consumerReturnRejections,
    adversarial_rejections: adversarialRejections,
})}\n`);
