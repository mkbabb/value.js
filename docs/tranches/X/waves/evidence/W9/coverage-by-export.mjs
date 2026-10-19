// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W9.e · G19 — COVERAGE-BY-EXPORT over a recorded denominator.
 *
 * Run from the repository root:
 *
 *     node docs/tranches/X/waves/evidence/W9/coverage-by-export.mjs
 *
 * It prints, and nothing else decides: no threshold, no exit-1 floor. A
 * coverage floor with no consumer is L-19 contrivance (W9.md :261-262), so this
 * script REPORTS and always exits 0.
 *
 * ── DENOMINATOR (two, both read from the built surface) ──────────────────────
 *   runtime   — `Object.keys(await import("dist/subpaths/<entry>.js"))`, the
 *               names a consumer can call at run time.
 *   declared  — `^export declare ` lines across `dist/subpaths/*.d.ts`, the
 *               names a consumer can NAME in a type position (runtime names +
 *               the published types).
 * `dist/` must be built (`npm run build`) before this runs; the packed tarball
 * is byte-identical to it for these two reads (`npm pack` packs `dist`).
 *
 * ── NUMERATOR ────────────────────────────────────────────────────────────────
 * A runtime export is COVERED iff some module in the suite's own reachable
 * source graph, OUTSIDE `src/`, imports that name from a value.js specifier and
 * references it in its body. The graph is seeded with vitest's own include
 * globs (`vitest.config.ts`: `test/-slash-*.test.ts`, `demo/test/-slash-*.test.ts`)
 * and closed over first-party imports; `src/**` terminates a branch, because an
 * internal src→src use is not consumer coverage.
 *
 * ── WHAT THIS IS NOT ─────────────────────────────────────────────────────────
 * This is REACHABILITY-BY-NAME, not statement or branch coverage. It answers
 * "does the suite exercise this published name at all", which is the question
 * `verify-packed-surface.mjs`'s behavioural half asks of the TARBALL and this
 * asks of the TREE. It cannot see a name reached only through a dynamic
 * property lookup, and it does not claim the covered name's branches are
 * covered. No coverage provider is installed in this repository
 * (`ls node_modules | grep -i coverage` -> nothing), and installing one is a
 * `package.json` edit this unit does not hold.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// …/docs/tranches/X/waves/evidence/W9/ → the repository root is six levels up.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../../../../..");
const SUBPATHS = ["color", "value", "css", "easing", "math", "transform", "quantize"];

// ── denominators ────────────────────────────────────────────────────────────
const runtimeNames = {};
for (const entry of SUBPATHS) {
    const module = await import(join(root, `dist/subpaths/${entry}.js`));
    runtimeNames[entry] = Object.keys(module).sort();
}
const declaredLines = [];
const declaredNames = new Set();
for (const entry of SUBPATHS) {
    const text = readFileSync(join(root, `dist/subpaths/${entry}.d.ts`), "utf8");
    for (const line of text.split("\n")) {
        if (!line.startsWith("export declare ")) continue;
        declaredLines.push(line);
        const name = line.replace(/^export declare (type |const |function |class |abstract class )?/, "").match(/^[A-Za-z0-9_$]+/);
        if (name) declaredNames.add(`${entry}.${name[0]}`);
    }
}

// ── the suite's reachable source graph ──────────────────────────────────────
const walk = (directory, out = []) => {
    for (const name of readdirSync(directory)) {
        const path = join(directory, name);
        if (statSync(path).isDirectory()) {
            if (name === "node_modules" || name === "dist") continue;
            walk(path, out);
        } else out.push(path);
    }
    return out;
};
const seeds = [
    ...walk(join(root, "test")).filter((p) => p.endsWith(".test.ts")),
    ...walk(join(root, "demo/test")).filter((p) => p.endsWith(".test.ts")),
];

/** Resolves a first-party specifier to an absolute file, or null if external. */
const resolveSpecifier = (specifier, fromFile) => {
    let base;
    if (specifier.startsWith(".")) base = resolve(dirname(fromFile), specifier);
    else if (specifier.startsWith("@src/")) base = join(root, "src", specifier.slice(5));
    else if (specifier.startsWith("@mkbabb/value.js/")) base = join(root, "src/subpaths", specifier.slice(17));
    else return null;
    for (const candidate of [base, `${base}.ts`, `${base}.vue`, join(base, "index.ts")]) {
        try {
            if (statSync(candidate).isFile()) return candidate;
        } catch { /* keep looking */ }
    }
    return null;
};

/** A `.vue` SFC's `<script>` body, or the file itself for `.ts`. */
const sourceOf = (path) => {
    const text = readFileSync(path, "utf8");
    if (!path.endsWith(".vue")) return text;
    return [...text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
};

const isLibrary = (path) => path.startsWith(join(root, "src") + "/");

/**
 * `test/v4-c1.test.ts` is the exact-runtime-surface SNAPSHOT: it names every
 * published export by construction, so on its own it covers the denominator
 * trivially. Reporting a single number that leans on it would over-claim, so
 * the run is done twice — with it and without it — and both are printed.
 */
const SNAPSHOT_SEED = join(root, "test/v4-c1.test.ts");

function measure(seedFiles) {
const covered = new Set();
const seen = new Set();
const queue = [...seedFiles];
let modulesVisited = 0;

while (queue.length > 0) {
    const path = queue.pop();
    if (seen.has(path)) continue;
    seen.add(path);
    if (isLibrary(path)) continue; // src→src use is not consumer coverage
    modulesVisited++;

    const source = ts.createSourceFile(path, sourceOf(path), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    /** localName -> exported name, for bindings that come from src/ */
    const fromLibrary = new Map();
    /** namespace localName, for `import * as ns from "src/..."` */
    const namespaces = new Set();

    for (const statement of source.statements) {
        const specifierNode = ts.isImportDeclaration(statement) || (ts.isExportDeclaration(statement) && statement.moduleSpecifier)
            ? statement.moduleSpecifier
            : undefined;
        if (!specifierNode || !ts.isStringLiteral(specifierNode)) continue;
        const target = resolveSpecifier(specifierNode.text, path);
        if (!target) continue;
        if (!seen.has(target)) queue.push(target);
        if (!isLibrary(target)) continue;
        const clause = ts.isImportDeclaration(statement) ? statement.importClause : undefined;
        if (!clause) continue;
        if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
            namespaces.add(clause.namedBindings.name.text);
        } else if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
            for (const element of clause.namedBindings.elements) {
                fromLibrary.set(element.name.text, (element.propertyName ?? element.name).text);
            }
        }
    }
    if (fromLibrary.size === 0 && namespaces.size === 0) continue;

    const visit = (node) => {
        if (ts.isImportDeclaration(node)) return; // the import statement is not a use
        // `ns.name`
        if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && namespaces.has(node.expression.text)) {
            covered.add(node.name.text);
        }
        // `ns["name"]`
        if (ts.isElementAccessExpression(node) && ts.isIdentifier(node.expression)
            && namespaces.has(node.expression.text) && ts.isStringLiteral(node.argumentExpression)) {
            covered.add(node.argumentExpression.text);
        }
        // `const { name } = ns` — the shape `test/v4-c1.test.ts:12` uses.
        if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.initializer)
            && namespaces.has(node.initializer.text) && ts.isObjectBindingPattern(node.name)) {
            for (const element of node.name.elements) {
                const source = element.propertyName ?? element.name;
                if (ts.isIdentifier(source)) covered.add(source.text);
            }
        }
        if (ts.isIdentifier(node) && fromLibrary.has(node.text)) covered.add(fromLibrary.get(node.text));
        ts.forEachChild(node, visit);
    };
    ts.forEachChild(source, visit);
}

const rows = SUBPATHS.map((entry) => {
    const names = runtimeNames[entry];
    return {
        entry,
        total: names.length,
        covered: names.filter((name) => covered.has(name)).length,
        uncovered: names.filter((name) => !covered.has(name)),
    };
});
return {
    rows,
    modulesVisited,
    total: rows.reduce((sum, row) => sum + row.total, 0),
    hits: rows.reduce((sum, row) => sum + row.covered, 0),
};
}

// ── report ──────────────────────────────────────────────────────────────────
const report = (label, result) => {
    process.stdout.write(`${label}\n`);
    process.stdout.write(`  first-party modules visited outside src/: ${result.modulesVisited}\n`);
    for (const row of result.rows) {
        process.stdout.write(`  ${row.entry.padEnd(10)} ${String(row.covered).padStart(2)} / ${String(row.total).padStart(2)}`);
        process.stdout.write(row.uncovered.length > 0 ? `   uncovered: ${row.uncovered.join(", ")}\n` : "\n");
    }
    const percent = ((result.hits / result.total) * 100).toFixed(1);
    process.stdout.write(`  ${"TOTAL".padEnd(10)} ${result.hits} / ${result.total}   = ${percent}%\n\n`);
};

process.stdout.write(`repository: ${relative(process.cwd(), root) || "."}\n`);
process.stdout.write(`seed files (vitest include): ${seeds.length}\n\n`);
process.stdout.write("DENOMINATOR · declared export names in dist/subpaths/*.d.ts\n");
process.stdout.write(`  lines: ${declaredLines.length}   distinct: ${declaredNames.size}\n\n`);
process.stdout.write("DENOMINATOR · runtime exports across the seven subpaths\n");
process.stdout.write(`  ${SUBPATHS.map((entry) => `${entry} ${runtimeNames[entry].length}`).join(" · ")}`);
process.stdout.write(` = ${SUBPATHS.reduce((sum, entry) => sum + runtimeNames[entry].length, 0)}\n\n`);
report("COVERAGE-BY-EXPORT · whole suite", measure(seeds));
report("COVERAGE-BY-EXPORT · whole suite MINUS test/v4-c1.test.ts (the surface snapshot)",
    measure(seeds.filter((seed) => seed !== SNAPSHOT_SEED)));
