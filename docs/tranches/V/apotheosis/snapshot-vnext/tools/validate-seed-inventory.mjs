#!/usr/bin/env node

import { createHash } from "node:crypto";
import { closeSync, constants, fstatSync, lstatSync, openSync, readFileSync, realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parseJsonStrict } from "./json-contract.mjs";
import { extractSeedBlocks, sourceKey } from "./seed-blocks.mjs";
import { loadFormationRootSeedContract, loadWaveContracts, seedRequirementProjection } from "./wave-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inventoryPath = resolve(root, "SEED-ROW-INVENTORY.json");
const inventory = parseJsonStrict(readFileSync(inventoryPath));
const failures = [];
const fail = (message) => failures.push(message);
const sha256Text = (value) => createHash("sha256").update(value).digest("hex");
function readExactText(candidate, expected, pointer) {
    if (candidate !== expected) {
        fail(`${pointer}: expected exact path ${expected}; found ${candidate}`);
        return null;
    }
    let descriptor;
    try {
        const lexical = lstatSync(expected);
        if (lexical.isSymbolicLink() || !lexical.isFile() || realpathSync(expected) !== expected) {
            throw new Error("path is not a canonical regular file");
        }
        descriptor = openSync(expected, constants.O_RDONLY | constants.O_NOFOLLOW);
        if (!fstatSync(descriptor).isFile()) throw new Error("opened descriptor is not a regular file");
        return new TextDecoder("utf-8", { fatal: true }).decode(readFileSync(descriptor));
    } catch (error) {
        fail(`${pointer}: ${error.message}`);
        return null;
    } finally {
        if (descriptor !== undefined) closeSync(descriptor);
    }
}

if (inventory.schema !== "vnext-seed-row-inventory/2") fail("invalid inventory schema");
if (typeof inventory.atomicity !== "string" || inventory.atomicity.trim() === "") fail("atomicity law is required");

const amendmentPath = resolve(root, inventory.amendment_authority?.path ?? "");
const expectedAmendmentPath = resolve(root, "OWNER-AMENDMENTS.md");
let amendmentIds = new Set();
const amendmentSource = readExactText(amendmentPath, expectedAmendmentPath, "/amendment_authority/path");
if (amendmentSource !== null) {
    const source = amendmentSource;
    if (sha256Text(source) !== inventory.amendment_authority?.sha256) fail("OWNER-AMENDMENTS authority hash drift");
    amendmentIds = new Set([...source.matchAll(/^\| (OA-\d{2}) \|/gm)].map((match) => match[1]));
    if (amendmentIds.size < 14) fail("OWNER-AMENDMENTS docket is incomplete");
}

const seedSources = new Map();
const expectedSeeds = new Map([
    ["kickoff", resolve(root, "../coordination/keyframes-inbox-2026-07-18-vnext-ingestion-prompt.md")],
    ["handoff", resolve(root, "../coordination/keyframes-inbox-2026-07-18-vnext-formation-handoff.md")],
]);
for (const [name, seed] of Object.entries(inventory.seeds ?? {})) {
    const path = resolve(root, seed.path);
    const source = readExactText(path, expectedSeeds.get(name), `/seeds/${name}/path`);
    if (source === null) continue;
    if (sha256Text(source) !== seed.sha256) fail(`seed ${name} hash drift`);
    seedSources.set(name, source);
}
if (seedSources.size !== 2 || !seedSources.has("kickoff") || !seedSources.has("handoff")) {
    fail("exactly kickoff and handoff seeds are required");
}

const expectedBlocks = [];
for (const [name, source] of seedSources) {
    try {
        expectedBlocks.push(...extractSeedBlocks(name, source));
    } catch (error) {
        fail(error.message);
    }
}
const expectedByKey = new Map(expectedBlocks.map((block) => [sourceKey(block), block]));
if (expectedByKey.size !== expectedBlocks.length) fail("atomic extractor emitted a duplicate source block");
const expectedCounts = Object.fromEntries([...seedSources.keys()].map((seed) => [seed, expectedBlocks.filter((block) => block.seed === seed).length]));
if (expectedCounts.kickoff !== 41 || expectedCounts.handoff !== 108) {
    fail(`atomic extraction cardinality drift: ${JSON.stringify(expectedCounts)}`);
}

const comparePosition = (left, right) => left.line - right.line || left.column - right.column;
for (const seed of seedSources.keys()) {
    const ordered = expectedBlocks
        .filter((block) => block.seed === seed)
        .sort((left, right) => comparePosition(left.start, right.start));
    for (let index = 1; index < ordered.length; index += 1) {
        if (comparePosition(ordered[index - 1].end, ordered[index].start) > 0) {
            fail(`atomic source blocks overlap: ${sourceKey(ordered[index - 1])} and ${sourceKey(ordered[index])}`);
        }
    }
}

const waveIds = new Set();
for (const file of ["P-V.md", "K-A.md", "G-D.md", "M-C.md"]) {
    const source = readFileSync(resolve(root, "waves", file), "utf8");
    for (const match of source.matchAll(/^\| ([PVKAGDMC]\d{2}[A-Z]?) \|/gm)) waveIds.add(match[1]);
}
const allowedNonWaveOwners = new Set(["formation-root"]);
const allowedDispositions = new Set(["folded", "banked", "retired"]);
const allowedPhases = new Set(["formation", "implementation", "both"]);
const rowIds = new Set();
const coveredKeys = new Set();

const requiredAmendments = new Map([
    ["kickoff:26", ["OA-01"]],
    ["kickoff:53", ["OA-02"]],
    ["kickoff:83", ["OA-10"]],
    ["kickoff:96", ["OA-10"]],
    ["kickoff:155", ["OA-14"]],
    ["kickoff:160", ["OA-05", "OA-14"]],
    ["kickoff:173", ["OA-02"]],
    ["kickoff:198", ["OA-14"]],
    ["kickoff:201", ["OA-14"]],
    ["kickoff:207", ["OA-14"]],
    ["kickoff:283", ["OA-01"]],
    ["kickoff:290", ["OA-01"]],
    ["handoff:195", ["OA-10"]],
    ["handoff:211", ["OA-10", "OA-13"]],
    ["handoff:260", ["OA-10"]],
    ["handoff:301", ["OA-14"]],
    ["handoff:302", ["OA-14"]],
    ["handoff:304", ["OA-14"]],
    ["handoff:306", ["OA-14"]],
    ["handoff:307", ["OA-14"]],
    ["handoff:309", ["OA-14"]],
    ["handoff:312", ["OA-14"]],
    ["handoff:313", ["OA-14"]],
    ["handoff:336", ["OA-14"]],
    ["handoff:337", ["OA-14"]],
    ["handoff:338", ["OA-14"]],
    ["handoff:339", ["OA-05"]],
    ["handoff:343", ["OA-02"]],
    ["handoff:470", ["OA-10", "OA-13"]],
    ["handoff:476", ["OA-14"]],
]);

for (const [index, row] of (inventory.rows ?? []).entries()) {
    const pointer = `/rows/${index}`;
    if (!/^[A-Z][A-Z0-9-]*$/.test(row.id ?? "")) fail(`${pointer}/id: invalid stable ID`);
    if (rowIds.has(row.id)) fail(`${pointer}/id: duplicate ${row.id}`);
    rowIds.add(row.id);
    if (!allowedPhases.has(row.phase)) fail(`${pointer}/phase: invalid phase`);
    if (!allowedDispositions.has(row.disposition)) fail(`${pointer}/disposition: invalid disposition`);
    if (!waveIds.has(row.owner) && !allowedNonWaveOwners.has(row.owner)) fail(`${pointer}/owner: unknown owner ${row.owner}`);
    if (typeof row.decision !== "string" || row.decision.trim() === "") fail(`${pointer}/decision: missing terminal decision`);
    if (row.disposition === "banked" && (typeof row.retrigger !== "string" || row.retrigger.trim() === "")) {
        fail(`${pointer}/retrigger: banked row needs an exact retrigger`);
    }
    if (row.disposition !== "banked" && "retrigger" in row) fail(`${pointer}/retrigger: only banked rows may carry retrigger`);

    const amendments = row.amendments ?? [];
    if (!Array.isArray(amendments) || new Set(amendments).size !== amendments.length) fail(`${pointer}/amendments: expected a unique array`);
    for (const amendment of amendments) if (!amendmentIds.has(amendment)) fail(`${pointer}/amendments: unknown ${amendment}`);

    const source = row.source;
    if (!source || !seedSources.has(source.seed) || !Array.isArray(source.start) || !Array.isArray(source.end) ||
        source.start.length !== 2 || source.end.length !== 2 ||
        !source.start.every(Number.isInteger) || !source.end.every(Number.isInteger)) {
        fail(`${pointer}/source: expected exact seed plus [line,column] start/end`);
        continue;
    }
    const candidate = {
        seed: source.seed,
        start: { line: source.start[0], column: source.start[1] },
        end: { line: source.end[0], column: source.end[1] },
    };
    const key = sourceKey(candidate);
    if (coveredKeys.has(key)) fail(`${pointer}/source: atomic block covered more than once (${key})`);
    coveredKeys.add(key);
    const expected = expectedByKey.get(key);
    if (!expected) {
        fail(`${pointer}/source: not an extracted atomic block (${key})`);
        continue;
    }
    if (!/^[0-9a-f]{64}$/.test(source.excerpt_sha256 ?? "")) fail(`${pointer}/source/excerpt_sha256: invalid SHA-256`);
    if (source.excerpt_sha256 !== expected.sha256) fail(`${pointer}/source: excerpt hash mismatch for ${key}`);

    const requirementKey = `${source.seed}:${source.start[0]}`;
    const required = requiredAmendments.get(requirementKey) ?? [];
    if (required.length && (required.length !== amendments.length || required.some((id) => !amendments.includes(id)))) {
        fail(`${pointer}/amendments: ${requirementKey} must cite exactly ${required.join(", ")}`);
    }
}

for (const key of expectedByKey.keys()) if (!coveredKeys.has(key)) fail(`unmapped atomic seed block: ${key}`);
for (const key of coveredKeys) if (!expectedByKey.has(key)) fail(`inventory covers non-atomic source block: ${key}`);
if ((inventory.rows ?? []).length !== expectedBlocks.length) {
    fail(`exact bijection requires ${expectedBlocks.length} rows; found ${(inventory.rows ?? []).length}`);
}

const designSync = (inventory.rows ?? []).find((row) => row.id === "ORCH-07");
if (!designSync || designSync.owner !== "formation-root" || designSync.disposition !== "banked") {
    fail("ORCH-07 must be banked at formation-root");
} else {
    for (const routedOwner of ["G00", "D00A", "M00"]) {
        if (!designSync.retrigger.includes(routedOwner)) fail(`ORCH-07 retrigger must route to ${routedOwner}`);
    }
}

const contracted = new Map();
for (const { contract } of loadWaveContracts(root).values()) {
    for (const requirement of contract.seed_requirements) contracted.set(requirement.id, requirement);
}
const formationRootContract = loadFormationRootSeedContract(root);
for (const requirement of formationRootContract.contract.requirements ?? []) contracted.set(requirement.id, requirement);
for (const row of inventory.rows ?? []) {
    const actual = contracted.get(row.id);
    const expected = seedRequirementProjection(row);
    if (!actual || JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${row.id}: owning contract lacks the exact seed requirement projection`);
}
if (contracted.size !== inventory.rows.length) fail(`owner-contract reverse join expected ${inventory.rows.length}; found ${contracted.size}`);

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const dispositionCounts = Object.fromEntries([...allowedDispositions].map((kind) => [kind, inventory.rows.filter((row) => row.disposition === kind).length]));
const kindCounts = Object.fromEntries([...new Set(expectedBlocks.map((block) => block.kind))].sort().map((kind) => [kind, expectedBlocks.filter((block) => block.kind === kind).length]));
process.stdout.write(`${JSON.stringify({
    schema: inventory.schema,
    rows: inventory.rows.length,
    exact_bijection: true,
    source_blocks: expectedCounts,
    kinds: kindCounts,
    dispositions: dispositionCounts,
    source_hashes: Object.fromEntries(Object.entries(inventory.seeds).map(([name, seed]) => [name, seed.sha256])),
    amendment_authority: inventory.amendment_authority.sha256,
    owner_contract_reverse_join: contracted.size,
}, null, 2)}\n`);
