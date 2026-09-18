#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repo = resolve(root, "../../../..");
const documentPath = resolve(root, "CURRENT-DAGS.md");
const toolPath = resolve(root, "tools/module-graph.mjs");
const toolMetadata = lstatSync(toolPath);
const canonicalToolPath = realpathSync(toolPath);
const source = readFileSync(documentPath, "utf8");
const failures = [];

function fail(message) {
    failures.push(message);
}

function plain(value) {
    return value.replaceAll("`", "").trim();
}

const rows = source.split("\n")
    .filter((line) => /^\| (?:value library|value demo|value `\/api`|keyframes library|keyframes demo) /.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
if (rows.length !== 5) fail(`CURRENT-DAGS.md: expected five graph rows; found ${rows.length}`);

let lastHead = "";
const expected = rows.map((cells) => {
    const statedHead = plain(cells[1]);
    if (statedHead !== "same") lastHead = statedHead;
    return {
        description: plain(cells[0]),
        head: lastHead,
        input: plain(cells[2]),
        nodes: Number(cells[3]),
        records: Number(cells[4]),
        edges: Number(cells[5]),
        runtimeSccs: Number(cells[6]),
        combinedSccs: Number(cells[7]),
        artifact: plain(cells[8]),
    };
});

const commands = [...source.matchAll(/^node (.+module-graph\.mjs .+)$/gm)].map((match) => match[1].trim().split(/\s+/));
if (commands.length !== 5) fail(`CURRENT-DAGS.md: expected five executable graph commands; found ${commands.length}`);

const plans = [
    { repository: repo, include: "src", label: "value-library" },
    { repository: repo, include: "demo", label: "value-demo" },
    { repository: repo, include: "api/src", label: "value-api" },
    { repository: "/Users/mkbabb/Programming/keyframes-v-exec", include: "src", label: "keyframes-library" },
    { repository: "/Users/mkbabb/Programming/keyframes-v-exec", include: "demo", label: "keyframes-demo" },
];
function boundedGraphCommand(command, row, plan) {
    if (!row || !plan || !Array.isArray(command)) return false;
    const script = resolve(repo, command[0] ?? "");
    const args = command.slice(1);
    const wantedArgs = ["--repo", plan.repository, "--include", plan.include, "--label", plan.label, "--ref", row.head];
    return script === toolPath && canonicalToolPath === toolPath && !toolMetadata.isSymbolicLink() && toolMetadata.isFile()
        && JSON.stringify(args) === JSON.stringify(wantedArgs);
}

const controlRow = { head: "a".repeat(40) };
const controlPlan = plans[0];
const controlArgs = ["--repo", controlPlan.repository, "--include", controlPlan.include, "--label", controlPlan.label, "--ref", controlRow.head];
const boundedSelftest = [
    ["docs/tranches/V/vnext/tools/evil-module-graph.mjs", ...controlArgs],
    ["docs/tranches/V/vnext/tools/module-graph.mjs", "--repo", "/tmp", ...controlArgs.slice(2)],
    ["docs/tranches/V/vnext/tools/module-graph.mjs", ...controlArgs.slice(0, 2), "--include", "..", ...controlArgs.slice(4)],
    ["docs/tranches/V/vnext/tools/module-graph.mjs", ...controlArgs.slice(0, 4), "--label", "unbound", ...controlArgs.slice(6)],
    ["docs/tranches/V/vnext/tools/module-graph.mjs", ...controlArgs.slice(0, 6), "--ref", "b".repeat(40)],
];
if (!boundedGraphCommand(["docs/tranches/V/vnext/tools/module-graph.mjs", ...controlArgs], controlRow, controlPlan)
    || boundedSelftest.some((command) => boundedGraphCommand(command, controlRow, controlPlan))) {
    fail("bounded graph-command adversarial selftest failed");
}
const results = [];
for (const [index, command] of commands.entries()) {
    const row = expected[index];
    const plan = plans[index];
    if (!row || !plan) {
        fail(`graph ${index + 1}: command has no exact row/plan authority`);
        continue;
    }
    const wantedArgs = ["--repo", plan.repository, "--include", plan.include, "--label", plan.label, "--ref", row.head];
    if (!boundedGraphCommand(command, row, plan)) {
        fail(`graph ${index + 1}: command must use the canonical module-graph tool and exact bounded argv`);
        continue;
    }
    const run = spawnSync(process.execPath, [toolPath, ...wantedArgs], {
        cwd: repo,
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
    });
    if (run.status !== 0) {
        fail(`graph ${index + 1}: command failed ${run.stderr.trim()}`);
        continue;
    }
    let graph;
    try {
        graph = JSON.parse(run.stdout);
    } catch (error) {
        fail(`graph ${index + 1}: output is not JSON: ${error.message}`);
        continue;
    }
    const assertions = [
        [graph.checkedOutHead, row.head, "HEAD"],
        [graph.workingInputSha256, row.input, "working input"],
        [graph.counts?.nodes, row.nodes, "node count"],
        [graph.counts?.importExportRecords, row.records, "record count"],
        [graph.counts?.uniqueFileEdges, row.edges, "edge count"],
        [graph.stronglyConnected?.runtime?.length, row.runtimeSccs, "runtime SCC count"],
        [graph.stronglyConnected?.runtimeAndType?.length, row.combinedSccs, "combined SCC count"],
        [graph.artifactSha256, row.artifact, "artifact hash"],
    ];
    for (const [actual, wanted, label] of assertions) {
        if (actual !== wanted) fail(`${row.description}: ${label} ${actual}; expected ${wanted}`);
    }
    if (graph.counts?.unresolvedRelativeEdges !== 0 || graph.unresolved?.length !== 0) {
        fail(`${row.description}: unresolved relative imports remain`);
    }
    results.push({
        label: graph.label,
        head: graph.checkedOutHead,
        working_input_sha256: graph.workingInputSha256,
        artifact_sha256: graph.artifactSha256,
    });
}

const toolSha256 = createHash("sha256").update(readFileSync(toolPath)).digest("hex");
const documentedTool = source.match(/Current tool SHA-256:\n`([0-9a-f]{64})`/)?.[1];
if (documentedTool !== toolSha256) fail(`module-graph tool hash ${toolSha256}; documented ${documentedTool}`);
for (const result of results) {
    const graphTool = source.includes(toolSha256);
    if (!graphTool) fail(`${result.label}: tool hash is absent from CURRENT-DAGS.md`);
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
const digest = createHash("sha256").update(JSON.stringify(results)).digest("hex");
process.stdout.write(`${JSON.stringify({ schema: "vnext-current-dags-validation/1", graphs: results.length, tool_sha256: toolSha256, results_sha256: digest }, null, 2)}\n`);
