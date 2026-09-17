#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
    closeSync,
    constants,
    fstatSync,
    lstatSync,
    openSync,
    readFileSync,
    realpathSync,
} from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize } from "./json-contract.mjs";

export const cleanReportByteLimit = 12000;
export const cleanReportHashSchema = "vnext-clean-report-hash/1";

const canonicalPasses = new Set([1, 2]);
const canonicalTags = new Set(["A", "B", "ADJ"]);
const sha256Pattern = /^[0-9a-f]{64}$/;

function exactObjectKeys(value, expected) {
    return value && typeof value === "object" && !Array.isArray(value)
        && Object.keys(value).sort().join(",") === [...expected].sort().join(",");
}

export function parseCleanReportHashArgs(argv) {
    if (!Array.isArray(argv) || argv.length !== 4
        || argv[0] !== "--pass" || !/^[12]$/.test(argv[1] ?? "")
        || argv[2] !== "--tag" || !/^(?:A|B|ADJ)$/.test(argv[3] ?? "")) {
        throw new Error("usage: node hash-clean-report.mjs --pass <1|2> --tag <A|B|ADJ>");
    }
    return { pass: Number(argv[1]), tag: argv[3] };
}

export function cleanReportHashPath(corpusRoot, pass, tag) {
    if (typeof corpusRoot !== "string" || !isAbsolute(corpusRoot)
        || !canonicalPasses.has(pass) || !canonicalTags.has(tag)) {
        throw new Error("clean report hash path requires an absolute corpus root and canonical pass/tag");
    }
    return resolve(corpusRoot, "reviews", `FORMATION-CLEAN-PASS-${pass}-${tag}.md`);
}

function sameFileState(left, right) {
    return left.dev === right.dev && left.ino === right.ino && left.mode === right.mode
        && left.size === right.size && left.mtimeNs === right.mtimeNs && left.ctimeNs === right.ctimeNs;
}

export function hashCleanReportFile({ corpusRoot, pass, tag, operations = {} }) {
    const path = cleanReportHashPath(corpusRoot, pass, tag);
    const inspectDescriptor = operations.fstat ?? ((descriptor) => fstatSync(descriptor, { bigint: true }));
    const inspectPath = operations.lstat ?? ((candidate) => lstatSync(candidate, { bigint: true }));
    const readDescriptor = operations.read ?? readFileSync;
    let descriptor;
    let bytes;
    try {
        try {
            descriptor = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW);
        } catch {
            throw new Error(`clean report must be an existing regular non-symlink file: ${path}`);
        }
        const opened = inspectDescriptor(descriptor);
        const current = inspectPath(path);
        if (!opened.isFile() || current.isSymbolicLink() || !current.isFile()
            || !sameFileState(opened, current)) {
            throw new Error(`clean report must remain one regular non-symlink file: ${path}`);
        }
        if (realpathSync(path) !== path) {
            throw new Error(`clean report path is not canonical: ${path}`);
        }
        if (opened.size > BigInt(cleanReportByteLimit)) {
            throw new Error(`clean report exceeds ${cleanReportByteLimit} bytes: ${path}`);
        }
        bytes = readDescriptor(descriptor);
        const closedWorld = inspectDescriptor(descriptor);
        const closingPath = inspectPath(path);
        if (!closedWorld.isFile() || !sameFileState(closedWorld, opened)
            || closingPath.isSymbolicLink() || !closingPath.isFile()
            || !sameFileState(closingPath, opened)
            || closedWorld.size !== BigInt(bytes.length) || bytes.length > cleanReportByteLimit) {
            throw new Error(`clean report changed while it was being hashed: ${path}`);
        }
    } finally {
        if (descriptor !== undefined) closeSync(descriptor);
    }
    const receipt = {
        schema: cleanReportHashSchema,
        pass,
        tag,
        path,
        sha256: createHash("sha256").update(bytes).digest("hex"),
    };
    if (!exactObjectKeys(receipt, ["schema", "pass", "tag", "path", "sha256"])
        || !sha256Pattern.test(receipt.sha256)) {
        throw new Error("clean report hash receipt is malformed");
    }
    return receipt;
}

export function renderCleanReportHashReceipt(receipt) {
    if (!exactObjectKeys(receipt, ["schema", "pass", "tag", "path", "sha256"])
        || receipt.schema !== cleanReportHashSchema
        || !canonicalPasses.has(receipt.pass) || !canonicalTags.has(receipt.tag)
        || typeof receipt.path !== "string" || !isAbsolute(receipt.path)
        || !sha256Pattern.test(receipt.sha256 ?? "")) {
        throw new Error("cannot render a malformed clean report hash receipt");
    }
    return `${canonicalize(receipt)}\n`;
}

const modulePath = fileURLToPath(import.meta.url);
const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (modulePath === invokedPath) {
    try {
        const { pass, tag } = parseCleanReportHashArgs(process.argv.slice(2));
        const corpusRoot = resolve(dirname(modulePath), "..");
        process.stdout.write(renderCleanReportHashReceipt(hashCleanReportFile({ corpusRoot, pass, tag })));
    } catch (error) {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
    }
}
