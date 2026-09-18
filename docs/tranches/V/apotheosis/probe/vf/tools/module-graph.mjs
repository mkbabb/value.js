#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { compareCanonicalText } from "./json-contract.mjs";

const require = createRequire(import.meta.url);
const ts = require("../../../../../node_modules/typescript");
const VERSION = "vnext-module-graph/3";
const TOOL_SHA256 = createHash("sha256").update(readFileSync(fileURLToPath(import.meta.url))).digest("hex");
const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".vue"];
const IGNORED = new Set([".git", "node_modules", "dist", "coverage", ".nuxt", ".output"]);

function fail(message) {
    process.stderr.write(`${message}\n`);
    process.exit(2);
}

function parseArgs(argv) {
    const args = new Map();
    for (let index = 0; index < argv.length; index += 2) {
        const key = argv[index];
        const value = argv[index + 1];
        if (!key?.startsWith("--") || value === undefined) fail("arguments are --key value pairs");
        args.set(key.slice(2), value);
    }
    if (!args.has("repo") || !args.has("include") || !args.has("label") || !args.has("ref")) {
        fail("usage: module-graph.mjs --repo <root> --include <a,b> --label <name> --ref <exact-current-commit>");
    }
    return {
        repo: resolve(args.get("repo")),
        include: args.get("include").split(",").filter(Boolean),
        label: args.get("label"),
        ref: args.get("ref"),
    };
}

function posix(path) {
    return path.split(sep).join("/");
}

function walk(path, files) {
    if (!existsSync(path)) return;
    const entry = statSync(path);
    if (entry.isFile()) {
        if (EXTENSIONS.includes(extname(path))) files.add(resolve(path));
        return;
    }
    for (const name of readdirSync(path).sort(compareCanonicalText)) {
        if (IGNORED.has(name) || name.startsWith(".tmp")) continue;
        walk(join(path, name), files);
    }
}

function scriptBodies(file, source) {
    if (!file.endsWith(".vue")) return [source];
    return [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
}

function importKind(node) {
    if (ts.isImportDeclaration(node)) return node.importClause?.isTypeOnly ? "type" : "value";
    if (ts.isExportDeclaration(node)) return node.isTypeOnly ? "type" : "value";
    if (ts.isImportEqualsDeclaration(node)) return node.isTypeOnly ? "type" : "require";
    return "dynamic";
}

function collectSpecifiers(file, source) {
    const found = [];
    for (const [index, body] of scriptBodies(file, source).entries()) {
        const unit = ts.createSourceFile(`${file}.${index}.ts`, body, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
        const visit = (node) => {
            if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) {
                found.push({ kind: importKind(node), specifier: node.moduleSpecifier.text });
            } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
                const expression = node.moduleReference.expression;
                if (ts.isStringLiteral(expression)) found.push({ kind: importKind(node), specifier: expression.text });
            } else if (ts.isCallExpression(node) && node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0])) {
                if (node.expression.kind === ts.SyntaxKind.ImportKeyword) {
                    found.push({ kind: "dynamic", specifier: node.arguments[0].text });
                } else if (ts.isIdentifier(node.expression) && node.expression.text === "require") {
                    found.push({ kind: "require", specifier: node.arguments[0].text });
                }
            }
            ts.forEachChild(node, visit);
        };
        visit(unit);
    }
    return found;
}

function resolveRelative(from, specifier) {
    const pathSpecifier = specifier.split(/[?#]/, 1)[0];
    const base = resolve(dirname(from), pathSpecifier);
    const candidates = [base];
    const suffix = extname(base);
    if ([".js", ".jsx", ".mjs", ".cjs"].includes(suffix)) {
        const stem = base.slice(0, -suffix.length);
        candidates.push(`${stem}.ts`, `${stem}.tsx`, `${stem}.mts`, `${stem}.cts`);
    }
    for (const extension of EXTENSIONS) candidates.push(`${base}${extension}`);
    for (const extension of EXTENSIONS) candidates.push(join(base, `index${extension}`));
    return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
}

function packageName(specifier) {
    if (specifier.startsWith("node:") || specifier.startsWith("#")) return specifier;
    const parts = specifier.split("/");
    return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

function stronglyConnected(nodes, edges, includeType) {
    const adjacent = new Map(nodes.map((node) => [node, []]));
    for (const edge of edges) {
        if (!includeType && edge.kind === "type") continue;
        adjacent.get(edge.from)?.push(edge.to);
    }
    for (const list of adjacent.values()) list.sort(compareCanonicalText);
    let nextIndex = 0;
    const indices = new Map();
    const low = new Map();
    const stack = [];
    const onStack = new Set();
    const components = [];
    function visit(node) {
        indices.set(node, nextIndex);
        low.set(node, nextIndex);
        nextIndex += 1;
        stack.push(node);
        onStack.add(node);
        for (const target of adjacent.get(node)) {
            if (!indices.has(target)) {
                visit(target);
                low.set(node, Math.min(low.get(node), low.get(target)));
            } else if (onStack.has(target)) {
                low.set(node, Math.min(low.get(node), indices.get(target)));
            }
        }
        if (low.get(node) !== indices.get(node)) return;
        const component = [];
        let member;
        do {
            member = stack.pop();
            onStack.delete(member);
            component.push(member);
        } while (member !== node);
        component.sort(compareCanonicalText);
        if (component.length > 1 || adjacent.get(node).includes(node)) components.push(component);
    }
    for (const node of nodes) if (!indices.has(node)) visit(node);
    return components.sort((left, right) => compareCanonicalText(left[0], right[0]));
}

const options = parseArgs(process.argv.slice(2));
let currentHead;
let resolvedRef;
try {
    currentHead = execFileSync("git", ["-C", options.repo, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    resolvedRef = execFileSync("git", ["-C", options.repo, "rev-parse", "--verify", `${options.ref}^{commit}`], { encoding: "utf8" }).trim();
} catch (error) {
    fail(`cannot resolve git repository/ref: ${error.message}`);
}
if (resolvedRef !== currentHead) {
    fail(`--ref must resolve to the checked-out HEAD; requested ${resolvedRef}, current ${currentHead}`);
}
const absoluteFiles = new Set();
for (const include of options.include) walk(resolve(options.repo, include), absoluteFiles);
const nodes = [...absoluteFiles].map((file) => posix(relative(options.repo, file))).sort(compareCanonicalText);
const inputSha256 = createHash("sha256");
for (const node of nodes) {
    inputSha256.update(`${node}\0`, "utf8");
    inputSha256.update(readFileSync(resolve(options.repo, node)));
    inputSha256.update("\0", "utf8");
}
const nodeSet = new Set(nodes);
const edges = [];
const externalRelative = [];
const packages = [];
const unresolved = [];

for (const from of [...absoluteFiles].sort(compareCanonicalText)) {
    const fromName = posix(relative(options.repo, from));
    const source = readFileSync(from, "utf8");
    for (const item of collectSpecifiers(from, source)) {
        if (!item.specifier.startsWith(".")) {
            packages.push({ from: fromName, kind: item.kind, package: packageName(item.specifier), specifier: item.specifier });
            continue;
        }
        const target = resolveRelative(from, item.specifier);
        if (!target) {
            unresolved.push({ from: fromName, kind: item.kind, specifier: item.specifier });
            continue;
        }
        const to = posix(relative(options.repo, target));
        const edge = { from: fromName, kind: item.kind, specifier: item.specifier, to };
        if (nodeSet.has(to)) edges.push(edge);
        else externalRelative.push(edge);
    }
}

function compareFields(left, right, fields) {
    for (const field of fields) {
        const order = compareCanonicalText(left[field], right[field]);
        if (order !== 0) return order;
    }
    return 0;
}

const compareImportRecord = (left, right) => compareFields(left, right, ["from", "kind", "specifier", "to"]);
const comparePackageRecord = (left, right) => compareFields(left, right, ["from", "kind", "package", "specifier"]);
const compareUnresolvedRecord = (left, right) => compareFields(left, right, ["from", "kind", "specifier"]);

function uniqueSorted(items, comparator) {
    const map = new Map(items.map((item) => [JSON.stringify(item), item]));
    return [...map.values()].sort(comparator);
}

const canonicalEdges = uniqueSorted(edges, compareImportRecord);
const fileEdgeMap = new Map();
for (const edge of canonicalEdges) {
    const key = `${edge.from}\0${edge.to}`;
    const value = fileEdgeMap.get(key) ?? { from: edge.from, to: edge.to, kinds: new Set(), specifiers: new Set() };
    value.kinds.add(edge.kind);
    value.specifiers.add(edge.specifier);
    fileEdgeMap.set(key, value);
}
const fileEdges = [...fileEdgeMap.values()]
    .map((edge) => ({
        ...edge,
        kinds: [...edge.kinds].sort(compareCanonicalText),
        specifiers: [...edge.specifiers].sort(compareCanonicalText),
    }))
    .sort((left, right) => compareFields(left, right, ["from", "to"]));
const runtimeFileEdges = fileEdges.map((edge) => ({
    from: edge.from,
    to: edge.to,
    kind: edge.kinds.every((kind) => kind === "type") ? "type" : "value",
}));
const body = {
    schema: VERSION,
    toolSha256: TOOL_SHA256,
    label: options.label,
    repository: options.repo,
    ref: resolvedRef,
    checkedOutHead: currentHead,
    workingInputSha256: inputSha256.digest("hex"),
    include: options.include,
    command: process.argv.map((part) => (part.includes(" ") ? JSON.stringify(part) : part)).join(" "),
    counts: {
        nodes: nodes.length,
        importExportRecords: canonicalEdges.length,
        uniqueFileEdges: fileEdges.length,
        externalRelativeEdges: uniqueSorted(externalRelative, compareImportRecord).length,
        packageEdges: uniqueSorted(packages, comparePackageRecord).length,
        unresolvedRelativeEdges: uniqueSorted(unresolved, compareUnresolvedRecord).length,
    },
    stronglyConnected: {
        runtime: stronglyConnected(nodes, runtimeFileEdges, false),
        runtimeAndType: stronglyConnected(nodes, runtimeFileEdges, true),
    },
    nodes,
    edges: canonicalEdges,
    fileEdges,
    externalRelative: uniqueSorted(externalRelative, compareImportRecord),
    packages: uniqueSorted(packages, comparePackageRecord),
    unresolved: uniqueSorted(unresolved, compareUnresolvedRecord),
};
const canonical = `${JSON.stringify(body)}\n`;
const output = { ...body, artifactSha256: createHash("sha256").update(canonical).digest("hex") };
process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
