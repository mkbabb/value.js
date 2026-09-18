#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, posix, resolve } from "node:path";

import { canonicalize, parseJsonStrict } from "./json-contract.mjs";
import { createValueTargetResolutionFixture } from "./value-target-resolution-fixture.mjs";

const root = resolve(new URL("..", import.meta.url).pathname);
const validator = resolve(root, "tools/validate-target-paths.mjs");
const canonicalValue = parseJsonStrict(readFileSync(resolve(root, "VALUE-TARGET-PATHS.json")));
const canonicalKeyframes = parseJsonStrict(readFileSync(resolve(root, "KEYFRAMES-TARGET-PATHS.json")));
const canonicalCss = parseJsonStrict(readFileSync(resolve(root, "CSS-MODULE-ISOMORPHISM.json")));
const fixture = realpathSync(mkdtempSync(join(tmpdir(), "vnext-target-paths-")));
const failures = [];
let resolutionFixture;
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const fileHash = (path) => sha256(readFileSync(path));
const writeJson = (path, value) => {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
};
const writeText = (path, value) => {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, value);
};

function selfHash(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    return sha256(canonicalize(preimage));
}

function finalize(value, member) {
    value[member] = selfHash(value, member);
    return value;
}

function refreshCssAuthority(manifest) {
    manifest.authority.runtime_modules_sha256 = sha256(canonicalize(manifest.modules.map(({ bbnf_path }) => bbnf_path)));
    manifest.authority.excluded_dispositions_sha256 = sha256(canonicalize(manifest.excluded.map(({ bbnf_path, disposition }) => ({ bbnf_path, disposition }))));
    manifest.authority.resolved_edges_sha256 = sha256(canonicalize(manifest.modules.map(({ bbnf_path, imports }) => ({ bbnf_path, imports }))));
}

function executionCss() {
    const value = structuredClone(canonicalCss);
    value.authority.snapshot_kind = "execution-input";
    for (const correction of value.edge_corrections) {
        const owner = value.modules.find(({ bbnf_path }) => bbnf_path === correction.from);
        owner.imports = [...new Set([...owner.imports, correction.to])].sort();
    }
    value.edge_corrections = [];
    refreshCssAuthority(value);
    return finalize(value, "manifest_hash");
}

function identifierFor(module) {
    const stem = basename(module.bbnf_path, ".bbnf");
    return `parse${stem.split(/[^a-z0-9]+/i).filter(Boolean)
        .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join("")}`;
}

function logicalSpecifier(from, to) {
    let specifier = posix.relative(posix.dirname(from), to).replace(/\.ts$/, ".js");
    if (!specifier.startsWith(".")) specifier = `./${specifier}`;
    return specifier;
}

function materializeGrammar(css) {
    const byBbnf = new Map(css.modules.map((module) => [module.bbnf_path, module]));
    for (const module of css.modules) {
        const imports = module.imports.map((dependency, index) => {
            const target = byBbnf.get(dependency);
            return `import { ${identifierFor(target)} as dependency${index} } from ${JSON.stringify(logicalSpecifier(module.typescript_path, target.typescript_path))};`;
        });
        const source = [
            'import { literal } from "@mkbabb/parse-that";',
            ...imports,
            "",
            'const publicParserWitness = literal("");',
            "void publicParserWitness;",
            ...module.imports.map((_, index) => `void dependency${index};`),
            `export function ${identifierFor(module)}(input: string): string {`,
            "    return input;",
            "}",
            "",
        ].join("\n");
        const test = [
            'import { describe, expect, it } from "vitest";',
            `import { ${identifierFor(module)} } from ${JSON.stringify(logicalSpecifier(module.test_path, module.typescript_path))};`,
            "",
            `describe(${JSON.stringify(module.bbnf_path)}, () => {`,
            '    it("exercises its exact peer", () => {',
            `        expect(${identifierFor(module)}("sample")).toBe("sample");`,
            "    });",
            "});",
            "",
        ].join("\n");
        writeText(resolve(fixture, module.typescript_path), source);
        writeText(resolve(fixture, module.test_path), test);
    }
}

function executionTarget(css, cssPath, final = false) {
    const value = structuredClone(canonicalValue);
    value.authority.library.topology = final ? "exact" : "conditional-branch-family";
    value.authority.library.grammar_snapshot = {
        path: "test/proof/p00/css-module-isomorphism.execution.json",
        file_sha256: fileHash(cssPath),
        manifest_hash: css.manifest_hash,
        source_commit: css.source.commit,
        snapshot_kind: "execution-input",
        execution_resnapshot_required: false,
        module_count: css.modules.length,
        runtime_modules_sha256: css.authority.runtime_modules_sha256,
        excluded_dispositions_sha256: css.authority.excluded_dispositions_sha256,
        resolved_edges_sha256: css.authority.resolved_edges_sha256,
    };
    if (final) value.library.conditional_paths = [];
    return finalize(value, "manifest_sha256");
}

function resolvedFinalTarget(css, cssPath, resolutions) {
    const value = executionTarget(css, cssPath, true);
    const prunedSources = new Set(resolutions.rows.filter(({ outcome }) => outcome === "PRUNE").map(({ source }) => source));
    const prunedTests = new Set(resolutions.rows.filter(({ outcome }) => outcome === "PRUNE").map(({ test }) => test));
    value.library.files = value.library.files.filter((path) => !prunedSources.has(path));
    value.library.test.files = value.library.test.files.filter((path) => !prunedTests.has(path));
    return finalize(value, "manifest_sha256");
}

function run(args) {
    return spawnSync(process.execPath, [
        validator,
        ...args,
        ...(args.includes("--final") ? resolutionFixture?.captureAuthorityArgs() ?? [] : []),
    ], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
}

function reject(name, args, fragment) {
    const result = run(args);
    if (result.status === 0 || !result.stderr.includes(fragment)) failures.push(`${name} did not reject ${fragment}: ${result.stderr}`);
}

try {
    const formation = run([]);
    if (formation.status !== 0 || !formation.stdout.includes('"mode":"formation"')) failures.push(`canonical formation target rejected: ${formation.stderr}`);

    resolutionFixture = createValueTargetResolutionFixture({
        tempRoot: fixture,
        formationTargetPath: resolve(root, "VALUE-TARGET-PATHS.json"),
    });
    const conditionalOwners = ["V16B", "V18H", "V18V", "V24"];
    const keepResolutions = resolutionFixture.writeResolutions(
        Object.fromEntries(conditionalOwners.map((owner) => [owner, "KEEP"])),
        "target-all-keep",
    );
    const pruneResolutions = resolutionFixture.writeResolutions(
        Object.fromEntries(conditionalOwners.map((owner) => [owner, "PRUNE"])),
        "target-all-prune",
    );

    const css = executionCss();
    const cssPath = resolve(fixture, "test/proof/p00/css-module-isomorphism.execution.json");
    writeJson(cssPath, css);
    materializeGrammar(css);
    const executionPath = resolve(fixture, "value-target.execution.json");
    writeJson(executionPath, executionTarget(css, cssPath));
    const common = ["--value-manifest", executionPath, "--value-root", fixture, "--css-manifest", cssPath];
    const execution = run(common);
    if (execution.status !== 0 || !execution.stdout.includes('"mode":"execution"')) failures.push(`synthetic execution target rejected: ${execution.stderr}`);

    const finalPath = resolve(fixture, "value-target.final.json");
    writeJson(finalPath, resolvedFinalTarget(css, cssPath, keepResolutions.manifest));
    const final = run([
        "--value-manifest", finalPath,
        "--value-root", fixture,
        "--css-manifest", cssPath,
        "--conditional-resolutions", keepResolutions.path,
        "--final",
    ]);
    if (final.status !== 0 || !final.stdout.includes('"mode":"final"') || !final.stdout.includes('"conditional_pairs":0')) {
        failures.push(`synthetic final target rejected: ${final.stderr}`);
    }

    const prunedFinalPath = resolve(fixture, "value-target.final-pruned.json");
    writeJson(prunedFinalPath, resolvedFinalTarget(css, cssPath, pruneResolutions.manifest));
    const prunedFinal = run([
        "--value-manifest", prunedFinalPath,
        "--value-root", fixture,
        "--css-manifest", cssPath,
        "--conditional-resolutions", pruneResolutions.path,
        "--final",
    ]);
    if (prunedFinal.status !== 0 || !prunedFinal.stdout.includes('"mode":"final"') || !prunedFinal.stdout.includes('"conditional_pairs":0')) {
        failures.push(`synthetic all-PRUNE final target rejected: ${prunedFinal.stderr}`);
    }

    reject(
        "PRUNE outcome laundered through retained candidates",
        [
            "--value-manifest", finalPath,
            "--value-root", fixture,
            "--css-manifest", cssPath,
            "--conditional-resolutions", pruneResolutions.path,
            "--final",
        ],
        "terminal conditional outcomes",
    );
    reject(
        "KEEP outcome laundered through removed candidates",
        [
            "--value-manifest", prunedFinalPath,
            "--value-root", fixture,
            "--css-manifest", cssPath,
            "--conditional-resolutions", keepResolutions.path,
            "--final",
        ],
        "terminal conditional outcomes",
    );

    const duplicateConditional = structuredClone(canonicalValue);
    duplicateConditional.library.conditional_paths[1] = structuredClone(duplicateConditional.library.conditional_paths[0]);
    finalize(duplicateConditional, "manifest_sha256");
    const duplicatePath = resolve(fixture, "duplicate-conditional.json");
    writeJson(duplicatePath, duplicateConditional);
    reject("duplicate conditional", ["--value-manifest", duplicatePath], "duplicate conditional source/owner row");

    const wrongLibraryTestCount = structuredClone(canonicalKeyframes);
    wrongLibraryTestCount.library.test.file_count -= 1;
    finalize(wrongLibraryTestCount, "manifest_sha256");
    const wrongLibraryTestCountPath = resolve(fixture, "keyframes-wrong-library-test-count.json");
    writeJson(wrongLibraryTestCountPath, wrongLibraryTestCount);
    reject("keyframes wrong library test count", ["--keyframes-manifest", wrongLibraryTestCountPath], "external-test count");

    const wrongDemoTestHash = structuredClone(canonicalKeyframes);
    wrongDemoTestHash.demo.test.files_sha256 = "0".repeat(64);
    finalize(wrongDemoTestHash, "manifest_sha256");
    const wrongDemoTestHashPath = resolve(fixture, "keyframes-wrong-demo-test-hash.json");
    writeJson(wrongDemoTestHashPath, wrongDemoTestHash);
    reject("keyframes wrong demo test hash", ["--keyframes-manifest", wrongDemoTestHashPath], "external-test vector hash");

    const supportEscape = structuredClone(canonicalKeyframes);
    supportEscape.demo.test.support_exceptions = [{ source: "demo/app/root.vue", reason: "skip" }];
    finalize(supportEscape, "manifest_sha256");
    const supportEscapePath = resolve(fixture, "keyframes-support-escape.json");
    writeJson(supportEscapePath, supportEscape);
    reject("keyframes untyped support escape", ["--keyframes-manifest", supportEscapePath], "exact mirror admits no untyped support exception");

    const wrongDemoTestRoot = structuredClone(canonicalKeyframes);
    wrongDemoTestRoot.demo.test.root = "test/other";
    finalize(wrongDemoTestRoot, "manifest_sha256");
    const wrongDemoTestRootPath = resolve(fixture, "keyframes-wrong-demo-test-root.json");
    writeJson(wrongDemoTestRootPath, wrongDemoTestRoot);
    reject("keyframes wrong demo test root", ["--keyframes-manifest", wrongDemoTestRootPath], "authority lacks exact test mirror root");

    const staleSnapshot = executionTarget(css, cssPath);
    staleSnapshot.authority.library.grammar_snapshot.file_sha256 = "0".repeat(64);
    finalize(staleSnapshot, "manifest_sha256");
    const stalePath = resolve(fixture, "stale-snapshot.json");
    writeJson(stalePath, staleSnapshot);
    reject("stale execution snapshot", ["--value-manifest", stalePath, "--value-root", fixture, "--css-manifest", cssPath], "grammar snapshot file hash");

    const missingGrammar = executionTarget(css, cssPath);
    missingGrammar.library.files = missingGrammar.library.files.filter((path) => path !== css.modules[0].typescript_path);
    missingGrammar.library.test.files = missingGrammar.library.test.files.filter((path) => path !== css.modules[0].test_path);
    finalize(missingGrammar, "manifest_sha256");
    const missingGrammarPath = resolve(fixture, "missing-grammar.json");
    writeJson(missingGrammarPath, missingGrammar);
    reject("missing execution grammar", ["--value-manifest", missingGrammarPath, "--value-root", fixture, "--css-manifest", cssPath], "grammar source projection");

    const cssOwner = css.modules.find(({ imports }) => imports.length > 0);
    const cssOwnerSource = resolve(fixture, cssOwner.typescript_path);
    const cssOwnerTest = resolve(fixture, cssOwner.test_path);
    const originalSource = readFileSync(cssOwnerSource, "utf8");
    const originalTest = readFileSync(cssOwnerTest, "utf8");
    rmSync(cssOwnerSource);
    reject("missing grammar peer file", common, "/filesystem/typescript: missing mapped file");
    writeText(cssOwnerSource, originalSource);

    const extraPeer = resolve(fixture, "src/css/grammar/l4/undeclared.ts");
    writeText(extraPeer, "export const undeclared = true;\n");
    reject("extra grammar peer file", common, "/filesystem/typescript: undeclared regular file");
    rmSync(extraPeer);

    writeText(cssOwnerSource, originalSource.replace(
        /import \{([^}\n]*\bdependency0\b[^}]*)\} from/,
        "import type {$1} from",
    ));
    reject("wrong grammar runtime edge", common, "runtime imports must equal the mapped BBNF DAG");
    writeText(cssOwnerSource, originalSource);

    writeText(cssOwnerTest, originalTest.replace(`${identifierFor(cssOwner)}(\"sample\")`, '"sample"'));
    reject("unexercised grammar test", common, "must exercise the mapped peer");
    writeText(cssOwnerTest, originalTest);

    const unresolvedFinal = executionTarget(css, cssPath, true);
    unresolvedFinal.library.conditional_paths = structuredClone(canonicalValue.library.conditional_paths);
    finalize(unresolvedFinal, "manifest_sha256");
    const unresolvedFinalPath = resolve(fixture, "unresolved-final.json");
    writeJson(unresolvedFinalPath, unresolvedFinal);
    reject(
        "unresolved final conditional",
        [
            "--value-manifest", unresolvedFinalPath,
            "--value-root", fixture,
            "--css-manifest", cssPath,
            "--conditional-resolutions", keepResolutions.path,
            "--final",
        ],
        "final conditional path ledger must contain exactly 0 rows",
    );

    const aliasedFormation = structuredClone(canonicalValue);
    aliasedFormation.authority.library.grammar_snapshot.snapshot_kind = "execution-input";
    finalize(aliasedFormation, "manifest_sha256");
    const aliasedPath = resolve(fixture, "aliased-formation.json");
    writeJson(aliasedPath, aliasedFormation);
    reject("formation promoted in place", ["--value-manifest", aliasedPath], "formation mode requires formation-current");

    const extraProperty = structuredClone(canonicalValue);
    extraProperty.undeclared_authority = true;
    finalize(extraProperty, "manifest_sha256");
    const extraPropertyPath = resolve(fixture, "extra-property.json");
    writeJson(extraPropertyPath, extraProperty);
    reject("undeclared target property", ["--value-manifest", extraPropertyPath], "value: exact keys");
} finally {
    rmSync(fixture, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({ schema: "vnext-target-paths-selftest/1", positives: 4, adversarial_rejections: 16 })}\n`);
