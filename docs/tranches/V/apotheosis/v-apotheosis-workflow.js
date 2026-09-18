export const meta = {
  name: 'v-apotheosis',
  description: 'Audit Codex-begotten V-next waves vs edicts; independent Fable formation; union apotheosis',
  phases: [
    { title: 'A: Inventory + Edict Matrix', detail: 'map the frozen Codex formation; extract the edict canon', model: 'opus' },
    { title: 'A: Lens Audits', detail: '8 compliance lenses over the snapshot' },
    { title: 'A: Verdict', detail: 'Fable adjudication of audit findings', model: 'fable' },
    { title: 'B: Truth Sweeps', detail: '8 mechanical repo/transcript/live-probe sweeps', model: 'opus' },
    { title: 'B: Programs', detail: '6 Fable program architects', model: 'fable' },
    { title: 'B: Thrice', detail: '2 skeptics + 1 adjudicator per program', model: 'fable' },
    { title: 'B: Assembly', detail: 'charter + wave registry + owner docket', model: 'fable' },
    { title: 'C: Union', detail: '3 domain unioners', model: 'fable' },
    { title: 'C: Apotheosis', detail: 'the final graded union', model: 'fable' },
  ],
}

// ---- hardcoded configuration (v2: the args object did not reach the v1 run; never rely on args) ----
const S = '/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/apotheosis'
const L1 = '/Users/mkbabb/Programming/value.js/docs/tranches/V/coordination/keyframes-inbox-2026-07-18-vnext-ingestion-prompt.md'
const L2 = '/Users/mkbabb/Programming/value.js/docs/tranches/V/coordination/keyframes-inbox-2026-07-18-vnext-formation-handoff.md'
const ADD = S + '/CONVERSATION-ADDENDA.md'
const SNAP = S + '/snapshot-vnext'
const CORPUS = '/Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/vnext'
const TRANSCRIPTS = '/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-keyframes-js'
const R = {
  value: '/Users/mkbabb/Programming/value.js',
  kf: '/Users/mkbabb/Programming/keyframes-v-exec',
  kfjs: '/Users/mkbabb/Programming/keyframes.js',
  pt: '/Users/mkbabb/Programming/parse-that',
  bbnf: '/Users/mkbabb/Programming/bbnf-lang',
  glass: '/Users/mkbabb/Programming/glass-ui',
  atlas: '/Users/mkbabb/Programming/.p-totality/atlas',
  fourier: '/Users/mkbabb/Programming/fourier-analysis',
}
if (typeof S !== 'string' || !S.startsWith('/')) throw new Error('paths misconfigured')

const LAW = `ISOLATION LAW (absolute): WRITE ONLY inside ${S} (subdirs exist: armA/ armB/ armC/ probe/). Never modify ANY repo file anywhere. Never touch scripts/dev/dev.sh. Never read any path containing "r1-opus-refuted". A GPT-5.6 Codex fleet is ACTIVELY writing /Users/mkbabb/Programming/value.js/docs/tranches/V/vnext/ — never write there, and (unless your task says otherwise) read the FROZEN snapshot at ${SNAP} (frozen 2026-07-19 19:04) instead of the live tree. If a file you are told to read does not exist, note that and continue; never invent content. PROBE PARSIMONY: no dev servers, no builds, no installs into repos (a read-only npx run like madge/dependency-cruiser writing output ONLY to ${S} is allowed).`
const FIREWALL = `INDEPENDENCE FIREWALL: you must NOT read /Users/mkbabb/Programming/value.js/docs/tranches/V/vnext/ nor ${S}/snapshot-vnext nor ${S}/armA — your formation must be independent of the Codex corpus. You MAY read everything else: repos, git history, the two letters, the r2 panel corpus at ${CORPUS} (specific files on demand), and pre-2026-07-18 tranche docs (V-PRIME, CARRY-LEDGER, DECISIONS, VISUAL-CONSTITUTION, etc.).`
const RET = `RETURN (StructuredOutput): model_served = the exact model id from YOUR system prompt (the "You are powered by" line — report what is actually serving you, not what was requested); outfile = absolute path of the file you wrote; summary = <=200 words; key_points = <=12 short bullets of your most load-bearing findings.`
const SEEDS = `THE BINDING CANON (read all three first): the charter letter ${L1}; the context packets ${L2}; the conversation addenda ${ADD} (addenda WIN where they tighten the letters).`

const OUT = { type: 'object', required: ['model_served', 'outfile', 'summary'], properties: {
  model_served: { type: 'string' }, outfile: { type: 'string' }, summary: { type: 'string' },
  key_points: { type: 'array', items: { type: 'string' } }, wave_count: { type: 'number' } } }

const seat = (label, phase, model, effort, prompt) => {
  if (prompt.indexOf('undefined') !== -1) throw new Error('prompt interpolation failure at seat ' + label)
  return agent(prompt, { label, phase, model, effort, schema: OUT })
}

// fixed artifact paths (downstream readers use these, not result-reported outfiles)
const F = {
  inventory: S + '/armA/inventory.md',
  matrix: S + '/armA/edict-matrix.md',
  matrixDraft: S + '/armA/edict-matrix-draft.md',
  verdict: S + '/armA/VERDICT.md',
}

// ============ ARM A — audit the Codex-begotten formation ============
async function armA() {
  log('ARM A: launching inventory + edict matrix')
  const [inv, edm] = await parallel([
    () => seat('A:inventory', 'A: Inventory + Edict Matrix', 'opus', 'high', `${LAW}
TASK — INVENTORY the frozen Codex V-next formation snapshot at ${SNAP} (a copy of docs/tranches/V/vnext frozen 2026-07-19 19:04; manifest at ${S}/snapshot-manifest.txt).
Read EVERY .md at the snapshot root, in waves/, reviews/, coordination/. For tools/ and *.schema.json: list every file with name+size+one-line purpose (from headers), and read 4-5 representative ones fully. For large .json data artifacts: head them and describe shape.
Write EXACTLY to ${F.inventory}: (1) complete doc map (file -> role, size); (2) the wave list as the formation defines it — every wave id/name, grain, owner repo/band, and which file specs it; (3) registry/disposition row counts (AUDIT-REGISTRY, DISPOSITIONS, SEED-ROW-INVENTORY, PROMPT-RECAP — count rows, note coverage claims); (4) the formation's self-described method, model routing, and process (FORMATION.md, FORMATION-CLEAN-PASS-PROTOCOL.md, README, PROVENANCE, RETURN-CONTRACT); (5) the reviews/ thrice evidence (what panels ran, on what); (6) a machine-usable index: wave id -> spec file. Be exhaustive and neutral — no grading yet. ${RET}`),
    () => seat('A:edict-matrix', 'A: Inventory + Edict Matrix', 'opus', 'high', `${LAW}
TASK — build the EDICT MATRIX. ${SEEDS}
A prior pass produced a DRAFT at ${F.matrixDraft} extracted from the two letters, but it lacked the conversation addenda file (it substituted the Codex tree's own OWNER-AMENDMENTS.md as its addenda source). Your job: (1) verify the draft's letter-derived rows against ${L1} and ${L2} (correct errors, fill omissions); (2) rebuild the addenda rows from ${ADD} as E-C1..E-C23; (3) ALSO read ${SNAP}/OWNER-AMENDMENTS.md and cross-check it against ${ADD} — divergences between the two captures of the owner's post-letter voice are FINDINGS (list them in a final section); (4) ensure EVERY P2.2 restore-ledger row (R-DELTAE..R-BOUNDARY), every P3.3/P3.4 program row, every P4 fence, and every P5 inherited-DECIDED row has its own row. Row grammar: ID | edict digest (1-2 lines, load-bearing specifics preserved) | COMPLIANCE TEST (what a compliant formation must contain, concretely checkable). Write EXACTLY to ${F.matrix}. ${RET}`),
  ])
  log(`A1 done: inventory=${!!inv}, matrix=${!!edm}`)

  const LENSES = [
    { id: 'packets', model: 'opus', brief: `ZERO-SILENT-DROP CENSUS. For every packet row in the edict matrix (all P1 rows, all 14 P2.2 restore rows + tombstones, all P3.1/P3.2 zone verdicts, P3.3/P3.4 apparatus rows, P4 fences, P5 inherited-DECIDED rows): find where it landed in the Codex formation (wave / gate / registry row / owner-decision row) per L1 section 9. Verdict per row: LANDED (cite file+anchor) / PARTIAL / SILENTLY-DROPPED / RE-OPENED-ILLEGALLY (a P5 DECIDED row re-adjudicated). Also check the formation checked itself against the packet inventory as section 9 demands (SEED-ROW-INVENTORY.json is its own claim — verify a sample of 15 rows END-TO-END).` },
    { id: 'parse', model: 'opus', brief: `PARSE PROGRAM COMPLIANCE (L1 section 2, P1, E-C1/C12/C14/C15). Did the formation: treat parse-that as READOPTED-as-published (no re-contest, no uplift beyond minor fixes — C1 bound)? spec R-PARSER as restoration (164343c1^ recipe, /css signatures frozen)? restore bench as regression witness (born-RED gate)? spec the spec-completeness census vs July-2026 CSS? define the parser BOTH in idiomatic BBNF (bbnf module facilities, split sub-grammars) AND as the parse-that TS implementation in src/css/ (C14)? honor parse-that semver <=1.1 (the formation's P band + C10 law says no parse-that publication at all — grade that against C1/C15)? route parse-that-internal needs as PT-E letters? Check PARSER-CSS-COLOR.md, the P-band and V03-V09 waves in the snapshot against each.` },
    { id: 'color', model: 'opus', brief: `COLOR PROGRAM COMPLIANCE (L1 section 3, P2, E-C13). Each of the 14 restore rows: does an owning wave/gate/decision row exist with the right mode (restore vs net-new), right priority order (R-DELTAE prerequisite -> R-GAMUT Ottosson cusp+Halley + JND clip + raytrace-as-test-oracle -> R-INTO riding W56 4.1.x never forking -> R-RAMP with kf scar deletion)? NOTE the formation's V15/V15P language ("one consistently selected CSS Color 4-permitted gamut policy; non-CSS cusp/Halley decided separately") — adjudicate whether that honors or dilutes the P2 decided path. WPT/section-13 conformance vectors as gate infra? zero-alloc mandate carried into gates (the formation's law says "Parsing, UI and DOM work do not claim universal zero allocation; selected warmed kernels carry explicit allocation budgets" — grade vs C13)? SCI-1 inherited as DECIDED? Tombstones respected?` },
    { id: 'structure', model: 'fable', brief: `STRUCTURE PROGRAM COMPLIANCE (L1 section 4, P4.3/P4.4, E-C11). Judge: are CURRENT-DAGS/TARGET-DAGS/DEMO-TARGET-DAGS derived (depcruise/madge) or hand-drawn (the letters demand derived-then-adjudicated)? Do target paths (VALUE-TARGET-PATHS.json, KEYFRAMES-TARGET-PATHS.json) honor goldilocks + module-name-stripping + tests-isomorphism (born-RED both repos)? subpaths dissolution with the 7 keys frozen + D50 /index boundary? api/ EXTRACT vs the C7 stay-at-/api tension — reconciled explicitly or fudged? kf flatten anchors re-derived (N-ADJ-3) and structure waves AMENDING the LT blueprint naming LT-10/LT-16? decompose.ts PRUNE, quantize DEMOTE, deps-block STRIP + manifest gate, 39 PNGs, isomorphism between value and kf as an abstract facility? Grade quality, not just presence — is the target structure actually GOOD (dirigible, no god-modules, no sand)?` },
    { id: 'frontend', model: 'fable', brief: `FRONTEND/DESIGN PROGRAM COMPLIANCE (L1 section 4 demo block, E-C2/C3/C4/C5/C10/C22). Read DESIGN-PROGRAM.md, DESIGN-PROVENANCE.md, LIVE-VISUAL-AUDIT.md, DEMO-TARGET-DAGS.md + the G/D/M waves. Judge: does the design program carry THE BREATH OF LIFE (glass-ui BJ + IOS27-MICRO corpus — watercolor-dot hover/procedural beget, slider-value watercolor styling, per-screen padding/margin/curve refinement) with real design content, or checkbox rows? Are the three owner marks present as waves with the right substance: easing-curve-selector mobile redesign (C2 — formation claims M08/M11/C07), value mobile toolbar lost (C3 — claims D00A/D03A), kf demo mobile overhaul + multi-touch quaternion orbital + single-screen app (C4 — claims K12/M03-M10)? EVERY page of EVERY app audited, mobile AND desktop (C22)? Total shadcn abrogation with glass-ui-gap prototypes specced in glass-ui (C5 — claims G00-G09)? Aristotelian proportionality + recursive colocation? Was design actually routed through design tooling/DesignSync or merely asserted (DESIGN-PROVENANCE.md is its own claim — test it)? Judge design QUALITY, not checkbox presence. Product identities ("Optical Instrumentarium", "Chronographic Stage") — sound or invented ceremony?` },
    { id: 'api-routing', model: 'opus', brief: `API + ROUTING/STATE COMPLIANCE (E-C6/C7). Read API-OPERATIONS.md, API-RETURN-COVERAGE.json, API-TARGET-PATHS.json, STATE-ROUTING.md, api-contract.source.json + the A-band waves. Judge: full palette API specification (every facility: history, variants, all CRUD, mixing) — proven, complete? isomorphism to fourier-analysis CRUD visualization API actually analyzed (did anyone read the fourier repo — evidence?)? /api module perfection BOTH repos (the formation says kf has NO server API — grade that against the letters)? the C7 stay-at-/api vs P3.2 extract tension reconciled? routing + robust URL state + share-URL specced for BOTH apps (FORMATION.md's UrlEnvelope law + route authorities — sound?)? The A band is 36 waves incl. Fourier identity/CRUD/assets/jobs — is that scope justified by the canon or scope creep beyond the letters?` },
    { id: 'contract', model: 'opus', brief: `RETURN-CONTRACT + PROCESS COMPLIANCE (L1 sections 0/8/9, E-C8/C9/C20). Verify: plan folder complete; wave specs with acceptance gates born-RED where defect live (sample 12 waves across bands END-TO-END in the waves/ files: does each actually carry mission, born-RED witness, deliverables, falsifiable gates, exclusions as FORMATION.md claims all 190 do?); pi/DELTA obligations for every visual claim; terminal disposition for every chronic/deferred/prompt-recap row (PROMPT-RECAP.md row by row — any re-booking? any partial counted done?); owner-decision docket as a SINGLE sheet (does one exist?); wave count vs the 50+ mandate (190 claimed — count actual spec'd waves in waves/*.md vs table rows); the thrice method ACTUALLY RUN (reviews/ evidence: real skeptic content or theater?); all-Sol routing verified-as-served (PROVENANCE.md, P01-INDEPENDENT-AUTHORSHIP.json) not merely declared; the registry stable-after-two-clean-passes (AUDIT-REGISTRY.md, FORMATION-CLEAN-PASS-PROTOCOL.md); G0-prime tree pins on cross-repo claims.` },
    { id: 'apparatus', model: 'fable', brief: `APPARATUS-BLOAT + CLOSE-CLASS-LIES on the formation ITSELF. The owner: "spend little time on contrived gates or process and the majority on direct code implementation and visual verification" (C21), "be pithy, laconic". The snapshot carries ~40 tools/*.mjs (several 25-100KB: clean-exec-contract 78K, selftest-clean-exec-contract 68K, validate-clean-passes 57K, selftest-keyframes-target-transpose 107K...) plus ~30 schemas. Adjudicate: which are load-bearing formation proof (e.g. a capability-diff gate the law demands) vs process theater violating C21? Are validators VACUOUS (can they fail? run 2-3 read-only with node against their own inputs if trivially runnable, output to ${S})? Hunt close-class lies IN the formation: vacuous-green self-validation, declared-but-missing captures, per-mechanism green over gestalt broken, effort spent on self-referential apparatus instead of the owner's asks. Is the doc corpus itself pithy or bloated? Name what should be deleted/collapsed.` },
  ]
  const audits = await parallel(LENSES.map(Lz => () =>
    seat(`A:audit:${Lz.id}`, 'A: Lens Audits', Lz.model, Lz.model === 'opus' ? 'high' : undefined, `${LAW}
${SEEDS}
Then read the inventory ${F.inventory} and the edict matrix ${F.matrix}. Your lens: ${Lz.brief}
Snapshot root: ${SNAP}. Read every snapshot file your lens needs, fully. GRADE FAIRLY: this feeds an apotheosis — record what the Codex formation did CORRECTLY with the same rigor as the wrongs. Every finding: verdict (CORRECT / PARTIAL / WRONG / MISSING) + evidence (file + anchor/quote) + severity (P0 charter-breach / P1 material / P2 minor) + the edict-matrix row id it tests. Write EXACTLY to ${S}/armA/audit-${Lz.id}.md. ${RET}`)))
  log(`A2 done: ${audits.filter(Boolean).length}/8 lenses returned`)

  const verdict = await seat('A:verdict', 'A: Verdict', 'fable', undefined, `${LAW}
${SEEDS}
TASK — ADJUDICATE the Arm-A audit. Read ${F.inventory}, ${F.matrix}, and every ${S}/armA/audit-*.md. You are the adjudicator, not a vote-counter: for each P0/P1 finding, VERIFY it yourself against the snapshot at ${SNAP} (spot-check the cited files; refute findings that do not hold). Then write EXACTLY to ${F.verdict}:
(1) the graded verdict sheet — per program domain (parse, color, structure, frontend, api/routing, contract/process, apparatus, packet-census): CORRECT / PARTIAL / WRONG with the 3-6 decisive evidence rows each;
(2) THE RIGHTS — what the Codex formation genuinely nailed (be generous and specific);
(3) THE WRONGS — confirmed charter breaches and material defects, each with the exact repair;
(4) THE PARTIALS — started-but-incomplete, each with what completion requires;
(5) refuted audit findings (lens claims you disproved — name them);
(6) a <=15-row priority repair ledger for the Codex fleet.
Pithy, laconic, evidence-anchored. ${RET}`)
  return { inv, edm, audits: audits.filter(Boolean), verdict }
}

// ============ ARM B — the independent Fable-side formation ============
async function armB() {
  log('ARM B: launching truth sweeps')
  const SWEEPS = [
    { id: 'value-lib', brief: `value.js LIBRARY truth: derive the real module DAG of ${R.value}/src (npx --yes madge --json or a grep-derived import graph — output only to ${S}); per-dir LOC census; export surface + subpaths/ reality; package.json deps-block state; test-tree vs src-tree isomorphism gaps; god-module/sand candidates with evidence; transform/decompose.ts + quantize consumer truth (grep all four trees: value demo, kf ${R.kf}, glass ${R.glass}, atlas ${R.atlas}); the extant css/ parser per-file shape (confirm P1.2 numbers); color/ zero-alloc + gamut state (confirm the P2.1 extinction on HEAD).` },
    { id: 'value-demo', brief: `value.js DEMO truth: ${R.value}/demo full component census (every page/pane/dir; counts, sizes); colocation violations vs the recursive-colocation edict; COMPLETE shadcn usage census (every demo/@/components/ui import — component, importer count, glass-ui equivalent yes/no from ${R.glass}/src); routing + URL/state management as-is (any share-URL facility?); code-trace the three owner marks: mobile toolbar loss (dock responsive behavior), the easing-curve-selector component (find it; note its rendering/rounding/resolution approach), watercolor-dot components + hover/procedural-beget behavior; slider value styling. File+line anchors throughout.` },
    { id: 'kf-lib', brief: `keyframes.js LIBRARY truth at the CANONICAL checkout ${R.kf} (master, kf 6.0.0): derive the src/animation module DAG; confirm/refresh the P3.1 zone table LOC + wiring facts; internal/ fan-in; re-derive the P4.3 flatten anchors at today's HEAD (all 13 config/gate anchors with CURRENT line numbers + import-line count); the easing.ts:30/:38-39 boundary row; WAAPI surface today (what full-WAAPI support would add); gates/tests state (proof:structure, depcruise wiring, W9 staging branch existence); test-tree isomorphism state.` },
    { id: 'kf-demo', brief: `keyframes.js DEMO truth at ${R.kf}/demo: full page/component census; mobile brokenness at the CODE level (viewport handling, touch handlers, overflow, fixed sizing — cite files); the cube: current drag/rotation implementation vs the custom quaternion orbital-drag facilities (find both; can multi-touch ride them?); single-screen-app gap analysis vs value demo's architecture; shadcn usage census with glass-ui equivalents; routing/URL state as-is.` },
    { id: 'api-fourier', brief: `API truth: ${R.value}/api full census (module structure, every route/handler, the palette surface: history, variants, CRUD, mixing, publish/diff — what exists vs what a FULL palette spec needs); any /api-equivalent in ${R.kf}; then read ${R.fourier}'s CRUD/visualization API (find its server/api tree) and produce the isomorphism map: shapes, conventions, gaps both directions. File anchors.` },
    { id: 'parse-that', brief: `parse-that ASSESSMENT (C19): ${R.pt} — repo state vs published 1.0.0 (git log since the 1.0.0 tag; any unpublished work); its tranche docs state (docs/tranches/ — what tranches exist, last activity, open rows incl. the PT-E letter at docs/tranches/A/VALUEJS-PT-E-2026-07-05.md); the public API surface (., /core, /diagnostics, /packrat, /utils) — adequacy for the full-CSS-grammar program (combinator coverage, diagnostics, left-recursion/Pratt status, perf posture); a MINOR-FIX-ONLY candidate list (C1 bound: no novelty); verify the 164343c1^ resurrection recipe is intact in value's git (git show 164343c1^:src/parsing/ file list + the bench file). Also glance ${R.bbnf}'s restart/ tranches (last 2-3 days) for the module facilities C14 references — inventory only.` },
    { id: 'backtrace', brief: `SEED BACKTRACE (C18): in ${TRANSCRIPTS}, ls -lt *.jsonl; the audited histories are 10dfa2b9-2e44-4e6b-a6c5-b028a506ba71.jsonl and 58f34108-b347-4938-adcd-9e676fc3e1fa.jsonl (plus any session of 2026-07-16..18 that authored the vnext letters). Extract the OWNER's messages only (python3/jq for user-role entries; skip assistant bulk). Build the owner-ask ledger: every exhortation/finding/edict the owner voiced. Then diff against the two letters ${L1} + ${L2}: FAITHFULLY-CARRIED / MUTATED (meaning shifted) / SILENTLY-DROPPED. Also digest glass-ui's BREATH OF LIFE canon for the design program: read ${R.glass}/docs/tranches/BJ/FEEDBACK-LEDGER.md + the IOS27-MICRO CHARTER.md + NOVELTY-ROSTER.md and extract the 10-15 transferable motion/affordance principles with names.` },
    { id: 'probe', brief: `LIVE PROBE (parsimonious — <=14 screenshots total, saved to ${S}/probe/): use the playwright browser MCP tools (load via ToolSearch "select:mcp__plugin_playwright_playwright__browser_navigate,mcp__plugin_playwright_playwright__browser_resize,mcp__plugin_playwright_playwright__browser_take_screenshot,mcp__plugin_playwright_playwright__browser_snapshot,mcp__plugin_playwright_playwright__browser_click,mcp__plugin_playwright_playwright__browser_close"). Value demo at https://color.babb.dev: desktop 1440x900 (2-3 shots of main screens) + mobile 390x844: the toolbar/dock region (C3 evidence), the easing-curve selector if reachable (C2 evidence), watercolor dots + slider area close-ups (C10). kf demo: find its URL (check ${R.kf}/README.md, CNAME, deploy workflow — likely a babb.dev subdomain); mobile 390x844 shots evidencing the brokenness (C4) + the cube. If a site is unreachable or the browser tools are absent, say so and fall back to noting what code predicts. Annotate every capture in your report: what it shows, which mark it evidences.` },
  ]
  const sweeps = await parallel(SWEEPS.map(Sw => () =>
    seat(`B:sweep:${Sw.id}`, 'B: Truth Sweeps', 'opus', 'high', `${LAW}
${FIREWALL}
${SEEDS}
TASK — ${Sw.brief}
Write EXACTLY to ${S}/armB/sweep-${Sw.id}.md — dense, evidence-anchored (file:line), zero speculation flagged as fact. ${RET}`)))
  log(`B1 done: ${sweeps.filter(Boolean).length}/8 sweeps returned`)
  const sf = id => `${S}/armB/sweep-${id}.md`

  const PROGRAMS = [
    { id: 'PA-parse', inputs: [sf('value-lib'), sf('parse-that'), sf('kf-lib')], brief: `THE PARSE PROGRAM: wave set for parse-that readoption-as-published (R-PARSER restoration per the 164343c1^ recipe, /css signatures frozen), bench-as-regression-witness, the July-2026 spec-completeness census (full CSS + experimental, CSSOM, WAAPI, keyframes/animation/timeline/stylesheet — typed values congruent to DOM equivalents, C12), the DUAL definition (idiomatic BBNF sub-grammars via bbnf-lang module facilities + the parse-that TS implementation in src/css/, C14), the grammar restores (color-mix, relative-from, contrast-color, HDR decision, spring-grammar ownership row), kf's consume seams. parse-that itself: minor fixes only (C1), semver <=1.1. Include the prototype wave (benchmarked NOW, execution-gated).` },
    { id: 'PB-color', inputs: [sf('value-lib')], brief: `THE COLOR PROGRAM: the 14-row P2.2 restore ledger as waves in priority order (R-DELTAE prerequisite; R-GAMUT = analytical Ottosson cusp+Halley + deltaE-OK JND clip, raytrace as test-side oracle, zero-alloc kernel under the frozen v4 facade; R-INTO extending SCI-1 riding the 4.1.x vehicle; R-RAMP with the kf scar-deletion dispatch; then R-MIX-GRAMMAR..R-BOUNDARY incl. the decision rows). WPT/section-13 conformance vectors as gate infra. Zero-alloc for EVERY critical op (C13) with alloc-count gates. Tombstones honored.` },
    { id: 'PC-structure', inputs: [sf('value-lib'), sf('kf-lib'), sf('value-demo'), sf('kf-demo')], brief: `THE STRUCTURE PROGRAM (both libraries + both demo component trees): from the derived DAGs, define the TARGET structures — goldilocks granularity, module-name stripping, tests-isomorphism gates born-RED both repos, subpaths dissolution (7 keys frozen, D50), api/ extract-vs-stay reconciled with C7, decompose PRUNE / quantize DEMOTE / deps STRIP + manifest gate / PNG purge, kf flatten with re-derived anchors AMENDING the LT blueprint (name LT-10/LT-16), value-kf structural ISOMORPHISM as an abstract facility, glass-ui as the flattening reference. Define the DAG-thrice batching plan (dynamic bespoke cluster batches, C20) as executable wave structure.` },
    { id: 'PD-frontend', inputs: [sf('value-demo'), sf('kf-demo'), sf('probe'), sf('backtrace')], brief: `THE FRONTEND PROGRAM (the deep design work — this is your BREATH OF LIFE canvas): value demo perfection (refinement of details, errors, animation curves; watercolor-dot hover + procedural beget; slider-value watercolor styling; per-screen padding/margins/curves; C2 easing-selector mobile redesign — crisp, compact, high-res; C3 mobile toolbar restoration) + kf demo overhaul (C4: single-screen app a la value, multi-touch quaternion orbital on the cube AND every animation, mobile-first + desktop affordances) + C5 total shadcn abrogation both apps with named glass-ui-gap prototype waves (specced in glass-ui idiom) + C6 routing/URL-state/share both apps + C22 every-page-every-app audit obligations with pi/DELTA visual obligations per claim. Use the BREATH OF LIFE principles from the backtrace sweep. Design quality over checkbox coverage; probe parsimony in gates.` },
    { id: 'PE-api', inputs: [sf('api-fourier'), sf('value-demo')], brief: `THE API PROGRAM: the FULL palette API specification (every facility: history, variants, all CRUD, mixing, publish/share) staying at /api (C7) — reconciling the extract-vs-stay tension explicitly as an owner-decision row with a recommendation; /api module-structure perfection both repos; isomorphism to fourier-analysis' CRUD visualization API (from the sweep's map) — including any fourier-side waves; auth/session surfaces as they intersect; URL-share backend facilities backing C6.` },
    { id: 'PF-governance', inputs: [sf('kf-lib'), sf('value-lib')], brief: `THE GOVERNANCE PROGRAM: the ONE co-land boundary (value 5 / kf 7 / glass peer-bump / atlas ranges) with wedge pricing (P4.2, ERESOLVE-hard); the kf dispatch protocol (specs into kf's coordination inbox, P4.5); the capability-diff gate both repos (the silent-drop tombstone law); the zone dispositions inherited as INPUT (P3 tables — owner-decision docket rows for the 2.4k OWNER-DECISION LOC, prune riders for the 0.8k, record-correction rider for oscillator); glass-ui defect batching; cross-repo wave map (glass, atlas, sci-report, fourier); semver discipline (parse-that <=1.1); G0-prime pins; the assembled OWNER-DECISION docket as a single sheet.` },
  ]
  const finals = await pipeline(PROGRAMS,
    (Pg) => seat(`B:arch:${Pg.id}`, 'B: Programs', 'fable', undefined, `${LAW}
${FIREWALL}
${SEEDS}
Then read your truth-sweep inputs: ${Pg.inputs.join(' , ')} (if one is missing, note it and proceed on the others + your own repo reads).
TASK — ARCHITECT ${Pg.brief}
You are forming a REAL tranche program, not an essay. Write EXACTLY to ${S}/armB/program-${Pg.id}.md: (1) program charter (5-10 lines); (2) THE WAVE SET — every wave as: id (prefix F-, e.g. F-${Pg.id}-01) | repo | title | intent (2-3 lines) | deliverables | acceptance gates (born-RED wherever the defect is live today — say what RED looks like) | dependencies (other F-waves) | pi/DELTA visual obligations where a visual claim exists | model routing note; (3) owner-decision rows your program surfaces; (4) how every relevant letter/packet/addenda row lands (cite row ids — zero silent drops in YOUR program). KISS: fewer, well-cut waves beat many thin ones; but nothing load-bearing dropped. Set wave_count in your return. ${RET}`),
    (arch, Pg) => parallel([1, 2].map(n => () =>
      seat(`B:skeptic${n}:${Pg.id}`, 'B: Thrice', 'fable', undefined, `${LAW}
${FIREWALL}
${SEEDS}
TASK — you are SKEPTIC ${n} of the thrice loop. ASSUME the program at ${S}/armB/program-${Pg.id}.md is WRONG in every way: wrong decomposition, wrong gates, wrong priorities, silent drops, contrived process, KISS violations, wrong altitude. Attack it with EVIDENCE (read its truth-sweep inputs ${Pg.inputs.join(' , ')} and the repos where needed) and PROPOSE THE ALTERNATIVE: your counter-program shape (wave list at title+intent grain). ${n === 1 ? 'Bias: attack completeness and evidence-grounding (what edict rows does it drop or fudge? which gates are vacuous or cannot fail? what does the truth NOT support?).' : 'Bias: attack architecture and parsimony (what is over-decomposed sand or under-cut god-wave? where does it violate KISS/C21, re-litigate DECIDED rows, or mis-order dependencies?).'} Write EXACTLY to ${S}/armB/thrice-${Pg.id}-skeptic${n}.md. ${RET}`)))
      .then(sk => ({ arch, sk: sk.filter(Boolean) })),
    (x, Pg) => seat(`B:adjudicate:${Pg.id}`, 'B: Thrice', 'fable', undefined, `${LAW}
${FIREWALL}
${SEEDS}
TASK — THRICE ADJUDICATOR for program ${Pg.id}. Read the program ${S}/armB/program-${Pg.id}.md and both skeptic briefs ${S}/armB/thrice-${Pg.id}-skeptic1.md + ${S}/armB/thrice-${Pg.id}-skeptic2.md (if a skeptic file is missing, adjudicate the one that exists and say so). PROVE or DISPROVE each skeptic claim with your own evidence (read the sweeps/repos yourself — never vote-count). Then emit the AMENDED FINAL program EXACTLY to ${S}/armB/final-${Pg.id}.md — same required structure as the program (wave set with gates etc.) with an ADJUDICATION LOG section: each skeptic claim -> PROVEN(adopted: how)/DISPROVEN(evidence). Convergence duty: the final must survive both skeptics' strongest surviving points. Set wave_count. ${RET}`))
  log(`B3 done: ${finals.filter(Boolean).length}/6 programs adjudicated`)

  const asm = await seat('B:assembly', 'B: Assembly', 'fable', undefined, `${LAW}
${FIREWALL}
${SEEDS}
TASK — ASSEMBLE the independent Fable formation from the six adjudicated programs: ${PROGRAMS.map(Pg => S + '/armB/final-' + Pg.id + '.md').join(' , ')} (skip any missing file, note it).
Write THREE files:
(1) ${S}/armB/FABLE-FORMATION.md — the charter: mission, model routing, the co-land boundary, method (thrice/DAG batching), scope bounds (C1/C15/C16), and the program index;
(2) ${S}/armB/WAVE-REGISTRY.md — THE COMPLETE REGISTRY: every F-wave from all six finals in ONE dependency-ordered table (id | repo | title | gates-digest | born-RED? | deps | source program), cross-program dependencies resolved, duplicates merged (log merges), repos spanned counted; target >=50 waves across >=6 repos but never pad — if honest count is lower, say so and why;
(3) ${S}/armB/OWNER-DOCKET.md — every owner-decision row from all programs as a single decision sheet (id | question | evidence | recommendation | default-if-silent);
plus a GAPS section at the end of FABLE-FORMATION.md: the exact remaining gap per L1 section 9's fallback clause (what a full formation still owes that this core does not carry). Set wave_count = total registry rows. ${RET}`)
  return { sweeps: sweeps.filter(Boolean), finals: finals.filter(Boolean), asm }
}

// ---- run arms concurrently with LOUD failure (no silent nulls) ----
const pA = armA().catch(e => { log('ARM A CRASHED: ' + (e && e.message)); return null })
const pB = armB().catch(e => { log('ARM B CRASHED: ' + (e && e.message)); return null })
const A = await pA
const B = await pB
if (!A || !B) throw new Error(`arm failure: A=${!!A} B=${!!B} — fix and resume with resumeFromRunId`)
log(`Arms A+B complete. A verdict: ${!!A.verdict}; B registry waves: ${B.asm && B.asm.wave_count}`)

// ============ ARM C — the union apotheosis ============
const UNIONERS = [
  { id: 'parse-color', scope: 'the parse program and the color program', aFiles: ['audit-parse.md', 'audit-color.md', 'audit-packets.md'], bFiles: ['final-PA-parse.md', 'final-PB-color.md'] },
  { id: 'structure-frontend', scope: 'the structure program and the frontend/design program', aFiles: ['audit-structure.md', 'audit-frontend.md'], bFiles: ['final-PC-structure.md', 'final-PD-frontend.md'] },
  { id: 'api-governance', scope: 'the api/routing program, governance/co-land, and process/scale/contract compliance', aFiles: ['audit-api-routing.md', 'audit-contract.md', 'audit-apparatus.md'], bFiles: ['final-PE-api.md', 'final-PF-governance.md'] },
]
const unions = await parallel(UNIONERS.map(U => () =>
  seat(`C:union:${U.id}`, 'C: Union', 'fable', undefined, `${LAW}
${SEEDS}
TASK — UNION ADJUDICATOR for ${U.scope}. Read: the Arm-A verdict ${F.verdict} + lens files ${U.aFiles.map(f => S + '/armA/' + f).join(' , ')}; the Fable-side finals ${U.bFiles.map(f => S + '/armB/' + f).join(' , ')}; and the Codex snapshot's corresponding wave/spec files (via ${F.inventory}'s index; snapshot root ${SNAP}). Both formations answer the same edicts — grade BOTH, symmetrically and self-critically (the Fable side gets NO home-team bias):
(1) per-element verdict table: element | Codex verdict (CORRECT/PARTIAL/WRONG/MISSING + why) | Fable verdict (same) | UNION ruling (adopt-Codex / adopt-Fable / merge-how / both-wrong-do-X);
(2) the union wave-delta for this domain: concrete amendments the unioned mega-tranche makes (waves to adopt, amend, add, kill — with which side sourced each);
(3) apotheosis notes: what each approach teaches the other.
Write EXACTLY to ${S}/armC/union-${U.id}.md. ${RET}`)))
log(`C1 done: ${unions.filter(Boolean).length}/3 unions`)

const apex = await seat('C:apotheosis', 'C: Apotheosis', 'fable', undefined, `${LAW}
${SEEDS}
TASK — THE FINAL APOTHEOSIS. Read the three union files ${UNIONERS.map(U => S + '/armC/union-' + U.id + '.md').join(' , ')}, the Arm-A verdict ${F.verdict}, and the Fable registry ${S}/armB/WAVE-REGISTRY.md. Write EXACTLY to ${S}/armC/UNION-APOTHEOSIS.md:
(1) THE VERDICT OF VERDICTS — one page: what the Codex formation has done correctly, wrongly, partially (graded per domain, evidence-cited); the same grading for the independent Fable formation (self-critical);
(2) THE UNION — the apotheosis mega-tranche: the unioned wave registry delta expressed as amendments to the Codex formation (it remains the formation of record — the active fleet continues it): ADOPT rows (Codex waves confirmed), AMEND rows (Codex waves + the exact Fable-sourced amendment), ADD rows (Fable waves Codex lacks), KILL rows (waves/apparatus both sides should drop), each with rationale + source;
(3) THE REPAIR LEDGER for the Codex fleet, priority-ordered, <=20 rows;
(4) OPEN OWNER DECISIONS — the merged docket digest;
(5) a DRAFT COORDINATION LETTER (embedded as a fenced section, ready to land in docs/tranches/V/coordination/ by the root session — never write there yourself) relaying the union to the active Codex fleet without clobbering: what to adopt, what to repair, where the evidence lives.
Pithy, laconic, fastidious — this is the document the owner reads first. ${RET}`)

return {
  armA_verdict: A.verdict && { outfile: F.verdict, summary: A.verdict.summary, model: A.verdict.model_served },
  armB_assembly: B.asm && { outfile: B.asm.outfile, summary: B.asm.summary, waves: B.asm.wave_count, model: B.asm.model_served },
  unions: unions.filter(Boolean).map(u => ({ outfile: u.outfile, model: u.model_served })),
  apotheosis: apex && { outfile: apex.outfile, summary: apex.summary, key_points: apex.key_points, model: apex.model_served },
  models_served: {
    A: [A.inv, A.edm, ...(A.audits || []), A.verdict].filter(Boolean).map(x => x.model_served),
    B: [...(B.sweeps || []), ...(B.finals || []), B.asm].filter(Boolean).map(x => x.model_served),
    C: [...unions.filter(Boolean), apex].filter(Boolean).map(x => x.model_served),
  },
}