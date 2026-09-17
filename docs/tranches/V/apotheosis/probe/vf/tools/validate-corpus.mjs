#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { forbiddenCorpusBasenames, walkCorpusFiles } from "./corpus-files.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const validatorResults = {};

function fail(message) {
    failures.push(message);
}

let corpusFiles = [];
try {
    corpusFiles = walkCorpusFiles(root);
} catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
}
const markdown = corpusFiles.filter((path) => extname(path) === ".md");
const externalLinkAllowlist = new Map([
    [resolve(root, "../coordination/keyframes-inbox-2026-07-18-vnext-ingestion-prompt.md"), "ea0f570406f425fab867916de728701f6b7851bcb74a2a66ccc9f5caa7af4399"],
    [resolve(root, "../coordination/keyframes-inbox-2026-07-18-vnext-formation-handoff.md"), "a8457da2ec7e7bf16d700a23ab66dda7d851028a570700de2cbf67190b41b20c"],
]);
function contained(base, candidate) {
    const rel = relative(base, candidate);
    return rel === "" || (!rel.startsWith(`..${sep}`) && rel !== ".." && !isAbsolute(rel));
}
for (const path of markdown) {
    const source = readFileSync(path, "utf8");
    if (/^ {0,3}\[[^\]\n]+\]:\s*\S+/m.test(source)
        || /\[[^\]\n]+\]\[[^\]\n]*\]/.test(source)
        || /<a\b[^>]*\bhref\s*=/i.test(source)) {
        fail(`${path.slice(root.length + 1)}: reference-style and HTML links are forbidden; use an inline Markdown link`);
    }
    for (const match of source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
        let target = match[1].trim().replace(/^<|>$/g, "");
        if (/^(?:https?:|mailto:|#)/.test(target)) continue;
        target = target.split("#", 1)[0].split("?", 1)[0];
        if (!target) continue;
        if (isAbsolute(target)) {
            fail(`${path.slice(root.length + 1)}: absolute local link is forbidden ${match[1]}`);
            continue;
        }
        const candidate = resolve(dirname(path), target);
        const components = relative(root, candidate).split(/[\\/]+/);
        if (components.some((component) => forbiddenCorpusBasenames.has(component))) {
            fail(`${path.slice(root.length + 1)}: forbidden quarantine link ${match[1]}`);
            continue;
        }
        if (!contained(root, candidate) && !externalLinkAllowlist.has(candidate)) {
            fail(`${path.slice(root.length + 1)}: relative link escapes the bounded corpus ${match[1]}`);
            continue;
        }
        if (!existsSync(candidate)) {
            fail(`${path.slice(root.length + 1)}: missing relative link ${match[1]}`);
        } else if (externalLinkAllowlist.has(candidate)) {
            const metadata = lstatSync(candidate);
            const digest = createHash("sha256").update(readFileSync(candidate)).digest("hex");
            if (metadata.isSymbolicLink() || !metadata.isFile() || realpathSync(candidate) !== candidate
                || digest !== externalLinkAllowlist.get(candidate)) {
                fail(`${path.slice(root.length + 1)}: external seed link is not the exact canonical pinned file ${match[1]}`);
            }
        }
    }
}

const expectedCounts = { P: 8, V: 44, K: 27, A: 36, G: 10, D: 33, M: 13, C: 19 };
for (const name of ["README.md", "PLAN.md", "FORMATION.md", "PROMPT-RECAP.md"]) {
    const source = readFileSync(resolve(root, name), "utf8");
    if (!/\b190\b/.test(source)) fail(`${name}: missing canonical 190-wave total`);
    if (/\b167\b/.test(source)) fail(`${name}: retains stale 167-wave total`);
    for (const [band, count] of Object.entries(expectedCounts)) {
        const row = new RegExp(`\\| ${band} \\| ${count} \\|`);
        if (!row.test(source)) fail(`${name}: missing canonical ${band}${count} registry row`);
    }
}

const operationsSource = readFileSync(resolve(root, "API-OPERATIONS.md"), "utf8");
const operations = [...operationsSource.matchAll(/^\| `([^`]+)` \| (GET|POST|PUT|PATCH|DELETE) \| `([^`]+)` \| (.*?) \| (.*?) \|$/gm)].map(
    (match) => ({ id: match[1], method: match[2], path: match[3], authority: match[4], success: match[5] }),
);
const operationIds = operations.map(({ id }) => id);
const valueOperations = operations.filter(({ id }) => id.startsWith("value."));
const fourierOperations = operations.filter(({ id }) => id.startsWith("fourier."));
if (operations.length !== 130 || new Set(operationIds).size !== 130) {
    fail(`API-OPERATIONS.md: expected 130 unique HTTP operations; found ${operations.length}/${new Set(operationIds).size}`);
}
if (valueOperations.length !== 89 || fourierOperations.length !== 41) {
    fail(`API-OPERATIONS.md: expected value 89/Fourier 41; found ${valueOperations.length}/${fourierOperations.length}`);
}
const routeKeys = operations.map(({ id, method, path }) => `${id.split(".", 1)[0]}:${method}:${path}`);
if (new Set(routeKeys).size !== routeKeys.length) fail("API-OPERATIONS.md: duplicate service/method/path tuple");
for (const operation of operations) {
    if (!operation.path.startsWith("/api/")) fail(`API-OPERATIONS.md: ${operation.id} has noncanonical path ${operation.path}`);
    if (!operation.authority || !operation.success) fail(`API-OPERATIONS.md: ${operation.id} has an empty authority/status cell`);
}
const operationsHash = createHash("sha256")
    .update(operations.map((operation) => JSON.stringify(operation)).join("\n"))
    .digest("hex");
const expectedOperationsHash = "5d311e21660a2ec8a3dfee1b5c7389c91e4426926205a543ddf9aa5fbbc2793a";
if (operationsHash !== expectedOperationsHash) {
    fail(`API-OPERATIONS.md: operation-vector hash ${operationsHash}; expected ${expectedOperationsHash}`);
}
const headlessBlock = operationsSource.match(/## Headless registry operations[\s\S]*?```text\n([\s\S]*?)```/);
const headless = headlessBlock?.[1].trim().split(/\n+/).filter(Boolean) ?? [];
if (headless.length !== 17 || new Set(headless).size !== 17) {
    fail(`API-OPERATIONS.md: expected 17 unique headless operations; found ${headless.length}/${new Set(headless).size}`);
}
const headlessHash = createHash("sha256").update(headless.join("\n")).digest("hex");
const expectedHeadlessHash = "80af0a72d99e88dbcbac5fbc652604e733cfac7bd70df21417110491302cc8b2";
if (headlessHash !== expectedHeadlessHash) {
    fail(`API-OPERATIONS.md: headless hash ${headlessHash}; expected ${expectedHeadlessHash}`);
}

for (const review of ["P-ADJUDICATION.md", "V-ADJUDICATION.md", "K-ADJUDICATION.md", "A-ADJUDICATION.md", "GD-ADJUDICATION.md", "MC-ADJUDICATION.md", "X-ADJUDICATION.md"]) {
    if (!existsSync(resolve(root, "reviews", review))) fail(`missing signed review ${review}`);
}

const validators = [
    ["formation", "validate-formation.mjs"],
    ["wave_contracts", "validate-wave-contracts.mjs"],
    ["formation_proof_layer", "selftest-formation-proof-layer.mjs"],
    ["wave_edge_policy", "selftest-wave-edge-policy.mjs"],
    ["seed_bijection", "validate-seed-inventory.mjs"],
    ["current_dags", "validate-current-dags.mjs"],
    ["target_paths", "validate-target-paths.mjs"],
    ["target_paths_selftest", "selftest-target-paths.mjs"],
    ["value_current_inventory", "selftest-value-current-inventory.mjs"],
    ["value_target_resolutions", "selftest-value-target-resolutions.mjs"],
    ["value_public_surface", "selftest-value-public-surface.mjs"],
    ["value_target_transpose", "selftest-value-target-transpose.mjs"],
    ["keyframes_current_inventory", "selftest-keyframes-current-inventory.mjs"],
    ["keyframes_public_package", "selftest-keyframes-public-package.mjs"],
    ["keyframes_target_transpose", "selftest-keyframes-target-transpose.mjs"],
    ["css_module_isomorphism", "validate-css-module-isomorphism.mjs"],
    ["css_module_isomorphism_selftest", "selftest-css-module-isomorphism.mjs"],
    ["api_target_paths", "validate-api-target-paths.mjs"],
    ["api_contract", "validate-api-contract.mjs"],
    ["api_return_coverage", "validate-api-return-coverage.mjs"],
    ["parse_coordination", "validate-pt-coordination.mjs"],
    ["bbnf_host", "validate-bbnf-host-control.mjs", ["--execute"]],
    ["p01_authorship", "validate-p01-authorship.mjs"],
    ["p01_authorship_selftest", "selftest-p01-authorship.mjs"],
    ["p01_structural_selftest", "selftest-p01-structural-contract.mjs"],
    ["seat_ledger", "validate-seat-ledger.mjs"],
    ["return_contract", "selftest-contracts.mjs"],
    ["clean_exec_contract", "selftest-clean-exec-contract.mjs"],
    ["clean_provider_bootstrap_authority", "selftest-clean-provider-bootstrap-authority.mjs"],
    ["clean_pass_prompts", "selftest-clean-pass-prompts.mjs"],
    ["clean_coordinator_custody", "selftest-clean-coordinator-custody.mjs"],
    ["deletion_truth", "selftest-deletion-truth.mjs"],
    ["deletion_judgment", "selftest-deletion-judgment.mjs"],
    ["consumer_universe", "selftest-consumer-universe.mjs"],
    ["consumer_bounds", "validate-consumer-bounds.mjs"],
    ["reopenings", "selftest-reopenings.mjs"],
    ["canonical_order", "selftest-canonical-order.mjs"],
    ["corpus_safety", "selftest-corpus-safety.mjs"],
    ["clean_passes", "validate-clean-passes.mjs"],
];
for (const [name, script, args = []] of validators) {
    const path = resolve(root, "tools", script);
    if (!existsSync(path)) {
        fail(`${name}: missing validator ${script}`);
        continue;
    }
    const run = spawnSync(process.execPath, [path, ...args], {
        cwd: resolve(root, "../../../.."),
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
    });
    if (run.status !== 0) {
        fail(`${name}: validator exited ${run.status}\n${run.stderr.trim()}`);
        continue;
    }
    try {
        validatorResults[name] = JSON.parse(run.stdout);
    } catch (error) {
        fail(`${name}: validator output is not JSON: ${error.message}`);
    }
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(
    `${JSON.stringify(
        {
            schema: "vnext-formation-corpus/1",
            formationStatus: "complete",
            markdownFiles: markdown.length,
            relativeLinks: "valid-inline-only",
            waves: 190,
            httpOperations: { value: 89, fourier: 41, total: 130, sha256: operationsHash },
            headlessOperations: { total: 17, sha256: headlessHash },
            validators: validatorResults,
        },
        null,
        2,
    )}\n`,
);
