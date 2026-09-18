<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/validate-full-subject.mjs
  original-mtime: 2026-07-29T18:39:48
  original-sha256: 26993d7f6dbde46c136b4e1f5905140375fbb3e90c6783d4a9e01395e28a2ea6
  original-bytes: 3574
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

const [denominatorPath, passPath, expectedPredecessor = "NONE"] =
  process.argv.slice(2);

if (!denominatorPath || !passPath) {
  throw new Error(
    "usage: node validate-full-subject.mjs <denominator.json> <pass.json> [predecessor-sha|NONE]",
  );
}

const read = (path) => readFileSync(path);
const parse = (path) => JSON.parse(read(path).toString("utf8"));
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

const denominatorBytes = read(denominatorPath);
const passBytes = read(passPath);
const denominator = JSON.parse(denominatorBytes.toString("utf8"));
const pass = JSON.parse(passBytes.toString("utf8"));

const allowed = new Set(denominator.allowedDispositions);
const expectedIds = denominator.families.map(({ familyId }) => familyId);
const actualIds = pass.families.map(({ familyId }) => familyId);
const requiredFields = denominator.requiredPassFields;
const duplicateIds = actualIds.filter(
  (familyId, index) => actualIds.indexOf(familyId) !== index,
);
const missingIds = expectedIds.filter((familyId) => !actualIds.includes(familyId));
const extraIds = actualIds.filter((familyId) => !expectedIds.includes(familyId));
const missingFields = pass.families.flatMap((family) =>
  requiredFields
    .filter((field) => !(field in family))
    .map((field) => `${family.familyId}.${field}`),
);
const badDispositions = pass.families
  .filter(({ disposition }) => !allowed.has(disposition))
  .map(({ familyId, disposition }) => `${familyId}:${disposition}`);
const emptyFields = pass.families.flatMap((family) =>
  requiredFields
    .filter((field) => {
      const value = family[field];
      return value === "" || value === null ||
        (Array.isArray(value) && value.length === 0);
    })
    .map((field) => `${family.familyId}.${field}`),
);

const denominatorSha256 = sha256(denominatorBytes);
const passSha256 = sha256(passBytes);
const predecessor =
  expectedPredecessor === "NONE" ? null : expectedPredecessor;
const failures = [];

if (denominator.familyCount !== expectedIds.length) {
  failures.push("denominator familyCount does not equal its row count");
}
if (pass.familyCount !== actualIds.length) {
  failures.push("pass familyCount does not equal its row count");
}
if (actualIds.length !== expectedIds.length) {
  failures.push("pass and denominator row counts differ");
}
if (pass.familyDenominatorSha256 !== denominatorSha256) {
  failures.push("pass does not bind the exact denominator SHA");
}
if (pass.predecessorRegistrySha256 !== predecessor) {
  failures.push("pass predecessor SHA does not match the expected coordinate");
}
if (duplicateIds.length) failures.push("duplicate family IDs");
if (missingIds.length) failures.push("missing family IDs");
if (extraIds.length) failures.push("extra family IDs");
if (missingFields.length) failures.push("missing required fields");
if (emptyFields.length) failures.push("empty required fields");
if (badDispositions.length) failures.push("invalid terminal dispositions");

const receipt = {
  schema: "value-full-subject-validation/v1",
  denominator: basename(denominatorPath),
  denominatorSha256,
  pass: basename(passPath),
  passSha256,
  expectedPredecessor: predecessor,
  familyCount: actualIds.length,
  duplicateIds,
  missingIds,
  extraIds,
  missingFields,
  emptyFields,
  badDispositions,
  failures,
  ok: failures.length === 0,
};

console.log(JSON.stringify(receipt, null, 2));
if (!receipt.ok) process.exitCode = 1;
