export const meta = {
  name: 'trifold-adjudication',
  description: 'M-12 tri-fold: Fable + Opus adjudicate a component defect corpus independently; a Fable arbiter agglomerates into an apotheosis',
  whenToUse: 'Workflow({scriptPath: this, args: {units: [{slug, area, file, defects, blockers, harvest: [paths], extra}]}})',
  phases: [
    { title: 'Workers', detail: 'per unit: one Fable + one Opus adjudicator, blind to each other' },
    { title: 'Apotheosis', detail: 'per unit: a Fable arbiter refutes both, then agglomerates' },
  ],
}

const A = typeof args === 'string' ? JSON.parse(args) : args || {}
const UNITS = A.units || []
if (!UNITS.length) throw new Error('trifold-adjudication: EMPTY unit roster. Refusing to report a clean corpus.')

const LAWS = `
## LAW (binding on this seat)
- MODEL RECEIPT FIRST: your JSON return opens with modelObserved (the exact model id you observe yourself to be).
- Evidence discipline (L-2/L-9/L-12): believe nothing without re-derivation. Scope every count to source.
  Read the probe's signature before believing its output. The dev server at http://localhost:9000 is UP but
  API-LESS (no mongo): data-backed states (palettes lists, admin panels) will not render — a blank
  data surface is an ENVIRONMENT fact, not a defect confirmation. Say UNVERIFIABLE-HERE when the arm needs data.
- WebKit-vs-Safari (I-20): playwright-webkit and safari-app are SEPARATE evidence cells; never infer one
  from the other. Real Safari 26.4 is automatable via safaridriver on :4599 if you need it (WebDriver classic).
- Glass boundary: glass-ui is NOT ours. The prefix trap (glass 07-25 outbound §3) means the spectrum slider
  range keeps blur(7px) saturate(1.4) over half its ramp TODAY — glass-owned, cured in 8.0.0, DO NOT
  re-book spectrum-seam visual rows as value.js defects, and NO local patch may be proposed (masking-fallback ban).
- No deferrals: every surviving defect maps into a wave shape with a born-RED gate (command + the input that
  makes it RED). "next tranche decides" is banned. Probe parsimony: fastidious file analysis first, browser
  probes only where the verdict genuinely needs one.
`

const VERDICT_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['modelObserved', 'slug', 'verdicts', 'waveSpec', 'addendumClause'],
  properties: {
    modelObserved: { type: 'string' },
    slug: { type: 'string' },
    verdicts: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['id', 'verdict', 'note'],
      properties: {
        id: { type: 'string' },
        verdict: { enum: ['CONFIRMED', 'REFUTED', 'RESCOPED', 'UNVERIFIABLE-HERE', 'GLASS-OWNED'] },
        note: { type: 'string', description: 'the re-derivation that decided it, one dense paragraph' },
        rescopedTo: { type: 'string' },
      } } },
    waveSpec: { type: 'object', additionalProperties: false,
      required: ['waveId', 'title', 'bornRed', 'gates'],
      properties: {
        waveId: { type: 'string' }, title: { type: 'string' }, bornRed: { type: 'boolean' },
        scope: { type: 'string' }, structure: { type: 'string' },
        gates: { type: 'array', items: { type: 'object', additionalProperties: false,
          required: ['gate', 'command', 'redToday', 'whatWouldMakeItFail'],
          properties: { gate: {type:'string'}, command: {type:'string'}, redToday: {type:'boolean'},
            whatWouldMakeItFail: {type:'string'} } } },
        piObligations: { type: 'string' }, deltaObligations: { type: 'string' },
        carries: { type: 'string' }, completableAlone: { type: 'string' },
      } },
    addendumClause: { type: 'string' },
    dissent: { type: 'string' },
  },
}

const APOTHEOSIS_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['modelObserved', 'slug', 'confirmed', 'refuted', 'rescoped', 'unverifiable', 'glassOwned',
    'disagreements', 'apotheosisPath'],
  properties: {
    modelObserved: { type: 'string' }, slug: { type: 'string' },
    confirmed: { type: 'integer' }, refuted: { type: 'integer' }, rescoped: { type: 'integer' },
    unverifiable: { type: 'integer' }, glassOwned: { type: 'integer' },
    disagreements: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['id', 'workerF', 'workerO', 'ruling', 'why'],
      properties: { id:{type:'string'}, workerF:{type:'string'}, workerO:{type:'string'},
        ruling:{type:'string'}, why:{type:'string'} } } },
    apotheosisPath: { type: 'string', description: 'the registry/adjudicated/<slug>.md file this seat WROTE' },
    headline: { type: 'string' },
  },
}

const workerBrief = (u, seatName) => `You are ${seatName}, an independent adjudicator in the value.js
mega-tranche (repo /Users/mkbabb/Programming/value.js, branch tranche-u — READ-ONLY on src/demo/api/test/e2e;
you may write ONLY under docs/tranches/V/megatranche/ and scratch dirs).

SUBJECT: component "${u.slug}" (${u.file || u.area}). A prior challenger fleet returned ${u.defects} defect
accusations (${u.blockers} BLOCKER) against it. They are accusations WITH evidence, NOT findings.

YOUR TASK — adjudicate every one of them, with incredulity:
1) Read docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md and extract every row whose subject or axis
   names ${u.slug} (including rows keyed only by axis text). Cross-check the raw returns in
   ${(u.harvest || []).map((h) => 'docs/tranches/V/megatranche/registry/harvest/' + h).join(' and ')}.
2) For each defect: re-derive it against the CURRENT tree — read the cited file:lines, re-run the stated
   reproduction where the environment permits, and try to REFUTE it before you accept it.
3) Then author ONE wave spec for this component per the L-1..L-14 template in
   docs/tranches/V/megatranche/FORMATION-LAWS.md — individually completable, born-RED gates with the exact
   command and the input that makes each RED.
${u.extra ? '\nCOMPONENT CONTEXT (verified by the root):\n' + u.extra + '\n' : ''}
${LAWS}
Return ONLY the structured object. Your final text IS the data.`

phase('Workers')
const results = []
const P = A.parallelism || 2
for (let i = 0; i < UNITS.length; i += P) {
  const chunk = UNITS.slice(i, i + P)
  const batch = await parallel(chunk.map((u) => async () => {
    const [wf, wo] = await parallel([
      () => agent(workerBrief(u, 'worker-F (Fable seat)'),
        { model: 'fable', label: `wF:${u.slug}`, phase: 'Workers', schema: VERDICT_SCHEMA }),
      () => agent(workerBrief(u, 'worker-O (Opus seat)'),
        { model: 'opus', label: `wO:${u.slug}`, phase: 'Workers', schema: VERDICT_SCHEMA }),
    ])
    if (!wf && !wo) { log(`${u.slug}: BOTH workers died — unit incomplete, NOT clean`); return { slug: u.slug, failed: 'both workers died' } }
    const arb = await agent(`You are arbiter-F in the M-12 tri-fold for component "${u.slug}"
(value.js mega-tranche, repo /Users/mkbabb/Programming/value.js). Two independent adjudicators — worker-F (Fable)
and worker-O (Opus) — judged the same ${u.defects}-defect corpus blind to each other. Their full returns:

=== WORKER-F ===
${wf ? JSON.stringify(wf, null, 1) : 'SEAT DIED — arbitrate on worker-O alone and SAY SO in the apotheosis.'}

=== WORKER-O ===
${wo ? JSON.stringify(wo, null, 1) : 'SEAT DIED — arbitrate on worker-F alone and SAY SO in the apotheosis.'}

YOUR TASK — the apotheosis, with sagacity and incredulity (L-14):
1) Attempt to REFUTE both workers before adopting either. Where they disagree, re-derive against the tree
   yourself and RULE, recording which side won and the evidence that decided it. Where they agree
   suspiciously well, spot-check at least two of their agreed verdicts against source.
2) Agglomerate into ONE apotheosis document and WRITE it to
   docs/tranches/V/megatranche/registry/adjudicated/${u.slug}.md — final per-defect verdicts with the
   deciding evidence, the ONE re-authored wave spec (best of both, corrected), the addendum clause, and a
   DISSENT section preserving any unresolved disagreement verbatim.
3) A verdict of CONFIRMED requires a reproduction that a fresh session could run; GLASS-OWNED rows cite
   INBOX I-20; UNVERIFIABLE-HERE rows state exactly which environment arm is missing.
${LAWS}
Return ONLY the structured summary. apotheosisPath must be the file you actually wrote.`,
      { model: 'fable', label: `arb:${u.slug}`, phase: 'Apotheosis', schema: APOTHEOSIS_SCHEMA })
    if (arb) log(`${u.slug}: apotheosis ${arb.apotheosisPath} · C${arb.confirmed}/R${arb.refuted}/S${arb.rescoped}/U${arb.unverifiable}/G${arb.glassOwned} · disagreements=${(arb.disagreements||[]).length}`)
    return { slug: u.slug, workerF: !!wf, workerO: !!wo, apotheosis: arb }
  }))
  results.push(...batch.filter(Boolean))
}

const done = results.filter((r) => r.apotheosis)
log(`TRIFOLD ROUND COMPLETE: ${done.length}/${UNITS.length} apotheoses · ${results.filter((r) => r.failed).length} failed units`)
return {
  unitsRequested: UNITS.length,
  apotheoses: done.map((r) => ({ slug: r.slug, bothWorkers: r.workerF && r.workerO,
    path: r.apotheosis.apotheosisPath, headline: r.apotheosis.headline,
    tallies: { C: r.apotheosis.confirmed, R: r.apotheosis.refuted, S: r.apotheosis.rescoped,
      U: r.apotheosis.unverifiable, G: r.apotheosis.glassOwned },
    disagreements: r.apotheosis.disagreements })),
  failures: results.filter((r) => r.failed),
}
