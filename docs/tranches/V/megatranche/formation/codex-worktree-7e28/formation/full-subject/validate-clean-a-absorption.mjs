<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/validate-clean-a-absorption.mjs
  original-mtime: 2026-07-29T20:05:09
  original-sha256: 838c01c1f6137289b31b009daa0cdc6039ecace712133372903119b66a3c603b
  original-bytes: 3492
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";

const [manifestPath, packetPath, surfacePath] = process.argv.slice(2);

if (!manifestPath || !packetPath || !surfacePath) {
  console.error(
    "usage: validate-clean-a-absorption.mjs <manifest.json> <packet.md> <surface.md>",
  );
  process.exit(2);
}

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const failures = [];

const [manifestBytes, packetBytes, surfaceBytes] = await Promise.all([
  readFile(manifestPath),
  readFile(packetPath),
  readFile(surfacePath),
]);

const manifest = JSON.parse(manifestBytes.toString("utf8"));
const packet = packetBytes.toString("utf8");
const surface = surfaceBytes.toString("utf8");
const census = manifest.postAbsorption?.consumerCensus ?? {};

const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

expect(manifest.schema === "value-clean-a-absorption/v1", "wrong schema");
expect(manifest.finding === "CA-01", "wrong finding");
expect(manifest.cleanAVerdict === "AMEND", "wrong Clean A verdict");
expect(manifest.p3?.registryAmended === false, "P3 registry must remain unchanged");
expect(manifest.executionCredit === 0, "execution credit must remain zero");
expect(manifest.cleanBState === "BLOCKED", "Clean B must remain blocked");

expect(census.totalReferences === 53, "totalReferences must be 53");
expect(census.totalFiles === 51, "totalFiles must be 51");
expect(census.directImports === 49, "directImports must be 49");
expect(census.directImportFiles === 47, "directImportFiles must be 47");
expect(census.importMetaResolveLiterals === 2, "meta-resolve literals must be 2");
expect(census.benchHtmlImportMapKeys === 2, "bench HTML keys must be 2");
expect(census.nonImportLiterals === 4, "non-import literals must be 4");
expect(
  census.directImports +
    census.importMetaResolveLiterals +
    census.benchHtmlImportMapKeys ===
    census.totalReferences,
  "reference classes do not sum to totalReferences",
);

expect(
  sha256(packetBytes) === manifest.postAbsorption?.packet?.sha256,
  "packet SHA mismatch",
);
expect(
  sha256(surfaceBytes) === manifest.postAbsorption?.keyframesSurface?.sha256,
  "surface SHA mismatch",
);

for (const [name, text] of [
  ["packet", packet],
  ["surface", surface],
]) {
  expect(text.includes("53"), `${name} does not name 53`);
  expect(text.includes("51 files"), `${name} does not name 51 files`);
  expect(text.includes("49 direct imports"), `${name} does not name 49 direct imports`);
  expect(text.includes("47 files"), `${name} does not name 47 direct-import files`);
  expect(text.includes("import.meta.resolve"), `${name} omits import.meta.resolve`);
  expect(text.includes("bench HTML import-map keys"), `${name} omits bench HTML keys`);
  expect(!text.includes("49-site import map"), `${name} retains stale 49-site map`);
  expect(
    !text.includes("49-site migration and deletion map"),
    `${name} retains stale 49-site migration map`,
  );
}

const result = {
  schema: "value-clean-a-absorption-validation/v1",
  manifest: basename(manifestPath),
  manifestSha256: sha256(manifestBytes),
  packet: basename(packetPath),
  packetSha256: sha256(packetBytes),
  surface: basename(surfacePath),
  surfaceSha256: sha256(surfaceBytes),
  census,
  failures,
  ok: failures.length === 0,
};

console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
