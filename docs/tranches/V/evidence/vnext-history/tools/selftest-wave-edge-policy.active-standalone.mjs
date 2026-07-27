#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import { canonicalize, parseJsonStrict } from "./json-contract.mjs";
import { validateWaveEdgePolicy } from "./wave-edge-policy.mjs";
import { loadWaveRegistry } from "./wave-contract.mjs";

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

function expectRejected(name, mutate, expected, schema = { type: "object" }) {
    const manifest = structuredClone(canonicalManifest);
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
    const expectedRoles = {
        "completion-predecessor": 755,
        "requires-keep": 29,
        "requires-prune": 10,
    };
    if (receipt.wave_outcomes.length !== 193
        || receipt.edges.length !== 794
        || canonicalize(receipt.role_counts) !== canonicalize(expectedRoles)) {
        failures.push("canonical policy did not expand to the exact 193-wave/794-edge role vector");
    }
    for (const [waveId, outcomeClass, status] of [
        ["V15P", "fixed-keep", "KEEP"],
        ["V16B", "complete", "COMPLETE"],
        ["V24", "fixed-prune", "PRUNE"],
        ["K14", "fixed-keep", "KEEP"],
        ["K09", "fixed-prune", "PRUNE"],
    ]) {
        const outcome = receipt.by_wave.get(waveId);
        if (outcome?.outcome_class !== outcomeClass || canonicalize(outcome.advancing_statuses) !== canonicalize([status])) {
            failures.push(`${waveId}: terminal outcome did not expand to ${outcomeClass}/${status}`);
        }
    }
} catch (error) {
    failures.push(`canonical policy rejected: ${error.message}`);
}

expectRejected("missing fixed KEEP wave", (manifest) => manifest.wave_class_overrides[0].waves.shift(), "/expected/role_counts");
expectRejected("missing fixed PRUNE wave", (manifest) => manifest.wave_class_overrides[1].waves.shift(), "/expected/role_counts");
expectRejected("duplicate wave override", (manifest) => manifest.wave_class_overrides[0].waves.push("V24"), "overridden more than once");
expectRejected("unknown wave override", (manifest) => manifest.wave_class_overrides[0].waves.push("V99"), "unknown wave V99");
expectRejected("obsolete V24 KEEP override", (manifest) => manifest.edge_overrides.push({
    from: "V24",
    to: "V24C",
    role: "requires-keep",
    allowed_statuses: ["KEEP"],
}), "widens producer outcomes with KEEP");
expectRejected("resurrected conditional class", (manifest) => {
    manifest.classes["conditional-disposition"] = {
        edge_role: "conditional-disposition",
        advancing_statuses: ["KEEP", "PRUNE"],
    };
}, "/classes", canonicalSchema);
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
