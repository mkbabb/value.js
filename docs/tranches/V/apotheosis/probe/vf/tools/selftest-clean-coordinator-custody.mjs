#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    mkdirSync,
    mkdtempSync,
    readFileSync,
    realpathSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
    canonicalCleanPersistSource,
    validateCleanCoordinatorCustody,
} from "./clean-coordinator-custody.mjs";
import { canonicalCleanStartSource, cleanExecWorkspaceRoot } from "./clean-exec-contract.mjs";
import {
    cleanReportByteLimit,
    cleanReportHashPath,
    cleanReportHashSchema,
    hashCleanReportFile,
    parseCleanReportHashArgs,
    renderCleanReportHashReceipt,
} from "./hash-clean-report.mjs";
import { canonicalize } from "./json-contract.mjs";

const workspaceRoot = cleanExecWorkspaceRoot;
const corpusRoot = resolve(workspaceRoot, "docs/tranches/V/vnext");
const turnId = "00000000-0000-0000-0000-000000000001";
const statusBlock = { type: "input_text", text: "Script completed\nWall time 0.1 seconds\nOutput:\n" };
const digest = (value) => createHash("sha256").update(value, "utf8").digest("hex");
const exactExecOutput = (output) => [
    statusBlock,
    { type: "input_text", text: JSON.stringify({ output, wall_time_seconds: 0.1, exit_code: 0 }) },
];
const applyPatchOutput = [statusBlock, { type: "input_text", text: "{}" }];

class FixtureBuilder {
    constructor() {
        this.records = [];
        this.callCounter = 0;
        this.itemCounter = 0;
        this.uuidCounter = 1;
        this.baseTime = Date.parse("2026-07-19T12:00:00.000Z");
        this.agentStatuses = new Map([["/root", "running"]]);
    }

    timestamp(offset = 0) {
        return new Date(this.baseTime + (this.records.length * 10) + offset).toISOString();
    }

    callId() {
        this.callCounter += 1;
        return `call_${String(this.callCounter).padStart(24, "A")}`;
    }

    itemId(prefix) {
        this.itemCounter += 1;
        return `${prefix}_${this.itemCounter.toString(16).padStart(50, "0")}`;
    }

    uuid(prefix) {
        this.uuidCounter += 1;
        const tail = this.uuidCounter.toString(16).padStart(12, "0");
        return `${prefix}_00000000-0000-0000-0000-${tail}`;
    }

    push(type, payloadOrFactory) {
        const timestamp = this.timestamp();
        const payload = typeof payloadOrFactory === "function"
            ? payloadOrFactory(timestamp)
            : payloadOrFactory;
        const record = {
            line: this.records.length + 1,
            value: { timestamp, type, payload },
        };
        this.records.push(record);
        return record;
    }

    functionCall(name, args, callId = this.callId()) {
        return this.push("response_item", {
            type: "function_call",
            id: this.itemId("fc"),
            name,
            namespace: "collaboration",
            arguments: canonicalize(args),
            call_id: callId,
            internal_chat_message_metadata_passthrough: { turn_id: turnId },
        });
    }

    functionOutput(callId, output) {
        return this.push("response_item", {
            type: "function_call_output",
            id: this.uuid("fco"),
            call_id: callId,
            output,
            internal_chat_message_metadata_passthrough: { turn_id: turnId },
        });
    }

    customCall(input, callId = this.callId()) {
        return this.push("response_item", {
            type: "custom_tool_call",
            id: this.itemId("ctc"),
            status: "completed",
            call_id: callId,
            name: "exec",
            input,
            internal_chat_message_metadata_passthrough: { turn_id: turnId },
        });
    }

    customOutput(callId, output) {
        return this.push("response_item", {
            type: "custom_tool_call_output",
            id: this.uuid("ctco"),
            call_id: callId,
            output,
            internal_chat_message_metadata_passthrough: { turn_id: turnId },
        });
    }

    listAgents() {
        const callId = this.callId();
        const call = this.functionCall("list_agents", {}, callId);
        const agents = [...this.agentStatuses].map(([agent_name, agent_status]) => ({
            agent_name,
            agent_status,
        }));
        const output = this.functionOutput(callId, canonicalize({ agents }));
        return { call, output, callId };
    }

    waitAgent(timeoutMs = 10000) {
        const callId = this.callId();
        const call = this.functionCall("wait_agent", { timeout_ms: timeoutMs }, callId);
        const output = this.functionOutput(callId, canonicalize({
            message: "Wait timed out.",
            timed_out: true,
        }));
        return { call, output, callId };
    }

    absence(pass) {
        const callId = this.callId();
        const command = `node docs/tranches/V/vnext/tools/probe-clean-report-absence.mjs --pass ${pass}`;
        const call = this.customCall(canonicalCleanStartSource(command, workspaceRoot), callId);
        const absent = ["A", "B", "ADJ"].map((tag) => `reviews/FORMATION-CLEAN-PASS-${pass}-${tag}.md`);
        const stdout = `${JSON.stringify({ schema: "vnext-clean-report-absence/1", pass, absent })}\n`;
        const output = this.customOutput(callId, exactExecOutput(stdout));
        return { call_id: callId, call_line: call.line, output_line: output.line };
    }

    spawn(actor) {
        const callId = this.callId();
        actor.spawn_call_id = callId;
        const carrier = `gAAAA${String(this.callCounter).padStart(96, "B")}`;
        actor.encrypted_task_sha256 = digest(carrier);
        const call = this.functionCall("spawn_agent", {
            task_name: actor.agent_path.slice("/root/".length),
            fork_turns: "none",
            message: carrier,
            model: "gpt-5.6-sol",
            reasoning_effort: "ultra",
        }, callId);
        actor.spawn_line = call.line;
        this.push("event_msg", (timestamp) => ({
            type: "sub_agent_activity",
            event_id: callId,
            occurred_at_ms: Date.parse(timestamp),
            agent_thread_id: actor.session_id,
            agent_path: actor.agent_path,
            kind: "started",
        }));
        this.functionOutput(callId, JSON.stringify({ task_name: actor.agent_path }));
        this.agentStatuses.set(actor.agent_path, "running");
    }

    complete(actors) {
        for (const actor of actors) {
            this.agentStatuses.set(actor.agent_path, { completed: `${actor.role} completed` });
        }
    }

    persist(actor) {
        const callId = this.callId();
        actor.persist_call_id = callId;
        const call = this.customCall(canonicalCleanPersistSource(actor.report_path, actor.report), callId);
        actor.persist_call_line = call.line;
        this.push("event_msg", {
            type: "patch_apply_end",
            call_id: this.uuid("exec").replace("exec_", "exec-"),
            turn_id: turnId,
            stdout: `Success. Updated the following files:\nA ${actor.report_path}\n`,
            stderr: "",
            success: true,
            changes: { [actor.report_path]: { type: "add", content: actor.report } },
            status: "completed",
        });
        const output = this.customOutput(callId, applyPatchOutput);
        actor.persist_output_line = output.line;
    }

    hash(actor, pass, tag) {
        const callId = this.callId();
        actor.hash_call_id = callId;
        const command = `node docs/tranches/V/vnext/tools/hash-clean-report.mjs --pass ${pass} --tag ${tag}`;
        const call = this.customCall(canonicalCleanStartSource(command, workspaceRoot), callId);
        actor.hash_call_line = call.line;
        const receipt = {
            schema: cleanReportHashSchema,
            pass,
            tag,
            path: actor.report_path,
            sha256: actor.report_sha256,
        };
        const output = this.customOutput(callId, exactExecOutput(renderCleanReportHashReceipt(receipt)));
        actor.hash_output_line = output.line;
    }
}

function makeActor(pass, role, serial) {
    const tag = role === "critic_a" ? "A" : role === "critic_b" ? "B" : "ADJ";
    const report = `FORMATION-CLEAN-PASS-${pass}-${tag}\nserial ${serial}\n`;
    return {
        role,
        prompt_sha256: digest(`prompt ${pass} ${role}`),
        agent_path: `/root/vnext_clean_p${pass}_${role}_${serial}`,
        session_id: `00000000-0000-0000-0001-${String(serial).padStart(12, "0")}`,
        report_path: cleanReportHashPath(corpusRoot, pass, tag),
        report,
        report_sha256: digest(report),
    };
}

function buildFixture({ withWaits = false } = {}) {
    const builder = new FixtureBuilder();
    builder.agentStatuses.set("/root/old_completed", { completed: "old" });
    const passes = [1, 2].map((pass) => ({
        pass,
        absence_probe: null,
        critics: [
            makeActor(pass, "critic_a", pass * 10 + 1),
            makeActor(pass, "critic_b", pass * 10 + 2),
        ],
        adjudicator: makeActor(pass, "adjudicator", pass * 10 + 3),
    }));
    const quiescence = builder.listAgents();
    for (const pass of passes) {
        pass.absence_probe = builder.absence(pass.pass);
        const spawnOrder = pass.pass === 1 ? pass.critics : [...pass.critics].reverse();
        for (const actor of spawnOrder) builder.spawn(actor);
        if (withWaits) builder.waitAgent();
        builder.complete(pass.critics);
        builder.listAgents();
        const persistOrder = pass.pass === 1 ? pass.critics : [...pass.critics].reverse();
        for (const actor of persistOrder) {
            builder.persist(actor);
            builder.hash(actor, pass.pass, actor.role === "critic_a" ? "A" : "B");
        }
        builder.spawn(pass.adjudicator);
        if (withWaits) builder.waitAgent();
        builder.complete([pass.adjudicator]);
        builder.listAgents();
        builder.persist(pass.adjudicator);
        builder.hash(pass.adjudicator, pass.pass, "ADJ");
    }
    return {
        records: builder.records,
        options: {
            workspaceRoot,
            corpusRoot,
            turnId,
            startLine: 1,
            endLine: builder.records.length,
            quiescenceCallId: quiescence.callId,
            passes,
        },
    };
}

function actors(fixture) {
    return fixture.options.passes.flatMap((pass) => [...pass.critics, pass.adjudicator]);
}

function findCallIndex(fixture, callId) {
    return fixture.records.findIndex(({ value }) => value.payload?.call_id === callId
        && ["function_call", "custom_tool_call"].includes(value.payload?.type));
}

function bindLines(fixture) {
    fixture.records.forEach((record, index) => { record.line = index + 1; });
    fixture.options.startLine = 1;
    fixture.options.endLine = fixture.records.length;
    for (const pass of fixture.options.passes) {
        const absence = findCallIndex(fixture, pass.absence_probe.call_id);
        if (absence >= 0) {
            pass.absence_probe.call_line = absence + 1;
            pass.absence_probe.output_line = absence + 2;
        }
        for (const actor of [...pass.critics, pass.adjudicator]) {
            const spawn = findCallIndex(fixture, actor.spawn_call_id);
            const persist = findCallIndex(fixture, actor.persist_call_id);
            const hash = findCallIndex(fixture, actor.hash_call_id);
            if (spawn >= 0) actor.spawn_line = spawn + 1;
            if (persist >= 0) {
                actor.persist_call_line = persist + 1;
                actor.persist_output_line = persist + 3;
            }
            if (hash >= 0) {
                actor.hash_call_line = hash + 1;
                actor.hash_output_line = hash + 2;
            }
        }
    }
}

function cloneFixture(fixture) {
    return structuredClone(fixture);
}

function replacePairWithWait(fixture, callIndex) {
    const call = fixture.records[callIndex];
    const output = fixture.records[callIndex + 1];
    call.value.payload.name = "wait_agent";
    call.value.payload.arguments = canonicalize({ timeout_ms: 10000 });
    output.value.payload.output = canonicalize({ message: "Wait timed out.", timed_out: true });
}

function freshCustomPair(fixture, timestamp, input = "unallowlisted effect") {
    const suffix = String(fixture.records.length).padStart(24, "Z").slice(-24);
    const callId = `call_${suffix}`;
    return [
        {
            line: 0,
            value: {
                timestamp,
                type: "response_item",
                payload: {
                    type: "custom_tool_call",
                    id: `ctc_${"e".repeat(50)}`,
                    status: "completed",
                    call_id: callId,
                    name: "exec",
                    input,
                    internal_chat_message_metadata_passthrough: { turn_id: turnId },
                },
            },
        },
        {
            line: 0,
            value: {
                timestamp,
                type: "response_item",
                payload: {
                    type: "custom_tool_call_output",
                    id: "ctco_eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
                    call_id: callId,
                    output: exactExecOutput("effect\n"),
                    internal_chat_message_metadata_passthrough: { turn_id: turnId },
                },
            },
        },
    ];
}

function insertAfter(fixture, index, records) {
    const timestamp = fixture.records[index].value.timestamp;
    for (const record of records) record.value.timestamp = timestamp;
    fixture.records.splice(index + 1, 0, ...records);
    bindLines(fixture);
}

const base = buildFixture();
let positives = 0;
let rejections = 0;

const baseBefore = structuredClone(base.options);
const baseResult = validateCleanCoordinatorCustody(base.records, base.options);
assert.deepEqual(baseResult.failures, [], baseResult.failures.join("\n"));
assert.equal(baseResult.reports_hashed, 6);
assert.equal(baseResult.transactions.filter(({ kind }) => kind === "spawn").length, 6);
assert.deepEqual(base.options, baseBefore, "custody validation must not mutate caller-owned actor/config objects");
positives += 1;

const waits = buildFixture({ withWaits: true });
const waitResult = validateCleanCoordinatorCustody(waits.records, waits.options);
assert.deepEqual(waitResult.failures, [], waitResult.failures.join("\n"));
positives += 1;

const inferredBounds = cloneFixture(base);
delete inferredBounds.options.startLine;
delete inferredBounds.options.endLine;
inferredBounds.options.evidenceLine = inferredBounds.records.at(-1).line;
assert.deepEqual(validateCleanCoordinatorCustody(
    inferredBounds.records,
    inferredBounds.options,
).failures, []);
positives += 1;

const inertSurface = cloneFixture(base);
insertAfter(inertSurface, 1, [
    {
        line: 0,
        value: {
            timestamp: "",
            type: "response_item",
            payload: {
                type: "reasoning",
                id: `rs_${"a".repeat(50)}`,
                summary: [],
                encrypted_content: "opaque",
                internal_chat_message_metadata_passthrough: { turn_id: turnId },
            },
        },
    },
    {
        line: 0,
        value: {
            timestamp: "",
            type: "event_msg",
            payload: {
                type: "agent_message",
                message: "custody update",
                phase: "commentary",
                memory_citation: null,
            },
        },
    },
    {
        line: 0,
        value: {
            timestamp: "",
            type: "response_item",
            payload: {
                type: "message",
                id: `msg_${"b".repeat(50)}`,
                role: "assistant",
                content: [{ type: "output_text", text: "custody update" }],
                phase: "commentary",
                internal_chat_message_metadata_passthrough: { turn_id: turnId },
            },
        },
    },
    {
        line: 0,
        value: {
            timestamp: "",
            type: "event_msg",
            payload: {
                type: "token_count",
                info: {
                    total_token_usage: {
                        input_tokens: 1, cached_input_tokens: 0, cache_write_input_tokens: 0,
                        output_tokens: 1, reasoning_output_tokens: 0, total_tokens: 2,
                    },
                    last_token_usage: {
                        input_tokens: 1, cached_input_tokens: 0, cache_write_input_tokens: 0,
                        output_tokens: 1, reasoning_output_tokens: 0, total_tokens: 2,
                    },
                    model_context_window: 258400,
                },
                rate_limits: {
                    limit_id: "codex", limit_name: null,
                    primary: { used_percent: 1, window_minutes: 10080, resets_at: 1 },
                    secondary: null,
                    credits: { has_credits: false, unlimited: false, balance: "0" },
                    individual_limit: null, spend_control_reached: null,
                    plan_type: "pro", rate_limit_reached_type: null,
                },
            },
        },
    },
]);
assert.deepEqual(validateCleanCoordinatorCustody(
    inertSurface.records,
    inertSurface.options,
).failures, []);
positives += 1;

const activitySurface = cloneFixture(base);
{
    const pass = activitySurface.options.passes[0];
    const actor = pass.critics[0];
    const secondSpawnEnd = Math.max(...pass.critics.map((item) =>
        findCallIndex(activitySurface, item.spawn_call_id) + 2));
    const timestamp = activitySurface.records[secondSpawnEnd].value.timestamp;
    insertAfter(activitySurface, secondSpawnEnd, [{
        line: 0,
        value: {
            timestamp,
            type: "event_msg",
            payload: {
                type: "sub_agent_activity",
                event_id: `call_${"Y".repeat(24)}`,
                occurred_at_ms: Date.parse(timestamp),
                agent_thread_id: actor.session_id,
                agent_path: actor.agent_path,
                kind: "interacted",
            },
        },
    }]);
}
assert.deepEqual(validateCleanCoordinatorCustody(
    activitySurface.records,
    activitySurface.options,
).failures, []);
positives += 1;

const reject = (name, mutate, expected) => {
    const fixture = cloneFixture(base);
    mutate(fixture);
    const result = validateCleanCoordinatorCustody(fixture.records, fixture.options);
    assert.ok(result.failures.length > 0, `${name}: mutation was accepted`);
    if (expected) {
        assert.ok(result.failures.some((failure) => expected.test(failure)),
            `${name}: expected ${expected}; got ${result.failures.join(" | ")}`);
    }
    rejections += 1;
};

reject("missing quiescence", (fixture) => {
    replacePairWithWait(fixture, 0);
}, /quiescence|list_agents/);

reject("active unknown agent in quiescence", (fixture) => {
    const receipt = JSON.parse(fixture.records[1].value.payload.output);
    receipt.agents.push({ agent_name: "/root/stale", agent_status: "running" });
    fixture.records[1].value.payload.output = canonicalize(receipt);
}, /quiescence/);

reject("future campaign actor already exists at quiescence", (fixture) => {
    const receipt = JSON.parse(fixture.records[1].value.payload.output);
    receipt.agents.push({
        agent_name: fixture.options.passes[0].critics[0].agent_path,
        agent_status: { completed: "stale" },
    });
    fixture.records[1].value.payload.output = canonicalize(receipt);
}, /not fresh/);

reject("noncanonical actor session UUID", (fixture) => {
    fixture.options.passes[0].critics[0].session_id = "not-a-session-uuid";
}, /custody identity/);

reject("effect hidden in inert reasoning label", (fixture) => {
    const record = structuredClone(inertSurface.records[2]);
    record.value.payload.changes = { hidden: { type: "delete" } };
    insertAfter(fixture, 1, [record]);
}, /absence|unconsumed|exec/);

reject("stale interacted activity timestamp", (fixture) => {
    fixture.records = structuredClone(activitySurface.records);
    fixture.options = structuredClone(activitySurface.options);
    const activity = fixture.records.find(({ value }) =>
        value.payload?.type === "sub_agent_activity" && value.payload?.kind === "interacted");
    activity.value.payload.occurred_at_ms -= 1;
}, /activity/);

reject("duplicate interacted event ID", (fixture) => {
    fixture.records = structuredClone(activitySurface.records);
    fixture.options = structuredClone(activitySurface.options);
    const index = fixture.records.findIndex(({ value }) =>
        value.payload?.type === "sub_agent_activity" && value.payload?.kind === "interacted");
    insertAfter(fixture, index, [structuredClone(fixture.records[index])]);
}, /activity/);

reject("interposed stale create exec", (fixture) => {
    const absenceOutput = fixture.options.passes[0].absence_probe.output_line - 1;
    insertAfter(fixture, absenceOutput, freshCustomPair(
        fixture,
        fixture.records[absenceOutput].value.timestamp,
        "text(await tools.apply_patch('stale create'));",
    ));
}, /critic spawns|expected bound spawn|only the two bound/);

reject("interposed stale delete effect", (fixture) => {
    const absenceOutput = fixture.options.passes[0].absence_probe.output_line - 1;
    insertAfter(fixture, absenceOutput, [{
        line: 0,
        value: {
            timestamp: fixture.records[absenceOutput].value.timestamp,
            type: "event_msg",
            payload: {
                type: "patch_apply_end",
                call_id: "exec-eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
                turn_id: turnId,
                stdout: "deleted stale report\n",
                stderr: "",
                success: true,
                changes: { stale: { type: "delete", content: "" } },
                status: "completed",
            },
        },
    }]);
}, /critic spawns|only the two bound/);

reject("interposed arbitrary effect pair", (fixture) => {
    const actor = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, actor.spawn_call_id) + 2;
    insertAfter(fixture, index, freshCustomPair(fixture, fixture.records[index].value.timestamp));
}, /only the two bound critic spawns/);

reject("backdated call", (fixture) => {
    const actor = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, actor.spawn_call_id);
    fixture.records[index].value.timestamp = "2026-07-19T11:59:59.000Z";
}, /backdated/);

reject("malformed spawn started event", (fixture) => {
    const actor = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, actor.spawn_call_id);
    fixture.records[index + 1].value.payload.event_id = fixture.options.passes[0].critics[1].spawn_call_id;
}, /spawn started event|triplet/);

reject("malformed spawn joined output", (fixture) => {
    const actor = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, actor.spawn_call_id);
    fixture.records[index + 2].value.payload.call_id = fixture.options.passes[0].critics[1].spawn_call_id;
}, /spawn output|triplet|duplicate output/);

reject("observation before both critic spawns", (fixture) => {
    const first = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, first.spawn_call_id) + 2;
    const source = cloneFixture(waits);
    const waitIndex = source.records.findIndex(({ value }) => value.payload?.name === "wait_agent");
    const pair = structuredClone(source.records.slice(waitIndex, waitIndex + 2));
    pair[0].value.payload.call_id = `call_${"W".repeat(24)}`;
    pair[1].value.payload.call_id = pair[0].value.payload.call_id;
    pair[0].value.payload.id = `fc_${"d".repeat(50)}`;
    pair[1].value.payload.id = "fco_dddddddd-dddd-dddd-dddd-dddddddddddd";
    insertAfter(fixture, index, pair);
}, /only the two bound critic spawns/);

reject("persistence before both critic completions", (fixture) => {
    const pass = fixture.options.passes[0];
    const firstPersist = Math.min(...pass.critics.map((actor) => findCallIndex(fixture, actor.persist_call_id)));
    const listOutput = fixture.records[firstPersist - 1];
    const receipt = JSON.parse(listOutput.value.payload.output);
    for (const entry of receipt.agents) {
        if (pass.critics.some((actor) => actor.agent_path === entry.agent_name)) entry.agent_status = "running";
    }
    listOutput.value.payload.output = canonicalize(receipt);
}, /completion|only wait_agent/);

reject("missing report hash", (fixture) => {
    const actor = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, actor.hash_call_id);
    replacePairWithWait(fixture, index);
}, /hash|exec/);

reject("wrong report hash bytes", (fixture) => {
    const actor = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, actor.hash_call_id);
    const receipt = {
        schema: cleanReportHashSchema,
        pass: 1,
        tag: "A",
        path: actor.report_path,
        sha256: "f".repeat(64),
    };
    fixture.records[index + 1].value.payload.output = exactExecOutput(renderCleanReportHashReceipt(receipt));
}, /report-hash receipt/);

reject("missing mandatory hash call ID", (fixture) => {
    delete fixture.options.passes[0].critics[0].hash_call_id;
}, /custody identity/);

reject("wrong mandatory hash line binding", (fixture) => {
    fixture.options.passes[0].critics[0].hash_output_line += 1;
}, /line bindings|mandatory manifest line/);

reject("adjudicator spawn before critic hashes", (fixture) => {
    const pass = fixture.options.passes[0];
    const actor = pass.critics[1];
    const hashIndex = findCallIndex(fixture, actor.hash_call_id);
    const adjudicatorIndex = findCallIndex(fixture, pass.adjudicator.spawn_call_id);
    const adjudicatorTriplet = fixture.records.splice(adjudicatorIndex, 3);
    const timestamp = fixture.records[hashIndex - 1].value.timestamp;
    for (const record of adjudicatorTriplet) record.value.timestamp = timestamp;
    adjudicatorTriplet[1].value.payload.occurred_at_ms = Date.parse(timestamp);
    fixture.records.splice(hashIndex, 0, ...adjudicatorTriplet);
    bindLines(fixture);
}, /hash|exec/);

const equalPassBoundary = cloneFixture(base);
{
    const passOneAdj = equalPassBoundary.options.passes[0].adjudicator;
    const passTwo = equalPassBoundary.options.passes[1];
    const priorHash = equalPassBoundary.records[passOneAdj.hash_output_line - 1].value.timestamp;
    const callIndex = findCallIndex(equalPassBoundary, passTwo.absence_probe.call_id);
    equalPassBoundary.records[callIndex].value.timestamp = priorHash;
    assert.deepEqual(validateCleanCoordinatorCustody(
        equalPassBoundary.records,
        equalPassBoundary.options,
    ).failures, [], "equal provider milliseconds remain ordered by physical lines");
    positives += 1;
}

reject("pass 2 absence timestamp is backdated", (fixture) => {
    const passOneAdj = fixture.options.passes[0].adjudicator;
    const passTwo = fixture.options.passes[1];
    const priorHash = Date.parse(fixture.records[passOneAdj.hash_output_line - 1].value.timestamp);
    const callIndex = findCallIndex(fixture, passTwo.absence_probe.call_id);
    fixture.records[callIndex].value.timestamp = new Date(priorHash - 1).toISOString();
}, /backdated|pass 2 absence/);

reject("wrong pass-2 absence command", (fixture) => {
    const passTwo = fixture.options.passes[1];
    const index = findCallIndex(fixture, passTwo.absence_probe.call_id);
    fixture.records[index].value.payload.input = canonicalCleanStartSource(
        "node docs/tranches/V/vnext/tools/probe-clean-report-absence.mjs --pass 1",
        workspaceRoot,
    );
}, /absence|exec/);

for (const forbidden of ["send_message", "followup_task", "interrupt_agent"]) {
    reject(`forbidden ${forbidden}`, (fixture) => {
        const pass = fixture.options.passes[0];
        const firstPersist = Math.min(...pass.critics.map((actor) => findCallIndex(fixture, actor.persist_call_id)));
        const call = fixture.records[firstPersist - 2];
        call.value.payload.name = forbidden;
        call.value.payload.arguments = canonicalize({ target: pass.critics[0].agent_path, message: "mutate" });
    }, /only wait_agent\/list_agents|completion/);
}

reject("extra spawn", (fixture) => {
    const actor = fixture.options.passes[0].critics[1];
    const index = findCallIndex(fixture, actor.spawn_call_id) + 2;
    const triplet = structuredClone(fixture.records.slice(index - 2, index + 1));
    const callId = `call_${"X".repeat(24)}`;
    triplet[0].value.payload.call_id = callId;
    triplet[0].value.payload.id = `fc_${"c".repeat(50)}`;
    triplet[0].value.payload.arguments = canonicalize({
        task_name: "extra_agent",
        fork_turns: "none",
        message: `gAAAA${"X".repeat(96)}`,
        model: "gpt-5.6-sol",
        reasoning_effort: "ultra",
    });
    triplet[1].value.payload.event_id = callId;
    triplet[1].value.payload.agent_path = "/root/extra_agent";
    triplet[1].value.payload.agent_thread_id = "extra-session";
    triplet[2].value.payload.call_id = callId;
    triplet[2].value.payload.id = "fco_cccccccc-cccc-cccc-cccc-cccccccccccc";
    triplet[2].value.payload.output = JSON.stringify({ task_name: "/root/extra_agent" });
    insertAfter(fixture, index, triplet);
}, /only wait_agent\/list_agents|completion/);

reject("unmatched patch event", (fixture) => {
    const actor = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, actor.hash_call_id) + 1;
    insertAfter(fixture, index, [{
        line: 0,
        value: {
            timestamp: fixture.records[index].value.timestamp,
            type: "event_msg",
            payload: { type: "patch_apply_end", success: true },
        },
    }]);
}, /persistence|spawn|unconsumed/);

reject("rollback event", (fixture) => {
    const actor = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, actor.hash_call_id) + 1;
    insertAfter(fixture, index, [{
        line: 0,
        value: {
            timestamp: fixture.records[index].value.timestamp,
            type: "event_msg",
            payload: { type: "rollback_end", success: true },
        },
    }]);
}, /persistence|spawn|unconsumed/);

reject("web call", (fixture) => {
    const pass = fixture.options.passes[0];
    const firstPersist = Math.min(...pass.critics.map((actor) => findCallIndex(fixture, actor.persist_call_id)));
    const call = fixture.records[firstPersist - 2];
    call.value.payload.type = "web_search_call";
    call.value.payload.name = "search_query";
}, /only wait_agent\/list_agents|completion/);

reject("malformed persistence triplet", (fixture) => {
    const actor = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, actor.persist_call_id);
    fixture.records[index + 1].value.payload.changes[actor.report_path].type = "update";
}, /persistence patch|Add File/);

reject("truncated hash exec receipt", (fixture) => {
    const actor = fixture.options.passes[0].critics[0];
    const index = findCallIndex(fixture, actor.hash_call_id);
    const parsed = JSON.parse(fixture.records[index + 1].value.payload.output[1].text);
    parsed.original_token_count = 2;
    fixture.records[index + 1].value.payload.output[1].text = JSON.stringify(parsed);
}, /truncation fields/);

reject("physical line gap", (fixture) => {
    fixture.records[10].line += 1;
}, /continuous physical|record is absent/);

let hashPositives = 0;
let hashRejections = 0;
const temporaryRoot = realpathSync(mkdtempSync(join(tmpdir(), "vnext-clean-report-hash-")));
try {
    mkdirSync(join(temporaryRoot, "reviews"));
    const path = cleanReportHashPath(temporaryRoot, 1, "A");
    const bytes = "canonical clean report\n";
    writeFileSync(path, bytes);
    const receipt = hashCleanReportFile({ corpusRoot: temporaryRoot, pass: 1, tag: "A" });
    assert.deepEqual(receipt, {
        schema: cleanReportHashSchema,
        pass: 1,
        tag: "A",
        path,
        sha256: digest(bytes),
    });
    assert.equal(renderCleanReportHashReceipt(receipt), `${canonicalize(receipt)}\n`);
    assert.deepEqual(parseCleanReportHashArgs(["--pass", "2", "--tag", "ADJ"]), {
        pass: 2,
        tag: "ADJ",
    });
    hashPositives += 1;

    for (const argv of [
        [],
        ["--pass", "3", "--tag", "A"],
        ["--tag", "A", "--pass", "1"],
        ["--pass", "1", "--tag", "C"],
        ["--pass", "1", "--tag", "A", "extra"],
    ]) {
        assert.throws(() => parseCleanReportHashArgs(argv), /usage/);
        hashRejections += 1;
    }
    assert.throws(() => renderCleanReportHashReceipt({ ...receipt, extra: true }), /malformed/);
    hashRejections += 1;

    rmSync(path);
    mkdirSync(path);
    assert.throws(() => hashCleanReportFile({ corpusRoot: temporaryRoot, pass: 1, tag: "A" }), /regular/);
    rmSync(path, { recursive: true });
    hashRejections += 1;

    const target = join(temporaryRoot, "target.md");
    writeFileSync(target, bytes);
    symlinkSync(target, path);
    assert.throws(() => hashCleanReportFile({ corpusRoot: temporaryRoot, pass: 1, tag: "A" }), /regular/);
    rmSync(path);
    hashRejections += 1;

    writeFileSync(path, "x".repeat(cleanReportByteLimit + 1));
    assert.throws(() => hashCleanReportFile({ corpusRoot: temporaryRoot, pass: 1, tag: "A" }), /exceeds/);
    rmSync(path);
    hashRejections += 1;

    writeFileSync(path, "x".repeat(cleanReportByteLimit));
    assert.equal(hashCleanReportFile({ corpusRoot: temporaryRoot, pass: 1, tag: "A" }).sha256,
        digest("x".repeat(cleanReportByteLimit)));
    hashPositives += 1;

    writeFileSync(path, "stable");
    assert.throws(() => hashCleanReportFile({
        corpusRoot: temporaryRoot,
        pass: 1,
        tag: "A",
        operations: {
            read(descriptor) {
                const observed = readFileSync(descriptor);
                writeFileSync(path, "mutate");
                return observed;
            },
        },
    }), /changed while it was being hashed/);
    hashRejections += 1;

    const aliasRoot = `${temporaryRoot}-alias`;
    symlinkSync(temporaryRoot, aliasRoot);
    assert.throws(() => hashCleanReportFile({ corpusRoot: aliasRoot, pass: 1, tag: "A" }), /canonical/);
    rmSync(aliasRoot);
    hashRejections += 1;

    const helperPath = resolve(dirname(fileURLToPath(import.meta.url)), "hash-clean-report.mjs");
    const misuse = spawnSync(process.execPath, [helperPath, "--pass", "0", "--tag", "A"], {
        encoding: "utf8",
    });
    assert.notEqual(misuse.status, 0);
    assert.equal(misuse.stdout, "");
    assert.match(misuse.stderr, /usage/);
    hashRejections += 1;
} finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
}

process.stdout.write(`${JSON.stringify({
    schema: "vnext-clean-coordinator-custody-selftest/1",
    positives,
    rejections,
    hash_helper: { positives: hashPositives, rejections: hashRejections },
})}\n`);
