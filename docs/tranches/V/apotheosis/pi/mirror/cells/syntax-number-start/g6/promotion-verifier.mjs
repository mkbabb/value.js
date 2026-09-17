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
const expectedVerifierRelative = "cells/syntax-number-start/g6/promotion-verifier.mjs";
const expectedCleanBaseSha256 = "dcece5fb104fbcbf1f87ec5d548307f38a0a18bf98bfdb9a771aef0bd7da37d2";
const expectedParseThatLedgerSha256 = "998c5668fa103e4692d69f48a0665f152cb1d014b11fa668c99693307ef1690b";
const expectedParseThatPackageSha256 = "f53ca9b85c43e65c1f3f8a21414f990211d8d0e6a7f07df805557cdb6b50f4ff";
const expectedTypeScriptLedgerSha256 = "3a08d88df997493df6c0dc751d81e52377f155defada21c1a0a7d4d0df048f47";
const expectedTypeScriptFileCount = 130;
const expectedMirrorPackageSha256 = "b15f2948615b3ab979fdd1c356d5cbdaee3639115e07930d4041ccc77b3cd3af";
const expectedMirrorLockSha256 = "489c5981ffa75d795cd3fae0e6d5a837b272ffec1633d862dba9c11a59e668b7";
const expectedActiveTsconfigSha256 = "8e4d9009e5d4678542ca908c842f391aa7faa8caff43c388d8f77d979ed3ac68";
const expectedParentTsconfigSha256 = "a0d0395313c3eb6521ba9b8550345ba21e1dba49f8f68d7c56dfa330e736a1cc";
const emptyLedgerSha256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

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

function verifyConfigClosure(activeConfigFile, parentConfigFile) {
    if (sha256(readFileSync(activeConfigFile)) !== expectedActiveTsconfigSha256) {
        throw new Error("active TypeScript configuration drift");
    }
    if (sha256(readFileSync(parentConfigFile)) !== expectedParentTsconfigSha256) {
        throw new Error("inherited TypeScript configuration drift");
    }
    const active = JSON.parse(readFileSync(activeConfigFile, "utf8"));
    const parent = JSON.parse(readFileSync(parentConfigFile, "utf8"));
    if (active.extends !== "./tsconfig.json") {
        throw new Error("active TypeScript configuration has an unexpected parent");
    }
    if (Object.hasOwn(parent, "extends")) {
        throw new Error("sealed TypeScript parent unexpectedly inherits another configuration");
    }
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

export async function verifyPromotionOverlay(overlayRootArgument) {
    const verifierFile = canonicalFile(fileURLToPath(import.meta.url), "promotion verifier");
    const mirrorRoot = canonicalDirectory(resolve(dirname(verifierFile), "../../.."), "mirror root");
    const verifierRelative = relative(mirrorRoot, verifierFile).split(sep).join("/");
    if (verifierRelative !== expectedVerifierRelative) {
        throw new Error(`verifier is not running from its sealed live location: ${verifierRelative}`);
    }
    const activeRoot = canonicalDirectory(join(mirrorRoot, "apotheosis"), "active root");
    const grammarRoot = canonicalDirectory(join(activeRoot, "grammar"), "active grammar root");
    const parseThatPackageRoot = canonicalDirectory(
        join(mirrorRoot, "node_modules", "@mkbabb", "parse-that"),
        "installed parse-that root",
    );
    const typeScriptPackageRoot = canonicalDirectory(
        join(mirrorRoot, "node_modules", "typescript"),
        "installed TypeScript root",
    );
    const activeTsconfigFile = canonicalFile(join(mirrorRoot, "tsconfig.apotheosis.json"), "active tsconfig");
    const parentTsconfigFile = canonicalFile(join(mirrorRoot, "tsconfig.json"), "parent tsconfig");
    const overlayRoot = canonicalDirectory(overlayRootArgument, "candidate overlay root");

    const cleanBaseFile = canonicalFile(join(activeRoot, "clean-base.json"), "clean-base manifest");
    if (sha256(readFileSync(cleanBaseFile)) !== expectedCleanBaseSha256) {
        throw new Error("clean-base manifest drift");
    }
    const cleanBase = JSON.parse(readFileSync(cleanBaseFile, "utf8"));
    if (!Array.isArray(cleanBase.typescript_sources) || cleanBase.typescript_sources.length !== 0) {
        throw new Error("clean-base manifest must declare zero TypeScript sources");
    }
    const activeTypeScript = filesBelow(grammarRoot).filter((file) => file.endsWith(".ts"));
    if (activeTypeScript.length !== 0) {
        throw new Error(`active clean base contains ${activeTypeScript.length} unexpected TypeScript files`);
    }
    if (sha256("") !== emptyLedgerSha256) throw new Error("empty-ledger identity invariant failed");

    const parseThatLedgerFile = canonicalFile(
        join(mirrorRoot, "cells", "syntax-number-start", "g3", "parse-that-dist.ledger"),
        "parse-that dist ledger",
    );
    const parseThatRows = parseLedger(parseThatLedgerFile, expectedParseThatLedgerSha256, 64);
    const parseThatAggregate = verifyParseThatDist(parseThatPackageRoot, parseThatRows);
    if (parseThatAggregate !== expectedParseThatLedgerSha256) throw new Error("parse-that dist aggregate drift");
    if (sha256(readFileSync(join(parseThatPackageRoot, "package.json"))) !== expectedParseThatPackageSha256) {
        throw new Error("installed parse-that package.json drift");
    }

    const typeScriptLedgerFile = canonicalFile(
        join(mirrorRoot, "cells", "syntax-number-start", "g6", "typescript-package.ledger"),
        "TypeScript package ledger",
    );
    const typeScriptRows = parseLedger(
        typeScriptLedgerFile,
        expectedTypeScriptLedgerSha256,
        expectedTypeScriptFileCount,
    );
    const typeScriptAggregate = verifyWholeTree(typeScriptPackageRoot, typeScriptRows);
    if (typeScriptAggregate !== expectedTypeScriptLedgerSha256) {
        throw new Error("installed TypeScript package aggregate drift");
    }
    const typeScriptPackage = JSON.parse(readFileSync(join(typeScriptPackageRoot, "package.json"), "utf8"));
    if (typeScriptPackage.name !== "typescript" || typeScriptPackage.version !== "5.8.3") {
        throw new Error("installed TypeScript package identity drift");
    }
    verifyConfigClosure(activeTsconfigFile, parentTsconfigFile);
    if (sha256(readFileSync(join(mirrorRoot, "package.json"))) !== expectedMirrorPackageSha256) {
        throw new Error("active mirror package.json drift");
    }
    if (sha256(readFileSync(join(mirrorRoot, "package-lock.json"))) !== expectedMirrorLockSha256) {
        throw new Error("active mirror package-lock.json drift");
    }

    const overlayFiles = filesBelow(overlayRoot);
    if (overlayFiles.length !== 1) throw new Error("candidate overlay must contain exactly one regular file");
    const overlayRelative = relative(overlayRoot, overlayFiles[0]).split(sep).join("/");
    if (overlayRelative !== targetPath) throw new Error(`unexpected overlay path: ${overlayRelative}`);
    const sourceBytes = readFileSync(overlayFiles[0]);
    const sourceText = sourceBytes.toString("utf8");
    if (!Buffer.from(sourceText, "utf8").equals(sourceBytes)) {
        throw new Error("candidate source must be canonical UTF-8");
    }

    const ts = await import(pathToFileURL(join(typeScriptPackageRoot, "lib", "typescript.js")).href);
    assertCandidateSurface(sourceText, ts);

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
        cleanBaseManifestSha256: expectedCleanBaseSha256,
        cleanBaseGrammarLedgerSha256: emptyLedgerSha256,
        parseThatDistLedgerSha256: parseThatAggregate,
        typeScriptPackageLedgerSha256: typeScriptAggregate,
        typeScriptPackageFileCount: typeScriptRows.length,
        typeScriptConfigClosure: Object.freeze({
            activeSha256: expectedActiveTsconfigSha256,
            parentSha256: expectedParentTsconfigSha256,
        }),
        typecheck: Object.freeze({
            nodeExecutable: process.execPath,
            nodeVersion: process.version,
            v8Version: process.versions.v8,
            typescriptCli: join(typeScriptPackageRoot, "bin", "tsc"),
            project: activeTsconfigFile,
            arguments: Object.freeze(["--project", activeTsconfigFile, "--noEmit"]),
            hostRuntimeDisposition: "ENVIRONMENT_RECEIPT_NOT_BYTE_BOUND",
        }),
        resolvedRoots: Object.freeze({
            verifierFile,
            mirrorRoot,
            activeRoot,
            grammarRoot,
            parseThatPackageRoot,
            typeScriptPackageRoot,
            activeTsconfigFile,
            parentTsconfigFile,
            overlayRoot,
        }),
        imports: Object.freeze([allowedModule]),
    });
}

const invokedFile = process.argv[1] === undefined ? null : resolve(process.argv[1]);
if (invokedFile === fileURLToPath(import.meta.url)) {
    if (process.argv.length !== 3) {
        throw new Error("usage: node promotion-verifier.mjs <candidate-overlay-root>");
    }
    process.stdout.write(`${JSON.stringify(await verifyPromotionOverlay(process.argv[2]), null, 2)}\n`);
}
