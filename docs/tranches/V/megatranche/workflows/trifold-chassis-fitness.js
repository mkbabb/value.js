export const meta = {
  name: 'trifold-chassis-fitness',
  description: 'M-12 tri-fold: is InstrumentChassis fit-for-purpose for value, or overfit — bespoke warranted?',
  whenToUse: 'Owner challenge 2026-07-27 against the layout apotheosis + VISUAL-CONSTITUTION §38 chassis binding',
  phases: [
    { title: 'Workers', detail: 'worker-F + worker-O, blind, same brief: prosecute the adoption' },
    { title: 'Apotheosis', detail: 'arbiter-F refutes both, rules, writes registry/adjudicated/chassis-fitness.md' },
  ],
}

const LAWS = `
## LAW (binding on this seat)
- MODEL RECEIPT FIRST: your JSON return opens with modelObserved (the exact model id you observe yourself to be).
- READ-ONLY on src/ demo/ api/ test/ e2e/ and every other repo's tree; you may write ONLY under
  docs/tranches/V/megatranche/ and scratch dirs.
- Evidence discipline (L-2/L-9/L-12): judge fitness against the INSTALLED dist bytes
  (node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/ in value.js) — that is what value
  would consume. The glass SOURCE (~/Programming/glass-ui/src/components/instrument-chassis/) is intent
  commentary only; it may have drifted toward 8.0.0. Scope every count to the exact command that produced it.
- Probe parsimony: this is a file-analysis question; no browser probes unless a verdict genuinely needs one.
- The masking-fallback / shim / local-clone ban is standing law (MT-F014 disease class: producer forks rot).
- "next tranche decides" is banned. Your verdict must be terminal and carry its consequences.
`

const EVIDENCE = `
## THE EVIDENCE PACK (root-verified 2026-07-27; re-derive anything you lean on)
1. THE CONTRACT: types.d.ts is 13 lines — props {state: ready|active|complete|loading, tone: string,
   proportion: golden|preview-dominant, boundaries: (stage-inspector|inspector-action)[],
   reserve: none|stage|inspector|both, class}; slots {stage, inspector, action}; styles.css = 3,629 BYTES
   (container-type:inline-size, cqi rhythm, one narrow arm at 44.9375rem, unbounded fr ratios
   61.8034fr/38.1966fr golden). Read every byte yourself.
2. CONSUMER CENSUS + OVERRIDE DENSITY (the extraction-worthiness test, root-measured):
   sci-report: 14 consumer files, 0 :deep(), 3 style-override blocks touching .instrument-*.
   fourier-analysis: 5 consumer files, 1 :deep(), 0 overrides. value.js demo: 0 consumers.
   glass-ui demo: 2. Re-run the grep if you doubt it; read 2-3 consumer files per repo to see HOW they
   use it — does the pattern serve heterogeneous content, or do consumers contort?
3. CANON: value.js docs/tranches/V/VISUAL-CONSTITUTION.md line 38 — "InstrumentChassis is the glass-ui
   housing contract for a real instrument… value.js composes regions with domain content; it does not
   clone a local chassis recipe." Route table lines 42-49 binds Picker/Generate/Extract/Mix/Gradient to it.
4. THE ADJUDICATED LAYOUT APOTHEOSIS: docs/tranches/V/megatranche/registry/adjudicated/layout-gestalt.md
   (both blind designers + arbiter converged on chassis adoption; 18-route table: 15 ONE-layout /
   2 bespoke-narrow / 1 producer-bespoke; waves V·L1..V·L4; 102 demo adaptation sites in 3 dialects
   retire into the chassis mechanism).
5. THE MEASURED FIT-GAP: the 8 glass asks G-1..G-8 already relayed (O-10:
   ~/Programming/glass-ui/docs/tranches/BJ/coordination/valuejs-outbound-2026-07-27-chassis-asks-and-dead-dock-rules.md)
   — persistent-stage arm, scroll-confined inspector, comfort token, coarse-pointer rung, block-fill,
   threshold contract, overflow arm. Five are functional ADDITIVE arms value needs that the chassis
   does not ship. Degraded postures exist for every one (nothing blocks adoption), but 5 asks is real
   evidence the chassis was not born for interaction-dense configurators.
6. STANDING LAW THAT CUTS BOTH WAYS: feedback_glass_ui_first_class (primitives belong in glass, reuse
   existing names) vs feedback_kiss_no_contrivance (no wrapper abstractions that serve nothing) — and
   the owner is entitled to overrule canon.
`

const VERDICT_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['modelObserved', 'verdict', 'confidence', 'overfitFindings', 'bespokeCost', 'routeConsequences', 'waveConsequence', 'o10Consequence', 'evidence', 'dissent'],
  properties: {
    modelObserved: { type: 'string' },
    verdict: { enum: ['ADOPT-AS-SHIPPED', 'ADOPT-WITH-ASKS', 'HYBRID', 'BESPOKE'] },
    confidence: { enum: ['decisive', 'preponderance', 'coin-flip'] },
    overfitFindings: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['claim', 'evidence', 'severity'],
      properties: { claim: { type: 'string' }, evidence: { type: 'string', description: 'file:line or command output that establishes it' },
        severity: { enum: ['disqualifying', 'material', 'cosmetic', 'refuted'] } } } },
    bespokeCost: { type: 'string', description: 'the fully-costed bespoke alternative: lines, drift ownership, disease-class exposure, what it does BETTER' },
    routeConsequences: { type: 'string', description: 'per the 18-route table: which routes change binding under your verdict' },
    waveConsequence: { type: 'string', description: 'what happens to V·L1..V·L4 under your verdict' },
    o10Consequence: { type: 'string', description: 'does the sent O-10 packet need amending/withdrawing under your verdict' },
    evidence: { type: 'string', description: 'the re-derivations that decided it, dense' },
    dissent: { type: 'string', description: 'the strongest argument AGAINST your own verdict, steelmanned' },
  },
}

const APOTHEOSIS_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['modelObserved', 'ruling', 'workerFVerdict', 'workerOVerdict', 'refutations', 'apotheosisPath', 'headline'],
  properties: {
    modelObserved: { type: 'string' },
    ruling: { enum: ['ADOPT-AS-SHIPPED', 'ADOPT-WITH-ASKS', 'HYBRID', 'BESPOKE'] },
    workerFVerdict: { type: 'string' }, workerOVerdict: { type: 'string' },
    refutations: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['target', 'claim', 'outcome'],
      properties: { target: { enum: ['worker-F', 'worker-O', 'both'] }, claim: { type: 'string' },
        outcome: { enum: ['refuted', 'survived', 'rescoped'] } } } },
    apotheosisPath: { type: 'string' },
    headline: { type: 'string', description: 'one sentence a fresh session can act on' },
  },
}

const BRIEF = (seat) => `You are ${seat} in an M-12 tri-fold interrogation, value.js mega-tranche
(repo /Users/mkbabb/Programming/value.js, branch tranche-u).

THE OWNER'S CHALLENGE, verbatim: "Ensure that instrument chasis is not overfit garbage and truly befits
our usecase: we likely need something bespoke, no? Or is this truly a pattern that's worth extraction"

This challenges a canon-ratified, tri-fold-converged verdict (the layout apotheosis adopted glass-ui
7.0.0's InstrumentChassis as the layout mechanism for value's instrument routes). Your job is NOT to
defend that verdict — it is to PROSECUTE it with incredulity, then rule on what survives.

RULE ON: is InstrumentChassis, as shipped in installed 7.0.0, fit-for-purpose for value's routes —
or is it an overfit abstraction where bespoke layout is warranted? Verdicts: ADOPT-AS-SHIPPED /
ADOPT-WITH-ASKS (adoption now, glass asks G-1..G-8 as the fit-gap cure) / HYBRID (chassis for some
routes, bespoke for named others — name them) / BESPOKE (value authors its own layout mechanism).

RUN THESE OVERFIT TESTS, minimum, with commands and receipts:
a) KNOB TEST: does the API surface encode one consumer's decisions (overfit) or a genuine minimal
   contract? 6 props / 3 slots / 3.6KB CSS — read every byte and rule which knobs value would never use.
b) OVERRIDE-DENSITY TEST: read actual consumer files in sci-report and fourier-analysis. Do they
   compose cleanly or contort? Count fights (:deep(), .instrument-* overrides, wrapper divs re-doing grid).
c) CONTENT-SHAPE TEST: sci-report is dashboards; value is interaction-dense configurators (stage +
   dense inspector + action). Does the stage/inspector/action decomposition genuinely fit Picker,
   Generate, Extract, Mix, Gradient (read those components' current templates in demo/) — or is it a
   dashboard shape being forced onto instruments?
d) BESPOKE-DELTA TEST: write the bespoke alternative's skeleton (in prose or a scratch file, NOT in
   demo/). If it materially reproduces the chassis grid, bespoke is a clone with drift (MT-F014 disease
   class) and the case collapses. If it differs structurally, name exactly where and why.
e) ASK-WEIGHT TEST: 5 functional asks (G-1,G-2,G-3,G-5,G-8) were needed to cover value's routes. Is
   that ordinary consumer-driven maturation of a young primitive, or evidence the abstraction has the
   wrong center? Argue from what the asks ARE, not their count.
${EVIDENCE}${LAWS}
Return ONLY the structured object. Your final text IS the data.`

phase('Workers')
const [wf, wo] = await parallel([
  () => agent(BRIEF('worker-F (Fable seat)'), { model: 'fable', label: 'wF:chassis', phase: 'Workers', schema: VERDICT_SCHEMA }),
  () => agent(BRIEF('worker-O (Opus seat)'), { model: 'opus', label: 'wO:chassis', phase: 'Workers', schema: VERDICT_SCHEMA }),
])
if (!wf && !wo) return { failed: 'both workers died — NO verdict; the question stands OPEN, not clean' }

phase('Apotheosis')
const arb = await agent(`You are arbiter-F in the M-12 tri-fold on InstrumentChassis fitness
(value.js mega-tranche). Two independent interrogators prosecuted the chassis adoption blind to each
other. Their full returns:

=== WORKER-F (Fable) ===
${wf ? JSON.stringify(wf, null, 1) : 'SEAT DIED — arbitrate on worker-O alone and SAY SO.'}

=== WORKER-O (Opus) ===
${wo ? JSON.stringify(wo, null, 1) : 'SEAT DIED — arbitrate on worker-F alone and SAY SO.'}

YOUR TASK — the apotheosis, with sagacity and incredulity (L-14):
1) Attempt to REFUTE both workers before adopting either. Re-derive at least three of their
   load-bearing claims against the tree yourself (the installed dist bytes, a consumer file, a value
   route template). Where they agree suspiciously well, spot-check the agreement. Where they disagree,
   RULE with the evidence that decided it.
2) The owner asked a direct question and is entitled to a direct, terminal answer: overfit garbage,
   or a pattern worth extraction? Rule ADOPT-AS-SHIPPED / ADOPT-WITH-ASKS / HYBRID / BESPOKE and carry
   the consequences: the 18-route table, waves V·L1..V·L4, the sent O-10 packet, and canon
   VISUAL-CONSTITUTION.md §38 (state whether your ruling AFFIRMS canon or petitions to amend it —
   you cannot amend canon yourself; only the owner can).
3) WRITE the apotheosis to docs/tranches/V/megatranche/registry/adjudicated/chassis-fitness.md:
   the ruling with deciding evidence, per-test outcomes (knob/override/content-shape/bespoke-delta/
   ask-weight), both workers' verdicts and your refutations, consequences, and a DISSENT section
   preserving the strongest surviving argument against the ruling verbatim.
${EVIDENCE}${LAWS}
Return ONLY the structured summary. apotheosisPath must be the file you actually wrote.`,
  { model: 'fable', label: 'arb:chassis', phase: 'Apotheosis', schema: APOTHEOSIS_SCHEMA })

if (arb) log(`CHASSIS RULING: ${arb.ruling} · wF=${arb.workerFVerdict} wO=${arb.workerOVerdict} · ${arb.apotheosisPath}`)
return { workerF: wf ? wf.verdict : 'DIED', workerO: wo ? wo.verdict : 'DIED', apotheosis: arb }
