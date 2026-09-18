import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
    existsSync,
    lstatSync,
    readFileSync,
    readlinkSync,
    realpathSync,
    statSync,
} from "node:fs";
import { delimiter, isAbsolute, relative, resolve } from "node:path";

import { canonicalize } from "./json-contract.mjs";

const sha256 = (input) => createHash("sha256").update(input).digest("hex");
export const proofEnvironmentKeys = Object.freeze([
    "CI",
    "FORCE_COLOR",
    "HOME",
    "LANG",
    "LC_ALL",
    "NODE",
    "NO_COLOR",
    "PATH",
    "TERM",
    "TMPDIR",
    "TZ",
]);
export const proofEnvironmentCarrierKey = "VNEXT_PROOF_ENV_JCS";
export const proofRunnerRelativePath = ".vnext/proof-runner.mjs";

const proofEntrypointPattern = /^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[a-zA-Z0-9._/-]+\.mjs$/;
const proofRunnerKeys = JSON.stringify(proofEnvironmentKeys);
export const proofRunnerSource = `import { lstatSync, realpathSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const carrierKey = ${JSON.stringify(proofEnvironmentCarrierKey)};
const expectedKeys = ${proofRunnerKeys};
const carrier = process.env[carrierKey];
if (typeof carrier !== "string") throw new Error("missing exact proof-environment carrier");
const proofEnvironment = JSON.parse(carrier);
const keys = Object.keys(proofEnvironment).sort();
if (JSON.stringify(keys) !== JSON.stringify(expectedKeys) || JSON.stringify(proofEnvironment) !== carrier) {
    throw new Error("proof-environment carrier is not the exact canonical projection");
}
for (const key of Object.keys(process.env)) delete process.env[key];
Object.assign(process.env, proofEnvironment);
if (JSON.stringify(Object.keys(process.env).sort()) !== JSON.stringify(expectedKeys)) {
    throw new Error("proof environment was not scrubbed to its exact allowlist");
}
const entry = process.argv[2];
if (typeof entry !== "string" || !${proofEntrypointPattern}.test(entry)) {
    throw new Error("invalid repository-relative proof entrypoint");
}
const root = realpathSync(process.cwd());
const target = resolve(root, entry);
const fromRoot = relative(root, target);
if (fromRoot.startsWith("..") || isAbsolute(fromRoot)) throw new Error("proof entrypoint escapes its repository");
const metadata = lstatSync(target);
if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(target) !== target) {
    throw new Error("proof entrypoint must be a canonical regular non-symlink file");
}
process.argv.splice(1, 2, target);
await import(pathToFileURL(target).href);
`;
export const proofRunnerSha256 = sha256(proofRunnerSource);

export function canonicalProofScript(entrypoint) {
    if (!proofEntrypointPattern.test(entrypoint)) throw new Error("invalid repository-relative proof entrypoint");
    return `"$NODE" ${proofRunnerRelativePath} ${entrypoint}`;
}

export function proofEntrypointFromScript(script) {
    const prefix = `"$NODE" ${proofRunnerRelativePath} `;
    if (typeof script !== "string" || !script.startsWith(prefix)) {
        throw new Error(`proof script must use the exact committed ${proofRunnerRelativePath} runner`);
    }
    const entrypoint = script.slice(prefix.length);
    if (script !== canonicalProofScript(entrypoint)) {
        throw new Error(`proof script must use one exact repository-relative .mjs entrypoint`);
    }
    return entrypoint;
}

export function proofRunnerFixture(entrypoint) {
    return Object.freeze({
        relative_path: proofRunnerRelativePath,
        source: proofRunnerSource,
        sha256: proofRunnerSha256,
        package_script: canonicalProofScript(entrypoint),
    });
}

export function fileSha256(path) {
    return sha256(readFileSync(path));
}

export function canonicalGateArgv(subject, waveId) {
    const slug = waveId.toLowerCase();
    const expected = [
        "node",
        proofRunnerRelativePath,
        `test/proof/${slug}/run.mjs`,
        "--manifest",
        `test/proof/${slug}/manifest.json`,
    ];
    const actual = subject.split(" ");
    if (canonicalize(actual) !== canonicalize(expected)) {
        throw new Error(`gate subject is not the canonical ${waveId} proof argv`);
    }
    return {
        commandToken: actual[0],
        args: actual.slice(1),
        entrypointRelative: actual[2],
        manifestRelative: actual[4],
    };
}

export function resolveCommand(commandToken, environment = process.env) {
    if (commandToken.includes("/") || commandToken.includes("\\")) {
        throw new Error("gate command token must be a PATH-resolved basename");
    }
    for (const directory of (environment.PATH ?? "").split(delimiter)) {
        if (!directory) continue;
        const candidate = resolve(directory, commandToken);
        if (!existsSync(candidate)) continue;
        const resolved = realpathSync(candidate);
        if (statSync(resolved).isFile()) return resolved;
    }
    throw new Error(`cannot resolve gate executable ${commandToken}`);
}

export function liveGateEnvironment(environment = process.env) {
    const live = {
        CI: "1",
        FORCE_COLOR: "0",
        HOME: environment.HOME ?? "",
        LANG: environment.LANG ?? "C",
        LC_ALL: environment.LC_ALL ?? "",
        NODE: process.execPath,
        NO_COLOR: "1",
        PATH: environment.PATH ?? "",
        TERM: "dumb",
        TMPDIR: environment.TMPDIR ?? "",
        TZ: "UTC",
    };
    const keys = Object.keys(live).sort();
    if (canonicalize(keys) !== canonicalize(proofEnvironmentKeys)) {
        throw new Error("proof environment projection differs from its exact allowlist");
    }
    return Object.freeze(live);
}

export function proofRunnerEnvironment(environment = process.env) {
    const proofEnvironment = liveGateEnvironment(environment);
    return Object.freeze({
        ...proofEnvironment,
        [proofEnvironmentCarrierKey]: canonicalize(proofEnvironment),
    });
}

export function gateEnvironmentSha256(environment = process.env) {
    const live = liveGateEnvironment(environment);
    return sha256(canonicalize(live));
}

export function proofManifestPath(cwd, manifestRelative) {
    if (isAbsolute(manifestRelative)) throw new Error("proof manifest must be repository-relative");
    const root = realpathSync(cwd);
    const path = resolve(root, manifestRelative);
    const fromRoot = relative(root, path);
    if (fromRoot.startsWith("..") || isAbsolute(fromRoot)) throw new Error("proof manifest escapes gate cwd");
    return path;
}

function untrackedEntry(root, relativePath) {
    const path = resolve(root, relativePath);
    const fromRoot = relative(root, path);
    if (fromRoot.startsWith("..") || isAbsolute(fromRoot)) throw new Error(`untracked path escapes repository: ${relativePath}`);
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) {
        const target = readlinkSync(path);
        return { path: relativePath, kind: "symlink", sha256: sha256(target) };
    }
    if (!stat.isFile()) throw new Error(`untracked repository entry is not a file: ${relativePath}`);
    return { path: relativePath, kind: "file", sha256: fileSha256(path) };
}

export function repositoryStateSha256(path, { identityRoot } = {}) {
    const root = realpathSync(path);
    const stateRoot = identityRoot ?? root;
    const options = { encoding: null, maxBuffer: 128 * 1024 * 1024 };
    const head = execFileSync("git", ["-C", root, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    const diff = execFileSync("git", ["-C", root, "diff", "--binary", "HEAD", "--"], options);
    const untrackedOutput = execFileSync(
        "git",
        ["-C", root, "ls-files", "--others", "--exclude-standard", "-z"],
        options,
    );
    const untracked = untrackedOutput
        .toString("utf8")
        .split("\0")
        .filter(Boolean)
        .sort()
        .map((relativePath) => untrackedEntry(root, relativePath));
    const submodules = execFileSync(
        "git",
        ["-C", root, "submodule", "status", "--recursive"],
        { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
    ).trim().split("\n").filter(Boolean);
    return sha256(canonicalize({
        schema: "vnext-repository-state/1",
        root: stateRoot,
        head,
        diff_sha256: sha256(diff),
        untracked,
        submodules,
    }));
}
