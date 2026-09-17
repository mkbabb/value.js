import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import * as ts from "typescript";
import {
    verifyPromotionOverlay as verifyGeneration3Overlay,
    type PromotionIdentity,
} from "../g3/promotion-verifier.js";

const targetPath = "grammar/css/l4/value-unit/number-start.ts";
const expectedBaseLedgerSha256 = "115b93f3b44fd0df7fc941e499e9392405a39267b87c2867617521f93e273b4c";
const expectedDistLedgerSha256 = "998c5668fa103e4692d69f48a0665f152cb1d014b11fa668c99693307ef1690b";
const expectedInstalledPackageSha256 = "f53ca9b85c43e65c1f3f8a21414f990211d8d0e6a7f07df805557cdb6b50f4ff";
const expectedMirrorPackageSha256 = "9250d9d95ab51664a47682a61bb1d82de8938481d8413b792378c9155d15723b";
const expectedMirrorLockSha256 = "489c5981ffa75d795cd3fae0e6d5a837b272ffec1633d862dba9c11a59e668b7";

const sha256 = (bytes: string | Uint8Array): string =>
    createHash("sha256").update(bytes).digest("hex");

const byteSort = (left: string, right: string): number =>
    Buffer.from(left).compare(Buffer.from(right));

type LedgerRow = Readonly<{ hash: string; path: string }>;

function parseLedger(file: string, expectedHash: string): LedgerRow[] {
    const bytes = readFileSync(file);
    if (sha256(bytes) !== expectedHash) throw new Error(`ledger hash mismatch: ${file}`);
    const text = bytes.toString("utf8");
    if (!text.endsWith("\n")) throw new Error(`ledger lacks final LF: ${file}`);
    const rows = text.slice(0, -1).split("\n").map((line) => {
        const match = /^([0-9a-f]{64})  ([^\n]+)$/.exec(line);
        if (match === null) throw new Error(`invalid ledger row: ${line}`);
        return Object.freeze({ hash: match[1]!, path: match[2]! });
    });
    const sorted = [...rows].sort((left, right) => byteSort(left.path, right.path));
    if (rows.some((row, index) => row.path !== sorted[index]?.path)) {
        throw new Error(`ledger is not byte-sorted: ${file}`);
    }
    return rows;
}

function filesBelow(root: string): string[] {
    const result: string[] = [];
    const visit = (directory: string): void => {
        for (const entry of readdirSync(directory).sort(byteSort)) {
            const absolute = join(directory, entry);
            if (statSync(absolute).isDirectory()) visit(absolute);
            else result.push(absolute);
        }
    };
    visit(root);
    return result;
}

function verifyLiveTree(
    root: string,
    subtree: string,
    rows: readonly LedgerRow[],
    include: (path: string) => boolean,
): void {
    const absoluteRoot = resolve(root);
    const actualPaths = filesBelow(join(absoluteRoot, subtree))
        .map((file) => relative(absoluteRoot, file).split(sep).join("/"))
        .filter(include)
        .sort(byteSort);
    const expectedPaths = rows.map((row) => row.path);
    if (actualPaths.length !== expectedPaths.length
        || actualPaths.some((path, index) => path !== expectedPaths[index])) {
        throw new Error(`live path set differs from sealed ledger under ${subtree}`);
    }
    for (const row of rows) {
        const bytes = readFileSync(join(absoluteRoot, ...row.path.split("/")));
        if (sha256(bytes) !== row.hash) throw new Error(`live byte drift: ${row.path}`);
    }
}

function assertGeneration4CandidateSurface(sourceText: string): void {
    const sourceFile = ts.createSourceFile(targetPath, sourceText, ts.ScriptTarget.ES2022, true);
    const forbiddenIdentifiers = new Set([
        "src",
        "Reflect",
        "Proxy",
        "Object",
        "JSON",
        "String",
        "globalThis",
        "window",
        "eval",
        "Function",
    ]);
    const forbiddenProperties = new Set([
        "src",
        "substring",
        "substr",
        "slice",
        "charAt",
        "charCodeAt",
        "codePointAt",
        "at",
        "keys",
        "values",
        "entries",
        "getOwnPropertyNames",
        "getOwnPropertyDescriptor",
        "getOwnPropertyDescriptors",
        "toString",
        "getColumnNumber",
        "getLineNumber",
        "getLineAndColumn",
        "clone",
    ]);
    const fail = (message: string): never => { throw new Error(message); };
    let directNumberStartExports = 0;
    const visit = (node: ts.Node): void => {
        if (ts.isExportDeclaration(node)) fail("export declarations are forbidden; export numberStart directly");
        if (ts.isExportAssignment(node)) fail("export assignments are forbidden; use a named numberStart export");
        if (ts.isVariableStatement(node)
            && node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
            if (node.declarationList.declarations.length !== 1
                || !ts.isIdentifier(node.declarationList.declarations[0]!.name)
                || node.declarationList.declarations[0]!.name.text !== "numberStart") {
                fail("the sole exported variable must be numberStart");
            }
            directNumberStartExports += 1;
        } else if (ts.canHaveModifiers(node)
            && ts.getModifiers(node)?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
            fail("only a direct exported numberStart variable is permitted");
        }
        if (ts.isElementAccessExpression(node)) fail("computed element access is forbidden in this grammar cell");
        if (ts.isObjectBindingPattern(node)) fail("object destructuring is forbidden in this grammar cell");
        if (ts.isSpreadAssignment(node)) fail("object spread is forbidden in this grammar cell");
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

export type Generation4PromotionArguments = Readonly<{
    overlayRoot: string;
    mirrorRoot: string;
    baseLedgerFile: string;
    parseThatPackageRoot: string;
    distLedgerFile: string;
    mirrorPackageFile: string;
    mirrorLockFile: string;
}>;

export function verifyPromotionOverlay(arguments_: Generation4PromotionArguments): PromotionIdentity {
    const overlayRoot = resolve(arguments_.overlayRoot);
    const overlayFiles = filesBelow(overlayRoot);
    if (overlayFiles.length !== 1) throw new Error("candidate overlay must contain exactly one file");
    const overlayRelative = relative(overlayRoot, overlayFiles[0]!).split(sep).join("/");
    if (overlayRelative !== targetPath) throw new Error(`unexpected overlay path: ${overlayRelative}`);
    assertGeneration4CandidateSurface(readFileSync(overlayFiles[0]!, "utf8"));

    const baseRows = parseLedger(arguments_.baseLedgerFile, expectedBaseLedgerSha256);
    verifyLiveTree(arguments_.mirrorRoot, "grammar", baseRows, (path) => path.endsWith(".ts"));

    const distRows = parseLedger(arguments_.distLedgerFile, expectedDistLedgerSha256);
    verifyLiveTree(arguments_.parseThatPackageRoot, "dist", distRows, () => true);
    if (sha256(readFileSync(join(resolve(arguments_.parseThatPackageRoot), "package.json")))
        !== expectedInstalledPackageSha256) {
        throw new Error("installed parse-that package.json drift");
    }
    if (sha256(readFileSync(arguments_.mirrorPackageFile)) !== expectedMirrorPackageSha256) {
        throw new Error("mirror package.json drift");
    }
    if (sha256(readFileSync(arguments_.mirrorLockFile)) !== expectedMirrorLockSha256) {
        throw new Error("mirror package-lock.json drift");
    }

    return verifyGeneration3Overlay(overlayRoot, arguments_.baseLedgerFile);
}
