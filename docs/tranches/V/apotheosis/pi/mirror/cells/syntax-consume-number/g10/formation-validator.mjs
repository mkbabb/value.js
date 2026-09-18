import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { census } from "./source-census.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const mirror = resolve(root, "../../..");
const packageRoot = resolve(mirror, "node_modules/@mkbabb/parse-that");
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const identity = (bytes) => ({ sha256: sha256(bytes), bytes: bytes.length });
const fail = (message) => { throw new Error(message); };
const same = (actual, expected, label) => {
    if (actual.sha256 !== expected.sha256 || actual.bytes !== expected.bytes) fail(`${label} identity mismatch`);
};
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const readBound = (path, expected, label = path) => {
    const bytes = readFileSync(path); same(identity(bytes), expected, label); return bytes;
};
const local = (path) => resolve(root, path);

const expectedFiles = [
    "author-roster.json", "correctness-harness.mjs", "correctness-worker.mjs", "feature-row.json",
    "formation-validator.mjs", "lineage-topologies.json", "peer-adapters.mjs", "peer-comparable-cases.json",
    "peer-manifest.json", "runtime-package-ledger.tsv", "source-census.json", "source-census.mjs",
];

function validateRuntimeLedger() {
    const text = readFileSync(local("runtime-package-ledger.tsv"), "utf8");
    const rows = text.split("\n").filter((line) => line && !line.startsWith("#")).map((line) => {
        const [sha256Value, bytesValue, path, extra] = line.split("\t");
        if (extra !== undefined || !/^[0-9a-f]{64}$/.test(sha256Value) || !/^\d+$/.test(bytesValue) || !path) fail("malformed runtime ledger row");
        return { sha256: sha256Value, bytes: Number(bytesValue), path };
    });
    const installed = [];
    const walk = (path) => {
        for (const name of readdirSync(path).sort()) {
            const absolute = join(path, name); const stat = lstatSync(absolute);
            if (stat.isSymbolicLink()) fail(`installed package contains unledgered symlink: ${absolute}`);
            if (stat.isDirectory()) walk(absolute);
            else if (stat.isFile()) installed.push(relative(packageRoot, absolute));
        }
    };
    walk(packageRoot); installed.sort();
    if (rows.length !== 65 || JSON.stringify(rows.map((row) => row.path)) !== JSON.stringify(installed)) fail("runtime package closure mismatch");
    for (const row of rows) same(identity(readFileSync(join(packageRoot, row.path))), row, `runtime ${row.path}`);
    const data = rows.map((row) => `${row.sha256}\t${row.bytes}\t${row.path}\n`).join("");
    if (sha256(Buffer.from(data)) !== "30deb3175219e9d2e1ebafc4033355c27dd931a913f84403255c7cd0b93b6bf5") fail("runtime data closure mismatch");
    const pkg = readJson(join(packageRoot, "package.json"));
    if (pkg.name !== "@mkbabb/parse-that" || pkg.version !== "1.0.0") fail("installed package identity mismatch");
    const lockBytes = readFileSync(resolve(mirror, "package-lock.json"));
    if (sha256(lockBytes) !== "489c5981ffa75d795cd3fae0e6d5a837b272ffec1633d862dba9c11a59e668b7") fail("package lock drift");
    const lock = JSON.parse(lockBytes); const row = lock.packages?.["node_modules/@mkbabb/parse-that"];
    if (row?.version !== "1.0.0" || row?.integrity !== "sha512-ygzF6JPb0OC2XRCeg/ywtNYgo2hKmZYGabaimObx0/czxH/8I2gF8obQjkWpPrXW8azOtt5x3RpnU5nZVEpY1Q==") fail("lock package row mismatch");
    return { files: rows.length, data_closure_sha256: sha256(Buffer.from(data)) };
}

function validateBoundary() {
    const row = readJson(local("feature-row.json"));
    if (row.feature_id !== "SYNTAX-CONSUME-NUMBER" || row.generation !== 10 || row.status !== "FROZEN_PREAUTHOR_FEATURE_ROW") fail("feature row generation/status mismatch");
    readBound(resolve(root, row.semantic_contract.path), row.semantic_contract, "G9 semantic contract");
    const contract = readJson(resolve(root, row.semantic_contract.path));
    if (contract.feature_id !== row.feature_id || contract.operation !== "At the current parse-that UTF-16 offset, consume one maximal CSS Syntax 3 number prefix and return its semantic number leaf.") fail("reused semantic contract mismatch");
    const topologies = readJson(local("lineage-topologies.json"));
    if (topologies.generation !== 10 || JSON.stringify(Object.keys(topologies.seats).sort()) !== JSON.stringify(["b", "d", "h", "s"])) fail("topology closure mismatch");
    const h = topologies.seats.h.source; const hBytes = readBound(resolve(root, h.path), h, "H historical source");
    const hLine = Buffer.from(hBytes.toString("utf8").split(/(?<=\n)/)[h.line - 1]); same(identity(hLine), { sha256: h.exact_lf_line_sha256, bytes: h.exact_lf_line_bytes }, "H exact line");
    const b = topologies.seats.b.source; const bBytes = readBound(b.path, b, "B BBNF source");
    const bLine = Buffer.from(bBytes.toString("utf8").split(/(?<=\n)/)[b.rule_line - 1]); same(identity(bLine), { sha256: b.exact_lf_rule_sha256, bytes: b.exact_lf_rule_bytes }, "B exact rule");
    const roster = readJson(local("author-roster.json"));
    const expected = ["h", "b", "s", "d"].map((seat) => [seat, `g10_author_${seat}`, `/root/g10_author_${seat}`]);
    if (roster.generation !== 10 || roster.external_witness?.formation_validator_claim !== "NONE" || JSON.stringify(roster.authors.map((author) => [author.seat, author.task_name, author.task_id])) !== JSON.stringify(expected)) fail("author roster/witness law mismatch");
}

function validatePeers() {
    const manifest = readJson(local("peer-manifest.json"));
    if (manifest.generation !== 10 || JSON.stringify(Object.keys(manifest.peers).sort()) !== JSON.stringify(["c14", "deposed", "live_regex"])) fail("peer manifest mismatch");
    readBound(local(manifest.adapter.path), manifest.adapter, "peer adapter");
    readBound(local(manifest.common_smoke_cases.path), manifest.common_smoke_cases, "peer cases");
    for (const [name, peer] of Object.entries(manifest.peers)) readBound(resolve(root, peer.source.path), peer.source, `${name} source`);
    readBound(resolve(root, manifest.historical_bench_receipt.path), manifest.historical_bench_receipt, "historical bench receipt");
    const run = spawnSync(process.execPath, [local("correctness-harness.mjs"), "--self-test"], { cwd: root, encoding: "utf8", timeout: 10000 });
    if (run.status !== 0 || run.signal !== null) fail(`correctness harness self-test failed: ${run.stderr}`);
    return JSON.parse(run.stdout);
}

function validateCensus() {
    const frozen = readJson(local("source-census.json")); const replay = census();
    if (JSON.stringify(frozen) !== JSON.stringify(replay)) fail("executable-source/symlink census drift");
    if (frozen.symlink_count !== 0) fail("preauthor roots contain a symlink");
    return { rows: frozen.row_count, sources: frozen.source_count, symlinks: frozen.symlink_count };
}

function validateFormationReceipt() {
    const receipt = readJson(local("formation-receipt.json"));
    if (receipt.feature_id !== "SYNTAX-CONSUME-NUMBER" || receipt.generation !== 10 || receipt.status !== "FROZEN_PUBLIC_FORMATION_PRE_HOLDOUT") fail("formation receipt mismatch");
    if (JSON.stringify(receipt.rows.map((row) => row.path).sort()) !== JSON.stringify(expectedFiles)) fail("formation local closure mismatch");
    for (const row of receipt.rows) readBound(local(row.path), row, `formation ${row.path}`);
    const closure = sha256(Buffer.from(receipt.rows.slice().sort((a, b) => a.path.localeCompare(b.path)).map((row) => `${row.path}\0${row.sha256}\0${row.bytes}\n`).join("")));
    if (receipt.row_count !== expectedFiles.length || receipt.closure_sha256 !== closure) fail("formation closure digest mismatch");
    if (receipt.candidate_count !== 0 || receipt.holdout_artifact_count !== 0 || receipt.credit !== "ZERO_PUBLIC_FORMATION_ONLY") fail("formation credit/count mismatch");
    return { sha256: sha256(readFileSync(local("formation-receipt.json"))), bytes: readFileSync(local("formation-receipt.json")).length, closure_sha256: closure };
}

try {
    for (const name of ["holdout-receipt.json", "holdout-ciphertext.b64", "reviewed-subject.json", "admission-envelope.json", "author-task-witness.json", "candidates", "reviews"]) if (existsSync(local(name))) fail(`later-phase artifact exists: ${name}`);
    const runtime = validateRuntimeLedger(); validateBoundary(); const peers = validatePeers(); const sources = validateCensus(); const formation = validateFormationReceipt();
    process.stdout.write(`${JSON.stringify({ status: "PASS", phase: "PUBLIC_FORMATION_PRE_HOLDOUT", formation, runtime, peers, sources, candidates: 0, actor_identity_claim: "NONE_MANUAL_EXTERNAL_WITNESS_REQUIRED" }, null, 2)}\n`);
} catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`); process.exitCode = 1;
}
