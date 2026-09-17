#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  readlinkSync,
  realpathSync,
  statSync,
  writeFileSync
} from "node:fs";
import { createRequire } from "node:module";
import { basename, dirname, extname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalize, compareCanonicalText, decodeUtf8Strict, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import {
  captureConsumerRootSnapshot,
  consumerRootSnapshotContentProjection,
  consumerRootSnapshotIndexDocument,
  consumerRootSnapshotIndexReference,
  consumerRootSnapshotSchemaPath
} from "./consumer-root-snapshot.mjs";
import {
  openingStateFailure,
  routingPiFailure,
  waveCell,
  waveCellCount,
  waveFiles,
  waveIdPattern,
  waveTotal
} from "./wave-table-contract.mjs";
const requirePinned = createRequire(import.meta.url), ts = requirePinned("typescript"), requiredTypeScriptVersion = "6.0.3";
if (ts.version !== requiredTypeScriptVersion)
  throw new Error(`consumer source projection requires TypeScript ${requiredTypeScriptVersion}; observed ${ts.version}`);
const toolPath = fileURLToPath(import.meta.url), root = resolve(dirname(toolPath), ".."), inputSchemaPath = resolve(root, "consumer-universe.schema.json"), receiptSchemaPath = resolve(root, "consumer-universe-receipt.schema.json"), requiredMethods = [
  "css",
  "dynamic",
  "manifests",
  "npm_package_locks_v2_v3",
  "origins",
  "realpaths",
  "runtime",
  "type",
  "worktrees"
], requiredIgnoredDirectories = [
  ".cache",
  ".git",
  ".next",
  ".nuxt",
  ".pnpm",
  ".turbo",
  ".venv",
  ".vnext",
  ".yarn",
  "__pycache__",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "playwright-report",
  "r1-opus-refuted",
  "target",
  "test-results",
  "tranches",
  "venv"
], requiredObservedKinds = ["css", "dynamic", "lock", "manifest", "peer", "runtime", "transitive", "type"], sourceExtensions = /* @__PURE__ */ new Set([
  ".astro",
  ".cjs",
  ".css",
  ".cts",
  ".html",
  ".js",
  ".jsx",
  ".less",
  ".mdx",
  ".mjs",
  ".mts",
  ".sass",
  ".scss",
  ".styl",
  ".svelte",
  ".ts",
  ".tsx",
  ".vue"
]), sourceDecoder = new TextDecoder("utf-8", { fatal: !0 }), sha256 = (input) => createHash("sha256").update(input).digest("hex"), compareId = (left, right) => compareCanonicalText(left.id, right.id), compareObservation = (left, right) => compareCanonicalText(left.canonical_realpath, right.canonical_realpath) || compareCanonicalText(left.locator, right.locator) || compareCanonicalText(left.path, right.path) || compareCanonicalText(left.file_sha256, right.file_sha256);
function die(message) {
  throw new Error(message);
}
function parseArguments(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    ["--input", "--output", "--snapshot-store", "--snapshot-index"].includes(argument) || die(`unknown argument ${argument}`);
    const value = argv[index + 1];
    (!value || value.startsWith("--")) && die(`${argument} requires a path`), (argument === "--snapshot-store" || argument === "--snapshot-index") && (!isAbsolute(value) || resolve(value) !== value) && die(`${argument} requires an explicit absolute normalized path`);
    const key = argument === "--snapshot-store" ? "snapshotStore" : argument === "--snapshot-index" ? "snapshotIndex" : argument.slice(2);
    result[key] && die(`${argument} may appear only once`), result[key] = argument === "--snapshot-store" || argument === "--snapshot-index" ? value : resolve(value), index += 1;
  }
  return (!result.input || !result.output || !result.snapshotStore || !result.snapshotIndex) && die("usage: resolve-consumer-universe.mjs --input <universe.json> --output <receipt.json> --snapshot-store <absolute-directory> --snapshot-index <absolute-index.json>"), existsSync(result.input) || die(`consumer-universe input does not exist: ${result.input}`), result.input = realpathSync(result.input), result.output = join(realpathSync(dirname(result.output)), basename(result.output)), result.snapshotStore = canonicalPotentialPath(result.snapshotStore), result.snapshotIndex = join(realpathSync(dirname(result.snapshotIndex)), basename(result.snapshotIndex)), (/* @__PURE__ */ new Set([result.input, result.output, result.snapshotIndex])).size !== 3 && die("input, output, and snapshot-index paths must differ"), result;
}
function readStrict(path, label) {
  existsSync(path) || die(`${label} does not exist: ${path}`);
  const source = decodeUtf8Strict(readFileSync(path));
  try {
    return { source, value: parseJsonStrict(source) };
  } catch (error) {
    die(`${label} is not strict JSON: ${error.message}`);
  }
}
function consumerWaveRegistry() {
  const rows = /* @__PURE__ */ new Map();
  for (const relativePath of waveFiles) {
    const source = readFileSync(resolve(root, relativePath), "utf8");
    for (const line of source.split(`
`)) {
      if (!line.startsWith("|")) continue;
      const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
      if (!waveIdPattern.test(cells[0] ?? "")) continue;
      cells.length !== waveCellCount && die(`${relativePath}: ${cells[waveCell.id]} must have ${waveCellCount} canonical cells`);
      const openingFailure = openingStateFailure(cells[waveCell.bornRed]);
      openingFailure && die(`${relativePath}: ${cells[waveCell.id]} ${openingFailure}`);
      const routingFailure = routingPiFailure(cells[waveCell.routingPi]);
      routingFailure && die(`${relativePath}: ${cells[waveCell.id]} ${routingFailure}`), rows.has(cells[waveCell.id]) && die(`${relativePath}: duplicate canonical wave ${cells[waveCell.id]}`), rows.set(cells[waveCell.id], cells);
    }
  }
  rows.size !== waveTotal && die(`canonical wave registry has ${rows.size} waves; expected ${waveTotal}`);
  const vector = [...rows].sort(([left], [right]) => compareCanonicalText(left, right)).map(([id, cells]) => ({ id, cells }));
  return { ids: new Set(rows.keys()), sha256: sha256(canonicalize(vector)) };
}
function exactSet(actual, expected, context) {
  const left = [...actual].sort(), right = [...expected].sort();
  canonicalize(left) !== canonicalize(right) && die(`${context} must be exact; observed ${left.join(",") || "<empty>"}; declared ${right.join(",") || "<empty>"}`);
}
function within(base, candidate) {
  const offset = relative(base, candidate);
  return offset === "" || !offset.startsWith("..") && !isAbsolute(offset);
}
function canonicalPotentialPath(path) {
  let ancestor = resolve(path);
  const suffix = [];
  for (; !existsSync(ancestor); ) {
    const parent = dirname(ancestor);
    if (parent === ancestor) return resolve(path);
    suffix.unshift(basename(ancestor)), ancestor = parent;
  }
  return resolve(realpathSync(ancestor), ...suffix);
}
function assertGeneratedPathDisjoint(generatedPath, label, universe) {
  const declaredPaths = /* @__PURE__ */ new Set();
  for (const search of universe.discovery.bounds.search_roots)
    declaredPaths.add(search.path), declaredPaths.add(search.canonical_realpath);
  for (const item of universe.roots)
    declaredPaths.add(item.path), declaredPaths.add(item.canonical_realpath);
  for (const item of universe.discovery.bounds.required_roots) declaredPaths.add(item.canonical_realpath);
  for (const item of universe.discovery.bounds.required_paths)
    declaredPaths.add(item.path), declaredPaths.add(item.canonical_realpath);
  for (const declared of declaredPaths) {
    const canonical = canonicalPotentialPath(declared);
    (within(canonical, generatedPath) || within(generatedPath, canonical)) && die(`${label} must be disjoint from every search/consumer path: ${generatedPath} conflicts with ${declared}`);
  }
}
function ensureSnapshotStore(snapshotStore) {
  mkdirSync(snapshotStore, { recursive: !0 }), (!existsSync(snapshotStore) || lstatSync(snapshotStore).isSymbolicLink() || !statSync(snapshotStore).isDirectory()) && die(`snapshot store must be a regular directory: ${snapshotStore}`);
  const canonical = realpathSync(snapshotStore);
  return canonical !== snapshotStore && die(`snapshot store must use canonical realpath ${canonical}`), canonical;
}
function materializeSnapshotSchema(snapshotStore) {
  const source = readFileSync(consumerRootSnapshotSchemaPath), schemaHash = sha256(source), directory = join(snapshotStore, "schemas");
  mkdirSync(directory, { recursive: !0 }), (lstatSync(directory).isSymbolicLink() || !statSync(directory).isDirectory() || realpathSync(directory) !== directory) && die(`snapshot schema directory must be a canonical regular directory: ${directory}`);
  const path = join(directory, `${schemaHash}.json`);
  return existsSync(path) ? (lstatSync(path).isSymbolicLink() || !lstatSync(path).isFile() || !readFileSync(path).equals(source)) && die(`snapshot schema material collision: ${path}`) : writeFileSync(path, source, { flag: "wx" }), realpathSync(path);
}
function verifyConsumerEvidence(evidence, context, requiredBase = void 0) {
  const identities = /* @__PURE__ */ new Set();
  for (const [index, item] of evidence.entries()) {
    existsSync(item.path) || die(`${context} evidence ${index + 1} is missing: ${item.path}`), !lstatSync(item.path).isFile() && !lstatSync(item.path).isSymbolicLink() && die(`${context} evidence ${index + 1} is not a file: ${item.path}`);
    const actualRealpath = realpathSync(item.path);
    actualRealpath !== item.canonical_realpath && die(`${context} evidence ${index + 1} canonical realpath ${item.canonical_realpath}; observed ${actualRealpath}`), requiredBase && !within(requiredBase, actualRealpath) && die(`${context} evidence ${index + 1} escapes source root ${requiredBase}: ${actualRealpath}`);
    const actual = sha256(readFileSync(item.path));
    actual !== item.sha256 && die(`${context} evidence ${index + 1} hash ${actual}; expected ${item.sha256}`);
    const identity = `${actualRealpath}\0${actual}`;
    identities.has(identity) && die(`${context} repeats semantic evidence ${actualRealpath}`), identities.add(identity);
  }
}
function verifyConsumerOwner(waveIds, owner, context) {
  waveIds.has(owner) || die(`${context} names unknown canonical wave owner ${owner}`);
}
function verifyRequiredConsumerIdentities(bounds, rootsById) {
  const requiredRootIds = /* @__PURE__ */ new Set(), requiredRootPaths = /* @__PURE__ */ new Set(), requiredRootsById = /* @__PURE__ */ new Map();
  for (const required of bounds.required_roots) {
    requiredRootIds.has(required.id) && die(`duplicate required consumer root ID ${required.id}`), requiredRootPaths.has(required.canonical_realpath) && die(`duplicate required consumer root realpath ${required.canonical_realpath}`), requiredRootIds.add(required.id), requiredRootPaths.add(required.canonical_realpath), requiredRootsById.set(required.id, required);
    const rootRecord = rootsById.get(required.id);
    (!rootRecord || rootRecord.canonical_realpath !== required.canonical_realpath) && die(`required consumer root identity missing: ${required.id}`), rootRecord.disposition.status === "excluded" && die(`required consumer root ${required.id} cannot be excluded`);
  }
  const requiredPathIds = /* @__PURE__ */ new Set(), requiredCanonicalPaths = /* @__PURE__ */ new Set();
  for (const required of bounds.required_paths) {
    (requiredPathIds.has(required.id) || requiredRootIds.has(required.id)) && die(`duplicate required consumer identity ID ${required.id}`), requiredPathIds.add(required.id);
    const declaration = requiredRootsById.get(required.repository_root_id), rootRecord = rootsById.get(required.repository_root_id);
    (!declaration || !rootRecord) && die(`required consumer path ${required.id} names unknown repository root ${required.repository_root_id}`);
    const expectedCanonical = resolve(declaration.canonical_realpath, required.relative_path);
    if ((required.kind !== "repository-subdirectory" || expectedCanonical !== required.canonical_realpath || expectedCanonical === declaration.canonical_realpath || !within(declaration.canonical_realpath, expectedCanonical)) && die(`required consumer path ${required.id} violates its typed repository-subdirectory law`), (requiredCanonicalPaths.has(required.canonical_realpath) || requiredRootPaths.has(required.canonical_realpath)) && die(`duplicate required consumer identity realpath ${required.canonical_realpath}`), requiredCanonicalPaths.add(required.canonical_realpath), rootRecord.disposition.status === "unavailable") continue;
    (!existsSync(required.path) || !statSync(required.path).isDirectory()) && die(`required consumer path is unavailable: ${required.id}`);
    const canonical = realpathSync(required.path);
    canonical !== required.canonical_realpath && die(`required consumer path ${required.id} canonical realpath ${required.canonical_realpath}; observed ${canonical}`), (!within(rootRecord.canonical_realpath, canonical) || canonical === rootRecord.canonical_realpath) && die(`required consumer path escapes repository root: ${required.id}`);
  }
}
function runGit(repository, args, context, allowFailure = !1) {
  const result = spawnSync("git", ["-C", repository, ...args], {
    encoding: null,
    maxBuffer: 134217728
  });
  if (result.error && die(`${context}: could not execute git: ${result.error.message}`), result.status !== 0) {
    if (allowFailure) return null;
    die(`${context}: git ${args.join(" ")} failed: ${result.stderr.toString("utf8").trim()}`);
  }
  return result.stdout;
}
function nulStrings(buffer) {
  return buffer.toString("utf8").split("\0").filter(Boolean);
}
function gitDirtyDigest(repository) {
  const status = runGit(repository, ["status", "--porcelain=v2", "-z", "--untracked-files=all"], "dirty status"), diff = runGit(repository, ["diff", "--binary", "--no-ext-diff", "HEAD", "--"], "dirty diff"), untracked = nulStrings(runGit(repository, ["ls-files", "--others", "--exclude-standard", "-z"], "untracked census")).sort().map((relativePath) => {
    const path = join(repository, relativePath), metadata = lstatSync(path);
    let contents, type;
    return metadata.isSymbolicLink() ? (type = "symlink", contents = Buffer.from(readlinkSync(path))) : metadata.isFile() ? (type = "file", contents = readFileSync(path)) : die(`untracked path is neither file nor symlink: ${path}`), {
      path: relativePath,
      mode: metadata.mode,
      type,
      sha256: sha256(contents)
    };
  });
  return sha256(canonicalize({
    algorithm: "git-dirty-sha256/1",
    status_sha256: sha256(status),
    diff_sha256: sha256(diff),
    untracked
  }));
}
function resolveGitIdentity(repository) {
  const topLevel = runGit(repository, ["rev-parse", "--show-toplevel"], "Git root").toString("utf8").trim(), canonical = realpathSync(topLevel);
  canonical !== realpathSync(repository) && die(`${repository} is not a Git repository root; observed ${canonical}`);
  const branchBuffer = runGit(repository, ["symbolic-ref", "--quiet", "--short", "HEAD"], "Git branch", !0);
  branchBuffer || die(`${repository} has detached HEAD; a named branch is required for the frozen universe`);
  const branch = branchBuffer.toString("utf8").trim(), head = runGit(repository, ["rev-parse", "HEAD"], "Git HEAD").toString("utf8").trim(), origins = runGit(repository, ["remote"], "Git remotes").toString("utf8").trim().split(`
`).filter(Boolean).includes("origin") ? runGit(repository, ["remote", "get-url", "--all", "origin"], "Git origin").toString("utf8").trim().split(`
`).filter(Boolean).sort() : [], worktrees = runGit(repository, ["worktree", "list", "--porcelain"], "Git worktrees").toString("utf8").split(`
`).filter((line) => line.startsWith("worktree ")).map((line) => realpathSync(line.slice(9))).sort();
  return {
    canonical_realpath: canonical,
    branch,
    head,
    dirty_sha256: gitDirtyDigest(canonical),
    origins,
    worktrees
  };
}
function validateConsumerRootState(universe, bounds, waveIds, { allowedAdditionalWorktrees = [] } = {}) {
  (!universe || !Array.isArray(universe.roots) || !bounds || !Array.isArray(bounds.required_roots) || !(waveIds instanceof Set) || !Array.isArray(allowedAdditionalWorktrees)) && die("consumer root state validation requires universe roots, semantic bounds, and the canonical wave set");
  const unclaimedAdditionalWorktrees = /* @__PURE__ */ new Set();
  for (const path of allowedAdditionalWorktrees)
    (typeof path != "string" || !isAbsolute(path) || !existsSync(path) || !statSync(path).isDirectory() || realpathSync(path) !== path) && die(`allowed additional Git worktree must be an existing canonical absolute path: ${path}`), unclaimedAdditionalWorktrees.has(path) && die(`duplicate allowed additional Git worktree: ${path}`), unclaimedAdditionalWorktrees.add(path);
  const rootIds = /* @__PURE__ */ new Set(), declaredRealpaths = /* @__PURE__ */ new Map(), rootsById = /* @__PURE__ */ new Map(), blockers = [], availableRoots = [];
  for (const rootRecord of universe.roots) {
    rootIds.has(rootRecord.id) && die(`duplicate root id ${rootRecord.id}`), rootIds.add(rootRecord.id), rootsById.set(rootRecord.id, rootRecord), declaredRealpaths.has(rootRecord.canonical_realpath) && die(`duplicate canonical realpath ${rootRecord.canonical_realpath} for ${declaredRealpaths.get(rootRecord.canonical_realpath)} and ${rootRecord.id}`), declaredRealpaths.set(rootRecord.canonical_realpath, rootRecord.id), bounds.search_roots.some((search) => within(search.canonical_realpath, rootRecord.canonical_realpath)) || die(`root ${rootRecord.id} escapes every bounded search root: ${rootRecord.canonical_realpath}`);
    for (const [name, observedSet] of Object.entries(rootRecord.provenance))
      verifyConsumerEvidence(observedSet.evidence, `root ${rootRecord.id} ${name}`);
    if (rootRecord.disposition.status === "unavailable") {
      canonicalPotentialPath(rootRecord.path) !== rootRecord.canonical_realpath && die(`unavailable root ${rootRecord.id} must use its declared canonical path: ${rootRecord.canonical_realpath}`), (existsSync(rootRecord.path) || existsSync(rootRecord.canonical_realpath)) && die(`unavailable root ${rootRecord.id} exists and must be observed, not declared unavailable: ${rootRecord.canonical_realpath}`), verifyConsumerEvidence(rootRecord.disposition.evidence, `unavailable root ${rootRecord.id}`), verifyConsumerOwner(waveIds, rootRecord.disposition.retrigger.wave_id, `unavailable root ${rootRecord.id} retrigger`), blockers.push(`root:${rootRecord.id}:unavailable:${rootRecord.disposition.retrigger.wave_id}:${rootRecord.disposition.retrigger.condition}`);
      continue;
    }
    (!existsSync(rootRecord.path) || !statSync(rootRecord.path).isDirectory()) && die(`root ${rootRecord.id} is not a directory: ${rootRecord.path}`);
    const identity = resolveGitIdentity(rootRecord.path);
    identity.canonical_realpath !== rootRecord.canonical_realpath && die(`root ${rootRecord.id} canonical realpath ${rootRecord.canonical_realpath}; observed ${identity.canonical_realpath}`);
    for (const field of ["branch", "head", "dirty_sha256"])
      identity[field] !== rootRecord[field] && die(`root ${rootRecord.id} forged Git ${field} ${rootRecord[field]}; observed ${identity[field]}`);
    exactSet(identity.origins, rootRecord.provenance.origins.values, `root ${rootRecord.id} Git origins`);
    const declaredWorktrees = new Set(rootRecord.provenance.worktrees.values);
    for (const declared of declaredWorktrees)
      identity.worktrees.includes(declared) || die(`root ${rootRecord.id} declared Git worktree is no longer present: ${declared}`);
    for (const observedWorktree of identity.worktrees)
      declaredWorktrees.has(observedWorktree) || unclaimedAdditionalWorktrees.delete(observedWorktree) || die(`root ${rootRecord.id} has an undeclared additional Git worktree: ${observedWorktree}`);
    rootRecord.disposition.status === "included" ? verifyConsumerOwner(waveIds, rootRecord.disposition.owner_wave, `included root ${rootRecord.id}`) : verifyConsumerEvidence(rootRecord.disposition.evidence, `excluded root ${rootRecord.id}`, rootRecord.canonical_realpath), availableRoots.push({ ...rootRecord, identity });
  }
  return unclaimedAdditionalWorktrees.size && die(`allowed additional Git worktrees were not observed: ${[...unclaimedAdditionalWorktrees].sort(compareCanonicalText).join(",")}`), verifyRequiredConsumerIdentities(bounds, rootsById), { rootsById, availableRoots, blockers };
}
function consumerEdgeObservationMode(edge, rootsById) {
  const sourceRoot = rootsById.get(edge.source);
  sourceRoot || die(`edge ${edge.id} names unknown source root ${edge.source}`);
  const internalTarget = !edge.target.startsWith("external:"), targetRoot = internalTarget ? rootsById.get(edge.target) : null;
  return internalTarget && !targetRoot && die(`edge ${edge.id} names unknown internal target root ${edge.target}`), sourceRoot.disposition.status === "unavailable" ? (edge.disposition.status !== "unavailable" && die(`edge ${edge.id} from unavailable root must itself be unavailable`), "none") : targetRoot?.disposition.status === "unavailable" ? (edge.disposition.status !== "unavailable" && die(`edge ${edge.id} from an available source to unavailable target ${edge.target} must itself be unavailable`), "required") : (edge.disposition.status === "unavailable" && die(`edge ${edge.id} can be unavailable only when its source or internal target is unavailable`), edge.disposition.status === "included" && (sourceRoot.disposition.status !== "included" && die(`included edge ${edge.id} starts at non-included root ${edge.source}`), targetRoot && targetRoot.disposition.status !== "included" && die(`included edge ${edge.id} ends at non-included root ${edge.target}`)), "required");
}
function directoryEntries(path, state, context) {
  const entries = readdirSync(path, { withFileTypes: !0 }).sort((left, right) => compareCanonicalText(left.name, right.name));
  return state.entries += entries.length, state.entries > state.maxEntries && die(`${context} exceeded max_entries ${state.maxEntries}; a truncated scan cannot close the universe`), entries;
}
function discoverRepositories(bounds) {
  const ignored = new Set(bounds.ignored_directory_names), repositories = /* @__PURE__ */ new Set(), state = { entries: 0, maxEntries: bounds.max_entries }, visited = /* @__PURE__ */ new Set();
  function visit(path, depth, maximumDepth, scopeRoot) {
    const canonical = realpathSync(path);
    if (within(scopeRoot, canonical) || die(`bounded discovery encountered an escaping directory symlink ${path} -> ${canonical}`), !visited.has(canonical)) {
      if (visited.add(canonical), existsSync(join(canonical, ".git"))) {
        const top = runGit(canonical, ["rev-parse", "--show-toplevel"], `repository discovery ${canonical}`).toString("utf8").trim();
        repositories.add(realpathSync(top));
      }
      if (!(depth >= maximumDepth))
        for (const entry of directoryEntries(canonical, state, `repository discovery at ${canonical}`)) {
          if (ignored.has(entry.name)) continue;
          const child = join(canonical, entry.name);
          (entry.isDirectory() || entry.isSymbolicLink() && statSync(child).isDirectory()) && visit(child, depth + 1, maximumDepth, scopeRoot);
        }
    }
  }
  const seenSearchRoots = /* @__PURE__ */ new Set();
  for (const search of bounds.search_roots) {
    (!existsSync(search.path) || !statSync(search.path).isDirectory()) && die(`search root does not exist as a directory: ${search.path}`);
    const actual = realpathSync(search.path);
    actual !== search.canonical_realpath && die(`search root ${search.path} canonical realpath ${search.canonical_realpath}; observed ${actual}`), seenSearchRoots.has(actual) && die(`duplicate semantic search root ${actual}`), seenSearchRoots.add(actual), visit(actual, 0, search.max_depth, actual);
  }
  return [...repositories].sort();
}
function lineColumn(source, index) {
  const before = source.slice(0, index), line = before.split(`
`).length, previous = before.lastIndexOf(`
`);
  return `${line}:${index - previous}`;
}
function scopedPackage(specifier, scopes) {
  return scopes.filter((scope) => specifier === scope.package || specifier.startsWith(`${scope.package}/`)).sort((left, right) => right.package.length - left.package.length || compareCanonicalText(left.package, right.package))[0];
}
function addDetection(path, fileHash, scopes, detections, {
  kind,
  specifier,
  locator,
  packageSpecifier = specifier
}) {
  if (typeof specifier != "string" || specifier.length === 0) return;
  const scope = scopedPackage(packageSpecifier, scopes);
  !scope || !scope.kinds.includes(kind) || detections.push({
    package: scope.package,
    target: scope.target,
    specifier,
    kind,
    observation: {
      path,
      canonical_realpath: realpathSync(path),
      file_sha256: fileHash,
      locator
    }
  });
}
function scanManifest(path, source, fileHash, scopes, detections) {
  let manifest;
  try {
    manifest = parseJsonStrict(source);
  } catch (error) {
    die(`bounded manifest scan cannot parse ${path}: ${error.message}`);
  }
  for (const section of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
    const values = manifest[section];
    if (!(!values || typeof values != "object" || Array.isArray(values)))
      for (const scope of scopes) {
        if (typeof values[scope.package] != "string") continue;
        const kind = section === "peerDependencies" ? "peer" : "manifest";
        scope.kinds.includes(kind) && detections.push({
          package: scope.package,
          target: scope.target,
          specifier: values[scope.package],
          kind,
          observation: {
            path,
            canonical_realpath: realpathSync(path),
            file_sha256: fileHash,
            locator: `manifest:${section}.${scope.package}`
          }
        });
      }
  }
}
function scanNpmLock(path, source, fileHash, scopes, detections) {
  let lock;
  try {
    lock = parseJsonStrict(source);
  } catch (error) {
    die(`bounded npm lock scan cannot parse ${path}: ${error.message}`);
  }
  (![2, 3].includes(lock.lockfileVersion) || !lock.packages || typeof lock.packages != "object" || Array.isArray(lock.packages)) && die(`bounded npm lock scan supports only package-lock.json v2/v3 packages maps: ${path}`);
  for (const [coordinate, record] of Object.entries(lock.packages)) {
    (!record || typeof record != "object" || Array.isArray(record)) && die(`bounded npm lock scan found malformed package record ${coordinate} in ${path}`);
    for (const scope of scopes) {
      if (coordinate !== `node_modules/${scope.package}` && !coordinate.endsWith(`/node_modules/${scope.package}`)) continue;
      const installedSpecifier = typeof record.version == "string" && record.version !== "" ? record.version : typeof record.resolved == "string" && record.resolved !== "" ? record.resolved : record.link === !0 ? `link:${coordinate}` : null;
      installedSpecifier !== null && scope.kinds.includes("lock") && detections.push({
        package: scope.package,
        target: scope.target,
        specifier: installedSpecifier,
        kind: "lock",
        observation: {
          path,
          canonical_realpath: realpathSync(path),
          file_sha256: fileHash,
          locator: `npm-lock:packages.${JSON.stringify(coordinate)}.installed`
        }
      });
    }
    const kind = coordinate.includes("node_modules/") ? "transitive" : "lock";
    for (const section of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
      const values = record[section];
      if (!(!values || typeof values != "object" || Array.isArray(values)))
        for (const [dependency, specifier] of Object.entries(values))
          addDetection(path, fileHash, scopes, detections, {
            kind,
            packageSpecifier: dependency,
            specifier: String(specifier),
            locator: `npm-lock:packages.${JSON.stringify(coordinate)}.${section}.${dependency}:${String(specifier)}`
          });
    }
  }
}
const stylesheetExtensions = /* @__PURE__ */ new Set([".css", ".less", ".sass", ".scss", ".styl"]), hostExtensions = /* @__PURE__ */ new Set([".astro", ".html", ".mdx", ".svelte", ".vue"]), sourceNodeLimit = 25e4, scriptKinds = /* @__PURE__ */ new Map([
  [".cjs", ts.ScriptKind.JS],
  [".cts", ts.ScriptKind.TS],
  [".js", ts.ScriptKind.JS],
  [".jsx", ts.ScriptKind.JSX],
  [".mjs", ts.ScriptKind.JS],
  [".mts", ts.ScriptKind.TS],
  [".ts", ts.ScriptKind.TS],
  [".tsx", ts.ScriptKind.TSX]
]), importCandidatePattern = /\b(?:import|require)\s*(?:\?\s*\.)?\s*\(/g;
function syntaxFailure(path, source, index, message) {
  die(`bounded static import projection rejected ${path}:${lineColumn(source, index)}: ${message}`);
}
function nodeStart(unit, node, baseOffset) {
  return baseOffset + node.getStart(unit);
}
function literalSpecifier(unit, node, path, source, baseOffset, context, allowTemplate = !0) {
  const stringLiteral = node && ts.isStringLiteral(node), templateLiteral = node && ts.isNoSubstitutionTemplateLiteral(node);
  !stringLiteral && !(allowTemplate && templateLiteral) && syntaxFailure(
    path,
    source,
    node ? nodeStart(unit, node, baseOffset) : baseOffset,
    `${context} requires one quoted${allowTemplate ? " or zero-substitution-template" : ""} specifier`
  );
  const start = node.getStart(unit), raw = unit.text.slice(start, node.end), quote = raw[0];
  (!(stringLiteral && (quote === '"' || quote === "'") || templateLiteral && quote === "`") || raw.at(-1) !== quote) && syntaxFailure(path, source, baseOffset + start, `${context} has an unsupported literal form`);
  const value = raw.slice(1, -1);
  return value.includes("\\") && syntaxFailure(path, source, baseOffset + start, `${context} specifier escapes are outside the bounded literal grammar`), value.length === 0 && syntaxFailure(path, source, baseOffset + start, `${context} specifier is empty`), value;
}
function propertyName(unit, node, path, source, baseOffset, context) {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isStringLiteral(node)) return literalSpecifier(unit, node, path, source, baseOffset, context, !1);
  syntaxFailure(path, source, nodeStart(unit, node, baseOffset), `${context} property name must be one static identifier or string`);
}
function validateTypeAttributeEntries(unit, entries, path, source, baseOffset, context) {
  entries.length !== 1 && syntaxFailure(path, source, baseOffset + (entries.pos ?? 0), `${context} requires exactly one static type attribute`);
  const entry = entries[0];
  (!entry || propertyName(unit, entry.name, path, source, baseOffset, context) !== "type" || !ts.isStringLiteral(entry.value)) && syntaxFailure(
    path,
    source,
    entry ? nodeStart(unit, entry, baseOffset) : baseOffset,
    `${context} requires one literal type attribute`
  ), literalSpecifier(unit, entry.value, path, source, baseOffset, context, !1);
}
function validateDeclarationAttributes(unit, attributes, path, source, baseOffset, context) {
  attributes && ([ts.SyntaxKind.WithKeyword, ts.SyntaxKind.AssertKeyword].includes(attributes.token) || syntaxFailure(path, source, nodeStart(unit, attributes, baseOffset), `${context} uses an unsupported attribute keyword`), validateTypeAttributeEntries(unit, attributes.elements, path, source, baseOffset, context));
}
function validateDynamicImportOptions(unit, options, path, source, baseOffset, context) {
  (!ts.isObjectLiteralExpression(options) || options.properties.length !== 1) && syntaxFailure(path, source, nodeStart(unit, options, baseOffset), `${context} options require exactly one with/assert member`);
  const outer = options.properties[0];
  (!ts.isPropertyAssignment(outer) || !["with", "assert"].includes(propertyName(unit, outer.name, path, source, baseOffset, context)) || !ts.isObjectLiteralExpression(outer.initializer)) && syntaxFailure(
    path,
    source,
    nodeStart(unit, outer, baseOffset),
    `${context} supports only {with:{type:"..."}} or {assert:{type:"..."}}`
  );
  const entries = outer.initializer.properties;
  (entries.length !== 1 || !ts.isPropertyAssignment(entries[0])) && syntaxFailure(path, source, nodeStart(unit, outer.initializer, baseOffset), `${context} requires exactly one static type attribute`);
  const entry = entries[0];
  (propertyName(unit, entry.name, path, source, baseOffset, context) !== "type" || !ts.isStringLiteral(entry.initializer)) && syntaxFailure(path, source, nodeStart(unit, entry, baseOffset), `${context} requires one literal type attribute`), literalSpecifier(unit, entry.initializer, path, source, baseOffset, context, !1);
}
function importClauseKinds(unit, clause, path, source, baseOffset) {
  if (!clause) return ["runtime"];
  if (clause.isTypeOnly) return ["type"];
  let runtime = !!clause.name, type = !1;
  const bindings = clause.namedBindings;
  if (bindings && ts.isNamespaceImport(bindings))
    runtime = !0;
  else if (bindings && ts.isNamedImports(bindings)) {
    bindings.elements.length === 0 && syntaxFailure(path, source, nodeStart(unit, bindings, baseOffset), "empty import binding clause is ambiguous");
    for (const element of bindings.elements)
      element.isTypeOnly ? type = !0 : runtime = !0;
  }
  return !runtime && !type && syntaxFailure(path, source, nodeStart(unit, clause, baseOffset), "empty import binding clause is ambiguous"), [...runtime ? ["runtime"] : [], ...type ? ["type"] : []];
}
function exportClauseKinds(unit, declaration, path, source, baseOffset) {
  if (declaration.isTypeOnly) return ["type"];
  if (!declaration.exportClause || ts.isNamespaceExport(declaration.exportClause)) return ["runtime"];
  (!ts.isNamedExports(declaration.exportClause) || declaration.exportClause.elements.length === 0) && syntaxFailure(path, source, nodeStart(unit, declaration, baseOffset), "empty export binding clause is ambiguous");
  let runtime = !1, type = !1;
  for (const element of declaration.exportClause.elements)
    element.isTypeOnly ? type = !0 : runtime = !0;
  return [...runtime ? ["runtime"] : [], ...type ? ["type"] : []];
}
function projectJavaScriptRegion(region, path, source, baseOffset, scriptKind, emit) {
  let unit;
  try {
    unit = ts.createSourceFile(path, region, ts.ScriptTarget.Latest, !0, scriptKind);
  } catch (error) {
    syntaxFailure(path, source, baseOffset, `TypeScript parser failed: ${error.message}`);
  }
  const diagnostic = unit.parseDiagnostics?.[0];
  diagnostic && syntaxFailure(
    path,
    source,
    baseOffset + (diagnostic.start ?? 0),
    `TypeScript syntax error: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`
  );
  let visited = 0;
  const visit = (node) => {
    visited += 1, visited > sourceNodeLimit && syntaxFailure(path, source, nodeStart(unit, node, baseOffset), `syntax node ceiling ${sourceNodeLimit} exceeded`);
    const start = nodeStart(unit, node, baseOffset);
    if (ts.isImportDeclaration(node)) {
      const specifier = literalSpecifier(unit, node.moduleSpecifier, path, source, baseOffset, "static import", !1);
      validateDeclarationAttributes(unit, node.attributes ?? node.assertClause, path, source, baseOffset, "static import");
      for (const kind of importClauseKinds(unit, node.importClause, path, source, baseOffset)) emit(kind, specifier, start);
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
      const specifier = literalSpecifier(unit, node.moduleSpecifier, path, source, baseOffset, "static export", !1);
      validateDeclarationAttributes(unit, node.attributes ?? node.assertClause, path, source, baseOffset, "static export");
      for (const kind of exportClauseKinds(unit, node, path, source, baseOffset)) emit(kind, specifier, start);
    } else if (ts.isImportEqualsDeclaration(node))
      syntaxFailure(path, source, start, "unsupported or ambiguous TypeScript import-equals declaration");
    else if (ts.isImportTypeNode(node)) {
      const literal = ts.isLiteralTypeNode(node.argument) ? node.argument.literal : void 0, specifier = literalSpecifier(unit, literal, path, source, baseOffset, "TypeScript import type");
      validateDeclarationAttributes(unit, node.attributes, path, source, baseOffset, "TypeScript import type"), emit("type", specifier, start);
    } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      (node.arguments.length < 1 || node.arguments.length > 2) && syntaxFailure(path, source, start, "dynamic import has a computed or unsupported argument list");
      const specifier = literalSpecifier(unit, node.arguments[0], path, source, baseOffset, "dynamic import");
      node.arguments.length === 2 && validateDynamicImportOptions(unit, node.arguments[1], path, source, baseOffset, "dynamic import"), emit("dynamic", specifier, start);
    } else if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "require") {
      node.arguments.length !== 1 && syntaxFailure(path, source, start, `${node.questionDotToken ? "require?.()" : "require()"} has a computed or unsupported argument list`);
      const context = node.questionDotToken ? "require?.()" : "require()";
      emit("runtime", literalSpecifier(unit, node.arguments[0], path, source, baseOffset, context), start);
    }
    ts.forEachChild(node, visit);
    for (const jsDoc of node.jsDoc ?? []) visit(jsDoc);
  };
  visit(unit);
}
function cssQuoted(region, path, source, baseOffset, start, limit, context) {
  const quote = region[start];
  let cursor = start + 1, escaped = !1;
  for (; cursor < limit; ) {
    if (region[cursor] === "\\") {
      escaped = !0, cursor += 2;
      continue;
    }
    if (region[cursor] === quote) {
      const value = region.slice(start + 1, cursor);
      return escaped && syntaxFailure(path, source, baseOffset + start, `${context} specifier escapes are outside the bounded literal grammar`), value.length === 0 && syntaxFailure(path, source, baseOffset + start, `${context} specifier is empty`), { value, end: cursor + 1 };
    }
    (region[cursor] === `
` || region[cursor] === "\r") && syntaxFailure(path, source, baseOffset + start, `unterminated ${context} quoted literal`), cursor += 1;
  }
  syntaxFailure(path, source, baseOffset + start, `unterminated ${context} quoted literal`);
}
function skipCssTrivia(region, path, source, baseOffset, start, limit) {
  let cursor = start;
  for (; cursor < limit; )
    if (/\s/.test(region[cursor]))
      cursor += 1;
    else if (region.startsWith("/*", cursor)) {
      const close = region.indexOf("*/", cursor + 2);
      (close < 0 || close >= limit) && syntaxFailure(path, source, baseOffset + cursor, "unterminated CSS block comment"), cursor = close + 2;
    } else
      break;
  return cursor;
}
function projectStylesheetRegion(region, path, source, baseOffset, emit, sassModules = false) {
  let cursor = 0;
  for (; cursor < region.length; ) {
    if (region.startsWith("/*", cursor)) {
      const close = region.indexOf("*/", cursor + 2);
      close < 0 && syntaxFailure(path, source, baseOffset + cursor, "unterminated CSS block comment"), cursor = close + 2;
      continue;
    }
    if (sassModules && region.startsWith("//", cursor)) {
      const close = region.indexOf("\n", cursor + 2);
      cursor = close < 0 ? region.length : close + 1;
      continue;
    }
    if (region[cursor] === '"' || region[cursor] === "'") {
      const quote = region[cursor];
      cursor += 1;
      let closed = !1;
      for (; cursor < region.length; )
        if (region[cursor] === "\\") cursor += 2;
        else if (region[cursor] === quote) {
          cursor += 1, closed = !0;
          break;
        } else
          cursor += 1;
      closed || syntaxFailure(path, source, baseOffset + cursor - 1, "unterminated CSS string");
      continue;
    }
    const directive = region[cursor] === "@" ? ["import", "use", "forward"].find((name) => region.slice(cursor + 1, cursor + name.length + 1).toLowerCase() === name && !/[-_A-Za-z0-9]/.test(region[cursor + name.length + 1] ?? "")) : void 0;
    if (!directive || directive !== "import" && !sassModules) {
      cursor += 1;
      continue;
    }
    const importStart = cursor;
    cursor = skipCssTrivia(region, path, source, baseOffset, cursor + directive.length + 1, region.length);
    let parsed;
    if (region[cursor] === '"' || region[cursor] === "'")
      parsed = cssQuoted(region, path, source, baseOffset, cursor, region.length, `${sassModules ? "Sass" : "CSS"} @${directive}`);
    else if (directive === "import" && region.slice(cursor, cursor + 3).toLowerCase() === "url" && !/[-_A-Za-z0-9]/.test(region[cursor + 3] ?? ""))
      if (cursor = skipCssTrivia(region, path, source, baseOffset, cursor + 3, region.length), region[cursor] !== "(" && syntaxFailure(path, source, baseOffset + cursor, "CSS @import url requires parentheses"), cursor = skipCssTrivia(region, path, source, baseOffset, cursor + 1, region.length), region[cursor] === '"' || region[cursor] === "'")
        parsed = cssQuoted(region, path, source, baseOffset, cursor, region.length, "CSS url() @import"), cursor = skipCssTrivia(region, path, source, baseOffset, parsed.end, region.length), region[cursor] !== ")" && syntaxFailure(path, source, baseOffset + cursor, "CSS url() @import contains unsupported trailing syntax"), parsed.end = cursor + 1;
      else {
        const close = region.indexOf(")", cursor);
        close < 0 && syntaxFailure(path, source, baseOffset + cursor, "unterminated CSS url() @import");
        const value = region.slice(cursor, close).trim();
        (value === "" || /[\s()"'`\\${}#]/.test(value)) && syntaxFailure(path, source, baseOffset + cursor, "CSS url() import is outside the bounded literal grammar"), parsed = { value, end: close + 1 };
      }
    else
      syntaxFailure(path, source, baseOffset + cursor, `@${directive} requires a quoted static literal${directive === "import" ? " or literal url()" : ""}`);
    directive !== "import" && /#\{|\$\{/.test(parsed.value) && syntaxFailure(path, source, baseOffset + importStart, `dynamic Sass @${directive} specifier is forbidden`);
    emit("css", parsed.value, baseOffset + importStart), cursor = parsed.end;
  }
}
function hostAttributes(source, path, start, end) {
  const attributes = /* @__PURE__ */ new Map();
  let cursor = start, selfClosing = !1;
  for (; cursor < end; ) {
    for (; /\s/.test(source[cursor] ?? ""); ) cursor += 1;
    if (cursor >= end) break;
    if (source[cursor] === "/") {
      for (selfClosing = !0, cursor += 1; /\s/.test(source[cursor] ?? ""); ) cursor += 1;
      cursor !== end && syntaxFailure(path, source, cursor, "host tag has syntax after its self-closing marker");
      break;
    }
    const nameStart = cursor;
    for (; cursor < end && !/[\s=/>]/.test(source[cursor]); ) cursor += 1;
    cursor === nameStart && syntaxFailure(path, source, cursor, "host tag has an unsupported attribute name");
    const name = source.slice(nameStart, cursor).toLowerCase();
    for (; /\s/.test(source[cursor] ?? ""); ) cursor += 1;
    let value = null, valueStart = nameStart;
    if (source[cursor] === "=") {
      for (cursor += 1; /\s/.test(source[cursor] ?? ""); ) cursor += 1;
      valueStart = cursor;
      const quote = source[cursor];
      if (quote === '"' || quote === "'") {
        cursor += 1;
        const contentStart = cursor;
        for (; cursor < end && source[cursor] !== quote; ) cursor += 1;
        cursor >= end && syntaxFailure(path, source, valueStart, `host attribute ${name} has an unterminated quoted value`), value = source.slice(contentStart, cursor), valueStart = contentStart, cursor += 1;
      } else {
        const contentStart = cursor;
        for (; cursor < end && !/[\s>]/.test(source[cursor]); ) cursor += 1;
        value = source.slice(contentStart, cursor), valueStart = contentStart, value === "" && syntaxFailure(path, source, contentStart, `host attribute ${name} has an empty unquoted value`);
      }
    }
    attributes.has(name) && syntaxFailure(path, source, nameStart, `host tag repeats attribute ${name}`), attributes.set(name, { name, nameStart, value, valueStart });
  }
  return { attributes, selfClosing };
}
function hostTag(source, path, start) {
  if (source[start] !== "<") return null;
  let cursor = start + 1;
  const closing = source[cursor] === "/";
  closing && (cursor += 1);
  const nameStart = cursor;
  if (!/[A-Za-z]/.test(source[cursor] ?? "")) return null;
  for (cursor += 1; /[A-Za-z0-9:_-]/.test(source[cursor] ?? ""); ) cursor += 1;
  const name = source.slice(nameStart, cursor).toLowerCase(), attributesStart = cursor;
  let quote = null;
  for (; cursor < source.length; ) {
    const character = source[cursor];
    if (quote)
      character === quote && (quote = null);
    else if (character === '"' || character === "'")
      quote = character;
    else if (character === ">") {
      const parsed = closing ? { attributes: /* @__PURE__ */ new Map(), selfClosing: !1 } : hostAttributes(source, path, attributesStart, cursor);
      return { name, closing, start, end: cursor + 1, ...parsed };
    }
    cursor += 1;
  }
  return ["script", "style"].includes(name) && syntaxFailure(path, source, start, `unterminated host <${name}> tag`), null;
}
function closingHostTag(source, path, name, start) {
  const lower = source.toLowerCase();
  let cursor = start;
  for (; cursor < source.length; ) {
    const found = lower.indexOf(`</${name}`, cursor);
    found < 0 && syntaxFailure(path, source, start, `host <${name}> region has no closing tag`);
    const boundary = source[found + name.length + 2];
    if (boundary === ">" || /\s/.test(boundary ?? "")) {
      const tag = hostTag(source, path, found);
      if (tag?.closing && tag.name === name) return tag;
    }
    cursor = found + name.length + 2;
  }
  syntaxFailure(path, source, start, `host <${name}> region has no closing tag`);
}
function hostLiteralAttribute(attribute, path, source, context) {
  return (!attribute || attribute.value === null || attribute.value === "" || /[\\&`{}]/.test(attribute.value)) && syntaxFailure(path, source, attribute?.valueStart ?? 0, `${context} requires one unescaped static attribute value`), attribute.value;
}
function hostScriptKind(attributes, path, source) {
  const lang = attributes.get("lang");
  if (lang) {
    const value2 = hostLiteralAttribute(lang, path, source, "host script lang").toLowerCase(), kind = (/* @__PURE__ */ new Map([
      ["js", ts.ScriptKind.JS],
      ["javascript", ts.ScriptKind.JS],
      ["jsx", ts.ScriptKind.JSX],
      ["ts", ts.ScriptKind.TS],
      ["typescript", ts.ScriptKind.TS],
      ["tsx", ts.ScriptKind.TSX]
    ])).get(value2);
    return kind === void 0 && syntaxFailure(path, source, lang.valueStart, `unsupported host script language ${lang.value}`), kind;
  }
  const type = attributes.get("type");
  if (!type) return ts.ScriptKind.JS;
  const value = hostLiteralAttribute(type, path, source, "host script type").toLowerCase();
  if (["application/json", "application/ld+json", "importmap", "speculationrules"].includes(value)) return null;
  if (["module", "text/javascript", "application/javascript", "text/ecmascript", "application/ecmascript"].includes(value))
    return ts.ScriptKind.JS;
  if (["text/typescript", "application/typescript"].includes(value)) return ts.ScriptKind.TS;
  syntaxFailure(path, source, type.valueStart, `unsupported host script type ${type.value}`);
}
function validateHostStyle(attributes, path, source) {
  const lang = attributes.get("lang");
  let language = "css";
  if (lang) {
    const value = hostLiteralAttribute(lang, path, source, "host style lang").toLowerCase();
    ["css", "less", "sass", "scss", "styl", "stylus"].includes(value) || syntaxFailure(path, source, lang.valueStart, `unsupported host style language ${lang.value}`), language = value;
  }
  const type = attributes.get("type");
  type && hostLiteralAttribute(type, path, source, "host style type").toLowerCase() !== "text/css" && syntaxFailure(path, source, type.valueStart, `unsupported host style type ${type.value}`);
  return language === "sass" || language === "scss";
}
function mdxFenceMask(source, path) {
  const characters = source.split("");
  let fence = null, offset = 0;
  for (const line of source.split(/(?<=\n)/)) {
    const match = line.replace(/[\r\n]+$/, "").match(/^ {0,3}(`{3,}|~{3,})/);
    if (match && (!fence || match[1][0] === fence.character && match[1].length >= fence.length)) {
      fence ? fence = null : fence = { character: match[1][0], length: match[1].length, start: offset };
      for (let index = offset; index < offset + line.length; index += 1) characters[index] !== `
` && characters[index] !== "\r" && (characters[index] = " ");
    } else if (fence)
      for (let index = offset; index < offset + line.length; index += 1) characters[index] !== `
` && characters[index] !== "\r" && (characters[index] = " ");
    offset += line.length;
  }
  return fence && syntaxFailure(path, source, fence.start, "unterminated MDX code fence"), characters.join("");
}
function projectMdxEsm(surface, path, source, emit, ranges) {
  let lineStart = 0;
  for (; lineStart < surface.length; ) {
    const lineEnd = surface.indexOf(`
`, lineStart) < 0 ? surface.length : surface.indexOf(`
`, lineStart) + 1, line = surface.slice(lineStart, lineEnd);
    if (/^(?:import(?=\s|["'{*])|export(?=\s|[{*]))/.test(line)) {
      const suffix = source.slice(lineStart), unit = ts.createSourceFile(`${path}.mdx-esm.tsx`, suffix, ts.ScriptTarget.Latest, !0, ts.ScriptKind.TSX), statement = unit.statements[0];
      (!(statement && (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement) || statement.modifiers?.some(({ kind }) => kind === ts.SyntaxKind.ExportKeyword))) || statement.getStart(unit) !== 0 || statement.end <= 0) && syntaxFailure(path, source, lineStart, "unsupported or malformed MDX ESM region");
      const region = source.slice(lineStart, lineStart + statement.end);
      projectJavaScriptRegion(region, path, source, lineStart, ts.ScriptKind.TSX, emit), ranges.push([lineStart, lineStart + statement.end]), lineStart += statement.end;
      continue;
    }
    lineStart = lineEnd;
  }
}
function insideRanges(index, ranges) {
  return ranges.some(([start, end]) => index >= start && index < end);
}
function rejectUnsupportedHostCandidates(surface, path, source, extension, ranges) {
  if (![".astro", ".mdx", ".svelte", ".vue"].includes(extension)) return;
  if (extension === ".vue") {
    importCandidatePattern.lastIndex = 0;
    for (const candidate2 of surface.matchAll(importCandidatePattern)) {
      if (insideRanges(candidate2.index, ranges)) continue;
      const open = surface.lastIndexOf("{{", candidate2.index), close = surface.lastIndexOf("}}", candidate2.index);
      open > close && syntaxFailure(path, source, candidate2.index, "unsupported executable host-expression import candidate");
    }
    return;
  }
  let depth = 0, cursor = 0;
  importCandidatePattern.lastIndex = 0;
  let candidate = importCandidatePattern.exec(surface);
  for (; cursor < surface.length; )
    surface[cursor] === "{" && !insideRanges(cursor, ranges) ? depth += 1 : surface[cursor] === "}" && !insideRanges(cursor, ranges) && depth > 0 && (depth -= 1), candidate && cursor === candidate.index && (!insideRanges(cursor, ranges) && depth > 0 && syntaxFailure(path, source, cursor, "unsupported executable host-expression import candidate"), candidate = importCandidatePattern.exec(surface)), cursor += 1;
}
function projectHostSource(source, path, extension, emit) {
  const surface = extension === ".mdx" ? mdxFenceMask(source, path) : source, ranges = [];
  if (extension === ".astro" && /^(?:\uFEFF)?---(?:\r?\n|$)/.test(surface)) {
    const openEnd = surface.indexOf(`
`) + 1, closing = /^(?:---)[ \t]*(?:\r?$)/m;
    closing.lastIndex = openEnd;
    const match = surface.slice(openEnd).match(closing);
    match || syntaxFailure(path, source, 0, "Astro frontmatter has no closing fence");
    const closeStart = openEnd + match.index;
    projectJavaScriptRegion(source.slice(openEnd, closeStart), path, source, openEnd, ts.ScriptKind.TS, emit);
    const closeEnd = closeStart + match[0].length;
    ranges.push([0, closeEnd]);
  }
  extension === ".mdx" && projectMdxEsm(surface, path, source, emit, ranges);
  let cursor = 0;
  for (; cursor < surface.length; ) {
    if (insideRanges(cursor, ranges)) {
      cursor = ranges.find(([start, end]) => cursor >= start && cursor < end)[1];
      continue;
    }
    if (surface.startsWith("<!--", cursor)) {
      const close = surface.indexOf("-->", cursor + 4);
      close < 0 && syntaxFailure(path, source, cursor, "unterminated host comment"), ranges.push([cursor, close + 3]), cursor = close + 3;
      continue;
    }
    if (surface[cursor] !== "<") {
      cursor += 1;
      continue;
    }
    const tag = hostTag(surface, path, cursor);
    if (!tag) {
      cursor += 1;
      continue;
    }
    if (tag.closing) {
      cursor = tag.end;
      continue;
    }
    for (const attribute of tag.attributes.values())
      (extension === ".html" ? /^on/.test(attribute.name) : extension === ".vue" ? /^(?:v-|:|@|#)/.test(attribute.name) : /^(?:on(?::|-)|bind:|use:|class:|style:)/.test(attribute.name)) && attribute.value && (importCandidatePattern.lastIndex = 0, importCandidatePattern.test(attribute.value) && syntaxFailure(path, source, attribute.valueStart, "unsupported executable host-attribute import candidate"));
    if (!["script", "style"].includes(tag.name)) {
      cursor = tag.end;
      continue;
    }
    tag.selfClosing && syntaxFailure(path, source, tag.start, `self-closing host <${tag.name}> regions are unsupported`);
    const closing = closingHostTag(surface, path, tag.name, tag.end), bodyStart = tag.end, bodyEnd = closing.start;
    if (tag.name === "script") {
      const src = tag.attributes.get("src");
      src && emit("runtime", hostLiteralAttribute(src, path, source, "host script src"), src.valueStart);
      const kind = hostScriptKind(tag.attributes, path, source);
      kind !== null && bodyEnd > bodyStart && projectJavaScriptRegion(source.slice(bodyStart, bodyEnd), path, source, bodyStart, kind, emit);
    } else {
      const sassModules = validateHostStyle(tag.attributes, path, source);
      const src = tag.attributes.get("src");
      src && emit("css", hostLiteralAttribute(src, path, source, "host style src"), src.valueStart), bodyEnd > bodyStart && projectStylesheetRegion(source.slice(bodyStart, bodyEnd), path, source, bodyStart, emit, sassModules);
    }
    ranges.push([tag.start, closing.end]), cursor = closing.end;
  }
  rejectUnsupportedHostCandidates(surface, path, source, extension, ranges);
}
function staticImportProjection(source, path = "<memory>") {
  if (typeof source != "string" || typeof path != "string") throw new TypeError("static import projection requires source text and a path label");
  const projections = [], seen = /* @__PURE__ */ new Set(), extension = extname(path);
  function emit(kind, specifier, index) {
    const resolvedKind = kind === "runtime" && /\.css(?:$|[?#])/.test(specifier) ? "css" : kind, identity = `${resolvedKind}\0${specifier}\0${index}`;
    seen.has(identity) || (seen.add(identity), projections.push({ kind: resolvedKind, specifier, index, locator: `${resolvedKind}:${lineColumn(source, index)}` }));
  }
  return stylesheetExtensions.has(extension) ? projectStylesheetRegion(source, path, source, 0, emit, extension === ".scss" || extension === ".sass") : scriptKinds.has(extension) ? projectJavaScriptRegion(source, path, source, 0, scriptKinds.get(extension), emit) : path === "<memory>" && extension === "" ? projectJavaScriptRegion(source, path, source, 0, ts.ScriptKind.JS, emit) : hostExtensions.has(extension) ? projectHostSource(source, path, extension, emit) : syntaxFailure(path, source, 0, `unsupported claimed source extension ${extension || "<none>"}`), projections.sort((left, right) => left.index - right.index || compareCanonicalText(left.kind, right.kind) || compareCanonicalText(left.specifier, right.specifier));
}
function scanSource(path, source, fileHash, scopes, detections) {
  for (const projection of staticImportProjection(source, path))
    addDetection(path, fileHash, scopes, detections, projection);
}
function scanEdges(roots, bounds) {
  const ignored = new Set(bounds.ignored_directory_names), rootPaths = new Set(roots.map((item) => item.canonical_realpath)), detections = [], state = { entries: 0, files: 0, maxEntries: bounds.max_entries, maxFiles: bounds.max_files };
  function visit(repository, path) {
    const canonical = realpathSync(path);
    if (within(repository, canonical) || die(`edge scan encountered an escaping directory symlink ${path} -> ${canonical}`), !(canonical !== repository && rootPaths.has(canonical)))
      for (const entry of directoryEntries(canonical, state, `edge scan at ${canonical}`)) {
        if (ignored.has(entry.name)) continue;
        const child = join(canonical, entry.name);
        if (entry.isDirectory()) {
          visit(repository, child);
          continue;
        }
        if (entry.isSymbolicLink()) {
          statSync(child).isDirectory() && visit(repository, child);
          continue;
        }
        if (!entry.isFile()) continue;
        const isManifest = entry.name === "package.json", isNpmLock = entry.name === "package-lock.json", isSource = sourceExtensions.has(extname(entry.name));
        if (!isManifest && !isNpmLock && !isSource) continue;
        state.files += 1, state.files > state.maxFiles && die(`edge scan exceeded max_files ${state.maxFiles}; a truncated scan cannot close the universe`);
        const size = statSync(child).size;
        size > bounds.max_file_bytes && die(`scannable file ${child} is ${size} bytes, above max_file_bytes ${bounds.max_file_bytes}`);
        const buffer = readFileSync(child);
        let source;
        try {
          source = isManifest || isNpmLock ? decodeUtf8Strict(buffer) : sourceDecoder.decode(buffer);
        } catch (error) {
          die(`scannable file ${child} is not lossless UTF-8: ${error.message}`);
        }
        const fileHash = sha256(buffer), scopes = bounds.edge_scope;
        isManifest && scanManifest(child, source, fileHash, scopes, detections), isNpmLock && scanNpmLock(child, source, fileHash, scopes, detections), isSource && scanSource(child, source, fileHash, scopes, detections);
      }
  }
  for (const item of roots) visit(item.canonical_realpath, item.canonical_realpath);
  return detections;
}
function tupleKey(value) {
  return canonicalize({
    source: value.source,
    target: value.target,
    package: value.package,
    specifier: value.specifier,
    kind: value.kind
  });
}
function observedEdgeMap(availableRoots, detections) {
  const sourceByPath = [...availableRoots].sort((left, right) => right.canonical_realpath.length - left.canonical_realpath.length || compareCanonicalText(left.canonical_realpath, right.canonical_realpath)), records = /* @__PURE__ */ new Map();
  for (const detection of detections) {
    const source = sourceByPath.find((rootRecord) => within(rootRecord.canonical_realpath, detection.observation.canonical_realpath));
    source || die(`scanner produced an observation outside every available root: ${detection.observation.path}`);
    const value = { source: source.id, ...detection };
    delete value.observation;
    const key = tupleKey(value);
    records.has(key) || records.set(key, { ...value, observations: [] }), records.get(key).observations.push(detection.observation);
  }
  for (const record of records.values()) {
    const semantic = /* @__PURE__ */ new Set();
    record.observations.sort(compareObservation);
    for (const item of record.observations) {
      const key = `${item.canonical_realpath}\0${item.locator}`;
      semantic.has(key) && die(`scanner repeated semantic edge observation ${key}`), semantic.add(key);
    }
  }
  return records;
}
function statusCount(values, status) {
  return values.filter((value) => value.disposition.status === status).length;
}
function verifyFreshness(universe, now) {
  const epoch = universe.discovery.epoch, started = Date.parse(epoch.started_at), completed = Date.parse(epoch.completed_at), observed = Date.parse(universe.observed_at);
  universe.observed_at !== epoch.completed_at && die("observed_at must equal discovery.epoch.completed_at exactly"), completed < started && die("discovery epoch completed before it started"), (completed - started) / 1e3 > epoch.max_age_seconds && die("discovery epoch duration exceeds max_age_seconds"), epoch.max_age_seconds > 3600 && die("discovery max_age_seconds may not exceed 3600"), now - observed > epoch.max_age_seconds * 1e3 && die("consumer-universe observation is stale"), observed - now > 5e3 && die("consumer-universe observation is more than five seconds in the future");
}
function main() {
  const paths = parseArguments(process.argv.slice(2)), resolverStarted = /* @__PURE__ */ new Date(), schemaRecord = readStrict(inputSchemaPath, "consumer-universe schema"), receiptSchemaRecord = readStrict(receiptSchemaPath, "consumer-universe receipt schema"), inputRecord = readStrict(paths.input, "consumer-universe input"), schemaErrors = validateJsonSchema(inputRecord.value, schemaRecord.value);
  schemaErrors.length && die(`consumer-universe schema failure:
${schemaErrors.join(`
`)}`);
  const universe = inputRecord.value, universePreimage = structuredClone(universe);
  delete universePreimage.universe_hash;
  const semanticHash = sha256(canonicalize(universePreimage));
  semanticHash !== universe.universe_hash && die(`consumer-universe self-hash ${universe.universe_hash}; expected ${semanticHash}`), verifyFreshness(universe, resolverStarted.getTime()), assertGeneratedPathDisjoint(paths.snapshotStore, "snapshot store", universe), assertGeneratedPathDisjoint(paths.snapshotIndex, "snapshot index", universe), assertGeneratedPathDisjoint(paths.output, "receipt output", universe), paths.snapshotStore = ensureSnapshotStore(paths.snapshotStore);
  const methods = [...universe.discovery.methods].sort();
  exactSet(methods, requiredMethods, "discovery methods");
  const ignored = [...universe.discovery.bounds.ignored_directory_names].sort();
  exactSet(ignored, requiredIgnoredDirectories, "ignored directory names"), verifyConsumerEvidence(universe.discovery.evidence, "discovery");
  const scopePackages = /* @__PURE__ */ new Set();
  for (const scope of universe.discovery.bounds.edge_scope) {
    scopePackages.has(scope.package) && die(`duplicate package edge scope ${scope.package}`), scopePackages.add(scope.package);
    for (const required of requiredObservedKinds)
      scope.kinds.includes(required) || die(`edge scope ${scope.package} must observe ${required}; kind-level omissions are forbidden`);
  }
  const registry = consumerWaveRegistry(), rootState = validateConsumerRootState(universe, universe.discovery.bounds, registry.ids), { rootsById, availableRoots } = rootState, blockers = [...rootState.blockers];
  for (const scope of universe.discovery.bounds.edge_scope)
    !scope.target.startsWith("external:") && !rootsById.has(scope.target) && die(`edge scope ${scope.package} names unknown target ${scope.target}`), scope.target.startsWith("external:") && scope.target !== `external:${scope.package}` && die(`edge scope external target must be exactly external:${scope.package}`);
  const repositoriesBefore = discoverRepositories(universe.discovery.bounds), declaredAvailable = availableRoots.map((item) => item.canonical_realpath).sort();
  exactSet(repositoriesBefore, declaredAvailable, "bounded repository discovery; an omitted in-scope root exists");
  const identitiesBefore = availableRoots.map((item) => ({ id: item.id, ...item.identity })).sort(compareId), detections = scanEdges(availableRoots, universe.discovery.bounds), observedEdges = observedEdgeMap(availableRoots, detections), edgeIds = /* @__PURE__ */ new Set(), edgeTuples = /* @__PURE__ */ new Set(), declaredTupleMap = /* @__PURE__ */ new Map(), edgeObservationModes = /* @__PURE__ */ new Map();
  for (const edge of universe.edges) {
    edgeIds.has(edge.id) && die(`duplicate edge id ${edge.id}`), edgeIds.add(edge.id);
    const tuple = tupleKey(edge);
    edgeTuples.has(tuple) && die(`duplicate semantic edge tuple ${tuple}`), edgeTuples.add(tuple), declaredTupleMap.set(tuple, edge);
    const scope = universe.discovery.bounds.edge_scope.find((item) => item.package === edge.package && item.target === edge.target);
    scope || die(`edge ${edge.id} lies outside the bounded package/target scope`), scope.kinds.includes(edge.kind) || die(`edge ${edge.id} kind ${edge.kind} lies outside its bounded scope`), verifyConsumerOwner(registry.ids, edge.owner_wave, `edge ${edge.id}`);
    const sourceRoot = rootsById.get(edge.source);
    sourceRoot || die(`edge ${edge.id} names unknown source root ${edge.source}`), verifyConsumerEvidence(edge.evidence, `edge ${edge.id}`, sourceRoot.disposition.status === "unavailable" ? void 0 : sourceRoot.canonical_realpath);
    const observationMode = consumerEdgeObservationMode(edge, rootsById);
    edge.disposition.status === "unavailable" ? (verifyConsumerEvidence(edge.disposition.evidence, `unavailable edge ${edge.id}`), verifyConsumerOwner(registry.ids, edge.disposition.retrigger.wave_id, `unavailable edge ${edge.id} retrigger`), blockers.push(`edge:${edge.id}:unavailable:${edge.disposition.retrigger.wave_id}:${edge.disposition.retrigger.condition}`)) : edge.disposition.status === "excluded" && verifyConsumerEvidence(edge.disposition.evidence, `excluded edge ${edge.id}`, sourceRoot.canonical_realpath), edgeObservationModes.set(tuple, observationMode);
  }
  for (const [tuple, observed] of observedEdges) {
    const declared = declaredTupleMap.get(tuple);
    declared || die(`bounded scan found omitted in-scope edge ${tuple}`), edgeObservationModes.get(tuple) === "none" && die(`edge ${declared.id} from an unavailable source unexpectedly produced observations`);
    const evidencePaths = declared.evidence.map((item) => item.canonical_realpath), observationPaths = [...new Set(observed.observations.map((item) => item.canonical_realpath))];
    exactSet(evidencePaths, observationPaths, `edge ${declared.id} occurrence evidence paths`);
  }
  for (const [tuple, declared] of declaredTupleMap)
    edgeObservationModes.get(tuple) === "required" && !observedEdges.has(tuple) && die(`declared edge ${declared.id} is unproved by the bounded scan: ${tuple}`);
  const rootSnapshots = [];
  let snapshotBytes = 0;
  for (const item of availableRoots.filter((candidate) => candidate.disposition.status === "included").sort(compareId)) {
    const binding = captureConsumerRootSnapshot(item, {
      snapshotStore: paths.snapshotStore,
      ignoredDirectoryNames: ignored,
      maxFiles: universe.discovery.bounds.max_files,
      maxFileBytes: universe.discovery.bounds.max_file_bytes,
      maxTotalBytes: universe.discovery.bounds.max_snapshot_bytes,
      resolveRootIdentity: resolveGitIdentity
    }), nextSnapshotBytes = snapshotBytes + binding.total_bytes;
    Number.isSafeInteger(nextSnapshotBytes) || die("consumer root snapshot aggregate byte count overflow"), snapshotBytes = nextSnapshotBytes, snapshotBytes > universe.discovery.bounds.max_snapshot_bytes && die(`consumer root snapshots total ${snapshotBytes} bytes exceeds max_snapshot_bytes ${universe.discovery.bounds.max_snapshot_bytes}`), rootSnapshots.push(binding);
  }
  const repositoriesAfter = discoverRepositories(universe.discovery.bounds);
  exactSet(repositoriesAfter, repositoriesBefore, "repository set changed during scan");
  const detectionsAfter = scanEdges(availableRoots, universe.discovery.bounds);
  canonicalize(detectionsAfter) !== canonicalize(detections) && die("consumer source file identities changed during snapshot capture; epoch is not frozen");
  const identitiesAfter = availableRoots.map((item) => ({ id: item.id, ...resolveGitIdentity(item.canonical_realpath) })).sort(compareId);
  canonicalize(identitiesAfter) !== canonicalize(identitiesBefore) && die("Git root identity changed during the bounded scan; epoch is not frozen");
  const rootsReceipt = universe.roots.map((item) => {
    const identity = identitiesAfter.find((candidate) => candidate.id === item.id) ?? item, result = {
      id: item.id,
      repository: item.repository,
      canonical_realpath: item.canonical_realpath,
      branch: identity.branch,
      head: identity.head,
      dirty_sha256: identity.dirty_sha256,
      origins: [...identity.origins ?? item.provenance.origins.values].sort(compareCanonicalText),
      worktrees: [...identity.worktrees ?? item.provenance.worktrees.values].sort(compareCanonicalText),
      status: item.disposition.status
    };
    item.disposition.owner_wave && (result.owner_wave = item.disposition.owner_wave), item.disposition.reason && (result.reason = item.disposition.reason), item.disposition.retrigger && (result.retrigger_wave = item.disposition.retrigger.wave_id, result.condition = item.disposition.retrigger.condition);
    const snapshot = rootSnapshots.find((candidate) => candidate.root_id === item.id);
    return item.disposition.status === "included" ? (snapshot || die(`included consumer root ${item.id} has no content snapshot`), result.content_snapshot = consumerRootSnapshotContentProjection(snapshot)) : snapshot && die(`non-included consumer root ${item.id} unexpectedly has a content snapshot`), result;
  }).sort(compareId), edgesReceipt = universe.edges.map((item) => {
    const observations = observedEdges.get(tupleKey(item))?.observations ?? [], result = {
      id: item.id,
      source: item.source,
      target: item.target,
      package: item.package,
      specifier: item.specifier,
      kind: item.kind,
      owner_wave: item.owner_wave,
      status: item.disposition.status,
      observations,
      observations_sha256: sha256(canonicalize(observations))
    };
    return item.disposition.reason && (result.reason = item.disposition.reason), item.disposition.retrigger && (result.retrigger_wave = item.disposition.retrigger.wave_id, result.condition = item.disposition.retrigger.condition), result;
  }).sort(compareId);
  blockers.sort(compareCanonicalText);
  const boundsHash = sha256(canonicalize(universe.discovery.bounds)), observedRootsHash = sha256(canonicalize(rootsReceipt)), observedEdgesHash = sha256(canonicalize(edgesReceipt)), resolvedAt = (/* @__PURE__ */ new Date()).toISOString(), epoch = {
    started_at: resolverStarted.toISOString(),
    completed_at: resolvedAt,
    max_age_seconds: universe.discovery.epoch.max_age_seconds,
    bounds_sha256: boundsHash,
    observed_roots_sha256: observedRootsHash,
    observed_edges_sha256: observedEdgesHash,
    epoch_sha256: ""
  }, epochPreimage = structuredClone(epoch);
  delete epochPreimage.epoch_sha256, epoch.epoch_sha256 = sha256(canonicalize(epochPreimage));
  const receipt = {
    schema: "vnext-consumer-universe-receipt/2",
    observed_at: universe.observed_at,
    resolved_at: resolvedAt,
    input: {
      path: paths.input,
      file_sha256: sha256(inputRecord.source),
      universe_hash: universe.universe_hash
    },
    resolver_sha256: sha256(readFileSync(toolPath)),
    schema_sha256: sha256(schemaRecord.source),
    receipt_schema_sha256: sha256(receiptSchemaRecord.source),
    formation_wave_registry_sha256: registry.sha256,
    discovery_methods: methods,
    epoch,
    counts: {
      roots: universe.roots.length,
      included_roots: statusCount(universe.roots, "included"),
      excluded_roots: statusCount(universe.roots, "excluded"),
      unavailable_roots: statusCount(universe.roots, "unavailable"),
      edges: universe.edges.length,
      included_edges: statusCount(universe.edges, "included"),
      excluded_edges: statusCount(universe.edges, "excluded"),
      unavailable_edges: statusCount(universe.edges, "unavailable"),
      observations: detections.length
    },
    roots: rootsReceipt,
    edges: edgesReceipt,
    resolvable: blockers.length === 0,
    blockers,
    receipt_hash: ""
  }, receiptPreimage = structuredClone(receipt);
  delete receiptPreimage.receipt_hash, receipt.receipt_hash = sha256(canonicalize(receiptPreimage));
  const receiptErrors = validateJsonSchema(receipt, receiptSchemaRecord.value);
  receiptErrors.length && die(`generated receipt schema failure:
${receiptErrors.join(`
`)}`), writeFileSync(paths.output, `${canonicalize(receipt)}
`);
  const snapshotSchemaPath = materializeSnapshotSchema(paths.snapshotStore), snapshotIndex = consumerRootSnapshotIndexDocument(receipt, rootSnapshots, { snapshotSchemaPath });
  writeFileSync(paths.snapshotIndex, `${canonicalize(snapshotIndex)}
`);
  const snapshotIndexReference = consumerRootSnapshotIndexReference(realpathSync(paths.snapshotIndex));
  process.stdout.write(`${canonicalize({
    schema: receipt.schema,
    receipt: paths.output,
    receipt_hash: receipt.receipt_hash,
    epoch_sha256: receipt.epoch.epoch_sha256,
    roots: receipt.counts.roots,
    edges: receipt.counts.edges,
    observations: receipt.counts.observations,
    resolvable: receipt.resolvable,
    blockers: receipt.blockers,
    snapshot_index: snapshotIndexReference
  })}
`), receipt.resolvable || (process.exitCode = 2);
}
function selftestSassProjection() {
  const scss = `// @use "ignored-a";\n/* @forward "ignored-b"; */\n$x: "@use ignored-c";\n@use "@mkbabb/value.js";\n@forward '@mkbabb/keyframes.js/styles' hide legacy;`;
  const rows = staticImportProjection(scss, "fixture.scss");
  if (canonicalize(rows.map(({ kind, specifier }) => ({ kind, specifier }))) !== canonicalize([
    { kind: "css", specifier: "@mkbabb/value.js" },
    { kind: "css", specifier: "@mkbabb/keyframes.js/styles" }
  ])) die("Sass @use/@forward positive projection drift");
  const host = staticImportProjection(`<style lang="scss">@use "@mkbabb/value.js/css";</style>`, "fixture.vue");
  if (host.length !== 1 || host[0].specifier !== "@mkbabb/value.js/css") die("host Sass projection drift");
  if (staticImportProjection(`@use "@mkbabb/value.js";`, "fixture.css").length !== 0) die("CSS must not guess Sass module edges");
  let hostile = 0;
  for (const source of [`@use $dynamic;`, `@forward "pkg/#{dynamic}";`, `/* unterminated`])
    try { staticImportProjection(source, "fixture.scss"); } catch { hostile += 1; }
  if (hostile !== 3) die(`Sass hostile projections survived: ${3 - hostile}`);
  return { schema: "vnext-consumer-sass-projection-selftest/1", positive: 4, hostile };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]))
  try {
    if (process.argv.length === 3 && process.argv[2] === "--selftest") process.stdout.write(`${JSON.stringify(selftestSassProjection())}\n`);
    else main();
  } catch (error) {
    process.stderr.write(`${error.message}
`), process.exitCode = 1;
  }
export {
  consumerEdgeObservationMode,
  consumerWaveRegistry,
  resolveGitIdentity,
  staticImportProjection,
  validateConsumerRootState,
  verifyConsumerEvidence,
  verifyConsumerOwner,
  verifyRequiredConsumerIdentities
};
