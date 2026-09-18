export const meta = {
  name: 'trifold-library-band',
  description: 'Library audit: 4 Opus sweep seats over value src / keyframes / fourier / parse-that surfaces, then an M-12 tri-fold synthesis',
  phases: [{ title: 'Sweeps' }, { title: 'Synthesis' }, { title: 'Apotheosis' }],
}
const LAW = `
## LAW: model receipt (modelObserved, exact id) FIRST FIELD. L-9 scope every count to source (exclude
node_modules/dist/test-results). L-10 re-measure inherited claims. READ-ONLY everywhere except
docs/tranches/V/megatranche/ and scratch. No deferrals: findings map to wave shapes with born-RED gates
(command + the input that makes it RED). Concrete deliverables only: file:line, a runnable command, a
named defect. The registry rows that already exist are NOT re-found: read
docs/tranches/V/megatranche/registry/ROOT-FINDINGS.md + DISEASE-REGISTRY.md + DEFECT-LEDGER.md first
and cite rows instead of duplicating them — NEW findings only.`
const SWEEPS = [
  { key: 'value-src', prompt: `Audit the value.js LIBRARY surface: /Users/mkbabb/Programming/value.js/src (26 files, 4654 lines)
+ package.json exports (7 subpaths, no root — deliberate). Judge module topology (css/ color/ transform/ foundation/ subpaths/),
public-surface coherence (./value exports exactly ONE symbol — right-sized or vestigial?), the 141 indexed-access non-null
assertions (census banked in MT-F024 — judge the per-file populations and which files' totality contracts make them dangerous
vs benign), stylesheet.ts at 899 lines vs the god-module law (DR-18 context), dead/duplicated code, and API isomorphism
readiness vs fourier (owner ruling D-15 fourier FIRST-CLASS). Return: findings[] each {id,severity,defect,evidence,mechanism,waveShape}.` },
  { key: 'keyframes-consumer', prompt: `Audit keyframes.js AS A CONSUMER of value.js: /Users/mkbabb/Programming/keyframes.js (master, 6.0.0,
exact-pinned value 4.0.0). The 61 value.js import sites (29 /css, 15 /value, 7 /color, 5 /math, 3 /easing, 2 /transform):
is the consumed surface coherent, minimal, right-homed? The 5 affected-function call sites (parseCssScalar x4 at
resolve/browser.ts:3,165 + engine/options.ts:17,31; parseCssValues x2 at compile/value-ast.ts:1,71) — can degenerate input
REACH them (trace the callers honestly; do not assume). The frozen-surface fence (TimingFunction home/name/signature — IN-ATLAS-3)
and what a value 4.1 could safely add (SCI-1 into-variants, D-GAP-6 sampleBezier conditional). NO writes outside value.js megatranche docs.
Return findings[] as above + a reachability verdict per call site.` },
  { key: 'fourier-parsethat', prompt: `Two surfaces. (1) fourier-analysis (/Users/mkbabb/Programming/fourier-analysis, branch m/w1-bump-migration):
its value.js consumption (measured 0 direct src imports — verify), the D-15 FIRST-CLASS isomorphism obligation (what would a
first-class value<->fourier API pairing require of VALUE's surface — name the exact symbols/signatures), and drift risks.
(2) parse-that (/Users/mkbabb/Programming/parse-that, master, published 1.0.0): the API surface our parser prototypes consumed
(Parser<T> combinators, leaves, lazy, memoize/PACKRAT_ARMED) — is anything the cand-o winner needs missing/awkward/underspecified
(read docs/tranches/V/megatranche/registry/adjudicated/parser-band.md §debts first)? P00/P01 boundary: consume only published
1.0.0; upstream novelties transfer no authority. Return findings[] + the isomorphism symbol table.` },
  { key: 'api-band', prompt: `Audit api/src (/Users/mkbabb/Programming/value.js/api/src, ~10.9k lines, Hono+MongoDB): does tranche L's
discipline still hold (as any = 0, as unknown as = 1 — re-measure), module boundaries (crud/ lib/ ownership.ts models.ts),
the (visibility,tier) model coherence, DR-33 context (the Idempotency-Key per-process LRU vs promised-durable), DR-28 context
(palette truth UI half), and dead surface (routes with no live consumer in demo/). The api is NOT runnable here (mongo down)
— static analysis + the committed api test suite structure only; say so where liveness matters. Return findings[] as above.` },
]
const FSCHEMA = { type:'object', additionalProperties:false, required:['modelObserved','key','findings'],
  properties:{ modelObserved:{type:'string'}, key:{type:'string'},
    findings:{type:'array',items:{type:'object',additionalProperties:false,
      required:['id','severity','defect','evidence'],
      properties:{ id:{type:'string'}, severity:{enum:['BLOCKER','MAJOR','MINOR','INFO']},
        defect:{type:'string'}, evidence:{type:'string'}, mechanism:{type:'string'}, waveShape:{type:'string'} }}},
    extra:{type:'string'} } }
phase('Sweeps')
const sweeps = (await parallel(SWEEPS.map(s => () =>
  agent(`You are the ${s.key} sweep seat (Opus, mechanical/novelty band) of the value.js mega-tranche library audit.\n${s.prompt}\n${LAW}\nYour final text is the structured object only.`,
    { model:'opus', label:`sweep:${s.key}`, phase:'Sweeps', schema:FSCHEMA })))).filter(Boolean)
if (!sweeps.length) throw new Error('all library sweeps died')
const corpus = JSON.stringify(sweeps, null, 1)
phase('Synthesis')
const SYN = (seat) => `You are ${seat} in the M-12 tri-fold synthesis of the library band. The four sweep
returns (raw, complete):\n${corpus}\n\nSynthesize the LIBRARY PROGRAM: verify-or-refute each sweep finding you rely on
(spot-check evidence against the tree yourself), then design the library wave band — module topology rulings, the
public-surface law, the value<->fourier isomorphism shape, the value-4.1 additive set, the api dispositions — as wave
specs per docs/tranches/V/megatranche/FORMATION-LAWS.md (born-RED gates with commands). Consistency duty: must not
contradict the adjudicated parser band (registry/adjudicated/parser-band.md) or the disease registry dispositions.
Write your full program to docs/tranches/V/megatranche/design/library-band-${seat.includes('F')?'worker-f':'worker-o'}.md.
${LAW} Return {modelObserved, programPath, headline, waveCount, keyRulings:[...]} only.`
const SSCHEMA={type:'object',additionalProperties:false,required:['modelObserved','programPath','headline','waveCount','keyRulings'],
  properties:{modelObserved:{type:'string'},programPath:{type:'string'},headline:{type:'string'},waveCount:{type:'integer'},
    keyRulings:{type:'array',items:{type:'string'}}}}
const [sf, so] = await parallel([
  () => agent(SYN('worker-F (Fable)'), { model:'fable', label:'syn-F', phase:'Synthesis', schema:SSCHEMA }),
  () => agent(SYN('worker-O (Opus)'), { model:'opus', label:'syn-O', phase:'Synthesis', schema:SSCHEMA }),
])
if (!sf && !so) throw new Error('both synthesis workers died')
phase('Apotheosis')
const arb = await agent(`You are arbiter-F (M-12/L-14) over the library-band syntheses.
WORKER-F: ${sf?JSON.stringify(sf):'DIED — rule on worker-O alone, say so.'}
WORKER-O: ${so?JSON.stringify(so):'DIED — rule on worker-F alone, say so.'}
Read both full programs at their programPath values AND the four sweep returns embedded in their briefs.
Refute both before adopting either; re-measure every decisive number; rule every disagreement with the
evidence that decided it; spot-check suspicious agreement. WRITE the apotheosis to
docs/tranches/V/megatranche/registry/adjudicated/library-band.md — final module rulings, the wave specs
(born-RED, completable-alone), coordination consequences (keyframes/atlas/fourier/parse-that packets owed,
if any), and DISSENT verbatim. ${LAW}
Return {modelObserved, apotheosisPath, headline, ruledDisagreements:[...], packetsOwed:[...]} only.`,
  { model:'fable', label:'arb-library', phase:'Apotheosis',
    schema:{type:'object',additionalProperties:false,required:['modelObserved','apotheosisPath','headline','ruledDisagreements','packetsOwed'],
      properties:{modelObserved:{type:'string'},apotheosisPath:{type:'string'},headline:{type:'string'},
        ruledDisagreements:{type:'array',items:{type:'string'}},packetsOwed:{type:'array',items:{type:'string'}},dissent:{type:'string'}}} })
log(`library apotheosis: ${arb && arb.apotheosisPath} — ${arb && arb.headline}`)
return { sweeps: sweeps.map(s=>({key:s.key,findings:s.findings.length})), synthesis:{F:!!sf,O:!!so}, apotheosis: arb }
