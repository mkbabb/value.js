#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, extname, posix, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const canonicalFormationManifestPath = resolve(root, "CSS-MODULE-ISOMORPHISM.json");
let manifestPath = canonicalFormationManifestPath;
let typescriptRoot;
let testRoot;
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--manifest" && process.argv[index + 1]) manifestPath = resolve(process.argv[++index]);
    else if (process.argv[index] === "--typescript-root" && process.argv[index + 1]) typescriptRoot = resolve(process.argv[++index]);
    else if (process.argv[index] === "--test-root" && process.argv[index + 1]) testRoot = resolve(process.argv[++index]);
    else {
        process.stderr.write("usage: node validate-css-module-isomorphism.mjs [--manifest <path>] [--typescript-root <src/css/grammar>] [--test-root <test/src/css/grammar>]\n");
        process.exit(2);
    }
}

const manifest = parseJsonStrict(readFileSync(manifestPath));
const schema = parseJsonStrict(readFileSync(resolve(root, "css-module-isomorphism.schema.json")));
const failures = validateJsonSchema(manifest, schema);
const fail = (message) => failures.push(message);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const repository = "/Users/mkbabb/Programming/bbnf-lang";
const runGit = (args) => execFileSync("git", ["-C", repository, ...args], { encoding: null, maxBuffer: 16 * 1024 * 1024 });
const ts = createRequire(import.meta.url)("typescript");
const manifestAliasesCanonicalFormation = realpathSync(manifestPath) === realpathSync(canonicalFormationManifestPath);

// Stop at the schema boundary so malformed arrays or objects cannot turn a
// bounded contract rejection into an uncaught JavaScript exception.
if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const hasFilesystemJoin = Boolean(typescriptRoot || testRoot);
if (Boolean(typescriptRoot) !== Boolean(testRoot)) fail("/filesystem: --typescript-root and --test-root must be supplied together");
if (hasFilesystemJoin && manifest.authority.snapshot_kind !== "execution-input") {
    fail("/filesystem: source and test roots require a distinct execution-input manifest; the formation receipt cannot authorize implementation");
}
if (manifest.authority.snapshot_kind === "execution-input" && manifestAliasesCanonicalFormation) {
    fail("/authority/snapshot_kind: the canonical CSS-MODULE-ISOMORPHISM.json is permanently formation-current; execution input must be a distinct artifact");
}

if (manifest.source.repository !== repository) fail("/source/repository: must equal the bounded active BBNF repository");
let commit;
try {
    commit = runGit(["rev-parse", `${manifest.source.commit}^{commit}`]).toString("utf8").trim();
    if (commit !== manifest.source.commit) fail(`/source/commit: resolved ${commit}`);
} catch (error) {
    fail(`/source/commit: ${error.message}`);
}

let committedPaths = [];
try {
    committedPaths = runGit(["ls-tree", "-r", "--name-only", manifest.source.commit, "--", "grammar/css"])
        .toString("utf8").trim().split("\n").filter((path) => path.endsWith(".bbnf")).sort(compareCanonicalText);
} catch (error) {
    fail(`/modules: ${error.message}`);
}
const declaredPaths = manifest.modules.map(({ bbnf_path }) => bbnf_path);
const excludedPaths = manifest.excluded.map(({ bbnf_path }) => bbnf_path);
if (canonicalize(declaredPaths) !== canonicalize([...declaredPaths].sort(compareCanonicalText))) fail("/modules: must be sorted");
if (canonicalize(excludedPaths) !== canonicalize([...excludedPaths].sort(compareCanonicalText))) fail("/excluded: must be sorted");
const partition = [...declaredPaths, ...excludedPaths].sort(compareCanonicalText);
if (new Set(partition).size !== partition.length || canonicalize(partition) !== canonicalize(committedPaths)) {
    fail("/modules+/excluded: must be an exact disjoint partition of every committed grammar/css/**/*.bbnf file");
}

const moduleSet = new Set(declaredPaths);
const typescriptByBbnf = new Map(manifest.modules.map((module) => [module.bbnf_path, module.typescript_path]));
const typescriptSet = new Set(typescriptByBbnf.values());
const moduleByTypescript = new Map(manifest.modules.map((module) => [module.typescript_path, module]));
const graph = new Map();

function parseFormationImports(source, modulePath, pointer) {
    const imports = [];
    const directive = /^\s*@import\b([^\r\n]*)/gm;
    for (const match of source.matchAll(directive)) {
        const parsed = match[1].match(/^\s*(?:\{[^}]*\}\s+from\s+)?("(?:\\.|[^"\\])*")\s*(?:[.;])?\s*(?:(?:\/\/).*?)?\s*$/);
        if (!parsed) {
            fail(`${pointer}/imports: formation import directive could not be decoded`);
            continue;
        }
        let specifier;
        try {
            specifier = JSON.parse(parsed[1]);
        } catch (error) {
            fail(`${pointer}/imports: invalid formation import path: ${error.message}`);
            continue;
        }
        imports.push(posix.normalize(posix.join(posix.dirname(modulePath), specifier)));
    }
    return imports.sort(compareCanonicalText);
}

for (const [index, module] of manifest.modules.entries()) {
    const pointer = `/modules/${index}`;
    const expectedTypescript = module.bbnf_path.replace(/^grammar\/css\//, "src/css/grammar/").replace(/\.bbnf$/, ".ts");
    if (module.typescript_path !== expectedTypescript) fail(`${pointer}/typescript_path: expected ${expectedTypescript}`);
    const expectedTest = expectedTypescript.replace(/^src\/css\/grammar\//, "test/src/css/grammar/").replace(/\.ts$/, ".test.ts");
    if (module.test_path !== expectedTest) fail(`${pointer}/test_path: expected ${expectedTest}`);
    if (canonicalize(module.imports) !== canonicalize([...module.imports].sort(compareCanonicalText))) fail(`${pointer}/imports: must be sorted`);
    let bytes;
    try {
        bytes = runGit(["show", `${manifest.source.commit}:${module.bbnf_path}`]);
    } catch (error) {
        fail(`${pointer}/bbnf_path: ${error.message}`);
        continue;
    }
    if (hash(bytes) !== module.bbnf_sha256) fail(`${pointer}/bbnf_sha256: committed bytes drift`);
    if (manifest.authority.snapshot_kind === "formation-current") {
        let source;
        try {
            source = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
        } catch (error) {
            fail(`${pointer}/bbnf_path: committed bytes are not UTF-8: ${error.message}`);
        }
        if (source !== undefined) {
            const imports = parseFormationImports(source, module.bbnf_path, pointer);
            if (canonicalize(module.imports) !== canonicalize(imports)) fail(`${pointer}/imports: formation snapshot import vector drift`);
        }
    }
    // execution-input deliberately does not parse BBNF imports here. Its
    // resolver-produced vector and digest are upstream authority, joined by P00.
    if (module.imports.some((path) => !moduleSet.has(path))) fail(`${pointer}/imports: runtime import leaves the exact CSS runtime-module partition`);
    graph.set(module.bbnf_path, new Set(module.imports));
}

for (const correction of manifest.edge_corrections) {
    if (!graph.has(correction.from) || !graph.has(correction.to)) fail("/edge_corrections: endpoint is outside the module vector");
    else graph.get(correction.from).add(correction.to);
}
if (manifest.authority.snapshot_kind === "execution-input" && manifest.edge_corrections.length !== 0) {
    fail("/edge_corrections: execution input requires the upstream BBNF union to own a zero-correction canonical DAG");
}

const visiting = new Set();
const visited = new Set();
const walk = (node, trail = []) => {
    if (visiting.has(node)) {
        fail(`/modules: corrected import graph cycle ${[...trail, node].join(" -> ")}`);
        return;
    }
    if (visited.has(node)) return;
    visiting.add(node);
    for (const dependency of graph.get(node) ?? []) walk(dependency, [...trail, node]);
    visiting.delete(node);
    visited.add(node);
};
for (const node of graph.keys()) walk(node);

for (const [index, excluded] of manifest.excluded.entries()) {
    if (moduleSet.has(excluded.bbnf_path)) fail(`/excluded/${index}/bbnf_path: runtime module cannot also be excluded`);
    try {
        const bytes = runGit(["show", `${manifest.source.commit}:${excluded.bbnf_path}`]);
        if (hash(bytes) !== excluded.bbnf_sha256) fail(`/excluded/${index}/bbnf_sha256: committed grammar drift`);
    } catch (error) {
        fail(`/excluded/${index}: ${error.message}`);
    }
}

const runtimeModulesHash = hash(canonicalize(manifest.modules.map(({ bbnf_path }) => bbnf_path)));
const excludedDispositionsHash = hash(canonicalize(manifest.excluded.map(({ bbnf_path, disposition }) => ({ bbnf_path, disposition }))));
const resolvedEdgesHash = hash(canonicalize(manifest.modules.map(({ bbnf_path, imports }) => ({ bbnf_path, imports }))));
if (manifest.authority.runtime_modules_sha256 !== runtimeModulesHash) fail(`/authority/runtime_modules_sha256: computed ${runtimeModulesHash}`);
if (manifest.authority.excluded_dispositions_sha256 !== excludedDispositionsHash) fail(`/authority/excluded_dispositions_sha256: computed ${excludedDispositionsHash}`);
if (manifest.authority.resolved_edges_sha256 !== resolvedEdgesHash) fail(`/authority/resolved_edges_sha256: computed ${resolvedEdgesHash}`);

const sharedImportRows = manifest.shared_typed_data_imports ?? [];
if (sharedImportRows.length > 4) fail("/shared_typed_data_imports: at most four exact shared-data imports are permitted");
const sortedSharedImportRows = [...sharedImportRows].sort((left, right) =>
    compareCanonicalText(left.from, right.from) || compareCanonicalText(left.specifier, right.specifier));
if (canonicalize(sharedImportRows) !== canonicalize(sortedSharedImportRows)) fail("/shared_typed_data_imports: must be sorted by from then specifier");
const sharedImports = new Map();
for (const [index, row] of sharedImportRows.entries()) {
    const key = `${row.from}\0${row.specifier}`;
    if (sharedImports.has(key)) fail(`/shared_typed_data_imports/${index}: duplicate from/specifier pair`);
    sharedImports.set(key, row);
    if (!moduleByTypescript.has(row.from)) fail(`/shared_typed_data_imports/${index}/from: must name a mapped TypeScript peer`);
    const forbidden = forbiddenSpecifierReason(row.specifier);
    if (forbidden) fail(`/shared_typed_data_imports/${index}/specifier: ${forbidden}`);
    const resolvedShared = logicalTypescriptTarget(row.from, row.specifier);
    if (resolvedShared !== row.target) fail(`/shared_typed_data_imports/${index}/target: from + specifier resolves to ${resolvedShared ?? "an unsupported target"}`);
    if (row.target.startsWith("src/css/grammar/")) fail(`/shared_typed_data_imports/${index}/target: grammar-root files must be declared runtime peers, not shared data`);
}

function listedRegularFiles(directory, pointer) {
    const files = [];
    if (!existsSync(directory)) {
        fail(`${pointer}: missing root ${directory}`);
        return files;
    }
    const rootMetadata = lstatSync(directory);
    if (rootMetadata.isSymbolicLink()) {
        fail(`${pointer}: root symlink is forbidden ${directory}`);
        return files;
    }
    if (!rootMetadata.isDirectory()) {
        fail(`${pointer}: root must be a directory ${directory}`);
        return files;
    }
    const visit = (current) => {
        const metadata = lstatSync(current);
        if (metadata.isSymbolicLink()) {
            fail(`${pointer}: symlink forbidden ${current}`);
            return;
        }
        if (metadata.isDirectory()) {
            for (const name of readdirSync(current).sort(compareCanonicalText)) visit(resolve(current, name));
        } else if (metadata.isFile()) {
            files.push(relative(directory, current).split("\\").join("/"));
        } else {
            fail(`${pointer}: non-regular filesystem entry forbidden ${current}`);
        }
    };
    for (const name of readdirSync(directory).sort(compareCanonicalText)) visit(resolve(directory, name));
    return files.sort(compareCanonicalText);
}

function compareFileVector(pointer, expected, actual) {
    const expectedSet = new Set(expected);
    const actualSet = new Set(actual);
    for (const path of expected) if (!actualSet.has(path)) fail(`${pointer}: missing mapped file ${path}`);
    for (const path of actual) if (!expectedSet.has(path)) fail(`${pointer}: undeclared regular file ${path}`);
}

function parseTypescriptFile(path, pointer) {
    let source;
    try {
        source = new TextDecoder("utf-8", { fatal: true }).decode(readFileSync(path));
    } catch (error) {
        fail(`${pointer}: TypeScript source is not readable UTF-8: ${error.message}`);
        return undefined;
    }
    const sourceFile = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.getScriptKindFromFileName(path));
    for (const diagnostic of sourceFile.parseDiagnostics ?? []) {
        const location = diagnostic.start === undefined
            ? ""
            : (() => {
                const { line, character } = sourceFile.getLineAndCharacterOfPosition(diagnostic.start);
                return ` at ${line + 1}:${character + 1}`;
            })();
        fail(`${pointer}: TypeScript syntax diagnostic TS${diagnostic.code}${location}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`);
    }
    return sourceFile;
}

function parseTypescriptTree(directory, files, pointer) {
    const parsed = new Map();
    for (const path of files) {
        if (!/\.(?:[cm]?ts|tsx)$/i.test(path)) continue;
        parsed.set(path, parseTypescriptFile(resolve(directory, path), `${pointer}/${path}`));
    }
    return parsed;
}

function moduleReferenceIsRuntime(node) {
    if (ts.isImportTypeNode(node)) return false;
    if (ts.isImportDeclaration(node)) {
        const clause = node.importClause;
        if (!clause) return true;
        if (clause.isTypeOnly) return false;
        if (clause.name || (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings))) return true;
        return clause.namedBindings?.elements.some((element) => !element.isTypeOnly) ?? false;
    }
    if (ts.isExportDeclaration(node)) {
        if (node.isTypeOnly) return false;
        if (!node.exportClause || ts.isNamespaceExport(node.exportClause)) return true;
        return node.exportClause.elements.some((element) => !element.isTypeOnly);
    }
    return false;
}

function importedRuntimeBindings(node) {
    if (!ts.isImportDeclaration(node) || !moduleReferenceIsRuntime(node) || !node.importClause) return [];
    const bindings = [];
    if (node.importClause.name) bindings.push(node.importClause.name.text);
    const named = node.importClause.namedBindings;
    if (named && ts.isNamespaceImport(named)) bindings.push(named.name.text);
    else if (named && ts.isNamedImports(named)) {
        for (const element of named.elements) if (!element.isTypeOnly) bindings.push(element.name.text);
    }
    return bindings;
}

function staticModuleReference(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteralLike(node.moduleSpecifier)) {
        return node.moduleSpecifier.text;
    }
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteralLike(node.argument.literal)) {
        return node.argument.literal.text;
    }
    return undefined;
}

function unwrapExpression(node) {
    let current = node;
    while (ts.isParenthesizedExpression(current)
        || ts.isAsExpression(current)
        || ts.isTypeAssertionExpression(current)
        || ts.isNonNullExpression(current)
        || ts.isSatisfiesExpression(current)) current = current.expression;
    return current;
}

function requireLikeCall(node) {
    if (!ts.isCallExpression(node)) return false;
    const expression = unwrapExpression(node.expression);
    if (ts.isIdentifier(expression)) return expression.text === "require";
    if (ts.isPropertyAccessExpression(expression)) {
        return expression.name.text === "require" || expressionRootName(expression.expression) === "require";
    }
    if (ts.isElementAccessExpression(expression)) {
        return expressionRootName(expression.expression) === "require"
            || (ts.isStringLiteralLike(expression.argumentExpression) && expression.argumentExpression.text === "require");
    }
    return false;
}

function expressionRootName(node) {
    const expression = unwrapExpression(node);
    if (ts.isIdentifier(expression)) return expression.text;
    if (ts.isPropertyAccessExpression(expression) || ts.isElementAccessExpression(expression)) return expressionRootName(expression.expression);
    if (ts.isCallExpression(expression)) return expressionRootName(expression.expression);
    return undefined;
}

function addBindingNames(name, bindings) {
    if (ts.isIdentifier(name)) {
        bindings.add(name.text);
        return;
    }
    if (!ts.isObjectBindingPattern(name) && !ts.isArrayBindingPattern(name)) return;
    for (const element of name.elements) {
        if (ts.isOmittedExpression(element)) continue;
        addBindingNames(element.name, bindings);
    }
}

function shadowedBindings(sourceFile, importedBindings, isOriginImport) {
    const shadowed = new Set();
    const inspect = (node) => {
        if (ts.isImportDeclaration(node)) {
            if (!isOriginImport(node)) {
                for (const binding of importedRuntimeBindings(node)) if (importedBindings.has(binding)) shadowed.add(binding);
            }
            return;
        }
        let name;
        if (ts.isVariableDeclaration(node)
            || ts.isParameter(node)
            || ts.isBindingElement(node)
            || ts.isFunctionDeclaration(node)
            || ts.isFunctionExpression(node)
            || ts.isClassDeclaration(node)
            || ts.isClassExpression(node)
            || ts.isEnumDeclaration(node)
            || ts.isModuleDeclaration(node)) name = node.name;
        if (name) {
            const declared = new Set();
            addBindingNames(name, declared);
            for (const binding of declared) if (importedBindings.has(binding)) shadowed.add(binding);
        }
        ts.forEachChild(node, inspect);
    };
    inspect(sourceFile);
    return shadowed;
}

function exercisesBinding(sourceFile, bindings) {
    let exercised = false;
    const inspect = (node) => {
        if ((ts.isCallExpression(node) || ts.isNewExpression(node)) && bindings.has(expressionRootName(node.expression))) exercised = true;
        if (ts.isTaggedTemplateExpression(node) && bindings.has(expressionRootName(node.tag))) exercised = true;
        ts.forEachChild(node, inspect);
    };
    inspect(sourceFile);
    return exercised;
}

function forbiddenSpecifierReason(specifier) {
    if (specifier.startsWith("@mkbabb/parse-that/")) return "only the exact public @mkbabb/parse-that entry point is allowed";
    if (/(?:^|[/._-])generated(?:[/._-]?parser|[/._-]?runtime)?(?:$|[/._-])/i.test(specifier)) return "generated parser runtime entry point is forbidden";
    if (/(?:^|[/._-])alternate(?:[/._-]?parser|[/._-]?runtime)?(?:$|[/._-])/i.test(specifier)) return "alternate parser runtime entry point is forbidden";
    if (/\.(?:wasm|mjs|cjs|jsx|tsx)$/i.test(specifier)) return "alternate runtime artifact entry point is forbidden";
    return undefined;
}

function logicalTypescriptTarget(importerPath, specifier) {
    if (!specifier.startsWith(".")) return undefined;
    let target = posix.normalize(posix.join(posix.dirname(importerPath), specifier));
    const extension = extname(target);
    if (!extension) target = `${target}.ts`;
    else if (extension === ".js" || extension === ".ts") target = target.slice(0, -extension.length) + ".ts";
    else return undefined;
    return target;
}

function mappedTypescriptTarget(importerPath, specifier) {
    const target = logicalTypescriptTarget(importerPath, specifier);
    return target && typescriptSet.has(target) ? target : undefined;
}

function validateSharedTarget(row, index, projectRoot) {
    const pointer = `/shared_typed_data_imports/${index}`;
    const targetPath = resolve(projectRoot, row.target);
    if (!existsSync(targetPath)) {
        fail(`${pointer}/target: missing shared typed-data file ${targetPath}`);
        return;
    }
    const metadata = lstatSync(targetPath);
    if (metadata.isSymbolicLink()) {
        fail(`${pointer}/target: shared typed-data symlink is forbidden ${targetPath}`);
        return;
    }
    if (!metadata.isFile()) {
        fail(`${pointer}/target: shared typed-data target must be a regular file ${targetPath}`);
        return;
    }
    const canonicalProjectRoot = realpathSync(projectRoot);
    const canonicalTarget = realpathSync(targetPath);
    const expectedCanonicalTarget = resolve(canonicalProjectRoot, row.target);
    if (canonicalTarget !== expectedCanonicalTarget) {
        fail(`${pointer}/target: shared typed-data target traverses a symlinked or noncanonical path`);
        return;
    }
    const computed = hash(readFileSync(targetPath));
    if (row.sha256 !== computed) fail(`${pointer}/sha256: computed ${computed}`);
    parseTypescriptFile(targetPath, `${pointer}/target`);
}

function inspectModuleSyntax(sourceFile, pointer, onReference) {
    const inspect = (node) => {
        if (ts.isImportEqualsDeclaration(node)) fail(`${pointer}: import-equals is forbidden`);
        if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) fail(`${pointer}: dynamic import is forbidden`);
        else if (requireLikeCall(node)) fail(`${pointer}: require() is forbidden`);
        const specifier = staticModuleReference(node);
        if (specifier !== undefined) onReference(node, specifier, moduleReferenceIsRuntime(node));
        ts.forEachChild(node, inspect);
    };
    inspect(sourceFile);
}

const testSupportImports = new Set(["vitest"]);
const usedSharedImports = new Set();

if (typescriptRoot && testRoot && manifest.authority.snapshot_kind === "execution-input") {
    const expectedTypescriptFiles = manifest.modules.map(({ typescript_path }) => typescript_path.replace(/^src\/css\/grammar\//, "")).sort(compareCanonicalText);
    const expectedTestFiles = manifest.modules.map(({ test_path }) => test_path.replace(/^test\/src\/css\/grammar\//, "")).sort(compareCanonicalText);
    const actualTypescriptFiles = listedRegularFiles(typescriptRoot, "/filesystem/typescript");
    const actualTestFiles = listedRegularFiles(testRoot, "/filesystem/test");
    compareFileVector("/filesystem/typescript", expectedTypescriptFiles, actualTypescriptFiles);
    compareFileVector("/filesystem/test", expectedTestFiles, actualTestFiles);
    const parsedTypescript = parseTypescriptTree(typescriptRoot, actualTypescriptFiles, "/filesystem/typescript");
    const parsedTests = parseTypescriptTree(testRoot, actualTestFiles, "/filesystem/test");
    const projectRoot = resolve(typescriptRoot, "../../..");
    const testProjectRoot = resolve(testRoot, "../../../..");
    const sourceLayoutExact = resolve(projectRoot, "src/css/grammar") === typescriptRoot;
    if (!sourceLayoutExact) fail("/filesystem/typescript: root must end in the canonical src/css/grammar path");
    if (resolve(testProjectRoot, "test/src/css/grammar") !== testRoot) fail("/filesystem/test: root must end in the canonical test/src/css/grammar path");
    if (sourceLayoutExact) {
        for (const [index, row] of sharedImportRows.entries()) validateSharedTarget(row, index, projectRoot);
    }

    for (const module of manifest.modules) {
        const relativePath = module.typescript_path.replace(/^src\/css\/grammar\//, "");
        const sourceFile = parsedTypescript.get(relativePath);
        if (!sourceFile) continue;
        const pointer = `/filesystem/typescript/${relativePath}`;
        const actualInternal = new Set();
        const parseThatBindings = new Set();
        let exactParseThatValueImport = false;
        inspectModuleSyntax(sourceFile, pointer, (node, specifier, runtime) => {
            if (specifier === "@mkbabb/parse-that") {
                const bindings = importedRuntimeBindings(node);
                if (runtime && bindings.length !== 0) {
                    exactParseThatValueImport = true;
                    for (const binding of bindings) parseThatBindings.add(binding);
                }
                return;
            }
            const forbidden = forbiddenSpecifierReason(specifier);
            if (forbidden) {
                fail(`${pointer}: ${forbidden}: ${specifier}`);
                return;
            }
            const mappedTarget = mappedTypescriptTarget(module.typescript_path, specifier);
            if (mappedTarget) {
                if (runtime) actualInternal.add(mappedTarget);
                return;
            }
            const sharedKey = `${module.typescript_path}\0${specifier}`;
            if (sharedImports.has(sharedKey)) {
                usedSharedImports.add(sharedKey);
                return;
            }
            fail(`${pointer}: import is outside the closed public/runtime/shared-data allowlist: ${specifier}`);
        });
        if (!exactParseThatValueImport) fail(`${pointer}: must value-import a binding from exact public @mkbabb/parse-that`);
        const shadowedParseThat = shadowedBindings(sourceFile, parseThatBindings, (node) =>
            ts.isStringLiteralLike(node.moduleSpecifier) && node.moduleSpecifier.text === "@mkbabb/parse-that");
        const callableParseThatBindings = new Set([...parseThatBindings].filter((binding) => !shadowedParseThat.has(binding)));
        if (!exercisesBinding(sourceFile, callableParseThatBindings)) {
            fail(`${pointer}: must exercise a non-shadowed public @mkbabb/parse-that binding with a call, construction, or tagged template`);
        }
        const expectedInternal = [...(graph.get(module.bbnf_path) ?? [])]
            .map((dependency) => typescriptByBbnf.get(dependency))
            .filter(Boolean)
            .sort(compareCanonicalText);
        if (canonicalize([...actualInternal].sort(compareCanonicalText)) !== canonicalize(expectedInternal)) {
            fail(`${pointer}: runtime imports must equal the mapped BBNF DAG`);
        }
    }

    for (const [index, row] of sharedImportRows.entries()) {
        const key = `${row.from}\0${row.specifier}`;
        if (!usedSharedImports.has(key)) fail(`/shared_typed_data_imports/${index}: declared shared-data import is not used by its exact peer`);
    }

    for (const module of manifest.modules) {
        const relativePath = module.test_path.replace(/^test\/src\/css\/grammar\//, "");
        const sourceFile = parsedTests.get(relativePath);
        if (!sourceFile) continue;
        const pointer = `/filesystem/test/${relativePath}`;
        const peerBindings = new Set();
        let exactValueImport = false;
        inspectModuleSyntax(sourceFile, pointer, (node, specifier, runtime) => {
            if (testSupportImports.has(specifier) && ts.isImportDeclaration(node)) return;
            const forbidden = forbiddenSpecifierReason(specifier);
            if (forbidden) {
                fail(`${pointer}: ${forbidden}: ${specifier}`);
                return;
            }
            const mappedTarget = mappedTypescriptTarget(module.test_path, specifier);
            if (mappedTarget) {
                if (mappedTarget !== module.typescript_path) {
                    fail(`${pointer}: test grammar import must name its exact mapped peer, found ${mappedTarget}`);
                    return;
                }
                const bindings = importedRuntimeBindings(node);
                if (runtime && bindings.length !== 0) {
                    exactValueImport = true;
                    for (const binding of bindings) peerBindings.add(binding);
                }
                return;
            }
            fail(`${pointer}: test import is outside the exact peer and test-support allowlist: ${specifier}`);
        });
        if (!exactValueImport) fail(`${pointer}: must value-import the exact mapped peer`);
        const shadowed = shadowedBindings(sourceFile, peerBindings, (node) =>
            ts.isStringLiteralLike(node.moduleSpecifier)
            && mappedTypescriptTarget(module.test_path, node.moduleSpecifier.text) === module.typescript_path);
        const callablePeerBindings = new Set([...peerBindings].filter((binding) => !shadowed.has(binding)));
        if (!exercisesBinding(sourceFile, callablePeerBindings)) fail(`${pointer}: must exercise the mapped peer with a call, construction, or tagged template`);
    }
}

const preimage = structuredClone(manifest);
delete preimage.manifest_hash;
const computed = hash(canonicalize(preimage));
if (manifest.manifest_hash !== computed) fail(`/manifest_hash: computed ${computed}`);

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
const edges = [...graph.values()].reduce((sum, dependencies) => sum + dependencies.size, 0);
process.stdout.write(`${JSON.stringify({ schema: manifest.schema, snapshot_kind: manifest.authority.snapshot_kind, modules: graph.size, excluded: excludedPaths.length, edges, edge_corrections: manifest.edge_corrections.length, filesystem_join: Boolean(typescriptRoot), source_commit: commit, manifest_hash: computed }, null, 2)}\n`);
