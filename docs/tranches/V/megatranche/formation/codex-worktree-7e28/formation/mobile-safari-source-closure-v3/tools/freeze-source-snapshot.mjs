<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/mobile-safari-source-closure-v3/tools/freeze-source-snapshot.mjs
  original-mtime: 2026-08-01T20:21:13
  original-sha256: f280cea40f604b73b0c07276bdf38c3df3b707104b6730f58e2810bced94da50
  original-bytes: 10591
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "../../../../../../..");
const LIVE = "/Users/mkbabb/Programming/value.js";
const OUT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(OUT, "raw");
const ENTRY = "demo/color-picker/index.html";
if (REPO !== "/Users/mkbabb/.codex/worktrees/7e28/value.js") throw new Error(`repo:${REPO}`);

const cp = (a, b) => {
    const aa = [...a], bb = [...b];
    for (let i = 0; i < Math.min(aa.length, bb.length); i += 1) {
        const d = aa[i].codePointAt(0) - bb[i].codePointAt(0);
        if (d) return d;
    }
    return aa.length - bb.length;
};
const sha = (value) => createHash("sha256").update(value).digest("hex");
const mode = (stats) => (stats.mode & 0o7777).toString(8).padStart(4, "0");
const emit = (file, value) => writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);

function walk(root) {
    const rows = [];
    const visit = (rel) => {
        const abs = path.join(REPO, rel);
        const stats = lstatSync(abs);
        if (stats.isSymbolicLink()) throw new Error(`source-symlink:${rel}`);
        if (stats.isDirectory()) {
            for (const name of readdirSync(abs).sort(cp)) visit(path.posix.join(rel, name));
        } else if (stats.isFile()) rows.push(rel);
        else throw new Error(`source-special:${rel}`);
    };
    visit(root);
    return rows;
}

const supporting = [
    ENTRY,
    "package.json", "package-lock.json", "vite.config.ts",
    "tsconfig.json", "tsconfig.demo.json", "tsconfig.lib.json",
    "plugins/vite-source-export.ts", "scripts/dev/dev.sh",
    "docs/instructions/README.md",
    "docs/tranches/V/megatranche/formation/COMPONENT-WORKFLOW-MATRIX-2026-07-29.md",
    "docs/tranches/V/megatranche/formation/NON-PARSER-FRONTEND-SPEC-CLOSURE-2026-07-30.md",
    "docs/tranches/V/megatranche/formation/VALUE-MOBILE-SAFARI-KRONECKER-AUDIT-PLAN-2026-08-01.md",
];
for (const rel of supporting) {
    const stats = lstatSync(path.join(REPO, rel));
    if (!stats.isFile() || stats.isSymbolicLink()) throw new Error(`input:${rel}`);
}
const entrySha = sha(readFileSync(path.join(REPO, ENTRY)));
if (entrySha !== "c8d073bda8d6dee378c7f05e6b9365364ddf742563f0650225ad2aaaf2935a0d") throw new Error(`entry:${entrySha}`);

const textExt = new Set([".css", ".html", ".js", ".json", ".md", ".mjs", ".sh", ".svg", ".ts", ".vue"]);
const paths = [...new Set([...walk("demo"), ...walk("src"), ...supporting])].sort(cp);
const entries = paths.map((rel) => {
    const abs = path.join(REPO, rel);
    const stats = lstatSync(abs);
    const bytes = readFileSync(abs);
    const textual = textExt.has(path.extname(rel)) || !bytes.includes(0);
    let live = { absent: true };
    try {
        const liveStats = lstatSync(path.join(LIVE, rel));
        const liveBytes = readFileSync(path.join(LIVE, rel));
        live = {
            absent: false, bytes: liveStats.size, mode: mode(liveStats), nlink: liveStats.nlink,
            sha256: sha(liveBytes), ...(textual ? { content: liveBytes.toString("utf8") } : {}),
        };
    } catch {}
    const localSha = sha(bytes);
    const disposition = live.absent
        ? rel.startsWith("docs/") ? "ISOLATED_FORMATION_INPUT" : "UNRESOLVED_LIVE_ABSENCE"
        : live.sha256 === localSha ? "IDENTICAL"
            : rel === "scripts/dev/dev.sh" ? "KNOWN_LIVE_HARNESS_SUPERSESSION_RETAIN_BOTH" : "UNRESOLVED_DRIFT";
    return {
        path: rel, kind: "file", bytes: stats.size, mode: mode(stats), nlink: stats.nlink,
        sha256: localSha, encoding: textual ? "utf8" : "binary-hash-only",
        ...(textual ? { content: bytes.toString("utf8") } : {}), live, mirrorDisposition: disposition,
    };
});
const unresolved = entries.filter((row) => row.mirrorDisposition.startsWith("UNRESOLVED"));
if (unresolved.length) throw new Error(`source-drift:${unresolved.map((row) => row.path).join(",")}`);

const expectedAuthorities = [
    ["v1-readme", `${REPO}/docs/tranches/V/megatranche/formation/mobile-safari-source-closure/README.md`, "f5863ade7c9e1374535371838364a1619a1d496f2d00cf4d7826782caad30524"],
    ["v1-tool", `${REPO}/docs/tranches/V/megatranche/formation/mobile-safari-source-closure/tools/freeze-source-snapshot.mjs`, "aacf024229638486cc79f1caf946ab3d2b89d4c39f27e593197004d8b6967569"],
    ["v2-readme", `${REPO}/docs/tranches/V/megatranche/formation/mobile-safari-source-closure-v2/README.md`, "51753857a7fda3ccf71a5eb2147d54b888d197368d3c2ef988fb06f55de02286"],
    ["v2-tool", `${REPO}/docs/tranches/V/megatranche/formation/mobile-safari-source-closure-v2/tools/freeze-source-snapshot.mjs`, "bc55444924964bedd54f5f1fb3d0eef59105502daa4db140d3c309abd0493c20"],
    ["plan", `${REPO}/docs/tranches/V/megatranche/formation/VALUE-MOBILE-SAFARI-KRONECKER-AUDIT-PLAN-2026-08-01.md`, "18f8ac83045496e6553d10d21e5cea26d2da43304952d4c67940aecb2e7a72ef"],
    ["law", `${LIVE}/docs/tranches/V/megatranche/formation/CROSS-REPO-MOBILE-SAFARI-KRONECKER-AUDIT-LAW-2026-08-01.md`, "2ab310b45b9289b53f5e1993ef870a0ae80cdd12c2856628fa523df85bf3ae5e"],
    ["root-handoff", `${LIVE}/docs/tranches/V/megatranche/CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md`, "a5f9843b3ebecc298987f492f92b7873a38be2337be9f9b63342755cf5547ad4"],
    ["root-manifest", `${LIVE}/docs/tranches/V/megatranche/RESURRECTION-HANDOFF-MANIFEST-2026-07-31.json`, "a7f8d7a05f2d36b9a5070c7ad6f54745409734b9fc65d49fcbf03c6014d06202"],
    ["root-checksums", `${LIVE}/docs/tranches/V/megatranche/RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256`, "84f16051e671cdc8f448fe15da5cb3de9e0c6c060f452c1da706b73216fb6bba"],
    ["root-pi", `${LIVE}/docs/tranches/V/apotheosis/pi/HANDOFF.md`, "4775251edb3dd95023be32602482861b53972fbb0af9cc1610dd22394eefaffc"],
].map(([id, absolutePath, expected]) => {
    const stats = lstatSync(absolutePath), bytes = readFileSync(absolutePath), actual = sha(bytes);
    if (actual !== expected) throw new Error(`authority:${id}:${actual}`);
    return { id, absolutePath, sha256: actual, bytes: stats.size, mode: mode(stats), nlink: stats.nlink };
});

const checksumText = readFileSync(`${LIVE}/docs/tranches/V/megatranche/RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256`, "utf8");
const checksumRows = checksumText.trim().split("\n").map((line) => {
    const match = line.match(/^([0-9a-f]{64})  (.+)$/u);
    if (!match) throw new Error(`checksum-syntax:${line}`);
    const absolutePath = path.isAbsolute(match[2]) ? match[2] : path.join(LIVE, match[2]);
    const actual = sha(readFileSync(absolutePath));
    return { expected: match[1], path: match[2], actual, pass: match[1] === actual };
});
if (checksumRows.length !== 6 || checksumRows.some((row) => !row.pass)) throw new Error("checksum-replay");

const declarations = entries
    .filter((row) => row.path.startsWith("demo/") && /\.(ts|vue)$/u.test(row.path) && row.path !== "demo/color-picker/vite.d.ts")
    .flatMap((row) => row.content.split("\n").flatMap((line, index) => line.includes('.vue"') ? [{ path: row.path, line: index + 1, text: line.trim() }] : []));
const barrelDeclarations = declarations.filter((row) => row.path.endsWith("index.ts") && row.text.startsWith("export "));
if (declarations.length !== 115) throw new Error(`declarations:${declarations.length}`);
if (barrelDeclarations.length !== 25) throw new Error(`barrels:${barrelDeclarations.length}`);

const gitFacts = (root) => {
    const run = (args) => execFileSync("/usr/bin/git", ["-C", root, ...args], { encoding: "utf8" }).trimEnd();
    return { head: run(["rev-parse", "HEAD"]), branch: run(["branch", "--show-current"]), status: run(["status", "--short", "--branch"]) };
};
const manifestLines = entries.map((row) => [row.sha256, row.bytes, row.mode, row.nlink, row.path].join("\t"));
const liveLines = entries.filter((row) => !row.live.absent).map((row) => [row.live.sha256, row.live.bytes, row.live.mode, row.live.nlink, row.path].join("\t"));
const snapshot = {
    schemaVersion: 3, frozenDate: "2026-08-01", sourceReadCount: 1,
    primaryCoordinate: "ISOLATED_WORKTREE_E01D0065", liveCoordinateRole: "READ_ONLY_EVIDENCE_TREE",
    sourceRootIdentity: sha(`${manifestLines.join("\n")}\n`), liveRootIdentity: sha(`${liveLines.join("\n")}\n`),
    authenticatedEntry: { path: ENTRY, sha256: entrySha },
    worktree: gitFacts(REPO), liveRoot: gitFacts(LIVE), authorities: expectedAuthorities,
    rootChecksumReplay: { passed: checksumRows.filter((row) => row.pass).length, total: checksumRows.length, rows: checksumRows },
    sourceCounts: {
        files: entries.length, bytes: entries.reduce((sum, row) => sum + row.bytes, 0),
        liveFiles: entries.filter((row) => !row.live.absent).length,
        vueSfc: entries.filter((row) => row.path.endsWith(".vue") && row.path.startsWith("demo/")).length,
        vueDeclarationEdges: declarations.length, visualBarrelDeclarations: barrelDeclarations.length,
        identicalLocalLive: entries.filter((row) => row.mirrorDisposition === "IDENTICAL").length,
        knownLiveHarnessSupersessions: entries.filter((row) => row.mirrorDisposition === "KNOWN_LIVE_HARNESS_SUPERSESSION_RETAIN_BOTH").length,
        isolatedFormationInputs: entries.filter((row) => row.mirrorDisposition === "ISOLATED_FORMATION_INPUT").length,
        unresolvedDrift: 0,
    },
    localLiveDeltas: entries.filter((row) => row.mirrorDisposition !== "IDENTICAL").map((row) => ({
        path: row.path, localSha256: row.sha256, liveSha256: row.live.sha256 ?? null, disposition: row.mirrorDisposition,
    })),
    entries,
};
const raw = {
    schemaVersion: 3, receiptId: "V-MSK-V3-SOURCE-READ-RAW-01", result: "PASS",
    sourceReadCount: 1, sourceRootIdentity: snapshot.sourceRootIdentity, liveRootIdentity: snapshot.liveRootIdentity,
    authenticatedEntry: snapshot.authenticatedEntry, sourceCounts: snapshot.sourceCounts,
    localLiveDeltas: snapshot.localLiveDeltas, manifestLines, declarations, barrelDeclarations,
    rootChecksumReplay: snapshot.rootChecksumReplay,
    v1: "IMMUTABLE_FIRST_RED_ZERO_CREDIT", v2: "IMMUTABLE_AUTHORITY_DRIFT_RED_ZERO_CREDIT", executionCredit: 0,
};
mkdirSync(RAW, { recursive: true });
emit(path.join(RAW, "SOURCE-READ-RAW.json"), raw);
emit(path.join(OUT, "SOURCE-SNAPSHOT.json"), snapshot);
process.stdout.write(`${JSON.stringify({ ok: true, sourceRootIdentity: snapshot.sourceRootIdentity, liveRootIdentity: snapshot.liveRootIdentity, sourceCounts: snapshot.sourceCounts }, null, 2)}\n`);
