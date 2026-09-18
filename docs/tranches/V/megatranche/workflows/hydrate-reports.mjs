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
//
// `reportPath` is a string a seat wrote, not a path this script validated. Three payloads appended
// prose to it — for example `…/PaletteCard/challenge-L-library.md (pass 2; the prior seat's pass-1
// report is preserved verbatim at …)` — and an earlier run took the whole string as a path: the
// hydrate branch below called mkdirSync/writeFileSync on it and MATERIALIZED a file whose name is a
// sentence. Every run since has seen that file, reported EXISTS-ORIGINAL, and carried a phantom row
// beside the real one — three of them, all inside the ledger's non-roster remainder. The annotation
// is split off at this seam, before anything is keyed, hashed or written, and is carried as a
// DANGLING-RECEIPT note so the defect is printed instead of re-materialized.
// (X-W0.c / CC-025 / fold BoundsDelta 3, 2026-09-17.)
const splitAnnotatedReportPath = (raw) => {
  const m = /^(.*?\.md)(\s+\S[\s\S]*)$/.exec(String(raw).trim());
  return m ? { path: m[1], annotation: m[2].trim() } : { path: String(raw).trim(), annotation: null };
};

const byPath = new Map();
const annotations = new Map(); // repo-relative canonical path → the prose a seat appended to it
for (const f of readdirSync(harvestDir).filter((f) => f.endsWith('.json'))) {
  const d = JSON.parse(readFileSync(join(harvestDir, f), 'utf8'));
  for (const r of d.results || []) {
    const res = r.result;
    if (!res || typeof res !== 'object' || !res.reportPath) continue;
    if (!/audit\/components\/[^/]+\/challenge-[DLC]-/.test(res.reportPath)) continue;
    const { path: cleanPath, annotation } = splitAnnotatedReportPath(res.reportPath);
    const rel = cleanPath.replace(/^.*?(docs\/tranches\/V\/megatranche\/)/, '$1');
    if (annotation) annotations.set(rel, { annotation, harvestFile: f, agentId: r.agentId });
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
const rosterSlugs = new Set();
for (const f of readdirSync(rosterDir).filter((f) => f.endsWith('.json'))) {
  const roster = JSON.parse(readFileSync(join(rosterDir, f), 'utf8'));
  for (const { slug } of roster.components || []) {
    rosterSlugs.add(slug);
    for (const filename of Object.values(AXIS_FILE)) {
      canonicalPaths.add(join(MEGA, 'audit/components', slug, filename));
    }
  }
}

// ---- THE ROSTER PREDICATE (G-D) -------------------------------------------------------------
// This ledger and COMPLETENESS-LEDGER.md count different sets, and until now only one of them said
// so: 264 there, 286 here. Stated once, mechanically, so the two can never diverge silently again —
//
//   A row is CANONICAL-ROSTER iff its path is `audit/components/<slug>/<exact canonical axis
//   filename>` with <slug> on one of the band rosters in `workflows/args/*.json`. That set is
//   `canonicalPaths` above, BY CONSTRUCTION — 88 slugs x 3 axes = 264 members, the same 264 the
//   completeness validator measures saturation over.
//
// Everything else this ledger carries is NON-ROSTER. A non-roster row is not noise and is not
// dropped: it is a real witnessed return that is not one of the 264 — overwhelmingly a later round
// of a canonical axis (`-r2`, `-r3`, `-r4`, `-pass2`). The distinction is load-bearing because a
// ledger that counts a round's FILE cannot express whether that round was CONSUMED (fold W0.10).
const ROUND_VARIANT = /\/challenge-([DLC])-([a-z]+)-(r\d+|pass-?\d+)\.md$/;
const nonRosterReason = (rel) => {
  if (canonicalPaths.has(rel)) return null;
  const m = ROUND_VARIANT.exec(rel);
  if (m) return `round-variant ${m[3]}`;
  const slug = /audit\/components\/([^/]+)\//.exec(rel)?.[1];
  if (slug && !rosterSlugs.has(slug)) return 'slug not on any band roster';
  return 'non-canonical axis filename';
};

// Later rounds, keyed to the canonical axis they re-run. This is the supersession column: a
// canonical row whose provenance is REPORT-AUTHORED but which carries a witnessed r2 beside it is
// a different claim from one that carries nothing, and the ledger now prints the difference.
const laterRounds = new Map();
for (const rel of byPath.keys()) {
  const m = ROUND_VARIANT.exec(rel);
  if (!m) continue;
  const canon = rel.replace(ROUND_VARIANT, '/challenge-$1-$2.md');
  if (!canonicalPaths.has(canon)) continue;
  const list = laterRounds.get(canon) ?? [];
  if (!list.includes(m[3])) list.push(m[3]);
  laterRounds.set(canon, list.sort());
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

// ---- the three integers, over the roster the predicate selects (G-D / HG-6) ------------------
// Counted from the rows themselves, never declared: change the predicate and these move visibly.
const rosterRows = rows.filter((r) => canonicalPaths.has(r.rel));
const nonRosterRows = rows.filter((r) => !canonicalPaths.has(r.rel));
const nOf = (set, status) => set.filter((r) => r.status === status).length;
const R_EXISTS = nOf(rosterRows, 'EXISTS-ORIGINAL');
const R_HYDRATED = nOf(rosterRows, 'HYDRATED');
const R_UNWITNESSED = nOf(rosterRows, 'UNWITNESSED-DIRECT');
const R_AUTHORED = nOf(rosterRows, 'REPORT-AUTHORED');
const R_UNPARSEABLE = nOf(rosterRows, 'UNPARSEABLE-PAYLOAD');
const R_CHALLENGED = R_EXISTS + R_HYDRATED + R_UNWITNESSED;

const rosterCell = (r) => (canonicalPaths.has(r.rel)
  ? 'CANONICAL-ROSTER'
  : `NON-ROSTER · ${nonRosterReason(r.rel)}`);
const roundCell = (r) => {
  const variant = ROUND_VARIANT.exec(r.rel);
  if (variant) return variant[3];
  const later = laterRounds.get(r.rel);
  return later?.length ? `r1 · re-run at ${later.join(' ')} (witnessed)` : 'r1';
};

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
  '## The roster predicate (G-D) — which rows are the 264',
  '',
  'This ledger and `COMPLETENESS-LEDGER.md` count different sets. **The predicate, stated once:** a',
  'row is **CANONICAL-ROSTER** iff its path is `audit/components/<slug>/<exact canonical axis',
  'filename>` with `<slug>` on a band roster in `workflows/args/*.json` — 88 slugs x 3 axes = 264',
  'members, the same 264 the completeness validator measures saturation over. Every other row is',
  '**NON-ROSTER**: a real witnessed return that is not one of the 264, almost always a later round',
  'of a canonical axis. Non-roster rows are printed, never dropped — a ledger that counts a round\'s',
  'FILE cannot otherwise say whether the round was consumed.',
  '',
  `**Reconciliation.** ${rows.length} ledger rows = **${rosterRows.length} canonical roster** + `
    + `**${nonRosterRows.length} non-roster**. The two ledgers' totals now differ *visibly*.`,
  '',
  '**The three integers, over the canonical roster only** (so UNWITNESSED-DIRECT cannot hide inside',
  'a CHALLENGED aggregate):',
  '',
  '| integer | roster count | meaning |',
  '|---|---:|---|',
  `| EXISTS-ORIGINAL | **${R_EXISTS}** | a dispatched seat's own canonical file survived |`,
  `| HYDRATED | **${R_HYDRATED}** | materialized from a dispatched seat's returned payload |`,
  `| UNWITNESSED-DIRECT | **${R_UNWITNESSED}** | file present, no payload, no closure authorship — provenance is only that it is there |`,
  `| REPORT-AUTHORED | **${R_AUTHORED}** | no challenge seat ran; authored by the 2026-08-03 closure pass |`,
  `| UNPARSEABLE-PAYLOAD | **${R_UNPARSEABLE}** | a payload returned that could not be rendered |`,
  `| **CHALLENGED** | **${R_CHALLENGED}** | EXISTS-ORIGINAL + HYDRATED + UNWITNESSED-DIRECT |`,
  `| **roster total** | **${rosterRows.length}** | CHALLENGED ${R_CHALLENGED} + REPORT-AUTHORED ${R_AUTHORED} |`,
  '',
  `**${rosterRows.length} canonical axes = ${R_CHALLENGED} CHALLENGED + ${R_AUTHORED} REPORT-AUTHORED.** `
    + 'The saturation figure is NOT challenge coverage and may not be printed as though it were.',
  '',
  ...(annotations.size
    ? [
      '## Dangling receipts — seat-authored paths that carried prose',
      '',
      `**${annotations.size}** harvested payloads wrote a \`reportPath\` with an English annotation`,
      'appended after the filename. An earlier run of this script materialized files at those',
      'strings, so the tree still holds them and they still grep as canonical reports. The',
      'annotation is now split off before the path is keyed, hashed or written; the row below names',
      'the real path, the prose, and the harvest it came from. The materialized artefacts are a',
      'tracked residue this generator no longer produces and does not delete.',
      '',
      '| canonical path | source harvest | appended prose |',
      '|---|---|---|',
      ...[...annotations.entries()].sort().map(([rel, a]) =>
        `| ${relative(MEGA, join(REPO, rel))} | ${a.harvestFile} | ${a.annotation.replace(/\|/g, '\\|').slice(0, 220)} |`),
      '',
    ]
    : []),
  'OM-14/15/16 are outside this component-challenge hydration ledger. Their current completion',
  'state is tracked in STATE.md and their own audit directories, never inferred from this table.',
  '',
  '| canonical path | status | sha256 | roster | round | source harvest | payloads |',
  '|---|---|---|---|---|---|---|',
  ...rows.map((r) => `| ${relative(MEGA, join(REPO, r.rel))} | ${r.status} | \`${r.hash}\` | ${rosterCell(r)} | ${roundCell(r)} | ${r.src} | ${r.count} |`),
  '',
];
writeFileSync(join(MEGA, 'registry/HYDRATION-LEDGER.md'), lines.join('\n'));
console.log(`payload paths: ${byPath.size} · original: ${present} · REPORT-AUTHORED: ${authored} · UNWITNESSED-DIRECT: ${unwitnessed} · HYDRATED: ${hydrated} · unparseable: ${unparseable}`);
console.log(`roster predicate: ${rows.length} rows = ${rosterRows.length} canonical roster + ${nonRosterRows.length} non-roster`);
console.log(`three integers (roster): EXISTS-ORIGINAL ${R_EXISTS} · UNWITNESSED-DIRECT ${R_UNWITNESSED} · REPORT-AUTHORED ${R_AUTHORED}`
  + ` → ${rosterRows.length} = ${R_CHALLENGED} CHALLENGED + ${R_AUTHORED} REPORT-AUTHORED`);
console.log(`dangling receipts (annotated reportPath, stripped): ${annotations.size}`);
console.log(`ledger: ${join(MEGA, 'registry/HYDRATION-LEDGER.md')}`);
