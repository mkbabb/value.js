import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { authenticateEvidence } from "./evidence.mjs";
import { discoverAll } from "./discover.mjs";
import { runCounterfixtures } from "./fixtures.mjs";
import { runMutationSuite } from "./mutations.mjs";
import { atomicWriteBundle, byteSort, canonicalBytes, exactIdentity, sha256 } from "./shared.mjs";
import { assembleTables } from "./tables.mjs";
import { manifestContentDigest, verifyBundle } from "./verify.mjs";

const MANIFEST_SCHEMA_PATH = "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v5.schema.json";
const SHARD_SCHEMA_PATH = "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v5-shard.schema.json";
const REPLAY_COMMAND = "node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/launch.mjs --source-root \"$PINNED_CSSWG_ROOT\" --keyframes-root \"$KEYFRAMES_PRIMARY_ROOT\" --output \"$OCCURRENCE_OWNER_V5_OUTPUT\"";

function parseArguments(argv) {
    const options = { check: false, fixtureOnly: false };
    for (let index = 0; index < argv.length; index += 1) {
        const argument = argv[index];
        if (argument === "--check") options.check = true;
        else if (argument === "--fixture-only") options.fixtureOnly = true;
        else if (["--source-root", "--keyframes-root", "--output"].includes(argument)) {
            if (argv[index + 1] === undefined) throw new Error(`${argument} requires a value`);
            options[argument === "--source-root" ? "sourceRoot" : argument === "--keyframes-root" ? "keyframesRoot" : "output"] = argv[++index];
        } else throw new Error(`unknown argument: ${argument}`);
    }
    return options;
}

function shardDirectoryForOutput(output) {
    const absolute = resolve(output);
    return absolute.replace(/\.json$/i, "") + ".shards";
}

function sortedIdentities(object) {
    return Object.values(object).sort((left, right) => byteSort(left.repo_relative_path, right.repo_relative_path));
}

function assertPostImportAttestation(repoRoot, attestation) {
    const current = attestation.executed_modules.map((identity) => exactIdentity(identity.repo_relative_path, repoRoot));
    if (JSON.stringify(current) !== JSON.stringify(attestation.executed_modules)) throw new Error("post-import executed module identity mismatch");
    const record = current.map((row) => `${row.repo_relative_path}\0${row.sha256}\0${row.bytes}\n`).join("");
    if (sha256(Buffer.from(record, "utf8")) !== attestation.module_set_sha256) throw new Error("post-import module set digest mismatch");
    for (const identity of [attestation.schemas.manifest, attestation.schemas.shard]) {
        if (JSON.stringify(exactIdentity(identity.repo_relative_path, repoRoot)) !== JSON.stringify(identity)) throw new Error(`post-import schema identity mismatch: ${identity.repo_relative_path}`);
    }
}

function makeManifest(evidence, tables, attestation, counterfixtures) {
    const manifest = {
        schema_version: "value.pi.full-source-occurrence-owner-formation/v5",
        date: "2026-07-22",
        status: "PROVISIONAL_AWAITING_TWO_CHALLENGES_AND_GESTALT",
        authority: { formation_only: true, may_promote: false, red_only: true },
        rejected_subjects: {
            pinned: sortedIdentities(evidence.identities.pinned),
            formation_inputs: sortedIdentities(evidence.identities.formation_inputs),
        },
        source_closure: { ...evidence.membership, source_bytes: evidence.sourceBytes },
        primary_compatibility_inputs: {
            export_sources: evidence.primary.export_sources,
            runtime_exports: evidence.exports.runtime.length,
            type_exports: evidence.exports.types.length,
            total_exports: evidence.exports.all.length,
            consumer_root_label: evidence.primary.consumer_root_label,
            consumer_files: evidence.primary.consumer_files.map((row) => ({ path: row.exact_path, bytes: row.bytes, sha256: row.sha256 })),
            consumer_symbols: evidence.consumers.symbols.size,
            dag_family_joined: 0,
            status: "RED_PRIMARY_SYMBOL_UNJOINED_TO_DAG",
        },
        module_dag: evidence.dag,
        generator: {
            launcher: attestation.launcher,
            executed_modules: attestation.executed_modules,
            pre_execution_module_set_sha256: attestation.module_set_sha256,
            post_import_module_set_sha256: attestation.module_set_sha256,
            runtime: attestation.runtime,
            validator: attestation.validator,
        },
        schemas: attestation.schemas,
        shards: tables.shards.map((row) => row.identity),
        counts: tables.counts,
        validation: {
            manifest_schema: "PASS",
            shard_schema: "PASS",
            cross_shard_relations: "PASS",
            counterfixtures: { suite: counterfixtures.suite, case_count: counterfixtures.case_count, digest_sha256: counterfixtures.digest_sha256 },
            mutation_suite: { case_count: 20, rejected: 20, digest_sha256: "0".repeat(64) },
        },
        replay: { command: REPLAY_COMMAND, arbitrary_output_path: "PASS", verify_before_execute: true, atomic_bundle_write: true, canonical_json_lf: true },
        credits: { semantic: 0, owner: 0, operation: 0, compatibility: 0, owner_edges: [], costed_owner_formation: false },
        content_digest_method: "sha256(canonical-json-with-lf excluding content_digest_sha256)",
        content_digest_sha256: "0".repeat(64),
    };
    manifest.content_digest_sha256 = manifestContentDigest(manifest);
    return manifest;
}

function readSchema(repoRoot, path) {
    return JSON.parse(readFileSync(resolve(repoRoot, path), "utf8"));
}

function rawShardMap(tables) {
    return new Map(tables.shards.map((row) => [row.name, row.bytes]));
}

function readExistingBundle(output, shardDirectory) {
    const manifestBytes = readFileSync(output);
    const manifest = JSON.parse(manifestBytes.toString("utf8"));
    const rawShardBytesByName = new Map();
    const shardObjects = {};
    for (const identity of manifest.shards) {
        const name = identity.logical_path.replace(/^shards\//, "");
        const bytes = readFileSync(resolve(shardDirectory, name));
        rawShardBytesByName.set(name, bytes);
        shardObjects[identity.table] = JSON.parse(bytes.toString("utf8"));
    }
    return { manifestBytes, manifest, rawShardBytesByName, shardObjects };
}

export async function main(preExecutionAttestation, argv = process.argv.slice(2)) {
    const options = parseArguments(argv);
    const counterfixtures = runCounterfixtures();
    if (options.fixtureOnly) {
        process.stdout.write(canonicalBytes(counterfixtures));
        return;
    }
    if (!options.sourceRoot || !options.keyframesRoot || !options.output) throw new Error("--source-root, --keyframes-root, and --output are required");
    const repoRoot = process.cwd();
    assertPostImportAttestation(repoRoot, preExecutionAttestation);
    const manifestSchema = readSchema(repoRoot, MANIFEST_SCHEMA_PATH);
    const shardSchema = readSchema(repoRoot, SHARD_SCHEMA_PATH);
    const evidence = authenticateEvidence(repoRoot, options.sourceRoot, options.keyframesRoot);
    const discovery = discoverAll(evidence);
    const tables = assembleTables(evidence, discovery);
    const rawShardBytesByName = rawShardMap(tables);
    const shardObjects = tables.objects;
    const manifest = makeManifest(evidence, tables, preExecutionAttestation, counterfixtures);
    verifyBundle({ manifest, shardObjects, rawShardBytesByName, manifestSchema, shardSchema, evidence, executionAttestation: preExecutionAttestation });
    const mutations = runMutationSuite({ manifest, shardObjects, rawShardBytesByName, manifestSchema, shardSchema, evidence, executionAttestation: preExecutionAttestation });
    manifest.validation.mutation_suite = { case_count: mutations.case_count, rejected: mutations.rejected, digest_sha256: mutations.digest_sha256 };
    manifest.content_digest_sha256 = manifestContentDigest(manifest);
    verifyBundle({ manifest, shardObjects, rawShardBytesByName, manifestSchema, shardSchema, evidence, executionAttestation: preExecutionAttestation });
    const manifestBytes = canonicalBytes(manifest);
    const output = resolve(options.output);
    const shardDirectory = shardDirectoryForOutput(output);
    if (options.check) {
        const existing = readExistingBundle(output, shardDirectory);
        if (!existing.manifestBytes.equals(manifestBytes)) throw new Error("manifest replay mismatch");
        for (const [name, bytes] of rawShardBytesByName) if (!existing.rawShardBytesByName.get(name)?.equals(bytes)) throw new Error(`shard replay mismatch: ${name}`);
        verifyBundle({ manifest: existing.manifest, shardObjects: existing.shardObjects, rawShardBytesByName: existing.rawShardBytesByName, manifestSchema, shardSchema, evidence, executionAttestation: preExecutionAttestation });
    } else {
        if (existsSync(output) || existsSync(shardDirectory)) throw new Error(`refusing to replace existing output bundle: ${output}`);
        atomicWriteBundle(output, shardDirectory, manifestBytes, rawShardBytesByName);
        const written = readExistingBundle(output, shardDirectory);
        if (!written.manifestBytes.equals(manifestBytes)) throw new Error("post-write manifest mismatch");
        verifyBundle({ manifest: written.manifest, shardObjects: written.shardObjects, rawShardBytesByName: written.rawShardBytesByName, manifestSchema, shardSchema, evidence, executionAttestation: preExecutionAttestation });
    }
    process.stdout.write(canonicalBytes({ output, shard_directory: shardDirectory, manifest_bytes: manifestBytes.length, manifest_sha256: sha256(manifestBytes), shard_count: tables.shards.length, shard_bytes: tables.shards.reduce((sum, row) => sum + row.bytes.length, 0), counts: tables.counts, counterfixtures: counterfixtures.case_count, mutations_rejected: mutations.rejected }));
}
