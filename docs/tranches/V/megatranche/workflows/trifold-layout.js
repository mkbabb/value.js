export const meta = {
  name: 'trifold-layout-gestalt',
  description: 'M-13 via M-12: Fable + Opus independently design the one-layout-where-befitting mobile/desktop system; a Fable arbiter agglomerates the apotheosis',
  phases: [{ title: 'Designers' }, { title: 'Apotheosis' }],
}
const BRIEF = (seat) => `You are ${seat} in the M-12 tri-fold executing owner mark M-13 (the layout
gestalt) for value.js (repo /Users/mkbabb/Programming/value.js, branch tranche-u). THIS IS A DESIGN
BAND — no source edits; your deliverable is a design + wave specs. You may write ONLY under
docs/tranches/V/megatranche/ and scratch dirs.

THE OWNER'S CHARTER (verbatim in intent): on all pages the mobile variants must better take up
space — the full width (handling pathologically wide screens) and height; bespoke and optimized for
mobile. Without contrivance or extra complexity: an elegant mobile AND desktop solution — ONE layout
where befitting, a perfectly optimized variant per platform when otherwise. Only the most modern
layout facilities.

READ FIRST (the measured ground — do not re-derive what is banked, verify what you doubt):
- docs/tranches/V/megatranche/registry/ROOT-FINDINGS.md — MT-F028 (the baseline: mobile shows ~8% of
  desktop content with 73-88% height coverage; ultrawide content coverage 65% at 3440 from the
  shell.css:69-71 pane-max cap; THREE parallel adaptation mechanisms: 34 @media + Tailwind lg: fork +
  JS isMobile fork; ONE container-type at shell.css:83 feeding 18 cqi consumers). Also MT-F022 #4
  (200%-zoom = the mobile code path, and reflow there is CORRECT — do not regress it).
- docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md rows for App (D-1 inert mobile action bar from
  per-breakpoint slot plumbing; D-2 the dual-pane architecture retired by the VISUAL-CONSTITUTION with
  the mobile pane-selector named a retired pattern; D-3 the 50/50 split vs golden/preview-dominant
  canon) and ConfigSliderPane D-2 (/blob's configurator display:none below 1024 — the route's purpose
  unreachable on mobile).
- The canon the challengers cite: find and read the VISUAL-CONSTITUTION sections on region
  composition/InstrumentChassis — verify the citations yourself; a challenger quoting canon is not
  the canon.
- demo/styles/shell.css + demo/color-picker/App.vue + demo/shell/viewSchema.ts — the live mechanisms.
- The live app at http://localhost:9000 (API-less; geometry probing is valid, data states are not).
  Real Safari via safaridriver :4599 if a Safari-specific check is decisive. Probe parsimoniously.

DESIGN THE SYSTEM. Required properties:
1. Per route: is ONE composition sufficient (fluid, container-driven), or does this route earn a
   bespoke mobile composition? Decide per route with a stated reason — the owner banned both
   contrivance AND lazy uniformity.
2. Mobile: full-width AND full-height usage — dvh/svh discipline, no amputated content: every
   route's purpose must be exercisable at 390px (ConfigSliderPane's display:none is the anti-pattern).
3. Pathologically wide: state the law for >2000px (fluid growth? content-max with EARNED margin?
   multi-column density?) — 65% dead coverage is the RED input; whatever you choose must be a
   decision, not a leftover cap.
4. ONE adaptation mechanism to replace the three. Modern facilities only: container queries + cq
   units on the route scene, grid (minmax/clamp/auto-fit, subgrid or template-areas where they
   DELETE wrappers), :has() where it removes JS, dvh/svh. Every facility choice justified by what it
   deletes — the design must end with FEWER mechanisms and FEWER lines than today.
5. Respect the boundaries: glass-ui owns chassis primitives (InstrumentChassis etc.) — anything the
   design needs from glass is a coordination ask, not a local build. No wrapper components
   (feedback_kiss_no_contrivance), no new shared/ dirs, no fourth mechanism.

DELIVERABLE (write it): docs/tranches/V/megatranche/design/layout-gestalt-${seat.includes('F') ? 'worker-f' : 'worker-o'}.md —
the per-route composition table (route x {one-layout | bespoke-mobile}, with reasons), the mechanism
law, the ultrawide law, exemplar CSS for the 2 hardest routes (sketch-grade, honest about unknowns),
the glass asks if any, and 2-4 wave specs in the FORMATION-LAWS template (born-RED gates keyed to
MT-F028's numbers: e.g. content-width coverage >= 90% at 3440, route-purpose exercisable at 390).
MODEL RECEIPT first field. Your final text is the structured summary only.`
const SCHEMA = { type:'object', additionalProperties:false,
  required:['modelObserved','designPath','mechanismLaw','ultrawideLaw','bespokeRoutes','oneLayoutRoutes','glassAsks','headline'],
  properties:{ modelObserved:{type:'string'}, designPath:{type:'string'},
    mechanismLaw:{type:'string'}, ultrawideLaw:{type:'string'},
    bespokeRoutes:{type:'array',items:{type:'string'}}, oneLayoutRoutes:{type:'array',items:{type:'string'}},
    glassAsks:{type:'array',items:{type:'string'}}, headline:{type:'string'} } }
phase('Designers')
const [df, dob] = await parallel([
  () => agent(BRIEF('worker-F (Fable — the design seat)'), { model:'fable', label:'design-F', phase:'Designers', schema:SCHEMA }),
  () => agent(BRIEF('worker-O (Opus — the design seat)'), { model:'opus', label:'design-O', phase:'Designers', schema:SCHEMA }),
])
if (!df && !dob) throw new Error('both designers died')
phase('Apotheosis')
const arb = await agent(`You are arbiter-F (M-12/L-14) over two independent M-13 layout designs.
WORKER-F: ${df ? JSON.stringify(df) : 'DIED — rule on worker-O alone and say so.'}
WORKER-O: ${dob ? JSON.stringify(dob) : 'DIED — rule on worker-F alone and say so.'}
Read BOTH full design docs at their designPath values. With sagacity and incredulity: refute both
before adopting either — test each design against MT-F028's numbers, the owner's no-contrivance ban,
the retired-pattern rows (App D-2), and the 200%-zoom invariant (MT-F022 #4: mobile path is also the
zoom path — a design that breaks zoom reflow is REFUTED). Where they disagree (per-route bespoke vs
one-layout calls, the ultrawide law, the mechanism), RULE with the evidence that decided it. Spot-check
suspicious agreement. Then WRITE the apotheosis to
docs/tranches/V/megatranche/registry/adjudicated/layout-gestalt.md: the final per-route table, the ONE
mechanism law, the ultrawide law, the exemplar CSS (corrected best-of-both), the glass asks, the final
wave specs (born-RED gates with commands + the inputs that make them RED — keyed to
audit/probes/layout-utilization.mjs re-runs), and DISSENT verbatim. MODEL RECEIPT first field.`,
  { model:'fable', label:'arb-layout', phase:'Apotheosis',
    schema:{ type:'object', additionalProperties:false,
      required:['modelObserved','apotheosisPath','headline','ruledDisagreements'],
      properties:{ modelObserved:{type:'string'}, apotheosisPath:{type:'string'}, headline:{type:'string'},
        ruledDisagreements:{type:'array',items:{type:'string'}}, dissent:{type:'string'} } } })
log(`layout apotheosis: ${arb && arb.apotheosisPath} — ${arb && arb.headline}`)
return { workerF: df, workerO: dob, apotheosis: arb }
