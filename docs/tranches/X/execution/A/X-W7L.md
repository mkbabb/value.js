SERVED MODEL: claude-opus-5-5

# X-W7L — execution record (Track A · X·V) — repin glass-ui ^7.0.0 → 10.1.0 exact

Spec: `docs/tranches/X/waves/W7L.md` (42 lines, read whole incl. ADDENDUM 2026-09-24 I-56). Authority: COHESION §0de (owner, verbatim: *"All should be on 10.1."* — supersedes §0ci R-5), §0df (veil fix ships in 10.x = 10.2.0; `.i` still cures against the current composite), §0dm (X-W7L runs after X-W12, before X-W12U). Seat law: runbook §5 (every seat Opus 5.5 per the 2026-09-23 Opus-only feedback; §5.1 cap). Locks (§3.4): none of the §3.4 cross-wave events bind this wave; the spec's own locks are listed per unit below.

## Open

Seat 0, 2026-09-25, `claude-opus-5-5`, HEAD `e44bd32c` (branch `tranche-u`).

**Crash-recovery.** ⟨`git status --porcelain -- package.json package-lock.json demo src e2e test`⟩ → empty. No inherited partial work in this wave's writable set. Dirty paths outside it (`CARRY-LEDGER.md`, two W4 PNGs, `scripts/dev/dev.sh`, untracked evidence dirs) belong to others and are untouched.

**Preconditions ("Opens after: X-W12 CLOSED").**
- LEDGER Track A row X-W12 (line 37) → `**CLOSED 2026-09-17 (honest-RED: drag-p95→X-W12U .p O-80, E-R1-2→X-W12U .b, …)**`, promoted at Check 4 (`e44bd32c`, CONFORMANT-HONEST-RED). MET.
- glass-ui 10.1.0 published: ⟨`npm view @mkbabb/glass-ui dist-tags`⟩ → `{ latest: '10.1.0' }` (I-54). MET.
- Banked patch present: `docs/tranches/X/evidence/X-W7R/m-repin-10.0.1-migration.patch` (51 files, +723/−197). MET. It no longer applies cleanly (see B2); the spec expects this ("the patch is a guide, not bytes to force").
- I-55 (glass): *"10.1.0 does not change the veil"* — `git diff --stat v10.0.1 v10.1.0 -- src` shows 5 files, all Configurator. This answers `.i` step 2's question at the source; `.i` still measures the composite.
- LEDGER: there is no X-W7L row yet (minted by §0de after the Track A table was written). This seat adds one directly under X-W7R, as the only way to carry the status cell.

**E13 mail sweep (four paths).** ⟨`find <path> -maxdepth 1 -type f -newer docs/tranches/V/coordination/INBOX.md`⟩ over value V/ · V/coordination · glass BK/coordination · glass BL (the newest glass tranche dir by mtime and by name; it has no coordination/) · keyframes V/coordination · atlas P/coordination → 0 files on every path, except `glass-ui/docs/tranches/BL/FORMATION-PROGRESS.md`, which is glass's internal resume cursor and not a letter. The newest rowed letters are I-54..I-61 (glass-ui-2d, 2026-09-24), all rowed. 0 unrowed addressed to value.js, 0 UNREAD in scope. A dated sweep line is appended to INBOX.md.

## Baseline (read-only, 2026-09-25, HEAD `e44bd32c`, glass 7.0.0 installed; load avg 95–155 from four live tracks)

| gate | owner | command | BEFORE | expected after |
|---|---|---|---|---|
| L1 pin exact 10.1.0 | `.m` | `grep -n '"@mkbabb/glass-ui"' package.json` + installed version | **RED**: `89: "@mkbabb/glass-ui": "^7.0.0"`; installed `7.0.0` | `"10.1.0"` exact in package.json, lock and node_modules; committed and pushed |
| L2 banked patch applies at the root | `.m` | `git apply --check docs/tranches/X/evidence/X-W7R/m-repin-10.0.1-migration.patch` | **RED (drift)**: 6 of 51 files do not apply: `overture.css:11`, `CurrentPaletteEditor.vue:287`, `SwatchHoverMenu.vue:57`, `ColorPicker.vue:413`, `ConfigSliderPane.vue:161`, `MixSourceSelector.vue:4` | every hunk's intent landed on today's tree, and the drift resolved by hand at each root |
| L3 `npm run check` 0 | `.m` | `npm run check` | **NO SUCH SCRIPT**: `npm error Missing script: "check"`. The repo's equivalents are `npm run typecheck` (lib + demo + test vue-tsc + e2e tsc) and `npm run lint`. | `.m` runs `typecheck` and `lint` as the spec's "check" and records them. This is a spelling finding, not a gate change. |
| L4 `npm test` | `.m` | `npx vitest run` ×2 | r1 `Test Files 4 failed \| 67 passed (71)` · `Tests 2 failed \| 937 passed \| 8 skipped (947)`; r2 `Test Files 2 failed \| 69 passed (71)` · `Tests 2 failed \| 945 passed (947)`. The 2 steady failures are the banked honest-RED **C-5** (`test/spectrum-luma.test.ts`) and **NG-6** (`demo/test/shell/reka-binding-idiom.test.ts`). r1's extra 2 file failures (`palette-card-layout`, `plate-mass`) pass 10/10 in isolation and in r2, so they are load flakes (load 155). | 945/947 with only C-5 and NG-6, ×2 |
| L5 vue-tsc demo | `.m` | `npx vue-tsc -p tsconfig.demo.json --noEmit` ×2 | EXIT 0 ×2 (regression floor, GREEN by design) | EXIT 0 ×2 at 10.1.0 |
| L6 smoke `--workers=1` | `.m` | `npx playwright test <smoke projects> --workers=1` | cited, not re-run at open (§5.2): X-W7R `.m` at 10.0.1 = 71 failed / 207 passed of 281, 45 of them failing on 7.0.0 too (`m-smoke-classification.md`) | GREEN, or each failure classified with its cause |
| L7 D1 headed real GPU ×2 | `.m` | X-W5 D1 headed read ×2 | cited: X-W7R `.m` GREEN ×2 at 10.0.1 (`m-D1-headed-run{1,2}.json`) | headed ×2 recorded at 10.1.0 |
| L8 ink instrument on every plate ×2 | `.i` | served `:9000` headed at 10.1.0 | not measurable at 7.0.0 (the throw is glass-10-only). ESC-W7Rm-1: `contrast_unreachable` at `ConsoleRail.vue:48` → `demo/color-session/ink.ts:116` → `src/color/operations.ts:260` | runs to completion on every plate ×2 |
| L9 certified-ink contract tests | `.i` | `npx vitest run test/ink.test.ts` | `Tests 20 passed (20)` (floor; the new real-composite cases do not exist yet) | GREEN, with the glass-10 composite cases added |
| L10 glass-row re-read table | `.v` | served `:9000` headed | not measured at 10.1.0 (rows open) | each row CURED-BY-REPIN or still-live, with its measurement |
| L11 `#actions` / `detached` adoption | `.a` | `grep -rn "ConfiguratorLayer\|layout=\"detached\"" demo` + falsifier | **RED**: 0 `ConfiguratorLayer` in `demo/`; the only Configurator consumer is `demo/scenes/ConfigSliderPane.vue` (`ConfiguratorRow`) | adopted where value.js has the shape; falsifier GREEN ×2 |

Green-before-cure: none among the cure gates (L1, L2, L11 RED; L8 unmeasurable before the repin). L4, L5 and L9 are regression floors, GREEN by design. L3 is a spelling finding: `npm run check` does not exist.

## Unit plan

Order, per the spec ("Units (serial)"), §0de and the orchestrator note: strictly serial, one unit at a time, `.m` → `.i` → `.v` → `.a`. Every seat is Opus 5.5. An ESCALATED unit does not halt the wave. Common laws for every unit: glass-ui is READ-ONLY (producer rows ride mail as O-n addenda, never frontend hacks); never touch `scripts/dev/dev.sh`; pathspec commits only; served `:9000` headed on the real GPU; evidence goes under `docs/tranches/X/evidence/X-W7L/`.

| # | unit | spec § | writable (§1 Bounds) | gates | locks |
|---|---|---|---|---|---|
| 1 | `X.W7L.m` | W7L.md §Units `.m` (:10-15) + ADDENDUM I-56 (:33-42) | `package.json` · `package-lock.json` · `demo/**` · `src/**` (only migration-named library consumer sites, in one commit with `npm test` GREEN) · `e2e/**` · evidence · record · LEDGER (own hunk) · INBOX | L1 · L2 · L3 (as typecheck + lint) · L4 · L5 · L6 · L7 | Pin, lock and install move together with the migration that makes them build (no commit leaves the tree unbuildable). No shims or compat layers. |
| 2 | `X.W7L.i` | §Units `.i` (:17-21) | `demo/color-session/**` and the demo ink call sites · `test/**` for the ink instrument · `src/color/**` only where the instrument's search or model is at the root (one commit, `npm test` GREEN) · evidence · record · INBOX · `docs/tranches/X/relay/` (the O-62 addendum) | L8 · L9 · frames at 1440 light and dark, before (7.0.0) and after | Never hold on 7.0.0. Honest-RED only per measured surface, with an O-62 addendum beside O-62. |
| 3 | `X.W7L.v` | §Units `.v` (:23-24) | evidence · record · INBOX (read-only on product) | L10 | Mark rows only on measurement. No product edits. |
| 4 | `X.W7L.a` | §Units `.a` (:26-27) | `demo/**` · `e2e/**` (falsifier) · evidence · record | L11 + the falsifier ×2 · vue-tsc demo 0 · vitest floor | The falsifier has the same shape as fourier's `f-w14v-detached.spec.ts`. |

Groups: `[[X.W7L.m], [X.W7L.i], [X.W7L.v], [X.W7L.a]]`.

## Unit receipts

