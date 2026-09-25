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


### X.W7L.m

Seat 1 (RESUME after §0dq), 2026-09-25, `claude-opus-5-5`, HEAD `059ec6af` (branch `tranche-u`).

**Crash-recovery.** ⟨`git status --porcelain -- package.json package-lock.json demo src e2e`⟩ → empty. The killed predecessor seat (same session) had already COMMITTED its work before the weekly-limit stop: `c8a4959d` (the repin + migration, 58 files) and `cd3cc3d1` (e2e typing), both on `origin/tranche-u` (⟨`git rev-parse HEAD origin/tranche-u`⟩ → both `059ec6af`). Inherited, uncommitted, inside this unit's writable set: 10 untracked files under `docs/tranches/X/evidence/X-W7L/` (`m-D1-headed-run{1,2}.json`, `m-dead-{classes,tokens}-7v10.txt`, `m-inert-pins-7v10.txt`, `m-trap-probe{.mjs,-r1.json,-r2.json}`, `m-trap1-unlayered-carveout.txt`, `m-trap2-unknown-props.txt`). Each was read and judged against the spec; all are the I-56 trap and D1 readings the unit owes and are committed with this receipt. No receipt existed. §0dq's "`.m` dead before it started" is corrected here: the unit's product commits had landed; only the receipt, the gate re-reads and the evidence commit were owed.

**Acts, in order.**
1. **L1 pin.** ⟨`grep -n '"@mkbabb/glass-ui"' package.json`⟩ → `89: "@mkbabb/glass-ui": "10.1.0",` · ⟨`grep -n -A2 '"node_modules/@mkbabb/glass-ui"' package-lock.json`⟩ → `"version": "10.1.0"`, `resolved …/glass-ui-10.1.0.tgz` · ⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → `10.1.0`. Committed `c8a4959d`, pushed (origin = HEAD).
2. **L2 banked patch intent.** `c8a4959d` applied 45/51 files of `d49d2238` and resolved the 6 drifted roots (overture plate-land → `--spring-panel`; pane-shell nudge → `--spring-present-duration`; ConfigSliderPane `:collapse="false"` (9.0.0 fold); WatercolorDot owned at `demo/shared/ui/watercolor-dot/` (8.0.0 deletion); SwatchHoverMenu/MixSourceSelector/CurrentPaletteEditor/ColorPicker per the commit body). ⟨`git apply --check --reverse <patch>`⟩ → 30/51 files byte-reverse; the 21 that do not differ only by the 10.1.0 re-spelling (pins `10.0.1`→`10.1.0`, comments "glass 10.0.1, X-W7R" → "glass 10.1.0, X-W7L") and the 6 drift resolutions. Intent verified at the bytes: ⟨`grep -rn 'show-close' demo --include='*.vue' | wc -l`⟩ → 0; ⟨`grep -rn 'dismiss="deliberate"' demo --include='*.vue'`⟩ → 7 `DialogContent` sites (BrowsePane, PalettesPane, 5 admin panels).
3. **Beyond the patch** (the MIGRATION read, bottom-up 8.0.0 → 8.1.0 → 9.0.0 → 10.0.0; 10.1.0 has no section, additive Configurator only, I-55): PRM overlay carve-out into `@layer base`; SelectTrigger's retired `size`/`variant` arms (8.0.0, no MIGRATION row) → a height class and a bare colour-space title; `rounded-input` → `rounded-media`; inert `--dropdown-menu-font` pin deleted, `demo/DESIGN.md` corrected. All in `c8a4959d`. `cd3cc3d1` typed the three X-W12 smoke specs so the e2e leg of `npm run typecheck` goes 16 → 0 (type-only; no assertion changed).
4. **I-56 traps 1-6** — `docs/tranches/X/evidence/X-W7L/m-I56-traps.md` (one row per trap: command, reading, verdict). Trap 1 CURED (carve-out `0s` unlayered → `0.15s` in `@layer base`, ×2); traps 2-6 CLEAN (0 stale reka bindings / 0 stale component props under `checkUnknownProps`; 0 `:global(.dark)`; 0 `light-dark()` inset; one runtime value.js copy; MIGRATION read bottom-up from 7.0.0).
5. **Seat 1 (RESUME) re-read of the owed gates** (HEAD `7df90b1a` at the runs; the only commit landed since is `f873929a`, docs-only, so the tree under test is unchanged; load avg 85 at start). Readings in `docs/tranches/X/evidence/X-W7L/m-gates-seat1.txt`.
   - **L3** (`npm run check` does not exist, so `typecheck` + `lint`): ⟨`npm run typecheck`⟩ → `EXIT 0` ×2 (lib + demo + test vue-tsc + e2e tsc) · ⟨`npm run lint`⟩ (`eslint . --max-warnings=0`) → `EXIT 0` ×2. RED(16 e2e errors, pre-`cd3cc3d1`) → GREEN.
   - **L4**: ⟨`npx vitest run`⟩ ×2 → `Test Files 2 failed | 70 passed (72)` · `Tests 2 failed | 958 passed (960)`, both runs. The 2 failures are the standing honest-RED **C-5** (`test/spectrum-luma.test.ts`) and **NG-6** (`demo/test/shell/reka-binding-idiom.test.ts`) and nothing else. The total is 960, not the gate's 947, because sibling tracks added 13 tests after the baseline. The gate's shape is met: all pass except C-5 and NG-6, ×2.
   - **L5**: vue-tsc demo is the second leg of `npm run typecheck`, so it is `EXIT 0` ×2 (above). Floor held at 10.1.0.
   - **L7** D1 headed real GPU ×2 at `059ec6af` (glass 10.1.0; built bundle served by `e2e/smoke/perf/serve-built.mjs` on :8473; ⟨`PROBE_HEADED=1 node docs/tranches/V/megatranche/workflows/gates/scene-swap-budget.mjs`⟩): renderer `ANGLE Metal Renderer: Apple M5 Max`. run 1 `"pass": true`, 4/4 hops (over32Ratio .034/.010/.014/.012 ≤ .15). run 2 `"pass": true`, 4/4 hops (.022/.019/0/.009). File: `m-D1-headed-059ec6af.txt`. Earlier reads `m-D1-headed-run{1,2}.json` were taken before the commit and are kept.
6. **L6 smoke `--workers=1`, each failure classified** (`docs/tranches/X/evidence/X-W7L/m-smoke-classification.md`). ⟨`VJS_E2E_PORT=5371 npx playwright test --project=smoke --project=smoke-admin --project=smoke-mobile --project=smoke-reactivity --workers=1`⟩ at 10.1.0 → `79 failed · 2 skipped · 1 did not run · 226 passed` (308; 45.5 min). The same 79 were re-run on the pre-migration tree `c8a4959d^` (`git archive` into scratch, `npm ci` gives glass 7.0.0, `--last-failed`) → `45 failed · 34 passed`. So **45 are PRE-EXISTING**: 38 of them are in X-W7R's 7.0.0 list, and 0 of the 34 are. **34 are REPIN REGRESSIONS**, classified by measured cause:
   - C-INK 15 → `.i`: `contrast_unreachable` at `ink.ts:66` ← `certifyAccentInk` ← `useContrastSafeColor.ts:253`. It crashes the Atmosphere and Extract scenes and the boot on a URL colour, and elsewhere it misses the ink floor (4.49 < 4.5).
   - C-TRIGGER-PAINT 8 → `.v`/X-W12U: the SelectTrigger rest now paints `backdrop-filter: blur(14px) saturate(1.5)`, and the paint-free arm is gone since 8.0.0.
   - C-CARD-STAMP 3 → X-W12U: 8.0.0 retired the `data-tier` stamp (it is now the `glass-<tier>` class) and removed `grain` (a card now arms it with `paper-grain-overlay`). All 17 demo `<Card>` sites lost their default grain.
   - C-DOCK-IDLE 3 → X-W12U: 9.0.0 dropped `collapseDelay`, so the dock idles shut at 3600 ms and these specs do not call `expandDock`.
   - C-DOCK-PAINT 2 → `.v`.
   - C-DIALOG 2 → X-W12U.
   - C-LETTER 1 → `.v`: the oracle expects an E-3-immutable dated letter to name the pinned version.
   L6 is met on its "each failure classified with its cause" arm. It is not GREEN.

**Residuals (named, routed; no shim landed).**
- **RES-m-1 (the 8.0.0 tint knob).** `--glass-tint-source` / `--glass-tint-strength` have had 0 glass readers since 8.0.0 (MIGRATION.md:964: "the old TINT mix has no hand-composed equivalent"; `m-inert-pins-7v10.txt`). `demo/styles/foundation.css:282-283`, `:810` and `:846` still declare them, and the comments at `foundation.css:249` and `useAtmosphereBoot.ts:16` still claim the frost carries the pick. The BR-6/BR-7 oracles (`e2e/smoke/a11y-modality-support.spec.ts:159-242`) assert the dead token and pass tautologically. The cure is a design ruling on the lost plate temperature (delete the pins and re-aim the oracle legs onto a painted measure, or relay a tint seam ask to glass). Routed to X-W12U, with the ask to glass if the owner wants the temperature back.
- **RES-m-2**: C-CARD-STAMP (above) is also a product-side register loss (grain), routed with its oracle to X-W12U.
- The 45 pre-existing smoke failures stay with their standing homes (X-W7R list).

**Gates BEFORE → AFTER.** L1 RED (`^7.0.0`) → GREEN (`10.1.0` exact in package.json, lock and node_modules; pushed) · L2 RED (6/51 files drift) → GREEN (intent landed; 6 roots resolved) · L3 no-such-script → typecheck 0 ×2 · lint 0 ×2 · L4 945/947 (C-5, NG-6) → 958/960 ×2 (C-5, NG-6 only) · L5 0 ×2 → 0 ×2 · L6 cited (X-W7R 10.0.1: 71 failed) → 79 failed = 45 pre-existing + 34 regressions, each classified with its cause and routed · L7 cited → headed ×2 `"pass": true` on the real GPU.

**Commits.** `c8a4959d` (repin + migration, predecessor seat) · `cd3cc3d1` (e2e typing, predecessor seat) · this receipt + evidence (below). No `src/**` edit: the migration named no library consumer site. **Adjacent edits:** none.

### X.W7L.i

Seat 0, 2026-09-25, `claude-opus-5-5`, HEAD `aff70fa8` at open (branch `tranche-u`, glass 10.1.0 installed).

**Crash-recovery.** ⟨`git status --porcelain | grep -E 'demo/|test/|src/color|relay/|evidence/X-W7L|A/X-W7L|INBOX'`⟩ → empty. There was no inherited partial work in this unit's writable set.

**Acts, in order.**
1. **Reproduced ESC-W7Rm-1 at 10.1.0** (served `:9000` by `vite --port 9000`, headed Chromium, 1440). ⟨`node docs/tranches/X/evidence/X-W7L/i-ink-probe.mjs light … "#/?space=oklch&color=oklch(0.55 0.18 260)"`⟩ → `Error: Ink certification failed: contrast_unreachable at certify (demo/color-session/ink.ts:66:24) at certifyAccentInk`, then `Cannot read properties of undefined (reading 'currentView')`, and the boot dies (`i-repro-10.1.0-precure-urlblue.json`). The spec's anchors (`ink.ts:116`, `operations.ts:260`) had drifted. At the true bytes the throw is `ink.ts:66` (`certify`) ← `certifyAccentInk` ← `useContrastSafeColor` (`safeAccentCss`), and `src/color/operations.ts:260` is `return err({ code: "contrast_unreachable" })` in `safeAccentColor`, reached when neither L=0 nor L=1 clears `minimumRatio`.
   - **Plates, composites and the sought ink.** The sought ink is the resting-plate accent (`--accent-live`) and the muted rung (`--ink-muted`), each at `floor + CERTIFY_HEADROOM` = 4.5 + 1.25 = **5.75:1**. The plates are glass 10.1.0's veil ladder: `--glass-veil-ink` `oklch(0.28 0.035 70)` light / `oklch(0.17 0.03 70)` dark; base 0.14 / 0.18; step 0.04 (`tokens/glass.css`, `tokens/dark-arm.css`). Read live, `--glass-plate-resting` = `color(srgb 0.20397 0.148263 0.0829736 / 0.14)`. An opaque surface admits at most max((Y+.05)/.05, 1.05/(Y+.05)), which is ≥ 4.58 everywhere but < 5.75 for composite Y 0.133–0.238. The dark veil puts mid-ambient plates there, so the 5.75 target is unreachable while the 4.5 floor is not.
2. **The veil, measured against the 7.0.0 reading** (I-55 consumed: 10.1.0 does not change the veil). The 7.0.0 tree `c8a4959d^` (`git archive` + `npm ci` → glass `7.0.0`) was served on `:9007`, 1440, and measured by the same probe (`i-before-7.0.0-*.json` vs `i-after-10.1.0-*.json`, 9×9 luminance grid per surface):

   | surface (light) | 7.0.0 background | 10.1.0 background | composite Y median, 7.0.0 → 10.1.0 |
   |---|---|---|---|
   | `.dock-plate`, home | `color(srgb 0.931227 0.845921 0.816039 / 0.5392)` | `color(srgb 0.204 0.148 0.083 / 0.102)` | 0.5843 → 0.3821 |
   | `.dock-plate`, URL colour | α 0.5392 frost | α 0.102 veil | 0.4372 → 0.1919 |
   | `.glass-resting` cards, home | α 0.663 | α 0.141 | 0.4257 / 0.6636 → 0.1692 / 0.2965 |
   | `[data-surface="veil"]` console, home | α 0.443 | α 0.059 | 0.7848 → 0.1672 |

   The seat brief's reference `color(srgb 0.916 0.870 0.829 / 0.328)` (O-62, read at `:5173`, 2026-09-23) is the same cream family. Today's 7.0.0 dock reads α 0.539 at 1440 with the dock expanded. Dark 7.0.0 → 10.1.0: dock Y 0.0753 → 0.0602, and every dark plate stays dark.
3. **The real composite, measured.**
   - *Oracle.* ⟨`node …/i-composite-oracle.mjs {light,dark}`⟩ paints each rung token over solid grey grounds (6 greys × 3 rungs × 2 schemes = 36 pixels), and the pixel is Chromium's source-over, e.g. light resting over rgb(186) → rgb(167 165 163).
   - *Ground.* ⟨`node …/i-ground-probe.mjs light <url>`⟩ hides the plates and samples the painted ground under each box. At the URL colour the ground Y is 0.224 under the dock and 0.216–0.229 under the cards, against the instrument's referent `--ink-ambient-l` 0.61 → Y 0.227: the field-mean ground holds there. At home the ground under the plates is 0.30–0.45 against the referent's 0.49, the spatial spread of the aurora field (see residuals).
4. **Cure at the root (`c8cbbe10`).** `src/color/**` was not touched: `safeAccentColor`'s `contrast_unreachable` is correct for the ratio it is asked for, so the defect was the instrument's demand and model in `demo/color-session/`.
   - *Search* (`ink.ts` `certify`): `floor + headroom` is the preferred target. Where it is `contrast_unreachable`, the search bisects (10 steps, 1.2e-3) in `[floor, floor + headroom)` for the highest ratio the surface admits, and returns that ink, the best certified value, never below the floor. Any other issue code, or an unreachable floor, still throws. That is a loud defect, not a mask, and no try/catch was added anywhere.
   - *Model* (`ink.ts` `resolveSurfaceLightness`, `producerRungTint`, `composite`):
     - The 7.0.0 constants (card tint at α 0.65/0.80, `FLOATING_TINT_L`) are replaced by glass 10.1.0's published ladder: quiet −1, resting 0, floating +1, chrome = `--glass-veil-dock` −1.
     - Every translucent rung composites source-over in sRGB through `mixColors(…, { space: "rgb" })`.
     - The veil is still quiet-over-resting-over-ground; the well is unchanged (opaque, demo-owned).
     - `SurfaceTint` is now `{ color (opaque), alpha }`.
   - *Live probe* (`useContrastSafeColor.ts`): tints carry their sRGB colour, not an L. The chrome probe reads `.dock-plate`: at 10.x `.glass-dock` computes `rgba(0, 0, 0, 0)` (measured), so the live chrome read had been silently falling back to the static model.
   - Callers pass the floor, and the headroom is applied inside `certify`.
5. **Contract tests (L9).** New `test/ink-real-composite.test.ts` has 16 cases:
   - the static model equals the installed glass token bytes (ink, base, step; light and dark);
   - 8 browser-oracle composites within ΔL 0.004, and all 36 oracle rows measured within ΔL 0.00144 by a one-off check;
   - the ESC-W7Rm-1 sweep: every surface × ambient 0→1 step 0.025 × 5 picks × both schemes × text and graphics floors, plus the muted rung, all ≥ floor with no throw, and a guard case proving the 5.75 band is live;
   - the best-certified ceiling: within 0.05 of the surface's black/white maximum, where exercised;
   - fidelity.

   In `test/ink.test.ts`, the veil-bound oracle's producer literal moves from the 7.0.0 card tint to the 10.1.0 veil ink. The assertion is unchanged and GREEN. `test/**` is inside this unit's writable set.
6. **L8, served `:9000`, headed, 1440, ×2** (⟨`node …/i-L8-instrument-run.mjs {light,dark} i-L8-<scheme>-r{1,2}.json`⟩):
   - *Leg (a)*: the app's own instrument across 10 routes: home, the URL colour `oklch(0.55 0.18 260)`, atmosphere, extract, gradient, mix, generate, palettes, blob, and the owner brick URL. Each run → `inkErrors` 0 and `could not be loaded` 0 on every route.
   - *Leg (b)*: `resolveSurfaceLightnessLive` + `certifyAccentInk` + `resolveMutedInk` driven in-page on every plate (page, resting, floating, chrome, veil, well) × 21 ambients × 5 picks → **126/126 completed on each of the 6 plates**, 0 threw, in light r1, light r2, dark r1 and dark r2.
7. **Frames at 1440, light and dark, before (7.0.0) and after (10.1.0).** `i-before-7.0.0-{light,dark}-{home,urlblue}.png` and `i-after-10.1.0-{light,dark}-{home,urlblue}.png`. The after URL-colour frame boots; before the cure, that route died at boot.
8. **Relay (`2b860dcd`).** O-62 addendum (a), `docs/tranches/X/relay/X-ALL-BK-GLASS-VEIL-GREY-ADDENDUM-2026-09-25-W7L-I.md`, plus an INBOX row. No surface is AA-unreachable. The addendum carries the measured headroom band and register loss. The mirror into glass BK/coordination rides the live glass session, because glass-ui is READ-ONLY from here.

**Gates BEFORE → AFTER.**
- **L8:** was unmeasurable (the instrument threw `contrast_unreachable`, boot dead on the URL colour) → **GREEN ×2**: 6/6 plates, 126/126 each, light and dark, 0 ink errors across 10 routes.
- **L9:** was `Tests 20 passed (20)` (floor, no real-composite cases) → ⟨`npx vitest run test/ink-real-composite.test.ts test/ink.test.ts`⟩ ×2 → `Tests 5 failed | 31 passed (36)` both runs. The new real-composite file is 16/16 ×2. The 5 RED are the pre-existing register cases, carried as honest-RED **INK-VEIL-MIDBAND** (below), not as instrument failures.
- **Frames:** 4 before + 4 after → GREEN.
- **`npm test` floor:** ⟨`npx vitest run`⟩ ×2:
  - r1 → `Tests 7 failed | 969 passed (976)`: C-5, NG-6, and the 5 INK-VEIL-MIDBAND.
  - r2 → `Tests 7 failed | 961 passed | 8 skipped (976)`: the same 5 + NG-6 + C-5; plus 2 file-level load flakes, `palette-card-layout` and `plate-mass`, the same two the `.m` receipt classified as load flakes.
- **Typecheck and lint:** `vue-tsc` demo 0 · `vue-tsc` test 0 · `eslint --max-warnings=0` on the 4 touched files → 0.

**Honest-RED — INK-VEIL-MIDBAND** (5 cases in `test/ink.test.ts`: `stays QUIETER …` light and dark; T-35 `owner brick certifies CHROMATIC` light and dark; `the cusp walk lands the MOST chromatic`). These assert a register (the pick's chroma voice, and a de-emphasis step between the foreground and the plate) that holds only on a light plate.
- On glass 10.1.0's ladder the resting plate at the owner ambient 0.5103 falls from L ≈ 0.81 to 0.48 (light) and 0.45 (dark), where the only clearing ink is near-white: brick C 0.021 / 0.040 against a floor of ≥ 0.0455.
- At ambient 0.63 the plate sits in the dead band, and the muted rung must reach the extreme: L 0.046 in light, 0.9998 in dark.
- AA holds in every case. These are register losses the veil forces, not instrument defects, and no ink can satisfy both constraints on that surface.
- The assertions are kept (none deleted, none skipped). They are relayed in the O-62 addendum and re-read at the 10.2.0 repin (I-56 follow-up unit).

**Residuals (named, routed).**
- **RES-i-1 (the ground's spatial spread).** The instrument's ground is the field palette's mean L (M-15, `--ink-ambient-l`). At the URL colour it matches the painted ground under every plate (Y 0.227 vs 0.216–0.229). At home the painted ground under the plates is Y 0.30–0.45 against the referent's 0.49 (`i-ground-10.1.0-light-home.json`). On 7.0.0's thick frost that spread was damped by α 0.54–0.66; on the 10.1.0 veil (α 0.06–0.14) it reaches the composite nearly whole. The model is exact on a known ground (36/36 oracle pixels; dock at the URL colour modelled 0.1916 vs measured 0.1919), so what remains is the ground referent, not the composite. Routed to the 10.2.0 re-read unit (I-56), where the veil fix changes the damping. This unit did not change the M-15 referent contract.
- **Non-certified dock inks** ("Home" `color(srgb 0 0 0 / 0.8)`, "@mbabb" `oklab(0.216 … / 0.7)`) compute to about 4.05:1 and 2.8:1 on the URL-colour dock composite. They are not instrument call sites; they go in the O-62 addendum for the recut's own check, and to `.v` / X-W12U for the consumer halves.

**Commits.** `c8cbbe10` (the cure, contract tests, and the oracle literal; one commit with `npm test` at the floor above) · `2b860dcd` (O-62 addendum (a) + INBOX row) · this receipt + `docs/tranches/X/evidence/X-W7L/i-*` (probes, readings, frames).
- **Adjacent edits:** none.
- **Escalations:** none.
