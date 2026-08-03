#!/usr/bin/env node
// L-15.8 — the completeness validator. Run after EVERY workflow completion/failure/harvest.
// Compares, per band roster: claimed completion (run records) vs harvested returns vs
// on-disk challenge reports vs adjudicated apotheoses. NO incomplete work escapes unlisted.
// Exit 1 when incomplete work exists that no RUNNING/QUEUED resume covers.
//
//   node docs/tranches/V/megatranche/workflows/validate-completeness.mjs
//   node docs/tranches/V/megatranche/workflows/validate-completeness.mjs --self-test
//
// `--self-test` injects synthetic violations in memory and requires the gate to reject each one.
// A gate that has never been shown to fail is not evidence that anything passed. See §SELF-TEST.

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
  // Seven nested SFCs were omitted from the first six rosters. Owner law requires one D/L/C
  // workflow per component, so they were an explicit catch-up band. `UNASSIGNED-FRONTEND-OMISSIONS`
  // is a DOCUMENTED PLACEHOLDER for "no workflow record was ever assigned to this band" and
  // nothing more. It buys the band NO coverage special-case: its rows are counted, hashed, and
  // adjudicated exactly like every other band's, and any unbanked axis here is UNCOVERED and
  // exits 1 like anywhere else. (It previously short-circuited `coverageFor` to covered:true,
  // which made 21 axes with no run record, no run ID, and no harvested payload structurally
  // incapable of failing — provenance-audit row 22 / tooling §1d.)
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

// Completed runs whose harvest is SHORT of their seat count and whose shortfall is accounted for
// in writing elsewhere. This is NOT the old hand-declared `ACTIVE` escape hatch and NOT a second
// STOPPED_WITH_DISPOSITION (that mechanism is for stopped runs only and is untouched above):
//
//   * every entry PINS the exact (agents, harvested) pair it was written against. If either
//     number drifts — a re-harvest recovers a seat, a new seat is dispatched, a result is lost —
//     the entry no longer matches and the row fails as STALE-HARVEST-DISPOSITION. A disposition
//     can therefore only ever excuse the one shortfall it was written for, never a later one;
//   * `where` must cite the document that accounts for the missing seats, by name.
//
// A shortfall with no written accounting has no entry and fails. That is the intended failure.
const HARVEST_DISPOSITION = {
  // M-14 PHASE X excavation. 15 seats dispatched, 14 payloads returned: the contrivance+canon
  // seat's RETURN died on the wall while BOTH of its files landed complete on disk (31KB + 17KB,
  // closings verified) — done-on-disk per L-15.6, explicitly NOT re-run.
  'wf_a6f71311-4e5': { agents: 15, harvested: 14, where: 'STATE.md — "PHASE X excavation (M-14) · 15/15 ON DISK"' },
  // M-9 parser band ground study. 8 seats, 3 payloads: the ground study banked; the five candidate
  // seats were SUPERSEDED by the trifold parser run wf_6e1e7c6f-7af (3/3, M-9 DELIVERED,
  // apotheosis registry/adjudicated/parser-band.md). Superseded work is not owed twice.
  'wf_c88c8125-52c': { agents: 8, harvested: 3, where: 'STATE.md — "parser band (M-9) ground · 3/8 HARVESTED … superseded by the trifold"' },
};

// ---- gather -------------------------------------------------------------
// `inject` is the self-test seam and nothing else. Normal runs pass nothing, so every value below
// comes from the tree. `absent` simulates a vanished file; `rehash` simulates ledger/byte drift by
// substituting a ledgered hash — the real sha256 comparison then runs against the real bytes.
function gather(inject = {}) {
  const absent = inject.absent ?? new Set();
  const rehash = inject.rehash ?? new Map();

  const rosters = {};
  for (const band of Object.keys(BANDS)) {
    const p = join(MEGA, 'workflows/args', `${band}.json`);
    if (!existsSync(p)) { console.error(`ROSTER MISSING: ${p}`); process.exit(2); }
    rosters[band] = JSON.parse(readFileSync(p, 'utf8')).components.map((c) => c.slug);
  }

  // Hydration truth: exact canonical relative path → recorded full SHA-256.
  // The status word is column 2 and is matched generically (`[^|]+`), so the ledger's status
  // vocabulary — EXISTS-ORIGINAL · HYDRATED · REPORT-AUTHORED · UNWITNESSED-DIRECT ·
  // UNPARSEABLE-PAYLOAD — can be renamed by hydrate-reports.mjs without breaking this parse.
  // What binds here is path + full 64-hex hash. Status carries provenance, never durability.
  const hydrationHashes = new Map();
  const hydrationLedger = join(MEGA, 'registry/HYDRATION-LEDGER.md');
  if (existsSync(hydrationLedger)) {
    for (const line of readFileSync(hydrationLedger, 'utf8').split('\n')) {
      const match = /^\| (audit\/components\/[^|]+?) \| [^|]+ \| `([0-9a-f]{64})`/.exec(line);
      if (match) hydrationHashes.set(match[1], match[2]);
    }
  }
  for (const [rel, hash] of rehash) hydrationHashes.set(rel, hash);

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
        if (absent.has(rel) || !existsSync(abs)) {
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

  return {
    rosters, disk, banked, durabilityFailure, harvest, harvestMeta, adjudicated, runs,
    // STOPPED_WITH_DISPOSITION is read straight from the module constant by `nonBandVerdict` and
    // is deliberately NOT routed through state — that mechanism stays exactly as documented.
    // HARVEST_DISPOSITION is cloned per gather so a self-test case can drift the live counts
    // out from under a pinned entry without mutating the constant.
    harvestDisposition: structuredClone(HARVEST_DISPOSITION),
  };
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

// No band gets a magic-string exemption. A band with no workflow record is UNCOVERED, exactly
// like a band whose record died — the only thing that clears its rows is hash-banked axes.
const coverageFor = (runId, run) => {
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

// The non-band law, stated by the section header since it was written and now enforced:
// every run record must be completed AND harvested, with harvested results accounting for
// every seat the record says it dispatched.
function nonBandVerdict(rid, run, harvestMeta, harvestDisposition) {
  const stopped = STOPPED_WITH_DISPOSITION[rid];
  if (stopped) {
    return { note: ` — STOPPED-WITH-DISPOSITION: ${stopped}`, cell: 'empty (dispositioned)', violation: null };
  }
  if (run.status !== 'completed') {
    return { note: '', cell: '**RECORD NOT TERMINAL**', violation: 'run incomplete' };
  }

  const agents = Number(run.agentCount);
  const h = harvestMeta[rid];
  const harvested = h ? Number(h.resultCount) : null;

  // A completed run that dispatched zero seats owes zero results. Mechanically vacuous, not
  // declared: the record's own agentCount is the whole basis, so this cannot excuse lost work.
  if (agents === 0 && harvested === null) {
    return { note: '', cell: 'n/a — 0 seats dispatched', violation: null };
  }

  const shortfall = harvested === null
    ? 'completed but NOT HARVESTED'
    : (Number.isFinite(agents) && Number.isFinite(harvested) && harvested !== agents)
      ? `harvest short of seats — ${agents} agents, ${harvested} results`
      : null;
  if (!shortfall) return { note: '', cell: String(harvested), violation: null };

  const d = harvestDisposition[rid];
  if (d && d.agents === agents && d.harvested === harvested) {
    return {
      note: ` — HARVEST-DISPOSITION: ${d.where}`,
      cell: `${harvested} of ${agents} (accounted)`,
      violation: null,
    };
  }
  if (d) {
    return {
      note: ` — **STALE HARVEST-DISPOSITION** (pinned ${d.agents}/${d.harvested})`,
      cell: `${harvested ?? '**NOT HARVESTED**'}`,
      violation: `stale harvest disposition — pinned ${d.agents} agents/${d.harvested} results, live ${agents}/${harvested}`,
    };
  }
  return {
    note: '',
    cell: harvested === null ? '**NOT HARVESTED**' : `**${harvested}**`,
    violation: shortfall,
  };
}

// ---- adjudicate ---------------------------------------------------------
function adjudicate(state) {
  const { rosters, disk, banked, durabilityFailure, harvest, harvestMeta, adjudicated, runs } = state;
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
  lines.push('BANKED is a *durability* status, not a provenance one. The HYDRATION-LEDGER status column is where a row\'s provenance lives (EXISTS-ORIGINAL · HYDRATED · REPORT-AUTHORED · UNWITNESSED-DIRECT); a hash-banked axis whose ledger row reads REPORT-AUTHORED was never challenged by a seat.');
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

  // non-band workflows: every run record must be completed + harvested
  lines.push('## Non-band workflows (record vs harvest)');
  lines.push('');
  lines.push('Law: a record must be `completed` AND harvested, with harvested results accounting for every seat it dispatched. A stopped run needs a STOPPED-WITH-DISPOSITION reason; a short harvest needs a HARVEST-DISPOSITION whose pinned counts still match. Anything else is a violation and exits 1.');
  lines.push('');
  lines.push('| run | record status | agents | harvested results |');
  lines.push('|---|---|---|---|');
  const bandIds = new Set(Object.values(BANDS));
  for (const [rid, run] of Object.entries(runs)) {
    if (bandIds.has(rid)) continue;
    const v = nonBandVerdict(rid, run, harvestMeta, state.harvestDisposition);
    lines.push(`| \`${rid}\` | ${run.status}${v.note} | ${run.agentCount ?? '?'} | ${v.cell} |`);
    if (v.violation) {
      incomplete.push({ band: '(non-band)', slug: rid, missing: [v.violation], runId: rid, runState: run.status });
    }
  }
  lines.push('');

  // verdict
  lines.push('## VERDICT');
  lines.push('');
  const uncovered = incomplete.filter((i) => !i.coverage?.covered);
  if (incomplete.length === 0) {
    lines.push(`**GREEN — zero incomplete components.** Every roster component has all three exact challenge axes hash-banked (${bankedAxisTotal}/${axisTotal}), and every non-band run record is completed with its seats accounted for.`);
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

  return { lines, incomplete, uncovered, bankedAxisTotal, axisTotal, exitCode: uncovered.length > 0 ? 1 : 0 };
}

// ---- §SELF-TEST ---------------------------------------------------------
// Ported from `validate-constellation-dag.mjs`'s expectReject harness (provenance-audit row 24:
// the single best-engineered validation idea in the Codex census — a gate that proves it can
// fail). Nothing is written to disk in this mode; every violation is injected in memory.
function selfTest() {
  const out = [];
  const say = (s) => { out.push(s); console.log(s); };

  say('SELF-TEST — validate-completeness.mjs · expectReject harness (ported from validate-constellation-dag.mjs)');
  say('Each case injects ONE synthetic violation in memory and requires exit 1. Nothing is written.');
  say('');

  const base = adjudicate(gather());
  say(`baseline (unmutated tree): exit ${base.exitCode} · ${base.uncovered.length} uncovered · ${base.bankedAxisTotal}/${base.axisTotal} hash-banked`);
  if (base.exitCode !== 0) {
    say('BASELINE IS NOT GREEN — self-test is meaningless until the real tree passes. Fix the tree first.');
    return 1;
  }
  say('');

  const cases = [];
  const expectReject = (id, violation, build) => cases.push({ id, violation, build });

  // 1 — a canonical axis file vanishes. Must surface as ABSENT and uncover its component row.
  expectReject(
    'S1', 'missing axis — audit/components/App/challenge-D-design.md deleted from disk',
    () => gather({ absent: new Set(['audit/components/App/challenge-D-design.md']) }),
  );

  // 2 — a ledgered hash no longer matches the bytes. The real sha256 comparison must catch it.
  expectReject(
    'S2', 'hash mismatch — App/challenge-L-library.md ledgered as 64×"a" while bytes are unchanged',
    () => gather({ rehash: new Map([['audit/components/App/challenge-L-library.md', 'a'.repeat(64)]]) }),
  );

  // 3 — a completed run record with no harvest at all. This is the §1e law that had no failure
  //     mode before: the column printed NOT HARVESTED and the verdict stayed GREEN.
  expectReject('S3', 'unharvested completed run — synthetic wf_selftest-unharvested, 4 seats, 0 harvest', () => {
    const s = gather();
    s.runs['wf_selftest-unharvested'] = { status: 'completed', agentCount: 4, result: {} };
    return s;
  });

  // 4 — a completed run whose harvest is short of its seat count, with no written accounting.
  expectReject('S4', 'agents≠results — synthetic wf_selftest-short, 5 seats, 2 harvested, no disposition', () => {
    const s = gather();
    s.runs['wf_selftest-short'] = { status: 'completed', agentCount: 5, result: {} };
    s.harvestMeta['wf_selftest-short'] = { file: 'synthetic.json', resultCount: 2 };
    return s;
  });

  // 5 — the deleted exemption. A frontend-omissions axis regresses; that band used to be
  //     structurally incapable of failing (covered:true on a magic run-ID string).
  expectReject(
    'S5', 'frontend-omissions regression — shell-dock-genericactionbar/challenge-C-implementation.md deleted (the ex-exempt band)',
    () => gather({ absent: new Set(['audit/components/shell-dock-genericactionbar/challenge-C-implementation.md']) }),
  );

  // 6 — a HARVEST-DISPOSITION that no longer describes reality must not keep covering the row.
  expectReject('S6', 'stale harvest disposition — wf_a6f71311-4e5 harvest drifts 14 → 13 while the entry still pins 14', () => {
    const s = gather();
    s.harvestMeta['wf_a6f71311-4e5'] = { file: 'wf_a6f71311-4e5.json', resultCount: 13 };
    return s;
  });

  let passed = 0;
  for (const { id, violation, build } of cases) {
    const r = adjudicate(build());
    const ok = r.exitCode === 1 && r.uncovered.length > 0;
    const first = r.uncovered[0];
    say(`[${id}] injected: ${violation}`);
    say(`      expected exit 1 · got exit ${r.exitCode} · ${r.uncovered.length} uncovered`
      + (first ? ` · first: ${first.band} / ${first.slug} — ${first.missing.join('/')}` : ' · first: —'));
    say(`      ${ok ? 'PASS — correctly rejected' : 'FAIL — falsely accepted'}`);
    say('');
    if (ok) passed++;
  }

  const allPassed = passed === cases.length;
  say(`SELF-TEST ${allPassed ? 'PASS' : 'FAIL'} — ${passed}/${cases.length} injected violations correctly rejected.`);
  if (allPassed) {
    say('The gate can fail for each of its intended reasons, and does not fail on the real tree.');
  }
  return allPassed ? 0 : 1;
}

// ---- main ---------------------------------------------------------------
if (process.argv.includes('--self-test')) {
  process.exit(selfTest());
} else {
  const result = adjudicate(gather());
  writeFileSync(join(MEGA, 'registry/COMPLETENESS-LEDGER.md'), result.lines.join('\n'));
  console.log(result.lines.slice(result.lines.indexOf('## VERDICT')).join('\n'));
  console.log(`\nwrote ${join(MEGA, 'registry/COMPLETENESS-LEDGER.md')}`);
  process.exit(result.exitCode);
}
