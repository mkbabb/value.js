#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalize, compareCanonicalText, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import {
  replayKeyframesTransposeLedger,
  validateHistoricalKeyframesReturn,
  validateKeyframesTransposeReceipt
} from "./keyframes-proof-contract.mjs";
import {
  computeVirtualModuleGraphs,
  fileSha256,
  hashWithout,
  inspectTarball,
  ordered,
  parseArchiveJson,
  readStrictJson,
  requireCanonicalFile,
  same,
  sha256,
  sha512
} from "./keyframes-contract.mjs";
const ts = createRequire(import.meta.url)("typescript"), tscPath = createRequire(import.meta.url).resolve("typescript/lib/tsc.js"), root = resolve(dirname(fileURLToPath(import.meta.url)), ".."), canonicalTargetPath = resolve(root, "KEYFRAMES-TARGET-PATHS.json"), targetValidator = resolve(root, "tools/validate-target-paths.mjs"), manifestSchemaPath = resolve(root, "keyframes-public-package.schema.json"), snapshotSchemaPath = resolve(root, "keyframes-public-package-snapshot.schema.json"), validationSchemaPath = resolve(root, "keyframes-public-package-validation.schema.json");
let manifestPath, snapshotPath, snapshotOutPath, consumerCaptureAuthorityArgs;
for (let index = 2; index < process.argv.length; index += 1)
  process.argv[index] === "--manifest" && process.argv[index + 1] ? manifestPath = resolve(process.argv[++index]) : process.argv[index] === "--snapshot" && process.argv[index + 1] ? snapshotPath = resolve(process.argv[++index]) : process.argv[index] === "--snapshot-out" && process.argv[index + 1] ? snapshotOutPath = resolve(process.argv[++index]) : process.argv[index] === "--consumer-immutable-capture-authority" && process.argv[index + 1] && process.argv[index + 2] && process.argv[index + 3] && consumerCaptureAuthorityArgs === void 0 ? (consumerCaptureAuthorityArgs = process.argv.slice(index, index + 4), index += 3) : (process.stderr.write(`usage: node validate-keyframes-public-package.mjs (--manifest <path> --snapshot-out <path> | --snapshot <path>) [--consumer-immutable-capture-authority <path> <file-sha256> <authority-hash>]
`), process.exit(2));
(!manifestPath && !snapshotPath || manifestPath && snapshotPath || snapshotPath && snapshotOutPath || manifestPath && !snapshotOutPath) && (process.stderr.write(`usage: node validate-keyframes-public-package.mjs (--manifest <path> --snapshot-out <path> | --snapshot <path>) [--consumer-immutable-capture-authority <path> <file-sha256> <authority-hash>]
`), process.exit(2));
const failures = [], fail = (message) => failures.push(message), exactKeys = (value, expected, pointer) => {
  const actual = value && typeof value == "object" && !Array.isArray(value) ? Object.keys(value) : [];
  same(actual, expected) || fail(`${pointer}: exact ordered keys ${expected.join(", ")} required`);
};
function canonicalBase64(bytes) {
  return bytes.toString("base64");
}
function embeddedTarball(row, label) {
  const bytes = Buffer.from(row?.bytes_base64 ?? "", "base64");
  return canonicalBase64(bytes) !== row?.bytes_base64 && fail(`${label}/bytes_base64: exact canonical base64 required`), row?.bytes !== bytes.length && fail(`${label}/bytes: computed ${bytes.length}`), row?.sha256 !== sha256(bytes) && fail(`${label}/sha256: computed ${sha256(bytes)}`), row?.sha512 !== sha512(bytes) && fail(`${label}/sha512: computed ${sha512(bytes)}`), row?.integrity !== `sha512-${Buffer.from(sha512(bytes), "hex").toString("base64")}` && fail(`${label}/integrity: exact SHA-512 SRI required`), bytes;
}
function embeddedJson(row, label) {
  const bytes = Buffer.from(row?.bytes_base64 ?? "", "base64");
  canonicalBase64(bytes) !== row?.bytes_base64 && fail(`${label}/bytes_base64: exact canonical base64 required`), row?.bytes !== bytes.length && fail(`${label}/bytes: computed ${bytes.length}`), row?.file_sha256 !== sha256(bytes) && fail(`${label}/file_sha256: computed ${sha256(bytes)}`);
  try {
    return { bytes, value: parseJsonStrict(bytes) };
  } catch (error) {
    return fail(`${label}: strict embedded JSON required: ${error.message}`), { bytes, value: void 0 };
  }
}
function toolBinding(path) {
  const canonical = realpathSync(path);
  return { path: canonical, file_sha256: fileSha256(canonical) };
}
function exportedBindingNames(name, names = []) {
  if (ts.isIdentifier(name)) names.push(name.text);
  else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name))
    for (const element of name.elements) ts.isBindingElement(element) && exportedBindingNames(element.name, names);
  return names;
}
function moduleExports(path, content, declaration) {
  const source = ts.createSourceFile(path, content.toString("utf8"), ts.ScriptTarget.Latest, !0, declaration ? ts.ScriptKind.TS : ts.ScriptKind.JS);
  source.parseDiagnostics.length && fail(`/package/archive/${path}: syntax diagnostic ${ts.flattenDiagnosticMessageText(source.parseDiagnostics[0].messageText, " ")}`);
  const types = /* @__PURE__ */ new Set(), runtime = /* @__PURE__ */ new Set(), add = (collection, name) => {
    name === "default" ? fail(`/package/archive/${path}: default exports are forbidden`) : collection.add(name);
  };
  for (const statement of source.statements) {
    if (ts.isExportAssignment(statement)) {
      fail(`/package/archive/${path}: default export assignment is forbidden`);
      continue;
    }
    if (ts.isExportDeclaration(statement)) {
      if (!statement.exportClause || !ts.isNamedExports(statement.exportClause)) {
        fail(`/package/archive/${path}: wildcard and namespace exports are forbidden`);
        continue;
      }
      for (const element of statement.exportClause.elements) {
        const collection = declaration && (statement.isTypeOnly || element.isTypeOnly) ? types : runtime;
        add(collection, element.name.text);
      }
      continue;
    }
    if (statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
      if (statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword)) {
        fail(`/package/archive/${path}: default exports are forbidden`);
        continue;
      }
      if (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) add(types, statement.name.text);
      else if (ts.isVariableStatement(statement))
        for (const declarationNode of statement.declarationList.declarations)
          for (const name of exportedBindingNames(declarationNode.name)) add(runtime, name);
      else (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isEnumDeclaration(statement) || ts.isModuleDeclaration(statement)) && (statement.name && ts.isIdentifier(statement.name) ? add(runtime, statement.name.text) : fail(`/package/archive/${path}: exported declaration requires a name`));
    }
  }
  return { types: ordered(types), runtime: ordered(runtime) };
}
function closure(graph, entry) {
  const adjacency = new Map(graph.nodes.map((node) => [node, []]));
  for (const { from, to } of graph.edges) adjacency.get(from)?.push(to);
  const seen = /* @__PURE__ */ new Set(), pending = [entry];
  for (; pending.length; ) {
    const node = pending.pop();
    if (!seen.has(node)) {
      seen.add(node);
      for (const child of adjacency.get(node) ?? []) pending.push(child);
    }
  }
  return [...seen].sort(compareCanonicalText);
}
function installedFiles(rootPath) {
  const rows = [], walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: !0 }).sort((left, right) => compareCanonicalText(left.name, right.name))) {
      const path = resolve(directory, entry.name), member = relative(rootPath, path).split(sep).join("/");
      if (entry.isSymbolicLink()) throw new Error(`workspace/link install is forbidden at ${member}`);
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) {
        const bytes = readFileSync(path);
        rows.push({ path: member, bytes: bytes.length, sha256: sha256(bytes) });
      } else throw new Error(`non-regular installed entry ${member}`);
    }
  };
  return walk(rootPath), rows.sort((left, right) => compareCanonicalText(left.path, right.path));
}
function processReceipt(label, executable, args, options, timeout) {
  const result = spawnSync(executable, args, {
    ...options,
    encoding: null,
    timeout,
    killSignal: "SIGKILL",
    maxBuffer: 33554432,
    shell: !1
  }), stdout = result.stdout ?? Buffer.alloc(0), stderr = result.stderr ?? Buffer.alloc(0), normalizedStdout = label === "npm-install" ? Buffer.from(stdout.toString("utf8").replace(/\bin\s+[0-9.]+(?:ms|s|m)\b/g, "in <elapsed>"), "utf8") : stdout, timedOut = result.error?.code === "ETIMEDOUT" || result.signal === "SIGKILL", receipt2 = {
    label,
    executable: realpathSync(executable),
    args,
    exit_code: Number.isInteger(result.status) ? result.status : -1,
    signal: result.signal ?? "none",
    timed_out: timedOut,
    stdout_sha256: sha256(normalizedStdout),
    stdout_normalization: label === "npm-install" ? "npm-elapsed-duration" : "none",
    stderr_sha256: sha256(stderr)
  };
  return result.error && !timedOut && fail(`/install/${label}: ${result.error.message}`), timedOut && fail(`/install/${label}: process timed out`), result.status !== 0 && fail(`/install/${label}: exit ${result.status}; stderr ${stderr.toString("utf8").trim()}`), receipt2;
}
function freshInstallAndProbe(contract, tarballPath, expectedExports2, archiveFiles) {
  const crater = realpathSync(mkdtempSync(join(tmpdir(), "vnext-keyframes-install-")));
  try {
    const artifactDirectory = join(crater, "artifacts");
    mkdirSync(artifactDirectory);
    const dependencyTarballs = [];
    for (const [index, dependency] of (contract.dependencies ?? []).entries()) {
      const inspectedDependency = inspectTarball(dependency.tarball?.path);
      for (const member of ["sha256", "sha512", "integrity"])
        dependency.tarball?.[member] !== inspectedDependency[member] && fail(`/install_contract/dependencies/${index}/tarball/${member}: computed ${inspectedDependency[member]}`);
      const dependencyPackage = parseArchiveJson(inspectedDependency.contents, "package.json");
      (dependencyPackage.name !== dependency.name || dependencyPackage.version !== dependency.version) && fail(`/install_contract/dependencies/${index}: tarball identity mismatch`);
      const stablePath = join(artifactDirectory, `dependency-${index}.tgz`);
      writeFileSync(stablePath, readFileSync(dependency.tarball.path)), dependencyTarballs.push(`./artifacts/dependency-${index}.tgz`);
    }
    writeFileSync(join(artifactDirectory, "keyframes.tgz"), readFileSync(tarballPath)), writeFileSync(join(crater, "package.json"), `${JSON.stringify({ name: "keyframes-install-crater", version: "1.0.0", private: !0, type: "module" }, null, 2)}
`);
    const environment = {
      PATH: process.env.PATH,
      LANG: "C",
      LC_ALL: "C",
      npm_config_cache: join(crater, ".npm-cache"),
      npm_config_offline: "true",
      npm_config_audit: "false",
      npm_config_fund: "false",
      npm_config_ignore_scripts: "true",
      npm_config_update_notifier: "false"
    }, npmPath = execFilePath("npm"), install = processReceipt(
      "npm-install",
      npmPath,
      ["install", "--offline", "--ignore-scripts", "--no-audit", "--no-fund", ...dependencyTarballs, "./artifacts/keyframes.tgz"],
      { cwd: crater, env: environment },
      Math.max(contract.timeout_ms, 1e4)
    ), packagePath = resolve(crater, "node_modules/@mkbabb/keyframes.js");
    (!existsSync(packagePath) || lstatSync(packagePath).isSymbolicLink() || realpathSync(packagePath) !== packagePath) && fail("/install/package: canonical no-link installed package required");
    const installed = existsSync(packagePath) ? installedFiles(packagePath) : [];
    same(installed, archiveFiles) || fail("/install/package: installed file tree differs from exact tarball archive");
    const lockPath = resolve(crater, "package-lock.json");
    existsSync(lockPath) || fail("/install/package-lock.json: npm did not persist an install lock");
    const runtime = [], type = [], probeRows = [".", "./engine"].map((specifier) => {
      const rows = expectedExports2.filter((row) => row.specifier === specifier);
      return {
        specifier,
        runtime_symbols: rows.filter(({ surface }) => surface === "runtime").map(({ symbol }) => symbol).sort(compareCanonicalText),
        type_symbols: rows.filter(({ surface }) => surface === "type").map(({ symbol }) => symbol).sort(compareCanonicalText)
      };
    });
    same(contract.probes, probeRows) || fail("/install_contract/probes: must exactly derive from public export rows");
    for (const [index, probe] of probeRows.entries()) {
      const packageSpecifier = probe.specifier === "." ? "@mkbabb/keyframes.js" : `@mkbabb/keyframes.js${probe.specifier.slice(1)}`, runtimeName = `runtime-${index}.mjs`, runtimePath = join(crater, runtimeName);
      writeFileSync(runtimePath, [
        `const surface = await import(${JSON.stringify(packageSpecifier)});`,
        `const expected = ${JSON.stringify(probe.runtime_symbols)};`,
        "const actual = Object.keys(surface).sort();",
        "if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`runtime exports ${JSON.stringify(actual)}; expected ${JSON.stringify(expected)}`);",
        `process.stdout.write(${JSON.stringify(`${probe.specifier} runtime PASS
`)});`,
        ""
      ].join(`
`)), runtime.push(processReceipt(`runtime-${index}`, process.execPath, [runtimeName], {
        cwd: crater,
        env: { PATH: process.env.PATH, LANG: "C", LC_ALL: "C", NODE_NO_WARNINGS: "1" }
      }, contract.timeout_ms));
      const imports = [
        ...probe.runtime_symbols,
        ...probe.type_symbols.map((symbol) => `type ${symbol}`)
      ].join(", "), typeName = `type-${index}.mts`, typePath = join(crater, typeName);
      writeFileSync(typePath, [
        `import { ${imports} } from ${JSON.stringify(packageSpecifier)};`,
        ...probe.runtime_symbols.map((symbol) => `void ${symbol};`),
        ...probe.type_symbols.map((symbol) => `let ${symbol[0].toLowerCase()}${symbol.slice(1)}: ${symbol} | undefined; void ${symbol[0].toLowerCase()}${symbol.slice(1)};`),
        ""
      ].join(`
`)), type.push(processReceipt(`type-${index}`, process.execPath, [tscPath, "--noEmit", "--strict", "--skipLibCheck", "false", "--target", "ES2022", "--module", "NodeNext", "--moduleResolution", "NodeNext", typeName], {
        cwd: crater,
        env: { PATH: process.env.PATH, LANG: "C", LC_ALL: "C" }
      }, contract.timeout_ms));
    }
    return {
      install,
      installed_files_sha256: sha256(canonicalize(installed)),
      package_lock_sha256: existsSync(lockPath) ? fileSha256(lockPath) : "0".repeat(64),
      workspace_links: [],
      runtime,
      type
    };
  } finally {
    rmSync(crater, { recursive: !0, force: !0 });
  }
}
function execFilePath(command) {
  const result = spawnSync("/usr/bin/env", ["which", command], { encoding: "utf8", shell: !1 });
  if (result.status !== 0) throw new Error(`cannot resolve ${command}`);
  return realpathSync(result.stdout.trim());
}
let manifest, target, snapshot, replayRoot, packageTarballPath, dependencyTarballPaths, manifestBinding, targetBinding;
const nodeBinding = toolBinding(process.execPath), npmBinding = toolBinding(execFilePath("npm")), typescriptBinding = toolBinding(tscPath);
try {
  if (snapshotPath) {
    snapshot = readStrictJson(snapshotPath, "/snapshot");
    const snapshotSchema = readStrictJson(snapshotSchemaPath, "/snapshot-schema");
    failures.push(...validateJsonSchema(snapshot, snapshotSchema));
    const snapshotHash = hashWithout(snapshot, "snapshot_hash");
    snapshot.snapshot_hash !== snapshotHash && fail(`/snapshot/snapshot_hash: computed ${snapshotHash}`);
    for (const [name, expected] of Object.entries({ node: nodeBinding, npm: npmBinding, typescript: typescriptBinding }))
      same(snapshot.toolchain?.[name], expected) || fail(`/snapshot/toolchain/${name}: exact replay executable identity required`);
    const embeddedManifest = embeddedJson(snapshot.manifest, "/snapshot/manifest"), embeddedTarget = embeddedJson(snapshot.target_paths, "/snapshot/target_paths");
    manifest = embeddedManifest.value, target = embeddedTarget.value, manifestPath = snapshot.manifest.path, manifestBinding = {
      path: snapshot.manifest.path,
      file_sha256: snapshot.manifest.file_sha256,
      manifest_hash: snapshot.manifest.manifest_hash
    }, targetBinding = {
      path: snapshot.target_paths.path,
      file_sha256: snapshot.target_paths.file_sha256,
      manifest_sha256: snapshot.target_paths.manifest_hash
    }, replayRoot = realpathSync(mkdtempSync(join(tmpdir(), "vnext-keyframes-package-replay-"))), process.once("exit", () => rmSync(replayRoot, { recursive: !0, force: !0 })), packageTarballPath = join(replayRoot, "keyframes.tgz"), writeFileSync(packageTarballPath, embeddedTarball(snapshot.tarballs?.package, "/snapshot/tarballs/package")), dependencyTarballPaths = (snapshot.tarballs?.dependencies ?? []).map((row, index) => {
      const path = join(replayRoot, `dependency-${index}.tgz`);
      return writeFileSync(path, embeddedTarball(row, `/snapshot/tarballs/dependencies/${index}`)), path;
    });
  } else
    manifest = readStrictJson(manifestPath, "/manifest"), manifestBinding = { path: manifestPath, file_sha256: fileSha256(manifestPath), manifest_hash: manifest?.manifest_hash }, packageTarballPath = manifest.package?.tarball?.path, dependencyTarballPaths = (manifest.install_contract?.dependencies ?? []).map((row) => row.tarball?.path);
  const schema = readStrictJson(manifestSchemaPath, "/schema");
  failures.push(...validateJsonSchema(manifest, schema));
} catch (error) {
  fail(`${snapshotPath ? "/snapshot" : "/manifest"}: ${error.message}`);
}
manifest || (process.stderr.write(`${failures.join(`
`)}
`), process.exit(1));
const manifestHash = hashWithout(manifest, "manifest_hash");
manifest.manifest_hash !== manifestHash && fail(`/manifest_hash: computed ${manifestHash}`), manifestBinding?.manifest_hash !== manifestHash && fail(`/manifest: embedded manifest binding must carry computed self-hash ${manifestHash}`);
let sourceTransposeReceipt, sourceHistoricalCertificate;
function validateSourceTranspose() {
  try {
    const source = manifest.source_transpose_validation, sourceRows = snapshot?.source_transpose_validation, readSource = (member, binding) => {
      if (!snapshot)
        return requireCanonicalFile(binding?.path, `/source_transpose_validation/${member}/path`), binding.file_sha256 !== fileSha256(binding.path) && fail(`/source_transpose_validation/${member}/file_sha256: file digest mismatch`), readStrictJson(binding.path, `/source_transpose_validation/${member}`);
      const embedded = embeddedJson(sourceRows?.[member], `/snapshot/source_transpose_validation/${member}`);
      return (sourceRows?.[member]?.path !== binding?.path || sourceRows?.[member]?.file_sha256 !== binding?.file_sha256) && fail(`/snapshot/source_transpose_validation/${member}: must exactly bind the package manifest`), embedded.value;
    }, sourceReturn = readSource("return", source?.return), sourceLedger = readSource("ledger", source?.ledger), persistedReceipt = readSource("receipt", source?.receipt);
    (source?.wave_id !== "K22T" || source?.scope !== "library") && fail("/source_transpose_validation: exact K22T/library identity required");
    const sourceReturnHash = hashWithout(sourceReturn, "return_hash");
    (sourceReturn?.wave_id !== "K22T" || sourceReturn?.status !== "COMPLETE" || sourceReturn?.return_hash !== sourceReturnHash || source?.return?.return_hash !== sourceReturnHash) && fail("/source_transpose_validation/return: exact terminal self-hashed K22T return required");
    let certificateEvidence = source.return;
    if (snapshot) {
      const path = join(replayRoot, "k22t-source.return.json");
      writeFileSync(path, Buffer.from(sourceRows.return.bytes_base64, "base64")), certificateEvidence = {
        path: realpathSync(path),
        file_sha256: fileSha256(path),
        return_hash: sourceReturnHash
      };
    }
    const replayedCertificate = validateHistoricalKeyframesReturn(
      certificateEvidence,
      "K22T",
      "K23",
      "historical-certificate",
      consumerCaptureAuthorityArgs ? { consumerCaptureAuthorityArgs } : void 0
    ).validation_receipt;
    sourceHistoricalCertificate = snapshot ? sourceRows?.historical_certificate : replayedCertificate, same(sourceHistoricalCertificate, replayedCertificate) || fail("/snapshot/source_transpose_validation/historical_certificate: persisted certificate differs from fresh historical K22T gate replay");
    const transposeAnnex = sourceReturn?.annexes?.["keyframes-target-transpose"];
    (transposeAnnex?.wave_id !== "K22T" || transposeAnnex?.scope !== "library" || !same(transposeAnnex?.ledger, source?.ledger) || !same(transposeAnnex?.validation_receipt, {
      path: source?.receipt?.path,
      file_sha256: source?.receipt?.file_sha256,
      receipt_hash: source?.receipt?.receipt_hash
    })) && fail("/source_transpose_validation/return: typed K22T annex must exactly bind the ledger and validation receipt");
    const ledgerHash = hashWithout(sourceLedger, "manifest_hash");
    (sourceLedger?.wave_id !== "K22T" || sourceLedger?.scope !== "library" || sourceLedger?.manifest_hash !== ledgerHash || source?.ledger?.manifest_hash !== ledgerHash) && fail("/source_transpose_validation/ledger: exact self-hashed K22T/library ledger required");
    let persistedReceiptPath = source?.receipt?.path;
    snapshot && (persistedReceiptPath = join(replayRoot, "k22t-validation-receipt.json"), writeFileSync(persistedReceiptPath, Buffer.from(sourceRows.receipt.bytes_base64, "base64"))), sourceTransposeReceipt = validateKeyframesTransposeReceipt(persistedReceiptPath), (!same(sourceTransposeReceipt, persistedReceipt) || sourceTransposeReceipt.wave_id !== "K22T" || sourceTransposeReceipt.scope !== "library" || !same(sourceTransposeReceipt.ledger, source.ledger) || sourceTransposeReceipt.semantic_hash !== source.receipt.semantic_hash || sourceTransposeReceipt.receipt_hash !== source.receipt.receipt_hash) && fail("/source_transpose_validation/receipt: exact specialized K22T/library receipt and ledger binding required");
    const replayed = replayKeyframesTransposeLedger(
      source.ledger.path,
      consumerCaptureAuthorityArgs ? { consumerCaptureAuthorityArgs } : void 0
    );
    same(replayed, sourceTransposeReceipt) || fail("/source_transpose_validation/receipt: persisted receipt differs from immutable K22T ledger replay");
  } catch (error) {
    fail(`/source_transpose_validation: ${error.message}`);
  }
}
try {
  manifest.target_paths?.path !== canonicalTargetPath && fail(`/target_paths/path: canonical ${canonicalTargetPath} required`);
  let targetValidationPath = manifest.target_paths?.path;
  snapshot ? (targetValidationPath = join(replayRoot, "KEYFRAMES-TARGET-PATHS.json"), writeFileSync(targetValidationPath, Buffer.from(snapshot.target_paths.bytes_base64, "base64")), same(manifest.target_paths, targetBinding) || fail("/target_paths: package manifest must exactly bind embedded target authority")) : (requireCanonicalFile(manifest.target_paths?.path, "/target_paths/path"), manifest.target_paths.file_sha256 !== fileSha256(manifest.target_paths.path) && fail("/target_paths/file_sha256: file digest mismatch"), target = readStrictJson(manifest.target_paths.path, "/target_paths"), targetBinding = {
    path: manifest.target_paths.path,
    file_sha256: manifest.target_paths.file_sha256,
    manifest_sha256: manifest.target_paths.manifest_sha256
  });
  const targetHash = hashWithout(target, "manifest_sha256");
  (target.schema !== "vnext-keyframes-target-paths/1" || target.manifest_sha256 !== targetHash || manifest.target_paths.manifest_sha256 !== targetHash) && fail("/target_paths: exact self-hashed Keyframes target authority required");
  const validation = spawnSync(process.execPath, [targetValidator, "--keyframes-manifest", targetValidationPath], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024
  });
  validation.status !== 0 && fail(`/target_paths: canonical validator failed: ${(validation.stderr || validation.stdout).trim()}`);
} catch (error) {
  fail(`/target_paths: ${error.message}`);
}
let inspected;
try {
  inspected = inspectTarball(packageTarballPath);
  for (const member of ["sha256", "sha512", "integrity"])
    manifest.package.tarball[member] !== inspected[member] && fail(`/package/tarball/${member}: computed ${inspected[member]}`);
  same(manifest.package.archive.files, inspected.files) || fail("/package/archive/files: exact packed regular-file vector required");
  const filesHash = sha256(canonicalize(inspected.files));
  if (manifest.package.archive.files_sha256 !== filesHash && fail(`/package/archive/files_sha256: computed ${filesHash}`), snapshot) {
    const packageProjection = {
      path: manifest.package.tarball.path,
      sha256: manifest.package.tarball.sha256,
      sha512: manifest.package.tarball.sha512,
      integrity: manifest.package.tarball.integrity
    }, embeddedProjection = {
      path: snapshot.tarballs.package.path,
      sha256: snapshot.tarballs.package.sha256,
      sha512: snapshot.tarballs.package.sha512,
      integrity: snapshot.tarballs.package.integrity
    };
    same(packageProjection, embeddedProjection) || fail("/snapshot/tarballs/package: must exactly bind the package manifest tarball");
    const dependencyProjection = (manifest.install_contract?.dependencies ?? []).map((dependency) => ({
      name: dependency.name,
      version: dependency.version,
      path: dependency.tarball.path,
      sha256: dependency.tarball.sha256,
      sha512: dependency.tarball.sha512,
      integrity: dependency.tarball.integrity
    })), embeddedDependencies = (snapshot.tarballs?.dependencies ?? []).map((dependency) => ({
      name: dependency.name,
      version: dependency.version,
      path: dependency.path,
      sha256: dependency.sha256,
      sha512: dependency.sha512,
      integrity: dependency.integrity
    }));
    same(dependencyProjection, embeddedDependencies) || fail("/snapshot/tarballs/dependencies: must exactly bind the install contract");
  }
} catch (error) {
  fail(`/package/tarball: ${error.message}`);
}
let packageJson;
const packageTargets = /* @__PURE__ */ new Map();
if (inspected)
  try {
    packageJson = parseArchiveJson(inspected.contents, "package.json");
    const packageBytes = inspected.contents.get("package.json");
    manifest.package.archive.package_json_sha256 !== sha256(packageBytes) && fail(`/package/archive/package_json_sha256: computed ${sha256(packageBytes)}`), (packageJson.name !== "@mkbabb/keyframes.js" || packageJson.version !== "7.0.0" || packageJson.type !== "module") && fail("/package/archive/package.json: exact @mkbabb/keyframes.js@7.0.0 ESM package required"), same(packageJson.dependencies, { "@mkbabb/value.js": "^5.0.0" }) || fail("/package/archive/package.json/dependencies: exact @mkbabb/value.js ^5.0.0 dependency required");
    for (const lifecycle of ["preinstall", "install", "postinstall", "prepare"])
      Object.prototype.hasOwnProperty.call(packageJson.scripts ?? {}, lifecycle) && fail(`/package/archive/package.json/scripts/${lifecycle}: lifecycle scripts are forbidden`);
    for (const field of ["main", "module", "types", "browser"])
      Object.prototype.hasOwnProperty.call(packageJson, field) && fail(`/package/archive/package.json/${field}: root fallback is forbidden`);
    exactKeys(packageJson.exports, [".", "./engine"], "/package/archive/package.json/exports");
    for (const specifier of [".", "./engine"]) {
      const conditions = packageJson.exports?.[specifier];
      exactKeys(conditions, ["types", "import"], `/package/archive/package.json/exports/${specifier}`);
      const declaration = typeof conditions?.types == "string" && conditions.types.startsWith("./") ? conditions.types.slice(2) : void 0, runtime = typeof conditions?.import == "string" && conditions.import.startsWith("./") ? conditions.import.slice(2) : void 0;
      (!declaration || !/\.d\.(?:cts|mts|ts)$/.test(declaration) || !inspected.contents.has(declaration)) && fail(`/package/archive/package.json/exports/${specifier}/types: packed declaration target required`), (!runtime || !/\.(?:cjs|mjs|js)$/.test(runtime) || !inspected.contents.has(runtime)) && fail(`/package/archive/package.json/exports/${specifier}/import: packed runtime target required`), packageTargets.set(specifier, { declaration, runtime });
    }
    (packageTargets.get(".")?.runtime === packageTargets.get("./engine")?.runtime || packageTargets.get(".")?.declaration === packageTargets.get("./engine")?.declaration) && fail("/package/archive/package.json/exports: root and engine must have distinct targets");
  } catch (error) {
    fail(`/package/archive/package.json: ${error.message}`);
  }
let computedGraphs, expectedBoundary;
if (inspected && packageTargets.size === 2)
  try {
    const runtimePaths = inspected.files.map(({ path }) => path).filter((path) => /\.(?:cjs|mjs|js)$/.test(path)), declarationPaths = inspected.files.map(({ path }) => path).filter((path) => /\.d\.(?:cts|mts|ts)$/.test(path));
    computedGraphs = {
      runtime: computeVirtualModuleGraphs(inspected.contents, runtimePaths).runtime,
      type: computeVirtualModuleGraphs(inspected.contents, declarationPaths).type
    }, same(manifest.graphs, computedGraphs) || fail("/graphs: must exactly regenerate packed runtime and declaration import graphs"), (computedGraphs.runtime.sccs.length || computedGraphs.type.sccs.length) && fail("/graphs: packed runtime and type graphs must have zero SCCs");
    for (const [kind, graph] of Object.entries(computedGraphs))
      for (const [index, row] of graph.external_imports.entries())
        (row.specifier.startsWith("/") || row.specifier.startsWith("file:") || row.specifier.startsWith("workspace:") || row.specifier.includes("/src/") || row.specifier.startsWith("src/")) && fail(`/graphs/${kind}/external_imports/${index}: source, workspace and absolute imports are forbidden`);
    const rootTargets = packageTargets.get("."), engineTargets = packageTargets.get("./engine");
    expectedBoundary = {
      root: {
        specifier: ".",
        source: "src/index.ts",
        runtime_entry: rootTargets.runtime,
        declaration_entry: rootTargets.declaration,
        runtime_closure: closure(computedGraphs.runtime, rootTargets.runtime),
        type_closure: closure(computedGraphs.type, rootTargets.declaration)
      },
      engine: {
        specifier: "./engine",
        source: "src/entries/heavy.ts",
        runtime_entry: engineTargets.runtime,
        declaration_entry: engineTargets.declaration,
        runtime_closure: closure(computedGraphs.runtime, engineTargets.runtime),
        type_closure: closure(computedGraphs.type, engineTargets.declaration)
      }
    }, same(manifest.boundary, expectedBoundary) || fail("/boundary: exact root/light and ./engine/heavy closures required");
    const rootClosure = [...expectedBoundary.root.runtime_closure, ...expectedBoundary.root.type_closure];
    rootClosure.some((path) => path === engineTargets.runtime || path === engineTargets.declaration || /(?:^|[./_-])(?:engine|heavy)(?:[./_-]|$)/i.test(path)) && fail("/boundary/root: root/light closure reaches engine/heavy code"), rootClosure.some((path) => /(?:^|[./_-])light(?:[./_-]|$)/i.test(path)) || fail("/boundary/root: light implementation is absent from the root closure"), [...expectedBoundary.engine.runtime_closure, ...expectedBoundary.engine.type_closure].some((path) => /(?:^|[./_-])(?:engine|heavy)(?:[./_-]|$)/i.test(path)) || fail("/boundary/engine: heavy implementation is absent from the engine closure");
  } catch (error) {
    fail(`/graphs: ${error.message}`);
  }
const expectedExports = [];
if (inspected && target && packageTargets.size === 2) {
  const targetSources = new Set(target.library?.files ?? []);
  for (const specifier of [".", "./engine"]) {
    const source = specifier === "." ? "src/index.ts" : "src/entries/heavy.ts";
    targetSources.has(source) || fail(`/exports/${specifier}/source: ${source} is absent from target authority`);
    const targets = packageTargets.get(specifier), declarationBytes = inspected.contents.get(targets.declaration), runtimeBytes = inspected.contents.get(targets.runtime), declaration = moduleExports(targets.declaration, declarationBytes, !0), runtime = moduleExports(targets.runtime, runtimeBytes, !1);
    same(declaration.runtime, runtime.runtime) || fail(`/exports/${specifier}: packed declaration/runtime symbol vectors differ`);
    for (const symbol of declaration.types) expectedExports.push({
      id: `${specifier}#${symbol}:type`,
      specifier,
      symbol,
      surface: "type",
      source,
      declaration: { path: targets.declaration, sha256: sha256(declarationBytes) }
    });
    for (const symbol of runtime.runtime) expectedExports.push({
      id: `${specifier}#${symbol}:runtime`,
      specifier,
      symbol,
      surface: "runtime",
      source,
      declaration: { path: targets.declaration, sha256: sha256(declarationBytes) },
      runtime: { path: targets.runtime, sha512: sha512(runtimeBytes) }
    });
  }
  expectedExports.sort((left, right) => compareCanonicalText(left.id, right.id));
  const ids = (manifest.exports ?? []).map(({ id }) => id), coordinates = (manifest.exports ?? []).map(({ specifier, symbol, surface }) => `${specifier}\0${symbol}\0${surface}`);
  (new Set(ids).size !== ids.length || !same(ids, [...ids].sort(compareCanonicalText))) && fail("/exports: exact unique derived-ID canonical text order required"), new Set(coordinates).size !== coordinates.length && fail("/exports: duplicate specifier/symbol/surface coordinate"), same(manifest.exports, expectedExports) || fail("/exports: must exactly equal packed declaration/runtime public truth"), [".", "./engine"].every((specifier) => expectedExports.some((row) => row.specifier === specifier && row.surface === "runtime")) || fail("/exports: root and engine each require at least one runtime symbol");
}
let installReceipt;
if (inspected && expectedExports.length)
  try {
    const operationalContract = structuredClone(manifest.install_contract);
    for (const [index, path] of dependencyTarballPaths.entries()) operationalContract.dependencies[index].tarball.path = path;
    installReceipt = freshInstallAndProbe(operationalContract, packageTarballPath, expectedExports, inspected.files);
  } catch (error) {
    fail(`/install: ${error.message}`);
  }
failures.length || validateSourceTranspose();
let snapshotBinding;
if (!failures.length && snapshot && (snapshotBinding = { path: snapshotPath, file_sha256: fileSha256(snapshotPath), snapshot_hash: snapshot.snapshot_hash }), !failures.length && snapshotOutPath)
  try {
    const manifestBytes = readFileSync(manifestPath), targetBytes = readFileSync(manifest.target_paths.path), jsonRow = (binding) => {
      const bytes = readFileSync(binding.path);
      return {
        path: binding.path,
        bytes: bytes.length,
        file_sha256: sha256(bytes),
        bytes_base64: canonicalBase64(bytes)
      };
    }, tarballRow = (path, identity, extra = {}) => {
      const bytes = readFileSync(path);
      return {
        ...extra,
        path,
        bytes: bytes.length,
        sha256: identity.sha256,
        sha512: identity.sha512,
        integrity: identity.integrity,
        bytes_base64: canonicalBase64(bytes)
      };
    }, built = {
      schema: "vnext-keyframes-public-package-snapshot/1",
      wave_id: "K23",
      manifest: {
        path: manifestPath,
        bytes: manifestBytes.length,
        file_sha256: sha256(manifestBytes),
        manifest_hash: manifest.manifest_hash,
        bytes_base64: canonicalBase64(manifestBytes)
      },
      source_transpose_validation: {
        return: jsonRow(manifest.source_transpose_validation.return),
        ledger: jsonRow(manifest.source_transpose_validation.ledger),
        receipt: jsonRow(manifest.source_transpose_validation.receipt),
        historical_certificate: sourceHistoricalCertificate
      },
      target_paths: {
        path: manifest.target_paths.path,
        bytes: targetBytes.length,
        file_sha256: sha256(targetBytes),
        manifest_hash: manifest.target_paths.manifest_sha256,
        bytes_base64: canonicalBase64(targetBytes)
      },
      tarballs: {
        package: tarballRow(manifest.package.tarball.path, manifest.package.tarball),
        dependencies: manifest.install_contract.dependencies.map((dependency) => tarballRow(
          dependency.tarball.path,
          dependency.tarball,
          { name: dependency.name, version: dependency.version }
        ))
      },
      toolchain: { node: nodeBinding, npm: npmBinding, typescript: typescriptBinding },
      snapshot_hash: ""
    };
    built.snapshot_hash = hashWithout(built, "snapshot_hash");
    const snapshotSchema = readStrictJson(snapshotSchemaPath, "/snapshot-schema"), schemaFailures = validateJsonSchema(built, snapshotSchema);
    if (schemaFailures.length) throw new Error(schemaFailures.join(`
`));
    mkdirSync(dirname(snapshotOutPath), { recursive: !0 }), writeFileSync(snapshotOutPath, `${canonicalize(built)}
`), snapshotBinding = { path: realpathSync(snapshotOutPath), file_sha256: fileSha256(snapshotOutPath), snapshot_hash: built.snapshot_hash };
  } catch (error) {
    fail(`/snapshot-out: ${error.message}`);
  }
failures.length && (process.stderr.write(`${failures.join(`
`)}
`), process.exit(1));
const receipt = {
  schema: "vnext-keyframes-public-package-validation/1",
  ...snapshotBinding ? { snapshot: snapshotBinding } : {},
  manifest: manifestBinding,
  source_transpose_validation: {
    return_hash: manifest.source_transpose_validation.return.return_hash,
    ledger_manifest_hash: manifest.source_transpose_validation.ledger.manifest_hash,
    semantic_hash: sourceTransposeReceipt.semantic_hash,
    receipt_hash: sourceTransposeReceipt.receipt_hash,
    owner_authorization: sourceTransposeReceipt.owner_authorization,
    historical_certificate: sourceHistoricalCertificate
  },
  target_manifest_sha256: manifest.target_paths.manifest_sha256,
  package: `${manifest.package.name}@${manifest.package.version}`,
  tarball_sha512: manifest.package.tarball.sha512,
  archive_files: inspected.files.length,
  surface_rows: expectedExports.length,
  runtime_graph_hash: computedGraphs.runtime.graph_hash,
  type_graph_hash: computedGraphs.type.graph_hash,
  install: installReceipt,
  semantic_hash: "",
  receipt_hash: ""
}, semanticReceipt = structuredClone(receipt);
if (delete semanticReceipt.semantic_hash, delete semanticReceipt.receipt_hash, receipt.semantic_hash = sha256(canonicalize(semanticReceipt)), receipt.receipt_hash = hashWithout(receipt, "receipt_hash"), snapshotBinding) {
  const validationSchema = readStrictJson(validationSchemaPath, "/validation-schema"), receiptFailures = validateJsonSchema(receipt, validationSchema);
  receiptFailures.length && (process.stderr.write(`${receiptFailures.join(`
`)}
`), process.exit(1));
}
process.stdout.write(`${JSON.stringify(receipt)}
`);
