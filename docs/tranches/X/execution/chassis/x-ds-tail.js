export const meta = {
  name: 'x-ds-tail',
  description: 'X-DS tail: the keyframes and value lanes each reach one clean fresh critic (the stopping rule unmet at the 20-pass ceiling); kf dead-seat hunks adopted or discarded; value PaneShell seated-prop retirement; dated close addendum',
  phases: [
    { title: 'Owed', detail: 'per-lane owed residuals from CLOSE.md (kf dead-seat hunks; value PaneShell seated props)' },
    { title: 'Passes', detail: 'fresh critic -> root cure until one clean critic (passes 21+)' },
    { title: 'Addendum', detail: 'dated CLOSE addendum; gates x2' },
  ],
}

const ROOT = '/Users/mkbabb/Programming/value.js'
const SPEC = ROOT + '/docs/tranches/X/waves/X-DS.md'
const COH = ROOT + '/docs/tranches/X/COHESION.md'
const REC = ROOT + '/docs/tranches/X/execution/DS'
const EVD = ROOT + '/docs/tranches/X/evidence/DS'
const LAW = `READ ${SPEC} WHOLE FIRST (it binds), then ${COH} §0dm (identity colours, type and motion are kept; stripping them is an owner ruling, never a cure), §0ei (browsers ONLY headless: real Chrome as channel "chrome", headless true; WebKit headless; NEVER a visible window) and §0ej. glass-ui is READ-ONLY: a glass-owned lighting excess is cited against O-87 FLAT-LIGHTING (value.js docs/tranches/X/relay/X-ALL-BK-FLAT-LIGHTING.md) and never overridden locally. KISS and glass-first: no new wrapper components or shared dirs; never edit value.js demo/@/components/ui/** (shadcn); tokens before instances. Other workflows are editing these repos right now, so read git status first; touch only what your task needs; commit PATHSPEC-ONLY your own files, with messages ending in "Claude-Session: https://claude.ai/code/session_01QkbQV4VgkoQgSoUj2oKZim". If a file you need is dirty with someone else's hunks, stage only your own hunks (index blob: HEAD plus your change, git hash-object -w, git update-index --cacheinfo) and commit WITHOUT a pathspec after checking git diff --cached. No stash, no reset, no force. Push the keyframes and fourier branches fast-forward only; value.js may push tranche-u. Never touch value.js scripts/dev/dev.sh (running it is fine). Use playwright sparingly, and frames as evidence.`

const APPS = [
  { key: 'keyframes', repo: '/Users/mkbabb/Programming/keyframes.js', served: 'http://localhost:5173 (the keyframes dev server; if a stale glass bundle is served, restart it with vite --force)', scope: 'demo/** (every scene: the cube, Easing, Spring, Sequence, Timeline, Keyframes, the dock and panes)', orig: 'the branch kf-sacred-snapshot-2026-09-17 and the pre-glass history; the owner names the original keyframes UI "flatly lit and proper design"', first: 'FIRST in pass 1: the floating eye (visibility) icon in the owner frame value.js docs/tranches/X/waves/owner-2026-10-06/kf-floating-eye-overlit.png sits at the dashed ghost dot\'s corner with no anchor or meaning. Give it a proper home (a labelled toggle inside the card\'s controls, or remove it if redundant) and flatten that card (the Reverse button\'s brown glow, the violet dot\'s halo, the card\'s shadow stack). Then the cube: flat faces, a small tonal step per face, no gloss, glow or bloom.' },
  { key: 'value', repo: ROOT, served: 'http://localhost:9000 (value.js dev; started by scripts/dev/dev.sh, which you may run but never edit)', scope: 'demo/** except demo/@/components/ui/** (the color picker, palette browser, gradient, mix, image palette, the dock, the hero blob and aurora as identity backdrops: keep them, but take the gloss off any chrome over them)', orig: 'the pre-glass color-picker era in git history (before the glass dock adoption; find it with git log on demo/ and the style files)', first: 'Start from the most lit chrome: the dock plate and its controls, cards and panes, the action bars, buttons with glow or gradient, and text-shadows.' },
  { key: 'fourier', repo: '/Users/mkbabb/Programming/fourier-analysis', served: 'http://localhost:3100 against the API on :8000 (MONGO_URI=mongodb://localhost:27018/fourier, BLOB_DIR=~/.mongo-dev/fourier-blobs)', scope: 'web/src/** (the shell and dock, /visualize stage and Configurator pane, /equation, /morph, /gallery, /paper; the canvas renderings\' chrome, meaning the epicycle circles\' glows and shimmer on hover, but not their identity hues)', orig: 'the pre-X.F.W11 chrome (before commit 53aaa6f) in git history', first: 'Start from the canvas glows and golden shimmer, the dock and Configurator lighting, the cartoon-card stamps and offset shadows, and any glow on the epicycles beyond its identity hue.' },
]

const ARCH = { type: 'object', properties: { canon: { type: 'string' }, origCommits: { type: 'array', items: { type: 'string' } }, censusCmd: { type: 'string' }, censusBefore: { type: 'object' }, framesDir: { type: 'string' }, commits: { type: 'array', items: { type: 'string' } } }, required: ['canon', 'censusCmd', 'framesDir'] }
const CRIT = { type: 'object', properties: { pass: { type: 'number' }, framesDir: { type: 'string' }, findings: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, severity: { type: 'string', enum: ['high', 'medium', 'low', 'trivial'] }, where: { type: 'string' }, what: { type: 'string' }, cause: { type: 'string' }, cure: { type: 'string' }, owner: { type: 'string', enum: ['consumer', 'glass'] } }, required: ['id', 'severity', 'where', 'what', 'owner'] } }, verdict: { type: 'string' } }, required: ['pass', 'findings', 'verdict'] }
const CURE = { type: 'object', properties: { pass: { type: 'number' }, cured: { type: 'array', items: { type: 'string' } }, deferredGlass: { type: 'array', items: { type: 'string' } }, refused: { type: 'array', items: { type: 'string' } }, censusAfter: { type: 'object' }, gatesGreen: { type: 'boolean' }, framesAfter: { type: 'string' }, commits: { type: 'array', items: { type: 'string' } } }, required: ['pass', 'cured', 'gatesGreen', 'commits'] }
const CLOSE = { type: 'object', properties: { verdict: { type: 'string' }, perApp: { type: 'array', items: { type: 'object', properties: { app: { type: 'string' }, passes: { type: 'number' }, censusBefore: { type: 'object' }, censusAfter: { type: 'object' }, residual: { type: 'array', items: { type: 'string' } } } } }, commits: { type: 'array', items: { type: 'string' } } }, required: ['verdict'] }


const EXTRA = ` TAIL LAW (2026-10-19): X-DS CLOSED at ${REC}/CLOSE.md (7c0fb2710) with keyframes and value each owing ONE clean fresh critic. Track A's X-W11 is running concurrently: X.W11.ci4 owns the value dock seat at 390 (the dock's own layout files under demo/**) and X.W11.ci1 owns .github/workflows/**; never touch those, and never touch any file dirty with another seat's hunks. The Mac rebooted at 12:10 (zone gate clear); every heavy run via ~/.claude/guard/guarded (browser runs never --light; WebKit --exclusive webkit; vitest --maxWorkers=2; playwright --workers=1).`
const OWED = {
  keyframes: `The dead r8 pass-11 seat left uncommitted hunks in keyframes.js demo ControlsPaneWrapper.vue and SpringHeatmap.vue (find them with git status/diff). Read each hunk whole; judge it against the X-DS canon (${REC}/keyframes-canon.md) and the pass-11 critic findings it answers (grep ${REC}/keyframes.md); ADOPT each conforming hunk (finish it, gates x2, commit with the finding id named) or DISCARD it by restoring only that path's hunk with git restore -p equivalents applied to YOUR judged hunks only (never a blanket checkout of a file holding other seats' hunks; never stash). Record every hunk's disposition by id in ${REC}/keyframes.md under "### tail: dead-seat hunks".`,
  value: `Retire PaneShell's seated prop at its 9 call sites (CLOSE.md value residual): find the prop's definition and every consumer with grep; migrate the consumers to the current API at the root and delete the prop (no compat shim); vue-tsc 0, vitest, and the e2e specs touching the changed panes x2 GREEN; commit; receipt under "### tail: PaneShell seated prop" in ${REC}/value.md.`,
}
const lanes = await pipeline(APPS.filter(a => a.key !== 'fourier'),
  app => agent(`${LAW}${EXTRA}
TASK (OWED, app ${app.key}, repo ${app.repo}): ${OWED[app.key]} Return the CURE schema with pass 0.`, { label: `owed:${app.key}`, phase: 'Owed', schema: CURE }),
  async (owed, app) => {
    const passes = []
    let clean = false
    for (let n = 21; n <= 26 && !clean; n++) {
      const crit = await agent(`${LAW}${EXTRA}
TASK (CRITIC, app ${app.key}, pass ${n}; READ-ONLY, commit nothing): you are a FRESH, exacting design critic who authored none of these bytes. Read the canon ${REC}/${app.key}-canon.md and ${REC}/CLOSE.md. CAPTURE fresh HEADLESS frames of every route/scene at ${app.served}, light and dark, 1440 and 390, into ${EVD}/${app.key}/pass-${n}/critic/ and LOOK at every one. Scope: ${app.scope}.
Name EVERY consumer-owned violation (over-shading, gloss, glow, stacked shadows, decorative gradients, idle shimmer, affected motion, floating glyphs, meaningless ornament, places the original style was better, hierarchy/proportion faults) with location, cause, cure and owner. Glass-owned rows held under O-87/O-88 and owner-ruling rows listed in CLOSE.md are NOT re-reported (cite them only if they regressed).
Prior tail passes: ${JSON.stringify(passes.map(p => ({ n: p.n, cured: p.cure && p.cure.cured }))).slice(0, 4000)}
If nothing above trivial remains, say so plainly in the verdict.`, { label: `crit:${app.key}:p${n}`, phase: 'Passes', schema: CRIT })
      if (!crit) { passes.push({ n, dead: 'critic' }); continue }
      const real = crit.findings.filter(f => f.severity !== 'trivial' && f.owner === 'consumer')
      clean = real.length === 0
      if (clean) { passes.push({ n, clean: true, verdict: crit.verdict }); break }
      const cure = await agent(`${LAW}${EXTRA}
TASK (CURE, app ${app.key}, pass ${n}; repo ${app.repo}): cure these CONSUMER findings at their ROOT (tokens and shared styles before instances; delete affectation rather than add counter-styles); keep identity hues, type and meaningful motion (§0dm). Findings: ${JSON.stringify(real).slice(0, 20000)}
Then: type-check, unit tests and the e2e specs touching changed files (headless, guarded) x2 GREEN; re-run the census; AFTER frames into ${EVD}/${app.key}/pass-${n}/; commit (force-add PNGs); append "### pass ${n}" to ${REC}/${app.key}.md and commit.`, { label: `cure:${app.key}:p${n}`, phase: 'Passes', schema: CURE })
      passes.push({ n, count: real.length, cure })
      log(`${app.key} tail pass ${n}: ${real.length} consumer findings; cured ${cure ? cure.cured.length : 0}`)
    }
    return { app: app.key, owed, passes, clean }
  })
const add = await agent(`${LAW}${EXTRA}
TASK (ADDENDUM): write ${REC}/CLOSE-ADDENDUM-2026-10-19.md (E-3: CLOSE.md is never edited): per lane the owed-residual dispositions, the tail passes and whether the stopping rule is now MET (a clean fresh critic), census after (run each census script), and the remaining glass (O-87/O-88) and owner-ruling rows unchanged. Run value vue-tsc + vitest and keyframes check + lib + demo tests x2 (guarded). Commit pathspec and push value.js tranche-u and keyframes master fast-forward.
Lanes: ${JSON.stringify(lanes).slice(0, 16000)}`, { label: 'addendum', phase: 'Addendum', schema: CLOSE })
return { lanes: lanes.map(l => l && ({ app: l.app, clean: l.clean, passes: l.passes.length })), add }
