import { lstatSync, readdirSync } from "node:fs";
import { basename, resolve } from "node:path";

import { compareCanonicalText } from "./json-contract.mjs";

export const forbiddenCorpusBasenames = new Set(["r1-opus-refuted"]);

export function assertAllowedCorpusBasename(name, path = name) {
    if (forbiddenCorpusBasenames.has(name)) {
        throw new Error(`forbidden quarantine entry encountered; contents were not opened and path metadata was not inspected: ${path}`);
    }
}

/**
 * Enumerate regular corpus files without ever opening a forbidden subtree.
 * Symlinks are rejected before their targets can influence the corpus.
 */
export function walkCorpusFiles(directory, operations = {}) {
    const inspect = operations.lstat ?? lstatSync;
    const entries = operations.readdir ?? ((path) => readdirSync(path, { withFileTypes: true }));
    const canonicalDirectory = resolve(directory);
    assertAllowedCorpusBasename(basename(canonicalDirectory), canonicalDirectory);
    const rootMetadata = inspect(canonicalDirectory);
    if (rootMetadata.isSymbolicLink()) {
        throw new Error(`formation corpus root symlink is forbidden before traversal: ${canonicalDirectory}`);
    }
    if (!rootMetadata.isDirectory()) {
        throw new Error(`formation corpus root is not a directory: ${canonicalDirectory}`);
    }
    return [...entries(canonicalDirectory)]
        .sort((left, right) => compareCanonicalText(left.name, right.name))
        .flatMap((entry) => {
            const path = resolve(canonicalDirectory, entry.name);
            assertAllowedCorpusBasename(entry.name, path);
            const metadata = inspect(path);
            if (entry.isSymbolicLink() || metadata.isSymbolicLink()) {
                throw new Error(`formation corpus symlink is forbidden: ${path}`);
            }
            if (entry.isDirectory()) {
                return walkCorpusFiles(path, operations);
            }
            if (!entry.isFile() || !metadata.isFile()) {
                throw new Error(`formation corpus entry is not a regular file: ${path}`);
            }
            return [path];
        });
}
