export const meta = {
  name: 'fourier-contour-f-ct3',
  description: 'F.CT phase 3: baseline-judge the pre-F.CT pipeline, then up to 4 root-cure rounds of pipeline C against the restated bar (COHESION §0eu/§0ev, F-CT addendum (d)), then close',
  phases: [
    { title: 'Baseline', detail: 'pre-F.CT pipeline overlays + current C overlays, both judged by the same panel' },
    { title: 'Refine', detail: 'up to 4 rounds; bar: daraksha passes all lenses, others at or above baseline' },
    { title: 'Close', detail: 'gates x2, paired runtime, served check, record' },
  ],
}

const SPEC = '/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-CT.md'
const COH = '/Users/mkbabb/Programming/value.js/docs/tranches/X/COHESION.md'
const REPO = '/Users/mkbabb/Programming/fourier-analysis'
const WT = REPO + '/.worktrees/f-ct3'
const REC = '/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/C/F-CT.md'
const EV = '~/.fourier-samples/evidence'
const LAW = `READ ${SPEC} WHOLE FIRST, especially ADDENDA (a) (the portrait assets/portraits/daraksha.jpg is PUBLIC and committed; NEVER commit the GPS-bearing original ~/.fourier-samples/daraksha.jpeg), (b) (daraksha is the primary sample), (c) and (d) (THIS phase, binding). Read ${COH} sections §0eu and §0ev (binding), and the record ${REC} ('## Phase 2': the harness, the judges' last defects, the regressions). Repo ${REPO}. The harness is bench/contours/ (read its README and __main__.py for the run command; outputs under ${EV}/<dir>). The pipeline is C (YuNet + BiSeNet parts, strokes, the postman tour): src/fourier_analysis/contours/** and src/fourier_analysis/shortest_tour.py.
WORKTREE LAW (§0ev.4): F.CT3 works ONLY in the worktree ${WT} on branch f-ct3. If it does not exist, create it: git -C ${REPO} fetch; git -C ${REPO} worktree add ${WT} -b f-ct3 origin/m/w1-bump-migration (or reuse it). Each landed round merges forward: in the main checkout's branch m/w1-bump-migration is shared with Track C (F.REL) and X-DS's fourier lane, so integrate by: git -C ${WT} fetch; git -C ${WT} merge origin/m/w1-bump-migration (resolve only your own files; never take or drop theirs blindly); push f-ct3; then fast-forward-merge f-ct3 into m/w1-bump-migration via git push origin f-ct3:m/w1-bump-migration ONLY if it is a fast-forward (otherwise merge origin/m/w1-bump-migration into f-ct3 first and retry). Never force, never reset, never stash. Commit pathspec-only your own files, messages ending "Claude-Session: https://claude.ai/code/session_01QkbQV4VgkoQgSoUj2oKZim". Model weights stay out of git (ml.py cache; FOURIER_MODEL_DIR once F.REL .m lands).
RESOURCE LAW (binding; the host thrashed at load 830 before): pytest scoped to touched modules under timeout 1200 with -x; the full suite once per round under timeout 2400; harness bench runs one process at a time, never in parallel with pytest, guarded by the lockfile ${REPO}/.worktrees/heavy.lock (create it with your label before a heavy run, wait while another holder's lock is fresh, remove it after; a lock older than 90 minutes is stale); before a heavy run wait (poll 60 s) while the 1-minute load > 40. Kill your own runaway runs; leave nothing behind. Browsers HEADLESS only. Nothing durable in /tmp or the scratchpad (§0eo): evidence under ${EV}.
No per-image special cases, no thresholds tuned to one image: structural, idiomatic cures only.`

const IMG = { type: 'object', properties: { name: { type: 'string' }, metrics: { type: 'object' }, notes: { type: 'string' } }, required: ['name', 'metrics'] }
const RUN = { type: 'object', properties: { evidenceDir: { type: 'string' }, commit: { type: 'string' }, images: { type: 'array', items: IMG }, notes: { type: 'string' } }, required: ['evidenceDir', 'images'] }
const VERDICT = { type: 'object', properties: { lens: { type: 'string' }, perImage: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, pass: { type: 'boolean' }, score: { type: 'number' }, defects: { type: 'array', items: { type: 'string' } } }, required: ['name', 'pass', 'score'] } }, summary: { type: 'string' } }, required: ['lens', 'perImage'] }
const ROUND = { type: 'object', properties: { landed: { type: 'array', items: { type: 'string' } }, commits: { type: 'array', items: { type: 'string' } }, merged: { type: 'string' }, testsGreen: { type: 'boolean' }, evidenceDir: { type: 'string' }, images: { type: 'array', items: IMG }, regressions: { type: 'array', items: { type: 'string' } }, notes: { type: 'string' } }, required: ['landed', 'testsGreen', 'evidenceDir', 'images'] }
const CLOSE = { type: 'object', properties: { verdict: { type: 'string' }, gatesGreen: { type: 'array', items: { type: 'string' } }, gatesRed: { type: 'array', items: { type: 'string' } }, commits: { type: 'array', items: { type: 'string' } }, residuals: { type: 'array', items: { type: 'string' } } }, required: ['verdict', 'gatesGreen', 'gatesRed'] }

const JUDGES = [
  { key: 'fidelity', p: 'FIDELITY: does the drawing trace the subject the way an artist would? For daraksha check every landmark: the full face outline (both cheeks, jaw, a closed chin), hairline and centre part, the braid down its length (plaits), both brows, both eye lids (not loops or squiggles), the nose bridge, both alar sides and nostrils, the upper lip and philtrum, the lower lip, the teeth line, the necklace and the neckline; no seam that reads as a scar. For every other image: its defining features and silhouette.' },
  { key: 'clean', p: 'CLEANLINESS: no background (leaves, painting, wall, texture), no fur/skin/shading iso-blobs, no spurs, staircase or scribble.' },
  { key: 'drawable', p: 'TOUR AND DRAWABILITY: one continuous closed path; no long jumps across the subject; no visible doubled strands from retracing at N=100; stroke-following order; recognisable at N=50 and near-exact at N=200.' },
]
const judge = (dir, tag) => parallel(JUDGES.map(J => () => agent(`${LAW}
TASK (JUDGE, lens ${J.key}, ${tag}; READ-ONLY, commit nothing): LOOK at EVERY overlay and every N=50/100/200 render in ${dir} with Read. ${J.p}
Score each image 0-10 with the SAME scale you would give any pipeline (scores are compared against a baseline judged by this same panel), set pass true only if a demanding human illustrator would accept it, and list concrete located defects.`, { label: `judge:${J.key}:${tag}`, phase: tag === 'base-old' || tag === 'base-c' ? 'Baseline' : 'Refine', schema: VERDICT })))

const scoreMap = vs => { const m = {}; for (const v of vs.filter(Boolean)) for (const i of v.perImage) { const k = v.lens.split(' ')[0].replace(/[^a-z]/g, ''); (m[i.name] = m[i.name] || {})[k] = i } ; return m }
// Bar (§0eu): daraksha passes all three lenses; every other image >= baseline score on each lens, mean >= 5.
const evalBar = (cur, base) => {
  const fails = []
  for (const [name, lenses] of Object.entries(cur)) {
    const isD = /daraksha/.test(name)
    const scores = []
    for (const [lens, r] of Object.entries(lenses)) {
      scores.push(r.score || 0)
      if (isD && !r.pass) fails.push({ name, lens, why: 'daraksha must pass', defects: r.defects })
      const b = base[name] && base[name][lens]
      if (!isD && b && (r.score || 0) < (b.score || 0)) fails.push({ name, lens, why: `below baseline ${b.score}`, defects: r.defects })
    }
    const mean = scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length)
    if (!isD && mean < 5) fails.push({ name, lens: 'mean', why: `mean ${mean.toFixed(2)} < 5`, defects: Object.values(lenses).flatMap(r => r.defects || []) })
  }
  return fails
}

phase('Baseline')
const [baseRun, curRun] = await parallel([
  () => agent(`${LAW}
TASK (BASELINE RUN of the PRE-F.CT pipeline; no product commits): find the last fourier commit BEFORE F.CT's tournament replaced the iso-contour pipeline (read git log of src/fourier_analysis/contours/ on m/w1-bump-migration; the phase-2 implementation commit is afc3a87 and the prototypes branched before it; pick the parent of the first F.CT phase-2 contour commit and NAME it). Check it out into a throwaway worktree ${REPO}/.worktrees/f-ct-base (detached), install with uv there, and run the harness on all images with N=50/100/200 renders into ${EV}/ct3-base-old (current harness: if the old tree's harness lacks the N=50/200 panels, run the CURRENT harness code against the OLD pipeline package, and say how). Also, under §0eu point 4, re-derive the sun reference mask (it omits the upper-right ray): find how references are produced, regenerate or correct that one reference by the documented method, receipt it in ${REC} (an addendum line), commit it pathspec on f-ct3 in ${WT}. Remove the f-ct-base worktree at the end. Return the evidence dir and per-image metrics.`, { label: 'baseline:old', phase: 'Baseline', schema: RUN }),
  () => agent(`${LAW}
TASK (CURRENT RUN of pipeline C; no product commits): in ${WT} (create per WORKTREE LAW), run the harness on all images with N=50/100/200 renders into ${EV}/ct3-base-c. Return the evidence dir, commit and per-image metrics.`, { label: 'baseline:c', phase: 'Baseline', schema: RUN }),
])
if (!baseRun || !curRun) return { status: 'BASELINE-DEAD', baseRun, curRun }
const base = scoreMap(await judge(baseRun.evidenceDir, 'base-old'))
let curJ = scoreMap(await judge(curRun.evidenceDir, 'base-c'))
let fails = evalBar(curJ, base)
log(`baseline judged; C at start: ${fails.length} bar-fails`)

phase('Refine')
const rounds = []
let cur = curRun
for (let r = 1; r <= 4 && fails.length; r++) {
  const res = await agent(`${LAW}
TASK (REFINE round ${r} of at most 4, in ${WT} on f-ct3): cure the bar-fails at their STRUCTURAL causes, daraksha first (its every landmark), then images below their baseline, then the five recall regressions (nes-rob, cauchy, giraffe, sponge-flower, sun; cause = the subject-mask rim; cure or rule each with frames) and fur wiggle. The baseline judge scores are the floor. Bar-fails: ${JSON.stringify(fails).slice(0, 28000)}. Baseline scores: ${JSON.stringify(base).slice(0, 6000)}. Current metrics: ${JSON.stringify(cur.images).slice(0, 6000)}.
Tests GREEN (resource law); harness on all images with N=50/100/200 into ${EV}/ct3-r${r}; LOOK at every overlay; commit pathspec, push f-ct3, merge forward into m/w1-bump-migration per the WORKTREE LAW; report merged sha.`, { label: `refine:ct3-r${r}`, phase: 'Refine', schema: ROUND })
  if (!res) { rounds.push({ r, dead: true }); break }
  cur = res
  curJ = scoreMap(await judge(res.evidenceDir, `ct3-r${r}`))
  fails = evalBar(curJ, base)
  rounds.push({ r, fails: fails.length, landed: res.landed, commits: res.commits, merged: res.merged, regressions: res.regressions })
  log(`round ${r}: ${fails.length} bar-fails`)
}

phase('Close')
const close = await agent(`${LAW}
TASK (CLOSE F.CT3): bar result: ${fails.length ? 'NOT MET, residual bar-fails: ' + JSON.stringify(fails).slice(0, 12000) : 'MET'}. Rounds: ${JSON.stringify(rounds).slice(0, 6000)}.
Gates x2 in ${WT} (resource law): uv run pytest tests/; api tests (MONGO_TEST_URI=mongodb://localhost:27018, throwaway DBs); harness x2 deterministic. RUNTIME per §0ev.1: paired interleaved rounds of the current pipeline against the pre-F.CT pipeline on a fixed 6-image subset (>= 31 rounds, up to 101 while the 95% bootstrap bound of the median ratio straddles the bar), load recorded at start and end; report the median ratio and its bound; RED if the bound straddles at 101. Ensure f-ct3 is merged forward into m/w1-bump-migration (fast-forward or merge, never force). Served check on :8000/:3100 with the committed assets/portraits/daraksha.jpg (restart the API at the merged HEAD with MONGO_URI=mongodb://localhost:27018/fourier BLOB_DIR=~/.mongo-dev/fourier-blobs if it predates the commits): contour, preview and epicycles read as the face. Write '## Phase 3' into ${REC} (baseline commit, scores table baseline vs final per image per lens, rounds, gates, runtime, residuals by name), commit it pathspec in value.js (tranche-u) and push. Remove the f-ct3 worktree only if fully merged.`, { label: 'close', phase: 'Close', schema: CLOSE })
return { met: fails.length === 0, residual: fails.length, rounds, close }