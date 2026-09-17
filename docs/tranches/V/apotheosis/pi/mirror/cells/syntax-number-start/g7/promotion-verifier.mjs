import { createHash } from "node:crypto";
import {
    lstatSync,
    readFileSync,
    readdirSync,
    realpathSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const targetPath = "grammar/css/l4/value-unit/number-start.ts";
const allowedModule = "@mkbabb/parse-that/core";
const expectedVerifierRelative = "cells/syntax-number-start/g7/promotion-verifier.mjs";
const expectedCleanBaseSha256 = "dcece5fb104fbcbf1f87ec5d548307f38a0a18bf98bfdb9a771aef0bd7da37d2";
const expectedParseThatLedgerSha256 = "998c5668fa103e4692d69f48a0665f152cb1d014b11fa668c99693307ef1690b";
const expectedParseThatPackageSha256 = "f53ca9b85c43e65c1f3f8a21414f990211d8d0e6a7f07df805557cdb6b50f4ff";
const expectedTypeScriptLedgerSha256 = "3a08d88df997493df6c0dc751d81e52377f155defada21c1a0a7d4d0df048f47";
const expectedTypeScriptFileCount = 130;
const expectedMirrorPackageSha256 = "b15f2948615b3ab979fdd1c356d5cbdaee3639115e07930d4041ccc77b3cd3af";
const expectedMirrorLockSha256 = "489c5981ffa75d795cd3fae0e6d5a837b272ffec1633d862dba9c11a59e668b7";
const emptyLedgerSha256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
const manifestName = "manifest.json";
const verifierName = "promotion-verifier.mjs";
const probeIdentity = "verifier-generated://syntax-number-start-g7/type-probe.ts";

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const byteSort = (left, right) => Buffer.from(left).compare(Buffer.from(right));

function parseLedger(file, expectedHash, expectedRows) {
    const bytes = readFileSync(file);
    if (sha256(bytes) !== expectedHash) throw new Error(`ledger hash mismatch: ${file}`);
    const text = bytes.toString("utf8");
    if (!text.endsWith("\n")) throw new Error(`ledger lacks final LF: ${file}`);
    const rows = text.slice(0, -1).split("\n").map((line) => {
        const match = /^([0-9a-f]{64})  ([^\n]+)$/.exec(line);
        if (match === null) throw new Error(`invalid ledger row: ${line}`);
        return Object.freeze({ hash: match[1], path: match[2] });
    });
    if (expectedRows !== undefined && rows.length !== expectedRows) {
        throw new Error(`ledger row-count mismatch: ${rows.length} !== ${expectedRows}`);
    }
    const sorted = [...rows].sort((left, right) => byteSort(left.path, right.path));
    if (rows.some((row, index) => row.path !== sorted[index]?.path)) {
        throw new Error(`ledger is not byte-sorted: ${file}`);
    }
    if (new Set(rows.map((row) => row.path)).size !== rows.length) {
        throw new Error(`ledger contains duplicate paths: ${file}`);
    }
    return rows;
}

function filesBelow(root) {
    const result = [];
    const visit = (directory) => {
        for (const entry of readdirSync(directory).sort(byteSort)) {
            const absolute = join(directory, entry);
            const metadata = lstatSync(absolute);
            if (metadata.isSymbolicLink()) throw new Error(`symbolic links are forbidden: ${absolute}`);
            if (metadata.isDirectory()) visit(absolute);
            else if (metadata.isFile()) result.push(absolute);
            else throw new Error(`unsupported filesystem entry: ${absolute}`);
        }
    };
    visit(root);
    return result;
}

function canonicalDirectory(path, label) {
    const absolute = resolve(path);
    const canonical = realpathSync(absolute);
    if (canonical !== absolute) throw new Error(`${label} is not its own canonical real path`);
    if (!lstatSync(canonical).isDirectory()) throw new Error(`${label} is not a directory`);
    return canonical;
}

function canonicalFile(path, label) {
    const absolute = resolve(path);
    const canonical = realpathSync(absolute);
    if (canonical !== absolute) throw new Error(`${label} is not its own canonical real path`);
    const metadata = lstatSync(canonical);
    if (!metadata.isFile() || metadata.isSymbolicLink()) throw new Error(`${label} is not a regular file`);
    return canonical;
}

function serializeLedger(rows) {
    return rows.length === 0
        ? ""
        : `${rows.map((row) => `${row.hash}  ${row.path}`).join("\n")}\n`;
}

function verifyWholeTree(root, rows) {
    const actualPaths = filesBelow(root)
        .map((file) => relative(root, file).split(sep).join("/"))
        .sort(byteSort);
    const expectedPaths = rows.map((row) => row.path);
    if (actualPaths.length !== expectedPaths.length
        || actualPaths.some((path, index) => path !== expectedPaths[index])) {
        throw new Error(`live path set differs from sealed ledger under ${root}`);
    }
    for (const row of rows) {
        if (sha256(readFileSync(join(root, ...row.path.split("/")))) !== row.hash) {
            throw new Error(`live byte drift: ${row.path}`);
        }
    }
    return sha256(serializeLedger(rows));
}

function verifyParseThatDist(root, rows) {
    const actualPaths = filesBelow(join(root, "dist"))
        .map((file) => relative(root, file).split(sep).join("/"))
        .sort(byteSort);
    const expectedPaths = rows.map((row) => row.path);
    if (actualPaths.length !== expectedPaths.length
        || actualPaths.some((path, index) => path !== expectedPaths[index])) {
        throw new Error("installed parse-that dist path set differs from sealed ledger");
    }
    for (const row of rows) {
        if (sha256(readFileSync(join(root, ...row.path.split("/")))) !== row.hash) {
            throw new Error(`installed parse-that byte drift: ${row.path}`);
        }
    }
    return sha256(serializeLedger(rows));
}

function pathBelow(root, file) {
    const path = relative(root, file);
    return path !== "" && path !== ".." && !path.startsWith(`..${sep}`) && !path.startsWith(sep);
}

function rowMap(rows) {
    return new Map(rows.map((row) => [row.path, row.hash]));
}

function diagnosticText(ts, diagnostics) {
    return diagnostics.map((diagnostic) => {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        if (diagnostic.file === undefined || diagnostic.start === undefined) return `TS${diagnostic.code}: ${message}`;
        const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        return `${diagnostic.file.fileName}:${position.line + 1}:${position.character + 1} TS${diagnostic.code}: ${message}`;
    }).join("\n");
}

function typeProbeText() {
    return [
        'import { numberStart } from "./number-start.js";',
        'import type { Parser } from "@mkbabb/parse-that/core";',
        "type IsAny<T> = 0 extends (1 & T) ? true : false;",
        "type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? ([keyof T] extends [never] ? true : false) : false;",
        "type Exact<A, B> = IsAny<A> extends true ? false : IsAny<B> extends true ? false : IsUnknown<A> extends true ? false : IsUnknown<B> extends true ? false : [A] extends [B] ? ([B] extends [A] ? true : false) : false;",
        "type Payload<T> = T extends Parser<infer Value> ? Value : never;",
        "type Assert<T extends true> = T;",
        "export type __G7RootNotAny = Assert<IsAny<typeof numberStart> extends false ? true : false>;",
        "export type __G7RootNotUnknown = Assert<IsUnknown<typeof numberStart> extends false ? true : false>;",
        "export type __G7RootExact = Assert<Exact<typeof numberStart, Parser<boolean>>>;",
        "export type __G7PayloadNotAny = Assert<IsAny<Payload<typeof numberStart>> extends false ? true : false>;",
        "export type __G7PayloadNotUnknown = Assert<IsUnknown<Payload<typeof numberStart>> extends false ? true : false>;",
        "export type __G7PayloadExact = Assert<Exact<Payload<typeof numberStart>, boolean>>;",
        "",
    ].join("\n");
}

function assertCandidateSurface(sourceText, ts) {
    const sourceFile = ts.createSourceFile(targetPath, sourceText, ts.ScriptTarget.ES2022, true);
    if (sourceFile.parseDiagnostics.length !== 0) throw new Error("candidate contains TypeScript syntax errors");
    const forbiddenIdentifiers = new Set([
        "src", "Reflect", "Proxy", "Object", "JSON", "String", "Symbol", "RegExp",
        "URL", "URLSearchParams", "Intl", "globalThis", "window", "console",
        "structuredClone", "encodeURI", "encodeURIComponent", "decodeURI",
        "decodeURIComponent", "eval", "Function",
    ]);
    const forbiddenProperties = new Set([
        "src", "substring", "substr", "slice", "charAt", "charCodeAt", "codePointAt",
        "at", "keys", "values", "entries", "getOwnPropertyNames",
        "getOwnPropertyDescriptor", "getOwnPropertyDescriptors", "toString",
        "toLocaleString", "valueOf", "getColumnNumber", "getLineNumber",
        "getLineAndColumn", "clone", "constructor", "concat", "includes",
        "startsWith", "endsWith", "match", "matchAll", "replace", "replaceAll",
        "search", "split", "localeCompare",
    ]);
    const fail = (message) => { throw new Error(message); };
    let directNumberStartExports = 0;
    const visit = (node) => {
        if (ts.isImportDeclaration(node)) {
            if (!ts.isStringLiteral(node.moduleSpecifier) || node.moduleSpecifier.text !== allowedModule) {
                fail(`only ${allowedModule} imports are permitted`);
            }
        }
        if (ts.isImportEqualsDeclaration(node)) fail("import-equals is forbidden");
        if (ts.isExportDeclaration(node)) fail("export declarations are forbidden; export numberStart directly");
        if (ts.isExportAssignment(node)) fail("export assignments are forbidden");
        if (ts.isVariableStatement(node)
            && node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
            const declarations = node.declarationList.declarations;
            if (declarations.length !== 1
                || !ts.isIdentifier(declarations[0].name)
                || declarations[0].name.text !== "numberStart") {
                fail("the sole exported variable must be numberStart");
            }
            directNumberStartExports += 1;
        } else if (ts.canHaveModifiers(node)
            && ts.getModifiers(node)?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
            fail("only a direct exported numberStart variable is permitted");
        }
        if (ts.isCallExpression(node)) {
            if (node.expression.kind === ts.SyntaxKind.ImportKeyword) fail("dynamic import is forbidden");
            if (ts.isIdentifier(node.expression) && node.expression.text === "require") fail("require is forbidden");
        }
        if (ts.isTemplateExpression(node) || ts.isTaggedTemplateExpression(node)) {
            fail("runtime template coercion is forbidden in this grammar cell");
        }
        if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
            fail("binary plus/coercion is forbidden in this grammar cell");
        }
        if (ts.isElementAccessExpression(node)) fail("computed element access is forbidden");
        if (ts.isObjectBindingPattern(node)) fail("object destructuring is forbidden");
        if (ts.isSpreadAssignment(node)) fail("object spread is forbidden");
        if (ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node)
            || ts.isWhileStatement(node) || ts.isDoStatement(node)) {
            fail("imperative loops are forbidden in this three-position grammar cell");
        }
        if (ts.isIdentifier(node) && forbiddenIdentifiers.has(node.text)) {
            fail(`forbidden identifier: ${node.text}`);
        }
        if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && node.text === "src") {
            fail("source property spelling is forbidden");
        }
        if (ts.isPropertyAccessExpression(node) && forbiddenProperties.has(node.name.text)) {
            fail(`forbidden property access: ${node.name.text}`);
        }
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    if (directNumberStartExports !== 1) {
        fail(`expected exactly one direct numberStart export, received ${directNumberStartExports}`);
    }
}

export function verifyManifestTrustAnchor(verifierFileArgument, expectedManifestSha256) {
    if (!/^[0-9a-f]{64}$/.test(expectedManifestSha256)) {
        throw new Error("expected manifest SHA-256 must be one lowercase 64-hex digest");
    }
    const verifierFile = canonicalFile(verifierFileArgument, "promotion verifier");
    const manifestFile = canonicalFile(join(dirname(verifierFile), manifestName), "sealed G7 manifest");
    const manifestBytes = readFileSync(manifestFile);
    const manifestSha256 = sha256(manifestBytes);
    if (manifestSha256 !== expectedManifestSha256) {
        throw new Error("sealed G7 manifest differs from the externally supplied owner-sealed digest");
    }
    const manifest = JSON.parse(manifestBytes.toString("utf8"));
    if (manifest.feature_id !== "SYNTAX-NUMBER-START" || manifest.generation !== 7) {
        throw new Error("manifest feature/generation identity mismatch");
    }
    if (!Array.isArray(manifest.public_input_closure)) {
        throw new Error("manifest has no public_input_closure");
    }
    const ownRows = manifest.public_input_closure.filter((row) => row?.path === verifierName);
    if (ownRows.length !== 1) throw new Error(`manifest must contain exactly one ${verifierName} row`);
    const verifierBytes = readFileSync(verifierFile);
    const verifierSha256 = sha256(verifierBytes);
    const ownRow = ownRows[0];
    if (ownRow.bytes !== verifierBytes.length || ownRow.sha256 !== verifierSha256) {
        throw new Error("running verifier bytes differ from their exact sealed-manifest row");
    }
    return Object.freeze({
        suppliedOwnerSealedManifestSha256: expectedManifestSha256,
        manifestFile,
        manifestBytes: manifestBytes.length,
        manifestSha256,
        verifierFile,
        verifierBytes: verifierBytes.length,
        verifierSha256,
        verifierManifestRow: Object.freeze({
            path: ownRow.path,
            bytes: ownRow.bytes,
            sha256: ownRow.sha256,
        }),
    });
}

export function verifyCandidateTypeProgram({
    candidateFile,
    candidateBytes,
    ts,
    parseThatPackageRoot,
    typeScriptPackageRoot,
    parseThatRows,
    typeScriptRows,
}) {
    const canonicalCandidate = canonicalFile(candidateFile, "candidate source");
    const diskBytes = readFileSync(canonicalCandidate);
    if (!diskBytes.equals(candidateBytes)) throw new Error("candidate bytes changed before isolated type proof");
    const candidateText = candidateBytes.toString("utf8");
    if (!Buffer.from(candidateText, "utf8").equals(candidateBytes)) {
        throw new Error("candidate source must be canonical UTF-8");
    }
    const probeFile = join(dirname(canonicalCandidate), ".syntax-number-start-g7.type-probe.ts");
    const probeText = typeProbeText();
    const probeBytes = Buffer.from(probeText, "utf8");
    const options = Object.freeze({
        strict: true,
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        noEmit: true,
        types: [],
        lib: ["lib.es2022.d.ts"],
        allowJs: false,
        checkJs: false,
        skipLibCheck: false,
        noResolve: false,
        useDefineForClassFields: true,
        verbatimModuleSyntax: true,
    });
    const baseHost = ts.createCompilerHost(options, true);
    const originalFileExists = baseHost.fileExists.bind(baseHost);
    const originalReadFile = baseHost.readFile.bind(baseHost);
    const originalGetSourceFile = baseHost.getSourceFile.bind(baseHost);
    const coreDeclaration = join(parseThatPackageRoot, "dist", "core.d.ts");
    const parserPackageId = Object.freeze({
        name: "@mkbabb/parse-that",
        subModuleName: "core",
        version: "1.0.0",
    });
    baseHost.fileExists = (file) => resolve(file) === probeFile || originalFileExists(file);
    baseHost.readFile = (file) => resolve(file) === probeFile ? probeText : originalReadFile(file);
    baseHost.getSourceFile = (file, languageVersion, onError, shouldCreateNewSourceFile) => {
        if (resolve(file) === probeFile) {
            return ts.createSourceFile(probeFile, probeText, languageVersion, true, ts.ScriptKind.TS);
        }
        return originalGetSourceFile(file, languageVersion, onError, shouldCreateNewSourceFile);
    };
    baseHost.resolveModuleNames = (moduleNames, containingFile) => moduleNames.map((moduleName) => {
        if (resolve(containingFile) === probeFile && moduleName === "./number-start.js") {
            return {
                resolvedFileName: canonicalCandidate,
                extension: ts.Extension.Ts,
                isExternalLibraryImport: false,
            };
        }
        if (moduleName === allowedModule) {
            return {
                resolvedFileName: coreDeclaration,
                extension: ts.Extension.Dts,
                isExternalLibraryImport: true,
                packageId: parserPackageId,
            };
        }
        return ts.resolveModuleName(moduleName, containingFile, options, baseHost).resolvedModule;
    });

    const program = ts.createProgram({
        rootNames: [canonicalCandidate, probeFile],
        options,
        host: baseHost,
    });
    const parseThatByPath = rowMap(parseThatRows);
    const typeScriptByPath = rowMap(typeScriptRows);
    const resolvedInputs = [];
    let candidateSource;
    let probeSource;
    for (const sourceFile of program.getSourceFiles()) {
        const file = resolve(sourceFile.fileName);
        if (file === canonicalCandidate) {
            candidateSource = sourceFile;
            resolvedInputs.push({
                kind: "candidate",
                path: targetPath,
                bytes: candidateBytes.length,
                sha256: sha256(candidateBytes),
            });
            continue;
        }
        if (file === probeFile) {
            probeSource = sourceFile;
            resolvedInputs.push({
                kind: "verifier-generated-probe",
                path: probeIdentity,
                bytes: probeBytes.length,
                sha256: sha256(probeBytes),
            });
            continue;
        }
        const canonical = canonicalFile(file, "resolved TypeScript program source");
        if (pathBelow(typeScriptPackageRoot, canonical)) {
            const path = relative(typeScriptPackageRoot, canonical).split(sep).join("/");
            const bytes = readFileSync(canonical);
            if (typeScriptByPath.get(path) !== sha256(bytes)) {
                throw new Error(`resolved TypeScript source is not byte-bound by its package ledger: ${path}`);
            }
            resolvedInputs.push({ kind: "typescript-package", path: `typescript/${path}`, bytes: bytes.length, sha256: sha256(bytes) });
            continue;
        }
        if (pathBelow(parseThatPackageRoot, canonical)) {
            const path = relative(parseThatPackageRoot, canonical).split(sep).join("/");
            const bytes = readFileSync(canonical);
            if (parseThatByPath.get(path) !== sha256(bytes)) {
                throw new Error(`resolved parse-that source is not byte-bound by its package ledger: ${path}`);
            }
            resolvedInputs.push({ kind: "parse-that-package", path: `parse-that/${path}`, bytes: bytes.length, sha256: sha256(bytes) });
            continue;
        }
        throw new Error(`unbound TypeScript program source: ${canonical}`);
    }
    if (candidateSource === undefined || probeSource === undefined) {
        throw new Error("isolated program did not contain both exact compiler roots");
    }
    resolvedInputs.sort((left, right) => byteSort(left.path, right.path));
    if (new Set(resolvedInputs.map((input) => input.path)).size !== resolvedInputs.length) {
        throw new Error("isolated program resolved duplicate source identities");
    }
    const diagnostics = ts.getPreEmitDiagnostics(program);
    if (diagnostics.length !== 0) {
        throw new Error(`isolated type proof has diagnostics:\n${diagnosticText(ts, diagnostics)}`);
    }

    const checker = program.getTypeChecker();
    const moduleSymbol = checker.getSymbolAtLocation(candidateSource);
    if (moduleSymbol === undefined) throw new Error("candidate has no source-module symbol");
    const exports = checker.getExportsOfModule(moduleSymbol);
    if (exports.length !== 1 || exports[0].getName() !== "numberStart") {
        throw new Error(`candidate must expose exactly numberStart; observed ${exports.map((symbol) => symbol.getName()).join(",")}`);
    }
    const numberStartSymbol = exports[0];
    const declaration = numberStartSymbol.valueDeclaration ?? numberStartSymbol.declarations?.[0];
    if (declaration === undefined || declaration.getSourceFile() !== candidateSource) {
        throw new Error("numberStart export is not declared by the exact candidate source");
    }
    const observedType = checker.getTypeOfSymbolAtLocation(numberStartSymbol, declaration);
    if ((observedType.flags & ts.TypeFlags.Object) === 0
        || (observedType.objectFlags & ts.ObjectFlags.Reference) === 0) {
        throw new Error("numberStart observed type is not one exact generic type reference");
    }
    const observedTarget = observedType.target ?? observedType;
    const observedTargetSymbol = observedTarget.symbol ?? observedType.symbol;
    if (observedTargetSymbol?.getName() !== "Parser") {
        throw new Error(`numberStart observed generic root is not Parser: ${observedTargetSymbol?.getName() ?? "<none>"}`);
    }
    const parserDeclarationFiles = (observedTargetSymbol.declarations ?? [])
        .map((item) => canonicalFile(item.getSourceFile().fileName, "observed Parser declaration"));
    const expectedParserDeclaration = join(parseThatPackageRoot, "dist", "parser.d.ts");
    if (parserDeclarationFiles.length === 0
        || parserDeclarationFiles.some((file) => file !== expectedParserDeclaration)) {
        throw new Error("numberStart Parser symbol is not declared solely by the ledger-bound parse-that parser.d.ts");
    }
    const observedTypeArgumentTypes = checker.getTypeArguments(observedType);
    if (observedTypeArgumentTypes.length !== 1
        || (observedTypeArgumentTypes[0].flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) !== 0
        || checker.typeToString(observedTypeArgumentTypes[0], declaration, ts.TypeFormatFlags.NoTruncation) !== "boolean") {
        throw new Error("numberStart must carry exactly the boolean Parser payload type");
    }
    const observedTypeArguments = observedTypeArgumentTypes.map((type) => ({
            text: checker.typeToString(type, declaration, ts.TypeFormatFlags.NoTruncation),
            flags: type.flags,
        }));
    const inputLedger = serializeLedger(resolvedInputs.map((input) => ({ hash: input.sha256, path: input.path })));
    return Object.freeze({
        compilerOptions: Object.freeze({
            strict: true,
            target: "ES2022",
            module: "ESNext",
            moduleResolution: "Bundler",
            noEmit: true,
            types: Object.freeze([]),
            lib: Object.freeze(["lib.es2022.d.ts"]),
            allowJs: false,
            checkJs: false,
            skipLibCheck: false,
            noResolve: false,
            useDefineForClassFields: true,
            verbatimModuleSyntax: true,
        }),
        compilerRoots: Object.freeze([targetPath, probeIdentity]),
        diagnostics: 0,
        resolvedInputCount: resolvedInputs.length,
        resolvedInputs: Object.freeze(resolvedInputs.map((input) => Object.freeze(input))),
        resolvedInputLedger: inputLedger,
        resolvedInputLedgerSha256: sha256(inputLedger),
        observedExport: Object.freeze({
            names: Object.freeze(exports.map((symbol) => symbol.getName())),
            symbolFlags: numberStartSymbol.flags,
            declarationKind: ts.SyntaxKind[declaration.kind],
            type: checker.typeToString(observedType, declaration, ts.TypeFormatFlags.NoTruncation),
            typeFlags: observedType.flags,
            genericRoot: observedTargetSymbol.getName(),
            genericRootDeclarationFiles: Object.freeze(parserDeclarationFiles),
            typeArguments: Object.freeze(observedTypeArguments.map((argument) => Object.freeze(argument))),
            enforcedByProbe: Object.freeze([
                "root-not-any",
                "root-not-unknown",
                "root-bidirectionally-exact-Parser<boolean>",
                "payload-not-any",
                "payload-not-unknown",
                "payload-bidirectionally-exact-boolean",
            ]),
        }),
        probe: Object.freeze({
            identity: probeIdentity,
            bytes: probeBytes.length,
            sha256: sha256(probeBytes),
            persisted: false,
        }),
    });
}

export async function verifyPromotionOverlay(expectedManifestSha256, overlayRootArgument) {
    const verifierFile = canonicalFile(fileURLToPath(import.meta.url), "promotion verifier");
    const trustAnchor = verifyManifestTrustAnchor(verifierFile, expectedManifestSha256);
    const mirrorRoot = canonicalDirectory(resolve(dirname(verifierFile), "../../.."), "mirror root");
    const verifierRelative = relative(mirrorRoot, verifierFile).split(sep).join("/");
    if (verifierRelative !== expectedVerifierRelative) {
        throw new Error(`verifier is not running from its governed live location: ${verifierRelative}`);
    }
    const activeRoot = canonicalDirectory(join(mirrorRoot, "apotheosis"), "active root");
    const grammarRoot = canonicalDirectory(join(activeRoot, "grammar"), "active grammar root");
    const parseThatPackageRoot = canonicalDirectory(join(mirrorRoot, "node_modules", "@mkbabb", "parse-that"), "installed parse-that root");
    const typeScriptPackageRoot = canonicalDirectory(join(mirrorRoot, "node_modules", "typescript"), "installed TypeScript root");
    const overlayRoot = canonicalDirectory(overlayRootArgument, "candidate overlay root");

    const cleanBaseFile = canonicalFile(join(activeRoot, "clean-base.json"), "clean-base manifest");
    if (sha256(readFileSync(cleanBaseFile)) !== expectedCleanBaseSha256) throw new Error("clean-base manifest drift");
    const cleanBase = JSON.parse(readFileSync(cleanBaseFile, "utf8"));
    if (!Array.isArray(cleanBase.typescript_sources) || cleanBase.typescript_sources.length !== 0) {
        throw new Error("clean-base manifest must declare zero TypeScript sources");
    }
    const activeTypeScript = filesBelow(grammarRoot).filter((file) => file.endsWith(".ts"));
    if (activeTypeScript.length !== 0) throw new Error(`active clean base contains ${activeTypeScript.length} unexpected TypeScript files`);
    if (sha256("") !== emptyLedgerSha256) throw new Error("empty-ledger identity invariant failed");

    const parseThatLedgerFile = canonicalFile(join(mirrorRoot, "cells", "syntax-number-start", "g3", "parse-that-dist.ledger"), "parse-that dist ledger");
    const parseThatRows = parseLedger(parseThatLedgerFile, expectedParseThatLedgerSha256, 64);
    const parseThatAggregate = verifyParseThatDist(parseThatPackageRoot, parseThatRows);
    if (parseThatAggregate !== expectedParseThatLedgerSha256) throw new Error("parse-that dist aggregate drift");
    if (sha256(readFileSync(join(parseThatPackageRoot, "package.json"))) !== expectedParseThatPackageSha256) {
        throw new Error("installed parse-that package.json drift");
    }

    const typeScriptLedgerFile = canonicalFile(join(mirrorRoot, "cells", "syntax-number-start", "g6", "typescript-package.ledger"), "TypeScript package ledger");
    const typeScriptRows = parseLedger(typeScriptLedgerFile, expectedTypeScriptLedgerSha256, expectedTypeScriptFileCount);
    const typeScriptAggregate = verifyWholeTree(typeScriptPackageRoot, typeScriptRows);
    if (typeScriptAggregate !== expectedTypeScriptLedgerSha256) throw new Error("installed TypeScript package aggregate drift");
    const typeScriptPackage = JSON.parse(readFileSync(join(typeScriptPackageRoot, "package.json"), "utf8"));
    if (typeScriptPackage.name !== "typescript" || typeScriptPackage.version !== "5.8.3") {
        throw new Error("installed TypeScript package identity drift");
    }
    if (sha256(readFileSync(join(mirrorRoot, "package.json"))) !== expectedMirrorPackageSha256) throw new Error("active mirror package.json drift");
    if (sha256(readFileSync(join(mirrorRoot, "package-lock.json"))) !== expectedMirrorLockSha256) throw new Error("active mirror package-lock.json drift");

    const overlayFiles = filesBelow(overlayRoot);
    if (overlayFiles.length !== 1) throw new Error("candidate overlay must contain exactly one regular file");
    const overlayRelative = relative(overlayRoot, overlayFiles[0]).split(sep).join("/");
    if (overlayRelative !== targetPath) throw new Error(`unexpected overlay path: ${overlayRelative}`);
    const sourceFile = canonicalFile(overlayFiles[0], "candidate source");
    const sourceBytes = readFileSync(sourceFile);
    const sourceText = sourceBytes.toString("utf8");
    if (!Buffer.from(sourceText, "utf8").equals(sourceBytes)) throw new Error("candidate source must be canonical UTF-8");

    const ts = await import(pathToFileURL(join(typeScriptPackageRoot, "lib", "typescript.js")).href);
    assertCandidateSurface(sourceText, ts);
    const typeProof = verifyCandidateTypeProgram({
        candidateFile: sourceFile,
        candidateBytes: sourceBytes,
        ts,
        parseThatPackageRoot,
        typeScriptPackageRoot,
        parseThatRows,
        typeScriptRows,
    });

    const sourceHash = sha256(sourceBytes);
    const overlayLedger = `${sourceHash}  ${targetPath}\n`;
    return Object.freeze({
        targetPath,
        sourceSha256: sourceHash,
        sourceBytes: sourceBytes.length,
        overlayLedger,
        overlayLedgerSha256: sha256(overlayLedger),
        projectedGrammarLedgerSha256: sha256(overlayLedger),
        projectedGrammarLedgerBytes: Buffer.byteLength(overlayLedger),
        trustAnchor,
        typeProof,
        cleanBaseManifestSha256: expectedCleanBaseSha256,
        cleanBaseGrammarLedgerSha256: emptyLedgerSha256,
        parseThatDistLedgerSha256: parseThatAggregate,
        typeScriptPackageLedgerSha256: typeScriptAggregate,
        typeScriptPackageFileCount: typeScriptRows.length,
        resolvedRoots: Object.freeze({
            verifierFile,
            mirrorRoot,
            activeRoot,
            grammarRoot,
            parseThatPackageRoot,
            typeScriptPackageRoot,
            overlayRoot,
        }),
        hostRuntime: Object.freeze({
            nodeExecutable: process.execPath,
            nodeVersion: process.version,
            v8Version: process.versions.v8,
            disposition: "ENVIRONMENT_RECEIPT_NOT_BYTE_BOUND",
        }),
        imports: Object.freeze([allowedModule]),
    });
}

const invokedFile = process.argv[1] === undefined ? null : resolve(process.argv[1]);
if (invokedFile === fileURLToPath(import.meta.url)) {
    if (process.argv.length !== 4) {
        throw new Error("usage: node promotion-verifier.mjs <owner-sealed-g7-manifest-sha256> <candidate-overlay-root>");
    }
    process.stdout.write(`${JSON.stringify(await verifyPromotionOverlay(process.argv[2], process.argv[3]), null, 2)}\n`);
}
