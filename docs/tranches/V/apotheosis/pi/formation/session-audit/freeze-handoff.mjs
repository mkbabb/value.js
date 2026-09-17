import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const auditRoot = import.meta.dirname;
const trancheRoot = resolve(auditRoot, "../..");

const subjects = [
  "ADDENDA-08.md",
  "HANDOFF.md",
  "HANDOFF-2026-07-24.md",
  "formation/session-audit/FINDINGS.md",
  "formation/session-audit/AUDIT-BRIEF.md",
  "formation/session-audit/SUBJECT.json",
  "formation/session-audit/subject-ledger.tsv",
  "formation/session-audit/extract-raw-prompts.mjs",
  "formation/session-audit/snapshot-current-state.mjs",
  "formation/session-audit/freeze-handoff.mjs",
  "formation/session-audit/raw-prompts/INDEX.json",
  "formation/session-audit/preflight-prompt-census.md",
];

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

const files = subjects.map((path) => {
  const bytes = readFileSync(resolve(trancheRoot, path));
  return {
    path,
    bytes: bytes.length,
    sha256: sha256(bytes),
  };
});

const promptIndex = JSON.parse(
  readFileSync(
    resolve(trancheRoot, "formation/session-audit/raw-prompts/INDEX.json"),
    "utf8",
  ),
);

const manifest = {
  schema: "value.pi.session-audit-handoff/v1",
  capturedAt: new Date().toISOString(),
  scope: "prototype/audit continuation only; no production execution",
  files,
  promptArchives: promptIndex.sessions.map((session) => ({
    label: session.label,
    threadId: session.threadId,
    source: session.source,
    sourceBytes: session.sourceBytes,
    sourceSha256: session.sourceSha256,
    prompts: session.prompts,
    uniquePrompts: session.uniquePrompts,
    archive: session.archive,
    archiveSha256: session.archiveSha256,
    agentMessages: session.agentMessages,
    agentArchive: session.agentArchive,
    agentArchiveSha256: session.agentArchiveSha256,
    agentEnvelopes: session.agentEnvelopes,
    agentEnvelopeArchive: session.agentEnvelopeArchive,
    agentEnvelopeArchiveSha256: session.agentEnvelopeArchiveSha256,
  })),
};

const output = resolve(auditRoot, "HANDOFF-MANIFEST.json");
writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      output,
      bytes: readFileSync(output).length,
      sha256: sha256(readFileSync(output)),
    },
    null,
    2,
  ),
);
