#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import {
    lstatSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    readdirSync,
    realpathSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";

import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";

const root = resolve(new URL("..", import.meta.url).pathname);
const validator = resolve(new URL("validate-p01-authorship.mjs", import.meta.url).pathname);
const structuralSelftest = resolve(new URL("selftest-p01-structural-contract.mjs", import.meta.url).pathname);
const canonicalPath = resolve(root, "P01-INDEPENDENT-AUTHORSHIP.json");
const directory = realpathSync(mkdtempSync(join(tmpdir(), "vnext-p01-authorship-")));
const failures = [];
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const sha512Integrity = (input) => `sha512-${createHash("sha512").update(input).digest("base64")}`;
const fileHash = (path) => sha256(readFileSync(path));
const committedTreeHash = (repository, commit) => sha256(execFileSync("git", ["-C", repository, "ls-tree", "-r", "--full-tree", "--long", commit]));
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
const evidence = (path) => ({ path, sha256: fileHash(path) });
const observabilityLimit = "Codex JSONL exposes recorded tool calls, tool outputs and messages, not operating-system reads outside those calls; independence is enforced by fork_turns:none, zero inherited dialogue, undisclosed disjoint roots, concurrent freezes, and no recorded peer-root disclosure before both freezes.";

function selfHash(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    return sha256(canonicalize(preimage));
}

function treeEntries(path, base = path) {
    return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
        const target = resolve(path, entry.name);
        if (entry.isSymbolicLink() || lstatSync(target).isSymbolicLink()) throw new Error("self-test symlink");
        if (entry.isDirectory()) return treeEntries(target, base);
        return [{ path: relative(base, target), sha256: fileHash(target) }];
    });
}

function treeHash(path) {
    const entries = treeEntries(path).sort((left, right) => compareCanonicalText(left.path, right.path));
    return sha256(canonicalize(entries));
}

function jsonl(path, records) {
    writeFileSync(path, `${records.map((record) => JSON.stringify(record)).join("\n")}\n`);
}

function observedPaths(text) {
    return [...new Set([...text.matchAll(/(?:^|[\s'"`=:[({,])((?:\/[A-Za-z0-9._~@%+,:=-]+)+)/g)]
        .map((match) => match[1].replace(/[),;'"`]+$/g, "")))]
        .sort();
}

function accessProjection(records, sessionId, transcriptSha256) {
    const toolCalls = [];
    const toolOutputs = [];
    const messages = [];
    for (const record of records) {
        const timestamp = record.timestamp;
        const payload = record.payload ?? {};
        if (record.type === "response_item" && ["function_call", "custom_tool_call"].includes(payload.type)) {
            const raw = typeof payload.arguments === "string"
                ? payload.arguments
                : typeof payload.input === "string"
                    ? payload.input
                    : canonicalize(payload.arguments ?? payload.input ?? {});
            toolCalls.push({
                timestamp,
                call_id: payload.call_id ?? payload.id ?? "missing",
                tool_name: payload.name ?? "missing",
                arguments_sha256: sha256(raw),
                observed_paths: observedPaths(raw),
            });
        } else if (record.type === "response_item" && ["function_call_output", "custom_tool_call_output"].includes(payload.type)) {
            const raw = typeof payload.output === "string"
                ? payload.output
                : canonicalize(payload.output ?? {});
            toolOutputs.push({
                timestamp,
                call_id: payload.call_id ?? payload.id ?? "missing",
                output_sha256: sha256(raw),
                observed_paths: observedPaths(raw),
            });
        } else if ((record.type === "event_msg" && ["agent_message", "user_message"].includes(payload.type)) ||
            (record.type === "response_item" && payload.type === "message")) {
            const raw = canonicalize(record);
            messages.push({ timestamp, record_sha256: sha256(raw), observed_paths: observedPaths(raw) });
        }
    }
    const projection = {
        schema: "vnext-p01-access-projection/1",
        session_id: sessionId,
        transcript_sha256: transcriptSha256,
        tool_calls: toolCalls,
        tool_outputs: toolOutputs,
        messages,
        observed_paths: [...new Set([...toolCalls, ...toolOutputs, ...messages].flatMap((entry) => entry.observed_paths))].sort(),
        observability_limit: observabilityLimit,
        projection_hash: "",
    };
    projection.projection_hash = selfHash(projection, "projection_hash");
    return projection;
}

function run(name, manifest, requireComplete = false) {
    const path = resolve(directory, `${name}.json`);
    writeJson(path, manifest);
    return spawnSync(process.execPath, [validator, "--manifest", path, ...(requireComplete ? ["--require-complete"] : [])], {
        encoding: "utf8",
        maxBuffer: 128 * 1024 * 1024,
    });
}

function rehash(manifest) {
    for (const author of manifest.author_receipts ?? []) author.receipt_hash = selfHash(author, "receipt_hash");
    const adjudication = manifest.adjudication?.receipt;
    if (adjudication?.state === "complete") {
        adjudication.frozen_author_receipt_hashes = manifest.author_receipts.map(({ receipt_hash }) => receipt_hash).sort();
        adjudication.receipt_hash = selfHash(adjudication, "receipt_hash");
    }
    manifest.manifest_hash = selfHash(manifest, "manifest_hash");
    return manifest;
}

function reject(name, manifest, fragment) {
    const result = run(name, rehash(manifest), true);
    if (result.status === 0 || !result.stderr.includes(fragment)) failures.push(`${name} did not reject ${fragment}: ${result.stderr}`);
}

try {
    const pureStructural = spawnSync(process.execPath, [structuralSelftest], { encoding: "utf8" });
    if (pureStructural.status !== 0 || !pureStructural.stdout.includes('"passing_completion_controls":1') || !pureStructural.stdout.includes('"adversarial_rejections":11')) {
        failures.push(`pure structural completion control rejected: ${pureStructural.stderr || pureStructural.stdout}`);
    }
    const canonical = parseJsonStrict(readFileSync(canonicalPath));
    const structural = spawnSync(process.execPath, [validator], { encoding: "utf8" });
    if (structural.status !== 0 || !structural.stdout.includes('"completion_eligible":false')) failures.push(`canonical born-RED authority rejected: ${structural.stderr}`);
    const premature = spawnSync(process.execPath, [validator, "--require-complete"], { encoding: "utf8" });
    if (premature.status === 0 || !premature.stderr.includes("remains born RED")) failures.push("canonical authority falsely completed P01");

    const staleContract = structuredClone(canonical);
    staleContract.authority_inputs.p01_wave_contract_sha256 = "0".repeat(64);
    const staleContractResult = run("stale-contract", rehash(staleContract));
    if (staleContractResult.status === 0 || !staleContractResult.stderr.includes("p01_wave_contract_sha256")) failures.push("stale P01 contract accepted");

    const forgedHash = structuredClone(canonical);
    forgedHash.manifest_hash = "0".repeat(64);
    const forgedHashResult = run("forged-hash", forgedHash);
    if (forgedHashResult.status === 0 || !forgedHashResult.stderr.includes("/manifest_hash")) failures.push("forged authority self-hash accepted");

    const complete = structuredClone(canonical);
    complete.state = "complete";
    const coordinatorId = "coordinator-p01";
    const coordinatorPath = resolve(directory, "coordinator.jsonl");
    const agentDefinitions = [
        { slot: "grammar-oracle", task: "p01_grammar_oracle", path: "/root/p01_grammar_oracle", id: "author-oracle" },
        { slot: "typescript-combinators", task: "p01_typescript_combinators", path: "/root/p01_typescript_combinators", id: "author-typescript" },
        { slot: "adjudicator", task: "p01_independence_adjudicator", path: "/root/p01_independence_adjudicator", id: "adjudicator-p01" },
    ];
    jsonl(coordinatorPath, agentDefinitions.flatMap((agent, index) => [
        {
            timestamp: `2026-07-18T19:59:0${index}Z`,
            type: "response_item",
            payload: {
                type: "function_call",
                name: "spawn_agent",
                call_id: `spawn-${index}`,
                arguments: JSON.stringify({ task_name: agent.task, fork_turns: "none", model: "gpt-5.6-sol", reasoning_effort: "ultra", message: "isolated P01 fixture" }),
            },
        },
        {
            timestamp: `2026-07-18T19:59:1${index}Z`,
            type: "event_msg",
            payload: { type: "sub_agent_activity", kind: "started", agent_path: agent.path, agent_thread_id: agent.id, event_id: `spawn-${index}` },
        },
    ]));

    const fixtureFiles = {};
    for (const name of ["css-corpus", "standards-lock", "value-signatures", "shared-input"]) {
        const path = resolve(directory, `${name}.json`);
        writeJson(path, { fixture: name });
        fixtureFiles[name] = path;
    }
    const contracts = loadWaveContracts();
    const predecessors = [];
    for (const waveId of ["P00", "V01", "V02"]) {
        const path = resolve(directory, `${waveId}.return.json`);
        const returned = { wave_id: waveId, return_hash: sha256(waveId), scope: { wave_contract_sha256: contracts.get(waveId).sha256 } };
        writeJson(path, returned);
        predecessors.push({ wave_id: waveId, path, file_sha256: fileHash(path), return_hash: returned.return_hash, wave_contract_sha256: returned.scope.wave_contract_sha256 });
    }
    const coordinationPath = resolve(root, "coordination/pt-e-bbnf-live-coordination-v2.json");
    const coordination = parseJsonStrict(readFileSync(coordinationPath));
    const coordinationTip = coordination.events.at(-1);
    const coordinationStdoutPath = resolve(directory, "coordination-validator.json");
    writeJson(coordinationStdoutPath, {
        format: coordination.format,
        events: coordination.events.length,
        tip: coordinationTip.event_sha256,
        snapshot_current: true,
        evidence_current: true,
        observations: [],
    });
    const executionIsomorphism = parseJsonStrict(readFileSync(resolve(root, "CSS-MODULE-ISOMORPHISM.json")));
    executionIsomorphism.authority.snapshot_kind = "execution-input";
    for (const correction of executionIsomorphism.edge_corrections) {
        const owner = executionIsomorphism.modules.find(({ bbnf_path }) => bbnf_path === correction.from);
        if (owner && !owner.imports.includes(correction.to)) owner.imports.push(correction.to);
        if (owner) owner.imports.sort();
    }
    executionIsomorphism.edge_corrections = [];
    executionIsomorphism.authority.runtime_modules_sha256 = sha256(canonicalize(executionIsomorphism.modules.map(({ bbnf_path }) => bbnf_path)));
    executionIsomorphism.authority.excluded_dispositions_sha256 = sha256(canonicalize(executionIsomorphism.excluded.map(({ bbnf_path, disposition }) => ({ bbnf_path, disposition }))));
    executionIsomorphism.authority.resolved_edges_sha256 = sha256(canonicalize(executionIsomorphism.modules.map(({ bbnf_path, imports }) => ({ bbnf_path, imports }))));
    executionIsomorphism.manifest_hash = selfHash(executionIsomorphism, "manifest_hash");
    const executionIsomorphismPath = resolve(directory, "css-module-isomorphism.json");
    writeJson(executionIsomorphismPath, executionIsomorphism);
    const packageStage = resolve(directory, "package-stage");
    const stagedPackage = resolve(packageStage, "package");
    const installRoot = resolve(directory, "package-install");
    const installedPackage = resolve(installRoot, "node_modules/@mkbabb/parse-that");
    mkdirSync(stagedPackage, { recursive: true });
    mkdirSync(installedPackage, { recursive: true });
    const packageJson = { name: "@mkbabb/parse-that", version: "1.0.0", main: "./index.js", types: "./index.d.ts", exports: { ".": { types: "./index.d.ts", default: "./index.js" } } };
    const packageFiles = new Map([
        ["package.json", `${JSON.stringify(packageJson, null, 2)}\n`],
        ["index.js", "export const parse = () => true;\n"],
        ["index.d.ts", "export declare const parse: () => boolean;\n"],
        ["a.b", "flat canonical-order fixture\n"],
        ["a/x", "nested canonical-order fixture\n"],
    ]);
    for (const [name, content] of packageFiles) {
        const stagedPath = resolve(stagedPackage, name);
        const installedPath = resolve(installedPackage, name);
        mkdirSync(dirname(stagedPath), { recursive: true });
        mkdirSync(dirname(installedPath), { recursive: true });
        writeFileSync(stagedPath, content);
        writeFileSync(installedPath, content);
    }
    const packageTarball = resolve(directory, "parse-that-1.0.0.tgz");
    execFileSync("/usr/bin/tar", ["-czf", packageTarball, "-C", packageStage, "package"]);
    const packageIntegrity = sha512Integrity(readFileSync(packageTarball));
    const packageRows = [...packageFiles].map(([path, content]) => ({ path, bytes: Buffer.byteLength(content), sha256: sha256(content) })).sort((left, right) => compareCanonicalText(left.path, right.path));
    const npmLsPath = resolve(directory, "parse-that-npm-ls.json");
    const lockPath = resolve(installRoot, "package-lock.json");
    const resolvedPackage = "https://registry.npmjs.org/@mkbabb/parse-that/-/parse-that-1.0.0.tgz";
    writeJson(npmLsPath, { dependencies: { "@mkbabb/parse-that": { version: "1.0.0", resolved: resolvedPackage } } });
    writeJson(lockPath, { lockfileVersion: 3, packages: { "node_modules/@mkbabb/parse-that": { version: "1.0.0", resolved: resolvedPackage, integrity: packageIntegrity } } });
    const packageReceipt = {
        schema: "vnext-parse-that-package-receipt/1",
        package: { name: "@mkbabb/parse-that", version: "1.0.0", registry_spec: "@mkbabb/parse-that@1.0.0", integrity: packageIntegrity },
        tarball: evidence(packageTarball),
        archive: {
            package_json_sha256: packageRows.find(({ path }) => path === "package.json").sha256,
            file_count: packageRows.length,
            files_sha256: sha256(canonicalize(packageRows)),
            runtime_files_sha256: sha256(canonicalize(packageRows.filter(({ path }) => /\.(?:cjs|mjs|js)$/.test(path)))),
            declaration_files_sha256: sha256(canonicalize(packageRows.filter(({ path }) => /\.d\.(?:cts|mts|ts)$/.test(path)))),
            export_conditions_sha256: sha256(canonicalize({ exports: packageJson.exports, main: packageJson.main, module: null, types: packageJson.types })),
        },
        install: { root: installRoot, package_path: installedPackage, source_spec: "@mkbabb/parse-that@1.0.0", tree_sha256: sha256(canonicalize(packageRows)), npm_ls: evidence(npmLsPath), lockfile: evidence(lockPath), workspace_links: [] },
        receipt_hash: "",
    };
    packageReceipt.receipt_hash = selfHash(packageReceipt, "receipt_hash");
    const packageReceiptPath = resolve(directory, "parse-that-package-receipt.json");
    writeJson(packageReceiptPath, packageReceipt);
    const epoch = {
        schema: "vnext-p01-input-epoch/1",
        wave_id: "P01",
        wave_contract_sha256: contracts.get("P01").sha256,
        coordinator_session_id: coordinatorId,
        coordinator_transcript: evidence(coordinatorPath),
        predecessor_returns: predecessors,
        coordination_clearance: {
            stream: evidence(coordinationPath),
            tip_sequence: coordinationTip.sequence,
            tip_event_sha256: coordinationTip.event_sha256,
            parse_that: {
                path: coordinationTip.pins.parse_that.path,
                branch: coordinationTip.pins.parse_that.branch,
                head: coordinationTip.pins.parse_that.head,
                dirty_sha256: coordinationTip.pins.parse_that.dirty_sha256,
            },
            bbnf_lang: {
                path: coordinationTip.pins.bbnf_lang.path,
                branch: coordinationTip.pins.bbnf_lang.branch,
                head: coordinationTip.pins.bbnf_lang.head,
                dirty_sha256: coordinationTip.pins.bbnf_lang.dirty_sha256,
            },
            validator_command: "node docs/tranches/V/vnext/tools/validate-pt-coordination.mjs --require-current",
            validator_stdout: evidence(coordinationStdoutPath),
        },
        committed_value: {
            state: "committed",
            repository: coordinationTip.pins.value_js.path,
            commit: coordinationTip.pins.value_js.head,
            committed_tree_sha256: committedTreeHash(coordinationTip.pins.value_js.path, coordinationTip.pins.value_js.head),
        },
        bbnf_css_union_freeze: {
            state: "frozen",
            scope: "snapshot-2026-constituents-and-exceptions-plus-every-w3c-level-4-module-plus-css-syntax-and-normative-dependencies",
            source_thread_id: "019f7685-254a-7a22-9917-1da91f977861",
            snapshot_event_sha256: coordinationTip.event_sha256,
            bbnf_commit: coordinationTip.pins.bbnf_lang.head,
            module_manifest_sha256: fileHash(executionIsomorphismPath),
            runtime_modules_sha256: executionIsomorphism.authority.runtime_modules_sha256,
            excluded_dispositions_sha256: executionIsomorphism.authority.excluded_dispositions_sha256,
            resolved_edges_sha256: executionIsomorphism.authority.resolved_edges_sha256,
            imports_parse_that_novelty: false,
        },
        parse_that_package: {
            name: packageReceipt.package.name,
            version: packageReceipt.package.version,
            registry_spec: packageReceipt.package.registry_spec,
            integrity: packageReceipt.package.integrity,
            receipt: evidence(packageReceiptPath),
            receipt_hash: packageReceipt.receipt_hash,
            tarball_sha256: packageReceipt.tarball.sha256,
            files_sha256: packageReceipt.archive.files_sha256,
            runtime_files_sha256: packageReceipt.archive.runtime_files_sha256,
            declaration_files_sha256: packageReceipt.archive.declaration_files_sha256,
            export_conditions_sha256: packageReceipt.archive.export_conditions_sha256,
            no_link_tree_sha256: packageReceipt.install.tree_sha256,
        },
        host_capsule: evidence(resolve(root, "BBNF-HOST-CONTROL.json")),
        css_module_isomorphism: {
            path: executionIsomorphismPath,
            file_sha256: fileHash(executionIsomorphismPath),
            manifest_hash: executionIsomorphism.manifest_hash,
            bbnf_commit: executionIsomorphism.source.commit,
            runtime_modules_sha256: executionIsomorphism.authority.runtime_modules_sha256,
            excluded_dispositions_sha256: executionIsomorphism.authority.excluded_dispositions_sha256,
            resolved_edges_sha256: executionIsomorphism.authority.resolved_edges_sha256,
        },
        css_corpus: evidence(fixtureFiles["css-corpus"]),
        standards_lock: evidence(fixtureFiles["standards-lock"]),
        value_css_signatures: evidence(fixtureFiles["value-signatures"]),
        shared_inputs: [evidence(fixtureFiles["shared-input"])],
        frozen_at: "2026-07-18T20:00:00Z",
        epoch_hash: "",
    };
    epoch.epoch_hash = selfHash(epoch, "epoch_hash");
    const epochPath = resolve(directory, "input-epoch.json");
    writeJson(epochPath, epoch);
    complete.execution_input_epoch = { state: "frozen", path: epochPath, file_sha256: fileHash(epochPath), epoch_hash: epoch.epoch_hash };

    const authors = [];
    const authorRecords = [];
    for (const [index, definition] of agentDefinitions.slice(0, 2).entries()) {
        const proposalRoot = resolve(directory, `proposal-${definition.slot}`);
        mkdirSync(proposalRoot);
        const proposalManifest = resolve(proposalRoot, "manifest.json");
        writeJson(proposalManifest, { schema: "synthetic-p01-proposal/1", slot: definition.slot, epoch_hash: epoch.epoch_hash });
        writeFileSync(resolve(proposalRoot, index === 0 ? "index.bbnf" : "index.ts"), `${definition.slot}\n`);
        const transcript = resolve(directory, `${definition.id}.jsonl`);
        const report = resolve(directory, `${definition.id}.report.md`);
        const access = resolve(directory, `${definition.id}.access.json`);
        const sessionStartedAt = `2026-07-18T20:00:0${index}Z`;
        const freezeStartedAt = `2026-07-18T20:0${5 + index}:00Z`;
        const freezeFinishedAt = `2026-07-18T20:0${5 + index}:30Z`;
        const sessionFinishedAt = `2026-07-18T20:0${7 + index}:00Z`;
        const reportText = `${definition.slot} independent report`;
        const records = [
            { timestamp: sessionStartedAt, type: "session_meta", payload: { id: definition.id, session_id: coordinatorId, parent_thread_id: coordinatorId, forked_from_id: coordinatorId, agent_path: definition.path, source: { subagent: { thread_spawn: { parent_thread_id: coordinatorId, depth: 1, agent_path: definition.path } } } } },
            { timestamp: `2026-07-18T20:00:1${index}Z`, type: "turn_context", payload: { model: "gpt-5.6-sol", effort: "ultra" } },
            { timestamp: `2026-07-18T20:00:2${index}Z`, type: "event_msg", payload: { type: "user_message", message: `P01_AUTHOR_SLOT=${definition.slot} P01_FROZEN_INPUT_EPOCH=${epoch.epoch_hash} P01_COORDINATION_CLEARANCE=${epoch.coordination_clearance.stream.sha256} P01_ISOLATED_CONTEXT=fork_turns:none` } },
            { timestamp: freezeStartedAt, type: "event_msg", payload: { type: "agent_message", message: `P01_FREEZE_STARTED=${freezeStartedAt} P01_PROPOSAL_ROOT=${proposalRoot}` } },
            { timestamp: freezeFinishedAt, type: "event_msg", payload: { type: "agent_message", message: `P01_FREEZE_FINISHED=${freezeFinishedAt} P01_PROPOSAL_TREE_SHA256=${treeHash(proposalRoot)}` } },
            { timestamp: `2026-07-18T20:06:4${index}Z`, type: "event_msg", payload: { type: "agent_message", phase: "final_answer", message: reportText } },
            { timestamp: sessionFinishedAt, type: "event_msg", payload: { type: "task_complete" } },
        ];
        authorRecords.push(records);
        jsonl(transcript, records);
        writeFileSync(report, reportText);
        const projection = accessProjection(records, definition.id, fileHash(transcript));
        writeJson(access, projection);
        const receipt = {
            schema: "vnext-p01-author-receipt/1",
            slot: definition.slot,
            session: {
                provider: "codex",
                session_id: definition.id,
                agent_path: definition.path,
                model: "gpt-5.6-sol",
                effort: "ultra",
                fork_turns: "none",
                inherited_dialogue_turns: 0,
                ancestry_session_ids: [coordinatorId, definition.id],
                transcript: evidence(transcript),
            },
            frozen_input_epoch_sha256: epoch.epoch_hash,
            report: evidence(report),
            access_log: evidence(access),
            observed_read_paths: projection.observed_paths,
            proposal: { root: proposalRoot, manifest: evidence(proposalManifest), artifact_tree_sha256: treeHash(proposalRoot) },
            session_started_at: sessionStartedAt,
            freeze_started_at: freezeStartedAt,
            freeze_finished_at: freezeFinishedAt,
            session_finished_at: sessionFinishedAt,
            peer_proposal_read_before_both_freezes: false,
            generated_or_copied_from_peer: false,
            receipt_hash: "",
        };
        receipt.receipt_hash = selfHash(receipt, "receipt_hash");
        authors.push(receipt);
    }
    complete.author_receipts = authors;

    const authorHashes = authors.map(({ receipt_hash }) => receipt_hash).sort();
    const adjudicationDefinition = agentDefinitions[2];
    const adjudicationTranscript = resolve(directory, "adjudication.jsonl");
    const adjudicationReport = resolve(directory, "adjudication.md");
    const differentialLedger = resolve(directory, "differential.json");
    const adjudicationReportText = "synthetic adjudication";
    jsonl(adjudicationTranscript, [
        { timestamp: "2026-07-18T20:09:00Z", type: "session_meta", payload: { id: adjudicationDefinition.id, session_id: coordinatorId, parent_thread_id: coordinatorId, forked_from_id: coordinatorId, agent_path: adjudicationDefinition.path, source: { subagent: { thread_spawn: { parent_thread_id: coordinatorId, depth: 1, agent_path: adjudicationDefinition.path } } } } },
        { timestamp: "2026-07-18T20:09:01Z", type: "turn_context", payload: { model: "gpt-5.6-sol", effort: "ultra" } },
        { timestamp: "2026-07-18T20:09:02Z", type: "event_msg", payload: { type: "user_message", message: `P01_ADJUDICATOR=independence P01_FROZEN_INPUT_EPOCH=${epoch.epoch_hash} P01_COORDINATION_CLEARANCE=${epoch.coordination_clearance.stream.sha256} P01_ISOLATED_CONTEXT=fork_turns:none P01_AUTHOR_RECEIPTS=${authorHashes.join(",")}` } },
        { timestamp: "2026-07-18T20:09:30Z", type: "event_msg", payload: { type: "agent_message", phase: "final_answer", message: adjudicationReportText } },
        { timestamp: "2026-07-18T20:09:31Z", type: "event_msg", payload: { type: "task_complete" } },
    ]);
    writeFileSync(adjudicationReport, adjudicationReportText);
    writeJson(differentialLedger, { differences: [] });
    complete.adjudication.receipt = {
        state: "complete",
        schema: "vnext-p01-adjudication-receipt/1",
        session: {
            provider: "codex",
            session_id: adjudicationDefinition.id,
            agent_path: adjudicationDefinition.path,
            model: "gpt-5.6-sol",
            effort: "ultra",
            fork_turns: "none",
            inherited_dialogue_turns: 0,
            ancestry_session_ids: [coordinatorId, adjudicationDefinition.id],
            transcript: evidence(adjudicationTranscript),
        },
        started_at: "2026-07-18T20:09:00Z",
        frozen_author_receipt_hashes: authorHashes,
        report: evidence(adjudicationReport),
        differential_ledger: evidence(differentialLedger),
        verdict: "accepted",
        receipt_hash: "",
    };
    rehash(complete);
    const blockedControl = run("synthetic-complete-blocked", structuredClone(complete), true);
    if (blockedControl.status === 0 || (blockedControl.stderr.match(/universal live terminal validation failed/g) ?? []).length !== 3) {
        failures.push(`synthetic completion did not stop on all three unexecuted predecessors: ${blockedControl.stderr}`);
    }

    const reusedSession = structuredClone(complete);
    reusedSession.author_receipts[1].session.session_id = reusedSession.author_receipts[0].session.session_id;
    reusedSession.author_receipts[1].session.ancestry_session_ids = [coordinatorId, reusedSession.author_receipts[0].session.session_id];
    reject("reused-session", reusedSession, "session identity is reused");

    const extraAncestor = structuredClone(complete);
    extraAncestor.author_receipts[0].session.ancestry_session_ids.push("hidden-parent");
    extraAncestor.author_receipts[1].session.ancestry_session_ids.push("hidden-parent");
    reject("extra-common-ancestor", extraAncestor, "must contain exactly self and the input-epoch coordinator");

    const inheritedDialogue = structuredClone(complete);
    inheritedDialogue.author_receipts[0].session.inherited_dialogue_turns = 1;
    reject("inherited-dialogue", inheritedDialogue, "must equal 0");

    const wrongEpoch = structuredClone(complete);
    wrongEpoch.author_receipts[0].frozen_input_epoch_sha256 = "0".repeat(64);
    reject("wrong-epoch", wrongEpoch, "must equal the one frozen execution epoch");

    const reusedAdjudicator = structuredClone(complete);
    reusedAdjudicator.adjudication.receipt.session.session_id = reusedAdjudicator.author_receipts[0].session.session_id;
    reusedAdjudicator.adjudication.receipt.session.ancestry_session_ids = [coordinatorId, reusedAdjudicator.author_receipts[0].session.session_id];
    reject("reused-adjudicator", reusedAdjudicator, "author session reuse forbidden");

    const peerRead = structuredClone(complete);
    const peerReadReceipt = peerRead.author_receipts[0];
    const peerReadRecords = structuredClone(authorRecords[0]);
    peerReadRecords.splice(3, 0, {
        timestamp: "2026-07-18T20:04:00Z",
        type: "response_item",
        payload: {
            type: "custom_tool_call",
            call_id: "read-peer-before-freeze",
            name: "read_peer",
            input: `read ${peerRead.author_receipts[1].proposal.root}`,
        },
    });
    jsonl(peerReadReceipt.session.transcript.path, peerReadRecords);
    peerReadReceipt.session.transcript = evidence(peerReadReceipt.session.transcript.path);
    const peerProjection = accessProjection(peerReadRecords, peerReadReceipt.session.session_id, peerReadReceipt.session.transcript.sha256);
    writeJson(peerReadReceipt.access_log.path, peerProjection);
    peerReadReceipt.access_log = evidence(peerReadReceipt.access_log.path);
    peerReadReceipt.observed_read_paths = peerProjection.observed_paths;
    reject("peer-read", peerRead, "recorded tool/message projection disclosed the peer proposal before both freezes");
} finally {
    rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({
    schema: "vnext-p01-authorship-selftest/1",
    born_red_authority_valid: 1,
    premature_completion_rejected: 1,
    synthetic_complete_blocked_on_unexecuted_predecessors: 1,
    pure_structural_completion_controls: 1,
    pure_structural_adversarial_rejections: 11,
    adversarial_rejections: 8,
})}\n`);
