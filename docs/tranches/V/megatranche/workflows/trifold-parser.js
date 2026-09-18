export const meta = {
  name: 'trifold-parser-band',
  description: 'M-12 tri-fold over the M-9 requirement: Fable + Opus each build a RUNNING idiomatic parse-that CSS-colour parser; a Fable arbiter adjudicates on measurement',
  phases: [{ title: 'Candidates' }, { title: 'Apotheosis' }],
}
const WS = 'docs/tranches/V/megatranche/prototypes/css-parser'
const CAND_SCHEMA = { type:'object', additionalProperties:false,
  required:['modelObserved','dir','testsPassing','testsTotal','totalityClean','notes'],
  properties:{ modelObserved:{type:'string'}, dir:{type:'string'},
    testsPassing:{type:'integer'}, testsTotal:{type:'integer'},
    totalityClean:{type:'boolean'}, benchNote:{type:'string'}, notes:{type:'string'} } }
const brief = (seat, dir) => `You are ${seat} in the M-12 tri-fold on the M-9 requirement:
"properly prototyped parser items, with idiomatic parse-that usage."

WORKSPACE: /Users/mkbabb/Programming/value.js/${WS} — installed with @mkbabb/parse-that@1.0.0, vitest, tsx,
strict tsconfig (noUncheckedIndexedAccess, verbatimModuleSyntax). Work ONLY inside ${WS}/${dir}/ (create it).
NEVER touch src/ demo/ api/ test/ e2e/ or docs/tranches/V/vnext/.

GROUND (read first): docs/tranches/V/megatranche/registry/harvest/parser-band.json — the completed
denominator + idiom studies. Idiom: Parser<T> combinators (then/or/chain/map/skip/next/opt/trim/sepBy/eof),
leaves (string/regex/any/all), lazy, memoize behind PACKRAT_ARMED. Standing measured evidence, to be treated
with respect not deference: the LIVE regex parser measured FASTEST (~1.8x) in the prior gate.

BUILD a RUNNING idiomatic parse-that parser for CSS <color> (hex, named, rgb()/rgba(), hsl()/hwb(),
lab()/lch()/oklab()/oklch(), color(), none, percent/number/angle channels, alpha slash, legacy commas).
It must be TOTAL: (source: string) => ParseResult-shaped result, NEVER throws — the R1 corpus
(rgb(), hsl(  ), oklch(/), every empty-argument form) returns ok:false. Write vitest tests: the R1/totality
corpus, a CSS-L4 positive corpus (>=40 cases incl. clamping/none), and an equivalence spot-set vs the
published parseCssColor from @mkbabb/value.js/css where its behaviour is CORRECT (its throws are the defect
MT-F024 — your parser must NOT reproduce them). Run the tests; report true counts. Add a micro-bench vs the
published parseCssColor (hot loop, honest note on method). MODEL RECEIPT first field. Your final text is data.`
phase('Candidates')
const [cf, co] = await parallel([
  () => agent(brief('candidate-F (Fable — the toughest-design seat)', 'cand-f'),
    { model:'fable', label:'cand-F', phase:'Candidates', schema:CAND_SCHEMA }),
  () => agent(brief('candidate-O (Opus — the novelty/implementation seat)', 'cand-o'),
    { model:'opus', label:'cand-O', phase:'Candidates', schema:CAND_SCHEMA }),
])
if (!cf && !co) throw new Error('both parser candidates died')
phase('Apotheosis')
const arb = await agent(`You are arbiter-F (M-12 tri-fold, L-14) over the two parser candidates.
CANDIDATE-F: ${cf ? JSON.stringify(cf) : 'DIED — rule on candidate-O alone and say so.'}
CANDIDATE-O: ${co ? JSON.stringify(co) : 'DIED — rule on candidate-F alone and say so.'}
Workspace: /Users/mkbabb/Programming/value.js/${WS}. Adjudicate ON MEASUREMENT, with incredulity:
re-run BOTH candidates' test suites yourself (npx vitest run in each dir); run BOTH against the R1 totality
corpus; sanity-bench both vs the published parseCssColor AND vs each other; read both parsers for idiom
quality (is it parse-that used idiomatically, or a regex wearing combinators?). Rule a winner or a synthesis;
state exactly what the winning design owes the loser. WRITE the apotheosis to
docs/tranches/V/megatranche/registry/adjudicated/parser-band.md: verdicts, measured tables (pasted), the
recommended wave spec for the parser waves (born-RED gates incl. the existing
audit/probes/r1-published-totality.mjs), and DISSENT preserving unresolved disagreement. Honesty law: if the
regex parser remains fastest, SAY SO and let the wave spec argue adoption on totality+maintainability, not
speed theater. MODEL RECEIPT first field. Return the structured summary only.`,
  { model:'fable', label:'arb-parser', phase:'Apotheosis',
    schema:{ type:'object', additionalProperties:false,
      required:['modelObserved','winner','apotheosisPath','headline'],
      properties:{ modelObserved:{type:'string'}, winner:{enum:['cand-f','cand-o','synthesis','neither']},
        apotheosisPath:{type:'string'}, headline:{type:'string'},
        measuredNote:{type:'string'}, dissent:{type:'string'} } } })
log(`parser apotheosis: ${arb && arb.winner} — ${arb && arb.headline}`)
return { candidateF: cf, candidateO: co, apotheosis: arb }
