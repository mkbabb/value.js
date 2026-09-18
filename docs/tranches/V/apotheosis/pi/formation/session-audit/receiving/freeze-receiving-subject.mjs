// Freeze the receiving-audit subject: the COMPLETE V·π tree including the
// handoff packet and the session-audit archives (the inherited SUBJECT.json
// deliberately excluded session-audit/**; this one deliberately includes it,
// excluding only receiving/** so the audit does not self-hash).
//
// AUDIT-BRIEF.md §1.2: "Freeze the complete then-current V·π tree, including
// this handoff packet, in a new audit-subject ledger. Do not overwrite the
// inherited SUBJECT.json."
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const here = import.meta.dirname;
const repository = resolve(here, "../../../../../../../..");
const tranche = resolve(repository, "docs/tranches/V/apotheosis/pi");
const excludedPrefix = "formation/session-audit/receiving/";

const sha256 = (v) => createHash("sha256").update(v).digest("hex");

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

function git(...args) {
  const r = spawnSync("git", args, { cwd: repository, encoding: "utf8" });
  return (r.stdout || "").trim();
}

const all = walk(tranche)
  .map((p) => relative(tranche, p))
  .filter((p) => !p.startsWith(excludedPrefix))
  .sort();

const rows = [];
let totalBytes = 0;
for (const rel of all) {
  const abs = resolve(tranche, rel);
  const bytes = readFileSync(abs);
  totalBytes += bytes.length;
  rows.push({ path: rel, bytes: bytes.length, sha256: sha256(bytes) });
}

const ledger = rows.map((r) => `${r.path}\t${r.bytes}\t${r.sha256}`).join("\n") + "\n";
const ledgerSha = sha256(ledger);

// Untracked-status truth for the tranche tree.
const trancheRel = "docs/tranches/V/apotheosis/pi";
const trackedInHead = git("ls-tree", "-r", "--name-only", "HEAD", trancheRel)
  .split("\n")
  .filter(Boolean);

const subject = {
  schema: "v-pi-receiving-audit-subject/1",
  brief: "docs/tranches/V/apotheosis/pi/formation/session-audit/AUDIT-BRIEF.md",
  note:
    "Complete V·π tree INCLUDING the handoff packet and the raw archives. " +
    "Excludes only formation/session-audit/receiving/** so the receiving audit does not self-hash. " +
    "The inherited SUBJECT.json is untouched and still binds the pre-handoff tree.",
  repository: {
    root: relative(resolve(repository, ".."), repository),
    head: git("rev-parse", "HEAD"),
    branch: git("rev-parse", "--abbrev-ref", "HEAD"),
    treeOfHead: git("rev-parse", "HEAD^{tree}"),
    porcelainSha256: sha256(git("status", "--porcelain=v1", "--untracked-files=all") + "\n"),
    dirtyPathCount: git("status", "--porcelain=v1", "--untracked-files=normal")
      .split("\n")
      .filter(Boolean).length,
  },
  tranche: {
    path: trancheRel,
    fileCount: rows.length,
    totalBytes,
    ledger: "formation/session-audit/receiving/audit-subject-ledger.tsv",
    ledgerSha256: ledgerSha,
    trackedFilesInHead: trackedInHead.length,
    entirelyUntracked: trackedInHead.length === 0,
  },
  inherited: {
    subject: "formation/session-audit/SUBJECT.json",
    subjectSha256: sha256(
      readFileSync(resolve(tranche, "formation/session-audit/SUBJECT.json")),
    ),
    handoffManifestSha256: sha256(
      readFileSync(resolve(tranche, "formation/session-audit/HANDOFF-MANIFEST.json")),
    ),
  },
  rawArchiveIndexSha256: sha256(
    readFileSync(resolve(tranche, "formation/session-audit/raw-prompts/INDEX.json")),
  ),
};

mkdirSync(here, { recursive: true });
writeFileSync(resolve(here, "audit-subject-ledger.tsv"), ledger);
writeFileSync(resolve(here, "AUDIT-SUBJECT.json"), JSON.stringify(subject, null, 2) + "\n");

console.log(JSON.stringify(subject, null, 2));
