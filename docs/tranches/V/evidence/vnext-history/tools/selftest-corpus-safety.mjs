#!/usr/bin/env node

import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { computeCorpusEpoch } from "./corpus-epoch.mjs";
import { walkCorpusFiles } from "./corpus-files.mjs";

const fixture = mkdtempSync(resolve(tmpdir(), "vnext-corpus-safety-"));
let walkRejected = false;
let epochRejected = false;
let rootSymlinkRejected = false;
let entrySymlinkRejected = false;
let exclusionsExact = false;
try {
    const forbiddenEntry = {
        name: "r1-opus-refuted",
        isSymbolicLink: () => { throw new Error("forbidden dirent metadata was inspected"); },
        isDirectory: () => { throw new Error("forbidden dirent metadata was inspected"); },
        isFile: () => { throw new Error("forbidden dirent metadata was inspected"); },
    };
    let walkMetadataCalls = 0;
    try {
        walkCorpusFiles(fixture, {
            lstat: () => {
                walkMetadataCalls += 1;
                if (walkMetadataCalls !== 1) throw new Error("forbidden path metadata was inspected");
                return { isSymbolicLink: () => false, isDirectory: () => true };
            },
            readdir: () => [forbiddenEntry],
        });
    } catch (error) {
        walkRejected = /contents were not opened/.test(error.message) && walkMetadataCalls === 1;
    }
    let epochMetadataCalls = 0;
    try {
        computeCorpusEpoch(fixture, () => walkCorpusFiles(fixture, {
            lstat: () => {
                epochMetadataCalls += 1;
                if (epochMetadataCalls !== 1) throw new Error("forbidden path metadata was inspected");
                return { isSymbolicLink: () => false, isDirectory: () => true };
            },
            readdir: () => [forbiddenEntry],
        }));
    } catch (error) {
        epochRejected = /contents were not opened/.test(error.message) && epochMetadataCalls === 1;
    }
    const reviews = resolve(fixture, "reviews");
    mkdirSync(reviews);
    const excludedReport = resolve(reviews, "FORMATION-CLEAN-PASS-1-A.md");
    const nearPrefix = resolve(reviews, "FORMATION-CLEAN-PASS-unreviewed.md");
    writeFileSync(excludedReport, "excluded one\n");
    writeFileSync(nearPrefix, "included one\n");
    const firstEpoch = computeCorpusEpoch(fixture).sha256;
    writeFileSync(excludedReport, "excluded two\n");
    const secondEpoch = computeCorpusEpoch(fixture).sha256;
    writeFileSync(nearPrefix, "included two\n");
    const thirdEpoch = computeCorpusEpoch(fixture).sha256;
    exclusionsExact = firstEpoch === secondEpoch && secondEpoch !== thirdEpoch;
    const safe = resolve(fixture, "safe");
    mkdirSync(safe);
    writeFileSync(resolve(safe, "evidence.md"), "safe\n");
    const rootLink = resolve(fixture, "root-link");
    symlinkSync(safe, rootLink, "dir");
    try {
        walkCorpusFiles(rootLink);
    } catch (error) {
        rootSymlinkRejected = /root symlink is forbidden before traversal/.test(error.message);
    }
    const entryFixture = resolve(fixture, "entry-fixture");
    mkdirSync(entryFixture);
    symlinkSync(resolve(safe, "evidence.md"), resolve(entryFixture, "evidence-link.md"), "file");
    try {
        walkCorpusFiles(entryFixture);
    } catch (error) {
        entrySymlinkRejected = /corpus symlink is forbidden/.test(error.message);
    }
} finally {
    rmSync(fixture, { recursive: true });
}

if (!walkRejected || !epochRejected || !rootSymlinkRejected || !entrySymlinkRejected || !exclusionsExact) {
    process.stderr.write(`corpus traversal rejection failed: walk=${walkRejected} epoch=${epochRejected} root_symlink=${rootSymlinkRejected} entry_symlink=${entrySymlinkRejected} exclusions_exact=${exclusionsExact}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({ schema: "vnext-corpus-safety-selftest/1", quarantine_walk: "rejected-before-entry-metadata", epoch_walk: "rejected-before-entry-metadata", root_symlink: "rejected-before-traversal", entry_symlink: "rejected-before-read", clean_pass_exclusions: "exact-six-reports-plus-manifest" }, null, 2)}\n`);
