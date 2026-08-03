#!/usr/bin/env node
// M-16 binding correction (AUDIT-HANDOFF §3): resumed workflows replay cached child payloads
// but not side-effect file writes, so a seat counts ONLY when its declared canonical path
// exists with the returned content materialized and hashed. This script hydrates every
// harvested challenge payload whose canonical file is missing, and writes the hash ledger.
// Rerun after every harvest. A rerun of a seat is justified only where NO payload exists.

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { createHash } from 'node:crypto';

const REPO = process.cwd();
const MEGA = 'docs/tranches/V/megatranche';
const harvestDir = join(MEGA, 'registry/harvest');
const rosterDir = join(MEGA, 'workflows/args');
const AXIS_FILE = {
  D: 'challenge-D-design.md',
  L: 'challenge-L-library.md',
  C: 'challenge-C-implementation.md',
};

// canonical challenge payloads keyed by repo-relative reportPath; later harvest order wins
const byPath = new Map();
for (const f of readdirSync(harvestDir).filter((f) => f.endsWith('.json'))) {
  const d = JSON.parse(readFileSync(join(harvestDir, f), 'utf8'));
  for (const r of d.results || []) {
    const res = r.result;
    if (!res || typeof res !== 'object' || !res.reportPath) continue;
    if (!/audit\/components\/[^/]+\/challenge-[DLC]-/.test(res.reportPath)) continue;
    const rel = res.reportPath.replace(/^.*?(docs\/tranches\/V\/megatranche\/)/, '$1');
    const prev = byPath.get(rel);
    byPath.set(rel, { payload: res, harvestFile: f, agentId: r.agentId, count: (prev?.count ?? 0) + 1 });
  }
}

const sha = (buf) => createHash('sha256').update(buf).digest('hex');

// ---- the 46 report-authored canonical files (provenance row 23) ---------------------------
// Derivation, so a later reader can regenerate this list rather than trust it:
//   coordination/VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-REPORTS-2026-08-03.sha256  — 48 rows
//   minus the two TagEditPopover reports the same pass only BYTE-PRESERVED:
//     audit/components/TagEditPopover/challenge-L-library.md
//     audit/components/TagEditPopover/challenge-C-implementation.md
//   = 46, matching the closure receipt's own
//     `closure.newCanonicalReports: 46` / `closure.preservedPriorCanonicalReports: 2`
//     (VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-2026-08-03.json).
//   The two preserved rows carry harvest payloads and therefore land EXISTS-ORIGINAL, not here.
//
// What membership MEANS. These files were AUTHORED by the 2026-08-03 frontend closure pass by
// reading source at a pinned coordinate. No challenge seat was dispatched and no payload was
// returned for any of them. They are a source-review findings ledger, never workflow challenge
// coverage — hence `REPORT-AUTHORED`. Everything else that exists without a payload is
// `UNWITNESSED-DIRECT`: its only provenance is that the file is there. (Provenance audit row 23,
// finding K-4, and blocker C-04 — which splits the axis denominator CHALLENGED 218 / AUTHORED 46.)
const CLOSURE_MANIFEST_46 = new Set([
  'audit/components/ActionFeedback/challenge-C-implementation.md',
  'audit/components/ActionFeedback/challenge-D-design.md',
  'audit/components/ActionFeedback/challenge-L-library.md',
  'audit/components/AdminListItem/challenge-C-implementation.md',
  'audit/components/AdminListItem/challenge-D-design.md',
  'audit/components/AdminListItem/challenge-L-library.md',
  'audit/components/AdminListSkeleton/challenge-C-implementation.md',
  'audit/components/AdminListSkeleton/challenge-D-design.md',
  'audit/components/AdminListSkeleton/challenge-L-library.md',
  'audit/components/PaginationBar/challenge-C-implementation.md',
  'audit/components/PaginationBar/challenge-D-design.md',
  'audit/components/PaginationBar/challenge-L-library.md',
  'audit/components/PaletteCardGrid/challenge-C-implementation.md',
  'audit/components/PaletteCardGrid/challenge-D-design.md',
  'audit/components/PaletteCardGrid/challenge-L-library.md',
  'audit/components/PaletteCardMeta/challenge-C-implementation.md',
  'audit/components/PaletteCardMeta/challenge-D-design.md',
  'audit/components/PaletteCardMeta/challenge-L-library.md',
  'audit/components/PaletteRenameInput/challenge-C-implementation.md',
  'audit/components/PaletteRenameInput/challenge-D-design.md',
  'audit/components/PaletteRenameInput/challenge-L-library.md',
  'audit/components/TagEditPopover/challenge-D-design.md',
  'audit/components/UserSortMenu/challenge-C-implementation.md',
  'audit/components/UserSortMenu/challenge-D-design.md',
  'audit/components/UserSortMenu/challenge-L-library.md',
  'audit/components/picker-colorcomponentdisplay/challenge-C-implementation.md',
  'audit/components/picker-colorcomponentdisplay/challenge-D-design.md',
  'audit/components/picker-colorcomponentdisplay/challenge-L-library.md',
  'audit/components/picker-componentsliders-consolerail/challenge-C-implementation.md',
  'audit/components/picker-componentsliders-consolerail/challenge-D-design.md',
  'audit/components/picker-componentsliders-consolerail/challenge-L-library.md',
  'audit/components/picker-debugeventlog/challenge-C-implementation.md',
  'audit/components/picker-debugeventlog/challenge-D-design.md',
  'audit/components/picker-debugeventlog/challenge-L-library.md',
  'audit/components/picker-pointerdebugoverlay/challenge-C-implementation.md',
  'audit/components/picker-pointerdebugoverlay/challenge-D-design.md',
  'audit/components/picker-pointerdebugoverlay/challenge-L-library.md',
  'audit/components/shell-dock-actiontoolbar/challenge-C-implementation.md',
  'audit/components/shell-dock-actiontoolbar/challenge-D-design.md',
  'audit/components/shell-dock-actiontoolbar/challenge-L-library.md',
  'audit/components/shell-dock-parseechoreadout/challenge-C-implementation.md',
  'audit/components/shell-dock-parseechoreadout/challenge-D-design.md',
  'audit/components/shell-dock-parseechoreadout/challenge-L-library.md',
  'audit/components/wb-gradient-pane/challenge-C-implementation.md',
  'audit/components/wb-gradient-pane/challenge-D-design.md',
  'audit/components/wb-gradient-pane/challenge-L-library.md',
]);
if (CLOSURE_MANIFEST_46.size !== 46) {
  throw new Error(`CLOSURE_MANIFEST_46 must hold exactly 46 paths, holds ${CLOSURE_MANIFEST_46.size}`);
}

// A report need not have a returned payload to be durable: exact canonical challenge files that
// survive a wall are independently bankable. Limit this to current roster paths so archival,
// annotated, and pass filenames can never enter the ledger through this route.
const canonicalPaths = new Set();
for (const f of readdirSync(rosterDir).filter((f) => f.endsWith('.json'))) {
  const roster = JSON.parse(readFileSync(join(rosterDir, f), 'utf8'));
  for (const { slug } of roster.components || []) {
    for (const filename of Object.values(AXIS_FILE)) {
      canonicalPaths.add(join(MEGA, 'audit/components', slug, filename));
    }
  }
}

const renderDefect = (d) => [
  `### ${d.id} — ${d.severity}`,
  '',
  d.defect,
  '',
  `- **Evidence:** ${d.evidence}`,
  `- **Mechanism:** ${d.mechanism}`,
  `- **Reproduction:** ${d.reproduction}`,
  `- **Proposed cure:** ${d.proposedCure}`,
].join('\n');

const rows = [];
let hydrated = 0, present = 0, authored = 0, unwitnessed = 0, unparseable = 0;
for (const [rel, { payload, harvestFile, agentId, count }] of [...byPath.entries()].sort()) {
  const abs = join(REPO, rel);
  if (existsSync(abs)) {
    rows.push({ rel, status: 'EXISTS-ORIGINAL', hash: sha(readFileSync(abs)), src: harvestFile, agentId, count });
    present++;
    continue;
  }
  const p = payload;
  if (!p.axis || !p.verdict) { rows.push({ rel, status: 'UNPARSEABLE-PAYLOAD', hash: '—', src: harvestFile, agentId, count }); unparseable++; continue; }
  const body = [
    `<!-- HYDRATED-FROM-PAYLOAD ${new Date().toISOString().slice(0, 10)} · harvest ${harvestFile} · agent ${agentId} -->`,
    `<!-- M-16 durability rule: the live seat wrote this file, the wall erased it, the returned payload`,
    `     is materialized here verbatim. Not a rerun. Payloads seen for this path: ${count}. -->`,
    '',
    `# ${p.axis}`,
    '',
    `## Model receipt`,
    '',
    p.modelObserved || 'UNRECORDED',
    '',
    `## Verdict: ${p.verdict}`,
    '',
    `**Strongest defect:** ${p.strongestDefect || '—'}`,
    '',
    `**Negative proof:** ${p.negativeProof || '—'}`,
    '',
    `## Defects (${(p.defects || []).length})`,
    '',
    (p.defects || []).map(renderDefect).join('\n\n'),
    '',
  ].join('\n');
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, body);
  rows.push({ rel, status: 'HYDRATED', hash: sha(body), src: harvestFile, agentId, count });
  hydrated++;
}

// Payload-less survivors. `EXISTS-DIRECT` used to cover both kinds and so let authored prose and
// wall-surviving seat output print the same word; row 23 splits them by provenance.
for (const rel of [...canonicalPaths].sort()) {
  if (byPath.has(rel) || !existsSync(join(REPO, rel))) continue;
  const megaRel = relative(MEGA, rel);
  const isAuthored = CLOSURE_MANIFEST_46.has(megaRel);
  rows.push({
    rel,
    status: isAuthored ? 'REPORT-AUTHORED' : 'UNWITNESSED-DIRECT',
    hash: sha(readFileSync(join(REPO, rel))),
    src: isAuthored ? 'closure-manifest-2026-08-03' : '—',
    agentId: '—',
    count: 0,
  });
  if (isAuthored) authored++; else unwitnessed++;
}

const lines = [
  '# HYDRATION LEDGER — canonical challenge reports (M-16 durability rule)',
  '',
  `Generated by \`workflows/hydrate-reports.mjs\`. A seat counts only when its canonical file`,
  `exists with a recorded hash. EXISTS-ORIGINAL = the live seat's own file survived.`,
  `HYDRATED = the file was materialized from the seat's returned payload (wall erased the write).`,
  `REPORT-AUTHORED = no challenge seat ran; the file was authored by the 2026-08-03 frontend`,
  `closure pass from pinned source (its 46 paths are the CLOSURE_MANIFEST_46 constant in`,
  `\`hydrate-reports.mjs\`, derived from the closure .sha256 manifest). Source-review findings —`,
  `NOT challenge coverage. UNWITNESSED-DIRECT = an exact current-roster canonical report exists`,
  `with no returned payload and no closure-manifest authorship; its only provenance is that the`,
  `file is there. Neither status may be counted as a witnessed seat return.`,
  '',
  `Totals: ${present} original · ${authored + unwitnessed} payload-less `
    + `(${authored} report-authored · ${unwitnessed} unwitnessed-direct) · ${hydrated} hydrated · `
    + `${unparseable} unparseable payloads · ${byPath.size} payload paths.`,
  '',
  'OM-14/15/16 are outside this component-challenge hydration ledger. Their current completion',
  'state is tracked in STATE.md and their own audit directories, never inferred from this table.',
  '',
  '| canonical path | status | sha256 | source harvest | payloads |',
  '|---|---|---|---|---|',
  ...rows.map((r) => `| ${relative(MEGA, join(REPO, r.rel))} | ${r.status} | \`${r.hash}\` | ${r.src} | ${r.count} |`),
  '',
];
writeFileSync(join(MEGA, 'registry/HYDRATION-LEDGER.md'), lines.join('\n'));
console.log(`payload paths: ${byPath.size} · original: ${present} · REPORT-AUTHORED: ${authored} · UNWITNESSED-DIRECT: ${unwitnessed} · HYDRATED: ${hydrated} · unparseable: ${unparseable}`);
console.log(`ledger: ${join(MEGA, 'registry/HYDRATION-LEDGER.md')}`);
