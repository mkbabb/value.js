#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
    existsSync,
    lstatSync,
    readFileSync,
    readdirSync,
    realpathSync,
    statSync,
} from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import {
    isForbiddenP01InputPath,
    validateP01StructuralCompletion,
} from "./p01-structural-contract.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let manifestPath = resolve(root, "P01-INDEPENDENT-AUTHORSHIP.json");
let requireComplete = false;
for (let index = 2; index < process.argv.length; index += 1) {
    const argument = process.argv[index];
    if (argument === "--require-complete") requireComplete = true;
    else if (argument === "--manifest" && process.argv[index + 1]) manifestPath = resolve(process.argv[++index]);
    else {
        process.stderr.write("usage: node validate-p01-authorship.mjs [--manifest <path>] [--require-complete]\n");
        process.exit(2);
    }
}

const schemaPath = resolve(root, "p01-independent-authorship.schema.json");
const epochSchemaPath = resolve(root, "p01-input-epoch.schema.json");
const returnValidatorPath = resolve(root, "tools/validate-return.mjs");
const coordinationValidatorPath = resolve(root, "tools/validate-pt-coordination.mjs");
const coordinationSchemaPath = resolve(root, "coordination/pt-e-bbnf-live-coordination-v2.schema.json");
const canonicalCoordinationPath = resolve(root, "coordination/pt-e-bbnf-live-coordination-v2.json");
const accessSchemaPath = resolve(root, "p01-access-projection.schema.json");
const cssModuleValidatorPath = resolve(root, "tools/validate-css-module-isomorphism.mjs");
const packageReceiptValidatorPath = resolve(root, "tools/validate-parse-that-package-receipt.mjs");
const originLedgerSchemaPath = resolve(root, "p01-origin-ledger.schema.json");
const cssCorpusSchemaPath = resolve(root, "p01-css-corpus.schema.json");
const oracleProposalSchemaPath = resolve(root, "p01-grammar-oracle-proposal.schema.json");
const implementationProposalSchemaPath = resolve(root, "p01-typescript-combinators-proposal.schema.json");
const differentialLedgerSchemaPath = resolve(root, "p01-differential-ledger.schema.json");
const manifest = parseJsonStrict(readFileSync(manifestPath));
const schema = parseJsonStrict(readFileSync(schemaPath));
const epochSchema = parseJsonStrict(readFileSync(epochSchemaPath));
const coordinationSchema = parseJsonStrict(readFileSync(coordinationSchemaPath));
const accessSchema = parseJsonStrict(readFileSync(accessSchemaPath));
const structuralSchemas = {
    authorship: schema,
    inputEpoch: epochSchema,
    cssModule: parseJsonStrict(readFileSync(resolve(root, "css-module-isomorphism.schema.json"))),
    originLedger: parseJsonStrict(readFileSync(originLedgerSchemaPath)),
    cssCorpus: parseJsonStrict(readFileSync(cssCorpusSchemaPath)),
    grammarOracle: parseJsonStrict(readFileSync(oracleProposalSchemaPath)),
    typescriptCombinators: parseJsonStrict(readFileSync(implementationProposalSchemaPath)),
    differentialLedger: parseJsonStrict(readFileSync(differentialLedgerSchemaPath)),
};
const failures = validateJsonSchema(manifest, schema);
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const fileHash = (path) => sha256(readFileSync(path));
const p01Contract = loadWaveContracts().get("P01");
const codexSessionPath = /^\/Users\/mkbabb\/\.codex\/sessions\/.*\/rollout-[^/]+\.jsonl$/;

function fail(message) {
    failures.push(message);
}

function selfHash(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    return sha256(canonicalize(preimage));
}

function verifyFile(evidence, pointer) {
    if (!evidence || typeof evidence.path !== "string" || typeof evidence.sha256 !== "string") {
        fail(`${pointer}: missing path/hash`);
        return false;
    }
    if (!isAbsolute(evidence.path)) {
        fail(`${pointer}/path: must be absolute`);
        return false;
    }
    if (!existsSync(evidence.path)) {
        fail(`${pointer}/path: file does not exist`);
        return false;
    }
    const metadata = lstatSync(evidence.path);
    if (!metadata.isFile() || metadata.isSymbolicLink()) {
        fail(`${pointer}/path: regular non-symlink file required`);
        return false;
    }
    const canonical = realpathSync(evidence.path);
    if (canonical !== evidence.path) fail(`${pointer}/path: must be canonical ${canonical}`);
    const actual = fileHash(evidence.path);
    if (actual !== evidence.sha256) fail(`${pointer}/sha256: found ${actual}; expected ${evidence.sha256}`);
    return true;
}

function verifyDirectory(path, pointer) {
    if (!isAbsolute(path ?? "") || !existsSync(path)) {
        fail(`${pointer}: canonical absolute directory does not exist`);
        return false;
    }
    const metadata = lstatSync(path);
    if (!metadata.isDirectory() || metadata.isSymbolicLink()) {
        fail(`${pointer}: real non-symlink directory required`);
        return false;
    }
    const canonical = realpathSync(path);
    if (canonical !== path) {
        fail(`${pointer}: must be canonical ${canonical}`);
        return false;
    }
    return true;
}

function parseBoundJson(evidence, pointer) {
    if (!verifyFile(evidence, pointer)) return undefined;
    try {
        return parseJsonStrict(readFileSync(evidence.path));
    } catch (error) {
        fail(`${pointer}: strict JSON parse failed: ${error.message}`);
        return undefined;
    }
}

function committedTreeHash(repository, commit, pointer) {
    if (!verifyDirectory(repository, `${pointer}/repository`)) return undefined;
    const resolved = spawnSync("git", ["-C", repository, "rev-parse", `${commit}^{commit}`], { encoding: "utf8" });
    if (resolved.status !== 0 || resolved.stdout.trim() !== commit) {
        fail(`${pointer}/commit: committed Git object is absent`);
        return undefined;
    }
    const listing = spawnSync("git", ["-C", repository, "ls-tree", "-r", "--full-tree", "--long", commit], { encoding: null, maxBuffer: 128 * 1024 * 1024 });
    if (listing.status !== 0) {
        fail(`${pointer}/committed_tree_sha256: unable to enumerate committed tree`);
        return undefined;
    }
    return sha256(listing.stdout);
}

function treeEntries(directory, base = directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = resolve(directory, entry.name);
        if (entry.isSymbolicLink() || lstatSync(path).isSymbolicLink()) throw new Error(`proposal symlink forbidden: ${path}`);
        if (entry.isDirectory()) return treeEntries(path, base);
        if (!entry.isFile()) throw new Error(`proposal non-file forbidden: ${path}`);
        return [{ path: relative(base, path).replaceAll("\\", "/"), sha256: fileHash(path) }];
    });
}

function jsonLines(path, pointer) {
    const records = [];
    let source;
    try {
        source = decodeUtf8Strict(readFileSync(path));
    } catch (error) {
        fail(`${pointer}: malformed canonical Codex JSONL (${error.message})`);
        return records;
    }
    for (const [index, line] of source.split("\n").entries()) {
        if (line === "") continue;
        try {
            records.push(parseJsonStrict(line));
        } catch (error) {
            fail(`${pointer}:${index + 1}: malformed canonical Codex JSONL (${error.message})`);
        }
    }
    if (records.length === 0) fail(`${pointer}: transcript is empty`);
    return records;
}

const observabilityLimit = "Codex JSONL exposes recorded tool calls, tool outputs and messages, not operating-system reads outside those calls; independence is enforced by fork_turns:none, zero inherited dialogue, undisclosed disjoint roots, concurrent freezes, and no recorded peer-root disclosure before both freezes.";

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
    const allPaths = [...new Set([...toolCalls, ...toolOutputs, ...messages].flatMap((entry) => entry.observed_paths))].sort();
    const projection = {
        schema: "vnext-p01-access-projection/1",
        session_id: sessionId,
        transcript_sha256: transcriptSha256,
        tool_calls: toolCalls,
        tool_outputs: toolOutputs,
        messages,
        observed_paths: allPaths,
        observability_limit: observabilityLimit,
        projection_hash: "",
    };
    projection.projection_hash = selfHash(projection, "projection_hash");
    return projection;
}

function verifyAccessProjection(binding, derived, pointer) {
    if (!verifyFile(binding, pointer)) return;
    const persisted = parseJsonStrict(readFileSync(binding.path));
    for (const error of validateJsonSchema(persisted, accessSchema)) fail(`${pointer}${error}`);
    const computed = selfHash(persisted, "projection_hash");
    if (persisted.projection_hash !== computed) fail(`${pointer}/projection_hash: computed ${computed}`);
    if (canonicalize(persisted) !== canonicalize(derived)) fail(`${pointer}: persisted projection does not equal the transcript-derived projection`);
}

function verifyChildTranscript(session, roleToken, epochHash, report, pointer, temporal, authorHashes = [], proposalBindings = []) {
    if (!verifyFile(session?.transcript, `${pointer}/transcript`)) return;
    if (!codexSessionPath.test(session.transcript.path)) fail(`${pointer}/transcript/path: must be a canonical Codex rollout JSONL`);
    const records = jsonLines(session.transcript.path, `${pointer}/transcript`);
    const metas = records.filter((record) => record.type === "session_meta");
    const meta = metas[0];
    if (metas.length !== 1) fail(`${pointer}/transcript: expected exactly one session_meta record`);
    if (meta?.payload?.id !== session.session_id || meta?.payload?.agent_path !== session.agent_path) {
        fail(`${pointer}/transcript: session_meta does not bind spawned ID and agent path`);
    }
    const spawnMeta = meta?.payload?.source?.subagent?.thread_spawn;
    if (meta?.payload?.session_id !== epoch?.coordinator_session_id ||
        meta?.payload?.parent_thread_id !== epoch?.coordinator_session_id ||
        meta?.payload?.forked_from_id !== epoch?.coordinator_session_id ||
        spawnMeta?.parent_thread_id !== epoch?.coordinator_session_id ||
        spawnMeta?.depth !== 1 || spawnMeta?.agent_path !== session.agent_path) {
        fail(`${pointer}/transcript: session_meta does not prove a direct child of the input-epoch coordinator`);
    }
    const contexts = records.filter((record) => record.type === "turn_context");
    if (contexts.length !== 1 || contexts[0]?.payload?.model !== "gpt-5.6-sol" || contexts[0]?.payload?.effort !== "ultra") {
        fail(`${pointer}/transcript: expected exactly one served Sol-ultra turn_context`);
    }
    const completions = records.filter((record) => record.type === "event_msg" && record.payload?.type === "task_complete");
    const complete = completions[0];
    if (completions.length !== 1) fail(`${pointer}/transcript: expected exactly one task_complete`);
    if (temporal) {
        if (meta?.timestamp !== temporal.session_started_at) fail(`${pointer}/transcript: session start does not equal the receipt`);
        if (complete?.timestamp !== temporal.session_finished_at) fail(`${pointer}/transcript: session end does not equal the receipt`);
        const times = [temporal.session_started_at, temporal.freeze_started_at, temporal.freeze_finished_at, temporal.session_finished_at].map(Date.parse);
        if (times.some((time) => !Number.isFinite(time)) || times.some((time, index) => index > 0 && time < times[index - 1])) {
            fail(`${pointer}: required ordering is session start <= freeze start <= freeze finish <= session end`);
        }
        const freezeStarted = records.find((record) => record.timestamp === temporal.freeze_started_at &&
            JSON.stringify(record).includes(`P01_FREEZE_STARTED=${temporal.freeze_started_at}`) &&
            JSON.stringify(record).includes(`P01_PROPOSAL_ROOT=${temporal.proposal?.root}`));
        if (!freezeStarted) fail(`${pointer}/transcript: proposal freeze-start event is absent or timestamp/root do not bind the receipt`);
        const freezeFinished = records.find((record) => record.timestamp === temporal.freeze_finished_at &&
            JSON.stringify(record).includes(`P01_FREEZE_FINISHED=${temporal.freeze_finished_at}`) &&
            JSON.stringify(record).includes(`P01_PROPOSAL_TREE_SHA256=${temporal.proposal?.artifact_tree_sha256}`));
        if (!freezeFinished) fail(`${pointer}/transcript: proposal freeze-finish event is absent or timestamp/tree hash do not bind the receipt`);
    }
    const finalRecord = records.filter((record) =>
        (record.type === "event_msg" && record.payload?.type === "agent_message" && record.payload?.phase === "final_answer") ||
        (record.type === "response_item" && record.payload?.type === "message" && record.payload?.phase === "final_answer"),
    ).at(-1);
    const finalText = finalRecord?.type === "event_msg"
        ? finalRecord.payload?.message
        : finalRecord?.payload?.content?.find?.((item) => item.type === "output_text")?.text;
    if (typeof finalText !== "string" || finalText === "") {
        fail(`${pointer}/transcript: canonical final report is absent`);
    } else if (sha256(finalText) !== report?.sha256) {
        fail(`${pointer}/transcript: final report bytes do not equal the bound report hash`);
    }
    const finalAt = Date.parse(finalRecord?.timestamp);
    if (!Number.isFinite(finalAt) || (temporal &&
        (finalAt < Date.parse(temporal.freeze_finished_at) || finalAt > Date.parse(temporal.session_finished_at)))) {
        fail(`${pointer}/transcript: final report must follow proposal freeze and precede session completion`);
    }
    const transcriptText = records.map((record) => JSON.stringify(record)).join("\n");
    for (const token of [
        roleToken,
        `P01_FROZEN_INPUT_EPOCH=${epochHash}`,
        `P01_COORDINATION_CLEARANCE=${epoch?.coordination_clearance?.stream?.sha256}`,
        "P01_ISOLATED_CONTEXT=fork_turns:none",
    ]) {
        if (!transcriptText.includes(token)) fail(`${pointer}/transcript: missing isolated-author directive ${token}`);
    }
    if (authorHashes.length) {
        const binding = `P01_AUTHOR_RECEIPTS=${[...authorHashes].sort().join(",")}`;
        if (!transcriptText.includes(binding)) fail(`${pointer}/transcript: missing adjudication binding ${binding}`);
    }
    if (proposalBindings.length) {
        const encoded = [...proposalBindings]
            .sort((left, right) => compareCanonicalText(left.slot, right.slot))
            .map(({ slot, path, file_sha256, manifest_hash }) => `${slot}:${path}:${file_sha256}:${manifest_hash}`)
            .join(",");
        const binding = `P01_PROPOSAL_MANIFESTS=${encoded}`;
        if (!transcriptText.includes(binding)) fail(`${pointer}/transcript: missing adjudication binding ${binding}`);
    }
    return { records, meta, complete, projection: accessProjection(records, session.session_id, session.transcript.sha256) };
}

function verifyCoordinatorSpawn(session, slot, coordinatorRecords, pointer) {
    const taskName = session.agent_path.replace(/^\/root\//, "");
    const spawn = coordinatorRecords.find((record) => {
        if (record.type !== "response_item" || record.payload?.type !== "function_call" || record.payload?.name !== "spawn_agent") return false;
        try {
            const args = parseJsonStrict(record.payload.arguments);
            return args.task_name === taskName && args.fork_turns === "none" &&
                args.model === "gpt-5.6-sol" && args.reasoning_effort === "ultra";
        } catch {
            return false;
        }
    });
    if (!spawn) fail(`${pointer}: coordinator lacks exact Sol-ultra fork_turns:none spawn for ${slot}`);
    const started = coordinatorRecords.find((record) => record.type === "event_msg" &&
        record.payload?.type === "sub_agent_activity" && record.payload?.kind === "started" &&
        record.payload?.agent_path === session.agent_path && record.payload?.agent_thread_id === session.session_id);
    if (!started) fail(`${pointer}: coordinator lacks matching started event for ${session.session_id}`);
}

function pathsOverlap(left, right) {
    const fromLeft = relative(left, right);
    const fromRight = relative(right, left);
    return fromLeft === "" || (!fromLeft.startsWith("..") && !isAbsolute(fromLeft)) || (!fromRight.startsWith("..") && !isAbsolute(fromRight));
}

const computedManifestHash = selfHash(manifest, "manifest_hash");
if (manifest.manifest_hash !== computedManifestHash) fail(`/manifest_hash: computed ${computedManifestHash}`);
if (manifest.authority_inputs?.p01_wave_contract_sha256 !== p01Contract?.sha256) {
    fail(`/authority_inputs/p01_wave_contract_sha256: expected ${p01Contract?.sha256}`);
}
if (manifest.adjudication?.wave_contract_sha256 !== p01Contract?.sha256) {
    fail(`/adjudication/wave_contract_sha256: expected ${p01Contract?.sha256}`);
}

const hostPath = resolve(root, manifest.authority_inputs?.host_capsule?.path ?? "");
if (!existsSync(hostPath)) {
    fail("/authority_inputs/host_capsule/path: missing canonical host capsule");
} else {
    const host = parseJsonStrict(readFileSync(hostPath));
    const authority = manifest.authority_inputs.host_capsule;
    if (fileHash(hostPath) !== authority.file_sha256) fail("/authority_inputs/host_capsule/file_sha256: host capsule drift");
    if (host.manifest_hash !== authority.manifest_hash) fail("/authority_inputs/host_capsule/manifest_hash: internal host hash drift");
    if (host.bbnf?.commit !== authority.bbnf_commit) fail("/authority_inputs/host_capsule/bbnf_commit: host pin drift");
    if (host.parse_that?.commit !== authority.parse_that_commit) fail("/authority_inputs/host_capsule/parse_that_commit: host pin drift");
    if (host.parse_that?.packed_tarball_sha256 !== authority.packed_parse_that_sha256) fail("/authority_inputs/host_capsule/packed_parse_that_sha256: host artifact drift");
    if (host.imports_active_novelty !== false || authority.imports_active_novelty !== false) fail("/authority_inputs/host_capsule/imports_active_novelty: active novelty is forbidden");
}

const cssAuthority = manifest.authority_inputs?.css_module_isomorphism;
const cssAuthorityPath = resolve(root, cssAuthority?.path ?? "");
if (!existsSync(cssAuthorityPath)) {
    fail("/authority_inputs/css_module_isomorphism/path: missing canonical module authority");
} else {
    const isomorphism = parseJsonStrict(readFileSync(cssAuthorityPath));
    if (fileHash(cssAuthorityPath) !== cssAuthority.file_sha256) fail("/authority_inputs/css_module_isomorphism/file_sha256: authority drift");
    if (isomorphism.manifest_hash !== cssAuthority.manifest_hash) fail("/authority_inputs/css_module_isomorphism/manifest_hash: internal manifest drift");
    if (isomorphism.source?.commit !== cssAuthority.source_commit) fail("/authority_inputs/css_module_isomorphism/source_commit: source pin drift");
    if (isomorphism.modules?.length !== cssAuthority.module_count) fail("/authority_inputs/css_module_isomorphism/module_count: module vector drift");
    const validation = spawnSync(process.execPath, [cssModuleValidatorPath], {
        cwd: resolve(root, "../../../.."),
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
    });
    if (validation.status !== 0) fail(`/authority_inputs/css_module_isomorphism: executable validation failed: ${(validation.stderr || validation.stdout).trim()}`);
}

const expectedFormationSources = [
    "CSS-MODULE-ISOMORPHISM.json",
    "SEED-ROW-INVENTORY.json",
    "bbnf-host-control.schema.json",
    "css-module-isomorphism.schema.json",
    "p01-access-projection.schema.json",
    "p01-css-corpus.schema.json",
    "p01-differential-ledger.schema.json",
    "p01-grammar-oracle-proposal.schema.json",
    "p01-independent-authorship.schema.json",
    "p01-input-epoch.schema.json",
    "p01-origin-ledger.schema.json",
    "p01-typescript-combinators-proposal.schema.json",
    "parse-that-package-receipt.schema.json",
    "tools/p01-structural-contract.mjs",
    "tools/validate-bbnf-host-control.mjs",
    "tools/validate-css-module-isomorphism.mjs",
    "tools/validate-p01-authorship.mjs",
    "tools/validate-parse-that-package-receipt.mjs",
];
const formationSources = manifest.authority_inputs?.formation_sources ?? [];
const formationPaths = formationSources.map(({ path }) => path).sort();
if (canonicalize(formationPaths) !== canonicalize(expectedFormationSources)) {
    fail(`/authority_inputs/formation_sources: expected exact ${expectedFormationSources.join(",")}`);
}
for (const [index, evidence] of formationSources.entries()) {
    const path = resolve(root, evidence.path);
    const fromRoot = relative(root, path);
    if (isAbsolute(evidence.path) || fromRoot.startsWith("..") || isAbsolute(fromRoot)) {
        fail(`/authority_inputs/formation_sources/${index}/path: must remain within formation root`);
    } else if (!existsSync(path) || !statSync(path).isFile()) {
        fail(`/authority_inputs/formation_sources/${index}/path: file does not exist`);
    } else if (fileHash(path) !== evidence.sha256) {
        fail(`/authority_inputs/formation_sources/${index}/sha256: source drift`);
    }
}

if ((manifest.author_receipts ?? []).length > 2) fail("/author_receipts: at most two receipts are legal");
if (manifest.state === "born_red") {
    if ((manifest.author_receipts ?? []).length !== 0) fail("/author_receipts: canonical born-RED authority cannot claim future authorship");
    if (manifest.execution_input_epoch?.state !== "pending") fail("/execution_input_epoch: born-RED authority must remain pending");
    if (manifest.adjudication?.receipt?.state !== "pending") fail("/adjudication/receipt: born-RED authority must remain pending");
}

let epoch;
let executionIsomorphism;
let originLedger;
let cssCorpus;
let predecessorRecords = new Map();
if (manifest.execution_input_epoch?.state === "frozen") {
    const binding = manifest.execution_input_epoch;
    epoch = parseBoundJson({ path: binding.path, sha256: binding.file_sha256 }, "/execution_input_epoch");
    if (epoch) {
        const requiredEpochPath = resolve(root, "../../../..", "test/proof/p01/input-epoch.json");
        if (binding.path !== requiredEpochPath) fail(`/execution_input_epoch/path: expected ${requiredEpochPath}`);
        for (const error of validateJsonSchema(epoch, epochSchema)) fail(`/execution_input_epoch/file${error}`);
        const computed = selfHash(epoch, "epoch_hash");
        if (epoch.epoch_hash !== computed || binding.epoch_hash !== computed) fail(`/execution_input_epoch/epoch_hash: computed ${computed}`);
        if (epoch.wave_contract_sha256 !== p01Contract?.sha256) fail("/execution_input_epoch/wave_contract_sha256: P01 contract drift");
        const clearance = epoch.coordination_clearance;
        verifyFile(clearance?.stream, "/execution_input_epoch/coordination_clearance/stream");
        verifyFile(clearance?.validator_stdout, "/execution_input_epoch/coordination_clearance/validator_stdout");
        let coordinationStream;
        if (clearance?.stream?.path !== canonicalCoordinationPath) fail(`/execution_input_epoch/coordination_clearance/stream/path: expected ${canonicalCoordinationPath}`);
        if (clearance?.stream?.path && existsSync(clearance.stream.path)) {
            coordinationStream = parseJsonStrict(readFileSync(clearance.stream.path));
            for (const error of validateJsonSchema(coordinationStream, coordinationSchema)) fail(`/execution_input_epoch/coordination_clearance/stream${error}`);
            const tip = coordinationStream.events?.at(-1);
            if (tip?.kind !== "snapshot" || tip?.wave_id !== "P00") fail("/execution_input_epoch/coordination_clearance: latest tip must be a P00 snapshot");
            if (tip?.sequence !== clearance.tip_sequence || tip?.event_sha256 !== clearance.tip_event_sha256) fail("/execution_input_epoch/coordination_clearance: tip binding mismatch");
            for (const name of ["parse_that", "bbnf_lang"]) {
                const expected = clearance[name];
                const actual = tip?.pins?.[name];
                verifyDirectory(expected?.path, `/execution_input_epoch/coordination_clearance/${name}/path`);
                for (const field of ["path", "branch", "head", "dirty_sha256"]) {
                    if (expected?.[field] !== actual?.[field]) fail(`/execution_input_epoch/coordination_clearance/${name}/${field}: tip pin mismatch`);
                }
            }
        }
        if (clearance?.validator_stdout?.path && existsSync(clearance.validator_stdout.path)) {
            const receipt = parseJsonStrict(readFileSync(clearance.validator_stdout.path));
            if (receipt.snapshot_current !== true || receipt.evidence_current !== true || receipt.tip !== clearance.tip_event_sha256) {
                fail("/execution_input_epoch/coordination_clearance/validator_stdout: does not prove the exact current tip");
            }
        }
        const liveClearance = spawnSync(process.execPath, [coordinationValidatorPath, "--require-current"], {
            cwd: resolve(root, "../../../.."),
            encoding: "utf8",
            maxBuffer: 64 * 1024 * 1024,
        });
        if (liveClearance.status !== 0) {
            fail(`/execution_input_epoch/coordination_clearance: live current-state validation failed: ${liveClearance.stderr.trim()}`);
        } else {
            const liveReceipt = parseJsonStrict(liveClearance.stdout);
            if (liveReceipt.tip !== clearance?.tip_event_sha256 || liveReceipt.snapshot_current !== true || liveReceipt.evidence_current !== true) {
                fail("/execution_input_epoch/coordination_clearance: live validator did not return the exact bound current tip");
            }
        }

        const predecessorIds = (epoch.predecessor_returns ?? []).map(({ wave_id }) => wave_id).sort();
        if (canonicalize(predecessorIds) !== canonicalize(["P00", "V01", "V02"])) fail("/execution_input_epoch/predecessor_returns: expected exact P00,V01,V02");
        predecessorRecords = new Map();
        for (const [index, predecessor] of (epoch.predecessor_returns ?? []).entries()) {
            verifyFile({ path: predecessor.path, sha256: predecessor.file_sha256 }, `/execution_input_epoch/predecessor_returns/${index}`);
            if (existsSync(predecessor.path)) {
                const returned = parseJsonStrict(readFileSync(predecessor.path));
                predecessorRecords.set(predecessor.wave_id, returned);
                if (returned.wave_id !== predecessor.wave_id || returned.return_hash !== predecessor.return_hash || returned.scope?.wave_contract_sha256 !== predecessor.wave_contract_sha256) {
                    fail(`/execution_input_epoch/predecessor_returns/${index}: predecessor return binding mismatch`);
                }
                const live = spawnSync(process.execPath, [returnValidatorPath, predecessor.path], {
                    encoding: "utf8",
                    maxBuffer: 128 * 1024 * 1024,
                });
                if (live.status !== 0 || !live.stdout.includes('"completion_eligible":true')) {
                    fail(`/execution_input_epoch/predecessor_returns/${index}: universal live terminal validation failed: ${(live.stderr || live.stdout).trim()}`);
                }
            }
        }
        const p00 = predecessorRecords.get("P00");
        if (p00 && coordinationStream) {
            const tip = coordinationStream.events.at(-1);
            for (const name of ["value_js", "parse_that", "bbnf_lang"]) {
                const eventPin = tip.pins[name];
                const returnPin = (p00.pins ?? []).find(({ path }) => path === eventPin.path);
                if (!returnPin || returnPin.branch !== eventPin.branch || returnPin.head !== eventPin.head || returnPin.dirty_after_sha256 !== eventPin.dirty_sha256) {
                    fail(`/execution_input_epoch/coordination_clearance/${name}: P00 return and current tip pins differ`);
                }
            }
            const committedValue = epoch.committed_value;
            if (committedValue?.repository !== tip.pins.value_js.path || committedValue?.commit !== tip.pins.value_js.head) {
                fail("/execution_input_epoch/committed_value: must bind the exact committed Value tree at the current P00 coordination tip");
            }
            const valueTreeHash = committedTreeHash(committedValue?.repository, committedValue?.commit, "/execution_input_epoch/committed_value");
            if (valueTreeHash && committedValue.committed_tree_sha256 !== valueTreeHash) fail(`/execution_input_epoch/committed_value/committed_tree_sha256: computed ${valueTreeHash}`);
        }
        for (const [name, evidence] of [["host_capsule", epoch.host_capsule], ["standards_lock", epoch.standards_lock], ["value_css_signatures", epoch.value_css_signatures]]) {
            verifyFile(evidence, `/execution_input_epoch/${name}`);
        }
        verifyFile({ path: epoch.css_module_isomorphism?.path, sha256: epoch.css_module_isomorphism?.file_sha256 }, "/execution_input_epoch/css_module_isomorphism");
        verifyFile({ path: epoch.css_corpus?.path, sha256: epoch.css_corpus?.file_sha256 }, "/execution_input_epoch/css_corpus");
        verifyFile({ path: epoch.shared_inputs?.path, sha256: epoch.shared_inputs?.file_sha256 }, "/execution_input_epoch/shared_inputs");
        const unionFreeze = epoch.bbnf_css_union_freeze;
        const coordinatedUnionFreeze = coordinationStream?.events?.at(-1)?.css_union_freeze;
        if (!coordinatedUnionFreeze) fail("/execution_input_epoch/bbnf_css_union_freeze: latest P00 coordination snapshot has no terminal CSS-union freeze");
        else if (canonicalize(unionFreeze) !== canonicalize({ ...coordinatedUnionFreeze, snapshot_event_sha256: clearance?.tip_event_sha256 })) {
            fail("/execution_input_epoch/bbnf_css_union_freeze: must equal the latest P00 coordination event's exact CSS-union freeze");
        }
        if (unionFreeze?.bbnf_commit !== clearance?.bbnf_lang?.head) fail("/execution_input_epoch/bbnf_css_union_freeze/bbnf_commit: must equal the current coordination BBNF pin");
        if (unionFreeze?.module_manifest_sha256 !== epoch.css_module_isomorphism?.file_sha256) fail("/execution_input_epoch/bbnf_css_union_freeze/module_manifest_sha256: must bind the exact execution module manifest bytes");
        const parseThatPackage = epoch.parse_that_package;
        const packageReceipt = parseBoundJson(parseThatPackage?.receipt, "/execution_input_epoch/parse_that_package/receipt");
        if (packageReceipt) {
            if (packageReceipt.receipt_hash !== parseThatPackage.receipt_hash) fail("/execution_input_epoch/parse_that_package/receipt_hash: internal receipt mismatch");
            const packageProjection = {
                name: packageReceipt.package?.name,
                version: packageReceipt.package?.version,
                registry_spec: packageReceipt.package?.registry_spec,
                integrity: packageReceipt.package?.integrity,
                receipt: parseThatPackage.receipt,
                receipt_hash: packageReceipt.receipt_hash,
                tarball_sha256: packageReceipt.tarball?.sha256,
                files_sha256: packageReceipt.archive?.files_sha256,
                runtime_files_sha256: packageReceipt.archive?.runtime_files_sha256,
                declaration_files_sha256: packageReceipt.archive?.declaration_files_sha256,
                export_conditions_sha256: packageReceipt.archive?.export_conditions_sha256,
                no_link_tree_sha256: packageReceipt.install?.tree_sha256,
            };
            if (canonicalize(parseThatPackage) !== canonicalize(packageProjection)) {
                fail("/execution_input_epoch/parse_that_package: epoch does not exactly project the published-package receipt");
            }
            const packageValidation = spawnSync(process.execPath, [packageReceiptValidatorPath, "--receipt", parseThatPackage.receipt.path], {
                cwd: resolve(root, "../../../.."),
                encoding: "utf8",
                maxBuffer: 64 * 1024 * 1024,
            });
            if (packageValidation.status !== 0) {
                fail(`/execution_input_epoch/parse_that_package: live package validation failed: ${(packageValidation.stderr || packageValidation.stdout).trim()}`);
            } else {
                try {
                    const validationReceipt = parseJsonStrict(packageValidation.stdout);
                    if (validationReceipt.receipt_hash !== parseThatPackage.receipt_hash || validationReceipt.package !== "@mkbabb/parse-that@1.0.0") {
                        fail("/execution_input_epoch/parse_that_package: validator stdout does not bind the exact receipt/package");
                    }
                } catch (error) {
                    fail(`/execution_input_epoch/parse_that_package: validator stdout is not strict JSON (${error.message})`);
                }
            }
            const p00Package = predecessorRecords.get("P00")?.annexes?.parser?.package;
            if (!p00Package) fail("/execution_input_epoch/parse_that_package: P00 return lacks the typed parser package annex");
            else {
                const expected = {
                    name: packageReceipt.package?.name,
                    version: packageReceipt.package?.version,
                    branch: "unchanged-1.0.0-no-republish",
                    integrity: packageReceipt.package?.integrity,
                    tarball_sha256: packageReceipt.tarball?.sha256,
                    file_manifest_sha256: packageReceipt.archive?.files_sha256,
                    runtime_exports_sha256: packageReceipt.archive?.runtime_files_sha256,
                    declarations_sha256: packageReceipt.archive?.declaration_files_sha256,
                    export_conditions_sha256: packageReceipt.archive?.export_conditions_sha256,
                    no_link_install_sha256: packageReceipt.install?.tree_sha256,
                };
                if (canonicalize(p00Package) !== canonicalize(expected)) fail("/execution_input_epoch/parse_that_package: P00 parser annex does not exactly project the validated registry receipt");
            }
        }
        verifyFile(epoch.coordinator_transcript, "/execution_input_epoch/coordinator_transcript");
        if (!codexSessionPath.test(epoch.coordinator_transcript?.path ?? "")) fail("/execution_input_epoch/coordinator_transcript/path: must be a canonical Codex rollout JSONL");
        if (epoch.host_capsule?.sha256 !== manifest.authority_inputs.host_capsule.file_sha256) fail("/execution_input_epoch/host_capsule: must use the authorized capsule bytes");
        originLedger = parseBoundJson(
            { path: epoch.shared_inputs?.path, sha256: epoch.shared_inputs?.file_sha256 },
            "/execution_input_epoch/shared_inputs",
        );
        if (originLedger) {
            for (const error of validateJsonSchema(originLedger, structuralSchemas.originLedger)) fail(`/execution_input_epoch/shared_inputs${error}`);
            const computed = selfHash(originLedger, "ledger_hash");
            if (originLedger.ledger_hash !== computed || epoch.shared_inputs.ledger_hash !== computed) fail(`/execution_input_epoch/shared_inputs/ledger_hash: computed ${computed}`);
            for (const [index, artifact] of (originLedger.shared_artifacts ?? []).entries()) {
                verifyFile({ path: artifact.path, sha256: artifact.sha256 }, `/execution_input_epoch/shared_inputs/shared_artifacts/${index}`);
                if (isForbiddenP01InputPath(artifact.path)) fail(`/execution_input_epoch/shared_inputs/shared_artifacts/${index}/path: active T/U/parse-that-bank input is forbidden`);
                const lineageWave = {
                    "host-capsule": "P00",
                    "css-execution-manifest": "P00",
                    "css-corpus": "P00",
                    "standards-lock": "V01",
                    "value-css-signatures": "V02",
                    "parse-that-package-receipt": "P00",
                }[artifact.id];
                if (lineageWave) {
                    const matches = (predecessorRecords.get(lineageWave)?.evidence_inputs ?? []).filter((input) =>
                        input.path === artifact.path && input.sha256 === artifact.sha256);
                    if (matches.length !== 1) fail(`/execution_input_epoch/shared_inputs/shared_artifacts/${index}: ${lineageWave} return must content-address this exact shared artifact once`);
                }
            }
            const valueOrigin = originLedger.origins?.value_commit;
            const valueTreeHash = committedTreeHash(valueOrigin?.repository, valueOrigin?.commit, "/execution_input_epoch/shared_inputs/origins/value_commit");
            if (valueTreeHash && valueOrigin.committed_tree_sha256 !== valueTreeHash) fail(`/execution_input_epoch/shared_inputs/origins/value_commit/committed_tree_sha256: computed ${valueTreeHash}`);
            const bbnfOrigin = originLedger.origins?.bbnf_terminal_freeze;
            const bbnfTreeHash = committedTreeHash(bbnfOrigin?.repository, bbnfOrigin?.commit, "/execution_input_epoch/shared_inputs/origins/bbnf_terminal_freeze");
            if (bbnfTreeHash && bbnfOrigin.committed_tree_sha256 !== bbnfTreeHash) fail(`/execution_input_epoch/shared_inputs/origins/bbnf_terminal_freeze/committed_tree_sha256: computed ${bbnfTreeHash}`);
        }
        cssCorpus = parseBoundJson(
            { path: epoch.css_corpus?.path, sha256: epoch.css_corpus?.file_sha256 },
            "/execution_input_epoch/css_corpus",
        );
        if (cssCorpus) {
            for (const error of validateJsonSchema(cssCorpus, structuralSchemas.cssCorpus)) fail(`/execution_input_epoch/css_corpus${error}`);
            const computed = selfHash(cssCorpus, "corpus_hash");
            if (cssCorpus.corpus_hash !== computed || epoch.css_corpus.corpus_hash !== computed) fail(`/execution_input_epoch/css_corpus/corpus_hash: computed ${computed}`);
            for (const [index, corpusCase] of (cssCorpus.cases ?? []).entries()) {
                verifyFile(corpusCase.fixture, `/execution_input_epoch/css_corpus/cases/${index}/fixture`);
                if (isForbiddenP01InputPath(corpusCase.fixture?.path)) fail(`/execution_input_epoch/css_corpus/cases/${index}/fixture/path: active T/U/parse-that-bank input is forbidden`);
            }
        }
        if (epoch.css_module_isomorphism?.path && existsSync(epoch.css_module_isomorphism.path)) {
            executionIsomorphism = parseBoundJson(
                { path: epoch.css_module_isomorphism.path, sha256: epoch.css_module_isomorphism.file_sha256 },
                "/execution_input_epoch/css_module_isomorphism",
            );
            const requiredExecutionPath = resolve(root, "../../../..", "test/proof/p00/css-module-isomorphism.execution.json");
            if (epoch.css_module_isomorphism.path !== requiredExecutionPath) fail(`/execution_input_epoch/css_module_isomorphism/path: expected ${requiredExecutionPath}`);
            if (epoch.css_module_isomorphism.path === cssAuthorityPath) fail("/execution_input_epoch/css_module_isomorphism/path: formation receipt cannot authorize execution");
            if (!executionIsomorphism) {
                fail("/execution_input_epoch/css_module_isomorphism: strict execution manifest is unavailable");
            } else {
            if (executionIsomorphism.authority?.snapshot_kind !== "execution-input") fail("/execution_input_epoch/css_module_isomorphism: must be a fresh execution-input snapshot");
            if (executionIsomorphism.source?.commit !== clearance?.bbnf_lang?.head) fail("/execution_input_epoch/css_module_isomorphism: source commit must equal the current coordination BBNF pin");
            if (executionIsomorphism.source?.commit === manifest.authority_inputs.css_module_isomorphism.source_commit) fail("/execution_input_epoch/css_module_isomorphism: formation/current RED BBNF W0 commit is forbidden as execution authority");
            if (executionIsomorphism.manifest_hash !== epoch.css_module_isomorphism.manifest_hash) fail("/execution_input_epoch/css_module_isomorphism/manifest_hash: internal execution manifest mismatch");
            if (executionIsomorphism.source?.commit !== epoch.css_module_isomorphism.bbnf_commit) fail("/execution_input_epoch/css_module_isomorphism/bbnf_commit: execution source mismatch");
            for (const field of ["runtime_modules_sha256", "excluded_dispositions_sha256", "resolved_edges_sha256"]) {
                if (executionIsomorphism.authority?.[field] !== unionFreeze?.[field]) fail(`/execution_input_epoch/css_module_isomorphism/authority/${field}: must equal the upstream CSS-union freeze vector`);
                if (epoch.css_module_isomorphism[field] !== unionFreeze?.[field]) fail(`/execution_input_epoch/css_module_isomorphism/${field}: epoch binding must equal the upstream CSS-union freeze vector`);
            }
            const executionValidation = spawnSync(process.execPath, [cssModuleValidatorPath, "--manifest", epoch.css_module_isomorphism.path], {
                cwd: resolve(root, "../../../.."),
                encoding: "utf8",
                maxBuffer: 16 * 1024 * 1024,
            });
            if (executionValidation.status !== 0) fail(`/execution_input_epoch/css_module_isomorphism: executable validation failed: ${(executionValidation.stderr || executionValidation.stdout).trim()}`);
            }
        }
    }
}

const authors = manifest.author_receipts ?? [];
let coordinatorRecords = [];
let coordinatorProjection;
if (epoch?.coordinator_transcript?.path && existsSync(epoch.coordinator_transcript.path)) {
    coordinatorRecords = jsonLines(epoch.coordinator_transcript.path, "/execution_input_epoch/coordinator_transcript");
    coordinatorProjection = accessProjection(coordinatorRecords, epoch.coordinator_session_id, epoch.coordinator_transcript.sha256);
}
const authorTranscriptProofs = [];
const proposalProofs = new Map();
for (const [index, author] of authors.entries()) {
    const pointer = `/author_receipts/${index}`;
    const computed = selfHash(author, "receipt_hash");
    if (author.receipt_hash !== computed) fail(`${pointer}/receipt_hash: computed ${computed}`);
    if (author.session?.ancestry_session_ids?.includes(author.session.session_id) !== true) fail(`${pointer}/session/ancestry_session_ids: must include its own session ID`);
    const exactAncestry = [epoch?.coordinator_session_id, author.session?.session_id].filter(Boolean).sort();
    if (canonicalize([...(author.session?.ancestry_session_ids ?? [])].sort()) !== canonicalize(exactAncestry)) {
        fail(`${pointer}/session/ancestry_session_ids: must contain exactly self and the input-epoch coordinator`);
    }
    verifyFile(author.report, `${pointer}/report`);
    const roleManifest = parseBoundJson(author.proposal?.manifest, `${pointer}/proposal/manifest`);
    if (roleManifest) {
        const roleSchema = author.slot === "grammar-oracle"
            ? structuralSchemas.grammarOracle
            : author.slot === "typescript-combinators"
                ? structuralSchemas.typescriptCombinators
                : undefined;
        if (!roleSchema) fail(`${pointer}/slot: unknown proposal role`);
        else for (const error of validateJsonSchema(roleManifest, roleSchema)) fail(`${pointer}/proposal/manifest${error}`);
        const computedRoleHash = selfHash(roleManifest, "manifest_hash");
        if (roleManifest.manifest_hash !== computedRoleHash || author.proposal?.manifest_hash !== computedRoleHash) {
            fail(`${pointer}/proposal/manifest_hash: computed ${computedRoleHash}`);
        }
        if (roleManifest.slot !== author.slot) fail(`${pointer}/proposal/manifest/slot: must equal receipt slot`);
        if (author.proposal?.manifest?.path !== resolve(author.proposal?.root ?? "/", "proposal.manifest.json")) {
            fail(`${pointer}/proposal/manifest/path: immutable manifest must be proposal-root/proposal.manifest.json`);
        }
        proposalProofs.set(author.slot, { binding: author.proposal, manifest: roleManifest });
        if (author.slot === "typescript-combinators") {
            verifyDirectory(roleManifest.typescript_root, `${pointer}/proposal/typescript_root`);
            for (const [moduleIndex, module] of (roleManifest.modules ?? []).entries()) {
                const relativePath = module.typescript_path?.replace(/^src\/css\/grammar\//, "");
                const path = relativePath && resolve(roleManifest.typescript_root, relativePath);
                verifyFile({ path, sha256: module.sha256 }, `${pointer}/proposal/modules/${moduleIndex}`);
            }
        } else if (author.slot === "grammar-oracle") {
            verifyDirectory(roleManifest.test_root, `${pointer}/proposal/test_root`);
            verifyDirectory(roleManifest.fixture_root, `${pointer}/proposal/fixture_root`);
            for (const [testIndex, test] of (roleManifest.tests ?? []).entries()) {
                const relativePath = test.test_path?.replace(/^test\/src\/css\/grammar\//, "");
                const path = relativePath && resolve(roleManifest.test_root, relativePath);
                verifyFile({ path, sha256: test.sha256 }, `${pointer}/proposal/tests/${testIndex}`);
            }
            for (const [fixtureIndex, fixture] of (roleManifest.fixtures ?? []).entries()) {
                const path = fixture.fixture_path && resolve(roleManifest.fixture_root, fixture.fixture_path);
                verifyFile({ path, sha256: fixture.sha256 }, `${pointer}/proposal/fixtures/${fixtureIndex}`);
            }
        }
    }
    const expectedPath = manifest.authorship_contract?.agent_paths?.[author.slot];
    if (author.session?.agent_path !== expectedPath) fail(`${pointer}/session/agent_path: expected ${expectedPath}`);
    const transcriptProof = verifyChildTranscript(
        author.session,
        `P01_AUTHOR_SLOT=${author.slot}`,
        author.frozen_input_epoch_sha256,
        author.report,
        `${pointer}/session`,
        author,
    );
    authorTranscriptProofs[index] = transcriptProof;
    if (transcriptProof?.projection) {
        verifyAccessProjection(author.access_log, transcriptProof.projection, `${pointer}/access_log`);
        if (canonicalize([...(author.observed_read_paths ?? [])].sort()) !== canonicalize(transcriptProof.projection.observed_paths)) {
            fail(`${pointer}/observed_read_paths: must equal the exact transcript-derived projection`);
        }
    }
    for (const [pathIndex, path] of (author.observed_read_paths ?? []).entries()) {
        if (isForbiddenP01InputPath(path)) fail(`${pointer}/observed_read_paths/${pathIndex}: active T/U/parse-that-bank input is forbidden`);
    }
    if (coordinatorRecords.length) verifyCoordinatorSpawn(author.session, author.slot, coordinatorRecords, `${pointer}/session`);
    const started = Date.parse(author.freeze_started_at);
    const finished = Date.parse(author.freeze_finished_at);
    if (!Number.isFinite(started) || !Number.isFinite(finished) || finished < started) fail(`${pointer}/freeze_finished_at: must not precede freeze start`);
    if (!epoch || author.frozen_input_epoch_sha256 !== epoch?.epoch_hash) fail(`${pointer}/frozen_input_epoch_sha256: must equal the one frozen execution epoch`);
    if (verifyDirectory(author.proposal?.root, `${pointer}/proposal/root`)) {
        const canonical = author.proposal.root;
        if (!/^\/(?:[A-Za-z0-9._~@%+,:=-]+\/)*[A-Za-z0-9._~@%+,:=-]+$/.test(canonical)) {
            fail(`${pointer}/proposal/root: must be a non-root, whitespace-free path visible to the transcript projection`);
        }
        try {
            const actualEntries = treeEntries(canonical).sort((left, right) => compareCanonicalText(left.path, right.path));
            const roleManifest = proposalProofs.get(author.slot)?.manifest;
            const expectedEntries = [
                { path: "proposal.manifest.json", sha256: author.proposal?.manifest?.sha256 },
                ...(author.slot === "typescript-combinators"
                    ? (roleManifest?.modules ?? []).map(({ typescript_path, sha256 }) => ({ path: typescript_path, sha256 }))
                    : []),
                ...(author.slot === "grammar-oracle"
                    ? [
                        ...(roleManifest?.tests ?? []).map(({ test_path, sha256 }) => ({ path: test_path, sha256 })),
                        ...(roleManifest?.fixtures ?? []).map(({ fixture_path, sha256 }) => ({ path: `fixtures/${fixture_path}`, sha256 })),
                    ]
                    : []),
            ].sort((left, right) => compareCanonicalText(left.path, right.path));
            if (canonicalize(actualEntries) !== canonicalize(expectedEntries)) {
                fail(`${pointer}/proposal: artifact tree must contain exactly the immutable role manifest and every declared role artifact`);
            }
            const computedTree = sha256(canonicalize(actualEntries));
            if (computedTree !== author.proposal.artifact_tree_sha256) fail(`${pointer}/proposal/artifact_tree_sha256: computed ${computedTree}`);
        } catch (error) {
            fail(`${pointer}/proposal: ${error.message}`);
        }
    }
}

if (manifest.state === "complete") {
    if (authors.length !== 2) fail("/author_receipts: complete authority requires exactly two authors");
    const slots = authors.map(({ slot }) => slot).sort();
    if (canonicalize(slots) !== canonicalize(["grammar-oracle", "typescript-combinators"])) fail("/author_receipts: exact author slots are grammar-oracle and typescript-combinators");
    const uniqueFields = [
        ["session identity", authors.map(({ session }) => session.session_id)],
        ["transcript", authors.map(({ session }) => session.transcript.path)],
        ["transcript hash", authors.map(({ session }) => session.transcript.sha256)],
        ["report", authors.map(({ report }) => report.path)],
        ["report hash", authors.map(({ report }) => report.sha256)],
        ["access log", authors.map(({ access_log }) => access_log.path)],
        ["access-log hash", authors.map(({ access_log }) => access_log.sha256)],
        ["proposal root", authors.map(({ proposal }) => proposal.root)],
        ["proposal manifest", authors.map(({ proposal }) => proposal.manifest.path)],
        ["proposal-manifest hash", authors.map(({ proposal }) => proposal.manifest.sha256)],
        ["proposal internal hash", authors.map(({ proposal }) => proposal.manifest_hash)],
        ["proposal artifact hash", authors.map(({ proposal }) => proposal.artifact_tree_sha256)],
    ];
    for (const [name, values] of uniqueFields) if (new Set(values).size !== 2) fail(`/author_receipts: ${name} is reused`);
    const ancestry = authors.map(({ session }) => new Set(session.ancestry_session_ids));
    const commonAncestry = [...ancestry[0]].filter((id) => ancestry[1].has(id)).sort();
    if (canonicalize(commonAncestry) !== canonicalize([epoch?.coordinator_session_id])) {
        fail("/author_receipts: common ancestry must be exactly the input-epoch coordinator session");
    }
    if (ancestry[0].has(authors[1].session.session_id) || ancestry[1].has(authors[0].session.session_id)) {
        fail("/author_receipts: author-to-author ancestry is forbidden");
    }
    if (authors[0]?.proposal?.root && authors[1]?.proposal?.root && pathsOverlap(authors[0].proposal.root, authors[1].proposal.root)) fail("/author_receipts: proposal roots overlap");
    const authorStarts = authors.map(({ session_started_at }) => Date.parse(session_started_at));
    const freezeStarts = authors.map(({ freeze_started_at }) => Date.parse(freeze_started_at));
    if (Math.max(...authorStarts) > Math.min(...freezeStarts)) fail("/author_receipts: both author sessions must start before either proposal freeze begins");
    const bothFrozenAt = Math.max(...authors.map(({ freeze_finished_at }) => Date.parse(freeze_finished_at)));
    const projectionDiscloses = (projection, peerRoot) => [...(projection?.tool_calls ?? []), ...(projection?.tool_outputs ?? []), ...(projection?.messages ?? [])].some((entry) =>
        Date.parse(entry.timestamp) < bothFrozenAt && entry.observed_paths.some((path) => pathsOverlap(peerRoot, path)),
    );
    for (let index = 0; index < 2; index += 1) {
        const peerRoot = authors[1 - index].proposal.root;
        if (projectionDiscloses(authorTranscriptProofs[index]?.projection, peerRoot)) {
            fail(`/author_receipts/${index}/access_log: recorded tool/message projection disclosed the peer proposal before both freezes`);
        }
        if (projectionDiscloses(coordinatorProjection, peerRoot)) {
            fail(`/execution_input_epoch/coordinator_transcript: coordinator disclosed a peer proposal before both freezes`);
        }
    }

    const adjudication = manifest.adjudication?.receipt;
    if (adjudication?.state !== "complete") {
        fail("/adjudication/receipt: complete authority requires adjudication");
    } else {
        const computed = selfHash(adjudication, "receipt_hash");
        if (adjudication.receipt_hash !== computed) fail(`/adjudication/receipt/receipt_hash: computed ${computed}`);
        if (authors.some(({ session }) => session.session_id === adjudication.session?.session_id)) fail("/adjudication/receipt/session: author session reuse forbidden");
        const adjudicationAncestry = [...(adjudication.session?.ancestry_session_ids ?? [])].sort();
        const expectedAdjudicationAncestry = [epoch.coordinator_session_id, adjudication.session?.session_id].sort();
        if (canonicalize(adjudicationAncestry) !== canonicalize(expectedAdjudicationAncestry)) fail("/adjudication/receipt/session/ancestry_session_ids: must contain exactly self and the input-epoch coordinator");
        const expectedHashes = authors.map(({ receipt_hash }) => receipt_hash).sort();
        if (canonicalize([...adjudication.frozen_author_receipt_hashes].sort()) !== canonicalize(expectedHashes)) fail("/adjudication/receipt/frozen_author_receipt_hashes: must bind both exact authors");
        const expectedProposalBindings = authors.map(({ slot, proposal }) => ({
            slot,
            path: proposal.manifest.path,
            file_sha256: proposal.manifest.sha256,
            manifest_hash: proposal.manifest_hash,
        })).sort((left, right) => compareCanonicalText(left.slot, right.slot));
        if (canonicalize([...(adjudication.frozen_proposal_manifests ?? [])].sort((left, right) => compareCanonicalText(left.slot, right.slot))) !== canonicalize(expectedProposalBindings)) {
            fail("/adjudication/receipt/frozen_proposal_manifests: must bind both exact immutable role manifests");
        }
        const latestFreeze = Math.max(...authors.map(({ freeze_finished_at }) => Date.parse(freeze_finished_at)));
        if (Date.parse(adjudication.started_at) < latestFreeze) fail("/adjudication/receipt/started_at: adjudication began before both freezes");
        if (adjudication.session?.agent_path !== manifest.authorship_contract.adjudicator_agent_path) fail("/adjudication/receipt/session/agent_path: wrong adjudicator path");
        const adjudicationProof = verifyChildTranscript(
            adjudication.session,
            "P01_ADJUDICATOR=independence",
            epoch.epoch_hash,
            adjudication.report,
            "/adjudication/receipt/session",
            undefined,
            expectedHashes,
            expectedProposalBindings,
        );
        if (adjudicationProof?.meta?.timestamp !== adjudication.started_at) fail("/adjudication/receipt/started_at: must equal the canonical adjudicator session start");
        if (coordinatorRecords.length) verifyCoordinatorSpawn(adjudication.session, "adjudicator", coordinatorRecords, "/adjudication/receipt/session");
        verifyFile(adjudication.report, "/adjudication/receipt/report");
        const differentialLedger = parseBoundJson(
            { path: adjudication.differential_ledger?.path, sha256: adjudication.differential_ledger?.file_sha256 },
            "/adjudication/receipt/differential_ledger",
        );
        if (differentialLedger) {
            const computedLedgerHash = selfHash(differentialLedger, "ledger_hash");
            if (differentialLedger.ledger_hash !== computedLedgerHash || adjudication.differential_ledger.ledger_hash !== computedLedgerHash) {
                fail(`/adjudication/receipt/differential_ledger/ledger_hash: computed ${computedLedgerHash}`);
            }
        }
        const structuralFailures = validateP01StructuralCompletion({
            authorshipManifest: manifest,
            epoch,
            executionManifest: executionIsomorphism,
            originLedger,
            cssCorpus,
            predecessorRecords: Object.fromEntries(predecessorRecords),
            proposals: {
                grammarOracle: proposalProofs.get("grammar-oracle"),
                typescriptCombinators: proposalProofs.get("typescript-combinators"),
            },
            differentialLedger,
            adjudicationProposalBindings: adjudication.frozen_proposal_manifests,
            schemas: structuralSchemas,
            forbiddenBbnfCommit: manifest.authority_inputs.css_module_isomorphism.source_commit,
        });
        for (const error of structuralFailures) fail(error);

        const oracleManifest = proposalProofs.get("grammar-oracle")?.manifest;
        const implementationManifest = proposalProofs.get("typescript-combinators")?.manifest;
        if (executionIsomorphism && oracleManifest && implementationManifest) {
            const pairedValidation = spawnSync(process.execPath, [
                cssModuleValidatorPath,
                "--manifest", epoch.css_module_isomorphism.path,
                "--typescript-root", implementationManifest.typescript_root,
                "--test-root", oracleManifest.test_root,
            ], {
                cwd: resolve(root, "../../../.."),
                encoding: "utf8",
                maxBuffer: 64 * 1024 * 1024,
            });
            if (pairedValidation.status !== 0) {
                fail(`/adjudication/receipt: paired CSS module validation failed: ${(pairedValidation.stderr || pairedValidation.stdout).trim()}`);
            } else {
                try {
                    const receipt = parseJsonStrict(pairedValidation.stdout);
                    if (receipt.filesystem_join !== true || receipt.manifest_hash !== epoch.css_module_isomorphism.manifest_hash) {
                        fail("/adjudication/receipt: paired CSS validator receipt does not bind the exact execution manifest and roots");
                    }
                } catch (error) {
                    fail(`/adjudication/receipt: paired CSS validator stdout is not strict JSON (${error.message})`);
                }
            }
        } else {
            fail("/adjudication/receipt: paired CSS module validation requires both parsed role manifests and the execution manifest");
        }
    }
}

if (requireComplete && manifest.state !== "complete") fail("/state: P01 authorship remains born RED; two actual authors and adjudication are required");

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(`${JSON.stringify({
    schema: manifest.schema,
    manifest_hash: computedManifestHash,
    state: manifest.state,
    author_receipts: authors.length,
    completion_eligible: manifest.state === "complete",
    p01_wave_contract_sha256: p01Contract.sha256,
    host_capsule_sha256: manifest.authority_inputs.host_capsule.file_sha256,
    css_module_manifest_sha256: manifest.authority_inputs.css_module_isomorphism.file_sha256,
})}\n`);
