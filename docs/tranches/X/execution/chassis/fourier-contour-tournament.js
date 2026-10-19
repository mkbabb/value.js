export const meta = {
  name: 'fourier-contour-tournament',
  description: 'F.CT phase 2: three contour approaches prototyped in fourier worktrees, judged on the full set; winner implemented, then refined until every judge passes every image',
  phases: [
    { title: 'Prototype', detail: 'A landmarks · B learned line drawing · C face parsing; each measured and judged' },
    { title: 'Select', detail: 'one winner plus grafts' },
    { title: 'Implement', detail: 'the winner on m/w1-bump-migration' },
    { title: 'Refine', detail: 'measure, 3-judge panel, loop until all PASS' },
    { title: 'Close', detail: 'gates x2, quiet-host runtime, served check, record' },
  ],
}

const SPEC = '/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-CT.md'
const REPO = '/Users/mkbabb/Programming/fourier-analysis'
const REC = '/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/C/F-CT.md'
const EV = '~/.fourier-samples/evidence'
const LAW = `READ ${SPEC} WHOLE FIRST, especially ADDENDUM (a) (the portrait assets/portraits/daraksha.jpg is PUBLIC and committed; NEVER commit the GPS-bearing original ~/.fourier-samples/daraksha.jpeg), ADDENDUM (b) (daraksha is the primary, default sample) and ADDENDUM (c) (this tournament, binding). Read the record ${REC} (round 1's receipts, the harness, the bar, the judges' last defects). Repo ${REPO}. The harness is bench/contours/ (read its README and __main__.py for the run command; outputs go under ${EV}/<dir>). The production pipeline lives in src/fourier_analysis/contours/** and src/fourier_analysis/shortest_tour.py. The API route is api/routers/contours.py. Law: branch m/w1-bump-migration is shared with Track C, which works in web/** and api/**. Never stage, revert, stash or format others' files; commit PATHSPEC-ONLY your own files, with messages ending in "Claude-Session: https://claude.ai/code/session_01QkbQV4VgkoQgSoUj2oKZim"; no reset, no force-push. Model weights stay out of git (cache them the way contours/ml.py does). No per-image special cases and no thresholds tuned to one image: structural, idiomatic approaches only. Machine load is high, so runtime numbers do not count unless the 1-minute load is < 8.`

const IMG = { type: 'object', properties: { name: { type: 'string' }, metrics: { type: 'object' }, overlay: { type: 'string' }, notes: { type: 'string' } }, required: ['name', 'metrics'] }
const PROTO = { type: 'object', properties: { approach: { type: 'string' }, worktree: { type: 'string' }, branch: { type: 'string' }, design: { type: 'string' }, models: { type: 'array', items: { type: 'string' } }, evidenceDir: { type: 'string' }, images: { type: 'array', items: IMG }, commits: { type: 'array', items: { type: 'string' } }, notes: { type: 'string' } }, required: ['approach', 'worktree', 'branch', 'design', 'evidenceDir', 'images'] }
const VERDICT = { type: 'object', properties: { lens: { type: 'string' }, perImage: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, pass: { type: 'boolean' }, score: { type: 'number' }, defects: { type: 'array', items: { type: 'string' } } }, required: ['name', 'pass'] } }, summary: { type: 'string' } }, required: ['lens', 'perImage'] }
const SELECT = { type: 'object', properties: { winner: { type: 'string' }, why: { type: 'string' }, grafts: { type: 'array', items: { type: 'string' } }, plan: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, title: { type: 'string' }, files: { type: 'array', items: { type: 'string' } }, expected: { type: 'string' } }, required: ['id', 'title'] } } }, required: ['winner', 'why', 'plan'] }
const ROUND = { type: 'object', properties: { landed: { type: 'array', items: { type: 'string' } }, commits: { type: 'array', items: { type: 'string' } }, testsGreen: { type: 'boolean' }, evidenceDir: { type: 'string' }, images: { type: 'array', items: IMG }, regressions: { type: 'array', items: { type: 'string' } }, notes: { type: 'string' } }, required: ['landed', 'testsGreen', 'evidenceDir', 'images'] }
const CLOSE = { type: 'object', properties: { verdict: { type: 'string' }, gatesGreen: { type: 'array', items: { type: 'string' } }, gatesRed: { type: 'array', items: { type: 'string' } }, commits: { type: 'array', items: { type: 'string' } }, residuals: { type: 'array', items: { type: 'string' } } }, required: ['verdict', 'gatesGreen', 'gatesRed'] }

const JUDGES = [
  { key: 'fidelity', p: 'FIDELITY: does the drawing trace the subject the way an artist would? For daraksha, check every landmark: the full face outline (both cheeks and jaw, a closed chin), the hairline and centre part, the braid down its length, both brows, both eye lids (not squiggles), the nose bridge and base, the upper and lower lip and the teeth line, the necklace and the neckline. For every other image, the subject silhouette and its defining features.' },
  { key: 'clean', p: 'CLEANLINESS: no background (leaves, painting, wall, texture), no fur/skin/shading iso-blobs, no spurs, staircase or scribble.' },
  { key: 'drawable', p: 'TOUR AND DRAWABILITY: one continuous closed path; no long jumps across the subject; no visible doubled or tripled strands from retracing at N=100 (a retrace must coincide with its stroke); stroke-following order; the epicycle reconstruction recognisable at N=50 and near-exact at N=200.' },
]
const judge = (dir, tag) => parallel(JUDGES.map(J => () => agent(`${LAW}
TASK (JUDGE, lens ${J.key}, ${tag}; READ-ONLY, commit nothing): LOOK at EVERY overlay in ${dir} with Read (the tour over the dimmed image plus the N=50/100/200 epicycle renders; if the harness writes several per image, read them all). ${J.p}
Strict bar: an image PASSes only if a demanding human illustrator would accept it as a faithful line drawing of that subject. Score each image 0-10 and list concrete defects with location. Be specific about what is missing or wrong, never generic.`, { label: `judge:${J.key}:${tag}`, phase: tag.startsWith('proto') ? 'Prototype' : 'Refine', schema: VERDICT })))

const APPROACHES = [
  { key: 'A', name: 'landmarks + silhouette', p: 'APPROACH A: where a face is detected, a face-landmark model (MediaPipe FaceMesh or face-alignment, whichever installs cleanly with uv) gives the facial feature lines as ordered polylines: brows, upper and lower eye lids, nose bridge and base, the outer and inner lips, the jaw and chin. The ensemble subject mask (contours/ml.py) gives the silhouette. The hair and braid come from a hair-segmentation boundary (a small face-parsing or hair-matting model). For non-face images (the animals, sun, sponges) fall back to a learned line model as in approach B so the whole set is covered.' },
  { key: 'B', name: 'learned line drawing', p: 'APPROACH B: a photo-to-line-drawing model (Informative Drawings, from Chan et al. 2022, is the primary candidate; anime2sketch or TEED/PiDiNet edges with non-maximum suppression and thinning are fallbacks) under the subject mask, then skeletonise and vectorise the lines into a stroke graph (nodes at junctions and ends; polyline edges smoothed per stroke).' },
  { key: 'C', name: 'semantic part boundaries', p: 'APPROACH C: a face-parsing model (BiSeNet-class, 19 labels: skin, brows, eyes, nose, lips, hair, neck, cloth, necklace) whose label-region boundaries become strokes, deduplicated so a shared boundary is one stroke; for non-face subjects, the subject mask plus an edge or part model constrained to it.' },
]
const COMMON_TOUR = 'THE TOUR (common to all approaches, per addendum (c)): strokes form a graph, and the closed path is a MINIMUM-RETRACE walk (Chinese-postman augmentation: pair odd-degree nodes by shortest along-graph paths; connectors between components routed along existing strokes where possible, otherwise short straight jumps chosen by an MST over the components). Every retrace coincides with its stroke. Then arc-length resampling that preserves corners and junctions.'

phase('Prototype')
const protos = await pipeline(APPROACHES,
  A => agent(`${LAW}
TASK (PROTOTYPE ${A.key}: ${A.name}): ${A.p}
${COMMON_TOUR}
Work ONLY in your own git worktree: git -C ${REPO} worktree add ${REPO}/.worktrees/ct2-${A.key} -b f-ct2/${A.key} m/w1-bump-migration (reuse it if it exists). Keep the public API of the extraction (what api/routers/contours.py calls) unchanged, so the harness runs unmodified. Add dependencies with uv in the worktree only. Build it properly, not a toy: this may become production. Run the harness on ALL 19 images with --out ${EV}/ct2-proto-${A.key} --tag ct2-${A.key}, LOOK at every overlay yourself, and iterate on structural causes (at most 3 internal passes) before returning. Commit on your branch (pathspec) and push the branch to origin. Return per-image metrics and the evidence dir.`, { label: `proto:${A.key}`, phase: 'Prototype', schema: PROTO }),
  (p, A) => p ? judge(p.evidenceDir, `proto-${A.key}`).then(v => ({ ...p, verdicts: v.filter(Boolean) })) : null)
const ok = protos.filter(Boolean)
log(`prototypes returned: ${ok.map(p => p.approach).join(', ') || 'none'}`)
if (!ok.length) return { status: 'PROTOTYPES-DEAD' }
const tally = ok.map(p => ({ approach: p.approach, branch: p.branch, passes: p.verdicts.map(v => ({ lens: v.lens, pass: v.perImage.filter(i => i.pass).length, mean: (v.perImage.reduce((s, i) => s + (i.score || 0), 0) / Math.max(1, v.perImage.length)).toFixed(2) })) }))
log('tally: ' + JSON.stringify(tally))

phase('Select')
const sel = await agent(`${LAW}
TASK (SELECT, READ-ONLY): choose the winning approach, name the grafts from the runners-up, and write an ordered implementation plan onto m/w1-bump-migration (production code in src/fourier_analysis/contours/** and shortest_tour.py, dead code from the retired iso-contour path deleted, tests in tests/**, the harness bench/contours/** as needed). Consider the judges' scores and defects, the metrics against the ORIGINAL baseline (no public regression), the runtime and model weight cost, determinism, and generality beyond these 19 images. LOOK at the overlays in each prototype's evidence dir yourself before deciding.
Prototypes: ${JSON.stringify(ok.map(p => ({ approach: p.approach, branch: p.branch, worktree: p.worktree, design: p.design, models: p.models, evidenceDir: p.evidenceDir, images: p.images, notes: p.notes, verdicts: p.verdicts }))).slice(0, 60000)}`, { label: 'select', phase: 'Select', schema: SELECT })
if (!sel) return { status: 'SELECT-DEAD', tally }
log(`winner: ${sel.winner}; grafts: ${(sel.grafts || []).length}`)

phase('Implement')
let cur = await agent(`${LAW}
TASK (IMPLEMENT the winner on m/w1-bump-migration): winner ${sel.winner} (${sel.why}). Grafts: ${JSON.stringify(sel.grafts || [])}. Plan: ${JSON.stringify(sel.plan)}. Prototype branches: ${ok.map(p => p.branch + ' @ ' + p.worktree).join('; ')}.
Land it as production code (not a cherry-pick of prototype scaffolding): delete the retired iso-contour paths it supersedes; unit tests for the stroke graph and the minimum-retrace tour (closed, every edge covered, retraces coincident, connector count and length bounded); keep bench/contours tests green; update pyproject/uv.lock for new deps. uv run pytest tests/ GREEN; api tests with MONGO_TEST_URI=mongodb://localhost:27018 GREEN. Run the harness on all 19 with --out ${EV}/ct2-impl --tag ct2-impl, LOOK at the overlays, commit pathspec and push the branch.`, { label: 'implement', phase: 'Implement', schema: ROUND })
if (!cur) return { status: 'IMPLEMENT-DEAD', sel }

phase('Refine')
const rounds = []
let passed = false
for (let r = 1; r <= 8 && !passed; r++) {
  const v = (await judge(cur.evidenceDir, `ct2-r${r}`)).filter(Boolean)
  const fails = v.flatMap(x => x.perImage.filter(i => !i.pass).map(i => ({ lens: x.lens, name: i.name, defects: i.defects })))
  rounds.push({ r, fails: fails.length, landed: cur.landed, commits: cur.commits, regressions: cur.regressions })
  log(`round ${r}: ${fails.length} judge-fails across ${v.length} lenses`)
  if (v.length === 3 && fails.length === 0) { passed = true; break }
  cur = await agent(`${LAW}
TASK (REFINE round ${r}, on m/w1-bump-migration, the ${sel.winner} pipeline): cure the judges' defects at their STRUCTURAL causes (no per-image hacks), with the daraksha landmarks first, then the public regressions against the original baseline. Judge fails: ${JSON.stringify(fails).slice(0, 30000)}. Current metrics: ${JSON.stringify(cur.images).slice(0, 8000)}.
If a defect's cure needs an approach change (for example, a better model), make it and say so. Tests GREEN; harness on all 19 with --out ${EV}/ct2-r${r} --tag ct2-r${r}; LOOK at every overlay; commit pathspec and push.`, { label: `refine:ct2-r${r}`, phase: 'Refine', schema: ROUND })
  if (!cur) { rounds.push({ r, dead: true }); break }
}

phase('Close')
const close = await agent(`${LAW}
TASK (CLOSE): gates x2: uv run pytest tests/; api tests (MONGO_TEST_URI=mongodb://localhost:27018, throwaway DBs); harness x2, deterministic. RUNTIME: wait (bounded, up to 60 min, re-checking every few minutes) for a 1-minute load < 8, then time the harness solo; if it never quiets, record the runtime UNREAD, never claimed. Served check: the API on :8000 (restart it at the new HEAD with the same env if it predates the commits; MONGO_URI=mongodb://localhost:27018/fourier, BLOB_DIR=~/.mongo-dev/fourier-blobs) and :3100; upload the ORIGINAL ~/.fourier-samples/daraksha.jpeg (EXIF orientation 6) and assets/portraits/daraksha.jpg; check that the contour, preview and epicycles read right by eye; save frames to ${EV}/ct2-served/. The judges' round result: ${passed ? 'ALL PASS' : 'NOT all pass'}; rounds: ${JSON.stringify(rounds).slice(0, 6000)}. Append a "## Phase 2 — the approach tournament" section to ${REC} with the tally ${JSON.stringify(tally)}, the winner and why, the per-round results, a before/after metrics table (the original baseline, round 1's close, now), the gates and residuals; commit pathspec in value.js and push tranche-u.`, { label: 'close', phase: 'Close', schema: CLOSE })
return { passed, tally, winner: sel.winner, rounds, close }
