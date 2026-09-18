#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { buildPayload, payloadDigest } from "./build.mjs";
import { authenticateEvidence } from "../occurrence-owner-v2/evidence.mjs";
import { runFixtures } from "../occurrence-owner-v2/fixtures.mjs";
import { byteSort, sha256 } from "../occurrence-owner-v2/shared.mjs";

const TOOL_PATHS = Object.freeze([
    "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v2/build.mjs",
    "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v2/context.mjs",
    "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v2/evidence.mjs",
    "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v2/fixtures.mjs",
    "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v2/mappings.mjs",
    "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v2/owners.mjs",
    "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v2/references.mjs",
    "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v2/shared.mjs",
    "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v3/build.mjs",
    "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v3/generate.mjs",
]);
const SCHEMA_PATH = "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.schema.json";
const DEFAULT_OUTPUT = "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json";
const WITHDRAWAL = Object.freeze({
    repo_relative_path: "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v2-rejection.json",
    bytes: 3314,
    sha256: "ce693fa32d2b8f08100db7267f136636f788d994de0d7f5453a70fbc4c4d5ba9",
});
const CANONICAL_REPLAY_COMMAND = "node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v3/generate.mjs --source-root \"$PINNED_CSSWG_ROOT\" --output \"$OCCURRENCE_OWNER_V3_OUTPUT\"";

function argumentsFrom(argv) {
    const options = { output: DEFAULT_OUTPUT, check: false, fixtureOnly: false };
    for (let index = 0; index < argv.length; index += 1) {
        const flag = argv[index];
        if (flag === "--check") options.check = true;
        else if (flag === "--fixture-only") options.fixtureOnly = true;
        else if (flag === "--source-root" || flag === "--output") {
            if (argv[index + 1] === undefined) throw new Error(`${flag} requires a value`);
            options[flag === "--source-root" ? "sourceRoot" : "output"] = argv[index + 1];
            index += 1;
        } else throw new Error(`unknown argument: ${flag}`);
    }
    return options;
}

function exactIdentity(repoRoot, path) {
    const bytes = readFileSync(resolve(repoRoot, path));
    return { repo_relative_path: path, bytes: bytes.length, sha256: sha256(bytes) };
}

function pinnedIdentity(repoRoot, expected) {
    const identity = exactIdentity(repoRoot, expected.repo_relative_path);
    if (identity.bytes !== expected.bytes || identity.sha256 !== expected.sha256) throw new Error(`${expected.repo_relative_path}: pinned identity mismatch`);
    return identity;
}

function toolIdentity(repoRoot) {
    const files = TOOL_PATHS.map((path) => exactIdentity(repoRoot, path)).sort((left, right) => byteSort(left.repo_relative_path, right.repo_relative_path));
    const method = "SHA-256 of UTF-8 lines path + NUL + sha256 + NUL + decimal bytes + LF in byte-sorted path order";
    const bytes = Buffer.from(files.map((row) => `${row.repo_relative_path}\0${row.sha256}\0${row.bytes}\n`).join(""), "utf8");
    return { files, method, sha256: sha256(bytes) };
}

function validateArtifactShape(artifact) {
    if (artifact.schema_version !== "value.pi.full-source-occurrence-owner-formation/v3") throw new Error("invalid schema version");
    if (artifact.status !== "PROVISIONAL_AWAITING_TWO_CHALLENGES_AND_GESTALT") throw new Error("invalid authority status");
    if (artifact.authority.denominator_credit !== 0 || artifact.authority.parser_credit !== 0) throw new Error("nonzero denominator/parser credit");
    if (artifact.authenticated_source_closure.count !== 168 || artifact.discovery_carrier_substrate.count !== 17079) throw new Error("closure identity mismatch");
    if (artifact.required_algorithmic_counterexamples.count !== 10) throw new Error("required slice identity mismatch");
    if (artifact.compatibility_obligations.total_export_count !== 52 || artifact.compatibility_obligations.keyframes_consumer_count !== 37) throw new Error("compatibility identity mismatch");
    if (artifact.owner_formation.semantic_owner_edges.length !== 0 || artifact.owner_formation.owner_cost_lattice_emitted) throw new Error("unreviewed owner graph/cost emitted");
    if (!artifact.validation.zero_non_red_carriers || !artifact.validation.zero_non_red_references || !artifact.validation.zero_non_red_operation_candidates) throw new Error("non-RED unreviewed row emitted");
    if (artifact.replay.command !== CANONICAL_REPLAY_COMMAND || artifact.replay.output_path_affects_serialized_bytes !== false) throw new Error("replay command is not output-path independent");
}

const options = argumentsFrom(process.argv.slice(2));
const repoRoot = process.cwd();
const fixtures = runFixtures();
if (fixtures.failed > 0) throw new Error(`adversarial fixtures failed: ${JSON.stringify(fixtures.results.filter((row) => row.status === "FAIL"))}`);
if (options.fixtureOnly) {
    process.stdout.write(`${JSON.stringify(fixtures, null, 2)}\n`);
    process.exit(0);
}
if (options.sourceRoot === undefined) throw new Error("usage: generate.mjs --source-root <exact-pinned-tree> [--output <artifact>] [--check]");

const evidence = authenticateEvidence(repoRoot, resolve(options.sourceRoot));
const tools = toolIdentity(repoRoot);
const schema = exactIdentity(repoRoot, SCHEMA_PATH);
const withdrawnV2Identity = pinnedIdentity(repoRoot, WITHDRAWAL);
const payload = buildPayload({ evidence, toolIdentity: tools, schemaIdentity: schema, fixtureReceipt: fixtures, withdrawnV2Identity });
const artifact = {
    ...payload,
    content_digest_sha256: payloadDigest(payload),
    content_digest_method: "SHA-256 of compact UTF-8 JSON.stringify(payload) before content_digest_sha256, content_digest_method, and replay are appended",
    replay: {
        command: CANONICAL_REPLAY_COMMAND,
        environment: {
            PINNED_CSSWG_ROOT: "absolute path to the exact authenticated pinned source tree",
            OCCURRENCE_OWNER_V3_OUTPUT: "arbitrary output path; its value is never serialized",
        },
        working_directory: "repository root",
        output_format: "compact JSON.stringify(artifact) plus one trailing LF",
        output_path_affects_serialized_bytes: false,
        generator_identity_sha256: tools.sha256,
        schema_sha256: schema.sha256,
    },
};
validateArtifactShape(artifact);
const serialized = Buffer.from(`${JSON.stringify(artifact)}\n`, "utf8");
const absoluteOutput = resolve(options.output);
if (options.check) {
    const existing = readFileSync(absoluteOutput);
    if (!existing.equals(serialized)) throw new Error(`artifact replay mismatch: ${absoluteOutput}`);
    process.stdout.write(`${JSON.stringify({ status: "REPLAY_IDENTICAL", bytes: existing.length, sha256: sha256(existing), payload_sha256: artifact.content_digest_sha256, generator_sha256: tools.sha256, schema_sha256: schema.sha256 })}\n`);
} else {
    writeFileSync(absoluteOutput, serialized);
    process.stdout.write(`${JSON.stringify({ status: "WROTE_PROVISIONAL_ARTIFACT", path: relative(repoRoot, absoluteOutput).replace(/\\/g, "/"), bytes: serialized.length, sha256: sha256(serialized), payload_sha256: artifact.content_digest_sha256, generator_sha256: tools.sha256, schema_sha256: schema.sha256 })}\n`);
}
