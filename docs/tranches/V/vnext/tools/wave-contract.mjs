import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";
import { validateWaveFormationProof } from "./formation-proof-layer.mjs";
import { loadWaveEdgePolicy } from "./wave-edge-policy.mjs";
import {
    openingStateFailure,
    routingPiFailure,
    waveCell,
    waveCellCount,
    waveFiles,
    waveHeaderFailure,
    waveIdPattern,
    waveSeparatorFailure,
} from "./wave-table-contract.mjs";

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const blockKinds = { L: "list-item", P: "paragraph", T: "table-row" };

function foldedDecision(id, owner, amendments) {
    if (amendments.length) {
        return `Apply ${amendments.join(" and ")} only on their named axes; fold every unaffected clause of this exact block into ${owner}.`;
    }
    const kind = id.startsWith("K-M2-")
        ? "method-convergence"
        : id.startsWith("K-M4-")
            ? "method-parallelism"
            : blockKinds[id.split("-")[1]];
    if (!kind) throw new Error(`cannot derive seed block kind for ${id}`);
    return `Fold every clause of this exact ${kind} into ${owner}; its hashed excerpt is the acceptance boundary.`;
}

export function expandSeedInventory(inventory) {
    if (inventory.schema !== "vnext-seed-row-inventory/3") throw new Error("invalid compact seed inventory schema");
    const phases = inventory.encoding?.phase ?? {};
    const dispositions = inventory.encoding?.disposition ?? {};
    return (inventory.rows ?? []).map((tuple, index) => {
        if (!Array.isArray(tuple) || ![9, 10].includes(tuple.length)) throw new Error(`/rows/${index}: invalid compact tuple`);
        const [id, startLine, startColumn, endLine, endColumn, excerptSha256, phaseCode, dispositionCode, owner, amendmentNumbers = []] = tuple;
        const amendments = amendmentNumbers.map((number) => `OA-${String(number).padStart(2, "0")}`);
        const disposition = dispositions[dispositionCode];
        const exception = inventory.exceptions?.[id];
        const decision = disposition === "folded" ? foldedDecision(id, owner, amendments) : exception?.decision;
        return {
            id,
            source: {
                seed: id.startsWith("H-") ? "handoff" : "kickoff",
                start: [startLine, startColumn],
                end: [endLine, endColumn],
                excerpt_sha256: excerptSha256,
            },
            phase: phases[phaseCode],
            disposition,
            owner,
            decision,
            ...(amendments.length ? { amendments } : {}),
            ...(exception?.retrigger ? { retrigger: exception.retrigger } : {}),
        };
    });
}

export function loadSeedInventory(root = defaultRoot) {
    const compact = parseJsonStrict(readFileSync(resolve(root, "SEED-ROW-INVENTORY.json")));
    return { ...compact, rows: expandSeedInventory(compact) };
}

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
    const inventory = loadSeedInventory(root);
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
            if (cells[waveCell.id] === "ID") {
                const headerFailure = waveHeaderFailure(cells);
                if (headerFailure) throw new Error(`${relative}:${zeroLine + 1}: ${headerFailure}`);
                continue;
            }
            if (/^:?-{3,}:?$/.test(cells[waveCell.id] ?? "")) {
                const separatorFailure = waveSeparatorFailure(cells);
                if (separatorFailure) throw new Error(`${relative}:${zeroLine + 1}: ${separatorFailure}`);
                continue;
            }
            const waveId = cells[waveCell.id] ?? "";
            if (!waveIdPattern.test(waveId)) continue;
            if (cells.length !== waveCellCount) {
                throw new Error(`${relative}:${zeroLine + 1}: ${waveId} must have ${waveCellCount} cells`);
            }
            const openingFailure = openingStateFailure(cells[waveCell.bornRed]);
            if (openingFailure) throw new Error(`${relative}:${zeroLine + 1}: ${waveId} ${openingFailure}`);
            const routingFailure = routingPiFailure(cells[waveCell.routingPi]);
            if (routingFailure) throw new Error(`${relative}:${zeroLine + 1}: ${waveId} ${routingFailure}`);
            if (contracts.has(waveId)) throw new Error(`${relative}:${zeroLine + 1}: duplicate wave ${waveId}`);
            const dependencyText = cells[waveCell.dependencies];
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
                mission: cells[waveCell.mission],
                dependencies,
                born_red: cells[waveCell.bornRed],
                deliverables: cells[waveCell.deliverables],
                gates: [
                    {
                        id: `${slug}.acceptance`,
                        kind: "command",
                        subject: `node .vnext/proof-runner.mjs test/proof/${slug}/run.mjs --manifest test/proof/${slug}/manifest.json`,
                        expected: cells[waveCell.gates],
                    },
                ],
                routing_pi: cells[waveCell.routingPi],
                exclusions: cells[waveCell.exclusions],
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
            routing_pi: contract.routing_pi,
            seed_requirements: contract.seed_requirements,
            ...(contract.formation_proof ? { formation_proof: contract.formation_proof } : {}),
        }))
        .sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id));
}

export function loadFormationRootSeedContract(root = defaultRoot) {
    const requirements = seedRequirementsByOwner(root).get("formation-root") ?? [];
    const preimage = {
        schema: "vnext-formation-root-seed-contract/1",
        owner: "formation-root",
        requirements,
    };
    const computedHash = contractHash(preimage);
    return {
        contract: { ...preimage, contract_hash: computedHash },
        computed_hash: computedHash,
        expected: requirements,
    };
}
