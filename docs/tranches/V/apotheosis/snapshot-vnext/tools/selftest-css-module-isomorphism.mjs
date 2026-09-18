#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    mkdirSync,
    mkdtempSync,
    readFileSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const validator = resolve(root, "tools/validate-css-module-isomorphism.mjs");
const canonicalManifestPath = resolve(root, "CSS-MODULE-ISOMORPHISM.json");
const canonicalBytes = readFileSync(canonicalManifestPath);
const canonicalBytesHash = sha256(canonicalBytes);
const canonicalFormation = parseJsonStrict(canonicalBytes);
const fixture = mkdtempSync(join(tmpdir(), "vnext-css-module-isomorphism-"));
const failures = [];
const positives = [];
const rejections = [];
const sharedDataContents = "export const SHARED_DATA = Object.freeze({ source: \"fixture\" });\n";

function sha256(input) {
    return createHash("sha256").update(input).digest("hex");
}

function clone(value) {
    return structuredClone(value);
}

function refreshAuthority(manifest) {
    manifest.authority.runtime_modules_sha256 = sha256(canonicalize(manifest.modules.map(({ bbnf_path }) => bbnf_path)));
    manifest.authority.excluded_dispositions_sha256 = sha256(canonicalize(manifest.excluded.map(({ bbnf_path, disposition }) => ({ bbnf_path, disposition }))));
    manifest.authority.resolved_edges_sha256 = sha256(canonicalize(manifest.modules.map(({ bbnf_path, imports }) => ({ bbnf_path, imports }))));
}

function finalizeManifest(manifest, { authority = false } = {}) {
    if (authority) refreshAuthority(manifest);
    const preimage = clone(manifest);
    delete preimage.manifest_hash;
    manifest.manifest_hash = sha256(canonicalize(preimage));
    return manifest;
}

function executionManifest() {
    const manifest = clone(canonicalFormation);
    manifest.authority.snapshot_kind = "execution-input";
    for (const correction of manifest.edge_corrections) {
        const owner = manifest.modules.find(({ bbnf_path }) => bbnf_path === correction.from);
        if (!owner) throw new Error(`formation correction owner missing: ${correction.from}`);
        owner.imports = [...new Set([...owner.imports, correction.to])].sort();
    }
    manifest.edge_corrections = [];
    return finalizeManifest(manifest, { authority: true });
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

function writeText(path, contents) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, contents);
}

function sourceText(module, manifest) {
    const byBbnf = new Map(manifest.modules.map((candidate) => [candidate.bbnf_path, candidate]));
    const lines = ['import { literal } from "@mkbabb/parse-that";'];
    module.imports.forEach((dependency, index) => {
        const target = byBbnf.get(dependency);
        if (!target) throw new Error(`fixture dependency missing: ${dependency}`);
        lines.push(`import { ${identifierFor(target)} as dependency${index} } from ${JSON.stringify(logicalSpecifier(module.typescript_path, target.typescript_path))};`);
    });
    const sharedRows = (manifest.shared_typed_data_imports ?? []).filter(({ from }) => from === module.typescript_path);
    sharedRows.forEach((row, index) => {
        lines.push(`import { SHARED_DATA as sharedData${index} } from ${JSON.stringify(row.specifier)};`);
    });
    lines.push("", 'const publicParserWitness = literal("");', "void publicParserWitness;");
    module.imports.forEach((_, index) => lines.push(`void dependency${index};`));
    sharedRows.forEach((_, index) => lines.push(`void sharedData${index};`));
    lines.push(`export function ${identifierFor(module)}(input: string): string {`, "    return input;", "}", "");
    return lines.join("\n");
}

function testText(module) {
    const identifier = identifierFor(module);
    return [
        'import { describe, expect, it } from "vitest";',
        `import { ${identifier} } from ${JSON.stringify(logicalSpecifier(module.test_path, module.typescript_path))};`,
        "",
        `describe(${JSON.stringify(module.bbnf_path)}, () => {`,
        `    it("exercises its exact peer", () => {`,
        `        expect(${identifier}("sample")).toBe("sample");`,
        "    });",
        "});",
        "",
    ].join("\n");
}

function createRoots(name, manifest) {
    const directory = resolve(fixture, name);
    const typescriptRoot = resolve(directory, "src/css/grammar");
    const testRoot = resolve(directory, "test/src/css/grammar");
    mkdirSync(typescriptRoot, { recursive: true });
    mkdirSync(testRoot, { recursive: true });
    const sourcePaths = new Map();
    const testPaths = new Map();
    const sharedTargetPaths = new Map();
    for (const module of manifest.modules) {
        const sourcePath = resolve(typescriptRoot, module.typescript_path.replace(/^src\/css\/grammar\//, ""));
        const testPath = resolve(testRoot, module.test_path.replace(/^test\/src\/css\/grammar\//, ""));
        writeText(sourcePath, sourceText(module, manifest));
        writeText(testPath, testText(module));
        sourcePaths.set(module.bbnf_path, sourcePath);
        testPaths.set(module.bbnf_path, testPath);
    }
    for (const row of manifest.shared_typed_data_imports ?? []) {
        const targetPath = resolve(directory, row.target);
        writeText(targetPath, sharedDataContents);
        sharedTargetPaths.set(row.target, targetPath);
    }

    // A mapped peer used only for a type does not create a runtime grammar edge.
    const typeOnlyOwner = manifest.modules.find(({ bbnf_path }) => bbnf_path.endsWith("/keywords.bbnf"));
    const typeOnlyTarget = manifest.modules.find(({ bbnf_path }) => bbnf_path.endsWith("/color.bbnf"));
    if (typeOnlyOwner && typeOnlyTarget) {
        const path = sourcePaths.get(typeOnlyOwner.bbnf_path);
        const contents = readFileSync(path, "utf8");
        writeFileSync(path, `import type { ${identifierFor(typeOnlyTarget)} as FormationOnlyColorType } from ${JSON.stringify(logicalSpecifier(typeOnlyOwner.typescript_path, typeOnlyTarget.typescript_path))};\n${contents}`);
    }
    return { directory, typescriptRoot, testRoot, sourcePaths, testPaths, sharedTargetPaths };
}

function run(name, manifest, roots = {}) {
    const manifestPath = resolve(fixture, `${name}.json`);
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    const args = [validator, "--manifest", manifestPath];
    if (roots.typescriptRoot !== undefined) args.push("--typescript-root", roots.typescriptRoot);
    if (roots.testRoot !== undefined) args.push("--test-root", roots.testRoot);
    return spawnSync(process.execPath, args, {
        cwd: resolve(root, "../../../.."),
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
    });
}

function expectAccepted(name, manifest, roots, inspect) {
    const result = run(name, manifest, roots);
    if (result.status !== 0 || result.signal !== null) {
        failures.push(`${name} did not pass; status=${result.status}; signal=${result.signal}; stderr=${result.stderr}`);
        return;
    }
    let receipt;
    try {
        receipt = parseJsonStrict(result.stdout);
    } catch (error) {
        failures.push(`${name} emitted invalid JSON: ${error.message}`);
        return;
    }
    try {
        inspect(receipt);
        positives.push(name);
    } catch (error) {
        failures.push(`${name} receipt mismatch: ${error.message}`);
    }
}

function expectRejected(name, manifest, roots, fragment) {
    const result = run(name, manifest, roots);
    if (result.status !== 1 || result.signal !== null || !result.stderr.includes(fragment)) {
        failures.push(`${name} was not rejected with ${JSON.stringify(fragment)}; status=${result.status}; signal=${result.signal}; stderr=${result.stderr}`);
        return;
    }
    rejections.push(name);
}

function requireReceipt(condition, message) {
    if (!condition) throw new Error(message);
}

function append(path, contents) {
    writeFileSync(path, `${readFileSync(path, "utf8")}${contents}`);
}

try {
    const formation = finalizeManifest(clone(canonicalFormation));
    expectAccepted("positive-formation", formation, {}, (receipt) => {
        requireReceipt(receipt.snapshot_kind === "formation-current", "snapshot kind is not formation-current");
        requireReceipt(receipt.modules === formation.modules.length, "formation module count drift");
        requireReceipt(receipt.excluded === formation.excluded.length, "formation exclusion count drift");
        requireReceipt(receipt.filesystem_join === false, "formation unexpectedly joined implementation roots");
        requireReceipt(receipt.manifest_hash === formation.manifest_hash, "formation hash drift");
    });

    const execution = executionManifest();
    const positiveRoots = createRoots("positive-execution-roots", execution);
    expectAccepted("positive-execution", execution, positiveRoots, (receipt) => {
        requireReceipt(receipt.snapshot_kind === "execution-input", "snapshot kind is not execution-input");
        requireReceipt(receipt.modules === execution.modules.length, "execution module count drift");
        requireReceipt(receipt.edge_corrections === 0, "execution retained a correction");
        requireReceipt(receipt.filesystem_join === true, "execution did not join implementation roots");
        requireReceipt(receipt.manifest_hash === execution.manifest_hash, "execution hash drift");
    });

    const sharedExecution = clone(execution);
    const sharedOwner = sharedExecution.modules.find(({ bbnf_path }) => bbnf_path.endsWith("/color.bbnf"));
    sharedExecution.shared_typed_data_imports = [{
        from: sharedOwner.typescript_path,
        specifier: "../../../css-data/named-colors.js",
        target: "src/css-data/named-colors.ts",
        sha256: sha256(sharedDataContents),
        kind: "shared-typed-data",
    }];
    finalizeManifest(sharedExecution);
    const sharedRoots = createRoots("positive-shared-data-roots", sharedExecution);
    expectAccepted("positive-shared-typed-data", sharedExecution, sharedRoots, (receipt) => {
        requireReceipt(receipt.filesystem_join === true, "shared-data control did not join roots");
    });

    const parseThatOwner = execution.modules.find(({ bbnf_path }) => bbnf_path.endsWith("/color.bbnf"));
    const sideEffectParseThatRoots = createRoots("side-effect-parse-that-roots", execution);
    const sideEffectParseThatPath = sideEffectParseThatRoots.sourcePaths.get(parseThatOwner.bbnf_path);
    writeFileSync(sideEffectParseThatPath, readFileSync(sideEffectParseThatPath, "utf8")
        .replace('import { literal } from "@mkbabb/parse-that";', 'import "@mkbabb/parse-that";'));
    expectRejected("side-effect-parse-that-import", execution, sideEffectParseThatRoots, "must value-import a binding from exact public @mkbabb/parse-that");

    const typeOnlyParseThatRoots = createRoots("type-only-parse-that-roots", execution);
    const typeOnlyParseThatPath = typeOnlyParseThatRoots.sourcePaths.get(parseThatOwner.bbnf_path);
    writeFileSync(typeOnlyParseThatPath, readFileSync(typeOnlyParseThatPath, "utf8")
        .replace('import { literal } from "@mkbabb/parse-that";', 'import type { literal } from "@mkbabb/parse-that";'));
    expectRejected("type-only-parse-that-import", execution, typeOnlyParseThatRoots, "must value-import a binding from exact public @mkbabb/parse-that");

    const unusedParseThatRoots = createRoots("unused-parse-that-roots", execution);
    const unusedParseThatPath = unusedParseThatRoots.sourcePaths.get(parseThatOwner.bbnf_path);
    writeFileSync(unusedParseThatPath, readFileSync(unusedParseThatPath, "utf8")
        .replace('const publicParserWitness = literal("");\nvoid publicParserWitness;', "void literal;"));
    expectRejected("unused-parse-that-binding", execution, unusedParseThatRoots, "must exercise a non-shadowed public @mkbabb/parse-that binding");

    const shadowedParseThatRoots = createRoots("shadowed-parse-that-roots", execution);
    const shadowedParseThatPath = shadowedParseThatRoots.sourcePaths.get(parseThatOwner.bbnf_path);
    writeFileSync(shadowedParseThatPath, readFileSync(shadowedParseThatPath, "utf8").replace(
        'literal("")',
        '((literal: (input: string) => unknown) => literal(""))((input) => input)',
    ));
    expectRejected("shadowed-parse-that-binding", execution, shadowedParseThatRoots, "must exercise a non-shadowed public @mkbabb/parse-that binding");

    const pairedRoots = createRoots("paired-root-mutants", execution);
    expectRejected("typescript-root-only", execution, { typescriptRoot: pairedRoots.typescriptRoot }, "must be supplied together");
    expectRejected("test-root-only", execution, { testRoot: pairedRoots.testRoot }, "must be supplied together");
    expectRejected("formation-cannot-authorize-roots", formation, pairedRoots, "formation receipt cannot authorize implementation");

    const omittedPartition = clone(execution);
    omittedPartition.excluded.pop();
    finalizeManifest(omittedPartition, { authority: true });
    expectRejected("omitted-partition-entry", omittedPartition, {}, "/modules+/excluded");

    const relabelledPartition = clone(execution);
    const relabelledIndex = relabelledPartition.modules.findIndex(({ bbnf_path }) => bbnf_path.endsWith("/stylesheet.bbnf"));
    const [relabelled] = relabelledPartition.modules.splice(relabelledIndex, 1);
    relabelledPartition.excluded.push({
        bbnf_path: relabelled.bbnf_path,
        bbnf_sha256: relabelled.bbnf_sha256,
        disposition: "serialization-test-oracle-only",
        reason: "synthetic hostile relabel",
    });
    relabelledPartition.excluded.sort((left, right) => compareCanonicalText(left.bbnf_path, right.bbnf_path));
    const runtimeAuthorityPin = relabelledPartition.authority.runtime_modules_sha256;
    refreshAuthority(relabelledPartition);
    relabelledPartition.authority.runtime_modules_sha256 = runtimeAuthorityPin;
    finalizeManifest(relabelledPartition);
    expectRejected("relabelled-runtime-partition", relabelledPartition, {}, "/authority/runtime_modules_sha256");

    const correctedExecution = clone(execution);
    correctedExecution.edge_corrections = clone(canonicalFormation.edge_corrections);
    finalizeManifest(correctedExecution);
    expectRejected("execution-edge-correction", correctedExecution, {}, "/edge_corrections");

    const wrongTestRoots = createRoots("wrong-test-roots", execution);
    const testOwner = execution.modules.find(({ bbnf_path }) => bbnf_path.endsWith("/color.bbnf"));
    const wrongPeer = execution.modules.find(({ bbnf_path }) => bbnf_path.endsWith("/keywords.bbnf"));
    const wrongTestPath = wrongTestRoots.testPaths.get(testOwner.bbnf_path);
    writeFileSync(wrongTestPath, readFileSync(wrongTestPath, "utf8").replace(
        logicalSpecifier(testOwner.test_path, testOwner.typescript_path),
        logicalSpecifier(testOwner.test_path, wrongPeer.typescript_path),
    ));
    expectRejected("wrong-test-peer", execution, wrongTestRoots, "test grammar import must name its exact mapped peer");

    const unexercisedRoots = createRoots("unexercised-test-roots", execution);
    const unexercisedPath = unexercisedRoots.testPaths.get(testOwner.bbnf_path);
    writeFileSync(unexercisedPath, readFileSync(unexercisedPath, "utf8").replace(
        `${identifierFor(testOwner)}("sample")`,
        '"sample"',
    ));
    expectRejected("unexercised-test-peer", execution, unexercisedRoots, "must exercise the mapped peer");

    const shadowedExerciseRoots = createRoots("shadowed-exercise-roots", execution);
    const shadowedExercisePath = shadowedExerciseRoots.testPaths.get(testOwner.bbnf_path);
    writeFileSync(shadowedExercisePath, readFileSync(shadowedExercisePath, "utf8").replace(
        `${identifierFor(testOwner)}("sample")`,
        `((${identifierFor(testOwner)}: (input: string) => string) => ${identifierFor(testOwner)}("sample"))((input) => input)`,
    ));
    expectRejected("shadowed-test-exercise", execution, shadowedExerciseRoots, "must exercise the mapped peer");

    const missingPeerRoots = createRoots("missing-peer-roots", execution);
    rmSync(missingPeerRoots.sourcePaths.get(testOwner.bbnf_path));
    expectRejected("missing-typescript-peer", execution, missingPeerRoots, "/filesystem/typescript: missing mapped file");

    const extraPeerRoots = createRoots("extra-peer-roots", execution);
    writeText(resolve(extraPeerRoots.typescriptRoot, "l4/extra.ts"), "export const extra = true;\n");
    expectRejected("extra-typescript-peer", execution, extraPeerRoots, "/filesystem/typescript: undeclared regular file");

    const missingTestRoots = createRoots("missing-test-roots", execution);
    rmSync(missingTestRoots.testPaths.get(testOwner.bbnf_path));
    expectRejected("missing-external-test", execution, missingTestRoots, "/filesystem/test: missing mapped file");

    const extraTestRoots = createRoots("extra-test-roots", execution);
    writeText(resolve(extraTestRoots.testRoot, "l4/extra.test.ts"), "export const extra = true;\n");
    expectRejected("extra-external-test", execution, extraTestRoots, "/filesystem/test: undeclared regular file");

    const extraJsRoots = createRoots("extra-js-roots", execution);
    writeText(resolve(extraJsRoots.typescriptRoot, "l4/generated-parser.js"), "export const generated = true;\n");
    expectRejected("extra-javascript-runtime", execution, extraJsRoots, "/filesystem/typescript: undeclared regular file");

    const extraWasmRoots = createRoots("extra-wasm-roots", execution);
    writeFileSync(resolve(extraWasmRoots.typescriptRoot, "l4/parser.wasm"), Buffer.from([0, 97, 115, 109]));
    expectRejected("extra-wasm-runtime", execution, extraWasmRoots, "/filesystem/typescript: undeclared regular file");

    const malformedSourceRoots = createRoots("malformed-source-roots", execution);
    append(malformedSourceRoots.sourcePaths.get(testOwner.bbnf_path), "export const broken = ;\n");
    expectRejected("typescript-syntax-diagnostic", execution, malformedSourceRoots, "TypeScript syntax diagnostic");

    const malformedTestRoots = createRoots("malformed-test-roots", execution);
    append(malformedTestRoots.testPaths.get(testOwner.bbnf_path), "it(\"broken\", () => {\n");
    expectRejected("test-syntax-diagnostic", execution, malformedTestRoots, "TypeScript syntax diagnostic");

    const missingEdgeRoots = createRoots("missing-edge-roots", execution);
    const edgeOwner = execution.modules.find(({ bbnf_path }) => bbnf_path.endsWith("/color.bbnf"));
    const edgeTarget = execution.modules.find(({ bbnf_path }) => bbnf_path === edgeOwner.imports[0]);
    const edgeSourcePath = missingEdgeRoots.sourcePaths.get(edgeOwner.bbnf_path);
    const valueImport = `import { ${identifierFor(edgeTarget)} as dependency0 } from ${JSON.stringify(logicalSpecifier(edgeOwner.typescript_path, edgeTarget.typescript_path))};`;
    writeFileSync(edgeSourcePath, readFileSync(edgeSourcePath, "utf8").replace(valueImport, valueImport.replace("import {", "import type {")));
    expectRejected("type-only-missing-runtime-edge", execution, missingEdgeRoots, "runtime imports must equal the mapped BBNF DAG");

    const extraEdgeRoots = createRoots("extra-edge-roots", execution);
    const extraEdgePath = extraEdgeRoots.sourcePaths.get(edgeOwner.bbnf_path);
    const extraEdgeLine = `import { ${identifierFor(wrongPeer)} as hostileExtraEdge } from ${JSON.stringify(logicalSpecifier(edgeOwner.typescript_path, wrongPeer.typescript_path))};\n`;
    writeFileSync(extraEdgePath, readFileSync(extraEdgePath, "utf8").replace('\n\nconst publicParserWitness', `\n${extraEdgeLine}\nconst publicParserWitness`));
    expectRejected("extra-runtime-edge", execution, extraEdgeRoots, "runtime imports must equal the mapped BBNF DAG");

    const dynamicImportRoots = createRoots("dynamic-import-roots", execution);
    append(dynamicImportRoots.sourcePaths.get(testOwner.bbnf_path), 'void import("@mkbabb/parse-that");\n');
    expectRejected("dynamic-import", execution, dynamicImportRoots, "dynamic import is forbidden");

    const requireRoots = createRoots("require-roots", execution);
    append(requireRoots.sourcePaths.get(testOwner.bbnf_path), 'void require("@mkbabb/parse-that");\n');
    expectRejected("commonjs-require", execution, requireRoots, "require() is forbidden");

    const importEqualsRoots = createRoots("import-equals-roots", execution);
    append(importEqualsRoots.sourcePaths.get(testOwner.bbnf_path), 'import parserRuntime = require("@mkbabb/parse-that");\nvoid parserRuntime;\n');
    expectRejected("import-equals", execution, importEqualsRoots, "import-equals is forbidden");

    const privateEntryRoots = createRoots("private-entry-roots", execution);
    append(privateEntryRoots.sourcePaths.get(testOwner.bbnf_path), 'import { hidden } from "@mkbabb/parse-that/internal";\nvoid hidden;\n');
    expectRejected("private-parse-that-entry", execution, privateEntryRoots, "only the exact public @mkbabb/parse-that entry point is allowed");

    const generatedEntryRoots = createRoots("generated-entry-roots", execution);
    append(generatedEntryRoots.sourcePaths.get(testOwner.bbnf_path), 'import { parser } from "./generated-parser.js";\nvoid parser;\n');
    expectRejected("generated-parser-entry", execution, generatedEntryRoots, "generated parser runtime entry point is forbidden");

    const alternateEntryRoots = createRoots("alternate-entry-roots", execution);
    append(alternateEntryRoots.sourcePaths.get(testOwner.bbnf_path), 'import { parser } from "./alternate-runtime.js";\nvoid parser;\n');
    expectRejected("alternate-runtime-entry", execution, alternateEntryRoots, "alternate parser runtime entry point is forbidden");

    const undeclaredSharedRoots = createRoots("undeclared-shared-roots", execution);
    append(undeclaredSharedRoots.sourcePaths.get(testOwner.bbnf_path), 'import { SHARED_DATA } from "../../../css-data/named-colors.js";\nvoid SHARED_DATA;\n');
    expectRejected("undeclared-shared-data", execution, undeclaredSharedRoots, "closed public/runtime/shared-data allowlist");

    const unusedSharedRoots = createRoots("unused-shared-roots", sharedExecution);
    const unusedSharedPath = unusedSharedRoots.sourcePaths.get(testOwner.bbnf_path);
    writeFileSync(unusedSharedPath, readFileSync(unusedSharedPath, "utf8")
        .replace(/^import \{ SHARED_DATA as sharedData0 \}.*\n/m, "")
        .replace(/^void sharedData0;\n/m, ""));
    expectRejected("unused-shared-data-authority", sharedExecution, unusedSharedRoots, "declared shared-data import is not used");

    const wrongSharedTarget = clone(sharedExecution);
    wrongSharedTarget.shared_typed_data_imports[0].target = "src/css-data/wrong-target.ts";
    finalizeManifest(wrongSharedTarget);
    const wrongSharedTargetRoots = createRoots("wrong-shared-target-roots", wrongSharedTarget);
    expectRejected("wrong-shared-data-target", wrongSharedTarget, wrongSharedTargetRoots, "/target: from + specifier resolves to");

    const wrongSharedHash = clone(sharedExecution);
    wrongSharedHash.shared_typed_data_imports[0].sha256 = "0".repeat(64);
    finalizeManifest(wrongSharedHash);
    const wrongSharedHashRoots = createRoots("wrong-shared-hash-roots", wrongSharedHash);
    expectRejected("wrong-shared-data-hash", wrongSharedHash, wrongSharedHashRoots, "/sha256: computed");

    const missingSharedTargetRoots = createRoots("missing-shared-target-roots", sharedExecution);
    rmSync(missingSharedTargetRoots.sharedTargetPaths.get("src/css-data/named-colors.ts"));
    expectRejected("missing-shared-data-target", sharedExecution, missingSharedTargetRoots, "missing shared typed-data file");

    const symlinkedSharedTargetRoots = createRoots("symlinked-shared-target-roots", sharedExecution);
    const symlinkedTarget = symlinkedSharedTargetRoots.sharedTargetPaths.get("src/css-data/named-colors.ts");
    const alternateTarget = resolve(dirname(symlinkedTarget), "alternate.ts");
    writeText(alternateTarget, sharedDataContents);
    rmSync(symlinkedTarget);
    symlinkSync("alternate.ts", symlinkedTarget, "file");
    expectRejected("symlinked-shared-data-target", sharedExecution, symlinkedSharedTargetRoots, "shared typed-data symlink is forbidden");

    const malformedSharedTarget = clone(sharedExecution);
    const malformedSharedTargetRoots = createRoots("malformed-shared-target-roots", malformedSharedTarget);
    const malformedSharedPath = malformedSharedTargetRoots.sharedTargetPaths.get("src/css-data/named-colors.ts");
    append(malformedSharedPath, "export const broken = ;\n");
    malformedSharedTarget.shared_typed_data_imports[0].sha256 = sha256(readFileSync(malformedSharedPath));
    finalizeManifest(malformedSharedTarget);
    expectRejected("malformed-shared-data-target", malformedSharedTarget, malformedSharedTargetRoots, "TypeScript syntax diagnostic");

    const staleAuthority = clone(execution);
    staleAuthority.authority.resolved_edges_sha256 = "0".repeat(64);
    finalizeManifest(staleAuthority);
    expectRejected("stale-resolved-edge-authority", staleAuthority, {}, "/authority/resolved_edges_sha256");

    if (sha256(readFileSync(canonicalManifestPath)) !== canonicalBytesHash) {
        failures.push("canonical formation manifest bytes changed during self-test");
    }
} finally {
    rmSync(fixture, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(`${JSON.stringify({
    schema: "vnext-css-module-isomorphism-selftest/1",
    positives,
    positive_count: positives.length,
    rejections,
    rejection_count: rejections.length,
    canonical_formation_manifest: "byte-preserved",
    execution_import_authority: "manifest-resolved-edge-vector-not-bbnf-regex",
}, null, 2)}\n`);
