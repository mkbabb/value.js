import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { compareCanonicalText, canonicalize, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import { waveIdPattern } from "./wave-table-contract.mjs";

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const policyFile = "WAVE-EDGE-POLICY.json";
const schemaFile = "wave-edge-policy.schema.json";

const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const same = (left, right) => canonicalize(left) === canonicalize(right);
const contractOf = (entry) => entry?.contract ?? entry;
const edgeKey = (from, to) => `${from}\0${to}`;

export function edgePolicySha256(policy) {
    return sha256(canonicalize({
        from: policy.from,
        to: policy.to,
        role: policy.role,
        allowed_statuses: policy.allowed_statuses,
    }));
}

function assertSortedUnique(values, label, failures) {
    if (!Array.isArray(values)) {
        failures.push(`${label}: expected an array`);
        return;
    }
    if (new Set(values).size !== values.length) failures.push(`${label}: contains a duplicate`);
    if (!same(values, [...values].sort(compareCanonicalText))) failures.push(`${label}: must use canonical text order`);
}

export function formationGraphSha256(contracts) {
    const canonical = [...contracts.entries()]
        .map(([id, entry]) => ({ id, contract: contractOf(entry) }))
        .sort((left, right) => compareCanonicalText(left.id, right.id))
        .map(({ id, contract }) => ({
            id,
            dependencies: contract.dependencies.length ? contract.dependencies.join(", ") : "None",
        }))
        .map((row) => JSON.stringify(row))
        .join("\n");
    return sha256(canonical);
}

export function validateWaveEdgePolicy({ manifest, schema, schemaSha256, contracts }) {
    const failures = validateJsonSchema(manifest, schema);
    const waveIds = [...contracts.keys()].sort(compareCanonicalText);
    const waveIdSet = new Set(waveIds);
    const classes = manifest.classes ?? {};
    const defaultClass = manifest.default_wave_class;

    if (manifest.policy_schema_sha256 !== schemaSha256) {
        failures.push(`/policy_schema_sha256: computed ${schemaSha256}`);
    }
    const manifestPreimage = structuredClone(manifest);
    delete manifestPreimage.manifest_hash;
    const computedManifestHash = sha256(canonicalize(manifestPreimage));
    if (manifest.manifest_hash !== computedManifestHash) {
        failures.push(`/manifest_hash: computed ${computedManifestHash}`);
    }
    const graphHash = formationGraphSha256(contracts);
    if (manifest.formation_graph_sha256 !== graphHash) {
        failures.push(`/formation_graph_sha256: computed ${graphHash}`);
    }
    if (!classes[defaultClass]) failures.push(`/default_wave_class: unknown class ${defaultClass}`);

    const classByWave = new Map(waveIds.map((waveId) => [waveId, defaultClass]));
    const overriddenWaves = new Set();
    for (const [groupIndex, group] of (manifest.wave_class_overrides ?? []).entries()) {
        const pointer = `/wave_class_overrides/${groupIndex}`;
        if (!classes[group.class]) failures.push(`${pointer}/class: unknown class ${group.class}`);
        assertSortedUnique(group.waves, `${pointer}/waves`, failures);
        for (const waveId of group.waves ?? []) {
            if (!waveIdSet.has(waveId)) failures.push(`${pointer}/waves: unknown wave ${waveId}`);
            if (overriddenWaves.has(waveId)) failures.push(`${pointer}/waves: wave ${waveId} is overridden more than once`);
            overriddenWaves.add(waveId);
            classByWave.set(waveId, group.class);
        }
    }

    const waveOutcomes = waveIds.map((waveId) => {
        const outcomeClass = classByWave.get(waveId);
        return {
            wave_id: waveId,
            outcome_class: outcomeClass,
            advancing_statuses: [...(classes[outcomeClass]?.advancing_statuses ?? [])],
        };
    });
    const waveOutcomesSha256 = sha256(canonicalize(waveOutcomes));

    const canonicalEdges = new Map();
    for (const consumer of waveIds) {
        const contract = contractOf(contracts.get(consumer));
        if (!Array.isArray(contract?.dependencies)) {
            failures.push(`/waves/${consumer}/dependencies: expected an array`);
            continue;
        }
        if (new Set(contract.dependencies).size !== contract.dependencies.length) {
            failures.push(`/waves/${consumer}/dependencies: contains a duplicate`);
        }
        for (const producer of contract.dependencies) {
            if (!waveIdPattern.test(producer) || !waveIdSet.has(producer)) {
                failures.push(`/waves/${consumer}/dependencies: unknown producer ${producer}`);
                continue;
            }
            const key = edgeKey(producer, consumer);
            if (canonicalEdges.has(key)) failures.push(`/waves/${consumer}/dependencies: duplicate edge ${producer} -> ${consumer}`);
            canonicalEdges.set(key, { from: producer, to: consumer });
        }
    }

    const overrides = new Map();
    for (const [index, override] of (manifest.edge_overrides ?? []).entries()) {
        const pointer = `/edge_overrides/${index}`;
        const key = edgeKey(override.from, override.to);
        if (overrides.has(key)) failures.push(`${pointer}: duplicate override ${override.from} -> ${override.to}`);
        overrides.set(key, override);
        if (!canonicalEdges.has(key)) failures.push(`${pointer}: ${override.from} -> ${override.to} is not a canonical producer-to-consumer edge`);
        assertSortedUnique(override.allowed_statuses, `${pointer}/allowed_statuses`, failures);
        const producerClass = classes[classByWave.get(override.from)];
        const base = {
            from: override.from,
            to: override.to,
            role: producerClass?.edge_role,
            allowed_statuses: producerClass?.advancing_statuses ?? [],
        };
        const widened = (override.allowed_statuses ?? []).filter((status) => !base.allowed_statuses.includes(status));
        if (widened.length) failures.push(`${pointer}/allowed_statuses: widens producer outcomes with ${widened.join(",")}`);
        if ((override.allowed_statuses ?? []).length === 0) failures.push(`${pointer}/allowed_statuses: cannot be empty`);
        if (same(override, base)) failures.push(`${pointer}: redundant override equals the producer-class policy`);
    }

    const edges = [...canonicalEdges.values()]
        .map(({ from, to }) => {
            const outcomeClass = classes[classByWave.get(from)];
            const base = {
                from,
                to,
                role: outcomeClass?.edge_role,
                allowed_statuses: [...(outcomeClass?.advancing_statuses ?? [])],
            };
            const override = overrides.get(edgeKey(from, to));
            return override ? structuredClone(override) : base;
        })
        .sort((left, right) => compareCanonicalText(edgeKey(left.from, left.to), edgeKey(right.from, right.to)));
    const edgesSha256 = sha256(canonicalize(edges));
    const roleCounts = Object.fromEntries(
        [...new Set(edges.map(({ role }) => role))]
            .sort(compareCanonicalText)
            .map((role) => [role, edges.filter((edge) => edge.role === role).length]),
    );

    const expected = manifest.expected ?? {};
    if (expected.wave_count !== waveOutcomes.length) failures.push(`/expected/wave_count: expanded ${waveOutcomes.length}`);
    if (expected.edge_count !== edges.length) failures.push(`/expected/edge_count: expanded ${edges.length}`);
    if (!same(expected.role_counts, roleCounts)) failures.push(`/expected/role_counts: expanded ${canonicalize(roleCounts)}`);
    if (expected.wave_outcomes_sha256 !== waveOutcomesSha256) {
        failures.push(`/expected/wave_outcomes_sha256: expanded ${waveOutcomesSha256}`);
    }
    if (expected.edges_sha256 !== edgesSha256) failures.push(`/expected/edges_sha256: expanded ${edgesSha256}`);

    if (failures.length) throw new Error(failures.join("\n"));
    const byEdge = new Map(edges.map((edge) => [edgeKey(edge.from, edge.to), edge]));
    const byWave = new Map(waveOutcomes.map((row) => [row.wave_id, row]));
    return {
        manifest,
        manifest_hash: computedManifestHash,
        schema_sha256: schemaSha256,
        formation_graph_sha256: graphHash,
        wave_outcomes: waveOutcomes,
        wave_outcomes_sha256: waveOutcomesSha256,
        edges,
        edges_sha256: edgesSha256,
        role_counts: roleCounts,
        by_edge: byEdge,
        by_wave: byWave,
    };
}

export function loadWaveEdgePolicy(root = defaultRoot, contracts) {
    if (!(contracts instanceof Map)) throw new Error(`wave edge policy requires the canonical wave-contract map`);
    const manifestPath = resolve(root, policyFile);
    const schemaPath = resolve(root, schemaFile);
    const manifest = parseJsonStrict(readFileSync(manifestPath));
    const schemaBytes = readFileSync(schemaPath);
    const schema = parseJsonStrict(schemaBytes);
    return validateWaveEdgePolicy({
        manifest,
        schema,
        schemaSha256: sha256(schemaBytes),
        contracts,
    });
}

export function requireWaveEdgePolicy(policy, from, to) {
    const edge = policy.by_edge.get(edgeKey(from, to));
    if (!edge) throw new Error(`${from} -> ${to} is not a canonical wave edge`);
    return edge;
}

export function requireWaveOutcome(policy, waveId) {
    const outcome = policy.by_wave.get(waveId);
    if (!outcome) throw new Error(`${waveId} has no canonical advancing-status policy`);
    return outcome;
}
