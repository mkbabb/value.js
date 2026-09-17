#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { basename, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, parseJsonStrict } from "./json-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let valueRoot = resolve(root, "../../../..");
const canonicalValueManifestPath = resolve(root, "VALUE-TARGET-PATHS.json");
let valueManifestPath = canonicalValueManifestPath;
let keyframesManifestPath = resolve(root, "KEYFRAMES-TARGET-PATHS.json");
const cssValidator = resolve(root, "tools/validate-css-module-isomorphism.mjs");
const resolutionsValidator = resolve(root, "tools/validate-value-target-resolutions.mjs");
const failures = [];
const fail = (message) => failures.push(message);
const hash = (value) => createHash("sha256").update(value).digest("hex");
let mode = "formation";
let cssManifestArgument;
let conditionalResolutionsArgument;
let finalRequested = false;
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--css-manifest" && process.argv[index + 1]) {
        cssManifestArgument = resolve(process.argv[++index]);
    } else if (process.argv[index] === "--conditional-resolutions" && process.argv[index + 1]) {
        conditionalResolutionsArgument = resolve(process.argv[++index]);
    } else if (process.argv[index] === "--value-manifest" && process.argv[index + 1]) {
        valueManifestPath = resolve(process.argv[++index]);
    } else if (process.argv[index] === "--keyframes-manifest" && process.argv[index + 1]) {
        keyframesManifestPath = resolve(process.argv[++index]);
    } else if (process.argv[index] === "--value-root" && process.argv[index + 1]) {
        valueRoot = resolve(process.argv[++index]);
    } else if (process.argv[index] === "--final") {
        finalRequested = true;
    } else {
        process.stderr.write("usage: node validate-target-paths.mjs [--css-manifest <execution-manifest>] [--conditional-resolutions <terminal-resolutions>] [--final] [--value-manifest <path>] [--keyframes-manifest <path>] [--value-root <path>]\n");
        process.exit(2);
    }
}
mode = finalRequested ? "final" : cssManifestArgument ? "execution" : "formation";
if (mode === "final" && (!cssManifestArgument || !conditionalResolutionsArgument)) {
    process.stderr.write("usage: --final requires --css-manifest <execution-manifest> and --conditional-resolutions <terminal-resolutions>\n");
    process.exit(2);
}
if (mode !== "final" && conditionalResolutionsArgument) {
    process.stderr.write("usage: --conditional-resolutions is valid only with --final\n");
    process.exit(2);
}
const waveIds = new Set(
    ["P-V.md", "K-A.md", "G-D.md", "M-C.md"].flatMap((name) =>
        [...readFileSync(resolve(root, "waves", name), "utf8").matchAll(/^\| ([A-Z]+\d+[A-Z]?) \|/gm)].map((match) => match[1]),
    ),
);

function exactKeys(value, keys, label) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        fail(`${label}: expected object`);
        return;
    }
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    if (canonicalize(actual) !== canonicalize(expected)) fail(`${label}: exact keys ${expected.join(",")}; found ${actual.join(",")}`);
}

function sameArray(label, actual, expected) {
    if (!Array.isArray(actual)) {
        fail(`${label}: expected an array`);
        return;
    }
    if (actual.length !== expected.length || actual.some((value, index) => value !== expected[index])) {
        const actualSet = new Set(actual);
        const expectedSet = new Set(expected);
        const missing = expected.filter((value) => !actualSet.has(value));
        const extra = actual.filter((value) => !expectedSet.has(value));
        const orderOnly = !missing.length && !extra.length;
        fail(
            `${label}: does not exactly match authority${
                orderOnly ? " (order differs)" : `; missing ${JSON.stringify(missing)}; extra ${JSON.stringify(extra)}`
            }`,
        );
    }
}

function readCanonicalJson(path, label) {
    if (!existsSync(path) || !lstatSync(path).isFile() || lstatSync(path).isSymbolicLink() || realpathSync(path) !== path) {
        fail(`${label}: canonical regular non-symlink manifest required ${path}`);
        return {};
    }
    try {
        return parseJsonStrict(readFileSync(path));
    } catch (error) {
        fail(`${label}: strict JSON parse failed: ${error.message}`);
        return {};
    }
}

function replaceContiguous(label, baseline, predicate, replacement) {
    const indexes = baseline.map((value, index) => predicate(value) ? index : -1).filter((index) => index >= 0);
    if (!indexes.length || indexes.some((value, index) => index > 0 && value !== indexes[index - 1] + 1)) {
        fail(`${label}: immutable formation vector does not contain one contiguous replaceable sector`);
        return baseline;
    }
    return [
        ...baseline.slice(0, indexes[0]),
        ...replacement,
        ...baseline.slice(indexes.at(-1) + 1),
    ];
}

function validatedConditionalResolutions() {
    if (mode !== "final") return undefined;
    const path = conditionalResolutionsArgument;
    const manifest = readCanonicalJson(path, "value conditional resolutions");
    const run = spawnSync(process.execPath, [resolutionsValidator, "--resolutions", path], {
        encoding: "utf8",
        maxBuffer: 128 * 1024 * 1024,
    });
    if (run.status !== 0) {
        fail(`value library: conditional resolutions validator failed: ${(run.stderr || run.stdout).trim()}`);
        return manifest;
    }
    try {
        const receipt = parseJsonStrict(run.stdout);
        if (receipt.resolutions_path !== path || receipt.manifest_hash !== manifest.manifest_hash) {
            fail("value library: conditional resolutions receipt does not bind the exact supplied artifact");
        }
    } catch (error) {
        fail(`value library: conditional resolutions receipt is invalid JSON: ${error.message}`);
    }
    return manifest;
}

function treeBlock(document, heading) {
    const first = document.indexOf(heading);
    if (first < 0 || document.indexOf(heading, first + heading.length) >= 0) {
        fail(`authority: heading ${JSON.stringify(heading)} must occur exactly once`);
        return { block: "", directories: [], files: [] };
    }
    const fence = document.indexOf("```text", first + heading.length);
    const start = fence < 0 ? -1 : fence + "```text".length;
    const end = start < 0 ? -1 : document.indexOf("```", start);
    if (start < 0 || end < 0) {
        fail(`authority: ${heading} has no closed text tree`);
        return { block: "", directories: [], files: [] };
    }
    const block = document.slice(start, end).replace(/^\r?\n/, "").replace(/\r\n/g, "\n");
    const directories = [];
    const files = [];
    const stack = [];
    for (const raw of block.split("\n")) {
        if (!raw.trim()) continue;
        const indentation = raw.match(/^ */)?.[0].length ?? 0;
        if (indentation % 2 !== 0 || /[\t{}*]/.test(raw)) {
            fail(`authority: ${heading} contains a non-expanded tree row ${JSON.stringify(raw)}`);
            continue;
        }
        const depth = indentation / 2;
        const entry = raw.trim();
        if (depth > stack.length) {
            fail(`authority: ${heading} skips an indentation level at ${JSON.stringify(raw)}`);
            continue;
        }
        stack.length = depth;
        if (entry.endsWith("/")) {
            stack[depth] = entry.slice(0, -1);
            directories.push(stack.join("/"));
        } else {
            files.push([...stack, entry].join("/"));
        }
    }
    return { block, directories, files };
}

function compactTreeBlock(document, heading) {
    const first = document.indexOf(heading);
    if (first < 0 || document.indexOf(heading, first + heading.length) >= 0) {
        fail(`authority: heading ${JSON.stringify(heading)} must occur exactly once`);
        return { block: "", directories: [], files: [] };
    }
    const fence = document.indexOf("```text", first + heading.length);
    const start = fence < 0 ? -1 : fence + "```text".length;
    const end = start < 0 ? -1 : document.indexOf("```", start);
    if (start < 0 || end < 0) {
        fail(`authority: ${heading} has no closed text tree`);
        return { block: "", directories: [], files: [] };
    }
    const block = document.slice(start, end).replace(/^\r?\n/, "").replace(/\r\n/g, "\n");
    const directories = [];
    const files = [];
    const stack = [];
    const expand = (entry) => {
        const braces = entry.match(/^(.*)\{([^{}]+)\}(.*)$/);
        return braces ? braces[2].split(",").map((member) => `${braces[1]}${member}${braces[3]}`) : [entry];
    };
    for (const raw of block.split("\n")) {
        if (!raw.trim()) continue;
        const line = raw.replace(/\s+#.*$/, "");
        const match = line.match(/^((?:│   |    )*)(?:(├── |└── ))?(.*)$/);
        if (!match) {
            fail(`authority: ${heading} contains an invalid compact-tree row ${JSON.stringify(raw)}`);
            continue;
        }
        const branch = Boolean(match[2]);
        const depth = match[1].length / 4 + (branch ? 1 : 0);
        const entries = expand(match[3].trim());
        for (const entry of entries) {
            const directory = entry.endsWith("/");
            const name = directory ? entry.slice(0, -1) : entry;
            const path = [...stack.slice(0, depth), name].filter(Boolean).join("/");
            (directory ? directories : files).push(path);
        }
        if (entries.length === 1 && entries[0].endsWith("/")) {
            stack.length = depth;
            stack[depth] = entries[0].slice(0, -1);
        } else if (!branch && depth === 0) {
            stack.length = 0;
        }
    }
    return { block, directories, files };
}

function verifiedAuthority(authority, label, compact = false) {
    if (!authority || typeof authority !== "object") {
        fail(`${label}: typed authority object required`);
        return { block: "", directories: [], files: [] };
    }
    const path = resolve(root, authority.document ?? "");
    let document = "";
    try {
        document = readFileSync(path, "utf8");
    } catch (error) {
        fail(`${label}: cannot read ${authority.document}: ${error.message}`);
        return { block: "", directories: [], files: [] };
    }
    const documentHash = hash(document);
    if (documentHash !== authority.document_sha256) fail(`${label}: document hash ${authority.document_sha256}; computed ${documentHash}`);
    const tree = compact ? compactTreeBlock(document, authority.heading) : treeBlock(document, authority.heading);
    const treeHash = hash(tree.block);
    if (treeHash !== authority.tree_sha256) fail(`${label}: tree hash ${authority.tree_sha256}; computed ${treeHash}`);
    return tree;
}

function validateExpandedPaths(label, paths, rootPath) {
    if (!Array.isArray(paths) || !paths.length) {
        fail(`${label}: empty path set`);
        return;
    }
    if (new Set(paths).size !== paths.length) fail(`${label}: duplicate path`);
    const folded = new Map();
    for (const path of paths) {
        if (
            typeof path !== "string" ||
            !path.startsWith(`${rootPath}/`) ||
            path.includes("//") ||
            path.includes("..") ||
            /[{}*\\]/.test(path) ||
            path.endsWith("/")
        ) {
            fail(`${label}: non-expanded or invalid path ${String(path)}`);
            continue;
        }
        const key = path.normalize("NFC").toLocaleLowerCase("en-US");
        if (folded.has(key)) fail(`${label}: case/Unicode collision ${folded.get(key)} <> ${path}`);
        else folded.set(key, path);
        const parts = path.split("/");
        const parent = parts.at(-2).toLocaleLowerCase("en-US");
        let stem = basename(path, extname(path)).replace(/\.test$/, "").toLocaleLowerCase("en-US");
        if (stem === parent || stem.startsWith(`${parent}-`) || stem.startsWith(`${parent}_`)) {
            fail(`${label}: grouped filename repeats enclosing module name ${path}`);
        }
    }
}

function sourceHasColocatedTest(path) {
    const parts = path.split("/").slice(1);
    return (
        parts.some((part) => ["test", "tests", "__tests__"].includes(part.toLocaleLowerCase("en-US"))) ||
        /\.(?:test|spec)\.[^.]+$/i.test(path)
    );
}

function derivedTestPath(source, sourceRoot, testRoot, law) {
    if (law.source_extension !== "replace-last" || law.test_extension !== ".test.ts" || law.case !== "preserve") {
        fail("value: unsupported test_path_law");
    }
    const relative = source.slice(sourceRoot.length + 1);
    return `${testRoot}/${relative.replace(/\.[^.]+$/, "")}${law.test_extension}`;
}

function validateKeyframes() {
    const path = keyframesManifestPath;
    const manifest = readCanonicalJson(path, "keyframes manifest");
    exactKeys(manifest, ["schema", "authority", "library", "demo", "manifest_sha256"], "keyframes");
    exactKeys(manifest.authority, ["library", "demo"], "keyframes authority");
    for (const name of ["library", "demo"]) exactKeys(manifest.authority?.[name], ["document", "heading", "document_sha256", "tree_sha256"], `keyframes authority ${name}`);
    exactKeys(manifest.library, ["root", "files", "test", "support_roots", "forbidden_roots"], "keyframes library");
    exactKeys(manifest.demo, ["root", "files", "test", "support_files", "forbidden_math_owners"], "keyframes demo");
    for (const name of ["library", "demo"]) {
        exactKeys(
            manifest[name]?.test,
            ["root", "source_extension", "test_extension", "case", "file_count", "files_sha256", "support_exceptions"],
            `keyframes ${name} test`,
        );
    }
    if (manifest.schema !== "vnext-keyframes-target-paths/1") fail("keyframes: invalid schema");
    const libraryTree = verifiedAuthority(manifest.authority?.library, "keyframes library authority", true);
    const demoTree = verifiedAuthority(manifest.authority?.demo, "keyframes demo authority", true);
    sameArray("keyframes library: authority files", manifest.library?.files, libraryTree.files.filter((file) => file.startsWith(`${manifest.library?.root}/`)));
    sameArray("keyframes demo: authority files", manifest.demo?.files, demoTree.files.filter((file) => file.startsWith(`${manifest.demo?.root}/`)));
    for (const name of ["library", "demo"]) {
        const files = manifest[name]?.files ?? [];
        validateExpandedPaths(`keyframes ${name}`, files, manifest[name]?.root);
        for (const file of files) {
            if (sourceHasColocatedTest(file)) fail(`keyframes ${name}: source-colocated test ${file}`);
        }
        const test = manifest[name]?.test ?? {};
        if (test.source_extension !== "replace-last" || test.test_extension !== ".test.ts" || test.case !== "preserve") {
            fail(`keyframes ${name}: unsupported external-test path law`);
        }
        const testFiles = files.map((source) => derivedTestPath(source, manifest[name].root, test.root, test));
        validateExpandedPaths(`keyframes ${name} external test`, testFiles, test.root);
        if (new Set(testFiles).size !== testFiles.length) fail(`keyframes ${name}: derived external tests collide`);
        if (test.file_count !== testFiles.length) fail(`keyframes ${name}: external-test count ${test.file_count}; derived ${testFiles.length}`);
        const testHash = hash(canonicalize(testFiles));
        if (test.files_sha256 !== testHash) fail(`keyframes ${name}: external-test vector hash ${test.files_sha256}; derived ${testHash}`);
        if (!Array.isArray(test.support_exceptions) || test.support_exceptions.length !== 0) {
            fail(`keyframes ${name}: exact mirror admits no untyped support exception`);
        }
    }
    for (const required of ["src/index.ts", "src/entries/light.ts", "src/entries/heavy.ts"]) {
        if (!manifest.library.files.includes(required)) fail(`keyframes library: missing ${required}`);
    }
    for (const required of ["proof", "bench"]) {
        if (!manifest.library.support_roots.includes(required)) fail(`keyframes library: missing support root ${required}`);
    }
    const authoritySupport = new Set(libraryTree.directories.filter((path) => !path.startsWith("src/")));
    if (!authoritySupport.has(manifest.library.test.root)) fail("keyframes library: authority lacks exact test mirror root");
    for (const support of manifest.library.support_roots) if (!authoritySupport.has(support)) fail(`keyframes library: authority lacks support root ${support}`);
    const demoSupport = new Set(demoTree.directories.filter((path) => !path.startsWith("demo/")));
    if (!demoSupport.has(manifest.demo.test.root)) fail("keyframes demo: authority lacks exact test mirror root");
    const expectedDemoSupport = ["proof/demo-text-loader.mjs"];
    sameArray("keyframes demo: exact test support", manifest.demo.support_files, expectedDemoSupport);
    validateExpandedPaths("keyframes demo test support", manifest.demo.support_files ?? [], "proof");
    for (const forbidden of manifest.library.forbidden_roots ?? []) {
        if (manifest.library.files.some((file) => file === forbidden || file.startsWith(`${forbidden}/`))) fail(`keyframes library: forbidden root survives ${forbidden}`);
    }
    for (const owner of manifest.demo.forbidden_math_owners ?? []) {
        if (manifest.demo.files.some((file) => file.split("/").includes(owner))) fail(`keyframes demo: forbidden duplicate math owner survives ${owner}`);
    }
    for (const required of [
        "demo/state/codec.ts",
        "demo/state/history.ts",
        "demo/features/easing/atlas/grid.vue",
        "demo/features/easing/editor/panel.vue",
    ]) {
        if (!manifest.demo.files.includes(required)) fail(`keyframes demo: missing ${required}`);
    }
    const preimage = structuredClone(manifest);
    delete preimage.manifest_sha256;
    const computed = hash(canonicalize(preimage));
    if (manifest.manifest_sha256 !== computed) {
        fail(`keyframes: manifest hash ${manifest.manifest_sha256}; computed ${computed}`);
    }
    return {
        schema: manifest.schema,
        library_source_files: manifest.library.files.length,
        library_test_files: manifest.library.test.file_count,
        library_test_files_sha256: manifest.library.test.files_sha256,
        demo_source_files: manifest.demo.files.length,
        demo_test_files: manifest.demo.test.file_count,
        demo_test_files_sha256: manifest.demo.test.files_sha256,
        demo_support_files: manifest.demo.support_files.length,
        manifest_sha256: computed,
    };
}

function validateValue() {
    const path = valueManifestPath;
    const manifest = readCanonicalJson(path, "value manifest");
    const conditionalResolutionManifest = validatedConditionalResolutions();
    exactKeys(manifest, ["schema", "authority", "test_path_law", "library", "demo", "manifest_sha256"], "value");
    exactKeys(manifest.authority, ["library", "demo"], "value authority");
    exactKeys(manifest.authority?.library, ["document", "heading", "topology", "grammar_snapshot", "document_sha256", "tree_sha256"], "value library authority");
    exactKeys(manifest.authority?.library?.grammar_snapshot, [
        "path", "file_sha256", "manifest_hash", "source_commit", "snapshot_kind", "execution_resnapshot_required",
        "module_count", "runtime_modules_sha256", "excluded_dispositions_sha256", "resolved_edges_sha256",
    ], "value grammar snapshot authority");
    exactKeys(manifest.authority?.demo, ["document", "heading", "topology", "document_sha256", "tree_sha256"], "value demo authority");
    exactKeys(manifest.test_path_law, ["source_extension", "test_extension", "case"], "value test_path_law");
    for (const name of ["library", "demo"]) {
        exactKeys(manifest[name], ["root", "files", "test", "conditional_paths", "support_exceptions", "forbidden_roots"], `value ${name}`);
        exactKeys(manifest[name]?.test, ["root", "declared_directories", "files"], `value ${name} test`);
        for (const [index, row] of (manifest[name]?.conditional_paths ?? []).entries()) exactKeys(row, ["source", "test", "owner", "prune_when"], `value ${name} conditional ${index}`);
        for (const [index, row] of (manifest[name]?.support_exceptions ?? []).entries()) exactKeys(row, ["source", "test", "kind", "owner"], `value ${name} support exception ${index}`);
    }
    if (manifest.schema !== "vnext-value-target-paths/1") fail("value: invalid schema");
    const expectedTopology = mode === "final" ? "exact" : "conditional-branch-family";
    if (manifest.authority?.library?.topology !== expectedTopology) fail(`value library: ${mode} mode requires ${expectedTopology} topology`);
    if (manifest.authority?.demo?.topology !== "exact") fail("value demo: authority must be exact");

    for (const name of ["library", "demo"]) {
        const authority = manifest.authority?.[name];
        const documentPath = resolve(root, authority?.document ?? "");
        let document = "";
        try {
            document = readFileSync(documentPath, "utf8");
        } catch (error) {
            fail(`value ${name}: cannot read authority ${authority?.document}: ${error.message}`);
            continue;
        }
        const documentHash = hash(document);
        if (documentHash !== authority.document_sha256) {
            fail(`value ${name}: authority document hash ${authority.document_sha256}; computed ${documentHash}`);
        }
        const tree = treeBlock(document, authority.heading);
        const treeHash = hash(tree.block);
        if (treeHash !== authority.tree_sha256) {
            fail(`value ${name}: authority tree hash ${authority.tree_sha256}; computed ${treeHash}`);
        }
        const sourcePrefix = `${manifest[name].root}/`;
        if (name !== "library" || mode === "formation") {
            sameArray(
                `value ${name}: source files`,
                manifest[name].files,
                tree.files.filter((file) => file.startsWith(sourcePrefix)),
            );
        }
        const testRoot = manifest[name].test?.root;
        sameArray(
            `value ${name}: declared test directories`,
            manifest[name].test?.declared_directories,
            tree.directories.filter((directory) => directory === testRoot || directory.startsWith(`${testRoot}/`)),
        );
    }

    const allValuePaths = [];
    for (const name of ["library", "demo"]) {
        const target = manifest[name];
        validateExpandedPaths(`value ${name} source`, target.files, target.root);
        validateExpandedPaths(`value ${name} test`, target.test?.files, target.test?.root);
        allValuePaths.push(...target.files, ...target.test.files);
        for (const source of target.files) {
            if (sourceHasColocatedTest(source)) fail(`value ${name}: source-colocated test ${source}`);
        }

        const exceptions = target.support_exceptions ?? [];
        const exceptionSources = exceptions.map(({ source }) => source);
        if (new Set(exceptionSources).size !== exceptionSources.length) fail(`value ${name}: duplicate support exception source`);
        const exceptionMap = new Map(exceptions.map((row) => [row.source, row]));
        for (const row of exceptions) {
            if (!target.files.includes(row.source)) fail(`value ${name}: support exception source is absent ${row.source}`);
            if (row.test !== null) fail(`value ${name}: support exception must carry typed null test ${row.source}`);
            if (!waveIds.has(row.owner)) fail(`value ${name}: unknown support owner ${row.owner}`);
        }
        const expectedTests = target.files
            .filter((source) => !exceptionMap.has(source))
            .map((source) => derivedTestPath(source, target.root, target.test.root, manifest.test_path_law));
        sameArray(`value ${name}: external test isomorph`, target.test.files, expectedTests);
        for (const declared of target.test.declared_directories) {
            if (declared !== target.test.root && !target.test.files.some((file) => file.startsWith(`${declared}/`))) {
                fail(`value ${name}: declared test directory has no mirrored leaf ${declared}`);
            }
        }
        for (const forbidden of target.forbidden_roots ?? []) {
            if (target.files.some((file) => file === forbidden || file.startsWith(`${forbidden}/`))) {
                fail(`value ${name}: forbidden source root survives ${forbidden}`);
            }
        }
    }

    const grammarSnapshot = manifest.authority?.library?.grammar_snapshot;
    const expectedSnapshotKind = mode === "formation" ? "formation-current" : "execution-input";
    if (grammarSnapshot?.snapshot_kind !== expectedSnapshotKind) fail(`value library: ${mode} mode requires ${expectedSnapshotKind} grammar snapshot`);
    if (mode === "formation" && grammarSnapshot?.execution_resnapshot_required !== true) fail("value library: formation grammar snapshot must require execution resnapshot");
    if (mode !== "formation" && grammarSnapshot?.execution_resnapshot_required !== false) fail("value library: execution grammar snapshot must be terminal for its pinned epoch");
    const expectedCssPath = mode === "formation"
        ? resolve(root, grammarSnapshot?.path ?? "")
        : resolve(valueRoot, grammarSnapshot?.path ?? "");
    if (mode !== "formation" && grammarSnapshot?.path !== "test/proof/p00/css-module-isomorphism.execution.json") {
        fail("value library: execution grammar snapshot must use P00's distinct canonical artifact path");
    }
    if (cssManifestArgument && existsSync(cssManifestArgument)
        && (!existsSync(expectedCssPath) || realpathSync(cssManifestArgument) !== realpathSync(expectedCssPath))) {
        fail("value library: --css-manifest does not equal the grammar-snapshot authority path");
    }
    const cssPath = cssManifestArgument ?? expectedCssPath;
    let cssManifest;
    if (!existsSync(cssPath) || !lstatSync(cssPath).isFile() || lstatSync(cssPath).isSymbolicLink()) {
        fail(`value library: grammar snapshot missing regular file ${cssPath}`);
    } else {
        if (realpathSync(cssPath) !== cssPath) fail("value library: grammar snapshot path must be canonical and non-symlinked");
        const bytes = readFileSync(cssPath);
        if (hash(bytes) !== grammarSnapshot?.file_sha256) fail(`value library: grammar snapshot file hash ${grammarSnapshot?.file_sha256}; computed ${hash(bytes)}`);
        try {
            cssManifest = parseJsonStrict(bytes);
        } catch (error) {
            fail(`value library: grammar snapshot JSON invalid: ${error.message}`);
        }
        const cssArgs = [cssValidator, "--manifest", cssPath];
        if (mode !== "formation") {
            cssArgs.push(
                "--typescript-root", resolve(valueRoot, "src/css/grammar"),
                "--test-root", resolve(valueRoot, "test/src/css/grammar"),
            );
        }
        const cssRun = spawnSync(process.execPath, cssArgs, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
        if (cssRun.status !== 0) fail(`value library: grammar snapshot validator failed: ${(cssRun.stderr || cssRun.stdout).trim()}`);
    }
    if (cssManifest) {
        const projection = {
            manifest_hash: cssManifest.manifest_hash,
            source_commit: cssManifest.source?.commit,
            snapshot_kind: cssManifest.authority?.snapshot_kind,
            module_count: cssManifest.modules?.length,
            runtime_modules_sha256: cssManifest.authority?.runtime_modules_sha256,
            excluded_dispositions_sha256: cssManifest.authority?.excluded_dispositions_sha256,
            resolved_edges_sha256: cssManifest.authority?.resolved_edges_sha256,
        };
        for (const [member, actual] of Object.entries(projection)) {
            if (grammarSnapshot?.[member] !== actual) fail(`value library: grammar snapshot ${member} does not project the CSS manifest`);
        }
        const grammarSources = manifest.library.files.filter((path) => path.startsWith("src/css/grammar/"));
        const grammarTests = manifest.library.test.files.filter((path) => path.startsWith("test/src/css/grammar/"));
        sameArray("value library: grammar source projection", grammarSources, cssManifest.modules.map(({ typescript_path }) => typescript_path));
        sameArray("value library: grammar test projection", grammarTests, cssManifest.modules.map(({ test_path }) => test_path));
    }

    const folded = new Map();
    for (const path of allValuePaths) {
        const key = path.normalize("NFC").toLocaleLowerCase("en-US");
        if (folded.has(key)) fail(`value: cross-tree case/Unicode collision ${folded.get(key)} <> ${path}`);
        else folded.set(key, path);
    }

    const expectedConditional = new Map([
        ["src/color/bulk.ts", "V16B"],
        ["src/color/okhsl.ts", "V18H"],
        ["src/color/okhsv.ts", "V18V"],
        ["src/transform/decompose.ts", "V24"],
    ]);
    const conditional = manifest.library.conditional_paths ?? [];
    const expectedConditionalCount = mode === "final" ? 0 : expectedConditional.size;
    if (conditional.length !== expectedConditionalCount) fail(`value library: ${mode} conditional path ledger must contain exactly ${expectedConditionalCount} rows`);
    const conditionalKeys = conditional.map(({ source, owner }) => `${source}\0${owner}`);
    if (new Set(conditionalKeys).size !== conditionalKeys.length) fail("value library: duplicate conditional source/owner row");
    for (const row of conditional) {
        if (expectedConditional.get(row.source) !== row.owner) {
            fail(`value library: unknown or wrongly owned conditional path ${row.source}/${row.owner}`);
        }
        if (!waveIds.has(row.owner)) fail(`value library: conditional owner is not a wave ${row.owner}`);
        if (!manifest.library.files.includes(row.source)) fail(`value library: conditional source is absent ${row.source}`);
        const expectedTest = derivedTestPath(row.source, manifest.library.root, manifest.library.test.root, manifest.test_path_law);
        if (row.test !== expectedTest || !manifest.library.test.files.includes(row.test)) {
            fail(`value library: conditional test mismatch for ${row.source}`);
        }
        if (!/\bPRUNE\b/.test(row.prune_when)) fail(`value library: conditional row lacks terminal PRUNE rule ${row.source}`);
    }
    if (mode !== "final") {
        const expectedKeys = [...expectedConditional].map(([source, owner]) => `${source}\0${owner}`).sort();
        sameArray("value library: exact conditional source/owner set", [...conditionalKeys].sort(), expectedKeys);
    }

    if (mode !== "formation" && cssManifest) {
        const formation = readCanonicalJson(canonicalValueManifestPath, "immutable value formation target");
        const expected = structuredClone(formation);
        expected.authority.library.topology = mode === "final" ? "exact" : "conditional-branch-family";
        expected.authority.library.grammar_snapshot = structuredClone(manifest.authority.library.grammar_snapshot);
        expected.library.files = replaceContiguous(
            "value library source grammar projection",
            formation.library.files,
            (candidate) => candidate.startsWith("src/css/grammar/"),
            cssManifest.modules.map(({ typescript_path }) => typescript_path),
        );
        expected.library.test.files = replaceContiguous(
            "value library test grammar projection",
            formation.library.test.files,
            (candidate) => candidate.startsWith("test/src/css/grammar/"),
            cssManifest.modules.map(({ test_path }) => test_path),
        );
        if (mode === "final") {
            const prunedSources = new Set(
                (conditionalResolutionManifest?.rows ?? [])
                    .filter(({ outcome }) => outcome === "PRUNE")
                    .map(({ source }) => source),
            );
            const prunedTests = new Set(
                (conditionalResolutionManifest?.rows ?? [])
                    .filter(({ outcome }) => outcome === "PRUNE")
                    .map(({ test }) => test),
            );
            expected.library.files = expected.library.files.filter((candidate) => !prunedSources.has(candidate));
            expected.library.test.files = expected.library.test.files.filter((candidate) => !prunedTests.has(candidate));
            expected.library.conditional_paths = [];
        }
        delete expected.manifest_sha256;
        const actual = structuredClone(manifest);
        delete actual.manifest_sha256;
        if (canonicalize(actual) !== canonicalize(expected)) {
            fail(`value library: ${mode} target must be the exact immutable formation union transformed only by the execution grammar vector${mode === "final" ? " and terminal conditional outcomes" : ""}`);
        }
    }
    if (manifest.demo.conditional_paths?.length !== 0) fail("value demo: exact topology cannot carry conditional paths");
    const parserAuthority = readFileSync(resolve(root, "PARSER-CSS-COLOR.md"), "utf8");
    for (const [source, owner] of expectedConditional) {
        if (!parserAuthority.includes(basename(source)) || !parserAuthority.includes(owner)) {
            fail(`value library: prose does not name conditional ${source}/${owner}`);
        }
    }

    const expectedSupport = new Map([
        ["demo/platform/api/client.ts", ["generated-client", "A20"]],
        ["demo/features/extract/worker.ts", ["worker-entry", "D13"]],
    ]);
    if (manifest.library.support_exceptions.length !== 0 || manifest.demo.support_exceptions.length !== expectedSupport.size) {
        fail("value: support-exception ledger must be empty for library and contain exactly two demo rows");
    }
    for (const row of manifest.demo.support_exceptions) {
        const expected = expectedSupport.get(row.source);
        if (!expected || row.kind !== expected[0] || row.owner !== expected[1]) {
            fail(`value demo: unknown or wrongly owned support exception ${row.source}/${row.kind}/${row.owner}`);
        }
    }
    const demoAuthority = readFileSync(resolve(root, "DEMO-TARGET-DAGS.md"), "utf8");
    for (const phrase of ["generated clients", "worker entries", "A20 generated client"]) {
        if (!demoAuthority.includes(phrase)) fail(`value demo: prose lacks support-exception authority phrase ${phrase}`);
    }

    const preimage = structuredClone(manifest);
    delete preimage.manifest_sha256;
    const computed = hash(canonicalize(preimage));
    if (manifest.manifest_sha256 !== computed) {
        fail(`value: manifest hash ${manifest.manifest_sha256}; computed ${computed}`);
    }
    return {
        schema: manifest.schema,
            library: {
                mode,
                topology: manifest.authority.library.topology,
            source_candidates: manifest.library.files.length,
            conditional_pairs: manifest.library.conditional_paths.length,
                final_source_range: [
                    manifest.library.files.length - conditional.length,
                    manifest.library.files.length,
                ],
                test_candidates: manifest.library.test.files.length,
                ...(conditionalResolutionManifest
                    ? { conditional_resolutions_sha256: conditionalResolutionManifest.manifest_hash }
                    : {}),
            },
        demo: {
            topology: manifest.authority.demo.topology,
            source_files: manifest.demo.files.length,
            test_files: manifest.demo.test.files.length,
            support_exceptions: manifest.demo.support_exceptions.length,
        },
        authority_sha256: {
            library_document: manifest.authority.library.document_sha256,
            library_tree: manifest.authority.library.tree_sha256,
            demo_document: manifest.authority.demo.document_sha256,
            demo_tree: manifest.authority.demo.tree_sha256,
        },
        manifest_sha256: computed,
    };
}

let keyframes;
let value;
try {
    keyframes = validateKeyframes();
} catch (error) {
    fail(`keyframes: ${error.message}`);
}
try {
    value = validateValue();
} catch (error) {
    fail(`value: ${error.message}`);
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({ schema: "vnext-target-paths/2", keyframes, value })}\n`);
