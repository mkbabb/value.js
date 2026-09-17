import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, extname, isAbsolute, posix, relative, resolve, sep } from "node:path";

import { compareCanonicalText, canonicalize, parseJsonStrict } from "./json-contract.mjs";

const ts = createRequire(import.meta.url)("typescript");
const moduleExtensions = [".cjs", ".cts", ".js", ".jsx", ".json", ".mjs", ".mts", ".ts", ".tsx", ".vue"];
export const ordered = (values) => [...values].sort(compareCanonicalText);
export const same = (left, right) => canonicalize(left) === canonicalize(right);
export const digest = (algorithm, bytes, encoding = "hex") => createHash(algorithm).update(bytes).digest(encoding);
export const sha256 = (bytes) => digest("sha256", bytes);
export const sha512 = (bytes) => digest("sha512", bytes);
export const fileSha256 = (path) => sha256(readFileSync(path));

export function hashWithout(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    return sha256(canonicalize(preimage));
}

function uniquePaths(values) {
    return [...new Set(values)].sort(compareCanonicalText);
}

export function keyframesDeliveryProjection(files, rows) {
    return {
        source: files.filter(({ kind }) => kind === "source").map(({ path }) => path).sort(compareCanonicalText),
        tests: files.filter(({ kind }) => kind === "test").map(({ path }) => path).sort(compareCanonicalText),
        support: files.filter(({ kind }) => kind === "support").map(({ path }) => path).sort(compareCanonicalText),
        removed_paths: uniquePaths(rows
            .filter(({ disposition }) => ["move", "fold", "delete"].includes(disposition))
            .map(({ current_id }) => current_id)),
        replaced_paths: uniquePaths(rows
            .filter(({ disposition, current_sha256, target_sha256 }) => disposition === "keep" && current_sha256 !== target_sha256)
            .map(({ current_id }) => current_id)),
    };
}

export function keyframesPhysicalPathProjection(effects, physicalOwnerWaveId = undefined) {
    const selected = physicalOwnerWaveId === undefined
        ? effects
        : effects.filter(({ physical_owner_wave_id }) => physical_owner_wave_id === physicalOwnerWaveId);
    return {
        deleted_paths: uniquePaths(selected
            .filter(({ effect }) => ["remove", "remove-and-materialize"].includes(effect))
            .map(({ current_path }) => current_path)),
        added_paths: uniquePaths(selected
            .filter(({ effect }) => ["materialize", "remove-and-materialize"].includes(effect))
            .map(({ target_path }) => target_path)),
        modified_paths: uniquePaths(selected
            .filter(({ effect }) => effect === "replace-in-place")
            .map(({ current_path }) => current_path)),
    };
}

export function normalizedRelative(root, path) {
    return relative(root, path).split(sep).join("/");
}

export function inside(root, path) {
    const result = relative(root, path);
    return result === "" || (!result.startsWith(`..${sep}`) && result !== ".." && !isAbsolute(result));
}

export function requireCanonicalDirectory(path, label = path) {
    if (!existsSync(path)) throw new Error(`${label}: missing directory ${path}`);
    const metadata = lstatSync(path);
    if (!metadata.isDirectory() || metadata.isSymbolicLink() || realpathSync(path) !== path) {
        throw new Error(`${label}: canonical real non-symlink directory required ${path}`);
    }
    return path;
}

export function requireCanonicalFile(path, label = path) {
    if (!existsSync(path)) throw new Error(`${label}: missing file ${path}`);
    const metadata = lstatSync(path);
    if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(path) !== path) {
        throw new Error(`${label}: canonical regular non-symlink file required ${path}`);
    }
    return path;
}

export function readStrictJson(path, label = path) {
    requireCanonicalFile(path, label);
    return parseJsonStrict(readFileSync(path));
}

export function gitIdentity(repositoryRoot) {
    requireCanonicalDirectory(repositoryRoot, "repository");
    const git = (...args) => execFileSync("git", ["-C", repositoryRoot, ...args], { encoding: "utf8" }).trim();
    return {
        branch: git("rev-parse", "--abbrev-ref", "HEAD"),
        head: git("rev-parse", "HEAD"),
        dirty_sha256: sha256(execFileSync("git", ["-C", repositoryRoot, "status", "--porcelain=v1", "-z", "--untracked-files=all"])),
    };
}

export function requireGitTopLevel(repositoryRoot) {
    requireCanonicalDirectory(repositoryRoot, "repository");
    const topLevel = execFileSync("git", ["-C", repositoryRoot, "rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
    if (realpathSync(topLevel) !== repositoryRoot) {
        throw new Error(`repository path must equal git rev-parse --show-toplevel (${topLevel})`);
    }
    return repositoryRoot;
}

export function walkRegularFiles(repositoryRoot, relativeRoot) {
    const root = resolve(repositoryRoot, relativeRoot);
    requireCanonicalDirectory(root, relativeRoot);
    if (!inside(repositoryRoot, root)) throw new Error(`${relativeRoot}: root escapes repository`);
    const result = [];
    const walk = (directory) => {
        const entries = readdirSync(directory, { withFileTypes: true }).sort((left, right) => compareCanonicalText(left.name, right.name));
        for (const entry of entries) {
            const path = resolve(directory, entry.name);
            const relativePath = normalizedRelative(repositoryRoot, path);
            if (entry.isSymbolicLink()) throw new Error(`${relativePath}: symlink is forbidden in an authority root`);
            if (entry.isDirectory()) walk(path);
            else if (entry.isFile()) {
                const bytes = readFileSync(path);
                result.push({ path: relativePath, bytes: bytes.length, sha256: sha256(bytes) });
            } else throw new Error(`${relativePath}: non-regular filesystem entry is forbidden`);
        }
    };
    walk(root);
    return result.sort((left, right) => compareCanonicalText(left.path, right.path));
}

export function isColocatedTest(path) {
    return /(?:^|\/)(?:__tests__|tests?)(?:\/|$)/i.test(path) || /\.(?:spec|test)\.[^/]+$/i.test(path);
}

function sourceText(path, bytes) {
    const text = bytes.toString("utf8");
    if (extname(path).toLowerCase() === ".vue") {
        return [...text.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((match) => match[1]).join("\n");
    }
    return text;
}

function importFacts(path, bytes) {
    const extension = extname(path).toLowerCase();
    const text = sourceText(path, bytes);
    const facts = [];
    if (extension === ".css") {
        for (const match of text.matchAll(/@import\s+(?:url\()?\s*["']([^"']+)["']/gi)) {
            facts.push({ specifier: match[1], runtime: true });
        }
        return facts;
    }
    if (extension === ".html") {
        for (const match of text.matchAll(/<script[^>]+src=["']([^"']+)["'][^>]*>/gi)) {
            facts.push({ specifier: match[1], runtime: true });
        }
        return facts;
    }
    if (![...moduleExtensions, ".d.ts", ".d.cts", ".d.mts"].some((suffix) => path.endsWith(suffix))) return facts;
    const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    if (source.parseDiagnostics.length) {
        const diagnostic = source.parseDiagnostics[0];
        throw new Error(`${path}: syntax diagnostic ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`);
    }
    const add = (specifier, runtime) => {
        if (typeof specifier === "string" && specifier.length) facts.push({ specifier, runtime });
    };
    const walk = (node) => {
        if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
            const clause = node.importClause;
            let runtime = !clause || !clause.isTypeOnly;
            if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings) && !clause.name) {
                runtime = clause.namedBindings.elements.some((element) => !element.isTypeOnly);
            }
            add(node.moduleSpecifier.text, runtime);
        } else if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
            let runtime = !node.isTypeOnly;
            if (node.exportClause && ts.isNamedExports(node.exportClause)) {
                runtime = node.exportClause.elements.some((element) => !element.isTypeOnly) && !node.isTypeOnly;
            }
            add(node.moduleSpecifier.text, runtime);
        } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)
            && node.moduleReference.expression && ts.isStringLiteral(node.moduleReference.expression)) {
            add(node.moduleReference.expression.text, !node.isTypeOnly);
        } else if (ts.isCallExpression(node) && node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0])) {
            if (node.expression.kind === ts.SyntaxKind.ImportKeyword
                || (ts.isIdentifier(node.expression) && node.expression.text === "require")) {
                add(node.arguments[0].text, true);
            }
        }
        ts.forEachChild(node, walk);
    };
    walk(source);
    return facts;
}

function resolvedInternal(repositoryRoot, from, specifier, known) {
    if (!specifier.startsWith(".")) return undefined;
    const base = resolve(repositoryRoot, dirname(from), specifier);
    if (!inside(repositoryRoot, base)) throw new Error(`${from}: relative import escapes repository ${specifier}`);
    const candidates = [base];
    if (!extname(base)) {
        for (const extension of moduleExtensions) candidates.push(`${base}${extension}`);
        for (const extension of moduleExtensions) candidates.push(resolve(base, `index${extension}`));
    }
    for (const candidate of candidates) {
        const relativePath = normalizedRelative(repositoryRoot, candidate);
        if (known.has(relativePath)) return relativePath;
    }
    throw new Error(`${from}: unresolved relative import ${specifier}`);
}

function stronglyConnected(nodes, edges) {
    const adjacency = new Map(nodes.map((node) => [node, []]));
    for (const { from, to } of edges) adjacency.get(from)?.push(to);
    for (const values of adjacency.values()) values.sort(compareCanonicalText);
    let sequence = 0;
    const indices = new Map();
    const low = new Map();
    const stack = [];
    const onStack = new Set();
    const result = [];
    const visit = (node) => {
        indices.set(node, sequence);
        low.set(node, sequence++);
        stack.push(node);
        onStack.add(node);
        for (const child of adjacency.get(node) ?? []) {
            if (!indices.has(child)) {
                visit(child);
                low.set(node, Math.min(low.get(node), low.get(child)));
            } else if (onStack.has(child)) low.set(node, Math.min(low.get(node), indices.get(child)));
        }
        if (low.get(node) !== indices.get(node)) return;
        const component = [];
        while (stack.length) {
            const child = stack.pop();
            onStack.delete(child);
            component.push(child);
            if (child === node) break;
        }
        component.sort(compareCanonicalText);
        const selfLoop = component.length === 1 && edges.some(({ from, to }) => from === node && to === node);
        if (component.length > 1 || selfLoop) result.push(component);
    };
    for (const node of nodes) if (!indices.has(node)) visit(node);
    return result.sort((left, right) => compareCanonicalText(left.join("\0"), right.join("\0")));
}

function finalizedGraph(nodes, edges, externalImports) {
    const graph = {
        nodes: ordered(nodes),
        edges: [...edges].sort((left, right) => compareCanonicalText(`${left.from}\0${left.to}\0${left.specifier}`, `${right.from}\0${right.to}\0${right.specifier}`)),
        external_imports: [...externalImports].sort((left, right) => compareCanonicalText(`${left.from}\0${left.specifier}`, `${right.from}\0${right.specifier}`)),
        sccs: stronglyConnected(ordered(nodes), edges),
        graph_hash: "",
    };
    graph.graph_hash = hashWithout(graph, "graph_hash");
    return graph;
}

export function computeModuleGraphs(repositoryRoot, paths) {
    const nodes = ordered([...new Set(paths)]);
    const known = new Set(nodes);
    const runtimeEdges = new Map();
    const typeEdges = new Map();
    const runtimeExternal = new Map();
    const typeExternal = new Map();
    const add = (collection, value, key) => collection.set(key, value);
    for (const from of nodes) {
        const absolute = resolve(repositoryRoot, from);
        requireCanonicalFile(absolute, from);
        for (const fact of importFacts(from, readFileSync(absolute))) {
            const to = resolvedInternal(repositoryRoot, from, fact.specifier, known);
            if (to) {
                const edge = { from, to, specifier: fact.specifier };
                add(typeEdges, edge, `${from}\0${to}\0${fact.specifier}`);
                if (fact.runtime) add(runtimeEdges, edge, `${from}\0${to}\0${fact.specifier}`);
            } else {
                const row = { from, specifier: fact.specifier };
                add(typeExternal, row, `${from}\0${fact.specifier}`);
                if (fact.runtime) add(runtimeExternal, row, `${from}\0${fact.specifier}`);
            }
        }
    }
    return {
        runtime: finalizedGraph(nodes, [...runtimeEdges.values()], [...runtimeExternal.values()]),
        type: finalizedGraph(nodes, [...typeEdges.values()], [...typeExternal.values()]),
    };
}

function resolvedVirtual(from, specifier, known) {
    if (!specifier.startsWith(".")) return undefined;
    const base = posix.normalize(posix.join(posix.dirname(from), specifier));
    if (base === ".." || base.startsWith("../") || base.startsWith("/")) {
        throw new Error(`${from}: relative import escapes archive ${specifier}`);
    }
    const candidates = [base];
    const extension = posix.extname(base);
    if (!extension) {
        for (const suffix of moduleExtensions) candidates.push(`${base}${suffix}`);
        for (const suffix of moduleExtensions) candidates.push(posix.join(base, `index${suffix}`));
    } else if ([".js", ".mjs", ".cjs"].includes(extension)) {
        const stem = base.slice(0, -extension.length);
        candidates.push(`${stem}.d.ts`, `${stem}.d.mts`, `${stem}.d.cts`);
    }
    return candidates.find((candidate) => known.has(candidate));
}

export function computeVirtualModuleGraphs(contents, paths) {
    const nodes = ordered([...new Set(paths)]);
    const known = new Set(nodes);
    const runtimeEdges = new Map();
    const typeEdges = new Map();
    const runtimeExternal = new Map();
    const typeExternal = new Map();
    for (const from of nodes) {
        const bytes = contents.get(from);
        if (!bytes) throw new Error(`${from}: archive graph node is missing`);
        for (const fact of importFacts(from, bytes)) {
            const to = resolvedVirtual(from, fact.specifier, known);
            if (to) {
                const edge = { from, to, specifier: fact.specifier };
                typeEdges.set(`${from}\0${to}\0${fact.specifier}`, edge);
                if (fact.runtime) runtimeEdges.set(`${from}\0${to}\0${fact.specifier}`, edge);
            } else {
                const row = { from, specifier: fact.specifier };
                typeExternal.set(`${from}\0${fact.specifier}`, row);
                if (fact.runtime) runtimeExternal.set(`${from}\0${fact.specifier}`, row);
            }
        }
    }
    return {
        runtime: finalizedGraph(nodes, [...runtimeEdges.values()], [...runtimeExternal.values()]),
        type: finalizedGraph(nodes, [...typeEdges.values()], [...typeExternal.values()]),
    };
}

function packageTargets(value, specifier) {
    if (typeof value === "string") return { runtime: value };
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error(`package exports ${specifier}: string or condition object required`);
    }
    const types = typeof value.types === "string" ? value.types : undefined;
    const runtime = [value.import, value.default, value.require].find((candidate) => typeof candidate === "string");
    if (!types && !runtime) throw new Error(`package exports ${specifier}: types or runtime target required`);
    return { types, runtime };
}

function boundedPackageTarget(repositoryRoot, target, label) {
    if (!target) return undefined;
    if (!target.startsWith("./") || target.includes("\\") || target.split("/").includes("..")) {
        throw new Error(`${label}: bounded ./ package target required`);
    }
    const path = resolve(repositoryRoot, target);
    if (!inside(repositoryRoot, path)) throw new Error(`${label}: package target escapes repository`);
    requireCanonicalFile(path, label);
    return path;
}

function exportedNames(paths) {
    if (!paths.length) return new Map();
    const program = ts.createProgram({
        rootNames: paths,
        options: {
            allowJs: true,
            checkJs: false,
            module: ts.ModuleKind.NodeNext,
            moduleResolution: ts.ModuleResolutionKind.NodeNext,
            noEmit: true,
            skipLibCheck: true,
            target: ts.ScriptTarget.ESNext,
        },
    });
    const diagnostics = program.getSyntacticDiagnostics();
    if (diagnostics.length) {
        const diagnostic = diagnostics[0];
        throw new Error(`package export syntax: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`);
    }
    const checker = program.getTypeChecker();
    const result = new Map();
    for (const path of paths) {
        const source = program.getSourceFile(path);
        const module = source && checker.getSymbolAtLocation(source);
        if (!module) throw new Error(`cannot resolve package exports for ${path}`);
        result.set(path, checker.getExportsOfModule(module).map(({ name }) => name).sort(compareCanonicalText));
    }
    return result;
}

export function currentPackageExportNodes(repositoryRoot, packageManifest) {
    if (!packageManifest || packageManifest.name !== "@mkbabb/keyframes.js") {
        throw new Error("package.json: @mkbabb/keyframes.js required");
    }
    const exportsObject = packageManifest.exports;
    if (!exportsObject || typeof exportsObject !== "object" || Array.isArray(exportsObject)) {
        throw new Error("package.json exports: object required");
    }
    const entries = Object.keys(exportsObject).sort(compareCanonicalText).map((specifier) => {
        const targets = packageTargets(exportsObject[specifier], specifier);
        return {
            specifier,
            types: boundedPackageTarget(repositoryRoot, targets.types, `exports ${specifier} types`),
            runtime: boundedPackageTarget(repositoryRoot, targets.runtime, `exports ${specifier} runtime`),
        };
    });
    const names = exportedNames([...new Set(entries.flatMap(({ types, runtime }) => [types, runtime]).filter(Boolean))]);
    const nodes = [];
    for (const { specifier, types, runtime } of entries) {
        const runtimeNames = new Set(names.get(runtime) ?? []);
        const typeNames = new Set(names.get(types) ?? []);
        for (const symbol of [...runtimeNames].sort(compareCanonicalText)) {
            nodes.push({
                kind: "export",
                id: `${specifier}#${symbol}:runtime`,
                path: normalizedRelative(repositoryRoot, runtime),
                sha256: fileSha256(runtime),
                specifier,
                symbol,
                surface: "runtime",
            });
        }
        for (const symbol of [...typeNames].filter((name) => !runtimeNames.has(name)).sort(compareCanonicalText)) {
            nodes.push({
                kind: "export",
                id: `${specifier}#${symbol}:type`,
                path: normalizedRelative(repositoryRoot, types),
                sha256: fileSha256(types),
                specifier,
                symbol,
                surface: "type",
            });
        }
    }
    return nodes.sort((left, right) => compareCanonicalText(`${left.kind}\0${left.id}`, `${right.kind}\0${right.id}`));
}

export function deriveTargetTests(target, scope) {
    const section = target?.[scope];
    if (!section || !Array.isArray(section.files)) throw new Error(`target ${scope}: files required`);
    const law = section.test;
    if (law?.source_extension !== "replace-last" || law?.test_extension !== ".test.ts" || law?.case !== "preserve") {
        throw new Error(`target ${scope}: exact replace-last external-test law required`);
    }
    const result = section.files.map((source) => {
        const relativePath = source.slice(section.root.length + 1).replace(/\.[^.]+$/, law.test_extension);
        return `${law.root}/${relativePath}`;
    });
    if (new Set(result).size !== result.length) throw new Error(`target ${scope}: derived external tests collide`);
    if (law.file_count !== result.length || law.files_sha256 !== sha256(canonicalize(result))) {
        throw new Error(`target ${scope}: external test vector does not bind its count/hash`);
    }
    return result;
}

function safeArchivePath(path, prefix) {
    return typeof path === "string" && path.startsWith(`${prefix}/`) && !path.includes("\\")
        && !path.includes("//") && !path.split("/").includes("..") && !path.startsWith("/");
}

function inspectGzipArchive(path, prefix, label) {
    requireCanonicalFile(path, "tarball");
    const bytes = readFileSync(path);
    if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) throw new Error(`${label}: gzip archive required`);
    const listing = execFileSync("/usr/bin/tar", ["-tzf", path], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 })
        .trim().split("\n").filter(Boolean);
    if (new Set(listing).size !== listing.length) throw new Error(`${label}: duplicate archive path`);
    for (const item of listing) if (!safeArchivePath(item, prefix)) throw new Error(`${label}: unsafe path ${JSON.stringify(item)}`);
    const verbose = execFileSync("/usr/bin/tar", ["-tvzf", path], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 })
        .trim().split("\n").filter(Boolean);
    if (verbose.length !== listing.length || verbose.some((line) => !/^[-d]/.test(line))) {
        throw new Error(`${label}: only regular files and directories are permitted`);
    }
    const contents = new Map();
    const files = [];
    for (const archivePath of listing.filter((item) => !item.endsWith("/"))) {
        const member = archivePath.slice(`${prefix}/`.length);
        const content = execFileSync("/usr/bin/tar", ["-xOzf", path, archivePath], { encoding: null, maxBuffer: 64 * 1024 * 1024 });
        if (!member || contents.has(member)) throw new Error(`${label}: duplicate or empty member ${JSON.stringify(member)}`);
        contents.set(member, content);
        files.push({ path: member, bytes: content.length, sha256: sha256(content) });
    }
    files.sort((left, right) => compareCanonicalText(left.path, right.path));
    return {
        bytes,
        files,
        contents,
        sha256: sha256(bytes),
        sha512: sha512(bytes),
        integrity: `sha512-${digest("sha512", bytes, "base64")}`,
    };
}

export const inspectTarball = (path) => inspectGzipArchive(path, "package", "tarball");
export const inspectSnapshot = (path) => inspectGzipArchive(path, "snapshot", "snapshot");

export function parseArchiveJson(contents, path) {
    const bytes = contents.get(path);
    if (!bytes) throw new Error(`archive: missing ${path}`);
    return parseJsonStrict(bytes);
}
