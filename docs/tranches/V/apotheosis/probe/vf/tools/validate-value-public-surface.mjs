#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import {
    existsSync,
    lstatSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    readdirSync,
    realpathSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import { loadValueTargetOwnerReturn, valueTargetDecisionHash } from "./value-target-owner-return.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const validatorUsage = "usage: node validate-value-public-surface.mjs --manifest <path>\n";
const expectedSpecifiers = ["./color", "./css", "./easing", "./math", "./path", "./transform"];
const expectedTombstones = [".", "./quantize", "./value"];
const v00cContractHash = loadWaveContracts().get("V00C")?.sha256;
const require = createRequire(import.meta.url);
const ts = require("typescript");
const nodeExecutable = realpathSync(process.execPath);
const npmExecutable = realpathSync(execFileSync("/usr/bin/which", ["npm"], { encoding: "utf8" }).trim());
const typescriptExecutable = realpathSync(require.resolve("typescript/lib/tsc.js"));
const npmVersion = execFileSync(npmExecutable, ["--version"], { encoding: "utf8" }).trim();
const installTimeoutMs = 60_000;
const compileTimeoutMs = 15_000;
const runtimeTimeoutMs = 2_000;
const toolchain = {
    node: { executable: nodeExecutable, version: process.version, sha256: createHash("sha256").update(readFileSync(nodeExecutable)).digest("hex") },
    npm: { executable: npmExecutable, version: npmVersion, sha256: createHash("sha256").update(readFileSync(npmExecutable)).digest("hex") },
    typescript: { executable: typescriptExecutable, version: ts.version, sha256: createHash("sha256").update(readFileSync(typescriptExecutable)).digest("hex") },
};

let manifestPath;
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--manifest" && process.argv[index + 1]) manifestPath = resolve(process.argv[++index]);
    else {
        process.stderr.write(validatorUsage);
        process.exit(2);
    }
}
if (!manifestPath) {
    process.stderr.write(validatorUsage);
    process.exit(2);
}

const failures = [];
const fail = (message) => failures.push(message);
const digest = (algorithm, bytes, encoding = "hex") => createHash(algorithm).update(bytes).digest(encoding);
const sha256 = (bytes) => digest("sha256", bytes);
const sha512 = (bytes) => digest("sha512", bytes);
const ordered = (values) => [...values].sort(compareCanonicalText);
const same = (left, right) => canonicalize(left) === canonicalize(right);

function exactKeys(value, expected, pointer) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        fail(`${pointer}: object required`);
        return false;
    }
    const actual = ordered(Object.keys(value));
    const wanted = ordered(expected);
    if (!same(actual, wanted)) fail(`${pointer}: exact keys ${wanted.join(", ")} required`);
    return same(actual, wanted);
}

function checkedRegularFile(path, pointer) {
    if (!path || !existsSync(path)) {
        fail(`${pointer}: missing file`);
        return false;
    }
    const metadata = lstatSync(path);
    if (!metadata.isFile() || metadata.isSymbolicLink()) {
        fail(`${pointer}: regular non-symlink file required`);
        return false;
    }
    if (realpathSync(path) !== path) {
        fail(`${pointer}: canonical path required`);
        return false;
    }
    return true;
}

function checkedEvidence(evidence, pointer) {
    if (!evidence || !checkedRegularFile(evidence.path, `${pointer}/path`)) return undefined;
    const bytes = readFileSync(evidence.path);
    const actual = sha256(bytes);
    if (evidence.file_sha256 !== actual) fail(`${pointer}/file_sha256: computed ${actual}`);
    return bytes;
}

function checkedSelfHash(value, member, pointer) {
    if (!value || typeof value !== "object") return undefined;
    const preimage = structuredClone(value);
    delete preimage[member];
    const actual = sha256(canonicalize(preimage));
    if (value[member] !== actual) fail(`${pointer}/${member}: computed ${actual}`);
    return actual;
}

function packageTombstoneDecision(row) {
    const decision = {
        decision_id: `package-tombstone:${row.specifier === "." ? "root" : row.specifier.slice(2)}`,
        kind: "package-tombstone",
        specifier: row.specifier,
        disposition: "tombstone",
        rationale: row.rationale,
        decision_hash: "",
    };
    decision.decision_hash = valueTargetDecisionHash("V00C", decision);
    return decision;
}

function safeArchivePath(path) {
    return typeof path === "string"
        && path.startsWith("package/")
        && !path.startsWith("/")
        && !path.includes("\\")
        && !path.includes("//")
        && !path.split("/").includes(".")
        && !path.split("/").includes("..");
}

function safePackageMemberPath(path) {
    return typeof path === "string"
        && path.length > 0
        && !path.startsWith("/")
        && !path.includes("\\")
        && !path.includes("//")
        && !path.split("/").includes(".")
        && !path.split("/").includes("..");
}

function bytesOf(value) {
    if (Buffer.isBuffer(value)) return value;
    if (value === undefined || value === null) return Buffer.alloc(0);
    return Buffer.from(String(value));
}

function processReceipt(result, command, timeoutMs) {
    const stdout = bytesOf(result.stdout);
    const stderr = bytesOf(result.stderr);
    return {
        command,
        timeout_ms: timeoutMs,
        exit_code: result.status ?? null,
        signal: result.signal ?? null,
        timed_out: result.error?.code === "ETIMEDOUT",
        stdout_bytes: stdout.length,
        stdout_sha256: sha256(stdout),
        stderr_bytes: stderr.length,
        stderr_sha256: sha256(stderr),
    };
}

function boundedEnvironment(extra = {}) {
    return {
        PATH: ordered(new Set([dirname(nodeExecutable), dirname(npmExecutable), "/usr/bin", "/bin"])).join(":"),
        LANG: "C",
        LC_ALL: "C",
        TZ: "UTC",
        NO_COLOR: "1",
        ...extra,
    };
}

function treeRows(directory, pointer, { reportLinks = true } = {}) {
    const rows = [];
    let links = 0;
    const visit = (current) => {
        for (const name of readdirSync(current).sort()) {
            const path = resolve(current, name);
            const metadata = lstatSync(path);
            const relativePath = relative(directory, path).split("\\").join("/");
            if (metadata.isSymbolicLink()) {
                links += 1;
                if (reportLinks) fail(`${pointer}: link forbidden ${relativePath}`);
            } else if (metadata.isDirectory()) visit(path);
            else if (metadata.isFile()) {
                const bytes = readFileSync(path);
                rows.push({ path: relativePath, bytes: bytes.length, sha256: sha256(bytes) });
            } else fail(`${pointer}: unsupported filesystem entry ${relativePath}`);
        }
    };
    if (existsSync(directory)) visit(directory);
    rows.sort((left, right) => compareCanonicalText(left.path, right.path));
    return { rows, links };
}

function forbiddenLocalDependency(packageJson) {
    let forbidden = false;
    for (const section of ["dependencies", "optionalDependencies", "peerDependencies", "devDependencies"]) {
        for (const [name, specifier] of Object.entries(packageJson?.[section] ?? {})) {
            if (typeof specifier === "string" && /^(?:file:|link:|workspace:)|^(?:\.{1,2}\/|\/)/.test(specifier)) {
                fail(`/package/archive/package.json/${section}/${name}: source/workspace/local dependency forbidden`);
                forbidden = true;
            }
        }
    }
    return forbidden;
}

function installBoundPackage(manifest, archiveRows) {
    const installationRoot = realpathSync(mkdtempSync(join(tmpdir(), "vnext-value-public-install-")));
    const cache = join(installationRoot, ".npm-cache");
    mkdirSync(cache, { recursive: true });
    writeFileSync(join(installationRoot, "package.json"), `${JSON.stringify({
        name: "vnext-value-public-surface-probes",
        private: true,
        version: "1.0.0",
        type: "module",
    }, null, 2)}\n`);

    const normalizedCommand = [
        npmExecutable,
        "install",
        "--silent",
        "--ignore-scripts",
        "--no-audit",
        "--no-fund",
        "--package-lock=true",
        "--install-links=true",
        "--save-exact",
        "$TARBALL",
    ];
    const actualArguments = [...normalizedCommand.slice(1, -1), manifest.package.tarball.path];
    const result = spawnSync(npmExecutable, actualArguments, {
        cwd: installationRoot,
        env: boundedEnvironment({
            npm_config_cache: cache,
            npm_config_ignore_scripts: "true",
            npm_config_audit: "false",
            npm_config_fund: "false",
            npm_config_update_notifier: "false",
        }),
        encoding: null,
        timeout: installTimeoutMs,
        maxBuffer: 64 * 1024 * 1024,
    });
    const process = processReceipt(result, normalizedCommand, installTimeoutMs);
    if (process.timed_out) fail("/semantic_evidence/install: npm install timed out");
    if (process.exit_code !== 0 || process.signal !== null) fail("/semantic_evidence/install: exact tarball npm install failed");

    const nodeModules = join(installationRoot, "node_modules");
    const installedPackage = join(nodeModules, "@mkbabb", "value.js");
    const nodeModulesScan = treeRows(nodeModules, "/semantic_evidence/install/node_modules");
    let installedRows = [];
    if (!existsSync(installedPackage)) fail("/semantic_evidence/install: installed @mkbabb/value.js missing");
    else {
        const metadata = lstatSync(installedPackage);
        if (!metadata.isDirectory() || metadata.isSymbolicLink() || realpathSync(installedPackage) !== installedPackage) {
            fail("/semantic_evidence/install: package must be a real no-link directory");
        } else installedRows = treeRows(installedPackage, "/semantic_evidence/install/package").rows;
    }
    if (!same(installedRows, archiveRows)) fail("/semantic_evidence/install: installed package tree differs from exact tarball bytes");

    const lockPath = join(installationRoot, "package-lock.json");
    if (!existsSync(lockPath)) fail("/semantic_evidence/install: package-lock.json missing");
    else {
        try {
            const lock = parseJsonStrict(readFileSync(lockPath));
            const packageRecord = lock.packages?.["node_modules/@mkbabb/value.js"];
            if (
                packageRecord?.version !== manifest.package.version
                || packageRecord?.integrity !== manifest.package.tarball.integrity
                || packageRecord?.link === true
                || typeof packageRecord?.resolved !== "string"
                || !packageRecord.resolved.startsWith("file:")
                || !packageRecord.resolved.endsWith(".tgz")
            ) fail("/semantic_evidence/install/package-lock.json: exact non-link tarball record required");
            for (const [path, record] of Object.entries(lock.packages ?? {})) {
                if (record?.link === true) fail(`/semantic_evidence/install/package-lock.json: workspace/link record forbidden ${path}`);
                if (path !== "node_modules/@mkbabb/value.js" && typeof record?.resolved === "string" && /^(?:file:|link:|workspace:)/.test(record.resolved)) {
                    fail(`/semantic_evidence/install/package-lock.json: local dependency record forbidden ${path}`);
                }
            }
        } catch (error) {
            fail(`/semantic_evidence/install/package-lock.json: strict JSON parse failed: ${error.message}`);
        }
    }

    const packageTreeSha256 = sha256(canonicalize(installedRows));
    const receipt = {
        ...process,
        package_integrity: manifest.package.tarball.integrity,
        package_tree_sha256: packageTreeSha256,
        link_count: nodeModulesScan.links,
    };
    receipt.receipt_hash = sha256(canonicalize(receipt));
    return {
        root: installationRoot,
        packagePath: installedPackage,
        receipt,
        ready: process.exit_code === 0 && process.signal === null && !process.timed_out && nodeModulesScan.links === 0 && same(installedRows, archiveRows),
    };
}

function inspectTarball(tarball) {
    if (!tarball || !checkedRegularFile(tarball.path, "/package/tarball/path")) return { files: [], contents: new Map() };
    const bytes = readFileSync(tarball.path);
    if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) fail("/package/tarball/path: gzip tarball required");
    const computedSha256 = sha256(bytes);
    const computedSha512 = sha512(bytes);
    const computedIntegrity = `sha512-${digest("sha512", bytes, "base64")}`;
    if (tarball.sha256 !== computedSha256) fail(`/package/tarball/sha256: computed ${computedSha256}`);
    if (tarball.sha512 !== computedSha512) fail(`/package/tarball/sha512: computed ${computedSha512}`);
    if (tarball.integrity !== computedIntegrity) fail(`/package/tarball/integrity: computed ${computedIntegrity}`);

    const files = [];
    const contents = new Map();
    try {
        const listing = execFileSync("/usr/bin/tar", ["-tzf", tarball.path], {
            encoding: "utf8",
            maxBuffer: 32 * 1024 * 1024,
        }).trim().split("\n").filter(Boolean);
        if (new Set(listing).size !== listing.length) fail("/package/archive: duplicate archive path");
        for (const path of listing) if (!safeArchivePath(path)) fail(`/package/archive: unsafe or non-package path ${JSON.stringify(path)}`);

        const verbose = execFileSync("/usr/bin/tar", ["-tvzf", tarball.path], {
            encoding: "utf8",
            maxBuffer: 32 * 1024 * 1024,
        }).trim().split("\n").filter(Boolean);
        if (verbose.length !== listing.length || verbose.some((line) => !/^[-d]/.test(line))) {
            fail("/package/archive: only regular files and directories are permitted");
        }

        for (const archivePath of listing.filter((path) => !path.endsWith("/"))) {
            const path = archivePath.slice("package/".length);
            if (!path || contents.has(path)) {
                fail(`/package/archive: duplicate or empty package member ${JSON.stringify(path)}`);
                continue;
            }
            const content = execFileSync("/usr/bin/tar", ["-xOzf", tarball.path, archivePath], {
                encoding: null,
                maxBuffer: 64 * 1024 * 1024,
            });
            contents.set(path, content);
            files.push({ path, bytes: content.length, sha256: sha256(content) });
        }
    } catch (error) {
        fail(`/package/archive: ${error.message}`);
    }
    files.sort((left, right) => compareCanonicalText(left.path, right.path));
    return { files, contents, sha512: computedSha512 };
}

function exportedBindingNames(name, names = []) {
    if (ts.isIdentifier(name)) names.push(name.text);
    else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
        for (const element of name.elements) if (ts.isBindingElement(element)) exportedBindingNames(element.name, names);
    }
    return names;
}

function hasModifier(node, kind) {
    return Boolean(node.modifiers?.some((modifier) => modifier.kind === kind));
}

function moduleExports(path, content, declaration) {
    const pointer = `/package/archive/${path}`;
    const source = ts.createSourceFile(
        path,
        content.toString("utf8"),
        ts.ScriptTarget.Latest,
        true,
        declaration ? ts.ScriptKind.TS : ts.ScriptKind.JS,
    );
    for (const diagnostic of source.parseDiagnostics) {
        fail(`${pointer}: syntax diagnostic ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`);
    }

    const typeNames = new Set();
    const runtimeNames = new Set();
    const add = (collection, name) => {
        if (name === "default") fail(`${pointer}: default exports are forbidden`);
        else collection.add(name);
    };

    for (const statement of source.statements) {
        if (ts.isExportAssignment(statement)) {
            fail(`${pointer}: default export assignment is forbidden`);
            continue;
        }
        if (ts.isExportDeclaration(statement)) {
            if (statement.moduleSpecifier) {
                fail(`${pointer}: forwarding re-exports are forbidden in public entry modules`);
                continue;
            }
            if (!statement.exportClause) {
                fail(`${pointer}: wildcard exports are forbidden; exact named exports required`);
                continue;
            }
            if (!ts.isNamedExports(statement.exportClause)) {
                fail(`${pointer}: namespace exports are forbidden; exact named exports required`);
                continue;
            }
            for (const element of statement.exportClause.elements) {
                const collection = declaration && (statement.isTypeOnly || element.isTypeOnly) ? typeNames : runtimeNames;
                add(collection, element.name.text);
            }
            continue;
        }
        if (!hasModifier(statement, ts.SyntaxKind.ExportKeyword)) continue;
        if (hasModifier(statement, ts.SyntaxKind.DefaultKeyword)) {
            fail(`${pointer}: default exports are forbidden`);
            continue;
        }
        if (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) add(typeNames, statement.name.text);
        else if (ts.isVariableStatement(statement)) {
            for (const declarationNode of statement.declarationList.declarations) {
                for (const name of exportedBindingNames(declarationNode.name)) add(runtimeNames, name);
            }
        } else if (
            ts.isFunctionDeclaration(statement)
            || ts.isClassDeclaration(statement)
            || ts.isEnumDeclaration(statement)
            || ts.isModuleDeclaration(statement)
            || ts.isImportEqualsDeclaration(statement)
        ) {
            if (!statement.name || !ts.isIdentifier(statement.name)) fail(`${pointer}: exported declaration requires a named identifier`);
            else add(runtimeNames, statement.name.text);
        } else fail(`${pointer}: unsupported exported declaration kind ${ts.SyntaxKind[statement.kind]}`);
    }
    return { types: ordered(typeNames), runtime: ordered(runtimeNames) };
}

function validateSemanticProbe(bytes, row, pointer, packageName) {
    const source = ts.createSourceFile(
        `${row.id}.probe.ts`,
        bytes.toString("utf8"),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
    );
    let safe = true;
    const probeFail = (message) => {
        safe = false;
        fail(message);
    };
    for (const diagnostic of source.parseDiagnostics) {
        probeFail(`${pointer}: TypeScript syntax diagnostic ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`);
    }
    const expectedSpecifier = `${packageName}${row.specifier.slice(1)}`;
    let matches = 0;
    const localBindings = new Set();
    for (const statement of source.statements) {
        if (ts.isExportDeclaration(statement) && statement.moduleSpecifier) {
            probeFail(`${pointer}: forwarding/source imports are forbidden in an executable semantic probe`);
            continue;
        }
        if (!ts.isImportDeclaration(statement) || !ts.isStringLiteralLike(statement.moduleSpecifier)) continue;
        if (statement.moduleSpecifier.text !== expectedSpecifier) {
            probeFail(`${pointer}: source/workspace import forbidden; only ${expectedSpecifier} may be imported`);
            continue;
        }
        const clause = statement.importClause;
        const bindings = clause?.namedBindings;
        if (!bindings || !ts.isNamedImports(bindings)) continue;
        for (const element of bindings.elements) {
            const imported = element.propertyName?.text ?? element.name.text;
            if (imported !== row.symbol) continue;
            const isTypeOnly = Boolean(clause.isTypeOnly || element.isTypeOnly);
            if ((row.surface === "type") !== isTypeOnly) probeFail(`${pointer}: import mode does not match ${row.surface} surface`);
            matches += 1;
            localBindings.add(element.name.text);
        }
    }
    let uses = 0;
    const visit = (node) => {
        if (ts.isCallExpression(node) && (
            node.expression.kind === ts.SyntaxKind.ImportKeyword
            || (ts.isIdentifier(node.expression) && node.expression.text === "require")
        )) probeFail(`${pointer}: dynamic import/require is forbidden in a bounded package probe`);
        if (ts.isImportTypeNode(node)) probeFail(`${pointer}: import() types are forbidden in a bounded package probe`);
        if (ts.isIdentifier(node) && localBindings.has(node.text)
            && !ts.isImportSpecifier(node.parent) && !ts.isImportClause(node.parent)) uses += 1;
        ts.forEachChild(node, visit);
    };
    visit(source);
    if (matches !== 1) probeFail(`${pointer}: exactly one ${row.symbol} import from ${expectedSpecifier} required`);
    if (matches === 1 && uses === 0) probeFail(`${pointer}: probe must exercise the exact imported ${row.symbol} binding`);
    return safe;
}

function executeInstalledProbe(installation, assertion, row, index, bytes) {
    const probeRoot = join(installation.root, "probes");
    mkdirSync(probeRoot, { recursive: true });
    const stem = String(index).padStart(4, "0");
    const compilePath = join(probeRoot, `${stem}.ts`);
    const runtimePath = join(probeRoot, `${stem}.mjs`);
    writeFileSync(compilePath, bytes);
    const compileCommand = [
        nodeExecutable,
        "$TSC",
        "--pretty", "false",
        "--noEmit",
        "--strict",
        "--skipLibCheck",
        "--module", "NodeNext",
        "--moduleResolution", "NodeNext",
        "--target", "ES2022",
        "$PROBE",
    ];
    const compile = spawnSync(nodeExecutable, [
        typescriptExecutable,
        ...compileCommand.slice(2, -1),
        compilePath,
    ], {
        cwd: installation.root,
        env: boundedEnvironment(),
        encoding: null,
        timeout: compileTimeoutMs,
        maxBuffer: 16 * 1024 * 1024,
    });
    const compileReceipt = processReceipt(compile, compileCommand, compileTimeoutMs);
    if (compileReceipt.timed_out) fail(`/semantic_evidence/assertions/${index}/compile: TypeScript probe timed out`);
    if (compileReceipt.exit_code !== 0 || compileReceipt.signal !== null) {
        const diagnostic = Buffer.concat([bytesOf(compile.stdout), bytesOf(compile.stderr)]).toString("utf8").trim().slice(0, 2000);
        fail(`/semantic_evidence/assertions/${index}/compile: installed-package TypeScript probe failed: ${diagnostic}`);
    }

    let runtimeReceipt = null;
    if (row.surface === "runtime") {
        writeFileSync(runtimePath, bytes);
        const runtimeCommand = [nodeExecutable, "$PROBE"];
        const runtime = spawnSync(nodeExecutable, [runtimePath], {
            cwd: installation.root,
            env: boundedEnvironment(),
            encoding: null,
            timeout: runtimeTimeoutMs,
            maxBuffer: 16 * 1024 * 1024,
        });
        runtimeReceipt = processReceipt(runtime, runtimeCommand, runtimeTimeoutMs);
        if (runtimeReceipt.timed_out) fail(`/semantic_evidence/assertions/${index}/runtime: installed-package probe timed out`);
        if (runtimeReceipt.exit_code !== 0 || runtimeReceipt.signal !== null) {
            fail(`/semantic_evidence/assertions/${index}/runtime: installed-package runtime probe failed: ${bytesOf(runtime.stderr).toString("utf8").trim().slice(0, 2000)}`);
        }
    }
    const observation = {
        assertion_id: assertion.id,
        export_id: assertion.export_id,
        surface: row.surface,
        probe_sha256: sha256(bytes),
        compile: compileReceipt,
        runtime: runtimeReceipt,
    };
    observation.observation_hash = sha256(canonicalize(observation));
    return observation;
}

let manifest;
try {
    if (!checkedRegularFile(manifestPath, "/manifest")) throw new Error("manifest file is not canonical");
    manifest = parseJsonStrict(readFileSync(manifestPath));
    const schema = parseJsonStrict(readFileSync(resolve(root, "value-public-surface.schema.json")));
    failures.push(...validateJsonSchema(manifest, schema));
} catch (error) {
    fail(`/manifest: ${error.message}`);
}

if (!manifest) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const manifestHash = checkedSelfHash(manifest, "manifest_hash", "");

let target;
const targetBytes = checkedEvidence(manifest.target_paths, "/target_paths");
if (targetBytes) {
    try {
        target = parseJsonStrict(targetBytes);
        if (target.schema !== "vnext-value-target-paths/1") fail("/target_paths: vnext-value-target-paths/1 required");
        const targetHash = checkedSelfHash(target, "manifest_sha256", "/target_paths");
        if (manifest.target_paths.manifest_sha256 !== targetHash) fail("/target_paths/manifest_sha256: target self-hash mismatch");
        if (target.authority?.library?.topology !== "exact" || (target.library?.conditional_paths ?? []).length !== 0) {
            fail("/target_paths: final exact topology with zero conditional rows required");
        }
        const sources = target.library?.files ?? [];
        if (!Array.isArray(sources) || new Set(sources).size !== sources.length) {
            fail("/target_paths/library/files: unique authoritative source vector required");
        }
    } catch (error) {
        fail(`/target_paths: strict JSON parse failed: ${error.message}`);
    }
}

const inspected = inspectTarball(manifest.package?.tarball);
const archiveRows = inspected.files;
const archiveContents = inspected.contents;
if (!same(manifest.package?.archive?.files, archiveRows)) fail("/package/archive/files: must exactly enumerate every packed regular file");
const filesHash = sha256(canonicalize(archiveRows));
if (manifest.package?.archive?.files_sha256 !== filesHash) fail(`/package/archive/files_sha256: computed ${filesHash}`);

let packageJson;
let hasForbiddenLocalDependency = false;
const packageJsonBytes = archiveContents.get("package.json");
if (!packageJsonBytes) fail("/package/archive: package.json missing");
else {
    const packageJsonHash = sha256(packageJsonBytes);
    if (manifest.package.archive.package_json_sha256 !== packageJsonHash) fail(`/package/archive/package_json_sha256: computed ${packageJsonHash}`);
    try {
        packageJson = parseJsonStrict(packageJsonBytes);
    } catch (error) {
        fail(`/package/archive/package.json: strict JSON parse failed: ${error.message}`);
    }
}

const packageTargets = new Map();
if (packageJson) {
    hasForbiddenLocalDependency = forbiddenLocalDependency(packageJson);
    if (packageJson.name !== manifest.package.name || packageJson.version !== manifest.package.version) {
        fail("/package: tarball package.json name/version mismatch");
    }
    if (packageJson.type !== "module") fail('/package/archive/package.json/type: exact "module" package required');
    for (const field of ["main", "module", "types", "browser"]) {
        if (Object.prototype.hasOwnProperty.call(packageJson, field)) fail(`/package/archive/package.json/${field}: root entrypoint fallback forbidden by the root tombstone`);
    }
    if (!packageJson.exports || typeof packageJson.exports !== "object" || Array.isArray(packageJson.exports)) {
        fail("/package/archive/package.json/exports: object required");
    } else {
        const keys = Object.keys(packageJson.exports);
        if (!same(keys, expectedSpecifiers)) fail(`/package/archive/package.json/exports: exact ordered keys ${expectedSpecifiers.join(", ")} required`);
        const declarationTargets = new Set();
        const runtimeTargets = new Set();
        for (const specifier of expectedSpecifiers) {
            const pointer = `/package/archive/package.json/exports/${specifier}`;
            const conditions = packageJson.exports[specifier];
            if (!exactKeys(conditions, ["types", "import"], pointer)) continue;
            if (!same(Object.keys(conditions), ["types", "import"])) fail(`${pointer}: conditions must be ordered types before import`);
            const declaration = typeof conditions.types === "string" && conditions.types.startsWith("./") ? conditions.types.slice(2) : undefined;
            const runtime = typeof conditions.import === "string" && conditions.import.startsWith("./") ? conditions.import.slice(2) : undefined;
            if (!declaration || !/\.d\.(?:cts|mts|ts)$/.test(declaration)) fail(`${pointer}/types: relative declaration target required`);
            if (!runtime || !/\.(?:cjs|mjs|js)$/.test(runtime)) fail(`${pointer}/import: relative runtime target required`);
            if (declaration && (!archiveContents.has(declaration) || !safePackageMemberPath(declaration))) fail(`${pointer}/types: target missing or unsafe`);
            if (runtime && (!archiveContents.has(runtime) || !safePackageMemberPath(runtime))) fail(`${pointer}/import: target missing or unsafe`);
            if (declarationTargets.has(declaration)) fail(`${pointer}/types: forwarding alias shares another public declaration target`);
            if (runtimeTargets.has(runtime)) fail(`${pointer}/import: forwarding alias shares another public runtime target`);
            declarationTargets.add(declaration);
            runtimeTargets.add(runtime);
            packageTargets.set(specifier, { declaration, runtime });
        }
    }
}

const targetSources = new Set(target?.library?.files ?? []);
const exportRows = manifest.exports ?? [];
const exportIds = exportRows.map(({ id }) => id);
if (new Set(exportIds).size !== exportIds.length || !same(exportIds, ordered(exportIds))) {
    fail("/exports: exact unique derived-ID canonical text order required");
}
const coordinates = exportRows.map(({ specifier, symbol, surface }) => `${specifier}\0${symbol}\0${surface}`);
if (new Set(coordinates).size !== coordinates.length) fail("/exports: duplicate specifier/symbol/surface coordinate");

for (const [index, row] of exportRows.entries()) {
    const pointer = `/exports/${index}`;
    const expectedId = `${row.specifier}#${row.symbol}:${row.surface}`;
    if (row.id !== expectedId) fail(`${pointer}/id: expected derived ID ${expectedId}`);
    if (row.semantic_assertion_id !== `semantic:${expectedId}`) fail(`${pointer}/semantic_assertion_id: expected semantic:${expectedId}`);
    if (row.tarball_sha512 !== manifest.package.tarball.sha512) fail(`${pointer}/tarball_sha512: must bind the exact packed tarball`);
    if (!targetSources.has(row.source)) fail(`${pointer}/source: not a member of the bound final target source vector`);
    const targets = packageTargets.get(row.specifier);
    if (!targets) continue;
    if (row.declaration?.path !== targets.declaration) fail(`${pointer}/declaration/path: must equal package export types target ${targets.declaration}`);
    const declarationBytes = archiveContents.get(targets.declaration);
    if (declarationBytes && row.declaration?.sha256 !== sha256(declarationBytes)) fail(`${pointer}/declaration/sha256: does not bind packed declaration bytes`);
    if (row.surface === "runtime") {
        if (row.runtime?.path !== targets.runtime) fail(`${pointer}/runtime/path: must equal package export import target ${targets.runtime}`);
        const runtimeBytes = archiveContents.get(targets.runtime);
        if (runtimeBytes && row.runtime?.sha512 !== sha512(runtimeBytes)) fail(`${pointer}/runtime/sha512: does not bind packed runtime bytes`);
    }
}

for (const specifier of expectedSpecifiers) {
    const targets = packageTargets.get(specifier);
    if (!targets || !archiveContents.has(targets.declaration) || !archiveContents.has(targets.runtime)) continue;
    const declaration = moduleExports(targets.declaration, archiveContents.get(targets.declaration), true);
    const runtime = moduleExports(targets.runtime, archiveContents.get(targets.runtime), false);
    const rows = exportRows.filter((row) => row.specifier === specifier);
    const declaredTypes = ordered(rows.filter((row) => row.surface === "type").map(({ symbol }) => symbol));
    const declaredRuntime = ordered(rows.filter((row) => row.surface === "runtime").map(({ symbol }) => symbol));
    if (!same(declaredTypes, declaration.types)) fail(`/exports/${specifier}/type: rows must exactly equal packed type-only declaration exports`);
    if (!same(declaredRuntime, declaration.runtime)) fail(`/exports/${specifier}/runtime: rows must exactly equal packed runtime declaration exports`);
    if (!same(declaredRuntime, runtime.runtime)) fail(`/exports/${specifier}/runtime: rows must exactly equal packed JavaScript exports`);
    if (runtime.types.length) fail(`/package/archive/${targets.runtime}: runtime module contains type-only exports`);
    if (declaredRuntime.length === 0) fail(`/exports/${specifier}: at least one runtime symbol required`);
}

const tombstones = manifest.tombstones ?? [];
let tombstoneOwnerReturn;
const tombstoneOwnerBytes = checkedEvidence(manifest.tombstone_owner_return, "/tombstone_owner_return");
if (tombstoneOwnerBytes) {
    try {
        tombstoneOwnerReturn = parseJsonStrict(tombstoneOwnerBytes);
        const returnHash = checkedSelfHash(tombstoneOwnerReturn, "return_hash", "/tombstone_owner_return");
        if (
            tombstoneOwnerReturn.schema !== "vnext-wave-return/2"
            || tombstoneOwnerReturn.wave_id !== "V00C"
            || tombstoneOwnerReturn.status !== "COMPLETE"
        ) fail("/tombstone_owner_return: terminal COMPLETE V00C return required");
        if (tombstoneOwnerReturn.scope?.wave_contract_sha256 !== v00cContractHash) fail("/tombstone_owner_return/scope/wave_contract_sha256: exact V00C contract required");
        if (manifest.tombstone_owner_return.return_hash !== returnHash) fail("/tombstone_owner_return/return_hash: manifest projection mismatch");
    } catch (error) {
        fail(`/tombstone_owner_return: strict JSON parse failed: ${error.message}`);
    }
}
const tombstoneSpecifiers = tombstones.map(({ specifier }) => specifier);
if (!same(tombstoneSpecifiers, expectedTombstones)) fail(`/tombstones: exact ordered decisions ${expectedTombstones.join(", ")} required`);
for (const [index, row] of tombstones.entries()) {
    if (row.owner_return_hash !== manifest.tombstone_owner_return?.return_hash) fail(`/tombstones/${index}/owner_return_hash: must bind the canonical V00C return`);
    const preimage = structuredClone(row);
    delete preimage.decision_sha256;
    const actual = sha256(canonicalize(preimage));
    if (row.decision_sha256 !== actual) fail(`/tombstones/${index}/decision_sha256: computed ${actual}`);
}
const tombstoneOwner = failures.length === 0 ? loadValueTargetOwnerReturn(
    { wave_id: "V00C", return: manifest.tombstone_owner_return },
    "/tombstone_owner_return",
    fail,
    new Map(),
) : undefined;
if (tombstoneOwner) {
    const expected = tombstones.map(packageTombstoneDecision).sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id));
    const actual = [...tombstoneOwner.decisions.values()].sort((left, right) => compareCanonicalText(left.decision_id, right.decision_id));
    if (!same(actual, expected)) {
        fail("/tombstone_owner_return/annexes/value-target-disposition: must exactly contain the three typed root/quantize/value tombstone decisions");
    }
}

let semanticEvidence;
const probeExecutions = [];
const semanticBytes = checkedEvidence(manifest.semantic_evidence, "/semantic_evidence");
if (semanticBytes) {
    try {
        semanticEvidence = parseJsonStrict(semanticBytes);
        exactKeys(semanticEvidence, ["schema", "wave_id", "package", "target_manifest_sha256", "assertions", "evidence_hash"], "/semantic_evidence");
        if (semanticEvidence.schema !== "vnext-value-public-semantic-evidence/1" || semanticEvidence.wave_id !== "V29T") fail("/semantic_evidence: wrong schema or wave");
        exactKeys(semanticEvidence.package, ["name", "version", "tarball_sha512"], "/semantic_evidence/package");
        if (
            semanticEvidence.package?.name !== manifest.package.name
            || semanticEvidence.package?.version !== manifest.package.version
            || semanticEvidence.package?.tarball_sha512 !== manifest.package.tarball.sha512
        ) fail("/semantic_evidence/package: must bind the exact packed package");
        if (semanticEvidence.target_manifest_sha256 !== manifest.target_paths.manifest_sha256) fail("/semantic_evidence/target_manifest_sha256: must bind final target authority");
        const evidenceHash = checkedSelfHash(semanticEvidence, "evidence_hash", "/semantic_evidence");
        if (manifest.semantic_evidence.evidence_hash !== evidenceHash) fail("/semantic_evidence/evidence_hash: manifest projection mismatch");
        const assertions = semanticEvidence.assertions;
        if (!Array.isArray(assertions)) fail("/semantic_evidence/assertions: array required");
        else {
            const assertionIds = assertions.map(({ id }) => id);
            if (new Set(assertionIds).size !== assertionIds.length || !same(assertionIds, ordered(assertionIds))) fail("/semantic_evidence/assertions: exact unique canonical text order required");
            const rowsById = new Map(exportRows.map((row) => [row.id, row]));
            for (const [index, assertion] of assertions.entries()) {
                const pointer = `/semantic_evidence/assertions/${index}`;
                exactKeys(assertion, ["id", "export_id", "status", "contract", "probe", "observation", "semantic_sha256"], pointer);
                if (assertion.id !== `semantic:${assertion.export_id}`) fail(`${pointer}/id: must derive from export_id`);
                if (assertion.status !== "PASS") fail(`${pointer}/status: PASS required`);
                if (typeof assertion.contract !== "string" || assertion.contract.trim().length === 0) fail(`${pointer}/contract: nonempty semantic contract required`);
                exactKeys(assertion.probe, ["path", "file_sha256"], `${pointer}/probe`);
                exactKeys(assertion.observation, ["path", "file_sha256", "observation_hash"], `${pointer}/observation`);
                const row = rowsById.get(assertion.export_id);
                const probeBytes = checkedEvidence(assertion.probe, `${pointer}/probe`);
                if (probeBytes && row) {
                    const safe = validateSemanticProbe(probeBytes, row, `${pointer}/probe`, manifest.package.name);
                    if (safe) probeExecutions.push({ assertion, row, index, bytes: probeBytes });
                }
                const observationBytes = checkedEvidence(assertion.observation, `${pointer}/observation`);
                if (observationBytes) {
                    try {
                        const observation = parseJsonStrict(observationBytes);
                        exactKeys(observation, ["schema", "wave_id", "assertion_id", "export_id", "package_sha512", "target_manifest_sha256", "status", "observation_hash"], `${pointer}/observation`);
                        const observationHash = checkedSelfHash(observation, "observation_hash", `${pointer}/observation`);
                        if (assertion.observation.observation_hash !== observationHash) fail(`${pointer}/observation/observation_hash: assertion projection mismatch`);
                        if (
                            observation.schema !== "vnext-value-public-semantic-observation/1"
                            || observation.wave_id !== "V29T"
                            || observation.assertion_id !== assertion.id
                            || observation.export_id !== assertion.export_id
                            || observation.package_sha512 !== manifest.package.tarball.sha512
                            || observation.target_manifest_sha256 !== manifest.target_paths.manifest_sha256
                            || observation.status !== "PASS"
                        ) fail(`${pointer}/observation: exact PASS package/target/export join required`);
                    } catch (error) {
                        fail(`${pointer}/observation: strict JSON parse failed: ${error.message}`);
                    }
                }
                const semanticPreimage = structuredClone(assertion);
                delete semanticPreimage.semantic_sha256;
                const semanticHash = sha256(canonicalize(semanticPreimage));
                if (assertion.semantic_sha256 !== semanticHash) fail(`${pointer}/semantic_sha256: computed ${semanticHash}`);
            }
            const assertedExports = assertions.map(({ export_id }) => export_id);
            if (!same(assertedExports, exportIds)) fail("/semantic_evidence/assertions: one exact assertion per public surface row required");
            const assertionsByExport = new Map(assertions.map((assertion) => [assertion.export_id, assertion]));
            for (const [index, row] of exportRows.entries()) {
                const assertion = assertionsByExport.get(row.id);
                if (assertion && row.semantic_sha256 !== assertion.semantic_sha256) fail(`/exports/${index}/semantic_sha256: must project the exact semantic assertion hash`);
            }
        }
    } catch (error) {
        fail(`/semantic_evidence: strict JSON parse failed: ${error.message}`);
    }
}

let installReceipt;
let computedObservations = [];
if (failures.length === 0 && !hasForbiddenLocalDependency) {
    let installation;
    try {
        installation = installBoundPackage(manifest, archiveRows);
        installReceipt = installation.receipt;
        if (installation.ready) {
            computedObservations = probeExecutions.map(({ assertion, row, index, bytes }) =>
                executeInstalledProbe(installation, assertion, row, index, bytes));
        }
    } catch (error) {
        fail(`/semantic_evidence/install: ${error.message}`);
    } finally {
        if (installation?.root) rmSync(installation.root, { recursive: true, force: true });
    }
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const runtimeRows = exportRows.filter(({ surface }) => surface === "runtime").length;
const typeRows = exportRows.length - runtimeRows;
process.stdout.write(`${JSON.stringify({
    schema: manifest.schema,
    package: `${manifest.package.name}@${manifest.package.version}`,
    tarball_sha512: manifest.package.tarball.sha512,
    archive_files: archiveRows.length,
    export_keys: expectedSpecifiers.length,
    surface_rows: exportRows.length,
    runtime_rows: runtimeRows,
    type_rows: typeRows,
    tombstones: tombstones.length,
    target_manifest_sha256: manifest.target_paths.manifest_sha256,
    semantic_evidence_hash: semanticEvidence.evidence_hash,
    execution: {
        toolchain,
        install: installReceipt,
        observations: computedObservations,
        observations_sha256: sha256(canonicalize(computedObservations)),
    },
    manifest_hash: manifestHash,
})}\n`);
