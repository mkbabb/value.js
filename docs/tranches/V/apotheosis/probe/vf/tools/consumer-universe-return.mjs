import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";

import { canonicalize, compareCanonicalText, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import {
    canonicalConsumerBoundsAuthority,
    validateConsumerBoundsAuthority,
} from "./consumer-bounds-authority.mjs";
import {
    consumerEdgeObservationMode,
    consumerWaveRegistry,
    validateConsumerRootState,
    verifyConsumerEvidence,
    verifyConsumerOwner,
} from "./resolve-consumer-universe.mjs";

const root = resolve(new URL("..", import.meta.url).pathname);
const inputSchemaPath = resolve(root, "consumer-universe.schema.json");
const receiptSchemaPath = resolve(root, "consumer-universe-receipt.schema.json");
const resolverPath = resolve(root, "tools/resolve-consumer-universe.mjs");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const compareObservation = (left, right) =>
    compareCanonicalText(left.canonical_realpath, right.canonical_realpath)
    || compareCanonicalText(left.locator, right.locator)
    || compareCanonicalText(left.path, right.path)
    || compareCanonicalText(left.file_sha256, right.file_sha256);
const hashPattern = /^[0-9a-f]{64}$/;
const immutableBindingSchema = "vnext-consumer-universe-immutable-binding/1";
const immutableBindingFields = [
    "receipt_path",
    "receipt_file_sha256",
    "receipt_hash",
    "input_path",
    "input_file_sha256",
    "universe_hash",
    "resolver_sha256",
    "input_schema_sha256",
    "receipt_schema_sha256",
    "bounds_authority",
    "bounds_sha256",
    "formation_wave_registry_sha256",
    "observed_at",
    "resolved_at",
    "epoch",
    "counts",
    "roots_sha256",
    "edges_sha256",
    "resolvable",
    "blockers",
];
const immutableBindingKeys = ["schema", ...immutableBindingFields].sort(compareCanonicalText);

function exactObjectKeys(value, expected, label) {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
    const actual = Object.keys(value).sort(compareCanonicalText);
    if (canonicalize(actual) !== canonicalize(expected)) throw new Error(`${label} fields must be exact`);
}

export function consumerUniverseImmutableBindingProjection(source) {
    if (!source || typeof source !== "object" || Array.isArray(source)) {
        throw new Error("consumer-universe immutable binding source must be an authenticated projection object");
    }
    return {
        schema: immutableBindingSchema,
        ...Object.fromEntries(immutableBindingFields.map((field) => [field, structuredClone(source[field])])),
    };
}

export function validateConsumerUniverseImmutableBinding(binding) {
    exactObjectKeys(binding, immutableBindingKeys, "consumer-universe immutable binding");
    if (binding.schema !== immutableBindingSchema) throw new Error(`consumer-universe immutable binding schema must be ${immutableBindingSchema}`);
    for (const field of [
        "receipt_file_sha256",
        "receipt_hash",
        "input_file_sha256",
        "universe_hash",
        "resolver_sha256",
        "input_schema_sha256",
        "receipt_schema_sha256",
        "bounds_sha256",
        "formation_wave_registry_sha256",
        "roots_sha256",
        "edges_sha256",
    ]) {
        if (!hashPattern.test(binding[field] ?? "")) throw new Error(`consumer-universe immutable binding ${field} must be a lowercase SHA-256`);
    }
    for (const field of ["receipt_path", "input_path"]) {
        if (typeof binding[field] !== "string" || !isAbsolute(binding[field]) || resolve(binding[field]) !== binding[field]) {
            throw new Error(`consumer-universe immutable binding ${field} must be an absolute normalized path`);
        }
    }
    for (const field of ["observed_at", "resolved_at"]) {
        if (typeof binding[field] !== "string" || !Number.isFinite(Date.parse(binding[field]))) {
            throw new Error(`consumer-universe immutable binding ${field} must be a date-time`);
        }
    }
    exactObjectKeys(binding.bounds_authority, ["file_sha256", "manifest_hash", "path"], "consumer-universe immutable binding bounds authority");
    if (typeof binding.bounds_authority.path !== "string" || !isAbsolute(binding.bounds_authority.path)
        || resolve(binding.bounds_authority.path) !== binding.bounds_authority.path
        || !hashPattern.test(binding.bounds_authority.file_sha256 ?? "")
        || !hashPattern.test(binding.bounds_authority.manifest_hash ?? "")) {
        throw new Error("consumer-universe immutable binding bounds authority is malformed");
    }
    if (!binding.epoch || typeof binding.epoch !== "object" || Array.isArray(binding.epoch)
        || !binding.counts || typeof binding.counts !== "object" || Array.isArray(binding.counts)
        || typeof binding.resolvable !== "boolean"
        || !Array.isArray(binding.blockers) || binding.blockers.some((item) => typeof item !== "string" || item.length === 0)) {
        throw new Error("consumer-universe immutable binding epoch, counts, resolvability, or blockers are malformed");
    }
    return structuredClone(binding);
}

function requireFile(path, label) {
    if (!isAbsolute(path) || !existsSync(path) || !statSync(path).isFile()) throw new Error(`${label} must be an existing absolute file: ${path}`);
    if (realpathSync(path) !== path) throw new Error(`${label} must use canonical realpath ${realpathSync(path)}`);
}

function statusCount(values, status) {
    return values.filter((value) => (value.disposition?.status ?? value.status) === status).length;
}

function rootProjection(rootRecord) {
    const projection = {
        id: rootRecord.id,
        repository: rootRecord.repository,
        canonical_realpath: rootRecord.canonical_realpath,
        branch: rootRecord.branch,
        head: rootRecord.head,
        dirty_sha256: rootRecord.dirty_sha256,
        origins: [...rootRecord.provenance.origins.values].sort(compareCanonicalText),
        worktrees: [...rootRecord.provenance.worktrees.values].sort(compareCanonicalText),
        status: rootRecord.disposition.status,
    };
    if (rootRecord.disposition.owner_wave) projection.owner_wave = rootRecord.disposition.owner_wave;
    if (rootRecord.disposition.reason) projection.reason = rootRecord.disposition.reason;
    if (rootRecord.disposition.retrigger) {
        projection.retrigger_wave = rootRecord.disposition.retrigger.wave_id;
        projection.condition = rootRecord.disposition.retrigger.condition;
    }
    return projection;
}

function edgeProjection(edge, observations) {
    const projection = {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        package: edge.package,
        specifier: edge.specifier,
        kind: edge.kind,
        owner_wave: edge.owner_wave,
        status: edge.disposition.status,
        observations,
        observations_sha256: sha256(canonicalize(observations)),
    };
    if (edge.disposition.reason) projection.reason = edge.disposition.reason;
    if (edge.disposition.retrigger) {
        projection.retrigger_wave = edge.disposition.retrigger.wave_id;
        projection.condition = edge.disposition.retrigger.condition;
    }
    return projection;
}

function universeBlockers(universe) {
    const blockers = [];
    for (const rootRecord of universe.roots) {
        if (rootRecord.disposition.status !== "unavailable") continue;
        blockers.push(`root:${rootRecord.id}:unavailable:${rootRecord.disposition.retrigger.wave_id}:${rootRecord.disposition.retrigger.condition}`);
    }
    for (const edge of universe.edges) {
        if (edge.disposition.status !== "unavailable") continue;
        blockers.push(`edge:${edge.id}:unavailable:${edge.disposition.retrigger.wave_id}:${edge.disposition.retrigger.condition}`);
    }
    return blockers.sort(compareCanonicalText);
}

function exactPathSet(actual, expected, label) {
    const left = [...new Set(actual)].sort(compareCanonicalText);
    const right = [...new Set(expected)].sort(compareCanonicalText);
    if (canonicalize(left) !== canonicalize(right)) throw new Error(`${label} is not exact`);
}

function capturedPath(path, label) {
    if (typeof path !== "string" || !isAbsolute(path) || resolve(path) !== path) {
        throw new Error(`${label} must be an absolute normalized captured path`);
    }
}

function within(base, candidate) {
    const offset = relative(base, candidate);
    return offset === "" || (!offset.startsWith("..") && !isAbsolute(offset));
}

function verifyCapturedEvidence(evidence, context, requiredBase = undefined) {
    if (!Array.isArray(evidence)) throw new Error(`${context} evidence must be an array`);
    const identities = new Set();
    for (const [index, item] of evidence.entries()) {
        if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(`${context} evidence ${index + 1} is malformed`);
        capturedPath(item.path, `${context} evidence ${index + 1} path`);
        capturedPath(item.canonical_realpath, `${context} evidence ${index + 1} canonical realpath`);
        if (!hashPattern.test(item.sha256 ?? "") || typeof item.description !== "string" || item.description.length === 0) {
            throw new Error(`${context} evidence ${index + 1} lacks its captured hash or description`);
        }
        if (requiredBase && !within(requiredBase, item.canonical_realpath)) {
            throw new Error(`${context} evidence ${index + 1} escapes source root ${requiredBase}: ${item.canonical_realpath}`);
        }
        const identity = `${item.canonical_realpath}\0${item.sha256}`;
        if (identities.has(identity)) throw new Error(`${context} repeats semantic evidence ${item.canonical_realpath}`);
        identities.add(identity);
    }
}

function verifyImmutableRequiredConsumerIdentities(bounds, rootsById) {
    const requiredRootIds = new Set();
    const requiredRootPaths = new Set();
    const requiredRootsById = new Map();
    for (const required of bounds.required_roots) {
        if (requiredRootIds.has(required.id)) throw new Error(`duplicate required consumer root ID ${required.id}`);
        if (requiredRootPaths.has(required.canonical_realpath)) throw new Error(`duplicate required consumer root realpath ${required.canonical_realpath}`);
        requiredRootIds.add(required.id);
        requiredRootPaths.add(required.canonical_realpath);
        requiredRootsById.set(required.id, required);
        const rootRecord = rootsById.get(required.id);
        if (!rootRecord || rootRecord.canonical_realpath !== required.canonical_realpath) {
            throw new Error(`required consumer root identity missing: ${required.id}`);
        }
        if (rootRecord.disposition.status === "excluded") throw new Error(`required consumer root ${required.id} cannot be excluded`);
    }

    const requiredPathIds = new Set();
    const requiredCanonicalPaths = new Set();
    for (const required of bounds.required_paths) {
        if (requiredPathIds.has(required.id) || requiredRootIds.has(required.id)) {
            throw new Error(`duplicate required consumer identity ID ${required.id}`);
        }
        requiredPathIds.add(required.id);
        const declaration = requiredRootsById.get(required.repository_root_id);
        const rootRecord = rootsById.get(required.repository_root_id);
        if (!declaration || !rootRecord) {
            throw new Error(`required consumer path ${required.id} names unknown repository root ${required.repository_root_id}`);
        }
        capturedPath(required.path, `required consumer path ${required.id}`);
        capturedPath(required.canonical_realpath, `required consumer path ${required.id} canonical realpath`);
        const expectedCanonical = resolve(declaration.canonical_realpath, required.relative_path);
        if (required.kind !== "repository-subdirectory"
            || expectedCanonical !== required.canonical_realpath
            || expectedCanonical === declaration.canonical_realpath
            || !within(declaration.canonical_realpath, expectedCanonical)) {
            throw new Error(`required consumer path ${required.id} violates its typed repository-subdirectory law`);
        }
        if (requiredCanonicalPaths.has(required.canonical_realpath) || requiredRootPaths.has(required.canonical_realpath)) {
            throw new Error(`duplicate required consumer identity realpath ${required.canonical_realpath}`);
        }
        requiredCanonicalPaths.add(required.canonical_realpath);
        if (rootRecord.disposition.status !== "unavailable"
            && (!within(rootRecord.canonical_realpath, required.canonical_realpath)
                || required.canonical_realpath === rootRecord.canonical_realpath)) {
            throw new Error(`required consumer path escapes repository root: ${required.id}`);
        }
    }
}

function validateImmutableConsumerRootState(universe, bounds, waveIds) {
    const rootIds = new Set();
    const declaredRealpaths = new Map();
    const rootsById = new Map();
    const blockers = [];
    for (const rootRecord of universe.roots) {
        if (rootIds.has(rootRecord.id)) throw new Error(`duplicate root id ${rootRecord.id}`);
        rootIds.add(rootRecord.id);
        rootsById.set(rootRecord.id, rootRecord);
        capturedPath(rootRecord.path, `root ${rootRecord.id} path`);
        capturedPath(rootRecord.canonical_realpath, `root ${rootRecord.id} canonical realpath`);
        if (declaredRealpaths.has(rootRecord.canonical_realpath)) {
            throw new Error(`duplicate canonical realpath ${rootRecord.canonical_realpath} for ${declaredRealpaths.get(rootRecord.canonical_realpath)} and ${rootRecord.id}`);
        }
        declaredRealpaths.set(rootRecord.canonical_realpath, rootRecord.id);
        if (!bounds.search_roots.some((search) => within(search.canonical_realpath, rootRecord.canonical_realpath))) {
            throw new Error(`root ${rootRecord.id} escapes every bounded search root: ${rootRecord.canonical_realpath}`);
        }
        for (const [name, observedSet] of Object.entries(rootRecord.provenance)) {
            verifyCapturedEvidence(observedSet.evidence, `root ${rootRecord.id} ${name}`);
            if (!Array.isArray(observedSet.values) || new Set(observedSet.values).size !== observedSet.values.length) {
                throw new Error(`root ${rootRecord.id} ${name} values must be unique`);
            }
        }
        if (!rootRecord.provenance.worktrees.values.includes(rootRecord.canonical_realpath)) {
            throw new Error(`root ${rootRecord.id} captured worktrees omit its canonical realpath`);
        }
        for (const worktree of rootRecord.provenance.worktrees.values) capturedPath(worktree, `root ${rootRecord.id} worktree`);
        if (rootRecord.disposition.status === "unavailable") {
            verifyCapturedEvidence(rootRecord.disposition.evidence, `unavailable root ${rootRecord.id}`);
            verifyConsumerOwner(waveIds, rootRecord.disposition.retrigger.wave_id, `unavailable root ${rootRecord.id} retrigger`);
            blockers.push(`root:${rootRecord.id}:unavailable:${rootRecord.disposition.retrigger.wave_id}:${rootRecord.disposition.retrigger.condition}`);
        } else if (rootRecord.disposition.status === "included") {
            verifyConsumerOwner(waveIds, rootRecord.disposition.owner_wave, `included root ${rootRecord.id}`);
        } else {
            verifyCapturedEvidence(rootRecord.disposition.evidence, `excluded root ${rootRecord.id}`, rootRecord.canonical_realpath);
        }
    }
    verifyImmutableRequiredConsumerIdentities(bounds, rootsById);
    return { rootsById, blockers };
}

export function validateConsumerUniverseReceipt(receiptPath, options = {}) {
    exactObjectKeys(options, [
        "allowFixtureBoundsAuthority",
        "allowedAdditionalWorktrees",
        "boundsAuthority",
        "boundsAuthorityVerificationPath",
        "immutableBinding",
        "now",
        "requireCanonicalBoundsAuthority",
        "requireResolvable",
        "validationMode",
    ].filter((field) => Object.hasOwn(options, field)).sort(compareCanonicalText), "consumer-universe receipt validation options");
    const validationMode = options.validationMode ?? "live";
    if (validationMode !== "live" && validationMode !== "immutable") {
        throw new Error(`consumer-universe receipt validation mode must be live or immutable; found ${validationMode}`);
    }
    const requireResolvable = options.requireResolvable ?? true;
    const now = options.now ?? Date.now();
    const boundsAuthority = options.boundsAuthority ?? canonicalConsumerBoundsAuthority();
    const boundsAuthorityVerificationPath = options.boundsAuthorityVerificationPath;
    const requireCanonicalBoundsAuthority = options.requireCanonicalBoundsAuthority ?? boundsAuthorityVerificationPath === undefined;
    const allowFixtureBoundsAuthority = options.allowFixtureBoundsAuthority ?? false;
    const allowedAdditionalWorktrees = options.allowedAdditionalWorktrees ?? [];
    if (!Array.isArray(allowedAdditionalWorktrees)) throw new Error("allowed additional Git worktrees must be an array");
    let immutableBinding;
    if (validationMode === "immutable") {
        if (options.immutableBinding === undefined) throw new Error("immutable consumer-universe receipt validation requires an authenticated immutable binding");
        if (allowedAdditionalWorktrees.length !== 0) throw new Error("immutable consumer-universe receipt validation cannot accept live additional-worktree allowances");
        if (Object.hasOwn(options, "now")) throw new Error("immutable consumer-universe receipt validation cannot accept a live clock override");
        immutableBinding = validateConsumerUniverseImmutableBinding(options.immutableBinding);
        if (immutableBinding.receipt_path !== receiptPath) throw new Error("consumer-universe immutable binding receipt path differs from the requested receipt");
    } else if (options.immutableBinding !== undefined) {
        throw new Error("live consumer-universe receipt validation cannot accept an immutable binding");
    }

    requireFile(receiptPath, "consumer-universe receipt");
    const receiptSource = decodeUtf8Strict(readFileSync(receiptPath));
    const receipt = parseJsonStrict(receiptSource);
    if (receiptSource !== `${canonicalize(receipt)}\n`) throw new Error("consumer-universe receipt must be exact RFC 8785/JCS plus one newline");

    const receiptSchemaSource = decodeUtf8Strict(readFileSync(receiptSchemaPath));
    const receiptSchema = parseJsonStrict(receiptSchemaSource);
    const receiptErrors = validateJsonSchema(receipt, receiptSchema);
    if (receiptErrors.length) throw new Error(`consumer-universe receipt schema failure:\n${receiptErrors.join("\n")}`);
    const preimage = structuredClone(receipt);
    delete preimage.receipt_hash;
    const receiptHash = sha256(canonicalize(preimage));
    if (receipt.receipt_hash !== receiptHash) throw new Error(`consumer-universe receipt hash ${receipt.receipt_hash}; expected ${receiptHash}`);

    requireFile(receipt.input.path, "consumer-universe input");
    const inputSource = decodeUtf8Strict(readFileSync(receipt.input.path));
    if (sha256(inputSource) !== receipt.input.file_sha256) throw new Error("consumer-universe input file hash drift");
    const inputSchemaSource = decodeUtf8Strict(readFileSync(inputSchemaPath));
    const inputSchema = parseJsonStrict(inputSchemaSource);
    const universe = parseJsonStrict(inputSource);
    const inputErrors = validateJsonSchema(universe, inputSchema);
    if (inputErrors.length) throw new Error(`consumer-universe input schema failure:\n${inputErrors.join("\n")}`);
    const universePreimage = structuredClone(universe);
    delete universePreimage.universe_hash;
    const universeHash = sha256(canonicalize(universePreimage));
    if (universe.universe_hash !== universeHash || receipt.input.universe_hash !== universeHash) throw new Error("consumer-universe semantic input hash drift");

    if (validationMode === "live" && receipt.schema_sha256 !== sha256(inputSchemaSource)) throw new Error("consumer-universe input schema hash drift");
    if (validationMode === "live" && receipt.receipt_schema_sha256 !== sha256(receiptSchemaSource)) throw new Error("consumer-universe receipt schema hash drift");
    if (validationMode === "live" && receipt.resolver_sha256 !== sha256(readFileSync(resolverPath))) throw new Error("consumer-universe resolver hash drift");
    const registry = consumerWaveRegistry();
    if (validationMode === "live" && receipt.formation_wave_registry_sha256 !== registry.sha256) throw new Error("consumer-universe wave registry hash drift");
    if (canonicalize(receipt.discovery_methods) !== canonicalize([...universe.discovery.methods].sort(compareCanonicalText))) {
        throw new Error("consumer-universe discovery-method projection drift");
    }

    const authority = validateConsumerBoundsAuthority(boundsAuthority, {
        verificationPath: boundsAuthorityVerificationPath ?? boundsAuthority.path,
        requireCanonicalPath: requireCanonicalBoundsAuthority,
        allowFixtureProfile: allowFixtureBoundsAuthority,
    });
    if (canonicalize(universe.discovery.bounds) !== canonicalize(authority.manifest.bounds)) throw new Error("consumer-universe bounds differ from the bound C00U authority");
    if (receipt.epoch.bounds_sha256 !== authority.bounds_sha256) throw new Error("consumer-universe receipt does not bind authority bounds hash");
    if (validationMode === "live") verifyConsumerEvidence(universe.discovery.evidence, "discovery");
    else verifyCapturedEvidence(universe.discovery.evidence, "discovery");
    const rootState = validationMode === "live"
        ? validateConsumerRootState(
            universe,
            authority.manifest.bounds,
            registry.ids,
            { allowedAdditionalWorktrees },
        )
        : validateImmutableConsumerRootState(universe, authority.manifest.bounds, registry.ids);

    const epochPreimage = structuredClone(receipt.epoch);
    delete epochPreimage.epoch_sha256;
    if (receipt.epoch.epoch_sha256 !== sha256(canonicalize(epochPreimage))) throw new Error("consumer-universe epoch hash drift");
    const started = Date.parse(receipt.epoch.started_at);
    const completed = Date.parse(receipt.epoch.completed_at);
    const observed = Date.parse(receipt.observed_at);
    const resolved = Date.parse(receipt.resolved_at);
    if (![started, completed, observed, resolved].every(Number.isFinite)) throw new Error("consumer-universe timestamps are invalid");
    if (universe.observed_at !== receipt.observed_at || receipt.observed_at !== universe.discovery.epoch.completed_at) throw new Error("consumer-universe observation timestamp drift");
    if (completed < started || resolved < completed) throw new Error("consumer-universe epoch ordering is invalid");
    if ((completed - started) / 1000 > receipt.epoch.max_age_seconds || receipt.epoch.max_age_seconds > 3600) throw new Error("consumer-universe epoch exceeds its bounded lifetime");
    if (validationMode === "live" && (now - resolved > receipt.epoch.max_age_seconds * 1000 || resolved - now > 5000)) {
        throw new Error("consumer-universe receipt is stale or future-dated");
    }

    const roots = [...receipt.roots];
    const edges = [...receipt.edges];
    if (canonicalize(roots.map(({ id }) => id)) !== canonicalize(roots.map(({ id }) => id).sort(compareCanonicalText)) || new Set(roots.map(({ id }) => id)).size !== roots.length) {
        throw new Error("consumer-universe receipt roots must be uniquely ID-sorted");
    }
    if (canonicalize(edges.map(({ id }) => id)) !== canonicalize(edges.map(({ id }) => id).sort(compareCanonicalText)) || new Set(edges.map(({ id }) => id)).size !== edges.length) {
        throw new Error("consumer-universe receipt edges must be uniquely ID-sorted");
    }
    const expectedRoots = universe.roots.map(rootProjection).sort((left, right) => compareCanonicalText(left.id, right.id));
    if (canonicalize(roots) !== canonicalize(expectedRoots)) throw new Error("consumer-universe receipt roots are not the exact input disposition projection");

    const universeEdgesById = new Map(universe.edges.map((edge) => [edge.id, edge]));
    for (const edge of edges) {
        const declared = universeEdgesById.get(edge.id);
        if (!declared) throw new Error(`consumer-universe receipt contains undeclared edge: ${edge.id}`);
        const scope = authority.manifest.bounds.edge_scope.find((item) => item.package === declared.package && item.target === declared.target);
        if (!scope || !scope.kinds.includes(declared.kind)) throw new Error(`consumer-universe edge lies outside the bound scope: ${edge.id}`);
        verifyConsumerOwner(registry.ids, declared.owner_wave, `edge ${declared.id}`);
        const sourceRoot = rootState.rootsById.get(declared.source);
        if (!sourceRoot) throw new Error(`edge ${declared.id} names unknown source root ${declared.source}`);
        const sourceEvidenceBase = sourceRoot.disposition.status === "unavailable" ? undefined : sourceRoot.canonical_realpath;
        if (validationMode === "live") verifyConsumerEvidence(declared.evidence, `edge ${declared.id}`, sourceEvidenceBase);
        else verifyCapturedEvidence(declared.evidence, `edge ${declared.id}`, sourceEvidenceBase);
        const observationMode = consumerEdgeObservationMode(declared, rootState.rootsById);
        if (declared.disposition.status === "unavailable") {
            if (validationMode === "live") verifyConsumerEvidence(declared.disposition.evidence, `unavailable edge ${declared.id}`);
            else verifyCapturedEvidence(declared.disposition.evidence, `unavailable edge ${declared.id}`);
            verifyConsumerOwner(registry.ids, declared.disposition.retrigger.wave_id, `unavailable edge ${declared.id} retrigger`);
        } else if (declared.disposition.status === "excluded") {
            if (validationMode === "live") verifyConsumerEvidence(declared.disposition.evidence, `excluded edge ${declared.id}`, sourceRoot.canonical_realpath);
            else verifyCapturedEvidence(declared.disposition.evidence, `excluded edge ${declared.id}`, sourceRoot.canonical_realpath);
        }
        const expected = edgeProjection(declared, edge.observations);
        if (canonicalize(edge) !== canonicalize(expected)) throw new Error(`consumer-universe edge disposition projection drift: ${edge.id}`);
        if (canonicalize(edge.observations) !== canonicalize([...edge.observations].sort(compareObservation))) {
            throw new Error(`consumer-universe edge observations are not canonically ordered: ${edge.id}`);
        }
        if (edge.observations_sha256 !== sha256(canonicalize(edge.observations))) throw new Error(`consumer-universe edge observation hash drift: ${edge.id}`);
        const observationIdentities = new Set();
        for (const observation of edge.observations) {
            if (validationMode === "live") {
                requireFile(observation.path, `consumer-universe edge ${edge.id} observation`);
                if (observation.canonical_realpath !== realpathSync(observation.path)) throw new Error(`consumer-universe observation realpath drift: ${edge.id}`);
                if (observation.file_sha256 !== sha256(readFileSync(observation.path))) throw new Error(`consumer-universe observation content drift: ${edge.id}`);
            } else {
                capturedPath(observation.path, `consumer-universe edge ${edge.id} observation path`);
                capturedPath(observation.canonical_realpath, `consumer-universe edge ${edge.id} observation canonical realpath`);
                if (!hashPattern.test(observation.file_sha256 ?? "") || typeof observation.locator !== "string" || observation.locator.length === 0) {
                    throw new Error(`consumer-universe edge ${edge.id} observation lacks its captured hash or locator`);
                }
                if (sourceRoot.disposition.status !== "unavailable" && !within(sourceRoot.canonical_realpath, observation.canonical_realpath)) {
                    throw new Error(`consumer-universe edge ${edge.id} observation escapes source root ${sourceRoot.canonical_realpath}`);
                }
            }
            const identity = `${observation.canonical_realpath}\0${observation.locator}`;
            if (observationIdentities.has(identity)) throw new Error(`consumer-universe edge repeats an occurrence observation: ${edge.id}`);
            observationIdentities.add(identity);
        }
        if (observationMode === "none") {
            if (edge.observations.length !== 0) throw new Error(`unavailable consumer-universe edge has observations: ${edge.id}`);
        } else {
            exactPathSet(
                edge.observations.map(({ canonical_realpath }) => canonical_realpath),
                declared.evidence.map(({ canonical_realpath }) => canonical_realpath),
                `consumer-universe edge evidence/observation path coverage: ${edge.id}`,
            );
            for (const proof of declared.evidence) {
                const matching = edge.observations.filter(({ canonical_realpath }) => canonical_realpath === proof.canonical_realpath);
                if (matching.some(({ file_sha256 }) => file_sha256 !== proof.sha256)) {
                    throw new Error(`consumer-universe edge evidence/observation content drift: ${edge.id}`);
                }
            }
        }
    }
    if (edges.length !== universe.edges.length) throw new Error("consumer-universe receipt edges are not the exact input edge projection");

    const counts = {
        roots: universe.roots.length,
        included_roots: statusCount(universe.roots, "included"),
        excluded_roots: statusCount(universe.roots, "excluded"),
        unavailable_roots: statusCount(universe.roots, "unavailable"),
        edges: universe.edges.length,
        included_edges: statusCount(universe.edges, "included"),
        excluded_edges: statusCount(universe.edges, "excluded"),
        unavailable_edges: statusCount(universe.edges, "unavailable"),
        observations: edges.reduce((total, edge) => total + edge.observations.length, 0),
    };
    if (canonicalize(receipt.counts) !== canonicalize(counts)) throw new Error("consumer-universe receipt partition counts drift");
    if (receipt.epoch.observed_roots_sha256 !== sha256(canonicalize(roots))) throw new Error("consumer-universe observed root epoch hash drift");
    if (receipt.epoch.observed_edges_sha256 !== sha256(canonicalize(edges))) throw new Error("consumer-universe observed edge epoch hash drift");
    const expectedBlockers = universeBlockers(universe);
    if (canonicalize(receipt.blockers) !== canonicalize(expectedBlockers)) throw new Error("consumer-universe receipt blockers are not the exact unavailable disposition projection");
    if (receipt.resolvable !== (expectedBlockers.length === 0)) throw new Error("consumer-universe receipt resolvability does not derive from unavailable dispositions");
    if (requireResolvable && (receipt.resolvable !== true || receipt.blockers.length !== 0)) throw new Error("consumer-universe receipt is blocking, not dependency green");

    const result = {
        receipt,
        universe,
        receipt_file_sha256: sha256(receiptSource),
        input_file_sha256: sha256(inputSource),
        input_schema_sha256: validationMode === "live" ? sha256(inputSchemaSource) : receipt.schema_sha256,
        receipt_schema_sha256: validationMode === "live" ? sha256(receiptSchemaSource) : receipt.receipt_schema_sha256,
        resolver_sha256: validationMode === "live" ? sha256(readFileSync(resolverPath)) : receipt.resolver_sha256,
        bounds_authority: authority.binding,
        roots_sha256: sha256(canonicalize(roots)),
        edges_sha256: sha256(canonicalize(edges)),
    };
    if (validationMode === "immutable") {
        const expectedBinding = consumerUniverseImmutableBindingProjection({
            receipt_path: receiptPath,
            receipt_file_sha256: result.receipt_file_sha256,
            receipt_hash: receipt.receipt_hash,
            input_path: receipt.input.path,
            input_file_sha256: result.input_file_sha256,
            universe_hash: receipt.input.universe_hash,
            resolver_sha256: result.resolver_sha256,
            input_schema_sha256: result.input_schema_sha256,
            receipt_schema_sha256: result.receipt_schema_sha256,
            bounds_authority: result.bounds_authority,
            bounds_sha256: receipt.epoch.bounds_sha256,
            formation_wave_registry_sha256: receipt.formation_wave_registry_sha256,
            observed_at: receipt.observed_at,
            resolved_at: receipt.resolved_at,
            epoch: receipt.epoch,
            counts: receipt.counts,
            roots_sha256: result.roots_sha256,
            edges_sha256: result.edges_sha256,
            resolvable: receipt.resolvable,
            blockers: receipt.blockers,
        });
        if (canonicalize(immutableBinding) !== canonicalize(expectedBinding)) {
            throw new Error("consumer-universe immutable binding is not the exact frozen receipt projection");
        }
    }
    return result;
}

export function consumerUniverseAnnexProjection(waveId, receiptPath, result) {
    const { receipt } = result;
    const binding = consumerUniverseImmutableBindingProjection({
        receipt_path: receiptPath,
        receipt_file_sha256: result.receipt_file_sha256,
        receipt_hash: receipt.receipt_hash,
        input_path: receipt.input.path,
        input_file_sha256: result.input_file_sha256,
        universe_hash: receipt.input.universe_hash,
        resolver_sha256: result.resolver_sha256,
        input_schema_sha256: result.input_schema_sha256,
        receipt_schema_sha256: result.receipt_schema_sha256,
        bounds_authority: result.bounds_authority,
        bounds_sha256: receipt.epoch.bounds_sha256,
        formation_wave_registry_sha256: receipt.formation_wave_registry_sha256,
        observed_at: receipt.observed_at,
        resolved_at: receipt.resolved_at,
        epoch: receipt.epoch,
        counts: receipt.counts,
        roots_sha256: result.roots_sha256,
        edges_sha256: result.edges_sha256,
        resolvable: receipt.resolvable,
        blockers: receipt.blockers,
    });
    const { schema: _bindingSchema, ...projection } = binding;
    return {
        schema: "vnext-consumer-universe-return-annex/1",
        wave_id: waveId,
        ...projection,
    };
}

export function consumerUniverseDelta(before, after) {
    const beforeById = new Map(before.map((item) => [item.id, sha256(canonicalize(item))]));
    const afterById = new Map(after.map((item) => [item.id, sha256(canonicalize(item))]));
    return [...new Set([...beforeById.keys(), ...afterById.keys()])]
        .sort(compareCanonicalText)
        .flatMap((id) => {
            const beforeSha256 = beforeById.get(id) ?? "absent";
            const afterSha256 = afterById.get(id) ?? "absent";
            if (beforeSha256 === afterSha256) return [];
            return [{
                id,
                change: beforeSha256 === "absent" ? "added" : afterSha256 === "absent" ? "removed" : "changed",
                before_sha256: beforeSha256,
                after_sha256: afterSha256,
            }];
        });
}
