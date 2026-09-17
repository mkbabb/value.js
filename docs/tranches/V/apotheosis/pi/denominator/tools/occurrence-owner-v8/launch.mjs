import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { relative, resolve, sep } from "node:path";
import { getHeapStatistics } from "node:v8";

const LAUNCHER_PATH = "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/launch.mjs";
const CORE_PATH = "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/core.mjs";
const EXPECTED_MODULES = Object.freeze([
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/core.mjs", 12128, "d65ef6d8f273ce1bc5a114cb3e090ccd067b10c264566d03c46754117a159d51"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/discover.mjs", 39999, "684ddc0f7b90e018cf7f67d98d9b117df9245e4fc2006263358fb6ef4560b478"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/evidence.mjs", 22080, "d4aacb75a81d9af1fe3945e5bafdddd3e4ab705a1c904760923df3c9a49af980"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/fixtures.mjs", 22402, "3c5926b4911b0826fe86d4252aa93110083c22744bd2ffb4de5b3dd45d3ebc0a"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/lexical.mjs", 9862, "d302c26525920ee244f0fa81d864b7448c85e87094c34b7e947fbe5f4f8335e3"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/mutations.mjs", 12261, "91586e518826f429be294d9f3e85e8b5e5e1db9516f384c50f357ff7cfece803"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/shared.mjs", 6089, "9c51eb861440f314d3b168ba7aa8a28ca6cbeea2f8736f21e9786ceb17c9ce27"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/tables.mjs", 26243, "dfc94801ae0fb155a483305cccddebb215cf5d0086e7df7cb1120b7d0c97d783"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/verify.mjs", 37119, "06722073719b6c7226cf34dd2300e008d7639c1ffb0a5267224dcf1c2bc4fc33"],
]);
const EXPECTED_SCHEMAS = Object.freeze({
    manifest: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v8.schema.json", 13705, "aa7acb7c0cc7fd1a1f419b88b309dec24b17d07a7088ee2b43650a5b8743165f"],
    shard: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v8-shard.schema.json", 15103, "5453b761d952c3d06d0932389ef8bd8330155a92afc4d40c52d6a39d1bc21122"],
});
const EXPECTED_RUNTIME = Object.freeze({ node_version: "v26.0.0", exec_path: "/opt/homebrew/Cellar/node/26.0.0/bin/node", exec_argv: ["--max-old-space-size=650"], heap_size_limit_bytes: 782237696, bytes: 68384, sha256: "08dad0581f00a0cabf4d49ec92ca1f25fdfd01c2c18fa8e92b35f04d4c24c164" });
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
    const actual = { node_version: process.version, exec_path: process.execPath, exec_argv: process.execArgv, heap_size_limit_bytes: getHeapStatistics().heap_size_limit, bytes: binary.length, sha256: sha256(binary) };
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
