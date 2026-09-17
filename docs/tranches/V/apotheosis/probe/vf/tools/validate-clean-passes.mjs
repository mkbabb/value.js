#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { userInfo } from "node:os";
import { isAbsolute, relative, resolve, sep } from "node:path";

import { cleanPassExclusions, computeCorpusEpoch, corpusRoot } from "./corpus-epoch.mjs";
import { forbiddenCorpusBasenames, walkCorpusFiles } from "./corpus-files.mjs";
import {
    adjudicatorPrompt,
    cleanActorTaskName,
    cleanAttestationProjection,
    cleanCoverage,
    cleanPromptSha256,
    criticPrompt,
} from "./clean-pass-prompts.mjs";
import {
    canonicalCleanStartSource,
    foldCleanExecRuns,
    renderCleanExecResult,
    selectActiveCoordinatorTurn,
    selectCleanReportBoundary,
    validateCleanReportHeadings,
    validateCleanReportCommands,
    validateCleanPersistPair,
    validateCleanPersistFileTimes,
    validateCleanCarrierJoin,
    validateCleanSpawnTriplet,
    validateCleanTranscriptSurface,
    validateCleanTerminalTail,
} from "./clean-exec-contract.mjs";
import { validateCleanCoordinatorCustody } from "./clean-coordinator-custody.mjs";
import { validateCleanProviderBootstrapAuthority } from "./clean-provider-bootstrap-authority.mjs";
import { canonicalize, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";

const manifestPath = resolve(corpusRoot, "FORMATION-CLEAN-PASSES.json");
const schemaPath = resolve(corpusRoot, "formation-clean-passes.schema.json");
const workspaceRoot = resolve(corpusRoot, "../../../..");
const failures = [];
const hashBytes = (bytes) => createHash("sha256").update(bytes).digest("hex");
const hashText = (value) => createHash("sha256").update(value, "utf8").digest("hex");
const fail = (message) => failures.push(message);
const accountHome = userInfo().homedir;
const configuredCodexRoot = resolve(accountHome, ".codex");
const configuredSessionRoot = resolve(accountHome, ".codex", "sessions");
if ([configuredCodexRoot, configuredSessionRoot].some((path) => path.split(/[\\/]+/).some((component) => forbiddenCorpusBasenames.has(component)))) {
    process.stderr.write("trusted session-store root contains a forbidden quarantine component\n");
    process.exit(1);
}
if (existsSync(configuredCodexRoot) && lstatSync(configuredCodexRoot).isSymbolicLink()) {
    process.stderr.write("trusted .codex root must not be a symlink\n");
    process.exit(1);
}
if (existsSync(configuredSessionRoot) && lstatSync(configuredSessionRoot).isSymbolicLink()) {
    process.stderr.write("trusted session-store root must not be a symlink\n");
    process.exit(1);
}
const sessionStoreRoot = existsSync(configuredSessionRoot) ? realpathSync(configuredSessionRoot) : configuredSessionRoot;
if (sessionStoreRoot.split(/[\\/]+/).some((component) => forbiddenCorpusBasenames.has(component))) {
    process.stderr.write("canonical session-store root contains a forbidden quarantine component\n");
    process.exit(1);
}

function decodeUtf8(bytes, pointer) {
    try {
        return decodeUtf8Strict(bytes);
    } catch (error) {
        fail(`${pointer}: invalid UTF-8 (${error.message})`);
        return "";
    }
}

function contained(base, candidate) {
    const rel = relative(base, candidate);
    return rel === "" || (!rel.startsWith(`..${sep}`) && rel !== ".." && !isAbsolute(rel));
}

function forbiddenComponents(base, candidate) {
    return relative(base, candidate).split(/[\\/]+/).some((component) => forbiddenCorpusBasenames.has(component));
}

function validateSessionPath(path, sessionId, pointer) {
    if (typeof path !== "string" || !isAbsolute(path) || !path.endsWith(".jsonl")) {
        fail(`${pointer}: must be an absolute JSONL path`);
        return false;
    }
    if (!contained(sessionStoreRoot, path) || forbiddenComponents(sessionStoreRoot, path) || !path.includes(sessionId ?? "<missing>")) {
        fail(`${pointer}: must lexically identify this session beneath trusted store ${sessionStoreRoot}`);
        return false;
    }
    if (!existsSync(path)) {
        fail(`${pointer}: missing ${path}`);
        return false;
    }
    const metadata = lstatSync(path);
    if (metadata.isSymbolicLink() || !metadata.isFile() || realpathSync(path) !== path) {
        fail(`${pointer}: must be a canonical regular file, never a symlink`);
        return false;
    }
    return true;
}

function executedCalls(records, pointer) {
    const calls = new Map();
    const outputs = new Map();
    for (const record of records) {
        if (record.value.type !== "response_item") continue;
        const payload = record.value.payload ?? {};
        if (payload.type === "custom_tool_call") {
            if (calls.has(payload.call_id)) fail(`${pointer}: duplicate tool call ID ${payload.call_id}`);
            calls.set(payload.call_id, {
                line: record.line,
                timestamp: record.value.timestamp,
                kind: payload.type,
                name: payload.name,
                input: payload.input,
                raw: record.value,
            });
        } else if (payload.type === "custom_tool_call_output") {
            if (outputs.has(payload.call_id)) fail(`${pointer}: duplicate tool output ID ${payload.call_id}`);
            outputs.set(payload.call_id, {
                line: record.line,
                timestamp: record.value.timestamp,
                kind: payload.type,
                value: payload.output,
                raw: record.value,
            });
        }
    }
    return { calls, outputs };
}

const allowedAuditCommands = new Set([
    "node docs/tranches/V/vnext/tools/corpus-epoch.mjs",
    "node docs/tranches/V/vnext/tools/validate-formation.mjs",
    "node docs/tranches/V/vnext/tools/validate-wave-contracts.mjs",
    "node docs/tranches/V/vnext/tools/selftest-formation-proof-layer.mjs",
    "node docs/tranches/V/vnext/tools/selftest-wave-edge-policy.mjs",
    "node docs/tranches/V/vnext/tools/validate-seed-inventory.mjs",
    "node docs/tranches/V/vnext/tools/validate-current-dags.mjs",
    "node docs/tranches/V/vnext/tools/validate-target-paths.mjs",
    "node docs/tranches/V/vnext/tools/validate-consumer-bounds.mjs",
    "node docs/tranches/V/vnext/tools/validate-api-target-paths.mjs",
    "node docs/tranches/V/vnext/tools/validate-api-contract.mjs",
    "node docs/tranches/V/vnext/tools/validate-api-return-coverage.mjs",
    "node docs/tranches/V/vnext/tools/validate-bbnf-host-control.mjs",
    "node docs/tranches/V/vnext/tools/validate-pt-coordination.mjs",
    "node docs/tranches/V/vnext/tools/validate-css-module-isomorphism.mjs",
    "node docs/tranches/V/vnext/tools/validate-p01-authorship.mjs",
    "node docs/tranches/V/vnext/tools/validate-seat-ledger.mjs",
    "node docs/tranches/V/vnext/tools/selftest-contracts.mjs",
    "node docs/tranches/V/vnext/tools/selftest-clean-exec-contract.mjs",
    "node docs/tranches/V/vnext/tools/clean-provider-bootstrap-authority.mjs",
    "node docs/tranches/V/vnext/tools/selftest-clean-provider-bootstrap-authority.mjs",
    "node docs/tranches/V/vnext/tools/selftest-clean-pass-prompts.mjs",
    "node docs/tranches/V/vnext/tools/selftest-clean-coordinator-custody.mjs",
    "node docs/tranches/V/vnext/tools/selftest-p01-authorship.mjs",
    "node docs/tranches/V/vnext/tools/selftest-p01-structural-contract.mjs",
    "node docs/tranches/V/vnext/tools/selftest-css-module-isomorphism.mjs",
    "node docs/tranches/V/vnext/tools/selftest-value-current-inventory.mjs",
    "node docs/tranches/V/vnext/tools/selftest-value-target-resolutions.mjs",
    "node docs/tranches/V/vnext/tools/selftest-value-public-surface.mjs",
    "node docs/tranches/V/vnext/tools/selftest-value-target-transpose.mjs",
    "node docs/tranches/V/vnext/tools/selftest-keyframes-current-inventory.mjs",
    "node docs/tranches/V/vnext/tools/selftest-keyframes-public-package.mjs",
    "node docs/tranches/V/vnext/tools/selftest-keyframes-target-transpose.mjs",
    "node docs/tranches/V/vnext/tools/selftest-target-paths.mjs",
    "node docs/tranches/V/vnext/tools/selftest-consumer-universe.mjs",
    "node docs/tranches/V/vnext/tools/selftest-deletion-truth.mjs",
    "node docs/tranches/V/vnext/tools/selftest-deletion-judgment.mjs",
    "node docs/tranches/V/vnext/tools/selftest-reopenings.mjs",
    "node docs/tranches/V/vnext/tools/selftest-canonical-order.mjs",
    "node docs/tranches/V/vnext/tools/selftest-corpus-safety.mjs",
]);

function canonicalExecSource(command) {
    return canonicalCleanStartSource(command, workspaceRoot);
}

function auditCommandAllowed(command) {
    if (allowedAuditCommands.has(command)) return true;
    const evidence = command.match(/^node docs\/tranches\/V\/vnext\/tools\/read-formation-evidence\.mjs --file ([A-Za-z0-9][A-Za-z0-9._/-]*) --start ([1-9][0-9]*) --end ([1-9][0-9]*)$/);
    if (evidence) {
        return !evidence[1].split("/").includes("..") && !excludedEvidence.has(evidence[1])
            && Number(evidence[3]) >= Number(evidence[2]) && Number(evidence[3]) - Number(evidence[2]) <= 249;
    }
    return /^node docs\/tranches\/V\/vnext\/tools\/read-clean-critic-report\.mjs --pass [12] --tag [AB] --sha256 [0-9a-f]{64}$/.test(command);
}

function readEvidenceSpec(command) {
    const match = command.match(/^node docs\/tranches\/V\/vnext\/tools\/read-formation-evidence\.mjs --file ([A-Za-z0-9][A-Za-z0-9._/-]*) --start ([1-9][0-9]*) --end ([1-9][0-9]*)$/);
    return match ? { file: match[1], start: Number(match[2]), end: Number(match[3]) } : null;
}

function renderedExecResult(output) {
    try {
        return renderCleanExecResult(output);
    } catch {
        return null;
    }
}

function canonicalPersistSource(path, report) {
    const body = report.endsWith("\n") ? report.slice(0, -1) : report;
    const patch = ["*** Begin Patch", `*** Add File: ${path}`, ...body.split("\n").map((line) => `+${line}`), "*** End Patch"].join("\n");
    return `const patch = ${JSON.stringify(patch)};\ntext(await tools.apply_patch(patch));\n`;
}

function validateSuccessfulExec(call, output, command, pointer, allowAbsenceProbe = false) {
    const allowed = allowAbsenceProbe
        ? /^node docs\/tranches\/V\/vnext\/tools\/probe-clean-report-absence\.mjs --pass [12]$/.test(command)
        : auditCommandAllowed(command);
    const result = renderedExecResult(output?.value);
    if (!allowed || !call || call.name !== "exec" || call.input !== canonicalExecSource(command)
        || !output || output.line <= call.line || !result || result.exit_code !== 0
        || Object.prototype.hasOwnProperty.call(result, "session_id")) {
        fail(`${pointer}: command is not the exact canonical synchronous start cell with structured exit_code 0`);
        return null;
    }
    return result;
}

const excludedEvidence = new Set(cleanPassExclusions);
const evidenceFiles = new Map(
    walkCorpusFiles(corpusRoot)
        .map((path) => [relative(corpusRoot, path).replaceAll("\\", "/"), path])
        .filter(([name]) => !excludedEvidence.has(name)),
);

if (!existsSync(manifestPath)) {
    process.stderr.write("FORMATION-CLEAN-PASSES.json is absent; two consecutive fresh clean triads have not closed\n");
    process.exit(1);
}
const manifest = parseJsonStrict(readFileSync(manifestPath));
const schema = parseJsonStrict(readFileSync(schemaPath));
failures.push(...validateJsonSchema(manifest, schema));

function jsonLines(source, pointer) {
    const records = [];
    for (const [index, line] of source.split("\n").entries()) {
        if (line === "") continue;
        try {
            records.push({ line: index + 1, value: parseJsonStrict(line) });
        } catch (error) {
            fail(`${pointer}:${index + 1}: malformed JSONL (${error.message})`);
        }
    }
    return records;
}

let coordinatorRecords = [];
let coordinatorSource = "";
if (validateSessionPath(manifest.coordinator_session_jsonl, manifest.coordinator_session_id, "/coordinator_session_jsonl")) {
    const coordinatorBytes = readFileSync(manifest.coordinator_session_jsonl);
    coordinatorSource = decodeUtf8(coordinatorBytes, "/coordinator_session_jsonl");
    coordinatorRecords = jsonLines(coordinatorSource, "/coordinator_session_jsonl");
    const rawLines = coordinatorSource.split("\n");
    if (rawLines.at(-1) === "") rawLines.pop();
    const firstLineHash = rawLines.length ? hashText(`${rawLines[0]}\n`) : null;
    if (manifest.coordinator_session_first_line_sha256 !== firstLineHash) {
        fail(`/coordinator_session_first_line_sha256: computed ${firstLineHash ?? "missing"}`);
    }
    if (!Number.isInteger(manifest.coordinator_evidence_line) || manifest.coordinator_evidence_line > rawLines.length) {
        fail("/coordinator_evidence_line: outside the coordinator JSONL");
    } else {
        const prefix = `${rawLines.slice(0, manifest.coordinator_evidence_line).join("\n")}\n`;
        const prefixHash = createHash("sha256").update(prefix).digest("hex");
        if (manifest.coordinator_prefix_sha256 !== prefixHash) fail(`/coordinator_prefix_sha256: computed ${prefixHash}`);
        const rootMetas = coordinatorRecords.filter(({ line, value }) => line <= manifest.coordinator_evidence_line
            && value.type === "session_meta");
        if (!rootMetas.length || rootMetas[0]?.line !== 1 || rootMetas.some(({ value }) => {
            const payload = value.payload;
            return payload?.id !== manifest.coordinator_session_id
                || payload?.session_id !== manifest.coordinator_session_id
                || payload?.cwd !== workspaceRoot
                || payload?.source !== "vscode"
                || payload?.thread_source !== "user"
                || Object.prototype.hasOwnProperty.call(payload ?? {}, "agent_path")
                || Object.prototype.hasOwnProperty.call(payload ?? {}, "parent_thread_id");
        })) {
            fail("/coordinator_session_id: every prefix session_meta must retain the pinned root user identity");
        }
    }
}
const epoch = computeCorpusEpoch();
if (manifest.corpus_epoch_sha256 !== epoch.sha256) fail(`/corpus_epoch_sha256: current ${epoch.sha256}`);
if (canonicalize(manifest.passes?.map(({ pass }) => pass)) !== canonicalize([1, 2])) fail("/passes: exact order must be 1,2");
const coordinatorCalls = executedCalls(coordinatorRecords, "/coordinator_session_jsonl");
const coordinatorRecordsByLine = new Map(coordinatorRecords.map((record) => [record.line, record]));
const custodyStartTimestamp = coordinatorRecordsByLine.get(manifest.coordinator_custody_start_line)?.value?.timestamp;
let providerBootstrapAuthority;
try {
    providerBootstrapAuthority = validateCleanProviderBootstrapAuthority(manifest.provider_bootstrap_authority, {
        expectedParentSessionId: manifest.coordinator_session_id,
        beforeTimestamp: custodyStartTimestamp,
    });
} catch (error) {
    fail(`/provider_bootstrap_authority: ${error.message}`);
}

const sessions = new Set();
const sessionFiles = new Set();
const sessionHashes = new Set();
const sessionFileHashes = new Map();
const agentPaths = new Set();
const reportPaths = new Set();
const reportHashes = new Set();
const reportFileHashes = new Map();
const persistenceCalls = new Set();
const reportMetadata = new Map();
const reportTexts = new Map();
const coverage = cleanCoverage;
const domainCommandPatterns = {
    "api-closure": [/validate-api-(?:contract|return-coverage|target-paths)\.mjs$/],
    "architecture-dags": [/(?:validate-(?:current-dags|target-paths|api-target-paths)|selftest-(?:target-paths|value-(?:current-inventory|target-transpose)|keyframes-(?:current-inventory|target-transpose)))\.mjs$/],
    "consumer-universe": [/(?:selftest-consumer-universe|validate-consumer-bounds)\.mjs$/],
    "deletion-truth": [/selftest-deletion-(?:truth|judgment)\.mjs$/],
    "design-mobile-desktop": [/read-formation-evidence\.mjs --file (?:LIVE-VISUAL-AUDIT|DESIGN-PROGRAM|DESIGN-PROVENANCE|DEMO-TARGET-DAGS)\.md /],
    "gate-soundness": [/(?:clean-provider-bootstrap-authority|selftest-(?:contracts|clean-exec-contract|clean-pass-prompts|clean-provider-bootstrap-authority|clean-coordinator-custody|formation-proof-layer|wave-edge-policy|p01-authorship|p01-structural-contract|css-module-isomorphism|target-paths|value-(?:current-inventory|target-resolutions|public-surface|target-transpose)|keyframes-(?:current-inventory|public-package|target-transpose)|deletion-truth|deletion-judgment|reopenings|canonical-order|corpus-safety))\.mjs$/],
    "parser-boundary": [/(?:validate-(?:bbnf-host-control|pt-coordination|css-module-isomorphism|p01-authorship)|selftest-(?:p01-authorship|p01-structural-contract|css-module-isomorphism))\.mjs(?: --execute)?$/],
    "prompt-seed-bijection": [/validate-seed-inventory\.mjs$/],
    "quarantine-safety": [/selftest-corpus-safety\.mjs$/],
    "return-dependency-closure": [/selftest-(?:contracts|reopenings|value-(?:current-inventory|target-resolutions|public-surface|target-transpose)|keyframes-(?:current-inventory|public-package|target-transpose))\.mjs$/],
    "state-routing": [/read-formation-evidence\.mjs --file STATE-ROUTING\.md /],
    "wave-formation": [/(?:validate-(?:formation|wave-contracts|seat-ledger)|selftest-(?:formation-proof-layer|wave-edge-policy))\.mjs$/],
};
const domainEvidencePatterns = {
    "api-closure": [/^(?:API-|KEYFRAMES-API|api-contract|API-TARGET)/],
    "architecture-dags": [/^(?:CURRENT-DAGS|TARGET-DAGS|DEMO-TARGET-DAGS|VALUE-TARGET|KEYFRAMES-TARGET|API-TARGET|value-current-inventory|value-target-resolutions|value-target-transpose|value-public-surface|keyframes-current-inventory|keyframes-target-decisions|keyframes-target-transpose|keyframes-physical-transpose|keyframes-public-package)/],
    "consumer-universe": [/^(?:CONSUMER-UNIVERSE|PROVENANCE|waves\/M-C)/],
    "deletion-truth": [/^(?:RETURN-CONTRACT|DISPOSITIONS|deletion-|git-tree-|waves\/)/],
    "design-mobile-desktop": [/^(?:LIVE-VISUAL-AUDIT|DESIGN-PROGRAM|DESIGN-PROVENANCE|DEMO-TARGET-DAGS)/],
    "gate-soundness": [/^(?:RETURN-CONTRACT|FORMATION-CLEAN-PASS-PROTOCOL|tools\/selftest-|tools\/validate-|waves\/)/],
    "parser-boundary": [/^(?:PARSER-CSS-COLOR|BBNF-HOST-CONTROL|CSS-MODULE-ISOMORPHISM|P01-INDEPENDENT-AUTHORSHIP|p01-|css-module-|parse-that-package|coordination\/|waves\/P-V)/],
    "prompt-seed-bijection": [/^(?:PROMPT-RECAP|SEED-ROW-INVENTORY|FORMATION-ROOT-SEED-CONTRACT|OWNER-AMENDMENTS)/],
    "quarantine-safety": [/^(?:FORMATION-CLEAN-PASS-PROTOCOL|tools\/corpus-|tools\/selftest-corpus-safety)/],
    "return-dependency-closure": [/^(?:RETURN-CONTRACT|return\.schema|resolved-reopenings|value-(?:current-inventory|target-resolutions|public-surface|target-transpose)|keyframes-(?:current-inventory|public-package|target-decisions|target-transpose|physical-transpose)|tools\/(?:validate-return|selftest-contracts|selftest-value-|selftest-keyframes-))/],
    "state-routing": [/^(?:STATE-ROUTING|DEMO-TARGET-DAGS|waves\/M-C|waves\/G-D)/],
    "wave-formation": [/^(?:FORMATION|PLAN|AUDIT-REGISTRY|FORMATION-SEAT-LEDGER|waves\/)/],
};
let predecessorAdjudicationHash;
let predecessorAdjudicationCompletedAt;
let predecessorAdjudicationPersistedAt;
let predecessorPersistenceOutputLine;
let predecessorPersistenceOutputTime;
let predecessorAdjudicationSpawnLine;
for (const pass of manifest.passes ?? []) {
    if (pass.corpus_epoch_sha256 !== epoch.sha256) fail(`/passes/${pass.pass}/corpus_epoch_sha256: current ${epoch.sha256}`);
    if (pass.pass === 1) {
        if (pass.predecessor?.applicability !== "not_applicable" || pass.predecessor?.reason !== "first frozen-corpus pass") {
            fail("/passes/1/predecessor: first pass must be the typed frozen-corpus genesis");
        }
    } else if (
        pass.predecessor?.applicability !== "applicable"
        || pass.predecessor?.pass !== 1
        || pass.predecessor?.adjudication_report_sha256 !== predecessorAdjudicationHash
    ) {
        fail("/passes/2/predecessor: must bind the exact pass-1 adjudication report");
    }
    const critics = pass.critics ?? [];
    const roles = critics.map(({ role }) => role).sort();
    if (canonicalize(roles) !== canonicalize(["critic_a", "critic_b"])) fail(`/passes/${pass.pass}/critics: exact independent A/B roles required`);
    const criticHashes = critics.map(({ report_sha256 }) => report_sha256).sort();
    if (canonicalize([...(pass.adjudicator?.input_report_sha256 ?? [])].sort()) !== canonicalize(criticHashes)) {
        fail(`/passes/${pass.pass}/adjudicator/input_report_sha256: must bind both critic reports`);
    }
    const criticSpawnLines = critics.map(({ spawn_line }) => spawn_line).sort((left, right) => left - right);
    if (coordinatorRecords.some(({ line, value }) => line > criticSpawnLines[0] && line < criticSpawnLines[1]
        && value.type === "event_msg" && value.payload?.type === "sub_agent_activity"
        && value.payload?.kind !== "started")) {
        fail(`/passes/${pass.pass}/critics: both canonical prompts must spawn before either child reveals work`);
    }
    const probeCommand = `node docs/tranches/V/vnext/tools/probe-clean-report-absence.mjs --pass ${pass.pass}`;
    const probeCall = coordinatorCalls.calls.get(pass.absence_probe?.call_id);
    const probeOutput = coordinatorCalls.outputs.get(pass.absence_probe?.call_id);
    if (probeCall?.line !== pass.absence_probe?.call_line || probeOutput?.line !== pass.absence_probe?.output_line) {
        fail(`/passes/${pass.pass}/absence_probe: coordinator call/output lines do not match`);
    }
    const probeResult = validateSuccessfulExec(
        probeCall,
        probeOutput,
        probeCommand,
        `/passes/${pass.pass}/absence_probe`,
        true,
    );
    const expectedAbsent = ["A", "B", "ADJ"].map((tag) => `reviews/FORMATION-CLEAN-PASS-${pass.pass}-${tag}.md`);
    try {
        const probeReceipt = parseJsonStrict(probeResult?.output?.trim() ?? "");
        if (canonicalize(probeReceipt) !== canonicalize({ schema: "vnext-clean-report-absence/1", pass: pass.pass, absent: expectedAbsent })) {
            fail(`/passes/${pass.pass}/absence_probe: stdout is not the exact ENOENT receipt`);
        }
    } catch (error) {
        fail(`/passes/${pass.pass}/absence_probe: invalid stdout receipt (${error.message})`);
    }
    const earliestSpawn = Math.min(...[...critics, pass.adjudicator].filter(Boolean).map(({ spawn_line }) => spawn_line));
    if (pass.absence_probe?.call_line >= earliestSpawn || pass.absence_probe?.output_line >= earliestSpawn
        || pass.absence_probe?.output_line > manifest.coordinator_evidence_line) {
        fail(`/passes/${pass.pass}/absence_probe: successful ENOENT proof must precede every pass actor and lie in the hashed prefix`);
    }
    if (pass.pass === 2 && (pass.absence_probe?.call_line <= predecessorPersistenceOutputLine
        || pass.absence_probe?.output_line <= predecessorPersistenceOutputLine
        || Date.parse(probeCall?.timestamp) <= predecessorPersistenceOutputTime
        || Date.parse(probeOutput?.timestamp) <= predecessorPersistenceOutputTime)) {
        fail("/passes/2/absence_probe: pass-2 ENOENT proof must be fresh after pass-1 adjudication persistence");
    }
    for (const actor of [...critics, pass.adjudicator].filter(Boolean)) {
        if (sessions.has(actor.session_id)) fail(`/passes/${pass.pass}: duplicate session ${actor.session_id}`);
        sessions.add(actor.session_id);
        if (sessionFiles.has(actor.session_jsonl)) fail(`/passes/${pass.pass}: reused session file ${actor.session_jsonl}`);
        sessionFiles.add(actor.session_jsonl);
        if (sessionHashes.has(actor.session_sha256)) fail(`/passes/${pass.pass}: reused session bytes ${actor.session_sha256}`);
        sessionHashes.add(actor.session_sha256);
        if (agentPaths.has(actor.agent_path)) fail(`/passes/${pass.pass}: agent path was not freshly rotated ${actor.agent_path}`);
        agentPaths.add(actor.agent_path);
        if (reportPaths.has(actor.report_path)) fail(`/passes/${pass.pass}: reused report path ${actor.report_path}`);
        reportPaths.add(actor.report_path);
        if (reportHashes.has(actor.report_sha256)) fail(`/passes/${pass.pass}: reused report bytes ${actor.report_sha256}`);
        reportHashes.add(actor.report_sha256);
        if (actor.spawn_line > manifest.coordinator_evidence_line) {
            fail(`/passes/${pass.pass}/${actor.role}: spawn lies beyond the hashed coordinator prefix`);
        }
        const predecessor = pass.pass === 2 ? predecessorAdjudicationHash : null;
        const expectedPrompt = actor.role === "adjudicator"
            ? adjudicatorPrompt({
                pass: pass.pass,
                epoch: epoch.sha256,
                predecessor,
                criticReports: critics.map(({ role, report_sha256 }) => ({
                    tag: role === "critic_a" ? "A" : "B",
                    sha256: report_sha256,
                })),
            })
            : criticPrompt({ pass: pass.pass, role: actor.role, epoch: epoch.sha256, predecessor });
        const expectedPromptSha256 = cleanPromptSha256(expectedPrompt);
        const expectedTask = cleanActorTaskName({ pass: pass.pass, role: actor.role, prompt: expectedPrompt });
        if (actor.prompt_sha256 !== expectedPromptSha256) {
            fail(`/passes/${pass.pass}/${actor.role}: prompt_sha256 does not bind the canonical prompt body`);
        }
        if (actor.agent_path !== `/root/${expectedTask}`) {
            fail(`/passes/${pass.pass}/${actor.role}: agent_path is not the content-addressed canonical task name`);
        }
        const spawn = coordinatorRecords.find(({ line, value }) => line === actor.spawn_line
            && value.type === "response_item"
            && value.payload?.type === "function_call"
            && value.payload?.name === "spawn_agent"
            && value.payload?.call_id === actor.spawn_call_id);
        if (!spawn) {
            fail(`/passes/${pass.pass}/${actor.role}: exact coordinator spawn record absent`);
        }
        const spawnTriplet = validateCleanSpawnTriplet(
            coordinatorRecordsByLine,
            spawn,
            { actor, expectedTask, expectedPrompt },
        );
        for (const finding of spawnTriplet.failures) {
            fail(`/passes/${pass.pass}/${actor.role}: ${finding}`);
        }
        if (spawnTriplet.encryptedTaskSha256 !== actor.encrypted_task_sha256) {
            fail(`/passes/${pass.pass}/${actor.role}: encrypted_task_sha256 does not bind the coordinator carrier`);
        }
        if ((spawnTriplet.output?.line ?? Number.POSITIVE_INFINITY) > manifest.coordinator_evidence_line) {
            fail(`/passes/${pass.pass}/${actor.role}: spawn triplet lies beyond the hashed coordinator prefix`);
        }
        const reportTag = actor.role === "adjudicator" ? "ADJ" : actor.role.endsWith("a") ? "A" : "B";
        const expectedReportPath = resolve(corpusRoot, `reviews/FORMATION-CLEAN-PASS-${pass.pass}-${reportTag}.md`);
        const reportPathValid = actor.report_path === expectedReportPath;
        if (!reportPathValid) {
            fail(`/passes/${pass.pass}/${actor.role}: report path must be ${expectedReportPath}`);
        }
        if (actor.session_id === manifest.coordinator_session_id) fail(`/passes/${pass.pass}/${actor.role}: child reuses coordinator session ID`);
        const sessionValid = validateSessionPath(
            actor.session_jsonl,
            actor.session_id,
            `/passes/${pass.pass}/${actor.role}/session_jsonl`,
        );
        let records = [];
        let calls = { calls: new Map(), outputs: new Map() };
        let authoredReport = null;
        let executed = [];
        let executedAuditCommands = [];
        if (sessionValid) {
            const sessionBytes = readFileSync(actor.session_jsonl);
            const actual = hashBytes(sessionBytes);
            if (actual !== actor.session_sha256) {
                fail(`/passes/${pass.pass}/${actor.role}: session hash ${actual}; expected ${actor.session_sha256}`);
            }
            sessionFileHashes.set(actor.session_jsonl, actor.session_sha256);
            const sessionText = decodeUtf8(sessionBytes, `/passes/${pass.pass}/${actor.role}/session_jsonl`);
            if (!sessionText.includes(actor.agent_path)) fail(`/passes/${pass.pass}/${actor.role}: agent path absent from session`);
            if (!sessionText.includes(`\"id\":\"${actor.session_id}\"`)) fail(`/passes/${pass.pass}/${actor.role}: exact spawned-session ID absent`);
            records = jsonLines(sessionText, `/passes/${pass.pass}/${actor.role}/session_jsonl`);
            calls = executedCalls(records, `/passes/${pass.pass}/${actor.role}/session_jsonl`);
            const transcriptSurface = validateCleanTranscriptSurface(
                records,
                actor.agent_path,
                providerBootstrapAuthority?.bootstrap,
            );
            for (const finding of transcriptSurface.failures) {
                fail(`/passes/${pass.pass}/${actor.role}/session_jsonl: ${finding}`);
            }
            const carrierJoin = validateCleanCarrierJoin(spawnTriplet, transcriptSurface);
            for (const finding of carrierJoin.failures) {
                fail(`/passes/${pass.pass}/${actor.role}: ${finding}`);
            }
            const reportBoundary = selectCleanReportBoundary(records);
            for (const finding of reportBoundary.failures) {
                fail(`/passes/${pass.pass}/${actor.role}/session_jsonl: ${finding}`);
            }
            authoredReport = reportBoundary.report;
            const meta = records.find(({ value }) => value.type === "session_meta");
            if (meta?.value.payload?.id !== actor.session_id || meta?.value.payload?.agent_path !== actor.agent_path) {
                fail(`/passes/${pass.pass}/${actor.role}: child session identity differs from manifest`);
            }
            if (meta?.value.payload?.session_id !== manifest.coordinator_session_id) {
                fail(`/passes/${pass.pass}/${actor.role}: child session does not descend from coordinator`);
            }
            const childCreated = Date.parse(meta?.value.payload?.timestamp);
            const childOuter = Date.parse(meta?.value.timestamp);
            const childCarrier = Date.parse(records.find(({ line }) =>
                line === transcriptSurface.carrierAuthority?.line)?.value.timestamp);
            if (![spawnTriplet.callTime, childCreated, spawnTriplet.startedTime, spawnTriplet.outputTime, childCarrier, childOuter]
                .every(Number.isFinite)
                || !(spawnTriplet.callTime <= childCreated
                    && childCreated <= spawnTriplet.startedTime
                    && spawnTriplet.startedTime <= spawnTriplet.outputTime
                    && spawnTriplet.outputTime <= childCarrier)
                || !(spawnTriplet.callTime <= childOuter && childOuter <= childCarrier)) {
                fail(`/passes/${pass.pass}/${actor.role}: coordinator and child carrier chronology is not the measured partial order`);
            }
            const contexts = records.filter(({ value }) => value.type === "turn_context");
            if (contexts.length !== 1 || contexts.some(({ value }) => value.payload?.model !== "gpt-5.6-sol" || value.payload?.effort !== "ultra")) {
                fail(`/passes/${pass.pass}/${actor.role}: child must contain exactly one served Sol-ultra turn`);
            }
            const completions = records.filter(({ value }) => value.type === "event_msg" && value.payload?.type === "task_complete");
            const complete = completions[0];
            if (completions.length !== 1 || !authoredReport || authoredReport.line >= (complete?.line ?? -1)) {
                fail(`/passes/${pass.pass}/${actor.role}: exact authored report must precede the sole task_complete record`);
            }
            if (complete?.value.payload?.last_agent_message !== authoredReport?.text) {
                fail(`/passes/${pass.pass}/${actor.role}: task_complete.last_agent_message must equal the final authored envelope`);
            }
            if (calls.outputs.size !== calls.calls.size || [...calls.outputs].some(([callId]) => !calls.calls.has(callId))) {
                fail(`/passes/${pass.pass}/${actor.role}: every tool call must have exactly one joined output`);
            }
            const folded = foldCleanExecRuns(calls, {
                workspaceRoot,
                isCommandAllowed: auditCommandAllowed,
                reportLine: authoredReport?.line ?? Number.POSITIVE_INFINITY,
                interruptionLines: records.filter(({ value }) => value.type === "response_item"
                    && value.payload?.type === "message"
                    && value.payload?.role === "assistant"
                    && value.payload?.phase === "commentary").map(({ line }) => line),
            });
            for (const finding of folded.failures) {
                fail(`/passes/${pass.pass}/${actor.role}/session_jsonl: ${finding}`);
            }
            executed = folded.runs.sort((left, right) => left.call.line - right.call.line);
            const epochCommand = "node docs/tranches/V/vnext/tools/corpus-epoch.mjs";
            const epochCalls = executed.filter(({ command }) => command === epochCommand);
            if (epochCalls.length !== 2 || executed[0] !== epochCalls[0] || executed.at(-1) !== epochCalls[1]) {
                fail(`/passes/${pass.pass}/${actor.role}: exact corpus-epoch runs must be the first and last logical commands`);
            } else {
                const interior = executed.slice(1, -1);
                if (!interior.length || epochCalls[0].terminalOutputLine >= Math.min(...interior.map(({ call }) => call.line))
                    || Math.max(...interior.map(({ terminalOutputLine }) => terminalOutputLine)) >= epochCalls[1].call.line) {
                    fail(`/passes/${pass.pass}/${actor.role}: all audit runs must lie between completed opening/closing epoch probes`);
                }
                for (const [boundary, item] of epochCalls.entries()) {
                    try {
                        const receipt = parseJsonStrict(item.result.output.trim());
                        if (canonicalize(receipt) !== canonicalize(epoch)) {
                            fail(`/passes/${pass.pass}/${actor.role}: corpus epoch boundary ${boundary + 1} differs from the frozen epoch`);
                        }
                    } catch (error) {
                        fail(`/passes/${pass.pass}/${actor.role}: invalid corpus epoch boundary ${boundary + 1} (${error.message})`);
                    }
                }
            }
            executedAuditCommands = executed.filter(({ command }) => command && command !== epochCommand).map(({ command }) => command);
            if (new Set(executedAuditCommands).size !== executedAuditCommands.length) {
                fail(`/passes/${pass.pass}/${actor.role}: non-boundary audit commands must execute exactly once`);
            }
            const criticReadCommands = critics.map(({ role, report_sha256 }) =>
                `node docs/tranches/V/vnext/tools/read-clean-critic-report.mjs --pass ${pass.pass} --tag ${role === "critic_a" ? "A" : "B"} --sha256 ${report_sha256}`,
            );
            if (actor.role === "adjudicator") {
                const executedCriticReads = executedAuditCommands.filter((command) => command.includes("read-clean-critic-report.mjs"));
                if (canonicalize([...executedCriticReads].sort()) !== canonicalize([...criticReadCommands].sort())) {
                    fail(`/passes/${pass.pass}/${actor.role}: adjudicator must execute exactly the two canonical content-addressed critic report reads`);
                }
                for (const [index, command] of criticReadCommands.entries()) {
                    const receipt = executed.find((item) => item.command === command);
                    const criticPath = critics[index]?.report_path;
                    const criticBytes = criticPath && existsSync(criticPath) ? readFileSync(criticPath) : null;
                    const criticReport = criticBytes ? decodeUtf8(criticBytes, `/passes/${pass.pass}/${actor.role}/critic_input/${index}`) : null;
                    if (!criticBytes || criticBytes.length > 12000 || receipt?.result?.output !== criticReport) {
                        fail(`/passes/${pass.pass}/${actor.role}: critic read ${index} must be an untruncated byte-exact report receipt no larger than 12000 bytes`);
                    }
                }
            } else if (executedAuditCommands.some((command) => command.includes("read-clean-critic-report.mjs"))) {
                fail(`/passes/${pass.pass}/${actor.role}: critic may not execute a clean-report read`);
            }
            if (meta?.value.timestamp !== actor.started_at || complete?.value.timestamp !== actor.completed_at) {
                fail(`/passes/${pass.pass}/${actor.role}: manifest start/completion times do not equal session evidence`);
            }
            if (!Number.isFinite(Date.parse(actor.started_at)) || !Number.isFinite(Date.parse(actor.completed_at))
                || Date.parse(actor.completed_at) <= Date.parse(actor.started_at)) {
                fail(`/passes/${pass.pass}/${actor.role}: invalid session time order`);
            }
            if (actor.role !== "adjudicator") {
                const peerTag = actor.role === "critic_a" ? "B" : "A";
                const peerPath = `FORMATION-CLEAN-PASS-${pass.pass}-${peerTag}.md`;
                const peerHash = critics.find(({ role }) => role !== actor.role)?.report_sha256;
                for (const call of calls.calls.values()) {
                    if (call.input.includes(peerPath) || (peerHash && call.input.includes(peerHash))) {
                        fail(`/passes/${pass.pass}/${actor.role}: tool transcript attempted sibling-report access`);
                    }
                }
            }
        }
        if (reportPathValid && !existsSync(actor.report_path)) {
            fail(`/passes/${pass.pass}/${actor.role}: report file missing ${actor.report_path}`);
        } else if (reportPathValid) {
            const metadata = lstatSync(actor.report_path);
            if (metadata.isSymbolicLink() || !metadata.isFile() || realpathSync(actor.report_path) !== actor.report_path) {
                fail(`/passes/${pass.pass}/${actor.role}: report must be a canonical regular file, never a symlink`);
            } else {
                reportMetadata.set(actor.report_path, metadata);
            }
            const reportBytes = readFileSync(actor.report_path);
            if (reportBytes.length > 12000) {
                fail(`/passes/${pass.pass}/${actor.role}: report exceeds the 12000-byte complete-read ceiling`);
            }
            const actual = hashBytes(reportBytes);
            if (actual !== actor.report_sha256) {
                fail(`/passes/${pass.pass}/${actor.role}: report hash ${actual}; expected ${actor.report_sha256}`);
            }
            reportFileHashes.set(actor.report_path, actor.report_sha256);
            const report = decodeUtf8(reportBytes, `/passes/${pass.pass}/${actor.role}/report_path`);
            reportTexts.set(actor.report_path, report);
            if (!authoredReport || !reportBytes.equals(Buffer.from(authoredReport.bytes, "utf8"))) {
                fail(`/passes/${pass.pass}/${actor.role}: persisted report is not byte-identical to the child final answer`);
            }
            if (persistenceCalls.has(actor.persist_call_id)) {
                fail(`/passes/${pass.pass}/${actor.role}: coordinator persistence call is reused`);
            }
            persistenceCalls.add(actor.persist_call_id);
            const persistCall = coordinatorCalls.calls.get(actor.persist_call_id);
            const persistOutput = coordinatorCalls.outputs.get(actor.persist_call_id);
            const persistPatchEvent = coordinatorRecordsByLine.get((persistCall?.line ?? -2) + 1);
            const activeCoordinatorTurn = selectActiveCoordinatorTurn(
                coordinatorRecords,
                persistCall,
            );
            for (const finding of activeCoordinatorTurn.failures) {
                fail(`/passes/${pass.pass}/${actor.role}: ${finding}`);
            }
            const persistPair = validateCleanPersistPair(persistCall, persistOutput, {
                patchEvent: persistPatchEvent,
                expectedTurnId: activeCoordinatorTurn.turnId,
                reportPath: actor.report_path,
                report,
            });
            const persistFileTimes = validateCleanPersistFileTimes(metadata, persistCall, persistPatchEvent);
            if (persistCall?.line !== actor.persist_call_line || persistOutput?.line !== actor.persist_output_line
                || persistCall?.name !== "exec" || persistCall?.input !== canonicalPersistSource(actor.report_path, report)
                || persistPair.failures.length !== 0
                || persistFileTimes.failures.length !== 0
                || persistOutput?.line > manifest.coordinator_evidence_line
                || Date.parse(persistCall?.timestamp) <= Date.parse(actor.completed_at)) {
                fail(`/passes/${pass.pass}/${actor.role}: report lacks the exact successful post-completion coordinator apply_patch receipt`);
            }
            const signature = `FORMATION-CLEAN-PASS-${pass.pass}-${reportTag}`;
            if (!report.includes(signature)) fail(`/passes/${pass.pass}/${actor.role}: report signature ${signature} absent`);
            if (!report.includes(epoch.sha256)) fail(`/passes/${pass.pass}/${actor.role}: report epoch absent`);
            const headingProjection = validateCleanReportHeadings(report);
            for (const finding of headingProjection.failures) {
                fail(`/passes/${pass.pass}/${actor.role}: ${finding}`);
            }
            const evidenceSection = report.match(/^Evidence reviewed:\n([\s\S]*?)^Commands executed:$/m)?.[1]?.trim();
            if (!evidenceSection) {
                fail(`/passes/${pass.pass}/${actor.role}: concrete evidence section absent`);
            }
            const commandProjection = validateCleanReportCommands(
                report,
                executed.map(({ command }) => command),
            );
            for (const finding of commandProjection.failures) {
                fail(`/passes/${pass.pass}/${actor.role}: ${finding}`);
            }
            const matches = [...report.matchAll(/<!-- VNEXT-CLEAN-ATTESTATION (\{[^\n]*\}) -->/g)];
            if (matches.length !== 1) {
                fail(`/passes/${pass.pass}/${actor.role}: exactly one machine clean attestation is required`);
            } else {
                const tailProjection = validateCleanTerminalTail(report, matches[0][0]);
                const prose = report.slice(0, matches[0].index);
                if ((report.match(/^## Findings$/gm) ?? []).length !== 1
                    || (report.match(/^Verdict:.*$/gm) ?? []).length !== 1
                    || tailProjection.failures.length !== 0
                    || report.includes("```")
                    || /verdict:\s*\*\*(?:not\s+clean|dirty)\*\*|\bfatal\s+finding\b|\bsurviving\s+finding\b/i.test(prose)) {
                    fail(`/passes/${pass.pass}/${actor.role}: findings, verdict and attestation must form the exact terminal clean tail`);
                }
                try {
                    const attestation = parseJsonStrict(matches[0][1]);
                    const domainResults = attestation.domain_results;
                    if (!Array.isArray(domainResults)
                        || canonicalize(domainResults.map(({ domain }) => domain)) !== canonicalize(coverage)) {
                        fail(`/passes/${pass.pass}/${actor.role}: domain_results must follow the exact coverage order`);
                    }
                    const citedCommands = [];
                    for (const [index, result] of (domainResults ?? []).entries()) {
                        const keys = Object.keys(result ?? {}).sort();
                        if (canonicalize(keys) !== canonicalize(["commands", "domain", "evidence", "status"].sort())
                            || result.status !== "clean"
                            || !Array.isArray(result.evidence) || result.evidence.length === 0
                            || !Array.isArray(result.commands) || result.commands.length === 0
                            || result.commands.some((item) => typeof item !== "string" || item.trim() === "" || item.includes("\n"))) {
                            fail(`/passes/${pass.pass}/${actor.role}: domain_results/${index} lacks clean file:line evidence or executed command`);
                        }
                        if (!(domainCommandPatterns[result.domain] ?? []).some((pattern) =>
                            (result.commands ?? []).some((command) => pattern.test(command)))) {
                            fail(`/passes/${pass.pass}/${actor.role}: domain_results/${index} lacks a command specific to ${result.domain}`);
                        }
                        if (!(domainEvidencePatterns[result.domain] ?? []).some((pattern) =>
                            (result.evidence ?? []).some((item) => pattern.test(String(item).split(":", 1)[0])))) {
                            fail(`/passes/${pass.pass}/${actor.role}: domain_results/${index} lacks authority evidence specific to ${result.domain}`);
                        }
                        for (const item of result.evidence ?? []) {
                            const evidence = typeof item === "string"
                                ? item.match(/^([^:\n]+):([1-9][0-9]*) sha256:([0-9a-f]{64}) (.+)$/)
                                : null;
                            const path = evidenceFiles.get(evidence?.[1]);
                            const line = Number(evidence?.[2]);
                            const lines = path ? decodeUtf8(readFileSync(path), `/evidence/${evidence?.[1]}`).split("\n") : [];
                            if (lines.at(-1) === "") lines.pop();
                            const lineHash = line && line <= lines.length && lines[line - 1].trim() !== ""
                                ? createHash("sha256").update(lines[line - 1], "utf8").digest("hex")
                                : null;
                            const readCommands = executedAuditCommands.filter((command) => {
                                const spec = readEvidenceSpec(command);
                                return spec?.file === evidence?.[1] && spec.start <= line && spec.end >= line;
                            });
                            const readReceipts = readCommands.filter((command) => {
                                const run = executed.find((candidate) => candidate.command === command);
                                return run?.result?.output?.split("\n").some((row) => row.startsWith(`${evidence?.[1]}:${line}:${evidence?.[3]}:`));
                            });
                            if (!evidence || !path || lineHash !== evidence?.[3]
                                || evidence?.[4] !== lines[line - 1]?.trim() || readReceipts.length !== 1) {
                                fail(`/passes/${pass.pass}/${actor.role}: domain_results/${index} evidence does not resolve to a bounded file line: ${String(item)}`);
                            }
                        }
                        for (const command of result.commands ?? []) {
                            citedCommands.push(command);
                            const matching = executed.filter((run) => run.command === command);
                            if (matching.length !== 1) {
                                fail(`/passes/${pass.pass}/${actor.role}: domain_results/${index} command does not select one exact completed logical run: ${String(command)}`);
                            }
                        }
                    }
                    if (canonicalize([...new Set(citedCommands)].sort())
                        !== canonicalize([...new Set(executedAuditCommands)].sort())) {
                        fail(`/passes/${pass.pass}/${actor.role}: attestation command union must exactly cover every non-boundary child tool call`);
                    }
                    const expected = cleanAttestationProjection({
                        pass: pass.pass,
                        role: actor.role,
                        promptSha256: expectedPromptSha256,
                        epoch: epoch.sha256,
                        domainResults,
                        inputReportSha256: actor.role === "adjudicator" ? criticHashes : null,
                    });
                    if (canonicalize(attestation) !== canonicalize(expected)) {
                        fail(`/passes/${pass.pass}/${actor.role}: machine attestation is not the exact zero-finding projection`);
                    }
                    if (matches[0][1] !== canonicalize(attestation)) {
                        fail(`/passes/${pass.pass}/${actor.role}: machine attestation must be canonical JSON`);
                    }
                } catch (error) {
                    fail(`/passes/${pass.pass}/${actor.role}: invalid machine attestation: ${error.message}`);
                }
            }
        }
    }
    const criticCompletion = Math.max(...critics.map(({ completed_at }) => Date.parse(completed_at)));
    const criticStart = Math.max(...critics.map(({ started_at }) => Date.parse(started_at)));
    const firstCriticCompletion = Math.min(...critics.map(({ completed_at }) => Date.parse(completed_at)));
    if (!Number.isFinite(criticStart) || !Number.isFinite(firstCriticCompletion) || criticStart >= firstCriticCompletion) {
        fail(`/passes/${pass.pass}/critics: both independent sessions must overlap before either completes`);
    }
    const criticPersistence = critics.map(({ report_path }) => reportMetadata.get(report_path));
    const criticPersistenceCalls = critics.map(({ persist_call_id }) => coordinatorCalls.calls.get(persist_call_id));
    const criticPersistenceOutputs = critics.map(({ persist_call_id }) => coordinatorCalls.outputs.get(persist_call_id));
    const criticPersistedAt = Math.max(...criticPersistence.flatMap((metadata) => [metadata?.birthtimeMs ?? NaN, metadata?.mtimeMs ?? NaN]));
    if (criticPersistence.some((metadata) => !metadata
        || metadata.birthtimeMs <= criticCompletion || metadata.mtimeMs <= criticCompletion)
        || criticPersistenceCalls.some((call) => Date.parse(call?.timestamp) <= criticCompletion)
        || criticPersistenceOutputs.some((output) => Date.parse(output?.timestamp) <= criticCompletion)) {
        fail(`/passes/${pass.pass}/critics: root must first persist both newly born reports after both critic sessions complete`);
    }
    const adjudicationMetadata = reportMetadata.get(pass.adjudicator?.report_path);
    const adjudicationCompleted = Date.parse(pass.adjudicator?.completed_at);
    const adjudicationPersistedAt = Math.max(adjudicationMetadata?.birthtimeMs ?? NaN, adjudicationMetadata?.mtimeMs ?? NaN);
    if (!adjudicationMetadata || adjudicationMetadata.birthtimeMs <= adjudicationCompleted
        || adjudicationMetadata.mtimeMs <= adjudicationCompleted) {
        fail(`/passes/${pass.pass}/adjudicator: root must persist the newly born adjudication report after its session completes`);
    }
    const adjudicationStart = Date.parse(pass.adjudicator?.started_at);
    if (!Number.isFinite(criticCompletion) || !Number.isFinite(criticPersistedAt)
        || !Number.isFinite(adjudicationStart) || adjudicationStart <= Math.max(criticCompletion, criticPersistedAt)) {
        fail(`/passes/${pass.pass}/adjudicator: must start after both critic sessions and reports freeze`);
    }
    if (pass.adjudicator?.spawn_line <= Math.max(...critics.map(({ spawn_line }) => spawn_line))) {
        fail(`/passes/${pass.pass}/adjudicator: coordinator must spawn adjudication after both critics`);
    }
    if (pass.adjudicator?.spawn_line <= Math.max(...critics.map(({ persist_output_line }) => persist_output_line))) {
        fail(`/passes/${pass.pass}/adjudicator: coordinator must persist both critic reports before spawning adjudication`);
    }
    if (pass.pass === 2) {
        const passTwoStart = Math.min(...[...critics, pass.adjudicator].map(({ started_at }) => Date.parse(started_at)));
        if (!Number.isFinite(passTwoStart)
            || passTwoStart <= Math.max(Date.parse(predecessorAdjudicationCompletedAt), predecessorAdjudicationPersistedAt)) {
            fail("/passes/2: no actor may begin until the pass-1 adjudication session completes and its report freezes");
        }
        if (Math.min(...[...critics, pass.adjudicator].map(({ spawn_line }) => spawn_line)) <= predecessorAdjudicationSpawnLine) {
            fail("/passes/2: every spawn must follow the pass-1 adjudicator spawn in coordinator order");
        }
    }
    predecessorAdjudicationHash = pass.adjudicator?.report_sha256;
    predecessorAdjudicationCompletedAt = pass.adjudicator?.completed_at;
    predecessorAdjudicationPersistedAt = adjudicationPersistedAt;
    predecessorPersistenceOutputLine = pass.adjudicator?.persist_output_line;
    predecessorPersistenceOutputTime = Date.parse(coordinatorCalls.outputs.get(pass.adjudicator?.persist_call_id)?.timestamp);
    predecessorAdjudicationSpawnLine = pass.adjudicator?.spawn_line;
}
const custodyStartRecord = coordinatorRecordsByLine.get(manifest.coordinator_custody_start_line);
const activeCoordinatorTurn = selectActiveCoordinatorTurn(coordinatorRecords, {
    line: custodyStartRecord?.line,
    timestamp: custodyStartRecord?.value?.timestamp,
});
for (const finding of activeCoordinatorTurn.failures) {
    fail(`/coordinator_custody_start_line: ${finding}`);
}
if (activeCoordinatorTurn.turnId !== manifest.coordinator_turn_id) {
    fail("/coordinator_turn_id: does not bind the active root Sol-ultra turn at quiescence");
}
const custody = validateCleanCoordinatorCustody(coordinatorRecords, {
    workspaceRoot,
    corpusRoot,
    turnId: manifest.coordinator_turn_id,
    startLine: manifest.coordinator_custody_start_line,
    endLine: manifest.coordinator_evidence_line,
    quiescenceCallId: manifest.coordinator_quiescence_call_id,
    passes: manifest.passes,
    reports: reportTexts,
});
for (const finding of custody.failures) {
    fail(`/coordinator_custody: ${finding}`);
}
if (custody.start_line !== manifest.coordinator_custody_start_line
    || custody.end_line !== manifest.coordinator_evidence_line
    || custody.passes !== 2 || custody.reports_hashed !== 6) {
    fail("/coordinator_custody: interval does not close two passes and six report hashes on the bound physical lines");
}
const preimage = { ...manifest };
delete preimage.manifest_hash;
const computed = createHash("sha256").update(canonicalize(preimage), "utf8").digest("hex");
if (manifest.manifest_hash !== computed) fail(`/manifest_hash: computed ${computed}`);
for (const [path, expected] of sessionFileHashes) {
    if (!validateSessionPath(path, path.match(/[0-9a-f]{8}-[0-9a-f-]{27,}/)?.[0], `/closing_session_recheck/${path}`)
        || hashBytes(readFileSync(path)) !== expected) {
        fail(`/closing_session_recheck: session changed after its validation read: ${path}`);
    }
}
for (const [path, expected] of reportFileHashes) {
    if (!existsSync(path)) {
        fail(`/closing_report_recheck: report disappeared after its validation read: ${path}`);
        continue;
    }
    const metadata = lstatSync(path);
    if (metadata.isSymbolicLink() || !metadata.isFile() || realpathSync(path) !== path
        || hashBytes(readFileSync(path)) !== expected) {
        fail(`/closing_report_recheck: report changed after its validation read: ${path}`);
    }
}
try {
    validateCleanProviderBootstrapAuthority(manifest.provider_bootstrap_authority, {
        expectedParentSessionId: manifest.coordinator_session_id,
        beforeTimestamp: custodyStartTimestamp,
    });
} catch (error) {
    fail(`/closing_provider_bootstrap_recheck: ${error.message}`);
}
const closingEpoch = computeCorpusEpoch();
if (canonicalize(closingEpoch) !== canonicalize(epoch)) {
    fail("/corpus_epoch_sha256: corpus changed while clean-pass evidence was being validated");
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({ schema: manifest.schema, corpus_epoch_sha256: epoch.sha256, passes: 2, sessions: sessions.size, manifest_hash: computed }, null, 2)}\n`);
