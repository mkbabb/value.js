import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { relative, resolve, sep } from "node:path";

const LAUNCHER_PATH = "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/launch.mjs";
const CORE_PATH = "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/core.mjs";
const EXPECTED_MODULES = Object.freeze([
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/core.mjs", 10023, "96b8d71b62e148daac85b21bcb946e553e1b4131109c4689e2d1548eb6c3b898"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/discover.mjs", 24633, "2834fc241ba08187dde49bb4aea2052df1d34f926d9b78e00c44cf7c22565d1a"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/evidence.mjs", 16468, "5d508ca5d8d321751669679d2264ee21a2bdacb7c36b21c3d0d409bab011a399"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/fixtures.mjs", 7595, "76cf5accb83b78ad6f255cdfbee2d91282c109f6d8470391c3426ed790a5384b"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/mutations.mjs", 6722, "a218347226506d34dfac031e269f255c950582caeb7208811311e4e0851db787"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/shared.mjs", 6075, "4dc0bd88d7a27deaba85eb90ddbcbb3d22e69745a3c4430514ac54f988537622"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/tables.mjs", 15923, "5a4aa0fd147ae1b24bdde5150e877d93244802dfee233569271dba97174fedc1"],
    ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/verify.mjs", 23344, "b34c341d85ea6094c9cc34a231e7b2edd5182968993713e4fa6a8113eaf0bd3d"],
]);
const EXPECTED_SCHEMAS = Object.freeze({
    manifest: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v5.schema.json", 10510, "e406bf06bcb06535a1e015b209d1c9c85c14485c3dd7f88be5cbec936c1a6a8e"],
    shard: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v5-shard.schema.json", 13590, "9e688ecd62e939679898ffb2201c4fb64443d74cb7e5f212670e705c7da0a5b2"],
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
