export const meta = {
  name: 'x-ds-deslop',
  description: 'X-DS: flat lighting across value.js, keyframes.js and fourier; archaeology of the original styles, then 12 or more fresh-critic/root-cure passes per app',
  phases: [
    { title: 'Archaeology', detail: 'recover each app\'s original styles; write the canon, the census script and the baseline' },
    { title: 'Passes', detail: '12 or more passes per app: capture, fresh critic, root cure, re-capture' },
    { title: 'Close', detail: 'a cross-app adversarial review; gates x2; record' },
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

const MIN_PASSES = 12, MAX_PASSES = 20

phase('Archaeology')
const lanes = await pipeline(APPS,
  app => agent(`${LAW}
TASK (ARCHAEOLOGY, app ${app.key}, repo ${app.repo}): recover the ORIGINAL styles from ${app.orig}.
- Check out nothing into the working tree. Read with git show and git log, or a throwaway git worktree under the repo's .worktrees/ds-orig, removed when you are done.
- If an old build can be served headlessly from that worktree, capture a few reference frames from it.
- Write ${REC}/${app.key}-canon.md: the original tone, border, radius, shadow (or the lack of one), density and type choices, with commit citations, mapped onto today's glass tokens; plus the list of lighting effects present now that the original did not have.
- Write a committed LIGHTING CENSUS script at ${app.repo === ROOT ? 'scripts/ds-census.mjs' : 'scripts/ds-census.mjs (or the repo\'s scripts dir)'}. It counts, in the app\'s own CSS and Vue styles, plus computed styles on the served pages via headless Chrome: box-shadow layers, text-shadow, filter drop-shadow and blur on chrome, gradient fills on controls, looping @keyframes on chrome, and inset highlight shadows. Output JSON.
- Capture the BEFORE frames of every route or scene at light and dark, 1440 and 390, served at ${app.served}, HEADLESS, into ${EVD}/${app.key}/pass-00/.
- Commit (force-add the PNGs).`, { label: `arch:${app.key}`, phase: 'Archaeology', schema: ARCH }),
  async (arch, app) => {
    if (!arch) return { app: app.key, dead: 'archaeology' }
    const passes = []
    let prevFrames = arch.framesDir, clean = false
    for (let n = 1; n <= MAX_PASSES; n++) {
      if (n > MIN_PASSES && clean) break
      const crit = await agent(`${LAW}
TASK (CRITIC, app ${app.key}, pass ${n} of 12 or more; READ-ONLY, commit nothing): you are a fresh, exacting design critic. Read the canon ${REC}/${app.key}-canon.md and the X-DS canon. ${n === 1 ? app.first : ''}
LOOK at the current frames in ${prevFrames} (Read every one), and capture any route or scene missing at ${app.served} HEADLESS. Scope: ${app.scope}.
Name EVERY violation: over-shading, lighting, gloss, glow, gleam, stacked shadows, decorative gradients, idle shimmer, affected motion, floating or unanchored glyphs, ornament that carries no meaning, and anywhere the original style was better (density, borders, tone). Also name what is still WRONG in hierarchy or proportion. Give each finding its location (route, element and, where you can, file:line), cause, cure, and owner: consumer, or glass (O-87).
Prior passes' results, to avoid re-reporting cured items: ${JSON.stringify(passes.map(p => ({ n: p.n, cured: p.cure && p.cure.cured, deferredGlass: p.cure && p.cure.deferredGlass }))).slice(0, 6000)}
If nothing above trivial remains, say so plainly in the verdict.`, { label: `crit:${app.key}:p${n}`, phase: 'Passes', schema: CRIT })
      if (!crit) { passes.push({ n, dead: 'critic' }); continue }
      const real = crit.findings.filter(f => f.severity !== 'trivial')
      clean = real.length === 0
      if (clean && n >= MIN_PASSES) { passes.push({ n, crit: { verdict: crit.verdict, count: 0 } }); break }
      const cure = await agent(`${LAW}
TASK (CURE, app ${app.key}, pass ${n}; repo ${app.repo}): cure the critic's CONSUMER findings at their ROOT (tokens and shared styles before instances; delete affectation rather than adding counter-styles). For GLASS-owned findings, cite O-87 and leave them; do not override glass locally. Keep identity hues, type and meaningful motion (§0dm).
Findings: ${JSON.stringify(crit.findings).slice(0, 24000)}
${clean ? 'The critic found nothing above trivial; refine the remaining trivial items toward the original styles (density, borders, tone) without regressing anything.' : ''}
Then:
- run the app's type-check and unit tests, plus the e2e specs that touch the changed files (headless), ×2 GREEN, re-baselining a visual golden only as a named owner-ruling re-baseline (§0ej) in the commit body;
- re-run the census;
- capture AFTER frames for the same cells into ${EVD}/${app.key}/pass-${String(n).padStart(2, '0')}/ (headless);
- commit (force-add the PNGs);
- append a "### pass ${n}" receipt to ${REC}/${app.key}.md and commit it.`, { label: `cure:${app.key}:p${n}`, phase: 'Passes', schema: CURE })
      passes.push({ n, crit: { verdict: crit.verdict, count: real.length }, cure })
      if (cure && cure.framesAfter) prevFrames = cure.framesAfter
      log(`${app.key} pass ${n}: ${real.length} findings; cured ${cure ? cure.cured.length : 0}`)
    }
    return { app: app.key, arch, passes }
  })

phase('Close')
const close = await agent(`${LAW}
TASK (CLOSE, an adversarial cross-app review): LOOK at the final frames of all three apps side by side (the last pass dirs under ${EVD}/<app>/) against pass-00. Try to REFUTE the claim that they now meet the X-DS canon: name any remaining gloss, glow, stacked shadow, decorative gradient, idle shimmer or floating glyph, and any lost identity. Then:
- run each app's type-check, unit tests and e2e (headless) ×2;
- write ${REC}/CLOSE.md: the per-app census before and after, the pass counts, the residuals (consumer-open items get a named owner; glass items are held under O-87), and the cross-app verdict;
- commit and push value.js tranche-u.
Lanes: ${JSON.stringify(lanes.map(l => l && ({ app: l.app, passes: (l.passes || []).map(p => ({ n: p.n, count: p.crit && p.crit.count, cured: p.cure && p.cure.cured && p.cure.cured.length, deferredGlass: p.cure && p.cure.deferredGlass })) }))).slice(0, 20000)}`, { label: 'close', phase: 'Close', schema: CLOSE })
return { lanes: lanes.map(l => l && ({ app: l.app, passes: (l.passes || []).length })), close }
