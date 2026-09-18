import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { lstatSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const expected = JSON.parse(readFileSync(join(root, "proof/package-receipt.json"), "utf8"));
const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const lock = JSON.parse(readFileSync(join(root, "package-lock.json"), "utf8"));
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
function ledger(directory, current = directory) {
  return readdirSync(current, { withFileTypes: true }).flatMap((entry) => {
    const path = join(current, entry.name);
    assert.equal(entry.isSymbolicLink() || lstatSync(path).isSymbolicLink(), false, `package symlink ${path}`);
    return entry.isDirectory()
      ? ledger(directory, path)
      : [{ path: relative(directory, path), bytes: lstatSync(path).size, sha256: sha256(readFileSync(path)) }];
  }).sort((left, right) => left.path < right.path ? -1 : left.path > right.path ? 1 : 0);
}

assert.deepEqual(manifest.dependencies, { "@mkbabb/parse-that": "1.0.0" });
const locked = lock.packages["node_modules/@mkbabb/parse-that"];
assert.equal(locked.version, expected.version);
assert.equal(locked.integrity, expected.dist.integrity);
assert.equal(locked.resolved, expected.dist.tarball);
assert.ok(!lock.packages[""]?.dependencies?.["@mkbabb/parse-that"]?.startsWith("file:"));

const installed = realpathSync(join(root, "node_modules/@mkbabb/parse-that"));
assert.ok(installed.startsWith(realpathSync(root) + "/node_modules/"));
assert.ok(!installed.includes("/Programming/parse-that"));
const runtime = await import("@mkbabb/parse-that");
assert.deepEqual(Object.keys(runtime).sort(), expected.exports);

const temporary = mkdtempSync(join(tmpdir(), "c14-registry-receipt-"));
try {
  const packed = JSON.parse(
    execFileSync(
      "npm",
      ["pack", expected.registry_spec, "--json", "--pack-destination", temporary],
      { cwd: root, encoding: "utf8" },
    ),
  )[0];
  const archivePath = join(temporary, packed.filename);
  const archive = readFileSync(archivePath);
  assert.equal(sha256(archive), expected.dist.sha256);
  assert.equal(packed.integrity, expected.dist.integrity);
  assert.equal(packed.shasum, expected.dist.shasum);
  assert.equal(packed.files.length, expected.dist.file_count);
  assert.equal(packed.unpackedSize, expected.dist.unpacked_size);
  execFileSync("tar", ["-xzf", archivePath, "-C", temporary]);
  const installedLedger = ledger(installed);
  assert.deepEqual(installedLedger, ledger(join(temporary, "package")), "installed package differs from registry tarball");
  assert.equal(
    sha256(JSON.stringify(installedLedger)),
    expected.installed_package_tree_sha256,
    "installed package ledger receipt",
  );
} finally {
  rmSync(temporary, { recursive: true, force: true });
}

console.log(JSON.stringify({
  status: "PASS",
  registry_spec: expected.registry_spec,
  sha256: expected.dist.sha256,
  package_tree_sha256: expected.installed_package_tree_sha256,
}));
