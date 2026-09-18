#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    existsSync,
    lstatSync,
    readFileSync,
    readdirSync,
    readlinkSync,
    realpathSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { basename, dirname, extname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";

const toolPath = fileURLToPath(import.meta.url);
const root = resolve(dirname(toolPath), "..");
const inputSchemaPath = resolve(root, "consumer-universe.schema.json");
const receiptSchemaPath = resolve(root, "consumer-universe-receipt.schema.json");
const waveFiles = ["waves/P-V.md", "waves/K-A.md", "waves/G-D.md", "waves/M-C.md"];
const waveIdPattern = /^[PVKAGDMC]\d{2}[A-Z]?$/;
const requiredMethods = [
    "css",
    "dynamic",
    "manifests",
    "npm_package_locks_v2_v3",
    "origins",
    "realpaths",
    "runtime",
    "type",
    "worktrees",
];
const requiredIgnoredDirectories = [
    ".cache", ".git", ".next", ".nuxt", ".pnpm", ".turbo", ".venv", ".vnext", ".yarn",
    "__pycache__", "build", "coverage", "dist", "node_modules", "playwright-report",
    "r1-opus-refuted", "target", "test-results", "tranches", "venv",
];
const requiredObservedKinds = ["css", "dynamic", "lock", "manifest", "peer", "runtime", "transitive", "type"];
const sourceExtensions = new Set([
    ".astro", ".cjs", ".css", ".cts", ".html", ".js", ".jsx", ".less", ".mdx", ".mjs", ".mts",
    ".sass", ".scss", ".styl", ".svelte", ".ts", ".tsx", ".vue",
]);
const sourceDecoder = new TextDecoder("utf-8", { fatal: true });
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const compareId = (left, right) => compareCanonicalText(left.id, right.id);
const compareObservation = (left, right) =>
    compareCanonicalText(left.canonical_realpath, right.canonical_realpath)
    || compareCanonicalText(left.locator, right.locator)
    || compareCanonicalText(left.path, right.path)
    || compareCanonicalText(left.file_sha256, right.file_sha256);
function die(message) {
    throw new Error(message);
}

function parseArguments(argv) {
    const result = {};
    for (let index = 0; index < argv.length; index += 1) {
        const argument = argv[index];
        if (argument !== "--input" && argument !== "--output") die(`unknown argument ${argument}`);
        const value = argv[index + 1];
        if (!value || value.startsWith("--")) die(`${argument} requires a path`);
        const key = argument.slice(2);
        if (result[key]) die(`${argument} may appear only once`);
        result[key] = resolve(value);
        index += 1;
    }
    if (!result.input || !result.output) die("usage: resolve-consumer-universe.mjs --input <universe.json> --output <receipt.json>");
    if (!existsSync(result.input)) die(`consumer-universe input does not exist: ${result.input}`);
    result.input = realpathSync(result.input);
    result.output = join(realpathSync(dirname(result.output)), basename(result.output));
    if (result.input === result.output) die("input and output paths must differ");
    return result;
}

function readStrict(path, label) {
    if (!existsSync(path)) die(`${label} does not exist: ${path}`);
    const source = decodeUtf8Strict(readFileSync(path));
    try {
        return { source, value: parseJsonStrict(source) };
    } catch (error) {
        die(`${label} is not strict JSON: ${error.message}`);
    }
}

export function consumerWaveRegistry() {
    const rows = new Map();
    for (const relativePath of waveFiles) {
        const source = readFileSync(resolve(root, relativePath), "utf8");
        for (const line of source.split("\n")) {
            if (!line.startsWith("|")) continue;
            const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
            if (!waveIdPattern.test(cells[0] ?? "")) continue;
            if (cells.length !== 7) die(`${relativePath}: ${cells[0]} must have seven canonical cells`);
            if (rows.has(cells[0])) die(`${relativePath}: duplicate canonical wave ${cells[0]}`);
            rows.set(cells[0], cells);
        }
    }
    if (rows.size !== 190) die(`canonical wave registry has ${rows.size} waves; expected 190`);
    const vector = [...rows].sort(([left], [right]) => compareCanonicalText(left, right)).map(([id, cells]) => ({ id, cells }));
    return { ids: new Set(rows.keys()), sha256: sha256(canonicalize(vector)) };
}

function exactSet(actual, expected, context) {
    const left = [...actual].sort();
    const right = [...expected].sort();
    if (canonicalize(left) !== canonicalize(right)) {
        die(`${context} must be exact; observed ${left.join(",") || "<empty>"}; declared ${right.join(",") || "<empty>"}`);
    }
}

function within(base, candidate) {
    const offset = relative(base, candidate);
    return offset === "" || (!offset.startsWith("..") && !isAbsolute(offset));
}

function canonicalPotentialPath(path) {
    let ancestor = resolve(path);
    const suffix = [];
    while (!existsSync(ancestor)) {
        const parent = dirname(ancestor);
        if (parent === ancestor) return resolve(path);
        suffix.unshift(basename(ancestor));
        ancestor = parent;
    }
    return resolve(realpathSync(ancestor), ...suffix);
}

export function verifyConsumerEvidence(evidence, context, requiredBase = undefined) {
    const identities = new Set();
    for (const [index, item] of evidence.entries()) {
        if (!existsSync(item.path)) die(`${context} evidence ${index + 1} is missing: ${item.path}`);
        if (!lstatSync(item.path).isFile() && !lstatSync(item.path).isSymbolicLink()) {
            die(`${context} evidence ${index + 1} is not a file: ${item.path}`);
        }
        const actualRealpath = realpathSync(item.path);
        if (actualRealpath !== item.canonical_realpath) {
            die(`${context} evidence ${index + 1} canonical realpath ${item.canonical_realpath}; observed ${actualRealpath}`);
        }
        if (requiredBase && !within(requiredBase, actualRealpath)) {
            die(`${context} evidence ${index + 1} escapes source root ${requiredBase}: ${actualRealpath}`);
        }
        const actual = sha256(readFileSync(item.path));
        if (actual !== item.sha256) die(`${context} evidence ${index + 1} hash ${actual}; expected ${item.sha256}`);
        const identity = `${actualRealpath}\0${actual}`;
        if (identities.has(identity)) die(`${context} repeats semantic evidence ${actualRealpath}`);
        identities.add(identity);
    }
}

export function verifyConsumerOwner(waveIds, owner, context) {
    if (!waveIds.has(owner)) die(`${context} names unknown canonical wave owner ${owner}`);
}

export function verifyRequiredConsumerIdentities(bounds, rootsById) {
    const requiredRootIds = new Set();
    const requiredRootPaths = new Set();
    const requiredRootsById = new Map();
    for (const required of bounds.required_roots) {
        if (requiredRootIds.has(required.id)) die(`duplicate required consumer root ID ${required.id}`);
        if (requiredRootPaths.has(required.canonical_realpath)) {
            die(`duplicate required consumer root realpath ${required.canonical_realpath}`);
        }
        requiredRootIds.add(required.id);
        requiredRootPaths.add(required.canonical_realpath);
        requiredRootsById.set(required.id, required);
        const rootRecord = rootsById.get(required.id);
        if (!rootRecord || rootRecord.canonical_realpath !== required.canonical_realpath) {
            die(`required consumer root identity missing: ${required.id}`);
        }
        if (rootRecord.disposition.status === "excluded") {
            die(`required consumer root ${required.id} cannot be excluded`);
        }
    }

    const requiredPathIds = new Set();
    const requiredCanonicalPaths = new Set();
    for (const required of bounds.required_paths) {
        if (requiredPathIds.has(required.id) || requiredRootIds.has(required.id)) {
            die(`duplicate required consumer identity ID ${required.id}`);
        }
        requiredPathIds.add(required.id);
        const declaration = requiredRootsById.get(required.repository_root_id);
        const rootRecord = rootsById.get(required.repository_root_id);
        if (!declaration || !rootRecord) {
            die(`required consumer path ${required.id} names unknown repository root ${required.repository_root_id}`);
        }
        const expectedCanonical = resolve(declaration.canonical_realpath, required.relative_path);
        if (required.kind !== "repository-subdirectory"
            || expectedCanonical !== required.canonical_realpath
            || expectedCanonical === declaration.canonical_realpath
            || !within(declaration.canonical_realpath, expectedCanonical)) {
            die(`required consumer path ${required.id} violates its typed repository-subdirectory law`);
        }
        if (requiredCanonicalPaths.has(required.canonical_realpath) || requiredRootPaths.has(required.canonical_realpath)) {
            die(`duplicate required consumer identity realpath ${required.canonical_realpath}`);
        }
        requiredCanonicalPaths.add(required.canonical_realpath);
        if (rootRecord.disposition.status === "unavailable") continue;
        if (!existsSync(required.path) || !statSync(required.path).isDirectory()) {
            die(`required consumer path is unavailable: ${required.id}`);
        }
        const canonical = realpathSync(required.path);
        if (canonical !== required.canonical_realpath) {
            die(`required consumer path ${required.id} canonical realpath ${required.canonical_realpath}; observed ${canonical}`);
        }
        if (!within(rootRecord.canonical_realpath, canonical) || canonical === rootRecord.canonical_realpath) {
            die(`required consumer path escapes repository root: ${required.id}`);
        }
    }
}

function runGit(repository, args, context, allowFailure = false) {
    const result = spawnSync("git", ["-C", repository, ...args], {
        encoding: null,
        maxBuffer: 128 * 1024 * 1024,
    });
    if (result.error) die(`${context}: could not execute git: ${result.error.message}`);
    if (result.status !== 0) {
        if (allowFailure) return null;
        die(`${context}: git ${args.join(" ")} failed: ${result.stderr.toString("utf8").trim()}`);
    }
    return result.stdout;
}

function nulStrings(buffer) {
    return buffer.toString("utf8").split("\0").filter(Boolean);
}

function gitDirtyDigest(repository) {
    const status = runGit(repository, ["status", "--porcelain=v2", "-z", "--untracked-files=all"], "dirty status");
    const diff = runGit(repository, ["diff", "--binary", "--no-ext-diff", "HEAD", "--"], "dirty diff");
    const untracked = nulStrings(runGit(repository, ["ls-files", "--others", "--exclude-standard", "-z"], "untracked census"))
        .sort()
        .map((relativePath) => {
            const path = join(repository, relativePath);
            const metadata = lstatSync(path);
            let contents;
            let type;
            if (metadata.isSymbolicLink()) {
                type = "symlink";
                contents = Buffer.from(readlinkSync(path));
            } else if (metadata.isFile()) {
                type = "file";
                contents = readFileSync(path);
            } else {
                die(`untracked path is neither file nor symlink: ${path}`);
            }
            return {
                path: relativePath,
                mode: metadata.mode,
                type,
                sha256: sha256(contents),
            };
        });
    return sha256(canonicalize({
        algorithm: "git-dirty-sha256/1",
        status_sha256: sha256(status),
        diff_sha256: sha256(diff),
        untracked,
    }));
}

export function resolveGitIdentity(repository) {
    const topLevel = runGit(repository, ["rev-parse", "--show-toplevel"], "Git root").toString("utf8").trim();
    const canonical = realpathSync(topLevel);
    if (canonical !== realpathSync(repository)) die(`${repository} is not a Git repository root; observed ${canonical}`);
    const branchBuffer = runGit(repository, ["symbolic-ref", "--quiet", "--short", "HEAD"], "Git branch", true);
    if (!branchBuffer) die(`${repository} has detached HEAD; a named branch is required for the frozen universe`);
    const branch = branchBuffer.toString("utf8").trim();
    const head = runGit(repository, ["rev-parse", "HEAD"], "Git HEAD").toString("utf8").trim();
    const remotes = runGit(repository, ["remote"], "Git remotes").toString("utf8").trim().split("\n").filter(Boolean);
    const origins = remotes.includes("origin")
        ? runGit(repository, ["remote", "get-url", "--all", "origin"], "Git origin").toString("utf8").trim().split("\n").filter(Boolean).sort()
        : [];
    const worktrees = runGit(repository, ["worktree", "list", "--porcelain"], "Git worktrees")
        .toString("utf8")
        .split("\n")
        .filter((line) => line.startsWith("worktree "))
        .map((line) => realpathSync(line.slice("worktree ".length)))
        .sort();
    return {
        canonical_realpath: canonical,
        branch,
        head,
        dirty_sha256: gitDirtyDigest(canonical),
        origins,
        worktrees,
    };
}

export function validateConsumerRootState(universe, bounds, waveIds, { allowedAdditionalWorktrees = [] } = {}) {
    if (!universe || !Array.isArray(universe.roots) || !bounds || !Array.isArray(bounds.required_roots)
        || !(waveIds instanceof Set) || !Array.isArray(allowedAdditionalWorktrees)) {
        die("consumer root state validation requires universe roots, semantic bounds, and the canonical wave set");
    }
    const unclaimedAdditionalWorktrees = new Set();
    for (const path of allowedAdditionalWorktrees) {
        if (typeof path !== "string" || !isAbsolute(path) || !existsSync(path)
            || !statSync(path).isDirectory() || realpathSync(path) !== path) {
            die(`allowed additional Git worktree must be an existing canonical absolute path: ${path}`);
        }
        if (unclaimedAdditionalWorktrees.has(path)) die(`duplicate allowed additional Git worktree: ${path}`);
        unclaimedAdditionalWorktrees.add(path);
    }
    const rootIds = new Set();
    const declaredRealpaths = new Map();
    const rootsById = new Map();
    const blockers = [];
    const availableRoots = [];
    for (const rootRecord of universe.roots) {
        if (rootIds.has(rootRecord.id)) die(`duplicate root id ${rootRecord.id}`);
        rootIds.add(rootRecord.id);
        rootsById.set(rootRecord.id, rootRecord);
        if (declaredRealpaths.has(rootRecord.canonical_realpath)) {
            die(`duplicate canonical realpath ${rootRecord.canonical_realpath} for ${declaredRealpaths.get(rootRecord.canonical_realpath)} and ${rootRecord.id}`);
        }
        declaredRealpaths.set(rootRecord.canonical_realpath, rootRecord.id);
        if (!bounds.search_roots.some((search) => within(search.canonical_realpath, rootRecord.canonical_realpath))) {
            die(`root ${rootRecord.id} escapes every bounded search root: ${rootRecord.canonical_realpath}`);
        }
        for (const [name, observedSet] of Object.entries(rootRecord.provenance)) {
            verifyConsumerEvidence(observedSet.evidence, `root ${rootRecord.id} ${name}`);
        }
        if (rootRecord.disposition.status === "unavailable") {
            if (canonicalPotentialPath(rootRecord.path) !== rootRecord.canonical_realpath) {
                die(`unavailable root ${rootRecord.id} must use its declared canonical path: ${rootRecord.canonical_realpath}`);
            }
            if (existsSync(rootRecord.path) || existsSync(rootRecord.canonical_realpath)) {
                die(`unavailable root ${rootRecord.id} exists and must be observed, not declared unavailable: ${rootRecord.canonical_realpath}`);
            }
            verifyConsumerEvidence(rootRecord.disposition.evidence, `unavailable root ${rootRecord.id}`);
            verifyConsumerOwner(waveIds, rootRecord.disposition.retrigger.wave_id, `unavailable root ${rootRecord.id} retrigger`);
            blockers.push(`root:${rootRecord.id}:unavailable:${rootRecord.disposition.retrigger.wave_id}:${rootRecord.disposition.retrigger.condition}`);
            continue;
        }
        if (!existsSync(rootRecord.path) || !statSync(rootRecord.path).isDirectory()) die(`root ${rootRecord.id} is not a directory: ${rootRecord.path}`);
        const identity = resolveGitIdentity(rootRecord.path);
        if (identity.canonical_realpath !== rootRecord.canonical_realpath) {
            die(`root ${rootRecord.id} canonical realpath ${rootRecord.canonical_realpath}; observed ${identity.canonical_realpath}`);
        }
        for (const field of ["branch", "head", "dirty_sha256"]) {
            if (identity[field] !== rootRecord[field]) die(`root ${rootRecord.id} forged Git ${field} ${rootRecord[field]}; observed ${identity[field]}`);
        }
        exactSet(identity.origins, rootRecord.provenance.origins.values, `root ${rootRecord.id} Git origins`);
        const declaredWorktrees = new Set(rootRecord.provenance.worktrees.values);
        for (const declared of declaredWorktrees) {
            if (!identity.worktrees.includes(declared)) {
                die(`root ${rootRecord.id} declared Git worktree is no longer present: ${declared}`);
            }
        }
        for (const observedWorktree of identity.worktrees) {
            if (declaredWorktrees.has(observedWorktree)) continue;
            if (!unclaimedAdditionalWorktrees.delete(observedWorktree)) {
                die(`root ${rootRecord.id} has an undeclared additional Git worktree: ${observedWorktree}`);
            }
        }
        if (rootRecord.disposition.status === "included") {
            verifyConsumerOwner(waveIds, rootRecord.disposition.owner_wave, `included root ${rootRecord.id}`);
        } else {
            verifyConsumerEvidence(rootRecord.disposition.evidence, `excluded root ${rootRecord.id}`, rootRecord.canonical_realpath);
        }
        availableRoots.push({ ...rootRecord, identity });
    }
    if (unclaimedAdditionalWorktrees.size) {
        die(`allowed additional Git worktrees were not observed: ${[...unclaimedAdditionalWorktrees].sort(compareCanonicalText).join(",")}`);
    }
    verifyRequiredConsumerIdentities(bounds, rootsById);
    return { rootsById, availableRoots, blockers };
}

export function consumerEdgeObservationMode(edge, rootsById) {
    const sourceRoot = rootsById.get(edge.source);
    if (!sourceRoot) die(`edge ${edge.id} names unknown source root ${edge.source}`);
    const internalTarget = !edge.target.startsWith("external:");
    const targetRoot = internalTarget ? rootsById.get(edge.target) : null;
    if (internalTarget && !targetRoot) die(`edge ${edge.id} names unknown internal target root ${edge.target}`);
    if (sourceRoot.disposition.status === "unavailable") {
        if (edge.disposition.status !== "unavailable") die(`edge ${edge.id} from unavailable root must itself be unavailable`);
        return "none";
    }
    if (targetRoot?.disposition.status === "unavailable") {
        if (edge.disposition.status !== "unavailable") {
            die(`edge ${edge.id} from an available source to unavailable target ${edge.target} must itself be unavailable`);
        }
        return "required";
    }
    if (edge.disposition.status === "unavailable") {
        die(`edge ${edge.id} can be unavailable only when its source or internal target is unavailable`);
    }
    if (edge.disposition.status === "included") {
        if (sourceRoot.disposition.status !== "included") die(`included edge ${edge.id} starts at non-included root ${edge.source}`);
        if (targetRoot && targetRoot.disposition.status !== "included") {
            die(`included edge ${edge.id} ends at non-included root ${edge.target}`);
        }
    }
    return "required";
}

function directoryEntries(path, state, context) {
    const entries = readdirSync(path, { withFileTypes: true }).sort((left, right) => compareCanonicalText(left.name, right.name));
    state.entries += entries.length;
    if (state.entries > state.maxEntries) die(`${context} exceeded max_entries ${state.maxEntries}; a truncated scan cannot close the universe`);
    return entries;
}

function discoverRepositories(bounds) {
    const ignored = new Set(bounds.ignored_directory_names);
    const repositories = new Set();
    const state = { entries: 0, maxEntries: bounds.max_entries };
    const visited = new Set();

    function visit(path, depth, maximumDepth, scopeRoot) {
        const canonical = realpathSync(path);
        if (!within(scopeRoot, canonical)) die(`bounded discovery encountered an escaping directory symlink ${path} -> ${canonical}`);
        if (visited.has(canonical)) return;
        visited.add(canonical);
        if (existsSync(join(canonical, ".git"))) {
            const top = runGit(canonical, ["rev-parse", "--show-toplevel"], `repository discovery ${canonical}`).toString("utf8").trim();
            repositories.add(realpathSync(top));
        }
        if (depth >= maximumDepth) return;
        for (const entry of directoryEntries(canonical, state, `repository discovery at ${canonical}`)) {
            if (ignored.has(entry.name)) continue;
            const child = join(canonical, entry.name);
            if (entry.isDirectory()) visit(child, depth + 1, maximumDepth, scopeRoot);
            else if (entry.isSymbolicLink() && statSync(child).isDirectory()) visit(child, depth + 1, maximumDepth, scopeRoot);
        }
    }

    const seenSearchRoots = new Set();
    for (const search of bounds.search_roots) {
        if (!existsSync(search.path) || !statSync(search.path).isDirectory()) die(`search root does not exist as a directory: ${search.path}`);
        const actual = realpathSync(search.path);
        if (actual !== search.canonical_realpath) die(`search root ${search.path} canonical realpath ${search.canonical_realpath}; observed ${actual}`);
        if (seenSearchRoots.has(actual)) die(`duplicate semantic search root ${actual}`);
        seenSearchRoots.add(actual);
        visit(actual, 0, search.max_depth, actual);
    }
    return [...repositories].sort();
}

function lineColumn(source, index) {
    const before = source.slice(0, index);
    const line = before.split("\n").length;
    const previous = before.lastIndexOf("\n");
    return `${line}:${index - previous}`;
}

function scopedPackage(specifier, scopes) {
    return scopes
        .filter((scope) => specifier === scope.package || specifier.startsWith(`${scope.package}/`))
        .sort((left, right) => right.package.length - left.package.length
            || compareCanonicalText(left.package, right.package))[0];
}

function addDetection(path, fileHash, scopes, detections, {
    kind,
    specifier,
    locator,
    packageSpecifier = specifier,
}) {
    if (typeof specifier !== "string" || specifier.length === 0) return;
    const scope = scopedPackage(packageSpecifier, scopes);
    if (!scope || !scope.kinds.includes(kind)) return;
    detections.push({
        package: scope.package,
        target: scope.target,
        specifier,
        kind,
        observation: {
            path,
            canonical_realpath: realpathSync(path),
            file_sha256: fileHash,
            locator,
        },
    });
}

function scanManifest(path, source, fileHash, scopes, detections) {
    let manifest;
    try {
        manifest = parseJsonStrict(source);
    } catch (error) {
        die(`bounded manifest scan cannot parse ${path}: ${error.message}`);
    }
    for (const section of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
        const values = manifest[section];
        if (!values || typeof values !== "object" || Array.isArray(values)) continue;
        for (const scope of scopes) {
            if (typeof values[scope.package] !== "string") continue;
            const kind = section === "peerDependencies" ? "peer" : "manifest";
            if (!scope.kinds.includes(kind)) continue;
            detections.push({
                package: scope.package,
                target: scope.target,
                specifier: values[scope.package],
                kind,
                observation: {
                    path,
                    canonical_realpath: realpathSync(path),
                    file_sha256: fileHash,
                    locator: `manifest:${section}.${scope.package}`,
                },
            });
        }
    }
}

function scanNpmLock(path, source, fileHash, scopes, detections) {
    let lock;
    try {
        lock = parseJsonStrict(source);
    } catch (error) {
        die(`bounded npm lock scan cannot parse ${path}: ${error.message}`);
    }
    if (![2, 3].includes(lock.lockfileVersion)
        || !lock.packages || typeof lock.packages !== "object" || Array.isArray(lock.packages)) {
        die(`bounded npm lock scan supports only package-lock.json v2/v3 packages maps: ${path}`);
    }
    for (const [coordinate, record] of Object.entries(lock.packages)) {
        if (!record || typeof record !== "object" || Array.isArray(record)) {
            die(`bounded npm lock scan found malformed package record ${coordinate} in ${path}`);
        }
        for (const scope of scopes) {
            if (coordinate !== `node_modules/${scope.package}`
                && !coordinate.endsWith(`/node_modules/${scope.package}`)) continue;
            const installedSpecifier = typeof record.version === "string" && record.version !== ""
                ? record.version
                : typeof record.resolved === "string" && record.resolved !== ""
                    ? record.resolved
                    : record.link === true ? `link:${coordinate}` : null;
            if (installedSpecifier !== null && scope.kinds.includes("lock")) {
                detections.push({
                    package: scope.package,
                    target: scope.target,
                    specifier: installedSpecifier,
                    kind: "lock",
                    observation: {
                        path,
                        canonical_realpath: realpathSync(path),
                        file_sha256: fileHash,
                        locator: `npm-lock:packages.${JSON.stringify(coordinate)}.installed`,
                    },
                });
            }
        }
        const kind = coordinate.includes("node_modules/") ? "transitive" : "lock";
        for (const section of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
            const values = record[section];
            if (!values || typeof values !== "object" || Array.isArray(values)) continue;
            for (const [dependency, specifier] of Object.entries(values)) {
                addDetection(path, fileHash, scopes, detections, {
                    kind,
                    packageSpecifier: dependency,
                    specifier: String(specifier),
                    locator: `npm-lock:packages.${JSON.stringify(coordinate)}.${section}.${dependency}:${String(specifier)}`,
                });
            }
        }
    }
}

const tokenizerTokenLimit = 250000;
const tokenizerNestingLimit = 256;
const stylesheetExtensions = new Set([".css", ".less", ".sass", ".scss", ".styl"]);

function syntaxFailure(path, source, index, message) {
    die(`bounded static import projection rejected ${path}:${lineColumn(source, index)}: ${message}`);
}

function isIdentifierStart(character) {
    return character !== undefined && (/[A-Za-z_$]/.test(character) || character.codePointAt(0) >= 0x80);
}

function isIdentifierPart(character) {
    return character !== undefined && (/[A-Za-z0-9_$]/.test(character) || character.codePointAt(0) >= 0x80);
}

function tokenizeModuleSurface(path, source) {
    let cursor = 0;
    let emitted = 0;

    function token(type, value, start, end, extra = {}) {
        emitted += 1;
        if (emitted > tokenizerTokenLimit) syntaxFailure(path, source, start, `token ceiling ${tokenizerTokenLimit} exceeded`);
        return { type, value, start, end, ...extra };
    }

    function quoted(quote) {
        const start = cursor;
        cursor += 1;
        let escaped = false;
        while (cursor < source.length) {
            const character = source[cursor];
            if (character === "\\") {
                escaped = true;
                cursor += 2;
                continue;
            }
            if (character === quote) {
                const end = cursor + 1;
                const value = source.slice(start + 1, cursor);
                cursor = end;
                return token("string", value, start, end, { escaped });
            }
            if (character === "\n" || character === "\r") {
                syntaxFailure(path, source, start, "unterminated quoted literal");
            }
            cursor += 1;
        }
        syntaxFailure(path, source, start, "unterminated quoted literal");
    }

    function regexLiteral() {
        const start = cursor;
        let index = cursor + 1;
        let escaped = false;
        let characterClass = false;
        while (index < source.length && source[index] !== "\n" && source[index] !== "\r") {
            const character = source[index];
            if (escaped) {
                escaped = false;
            } else if (character === "\\") {
                escaped = true;
            } else if (character === "[") {
                characterClass = true;
            } else if (character === "]") {
                characterClass = false;
            } else if (character === "/" && !characterClass) {
                index += 1;
                while (/[A-Za-z]/.test(source[index] ?? "")) index += 1;
                cursor = index;
                return token("regex", source.slice(start, index), start, index);
            }
            index += 1;
        }
        return null;
    }

    function mayStartRegex(previous) {
        if (!previous) return true;
        if (previous.type === "identifier") {
            return new Set(["await", "case", "delete", "do", "else", "in", "instanceof", "new", "of", "return", "throw", "typeof", "void", "yield"]).has(previous.value);
        }
        return previous.type === "punctuator" && new Set([
            "(", "[", "{", ",", ";", ":", "?", "=", "==", "===", "!=", "!==", "=>",
            "+", "-", "*", "%", "&", "|", "^", "!", "~", "&&", "||", "??", "<", ">", "<=", ">=",
        ]).has(previous.value);
    }

    function template(depth) {
        if (depth > tokenizerNestingLimit) syntaxFailure(path, source, cursor, `template nesting ceiling ${tokenizerNestingLimit} exceeded`);
        const start = cursor;
        cursor += 1;
        let escaped = false;
        let hasSubstitution = false;
        const expressions = [];
        while (cursor < source.length) {
            const character = source[cursor];
            if (character === "\\") {
                escaped = true;
                cursor += 2;
                continue;
            }
            if (character === "`") {
                const end = cursor + 1;
                const value = source.slice(start + 1, cursor);
                cursor = end;
                return token("template", value, start, end, { escaped, hasSubstitution, expressions });
            }
            if (character === "$" && source[cursor + 1] === "{") {
                hasSubstitution = true;
                cursor += 2;
                expressions.push(scan(true, depth + 1));
                continue;
            }
            cursor += 1;
        }
        syntaxFailure(path, source, start, "unterminated template literal");
    }

    function scan(stopAtTemplateBrace = false, depth = 0) {
        if (depth > tokenizerNestingLimit) syntaxFailure(path, source, cursor, `syntax nesting ceiling ${tokenizerNestingLimit} exceeded`);
        const tokens = [];
        let braces = 0;
        while (cursor < source.length) {
            const character = source[cursor];
            if (/\s/.test(character)) {
                cursor += 1;
                continue;
            }
            if (character === "/" && source[cursor + 1] === "/") {
                cursor += 2;
                while (cursor < source.length && source[cursor] !== "\n" && source[cursor] !== "\r") cursor += 1;
                continue;
            }
            if (character === "/" && source[cursor + 1] === "*") {
                const start = cursor;
                const end = source.indexOf("*/", cursor + 2);
                if (end < 0) syntaxFailure(path, source, start, "unterminated block comment");
                cursor = end + 2;
                continue;
            }
            if (character === "\"" || character === "'") {
                tokens.push(quoted(character));
                continue;
            }
            if (character === "`") {
                tokens.push(template(depth + 1));
                continue;
            }
            if (character === "}" && stopAtTemplateBrace && braces === 0) {
                cursor += 1;
                return tokens;
            }
            if (character === "{") braces += 1;
            if (character === "}" && braces > 0) braces -= 1;
            if (isIdentifierStart(character)) {
                const start = cursor;
                cursor += character.length;
                while (isIdentifierPart(source[cursor])) cursor += source[cursor].length;
                tokens.push(token("identifier", source.slice(start, cursor), start, cursor));
                continue;
            }
            if (/[0-9]/.test(character)) {
                const start = cursor;
                cursor += 1;
                while (/[A-Za-z0-9_.]/.test(source[cursor] ?? "")) cursor += 1;
                tokens.push(token("number", source.slice(start, cursor), start, cursor));
                continue;
            }
            if (character === "/" && source[cursor + 1] !== "=" && tokens.at(-1)?.value !== "<" && mayStartRegex(tokens.at(-1))) {
                const expression = regexLiteral();
                if (expression) {
                    tokens.push(expression);
                    continue;
                }
            }
            const start = cursor;
            const punctuator = ["===", "!==", ">>>", "**=", "&&=", "||=", "??=", "=>", "==", "!=", "<=", ">=", "&&", "||", "??", "?.", "++", "--", "**", "<<", ">>", "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "..."].find((candidate) => source.startsWith(candidate, cursor)) ?? character;
            cursor += punctuator.length;
            tokens.push(token("punctuator", punctuator, start, cursor));
        }
        if (stopAtTemplateBrace) syntaxFailure(path, source, source.length - 1, "unterminated template substitution");
        return tokens;
    }

    return scan();
}

function matchingToken(tokens, start, open, close, path, source) {
    if (tokens[start]?.value !== open) syntaxFailure(path, source, tokens[start]?.start ?? 0, `expected ${open}`);
    let depth = 0;
    for (let index = start; index < tokens.length; index += 1) {
        if (tokens[index].value === open) depth += 1;
        else if (tokens[index].value === close) {
            depth -= 1;
            if (depth === 0) return index;
        }
    }
    syntaxFailure(path, source, tokens[start].start, `unterminated ${open}${close} group`);
}

function splitTopLevel(tokens, start, end) {
    const parts = [];
    let partStart = start;
    const stack = [];
    const pairs = new Map([["(", ")"], ["[", "]"], ["{", "}"]]);
    for (let index = start; index < end; index += 1) {
        const value = tokens[index].value;
        if (pairs.has(value)) stack.push(pairs.get(value));
        else if (stack.at(-1) === value) stack.pop();
        else if (value === "," && stack.length === 0) {
            parts.push([partStart, index]);
            partStart = index + 1;
        }
    }
    parts.push([partStart, end]);
    return parts.filter(([left, right]) => left < right);
}

function staticSpecifier(token, path, source, context) {
    if (!token || !["string", "template"].includes(token.type)) {
        syntaxFailure(path, source, token?.start ?? 0, `${context} requires one quoted or zero-substitution-template specifier`);
    }
    if (token.type === "template" && token.hasSubstitution) {
        syntaxFailure(path, source, token.start, `${context} has a computed template specifier`);
    }
    if (token.escaped) {
        syntaxFailure(path, source, token.start, `${context} specifier escapes are outside the bounded literal grammar`);
    }
    if (token.value.length === 0) syntaxFailure(path, source, token.start, `${context} specifier is empty`);
    return token.value;
}

function validateTypeAttributesObject(tokens, start, end, path, source, context) {
    if (start >= end || tokens[start].value !== "{") syntaxFailure(path, source, tokens[start]?.start ?? 0, `${context} attributes must be one object literal`);
    const close = matchingToken(tokens, start, "{", "}", path, source);
    if (close !== end - 1) syntaxFailure(path, source, tokens[close + 1]?.start ?? tokens[start].start, `${context} attributes contain trailing syntax`);
    const attributes = splitTopLevel(tokens, start + 1, close);
    if (attributes.length !== 1) syntaxFailure(path, source, tokens[start].start, `${context} requires exactly one static type attribute`);
    const [attributeStart, attributeEnd] = attributes[0];
    const attributeKey = tokens[attributeStart];
    const attributeKeyValue = attributeKey?.type === "string" ? staticSpecifier(attributeKey, path, source, context) : attributeKey?.value;
    if (attributeKeyValue !== "type" || tokens[attributeStart + 1]?.value !== ":"
        || tokens[attributeStart + 2]?.type !== "string" || attributeEnd !== attributeStart + 3) {
        syntaxFailure(path, source, attributeKey?.start ?? tokens[start].start, `${context} requires one literal type attribute`);
    }
    staticSpecifier(tokens[attributeStart + 2], path, source, context);
}

function validateImportAttributes(tokens, start, end, path, source, context) {
    if (start >= end || tokens[start].value !== "{") syntaxFailure(path, source, tokens[start]?.start ?? 0, `${context} options must be one object literal`);
    const close = matchingToken(tokens, start, "{", "}", path, source);
    if (close !== end - 1) syntaxFailure(path, source, tokens[close + 1]?.start ?? tokens[start].start, `${context} options contain trailing syntax`);
    const outer = splitTopLevel(tokens, start + 1, close);
    if (outer.length !== 1) syntaxFailure(path, source, tokens[start].start, `${context} options require exactly one with/assert member`);
    const [memberStart, memberEnd] = outer[0];
    const key = tokens[memberStart];
    const keyValue = key?.type === "string" ? staticSpecifier(key, path, source, context) : key?.value;
    if (!["with", "assert"].includes(keyValue) || tokens[memberStart + 1]?.value !== ":" || tokens[memberStart + 2]?.value !== "{") {
        syntaxFailure(path, source, key?.start ?? tokens[start].start, `${context} supports only {with:{type:\"...\"}} or {assert:{type:\"...\"}}`);
    }
    validateTypeAttributesObject(tokens, memberStart + 2, memberEnd, path, source, context);
}

function clauseKinds(tokens, start, end, statementType, path, source) {
    if (statementType) return ["type"];
    let runtime = false;
    let type = false;
    const brace = tokens.findIndex((item, index) => index >= start && index < end && item.value === "{");
    if (brace >= 0) {
        const close = matchingToken(tokens, brace, "{", "}", path, source);
        if (close >= end) syntaxFailure(path, source, tokens[brace].start, "import/export binding list crosses its from clause");
        if (tokens.slice(start, brace).some(({ value }) => value !== ",")) runtime = true;
        for (const [memberStart, memberEnd] of splitTopLevel(tokens, brace + 1, close)) {
            const member = tokens.slice(memberStart, memberEnd);
            if (member[0]?.value !== "type") {
                runtime = true;
            } else if (member.length === 2 && member[1]?.type === "identifier" && member[1].value !== "as") {
                type = true;
            } else if (member.length === 4 && member[1]?.type === "identifier" && member[1].value !== "as"
                && member[2]?.value === "as" && member[3]?.type === "identifier") {
                type = true;
            } else if (member.length === 1
                || (member.length === 3 && member[1]?.value === "as" && member[2]?.type === "identifier")) {
                runtime = true;
            } else {
                syntaxFailure(path, source, member[0]?.start ?? tokens[brace].start, "ambiguous inline type import/export specifier");
            }
        }
        if (tokens.slice(close + 1, end).some(({ value }) => value !== ",")) runtime = true;
    } else {
        runtime = true;
    }
    if (!runtime && !type) syntaxFailure(path, source, tokens[start]?.start ?? 0, "empty import/export binding clause is ambiguous");
    return [...(runtime ? ["runtime"] : []), ...(type ? ["type"] : [])];
}

function validateDeclarationTail(tokens, start, path, source, context) {
    let cursor = start;
    if (["with", "assert"].includes(tokens[cursor]?.value)) {
        const close = matchingToken(tokens, cursor + 1, "{", "}", path, source);
        validateTypeAttributesObject(tokens, cursor + 1, close + 1, path, source, context);
        cursor = close + 1;
    }
    const trailing = tokens[cursor];
    if (!trailing || trailing.value === ";") return;
    const previous = tokens[cursor - 1];
    if (source.slice(previous.end, trailing.start).includes("\n") || source.slice(previous.end, trailing.start).includes("\r")) return;
    syntaxFailure(path, source, trailing.start, `${context} contains unsupported trailing syntax`);
}

export function staticImportProjection(source, path = "<memory>") {
    if (typeof source !== "string" || typeof path !== "string") throw new TypeError("static import projection requires source text and a path label");
    const projections = [];
    const seen = new Set();
    const extension = extname(path);

    function emit(kind, specifier, index) {
        const resolvedKind = kind === "runtime" && /\.css(?:$|[?#])/.test(specifier) ? "css" : kind;
        const identity = `${resolvedKind}\0${specifier}\0${index}`;
        if (seen.has(identity)) return;
        seen.add(identity);
        projections.push({ kind: resolvedKind, specifier, index, locator: `${resolvedKind}:${lineColumn(source, index)}` });
    }

    function projectTokens(tokens, allowJavaScript) {
        for (let index = 0; index < tokens.length; index += 1) {
            const current = tokens[index];
            for (const expression of current.expressions ?? []) projectTokens(expression, true);
            if (current.value === "@" && tokens[index + 1]?.value === "import") {
                const next = tokens[index + 2];
                let specifier;
                if (next?.type === "string") {
                    specifier = staticSpecifier(next, path, source, "CSS @import");
                } else if (next?.value === "url" && tokens[index + 3]?.value === "(") {
                    const close = matchingToken(tokens, index + 3, "(", ")", path, source);
                    if (close !== index + 5 || !["string", "template"].includes(tokens[index + 4]?.type)) {
                        const raw = source.slice(tokens[index + 3].end, tokens[close].start).trim();
                        if (raw === "" || /[\s()"'`]/.test(raw)) syntaxFailure(path, source, next.start, "CSS url() import is outside the bounded literal grammar");
                        specifier = raw;
                    } else {
                        specifier = staticSpecifier(tokens[index + 4], path, source, "CSS url() @import");
                    }
                } else {
                    syntaxFailure(path, source, next?.start ?? current.start, "CSS @import requires a quoted literal or literal url()");
                }
                emit("css", specifier, current.start);
                continue;
            }
            if (!allowJavaScript || current.type !== "identifier" || (tokens[index - 1]?.value === "." || tokens[index - 1]?.value === "?.")) continue;
            if (current.value === "require" && tokens[index + 1]?.value === "(") {
                const close = matchingToken(tokens, index + 1, "(", ")", path, source);
                const argumentsList = splitTopLevel(tokens, index + 2, close);
                if (argumentsList.length !== 1 || argumentsList[0][1] !== argumentsList[0][0] + 1) {
                    syntaxFailure(path, source, current.start, "require() has a computed or unsupported argument list");
                }
                emit("runtime", staticSpecifier(tokens[argumentsList[0][0]], path, source, "require()"), current.start);
                continue;
            }
            if (current.value === "import") {
                if (tokens[index - 1]?.value === "@") continue;
                const next = tokens[index + 1];
                if (next?.value === ".") continue;
                if (next?.value === "(") {
                    const close = matchingToken(tokens, index + 1, "(", ")", path, source);
                    const argumentsList = splitTopLevel(tokens, index + 2, close);
                    if (argumentsList.length < 1 || argumentsList.length > 2
                        || argumentsList[0][1] !== argumentsList[0][0] + 1) {
                        syntaxFailure(path, source, current.start, "dynamic import has a computed or unsupported argument list");
                    }
                    const specifier = staticSpecifier(tokens[argumentsList[0][0]], path, source, "dynamic import");
                    if (argumentsList.length === 2) validateImportAttributes(tokens, ...argumentsList[1], path, source, "dynamic import");
                    emit("dynamic", specifier, current.start);
                    continue;
                }
                if (next?.type === "string") {
                    emit("runtime", staticSpecifier(next, path, source, "side-effect import"), current.start);
                    validateDeclarationTail(tokens, index + 2, path, source, "side-effect import");
                    continue;
                }
                if (next?.type === "template") syntaxFailure(path, source, next.start, "static side-effect import requires a quoted literal");
                let depth = 0;
                let from = -1;
                for (let probe = index + 1; probe < tokens.length && tokens[probe].start - current.start <= 16384; probe += 1) {
                    const value = tokens[probe].value;
                    if (["(", "[", "{"].includes(value)) depth += 1;
                    else if ([")", "]", "}"].includes(value)) depth -= 1;
                    else if (value === "from" && depth === 0) { from = probe; break; }
                    else if (value === ";" && depth === 0) break;
                }
                if (from < 0) {
                    if (next?.value === "type" || next?.value === "{" || next?.value === "*" || tokens.slice(index + 1, index + 8).some(({ value }) => value === "=")) {
                        syntaxFailure(path, source, current.start, "unsupported or ambiguous static import clause");
                    }
                    continue;
                }
                const literal = tokens[from + 1];
                const specifier = staticSpecifier(literal, path, source, "static import");
                const statementType = next?.value === "type";
                if (statementType && from === index + 2) syntaxFailure(path, source, current.start, "`import type from` is grammatically ambiguous");
                for (const kind of clauseKinds(tokens, index + 1 + (statementType ? 1 : 0), from, statementType, path, source)) emit(kind, specifier, current.start);
                validateDeclarationTail(tokens, from + 2, path, source, "static import");
                continue;
            }
            if (current.value === "export") {
                let cursor = index + 1;
                const statementType = tokens[cursor]?.value === "type";
                if (statementType) cursor += 1;
                let clauseEnd;
                if (tokens[cursor]?.value === "{") clauseEnd = matchingToken(tokens, cursor, "{", "}", path, source) + 1;
                else if (tokens[cursor]?.value === "*") {
                    clauseEnd = cursor + 1;
                    if (tokens[clauseEnd]?.value === "as") clauseEnd += 2;
                } else {
                    continue;
                }
                if (tokens[clauseEnd]?.value !== "from") {
                    if (tokens.slice(clauseEnd, clauseEnd + 4).some(({ value }) => value === "from")) {
                        syntaxFailure(path, source, current.start, "unsupported or ambiguous export-from clause");
                    }
                    continue;
                }
                const specifier = staticSpecifier(tokens[clauseEnd + 1], path, source, "static export");
                for (const kind of clauseKinds(tokens, cursor, clauseEnd, statementType, path, source)) emit(kind, specifier, current.start);
                validateDeclarationTail(tokens, clauseEnd + 2, path, source, "static export");
            }
        }
    }

    const tokens = tokenizeModuleSurface(path, source);
    projectTokens(tokens, !stylesheetExtensions.has(extension));
    return projections.sort((left, right) => left.index - right.index
        || compareCanonicalText(left.kind, right.kind)
        || compareCanonicalText(left.specifier, right.specifier));
}

function scanSource(path, source, fileHash, scopes, detections) {
    for (const projection of staticImportProjection(source, path)) {
        addDetection(path, fileHash, scopes, detections, projection);
    }
}

function scanEdges(roots, bounds) {
    const ignored = new Set(bounds.ignored_directory_names);
    const rootPaths = new Set(roots.map((item) => item.canonical_realpath));
    const detections = [];
    const state = { entries: 0, files: 0, maxEntries: bounds.max_entries, maxFiles: bounds.max_files };

    function visit(repository, path) {
        const canonical = realpathSync(path);
        if (!within(repository, canonical)) die(`edge scan encountered an escaping directory symlink ${path} -> ${canonical}`);
        if (canonical !== repository && rootPaths.has(canonical)) return;
        for (const entry of directoryEntries(canonical, state, `edge scan at ${canonical}`)) {
            if (ignored.has(entry.name)) continue;
            const child = join(canonical, entry.name);
            if (entry.isDirectory()) {
                visit(repository, child);
                continue;
            }
            if (entry.isSymbolicLink()) {
                if (statSync(child).isDirectory()) visit(repository, child);
                continue;
            }
            if (!entry.isFile()) continue;
            const isManifest = entry.name === "package.json";
            const isNpmLock = entry.name === "package-lock.json";
            const isSource = sourceExtensions.has(extname(entry.name));
            if (!isManifest && !isNpmLock && !isSource) continue;
            state.files += 1;
            if (state.files > state.maxFiles) die(`edge scan exceeded max_files ${state.maxFiles}; a truncated scan cannot close the universe`);
            const size = statSync(child).size;
            if (size > bounds.max_file_bytes) die(`scannable file ${child} is ${size} bytes, above max_file_bytes ${bounds.max_file_bytes}`);
            const buffer = readFileSync(child);
            let source;
            try {
                source = isManifest || isNpmLock ? decodeUtf8Strict(buffer) : sourceDecoder.decode(buffer);
            } catch (error) {
                die(`scannable file ${child} is not lossless UTF-8: ${error.message}`);
            }
            const fileHash = sha256(buffer);
            const scopes = bounds.edge_scope;
            if (isManifest) scanManifest(child, source, fileHash, scopes, detections);
            if (isNpmLock) scanNpmLock(child, source, fileHash, scopes, detections);
            if (isSource) scanSource(child, source, fileHash, scopes, detections);
        }
    }

    for (const item of roots) visit(item.canonical_realpath, item.canonical_realpath);
    return detections;
}

function tupleKey(value) {
    return canonicalize({
        source: value.source,
        target: value.target,
        package: value.package,
        specifier: value.specifier,
        kind: value.kind,
    });
}

function observedEdgeMap(availableRoots, detections) {
    const sourceByPath = [...availableRoots].sort((left, right) =>
        right.canonical_realpath.length - left.canonical_realpath.length
        || compareCanonicalText(left.canonical_realpath, right.canonical_realpath));
    const records = new Map();
    for (const detection of detections) {
        const source = sourceByPath.find((rootRecord) => within(rootRecord.canonical_realpath, detection.observation.canonical_realpath));
        if (!source) die(`scanner produced an observation outside every available root: ${detection.observation.path}`);
        const value = { source: source.id, ...detection };
        delete value.observation;
        const key = tupleKey(value);
        if (!records.has(key)) records.set(key, { ...value, observations: [] });
        records.get(key).observations.push(detection.observation);
    }
    for (const record of records.values()) {
        const semantic = new Set();
        record.observations.sort(compareObservation);
        for (const item of record.observations) {
            const key = `${item.canonical_realpath}\0${item.locator}`;
            if (semantic.has(key)) die(`scanner repeated semantic edge observation ${key}`);
            semantic.add(key);
        }
    }
    return records;
}

function statusCount(values, status) {
    return values.filter((value) => value.disposition.status === status).length;
}

function verifyFreshness(universe, now) {
    const epoch = universe.discovery.epoch;
    const started = Date.parse(epoch.started_at);
    const completed = Date.parse(epoch.completed_at);
    const observed = Date.parse(universe.observed_at);
    if (universe.observed_at !== epoch.completed_at) die("observed_at must equal discovery.epoch.completed_at exactly");
    if (completed < started) die("discovery epoch completed before it started");
    if ((completed - started) / 1000 > epoch.max_age_seconds) die("discovery epoch duration exceeds max_age_seconds");
    if (epoch.max_age_seconds > 3600) die("discovery max_age_seconds may not exceed 3600");
    if (now - observed > epoch.max_age_seconds * 1000) die("consumer-universe observation is stale");
    if (observed - now > 5000) die("consumer-universe observation is more than five seconds in the future");
}

function main() {
    const paths = parseArguments(process.argv.slice(2));
    const resolverStarted = new Date();
    const schemaRecord = readStrict(inputSchemaPath, "consumer-universe schema");
    const receiptSchemaRecord = readStrict(receiptSchemaPath, "consumer-universe receipt schema");
    const inputRecord = readStrict(paths.input, "consumer-universe input");
    const schemaErrors = validateJsonSchema(inputRecord.value, schemaRecord.value);
    if (schemaErrors.length) die(`consumer-universe schema failure:\n${schemaErrors.join("\n")}`);

    const universe = inputRecord.value;
    const universePreimage = structuredClone(universe);
    delete universePreimage.universe_hash;
    const semanticHash = sha256(canonicalize(universePreimage));
    if (semanticHash !== universe.universe_hash) die(`consumer-universe self-hash ${universe.universe_hash}; expected ${semanticHash}`);
    verifyFreshness(universe, resolverStarted.getTime());

    const methods = [...universe.discovery.methods].sort();
    exactSet(methods, requiredMethods, "discovery methods");
    const ignored = [...universe.discovery.bounds.ignored_directory_names].sort();
    exactSet(ignored, requiredIgnoredDirectories, "ignored directory names");
    verifyConsumerEvidence(universe.discovery.evidence, "discovery");

    const scopePackages = new Set();
    for (const scope of universe.discovery.bounds.edge_scope) {
        if (scopePackages.has(scope.package)) die(`duplicate package edge scope ${scope.package}`);
        scopePackages.add(scope.package);
        for (const required of requiredObservedKinds) {
            if (!scope.kinds.includes(required)) die(`edge scope ${scope.package} must observe ${required}; kind-level omissions are forbidden`);
        }
    }

    const registry = consumerWaveRegistry();
    const rootState = validateConsumerRootState(universe, universe.discovery.bounds, registry.ids);
    const { rootsById, availableRoots } = rootState;
    const blockers = [...rootState.blockers];

    for (const scope of universe.discovery.bounds.edge_scope) {
        if (!scope.target.startsWith("external:") && !rootsById.has(scope.target)) {
            die(`edge scope ${scope.package} names unknown target ${scope.target}`);
        }
        if (scope.target.startsWith("external:") && scope.target !== `external:${scope.package}`) {
            die(`edge scope external target must be exactly external:${scope.package}`);
        }
    }

    const repositoriesBefore = discoverRepositories(universe.discovery.bounds);
    const declaredAvailable = availableRoots.map((item) => item.canonical_realpath).sort();
    exactSet(repositoriesBefore, declaredAvailable, "bounded repository discovery; an omitted in-scope root exists");

    const identitiesBefore = availableRoots
        .map((item) => ({ id: item.id, ...item.identity }))
        .sort(compareId);
    const detections = scanEdges(availableRoots, universe.discovery.bounds);
    const observedEdges = observedEdgeMap(availableRoots, detections);

    const edgeIds = new Set();
    const edgeTuples = new Set();
    const declaredTupleMap = new Map();
    const edgeObservationModes = new Map();
    for (const edge of universe.edges) {
        if (edgeIds.has(edge.id)) die(`duplicate edge id ${edge.id}`);
        edgeIds.add(edge.id);
        const tuple = tupleKey(edge);
        if (edgeTuples.has(tuple)) die(`duplicate semantic edge tuple ${tuple}`);
        edgeTuples.add(tuple);
        declaredTupleMap.set(tuple, edge);
        const scope = universe.discovery.bounds.edge_scope.find((item) => item.package === edge.package && item.target === edge.target);
        if (!scope) die(`edge ${edge.id} lies outside the bounded package/target scope`);
        if (!scope.kinds.includes(edge.kind)) die(`edge ${edge.id} kind ${edge.kind} lies outside its bounded scope`);
        verifyConsumerOwner(registry.ids, edge.owner_wave, `edge ${edge.id}`);
        const sourceRoot = rootsById.get(edge.source);
        if (!sourceRoot) die(`edge ${edge.id} names unknown source root ${edge.source}`);
        verifyConsumerEvidence(edge.evidence, `edge ${edge.id}`, sourceRoot.disposition.status === "unavailable" ? undefined : sourceRoot.canonical_realpath);
        const observationMode = consumerEdgeObservationMode(edge, rootsById);
        if (edge.disposition.status === "unavailable") {
            verifyConsumerEvidence(edge.disposition.evidence, `unavailable edge ${edge.id}`);
            verifyConsumerOwner(registry.ids, edge.disposition.retrigger.wave_id, `unavailable edge ${edge.id} retrigger`);
            blockers.push(`edge:${edge.id}:unavailable:${edge.disposition.retrigger.wave_id}:${edge.disposition.retrigger.condition}`);
        } else if (edge.disposition.status === "excluded") {
            verifyConsumerEvidence(edge.disposition.evidence, `excluded edge ${edge.id}`, sourceRoot.canonical_realpath);
        }
        edgeObservationModes.set(tuple, observationMode);
    }

    for (const [tuple, observed] of observedEdges) {
        const declared = declaredTupleMap.get(tuple);
        if (!declared) die(`bounded scan found omitted in-scope edge ${tuple}`);
        if (edgeObservationModes.get(tuple) === "none") die(`edge ${declared.id} from an unavailable source unexpectedly produced observations`);
        const evidencePaths = declared.evidence.map((item) => item.canonical_realpath);
        const observationPaths = [...new Set(observed.observations.map((item) => item.canonical_realpath))];
        exactSet(evidencePaths, observationPaths, `edge ${declared.id} occurrence evidence paths`);
    }
    for (const [tuple, declared] of declaredTupleMap) {
        if (edgeObservationModes.get(tuple) === "required" && !observedEdges.has(tuple)) {
            die(`declared edge ${declared.id} is unproved by the bounded scan: ${tuple}`);
        }
    }

    const repositoriesAfter = discoverRepositories(universe.discovery.bounds);
    exactSet(repositoriesAfter, repositoriesBefore, "repository set changed during scan");
    const identitiesAfter = availableRoots
        .map((item) => ({ id: item.id, ...resolveGitIdentity(item.canonical_realpath) }))
        .sort(compareId);
    if (canonicalize(identitiesAfter) !== canonicalize(identitiesBefore)) die("Git root identity changed during the bounded scan; epoch is not frozen");

    const rootsReceipt = universe.roots.map((item) => {
        const identity = identitiesAfter.find((candidate) => candidate.id === item.id) ?? item;
        const result = {
            id: item.id,
            repository: item.repository,
            canonical_realpath: item.canonical_realpath,
            branch: identity.branch,
            head: identity.head,
            dirty_sha256: identity.dirty_sha256,
            origins: [...(identity.origins ?? item.provenance.origins.values)].sort(compareCanonicalText),
            worktrees: [...(identity.worktrees ?? item.provenance.worktrees.values)].sort(compareCanonicalText),
            status: item.disposition.status,
        };
        if (item.disposition.owner_wave) result.owner_wave = item.disposition.owner_wave;
        if (item.disposition.reason) result.reason = item.disposition.reason;
        if (item.disposition.retrigger) {
            result.retrigger_wave = item.disposition.retrigger.wave_id;
            result.condition = item.disposition.retrigger.condition;
        }
        return result;
    }).sort(compareId);

    const edgesReceipt = universe.edges.map((item) => {
        const observations = observedEdges.get(tupleKey(item))?.observations ?? [];
        const result = {
            id: item.id,
            source: item.source,
            target: item.target,
            package: item.package,
            specifier: item.specifier,
            kind: item.kind,
            owner_wave: item.owner_wave,
            status: item.disposition.status,
            observations,
            observations_sha256: sha256(canonicalize(observations)),
        };
        if (item.disposition.reason) result.reason = item.disposition.reason;
        if (item.disposition.retrigger) {
            result.retrigger_wave = item.disposition.retrigger.wave_id;
            result.condition = item.disposition.retrigger.condition;
        }
        return result;
    }).sort(compareId);
    blockers.sort(compareCanonicalText);

    const boundsHash = sha256(canonicalize(universe.discovery.bounds));
    const observedRootsHash = sha256(canonicalize(rootsReceipt));
    const observedEdgesHash = sha256(canonicalize(edgesReceipt));
    const resolvedAt = new Date().toISOString();
    const epoch = {
        started_at: resolverStarted.toISOString(),
        completed_at: resolvedAt,
        max_age_seconds: universe.discovery.epoch.max_age_seconds,
        bounds_sha256: boundsHash,
        observed_roots_sha256: observedRootsHash,
        observed_edges_sha256: observedEdgesHash,
        epoch_sha256: "",
    };
    const epochPreimage = structuredClone(epoch);
    delete epochPreimage.epoch_sha256;
    epoch.epoch_sha256 = sha256(canonicalize(epochPreimage));
    const receipt = {
        schema: "vnext-consumer-universe-receipt/2",
        observed_at: universe.observed_at,
        resolved_at: resolvedAt,
        input: {
            path: paths.input,
            file_sha256: sha256(inputRecord.source),
            universe_hash: universe.universe_hash,
        },
        resolver_sha256: sha256(readFileSync(toolPath)),
        schema_sha256: sha256(schemaRecord.source),
        receipt_schema_sha256: sha256(receiptSchemaRecord.source),
        formation_wave_registry_sha256: registry.sha256,
        discovery_methods: methods,
        epoch,
        counts: {
            roots: universe.roots.length,
            included_roots: statusCount(universe.roots, "included"),
            excluded_roots: statusCount(universe.roots, "excluded"),
            unavailable_roots: statusCount(universe.roots, "unavailable"),
            edges: universe.edges.length,
            included_edges: statusCount(universe.edges, "included"),
            excluded_edges: statusCount(universe.edges, "excluded"),
            unavailable_edges: statusCount(universe.edges, "unavailable"),
            observations: detections.length,
        },
        roots: rootsReceipt,
        edges: edgesReceipt,
        resolvable: blockers.length === 0,
        blockers,
        receipt_hash: "",
    };
    const receiptPreimage = structuredClone(receipt);
    delete receiptPreimage.receipt_hash;
    receipt.receipt_hash = sha256(canonicalize(receiptPreimage));
    const receiptErrors = validateJsonSchema(receipt, receiptSchemaRecord.value);
    if (receiptErrors.length) die(`generated receipt schema failure:\n${receiptErrors.join("\n")}`);
    writeFileSync(paths.output, `${canonicalize(receipt)}\n`);

    process.stdout.write(`${canonicalize({
        schema: receipt.schema,
        receipt: paths.output,
        receipt_hash: receipt.receipt_hash,
        epoch_sha256: receipt.epoch.epoch_sha256,
        roots: receipt.counts.roots,
        edges: receipt.counts.edges,
        observations: receipt.counts.observations,
        resolvable: receipt.resolvable,
        blockers: receipt.blockers,
    })}\n`);
    if (!receipt.resolvable) process.exitCode = 2;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
    try {
        main();
    } catch (error) {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
    }
}
