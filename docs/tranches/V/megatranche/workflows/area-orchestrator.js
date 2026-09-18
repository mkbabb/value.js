export const meta = {
  name: 'component-area-orchestrator',
  description: 'Runs one nested apotheosis workflow per component in an area (3 challengers + 3 jurors each)',
  whenToUse: 'Workflow({scriptPath: this, args: {area, parallelism, components: [{file,slug,area,loc,extra}]}})',
  phases: [{ title: 'Components', detail: 'one nested workflow per component', model: 'opus' }],
}

// ABSOLUTE by law: a relative child scriptPath resolves against the HARNESS working directory,
// which the orchestrating shell's `cd` mutates mid-run — 24 palettes children failed instantly
// with a doubled path when the root shell cd'd into the megatranche dir (2026-07-28). Never
// relative here; never `cd` in the orchestrating shell.
const SCRIPT = '/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/workflows/component-apotheosis.js'

// `args` may arrive as a real object OR as a JSON-encoded string depending on how the
// invocation serialised it. A silently-empty run is the worst outcome here (it reads as
// "area clean"), so normalise defensively and FAIL LOUDLY on an empty roster.
const A = typeof args === 'string' ? JSON.parse(args) : args || {}
const AREA = A.area
const COMPONENTS = A.components || []
const P = A.parallelism || 2

if (!COMPONENTS.length) {
  throw new Error(`area-orchestrator: EMPTY component roster for area=${AREA}. args typeof=${typeof args}. Refusing to report a clean area.`)
}

phase('Components')

const results = []
for (let i = 0; i < COMPONENTS.length; i += P) {
  const chunk = COMPONENTS.slice(i, i + P)
  const batch = await parallel(
    chunk.map((c) => async () => {
      try {
        const r = await workflow({ scriptPath: SCRIPT }, c)
        log(`${c.slug}: ${r && r.worstVerdict} · defects=${r && r.defects ? r.defects.length : 0} · blockers=${r && r.blockers ? r.blockers.length : 0}`)
        return r
      } catch (e) {
        log(`${c.slug}: FAILED ${String(e).slice(0, 160)}`)
        return { slug: c.slug, failed: String(e).slice(0, 300) }
      }
    }),
  )
  results.push(...batch.filter(Boolean))
}

// L-15.8: `complete:false` children (wall-killed seats folded to null) and failed children
// are NOT run. The old accounting counted them silently — three bands self-reported full
// completion while 45 component rows had nothing banked. componentsRun must be earned.
const done = results.filter((r) => !r.failed && r.complete !== false)
const partial = results.filter((r) => !r.failed && r.complete === false)
const flat = results.flatMap((r) => (r.defects || []).map((d) => ({ slug: r.slug, ...d })))
log(`AREA ${AREA}: ${done.length}/${COMPONENTS.length} complete · ${partial.length} INCOMPLETE (<3 seats) · ${flat.length} defects · ${flat.filter((d) => d.severity === 'BLOCKER').length} blockers`)

return {
  area: AREA,
  componentsRun: done.length,
  componentsRequested: COMPONENTS.length,
  incomplete: partial.map((r) => ({ slug: r.slug, worstVerdict: r.worstVerdict })),
  failures: results.filter((r) => r.failed).map((r) => ({ slug: r.slug, failed: r.failed })),
  blockers: flat.filter((d) => d.severity === 'BLOCKER'),
  majors: flat.filter((d) => d.severity === 'MAJOR'),
  perComponent: results.map((r) => ({
    slug: r.slug,
    file: r.component,
    worstVerdict: r.worstVerdict,
    defectCount: (r.defects || []).length,
    blockerCount: (r.blockers || []).length,
    juryVerdicts: (r.juryVerdicts || []).map((j) => `${j.juror}:${j.verdict}`),
    waveSpecs: (r.jury || []).map((j) => j.waveSpec).filter(Boolean),
    addendumClauses: (r.jury || []).map((j) => j.addendumClause).filter(Boolean),
    dissent: (r.jury || []).map((j) => j.dissent).filter((d) => d && d !== 'NONE'),
  })),
}
