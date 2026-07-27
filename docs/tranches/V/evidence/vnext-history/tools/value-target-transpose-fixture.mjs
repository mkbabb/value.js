import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    cpSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    realpathSync,
    renameSync,
    writeFileSync,
} from "node:fs";
import { basename, dirname, join, posix, relative, resolve } from "node:path";

import { repositoryStateSha256 } from "./gate-runtime.mjs";
import {
    prepareConsumerFixtureConstellation,
    resolveConsumerFixtureUniverse,
} from "./consumer-universe-fixture.mjs";
import { createConsumerImmutableCaptureAuthorityFixture } from "./consumer-immutable-capture-authority-fixture.mjs";
import { compareCanonicalText, canonicalize, parseJsonStrict } from "./json-contract.mjs";
import { resolveGitIdentity } from "./resolve-consumer-universe.mjs";
import { createValueTargetResolutionFixture } from "./value-target-resolution-fixture.mjs";
import { valueTargetDecisionHash } from "./value-target-owner-return.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";

const trancheRoot = resolve(dirname(new URL(import.meta.url).pathname), "..");
const inventoryValidator = resolve(trancheRoot, "tools/validate-value-current-inventory.mjs");
const returnValidator = resolve(trancheRoot, "tools/validate-return.mjs");
const deletionTruth = resolve(trancheRoot, "tools/deletion-truth.mjs");
const formationTargetPath = realpathSync(resolve(trancheRoot, "VALUE-TARGET-PATHS.json"));
const formationCssPath = realpathSync(resolve(trancheRoot, "CSS-MODULE-ISOMORPHISM.json"));
const v29tTombstonePattern = "vnext-value-transpose-v29t-tombstone";
const expectedSpecifiers = ["./color", "./css", "./easing", "./math", "./path", "./transform"];
const publicSourcesBySpecifier = new Map([
    ["./color", "src/color/model.ts"],
    ["./css", "src/css/syntax/source.ts"],
    ["./easing", "src/easing/linear.ts"],
    ["./math", "src/foundation/number.ts"],
    ["./path", "src/path/syntax.ts"],
    ["./transform", "src/transform/model.ts"],
]);
const nodeExtensions = [".cjs", ".cts", ".js", ".jsx", ".mjs", ".mts", ".ts", ".tsx"];
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const sha512 = (bytes) => createHash("sha512").update(bytes).digest("hex");
const fileHash = (path) => sha256(readFileSync(path));

function writeText(path, value) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, value);
}

function writeJson(path, value) {
    writeText(path, `${JSON.stringify(value, null, 2)}\n`);
}

function finalize(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    value[member] = sha256(canonicalize(preimage));
    return value;
}

function fileEvidence(path) {
    return { path: realpathSync(path), file_sha256: fileHash(path) };
}

function ledgerEvidence(path) {
    return { path: realpathSync(path), sha256: fileHash(path) };
}

function run(command, args, options = {}) {
    const result = spawnSync(command, args, {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
        ...options,
    });
    if (result.status !== 0) throw new Error(`${command} ${args.join(" ")}: ${(result.stderr || result.stdout).trim()}`);
    return result.stdout;
}

function runNodeReceipt(tool, args) {
    return parseJsonStrict(run(process.execPath, [tool, ...args]).trim());
}

function git(repository, args, options = {}) {
    return execFileSync("git", ["-C", repository, ...args], options);
}

function gitText(repository, args) {
    return git(repository, args, { encoding: "utf8" }).trim();
}

function gitStatusHash(repository) {
    return sha256(git(repository, ["status", "--porcelain=v1", "-z", "--untracked-files=all"]));
}

function listRegularFiles(root) {
    const rows = [];
    const visit = (directory) => {
        for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => compareCanonicalText(left.name, right.name))) {
            const path = resolve(directory, entry.name);
            if (entry.isDirectory()) visit(path);
            else if (entry.isFile()) rows.push(path);
            else throw new Error(`fixture contains unsupported entry ${path}`);
        }
    };
    visit(root);
    return rows;
}

function refreshCssAuthority(manifest) {
    manifest.authority.runtime_modules_sha256 = sha256(canonicalize(manifest.modules.map(({ bbnf_path }) => bbnf_path)));
    manifest.authority.excluded_dispositions_sha256 = sha256(canonicalize(manifest.excluded.map(({ bbnf_path, disposition }) => ({ bbnf_path, disposition }))));
    manifest.authority.resolved_edges_sha256 = sha256(canonicalize(manifest.modules.map(({ bbnf_path, imports }) => ({ bbnf_path, imports }))));
}

function executionCss() {
    const css = parseJsonStrict(readFileSync(formationCssPath));
    css.authority.snapshot_kind = "execution-input";
    for (const correction of css.edge_corrections) {
        const owner = css.modules.find(({ bbnf_path }) => bbnf_path === correction.from);
        owner.imports = [...new Set([...owner.imports, correction.to])].sort(compareCanonicalText);
    }
    css.edge_corrections = [];
    refreshCssAuthority(css);
    return finalize(css, "manifest_hash");
}

function identifierFor(module) {
    const stem = basename(module.bbnf_path, ".bbnf");
    return `parse${stem.split(/[^a-z0-9]+/i).filter(Boolean)
        .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join("")}`;
}

function logicalSpecifier(from, to) {
    let specifier = posix.relative(posix.dirname(from), to).replace(/\.ts$/, ".js");
    if (!specifier.startsWith(".")) specifier = `./${specifier}`;
    return specifier;
}

function materializeGrammar(valueRoot, css) {
    const byBbnf = new Map(css.modules.map((module) => [module.bbnf_path, module]));
    for (const module of css.modules) {
        const imports = module.imports.map((dependency, index) => {
            const target = byBbnf.get(dependency);
            return `import { ${identifierFor(target)} as dependency${index} } from ${JSON.stringify(logicalSpecifier(module.typescript_path, target.typescript_path))};`;
        });
        writeText(resolve(valueRoot, module.typescript_path), [
            'import { literal } from "@mkbabb/parse-that";',
            ...imports,
            "",
            'const publicParserWitness = literal("");',
            "void publicParserWitness;",
            ...module.imports.map((_, index) => `void dependency${index};`),
            `export function ${identifierFor(module)}(input: string): string {`,
            "    return input;",
            "}",
            "",
        ].join("\n"));
        writeText(resolve(valueRoot, module.test_path), [
            'import { describe, expect, it } from "vitest";',
            `import { ${identifierFor(module)} } from ${JSON.stringify(logicalSpecifier(module.test_path, module.typescript_path))};`,
            "",
            `describe(${JSON.stringify(module.bbnf_path)}, () => {`,
            '    it("exercises its exact peer", () => {',
            `        expect(${identifierFor(module)}("sample")).toBe("sample");`,
            "    });",
            "});",
            "",
        ].join("\n"));
    }
}

function finalTarget(css, cssPath, resolutions) {
    const target = parseJsonStrict(readFileSync(formationTargetPath));
    for (const scope of ["library", "demo"]) {
        target.authority[scope].document_sha256 = fileHash(resolve(trancheRoot, target.authority[scope].document));
    }
    target.authority.library.topology = "exact";
    target.authority.library.grammar_snapshot = {
        path: "test/proof/p00/css-module-isomorphism.execution.json",
        file_sha256: fileHash(cssPath),
        manifest_hash: css.manifest_hash,
        source_commit: css.source.commit,
        snapshot_kind: "execution-input",
        execution_resnapshot_required: false,
        module_count: css.modules.length,
        runtime_modules_sha256: css.authority.runtime_modules_sha256,
        excluded_dispositions_sha256: css.authority.excluded_dispositions_sha256,
        resolved_edges_sha256: css.authority.resolved_edges_sha256,
    };
    const prunedSources = new Set(resolutions.rows.filter(({ outcome }) => outcome === "PRUNE").map(({ source }) => source));
    const prunedTests = new Set(resolutions.rows.filter(({ outcome }) => outcome === "PRUNE").map(({ test }) => test));
    target.library.files = target.library.files.filter((path) => !prunedSources.has(path));
    target.library.test.files = target.library.test.files.filter((path) => !prunedTests.has(path));
    target.library.conditional_paths = [];
    return finalize(target, "manifest_sha256");
}

function packageFiles(valueRoot) {
    const exports = {};
    for (const specifier of expectedSpecifiers) {
        const slug = specifier.slice(2);
        const title = `${slug[0].toUpperCase()}${slug.slice(1)}`;
        writeText(resolve(valueRoot, `dist/${slug}.js`), `export const ${title}Runtime = ${JSON.stringify(slug)};\n`);
        writeText(resolve(valueRoot, `dist/${slug}.d.ts`), `export declare const ${title}Runtime: ${JSON.stringify(slug)};\nexport type ${title}Options = { readonly capability: ${JSON.stringify(slug)} };\n`);
        exports[specifier] = { types: `./dist/${slug}.d.ts`, import: `./dist/${slug}.js` };
    }
    writeJson(resolve(valueRoot, "package.json"), {
        name: "@mkbabb/value.js",
        version: "5.0.0",
        type: "module",
        exports,
        files: ["dist"],
    });
}

function exportNodes(root) {
    const nodes = [];
    for (const specifier of expectedSpecifiers) {
        const slug = specifier.slice(2);
        const title = `${slug[0].toUpperCase()}${slug.slice(1)}`;
        const runtimePath = `dist/${slug}.js`;
        const typePath = `dist/${slug}.d.ts`;
        nodes.push({
            kind: "export",
            id: `${specifier}#${title}Runtime:runtime`,
            path: runtimePath,
            sha256: fileHash(resolve(root, runtimePath)),
            specifier,
            symbol: `${title}Runtime`,
            surface: "runtime",
        });
        nodes.push({
            kind: "export",
            id: `${specifier}#${title}Options:type`,
            path: typePath,
            sha256: fileHash(resolve(root, typePath)),
            specifier,
            symbol: `${title}Options`,
            surface: "type",
        });
    }
    return nodes;
}

function captureSnapshot(valueRoot, snapshotRoot, sources, tests) {
    const paths = [
        ...sources,
        ...tests,
        ...listRegularFiles(resolve(valueRoot, "dist")).map((path) => relative(valueRoot, path).split("\\").join("/")),
        "package.json",
    ];
    for (const relativePath of paths) {
        const destination = resolve(snapshotRoot, relativePath);
        mkdirSync(dirname(destination), { recursive: true });
        cpSync(resolve(valueRoot, relativePath), destination);
    }
    const files = listRegularFiles(snapshotRoot).map((path) => ({
        path: relative(snapshotRoot, path).split("\\").join("/"),
        sha256: fileHash(path),
    })).sort((left, right) => compareCanonicalText(left.path, right.path));
    return { root: realpathSync(snapshotRoot), files, files_sha256: sha256(canonicalize(files)) };
}

function currentInventory(valueRoot, snapshot, beforeSources, beforeTests) {
    const identity = resolveGitIdentity(valueRoot);
    const nodes = [
        ...beforeSources.map((path) => ({ kind: "source", id: path, path, sha256: fileHash(resolve(valueRoot, path)) })),
        ...beforeTests.map((path) => ({ kind: "test", id: path, path, sha256: fileHash(resolve(valueRoot, path)) })),
        ...exportNodes(valueRoot),
    ].sort((left, right) => compareCanonicalText(`${left.kind}\0${left.id}`, `${right.kind}\0${right.id}`));
    const inventory = {
        schema: "vnext-value-current-inventory/1",
        wave_id: "V00A",
        repository: {
            path: valueRoot,
            branch: identity.branch,
            head: identity.head,
            dirty_sha256: gitStatusHash(valueRoot),
        },
        snapshot,
        authority: {
            source_root: "src",
            test_root: "test",
            package_manifest: "package.json",
            node_extensions: nodeExtensions,
            package_manifest_sha256: fileHash(resolve(valueRoot, "package.json")),
        },
        test_exclusions: [],
        nodes,
        inventory_hash: "",
    };
    return finalize(inventory, "inventory_hash");
}

function archiveContents(tarball) {
    const listing = execFileSync("/usr/bin/tar", ["-tzf", tarball], { encoding: "utf8" })
        .trim().split("\n").filter((path) => path && !path.endsWith("/"));
    const contents = new Map();
    for (const archivePath of listing) {
        contents.set(archivePath.replace(/^package\//, ""), execFileSync("/usr/bin/tar", ["-xOzf", tarball, archivePath], { encoding: null }));
    }
    return contents;
}

function packValue(valueRoot, outputRoot) {
    mkdirSync(outputRoot, { recursive: true });
    const packed = JSON.parse(execFileSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", outputRoot], {
        cwd: valueRoot,
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
    }));
    const tarball = realpathSync(resolve(outputRoot, packed[0].filename));
    const bytes = readFileSync(tarball);
    const contents = archiveContents(tarball);
    const files = [...contents].map(([path, content]) => ({ path, bytes: content.length, sha256: sha256(content) }))
        .sort((left, right) => compareCanonicalText(left.path, right.path));
    return {
        tarball,
        contents,
        receipt: {
            name: "@mkbabb/value.js",
            version: "5.0.0",
            tarball: {
                path: tarball,
                sha256: sha256(bytes),
                sha512: sha512(bytes),
                integrity: `sha512-${createHash("sha512").update(bytes).digest("base64")}`,
            },
            archive: {
                package_json_sha256: sha256(contents.get("package.json")),
                files,
                files_sha256: sha256(canonicalize(files)),
            },
        },
    };
}

function publicExportRows(packed) {
    const rows = [];
    for (const specifier of expectedSpecifiers) {
        const slug = specifier.slice(2);
        const title = `${slug[0].toUpperCase()}${slug.slice(1)}`;
        const declarationPath = `dist/${slug}.d.ts`;
        const runtimePath = `dist/${slug}.js`;
        const declaration = { path: declarationPath, sha256: sha256(packed.contents.get(declarationPath)) };
        for (const [symbol, surface] of [[`${title}Runtime`, "runtime"], [`${title}Options`, "type"]]) {
            const id = `${specifier}#${symbol}:${surface}`;
            rows.push({
                id,
                specifier,
                symbol,
                surface,
                source: publicSourcesBySpecifier.get(specifier),
                declaration,
                ...(surface === "runtime" ? { runtime: { path: runtimePath, sha512: sha512(packed.contents.get(runtimePath)) } } : {}),
                tarball_sha512: packed.receipt.tarball.sha512,
                semantic_assertion_id: `semantic:${id}`,
                semantic_sha256: "0".repeat(64),
            });
        }
    }
    return rows.sort((left, right) => compareCanonicalText(left.id, right.id));
}

function semanticAssertion(tempRoot, manifest, row, index) {
    const packageSpecifier = `${manifest.package.name}${row.specifier.slice(1)}`;
    const probePath = resolve(tempRoot, `semantic/${index}.probe.ts`);
    writeText(probePath, row.surface === "type"
        ? `import type { ${row.symbol} } from ${JSON.stringify(packageSpecifier)};\ntype SemanticProbe = ${row.symbol};\nexport type { SemanticProbe };\n`
        : `import { ${row.symbol} } from ${JSON.stringify(packageSpecifier)};\nif (${row.symbol} === undefined) throw new Error("missing runtime export");\nexport const semanticProbe = ${row.symbol};\n`);
    const observation = finalize({
        schema: "vnext-value-public-semantic-observation/1",
        wave_id: "V29T",
        assertion_id: `semantic:${row.id}`,
        export_id: row.id,
        package_sha512: manifest.package.tarball.sha512,
        target_manifest_sha256: manifest.target_paths.manifest_sha256,
        status: "PASS",
        observation_hash: "",
    }, "observation_hash");
    const observationPath = resolve(tempRoot, `semantic/${index}.observation.json`);
    writeJson(observationPath, observation);
    return finalize({
        id: `semantic:${row.id}`,
        export_id: row.id,
        status: "PASS",
        contract: `The packed ${row.id} fixture is executable from its exact public key.`,
        probe: fileEvidence(probePath),
        observation: { ...fileEvidence(observationPath), observation_hash: observation.observation_hash },
        semantic_sha256: "",
    }, "semantic_sha256");
}

function semanticEvidence(tempRoot, manifest) {
    const evidence = {
        schema: "vnext-value-public-semantic-evidence/1",
        wave_id: "V29T",
        package: {
            name: manifest.package.name,
            version: manifest.package.version,
            tarball_sha512: manifest.package.tarball.sha512,
        },
        target_manifest_sha256: manifest.target_paths.manifest_sha256,
        assertions: manifest.exports.map((row, index) => semanticAssertion(tempRoot, manifest, row, index)),
        evidence_hash: "",
    };
    for (const assertion of evidence.assertions) finalize(assertion, "semantic_sha256");
    const byExport = new Map(evidence.assertions.map((assertion) => [assertion.export_id, assertion]));
    for (const row of manifest.exports) row.semantic_sha256 = byExport.get(row.id).semantic_sha256;
    finalize(evidence, "evidence_hash");
    const path = resolve(tempRoot, "semantic/evidence.json");
    writeJson(path, evidence);
    return { ...fileEvidence(path), evidence_hash: evidence.evidence_hash };
}

function tombstoneRationale(specifier) {
    return specifier === "."
        ? "The root entrypoint has no independent capability job."
        : `${specifier} is removed as a public key without an alias or forwarding entry.`;
}

function packageTombstoneDecision(specifier) {
    const decision = {
        decision_id: `package-tombstone:${specifier === "." ? "root" : specifier.slice(2)}`,
        kind: "package-tombstone",
        specifier,
        disposition: "tombstone",
        rationale: tombstoneRationale(specifier),
        decision_hash: "",
    };
    decision.decision_hash = valueTargetDecisionHash("V00C", decision);
    return decision;
}

function publicManifest(tempRoot, targetPath, target, packed, v00cReturn) {
    const manifest = {
        schema: "vnext-value-public-surface/2",
        wave_id: "V29T",
        target_paths: { ...fileEvidence(targetPath), manifest_sha256: target.manifest_sha256 },
        package: structuredClone(packed.receipt),
        exports: publicExportRows(packed),
        tombstone_owner_return: v00cReturn.evidence,
        tombstones: [".", "./quantize", "./value"].map((specifier) => finalize({
            specifier,
            disposition: "tombstone",
            owner_wave_id: "V00C",
            owner_return_hash: v00cReturn.record.return_hash,
            rationale: tombstoneRationale(specifier),
            decision_sha256: "",
        }, "decision_sha256")),
        semantic_evidence: null,
        manifest_hash: "",
    };
    manifest.semantic_evidence = semanticEvidence(tempRoot, manifest);
    finalize(manifest, "manifest_hash");
    const path = resolve(tempRoot, "value-public-surface.json");
    writeJson(path, manifest);
    return { manifest, path: realpathSync(path) };
}

function dispositionDecision(row, decisionId) {
    const decision = {
        decision_id: decisionId,
        kind: row.kind,
        current_id: row.current_id,
        current_sha256: row.current_sha256,
        disposition: row.disposition,
        ...(row.disposition === "delete" ? { tombstone: row.tombstone } : { target_id: row.target_id }),
        decision_hash: "",
    };
    decision.decision_hash = valueTargetDecisionHash("V16B", decision);
    return decision;
}

export function createValueTargetTransposeFixture({ tempRoot }) {
    const fixtureRoot = realpathSync(tempRoot);
    const consumerCaptureAuthority = createConsumerImmutableCaptureAuthorityFixture({ fixtureRoot });
    const ownerRoot = resolve(fixtureRoot, "owners");
    const snapshotRoot = resolve(fixtureRoot, "immutable-v00a-snapshot");
    mkdirSync(ownerRoot, { recursive: true });
    mkdirSync(snapshotRoot, { recursive: true });
    const constellation = prepareConsumerFixtureConstellation({
        fixtureRoot,
        primary: {
            id: "value",
            repository: "value-transpose-fixture",
            ownerWave: "V29T",
        },
    });
    const valueRoot = constellation.primaryRepository;
    const ownerFixture = createValueTargetResolutionFixture({
        tempRoot: ownerRoot,
        formationTargetPath,
        consumerCaptureAuthority,
    });
    const css = executionCss();
    const cssPath = resolve(valueRoot, "test/proof/p00/css-module-isomorphism.execution.json");
    writeJson(cssPath, css);

    const formation = parseJsonStrict(readFileSync(formationTargetPath));
    const publicSources = new Set(publicSourcesBySpecifier.values());
    const conditionalSources = new Set(formation.library.conditional_paths.map(({ source }) => source));
    const moveIndex = formation.library.files.findIndex((path) =>
        !path.startsWith("src/css/grammar/") && !publicSources.has(path) && !conditionalSources.has(path));
    if (moveIndex < 0) throw new Error("fixture could not select a non-authority move source");
    const moveSource = formation.library.files[moveIndex];
    const moveTest = formation.library.test.files[moveIndex];
    const legacySource = "src/legacy-transpose.ts";
    const legacyTest = "test/legacy-transpose.test.ts";
    const beforeSources = formation.library.files.map((path) => path === moveSource ? legacySource : path);
    const beforeTests = formation.library.test.files.map((path) => path === moveTest ? legacyTest : path);
    for (const path of beforeSources) writeText(resolve(valueRoot, path), `export const fixture_${sha256(path).slice(0, 12)} = ${JSON.stringify(path)};\n`);
    for (const path of beforeTests) writeText(resolve(valueRoot, path), `export const fixture_test_${sha256(path).slice(0, 12)} = ${JSON.stringify(path)};\n`);
    materializeGrammar(valueRoot, css);
    packageFiles(valueRoot);
    writeText(resolve(valueRoot, "TOMBSTONES.md"), `- ${v29tTombstonePattern}\n`);
    git(valueRoot, ["init", "--initial-branch=main"]);
    if (gitText(valueRoot, ["symbolic-ref", "--quiet", "--short", "HEAD"]) !== "main") {
        throw new Error("transpose fixture did not initialize on the exact main branch");
    }
    git(valueRoot, ["config", "user.name", "Transpose Fixture"]);
    git(valueRoot, ["config", "user.email", "transpose-fixture@example.invalid"]);
    git(valueRoot, ["add", "."]);
    git(valueRoot, ["commit", "-m", "fixture before transpose"]);

    const snapshot = captureSnapshot(valueRoot, snapshotRoot, beforeSources, beforeTests);
    const inventory = currentInventory(valueRoot, snapshot, beforeSources, beforeTests);
    const inventoryPath = resolve(fixtureRoot, "value-current-inventory.json");
    writeJson(inventoryPath, inventory);
    const captureReceipt = runNodeReceipt(inventoryValidator, ["--inventory", inventoryPath, "--mode", "live"]);
    const replayReceipt = runNodeReceipt(inventoryValidator, ["--inventory", inventoryPath, "--mode", "replay"]);
    const capturePath = resolve(fixtureRoot, "value-current-inventory.capture.json");
    const replayPath = resolve(fixtureRoot, "value-current-inventory.replay.json");
    writeJson(capturePath, captureReceipt);
    writeJson(replayPath, replayReceipt);
    const v00aReturn = ownerFixture.writeV00AReturn({
        inventory: { ...fileEvidence(inventoryPath), contract_hash: inventory.inventory_hash },
        captureReceipt: { ...fileEvidence(capturePath), receipt_hash: captureReceipt.receipt_hash },
        replayReceipt: { ...fileEvidence(replayPath), receipt_hash: replayReceipt.receipt_hash },
    });
    const v00aLiveValidation = spawnSync(process.execPath, [returnValidator, v00aReturn.path], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
    if (v00aLiveValidation.status !== 0) {
        throw new Error(`V00A live capture+replay return rejected: ${v00aLiveValidation.stderr || v00aLiveValidation.stdout}`);
    }
    const forgedReplay = structuredClone(replayReceipt);
    forgedReplay.nodes_sha256 = "0".repeat(64);
    finalize(forgedReplay, "receipt_hash");
    const forgedReplayPath = resolve(fixtureRoot, "value-current-inventory.forged-replay.json");
    writeJson(forgedReplayPath, forgedReplay);
    const forgedV00A = structuredClone(v00aReturn.record);
    const forgedReplayBinding = { ...fileEvidence(forgedReplayPath), receipt_hash: forgedReplay.receipt_hash };
    forgedV00A.annexes["value-current-inventory"].replay_receipt = forgedReplayBinding;
    const replayInput = forgedV00A.evidence_inputs.find((input) => input.path === replayPath);
    replayInput.path = forgedReplayBinding.path;
    replayInput.sha256 = forgedReplayBinding.file_sha256;
    finalize(forgedV00A, "return_hash");
    const forgedV00APath = resolve(fixtureRoot, "v00a-forged-replay.return.json");
    writeJson(forgedV00APath, forgedV00A);
    const forgedReplayValidation = spawnSync(process.execPath, [returnValidator, forgedV00APath], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
    if (forgedReplayValidation.status === 0 || !forgedReplayValidation.stderr.includes("persisted receipt differs from replay validation")) {
        throw new Error(`V00A default completion accepted forged replay receipt: ${forgedReplayValidation.stderr || forgedReplayValidation.stdout}`);
    }

    const expectedExportIds = exportNodes(valueRoot).map(({ id }) => id).sort(compareCanonicalText);
    const expectedTargetKeys = new Set([
        ...formation.library.files.map((id) => `source\0${id}`),
        ...formation.library.test.files.map((id) => `test\0${id}`),
        ...expectedExportIds.map((id) => `export\0${id}`),
    ]);
    const decisionRows = inventory.nodes.map((node) => {
        const targetId = node.id === legacySource ? moveSource : node.id === legacyTest ? moveTest : node.id;
        if (!expectedTargetKeys.has(`${node.kind}\0${targetId}`)) throw new Error(`inventory node lacks target ${node.kind}/${targetId}`);
        const row = {
            kind: node.kind,
            current_id: node.id,
            current_sha256: node.sha256,
            disposition: targetId === node.id ? "keep" : "move",
            target_id: targetId,
            owner: null,
            rationale: targetId === node.id ? "retain the accepted target coordinate" : "transpose the accepted implementation to its final coordinate",
            tombstone: null,
        };
        const decisionId = `node-${node.kind}-${sha256(node.id).slice(0, 20)}`;
        return { row, decision: dispositionDecision(row, decisionId) };
    });
    const extended = ownerFixture.extendOwnerReturn({
        waveId: "V16B",
        status: "KEEP",
        decisions: decisionRows.map(({ decision }) => decision),
    });
    const v00cDecisions = [".", "./quantize", "./value"].map(packageTombstoneDecision);
    const rawV00CReturn = ownerFixture.writeV00CReturn({ v00aReturn, decisions: v00cDecisions });
    const rawSelectedOwners = new Map(
        ["V18H", "V18V", "V24"].map((waveId) => [waveId, ownerFixture.ownerReturns.get(waveId).get("KEEP")]),
    );
    const selectedOwnerOverrides = new Map([
        ["V00A", v00aReturn],
        ["V00C", rawV00CReturn],
        ["V16B", extended],
        ...rawSelectedOwners,
    ]);
    const v29tDependencies = loadWaveContracts().get("V29T").contract.dependencies;
    const coherentHistory = ownerFixture.writeCoherentHistory({
        roots: v29tDependencies,
        overrides: selectedOwnerOverrides,
        name: "transpose-history",
    });
    for (const waveId of ["V16B", "V18H", "V18V", "V24"]) {
        ownerFixture.ownerReturns.get(waveId).set("KEEP", coherentHistory.get(waveId));
    }
    const coherentV00A = coherentHistory.get("V00A");
    const v00cReturn = coherentHistory.get("V00C");
    const coherentV16B = coherentHistory.get("V16B");
    const owner = (decision) => ({
        wave_id: "V16B",
        return: structuredClone(coherentV16B.evidence),
        decision_id: decision.decision_id,
        decision_hash: decision.decision_hash,
    });
    const rows = decisionRows.map(({ row, decision }) => ({ ...row, owner: owner(decision) }));
    const outcomes = { V16B: "KEEP", V18H: "KEEP", V18V: "KEEP", V24: "KEEP" };
    const resolutionArtifact = ownerFixture.writeResolutions(outcomes, "transpose-resolutions");
    const target = finalTarget(css, cssPath, resolutionArtifact.manifest);
    const targetPath = resolve(fixtureRoot, "value-target-paths.final.json");
    writeJson(targetPath, target);

    const beforeSnapshotPath = resolve(fixtureRoot, "transpose.before.json");
    const afterSnapshotPath = resolve(fixtureRoot, "transpose.after.json");
    const deltaPath = resolve(fixtureRoot, "transpose.delta.json");
    run(process.execPath, [deletionTruth, "snapshot", "--phase", "before", "--repository", valueRoot, "--output", beforeSnapshotPath]);
    mkdirSync(dirname(resolve(valueRoot, moveSource)), { recursive: true });
    mkdirSync(dirname(resolve(valueRoot, moveTest)), { recursive: true });
    renameSync(resolve(valueRoot, legacySource), resolve(valueRoot, moveSource));
    renameSync(resolve(valueRoot, legacyTest), resolve(valueRoot, moveTest));
    git(valueRoot, ["add", "-A"]);
    git(valueRoot, ["commit", "-m", "fixture final transpose"]);
    run(process.execPath, [deletionTruth, "snapshot", "--phase", "after", "--repository", valueRoot, "--output", afterSnapshotPath]);
    run(process.execPath, [deletionTruth, "delta", "--before", beforeSnapshotPath, "--after", afterSnapshotPath, "--output", deltaPath]);
    const delta = parseJsonStrict(readFileSync(deltaPath));
    const consumer = resolveConsumerFixtureUniverse({
        constellation,
        name: "v29t-consumer-universe",
        edges: [{
            id: "value:parse-that:runtime",
            source: "value",
            target: "parse-that",
            package: "@mkbabb/parse-that",
            specifier: "@mkbabb/parse-that",
            kind: "runtime",
            evidencePaths: css.modules.map(({ typescript_path }) => resolve(valueRoot, typescript_path)),
        }],
    });
    consumerCaptureAuthority.register(consumer);

    const packed = packValue(valueRoot, resolve(fixtureRoot, "packed"));
    const publicArtifact = publicManifest(fixtureRoot, targetPath, target, packed, v00cReturn);
    const moveRows = rows.filter(({ disposition }) => disposition === "move");
    const effectDecisions = moveRows.map(({ owner: bound }) => ({
        wave_id: bound.wave_id,
        decision_id: bound.decision_id,
        decision_hash: bound.decision_hash,
    })).sort((left, right) => compareCanonicalText(`${left.wave_id}\0${left.decision_id}\0${left.decision_hash}`, `${right.wave_id}\0${right.decision_id}\0${right.decision_hash}`));
    const ledger = finalize({
        schema: "vnext-value-target-transpose/1",
        wave_id: "V29T",
        value_root: { path: realpathSync(valueRoot), repository_state_sha256: repositoryStateSha256(valueRoot) },
        current_inventory: ledgerEvidence(inventoryPath),
        current_inventory_return: structuredClone(coherentV00A.evidence),
        target_paths: ledgerEvidence(targetPath),
        conditional_resolutions: ledgerEvidence(resolutionArtifact.path),
        css_execution_manifest: ledgerEvidence(cssPath),
        public_surface: ledgerEvidence(publicArtifact.path),
        physical_truth: {
            receipt: { ...fileEvidence(deltaPath), receipt_hash: delta.receipt_hash },
            effects: [{
                decisions: effectDecisions,
                deleted: [...delta.deleted_paths],
                added: [...delta.added_paths],
                modified: [...delta.modified_paths],
            }],
        },
        rows,
        introduced_targets: [],
        result: {
            sources: target.library.files,
            tests: target.library.test.files,
            exports: publicArtifact.manifest.exports.map(({ id }) => id),
        },
        manifest_hash: "",
    }, "manifest_hash");
    const ledgerPath = resolve(fixtureRoot, "value-target-transpose.json");
    writeJson(ledgerPath, ledger);

    function writeV29TUniversalReturn(validationReceipt, name = "v29t-target-transpose") {
        const receiptPreimage = structuredClone(validationReceipt);
        delete receiptPreimage.receipt_hash;
        if (validationReceipt.receipt_hash !== sha256(canonicalize(receiptPreimage))) {
            throw new Error("V29T validation receipt has an invalid self-hash");
        }
        const validationPath = resolve(fixtureRoot, `${name}.validation-receipt.json`);
        writeJson(validationPath, validationReceipt);
        const truth = { receipt: delta, path: realpathSync(deltaPath), fileSha256: fileHash(deltaPath) };
        const deletion = ownerFixture.writeV29TDeletion({
            consumer,
            truth,
            tombstonePath: realpathSync(resolve(valueRoot, "TOMBSTONES.md")),
            pattern: v29tTombstonePattern,
        });
        const artifactBinding = (path, contractHash) => ({
            path: realpathSync(path),
            file_sha256: fileHash(path),
            contract_hash: contractHash,
        });
        const transposeAnnex = {
            schema: "vnext-value-target-transpose-return-annex/1",
            wave_id: "V29T",
            value_root: ledger.value_root.path,
            repository_state_sha256: ledger.value_root.repository_state_sha256,
            ledger: artifactBinding(ledgerPath, ledger.manifest_hash),
            current_inventory: artifactBinding(inventoryPath, inventory.inventory_hash),
            current_inventory_return: structuredClone(coherentV00A.evidence),
            target_paths: artifactBinding(targetPath, target.manifest_sha256),
            conditional_resolutions: artifactBinding(resolutionArtifact.path, resolutionArtifact.manifest.manifest_hash),
            css_execution_manifest: artifactBinding(cssPath, css.manifest_hash),
            public_surface: artifactBinding(publicArtifact.path, publicArtifact.manifest.manifest_hash),
            physical_truth_receipt: { ...fileEvidence(deltaPath), receipt_hash: delta.receipt_hash },
            validation_receipt: { ...fileEvidence(validationPath), receipt_hash: validationReceipt.receipt_hash },
        };
        return ownerFixture.writeV29TReturn({
            valueRoot: realpathSync(valueRoot),
            transposeAnnex,
            deletion,
            dependencyOverrides: coherentHistory,
            name,
        });
    }
    return {
        fixtureRoot,
        valueRoot: realpathSync(valueRoot),
        consumer,
        consumerCaptureAuthority,
        captureAuthorityArgs: () => consumerCaptureAuthority.captureAuthorityArgs(),
        consumerConstellation: constellation,
        ledger,
        ledgerPath: realpathSync(ledgerPath),
        writeV29TUniversalReturn,
        artifacts: {
            css: { value: css, path: realpathSync(cssPath) },
            delta: { value: delta, path: realpathSync(deltaPath) },
            inventory: { value: inventory, path: realpathSync(inventoryPath), v00aReturn: coherentV00A },
            publicSurface: publicArtifact,
            resolutions: resolutionArtifact,
            target: { value: target, path: realpathSync(targetPath) },
            v00cReturn,
            v16bReturn: coherentV16B,
            rawV00CReturn,
            rawV18HReturn: rawSelectedOwners.get("V18H"),
        },
        moves: { legacySource, legacyTest, moveSource, moveTest },
        preflight: { v00aLiveCaptureReplay: true, forgedReplayRejected: true },
    };
}
