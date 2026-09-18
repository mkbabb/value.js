#!/usr/bin/env node

import { createHash } from "node:crypto";

import { canonicalize } from "./json-contract.mjs";
import { loadFormationProofLayer } from "./formation-proof-layer.mjs";
import { loadFormationRootSeedContract, loadWaveRegistry, waveContractManifest } from "./wave-contract.mjs";

const manifest = waveContractManifest();
const edgePolicy = loadWaveRegistry().edge_policy;
const formationProofLayer = loadFormationProofLayer();
const failures = formationProofLayer.failures.map((failure) => `formation proof layer: ${failure}`);
const gateIds = new Set();
for (const item of manifest) {
    if (item.gates.length !== 1) failures.push(`${item.wave_id}: expected exactly one canonical acceptance gate`);
    const gate = item.gates[0];
    if (gate.id !== `${item.wave_id.toLowerCase()}.acceptance`) failures.push(`${item.wave_id}: unstable gate ID`);
    if (gate.kind !== "command") failures.push(`${item.wave_id}: canonical acceptance gate must be a command`);
    const slug = item.wave_id.toLowerCase();
    if (gate.subject !== `node .vnext/proof-runner.mjs test/proof/${slug}/run.mjs --manifest test/proof/${slug}/manifest.json`) {
        failures.push(`${item.wave_id}: proof command is not the exact direct runner invocation`);
    }
    if (!gate.expected) failures.push(`${item.wave_id}: empty falsifiable expectation`);
    if (gateIds.has(gate.id)) failures.push(`${item.wave_id}: duplicate gate ID ${gate.id}`);
    gateIds.add(gate.id);
}
if (manifest.length !== 190) failures.push(`expected 190 contracts; found ${manifest.length}`);

const rowIds = new Set();
for (const item of manifest) {
    for (const requirement of item.seed_requirements) {
        if (rowIds.has(requirement.id)) failures.push(`${item.wave_id}: duplicate seed requirement ${requirement.id}`);
        rowIds.add(requirement.id);
    }
}
const formationRoot = loadFormationRootSeedContract();
if (formationRoot.contract.schema !== "vnext-formation-root-seed-contract/1" || formationRoot.contract.owner !== "formation-root") {
    failures.push("formation-root seed contract identity is invalid");
}
if (formationRoot.contract.contract_hash !== formationRoot.computed_hash) failures.push(`formation-root seed contract hash ${formationRoot.computed_hash}`);
if (canonicalize(formationRoot.contract.requirements) !== canonicalize(formationRoot.expected)) failures.push("formation-root seed requirements drift from inventory");
for (const requirement of formationRoot.contract.requirements ?? []) {
    if (rowIds.has(requirement.id)) failures.push(`formation-root: duplicate seed requirement ${requirement.id}`);
    rowIds.add(requirement.id);
}
if (rowIds.size !== 149) failures.push(`expected 149 seed requirements bound to owner contracts; found ${rowIds.size}`);

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const sha256 = createHash("sha256").update(canonicalize(manifest), "utf8").digest("hex");
const selected = process.argv[2];
if (process.argv.length > 3 || (selected && !/^[PVKAGDMC]\d{2}[A-Z]?$/.test(selected))) {
    process.stderr.write("usage: node validate-wave-contracts.mjs [WAVE-ID]\n");
    process.exit(2);
}
if (selected) {
    const item = manifest.find(({ wave_id: id }) => id === selected);
    if (!item) {
        process.stderr.write(`unknown wave ${selected}\n`);
        process.exit(1);
    }
    process.stdout.write(`${JSON.stringify(item, null, 2)}\n`);
} else {
    process.stdout.write(`${JSON.stringify({
        schema: "vnext-wave-contract-manifest/1",
        contracts: manifest.length,
        gates: gateIds.size,
        seed_requirements: rowIds.size,
        formation_root_contract_sha256: formationRoot.computed_hash,
        formation_proof_layer_sha256: formationProofLayer.sha256,
        edge_policy: {
            manifest_hash: edgePolicy.manifest_hash,
            orientation: edgePolicy.manifest.orientation,
            waves: edgePolicy.wave_outcomes.length,
            edges: edgePolicy.edges.length,
            role_counts: edgePolicy.role_counts,
            wave_outcomes_sha256: edgePolicy.wave_outcomes_sha256,
            edges_sha256: edgePolicy.edges_sha256,
        },
        sha256,
    }, null, 2)}\n`);
}
