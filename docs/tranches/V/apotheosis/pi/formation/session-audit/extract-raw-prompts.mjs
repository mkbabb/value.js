import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../../../../../../..");
const outputDirectory = resolve(import.meta.dirname, "raw-prompts");
const agentOutputDirectory = resolve(import.meta.dirname, "raw-agent-messages");
const agentEnvelopeDirectory = resolve(
  import.meta.dirname,
  "raw-agent-envelopes",
);

const sessions = [
  {
    label: "value-tranche-v-formation",
    threadId: "019f6619-f1b0-7cf0-94af-27f579ff4fba",
    source:
      "/Users/mkbabb/.codex/sessions/2026/07/15/" +
      "rollout-2026-07-15T10-06-44-019f6619-f1b0-7cf0-94af-27f579ff4fba.jsonl",
  },
  {
    label: "value-v-pi-refinement",
    threadId: "019f85f6-8ef9-7251-bcdb-8fc66cfda83d",
    source:
      "/Users/mkbabb/.codex/sessions/2026/07/21/" +
      "rollout-2026-07-21T14-35-56-019f85f6-8ef9-7251-bcdb-8fc66cfda83d.jsonl",
  },
  {
    label: "bbnf-greenfield-coordination",
    threadId: "019f7685-254a-7a22-9917-1da91f977861",
    source:
      "/Users/mkbabb/.codex/sessions/2026/07/18/" +
      "rollout-2026-07-18T14-37-45-019f7685-254a-7a22-9917-1da91f977861.jsonl",
  },
];

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function classify(text) {
  if (text.startsWith("<codex_delegation>")) return "cross-thread-delegation";
  if (text.startsWith("# Context from my IDE setup:")) return "user-prompt-with-ide-context";
  return "direct-user-prompt";
}

function fenceFor(text) {
  const runs = text.match(/`+/g) ?? [];
  const width = Math.max(3, ...runs.map((run) => run.length)) + 1;
  return "`".repeat(width);
}

function extractCanonicalPrompts(source) {
  const messages = [];
  const lines = readFileSync(source, "utf8").trimEnd().split("\n");

  for (const line of lines) {
    const item = JSON.parse(line);
    const payload = item.payload ?? {};
    if (item.type !== "event_msg" || payload.type !== "user_message") continue;

    const text = payload.message ?? "";
    messages.push({
      timestamp: item.timestamp,
      text,
      sha256: sha256(text),
      classification: classify(text),
    });
  }

  return messages;
}

function extractAgentMessages(source) {
  const messages = [];
  const lines = readFileSync(source, "utf8").trimEnd().split("\n");

  for (const line of lines) {
    const item = JSON.parse(line);
    const payload = item.payload ?? {};
    if (
      item.type !== "response_item" ||
      payload.type !== "message" ||
      payload.role !== "assistant"
    ) {
      continue;
    }

    const text = (payload.content ?? [])
      .filter((part) => part.type === "output_text" || part.type === "text")
      .map((part) => part.text)
      .join("\n");

    messages.push({
      timestamp: item.timestamp,
      text,
      sha256: sha256(text),
      classification: classify(text),
    });
  }

  return messages;
}

function extractAgentEnvelopes(source) {
  const envelopes = [];
  const lines = readFileSync(source, "utf8").trimEnd().split("\n");

  for (const line of lines) {
    const item = JSON.parse(line);
    if (
      item.type !== "response_item" ||
      item.payload?.type !== "agent_message"
    ) {
      continue;
    }
    envelopes.push(line);
  }

  return envelopes;
}

mkdirSync(outputDirectory, { recursive: true });
mkdirSync(agentOutputDirectory, { recursive: true });
mkdirSync(agentEnvelopeDirectory, { recursive: true });

const index = [];

for (const session of sessions) {
  const sourceBytes = readFileSync(session.source);
  const prompts = extractCanonicalPrompts(session.source);
  const agentMessages = extractAgentMessages(session.source);
  const agentEnvelopes = extractAgentEnvelopes(session.source);
  const unique = new Set(prompts.map((prompt) => prompt.sha256));
  const output = resolve(outputDirectory, `${session.label}.md`);

  const lines = [
    `# Raw user-role prompt archive — ${session.label}`,
    "",
    "> Generated mechanically from canonical `event_msg/user_message` records in",
    "> the immutable-at-read rollout JSONL. No prompt text is normalized, corrected,",
    "> deduplicated, or silently omitted. Synthetic `response_item/message/user`",
    "> envelopes are excluded because they duplicate prompts and contain automatic",
    "> goal/plugin/environment context not authored as a prompt.",
    "",
    `- Thread: \`${session.threadId}\``,
    `- Source: \`${session.source}\``,
    `- Source basename: \`${basename(session.source)}\``,
    `- Source bytes: ${statSync(session.source).size}`,
    `- Source SHA-256: \`${sha256(sourceBytes)}\``,
    `- User-role prompt occurrences: ${prompts.length}`,
    `- Unique exact prompt bodies: ${unique.size}`,
    "",
  ];

  prompts.forEach((prompt, index) => {
    const fence = fenceFor(prompt.text);
    lines.push(
      `## ${String(index + 1).padStart(3, "0")} — ${prompt.timestamp}`,
      "",
      `- Classification: \`${prompt.classification}\``,
      `- Body SHA-256: \`${prompt.sha256}\``,
      `- UTF-8 bytes: ${Buffer.byteLength(prompt.text)}`,
      "",
      fence,
      prompt.text,
      fence,
      "",
    );
  });

  writeFileSync(output, `${lines.join("\n")}\n`);

  const agentOutput = resolve(
    agentOutputDirectory,
    `${session.label}.md`,
  );
  const agentLines = [
    `# Raw Codex agent-message archive — ${session.label}`,
    "",
    "> Generated mechanically from assistant-role response messages. This is an",
    "> assay source, not an acceptance ledger: every claim remains unproven until",
    "> reconciled with current bytes, commands, specifications, or acknowledged",
    "> external receipts.",
    "",
    `- Thread: \`${session.threadId}\``,
    `- Source SHA-256 at extraction: \`${sha256(sourceBytes)}\``,
    `- Agent-message occurrences: ${agentMessages.length}`,
    "",
  ];
  agentMessages.forEach((message, messageIndex) => {
    const fence = fenceFor(message.text);
    agentLines.push(
      `## ${String(messageIndex + 1).padStart(4, "0")} — ${message.timestamp}`,
      "",
      `- Body SHA-256: \`${message.sha256}\``,
      `- UTF-8 bytes: ${Buffer.byteLength(message.text)}`,
      "",
      fence,
      message.text,
      fence,
      "",
    );
  });
  writeFileSync(agentOutput, `${agentLines.join("\n")}\n`);

  const agentEnvelopeOutput = resolve(
    agentEnvelopeDirectory,
    `${session.label}.jsonl`,
  );
  writeFileSync(
    agentEnvelopeOutput,
    agentEnvelopes.length === 0 ? "" : `${agentEnvelopes.join("\n")}\n`,
  );

  index.push({
    label: session.label,
    threadId: session.threadId,
    source: session.source,
    sourceSha256: sha256(sourceBytes),
    sourceBytes: statSync(session.source).size,
    prompts: prompts.length,
    uniquePrompts: unique.size,
    archive: output.slice(root.length + 1),
    archiveSha256: sha256(readFileSync(output)),
    agentMessages: agentMessages.length,
    agentArchive: agentOutput.slice(root.length + 1),
    agentArchiveSha256: sha256(readFileSync(agentOutput)),
    agentEnvelopes: agentEnvelopes.length,
    agentEnvelopeArchive: agentEnvelopeOutput.slice(root.length + 1),
    agentEnvelopeArchiveSha256: sha256(readFileSync(agentEnvelopeOutput)),
  });
}

const indexPath = resolve(outputDirectory, "INDEX.json");
writeFileSync(indexPath, `${JSON.stringify({ schema: "v-pi-raw-prompts/1", sessions: index }, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      index: indexPath,
      indexSha256: sha256(readFileSync(indexPath)),
      sessions: index,
    },
    null,
    2,
  ),
);
