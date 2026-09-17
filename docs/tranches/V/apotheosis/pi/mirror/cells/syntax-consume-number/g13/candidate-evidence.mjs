import { createDecipheriv } from "node:crypto";
import { chmodSync, lstatSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir, cpus, totalmem } from "node:os";
import { join, relative, resolve, sep } from "node:path";
import { buildBundle, fileIdentity, repo, root, runBounded, runBundle, sha256 } from "./lib.mjs";

const fail = (message) => { throw new Error(message); };
const rel = (path) => relative(repo, path).split(sep).join("/");
const mode = (stat) => (stat.mode & 0o777).toString(8).padStart(4, "0");
const canonical = (value) => value === null || typeof value !== "object"
    ? JSON.stringify(value)
    : Array.isArray(value)
        ? `[${value.map(canonical).join(",")}]`
        : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
const parseJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const seats = ["h", "b", "s", "d"];
const anchors = Object.freeze({
    formation: { path: "docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g13/formation-receipt.json", sha256: "51e8f1e46c62c2aae047179ac417fb763a10da4395602436b4793508d9549572", bytes: 7167, mode: "0444" },
    root_accept: { path: "docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g13/root-gestalt.json", sha256: "38383e09cfc2d788d6399cf06d0422af61e91efed72a26e88ecadfb23beaec09", bytes: 4946 },
    holdout_receipt: { path: "docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g13/holdout-receipt.json", sha256: "9d6e210c9489e082f514d096eb0ab470057e366c0e5e7446f27b19ee6164c47e", bytes: 4264, mode: "0444" },
    holdout_ciphertext: { path: "docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g13/holdout-ciphertext.b64", sha256: "4e6a09fae3ddecef0437abb694421d2fd80c7e05ca6f33fdc9399dee8db48671", bytes: 329665, mode: "0444" },
    holdout_reveal: { path: "docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g13/holdout-reveal.json", sha256: "47823ab2b89cb2f0dc17133dcb2a23dc3c84fe83829deefe50622a0cbeb1acb8", bytes: 6884, mode: "0444" },
    author_roster: { path: "docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g13/author-roster.json", sha256: "39cfb3cbdaa829b7b2a33b6234cad5325a5200f824294197119c383ebcedbe57", bytes: 2473, mode: "0444" },
});

function exactFile(claim, label) {
    const path = resolve(repo, claim.path);
    const stat = lstatSync(path);
    if (!stat.isFile() || stat.isSymbolicLink()) fail(`${label} is not a regular non-symlink file`);
    const identity = fileIdentity(path);
    if (identity.sha256 !== claim.sha256 || identity.bytes !== claim.bytes) fail(`${label} identity mismatch`);
    if (claim.mode !== undefined && mode(stat) !== claim.mode) fail(`${label} mode mismatch`);
    return { path: claim.path, ...identity, mode: mode(stat), mode_claim: claim.mode ?? null, status: "PASS" };
}

function same(value, expected, label) {
    if (JSON.stringify(value) !== JSON.stringify(expected)) fail(`${label} mismatch`);
}

async function checkedNode(args, timeoutMs = 30000) {
    const result = await runBounded(process.execPath, args, { timeoutMs, maxBytes: 4 * 1024 * 1024 });
    if (result.timedOut || result.overflow || result.code !== 0 || result.stderr !== "") fail(`command failed: ${args.join(" ")} ${JSON.stringify(result)}`);
    return JSON.parse(result.stdout);
}

function validateFormation(formation) {
    const lines = [];
    for (const row of formation.rows) {
        const path = join(root, row.path);
        const stat = lstatSync(path);
        if (!stat.isFile() || stat.isSymbolicLink()) fail(`formation row not regular: ${row.path}`);
        const identity = fileIdentity(path);
        if (identity.sha256 !== row.sha256 || identity.bytes !== row.bytes || mode(stat) !== "0444") fail(`formation row drift: ${row.path}`);
        lines.push(`${row.sha256}  ${row.bytes}  ${row.path}\n`);
    }
    if (formation.rows.length !== formation.row_count || sha256(lines.join("")) !== formation.closure_sha256) fail("formation closure mismatch");
    return { status: "PASS", rows: formation.row_count, closure_sha256: formation.closure_sha256, row_mode: "0444" };
}

async function authenticate() {
    const anchorEvidence = Object.fromEntries(Object.entries(anchors).map(([name, claim]) => [name, exactFile(claim, name)]));
    const formation = parseJson(resolve(repo, anchors.formation.path));
    const rootAccept = parseJson(resolve(repo, anchors.root_accept.path));
    const receipt = parseJson(resolve(repo, anchors.holdout_receipt.path));
    const reveal = parseJson(resolve(repo, anchors.holdout_reveal.path));
    const roster = parseJson(resolve(repo, anchors.author_roster.path));
    const formationClosure = validateFormation(formation);

    same(rootAccept.subject, { path: anchors.formation.path, sha256: anchors.formation.sha256, bytes: anchors.formation.bytes, mode: anchors.formation.mode, row_count: formation.row_count, closure_sha256: formation.closure_sha256 }, "root subject join");
    if (rootAccept.verdict !== "ACCEPT_PUBLIC_BOUNDARY_ONLY_CUSTODIAN_MAY_SEAL") fail("root is not the accepted boundary");
    same(receipt.subject, { root_path: anchors.root_accept.path, root_sha256: anchors.root_accept.sha256, subject_path: anchors.formation.path, subject_sha256: anchors.formation.sha256 }, "receipt subject join");
    if (receipt.status !== "UNREVEALED_PREAUTHOR_HOLDOUT_SEALED") fail("holdout receipt status mismatch");
    same(reveal.seal_join, {
        ciphertext: { bytes: anchors.holdout_ciphertext.bytes, mode: anchors.holdout_ciphertext.mode, path: anchors.holdout_ciphertext.path, sha256: anchors.holdout_ciphertext.sha256 },
        receipt: { bytes: anchors.holdout_receipt.bytes, mode: anchors.holdout_receipt.mode, path: anchors.holdout_receipt.path, sha256: anchors.holdout_receipt.sha256 },
        root_sha256: anchors.root_accept.sha256,
        subject_sha256: anchors.formation.sha256,
    }, "reveal seal join");
    if (reveal.status !== "AUTHORIZED_POST_CANDIDATE_REVEAL") fail("reveal status mismatch");
    if (roster.formation_sha256 !== anchors.formation.sha256 || roster.root_accept_sha256 !== anchors.root_accept.sha256
        || roster.holdout_receipt_sha256 !== anchors.holdout_receipt.sha256 || roster.holdout_ciphertext_sha256 !== anchors.holdout_ciphertext.sha256
        || roster.holdout_status !== "SEALED_AND_UNREVEALED_FOR_ALL_AUTHORS") fail("author roster seal join mismatch");
    exactFile(reveal.candidate_phase_join.author_roster, "reveal author roster");
    if (reveal.candidate_phase_join.author_roster.sha256 !== anchors.author_roster.sha256
        || reveal.candidate_phase_join.author_roster.holdout_status !== roster.holdout_status) fail("reveal author roster join mismatch");

    const candidateInputs = {};
    for (const seat of seats) {
        const revealSeat = reveal.candidate_phase_join.seats.find((entry) => entry.seat === seat);
        const author = roster.authors.find((entry) => entry.seat === seat);
        if (!revealSeat || !author) fail(`missing candidate join ${seat}`);
        const candidateIdentity = exactFile(revealSeat.candidate, `candidate ${seat}`);
        const closureIdentity = exactFile(revealSeat.closure, `candidate closure ${seat}`);
        if (author.actual_collaboration_task !== revealSeat.actual_collaboration_task || author.candidate_path !== revealSeat.candidate.path
            || author.sha256 !== revealSeat.candidate.sha256 || author.bytes !== revealSeat.candidate.bytes || author.topology !== revealSeat.topology) fail(`author/reveal join mismatch ${seat}`);
        const closure = parseJson(resolve(repo, revealSeat.closure.path));
        if (closure.seat !== seat || closure.status !== revealSeat.closure.status || closure.entry !== revealSeat.candidate.path
            || closure.rows.length !== 1 || JSON.stringify(closure.rows[0]) !== JSON.stringify({ path: revealSeat.candidate.path, kind: "regular", sha256: revealSeat.candidate.sha256, bytes: revealSeat.candidate.bytes, mode: revealSeat.candidate.mode })
            || JSON.stringify(closure.import_inputs) !== JSON.stringify([revealSeat.candidate.path])) fail(`closure internal join mismatch ${seat}`);
        const closeReplay = await checkedNode([join(root, "candidate-closure.mjs"), "--close", seat], 30000);
        same(closeReplay, closure, `candidate closure replay ${seat}`);
        candidateInputs[seat] = {
            topology: revealSeat.topology,
            actual_collaboration_task: revealSeat.actual_collaboration_task,
            candidate: candidateIdentity,
            closure: closureIdentity,
            candidate_bundle: { sha256: closure.candidate_bundle_sha256, bytes: closure.candidate_bundle_bytes, replay: "PASS_EXACT" },
        };
    }

    const aad = Buffer.from(reveal.reveal_material.aad_base64, "base64");
    const aadFields = receipt.aad.fields;
    const canonicalAad = Buffer.from(`${canonical(aadFields)}\n`);
    if (!aad.equals(canonicalAad) || sha256(aad) !== receipt.aad.sha256 || aad.toString("base64") !== reveal.reveal_material.aad_base64) fail("AAD canonical/hash join mismatch");
    if (aadFields.subject_sha256 !== anchors.formation.sha256 || aadFields.root_sha256 !== anchors.root_accept.sha256
        || aadFields.custodian_task !== receipt.custodian.actual_collaboration_task) fail("AAD subject/custodian join mismatch");

    const base64Text = readFileSync(resolve(repo, anchors.holdout_ciphertext.path));
    if (receipt.artifact.base64_text_sha256 !== anchors.holdout_ciphertext.sha256
        || receipt.artifact.base64_text_bytes !== anchors.holdout_ciphertext.bytes) fail("receipt/base64 artifact join mismatch");
    const frame = Buffer.from(base64Text.toString("utf8").trimEnd(), "base64");
    if (!base64Text.equals(Buffer.from(`${frame.toString("base64")}\n`))) fail("ciphertext base64 is not canonical one-LF encoding");
    if (frame.length !== receipt.artifact.sealed_frame_bytes || sha256(frame) !== receipt.artifact.sealed_frame_sha256) fail("sealed frame identity mismatch");
    if (frame.subarray(0, 8).toString("ascii") !== "VCNG13AE" || frame[8] !== 1) fail("sealed frame header mismatch");
    same(receipt.framing.binary_layout, [
        { bytes: 8, offset: 0, value_ascii: "VCNG13AE" },
        { bytes: 1, offset: 8, value_uint8: 1 },
        { bytes: receipt.framing.nonce_bytes, offset: 9, value: "fresh GCM nonce" },
        { bytes: receipt.artifact.ciphertext_bytes, offset: 21, value: "ciphertext" },
        { bytes: receipt.framing.tag_bytes, offset: 21 + receipt.artifact.ciphertext_bytes, value: "GCM authentication tag" },
    ], "receipt frame layout");
    same(reveal.reveal_material.frame, {
        ciphertext: { bytes: receipt.artifact.ciphertext_bytes, offset: 21 },
        magic: { ascii: "VCNG13AE", bytes: 8, offset: 0 },
        nonce: { bytes: receipt.framing.nonce_bytes, offset: 9 },
        tag: { bytes: receipt.framing.tag_bytes, offset: 21 + receipt.artifact.ciphertext_bytes },
        version: { bytes: 1, offset: 8, uint8: 1 },
    }, "reveal frame join");
    const ciphertext = frame.subarray(21, -16);
    if (ciphertext.length !== receipt.artifact.ciphertext_bytes || sha256(ciphertext) !== receipt.artifact.ciphertext_sha256) fail("ciphertext body identity mismatch");
    const key = Buffer.from(reveal.reveal_material.key_base64, "base64");
    if (key.length !== receipt.algorithm.key_bytes || reveal.reveal_material.algorithm !== "AES-256-GCM") fail("reveal key/algorithm mismatch");
    const decipher = createDecipheriv("aes-256-gcm", key, frame.subarray(9, 21));
    decipher.setAAD(aad);
    decipher.setAuthTag(frame.subarray(-16));
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    if (plaintext.length !== receipt.corpus.plaintext_bytes || sha256(plaintext) !== receipt.corpus.plaintext_sha256) fail("authenticated plaintext identity mismatch");
    const corpus = JSON.parse(plaintext.toString("utf8"));
    const recanonicalized = Buffer.from(`${canonical(corpus)}\n`);
    if (!plaintext.equals(recanonicalized)) fail("decrypted corpus canonicalization mismatch");
    if (corpus.schema !== receipt.corpus.version || corpus.cases.length !== receipt.corpus.cases
        || corpus.subject.subject_sha256 !== anchors.formation.sha256 || corpus.subject.root_sha256 !== anchors.root_accept.sha256) fail("decrypted corpus subject/header join mismatch");
    const familyCounts = receipt.corpus.family_counts.map((expected) => {
        const rows = corpus.cases.filter((row) => row.family === expected.family);
        const canonicalCaseBytes = rows.reduce((sum, row) => sum + Buffer.byteLength(`${canonical(row)}\n`), 0);
        if (rows.length !== expected.cases || canonicalCaseBytes !== expected.canonical_case_bytes) fail(`family join mismatch ${expected.family}`);
        return { family: expected.family, cases: rows.length, canonical_case_bytes: canonicalCaseBytes, status: "PASS" };
    });
    const maxSource = Math.max(...corpus.cases.map((row) => row.input.source.length));
    if (maxSource !== receipt.corpus.maximum_source_utf16_length) fail("maximum source length mismatch");
    same(reveal.authenticated_corpus, { cases: receipt.corpus.cases, family_counts: receipt.corpus.family_counts, maximum_source_utf16_length: receipt.corpus.maximum_source_utf16_length, plaintext_bytes: receipt.corpus.plaintext_bytes, plaintext_sha256: receipt.corpus.plaintext_sha256, status: "AES_256_GCM_AUTHENTICATED_DECRYPTION_PASS", version: receipt.corpus.version }, "reveal authenticated corpus join");

    const runtimeReplay = await checkedNode([join(root, "runtime-closure-generator.mjs"), "--verify", join(root, "runtime-closure.json")], 30000);
    const peerReplay = await checkedNode([join(root, "peer-harness.mjs"), "--verify"], 30000);
    return {
        plaintext,
        corpus,
        evidence: {
            status: "PASS_ALL_DECLARED_JOINS_HASHES_MODES_AND_AES_256_GCM_AUTHENTICATION",
            anchors: anchorEvidence,
            formation_closure: formationClosure,
            joins: {
                formation_to_root: "PASS",
                root_and_formation_to_holdout_receipt: "PASS",
                receipt_to_ciphertext_and_frame: "PASS",
                receipt_to_aad: "PASS",
                reveal_to_seal: "PASS",
                roster_to_unrevealed_seal: "PASS",
                reveal_to_all_four_candidate_closures: "PASS",
                authenticated_plaintext_to_receipt_and_reveal: "PASS",
            },
            cryptography: {
                algorithm: "AES-256-GCM",
                aad_sha256: sha256(aad),
                sealed_frame_sha256: sha256(frame),
                ciphertext_sha256: sha256(ciphertext),
                plaintext_sha256: sha256(plaintext),
                canonical_plaintext_exact: true,
            },
            corpus: { cases: corpus.cases.length, maximum_source_utf16_length: maxSource, family_counts: familyCounts },
            candidate_inputs: candidateInputs,
            runtime_closure_replay: runtimeReplay,
            peer_door_replay: peerReplay,
        },
    };
}

function sourceRows(built) {
    return Object.keys(built.metafile.inputs).sort().map((input) => {
        const path = resolve(repo, input);
        const stat = lstatSync(path);
        if (!stat.isFile() || stat.isSymbolicLink()) fail(`bundle input not regular: ${input}`);
        return { path: rel(path), ...fileIdentity(path), mode: mode(stat) };
    });
}

async function correctnessEvidence(authenticated) {
    const evaluatorPath = join(root, "candidate-evaluator.mts");
    const directory = mkdtempSync(join(tmpdir(), "value-pi-g13-holdout-"));
    const corpusPath = join(directory, "corpus.json");
    writeFileSync(corpusPath, authenticated.plaintext, { mode: 0o400, flag: "wx" });
    try {
        const evaluations = {};
        for (const seat of seats) {
            const built = await buildBundle(evaluatorPath, join(root, "candidates", seat, "index.ts"));
            const execution = await runBundle(built.output, [corpusPath], { timeoutMs: 30000, maxBytes: 4 * 1024 * 1024 });
            if (execution.timedOut || execution.overflow || execution.code !== 0 || execution.stderr !== "") fail(`holdout evaluator execution failed ${seat}: ${JSON.stringify(execution)}`);
            const result = JSON.parse(execution.stdout);
            evaluations[seat] = {
                status: result.status,
                cases: result.cases,
                passed: result.passed,
                failed: result.failed,
                families: result.families,
                evaluator_bundle: { sha256: sha256(built.output), bytes: built.output.length },
            };
        }
        const allPass = seats.every((seat) => evaluations[seat].status === "PASS" && evaluations[seat].passed === authenticated.corpus.cases.length);
        return {
            schema: "value.pi.syntax-consume-number.g13.candidate-evidence/v1",
            generation: 13,
            feature_id: "SYNTAX-CONSUME-NUMBER",
            status: allPass ? "PASS_ALL_FOUR_CANDIDATES_ALL_172_HOLDOUT_CASES" : "FAIL_ONE_OR_MORE_CANDIDATE_HOLDOUT_CASES",
            scope: "POST_REVEAL_PROTOTYPE_CORRECTNESS_EVIDENCE_ONLY",
            authentication: authenticated.evidence,
            evaluator: {
                policy: "one candidate-neutral worker bundled separately with each exact frozen candidate; no seat branches or candidate-specific exceptions",
                failure_diagnostics: {
                    ordinary: "unscored: the frozen contract requires preservation only for pre-existing ahead diagnostics",
                    preseeded_ahead: "all seeded diagnostic fields and nested values must remain structurally identical and ordered",
                },
                source: { path: rel(evaluatorPath), ...fileIdentity(evaluatorPath) },
            },
            evidence_driver: { path: rel(join(root, "candidate-evidence.mjs")), ...fileIdentity(join(root, "candidate-evidence.mjs")) },
            seats: evaluations,
            holdout_disposition: allPass ? "ALL_SEATS_PASS" : "ONE_OR_MORE_SEATS_FAIL",
            benchmark_corpus_gate: "SEPARATE_EXACT_FULL_NUMBER_PREVALIDATION_REQUIRED_BEFORE_ANY_TIMING",
            parser_credit: 0,
            feature_credit: 0,
            benchmark_credit: 0,
            production_authority: 0,
        };
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
}

async function benchmarkEvidence(correctness) {
    const benchmarkPath = join(root, "candidate-benchmark.mts");
    const built = await buildBundle(benchmarkPath);
    const execution = await runBundle(built.output, [], { timeoutMs: 120000, maxBytes: 8 * 1024 * 1024 });
    if (execution.timedOut || execution.overflow || execution.code !== 0 || execution.stderr !== "") fail(`benchmark execution failed: ${JSON.stringify(execution)}`);
    const run = JSON.parse(execution.stdout);
    const ids = ["h", "b", "s", "d", "live_regex", "deposed", "c14"];
    const medians = Object.fromEntries(ids.map((id) => [id, Number(run.results[id].median_elapsed_ns)]));
    const ratios = Object.fromEntries(ids.map((numerator) => [numerator, Object.fromEntries(ids.map((denominator) => [denominator, {
        numerator_median_elapsed_ns: String(medians[numerator]),
        denominator_median_elapsed_ns: String(medians[denominator]),
        ratio: medians[numerator] / medians[denominator],
    }]))]));
    const correctnessBytes = Buffer.from(`${JSON.stringify(correctness, null, 2)}\n`);
    const runtimeClosurePath = join(root, "runtime-closure.json");
    return {
        schema: "value.pi.syntax-consume-number.g13.benchmark-evidence/v1",
        generation: 13,
        feature_id: "SYNTAX-CONSUME-NUMBER",
        status: run.status,
        scope: "CORRECTNESS_GATED_GRAMMAR_ONLY_PROTOTYPE_BENCHMARK_NO_PERFORMANCE_GATE",
        correctness_gate: {
            status: "PASS_ALL_SEVEN_LANES_ALL_144_FIXED_FULL_NUMBER_CASES_BEFORE_TIMING",
            authority: "The benchmark gate covers only exact outputs and complete consumption on its explicitly comparable corpus. It does not erase, reinterpret, or gate reporting of the separate hostile holdout dispositions.",
            candidate_evidence: { path: rel(join(root, "candidate-evidence.json")), sha256: sha256(correctnessBytes), bytes: correctnessBytes.length },
            holdout_dispositions: Object.fromEntries(seats.map((seat) => [seat, { status: correctness.seats[seat].status, passed: correctness.seats[seat].passed, failed: correctness.seats[seat].failed }])),
            benchmark_lane_validation: Object.fromEntries(Object.entries(run.results).map(([id, result]) => [id, result.validation])),
        },
        sealed_peer_authority: {
            runtime_closure: { path: rel(runtimeClosurePath), ...fileIdentity(runtimeClosurePath) },
            peer_worker: { path: rel(join(root, "peer-worker.mts")), ...fileIdentity(join(root, "peer-worker.mts")) },
            replay: correctness.authentication.peer_door_replay,
        },
        tooling: {
            evidence_driver: { path: rel(join(root, "candidate-evidence.mjs")), ...fileIdentity(join(root, "candidate-evidence.mjs")) },
            benchmark_worker: { path: rel(benchmarkPath), ...fileIdentity(benchmarkPath) },
        },
        benchmark_bundle: { sha256: sha256(built.output), bytes: built.output.length, source_rows: sourceRows(built) },
        protocol: run.protocol,
        corpus: run.corpus,
        environment: { ...run.environment, executable: { path: process.execPath, ...fileIdentity(process.execPath) }, logical_cpus_observed_by_driver: cpus().length, total_memory_bytes_observed_by_driver: totalmem() },
        round_robin_orders: run.round_robin_orders,
        results: run.results,
        ratios: { definition: "row lane median elapsed ns divided by column lane median elapsed ns; below 1 means the row used less median elapsed time", matrix: ratios },
        performance_gate: null,
        parser_credit: 0,
        feature_credit: 0,
        benchmark_credit: 0,
        production_authority: 0,
    };
}

function immutableBytes(value) { return Buffer.from(`${JSON.stringify(value, null, 2)}\n`); }
function writeImmutable(path, value) {
    const bytes = immutableBytes(value);
    try {
        const existing = readFileSync(path);
        if (!existing.equals(bytes)) fail(`refusing to overwrite differing immutable evidence ${rel(path)}`);
        if (mode(lstatSync(path)) !== "0444") fail(`existing evidence mode is not 0444: ${rel(path)}`);
    } catch (error) {
        if (error.code !== "ENOENT") throw error;
        writeFileSync(path, bytes, { mode: 0o444, flag: "wx" });
        chmodSync(path, 0o444);
    }
    return { path: rel(path), ...fileIdentity(path), mode: mode(lstatSync(path)) };
}

const args = new Set(process.argv.slice(2));
if (!["--correctness", "--benchmark", "--all"].some((arg) => args.has(arg))) fail("usage: --correctness | --benchmark | --all [--write]");
const authenticated = await authenticate();
const correctness = await correctnessEvidence(authenticated);
let benchmark;
if (args.has("--benchmark") || args.has("--all")) benchmark = await benchmarkEvidence(correctness);
if (args.has("--write")) {
    const written = { candidate_evidence: writeImmutable(join(root, "candidate-evidence.json"), correctness) };
    if (benchmark) written.benchmark_evidence = writeImmutable(join(root, "benchmark-evidence.json"), benchmark);
    process.stdout.write(`${JSON.stringify({ status: "PASS_EVIDENCE_WRITTEN_IMMUTABLE", files: written })}\n`);
} else if (args.has("--correctness") && !args.has("--all")) process.stdout.write(`${JSON.stringify(correctness, null, 2)}\n`);
else process.stdout.write(`${JSON.stringify(benchmark, null, 2)}\n`);
