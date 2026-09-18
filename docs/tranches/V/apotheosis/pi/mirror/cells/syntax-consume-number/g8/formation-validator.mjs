import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const cellRoot = dirname(fileURLToPath(import.meta.url));
const featureId = "SYNTAX-CONSUME-NUMBER";
const generation = 8;
const seats = Object.freeze(["h", "b", "s", "d"]);
const shaPattern = /^[0-9a-f]{64}$/;
const schemaIds = Object.freeze({
    "adjudicator-receipt.schema.json": "urn:value-js:syntax-consume-number:g8:adjudicator-receipt",
    "author-receipt.schema.json": "urn:value-js:syntax-consume-number:g8:author-receipt",
    "benchmark-attempt.schema.json": "urn:value-js:syntax-consume-number:g8:benchmark-attempt",
    "benchmark-evidence-root.schema.json": "urn:value-js:syntax-consume-number:g8:benchmark-evidence-root",
    "boundary-manifest.schema.json": "urn:value-js:syntax-consume-number:g8:boundary-manifest",
    "boundary-review.schema.json": "urn:value-js:syntax-consume-number:g8:boundary-review",
    "candidate-set.schema.json": "urn:value-js:syntax-consume-number:g8:candidate-set",
    "holdout-receipt.schema.json": "urn:value-js:syntax-consume-number:g8:holdout-receipt",
    "pre-author-receipt.schema.json": "urn:value-js:syntax-consume-number:g8:pre-author-receipt",
    "root-gestalt.schema.json": "urn:value-js:syntax-consume-number:g8:root-gestalt",
    "review-evidence-root.schema.json": "urn:value-js:syntax-consume-number:g8:review-evidence-root",
    "seat-delivery-manifest.schema.json": "urn:value-js:syntax-consume-number:g8:seat-delivery-manifest",
    "skeptic-receipt.schema.json": "urn:value-js:syntax-consume-number:g8:skeptic-receipt",
});
const externalAuthorities = Object.freeze({
    "../g7/reviews/challenge-a.json": { sha256: "5f1dcc96532b882fff0bcb40fd7af17cc694ada778b09a052cc6f6293420d6c8", bytes: 24077 },
    "../g7/reviews/challenge-b.json": { sha256: "b7fe735c15b4cea1e81ef80d5ea07900d12f1b36af016002eb90bf0aad0501d8", bytes: 13444 },
    "../g7/root-gestalt.json": { sha256: "986f3890522361536b25bb7c283e80323b924bce680eb85e7df8a444d67b2d82", bytes: 5406 },
    "../g7/rejection.json": { sha256: "26c964c3ac29bba9f9741aa89cc4208be793edfdd15ac4ddf68963c50f4d63f3", bytes: 3979 },
    "../g7/holdout-destruction.json": { sha256: "e946ce86e6342d8d5d362664282fa393608f4b93af87cee196d563f770e26a66", bytes: 5166 },
    "../g7/authorities/historical-utils.ts": { sha256: "73e6a9731c802be86ac0230f32062f1075d344f6143715786eb1d9b8fe0f28e4", bytes: 7656 },
    "../g5/authorities/css-syntax-3.Overview.bs": { sha256: "3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390", bytes: 144427 },
    "../g5/fixtures/public-cases.json": { sha256: "65006f3ed05ac6db0554deb21e7cf6ef0f2096dc524a7924d9bd3e0857f90cf3", bytes: 5213 },
    "../../../apotheosis/clean-base.json": { sha256: "dcece5fb104fbcbf1f87ec5d548307f38a0a18bf98bfdb9a771aef0bd7da37d2", bytes: 1177 },
    "../../../node_modules/@mkbabb/parse-that/dist/leaf.d.ts": { sha256: "ca3a8e2cb9257f9d56e95b247c4b58e46524ae68a84172ea217d3eb3c4a24869", bytes: 2014 },
    "/Users/mkbabb/Programming/bbnf-lang/grammar/css/l4/value-unit.bbnf": { sha256: "cb57f79050a6304d79e3a7d8c7b690c902f243880aab4c896a63899290dd727b", bytes: 3084 },
});

function fail(message) { throw new Error(message); }
function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function identity(bytes) { return { sha256: sha256(bytes), bytes: bytes.length }; }
function parseJson(bytes, label) { try { return JSON.parse(bytes.toString("utf8")); } catch (error) { fail(`${label} is not JSON: ${String(error)}`); } }
function object(value, label) { if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be an object`); return value; }
function exactKeys(value, keys, label) { object(value, label); const actual = Object.keys(value).sort(); const expected = [...keys].sort(); if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${label} keys mismatch: ${actual.join(",")}`); }
function nonempty(value, label) { if (typeof value !== "string" || value.length === 0) fail(`${label} must be nonempty`); }
function hash(value, label) { if (typeof value !== "string" || !shaPattern.test(value)) fail(`${label} must be lowercase SHA-256`); }
function positive(value, label) { if (!Number.isInteger(value) || value < 1) fail(`${label} must be a positive integer`); }
function pathRow(value, label) { exactKeys(value, ["path", "sha256", "bytes"], label); nonempty(value.path, `${label}.path`); hash(value.sha256, `${label}.sha256`); positive(value.bytes, `${label}.bytes`); return value; }
function identityRow(value, label) { exactKeys(value, ["sha256", "bytes"], label); hash(value.sha256, `${label}.sha256`); positive(value.bytes, `${label}.bytes`); return value; }
function sameIdentity(actual, expected, label) { if (actual.sha256 !== expected.sha256 || actual.bytes !== expected.bytes) fail(`${label} identity mismatch`); }
function closureRows(rows, kind = "row") { return sha256(Buffer.from([...rows].sort((a, b) => a.path.localeCompare(b.path)).map((row) => `${kind}\0${row.path}\0${row.sha256}\0${row.bytes}\n`).join(""))); }
function payloadClosure(rows) { return sha256(Buffer.from([...rows].sort((a, b) => a.path.localeCompare(b.path)).map((row) => `${row.path}\0${row.sha256}\0${row.bytes}\n`).join(""))); }
function resolveUnder(root, path, label) { const absolute = resolve(root, path); if (absolute !== root && !absolute.startsWith(`${root}${sep}`)) fail(`${label} escapes root`); return absolute; }
function readIdentity(path) { return identity(readFileSync(path)); }
function expectReject(fn, label) { try { fn(); } catch { return; } fail(`negative control did not reject: ${label}`); }

function verifySchemas() {
    for (const [path, id] of Object.entries(schemaIds)) {
        const schema = parseJson(readFileSync(join(cellRoot, path)), path);
        if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema" || schema.$id !== id || schema.type !== "object" || schema.additionalProperties !== false) fail(`${path} exact schema identity mismatch`);
    }
}

function verifyAuthorities() {
    const rows = [];
    for (const [path, expected] of Object.entries(externalAuthorities)) {
        const actual = readIdentity(resolve(cellRoot, path));
        sameIdentity(actual, expected, path);
        rows.push({ path, ...actual });
    }
    const hText = readFileSync(resolve(cellRoot, "../g7/authorities/historical-utils.ts"), "utf8");
    const hLine = `${hText.split(/\r?\n/)[95]}\n`;
    sameIdentity(identity(Buffer.from(hLine)), { sha256: "545226e90f05ae9beb0759a9b7ebf831bfb92eb0d36dcc212d9fad73e1f29169", bytes: 92 }, "historical H exact line");
    const spec = readFileSync(resolve(cellRoot, "../g5/authorities/css-syntax-3.Overview.bs"), "utf8").split(/\r?\n/).slice(1609, 1679).join("\n") + "\n";
    sameIdentity(identity(Buffer.from(spec)), { sha256: "3058a6b5287a950a425d26cb414f1276d4d0dfd268ef56f74a0dfe6ed150a0a3", bytes: 2303 }, "pinned consume-number occurrence");
    const clean = parseJson(readFileSync(resolve(cellRoot, "../../../apotheosis/clean-base.json")), "clean base");
    if (!Array.isArray(clean.typescript_sources) || clean.typescript_sources.length !== 0 || clean.status !== "ACTIVE_EMPTY_DIRECT_COMBINATOR_BASE") fail("clean base is not the exact empty direct base");
    return rows;
}

function verifyG7Terminal() {
    const rejection = parseJson(readFileSync(resolve(cellRoot, "../g7/rejection.json")), "G7 rejection");
    const destruction = parseJson(readFileSync(resolve(cellRoot, "../g7/holdout-destruction.json")), "G7 destruction");
    if (rejection.status !== "REJECTED_BEFORE_AUTHORS_ZERO_CREDIT" || rejection.challenges?.[0]?.sha256 !== externalAuthorities["../g7/reviews/challenge-a.json"].sha256 || rejection.challenges?.[1]?.sha256 !== externalAuthorities["../g7/reviews/challenge-b.json"].sha256 || rejection.root_gestalt?.sha256 !== externalAuthorities["../g7/root-gestalt.json"].sha256) fail("G7 terminal rejection binding mismatch");
    if (destruction.status !== "TERMINALLY_REJECTED_BEFORE_AUTHORS_UNREVEALED_SECRET_AND_GENERATOR_DESTROYED" || destruction.secret_destruction?.verification?.recoverable_secret_material_from_known_custody_locations !== false || destruction.generation_state?.candidate_files !== 0 || destruction.generation_state?.production_mutations !== 0) fail("G7 destruction is not terminal/no-candidate/no-production");
}

function verifySeatPackets() {
    const packets = [];
    for (const seat of seats) {
        const path = `seat-packets/${seat}.json`;
        const bytes = readFileSync(join(cellRoot, path));
        const packet = parseJson(bytes, path);
        if (packet.feature_id !== featureId || packet.generation !== generation || packet.seat !== seat || packet.quota !== "NONE" || packet.credit !== "ZERO_LINEAGE_PACKET_ONLY") fail(`${seat} seat packet identity/quota mismatch`);
        if (!Array.isArray(packet.source_inputs) || packet.source_inputs.length < 1) fail(`${seat} source inputs absent`);
        const serialized = JSON.stringify(packet);
        for (const peer of seats) if (peer !== seat && new RegExp(`seat-packets/${peer}|peer-${peer}|/${peer}/`).test(serialized)) fail(`${seat} packet exposes ${peer} material`);
        packets.push({ path, ...identity(bytes) });
    }
    return packets;
}

function validateBoundaryManifest(manifest) {
    exactKeys(manifest, ["feature_id", "generation", "formation", "precursor_closure_sha256", "holdout_receipt", "holdout_ciphertext", "review_a", "review_b", "root"], "boundary manifest");
    if (manifest.feature_id !== featureId || manifest.generation !== generation) fail("boundary manifest generation mismatch");
    hash(manifest.precursor_closure_sha256, "boundary closure");
    for (const key of ["formation", "holdout_receipt", "holdout_ciphertext", "review_a", "review_b", "root"]) pathRow(manifest[key], `boundary manifest.${key}`);
    return manifest;
}

function preAuthorStage(manifest, capturedRows) {
    validateBoundaryManifest(manifest);
    const captured = new Map(capturedRows.map((row) => [pathRow(row, `captured ${row.path}`).path, row]));
    for (const key of ["formation", "holdout_receipt", "holdout_ciphertext"]) {
        const row = manifest[key];
        const actual = captured.get(row.path);
        if (!actual) fail(`MISSING_${key.toUpperCase()}`);
        sameIdentity(actual, row, key);
    }
    for (const [key, stage] of [["review_a", "MISSING_REVIEW_A"], ["review_b", "MISSING_REVIEW_B"], ["root", "MISSING_ROOT"]]) {
        const row = manifest[key];
        const actual = captured.get(row.path);
        if (!actual) return stage;
        sameIdentity(actual, row, key);
    }
    return "READY_FOR_SEMANTIC_REVIEW_VALIDATION";
}

function verifyPreAuthorFixture() {
    const fixture = parseJson(readFileSync(join(cellRoot, "fixtures/pre-author-missing-review.json")), "pre-author fixture");
    const stage = preAuthorStage(fixture.manifest, fixture.captured_before_reviews);
    if (stage !== fixture.expected_stage || stage !== "MISSING_REVIEW_A") fail("real path-bearing fixture did not reach missing-review stage");
    const legacyTwoField = { sha256: fixture.manifest.holdout_receipt.sha256, bytes: fixture.manifest.holdout_receipt.bytes };
    expectReject(() => pathRow(legacyTwoField, "legacy two-field row"), "pathless manifest identity");
    return stage;
}

function verifyFourSeatFixture() {
    const fixture = parseJson(readFileSync(join(cellRoot, "fixtures/four-seat-satisfiable.json")), "four-seat fixture");
    if (!Array.isArray(fixture.seats) || fixture.seats.length !== 4) fail("four-seat fixture count mismatch");
    const observed = new Set();
    for (const item of fixture.seats) {
        if (!seats.includes(item.seat) || observed.has(item.seat)) fail("four-seat fixture seat mismatch");
        observed.add(item.seat);
        const delivery = item.delivered_input;
        exactKeys(delivery, ["common_rows", "seat_packet", "seat_source_rows", "closure_sha256"], `${item.seat} delivered input`);
        const common = delivery.common_rows.map((row) => pathRow(row, `${item.seat} common delivery row`));
        const packet = pathRow(delivery.seat_packet, `${item.seat} packet delivery row`);
        const sources = delivery.seat_source_rows.map((row) => pathRow(row, `${item.seat} source delivery row`));
        const deliveredRows = [...common, packet, ...sources];
        if (packet.path !== `seat-packets/${item.seat}.json` || deliveredRows.some((row) => seats.some((peer) => peer !== item.seat && row.path.includes(`/${peer}.`))) || payloadClosure(deliveredRows) !== delivery.closure_sha256) fail(`${item.seat}: seat-specific delivered-input closure mismatch`);
        if (!Array.isArray(item.payload_rows) || item.payload_rows.length !== 1) fail(`${item.seat}: payload rows mismatch`);
        const rows = item.payload_rows.map((row) => pathRow(row, `${item.seat} payload row`));
        if (rows.some((row) => row.path === "author-receipt.json")) fail(`${item.seat}: detached receipt entered payload closure`);
        const candidate = item.detached_author_receipt?.candidate;
        exactKeys(candidate, ["payload_closure_sha256", "source_path", "source_sha256", "source_bytes", "detached_receipt_excluded"], `${item.seat} detached candidate`);
        const source = rows.find((row) => row.path === candidate.source_path);
        if (!source || source.sha256 !== candidate.source_sha256 || source.bytes !== candidate.source_bytes || candidate.detached_receipt_excluded !== true || payloadClosure(rows) !== candidate.payload_closure_sha256) fail(`${item.seat}: satisfiable detached payload mismatch`);
    }
    return { seats: [...observed], detached_receipt_excluded: true, seat_specific_delivered_input_closures: true };
}

function validateHoldoutReceipt(receipt, ciphertextBytes, expected) {
    exactKeys(receipt, ["feature_id", "generation", "status", "custodian", "precursor", "generator", "plaintext_commitment", "ciphertext", "coverage", "comparison_inputs", "custody", "protocol", "public_verifiability", "absence_freshness", "credit"], "holdout receipt");
    if (receipt.feature_id !== featureId || receipt.generation !== generation || receipt.status !== "SEALED_PRE_AUTHOR_CIPHERTEXT_ONLY_ZERO_FEATURE_CREDIT" || receipt.credit !== "ZERO_SEALING_ONLY") fail("holdout identity/status mismatch");
    exactKeys(receipt.custodian, ["id", "served_model", "reasoning_effort", "independent", "candidate_source_access", "commands", "closed_at"], "holdout custodian");
    for (const key of ["id", "served_model", "reasoning_effort"]) nonempty(receipt.custodian[key], `custodian.${key}`);
    if (receipt.custodian.independent !== true || receipt.custodian.candidate_source_access !== false || !Array.isArray(receipt.custodian.commands) || receipt.custodian.commands.length === 0 || !Number.isFinite(Date.parse(receipt.custodian.closed_at))) fail("holdout custodian receipt incomplete");
    exactKeys(receipt.precursor, ["formation", "rows", "closure_sha256"], "holdout precursor"); identityRow(receipt.precursor.formation, "holdout formation"); positive(receipt.precursor.rows, "holdout rows"); hash(receipt.precursor.closure_sha256, "holdout closure");
    if (expected && (receipt.precursor.formation.sha256 !== expected.formation.sha256 || receipt.precursor.formation.bytes !== expected.formation.bytes || receipt.precursor.closure_sha256 !== expected.precursor_closure_sha256)) fail("holdout does not bind exact frozen precursor");
    exactKeys(receipt.generator, ["bytes", "method", "canonicalization", "hidden_index_commitment"], "holdout generator"); identityRow(receipt.generator.bytes, "generator bytes"); identityRow(receipt.generator.hidden_index_commitment, "hidden index"); nonempty(receipt.generator.method, "generator method"); nonempty(receipt.generator.canonicalization, "generator canonicalization");
    identityRow(receipt.plaintext_commitment, "holdout plaintext commitment");
    exactKeys(receipt.ciphertext, ["path", "sha256", "bytes", "encoding", "decoded_envelope_bytes", "algorithm", "magic_ascii_nul", "nonce_bytes", "tag_bytes", "aad_sha256"], "holdout ciphertext");
    if (receipt.ciphertext.path !== "holdout-ciphertext.b64" || receipt.ciphertext.encoding !== "base64-with-final-lf" || receipt.ciphertext.algorithm !== "AES-256-GCM" || receipt.ciphertext.magic_ascii_nul !== "VPI8CN1\0" || receipt.ciphertext.nonce_bytes !== 12 || receipt.ciphertext.tag_bytes !== 16) fail("holdout envelope metadata mismatch");
    for (const key of ["sha256", "aad_sha256"]) hash(receipt.ciphertext[key], `ciphertext.${key}`); positive(receipt.ciphertext.bytes, "ciphertext bytes"); positive(receipt.ciphertext.decoded_envelope_bytes, "decoded envelope bytes");
    if (ciphertextBytes) {
        const actual = identity(ciphertextBytes); if (actual.sha256 !== receipt.ciphertext.sha256 || actual.bytes !== receipt.ciphertext.bytes || ciphertextBytes.at(-1) !== 0x0a) fail("ciphertext exact bytes/canonical LF mismatch");
        const text = ciphertextBytes.toString("ascii").trimEnd(); if (!/^[A-Za-z0-9+/]+={0,2}$/.test(text) || Buffer.from(text, "base64").toString("base64") !== text) fail("ciphertext is not canonical one-line base64");
        const decoded = Buffer.from(text, "base64"); if (decoded.length !== receipt.ciphertext.decoded_envelope_bytes || decoded.subarray(0, 8).toString("binary") !== "VPI8CN1\0") fail("ciphertext envelope magic/length mismatch");
    }
    exactKeys(receipt.coverage, ["case_count", "unique_case_ids", "categories", "canonical_hidden_cases_sha256", "public_case_ids_sha256"], "holdout coverage");
    if (receipt.coverage.case_count !== receipt.coverage.unique_case_ids || !Array.isArray(receipt.coverage.categories) || new Set(receipt.coverage.categories).size !== 8 || ["positive", "negative", "boundary", "offset", "diagnostics", "hostile", "binary64", "composition"].some((category) => !receipt.coverage.categories.includes(category))) fail("holdout coverage census mismatch");
    hash(receipt.coverage.canonical_hidden_cases_sha256, "hidden cases hash"); hash(receipt.coverage.public_case_ids_sha256, "public IDs hash");
    if (!Array.isArray(receipt.comparison_inputs) || receipt.comparison_inputs.length < 2) fail("holdout comparison inputs absent"); receipt.comparison_inputs.forEach((row, index) => pathRow(row, `comparison input ${index}`));
    exactKeys(receipt.custody, ["secret_location", "key_recoverable_until", "plaintext_workspace_files", "key_workspace_files", "generator_workspace_files"], "holdout custody"); nonempty(receipt.custody.secret_location, "secret location");
    if (receipt.custody.key_recoverable_until !== "POST_AUTHOR_REVEAL_OR_TERMINAL_REJECTION" || receipt.custody.plaintext_workspace_files !== 0 || receipt.custody.key_workspace_files !== 0 || receipt.custody.generator_workspace_files !== 0) fail("holdout custody route mismatch");
    exactKeys(receipt.protocol, ["reveal_trigger", "reveal_verifier", "destruction_trigger", "destruction_receipt_required", "no_reuse"], "holdout protocol");
    if (receipt.protocol.reveal_trigger !== "AFTER_ALL_FOUR_EXACT_CANDIDATE_PAYLOADS_CLOSE" || receipt.protocol.destruction_trigger !== "AFTER_REVEAL_VERIFICATION_OR_TERMINAL_PRE_AUTHOR_REJECTION" || receipt.protocol.destruction_receipt_required !== true || receipt.protocol.no_reuse !== true) fail("holdout reveal/destroy protocol mismatch"); nonempty(receipt.protocol.reveal_verifier, "reveal verifier");
    exactKeys(receipt.public_verifiability, ["pre_reveal_proves", "pre_reveal_cannot_prove", "post_reveal_recomputes"], "holdout public verifiability");
    for (const key of ["pre_reveal_proves", "pre_reveal_cannot_prove", "post_reveal_recomputes"]) if (!Array.isArray(receipt.public_verifiability[key]) || receipt.public_verifiability[key].length === 0) fail(`holdout public verifiability ${key} absent`);
    exactKeys(receipt.absence_freshness, ["candidate_sources_existed", "candidate_sources_accessed", "prior_secret_material_reused", "fresh_key", "fresh_nonce", "fresh_corpus_id"], "holdout freshness");
    if (receipt.absence_freshness.candidate_sources_existed !== false || receipt.absence_freshness.candidate_sources_accessed !== false || receipt.absence_freshness.prior_secret_material_reused !== false || receipt.absence_freshness.fresh_key !== true || receipt.absence_freshness.fresh_nonce !== true || receipt.absence_freshness.fresh_corpus_id !== true) fail("holdout freshness mismatch");
    return true;
}

function syntheticHoldout() {
    const envelope = Buffer.concat([Buffer.from("VPI8CN1\0", "binary"), Buffer.alloc(12, 1), Buffer.from("fixture"), Buffer.alloc(16, 2)]);
    const ciphertext = Buffer.from(`${envelope.toString("base64")}\n`); const h = (char) => char.repeat(64);
    const receipt = {
        feature_id: featureId, generation, status: "SEALED_PRE_AUTHOR_CIPHERTEXT_ONLY_ZERO_FEATURE_CREDIT",
        custodian: { id: "fixture-custodian", served_model: "fixture-model", reasoning_effort: "fixture", independent: true, candidate_source_access: false, commands: ["fixture-generation"], closed_at: "2026-07-22T00:00:00.000Z" },
        precursor: { formation: { sha256: h("1"), bytes: 10 }, rows: 20, closure_sha256: h("2") },
        generator: { bytes: { sha256: h("3"), bytes: 100 }, method: "deterministic canonical JSON generator", canonicalization: "sorted case IDs, UTF-8, LF", hidden_index_commitment: { sha256: h("4"), bytes: 20 } }, plaintext_commitment: { sha256: h("5"), bytes: 200 },
        ciphertext: { path: "holdout-ciphertext.b64", ...identity(ciphertext), encoding: "base64-with-final-lf", decoded_envelope_bytes: envelope.length, algorithm: "AES-256-GCM", magic_ascii_nul: "VPI8CN1\0", nonce_bytes: 12, tag_bytes: 16, aad_sha256: h("6") },
        coverage: { case_count: 8, unique_case_ids: 8, categories: ["positive", "negative", "boundary", "offset", "diagnostics", "hostile", "binary64", "composition"], canonical_hidden_cases_sha256: h("7"), public_case_ids_sha256: h("8") },
        comparison_inputs: [{ path: "../g7/holdout-destruction.json", sha256: h("9"), bytes: 10 }, { path: "../g5/fixtures/public-cases.json", sha256: h("a"), bytes: 11 }],
        custody: { secret_location: "ephemeral custodian-only store", key_recoverable_until: "POST_AUTHOR_REVEAL_OR_TERMINAL_REJECTION", plaintext_workspace_files: 0, key_workspace_files: 0, generator_workspace_files: 0 },
        protocol: { reveal_trigger: "AFTER_ALL_FOUR_EXACT_CANDIDATE_PAYLOADS_CLOSE", reveal_verifier: "recompute generator/index/plaintext/ciphertext and all hidden observations", destruction_trigger: "AFTER_REVEAL_VERIFICATION_OR_TERMINAL_PRE_AUTHOR_REJECTION", destruction_receipt_required: true, no_reuse: true },
        public_verifiability: { pre_reveal_proves: ["ciphertext and commitments are stable"], pre_reveal_cannot_prove: ["hidden plaintext semantics without reveal"], post_reveal_recomputes: ["generator bytes, hidden index, plaintext, coverage and results"] },
        absence_freshness: { candidate_sources_existed: false, candidate_sources_accessed: false, prior_secret_material_reused: false, fresh_key: true, fresh_nonce: true, fresh_corpus_id: true }, credit: "ZERO_SEALING_ONLY",
    };
    validateHoldoutReceipt(receipt, ciphertext); const broken = structuredClone(receipt); delete broken.generator.method; expectReject(() => validateHoldoutReceipt(broken, ciphertext), "holdout generator method omission");
    return { status: "PASS", generator_bytes_and_method: true, custody_route: true, reveal_destroy_protocol: true, public_verifiability_limits: true, negative_controls: 1 };
}

function seatDeliveryManifest(seat) {
    if (!seats.includes(seat)) fail(`unknown delivery seat ${seat}`);
    const formationPath = join(cellRoot, "formation-receipt.json"); const formationBytes = readFileSync(formationPath); const formation = parseJson(formationBytes, "formation receipt");
    const rows = new Map([...formation.precursor_rows, ...formation.authorities].map((row) => [row.path, row]));
    const commonPaths = ["common-law.json", "contract.ts", "feature-row.json", "fixtures/g8-controls.json", "harness.ts", "../g5/fixtures/public-cases.json", "../g5/authorities/css-syntax-3.Overview.bs", "../../../node_modules/@mkbabb/parse-that/dist/leaf.d.ts"];
    const commonRows = commonPaths.map((path) => { const row = rows.get(path); if (!row) fail(`delivery common row missing: ${path}`); return row; });
    const packetPath = `seat-packets/${seat}.json`; const seatPacket = rows.get(packetPath); if (!seatPacket) fail(`${seat} packet missing from formation`);
    const packet = parseJson(readFileSync(join(cellRoot, packetPath)), `${seat} packet`);
    const seatSourceRows = packet.source_inputs.map((input) => { const row = rows.get(input.path); if (!row) fail(`${seat} source row missing: ${input.path}`); return row; });
    const delivered = [...commonRows, seatPacket, ...seatSourceRows];
    for (const peer of seats) if (peer !== seat && delivered.some((row) => row.path === `seat-packets/${peer}.json`)) fail(`${seat} delivery includes peer packet`);
    const value = { feature_id: featureId, generation, seat, formation_sha256: sha256(formationBytes), common_rows: commonRows, seat_packet: seatPacket, seat_source_rows: seatSourceRows, delivered_input_row_count: delivered.length, delivered_input_closure_sha256: payloadClosure(delivered), exclusions: { peer_packets: true, peer_sources: true, peer_notes: true, candidate_sources: true, reviews: true, benchmark_results: true } };
    return { value, bytes: Buffer.from(`${JSON.stringify(value, null, 2)}\n`) };
}

const parserFactories = new Set(["all", "any", "dispatch", "regex", "string", "whitespace"]);
const parserMethods = new Set(["map", "chain", "then", "skip", "next", "opt", "or", "many"]);
const valueMethods = new Set(["includes", "startsWith", "endsWith", "join"]);
const forbiddenNames = /^(state|src|source|cursor|offset|index|scanner|lexer|token|atom|cst|component)$/i;

function assertDirectTopology(sourceText) {
    const sf = ts.createSourceFile("consume-number.ts", sourceText, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);
    if (sf.parseDiagnostics.length !== 0) fail("source has parse diagnostics");
    const imports = new Set();
    let initializer;
    let exports = 0;
    for (const statement of sf.statements) {
        if (ts.isImportDeclaration(statement)) {
            if (!ts.isStringLiteral(statement.moduleSpecifier) || !statement.importClause?.namedBindings || !ts.isNamedImports(statement.importClause.namedBindings) || statement.importClause.name) fail("imports must be direct named imports");
            const module = statement.moduleSpecifier.text;
            if (module === "@mkbabb/parse-that/core") {
                for (const item of statement.importClause.namedBindings.elements) {
                    if (item.propertyName) fail("import aliases are forbidden");
                    if (statement.importClause.isTypeOnly || item.isTypeOnly) {
                        if (item.name.text !== "Parser") fail("only Parser type import is permitted from core");
                    } else {
                        if (!parserFactories.has(item.name.text)) fail(`unsupported parser factory ${item.name.text}`);
                        imports.add(item.name.text);
                    }
                }
            } else if (!/contract\.js$/.test(module) || !statement.importClause.isTypeOnly) fail(`forbidden import ${module}`);
            continue;
        }
        if (ts.isVariableStatement(statement) && statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) && (statement.declarationList.flags & ts.NodeFlags.Const) !== 0) {
            const declarations = statement.declarationList.declarations;
            if (declarations.length !== 1 || !ts.isIdentifier(declarations[0].name) || declarations[0].name.text !== "consumeNumber" || !declarations[0].initializer) fail("sole export must be initialized const consumeNumber");
            initializer = declarations[0].initializer; exports += 1; continue;
        }
        if (statement.kind !== ts.SyntaxKind.EmptyStatement) fail("helpers, aliases, declarations, and extra statements are forbidden");
    }
    if (exports !== 1 || !initializer) fail("exactly one consumeNumber export is required");
    const scopes = [];
    const isParamRoot = (node) => ts.isIdentifier(node) && scopes.some((scope) => scope.has(node.text));
    const isValueExpression = (node) => {
        if (isParamRoot(node)) return true;
        if (ts.isElementAccessExpression(node) || ts.isPropertyAccessExpression(node)) return isValueExpression(node.expression);
        if (ts.isParenthesizedExpression(node)) return isValueExpression(node.expression);
        return false;
    };
    const isGraph = (node) => {
        if (ts.isParenthesizedExpression(node)) return isGraph(node.expression);
        if (!ts.isCallExpression(node)) return false;
        if (ts.isIdentifier(node.expression)) return imports.has(node.expression.text) && parserFactories.has(node.expression.text);
        return ts.isPropertyAccessExpression(node.expression) && parserMethods.has(node.expression.name.text) && isGraph(node.expression.expression);
    };
    const visit = (node) => {
        if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isMethodDeclaration(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node) || ts.isClassExpression(node) || ts.isClassDeclaration(node)) fail("all helper/function/method/class indirection is forbidden");
        if (ts.isBlock(node) || ts.isNewExpression(node) || ts.isAwaitExpression(node) || ts.isYieldExpression(node) || ts.isDeleteExpression(node) || ts.isTaggedTemplateExpression(node)) fail("statement/dynamic/stateful construction is forbidden");
        if (ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment) fail("mutation is forbidden");
        if (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) { if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) fail("mutation is forbidden"); }
        if (ts.isArrowFunction(node)) {
            if (scopes.length !== 0 || !ts.isCallExpression(node.parent) || !node.parent.arguments.includes(node) || !ts.isPropertyAccessExpression(node.parent.expression) || !["map", "chain"].includes(node.parent.expression.name.text) || !isGraph(node.parent.expression.expression) || ts.isBlock(node.body)) fail("only direct expression-bodied inline map/chain arrows are permitted");
            const names = new Set();
            const collect = (name) => {
                if (ts.isIdentifier(name)) { if (forbiddenNames.test(name.text)) fail(`forbidden callback parameter ${name.text}`); names.add(name.text); return; }
                if (ts.isArrayBindingPattern(name)) { for (const element of name.elements) { if (!ts.isBindingElement(element) || element.dotDotDotToken) fail("rest/complex callback binding forbidden"); collect(element.name); } return; }
                fail("object callback binding forbidden");
            };
            for (const parameter of node.parameters) collect(parameter.name);
            scopes.push(names); visit(node.body); scopes.pop(); return;
        }
        if (ts.isCallExpression(node)) {
            if (ts.isIdentifier(node.expression)) {
                if (node.expression.text === "Number") { if (node.arguments.length !== 1 || !isValueExpression(node.arguments[0])) fail("Number must directly consume mapper material"); }
                else if (!imports.has(node.expression.text) || !parserFactories.has(node.expression.text)) fail(`unproven direct callee ${node.expression.text}`);
            } else if (ts.isPropertyAccessExpression(node.expression)) {
                const method = node.expression.name.text;
                if (parserMethods.has(method)) { if (!isGraph(node.expression.expression)) fail(`parser method ${method} has an unproven receiver`); }
                else if (valueMethods.has(method)) { if (!isValueExpression(node.expression.expression)) fail(`value method ${method} has an unproven receiver`); }
                else fail(`unapproved method receiver ${method}`);
            } else fail("computed/call-result indirection is forbidden");
        }
        if (ts.isPropertyAccessExpression(node) && !ts.isCallExpression(node.parent)) {
            if (!isValueExpression(node.expression)) fail(`unproven property receiver ${node.name.text}`);
            if (/^(src|source|state|offset|cursor|index)$/i.test(node.name.text)) fail(`manual parser/source property ${node.name.text} forbidden`);
        }
        if (ts.isElementAccessExpression(node) && !isValueExpression(node.expression)) fail("unproven element receiver");
        if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node)) fail("casts/assertions are forbidden");
        if (ts.isRegularExpressionLiteral(node) && (/\[\^.*\]\*/.test(node.text) || /\\[1-9]/.test(node.text))) fail("broad/backreference regex terminal forbidden");
        ts.forEachChild(node, visit);
    };
    visit(initializer);
    return { sha256: sha256(Buffer.from(sourceText)), direct_initializer: true };
}

function topologyControls() {
    const direct = [
        'import { regex } from "@mkbabb/parse-that/core";',
        'import type { ConsumeNumberParser } from "./contract.js";',
        'export const consumeNumber: ConsumeNumberParser = regex(/[+-]?(?:[0-9]*\\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/).map((raw) => ({ value: Number(raw), type: raw.includes(".") || raw.includes("e") || raw.includes("E") ? "number" : "integer", sign: raw.startsWith("+") ? "+" : raw.startsWith("-") ? "-" : null }));',
    ].join("\n");
    assertDirectTopology(direct);
    const bad = {
        "function declaration": `${direct}\nfunction helper() { return 1; }`,
        "local alias": 'import { regex } from "@mkbabb/parse-that/core"; const p = regex(/[0-9]+/); export const consumeNumber = p;',
        "inline object method": 'import { regex } from "@mkbabb/parse-that/core"; export const consumeNumber = ({ make() { return regex(/[0-9]+/); } }).make();',
        "unproven receiver": 'import { regex } from "@mkbabb/parse-that/core"; export const consumeNumber = ({ map: regex(/[0-9]+/).map }).map((x) => x);',
        "source access": 'import { regex } from "@mkbabb/parse-that/core"; export const consumeNumber = regex(/[0-9]+/).map((state) => state.src);',
        "nested arrow": 'import { regex } from "@mkbabb/parse-that/core"; export const consumeNumber = regex(/[0-9]+/).map((raw) => (() => Number(raw))());',
        "mutation": 'import { regex } from "@mkbabb/parse-that/core"; export const consumeNumber = regex(/[0-9]+/).map((raw) => raw += "0");',
    };
    for (const [label, source] of Object.entries(bad)) expectReject(() => assertDirectTopology(source), label);
    return { positive: 1, negative: Object.keys(bad).length };
}

function validateFormation() {
    const path = join(cellRoot, "formation-receipt.json");
    if (!existsSync(path)) fail("formation-receipt.json missing");
    const receipt = parseJson(readFileSync(path), "formation receipt");
    if (receipt.receipt_id !== "SYNTAX-CONSUME-NUMBER-G8-FORMATION" || receipt.feature_id !== featureId || receipt.generation !== generation || receipt.status !== "FROZEN_PRE_AUTHOR_PRE_HOLDOUT_ZERO_CANDIDATES") fail("formation receipt status/identity mismatch");
    if (!Array.isArray(receipt.precursor_rows) || receipt.precursor_rows.length < 20) fail("formation precursor rows incomplete");
    const seen = new Set();
    for (const row of receipt.precursor_rows) {
        pathRow(row, `formation row ${row.path}`);
        if (seen.has(row.path) || row.path === "formation-receipt.json") fail(`duplicate/self formation row ${row.path}`);
        seen.add(row.path);
        const actual = readIdentity(resolveUnder(cellRoot, row.path, `formation row ${row.path}`));
        sameIdentity(actual, row, `formation row ${row.path}`);
    }
    if (receipt.precursor_row_count !== receipt.precursor_rows.length || closureRows(receipt.precursor_rows, "precursor") !== receipt.precursor_closure_sha256) fail("formation row count/closure mismatch");
    if (!Array.isArray(receipt.authorities) || receipt.authorities.length !== Object.keys(externalAuthorities).length) fail("formation authority census mismatch");
    for (const row of receipt.authorities) { pathRow(row, `authority ${row.path}`); sameIdentity(readIdentity(resolve(cellRoot, row.path)), row, `authority ${row.path}`); }
    if (closureRows(receipt.authorities, "authority") !== receipt.authority_closure_sha256) fail("authority closure mismatch");
    const state = receipt.formation_state;
    for (const key of ["candidate_files", "candidate_directories", "holdout_files", "ciphertext_files", "manifest_files", "review_files", "root_files", "production_mutations"]) if (state?.[key] !== 0) fail(`formation state ${key} must be zero`);
    return { sha256: sha256(readFileSync(path)), bytes: readFileSync(path).length, precursor_rows: receipt.precursor_rows.length, precursor_closure_sha256: receipt.precursor_closure_sha256, authority_closure_sha256: receipt.authority_closure_sha256 };
}

function censusForbidden() {
    const forbidden = [];
    const walk = (root) => {
        for (const entry of readdirSync(root, { withFileTypes: true })) {
            const path = join(root, entry.name); const rel = relative(cellRoot, path).split(sep).join("/");
            if (entry.isDirectory()) { if (["candidates", "reviews", "production"].includes(entry.name)) forbidden.push(rel); else walk(path); continue; }
            if (entry.isFile() && ["holdout-receipt.json", "holdout-ciphertext.b64", "manifest.json", "root-gestalt.json", "candidate-set.json", "acceptance.json"].includes(entry.name)) forbidden.push(rel);
        }
    };
    walk(cellRoot);
    if (forbidden.length !== 0) fail(`forbidden formation artifacts exist: ${forbidden.join(",")}`);
}

function actualPreAuthor(manifestPath) {
    const absoluteManifest = resolve(manifestPath); const root = dirname(absoluteManifest);
    const manifestBytes = readFileSync(absoluteManifest); const manifest = validateBoundaryManifest(parseJson(manifestBytes, "boundary manifest"));
    const captured = [];
    const parsed = {};
    for (const key of ["formation", "holdout_receipt", "holdout_ciphertext", "review_a", "review_b", "root"]) {
        const row = manifest[key]; const absolute = resolveUnder(root, row.path, key);
        if (!existsSync(absolute)) fail(key === "review_a" ? "MISSING_REVIEW_A" : key === "review_b" ? "MISSING_REVIEW_B" : key === "root" ? "MISSING_ROOT" : `MISSING_${key.toUpperCase()}`);
        const bytes = readFileSync(absolute); const actual = { path: row.path, ...identity(bytes) }; sameIdentity(actual, row, key); captured.push(actual);
        if (key !== "holdout_ciphertext") parsed[key] = parseJson(bytes, key);
    }
    if (preAuthorStage(manifest, captured) !== "READY_FOR_SEMANTIC_REVIEW_VALIDATION") fail("pre-author capture stage mismatch");
    if (parsed.formation.precursor_closure_sha256 !== manifest.precursor_closure_sha256) fail("formation closure binding mismatch");
    validateHoldoutReceipt(parsed.holdout_receipt, readFileSync(resolveUnder(root, manifest.holdout_ciphertext.path, "holdout ciphertext")), manifest);
    for (const [key, id] of [["review_a", "A"], ["review_b", "B"]]) if (parsed[key].review_id !== id || parsed[key].verdict !== "ACCEPT" || parsed[key].blockers?.length !== 0) fail(`${key} is not an unblocked ACCEPT`);
    const reviewIds = [parsed.review_a.reviewer?.id, parsed.review_b.reviewer?.id];
    if (new Set(reviewIds).size !== 2 || parsed.root.verdict !== "ACCEPT" || parsed.root.union_blockers?.length !== 0 || reviewIds.includes(parsed.root.root?.id)) fail("root/reviewer independence or unanimity mismatch");
    const delivery = Object.fromEntries(seats.map((seat) => { const built = seatDeliveryManifest(seat); return [seat, identity(built.bytes).sha256]; }));
    return { feature_id: featureId, generation, status: "AUTHORS_MAY_BE_INVITED_ZERO_CREDIT", manifest_sha256: sha256(manifestBytes), formation_sha256: manifest.formation.sha256, closure_sha256: manifest.precursor_closure_sha256, holdout_receipt_sha256: manifest.holdout_receipt.sha256, holdout_ciphertext_sha256: manifest.holdout_ciphertext.sha256, review_a_sha256: manifest.review_a.sha256, review_b_sha256: manifest.review_b.sha256, root_sha256: manifest.root.sha256, seat_manifests: delivery, credit: "ZERO_ADMISSION_ONLY" };
}

function selfCheck() {
    verifySchemas(); const authorities = verifyAuthorities(); verifyG7Terminal(); const packets = verifySeatPackets(); censusForbidden();
    const stage = verifyPreAuthorFixture(); const fourSeat = verifyFourSeatFixture(); const topology = topologyControls(); const holdout = syntheticHoldout(); const formation = validateFormation();
    const deliveries = Object.fromEntries(seats.map((seat) => { const built = seatDeliveryManifest(seat); return [seat, { ...identity(built.bytes), closure_sha256: built.value.delivered_input_closure_sha256, rows: built.value.delivered_input_row_count }]; }));
    const ownerLaw = parseJson(Buffer.from(execFileSync(process.execPath, [join(cellRoot, "owner-law-validator.mjs"), "--self-check"], { encoding: "utf8" })), "owner-law self-check");
    const benchmark = parseJson(Buffer.from(execFileSync(process.execPath, [join(cellRoot, "benchmark-validator.mjs"), "--self-check"], { encoding: "utf8" })), "benchmark self-check");
    return { status: "PASS", generation, schemas: Object.keys(schemaIds).length, authorities: authorities.length, seat_packets: packets.length, seat_specific_delivery_manifests: deliveries, path_bearing_pre_author_fixture: stage, holdout_schema_fixture: holdout, four_seat_fixture: fourSeat, topology, owner_law: ownerLaw, benchmark, formation, holdout_files: 0, candidate_files: 0, review_files: 0, root_files: 0, production_mutations: 0 };
}

const [command, ...args] = process.argv.slice(2);
try {
    let output;
    if (command === "--self-check" || command === "--strict-check") output = selfCheck();
    else if (command === "--pre-author-fixture") output = { status: "PASS", stage: verifyPreAuthorFixture() };
    else if (command === "--four-seat-fixture") output = { status: "PASS", ...verifyFourSeatFixture() };
    else if (command === "--holdout-schema-fixture") output = syntheticHoldout();
    else if (command === "--seat-delivery") { if (args.length !== 1) fail("--seat-delivery requires h|b|s|d"); output = seatDeliveryManifest(args[0]).value; }
    else if (command === "--negative-controls") output = { status: "PASS", ...topologyControls() };
    else if (command === "--assay-stdin") { let source = ""; for await (const chunk of process.stdin) source += chunk; output = assertDirectTopology(source); }
    else if (command === "--pre-author") { if (args.length !== 1) fail("--pre-author requires one boundary manifest path"); output = actualPreAuthor(args[0]); }
    else fail("usage: --strict-check | --self-check | --pre-author-fixture | --four-seat-fixture | --holdout-schema-fixture | --seat-delivery <seat> | --negative-controls | --assay-stdin | --pre-author <manifest>");
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
}
