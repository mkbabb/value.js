import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { relative, resolve, sep } from "node:path";

const LAUNCHER_PATH = "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v7/launch.mjs";
const CORE_PATH = "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v7/core.mjs";
const EXPECTED_MODULES = Object.freeze([
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v7/core.mjs", 11342, "573c1538b5e367a63676eae930d35fe43bfdbbcb4d5c8535d9ba0cec861efc31"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v7/discover.mjs", 32893, "ae1eded1a7321ccf7401faaf42fe20921f9b7d16dbf791573c341fa69400f09d"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v7/evidence.mjs", 20082, "0ce80e14a41f16552b15227e84f8b0dfa82825c9c1083481663124d2665f9ce0"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v7/fixtures.mjs", 14775, "9c77c74fb5c5e4830e632614d8d74250830fb64eb232eaa2cf21f630b1acbf8d"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v7/mutations.mjs", 10619, "580e3174fd561726692f0b304c0aa08b0670f9b019bd7cb2457f4073e8309244"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v7/shared.mjs", 6090, "72c998bb021004e9ffe4fdc21cad2cf74c644e0f0e446f5a9a5dda46ca029b7b"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v7/tables.mjs", 21057, "ada217a333d764c316b3d3d7168286f3d6183809c503082fd77c3e1ab4e008c8"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v7/verify.mjs", 29644, "f6d80f95e1250e23eb5ab65cc6ee0448059cc0f627d2fcaf286d142c1d45f8bf"],
]);
const EXPECTED_SCHEMAS = Object.freeze({
    manifest: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v7.schema.json", 12150, "5d6f288f56298b4ac0f12b2519eb32bfecf441da324d727b66b80ba743bbe656"],
    shard: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v7-shard.schema.json", 13812, "ae81a70365782c101b5cca2e41e7546b15c42d716f858c52063441dd19c11b20"],
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
