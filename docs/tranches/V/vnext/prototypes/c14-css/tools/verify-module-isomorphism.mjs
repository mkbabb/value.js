import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const authorityPath = join(root, "../../CSS-MODULE-ISOMORPHISM.json");
const authorityBytes = readFileSync(authorityPath);
const authority = JSON.parse(authorityBytes);
const grammarRoot = join(root, "src/css/grammar/l4");
const testRoot = join(root, "test/src/css/grammar/l4");
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const compare = (left, right) => left < right ? -1 : left > right ? 1 : 0;
const canonicalize = (value) => Array.isArray(value)
  ? `[${value.map(canonicalize).join(",")}]`
  : value && typeof value === "object"
    ? `{${Object.keys(value).sort(compare).map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`
    : JSON.stringify(value);

const actualModules = readdirSync(grammarRoot).filter((path) => path.endsWith(".ts")).sort();
const actualTests = readdirSync(testRoot).filter((path) => path.endsWith(".test.ts")).sort();
const expectedModules = authority.modules.map((row) => basename(row.typescript_path)).sort();
const expectedTests = authority.modules.map((row) => basename(row.test_path)).sort();
assert.deepEqual(actualModules, expectedModules);
assert.deepEqual(actualTests, expectedTests);
assert.equal(actualModules.includes("index.ts"), false);
assert.equal(actualModules.includes("pretty.ts"), false);

for (const row of authority.modules) {
  const moduleName = basename(row.typescript_path);
  const source = readFileSync(join(grammarRoot, moduleName), "utf8");
  const actualEdges = [...source.matchAll(/from\s+["']\.\/([^"']+)\.js["']/g)]
    .map((match) => `${match[1]}.ts`)
    .sort();
  const expectedEdges = row.imports.map((path) => `${basename(path, ".bbnf")}.ts`).sort();
  assert.deepEqual(actualEdges, expectedEdges, `${moduleName} import edges`);
  const grammar = execFileSync(
    "git",
    ["-C", authority.source.repository, "show", `${authority.source.commit}:${row.bbnf_path}`],
  );
  assert.equal(sha256(grammar), row.bbnf_sha256, `${row.bbnf_path} pinned bytes`);
}
const preimage = structuredClone(authority);
delete preimage.manifest_hash;
assert.equal(sha256(canonicalize(preimage)), authority.manifest_hash, "authority manifest self-hash");

const packageManifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
assert.deepEqual(packageManifest.dependencies, { "@mkbabb/parse-that": "1.0.0" });
const sourceText = walk(join(root, "src")).map((path) => readFileSync(path, "utf8")).join("\n");
assert.equal(/@mkbabb\/parse-that\//.test(sourceText), false, "deep imports are forbidden");

const corpusReceipt = JSON.parse(readFileSync(join(root, "proof/corpus.json"), "utf8"));
function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (["node_modules", "dist", ".cache"].includes(entry.name)) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}
const corpusRows = walk(root)
  .map((path) => ({
    path: relative(root, path),
    bytes: statSync(path).size,
    sha256: createHash("sha256").update(readFileSync(path)).digest("hex"),
  }))
  .filter((row) => row.path !== "proof/corpus.json")
  .sort((left, right) => compare(left.path, right.path));
const canonicalRows = corpusRows
  .map((row) => `${row.sha256}\t${row.bytes}\t${row.path}\n`)
  .join("");
assert.equal(corpusReceipt.ledger_file_count, corpusRows.length);
assert.equal(corpusReceipt.ledger_total_bytes, corpusRows.reduce((sum, row) => sum + row.bytes, 0));
assert.equal(
  corpusReceipt.self_hash,
  sha256(canonicalRows),
  "retained corpus self-hash",
);

const benchmark = JSON.parse(readFileSync(join(root, "proof/benchmark.json"), "utf8"));
const subjectPaths = [join(root, "package.json"), join(root, "package-lock.json"), ...walk(join(root, "src"))]
  .sort((left, right) => compare(relative(root, left), relative(root, right)));
const subjectRows = subjectPaths
  .map((path) => `${sha256(readFileSync(path))}\t${relative(root, path)}\n`)
  .join("");
assert.equal(benchmark.subject_sha256, sha256(subjectRows), "benchmark subject binding");
assert.equal(benchmark.runner_sha256, sha256(readFileSync(join(root, "bench/compare.ts"))), "benchmark runner binding");

console.log(JSON.stringify({
  status: "PASS",
  modules: actualModules.length,
  tests: actualTests.length,
  topology_manifest_hash: authority.manifest_hash,
  authority_file_sha256: sha256(authorityBytes),
  corpus_files: corpusRows.length,
  corpus_self_hash: corpusReceipt.self_hash,
}));
