export const meta = {
  name: 'component-apotheosis',
  description: 'One component: three hostile challengers on orthogonal flaw axes (adjudication happens in separate M-12 tri-fold rounds, not here)',
  whenToUse: 'Invoked per component by an area orchestrator via workflow({scriptPath}, {component,...}).',
  phases: [
    { title: 'Challenge', detail: 'design-flawed / library-misstructured / component-misimplemented', model: 'opus' },
  ],
}
// M-12 EDIT (2026-07-27): the original all-Opus triumvirate jury stage was removed — the owner's
// tri-fold law routes adjudication through trifold-adjudication.js rounds (worker-F + worker-O →
// arbiter-F). Challenge prompts are byte-identical to the original so cached seats replay on resume.

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

return {
  component: FILE,
  slug: SLUG,
  area: AREA,
  loc: LOC,
  // L-15.8: a wall-killed agent() returns null and is filtered above; the parent must never
  // count a <3-seat child as run. This flag is the machine-checkable form of that law.
  complete: challenges.length === 3,
  challengeVerdicts: challenges.map((c) => ({ axis: c.axis, verdict: c.verdict, strongest: c.strongestDefect, defectCount: (c.defects || []).length })),
  defects: allDefects,
  worstVerdict: allDefects.some((d) => d.severity === 'BLOCKER')
    ? 'CHALLENGED-BLOCKER (tri-fold adjudication pending)'
    : allDefects.length
      ? 'CHALLENGED (tri-fold adjudication pending)'
      : challenges.length === 3 ? 'CHALLENGE-CLEAN (3/3 seats, zero rows)' : `INCOMPLETE (${challenges.length}/3 seats)`,
  blockers: allDefects.filter((d) => d.severity === 'BLOCKER'),
}
