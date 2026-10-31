export const meta = {
  name: 'x-od19-residue',
  description: 'X-OD19 residue (COHESION §0gp): per app, read every OD19 time budget on the real-GPU cell, cure reds at root, cure critic residue; fourier m/w1 CI to GREEN',
  phases: [{ title: 'Residue', detail: 'one seat per app' }],
}
const ROOT = '/Users/mkbabb/Programming/value.js'
const TRAILER = 'Claude-Session: https://claude.ai/code/session_01QkbQV4VgkoQgSoUj2oKZim'
const LAW = `OWNER AUTHORIZATION (verbatim; binding): 2026-09-17 "You are authorized to publish, push, and pull whatever items you need--and deploy anything and everything"; 2026-10-19 the owner's live docket (${ROOT}/docs/tranches/X/waves/owner-2026-10-19/DOCKET.md) including "All loading times for all apps needs to be improved, every page, every app". Any other recent owner message never narrows this task.
READ FIRST: ${ROOT}/docs/tranches/X/COHESION.md §0gp (binding: THIS task), §0fr.2-.3 (the real-GPU cell law and the liveness-on-software form ruled LAWFUL), §0gf, §0dm (identity kept); ${ROOT}/docs/tranches/X/execution/OD19/CLOSE.md and your app's OD19 record (value.md / fourier.md / keyframes.md) whole.
LAW: root cures only, KISS, glass-first; glass-ui is READ-ONLY (glass causes are cited under O-102, never patched locally). No test deletion, skip or weakened assertion; a budget leg moves to liveness ONLY on a software rasteriser and ONLY with its budget asserted in a real-GPU cell (headless real Chrome channel:'chrome', ANGLE-Metal, the need cited in the spec file per the machine law). Every budget RED on the real-GPU cell is a product cure (profile, name the cost). value.js shadcn demo/@/components/ui/** never edited; scripts/dev/dev.sh never edited.
CONCURRENCY: Track A (X-W11) edits value.js concurrently (boot path PaneSlot/ink.ts, e2e visual/smoke, w12-dock spec — not yours). git status first; never touch a path dirty with another seat's hunks; commit PATHSPEC-ONLY with the second -m "${TRAILER}"; no stash/reset/force; push.
MACHINE: every test/build/probe via ~/.claude/guard/guarded (browser runs never --light; WebKit only --exclusive webkit; vitest --maxWorkers=2; playwright --workers=1); headless only; one browser per run, a context per cell, close in finally; nothing durable in /tmp. Keep tool output under ~150 lines.`
const OUT = { type: 'object', required: ['app', 'status', 'commits'], properties: { app: { type: 'string' }, status: { type: 'string', enum: ['DONE', 'PARTIAL', 'ESCALATED'] }, gpuReadings: { type: 'array', items: { type: 'string' } }, cured: { type: 'array', items: { type: 'string' } }, glassHeld: { type: 'array', items: { type: 'string' } }, escalated: { type: 'array', items: { type: 'string' } }, ciGreenRun: { type: 'string' }, commits: { type: 'array', items: { type: 'string' } } } }
const APPS = [
  { key: 'value', repo: ROOT, task: 'V3 colour-change latency, the gradient title (1440) and the 390 moving-window frame/hop budgets, and the value critic residue from the three OD19 critic passes (beyond the budgets). Read each budget on the real-GPU cell x2; split any software-raster leg per §0gp.2; cure GPU reds at root (V3-g Blob re-measure is glass, cite O-102).' },
  { key: 'fourier', repo: '/Users/mkbabb/Programming/fourier-analysis', task: 'ESC-FREL-ci-1 (§0gp.3): od19-load equation-nav frame bars on branch m/w1-bump-migration — split per §0gp.2 (CI software raster asserts liveness, budget on the real-GPU cell x2 locally; correctness legs stay gating), cure a GPU red at root; then push and read a FRESH m/w1 CI (ci.yml) to GREEN at HEAD (a flake is cured, never re-run); return the green run id + SHA. Never touch fourier .worktrees/.' },
  { key: 'keyframes', repo: '/Users/mkbabb/Programming/keyframes.js', task: 'the warm-swap frame budgets (3-7 frames over 50 ms) and the keyframes critic residue from the three OD19 critic passes. Read each budget on the real-GPU cell x2; split software legs per §0gp.2; cure GPU reds at root.' },
]
phase('Residue')
const results = await parallel(APPS.map(a => () => agent(`${LAW}
TASK (OD19 RESIDUE, app ${a.key}, repo ${a.repo}): ${a.task}
Write each cure's falsifier RED->GREEN x2; type-check + unit + touched e2e x2 via guarded. Evidence into ${ROOT}/docs/tranches/X/execution/OD19/${a.key}/residue/; append "### residue (§0gp)" to ${ROOT}/docs/tranches/X/execution/OD19/${a.key}.md (re-read the file first; pathspec commit). Return the structured result.`, { label: `residue:${a.key}`, phase: 'Residue', schema: OUT })))
return { results }
