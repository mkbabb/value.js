#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import {
    computeModuleGraphs,
    currentPackageExportNodes,
    fileSha256,
    gitIdentity,
    hashWithout,
    inspectSnapshot,
    isColocatedTest,
    readStrictJson,
    requireCanonicalFile,
    requireGitTopLevel,
    same,
    sha256,
    walkRegularFiles,
} from "./keyframes-contract.mjs";
import { canonicalDemoTextLoaderPath, validateCanonicalDemoTextLoader } from "./keyframes-proof-contract.mjs";

const contractRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let inventoryPath;
let mode;
const usage = "usage: node validate-keyframes-current-inventory.mjs --inventory <path> (--capture|--replay)\n";
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--inventory" && process.argv[index + 1]) inventoryPath = resolve(process.argv[++index]);
    else if (process.argv[index] === "--capture" && !mode) mode = "capture";
    else if (process.argv[index] === "--replay" && !mode) mode = "replay";
    else {
        process.stderr.write(usage);
        process.exit(2);
    }
}
if (!inventoryPath || !mode) {
    process.stderr.write(usage);
    process.exit(2);
}

const failures = [];
const fail = (message) => failures.push(message);
let inventory;
try {
    inventory = readStrictJson(inventoryPath, "/inventory");
    const schema = readStrictJson(resolve(contractRoot, "keyframes-current-inventory.schema.json"), "/schema");
    failures.push(...validateJsonSchema(inventory, schema));
} catch (error) {
    fail(`/inventory: ${error.message}`);
}

let snapshot;
let replayCrater;
let authorityRoot;
let expectedNodes = [];
let computedGraphs;
if (inventory) {
    const inventoryHash = hashWithout(inventory, "inventory_hash");
    if (inventory.inventory_hash !== inventoryHash) fail(`/inventory_hash: computed ${inventoryHash}`);

    try {
        snapshot = inspectSnapshot(inventory.snapshot?.path);
        if (inventory.snapshot.file_sha256 !== snapshot.sha256) fail(`/snapshot/file_sha256: computed ${snapshot.sha256}`);
        const filesHash = sha256(canonicalize(snapshot.files));
        if (inventory.snapshot.files_sha256 !== filesHash) fail(`/snapshot/files_sha256: computed ${filesHash}`);
    } catch (error) {
        fail(`/snapshot: ${error.message}`);
    }

    try {
        if (mode === "capture") {
            authorityRoot = inventory.repository?.path;
            requireGitTopLevel(authorityRoot);
            const live = gitIdentity(authorityRoot);
            for (const member of ["branch", "head", "dirty_sha256"]) {
                if (inventory.repository?.[member] !== live[member]) fail(`/repository/${member}: live ${live[member]}`);
            }
        } else if (snapshot) {
            replayCrater = realpathSync(mkdtempSync(join(tmpdir(), "vnext-keyframes-replay-")));
            execFileSync("/usr/bin/tar", ["-xzf", inventory.snapshot.path, "-C", replayCrater]);
            authorityRoot = realpathSync(join(replayCrater, "snapshot"));
        }
    } catch (error) {
        fail(`/repository: ${error.message}`);
    }

    if (authorityRoot) {
        try {
            const sourceFiles = walkRegularFiles(authorityRoot, inventory.authority.source_root);
            const externalTests = walkRegularFiles(authorityRoot, inventory.authority.external_test_root);
            const support = inventory.authority.support_roots.flatMap((root) => walkRegularFiles(authorityRoot, root));
            const supportFiles = inventory.authority.support_files.map((path) => {
                const absolute = resolve(authorityRoot, path);
                requireCanonicalFile(absolute, `/authority/support_files/${path}`);
                const bytes = readFileSync(absolute);
                return { path, bytes: bytes.length, sha256: sha256(bytes) };
            });
            const seenPaths = new Set();
            const addFile = (kind, file) => {
                if (seenPaths.has(file.path)) throw new Error(`authority roots overlap at ${file.path}`);
                seenPaths.add(file.path);
                expectedNodes.push({ kind, id: file.path, ...file });
            };
            for (const file of sourceFiles) addFile(isColocatedTest(file.path) ? "test" : "source", file);
            for (const file of externalTests) addFile("test", file);
            for (const file of support) addFile("support", file);
            for (const file of supportFiles) addFile("support", file);

            const packagePath = resolve(authorityRoot, inventory.authority.package_manifest);
            requireCanonicalFile(packagePath, "/authority/package_manifest");
            const packageHash = fileSha256(packagePath);
            if (inventory.authority.package_manifest_sha256 !== packageHash) {
                fail(`/authority/package_manifest_sha256: computed ${packageHash}`);
            }
            if (inventory.scope === "library") {
                const packageManifest = parseJsonStrict(readFileSync(packagePath));
                expectedNodes.push(...currentPackageExportNodes(authorityRoot, packageManifest));
            }

            expectedNodes.sort((left, right) => compareCanonicalText(`${left.kind}\0${left.id}`, `${right.kind}\0${right.id}`));
            const returnedKeys = (inventory.nodes ?? []).map(({ kind, id }) => `${kind}\0${id}`);
            if (new Set(returnedKeys).size !== returnedKeys.length
                || !same(returnedKeys, [...returnedKeys].sort(compareCanonicalText))) {
                fail(`/nodes: exact unique kind/id canonical text order required`);
            }
            if (!same(inventory.nodes ?? [], expectedNodes)) {
                const expectedKeys = new Set(expectedNodes.map(({ kind, id }) => `${kind}\0${id}`));
                const returned = new Set(returnedKeys);
                const missing = [...expectedKeys].filter((key) => !returned.has(key));
                const extra = [...returned].filter((key) => !expectedKeys.has(key));
                fail(`/nodes: must exactly regenerate snapshot source/test/support/export truth; missing ${JSON.stringify(missing)}; extra ${JSON.stringify(extra)}`);
            }

            const closurePaths = [...new Set([inventory.authority.package_manifest, ...expectedNodes.map(({ path }) => path)])].sort(compareCanonicalText);
            const closure = closurePaths.map((path) => {
                const bytes = readFileSync(resolve(authorityRoot, path));
                return { path, bytes: bytes.length, sha256: sha256(bytes) };
            });
            if (!snapshot || !same(snapshot.files, closure)) {
                fail(`/snapshot: archive must contain every and only package/source/test/support/export backing byte`);
            }

            const expectedSupportPaths = expectedNodes.filter(({ kind }) => kind === "support").map(({ path }) => path);
            const exceptions = inventory.support_exceptions ?? [];
            const exceptionPaths = exceptions.map(({ path }) => path);
            if (new Set(exceptionPaths).size !== exceptionPaths.length || !same(exceptionPaths, [...exceptionPaths].sort(compareCanonicalText))) {
                fail(`/support_exceptions: exact unique path canonical text order required`);
            }
            if (!same(exceptionPaths, expectedSupportPaths)) {
                fail(`/support_exceptions: one typed row is required for every and only support-root file`);
            }
            for (const [index, row] of exceptions.entries()) {
                const expectedClass = row.path === canonicalDemoTextLoaderPath ? "tool"
                    : row.path === "bench" || row.path.startsWith("bench/")
                    ? "benchmark"
                    : row.path.startsWith("proof/fixtures/") ? "fixture"
                        : row.path.startsWith("proof/tools/") ? "tool" : "proof";
                if (row.class !== expectedClass) fail(`/support_exceptions/${index}/class: expected ${expectedClass}`);
                if (row.owner_wave_id !== inventory.wave_id) fail(`/support_exceptions/${index}/owner_wave_id: expected ${inventory.wave_id}`);
            }
            if (inventory.scope === "demo") {
                validateCanonicalDemoTextLoader(resolve(authorityRoot, canonicalDemoTextLoaderPath));
            }

            const graphPaths = [...new Set(expectedNodes.map(({ path }) => path))];
            computedGraphs = computeModuleGraphs(authorityRoot, graphPaths);
            if (!same(inventory.graphs, computedGraphs)) fail(`/graphs: must exactly regenerate runtime and type-inclusive import graphs`);
        } catch (error) {
            fail(`/authority: ${error.message}`);
        }
    }
}

if (replayCrater) rmSync(replayCrater, { recursive: true, force: true });
if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const truth = {
    inventory: {
        path: inventoryPath,
        file_sha256: fileSha256(inventoryPath),
        inventory_hash: inventory.inventory_hash,
    },
    snapshot: inventory.snapshot,
    wave_id: inventory.wave_id,
    scope: inventory.scope,
    repository: inventory.repository,
    counts: Object.fromEntries(["source", "test", "support", "export"].map((kind) => [kind, expectedNodes.filter((node) => node.kind === kind).length])),
    graph_hashes: {
        runtime: computedGraphs.runtime.graph_hash,
        type: computedGraphs.type.graph_hash,
    },
};
const receipt = {
    schema: "vnext-keyframes-current-inventory-validation/1",
    mode,
    ...truth,
    truth_hash: sha256(canonicalize(truth)),
    receipt_hash: "",
};
receipt.receipt_hash = hashWithout(receipt, "receipt_hash");
process.stdout.write(`${JSON.stringify(receipt)}\n`);
