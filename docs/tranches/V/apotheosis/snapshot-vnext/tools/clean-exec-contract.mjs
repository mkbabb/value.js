import { createHash } from "node:crypto";

import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";

export const cleanExecWorkspaceRoot = "/Users/mkbabb/Programming/value.js";
export const cleanExecLimits = Object.freeze({
    outerYieldTimeMs: 60000,
    outerMaxOutputTokens: 50000,
    nestedYieldTimeMs: 30000,
    nestedMaxOutputTokens: 20000,
    maxPolls: 120,
    maxElapsedMs: 3900000,
    maxOutputBytes: 1048576,
});
export const cleanPersistFileTimestampToleranceMs = 1;

const outerPragma = "// @exec: {\"yield_time_ms\": 60000, \"max_output_tokens\": 50000}";
const resultSuffix = ");\ntext(JSON.stringify(result));\n";
const startPrefix = `${outerPragma}\nconst result = await tools.exec_command(`;
const pollPrefix = `${outerPragma}\nconst result = await tools.write_stdin(`;
const receiptKeys = new Set([
    "chunk_id",
    "exit_code",
    "original_token_count",
    "output",
    "session_id",
    "wall_time_seconds",
]);
const completedStatus = /^Script completed\nWall time (?:0|[1-9][0-9]*)(?:\.[0-9]+)? seconds\nOutput:\n$/;
const reservedCleanReportGrammar = /(?:BEGIN|END) VNEXT-CLEAN-REPORT|FORMATION-CLEAN-PASS-[12]-|Evidence reviewed:|Commands executed:|Verdict:|VNEXT-CLEAN-ATTESTATION/m;
const reservedFindingsToken = /findings/giu;
const unsafeCleanText = /[\r\u0085\u2028\u2029]|\p{Default_Ignorable_Code_Point}/u;
const setextHeadingLine = /^[\t\p{Zs}]{0,3}(?:=+|-+)[\t\p{Zs}]*$/mu;
const cleanResponseItemTypes = new Set([
    "agent_message",
    "custom_tool_call",
    "custom_tool_call_output",
    "message",
    "reasoning",
]);
const cleanTopLevelRecordTypes = new Set([
    "event_msg",
    "inter_agent_communication_metadata",
    "response_item",
    "session_meta",
    "turn_context",
    "world_state",
]);
const cleanEventMessageTypes = new Set([
    "agent_message",
    "task_complete",
    "task_started",
    "token_count",
]);
const canonicalUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const canonicalBootstrapMessageItemId = /^msg_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const canonicalAssistantMessageItemId = /^msg_[0-9a-f]{50}$/;
const canonicalReasoningItemId = /^rs_[0-9a-f]{50}$/;
const canonicalAgentMessageItemId = /^amsg_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const canonicalCustomCallItemId = /^ctc_[0-9a-f]{50}$/;
const canonicalCustomOutputItemId = /^ctco_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const canonicalCustomCallId = /^call_[A-Za-z0-9]{24}$/;
const canonicalSpawnItemId = /^fc_[0-9a-f]{50}$/;
const canonicalSpawnOutputItemId = /^fco_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const isCanonicalInstant = (value) => typeof value === "string"
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;

const textSha256 = (value) => createHash("sha256").update(value, "utf8").digest("hex");
const semanticFindingsHeadingSource = "^[\\t\\p{Zs}]*##[\\t\\p{Zs}]+Findings(?:[\\t\\p{Zs}]+[^\\r\\n]*)?$";
const semanticFindingsHeading = new RegExp(semanticFindingsHeadingSource, "mu");
const cleanHeadingSpecs = Object.freeze({
    evidence: {
        candidate: "^[\\t\\p{Zs}]*Evidence reviewed:[\\t\\p{Zs}]*$",
        exact: "^Evidence reviewed:$",
    },
    commands: {
        candidate: "^[\\t\\p{Zs}]*Commands executed:[\\t\\p{Zs}]*$",
        exact: "^Commands executed:$",
    },
    findings: {
        candidate: semanticFindingsHeadingSource,
        exact: "^## Findings$",
    },
});

function cleanHeadingFailures(report, names) {
    if (typeof report !== "string") return ["report must be a string"];
    const failures = [];
    if (unsafeCleanText.test(report)) {
        failures.push("report must use LF lines and contain no default-ignorable code point");
    }
    if (/(?:BEGIN|END) VNEXT-CLEAN-REPORT/.test(report)) {
        failures.push("persisted report bytes must not contain outer envelope markers");
    }
    const attestation = report.match(/<!-- VNEXT-CLEAN-ATTESTATION \{[^\r\n]*\} -->/)?.[0] ?? "";
    const prose = attestation === "" ? report : report.replace(attestation, "");
    if ((report.match(/#/g) ?? []).length !== 2 || /[<>]/.test(prose) || setextHeadingLine.test(prose)) {
        failures.push("report markup is closed to one ATX Findings heading and the sole machine attestation");
    }
    if (names.includes("findings") && [...report.matchAll(reservedFindingsToken)].length !== 1) {
        failures.push("the case-insensitive findings token is reserved exactly once for the canonical terminal heading");
    }
    for (const name of names) {
        const spec = cleanHeadingSpecs[name];
        const candidates = [...report.matchAll(new RegExp(spec.candidate, "gmu"))].length;
        const exact = [...report.matchAll(new RegExp(spec.exact, "gm"))].length;
        if (candidates !== 1 || exact !== 1) {
            failures.push(`report must contain exactly one unshadowed byte-exact ${name} heading`);
        }
    }
    return failures;
}

export function validateCleanReportHeadings(report) {
    return { failures: cleanHeadingFailures(report, ["evidence", "commands", "findings"]) };
}

function cleanResponseSurfaceFailures(records) {
    if (!Array.isArray(records)) return ["records must be an array"];
    const failures = [];
    const responseItemIds = new Map();
    let previousTimestamp = Number.NEGATIVE_INFINITY;
    for (const [index, record] of records.entries()) {
        const value = record?.value;
        if (!value || typeof value !== "object" || Array.isArray(value)
            || Object.keys(value).sort().join(",") !== "payload,timestamp,type"
            || !isCanonicalInstant(value.timestamp)) {
            failures.push(`record ${index + 1} does not have the exact timestamped JSONL envelope`);
        }
        const timestampMs = Date.parse(value?.timestamp);
        if (Number.isFinite(timestampMs) && timestampMs < previousTimestamp) {
            failures.push(`record ${index + 1} reverses physical JSONL chronology`);
        }
        if (Number.isFinite(timestampMs)) previousTimestamp = timestampMs;
        if (!cleanTopLevelRecordTypes.has(record?.value?.type)) {
            failures.push(`record ${index + 1} has forbidden or unknown top-level type ${String(record?.value?.type)}`);
            continue;
        }
        if (record.value.type === "event_msg" && !cleanEventMessageTypes.has(record.value.payload?.type)) {
            failures.push(`event record ${index + 1} has forbidden or unknown subtype ${String(record.value.payload?.type)}`);
            continue;
        }
        if (record?.value?.type !== "response_item") continue;
        const itemId = record.value.payload?.id;
        if (typeof itemId === "string") {
            if (responseItemIds.has(itemId)) {
                failures.push(`response item IDs must be globally unique; record ${index + 1} duplicates record ${responseItemIds.get(itemId) + 1}`);
            } else {
                responseItemIds.set(itemId, index);
            }
        }
        const type = record.value.payload?.type;
        if (!cleanResponseItemTypes.has(type)) {
            failures.push(`response item ${index + 1} has forbidden or unknown type ${String(type)}`);
        }
    }
    return failures;
}

const tokenUsageKeys = "cache_write_input_tokens,cached_input_tokens,input_tokens,output_tokens,reasoning_output_tokens,total_tokens";
const rateLimitKeys = "credits,individual_limit,limit_id,limit_name,plan_type,primary,rate_limit_reached_type,secondary,spend_control_reached";

function validTokenUsage(value) {
    return value && typeof value === "object" && !Array.isArray(value)
        && Object.keys(value).sort().join(",") === tokenUsageKeys
        && Object.values(value).every((count) => Number.isSafeInteger(count) && count >= 0);
}

function validRateWindow(value) {
    return value && typeof value === "object" && !Array.isArray(value)
        && Object.keys(value).sort().join(",") === "resets_at,used_percent,window_minutes"
        && typeof value.used_percent === "number" && Number.isFinite(value.used_percent)
        && value.used_percent >= 0 && value.used_percent <= 100
        && Number.isSafeInteger(value.window_minutes) && value.window_minutes > 0
        && Number.isSafeInteger(value.resets_at) && value.resets_at > 0;
}

function validTokenCountPayload(payload) {
    const info = payload?.info;
    const limits = payload?.rate_limits;
    const credits = limits?.credits;
    return payload && typeof payload === "object" && !Array.isArray(payload)
        && Object.keys(payload).sort().join(",") === "info,rate_limits,type"
        && payload.type === "token_count"
        && info && typeof info === "object" && !Array.isArray(info)
        && Object.keys(info).sort().join(",") === "last_token_usage,model_context_window,total_token_usage"
        && info.model_context_window === 258400
        && validTokenUsage(info.total_token_usage) && validTokenUsage(info.last_token_usage)
        && limits && typeof limits === "object" && !Array.isArray(limits)
        && Object.keys(limits).sort().join(",") === rateLimitKeys
        && limits.limit_id === "codex" && limits.limit_name === null && limits.plan_type === "pro"
        && validRateWindow(limits.primary) && limits.secondary === null
        && limits.individual_limit === null && limits.spend_control_reached === null
        && limits.rate_limit_reached_type === null
        && credits && typeof credits === "object" && !Array.isArray(credits)
        && Object.keys(credits).sort().join(",") === "balance,has_credits,unlimited"
        && typeof credits.balance === "string"
        && typeof credits.has_credits === "boolean" && typeof credits.unlimited === "boolean";
}

function bootstrapMessageDigests(record, label, failures, turnId) {
    const payload = record?.value?.payload;
    const content = payload?.content;
    const routing = payload?.internal_chat_message_metadata_passthrough;
    if (Object.keys(payload ?? {}).sort().join(",")
            !== "content,id,internal_chat_message_metadata_passthrough,role,type"
        || typeof payload?.id !== "string" || !canonicalBootstrapMessageItemId.test(payload.id)
        || !routing || typeof routing !== "object" || Array.isArray(routing)
        || Object.keys(routing).sort().join(",") !== "turn_id"
        || routing.turn_id !== turnId) {
        failures.push(`${label} does not have the exact lifecycle-joined provider message envelope`);
    }
    if (!Array.isArray(content) || content.length === 0) {
        failures.push(`${label} must contain nonempty canonical input_text blocks`);
        return [];
    }
    const digests = [];
    for (const block of content) {
        if (!block || typeof block !== "object" || Array.isArray(block)
            || Object.keys(block).sort().join(",") !== "text,type"
            || block.type !== "input_text" || typeof block.text !== "string" || block.text === "") {
            failures.push(`${label} contains a noncanonical input_text block`);
        } else {
            digests.push(textSha256(block.text));
        }
    }
    return digests;
}

export function cleanProviderBootstrapProjection(records) {
    if (!Array.isArray(records)) return null;
    const ofType = (type) => records.filter(({ value } = {}) => value?.type === type);
    const messages = records.filter(({ value } = {}) => value?.type === "response_item"
        && value.payload?.type === "message");
    const session = ofType("session_meta")[0]?.value.payload;
    const world = ofType("world_state")[0]?.value.payload;
    const context = ofType("turn_context")[0]?.value.payload;
    const contextAuthority = context && typeof context === "object" && !Array.isArray(context)
        ? { ...context }
        : null;
    if (contextAuthority) delete contextAuthority.turn_id;
    const digestMessages = (role) => messages
        .filter(({ value }) => value.payload?.role === role)
        .map(({ value }) => (value.payload?.content ?? []).map(({ text }) =>
            typeof text === "string" ? textSha256(text) : null));
    return {
        baseInstructions: typeof session?.base_instructions?.text === "string"
            ? textSha256(session.base_instructions.text) : null,
        worldState: world ? textSha256(canonicalize(world)) : null,
        turnContext: contextAuthority ? textSha256(canonicalize(contextAuthority)) : null,
        developer: digestMessages("developer"),
        user: digestMessages("user"),
    };
}

export function validateCleanTranscriptSurface(
    records,
    agentPath,
    bootstrapDigests,
) {
    const failures = cleanResponseSurfaceFailures(records);
    if (!Array.isArray(records)) return { failures };
    if (typeof agentPath !== "string" || !/^\/root\/[a-z0-9_]+$/.test(agentPath)) {
        failures.push("agentPath must be one canonical child path");
        return { failures };
    }

    const messages = records.filter(({ value } = {}) => value?.type === "response_item"
        && value.payload?.type === "message");
    const unexpectedRoles = messages.filter(({ value }) => !["assistant", "developer", "user"].includes(value.payload?.role));
    if (unexpectedRoles.length !== 0) {
        failures.push("child message roles are closed to the pinned developer prefix, user bootstrap, and assistant output");
    }
    const developerMessages = messages.filter(({ value }) => value.payload?.role === "developer");
    const userMessages = messages.filter(({ value }) => value.payload?.role === "user");
    const assistantMessages = messages.filter(({ value }) => value.payload?.role === "assistant");
    const recordsOfType = (type) => records.filter(({ value } = {}) => value?.type === type);
    const soleSessionMeta = recordsOfType("session_meta");
    const soleWorldState = recordsOfType("world_state");
    const soleTurnContext = recordsOfType("turn_context");
    const soleInterAgentMetadata = recordsOfType("inter_agent_communication_metadata");
    for (const [label, items] of [
        ["session_meta", soleSessionMeta],
        ["world_state", soleWorldState],
        ["turn_context", soleTurnContext],
        ["inter_agent_communication_metadata", soleInterAgentMetadata],
    ]) {
        if (items.length !== 1) failures.push(`child must contain exactly one ${label} record`);
    }
    const sessionPayload = soleSessionMeta[0]?.value.payload;
    const source = sessionPayload?.source;
    const subagent = source?.subagent;
    const spawn = subagent?.thread_spawn;
    const contextWindow = sessionPayload?.context_window;
    const git = sessionPayload?.git;
    const sessionIds = [sessionPayload?.session_id, sessionPayload?.parent_thread_id];
    const sessionTimestampDelta = Date.parse(soleSessionMeta[0]?.value.timestamp)
        - Date.parse(sessionPayload?.timestamp);
    if (!sessionPayload || typeof sessionPayload !== "object" || Array.isArray(sessionPayload)
        || Object.keys(sessionPayload).sort().join(",")
            !== "agent_nickname,agent_path,base_instructions,cli_version,context_window,cwd,git,history_mode,id,model_provider,multi_agent_version,originator,parent_thread_id,session_id,source,thread_source,timestamp"
        || sessionIds.some((id) => typeof id !== "string" || !canonicalUuid.test(id))
        || sessionIds[0] !== sessionIds[1]
        || typeof sessionPayload.id !== "string" || !canonicalUuid.test(sessionPayload.id)
        || sessionPayload.agent_path !== agentPath
        || typeof sessionPayload.agent_nickname !== "string" || sessionPayload.agent_nickname === ""
        || sessionPayload.cwd !== cleanExecWorkspaceRoot || sessionPayload.originator !== "Codex Desktop"
        || sessionPayload.cli_version !== "0.145.0-alpha.18" || sessionPayload.model_provider !== "openai"
        || sessionPayload.thread_source !== "subagent" || sessionPayload.history_mode !== "legacy"
        || sessionPayload.multi_agent_version !== "v2"
        || typeof sessionPayload.timestamp !== "string"
        || !Number.isFinite(Date.parse(sessionPayload.timestamp))
        || new Date(sessionPayload.timestamp).toISOString() !== sessionPayload.timestamp
        || !Number.isFinite(sessionTimestampDelta)
        || sessionTimestampDelta <= 0 || sessionTimestampDelta >= 1000
        || !source || typeof source !== "object" || Array.isArray(source)
        || Object.keys(source).sort().join(",") !== "subagent"
        || !subagent || typeof subagent !== "object" || Array.isArray(subagent)
        || Object.keys(subagent).sort().join(",") !== "thread_spawn"
        || !spawn || typeof spawn !== "object" || Array.isArray(spawn)
        || Object.keys(spawn).sort().join(",")
            !== "agent_nickname,agent_path,agent_role,depth,parent_thread_id"
        || spawn.parent_thread_id !== sessionPayload.parent_thread_id || spawn.depth !== 1
        || spawn.agent_path !== agentPath || spawn.agent_nickname !== sessionPayload.agent_nickname
        || spawn.agent_role !== null
        || !contextWindow || typeof contextWindow !== "object" || Array.isArray(contextWindow)
        || Object.keys(contextWindow).sort().join(",") !== "window_id"
        || typeof contextWindow.window_id !== "string" || !canonicalUuid.test(contextWindow.window_id)
        || !git || typeof git !== "object" || Array.isArray(git)
        || Object.keys(git).sort().join(",") !== "branch,commit_hash,repository_url"
        || typeof git.branch !== "string" || git.branch === ""
        || typeof git.commit_hash !== "string" || !/^[0-9a-f]{40}$/.test(git.commit_hash)
        || typeof git.repository_url !== "string" || git.repository_url === "") {
        failures.push("session metadata must have the exact measured subagent identity envelope");
    }
    const eventRecords = recordsOfType("event_msg");
    const eventType = (type) => eventRecords.filter(({ value }) => value.payload?.type === type);
    const taskStarted = eventType("task_started");
    const taskComplete = eventType("task_complete");
    const agentEvents = eventType("agent_message");
    if (taskStarted.length !== 1 || taskComplete.length !== 1) {
        failures.push("child must contain exactly one task_started and one task_complete event");
    }
    const tokenCounts = eventType("token_count");
    if (tokenCounts.length === 0) {
        failures.push("child must contain at least one token_count event");
    } else if (tokenCounts.some(({ value }) => !validTokenCountPayload(value.payload))) {
        failures.push("every token_count event must have the exact measured dynamic-telemetry envelope");
    }
    if (tokenCounts.some(({ line }) => !Number.isSafeInteger(line)
        || line <= (taskStarted[0]?.line ?? Number.POSITIVE_INFINITY)
        || line >= (taskComplete[0]?.line ?? Number.NEGATIVE_INFINITY))) {
        failures.push("every token_count event must lie strictly inside the served task interval");
    }
    if (!taskComplete[0] || taskComplete[0].line !== records.at(-1)?.line) {
        failures.push("task_complete must be the final physical JSONL record");
    }
    if (agentEvents.length !== assistantMessages.length
        || agentEvents.some((event, index) => {
            const assistant = assistantMessages[index];
            const content = assistant?.value.payload?.content;
            const payload = event.value.payload;
            return Object.keys(payload ?? {}).sort().join(",") !== "memory_citation,message,phase,type"
                || payload.memory_citation !== null
                || payload.phase !== assistant?.value.payload?.phase
                || event.value.payload?.message !== content?.[0]?.text
                || !Number.isSafeInteger(event.line) || !Number.isSafeInteger(assistant?.line)
                || event.line >= assistant.line;
        })) {
        failures.push("event agent messages must be ordered exact mirrors of assistant messages");
    }
    const turnIds = [taskStarted[0], soleTurnContext[0], taskComplete[0]]
        .map((record) => record?.value.payload?.turn_id);
    if (turnIds.some((turnId) => typeof turnId !== "string" || !canonicalUuid.test(turnId))
        || new Set(turnIds).size !== 1) {
        failures.push("task start, turn context, and task completion must share one canonical UUID turn_id");
    }
    const customCalls = records.filter(({ value } = {}) => value?.type === "response_item"
        && value.payload?.type === "custom_tool_call");
    const customOutputs = records.filter(({ value } = {}) => value?.type === "response_item"
        && value.payload?.type === "custom_tool_call_output");
    const reasoningItems = records.filter(({ value } = {}) => value?.type === "response_item"
        && value.payload?.type === "reasoning");
    for (const [index, record] of reasoningItems.entries()) {
        const payload = record.value.payload;
        const routing = payload?.internal_chat_message_metadata_passthrough;
        if (Object.keys(payload ?? {}).sort().join(",")
                !== "encrypted_content,id,internal_chat_message_metadata_passthrough,summary,type"
            || typeof payload.id !== "string" || !canonicalReasoningItemId.test(payload.id)
            || !Array.isArray(payload.summary) || payload.summary.length !== 0
            || typeof payload.encrypted_content !== "string" || payload.encrypted_content === ""
            || !routing || typeof routing !== "object" || Array.isArray(routing)
            || Object.keys(routing).sort().join(",") !== "turn_id" || routing.turn_id !== turnIds[0]) {
            failures.push(`reasoning item ${index + 1} does not have the exact lifecycle-joined envelope`);
        }
    }
    for (const [index, record] of customCalls.entries()) {
        const payload = record.value.payload;
        const routing = payload?.internal_chat_message_metadata_passthrough;
        if (Object.keys(payload ?? {}).sort().join(",")
                !== "call_id,id,input,internal_chat_message_metadata_passthrough,name,status,type"
            || typeof payload.id !== "string" || !canonicalCustomCallItemId.test(payload.id)
            || typeof payload.call_id !== "string" || !canonicalCustomCallId.test(payload.call_id)
            || payload.name !== "exec" || payload.status !== "completed" || typeof payload.input !== "string"
            || !routing || typeof routing !== "object" || Array.isArray(routing)
            || Object.keys(routing).sort().join(",") !== "turn_id" || routing.turn_id !== turnIds[0]) {
            failures.push(`custom tool call ${index + 1} does not have the exact lifecycle-joined envelope`);
        }
    }
    for (const [index, record] of customOutputs.entries()) {
        const payload = record.value.payload;
        const routing = payload?.internal_chat_message_metadata_passthrough;
        if (Object.keys(payload ?? {}).sort().join(",")
                !== "call_id,id,internal_chat_message_metadata_passthrough,output,type"
            || typeof payload.id !== "string" || !canonicalCustomOutputItemId.test(payload.id)
            || typeof payload.call_id !== "string" || !canonicalCustomCallId.test(payload.call_id)
            || !Array.isArray(payload.output) || payload.output.length !== 2
            || payload.output.some((block) => !block || typeof block !== "object" || Array.isArray(block)
                || Object.keys(block).sort().join(",") !== "text,type"
                || block.type !== "input_text" || typeof block.text !== "string")
            || !routing || typeof routing !== "object" || Array.isArray(routing)
            || Object.keys(routing).sort().join(",") !== "turn_id" || routing.turn_id !== turnIds[0]) {
            failures.push(`custom tool output ${index + 1} does not have the exact lifecycle-joined envelope`);
        }
    }
    const startPayload = taskStarted[0]?.value.payload;
    const completePayload = taskComplete[0]?.value.payload;
    const startTimestampMs = Date.parse(taskStarted[0]?.value.timestamp);
    const completeTimestampMs = Date.parse(taskComplete[0]?.value.timestamp);
    const finalMessages = assistantMessages.filter(({ value }) => value.payload?.phase === "final_answer");
    if (!startPayload || Object.keys(startPayload).sort().join(",")
            !== "collaboration_mode_kind,model_context_window,started_at,turn_id,type"
        || startPayload.collaboration_mode_kind !== "default" || startPayload.model_context_window !== 258400
        || !Number.isSafeInteger(startPayload.started_at) || startPayload.started_at <= 0
        || startPayload.started_at !== Math.floor(startTimestampMs / 1000)) {
        failures.push("task_started must have the exact measured lifecycle envelope");
    }
    if (!completePayload || Object.keys(completePayload).sort().join(",")
            !== "completed_at,duration_ms,last_agent_message,started_at,time_to_first_token_ms,turn_id,type"
        || !Number.isSafeInteger(completePayload.started_at)
        || completePayload.started_at !== startPayload?.started_at
        || !Number.isSafeInteger(completePayload.completed_at)
        || completePayload.completed_at < completePayload.started_at
        || completePayload.completed_at !== Math.floor(completeTimestampMs / 1000)
        || !Number.isSafeInteger(completePayload.duration_ms) || completePayload.duration_ms < 0
        || !Number.isSafeInteger(completePayload.time_to_first_token_ms)
        || completePayload.time_to_first_token_ms < 0
        || completePayload.time_to_first_token_ms > completePayload.duration_ms
        || completePayload.duration_ms < (completePayload.completed_at - completePayload.started_at) * 1000
        || completePayload.duration_ms >= (completePayload.completed_at - completePayload.started_at + 1) * 1000
        || Math.abs(completePayload.duration_ms - (completeTimestampMs - startTimestampMs)) >= 1000
        || finalMessages.length !== 1
        || completePayload.last_agent_message !== finalMessages[0]?.value.payload?.content?.[0]?.text) {
        failures.push("task_complete must have the exact final-message-joined lifecycle envelope");
    }
    for (const [index, assistant] of assistantMessages.entries()) {
        const payload = assistant.value.payload;
        const content = payload?.content;
        const routing = payload?.internal_chat_message_metadata_passthrough;
        if (Object.keys(payload ?? {}).sort().join(",")
                !== "content,id,internal_chat_message_metadata_passthrough,phase,role,type"
            || typeof payload?.id !== "string" || !canonicalAssistantMessageItemId.test(payload.id)
            || !Array.isArray(content) || content.length !== 1
            || Object.keys(content[0] ?? {}).sort().join(",") !== "text,type"
            || content[0]?.type !== "output_text" || typeof content[0]?.text !== "string"
            || !routing || typeof routing !== "object" || Array.isArray(routing)
            || Object.keys(routing).sort().join(",") !== "turn_id"
            || routing.turn_id !== turnIds[0]) {
            failures.push(`assistant message ${index + 1} does not have the exact lifecycle-joined provider envelope`);
        }
    }
    const interAgentPayload = soleInterAgentMetadata[0]?.value.payload;
    if (!interAgentPayload || typeof interAgentPayload !== "object" || Array.isArray(interAgentPayload)
        || Object.keys(interAgentPayload).sort().join(",") !== "trigger_turn"
        || interAgentPayload.trigger_turn !== true) {
        failures.push("inter-agent metadata must have the exact {trigger_turn:true} shape");
    }
    if (soleWorldState[0]?.value.payload?.full !== true
        || !soleWorldState[0]?.value.payload?.state
        || typeof soleWorldState[0].value.payload.state !== "object"
        || Array.isArray(soleWorldState[0].value.payload.state)) {
        failures.push("world_state must be one full object snapshot");
    }
    const digestMatrix = (matrix, lengths) => Array.isArray(matrix)
        && canonicalize(matrix.map((row) => Array.isArray(row) ? row.length : null)) === canonicalize(lengths)
        && matrix.flat().every((digest) => typeof digest === "string" && /^[0-9a-f]{64}$/.test(digest));
    if (!bootstrapDigests || typeof bootstrapDigests !== "object"
        || !/^[0-9a-f]{64}$/.test(bootstrapDigests.baseInstructions)
        || !/^[0-9a-f]{64}$/.test(bootstrapDigests.worldState)
        || !/^[0-9a-f]{64}$/.test(bootstrapDigests.turnContext)
        || !digestMatrix(bootstrapDigests.developer, [5, 1, 1])
        || !digestMatrix(bootstrapDigests.user, [3])) {
        failures.push("bootstrap digest authority is malformed");
    }
    const baseInstructions = soleSessionMeta[0]?.value.payload?.base_instructions;
    if (!baseInstructions || typeof baseInstructions !== "object" || Array.isArray(baseInstructions)
        || Object.keys(baseInstructions).sort().join(",") !== "text"
        || typeof baseInstructions.text !== "string" || baseInstructions.text === "") {
        failures.push("session base instructions must have the exact nonempty {text} shape");
    } else if (textSha256(baseInstructions.text) !== bootstrapDigests?.baseInstructions) {
        failures.push("session base instructions differ from the pinned provider digest");
    }
    const worldStatePayload = soleWorldState[0]?.value.payload;
    if (worldStatePayload && textSha256(canonicalize(worldStatePayload)) !== bootstrapDigests?.worldState) {
        failures.push("world state differs from the pinned provider digest");
    }
    const turnContextPayload = soleTurnContext[0]?.value.payload;
    if (turnContextPayload && typeof turnContextPayload === "object" && !Array.isArray(turnContextPayload)) {
        const turnContextAuthority = { ...turnContextPayload };
        delete turnContextAuthority.turn_id;
        if (textSha256(canonicalize(turnContextAuthority)) !== bootstrapDigests?.turnContext) {
            failures.push("turn context differs from the pinned provider digest");
        }
    }
    if (developerMessages.length !== 3) {
        failures.push("child must contain exactly the three-message provider developer prefix");
    } else if (canonicalize(developerMessages.map((record, index) =>
        bootstrapMessageDigests(record, `developer bootstrap ${index + 1}`, failures, turnIds[0])))
        !== canonicalize(bootstrapDigests?.developer ?? [])) {
        failures.push("provider developer prefix differs from the pinned digest tuple");
    }
    if (userMessages.length !== 1) {
        failures.push("child must contain exactly one provider bootstrap user message");
    } else if (canonicalize([bootstrapMessageDigests(userMessages[0], "user bootstrap", failures, turnIds[0])])
        !== canonicalize(bootstrapDigests?.user ?? [])) {
        failures.push("provider user bootstrap differs from the pinned digest tuple");
    }

    const carriers = records.filter(({ value } = {}) => value?.type === "response_item"
        && value.payload?.type === "agent_message");
    let carrierAuthority = null;
    if (carriers.length !== 1) {
        failures.push("child must contain exactly one initial NEW_TASK agent carrier and no steering carrier");
    } else {
        const carrier = carriers[0];
        const payload = carrier.value.payload;
        const expectedHeader = `Message Type: NEW_TASK\nTask name: ${agentPath}\nSender: /root\nPayload:\n`;
        const content = payload?.content;
        const routing = payload?.internal_chat_message_metadata_passthrough;
        if (Object.keys(payload ?? {}).sort().join(",")
                !== "author,content,id,internal_chat_message_metadata_passthrough,recipient,type"
            || typeof payload?.id !== "string" || !canonicalAgentMessageItemId.test(payload.id)
            || payload?.author !== "/root" || payload?.recipient !== agentPath
            || !Array.isArray(content) || content.length !== 2
            || Object.keys(content[0] ?? {}).sort().join(",") !== "text,type"
            || content[0]?.type !== "input_text" || content[0]?.text !== expectedHeader
            || Object.keys(content[1] ?? {}).sort().join(",") !== "encrypted_content,type"
            || content[1]?.type !== "encrypted_content"
            || typeof content[1]?.encrypted_content !== "string" || content[1].encrypted_content === ""
            || !routing || typeof routing !== "object" || Array.isArray(routing)
            || Object.keys(routing).sort().join(",") !== "turn_id"
            || routing.turn_id !== turnIds[0]) {
            failures.push("initial agent carrier does not have the exact joined NEW_TASK envelope");
        } else {
            carrierAuthority = {
                line: carrier.line,
                turnId: routing.turn_id,
                encryptedTask: content[1].encrypted_content,
            };
        }
        const orderedPrefix = [...developerMessages, ...userMessages, carrier, assistantMessages[0]];
        if (orderedPrefix.some(({ line } = {}) => !Number.isSafeInteger(line) || line <= 0)
            || orderedPrefix.some((record, index) => index !== 0 && record.line <= orderedPrefix[index - 1].line)) {
            failures.push("developer prefix, user bootstrap, NEW_TASK carrier, and assistant output must be physically ordered");
        }
    }
    const modelActivity = records.filter(({ value } = {}) => (value?.type === "response_item"
        && (value.payload?.type === "reasoning"
            || value.payload?.type === "custom_tool_call"
            || value.payload?.type === "custom_tool_call_output"
            || (value.payload?.type === "message" && value.payload?.role === "assistant")))
        || (value?.type === "event_msg" && value.payload?.type === "agent_message"));
    if (modelActivity.some(({ line }) => !Number.isSafeInteger(line)
        || line <= (carriers[0]?.line ?? Number.POSITIVE_INFINITY))) {
        failures.push("all model-originated activity must occur strictly after the NEW_TASK carrier");
    }
    const structuralOrder = [
        soleSessionMeta[0],
        taskStarted[0],
        developerMessages[0],
        userMessages[0],
        soleWorldState[0],
        soleTurnContext[0],
        soleInterAgentMetadata[0],
        carriers[0],
        assistantMessages[0],
        taskComplete[0],
    ];
    if (structuralOrder.some(({ line } = {}) => !Number.isSafeInteger(line) || line <= 0)
        || structuralOrder.some((record, index) => index !== 0 && record.line <= structuralOrder[index - 1].line)) {
        failures.push("top-level session authority and lifecycle records are not in canonical physical order");
    }
    return { failures, carrierAuthority };
}

export function validateCleanSpawnTriplet(recordsByLine, spawn, {
    actor,
    expectedTask,
    expectedPrompt,
} = {}) {
    const failures = [];
    const args = (() => {
        try {
            return parseJsonStrict(spawn?.value?.payload?.arguments);
        } catch (error) {
            failures.push(`spawn arguments are not strict JSON (${error.message})`);
            return null;
        }
    })();
    const callPayload = spawn?.value?.payload;
    const callRouting = callPayload?.internal_chat_message_metadata_passthrough;
    const started = recordsByLine instanceof Map ? recordsByLine.get((spawn?.line ?? -2) + 1) : null;
    const output = recordsByLine instanceof Map ? recordsByLine.get((spawn?.line ?? -3) + 2) : null;
    const startedPayload = started?.value?.payload;
    const outputPayload = output?.value?.payload;
    const outputRouting = outputPayload?.internal_chat_message_metadata_passthrough;
    const callTime = Date.parse(spawn?.value?.timestamp);
    const startedTime = Date.parse(started?.value?.timestamp);
    const outputTime = Date.parse(output?.value?.timestamp);
    if (!actor || typeof expectedTask !== "string" || expectedTask === ""
        || typeof expectedPrompt !== "string" || expectedPrompt === "") {
        failures.push("spawn triplet authority inputs are incomplete");
    }
    if (!spawn || Object.keys(spawn.value ?? {}).sort().join(",") !== "payload,timestamp,type"
        || spawn.value.type !== "response_item"
        || Object.keys(callPayload ?? {}).sort().join(",")
            !== "arguments,call_id,id,internal_chat_message_metadata_passthrough,name,namespace,type"
        || callPayload.type !== "function_call" || callPayload.name !== "spawn_agent"
        || callPayload.namespace !== "collaboration" || callPayload.call_id !== actor?.spawn_call_id
        || typeof callPayload.id !== "string" || !canonicalSpawnItemId.test(callPayload.id)
        || typeof callPayload.call_id !== "string" || !canonicalCustomCallId.test(callPayload.call_id)
        || !callRouting || Object.keys(callRouting).sort().join(",") !== "turn_id"
        || typeof callRouting.turn_id !== "string" || !canonicalUuid.test(callRouting.turn_id)) {
        failures.push("spawn call does not have the exact measured collaboration envelope");
    }
    if (!args || Object.keys(args).sort().join(",") !== "fork_turns,message,model,reasoning_effort,task_name"
        || args.task_name !== expectedTask || args.fork_turns !== "none"
        || args.model !== "gpt-5.6-sol" || args.reasoning_effort !== "ultra"
        || typeof args.message !== "string" || args.message === "" || args.message === expectedPrompt) {
        failures.push("spawn arguments are not an exact content-addressed Sol-ultra encrypted carrier");
    }
    if (!started || Object.keys(started.value ?? {}).sort().join(",") !== "payload,timestamp,type"
        || started.value.type !== "event_msg"
        || Object.keys(startedPayload ?? {}).sort().join(",")
            !== "agent_path,agent_thread_id,event_id,kind,occurred_at_ms,type"
        || startedPayload.type !== "sub_agent_activity" || startedPayload.kind !== "started"
        || startedPayload.event_id !== actor?.spawn_call_id || startedPayload.agent_path !== actor?.agent_path
        || startedPayload.agent_thread_id !== actor?.session_id
        || !Number.isSafeInteger(startedPayload.occurred_at_ms) || startedPayload.occurred_at_ms <= 0) {
        failures.push("spawn started event is not the exact contiguous child join");
    }
    if (!output || Object.keys(output.value ?? {}).sort().join(",") !== "payload,timestamp,type"
        || output.value.type !== "response_item"
        || Object.keys(outputPayload ?? {}).sort().join(",")
            !== "call_id,id,internal_chat_message_metadata_passthrough,output,type"
        || outputPayload.type !== "function_call_output" || outputPayload.call_id !== actor?.spawn_call_id
        || typeof outputPayload.id !== "string" || !canonicalSpawnOutputItemId.test(outputPayload.id)
        || outputPayload.output !== JSON.stringify({ task_name: actor?.agent_path })
        || !outputRouting || Object.keys(outputRouting).sort().join(",") !== "turn_id"
        || outputRouting.turn_id !== callRouting?.turn_id) {
        failures.push("spawn output is not the exact contiguous task-name receipt");
    }
    if (![spawn?.value?.timestamp, started?.value?.timestamp, output?.value?.timestamp].every(isCanonicalInstant)
        || !(callTime <= startedTime && startedTime <= outputTime)
        || startedPayload?.occurred_at_ms - startedTime < 0
        || startedPayload?.occurred_at_ms - startedTime > 1) {
        failures.push("spawn triplet chronology is not canonical and nondecreasing");
    }
    return {
        failures,
        encryptedTask: args?.message ?? null,
        encryptedTaskSha256: typeof args?.message === "string" ? textSha256(args.message) : null,
        started,
        output,
        callTime,
        startedTime,
        outputTime,
        turnId: callRouting?.turn_id ?? null,
    };
}

export function validateCleanCarrierJoin(spawnProjection, transcriptProjection) {
    const failures = [];
    const parent = spawnProjection?.encryptedTask;
    const child = transcriptProjection?.carrierAuthority?.encryptedTask;
    if (typeof parent !== "string" || parent === ""
        || typeof child !== "string" || child === ""
        || parent !== child) {
        failures.push("child NEW_TASK ciphertext is not byte-identical to the coordinator carrier");
    }
    return {
        failures,
        encryptedTaskSha256: typeof parent === "string" && parent !== "" ? textSha256(parent) : null,
    };
}

function validSessionId(value) {
    return Number.isSafeInteger(value) && value > 0;
}

function requireWorkspaceRoot(workspaceRoot) {
    if (typeof workspaceRoot !== "string" || workspaceRoot === "" || !workspaceRoot.startsWith("/")) {
        throw new Error("clean exec source: workspace root must be an absolute nonempty string");
    }
}

export function canonicalCleanStartSource(command, workspaceRoot = cleanExecWorkspaceRoot) {
    requireWorkspaceRoot(workspaceRoot);
    if (typeof command !== "string" || command === "" || /[\r\n]/.test(command)) {
        throw new Error("clean exec source: command must be a nonempty single line");
    }
    const args = {
        cmd: command,
        workdir: workspaceRoot,
        yield_time_ms: cleanExecLimits.nestedYieldTimeMs,
        max_output_tokens: cleanExecLimits.nestedMaxOutputTokens,
    };
    return `${startPrefix}${JSON.stringify(args)}${resultSuffix}`;
}

export function canonicalCleanPollSource(sessionId) {
    if (!validSessionId(sessionId)) {
        throw new Error("clean exec source: poll session ID must be a positive safe integer");
    }
    const args = {
        session_id: sessionId,
        chars: "",
        yield_time_ms: cleanExecLimits.nestedYieldTimeMs,
        max_output_tokens: cleanExecLimits.nestedMaxOutputTokens,
    };
    return `${pollPrefix}${JSON.stringify(args)}${resultSuffix}`;
}

function invalidSource(reason) {
    return { kind: "invalid", reason };
}

export function classifyCleanExecSource(
    input,
    { workspaceRoot = cleanExecWorkspaceRoot, isCommandAllowed = () => true } = {},
) {
    requireWorkspaceRoot(workspaceRoot);
    if (typeof isCommandAllowed !== "function") {
        throw new Error("clean exec source: isCommandAllowed must be a function");
    }
    if (typeof input !== "string") return invalidSource("source must be a string");

    if (input.startsWith(startPrefix) && input.endsWith(resultSuffix)) {
        try {
            const args = parseJsonStrict(input.slice(startPrefix.length, -resultSuffix.length));
            const command = args?.cmd;
            if (typeof command !== "string" || input !== canonicalCleanStartSource(command, workspaceRoot)) {
                return invalidSource("start source is not byte-canonical");
            }
            if (!isCommandAllowed(command)) return invalidSource("start command is not allowlisted");
            return { kind: "start", command };
        } catch {
            return invalidSource("start arguments are not strict canonical JSON");
        }
    }

    if (input.startsWith(pollPrefix) && input.endsWith(resultSuffix)) {
        try {
            const args = parseJsonStrict(input.slice(pollPrefix.length, -resultSuffix.length));
            const sessionId = args?.session_id;
            if (!validSessionId(sessionId) || input !== canonicalCleanPollSource(sessionId)) {
                return invalidSource("poll source is not byte-canonical");
            }
            return { kind: "poll", sessionId };
        } catch {
            return invalidSource("poll arguments are not strict canonical JSON");
        }
    }

    return invalidSource("source is neither a canonical start nor a canonical poll");
}

function resultFailure(message) {
    throw new Error(`clean exec result: ${message}`);
}

function exactTextBlock(value, pointer) {
    if (!value || typeof value !== "object" || Array.isArray(value)
        || Object.keys(value).sort().join(",") !== "text,type"
        || value.type !== "input_text" || typeof value.text !== "string") {
        resultFailure(`${pointer} must be an exact input_text block`);
    }
    return value.text;
}

export function renderCleanExecResult(output) {
    if (!Array.isArray(output) || output.length !== 2) {
        resultFailure("outer output must contain exactly the completion status and JSON receipt blocks");
    }
    const status = exactTextBlock(output[0], "completion status");
    if (!completedStatus.test(status)) {
        resultFailure("outer cell did not complete synchronously");
    }
    const rendered = exactTextBlock(output[1], "JSON receipt");
    if (rendered === "" || rendered !== rendered.trim()) {
        resultFailure("JSON receipt must be one unpadded string");
    }

    let receipt;
    try {
        receipt = parseJsonStrict(rendered);
    } catch (error) {
        resultFailure(`JSON receipt is malformed (${error.message})`);
    }
    if (!receipt || typeof receipt !== "object" || Array.isArray(receipt)) {
        resultFailure("JSON receipt must be an object");
    }
    const unknown = Object.keys(receipt).filter((key) => !receiptKeys.has(key));
    if (unknown.length !== 0) {
        resultFailure(`JSON receipt has unknown keys: ${unknown.sort().join(",")}`);
    }
    if (typeof receipt.output !== "string") {
        resultFailure("output must be a string");
    }
    if (typeof receipt.wall_time_seconds !== "number" || !Number.isFinite(receipt.wall_time_seconds)
        || receipt.wall_time_seconds < 0) {
        resultFailure("wall_time_seconds must be a finite nonnegative number");
    }
    if (Object.hasOwn(receipt, "chunk_id")
        && (typeof receipt.chunk_id !== "string" || receipt.chunk_id.length === 0)) {
        resultFailure("chunk_id must be a nonempty string when present");
    }
    if (Object.hasOwn(receipt, "original_token_count")
        && (!Number.isInteger(receipt.original_token_count) || receipt.original_token_count < 0
            || receipt.original_token_count > cleanExecLimits.nestedMaxOutputTokens)) {
        resultFailure(`original_token_count must be an integer from 0 through ${cleanExecLimits.nestedMaxOutputTokens}`);
    }

    const hasExit = Object.hasOwn(receipt, "exit_code");
    const hasSession = Object.hasOwn(receipt, "session_id");
    if (hasExit === hasSession) {
        resultFailure("receipt must contain exactly one of exit_code or session_id");
    }
    if (hasExit) {
        if (!Number.isInteger(receipt.exit_code)) resultFailure("exit_code must be an integer");
        if (receipt.exit_code !== 0) resultFailure("terminal exit_code must be 0");
        return receipt;
    }
    if (!validSessionId(receipt.session_id)) {
        resultFailure("session_id must be a positive safe integer");
    }
    return receipt;
}

export function validateCleanPersistOutput(output) {
    const failures = [];
    if (!Array.isArray(output) || output.length !== 2) {
        return { failures: ["persistence output must contain exactly two provider input_text blocks"] };
    }
    for (const [index, block] of output.entries()) {
        if (!block || typeof block !== "object" || Array.isArray(block)
            || Object.keys(block).sort().join(",") !== "text,type"
            || block.type !== "input_text" || typeof block.text !== "string") {
            failures.push(`persistence output block ${index + 1} is not canonical input_text`);
        }
    }
    if (!completedStatus.test(output[0]?.text ?? "")) {
        failures.push("persistence output block 1 is not the exact completed-cell status");
    }
    if (output[1]?.text !== "{}") {
        failures.push("persistence output block 2 is not the exact apply_patch success receipt");
    }
    return { failures };
}

export function selectActiveCoordinatorTurn(
    records,
    call,
    workspaceRoot = cleanExecWorkspaceRoot,
) {
    const failures = [];
    const callLine = call?.line;
    const callTime = Date.parse(call?.timestamp);
    if (!Array.isArray(records) || !Number.isSafeInteger(callLine) || callLine <= 0
        || !isCanonicalInstant(call?.timestamp)) {
        return { turnId: null, failures: ["active coordinator turn requires records and a canonical call"] };
    }
    const prior = records.filter((record) => Number.isSafeInteger(record?.line) && record.line < callLine);
    const start = prior.filter(({ value } = {}) => value?.type === "event_msg"
        && value.payload?.type === "task_started").at(-1);
    const context = prior.filter(({ value } = {}) => value?.type === "turn_context").at(-1);
    const startRaw = start?.value;
    const startPayload = startRaw?.payload;
    const contextRaw = context?.value;
    const contextPayload = contextRaw?.payload;
    const startTime = Date.parse(startRaw?.timestamp);
    const contextTime = Date.parse(contextRaw?.timestamp);
    if (!startRaw || Object.keys(startRaw).sort().join(",") !== "payload,timestamp,type"
        || startRaw.type !== "event_msg" || !isCanonicalInstant(startRaw.timestamp)
        || !startPayload || Object.keys(startPayload).sort().join(",")
            !== "collaboration_mode_kind,model_context_window,started_at,turn_id,type"
        || startPayload.type !== "task_started"
        || typeof startPayload.turn_id !== "string" || !canonicalUuid.test(startPayload.turn_id)
        || !Number.isSafeInteger(startPayload.started_at) || startPayload.started_at <= 0
        || startTime - startPayload.started_at * 1000 < 0
        || startTime - startPayload.started_at * 1000 >= 2000
        || startPayload.model_context_window !== 258400
        || startPayload.collaboration_mode_kind !== "default") {
        failures.push("coordinator task_started is not the exact measured lifecycle envelope");
    }
    if (!contextRaw || Object.keys(contextRaw).sort().join(",") !== "payload,timestamp,type"
        || contextRaw.type !== "turn_context" || !isCanonicalInstant(contextRaw.timestamp)
        || !contextPayload || Object.keys(contextPayload).sort().join(",")
            !== "approval_policy,approvals_reviewer,collaboration_mode,comp_hash,current_date,cwd,effort,model,multi_agent_mode,multi_agent_version,permission_profile,personality,realtime_active,sandbox_policy,summary,timezone,turn_id,workspace_roots"
        || contextPayload.turn_id !== startPayload?.turn_id
        || contextPayload.cwd !== workspaceRoot
        || canonicalize(contextPayload.workspace_roots) !== canonicalize([workspaceRoot])
        || contextPayload.current_date !== "2026-07-19"
        || contextPayload.timezone !== "America/New_York"
        || contextPayload.approval_policy !== "never" || contextPayload.approvals_reviewer !== "user"
        || canonicalize(contextPayload.sandbox_policy) !== canonicalize({ type: "danger-full-access" })
        || canonicalize(contextPayload.permission_profile) !== canonicalize({ type: "disabled" })
        || contextPayload.model !== "gpt-5.6-sol" || contextPayload.effort !== "ultra"
        || contextPayload.comp_hash !== "3000" || contextPayload.personality !== "pragmatic"
        || canonicalize(contextPayload.collaboration_mode) !== canonicalize({
            mode: "default",
            settings: { model: "gpt-5.6-sol", reasoning_effort: "ultra", developer_instructions: null },
        })
        || contextPayload.multi_agent_version !== "v2"
        || contextPayload.multi_agent_mode !== "proactive"
        || contextPayload.realtime_active !== false || contextPayload.summary !== "auto"
        || !Number.isSafeInteger(start?.line) || !Number.isSafeInteger(context?.line)
        || context.line <= start.line || contextTime < startTime
        || startTime > callTime || contextTime > callTime) {
        failures.push("coordinator turn_context is not the exact active Sol-ultra workspace envelope");
    }
    const selectedTurnStarts = prior.filter(({ value } = {}) => value?.type === "event_msg"
        && value.payload?.type === "task_started"
        && value.payload?.turn_id === startPayload?.turn_id);
    if (selectedTurnStarts.length !== 1) {
        failures.push("coordinator selected turn UUID must have exactly one task_started before persistence call");
    }
    const completed = prior.some(({ value } = {}) => value?.type === "event_msg"
        && value.payload?.type === "task_complete"
        && value.payload?.turn_id === startPayload?.turn_id);
    if (completed) failures.push("coordinator persistence call follows task completion for selected turn UUID");
    return { turnId: failures.length === 0 ? startPayload.turn_id : null, failures };
}

export function validateCleanPersistPair(call, output, options = {}) {
    const failures = [];
    const { patchEvent, expectedTurnId, reportPath, report } = options;
    if (!call || typeof call !== "object" || Array.isArray(call)
        || !output || typeof output !== "object" || Array.isArray(output)) {
        return { failures: ["persistence call/output pair must contain two records"] };
    }
    if (!patchEvent || typeof patchEvent !== "object" || Array.isArray(patchEvent)) {
        failures.push("persistence receipt must contain its measured patch event");
    }
    if (!Number.isSafeInteger(call.line) || call.line <= 0
        || !Number.isSafeInteger(patchEvent?.line) || patchEvent.line !== call.line + 1
        || !Number.isSafeInteger(output.line) || output.line !== call.line + 2) {
        failures.push("persistence call, patch event and output must be physically contiguous");
    }
    const callTime = Date.parse(call.timestamp);
    const patchTime = Date.parse(patchEvent?.value?.timestamp);
    const outputTime = Date.parse(output.timestamp);
    if (!isCanonicalInstant(call.timestamp) || !isCanonicalInstant(patchEvent?.value?.timestamp)
        || !isCanonicalInstant(output.timestamp) || patchTime < callTime || outputTime < patchTime) {
        failures.push("persistence call, patch event and output timestamps must be canonical and nondecreasing");
    }
    const callRaw = call.raw;
    const outputRaw = output.raw;
    const callPayload = callRaw?.payload;
    const outputPayload = outputRaw?.payload;
    const callRouting = callPayload?.internal_chat_message_metadata_passthrough;
    const outputRouting = outputPayload?.internal_chat_message_metadata_passthrough;
    if (call.kind !== "custom_tool_call"
        || !callRaw || Object.keys(callRaw).sort().join(",") !== "payload,timestamp,type"
        || callRaw.type !== "response_item" || callRaw.timestamp !== call.timestamp
        || !callPayload || Object.keys(callPayload).sort().join(",")
            !== "call_id,id,input,internal_chat_message_metadata_passthrough,name,status,type"
        || callPayload.type !== "custom_tool_call"
        || typeof callPayload.id !== "string" || !canonicalCustomCallItemId.test(callPayload.id)
        || typeof callPayload.call_id !== "string" || !canonicalCustomCallId.test(callPayload.call_id)
        || callPayload.name !== "exec" || callPayload.status !== "completed"
        || callPayload.input !== call.input || callPayload.name !== call.name
        || !callRouting || Object.keys(callRouting).sort().join(",") !== "turn_id"
        || typeof expectedTurnId !== "string" || !canonicalUuid.test(expectedTurnId)
        || callRouting.turn_id !== expectedTurnId) {
        failures.push("persistence call does not preserve the exact raw provider envelope");
    }
    if (output.kind !== "custom_tool_call_output"
        || !outputRaw || Object.keys(outputRaw).sort().join(",") !== "payload,timestamp,type"
        || outputRaw.type !== "response_item" || outputRaw.timestamp !== output.timestamp
        || !outputPayload || Object.keys(outputPayload).sort().join(",")
            !== "call_id,id,internal_chat_message_metadata_passthrough,output,type"
        || outputPayload.type !== "custom_tool_call_output"
        || typeof outputPayload.id !== "string" || !canonicalCustomOutputItemId.test(outputPayload.id)
        || outputPayload.call_id !== callPayload?.call_id
        || canonicalize(outputPayload.output) !== canonicalize(output.value)
        || !outputRouting || Object.keys(outputRouting).sort().join(",") !== "turn_id"
        || outputRouting.turn_id !== expectedTurnId || outputRouting.turn_id !== callRouting?.turn_id) {
        failures.push("persistence output does not preserve the exact joined raw provider envelope");
    }
    const patchRaw = patchEvent?.value;
    const patchPayload = patchRaw?.payload;
    const patchChange = patchPayload?.changes?.[reportPath];
    if (typeof reportPath !== "string" || reportPath === "" || typeof report !== "string"
        || !patchRaw || Object.keys(patchRaw).sort().join(",") !== "payload,timestamp,type"
        || patchRaw.type !== "event_msg"
        || !patchPayload || Object.keys(patchPayload).sort().join(",")
            !== "call_id,changes,status,stderr,stdout,success,turn_id,type"
        || patchPayload.type !== "patch_apply_end"
        || typeof patchPayload.call_id !== "string"
        || !/^exec-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(patchPayload.call_id)
        || patchPayload.turn_id !== expectedTurnId || patchPayload.success !== true
        || patchPayload.status !== "completed" || patchPayload.stderr !== ""
        || patchPayload.stdout !== `Success. Updated the following files:\nA ${reportPath}\n`
        || !patchPayload.changes || typeof patchPayload.changes !== "object"
        || Array.isArray(patchPayload.changes)
        || Object.keys(patchPayload.changes).length !== 1
        || !Object.hasOwn(patchPayload.changes, reportPath)
        || !patchChange || typeof patchChange !== "object" || Array.isArray(patchChange)
        || Object.keys(patchChange).sort().join(",") !== "content,type"
        || patchChange.type !== "add" || patchChange.content !== report) {
        failures.push("persistence patch event does not prove the exact byte-identical Add File operation");
    }
    failures.push(...validateCleanPersistOutput(output.value).failures);
    return { failures };
}

export function validateCleanPersistFileTimes(metadata, call, patchEvent) {
    const failures = [];
    const callTime = Date.parse(call?.timestamp);
    const patchTime = Date.parse(patchEvent?.value?.timestamp);
    if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)
        || !isCanonicalInstant(call?.timestamp) || !isCanonicalInstant(patchEvent?.value?.timestamp)) {
        return { failures: ["persistence file-time proof requires canonical metadata and receipt bounds"] };
    }
    for (const field of ["birthtimeMs", "mtimeMs"]) {
        const time = metadata[field];
        if (!Number.isFinite(time) || time <= callTime
            || time > patchTime + cleanPersistFileTimestampToleranceMs) {
            failures.push(`report ${field} must follow its call and coincide with patch completion`);
        }
    }
    if (Number.isFinite(metadata.birthtimeMs) && Number.isFinite(metadata.mtimeMs)
        && metadata.mtimeMs < metadata.birthtimeMs) {
        failures.push("report modification time must not precede its birth time");
    }
    return { failures };
}

export function selectCleanReportBoundary(records) {
    const failures = cleanResponseSurfaceFailures(records);
    if (!Array.isArray(records)) {
        return { report: null, failures };
    }
    const assistants = records.filter(({ value } = {}) => value?.type === "response_item"
        && value.payload?.type === "message" && value.payload?.role === "assistant");
    const toolCalls = records.filter(({ value } = {}) => value?.type === "response_item"
        && ["custom_tool_call", "function_call"].includes(value.payload?.type));
    const finals = assistants.filter(({ value }) => value.payload?.phase === "final_answer");
    if (finals.length !== 1) {
        failures.push("child must author exactly one final_answer assistant message");
        return { report: null, failures };
    }

    const final = finals[0];
    const laterResponseItem = records.find(({ line, value } = {}) => value?.type === "response_item"
        && Number.isSafeInteger(line) && line > final.line);
    if (laterResponseItem) {
        failures.push("the final report must be the last response item in the child transcript");
    }
    const commentaries = assistants.filter(({ value }) => value.payload?.phase === "commentary");
    if (commentaries.length === 0) {
        failures.push("child must author commentary before its first tool call");
    } else if (toolCalls.length !== 0) {
        const firstToolLine = Math.min(...toolCalls.map(({ line }) => line));
        if (!Number.isSafeInteger(firstToolLine) || firstToolLine <= 0
            || !Number.isSafeInteger(commentaries[0].line) || commentaries[0].line >= firstToolLine) {
            failures.push("the first commentary assistant message must precede the first tool call");
        }
    }
    if (assistants.length !== commentaries.length + 1) {
        failures.push("every non-final assistant message must have phase commentary");
    }
    if (assistants.at(-1) !== final) {
        failures.push("all commentary assistant messages must precede the final report");
    }
    if (!Number.isSafeInteger(final.line) || final.line <= 0) {
        failures.push("terminal assistant message line must be a positive safe integer");
    }
    for (const commentary of commentaries) {
        if (!Number.isSafeInteger(commentary.line) || commentary.line <= 0 || commentary.line >= final.line) {
            failures.push("every commentary assistant message must have a positive line before the final report");
        }
        const content = commentary.value.payload?.content;
        if (!Array.isArray(content) || content.length !== 1
            || content[0]?.type !== "output_text" || typeof content[0]?.text !== "string") {
            failures.push("every commentary assistant message must contain exactly one output_text block");
        } else if (unsafeCleanText.test(content[0].text)
            || /[#<>]/.test(content[0].text) || setextHeadingLine.test(content[0].text)
            || /findings/iu.test(content[0].text)
            || reservedCleanReportGrammar.test(content[0].text)
            || semanticFindingsHeading.test(content[0].text)) {
            failures.push("commentary assistant messages must not contain reserved clean-report grammar");
        }
    }
    const content = final.value.payload?.content;
    if (!Array.isArray(content) || content.length !== 1
        || content[0]?.type !== "output_text" || typeof content[0]?.text !== "string") {
        failures.push("terminal assistant message must contain exactly one output_text block");
        return { report: null, failures };
    }
    const text = content[0].text;
    if ((text.match(/^BEGIN VNEXT-CLEAN-REPORT$/gm) ?? []).length !== 1
        || (text.match(/^END VNEXT-CLEAN-REPORT$/gm) ?? []).length !== 1) {
        failures.push("final assistant message must contain exactly one outer envelope pair");
        return { report: null, failures };
    }
    const match = text.match(/^BEGIN VNEXT-CLEAN-REPORT\n([\s\S]*\n)END VNEXT-CLEAN-REPORT$/);
    if (!match) {
        failures.push("terminal assistant message must contain only the exact clean-report envelope");
        return { report: null, failures };
    }
    if (/(?:BEGIN|END) VNEXT-CLEAN-REPORT/.test(match[1])) {
        failures.push("final report body must not contain an envelope-marker substring");
        return { report: null, failures };
    }
    return {
        report: failures.length === 0 ? { bytes: match[1], line: final.line, text } : null,
        failures,
    };
}

export function validateCleanCommandSection(section, logicalCommands) {
    const failures = [];
    if (typeof section !== "string" || section === "") {
        return { commands: [], failures: ["command section must be a nonempty string"] };
    }
    if (!Array.isArray(logicalCommands)
        || logicalCommands.some((command) => typeof command !== "string" || command === "" || /[\r\n]/.test(command))) {
        return { commands: [], failures: ["logical commands must be nonempty single-line strings"] };
    }
    if (!section.endsWith("\n") || section.includes("\r")) {
        failures.push("command section must end each row with exactly one LF");
    }
    const commands = [];
    const rows = section.endsWith("\n") ? section.slice(0, -1).split("\n") : section.split("\n");
    for (const [index, line] of rows.entries()) {
        const match = line.match(/^- ([^\r\n]+)$/);
        if (!match || match[1] !== match[1].trim()) {
            failures.push(`command section row ${index + 1} must be exactly '- <logical launch command>'`);
        } else {
            commands.push(match[1]);
        }
    }
    if (commands.length !== logicalCommands.length
        || commands.some((command, index) => command !== logicalCommands[index])) {
        failures.push("command section must equal the ordered logical launch-command sequence");
    }
    return { commands, failures };
}

export function validateCleanReportCommands(report, logicalCommands) {
    const failures = cleanHeadingFailures(report, ["commands"]);
    if (typeof report !== "string") {
        return { section: null, commands: [], failures: ["report must be a string"] };
    }
    const section = report.match(/^Commands executed:\n([\s\S]*?)\n## Findings$/m)?.[1] ?? null;
    if (section === null) {
        failures.push("command rows must be followed by exactly one blank line and the byte-exact ## Findings heading");
        return { section, commands: [], failures };
    }
    const projection = validateCleanCommandSection(section, logicalCommands);
    return {
        section,
        commands: projection.commands,
        failures: [...failures, ...projection.failures],
    };
}

export function validateCleanTerminalTail(report, attestationMarker) {
    if (typeof report !== "string" || typeof attestationMarker !== "string"
        || !/^<!-- VNEXT-CLEAN-ATTESTATION \{[^\r\n]*\} -->$/.test(attestationMarker)) {
        return { failures: ["terminal-tail inputs must be a report string and one-line attestation marker"] };
    }
    const tail = `## Findings\n\nNone.\n\nVerdict: **CLEAN**\n\n${attestationMarker}\n`;
    const failures = cleanHeadingFailures(report, ["findings"]);
    if (!report.endsWith(tail)) {
        failures.push("report must end byte-exactly with the canonical clean tail and one final LF");
    }
    return {
        failures,
    };
}

function collectionEntries(collection, label, failures) {
    if (collection instanceof Map) return [...collection.entries()];
    if (Array.isArray(collection)) {
        return collection.map((entry, index) => {
            if (Array.isArray(entry) && entry.length === 2) return entry;
            const callId = entry?.callId ?? entry?.call_id ?? entry?.id;
            if (typeof callId !== "string") failures.push(`${label}/${index}: record lacks a call ID`);
            return [callId, entry];
        });
    }
    if (collection && typeof collection === "object") return Object.entries(collection);
    failures.push(`${label}: must be a Map, array, or object`);
    return [];
}

function normalizedRecords(executed, failures) {
    if (!executed || typeof executed !== "object" || Array.isArray(executed)) {
        failures.push("executed: must contain calls and outputs collections");
        return null;
    }
    const calls = collectionEntries(executed.calls, "calls", failures);
    const outputs = collectionEntries(executed.outputs, "outputs", failures);
    const callIds = new Set();
    const outputIds = new Set();
    const events = [];

    for (const [callId, value] of calls) {
        if (typeof callId !== "string" || callId === "") {
            failures.push("calls: call ID must be a nonempty string");
            continue;
        }
        if (callIds.has(callId)) failures.push(`calls: duplicate call ID ${callId}`);
        callIds.add(callId);
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            failures.push(`calls/${callId}: record must be an object`);
            continue;
        }
        if (value.kind !== "custom_tool_call") failures.push(`calls/${callId}: kind must be custom_tool_call`);
        events.push({ type: "call", callId, value, line: value.line, timestamp: value.timestamp });
    }
    for (const [callId, value] of outputs) {
        if (typeof callId !== "string" || callId === "") {
            failures.push("outputs: call ID must be a nonempty string");
            continue;
        }
        if (outputIds.has(callId)) failures.push(`outputs: duplicate call ID ${callId}`);
        outputIds.add(callId);
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            failures.push(`outputs/${callId}: record must be an object`);
            continue;
        }
        if (value.kind !== "custom_tool_call_output") failures.push(`outputs/${callId}: kind must be custom_tool_call_output`);
        events.push({ type: "output", callId, value, line: value.line, timestamp: value.timestamp });
    }
    for (const callId of callIds) {
        if (!outputIds.has(callId)) failures.push(`calls/${callId}: missing joined output`);
    }
    for (const callId of outputIds) {
        if (!callIds.has(callId)) failures.push(`outputs/${callId}: orphan output`);
    }
    for (const event of events) {
        if (!Number.isSafeInteger(event.line) || event.line <= 0) {
            failures.push(`${event.type}s/${event.callId}: line must be a positive safe integer`);
        }
        if (typeof event.timestamp !== "string" || !Number.isFinite(Date.parse(event.timestamp))) {
            failures.push(`${event.type}s/${event.callId}: timestamp must be a valid date string`);
        }
    }
    if (failures.length !== 0) return null;

    events.sort((left, right) => left.line - right.line || compareCanonicalText(left.type, right.type)
        || compareCanonicalText(left.callId, right.callId));
    for (let index = 1; index < events.length; index += 1) {
        if (events[index - 1].line === events[index].line) {
            failures.push(`physical records share line ${events[index].line}`);
        }
        if (Date.parse(events[index].timestamp) < Date.parse(events[index - 1].timestamp)) {
            failures.push(`physical record time decreases at line ${events[index].line}`);
        }
    }
    for (let index = 0; index < events.length; index += 2) {
        const call = events[index];
        const output = events[index + 1];
        if (call?.type !== "call") {
            failures.push(`physical record ${call?.line ?? "<missing>"}: expected a call`);
            continue;
        }
        if (!output) {
            failures.push(`calls/${call.callId}: missing serialized output`);
        } else if (output.type !== "output" || output.callId !== call.callId) {
            failures.push(`calls/${call.callId}: call/output records cross or interleave`);
        } else if (output.line !== call.line + 1) {
            failures.push(`calls/${call.callId}: call/output records are not physically contiguous`);
        }
    }
    return failures.length === 0 ? events : null;
}

function finishRun(current, terminalCell, failures) {
    const elapsedMs = Date.parse(terminalCell.output.timestamp) - Date.parse(current.call.timestamp);
    if (elapsedMs > cleanExecLimits.maxElapsedMs) {
        failures.push(`runs/${current.callId}: elapsed ${elapsedMs}ms exceeds ${cleanExecLimits.maxElapsedMs}ms`);
    }
    const reconstructedResult = { ...terminalCell.receipt, output: current.reconstructedOutput };
    return {
        command: current.command,
        callId: current.callId,
        call: current.call,
        output: current.output,
        cells: current.cells,
        pollCount: current.pollCount,
        sessionId: current.sessionId,
        terminalCallId: terminalCell.callId,
        terminalCall: terminalCell.call,
        terminalOutput: terminalCell.output,
        terminalOutputLine: terminalCell.output.line,
        terminalOutputTimestamp: terminalCell.output.timestamp,
        elapsedMs,
        outputBytes: current.outputBytes,
        reconstructedOutput: current.reconstructedOutput,
        reconstructedResult,
        result: reconstructedResult,
    };
}

export function foldCleanExecRuns(
    executed,
    {
        workspaceRoot = cleanExecWorkspaceRoot,
        isCommandAllowed = () => true,
        reportLine = Number.POSITIVE_INFINITY,
        interruptionLines = [],
    } = {},
) {
    const failures = [];
    let events;
    try {
        events = normalizedRecords(executed, failures);
    } catch (error) {
        failures.push(`executed: ${error.message}`);
        return { runs: [], failures };
    }
    if (!events) return { runs: [], failures };
    if (reportLine !== Number.POSITIVE_INFINITY && (!Number.isSafeInteger(reportLine) || reportLine <= 0)) {
        failures.push("reportLine must be a positive safe integer or Infinity");
        return { runs: [], failures };
    }
    if (!Array.isArray(interruptionLines)
        || interruptionLines.some((line) => !Number.isSafeInteger(line) || line <= 0)
        || new Set(interruptionLines).size !== interruptionLines.length) {
        failures.push("interruptionLines must be a unique positive-safe-integer array");
        return { runs: [], failures };
    }

    const runs = [];
    const terminalSessionIds = new Set();
    let current = null;

    for (let index = 0; index < events.length; index += 2) {
        const callEvent = events[index];
        const outputEvent = events[index + 1];
        const call = callEvent.value;
        const output = outputEvent.value;
        if (output.line >= reportLine) {
            failures.push(`outputs/${callEvent.callId}: physical output does not precede the authored report`);
        }
        if (call.name !== "exec") {
            failures.push(`calls/${callEvent.callId}: only functions.exec is permitted`);
            continue;
        }

        let source;
        try {
            source = classifyCleanExecSource(call.input, { workspaceRoot, isCommandAllowed });
        } catch (error) {
            failures.push(`calls/${callEvent.callId}: ${error.message}`);
            continue;
        }
        if (source.kind === "invalid") {
            failures.push(`calls/${callEvent.callId}: ${source.reason}${current ? " while a run is pending" : ""}`);
            continue;
        }

        let receipt;
        try {
            receipt = renderCleanExecResult(output.value);
        } catch (error) {
            failures.push(`outputs/${callEvent.callId}: ${error.message}`);
            continue;
        }
        const physicalCellMs = Date.parse(output.timestamp) - Date.parse(call.timestamp);
        const reportedCellMs = receipt.wall_time_seconds * 1000;
        if (reportedCellMs > cleanExecLimits.maxElapsedMs
            || reportedCellMs > physicalCellMs + 1000) {
            failures.push(`outputs/${callEvent.callId}: reported wall time ${reportedCellMs}ms exceeds the physical call/output interval ${physicalCellMs}ms plus 1000ms tolerance`);
        }
        const cell = {
            kind: source.kind,
            callId: callEvent.callId,
            call,
            output,
            receipt,
        };

        if (source.kind === "start") {
            if (current) {
                failures.push(`calls/${callEvent.callId}: start interleaves pending run ${current.callId}`);
                continue;
            }
            current = {
                command: source.command,
                callId: callEvent.callId,
                call,
                output,
                cells: [cell],
                pollCount: 0,
                sessionId: Object.hasOwn(receipt, "session_id") ? receipt.session_id : null,
                reconstructedOutput: receipt.output,
                outputBytes: Buffer.byteLength(receipt.output, "utf8"),
            };
            if (current.outputBytes > cleanExecLimits.maxOutputBytes) {
                failures.push(`runs/${current.callId}: output exceeds ${cleanExecLimits.maxOutputBytes} UTF-8 bytes`);
            }
            if (Object.hasOwn(receipt, "exit_code")) {
                runs.push(finishRun(current, cell, failures));
                current = null;
            }
            continue;
        }

        if (!current) {
            const reason = terminalSessionIds.has(source.sessionId)
                ? "poll follows terminal completion"
                : "poll has no locally pending start";
            failures.push(`calls/${callEvent.callId}: ${reason} for session ${source.sessionId}`);
            continue;
        }
        if (source.sessionId !== current.sessionId) {
            failures.push(`calls/${callEvent.callId}: poll session ${source.sessionId} does not own pending run ${current.sessionId}`);
            continue;
        }
        current.pollCount += 1;
        current.cells.push(cell);
        current.reconstructedOutput += receipt.output;
        current.outputBytes += Buffer.byteLength(receipt.output, "utf8");
        if (current.pollCount > cleanExecLimits.maxPolls) {
            failures.push(`runs/${current.callId}: poll count exceeds ${cleanExecLimits.maxPolls}`);
        }
        if (current.outputBytes > cleanExecLimits.maxOutputBytes) {
            failures.push(`runs/${current.callId}: output exceeds ${cleanExecLimits.maxOutputBytes} UTF-8 bytes`);
        }
        if (Object.hasOwn(receipt, "session_id")) {
            if (receipt.session_id !== current.sessionId) {
                failures.push(`outputs/${callEvent.callId}: pending receipt changed session ${current.sessionId} to ${receipt.session_id}`);
            }
            continue;
        }
        terminalSessionIds.add(current.sessionId);
        runs.push(finishRun(current, cell, failures));
        current = null;
    }
    if (current) failures.push(`runs/${current.callId}: pending run has no terminal poll`);
    for (const run of runs.filter(({ pollCount }) => pollCount > 0)) {
        if (interruptionLines.some((line) => run.call.line < line && line < run.terminalOutputLine)) {
            failures.push(`runs/${run.callId}: commentary interrupts an owned launch/poll sequence`);
        }
    }
    return { runs, failures };
}
