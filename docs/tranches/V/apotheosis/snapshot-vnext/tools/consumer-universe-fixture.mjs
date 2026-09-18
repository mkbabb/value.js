import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    existsSync,
    lstatSync,
    mkdirSync,
    readFileSync,
    realpathSync,
    writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";

import { validateConsumerUniverseReceipt } from "./consumer-universe-return.mjs";
import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";
import { resolveGitIdentity } from "./resolve-consumer-universe.mjs";

const trancheRoot = resolve(dirname(new URL(import.meta.url).pathname), "..");
const canonicalBoundsPath = resolve(trancheRoot, "CONSUMER-UNIVERSE-BOUNDS.json");
const resolverPath = resolve(dirname(new URL(import.meta.url).pathname), "resolve-consumer-universe.mjs");
const rootIds = [
    "atlas-active",
    "bbnf-buddy",
    "bbnf-lang",
    "fourier-analysis",
    "glass-ui",
    "keyframes",
    "latex-paper",
    "muster",
    "parse-that",
    "sci-report",
    "slides",
    "slides-k",
    "speedtest",
    "value",
    "words",
];
const requiredPathLaws = [
    { id: "bbnf-lang/playground", repository_root_id: "bbnf-lang", relative_path: "playground" },
    { id: "fourier-analysis/api", repository_root_id: "fourier-analysis", relative_path: "api" },
    { id: "fourier-analysis/web", repository_root_id: "fourier-analysis", relative_path: "web" },
    { id: "muster/frontend", repository_root_id: "muster", relative_path: "frontend" },
    { id: "sci-report/atlas", repository_root_id: "sci-report", relative_path: "atlas" },
    { id: "words/frontend", repository_root_id: "words", relative_path: "frontend" },
];
const methods = [
    "css", "dynamic", "manifests", "npm_package_locks_v2_v3", "origins", "realpaths",
    "runtime", "type", "worktrees",
];
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function within(base, candidate) {
    const offset = relative(base, candidate);
    return offset === "" || (!offset.startsWith("..") && !isAbsolute(offset));
}

function requireWithin(base, candidate, label) {
    const canonical = realpathSync(candidate);
    if (!within(base, canonical)) throw new Error(`${label} escapes fixture root ${base}: ${canonical}`);
    return canonical;
}

function writeCanonical(path, value) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${canonicalize(value)}\n`);
}

function finalize(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    value[member] = sha256(canonicalize(preimage));
    return value;
}

function git(repository, args, options = {}) {
    return execFileSync("git", ["-C", repository, ...args], options);
}

function trackedRegularFile(repository, path, label) {
    const canonicalRepository = realpathSync(repository);
    const canonicalPath = requireWithin(canonicalRepository, path, label);
    if (!lstatSync(canonicalPath).isFile() || lstatSync(canonicalPath).isSymbolicLink()) {
        throw new Error(`${label} must be a regular non-symlink file: ${canonicalPath}`);
    }
    const relativePath = relative(canonicalRepository, canonicalPath);
    try {
        git(canonicalRepository, ["ls-files", "--error-unmatch", "--", relativePath], { encoding: "utf8" });
    } catch {
        throw new Error(`${label} is not tracked by its primary fixture repository: ${relativePath}`);
    }
    return canonicalPath;
}

function evidence(path, description, fixtureRoot) {
    const canonical = requireWithin(fixtureRoot, path, description);
    if (!lstatSync(canonical).isFile() || lstatSync(canonical).isSymbolicLink()) {
        throw new Error(`${description} must be a regular non-symlink file: ${canonical}`);
    }
    return {
        path: canonical,
        canonical_realpath: canonical,
        sha256: sha256(readFileSync(canonical)),
        description,
    };
}

function runResolver(inputPath, outputPath, expectedExit) {
    if (existsSync(outputPath)) throw new Error(`consumer fixture resolver output must not pre-exist: ${outputPath}`);
    const result = spawnSync(process.execPath, [resolverPath, "--input", inputPath, "--output", outputPath], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
    if (result.status !== expectedExit) {
        throw new Error(`consumer fixture resolver exited ${result.status}; expected ${expectedExit}: ${(result.stderr || result.stdout || result.error?.message || "unknown failure").trim()}`);
    }
    if (!existsSync(outputPath)) {
        throw new Error(`consumer fixture resolver exited ${expectedExit} without persisting its receipt: ${outputPath}`);
    }
    const receipt = parseJsonStrict(readFileSync(outputPath));
    return { receipt, status: result.status, stdout: result.stdout, stderr: result.stderr };
}

function normalizeResolverReceipt(receipt) {
    const normalized = structuredClone(receipt);
    normalized.resolved_at = "<resolver-time>";
    normalized.epoch.started_at = "<resolver-time>";
    normalized.epoch.completed_at = "<resolver-time>";
    normalized.epoch.epoch_sha256 = "<dependent-hash>";
    normalized.receipt_hash = "<dependent-hash>";
    return normalized;
}

function exactIds(values, expected, label) {
    const actual = values.map(({ id }) => id).sort(compareCanonicalText);
    const wanted = [...expected].sort(compareCanonicalText);
    if (canonicalize(actual) !== canonicalize(wanted)) {
        throw new Error(`${label} must be exact: observed ${actual.join(",")}; expected ${wanted.join(",")}`);
    }
}

export function prepareConsumerFixtureConstellation({
    fixtureRoot,
    primary,
    authorityRelativePath = "test/proof/consumer-universe-bounds.json",
}) {
    const { id: primaryId, repository, ownerWave } = primary ?? {};
    if (!rootIds.includes(primaryId)) throw new Error(`unknown primary consumer root ${primaryId}`);
    if (!repository || !ownerWave) throw new Error("primary consumer fixture requires repository and ownerWave");
    const canonicalFixtureRoot = realpathSync(fixtureRoot);
    const constellationRoot = resolve(canonicalFixtureRoot, "consumer-constellation");
    mkdirSync(constellationRoot, { recursive: true });
    const canonicalConstellationRoot = realpathSync(constellationRoot);
    const roots = Object.fromEntries(rootIds.map((id) => {
        const path = resolve(canonicalConstellationRoot, id);
        mkdirSync(path, { recursive: true });
        return [id, realpathSync(path)];
    }));
    if (primary.path && resolve(primary.path) !== roots[primaryId]) {
        throw new Error(`primary consumer fixture path must be its exact sibling root ${roots[primaryId]}`);
    }
    exactIds(Object.entries(roots).map(([id]) => ({ id })), rootIds, "consumer fixture root IDs");

    const evidencePaths = {};
    for (const id of rootIds) {
        const path = resolve(roots[id], "fixture-consumer-evidence.txt");
        writeFileSync(path, `isolated ${id} consumer-universe evidence\n`);
        evidencePaths[id] = realpathSync(path);
    }

    const requiredPaths = requiredPathLaws.map((law) => {
        const path = resolve(roots[law.repository_root_id], law.relative_path);
        mkdirSync(path, { recursive: true });
        writeFileSync(resolve(path, "fixture-consumer-path-evidence.txt"), `isolated ${law.id} required consumer path\n`);
        const canonical = realpathSync(path);
        return {
            ...law,
            kind: "repository-subdirectory",
            path: canonical,
            canonical_realpath: canonical,
        };
    });

    const sourceAuthority = parseJsonStrict(readFileSync(canonicalBoundsPath));
    const authority = structuredClone(sourceAuthority);
    authority.purpose = "Formation-only fifteen-root and six-repository-subdirectory consumer fixture authority; semantic identity topology is unchanged and every path is isolated beneath this fixture.";
    authority.bounds.search_roots = [{
        path: canonicalConstellationRoot,
        canonical_realpath: canonicalConstellationRoot,
        max_depth: 1,
    }];
    authority.bounds.required_roots = rootIds.map((id) => ({ id, canonical_realpath: roots[id] }));
    authority.bounds.required_paths = requiredPaths;
    authority.bounds_sha256 = sha256(canonicalize(authority.bounds));
    finalize(authority, "manifest_hash");
    const authorityPath = resolve(roots[primaryId], authorityRelativePath);
    writeCanonical(authorityPath, authority);

    for (const [index, id] of rootIds.entries()) {
        if (id === primaryId) continue;
        if (!existsSync(resolve(roots[id], ".git"))) {
            git(roots[id], ["init", `--initial-branch=fixture-${index}-${id}`]);
        }
        const top = realpathSync(git(roots[id], ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim());
        if (top !== roots[id]) throw new Error(`${id} fixture root is not its own Git repository`);
        git(roots[id], ["config", "user.name", "Consumer Fixture"]);
        git(roots[id], ["config", "user.email", "consumer-fixture@example.invalid"]);
        git(roots[id], ["add", "."]);
        git(roots[id], ["commit", "-m", `fixture ${id} evidence`]);
    }

    for (const path of [
        ...Object.values(roots),
        ...Object.values(evidencePaths),
        ...requiredPaths.flatMap(({ path }) => [path, resolve(path, "fixture-consumer-path-evidence.txt")]),
        authorityPath,
    ]) {
        requireWithin(canonicalFixtureRoot, path, "consumer fixture coordinate");
    }
    return {
        fixtureRoot: canonicalFixtureRoot,
        constellationRoot: canonicalConstellationRoot,
        primary: { id: primaryId, path: roots[primaryId], repository, ownerWave },
        primaryId,
        primaryRepository: roots[primaryId],
        roots,
        requiredPaths,
        evidencePaths,
        authority,
        authorityPath: realpathSync(authorityPath),
    };
}

export function resolveConsumerFixtureUniverse({
    constellation,
    name,
    ownerWave = constellation.primary.ownerWave,
    edges = [],
    scenario,
    expectedExit = 0,
    requireResolvable = expectedExit === 0,
}) {
    if (![0, 2].includes(expectedExit)) throw new Error(`consumer fixture expectedExit must be 0 or 2, received ${expectedExit}`);
    if (scenario !== undefined && typeof scenario !== "function") throw new Error("consumer fixture scenario must be a function");
    const { fixtureRoot, constellationRoot, primaryId, primaryRepository, roots, evidencePaths } = constellation;
    const authorityPath = trackedRegularFile(primaryRepository, constellation.authorityPath, "consumer fixture bounds authority");
    const authority = parseJsonStrict(readFileSync(authorityPath));
    exactIds(authority.bounds.required_roots, rootIds, "consumer fixture authority root IDs");
    exactIds(authority.bounds.required_paths, requiredPathLaws.map(({ id }) => id), "consumer fixture authority path IDs");

    const identities = new Map();
    for (const id of rootIds) {
        const identity = resolveGitIdentity(roots[id]);
        if (identity.canonical_realpath !== roots[id]) throw new Error(`${id} Git observer escaped its declared fixture root`);
        identities.set(id, identity);
    }
    const discoveryEvidence = rootIds.map((id) => evidence(evidencePaths[id], `${id} local consumer fixture evidence`, fixtureRoot));
    const observedAt = new Date().toISOString();
    const startedAt = new Date(Date.parse(observedAt) - 100).toISOString();
    const rootRecords = rootIds.map((id) => {
        const identity = identities.get(id);
        const proof = discoveryEvidence.find((item) => item.path === evidencePaths[id]);
        return {
            id,
            repository: id === primaryId ? constellation.primary.repository : `${id}-fixture`,
            path: identity.canonical_realpath,
            canonical_realpath: identity.canonical_realpath,
            branch: identity.branch,
            head: identity.head,
            dirty_sha256: identity.dirty_sha256,
            provenance: {
                origins: { values: identity.origins, evidence: [proof] },
                worktrees: { values: identity.worktrees, evidence: [proof] },
                deploy_roots: { values: [], evidence: [proof] },
            },
            disposition: { status: "included", owner_wave: ownerWave },
        };
    }).sort((left, right) => compareCanonicalText(left.id, right.id));
    const edgeRecords = edges.map((edge) => {
        if (!rootIds.includes(edge.source) || (!rootIds.includes(edge.target) && !edge.target.startsWith("external:"))) {
            throw new Error(`consumer fixture edge ${edge.id} names an unknown root`);
        }
        const paths = [...new Set(edge.evidencePaths)].sort(compareCanonicalText);
        if (!paths.length) throw new Error(`consumer fixture edge ${edge.id} has no occurrence evidence`);
        for (const path of paths) requireWithin(roots[edge.source], path, `edge ${edge.id} occurrence`);
        return {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            package: edge.package,
            specifier: edge.specifier,
            kind: edge.kind,
            owner_wave: edge.ownerWave ?? ownerWave,
            evidence: paths.map((path) => evidence(path, `${edge.id} bounded occurrence`, fixtureRoot)),
            disposition: (() => {
                if (!edge.disposition) return { status: "included" };
                const { status, reason, retrigger, evidencePaths: dispositionPaths = [] } = edge.disposition;
                const disposition = { status };
                if (reason !== undefined) disposition.reason = reason;
                if (dispositionPaths.length) {
                    disposition.evidence = [...new Set(dispositionPaths)]
                        .sort(compareCanonicalText)
                        .map((path) => evidence(path, `${edge.id} disposition evidence`, fixtureRoot));
                }
                if (retrigger !== undefined) disposition.retrigger = structuredClone(retrigger);
                return disposition;
            })(),
        };
    }).sort((left, right) => compareCanonicalText(left.id, right.id));
    const universe = {
        schema: "vnext-consumer-universe/2",
        observed_at: observedAt,
        discovery: {
            methods,
            evidence: discoveryEvidence,
            epoch: { started_at: startedAt, completed_at: observedAt, max_age_seconds: 3600 },
            bounds: authority.bounds,
        },
        roots: rootRecords,
        edges: edgeRecords,
        universe_hash: "",
    };
    scenario?.({
        universe,
        fixtureRoot,
        constellationRoot,
        roots: { ...roots },
        requiredPaths: structuredClone(constellation.requiredPaths),
        evidencePaths: { ...evidencePaths },
        evidence: (path, description) => evidence(path, description, fixtureRoot),
    });
    finalize(universe, "universe_hash");
    const inputPath = resolve(fixtureRoot, `${name}.json`);
    const receiptPath = resolve(fixtureRoot, `${name}-receipt.json`);
    const replayReceiptPath = resolve(fixtureRoot, `${name}-receipt-replay.json`);
    writeCanonical(inputPath, universe);
    const firstRun = runResolver(realpathSync(inputPath), receiptPath, expectedExit);
    const replayRun = runResolver(realpathSync(inputPath), replayReceiptPath, expectedExit);
    const { receipt } = firstRun;
    const { receipt: replayReceipt } = replayRun;
    const authorityBinding = {
        path: authorityPath,
        file_sha256: sha256(readFileSync(authorityPath)),
        manifest_hash: authority.manifest_hash,
    };
    const validationOptions = {
        boundsAuthority: authorityBinding,
        boundsAuthorityVerificationPath: authorityPath,
        requireCanonicalBoundsAuthority: false,
        allowFixtureBoundsAuthority: true,
        requireResolvable,
    };
    const validation = validateConsumerUniverseReceipt(realpathSync(receiptPath), validationOptions);
    validateConsumerUniverseReceipt(realpathSync(replayReceiptPath), validationOptions);
    if (canonicalize(receipt.roots) !== canonicalize(replayReceipt.roots)
        || canonicalize(receipt.edges) !== canonicalize(replayReceipt.edges)) {
        throw new Error("consumer fixture resolver replays differ in roots or edges");
    }
    if (canonicalize(normalizeResolverReceipt(receipt)) !== canonicalize(normalizeResolverReceipt(replayReceipt))) {
        throw new Error("consumer fixture resolver replays differ outside timestamps and their dependent hashes");
    }
    exactIds(receipt.roots, universe.roots.map(({ id }) => id), "consumer fixture receipt roots");
    exactIds(receipt.edges, universe.edges.map(({ id }) => id), "consumer fixture receipt edges");
    for (const root of receipt.roots) {
        if (existsSync(root.canonical_realpath)) {
            requireWithin(fixtureRoot, root.canonical_realpath, `receipt root ${root.id}`);
        } else if (!within(fixtureRoot, resolve(root.canonical_realpath))) {
            throw new Error(`receipt root ${root.id} escapes fixture root: ${root.canonical_realpath}`);
        }
    }
    for (const edge of receipt.edges) {
        for (const observation of edge.observations) {
            requireWithin(fixtureRoot, observation.path, `receipt edge ${edge.id} observation`);
            requireWithin(roots[edge.source], observation.canonical_realpath, `receipt edge ${edge.id} source observation`);
        }
    }
    return {
        fixtureId: primaryId,
        inputPath: realpathSync(inputPath),
        receipt,
        resolverStatus: firstRun.status,
        resolverStdout: firstRun.stdout,
        receiptPath: realpathSync(receiptPath),
        replayReceipt,
        replayResolverStatus: replayRun.status,
        replayReceiptPath: realpathSync(replayReceiptPath),
        receiptFileSha256: validation.receipt_file_sha256,
        rootsSha256: validation.roots_sha256,
        edgesSha256: validation.edges_sha256,
        authorityBinding: validation.bounds_authority,
        validation,
        rootPaths: { ...roots },
        constellationRoot,
        containmentPreflight: true,
    };
}

export const consumerFixtureRootIds = Object.freeze([...rootIds]);
