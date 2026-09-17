import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";
import { validateWaveFormationProof } from "./formation-proof-layer.mjs";
import { loadWaveEdgePolicy } from "./wave-edge-policy.mjs";

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const waveFiles = ["waves/P-V.md", "waves/K-A.md", "waves/G-D.md", "waves/M-C.md"];
const wavePattern = /^[PVKAGDMC]\d{2}[A-Z]?$/;

export function seedRequirementProjection(row) {
    return {
        id: row.id,
        source: { seed: row.source.seed, excerpt_sha256: row.source.excerpt_sha256 },
        phase: row.phase,
        disposition: row.disposition,
        decision: row.decision,
        amendments: row.amendments ?? [],
        ...(row.retrigger ? { retrigger: row.retrigger } : {}),
    };
}

function seedRequirementsByOwner(root) {
    const inventory = parseJsonStrict(readFileSync(resolve(root, "SEED-ROW-INVENTORY.json")));
    const byOwner = new Map();
    for (const row of inventory.rows ?? []) {
        const requirements = byOwner.get(row.owner) ?? [];
        requirements.push(seedRequirementProjection(row));
        byOwner.set(row.owner, requirements);
    }
    for (const requirements of byOwner.values()) requirements.sort((left, right) => compareCanonicalText(left.id, right.id));
    return byOwner;
}

export function contractHash(contract) {
    return createHash("sha256").update(canonicalize(contract), "utf8").digest("hex");
}

function loadRawWaveContracts(root) {
    const contracts = new Map();
    const seedRequirements = seedRequirementsByOwner(root);
    for (const relative of waveFiles) {
        const source = readFileSync(resolve(root, relative), "utf8");
        for (const [zeroLine, line] of source.split("\n").entries()) {
            if (!line.startsWith("|")) continue;
            const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
            const waveId = cells[0] ?? "";
            if (!wavePattern.test(waveId)) continue;
            if (cells.length !== 7) throw new Error(`${relative}:${zeroLine + 1}: ${waveId} must have seven cells`);
            if (contracts.has(waveId)) throw new Error(`${relative}:${zeroLine + 1}: duplicate wave ${waveId}`);
            const dependencyText = cells[2];
            const dependencies = /^(?:None|—|-)$/.test(dependencyText)
                ? []
                : dependencyText.split(",").map((value) => value.trim());
            const slug = waveId.toLowerCase();
            const formationProof = validateWaveFormationProof(waveId, cells);
            if (formationProof.failures.length !== 0) {
                throw new Error(`${relative}:${zeroLine + 1}: ${formationProof.failures.join("; ")}`);
            }
            const contract = {
                schema: "vnext-wave-contract/1",
                wave_id: waveId,
                mission: cells[1],
                dependencies,
                born_red: cells[3],
                deliverables: cells[4],
                gates: [
                    {
                        id: `${slug}.acceptance`,
                        kind: "command",
                        subject: `node .vnext/proof-runner.mjs test/proof/${slug}/run.mjs --manifest test/proof/${slug}/manifest.json`,
                        expected: cells[5],
                    },
                ],
                exclusions: cells[6],
                seed_requirements: seedRequirements.get(waveId) ?? [],
                ...(formationProof.proof ? { formation_proof: formationProof.proof } : {}),
            };
            contracts.set(waveId, {
                contract,
                source: relative,
                line: zeroLine + 1,
            });
        }
    }
    return contracts;
}

export function loadWaveRegistry(root = defaultRoot) {
    const contracts = loadRawWaveContracts(root);
    const edgePolicy = loadWaveEdgePolicy(root, contracts);
    for (const [waveId, entry] of contracts) {
        const outcome = edgePolicy.by_wave.get(waveId);
        entry.contract.outcome_policy = {
            class: outcome.outcome_class,
            advancing_statuses: outcome.advancing_statuses,
        };
        entry.contract.dependency_policies = edgePolicy.edges
            .filter(({ to }) => to === waveId)
            .map((edge) => structuredClone(edge));
        entry.contract.edge_policy_manifest_sha256 = edgePolicy.manifest_hash;
        entry.sha256 = contractHash(entry.contract);
    }
    return { contracts, edge_policy: edgePolicy };
}

export function loadWaveContracts(root = defaultRoot) {
    return loadWaveRegistry(root).contracts;
}

export function waveContractManifest(root = defaultRoot) {
    return [...loadWaveContracts(root).values()]
        .map(({ contract, sha256, source, line }) => ({
            wave_id: contract.wave_id,
            sha256,
            source,
            line,
            gates: contract.gates,
            outcome_policy: contract.outcome_policy,
            dependency_policies: contract.dependency_policies,
            edge_policy_manifest_sha256: contract.edge_policy_manifest_sha256,
            seed_requirements: contract.seed_requirements,
            ...(contract.formation_proof ? { formation_proof: contract.formation_proof } : {}),
        }))
        .sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id));
}

export function loadFormationRootSeedContract(root = defaultRoot) {
    const contract = parseJsonStrict(readFileSync(resolve(root, "FORMATION-ROOT-SEED-CONTRACT.json")));
    const preimage = { ...contract };
    delete preimage.contract_hash;
    return { contract, computed_hash: contractHash(preimage), expected: seedRequirementsByOwner(root).get("formation-root") ?? [] };
}
