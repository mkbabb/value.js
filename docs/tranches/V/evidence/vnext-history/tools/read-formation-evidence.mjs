#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";

import { cleanPassExclusions, corpusRoot } from "./corpus-epoch.mjs";
import { walkCorpusFiles } from "./corpus-files.mjs";

const valid = process.argv.length === 8
    && process.argv[2] === "--file"
    && process.argv[4] === "--start"
    && process.argv[6] === "--end"
    && /^[1-9][0-9]*$/.test(process.argv[5] ?? "")
    && /^[1-9][0-9]*$/.test(process.argv[7] ?? "");
if (!valid) {
    process.stderr.write("usage: node read-formation-evidence.mjs --file <relative> --start <line> --end <line>\n");
    process.exit(2);
}

const name = process.argv[3];
const start = Number(process.argv[5]);
const end = Number(process.argv[7]);
if (!/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(name) || name.split("/").includes("..")
    || cleanPassExclusions.includes(name) || end < start || end - start > 249) {
    process.stderr.write("unsafe or oversized formation evidence slice\n");
    process.exit(2);
}

const files = new Map(walkCorpusFiles(corpusRoot).map((path) => [relative(corpusRoot, path).replaceAll("\\", "/"), path]));
const path = files.get(name);
if (!path) {
    process.stderr.write(`formation evidence file is absent: ${name}\n`);
    process.exit(1);
}
const lines = new TextDecoder("utf-8", { fatal: true }).decode(readFileSync(path)).split("\n");
if (lines.at(-1) === "") lines.pop();
if (start > lines.length || end > lines.length) {
    process.stderr.write(`formation evidence slice exceeds ${name}:${lines.length}\n`);
    process.exit(1);
}
for (let line = start; line <= end; line += 1) {
    if (lines[line - 1].trim() === "") {
        process.stderr.write(`formation evidence line is blank: ${name}:${line}\n`);
        process.exit(1);
    }
    const sha256 = createHash("sha256").update(lines[line - 1], "utf8").digest("hex");
    process.stdout.write(`${name}:${line}:${sha256}:${lines[line - 1]}\n`);
}
