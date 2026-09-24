export const meta = {
  name: 'audit-2',
  description: 'AUDIT-2: component cogency, mobile views, and design hierarchy/space across value.js, keyframes.js and fourier — registers per app + one glass letter',
  phases: [
    { title: 'Audit', detail: 'per app: component cogency, mobile views, hierarchy and space' },
    { title: 'Register', detail: 'one register per app per lens-set, rows routed to cure waves' },
    { title: 'Glass', detail: 'one letter for the glass rows' },
    { title: 'Critic', detail: 'completeness critic' },
  ],
}
const VJ = '/Users/mkbabb/Programming/value.js'
const X = VJ + '/docs/tranches/X'
const EV = X + '/audit/audit-2'
const OWNER = 'THE OWNER, verbatim (2026-09-24): "ensure that we\'re not duplicating any component in any view, too: KISS, DRY. Audit our component structure for cogency in every project." … "Audit every mobile view for every mobile app view for all projects, too." … "All issues should be fixed at the glass-ui root, too." … "Ensure proper design hierarchy and usage of space in all UIs hereof". SPEC: ' + X + '/audit/AUDIT-2.md (READ whole: Lens 1 component cogency, Lens 2 mobile views, Lens 3 hierarchy and space).'
const LAW = 'LAW: Opus 5.5. READ-ONLY on every product tree (value.js demo/, keyframes.js demo/, fourier-analysis web/src, glass-ui). Write ONLY under your seat dir. Never touch scripts/dev/dev.sh. No commits (the register seats commit). Served pages, headed Chromium on the real GPU: value.js http://localhost:9000, keyframes http://localhost:5173, fourier http://localhost:3100 (API :8000). CONTEXT ECONOMY: save frames to disk, never read many images back into context; cite file:line. Screenshots stay git-excluded (never force-add PNG/WEBM). Each finding: id, app, view/route, lens, severity (BROKEN/HIGH/MEDIUM/LOW), evidence (file:line and/or frame path), cause, cure, owner (consumer file(s) or GLASS with the glass file), and whether an earlier register row (UI-AUDIT-*, KF-ANIMATION-AUDIT, O-53..O-68) already covers it (cite, do not duplicate).'
const APPS = [
  { key: 'value', name: 'value.js', src: VJ + '/demo', url: 'http://localhost:9000', prior: X + '/audit/UI-AUDIT-value.md', wave: 'X-W12 (or its successor)' },
  { key: 'keyframes', name: 'keyframes.js', src: '/Users/mkbabb/Programming/keyframes.js/demo', url: 'http://localhost:5173', prior: X + '/audit/UI-AUDIT-keyframes.md', wave: 'KF.W13X' },
  { key: 'fourier', name: 'fourier-analysis', src: '/Users/mkbabb/Programming/fourier-analysis/web/src', url: 'http://localhost:3100', prior: X + '/audit/UI-AUDIT-fourier.md', wave: 'F.W14U' },
]
const LENSES = [
  { key: 'L1', p: 'LENS 1, COMPONENT COGENCY. Read the source tree whole (by directory listing first, then the files that matter). Find: duplicate components/composables doing one job (e.g. preview toggles, tables of contents, pickers, dock menus, section headers); local copies of surfaces glass ships (compare with /Users/mkbabb/Programming/glass-ui/src/components); god modules; one-off instances where the app has an idiom; directory structure that no longer matches responsibility; dead components (no importer: grep the import graph). For each duplicate name the single idiomatic owner and the retirement cure. Cross-app duplicates whose owner should be glass are GLASS rows.' },
  { key: 'L2', p: 'LENS 2, MOBILE VIEWS. Enumerate every route/view from the router and the prior register\'s page list, then read each on the served page at 360x780, 390x844, 430x932 portrait and 844x390 landscape, light and dark. Measure with page.evaluate: inline centre of each main region vs viewport centre (<=1px), horizontal overflow (scrollWidth>clientWidth), touch targets >=44px, sheet/drawer detents reach their content, dock collapsed+expanded forms, safe-area insets, type scale. Frame every finding.' },
  { key: 'L3', p: 'LENS 3, DESIGN HIERARCHY AND USE OF SPACE. For every view (desktop 1440 and mobile 390, both themes): one clear primary per region; the type scale in use; no row spent on a lone control that belongs inline (section actions/resets/toggles); no dead whitespace bands; consistent gutters/rhythm; dividers where groups change; label+control on one line where it fits. Frame every finding.' },
]
const ROW = { type: 'object', required: ['id', 'lens', 'view', 'severity', 'finding', 'evidence', 'cure', 'owner'], properties: { id: { type: 'string' }, lens: { type: 'string' }, view: { type: 'string' }, severity: { type: 'string' }, finding: { type: 'string' }, evidence: { type: 'string' }, cause: { type: 'string' }, cure: { type: 'string' }, owner: { type: 'string' }, coveredBy: { type: 'string' } } }
const SEAT = { type: 'object', required: ['rows', 'viewsCovered', 'viewsSkipped'], properties: { rows: { type: 'array', items: ROW }, viewsCovered: { type: 'array', items: { type: 'string' } }, viewsSkipped: { type: 'array', items: { type: 'string' } } } }

phase('Audit')
const cells = []
for (const a of APPS) for (const l of LENSES) cells.push({ a, l })
const results = await parallel(cells.map(({ a, l }) => () => agent(OWNER + '\n\n' + LAW + '\n\nAPP: ' + a.name + ' — source ' + a.src + ', served ' + a.url + '. Prior register to cite, not duplicate: ' + a.prior + '. Your seat dir: ' + EV + '/' + a.key + '-' + l.key + '/ (mkdir -p). ' + l.p + ' Row ids: A2-' + a.key.toUpperCase().slice(0, 2) + '-' + l.key + '-<n>. List viewsSkipped honestly (never silently drop a view).', { label: a.key + ':' + l.key, phase: 'Audit', model: 'opus', effort: 'high', schema: SEAT })))
const byApp = {}
cells.forEach((c, i) => { (byApp[c.a.key] = byApp[c.a.key] || []).push({ lens: c.l.key, r: results[i] }) })
const dead = cells.filter((c, i) => !results[i]).map(c => c.a.key + ':' + c.l.key)
if (dead.length) log('audit seats missing: ' + dead.join(', '))

phase('Register')
const regs = await parallel(APPS.map(a => () => agent(OWNER + '\n\n' + LAW.replace('No commits (the register seats commit).', 'You MAY commit ONLY your register file with a pathspec commit (trailer: Claude-Session: https://claude.ai/code/session_01QkbQV4VgkoQgSoUj2oKZim); before committing read `git diff --cached` so no other seat\'s hunk rides along; retry on .git/index.lock.') + '\n\nYou are the REGISTER seat for ' + a.name + '. Write ' + X + '/audit/AUDIT-2-' + a.key + '.md: a header (date 2026-09-24, authority COHESION §0cq/§0cu, the owner verbatim), a totals table per lens and severity, then every row (dedupe across lenses; keep ids), each routed: consumer rows to ' + a.wave + ', GLASS rows to the glass letter. Include a "views skipped" section verbatim from the seats. Confirm every BROKEN and HIGH row by re-reading its evidence yourself (re-open the file:line or re-measure on the served page); drop or downgrade any that do not reproduce and say so. Commit it. SEAT OUTPUTS:\n' + JSON.stringify(byApp[a.key] || []), { label: 'register:' + a.key, phase: 'Register', model: 'opus', effort: 'high', schema: { type: 'object', required: ['file', 'rows', 'glassRows', 'commit'], properties: { file: { type: 'string' }, rows: { type: 'number' }, glassRows: { type: 'array', items: ROW }, commit: { type: 'string' } } } })))

phase('Glass')
const glassRows = regs.filter(Boolean).flatMap(r => r.glassRows || [])
const letter = await agent(OWNER + '\n\nYou are the GLASS LETTER seat. Write ' + X + '/relay/X-ALL-BK-AUDIT-2.md: value.js → glass-ui (BL) · O-69 · 2026-09-24 · AUDIT-2 glass rows. House style: read ' + X + '/relay/X-ALL-BK-UI-AUDIT.md first. Dedupe against O-53..O-68 (cite, do not repeat). Group by glass component. Then copy it byte-identical to /Users/mkbabb/Programming/glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-24-audit-2.md (cmp to verify), append an INBOX row O-69 to ' + VJ + '/docs/tranches/V/coordination/INBOX.md, and commit the letter + INBOX with a pathspec commit (trailer as above; read git diff --cached first). GLASS ROWS:\n' + JSON.stringify(glassRows), { label: 'glass-letter', phase: 'Glass', model: 'opus', effort: 'medium', schema: { type: 'object', required: ['file', 'rows', 'commit'], properties: { file: { type: 'string' }, rows: { type: 'number' }, commit: { type: 'string' } } } })

phase('Critic')
const critic = await agent(OWNER + '\n\n' + LAW + '\n\nYou are the COMPLETENESS CRITIC. Read the three registers ' + X + '/audit/AUDIT-2-{value,keyframes,fourier}.md, the glass letter, and ' + X + '/audit/AUDIT-2.md. What is missing: a view never read, a viewport or theme skipped, a lens not applied to an app, a BROKEN/HIGH row with no evidence, a duplicate component pair missed (spot-check by grepping component names that appear in two dirs), a glass row mis-routed as consumer or vice versa. Return gaps with where to look.', { label: 'critic', phase: 'Critic', model: 'opus', effort: 'high', schema: { type: 'object', required: ['gaps'], properties: { gaps: { type: 'array', items: { type: 'object', required: ['gap', 'where', 'material'], properties: { gap: { type: 'string' }, where: { type: 'string' }, material: { type: 'boolean' } } } } } } })
return { registers: regs, letter, critic, deadSeats: dead }
