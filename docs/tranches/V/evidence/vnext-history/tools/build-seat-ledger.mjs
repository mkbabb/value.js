#!/usr/bin/env node

// Emits the immutable, evidence-bound 32-seat formation ledger. It never writes
// the corpus: refreshes remain an explicit apply_patch review step.

import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { canonicalize, decodeUtf8Strict, parseJsonStrict } from "./json-contract.mjs";
import { indexUniqueAgentSessions } from "./seat-ledger-session-index.mjs";

const sessions = "/Users/mkbabb/.codex/sessions/2026/07/18";
const parentFile = join(sessions, "rollout-2026-07-18T01-00-39-019f7399-10f6-7743-8494-a4574b44d604.jsonl");
const upstreamParentFile = join(sessions, "rollout-2026-07-18T14-37-45-019f7685-254a-7a22-9917-1da91f977861.jsonl");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function records(path) {
    return decodeUtf8Strict(readFileSync(path)).split("\n").flatMap((line, index) => {
        if (line === "") return [];
        return [{ line: index + 1, value: parseJsonStrict(line) }];
    });
}

function finalReport(items) {
    const candidates = items.filter(({ value }) =>
        (value.type === "event_msg" && value.payload?.type === "agent_message" && value.payload?.phase === "final_answer") ||
        (value.type === "response_item" && value.payload?.type === "message" && value.payload?.phase === "final_answer"));
    const record = candidates.at(-1);
    let line;
    let kind;
    let text;
    if (record) {
        line = record.line;
        kind = "final_answer";
        text = record.value.type === "event_msg"
            ? record.value.payload.message ?? ""
            : (record.value.payload.content ?? [])
                .filter((item) => item.type === "output_text" || item.type === "input_text")
                .map((item) => item.text ?? "")
                .join("");
    } else {
        const sent = items.filter(({ value }) => value.type === "response_item" && value.payload?.type === "function_call" &&
            value.payload?.namespace === "collaboration" && value.payload?.name === "send_message").at(-1);
        if (!sent) throw new Error("completed session lacks a final report");
        const args = parseJsonStrict(sent.value.payload.arguments);
        if (args.target !== "/root" || typeof args.message !== "string" || args.message === "") throw new Error("invalid final root report");
        line = sent.line;
        kind = "message_to_root";
        text = sent.value.payload.arguments;
    }
    if (text === "") throw new Error("completed session has empty final answer");
    return { line, kind, text };
}

const definitions = [
    [1, "/root/value_topology_audit", "auditor", "F-04", "AUDIT-TOPOLOGY", 1, "B01", "current and target topology evidence folded into V and DAG contracts"],
    [2, "/root/keyframes_session_audit", "auditor", "F-01", "AUDIT-PROVENANCE", 1, "B01", "Claude-session provenance and keyframes demo failures folded into K/M"],
    [3, "/root/parser_constellation_audit", "auditor", "F-02", "AUDIT-PARSER", 1, "B01", "parser archaeology folded into the bounded P charter"],
    [4, "/root/history_prompt_registry", "auditor", "F-10", "AUDIT-RECAP", 1, "B02", "prompt recap and deferred/chronic census folded into ledgers"],
    [5, "/root/parser_uplift_archaeology", "auditor", "F-02", "AUDIT-PARSER", 1, "B02", "substrate research retained as prior art without automatic adoption"],
    [6, "/root/palette_crud_api_audit", "auditor", "F-06", "AUDIT-API", 1, "B03", "value/Fourier CRUD findings folded into the API program"],
    [7, "/root/frontend_breath_architecture", "auditor", "F-08", "AUDIT-DESIGN", 1, "B03", "every-route design and Breath findings folded into G/D/M"],
    [8, "/root/library_wave_architecture", "auditor", "F-04", "AUDIT-ARCHITECTURE", 1, "B04", "base wave and component architecture supplied then superseded by hardening"],
    [9, "/root/sol_skeptic_a_pass1", "skeptic_a", "F-09", "BASE-CHALLENGE", 1, "B05", "whole-corpus findings reopened formation"],
    [10, "/root/sol_skeptic_b_pass1", "skeptic_b", "F-09", "BASE-CHALLENGE", 2, "B05", "independent whole-corpus findings reopened formation"],
    [11, "/root/sol_skeptic_a_pass2", "auditor", "F-09", "BASE-CHALLENGE", 3, "B05", "rotated amendments recovered into the base corpus; not mislabelled an adjudicator"],
    [12, "/root/p_skeptic_a", "skeptic_a", "F-02", "P-TRIAD", 1, "B06", "concrete published parse-that defects preserved"],
    [13, "/root/p_skeptic_b", "skeptic_b", "F-02", "P-TRIAD", 2, "B06", "scope and conflation defects preserved"],
    [14, "/root/p_adjudicator", "adjudicator", "F-02", "P-TRIAD", 3, "B06", "P band replaced and novelty routed to the external campaign"],
    [15, "/root/v_skeptic_a", "skeptic_a", "F-03", "V-TRIAD", 1, "B07", "value semantics and restoration plan refuted"],
    [16, "/root/v_skeptic_b", "skeptic_b", "F-03", "V-TRIAD", 2, "B07", "standards, parser, color, and performance defects reproduced"],
    [17, "/root/v_adjudicator", "adjudicator", "F-03", "V-TRIAD", 3, "B07", "prior V band rejected and 44-row replacement accepted"],
    [18, "/root/k_skeptic_a", "skeptic_a", "F-05", "K-TRIAD", 1, "B08", "Program, WAAPI, state, and dependency defects reproduced"],
    [19, "/root/k_skeptic_b", "skeptic_b", "F-05", "K-TRIAD", 2, "B08", "terminal-prune and consumer-casualty defects reproduced"],
    [20, "/root/k_adjudicator", "adjudicator", "F-05", "K-TRIAD", 3, "B09", "27-row K replacement and consumer migrations accepted"],
    [21, "/root/a_skeptic_a", "skeptic_a", "F-06", "A-TRIAD", 1, "B08", "API lifecycle, authority, and resource defects reproduced"],
    [22, "/root/a_skeptic_b", "skeptic_b", "F-06", "A-TRIAD", 2, "B09", "Fourier isomorphism and CRUD falsifiers reproduced"],
    [23, "/root/a_adjudicator", "adjudicator", "F-06", "A-TRIAD", 3, "B10", "36-row API replacement and authority law accepted"],
    [24, "/root/gd_skeptic_a", "skeptic_a", "F-08", "GD-TRIAD", 1, "B09", "topology, shadcn, route, state, and design-gate defects reproduced"],
    [25, "/root/gd_skeptic_b", "skeptic_b", "F-08", "GD-TRIAD", 2, "B10", "mobile easing, Breath, field, and visual-proof defects reproduced"],
    [26, "/root/gd_adjudicator", "adjudicator", "F-08", "GD-TRIAD", 3, "B11", "G10/D33 replacement and visual laws accepted"],
    [27, "/root/mc_skeptic_a", "skeptic_a", "F-07", "MC-TRIAD", 1, "B10", "mobile gesture, state, consumer-universe, and cutover defects reproduced"],
    [28, "/root/mc_skeptic_b", "skeptic_b", "F-07", "MC-TRIAD", 2, "B11", "canonical keyframes, multi-pointer, census, and physical-gate defects reproduced"],
    [29, "/root/mc_adjudicator", "adjudicator", "F-07", "MC-TRIAD", 3, "B12", "M13/C19 replacement and exact state/easing/cutover laws accepted"],
    [30, "/root/x_skeptic_a", "skeptic_a", "F-09", "X-TRIAD", 1, "B13", "cross-band DAG, prompt, chronic, and ownership defects reproduced"],
    [31, "/root/x_skeptic_b", "skeptic_b", "F-09", "X-TRIAD", 2, "B13", "return-schema, gate-soundness, and zero-drop defects reproduced"],
    [32, "/root/cross_adjudicator", "adjudicator", "F-09", "X-TRIAD", 3, "B14", "cross-band amendments adjudicated NOT CLEAN and routed to formation owners"],
];

const batches = [
    ["B01", [1, 2, 3]], ["B02", [4, 5]], ["B03", [6, 7]], ["B04", [8]], ["B05", [9, 10, 11]],
    ["B06", [12, 13, 14]], ["B07", [15, 16, 17]], ["B08", [18, 19, 21]], ["B09", [20, 22, 24]],
    ["B10", [23, 25, 27]], ["B11", [26, 28]], ["B12", [29]], ["B13", [30, 31]], ["B14", [32]],
].map(([id, seats]) => ({ id, seats, maximum_dispatched_children: 3 }));

const panels = [
    ["AUDIT-TOPOLOGY", "portfolio", [1], "F-04", "topology audit folded"],
    ["AUDIT-PROVENANCE", "portfolio", [2], "F-01", "provenance audit folded"],
    ["AUDIT-PARSER", "portfolio", [3, 5], "F-02", "parser audits folded and bounded"],
    ["AUDIT-RECAP", "portfolio", [4], "F-10", "zero-drop census folded"],
    ["AUDIT-API", "portfolio", [6], "F-06", "API audit folded"],
    ["AUDIT-DESIGN", "portfolio", [7], "F-08", "design audit folded"],
    ["AUDIT-ARCHITECTURE", "portfolio", [8], "F-04", "base architecture folded then hardened"],
    ["BASE-CHALLENGE", "challenge", [9, 10, 11], "F-09", "hostile base challenge reopened formation; no false third-Sol claim"],
    ["P-TRIAD", "triad", [12, 13, 14], "F-02", "bounded P replacement accepted"],
    ["V-TRIAD", "triad", [15, 16, 17], "F-03", "44-row V replacement accepted"],
    ["K-TRIAD", "triad", [18, 19, 20], "F-05", "27-row K replacement accepted"],
    ["A-TRIAD", "triad", [21, 22, 23], "F-06", "36-row A replacement accepted"],
    ["GD-TRIAD", "triad", [24, 25, 26], "F-08", "G10/D33 replacement accepted"],
    ["MC-TRIAD", "triad", [27, 28, 29], "F-07", "M13/C19 replacement accepted"],
    ["X-TRIAD", "triad", [30, 31, 32], "F-09", "cross-band adjudication returned NOT CLEAN amendments"],
].map(([id, kind, seats, finding_family, outcome]) => ({
    id, kind, status: "closed", seats, finding_family, owner_after_iteration_3: "formation-root", outcome,
}));

const parentRecords = records(parentFile);
const sessionRows = [];
for (const file of readdirSync(sessions).filter((name) => name.endsWith(".jsonl"))) {
    const path = join(sessions, file);
    const source = readFileSync(path);
    const items = decodeUtf8Strict(source).split("\n").flatMap((line, index) =>
        line === "" ? [] : [{ line: index + 1, value: parseJsonStrict(line) }]);
    const meta = items.find(({ value }) => value.type === "session_meta" && value.payload?.agent_path);
    if (meta) sessionRows.push({
        agent_path: meta.value.payload.agent_path,
        file,
        value: { path, source, items, meta },
    });
}
const sessionIndex = indexUniqueAgentSessions(sessionRows);

function spawnEvidence(agentPath) {
    const taskName = agentPath.slice("/root/".length);
    const candidates = parentRecords.filter(({ value }) => value.type === "response_item" && value.payload?.type === "function_call" && value.payload?.name === "spawn_agent");
    for (const call of candidates) {
        const args = parseJsonStrict(call.value.payload.arguments);
        if (args.task_name !== taskName) continue;
        const callId = call.value.payload.call_id;
        const outputText = JSON.stringify({ task_name: agentPath });
        const output = parentRecords.find(({ value }) => value.type === "response_item" && value.payload?.type === "function_call_output" &&
            value.payload?.call_id === callId && value.payload?.output === outputText);
        const started = parentRecords.find(({ value }) => value.type === "event_msg" && value.payload?.type === "sub_agent_activity" &&
            value.payload?.event_id === callId && value.payload?.agent_path === agentPath && value.payload?.kind === "started");
        if (!output || !started) continue;
        const turnId = call.value.payload.internal_chat_message_metadata_passthrough?.turn_id;
        const contexts = parentRecords.filter(({ line, value }) => line < call.line && value.type === "turn_context" && value.payload?.turn_id === turnId);
        const context = contexts.at(-1);
        if (!context) throw new Error(`${agentPath}: parent turn context missing`);
        const mode = typeof args.model === "string" || typeof args.reasoning_effort === "string" ? "explicit" : "inherited";
        const model = args.model ?? context.value.payload.model;
        const effort = args.reasoning_effort ?? context.value.payload.effort;
        const digest = sha256(canonicalize({
            spawn_call_id: callId,
            parent_turn_id: turnId,
            task_name: args.task_name,
            fork_turns: args.fork_turns ?? "all",
            mode,
            model,
            effort,
            output: outputText,
            agent_thread_id: started.value.payload.agent_thread_id,
        }));
        return {
            mode, model, effort, parent_turn_id: turnId, spawn_call_id: callId,
            spawn_line: call.line, context_line: context.line, record_sha256: digest,
        };
    }
    throw new Error(`${agentPath}: no successful spawn call`);
}

function sessionEvidence(agentPath, formationSessionId) {
    const indexed = sessionIndex.get(agentPath);
    if (!indexed) throw new Error(`${agentPath}: session file missing`);
    const { path, source, items, meta } = indexed;
    const context = items.filter(({ value }) => value.type === "turn_context" && value.payload?.model === "gpt-5.6-sol" && value.payload?.effort === "ultra").at(-1);
    const complete = items.filter(({ value }) => value.type === "event_msg" && value.payload?.type === "task_complete").at(-1);
    const report = finalReport(items);
    if (!context || !complete) throw new Error(`${agentPath}: served route/completion missing`);
    if (meta.value.payload.session_id !== formationSessionId) throw new Error(`${agentPath}: wrong formation session`);
    return {
        file: path,
        sha256: sha256(source),
        formation_session_id: meta.value.payload.session_id,
        agent_thread_id: meta.value.payload.id,
        model: context.value.payload.model,
        effort: context.value.payload.effort,
        meta_line: meta.line,
        turn_context_line: context.line,
        task_complete_line: complete.line,
        final_report_kind: report.kind,
        final_report_line: report.line,
        final_report_sha256: sha256(report.text),
        started_at: meta.value.timestamp,
        completed_at: complete.value.timestamp,
    };
}

const formationSessionId = "019f7399-10f6-7743-8494-a4574b44d604";
const seatRows = definitions.map(([seat, agent_path, role, finding_family, panel, iteration, batch, outcome]) => {
    const indexed = sessionIndex.get(agent_path);
    return {
        seat,
        agent_path,
        nickname: indexed?.meta.value.payload.agent_nickname ?? "",
        role,
        finding_family,
        panel,
        iteration,
        batch,
        runtime_child_capacity: 3,
        status: "completed",
        outcome,
        request: spawnEvidence(agent_path),
        session: sessionEvidence(agent_path, formationSessionId),
    };
});

function capability(callId) {
    const record = parentRecords.find(({ value }) => value.type === "response_item" && value.payload?.type === "function_call_output" && value.payload?.call_id === callId);
    if (!record || !record.value.payload.output.includes("agent thread limit reached")) throw new Error(`${callId}: capability failure missing`);
    return { call_id: callId, line: record.line, result: record.value.payload.output };
}

const upstreamAgentPaths = ["/root/bbnf_census", "/root/graph_p1_adjudicator", "/root/pt_execution_adjudicator"];
const upstreamEvidence = upstreamAgentPaths.map((agentPath) => {
    const indexed = sessionIndex.get(agentPath);
    if (!indexed) throw new Error(`${agentPath}: upstream session missing`);
    const { path, source, items, meta } = indexed;
    const context = items.filter(({ value }) => value.type === "turn_context" && value.payload?.model === "gpt-5.6-sol" && value.payload?.effort === "xhigh").at(-1);
    const complete = items.filter(({ value }) => value.type === "event_msg" && value.payload?.type === "task_complete").at(-1);
    if (!context || !complete) throw new Error(`${agentPath}: incomplete upstream evidence`);
    return {
        agent_path: agentPath,
        file: path,
        sha256: sha256(source),
        agent_thread_id: meta.value.payload.id,
        model: context.value.payload.model,
        effort: context.value.payload.effort,
        meta_line: meta.line,
        turn_context_line: context.line,
        task_complete_line: complete.line,
    };
});

const ledger = {
    schema: "vnext-formation-seat-ledger/1",
    control: {
        formation_session_id: formationSessionId,
        parent_session_file: parentFile,
        seat_budget: 32,
        required_model: "gpt-5.6-sol",
        required_effort: "ultra",
        maximum_iteration: 3,
        owner_after_iteration_3: "formation-root",
        requested_concurrency: { minimum: 5, maximum: 6, status: "capability-limited" },
        runtime_capacity: { root_agents: 1, child_agents: 3, total_agents: 4 },
        capability_evidence: [capability("call_n1ptW16RfutQFekOZud3X6NJ"), capability("call_4S5fjNlqNuPx25Q6eWMrTKN0")],
        scheduling_law: "The runtime admits root plus three children. Dispatch cells rotate at no more than three child seats, never 5–6 simultaneously; session lifetime overlap can include idle or reopened agents and is not a concurrency claim.",
    },
    batches,
    panels,
    seats: seatRows,
    external_upstream_bbnf: {
        scope: "external-active-bbnf-parse-that-campaign",
        counted_in_formation_seats: false,
        campaign_session_id: "019f7685-254a-7a22-9917-1da91f977861",
        campaign_parent_file: upstreamParentFile,
        ruling: "This active upstream BBNF/parse-that campaign is coordinated evidence, not a V-next seat; Sol xhigh there neither weakens nor masquerades as V-next Sol ultra service.",
        evidence: upstreamEvidence,
    },
};

process.stdout.write(`${JSON.stringify(ledger, null, 2)}\n`);
