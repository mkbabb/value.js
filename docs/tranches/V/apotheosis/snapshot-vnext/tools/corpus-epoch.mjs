#!/usr/bin/env node

import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText } from "./json-contract.mjs";
import { walkCorpusFiles } from "./corpus-files.mjs";

export const corpusRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const cleanPassExclusions = [
    "FORMATION-CLEAN-PASSES.json",
    "reviews/FORMATION-CLEAN-PASS-1-A.md",
    "reviews/FORMATION-CLEAN-PASS-1-B.md",
    "reviews/FORMATION-CLEAN-PASS-1-ADJ.md",
    "reviews/FORMATION-CLEAN-PASS-2-A.md",
    "reviews/FORMATION-CLEAN-PASS-2-B.md",
    "reviews/FORMATION-CLEAN-PASS-2-ADJ.md",
];
export const externalEpochFiles = [
    "../coordination/keyframes-inbox-2026-07-18-vnext-ingestion-prompt.md",
    "../coordination/keyframes-inbox-2026-07-18-vnext-formation-handoff.md",
];

function excluded(path) {
    return cleanPassExclusions.includes(path);
}

export function computeCorpusEpoch(root = corpusRoot, walker = walkCorpusFiles) {
    const canonicalRoot = realpathSync(root);
    const local = walker(root)
        .map((path) => ({ path, relative: relative(root, path).replaceAll("\\", "/") }))
        .filter(({ relative: name }) => !excluded(name))
        .map(({ path, relative: name }) => ({ path, name }));
    const external = resolve(root) === corpusRoot
        ? externalEpochFiles.map((name) => ({ path: resolve(root, name), name }))
        : [];
    const files = [...local, ...external]
        .sort((left, right) => compareCanonicalText(left.name, right.name))
        .map(({ path, name }) => {
            const metadata = lstatSync(path);
            const expectedRealPath = resolve(canonicalRoot, relative(root, path));
            if (metadata.isSymbolicLink() || !metadata.isFile() || realpathSync(path) !== expectedRealPath) {
                throw new Error(`corpus epoch input must be a canonical regular file: ${path}`);
            }
            return { path: name, sha256: createHash("sha256").update(readFileSync(path)).digest("hex") };
        });
    const sha256 = createHash("sha256").update(canonicalize(files), "utf8").digest("hex");
    return { schema: "vnext-formation-corpus-epoch/1", files: files.length, exclusions: cleanPassExclusions, sha256 };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
    try {
        if (process.argv.length !== 2) throw new Error("usage: node corpus-epoch.mjs");
        process.stdout.write(`${JSON.stringify(computeCorpusEpoch(), null, 2)}\n`);
    } catch (error) {
        process.stderr.write(`${error.message}\n`);
        process.exit(1);
    }
}
