import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, decodeUtf8Strict, parseJsonStrict } from "./json-contract.mjs";

const trancheRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
export const canonicalConsumerBoundsAuthorityPath = resolve(trancheRoot, "CONSUMER-UNIVERSE-BOUNDS.json");

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const exactRootIds = [
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
const exactRequiredPathLaws = [
    ["bbnf-lang/playground", "bbnf-lang", "playground"],
    ["fourier-analysis/api", "fourier-analysis", "api"],
    ["fourier-analysis/web", "fourier-analysis", "web"],
    ["muster/frontend", "muster", "frontend"],
    ["sci-report/atlas", "sci-report", "atlas"],
    ["words/frontend", "words", "frontend"],
];
const exactIgnoredDirectories = [
    ".cache", ".git", ".next", ".nuxt", ".pnpm", ".turbo", ".venv", ".vnext", ".yarn",
    "__pycache__", "build", "coverage", "dist", "node_modules", "playwright-report",
    "r1-opus-refuted", "target", "test-results", "tranches", "venv",
];
const exactScopes = [
    ["@mkbabb/bbnf-lang", "bbnf-lang"],
    ["@mkbabb/glass-ui", "glass-ui"],
    ["@mkbabb/keyframes.js", "keyframes"],
    ["@mkbabb/parse-that", "parse-that"],
    ["@mkbabb/value.js", "value"],
];
const exactKinds = ["css", "dynamic", "lock", "manifest", "peer", "runtime", "transitive", "type"];

function within(base, candidate) {
    const offset = relative(base, candidate);
    return offset === "" || (!offset.startsWith("..") && !isAbsolute(offset));
}

function exact(actual, expected, label) {
    if (canonicalize(actual) !== canonicalize(expected)) {
        throw new Error(`${label} is not the exact consumer-bounds authority`);
    }
}

function requireRegularCanonicalFile(path, label) {
    if (!isAbsolute(path) || !existsSync(path)) throw new Error(`${label} must be an existing absolute file: ${path}`);
    const metadata = lstatSync(path);
    if (!metadata.isFile() || metadata.isSymbolicLink()) throw new Error(`${label} must be a regular non-symlink file: ${path}`);
    const canonical = realpathSync(path);
    if (canonical !== path) throw new Error(`${label} must use canonical realpath ${canonical}`);
}

function parseAuthoritySource(path) {
    const source = decodeUtf8Strict(readFileSync(path));
    let manifest;
    try {
        manifest = parseJsonStrict(source);
    } catch (error) {
        throw new Error(`consumer-universe bounds authority is not strict JSON: ${error.message}`);
    }
    return { source, manifest };
}

export function canonicalConsumerBoundsAuthority() {
    requireRegularCanonicalFile(canonicalConsumerBoundsAuthorityPath, "canonical consumer-universe bounds authority");
    const { source, manifest } = parseAuthoritySource(canonicalConsumerBoundsAuthorityPath);
    return {
        path: canonicalConsumerBoundsAuthorityPath,
        file_sha256: sha256(source),
        manifest_hash: manifest.manifest_hash,
    };
}

export function validateConsumerBoundsAuthority(
    binding = canonicalConsumerBoundsAuthority(),
    {
        verificationPath = binding?.path,
        requireCanonicalPath = verificationPath === binding?.path,
        allowFixtureProfile = false,
    } = {},
) {
    if (!binding || typeof binding !== "object" || Array.isArray(binding)) {
        throw new Error("consumer-universe bounds authority binding must be an object");
    }
    exact(Object.keys(binding).sort(), ["file_sha256", "manifest_hash", "path"], "consumer-universe bounds authority binding keys");
    if (!isAbsolute(binding.path) || resolve(binding.path) !== binding.path) {
        throw new Error("consumer-universe bounds authority logical path must be absolute and normalized");
    }
    if (!/^[0-9a-f]{64}$/.test(binding.file_sha256) || !/^[0-9a-f]{64}$/.test(binding.manifest_hash)) {
        throw new Error("consumer-universe bounds authority binding hashes must be lowercase SHA-256 values");
    }
    if (requireCanonicalPath && binding.path !== canonicalConsumerBoundsAuthorityPath) {
        throw new Error(`live consumer-universe bounds authority must be ${canonicalConsumerBoundsAuthorityPath}`);
    }
    requireRegularCanonicalFile(verificationPath, "consumer-universe bounds authority verification path");
    if (requireCanonicalPath && verificationPath !== canonicalConsumerBoundsAuthorityPath) {
        throw new Error(`live consumer-universe bounds authority verification path must be ${canonicalConsumerBoundsAuthorityPath}`);
    }

    const { source, manifest } = parseAuthoritySource(verificationPath);
    if (sha256(source) !== binding.file_sha256) throw new Error("consumer-universe bounds authority file hash drift");
    const fixtureProfile = manifest.schema === "vnext-consumer-universe-bounds-fixture/1";
    if (manifest.schema !== "vnext-consumer-universe-bounds/2" && !(fixtureProfile && allowFixtureProfile)) {
        throw new Error("invalid consumer-universe bounds authority schema");
    }
    exact(
        Object.keys(manifest).sort(),
        ["bounds", "bounds_sha256", "manifest_hash", "purpose", "schema"],
        "consumer-universe bounds authority manifest keys",
    );
    exact(
        Object.keys(manifest.bounds ?? {}).sort(),
        [
            "edge_scope",
            "ignored_directory_names",
            "max_entries",
            "max_file_bytes",
            "max_files",
            "max_snapshot_bytes",
            "required_paths",
            "required_roots",
            "search_roots",
        ],
        "consumer-universe semantic bounds keys",
    );
    const preimage = structuredClone(manifest);
    delete preimage.manifest_hash;
    const manifestHash = sha256(canonicalize(preimage));
    if (manifest.manifest_hash !== manifestHash || binding.manifest_hash !== manifestHash) {
        throw new Error("consumer-universe bounds authority manifest hash drift");
    }
    const boundsHash = sha256(canonicalize(manifest.bounds));
    if (manifest.bounds_sha256 !== boundsHash) throw new Error("consumer-universe bounds authority semantic bounds hash drift");

    exact(manifest.bounds?.ignored_directory_names, exactIgnoredDirectories, "consumer-universe quarantine exclusion set");
    exact(
        (manifest.bounds?.edge_scope ?? []).map((scope) => [scope.package, scope.target]),
        exactScopes,
        "consumer-universe package/target scope",
    );
    for (const scope of manifest.bounds?.edge_scope ?? []) {
        exact(Object.keys(scope).sort(), ["kinds", "package", "target"], `${scope.package} consumer-universe edge-scope keys`);
        exact(scope.kinds, exactKinds, `${scope.package} consumer-universe edge-kind scope`);
    }
    const requiredRoots = manifest.bounds?.required_roots ?? [];
    const requiredPaths = manifest.bounds?.required_paths ?? [];
    if (!fixtureProfile) {
        exact(requiredRoots.map(({ id }) => id), exactRootIds, "consumer-universe required root IDs");
        exact(
            requiredPaths.map(({ id, repository_root_id, relative_path }) => [id, repository_root_id, relative_path]),
            exactRequiredPathLaws,
            "consumer-universe required repository-subdirectory laws",
        );
    }

    const searchRoots = manifest.bounds?.search_roots ?? [];
    if (searchRoots.length === 0) throw new Error("consumer-universe bounds authority requires at least one search root");
    const canonicalSearchRoots = new Set();
    const logicalSearchRoots = new Set();
    for (const search of searchRoots) {
        exact(Object.keys(search).sort(), ["canonical_realpath", "max_depth", "path"], "consumer-universe search root keys");
        if (!isAbsolute(search.path) || resolve(search.path) !== search.path
            || !isAbsolute(search.canonical_realpath) || resolve(search.canonical_realpath) !== search.canonical_realpath
            || !Number.isInteger(search.max_depth) || search.max_depth < 1) {
            throw new Error("consumer-universe search root is malformed");
        }
        if (logicalSearchRoots.has(search.path)) throw new Error(`duplicate consumer-universe logical search root: ${search.path}`);
        if (canonicalSearchRoots.has(search.canonical_realpath)) throw new Error(`duplicate consumer-universe search root: ${search.canonical_realpath}`);
        logicalSearchRoots.add(search.path);
        canonicalSearchRoots.add(search.canonical_realpath);
    }

    const requiredRootPaths = new Set();
    const requiredRootsById = new Map();
    for (const required of requiredRoots) {
        exact(Object.keys(required).sort(), ["canonical_realpath", "id"], `consumer-universe required root ${required.id} keys`);
        if (typeof required.id !== "string" || !/^[a-z0-9][a-z0-9._/-]*$/.test(required.id)) {
            throw new Error("consumer-universe required root ID is malformed");
        }
        if (requiredRootsById.has(required.id)) throw new Error(`duplicate consumer-universe required root ID: ${required.id}`);
        if (!isAbsolute(required.canonical_realpath) || resolve(required.canonical_realpath) !== required.canonical_realpath) {
            throw new Error(`consumer-universe required root path is not absolute: ${required.id}`);
        }
        const canonical = required.canonical_realpath;
        if (requiredRootPaths.has(canonical)) throw new Error(`duplicate consumer-universe required root path: ${canonical}`);
        requiredRootPaths.add(canonical);
        requiredRootsById.set(required.id, required);
        if (![...canonicalSearchRoots].some((searchRoot) => within(searchRoot, canonical))) {
            throw new Error(`consumer-universe required root escapes every bounded search root: ${required.id}`);
        }
    }

    const requiredPathIds = new Set();
    const requiredCanonicalPaths = new Set();
    for (const required of requiredPaths) {
        exact(
            Object.keys(required).sort(),
            ["canonical_realpath", "id", "kind", "path", "relative_path", "repository_root_id"],
            `consumer-universe required path ${required.id} keys`,
        );
        if (required.kind !== "repository-subdirectory") {
            throw new Error(`consumer-universe required path ${required.id} has unsupported kind ${required.kind}`);
        }
        if (typeof required.id !== "string" || !/^[a-z0-9][a-z0-9._/-]*$/.test(required.id)) {
            throw new Error("consumer-universe required path ID is malformed");
        }
        if (requiredPathIds.has(required.id) || requiredRootsById.has(required.id)) {
            throw new Error(`duplicate consumer-universe required identity ID: ${required.id}`);
        }
        requiredPathIds.add(required.id);
        const repositoryRoot = requiredRootsById.get(required.repository_root_id);
        if (!repositoryRoot) {
            throw new Error(`consumer-universe required path ${required.id} names unknown repository root ${required.repository_root_id}`);
        }
        if (typeof required.relative_path !== "string"
            || required.relative_path.length === 0
            || isAbsolute(required.relative_path)
            || required.relative_path.includes("\\")
            || required.relative_path.split("/").some((part) => part === "" || part === "." || part === "..")) {
            throw new Error(`consumer-universe required path ${required.id} has unsafe relative_path`);
        }
        if (!isAbsolute(required.path) || resolve(required.path) !== required.path
            || !isAbsolute(required.canonical_realpath)
            || resolve(required.canonical_realpath) !== required.canonical_realpath) {
            throw new Error(`consumer-universe required path ${required.id} must use absolute paths`);
        }
        const expectedCanonical = resolve(repositoryRoot.canonical_realpath, required.relative_path);
        const expectedLogicalPaths = searchRoots
            .filter((search) => within(search.canonical_realpath, repositoryRoot.canonical_realpath))
            .map((search) => resolve(
                search.path,
                relative(search.canonical_realpath, repositoryRoot.canonical_realpath),
                required.relative_path,
            ));
        if (!expectedLogicalPaths.includes(required.path) || expectedCanonical !== required.canonical_realpath
            || expectedCanonical === repositoryRoot.canonical_realpath) {
            throw new Error(`consumer-universe required path ${required.id} is not the exact typed repository subdirectory`);
        }
        const canonical = required.canonical_realpath;
        if (!within(repositoryRoot.canonical_realpath, canonical) || canonical === repositoryRoot.canonical_realpath) {
            throw new Error(`consumer-universe required path escapes repository root: ${required.id}`);
        }
        if (requiredCanonicalPaths.has(canonical) || requiredRootPaths.has(canonical)) {
            throw new Error(`duplicate consumer-universe required identity path: ${canonical}`);
        }
        requiredCanonicalPaths.add(canonical);
    }

    for (const field of ["max_entries", "max_files", "max_file_bytes", "max_snapshot_bytes"]) {
        if (!Number.isSafeInteger(manifest.bounds?.[field]) || manifest.bounds[field] < 1) {
            throw new Error(`consumer-universe bounds authority ${field} must be a positive integer`);
        }
    }

    return {
        binding: structuredClone(binding),
        manifest,
        bounds_sha256: boundsHash,
        verification_path: verificationPath,
    };
}
