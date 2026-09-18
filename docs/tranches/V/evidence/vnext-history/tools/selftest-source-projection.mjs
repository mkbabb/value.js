#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    mkdirSync,
    mkdtempSync,
    readFileSync,
    realpathSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { canonicalize } from "./json-contract.mjs";
import { resolveGitIdentity, staticImportProjection } from "./resolve-consumer-universe.mjs";

const resolver = resolve(new URL("resolve-consumer-universe.mjs", import.meta.url).pathname);
const directory = mkdtempSync(join(tmpdir(), "vnext-source-projection-"));
const repositories = join(directory, "repositories");
const repository = join(repositories, "consumer");
const failures = [];
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const clone = (value) => structuredClone(value);
const packageName = "@mkbabb/value.js";
const target = `external:${packageName}`;
const allKinds = ["css", "dynamic", "lock", "manifest", "peer", "runtime", "transitive", "type"];
const ignoredDirectories = [
    ".cache", ".git", ".next", ".nuxt", ".pnpm", ".turbo", ".venv", ".vnext", ".yarn",
    "__pycache__", "build", "coverage", "dist", "node_modules", "playwright-report",
    "r1-opus-refuted", "target", "test-results", "tranches", "venv",
];

function git(args) {
    const result = spawnSync("git", ["-C", repository, ...args], { encoding: "utf8" });
    if (result.status !== 0) throw new Error(`git ${args.join(" ")} failed: ${result.stderr}`);
    return result.stdout;
}

function evidence(path, description) {
    return {
        path,
        canonical_realpath: realpathSync(path),
        sha256: sha256(readFileSync(path)),
        description,
    };
}

function finalize(universe) {
    const now = new Date();
    universe.observed_at = now.toISOString();
    universe.discovery.epoch.started_at = new Date(now.getTime() - 100).toISOString();
    universe.discovery.epoch.completed_at = universe.observed_at;
    const preimage = clone(universe);
    delete preimage.universe_hash;
    universe.universe_hash = sha256(canonicalize(preimage));
    return universe;
}

function execute(name, candidate) {
    const input = join(directory, `${name}-input.json`);
    const output = join(directory, `${name}-receipt.json`);
    const snapshotStore = join(directory, `${name}-snapshot-store`);
    const snapshotIndex = join(directory, `${name}-snapshot-index.json`);
    writeFileSync(input, `${JSON.stringify(finalize(candidate), null, 2)}\n`);
    return spawnSync(process.execPath, [
        resolver,
        "--input", input,
        "--output", output,
        "--snapshot-store", snapshotStore,
        "--snapshot-index", snapshotIndex,
    ], { encoding: "utf8" });
}

function expectProjection(name, source, path, expected) {
    try {
        const actual = staticImportProjection(source, path).map(({ kind, specifier }) => [kind, specifier]);
        if (canonicalize(actual) !== canonicalize(expected)) {
            failures.push(`${name} projection drifted: ${canonicalize(actual)}; expected ${canonicalize(expected)}`);
        }
    } catch (error) {
        failures.push(`${name} unexpectedly rejected: ${error.message}`);
    }
}

function expectProjectionRejected(name, source, path) {
    try {
        const projected = staticImportProjection(source, path);
        failures.push(`${name} unexpectedly projected ${canonicalize(projected)}`);
    } catch (error) {
        if (!error.message.includes("bounded static import projection rejected")) {
            failures.push(`${name} rejected for an unexpected reason: ${error.message}`);
        }
    }
}

function expectResolverRejected(name, baseline, mutate) {
    const candidate = clone(baseline);
    mutate(candidate);
    const result = execute(name, candidate);
    if (result.status === 0 || !result.stderr.includes("bounded scan found omitted in-scope edge")) {
        failures.push(`${name} did not fail closed through the full resolver; status=${result.status}; stderr=${result.stderr}`);
    }
}

try {
    expectProjection(
        "division after property named return",
        `x.return / 1; import("${packageName}/division"); y / 2; // \"`,
        "division.js",
        [["dynamic", `${packageName}/division`]],
    );
    expectProjection(
        "TypeScript import type",
        `type Value = import("${packageName}/type").Value;`,
        "import-type.ts",
        [["type", `${packageName}/type`]],
    );
    expectProjection(
        "bare optional require and property non-edge",
        `require?.("${packageName}/optional"); loader.require?.("${packageName}/property");`,
        "optional-require.js",
        [["runtime", `${packageName}/optional`]],
    );
    expectProjection(
        "JSX text and executable expression",
        `<main>import("${packageName}/jsx-text")<span>{import("${packageName}/jsx-expression")}</span></main>;`,
        "view.jsx",
        [["dynamic", `${packageName}/jsx-expression`]],
    );
    expectProjection(
        "HTML text and script region",
        `<main>import("${packageName}/html-text")</main><script type="module">import("${packageName}/html-script")</script>`,
        "view.html",
        [["dynamic", `${packageName}/html-script`]],
    );
    for (const extension of ["vue", "svelte"]) {
        expectProjection(
            `${extension} host script region`,
            `<main>import("${packageName}/${extension}-text")</main><script lang="ts">type X = import("${packageName}/${extension}-type").X;</script>`,
            `component.${extension}`,
            [["type", `${packageName}/${extension}-type`]],
        );
    }
    expectProjection(
        "Vue single-brace host text",
        `<main>{import("${packageName}/vue-single-brace-text")}</main>`,
        "single-brace.vue",
        [],
    );
    expectProjection(
        "Astro frontmatter",
        `---\ntype X = import("${packageName}/astro-type").X;\n---\n<main>import("${packageName}/astro-text")</main>`,
        "page.astro",
        [["type", `${packageName}/astro-type`]],
    );
    expectProjection(
        "MDX ESM and inert prose/code",
        `import type { Value } from "${packageName}/mdx-type"\n\n# import("${packageName}/mdx-text")\n\n\`\`\`js\nimport("${packageName}/mdx-code")\n\`\`\`\n`,
        "page.mdx",
        [["type", `${packageName}/mdx-type`]],
    );
    for (const extension of ["css", "less", "sass", "scss", "styl"]) {
        expectProjection(
            `${extension} stylesheet imports`,
            `@import "${packageName}/theme.css";\n@import url(${packageName}/print.css);`,
            `styles.${extension}`,
            [["css", `${packageName}/theme.css`], ["css", `${packageName}/print.css`]],
        );
    }
    expectProjection(
        "quoted/template/attributes/mixed kinds",
        [
            `import data from "${packageName}/json" with { type: "json" };`,
            `import(\`${packageName}/template\`);`,
            `import("${packageName}/options", { with: { type: "json" } });`,
            `import { value, type Value } from "${packageName}/mixed";`,
        ].join("\n"),
        "preserved.ts",
        [
            ["runtime", `${packageName}/json`],
            ["dynamic", `${packageName}/template`],
            ["dynamic", `${packageName}/options`],
            ["runtime", `${packageName}/mixed`],
            ["type", `${packageName}/mixed`],
        ],
    );

    expectProjectionRejected("computed dynamic import", `import(${packageName.replace("@", "package")});`, "computed.js");
    expectProjectionRejected("computed optional require", "require?.(packageName);", "computed-require.js");
    expectProjectionRejected("multiple optional require arguments", `require?.("${packageName}", "extra");`, "multiple-require.js");
    expectProjectionRejected("computed TypeScript import type", "type X = import(packageName).X;", "computed-type.ts");
    expectProjectionRejected("malformed JavaScript", `import("${packageName}"`, "malformed.js");
    expectProjectionRejected("computed CSS import", "@import url($package);", "computed.scss");
    expectProjectionRejected("unsupported host expression candidate", `<main>{import("${packageName}")}</main>`, "expression.svelte");

    mkdirSync(join(repository, "src"), { recursive: true });
    const readmePath = join(repository, "README.md");
    const scriptPath = join(repository, "src", "main.ts");
    const htmlPath = join(repository, "src", "view.html");
    const stylePath = join(repository, "src", "styles.scss");
    writeFileSync(readmePath, "source projection resolver fixture\n");
    writeFileSync(scriptPath, [
        `x.return / 1; import("${packageName}/division"); y / 2; // \"`,
        `type Imported = import("${packageName}/type").Value;`,
        `require?.("${packageName}/optional");`,
        `loader.require?.("${packageName}/property");`,
        `import("${packageName}/attributes", { with: { type: "json" } });`,
        `import { value, type Value } from "${packageName}/mixed";`,
        "",
    ].join("\n"));
    writeFileSync(htmlPath, `<main>import("${packageName}/html-text")</main>\n<script type="module">import("${packageName}/host")</script>\n`);
    writeFileSync(stylePath, `@import "${packageName}/theme.css";\n`);
    git(["init", "-b", "fixture-source-projection"]);
    git(["config", "user.name", "Source Projection Selftest"]);
    git(["config", "user.email", "source-projection@example.invalid"]);
    git(["add", "."]);
    git(["commit", "-m", "fixture"]);

    const rootIdentity = resolveGitIdentity(repository);
    const readmeEvidence = evidence(readmePath, "fixture root and discovery evidence");
    const scriptEvidence = evidence(scriptPath, "TypeScript source projection evidence");
    const htmlEvidence = evidence(htmlPath, "host script projection evidence");
    const styleEvidence = evidence(stylePath, "stylesheet projection evidence");
    const edgeRows = [
        ["division", `${packageName}/division`, "dynamic", scriptEvidence],
        ["type", `${packageName}/type`, "type", scriptEvidence],
        ["optional", `${packageName}/optional`, "runtime", scriptEvidence],
        ["attributes", `${packageName}/attributes`, "dynamic", scriptEvidence],
        ["mixed-runtime", `${packageName}/mixed`, "runtime", scriptEvidence],
        ["mixed-type", `${packageName}/mixed`, "type", scriptEvidence],
        ["host", `${packageName}/host`, "dynamic", htmlEvidence],
        ["theme", `${packageName}/theme.css`, "css", styleEvidence],
    ];
    const baseline = {
        schema: "vnext-consumer-universe/2",
        observed_at: new Date().toISOString(),
        discovery: {
            methods: ["css", "dynamic", "manifests", "npm_package_locks_v2_v3", "origins", "realpaths", "runtime", "type", "worktrees"],
            evidence: [readmeEvidence],
            epoch: { started_at: new Date().toISOString(), completed_at: new Date().toISOString(), max_age_seconds: 300 },
            bounds: {
                search_roots: [{ path: repositories, canonical_realpath: realpathSync(repositories), max_depth: 2 }],
                ignored_directory_names: ignoredDirectories,
                edge_scope: [{ package: packageName, target, kinds: allKinds }],
                required_roots: [{ id: "consumer", canonical_realpath: realpathSync(repository) }],
                required_paths: [],
                max_entries: 1000,
                max_files: 100,
                max_file_bytes: 1024 * 1024,
                max_snapshot_bytes: 16 * 1024 * 1024,
            },
        },
        roots: [{
            id: "consumer",
            repository: "consumer",
            path: repository,
            canonical_realpath: realpathSync(repository),
            branch: rootIdentity.branch,
            head: rootIdentity.head,
            dirty_sha256: rootIdentity.dirty_sha256,
            provenance: {
                origins: { values: [], evidence: [readmeEvidence] },
                worktrees: { values: [realpathSync(repository)], evidence: [readmeEvidence] },
                deploy_roots: { values: [], evidence: [readmeEvidence] },
            },
            disposition: { status: "included", owner_wave: "C00" },
        }],
        edges: edgeRows.map(([id, specifier, kind, proof]) => ({
            id: `consumer:value-${id}`,
            source: "consumer",
            target,
            package: packageName,
            specifier,
            kind,
            owner_wave: "C00",
            evidence: [proof],
            disposition: { status: "included" },
        })),
        universe_hash: "",
    };

    const valid = execute("valid", clone(baseline));
    if (valid.status !== 0) failures.push(`full resolver rejected the valid source projection: ${valid.stderr}`);

    const criticalKinds = new Map([
        ["consumer:value-division", "runtime"],
        ["consumer:value-type", "dynamic"],
        ["consumer:value-host", "runtime"],
        ["consumer:value-optional", "dynamic"],
    ]);
    for (const [id, wrongKind] of criticalKinds) {
        expectResolverRejected(`omit-${id.split(":").at(-1)}`, baseline,
            (candidate) => { candidate.edges = candidate.edges.filter((edge) => edge.id !== id); });
        expectResolverRejected(`wrong-kind-${id.split(":").at(-1)}`, baseline,
            (candidate) => { candidate.edges.find((edge) => edge.id === id).kind = wrongKind; });
    }
    expectResolverRejected("optional-require-wrong-type", baseline,
        (candidate) => { candidate.edges.find((edge) => edge.id === "consumer:value-optional").kind = "type"; });
} catch (error) {
    failures.push(error.stack ?? error.message);
} finally {
    rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exitCode = 1;
} else {
    process.stdout.write("source projection selftest passed\n");
}
