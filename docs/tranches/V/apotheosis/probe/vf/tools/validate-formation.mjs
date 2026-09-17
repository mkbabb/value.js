#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { compareCanonicalText } from "./json-contract.mjs";
import { loadFormationProofLayer } from "./formation-proof-layer.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const files = ["waves/P-V.md", "waves/K-A.md", "waves/G-D.md", "waves/M-C.md"];
const idPattern = /^[PVKAGDMC]\d{2}[A-Z]?$/;
const expectedCounts = { P: 8, V: 44, K: 27, A: 36, G: 10, D: 33, M: 13, C: 19 };
const rows = new Map();

function fail(message) {
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
}

const formationProofLayer = loadFormationProofLayer(root);
for (const failure of formationProofLayer.failures) fail(`formation proof layer: ${failure}`);

for (const relative of files) {
    const text = readFileSync(resolve(root, relative), "utf8");
    for (const [zeroLine, line] of text.split("\n").entries()) {
        if (!line.startsWith("|")) continue;
        const cells = line
            .split("|")
            .slice(1, -1)
            .map((cell) => cell.trim());
        const id = cells[0];
        if (!idPattern.test(id ?? "")) continue;
        if (cells.length !== 7) {
            fail(`${relative}:${zeroLine + 1}: ${id} has ${cells.length} cells; expected 7`);
            continue;
        }
        if (rows.has(id)) {
            fail(`${relative}:${zeroLine + 1}: duplicate wave ${id}`);
            continue;
        }
        for (const [index, cell] of cells.entries()) {
            if (!cell) fail(`${relative}:${zeroLine + 1}: ${id} has empty cell ${index + 1}`);
        }
        rows.set(id, {
            id,
            file: relative,
            line: zeroLine + 1,
            dependenciesText: cells[2],
            cells,
        });
    }
}

const adjacency = new Map([...rows].map(([id]) => [id, []]));
for (const row of rows.values()) {
    const text = row.dependenciesText;
    if (/^(None|—|-)$/.test(text)) continue;
    if (/[–—/+]|\b(?:and|every|plus|accepted|outcome|reopened)\b/i.test(text)) {
        fail(`${row.file}:${row.line}: ${row.id} dependency cell is not an explicit comma-separated edge list: ${text}`);
        continue;
    }
    const dependencies = text.split(",").map((value) => value.trim());
    if (new Set(dependencies).size !== dependencies.length) {
        fail(`${row.file}:${row.line}: ${row.id} repeats a dependency`);
    }
    for (const dependency of dependencies) {
        if (!idPattern.test(dependency)) {
            fail(`${row.file}:${row.line}: ${row.id} has invalid dependency token ${dependency}`);
        } else if (!rows.has(dependency)) {
            fail(`${row.file}:${row.line}: ${row.id} references missing wave ${dependency}`);
        } else if (dependency === row.id) {
            fail(`${row.file}:${row.line}: ${row.id} depends on itself`);
        } else {
            adjacency.get(dependency).push(row.id);
        }
    }
}

const colors = new Map([...rows.keys()].map((id) => [id, 0]));
const stack = [];
function visit(id) {
    colors.set(id, 1);
    stack.push(id);
    for (const consumer of adjacency.get(id)) {
        if (colors.get(consumer) === 0) visit(consumer);
        else if (colors.get(consumer) === 1) {
            const start = stack.indexOf(consumer);
            fail(`wave dependency cycle: ${[...stack.slice(start), consumer].join(" -> ")}`);
        }
    }
    stack.pop();
    colors.set(id, 2);
}
for (const id of [...rows.keys()].sort()) if (colors.get(id) === 0) visit(id);

const counts = {};
for (const id of rows.keys()) counts[id[0]] = (counts[id[0]] ?? 0) + 1;
for (const [band, expected] of Object.entries(expectedCounts)) {
    const actual = counts[band] ?? 0;
    if (actual !== expected) fail(`band ${band} has ${actual} waves; expected ${expected}`);
}
for (const band of Object.keys(counts)) {
    if (!(band in expectedCounts)) fail(`unexpected wave band ${band}`);
}
if (rows.size !== 190) fail(`formation has ${rows.size} waves; expected 190`);
const edges = [...adjacency.values()].reduce((sum, consumers) => sum + consumers.length, 0);
const canonical = [...rows.values()]
    .sort((left, right) => compareCanonicalText(left.id, right.id))
    .map((row) => ({ id: row.id, dependencies: row.dependenciesText }))
    .map((row) => JSON.stringify(row))
    .join("\n");

if (!process.exitCode) {
    process.stdout.write(
        `${JSON.stringify(
            {
                schema: "vnext-formation-waves/1",
                counts,
                total: rows.size,
                edges,
                sha256: createHash("sha256").update(canonical).digest("hex"),
                formation_proof_layer_sha256: formationProofLayer.sha256,
            },
            null,
            2,
        )}\n`,
    );
}
