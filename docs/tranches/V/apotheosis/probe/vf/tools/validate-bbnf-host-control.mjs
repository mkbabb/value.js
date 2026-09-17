#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, resolve } from "node:path";
import { spawnSync } from "node:child_process";

import { canonicalize, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";

const root = resolve(new URL("..", import.meta.url).pathname);
const manifestPath = resolve(root, "BBNF-HOST-CONTROL.json");
const schemaPath = resolve(root, "bbnf-host-control.schema.json");
const execute = process.argv.includes("--execute");
if (process.argv.some((argument, index) => index > 1 && argument !== "--execute")) {
    process.stderr.write("usage: node validate-bbnf-host-control.mjs [--execute]\n");
    process.exit(1);
}

const manifest = parseJsonStrict(readFileSync(manifestPath));
const schema = parseJsonStrict(readFileSync(schemaPath));
const failures = validateJsonSchema(manifest, schema);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const run = (command, args, options = {}) => {
    const result = spawnSync(command, args, { encoding: null, maxBuffer: 128 * 1024 * 1024, ...options });
    if (result.error || result.status !== 0) {
        const stderr = result.stderr?.toString("utf8").trim() ?? "";
        throw new Error(`${command} ${args.join(" ")} in ${options.cwd ?? process.cwd()} exited ${result.status}: ${result.error?.message ?? stderr}`);
    }
    return result.stdout;
};

const expectedSources = {
    bbnf: { repository: "/Users/mkbabb/Programming/bbnf-lang", archive_paths: ["typescript", "grammar"] },
    parse_that: { repository: "/Users/mkbabb/Programming/parse-that", archive_paths: ["typescript", "grammar"] },
};

for (const [name, source] of [["bbnf", manifest.bbnf], ["parse_that", manifest.parse_that]]) {
    try {
        const expectedSource = expectedSources[name];
        if (source.repository !== expectedSource.repository
            || canonicalize(source.archive_paths) !== canonicalize(expectedSource.archive_paths)) {
            throw new Error("repository/archive paths differ from the exact bounded host authority");
        }
        const resolved = run("git", ["rev-parse", `${source.ref}^{commit}`], { cwd: source.repository }).toString("utf8").trim();
        if (resolved !== source.commit) failures.push(`/${name}/ref: resolved ${resolved}; expected ${source.commit}`);
        const archive = run("git", ["archive", "--format=tar", source.commit, ...source.archive_paths], { cwd: source.repository });
        if (hash(archive) !== source.archive_sha256) failures.push(`/${name}/archive_sha256: source archive drift`);
        for (const [file, expected] of [["package.json", source.package_json_sha256], ["package-lock.json", source.package_lock_sha256]]) {
            const bytes = run("git", ["show", `${source.commit}:typescript/${file}`], { cwd: source.repository });
            if (hash(bytes) !== expected) failures.push(`/${name}/${file}: source hash drift`);
        }
    } catch (error) {
        failures.push(`/${name}: ${error.message}`);
    }
}

const preimage = { ...manifest };
delete preimage.manifest_hash;
const computedManifestHash = hash(canonicalize(preimage));
if (manifest.manifest_hash !== computedManifestHash) failures.push(`/manifest_hash: computed ${computedManifestHash}`);

let control = "structural";
if (execute && failures.length === 0) {
    const fixture = mkdtempSync(resolve(tmpdir(), "vnext-bbnf-control-"));
    try {
        if (process.version !== manifest.runtime.node) throw new Error(`Node ${process.version}; expected ${manifest.runtime.node}`);
        const npmVersion = run("npm", ["--version"]).toString("utf8").trim();
        if (npmVersion !== manifest.runtime.npm) throw new Error(`npm ${npmVersion}; expected ${manifest.runtime.npm}`);

        const ptArchive = run("git", ["archive", "--format=tar", manifest.parse_that.commit, ...manifest.parse_that.archive_paths], { cwd: manifest.parse_that.repository });
        const ptTar = resolve(fixture, "parse-that.tar");
        const ptRoot = resolve(fixture, "parse-that");
        writeFileSync(ptTar, ptArchive);
        run("mkdir", [ptRoot]);
        run("tar", ["-xf", ptTar, "-C", ptRoot]);
        const ptTypescript = resolve(ptRoot, "typescript");
        if (!existsSync(resolve(ptTypescript, "package-lock.json"))) throw new Error(`parse-that archive omitted ${resolve(ptTypescript, "package-lock.json")}`);
        run("npm", ["ci", "--ignore-scripts"], { cwd: ptTypescript });
        run("npm", ["run", "build"], { cwd: ptTypescript });
        run("npm", ["pack", "--json"], { cwd: ptTypescript });
        const packed = resolve(ptTypescript, manifest.parse_that.packed_tarball);
        if (hash(readFileSync(packed)) !== manifest.parse_that.packed_tarball_sha256) throw new Error("packed parse-that tarball is not reproducible");

        const bbnfArchive = run("git", ["archive", "--format=tar", manifest.bbnf.commit, ...manifest.bbnf.archive_paths], { cwd: manifest.bbnf.repository });
        const bbnfTar = resolve(fixture, "bbnf.tar");
        const bbnfRoot = resolve(fixture, "bbnf");
        writeFileSync(bbnfTar, bbnfArchive);
        run("mkdir", [bbnfRoot]);
        run("tar", ["-xf", bbnfTar, "-C", bbnfRoot]);
        const bbnfTypescript = resolve(bbnfRoot, "typescript");
        if (!existsSync(resolve(bbnfTypescript, "package-lock.json"))) throw new Error(`BBNF archive omitted ${resolve(bbnfTypescript, "package-lock.json")}`);
        run("npm", ["ci", "--ignore-scripts"], { cwd: bbnfTypescript });
        run("npm", ["install", "--no-save", packed], { cwd: bbnfTypescript });
        run("npx", ["vitest", "run", "test/imports.test.ts", "test/first-sets.test.ts", "test/optimize.test.ts", "test/analysis.test.ts"], { cwd: bbnfTypescript });
        run("npx", ["vitest", "run", "test/bbnf.test.ts", "-t", "CSS"], { cwd: bbnfTypescript });
        control = "executed-clean-archives";
    } catch (error) {
        failures.push(`/execution: ${error.message}`);
    } finally {
        rmSync(fixture, { recursive: true });
    }
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({ schema: manifest.schema, manifest_hash: computedManifestHash, control, bbnf_commit: manifest.bbnf.commit, parse_that_commit: manifest.parse_that.commit, packed_parse_that_sha256: manifest.parse_that.packed_tarball_sha256 }, null, 2)}\n`);
