import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const cellRoot = dirname(fileURLToPath(import.meta.url));
const mirrorRoot = resolve(cellRoot, "../../..");
const featureId = "SYNTAX-CONSUME-NUMBER";
const generation = 7;
const scope = "PUBLIC_BOUNDARY_AND_AUTHOR_ADMISSION";
const seats = Object.freeze(["h", "b", "s", "d"]);
const shaPattern = /^[0-9a-f]{64}$/;
const schemaIds = Object.freeze({
    "boundary-review.schema.json": "urn:value-js:syntax-consume-number:g7:boundary-review",
    "root-gestalt.schema.json": "urn:value-js:syntax-consume-number:g7:root-gestalt",
    "pre-author-receipt.schema.json": "urn:value-js:syntax-consume-number:g7:pre-author-receipt",
    "author-receipt.schema.json": "urn:value-js:syntax-consume-number:g7:author-receipt",
    "holdout-receipt.schema.json": "urn:value-js:syntax-consume-number:g7:holdout-receipt",
    "benchmark-run-manifest.schema.json": "urn:value-js:syntax-consume-number:g7:benchmark-run-manifest",
    "benchmark-receipt.schema.json": "urn:value-js:syntax-consume-number:g7:benchmark-receipt",
});
const precursorPaths = Object.freeze([
    "author-admission-protocol.json",
    "author-admission-validator.mjs",
    "author-receipt.schema.json",
    "authorities/historical-utils.ts",
    "benchmark-receipt.schema.json",
    "benchmark-run-manifest.schema.json",
    "benchmark-validator.mjs",
    "boundary-review.schema.json",
    "contract.ts",
    "feature-row.json",
    "fixtures/g7-controls.json",
    "harness.ts",
    "holdout-receipt.schema.json",
    "lineage.json",
    "pre-author-receipt.schema.json",
    "root-gestalt.schema.json",
]);
const authorityPaths = Object.freeze([
    "../../../../ADDENDA-07.md",
    "../../../../FEATURE-LEDGER.md",
    "../../../../MODULE-DAG.md",
    "../g5/authorities/css-syntax-3.Overview.bs",
    "../g5/fixtures/public-cases.json",
    "../g5/holdout-destruction.json",
    "../g5/parse-that-package.ledger",
    "../g5/proof-inputs.ledger",
    "../g5/rejection.json",
    "../g5/root-gestalt.json",
    "../g5/typescript-package.ledger",
    "../g6/formation-receipt.json",
    "../g6/rejection.json",
    "../../../node_modules/@mkbabb/parse-that/dist/leaf.d.ts",
    "../../../package.json",
    "../../../tsconfig.apotheosis.json",
    "../../../tsconfig.json",
    "/Users/mkbabb/Programming/bbnf-lang/grammar/css/l4/value-unit.bbnf",
]);
const topologyDenylist = new Set([
    "67a311b0df85d3836e29243550534df9517cdd7dbb20fa4b23ff01ff4c98e126",
    "1f768248f466ff401f07949e995962aad3d7de9d84eec89999802f2973b843ff",
    "bf32182b329c7645ae82c9abe8650e84c1e58012f4ba3a7fd865d59495501372",
]);
const falseLineageDenylist = new Set([
    "303768d9829b47ec0c32c14516eaa264cc6fecfd204c75f9a353759c2d121d68",
]);
const historicalH = Object.freeze({
    localPath: "authorities/historical-utils.ts",
    sha256: "73e6a9731c802be86ac0230f32062f1075d344f6143715786eb1d9b8fe0f28e4",
    bytes: 7656,
    repository: "value.js",
    commit: "9fce504a5764258c8e56b0ce77cd656c725a4907",
    sourcePath: "src/parsing/utils.ts",
    gitBlob: "cbb57ab5327bc0afa667fbd13ad98d77f3b610de",
    line: 96,
    lineSha256: "545226e90f05ae9beb0759a9b7ebf831bfb92eb0d36dcc212d9fad73e1f29169",
    lineBytes: 92,
    source: "export const number = regex(/-?(?:(0|[1-9]\\d*)(\\.\\d+)?|\\.\\d+)([eE][+-]?\\d+)?/).map(Number);",
});

function fail(message) { throw new Error(message); }
function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function identity(bytes) { return { sha256: sha256(bytes), bytes: bytes.length }; }
function parseJson(bytes, label) {
    try { return JSON.parse(bytes.toString("utf8")); }
    catch (error) { fail(`${label} is not JSON: ${String(error)}`); }
}
function isObject(value) { return value !== null && typeof value === "object" && !Array.isArray(value); }
function object(value, label) { if (!isObject(value)) fail(`${label} must be an object`); return value; }
function exactKeys(value, keys, label) {
    object(value, label);
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${label} keys mismatch: ${actual.join(",")}`);
}
function nonempty(value, label) { if (typeof value !== "string" || value.length === 0) fail(`${label} must be nonempty`); return value; }
function hash(value, label) { if (typeof value !== "string" || !shaPattern.test(value)) fail(`${label} must be lowercase SHA-256`); return value; }
function positiveInt(value, label) { if (!Number.isInteger(value) || value < 1) fail(`${label} must be a positive integer`); return value; }
function zeroCredit(value, label) {
    exactKeys(value, ["feature", "parser", "candidate", "benchmark", "integration", "production"], label);
    for (const [key, item] of Object.entries(value)) if (item !== 0) fail(`${label}.${key} must be zero`);
}
function identityRow(value, label) {
    exactKeys(value, ["sha256", "bytes"], label);
    hash(value.sha256, `${label}.sha256`);
    positiveInt(value.bytes, `${label}.bytes`);
    return value;
}
function sameIdentity(actual, expected, label) {
    identityRow(actual, label);
    if (actual.sha256 !== expected.sha256 || actual.bytes !== expected.bytes) fail(`${label} identity mismatch`);
}
function read(path) { return readFileSync(path); }
function fileRow(path, base = cellRoot) {
    const absolute = resolve(base, path);
    const bytes = read(absolute);
    return { path, ...identity(bytes) };
}
function resolveBound(path) { return path.startsWith("/") ? path : resolve(cellRoot, path); }
function verifyBoundRow(row, label) {
    exactKeys(row, ["path", "sha256", "bytes"], label);
    nonempty(row.path, `${label}.path`);
    const actual = identity(read(resolveBound(row.path)));
    hash(row.sha256, `${label}.sha256`);
    positiveInt(row.bytes, `${label}.bytes`);
    if (row.sha256 !== actual.sha256 || row.bytes !== actual.bytes) fail(`${label} identity mismatch`);
}
function canonicalClosure(rows) {
    const ordered = [...rows].sort((a, b) => Buffer.from(a.path).compare(Buffer.from(b.path)));
    return sha256(Buffer.from(ordered.map((row) => `${row.sha256} ${row.bytes} ${row.path}\n`).join("")));
}
function timestamp(value, label) {
    nonempty(value, label);
    if (!Number.isFinite(Date.parse(value))) fail(`${label} must be an ISO date-time`);
}

function git(args, label) {
    try { return execFileSync("git", args, { cwd: mirrorRoot }); }
    catch (error) { fail(`${label} cannot be authenticated from Git: ${String(error)}`); }
}

function verifyNoExcludedHAncestry(lineage) {
    const inputs = object(object(lineage.seats, "lineage seats").h, "H lineage").inputs;
    if (!Array.isArray(inputs)) fail("H lineage inputs must be an array");
    for (const input of inputs) {
        if (input?.path === "../../../grammar/css-token.ts" || input?.sha256 === "c258e98e22bd979d44c2dca1734b776db811f736c20a55378badf194660bc2a4") fail("rejected token/lexeme grammar cannot be H ancestry");
    }
    if (JSON.stringify(object(lineage.seats, "lineage seats").h).includes("numberFastParser")) fail("current scanner-era numberFastParser cannot be H ancestry");
}

function validateHLineage(lineage) {
    verifyNoExcludedHAncestry(lineage);
    const h = object(object(lineage.seats, "lineage seats").h, "H lineage");
    exactKeys(h, ["lineage", "inputs", "required_transpose_repairs", "operative_topology"], "H lineage");
    if (h.lineage !== "historical direct parse-that production transpose") fail("H lineage is not the historical direct parse-that production transpose");
    if (!Array.isArray(h.inputs) || h.inputs.length !== 1) fail("H lineage must bind exactly one historical source authority");
    const input = h.inputs[0];
    exactKeys(input, ["path", "sha256", "bytes", "origin", "production"], "H historical input");
    if (input.path !== historicalH.localPath || input.sha256 !== historicalH.sha256 || input.bytes !== historicalH.bytes) fail("H historical local authority identity drift");
    verifyBoundRow({ path: input.path, sha256: input.sha256, bytes: input.bytes }, "H historical local authority");
    exactKeys(input.origin, ["repository", "commit", "path", "git_blob"], "H historical origin");
    if (input.origin.repository !== historicalH.repository || input.origin.commit !== historicalH.commit || input.origin.path !== historicalH.sourcePath || input.origin.git_blob !== historicalH.gitBlob) fail("H historical Git origin drift");
    const resolvedCommit = git(["rev-parse", `${input.origin.commit}^{commit}`], "H historical commit").toString("utf8").trim();
    const resolvedBlob = git(["rev-parse", `${input.origin.commit}:${input.origin.path}`], "H historical commit/path").toString("utf8").trim();
    if (resolvedCommit !== historicalH.commit || resolvedBlob !== historicalH.gitBlob) fail("H historical commit/path/blob binding mismatch");
    const localBytes = read(resolveBound(input.path));
    const objectBytes = git(["cat-file", "blob", input.origin.git_blob], "H historical blob");
    if (!localBytes.equals(objectBytes)) fail("H historical local bytes differ from the authenticated Git blob");
    exactKeys(input.production, ["line", "exact_lf_line_sha256", "exact_lf_line_bytes", "source"], "H historical production");
    if (input.production.line !== historicalH.line || input.production.exact_lf_line_sha256 !== historicalH.lineSha256 || input.production.exact_lf_line_bytes !== historicalH.lineBytes || input.production.source !== historicalH.source) fail("H historical production declaration drift");
    const lines = localBytes.toString("utf8").split("\n");
    const productionLine = Buffer.from(`${lines[input.production.line - 1]}\n`);
    if (lines[input.production.line - 1] !== input.production.source || sha256(productionLine) !== input.production.exact_lf_line_sha256 || productionLine.length !== input.production.exact_lf_line_bytes) fail("H historical exact production line drift");
    if (!Array.isArray(h.required_transpose_repairs) || h.required_transpose_repairs.length !== 4 || !h.required_transpose_repairs.some((item) => item.includes("leading-plus")) || !h.required_transpose_repairs.some((item) => item.includes("CSS [0-9]+ maximal"))) fail("H required CSS transpose repairs drift");
    if (!h.operative_topology.includes("whole-prefix regex") || !h.operative_topology.includes("no token, lexeme") || !h.operative_topology.includes("scanner ancestry")) fail("H operative topology does not exclude token/lexeme/scanner ancestry");
    if (!Array.isArray(lineage.excluded_h_ancestry) || lineage.excluded_h_ancestry.length !== 2) fail("H excluded ancestry set drift");
    const [falseGrammar, scanner] = lineage.excluded_h_ancestry;
    exactKeys(falseGrammar, ["path", "sha256", "bytes", "reason"], "H rejected grammar ancestry");
    if (falseGrammar.path !== "../../../grammar/css-token.ts" || falseGrammar.sha256 !== "c258e98e22bd979d44c2dca1734b776db811f736c20a55378badf194660bc2a4" || falseGrammar.bytes !== 2599 || !falseGrammar.reason.includes("token/lexeme")) fail("H rejected token/lexeme ancestry drift");
    exactKeys(scanner, ["identity", "reason"], "H rejected scanner ancestry");
    if (scanner.identity !== "current scanner-era numberFastParser" || !scanner.reason.includes("excluded")) fail("H rejected scanner ancestry drift");
}

function verifySchemas() {
    for (const [path, id] of Object.entries(schemaIds)) {
        const schema = parseJson(read(join(cellRoot, path)), path);
        if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema" || schema.$id !== id) fail(`${path} schema identity mismatch`);
        if (schema.type !== "object" || schema.additionalProperties !== false) fail(`${path} is not an exact object schema`);
    }
}

function verifyFeatureAndLineage() {
    const row = parseJson(read(join(cellRoot, "feature-row.json")), "feature row");
    if (row.feature_id !== featureId || row.generation !== generation || row.status !== "PILOT_ROW_PREPARED_UNACCEPTED_PRE_AUTHOR_PRE_HOLDOUT") fail("feature row identity drift");
    exactKeys(row.g6_terminal_authority, ["formation", "rejection", "precursor_closure_sha256"], "G6 terminal authority");
    for (const terminal of [row.g6_terminal_authority.formation, row.g6_terminal_authority.rejection]) {
        const comparable = { path: terminal.path, sha256: terminal.sha256, bytes: terminal.bytes };
        verifyBoundRow(comparable, `G6 terminal ${terminal.path}`);
    }
    if (row.g6_terminal_authority.formation.sha256 !== "41601fe8a14eaab1dd550148f269f114ca7ddbf1978f3644365e90f913d6d0be" || row.g6_terminal_authority.formation.bytes !== 5680 || row.g6_terminal_authority.rejection.sha256 !== "5e24fdeaabc5e9df08ed866eb6a8420de439ce6fb52175dd5d99bcaa00f41bf2" || row.g6_terminal_authority.rejection.bytes !== 4057 || row.g6_terminal_authority.precursor_closure_sha256 !== "21b2d1fbbe4944708ca7b68b3ed7b3ff270ca56c1c7aead15f341de34e31971f") fail("G6 terminal rejection/formation binding drift");
    const g6Formation = parseJson(read(resolveBound(row.g6_terminal_authority.formation.path)), "G6 formation");
    if (g6Formation.precursor_closure_sha256 !== row.g6_terminal_authority.precursor_closure_sha256) fail("G6 terminal precursor closure mismatch");
    const ledger = row.ledger_authority;
    verifyBoundRow({ path: ledger.path, sha256: ledger.sha256, bytes: ledger.bytes }, "ledger authority");
    if (ledger.sha256 !== "9b8950a275f7b7cb8c83d12e30a75021528d1a69a6066faa7b315996b040c258" || ledger.bytes !== 12559) fail("corrected ledger identity drift");
    const occurrence = row.normative_occurrence;
    const authority = read(resolveBound(occurrence.authority_path));
    if (sha256(authority) !== occurrence.authority_sha256 || authority.length !== occurrence.authority_bytes) fail("normative authority identity drift");
    const lines = authority.toString("utf8").split("\n");
    const slice = Buffer.from(`${lines.slice(occurrence.line_start - 1, occurrence.line_end_inclusive).join("\n")}\n`);
    if (sha256(slice) !== occurrence.exact_lf_slice_sha256 || slice.length !== occurrence.exact_lf_slice_bytes) fail("§4.3.13 occurrence slice drift");
    if (!row.operation.subordinate_number_start.includes("not a dependency")) fail("number-start is not explicitly subordinate");
    const lineageBytes = read(join(cellRoot, "lineage.json"));
    const lineage = parseJson(lineageBytes, "lineage");
    if (lineage.feature_id !== featureId || lineage.generation !== generation || lineage.status !== "PRE_AUTHOR_PROVENANCE_GRAPH_FROZEN") fail("lineage identity drift");
    if (JSON.stringify(Object.keys(lineage.seats)) !== JSON.stringify(seats)) fail("lineage seats must be exact H/B/S/D order");
    validateHLineage(lineage);
    for (const seat of seats) {
        const inputs = lineage.seats[seat].inputs;
        if (!Array.isArray(inputs) || inputs.length === 0) fail(`${seat} lineage has no inputs`);
        for (const input of inputs) {
            hash(input.sha256, `${seat} lineage input sha256`);
            positiveInt(input.bytes, `${seat} lineage input bytes`);
            const actual = identity(read(resolveBound(input.path)));
            if (actual.sha256 !== input.sha256 || actual.bytes !== input.bytes) fail(`${seat} lineage input drift: ${input.path}`);
        }
    }
    if (lineage.edges.length !== 6 || lineage.edges[0].finding !== "ANCESTRY_NOT_AFFIRMATIVELY_INDEPENDENT" || !lineage.edges[0].consequence.includes("D is mandatory")) fail("pairwise genealogy finding drift");
    return { row, lineage, lineageIdentity: identity(lineageBytes) };
}

function verifyFormation() {
    const receiptBytes = read(join(cellRoot, "formation-receipt.json"));
    const receipt = parseJson(receiptBytes, "formation receipt");
    if (receipt.feature_id !== featureId || receipt.generation !== generation || receipt.status !== "FROZEN_PRE_AUTHOR_PRE_HOLDOUT_ZERO_CANDIDATES") fail("formation receipt identity drift");
    const localPaths = receipt.precursor_rows.map((row) => row.path);
    if (JSON.stringify(localPaths) !== JSON.stringify(precursorPaths)) fail("formation local precursor path set drift");
    const externalPaths = receipt.authorities.map((row) => row.path);
    if (JSON.stringify(externalPaths) !== JSON.stringify(authorityPaths)) fail("formation authority path set drift");
    for (const row of [...receipt.precursor_rows, ...receipt.authorities]) verifyBoundRow(row, `formation row ${row.path}`);
    const allRows = [...receipt.precursor_rows, ...receipt.authorities];
    if (receipt.precursor_row_count !== allRows.length || receipt.precursor_closure_sha256 !== canonicalClosure(allRows)) fail("formation precursor closure drift");
    exactKeys(receipt.formation_state, ["candidate_files", "candidate_directories", "holdout_files", "ciphertext_files", "manifest_files", "review_files", "root_files", "production_mutations"], "formation state");
    for (const value of Object.values(receipt.formation_state)) if (value !== 0) fail("formation state must be all zero");
    return { receipt, receiptIdentity: identity(receiptBytes), rows: allRows };
}

function validateSubject(subject, expected, label) {
    exactKeys(subject, ["formation", "precursor_closure_sha256", "holdout_receipt", "holdout_ciphertext"], label);
    sameIdentity(subject.formation, expected.formation, `${label}.formation`);
    if (subject.precursor_closure_sha256 !== expected.precursor_closure_sha256) fail(`${label}.precursor closure mismatch`);
    sameIdentity(subject.holdout_receipt, expected.holdout_receipt, `${label}.holdout receipt`);
    sameIdentity(subject.holdout_ciphertext, expected.holdout_ciphertext, `${label}.holdout ciphertext`);
}
function validateAxis(value, label) {
    exactKeys(value, ["verdict", "findings"], label);
    if (!['ACCEPT', 'REJECT'].includes(value.verdict)) fail(`${label}.verdict invalid`);
    if (!Array.isArray(value.findings) || value.findings.length === 0) fail(`${label}.findings empty`);
    value.findings.forEach((item, index) => nonempty(item, `${label}.findings[${index}]`));
}
function validateAxisSet(value, keys, label) {
    exactKeys(value, keys, label);
    for (const key of keys) validateAxis(value[key], `${label}.${key}`);
}
function allAxesAccept(review) {
    return Object.values(review.three_altitude_findings).every((set) => Object.values(set).every((axis) => axis.verdict === "ACCEPT"));
}
function validateReview(review, expectedId, expected, manifestIdentity, reviewInputSha) {
    exactKeys(review, ["feature_id", "generation", "review_id", "scope", "verdict", "identity", "model_receipt", "subject", "three_altitude_findings", "evidence", "defects", "credit"], `review ${expectedId}`);
    if (review.feature_id !== featureId || review.generation !== generation || review.review_id !== expectedId || review.scope !== scope) fail(`review ${expectedId} identity mismatch`);
    if (!['ACCEPT', 'REJECT'].includes(review.verdict)) fail(`review ${expectedId} verdict invalid`);
    exactKeys(review.identity, ["reviewer_id", "role", "served_model", "reasoning_effort", "independent", "candidate_author", "root_adjudicator", "peer_review_access", "hidden_plaintext_or_key_access"], `review ${expectedId} identity receipt`);
    for (const key of ["reviewer_id", "role", "served_model", "reasoning_effort"]) nonempty(review.identity[key], `review ${expectedId} identity.${key}`);
    for (const key of ["independent"]) if (review.identity[key] !== true) fail(`review ${expectedId} must be independent`);
    for (const key of ["candidate_author", "root_adjudicator", "peer_review_access", "hidden_plaintext_or_key_access"]) if (review.identity[key] !== false) fail(`review ${expectedId} ${key} must be false`);
    exactKeys(review.model_receipt, ["served_model", "input_manifest_sha256", "review_input_sha256", "commands", "closed_at"], `review ${expectedId} model receipt`);
    if (review.model_receipt.served_model !== review.identity.served_model) fail(`review ${expectedId} served model mismatch`);
    if (review.model_receipt.input_manifest_sha256 !== manifestIdentity.sha256 || review.model_receipt.review_input_sha256 !== reviewInputSha) fail(`review ${expectedId} input receipt mismatch`);
    if (!Array.isArray(review.model_receipt.commands) || review.model_receipt.commands.length === 0) fail(`review ${expectedId} commands empty`);
    review.model_receipt.commands.forEach((item, index) => nonempty(item, `review ${expectedId} command ${index}`));
    timestamp(review.model_receipt.closed_at, `review ${expectedId} close time`);
    validateSubject(review.subject, expected, `review ${expectedId} subject`);
    exactKeys(review.three_altitude_findings, ["total_tranche", "feature_cell", "author_admission_and_tooling"], `review ${expectedId} altitudes`);
    validateAxisSet(review.three_altitude_findings.total_tranche, ["sequencing", "denominator", "boundary"], `review ${expectedId} total tranche`);
    validateAxisSet(review.three_altitude_findings.feature_cell, ["correctness", "result", "diagnostics", "limits", "hostility", "composition"], `review ${expectedId} feature cell`);
    validateAxisSet(review.three_altitude_findings.author_admission_and_tooling, ["review_integrity", "holdout_integrity", "provenance", "topology", "benchmark", "owner_law"], `review ${expectedId} tooling`);
    if (!Array.isArray(review.evidence) || review.evidence.length === 0) fail(`review ${expectedId} evidence empty`);
    review.evidence.forEach((item, index) => nonempty(item, `review ${expectedId} evidence ${index}`));
    if (!Array.isArray(review.defects)) fail(`review ${expectedId} defects must be an array`);
    for (const [index, defect] of review.defects.entries()) {
        exactKeys(defect, ["id", "severity", "summary", "evidence", "required_repair"], `review ${expectedId} defect ${index}`);
        if (defect.severity !== "BLOCKER") fail(`review ${expectedId} defect severity must be BLOCKER`);
        nonempty(defect.id, "defect id"); nonempty(defect.summary, "defect summary"); nonempty(defect.required_repair, "defect repair");
        if (!Array.isArray(defect.evidence) || defect.evidence.length === 0) fail("defect evidence empty");
    }
    zeroCredit(review.credit, `review ${expectedId} credit`);
    if (review.verdict === "ACCEPT" && (review.defects.length !== 0 || !allAxesAccept(review))) fail(`review ${expectedId} ACCEPT has blockers or rejected axes`);
    if (review.verdict === "REJECT" && review.defects.length === 0) fail(`review ${expectedId} REJECT has no blocker`);
}

function validateRoot(root, expected, manifestIdentity, reviews) {
    exactKeys(root, ["feature_id", "generation", "scope", "verdict", "identity", "model_receipt", "subject", "challenges", "three_altitude_findings", "evidence", "union_blockers", "credit"], "root gestalt");
    if (root.feature_id !== featureId || root.generation !== generation || root.scope !== scope || !['ACCEPT', 'REJECT'].includes(root.verdict)) fail("root gestalt identity/verdict mismatch");
    exactKeys(root.identity, ["root_id", "reviewer_id", "served_model", "reasoning_effort", "independent", "candidate_author", "challenge_reviewer", "hidden_plaintext_or_key_access"], "root identity");
    for (const key of ["root_id", "reviewer_id", "served_model", "reasoning_effort"]) nonempty(root.identity[key], `root identity.${key}`);
    if (root.identity.independent !== true || root.identity.candidate_author !== false || root.identity.challenge_reviewer !== false || root.identity.hidden_plaintext_or_key_access !== false) fail("root independence receipt invalid");
    const reviewIds = reviews.map((item) => item.json.identity.reviewer_id);
    if (new Set([...reviewIds, root.identity.reviewer_id]).size !== 3) fail("challenge and root identities are not pairwise distinct");
    exactKeys(root.model_receipt, ["served_model", "input_manifest_sha256", "root_input_sha256", "commands", "closed_at"], "root model receipt");
    const computedRootInput = sha256(Buffer.from(JSON.stringify({ input_manifest_sha256: manifestIdentity.sha256, challenges: reviews.map((item) => ({ id: item.json.review_id, sha256: item.identity.sha256, bytes: item.identity.bytes })) })));
    if (root.model_receipt.served_model !== root.identity.served_model || root.model_receipt.input_manifest_sha256 !== manifestIdentity.sha256 || root.model_receipt.root_input_sha256 !== computedRootInput) fail("root model input receipt mismatch");
    if (!Array.isArray(root.model_receipt.commands) || root.model_receipt.commands.length === 0) fail("root commands empty");
    timestamp(root.model_receipt.closed_at, "root close time");
    validateSubject(root.subject, expected, "root subject");
    if (!Array.isArray(root.challenges) || root.challenges.length !== 2) fail("root must bind exactly two challenges");
    for (const [index, item] of reviews.entries()) {
        const row = root.challenges[index];
        exactKeys(row, ["id", "reviewer_id", "path", "sha256", "bytes", "verdict"], `root challenge ${index}`);
        if (row.id !== item.json.review_id || row.reviewer_id !== item.json.identity.reviewer_id || row.path !== item.path || row.sha256 !== item.identity.sha256 || row.bytes !== item.identity.bytes || row.verdict !== item.json.verdict) fail(`root challenge ${index} mismatch`);
    }
    exactKeys(root.three_altitude_findings, ["total_tranche", "feature_cell", "author_admission_and_tooling"], "root altitudes");
    for (const [key, value] of Object.entries(root.three_altitude_findings)) validateAxis(value, `root altitude ${key}`);
    if (!Array.isArray(root.evidence) || root.evidence.length === 0 || !Array.isArray(root.union_blockers)) fail("root evidence/blockers invalid");
    zeroCredit(root.credit, "root credit");
    if (root.verdict === "ACCEPT") {
        if (root.union_blockers.length !== 0 || reviews.some((item) => item.json.verdict !== "ACCEPT") || Object.values(root.three_altitude_findings).some((axis) => axis.verdict !== "ACCEPT")) fail("root ACCEPT has a blocker or rejected input");
    } else if (root.union_blockers.length === 0) fail("root REJECT has no union blocker");
}

function validateHoldout(receipt, ciphertext, formation) {
    exactKeys(receipt, ["feature_id", "generation", "status", "corpus_id", "precursor", "plaintext_commitment", "ciphertext", "envelope", "coverage", "anti_duplication", "absence_freshness", "credit"], "holdout receipt");
    if (receipt.feature_id !== featureId || receipt.generation !== generation || receipt.status !== "SEALED_PRE_AUTHOR_CIPHERTEXT_ONLY_ZERO_FEATURE_CREDIT") fail("holdout identity/status mismatch");
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(receipt.corpus_id)) fail("holdout corpus_id is not a lowercase UUIDv4");
    exactKeys(receipt.precursor, ["formation", "rows", "closure_sha256"], "holdout precursor");
    sameIdentity(receipt.precursor.formation, formation.receiptIdentity, "holdout formation");
    if (receipt.precursor.rows !== formation.rows.length || receipt.precursor.closure_sha256 !== formation.receipt.precursor_closure_sha256) fail("holdout precursor closure mismatch");
    identityRow(receipt.plaintext_commitment, "plaintext commitment");
    exactKeys(receipt.ciphertext, ["path", "sha256", "bytes", "encoding", "decoded_envelope_bytes"], "holdout ciphertext row");
    if (receipt.ciphertext.path !== "holdout-ciphertext.b64" || receipt.ciphertext.encoding !== "base64-with-final-lf") fail("holdout ciphertext metadata mismatch");
    const ciphertextIdentity = identity(ciphertext);
    if (receipt.ciphertext.sha256 !== ciphertextIdentity.sha256 || receipt.ciphertext.bytes !== ciphertextIdentity.bytes) fail("holdout ciphertext identity mismatch");
    const text = ciphertext.toString("ascii");
    if (!text.endsWith("\n") || text.slice(0, -1).includes("\n") || !/^[A-Za-z0-9+/]*={0,2}\n$/.test(text)) fail("holdout ciphertext is not canonical base64 with one LF");
    const decoded = Buffer.from(text.slice(0, -1), "base64");
    if (`${decoded.toString("base64")}\n` !== text || decoded.length !== receipt.ciphertext.decoded_envelope_bytes) fail("holdout decoded envelope mismatch");
    exactKeys(receipt.envelope, ["algorithm", "magic_ascii_nul", "magic_bytes", "nonce_bytes", "tag_bytes", "aad"], "holdout envelope");
    if (receipt.envelope.algorithm !== "AES-256-GCM" || receipt.envelope.magic_ascii_nul !== "VPI7CN1\u0000" || receipt.envelope.magic_bytes !== 8 || receipt.envelope.nonce_bytes !== 12 || receipt.envelope.tag_bytes !== 16) fail("holdout AES envelope declaration mismatch");
    if (!decoded.subarray(0, 8).equals(Buffer.from("VPI7CN1\0", "ascii"))) fail("holdout envelope magic mismatch");
    if (decoded.length !== receipt.plaintext_commitment.bytes + 36) fail("holdout envelope/plaintext length mismatch");
    exactKeys(receipt.envelope.aad, ["feature_id", "generation", "corpus_id", "formation_sha256", "precursor_closure_sha256", "plaintext_sha256", "plaintext_bytes"], "holdout AAD");
    const aad = receipt.envelope.aad;
    if (aad.feature_id !== featureId || aad.generation !== generation || aad.corpus_id !== receipt.corpus_id || aad.formation_sha256 !== formation.receiptIdentity.sha256 || aad.precursor_closure_sha256 !== formation.receipt.precursor_closure_sha256 || aad.plaintext_sha256 !== receipt.plaintext_commitment.sha256 || aad.plaintext_bytes !== receipt.plaintext_commitment.bytes) fail("holdout AAD binding mismatch");
    exactKeys(receipt.coverage, ["case_count", "unique_case_ids", "categories", "public_case_ids_sha256", "generator_sha256"], "holdout coverage");
    if (receipt.coverage.case_count !== receipt.coverage.unique_case_ids || receipt.coverage.case_count < 1 || !Array.isArray(receipt.coverage.categories) || new Set(receipt.coverage.categories).size !== receipt.coverage.categories.length) fail("holdout coverage/unique count mismatch");
    const requiredCategories = ["positive", "negative", "boundary", "offset", "diagnostics", "hostile"];
    if (requiredCategories.some((item) => !receipt.coverage.categories.includes(item))) fail("holdout coverage categories incomplete");
    hash(receipt.coverage.public_case_ids_sha256, "public case IDs hash"); hash(receipt.coverage.generator_sha256, "holdout generator hash");
    exactKeys(receipt.anti_duplication, ["duplicate_ids", "duplicate_cases", "public_exact_duplicates", "cross_generation_exact_duplicates"], "holdout anti-duplication");
    if (Object.values(receipt.anti_duplication).some((value) => value !== 0)) fail("holdout duplicates detected");
    exactKeys(receipt.absence_freshness, ["candidate_sources_existed", "candidate_sources_accessed", "plaintext_workspace_files", "key_workspace_files", "prior_secret_material_reused", "fresh_key", "fresh_nonce", "fresh_corpus_id"], "holdout absence/freshness");
    const absent = receipt.absence_freshness;
    if (absent.candidate_sources_existed !== false || absent.candidate_sources_accessed !== false || absent.plaintext_workspace_files !== 0 || absent.key_workspace_files !== 0 || absent.prior_secret_material_reused !== false || absent.fresh_key !== true || absent.fresh_nonce !== true || absent.fresh_corpus_id !== true) fail("holdout absence/freshness receipt invalid");
    if (receipt.credit !== "ZERO_SEALING_ONLY") fail("holdout credit mismatch");
    return ciphertextIdentity;
}

function validatePreAuthorReceipt(receipt) {
    exactKeys(receipt, ["feature_id", "generation", "status", "manifest", "formation", "precursor_closure_sha256", "holdout_receipt", "holdout_ciphertext", "challenges", "root_gestalt", "candidates_absent", "closed_at", "credit"], "pre-author receipt");
    if (receipt.feature_id !== featureId || receipt.generation !== generation || receipt.status !== "AUTHORS_MAY_BE_INVITED" || receipt.candidates_absent !== true || receipt.credit !== "ZERO_AUTHOR_INVITATION_ONLY") fail("pre-author receipt identity/status mismatch");
    for (const key of ["manifest", "formation", "holdout_receipt", "holdout_ciphertext"]) identityRow(receipt[key], `pre-author ${key}`);
    hash(receipt.precursor_closure_sha256, "pre-author precursor closure");
    if (!Array.isArray(receipt.challenges) || receipt.challenges.length !== 2) fail("pre-author challenge count mismatch");
    const ids = [];
    for (const row of receipt.challenges) {
        exactKeys(row, ["id", "reviewer_id", "sha256", "bytes", "verdict"], "pre-author challenge");
        if (!['A', 'B'].includes(row.id) || row.verdict !== "ACCEPT") fail("pre-author challenge verdict mismatch");
        nonempty(row.reviewer_id, "pre-author reviewer"); hash(row.sha256, "pre-author review hash"); positiveInt(row.bytes, "pre-author review bytes"); ids.push(row.reviewer_id);
    }
    exactKeys(receipt.root_gestalt, ["reviewer_id", "sha256", "bytes", "verdict"], "pre-author root");
    if (receipt.root_gestalt.verdict !== "ACCEPT") fail("pre-author root not ACCEPT");
    if (new Set([...ids, receipt.root_gestalt.reviewer_id]).size !== 3) fail("pre-author identities not pairwise distinct");
    timestamp(receipt.closed_at, "pre-author close time");
}

function validateAuthorReceipt(receipt, seat, expected) {
    exactKeys(receipt, ["feature_id", "generation", "seat", "author_id", "served_model", "reasoning_effort", "independent", "peer_source_access", "admission", "candidate", "commands", "closed_at", "construction", "provenance", "credit"], `${seat} author receipt`);
    if (receipt.feature_id !== featureId || receipt.generation !== generation || receipt.seat !== seat || receipt.independent !== true || receipt.peer_source_access !== false || receipt.credit !== "ZERO_AUTHOR_RECEIPT_ONLY") fail(`${seat} author identity mismatch`);
    for (const key of ["author_id", "served_model", "reasoning_effort"]) nonempty(receipt[key], `${seat} ${key}`);
    exactKeys(receipt.admission, ["admitted_manifest_sha256", "pre_author_receipt_sha256", "formation_sha256"], `${seat} admission`);
    if (receipt.admission.admitted_manifest_sha256 !== expected.manifest || receipt.admission.pre_author_receipt_sha256 !== expected.preAuthor || receipt.admission.formation_sha256 !== expected.formation) fail(`${seat} admission binding mismatch`);
    exactKeys(receipt.candidate, ["isolated_root_sha256", "source_path", "source_sha256", "source_bytes"], `${seat} candidate`);
    for (const key of ["isolated_root_sha256", "source_sha256"]) hash(receipt.candidate[key], `${seat} candidate ${key}`);
    positiveInt(receipt.candidate.source_bytes, `${seat} source bytes`); nonempty(receipt.candidate.source_path, `${seat} source path`);
    if (!Array.isArray(receipt.commands) || receipt.commands.length === 0) fail(`${seat} commands empty`);
    for (const command of receipt.commands) { exactKeys(command, ["command", "exit_code"], `${seat} command`); nonempty(command.command, "command"); if (!Number.isInteger(command.exit_code)) fail("command exit code invalid"); }
    timestamp(receipt.closed_at, `${seat} close time`);
    exactKeys(receipt.construction, ["parse_that_apis", "loc", "backtracking_shape", "material_intermediate_allocations", "known_compromises"], `${seat} construction`);
    if (!Array.isArray(receipt.construction.parse_that_apis) || receipt.construction.parse_that_apis.length === 0 || new Set(receipt.construction.parse_that_apis).size !== receipt.construction.parse_that_apis.length) fail(`${seat} API list invalid`);
    positiveInt(receipt.construction.loc, `${seat} LOC`); nonempty(receipt.construction.backtracking_shape, `${seat} backtracking`);
    if (!Array.isArray(receipt.construction.material_intermediate_allocations) || !Array.isArray(receipt.construction.known_compromises)) fail(`${seat} allocation/compromise fields missing`);
    exactKeys(receipt.provenance, ["lineage_sha256", "seat_input_sha256s", "peer_design_notes_accessed", "candidate_root_isolated"], `${seat} provenance`);
    if (receipt.provenance.lineage_sha256 !== expected.lineage || receipt.provenance.peer_design_notes_accessed !== false || receipt.provenance.candidate_root_isolated !== true) fail(`${seat} provenance binding mismatch`);
    const expectedInputs = expected.inputs;
    if (JSON.stringify(receipt.provenance.seat_input_sha256s) !== JSON.stringify(expectedInputs)) fail(`${seat} lineage inputs mismatch`);
}

function isExport(node) { return node.modifiers?.some((item) => item.kind === ts.SyntaxKind.ExportKeyword) === true; }
function isConst(node) { return (node.declarationList.flags & ts.NodeFlags.Const) !== 0; }
function assertTopology(sourceText, seat, expectedContractModule) {
    if (!seats.includes(seat)) fail(`unknown topology seat ${seat}`);
    const sourceHash = sha256(Buffer.from(sourceText));
    if (topologyDenylist.has(sourceHash)) fail(`${seat}: exact recorded G5 bypass source is forbidden`);
    const sf = ts.createSourceFile("consume-number.ts", sourceText, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);
    if (sf.parseDiagnostics.length !== 0) fail(`${seat}: source has parse diagnostics`);
    const runtimeImports = new Set();
    let initializer;
    let exportCount = 0;
    for (const statement of sf.statements) {
        if (ts.isImportDeclaration(statement)) {
            if (!ts.isStringLiteral(statement.moduleSpecifier) || !statement.importClause) fail(`${seat}: malformed import`);
            const module = statement.moduleSpecifier.text;
            const clause = statement.importClause;
            if (module === "@mkbabb/parse-that/core") {
                if (clause.name || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings)) fail(`${seat}: runtime import must be named`);
                for (const item of clause.namedBindings.elements) {
                    if (item.propertyName) fail(`${seat}: import aliases are forbidden`);
                    if (clause.isTypeOnly || item.isTypeOnly) {
                        if (item.name.text !== "Parser") fail(`${seat}: only Parser may be type-imported from core`);
                    } else {
                        if (!["all", "any", "dispatch", "regex", "string"].includes(item.name.text)) fail(`${seat}: forbidden runtime import ${item.name.text}`);
                        runtimeImports.add(item.name.text);
                    }
                }
            } else if (module.endsWith("/contract.js") || module === "./contract.js") {
                if (expectedContractModule !== undefined && module !== expectedContractModule) fail(`${seat}: contract import does not resolve to the frozen G7 contract`);
                if (!clause.isTypeOnly || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings) || clause.namedBindings.elements.length !== 1 || clause.namedBindings.elements[0].name.text !== "ConsumeNumberParser" || clause.namedBindings.elements[0].propertyName) fail(`${seat}: contract import must be exact type ConsumeNumberParser`);
            } else fail(`${seat}: forbidden import module ${module}`);
            continue;
        }
        if (ts.isVariableStatement(statement) && isExport(statement) && isConst(statement)) {
            const declarations = statement.declarationList.declarations;
            if (declarations.length !== 1 || !ts.isIdentifier(declarations[0].name) || declarations[0].name.text !== "consumeNumber" || !declarations[0].initializer) fail(`${seat}: sole export must be initialized consumeNumber const`);
            initializer = declarations[0].initializer;
            exportCount += 1;
            continue;
        }
        if (statement.kind === ts.SyntaxKind.EmptyStatement) continue;
        fail(`${seat}: dead declarations, aliases, helpers, and extra statements are forbidden`);
    }
    if (exportCount !== 1 || !initializer) fail(`${seat}: expected one consumeNumber export`);
    const counts = { all: 0, any: 0, dispatch: 0, regex: 0, string: 0 };
    const regexSources = [];
    const allowedMethods = new Set(["map", "then", "skip", "next", "opt", "or", "chain", "includes", "startsWith", "join"]);
    const arrowScopes = [];
    function visit(node) {
        if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node)) fail(`${seat}: casts/assertions are forbidden`);
        if (ts.isNewExpression(node) || ts.isClassExpression(node) || ts.isFunctionExpression(node) || ts.isAwaitExpression(node) || ts.isYieldExpression(node)) fail(`${seat}: dynamic or stateful construction is forbidden`);
        if (ts.isArrowFunction(node)) {
            const names = new Set();
            const collect = (name) => {
                if (ts.isIdentifier(name)) names.add(name.text);
                else if (ts.isArrayBindingPattern(name)) for (const item of name.elements) if (ts.isBindingElement(item)) collect(item.name);
                else fail(`${seat}: object/rest binding aliases are forbidden`);
            };
            for (const parameter of node.parameters) collect(parameter.name);
            arrowScopes.push(names); ts.forEachChild(node.body, visit); arrowScopes.pop(); return;
        }
        if (ts.isCallExpression(node)) {
            if (ts.isIdentifier(node.expression)) {
                const name = node.expression.text;
                if (name === "Number") {
                    if (node.arguments.length !== 1) fail(`${seat}: Number call arity mismatch`);
                } else {
                    if (!runtimeImports.has(name) || !(name in counts)) fail(`${seat}: indirect or unimported call ${name}`);
                    counts[name] += 1;
                    if (name === "regex") {
                        const argument = node.arguments[0];
                        if (!argument || !ts.isRegularExpressionLiteral(argument)) fail(`${seat}: regex terminals require direct regex literals`);
                        regexSources.push(argument.getText(sf));
                    }
                }
            } else if (ts.isPropertyAccessExpression(node.expression)) {
                if (!allowedMethods.has(node.expression.name.text)) fail(`${seat}: forbidden method ${node.expression.name.text}`);
            } else fail(`${seat}: indirect calls are forbidden`);
        }
        if (ts.isIdentifier(node)) {
            const parent = node.parent;
            const declarationName = ts.isVariableDeclaration(parent) && parent.name === node;
            const importName = ts.isImportSpecifier(parent) && parent.name === node;
            const propertyName = (ts.isPropertyAssignment(parent) && parent.name === node) || (ts.isPropertyAccessExpression(parent) && parent.name === node);
            const bindingName = ts.isBindingElement(parent) && parent.name === node;
            const allowed = declarationName || importName || propertyName || bindingName || node.text === "consumeNumber" || node.text === "Number" || runtimeImports.has(node.text) || arrowScopes.some((scope) => scope.has(node.text));
            if (!allowed) fail(`${seat}: alias or free identifier ${node.text} is forbidden`);
        }
        if (ts.isElementAccessExpression(node) && !(ts.isIdentifier(node.expression) && arrowScopes.some((scope) => scope.has(node.expression.text)))) fail(`${seat}: element access is allowed only on inline mapper parameters`);
        if (ts.isRegularExpressionLiteral(node) && (/\[\^\)\]\*/.test(node.text) || /\[\^;\{\}\]\*/.test(node.text))) fail(`${seat}: broad remainder regex forbidden`);
        ts.forEachChild(node, visit);
    }
    visit(initializer);
    const wholePrefixRegex = "/[+-]?(?:[0-9]*\\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/";
    if (seat === "h" && !(counts.regex === 1 && counts.any === 0 && counts.all === 0 && counts.string === 0 && counts.dispatch === 0 && regexSources[0] === wholePrefixRegex)) fail("h: operative exact whole-prefix topology mismatch");
    if (seat === "b" && !(counts.any >= 2 && counts.all >= 2 && counts.string === 0 && counts.dispatch === 0)) fail("b: operative topology mismatch");
    if (seat === "s" && !(counts.string >= 4 && counts.any >= 2 && counts.all >= 1 && counts.dispatch === 0)) fail("s: operative topology mismatch");
    if (seat === "d") {
        if (counts.dispatch < 1 || counts.any !== 0 || counts.all !== 0) fail("d: operative topology mismatch");
        const dispatchCall = findCall(initializer, "dispatch");
        const table = dispatchCall?.arguments[0];
        if (!table || !ts.isObjectLiteralExpression(table)) fail("d: dispatch table must be an inline object");
        const keys = table.properties.map((property) => {
            if (!ts.isPropertyAssignment(property)) fail("d: dispatch entries must be direct property assignments");
            if (ts.isStringLiteral(property.name) || ts.isNumericLiteral(property.name)) return property.name.text;
            return property.name.getText(sf);
        });
        for (const key of ["+-", ".", "0-9"]) if (!keys.includes(key)) fail(`d: dispatch missing ${key} bucket`);
        if (regexSources.includes(wholePrefixRegex)) fail("d: whole-prefix H regex is forbidden inside dispatch topology");
    }
    return { sha256: sourceHash, counts };
}
function findCall(root, name) {
    let found;
    const walk = (node) => { if (!found && ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name) found = node; if (!found) ts.forEachChild(node, walk); };
    walk(root); return found;
}

function typeProbe() {
    return [
        'import { consumeNumber } from "./consume-number.js";',
        'import type { Parser } from "@mkbabb/parse-that/core";',
        'type Expected = Readonly<{ value: number; type: "integer" | "number"; sign: "+" | "-" | null }>;',
        'type IsAny<T> = 0 extends (1 & T) ? true : false;',
        'type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? ([keyof T] extends [never] ? true : false) : false;',
        'type Exact<A,B> = IsAny<A> extends true ? false : IsAny<B> extends true ? false : IsUnknown<A> extends true ? false : IsUnknown<B> extends true ? false : [A] extends [B] ? ([B] extends [A] ? true : false) : false;',
        'type Payload<T> = T extends Parser<infer V> ? V : never;',
        'type Assert<T extends true> = T;',
        'export type Root = Assert<Exact<typeof consumeNumber, Parser<Expected>>>;',
        'export type Leaf = Assert<Exact<Payload<typeof consumeNumber>, Expected>>;',
        '',
    ].join("\n");
}

function typeProof(candidatePath, sourceText) {
    const absoluteCandidate = resolve(candidatePath);
    const probePath = join(dirname(absoluteCandidate), ".consume-number-g7-probe.ts");
    const memory = new Map([[absoluteCandidate, sourceText], [probePath, typeProbe()]]);
    const capturedDisk = new Map();
    const options = {
        strict: true,
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        noEmit: true,
        types: [],
        lib: ["lib.es2022.d.ts"],
        skipLibCheck: false,
        verbatimModuleSyntax: true,
    };
    const host = ts.createCompilerHost(options, true);
    const textFor = (path) => {
        const absolute = resolve(path);
        if (memory.has(absolute)) return memory.get(absolute);
        if (capturedDisk.has(absolute)) return capturedDisk.get(absolute);
        if (!existsSync(absolute)) return undefined;
        const text = read(absolute).toString("utf8");
        capturedDisk.set(absolute, text);
        return text;
    };
    host.fileExists = (path) => memory.has(resolve(path)) || existsSync(resolve(path));
    host.readFile = (path) => textFor(path);
    host.getSourceFile = (path, languageVersion) => {
        const text = textFor(path);
        return text === undefined ? undefined : ts.createSourceFile(resolve(path), text, languageVersion, true);
    };
    host.realpath = (path) => resolve(path);
    const program = ts.createProgram({ rootNames: [absoluteCandidate, probePath], options, host });
    const diagnostics = ts.getPreEmitDiagnostics(program);
    if (diagnostics.length !== 0) {
        const text = diagnostics.map((item) => `TS${item.code}: ${ts.flattenDiagnosticMessageText(item.messageText, "\n")}`).join("\n");
        fail(`strict captured-source type proof failed:\n${text}`);
    }
    for (const source of program.getSourceFiles()) {
        const expected = textFor(source.fileName);
        if (expected === undefined || source.text !== expected) fail(`compiler source is not the captured text: ${source.fileName}`);
    }
    for (const [path, text] of capturedDisk) if (read(path).toString("utf8") !== text) fail(`compiler input changed during proof: ${path}`);
    const candidate = program.getSourceFile(absoluteCandidate);
    const symbol = candidate === undefined ? undefined : program.getTypeChecker().getSymbolAtLocation(candidate);
    const exports = symbol === undefined ? [] : program.getTypeChecker().getExportsOfModule(symbol);
    if (exports.length !== 1 || exports[0].getName() !== "consumeNumber") fail("checker export surface is not exactly consumeNumber");
    return { diagnostics: 0, compiler_sources: program.getSourceFiles().length };
}

function treeIdentity(root) {
    const files = [];
    const walk = (dir) => {
        for (const name of readdirSync(dir).sort((a, b) => Buffer.from(a).compare(Buffer.from(b)))) {
            const path = join(dir, name); const stat = statSync(path);
            if (stat.isDirectory()) walk(path);
            else if (stat.isFile()) { const bytes = read(path); files.push({ path: relative(root, path).split(sep).join("/"), ...identity(bytes) }); }
        }
    };
    walk(root);
    return sha256(Buffer.from(files.map((row) => `${row.sha256} ${row.bytes} ${row.path}\n`).join("")));
}

function syntheticReviews(expected, manifestIdentity, reviewInputSha) {
    const axis = () => ({ verdict: "ACCEPT", findings: ["substantive evidence"] });
    const make = (id) => ({
        feature_id: featureId, generation, review_id: id, scope, verdict: "ACCEPT",
        identity: { reviewer_id: `reviewer-${id}`, role: `boundary-${id}`, served_model: "model", reasoning_effort: "high", independent: true, candidate_author: false, root_adjudicator: false, peer_review_access: false, hidden_plaintext_or_key_access: false },
        model_receipt: { served_model: "model", input_manifest_sha256: manifestIdentity.sha256, review_input_sha256: reviewInputSha, commands: ["self-check"], closed_at: "2026-07-22T00:00:00.000Z" },
        subject: expected,
        three_altitude_findings: {
            total_tranche: { sequencing: axis(), denominator: axis(), boundary: axis() },
            feature_cell: { correctness: axis(), result: axis(), diagnostics: axis(), limits: axis(), hostility: axis(), composition: axis() },
            author_admission_and_tooling: { review_integrity: axis(), holdout_integrity: axis(), provenance: axis(), topology: axis(), benchmark: axis(), owner_law: axis() },
        }, evidence: ["self-check evidence"], defects: [],
        credit: { feature: 0, parser: 0, candidate: 0, benchmark: 0, integration: 0, production: 0 },
    });
    return [make("A"), make("B")];
}

function expectReject(fn, label) {
    try { fn(); } catch { return; }
    fail(`negative control did not reject: ${label}`);
}

function topologyControls() {
    const prefix = 'import { all, any, dispatch, regex, string } from "@mkbabb/parse-that/core";\nimport type { ConsumeNumberParser } from "./contract.js";\n';
    const h = `${prefix}export const consumeNumber: ConsumeNumberParser = regex(/[+-]?(?:[0-9]*\\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/).map((raw) => ({ value: Number(raw), type: raw.includes(".") ? "number" : "integer", sign: raw.startsWith("+") ? "+" : raw.startsWith("-") ? "-" : null }));\n`;
    const b = `${prefix}export const consumeNumber: ConsumeNumberParser = all(any(regex(/[+-]?[0-9]+/), all(regex(/[+-]?[0-9]*/), regex(/\\.[0-9]+/))), any(regex(/[eE][+-]?[0-9]+/), regex(/(?!)a/))).map(([mantissa, exponent]) => ({ value: Number([mantissa, exponent].join("")), type: "number", sign: null }));\n`;
    const s = `${prefix}export const consumeNumber: ConsumeNumberParser = all(any(string("+"), string("-"), string("."), string("0")), any(regex(/[0-9]+/), regex(/\\.[0-9]+/))).map(([head, tail]) => ({ value: Number([head, tail].join("")), type: "number", sign: null }));\n`;
    const d = `${prefix}export const consumeNumber: ConsumeNumberParser = dispatch({ "+-": regex(/[+-][0-9]+/), ".": regex(/\\.[0-9]+/), "0-9": regex(/[0-9]+/) }).map((raw) => ({ value: Number(raw), type: raw.includes(".") ? "number" : "integer", sign: raw.startsWith("+") ? "+" : raw.startsWith("-") ? "-" : null }));\n`;
    for (const [seat, source] of Object.entries({ h, b, s, d })) assertTopology(source, seat);
    for (const seat of ["b", "s", "d"]) {
        const dead = `${prefix}const dead = ${seat === "d" ? 'dispatch({ "+": string("+") })' : seat === "b" ? 'all(any(string("+"), string("-")), any(string("."), string("0")))' : 'all(any(string("+"), string("-"), string("."), string("0")), any(string("1"), string("2")))'};\n${h.slice(prefix.length)}`;
        expectReject(() => assertTopology(dead, seat), `${seat} dead-topology bypass`);
    }
    expectReject(() => assertTopology(h.replace("regex(/[+-]?", "regex: rx } = { regex };\nexport const deadAlias = rx;\nregex(/[+-]?"), "h"), "alias injection");
    if (topologyDenylist.size !== 3) fail("recorded bypass denylist drift");
    const currentLineage = parseJson(read(join(cellRoot, "lineage.json")), "G7 lineage");
    validateHLineage(currentLineage);
    const g6LineageBytes = read(resolveBound("../g6/lineage.json"));
    const g6LineageIdentity = identity(g6LineageBytes);
    if (g6LineageIdentity.sha256 !== "303768d9829b47ec0c32c14516eaa264cc6fecfd204c75f9a353759c2d121d68" || g6LineageIdentity.bytes !== 3724 || !falseLineageDenylist.has(g6LineageIdentity.sha256) || falseLineageDenylist.size !== 1) fail("recorded G6 false H lineage identity drift");
    const g6FalseLineage = parseJson(g6LineageBytes, "G6 false H lineage");
    expectReject(() => verifyNoExcludedHAncestry(g6FalseLineage), "G6 false H lineage token/lexeme source");
    return { h, b, s, d };
}

function selfCheck() {
    verifySchemas();
    const { lineageIdentity } = verifyFeatureAndLineage();
    const formation = verifyFormation();
    const topologySources = topologyControls();
    typeProof(join(cellRoot, "consume-number.ts"), topologySources.h);
    const fake = (char, bytes = 10) => ({ sha256: char.repeat(64), bytes });
    const expected = { formation: formation.receiptIdentity, precursor_closure_sha256: formation.receipt.precursor_closure_sha256, holdout_receipt: fake("b"), holdout_ciphertext: fake("c") };
    const manifestIdentity = fake("d", 100);
    const reviewInputSha = "e".repeat(64);
    const reviewJson = syntheticReviews(expected, manifestIdentity, reviewInputSha);
    for (const review of reviewJson) validateReview(review, review.review_id, expected, manifestIdentity, reviewInputSha);
    expectReject(() => validateReview({ feature_id: featureId, generation, review_id: "A", scope, verdict: "ACCEPT" }, "A", expected, manifestIdentity, reviewInputSha), "content-free ACCEPT review");
    const blocked = structuredClone(reviewJson[0]); blocked.defects.push({ id: "x", severity: "BLOCKER", summary: "x", evidence: ["x"], required_repair: "x" });
    expectReject(() => validateReview(blocked, "A", expected, manifestIdentity, reviewInputSha), "ACCEPT with blocker");
    const reviewRows = reviewJson.map((json, index) => ({ json, path: `reviews/challenge-${index === 0 ? "a" : "b"}.json`, bytes: Buffer.from(JSON.stringify(json)), get identity() { return identity(this.bytes); } }));
    const rootInputSha = sha256(Buffer.from(JSON.stringify({ input_manifest_sha256: manifestIdentity.sha256, challenges: reviewRows.map((item) => ({ id: item.json.review_id, sha256: item.identity.sha256, bytes: item.identity.bytes })) })));
    const root = {
        feature_id: featureId, generation, scope, verdict: "ACCEPT",
        identity: { root_id: "root", reviewer_id: "reviewer-root", served_model: "model", reasoning_effort: "high", independent: true, candidate_author: false, challenge_reviewer: false, hidden_plaintext_or_key_access: false },
        model_receipt: { served_model: "model", input_manifest_sha256: manifestIdentity.sha256, root_input_sha256: rootInputSha, commands: ["self-check"], closed_at: "2026-07-22T00:00:00.000Z" },
        subject: expected,
        challenges: reviewRows.map((item) => ({ id: item.json.review_id, reviewer_id: item.json.identity.reviewer_id, path: item.path, sha256: item.identity.sha256, bytes: item.identity.bytes, verdict: item.json.verdict })),
        three_altitude_findings: { total_tranche: { verdict: "ACCEPT", findings: ["x"] }, feature_cell: { verdict: "ACCEPT", findings: ["x"] }, author_admission_and_tooling: { verdict: "ACCEPT", findings: ["x"] } },
        evidence: ["x"], union_blockers: [], credit: { feature: 0, parser: 0, candidate: 0, benchmark: 0, integration: 0, production: 0 },
    };
    validateRoot(root, expected, manifestIdentity, reviewRows);
    const reused = structuredClone(root); reused.identity.reviewer_id = "reviewer-A";
    expectReject(() => validateRoot(reused, expected, manifestIdentity, reviewRows), "root identity reuse");
    const plaintext = Buffer.from("0123456789");
    const decoded = Buffer.concat([Buffer.from("VPI7CN1\0", "ascii"), Buffer.alloc(12), Buffer.alloc(16), plaintext]);
    const ciphertext = Buffer.from(`${decoded.toString("base64")}\n`);
    const holdout = {
        feature_id: featureId, generation, status: "SEALED_PRE_AUTHOR_CIPHERTEXT_ONLY_ZERO_FEATURE_CREDIT", corpus_id: "12345678-1234-4234-9234-123456789abc",
        precursor: { formation: formation.receiptIdentity, rows: formation.rows.length, closure_sha256: formation.receipt.precursor_closure_sha256 },
        plaintext_commitment: identity(plaintext), ciphertext: { path: "holdout-ciphertext.b64", ...identity(ciphertext), encoding: "base64-with-final-lf", decoded_envelope_bytes: decoded.length },
        envelope: { algorithm: "AES-256-GCM", magic_ascii_nul: "VPI7CN1\u0000", magic_bytes: 8, nonce_bytes: 12, tag_bytes: 16, aad: { feature_id: featureId, generation, corpus_id: "12345678-1234-4234-9234-123456789abc", formation_sha256: formation.receiptIdentity.sha256, precursor_closure_sha256: formation.receipt.precursor_closure_sha256, plaintext_sha256: identity(plaintext).sha256, plaintext_bytes: plaintext.length } },
        coverage: { case_count: 8, unique_case_ids: 8, categories: ["positive", "negative", "boundary", "offset", "diagnostics", "hostile", "binary64", "composition"], public_case_ids_sha256: "1".repeat(64), generator_sha256: "2".repeat(64) },
        anti_duplication: { duplicate_ids: 0, duplicate_cases: 0, public_exact_duplicates: 0, cross_generation_exact_duplicates: 0 },
        absence_freshness: { candidate_sources_existed: false, candidate_sources_accessed: false, plaintext_workspace_files: 0, key_workspace_files: 0, prior_secret_material_reused: false, fresh_key: true, fresh_nonce: true, fresh_corpus_id: true }, credit: "ZERO_SEALING_ONLY",
    };
    validateHoldout(holdout, ciphertext, formation);
    const stale = structuredClone(holdout); stale.status = "SEALED";
    expectReject(() => validateHoldout(stale, ciphertext, formation), "under-bound holdout status");
    const author = {
        feature_id: featureId, generation, seat: "h", author_id: "author-h", served_model: "model", reasoning_effort: "high", independent: true, peer_source_access: false,
        admission: { admitted_manifest_sha256: "3".repeat(64), pre_author_receipt_sha256: "4".repeat(64), formation_sha256: formation.receiptIdentity.sha256 },
        candidate: { isolated_root_sha256: "5".repeat(64), source_path: "h/overlay/grammar/css/l4/value-unit/consume-number.ts", source_sha256: "6".repeat(64), source_bytes: 10 },
        commands: [{ command: "check", exit_code: 0 }], closed_at: "2026-07-22T00:00:00.000Z",
        construction: { parse_that_apis: ["regex", "map"], loc: 4, backtracking_shape: "one anchored terminal", material_intermediate_allocations: ["semantic leaf"], known_compromises: [] },
        provenance: { lineage_sha256: lineageIdentity.sha256, seat_input_sha256s: parseJson(read(join(cellRoot, "lineage.json")), "lineage").seats.h.inputs.map((item) => item.sha256), peer_design_notes_accessed: false, candidate_root_isolated: true }, credit: "ZERO_AUTHOR_RECEIPT_ONLY",
    };
    validateAuthorReceipt(author, "h", { manifest: "3".repeat(64), preAuthor: "4".repeat(64), formation: formation.receiptIdentity.sha256, lineage: lineageIdentity.sha256, inputs: author.provenance.seat_input_sha256s });
    return { precursor_rows: formation.rows.length, precursor_closure_sha256: formation.receipt.precursor_closure_sha256, topology_negative_controls: 8, schemas: Object.keys(schemaIds).length };
}

function preAuthor(manifestPath, closedAt = new Date().toISOString(), allowExistingCandidates = false) {
    const formation = verifyFormation();
    verifySchemas(); verifyFeatureAndLineage(); topologyControls();
    if (!allowExistingCandidates && existsSync(join(cellRoot, "candidates"))) fail("candidates directory exists before author admission");
    const manifestBytes = read(resolve(manifestPath));
    const manifest = parseJson(manifestBytes, "boundary manifest");
    exactKeys(manifest, ["feature_id", "generation", "status", "formation", "precursor_closure_sha256", "holdout_receipt", "holdout_ciphertext", "review_paths", "root_path", "review_input_sha256"], "boundary manifest");
    if (manifest.feature_id !== featureId || manifest.generation !== generation || manifest.status !== "OWNER_SEALED_BOUNDARY_INPUT") fail("boundary manifest identity/status mismatch");
    sameIdentity(manifest.formation, formation.receiptIdentity, "manifest formation");
    if (manifest.precursor_closure_sha256 !== formation.receipt.precursor_closure_sha256) fail("manifest precursor closure mismatch");
    const manifestIdentity = identity(manifestBytes);
    const receiptBytes = read(join(cellRoot, manifest.holdout_receipt.path));
    const ciphertextBytes = read(join(cellRoot, manifest.holdout_ciphertext.path));
    sameIdentity(manifest.holdout_receipt, identity(receiptBytes), "manifest holdout receipt");
    sameIdentity(manifest.holdout_ciphertext, identity(ciphertextBytes), "manifest holdout ciphertext");
    validateHoldout(parseJson(receiptBytes, "holdout receipt"), ciphertextBytes, formation);
    const computedReviewInput = sha256(Buffer.from(JSON.stringify({ formation: formation.receiptIdentity, precursor_closure_sha256: formation.receipt.precursor_closure_sha256, holdout_receipt: identity(receiptBytes), holdout_ciphertext: identity(ciphertextBytes) })));
    if (manifest.review_input_sha256 !== computedReviewInput) fail("boundary manifest review input digest mismatch");
    if (JSON.stringify(manifest.review_paths) !== JSON.stringify(["reviews/challenge-a.json", "reviews/challenge-b.json"]) || manifest.root_path !== "root-gestalt.json") fail("boundary manifest review/root paths mismatch");
    const expected = { formation: formation.receiptIdentity, precursor_closure_sha256: formation.receipt.precursor_closure_sha256, holdout_receipt: identity(receiptBytes), holdout_ciphertext: identity(ciphertextBytes) };
    const reviews = manifest.review_paths.map((path, index) => {
        const bytes = read(join(cellRoot, path)); const json = parseJson(bytes, path);
        validateReview(json, index === 0 ? "A" : "B", expected, manifestIdentity, computedReviewInput);
        return { path, bytes, json, identity: identity(bytes) };
    });
    if (reviews[0].json.identity.reviewer_id === reviews[1].json.identity.reviewer_id) fail("boundary reviewer identities reused");
    const rootBytes = read(join(cellRoot, manifest.root_path));
    const root = parseJson(rootBytes, "root gestalt");
    validateRoot(root, expected, manifestIdentity, reviews);
    if (reviews.some((item) => item.json.verdict !== "ACCEPT") || root.verdict !== "ACCEPT") fail("boundary admission did not unanimously ACCEPT");
    return {
        feature_id: featureId, generation, status: "AUTHORS_MAY_BE_INVITED", manifest: manifestIdentity, formation: formation.receiptIdentity,
        precursor_closure_sha256: formation.receipt.precursor_closure_sha256, holdout_receipt: identity(receiptBytes), holdout_ciphertext: identity(ciphertextBytes),
        challenges: reviews.map((item) => ({ id: item.json.review_id, reviewer_id: item.json.identity.reviewer_id, sha256: item.identity.sha256, bytes: item.identity.bytes, verdict: item.json.verdict })),
        root_gestalt: { reviewer_id: root.identity.reviewer_id, ...identity(rootBytes), verdict: root.verdict }, candidates_absent: true,
        closed_at: closedAt, credit: "ZERO_AUTHOR_INVITATION_ONLY",
    };
}

function fourSeat(candidateRoot, receiptPath, expectedReceiptSha) {
    hash(expectedReceiptSha, "expected pre-author receipt hash");
    const formation = verifyFormation();
    const { lineage, lineageIdentity } = verifyFeatureAndLineage();
    const receiptBytes = read(resolve(receiptPath));
    if (sha256(receiptBytes) !== expectedReceiptSha) fail("pre-author receipt hash mismatch");
    const pre = parseJson(receiptBytes, "pre-author receipt"); validatePreAuthorReceipt(pre);
    if (pre.formation.sha256 !== formation.receiptIdentity.sha256 || pre.precursor_closure_sha256 !== formation.receipt.precursor_closure_sha256) fail("pre-author receipt no longer matches precursor");
    const manifestPath = join(cellRoot, "manifest.json");
    const manifestBytes = read(manifestPath);
    if (sha256(manifestBytes) !== pre.manifest.sha256 || manifestBytes.length !== pre.manifest.bytes) fail("pre-author receipt manifest is absent or drifted");
    const reproduced = preAuthor(manifestPath, pre.closed_at, true);
    if (JSON.stringify(reproduced) !== JSON.stringify(pre)) fail("pre-author receipt is not the exact successful admission result");
    const authorIds = []; const sourceHashes = [];
    for (const seat of seats) {
        const seatRoot = resolve(candidateRoot, seat);
        const sourcePath = join(seatRoot, "overlay/grammar/css/l4/value-unit/consume-number.ts");
        const sourceBytes = read(sourcePath); const sourceIdentity = identity(sourceBytes);
        const author = parseJson(read(join(seatRoot, "author-receipt.json")), `${seat} author receipt`);
        const inputs = lineage.seats[seat].inputs.map((item) => item.sha256);
        validateAuthorReceipt(author, seat, { manifest: pre.manifest.sha256, preAuthor: expectedReceiptSha, formation: formation.receiptIdentity.sha256, lineage: lineageIdentity.sha256, inputs });
        if (author.candidate.source_sha256 !== sourceIdentity.sha256 || author.candidate.source_bytes !== sourceIdentity.bytes || author.candidate.isolated_root_sha256 !== treeIdentity(seatRoot)) fail(`${seat} candidate identity mismatch`);
        let contractModule = relative(dirname(sourcePath), join(cellRoot, "contract.js")).split(sep).join("/");
        if (!contractModule.startsWith(".")) contractModule = `./${contractModule}`;
        assertTopology(sourceBytes.toString("utf8"), seat, contractModule);
        typeProof(sourcePath, sourceBytes.toString("utf8"));
        authorIds.push(author.author_id); sourceHashes.push(sourceIdentity.sha256);
    }
    if (new Set(authorIds).size !== seats.length || new Set(sourceHashes).size !== seats.length) fail("author IDs and candidate source hashes must be pairwise distinct");
    return { status: "FOUR_SEATS_ADMITTED_FOR_REVIEW_ONLY", pre_author_receipt_sha256: expectedReceiptSha, candidates: Object.fromEntries(seats.map((seat, index) => [seat, sourceHashes[index]])), credit: "ZERO_PENDING_FIVE_PLUS_THREE" };
}

const [command, ...args] = process.argv.slice(2);
try {
    let output;
    if (command === "--self-check") output = selfCheck();
    else if (command === "--negative-controls") output = { negative_controls: topologyControls() ? "PASS" : "FAIL", recorded_bypass_digests: [...topologyDenylist], recorded_false_lineage_digests: [...falseLineageDenylist] };
    else if (command === "--assay-stdin") {
        const seat = args[0]; if (!seat) fail("--assay-stdin requires a seat");
        const chunks = []; for await (const chunk of process.stdin) chunks.push(chunk);
        output = assertTopology(Buffer.concat(chunks).toString("utf8"), seat);
    } else if (command === "--pre-author") { if (!args[0]) fail("--pre-author requires manifest path"); output = preAuthor(args[0]); }
    else if (command === "--four-seat") { if (args.length !== 3) fail("--four-seat requires candidate root, receipt path, and exact receipt SHA-256"); output = fourSeat(args[0], args[1], args[2]); }
    else fail("usage: --self-check | --negative-controls | --assay-stdin <seat> | --pre-author <manifest> | --four-seat <root> <receipt> <sha256>");
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
}
