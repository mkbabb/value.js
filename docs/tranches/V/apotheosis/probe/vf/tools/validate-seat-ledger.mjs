#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, decodeUtf8Strict, parseJsonStrict } from "./json-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ledgerPath = resolve(root, "FORMATION-SEAT-LEDGER.json");
const failures = [];
const fail = (message) => failures.push(message);
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const sha256File = (path) => sha256(readFileSync(path));
const hex64 = /^[0-9a-f]{64}$/;
const uuidish = /^[0-9a-f]{8}-[0-9a-f-]{27,}$/;

function exactObject(value, keys, pointer) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        fail(`${pointer}: expected object`);
        return false;
    }
    const expected = [...keys].sort();
    const actual = Object.keys(value).sort();
    if (canonicalize(actual) !== canonicalize(expected)) {
        fail(`${pointer}: expected exactly ${expected.join(", ")}; found ${actual.join(", ")}`);
        return false;
    }
    return true;
}

function jsonLines(path) {
    let source;
    try {
        source = decodeUtf8Strict(readFileSync(path));
    } catch (error) {
        fail(`${path}: malformed JSONL (${error.message})`);
        return [];
    }
    const records = [];
    for (const [index, line] of source.split("\n").entries()) {
        if (line === "") continue;
        try {
            records.push({ line: index + 1, value: parseJsonStrict(line) });
        } catch (error) {
            fail(`${path}:${index + 1}: malformed JSONL (${error.message})`);
        }
    }
    return records;
}

function first(records, predicate) {
    return records.find(({ value }) => predicate(value));
}

function finalReport(records) {
    const candidates = records.filter(({ value }) =>
        (value.type === "event_msg" && value.payload?.type === "agent_message" && value.payload?.phase === "final_answer") ||
        (value.type === "response_item" && value.payload?.type === "message" && value.payload?.phase === "final_answer"));
    const record = candidates.at(-1);
    if (record) {
        if (record.value.type === "event_msg") return { line: record.line, kind: "final_answer", text: record.value.payload.message ?? "" };
        const text = (record.value.payload.content ?? [])
            .filter((item) => item.type === "output_text" || item.type === "input_text")
            .map((item) => item.text ?? "")
            .join("");
        return { line: record.line, kind: "final_answer", text };
    }
    const sent = records.filter(({ value }) => value.type === "response_item" && value.payload?.type === "function_call" &&
        value.payload?.namespace === "collaboration" && value.payload?.name === "send_message").at(-1);
    if (!sent) return null;
    let args;
    try {
        args = parseJsonStrict(sent.value.payload.arguments);
    } catch {
        return null;
    }
    if (args.target !== "/root" || typeof args.message !== "string" || args.message === "") return null;
    return { line: sent.line, kind: "message_to_root", text: sent.value.payload.arguments };
}

if (!existsSync(ledgerPath)) {
    process.stderr.write(`missing ${ledgerPath}\n`);
    process.exit(1);
}

let ledger;
try {
    ledger = parseJsonStrict(readFileSync(ledgerPath));
} catch (error) {
    process.stderr.write(`invalid strict JSON: ${error.message}\n`);
    process.exit(1);
}

exactObject(ledger, ["schema", "control", "batches", "panels", "seats", "external_upstream_bbnf"], "/");
if (ledger.schema !== "vnext-formation-seat-ledger/1") fail("/schema: invalid schema");

const controlKeys = [
    "formation_session_id", "parent_session_file", "seat_budget", "required_model", "required_effort",
    "maximum_iteration", "owner_after_iteration_3", "requested_concurrency", "runtime_capacity",
    "capability_evidence", "scheduling_law",
];
exactObject(ledger.control, controlKeys, "/control");
if (!uuidish.test(ledger.control?.formation_session_id ?? "")) fail("/control/formation_session_id: invalid ID");
if (ledger.control?.seat_budget !== 32) fail("/control/seat_budget: must be 32");
if (ledger.control?.required_model !== "gpt-5.6-sol") fail("/control/required_model: must be gpt-5.6-sol");
if (ledger.control?.required_effort !== "ultra") fail("/control/required_effort: must be ultra");
if (ledger.control?.maximum_iteration !== 3) fail("/control/maximum_iteration: must be 3");
if (ledger.control?.owner_after_iteration_3 !== "formation-root") fail("/control/owner_after_iteration_3: must name formation-root");
exactObject(ledger.control?.requested_concurrency, ["minimum", "maximum", "status"], "/control/requested_concurrency");
if (ledger.control?.requested_concurrency?.minimum !== 5 || ledger.control?.requested_concurrency?.maximum !== 6 ||
    ledger.control?.requested_concurrency?.status !== "capability-limited") {
    fail("/control/requested_concurrency: must record the capability-limited 5–6 target");
}
exactObject(ledger.control?.runtime_capacity, ["root_agents", "child_agents", "total_agents"], "/control/runtime_capacity");
if (ledger.control?.runtime_capacity?.root_agents !== 1 || ledger.control?.runtime_capacity?.child_agents !== 3 ||
    ledger.control?.runtime_capacity?.total_agents !== 4) {
    fail("/control/runtime_capacity: runtime is exactly root + 3 children = 4 agents");
}
if (typeof ledger.control?.scheduling_law !== "string" || !ledger.control.scheduling_law.includes("never 5–6 simultaneously")) {
    fail("/control/scheduling_law: must expressly refuse a false 5–6 concurrency claim");
}

const parentPath = ledger.control?.parent_session_file;
let parentRecords = [];
if (typeof parentPath !== "string" || !existsSync(parentPath)) {
    fail(`/control/parent_session_file: missing ${parentPath}`);
} else {
    parentRecords = jsonLines(parentPath);
    const parentMeta = first(parentRecords, (record) => record.type === "session_meta");
    if (parentMeta?.value.payload?.id !== ledger.control.formation_session_id ||
        parentMeta.value.payload?.session_id !== ledger.control.formation_session_id) {
        fail("/control/parent_session_file: first session_meta does not bind the formation session");
    }
}

if (!Array.isArray(ledger.control?.capability_evidence) || ledger.control.capability_evidence.length < 2) {
    fail("/control/capability_evidence: at least two independent thread-limit witnesses are required");
} else {
    for (const [index, evidence] of ledger.control.capability_evidence.entries()) {
        exactObject(evidence, ["call_id", "line", "result"], `/control/capability_evidence/${index}`);
        const record = parentRecords.find(({ line, value }) => line === evidence.line &&
            value.type === "response_item" && value.payload?.type === "function_call_output" &&
            value.payload?.call_id === evidence.call_id);
        if (!record || record.value.payload.output !== evidence.result || !evidence.result.includes("agent thread limit reached")) {
            fail(`/control/capability_evidence/${index}: live thread-limit evidence mismatch`);
        }
    }
}

const batchBySeat = new Map();
const batchIds = new Set();
for (const [index, batch] of (ledger.batches ?? []).entries()) {
    exactObject(batch, ["id", "seats", "maximum_dispatched_children"], `/batches/${index}`);
    if (typeof batch.id !== "string" || batchIds.has(batch.id)) fail(`/batches/${index}/id: missing or duplicate`);
    batchIds.add(batch.id);
    if (!Array.isArray(batch.seats) || batch.seats.length < 1 || batch.seats.length > 3 || new Set(batch.seats).size !== batch.seats.length) {
        fail(`/batches/${index}/seats: expected one to three unique seats`);
    }
    if (batch.maximum_dispatched_children !== 3) fail(`/batches/${index}/maximum_dispatched_children: must be 3`);
    for (const seat of batch.seats ?? []) {
        if (batchBySeat.has(seat)) fail(`/batches/${index}/seats: seat ${seat} appears in multiple batches`);
        batchBySeat.set(seat, batch.id);
    }
}

const panelBySeat = new Map();
const panels = new Map();
for (const [index, panel] of (ledger.panels ?? []).entries()) {
    exactObject(panel, ["id", "kind", "status", "seats", "finding_family", "owner_after_iteration_3", "outcome"], `/panels/${index}`);
    if (typeof panel.id !== "string" || panels.has(panel.id)) fail(`/panels/${index}/id: missing or duplicate`);
    panels.set(panel.id, panel);
    if (!["portfolio", "challenge", "triad"].includes(panel.kind)) fail(`/panels/${index}/kind: invalid kind`);
    if (panel.status !== "closed") fail(`/panels/${index}/status: persisted formation panels must be closed`);
    if (!Array.isArray(panel.seats) || panel.seats.length < 1 || new Set(panel.seats).size !== panel.seats.length) {
        fail(`/panels/${index}/seats: expected a non-empty unique array`);
    }
    if (typeof panel.finding_family !== "string" || panel.finding_family === "") fail(`/panels/${index}/finding_family: missing`);
    if (panel.owner_after_iteration_3 !== "formation-root") fail(`/panels/${index}/owner_after_iteration_3: must be formation-root`);
    if (typeof panel.outcome !== "string" || panel.outcome === "") fail(`/panels/${index}/outcome: missing`);
    for (const seat of panel.seats ?? []) {
        if (panelBySeat.has(seat)) fail(`/panels/${index}/seats: seat ${seat} appears in multiple panels`);
        panelBySeat.set(seat, panel.id);
    }
}

const seats = ledger.seats ?? [];
if (!Array.isArray(seats) || seats.length !== 32) fail(`/seats: expected exactly 32 seats; found ${seats.length ?? "non-array"}`);
const seatNumbers = new Set();
const agentPaths = new Set();
const sessionFiles = new Set();
const agentThreadIds = new Set();
const allowedRoles = new Set(["skeptic_a", "skeptic_b", "adjudicator", "auditor"]);

for (const [index, seat] of seats.entries()) {
    const pointer = `/seats/${index}`;
    exactObject(seat, [
        "seat", "agent_path", "nickname", "role", "finding_family", "panel", "iteration", "batch",
        "runtime_child_capacity", "status", "outcome", "request", "session",
    ], pointer);
    if (!Number.isInteger(seat.seat) || seat.seat < 1 || seat.seat > 32 || seatNumbers.has(seat.seat)) fail(`${pointer}/seat: invalid or duplicate`);
    seatNumbers.add(seat.seat);
    if (!/^\/root\/[a-z0-9_/]+$/.test(seat.agent_path ?? "") || agentPaths.has(seat.agent_path)) fail(`${pointer}/agent_path: invalid or duplicate`);
    agentPaths.add(seat.agent_path);
    if (typeof seat.nickname !== "string" || seat.nickname === "") fail(`${pointer}/nickname: missing`);
    if (!allowedRoles.has(seat.role)) fail(`${pointer}/role: invalid role`);
    if (typeof seat.finding_family !== "string" || seat.finding_family === "") fail(`${pointer}/finding_family: missing`);
    if (!Number.isInteger(seat.iteration) || seat.iteration < 1 || seat.iteration > ledger.control.maximum_iteration) fail(`${pointer}/iteration: must be 1..3`);
    if (seat.runtime_child_capacity !== 3) fail(`${pointer}/runtime_child_capacity: must be 3`);
    if (seat.status !== "completed") fail(`${pointer}/status: only immutable completed session evidence may be seated`);
    if (typeof seat.outcome !== "string" || seat.outcome === "") fail(`${pointer}/outcome: missing`);
    if (batchBySeat.get(seat.seat) !== seat.batch) fail(`${pointer}/batch: batch membership mismatch`);
    if (panelBySeat.get(seat.seat) !== seat.panel) fail(`${pointer}/panel: panel membership mismatch`);
    const panel = panels.get(seat.panel);
    if (panel && seat.finding_family !== panel.finding_family) fail(`${pointer}/finding_family: must equal owning panel family`);

    const requestKeys = ["mode", "model", "effort", "parent_turn_id", "spawn_call_id", "spawn_line", "context_line", "record_sha256"];
    exactObject(seat.request, requestKeys, `${pointer}/request`);
    if (!["explicit", "inherited"].includes(seat.request?.mode)) fail(`${pointer}/request/mode: invalid mode`);
    if (seat.request?.model !== ledger.control.required_model || seat.request?.effort !== ledger.control.required_effort) {
        fail(`${pointer}/request: requested route is not Sol ultra`);
    }
    if (!hex64.test(seat.request?.record_sha256 ?? "")) fail(`${pointer}/request/record_sha256: invalid SHA-256`);

    const spawnRecord = parentRecords.find(({ line, value }) => line === seat.request.spawn_line &&
        value.type === "response_item" && value.payload?.type === "function_call" &&
        value.payload?.name === "spawn_agent" && value.payload?.call_id === seat.request.spawn_call_id);
    if (!spawnRecord) {
        fail(`${pointer}/request: spawn call not found at exact line`);
    } else {
        let args;
        try {
            args = parseJsonStrict(spawnRecord.value.payload.arguments);
        } catch (error) {
            fail(`${pointer}/request: invalid spawn arguments (${error.message})`);
        }
        const turnId = spawnRecord.value.payload.internal_chat_message_metadata_passthrough?.turn_id;
        if (args?.task_name !== seat.agent_path.slice("/root/".length) || turnId !== seat.request.parent_turn_id) {
            fail(`${pointer}/request: spawn task or parent turn mismatch`);
        }
        const explicit = typeof args?.model === "string" || typeof args?.reasoning_effort === "string";
        if ((explicit ? "explicit" : "inherited") !== seat.request.mode) fail(`${pointer}/request/mode: does not match spawn arguments`);
        if (explicit && (args.model !== seat.request.model || args.reasoning_effort !== seat.request.effort)) {
            fail(`${pointer}/request: explicit route mismatch`);
        }
        const context = parentRecords.find(({ line, value }) => line === seat.request.context_line && value.type === "turn_context" &&
            value.payload?.turn_id === turnId);
        if (!context || context.value.payload.model !== seat.request.model || context.value.payload.effort !== seat.request.effort) {
            fail(`${pointer}/request: parent context evidence mismatch`);
        }
        const output = parentRecords.find(({ value }) => value.type === "response_item" && value.payload?.type === "function_call_output" &&
            value.payload?.call_id === seat.request.spawn_call_id && value.payload?.output === JSON.stringify({ task_name: seat.agent_path }));
        const started = parentRecords.find(({ value }) => value.type === "event_msg" && value.payload?.type === "sub_agent_activity" &&
            value.payload?.event_id === seat.request.spawn_call_id && value.payload?.agent_path === seat.agent_path && value.payload?.kind === "started");
        if (!output || !started) fail(`${pointer}/request: spawn lacks matching success output/start event`);
        const digest = sha256(canonicalize({
            spawn_call_id: seat.request.spawn_call_id,
            parent_turn_id: turnId,
            task_name: args?.task_name,
            fork_turns: args?.fork_turns ?? "all",
            mode: seat.request.mode,
            model: seat.request.model,
            effort: seat.request.effort,
            output: output?.value.payload.output ?? null,
            agent_thread_id: started?.value.payload.agent_thread_id ?? null,
        }));
        if (digest !== seat.request.record_sha256) fail(`${pointer}/request/record_sha256: spawn evidence drift`);
    }

    const sessionKeys = [
        "file", "sha256", "formation_session_id", "agent_thread_id", "model", "effort", "meta_line",
        "turn_context_line", "task_complete_line", "final_report_kind", "final_report_line", "final_report_sha256", "started_at", "completed_at",
    ];
    exactObject(seat.session, sessionKeys, `${pointer}/session`);
    if (sessionFiles.has(seat.session?.file)) fail(`${pointer}/session/file: duplicate session file`);
    sessionFiles.add(seat.session?.file);
    if (agentThreadIds.has(seat.session?.agent_thread_id)) fail(`${pointer}/session/agent_thread_id: duplicate thread`);
    agentThreadIds.add(seat.session?.agent_thread_id);
    if (!hex64.test(seat.session?.sha256 ?? "") || !hex64.test(seat.session?.final_report_sha256 ?? "")) {
        fail(`${pointer}/session: invalid evidence hash`);
    }
    if (!existsSync(seat.session?.file ?? "")) {
        fail(`${pointer}/session/file: missing ${seat.session?.file}`);
        continue;
    }
    if (sha256File(seat.session.file) !== seat.session.sha256) fail(`${pointer}/session/sha256: completed session drift`);
    const records = jsonLines(seat.session.file);
    const meta = records.find(({ line, value }) => line === seat.session.meta_line && value.type === "session_meta");
    if (!meta || meta.value.payload?.agent_path !== seat.agent_path || meta.value.payload?.id !== seat.session.agent_thread_id ||
        meta.value.payload?.session_id !== seat.session.formation_session_id || seat.session.formation_session_id !== ledger.control.formation_session_id ||
        meta.value.payload?.cwd !== root.replace(/\/docs\/tranches\/V\/vnext$/, "")) {
        fail(`${pointer}/session: session_meta identity/cwd mismatch`);
    }
    const context = records.find(({ line, value }) => line === seat.session.turn_context_line && value.type === "turn_context");
    if (!context || context.value.payload?.model !== seat.session.model || context.value.payload?.effort !== seat.session.effort ||
        seat.session.model !== ledger.control.required_model || seat.session.effort !== ledger.control.required_effort) {
        fail(`${pointer}/session: content-attested session route is not evidenced Sol ultra`);
    }
    const complete = records.find(({ line, value }) => line === seat.session.task_complete_line &&
        value.type === "event_msg" && value.payload?.type === "task_complete");
    if (!complete || complete.value.timestamp !== seat.session.completed_at || meta?.value.timestamp !== seat.session.started_at) {
        fail(`${pointer}/session: start/completion evidence mismatch`);
    }
    const report = finalReport(records);
    if (!report || report.kind !== seat.session.final_report_kind || report.line !== seat.session.final_report_line ||
        report.text === "" || sha256(report.text) !== seat.session.final_report_sha256) {
        fail(`${pointer}/session: final-report evidence mismatch`);
    }
    const started = parentRecords.find(({ value }) => value.type === "event_msg" && value.payload?.type === "sub_agent_activity" &&
        value.payload?.event_id === seat.request.spawn_call_id && value.payload?.agent_thread_id === seat.session.agent_thread_id);
    if (!started) fail(`${pointer}: parent spawn and child session thread IDs do not join`);
}

for (let seat = 1; seat <= 32; seat += 1) {
    if (!seatNumbers.has(seat)) fail(`/seats: missing seat ${seat}`);
    if (!batchBySeat.has(seat)) fail(`/batches: missing seat ${seat}`);
    if (!panelBySeat.has(seat)) fail(`/panels: missing seat ${seat}`);
}

for (const [id, panel] of panels) {
    if (panel.kind !== "triad") continue;
    if (panel.seats.length !== 3) fail(`/panels/${id}: closed triad must contain exactly three seats`);
    const members = panel.seats.map((number) => seats.find((seat) => seat.seat === number)).filter(Boolean);
    const roles = members.map((seat) => seat.role).sort();
    if (canonicalize(roles) !== canonicalize(["adjudicator", "skeptic_a", "skeptic_b"])) {
        fail(`/panels/${id}: closed triad lacks skeptic_a, skeptic_b, adjudicator completeness`);
    }
    const iterationByRole = Object.fromEntries(members.map((seat) => [seat.role, seat.iteration]));
    if (iterationByRole.skeptic_a !== 1 || iterationByRole.skeptic_b !== 2 || iterationByRole.adjudicator !== 3) {
        fail(`/panels/${id}: role iterations must be skeptic_a=1, skeptic_b=2, adjudicator=3`);
    }
}

exactObject(ledger.external_upstream_bbnf, ["scope", "counted_in_formation_seats", "campaign_session_id", "campaign_parent_file", "ruling", "evidence"], "/external_upstream_bbnf");
if (ledger.external_upstream_bbnf?.scope !== "external-active-bbnf-parse-that-campaign" ||
    ledger.external_upstream_bbnf?.counted_in_formation_seats !== false ||
    ledger.external_upstream_bbnf?.campaign_session_id === ledger.control?.formation_session_id ||
    typeof ledger.external_upstream_bbnf?.ruling !== "string" || !ledger.external_upstream_bbnf.ruling.includes("not a V-next seat")) {
    fail("/external_upstream_bbnf: external/non-seat boundary is not explicit");
}
if (typeof ledger.external_upstream_bbnf?.campaign_parent_file !== "string" || !existsSync(ledger.external_upstream_bbnf.campaign_parent_file)) {
    fail("/external_upstream_bbnf/campaign_parent_file: missing campaign parent JSONL");
} else {
    const campaignRecords = jsonLines(ledger.external_upstream_bbnf.campaign_parent_file);
    const campaignMeta = first(campaignRecords, (record) => record.type === "session_meta");
    if (!campaignMeta || campaignMeta.value.payload?.id !== ledger.external_upstream_bbnf.campaign_session_id ||
        campaignMeta.value.payload?.session_id !== ledger.external_upstream_bbnf.campaign_session_id ||
        campaignMeta.value.payload?.cwd !== "/Users/mkbabb/Programming/bbnf-lang") {
        fail("/external_upstream_bbnf/campaign_parent_file: campaign identity/cwd mismatch");
    }
}
const upstreamPaths = new Set();
for (const [index, evidence] of (ledger.external_upstream_bbnf?.evidence ?? []).entries()) {
    const pointer = `/external_upstream_bbnf/evidence/${index}`;
    exactObject(evidence, ["agent_path", "file", "sha256", "agent_thread_id", "model", "effort", "meta_line", "turn_context_line", "task_complete_line"], pointer);
    if (agentPaths.has(evidence.agent_path) || upstreamPaths.has(evidence.agent_path)) fail(`${pointer}/agent_path: upstream agent is duplicated or counted as a seat`);
    upstreamPaths.add(evidence.agent_path);
    if (!existsSync(evidence.file ?? "") || sha256File(evidence.file) !== evidence.sha256) {
        fail(`${pointer}/file: upstream evidence is missing or drifted`);
        continue;
    }
    const records = jsonLines(evidence.file);
    const meta = records.find(({ line, value }) => line === evidence.meta_line && value.type === "session_meta");
    const context = records.find(({ line, value }) => line === evidence.turn_context_line && value.type === "turn_context");
    const complete = records.find(({ line, value }) => line === evidence.task_complete_line && value.type === "event_msg" && value.payload?.type === "task_complete");
    if (!meta || meta.value.payload?.agent_path !== evidence.agent_path || meta.value.payload?.id !== evidence.agent_thread_id ||
        meta.value.payload?.session_id !== ledger.external_upstream_bbnf.campaign_session_id ||
        meta.value.payload?.cwd !== "/Users/mkbabb/Programming/bbnf-lang") {
        fail(`${pointer}: upstream session identity/cwd mismatch`);
    }
    if (!context || context.value.payload?.model !== evidence.model || context.value.payload?.effort !== evidence.effort ||
        evidence.model !== "gpt-5.6-sol" || evidence.effort !== "xhigh") {
        fail(`${pointer}: expected external Sol xhigh evidence`);
    }
    if (!complete) fail(`${pointer}: upstream evidence must be a completed immutable session`);
}
if ((ledger.external_upstream_bbnf?.evidence ?? []).length < 3) fail("/external_upstream_bbnf/evidence: at least three completed campaign witnesses are required");

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(`${JSON.stringify({
    schema: ledger.schema,
    seats: seats.length,
    panels: ledger.panels.length,
    closed_triads: ledger.panels.filter((panel) => panel.kind === "triad").length,
    batches: ledger.batches.length,
    route: `${ledger.control.required_model}/${ledger.control.required_effort}`,
    runtime: `root+${ledger.control.runtime_capacity.child_agents}`,
    requested_concurrency: "5–6 capability-limited",
    external_upstream_witnesses: ledger.external_upstream_bbnf.evidence.length,
}, null, 2)}\n`);
