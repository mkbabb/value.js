// V · pass-4 · charter-ζ · DOCS LINKGRAPH — the stale-docs census instrument (DURABLE)
//
// THE DURABLE-INSTRUMENT LAW: committed, re-runnable from the repo root against any tree.
//   node docs/tranches/V/design/pass-4/instruments/docs-linkgraph.mjs
//   node docs/tranches/V/design/pass-4/instruments/docs-linkgraph.mjs --json
//   node docs/tranches/V/design/pass-4/instruments/docs-linkgraph.mjs --root=/abs/path/to/repo
//
// WHAT IT COMPUTES: the inbound-reference count for every docs/**/*.md file, by resolving
// every markdown link `](target)` and every bare `docs/…`/relative `…​.md` path mention in
// the ENTIRE tracked repo (docs + src + demo + api + scripts + config + the two CLAUDE.md).
// A doc with inboundLive == 0 is UNREACHABLE from any LIVE referrer.
//
// THE CHOSEN OBJECTIVE (NG-3 objective-honesty — stated, not dressed as measurement):
//   "stale" is DERIVED under this rule, and the alternative is named:
//   RULE  — a docs/ file is a STALE CANDIDATE iff (inbound-from-LIVE == 0) AND it is NOT a
//           tranche RECORD AND it is NOT in the CURRENT campaign (docs/tranches/V). "LIVE
//           referrers" = every tracked file OUTSIDE a closed-tranche
//           dir (docs/tranches/{A..U}) — i.e. code, config, CLAUDE.md, precepts/, instructions/,
//           colors/, frontend-design/, RELEASE.md, dev-deploy-standard.md, and the CURRENT
//           campaign docs/tranches/V. A tranche RECORD (docs/tranches/{A..U}/**) is KEEP-BY-
//           CONVENTION regardless of inbound (portfolio A4: "A..U closed tranches are records,
//           keep") — the campaign never proposes deleting closed-tranche evidence.
//   ALTERNATIVE (rejected) — "stale = inbound-from-ANY == 0" would flag thousands of leaf
//           audit docs that are cross-linked only within their own closed tranche; that
//           contradicts the keep-records convention and is NOT the owner's ask.
//   V-EXEMPTION — the current campaign (docs/tranches/V) is LIVE authored surface, not stale;
//           its docs cross-reference each other in a bare `design/pass-N/…​.md` form this
//           linkgraph intentionally does NOT chase (chasing it would mask genuine orphans
//           elsewhere). V is reported separately, never as a stale target.
//
// The census's ACTIONABLE surface is therefore: (a) non-md litter under docs/, and
// (b) NON-tranche docs/ areas + loose docs/*.md with zero inbound from a live referrer.
// Tranche records are reported as an informational footprint, never as a sweep target.

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve, dirname, relative, extname } from "node:path";

const ROOT = resolve(process.argv.find((a) => a.startsWith("--root="))?.slice(7) || ".");
const JSON_OUT = process.argv.includes("--json");

// ---- tracked-file corpus (git is the source of truth) ----
function tracked() {
  try {
    return execSync("git ls-files", { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
      .split("\n").filter(Boolean);
  } catch {
    return [];
  }
}
const allFiles = tracked();
const allSet = new Set(allFiles);
const docsMd = allFiles.filter((f) => f.startsWith("docs/") && f.endsWith(".md"));
const docsSet = new Set(docsMd.map((f) => resolve(ROOT, f)));

// A referrer is a text file that can carry a link. Scan every tracked text file.
const TEXT_EXT = new Set([".md", ".ts", ".tsx", ".vue", ".mjs", ".js", ".mts", ".cjs",
  ".json", ".yml", ".yaml", ".sh", ".py", ".css", ".html", ".bbnf", ".txt"]);
const referrers = allFiles.filter((f) => TEXT_EXT.has(extname(f)) || f.endsWith("CLAUDE.md"));

// closed-tranche RECORD test: docs/tranches/{A..U}/… (V is the CURRENT campaign = LIVE)
function isClosedTrancheRecord(absPath) {
  const rel = relative(ROOT, absPath);
  const m = rel.match(/^docs\/tranches\/([A-Z]+)\//);
  return !!m && m[1] !== "V";
}
// a referrer is LIVE iff it is NOT inside a closed-tranche record dir
function isLiveReferrer(relPath) {
  const m = relPath.match(/^docs\/tranches\/([A-Z]+)\//);
  return !(m && m[1] !== "V");
}

// ---- link extraction: markdown links + bare docs/ paths + relative *.md mentions ----
const MD_LINK = /\]\(\s*([^)\s#]+)/g;                             // [text](target)
const DOCS_PATH = /(?<![\w./-])(docs\/[A-Za-z0-9._\/-]+\.md)/g;   // bare repo-rooted docs path
const REL_MD = /(?<![\w])((?:\.\.?\/)[A-Za-z0-9._\/-]+\.md)/g;    // ../foo.md or ./foo.md

function candidatesFrom(src) {
  const out = [];
  let m;
  MD_LINK.lastIndex = 0; while ((m = MD_LINK.exec(src))) out.push(m[1]);
  DOCS_PATH.lastIndex = 0; while ((m = DOCS_PATH.exec(src))) out.push(m[1]);
  REL_MD.lastIndex = 0; while ((m = REL_MD.exec(src))) out.push(m[1]);
  return out;
}

// resolve a candidate specifier (relative to the referrer, or repo-root for docs/-rooted)
function resolveCand(cand, fromRel) {
  let p = cand.trim().replace(/^<|>$/g, "");
  if (!p || p.startsWith("http") || p.startsWith("mailto:")) return null;
  p = p.split("#")[0].split("?")[0];
  if (!p.endsWith(".md")) return null;
  let abs;
  if (p.startsWith("docs/")) abs = resolve(ROOT, p);
  else if (p.startsWith("/")) abs = resolve(ROOT, "." + p);
  else abs = resolve(ROOT, dirname(fromRel), p);
  return abs;
}

// ---- build inbound maps (total + live-only) ----
const inbound = new Map();     // absDoc -> total inbound count
const inboundLive = new Map(); // absDoc -> inbound from LIVE referrers only
for (const d of docsSet) { inbound.set(d, 0); inboundLive.set(d, 0); }

for (const ref of referrers) {
  let src;
  try { src = readFileSync(resolve(ROOT, ref), "utf8"); } catch { continue; }
  const live = isLiveReferrer(ref);
  const seen = new Set();
  for (const cand of candidatesFrom(src)) {
    const abs = resolveCand(cand, ref);
    if (!abs || !docsSet.has(abs) || abs === resolve(ROOT, ref)) continue;
    if (seen.has(abs)) continue;          // one referrer counts once per target
    seen.add(abs);
    inbound.set(abs, inbound.get(abs) + 1);
    if (live) inboundLive.set(abs, inboundLive.get(abs) + 1);
  }
}

// ---- classify ----
const NON_TRANCHE_AREAS = ["docs/colors/", "docs/frontend-design/", "docs/instructions/",
  "docs/precepts/"];

function bucketOf(rel) {
  if (/^docs\/tranches\/([A-Z]+)\//.test(rel)) {
    const t = rel.match(/^docs\/tranches\/([A-Z]+)\//)[1];
    return t === "V" ? "campaign-V" : `tranche-${t}`;
  }
  for (const a of NON_TRANCHE_AREAS) if (rel.startsWith(a)) return a;
  if (/^docs\/[^/]+\.md$/.test(rel)) return "docs-root";
  return "docs-other";
}

const rows = docsMd.map((f) => {
  const abs = resolve(ROOT, f);
  return { file: f, bucket: bucketOf(f), inbound: inbound.get(abs), inboundLive: inboundLive.get(abs),
    record: isClosedTrancheRecord(abs) };
});

// STALE CANDIDATES: non-record, non-current-campaign docs with 0 inbound from LIVE referrers
const staleCandidates = rows.filter((r) => !r.record && r.bucket !== "campaign-V" && r.inboundLive === 0);

// ---- non-md litter under docs/ ----
function litter() {
  const out = [];
  try {
    const all = execSync("find docs -type f \\( -name '.DS_Store' -o -name '*.log' -o -name 'Thumbs.db' -o -name '*.tmp' \\)",
      { cwd: ROOT, encoding: "utf8" }).split("\n").filter(Boolean);
    for (const f of all) out.push({ path: f, tracked: allSet.has(f) });
  } catch {}
  return out;
}
const lit = litter();

// ---- per-bucket footprint ----
const buckets = {};
for (const r of rows) {
  const b = buckets[r.bucket] || (buckets[r.bucket] = { files: 0, zeroInboundLive: 0, records: 0 });
  b.files++;
  if (r.inboundLive === 0) b.zeroInboundLive++;
  if (r.record) b.records++;
}

if (JSON_OUT) {
  console.log(JSON.stringify({ totalDocsMd: docsMd.length, buckets, staleCandidates, litter: lit }, null, 2));
} else {
  console.log(`=== DOCS LINKGRAPH (root ${ROOT}) ===`);
  console.log(`tracked docs/**/*.md : ${docsMd.length}   referrer corpus : ${referrers.length} tracked text files\n`);
  console.log("--- per-bucket footprint (files · zero-inbound-from-LIVE · is-record) ---");
  for (const [b, v] of Object.entries(buckets).sort((a, c) => c[1].files - a[1].files))
    console.log(`  ${b.padEnd(24)} files=${String(v.files).padStart(4)}  0inboundLive=${String(v.zeroInboundLive).padStart(4)}  record=${v.records ? "yes" : "no"}`);
  console.log(`\n--- non-md litter under docs/ (SWEEP) : ${lit.length} ---`);
  for (const l of lit) console.log(`  ${l.tracked ? "[tracked]" : "[untracked]"} ${l.path}`);
  console.log(`\n--- STALE CANDIDATES (non-record + 0 inbound from LIVE) : ${staleCandidates.length} ---`);
  for (const r of staleCandidates.sort((a, c) => a.bucket.localeCompare(c.bucket)))
    console.log(`  [${r.bucket}] ${r.file}   (inboundTotal=${r.inbound})`);
  console.log(`\nSUMMARY: ${staleCandidates.length} stale non-record doc candidate(s) · ${lit.length} litter file(s) · ` +
    `${rows.filter((r) => r.record).length} closed-tranche RECORD docs KEPT by convention.`);
}
