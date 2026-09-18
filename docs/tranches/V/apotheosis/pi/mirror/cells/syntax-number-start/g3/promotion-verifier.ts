import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import * as ts from "typescript";

const targetPath = "grammar/css/l4/value-unit/number-start.ts";
const allowedModule = "@mkbabb/parse-that/core";
const expectedBaseLedgerSha256 = "115b93f3b44fd0df7fc941e499e9392405a39267b87c2867617521f93e273b4c";
const forbiddenText = Object.freeze([
    "state.src",
    ".indexOf(",
    ".slice(",
    "balancedUntil",
    "splitTopLevel",
    "CssToken",
    "component-value",
    "ComponentValue",
    "CST",
    "@mkbabb/parse-that/diagnostics",
    "[^)]*",
    "[^;{}]*",
]);

const sha256 = (bytes: string | Uint8Array): string =>
    createHash("sha256").update(bytes).digest("hex");

const byteSort = (left: string, right: string): number =>
    Buffer.from(left).compare(Buffer.from(right));

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

function assertCandidateImports(sourceText: string): void {
    const sourceFile = ts.createSourceFile(targetPath, sourceText, ts.ScriptTarget.ES2022, true);
    const fail = (message: string): never => { throw new Error(message); };
    const visit = (node: ts.Node): void => {
        if (ts.isImportDeclaration(node)) {
            if (!ts.isStringLiteral(node.moduleSpecifier) || node.moduleSpecifier.text !== allowedModule) {
                fail(`only ${allowedModule} imports are permitted`);
            }
        }
        if (ts.isImportEqualsDeclaration(node)) fail("import-equals is forbidden");
        if (ts.isCallExpression(node)) {
            if (node.expression.kind === ts.SyntaxKind.ImportKeyword) fail("dynamic import is forbidden");
            if (ts.isIdentifier(node.expression) && node.expression.text === "require") {
                fail("require is forbidden");
            }
        }
        if (ts.isForStatement(node)
            || ts.isForInStatement(node)
            || ts.isForOfStatement(node)
            || ts.isWhileStatement(node)
            || ts.isDoStatement(node)) {
            fail("imperative loops are forbidden in this three-position grammar cell");
        }
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    for (const token of forbiddenText) {
        if (sourceText.includes(token)) throw new Error(`forbidden candidate text: ${token}`);
    }
}

type LedgerRow = Readonly<{ hash: string; path: string }>;

function parseLedger(bytes: string): LedgerRow[] {
    if (!bytes.endsWith("\n")) throw new Error("base ledger must end with LF");
    const rows = bytes.slice(0, -1).split("\n").map((line) => {
        const match = /^([0-9a-f]{64})  ([^\n]+)$/.exec(line);
        if (match === null) throw new Error(`invalid ledger line: ${line}`);
        return Object.freeze({ hash: match[1]!, path: match[2]! });
    });
    const sorted = [...rows].sort((left, right) => byteSort(left.path, right.path));
    if (rows.some((row, index) => row.path !== sorted[index]?.path)) {
        throw new Error("base ledger paths are not byte-sorted");
    }
    return rows;
}

const serializeLedger = (rows: readonly LedgerRow[]): string =>
    `${rows.map((row) => `${row.hash}  ${row.path}`).join("\n")}\n`;

export type PromotionIdentity = Readonly<{
    targetPath: typeof targetPath;
    sourceSha256: string;
    sourceBytes: number;
    overlayLedger: string;
    overlayLedgerSha256: string;
    projectedGrammarLedgerSha256: string;
    projectedGrammarLedgerBytes: number;
    imports: readonly [typeof allowedModule];
}>;

export function verifyPromotionOverlay(
    overlayRoot: string,
    baseLedgerFile: string,
): PromotionIdentity {
    const absoluteOverlay = resolve(overlayRoot);
    const files = filesBelow(absoluteOverlay);
    if (files.length !== 1) throw new Error(`overlay must contain exactly one file, received ${files.length}`);
    const relativePath = relative(absoluteOverlay, files[0]!).split(sep).join("/");
    if (relativePath !== targetPath) throw new Error(`unexpected overlay path: ${relativePath}`);

    const sourceBytes = readFileSync(files[0]!);
    const sourceText = sourceBytes.toString("utf8");
    if (!Buffer.from(sourceText, "utf8").equals(sourceBytes)) {
        throw new Error("candidate source must be valid canonical UTF-8");
    }
    assertCandidateImports(sourceText);
    const sourceHash = sha256(sourceBytes);
    const overlayLedger = `${sourceHash}  ${targetPath}\n`;

    const baseBytes = readFileSync(baseLedgerFile, "utf8");
    if (sha256(baseBytes) !== expectedBaseLedgerSha256) {
        throw new Error("base ledger hash does not match the sealed generation-3 identity");
    }
    const baseRows = parseLedger(baseBytes);
    if (baseRows.some((row) => row.path === targetPath)) {
        throw new Error(`base already owns candidate target: ${targetPath}`);
    }
    const projectedRows = [
        ...baseRows,
        Object.freeze({ hash: sourceHash, path: targetPath }),
    ].sort((left, right) => byteSort(left.path, right.path));
    const projectedLedger = serializeLedger(projectedRows);

    return Object.freeze({
        targetPath,
        sourceSha256: sourceHash,
        sourceBytes: sourceBytes.length,
        overlayLedger,
        overlayLedgerSha256: sha256(overlayLedger),
        projectedGrammarLedgerSha256: sha256(projectedLedger),
        projectedGrammarLedgerBytes: Buffer.byteLength(projectedLedger),
        imports: Object.freeze([allowedModule] as const),
    });
}
