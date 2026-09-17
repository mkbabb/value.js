#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const valueV1 = resolve(root, "coordination/pt-e-bbnf-handoff-v1.yaml");
const parseV1 = "/Users/mkbabb/Programming/parse-that/docs/tranches/B/pt-e-bbnf-handoff-v1.yaml";
const valueV2 = resolve(root, "coordination/pt-e-bbnf-live-coordination-v2.json");
const parseV2 = "/Users/mkbabb/Programming/parse-that/docs/tranches/B/pt-e-bbnf-live-coordination-v2.json";
const schemaPath = resolve(root, "coordination/pt-e-bbnf-live-coordination-v2.schema.json");
const requireCurrent = process.argv.slice(2).includes("--require-current");
const unknown = process.argv.slice(2).filter((value) => value !== "--require-current");
if (unknown.length) {
    process.stderr.write("usage: node validate-pt-coordination.mjs [--require-current]\n");
    process.exit(2);
}

const failures = [];
const observations = [];
const hash = (input) => createHash("sha256").update(input).digest("hex");
const fileHash = (path) => hash(readFileSync(path));
const fail = (message) => failures.push(message);
let stream;
let schema;
let previous = "genesis";
let snapshotCurrent = true;
let evidenceCurrent = true;

for (const path of [valueV1, parseV1, valueV2, parseV2, schemaPath]) {
    if (!existsSync(path)) fail(`missing coordination artifact: ${path}`);
}
if (failures.length) finish();

const frozenV1Hash = "f7d60b452300dacf3a8a382c37a2d82b5fd05e28c96ae42ea2a50e9e3a6a9b9c";
if (fileHash(valueV1) !== frozenV1Hash) fail("value V1 is no longer the frozen historical packet");
if (fileHash(parseV1) !== frozenV1Hash) fail("parse-that V1 is no longer the frozen historical packet");
if (!readFileSync(valueV1).equals(readFileSync(parseV1))) fail("V1 twins are not byte-identical");
if (!readFileSync(valueV2).equals(readFileSync(parseV2))) fail("V2 live streams are not byte-identical");

try {
    stream = parseJsonStrict(readFileSync(valueV2));
    schema = parseJsonStrict(readFileSync(schemaPath));
} catch (error) {
    fail(`strict JSON parse failed: ${error.message}`);
    finish();
}
failures.push(...validateJsonSchema(stream, schema));

const expectedDefects = [
    "PT-ARTIFACT-SKIP",
    "PT-COMBINATOR-RUNTIME-TYPE-DIVERGENCE",
    "PT-CORE-SCC-AND-BUNDLE",
    "PT-DISPATCH-DOMAIN-CONTRACT",
    "PT-EOF-DIAGNOSTIC",
    "PT-GLOBAL-DIAGNOSTICS",
    "PT-LOADER-IDENTITY",
    "PT-NESTED-RECOVERY-ROLLBACK",
    "PT-RAW-CROSS-SOURCE-MEMO",
    "PT-STATE-RESULT-DIVERGENCE",
];
const legacyBranches = ["unchanged-1.0.0-no-republish", "compatible-1.0.1"];
const publishedOnlyBranches = ["unchanged-1.0.0-no-republish"];
let latestSnapshot;
let openIntent;
let latestAcknowledgement;
const eventByHash = new Map();
for (const [index, event] of (stream.events ?? []).entries()) {
    const pointer = `/events/${index}`;
    if (event.sequence !== index + 1) fail(`${pointer}/sequence: expected ${index + 1}`);
    if (event.previous_event_sha256 !== previous) fail(`${pointer}/previous_event_sha256: broken chain`);
    const preimage = { ...event };
    delete preimage.event_sha256;
    const computed = hash(canonicalize(preimage));
    if (event.event_sha256 !== computed) fail(`${pointer}/event_sha256: found ${event.event_sha256}; computed ${computed}`);
    if (eventByHash.has(event.event_sha256)) fail(`${pointer}/event_sha256: duplicate event hash`);
    eventByHash.set(event.event_sha256, event);
    previous = event.event_sha256;

    const evidencePaths = (event.evidence ?? []).map(({ path }) => path);
    if (JSON.stringify(evidencePaths) !== JSON.stringify([...evidencePaths].sort())) fail(`${pointer}/evidence: paths must be sorted`);
    if (event.authority?.imports_active_novelty !== false || event.authority?.mutates_bbnf !== false) {
        fail(`${pointer}/authority: V-next may neither import active novelty nor mutate BBNF`);
    }
    if (event.kind === "snapshot") {
        latestSnapshot = event;
        if (event.wave_id !== "P00") fail(`${pointer}/wave_id: snapshot owner must be P00`);
        if (event.sequence !== 1 && event.previous_event_sha256 === "genesis") fail(`${pointer}: only the first event may use genesis`);
        if (canonicalize(event.defect_ids) !== canonicalize(expectedDefects)) fail(`${pointer}/defect_ids: expected the corrected ten IDs exactly`);
        const expectedBranches = event.css_union_freeze ? publishedOnlyBranches : legacyBranches;
        if (canonicalize(event.vnext_publication_branches) !== canonicalize(expectedBranches)) fail(`${pointer}/vnext_publication_branches: illegal branch for this snapshot epoch`);
        if (event.v1_historical_sha256 !== frozenV1Hash) fail(`${pointer}/v1_historical_sha256: historical V1 digest changed`);
    } else if (event.kind === "mutation_intent") {
        if (latestSnapshot?.css_union_freeze) fail(`${pointer}: published-only CSS-union epoch forbids a Value-owned mutation intent`);
        if (event.wave_id !== "P02") fail(`${pointer}/wave_id: mutation intent owner must be P02`);
        if (!latestSnapshot || event.snapshot_event_sha256 !== latestSnapshot.event_sha256) fail(`${pointer}: intent does not name the latest snapshot`);
        if (canonicalize(event.pins) !== canonicalize(latestSnapshot?.pins)) fail(`${pointer}/pins: intent must use the exact snapshot pins`);
        if (openIntent) fail(`${pointer}: an earlier mutation intent lacks an acknowledgement`);
        for (const candidate of event.candidates ?? []) {
            if (!expectedDefects.includes(candidate.defect_id)) fail(`${pointer}/candidates: unknown defect ${candidate.defect_id}`);
            if (Object.values(candidate.novelty ?? {}).some((value) => value !== false)) fail(`${pointer}/candidates: novelty is forbidden`);
        }
        openIntent = event;
    } else if (event.kind === "acknowledgement") {
        if (!openIntent || event.intent_event_sha256 !== openIntent.event_sha256) fail(`${pointer}: acknowledgement does not close the open intent`);
        if (canonicalize(event.pins) !== canonicalize(openIntent?.pins) || canonicalize(event.responder_pins) !== canonicalize(openIntent?.pins)) {
            fail(`${pointer}: acknowledgement, responder and intent pins must be byte-equal`);
        }
        const overlapLocks = event.overlap_locks ?? [];
        const overlapPaths = event.overlap_paths ?? [];
        if (event.disposition === "vnext-narrow-fix-cleared") {
            if (event.writer !== "vnext-p03" || event.ordering !== "vnext-first") fail(`${pointer}: cleared V-next fix requires writer=vnext-p03 and ordering=vnext-first`);
            if (overlapLocks.length || overlapPaths.length) fail(`${pointer}: a cleared V-next fix cannot retain overlapping locks or paths`);
        } else if (event.disposition === "no-change-observed") {
            if (event.writer !== "none" || event.ordering !== "no-mutation" || overlapLocks.length || overlapPaths.length) fail(`${pointer}: no-change acknowledgement must have no writer, ordering or overlap`);
        } else if (event.disposition === "major-session-owned") {
            if (event.writer !== "active-pt-major" || event.ordering !== "major-first") fail(`${pointer}: major-owned acknowledgement requires the active major writer/order`);
        } else if (event.disposition === "repin-required") {
            if (event.writer !== "none" || event.ordering !== "repin") fail(`${pointer}: repin acknowledgement requires no writer and ordering=repin`);
        }
        latestAcknowledgement = event;
        openIntent = undefined;
    } else if (event.kind === "close") {
        if (event.wave_id !== "P07") fail(`${pointer}/wave_id: close owner must be P07`);
        if (!latestSnapshot || event.snapshot_event_sha256 !== latestSnapshot.event_sha256) fail(`${pointer}: close does not name the latest snapshot`);
        if (canonicalize(event.pins) !== canonicalize(latestSnapshot?.pins)) fail(`${pointer}/pins: close must use the exact snapshot pins`);
        if (openIntent) fail(`${pointer}: close cannot bypass an acknowledgement`);
        if (latestSnapshot?.css_union_freeze && event.accepted_branch !== "unchanged-1.0.0-no-republish") fail(`${pointer}: published-only CSS-union epoch accepts only unchanged 1.0.0`);
        if (event.accepted_branch === "candidate-1.0.1" && event.intent_and_ack?.applicability !== "applicable") {
            fail(`${pointer}: a 1.0.1 candidate requires exact intent and acknowledgement receipts`);
        }
        if (event.intent_and_ack?.applicability === "applicable") {
            const intent = eventByHash.get(event.intent_and_ack.intent_event_sha256);
            const acknowledgement = eventByHash.get(event.intent_and_ack.ack_event_sha256);
            if (!intent || intent.kind !== "mutation_intent") fail(`${pointer}/intent_and_ack: referenced intent does not exist`);
            if (!acknowledgement || acknowledgement.kind !== "acknowledgement") fail(`${pointer}/intent_and_ack: referenced acknowledgement does not exist`);
            if (acknowledgement?.intent_event_sha256 !== intent?.event_sha256) fail(`${pointer}/intent_and_ack: acknowledgement does not belong to intent`);
            if (latestAcknowledgement?.event_sha256 !== acknowledgement?.event_sha256) fail(`${pointer}/intent_and_ack: close must use the latest acknowledgement`);
            if (event.accepted_branch === "candidate-1.0.1" && acknowledgement?.disposition !== "vnext-narrow-fix-cleared") fail(`${pointer}: candidate branch lacks cleared acknowledgement`);
        } else if (event.accepted_branch === "candidate-1.0.1") {
            fail(`${pointer}: candidate branch cannot use a not-applicable intent/ack receipt`);
        }
    }
}
if (stream.events?.[0]?.kind !== "snapshot") fail("/events/0: stream must begin with a snapshot");
if (openIntent) observations.push("open mutation intent awaits acknowledgement");

for (const [name, pin] of Object.entries(latestSnapshot?.pins ?? {})) {
    try {
        const head = execFileSync("git", ["-C", pin.path, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
        const branch = execFileSync("git", ["-C", pin.path, "rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" }).trim();
        const status = execFileSync("git", ["-C", pin.path, "status", "--porcelain=v1", "-z"]);
        const dirtySha256 = hash(status);
        const dirtyCount = status.length === 0 ? 0 : status.toString("utf8").split("\0").filter(Boolean).length;
        const current = head === pin.head && branch === pin.branch && dirtyCount === pin.dirty_count && dirtySha256 === pin.dirty_sha256;
        if (!current) observations.push(`${name} pin drift: ${branch}@${head}, ${dirtyCount}/${dirtySha256}`);
        snapshotCurrent &&= current;
    } catch (error) {
        snapshotCurrent = false;
        observations.push(`${name} pin unavailable: ${error.message}`);
    }
}
for (const evidence of latestSnapshot?.evidence ?? []) {
    const current = existsSync(evidence.path) && fileHash(evidence.path) === evidence.sha256;
    evidenceCurrent &&= current;
    if (!current) observations.push(`historical evidence has advanced: ${evidence.path}`);
}
if (requireCurrent && (!snapshotCurrent || !evidenceCurrent)) fail("latest snapshot is stale; append a new snapshot rather than editing history");

finish();

function finish() {
    if (failures.length) {
        process.stderr.write(`${failures.join("\n")}\n`);
        process.exit(1);
    }
    process.stdout.write(`${JSON.stringify({
        format: stream?.format,
        events: stream?.events?.length,
        tip: previous,
        v1_historical_sha256: frozenV1Hash,
        v2_twins_sha256: existsSync(valueV2) ? fileHash(valueV2) : undefined,
        snapshot_current: snapshotCurrent,
        evidence_current: evidenceCurrent,
        observations,
    }, null, 2)}\n`);
    process.exit(0);
}
