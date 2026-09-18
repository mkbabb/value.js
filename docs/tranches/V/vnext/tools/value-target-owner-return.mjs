import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { resolve } from "node:path";

import { compareCanonicalText, canonicalize, parseJsonStrict } from "./json-contract.mjs";
import { loadWaveRegistry } from "./wave-contract.mjs";
import { edgePolicySha256, requireWaveEdgePolicy, requireWaveOutcome } from "./wave-edge-policy.mjs";

const universalReturnValidator = resolve(new URL("validate-return.mjs", import.meta.url).pathname);
const consumerImmutableCaptureAuthorityFlag = "--consumer-immutable-capture-authority";
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const { edge_policy: waveEdgePolicy } = loadWaveRegistry();

function exactConsumerImmutableCaptureAuthorityArgs(options, pointer, fail) {
    if (options === undefined) return [];
    if (!options || typeof options !== "object" || Array.isArray(options)
        || Object.keys(options).some((key) => key !== "consumerCaptureAuthorityArgs")) {
        fail(`${pointer}/return: owner-return options may contain only consumerCaptureAuthorityArgs`);
        return undefined;
    }
    const args = options.consumerCaptureAuthorityArgs;
    if (args === undefined) return [];
    if (!Array.isArray(args)
        || args.length !== 4
        || args[0] !== consumerImmutableCaptureAuthorityFlag
        || typeof args[1] !== "string"
        || resolve(args[1]) !== args[1]
        || !/^[0-9a-f]{64}$/.test(args[2] ?? "")
        || !/^[0-9a-f]{64}$/.test(args[3] ?? "")) {
        fail(`${pointer}/return: exact caller-supplied ${consumerImmutableCaptureAuthorityFlag} <absolute-path> <file-sha256> <authority-hash> arguments required`);
        return undefined;
    }
    try {
        const metadata = lstatSync(args[1]);
        if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(args[1]) !== args[1]) {
            fail(`${pointer}/return: consumer immutable-capture authority must be a canonical regular non-symlink file`);
            return undefined;
        }
        const fileSha256 = sha256(readFileSync(args[1]));
        if (fileSha256 !== args[2]) {
            fail(`${pointer}/return: consumer immutable-capture authority file SHA-256 computed ${fileSha256}`);
            return undefined;
        }
    } catch (error) {
        fail(`${pointer}/return: consumer immutable-capture authority is unavailable: ${error.message}`);
        return undefined;
    }
    return [...args];
}

export function validateAuthorizationClosure(closure, root, pointer, fail) {
    if (!closure || !Array.isArray(closure.nodes) || !Array.isArray(closure.edges)) {
        fail(`${pointer}/return: immutable-authority receipt lacks its exact closure vectors`);
        return undefined;
    }
    if (closure.node_count !== closure.nodes.length || closure.edge_count !== closure.edges.length) {
        fail(`${pointer}/return: immutable-authority closure counts do not equal its vectors`);
    }
    if (closure.offline_validation_count !== closure.nodes.length - 1) {
        fail(`${pointer}/return: immutable authority must validate each unique descendant exactly once`);
    }
    const nodes = structuredClone(closure.nodes);
    const edges = structuredClone(closure.edges);
    const sortedNodes = [...nodes].sort((left, right) => compareCanonicalText(`${left.wave_id}\0${left.return_hash}`, `${right.wave_id}\0${right.return_hash}`));
    const sortedEdges = [...edges].sort((left, right) => compareCanonicalText(`${left.from}\0${left.to}\0${left.return_hash}\0${left.status}\0${left.role}`, `${right.from}\0${right.to}\0${right.return_hash}\0${right.status}\0${right.role}`));
    if (canonicalize(nodes) !== canonicalize(sortedNodes) || canonicalize(edges) !== canonicalize(sortedEdges)) {
        fail(`${pointer}/return: immutable-authority closure vectors must use canonical text order`);
    }
    const byWave = new Map();
    for (const [index, node] of nodes.entries()) {
        const identity = canonicalize(node);
        const prior = byWave.get(node?.wave_id);
        if (prior && prior !== identity) fail(`${pointer}/return/authorization_closure/nodes/${index}: conflicting immutable wave identity`);
        else if (prior) fail(`${pointer}/return/authorization_closure/nodes/${index}: duplicate immutable wave identity`);
        else byWave.set(node?.wave_id, identity);
    }
    const rootNodes = nodes.filter((node) => node.wave_id === root.wave_id);
    if (rootNodes.length !== 1 || canonicalize(rootNodes[0]) !== canonicalize({
        wave_id: root.wave_id,
        path: root.path,
        file_sha256: root.file_sha256,
        return_hash: root.return_hash,
        wave_contract_sha256: root.wave_contract_sha256,
        status: root.status,
    })) {
        fail(`${pointer}/return: immutable-authority closure does not contain the exact root identity once`);
    }
    const edgeIdentities = new Set();
    for (const [index, edge] of edges.entries()) {
        const producer = nodes.find((node) => node.wave_id === edge?.from);
        const consumer = nodes.find((node) => node.wave_id === edge?.to);
        let policy;
        try {
            policy = requireWaveEdgePolicy(waveEdgePolicy, edge?.from, edge?.to);
        } catch (error) {
            fail(`${pointer}/return/authorization_closure/edges/${index}: ${error.message}`);
            continue;
        }
        const edgeIdentity = `${edge.from}\0${edge.to}`;
        if (edgeIdentities.has(edgeIdentity)) {
            fail(`${pointer}/return/authorization_closure/edges/${index}: duplicate canonical edge`);
        }
        edgeIdentities.add(edgeIdentity);
        if (!producer
            || !consumer
            || producer.return_hash !== edge.return_hash
            || producer.status !== edge.status
            || edge.role !== policy.role
            || canonicalize(edge.allowed_statuses) !== canonicalize(policy.allowed_statuses)
            || edge.edge_policy_sha256 !== edgePolicySha256(policy)
            || !policy.allowed_statuses.includes(edge.status)) {
            fail(`${pointer}/return/authorization_closure/edges/${index}: edge does not bind exact closure nodes`);
        }
    }
    const closureHash = sha256(canonicalize({ nodes, edges }));
    if (closure.closure_hash !== closureHash) {
        fail(`${pointer}/return/authorization_closure/closure_hash: computed ${closureHash}`);
    }
    const descendantClosureHash = sha256(canonicalize({
        nodes: nodes.filter(({ wave_id }) => wave_id !== root.wave_id),
        edges,
    }));
    if (closure.descendant_closure_hash !== descendantClosureHash) {
        fail(`${pointer}/return/authorization_closure/descendant_closure_hash: computed ${descendantClosureHash}`);
    }
    return { nodes, edges, closure_hash: closureHash, descendant_closure_hash: descendantClosureHash };
}

export function mergeAuthorizationClosure(loaded, identities, pointer, fail) {
    for (const [index, node] of (loaded?.authorization_closure?.nodes ?? []).entries()) {
        const identity = canonicalize(node);
        const prior = identities.get(node.wave_id);
        if (prior && canonicalize(prior) !== identity) {
            fail(`${pointer}/authorization_closure/nodes/${index}: wave ${node.wave_id} has conflicting immutable owner histories`);
        } else if (!prior) identities.set(node.wave_id, structuredClone(node));
    }
}

export function valueTargetDecisionHash(waveId, decision) {
    const preimage = { ...decision };
    delete preimage.decision_hash;
    return sha256(canonicalize({ wave_id: waveId, ...preimage }));
}

export function loadUniversalWaveReturn(owner, pointer, fail, cache = new Map(), options) {
    const evidence = owner?.return ?? owner;
    const waveId = owner?.wave_id ?? owner?.owner;
    const consumerCaptureAuthorityArgs = exactConsumerImmutableCaptureAuthorityArgs(options, pointer, fail);
    if (!consumerCaptureAuthorityArgs) return undefined;
    const key = `${evidence?.path}\0${evidence?.file_sha256}\0${evidence?.return_hash}`;
    if (cache.has(key)) {
        const cached = cache.get(key);
        if (canonicalize(cached.consumer_capture_authority_args) !== canonicalize(consumerCaptureAuthorityArgs)) {
            fail(`${pointer}/return: one cached owner return cannot be validated under different consumer immutable-capture authorities`);
            return undefined;
        }
        if (cached.returned.wave_id !== waveId) fail(`${pointer}/return/wave_id: expected ${waveId}; found ${cached.returned.wave_id}`);
        return cached;
    }
    if (typeof evidence?.path !== "string" || !existsSync(evidence.path)) {
        fail(`${pointer}/return/path: missing owner return`);
        return undefined;
    }
    const metadata = lstatSync(evidence.path);
    if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(evidence.path) !== evidence.path) {
        fail(`${pointer}/return/path: canonical regular non-symlink owner return required`);
        return undefined;
    }
    const fileSha256 = sha256(readFileSync(evidence.path));
    if (fileSha256 !== evidence.file_sha256) fail(`${pointer}/return/file_sha256: computed ${fileSha256}`);
    let returned;
    try {
        returned = parseJsonStrict(readFileSync(evidence.path));
    } catch (error) {
        fail(`${pointer}/return: strict JSON parse failed: ${error.message}`);
        return undefined;
    }
    const preimage = structuredClone(returned);
    delete preimage.return_hash;
    const returnHash = sha256(canonicalize(preimage));
    if (returned.return_hash !== returnHash || evidence.return_hash !== returnHash) {
        fail(`${pointer}/return/return_hash: computed ${returnHash}`);
    }
    if (returned.wave_id !== waveId) fail(`${pointer}/return/wave_id: expected ${waveId}; found ${returned.wave_id}`);
    try {
        const outcome = requireWaveOutcome(waveEdgePolicy, waveId);
        if (!outcome.advancing_statuses.includes(returned.status)) {
            fail(`${pointer}/return/status: owner return must use the exact advancing outcome ${JSON.stringify(outcome.advancing_statuses)}; found ${returned.status}`);
        }
    } catch (error) {
        fail(`${pointer}/return/status: ${error.message}`);
    }
    let resultAuthorizationClosure;
    const validation = spawnSync(process.execPath, [
        universalReturnValidator,
        evidence.path,
        "--immutable-authority",
        ...consumerCaptureAuthorityArgs,
    ], {
        encoding: "utf8",
        maxBuffer: 128 * 1024 * 1024,
    });
    if (validation.status !== 0) {
        fail(`${pointer}/return: universal cached-return validation failed: ${(validation.stderr || validation.stdout).trim()}`);
    } else {
        try {
            const receipt = parseJsonStrict(validation.stdout.trim());
            if (receipt.mode !== "offline-immutable-authority"
                || receipt.completion_eligible !== false
                || receipt.immutable_authority_eligible !== true
                || receipt.proof_semantics?.accepted_at_epoch !== true
                || receipt.proof_semantics?.holds_now !== false
                || receipt.proof_semantics?.authorizes_decision !== false
                || receipt.historical_gate_replay?.materialized_pin_count !== 1
                || receipt.historical_gate_replay?.executed_gate_count !== (returned.gates ?? []).filter(({ kind }) => kind === "command").length
                || !/^[0-9a-f]{64}$/.test(receipt.historical_gate_replay?.epoch_sha256 ?? "")
                || receipt.wave_id !== waveId
                || receipt.status !== returned.status
                || receipt.return_hash !== returnHash
                || !/^[0-9a-f]{64}$/.test(receipt.authorization_closure?.closure_hash ?? "")) {
                fail(`${pointer}/return: universal cached-return validation did not prove exact closed decision ancestry`);
            }
            const expectedConsumerCaptureAuthority = consumerCaptureAuthorityArgs.length === 0 ? undefined : {
                path: consumerCaptureAuthorityArgs[1],
                file_sha256: consumerCaptureAuthorityArgs[2],
                authority_hash: consumerCaptureAuthorityArgs[3],
            };
            if (canonicalize(receipt.consumer_immutable_capture_authority) !== canonicalize(expectedConsumerCaptureAuthority)) {
                fail(`${pointer}/return: universal cached-return validation did not preserve the exact caller-supplied consumer immutable-capture authority`);
            }
            resultAuthorizationClosure = validateAuthorizationClosure(receipt.authorization_closure, {
                wave_id: waveId,
                path: evidence.path,
                file_sha256: fileSha256,
                return_hash: returnHash,
                wave_contract_sha256: returned.wave_contract_sha256,
                status: returned.status,
            }, pointer, fail);
        } catch (error) {
            fail(`${pointer}/return: universal cached-return validation receipt is invalid: ${error.message}`);
        }
    }
    const result = {
        returned,
        file_sha256: fileSha256,
        return_hash: returnHash,
        authorization_closure: resultAuthorizationClosure,
        consumer_capture_authority_args: consumerCaptureAuthorityArgs,
    };
    cache.set(key, result);
    return result;
}

export function loadValueTargetOwnerReturn(owner, pointer, fail, cache = new Map(), options) {
    const waveId = owner?.wave_id ?? owner?.owner;
    const result = loadUniversalWaveReturn(owner, pointer, fail, cache, options);
    if (!result) return undefined;
    if (result.decisions) return result;
    const annex = result.returned.annexes?.["value-target-disposition"];
    if (annex?.schema !== "vnext-value-target-disposition-return-annex/1" || annex?.wave_id !== waveId) {
        fail(`${pointer}/return/annexes/value-target-disposition: exact wave-bound typed annex required`);
    }
    const decisions = new Map();
    for (const [index, decision] of (annex?.decisions ?? []).entries()) {
        if (decision.decision_hash !== valueTargetDecisionHash(waveId, decision)) {
            fail(`${pointer}/return/annexes/value-target-disposition/decisions/${index}/decision_hash: invalid projection`);
        }
        if (decisions.has(decision.decision_id)) fail(`${pointer}/return/annexes/value-target-disposition/decisions: duplicate decision ID ${decision.decision_id}`);
        decisions.set(decision.decision_id, decision);
    }
    result.decisions = decisions;
    result.decision_authorized = true;
    return result;
}
