#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

import { canonicalize } from "./json-contract.mjs";

const validator = resolve(new URL("validate-value-current-inventory.mjs", import.meta.url).pathname);
const fixture = realpathSync(mkdtempSync(join(tmpdir(), "vnext-value-current-inventory-")));
const repository = join(fixture, "repository");
const failures = [];
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const fileHash = (path) => sha256(readFileSync(path));
const write = (path, bytes) => {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, bytes);
};
const writeJson = (path, value) => write(path, `${JSON.stringify(value, null, 2)}\n`);
const selfHash = (value, member) => {
    const preimage = structuredClone(value);
    delete preimage[member];
    return sha256(canonicalize(preimage));
};
const git = (...args) => execFileSync("git", ["-C", repository, ...args], { encoding: "utf8" }).trim();

function finalized(value) {
    value.inventory_hash = selfHash(value, "inventory_hash");
    return value;
}

function run(name, inventory, mode = "live") {
    const path = join(fixture, `${name}.json`);
    finalized(inventory);
    writeJson(path, inventory);
    return spawnSync(process.execPath, [validator, "--inventory", path, "--mode", mode], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
}

function reject(name, base, mutate, fragment) {
    const value = structuredClone(base);
    mutate(value);
    const result = run(name, value);
    if (result.status === 0 || !result.stderr.includes(fragment)) {
        failures.push(`${name} did not reject ${fragment}: ${result.stderr}${result.stdout}`);
    }
}

try {
    mkdirSync(repository, { recursive: true });
    execFileSync("git", ["init", "--initial-branch=fixture", repository], { stdio: "ignore" });
    git("config", "user.email", "fixture@example.invalid");
    git("config", "user.name", "Fixture");

    const packagePath = join(repository, "package.json");
    const packageManifest = {
        name: "@mkbabb/value.js",
        version: "0.0.0-fixture",
        type: "module",
        exports: {
            "./color": {
                types: "./dist/color.d.ts",
                import: "./dist/color.js",
            },
        },
    };
    writeJson(packagePath, packageManifest);
    write(join(repository, "src/a.b.ts"), "export const flat = 1;\n");
    write(join(repository, "src/a.ts"), "export const a = 1;\n");
    write(join(repository, "src/a/x.ts"), "export const nested = 1;\n");
    write(join(repository, "src/fold.ts"), "export const folded = 2;\n");
    write(join(repository, "test/a.test.ts"), "import { a } from '../src/a.js';\nvoid a;\n");
    write(join(repository, "test/demo-route.test.ts"), "export const demoOnly = true;\n");
    write(join(repository, "dist/color.d.ts"), "export interface ColorType { value: number }\nexport declare const colorX: number;\n");
    write(join(repository, "dist/color.js"), "export const colorX = 1;\n");
    git("add", ".");
    git("commit", "-m", "fixture");

    const snapshotRoot = join(fixture, "snapshot");
    const capturedPaths = [
        "dist/color.d.ts",
        "dist/color.js",
        "package.json",
        "src/a.b.ts",
        "src/a.ts",
        "src/a/x.ts",
        "src/fold.ts",
        "test/a.test.ts",
        "test/demo-route.test.ts",
    ];
    for (const path of capturedPaths) {
        const destination = join(snapshotRoot, path);
        mkdirSync(dirname(destination), { recursive: true });
        copyFileSync(join(repository, path), destination);
    }
    const snapshotFiles = capturedPaths.map((path) => ({ path, sha256: fileHash(join(snapshotRoot, path)) }));

    const base = {
        schema: "vnext-value-current-inventory/1",
        wave_id: "V00A",
        repository: {
            path: repository,
            branch: git("rev-parse", "--abbrev-ref", "HEAD"),
            head: git("rev-parse", "HEAD"),
            dirty_sha256: sha256(execFileSync("git", ["-C", repository, "status", "--porcelain=v1", "-z", "--untracked-files=all"])),
        },
        snapshot: {
            root: realpathSync(snapshotRoot),
            files: snapshotFiles,
            files_sha256: sha256(canonicalize(snapshotFiles)),
        },
        authority: {
            source_root: "src",
            test_root: "test",
            package_manifest: "package.json",
            node_extensions: [".cjs", ".cts", ".js", ".jsx", ".mjs", ".mts", ".ts", ".tsx"],
            package_manifest_sha256: fileHash(packagePath),
        },
        test_exclusions: [
            {
                path: "test/demo-route.test.ts",
                sha256: fileHash(join(repository, "test/demo-route.test.ts")),
                class: "demo",
                owner: "D00A",
                reason: "demo-owned current test is outside V29T's library-only transpose",
            },
        ],
        nodes: [
            { kind: "export", id: "./color#ColorType:type", path: "dist/color.d.ts", sha256: fileHash(join(repository, "dist/color.d.ts")), specifier: "./color", symbol: "ColorType", surface: "type" },
            { kind: "export", id: "./color#colorX:runtime", path: "dist/color.js", sha256: fileHash(join(repository, "dist/color.js")), specifier: "./color", symbol: "colorX", surface: "runtime" },
            { kind: "source", id: "src/a.b.ts", path: "src/a.b.ts", sha256: fileHash(join(repository, "src/a.b.ts")) },
            { kind: "source", id: "src/a.ts", path: "src/a.ts", sha256: fileHash(join(repository, "src/a.ts")) },
            { kind: "source", id: "src/a/x.ts", path: "src/a/x.ts", sha256: fileHash(join(repository, "src/a/x.ts")) },
            { kind: "source", id: "src/fold.ts", path: "src/fold.ts", sha256: fileHash(join(repository, "src/fold.ts")) },
            { kind: "test", id: "test/a.test.ts", path: "test/a.test.ts", sha256: fileHash(join(repository, "test/a.test.ts")) },
        ],
        inventory_hash: "",
    };

    const positive = run("positive", structuredClone(base));
    if (positive.status !== 0 || !positive.stdout.includes('"source":4') || !positive.stdout.includes('"export":2')) {
        failures.push(`positive inventory rejected: ${positive.stderr}${positive.stdout}`);
    }
    const replay = run("positive-replay", structuredClone(base), "replay");
    if (replay.status !== 0 || !replay.stdout.includes('"mode":"replay"')) {
        failures.push(`positive replay rejected: ${replay.stderr}${replay.stdout}`);
    }

    reject("missing-node", base, (value) => value.nodes.pop(), "must exactly regenerate");
    reject("extra-node", base, (value) => value.nodes.push({ kind: "test", id: "test/invented.test.ts", path: "test/invented.test.ts", sha256: "1".repeat(64) }), "must exactly regenerate");
    reject("wrong-node-hash", base, (value) => { value.nodes[2].sha256 = "2".repeat(64); }, "must exactly regenerate");
    reject("wrong-head", base, (value) => { value.repository.head = "3".repeat(40); }, "/repository/head");
    reject("missing-export", base, (value) => value.nodes.shift(), "must exactly regenerate");
    reject("forged-export-id", base, (value) => { value.nodes[0].id = "./color#forged:type"; }, "must exactly regenerate");
    reject("duplicate-node", base, (value) => { value.nodes[1] = structuredClone(value.nodes[0]); }, "exact unique kind/id");
    reject("missing-test-exclusion", base, (value) => { value.test_exclusions = []; }, "must exactly regenerate");
    reject("wrong-test-exclusion-owner", base, (value) => { value.test_exclusions[0].owner = "V29T"; }, "/test_exclusions/0/owner");
    reject("wrong-test-exclusion-hash", base, (value) => { value.test_exclusions[0].sha256 = "4".repeat(64); }, "/test_exclusions/0/sha256");
    reject("nested-repository-scope", base, (value) => { value.repository.path = realpathSync(join(repository, "src")); }, "must be the exact Git repository root");

    const dirtyPath = join(repository, "untracked.txt");
    write(dirtyPath, "dirty\n");
    reject("dirty-drift", base, () => {}, "/repository/dirty_sha256");
    unlinkSync(dirtyPath);

    writeJson(packagePath, { ...packageManifest, version: "0.0.1-drift" });
    reject("package-drift", base, () => {}, "/authority/package_manifest_sha256");
    writeJson(packagePath, packageManifest);

    write(join(repository, "src/a.ts"), "export const a = 99;\n");
    const replayAfterLiveMutation = run("replay-after-live-mutation", structuredClone(base), "replay");
    if (replayAfterLiveMutation.status !== 0) failures.push(`historical replay rejected after live mutation: ${replayAfterLiveMutation.stderr}`);
    const liveAfterMutation = run("live-after-mutation", structuredClone(base), "live");
    if (liveAfterMutation.status === 0 || !liveAfterMutation.stderr.includes("snapshot bytes differ")) {
        failures.push(`live capture did not reject repository mutation: ${liveAfterMutation.stderr}`);
    }
    write(join(repository, "src/a.ts"), "export const a = 1;\n");

    write(join(snapshotRoot, "src/a.ts"), "archive drift\n");
    const archiveDrift = run("archive-drift", structuredClone(base), "replay");
    if (archiveDrift.status === 0 || !archiveDrift.stderr.includes("/snapshot/files")) {
        failures.push(`replay did not reject archive mutation: ${archiveDrift.stderr}`);
    }
    write(join(snapshotRoot, "src/a.ts"), "export const a = 1;\n");

    const nonRepository = join(fixture, "not-a-repository");
    mkdirSync(nonRepository);
    reject("not-git", base, (value) => { value.repository.path = nonRepository; }, "live Git identity failed");
} finally {
    rmSync(fixture, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({ schema: "vnext-value-current-inventory-selftest/1", positives: 3, adversarial_rejections: 16 })}\n`);
