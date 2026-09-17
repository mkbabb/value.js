import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

function repositoryRoot(start: string): string {
    for (let current = start; current !== dirname(current); current = dirname(current)) {
        const packagePath = join(current, "package.json");
        if (!existsSync(packagePath)) continue;
        const manifest = JSON.parse(readFileSync(packagePath, "utf8")) as { name?: string };
        if (manifest.name === "@mkbabb/value.js") return current;
    }
    throw new Error("Unable to locate the value.js repository root.");
}

const mirrorRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = repositoryRoot(mirrorRoot);

function normalizedTypeBody(path: string): string {
    const source = readFileSync(path, "utf8").replaceAll("\r\n", "\n");
    const lines = source.split("\n");
    let firstBodyLine = 0;
    while (firstBodyLine < lines.length && (lines[firstBodyLine]!.startsWith("import ") || lines[firstBodyLine] === "")) {
        firstBodyLine++;
    }
    return lines.slice(firstBodyLine).join("\n");
}

function explicitExports(path: string): readonly string[] {
    const source = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true);
    const names: string[] = [];
    for (const statement of source.statements) {
        if (!ts.isExportDeclaration(statement) || !statement.exportClause || !ts.isNamedExports(statement.exportClause)) continue;
        for (const element of statement.exportClause.elements) {
            names.push(`${statement.isTypeOnly || element.isTypeOnly ? "type" : "runtime"}:${element.name.text}`);
        }
    }
    return names;
}

function assertEqual(actual: unknown, expected: unknown, label: string): void {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${label} differs.\nactual=${JSON.stringify(actual)}\nexpected=${JSON.stringify(expected)}`);
    }
}

export function verifyDtsParity(requireEmitted = false): Readonly<{ types: number; runtime: number }> {
    const liveTypes = join(repoRoot, "src/css/types.ts");
    const mirrorTypes = join(mirrorRoot, "types.ts");
    assertEqual(normalizedTypeBody(mirrorTypes), normalizedTypeBody(liveTypes), "type bodies");

    const liveExports = explicitExports(join(repoRoot, "src/css/index.ts"));
    const mirrorExports = explicitExports(join(mirrorRoot, "index.ts"));
    assertEqual(mirrorExports, liveExports, "source barrel");

    const emittedIndex = join(mirrorRoot, ".dts/index.d.ts");
    if (requireEmitted) {
        if (!existsSync(emittedIndex)) throw new Error("Declaration emit did not create .dts/index.d.ts.");
        assertEqual(explicitExports(emittedIndex), liveExports, "emitted barrel");
    }

    const types = liveExports.filter((name) => name.startsWith("type:")).length;
    const runtime = liveExports.filter((name) => name.startsWith("runtime:")).length;
    assertEqual({ types, runtime }, { types: 33, runtime: 19 }, "52-export census");
    return { types, runtime };
}
