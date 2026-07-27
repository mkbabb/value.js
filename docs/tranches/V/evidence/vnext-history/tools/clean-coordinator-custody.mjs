import { createHash } from "node:crypto";
import { isAbsolute, resolve } from "node:path";

import {
    canonicalCleanStartSource,
    cleanExecWorkspaceRoot,
    renderCleanExecResult,
    validateCleanPersistPair,
    validateCleanSpawnTriplet,
} from "./clean-exec-contract.mjs";
import {
    cleanReportHashPath,
    cleanReportHashSchema,
    renderCleanReportHashReceipt,
} from "./hash-clean-report.mjs";
import { canonicalize, parseJsonStrict } from "./json-contract.mjs";

export const cleanCoordinatorCustodySchema = "vnext-clean-coordinator-custody/1";

const canonicalUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const canonicalCallId = /^call_[A-Za-z0-9]{24}$/;
const canonicalFunctionItemId = /^fc_[0-9a-f]{50}$/;
const canonicalFunctionOutputItemId = /^fco_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const canonicalCustomItemId = /^ctc_[0-9a-f]{50}$/;
const canonicalCustomOutputItemId = /^ctco_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const canonicalReasoningItemId = /^rs_[0-9a-f]{50}$/;
const canonicalMessageItemId = /^msg_[0-9a-f]{50}$/;
const canonicalSha256 = /^[0-9a-f]{64}$/;
const canonicalAgentPath = /^\/root\/[a-z0-9_]+$/;
const encryptedCarrier = /^gAAAA[A-Za-z0-9_-]+={0,2}$/;

const exactKeys = (value, keys) => value && typeof value === "object" && !Array.isArray(value)
    && Object.keys(value).sort().join(",") === [...keys].sort().join(",");

const canonicalInstant = (value) => typeof value === "string"
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;

const sha256 = (value) => createHash("sha256").update(value, "utf8").digest("hex");

function strictJson(source, pointer, failures) {
    try {
        return parseJsonStrict(source);
    } catch (error) {
        failures.push(`${pointer}: strict JSON parse failed (${error.message})`);
        return null;
    }
}

function roleTag(role) {
    if (role === "critic_a") return "A";
    if (role === "critic_b") return "B";
    if (role === "adjudicator") return "ADJ";
    return null;
}

function actorReport(actor, reports) {
    if (typeof actor?.report === "string") return actor.report;
    if (reports instanceof Map) return reports.get(actor?.report_path);
    if (reports && typeof reports === "object" && !Array.isArray(reports)) {
        return reports[actor?.report_path];
    }
    return undefined;
}

function normalizePasses(passes, corpusRoot, reports, failures) {
    if (!Array.isArray(passes) || passes.length !== 2
        || passes[0]?.pass !== 1 || passes[1]?.pass !== 2) {
        failures.push("passes must be the exact ordered pass-1/pass-2 pair");
        return [];
    }
    const identities = {
        agent_path: new Set(),
        session_id: new Set(),
        spawn_call_id: new Set(),
        persist_call_id: new Set(),
        hash_call_id: new Set(),
        report_path: new Set(),
        report_sha256: new Set(),
    };
    return passes.map((pass) => {
        const critics = Array.isArray(pass.critics) ? pass.critics : [];
        const criticByRole = new Map(critics.map((actor) => [actor?.role, actor]));
        if (critics.length !== 2 || criticByRole.size !== 2
            || !criticByRole.has("critic_a") || !criticByRole.has("critic_b")) {
            failures.push(`pass ${pass.pass}: critics must contain exactly critic_a and critic_b`);
        }
        if (pass.adjudicator?.role !== "adjudicator") {
            failures.push(`pass ${pass.pass}: adjudicator role is not canonical`);
        }
        if (!pass.absence_probe || typeof pass.absence_probe !== "object"
            || !canonicalCallId.test(pass.absence_probe.call_id ?? "")) {
            failures.push(`pass ${pass.pass}: absence probe call ID is absent or malformed`);
        }
        const sourceActors = [criticByRole.get("critic_a"), criticByRole.get("critic_b"), pass.adjudicator];
        const actors = sourceActors.map((sourceActor) => {
            const actor = sourceActor && typeof sourceActor === "object" ? { ...sourceActor } : sourceActor;
            const pointer = `pass ${pass.pass}/${actor?.role ?? "missing actor"}`;
            const tag = roleTag(actor?.role);
            const report = actorReport(actor, reports);
            if (!tag || !canonicalAgentPath.test(actor?.agent_path ?? "")
                || !canonicalCallId.test(actor?.spawn_call_id ?? "")
                || !canonicalCallId.test(actor?.persist_call_id ?? "")
                || !canonicalCallId.test(actor?.hash_call_id ?? "")
                || !canonicalSha256.test(actor?.encrypted_task_sha256 ?? "")
                || !canonicalUuid.test(actor?.session_id ?? "")
                || !isAbsolute(actor?.report_path ?? "")
                || !canonicalSha256.test(actor?.report_sha256 ?? "")
                || typeof report !== "string") {
                failures.push(`${pointer}: custody identity, call IDs, report path, hash, or report bytes are malformed`);
                return actor;
            }
            const expectedPath = cleanReportHashPath(corpusRoot, pass.pass, tag);
            if (actor.report_path !== expectedPath) {
                failures.push(`${pointer}: report path must be ${expectedPath}`);
            }
            if (sha256(report) !== actor.report_sha256) {
                failures.push(`${pointer}: report bytes do not match report_sha256`);
            }
            if (!Number.isSafeInteger(actor.spawn_line) || actor.spawn_line <= 0
                || !Number.isSafeInteger(actor.persist_call_line) || actor.persist_call_line <= 0
                || !Number.isSafeInteger(actor.persist_output_line)
                || actor.persist_output_line !== actor.persist_call_line + 2
                || !Number.isSafeInteger(actor.hash_call_line) || actor.hash_call_line <= 0
                || !Number.isSafeInteger(actor.hash_output_line)
                || actor.hash_output_line !== actor.hash_call_line + 1) {
                failures.push(`${pointer}: manifest line bindings are malformed`);
            }
            for (const field of Object.keys(identities)) {
                const value = actor[field];
                if (identities[field].has(value)) failures.push(`${pointer}: duplicate ${field} ${value}`);
                identities[field].add(value);
            }
            actor.__custody_report = report;
            actor.__custody_tag = tag;
            return actor;
        });
        return { ...pass, critics: actors.slice(0, 2), adjudicator: actors[2], actors };
    });
}

export function canonicalCleanPersistSource(path, report) {
    if (typeof path !== "string" || path === "" || typeof report !== "string") {
        throw new Error("clean persistence source requires a path and report text");
    }
    const body = report.endsWith("\n") ? report.slice(0, -1) : report;
    const patch = [
        "*** Begin Patch",
        `*** Add File: ${path}`,
        ...body.split("\n").map((line) => `+${line}`),
        "*** End Patch",
    ].join("\n");
    return `const patch = ${JSON.stringify(patch)};\ntext(await tools.apply_patch(patch));\n`;
}

function validTokenUsage(value) {
    return exactKeys(value, [
        "cached_input_tokens", "cache_write_input_tokens", "input_tokens",
        "output_tokens", "reasoning_output_tokens", "total_tokens",
    ]) && Object.values(value).every((item) => Number.isSafeInteger(item) && item >= 0);
}

function validRateWindow(value) {
    return exactKeys(value, ["resets_at", "used_percent", "window_minutes"])
        && Number.isFinite(value.used_percent) && value.used_percent >= 0
        && Number.isSafeInteger(value.window_minutes) && value.window_minutes > 0
        && Number.isSafeInteger(value.resets_at) && value.resets_at > 0;
}

function inert(record, turnId) {
    const value = record?.value;
    const payload = value?.payload;
    if (!exactKeys(value, ["payload", "timestamp", "type"])) return false;
    if (value?.type === "response_item") {
        const routing = payload?.internal_chat_message_metadata_passthrough;
        if (payload?.type === "reasoning") {
            return exactKeys(payload, [
                "encrypted_content", "id", "internal_chat_message_metadata_passthrough",
                "summary", "type",
            ]) && canonicalReasoningItemId.test(payload.id ?? "")
                && Array.isArray(payload.summary) && payload.summary.length === 0
                && typeof payload.encrypted_content === "string" && payload.encrypted_content !== ""
                && exactKeys(routing, ["turn_id"]) && routing.turn_id === turnId;
        }
        if (payload?.type === "message") {
            return exactKeys(payload, [
                "content", "id", "internal_chat_message_metadata_passthrough",
                "phase", "role", "type",
            ]) && canonicalMessageItemId.test(payload.id ?? "")
                && payload.role === "assistant" && payload.phase === "commentary"
                && Array.isArray(payload.content) && payload.content.length === 1
                && exactKeys(payload.content[0], ["text", "type"])
                && payload.content[0].type === "output_text"
                && typeof payload.content[0].text === "string"
                && exactKeys(routing, ["turn_id"]) && routing.turn_id === turnId;
        }
        return false;
    }
    if (value?.type === "event_msg") {
        if (payload?.type === "agent_message") {
            return exactKeys(payload, ["memory_citation", "message", "phase", "type"])
                && payload.memory_citation === null && payload.phase === "commentary"
                && typeof payload.message === "string";
        }
        if (payload?.type === "token_count") {
            const info = payload.info;
            const limits = payload.rate_limits;
            const credits = limits?.credits;
            return exactKeys(payload, ["info", "rate_limits", "type"])
                && exactKeys(info, ["last_token_usage", "model_context_window", "total_token_usage"])
                && validTokenUsage(info.total_token_usage) && validTokenUsage(info.last_token_usage)
                && info.model_context_window === 258400
                && exactKeys(limits, [
                    "credits", "individual_limit", "limit_id", "limit_name", "plan_type",
                    "primary", "rate_limit_reached_type", "secondary", "spend_control_reached",
                ])
                && limits.limit_id === "codex" && limits.limit_name === null
                && limits.plan_type === "pro" && validRateWindow(limits.primary)
                && limits.secondary === null && limits.individual_limit === null
                && limits.spend_control_reached === null && limits.rate_limit_reached_type === null
                && exactKeys(credits, ["balance", "has_credits", "unlimited"])
                && typeof credits.balance === "string"
                && typeof credits.has_credits === "boolean"
                && typeof credits.unlimited === "boolean";
        }
        return false;
    }
    return false;
}

const significant = (record, turnId) => !inert(record, turnId);

function describe(record) {
    const value = record?.value;
    const payload = value?.payload;
    return `${String(value?.type)}.${String(payload?.type ?? "unknown")}`
        + `${payload?.name ? `:${payload.name}` : ""} at line ${String(record?.line)}`;
}

function exactFunctionCall(record, turnId, failures, pointer) {
    const value = record?.value;
    const payload = value?.payload;
    const routing = payload?.internal_chat_message_metadata_passthrough;
    if (!exactKeys(value, ["payload", "timestamp", "type"])
        || value.type !== "response_item"
        || !exactKeys(payload, [
            "arguments", "call_id", "id", "internal_chat_message_metadata_passthrough",
            "name", "namespace", "type",
        ])
        || payload.type !== "function_call" || payload.namespace !== "collaboration"
        || !canonicalFunctionItemId.test(payload.id ?? "")
        || !canonicalCallId.test(payload.call_id ?? "")
        || !exactKeys(routing, ["turn_id"]) || routing.turn_id !== turnId) {
        failures.push(`${pointer}: collaboration call lacks the exact provider envelope`);
        return null;
    }
    return payload;
}

function exactFunctionOutput(record, callPayload, turnId, failures, pointer) {
    const value = record?.value;
    const payload = value?.payload;
    const routing = payload?.internal_chat_message_metadata_passthrough;
    if (!exactKeys(value, ["payload", "timestamp", "type"])
        || value.type !== "response_item"
        || !exactKeys(payload, [
            "call_id", "id", "internal_chat_message_metadata_passthrough", "output", "type",
        ])
        || payload.type !== "function_call_output"
        || !canonicalFunctionOutputItemId.test(payload.id ?? "")
        || payload.call_id !== callPayload?.call_id || typeof payload.output !== "string"
        || !exactKeys(routing, ["turn_id"]) || routing.turn_id !== turnId) {
        failures.push(`${pointer}: collaboration output lacks the exact joined provider envelope`);
        return null;
    }
    return payload;
}

function exactCustomCall(record, turnId, failures, pointer) {
    const value = record?.value;
    const payload = value?.payload;
    const routing = payload?.internal_chat_message_metadata_passthrough;
    if (!exactKeys(value, ["payload", "timestamp", "type"])
        || value.type !== "response_item"
        || !exactKeys(payload, [
            "call_id", "id", "input", "internal_chat_message_metadata_passthrough",
            "name", "status", "type",
        ])
        || payload.type !== "custom_tool_call" || payload.name !== "exec"
        || payload.status !== "completed" || typeof payload.input !== "string"
        || !canonicalCustomItemId.test(payload.id ?? "")
        || !canonicalCallId.test(payload.call_id ?? "")
        || !exactKeys(routing, ["turn_id"]) || routing.turn_id !== turnId) {
        failures.push(`${pointer}: exec call lacks the exact provider envelope`);
        return null;
    }
    return payload;
}

function exactCustomOutput(record, callPayload, turnId, failures, pointer) {
    const value = record?.value;
    const payload = value?.payload;
    const routing = payload?.internal_chat_message_metadata_passthrough;
    if (!exactKeys(value, ["payload", "timestamp", "type"])
        || value.type !== "response_item"
        || !exactKeys(payload, [
            "call_id", "id", "internal_chat_message_metadata_passthrough", "output", "type",
        ])
        || payload.type !== "custom_tool_call_output"
        || !canonicalCustomOutputItemId.test(payload.id ?? "")
        || payload.call_id !== callPayload?.call_id
        || !exactKeys(routing, ["turn_id"]) || routing.turn_id !== turnId) {
        failures.push(`${pointer}: exec output lacks the exact joined provider envelope`);
        return null;
    }
    return payload;
}

function validateSurface(records, startLine, endLine, failures) {
    if (!Array.isArray(records) || records.length === 0) {
        failures.push("custody records must be a nonempty array");
        return false;
    }
    if (!Number.isSafeInteger(startLine) || !Number.isSafeInteger(endLine)
        || startLine <= 0 || endLine < startLine
        || records.length !== endLine - startLine + 1) {
        failures.push("custody line bounds do not describe one continuous physical JSONL interval");
        return false;
    }
    const responseIds = new Map();
    const calls = new Map();
    const outputs = new Map();
    let priorTime = Number.NEGATIVE_INFINITY;
    for (const [index, record] of records.entries()) {
        const expectedLine = startLine + index;
        const value = record?.value;
        if (record?.line !== expectedLine || !exactKeys(value, ["payload", "timestamp", "type"])
            || !canonicalInstant(value?.timestamp)) {
            failures.push(`line ${expectedLine}: record is absent or lacks the exact timestamped JSONL envelope`);
            continue;
        }
        const time = Date.parse(value.timestamp);
        if (time < priorTime) failures.push(`line ${expectedLine}: physical JSONL chronology is backdated`);
        priorTime = time;
        const id = value.payload?.id;
        if (typeof id === "string") {
            if (responseIds.has(id)) failures.push(`line ${expectedLine}: duplicate response item ID from line ${responseIds.get(id)}`);
            responseIds.set(id, expectedLine);
        }
        const callId = value.payload?.call_id;
        if (value.type === "response_item"
            && ["function_call", "custom_tool_call"].includes(value.payload?.type)
            && typeof callId === "string") {
            if (calls.has(callId)) failures.push(`line ${expectedLine}: duplicate call ID from line ${calls.get(callId)}`);
            calls.set(callId, expectedLine);
        }
        if (value.type === "response_item"
            && ["function_call_output", "custom_tool_call_output"].includes(value.payload?.type)
            && typeof callId === "string") {
            if (outputs.has(callId)) failures.push(`line ${expectedLine}: duplicate output for call ID ${callId}`);
            outputs.set(callId, expectedLine);
        }
    }
    return failures.length === 0;
}

function discoverStartLine(records, firstAbsenceCallId) {
    const absenceIndex = records.findIndex(({ value } = {}) => value?.type === "response_item"
        && value.payload?.type === "custom_tool_call"
        && value.payload?.call_id === firstAbsenceCallId);
    if (absenceIndex < 0) return null;
    for (let index = absenceIndex - 1; index >= 0; index -= 1) {
        const payload = records[index]?.value?.payload;
        if (payload?.type === "function_call" && payload.name === "list_agents") return records[index].line;
    }
    return null;
}

/**
 * Validate the coordinator's closed physical custody interval. `records` may be
 * the exact interval or a larger prefix when `startLine`/`endLine` identify the
 * slice. Actor report bytes are supplied as `actor.report` or by `reports` keyed
 * by absolute report path.
 */
export function validateCleanCoordinatorCustody(records, options = {}) {
    const failures = [];
    const workspaceRoot = options.workspaceRoot ?? cleanExecWorkspaceRoot;
    const corpusRoot = options.corpusRoot
        ?? resolve(workspaceRoot, "docs/tranches/V/vnext");
    const turnId = options.turnId;
    if (typeof workspaceRoot !== "string" || !isAbsolute(workspaceRoot)
        || typeof corpusRoot !== "string" || !isAbsolute(corpusRoot)
        || !canonicalUuid.test(turnId ?? "")) {
        return { schema: cleanCoordinatorCustodySchema, failures: [
            "custody options require absolute workspace/corpus roots and one canonical coordinator turn UUID",
        ], transactions: [], start_line: null, end_line: null };
    }
    if (!Array.isArray(records)) {
        return { schema: cleanCoordinatorCustodySchema, failures: [
            "custody records must be a nonempty array",
        ], transactions: [], start_line: null, end_line: null };
    }
    const passes = normalizePasses(options.passes, corpusRoot, options.reports, failures);
    if (passes.length !== 2 || failures.length !== 0) {
        return { schema: cleanCoordinatorCustodySchema, failures, transactions: [], start_line: null, end_line: null };
    }
    const discoveredStart = discoverStartLine(records, passes[0].absence_probe.call_id);
    const startLine = options.startLine ?? discoveredStart;
    const endLine = options.endLine ?? options.evidenceLine ?? records?.at(-1)?.line;
    const startIndices = records.flatMap((record, index) => record?.line === startLine ? [index] : []);
    const endIndices = records.flatMap((record, index) => record?.line === endLine ? [index] : []);
    const interval = startIndices.length === 1 && endIndices.length === 1
        && startIndices[0] <= endIndices[0]
        ? records.slice(startIndices[0], endIndices[0] + 1)
        : [];
    if (startIndices.length !== 1 || endIndices.length !== 1 || startIndices[0] > endIndices[0]) {
        failures.push("custody start/end must each select one physical record in forward array order");
    }
    if (!validateSurface(interval, startLine, endLine, failures)) {
        return { schema: cleanCoordinatorCustodySchema, failures, transactions: [], start_line: startLine ?? null, end_line: endLine ?? null };
    }

    const recordsByLine = new Map(interval.map((record) => [record.line, record]));
    const spawned = new Map();
    const completed = new Set();
    const activityEventIds = new Set();
    const transactions = [];
    let cursor = 0;
    let stopped = false;

    const stop = (message) => {
        failures.push(message);
        stopped = true;
    };

    const consumeActivity = (phase) => {
        const record = interval[cursor];
        const payload = record?.value?.payload;
        if (record?.value?.type !== "event_msg" || payload?.type !== "sub_agent_activity"
            || payload.kind !== "interacted") return false;
        const actor = spawned.get(payload.agent_path);
        if (!phase.allowActivity || !actor
            || !exactKeys(payload, [
                "agent_path", "agent_thread_id", "event_id", "kind", "occurred_at_ms", "type",
            ])
            || payload.agent_thread_id !== actor.session_id
            || !canonicalCallId.test(payload.event_id ?? "")
            || activityEventIds.has(payload.event_id)
            || !Number.isSafeInteger(payload.occurred_at_ms)
            || payload.occurred_at_ms < Date.parse(actor.__custody_spawned_at)
            || payload.occurred_at_ms !== Date.parse(record.value.timestamp)
            || completed.has(actor.agent_path)) {
            stop(`${phase.pointer}: unconsumed or laundered sub-agent activity at line ${record?.line}`);
            return false;
        }
        activityEventIds.add(payload.event_id);
        transactions.push({ kind: "activity", line: record.line, agent_path: actor.agent_path });
        cursor += 1;
        return true;
    };

    const skipInert = (phase = { allowActivity: false, pointer: "custody" }) => {
        while (!stopped && cursor < interval.length) {
            if (!significant(interval[cursor], turnId)) {
                cursor += 1;
            } else if (!consumeActivity(phase)) {
                break;
            }
        }
    };

    const current = (phase) => {
        skipInert(phase);
        return interval[cursor];
    };

    const consumeCollaborationPair = (expectedName, pointer, phase = { allowActivity: false, pointer }) => {
        const call = current(phase);
        if (stopped || !call) {
            stop(`${pointer}: collaboration call/output pair is absent`);
            return null;
        }
        const callPayload = exactFunctionCall(call, turnId, failures, pointer);
        const output = interval[cursor + 1];
        const outputPayload = exactFunctionOutput(output, callPayload, turnId, failures, pointer);
        if (!callPayload || !outputPayload || callPayload.name !== expectedName
            || output?.line !== call.line + 1) {
            stop(`${pointer}: expected one physically contiguous ${expectedName} call/output pair; found ${describe(call)}`);
            return null;
        }
        const args = strictJson(callPayload.arguments, `${pointer}/arguments`, failures);
        const receipt = strictJson(outputPayload.output, `${pointer}/output`, failures);
        if (!args || !receipt || callPayload.arguments !== canonicalize(args)
            || outputPayload.output !== canonicalize(receipt)) {
            stop(`${pointer}: collaboration arguments/output are not exact canonical JSON`);
            return null;
        }
        cursor += 2;
        transactions.push({ kind: expectedName, call_line: call.line, output_line: output.line, call_id: callPayload.call_id });
        return { call, output, callPayload, args, receipt };
    };

    const validateAgentList = (receipt, pointer, { quiescent = false } = {}) => {
        if (!exactKeys(receipt, ["agents"]) || !Array.isArray(receipt.agents)) {
            stop(`${pointer}: list_agents receipt must contain exactly one agents array`);
            return;
        }
        const statuses = new Map();
        for (const [index, entry] of receipt.agents.entries()) {
            const status = entry?.agent_status;
            if (!exactKeys(entry, ["agent_name", "agent_status"])
                || typeof entry.agent_name !== "string" || statuses.has(entry.agent_name)
                || !(status === "running"
                    || (exactKeys(status, ["completed"]) && typeof status.completed === "string"))) {
                stop(`${pointer}: malformed or duplicate agent status at index ${index}`);
                return;
            }
            statuses.set(entry.agent_name, status);
        }
        if (statuses.get("/root") !== "running") {
            stop(`${pointer}: coordinator root must be present and running`);
            return;
        }
        for (const [path, status] of statuses) {
            if (path === "/root") continue;
            const actor = spawned.get(path);
            if (quiescent) {
                if (status === "running") stop(`${pointer}: non-root agent ${path} violates quiescence`);
            } else if (!actor && status === "running") {
                stop(`${pointer}: unknown running agent ${path} lacks a consumed spawn`);
            } else if (actor) {
                if (status === "running" && completed.has(path)) {
                    stop(`${pointer}: completed actor ${path} regressed to running`);
                }
                if (status !== "running") completed.add(path);
            }
        }
        if (!quiescent) {
            for (const path of spawned.keys()) {
                if (!statuses.has(path)) stop(`${pointer}: spawned actor ${path} is missing from list_agents`);
            }
        }
        if (quiescent) {
            const futurePaths = passes.flatMap((pass) => pass.actors).map((actor) => actor.agent_path);
            for (const path of futurePaths) {
                if (statuses.has(path)) stop(`${pointer}: future campaign actor ${path} is not fresh`);
            }
        }
    };

    const consumeObservation = (pointer) => {
        const call = current({ allowActivity: true, pointer });
        const name = call?.value?.payload?.name;
        if (!call || call.value?.payload?.type !== "function_call"
            || !["wait_agent", "list_agents"].includes(name)) return false;
        const pair = consumeCollaborationPair(name, pointer, { allowActivity: true, pointer });
        if (!pair) return false;
        if (name === "wait_agent") {
            const validArgs = exactKeys(pair.args, [])
                || (exactKeys(pair.args, ["timeout_ms"])
                    && Number.isSafeInteger(pair.args.timeout_ms)
                    && pair.args.timeout_ms >= 10000 && pair.args.timeout_ms <= 3600000);
            if (!validArgs || !exactKeys(pair.receipt, ["message", "timed_out"])
                || typeof pair.receipt.message !== "string" || pair.receipt.message === ""
                || typeof pair.receipt.timed_out !== "boolean") {
                stop(`${pointer}: wait_agent observation is malformed`);
            }
        } else {
            if (!exactKeys(pair.args, [])) stop(`${pointer}: list_agents arguments must be empty`);
            validateAgentList(pair.receipt, pointer);
        }
        return true;
    };

    const observeUntilComplete = (actors, pointer) => {
        let observations = 0;
        while (!stopped) {
            current({ allowActivity: true, pointer });
            const allComplete = actors.every((actor) => completed.has(actor.agent_path));
            if (allComplete) {
                const nextName = interval[cursor]?.value?.payload?.name;
                if (!["wait_agent", "list_agents"].includes(nextName)) break;
            }
            if (!consumeObservation(pointer)) {
                stop(`${pointer}: only wait_agent/list_agents observations may occur until completion is proven`);
                break;
            }
            observations += 1;
        }
        if (!actors.every((actor) => completed.has(actor.agent_path))) {
            stop(`${pointer}: list_agents never proved every required actor complete`);
        }
        if (observations === 0) stop(`${pointer}: at least one completion observation is required`);
    };

    const consumeExecPair = (source, expectedCallId, pointer) => {
        const call = current({ allowActivity: false, pointer });
        if (stopped || !call) {
            stop(`${pointer}: exec call/output pair is absent`);
            return null;
        }
        const callPayload = exactCustomCall(call, turnId, failures, pointer);
        const output = interval[cursor + 1];
        const outputPayload = exactCustomOutput(output, callPayload, turnId, failures, pointer);
        if (!callPayload || !outputPayload || output?.line !== call.line + 1
            || callPayload.input !== source
            || (expectedCallId !== undefined && callPayload.call_id !== expectedCallId)) {
            stop(`${pointer}: expected one physically contiguous exact exec call/output pair; found ${describe(call)}`);
            return null;
        }
        let receipt = null;
        try {
            receipt = renderCleanExecResult(outputPayload.output);
        } catch (error) {
            stop(`${pointer}: exec completion receipt is invalid (${error.message})`);
            return null;
        }
        if (!exactKeys(receipt, ["exit_code", "output", "wall_time_seconds"])) {
            stop(`${pointer}: synchronous exec receipt contains noncanonical or truncation fields`);
            return null;
        }
        cursor += 2;
        transactions.push({ kind: "exec", call_line: call.line, output_line: output.line, call_id: callPayload.call_id });
        return { call, output, callPayload, outputPayload, receipt };
    };

    let predecessorHashOutput = null;

    const consumeAbsence = (pass) => {
        const pointer = `pass ${pass.pass}/absence`;
        const command = `node docs/tranches/V/vnext/tools/probe-clean-report-absence.mjs --pass ${pass.pass}`;
        const pair = consumeExecPair(
            canonicalCleanStartSource(command, workspaceRoot),
            pass.absence_probe.call_id,
            pointer,
        );
        if (!pair) return;
        const absent = ["A", "B", "ADJ"].map((tag) => `reviews/FORMATION-CLEAN-PASS-${pass.pass}-${tag}.md`);
        const expectedOutput = `${JSON.stringify({ schema: "vnext-clean-report-absence/1", pass: pass.pass, absent })}\n`;
        if (pair.receipt.output !== expectedOutput
            || pair.call.line !== pass.absence_probe.call_line
            || pair.output.line !== pass.absence_probe.output_line) {
            stop(`${pointer}: receipt or manifest line binding is not the exact ENOENT proof`);
        }
        if (pass.pass === 2 && predecessorHashOutput
            && (pair.call.line <= predecessorHashOutput.line
                || Date.parse(pair.call.value.timestamp) < Date.parse(predecessorHashOutput.value.timestamp))) {
            stop(`${pointer}: pass 2 absence must be physically and temporally after the pass-1 adjudicator hash`);
        }
        transactions.at(-1).kind = "absence";
        transactions.at(-1).pass = pass.pass;
    };

    const consumeSpawn = (pass, actor) => {
        const pointer = `pass ${pass.pass}/${actor.role}/spawn`;
        const spawn = current({ allowActivity: false, pointer });
        if (!spawn || spawn.value?.payload?.type !== "function_call"
            || spawn.value.payload.name !== "spawn_agent"
            || spawn.value.payload.call_id !== actor.spawn_call_id) {
            stop(`${pointer}: expected bound spawn triplet; found ${describe(spawn)}`);
            return;
        }
        const expectedTask = actor.agent_path.slice("/root/".length);
        const expectedPrompt = actor.expected_prompt ?? actor.prompt_sha256 ?? "content-addressed-clean-prompt";
        const projection = validateCleanSpawnTriplet(recordsByLine, spawn, {
            actor,
            expectedTask,
            expectedPrompt,
        });
        for (const failure of projection.failures) failures.push(`${pointer}: ${failure}`);
        if (projection.failures.length !== 0 || spawn.line !== actor.spawn_line
            || projection.turnId !== turnId || !encryptedCarrier.test(projection.encryptedTask ?? "")
            || (canonicalSha256.test(actor.encrypted_task_sha256 ?? "")
                && sha256(projection.encryptedTask ?? "") !== actor.encrypted_task_sha256)) {
            stop(`${pointer}: triplet is not the exact bound encrypted child join`);
            return;
        }
        actor.__custody_spawned_at = spawn.value.timestamp;
        spawned.set(actor.agent_path, actor);
        cursor += 3;
        transactions.push({
            kind: "spawn", pass: pass.pass, role: actor.role,
            call_line: spawn.line, output_line: spawn.line + 2, call_id: actor.spawn_call_id,
        });
    };

    const consumePersist = (pass, actor) => {
        const pointer = `pass ${pass.pass}/${actor.role}/persist`;
        if (!completed.has(actor.agent_path)) {
            stop(`${pointer}: persistence precedes list_agents completion proof`);
            return;
        }
        const callRecord = current({ allowActivity: false, pointer });
        const patchEvent = interval[cursor + 1];
        const outputRecord = interval[cursor + 2];
        const callPayload = callRecord?.value?.payload;
        if (!callRecord || callPayload?.type !== "custom_tool_call"
            || callPayload.call_id !== actor.persist_call_id) {
            stop(`${pointer}: expected bound persistence triplet; found ${describe(callRecord)}`);
            return;
        }
        const call = {
            line: callRecord.line,
            timestamp: callRecord.value.timestamp,
            kind: "custom_tool_call",
            name: callPayload.name,
            input: callPayload.input,
            raw: callRecord.value,
        };
        const output = {
            line: outputRecord?.line,
            timestamp: outputRecord?.value?.timestamp,
            kind: "custom_tool_call_output",
            value: outputRecord?.value?.payload?.output,
            raw: outputRecord?.value,
        };
        const projection = validateCleanPersistPair(call, output, {
            patchEvent,
            expectedTurnId: turnId,
            reportPath: actor.report_path,
            report: actor.__custody_report,
        });
        for (const failure of projection.failures) failures.push(`${pointer}: ${failure}`);
        if (projection.failures.length !== 0
            || call.input !== canonicalCleanPersistSource(actor.report_path, actor.__custody_report)
            || call.line !== actor.persist_call_line || output.line !== actor.persist_output_line) {
            stop(`${pointer}: triplet is not the exact byte-bound Add File operation`);
            return;
        }
        cursor += 3;
        transactions.push({
            kind: "persist", pass: pass.pass, role: actor.role,
            call_line: call.line, output_line: output.line, call_id: actor.persist_call_id,
        });
    };

    const consumeHash = (pass, actor) => {
        const pointer = `pass ${pass.pass}/${actor.role}/hash`;
        const command = `node docs/tranches/V/vnext/tools/hash-clean-report.mjs --pass ${pass.pass} --tag ${actor.__custody_tag}`;
        const pair = consumeExecPair(
            canonicalCleanStartSource(command, workspaceRoot),
            actor.hash_call_id,
            pointer,
        );
        if (!pair) return;
        const expected = {
            schema: cleanReportHashSchema,
            pass: pass.pass,
            tag: actor.__custody_tag,
            path: actor.report_path,
            sha256: actor.report_sha256,
        };
        if (pair.receipt.output !== renderCleanReportHashReceipt(expected)) {
            stop(`${pointer}: stdout is not the exact canonical report-hash receipt`);
            return;
        }
        if (pair.call.line !== actor.hash_call_line || pair.output.line !== actor.hash_output_line) {
            stop(`${pointer}: hash call/output do not match the mandatory manifest line bindings`);
            return;
        }
        transactions.at(-1).kind = "hash";
        transactions.at(-1).pass = pass.pass;
        transactions.at(-1).role = actor.role;
        transactions.at(-1).sha256 = actor.report_sha256;
        if (pass.pass === 1 && actor.role === "adjudicator") predecessorHashOutput = pair.output;
    };

    const quiescence = consumeCollaborationPair("list_agents", "quiescence");
    if (quiescence) {
        if (!exactKeys(quiescence.args, [])
            || (options.quiescenceCallId !== undefined
                && quiescence.callPayload.call_id !== options.quiescenceCallId)) {
            stop("quiescence: list_agents call is not the exact bound empty observation");
        } else {
            validateAgentList(quiescence.receipt, "quiescence", { quiescent: true });
            transactions.at(-1).kind = "quiescence";
        }
    }

    for (const pass of passes) {
        if (stopped) break;
        consumeAbsence(pass);
        const remainingCritics = new Map(pass.critics.map((actor) => [actor.spawn_call_id, actor]));
        for (let index = 0; index < 2 && !stopped; index += 1) {
            const spawnCall = current({ allowActivity: false, pointer: `pass ${pass.pass}/critics` });
            const actor = remainingCritics.get(spawnCall?.value?.payload?.call_id);
            if (!actor) {
                stop(`pass ${pass.pass}/critics: only the two bound critic spawns may follow absence`);
                break;
            }
            remainingCritics.delete(actor.spawn_call_id);
            consumeSpawn(pass, actor);
        }
        if (remainingCritics.size !== 0 && !stopped) stop(`pass ${pass.pass}/critics: both critic spawn triplets are required`);
        observeUntilComplete(pass.critics, `pass ${pass.pass}/critics/observations`);
        const remainingPersistence = new Map(pass.critics.map((actor) => [actor.persist_call_id, actor]));
        for (let index = 0; index < 2 && !stopped; index += 1) {
            const persistCall = current({ allowActivity: false, pointer: `pass ${pass.pass}/critics/persistence` });
            const actor = remainingPersistence.get(persistCall?.value?.payload?.call_id);
            if (!actor) {
                stop(`pass ${pass.pass}/critics: expected one of the two bound critic persistence triplets`);
                break;
            }
            remainingPersistence.delete(actor.persist_call_id);
            consumePersist(pass, actor);
            if (!stopped) consumeHash(pass, actor);
        }
        if (stopped) break;
        consumeSpawn(pass, pass.adjudicator);
        observeUntilComplete([pass.adjudicator], `pass ${pass.pass}/adjudicator/observations`);
        consumePersist(pass, pass.adjudicator);
        if (!stopped) consumeHash(pass, pass.adjudicator);
    }

    skipInert({ allowActivity: false, pointer: "custody end" });
    if (stopped || cursor !== interval.length) {
        const unconsumed = interval.slice(cursor).filter((record) => significant(record, turnId));
        if (unconsumed.length !== 0) {
            failures.push(`custody has ${unconsumed.length} unconsumed effect/call/output record(s); first is ${describe(unconsumed[0])}`);
        }
    }
    const finalTransaction = transactions.at(-1);
    if (!stopped && (finalTransaction?.kind !== "hash"
        || finalTransaction.pass !== 2 || finalTransaction.role !== "adjudicator"
        || finalTransaction.output_line !== endLine)) {
        failures.push("custody interval must end exactly at the pass-2 adjudicator report-hash output");
    }
    return {
        schema: cleanCoordinatorCustodySchema,
        failures,
        transactions,
        start_line: startLine,
        end_line: endLine,
        passes: failures.length === 0 ? 2 : null,
        reports_hashed: failures.length === 0
            ? transactions.filter(({ kind }) => kind === "hash").length
            : null,
    };
}
