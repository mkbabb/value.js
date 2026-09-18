import { execFileSync, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalize, compareCanonicalText, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import {
  fileSha256,
  hashWithout,
  readStrictJson,
  same,
  sha256,
  walkRegularFiles
} from "./keyframes-contract.mjs";
import { requireWaveEdgePolicy, requireWaveOutcome } from "./wave-edge-policy.mjs";
import { loadWaveRegistry } from "./wave-contract.mjs";
const ts = createRequire(import.meta.url)("typescript"), trancheRoot = resolve(dirname(fileURLToPath(import.meta.url)), ".."), inventoryReceiptSchemaPath = resolve(trancheRoot, "keyframes-current-inventory-validation.schema.json"), transposeReceiptSchemaPath = resolve(trancheRoot, "keyframes-target-transpose-validation.schema.json"), transposeValidatorPath = resolve(trancheRoot, "tools/validate-keyframes-target-transpose.mjs"), deletionToolPath = resolve(trancheRoot, "tools/deletion-truth.mjs"), gitSnapshotSchemaPath = resolve(trancheRoot, "git-tree-snapshot.schema.json"), deletionReceiptSchemaPath = resolve(trancheRoot, "deletion-delta-receipt.schema.json"), returnValidatorPath = resolve(trancheRoot, "tools/validate-return.mjs"), waveRegistry = loadWaveRegistry(), waveContracts = waveRegistry.contracts, waveEdgePolicy = waveRegistry.edge_policy, hashPattern = /^[0-9a-f]{64}$/, consumerCaptureAuthorityFlag = "--consumer-immutable-capture-authority";
function exactConsumerCaptureAuthorityArgs(options) {
  if (options === void 0) return [];
  if (!options || typeof options != "object" || Array.isArray(options) || Object.keys(options).some((key) => key !== "consumerCaptureAuthorityArgs"))
    throw new Error("Keyframes return options may contain only consumerCaptureAuthorityArgs");
  const args = options.consumerCaptureAuthorityArgs;
  if (args === void 0) return [];
  if (!Array.isArray(args) || args.length !== 4 || args[0] !== consumerCaptureAuthorityFlag || typeof args[1] != "string" || resolve(args[1]) !== args[1] || !hashPattern.test(args[2] ?? "") || !hashPattern.test(args[3] ?? ""))
    throw new Error(`exact caller-supplied ${consumerCaptureAuthorityFlag} <absolute-path> <file-sha256> <authority-hash> arguments required`);
  requireCanonicalFile(args[1], "consumer immutable-capture authority");
  const actual = fileSha256(args[1]);
  if (actual !== args[2]) throw new Error(`consumer immutable-capture authority file SHA-256 ${actual}; expected ${args[2]}`);
  return [...args];
}
const canonicalDemoTextLoaderPath = "proof/demo-text-loader.mjs", canonicalDemoTextLoaderSource = [
  'import { readFile } from "node:fs/promises";',
  "",
  "const textExtension = /\\.(?:css|html|vue)$/;",
  "export async function load(url, context, nextLoad) {",
  "    if (!textExtension.test(new URL(url).pathname)) return nextLoad(url, context);",
  '    const bytes = await readFile(new URL(url), "utf8");',
  "    return {",
  '        format: "module",',
  "        shortCircuit: true,",
  "        source: `export default ${JSON.stringify(bytes)};\\n`,",
  "    };",
  "}",
  ""
].join(`
`), canonicalDemoTextLoaderSha256 = sha256(canonicalDemoTextLoaderSource);
function validateCanonicalDemoTextLoader(path) {
  const bytes = readFileSync(path);
  if (bytes.toString("utf8") !== canonicalDemoTextLoaderSource)
    throw new Error(`${canonicalDemoTextLoaderPath}: exact canonical source-preserving loader required`);
  return { path: canonicalDemoTextLoaderPath, sha256: sha256(bytes) };
}
function sourceImportBindings(source, specifier) {
  const bindings = /* @__PURE__ */ new Set();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== specifier) continue;
    const clause = statement.importClause;
    clause?.name && bindings.add(clause.name.text);
    const named = clause?.namedBindings;
    if (named && ts.isNamespaceImport(named) && bindings.add(named.name.text), named && ts.isNamedImports(named)) for (const element of named.elements) bindings.add(element.name.text);
  }
  return bindings;
}
function assertionBindings(source) {
  const namespaces = /* @__PURE__ */ new Set(), functions = /* @__PURE__ */ new Map();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || !["node:assert", "node:assert/strict"].includes(statement.moduleSpecifier.text)) continue;
    const clause = statement.importClause;
    clause?.name && namespaces.add(clause.name.text);
    const named = clause?.namedBindings;
    if (named && ts.isNamespaceImport(named) && namespaces.add(named.name.text), named && ts.isNamedImports(named))
      for (const element of named.elements) functions.set(element.name.text, element.propertyName?.text ?? element.name.text);
  }
  return { namespaces, functions };
}
function testBindings(source) {
  const bindings = /* @__PURE__ */ new Set();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== "node:test") continue;
    const clause = statement.importClause;
    clause?.name && bindings.add(clause.name.text);
    const named = clause?.namedBindings;
    if (named && ts.isNamedImports(named))
      for (const element of named.elements)
        ["test", "it"].includes(element.propertyName?.text ?? element.name.text) && bindings.add(element.name.text);
  }
  return bindings;
}
function bindingIdentifiers(name, output = []) {
  if (!name) return output;
  if (ts.isIdentifier(name)) output.push(name.text);
  else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name))
    for (const element of name.elements)
      ts.isBindingElement(element) && bindingIdentifiers(element.name, output);
  return output;
}
function declarationBindingName(node) {
  if (ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isClassDeclaration(node) || ts.isClassExpression(node) || ts.isEnumDeclaration(node) || ts.isModuleDeclaration(node)) return node.name;
}
function rejectProofBindingShadowing(source, groups, testPath) {
  const roles = /* @__PURE__ */ new Map();
  for (const [role, bindings] of groups)
    for (const binding of bindings) {
      const existing = roles.get(binding) ?? [];
      existing.push(role), roles.set(binding, existing);
    }
  const visit = (node) => {
    if (!ts.isImportDeclaration(node)) {
      for (const binding of bindingIdentifiers(declarationBindingName(node)))
        if (roles.has(binding))
          throw new Error(`${testPath}: ${binding} lexically shadows imported ${roles.get(binding).join("/")} proof binding`);
      ts.forEachChild(node, visit);
    }
  };
  ts.forEachChild(source, visit);
}
const unaryAssertions = /* @__PURE__ */ new Set(["ok", "match", "doesNotMatch"]), binaryAssertions = /* @__PURE__ */ new Set([
  "equal",
  "notEqual",
  "strictEqual",
  "notStrictEqual",
  "deepEqual",
  "notDeepEqual",
  "deepStrictEqual",
  "notDeepStrictEqual"
]);
function assertionName(expression, assertions) {
  if (ts.isIdentifier(expression)) return assertions.functions.get(expression.text);
  if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression) && assertions.namespaces.has(expression.expression.text)) return expression.name.text;
}
function derivedExpression(node, derived) {
  return node ? ts.isIdentifier(node) ? derived.has(node.text) : ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node) || ts.isAwaitExpression(node) ? derivedExpression(node.expression, derived) : ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node) ? derivedExpression(node.expression, derived) || ts.isElementAccessExpression(node) && derivedExpression(node.argumentExpression, derived) : ts.isCallExpression(node) || ts.isNewExpression(node) ? derivedExpression(node.expression, derived) : ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node) ? derivedExpression(node.operand, derived) : ts.isBinaryExpression(node) ? [ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.CommaToken].includes(node.operatorToken.kind) ? !1 : derivedExpression(node.left, derived) || derivedExpression(node.right, derived) : ts.isConditionalExpression(node) ? !1 : ts.isTemplateExpression(node) ? node.templateSpans.some((span) => derivedExpression(span.expression, derived)) : ts.isArrayLiteralExpression(node) ? node.elements.some((element) => derivedExpression(element, derived)) : ts.isObjectLiteralExpression(node) ? node.properties.some((property) => ts.isPropertyAssignment(property) && derivedExpression(property.initializer, derived)) : !1 : !1;
}
function isTopLevelExpression(node, source) {
  return ts.isExpressionStatement(node.parent) && node.parent.parent === source;
}
function executedAssertion(call, source, tests) {
  if (isTopLevelExpression(call, source)) return !0;
  let callback;
  if (ts.isArrowFunction(call.parent) && call.parent.body === call) callback = call.parent;
  else if (ts.isExpressionStatement(call.parent) && ts.isBlock(call.parent.parent)) {
    const block = call.parent.parent;
    (ts.isArrowFunction(block.parent) || ts.isFunctionExpression(block.parent)) && (callback = block.parent);
  }
  return !callback || !ts.isCallExpression(callback.parent) || !callback.parent.arguments.includes(callback) || !ts.isIdentifier(callback.parent.expression) || !tests.has(callback.parent.expression.text) ? !1 : isTopLevelExpression(callback.parent, source);
}
function collectDerivedAliases(source, derived) {
  let changed = !0;
  for (; changed; ) {
    changed = !1;
    const visit = (node) => {
      ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && !derived.has(node.name.text) && derivedExpression(node.initializer, derived) && (derived.add(node.name.text), changed = !0), ts.forEachChild(node, visit);
    };
    ts.forEachChild(source, visit);
  }
}
function validateMirroredSourceAssertion(testPath, sourceText, sourceSpecifier) {
  const source = ts.createSourceFile(testPath, sourceText, ts.ScriptTarget.Latest, !0, ts.ScriptKind.TS);
  if (source.parseDiagnostics.length)
    throw new Error(`${testPath}: syntax diagnostic ${ts.flattenDiagnosticMessageText(source.parseDiagnostics[0].messageText, " ")}`);
  const sourceBindings = sourceImportBindings(source, sourceSpecifier);
  if (!sourceBindings.size) throw new Error(`${testPath}: mirrored source import has no runtime binding`);
  const assertions = assertionBindings(source), tests = testBindings(source);
  rejectProofBindingShadowing(source, [
    ["source", sourceBindings],
    ["assertion", /* @__PURE__ */ new Set([...assertions.namespaces, ...assertions.functions.keys()])],
    ["test", tests]
  ], testPath);
  const derived = new Set(sourceBindings);
  collectDerivedAliases(source, derived);
  let accepted = 0;
  const visit = (node) => {
    if (ts.isCallExpression(node)) {
      const name = assertionName(node.expression, assertions), actual = node.arguments[0];
      (unaryAssertions.has(name) || binaryAssertions.has(name)) && derivedExpression(actual, derived) && executedAssertion(node, source, tests) && (accepted += 1);
    }
    ts.forEachChild(node, visit);
  };
  if (ts.forEachChild(source, visit), accepted < 1) throw new Error(`${testPath}: an executed top-level/test-callback assertion actual/predicate must derive from the mirrored source binding`);
  return { source_bindings: [...derived].sort(compareCanonicalText), assertion_count: accepted };
}
function validateReceipt(path, schemaPath, expectedSchema, expectedMode) {
  const receipt = readStrictJson(path, "/receipt"), schema = readStrictJson(schemaPath, "/receipt_schema"), errors = validateJsonSchema(receipt, schema);
  if (errors.length) throw new Error(`receipt schema failure:
${errors.join(`
`)}`);
  if (receipt.schema !== expectedSchema) throw new Error("receipt schema identity mismatch");
  if (expectedMode && receipt.mode !== expectedMode) throw new Error(`receipt mode ${receipt.mode}; expected ${expectedMode}`);
  const receiptHash = hashWithout(receipt, "receipt_hash");
  if (receipt.receipt_hash !== receiptHash) throw new Error(`receipt hash ${receipt.receipt_hash}; expected ${receiptHash}`);
  return receipt;
}
function immutableReturnNode(path, fileSha2562, returned) {
  return {
    wave_id: returned.wave_id,
    path,
    file_sha256: fileSha2562,
    return_hash: returned.return_hash,
    wave_contract_sha256: returned.wave_contract_sha256,
    status: returned.status
  };
}
function nodeSortKey(node) {
  return `${node.wave_id}\0${node.return_hash}`;
}
function edgeSortKey(edge) {
  return `${edge.from}\0${edge.to}\0${edge.return_hash}\0${edge.status}\0${edge.role}`;
}
function exactReturnBinding(evidence, expectedWave, expectedConsumer) {
  if (typeof evidence?.path != "string" || !existsSync(evidence.path))
    throw new Error(`${expectedWave} immutable return is unavailable`);
  const metadata = lstatSync(evidence.path);
  if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(evidence.path) !== evidence.path)
    throw new Error(`${expectedWave} immutable return must be a canonical regular non-symlink file`);
  const fileDigest = fileSha256(evidence.path), returned = parseJsonStrict(readFileSync(evidence.path)), returnHash = hashWithout(returned, "return_hash"), contract = waveContracts.get(expectedWave);
  if (returned.wave_id !== expectedWave || evidence.wave_id && evidence.wave_id !== expectedWave || returned.return_hash !== returnHash || evidence.return_hash !== returnHash || evidence.file_sha256 !== fileDigest || returned.wave_contract_sha256 !== contract?.sha256 || evidence.wave_contract_sha256 && evidence.wave_contract_sha256 !== contract?.sha256)
    throw new Error(`${expectedWave} immutable return binding is stale, rehashed, or belongs to another wave`);
  const policy = expectedConsumer ? requireWaveEdgePolicy(waveEdgePolicy, expectedWave, expectedConsumer) : requireWaveOutcome(waveEdgePolicy, expectedWave), allowed = policy.allowed_statuses ?? policy.advancing_statuses;
  if (!allowed.includes(returned.status))
    throw new Error(`${expectedWave}${expectedConsumer ? ` -> ${expectedConsumer}` : ""} requires ${allowed.join(" or ")}; found ${returned.status}`);
  return { returned, node: immutableReturnNode(evidence.path, fileDigest, returned), policy };
}
function validateKeyframesAuthorizationClosure(closure, rootNode) {
  if (!closure || !Array.isArray(closure.nodes) || !Array.isArray(closure.edges))
    throw new Error("immutable-authority receipt lacks exact closure vectors");
  if (closure.node_count !== closure.nodes.length || closure.edge_count !== closure.edges.length || closure.offline_validation_count !== closure.nodes.length - 1)
    throw new Error("immutable-authority closure counts do not equal unique historical validations");
  const nodes = structuredClone(closure.nodes), edges = structuredClone(closure.edges), sortedNodes = [...nodes].sort((left, right) => compareCanonicalText(nodeSortKey(left), nodeSortKey(right))), sortedEdges = [...edges].sort((left, right) => compareCanonicalText(edgeSortKey(left), edgeSortKey(right)));
  if (!same(nodes, sortedNodes) || !same(edges, sortedEdges))
    throw new Error("immutable-authority closure vectors must use canonical text order");
  const byWave = /* @__PURE__ */ new Map();
  for (const node of nodes) {
    const prior = byWave.get(node.wave_id);
    if (prior && !same(prior, node)) throw new Error(`split ancestry gives ${node.wave_id} conflicting immutable identities`);
    if (prior) throw new Error(`immutable-authority closure duplicates ${node.wave_id}`);
    byWave.set(node.wave_id, node);
  }
  if (!same(byWave.get(rootNode.wave_id), rootNode))
    throw new Error(`immutable-authority closure lacks exact ${rootNode.wave_id} root identity`);
  const edgeKeys = /* @__PURE__ */ new Set();
  for (const edge of edges) {
    const key = `${edge.from}\0${edge.to}`;
    if (edgeKeys.has(key)) throw new Error(`immutable-authority closure duplicates edge ${edge.from} -> ${edge.to}`);
    edgeKeys.add(key);
    const producer = byWave.get(edge.from), consumer = byWave.get(edge.to);
    let policy;
    try {
      policy = requireWaveEdgePolicy(waveEdgePolicy, edge.from, edge.to);
    } catch (error) {
      throw new Error(`immutable-authority closure has noncanonical edge ${edge.from} -> ${edge.to}: ${error.message}`);
    }
    const expectedPolicy = {
      from: edge.from,
      to: edge.to,
      role: policy.role,
      allowed_statuses: policy.allowed_statuses
    };
    if (!producer || !consumer || edge.return_hash !== producer.return_hash || edge.status !== producer.status || edge.role !== policy.role || !same(edge.allowed_statuses, policy.allowed_statuses) || edge.edge_policy_sha256 !== sha256(canonicalize(expectedPolicy)) || !policy.allowed_statuses.includes(edge.status))
      throw new Error(`immutable-authority edge ${edge.from} -> ${edge.to} violates the central wave-edge policy`);
  }
  const closureHash = sha256(canonicalize({ nodes, edges })), descendantClosureHash = sha256(canonicalize({
    nodes: nodes.filter(({ wave_id }) => wave_id !== rootNode.wave_id),
    edges
  }));
  if (closure.closure_hash !== closureHash || closure.descendant_closure_hash !== descendantClosureHash)
    throw new Error("immutable-authority closure hash drift");
  return { nodes, edges, closure_hash: closureHash, descendant_closure_hash: descendantClosureHash };
}
function mergeKeyframesAuthorityNodes(identities, nodes, label = "authority") {
  for (const node of nodes ?? []) {
    const prior = identities.get(node.wave_id);
    if (prior && !same(prior, node))
      throw new Error(`${label}: split ancestry gives ${node.wave_id} conflicting immutable identities`);
    prior || identities.set(node.wave_id, structuredClone(node));
  }
  return identities;
}
function keyframesAuthorityProjection(identities) {
  const nodes = [...identities.values()].sort((left, right) => compareCanonicalText(nodeSortKey(left), nodeSortKey(right)));
  return { nodes, nodes_sha256: sha256(canonicalize(nodes)) };
}
function validateHistoricalKeyframesReturn(evidence, expectedWave, expectedConsumer, mode = "historical-certificate", options) {
  const loaded = exactReturnBinding(evidence, expectedWave, expectedConsumer), flag = mode === "immutable-authority" ? "--immutable-authority" : "--historical-certificate", consumerCaptureAuthorityArgs = exactConsumerCaptureAuthorityArgs(options), validation = spawnSync(process.execPath, [
    returnValidatorPath,
    evidence.path,
    flag,
    ...consumerCaptureAuthorityArgs
  ], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024
  });
  if (validation.status !== 0)
    throw new Error(`${expectedWave} ${mode} validation failed: ${(validation.stderr || validation.stdout).trim()}`);
  const receipt = parseJsonStrict(validation.stdout.trim()), expectedMode = mode === "immutable-authority" ? "offline-immutable-authority" : "offline-historical-certificate";
  if (receipt.mode !== expectedMode || receipt.completion_eligible !== !1 || receipt.proof_semantics?.accepted_at_epoch !== !0 || receipt.proof_semantics?.holds_now !== !1 || receipt.proof_semantics?.authorizes_decision !== !1 || receipt.historical_gate_replay?.materialized_pin_count !== 1 || receipt.historical_gate_replay?.executed_gate_count !== (loaded.returned.gates ?? []).filter(({ kind }) => kind === "command").length || !hashPattern.test(receipt.historical_gate_replay?.epoch_sha256 ?? "") || receipt.wave_id !== expectedWave || receipt.status !== loaded.returned.status || receipt.return_hash !== loaded.returned.return_hash)
    throw new Error(`${expectedWave} historical certificate does not bind the exact immutable return epoch`);
  const expectedConsumerCaptureAuthority = consumerCaptureAuthorityArgs.length === 0 ? void 0 : {
    path: consumerCaptureAuthorityArgs[1],
    file_sha256: consumerCaptureAuthorityArgs[2],
    authority_hash: consumerCaptureAuthorityArgs[3]
  };
  if (!same(receipt.consumer_immutable_capture_authority, expectedConsumerCaptureAuthority))
    throw new Error(`${expectedWave} historical certificate did not preserve the exact caller-supplied consumer immutable-capture authority`);
  if (mode === "immutable-authority") {
    if (receipt.immutable_authority_eligible !== !0) throw new Error(`${expectedWave} is not immutable-authority eligible`);
    loaded.authorization_closure = validateKeyframesAuthorizationClosure(receipt.authorization_closure, loaded.node);
  }
  return { ...loaded, validation_receipt: receipt };
}
function inventoryTruthProjection(receipt) {
  return {
    inventory: receipt.inventory,
    snapshot: receipt.snapshot,
    wave_id: receipt.wave_id,
    scope: receipt.scope,
    repository: receipt.repository,
    counts: receipt.counts,
    graph_hashes: receipt.graph_hashes
  };
}
function validateKeyframesInventoryReceipt(path, expectedMode) {
  const receipt = validateReceipt(
    path,
    inventoryReceiptSchemaPath,
    "vnext-keyframes-current-inventory-validation/1",
    expectedMode
  ), truthHash = sha256(canonicalize(inventoryTruthProjection(receipt)));
  if (receipt.truth_hash !== truthHash) throw new Error(`inventory receipt truth hash ${receipt.truth_hash}; expected ${truthHash}`);
  return receipt;
}
function validateKeyframesInventoryReceiptPair(capturePath, replayPath) {
  const capture = validateKeyframesInventoryReceipt(capturePath, "capture"), replay = validateKeyframesInventoryReceipt(replayPath, "replay");
  if (capture.truth_hash !== replay.truth_hash || !same(inventoryTruthProjection(capture), inventoryTruthProjection(replay)))
    throw new Error("capture receipt must exactly equal freshly replayable inventory truth");
  return { capture, replay, truth_hash: capture.truth_hash };
}
function canonicalJsonRecord(path, schemaPath, label) {
  const source = decodeUtf8Strict(readFileSync(path)), value = readStrictJson(path, label), schema = readStrictJson(schemaPath, `${label}/schema`), errors = validateJsonSchema(value, schema);
  if (errors.length) throw new Error(`${label} schema failure:
${errors.join(`
`)}`);
  if (source !== `${canonicalize(value)}
`) throw new Error(`${label} must be exact JCS plus newline`);
  return { path, source, value, file_sha256: sha256(source) };
}
function materializeCommitTree(repository, head) {
  const parent = realpathSync(mkdtempSync(join(tmpdir(), "vnext-keyframes-git-after-"))), root = join(parent, "tree"), index = join(parent, "index");
  try {
    mkdirSync(root);
    const environment = { ...process.env, GIT_INDEX_FILE: index };
    return execFileSync("git", ["-C", repository, "read-tree", head], {
      env: environment,
      stdio: "ignore"
    }), execFileSync("git", ["-C", repository, "checkout-index", "--all", `--prefix=${root}/`], {
      env: environment,
      stdio: "ignore"
    }), {
      root: realpathSync(root),
      cleanup: () => rmSync(parent, { recursive: !0, force: !0 }),
      files: walkRegularFiles(parent, "tree").map(({ path, ...rest }) => {
        const relativePath = path.slice(5), mode = lstatSync(join(root, relativePath)).mode & 73 ? "100755" : "100644";
        return { path: relativePath, mode, ...rest };
      })
    };
  } catch (error) {
    throw rmSync(parent, { recursive: !0, force: !0 }), error;
  }
}
function immutableDeletionTruth(gitTruthPath, retainAfterTree) {
  const receiptSchemaSource = decodeUtf8Strict(readFileSync(deletionReceiptSchemaPath)), snapshotSchemaSource = decodeUtf8Strict(readFileSync(gitSnapshotSchemaPath)), record = canonicalJsonRecord(gitTruthPath, deletionReceiptSchemaPath, "/git_truth"), receipt = record.value;
  if (receipt.tool_sha256 !== fileSha256(deletionToolPath) || receipt.snapshot_schema_sha256 !== sha256(snapshotSchemaSource) || receipt.receipt_schema_sha256 !== sha256(receiptSchemaSource))
    throw new Error("immutable Git receipt tool/schema authority drift");
  if (receipt.receipt_hash !== hashWithout(receipt, "receipt_hash")) throw new Error("immutable Git receipt self-hash drift");
  const snapshots = {};
  for (const phase of ["before", "after"]) {
    const snapshot = canonicalJsonRecord(receipt[phase].path, gitSnapshotSchemaPath, `/git_truth/${phase}`), value = snapshot.value;
    if (value.phase !== phase || value.tool_sha256 !== receipt.tool_sha256 || value.snapshot_hash !== hashWithout(value, "snapshot_hash") || value.files_sha256 !== sha256(canonicalize(value.files)))
      throw new Error(`immutable Git ${phase} snapshot authority drift`);
    const reference = {
      path: snapshot.path,
      file_sha256: snapshot.file_sha256,
      snapshot_hash: value.snapshot_hash,
      files_sha256: value.files_sha256,
      captured_at: value.captured_at
    };
    if (!same(receipt[phase], reference)) throw new Error(`immutable Git ${phase} snapshot reference drift`);
    if (value.repository.canonical_realpath !== receipt.repository.canonical_realpath || value.repository.branch !== receipt.repository.branch || value.repository.head !== receipt.repository[`${phase}_head`] || value.repository.status_sha256 !== receipt.repository[`${phase}_status_sha256`])
      throw new Error(`immutable Git ${phase} repository epoch drift`);
    const paths = value.files.map(({ path }) => path);
    if (new Set(paths).size !== paths.length || !same(paths, [...paths].sort(compareCanonicalText)))
      throw new Error(`immutable Git ${phase} file vector must be sorted and unique`);
    snapshots[phase] = value;
  }
  if (Date.parse(snapshots.after.captured_at) < Date.parse(snapshots.before.captured_at) || Date.parse(receipt.generated_at) < Date.parse(snapshots.after.captured_at))
    throw new Error("immutable Git receipt chronology drift");
  const repository = receipt.repository.canonical_realpath;
  if (execFileSync("git", ["-C", repository, "symbolic-ref", "--quiet", "--short", "HEAD"], { encoding: "utf8" }).trim() !== receipt.repository.branch) throw new Error("immutable Git repository branch drift");
  if (spawnSync("git", ["-C", repository, "merge-base", "--is-ancestor", receipt.repository.before_head, receipt.repository.after_head]).status !== 0) throw new Error("immutable Git before commit is not an ancestor of after commit");
  let beforeTree, afterTree;
  try {
    if (beforeTree = materializeCommitTree(repository, receipt.repository.before_head), afterTree = materializeCommitTree(repository, receipt.repository.after_head), !same(beforeTree.files, snapshots.before.files) || !same(afterTree.files, snapshots.after.files))
      throw new Error("reconstructed Git trees differ from their content-addressed snapshots");
    const beforeByPath = new Map(beforeTree.files.map((file) => [file.path, file])), afterByPath = new Map(afterTree.files.map((file) => [file.path, file])), deletedPaths = beforeTree.files.filter(({ path }) => !afterByPath.has(path)).map(({ path }) => path), addedPaths = afterTree.files.filter(({ path }) => !beforeByPath.has(path)).map(({ path }) => path), modifiedPaths = beforeTree.files.filter((file) => afterByPath.has(file.path) && !same(file, afterByPath.get(file.path))).map(({ path }) => path), unchangedPaths = beforeTree.files.filter((file) => afterByPath.has(file.path) && same(file, afterByPath.get(file.path))).map(({ path }) => path), delta = { deleted_paths: deletedPaths, added_paths: addedPaths, modified_paths: modifiedPaths, unchanged_paths: unchangedPaths }, expectedCounts = {
      before: beforeTree.files.length,
      after: afterTree.files.length,
      deleted: deletedPaths.length,
      added: addedPaths.length,
      modified: modifiedPaths.length,
      unchanged: unchangedPaths.length
    };
    if (!same(receipt.counts, expectedCounts) || Object.entries(delta).some(([member, paths]) => !same(receipt[member], paths)) || receipt.delta_sha256 !== sha256(canonicalize(delta)) || receipt.repository.before_tree_sha256 !== sha256(canonicalize(beforeTree.files)) || receipt.repository.after_tree_sha256 !== sha256(canonicalize(afterTree.files)))
      throw new Error("immutable Git receipt differs from the reconstructed commit delta");
    const result = {
      receipt,
      file_sha256: record.file_sha256,
      snapshot_schema_sha256: sha256(snapshotSchemaSource),
      receipt_schema_sha256: sha256(receiptSchemaSource),
      tool_sha256: fileSha256(deletionToolPath),
      after: snapshots.after,
      afterTree
    };
    return beforeTree.cleanup(), retainAfterTree || afterTree.cleanup(), result;
  } catch (error) {
    throw beforeTree?.cleanup(), afterTree?.cleanup(), error;
  }
}
function validateImmutableKeyframesDeletionTruth(gitTruthPath) {
  const verified = immutableDeletionTruth(gitTruthPath, !1), { afterTree, ...result } = verified;
  return result;
}
function materializeKeyframesGitAfterTree(gitTruthPath) {
  const verified = immutableDeletionTruth(gitTruthPath, !0), { afterTree, ...truth } = verified;
  return {
    root: afterTree.root,
    cleanup: afterTree.cleanup,
    verified: truth,
    after: verified.after
  };
}
function validateKeyframesTransposeReceipt(path) {
  const receipt = validateReceipt(
    path,
    transposeReceiptSchemaPath,
    "vnext-keyframes-target-transpose-validation/1",
    "immutable-git-replay"
  ), semantic = structuredClone(receipt);
  delete semantic.receipt_hash, delete semantic.semantic_hash;
  const semanticHash = sha256(canonicalize(semantic));
  if (receipt.semantic_hash !== semanticHash) throw new Error(`transpose receipt semantic hash ${receipt.semantic_hash}; expected ${semanticHash}`);
  const projectedAuthority = keyframesAuthorityProjection(
    mergeKeyframesAuthorityNodes(/* @__PURE__ */ new Map(), receipt.owner_authorization?.nodes, "transpose receipt")
  );
  if (!same(receipt.owner_authorization, projectedAuthority))
    throw new Error("transpose receipt owner authorization is not an exact self-hashed identity vector");
  return receipt;
}
function exactBinding(binding) {
  return binding && {
    path: binding.path,
    file_sha256: binding.file_sha256,
    return_hash: binding.return_hash
  };
}
function validateKeyframesCurrentDependencyInterface(record, transposeAnnex, options) {
  const expected = (/* @__PURE__ */ new Map([["K22T", ["K00", "library"]], ["M10T", ["M00", "demo"]]])).get(record?.wave_id);
  if (!expected) throw new Error("Keyframes transpose interface belongs only to K22T or M10T");
  const [expectedWave, expectedScope] = expected;
  if (transposeAnnex?.wave_id !== record.wave_id || transposeAnnex?.scope !== expectedScope)
    throw new Error(`exact ${record.wave_id}/${expectedScope} transpose annex identity required`);
  const matches = (record.dependencies ?? []).filter(({ wave_id }) => wave_id === expectedWave);
  if (matches.length !== 1 || !same(exactBinding(matches[0]), exactBinding(transposeAnnex.current_inventory_return)))
    throw new Error(`current inventory return must equal the unique ${expectedWave} scope dependency row`);
  const loaded = validateHistoricalKeyframesReturn(matches[0], expectedWave, record.wave_id, "historical-certificate", options);
  if (loaded.returned.status !== "COMPLETE" || loaded.returned.annexes?.["keyframes-current-inventory"]?.scope !== expectedScope)
    throw new Error(`exact COMPLETE ${expectedWave}/${expectedScope} inventory return required`);
  return loaded;
}
function validateKeyframesDirectDependencyIdentities(record) {
  const contract = waveContracts.get(record?.wave_id)?.contract;
  if (!contract) throw new Error(`${record?.wave_id} has no canonical wave contract`);
  const dependencies = record.dependencies ?? [], dependencyIds = dependencies.map(({ wave_id }) => wave_id).sort(compareCanonicalText);
  if (new Set(dependencyIds).size !== dependencyIds.length || !same(dependencyIds, [...contract.dependencies].sort(compareCanonicalText)))
    throw new Error(`${record.wave_id} must bind every canonical direct dependency exactly once`);
  const identities = /* @__PURE__ */ new Map();
  for (const dependency of dependencies) {
    const loaded = exactReturnBinding(dependency, dependency.wave_id, record.wave_id);
    mergeKeyframesAuthorityNodes(identities, [loaded.node], `${dependency.wave_id} direct dependency`);
  }
  return keyframesAuthorityProjection(identities);
}
function replayKeyframesTransposeLedger(ledgerPath, options) {
  const consumerCaptureAuthorityArgs = exactConsumerCaptureAuthorityArgs(options), replay = spawnSync(process.execPath, [
    transposeValidatorPath,
    "--ledger",
    ledgerPath,
    "--offline-returns",
    "--historical-replay",
    ...consumerCaptureAuthorityArgs
  ], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  if (replay.status !== 0) throw new Error(`historical Keyframes transpose replay failed: ${(replay.stderr || replay.stdout).trim()}`);
  const receipt = parseJsonStrict(replay.stdout.trim()), schema = readStrictJson(transposeReceiptSchemaPath, "/receipt_schema"), errors = validateJsonSchema(receipt, schema);
  if (errors.length) throw new Error(`historical transpose receipt schema failure:
${errors.join(`
`)}`);
  if (receipt.receipt_hash !== hashWithout(receipt, "receipt_hash")) throw new Error("historical transpose receipt self-hash drift");
  return receipt;
}
function validateKeyframesTransposeUniversalInterface(record, transposeAnnex, persistedReceiptPath, recordPath, options) {
  const current = validateKeyframesCurrentDependencyInterface(record, transposeAnnex, options), persisted = validateKeyframesTransposeReceipt(persistedReceiptPath), replayed = replayKeyframesTransposeLedger(transposeAnnex.ledger.path, options);
  if (!same(persisted, replayed)) throw new Error("persisted Keyframes transpose receipt differs from immutable Git replay");
  if (!same(persisted.owner_authorization, keyframesAuthorityProjection(
    mergeKeyframesAuthorityNodes(/* @__PURE__ */ new Map(), persisted.owner_authorization?.nodes, "transpose receipt")
  )))
    throw new Error("persisted Keyframes transpose owner authorization is not an exact self-hashed identity vector");
  const identities = /* @__PURE__ */ new Map();
  if (mergeKeyframesAuthorityNodes(identities, persisted.owner_authorization.nodes, "transpose owner closure"), mergeKeyframesAuthorityNodes(identities, [current.node], "current inventory artifact edge"), mergeKeyframesAuthorityNodes(identities, validateKeyframesDirectDependencyIdentities(record).nodes, "direct dependency vector"), recordPath) {
    const canonicalPath = realpathSync(recordPath), rootDigest = fileSha256(canonicalPath);
    if (record.return_hash !== hashWithout(record, "return_hash")) throw new Error(`${record.wave_id} root return self-hash drift`);
    mergeKeyframesAuthorityNodes(identities, [immutableReturnNode(canonicalPath, rootDigest, record)], `${record.wave_id} root`);
  }
  return { receipt: replayed, owner_authorization: keyframesAuthorityProjection(identities) };
}
export {
  canonicalDemoTextLoaderPath,
  canonicalDemoTextLoaderSha256,
  canonicalDemoTextLoaderSource,
  keyframesAuthorityProjection,
  materializeKeyframesGitAfterTree,
  mergeKeyframesAuthorityNodes,
  replayKeyframesTransposeLedger,
  validateCanonicalDemoTextLoader,
  validateHistoricalKeyframesReturn,
  validateImmutableKeyframesDeletionTruth,
  validateKeyframesAuthorizationClosure,
  validateKeyframesCurrentDependencyInterface,
  validateKeyframesDirectDependencyIdentities,
  validateKeyframesInventoryReceipt,
  validateKeyframesInventoryReceiptPair,
  validateKeyframesTransposeReceipt,
  validateKeyframesTransposeUniversalInterface,
  validateMirroredSourceAssertion
};
