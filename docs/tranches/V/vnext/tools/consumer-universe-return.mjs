import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { canonicalize, compareCanonicalText, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import {
  canonicalConsumerBoundsAuthority,
  validateConsumerBoundsAuthority
} from "./consumer-bounds-authority.mjs";
import { consumerRootSnapshotContentProjection } from "./consumer-root-snapshot.mjs";
import {
  consumerEdgeObservationMode,
  consumerWaveRegistry,
  validateConsumerRootState,
  verifyConsumerEvidence,
  verifyConsumerOwner
} from "./resolve-consumer-universe.mjs";
import {
  openingStateFailure,
  routingPiFailure,
  waveCell,
  waveCellCount,
  waveFiles as waveRegistryRelativePaths,
  waveIdPattern,
  waveTotal
} from "./wave-table-contract.mjs";
const root = resolve(new URL("..", import.meta.url).pathname), inputSchemaPath = resolve(root, "consumer-universe.schema.json"), receiptSchemaPath = resolve(root, "consumer-universe-receipt.schema.json"), resolverPath = resolve(root, "tools/resolve-consumer-universe.mjs"), sha256 = (value) => createHash("sha256").update(value).digest("hex"), compareObservation = (left, right) => compareCanonicalText(left.canonical_realpath, right.canonical_realpath) || compareCanonicalText(left.locator, right.locator) || compareCanonicalText(left.path, right.path) || compareCanonicalText(left.file_sha256, right.file_sha256), hashPattern = /^[0-9a-f]{64}$/, immutableBindingSchema = "vnext-consumer-universe-immutable-binding/1", immutableCaptureSchema = "vnext-consumer-universe-immutable-capture/1", immutableCaptureReferenceKeys = ["capture_hash", "file_sha256", "path"], snapshotIndexReferenceKeys = ["file_sha256", "index_hash", "path"], contentSnapshotKeys = [
  "file_count",
  "files_sha256",
  "manifest_file_sha256",
  "snapshot_hash",
  "snapshot_schema_sha256",
  "total_bytes"
].sort(compareCanonicalText), immutableCaptureMaterialKeys = [
  "bounds_authority",
  "input",
  "input_schema",
  "receipt",
  "receipt_schema",
  "resolver",
  "wave_registry"
], immutableBindingFields = [
  "receipt_path",
  "receipt_file_sha256",
  "receipt_hash",
  "input_path",
  "input_file_sha256",
  "universe_hash",
  "resolver_sha256",
  "input_schema_sha256",
  "receipt_schema_sha256",
  "bounds_authority",
  "bounds_sha256",
  "formation_wave_registry_sha256",
  "observed_at",
  "resolved_at",
  "epoch",
  "counts",
  "roots_sha256",
  "edges_sha256",
  "resolvable",
  "blockers"
], immutableBindingKeys = ["schema", ...immutableBindingFields].sort(compareCanonicalText);
function exactObjectKeys(value, expected, label) {
  if (!value || typeof value != "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const actual = Object.keys(value).sort(compareCanonicalText);
  if (canonicalize(actual) !== canonicalize(expected)) throw new Error(`${label} fields must be exact`);
}
function consumerUniverseImmutableBindingProjection(source) {
  if (!source || typeof source != "object" || Array.isArray(source))
    throw new Error("consumer-universe immutable binding source must be an authenticated projection object");
  return {
    schema: immutableBindingSchema,
    ...Object.fromEntries(immutableBindingFields.map((field) => [field, structuredClone(source[field])]))
  };
}
function assertSameConsumerUniverseImmutableProjection(left, right, label = "consumer-universe immutable projection") {
  const leftProjection = consumerUniverseImmutableBindingProjection(left), rightProjection = consumerUniverseImmutableBindingProjection(right);
  if (canonicalize(leftProjection) !== canonicalize(rightProjection))
    throw new Error(`${label} differs`);
  return leftProjection;
}
function validateConsumerUniverseImmutableBinding(binding) {
  if (exactObjectKeys(binding, immutableBindingKeys, "consumer-universe immutable binding"), binding.schema !== immutableBindingSchema) throw new Error(`consumer-universe immutable binding schema must be ${immutableBindingSchema}`);
  for (const field of [
    "receipt_file_sha256",
    "receipt_hash",
    "input_file_sha256",
    "universe_hash",
    "resolver_sha256",
    "input_schema_sha256",
    "receipt_schema_sha256",
    "bounds_sha256",
    "formation_wave_registry_sha256",
    "roots_sha256",
    "edges_sha256"
  ])
    if (!hashPattern.test(binding[field] ?? "")) throw new Error(`consumer-universe immutable binding ${field} must be a lowercase SHA-256`);
  for (const field of ["receipt_path", "input_path"])
    if (typeof binding[field] != "string" || !isAbsolute(binding[field]) || resolve(binding[field]) !== binding[field])
      throw new Error(`consumer-universe immutable binding ${field} must be an absolute normalized path`);
  for (const field of ["observed_at", "resolved_at"])
    if (typeof binding[field] != "string" || !Number.isFinite(Date.parse(binding[field])))
      throw new Error(`consumer-universe immutable binding ${field} must be a date-time`);
  if (exactObjectKeys(binding.bounds_authority, ["file_sha256", "manifest_hash", "path"], "consumer-universe immutable binding bounds authority"), typeof binding.bounds_authority.path != "string" || !isAbsolute(binding.bounds_authority.path) || resolve(binding.bounds_authority.path) !== binding.bounds_authority.path || !hashPattern.test(binding.bounds_authority.file_sha256 ?? "") || !hashPattern.test(binding.bounds_authority.manifest_hash ?? ""))
    throw new Error("consumer-universe immutable binding bounds authority is malformed");
  if (!binding.epoch || typeof binding.epoch != "object" || Array.isArray(binding.epoch) || !binding.counts || typeof binding.counts != "object" || Array.isArray(binding.counts) || typeof binding.resolvable != "boolean" || !Array.isArray(binding.blockers) || binding.blockers.some((item) => typeof item != "string" || item.length === 0))
    throw new Error("consumer-universe immutable binding epoch, counts, resolvability, or blockers are malformed");
  return structuredClone(binding);
}
function validateConsumerRootSnapshotIndexReference(reference) {
  if (exactObjectKeys(reference, snapshotIndexReferenceKeys, "consumer root snapshot index reference"), typeof reference.path != "string" || !isAbsolute(reference.path) || resolve(reference.path) !== reference.path)
    throw new Error("consumer root snapshot index reference path must be absolute and normalized");
  for (const field of ["file_sha256", "index_hash"])
    if (!hashPattern.test(reference[field] ?? ""))
      throw new Error(`consumer root snapshot index reference ${field} must be a lowercase SHA-256`);
  return structuredClone(reference);
}
function validateConsumerRootContentSnapshot(snapshot, label) {
  return exactObjectKeys(snapshot, contentSnapshotKeys, label), consumerRootSnapshotContentProjection(snapshot);
}
function validateMaterialBinding(binding, label) {
  if (exactObjectKeys(binding, ["file_sha256", "path"], label), typeof binding.path != "string" || !isAbsolute(binding.path) || resolve(binding.path) !== binding.path)
    throw new Error(`${label} path must be absolute and normalized`);
  if (!hashPattern.test(binding.file_sha256 ?? "")) throw new Error(`${label} file_sha256 must be a lowercase SHA-256`);
  return structuredClone(binding);
}
function readMaterial(binding, label) {
  const validated = validateMaterialBinding(binding, label);
  requireFile(validated.path, label);
  const bytes = readFileSync(validated.path);
  if (sha256(bytes) !== validated.file_sha256) throw new Error(`${label} material hash drift`);
  return { binding: validated, bytes };
}
function capturedConsumerWaveRegistry(material) {
  if (exactObjectKeys(material, ["files", "registry_sha256"], "consumer-universe immutable capture wave registry"), !hashPattern.test(material.registry_sha256 ?? "") || !Array.isArray(material.files))
    throw new Error("consumer-universe immutable capture wave registry is malformed");
  const relativePaths = material.files.map(({ relative_path: relativePath }) => relativePath);
  if (canonicalize(relativePaths) !== canonicalize(waveRegistryRelativePaths))
    throw new Error("consumer-universe immutable capture wave registry files must be the exact canonical source set");
  const rows = /* @__PURE__ */ new Map(), sources = [];
  for (const [index, entry] of material.files.entries()) {
    exactObjectKeys(entry, ["file_sha256", "path", "relative_path"], `consumer-universe immutable capture wave registry file ${index + 1}`);
    const relativePath = waveRegistryRelativePaths[index];
    if (entry.relative_path !== relativePath)
      throw new Error("consumer-universe immutable capture wave registry source order drift");
    const captured = readMaterial(
      { path: entry.path, file_sha256: entry.file_sha256 },
      `consumer-universe immutable capture ${relativePath}`
    ), source = decodeUtf8Strict(captured.bytes);
    sources.push({ relative_path: relativePath, source });
    for (const line of source.split(`
`)) {
      if (!line.startsWith("|")) continue;
      const cells = line.split("|").slice(1, -1).map((cell) => cell.trim()), waveId = cells[0] ?? "";
      if (!waveIdPattern.test(waveId)) continue;
      if (cells.length !== waveCellCount)
        throw new Error(`${relativePath}: ${waveId} must have ${waveCellCount} canonical cells`);
      const openingFailure = openingStateFailure(cells[waveCell.bornRed]);
      if (openingFailure) throw new Error(`${relativePath}: ${waveId} ${openingFailure}`);
      const routingFailure = routingPiFailure(cells[waveCell.routingPi]);
      if (routingFailure) throw new Error(`${relativePath}: ${waveId} ${routingFailure}`);
      if (rows.has(waveId)) throw new Error(`${relativePath}: duplicate canonical wave ${waveId}`);
      rows.set(waveId, cells);
    }
  }
  if (rows.size !== waveTotal)
    throw new Error(`captured consumer-universe wave registry has ${rows.size} waves; expected ${waveTotal}`);
  const vector = [...rows].sort(([left], [right]) => compareCanonicalText(left, right)).map(([id, cells]) => ({ id, cells })), registrySha256 = sha256(canonicalize(vector));
  if (material.registry_sha256 !== registrySha256) throw new Error("consumer-universe immutable capture wave registry hash drift");
  return { ids: new Set(rows.keys()), sha256: registrySha256, sources };
}
function consumerUniverseImmutableCaptureDocument(binding, materials) {
  const document = {
    schema: immutableCaptureSchema,
    binding: validateConsumerUniverseImmutableBinding(binding),
    materials: structuredClone(materials),
    capture_hash: ""
  }, preimage = structuredClone(document);
  return delete preimage.capture_hash, document.capture_hash = sha256(canonicalize(preimage)), document;
}
function consumerUniverseImmutableCaptureReference(path) {
  requireFile(path, "consumer-universe immutable capture certificate");
  const source = decodeUtf8Strict(readFileSync(path)), capture = parseJsonStrict(source);
  if (source !== `${canonicalize(capture)}
`)
    throw new Error("consumer-universe immutable capture certificate must be exact RFC 8785/JCS plus one newline");
  if (!hashPattern.test(capture?.capture_hash ?? ""))
    throw new Error("consumer-universe immutable capture certificate lacks its capture hash");
  return { path, file_sha256: sha256(source), capture_hash: capture.capture_hash };
}
function validateConsumerUniverseImmutableCapture(reference, {
  allowFixtureBoundsAuthority = !1,
  receiptPath
} = {}) {
  exactObjectKeys(reference, immutableCaptureReferenceKeys, "consumer-universe immutable capture reference");
  const validatedReference = validateMaterialBinding(
    { path: reference.path, file_sha256: reference.file_sha256 },
    "consumer-universe immutable capture certificate"
  );
  if (!hashPattern.test(reference.capture_hash ?? ""))
    throw new Error("consumer-universe immutable capture reference capture_hash must be a lowercase SHA-256");
  const certificate = readMaterial(validatedReference, "consumer-universe immutable capture certificate"), source = decodeUtf8Strict(certificate.bytes), capture = parseJsonStrict(source);
  if (source !== `${canonicalize(capture)}
`)
    throw new Error("consumer-universe immutable capture certificate must be exact RFC 8785/JCS plus one newline");
  if (exactObjectKeys(capture, ["binding", "capture_hash", "materials", "schema"], "consumer-universe immutable capture certificate"), capture.schema !== immutableCaptureSchema)
    throw new Error(`consumer-universe immutable capture schema must be ${immutableCaptureSchema}`);
  const capturePreimage = structuredClone(capture);
  delete capturePreimage.capture_hash;
  const captureHash = sha256(canonicalize(capturePreimage));
  if (capture.capture_hash !== captureHash || reference.capture_hash !== captureHash)
    throw new Error("consumer-universe immutable capture certificate hash drift");
  const binding = validateConsumerUniverseImmutableBinding(capture.binding);
  if (receiptPath !== void 0 && binding.receipt_path !== receiptPath)
    throw new Error("consumer-universe immutable capture receipt path differs from the requested receipt");
  exactObjectKeys(capture.materials, immutableCaptureMaterialKeys, "consumer-universe immutable capture materials");
  const receipt = readMaterial(capture.materials.receipt, "consumer-universe immutable capture receipt"), input = readMaterial(capture.materials.input, "consumer-universe immutable capture input"), resolver = readMaterial(capture.materials.resolver, "consumer-universe immutable capture resolver"), inputSchema = readMaterial(capture.materials.input_schema, "consumer-universe immutable capture input schema"), receiptSchema = readMaterial(capture.materials.receipt_schema, "consumer-universe immutable capture receipt schema"), authorityMaterial = readMaterial(capture.materials.bounds_authority, "consumer-universe immutable capture bounds authority"), expectedMaterialHashes = [
    [receipt.binding.file_sha256, binding.receipt_file_sha256, "receipt"],
    [input.binding.file_sha256, binding.input_file_sha256, "input"],
    [resolver.binding.file_sha256, binding.resolver_sha256, "resolver"],
    [inputSchema.binding.file_sha256, binding.input_schema_sha256, "input schema"],
    [receiptSchema.binding.file_sha256, binding.receipt_schema_sha256, "receipt schema"],
    [authorityMaterial.binding.file_sha256, binding.bounds_authority.file_sha256, "bounds authority"]
  ];
  for (const [actual, expected, label] of expectedMaterialHashes)
    if (actual !== expected) throw new Error(`consumer-universe immutable capture ${label} does not match the external binding`);
  const registry = capturedConsumerWaveRegistry(capture.materials.wave_registry);
  if (registry.sha256 !== binding.formation_wave_registry_sha256)
    throw new Error("consumer-universe immutable capture wave registry does not match the external binding");
  const authority = validateConsumerBoundsAuthority(binding.bounds_authority, {
    verificationPath: authorityMaterial.binding.path,
    requireCanonicalPath: !1,
    allowFixtureProfile: allowFixtureBoundsAuthority
  });
  if (authority.bounds_sha256 !== binding.bounds_sha256)
    throw new Error("consumer-universe immutable capture semantic bounds do not match the external binding");
  return {
    reference: structuredClone(reference),
    capture,
    binding,
    authority,
    registry,
    sources: {
      receipt: decodeUtf8Strict(receipt.bytes),
      input: decodeUtf8Strict(input.bytes),
      resolver: resolver.bytes,
      input_schema: decodeUtf8Strict(inputSchema.bytes),
      receipt_schema: decodeUtf8Strict(receiptSchema.bytes)
    }
  };
}
function requireFile(path, label) {
  if (!isAbsolute(path) || !existsSync(path) || !statSync(path).isFile()) throw new Error(`${label} must be an existing absolute file: ${path}`);
  if (lstatSync(path).isSymbolicLink()) throw new Error(`${label} must be a regular non-symlink file: ${path}`);
  if (realpathSync(path) !== path) throw new Error(`${label} must use canonical realpath ${realpathSync(path)}`);
}
function statusCount(values, status) {
  return values.filter((value) => (value.disposition?.status ?? value.status) === status).length;
}
function rootProjection(rootRecord) {
  const projection = {
    id: rootRecord.id,
    repository: rootRecord.repository,
    canonical_realpath: rootRecord.canonical_realpath,
    branch: rootRecord.branch,
    head: rootRecord.head,
    dirty_sha256: rootRecord.dirty_sha256,
    origins: [...rootRecord.provenance.origins.values].sort(compareCanonicalText),
    worktrees: [...rootRecord.provenance.worktrees.values].sort(compareCanonicalText),
    status: rootRecord.disposition.status
  };
  return rootRecord.disposition.owner_wave && (projection.owner_wave = rootRecord.disposition.owner_wave), rootRecord.disposition.reason && (projection.reason = rootRecord.disposition.reason), rootRecord.disposition.retrigger && (projection.retrigger_wave = rootRecord.disposition.retrigger.wave_id, projection.condition = rootRecord.disposition.retrigger.condition), projection;
}
function edgeProjection(edge, observations) {
  const projection = {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    package: edge.package,
    specifier: edge.specifier,
    kind: edge.kind,
    owner_wave: edge.owner_wave,
    status: edge.disposition.status,
    observations,
    observations_sha256: sha256(canonicalize(observations))
  };
  return edge.disposition.reason && (projection.reason = edge.disposition.reason), edge.disposition.retrigger && (projection.retrigger_wave = edge.disposition.retrigger.wave_id, projection.condition = edge.disposition.retrigger.condition), projection;
}
function universeBlockers(universe) {
  const blockers = [];
  for (const rootRecord of universe.roots)
    rootRecord.disposition.status === "unavailable" && blockers.push(`root:${rootRecord.id}:unavailable:${rootRecord.disposition.retrigger.wave_id}:${rootRecord.disposition.retrigger.condition}`);
  for (const edge of universe.edges)
    edge.disposition.status === "unavailable" && blockers.push(`edge:${edge.id}:unavailable:${edge.disposition.retrigger.wave_id}:${edge.disposition.retrigger.condition}`);
  return blockers.sort(compareCanonicalText);
}
function exactPathSet(actual, expected, label) {
  const left = [...new Set(actual)].sort(compareCanonicalText), right = [...new Set(expected)].sort(compareCanonicalText);
  if (canonicalize(left) !== canonicalize(right)) throw new Error(`${label} is not exact`);
}
function capturedPath(path, label) {
  if (typeof path != "string" || !isAbsolute(path) || resolve(path) !== path)
    throw new Error(`${label} must be an absolute normalized captured path`);
}
function within(base, candidate) {
  const offset = relative(base, candidate);
  return offset === "" || !offset.startsWith("..") && !isAbsolute(offset);
}
function verifyCapturedEvidence(evidence, context, requiredBase = void 0) {
  if (!Array.isArray(evidence)) throw new Error(`${context} evidence must be an array`);
  const identities = /* @__PURE__ */ new Set();
  for (const [index, item] of evidence.entries()) {
    if (!item || typeof item != "object" || Array.isArray(item)) throw new Error(`${context} evidence ${index + 1} is malformed`);
    if (capturedPath(item.path, `${context} evidence ${index + 1} path`), capturedPath(item.canonical_realpath, `${context} evidence ${index + 1} canonical realpath`), !hashPattern.test(item.sha256 ?? "") || typeof item.description != "string" || item.description.length === 0)
      throw new Error(`${context} evidence ${index + 1} lacks its captured hash or description`);
    if (requiredBase && !within(requiredBase, item.canonical_realpath))
      throw new Error(`${context} evidence ${index + 1} escapes source root ${requiredBase}: ${item.canonical_realpath}`);
    const identity = `${item.canonical_realpath}\0${item.sha256}`;
    if (identities.has(identity)) throw new Error(`${context} repeats semantic evidence ${item.canonical_realpath}`);
    identities.add(identity);
  }
}
function verifyImmutableRequiredConsumerIdentities(bounds, rootsById) {
  const requiredRootIds = /* @__PURE__ */ new Set(), requiredRootPaths = /* @__PURE__ */ new Set(), requiredRootsById = /* @__PURE__ */ new Map();
  for (const required of bounds.required_roots) {
    if (requiredRootIds.has(required.id)) throw new Error(`duplicate required consumer root ID ${required.id}`);
    if (requiredRootPaths.has(required.canonical_realpath)) throw new Error(`duplicate required consumer root realpath ${required.canonical_realpath}`);
    requiredRootIds.add(required.id), requiredRootPaths.add(required.canonical_realpath), requiredRootsById.set(required.id, required);
    const rootRecord = rootsById.get(required.id);
    if (!rootRecord || rootRecord.canonical_realpath !== required.canonical_realpath)
      throw new Error(`required consumer root identity missing: ${required.id}`);
    if (rootRecord.disposition.status === "excluded") throw new Error(`required consumer root ${required.id} cannot be excluded`);
  }
  const requiredPathIds = /* @__PURE__ */ new Set(), requiredCanonicalPaths = /* @__PURE__ */ new Set();
  for (const required of bounds.required_paths) {
    if (requiredPathIds.has(required.id) || requiredRootIds.has(required.id))
      throw new Error(`duplicate required consumer identity ID ${required.id}`);
    requiredPathIds.add(required.id);
    const declaration = requiredRootsById.get(required.repository_root_id), rootRecord = rootsById.get(required.repository_root_id);
    if (!declaration || !rootRecord)
      throw new Error(`required consumer path ${required.id} names unknown repository root ${required.repository_root_id}`);
    capturedPath(required.path, `required consumer path ${required.id}`), capturedPath(required.canonical_realpath, `required consumer path ${required.id} canonical realpath`);
    const expectedCanonical = resolve(declaration.canonical_realpath, required.relative_path);
    if (required.kind !== "repository-subdirectory" || expectedCanonical !== required.canonical_realpath || expectedCanonical === declaration.canonical_realpath || !within(declaration.canonical_realpath, expectedCanonical))
      throw new Error(`required consumer path ${required.id} violates its typed repository-subdirectory law`);
    if (requiredCanonicalPaths.has(required.canonical_realpath) || requiredRootPaths.has(required.canonical_realpath))
      throw new Error(`duplicate required consumer identity realpath ${required.canonical_realpath}`);
    if (requiredCanonicalPaths.add(required.canonical_realpath), rootRecord.disposition.status !== "unavailable" && (!within(rootRecord.canonical_realpath, required.canonical_realpath) || required.canonical_realpath === rootRecord.canonical_realpath))
      throw new Error(`required consumer path escapes repository root: ${required.id}`);
  }
}
function validateImmutableConsumerRootState(universe, bounds, waveIds) {
  const rootIds = /* @__PURE__ */ new Set(), declaredRealpaths = /* @__PURE__ */ new Map(), rootsById = /* @__PURE__ */ new Map(), blockers = [];
  for (const rootRecord of universe.roots) {
    if (rootIds.has(rootRecord.id)) throw new Error(`duplicate root id ${rootRecord.id}`);
    if (rootIds.add(rootRecord.id), rootsById.set(rootRecord.id, rootRecord), capturedPath(rootRecord.path, `root ${rootRecord.id} path`), capturedPath(rootRecord.canonical_realpath, `root ${rootRecord.id} canonical realpath`), declaredRealpaths.has(rootRecord.canonical_realpath))
      throw new Error(`duplicate canonical realpath ${rootRecord.canonical_realpath} for ${declaredRealpaths.get(rootRecord.canonical_realpath)} and ${rootRecord.id}`);
    if (declaredRealpaths.set(rootRecord.canonical_realpath, rootRecord.id), !bounds.search_roots.some((search) => within(search.canonical_realpath, rootRecord.canonical_realpath)))
      throw new Error(`root ${rootRecord.id} escapes every bounded search root: ${rootRecord.canonical_realpath}`);
    for (const [name, observedSet] of Object.entries(rootRecord.provenance))
      if (verifyCapturedEvidence(observedSet.evidence, `root ${rootRecord.id} ${name}`), !Array.isArray(observedSet.values) || new Set(observedSet.values).size !== observedSet.values.length)
        throw new Error(`root ${rootRecord.id} ${name} values must be unique`);
    if (!rootRecord.provenance.worktrees.values.includes(rootRecord.canonical_realpath))
      throw new Error(`root ${rootRecord.id} captured worktrees omit its canonical realpath`);
    for (const worktree of rootRecord.provenance.worktrees.values) capturedPath(worktree, `root ${rootRecord.id} worktree`);
    rootRecord.disposition.status === "unavailable" ? (verifyCapturedEvidence(rootRecord.disposition.evidence, `unavailable root ${rootRecord.id}`), verifyConsumerOwner(waveIds, rootRecord.disposition.retrigger.wave_id, `unavailable root ${rootRecord.id} retrigger`), blockers.push(`root:${rootRecord.id}:unavailable:${rootRecord.disposition.retrigger.wave_id}:${rootRecord.disposition.retrigger.condition}`)) : rootRecord.disposition.status === "included" ? verifyConsumerOwner(waveIds, rootRecord.disposition.owner_wave, `included root ${rootRecord.id}`) : verifyCapturedEvidence(rootRecord.disposition.evidence, `excluded root ${rootRecord.id}`, rootRecord.canonical_realpath);
  }
  return verifyImmutableRequiredConsumerIdentities(bounds, rootsById), { rootsById, blockers };
}
function validateConsumerUniverseReceipt(receiptPath, options = {}) {
  exactObjectKeys(options, [
    "allowFixtureBoundsAuthority",
    "allowedAdditionalWorktrees",
    "boundsAuthority",
    "boundsAuthorityVerificationPath",
    "immutableBinding",
    "immutableCapture",
    "now",
    "requireCanonicalBoundsAuthority",
    "requireResolvable",
    "validationMode"
  ].filter((field) => Object.hasOwn(options, field)).sort(compareCanonicalText), "consumer-universe receipt validation options");
  const validationMode = options.validationMode ?? "live";
  if (validationMode !== "live" && validationMode !== "immutable")
    throw new Error(`consumer-universe receipt validation mode must be live or immutable; found ${validationMode}`);
  const requireResolvable = options.requireResolvable ?? !0, now = options.now ?? Date.now(), allowFixtureBoundsAuthority = options.allowFixtureBoundsAuthority ?? !1, allowedAdditionalWorktrees = options.allowedAdditionalWorktrees ?? [];
  if (!Array.isArray(allowedAdditionalWorktrees)) throw new Error("allowed additional Git worktrees must be an array");
  let immutableCapture;
  if (validationMode === "immutable") {
    if (options.immutableBinding !== void 0)
      throw new Error("immutable consumer-universe receipt validation rejects a caller-supplied self-derived binding; use an external immutable capture");
    if (options.immutableCapture === void 0)
      throw new Error("immutable consumer-universe receipt validation requires an independently content-addressed external capture");
    if (allowedAdditionalWorktrees.length !== 0) throw new Error("immutable consumer-universe receipt validation cannot accept live additional-worktree allowances");
    if (Object.hasOwn(options, "now")) throw new Error("immutable consumer-universe receipt validation cannot accept a live clock override");
    if (Object.hasOwn(options, "boundsAuthorityVerificationPath") || Object.hasOwn(options, "requireCanonicalBoundsAuthority"))
      throw new Error("immutable consumer-universe receipt validation takes authority bytes only from its external capture");
    immutableCapture = validateConsumerUniverseImmutableCapture(options.immutableCapture, {
      allowFixtureBoundsAuthority,
      receiptPath
    });
  } else {
    if (options.immutableBinding !== void 0)
      throw new Error("live consumer-universe receipt validation cannot accept an immutable binding");
    options.immutableCapture !== void 0 && (immutableCapture = validateConsumerUniverseImmutableCapture(options.immutableCapture, {
      allowFixtureBoundsAuthority,
      receiptPath
    }));
  }
  const immutableBinding = immutableCapture?.binding, boundsAuthority = options.boundsAuthority ?? immutableBinding?.bounds_authority ?? canonicalConsumerBoundsAuthority();
  if (immutableBinding && canonicalize(boundsAuthority) !== canonicalize(immutableBinding.bounds_authority))
    throw new Error("consumer-universe bounds authority differs from the external immutable capture");
  const boundsAuthorityVerificationPath = options.boundsAuthorityVerificationPath, requireCanonicalBoundsAuthority = options.requireCanonicalBoundsAuthority ?? boundsAuthorityVerificationPath === void 0;
  validationMode === "live" && requireFile(receiptPath, "consumer-universe receipt");
  const receiptSource = validationMode === "immutable" ? immutableCapture.sources.receipt : decodeUtf8Strict(readFileSync(receiptPath)), receipt = parseJsonStrict(receiptSource);
  if (receiptSource !== `${canonicalize(receipt)}
`) throw new Error("consumer-universe receipt must be exact RFC 8785/JCS plus one newline");
  const receiptSchemaSource = validationMode === "immutable" ? immutableCapture.sources.receipt_schema : decodeUtf8Strict(readFileSync(receiptSchemaPath)), receiptSchema = parseJsonStrict(receiptSchemaSource), receiptErrors = validateJsonSchema(receipt, receiptSchema);
  if (receiptErrors.length) throw new Error(`consumer-universe receipt schema failure:
${receiptErrors.join(`
`)}`);
  const preimage = structuredClone(receipt);
  delete preimage.receipt_hash;
  const receiptHash = sha256(canonicalize(preimage));
  if (receipt.receipt_hash !== receiptHash) throw new Error(`consumer-universe receipt hash ${receipt.receipt_hash}; expected ${receiptHash}`);
  validationMode === "live" && requireFile(receipt.input.path, "consumer-universe input");
  const inputSource = validationMode === "immutable" ? immutableCapture.sources.input : decodeUtf8Strict(readFileSync(receipt.input.path));
  if (sha256(inputSource) !== receipt.input.file_sha256) throw new Error("consumer-universe input file hash drift");
  const inputSchemaSource = validationMode === "immutable" ? immutableCapture.sources.input_schema : decodeUtf8Strict(readFileSync(inputSchemaPath)), inputSchema = parseJsonStrict(inputSchemaSource), universe = parseJsonStrict(inputSource), inputErrors = validateJsonSchema(universe, inputSchema);
  if (inputErrors.length) throw new Error(`consumer-universe input schema failure:
${inputErrors.join(`
`)}`);
  const universePreimage = structuredClone(universe);
  delete universePreimage.universe_hash;
  const universeHash = sha256(canonicalize(universePreimage));
  if (universe.universe_hash !== universeHash || receipt.input.universe_hash !== universeHash) throw new Error("consumer-universe semantic input hash drift");
  if (receipt.schema_sha256 !== sha256(inputSchemaSource)) throw new Error("consumer-universe input schema hash drift");
  if (receipt.receipt_schema_sha256 !== sha256(receiptSchemaSource)) throw new Error("consumer-universe receipt schema hash drift");
  const resolverSource = validationMode === "immutable" ? immutableCapture.sources.resolver : readFileSync(resolverPath);
  if (receipt.resolver_sha256 !== sha256(resolverSource)) throw new Error("consumer-universe resolver hash drift");
  const registry = validationMode === "immutable" ? immutableCapture.registry : consumerWaveRegistry();
  if (receipt.formation_wave_registry_sha256 !== registry.sha256) throw new Error("consumer-universe wave registry hash drift");
  if (canonicalize(receipt.discovery_methods) !== canonicalize([...universe.discovery.methods].sort(compareCanonicalText)))
    throw new Error("consumer-universe discovery-method projection drift");
  const authority = validationMode === "immutable" ? immutableCapture.authority : validateConsumerBoundsAuthority(boundsAuthority, {
    verificationPath: boundsAuthorityVerificationPath ?? boundsAuthority.path,
    requireCanonicalPath: requireCanonicalBoundsAuthority,
    allowFixtureProfile: allowFixtureBoundsAuthority
  });
  if (canonicalize(universe.discovery.bounds) !== canonicalize(authority.manifest.bounds)) throw new Error("consumer-universe bounds differ from the bound C00U authority");
  if (receipt.epoch.bounds_sha256 !== authority.bounds_sha256) throw new Error("consumer-universe receipt does not bind authority bounds hash");
  validationMode === "live" ? verifyConsumerEvidence(universe.discovery.evidence, "discovery") : verifyCapturedEvidence(universe.discovery.evidence, "discovery");
  const rootState = validationMode === "live" ? validateConsumerRootState(
    universe,
    authority.manifest.bounds,
    registry.ids,
    { allowedAdditionalWorktrees }
  ) : validateImmutableConsumerRootState(universe, authority.manifest.bounds, registry.ids), epochPreimage = structuredClone(receipt.epoch);
  if (delete epochPreimage.epoch_sha256, receipt.epoch.epoch_sha256 !== sha256(canonicalize(epochPreimage))) throw new Error("consumer-universe epoch hash drift");
  const started = Date.parse(receipt.epoch.started_at), completed = Date.parse(receipt.epoch.completed_at), observed = Date.parse(receipt.observed_at), resolved = Date.parse(receipt.resolved_at);
  if (![started, completed, observed, resolved].every(Number.isFinite)) throw new Error("consumer-universe timestamps are invalid");
  if (universe.observed_at !== receipt.observed_at || receipt.observed_at !== universe.discovery.epoch.completed_at) throw new Error("consumer-universe observation timestamp drift");
  if (completed < started || resolved < completed) throw new Error("consumer-universe epoch ordering is invalid");
  if ((completed - started) / 1e3 > receipt.epoch.max_age_seconds || receipt.epoch.max_age_seconds > 3600) throw new Error("consumer-universe epoch exceeds its bounded lifetime");
  if (validationMode === "live" && (now - resolved > receipt.epoch.max_age_seconds * 1e3 || resolved - now > 5e3))
    throw new Error("consumer-universe receipt is stale or future-dated");
  const roots = [...receipt.roots], edges = [...receipt.edges];
  if (canonicalize(roots.map(({ id }) => id)) !== canonicalize(roots.map(({ id }) => id).sort(compareCanonicalText)) || new Set(roots.map(({ id }) => id)).size !== roots.length)
    throw new Error("consumer-universe receipt roots must be uniquely ID-sorted");
  if (canonicalize(edges.map(({ id }) => id)) !== canonicalize(edges.map(({ id }) => id).sort(compareCanonicalText)) || new Set(edges.map(({ id }) => id)).size !== edges.length)
    throw new Error("consumer-universe receipt edges must be uniquely ID-sorted");
  const expectedRoots = universe.roots.map(rootProjection).sort((left, right) => compareCanonicalText(left.id, right.id));
  if (roots.length !== expectedRoots.length)
    throw new Error("consumer-universe receipt roots are not the exact input disposition projection");
  for (const [index, expectedRoot] of expectedRoots.entries()) {
    const returnedRoot = roots[index];
    if (!returnedRoot || returnedRoot.id !== expectedRoot.id)
      throw new Error("consumer-universe receipt roots are not the exact input disposition projection");
    const returnedCore = structuredClone(returnedRoot), hasContentSnapshot = Object.hasOwn(returnedCore, "content_snapshot"), contentSnapshot = returnedCore.content_snapshot;
    if (delete returnedCore.content_snapshot, canonicalize(returnedCore) !== canonicalize(expectedRoot))
      throw new Error("consumer-universe receipt roots are not the exact input disposition projection");
    if (expectedRoot.status === "included") {
      if (!hasContentSnapshot) throw new Error(`included consumer root ${expectedRoot.id} lacks content_snapshot`);
      validateConsumerRootContentSnapshot(contentSnapshot, `included consumer root ${expectedRoot.id} content_snapshot`);
    } else if (hasContentSnapshot)
      throw new Error(`${expectedRoot.status} consumer root ${expectedRoot.id} must not carry content_snapshot`);
  }
  const universeEdgesById = new Map(universe.edges.map((edge) => [edge.id, edge]));
  for (const edge of edges) {
    const declared = universeEdgesById.get(edge.id);
    if (!declared) throw new Error(`consumer-universe receipt contains undeclared edge: ${edge.id}`);
    const scope = authority.manifest.bounds.edge_scope.find((item) => item.package === declared.package && item.target === declared.target);
    if (!scope || !scope.kinds.includes(declared.kind)) throw new Error(`consumer-universe edge lies outside the bound scope: ${edge.id}`);
    verifyConsumerOwner(registry.ids, declared.owner_wave, `edge ${declared.id}`);
    const sourceRoot = rootState.rootsById.get(declared.source);
    if (!sourceRoot) throw new Error(`edge ${declared.id} names unknown source root ${declared.source}`);
    const sourceEvidenceBase = sourceRoot.disposition.status === "unavailable" ? void 0 : sourceRoot.canonical_realpath;
    validationMode === "live" ? verifyConsumerEvidence(declared.evidence, `edge ${declared.id}`, sourceEvidenceBase) : verifyCapturedEvidence(declared.evidence, `edge ${declared.id}`, sourceEvidenceBase);
    const observationMode = consumerEdgeObservationMode(declared, rootState.rootsById);
    declared.disposition.status === "unavailable" ? (validationMode === "live" ? verifyConsumerEvidence(declared.disposition.evidence, `unavailable edge ${declared.id}`) : verifyCapturedEvidence(declared.disposition.evidence, `unavailable edge ${declared.id}`), verifyConsumerOwner(registry.ids, declared.disposition.retrigger.wave_id, `unavailable edge ${declared.id} retrigger`)) : declared.disposition.status === "excluded" && (validationMode === "live" ? verifyConsumerEvidence(declared.disposition.evidence, `excluded edge ${declared.id}`, sourceRoot.canonical_realpath) : verifyCapturedEvidence(declared.disposition.evidence, `excluded edge ${declared.id}`, sourceRoot.canonical_realpath));
    const expected = edgeProjection(declared, edge.observations);
    if (canonicalize(edge) !== canonicalize(expected)) throw new Error(`consumer-universe edge disposition projection drift: ${edge.id}`);
    if (canonicalize(edge.observations) !== canonicalize([...edge.observations].sort(compareObservation)))
      throw new Error(`consumer-universe edge observations are not canonically ordered: ${edge.id}`);
    if (edge.observations_sha256 !== sha256(canonicalize(edge.observations))) throw new Error(`consumer-universe edge observation hash drift: ${edge.id}`);
    const observationIdentities = /* @__PURE__ */ new Set();
    for (const observation of edge.observations) {
      if (validationMode === "live") {
        if (requireFile(observation.path, `consumer-universe edge ${edge.id} observation`), observation.canonical_realpath !== realpathSync(observation.path)) throw new Error(`consumer-universe observation realpath drift: ${edge.id}`);
        if (observation.file_sha256 !== sha256(readFileSync(observation.path))) throw new Error(`consumer-universe observation content drift: ${edge.id}`);
      } else {
        if (capturedPath(observation.path, `consumer-universe edge ${edge.id} observation path`), capturedPath(observation.canonical_realpath, `consumer-universe edge ${edge.id} observation canonical realpath`), !hashPattern.test(observation.file_sha256 ?? "") || typeof observation.locator != "string" || observation.locator.length === 0)
          throw new Error(`consumer-universe edge ${edge.id} observation lacks its captured hash or locator`);
        if (sourceRoot.disposition.status !== "unavailable" && !within(sourceRoot.canonical_realpath, observation.canonical_realpath))
          throw new Error(`consumer-universe edge ${edge.id} observation escapes source root ${sourceRoot.canonical_realpath}`);
      }
      const identity = `${observation.canonical_realpath}\0${observation.locator}`;
      if (observationIdentities.has(identity)) throw new Error(`consumer-universe edge repeats an occurrence observation: ${edge.id}`);
      observationIdentities.add(identity);
    }
    if (observationMode === "none") {
      if (edge.observations.length !== 0) throw new Error(`unavailable consumer-universe edge has observations: ${edge.id}`);
    } else {
      exactPathSet(
        edge.observations.map(({ canonical_realpath }) => canonical_realpath),
        declared.evidence.map(({ canonical_realpath }) => canonical_realpath),
        `consumer-universe edge evidence/observation path coverage: ${edge.id}`
      );
      for (const proof of declared.evidence)
        if (edge.observations.filter(({ canonical_realpath }) => canonical_realpath === proof.canonical_realpath).some(({ file_sha256 }) => file_sha256 !== proof.sha256))
          throw new Error(`consumer-universe edge evidence/observation content drift: ${edge.id}`);
    }
  }
  if (edges.length !== universe.edges.length) throw new Error("consumer-universe receipt edges are not the exact input edge projection");
  const counts = {
    roots: universe.roots.length,
    included_roots: statusCount(universe.roots, "included"),
    excluded_roots: statusCount(universe.roots, "excluded"),
    unavailable_roots: statusCount(universe.roots, "unavailable"),
    edges: universe.edges.length,
    included_edges: statusCount(universe.edges, "included"),
    excluded_edges: statusCount(universe.edges, "excluded"),
    unavailable_edges: statusCount(universe.edges, "unavailable"),
    observations: edges.reduce((total, edge) => total + edge.observations.length, 0)
  };
  if (canonicalize(receipt.counts) !== canonicalize(counts)) throw new Error("consumer-universe receipt partition counts drift");
  if (receipt.epoch.observed_roots_sha256 !== sha256(canonicalize(roots))) throw new Error("consumer-universe observed root epoch hash drift");
  if (receipt.epoch.observed_edges_sha256 !== sha256(canonicalize(edges))) throw new Error("consumer-universe observed edge epoch hash drift");
  const expectedBlockers = universeBlockers(universe);
  if (canonicalize(receipt.blockers) !== canonicalize(expectedBlockers)) throw new Error("consumer-universe receipt blockers are not the exact unavailable disposition projection");
  if (receipt.resolvable !== (expectedBlockers.length === 0)) throw new Error("consumer-universe receipt resolvability does not derive from unavailable dispositions");
  if (requireResolvable && (receipt.resolvable !== !0 || receipt.blockers.length !== 0)) throw new Error("consumer-universe receipt is blocking, not dependency green");
  const result = {
    receipt,
    universe,
    receipt_file_sha256: sha256(receiptSource),
    input_file_sha256: sha256(inputSource),
    input_schema_sha256: sha256(inputSchemaSource),
    receipt_schema_sha256: sha256(receiptSchemaSource),
    resolver_sha256: sha256(resolverSource),
    bounds_authority: authority.binding,
    roots_sha256: sha256(canonicalize(roots)),
    edges_sha256: sha256(canonicalize(edges)),
    ...immutableCapture ? { immutable_capture: structuredClone(immutableCapture.reference) } : {}
  };
  if (immutableCapture) {
    const expectedBinding = consumerUniverseImmutableBindingFromResult(receiptPath, result);
    if (canonicalize(immutableBinding) !== canonicalize(expectedBinding))
      throw new Error("consumer-universe external immutable binding is not the exact frozen receipt projection");
  }
  return result;
}
function consumerUniverseImmutableBindingFromResult(receiptPath, result) {
  const { receipt } = result;
  return consumerUniverseImmutableBindingProjection({
    receipt_path: receiptPath,
    receipt_file_sha256: result.receipt_file_sha256,
    receipt_hash: receipt.receipt_hash,
    input_path: receipt.input.path,
    input_file_sha256: result.input_file_sha256,
    universe_hash: receipt.input.universe_hash,
    resolver_sha256: result.resolver_sha256,
    input_schema_sha256: result.input_schema_sha256,
    receipt_schema_sha256: result.receipt_schema_sha256,
    bounds_authority: result.bounds_authority,
    bounds_sha256: receipt.epoch.bounds_sha256,
    formation_wave_registry_sha256: receipt.formation_wave_registry_sha256,
    observed_at: receipt.observed_at,
    resolved_at: receipt.resolved_at,
    epoch: receipt.epoch,
    counts: receipt.counts,
    roots_sha256: result.roots_sha256,
    edges_sha256: result.edges_sha256,
    resolvable: receipt.resolvable,
    blockers: receipt.blockers
  });
}
function consumerUniverseAnnexProjection(waveId, receiptPath, result, immutableCapture = result.immutable_capture, snapshotIndex = result.snapshot_index) {
  const binding = consumerUniverseImmutableBindingFromResult(receiptPath, result), { schema: _bindingSchema, ...projection } = binding;
  return {
    schema: "vnext-consumer-universe-return-annex/1",
    artifact: { path: receiptPath, schema: result.receipt.schema, bytes: Buffer.byteLength(`${canonicalize(result.receipt)}\n`), sha256: result.receipt_file_sha256 },
    wave_id: waveId,
    ...projection,
    ...immutableCapture ? { immutable_capture: structuredClone(immutableCapture) } : {},
    ...snapshotIndex ? { snapshot_index: validateConsumerRootSnapshotIndexReference(snapshotIndex) } : {}
  };
}
function consumerUniverseDelta(before, after) {
  const beforeById = new Map(before.map((item) => [item.id, sha256(canonicalize(item))])), afterById = new Map(after.map((item) => [item.id, sha256(canonicalize(item))]));
  return [.../* @__PURE__ */ new Set([...beforeById.keys(), ...afterById.keys()])].sort(compareCanonicalText).flatMap((id) => {
    const beforeSha256 = beforeById.get(id) ?? "absent", afterSha256 = afterById.get(id) ?? "absent";
    return beforeSha256 === afterSha256 ? [] : [{
      id,
      change: beforeSha256 === "absent" ? "added" : afterSha256 === "absent" ? "removed" : "changed",
      before_sha256: beforeSha256,
      after_sha256: afterSha256
    }];
  });
}
export {
  assertSameConsumerUniverseImmutableProjection,
  consumerUniverseAnnexProjection,
  consumerUniverseDelta,
  consumerUniverseImmutableBindingFromResult,
  consumerUniverseImmutableBindingProjection,
  consumerUniverseImmutableCaptureDocument,
  consumerUniverseImmutableCaptureReference,
  validateConsumerRootSnapshotIndexReference,
  validateConsumerUniverseImmutableBinding,
  validateConsumerUniverseImmutableCapture,
  validateConsumerUniverseReceipt
};
