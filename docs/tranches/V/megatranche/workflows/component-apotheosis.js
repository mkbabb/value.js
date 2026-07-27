export const meta = {
  name: 'component-apotheosis',
  description: 'One component: three hostile challengers on orthogonal flaw axes, then a triumvirate jury that re-authors the addendum and wave spec',
  whenToUse: 'Invoked per component by an area orchestrator via workflow({scriptPath}, {component,...}).',
  phases: [
    { title: 'Challenge', detail: 'design-flawed / library-misstructured / component-misimplemented', model: 'opus' },
    { title: 'Jury', detail: 'triumvirate adjudicates and re-authors spec', model: 'opus' },
  ],
}

const a = (typeof args === 'string' ? JSON.parse(args) : args) || {}
if (!a.file || !a.slug) {
  throw new Error(`component-apotheosis: missing file/slug. args typeof=${typeof args}, keys=${Object.keys(a).join(',')}`)
}
const FILE = a.file
const SLUG = a.slug
const AREA = a.area || 'unknown'
const LOC = a.loc || '?'
const OUT = `docs/tranches/V/megatranche/audit/components/${SLUG}`
const VISUAL = 'docs/tranches/V/megatranche/audit/visual'
const EXTRA = a.extra || ''

const BASE = `
Repository: /Users/mkbabb/Programming/value.js (branch tranche-u, HEAD c654824e).
Subject component: \`${FILE}\` (~${LOC} lines, area ${AREA}).

## Standing law for every seat in this workflow
- Begin your written report with "## Model receipt" naming the model you observe yourself to be.
  You were spawned with an explicit Opus 5 declaration. An undeclared or inherited seat is a DEFECT.
- **You may write ONLY under \`${OUT}/\`.** Create it if needed. You may READ anything.
  You may NOT edit \`src/\`, \`demo/\`, \`api/\`, \`test/\`, \`e2e/\`,
  \`docs/tranches/V/vnext/**\` (Codex-owned READ-ONLY), \`scripts/dev/dev.sh\`, or any \`INBOX.md\`.
  **No source edits land from this formation at all.**
- Evidence law: file:line, a command you ran with pasted output, a measured number, or a quoted
  spec. "Appears to", "should be", "could be improved" are noise. A finding without a reproduction
  is a hypothesis and must be labelled one.

## Standing owner edicts this component must satisfy (violations are findings)
1. **No god modules** — never add to one; focused modules with real encapsulation.
2. **No legacy code** — no aliases, migration shims, dual paths, masking fallbacks, back-compat.
3. **KISS, no contrivance** — no new shared/ dirs or wrapper components that do not already exist.
4. **Glass-ui is the design system** — variants/primitives belong in glass-ui, not in demo/ui/.
   Reuse existing component-type names. glass-ui is at \`@mkbabb/glass-ui@^7.0.0\`.
5. **Root-level styling** — style at the shadcn/glass root component level, never per-instance overrides.
6. **Animations are never deleted**, only moved or tokenized. Global keyframes live in
   \`demo/styles/\`; scoped keyframes may remain in components.
7. **Idiomatic Vue 3.5** — \`useTemplateRef\`, reactive props destructure, \`shallowRef\` where the
   \`defineModel\` async round-trip would return stale reads.
8. **\`verbatimModuleSyntax\`** — every type-only import must be \`import type\`.

## Live evidence available to you
- \`${VISUAL}/REPORT.md\` and \`${VISUAL}/REPORT.json\` — Safari desktop+mobile, light+dark capture of
  every route, with per-route console errors, page errors, horizontal overflow, tap-target and
  accessible-name defects. **Read it and find the rows that involve this component's routes.**
- \`${VISUAL}/shots/<matrix>/<route>.png\` — the actual screenshots. **Read the relevant images.**
  You have vision. Look at them. A component that renders wrong is a finding no code read produces.
- The dev server is LIVE at http://localhost:9000 — you may drive it read-only with Playwright or
  the Chrome DevTools MCP for fine-grained telemetry (traces, network, console, Lighthouse).
  Be parsimonious with browser probes: they are expensive; use them where they decide something.
${EXTRA}
`

const CHALLENGE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['axis', 'modelObserved', 'reportPath', 'verdict', 'defects', 'strongestDefect', 'negativeProof'],
  properties: {
    axis: { type: 'string' },
    modelObserved: { type: 'string' },
    reportPath: { type: 'string' },
    verdict: { type: 'string', enum: ['DEFECTIVE', 'DEFECTIVE_MINOR', 'SOUND'] },
    defects: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'defect', 'severity', 'evidence', 'mechanism', 'reproduction', 'proposedCure'],
        properties: {
          id: { type: 'string' },
          defect: { type: 'string' },
          severity: { type: 'string', enum: ['BLOCKER', 'MAJOR', 'MINOR', 'INFO'] },
          evidence: { type: 'string', description: 'file:line or pasted command output or measured number' },
          mechanism: { type: 'string', description: 'the underlying defect mechanism, for family grouping' },
          reproduction: { type: 'string', description: 'the exact steps or input that exhibits it; or NONE if this is a hypothesis' },
          proposedCure: { type: 'string', description: 'the idiomatic, gestalt cure — architectural transposition preferred over patch' },
        },
      },
    },
    strongestDefect: { type: 'string' },
    negativeProof: { type: 'string', description: 'if verdict is SOUND, the positive evidence that proves the negative' },
  },
}

const AXES = [
  {
    key: 'D',
    label: 'design-flawed',
    brief: `# CHALLENGE-D — assume THE DESIGN IS FLAWED

You are told, as a premise, that this component's **design** is wrong. Your seat exists to find how.
Do not begin by looking for reasons it is fine.

Interrogate:
- **Visual truth first.** Open the Safari screenshots for the routes this component appears on, at
  desktop AND mobile, light AND dark. Does it actually look right? Alignment, rhythm, optical
  balance, contrast, density, hierarchy, the dark-mode treatment. Name what is ugly or wrong and
  say why in design terms, not vibes.
- **State coverage.** Enumerate EVERY state this component can be in: empty, loading, populated,
  error, disabled, focused, hovered, active, pressed, selected, dragging, overflowing, truncated,
  RTL, reduced-motion, forced-colors, zoomed to 200%. Which states are unhandled, unstyled, or
  visually broken? A state that was never designed is a design defect.
- **Motion.** Does it animate? Is the motion tokenized (\`--animation-slide-sm/md/lg\`) or ad hoc?
  Does it respect \`prefers-reduced-motion\`? Does it animate a property that forces layout?
- **The design system boundary.** Does it reach past glass-ui to hand-roll something glass-ui
  already provides, or per-instance-override a root that should have been styled at the root?
- **Proportion and seat law.** The tranche canon has a proportion register and a seat law
  (\`docs/tranches/V/PROPORTION-AUDIT.md\`, \`VISUAL-CONSTITUTION.md\`, \`PALETTE-CONTRACT.md\`).
  Read them and judge this component against them.

Write \`${OUT}/challenge-D-design.md\`.
${BASE}`,
  },
  {
    key: 'L',
    label: 'library-misstructured',
    brief: `# CHALLENGE-L — assume THE LIBRARY IS IMPROPERLY STRUCTURED

You are told, as a premise, that the **library structure** underneath this component is wrong —
wrong module boundaries, wrong ownership, wrong direction of dependency, wrong public surface.
Your seat exists to find how.

Interrogate:
- **What does this component import, and should it?** Trace every import to its home. Is any of it
  reaching across a boundary it should not cross (feature → shell, component → boot, demo → deep
  internal of \`src/\`)? Record the exact violating edge.
- **Does it import from \`@mkbabb/value.js\` correctly** — through the published subpath export map,
  or through a deep path that only works because the demo shares the repo? The published surface is
  in \`package.json\` \`exports\` + \`src/subpaths/\`. A demo import that a real consumer could not
  write is a library-structure defect and a false proof of the public API.
- **Ownership duplication.** Is logic here that belongs in \`src/\` (the library), or in a composable,
  or in glass-ui? Conversely, is library code doing something that is really this component's job?
  Unique semantic ownership is the invariant: exactly one home per concept.
- **God modules and dual paths.** Is this component or its composables a god module? Is there a
  second implementation of the same concept alive elsewhere? Named historical suspects:
  \`ActionBarLayer\`'s local reimplementation of the removed \`useLayerTransition\`;
  \`demo/palettes/export.ts\` + \`usePaletteExport.ts\` vs \`export/serializers\`;
  three parallel \`useDark\` stores (see \`demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:76\`).
- **Modularization.** If you were structuring this greenfield today with no legacy, what would the
  module lattice be? State it concretely. Architectural transposition for elegance, simplicity and
  performance is explicitly desirable — propose it, do not hedge it.

Write \`${OUT}/challenge-L-library.md\`.
${BASE}`,
  },
  {
    key: 'C',
    label: 'component-misimplemented',
    brief: `# CHALLENGE-C — assume THE COMPONENT IS IMPROPERLY IMPLEMENTED

You are told, as a premise, that this component's **implementation** is defective. Your seat exists
to find the bug, not to admire the code.

Interrogate:
- **Read the whole file.** Then read its composables, its styles, and its tests. Find the actual
  bugs: stale reads, races, unguarded async, missing cleanup, leaked listeners/observers/rAF loops,
  unbounded growth, reactivity that will not fire, reactivity that fires too often.
- **The known local hazards** (these are real, from this repo's record — check for each):
  · \`defineModel()\` returns a \`WritableComputedRef\` with an async parent round-trip, so reads after
    writes return STALE data; the cure is a local \`shallowRef\` synchronous cache.
  · oklch→HSV roundtrip loses hue at low chroma (\`Math.atan2(0,0)=0\`); \`stableHue\` is the source of truth.
  · \`ValueUnit\` nesting accumulation — anything that wraps a possibly-already-wrapped value.
  · reka-ui slider pointer-capture leaks needing \`pointercancel\`/\`lostpointercapture\` recovery.
  · ungated \`requestAnimationFrame\` loops (the constellation-wide PRM-RAF epidemic, ~40 sites).
  · WebGL context loss / eager WebGL boot on the critical path.
- **Error paths.** What happens on network failure, on malformed input, on an empty collection, on
  a value at the domain boundary (0, 1, NaN, Infinity, negative zero, huge)? Try them. The repo has
  a live \`parseCssColor\` crash class in its record — check anything that parses.
- **Accessibility as implementation.** Roles, names, keyboard operability, focus management and
  restoration, \`aria-live\` for async results, tap targets ≥24px. The visual REPORT has measured
  nameless-button and small-tap-target counts — find this component's contribution.
- **Performance.** Does it do work per frame, per keystroke, per reactive tick that it could do
  once? Measure if you can (Chrome DevTools MCP trace against http://localhost:9000).
- **Test truth.** Do this component's tests exist? Would they FAIL if the component were broken?
  Name the exact mutation that would keep them green. That is a vacuous-gate finding.

Write \`${OUT}/challenge-C-implementation.md\`.
${BASE}`,
  },
]

phase('Challenge')
const challenges = (
  await parallel(
    AXES.map((ax) => () =>
      agent(ax.brief, {
        label: `${SLUG}:chal-${ax.key}`,
        phase: 'Challenge',
        model: 'opus',
        effort: 'xhigh',
        schema: CHALLENGE_SCHEMA,
      }),
    ),
  )
).filter(Boolean)

const allDefects = challenges.flatMap((c) => (c.defects || []).map((d) => ({ axis: c.axis, ...d })))
log(`${SLUG}: ${challenges.length}/3 challengers · ${allDefects.length} defects (${allDefects.filter((d) => d.severity === 'BLOCKER').length} blockers)`)

const dossier = challenges
  .map(
    (c) =>
      `### CHALLENGE-${c.axis} — ${c.verdict} — ${c.reportPath}\nSTRONGEST: ${c.strongestDefect}\n` +
      (c.verdict === 'SOUND' ? `NEGATIVE PROOF: ${c.negativeProof}\n` : '') +
      (c.defects || [])
        .map(
          (d) =>
            `- [${d.severity}] ${d.id}: ${d.defect}\n    mechanism: ${d.mechanism}\n    evidence: ${d.evidence}\n    repro: ${d.reproduction}\n    proposed cure: ${d.proposedCure}`,
        )
        .join('\n'),
  )
  .join('\n\n')

const JURY_BASE = `
You are a juror in the triumvirate adjudicating \`${FILE}\`.

Three hostile challengers were each told, as a premise, that the component is defective on their
axis — design (D), library structure (L), implementation (C). Their full reports are on disk:
  ${OUT}/challenge-D-design.md
  ${OUT}/challenge-L-library.md
  ${OUT}/challenge-C-implementation.md
**Read them on disk.** The dossier below is an index, not a substitute.

## Your duty — and it is not rating
You adjudicate AND **re-author**. A juror who returns a verdict without a rewritten spec has not
discharged the seat. Your product is an addendum clause and a wave spec that could be executed
tomorrow by someone who never read the challenges.

## Adjudication law
- A challenger began from a premise of guilt. Correct for that: a defect asserted without a
  reproduction is a HYPOTHESIS, and you mark it so. A defect with bytes and a repro is UPHELD
  regardless of how minor it sounds.
- Two challengers describing the same underlying mechanism in different words are ONE defect.
  Merge them and name the mechanism.
- You may DISMISS a challenge only by citing the bytes that refute it.
- Disagreement among jurors is preserved explicitly. No vote manufactures truth.
- **Born-RED law:** if the defect reproduces against today's tree, the wave you author opens RED and
  its gate must fail TODAY. Write the gate so that running it right now yields RED. A gate that is
  green at authorship is vacuous and you have failed.
- **π/DELTA law:** every visual claim in your spec carries a π obligation (the pinned witness
  capture — matrix, route, selector) and a DELTA obligation (the before/after pair proving change).
- **No re-booking.** Every defect gets BUILD, FOLD (into a named wave), or RETIRE (with rationale).
  You may not write "next tranche decides" or any equivalent.
- **No legacy.** Cures are clean breaks: no aliases, shims, dual paths, or masking fallbacks.
  Architectural transposition for elegance, simplicity and performance is preferred to a patch.

CHALLENGE DOSSIER:
${dossier}

${BASE}
`

const JURY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['juror', 'modelObserved', 'reportPath', 'verdict', 'upheld', 'dismissed', 'waveSpec', 'addendumClause', 'dissent'],
  properties: {
    juror: { type: 'string' },
    modelObserved: { type: 'string' },
    reportPath: { type: 'string' },
    verdict: { type: 'string', enum: ['APOTHEOSIS_REQUIRED', 'REPAIR_REQUIRED', 'MINOR_REPAIR', 'SOUND_AS_IS'] },
    upheld: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'defect', 'mechanism', 'severity', 'status', 'disposition'],
        properties: {
          id: { type: 'string' },
          defect: { type: 'string' },
          mechanism: { type: 'string' },
          severity: { type: 'string', enum: ['BLOCKER', 'MAJOR', 'MINOR', 'INFO'] },
          status: { type: 'string', enum: ['UPHELD_REPRODUCED', 'UPHELD_BY_BYTES', 'HYPOTHESIS'] },
          disposition: { type: 'string', enum: ['BUILD', 'FOLD', 'RETIRE'] },
        },
      },
    },
    dismissed: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'why', 'refutingBytes'],
        properties: { id: { type: 'string' }, why: { type: 'string' }, refutingBytes: { type: 'string' } },
      },
    },
    waveSpec: {
      type: 'object',
      additionalProperties: false,
      required: ['waveId', 'title', 'bornRed', 'scope', 'gates', 'piObligations', 'deltaObligations'],
      properties: {
        waveId: { type: 'string' },
        title: { type: 'string' },
        bornRed: { type: 'boolean' },
        scope: { type: 'string' },
        gates: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['gate', 'command', 'redToday', 'whatWouldMakeItFail'],
            properties: {
              gate: { type: 'string' },
              command: { type: 'string', description: 'the exact runnable command or probe' },
              redToday: { type: 'boolean', description: 'does this gate fail against the CURRENT tree?' },
              whatWouldMakeItFail: { type: 'string', description: 'the exact input that turns it RED — a gate with no such input is vacuous' },
            },
          },
        },
        piObligations: { type: 'array', items: { type: 'string' } },
        deltaObligations: { type: 'array', items: { type: 'string' } },
      },
    },
    addendumClause: { type: 'string', description: 'the re-authored normative clause, ready to paste into the addenda' },
    dissent: { type: 'string', description: 'where you disagree with the other jurors, or NONE' },
  },
}

phase('Jury')
const jury = (
  await parallel([
    () =>
      agent(
        `# JUROR-1 — CORRECTNESS AND EVIDENCE
Write \`${OUT}/jury-1-correctness.md\`.
Your axis: is each alleged defect REAL? You are the empiricist. Where a challenger claimed a
reproduction, RUN IT. Where a challenger claimed bytes, READ THEM. Where a challenger inferred,
say so. Then author the wave spec whose gates are executable probes, each one RED today if the
defect is live. You own the gate soundness of the final spec: for every gate, name the exact
input that turns it RED, or delete the gate as vacuous.
${JURY_BASE}`,
        { label: `${SLUG}:jury-1`, phase: 'Jury', model: 'opus', effort: 'xhigh', schema: JURY_SCHEMA },
      ),
    () =>
      agent(
        `# JUROR-2 — ARCHITECTURE AND ISOMORPHISM
Write \`${OUT}/jury-2-architecture.md\`.
Your axis: what is the RIGHT structure? You own the library-design and modularization verdict.
Decide the module lattice this component should sit in, the exact ownership of every concept it
touches, and whether the cure is a patch or an architectural transposition — prefer the
transposition where it buys elegance, simplicity or performance. Your wave spec states the
target structure concretely: which files exist afterward, what each owns, which edges are legal.
Kill every dual path and every god module you find; name the deletions explicitly.
${JURY_BASE}`,
        { label: `${SLUG}:jury-2`, phase: 'Jury', model: 'opus', effort: 'xhigh', schema: JURY_SCHEMA },
      ),
    () =>
      agent(
        `# JUROR-3 — DESIGN, GESTALT, AND PERFORMANCE
Write \`${OUT}/jury-3-design-gestalt.md\`.
Your axis: the whole, as experienced. You own the design verdict and the visual obligations.
Look at the screenshots yourself — desktop and mobile, light and dark. Judge the component in its
page, not in isolation: does it cohere with its neighbours, does it hold the proportion and palette
canon, does it degrade honestly at 390px and at 200% zoom. Own the motion verdict and the
performance verdict. Your wave spec's π obligations must name exact matrices, routes and selectors
so a later session can re-capture the identical witness.
This seat is the one that decides whether the component reaches APOTHEOSIS or merely repair.
${JURY_BASE}`,
        { label: `${SLUG}:jury-3`, phase: 'Jury', model: 'opus', effort: 'xhigh', schema: JURY_SCHEMA },
      ),
  ])
).filter(Boolean)

return {
  component: FILE,
  slug: SLUG,
  area: AREA,
  loc: LOC,
  challengeVerdicts: challenges.map((c) => ({ axis: c.axis, verdict: c.verdict, strongest: c.strongestDefect, defectCount: (c.defects || []).length })),
  defects: allDefects,
  juryVerdicts: jury.map((j) => ({ juror: j.juror, verdict: j.verdict, upheldCount: (j.upheld || []).length, dismissedCount: (j.dismissed || []).length, dissent: j.dissent })),
  jury,
  worstVerdict: ['APOTHEOSIS_REQUIRED', 'REPAIR_REQUIRED', 'MINOR_REPAIR', 'SOUND_AS_IS'].find((v) => jury.some((j) => j.verdict === v)) || 'NO_JURY',
  blockers: allDefects.filter((d) => d.severity === 'BLOCKER'),
}
