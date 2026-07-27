#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import { canonicalize, parseJsonStrict } from "./json-contract.mjs";
import { validateWaveEdgePolicy } from "./wave-edge-policy.mjs";
import { loadWaveRegistry } from "./wave-contract.mjs";
import { waveTotal } from "./wave-table-contract.mjs";

const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const root = new URL("../", import.meta.url);
const canonicalManifest = parseJsonStrict(readFileSync(new URL("WAVE-EDGE-POLICY.json", root)));
const canonicalSchemaBytes = readFileSync(new URL("wave-edge-policy.schema.json", root));
const canonicalSchema = parseJsonStrict(canonicalSchemaBytes);
const contracts = loadWaveRegistry().contracts;
const failures = [];
let rejections = 0;

function seal(manifest, schema) {
    const schemaBytes = Buffer.from(`${JSON.stringify(schema, null, 2)}\n`);
    manifest.policy_schema_sha256 = sha256(schemaBytes);
    const preimage = structuredClone(manifest);
    delete preimage.manifest_hash;
    manifest.manifest_hash = sha256(canonicalize(preimage));
    return { manifest, schema, schemaSha256: sha256(schemaBytes), contracts };
}

function expectRejected(name, mutate, expected) {
    const manifest = structuredClone(canonicalManifest);
    const schema = { type: "object" };
    const candidateContracts = new Map([...contracts].map(([id, entry]) => [id, structuredClone(entry)]));
    mutate(manifest, candidateContracts);
    const input = seal(manifest, schema);
    input.contracts = candidateContracts;
    try {
        validateWaveEdgePolicy(input);
        failures.push(`${name}: accepted`);
    } catch (error) {
        if (!error.message.includes(expected)) failures.push(`${name}: rejected for the wrong reason: ${error.message}`);
        else rejections += 1;
    }
}

try {
    const receipt = validateWaveEdgePolicy({
        manifest: canonicalManifest,
        schema: canonicalSchema,
        schemaSha256: sha256(canonicalSchemaBytes),
        contracts,
    });
    if (receipt.wave_outcomes.length !== waveTotal
        || receipt.edges.length !== 759
        || canonicalize(receipt.role_counts) !== canonicalize({
            "completion-predecessor": 723,
            "conditional-disposition": 24,
            "requires-keep": 4,
            "requires-prune": 8,
        })) {
        failures.push(`canonical policy did not expand to the exact ${waveTotal}-wave/759-edge role vector`);
    }
} catch (error) {
    failures.push(`canonical policy rejected: ${error.message}`);
}

expectRejected("missing narrow override", (manifest) => manifest.edge_overrides.shift(), "/expected/role_counts");
expectRejected("reversed override", (manifest) => {
    [manifest.edge_overrides[0].from, manifest.edge_overrides[0].to] = [manifest.edge_overrides[0].to, manifest.edge_overrides[0].from];
}, "is not a canonical producer-to-consumer edge");
expectRejected("duplicate override", (manifest) => manifest.edge_overrides.push(structuredClone(manifest.edge_overrides[0])), "duplicate override");
expectRejected("widened override", (manifest) => manifest.edge_overrides[0].allowed_statuses.push("REFUSED"), "widens producer outcomes");
expectRejected("redundant override", (manifest) => {
    manifest.edge_overrides[0].role = "conditional-disposition";
    manifest.edge_overrides[0].allowed_statuses = ["KEEP", "PRUNE"];
}, "redundant override");
expectRejected("missing conditional wave", (manifest) => manifest.wave_class_overrides[0].waves.shift(), "/expected/role_counts");
expectRejected("duplicate wave override", (manifest) => manifest.wave_class_overrides[1].waves.push("V24"), "overridden more than once");
expectRejected("unknown wave override", (manifest) => manifest.wave_class_overrides[1].waves.push("V99"), "unknown wave V99");
expectRejected("forged expanded hash", (manifest) => { manifest.expected.edges_sha256 = "0".repeat(64); }, "/expected/edges_sha256");
expectRejected("source graph edge removed", (manifest, candidateContracts) => {
    const entry = candidateContracts.get("V24C");
    entry.contract.dependencies = entry.contract.dependencies.filter((waveId) => waveId !== "V24");
}, "/formation_graph_sha256");

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(`${JSON.stringify({
    schema: "vnext-wave-edge-policy-selftest/1",
    positive: 1,
    adversarial_rejections: rejections,
})}\n`);
