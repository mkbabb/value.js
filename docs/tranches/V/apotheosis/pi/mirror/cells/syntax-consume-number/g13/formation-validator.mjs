import { lstatSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileIdentity, mirror, root, runBounded, sha256 } from "./lib.mjs";

const fail = (message) => { throw new Error(message); };
const receiptPath = join(root, "formation-receipt.json");
const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
if (receipt.schema !== "value.pi.syntax-consume-number.g13.formation/v1" || receipt.generation !== 13 || receipt.status !== "FROZEN_PUBLIC_PREAUTHOR_FORMATION") fail("formation receipt header drift");
const lines = [];
for (const row of receipt.rows) {
    const path = join(root, row.path); const stat = lstatSync(path);
    if (!stat.isFile() || stat.isSymbolicLink()) fail(`formation row is not a regular file: ${row.path}`);
    const identity = fileIdentity(path);
    if (identity.sha256 !== row.sha256 || identity.bytes !== row.bytes || (stat.mode & 0o777) !== 0o444) fail(`formation row drift: ${row.path}`);
    lines.push(`${row.sha256}  ${row.bytes}  ${row.path}\n`);
}
if (receipt.rows.length !== receipt.row_count || sha256(lines.join("")) !== receipt.closure_sha256) fail("formation closure drift");
const receiptStat = lstatSync(receiptPath);
if (!receiptStat.isFile() || receiptStat.isSymbolicLink() || (receiptStat.mode & 0o777) !== 0o444) fail("formation receipt must be immutable regular bytes");

const common = ["contract.json", "public-corpus.json", "public-worker.ts", "public-harness.mjs", "candidate-closure.mjs", "candidate-ast-policy.mjs", "lib.mjs"];
const roles = { h: "whole-prefix-regex", b: "factorized-all-any", s: "staged-then", d: "first-character-dispatch" };
for (const [seat, role] of Object.entries(roles)) {
    const packet = JSON.parse(readFileSync(join(root, "seat-packets", `${seat}.json`), "utf8"));
    if (packet.seat !== seat || packet.role !== role || packet.candidate_root !== `candidates/${seat}` || packet.credit !== 0) fail(`seat packet drift: ${seat}`);
    if (packet.common_inputs.map((row) => row.path).join("\n") !== common.join("\n")) fail(`seat common inputs drift: ${seat}`);
    for (const row of packet.common_inputs) {
        const identity = fileIdentity(join(root, row.path));
        if (identity.sha256 !== row.sha256 || identity.bytes !== row.bytes) fail(`seat ${seat} common identity drift: ${row.path}`);
    }
}

for (const seat of Object.keys(roles)) {
    const result = await runBounded(process.execPath, [join(root, "candidate-closure.mjs"), "--preauthor", seat]);
    if (result.code !== 0 || result.stderr !== "" || JSON.parse(result.stdout).status !== "ABSENT") fail(`preauthor absence failed: ${seat}`);
}
const negativeControls = ["comment-markers", "constructed-recognizer", "computed-global", "computed-state", "h-suffix-broadening", "wrong-wrapper"];
for (const control of negativeControls) {
    const result = await runBounded(process.execPath, [join(root, "candidate-closure.mjs"), "--negative-control", control], { timeoutMs: 15000, maxBytes: 1048576 });
    const observation = result.code === 0 && result.stderr === "" ? JSON.parse(result.stdout) : null;
    if (result.timedOut || result.overflow || result.code !== 0 || result.stderr !== "" || observation?.status !== "REJECTED" || observation?.mechanism !== "TYPESCRIPT_AST_POLICY") fail(`negative control failed open: ${control} ${JSON.stringify(result)}`);
}
for (const seat of Object.keys(roles)) {
    const result = await runBounded(process.execPath, [join(root, "candidate-closure.mjs"), "--assay", seat], { timeoutMs: 15000, maxBytes: 1048576 });
    if (result.timedOut || result.overflow || result.code !== 0 || result.stderr !== "" || JSON.parse(result.stdout).status !== "ROOT_ASSAY_CLOSED_ZERO_CREDIT") fail(`candidate close assay failed: ${seat} ${JSON.stringify(result)}`);
}
for (const name of ["holdout-ciphertext.b64", "holdout-receipt.json", "holdout-reveal.json", "candidate-reviewed-subject.json"]) {
    try { lstatSync(join(root, name)); fail(`${name} exists before custodian phase`); } catch (error) { if (error.code !== "ENOENT") throw error; }
}

const authorHarnessText = ["public-harness.mjs", "public-worker.ts", "candidate-closure.mjs", "candidate-ast-policy.mjs", "lib.mjs"].map((name) => readFileSync(join(root, name), "utf8")).join("\n");
if (/root\/probe|root-check|peer-(?:worker|harness|corpus|expected)/.test(authorHarnessText)) fail("author harness transitively names root/peer assay material");
if (/hrtime|performance\.now|Date\.now/.test(authorHarnessText)) fail("timing gate leaked into preauthor/public harness");
for (const key of ["NODE_OPTIONS", "NODE_PATH", "TSX_TSCONFIG_PATH", "ESBUILD_BINARY_PATH"]) if (Object.hasOwn(process.env, key) && authorHarnessText.includes(`process.env.${key}`)) fail(`loader environment leak: ${key}`);

const commands = [
    [join(root, "public-corpus-generator.mjs"), "--verify", join(root, "public-corpus.json")],
    [join(root, "runtime-closure-generator.mjs"), "--verify", join(root, "runtime-closure.json")],
    [join(root, "peer-harness.mjs"), "--verify"],
    [join(root, "root-check.mjs")],
];
const evidence = [];
for (const args of commands) {
    const result = await runBounded(process.execPath, args, { timeoutMs: 15000, maxBytes: 1048576 });
    if (result.timedOut || result.overflow || result.code !== 0 || result.stderr !== "") fail(`formation executable failed: ${args[0]} ${JSON.stringify(result)}`);
    evidence.push(JSON.parse(result.stdout));
}
const tsc = join(mirror, "node_modules/typescript/bin/tsc");
const strict = await runBounded(process.execPath, [tsc, "-p", join(mirror, "tsconfig.apotheosis.json"), "--noEmit"], { cwd: mirror, timeoutMs: 15000, maxBytes: 1048576 });
if (strict.timedOut || strict.overflow || strict.code !== 0 || strict.stdout !== "" || strict.stderr !== "") fail(`strict TypeScript failed: ${JSON.stringify(strict)}`);

process.stdout.write(`${JSON.stringify({
    schema: "value.pi.syntax-consume-number.g13.formation-result/v1",
    status: "BOUNDARY_READY_FOR_TWO_PUBLIC_REVIEWS_NOT_AUTHORS",
    subject_sha256: fileIdentity(receiptPath).sha256,
    closure_sha256: receipt.closure_sha256,
    rows: receipt.row_count,
    candidates: 0,
    holdout: 0,
    timing_gates: 0,
    ast_negative_controls: negativeControls.length,
    strict_typescript: "PASS",
    executable_evidence: evidence,
    next: "Two exact public-byte reviews and root adjudication; on ACCEPT, independent custodian seals unrevealed holdout before root starts authors and records actual collaboration task IDs externally.",
    credit: 0,
})}\n`);
