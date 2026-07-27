#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    copyFileSync,
    cpSync,
    existsSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    realpathSync,
    renameSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { canonicalize, compareCanonicalText, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import { validateConsumerBoundsAuthority } from "./consumer-bounds-authority.mjs";
import {
    consumerUniverseAnnexProjection,
    consumerUniverseDelta,
    consumerUniverseImmutableBindingFromResult,
    consumerUniverseImmutableCaptureDocument,
    consumerUniverseImmutableCaptureReference,
    validateConsumerUniverseReceipt,
} from "./consumer-universe-return.mjs";
import { validateConsumerRootSnapshotIndex } from "./consumer-root-snapshot.mjs";
import { resolveGitIdentity, staticImportProjection } from "./resolve-consumer-universe.mjs";

const tool = resolve(new URL("resolve-consumer-universe.mjs", import.meta.url).pathname);
const trancheRoot = resolve(new URL("..", import.meta.url).pathname);
const workspaceNodeModules = resolve(trancheRoot, "../../../..", "node_modules");
const waveRegistryRelativePaths = ["waves/P-V.md", "waves/K-A.md", "waves/G-D.md", "waves/M-C.md"];
const directory = mkdtempSync(join(tmpdir(), "vnext-consumer-universe-"));
const repositories = join(directory, "repositories");
const failures = [];
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const clone = (value) => structuredClone(value);
const syntaxSource = [
    "import {",
    "    color,",
    "} from \"@mkbabb/value.js\";",
    "export const sample = color;",
    "import type { Color as ImportedColor } from \"@mkbabb/value.js/import-type\";",
    "export type { Color as ExportedColor } from \"@mkbabb/value.js/export-type\";",
    "import { type Tone as ImportedTone } from \"@mkbabb/value.js/inline-import-type\";",
    "export { type Tone as ExportedTone } from \"@mkbabb/value.js/inline-export-type\";",
    "import { color as mixedColor, type Palette as ImportedPalette } from \"@mkbabb/value.js/mixed-import\";",
    "export { color as mixedExport, type Palette as ExportedPalette } from \"@mkbabb/value.js/mixed-export\";",
    "export * from \"@mkbabb/value.js/export-star\";",
    "import \"@mkbabb/value.js/side-effect\";",
    "import \"@mkbabb/value.js/styles.css\";",
    "import(\"@mkbabb/value.js/dynamic-quoted\");",
    "import(`@mkbabb/value.js/dynamic-template`);",
    "import(\"@mkbabb/value.js/dynamic-options\", { with: { type: \"json\" } });",
    "require(\"@mkbabb/value.js/require-runtime\");",
    "const falseString = 'import(\"@mkbabb/value.js/false-string\")';",
    "// import(\"@mkbabb/value.js/false-comment\")",
    "const falseTemplate = `import(\"@mkbabb/value.js/false-template\")`;",
    "const falseRegex = /import\\(\"@mkbabb\\/value\\.js\\/false-regex\"\\)/;",
    "const falseProperty = object.import(\"@mkbabb/value.js/false-property\");",
    "const nested = `${import(\"@mkbabb/value.js/nested-dynamic\")}`;",
].join("\n") + "\n";
const stylesheetSource = [
    "@import \"@mkbabb/value.js/theme.css\";",
    "@import url(\"@mkbabb/value.js/print.css\");",
    "@import url(@mkbabb/value.js/raw.css);",
    "/* @import \"@mkbabb/value.js/false-css-comment.css\"; */",
].join("\n") + "\n";

function git(repository, args, allowFailure = false) {
    const result = spawnSync("git", ["-C", repository, ...args], { encoding: null });
    if (result.status !== 0) {
        if (allowFailure) return null;
        throw new Error(`git ${args.join(" ")} failed: ${result.stderr.toString("utf8")}`);
    }
    return result.stdout;
}

function initializeRepository(name, files) {
    const path = join(repositories, name);
    mkdirSync(path, { recursive: true });
    git(path, ["init", "-b", `fixture-${name}`]);
    git(path, ["config", "user.name", "Consumer Selftest"]);
    git(path, ["config", "user.email", "consumer-selftest@example.invalid"]);
    for (const [relativePath, contents] of Object.entries(files)) {
        const target = join(path, relativePath);
        mkdirSync(resolve(target, ".."), { recursive: true });
        writeFileSync(target, contents);
    }
    git(path, ["add", "."]);
    git(path, ["commit", "-m", "fixture"]);
    git(path, ["remote", "add", "origin", `https://example.invalid/${name}.git`]);
    return path;
}

function evidence(path, description) {
    return {
        path,
        canonical_realpath: realpathSync(path),
        sha256: sha256(readFileSync(path)),
        description,
    };
}

function identity(path) {
    const observed = resolveGitIdentity(path);
    return { branch: observed.branch, head: observed.head, dirty_sha256: observed.dirty_sha256 };
}

function finalize(value) {
    const preimage = clone(value);
    delete preimage.universe_hash;
    value.universe_hash = sha256(canonicalize(preimage));
    return value;
}

function refreshEpoch(value, ageMilliseconds = 0) {
    const completed = new Date(Date.now() - ageMilliseconds);
    const started = new Date(completed.getTime() - 1000);
    value.observed_at = completed.toISOString();
    value.discovery.epoch.started_at = started.toISOString();
    value.discovery.epoch.completed_at = completed.toISOString();
    return value;
}

function run(name, value) {
    const input = join(directory, `${name}-input.json`);
    const output = join(directory, `${name}-receipt.json`);
    const snapshotStore = join(directory, `${name}-snapshot-store`);
    const snapshotIndex = join(directory, `${name}-snapshot-index.json`);
    refreshEpoch(value);
    writeFileSync(input, `${JSON.stringify(finalize(value), null, 2)}\n`);
    return {
        input,
        output,
        snapshotStore,
        snapshotIndex,
        result: executeResolver(input, output, snapshotStore, snapshotIndex),
    };
}

function executeResolver(input, output, snapshotStore, snapshotIndex) {
    return spawnSync(process.execPath, [
        tool,
        "--input", input,
        "--output", output,
        "--snapshot-store", snapshotStore,
        "--snapshot-index", snapshotIndex,
    ], { encoding: "utf8" });
}

function createImmutableCapture(name, receiptPath, validation) {
    const captureRoot = join(directory, `${name}-immutable-capture`);
    mkdirSync(captureRoot, { recursive: true });
    const copyMaterial = (sourcePath, filename) => {
        const destination = join(captureRoot, filename);
        copyFileSync(sourcePath, destination);
        const path = realpathSync(destination);
        return { path, file_sha256: sha256(readFileSync(path)) };
    };
    const materials = {
        receipt: copyMaterial(receiptPath, "receipt.json"),
        input: copyMaterial(validation.receipt.input.path, "input.json"),
        resolver: copyMaterial(tool, "resolve-consumer-universe.mjs"),
        input_schema: copyMaterial(join(trancheRoot, "consumer-universe.schema.json"), "consumer-universe.schema.json"),
        receipt_schema: copyMaterial(join(trancheRoot, "consumer-universe-receipt.schema.json"), "consumer-universe-receipt.schema.json"),
        bounds_authority: copyMaterial(validation.bounds_authority.path, "CONSUMER-UNIVERSE-BOUNDS.json"),
        wave_registry: {
            files: waveRegistryRelativePaths.map((relativePath, index) => ({
                relative_path: relativePath,
                ...copyMaterial(join(trancheRoot, relativePath), `wave-registry-${index + 1}.md`),
            })),
            registry_sha256: validation.receipt.formation_wave_registry_sha256,
        },
    };
    const binding = consumerUniverseImmutableBindingFromResult(receiptPath, validation);
    const capture = consumerUniverseImmutableCaptureDocument(binding, materials);
    const capturePath = join(captureRoot, "capture.json");
    writeFileSync(capturePath, `${canonicalize(capture)}\n`);
    const reference = consumerUniverseImmutableCaptureReference(realpathSync(capturePath));
    return { binding, capture, capturePath: realpathSync(capturePath), materials, reference };
}

function expectRejected(name, value, fragment) {
    const result = run(name, value).result;
    if (result.status === 0 || !result.stderr.includes(fragment)) {
        failures.push(`${name} was not rejected with ${JSON.stringify(fragment)}; status=${result.status}; stderr=${result.stderr}`);
    }
}

try {
    mkdirSync(repositories);
    const valueRoot = initializeRepository("value", {
        "README.md": "value fixture\n",
        "package.json": '{"name":"@mkbabb/value.js","version":"5.0.0"}\n',
    });
    const demoRoot = initializeRepository("keyframes", {
        "README.md": "keyframes fixture\n",
        "package.json": '{"name":"@mkbabb/keyframes.js","dependencies":{"@mkbabb/value.js":"file:../value"}}\n',
        "package-lock.json": `${JSON.stringify({
            name: "@mkbabb/keyframes.js",
            version: "1.0.0",
            lockfileVersion: 3,
            requires: true,
            packages: {
                "": { dependencies: { "@mkbabb/value.js": "file:../value" } },
                "node_modules/@mkbabb/parse-that": { version: "1.0.0" },
                "node_modules/@mkbabb/value.js": {
                    version: "5.0.0",
                    dependencies: { "@mkbabb/parse-that": "^1.0.0" },
                },
            },
        }, null, 2)}\n`,
        ".vnext/proof-runner.mjs": [
            'import { pathToFileURL } from "node:url";',
            "const target = process.argv[2];",
            "await import(pathToFileURL(target).href);",
            "",
        ].join("\n"),
        "src/index.ts": syntaxSource,
        "src/styles.css": stylesheetSource,
    });
    const bbnfRoot = initializeRepository("bbnf-lang", { "README.md": "bbnf fixture\n", "package.json": '{"name":"@mkbabb/bbnf-lang"}\n' });
    const glassRoot = initializeRepository("glass-ui", { "README.md": "glass fixture\n", "package.json": '{"name":"@mkbabb/glass-ui"}\n' });
    const parseRoot = initializeRepository("parse-that", { "README.md": "parse fixture\n", "package.json": '{"name":"@mkbabb/parse-that"}\n' });
    const scanPath = join(directory, "scan.txt");
    writeFileSync(scanPath, "bounded manifest/source/Git discovery self-test\n");
    const scanEvidence = evidence(scanPath, "bounded discovery invocation");
    const valueEvidence = evidence(join(valueRoot, "README.md"), "value repository provenance");
    const demoEvidence = evidence(join(demoRoot, "README.md"), "demo repository provenance");
    const bbnfEvidence = evidence(join(bbnfRoot, "README.md"), "bbnf repository provenance");
    const glassEvidence = evidence(join(glassRoot, "README.md"), "glass repository provenance");
    const parseEvidence = evidence(join(parseRoot, "README.md"), "parse repository provenance");
    const manifestEvidence = evidence(join(demoRoot, "package.json"), "observed dependency declaration");
    const lockEvidence = evidence(join(demoRoot, "package-lock.json"), "observed npm lock dependency closure");
    const runtimeEvidence = evidence(join(demoRoot, "src/index.ts"), "observed runtime import");
    const stylesheetEvidence = evidence(join(demoRoot, "src/styles.css"), "observed CSS import");
    const observed = (values, proof) => ({ values, evidence: [proof] });
    const rootRecord = (id, repository, path, owner, proof) => {
        const gitState = identity(path);
        return {
            id,
            repository,
            path,
            canonical_realpath: realpathSync(path),
            ...gitState,
            provenance: {
                origins: observed([`https://example.invalid/${repository}.git`], proof),
                worktrees: observed([realpathSync(path)], proof),
                deploy_roots: observed([], proof),
            },
            disposition: { status: "included", owner_wave: owner },
        };
    };
    const kinds = ["css", "dynamic", "lock", "manifest", "peer", "runtime", "transitive", "type"];
    const scopes = [
        { package: "@mkbabb/bbnf-lang", target: "bbnf-lang", kinds },
        { package: "@mkbabb/glass-ui", target: "glass-ui", kinds },
        { package: "@mkbabb/keyframes.js", target: "keyframes", kinds },
        { package: "@mkbabb/parse-that", target: "parse-that", kinds },
        { package: "@mkbabb/value.js", target: "value", kinds },
    ];
    const syntaxEdges = [
        ["keyframes:value-import-type", "@mkbabb/value.js/import-type", "type", runtimeEvidence],
        ["keyframes:value-export-type", "@mkbabb/value.js/export-type", "type", runtimeEvidence],
        ["keyframes:value-inline-import-type", "@mkbabb/value.js/inline-import-type", "type", runtimeEvidence],
        ["keyframes:value-inline-export-type", "@mkbabb/value.js/inline-export-type", "type", runtimeEvidence],
        ["keyframes:value-mixed-import-runtime", "@mkbabb/value.js/mixed-import", "runtime", runtimeEvidence],
        ["keyframes:value-mixed-import-type", "@mkbabb/value.js/mixed-import", "type", runtimeEvidence],
        ["keyframes:value-mixed-export-runtime", "@mkbabb/value.js/mixed-export", "runtime", runtimeEvidence],
        ["keyframes:value-mixed-export-type", "@mkbabb/value.js/mixed-export", "type", runtimeEvidence],
        ["keyframes:value-export-star", "@mkbabb/value.js/export-star", "runtime", runtimeEvidence],
        ["keyframes:value-side-effect", "@mkbabb/value.js/side-effect", "runtime", runtimeEvidence],
        ["keyframes:value-script-css", "@mkbabb/value.js/styles.css", "css", runtimeEvidence],
        ["keyframes:value-dynamic-quoted", "@mkbabb/value.js/dynamic-quoted", "dynamic", runtimeEvidence],
        ["keyframes:value-dynamic-template", "@mkbabb/value.js/dynamic-template", "dynamic", runtimeEvidence],
        ["keyframes:value-dynamic-options", "@mkbabb/value.js/dynamic-options", "dynamic", runtimeEvidence],
        ["keyframes:value-require-runtime", "@mkbabb/value.js/require-runtime", "runtime", runtimeEvidence],
        ["keyframes:value-nested-dynamic", "@mkbabb/value.js/nested-dynamic", "dynamic", runtimeEvidence],
        ["keyframes:value-css-quoted", "@mkbabb/value.js/theme.css", "css", stylesheetEvidence],
        ["keyframes:value-css-url", "@mkbabb/value.js/print.css", "css", stylesheetEvidence],
        ["keyframes:value-css-raw-url", "@mkbabb/value.js/raw.css", "css", stylesheetEvidence],
    ].map(([id, specifier, kind, proof]) => ({
        id,
        source: "keyframes",
        target: "value",
        package: "@mkbabb/value.js",
        specifier,
        kind,
        owner_wave: "C00",
        evidence: [proof],
        disposition: { status: "included" },
    }));
    const universe = {
        schema: "vnext-consumer-universe/2",
        observed_at: new Date().toISOString(),
        discovery: {
            methods: [
                "css",
                "dynamic",
                "manifests",
                "npm_package_locks_v2_v3",
                "origins",
                "realpaths",
                "runtime",
                "type",
                "worktrees",
            ],
            evidence: [scanEvidence],
            epoch: {
                started_at: new Date(Date.now() - 1000).toISOString(),
                completed_at: new Date().toISOString(),
                max_age_seconds: 300,
            },
            bounds: {
                search_roots: [{ path: repositories, canonical_realpath: realpathSync(repositories), max_depth: 3 }],
                ignored_directory_names: [
                    ".cache", ".git", ".next", ".nuxt", ".pnpm", ".turbo", ".venv", ".vnext", ".yarn",
                    "__pycache__", "build", "coverage", "dist", "node_modules", "playwright-report",
                    "r1-opus-refuted", "target", "test-results", "tranches", "venv",
                ],
                edge_scope: scopes,
                required_roots: [
                    { id: "bbnf-lang", canonical_realpath: realpathSync(bbnfRoot) },
                    { id: "glass-ui", canonical_realpath: realpathSync(glassRoot) },
                    { id: "keyframes", canonical_realpath: realpathSync(demoRoot) },
                    { id: "parse-that", canonical_realpath: realpathSync(parseRoot) },
                    { id: "value", canonical_realpath: realpathSync(valueRoot) },
                ],
                required_paths: [{
                    id: "keyframes/src",
                    kind: "repository-subdirectory",
                    repository_root_id: "keyframes",
                    relative_path: "src",
                    path: join(demoRoot, "src"),
                    canonical_realpath: realpathSync(join(demoRoot, "src")),
                }],
                max_entries: 10000,
                max_files: 1000,
                max_file_bytes: 1024 * 1024,
                max_snapshot_bytes: 64 * 1024 * 1024,
            },
        },
        roots: [
            rootRecord("bbnf-lang", "bbnf-lang", bbnfRoot, "A07", bbnfEvidence),
            rootRecord("glass-ui", "glass-ui", glassRoot, "G00", glassEvidence),
            rootRecord("keyframes", "keyframes", demoRoot, "K00", demoEvidence),
            rootRecord("parse-that", "parse-that", parseRoot, "P01", parseEvidence),
            rootRecord("value", "value", valueRoot, "V31", valueEvidence),
        ],
        edges: [
            {
                id: "keyframes:value-manifest",
                source: "keyframes",
                target: "value",
                package: "@mkbabb/value.js",
                specifier: "file:../value",
                kind: "manifest",
                owner_wave: "C00",
                evidence: [manifestEvidence],
                disposition: { status: "included" },
            },
            {
                id: "keyframes:value-runtime",
                source: "keyframes",
                target: "value",
                package: "@mkbabb/value.js",
                specifier: "@mkbabb/value.js",
                kind: "runtime",
                owner_wave: "C00",
                evidence: [runtimeEvidence],
                disposition: { status: "included" },
            },
            {
                id: "keyframes:value-lock-declaration",
                source: "keyframes",
                target: "value",
                package: "@mkbabb/value.js",
                specifier: "file:../value",
                kind: "lock",
                owner_wave: "C00",
                evidence: [lockEvidence],
                disposition: { status: "included" },
            },
            {
                id: "keyframes:value-lock-installed",
                source: "keyframes",
                target: "value",
                package: "@mkbabb/value.js",
                specifier: "5.0.0",
                kind: "lock",
                owner_wave: "C00",
                evidence: [lockEvidence],
                disposition: { status: "included" },
            },
            {
                id: "keyframes:parse-lock-installed",
                source: "keyframes",
                target: "parse-that",
                package: "@mkbabb/parse-that",
                specifier: "1.0.0",
                kind: "lock",
                owner_wave: "C00",
                evidence: [lockEvidence],
                disposition: { status: "included" },
            },
            {
                id: "keyframes:parse-transitive",
                source: "keyframes",
                target: "parse-that",
                package: "@mkbabb/parse-that",
                specifier: "^1.0.0",
                kind: "transitive",
                owner_wave: "C00",
                evidence: [lockEvidence],
                disposition: { status: "included" },
            },
            ...syntaxEdges,
        ],
        universe_hash: "",
    };

    const projectedSyntax = staticImportProjection(syntaxSource, join(demoRoot, "src/index.ts"))
        .map(({ kind, specifier, locator }) => ({ kind, specifier, locator }));
    const expectedSyntaxProjection = [
        ["runtime", "@mkbabb/value.js", "runtime:1:1"],
        ["type", "@mkbabb/value.js/import-type", "type:5:1"],
        ["type", "@mkbabb/value.js/export-type", "type:6:1"],
        ["type", "@mkbabb/value.js/inline-import-type", "type:7:1"],
        ["type", "@mkbabb/value.js/inline-export-type", "type:8:1"],
        ["runtime", "@mkbabb/value.js/mixed-import", "runtime:9:1"],
        ["type", "@mkbabb/value.js/mixed-import", "type:9:1"],
        ["runtime", "@mkbabb/value.js/mixed-export", "runtime:10:1"],
        ["type", "@mkbabb/value.js/mixed-export", "type:10:1"],
        ["runtime", "@mkbabb/value.js/export-star", "runtime:11:1"],
        ["runtime", "@mkbabb/value.js/side-effect", "runtime:12:1"],
        ["css", "@mkbabb/value.js/styles.css", "css:13:1"],
        ["dynamic", "@mkbabb/value.js/dynamic-quoted", "dynamic:14:1"],
        ["dynamic", "@mkbabb/value.js/dynamic-template", "dynamic:15:1"],
        ["dynamic", "@mkbabb/value.js/dynamic-options", "dynamic:16:1"],
        ["runtime", "@mkbabb/value.js/require-runtime", "runtime:17:1"],
        ["dynamic", "@mkbabb/value.js/nested-dynamic", "dynamic:23:19"],
    ].map(([kind, specifier, locator]) => ({ kind, specifier, locator }));
    if (canonicalize(projectedSyntax) !== canonicalize(expectedSyntaxProjection)) {
        failures.push(`syntax-aware source projection drifted: ${canonicalize(projectedSyntax)}`);
    }
    const projectedStyles = staticImportProjection(stylesheetSource, join(demoRoot, "src/styles.css"))
        .map(({ kind, specifier, locator }) => ({ kind, specifier, locator }));
    const expectedStylesProjection = [
        ["css", "@mkbabb/value.js/theme.css", "css:1:1"],
        ["css", "@mkbabb/value.js/print.css", "css:2:1"],
        ["css", "@mkbabb/value.js/raw.css", "css:3:1"],
    ].map(([kind, specifier, locator]) => ({ kind, specifier, locator }));
    if (canonicalize(projectedStyles) !== canonicalize(expectedStylesProjection)) {
        failures.push(`syntax-aware stylesheet projection drifted: ${canonicalize(projectedStyles)}`);
    }

    let fixtureReceiptValidationOptions;
    let immutableControl;
    const valid = run("valid", clone(universe));
    if (valid.result.status !== 0) {
        failures.push(`valid real-Git universe rejected: ${valid.result.stderr}`);
    } else {
        const source = decodeUtf8Strict(readFileSync(valid.output));
        const receipt = parseJsonStrict(source);
        const resolverReport = parseJsonStrict(valid.result.stdout);
        let snapshotIndexValidation;
        try {
            snapshotIndexValidation = validateConsumerRootSnapshotIndex(resolverReport.snapshot_index, receipt, {
                ignoredDirectoryNames: universe.discovery.bounds.ignored_directory_names,
            });
        } catch (error) {
            failures.push(`valid root snapshot index rejected: ${error.message}`);
        }
        if (source !== `${canonicalize(receipt)}\n`) failures.push("receipt is not serialized as exact JCS plus newline");
        const preimage = clone(receipt);
        delete preimage.receipt_hash;
        if (receipt.receipt_hash !== sha256(canonicalize(preimage))) failures.push("receipt self-hash does not bind its JCS preimage");
        if (!receipt.resolvable || receipt.blockers.length !== 0) failures.push("valid universe did not resolve for C05");
        if (receipt.roots.length !== 5 || receipt.edges.length !== universe.edges.length
            || receipt.counts.observations !== universe.edges.length) {
            failures.push("valid receipt lost a root, semantic edge, or occurrence observation");
        }
        const expectedSyntaxLocators = new Map([...expectedSyntaxProjection, ...expectedStylesProjection]
            .map(({ kind, specifier, locator }) => [`${kind}\0${specifier}`, locator]));
        for (const declared of syntaxEdges) {
            const edge = receipt.edges.find(({ id }) => id === declared.id);
            const expectedLocator = expectedSyntaxLocators.get(`${declared.kind}\0${declared.specifier}`);
            if (!edge || edge.specifier !== declared.specifier || edge.observations.length !== 1
                || edge.observations[0].locator !== expectedLocator) {
                failures.push(`end-to-end syntax edge lost its exact specifier or locator: ${declared.id}`);
            }
        }
        if (!receipt.epoch.epoch_sha256 || !receipt.epoch.observed_roots_sha256 || !receipt.epoch.observed_edges_sha256) {
            failures.push("valid receipt did not freeze the observed epoch");
        }
        const testBoundsPath = join(directory, "test-bounds-authority.json");
        const boundsManifest = {
            schema: "vnext-consumer-universe-bounds-fixture/1",
            purpose: "Isolated consumer-universe resolver and typed required-path selftest authority.",
            bounds: universe.discovery.bounds,
            bounds_sha256: sha256(canonicalize(universe.discovery.bounds)),
            manifest_hash: "",
        };
        const boundsPreimage = clone(boundsManifest);
        delete boundsPreimage.manifest_hash;
        boundsManifest.manifest_hash = sha256(canonicalize(boundsPreimage));
        writeFileSync(testBoundsPath, `${JSON.stringify(boundsManifest, null, 2)}\n`);
        try {
            const canonicalReceiptPath = realpathSync(valid.output);
            const boundsAuthority = {
                path: realpathSync(testBoundsPath),
                file_sha256: sha256(readFileSync(testBoundsPath)),
                manifest_hash: boundsManifest.manifest_hash,
            };
            fixtureReceiptValidationOptions = {
                boundsAuthority,
                boundsAuthorityVerificationPath: realpathSync(testBoundsPath),
                requireCanonicalBoundsAuthority: false,
                allowFixtureBoundsAuthority: true,
            };
            const verified = validateConsumerUniverseReceipt(canonicalReceiptPath, fixtureReceiptValidationOptions);
            const validatorWorktree = join(directory, "receipt-validator-worktree");
            git(demoRoot, ["worktree", "add", "--detach", "--force", validatorWorktree, "HEAD"]);
            const canonicalValidatorWorktree = realpathSync(validatorWorktree);
            try {
                try {
                    validateConsumerUniverseReceipt(canonicalReceiptPath, fixtureReceiptValidationOptions);
                    failures.push("receipt validation accepted an undeclared additional Git worktree");
                } catch (error) {
                    if (!error.message.includes("undeclared additional Git worktree")) {
                        failures.push(`undeclared additional worktree rejected for unexpected reason: ${error.message}`);
                    }
                }
                try {
                    validateConsumerUniverseReceipt(canonicalReceiptPath, {
                        ...fixtureReceiptValidationOptions,
                        allowedAdditionalWorktrees: [canonicalValidatorWorktree],
                    });
                } catch (error) {
                    failures.push(`exact validator-owned additional worktree was rejected: ${error.message}`);
                }
                try {
                    validateConsumerUniverseReceipt(canonicalReceiptPath, {
                        ...fixtureReceiptValidationOptions,
                        allowedAdditionalWorktrees: [realpathSync(repositories)],
                    });
                    failures.push("receipt validation accepted an allowed-worktree set that did not biject observed extras");
                } catch (error) {
                    if (!error.message.includes("undeclared additional Git worktree")) {
                        failures.push(`non-bijective allowed worktree rejected for unexpected reason: ${error.message}`);
                    }
                }
            } finally {
                git(demoRoot, ["worktree", "remove", "--force", canonicalValidatorWorktree]);
            }
            const immutableCapture = createImmutableCapture("valid", canonicalReceiptPath, verified);
            const annex = consumerUniverseAnnexProjection(
                "C00U",
                canonicalReceiptPath,
                verified,
                immutableCapture.reference,
                resolverReport.snapshot_index,
            );
            if (annex.receipt_hash !== receipt.receipt_hash || annex.roots_sha256.length !== 64 || annex.edges_sha256.length !== 64) {
                failures.push("typed consumer-universe return projection lost receipt identity");
            }
            immutableControl = {
                annex,
                boundsAuthority,
                canonicalReceiptPath,
                immutableCapture,
                inputPath: realpathSync(valid.input),
                receipt,
                snapshotIndex: resolverReport.snapshot_index,
                snapshotIndexValidation,
                testBoundsPath: realpathSync(testBoundsPath),
            };
            const returnSchema = parseJsonStrict(readFileSync(resolve(new URL("../return.schema.json", import.meta.url).pathname)));
            const annexErrors = validateJsonSchema(
                { ...annex, baseline: { applicability: "not_applicable", reason: "C00U is the first census" } },
                returnSchema.$defs.consumerUniverseAnnex,
                returnSchema,
            );
            if (annexErrors.length) failures.push(`typed consumer-universe annex schema rejected its canonical projection: ${annexErrors.join("; ")}`);
            const delta = consumerUniverseDelta(
                [{ id: "changed", value: 1 }, { id: "removed", value: 1 }],
                [{ id: "added", value: 1 }, { id: "changed", value: 2 }],
            );
            if (canonicalize(delta.map(({ id, change }) => ({ id, change }))) !== canonicalize([
                { id: "added", change: "added" },
                { id: "changed", change: "changed" },
                { id: "removed", change: "removed" },
            ])) failures.push("consumer-universe delta did not exactly classify added/changed/removed identities");

            const expectReceiptRejected = (name, mutate, fragment) => {
                const forged = clone(receipt);
                mutate(forged);
                const epochPreimage = clone(forged.epoch);
                delete epochPreimage.epoch_sha256;
                forged.epoch.epoch_sha256 = sha256(canonicalize(epochPreimage));
                const receiptPreimage = clone(forged);
                delete receiptPreimage.receipt_hash;
                forged.receipt_hash = sha256(canonicalize(receiptPreimage));
                const path = join(directory, `${name}-forged-receipt.json`);
                writeFileSync(path, `${canonicalize(forged)}\n`);
                try {
                    validateConsumerUniverseReceipt(realpathSync(path), {
                        boundsAuthority,
                        boundsAuthorityVerificationPath: realpathSync(testBoundsPath),
                        requireCanonicalBoundsAuthority: false,
                        allowFixtureBoundsAuthority: true,
                    });
                    failures.push(`${name} forged receipt was accepted`);
                } catch (error) {
                    if (!error.message.includes(fragment)) failures.push(`${name} rejected for ${error.message}; expected ${fragment}`);
                }
            };
            expectReceiptRejected("removed-root-rehashed", (forged) => {
                forged.roots.pop();
                forged.counts.roots -= 1;
                forged.counts.included_roots -= 1;
                forged.epoch.observed_roots_sha256 = sha256(canonicalize(forged.roots));
            }, "exact input disposition projection");
            expectReceiptRejected("omitted-edge-rehashed", (forged) => {
                const removed = forged.edges.pop();
                forged.counts.edges -= 1;
                forged.counts.included_edges -= 1;
                forged.counts.observations -= removed.observations.length;
                forged.epoch.observed_edges_sha256 = sha256(canonicalize(forged.edges));
            }, "exact input edge projection");
            expectReceiptRejected("edge-disposition-forged", (forged) => {
                forged.edges[0].status = "excluded";
                forged.edges[0].reason = "forged exclusion";
                forged.counts.included_edges -= 1;
                forged.counts.excluded_edges += 1;
                forged.epoch.observed_edges_sha256 = sha256(canonicalize(forged.edges));
            }, "disposition projection drift");
            expectReceiptRejected("observation-coverage-forged", (forged) => {
                forged.edges[0].observations = [];
                forged.edges[0].observations_sha256 = sha256(canonicalize([]));
                forged.counts.observations -= 1;
                forged.epoch.observed_edges_sha256 = sha256(canonicalize(forged.edges));
            }, "evidence/observation path coverage");
            expectReceiptRejected("blocker-projection-forged", (forged) => {
                forged.resolvable = false;
                forged.blockers = ["root:value:unavailable:C00U:forged"];
            }, "blockers are not the exact");
            expectReceiptRejected("observed-root-epoch-forged", (forged) => {
                forged.epoch.observed_roots_sha256 = "0".repeat(64);
            }, "observed root epoch hash drift");
            try {
                validateConsumerUniverseReceipt(canonicalReceiptPath, { boundsAuthority });
                failures.push("alternate live bounds authority was accepted without authenticated mapping");
            } catch (error) {
                if (!error.message.includes("live consumer-universe bounds authority")) failures.push(`alternate live authority rejected for unexpected reason: ${error.message}`);
            }
            try {
                validateConsumerUniverseReceipt(canonicalReceiptPath, { boundsAuthority });
                failures.push("alternate plain-offline bounds authority was accepted without an immutable mapping");
            } catch (error) {
                if (!error.message.includes("live consumer-universe bounds authority")) {
                    failures.push(`alternate plain-offline authority rejected for unexpected reason: ${error.message}`);
                }
            }
            try {
                validateConsumerUniverseReceipt(canonicalReceiptPath, {
                    boundsAuthority: { ...boundsAuthority, file_sha256: "0".repeat(64) },
                    boundsAuthorityVerificationPath: realpathSync(testBoundsPath),
                    requireCanonicalBoundsAuthority: false,
                });
                failures.push("forged bounds authority file hash was accepted");
            } catch (error) {
                if (!error.message.includes("file hash drift")) failures.push(`forged authority file hash rejected for unexpected reason: ${error.message}`);
            }
            const changedAuthority = clone(boundsManifest);
            changedAuthority.purpose = "recomputed authority manifest with changed bytes";
            const changedAuthorityPreimage = clone(changedAuthority);
            delete changedAuthorityPreimage.manifest_hash;
            changedAuthority.manifest_hash = sha256(canonicalize(changedAuthorityPreimage));
            const changedAuthorityPath = join(directory, "changed-bounds-authority.json");
            writeFileSync(changedAuthorityPath, `${canonicalize(changedAuthority)}\n`);
            const canonicalChangedAuthorityPath = realpathSync(changedAuthorityPath);
            const changedFileSha256 = sha256(readFileSync(canonicalChangedAuthorityPath));
            try {
                validateConsumerBoundsAuthority(
                    { ...boundsAuthority, file_sha256: changedFileSha256 },
                    { verificationPath: canonicalChangedAuthorityPath, requireCanonicalPath: false, allowFixtureProfile: true },
                );
                failures.push("authority-file-sha-updated-manifest-binding-stale was accepted");
            } catch (error) {
                if (!error.message.includes("manifest hash drift")) {
                    failures.push(`authority-file-sha-updated-manifest-binding-stale rejected for ${error.message}`);
                }
            }
            try {
                validateConsumerBoundsAuthority(
                    boundsAuthority,
                    { verificationPath: canonicalChangedAuthorityPath, requireCanonicalPath: false, allowFixtureProfile: true },
                );
                failures.push("authority-manifest-recomputed-annex-binding-stale was accepted");
            } catch (error) {
                if (!error.message.includes("file hash drift")) {
                    failures.push(`authority-manifest-recomputed-annex-binding-stale rejected for ${error.message}`);
                }
            }
        } catch (error) {
            failures.push(`typed consumer-universe return verification rejected valid receipt: ${error.message}`);
        }
        if (snapshotIndexValidation) {
            const rootByteTotals = snapshotIndexValidation.index.roots.map(({ total_bytes: totalBytes }) => totalBytes);
            const aggregateBytes = rootByteTotals.reduce((total, value) => total + value, 0);
            const largestRootBytes = Math.max(...rootByteTotals);
            if (aggregateBytes <= largestRootBytes || largestRootBytes < 1) {
                failures.push("snapshot fixture cannot exercise the whole-universe aggregate byte bound");
            } else {
                const aggregateBound = clone(universe);
                aggregateBound.discovery.bounds.max_snapshot_bytes = largestRootBytes;
                expectRejected(
                    "aggregate-snapshot-byte-bound",
                    aggregateBound,
                    "exceeds max_snapshot_bytes",
                );
            }
        }
    }

    const canonicalOrder = clone(universe);
    const rootIds = new Map([["value", "a_"], ["keyframes", "a-"]]);
    canonicalOrder.discovery.bounds.edge_scope = canonicalOrder.discovery.bounds.edge_scope.map((scope) => ({
        ...scope,
        target: rootIds.get(scope.target) ?? scope.target,
    }));
    canonicalOrder.discovery.bounds.required_roots = canonicalOrder.discovery.bounds.required_roots.map((required) => ({
        ...required,
        id: rootIds.get(required.id) ?? required.id,
    }));
    canonicalOrder.discovery.bounds.required_paths = canonicalOrder.discovery.bounds.required_paths.map((required) => ({
        ...required,
        id: required.id === "keyframes/src" ? "a-/src" : required.id,
        repository_root_id: rootIds.get(required.repository_root_id) ?? required.repository_root_id,
    }));
    canonicalOrder.roots = canonicalOrder.roots
        .map((root) => ({ ...root, id: rootIds.get(root.id) ?? root.id }))
        .reverse();
    const mixedEdgeIds = universe.edges.map((_, index) => index === 0
        ? "a-.manifest"
        : index === 1
            ? "a_:runtime"
            : `edge.${String(index).padStart(2, "0")}:fixture`);
    canonicalOrder.edges = canonicalOrder.edges
        .map((edge, index) => ({
            ...edge,
            id: mixedEdgeIds[index],
            source: rootIds.get(edge.source) ?? edge.source,
            target: rootIds.get(edge.target) ?? edge.target,
        }))
        .reverse();
    const canonicalOrderRun = run("canonical-order", canonicalOrder);
    if (canonicalOrderRun.result.status !== 0) {
        failures.push(`mixed-punctuation universe rejected: ${canonicalOrderRun.result.stderr}`);
    } else {
        const receipt = parseJsonStrict(readFileSync(canonicalOrderRun.output));
        const ids = receipt.roots.map(({ id }) => id);
        if (canonicalize(ids) !== canonicalize([...ids].sort(compareCanonicalText))) {
            failures.push("consumer roots are not in canonical text order");
        }
    if (canonicalize(receipt.edges.map(({ id }) => id))
            !== canonicalize([...mixedEdgeIds].sort(compareCanonicalText))) {
            failures.push("consumer edges are not in canonical text order");
        }
    }

    const expectSyntaxRejected = (name, source, fragment = "bounded static import projection rejected") => {
        const candidatePath = join(demoRoot, "src", `${name}.ts`);
        writeFileSync(candidatePath, `${source}\n`);
        try {
            const candidate = clone(universe);
            Object.assign(candidate.roots.find(({ id }) => id === "keyframes"), identity(demoRoot));
            const execution = run(name, candidate);
            if (execution.result.status === 0 || !execution.result.stderr.includes(fragment)) {
                failures.push(`${name} candidate syntax was not rejected with ${JSON.stringify(fragment)}; status=${execution.result.status}; stderr=${execution.result.stderr}`);
            }
            if (existsSync(execution.output)) {
                const emitted = parseJsonStrict(readFileSync(execution.output));
                if (emitted.resolvable === true) failures.push(`${name} unsupported candidate syntax produced a resolvable receipt`);
            }
        } finally {
            rmSync(candidatePath, { force: true });
        }
    };
    expectSyntaxRejected("computed-dynamic-import", 'const packageName = "@mkbabb/value.js"; import(packageName);');
    expectSyntaxRejected("substituted-template-import", 'const suffix = "computed"; import(`@mkbabb/value.js/${suffix}`);');
    expectSyntaxRejected("unsupported-import-options", 'import("@mkbabb/value.js/options", { with: options });');
    expectSyntaxRejected("ambiguous-import-assignment", 'import Value = require("@mkbabb/value.js");');
    expectSyntaxRejected("template-static-import", 'import `@mkbabb/value.js/template-static`;');

    const duplicateRealpath = clone(universe);
    duplicateRealpath.roots[1].canonical_realpath = duplicateRealpath.roots[0].canonical_realpath;
    expectRejected("duplicate-realpath", duplicateRealpath, "duplicate canonical realpath");

    const unknownOwner = clone(universe);
    unknownOwner.roots[0].disposition.owner_wave = "C99";
    expectRejected("unknown-owner", unknownOwner, "unknown canonical wave owner C99");

    const unknownEdgeOwner = clone(universe);
    unknownEdgeOwner.edges[0].owner_wave = "C98";
    expectRejected("unknown-edge-owner", unknownEdgeOwner, "unknown canonical wave owner C98");

    const incompleteDiscovery = clone(universe);
    incompleteDiscovery.discovery.methods = incompleteDiscovery.discovery.methods.filter((method) => method !== "css");
    expectRejected("incomplete-discovery", incompleteDiscovery, "schema failure");

    const missingRequiredRoot = clone(universe);
    missingRequiredRoot.roots = missingRequiredRoot.roots.filter(({ id }) => id !== "bbnf-lang");
    expectRejected("missing-required-consumer-root", missingRequiredRoot, "required consumer root identity missing: bbnf-lang");

    const presentUnavailableRoot = clone(universe);
    presentUnavailableRoot.roots.find(({ id }) => id === "bbnf-lang").disposition = {
        status: "unavailable",
        reason: "hostile unavailable claim for a mounted checkout",
        evidence: [scanEvidence],
        retrigger: { wave_id: "C00U", condition: "the checkout is genuinely absent and discovery is repeated" },
    };
    expectRejected("present-root-declared-unavailable", presentUnavailableRoot, "exists and must be observed");

    const forgedUnavailablePath = clone(presentUnavailableRoot);
    forgedUnavailablePath.roots.find(({ id }) => id === "bbnf-lang").path = join(repositories, "missing-bbnf-path");
    expectRejected("forged-missing-root-path", forgedUnavailablePath, "must use its declared canonical path");

    const excludedRequiredRoot = clone(universe);
    excludedRequiredRoot.roots.find(({ id }) => id === "bbnf-lang").disposition = {
        status: "excluded",
        reason: "hostile attempt to exclude a mandatory consumer identity",
        evidence: [bbnfEvidence],
    };
    expectRejected("excluded-required-consumer-root", excludedRequiredRoot, "required consumer root bbnf-lang cannot be excluded");

    const missingRequiredPath = clone(universe);
    missingRequiredPath.discovery.bounds.required_paths[0].path = join(realpathSync(demoRoot), "missing-src");
    missingRequiredPath.discovery.bounds.required_paths[0].canonical_realpath = join(realpathSync(demoRoot), "missing-src");
    missingRequiredPath.discovery.bounds.required_paths[0].relative_path = "missing-src";
    expectRejected("missing-required-consumer-path", missingRequiredPath, "required consumer path is unavailable: keyframes/src");

    const escapingRequiredPath = clone(universe);
    escapingRequiredPath.discovery.bounds.required_paths[0].relative_path = "../value";
    escapingRequiredPath.discovery.bounds.required_paths[0].path = valueRoot;
    escapingRequiredPath.discovery.bounds.required_paths[0].canonical_realpath = realpathSync(valueRoot);
    expectRejected("escaping-required-consumer-path", escapingRequiredPath, "schema failure");

    const quarantineNotExcluded = clone(universe);
    quarantineNotExcluded.discovery.bounds.ignored_directory_names = quarantineNotExcluded.discovery.bounds.ignored_directory_names
        .filter((name) => name !== "r1-opus-refuted");
    expectRejected("quarantine-traversal-not-excluded", quarantineNotExcluded, "schema failure");

    const proofRunnerNotExcluded = clone(universe);
    proofRunnerNotExcluded.discovery.bounds.ignored_directory_names = proofRunnerNotExcluded.discovery.bounds.ignored_directory_names
        .filter((name) => name !== ".vnext");
    expectRejected("proof-runner-infrastructure-not-excluded", proofRunnerNotExcluded, "schema failure");

    const trancheCorpusNotExcluded = clone(universe);
    trancheCorpusNotExcluded.discovery.bounds.ignored_directory_names = trancheCorpusNotExcluded.discovery.bounds.ignored_directory_names
        .filter((name) => name !== "tranches");
    expectRejected("formation-tranche-corpus-not-excluded", trancheCorpusNotExcluded, "schema failure");

    const missingKind = clone(universe);
    missingKind.discovery.bounds.edge_scope[0].kinds = missingKind.discovery.bounds.edge_scope[0].kinds.filter((kind) => kind !== "lock");
    expectRejected("kind-level-omission", missingKind, "kind-level omissions are forbidden");

    const invalidExclusion = clone(universe);
    invalidExclusion.roots[1].disposition = { status: "excluded", evidence: [demoEvidence] };
    invalidExclusion.edges.forEach((edge) => {
        edge.disposition = { status: "excluded", reason: "source no longer active", evidence: edge.evidence };
    });
    expectRejected("missing-exclusion-reason", invalidExclusion, "schema failure");

    const badEvidence = clone(universe);
    badEvidence.edges[0].evidence[0].sha256 = "0".repeat(64);
    expectRejected("bad-evidence", badEvidence, "evidence 1 hash");

    const forgedHead = clone(universe);
    forgedHead.roots[0].head = "0".repeat(40);
    expectRejected("forged-git-identity", forgedHead, "forged Git head");

    const copiedIdentity = clone(universe);
    copiedIdentity.roots[0].branch = copiedIdentity.roots[4].branch;
    copiedIdentity.roots[0].head = copiedIdentity.roots[4].head;
    copiedIdentity.roots[0].dirty_sha256 = copiedIdentity.roots[4].dirty_sha256;
    expectRejected("copied-primary-git-identity", copiedIdentity, "forged Git branch");

    const forgedBranch = clone(universe);
    forgedBranch.roots[0].branch = "invented";
    expectRejected("forged-git-branch", forgedBranch, "forged Git branch");

    const forgedDirty = clone(universe);
    forgedDirty.roots[0].dirty_sha256 = sha256("fixture-clean");
    expectRejected("forged-dirty-digest", forgedDirty, "forged Git dirty_sha256");

    const duplicateTuple = clone(universe);
    duplicateTuple.edges.push({ ...clone(duplicateTuple.edges[1]), id: "value-demo:value-runtime-copy" });
    expectRejected("duplicate-semantic-tuple", duplicateTuple, "duplicate semantic edge tuple");

    const unjustifiedUnavailableEdge = clone(universe);
    unjustifiedUnavailableEdge.edges[1].disposition = {
        status: "unavailable",
        reason: "hostile unavailable claim while both endpoints are mounted",
        evidence: [scanEvidence],
        retrigger: { wave_id: "C00U", condition: "an endpoint actually becomes unavailable" },
    };
    expectRejected("unavailable-edge-with-available-endpoints", unjustifiedUnavailableEdge, "can be unavailable only when its source or internal target is unavailable");

    const includedEdgeToExcludedTarget = clone(universe);
    includedEdgeToExcludedTarget.discovery.bounds.required_roots = includedEdgeToExcludedTarget.discovery.bounds.required_roots
        .filter(({ id }) => id !== "value");
    includedEdgeToExcludedTarget.roots.find(({ id }) => id === "value").disposition = {
        status: "excluded",
        reason: "non-required target is explicitly outside this fixture scenario",
        evidence: [valueEvidence],
    };
    expectRejected("included-edge-to-excluded-target", includedEdgeToExcludedTarget, "ends at non-included root value");

    const duplicatePackageScopeLast = clone(universe);
    duplicatePackageScopeLast.discovery.bounds.edge_scope.push({
        package: "@mkbabb/value.js",
        target: "keyframes",
        kinds,
    });
    expectRejected("duplicate-package-scope-last", duplicatePackageScopeLast, "duplicate package edge scope @mkbabb/value.js");

    const duplicatePackageScopeFirst = clone(universe);
    duplicatePackageScopeFirst.discovery.bounds.edge_scope.unshift({
        package: "@mkbabb/value.js",
        target: "keyframes",
        kinds,
    });
    expectRejected("duplicate-package-scope-first", duplicatePackageScopeFirst, "duplicate package edge scope @mkbabb/value.js");

    const omittedEdge = clone(universe);
    omittedEdge.edges = omittedEdge.edges.filter((edge) => edge.kind !== "runtime");
    expectRejected("omitted-edge", omittedEdge, "bounded scan found omitted in-scope edge");

    const omittedTemplateDynamic = clone(universe);
    omittedTemplateDynamic.edges = omittedTemplateDynamic.edges
        .filter(({ id }) => id !== "keyframes:value-dynamic-template");
    expectRejected("omitted-zero-template-dynamic-edge", omittedTemplateDynamic, "bounded scan found omitted in-scope edge");

    const misclassifiedInlineType = clone(universe);
    misclassifiedInlineType.edges.find(({ id }) => id === "keyframes:value-inline-import-type").kind = "runtime";
    expectRejected("inline-type-misclassified-as-runtime", misclassifiedInlineType, "bounded scan found omitted in-scope edge");

    const omittedLockEdge = clone(universe);
    omittedLockEdge.edges = omittedLockEdge.edges.filter((edge) => edge.id !== "keyframes:value-lock-declaration");
    expectRejected("omitted-lock-edge", omittedLockEdge, "bounded scan found omitted in-scope edge");

    const omittedTransitiveEdge = clone(universe);
    omittedTransitiveEdge.edges = omittedTransitiveEdge.edges.filter((edge) => edge.id !== "keyframes:parse-transitive");
    expectRejected("omitted-transitive-edge", omittedTransitiveEdge, "bounded scan found omitted in-scope edge");

    const forgedLockKind = clone(universe);
    forgedLockKind.edges.find((edge) => edge.id === "keyframes:parse-lock-installed").kind = "transitive";
    expectRejected("forged-lock-kind", forgedLockKind, "bounded scan found omitted in-scope edge");

    const unprovedEdge = clone(universe);
    unprovedEdge.edges.push({
        ...clone(unprovedEdge.edges[1]),
        id: "value-demo:value-runtime-unproved",
        specifier: "@mkbabb/value.js/unproved",
    });
    expectRejected("unproved-edge", unprovedEdge, "unproved by the bounded scan");

    const genericEdgeEvidence = clone(universe);
    genericEdgeEvidence.edges[1].evidence = [scanEvidence];
    expectRejected("generic-edge-evidence", genericEdgeEvidence, "escapes source root");

    const thirdRoot = initializeRepository("omitted", {
        "README.md": "omitted fixture\n",
        "package.json": '{"name":"omitted-consumer","version":"1.0.0"}\n',
    });
    expectRejected("omitted-root", clone(universe), "omitted in-scope root exists");
    rmSync(thirdRoot, { recursive: true, force: true });

    const externalMismatch = clone(universe);
    externalMismatch.discovery.bounds.edge_scope.find(({ package: name }) => name === "@mkbabb/value.js").target = "external:@other/package";
    externalMismatch.edges.forEach((edge) => { edge.target = "external:@other/package"; });
    expectRejected("external-mismatch", externalMismatch, "external target must be exactly");

    const offlineBbnfPath = join(directory, "offline-bbnf-lang");
    const offlineRequiredPath = join(directory, "offline-keyframes-src");
    renameSync(bbnfRoot, offlineBbnfPath);
    renameSync(join(demoRoot, "src"), offlineRequiredPath);
    try {
        const unrelatedUnavailableOwner = clone(universe);
        const unavailableBbnf = unrelatedUnavailableOwner.roots.find(({ id }) => id === "bbnf-lang");
        unavailableBbnf.provenance = {
            origins: observed(["https://example.invalid/bbnf-lang.git"], scanEvidence),
            worktrees: observed([bbnfRoot], scanEvidence),
            deploy_roots: observed([], scanEvidence),
        };
        unavailableBbnf.disposition = {
            status: "unavailable",
            reason: "unrelated required root is offline",
            evidence: [scanEvidence],
            retrigger: { wave_id: "C00U", condition: "the unrelated checkout is mounted and discovery is repeated" },
        };
        Object.assign(unrelatedUnavailableOwner.roots.find(({ id }) => id === "keyframes"), identity(demoRoot));
        expectRejected("required-path-not-skipped-for-unrelated-unavailable-root", unrelatedUnavailableOwner, "required consumer path is unavailable: keyframes/src");
    } finally {
        renameSync(offlineRequiredPath, join(demoRoot, "src"));
        renameSync(offlineBbnfPath, bbnfRoot);
    }

    const stale = clone(universe);
    refreshEpoch(stale, 10 * 60 * 1000);
    const staleInput = join(directory, "stale-input.json");
    const staleOutput = join(directory, "stale-receipt.json");
    writeFileSync(staleInput, `${JSON.stringify(finalize(stale), null, 2)}\n`);
    const staleResult = executeResolver(
        staleInput,
        staleOutput,
        join(directory, "stale-snapshot-store"),
        join(directory, "stale-snapshot-index.json"),
    );
    if (staleResult.status === 0 || !staleResult.stderr.includes("observation is stale")) failures.push("stale discovery epoch was not rejected");

    const duplicateJsonInput = join(directory, "duplicate-json-input.json");
    const duplicateJsonOutput = join(directory, "duplicate-json-receipt.json");
    writeFileSync(duplicateJsonInput, '{"schema":"vnext-consumer-universe/2","schema":"vnext-consumer-universe/2"}\n');
    const duplicateJsonResult = executeResolver(
        duplicateJsonInput,
        duplicateJsonOutput,
        join(directory, "duplicate-json-snapshot-store"),
        join(directory, "duplicate-json-snapshot-index.json"),
    );
    if (duplicateJsonResult.status === 0 || !duplicateJsonResult.stderr.includes("duplicate object key")) {
        failures.push("duplicate JSON key was not rejected");
    }

    const offlineValuePath = join(directory, "offline-value");
    renameSync(valueRoot, offlineValuePath);
    try {
        const targetUnavailableUniverse = clone(universe);
        const unavailableTarget = targetUnavailableUniverse.roots.find(({ id }) => id === "value");
        unavailableTarget.provenance = {
            origins: observed(["https://example.invalid/value.git"], scanEvidence),
            worktrees: observed([valueRoot], scanEvidence),
            deploy_roots: observed([], scanEvidence),
        };
        unavailableTarget.disposition = {
            status: "unavailable",
            reason: "internal target checkout is offline",
            evidence: [scanEvidence],
            retrigger: { wave_id: "C00U", condition: "the target checkout is mounted and incoming edges are rescanned" },
        };
        const incomingEdges = targetUnavailableUniverse.edges.filter(({ target }) => target === "value");
        for (const edge of incomingEdges) {
            edge.disposition = {
                status: "unavailable",
                reason: "available source currently resolves to an unavailable internal target",
                evidence: [scanEvidence],
                retrigger: { wave_id: "C00U", condition: "the target checkout is mounted and this source occurrence is rescanned" },
            };
        }

        const invalidIncomingDisposition = clone(targetUnavailableUniverse);
        invalidIncomingDisposition.edges.find(({ target }) => target === "value").disposition = { status: "included" };
        expectRejected(
            "available-source-included-edge-to-unavailable-target",
            invalidIncomingDisposition,
            "from an available source to unavailable target value must itself be unavailable",
        );

        const targetUnavailableRun = run("available-source-unavailable-target", targetUnavailableUniverse);
        if (targetUnavailableRun.result.status !== 2 || !existsSync(targetUnavailableRun.output)) {
            failures.push(`available-source/unavailable-target universe did not persist exit-2 receipt: status=${targetUnavailableRun.result.status}; stderr=${targetUnavailableRun.result.stderr}`);
        } else {
            const receipt = parseJsonStrict(readFileSync(targetUnavailableRun.output));
            const unavailableReceiptEdges = receipt.edges.filter(({ target }) => target === "value");
            if (receipt.resolvable || unavailableReceiptEdges.length !== incomingEdges.length
                || unavailableReceiptEdges.some((edge) => edge.status !== "unavailable" || edge.observations.length === 0
                    || edge.retrigger_wave !== "C00U"
                    || edge.condition !== "the target checkout is mounted and this source occurrence is rescanned")) {
                failures.push("available-source/unavailable-target receipt lost observations, retrigger, or blocking disposition");
            }
            for (const edge of unavailableReceiptEdges) {
                if (!receipt.blockers.includes(`edge:${edge.id}:unavailable:C00U:the target checkout is mounted and this source occurrence is rescanned`)) {
                    failures.push(`available-source/unavailable-target receipt lost blocker ${edge.id}`);
                }
            }
            if (!fixtureReceiptValidationOptions) {
                failures.push("blocking receipt tests lack fixture authority validation options");
            } else {
                try {
                    validateConsumerBoundsAuthority(fixtureReceiptValidationOptions.boundsAuthority, {
                        verificationPath: fixtureReceiptValidationOptions.boundsAuthorityVerificationPath,
                        requireCanonicalPath: false,
                        allowFixtureProfile: true,
                    });
                } catch (error) {
                    failures.push(`immutable bounds authority rejected an absent disposition-aware required root: ${error.message}`);
                }
                try {
                    validateConsumerUniverseReceipt(realpathSync(targetUnavailableRun.output), {
                        ...fixtureReceiptValidationOptions,
                        requireResolvable: false,
                    });
                } catch (error) {
                    failures.push(`requireResolvable:false rejected available-source/unavailable-target receipt: ${error.message}`);
                }
                try {
                    validateConsumerUniverseReceipt(realpathSync(targetUnavailableRun.output), fixtureReceiptValidationOptions);
                    failures.push("default receipt validation accepted a blocking unavailable-target receipt");
                } catch (error) {
                    if (!error.message.includes("blocking, not dependency green")) {
                        failures.push(`default blocking receipt rejection drifted: ${error.message}`);
                    }
                }

                const forged = clone(receipt);
                const forgedEdge = forged.edges.find(({ target }) => target === "value");
                const removedObservations = forgedEdge.observations.length;
                forgedEdge.observations = [];
                forgedEdge.observations_sha256 = sha256(canonicalize([]));
                forged.counts.observations -= removedObservations;
                forged.epoch.observed_edges_sha256 = sha256(canonicalize(forged.edges));
                const forgedEpochPreimage = clone(forged.epoch);
                delete forgedEpochPreimage.epoch_sha256;
                forged.epoch.epoch_sha256 = sha256(canonicalize(forgedEpochPreimage));
                const forgedReceiptPreimage = clone(forged);
                delete forgedReceiptPreimage.receipt_hash;
                forged.receipt_hash = sha256(canonicalize(forgedReceiptPreimage));
                const forgedPath = join(directory, "unavailable-target-observations-forged.json");
                writeFileSync(forgedPath, `${canonicalize(forged)}\n`);
                try {
                    validateConsumerUniverseReceipt(realpathSync(forgedPath), {
                        ...fixtureReceiptValidationOptions,
                        requireResolvable: false,
                    });
                    failures.push("receipt validation accepted removed observations for an unavailable incoming target edge");
                } catch (error) {
                    if (!error.message.includes("evidence/observation path coverage")) {
                        failures.push(`unavailable incoming observation forgery rejected for unexpected reason: ${error.message}`);
                    }
                }
            }
        }
    } finally {
        renameSync(offlineValuePath, valueRoot);
    }

    if (!immutableControl || !fixtureReceiptValidationOptions) {
        failures.push("immutable receipt controls lacked a valid authenticated baseline");
    } else {
        const {
            canonicalReceiptPath,
            immutableCapture,
            receipt,
            snapshotIndex,
            snapshotIndexValidation,
        } = immutableControl;
        const immutableOptions = {
            validationMode: "immutable",
            immutableCapture: immutableCapture.reference,
            allowFixtureBoundsAuthority: true,
        };

        const replayOutput = join(directory, "physical-store-replay-receipt.json");
        const replayResult = executeResolver(
            receipt.input.path,
            replayOutput,
            join(directory, "physical-store-replay-snapshot-store"),
            join(directory, "physical-store-replay-snapshot-index.json"),
        );
        if (replayResult.status !== 0) {
            failures.push(`same-input physical snapshot-store replay failed: ${replayResult.stderr}`);
        } else {
            const replayReceipt = parseJsonStrict(readFileSync(replayOutput));
            const semanticProjection = (candidate) => {
                const projected = clone(candidate);
                delete projected.resolved_at;
                delete projected.receipt_hash;
                delete projected.epoch.started_at;
                delete projected.epoch.completed_at;
                delete projected.epoch.epoch_sha256;
                return projected;
            };
            if (canonicalize(semanticProjection(receipt)) !== canonicalize(semanticProjection(replayReceipt))) {
                failures.push("semantic receipt projection changed across distinct physical snapshot stores");
            }
            const receiptSnapshots = receipt.roots.map(({ id, content_snapshot }) => ({ id, content_snapshot }));
            const replaySnapshots = replayReceipt.roots.map(({ id, content_snapshot }) => ({ id, content_snapshot }));
            if (canonicalize(receiptSnapshots) !== canonicalize(replaySnapshots)) {
                failures.push("locator-free content snapshots changed across distinct physical snapshot stores");
            }
        }

        const outputInsideRoot = executeResolver(
            receipt.input.path,
            join(valueRoot, "forbidden-generated-receipt.json"),
            join(directory, "output-in-root-snapshot-store"),
            join(directory, "output-in-root-snapshot-index.json"),
        );
        if (outputInsideRoot.status === 0 || !outputInsideRoot.stderr.includes("receipt output must be disjoint")) {
            failures.push(`receipt output inside a measured root was not rejected: ${outputInsideRoot.stderr}`);
        }
        const indexInsideRoot = executeResolver(
            receipt.input.path,
            join(directory, "index-in-root-receipt.json"),
            join(directory, "index-in-root-snapshot-store"),
            join(valueRoot, "forbidden-snapshot-index.json"),
        );
        if (indexInsideRoot.status === 0 || !indexInsideRoot.stderr.includes("snapshot index must be disjoint")) {
            failures.push(`snapshot index inside a measured root was not rejected: ${indexInsideRoot.stderr}`);
        }

        const expectSnapshotRejected = (name, candidateReceipt, reference = snapshotIndex, options = {}) => {
            try {
                validateConsumerRootSnapshotIndex(reference, candidateReceipt, {
                    ignoredDirectoryNames: universe.discovery.bounds.ignored_directory_names,
                    ...options,
                });
                failures.push(`${name} snapshot corruption was accepted`);
            } catch {
                // Expected fail-closed control.
            }
        };
        const missingReceiptSnapshot = clone(receipt);
        delete missingReceiptSnapshot.roots[0].content_snapshot;
        expectSnapshotRejected("missing included receipt mapping", missingReceiptSnapshot);
        const unavailableReceiptSnapshot = clone(receipt);
        unavailableReceiptSnapshot.roots[0].status = "unavailable";
        delete unavailableReceiptSnapshot.roots[0].content_snapshot;
        expectSnapshotRejected("unavailable receipt with index mapping", unavailableReceiptSnapshot);
        const extraReceiptSnapshot = clone(receipt);
        extraReceiptSnapshot.roots[0].status = "excluded";
        expectSnapshotRejected("non-included receipt content snapshot", extraReceiptSnapshot);

        if (snapshotIndexValidation) {
            const writeIndexCandidate = (name, mutate) => {
                const candidate = clone(snapshotIndexValidation.index);
                mutate(candidate);
                const preimage = clone(candidate);
                delete preimage.index_hash;
                candidate.index_hash = sha256(canonicalize(preimage));
                const path = join(directory, `${name}-snapshot-index.json`);
                writeFileSync(path, `${canonicalize(candidate)}\n`);
                return { path: realpathSync(path), file_sha256: sha256(readFileSync(path)), index_hash: candidate.index_hash };
            };
            expectSnapshotRejected("missing index mapping", receipt, writeIndexCandidate("missing-index-mapping", (candidate) => candidate.roots.pop()));
            expectSnapshotRejected("extra index mapping", receipt, writeIndexCandidate("extra-index-mapping", (candidate) => candidate.roots.push(clone(candidate.roots[0]))));

            const firstBinding = snapshotIndexValidation.index.roots[0];
            const corruptManifestPath = join(directory, "corrupt-snapshot-manifest.json");
            writeFileSync(corruptManifestPath, Buffer.concat([readFileSync(firstBinding.manifest_path), Buffer.from(" ")]));
            expectSnapshotRejected("corrupt snapshot manifest", receipt, snapshotIndex, {
                resolveRootSnapshot(binding) {
                    return {
                        manifestVerificationPath: binding.root_id === firstBinding.root_id ? realpathSync(corruptManifestPath) : binding.manifest_path,
                        blobDirectoryVerificationPath: binding.blob_directory,
                        schemaVerificationPath: snapshotIndexValidation.index.snapshot_schema_path,
                    };
                },
            });

            const corruptBlobDirectory = join(directory, "corrupt-snapshot-blobs");
            cpSync(firstBinding.blob_directory, corruptBlobDirectory, { recursive: true });
            const firstManifest = parseJsonStrict(readFileSync(firstBinding.manifest_path));
            writeFileSync(join(corruptBlobDirectory, firstManifest.files[0].blob_sha256), "corrupt snapshot blob\n");
            expectSnapshotRejected("corrupt snapshot blob", receipt, snapshotIndex, {
                resolveRootSnapshot(binding) {
                    return {
                        manifestVerificationPath: binding.manifest_path,
                        blobDirectoryVerificationPath: binding.root_id === firstBinding.root_id ? realpathSync(corruptBlobDirectory) : binding.blob_directory,
                        schemaVerificationPath: snapshotIndexValidation.index.snapshot_schema_path,
                    };
                },
            });

            const corruptSchemaPath = join(directory, "corrupt-snapshot-schema.json");
            writeFileSync(corruptSchemaPath, Buffer.concat([
                readFileSync(snapshotIndexValidation.index.snapshot_schema_path),
                Buffer.from(" "),
            ]));
            expectSnapshotRejected("corrupt snapshot schema", receipt, snapshotIndex, {
                resolveRootSnapshot(binding) {
                    return {
                        manifestVerificationPath: binding.manifest_path,
                        blobDirectoryVerificationPath: binding.blob_directory,
                        schemaVerificationPath: realpathSync(corruptSchemaPath),
                    };
                },
            });

            const corruptIndexPath = join(directory, "corrupt-snapshot-index.json");
            writeFileSync(corruptIndexPath, Buffer.concat([readFileSync(snapshotIndex.path), Buffer.from(" ")]));
            expectSnapshotRejected("corrupt snapshot index", receipt, snapshotIndex, {
                indexVerificationPath: realpathSync(corruptIndexPath),
            });
        }

        const advancePath = join(valueRoot, "immutable-epoch-advance.txt");
        writeFileSync(advancePath, "legitimate post-C00U root advance\n");
        git(valueRoot, ["add", "immutable-epoch-advance.txt"]);
        git(valueRoot, ["commit", "-m", "advance immutable receipt fixture"]);

        try {
            validateConsumerUniverseReceipt(canonicalReceiptPath, fixtureReceiptValidationOptions);
            failures.push("live validation accepted a receipt after its captured root HEAD advanced");
        } catch (error) {
            if (!error.message.includes("forged Git head")) {
                failures.push(`post-capture live root advance rejected for unexpected reason: ${error.message}`);
            }
        }
        try {
            validateConsumerUniverseReceipt(canonicalReceiptPath, immutableOptions);
        } catch (error) {
            failures.push(`external immutable capture rejected its frozen receipt after a live root advance: ${error.message}`);
        }
        try {
            validateConsumerUniverseReceipt(canonicalReceiptPath, {
                validationMode: "immutable",
                allowFixtureBoundsAuthority: true,
            });
            failures.push("immutable validation accepted a receipt without an external capture");
        } catch (error) {
            if (!error.message.includes("independently content-addressed external capture")) {
                failures.push(`capture-free immutable validation rejected for unexpected reason: ${error.message}`);
            }
        }
        try {
            validateConsumerUniverseReceipt(canonicalReceiptPath, {
                ...fixtureReceiptValidationOptions,
                requireFresh: false,
            });
            failures.push("legacy requireFresh receipt-validation mode remained accepted");
        } catch (error) {
            if (!error.message.includes("validation options fields must be exact")) {
                failures.push(`legacy requireFresh mode rejected for unexpected reason: ${error.message}`);
            }
        }
        try {
            validateConsumerUniverseReceipt(canonicalReceiptPath, {
                ...immutableOptions,
                allowedAdditionalWorktrees: [realpathSync(valueRoot)],
            });
            failures.push("immutable validation accepted a live worktree allowance");
        } catch (error) {
            if (!error.message.includes("cannot accept live additional-worktree allowances")) {
                failures.push(`immutable worktree allowance rejected for unexpected reason: ${error.message}`);
            }
        }
        try {
            validateConsumerUniverseReceipt(canonicalReceiptPath, {
                ...immutableOptions,
                immutableCapture: { ...immutableCapture.reference, file_sha256: "0".repeat(64) },
            });
            failures.push("immutable validation accepted a forged external capture reference");
        } catch (error) {
            if (!error.message.includes("material hash drift")) {
                failures.push(`forged immutable capture reference rejected for unexpected reason: ${error.message}`);
            }
        }

        const validatorTranche = join(directory, "immutable-current-drift-validator");
        cpSync(trancheRoot, validatorTranche, { recursive: true });
        symlinkSync(workspaceNodeModules, join(validatorTranche, "node_modules"), "dir");
        const copiedReturn = await import(pathToFileURL(join(validatorTranche, "tools", "consumer-universe-return.mjs")).href);
        for (const path of [
            join(validatorTranche, "tools", "resolve-consumer-universe.mjs"),
            join(validatorTranche, "consumer-universe.schema.json"),
            join(validatorTranche, "consumer-universe-receipt.schema.json"),
            join(validatorTranche, "CONSUMER-UNIVERSE-BOUNDS.json"),
        ]) writeFileSync(path, Buffer.concat([readFileSync(path), Buffer.from(" \n")]));
        try {
            copiedReturn.validateConsumerUniverseReceipt(canonicalReceiptPath, immutableOptions);
        } catch (error) {
            failures.push(`immutable capture consulted drifted current resolver/schema/authority bytes: ${error.message}`);
        }

        writeFileSync(join(valueRoot, "README.md"), "current evidence bytes advanced after the authenticated epoch\n");
        try {
            validateConsumerUniverseReceipt(canonicalReceiptPath, immutableOptions);
        } catch (error) {
            failures.push(`immutable validation consulted current evidence or Git dirty state: ${error.message}`);
        }
    }

    const unavailableUniverse = clone(universe);
    const advancedValueRoot = unavailableUniverse.roots.find(({ id }) => id === "value");
    const advancedValueEvidence = evidence(join(valueRoot, "README.md"), "value repository provenance after immutable-epoch control");
    Object.assign(advancedValueRoot, identity(valueRoot));
    for (const observedSet of Object.values(advancedValueRoot.provenance)) observedSet.evidence = [advancedValueEvidence];
    rmSync(demoRoot, { recursive: true, force: true });
    const unavailableRoot = unavailableUniverse.roots.find(({ id }) => id === "keyframes");
    unavailableRoot.provenance = {
        origins: observed(["https://example.invalid/keyframes.git"], scanEvidence),
        worktrees: observed([realpathSync(repositories) + "/keyframes"], scanEvidence),
        deploy_roots: observed([], scanEvidence),
    };
    unavailableRoot.disposition = {
        status: "unavailable",
        reason: "physical checkout is offline",
        evidence: [scanEvidence],
        retrigger: { wave_id: "C00U", condition: "checkout is mounted and the bounded scan is repeated" },
    };
    unavailableUniverse.edges.forEach((edge) => {
        edge.evidence = [scanEvidence];
        edge.disposition = {
            status: "unavailable",
            reason: "source root is offline",
            evidence: [scanEvidence],
            retrigger: { wave_id: "C00U", condition: "source root is mounted and the edge is rescanned" },
        };
    });
    const unavailableRun = run("unavailable-blocks", unavailableUniverse);
    if (unavailableRun.result.status !== 2) {
        failures.push(`unavailable universe exited ${unavailableRun.result.status}; expected blocking exit 2: ${unavailableRun.result.stderr}`);
    } else {
        const receipt = parseJsonStrict(readFileSync(unavailableRun.output));
        if (receipt.resolvable || receipt.blockers.length !== universe.edges.length + 1
            || receipt.counts.observations !== 0
            || receipt.edges.some((edge) => edge.status !== "unavailable" || edge.observations.length !== 0)) {
            failures.push("unavailable source root/edges did not produce a zero-observation typed blocking receipt");
        }
        if (fixtureReceiptValidationOptions) {
            try {
                validateConsumerUniverseReceipt(realpathSync(unavailableRun.output), {
                    ...fixtureReceiptValidationOptions,
                    requireResolvable: false,
                });
            } catch (error) {
                failures.push(`requireResolvable:false rejected unavailable-source receipt: ${error.message}`);
            }
            try {
                validateConsumerUniverseReceipt(realpathSync(unavailableRun.output), fixtureReceiptValidationOptions);
                failures.push("default receipt validation accepted a blocking unavailable-source receipt");
            } catch (error) {
                if (!error.message.includes("blocking, not dependency green")) {
                    failures.push(`default unavailable-source rejection drifted: ${error.message}`);
                }
            }
        }
    }
} finally {
    rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(`${JSON.stringify({
    schema: "vnext-consumer-universe-selftest/2",
    valid_real_git_receipts: 2,
    resolver_adversarial_rejections: 44,
    receipt_projection_adversarial_rejections: 11,
    unavailable_blocking_receipts: 2,
    syntax_projection_controls: 22,
    valid_return_annex_controls: 1,
    immutable_receipt_controls: 11,
})}\n`);
