import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const featureId = "SYNTAX-CONSUME-NUMBER";
const generation = 2;
const targetPath = "grammar/css/l4/value-unit/consume-number.ts";
const allowedModule = "@mkbabb/parse-that/core";
const allowedImports = new Set(["Parser", "all", "any", "dispatch", "regex", "string"]);
const verifierFile = fileURLToPath(import.meta.url);
const cellRoot = dirname(verifierFile);
const mirrorRoot = resolve(cellRoot, "../../..");
const parseThatRoot = join(mirrorRoot, "node_modules", "@mkbabb", "parse-that");
const typeScriptRoot = join(mirrorRoot, "node_modules", "typescript");
const proofConfigPath = join(mirrorRoot, "tsconfig.apotheosis.json");
const proofConfigSha256 = "32ab097846458d2df074bc13e8682d605872cb6f6eef2fbd5b4fa7f05bbcca39";
const parseThatLedger = join(cellRoot, "parse-that-package.ledger");
const typeScriptLedger = join(cellRoot, "typescript-package.ledger");
const requiredPrecursor = Object.freeze([
    "benchmark-protocol.json", "contract.ts", "feature-public.json", "fixtures/public-cases.json",
    "formation-receipt.json", "harness.ts", "parse-that-package.ledger", "promotion-protocol.json",
    "promotion-verifier.mjs", "typescript-package.ledger",
]);
const requiredPostFreeze = Object.freeze([
    "holdout-receipt.json", "reviews/challenge-a-specification.md",
    "reviews/challenge-b-architecture.md", "root-gestalt.md",
]);

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const byteSort = (left, right) => Buffer.from(left).compare(Buffer.from(right));

function canonicalFile(path, label) {
    const absolute = resolve(path);
    const canonical = realpathSync(absolute);
    const stat = lstatSync(canonical);
    if (canonical !== absolute || !stat.isFile() || stat.isSymbolicLink()) throw new Error(`${label} is not one canonical regular file`);
    return canonical;
}

function canonicalDirectory(path, label) {
    const absolute = resolve(path);
    const canonical = realpathSync(absolute);
    if (canonical !== absolute || !lstatSync(canonical).isDirectory()) throw new Error(`${label} is not one canonical directory`);
    return canonical;
}

function filesBelow(root) {
    const files = [];
    const visit = (directory) => {
        for (const entry of readdirSync(directory).sort(byteSort)) {
            const path = join(directory, entry);
            const stat = lstatSync(path);
            if (stat.isSymbolicLink()) throw new Error(`symbolic link forbidden: ${path}`);
            if (stat.isDirectory()) visit(path);
            else if (stat.isFile()) files.push(path);
            else throw new Error(`unsupported entry: ${path}`);
        }
    };
    visit(root);
    return files;
}

function parseLedger(path, expectedHash, expectedRows) {
    const bytes = readFileSync(canonicalFile(path, "tool ledger"));
    if (sha256(bytes) !== expectedHash) throw new Error(`tool ledger digest mismatch: ${path}`);
    const text = bytes.toString("utf8");
    if (!text.endsWith("\n")) throw new Error(`tool ledger lacks final LF: ${path}`);
    const rows = text.slice(0, -1).split("\n").map((line) => {
        const match = /^([0-9a-f]{64})  ([^\n]+)$/.exec(line);
        if (match === null) throw new Error(`bad ledger row: ${line}`);
        return { sha256: match[1], path: match[2] };
    });
    if (rows.length !== expectedRows || new Set(rows.map((row) => row.path)).size !== rows.length) throw new Error(`tool ledger row count/uniqueness mismatch: ${path}`);
    const sorted = [...rows].sort((a, b) => byteSort(a.path, b.path));
    if (rows.some((row, index) => row.path !== sorted[index].path)) throw new Error(`tool ledger is not byte-sorted: ${path}`);
    return rows;
}

function verifyTree(root, rows, label) {
    canonicalDirectory(root, label);
    const actual = filesBelow(root).map((file) => relative(root, file).split(sep).join("/")).sort(byteSort);
    if (actual.length !== rows.length || actual.some((path, index) => path !== rows[index].path)) throw new Error(`${label} path closure drift`);
    for (const row of rows) {
        if (sha256(readFileSync(join(root, ...row.path.split("/")))) !== row.sha256) throw new Error(`${label} byte drift: ${row.path}`);
    }
}

async function loadBoundTools() {
    const parseRows = parseLedger(parseThatLedger, "6fa2142d1bcfcd2f3fc5bcba8fd49ff7a61801b7e189e8cec0f8b4ea808d5d7d", 65);
    const tsRows = parseLedger(typeScriptLedger, "3a08d88df997493df6c0dc751d81e52377f155defada21c1a0a7d4d0df048f47", 130);
    verifyTree(parseThatRoot, parseRows, "parse-that package");
    verifyTree(typeScriptRoot, tsRows, "TypeScript package");
    const parsePackage = JSON.parse(readFileSync(join(parseThatRoot, "package.json"), "utf8"));
    const tsPackage = JSON.parse(readFileSync(join(typeScriptRoot, "package.json"), "utf8"));
    if (parsePackage.name !== "@mkbabb/parse-that" || parsePackage.version !== "1.0.0") throw new Error("parse-that identity drift");
    if (tsPackage.name !== "typescript" || tsPackage.version !== "5.8.3") throw new Error("TypeScript identity drift");
    const ts = await import(pathToFileURL(join(typeScriptRoot, "lib", "typescript.js")).href);
    return { ts, parseRows, tsRows };
}

function verifyExecutableClosure(ts) {
    const roots = ["contract.ts", "harness.ts"];
    const local = new Set(roots);
    const fixtures = new Set();
    const external = new Set();
    const queue = [...roots];
    while (queue.length > 0) {
        const path = queue.pop();
        const absolute = canonicalFile(join(cellRoot, path), `executable closure ${path}`);
        const source = ts.createSourceFile(path, readFileSync(absolute, "utf8"), ts.ScriptTarget.ES2022, true);
        if (source.parseDiagnostics.length !== 0) throw new Error(`syntax error in executable closure: ${path}`);
        for (const statement of source.statements) {
            if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
            const specifier = statement.moduleSpecifier.text;
            if (specifier.startsWith(".")) {
                const resolved = resolve(dirname(absolute), specifier.replace(/\.js$/, ".ts"));
                if (specifier.endsWith(".json")) {
                    fixtures.add(relative(cellRoot, resolved).split(sep).join("/"));
                    canonicalFile(resolved, "fixture import");
                } else {
                    const rel = relative(cellRoot, resolved).split(sep).join("/");
                    if (!local.has(rel)) { local.add(rel); queue.push(rel); }
                }
            } else external.add(specifier);
        }
    }
    const exactLocal = [...local].sort(byteSort);
    const exactFixtures = [...fixtures].sort(byteSort);
    const exactExternal = [...external].sort(byteSort);
    if (JSON.stringify(exactLocal) !== JSON.stringify(["contract.ts", "harness.ts"])
        || JSON.stringify(exactFixtures) !== JSON.stringify(["fixtures/public-cases.json"])
        || JSON.stringify(exactExternal) !== JSON.stringify(["@mkbabb/parse-that/core", "@mkbabb/parse-that/diagnostics"])) {
        throw new Error(`unexpected executable closure: ${JSON.stringify({ exactLocal, exactFixtures, exactExternal })}`);
    }
    const fixture = JSON.parse(readFileSync(join(cellRoot, "fixtures", "public-cases.json"), "utf8"));
    if (fixture.feature_id !== featureId || fixture.generation !== generation || fixture.number_start_prefix_evidence?.length !== 6) throw new Error("fixture identity/number-start arm drift");
    return { local: exactLocal, fixtures: exactFixtures, external: exactExternal };
}

function verifyCleanBase() {
    const cleanBasePath = join(mirrorRoot, "apotheosis", "clean-base.json");
    const bytes = readFileSync(canonicalFile(cleanBasePath, "clean base"));
    if (sha256(bytes) !== "dcece5fb104fbcbf1f87ec5d548307f38a0a18bf98bfdb9a771aef0bd7da37d2") throw new Error("clean-base manifest drift");
    const clean = JSON.parse(bytes.toString("utf8"));
    if (!Array.isArray(clean.typescript_sources) || clean.typescript_sources.length !== 0) throw new Error("clean base does not declare zero TypeScript sources");
    const grammar = canonicalDirectory(join(mirrorRoot, "apotheosis", "grammar"), "active grammar");
    if (filesBelow(grammar).some((path) => path.endsWith(".ts"))) throw new Error("active grammar contains TypeScript");
    return sha256(bytes);
}

function verifyProofConfig() {
    const bytes = readFileSync(canonicalFile(proofConfigPath, "package proof config"));
    if (sha256(bytes) !== proofConfigSha256) throw new Error("package proof config drift");
    const config = JSON.parse(bytes.toString("utf8"));
    if (config.compilerOptions?.resolveJsonModule !== true) throw new Error("package proof config does not enable resolveJsonModule");
    return { sha256: proofConfigSha256, bytes: bytes.length };
}

function assertCandidateSurface(sourceText, ts) {
    const source = ts.createSourceFile(targetPath, sourceText, ts.ScriptTarget.ES2022, true);
    if (source.parseDiagnostics.length !== 0) throw new Error("candidate TypeScript syntax error");
    let exports = 0;
    const forbiddenIdentifiers = new Set(["ParserState", "eof", "recover", "splitBalanced", "containsDelimiter", "numberParser", "require", "eval", "Function"]);
    const forbiddenProperties = new Set(["src", "offset", "parser", "parseState", "slice", "substring", "substr", "charAt", "charCodeAt", "codePointAt", "indexOf", "lastIndexOf"]);
    const visit = (node) => {
        if (ts.isImportDeclaration(node)) {
            if (!ts.isStringLiteral(node.moduleSpecifier) || node.moduleSpecifier.text !== allowedModule) throw new Error(`candidate may import only ${allowedModule}`);
            const clause = node.importClause;
            if (clause === undefined || clause.name !== undefined || clause.namedBindings === undefined || !ts.isNamedImports(clause.namedBindings)) throw new Error("candidate imports must be exact named imports");
            for (const item of clause.namedBindings.elements) {
                const imported = item.propertyName?.text ?? item.name.text;
                if (!allowedImports.has(imported)) throw new Error(`candidate import forbidden: ${imported}`);
            }
        }
        if (ts.isImportEqualsDeclaration(node) || ts.isExportDeclaration(node) || ts.isExportAssignment(node)) throw new Error("candidate import/export indirection forbidden");
        if (ts.isVariableStatement(node) && node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
            const declarations = node.declarationList.declarations;
            if (declarations.length !== 1 || !ts.isIdentifier(declarations[0].name) || declarations[0].name.text !== "consumeNumber") throw new Error("sole direct export must be consumeNumber");
            exports += 1;
        } else if (ts.canHaveModifiers(node) && ts.getModifiers(node)?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
            throw new Error("only a direct consumeNumber variable export is allowed");
        }
        if (ts.isNewExpression(node)) throw new Error("custom constructors are forbidden");
        if (ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node) || ts.isWhileStatement(node) || ts.isDoStatement(node)) throw new Error("imperative loops are forbidden");
        if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) throw new Error("dynamic import forbidden");
        if (ts.isIdentifier(node) && forbiddenIdentifiers.has(node.text)) throw new Error(`forbidden identifier: ${node.text}`);
        if (ts.isPropertyAccessExpression(node) && forbiddenProperties.has(node.name.text)) throw new Error(`forbidden source/cursor access: ${node.name.text}`);
        ts.forEachChild(node, visit);
    };
    visit(source);
    if (exports !== 1) throw new Error(`expected one direct consumeNumber export, received ${exports}`);
}

function probeText() {
    return [
        'import { consumeNumber } from "./consume-number.js";',
        'import type { Parser } from "@mkbabb/parse-that/core";',
        'type Expected = Readonly<{ value: number; type: "integer" | "number"; sign: "+" | "-" | null }>;',
        'type IsAny<T> = 0 extends (1 & T) ? true : false;',
        'type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? ([keyof T] extends [never] ? true : false) : false;',
        'type Exact<A,B> = IsAny<A> extends true ? false : IsAny<B> extends true ? false : IsUnknown<A> extends true ? false : IsUnknown<B> extends true ? false : [A] extends [B] ? ([B] extends [A] ? true : false) : false;',
        'type Payload<T> = T extends Parser<infer V> ? V : never;',
        'type Assert<T extends true> = T;',
        'export type Root = Assert<Exact<typeof consumeNumber, Parser<Expected>>>;',
        'export type Leaf = Assert<Exact<Payload<typeof consumeNumber>, Expected>>;',
        '',
    ].join("\n");
}

function diagnosticText(ts, diagnostics) {
    return diagnostics.map((item) => `TS${item.code}: ${ts.flattenDiagnosticMessageText(item.messageText, "\n")}`).join("\n");
}

function typeProof({ sourceText, candidateIdentity, ts, parseRows, tsRows }) {
    const candidatePath = resolve(candidateIdentity);
    const probePath = resolve(dirname(candidatePath), ".consume-number-g2.probe.ts");
    const probe = probeText();
    const options = {
        strict: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler, noEmit: true, types: [],
        lib: ["lib.es2022.d.ts"], allowJs: false, checkJs: false, skipLibCheck: false,
        noResolve: false, useDefineForClassFields: true, verbatimModuleSyntax: true,
    };
    const host = ts.createCompilerHost(options, true);
    const baseExists = host.fileExists.bind(host);
    const baseRead = host.readFile.bind(host);
    const baseSource = host.getSourceFile.bind(host);
    const inMemory = new Map([[candidatePath, sourceText], [probePath, probe]]);
    host.fileExists = (path) => inMemory.has(resolve(path)) || baseExists(path);
    host.readFile = (path) => inMemory.get(resolve(path)) ?? baseRead(path);
    host.getSourceFile = (path, languageVersion, onError, fresh) => {
        const text = inMemory.get(resolve(path));
        return text === undefined ? baseSource(path, languageVersion, onError, fresh) : ts.createSourceFile(resolve(path), text, languageVersion, true, ts.ScriptKind.TS);
    };
    host.resolveModuleNames = (names, containing) => names.map((name) => {
        if (resolve(containing) === probePath && name === "./consume-number.js") return { resolvedFileName: candidatePath, extension: ts.Extension.Ts, isExternalLibraryImport: false };
        if (name === allowedModule) return { resolvedFileName: join(parseThatRoot, "dist", "core.d.ts"), extension: ts.Extension.Dts, isExternalLibraryImport: true, packageId: { name: "@mkbabb/parse-that", subModuleName: "core", version: "1.0.0" } };
        return ts.resolveModuleName(name, containing, options, host).resolvedModule;
    });
    const program = ts.createProgram({ rootNames: [candidatePath, probePath], options, host });
    const parseMap = new Map(parseRows.map((row) => [row.path, row.sha256]));
    const tsMap = new Map(tsRows.map((row) => [row.path, row.sha256]));
    let candidateSource;
    let probeSource;
    const resolvedInputs = [];
    for (const source of program.getSourceFiles()) {
        const path = resolve(source.fileName);
        if (path === candidatePath) {
            if (source.text !== sourceText) throw new Error("compiler candidate root differs from captured in-memory bytes");
            candidateSource = source;
            resolvedInputs.push({ kind: "candidate-memory", path: targetPath, sha256: sha256(Buffer.from(sourceText)), bytes: Buffer.byteLength(sourceText) });
        } else if (path === probePath) {
            if (source.text !== probe) throw new Error("compiler probe root differs from generated bytes");
            probeSource = source;
            resolvedInputs.push({ kind: "probe-memory", path: "verifier-generated://consume-number-g2/probe.ts", sha256: sha256(Buffer.from(probe)), bytes: Buffer.byteLength(probe) });
        } else {
            const canonical = canonicalFile(path, "compiler source");
            let root;
            let map;
            let kind;
            if (canonical.startsWith(`${typeScriptRoot}${sep}`)) { root = typeScriptRoot; map = tsMap; kind = "typescript"; }
            else if (canonical.startsWith(`${parseThatRoot}${sep}`)) { root = parseThatRoot; map = parseMap; kind = "parse-that"; }
            else throw new Error(`unbound compiler source: ${canonical}`);
            const rel = relative(root, canonical).split(sep).join("/");
            const bytes = readFileSync(canonical);
            if (map.get(rel) !== sha256(bytes)) throw new Error(`unbound compiler bytes: ${rel}`);
            resolvedInputs.push({ kind, path: `${kind}/${rel}`, sha256: sha256(bytes), bytes: bytes.length });
        }
    }
    if (candidateSource === undefined || probeSource === undefined) throw new Error("strict program omitted an in-memory root");
    const diagnostics = ts.getPreEmitDiagnostics(program);
    if (diagnostics.length !== 0) throw new Error(`strict type proof failed:\n${diagnosticText(ts, diagnostics)}`);
    const checker = program.getTypeChecker();
    const moduleSymbol = checker.getSymbolAtLocation(candidateSource);
    const exports = moduleSymbol === undefined ? [] : checker.getExportsOfModule(moduleSymbol);
    if (exports.length !== 1 || exports[0].getName() !== "consumeNumber") throw new Error("checker export surface is not exactly consumeNumber");
    const declaration = exports[0].valueDeclaration ?? exports[0].declarations?.[0];
    if (declaration === undefined || declaration.getSourceFile() !== candidateSource) throw new Error("consumeNumber is not declared by captured candidate source");
    resolvedInputs.sort((a, b) => byteSort(a.path, b.path));
    const ledger = resolvedInputs.map((row) => `${row.sha256}  ${row.path}`).join("\n") + "\n";
    return { diagnostics: 0, resolvedInputCount: resolvedInputs.length, resolvedInputLedgerSha256: sha256(ledger), resolvedInputs };
}

function verifyManifest(expectedDigest) {
    if (!/^[0-9a-f]{64}$/.test(expectedDigest)) throw new Error("manifest digest must be lowercase SHA-256");
    const manifestPath = canonicalFile(join(cellRoot, "manifest.json"), "owner-sealed manifest");
    const bytes = readFileSync(manifestPath);
    if (sha256(bytes) !== expectedDigest) throw new Error("adjacent manifest differs from owner-sealed digest");
    const manifest = JSON.parse(bytes.toString("utf8"));
    if (manifest.feature_id !== featureId || manifest.generation !== generation || !Array.isArray(manifest.public_input_closure)) throw new Error("manifest identity/closure mismatch");
    const rows = manifest.public_input_closure;
    const expectedPaths = [...requiredPrecursor, ...requiredPostFreeze].sort(byteSort);
    const actualPaths = rows.map((row) => row.path).sort(byteSort);
    if (new Set(actualPaths).size !== actualPaths.length || JSON.stringify(actualPaths) !== JSON.stringify(expectedPaths)) throw new Error("manifest path closure is not the exact precursor/holdout/challenge/root set");
    for (const row of rows) {
        const path = canonicalFile(join(cellRoot, ...row.path.split("/")), `manifest row ${row.path}`);
        const live = readFileSync(path);
        if (row.bytes !== live.length || row.sha256 !== sha256(live)) throw new Error(`manifest row drift: ${row.path}`);
    }
    return { path: manifestPath, sha256: expectedDigest, bytes: bytes.length };
}

function readOverlay(overlayArgument) {
    const overlay = canonicalDirectory(overlayArgument, "candidate overlay");
    const rel = relative(cellRoot, overlay).split(sep).join("/");
    if (!/^candidates\/(h|b|s|d|r)\/overlay$/.test(rel)) throw new Error(`overlay is not a canonical seat root: ${rel}`);
    const files = filesBelow(overlay);
    if (files.length !== 1 || relative(overlay, files[0]).split(sep).join("/") !== targetPath) throw new Error("overlay is not exactly one target file");
    const file = canonicalFile(files[0], "candidate source");
    const bytes = readFileSync(file);
    const text = bytes.toString("utf8");
    if (!Buffer.from(text, "utf8").equals(bytes)) throw new Error("candidate is not canonical UTF-8");
    return { overlay, file, bytes, text };
}

function closeOverlay(entry) {
    const files = filesBelow(entry.overlay);
    if (files.length !== 1 || canonicalFile(files[0], "closing candidate source") !== entry.file) throw new Error("overlay path set changed before receipt close");
    const closing = readFileSync(entry.file);
    if (!closing.equals(entry.bytes)) throw new Error("candidate bytes changed before receipt close");
}

export async function verifySelf() {
    if (relative(mirrorRoot, verifierFile).split(sep).join("/") !== "cells/syntax-consume-number/g2/promotion-verifier.mjs") throw new Error("verifier is not at its governed path");
    const tools = await loadBoundTools();
    const closure = verifyExecutableClosure(tools.ts);
    const cleanBaseSha256 = verifyCleanBase();
    const proofConfig = verifyProofConfig();
    return { featureId, generation, closure, cleanBaseSha256, proofConfig, toolLedgers: { parseThat: sha256(readFileSync(parseThatLedger)), typescript: sha256(readFileSync(typeScriptLedger)) } };
}

export async function verifyPromotion(expectedManifestDigest, overlayArgument) {
    const self = await verifySelf();
    const manifest = verifyManifest(expectedManifestDigest);
    const tools = await loadBoundTools();
    const entry = readOverlay(overlayArgument);
    assertCandidateSurface(entry.text, tools.ts);
    const proof = typeProof({ sourceText: entry.text, candidateIdentity: entry.file, ...tools });
    closeOverlay(entry);
    const sourceSha256 = sha256(entry.bytes);
    const overlayLedger = `${sourceSha256}  ${targetPath}\n`;
    return { self, manifest, targetPath, sourceSha256, sourceBytes: entry.bytes.length, overlayLedgerSha256: sha256(overlayLedger), projectedGrammarLedgerSha256: sha256(overlayLedger), proof, allowedImports: [allowedModule] };
}

const invoked = process.argv[1] === undefined ? null : resolve(process.argv[1]);
if (invoked === verifierFile) {
    if (process.argv[2] === "--self-check" && process.argv.length === 3) {
        process.stdout.write(`${JSON.stringify(await verifySelf(), null, 2)}\n`);
    } else if (process.argv[2] === "--assay-stdin" && process.argv.length === 3) {
        const tools = await loadBoundTools();
        const text = readFileSync(0, "utf8");
        assertCandidateSurface(text, tools.ts);
        process.stdout.write(`${JSON.stringify(typeProof({ sourceText: text, candidateIdentity: "/__syntax_consume_number_g2_assay__/consume-number.ts", ...tools }), null, 2)}\n`);
    } else if (process.argv.length === 4) {
        process.stdout.write(`${JSON.stringify(await verifyPromotion(process.argv[2], process.argv[3]), null, 2)}\n`);
    } else {
        throw new Error("usage: promotion-verifier.mjs --self-check | --assay-stdin | <manifest-sha256> <overlay-root>");
    }
}
