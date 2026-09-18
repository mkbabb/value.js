import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const cellRoot = dirname(fileURLToPath(import.meta.url));
const featureId = "SYNTAX-CONSUME-NUMBER";
const generation = 9;
const shaPattern = /^[0-9a-f]{64}$/;
const actors = Object.freeze({
    custodian: "/root/g9_holdout_custodian",
    review_a: "/root/g9_boundary_challenge_a",
    review_b: "/root/g9_boundary_challenge_b",
    root: "value-pi-root-g9",
});
const exactExternal = Object.freeze({
    "../g8/rejection.json": { sha256: "2b4c7d38a48a4d850f5dd9fde2e3ab821404675c5155ad103c601bccdc524b24", bytes: 4310 },
    "../g8/holdout-destruction.json": { sha256: "30862497e808cfc0795f73f80c98c8f2788e98e8b54d48f94369f19653d3dece", bytes: 5827 },
    "../g8/feature-row.json": { sha256: "558dabbd0c8b9a22346d04be0b8dc759321cfc3d9dd08bb193b7b4e90acb8958", bytes: 5329 },
    "../g8/contract.ts": { sha256: "7dec8367db6040150e8be4e31eb762e2c5927c1b86e7d54671277545ddf2f73d", bytes: 2725 },
    "../g8/harness.ts": { sha256: "5a5f9a440f0d2df0f1bdeced756b304224b33e8c794cecc4ef830bef74226864", bytes: 18556 },
    "../g5/fixtures/public-cases.json": { sha256: "65006f3ed05ac6db0554deb21e7cf6ef0f2096dc524a7924d9bd3e0857f90cf3", bytes: 5213 },
    "../g8/fixtures/g8-controls.json": { sha256: "3a9e47f7bff1e08f3ba2cd8d7c3aef6dd3fef06de77d049f6d38bea949d27d82", bytes: 888 },
    "../../../node_modules/@mkbabb/parse-that/dist/leaf.d.ts": { sha256: "ca3a8e2cb9257f9d56e95b247c4b58e46524ae68a84172ea217d3eb3c4a24869", bytes: 2014 },
    "../g5/authorities/css-syntax-3.Overview.bs": { sha256: "3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390", bytes: 144427 },
    "../g7/authorities/historical-utils.ts": { sha256: "73e6a9731c802be86ac0230f32062f1075d344f6143715786eb1d9b8fe0f28e4", bytes: 7656 },
    "/Users/mkbabb/Programming/bbnf-lang/grammar/css/l4/value-unit.bbnf": { sha256: "cb57f79050a6304d79e3a7d8c7b690c902f243880aab4c896a63899290dd727b", bytes: 3084 },
    "../../../../ADDENDA-07.md": { sha256: "78a5bdb753fec5efb61311db570930bc2af80757531054b9ee3c415e98ee26d5", bytes: 20954 },
    "../../../../MODULE-DAG.md": { sha256: "291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f", bytes: 4880 },
});
const localPrecursorPaths = Object.freeze([
    "admission-validator.mjs",
    "feature-contract.json",
    "protocol.json",
    "seat-packets/b.json",
    "seat-packets/d.json",
    "seat-packets/h.json",
    "seat-packets/s.json",
]);
const comparisonInputs = Object.freeze({
    "../g8/holdout-destruction.json": exactExternal["../g8/holdout-destruction.json"],
    "../g5/fixtures/public-cases.json": exactExternal["../g5/fixtures/public-cases.json"],
});

function fail(message) { throw new Error(message); }
function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function identity(bytes) { return { sha256: sha256(bytes), bytes: bytes.length }; }
function parseJson(bytes, label) { try { return JSON.parse(bytes.toString("utf8")); } catch (error) { fail(`${label} is not JSON: ${String(error)}`); } }
function object(value, label) { if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be an object`); return value; }
function exactKeys(value, keys, label) { object(value, label); const a = Object.keys(value).sort(); const e = [...keys].sort(); if (JSON.stringify(a) !== JSON.stringify(e)) fail(`${label} keys mismatch: ${a.join(",")}`); }
function nonempty(value, label) { if (typeof value !== "string" || value.length === 0) fail(`${label} must be nonempty`); }
function exactString(value, expected, label) { if (value !== expected) fail(`${label} mismatch`); }
function hash(value, label) { if (typeof value !== "string" || !shaPattern.test(value)) fail(`${label} must be a lowercase SHA-256`); }
function positive(value, label) { if (!Number.isInteger(value) || value < 1) fail(`${label} must be a positive integer`); }
function boolean(value, expected, label) { if (value !== expected) fail(`${label} must be ${expected}`); }
function idRow(value, label) { exactKeys(value, ["sha256", "bytes"], label); hash(value.sha256, `${label}.sha256`); positive(value.bytes, `${label}.bytes`); return value; }
function pathRow(value, label) { exactKeys(value, ["path", "sha256", "bytes"], label); nonempty(value.path, `${label}.path`); hash(value.sha256, `${label}.sha256`); positive(value.bytes, `${label}.bytes`); return value; }
function sameIdentity(actual, expected, label) { if (actual.sha256 !== expected.sha256 || actual.bytes !== expected.bytes) fail(`${label} identity mismatch`); }
function samePathIdentity(actual, expected, label) { if (actual.path !== expected.path) fail(`${label} path mismatch`); sameIdentity(actual, expected, label); }
function resolveLocal(path, label) { const absolute = resolve(cellRoot, path); if (absolute !== cellRoot && !absolute.startsWith(`${cellRoot}${sep}`)) fail(`${label} escapes G9 root`); return absolute; }
function readBoundLocal(row, label) { pathRow(row, label); const bytes = readFileSync(resolveLocal(row.path, label)); sameIdentity(identity(bytes), row, label); return bytes; }
function formationClosure(rows) { return sha256(Buffer.from([...rows].sort((a, b) => a.path.localeCompare(b.path)).map((row) => `${row.path}\0${row.sha256}\0${row.bytes}\n`).join(""))); }
function expectedRowPaths() { return [...Object.keys(exactExternal), ...localPrecursorPaths].sort(); }
function expectReject(fn, label) { try { fn(); } catch { return; } fail(`negative control did not reject: ${label}`); }

function resolveFormationRow(row) {
    pathRow(row, `formation row ${row?.path ?? "?"}`);
    if (!expectedRowPaths().includes(row.path)) fail(`unexpected formation row: ${row.path}`);
    const absolute = row.path.startsWith("/") ? row.path : resolve(cellRoot, row.path);
    const actual = identity(readFileSync(absolute));
    sameIdentity(actual, row, row.path);
    if (exactExternal[row.path] !== undefined) sameIdentity(row, exactExternal[row.path], `${row.path} frozen external`);
}

function validateFormation(path = join(cellRoot, "formation-receipt.json")) {
    const bytes = readFileSync(path);
    const receipt = parseJson(bytes, "formation receipt");
    exactKeys(receipt, ["receipt_id", "feature_id", "generation", "status", "rows", "row_count", "precursor_closure_sha256", "g8_terminal", "credit"], "formation receipt");
    exactString(receipt.receipt_id, "SYNTAX-CONSUME-NUMBER-G9-FORMATION", "formation receipt_id");
    exactString(receipt.feature_id, featureId, "formation feature_id");
    if (receipt.generation !== generation) fail("formation generation mismatch");
    exactString(receipt.status, "FROZEN_PRE_HOLDOUT_ZERO_CANDIDATES", "formation status");
    if (!Array.isArray(receipt.rows) || receipt.rows.length !== expectedRowPaths().length || receipt.row_count !== receipt.rows.length) fail("formation row count mismatch");
    const paths = receipt.rows.map((row) => row.path).sort();
    if (JSON.stringify(paths) !== JSON.stringify(expectedRowPaths())) fail("formation path closure mismatch");
    for (const row of receipt.rows) resolveFormationRow(row);
    hash(receipt.precursor_closure_sha256, "formation precursor closure");
    if (receipt.precursor_closure_sha256 !== formationClosure(receipt.rows)) fail("formation closure digest mismatch");
    exactKeys(receipt.g8_terminal, ["rejection", "destruction", "plaintext_revealed", "secret_recoverable", "reusable"], "g8 terminal");
    samePathIdentity(receipt.g8_terminal.rejection, { path: "../g8/rejection.json", ...exactExternal["../g8/rejection.json"] }, "G8 rejection");
    samePathIdentity(receipt.g8_terminal.destruction, { path: "../g8/holdout-destruction.json", ...exactExternal["../g8/holdout-destruction.json"] }, "G8 destruction");
    boolean(receipt.g8_terminal.plaintext_revealed, false, "G8 plaintext revealed");
    boolean(receipt.g8_terminal.secret_recoverable, false, "G8 secret recoverable");
    boolean(receipt.g8_terminal.reusable, false, "G8 reusable");
    exactString(receipt.credit, "ZERO_FORMATION_ONLY", "formation credit");
    const g8r = parseJson(readFileSync(resolve(cellRoot, "../g8/rejection.json")), "G8 rejection");
    const g8d = parseJson(readFileSync(resolve(cellRoot, "../g8/holdout-destruction.json")), "G8 destruction");
    if (g8r.status !== "REJECTED_BEFORE_AUTHORS_ZERO_CREDIT" || g8d.secret_recoverable !== false || g8d.plaintext_revealed !== false) fail("G8 terminal semantics mismatch");
    const contract = parseJson(readFileSync(join(cellRoot, "feature-contract.json")), "feature contract");
    if (contract.feature_id !== featureId || contract.generation !== generation || contract.implementation_law?.forbidden?.length !== 7 || contract.candidate_law?.minimum_candidates !== 4) fail("feature contract invariant mismatch");
    for (const seat of ["h", "b", "s", "d"]) {
        const packet = parseJson(readFileSync(join(cellRoot, `seat-packets/${seat}.json`)), `seat ${seat}`);
        if (packet.feature_id !== featureId || packet.generation !== generation || packet.seat !== seat || !Array.isArray(packet.source_inputs) || packet.source_inputs.length < 1) fail(`seat ${seat} invariant mismatch`);
    }
    return { bytes, receipt };
}

function assertNoCandidates() {
    const forbidden = [];
    const roots = [join(cellRoot, "candidates"), resolve(cellRoot, "../../../apotheosis/grammar/css/l4")];
    const walk = (root) => {
        if (!existsSync(root)) return;
        for (const entry of readdirSync(root, { withFileTypes: true })) {
            const path = join(root, entry.name);
            if (entry.isDirectory()) walk(path);
            else if (entry.isFile() && path.endsWith(".ts")) forbidden.push(path);
        }
    };
    roots.forEach(walk);
    if (forbidden.length !== 0) fail(`pre-author candidate/active grammar TypeScript exists: ${forbidden.join(",")}`);
}

function assertFormationPhase() {
    const forbidden = ["holdout-receipt.json", "holdout-ciphertext.b64", "reviewed-subject.json", "root-gestalt.json", "admission-envelope.json", "reviews", "candidates"];
    const found = forbidden.filter((path) => existsSync(join(cellRoot, path)));
    if (found.length !== 0) fail(`formation phase contains later artifacts: ${found.join(",")}`);
    assertNoCandidates();
}

function validateActorRoster(value) {
    exactKeys(value, ["custodian", "review_a", "review_b", "root"], "actor roster");
    for (const [role, expected] of Object.entries(actors)) exactString(value[role], expected, `actor ${role}`);
    if (new Set(Object.values(value)).size !== 4) fail("formation actors must be distinct");
}

function validateHoldoutValue(value, ciphertextBytes, expectedFormation, expectedClosure, custodianId) {
    exactKeys(value, ["receipt_id", "feature_id", "generation", "status", "formation", "precursor_closure_sha256", "custodian", "freshness", "generator", "ciphertext", "commitments", "comparison_inputs", "custody", "reveal", "credit"], "holdout receipt");
    exactString(value.receipt_id, "SYNTAX-CONSUME-NUMBER-G9-HOLDOUT", "holdout receipt_id");
    exactString(value.feature_id, featureId, "holdout feature_id");
    if (value.generation !== generation) fail("holdout generation mismatch");
    exactString(value.status, "SEALED_UNREVEALED_PRE_AUTHOR", "holdout status");
    idRow(value.formation, "holdout formation"); sameIdentity(value.formation, expectedFormation, "holdout formation");
    exactString(value.precursor_closure_sha256, expectedClosure, "holdout closure");
    exactKeys(value.custodian, ["task_id", "served_model", "independent", "candidate_access", "reviewer", "root"], "holdout custodian");
    exactString(value.custodian.task_id, custodianId, "custodian task"); nonempty(value.custodian.served_model, "custodian model");
    boolean(value.custodian.independent, true, "custodian independent"); boolean(value.custodian.candidate_access, false, "custodian candidate access"); boolean(value.custodian.reviewer, false, "custodian reviewer"); boolean(value.custodian.root, false, "custodian root");
    exactKeys(value.freshness, ["generated_after_formation", "g8_material_reused", "loss_policy"], "holdout freshness");
    boolean(value.freshness.generated_after_formation, true, "generated after formation"); boolean(value.freshness.g8_material_reused, false, "G8 reused"); exactString(value.freshness.loss_policy, "TERMINAL_REJECTION", "custody loss policy");
    exactKeys(value.generator, ["sha256", "bytes", "method", "public_before_reveal"], "holdout generator"); hash(value.generator.sha256, "generator sha"); positive(value.generator.bytes, "generator bytes"); exactString(value.generator.method, "DETERMINISTIC_PRIVATE_GENERATOR", "generator method"); boolean(value.generator.public_before_reveal, false, "generator public");
    exactKeys(value.ciphertext, ["sha256", "bytes", "encoding", "envelope", "decoded_bytes"], "holdout ciphertext"); sameIdentity(value.ciphertext, identity(ciphertextBytes), "holdout ciphertext"); exactString(value.ciphertext.encoding, "base64", "ciphertext encoding"); exactString(value.ciphertext.envelope, "AES-256-GCM", "ciphertext envelope"); positive(value.ciphertext.decoded_bytes, "decoded ciphertext bytes");
    const text = ciphertextBytes.toString("utf8").trim();
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(text)) fail("ciphertext is not canonical base64 text");
    const decoded = Buffer.from(text, "base64");
    if (decoded.toString("base64") !== text || decoded.length !== value.ciphertext.decoded_bytes || decoded.length < 32) fail("ciphertext base64/decoded length mismatch");
    exactKeys(value.commitments, ["plaintext_sha256", "hidden_index_sha256", "case_count", "categories"], "holdout commitments");
    hash(value.commitments.plaintext_sha256, "plaintext commitment"); hash(value.commitments.hidden_index_sha256, "hidden-index commitment"); positive(value.commitments.case_count, "hidden case count");
    const categories = ["positive", "negative", "boundary", "offset", "diagnostics", "hostile", "binary64", "composition"];
    if (!Array.isArray(value.commitments.categories) || JSON.stringify([...value.commitments.categories].sort()) !== JSON.stringify([...categories].sort())) fail("hidden category closure mismatch");
    if (!Array.isArray(value.comparison_inputs) || value.comparison_inputs.length !== Object.keys(comparisonInputs).length) fail("holdout comparison input count mismatch");
    const byPath = new Map(value.comparison_inputs.map((row, index) => [pathRow(row, `comparison input ${index}`).path, row]));
    for (const [path, expected] of Object.entries(comparisonInputs)) {
        const row = byPath.get(path); if (row === undefined) fail(`missing comparison input ${path}`); sameIdentity(row, expected, path);
        const actual = identity(readFileSync(resolve(cellRoot, path))); sameIdentity(actual, row, `${path} resolved`);
    }
    exactKeys(value.custody, ["location", "recoverable_while_task_live", "workspace_plaintext_files", "workspace_key_files", "workspace_generator_files", "public_durability_claim"], "holdout custody");
    exactString(value.custody.location, "PRIVATE_CUSTODIAN_TOOL_STORE", "custody location"); boolean(value.custody.recoverable_while_task_live, true, "live recovery");
    for (const key of ["workspace_plaintext_files", "workspace_key_files", "workspace_generator_files"]) if (value.custody[key] !== 0) fail(`${key} must be zero`);
    exactString(value.custody.public_durability_claim, "NONE_FAIL_CLOSED", "durability claim");
    exactKeys(value.reveal, ["only_after_candidate_count", "reviewer_root_author_access_before_reveal", "destroy_after_terminal_use", "reuse"], "holdout reveal");
    if (value.reveal.only_after_candidate_count !== 4) fail("holdout reveal candidate count mismatch"); boolean(value.reveal.reviewer_root_author_access_before_reveal, false, "pre-reveal access"); boolean(value.reveal.destroy_after_terminal_use, true, "destroy after use"); boolean(value.reveal.reuse, false, "holdout reuse");
    exactString(value.credit, "ZERO_SEALED_HOLDOUT_ONLY", "holdout credit");
}

function validateSubjectValue(value, expectedFormation, expectedClosure, holdoutReceiptRow, holdoutCiphertextRow) {
    exactKeys(value, ["feature_id", "generation", "status", "formation", "precursor_closure_sha256", "holdout_receipt", "holdout_ciphertext", "actors", "credit"], "reviewed subject");
    exactString(value.feature_id, featureId, "subject feature_id"); if (value.generation !== generation) fail("subject generation mismatch"); exactString(value.status, "FROZEN_REVIEWED_SUBJECT_PRE_CHALLENGE", "subject status");
    pathRow(value.formation, "subject formation"); samePathIdentity(value.formation, { path: "formation-receipt.json", ...expectedFormation }, "subject formation");
    exactString(value.precursor_closure_sha256, expectedClosure, "subject closure");
    pathRow(value.holdout_receipt, "subject holdout receipt"); samePathIdentity(value.holdout_receipt, holdoutReceiptRow, "subject holdout receipt");
    pathRow(value.holdout_ciphertext, "subject holdout ciphertext"); samePathIdentity(value.holdout_ciphertext, holdoutCiphertextRow, "subject holdout ciphertext");
    validateActorRoster(value.actors); exactString(value.credit, "ZERO_REVIEW_SUBJECT_ONLY", "subject credit");
}

function readSubject(path) {
    const formation = validateFormation();
    const subjectBytes = readFileSync(path); const subject = parseJson(subjectBytes, "reviewed subject");
    const root = dirname(path); if (resolve(root) !== cellRoot) fail("reviewed subject must be in G9 root");
    const receiptBytes = readBoundLocal(subject.holdout_receipt, "subject holdout receipt");
    const ciphertextBytes = readBoundLocal(subject.holdout_ciphertext, "subject holdout ciphertext");
    validateSubjectValue(subject, identity(formation.bytes), formation.receipt.precursor_closure_sha256, subject.holdout_receipt, subject.holdout_ciphertext);
    const holdout = parseJson(receiptBytes, "holdout receipt");
    validateHoldoutValue(holdout, ciphertextBytes, identity(formation.bytes), formation.receipt.precursor_closure_sha256, actors.custodian);
    assertNoCandidates();
    return { subject, subjectBytes, formation, holdout };
}

function validateReviewValue(value, expectedId, expectedActor, expectedSubject) {
    exactKeys(value, ["feature_id", "generation", "review_id", "verdict", "reviewer", "subject", "axes", "evidence", "blockers", "credit"], `review ${expectedId}`);
    exactString(value.feature_id, featureId, "review feature_id"); if (value.generation !== generation) fail("review generation mismatch"); exactString(value.review_id, expectedId, "review id");
    if (!["ACCEPT", "REJECT"].includes(value.verdict)) fail("review verdict invalid");
    exactKeys(value.reviewer, ["task_id", "served_model", "independent", "candidate_author", "root", "custodian", "peer_review_access", "hidden_access"], "reviewer");
    exactString(value.reviewer.task_id, expectedActor, "reviewer task"); nonempty(value.reviewer.served_model, "reviewer model");
    for (const key of ["candidate_author", "root", "custodian", "peer_review_access", "hidden_access"]) boolean(value.reviewer[key], false, `reviewer ${key}`);
    boolean(value.reviewer.independent, true, "reviewer independent");
    pathRow(value.subject, "review subject"); samePathIdentity(value.subject, expectedSubject, "review subject");
    object(value.axes, "review axes"); if (Object.keys(value.axes).length < 12 || Object.values(value.axes).some((axis) => !["ACCEPT", "REJECT"].includes(axis))) fail("review axes incomplete");
    if (!Array.isArray(value.evidence) || value.evidence.length < 1 || value.evidence.some((item) => typeof item !== "string" || item.length === 0)) fail("review evidence incomplete");
    if (!Array.isArray(value.blockers) || value.blockers.some((item) => typeof item !== "string" || item.length === 0)) fail("review blockers malformed");
    if (value.verdict === "ACCEPT" && (value.blockers.length !== 0 || Object.values(value.axes).some((axis) => axis !== "ACCEPT"))) fail("ACCEPT review is blocked");
    if (value.verdict === "REJECT" && (value.blockers.length === 0 || Object.values(value.axes).every((axis) => axis === "ACCEPT"))) fail("REJECT review lacks a rejected axis/blocker");
    exactString(value.credit, "ZERO_BOUNDARY_CHALLENGE_ONLY", "review credit");
}

function validateRootValue(value, expectedSubject, reviewRows, reviewValues) {
    exactKeys(value, ["feature_id", "generation", "verdict", "root", "subject", "reviews", "union_blockers", "credit"], "root gestalt");
    exactString(value.feature_id, featureId, "root feature_id"); if (value.generation !== generation) fail("root generation mismatch"); if (!["ACCEPT", "REJECT"].includes(value.verdict)) fail("root verdict invalid");
    exactKeys(value.root, ["task_id", "served_model", "independent", "candidate_author", "challenge_reviewer", "custodian", "hidden_access"], "root actor");
    exactString(value.root.task_id, actors.root, "root task"); nonempty(value.root.served_model, "root model"); boolean(value.root.independent, true, "root independent");
    for (const key of ["candidate_author", "challenge_reviewer", "custodian", "hidden_access"]) boolean(value.root[key], false, `root ${key}`);
    pathRow(value.subject, "root subject"); samePathIdentity(value.subject, expectedSubject, "root subject");
    if (!Array.isArray(value.reviews) || value.reviews.length !== 2) fail("root must bind exactly two reviews");
    for (let index = 0; index < 2; index += 1) {
        exactKeys(value.reviews[index], ["review_id", "reviewer_task_id", "path", "sha256", "bytes", "verdict"], `root review ${index}`);
        const expectedId = index === 0 ? "A" : "B"; const expectedActor = index === 0 ? actors.review_a : actors.review_b;
        exactString(value.reviews[index].review_id, expectedId, "root review id"); exactString(value.reviews[index].reviewer_task_id, expectedActor, "root reviewer task");
        samePathIdentity(value.reviews[index], { review_id: expectedId, reviewer_task_id: expectedActor, ...reviewRows[index], verdict: reviewValues[index].verdict }, `root review ${expectedId}`);
        exactString(value.reviews[index].verdict, reviewValues[index].verdict, "root review verdict");
    }
    if (!Array.isArray(value.union_blockers) || value.union_blockers.some((item) => typeof item !== "string" || item.length === 0)) fail("root blockers malformed");
    const allAccept = reviewValues.every((review) => review.verdict === "ACCEPT");
    if (value.verdict === "ACCEPT" && (!allAccept || value.union_blockers.length !== 0)) fail("root ACCEPT lacks unanimous unblocked reviews");
    if (value.verdict === "REJECT" && value.union_blockers.length === 0) fail("root REJECT lacks union blockers");
    exactString(value.credit, "ZERO_ROOT_ADJUDICATION_ONLY", "root credit");
}

function validateAdmission(path) {
    const bytes = readFileSync(path); const value = parseJson(bytes, "admission envelope");
    exactKeys(value, ["feature_id", "generation", "status", "subject", "reviews", "root", "credit"], "admission envelope");
    exactString(value.feature_id, featureId, "admission feature_id"); if (value.generation !== generation) fail("admission generation mismatch"); exactString(value.status, "FINAL_PREAUTHOR_ENVELOPE", "admission status");
    pathRow(value.subject, "admission subject"); const subjectBytes = readBoundLocal(value.subject, "admission subject"); const subjectPath = resolveLocal(value.subject.path, "admission subject");
    const subjectResult = readSubject(subjectPath); sameIdentity(identity(subjectBytes), identity(subjectResult.subjectBytes), "admission subject replay");
    if (!Array.isArray(value.reviews) || value.reviews.length !== 2) fail("admission must bind exactly two reviews");
    const reviewValues = []; const reviewRows = [];
    for (let index = 0; index < 2; index += 1) {
        const expectedId = index === 0 ? "A" : "B"; const expectedActor = index === 0 ? actors.review_a : actors.review_b;
        const row = pathRow(value.reviews[index], `admission review ${expectedId}`); const reviewBytes = readBoundLocal(row, `admission review ${expectedId}`); const review = parseJson(reviewBytes, `review ${expectedId}`);
        validateReviewValue(review, expectedId, expectedActor, value.subject); reviewValues.push(review); reviewRows.push(row);
    }
    pathRow(value.root, "admission root"); const rootBytes = readBoundLocal(value.root, "admission root"); const rootValue = parseJson(rootBytes, "root gestalt");
    validateRootValue(rootValue, value.subject, reviewRows, reviewValues);
    if (reviewValues.some((review) => review.verdict !== "ACCEPT") || rootValue.verdict !== "ACCEPT" || rootValue.union_blockers.length !== 0) fail("admission is not unanimously accepted");
    const actorIds = [actors.custodian, actors.review_a, actors.review_b, actors.root]; if (new Set(actorIds).size !== actorIds.length) fail("admission actor collision");
    assertNoCandidates(); exactString(value.credit, "ZERO_PREAUTHOR_ADMISSION_ONLY", "admission credit");
    return { feature_id: featureId, generation, status: "AUTHORS_MAY_BEGIN_ZERO_CREDIT", envelope: identity(bytes), subject: identity(subjectBytes), reviews: reviewRows.map(({ sha256, bytes: length }) => ({ sha256, bytes: length })), root: identity(rootBytes), actors: { ...actors }, seat_packets: ["h", "b", "s", "d"] };
}

function negativeControls() {
    const h = (text) => sha256(Buffer.from(text)); const row = (path, n) => ({ path, sha256: h(`${path}-${n}`), bytes: n });
    const form = { sha256: h("formation"), bytes: 10 }; const holdReceipt = row("holdout-receipt.json", 11); const holdCipher = row("holdout-ciphertext.b64", 12);
    const subject = { feature_id: featureId, generation, status: "FROZEN_REVIEWED_SUBJECT_PRE_CHALLENGE", formation: { path: "formation-receipt.json", ...form }, precursor_closure_sha256: h("closure"), holdout_receipt: holdReceipt, holdout_ciphertext: holdCipher, actors: { ...actors }, credit: "ZERO_REVIEW_SUBJECT_ONLY" };
    validateSubjectValue(subject, form, subject.precursor_closure_sha256, holdReceipt, holdCipher);
    expectReject(() => validateSubjectValue({ ...subject, review_a: row("a", 1) }, form, subject.precursor_closure_sha256, holdReceipt, holdCipher), "subject contains future review hash");
    expectReject(() => validateSubjectValue({ ...subject, formation: row("formation-receipt.json", 99) }, form, subject.precursor_closure_sha256, holdReceipt, holdCipher), "foreign formation");
    const subjectRow = row("reviewed-subject.json", 13);
    const review = (id, task) => ({ feature_id: featureId, generation, review_id: id, verdict: "ACCEPT", reviewer: { task_id: task, served_model: "fixture", independent: true, candidate_author: false, root: false, custodian: false, peer_review_access: false, hidden_access: false }, subject: subjectRow, axes: Object.fromEntries(Array.from({ length: 12 }, (_, index) => [`axis_${index}`, "ACCEPT"])), evidence: ["fixture"], blockers: [], credit: "ZERO_BOUNDARY_CHALLENGE_ONLY" });
    const a = review("A", actors.review_a); const b = review("B", actors.review_b); validateReviewValue(a, "A", actors.review_a, subjectRow); validateReviewValue(b, "B", actors.review_b, subjectRow);
    expectReject(() => validateReviewValue({ ...a, subject: row("other.json", 14) }, "A", actors.review_a, subjectRow), "subject-swapped review");
    expectReject(() => validateReviewValue({ ...a, reviewer: { ...a.reviewer, task_id: actors.root } }, "A", actors.review_a, subjectRow), "review actor substitution");
    const reviewRows = [row("reviews/challenge-a.json", 20), row("reviews/challenge-b.json", 21)];
    const root = { feature_id: featureId, generation, verdict: "ACCEPT", root: { task_id: actors.root, served_model: "fixture", independent: true, candidate_author: false, challenge_reviewer: false, custodian: false, hidden_access: false }, subject: subjectRow, reviews: [{ review_id: "A", reviewer_task_id: actors.review_a, ...reviewRows[0], verdict: "ACCEPT" }, { review_id: "B", reviewer_task_id: actors.review_b, ...reviewRows[1], verdict: "ACCEPT" }], union_blockers: [], credit: "ZERO_ROOT_ADJUDICATION_ONLY" };
    validateRootValue(root, subjectRow, reviewRows, [a, b]);
    expectReject(() => validateRootValue({ ...root, reviews: [{ ...root.reviews[0], sha256: h("swapped") }, root.reviews[1]] }, subjectRow, reviewRows, [a, b]), "review-swapped root");
    expectReject(() => validateRootValue({ ...root, root: { ...root.root, task_id: actors.review_a } }, subjectRow, reviewRows, [a, b]), "root actor substitution");
    expectReject(() => validateReviewValue({ ...a, verdict: "ACCEPT", blockers: ["hidden"] }, "A", actors.review_a, subjectRow), "blocked ACCEPT review");
    return { status: "PASS", controls: 7, reviewed_subject_contains_future_hashes: false, actor_roster: { ...actors } };
}

const [command, ...args] = process.argv.slice(2);
try {
    let output;
    if (command === "--formation-check") { const formation = validateFormation(); assertFormationPhase(); output = { status: "PASS", phase: "FORMATION_PRE_HOLDOUT", formation: identity(formation.bytes), precursor_closure_sha256: formation.receipt.precursor_closure_sha256, rows: formation.receipt.row_count, candidates: 0, active_grammar_typescript: 0 }; }
    else if (command === "--precursor-check") { const formation = validateFormation(); assertNoCandidates(); output = { status: "PASS", phase: "IMMUTABLE_PRECURSOR", formation: identity(formation.bytes), precursor_closure_sha256: formation.receipt.precursor_closure_sha256, rows: formation.receipt.row_count, candidates: 0, active_grammar_typescript: 0 }; }
    else if (command === "--negative-controls") output = negativeControls();
    else if (command === "--subject") { if (args.length !== 1) fail("--subject requires one reviewed-subject path"); const result = readSubject(resolve(args[0])); output = { status: "PASS", phase: "FROZEN_REVIEWED_SUBJECT", subject: identity(result.subjectBytes), formation: identity(result.formation.bytes), holdout_case_count: result.holdout.commitments.case_count, actors: { ...actors }, candidates: 0 }; }
    else if (command === "--admit") { if (args.length !== 1) fail("--admit requires one admission-envelope path"); output = validateAdmission(resolve(args[0])); }
    else fail("usage: --formation-check | --precursor-check | --negative-controls | --subject <path> | --admit <path>");
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
}
