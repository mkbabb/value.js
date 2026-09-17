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

// ---- THE CORPUS PREDICATE (COHESION §0k.1, ruled 2026-09-17) ------------------------------------
// The non-band law below — "every run record must be completed AND harvested" — carried NO corpus
// predicate at all. `SESSION_WF` is a live Claude Code session directory OUTSIDE this repository
// which every program that dispatches a workflow in this session writes into, so the law was
// adjudicating four other tranche-X tracks' dispatch discipline against the megatranche's harvest
// law, and its subject set grew while no megatranche byte moved (87 uncovered at X-W0's round-1
// close, 89 at its repair round, with no work done in between).
//
// The predicate, in the ruling's own words: the law "ranges over run records at or before the
// megatranche dispatch boundary (timestamped ≤ 2026-08-03) plus any record a canonical row cites;
// live tranche-X session journals are outside its corpus by construction."
//
// Three properties this is built to have, each of which is the reason it is a scope and not a
// suppression:
//
//   * IT SUPPRESSES NOTHING. Every out-of-corpus record is still read, still put through the same
//     `nonBandVerdict`, and its shortfall is printed as a dated, OWED figure in its own ledger
//     section. The finding stands, dated, with a named owner: those records are X-track run
//     journals and are harvested once, at X-W11's close, by `workflows/harvest-journals.mjs`.
//   * IT IS FAIL-CLOSED. A record whose own `timestamp` is missing or unreadable is IN corpus. The
//     exclusion must be positively established from the record's own datum; it is never assumed.
//     (This is also why the S3/S4 synthetic records, which carry no timestamp, still fail.)
//   * THE CITATION CLAUSE IS LIVE, not decorative. A record of ANY date whose harvest is cited by a
//     canonical roster row is in corpus, so a late run that actually produces megatranche coverage
//     cannot fall out of the law by being late. It admits 0 extra records today and is the seam
//     that keeps that true tomorrow.
//
// What this predicate may never become: a borrowed run ID, a `BANDS` re-point, an allowlist, a
// cutoff written into a self-test fixture, or a `covered:true` short-circuit. It is a stated scope
// with a printed complement.
const CORPUS_BOUNDARY = '2026-08-03';    // the megatranche dispatch boundary (the wave-spec's own date)
const CORPUS_RULING = 'COHESION §0k.1, 2026-09-17';
const HARVEST_OWED_AT = "X-W11's close, via `workflows/harvest-journals.mjs`";

// A record is IN CORPUS iff a canonical roster row cites it, or its own timestamp places it at or
// before the dispatch boundary. Anything else — including a record with no readable timestamp —
// stays in corpus.
function inCorpus(rid, run, citedByCanonicalRow) {
  if (citedByCanonicalRow?.has(rid)) {
    return { inside: true, why: 'cited by a canonical roster row' };
  }
  const raw = run?.timestamp;
  const day = typeof raw === 'string' ? raw.slice(0, 10) : '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return { inside: true, why: 'no readable timestamp — fail-closed into the corpus' };
  }
  return day <= CORPUS_BOUNDARY
    ? { inside: true, why: `${day} ≤ ${CORPUS_BOUNDARY}` }
    : { inside: false, why: `${day} > ${CORPUS_BOUNDARY}` };
}

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
  // The status word is also read now — not for durability (it never gates a hash), but so this
  // script can print the CHALLENGED / REPORT-AUTHORED split as separate integers instead of a
  // saturation figure a reader can mistake for challenge coverage (HG-6 / G-D).
  const hydrationStatus = new Map();
  const hydrationLedger = join(MEGA, 'registry/HYDRATION-LEDGER.md');
  if (existsSync(hydrationLedger)) {
    for (const line of readFileSync(hydrationLedger, 'utf8').split('\n')) {
      const match = /^\| (audit\/components\/[^|]+?) \| ([^|]+?) \| `([0-9a-f]{64})`/.exec(line);
      if (match) { hydrationHashes.set(match[1], match[3]); hydrationStatus.set(match[1], match[2]); }
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

  // The canonical-roster axis set, built here from `rosters` + AXIS_FILE — the same construction the
  // denominator uses below, so the citation clause of the corpus predicate and the denominator can
  // never mean two different things by "canonical row".
  const canonicalAxisPaths = new Set();
  for (const slugs of Object.values(rosters)) {
    for (const slug of slugs) {
      for (const axis of AXES) canonicalAxisPaths.add(`audit/components/${slug}/${AXIS_FILE[axis]}`);
    }
  }

  // harvest truth: slug → set of axes that RETURNED (parsed from reportPath)
  const harvest = {};
  const harvestMeta = {};
  // The corpus predicate's citation clause: every durable identity of a harvest payload that carries
  // at least one canonical-roster report path. Keyed the same way `harvestMeta` is, so a record is
  // reachable by run ID, by workflow name, or by harvest filename.
  const citedByCanonicalRow = new Set();
  const harvestDir = join(MEGA, 'registry/harvest');
  for (const f of readdirSync(harvestDir).filter((f) => f.endsWith('.json'))) {
    const d = JSON.parse(readFileSync(join(harvestDir, f), 'utf8'));
    const meta = { file: f, resultCount: d.resultCount ?? d.results?.length };
    const identities = [...new Set([d.runId, d.workflow, basename(f, '.json')].filter(Boolean))];
    for (const r of d.results || []) {
      const p = r?.result?.reportPath;
      if (typeof p !== 'string') continue;
      // The canonical path is taken up to the `.md`; a seat that appended prose after the filename
      // (the three dangling receipts) still cites the canonical row it wrote.
      const c = /(audit\/components\/[^/\s]+\/challenge-[DLC]-[a-z]+\.md)/.exec(p);
      if (c && canonicalAxisPaths.has(c[1])) for (const key of identities) citedByCanonicalRow.add(key);
    }
    // Descriptive harvest filenames (for example `area-core.json`) are not run IDs.
    // Index every durable identity carried by the payload so non-band rows do not
    // report a false NOT HARVESTED merely because the file has a human name.
    for (const key of identities) harvestMeta[key] = meta;
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
        // `timestamp` is the record's own datum and is what the corpus predicate ranges over;
        // `startTime` is its only in-record fallback. Neither is invented, and a record that
        // carries neither stays in corpus (fail-closed).
        runs[d.runId || basename(f, '.json')] = {
          status: d.status, result: d.result, agentCount: d.agentCount,
          timestamp: d.timestamp ?? d.startTime, workflowName: d.workflowName,
        };
      } catch { /* unreadable record — surfaced below as UNKNOWN */ }
    }
  }

  return {
    rosters, disk, banked, durabilityFailure, harvest, harvestMeta, adjudicated, runs, hydrationStatus,
    citedByCanonicalRow,
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

  // ---- THE CHALLENGED DENOMINATOR (HG-6 / G-D / C-04) ---------------------------------------
  // THE ROSTER PREDICATE, stated here in the same words the hydration generator states it:
  // an axis is CANONICAL-ROSTER iff its path is `audit/components/<slug>/<exact canonical axis
  // filename>` with <slug> on a band roster in `workflows/args/*.json`. That set is built below
  // from `rosters` and AXIS_FILE — the same construction, so the two ledgers cannot drift apart
  // silently; if one changes the predicate, its own total moves and the reconciliation prints it.
  //
  // `264/264` is a SATURATION figure: a canonical file exists, has a ledger row, and its current
  // hash matches. It is NOT challenge coverage. 46 of those axes were authored by a source-review
  // pass with no seat dispatched at all, and this is where that is said out loud.
  const denom = { 'EXISTS-ORIGINAL': 0, HYDRATED: 0, 'UNWITNESSED-DIRECT': 0, 'REPORT-AUTHORED': 0, 'UNPARSEABLE-PAYLOAD': 0, 'NO-LEDGER-ROW': 0 };
  const denomByBand = {};
  for (const [band, slugs] of Object.entries(rosters)) {
    denomByBand[band] = { challenged: 0, authored: 0, other: 0, total: 0 };
    for (const slug of slugs) {
      for (const axis of AXES) {
        const status = (state.hydrationStatus?.get(`audit/components/${slug}/${AXIS_FILE[axis]}`) ?? 'NO-LEDGER-ROW').trim();
        denom[status] = (denom[status] ?? 0) + 1;
        const b = denomByBand[band];
        b.total++;
        if (status === 'EXISTS-ORIGINAL' || status === 'HYDRATED' || status === 'UNWITNESSED-DIRECT') b.challenged++;
        else if (status === 'REPORT-AUTHORED') b.authored++;
        else b.other++;
      }
    }
  }
  const CHALLENGED = denom['EXISTS-ORIGINAL'] + denom.HYDRATED + denom['UNWITNESSED-DIRECT'];
  const REPORT_AUTHORED = denom['REPORT-AUTHORED'];
  const denomTotal = Object.values(denom).reduce((a, b) => a + b, 0);
  const split = `${CHALLENGED} CHALLENGED + ${REPORT_AUTHORED} REPORT-AUTHORED`;

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
  lines.push('| band | complete components | exact files present | hash-banked axes | of which CHALLENGED | of which REPORT-AUTHORED |');
  lines.push('|---|---:|---:|---:|---:|---:|');
  for (const row of bandCoverage) {
    const b = denomByBand[row.band];
    lines.push(`| ${row.band} | ${row.completeComponents}/${row.components} | ${row.presentAxes}/${row.totalAxes} | ${row.bankedAxes}/${row.totalAxes} | ${b.challenged} | ${b.authored} |`);
  }
  lines.push(`| **total** | **${completeComponentTotal}/${componentTotal}** | **${presentAxisTotal}/${axisTotal}** | **${bankedAxisTotal}/${axisTotal} = ${split}** | **${CHALLENGED}** | **${REPORT_AUTHORED}** |`);
  lines.push('');
  lines.push(`Challenge-axis file presence is **${presentAxisTotal}/${axisTotal} (${(presentAxisTotal / axisTotal * 100).toFixed(1)}%)**; durable saturation is **${bankedAxisTotal}/${axisTotal} (${(bankedAxisTotal / axisTotal * 100).toFixed(1)}%)** — which is **${split}**, not ${axisTotal} challenged axes. Component completion is **${completeComponentTotal}/${componentTotal} (${(completeComponentTotal / componentTotal * 100).toFixed(1)}%)**. These measures are not interchangeable.`);
  lines.push('');
  lines.push('## The challenged denominator (HG-6 / G-D / C-04)');
  lines.push('');
  lines.push('**The roster predicate, stated here and in `hydrate-reports.mjs` in the same words:** an axis is CANONICAL-ROSTER iff its path is `audit/components/<slug>/<exact canonical axis filename>` with `<slug>` on a band roster in `workflows/args/*.json`. Both scripts build that set the same way, so neither ledger can move its denominator without the other\'s reconciliation line moving visibly.');
  lines.push('');
  lines.push('**Three integers, not two** — so UNWITNESSED-DIRECT cannot hide inside a CHALLENGED aggregate:');
  lines.push('');
  lines.push('| hydration status | canonical-roster axes | counts as |');
  lines.push('|---|---:|---|');
  lines.push(`| EXISTS-ORIGINAL | **${denom['EXISTS-ORIGINAL']}** | CHALLENGED |`);
  lines.push(`| HYDRATED | **${denom.HYDRATED}** | CHALLENGED |`);
  lines.push(`| UNWITNESSED-DIRECT | **${denom['UNWITNESSED-DIRECT']}** | CHALLENGED (provenance is only that the file is there) |`);
  lines.push(`| REPORT-AUTHORED | **${denom['REPORT-AUTHORED']}** | **NOT challenge coverage** — authored by the 2026-08-03 closure pass, no seat dispatched |`);
  lines.push(`| UNPARSEABLE-PAYLOAD | **${denom['UNPARSEABLE-PAYLOAD']}** | neither |`);
  lines.push(`| NO-LEDGER-ROW | **${denom['NO-LEDGER-ROW']}** | neither — a roster axis the hydration ledger does not carry |`);
  lines.push(`| **total** | **${denomTotal}** | **${split}** |`);
  lines.push('');
  lines.push(`**Every gate that cites this corpus cites \`${axisTotal}/${axisTotal} = ${split}\`, never \`${axisTotal}/${axisTotal}\` alone.** A saturation figure says a file exists, is ledgered, and still hashes; it says nothing about whether anyone challenged it. The unqualified form is what let V·MT0 gate on ${axisTotal}/${axisTotal} while ${REPORT_AUTHORED} axes had zero commands run (C-04 / K-3).`);
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

  // non-band workflows: every run record must be completed + harvested — OVER THE CORPUS.
  const bandIds = new Set(Object.values(BANDS));
  const outOfCorpus = [];
  const inCorpusRows = [];
  for (const [rid, run] of Object.entries(runs)) {
    if (bandIds.has(rid)) continue;
    const c = inCorpus(rid, run, state.citedByCanonicalRow);
    (c.inside ? inCorpusRows : outOfCorpus).push([rid, run, c]);
  }

  lines.push('## Non-band workflows (record vs harvest) — over the corpus');
  lines.push('');
  lines.push(`**The corpus predicate (${CORPUS_RULING}), stated before the law it scopes:** this law ranges over run records at or before the megatranche dispatch boundary (**timestamped ≤ ${CORPUS_BOUNDARY}**) plus **any record a canonical roster row cites**. Live tranche-X session journals are outside the corpus **by construction**, not by exception. The record's own \`timestamp\` field is the datum; a record carrying no readable timestamp stays **in** corpus (fail-closed — the exclusion is positively established or it does not happen). Nothing is suppressed: every out-of-corpus record is read, put through this same verdict, and its shortfall printed as a dated owed figure in the next section.`);
  lines.push('');
  lines.push('Law: a record must be `completed` AND harvested, with harvested results accounting for every seat it dispatched. A stopped run needs a STOPPED-WITH-DISPOSITION reason; a short harvest needs a HARVEST-DISPOSITION whose pinned counts still match. Anything else is a violation and exits 1.');
  lines.push('');
  lines.push('| run | in corpus because | record status | agents | harvested results |');
  lines.push('|---|---|---|---|---|');
  for (const [rid, run, c] of inCorpusRows) {
    const v = nonBandVerdict(rid, run, harvestMeta, state.harvestDisposition);
    lines.push(`| \`${rid}\` | ${c.why} | ${run.status}${v.note} | ${run.agentCount ?? '?'} | ${v.cell} |`);
    if (v.violation) {
      incomplete.push({ band: '(non-band)', slug: rid, missing: [v.violation], runId: rid, runState: run.status });
    }
  }
  lines.push('');

  // The complement of the predicate, printed — this section is what makes the scope a scope and not
  // a suppression. These rows do not gate this ledger and they are not excused: they are OWED.
  const owed = {
    'completed but NOT HARVESTED': 0,
    'harvest short of seats': 0,
    'stale harvest disposition': 0,
    'record not terminal': 0,
  };
  const owedByWorkflow = {};
  const owedRows = [];
  for (const [rid, run, c] of outOfCorpus) {
    const v = nonBandVerdict(rid, run, harvestMeta, state.harvestDisposition);
    if (!v.violation) { owedRows.push([rid, run, c, null]); continue; }
    const kind = Object.keys(owed).find((k) => v.violation.startsWith(k)) ?? 'record not terminal';
    owed[kind]++;
    owedRows.push([rid, run, c, v.violation]);
    const wf = (run.workflowName ?? 'unnamed').replace(/[-_]?\d+$/, '*');
    owedByWorkflow[wf] = (owedByWorkflow[wf] ?? 0) + 1;
  }
  const owedTotal = Object.values(owed).reduce((a, b) => a + b, 0);
  lines.push(`## Out-of-corpus run records — DATED AND OWED (${CORPUS_RULING}), never suppressed`);
  lines.push('');
  lines.push(`**${outOfCorpus.length}** run records in the live session directory fall outside the corpus predicate above — every one of them timestamped after **${CORPUS_BOUNDARY}** and belonging to a tranche-X track, not to this megatranche. Put through the identical non-band verdict they would fail **${owedTotal}** times. **That finding is not discharged by this scope and is not excused here.** It is owed, in full, at ${HARVEST_OWED_AT}, which rewrites \`registry/DEFECT-LEDGER.md\` by dated addendum inside X-W11's own bounds. A figure that moves when no megatranche byte moves is a measurement of another program, which is exactly why it is reported here rather than gating here.`);
  lines.push('');
  lines.push('| owed shortfall | out-of-corpus records |');
  lines.push('|---|---:|');
  for (const [kind, n] of Object.entries(owed)) lines.push(`| ${kind} | **${n}** |`);
  lines.push(`| **total owed at ${HARVEST_OWED_AT.replace(/`/g, '')}** | **${owedTotal}** of ${outOfCorpus.length} |`);
  lines.push('');
  if (owedTotal > 0) {
    lines.push('By dispatching program (workflow name, trailing batch number folded to `*`) — so the owed set is attributable, not a bare integer:');
    lines.push('');
    lines.push('| dispatching workflow | owed records |');
    lines.push('|---|---:|');
    for (const [wf, n] of Object.entries(owedByWorkflow).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
      lines.push(`| \`${wf}\` | ${n} |`);
    }
    lines.push('');
  }
  // Every out-of-corpus record by name, with the verdict it would have taken. A scope that stops
  // NAMING the records it stops gating has become a suppression; this table is what keeps it one.
  lines.push('Every out-of-corpus record by name, so the owed set is enumerable and not merely counted:');
  lines.push('');
  lines.push('| run | dispatching workflow | out of corpus because | record status | agents | harvested | owed shortfall |');
  lines.push('|---|---|---|---|---|---|---|');
  for (const [rid, run, c, violation] of owedRows) {
    const v = nonBandVerdict(rid, run, harvestMeta, state.harvestDisposition);
    lines.push(`| \`${rid}\` | \`${run.workflowName ?? '—'}\` | ${c.why} | ${run.status} | ${run.agentCount ?? '?'} | ${v.cell} | ${violation ? `**OWED — ${violation}**` : 'none'} |`);
  }
  lines.push('');

  // verdict
  lines.push('## VERDICT');
  lines.push('');
  const uncovered = incomplete.filter((i) => !i.coverage?.covered);
  if (incomplete.length === 0) {
    lines.push(`**GREEN — zero incomplete components.** Every roster component has all three exact challenge axes hash-banked (${bankedAxisTotal}/${axisTotal} = ${split}), and every **in-corpus** non-band run record (${inCorpusRows.length}) is completed with its seats accounted for. GREEN is a durability verdict over the saturation figure; it does not assert that the ${REPORT_AUTHORED} REPORT-AUTHORED axes were ever challenged, **and it does not discharge the ${owedTotal} owed out-of-corpus shortfalls above** — those are dated, attributed and owed at ${HARVEST_OWED_AT}.`);
  } else {
    const nActive = incomplete.filter((i) => i.coverage?.status === 'ACTIVE').length;
    const nQueued = incomplete.filter((i) => i.coverage?.status === 'QUEUED').length;
    const nCapacityBlocked = incomplete.filter((i) => i.coverage?.status === 'BLOCKED-ON-CAPACITY').length;
    lines.push(`**${incomplete.length} incomplete component rows · ${missingAxisTotal} unbanked canonical axes · ${presentAxisTotal}/${axisTotal} exact files present · ${bankedAxisTotal}/${axisTotal} hash-banked = ${split}.** ${nActive} covered by an ACTIVE resume · ${nQueued} covered by a QUEUED resume (cap-4 sequencing) · ${nCapacityBlocked} **BLOCKED-ON-CAPACITY** · **${uncovered.length} UNCOVERED** (violations).`);
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

  return {
    lines, incomplete, uncovered, bankedAxisTotal, axisTotal, denom, CHALLENGED, REPORT_AUTHORED, split,
    inCorpusCount: inCorpusRows.length, outOfCorpusCount: outOfCorpus.length, owedTotal, owed,
    exitCode: uncovered.length > 0 ? 1 : 0,
  };
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
  say(`baseline (unmutated tree): exit ${base.exitCode} · ${base.uncovered.length} uncovered · ${base.bankedAxisTotal}/${base.axisTotal} hash-banked = ${base.split}`);
  say(`three integers (canonical roster): EXISTS-ORIGINAL ${base.denom['EXISTS-ORIGINAL']} · UNWITNESSED-DIRECT ${base.denom['UNWITNESSED-DIRECT']} · REPORT-AUTHORED ${base.denom['REPORT-AUTHORED']}`);
  say(`corpus predicate (${CORPUS_RULING}): run records timestamped ≤ ${CORPUS_BOUNDARY}, plus any record a canonical roster row cites`);
  say(`non-band records: ${base.inCorpusCount} IN CORPUS (gating) · ${base.outOfCorpusCount} out of corpus,`
    + ` of which ${base.owedTotal} OWED and dated — harvest at ${HARVEST_OWED_AT.replace(/`/g, '')}. Scoped, not suppressed.`);
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
  console.log(`denominator: ${result.bankedAxisTotal}/${result.axisTotal} hash-banked = ${result.split}`);
  console.log(`three integers (canonical roster): EXISTS-ORIGINAL ${result.denom['EXISTS-ORIGINAL']}`
    + ` · UNWITNESSED-DIRECT ${result.denom['UNWITNESSED-DIRECT']} · REPORT-AUTHORED ${result.denom['REPORT-AUTHORED']}`);
  console.log(`corpus predicate (${CORPUS_RULING}): run records timestamped ≤ ${CORPUS_BOUNDARY}, plus any record a canonical roster row cites`);
  console.log(`non-band records: ${result.inCorpusCount} IN CORPUS (gating) · ${result.outOfCorpusCount} out of corpus,`
    + ` of which ${result.owedTotal} OWED and dated — harvest at ${HARVEST_OWED_AT.replace(/`/g, '')}. Scoped, not suppressed.`);
  console.log(`\nwrote ${join(MEGA, 'registry/COMPLETENESS-LEDGER.md')}`);
  process.exit(result.exitCode);
}
