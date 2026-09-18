#!/usr/bin/env node

import { lstatSync } from "node:fs";
import { resolve } from "node:path";

import { corpusRoot } from "./corpus-epoch.mjs";

const match = process.argv.length === 4 && process.argv[2] === "--pass" && /^[12]$/.test(process.argv[3] ?? "");
if (!match) {
    process.stderr.write("usage: node probe-clean-report-absence.mjs --pass <1|2>\n");
    process.exit(2);
}

const pass = Number(process.argv[3]);
const absent = ["A", "B", "ADJ"].map((tag) => `reviews/FORMATION-CLEAN-PASS-${pass}-${tag}.md`);
const present = [];
for (const name of absent) {
    try {
        lstatSync(resolve(corpusRoot, name));
        present.push(name);
    } catch (error) {
        if (error?.code !== "ENOENT") throw error;
    }
}

if (present.length) {
    process.stderr.write(`clean report path already exists: ${present.join(",")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({ schema: "vnext-clean-report-absence/1", pass, absent })}\n`);
