import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { relative, resolve, sep } from "node:path";

const LAUNCHER_PATH = "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/launch.mjs";
const CORE_PATH = "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/core.mjs";
const EXPECTED_MODULES = Object.freeze([
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/core.mjs", 10023, "9d7004ba711c07b7e31c715ca5397da2839507c868402f0ed5266b56ad40e7e3"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/discover.mjs", 22467, "0ed5fce2a5a286dc604bacb4ff290bf2e6acfb4b1fce3e6840f5f12d3d373d3b"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/evidence.mjs", 12983, "0c14d51e5bbc60119ce0beaa8b9d554d60477b84f6144630c86e6e20b21251d8"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/fixtures.mjs", 4233, "6627043b2a30dd36ddaba7c21ec5ec1fade3b33aa985f4861a5ccefd498db313"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/mutations.mjs", 5165, "4feb5e499811e192067e15e576891554a50e098c6de035c6b579aad307d96fd2"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/shared.mjs", 6074, "0cbf8ce8f0e16276ab57506e6e60052bb1cf3ef289a2cc7203e02bae3761afea"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/tables.mjs", 15977, "a2fffc19398bb0ad9ad2f273627e0a4b03987000c83e2ce275478f3a22d93210"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/verify.mjs", 22533, "3899d9a7ba24543faf25caa0a8123e2cc570b0e70e391d8be92f026d7a3387cd"],
]);
const EXPECTED_SCHEMAS = Object.freeze({
    manifest: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v4.schema.json", 10509, "a91edf2b2deff5412cfd2937b55118bb6685207c27a0ba4838423982ce6727d6"],
    shard: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v4-shard.schema.json", 13589, "386213aaee2086a74246a4307b65f7898c0ee77e080f5d78ecff8a293f4a9998"],
});
const EXPECTED_RUNTIME = Object.freeze({ node_version: "v26.0.0", exec_path: "/opt/homebrew/Cellar/node/26.0.0/bin/node", bytes: 68384, sha256: "08dad0581f00a0cabf4d49ec92ca1f25fdfd01c2c18fa8e92b35f04d4c24c164" });
const EXPECTED_VALIDATOR = Object.freeze({ name: "ajv", version: "8.20.0", package_tree_files: 466, package_tree_bytes: 1033496, package_tree_sha256: "7579d63704e7a482fe8ca868ae0bedbb2faaf796c4412110d083884ab6c21edc" });

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const byteSort = (left, right) => Buffer.from(String(left)).compare(Buffer.from(String(right)));

function identity(repoRoot, [repoRelativePath, expectedBytes, expectedHash]) {
    const bytes = readFileSync(resolve(repoRoot, repoRelativePath));
    if (bytes.length !== expectedBytes || sha256(bytes) !== expectedHash) throw new Error(`verify-before-execute failed: ${repoRelativePath}`);
    return { repo_relative_path: repoRelativePath, bytes: bytes.length, sha256: expectedHash };
}

function walk(root) {
    const files = [];
    for (const name of readdirSync(root).sort(byteSort)) {
        const path = resolve(root, name);
        const stat = statSync(path);
        if (stat.isDirectory()) files.push(...walk(path));
        else if (stat.isFile()) files.push(path);
    }
    return files;
}

function validatorAttestation(repoRoot) {
    const root = resolve(repoRoot, "node_modules/ajv-formats/node_modules/ajv");
    const files = walk(root);
    let bytes = 0;
    let record = "";
    for (const path of files) {
        const content = readFileSync(path);
        const exactPath = relative(root, path).split(sep).join("/");
        bytes += content.length;
        record += `${exactPath}\0${sha256(content)}\0${content.length}\n`;
    }
    const version = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")).version;
    const actual = { name: "ajv", version, package_tree_files: files.length, package_tree_bytes: bytes, package_tree_sha256: sha256(Buffer.from(record, "utf8")) };
    if (JSON.stringify(actual) !== JSON.stringify(EXPECTED_VALIDATOR)) throw new Error("verify-before-execute failed: Ajv package tree identity");
    return actual;
}

function runtimeAttestation() {
    const binary = readFileSync(process.execPath);
    const actual = { node_version: process.version, exec_path: process.execPath, bytes: binary.length, sha256: sha256(binary) };
    if (JSON.stringify(actual) !== JSON.stringify(EXPECTED_RUNTIME)) throw new Error("verify-before-execute failed: Node runtime identity");
    return actual;
}

async function launch() {
    const repoRoot = process.cwd();
    const expectedLauncher = resolve(repoRoot, LAUNCHER_PATH);
    if (fileURLToPath(import.meta.url) !== expectedLauncher) throw new Error("launcher must execute from its canonical repository path");
    const launcherBytes = readFileSync(expectedLauncher);
    const executedModules = EXPECTED_MODULES.map((row) => identity(repoRoot, row));
    const moduleRecord = executedModules.map((row) => `${row.repo_relative_path}\0${row.sha256}\0${row.bytes}\n`).join("");
    const attestation = {
        launcher: { repo_relative_path: LAUNCHER_PATH, bytes: launcherBytes.length, sha256: sha256(launcherBytes) },
        executed_modules: executedModules,
        module_set_sha256: sha256(Buffer.from(moduleRecord, "utf8")),
        schemas: { manifest: identity(repoRoot, EXPECTED_SCHEMAS.manifest), shard: identity(repoRoot, EXPECTED_SCHEMAS.shard) },
        runtime: runtimeAttestation(),
        validator: validatorAttestation(repoRoot),
    };
    const module = await import(pathToFileURL(resolve(repoRoot, CORE_PATH)).href);
    await module.main(attestation);
}

await launch();
