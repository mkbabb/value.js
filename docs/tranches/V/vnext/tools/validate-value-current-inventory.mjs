#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";

const contractRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let inventoryPath;
let mode = "live";
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--inventory" && process.argv[index + 1]) inventoryPath = resolve(process.argv[++index]);
    else if (process.argv[index] === "--mode" && ["live", "replay"].includes(process.argv[index + 1])) mode = process.argv[++index];
    else {
        process.stderr.write("usage: node validate-value-current-inventory.mjs --inventory <path> [--mode live|replay]\n");
        process.exit(2);
    }
}
if (!inventoryPath) {
    process.stderr.write("usage: node validate-value-current-inventory.mjs --inventory <path> [--mode live|replay]\n");
    process.exit(2);
}

const failures = [];
const fail = (message) => failures.push(message);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const fileHash = (path) => sha256(readFileSync(path));
const ts = createRequire(import.meta.url)("typescript");
const nodeExtensions = [".cjs", ".cts", ".js", ".jsx", ".mjs", ".mts", ".ts", ".tsx"];
const extensionSet = new Set(nodeExtensions);

function canonicalRegularFile(path, pointer) {
    if (!existsSync(path)) {
        fail(`${pointer}: missing regular file ${path}`);
        return false;
    }
    const metadata = lstatSync(path);
    if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(path) !== path) {
        fail(`${pointer}: canonical regular non-symlink file required ${path}`);
        return false;
    }
    return true;
}

function canonicalDirectory(path, pointer) {
    if (!existsSync(path)) {
        fail(`${pointer}: missing directory ${path}`);
        return false;
    }
    const metadata = lstatSync(path);
    if (!metadata.isDirectory() || metadata.isSymbolicLink() || realpathSync(path) !== path) {
        fail(`${pointer}: canonical real non-symlink directory required ${path}`);
        return false;
    }
    return true;
}

function inside(root, path) {
    const result = relative(root, path);
    return result === "" || (!result.startsWith(`..${sep}`) && result !== ".." && !isAbsolute(result));
}

function listNodeFiles(repositoryRoot, relativeRoot, pointer) {
    const absoluteRoot = resolve(repositoryRoot, relativeRoot);
    if (!canonicalDirectory(absoluteRoot, pointer)) return [];
    const result = [];
    const walk = (directory) => {
        for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => compareCanonicalText(left.name, right.name))) {
            const path = resolve(directory, entry.name);
            const itemPointer = `${pointer}/${relative(repositoryRoot, path).split(sep).join("/")}`;
            if (entry.isSymbolicLink()) {
                fail(`${itemPointer}: symlink is forbidden in an inventoried root`);
                continue;
            }
            if (entry.isDirectory()) walk(path);
            else if (entry.isFile()) {
                if (extensionSet.has(extname(entry.name).toLocaleLowerCase("en-US"))) result.push(path);
            } else fail(`${itemPointer}: non-regular filesystem entry is forbidden`);
        }
    };
    walk(absoluteRoot);
    return result.sort(compareCanonicalText);
}

function listSnapshotFiles(snapshotRoot) {
    if (!canonicalDirectory(snapshotRoot, "/snapshot/root")) return [];
    const result = [];
    const walk = (directory) => {
        for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => compareCanonicalText(left.name, right.name))) {
            const path = resolve(directory, entry.name);
            const itemPointer = `/snapshot/${relative(snapshotRoot, path).split(sep).join("/")}`;
            if (entry.isSymbolicLink()) fail(`${itemPointer}: symlink is forbidden in the immutable snapshot`);
            else if (entry.isDirectory()) walk(path);
            else if (entry.isFile()) result.push(path);
            else fail(`${itemPointer}: non-regular filesystem entry is forbidden`);
        }
    };
    walk(snapshotRoot);
    return result.sort(compareCanonicalText);
}

function packageTargets(value, specifier) {
    if (typeof value === "string") return { runtime: value };
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        fail(`/authority/package_manifest/exports/${specifier}: string or condition object required`);
        return {};
    }
    const types = typeof value.types === "string" ? value.types : undefined;
    const runtime = [value.import, value.default, value.require].find((candidate) => typeof candidate === "string");
    if (!types && !runtime) fail(`/authority/package_manifest/exports/${specifier}: types or import/default/require target required`);
    return { types, runtime };
}

function resolvedPackageFile(repositoryRoot, target, pointer) {
    if (typeof target !== "string") return undefined;
    if (!target.startsWith("./") || target.includes("\\") || target.split("/").includes("..")) {
        fail(`${pointer}: package target must be a bounded ./ relative path`);
        return undefined;
    }
    const path = resolve(repositoryRoot, target);
    if (!inside(repositoryRoot, path) || !canonicalRegularFile(path, pointer)) return undefined;
    return path;
}

function exportedNames(entryPaths) {
    if (!entryPaths.length) return new Map();
    const program = ts.createProgram({
        rootNames: entryPaths,
        options: {
            allowJs: true,
            checkJs: false,
            module: ts.ModuleKind.NodeNext,
            moduleResolution: ts.ModuleResolutionKind.NodeNext,
            noEmit: true,
            skipLibCheck: true,
            target: ts.ScriptTarget.ESNext,
        },
    });
    for (const diagnostic of program.getSyntacticDiagnostics()) {
        const source = diagnostic.file?.fileName ?? "<package-entry>";
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, " ");
        fail(`/authority/package_manifest/exports: TypeScript syntax diagnostic in ${source}: ${message}`);
    }
    const checker = program.getTypeChecker();
    const result = new Map();
    for (const path of entryPaths) {
        const source = program.getSourceFile(path);
        const module = source && checker.getSymbolAtLocation(source);
        if (!module) {
            fail(`/authority/package_manifest/exports: cannot resolve module exports for ${path}`);
            result.set(path, []);
            continue;
        }
        result.set(path, checker.getExportsOfModule(module).map(({ name }) => name).sort(compareCanonicalText));
    }
    return result;
}

let inventory;
try {
    if (canonicalRegularFile(inventoryPath, "/inventory")) inventory = parseJsonStrict(readFileSync(inventoryPath));
    const schema = parseJsonStrict(readFileSync(resolve(contractRoot, "value-current-inventory.schema.json")));
    if (inventory) failures.push(...validateJsonSchema(inventory, schema));
} catch (error) {
    fail(`/inventory: ${error.message}`);
}

let expectedNodes = [];
let repositoryRoot;
let snapshotRoot;
let packageManifest;
if (inventory) {
    const preimage = structuredClone(inventory);
    delete preimage.inventory_hash;
    const computedInventoryHash = sha256(canonicalize(preimage));
    if (inventory.inventory_hash !== computedInventoryHash) fail(`/inventory_hash: computed ${computedInventoryHash}`);

    const candidateRoot = inventory.repository?.path;
    if (mode === "live" && typeof candidateRoot === "string" && canonicalDirectory(candidateRoot, "/repository/path")) repositoryRoot = candidateRoot;
    else if (mode === "replay" && typeof candidateRoot === "string") repositoryRoot = candidateRoot;
    const candidateSnapshot = inventory.snapshot?.root;
    if (typeof candidateSnapshot === "string" && canonicalDirectory(candidateSnapshot, "/snapshot/root")) snapshotRoot = candidateSnapshot;
    let snapshotFiles = [];
    if (snapshotRoot) {
        snapshotFiles = listSnapshotFiles(snapshotRoot).map((path) => ({
            path: relative(snapshotRoot, path).split(sep).join("/"),
            sha256: fileHash(path),
        }));
        const snapshotKeys = (inventory.snapshot?.files ?? []).map(({ path }) => path);
        if (new Set(snapshotKeys).size !== snapshotKeys.length || canonicalize(snapshotKeys) !== canonicalize([...snapshotKeys].sort(compareCanonicalText))) {
            fail(`/snapshot/files: paths must be unique and canonically ordered`);
        }
        if (canonicalize(inventory.snapshot?.files ?? []) !== canonicalize(snapshotFiles)) {
            fail(`/snapshot/files: must exactly enumerate immutable snapshot regular files`);
        }
        const filesHash = sha256(canonicalize(snapshotFiles));
        if (inventory.snapshot?.files_sha256 !== filesHash) fail(`/snapshot/files_sha256: computed ${filesHash}`);
    }
    const contentRoot = mode === "live" ? repositoryRoot : snapshotRoot;
    if (contentRoot) {
        if (mode === "live") {
        try {
            const gitRoot = realpathSync(execFileSync("git", ["-C", repositoryRoot, "rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim());
            if (gitRoot !== repositoryRoot) fail(`/repository/path: must be the exact Git repository root ${gitRoot}`);
            const head = execFileSync("git", ["-C", repositoryRoot, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
            const branch = execFileSync("git", ["-C", repositoryRoot, "rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" }).trim();
            const dirty = sha256(execFileSync("git", ["-C", repositoryRoot, "status", "--porcelain=v1", "-z", "--untracked-files=all"]));
            if (inventory.repository.head !== head) fail(`/repository/head: live ${head}`);
            if (inventory.repository.branch !== branch) fail(`/repository/branch: live ${branch}`);
            if (inventory.repository.dirty_sha256 !== dirty) fail(`/repository/dirty_sha256: live ${dirty}`);
        } catch (error) {
            fail(`/repository: live Git identity failed: ${error.message}`);
        }
        }

        const exclusionRows = inventory.test_exclusions ?? [];
        const exclusionKeys = exclusionRows.map(({ path }) => path);
        if (new Set(exclusionKeys).size !== exclusionKeys.length || canonicalize(exclusionKeys) !== canonicalize([...exclusionKeys].sort(compareCanonicalText))) {
            fail(`/test_exclusions: paths must be unique and canonically ordered`);
        }
        const exclusions = new Map();
        for (const [index, row] of exclusionRows.entries()) {
            const path = resolve(contentRoot, row.path);
            if (!inside(resolve(contentRoot, inventory.authority?.test_root ?? ""), path)) {
                fail(`/test_exclusions/${index}/path: exclusion must live below the exact test root`);
                continue;
            }
            if (!canonicalRegularFile(path, `/test_exclusions/${index}/path`)) continue;
            const actual = fileHash(path);
            if (row.sha256 !== actual) fail(`/test_exclusions/${index}/sha256: computed ${actual}`);
            exclusions.set(path, row);
        }
        for (const [kind, relativeRoot] of [["source", inventory.authority?.source_root], ["test", inventory.authority?.test_root]]) {
            for (const path of listNodeFiles(contentRoot, relativeRoot, `/${kind}`)) {
                if (kind === "test" && exclusions.has(path)) continue;
                const relativePath = relative(contentRoot, path).split(sep).join("/");
                expectedNodes.push({ kind, id: relativePath, path: relativePath, sha256: fileHash(path) });
            }
        }
        for (const [index, row] of exclusionRows.entries()) {
            const path = resolve(contentRoot, row.path);
            if (!extensionSet.has(extname(path).toLocaleLowerCase("en-US"))) {
                fail(`/test_exclusions/${index}/path: exclusion must name an otherwise inventoried test module`);
            }
        }

        const packagePath = resolve(contentRoot, inventory.authority?.package_manifest ?? "");
        if (canonicalRegularFile(packagePath, "/authority/package_manifest")) {
            const packageBytes = readFileSync(packagePath);
            if (inventory.authority.package_manifest_sha256 !== sha256(packageBytes)) {
                fail(`/authority/package_manifest_sha256: computed ${sha256(packageBytes)}`);
            }
            try {
                packageManifest = parseJsonStrict(packageBytes);
            } catch (error) {
                fail(`/authority/package_manifest: strict JSON parse failed: ${error.message}`);
            }
        }
        if (packageManifest) {
            if (packageManifest.name !== "@mkbabb/value.js") fail(`/authority/package_manifest/name: expected @mkbabb/value.js`);
            const exportsObject = packageManifest.exports;
            if (!exportsObject || typeof exportsObject !== "object" || Array.isArray(exportsObject)) {
                fail(`/authority/package_manifest/exports: exact subpath object required`);
            } else {
                const entries = [];
                for (const specifier of Object.keys(exportsObject).sort(compareCanonicalText)) {
                    const targets = packageTargets(exportsObject[specifier], specifier);
                    const types = resolvedPackageFile(contentRoot, targets.types, `/authority/package_manifest/exports/${specifier}/types`);
                    const runtime = resolvedPackageFile(contentRoot, targets.runtime, `/authority/package_manifest/exports/${specifier}/runtime`);
                    entries.push({ specifier, types, runtime });
                }
                const exportNames = exportedNames([...new Set(entries.flatMap(({ types, runtime }) => [types, runtime]).filter(Boolean))]);
                for (const { specifier, types, runtime } of entries) {
                    const runtimeNames = new Set(exportNames.get(runtime) ?? []);
                    const typeNames = new Set(exportNames.get(types) ?? []);
                    if (!runtimeNames.size && !typeNames.size) fail(`/authority/package_manifest/exports/${specifier}: entry exports no named surface`);
                    for (const symbol of [...runtimeNames].sort(compareCanonicalText)) {
                        const path = relative(contentRoot, runtime).split(sep).join("/");
                        expectedNodes.push({
                            kind: "export",
                            id: `${specifier}#${symbol}:runtime`,
                            path,
                            sha256: fileHash(runtime),
                            specifier,
                            symbol,
                            surface: "runtime",
                        });
                    }
                    for (const symbol of [...typeNames].filter((name) => !runtimeNames.has(name)).sort(compareCanonicalText)) {
                        const path = relative(contentRoot, types).split(sep).join("/");
                        expectedNodes.push({
                            kind: "export",
                            id: `${specifier}#${symbol}:type`,
                            path,
                            sha256: fileHash(types),
                            specifier,
                            symbol,
                            surface: "type",
                        });
                    }
                }
            }
        }
        if (snapshotRoot) {
            const requiredSnapshotPaths = new Set([
                inventory.authority.package_manifest,
                ...(inventory.nodes ?? []).map(({ path }) => path),
                ...(inventory.test_exclusions ?? []).map(({ path }) => path),
            ]);
            const actualSnapshotPaths = new Set(snapshotFiles.map(({ path }) => path));
            const missing = [...requiredSnapshotPaths].filter((path) => !actualSnapshotPaths.has(path)).sort(compareCanonicalText);
            const extra = [...actualSnapshotPaths].filter((path) => !requiredSnapshotPaths.has(path)).sort(compareCanonicalText);
            if (missing.length || extra.length) {
                fail(`/snapshot/files: exact capture closure differs; missing ${JSON.stringify(missing)}; extra ${JSON.stringify(extra)}`);
            }
            if (mode === "live") {
                for (const row of snapshotFiles) {
                    const livePath = resolve(repositoryRoot, row.path);
                    if (!canonicalRegularFile(livePath, `/snapshot/live/${row.path}`)) continue;
                    const liveHash = fileHash(livePath);
                    if (liveHash !== row.sha256) fail(`/snapshot/live/${row.path}: snapshot bytes differ from V00A live capture`);
                }
            }
        }
    }

    expectedNodes.sort((left, right) => compareCanonicalText(left.kind, right.kind) || compareCanonicalText(left.id, right.id));
    const returnedKeys = (inventory.nodes ?? []).map(({ kind, id }) => `${kind}\0${id}`);
    if (new Set(returnedKeys).size !== returnedKeys.length || canonicalize(returnedKeys) !== canonicalize([...returnedKeys].sort(compareCanonicalText))) {
        fail(`/nodes: exact unique kind/id canonical text order required`);
    }
    if (canonicalize(inventory.nodes ?? []) !== canonicalize(expectedNodes)) {
        const actual = new Set(returnedKeys);
        const expected = new Set(expectedNodes.map(({ kind, id }) => `${kind}\0${id}`));
        const missing = [...expected].filter((item) => !actual.has(item));
        const extra = [...actual].filter((item) => !expected.has(item));
        fail(`/nodes: must exactly regenerate live source/test/packed-export inventory; missing ${JSON.stringify(missing)}; extra ${JSON.stringify(extra)}`);
    }
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const receipt = {
    schema: "vnext-value-current-inventory-validation/1",
    mode,
    inventory_path: inventoryPath,
    inventory_file_sha256: fileHash(inventoryPath),
    inventory_hash: inventory.inventory_hash,
    repository: {
        path: inventory.repository.path,
        branch: inventory.repository.branch,
        head: inventory.repository.head,
        dirty_sha256: inventory.repository.dirty_sha256,
    },
    snapshot: {
        root: snapshotRoot,
        files_sha256: inventory.snapshot.files_sha256,
    },
    counts: {
        source: expectedNodes.filter(({ kind }) => kind === "source").length,
        test: expectedNodes.filter(({ kind }) => kind === "test").length,
        export: expectedNodes.filter(({ kind }) => kind === "export").length,
        excluded_test: inventory.test_exclusions.length,
    },
    nodes_sha256: sha256(canonicalize(expectedNodes)),
};
receipt.receipt_hash = sha256(canonicalize(receipt));
process.stdout.write(`${JSON.stringify(receipt)}\n`);
