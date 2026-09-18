import { createHash } from "node:crypto";
import {
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const repository = resolve(import.meta.dirname, "../../../../../../..");
const tranche = resolve(repository, "docs/tranches/V/apotheosis/pi");
const excluded = "formation/session-audit/";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

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
  const result = spawnSync("git", args, {
    cwd: repository,
    encoding: "utf8",
  });
  if (result.status !== 0) throw new Error(result.stderr);
  return result.stdout.trimEnd();
}

const files = walk(tranche)
  .map((path) => ({
    path,
    relative: relative(tranche, path),
  }))
  .filter(({ relative: path }) => !path.startsWith(excluded))
  .filter(({ relative: path }) => !path.includes("/node_modules/"))
  .filter(({ relative: path }) => !path.startsWith("mirror/node_modules/"))
  .sort((a, b) => Buffer.from(a.relative).compare(Buffer.from(b.relative)));

const ledger = files.map(({ path, relative: relativePath }) => {
  const bytes = readFileSync(path);
  return `${sha256(bytes)}  ${bytes.length}  ${relativePath}`;
});

const ledgerPath = resolve(import.meta.dirname, "subject-ledger.tsv");
writeFileSync(ledgerPath, `${ledger.join("\n")}\n`);

const activeRoot = resolve(tranche, "mirror/apotheosis");
const activeFiles = walk(activeRoot)
  .filter((path) => !path.includes("/node_modules/"))
  .sort((a, b) => Buffer.from(a).compare(Buffer.from(b)))
  .map((path) => {
    const bytes = readFileSync(path);
    return {
      path: relative(tranche, path),
      bytes: bytes.length,
      sha256: sha256(bytes),
    };
  });

const manifest = {
  schema: "v-pi-session-audit-subject/1",
  capturedAt: new Date().toISOString(),
  repository,
  repositoryHead: git("rev-parse", "HEAD"),
  repositoryStatusShort: git("status", "--short").split("\n").filter(Boolean),
  trancheRoot: relative(repository, tranche),
  exclusion: `${excluded}**`,
  subjectFiles: files.length,
  subjectBytes: files.reduce((total, { path }) => total + statSync(path).size, 0),
  ledger: relative(tranche, ledgerPath),
  ledgerSha256: sha256(readFileSync(ledgerPath)),
  activeRoot: "mirror/apotheosis",
  activeFiles,
};

const manifestPath = resolve(import.meta.dirname, "SUBJECT.json");
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      manifest: manifestPath,
      manifestSha256: sha256(readFileSync(manifestPath)),
      ledger: ledgerPath,
      ledgerSha256: manifest.ledgerSha256,
      subjectFiles: manifest.subjectFiles,
      subjectBytes: manifest.subjectBytes,
    },
    null,
    2,
  ),
);
