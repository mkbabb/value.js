import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { census } from "./source-census.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const identity = (path) => { const bytes = readFileSync(path); return { sha256: sha256(bytes), bytes: bytes.length }; };
const fail = (message) => { throw new Error(message); };
const same = (actual, expected, label) => {
    if (actual.sha256 !== expected.sha256 || actual.bytes !== expected.bytes) fail(`${label} identity mismatch`);
};
const json = (path) => JSON.parse(readFileSync(path, "utf8"));
const local = (path) => isAbsolute(path) ? path : resolve(root, path);
const checkBound = (row, label = row.path) => { const path = local(row.path); same(identity(path), row, label); return path; };
const readBound = (row, label = row.path) => json(checkBound(row, label));
const expectedRows = [
    "author-preflight-plan.json", "author-prompts/b.txt", "author-prompts/d.txt", "author-prompts/h.txt", "author-prompts/s.txt",
    "author-task-witness.schema.json", "feature-row.json", "lifecycle-artifacts.schema.json", "negative-controls.ts",
    "peer-corpus.json", "peer-harness.mjs", "peer-manifest.json", "peer-resolver.mjs", "peer-worker.mjs", "phase-validator.mjs",
    "probes/b.ts", "probes/d.ts", "probes/h.ts", "probes/s.ts", "public-corpus.json", "public-harness.mjs", "public-worker.ts",
    "runtime-closure.json", "runtime-closure.mjs", "seat-packets/b.json", "seat-packets/d.json", "seat-packets/h.json", "seat-packets/s.json",
    "source-census.json", "source-census.mjs"
];

function validateReceipt() {
    const receiptPath = local("formation-receipt.json");
    const receipt = json(receiptPath);
    if (receipt.schema !== "value.pi.syntax-consume-number.g11.formation/v1" || receipt.feature_id !== "SYNTAX-CONSUME-NUMBER" || receipt.generation !== 11 || receipt.status !== "FROZEN_PUBLIC_FORMATION_NO_HOLDOUT") fail("formation header mismatch");
    if (JSON.stringify(receipt.rows.map((row) => row.path).sort()) !== JSON.stringify(expectedRows)) fail("formation row set mismatch");
    for (const row of receipt.rows) {
        const path = local(row.path); same(identity(path), row, `formation ${row.path}`);
        if ((lstatSync(path).mode & 0o222) !== 0) fail(`formation row remains writable: ${row.path}`);
    }
    const data = receipt.rows.slice().sort((a, b) => a.path.localeCompare(b.path)).map((row) => `${row.path}\0${row.sha256}\0${row.bytes}\n`).join("");
    if (receipt.row_count !== expectedRows.length || receipt.closure_sha256 !== sha256(Buffer.from(data))) fail("formation closure mismatch");
    return { path: "formation-receipt.json", ...identity(receiptPath), closure_sha256: receipt.closure_sha256 };
}

function validateFeatureAndInputs() {
    const feature = json(local("feature-row.json"));
    if (feature.generation !== 11 || feature.candidate_phase !== "ONLY_AFTER_PHASE_VALIDATOR_OUTPUTS_AUTHORS_MAY_WRITE") fail("feature phase mismatch");
    readBound(feature.semantic_contract, "semantic contract");
    const predecessor = readBound(feature.terminal_predecessor, "G10 root");
    if (predecessor.verdict !== "TERMINAL_REJECT_BEFORE_AUTHORS") fail("G10 terminal authority mismatch");
    const corpus = json(local("public-corpus.json"));
    readBound(corpus.inherited.public_cases, "G5 public cases"); readBound(corpus.inherited.controls, "G8 controls");
}

function validatePreflightPlan() {
    const plan = json(local("author-preflight-plan.json"));
    if (plan.tasks.length !== 4 || plan.preflight_output !== "READY_NO_WRITES" || plan.admission_output !== "AUTHORS_MAY_WRITE") fail("preflight plan mismatch");
    for (const row of plan.common_inputs) checkBound(row, `common input ${row.path}`);
    const seats = [];
    for (const task of plan.tasks) {
        seats.push(task.seat); checkBound(task.prompt, `${task.seat} prompt`); readBound(task.packet, `${task.seat} packet`); checkBound(task.lineage, `${task.seat} lineage`);
        if (task.canonical_task_id !== `/root/g11_author_${task.seat}` || task.isolated_root !== `candidates/${task.seat}`) fail(`${task.seat} author identity/root mismatch`);
    }
    if (seats.sort().join("") !== "bdhs") fail("author seat set mismatch");
    return plan;
}

function validateRuntimeAndExecutableProofs() {
    const runtime = spawnSync(process.execPath, [local("runtime-closure.mjs")], { cwd: root, encoding: "utf8", timeout: 10000 });
    if (runtime.status !== 0 || runtime.signal !== null) fail(`runtime closure replay failed: ${runtime.stderr}`);
    if (JSON.stringify(JSON.parse(runtime.stdout)) !== JSON.stringify(json(local("runtime-closure.json")))) fail("runtime/toolchain closure drift");
    const peerManifest = json(local("peer-manifest.json"));
    for (const row of [peerManifest.worker, peerManifest.harness, peerManifest.resolver, peerManifest.corpus, peerManifest.runtime]) checkBound(row, `peer ${row.path}`);
    const peers = spawnSync(process.execPath, [local("peer-harness.mjs")], { cwd: root, encoding: "utf8", timeout: 10000 });
    if (peers.status !== 0 || peers.signal !== null) fail(`exact peer execution failed: ${peers.stderr}`);
    const peerResult = JSON.parse(peers.stdout);
    if (peerResult.execution !== "EXACT_PINNED_DOORS_BEFORE_NORMALIZATION" || peerResult.common.length === 0) fail("peer lane derivation mismatch");
    const publicRun = spawnSync(process.execPath, [local("public-harness.mjs"), "--born-red"], { cwd: root, encoding: "utf8", timeout: 30000 });
    if (publicRun.status !== 0 || publicRun.signal !== null) fail(`public born-RED proof failed: ${publicRun.stderr}`);
    const publicResult = JSON.parse(publicRun.stdout);
    if (publicResult.status !== "BORN_RED" || publicResult.candidates !== 0 || publicResult.negative_controls_rejected !== 3 || publicResult.topology_probes !== 4) fail("public harness scope mismatch");
    const frozenCensus = json(local("source-census.json")); const replay = census();
    if (JSON.stringify(frozenCensus) !== JSON.stringify(replay)) fail("regular/importable/executable/symlink census drift");
    for (const [seat, candidate] of Object.entries(replay.candidate_roots)) if (candidate.state !== "ABSENT") fail(`candidate root exists before admission: ${seat}`);
    return { public: publicResult, peers: { cases: peerResult.cases, common: peerResult.common }, runtime: { packages: json(local("runtime-closure.json")).packages, package_rows: json(local("runtime-closure.json")).package_row_count }, census: { active_rows: replay.active_root.rows.length, candidate_roots_absent: 4 } };
}

function arg(name) {
    const index = process.argv.indexOf(name); if (index < 0 || process.argv[index + 1] === undefined) fail(`missing ${name}`); return resolve(process.argv[index + 1]);
}
function boundBy(holder, key, path, label) {
    const row = holder[key]; if (!row) fail(`${label} missing ${key}`); same(identity(path), row, label);
}
function validateChallenged(formation) {
    const holdoutPath = arg("--holdout-receipt"); const subjectPath = arg("--subject"); const reviewAPath = arg("--review-a"); const reviewBPath = arg("--review-b"); const rootPath = arg("--root");
    const holdout = json(holdoutPath); boundBy(holdout, "formation", local("formation-receipt.json"), "holdout formation");
    const subject = json(subjectPath); boundBy(subject, "formation", local("formation-receipt.json"), "subject formation"); boundBy(subject, "holdout_receipt", holdoutPath, "subject holdout");
    if (subject.holdout_ciphertext) same(identity(local(subject.holdout_ciphertext.path)), subject.holdout_ciphertext, "subject ciphertext");
    const reviewA = json(reviewAPath); const reviewB = json(reviewBPath); boundBy(reviewA, "subject", subjectPath, "review A subject"); boundBy(reviewB, "subject", subjectPath, "review B subject");
    if (reviewA.verdict !== "ACCEPT" || reviewB.verdict !== "ACCEPT") fail("both boundary challenges must ACCEPT");
    const rootVerdict = json(rootPath); boundBy(rootVerdict, "subject", subjectPath, "root subject");
    const expectedReviews = [{ path: reviewAPath, ...identity(reviewAPath) }, { path: reviewBPath, ...identity(reviewBPath) }];
    if (!Array.isArray(rootVerdict.challenges) || rootVerdict.challenges.length !== 2) fail("root challenge set mismatch");
    for (const expected of expectedReviews) if (!rootVerdict.challenges.some((row) => row.sha256 === expected.sha256 && row.bytes === expected.bytes)) fail("root does not bind both challenges");
    if (rootVerdict.verdict !== "ACCEPT_BOUNDARY") fail("root did not accept boundary");
    return { holdout: identity(holdoutPath), subject: identity(subjectPath), reviews: expectedReviews.map(({ sha256: hash, bytes }) => ({ sha256: hash, bytes })), root: { path: rootPath, ...identity(rootPath) } };
}

function validateAuthorWitness(plan, formation, accepted) {
    const witnessPath = arg("--author-witness"); const witness = json(witnessPath);
    if (witness.schema !== "value.pi.syntax-consume-number.g11.author-task-witness/v1" || witness.verdict !== "PREFLIGHT_TASKS_AUTHENTICATED_NO_WRITES") fail("author witness header mismatch");
    same(identity(local("formation-receipt.json")), witness.formation, "author witness formation"); same(accepted.root, witness.accepted_root, "author witness root");
    const external = witness.root_external_receipt_adjudication;
    if (external?.external_tool !== "codex.collaboration.spawn_agent" || external.tool_receipts_observed_outside_workspace !== true || external.content_hashes_do_not_prove_task_identity !== true) fail("external actor receipt adjudication missing");
    if (!Array.isArray(witness.tasks) || witness.tasks.length !== 4) fail("author witness task count mismatch");
    for (const expected of plan.tasks) {
        const actual = witness.tasks.find((task) => task.seat === expected.seat);
        if (!actual || actual.canonical_task_id !== expected.canonical_task_id || actual.isolated_root !== expected.isolated_root || actual.no_writes !== true || actual.no_peer_access !== true || !actual.preflight_output.startsWith("READY_NO_WRITES") || !actual.served_model || !actual.served_model_receipt || !actual.external_creation_receipt) fail(`${expected.seat} external preflight witness incomplete`);
        same(identity(local(expected.prompt.path)), actual.prompt, `${expected.seat} witness prompt`);
        const expectedInputs = [...plan.common_inputs, expected.packet, expected.lineage];
        if (actual.inputs.length !== expectedInputs.length) fail(`${expected.seat} witness input count mismatch`);
        for (const row of expectedInputs) if (!actual.inputs.some((input) => input.sha256 === row.sha256 && input.bytes === row.bytes && input.path === row.path)) fail(`${expected.seat} witness input missing ${row.path}`);
    }
    return { path: witnessPath, ...identity(witnessPath), actor_identity_basis: "ROOT_VERIFIED_EXTERNAL_TOOL_RECEIPTS_NOT_CONTENT_HASHES" };
}

try {
    const phaseIndex = process.argv.indexOf("--phase"); const phase = phaseIndex < 0 ? "formation" : process.argv[phaseIndex + 1];
    if (!["formation", "challenged", "admit"].includes(phase)) fail("phase must be formation, challenged, or admit");
    const formation = validateReceipt(); validateFeatureAndInputs(); const plan = validatePreflightPlan(); const proofs = validateRuntimeAndExecutableProofs();
    if (phase === "formation") {
        for (const name of ["holdout-receipt.json", "holdout-ciphertext.b64", "reviewed-subject.json", "root-gestalt.json", "author-task-witness.json", "reviews", "candidates"]) if (existsSync(local(name))) fail(`later-phase artifact exists during formation: ${name}`);
        process.stdout.write(`${JSON.stringify({ status: "PASS", phase: "FROZEN_FORMATION_BORN_RED", formation, proofs, candidates: 0, holdout: 0, credit: 0 }, null, 2)}\n`);
    } else {
        const accepted = validateChallenged(formation);
        if (phase === "challenged") process.stdout.write(`${JSON.stringify({ status: "PASS", phase: "BOUNDARY_ACCEPTED_AUTHORS_STILL_FORBIDDEN", formation, accepted, proofs, credit: 0 }, null, 2)}\n`);
        else {
            const witness = validateAuthorWitness(plan, formation, accepted);
            process.stdout.write(`${JSON.stringify({ status: "AUTHORS_MAY_WRITE", phase: "EXTERNAL_PREFLIGHT_JOINED", formation, accepted, witness, proofs, candidate_roots: plan.tasks.map(({ seat, isolated_root }) => ({ seat, isolated_root })), credit: 0 }, null, 2)}\n`);
        }
    }
} catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`); process.exitCode = 1;
}
