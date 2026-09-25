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

### X.W7L.v

Seat 0, 2026-09-25, `claude-opus-5-5`, HEAD `3ca75e36` at open (branch `tranche-u`, glass 10.1.0 installed: ⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → `10.1.0`). Spec W7L.md read whole (§Units `.v` :23-24); COHESION §0cy, §0dd-§0df, §0dm (O-80) and §0dn-§0dt read to the file end; the X-W7R `.v` receipt (its B7 table and RES-v-1) consumed as the 7.0.0 / 10.0.1 baseline.

**Crash-recovery.** ⟨`git status --porcelain -- docs/tranches/X/evidence/X-W7L docs/tranches/X/execution/A/X-W7L.md docs/tranches/V/coordination/INBOX.md`⟩ → empty. There was no inherited partial work in this unit's writable set.

**E13 mail.** ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ over value V/ · V/coordination · glass BK/coordination · glass BL (newest) · keyframes V/coordination · atlas P/coordination → 0 files on every path. 0 UNREAD in scope. A sweep line is appended to INBOX.md.

**Instrument.** Served `:9000` by ⟨`npx vite --port 9000 --strictPort`⟩ (this seat's server; the port was free, ⟨`curl -m 5 localhost:9000`⟩ → `000` before). It is web-only, so the "dev misconfigured" API chip shows; no row reads the API. Headed Chromium (`channel: "chromium"`, `headless: false`) on the real GPU: renderer `ANGLE Metal Renderer: Apple M5 Max` in both runs. Load average was 88-124 during the runs (four live tracks; `v-probe-loads.txt`), so frame-time figures are marked as load-bound where they matter.
- `v-probe.ts` extends the X-W7R `v-probe.ts` (cartoon cascade, dock plate, blob idle, dock morph). One bounded session per run covers five contexts: 1440 light/dark · 390×844 coarse · 844×390 coarse · 360×780 coarse · 1440 /atmosphere. Run ×2 → `v-probe-r{1,2}.json`, `pageErrors: []` both runs. `v-summarize.mjs` prints one line per row per run → `v-summary.txt`.
- `v-o65-probe.ts` is a dedicated collapsed-dock read ×2 (`v-o65-r{1,2}.json/.png`). In the main probe the dock stayed expanded, because the idle timer arms only on a pointer leave.
- `v-o12-headed.config.ts` is the X.W5.c3 / X-W7R o12 instrument re-pointed at `:9000`, run ×2 → `v-o12-r{1,2}.txt`.
- The static reads of the 10.1.0 dist (API shapes, tokens, the I3 seed, the G3 strict probe ×2) → `v-static-reads.txt`.

#### L10 table A: the glass-owned value.js rows at 10.1.0, served `:9000`, headed, ×2

| id (relay) | instrument | X-W7R reading (7.0.0 / 10.0.1) | 10.1.0 reading, r1 / r2 | verdict |
|---|---|---|---|---|
| `DOCK-SCROLL-MORPH` (O-55 R-1/R-2) | 10.1.0 `DockProps` · GlassDock slots · rim types | no scroll input; rim standalone | 6 props (`fitContent · backdropMode · shape · orientation · collapse · backgroundCanvas`), none a scroll source; 5 slots (`persistent · default · collapsed · search · persistent-end`), no rim seat; ⟨`grep -ci dock scroll-progress-rim/types.d.ts`⟩ → 0 | **still-live** → BL |
| `DOCK-MORPH-ROOT` (O-56 G-1) | rAF sampler, `Toggle action bar` small↔large + the idle collapse | 1 distinct width, a one-frame snap | toggle 479.5→302 final at 57.9 / 39.0 ms; 302→479.5 at 54.9 / 43.6 ms; collapse 479→56 at 107.4 / 107.9 ms. Every transition has 2 distinct widths and 0 interpolated frames; blur frames 0, scaled-text frames 0 | **still-live** → BL (the box still snaps) |
| O-56 G-3 (blob idle) | parked-blob mean-abs frame diff, 1 s steps (D4 metric) | 7.0.0 1.17→0.83 · 10.0.1 2.69→1.21 | 2.507, 2.171, 1.630 / 2.434, 2.204, 1.516: sub-floor (6/255) and decaying toward park | **still-live** → BL (the consumer park is X-W12U `.b`) |
| `I3-SEED-SIZE` (O-53 R-1) | exports map + esbuild derive-only seed, gzip -9 | 52 610 / 52 781 B, shaders kept | `./aurora` only (no derive or shader-free subpath); 52 775 B ×2, `#version` ×2, `uniform` ×81; budget 12 288 B | **still-live** → BL |
| `G3-FALLTHROUGH-TYPES` (O-57 R-1) | strict probe (`strictTemplates:true`), vue-tsc ×2 | 284/64 · 279/64 | **277 errors / 65 files** ×2 (byte-identical): 269 TS2353 + 8 TS2322. 61 of the TS2353 target native element types (RES-v-2's class) and 208 target component types; `onClick` ×111, `title` ×13 | **still-live** → BL |
| `O12-3-HOVER-GPU` (X-W8 `.i`; blob mood) | o12 O-12·3, headed real GPU | 0.30/0.53 · 1.37/1.38 | **2.71 / 2.83** /255 against the 6/255 floor (·1+2, ·4 `p50=8.3ms REAL-GPU`, ·5 `ratio 0.999` PASS; `3 passed / 1 failed` ×2) | **still-live** (livelier than 10.0.1, still below the floor) |
| `GLASS-VEIL-GREY` (O-62) | computed `.dock-plate` background, light + dark | cream `/0.5392` · dark ink `/0.1` | light `color(srgb 0.20397 0.148263 0.0829736 / 0.1)`, `blur(16px) saturate(1.2)` ×2; dark `color(srgb 0.0927547 0.0503523 0.00879371 / 0.14)`, `blur(16px) saturate(1.3) brightness(1.14)` ×2 | **still-live** → the 10.2.0 veil minor (§0df; `.i`'s O-62 addendum (a)) |
| O-57 R-2 (`.cartoon-cast`) | served-cascade selector walk | 4 · 6 (cured at the 10.0.1 patch bytes, not credited) | `.cartoon-cast` 6 · `.cartoon-surface` 1, ×2: the 4 scoped rules plus the 2 bare ones reach the product cascade | **CURED-BY-REPIN** (X-W7R RES-v-1 discharged) |
| O-63 `DOCK-TRIGGER-CLIP` | dock row clip + the room a hovered or open trigger has inside it, plus frames | §0cj: value's 7.0.0 dock showed the cut | row `dock-layer--full` still computes `overflow: auto hidden`, `padding: 4px 4px`. The trigger (32 px, "Home" = `Select view`) sits in a 53 px row with **10.5 / 10.5 px** room at rest and in the open state ×2. Hover and open-state capsules are whole in `v-probe-r{1,2}-o63-{hover,select}.png` | **CURED-BY-REPIN** on value.js's dock (the producer's clip mechanism remains: any paint more than 10.5 px past a trigger would still cut) |
| O-65 `DOCK-COLLAPSED-FORM` | dedicated probe: enter and leave the dock, idle 6 s; which painted seats fall outside the plate? | not read on value.js | collapsed plate 56×56 with 1 painted seat, **0 outside** ×2 (`v-o65-r{1,2}`) | **CURED-BY-REPIN** on value.js's surface (not reproduced). There was no 7.0.0 value.js reading; the owner's frame is a multi-seat collapsed form (face, track, count) that value.js does not have, so the glass row stays open at BL for keyframes and fourier |
| O-66 `GLASS-SELECT-GREY` + dock motion | colour-space Select: trigger, checked and highlighted option | not read | checked = highlighted option `color(srgb 0.20397 0.148263 0.0829736 / 0.1)` (the veil ink); listbox `… / 0.22`; trigger `rgba(0,0,0,0)` + `blur(14px) saturate(1.5)` ×2; frame `v-probe-r1-o66-select.png`. The dock motion is the snap in the `DOCK-MORPH-ROOT` row | **still-live** → the 10.2.0 veil minor (§0df names O-66 §1) |
| O-67 `SIDE-DOCK-EDGE` | served dock census | not read | 1 dock, **0 vertical** ×2; ⟨`grep -rn 'orientation="vertical"' demo`⟩ on docks → 0 | **still-live** at glass. There is no value.js surface to cure or credit |
| O-68 ConfiguratorLayer `#actions` | 10.1.0 `ConfiguratorLayer.vue.d.ts` | absent at 7.0.0 | `actions?: (props) => any` slot plus `actionsWhen?: "open" \| "always"` (O-75 `detached` is present too, 4 hits) | **CURED-BY-REPIN** (the primitive ships; `.a` adopts it) |
| O-80 `DOCK-OVERFLOW-LAYOUT` (I-59: "CURED@10.0.0") | dist grep, plus a 120-step spectrum drag with a LoAF observer, forced layout attributed by script | 567–623 ms at 7.0.0 `dock.js:628` (X-W12) | ⟨`grep -rlE 'useDockOverflowFit\|DockOverflowFit' dist`⟩ → 0 files. Glass/dock forced layout **0 ms** ×2 across 93 / 34 LoAF entries; the top forced layout is consumer `SpectrumCanvas.vue` (81 / 15 ms). Frames p50 8.6 / 25.0, p95 58.3 / 58.4 ms, at load 88–124 on a 60 Hz window | **CURED-BY-REPIN** (glass half; I-59 confirmed). The consumer p95 budget stays with X-W12U `.p` on the 120 Hz D1 cell at a quiet load |

**Table A count** (⟨`awk` over the table's `|` rows, counting `CURED-BY-REPIN**` / `still-live**`⟩ ×2 → `14 rows; 5 with CURED-BY-REPIN; 9 with still-live` both runs): 14 rows. **5 CURED-BY-REPIN**: O-57 R-2, O-63, O-65, O-68, O-80. **9 still-live**: DOCK-SCROLL-MORPH, DOCK-MORPH-ROOT, O-56 G-3, I3, G3, O12-3, GLASS-VEIL-GREY, O-66, O-67.

#### L10 table B: every AUDIT-2-value row with a glass half (ADOPT-AT-X-W7L per §0cy), at 10.1.0

These are the 13 rows AUDIT-2-value.md §Totals routes to the glass letter (O-74): L1-2, L1-6, L1-7, L2-1, L2-3, L2-6, L2-7, L2-9, L2-12, L3-1, L3-2, L3-3, L3-6. ⟨`grep -c '^#### .*GLASS' docs/tranches/X/audit/AUDIT-2-value.md`⟩ → 13.

| row | glass half | 10.1.0 reading, r1 / r2 (identical where one figure is given) | verdict | X-W12U reads it as |
|---|---|---|---|---|
| A2-VA-L1-2 | publish the real-box condense (cured at HEAD); absorb the PaneHeader veil (open) | 6 served `[data-condensed]` rules, all from glass `card/scroll.css` (demo has 0); CardHeader has a `shrink` prop. There is no veil seat: CardHeader slots are `default` only | **CURED-BY-REPIN** (condense limb) · **still-live** (veil limb) | adopt now: retire `useHeaderCondense.ts`, the header.css condense and PaneHeader's scrub onto `<CardHeader shrink>`. The veil stays a relay |
| A2-VA-L1-6 | a ConfirmDialog composite | ⟨`grep -rl ConfirmDialog --include='*.d.ts' dist`⟩ → 0 | **still-live** | stays ADOPT (no local copy) |
| A2-VA-L1-7 | a dock attribution menu | ⟨`grep -rli attribution dist/components/dock`⟩ → 0 | **still-live** | stays ADOPT |
| A2-VA-L2-1 | clamp the `overlay` reveal role to `--reka-popper-available-height` | 844×390 /browse Filters: dialog y **−252.5**, h 467.1, `max-height: none` ×2. `overlay-plate.css` clamps only `[data-reveal="menu"]` | **still-live** | the consumer half only (drop any fixed body height) |
| A2-VA-L2-3 | an overlay ceiling of `min(24rem, available)`, not 60dvh, plus a scroll fade | `--overlay-max-block: min(24rem,60dvh)`. At 844×390: dock menu h 234, bottom gap 87, scroll 269 / client 232 (a hidden row); view list h 234, gap 87; colour-space list h 165.6 | **still-live** | stays ADOPT |
| A2-VA-L2-6 | the coarse dock touch floor (cured at HEAD) | 390 coarse: `Select view` 56×32 with `::after` slop 56×44, `Menu` 40×32 with slop 44×44 (**CURED**). `Toggle action bar` 32.8×32.8 has no slop, because 10.1.0 `touch-floor.css` still scopes `.dock-icon-button` to `:not(:where(.glass-dock *))` | **CURED-BY-REPIN** (trigger limb) · **still-live** (icon-button seats) | adopt now for the triggers. The 32 px seats need DockControl or glass's floor (UIA-V-106) |
| A2-VA-L2-7 | dock overflow (wrap, or an overflow-menu seat) | 360 coarse: the "Open color input" toggle spans 347.6–391.6 against the dock's right edge at 266.4 (**125.2 px** past it). The layer is `overflow-x: auto`, scroll 351 / client 149 | **still-live** | the consumer trim of ActionBarLayer only |
| A2-VA-L2-9 | `--control-floor` lifted on coarse pointers (cured at HEAD) | `--control-floor: 2.75rem` on coarse; the colour-space title trigger is h 52.5 (**CURED**). The glass `SegmentedTabs` "Colors" segment on /mix is **h 26.3**, below the floor. The Generate name field (h 30.5) is the consumer half (not on glass Input) | **CURED-BY-REPIN** (token and Select trigger) · **still-live** (SegmentedTabs height) | adopt now for the token. SegmentedTabs rides the O-74 letter |
| A2-VA-L2-12 | an `env()`-aware dock inset | glass dock CSS has 0 `safe-area-inset`. All 4 served `safe-area-inset` rules come from `demo/styles/foundation.css` (utilities plus the imported `.deck-stage`); in dist, only `deck/styles/stage.css` | **still-live** | the consumer half only (`viewport-fit=cover`, `.app-layout` padding) |
| A2-VA-L3-1 | raise the `--type-display-1` floor to at least `--type-title` | `--type-display-1: clamp(1.618rem, …)` and `--type-heading: 1.618rem`: the floor still equals heading. /nope at 390: the pane title is 25.888 px at weight 400 | **still-live** | the consumer half only (EmptyState on `--type-subheading` 600) |
| A2-VA-L3-2 | an additive CardHeader `#actions` (the card-level sibling of O-68) | CardHeader slots: `default` only. ConfiguratorLayer has `#actions` (O-68, table A) | **still-live** (CardHeader) | adopt now where the section is a ConfiguratorLayer (`.a` and `.h`); PaneHeader rows stay ADOPT |
| A2-VA-L3-3 | ConfiguratorRow inline layout (a container query) | the ConfiguratorRow props are `sub · name · description · canReset · size · class`, with no layout or orientation prop. /atmosphere at 1440: the row is 962 px wide, the label bottom is 497.1 / 496.6 and the slider top 503.1 / 502.6: **stacked** | **still-live** | stays ADOPT |
| A2-VA-L3-6 | keep `--control-text` off the coarse multiplier | `--control-text: calc(var(--type-small) * var(--ui-scale))` with `--ui-scale` 1.5 on coarse, so the Generate name field is 20.352 px against the audit's 20.4 px section heading | **still-live** | stays ADOPT |

**Table B count** (the same `awk` ×2 → `13 rows; 3 with CURED-BY-REPIN; 13 with still-live` both runs): 13 rows. **3 have a CURED-BY-REPIN limb** (L1-2 condense, L2-6 triggers, L2-9 token), each with a still-live limb named. **10 are still-live**: L1-6, L1-7, L2-1, L2-3, L2-7, L2-12, L3-1, L3-2, L3-3, L3-6. No row is wholly cured.

**For X-W12U (its W12U.md addendum turns ADOPT-AT-X-W7L into "adopt now"):**
- **Adopt now on 10.1.0:** O-68 `#actions` and O-75 `detached` (`.a` first); the L1-2 condense (`<CardHeader shrink>`); the L2-6 trigger slop and the L2-9 `--control-floor`, re-measured, not copied; O-57 R-2's bare `.cartoon-cast` is now live in the cascade.
- **Discharged by the repin:** O-80's glass half (I-59 confirmed on the product: 0 glass forced layout). `.p` measures only the consumer scoping, on the 120 Hz D1 cell. O-63 and O-65 do not reproduce on value.js's dock at 10.1.0.
- **Stays ADOPT or honest-RED with its relay:** the 9 still-live rows in table A and the 10 still-live rows in table B, plus the still-live limbs of L1-2 (veil), L2-6 (icon-button seats) and L2-9 (SegmentedTabs). No consumer copy is licensed by any of them.
- **At the 10.2.0 veil minor (the I-56 follow-up unit):** re-read GLASS-VEIL-GREY and O-66 with this instrument (`v-probe.ts`, `.dockPlate*` and `.o66`).

**Gates BEFORE → AFTER.**
- **L10:** not measured at 10.1.0 (rows open) → **GREEN as an instrument**. 14/14 glass-owned rows and 13/13 ADOPT-AT-X-W7L AUDIT-2-value rows were measured ×2 on served `:9000`, headed, real GPU, at 10.1.0, each marked CURED-BY-REPIN or still-live with its measurement (tables A and B). 5 + 3 limbs are cured by the repin; every other row and limb is named still-live with its owner.
- **Product bytes:** 0 touched. ⟨`git status --porcelain -- demo src e2e test package.json package-lock.json`⟩ → empty at close.

**Residuals.**
- **RES-v-1 (load).** The O-80 frame figures (p95 58.3 / 58.4 ms) were read at load 88–124 on a 60 Hz headed window. They attribute layout by source, which is what the glass verdict rests on (0 ms glass). They are not a budget reading. X-W12U `.p` owns that, on the 120 Hz D1 cell at a quiet load.
- **RES-v-2 (O-63 focus ring).** The keyboard focus read landed on the collapsed seat ("Expand dock", `outline: auto 1px`), not on a row trigger, so the ring-inside-the-clip leg is inferred from the room (10.5 px against a 2 px + 2 px ring at `outline: solid 2px 2px` on `Select view`, read once in a superseded trial run whose JSON was overwritten, so the figure is not banked), not framed. It is not a verdict input: O-63's verdict rests on the hover and open-state rooms and frames ×2.
- **RES-v-3 (G3 attribution).** 61 of the 269 strict TS2353 rows target native element types (X-W7R RES-v-2's class). That share is not glass-owned, and it still needs its own owner before `strictTemplates` can flip.

**Escalations.** None.

**Commits.** `1639d84b`: the evidence (24 files: `v-probe.ts`, `v-o65-probe.ts`, `v-o12-headed.config.ts`, `v-summarize.mjs`, readings ×2, 10 frames force-added as `.i` did, because `*.png` is ignored at `.gitignore:34`) plus the INBOX E13 sweep line. This receipt is a separate commit (pathspec: the record). The seat's `:9000` vite server is stopped at close.
- **Adjacent edits:** none.

### X.W7L.a

Seat `claude-opus-5-5`, 2026-09-25 (resumed seat; HEAD at open `08353549`, at commit `a8449bee`+). Spec W7L.md §Units `.a` (:26-27); COHESION §0cu (OA-69), §0cz (O-75), §0dd, §0dh (fourier's precedent `239845f`).

**Crash-recovery.** ⟨`git status --porcelain -- demo e2e docs/tranches/X/evidence/X-W7L docs/tranches/X/execution/A/X-W7L.md`⟩ → `?? e2e/smoke/x-w7l-detached.spec.ts` · `?? e2e/smoke/x-w7l-zprobe.spec.ts`, plus the ignored `a-frames/` (6 PNGs). These are a killed predecessor seat's partial work on this unit. Judged whole:
- `x-w7l-detached.spec.ts` (253 lines): the falsifier, the same shape as fourier `web/e2e/f-w14v-detached.spec.ts` (210 lines): `da` gutter = page ground at 1440×900 and 1024×768, light and dark (structural stack + pixel medians with the casts off against the grid-hidden ground); `db` every section action on its header row, and a layer's header action never toggles it. Its `data-slot` names checked against glass 10.1.0 dist: ⟨`grep -o '"configurator-layer[a-z-]*"' node_modules/@mkbabb/glass-ui/dist/configurator-*.js | sort -u`⟩ → `configurator-layer`, `-actions`, `-header`, `-trigger`. Conforms; kept as written.
- `x-w7l-zprobe.spec.ts` (128 lines): a scratch probe of gutter variants (`test("probe variants")`), not a gate. Moved out of `e2e/` to the session scratchpad, never committed.

**Act 1 — census (L11).** Banked at `evidence/X-W7L/a-census.txt`.
- ⟨`grep -rn 'ConfiguratorLayer\|layout="detached"\|<Configurator[ >]' demo | wc -l`⟩ → `0`. The only glass Configurator import is `ConfiguratorRow` in `demo/scenes/ConfigSliderPane.vue:21` (the /blob and /atmosphere inspectors).
- **Stage + inspector:** value.js's scene is its own `.pane-container` grid of region cards (`.pane-wrapper--stage` / `--inspector`), not glass `Configurator`. It paints no shell plate: the falsifier's stack over the gutter is `div.pane-container > main.pane-main > div.app-layout > div`, `plates=0`, and the gutter pixel equals the grid-hidden ground (`delta=0,0,0`) in all four cells. There is no band for `layout="detached"` to remove, so it is not adopted (lock: "adopt only where value.js has the shape").
- **Section actions:** ConfigSliderPane's titled sections (`.config-section-header`, non-collapsible) carry no action: ⟨falsifier census⟩ → `#/blob Geometry:0 · Membrane:0 · Color:0 · Lit Glass:0 · Pointer:0 · Satellites:0 · Tempo:0`, `#/atmosphere Field:0`. Its Copy JSON / Reset band (`ConfigSliderPane.vue:167-180`) resets the whole pane, so it is a PANE-level action. That row is A2-VA-L3-2 (glass CardHeader `#actions`, still-live at 10.1.0 per `.v` table B, owned by X-W12U `.h`), not a ConfiguratorLayer section's.
- The other refresh/reset sites (⟨`grep -rln "RotateCcw\|RefreshCw\|RefreshCcw" demo`⟩ → 14 files: the workbench plates, the admin sub-view toolbars, the slug bar, error plates, dock menus) are not Configurator sections. GenerateControls already seats Regenerate on its plate's header row (UIA-V-361 is its wrap row). The admin toolbars' `Refresh …` buttons are measured in AUDIT-2 `value-L3/metrics.json` and belong to Lens 3's owner (X-W12U), not to this adoption.
- Verdict: **L11 GREEN by census**. 0 sites have the glass shape, so 0 adoptions, and 0 `demo/**` edits.

**Act 2 — the falsifier ×2 and its discrimination.** ⟨`npx playwright test e2e/smoke/x-w7l-detached.spec.ts --project=smoke --workers=1 --reporter=line`⟩
- r1 → `6 passed (1.1m)` · r2 → `6 passed (1.3m)` (`a-falsifier-r1.txt`, `-r2.txt`). Readings are identical across runs: 1440 light `gap=18.0 gutter=255,145,176 ground=255,145,176/255,145,176 delta=0,0,0 plates=0`; 1024 light `gap=12.8 … delta=0,0,0`; 1440 dark `gutter=89,0,27 … delta=0,0,0`; 1024 dark `gutter=92,0,25 … delta=0,0,0`. The `casts=` read (e.g. 1024 light `70,51,51`) is the region cards' cartoon cast over the gutter: a shade, published but not judged, as in fourier's spec.
- **Planted defect (the falsifier fails when the law breaks).** A scratch copy (`a-planted.spec.ts.txt`) plants `.pane-container { background: rgb(128,128,128) }` and appends a "Reset section" button to the body of the first section, then runs the same assertions → `6 failed` (`a-falsifier-planted.txt`): every `da` cell fails the stack check (`plates=1`) and both pixel checks (e.g. `gutter=128,128,128 … ground=255,145,176 delta=-127,-17,-48`), and each `db` scene fails "sits in the section header" and "sits on the header's row". The copy lived in `e2e/smoke/` only for that run and was deleted (⟨`ls e2e/smoke/x-w7l*`⟩ → the one spec).
- Frames: `a-frames/after-da-{1440,1024}-{light,dark}.png`, `after-db-{blob,atmosphere}-1440-light.png`, force-added (`*.png` is ignored at `.gitignore:34`), the same way `.i` banked its frames.

**Act 3 — floors.**
- vue-tsc demo: ⟨`npx vue-tsc -p tsconfig.demo.json --noEmit`⟩ ×2 → EXIT 0, EXIT 0. e2e tsc: ⟨`npx tsc -p tsconfig.e2e.json --noEmit`⟩ → EXIT 0 (the new spec types clean).
- vitest: ⟨`npx vitest run`⟩ r1 `Tests 7 failed | 980 passed (987)`; r2 `8 failed | 971 passed | 8 skipped (987)` at load 53, with the extra `palette-card-layout`, `plate-mass` and `generate-rail` EC-10 failures; ⟨those 3 files alone⟩ → `Tests 12 passed (12)`, so they are load flakes (the baseline's own class); r3 `7 failed | 980 passed (987)`. The steady 7 are the banked set: C-5, NG-6, and `.i`'s 5 INK-VEIL-MIDBAND. The spec's "945/947" floor is the pre-`.m` count; the tree has grown since (`.m` 958/960, `.i` +16 and +11 files), and the named failures are unchanged. **Floor held** (`a-vitest.txt`). This unit touched no product or unit-test file, so no count can move because of it.

**Gates BEFORE → AFTER.**
- L11: RED (0 ConfiguratorLayer, unmeasured) → **GREEN by census**: 0 glass Configurator shapes, 0 lone-row section actions, a gutter that is the page ground.
- Falsifier: absent → **GREEN ×2** (6/6), RED 6/6 on the planted defect.
- vue-tsc demo 0 → **0 ×2**. vitest floor → **held** (980/987, only the banked 7; one load-flake run classified).

**Residuals.**
- **RES-a-1.** The pane-level Copy JSON / Reset band in ConfigSliderPane is A2-VA-L3-2: glass CardHeader has no `#actions` at 10.1.0, and X-W12U `.h` owns it. This unit does not move it into a ConfiguratorLayer, because the sections are not layers; converting them would be a design change that no ruling has made.
- **RES-a-2.** Lone-row actions outside Configurator shapes (the admin toolbars and others) are AUDIT-2 Lens 3's census, in X-W12U.

**Escalations.** None. **Adjacent edits:** none. **Inherited paths:** `e2e/smoke/x-w7l-detached.spec.ts` (kept), `e2e/smoke/x-w7l-zprobe.spec.ts` (removed from the tree; scratch), and `a-frames/*.png` (re-shot by r2).

**Commits.** `00d63cd3`: the falsifier plus its evidence (13 files). This receipt is a separate commit (pathspec: the record).

## Close

Close seat, 2026-09-25, `claude-opus-5-5`, VERIFY-ONLY, HEAD `6005a704` at open (branch `tranche-u`; `origin/tranche-u` = `b15a8aba`, 20 behind HEAD, 0 ahead). Spec `waves/W7L.md` read whole (42 lines). Of this record: the header through `## Unit plan`, and the four unit receipts located by grep. Load average 36–156 during the gates (four live tracks).

**Crash-recovery.** ⟨`git status --porcelain`⟩ → no path inside this wave's writable set is dirty. Dirty paths outside it (`CARRY-LEDGER.md`, `F-W14V.md`, `X-P-W7.md`, two W4 PNGs, `scripts/dev/dev.sh`, untracked `audit-2/`, keyframes evidence, a root `reach`) belong to other seats and were left alone. No inherited work.

### Act 1: commit roster and bounds

⟨`git log --grep='X.W7L\|X-W7L' fed9dd4d^..HEAD`⟩ plus ⟨`git show --stat` on each⟩:

| commit | unit | paths | in bounds |
|---|---|---|---|
| `fed9dd4d` | open | record · LEDGER · INBOX | yes |
| `c8a4959d` | `.m` | 49 `demo/**` · 7 `e2e/smoke/**` · `package.json` · `package-lock.json` (58) | yes; 0 `src/**` |
| `cd3cc3d1` | `.m` | 3 `e2e/smoke/**` | yes |
| `9c7e1ab3` | `.m` | record · 14 `evidence/X-W7L/m-*` | yes |
| `aff70fa8` | `.m` | LEDGER (own row) | yes |
| `c8cbbe10` | `.i` | `demo/color-session/ink.ts` · `useContrastSafeColor.ts` · `test/ink-real-composite.test.ts` · `test/ink.test.ts` | yes; 0 `src/**` |
| `2b860dcd` | `.i` | `relay/X-ALL-BK-GLASS-VEIL-GREY-ADDENDUM-2026-09-25-W7L-I.md` · INBOX (+1) | yes |
| `3ca75e36` | `.i` | record · 30 `evidence/X-W7L/i-*` | yes |
| `1639d84b` | `.v` | 23 `evidence/X-W7L/v-*` · INBOX (+1) | yes; 0 product |
| `f5ca36e4` | `.v` | record | yes |
| `00d63cd3` | `.a` | `e2e/smoke/x-w7l-detached.spec.ts` · 12 `evidence/X-W7L/a-*` | yes; 0 `demo/**` |
| `6005a704` | `.a` | record | yes |

0 landed-wrong: every path is inside the spec's §1 Bounds and the unit plan's writable set. No `glass-ui/**`, no `scripts/dev/dev.sh`.

### Act 2: every spec gate re-run by this seat

Evidence: `docs/tranches/X/evidence/X-W7L/close/` (`gates.txt`, `smoke-lists.txt`, `L8-*`, `D1-*`).

| gate | BEFORE (baseline, `e44bd32c`, glass 7.0.0) | AFTER (this seat, HEAD `6005a704`, glass 10.1.0) | reading |
|---|---|---|---|
| L1 pin exact | RED `^7.0.0` / 7.0.0 | ⟨`grep -n '"@mkbabb/glass-ui"' package.json`⟩ → `89: "@mkbabb/glass-ui": "10.1.0"`; lock `node_modules/@mkbabb/glass-ui` `"version": "10.1.0"`; installed ⟨`node -p require(...).version`⟩ → `10.1.0`. Pushed at Act 7. | **GREEN** |
| L2 banked patch intent | RED (6/51 drift) | ⟨`git apply --check --reverse m-repin-10.0.1-migration.patch`⟩ → 21 files do not reverse, run twice. Each of the 21 was changed in `c8a4959d` and by no later commit (⟨`git log c8a4959d..HEAD -- <f>`⟩ → 0 for all 21). So they differ only by the 10.1.0 re-spelling and the six hand resolutions, as `.m` recorded. ⟨`grep -rn 'show-close' demo --include='*.vue' \| wc -l`⟩ → 0. | **GREEN** |
| L3 check (typecheck + lint) | no `check` script | ⟨`npm run typecheck`⟩ EXIT 0 ×2 (lib + demo + test vue-tsc + e2e tsc). ⟨`npm run lint`⟩ EXIT 0 ×2. | **GREEN ×2** |
| L4 `npm test` | 945/947 (C-5, NG-6) | ⟨`npx vitest run`⟩ r1 `8 failed \| 979 passed (987)`, r2 `7 failed \| 980 passed (987)`. The steady 7 are C-5, NG-6 and the 5 INK-VEIL-MIDBAND cases in `test/ink.test.ts`. r1's eighth is `generate-rail` EC-10, which passes in r2; it is the baseline's load-flake class. | **GREEN at the floor** (only banked honest-RED ids) |
| L5 vue-tsc demo | 0 ×2 | EXIT 0 ×2 (the demo leg of L3) | **GREEN ×2** |
| L6 smoke `--workers=1` | cited (X-W7R 71/281) | r1 (full) ⟨`VJS_E2E_PORT=5371 npx playwright test --project=smoke --project=smoke-admin --project=smoke-mobile --project=smoke-reactivity --workers=1`⟩ → `94 failed · 2 skipped · 1 did not run · 217 passed` of 314 (1.4 h; load 37–156). Rerun ⟨`--last-failed`⟩ → `79 failed · 15 passed` (38.8 m). Those 15 are load flakes. The steady 79 are classified in the next table. | **GREEN by classification** (the spec's "or each failure classified with its cause") |
| L7 D1 headed real GPU ×2 | cited | ⟨`PROBE_HEADED=1 node …/scene-swap-budget.mjs`⟩, renderer `ANGLE Metal Renderer: Apple M5 Max`. r1 `pass: true`, 4/4 hops. r2 `pass: false` because a sibling seat rebuilt the shared `dist/gh-pages` mid-run: all 4 hops read `animated: false`, and the next serve logged `dist/gh-pages missing — building` (`D1-r2-contamination-serve-log.txt`). This seat then built its own bundle into the scratchpad, served it on :8095 and ran r3 and r4: both `pass: true`, 4/4 hops (over32Ratio .026/.012/.012/.012 and .026/.012/0/.011, at load 142 and 156). | **GREEN ×2** (r3, r4 on an uncontested bundle; r1 also green) |
| L8 ink instrument, every plate ×2 | unmeasurable (throw) | ⟨`node i-L8-instrument-run.mjs {light,dark}`⟩ ×2 on served :9000, headed. Each of the 4 runs: 6/6 plates at 126/126 completed, 0 threw; 10 routes, 0 ink errors, 0 scene-load failures. | **GREEN ×2** |
| L9 certified-ink contract | 20/20 (floor) | ⟨`npx vitest run test/ink-real-composite.test.ts test/ink.test.ts`⟩ ×2 → `5 failed \| 31 passed (36)` both runs. `ink-real-composite` is 16/16 ×2. `ink.test.ts` is 15/20: the 5 are INK-VEIL-MIDBAND, relayed as O-62 addendum (a) (`2b860dcd`). | **GREEN (new cases) + honest-RED INK-VEIL-MIDBAND (relayed)** |
| L10 glass-row re-read | rows open | ⟨`node v-probe.ts http://localhost:9000`⟩ ×2 + ⟨`v-summarize.mjs`⟩, compared with the banked `v-summary.txt`. Every categorical reading matches: dock widths 479→56, 479.5→302→479.5, blur 0, scaledText 0, glass/dock forced layout 0 ms, and every row field. Only timing figures differ (morph settle 22–123 ms; O-80 p95 61.9–62 vs 58.3–58.4, load-bound per RES-v-1). | **GREEN ×2** (the instrument reproduces `.v`'s marks) |
| L11 `#actions` / `detached` + falsifier | RED | ⟨`npx playwright test e2e/smoke/x-w7l-detached.spec.ts --project=smoke --workers=1`⟩ → `6 passed` ×2 | **GREEN ×2** |

**L6: the 79 steady failures, by class** (counted with ⟨`grep -cE <class> steady-full.txt`⟩ on the rerun list; they sum to 79):

| class | n | tests | cause (measured) | owner |
|---|---|---|---|---|
| pre-existing | 41 | the `.m` 45-list, less 2 that now pass (o18 graph nodes light, o9 Extract) and 2 that flaked | they fail on 7.0.0 too (`m-smoke-classification.md`) | standing honest-RED set (X-W7R / X-W12U) |
| C-TRIGGER-PAINT | 8 | w12-text-trigger ×8 | as in `.m`: the rest trigger paints a backdrop blur | X-W12U (`.v` row) |
| C-CARD-STAMP | 3 | o7 census light, dark, 390 | as in `.m`: 8.0.0 retired `data-tier` and grain | X-W12U |
| C-DOCK-IDLE | 2 | BR-10 rtl, o14 ramp light (o14 ramp dark flaked to pass) | as in `.m`: the 3600 ms idle | X-W12U |
| C-DOCK-PAINT | 2 | o15b settled rest, w12-dock DOCK-TRIGGER-CLIP | as in `.m` | X-W12U (`.v` DOCK rows) |
| C-DIALOG | 2 | w7-inspector-rows tag, publish/unpublish | as in `.m` | X-W12U |
| C-LETTER | 1 | views/gradient aurora | as in `.m`: an E-3 dated letter names 7.0.0 | X-W12U / an addendum beside the letter |
| ex-C-INK, now past the crash | 6 | o18 markdown About light and dark; o18 W6.5 IDENTITY; webgl-blob chroma ×2; reactivity-instant | The `.i` cure removed the throw (0 `contrast_unreachable`), so these now reach their assertions. **About prose ink `rgb(28 25 23)` on plate ground `rgb(101 99 97)` = 2.91:1 (< 4.5)**. IDENTITY accent C 0.0070 < 0.0372 (0.35× the pick): the INK-VEIL-MIDBAND near-white ink. Blob painted chroma off by 0.041 (tolerance 0.04). Spectrum-drag readout median 546.8 ms (≤ 50). | RES-close-1 / -2 below |
| C-SEQ (sequence-bound) | 14 | views/gradient ×7, o9 Mix→Palettes empty, o14 T-10 letterform, mix flow, webgl view-switch, a11y C4 handle ring, o27 BR-1 ring layer | Most fail at the dock's view `Select`: "element is not stable" / "waiting for … 'Select view' … stable". They are steady in sequence (full run and rerun). In isolation at HEAD (⟨`-g '<garbage input\|C4\|BR-1\|mix flow\|spectrum-drag\|view switch>'`⟩, :5392) garbage, C4 and BR-1 **pass**. Mix flow, view-switch and spectrum-drag fail in isolation both at HEAD **and on the pre-`.i` tree** (`git archive c8cbbe10^` built in scratch, :5391). That tree carries the same product bytes as `.m`'s run, where mix flow and view-switch passed, so they are not a `.i` regression. | RES-close-3 below |

### Act 3: verification artefacts

The spec names frames at 1440 light and dark before (7.0.0) and after (10.1.0) for `.i`. ⟨`ls docs/tranches/X/evidence/X-W7L/i-{before-7.0.0,after-10.1.0}-*.png`⟩ → 8 files: home and URL colour, light and dark, each before and after. They are present and committed in `3ca75e36`. The `.a` frames (`a-frames/`, 6) are committed in `00d63cd3`.

### Act 4: E13 mail

⟨`find <path> -maxdepth 1 -type f -newer docs/tranches/V/coordination/INBOX.md`⟩ over value `V/` and `V/coordination`, glass `BK/coordination` and `BL` (the newest glass tranche), keyframes `V/coordination`, and atlas `P/coordination` → 0 files on every path. The newest rowed inbound letters are I-64 and I-65 (glass, 2026-09-25). **0 UNREAD in scope.**

### Residuals (named owners)

- **RES-close-1 (ABOUT-PROSE-VEIL).** On glass 10.1.0, the markdown About body's prose ink `rgb(28 25 23)` sits on a plate that composites to `rgb(101 99 97)`, which is **2.91:1, below AA** (o18 markdown About, light and dark, steady ×2). This ink is not an instrument call site, so the 10.1.0 veil darkens the plate under uncertified ink. The O-62 addendum (a) does not name this surface. **Owed:** O-62 addendum (b) beside O-62, with this surface and its composite. Owner: X-W12U (consumer half) and the 10.2.0 repin re-read unit (§ADDENDUM I-56). Honest-RED id: ABOUT-PROSE-VEIL.
- **RES-close-2 (ex-C-INK assertions).** IDENTITY accent C 0.0070 is INK-VEIL-MIDBAND (already relayed in O-62 (a)). webgl-blob chroma is off by 0.041 against a 0.04 tolerance. The spectrum-drag readout median is 546.8 ms against 50 ms, and it fails in isolation on the pre-`.i` tree too. Owner: X-W12U (`.p` for the budget) and the 10.2.0 re-read.
- **RES-close-3 (C-SEQ, 14).** Dock view-`Select` "not stable" and focus-ring failures that are steady in sequence but pass in isolation (3 of 3 probed). Mix flow, view-switch and spectrum-drag fail in isolation at both HEAD and pre-`.i`. None is attributed to this wave's commits. Owner: X-W12U `.m` (the dock-idle / e2e `expandDock` class; carrying the dock-motion flake from X-W12 Check 4 m-2).
- **RES-close-4 (shared `dist/gh-pages`).** D1 on the shared bundle is contaminated whenever a sibling seat rebuilds it (this seat's r2). Future D1 reads should serve a private build (`--outDir` in scratch, `PERF_PORT`/`PROBE_BASE`), as r3 and r4 did. Owner: the gate harness (X-W8).
- Carried unchanged: RES-m-1 (dead `--glass-tint-*` pins, X-W12U), RES-m-2 (card grain, X-W12U), RES-i-1 (the ground's spatial spread, the 10.2.0 re-read), RES-v-1..3, RES-a-1/-2 (X-W12U), INK-VEIL-MIDBAND (O-62 (a); the 10.2.0 re-read), C-5 / NG-6 (standing).

### Escalations

None. Landed-wrong: none. Adjacent edits: none. This seat wrote only the record, `evidence/X-W7L/close/` and its LEDGER row.

### State

`X-W7L`: **IMPLEMENTED** 2026-09-17 (the tranche clock). The pin reads `10.1.0` exact on `tranche-u`, committed and pushed. No row reads "hold on 7.0.0". Per §2, the row flips CLOSED only on a CONFORMANT check. This seat does not stamp VERIFIED.
