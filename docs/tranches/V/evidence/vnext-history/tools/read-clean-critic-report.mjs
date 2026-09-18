#!/usr/bin/env node

import { createHash } from "node:crypto";
import { closeSync, constants, fstatSync, openSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { corpusRoot } from "./corpus-epoch.mjs";

const valid = process.argv.length === 8
    && process.argv[2] === "--pass"
    && /^[12]$/.test(process.argv[3] ?? "")
    && process.argv[4] === "--tag"
    && /^[AB]$/.test(process.argv[5] ?? "")
    && process.argv[6] === "--sha256"
    && /^[0-9a-f]{64}$/.test(process.argv[7] ?? "");
if (!valid) {
    process.stderr.write("usage: node read-clean-critic-report.mjs --pass <1|2> --tag <A|B> --sha256 <hash>\n");
    process.exit(2);
}

const pass = Number(process.argv[3]);
const tag = process.argv[5];
const expected = process.argv[7];
const path = resolve(corpusRoot, `reviews/FORMATION-CLEAN-PASS-${pass}-${tag}.md`);
let descriptor;
let bytes;
try {
    descriptor = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW);
    const metadata = fstatSync(descriptor);
    if (!metadata.isFile()) throw new Error("critic report is not a regular file");
    bytes = readFileSync(descriptor);
} finally {
    if (descriptor !== undefined) closeSync(descriptor);
}
const actual = createHash("sha256").update(bytes).digest("hex");
if (actual !== expected) {
    process.stderr.write(`critic report hash ${actual}; expected ${expected}\n`);
    process.exit(1);
}
process.stdout.write(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
