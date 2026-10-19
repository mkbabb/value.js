export const meta = {
  name: 'fourier-contour-tour',
  description: 'fourier contour selection + tour + refinement to the owner bar (private portrait + public set), loop until the judge panel passes every image',
  phases: [
    { title: 'Baseline', detail: 'bench harness, metrics, overlays, the bar' },
    { title: 'Diagnose', detail: 'selection · tour · refinement · models lenses' },
    { title: 'Design', detail: 'one ordered cure plan' },
    { title: 'Refine', detail: 'implement a batch, re-measure, 3-judge panel; loop until all PASS' },
    { title: 'Close', detail: 'gates x2, served check, record' },
  ],
}

const SPEC = '/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-CT.md'
const REPO = '/Users/mkbabb/Programming/fourier-analysis'
const REC = '/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/C/F-CT.md'
const LAW = `READ ${SPEC} WHOLE FIRST: it is binding, especially the PRIVACY LAW. Repo: ${REPO} (branch m/w1-bump-migration, which is shared with another workflow seat working in web/**). Commit PATHSPEC-ONLY, your own files only; never stage, revert, stash or format anyone else's dirty files; no reset, no force-push. The private sample ~/.fourier-samples/daraksha.jpeg and ALL of its derivatives stay under ~/.fourier-samples/ ONLY: never git add, commit, push, upload or deploy them, and never embed their pixels in code, tests or docs. Records cite it as PRIVATE-SAMPLE with numbers only. You may view overlay images yourself with the Read tool. Every commit message ends with the line: Claude-Session: https://claude.ai/code/session_01QkbQV4VgkoQgSoUj2oKZim. Python: uv run (unset VIRTUAL_ENV first). Model: Opus 5.5.`

const IMG = { type: 'object', properties: { name: { type: 'string' }, private: { type: 'boolean' }, metrics: { type: 'object' }, overlay: { type: 'string' }, notes: { type: 'string' } }, required: ['name', 'metrics', 'overlay'] }
const BASE = { type: 'object', properties: { harness: { type: 'string' }, runCmd: { type: 'string' }, bar: { type: 'object' }, images: { type: 'array', items: IMG }, commits: { type: 'array', items: { type: 'string' } } }, required: ['harness', 'runCmd', 'bar', 'images'] }
const FIND = { type: 'object', properties: { lens: { type: 'string' }, findings: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, severity: { type: 'string' }, images: { type: 'array', items: { type: 'string' } }, cause: { type: 'string' }, where: { type: 'string' }, cure: { type: 'string' } }, required: ['id', 'cause', 'cure'] } } }, required: ['lens', 'findings'] }
const PLAN = { type: 'object', properties: { cures: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, files: { type: 'array', items: { type: 'string' } }, expected: { type: 'string' }, closes: { type: 'array', items: { type: 'string' } } }, required: ['id', 'title', 'expected'] } }, batches: { type: 'array', items: { type: 'array', items: { type: 'string' } } } }, required: ['cures', 'batches'] }
const ROUND = { type: 'object', properties: { landed: { type: 'array', items: { type: 'string' } }, commits: { type: 'array', items: { type: 'string' } }, testsGreen: { type: 'boolean' }, images: { type: 'array', items: IMG }, regressions: { type: 'array', items: { type: 'string' } }, notes: { type: 'string' } }, required: ['landed', 'testsGreen', 'images'] }
const VERDICT = { type: 'object', properties: { lens: { type: 'string' }, perImage: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, pass: { type: 'boolean' }, defects: { type: 'array', items: { type: 'string' } } }, required: ['name', 'pass'] } } }, required: ['lens', 'perImage'] }
const CLOSE = { type: 'object', properties: { verdict: { type: 'string' }, gatesGreen: { type: 'array', items: { type: 'string' } }, gatesRed: { type: 'array', items: { type: 'string' } }, commits: { type: 'array', items: { type: 'string' } }, residuals: { type: 'array', items: { type: 'string' } } }, required: ['verdict', 'gatesGreen', 'gatesRed'] }

phase('Baseline')
const base = await agent(`${LAW}
TASK (Baseline seat): build a contour-quality BENCH HARNESS in ${REPO}/bench/contours/ (committed; Python, runnable via uv). It must:
(1) run the production pipeline (fourier_analysis.contours extract_contours_result + shortest_tour, with the same defaults the API route uses; read api/routers/contours.py and src/fourier_analysis/contours/pipeline.py to match them) on every image in the set: the private sample at ~/.fourier-samples/daraksha.jpeg (skipped gracefully if absent) plus every image in assets/portraits and assets/animals;
(2) compute per-image metrics: subject-mask precision and recall against a reference mask (derive it from the ML subject model, and write the reference masks for the public set under bench/contours/reference/ only if you have checked each one by eye; the private reference stays in ~/.fourier-samples/); contour count; total tour length; count and length of tour jumps > 4x the median step; the fraction of the tour on background; the epicycle reconstruction error at N=50/100/200; and runtime;
(3) render an overlay per image (the tour drawn over a dimmed image, with jumps highlighted) to ~/.fourier-samples/evidence/baseline/<name>.png, for public and private images alike (evidence is never committed);
(4) add pytest tests in tests/ that run the harness on 2-3 public images and assert it produces sane metrics (not the bar).
Then run it, LOOK at every overlay yourself with Read, and propose THE BAR: numeric thresholds per metric plus the qualitative landmark checklist for the portrait (face outline, hairline, braid, eyes, brows, nose, mouth/teeth line, neckline; no leaves or painting). Commit the harness and tests (never evidence or private files) and push. Return the harness path, the exact run command (taking an --out dir and --tag), the bar, and per-image metrics with overlay paths.`, { label: 'baseline-harness', phase: 'Baseline', schema: BASE })
if (!base) { log('baseline seat failed; aborting'); return { status: 'BASELINE-DEAD' } }
log(`baseline: ${base.images.length} images measured`)

phase('Diagnose')
const LENSES = [
  { key: 'selection', p: 'SUBJECT SELECTION: which contours and masks get chosen, and why background (leaves, painting, wall) leaks in or subject parts drop out. Read masks.py, ml.py, isolation.py, extraction.py (_select_explicit_candidate), assembly.py (_prune_spatial_outliers) and pipeline.py.' },
  { key: 'tour', p: 'THE TOUR: shortest_tour.py and assembly: stitching order, long jumps, backtracking, closure, and whether the tour follows strokes. Measure jump statistics per image.' },
  { key: 'refinement', p: 'REFINEMENT: processing.py (_simplify_contour, _postprocess_raw_contours, _maybe_prune_large_jump), geometry.resample_arc_length, and features.py: staircase, spurs, lost detail (eyes, mouth, braid) and over-smoothing; the arc-length resampling against feature preservation.' },
  { key: 'models', p: 'MODELS AND INPUTS: ml.py (subject model, pidinet edges), image.py (_detail_enhanced_grayscale, load sizes and EXIF orientation of a 3024x4032 phone JPEG), the config defaults in models.py, and what the API route passes. Also: is the best available model used, and is the input resolution right?' },
]
const diag = await parallel(LENSES.map(L => () => agent(`${LAW}
TASK (Diagnose, lens: ${L.key}, READ-ONLY; commit nothing): ${L.p}
The baseline harness is ${base.harness}; run it with: ${base.runCmd} --out ~/.fourier-samples/evidence/diag-${L.key} --tag diag. Baseline overlays and metrics: ${JSON.stringify(base.images).slice(0, 6000)}. The bar: ${JSON.stringify(base.bar).slice(0, 3000)}.
LOOK at the overlays (Read), especially PRIVATE-SAMPLE. Name every cause of a gap to the bar, with file:line and a structural cure (no per-image hacks, no thresholds tuned to one image, no special cases for the private sample). Rank by effect.`, { label: `diag:${L.key}`, phase: 'Diagnose', schema: FIND })))
const findings = diag.filter(Boolean).flatMap(d => d.findings.map(f => ({ ...f, lens: d.lens })))
log(`diagnose: ${findings.length} findings from ${diag.filter(Boolean).length}/4 lenses`)

phase('Design')
const plan = await agent(`${LAW}
TASK (Design seat, READ-ONLY): synthesise the findings into ONE ordered cure plan, deduplicated and structural (idiomatic and gestalt; no workarounds). Group the cures into serial BATCHES, 1-3 cures each, with the highest expected effect on the private sample first and no batch touching the same file as a concurrent one. Findings: ${JSON.stringify(findings).slice(0, 20000)}. The bar: ${JSON.stringify(base.bar).slice(0, 3000)}.`, { label: 'design', phase: 'Design', schema: PLAN })
if (!plan) return { status: 'DESIGN-DEAD', base, findings }

phase('Refine')
const JUDGES = [
  { key: 'fidelity', p: 'FIDELITY: does the tour trace the subject? For the portrait, check every landmark in the bar checklist. For the others, the subject silhouette and its defining features.' },
  { key: 'clean', p: 'CLEANLINESS: no background (leaves, painting, wall, texture noise), no spurs, staircase or scribble.' },
  { key: 'drawable', p: 'TOUR AND DRAWABILITY: one continuous path, no long jumps across the subject, stroke-following order, and the epicycle reconstruction recognisable at N=100.' },
]
let pending = plan.batches.slice()
let defects = []
let lastRound = null
let passed = false
const rounds = []
for (let r = 1; r <= 8 && !passed; r++) {
  const batch = pending.length ? pending.shift() : []
  const cures = plan.cures.filter(c => batch.includes(c.id))
  const impl = await agent(`${LAW}
TASK (Refine round ${r}, implementation seat): land these cures structurally at their root: ${JSON.stringify(cures)}.${defects.length ? ` Also cure these judge defects from the previous round, at their cause: ${JSON.stringify(defects).slice(0, 8000)}` : ''}
Laws: no per-image special cases, no thresholds fitted to one image, no private-sample branches; keep the public API and return shapes. After the changes: uv run pytest tests/test_contours.py tests/test_shortest_tour.py tests/test_contour_ml.py plus the bench tests (GREEN), and the api contour tests if you touched api/. Then run the harness: ${base.runCmd} --out ~/.fourier-samples/evidence/round-${r} --tag r${r}. Compare against the baseline and name any public-image regression. Commit your code and tests (pathspec) and push. Return the per-image metrics with overlay paths.`, { label: `refine:r${r}`, phase: 'Refine', schema: ROUND })
  if (!impl) { log(`round ${r}: implementation seat died`); break }
  const verdicts = (await parallel(JUDGES.map(J => () => agent(`${LAW}
TASK (Judge, lens ${J.key}, round ${r}, READ-ONLY): ${J.p} LOOK at every overlay with Read: ${JSON.stringify(impl.images.map(i => ({ name: i.name, overlay: i.overlay, metrics: i.metrics }))).slice(0, 8000)}. The bar: ${JSON.stringify(base.bar).slice(0, 3000)}. Be strict: the owner's bar is perfection. PASS an image only if a discerning viewer would call its tour a faithful, clean, beautiful line drawing of the subject. For each FAIL, list concrete defects (where, and what is wrong).`, { label: `judge:${J.key}:r${r}`, phase: 'Refine', schema: VERDICT })))).filter(Boolean)
  const fails = verdicts.flatMap(v => v.perImage.filter(p => !p.pass).map(p => ({ judge: v.lens, name: p.name, defects: p.defects || [] })))
  passed = verdicts.length === 3 && fails.length === 0 && (impl.regressions || []).length === 0
  defects = fails
  lastRound = impl
  rounds.push({ r, landed: impl.landed, commits: impl.commits, fails: fails.length, regressions: impl.regressions || [] })
  log(`round ${r}: landed ${impl.landed.length}, judge fails ${fails.length}, regressions ${(impl.regressions || []).length}${passed ? ' — BAR MET' : ''}`)
  if (!passed && !pending.length && r >= 3 && fails.length) log('plan batches exhausted; continuing on judge defects')
}
if (!passed) log(`bar not met after ${rounds.length} rounds; remaining defects: ${defects.length}`)

phase('Close')
const close = await agent(`${LAW}
TASK (Close seat): verify and record. (1) uv run pytest GREEN x2; api tests GREEN. (2) Run the harness twice with --tag close1 and --tag close2, outputs under ~/.fourier-samples/evidence/; is the bar met on both runs? (3) Served check: with the fourier web on :3100 and the API on :8000 (start them per the repo if they are down; the mongod is on 27018), upload the private sample in the Visualize flow locally, then read the contour, preview and epicycles by eye (screenshots to ~/.fourier-samples/evidence/served/ only). Then DELETE that visualisation and image from the local app. Never publish it. (4) Write the record ${REC}: the bar, a before/after metrics table (PRIVATE-SAMPLE numbers only, no pixels), the commits, and the per-round log ${JSON.stringify(rounds).slice(0, 4000)}; end with the final state: bar met = ${passed}, with remaining defects ${JSON.stringify(defects).slice(0, 3000)}. Commit the record in /Users/mkbabb/Programming/value.js pathspec-only and push (branch tranche-u; never touch scripts/dev/dev.sh). Verify with git status that NO private file or derivative is staged in either repo.`, { label: 'close', phase: 'Close', schema: CLOSE })
return { passed, rounds, base: { harness: base.harness, bar: base.bar }, close }
