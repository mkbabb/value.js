#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
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

import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";
import { createValueTargetResolutionFixture } from "./value-target-resolution-fixture.mjs";
import { valueTargetDecisionHash } from "./value-target-owner-return.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";

const validator = resolve(new URL("validate-value-public-surface.mjs", import.meta.url).pathname);
const directory = realpathSync(mkdtempSync(join(tmpdir(), "vnext-value-public-surface-")));
const expectedSpecifiers = ["./color", "./css", "./easing", "./math", "./path", "./transform"];
const v00cContractHash = loadWaveContracts().get("V00C").sha256;
const formationTargetPath = realpathSync(new URL("../VALUE-TARGET-PATHS.json", import.meta.url).pathname);
const ownerFixtureRoot = join(directory, "universal-owner-fixture");
mkdirSync(ownerFixtureRoot, { recursive: true });
const ownerFixture = createValueTargetResolutionFixture({ tempRoot: ownerFixtureRoot, formationTargetPath });
const failures = [];
const digest = (algorithm, bytes, encoding = "hex") => createHash(algorithm).update(bytes).digest(encoding);
const sha256 = (bytes) => digest("sha256", bytes);
const sha512 = (bytes) => digest("sha512", bytes);
const fileHash = (path) => sha256(readFileSync(path));
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
const ordered = (values) => [...values].sort(compareCanonicalText);

function selfHash(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    return sha256(canonicalize(preimage));
}

function finalized(value, member) {
    value[member] = selfHash(value, member);
    return value;
}

function fileEvidence(path) {
    return { path, file_sha256: fileHash(path) };
}

function archiveContents(tarball) {
    const listing = execFileSync("/usr/bin/tar", ["-tzf", tarball], { encoding: "utf8" })
        .trim().split("\n").filter((path) => path && !path.endsWith("/"));
    const contents = new Map();
    for (const archivePath of listing) {
        const path = archivePath.replace(/^package\//, "");
        contents.set(path, execFileSync("/usr/bin/tar", ["-xOzf", tarball, archivePath], { encoding: null }));
    }
    return contents;
}

function packedFixture(name, options = {}) {
    const packageRoot = join(directory, `package-${name}`);
    const dist = join(packageRoot, "dist");
    const destination = join(directory, `packed-${name}`);
    mkdirSync(dist, { recursive: true });
    mkdirSync(destination, { recursive: true });

    const exports = {};
    for (const specifier of expectedSpecifiers) {
        const slug = specifier.slice(2);
        const title = `${slug[0].toUpperCase()}${slug.slice(1)}`;
        let runtime = `export const ${title}Runtime = ${JSON.stringify(slug)};\n`;
        if (options.deadRuntime === specifier) runtime = `export const ${title}Runtime = undefined;\n`;
        if (options.timeoutRuntime === specifier) runtime = `for (;;) {}\nexport const ${title}Runtime = ${JSON.stringify(slug)};\n`;
        let declaration = `export declare const ${title}Runtime: ${JSON.stringify(slug)};\nexport type ${title}Options = { readonly capability: ${JSON.stringify(slug)} };\n`;
        if (options.extraRuntime?.specifier === specifier) runtime += `export const ${options.extraRuntime.symbol} = true;\n`;
        if (options.wildcardDeclaration === specifier) declaration = 'export * from "./private.d.ts";\n';
        writeFileSync(join(dist, `${slug}.js`), runtime);
        writeFileSync(join(dist, `${slug}.d.ts`), declaration);
        exports[specifier] = {
            types: `./dist/${slug}.d.ts`,
            import: `./dist/${slug}.js`,
        };
    }
    for (const [specifier, conditions] of Object.entries(options.extraExports ?? {})) exports[specifier] = conditions;
    if (options.sharedTransformTarget) exports["./transform"] = structuredClone(exports["./color"]);
    const packageJson = {
        name: "@mkbabb/value.js",
        version: "5.0.0",
        type: "module",
        ...(options.rootFallback ? { main: "./dist/color.js" } : {}),
        exports,
        files: ["dist"],
        ...(options.localDependency ? { dependencies: { "linked-fixture": "link:../linked-fixture" } } : {}),
    };
    writeJson(join(packageRoot, "package.json"), packageJson);
    const packed = JSON.parse(execFileSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", destination], {
        cwd: packageRoot,
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
    }));
    const tarball = realpathSync(join(destination, packed[0].filename));
    const tarballBytes = readFileSync(tarball);
    const contents = archiveContents(tarball);
    const files = [...contents].map(([path, bytes]) => ({ path, bytes: bytes.length, sha256: sha256(bytes) }))
        .sort((left, right) => compareCanonicalText(left.path, right.path));
    return {
        tarball,
        contents,
        receipt: {
            name: "@mkbabb/value.js",
            version: "5.0.0",
            tarball: {
                path: tarball,
                sha256: sha256(tarballBytes),
                sha512: sha512(tarballBytes),
                integrity: `sha512-${digest("sha512", tarballBytes, "base64")}`,
            },
            archive: {
                package_json_sha256: sha256(contents.get("package.json")),
                files,
                files_sha256: sha256(canonicalize(files)),
            },
        },
    };
}

function targetFixture(name, mutate = () => {}) {
    // Preserve target-tree/domain authority order. This is intentionally not lexical.
    const files = [
        "src/css/index.ts",
        "src/color/index.ts",
        "src/transform/index.ts",
        "src/easing/index.ts",
        "src/path/index.ts",
        "src/math/index.ts",
    ];
    const target = {
        schema: "vnext-value-target-paths/1",
        authority: { library: { topology: "exact" } },
        library: { files, test: { files: [] }, conditional_paths: [] },
        manifest_sha256: "",
    };
    mutate(target);
    finalized(target, "manifest_sha256");
    const path = realpathSync(directory);
    const targetPath = join(path, `target-${name}.json`);
    writeJson(targetPath, target);
    return {
        target,
        evidence: { ...fileEvidence(targetPath), manifest_sha256: target.manifest_sha256 },
    };
}

function semanticAssertionFixture(name, manifest, row, index) {
    const probePath = join(directory, `semantic-${name}-${index}.probe.ts`);
    const packageSpecifier = `${manifest.package.name}${row.specifier.slice(1)}`;
    const probe = row.surface === "type"
        ? `import type { ${row.symbol} } from ${JSON.stringify(packageSpecifier)};\ntype SemanticProbe = ${row.symbol};\nexport type { SemanticProbe };\n`
        : `import { ${row.symbol} } from ${JSON.stringify(packageSpecifier)};\nif (${row.symbol} === undefined) throw new Error("missing runtime export");\nexport const semanticProbe = ${row.symbol};\n`;
    writeFileSync(probePath, probe);

    const observation = {
        schema: "vnext-value-public-semantic-observation/1",
        wave_id: "V29T",
        assertion_id: `semantic:${row.id}`,
        export_id: row.id,
        package_sha512: manifest.package.tarball.sha512,
        target_manifest_sha256: manifest.target_paths.manifest_sha256,
        status: "PASS",
        observation_hash: "",
    };
    finalized(observation, "observation_hash");
    const observationPath = join(directory, `semantic-${name}-${index}.observation.json`);
    writeJson(observationPath, observation);

    const assertion = {
        id: `semantic:${row.id}`,
        export_id: row.id,
        status: "PASS",
        contract: `The packed ${row.id} capability preserves its owner-approved API behavior.`,
        probe: fileEvidence(probePath),
        observation: { ...fileEvidence(observationPath), observation_hash: observation.observation_hash },
        semantic_sha256: "",
    };
    return finalized(assertion, "semantic_sha256");
}

function exportRows(fixture) {
    const rows = [];
    for (const specifier of expectedSpecifiers) {
        const slug = specifier.slice(2);
        const title = `${slug[0].toUpperCase()}${slug.slice(1)}`;
        const declarationPath = `dist/${slug}.d.ts`;
        const runtimePath = `dist/${slug}.js`;
        const declaration = { path: declarationPath, sha256: sha256(fixture.contents.get(declarationPath)) };
        const runtimeSymbol = `${title}Runtime`;
        const runtimeId = `${specifier}#${runtimeSymbol}:runtime`;
        rows.push({
            id: runtimeId,
            specifier,
            symbol: runtimeSymbol,
            surface: "runtime",
            source: `src/${slug}/index.ts`,
            declaration,
            runtime: { path: runtimePath, sha512: sha512(fixture.contents.get(runtimePath)) },
            tarball_sha512: fixture.receipt.tarball.sha512,
            semantic_assertion_id: `semantic:${runtimeId}`,
            semantic_sha256: "0".repeat(64),
        });
        const typeSymbol = `${title}Options`;
        const typeId = `${specifier}#${typeSymbol}:type`;
        rows.push({
            id: typeId,
            specifier,
            symbol: typeSymbol,
            surface: "type",
            source: `src/${slug}/index.ts`,
            declaration,
            tarball_sha512: fixture.receipt.tarball.sha512,
            semantic_assertion_id: `semantic:${typeId}`,
            semantic_sha256: "0".repeat(64),
        });
    }
    return rows.sort((left, right) => compareCanonicalText(left.id, right.id));
}

function semanticFixture(name, manifest, mutate = () => {}) {
    const evidence = {
        schema: "vnext-value-public-semantic-evidence/1",
        wave_id: "V29T",
        package: {
            name: manifest.package.name,
            version: manifest.package.version,
            tarball_sha512: manifest.package.tarball.sha512,
        },
        target_manifest_sha256: manifest.target_paths.manifest_sha256,
        assertions: manifest.exports.map((row, index) => semanticAssertionFixture(name, manifest, row, index)),
        evidence_hash: "",
    };
    mutate(evidence);
    for (const assertion of evidence.assertions) finalized(assertion, "semantic_sha256");
    const assertionsByExport = new Map(evidence.assertions.map((assertion) => [assertion.export_id, assertion]));
    for (const row of manifest.exports) {
        const assertion = assertionsByExport.get(row.id);
        if (assertion) row.semantic_sha256 = assertion.semantic_sha256;
    }
    finalized(evidence, "evidence_hash");
    const path = join(directory, `semantic-${name}.json`);
    writeJson(path, evidence);
    return { ...fileEvidence(path), evidence_hash: evidence.evidence_hash };
}

function ownerReturnFixture(name, status = "COMPLETE") {
    if (name === "positive" && status === "COMPLETE") {
        const decisions = [".", "./quantize", "./value"].map((specifier) => {
            const decision = {
                decision_id: `package-tombstone:${specifier === "." ? "root" : specifier.slice(2)}`,
                kind: "package-tombstone",
                specifier,
                disposition: "tombstone",
                rationale: specifier === "."
                    ? "The root entrypoint has no independent capability job."
                    : `${specifier} is removed as a public key without an alias or forwarding entry.`,
                decision_hash: "",
            };
            decision.decision_hash = valueTargetDecisionHash("V00C", decision);
            return decision;
        });
        return ownerFixture.writeStandaloneV00CReturn({ decisions }).evidence;
    }
    const returned = {
        schema: "vnext-wave-return/2",
        wave_id: "V00C",
        status,
        scope: { wave_contract_sha256: v00cContractHash },
        return_hash: "",
    };
    finalized(returned, "return_hash");
    const path = join(directory, `v00c-${name}.return.json`);
    writeJson(path, returned);
    return { ...fileEvidence(path), return_hash: returned.return_hash };
}

function ownerReturnWithMissingInventoryAncestor(ownerReturn) {
    const returned = parseJsonStrict(readFileSync(ownerReturn.path));
    const binding = returned.scope.dependency_returns.find(({ wave_id }) => wave_id === "V00A");
    const ancestor = parseJsonStrict(readFileSync(binding.path));
    delete ancestor.annexes["value-current-inventory"];
    finalized(ancestor, "return_hash");
    const ancestorPath = join(directory, "v00a-missing-inventory.return.json");
    writeJson(ancestorPath, ancestor);
    binding.path = realpathSync(ancestorPath);
    binding.file_sha256 = fileHash(binding.path);
    binding.return_hash = ancestor.return_hash;
    finalized(returned, "return_hash");
    const returnPath = join(directory, "v00c-missing-inventory-ancestor.return.json");
    writeJson(returnPath, returned);
    const canonicalPath = realpathSync(returnPath);
    return { ...fileEvidence(canonicalPath), return_hash: returned.return_hash };
}

function tombstone(specifier, ownerReturnHash) {
    const row = {
        specifier,
        disposition: "tombstone",
        owner_wave_id: "V00C",
        owner_return_hash: ownerReturnHash,
        rationale: specifier === "."
            ? "The root entrypoint has no independent capability job."
            : `${specifier} is removed as a public key without an alias or forwarding entry.`,
        decision_sha256: "",
    };
    return finalized(row, "decision_sha256");
}

function baseManifest(packageFixture, target) {
    const tombstoneOwnerReturn = ownerReturnFixture("positive");
    const manifest = {
        schema: "vnext-value-public-surface/2",
        wave_id: "V29T",
        target_paths: target.evidence,
        package: structuredClone(packageFixture.receipt),
        exports: exportRows(packageFixture),
        tombstone_owner_return: tombstoneOwnerReturn,
        tombstones: [".", "./quantize", "./value"].map((specifier) => tombstone(specifier, tombstoneOwnerReturn.return_hash)),
        semantic_evidence: null,
        manifest_hash: "",
    };
    manifest.semantic_evidence = semanticFixture("positive", manifest);
    return manifest;
}

function rebindPackage(manifest, name, fixture, mutateSemantic = () => {}) {
    manifest.package = structuredClone(fixture.receipt);
    for (const row of manifest.exports) {
        row.declaration.sha256 = sha256(fixture.contents.get(row.declaration.path));
        if (row.runtime) row.runtime.sha512 = sha512(fixture.contents.get(row.runtime.path));
        row.tarball_sha512 = fixture.receipt.tarball.sha512;
    }
    manifest.semantic_evidence = semanticFixture(name, manifest, mutateSemantic);
}

function rebindTombstoneOwner(manifest, evidence) {
    manifest.tombstone_owner_return = evidence;
    for (const row of manifest.tombstones) {
        row.owner_return_hash = evidence.return_hash;
        finalized(row, "decision_sha256");
    }
}

function run(name, value, { rehash = true } = {}) {
    if (rehash) finalized(value, "manifest_hash");
    const path = join(directory, `manifest-${name}.json`);
    writeJson(path, value);
    return spawnSync(process.execPath, [
        validator,
        "--manifest", path,
        ...ownerFixture.captureAuthorityArgs(),
    ], {
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
    });
}

function reject(name, base, mutate, fragment, options) {
    const value = structuredClone(base);
    mutate(value);
    const result = run(name, value, options);
    if (result.status === 0 || !result.stderr.includes(fragment)) {
        failures.push(`${name} did not reject ${JSON.stringify(fragment)}: ${result.stderr}${result.stdout}`);
    }
}

try {
    const target = targetFixture("positive");
    const packed = packedFixture("positive");
    const base = baseManifest(packed, target);
    const positive = run("positive", structuredClone(base));
    if (
        positive.status !== 0
        || !positive.stdout.includes('"package":"@mkbabb/value.js@5.0.0"')
        || !positive.stdout.includes('"export_keys":6')
        || !positive.stdout.includes('"surface_rows":12')
        || !positive.stdout.includes('"tombstones":3')
    ) failures.push(`positive public surface rejected: ${positive.stderr}${positive.stdout}`);

    reject("stale-manifest-hash", base, (value) => { value.manifest_hash = "0".repeat(64); }, "/manifest_hash: computed", { rehash: false });
    reject("forged-derived-id", base, (value) => { value.exports[0].id = value.exports[0].id.replace("#", "#Forged"); }, "/id: expected derived ID");
    reject("duplicate-coordinate", base, (value) => {
        value.exports[1].specifier = value.exports[0].specifier;
        value.exports[1].symbol = value.exports[0].symbol;
        value.exports[1].surface = value.exports[0].surface;
    }, "duplicate specifier/symbol/surface coordinate");
    reject("invented-source", base, (value) => { value.exports[0].source = "src/invented.ts"; }, "not a member of the bound final target source vector");
    reject("wrong-declaration-hash", base, (value) => { value.exports[0].declaration.sha256 = "0".repeat(64); }, "does not bind packed declaration bytes");
    reject("wrong-runtime-hash", base, (value) => {
        const row = value.exports.find(({ surface }) => surface === "runtime");
        row.runtime.sha512 = "0".repeat(128);
    }, "does not bind packed runtime bytes");
    reject("wrong-row-tarball-hash", base, (value) => { value.exports[0].tarball_sha512 = "0".repeat(128); }, "must bind the exact packed tarball");
    reject("wrong-row-semantic-hash", base, (value) => { value.exports[0].semantic_sha256 = "0".repeat(64); }, "must project the exact semantic assertion hash");
    reject("type-carries-runtime", base, (value) => {
        const row = value.exports.find(({ surface }) => surface === "type");
        row.runtime = { path: "dist/color.js", sha512: "0".repeat(128) };
    }, "oneOf");
    reject("runtime-missing-runtime", base, (value) => {
        const row = value.exports.find(({ surface }) => surface === "runtime");
        delete row.runtime;
    }, "oneOf");
    reject("missing-surface-row", base, (value) => { value.exports.pop(); }, "rows must exactly equal packed");
    reject("wrong-archive-inventory", base, (value) => { value.package.archive.files.pop(); }, "must exactly enumerate every packed regular file");
    reject("wrong-tarball-sha512", base, (value) => { value.package.tarball.sha512 = "0".repeat(128); }, "/package/tarball/sha512: computed");
    reject("missing-root-decision", base, (value) => { value.tombstones.shift(); }, "/tombstones: exact ordered decisions");
    reject("forged-tombstone-decision", base, (value) => { value.tombstones[0].decision_sha256 = "0".repeat(64); }, "/decision_sha256: computed");
    reject("wrong-owner-return-file-hash", base, (value) => { value.tombstone_owner_return.file_sha256 = "0".repeat(64); }, "/tombstone_owner_return/file_sha256: computed");
    reject("wrong-tombstone-owner-projection", base, (value) => { value.tombstones[0].owner_return_hash = "0".repeat(64); }, "must bind the canonical V00C return");
    reject("refused-tombstone-owner", base, (value) => {
        rebindTombstoneOwner(value, ownerReturnFixture("refused", "REFUSED"));
    }, "terminal COMPLETE V00C return required");
    reject("minimal-forged-v00c-owner", base, (value) => {
        rebindTombstoneOwner(value, ownerReturnFixture("minimal-forgery", "COMPLETE"));
    }, "universal cached-return validation failed");
    reject("v00c-owner-with-unvalidated-ancestor", base, (value) => {
        rebindTombstoneOwner(value, ownerReturnWithMissingInventoryAncestor(value.tombstone_owner_return));
    }, "/annexes/value-current-inventory: required property missing");

    reject("conditional-target", base, (value) => {
        const conditional = targetFixture("conditional", (copy) => {
            copy.authority.library.topology = "conditional-branch-family";
            copy.library.conditional_paths = [{ source: "src/color/index.ts" }];
        });
        value.target_paths = conditional.evidence;
        value.semantic_evidence = semanticFixture("conditional-target", value);
    }, "final exact topology with zero conditional rows required");

    reject("missing-semantic-assertion", base, (value) => {
        value.semantic_evidence = semanticFixture("missing-assertion", value, (evidence) => { evidence.assertions.pop(); });
    }, "one exact assertion per public surface row required");
    reject("failed-semantic-assertion", base, (value) => {
        value.semantic_evidence = semanticFixture("failed-assertion", value, (evidence) => { evidence.assertions[0].status = "FAIL"; });
    }, "/status: PASS required");
    reject("wrong-semantic-package", base, (value) => {
        value.semantic_evidence = semanticFixture("wrong-package", value, (evidence) => { evidence.package.tarball_sha512 = "0".repeat(128); });
    }, "must bind the exact packed package");
    reject("missing-semantic-probe", base, (value) => {
        value.semantic_evidence = semanticFixture("missing-probe", value, (evidence) => {
            evidence.assertions[0].probe = { path: join(directory, "absent-semantic-probe.ts"), file_sha256: "0".repeat(64) };
        });
    }, "/probe/path: missing file");
    reject("wrong-semantic-probe-import", base, (value) => {
        value.semantic_evidence = semanticFixture("wrong-probe-import", value, (evidence) => {
            const assertion = evidence.assertions[0];
            const wrongPath = join(directory, "wrong-semantic-import.probe.ts");
            const row = value.exports.find(({ id }) => id === assertion.export_id);
            writeFileSync(wrongPath, `import { ${row.symbol} } from "@mkbabb/value.js/math";\nexport const observed = ${row.symbol};\n`);
            assertion.probe = fileEvidence(wrongPath);
        });
    }, "exactly one");

    const rootExport = packedFixture("root-export", {
        extraExports: { ".": { types: "./dist/color.d.ts", import: "./dist/color.js" } },
    });
    reject("resurrected-root-export", base, (value) => rebindPackage(value, "root-export", rootExport), "exact ordered keys");

    const valueExport = packedFixture("value-export", {
        extraExports: { "./value": { types: "./dist/color.d.ts", import: "./dist/color.js" } },
    });
    reject("resurrected-value-export", base, (value) => rebindPackage(value, "value-export", valueExport), "exact ordered keys");

    const hiddenRuntime = packedFixture("hidden-runtime", {
        extraRuntime: { specifier: "./color", symbol: "HiddenRuntime" },
    });
    reject("hidden-runtime-symbol", base, (value) => rebindPackage(value, "hidden-runtime", hiddenRuntime), "rows must exactly equal packed JavaScript exports");

    const sharedTarget = packedFixture("shared-target", { sharedTransformTarget: true });
    reject("forwarding-shared-target", base, (value) => rebindPackage(value, "shared-target", sharedTarget), "forwarding alias shares another public");

    const rootFallback = packedFixture("root-fallback", { rootFallback: true });
    reject("root-main-fallback", base, (value) => rebindPackage(value, "root-fallback", rootFallback), "root entrypoint fallback forbidden");

    const wildcard = packedFixture("wildcard", { wildcardDeclaration: "./color" });
    reject("wildcard-declaration", base, (value) => rebindPackage(value, "wildcard", wildcard), "forwarding re-exports are forbidden");

    const deadRuntime = packedFixture("dead-runtime", { deadRuntime: "./color" });
    reject("dead-packed-runtime", base, (value) => rebindPackage(value, "dead-runtime", deadRuntime), "installed-package runtime probe failed");

    const timeoutRuntime = packedFixture("timeout-runtime", { timeoutRuntime: "./color" });
    reject("timeout-packed-runtime", base, (value) => rebindPackage(value, "timeout-runtime", timeoutRuntime), "installed-package probe timed out");

    reject("forged-pass-observation", base, (value) => {
        value.semantic_evidence = semanticFixture("forged-pass", value, (semantic) => {
            const assertion = semantic.assertions.find(({ export_id }) => export_id.endsWith(":runtime"));
            const row = value.exports.find(({ id }) => id === assertion.export_id);
            const path = join(directory, "forged-pass.probe.ts");
            writeFileSync(path, `import { ${row.symbol} } from ${JSON.stringify(`${value.package.name}${row.specifier.slice(1)}`)};\nvoid ${row.symbol};\nthrow new Error("forged PASS");\n`);
            assertion.probe = fileEvidence(path);
        });
    }, "installed-package runtime probe failed");

    reject("source-import-probe", base, (value) => {
        value.semantic_evidence = semanticFixture("source-import", value, (semantic) => {
            const assertion = semantic.assertions.find(({ export_id }) => export_id.endsWith(":runtime"));
            const row = value.exports.find(({ id }) => id === assertion.export_id);
            const path = join(directory, "source-import.probe.ts");
            writeFileSync(path, `import { ${row.symbol} } from ${JSON.stringify(`${value.package.name}${row.specifier.slice(1)}`)};\nimport "../src/private.ts";\nvoid ${row.symbol};\n`);
            assertion.probe = fileEvidence(path);
        });
    }, "source/workspace import forbidden");

    const linkedDependency = packedFixture("linked-dependency", { localDependency: true });
    reject("linked-package-dependency", base, (value) => rebindPackage(value, "linked-dependency", linkedDependency), "source/workspace/local dependency forbidden");
} finally {
    rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({
    schema: "vnext-value-public-surface-selftest/1",
    positive: 1,
    adversarial_rejections: 37,
    packed_fixture: "npm-pack",
})}\n`);
