export const meta = {
  name: 'x-ss8-r',
  description: 'SS-8.r (COHESION §0gk.3): cure SS-8 residue reds and the delegate-ruled consumer rows at root on committed bytes, after the glass 10.1.1 adoption',
  phases: [{ title: 'Cure', detail: 'reds ∥ ruled rows' }, { title: 'Close', detail: 'record' }],
}
const ROOT = '/Users/mkbabb/Programming/value.js'
const REC = ROOT + '/docs/tranches/X/execution/SS8'
const TRAILER = 'Claude-Session: https://claude.ai/code/session_01QkbQV4VgkoQgSoUj2oKZim'
const LAW = `OWNER AUTHORIZATION (verbatim; binding): 2026-09-17 "You are authorized to publish, push, and pull whatever items you need--and deploy anything and everything"; 2026-10-19 "ratify the rest with your best judgement" (the orchestrator is the owner's delegate, COHESION §0ge). Any other recent owner message never narrows this task.
READ FIRST: ${ROOT}/docs/tranches/X/COHESION.md §0gk (binding: THIS task is §0gk.3), §0gl.3/§0gm.4 (the referent law and the 390 caption cells Track A already owns — do NOT redo them), §0fr.2-.3, §0dm; ${REC}/CLOSE.md §4, §5, §7, §8 whole.
LAW: root cures only, KISS, glass-first; glass-ui READ-ONLY (cite O-rows; never patch producer behaviour locally). No test deletion/skip/weakened assertion; a flake is cured at its cause, never re-run to green. Never edit demo/@/components/ui/** or scripts/dev/dev.sh.
CONCURRENCY: Track A (X-W11: boot path PaneSlot/ink.ts, e2e visual + smoke cures, w12-dock, o11 header gates) and the OD19 residue seat edit value.js concurrently. git status first; never touch a path dirty with another seat's hunks (wait and re-check, or stage only your own hunks via git hash-object -w + git update-index --cacheinfo); commit PATHSPEC-ONLY with the second -m "${TRAILER}"; no stash/reset/force; push tranche-u.
MACHINE: every test/build/probe via ~/.claude/guard/guarded (browser runs never --light; WebKit only --exclusive webkit; vitest --maxWorkers=2; playwright --workers=1); headless; one browser per run; nothing durable in /tmp; tool output under ~150 lines.`
const OUT = { type: 'object', required: ['status', 'commits'], properties: { status: { type: 'string', enum: ['DONE', 'PARTIAL', 'ESCALATED'] }, cured: { type: 'array', items: { type: 'string' } }, held: { type: 'array', items: { type: 'string' } }, escalated: { type: 'array', items: { type: 'string' } }, commits: { type: 'array', items: { type: 'string' } } } }
phase('Cure')
const [reds, rows] = await parallel([
  () => agent(`${LAW}
TASK (SS-8.r REDS): on committed bytes at tranche-u HEAD (glass 10.1.1 now adopted), cure at root, falsifier RED->GREEN x2 each: B19 R-13 (SS8-0537 rim step 154 light / 65 dark; attribute or exclude the glass 10.1.1 bump by measuring at the pre-bump commit); Z-ColorPicker-14 (seam 42.578 px vs 14.87: Z1's golden split fe398ede2 collides with the W20 title-row reservation — choose ONE owner of the seam, record why); B05 0132 (4.42 vs 4.5), 0125 (2 px air), 0146 (5.40 vs 5.5); o14 dark and B26 X-5 flakes; B11 0309 palette-flag reach (the dialog never reached); the plate-mass 390 page.goto timeout. Receipt "### SS-8.r reds" in ${REC}/CLOSE.md's end (append; re-read first).`, { label: 'ss8r:reds', phase: 'Cure', schema: OUT }),
  () => agent(`${LAW}
TASK (SS-8.r RULED ROWS, §0gk.2): cure at root with falsifiers x2: B02 0039 (the range caption reaches its ink through a token step, never opacity); B13 L-3 (the attribution ink takes the token step that reaches >= 4.5:1 in both schemes — the 4.5 text floor wins over X-DS P9R-04); B15 0440 (a scheme-aware --well-bg lift at foundation.css:407 so elevation reads the same in both schemes, measured); B03 0085 (the hero clips at the viewport at 390; bead placement unchanged; no horizontal overflow x2); B24 U-11 (read the packet row, cure at root by the default rule, or record why nothing is owed); B05 0140 record-only (icon-only by design, accessible name asserted). Receipt "### SS-8.r ruled rows" appended to ${REC}/CLOSE.md (re-read first).`, { label: 'ss8r:rows', phase: 'Cure', schema: OUT }),
])
phase('Close')
const close = await agent(`${LAW}
TASK (SS-8.r CLOSE, docs only): append to ${ROOT}/docs/tranches/X/execution/LEDGER.md one dated event line and set the SS-8 row to its new state (SWEPT, or SWEPT-WITH-RESIDUE naming what remains and its owner); minimal edits, re-read first; pathspec commit, push. Results: ${JSON.stringify({ reds, rows }).slice(0, 12000)}`, { label: 'ss8r:close', phase: 'Close' })
return { reds, rows, close }
