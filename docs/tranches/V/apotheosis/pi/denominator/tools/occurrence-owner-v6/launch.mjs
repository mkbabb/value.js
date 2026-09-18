import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { relative, resolve, sep } from "node:path";

const LAUNCHER_PATH = "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/launch.mjs";
const CORE_PATH = "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/core.mjs";
const EXPECTED_MODULES = Object.freeze([
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/core.mjs", 11308, "79ec4e1d2661f9704be9ee1e998e3801c43a1b63e4fb97e63fcc19e50a817122"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/discover.mjs", 30613, "6a10db53beafa776e79714e9b73554328374a2b24370c9641b60d1ac9fafaff3"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/evidence.mjs", 18162, "9bdf3b4c43b353c6db51fe4547ddc792ec1d00ec4d64cf7c8b34933047be535a"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/fixtures.mjs", 12314, "889fd0570da3ecf82f672282dc43b7175acfd25948d60ac2259f033f61794cde"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/mutations.mjs", 9060, "55d6472602682eee0f7c34f03d9439a1865a93c361e78e87f14d597a6084e5a2"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/shared.mjs", 6089, "1f01aa6fbc978323a84711974199c0a98fe689ee05b2797a11b730f520968beb"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/tables.mjs", 18724, "8e220d69c2604cf09a7342027b46ed09279ac5d906d6fe409004804da17aa039"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v6/verify.mjs", 26758, "683a5c89c4141dbaf82ebb21188542f145e5a06968b78588f5626316e62ec5de"],
]);
const EXPECTED_SCHEMAS = Object.freeze({
    manifest: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v6.schema.json", 11617, "b3a7131d643b469bdce4b1538ae1946d5cec19b970de71a2026078c9262f53ba"],
    shard: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v6-shard.schema.json", 13811, "23eaa9f7f7895c4c7c47005e56f06300cf4097a4b3d8ccbbd61c332e15c6dc48"],
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
