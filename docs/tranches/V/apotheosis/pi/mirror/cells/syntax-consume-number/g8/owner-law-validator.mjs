import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const cellRoot = dirname(fileURLToPath(import.meta.url));
const featureId = "SYNTAX-CONSUME-NUMBER";
const generation = 8;
const seats = Object.freeze(["h", "b", "s", "d"]);
const skepticRoles = Object.freeze(["specification", "parse-that", "hostility", "performance", "gestalt"]);
const adjudicatorRoles = Object.freeze(["semantic", "parser-architecture", "performance-gestalt"]);
const axes = Object.freeze(["correctness", "idiom", "performance", "hostility", "kiss"]);
const shaPattern = /^[0-9a-f]{64}$/;

function fail(message) { throw new Error(message); }
function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function identity(bytes) { return { sha256: sha256(bytes), bytes: bytes.length }; }
function parseJson(bytes, label) { try { return JSON.parse(bytes.toString("utf8")); } catch (error) { fail(`${label} is not JSON: ${String(error)}`); } }
function object(value, label) { if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be an object`); return value; }
function exactKeys(value, keys, label) { object(value, label); const actual = Object.keys(value).sort(); const expected = [...keys].sort(); if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${label} keys mismatch: ${actual.join(",")}`); }
function nonempty(value, label) { if (typeof value !== "string" || value.length === 0) fail(`${label} must be nonempty`); }
function hash(value, label) { if (typeof value !== "string" || !shaPattern.test(value)) fail(`${label} must be lowercase SHA-256`); }
function expectReject(fn, label) { try { fn(); } catch { return; } fail(`negative control did not reject: ${label}`); }
function candidateClosure(candidates) { return sha256(Buffer.from([...candidates].sort((a, b) => a.seat.localeCompare(b.seat)).map((row) => `${row.seat}\0${row.author_id}\0${row.payload_closure_sha256}\0${row.source_sha256}\0${row.author_receipt_sha256}\0${row.public_green_sha256}\0${row.holdout_green_sha256}\0${row.benchmark_receipt_sha256}\n`).join(""))); }
function receiptClosure(rows) { return sha256(Buffer.from([...rows].sort((a, b) => a.role.localeCompare(b.role)).map((row) => `${row.role}\0${row.sha256}\0${row.bytes}\n`).join(""))); }
function pathClosure(rows) { return sha256(Buffer.from([...rows].sort((a, b) => a.path.localeCompare(b.path)).map((row) => `${row.path}\0${row.sha256}\0${row.bytes}\n`).join(""))); }
function evidenceClosure(rows) { return sha256(Buffer.from([...rows].sort((a, b) => a.id.localeCompare(b.id)).map((row) => `${row.id}\0${row.kind}\0${row.path}\0${row.sha256}\0${row.bytes}\n`).join(""))); }
function attemptClosure(row) { return sha256(Buffer.from(`${JSON.stringify(row)}\n`)); }
function resolveUnder(root, path, label) { const absolute = resolve(root, path); if (absolute !== root && !absolute.startsWith(`${root}${sep}`)) fail(`${label} escapes review root`); return absolute; }

function validateCandidateSet(value) {
    exactKeys(value, ["feature_id", "generation", "status", "pre_author_receipt_sha256", "formation_actor_ids", "candidates", "set_closure_sha256", "sealed_at"], "candidate set");
    if (value.feature_id !== featureId || value.generation !== generation || value.status !== "EXACT_FOUR_CANDIDATE_SET_CLOSED_FOR_REVIEW") fail("candidate set identity/status mismatch");
    hash(value.pre_author_receipt_sha256, "candidate set pre-author"); hash(value.set_closure_sha256, "candidate set closure");
    exactKeys(value.formation_actor_ids, ["boundary_reviewers", "root"], "formation actors");
    if (!Array.isArray(value.formation_actor_ids.boundary_reviewers) || value.formation_actor_ids.boundary_reviewers.length !== 2 || new Set(value.formation_actor_ids.boundary_reviewers).size !== 2) fail("boundary reviewer census mismatch");
    value.formation_actor_ids.boundary_reviewers.forEach((id) => nonempty(id, "boundary reviewer id")); nonempty(value.formation_actor_ids.root, "root id");
    if (value.formation_actor_ids.boundary_reviewers.includes(value.formation_actor_ids.root)) fail("root overlaps boundary reviewers");
    if (!Array.isArray(value.candidates) || value.candidates.length !== 4) fail("candidate set must contain exactly four seats");
    const observedSeats = new Set(); const actorIds = new Set([...value.formation_actor_ids.boundary_reviewers, value.formation_actor_ids.root]);
    for (const row of value.candidates) {
        exactKeys(row, ["seat", "author_id", "payload_closure_sha256", "source_sha256", "author_receipt_sha256", "public_green_sha256", "holdout_green_sha256", "benchmark_receipt_sha256"], `candidate ${row.seat}`);
        if (!seats.includes(row.seat) || observedSeats.has(row.seat)) fail("candidate seat duplication/mismatch"); observedSeats.add(row.seat);
        nonempty(row.author_id, `${row.seat} author`); if (actorIds.has(row.author_id)) fail(`${row.seat} author overlaps formation actor`); actorIds.add(row.author_id);
        for (const key of ["payload_closure_sha256", "source_sha256", "author_receipt_sha256", "public_green_sha256", "holdout_green_sha256", "benchmark_receipt_sha256"]) hash(row[key], `${row.seat}.${key}`);
    }
    if (candidateClosure(value.candidates) !== value.set_closure_sha256) fail("candidate set closure mismatch");
    if (!Number.isFinite(Date.parse(value.sealed_at))) fail("candidate set seal time invalid");
    return { actors: actorIds, bySeat: new Map(value.candidates.map((row) => [row.seat, row])) };
}

function validateSkeptic(receipt, candidateSet, candidateSetIdentity, context) {
    exactKeys(receipt, ["feature_id", "generation", "role", "reviewer", "candidate_set", "candidate_findings", "ranking", "confirmed_blockers", "credit"], `skeptic ${receipt.role}`);
    if (receipt.feature_id !== featureId || receipt.generation !== generation || !skepticRoles.includes(receipt.role) || receipt.credit !== "ZERO_SKEPTIC_RECEIPT_ONLY") fail("skeptic identity/role mismatch");
    exactKeys(receipt.reviewer, ["id", "served_model", "independent", "author", "boundary_reviewer", "root", "peer_skeptic_access", "adjudicator"], `${receipt.role} reviewer`);
    nonempty(receipt.reviewer.id, "skeptic reviewer id"); nonempty(receipt.reviewer.served_model, "skeptic served model");
    if (receipt.reviewer.independent !== true || receipt.reviewer.author !== false || receipt.reviewer.boundary_reviewer !== false || receipt.reviewer.root !== false || receipt.reviewer.peer_skeptic_access !== false || receipt.reviewer.adjudicator !== false) fail(`${receipt.role}: skeptic independence flags mismatch`);
    if (context.actorIds.has(receipt.reviewer.id) || context.skepticIds.has(receipt.reviewer.id)) fail(`${receipt.role}: skeptic identity overlap`); context.skepticIds.add(receipt.reviewer.id);
    exactKeys(receipt.candidate_set, ["path", "sha256", "bytes", "set_closure_sha256"], `${receipt.role} candidate set`);
    if (receipt.candidate_set.path !== "candidate-set.json" || receipt.candidate_set.sha256 !== candidateSetIdentity.sha256 || receipt.candidate_set.bytes !== candidateSetIdentity.bytes || receipt.candidate_set.set_closure_sha256 !== candidateSet.set_closure_sha256) fail(`${receipt.role}: candidate set identity mismatch`);
    exactKeys(receipt.candidate_findings, seats, `${receipt.role} findings`);
    if (!Array.isArray(receipt.ranking) || receipt.ranking.length !== 4 || new Set(receipt.ranking).size !== 4 || seats.some((seat) => !receipt.ranking.includes(seat))) fail(`${receipt.role}: full ranking mismatch`);
    if (!Array.isArray(receipt.confirmed_blockers)) fail(`${receipt.role}: blockers must be array`);
    for (const seat of seats) {
        const finding = receipt.candidate_findings[seat];
        exactKeys(finding, ["payload_closure_sha256", ...axes, "evidence"], `${receipt.role}/${seat}`);
        if (finding.payload_closure_sha256 !== context.bySeat.get(seat).payload_closure_sha256) fail(`${receipt.role}/${seat}: exact candidate hash mismatch`);
        for (const axis of axes) if (!["ACCEPT", "REJECT"].includes(finding[axis])) fail(`${receipt.role}/${seat}/${axis}: verdict missing`);
        if (!Array.isArray(finding.evidence) || finding.evidence.length === 0) fail(`${receipt.role}/${seat}: evidence absent`);
    }
    for (const blocker of receipt.confirmed_blockers) {
        exactKeys(blocker, ["candidate", "axis", "docket_id", "evidence"], `${receipt.role} blocker`);
        if (!seats.includes(blocker.candidate) || !axes.includes(blocker.axis)) fail(`${receipt.role}: blocker target invalid`);
        nonempty(blocker.docket_id, "blocker docket"); nonempty(blocker.evidence, "blocker evidence");
        if (receipt.candidate_findings[blocker.candidate][blocker.axis] !== "REJECT") fail(`${receipt.role}: blocker does not correspond to rejected axis`);
    }
    context.byRole.set(receipt.role, receipt);
}

function validateAdjudicator(receipt, candidateSet, candidateSetIdentity, skepticClosure, context) {
    exactKeys(receipt, ["feature_id", "generation", "role", "adjudicator", "candidate_set", "skeptic_receipts_closure_sha256", "nomination", "reasoning", "credit"], `adjudicator ${receipt.role}`);
    if (receipt.feature_id !== featureId || receipt.generation !== generation || !adjudicatorRoles.includes(receipt.role) || receipt.credit !== "ZERO_ADJUDICATION_RECEIPT_ONLY") fail("adjudicator identity/role mismatch");
    exactKeys(receipt.adjudicator, ["id", "served_model", "independent", "author", "boundary_reviewer", "root", "skeptic", "peer_adjudication_access_before_seal"], `${receipt.role} identity`);
    nonempty(receipt.adjudicator.id, "adjudicator id"); nonempty(receipt.adjudicator.served_model, "adjudicator model");
    if (receipt.adjudicator.independent !== true || receipt.adjudicator.author !== false || receipt.adjudicator.boundary_reviewer !== false || receipt.adjudicator.root !== false || receipt.adjudicator.skeptic !== false || receipt.adjudicator.peer_adjudication_access_before_seal !== false) fail(`${receipt.role}: adjudicator independence flags mismatch`);
    if (context.actorIds.has(receipt.adjudicator.id) || context.skepticIds.has(receipt.adjudicator.id) || context.adjudicatorIds.has(receipt.adjudicator.id)) fail(`${receipt.role}: adjudicator identity overlap`); context.adjudicatorIds.add(receipt.adjudicator.id);
    exactKeys(receipt.candidate_set, ["sha256", "bytes", "set_closure_sha256"], `${receipt.role} candidate set`);
    if (receipt.candidate_set.sha256 !== candidateSetIdentity.sha256 || receipt.candidate_set.bytes !== candidateSetIdentity.bytes || receipt.candidate_set.set_closure_sha256 !== candidateSet.set_closure_sha256 || receipt.skeptic_receipts_closure_sha256 !== skepticClosure) fail(`${receipt.role}: review input mismatch`);
    exactKeys(receipt.nomination, ["seat", "payload_closure_sha256", "already_reviewed", "unblocked", "unseen_composite"], `${receipt.role} nomination`);
    if (!seats.includes(receipt.nomination.seat) || receipt.nomination.payload_closure_sha256 !== context.bySeat.get(receipt.nomination.seat).payload_closure_sha256 || receipt.nomination.already_reviewed !== true || receipt.nomination.unblocked !== true || receipt.nomination.unseen_composite !== false) fail(`${receipt.role}: unseen/non-candidate nomination`);
    for (const skeptic of context.byRole.values()) {
        const finding = skeptic.candidate_findings[receipt.nomination.seat];
        if (axes.some((axis) => finding[axis] !== "ACCEPT") || skeptic.confirmed_blockers.some((blocker) => blocker.candidate === receipt.nomination.seat)) fail(`${receipt.role}: nominated candidate has a confirmed/open skeptic defect`);
    }
    if (!Array.isArray(receipt.reasoning) || receipt.reasoning.length === 0) fail(`${receipt.role}: reasoning absent`);
    return receipt.nomination;
}

function validateBundle(candidateSetBytes, skepticRows, adjudicatorRows) {
    const candidateSet = parseJson(candidateSetBytes, "candidate set"); const candidateSetIdentity = identity(candidateSetBytes); const base = validateCandidateSet(candidateSet);
    if (skepticRows.length !== 5 || adjudicatorRows.length !== 3) fail("owner-law seat counts must be exactly five plus three");
    const context = { ...base, actorIds: base.actors, skepticIds: new Set(), adjudicatorIds: new Set(), byRole: new Map() };
    for (const row of skepticRows) validateSkeptic(row.value, candidateSet, candidateSetIdentity, context);
    if (context.byRole.size !== 5 || skepticRoles.some((role) => !context.byRole.has(role))) fail("skeptic specialty census incomplete");
    const skepticClosure = receiptClosure(skepticRows.map((row) => ({ role: row.value.role, ...identity(row.bytes) })));
    const nominations = adjudicatorRows.map((row) => validateAdjudicator(row.value, candidateSet, candidateSetIdentity, skepticClosure, context));
    const roles = new Set(adjudicatorRows.map((row) => row.value.role));
    if (roles.size !== 3 || adjudicatorRoles.some((role) => !roles.has(role))) fail("adjudicator role census incomplete");
    const exactHashes = new Set(nominations.map((row) => row.payload_closure_sha256)); const nominatedSeats = new Set(nominations.map((row) => row.seat));
    if (exactHashes.size !== 1 || nominatedSeats.size !== 1) fail("three adjudicators are not unanimous on one exact candidate");
    return { status: "UNANIMOUS_EXACT_HASH_SELECTED_ZERO_ACCEPTANCE_CREDIT", candidate_set_sha256: candidateSetIdentity.sha256, candidate_set_closure_sha256: candidateSet.set_closure_sha256, skeptic_receipts_closure_sha256: skepticClosure, selected_seat: nominations[0].seat, selected_payload_closure_sha256: nominations[0].payload_closure_sha256, skeptic_count: 5, adjudicator_count: 3, unseen_composite: false };
}

function requiredReviewEvidence() {
    const required = new Map([
        ["pre-author", "pre-author"], ["candidate-set", "candidate-set"], ["benchmark-evidence-root", "benchmark-evidence-root"], ["benchmark-attempt-ledger", "benchmark-attempt-ledger"], ["attempt-1.raw", "benchmark-raw"], ["attempt-2.raw", "benchmark-raw"],
    ]);
    for (const seat of seats) for (const [suffix, kind] of Object.entries({ delivery: "seat-delivery", payload: "payload-manifest", source: "candidate-source", author: "author-receipt", public: "public-correctness", holdout: "holdout-correctness", benchmark: "benchmark-receipt" })) required.set(`${seat}.${suffix}`, kind);
    return required;
}

function validateLedger(bytes, evidenceRootRow, rawRows) {
    const text = bytes.toString("utf8"); if (!text.endsWith("\n")) fail("benchmark attempt ledger lacks final LF");
    const rows = text.trimEnd().split("\n").map((line) => parseJson(Buffer.from(line), "benchmark attempt row"));
    if (rows.length < 2) fail("owner law requires two retained attempts");
    let previous = "0".repeat(64);
    for (const [index, row] of rows.entries()) {
        exactKeys(row, ["ordinal", "feature_id", "generation", "attempt_id", "evidence_root_sha256", "runner_sha256", "schedule_sha256", "previous_ledger_closure_sha256", "raw_result", "status", "recorded_at", "ledger_closure_sha256"], `attempt row ${index + 1}`);
        if (row.ordinal !== index + 1 || row.feature_id !== featureId || row.generation !== generation || row.evidence_root_sha256 !== evidenceRootRow.sha256 || row.previous_ledger_closure_sha256 !== previous) fail("benchmark attempt history join mismatch");
        const raw = rawRows.get(row.attempt_id); if (!raw || raw.sha256 !== row.raw_result.sha256 || raw.bytes !== row.raw_result.bytes) fail("benchmark attempt raw identity unresolved");
        const { ledger_closure_sha256, ...core } = row; if (attemptClosure(core) !== ledger_closure_sha256) fail("benchmark attempt chain closure mismatch"); previous = ledger_closure_sha256;
    }
    return { rows, terminal: previous };
}

function assertAdmissionDeliveryJoin(seat, preAuthorRow, preAuthor, deliveryRow, delivery, author) {
    const commonLaw = delivery.common_rows.find((row) => row.path === "common-law.json");
    if (preAuthor.seat_manifests?.[seat] !== deliveryRow.sha256 || delivery.formation_sha256 !== preAuthor.formation_sha256) fail(`${seat}: pre-author/delivery manifest join mismatch`);
    if (author.admission?.pre_author_receipt_sha256 !== preAuthorRow.sha256 || author.admission?.boundary_manifest_sha256 !== preAuthor.manifest_sha256 || author.admission?.formation_sha256 !== preAuthor.formation_sha256 || author.delivery?.seat_manifest_sha256 !== deliveryRow.sha256 || author.delivery?.seat_manifest_bytes !== deliveryRow.bytes || author.delivery?.delivered_input_closure_sha256 !== delivery.delivered_input_closure_sha256 || author.delivery?.delivered_input_row_count !== delivery.delivered_input_row_count || author.delivery?.common_law_sha256 !== commonLaw?.sha256 || author.delivery?.seat_packet_sha256 !== delivery.seat_packet.sha256) fail(`${seat}: author admission/delivery byte join mismatch`);
}

function validateReviewEvidenceRoot(rootPath) {
    const absolute = resolve(rootPath); const root = dirname(absolute); const rootBytes = readFileSync(absolute); const value = parseJson(rootBytes, "review evidence root");
    exactKeys(value, ["feature_id", "generation", "status", "rows", "closure_sha256"], "review evidence root");
    if (value.feature_id !== featureId || value.generation !== generation || value.status !== "EXACT_REVIEW_EVIDENCE_ROOT" || !Array.isArray(value.rows) || value.rows.length !== 34) fail("review evidence root identity/count mismatch");
    const required = requiredReviewEvidence(); const byId = new Map();
    for (const row of value.rows) {
        exactKeys(row, ["id", "kind", "path", "sha256", "bytes"], `review evidence ${row.id}`); nonempty(row.id, "review evidence id"); nonempty(row.path, "review evidence path"); hash(row.sha256, "review evidence hash");
        if (!Number.isInteger(row.bytes) || row.bytes < 1 || byId.has(row.id) || required.get(row.id) !== row.kind) fail(`review evidence row mismatch ${row.id}`);
        const bytes = readFileSync(resolveUnder(root, row.path, row.id)); const actual = identity(bytes); if (actual.sha256 !== row.sha256 || actual.bytes !== row.bytes) fail(`${row.id}: review evidence bytes drift`); byId.set(row.id, { ...row, bytesBuffer: bytes });
    }
    if (byId.size !== required.size || [...required.keys()].some((id) => !byId.has(id)) || evidenceClosure(value.rows) !== value.closure_sha256) fail("review evidence closure/census mismatch");
    const preAuthor = parseJson(byId.get("pre-author").bytesBuffer, "pre-author receipt"); if (preAuthor.feature_id !== featureId || preAuthor.generation !== generation || preAuthor.status !== "AUTHORS_MAY_BE_INVITED_ZERO_CREDIT") fail("pre-author receipt not resolved/admitted");
    const candidateSetRow = byId.get("candidate-set"); const candidateSet = parseJson(candidateSetRow.bytesBuffer, "candidate set"); const validated = validateCandidateSet(candidateSet);
    if (candidateSet.pre_author_receipt_sha256 !== byId.get("pre-author").sha256) fail("candidate set does not bind resolved pre-author receipt");

    const benchmarkRootRow = byId.get("benchmark-evidence-root");
    const benchmarkResult = parseJson(Buffer.from(execFileSync(process.execPath, [join(cellRoot, "benchmark-validator.mjs"), "--validate-evidence-root", resolveUnder(root, benchmarkRootRow.path, "benchmark evidence root")], { encoding: "utf8" })), "benchmark validation output");
    if (benchmarkResult.status !== "PASS" || benchmarkResult.evidence_root_sha256 !== benchmarkRootRow.sha256 || benchmarkResult.rows !== 40) fail("benchmark evidence root did not execute/close");
    const benchmarkRoot = parseJson(benchmarkRootRow.bytesBuffer, "benchmark evidence root"); const benchmarkById = new Map(benchmarkRoot.rows.map((row) => [row.id, row]));
    const rawRows = new Map([["attempt-1", byId.get("attempt-1.raw")], ["attempt-2", byId.get("attempt-2.raw")]]);
    const ledgerRow = byId.get("benchmark-attempt-ledger"); const ledger = validateLedger(ledgerRow.bytesBuffer, benchmarkRootRow, rawRows);

    for (const seat of seats) {
        const candidate = validated.bySeat.get(seat); const deliveryRow = byId.get(`${seat}.delivery`); const payloadRow = byId.get(`${seat}.payload`); const sourceRow = byId.get(`${seat}.source`); const authorRow = byId.get(`${seat}.author`); const publicRow = byId.get(`${seat}.public`); const holdoutRow = byId.get(`${seat}.holdout`); const benchmarkRow = byId.get(`${seat}.benchmark`);
        const delivery = parseJson(deliveryRow.bytesBuffer, `${seat} delivery`); exactKeys(delivery, ["feature_id", "generation", "seat", "formation_sha256", "common_rows", "seat_packet", "seat_source_rows", "delivered_input_row_count", "delivered_input_closure_sha256", "exclusions"], `${seat} delivery`);
        const delivered = [...delivery.common_rows, delivery.seat_packet, ...delivery.seat_source_rows]; if (delivery.seat !== seat || pathClosure(delivered) !== delivery.delivered_input_closure_sha256 || delivered.some((row) => seats.some((peer) => peer !== seat && row.path === `seat-packets/${peer}.json`))) fail(`${seat}: delivered-input closure/peer isolation mismatch`);
        const payload = parseJson(payloadRow.bytesBuffer, `${seat} payload`); exactKeys(payload, ["feature_id", "generation", "seat", "rows", "closure_sha256", "detached_author_receipt_excluded"], `${seat} payload`);
        if (payload.seat !== seat || payload.detached_author_receipt_excluded !== true || !Array.isArray(payload.rows) || payload.rows.some((row) => row.path === "author-receipt.json") || pathClosure(payload.rows) !== payload.closure_sha256) fail(`${seat}: payload closure mismatch`);
        const payloadSource = payload.rows.find((row) => row.path === "overlay/grammar/css/l4/value-unit/consume-number.ts"); if (!payloadSource || payloadSource.sha256 !== sourceRow.sha256 || payloadSource.bytes !== sourceRow.bytes) fail(`${seat}: source is not resolved by payload closure`);
        const topology = parseJson(Buffer.from(execFileSync(process.execPath, [join(cellRoot, "formation-validator.mjs"), "--assay-stdin"], { input: sourceRow.bytesBuffer, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] })), `${seat} topology assay output`);
        if (topology.sha256 !== sourceRow.sha256 || topology.direct_initializer !== true) fail(`${seat}: exact candidate source did not pass operative direct AST gate`);
        const author = parseJson(authorRow.bytesBuffer, `${seat} author`); assertAdmissionDeliveryJoin(seat, byId.get("pre-author"), preAuthor, deliveryRow, delivery, author);
        if (author.feature_id !== featureId || author.generation !== generation || author.seat !== seat || author.author_id !== candidate.author_id || author.candidate?.payload_closure_sha256 !== payload.closure_sha256 || author.candidate?.source_sha256 !== sourceRow.sha256 || author.candidate?.source_bytes !== sourceRow.bytes || author.candidate?.detached_receipt_excluded !== true) fail(`${seat}: author/payload/source join mismatch`);
        for (const [label, row, expectedStatus] of [["public", publicRow, "PUBLIC_SEMANTIC_PASS"], ["holdout", holdoutRow, "REVEALED_HOLDOUT_SEMANTIC_PASS"]]) {
            const receipt = parseJson(row.bytesBuffer, `${seat} ${label} correctness`); if (receipt.feature_id !== featureId || receipt.generation !== generation || receipt.seat !== seat || receipt.status !== expectedStatus || receipt.payload_closure_sha256 !== payload.closure_sha256 || receipt.source_sha256 !== sourceRow.sha256) fail(`${seat}: ${label} correctness identity mismatch`);
        }
        const bench = parseJson(benchmarkRow.bytesBuffer, `${seat} benchmark receipt`);
        if (bench.feature_id !== featureId || bench.generation !== generation || bench.seat !== seat || bench.status !== "CORRECTNESS_QUALIFIED_TWO_ATTEMPT_EVIDENCE" || bench.payload_closure_sha256 !== payload.closure_sha256 || bench.evidence_root_sha256 !== benchmarkRootRow.sha256 || bench.attempt_ledger_sha256 !== ledgerRow.sha256 || bench.attempt_ledger_bytes !== ledgerRow.bytes || bench.terminal_ledger_closure_sha256 !== ledger.terminal || JSON.stringify(bench.attempt_ids) !== JSON.stringify(ledger.rows.map((row) => row.attempt_id)) || JSON.stringify(bench.raw_result_sha256s) !== JSON.stringify(ledger.rows.map((row) => row.raw_result.sha256))) fail(`${seat}: benchmark receipt/evidence/attempt join mismatch`);
        if (candidate.payload_closure_sha256 !== payload.closure_sha256 || candidate.source_sha256 !== sourceRow.sha256 || candidate.author_receipt_sha256 !== authorRow.sha256 || candidate.public_green_sha256 !== publicRow.sha256 || candidate.holdout_green_sha256 !== holdoutRow.sha256 || candidate.benchmark_receipt_sha256 !== benchmarkRow.sha256) fail(`${seat}: candidate set names unresolved identities`);
        for (const [benchmarkId, artifact] of [[`${seat}.source`, sourceRow], [`${seat}.author`, authorRow], [`${seat}.public-correctness`, publicRow], [`${seat}.holdout-correctness`, holdoutRow]]) if (benchmarkById.get(benchmarkId)?.sha256 !== artifact.sha256 || benchmarkById.get(benchmarkId)?.bytes !== artifact.bytes) fail(`${seat}: benchmark evidence root disagrees with review evidence ${benchmarkId}`);
    }
    return { root: value, rootIdentity: identity(rootBytes), candidateSet, candidateSetBytes: candidateSetRow.bytesBuffer, benchmark: { evidence_root_sha256: benchmarkRootRow.sha256, evidence_rows: benchmarkResult.rows, attempt_ledger_sha256: ledgerRow.sha256, attempts: ledger.rows.length, terminal_ledger_closure_sha256: ledger.terminal } };
}

function validateResolvedBundle(reviewRootPath, skepticRows, adjudicatorRows) {
    const resolved = validateReviewEvidenceRoot(reviewRootPath); const result = validateBundle(resolved.candidateSetBytes, skepticRows, adjudicatorRows);
    return { ...result, review_evidence_root_sha256: resolved.rootIdentity.sha256, review_evidence_root_closure_sha256: resolved.root.closure_sha256, benchmark_join: resolved.benchmark, all_candidate_claims_resolved_to_bytes: true };
}

function writeArtifact(root, path, value) {
    const absolute = join(root, path); mkdirSync(dirname(absolute), { recursive: true }); const content = Buffer.isBuffer(value) ? value : Buffer.from(`${typeof value === "string" ? value : JSON.stringify(value, null, 2)}\n`); writeFileSync(absolute, content); return { path, absolute, content, ...identity(content) };
}

function makeReviewReceipts(candidateSet, candidateSetBytes) {
    const candidateSetIdentity = identity(candidateSetBytes);
    const skepticRows = skepticRoles.map((role, index) => {
        const findings = Object.fromEntries(candidateSet.candidates.map((candidate) => [candidate.seat, { payload_closure_sha256: candidate.payload_closure_sha256, correctness: "ACCEPT", idiom: "ACCEPT", performance: "ACCEPT", hostility: "ACCEPT", kiss: "ACCEPT", evidence: [`${role} resolved and reviewed exact ${candidate.seat} evidence bytes on every common axis`] }]));
        const value = { feature_id: featureId, generation, role, reviewer: { id: `skeptic-${index + 1}`, served_model: "fixture-model", independent: true, author: false, boundary_reviewer: false, root: false, peer_skeptic_access: false, adjudicator: false }, candidate_set: { path: "candidate-set.json", ...candidateSetIdentity, set_closure_sha256: candidateSet.set_closure_sha256 }, candidate_findings: findings, ranking: ["d", "s", "b", "h"], confirmed_blockers: [], credit: "ZERO_SKEPTIC_RECEIPT_ONLY" };
        return { value, bytes: Buffer.from(`${JSON.stringify(value, null, 2)}\n`) };
    });
    const skepticClosure = receiptClosure(skepticRows.map((row) => ({ role: row.value.role, ...identity(row.bytes) })));
    const selected = candidateSet.candidates.find((candidate) => candidate.seat === "d");
    const adjudicatorRows = adjudicatorRoles.map((role, index) => {
        const value = { feature_id: featureId, generation, role, adjudicator: { id: `adjudicator-${index + 1}`, served_model: "fixture-model", independent: true, author: false, boundary_reviewer: false, root: false, skeptic: false, peer_adjudication_access_before_seal: false }, candidate_set: { ...candidateSetIdentity, set_closure_sha256: candidateSet.set_closure_sha256 }, skeptic_receipts_closure_sha256: skepticClosure, nomination: { seat: selected.seat, payload_closure_sha256: selected.payload_closure_sha256, already_reviewed: true, unblocked: true, unseen_composite: false }, reasoning: [`${role} independently selects exact reviewed d payload`], credit: "ZERO_ADJUDICATION_RECEIPT_ONLY" };
        return { value, bytes: Buffer.from(`${JSON.stringify(value, null, 2)}\n`) };
    });
    return { skepticRows, adjudicatorRows };
}

function benchmarkRequired() {
    const required = new Map([["pre-author", "pre-author"], ["feature-row", "feature"], ["public-corpus", "public-corpus"], ["revealed-holdout-corpus", "revealed-holdout-corpus"], ["normalized-observations", "normalized-observations"], ["runner", "runner"], ["schedule", "schedule"]]);
    for (const seat of seats) for (const [suffix, kind] of Object.entries({ source: "candidate-source", author: "author-receipt", build: "build-manifest", bundle: "bundle", "public-correctness": "public-correctness", "holdout-correctness": "holdout-correctness" })) required.set(`${seat}.${suffix}`, kind);
    for (const comparator of ["live-regex", "deposed", "c14"]) for (const [suffix, kind] of Object.entries({ build: "comparator-build", bundle: "comparator-bundle", correctness: "comparator-correctness" })) required.set(`${comparator}.${suffix}`, kind);
    return required;
}

function materializeResolvedFixture(temp, invalidSeat = null) {
    const root = join(temp, "review"); mkdirSync(root, { recursive: true }); const artifacts = new Map(); const h = (char) => char.repeat(64);
    const sourceArtifacts = new Map(); const deliveryArtifacts = new Map(); const payloadArtifacts = new Map();
    for (const [index, seat] of seats.entries()) {
        const validSource = [
            'import { regex } from "@mkbabb/parse-that/core";',
            'import type { ConsumeNumberParser } from "./contract.js";',
            'export const consumeNumber: ConsumeNumberParser = regex(/[+-]?(?:[0-9]*\\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/).map((raw) => ({ value: Number(raw), type: raw.includes(".") || raw.includes("e") || raw.includes("E") ? "number" : "integer", sign: raw.startsWith("+") ? "+" : raw.startsWith("-") ? "-" : null }));',
        ].join("\n");
        const invalidSource = 'import { regex } from "@mkbabb/parse-that/core";\nconst helper = regex(/[0-9]+/);\nexport const consumeNumber = helper;';
        const source = writeArtifact(root, `artifacts/${seat}/source.ts`, invalidSeat === seat ? invalidSource : validSource); sourceArtifacts.set(seat, source);
        const commonRows = [{ path: "common-law.json", sha256: h("a"), bytes: 10 }, { path: "contract.ts", sha256: h("b"), bytes: 11 }]; const seatPacket = { path: `seat-packets/${seat}.json`, sha256: ["1", "2", "3", "4"][index].repeat(64), bytes: 20 + index }; const seatSources = [{ path: `lineage/${seat}.input`, sha256: ["5", "6", "7", "8"][index].repeat(64), bytes: 30 + index }]; const delivered = [...commonRows, seatPacket, ...seatSources];
        const deliveryValue = { feature_id: featureId, generation, seat, formation_sha256: h("f"), common_rows: commonRows, seat_packet: seatPacket, seat_source_rows: seatSources, delivered_input_row_count: delivered.length, delivered_input_closure_sha256: pathClosure(delivered), exclusions: { peer_packets: true, peer_sources: true, peer_notes: true, candidate_sources: true, reviews: true, benchmark_results: true } };
        deliveryArtifacts.set(seat, writeArtifact(root, `artifacts/${seat}/delivery.json`, deliveryValue));
        const payloadRows = [{ path: "overlay/grammar/css/l4/value-unit/consume-number.ts", sha256: source.sha256, bytes: source.bytes }]; const payloadValue = { feature_id: featureId, generation, seat, rows: payloadRows, closure_sha256: pathClosure(payloadRows), detached_author_receipt_excluded: true };
        payloadArtifacts.set(seat, writeArtifact(root, `artifacts/${seat}/payload.json`, payloadValue));
    }
    const preAuthorValue = { feature_id: featureId, generation, status: "AUTHORS_MAY_BE_INVITED_ZERO_CREDIT", manifest_sha256: h("e"), formation_sha256: h("f"), closure_sha256: h("d"), holdout_receipt_sha256: h("c"), holdout_ciphertext_sha256: h("b"), review_a_sha256: h("a"), review_b_sha256: h("9"), root_sha256: h("8"), seat_manifests: Object.fromEntries(seats.map((seat) => [seat, deliveryArtifacts.get(seat).sha256])), credit: "ZERO_ADMISSION_ONLY" };
    const preAuthor = writeArtifact(root, "artifacts/pre-author.json", preAuthorValue); artifacts.set("pre-author", preAuthor);
    const authorArtifacts = new Map(); const publicArtifacts = new Map(); const holdoutArtifacts = new Map();
    for (const seat of seats) {
        const delivery = deliveryArtifacts.get(seat); const deliveryValue = parseJson(delivery.content, `${seat} delivery fixture`); const payload = payloadArtifacts.get(seat); const payloadValue = parseJson(payload.content, `${seat} payload fixture`); const source = sourceArtifacts.get(seat);
        const authorValue = { feature_id: featureId, generation, seat, author_id: `author-${seat}`, independent: true, delivery: { seat_manifest_sha256: delivery.sha256, seat_manifest_bytes: delivery.bytes, delivered_input_closure_sha256: deliveryValue.delivered_input_closure_sha256, delivered_input_row_count: deliveryValue.delivered_input_row_count, common_law_sha256: deliveryValue.common_rows[0].sha256, seat_packet_sha256: deliveryValue.seat_packet.sha256, peer_packets: false, peer_source: false, peer_notes: false, isolated_root: true }, admission: { boundary_manifest_sha256: preAuthorValue.manifest_sha256, pre_author_receipt_sha256: preAuthor.sha256, formation_sha256: preAuthorValue.formation_sha256 }, candidate: { payload_closure_sha256: payloadValue.closure_sha256, source_path: "overlay/grammar/css/l4/value-unit/consume-number.ts", source_sha256: source.sha256, source_bytes: source.bytes, detached_receipt_excluded: true }, construction: { parse_that_apis: ["regex", "map"], loc: 1, backtracking_shape: "fixture direct graph", material_intermediate_allocations: [], known_compromises: [] }, credit: "ZERO_AUTHOR_RECEIPT_ONLY" };
        authorArtifacts.set(seat, writeArtifact(root, `artifacts/${seat}/author.json`, authorValue));
        publicArtifacts.set(seat, writeArtifact(root, `artifacts/${seat}/public.json`, { feature_id: featureId, generation, seat, status: "PUBLIC_SEMANTIC_PASS", payload_closure_sha256: payloadValue.closure_sha256, source_sha256: source.sha256, observations_sha256: h("6") }));
        holdoutArtifacts.set(seat, writeArtifact(root, `artifacts/${seat}/holdout.json`, { feature_id: featureId, generation, seat, status: "REVEALED_HOLDOUT_SEMANTIC_PASS", payload_closure_sha256: payloadValue.closure_sha256, source_sha256: source.sha256, observations_sha256: h("7") }));
    }

    const benchmarkDir = join(root, "benchmark"); mkdirSync(benchmarkDir, { recursive: true }); const benchmarkRows = [];
    for (const [id, kind] of benchmarkRequired()) {
        let artifact;
        if (id === "pre-author") artifact = preAuthor;
        else if (/^[hbsd]\.source$/.test(id)) artifact = sourceArtifacts.get(id[0]);
        else if (/^[hbsd]\.author$/.test(id)) artifact = authorArtifacts.get(id[0]);
        else if (/^[hbsd]\.public-correctness$/.test(id)) artifact = publicArtifacts.get(id[0]);
        else if (/^[hbsd]\.holdout-correctness$/.test(id)) artifact = holdoutArtifacts.get(id[0]);
        if (artifact) {
            const copied = writeArtifact(benchmarkDir, `objects/${id}.exact`, artifact.content); benchmarkRows.push({ id, kind, path: `objects/${id}.exact`, sha256: copied.sha256, bytes: copied.bytes });
        } else {
            const made = writeArtifact(benchmarkDir, `objects/${id}.json`, { id, kind, exact: true }); benchmarkRows.push({ id, kind, path: `objects/${id}.json`, sha256: made.sha256, bytes: made.bytes });
        }
    }
    const benchmarkRootValue = { feature_id: featureId, generation, status: "EXACT_IMMUTABLE_EVIDENCE_ROOT", rows: benchmarkRows, closure_sha256: evidenceClosure(benchmarkRows) };
    const benchmarkRoot = writeArtifact(benchmarkDir, "evidence-root.json", benchmarkRootValue);
    const benchmarkById = new Map(benchmarkRows.map((row) => [row.id, row]));
    const makeRaw = (attemptId) => ({ feature_id: featureId, generation, attempt_id: attemptId, evidence_root_sha256: benchmarkRoot.sha256, runner_sha256: benchmarkById.get("runner").sha256, schedule_sha256: benchmarkById.get("schedule").sha256, subjects: Object.fromEntries([...seats, "live-regex", "deposed", "c14"].map((subject, index) => { const correctness = seats.includes(subject) ? benchmarkById.get(`${subject}.holdout-correctness`) : benchmarkById.get(`${subject}.correctness`); return [subject, { status: "MEASURED", correctness_receipt_sha256: correctness.sha256, samples_ms: [10 + index, 11 + index, 12 + index, 11.5 + index, 10.5 + index], exit_code: 0, failures: [] }]; })), status: "COMPLETE", recorded_at: attemptId === "attempt-1" ? "2026-07-22T00:00:01.000Z" : "2026-07-22T00:00:02.000Z" });
    const input1 = writeArtifact(root, "inputs/attempt-1.json", makeRaw("attempt-1")); const input2 = writeArtifact(root, "inputs/attempt-2.json", makeRaw("attempt-2")); const attemptRoot = join(root, "benchmark-run");
    execFileSync(process.execPath, [join(cellRoot, "benchmark-validator.mjs"), "--seal-attempt", benchmarkRoot.absolute, input1.absolute, attemptRoot]); execFileSync(process.execPath, [join(cellRoot, "benchmark-validator.mjs"), "--seal-attempt", benchmarkRoot.absolute, input2.absolute, attemptRoot]);
    const ledger = { path: "benchmark-run/attempts/ledger.jsonl", absolute: join(attemptRoot, "attempts/ledger.jsonl") }; ledger.content = readFileSync(ledger.absolute); Object.assign(ledger, identity(ledger.content)); const ledgerParsed = ledger.content.toString("utf8").trimEnd().split("\n").map((line) => JSON.parse(line));
    const raw1 = { path: "benchmark-run/attempts/attempt-1.raw.json", absolute: join(attemptRoot, "attempts/attempt-1.raw.json") }; raw1.content = readFileSync(raw1.absolute); Object.assign(raw1, identity(raw1.content)); const raw2 = { path: "benchmark-run/attempts/attempt-2.raw.json", absolute: join(attemptRoot, "attempts/attempt-2.raw.json") }; raw2.content = readFileSync(raw2.absolute); Object.assign(raw2, identity(raw2.content));
    const benchmarkArtifacts = new Map();
    for (const seat of seats) {
        const payload = parseJson(payloadArtifacts.get(seat).content, `${seat} payload`); benchmarkArtifacts.set(seat, writeArtifact(root, `artifacts/${seat}/benchmark.json`, { feature_id: featureId, generation, seat, status: "CORRECTNESS_QUALIFIED_TWO_ATTEMPT_EVIDENCE", payload_closure_sha256: payload.closure_sha256, evidence_root_sha256: benchmarkRoot.sha256, attempt_ledger_sha256: ledger.sha256, attempt_ledger_bytes: ledger.bytes, terminal_ledger_closure_sha256: ledgerParsed.at(-1).ledger_closure_sha256, attempt_ids: ledgerParsed.map((row) => row.attempt_id), raw_result_sha256s: ledgerParsed.map((row) => row.raw_result.sha256) }));
    }
    const candidates = seats.map((seat) => { const payload = parseJson(payloadArtifacts.get(seat).content, `${seat} payload`); return { seat, author_id: `author-${seat}`, payload_closure_sha256: payload.closure_sha256, source_sha256: sourceArtifacts.get(seat).sha256, author_receipt_sha256: authorArtifacts.get(seat).sha256, public_green_sha256: publicArtifacts.get(seat).sha256, holdout_green_sha256: holdoutArtifacts.get(seat).sha256, benchmark_receipt_sha256: benchmarkArtifacts.get(seat).sha256 }; });
    const candidateSetValue = { feature_id: featureId, generation, status: "EXACT_FOUR_CANDIDATE_SET_CLOSED_FOR_REVIEW", pre_author_receipt_sha256: preAuthor.sha256, formation_actor_ids: { boundary_reviewers: ["boundary-a", "boundary-b"], root: "formation-root" }, candidates, set_closure_sha256: candidateClosure(candidates), sealed_at: "2026-07-22T00:01:00.000Z" };
    const candidateSet = writeArtifact(root, "artifacts/candidate-set.json", candidateSetValue); artifacts.set("candidate-set", candidateSet);
    const reviewRows = [
        { id: "pre-author", kind: "pre-author", path: preAuthor.path, sha256: preAuthor.sha256, bytes: preAuthor.bytes }, { id: "candidate-set", kind: "candidate-set", path: candidateSet.path, sha256: candidateSet.sha256, bytes: candidateSet.bytes },
        { id: "benchmark-evidence-root", kind: "benchmark-evidence-root", path: relative(root, benchmarkRoot.absolute).split(sep).join("/"), sha256: benchmarkRoot.sha256, bytes: benchmarkRoot.bytes }, { id: "benchmark-attempt-ledger", kind: "benchmark-attempt-ledger", path: ledger.path, sha256: ledger.sha256, bytes: ledger.bytes }, { id: "attempt-1.raw", kind: "benchmark-raw", path: raw1.path, sha256: raw1.sha256, bytes: raw1.bytes }, { id: "attempt-2.raw", kind: "benchmark-raw", path: raw2.path, sha256: raw2.sha256, bytes: raw2.bytes },
    ];
    for (const seat of seats) for (const [suffix, kind, artifact] of [["delivery", "seat-delivery", deliveryArtifacts.get(seat)], ["payload", "payload-manifest", payloadArtifacts.get(seat)], ["source", "candidate-source", sourceArtifacts.get(seat)], ["author", "author-receipt", authorArtifacts.get(seat)], ["public", "public-correctness", publicArtifacts.get(seat)], ["holdout", "holdout-correctness", holdoutArtifacts.get(seat)], ["benchmark", "benchmark-receipt", benchmarkArtifacts.get(seat)]]) reviewRows.push({ id: `${seat}.${suffix}`, kind, path: artifact.path, sha256: artifact.sha256, bytes: artifact.bytes });
    const reviewRootValue = { feature_id: featureId, generation, status: "EXACT_REVIEW_EVIDENCE_ROOT", rows: reviewRows, closure_sha256: evidenceClosure(reviewRows) }; const reviewRoot = writeArtifact(root, "review-evidence-root.json", reviewRootValue);
    const reviewReceipts = makeReviewReceipts(candidateSetValue, candidateSet.content);
    return { root, reviewRoot, reviewRootValue, candidateSetValue, ...reviewReceipts, artifacts: { preAuthor, candidateSet, deliveryArtifacts, benchmarkArtifacts } };
}

function synthetic() {
    const h = (char) => char.repeat(64);
    const candidates = seats.map((seat, index) => ({ seat, author_id: `author-${seat}`, payload_closure_sha256: ["1", "2", "3", "4"][index].repeat(64), source_sha256: ["5", "6", "7", "8"][index].repeat(64), author_receipt_sha256: ["9", "a", "b", "c"][index].repeat(64), public_green_sha256: ["d", "e", "f", "0"][index].repeat(64), holdout_green_sha256: ["1", "2", "3", "4"][index].repeat(64), benchmark_receipt_sha256: ["5", "6", "7", "8"][index].repeat(64) }));
    const candidateSet = { feature_id: featureId, generation, status: "EXACT_FOUR_CANDIDATE_SET_CLOSED_FOR_REVIEW", pre_author_receipt_sha256: h("f"), formation_actor_ids: { boundary_reviewers: ["boundary-a", "boundary-b"], root: "formation-root" }, candidates, set_closure_sha256: candidateClosure(candidates), sealed_at: "2026-07-22T00:00:00.000Z" };
    const candidateSetBytes = Buffer.from(`${JSON.stringify(candidateSet, null, 2)}\n`); const candidateSetIdentity = identity(candidateSetBytes);
    const skepticRows = skepticRoles.map((role, index) => {
        const findings = Object.fromEntries(candidates.map((candidate) => [candidate.seat, { payload_closure_sha256: candidate.payload_closure_sha256, correctness: "ACCEPT", idiom: "ACCEPT", performance: "ACCEPT", hostility: "ACCEPT", kiss: "ACCEPT", evidence: [`${role} reviewed exact ${candidate.seat} bytes on every common axis`] }]));
        const value = { feature_id: featureId, generation, role, reviewer: { id: `skeptic-${index + 1}`, served_model: "fixture-model", independent: true, author: false, boundary_reviewer: false, root: false, peer_skeptic_access: false, adjudicator: false }, candidate_set: { path: "candidate-set.json", ...candidateSetIdentity, set_closure_sha256: candidateSet.set_closure_sha256 }, candidate_findings: findings, ranking: ["d", "s", "b", "h"], confirmed_blockers: [], credit: "ZERO_SKEPTIC_RECEIPT_ONLY" };
        return { value, bytes: Buffer.from(`${JSON.stringify(value, null, 2)}\n`) };
    });
    const skepticClosure = receiptClosure(skepticRows.map((row) => ({ role: row.value.role, ...identity(row.bytes) })));
    const adjudicatorRows = adjudicatorRoles.map((role, index) => {
        const selected = candidates[3];
        const value = { feature_id: featureId, generation, role, adjudicator: { id: `adjudicator-${index + 1}`, served_model: "fixture-model", independent: true, author: false, boundary_reviewer: false, root: false, skeptic: false, peer_adjudication_access_before_seal: false }, candidate_set: { ...candidateSetIdentity, set_closure_sha256: candidateSet.set_closure_sha256 }, skeptic_receipts_closure_sha256: skepticClosure, nomination: { seat: selected.seat, payload_closure_sha256: selected.payload_closure_sha256, already_reviewed: true, unblocked: true, unseen_composite: false }, reasoning: [`${role} independently selects exact reviewed d payload`], credit: "ZERO_ADJUDICATION_RECEIPT_ONLY" };
        return { value, bytes: Buffer.from(`${JSON.stringify(value, null, 2)}\n`) };
    });
    return { candidateSet, candidateSetBytes, skepticRows, adjudicatorRows };
}

function selfCheck() {
    const sample = synthetic(); const result = validateBundle(sample.candidateSetBytes, sample.skepticRows, sample.adjudicatorRows);
    const missing = sample.skepticRows.slice(1); expectReject(() => validateBundle(sample.candidateSetBytes, missing, sample.adjudicatorRows), "four skeptics");
    const duplicate = structuredClone(sample.skepticRows.map((row) => row.value)); duplicate[1].reviewer.id = duplicate[0].reviewer.id;
    expectReject(() => validateBundle(sample.candidateSetBytes, duplicate.map((value) => ({ value, bytes: Buffer.from(`${JSON.stringify(value)}\n`) })), sample.adjudicatorRows), "duplicate skeptic identity");
    const blocked = structuredClone(sample.skepticRows.map((row) => row.value)); blocked[0].candidate_findings.d.correctness = "REJECT"; blocked[0].confirmed_blockers.push({ candidate: "d", axis: "correctness", docket_id: "counterexample-1", evidence: "exact counterexample" });
    const blockedRows = blocked.map((value) => ({ value, bytes: Buffer.from(`${JSON.stringify(value)}\n`) }));
    const blockedClosure = receiptClosure(blockedRows.map((row) => ({ role: row.value.role, ...identity(row.bytes) })));
    const blockedAdj = structuredClone(sample.adjudicatorRows.map((row) => row.value)); for (const value of blockedAdj) value.skeptic_receipts_closure_sha256 = blockedClosure;
    expectReject(() => validateBundle(sample.candidateSetBytes, blockedRows, blockedAdj.map((value) => ({ value, bytes: Buffer.from(`${JSON.stringify(value)}\n`) }))), "selected candidate blocker");
    const dissent = structuredClone(sample.adjudicatorRows.map((row) => row.value)); dissent[2].nomination.seat = "s"; dissent[2].nomination.payload_closure_sha256 = sample.candidateSet.candidates[2].payload_closure_sha256;
    expectReject(() => validateBundle(sample.candidateSetBytes, sample.skepticRows, dissent.map((value) => ({ value, bytes: Buffer.from(`${JSON.stringify(value)}\n`) }))), "adjudicator dissent");
    const unseen = structuredClone(sample.adjudicatorRows.map((row) => row.value)); unseen[0].nomination.payload_closure_sha256 = "0".repeat(64);
    expectReject(() => validateBundle(sample.candidateSetBytes, sample.skepticRows, unseen.map((value) => ({ value, bytes: Buffer.from(`${JSON.stringify(value)}\n`) }))), "unseen composite");
    const temp = mkdtempSync(join(tmpdir(), "value-g8-owner-law-"));
    try {
        const resolvedFixture = materializeResolvedFixture(temp);
        const resolved = validateResolvedBundle(resolvedFixture.reviewRoot.absolute, resolvedFixture.skepticRows, resolvedFixture.adjudicatorRows);
        const sourcePath = join(resolvedFixture.root, "artifacts/h/source.ts"); const sourceBefore = readFileSync(sourcePath); writeFileSync(sourcePath, Buffer.from("drift\n")); expectReject(() => validateResolvedBundle(resolvedFixture.reviewRoot.absolute, resolvedFixture.skepticRows, resolvedFixture.adjudicatorRows), "resolved candidate source drift"); writeFileSync(sourcePath, sourceBefore);
        const reviewById = new Map(resolvedFixture.reviewRootValue.rows.map((row) => [row.id, row])); const preAuthorRow = reviewById.get("pre-author"); const deliveryRow = reviewById.get("h.delivery"); const preAuthor = parseJson(readFileSync(join(resolvedFixture.root, preAuthorRow.path)), "fixture pre-author"); const delivery = parseJson(readFileSync(join(resolvedFixture.root, deliveryRow.path)), "fixture delivery"); const author = parseJson(readFileSync(join(resolvedFixture.root, reviewById.get("h.author").path)), "fixture author");
        const swappedSeat = structuredClone(preAuthor); swappedSeat.seat_manifests.h = preAuthor.seat_manifests.b; expectReject(() => assertAdmissionDeliveryJoin("h", preAuthorRow, swappedSeat, deliveryRow, delivery, author), "pre-author seat-manifest swap");
        const foreignAdmission = structuredClone(author); foreignAdmission.admission.pre_author_receipt_sha256 = "0".repeat(64); expectReject(() => assertAdmissionDeliveryJoin("h", preAuthorRow, preAuthor, deliveryRow, delivery, foreignAdmission), "foreign author admission");
        const invalidFixture = materializeResolvedFixture(join(temp, "invalid-helper"), "h"); expectReject(() => validateResolvedBundle(invalidFixture.reviewRoot.absolute, invalidFixture.skepticRows, invalidFixture.adjudicatorRows), "fully content-addressed invalid helper source");
        return { status: "PASS", positive_claim_gate_control: result, positive_resolved_four_plus_five_plus_three: resolved, actual_cli_path: "--validate-resolved <review-evidence-root> <five skeptics> <three adjudicators>", resolved_evidence_rows: 34, exact_candidate_topology_assays: 4, negative_controls: 9, negative_resolved_source_drift: true, negative_pre_author_seat_manifest_swap: true, negative_foreign_author_admission: true, negative_fully_content_addressed_helper_source: true };
    } finally { rmSync(temp, { recursive: true, force: true }); }
}

const [command, ...args] = process.argv.slice(2);
try {
    let output;
    if (command === "--self-check" || command === "--negative-controls") output = selfCheck();
    else if (command === "--validate" || command === "--validate-resolved") {
        if (args.length !== 9) fail(`${command} requires review-evidence-root, five skeptic receipts, and three adjudicator receipts`);
        const skepticRows = args.slice(1, 6).map((path) => { const bytes = readFileSync(resolve(path)); return { bytes, value: parseJson(bytes, path) }; });
        const adjudicatorRows = args.slice(6, 9).map((path) => { const bytes = readFileSync(resolve(path)); return { bytes, value: parseJson(bytes, path) }; });
        output = validateResolvedBundle(args[0], skepticRows, adjudicatorRows);
    } else fail("usage: --self-check | --negative-controls | --validate-resolved <review-evidence-root> <five skeptics> <three adjudicators>");
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`); process.exitCode = 1;
}
