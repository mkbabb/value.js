#!/usr/bin/env node
// L-15.8 — the completeness validator. Run after EVERY workflow completion/failure/harvest.
// Compares, per band roster: claimed completion (run records) vs harvested returns vs
// on-disk challenge reports vs adjudicated apotheoses. NO incomplete work escapes unlisted.
// Exit 1 when incomplete work exists that no RUNNING/QUEUED resume covers.

import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { createHash } from 'node:crypto';

const MEGA = 'docs/tranches/V/megatranche';
const SESSION_WF = '/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/workflows';

// band → run ID (the durable spine; STATE.md mirrors this)
const BANDS = {
  'demo-shell': 'wf_e28d617f-9eb',
  'demo-workbenches': 'wf_6edda4a1-192',
  palettes: 'wf_22b7a7b7-97b',
  core: 'wf_66b1fcba-daa',
  scenes: 'wf_dee4c83a-ec2',
  picker: 'wf_3c8798e8-23e',
  // Seven nested SFCs were omitted from the first six rosters. Owner law requires
  // one D/L/C workflow per component, so they are an explicit queued catch-up band.
  'frontend-omissions': 'UNASSIGNED-FRONTEND-OMISSIONS',
};

// adjudicated apotheosis file → roster slug(s) it covers
const ADJUDICATED = {
  'App.md': ['App'],
  'ColorSpaceSelector.md': ['ColorSpaceSelector'],
  'ConfigSliderPane.md': ['ConfigSliderPane'],
  'Markdown.md': ['Markdown'],
  'AdminUsersPanel.md': ['AdminUsersPanel'],
  'GenerateControls.md': ['wb-generate-controls'],
  'GradientStopEditor.md': ['wb-gradient-stopeditor'],
  'ColorPicker.md': ['picker-colorpicker'],
  'ColorInput.md': ['shell-dock-colorinput'],
  'Dock.md': ['shell-dock-dock'],
};

const AXES = ['D', 'L', 'C'];
const AXIS_FILE = {
  D: 'challenge-D-design.md',
  L: 'challenge-L-library.md',
  C: 'challenge-C-implementation.md',
};
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

// ---- gather -------------------------------------------------------------
const rosters = {};
for (const band of Object.keys(BANDS)) {
  const p = join(MEGA, 'workflows/args', `${band}.json`);
  if (!existsSync(p)) { console.error(`ROSTER MISSING: ${p}`); process.exit(2); }
  rosters[band] = JSON.parse(readFileSync(p, 'utf8')).components.map((c) => c.slug);
}

// Hydration truth: exact canonical relative path → recorded full SHA-256.
const hydrationHashes = new Map();
const hydrationLedger = join(MEGA, 'registry/HYDRATION-LEDGER.md');
if (existsSync(hydrationLedger)) {
  for (const line of readFileSync(hydrationLedger, 'utf8').split('\n')) {
    const match = /^\| (audit\/components\/[^|]+?) \| [^|]+ \| `([0-9a-f]{64})`/.exec(line);
    if (match) hydrationHashes.set(match[1], match[2]);
  }
}

// Exact disk and durability truth. Annotated/pass/prior filenames are evidence history,
// not canonical seats. A banked seat requires exact path + ledger row + current hash.
const disk = {};
const banked = {};
const durabilityFailure = {};
for (const slugs of Object.values(rosters)) {
  for (const slug of slugs) {
    disk[slug] ??= new Set();
    banked[slug] ??= new Set();
    durabilityFailure[slug] ??= {};
    for (const axis of AXES) {
      const rel = `audit/components/${slug}/${AXIS_FILE[axis]}`;
      const abs = join(MEGA, rel);
      if (!existsSync(abs)) {
        durabilityFailure[slug][axis] = 'ABSENT';
        continue;
      }
      disk[slug].add(axis);
      const expected = hydrationHashes.get(rel);
      if (!expected) {
        durabilityFailure[slug][axis] = 'NO-LEDGER';
        continue;
      }
      if (sha256(readFileSync(abs)) !== expected) {
        durabilityFailure[slug][axis] = 'HASH-DRIFT';
        continue;
      }
      banked[slug].add(axis);
    }
  }
}

// harvest truth: slug → set of axes that RETURNED (parsed from reportPath)
const harvest = {};
const harvestMeta = {};
const harvestDir = join(MEGA, 'registry/harvest');
for (const f of readdirSync(harvestDir).filter((f) => f.endsWith('.json'))) {
  const d = JSON.parse(readFileSync(join(harvestDir, f), 'utf8'));
  const meta = { file: f, resultCount: d.resultCount ?? d.results?.length };
  // Descriptive harvest filenames (for example `area-core.json`) are not run IDs.
  // Index every durable identity carried by the payload so non-band rows do not
  // report a false NOT HARVESTED merely because the file has a human name.
  for (const key of new Set([d.runId, d.workflow, basename(f, '.json')].filter(Boolean))) {
    harvestMeta[key] = meta;
  }
  for (const r of d.results || []) {
    const res = r.result;
    if (!res || typeof res !== 'object' || !res.reportPath) continue;
    const m = /audit\/components\/([^/]+)\/(challenge|jury)-([DLC\d])/.exec(res.reportPath);
    if (!m) continue;
    const [, slug, kind, axis] = m;
    harvest[slug] ??= { challenges: new Set(), juries: 0 };
    if (kind === 'challenge') harvest[slug].challenges.add(axis);
    else harvest[slug].juries++;
  }
}

// adjudicated truth
const adjudicated = new Set();
const adjDir = join(MEGA, 'registry/adjudicated');
for (const f of readdirSync(adjDir)) {
  for (const slug of ADJUDICATED[f] || []) adjudicated.add(slug);
}

// run records: run ID → {status, result}
const runs = {};
if (existsSync(SESSION_WF)) {
  for (const f of readdirSync(SESSION_WF).filter((f) => f.endsWith('.json'))) {
    try {
      const d = JSON.parse(readFileSync(join(SESSION_WF, f), 'utf8'));
      runs[d.runId || basename(f, '.json')] = { status: d.status, result: d.result, agentCount: d.agentCount };
    } catch { /* unreadable record — surfaced below as UNKNOWN */ }
  }
}

// Coverage is derived from the durable workflow record, not a hand-maintained declaration.
// In particular, a terminal `completed` record whose result names fewer components than it
// requested is an interrupted/capacity-blocked resume, never an ACTIVE cover. The root-session
// quota receipt identifies the present instances; the record is sufficient to keep this
// validator honest if that receipt is unavailable in a later session.
const hasIncompleteResult = (run) => {
  const result = run?.result;
  if (!result || typeof result !== 'object') return false;
  const completed = Number(result.componentsRun);
  const requested = Number(result.componentsRequested);
  return (
    (Number.isFinite(completed) && Number.isFinite(requested) && completed < requested)
    || (Array.isArray(result.incomplete) && result.incomplete.length > 0)
  );
};

const coverageFor = (runId, run) => {
  if (runId === 'UNASSIGNED-FRONTEND-OMISSIONS') {
    return { status: 'QUEUED', covered: true, detail: 'no run ID assigned' };
  }
  if (!run) return { status: 'UNCOVERED', covered: false, detail: 'no workflow record' };
  if (run.status === 'running') {
    return { status: 'ACTIVE', covered: true, detail: 'workflow record is running' };
  }
  if (run.status === 'completed' && hasIncompleteResult(run)) {
    return {
      status: 'BLOCKED-ON-CAPACITY',
      covered: false,
      detail: 'terminal record returned an incomplete component result',
    };
  }
  return {
    status: 'UNCOVERED',
    covered: false,
    detail: `workflow record is ${run.status ?? 'unknown'}`,
  };
};

// ---- adjudicate ---------------------------------------------------------
const lines = [];
const incomplete = []; // {band, slug, missing, coveredBy}
const bandCoverage = Object.entries(rosters).map(([band, slugs]) => {
  const presentAxes = slugs.reduce((n, slug) => n + (disk[slug]?.size ?? 0), 0);
  const bankedAxes = slugs.reduce((n, slug) => n + (banked[slug]?.size ?? 0), 0);
  const completeComponents = slugs.filter((slug) =>
    AXES.every((axis) => banked[slug]?.has(axis)),
  ).length;
  return {
    band,
    components: slugs.length,
    completeComponents,
    presentAxes,
    bankedAxes,
    totalAxes: slugs.length * AXES.length,
  };
});
const componentTotal = bandCoverage.reduce((n, row) => n + row.components, 0);
const completeComponentTotal = bandCoverage.reduce((n, row) => n + row.completeComponents, 0);
const axisTotal = bandCoverage.reduce((n, row) => n + row.totalAxes, 0);
const presentAxisTotal = bandCoverage.reduce((n, row) => n + row.presentAxes, 0);
const bankedAxisTotal = bandCoverage.reduce((n, row) => n + row.bankedAxes, 0);
const missingAxisTotal = axisTotal - bankedAxisTotal;
lines.push('# COMPLETENESS LEDGER — NO incomplete work (L-15.8)');
lines.push('');
lines.push(`Generated by \`workflows/validate-completeness.mjs\`. Re-run after every workflow event.`);
lines.push('');
lines.push('Status meanings: **ADJUDICATED** apotheosis exists and all three exact challenge files are hash-banked · **BANKED** exact files exist, have ledger rows, and their full current SHA-256 values match · **UNBANKED** means ABSENT, NO-LEDGER, or HASH-DRIFT. A run record saying "completed" and a merely present file are claims; exact path + current hash are the durability truth.');
lines.push('');
lines.push('## Coverage summary');
lines.push('');
lines.push('| band | complete components | exact files present | hash-banked axes |');
lines.push('|---|---:|---:|---:|');
for (const row of bandCoverage) {
  lines.push(`| ${row.band} | ${row.completeComponents}/${row.components} | ${row.presentAxes}/${row.totalAxes} | ${row.bankedAxes}/${row.totalAxes} |`);
}
lines.push(`| **total** | **${completeComponentTotal}/${componentTotal}** | **${presentAxisTotal}/${axisTotal}** | **${bankedAxisTotal}/${axisTotal}** |`);
lines.push('');
lines.push(`Challenge-axis file presence is **${presentAxisTotal}/${axisTotal} (${(presentAxisTotal / axisTotal * 100).toFixed(1)}%)**; durable saturation is **${bankedAxisTotal}/${axisTotal} (${(bankedAxisTotal / axisTotal * 100).toFixed(1)}%)**. Component completion is **${completeComponentTotal}/${componentTotal} (${(completeComponentTotal / componentTotal * 100).toFixed(1)}%)**. These measures are not interchangeable.`);
lines.push('');

for (const [band, runId] of Object.entries(BANDS)) {
  const run = runs[runId];
  const coverage = coverageFor(runId, run);
  const runState = run
    ? run.status
    : 'no record';
  const claimed = run?.result && typeof run.result === 'object'
    ? `${run.result.componentsRun}/${run.result.componentsRequested} claimed, failures: ${JSON.stringify(run.result.failures ?? [])}`
    : '—';
  lines.push(`## ${band} · \`${runId}\` · record: ${runState} · coverage: ${coverage.status} (${coverage.detail}) · ${claimed}`);
  lines.push('');
  lines.push('| component | exact files | hash-banked | harvest axes | status |');
  lines.push('|---|---|---|---|---|');
  for (const slug of rosters[band]) {
    const dAxes = disk[slug] ?? new Set();
    const bAxes = banked[slug] ?? new Set();
    const hAxes = harvest[slug]?.challenges ?? new Set();
    const missing = AXES.filter((a) => !bAxes.has(a));
    let status;
    if (adjudicated.has(slug) && missing.length === 0) status = '**ADJUDICATED**';
    else if (missing.length === 0) status = 'BANKED';
    else if (bAxes.size > 0 || dAxes.size > 0) status = `**UNBANKED — ${missing.map((axis) => `${axis}:${durabilityFailure[slug]?.[axis]}`).join(' · ')}**`;
    else status = '**NOT-STARTED**';
    if (missing.length > 0) {
      incomplete.push({ band, slug, missing, runId, runState, coverage });
    }
    lines.push(`| ${slug} | ${[...dAxes].sort().join('') || '—'} | ${[...bAxes].sort().join('') || '—'} | ${[...hAxes].sort().join('') || '—'} | ${status} |`);
  }
  lines.push('');
}

// Runs deliberately stopped with a written disposition. Each entry documents WHY the kill is
// clean — an entry here without a reason comment is itself a violation. Not a dumping ground:
// a wall-killed or errored run NEVER goes here; it gets a resume.
const STOPPED_WITH_DISPOSITION = {
  // 2026-08-03: redundant frontend-omissions dispatch — launched per the resume handoff step 6
  // before discovering the interim sessions had already run the catch-up (all 7 rosters
  // 3-axis hash-banked). TaskStopped seconds after launch; journal harvested EMPTY (0 results);
  // all 264 hashes re-verified intact post-stop. Roster coverage owed by this run: none.
  'wf_bb1c807c-f47': 'redundant omission dispatch, stopped pre-write, 0 results, hashes intact',
};

// non-band workflows: every run record must be completed + harvested
lines.push('## Non-band workflows (record vs harvest)');
lines.push('');
lines.push('| run | record status | agents | harvested results |');
lines.push('|---|---|---|---|');
const bandIds = new Set(Object.values(BANDS));
for (const [rid, run] of Object.entries(runs)) {
  if (bandIds.has(rid)) continue;
  const h = harvestMeta[rid];
  const disposition = STOPPED_WITH_DISPOSITION[rid];
  lines.push(`| \`${rid}\` | ${run.status}${disposition ? ` — STOPPED-WITH-DISPOSITION: ${disposition}` : ''} | ${run.agentCount ?? '?'} | ${h ? h.resultCount : disposition ? 'empty (dispositioned)' : '**NOT HARVESTED**'} |`);
  if (run.status !== 'completed' && !disposition) incomplete.push({ band: '(non-band)', slug: rid, missing: ['run incomplete'], runId: rid, runState: run.status });
}
lines.push('');

// verdict
lines.push('## VERDICT');
lines.push('');
const uncovered = incomplete.filter((i) => !i.coverage?.covered);
if (incomplete.length === 0) {
  lines.push('**GREEN — zero incomplete components.** Every roster component has all three exact challenge axes hash-banked.');
} else {
  const nActive = incomplete.filter((i) => i.coverage?.status === 'ACTIVE').length;
  const nQueued = incomplete.filter((i) => i.coverage?.status === 'QUEUED').length;
  const nCapacityBlocked = incomplete.filter((i) => i.coverage?.status === 'BLOCKED-ON-CAPACITY').length;
  lines.push(`**${incomplete.length} incomplete component rows · ${missingAxisTotal} unbanked canonical axes · ${presentAxisTotal}/${axisTotal} exact files present · ${bankedAxisTotal}/${axisTotal} hash-banked.** ${nActive} covered by an ACTIVE resume · ${nQueued} covered by a QUEUED resume (cap-4 sequencing) · ${nCapacityBlocked} **BLOCKED-ON-CAPACITY** · **${uncovered.length} UNCOVERED** (violations).`);
  lines.push('');
  lines.push('A run record saying "completed" and a merely present file do not clear a row. Bands re-open until every roster row has three exact, ledgered, current-hash challenge axes.');
  lines.push('');
  for (const i of incomplete) {
    const cov = i.coverage?.covered
      ? `${i.coverage.status} resume`
      : i.coverage?.status === 'BLOCKED-ON-CAPACITY'
        ? `**BLOCKED-ON-CAPACITY — assign an available executor before resuming**`
        : '**UNCOVERED — queue a resume NOW**';
    lines.push(`- ${i.band} / **${i.slug}** — missing ${i.missing.join('/')} (\`${i.runId}\` · ${i.runState}) — ${cov}`);
  }
}
lines.push('');

writeFileSync(join(MEGA, 'registry/COMPLETENESS-LEDGER.md'), lines.join('\n'));
console.log(lines.slice(lines.indexOf('## VERDICT')).join('\n'));
console.log(`\nwrote ${join(MEGA, 'registry/COMPLETENESS-LEDGER.md')}`);
process.exit(uncovered.length > 0 ? 1 : 0);
