SERVED MODEL: claude-opus-5-5[1m]

# X.KF.W13T — execution record (Track B · X·KF)

**Wave**: `KF.W13T` — the owner audit docket, keyframes side (COHESION §0ao OA-6 · §0ao.1 OA-7..OA-10 · §0ap's `.k`/`.k2` widening).
**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W13.md` — the three dated ADDENDA 2026-09-22 at `:307` (§0ao, `.k` + `.k2`), `:309` (§0ao.1, `.e`; order [`.k`] → [`.e`] → [`.k2`]), `:311` (§0ap, `.k` gains R-a4-1 + R-a4-2; `.k2` gains the 7 eslint errors). KF-W13.md's earlier units (`.a`..`.d`, `.a2`..`.t2`, `.f`/`.f2`) belong to KF.W13 / KF.W13S and are NOT this wave's.
**Seat 0 (OPEN)**: `claude-opus-5-5[1m]`, 2026-09-22 (execution under the owner's 2026-09-17 begin-word, COHESION §0j).

## Open

**Date**: 2026-09-22 (the wave's row status is spelled `OPEN 2026-09-17` by the begin-word convention).

**Crash recovery**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → only two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md`. These are value.js→kf letters outside every writable set of this wave, and **zero product paths are dirty**. ⟨cmd⟩ `git -C value.js status --porcelain`: seven modified value.js product/doc paths, one untracked gate script, and two untracked coordination letters. All of them are Track A's or the standing `scripts/dev/dev.sh`, none are in this wave's writable set, and none were touched. No record existed for KF.W13T, so this is a fresh open, not a RESUME.

**Preconditions ("Opens after KF.W13S CLOSED" — `KF-W13.md:307`)**:

| precondition | at the ledger | at the bytes | state |
|---|---|---|---|
| KF.W13S CLOSED | row `:55` → `**CLOSED 2026-09-17** ⟵ CHECK 1 (RESUME 3, L-20 pass 1) CONFORMANT` · event line `:502` (*"KF.W13T's opens-after conjunct (KF.W13S CLOSED) GREEN — not blocked"*) | kf `HEAD` = `084a3679` = `origin/master` (⟨cmd⟩ `git fetch; git rev-list --left-right --count origin/master...HEAD` → `0 0`); `.t2`'s three shas `aba106f6` · `b05e7e75` · `084a3679` present | **MET** |
| the owner screenshots banked (§0ao.1) | — | ⟨cmd⟩ `ls docs/tranches/X/keyframes/evidence/W13T/` → `owner-2026-09-22-easing-picker-no-curves.png` · `owner-2026-09-22-timeline-slider-undraggable.png` | **PRESENT** |
| kf dev server (live-browser acts) | — | `curl localhost:5173` → `<title>keyframes.js` (vite, the kf checkout) | **LIVE** |

**Owner-gated items**: none open. OA-6..OA-10 are owner rulings (§0ao/§0ao.1 — *"These are owner rulings, not seat findings"*). The `.k` R-a4-1/R-a4-2 grant and the `.k2` eslint grant come from §0ap. kf write/push authority comes from §0j (the begin-word). Producer (glass-ui) gaps go by BK relay (§0ao law; runbook §5.5).

**E13 Step-0 (the four-path sweep)**: BK is still the newest glass tranche dir (⟨cmd⟩ `ls -d glass-ui/docs/tranches/B*` → `BI BJ BK`). ⟨cmd⟩ `find <path> -maxdepth 1 -type f -newermt "2026-09-21 00:00"` returned:
- value.js `V/`: empty
- `V/coordination`: `INBOX.md` only
- BK/coordination: `glass-outbound-2026-09-22-consumers-10.0.0.md` (already rowed and noted ×6), `fourier-to-glass-2026-09-17-nwo1-bh-relay.md` (×3), `value-to-glassui-2026-09-DD-fw4-relay.md` (×4)
- kf `V/coordination`: empty
- atlas `P/coordination`: empty

**0 unrowed**. ⟨cmd⟩ `grep "^| I-" INBOX.md | grep -c "| UNREAD"` → **0**, tail I-39. A dated sweep line is appended to INBOX.md.

## Baseline

All gates were run READ-ONLY at kf `084a3679`. Live probes used headless chromium (value.js's installed `playwright`) against `http://localhost:5173`. The probe scripts are seat-local (scratchpad) and were not committed. Probe parsimony: 5 bounded runs, no MCP session.

| gate | spec clause | BEFORE (×2) | reading |
|---|---|---|---|
| **G-KFW13T-1** | 0 children outside the `GlassDock` capsule at 3 viewports ×2 | collapsed docks: **0 · 0 · 0**. **Expanded** top ChromeDock (hovered): 1440×900 **0** · 768×1024 **0** · 390×844 **1** — same numbers on both runs | **RED** at 390: `button.dropdown-menu__trigger.dock-trigger` (the `@mbabb` MbabbMenu trigger) box `[237,41,297,68]` vs capsule `[98,30,293,80]`, 4 px past the right edge. It also collides with the top-right utility cluster (screenshot: the trigger reads `@mbab` under the share/keyboard/theme group). This is the OA-6 row. |
| **G-KFW13T-2** | vue-tsc 0 · `test:demo` green · push | ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json \| grep -c 'error TS'` → **0 · 0**; ⟨cmd⟩ `npx vitest run --project demo` → **59/59 files · 494/494 tests** ×2 | **GREEN-before-cure** (a standing invariant carried from KF.W13S's close). It must hold at every unit's close; the push limb is an act. |
| **G-KFW13T-3** | picker rows with a rendered `<svg><path` glyph = rows, ×2 | ⟨cmd⟩ `grep -c '<path' …/channel-controls/ChannelOptions.vue` → **0 · 0**; `<SelectItem` template **1** (the `v-for` over `EASING_GROUPS`); ⟨cmd⟩ `grep -c 'item("' utils/reference-data/easingGroups.ts` → **29** rows | **RED — 0 of 29**. The picker is `ChannelOptions.vue:346-408` (name + description, no glyph), which is what the owner screenshot shows. A glyph source already exists in-tree: `EasingTarget.vue:133` renders `<svg><path :d="curve.path">` per specimen. `.e` derives the path from the easing function itself (the spec's idiom). |
| **G-KFW13T-4** | slider `aria-valuenow` changes under a pointer drag AND ArrowRight | `[role=slider][aria-label="Scrub animation timeline"]` at `#/easing`: thumb 12×40 at x=79, track `.glass-slider` 379 px. **Thumb pointer drag to 60 %: 0 → 0** · **track click at 30 %: 0 → 0** · **ArrowRight: 0 → 15** (keyboard works). Thumb `background-color` = `color(srgb 0.494 0.351 0.799 / 0.8)` (the raw purple the owner saw). | **RED** on the pointer limb and the styling limb. The keyboard limb is GREEN-before-cure. OA-8 reproduces. |
| **G-KFW13T-5** | playback witness: plays 500 ms, asserts progress > 0 | witness file: **absent** (⟨cmd⟩ `grep -rln "progress" test/demo \| grep -i play` → none named for OA-9). Live clock probe (headless chromium, Play pressed, 600–700 ms): `#/easing` scrub 0 → **553** · `#/cube` 0 → **750** · `#/square` 0 → **708** · `#/spring` 0 → **710** | **RED by absence** (the witness). **FINDING: OA-9 did NOT reproduce at the clock level in chromium** — the transport clock advances in all four scenes. `.e` must discriminate at the owner's surface: whether the SUBJECT moves while the clock ticks, the Safari/WebKit engine cell, reduced motion, or the dark-theme state of the screenshots. The cure is named where the defect is measured, never presumed at the clock. One `pageerror` was also observed at `#/easing`: *"Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element'."* This is a candidate for OA-9 and `.e` investigates it. |
| **G-KFW13T-6** | toggle hides/shows the preview; persisted across reload | ⟨cmd⟩ `grep -n "aria-pressed\|<Switch\|<Toggle " scenes/easing/*.vue` → only comment prose (`EasingTarget.vue:87`) and the specimen `ToggleGroup`s (`:54`, `:116`); no preview-hide control | **RED — absent** |
| `.k` R-a4-1 | `superKey` bound at `App.vue:35`, declared in `MbabbMenu.vue` | ⟨cmd⟩ `grep -c superKey demo/app/App.vue demo/app/dock/MbabbMenu.vue` → **3 · 2** | residue present, cured by `.k` |
| `.k` R-a4-2 | CubeScene's unreachable hover-card state | ⟨cmd⟩ `grep -n 'ppmycotaOpen\|autoDismissTimer\|clearAutoDismiss' demo/scenes/cube/CubeScene.vue \| wc -l` → **10** | residue present, cured by `.k` |
| `.k2` eslint | the §Verification line WITHOUT `demo/styles` (§0ap erratum) | ⟨cmd⟩ `npx eslint demo/app demo/components/instrument/transport demo/components/playback` → **7 errors · 7** in three files: `demo/app/App.skeleton.vue:1:1` (`vue/multi-word-component-names`) · `…/channel-controls/TimingFunctionPanel.vue:151:9 · :152:9 · :156:5` (`vue/no-mutating-props` `storedAnimationOptions`) · `…/controls-pane/ControlsPaneWrapper.vue:62:58 · :328:5 · :366:9` (`vue/no-mutating-props` `animControlRefs` / `storedControls`) | **RED — 7** |

**R.2 green-before-cure register**: (1) G-KFW13T-2's vue-tsc/test:demo limbs, which are a standing invariant and therefore expected; (2) G-KFW13T-4's keyboard limb, where ArrowRight moves the scrub already; (3) G-KFW13T-5's live-clock reading, where OA-9 does not reproduce as "the clock never starts" in chromium. Each is recorded as a finding, not as a cure.

## Unit plan

**Order (binding, `KF-W13.md:309`)**: [`KF.W13.k`] → [`KF.W13.e`] → [`KF.W13.k2`]. Three serial groups, peak concurrency 1, every seat Opus (no Fable/adjudicator seat is named). No two units run concurrently, so modify paths are never shared in flight. `.e` and `.k2` both reach `channel-controls/` (`TimingFunctionPanel.vue`), and the serial order separates them. The kf root is `/Users/mkbabb/Programming/keyframes.js/`; every writable set below includes this record and `docs/tranches/X/keyframes/evidence/W13T/**` (value.js).

| unit | model | spec | writable (kf unless noted) | gates | locks |
|---|---|---|---|---|---|
| `KF.W13.k` | opus | `KF-W13.md:307` (§0ao OA-6) + `:311` (§0ap R-a4-1 · R-a4-2) | `demo/app/dock/ChromeDock.vue` · `demo/app/dock/MbabbMenu.vue` · `demo/app/App.vue` (the dock's consumer end only) · `demo/styles/**` · `test/demo/app/**` · `demo/scenes/cube/CubeScene.vue` (ONLY the §0ap R-a4-2 spans) | G-KFW13T-1 · G-KFW13T-2 (+ push) | OP-8 standing (no `ComponentExposed<>`/`Pick<>` remedies); the MUST-CARRY `v-model:open` binding stays (G-KFW13-1); R-a4-1 and R-a4-2 are each one commit per meaning; never `overflow:hidden`; a capsule defect goes by BK relay |
| `KF.W13.e` | opus | `KF-W13.md:309` (§0ao.1 OA-7..OA-10) | `demo/scenes/easing/**` · `demo/components/instrument/transport/channel-controls/**` · `demo/components/instrument/timeline/**` · `demo/components/playback/**` · `demo/composables/useDragScrub.ts` · `demo/utils/reference-data/easingGroups.ts` (glyph data only if the catalogue is the glyph's source) · `test/demo/**` | G-KFW13T-3 · -4 · -5 · -6 · G-KFW13T-2 (+ push) | KF-AV-28 rider / PR-CAUTION (a swap onto the primitive is never sufficient alone); the pointer path is bound at the root in `useDragScrub.ts` (no second listener); producer slider/toggle gaps go by BK relay, never a local control; OA-9's cure is at the measured driver, and a driver outside bounds is an ESCALATION |
| `KF.W13.k2` | opus | `KF-W13.md:307` (`.k2`) + `:311` (§0ap eslint grant) | `demo/app/App.skeleton.vue` · `demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue` · `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue` · value.js `execution/LEDGER.md` · value.js `V/coordination/INBOX.md` | eslint line (no `demo/styles`) 7 → 0, or each returned by `file:line` · G-KFW13T-1..-6 re-verified ×2 · E13 0 UNREAD · push | a VERIFY-ONLY close apart from the eslint grant; the LEDGER is edited in place in the row cells only; no `eslint-disable` |

### Briefs

- **`KF.W13.k`**: (1) Re-run the baseline dock probe with Playwright, bounded, at 1440×900 · 768×1024 · 390×844, with the top ChromeDock EXPANDED (hover) and also with a scene active. Measure every descendant box against the `.glass-dock` capsule and commit the before-screenshots to `evidence/W13T/`. Baseline is 390×844: the `@mbabb` `dock-trigger` sits 4 px outside and collides with the top-right cluster. (2) Cure at the layout root: the dock's axis, `DockLayerGroup` sizing, or a child sized in px instead of the dock control floor. Never `overflow:hidden`, and a capsule defect goes to BK by mail. (3) A committed `test/demo/app/**` witness. (4) R-a4-1: remove the `superKey` residue. (5) R-a4-2: remove the CubeScene spans. (6) Take the after-screenshots, then run vue-tsc 0 and `test:demo` ×2, then push kf.
- **`KF.W13.e`**: Take live before/after screenshots at `#/easing`. **OA-7**: each `ChannelOptions` SelectItem (29 rows) gets an `<svg><path>` glyph derived from the easing function itself, sized to the row, with no sprite. **OA-8**: the scrub slider (`PlaybackRibbon`) drags by pointer as well as keys. The baseline pointer path is dead (0→0, while ArrowRight gives 0→15). Bind it at the root in `useDragScrub.ts` and put it on the producer track/thumb, so the purple thumb is gone. **OA-9**: the clock advances in chromium, so locate what does not run (the subject, WebKit, the ResizeObserver pageerror) and cure it there, with a 500 ms witness. **OA-10**: add an inline producer toggle with `aria-pressed` that hides the preview and persists with the scene state. Gates -3..-6 and -2 ×2, then push.
- **`KF.W13.k2`**: (1) Cure the 7 eslint errors at their roots: `App.skeleton.vue:1` component naming; `TimingFunctionPanel.vue:151,152,156` and `ControlsPaneWrapper.vue:62,328,366` prop mutations become emits/`defineModel`/owned state. Anything not curable in bounds is returned by `file:line`. (2) Re-verify G-KFW13T-1..-6 and vue-tsc/`test:demo` ×2. (3) Audit the unit commit roster against bounds. (4) Relay any producer gaps to BK. (5) Run the E13 sweep and confirm 0 UNREAD. (6) Update the LEDGER row. (7) Push kf.

## Unit receipts

### KF.W13.k

**SERVED MODEL**: `claude-opus-5-5[1m]` · 2026-09-22 · spec `KF-W13.md:307` (§0ao OA-6) + `:311` (§0ap R-a4-1 · R-a4-2).

**Crash recovery**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → only the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` letters, which are outside this unit's set. **No inherited paths.** No prior `.k` receipt existed, so this is a fresh seat.

**Acts, in order** (kf `084a3679` → `b56e9a41`, pushed; ⟨cmd⟩ `git rev-list --left-right --count origin/master...HEAD` → `0 0`):

1. **R-a4-2, kf `70a9b882`** (CubeScene.vue only). Deleted: `ppmycotaOpen`, `autoDismissTimer`, `clearAutoDismiss`, the `watch` that armed it, the `onBeforeUnmount` call, and the now-dead `watch` import. The one-shot edit asserted each span's count as exactly 1 before replacing it. ⟨cmd⟩ `grep -c 'ppmycotaOpen\|autoDismissTimer\|clearAutoDismiss\|watch' demo/scenes/cube/CubeScene.vue` → **1**, which is the `:91` prose comment ("the former scene-side watch"). The baseline read 10 code lines. ⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/cube-{scene,axis-reveal,roll-and-prestart}.test.ts` → **3 files · 38/38**.
2. **R-a4-1, kf `936b8c74`** (App.vue and MbabbMenu.vue, one meaning). Deleted App.vue's `:super-key="currentSuperKey"` on `<MbabbMenu>` (which collapses to `<MbabbMenu :on-scene-restore="runSceneSwitch" />`) and MbabbMenu's `superKey: string` prop together with its "kept only because…" comment. ⟨cmd⟩ `grep -c superKey demo/app/dock/MbabbMenu.vue` → **0** (baseline 2). App.vue's `superKey` count stays **3**, because all three are live (`currentScene.value.superKey` at `:213` and two prose comments). `currentSuperKey` keeps its consumers: EditorShell `:41`, the stored-controls read `:250`, `ACTIVE_SCENE_KEY` `:252`, and `:346`. ⟨cmd⟩ `npx vitest run --project demo test/demo/app` → **11/11**.
3. **OA-6 measured.** Bounded Playwright run: headless chromium (value.js `playwright` 1.60.0) at `:5173`, 1440×900 · 768×1024 · 390×844, routes `#/` and `#/cube` (scene active), top ChromeDock hovered to EXPANDED. The probe counted every rendered descendant box outside the `.glass-dock` capsule, plus dock buttons that intersect out-of-dock buttons. Script and readings: `evidence/W13T/KF-W13T-k-dock-probe.{mjs,txt}`. BEFORE screenshots are `evidence/W13T/KF-W13T-k-before-{1440x900,768x1024,390x844}-{home,cube}.png`. **BEFORE ×2 (identical)**, children outside the capsule: 1440 `#/` **0** · `#/cube` **0** · 768 `#/` **0** · `#/cube` **1** (the @mbabb trigger `[525,44,588,72]` vs capsule `[192,30,576,86]`) · 390 `#/` **1** (@mbabb `[237,41,297,68]` vs `[98,30,293,80]`, matching seat 0's baseline) · 390 `#/cube` **9** (Controls tab trigger + glyph/label/chevron, separator, panel toggle + glyph, @mbabb). The screenshot shows them CUT at the capsule edge ("Co…"), so they are unreachable.
4. **Root named (measured, not presumed).** Both 768 and 390 capsules measured **exactly 50vw** (`[192,576]` = 384 of 768; `[98,293]` ≈ 195 of 390). The producer's cap is ⟨cmd⟩ `grep -rho -- '--dock-max-inline-size:[^;]*' node_modules/@mkbabb/glass-ui/dist` → `min(80vw, 64rem)`, not 50vw. The 50vw comes from the demo's tether: `ChromeDock.vue` wrapped the dock in `fixed left-1/2 -translate-x-1/2`, and a fixed box at `left:50%` is shrink-to-fit inside `100vw − 50vw`. That cap was declared by no token. The bottom band (`TransportDock.vue:4-7`) already uses `fixed left-0 right-0 … justify-center`. The producer's `overflow` prop (`useDockShellProps.d.ts:59-86`) defaults to `"grow"`, which lets content overflow visibly past the cap. `"wrap"` is its containment recipe: intrinsic flex-wrap, one row when the content fits and N rows when it does not.
5. **Cure, kf `b56e9a41`** (ChromeDock.vue and the witness together, one meaning). The tether is now `fixed left-0 right-0 z-dock flex items-center justify-center pointer-events-none`. The band spans the viewport, stays pointer-transparent, and the dock centres inside it. `<GlassDock overflow="wrap">`. The rationale sits beside it in a template comment. There is **no `overflow:hidden`/clip**, no px sizing, and no glass-ui byte. The intermediate reading (tether fix alone, grow) gave 390 `#/cube` **2** outside (panel toggle and @mbabb past the 80vw cap), so both roots are needed.
6. **Witness `test/demo/app/chrome-dock-containment.test.ts`** (created, in `b56e9a41`). It mounts ChromeDock and asserts (1) that the top band has `fixed left-0 right-0 justify-center` and not `left-1/2`/`-translate-x-1/2`, and (2) that `.glass-dock` carries `dock-overflow-wrap` and that neither the band nor its host authors an `overflow-(hidden|clip)` class. **Born RED**: with the HEAD bytes of `ChromeDock.vue` swapped in (seat-local copy, then restored; ⟨cmd⟩ `git diff --stat` afterwards showed only the cure) the file read **2 failed (2)**; with the cure it reads **2 passed (2)**. The witness pins the two layout inputs. The geometry itself is the probe's.
7. **AFTER probe ×2 (identical)**, screenshots `evidence/W13T/KF-W13T-k-after-{…}-{home,cube}.png`. Children outside the capsule: **0 · 0 · 0 · 0 · 0 · 0** on both runs. Capsules: 1440 `[612,43,828,99]` / `[519,43,921,99]` · 768 `[287,30,481,86]` / `[201,30,567,86]` · 390 `[101,30,289,86]` / `[39,30,351,116]`. At 390 `#/cube` the row wraps to two lines (@mbabb on line 2, 86→116 px tall) inside the capsule.
8. **G-KFW13T-2.** ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **0 · 0**. ⟨cmd⟩ `npm run test:demo` → **60/60 files · 496/496 tests** on both runs (baseline 59 · 494; the +1 file and +2 tests are the witness). kf pushed: `084a3679..b56e9a41` on `origin/master`.

**Gates BEFORE → AFTER**:

| gate | BEFORE | AFTER |
|---|---|---|
| **G-KFW13T-1** (0 children outside the capsule, 3 viewports ×2, witness committed) | RED: 0 · 0 · 0 · 1 · 1 · 9 (×2) | **GREEN**: 0 · 0 · 0 · 0 · 0 · 0 (×2); witness `b56e9a41` |
| **G-KFW13T-2** (vue-tsc 0 · `test:demo` green · push) | 0 · 494/494 | **GREEN**: 0 ×2 · 496/496 ×2 · pushed |

**Commits (kf)**: `70a9b882` (R-a4-2) · `936b8c74` (R-a4-1) · `b56e9a41` (OA-6 cure + witness). Each is one meaning and was committed by pathspec. The locks held: OP-8 (no `ComponentExposed<>`/`Pick<>`, no type touched) · MUST-CARRY `v-model:open="open"` + `defineModel("open")` intact (⟨cmd⟩ `grep -c 'v-model:open="open"' demo/app/dock/MbabbMenu.vue` → 1) · CubeScene touched only in the §0ap spans · App.vue touched only at the `<MbabbMenu>` consumer end · no `overflow:hidden`.

**Residuals (named, not spent)**:

- **R-k-1 — the 390 band collision with the header ribbon (not a containment defect).** At <lg the expanded top dock and EditorShell's header ribbon (Share · Keyboard shortcuts · theme, measured `[243..367]×[23..59]` at 390) share one y-band. Dock buttons intersecting ribbon buttons went from 2 (`#/`) / 4 (`#/cube`) to **1 / 3**. The expanded capsule is 30→86/116 px and paints over the ribbon while expanded (hover/tap-pinned). It clears at rest because the collapsed pill is 56 px. 1440/768 read 0. No layout inside this unit's bounds can seat a centred dock of ≥ ~190 px beside a ribbon whose left edge is 48 px right of centre. The cure is either (a) the top band dropping below the ribbon at <lg, which is a `--dock-top-anchor`/`--dock-top-band-reserve` MAGNITUDE and therefore KF.W9 SS-13's, or (b) re-seating the ribbon, which is `EditorShell.vue` and outside bounds. **ESCALATED as a design/magnitude ruling.**
- **R-k-2 — producer row for the BK relay (to be sailed by `.k2`; glass-ui READ-ONLY).** The producer's wrap recipe hides separators unconditionally: `overflow.css` `.glass-dock.dock-overflow-wrap .dock-separator { display: none; }`. The T.C1 compass separators therefore no longer paint even when the row fits on one line (compare `…-before-1440x900-cube.png` with `…-after-1440x900-cube.png`). The ask is that separators hide only when a wrap actually occurs, or that there be an exported seam for it. This is the §0ao law's "capsule defect → BK", and nothing was done demo-side to restore them.

**Evidence**: `evidence/W13T/KF-W13T-k-dock-probe.mjs` (the probe, re-runnable) · `…-dock-probe.txt` (the readings) · 12 PNGs (`before`/`after` × 3 viewports × `home`/`cube`, top 160 px band). The PNGs were force-added by exact path because `.gitignore:34 *.png` covers them; the owner screenshots in this directory set that precedent. **Escalations**: R-k-1 (design/magnitude ruling, above). **Relay owed by `.k2`**: R-k-2 (BK).

### KF.W13.e

**SERVED MODEL**: `claude-opus-5-5[1m]` · 2026-09-22 · spec `KF-W13.md:309` (§0ao.1 OA-7..OA-10), COHESION §0ao.1.

**Crash recovery**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → only the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` letters, which are outside this unit's set. **No inherited paths.** No prior `.e` receipt existed, so this is a fresh seat at kf `b56e9a41`.

**Probe**: `evidence/W13T/KF-W13T-e-probe.mjs` is re-runnable (`node … <tag> [shotDir] [chromium|webkit] [light|dark]`, headless, value.js playwright 1.60.0, kf dev `:5173`). It checks four things. G-3: open the `#/square` ChannelOptions easing Select and count the `[role=option]` rows that carry an `svg path` with `d^="M "` and a non-zero box. G-4: at `#/easing`, run a thumb drag, a track click at 30 % and ArrowRight, reading `aria-valuenow` and the thumb/track computed backgrounds. G-5: press Play, wait 500 ms, and read the clock, the first 6 specimen `.tile-ball` transforms, the visualizer ball x and the `pageerror`s. G-6: toggle, reload, toggle again. BEFORE was measured at the HEAD bytes: this seat saved its own WIP diff, checked out HEAD for its three touched files, ran the probe, and re-applied the diff. ⟨cmd⟩ `git diff --stat` was identical before and after. Readings are in `KF-W13T-e-{before,before2,before-wk-dark,after,after2,after-wk-dark}.json`. Screenshots are `KF-W13T-e-{before,after,after-wk-dark}-{picker,ribbon,ribbon-after-scrub,playing-500ms,preview-hidden}.png`. Five bounded runs, no MCP session.

**OA-9 discriminated (the brief's four candidates), measured, not presumed**:

| candidate | reading | verdict |
|---|---|---|
| the clock | Play → 500 ms: scrub `0 → 532 · 0 → 524` ms (×2); visualizer ball x `93 → 205 · 93 → 203` | runs, so NOT the driver |
| the SUBJECT | the 29 specimen balls: `transform` = `none` on all sampled tiles before and after 500 ms | **DEAD**: the owner's "animations don't work" |
| WebKit / dark | `before-wk-dark`: the same `none` tiles, 0→0 scrub, same errors (`Argument 1 ('target') to ResizeObserver.observe must be an instance of Element`) | NOT a discriminator: engine- and theme-independent |
| the ResizeObserver pageerror | ⟨probe⟩ `EasingTarget.refs.gridEl.$el` → `nodeType 3 #text ''`, next sibling `DIV.toggle-group specimen-grid`; console: *"Unhandled error during execution of watcher callback / mounted hook at <EasingTarget>"* | **THE ROOT** |

**The root**: `EasingTarget.vue:383` `useResizeObserver(gridEl, …)` observed the producer `ToggleGroup`'s component ref. That ref's `$el` is the fragment's leading TEXT anchor, so `ResizeObserver.observe(Text)` threw in the mount flush. The throw ABORTED the rest of that post-flush queue, which had two consequences. (a) EasingTarget's painter never registered, so the balls never moved. (b) The sidebar Sliders' reka `SliderThumbImpl` `onMounted` push never ran. ⟨probe⟩ the SliderRoot context `thumbElements.length` read **0** for both `#/easing` sliders, against 1 for every slider on `#/cube` · `#/square` · `#/spring`. reka's `SliderHorizontal.getValueFromPointerEvent` then read `thumbElements[0].clientWidth` of `undefined` on every press (⟨probe⟩ 14 × *"Cannot read properties of undefined (reading 'clientWidth')"* per drag+click). `SliderImpl` emitted `slideStart/Move/End`, but `SliderHorizontal` emitted only `slideEnd`. **OA-8's pointer limb and OA-9 are ONE defect.**

**Acts, in order** (kf `b56e9a41` → `cbe9b904`, pushed; ⟨cmd⟩ `git rev-list --left-right --count origin/master...HEAD` → `0 0`):

1. **OA-9, kf `b4c5dfb1`** (EasingTarget.vue and the witness together, one meaning). The observer now watches `railStage`, the first tile's stage, which is the very element `measureRailWidth` reads. It is set in `wirePainter`. The `gridEl` template ref, its `ComponentPublicInstance` import and the false "`unrefElement` reads its `$el`" comment are deleted. The witness `test/demo/scenes/easing-playback-runs.test.ts` mounts the REAL `EasingTarget` over the REAL `useEasingDemo` (under the App's `TooltipProvider`), behind a browser-strict `ResizeObserver` that throws on a non-Element and an on-screen IntersectionObserver double. It uses fake rAF/performance timers and plays **500 ms**. It asserts no mount error, every observed target an `Element`, `liveProgress() > 0`, and ≥ 1 ball `translateX > 0`. The case declares a 30 s budget for the first transform-bound SFC import under a loaded runner (the D59 precedent; load average ~70 was measured at the time). It uses no cast. **Born RED**: with the HEAD `EasingTarget.vue` swapped in (seat-local copy, then restored) the file read **1 failed** (`+ TypeError {…}` in the errors array). With the cure it reads **1 passed**.
2. **OA-7, kf `2141883d`** (`useTimingFunctionEditor.ts` · `ChannelOptions.vue` · `channel-options-render-edge.test.ts`). `curveGlyphPath(key) = generateCurveSVGPath(resolveTimingFunction(key).easing, 64)` is the SAME easing that `onCurvePicked(key)` installs. A name resolves via the registry. The `cubic-bezier`/`steps` draft rows resolve via the store's live parameters. A row key is never a literal, so the store is never reconciled. There are 64 samples so a step riser is sub-pixel. ChannelOptions renders `<svg class="curve-glyph" viewBox="0 0 1 1" overflow="visible"><path :d>` leading each `SelectItem`, 1.5em × 1em in the row's ink, from a `computed` Map keyed by row name. `easingGroups.ts` is untouched because the catalogue is not the glyph's source. Witness (5): every mounted picker lists all 29 names in order, each with an `M …` glyph, and `ease-out-back` / `step-end` equal the sampled easing. **Born RED** at the HEAD ChannelOptions bytes (`expected 0 to be greater than 0`, no picker carries a glyph).
3. **OA-8 styling, kf `a71efd0d`** (`PlaybackRibbon.vue` and its contract test). The scoped `.scrub-rail { --slider-thumb-bg / --slider-track-bg / --slider-range-bg }` block and its hover twin are deleted, which is the whole `<style>`. The `spectrum` variant stays, as D-2's ruled visible playhead (G-KFW13-5's D-2 case unchanged). It now paints its own ringed thumb on its own track. Measured: thumb bg `oklch(0.56 0.17 295)` → `rgba(0,0,0,0)` (the producer's transparent + `--background` ring), track `color(srgb … / 0.22)` → `rgb(237,230,222)` light / `rgb(47,40,35)` dark (`--secondary`). **`useDragScrub.ts`: INTENT recorded at the true bytes.** The ribbon's pointer path is `useDragCapture` (the wrapper's capture-phase seam) plus reka's own geometry, not `useDragScrub` (⟨cmd⟩ `grep -rn useDragScrub demo | grep -v composables/useDragScrub.ts` → SquareScene · SequenceScrubber · useSpringDemo only). The root was step 1's aborted flush, so no listener was added and `useDragScrub.ts` is untouched. Witness: the SFC authors no `--slider-*:` declaration and no `<style>`. **Born RED** at HEAD.
4. **OA-10, kf `cbe9b904`** (`PlaybackRibbon.vue` · `EasingScene.vue` · the contract test). The new prop is `preview?: "shown" | "hidden"` with `update:preview`. It is a string pair because Vue casts an absent Boolean prop to `false`, which erased the "unbound" state. The seat's first cut used `previewHidden?: boolean`, and the witness caught the cast: the toggle appeared on unbound ribbons. Where the prop is bound, the producer `Button` (sm · quiet · icon-only, `aria-label="Hide ball preview"`, `aria-pressed` = hidden, Eye/EyeOff) sits inline beside the `AnimationVisualizer`. Hidden is `v-if`-ABSENT. Unbound mounts (cube · amiga · channel) render no toggle. `EasingScene` binds it from a scene-held `ref`. Witness: unbound = no toggle and the preview present; bound = `aria-pressed="false"`, a press emits `"hidden"`, hidden removes the twin, and shown restores it. **Born RED** at HEAD (2 of 3 new cases). **Persistence NOT landed → ESC-e-1** (below).
5. **Gates, re-read at the settled bytes `cbe9b904`** (⟨cmd⟩ lines below), then kf pushed `b56e9a41..cbe9b904`.

**Gates BEFORE → AFTER** (live, chromium light ×2 at 1440×900, plus one webkit-dark run each side):

| gate | BEFORE (HEAD `b56e9a41`) | AFTER (`cbe9b904`) |
|---|---|---|
| **G-KFW13T-3** picker rows with a rendered `<svg><path` glyph = rows, ×2 | **0 / 29 · 0 / 29** (wk-dark 0/29) | **GREEN: 29 / 29 · 29 / 29** (wk-dark 29/29); glyph 25×16 px in a 44 px row; screenshot `…-after-picker.png` |
| **G-KFW13T-4** slider `aria-valuenow` changes under pointer drag AND ArrowRight; styling | drag **0→0** · click **0→0** · ArrowRight 0→30 (×2; wk-dark same); raw violet thumb over a 22 % mix groove; 14 pageerrors | **GREEN: drag 0→795 · click 795→450 · ArrowRight 450→480** (×2; wk-dark 0→795 · 795→435 · 435→465); 0 pageerrors; producer thumb/track; screenshots `…-{before,after}-ribbon{,-after-scrub}.png` |
| **G-KFW13T-5** playback witness green ×2 (plays 500 ms, progress > 0) | witness absent; live: clock 0→532 but specimen tiles **not moved**, 1 pageerror | **GREEN**: `easing-playback-runs.test.ts` in `test:demo` ×2; live clock 0→(380..527) ms, tiles moved (`translateX` 6–29 px), visualizer moved, **0** pageerrors (×2; wk-dark same) |
| **G-KFW13T-6** toggle hides/shows the preview (absent from the a11y tree), persisted across reload | absent (0 toggles) | **RED on the persistence limb only**: toggle 1, `aria-pressed` false→true, preview visible→**absent** (0 `.visualizer-stage` nodes), restored on the next press (×2; wk-dark same); **after reload `aria-pressed="false"`, preview visible**: the state is scene-held, not persisted (ESC-e-1) |
| **G-KFW13T-2** vue-tsc 0 · `test:demo` green · push | 0 · 496/496 (the `.k` close) | **GREEN**: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` → **0 · 0**; ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.test.json … \| grep -c` → **0** (leg 2 holds); ⟨cmd⟩ `npm run test:demo` → **61/61 files · 501/501 tests** ×2 (+1 file, +5 tests: the OA-9 witness, OA-7 (5), OA-10 ×2, OA-8 ×1); kf pushed `b56e9a41..cbe9b904` |

Load-bound flakes were observed and are recorded, not masked. The machine's load average was ~70. Of six seat-level `npm run test:demo` runs, the first ran beside a concurrent vue-tsc and read `500/501`: this unit's own witness FAILED. Its failure body was not captured, and the case passes alone in 1.3 s. The witness then gained its declared 30 s budget. The second run read `500/501` with a 5 s timeout in `test/demo/instrument/typing-dots-engine-seam.test.ts` (1). That is not this unit's file, and it was green on every later run. Runs 3–6 read 501/501; runs 5–6 are the two gate readings at the settled bytes. ⟨cmd⟩ `npx eslint` on the five touched product files → clean.

**Commits (kf)**: `b4c5dfb1` (OA-9) · `2141883d` (OA-7) · `a71efd0d` (OA-8 styling) · `cbe9b904` (OA-10). Each is one meaning, committed by exact pathspec. OA-8 and OA-10 share `PlaybackRibbon.vue` and its test, so the OA-8 commit was cut from a seat-built intermediate (HEAD + the style deletion only). The final bytes were restored for OA-10, and ⟨cmd⟩ `git diff --stat` showed only the OA-10 hunks. Locks held: KF-AV-28/PR-CAUTION (the cure is the root flush plus the producer paint, never a bare swap; the Slider was already the primitive) · no second pointer listener, `useDragScrub.ts` untouched (INTENT above) · `easingGroups.ts` untouched (not the glyph source) · no local slider/toggle control (producer `Slider` + producer `Button`) · no `try/catch`, skip, cast or allowlist.

**Escalation**:

- **ESC-e-1 — OA-10's persistence limb (G-KFW13T-6 RED on "persisted across reload").** The spec persists the toggle *"with the scene's view state"*, and COHESION §0ao.1 puts it *"where the scene's other view state lives"*. At the true bytes that home is the scene's bucket in `demo/state/controlOptionsStore.ts` (`StoredAnimationGroupControlOptions`: `isControlsPanelOpen` · `isTimelineExpanded` · cube's `ppMode?` · `matrixOptions?`), read via `getStoredAnimationGroupControlOptions(EASING_SCENE_ID)`. The bucket is typed, so storing the field needs one optional member on that type, and `demo/state/**` is outside `.e`'s writable set. A separate `useStorage` key inside `scenes/easing/` was refused as a substitute: it would sit outside the bucket's 7-day expiry, `resetAllStores` and share-hash semantics. **The ask**: grant `demo/state/controlOptionsStore.ts` for one line, `easingPreview?: "shown" | "hidden";` on `StoredAnimationGroupControlOptions` (the `ppMode?` precedent). `EasingScene.vue` then replaces its `ref` with `getStoredAnimationGroupControlOptions(EASING_SCENE_ID)`'s field (in `.e`'s bounds), and a reload witness is added to G-KFW13T-6. Everything else in OA-10 is landed.

**Residuals (named, not spent)**:

- **R-e-1 — producer row for the BK relay (to be sailed by `.k2`; glass-ui READ-ONLY).** The `spectrum` variant was built for a gradient track: its thumb is `background: var(--slider-thumb-bg, transparent)` with a `--background`-coloured ring. On the plain `--secondary` scrub track it reads faintly, and in dark it is a dark ring on a dark groove (`…-after-wk-dark-ribbon.png`). The producer ships no scrub/playhead variant with a visible filled thumb. The `standard` variant hides the thumb (`width:0; opacity:0`) and shows a liquid range fill. The seat measured it live as a seat-local experiment, reverted and not committed, because D-2's ruled `spectrum` reading governs. The ask: a playhead-grade thumb on a neutral track (a variant, or a documented default for `--slider-thumb-bg` on `spectrum` absent a gradient). No demo-side paint was restored.
- **R-e-2 — measured, outside the OA docket's letter.** A PAUSED keyboard/pointer scrub on `#/easing` moves the thumb and the specimen dots (the `progress` watch repaints them) but not the `AnimationVisualizer` twin, which paints from `previewAnim.t` on its own rAF only while playing (a seat-local screenshot at 70 % progress, not banked, showed the ball at 0). The twin catches up on Play. The root sits at `AnimationVisualizer.vue`'s paused repaint path (writable here, not spent: not an OA row). It is homed to the successor register with this receipt.

**Evidence** (value.js `docs/tranches/X/keyframes/evidence/W13T/`): `KF-W13T-e-probe.mjs` · six readings JSON (`before` · `before2` · `before-wk-dark` · `after` · `after2` · `after-wk-dark`) · 14 PNGs (`before` × 4, `after` × 5, `after-wk-dark` × 5), force-added by exact path under `.gitignore:34 *.png` (the `.k` and owner-screenshot precedent).

### KF.W13.k2

**SERVED MODEL**: `claude-opus-5-5[1m]` · 2026-09-22 · spec `KF-W13.md:307` (`.k2`, verify-only close) + `:311` (§0ap: the 7 pre-existing eslint errors granted, cure-or-return by `file:line`; the §Verification eslint line read WITHOUT `demo/styles`). COHESION §0j → §0aq read for rulings consumed; §0aq carries no KF.W13T row, and ESC-e-1 has **no ruling at this clock** (⟨cmd⟩ `grep -n 'ESC-e-1' COHESION.md` → none).

**Crash recovery**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → only the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` letters (outside this unit's set); ⟨cmd⟩ `git -C value.js status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` (neither mine, neither touched). **No inherited paths**; no prior `.k2` receipt, so a fresh seat at kf `cbe9b904` = origin (`0 0`).

**Acts, in order** (kf `cbe9b904` → `6606ca7e`, pushed; ⟨cmd⟩ `git rev-list --left-right --count origin/master...HEAD` → `0 0`):

1. **eslint BEFORE** ⟨cmd⟩ `npx eslint demo/app demo/components/instrument/transport demo/components/playback` → **7 errors** — the baseline's seven, identical positions (`App.skeleton.vue:1:1` · `TimingFunctionPanel.vue:151:9 · :152:9 · :156:5` · `ControlsPaneWrapper.vue:62:58 · :328:5 · :366:9`).
2. **`App.skeleton.vue:1:1` (`vue/multi-word-component-names`) — CURED, kf `6606ca7e`.** The rule infers the name `App.skeleton` from the filename only when the SFC declares none (`eslint-plugin-vue` 10.11.0 `dist/rules/multi-word-component-names.js:67-74`: a `defineOptions({ name })` literal is validated instead). The component's own docblock (`:3`) and its sole mount (`App.vue:99` `<SceneSkeleton />`, import `:160`) already call it `SceneSkeleton`; the file now declares it: `defineOptions({ name: "SceneSkeleton" });` with a three-line rationale comment. No rename (the importer `App.vue` is outside bounds and needs no change), no `eslint-disable`, no config ignore.
3. **The six `vue/no-mutating-props` rows — RETURNED by `file:line` (ESC-k2-1).** Each is a child writing through a prop into store/registry state that its PARENT owns and binds one-way; every idiomatic root cure (an emit the parent handles, or a `defineModel` whose `update:*` the parent binds with `v-model`) needs a byte in the parent, and no parent is in this unit's bounds:
   - `TimingFunctionPanel.vue:151:9 · :152:9 · :156:5` — `onAuthored` writes `storedAnimationOptions.stepOptions.{steps,jumpTerm}` and `.cubicBezierOptions.controlPoints`, then emits `updateTimingFunction`. The object is `getStoredAnimationOptions(props.animation)` held by the parent `ChannelOptions.vue:666`, bound one-way at `:500-510`. **Root cure**: the panel emits the authored value (`EasingPickerValue`), and the parent's ONE persist seam (`useTimingFunctionEditor.ts`'s `updateTimingFunctionFromName` path) writes the store — needs `ChannelOptions.vue` `:500-510` + `channel-controls/composables/useTimingFunctionEditor.ts`.
   - `ControlsPaneWrapper.vue:62:58` — the template `:ref` callback writes `animControlRefs[host.name] = el` into the parent's `reactive` registry (`AnimationControlsGroup.vue:213`, bound `:44`). **Root cure**: a `registerControls(name, el)` emit (or the parent's own template ref) handled in `AnimationControlsGroup.vue`.
   - `ControlsPaneWrapper.vue:328:5 · :366:9` — the mobile mount-reset and the Drawer snap setter write `storedControls.isControlsPanelOpen`; the object is `getStoredAnimationGroupControlOptions(superKey)` at `AnimationControlsGroup.vue:198`, bound one-way `:40`, and `superKey` is a prop of the parent, not the child (so the child cannot own the store read either). **Root cure**: `defineModel<boolean>("panelOpen")` here, bound `v-model:panel-open="storedControls.isControlsPanelOpen"` at `AnimationControlsGroup.vue:35-52`.
   - **Not substituted**: a `defineModel` over the whole object with deep mutation (`model.value.x = …`) would silence the rule while mutating the parent's object exactly as before, since the parent binds no `update:*`; an assignment-form `defineModel` would silently stop persisting. Both are lint evasions or regressions, so neither landed. **Asked**: a §3a carve grant of `ChannelOptions.vue` `:500-510` + `useTimingFunctionEditor.ts` (TFP rows) and `AnimationControlsGroup.vue` `:35-52` (CPW rows) — the latter is KF.W11's file (KF-W13 §Excluded), so the grant is a ruling, not a seat's choice.
4. **Re-verification ×2 at the settled bytes** (kf working tree = `6606ca7e`; live probes are the banked `evidence/W13T/KF-W13T-{k-dock,e}-probe.mjs`, re-run unmodified, headless chromium light 1440×900 for `-e`, kf dev `:5173`; readings seat-local, not re-banked).

| gate | `.k`/`.e` close | `.k2` run 1 | `.k2` run 2 | reading |
|---|---|---|---|---|
| **eslint** (§Verification line, no `demo/styles`) | 7 (baseline) | ⟨cmd⟩ `npx eslint demo/app demo/components/instrument/transport demo/components/playback` → **6** | **6** | **RED 7 → 6**: 1 cured, 6 returned (ESC-k2-1) |
| **G-KFW13T-1** children outside the capsule, 3 viewports × 2 routes | 0 ×6 (×2) | ⟨cmd⟩ `node KF-W13T-k-dock-probe.mjs k2run1` → `out= 0` ×6 | `out= 0` ×6 | **GREEN**; the R-k-1 collisions read the same (390 `#/` 1 · `#/cube` 3) |
| **G-KFW13T-2** vue-tsc 0 · `test:demo` · push | 0 · 501/501 | ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` → **0**; ⟨cmd⟩ `npm run test:demo` → **61/61 · 501/501**, exit 0 | **0** · **61/61 · 501/501**, exit 0 | **GREEN**; kf pushed `cbe9b904..6606ca7e` |
| **G-KFW13T-3** glyph rows = rows | 29/29 | ⟨cmd⟩ `node KF-W13T-e-probe.mjs k2run1` → `rows 29 · glyphRows 29` (25×16 in 44 px) | 29 · 29 | **GREEN** |
| **G-KFW13T-4** `aria-valuenow` under drag AND ArrowRight | 0→795 · 795→450 · 450→480 | drag `0→795` · click `795→450` · ArrowRight `450→480`; thumb bg `rgba(0,0,0,0)`; 0 pageerrors | identical | **GREEN** |
| **G-KFW13T-5** playback 500 ms, progress > 0 | witness green | clock `0→381.8` ms · tiles moved · visualizer `93→163` · 0 pageerrors; `easing-playback-runs.test.ts` inside the 501/501 | clockAdvanced · tilesMoved · vizMoved all true · 0 pageerrors | **GREEN** |
| **G-KFW13T-6** toggle hides/shows; persisted across reload | RED (persistence) | toggle 1 · `aria-pressed` false→true · visualizer a11y nodes 0 · **after reload `pressed "false"`, visible** | identical | **RED on the persistence limb only — ESC-e-1 carried, unruled** |
| **E13** | 0 UNREAD | act 7 | — | **GREEN** (0 UNREAD) |

5. **Roster audit (the wave's kf commits against their §Bounds)** — ⟨cmd⟩ `git show --stat --format= <sha>` per commit:
   - `.k`: `70a9b882` CubeScene.vue only (§0ap R-a4-2 grant) · `936b8c74` App.vue + MbabbMenu.vue (R-a4-1) · `b56e9a41` ChromeDock.vue + `test/demo/app/chrome-dock-containment.test.ts` (OA-6 + witness) — all inside `.k`'s set.
   - `.e`: `b4c5dfb1` `scenes/easing/EasingTarget.vue` + `test/demo/scenes/easing-playback-runs.test.ts` · `2141883d` `channel-controls/ChannelOptions.vue` + `channel-controls/composables/useTimingFunctionEditor.ts` + `test/demo/instrument/channel-options-render-edge.test.ts` · `a71efd0d` `playback/PlaybackRibbon.vue` + `playback-ribbon-contract.test.ts` · `cbe9b904` `PlaybackRibbon.vue` + `scenes/easing/EasingScene.vue` + the contract test — all inside `.e`'s set (`scenes/easing/**` · `channel-controls/**` · `playback/**` · `test/demo/**`).
   - `.k2`: `6606ca7e` `demo/app/App.skeleton.vue` only.
   - **Families unsplit**: every commit is one meaning with its witness in the same sha (OA-6, OA-9, OA-7, OA-8, OA-10 each ONE sha; R-a4-1 one sha across its two files). **Masking 0**: ⟨cmd⟩ `git diff 084a3679..cbe9b904 -- test demo | grep -c 'test.skip\|it.skip\|\.only(\|eslint-disable\|@ts-ignore\|as any\|overflow-hidden\|overflow: hidden'` → **0**; `6606ca7e` adds none (5 added lines: a comment and `defineOptions`).
   - The same masking grep over `084a3679..6606ca7e` → **0 · 0**.
6. **BK relay (producer gaps; glass-ui READ-ONLY, no producer byte written)** — the two producer rows this wave measured, relayed as INBOX row **O-50** (this section is the letter body; carriage to `glass-ui/docs/tranches/BK/coordination/` rides the standing SS-6 boundary batch, the O-47/O-48 precedent, because neither the glass tree nor `evidence/W13T/**` is in this unit's set):
   - **KFW13T-BK-1 (R-k-2, from `.k`)** — `GlassDock overflow="wrap"`: `overflow.css` `.glass-dock.dock-overflow-wrap .dock-separator { display: none; }` hides separators unconditionally, so a consumer on the wrap recipe loses its separators even when the row fits on one line (`evidence/W13T/KF-W13T-k-{before,after}-1440x900-cube.png`). **Ask**: hide separators only when a wrap actually occurs (a wrapped-state class/attribute the dock sets), or export a seam for the consumer to keep them.
   - **KFW13T-BK-2 (R-e-1, from `.e`)** — `Slider` has no scrub/playhead variant with a visible filled thumb: `spectrum` paints `background: var(--slider-thumb-bg, transparent)` inside a `--background` ring (built for a gradient track), which reads faintly on a plain `--secondary` groove and nearly vanishes in dark (`evidence/W13T/KF-W13T-e-after-wk-dark-ribbon.png`); `standard` hides the thumb. **Ask**: a playhead/scrub variant (or a documented thumb-fill token default) that stays visible on the plain track in both schemes. The demo authors no `--slider-*` override (OA-8's cure deleted them) and will not.
   - **SS-6 accretion (COHESION §4a)**: NOT written — COHESION is outside this unit's set; the two ids above are the accretion rows owed there, named for the orchestrator.
7. **E13** — four paths swept read-only; BK still the newest glass tranche dir (⟨cmd⟩ `ls -d glass-ui/docs/tranches/B*` → `BI BJ BK`). ⟨cmd⟩ `find <path> -maxdepth 1 -type f -newermt "2026-09-22 00:00"` → value.js `V/`: `EVIDENCE.md` · `VISUAL-CONSTITUTION.md` · `OPTICAL-BENCH-COMPOSITIONS.md` (Track A documents, not letters) · `V/coordination`: `INBOX.md` · BK/coordination: `glass-outbound-2026-09-22-consumers-10.0.0.md` · `fourier-to-glass-2026-09-17-nwo1-bh-relay.md` · `value-to-glassui-2026-09-DD-fw4-relay.md` (all already rowed/noted) · kf `V/coordination`: empty · atlas: no `coordination` dir exists (⟨cmd⟩ `find atlas -maxdepth 4 -type d -name coordination` → none). **0 new inbound rows**; ⟨cmd⟩ `grep "^| I-" INBOX.md | grep -c "| UNREAD"` → **0**. A dated sweep line and O-50 are added to INBOX.md.
8. **LEDGER** — row `KF.W13T` status cell updated in place (stays OPEN: two escalations carried) and one event line appended.

**Commits**: kf `6606ca7e` (the skeleton name). value.js: this receipt; INBOX (sweep + O-50); LEDGER (row cell + event) — each by exact pathspec.

**Escalations (the wave cannot close GREEN on the seat's bounds)**:
- **ESC-k2-1** — the six `vue/no-mutating-props` rows (act 3), returned by `file:line`, with the root cure and the grant it needs named per row.
- **ESC-e-1 (carried from `.e`, still unruled)** — G-KFW13T-6's persistence limb: the home is `demo/state/controlOptionsStore.ts` (the scene's control-options bucket), outside every KF.W13T set.

**Residuals (carried, not spent)**: R-k-1 (the 390 band collision with the header ribbon while the top dock is expanded — design/magnitude ruling; re-read 1 · 3 ×2) · R-e-2 (the paused-scrub `AnimationVisualizer` twin does not repaint) · KFW13T-BK-1/-2 (relayed, awaiting the producer).

## Close

**SERVED MODEL**: `claude-opus-5-5[1m]` · 2026-09-22 · the wave's CLOSE SEAT (VERIFY-ONLY; 0 kf / glass / product bytes). Spec `KF-W13.md:307` · `:309` · `:311` read whole; COHESION `grep -n 'ESC-e-1\|ESC-k2-1'` → **none** (both escalations still unruled at this clock).

**Crash recovery**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → only the two untracked `VALUEJS-INBOUND-2026-07-{24,27}-*.md` letters; ⟨cmd⟩ `git -C value.js status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` (neither in this seat's set, neither touched). **No inherited paths.** kf `HEAD` = `6606ca7e`; ⟨cmd⟩ `git fetch; git rev-list --left-right --count origin/master...HEAD` → `0 0`.

### Gate table (BEFORE = the seat-0 baseline at kf `084a3679`; AFTER = this seat, ×2 at kf `6606ca7e`)

| gate | spec GREEN | BEFORE | AFTER run 1 | AFTER run 2 | reading |
|---|---|---|---|---|---|
| **G-KFW13T-1** | 0 children outside the capsule, 3 viewports ×2 | 390 = **1** out | ⟨cmd⟩ `node KF-W13T-k-dock-probe.mjs closeR1` → `out= 0` at 1440/768/390 × `#/`,`#/cube` (6/6) | `out= 0` 6/6 | **GREEN**; witness `chrome-dock-containment.test.ts` inside 501/501. Collisions (R-k-1) 390 `#/` **1** · `#/cube` **3**, same both runs |
| **G-KFW13T-2** | vue-tsc 0 · `test:demo` green · push | 0 · 494/494 | ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json` → 0 `error TS`, exit 0; ⟨cmd⟩ `npm run test:demo` → **61/61 · 501/501**, exit 0 | 0 · **61/61 · 501/501**, exit 0 | **GREEN**; kf already `0 0` with origin (act 7) |
| **G-KFW13T-3** | glyph rows = rows ×2 | 0/29 | ⟨cmd⟩ `node KF-W13T-e-probe.mjs closeR1` → `rows 29 · glyphRows 29` (glyph 25×16 in a 44 px row) | 29 · 29 | **GREEN** |
| **G-KFW13T-4** | `aria-valuenow` moves under pointer drag AND ArrowRight | drag 0→0 · click 0→0 · Arrow 0→15 | drag `0→795` · click `795→450` · ArrowRight `450→480`; thumb bg `rgba(0, 0, 0, 0)` (producer paint); 0 pageerrors | identical | **GREEN** |
| **G-KFW13T-5** | playback witness plays 500 ms, progress > 0, ×2 | witness absent | `easing-playback-runs.test.ts` green in 501/501; live clock `0→519.4` ms, tiles moved, visualizer `93→188`, 0 pageerrors | witness green; clock `0→363.0`, tiles + viz moved, 0 pageerrors | **GREEN** |
| **G-KFW13T-6** | toggle hides/shows (absent from a11y tree); **persisted across reload** | absent | toggle 1 (`Hide ball preview`), `aria-pressed` false→true, visible→absent, a11y visualizer nodes 0, restored on 2nd press; **after reload `pressed "false"`, visible** | identical | **RED on persistence only** → ESC-e-1 |
| **eslint** (§Verification line, no `demo/styles` per §0ap) | 0, or each returned by `file:line` | 7 | ⟨cmd⟩ `npx eslint demo/app demo/components/instrument/transport demo/components/playback` → **6 errors** (`TimingFunctionPanel.vue:151:9 · 152:9 · 156:5` · `ControlsPaneWrapper.vue:62:58 · 328:5 · 366:9`, all `vue/no-mutating-props`) | **6**, same positions | **RETURNED** by `file:line` (ESC-k2-1): the §0ap grant permits cure-or-return, but the six are not cured |
| **E13** | 0 UNREAD in scope | 0 | four paths re-swept (below) | — | **GREEN** |

The probes are the banked `evidence/W13T/KF-W13T-{k-dock,e}-probe.mjs`, re-run unmodified (headless chromium, kf dev `:5173`). Readings are seat-local and not re-banked.

### Commit roster (⟨cmd⟩ `git show --stat --format= <sha>` per sha, against each unit's writable set)

| unit | sha | files | in bounds |
|---|---|---|---|
| `.k` | kf `70a9b882` (R-a4-2) | `demo/scenes/cube/CubeScene.vue` (+1 −20) | yes (§0ap span grant) |
| `.k` | kf `936b8c74` (R-a4-1) | `demo/app/App.vue` · `demo/app/dock/MbabbMenu.vue` | yes |
| `.k` | kf `b56e9a41` (OA-6 + witness) | `demo/app/dock/ChromeDock.vue` · `test/demo/app/chrome-dock-containment.test.ts` | yes |
| `.e` | kf `b4c5dfb1` (OA-9 + witness) | `demo/scenes/easing/EasingTarget.vue` · `test/demo/scenes/easing-playback-runs.test.ts` | yes |
| `.e` | kf `2141883d` (OA-7 + witness) | `channel-controls/ChannelOptions.vue` · `channel-controls/composables/useTimingFunctionEditor.ts` · `test/demo/instrument/channel-options-render-edge.test.ts` | yes |
| `.e` | kf `a71efd0d` (OA-8 + witness) | `demo/components/playback/PlaybackRibbon.vue` · `test/demo/instrument/playback-ribbon-contract.test.ts` | yes |
| `.e` | kf `cbe9b904` (OA-10 + witness) | `PlaybackRibbon.vue` · `demo/scenes/easing/EasingScene.vue` · `playback-ribbon-contract.test.ts` | yes |
| `.k2` | kf `6606ca7e` (eslint 1 of 7) | `demo/app/App.skeleton.vue` | yes |
| records | vjs `390db7b5` · `ab2ab9e7` · `c33bc786` · `e14cc2d0` · `f099e975` | this record · `evidence/W13T/**` · `INBOX.md` · `LEDGER.md` | yes |

⟨cmd⟩ `git log --oneline 084a3679..HEAD | wc -l` → **8** (kf). Each meaning is one sha with its witness in the same sha, so no family is split. Masking: ⟨cmd⟩ `git diff 084a3679..HEAD -- test demo | grep -c 'test.skip\|it.skip\|\.only(\|eslint-disable\|@ts-ignore\|as any\|overflow-hidden\|overflow: hidden'` → **0**. **Landed-wrong: 0.**

### E13

The newest glass tranche dir is still BK (⟨cmd⟩ `ls -d glass-ui/docs/tranches/B*` → `BI BJ BK`). ⟨cmd⟩ `find <path> -maxdepth 1 -type f -newermt "2026-09-22 00:00"` returned:
- value.js `V/`: `EVIDENCE.md` · `VISUAL-CONSTITUTION.md` · `OPTICAL-BENCH-COMPOSITIONS.md` (Track A documents, not letters)
- `V/coordination`: `INBOX.md`
- BK/coordination: the three letters that were already rowed at `.k2`
- kf `V/coordination`: empty
- atlas: no `coordination` dir

⟨cmd⟩ `grep "^| I-" INBOX.md | grep -c "| UNREAD"` → **0** (tail I-39). **0 UNREAD in scope.** The mail has not moved since `.k2`'s sweep line, so no new INBOX line is written.

### Escalations (unruled, so the wave cannot close GREEN)

- **ESC-e-1**: G-KFW13T-6's persistence limb. The toggle's state is lost on reload. Its home is `demo/state/controlOptionsStore.ts`, the scene's view-state bucket, which sits outside every KF.W13T writable set. **Asked**: a one-field grant.
- **ESC-k2-1**: the six `vue/no-mutating-props` rows, returned by `file:line`. Their root cures need parent bytes: `ChannelOptions.vue:500-510` + `useTimingFunctionEditor.ts`, and `AnimationControlsGroup.vue:35-52` (KF.W11's file). **Asked**: a §3a carve grant (a ruling).

### Residuals (named owners)

- **R-k-1**: at 390×844 the expanded top dock collides with the header ribbon (1 collision at `#/`, 3 at `#/cube`). **Owner**: the orchestrator. It needs a design/magnitude ruling on either the `--dock-top-*` band (KF.W9 SS-13) or `EditorShell.vue`'s ribbon.
- **R-e-2**: the paused-scrub `AnimationVisualizer` twin does not repaint. **Owner**: the next KF.W13T repair / KF-side wave.
- **KFW13T-BK-1 / -2** (O-50: dock-wrap separators · a slider scrub thumb). **Owner**: glass-ui BK. The SS-6 accretion rows are owed at COHESION §4a by the orchestrator.

### State

The four-verb line does **not** move to IMPLEMENTED. G-KFW13T-6 is RED on persistence, and 6 of the 7 granted eslint rows are returned. **PARTIAL.** What remains: ESC-e-1 and ESC-k2-1, each awaiting a grant; once granted, a repair unit followed by a re-close. VERIFIED: NO (the spec designates no self-stamp).

## Check 1

**SERVED MODEL**: `claude-opus-5-5[1m]` · 2026-09-22 · fresh adversarial L-20 pass 1 over the PARTIAL close (`7dbd758b`); VERIFY-ONLY (0 kf / glass / product bytes). Spec `KF-W13.md` read whole (addenda `:307` · `:309` · `:311`); COHESION §0ao/§0ao.1/§0ap read at `:2531-2623`. Crash recovery: ⟨cmd⟩ `git status --porcelain` → kf: the two untracked `VALUEJS-INBOUND-*` letters only; value.js: ` M CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` + the same two letters — none in this seat's set, none touched. kf `HEAD` `6606ca7e`, ⟨cmd⟩ `git fetch; git rev-list --left-right --count origin/master...HEAD` → `0 0`.

### Axes

| axis | reading (⟨cmd⟩ → output) | verdict |
|---|---|---|
| (1) claimed GREENs reproduce | G-KFW13T-1 ⟨cmd⟩ `node KF-W13T-k-dock-probe.mjs chk{1,2}` → `out= 0` 6/6 ×2 (coll 390 `#/` 1 · `#/cube` 3, = R-k-1). G-2 ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json \| grep -c 'error TS'` → **0 · 0**; ⟨cmd⟩ `npm run test:demo` → **61/61 · 501/501** on 4 of 7 runs, **1 failed / 500** on 3 of 7 (see C1-2). G-3/-4/-5/-6 ⟨cmd⟩ `node KF-W13T-e-probe.mjs chk{1,2}` → rows 29 · glyphRows 29; drag `0→795` · click `795→450` · ArrowRight `450→480`, thumb bg `rgba(0, 0, 0, 0)`, 0 pageerrors; clock `0→388.9` / `0→553.6`, tiles + viz moved, 0 pageerrors; toggle 1, pressed false→true, visible→absent, a11y visualizer nodes 0, **afterReload pressed "false", visible** (both runs). eslint → **6** ×2 (same six positions). E13 ⟨cmd⟩ `grep "^\| I-" INBOX.md \| grep -c "\| UNREAD"` → **0** | 6/6 claimed GREENs reproduce (G-1..-5 + E13); G-6 persistence RED reproduces as the close stated |
| (2) bounds | ⟨cmd⟩ `git show --stat` over `084a3679..6606ca7e` (8 shas): every path is inside its unit's set (roster table above re-derived identically); vjs `390db7b5` · `ab2ab9e7` · `c33bc786` · `e14cc2d0` · `f099e975` · `7dbd758b` touch only the record, `evidence/W13T/**`, INBOX, LEDGER; `scripts/dev/dev.sh` in none | GREEN |
| (3) masking | ⟨cmd⟩ `git diff 084a3679..HEAD \| grep -nE '^\+.*(try *\{\|catch\|\.skip\|\.only\(\|eslint-disable\|@ts-\|as any\|overflow[-: ]hidden\|!important)'` → 3 `as unknown as` window-shim casts in `chrome-dock-containment.test.ts` (a jsdom ResizeObserver/matchMedia environment shim, restored in `afterAll`) + 1 `try {` in `channel-options-render-edge.test.ts` (a mount/unmount `try/finally`) — neither wraps a defect; no product-side catch, skip, allowlist, `eslint-disable`, or copied producer selector | GREEN |
| (4) families | 8 kf shas, one meaning each, witness in the same sha; R-a4-1 / R-a4-2 separate (per §0ap); no declared family split | GREEN |
| (5) E-3 | ⟨cmd⟩ `git diff --stat 390db7b5^..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/` → empty | GREEN |
| (6) mail | 0 UNREAD (tail I-39); O-50 rowed at `e14cc2d0` | GREEN |
| (7) four-verb | row `:56` = PARTIAL (not IMPLEMENTED), lawful for an escalated close | GREEN |
| (8) goal at the bytes | OA-6 contained (0 out ×12); OA-7 29/29 glyphs from `resolveTimingFunction(key).easing`; OA-8 pointer + keyboard live, producer paint; OA-9 root named (`ResizeObserver.observe(Text)` aborting the mount flush) and cured at `EasingTarget.vue`; **OA-10 persistence NOT met** — COHESION §0ao.1 `:2585` rules it *"persisted where the scene's other view state lives"* | PARTIAL |
| (9) figures | 61/61 · 501/501, 29/29, 0→795/795→450/450→480, eslint 6, 8 shas, masking 0 — reproduce | GREEN |

### (10) Honest-RED adjudication

| RED | spec relief | owner named | adjudication |
|---|---|---|---|
| eslint 6 rows (`TimingFunctionPanel.vue:151:9 · 152:9 · 156:5` · `ControlsPaneWrapper.vue:62:58 · 328:5 · 366:9`, `vue/no-mutating-props`) | **YES** — `KF-W13.md:311` (§0ap): *"the 7 pre-existing eslint errors … (granted; cure-or-return by `file:line`)"*; COHESION `:2613` same. RETURN by `file:line` is the spec's own lawful outcome | ESC-k2-1 → the orchestrator (§3a carve ruling) | **HONEST-RED** |
| G-KFW13T-6 persistence limb (toggle state lost on reload) | **NONE** — not producer-owned, not routed to a successor, not named honest-RED by id. §0ao.1 rules the persistence home itself (`:2585`), and that home (`demo/state/controlOptionsStore.ts`) sits outside every KF.W13T set: a spec-bounds defect, correctly escalated (ESC-e-1), but an escalation is not a relief | ESC-e-1 → the orchestrator (a one-field grant) | **UNRELIEVED** → C1-1 |

### Register

| id | severity | claim | receipt | cure |
|---|---|---|---|---|
| C1-1 | **HIGH** | G-KFW13T-6 is RED on its persistence limb with no spec relief; OA-10 is an owner ruling (§0ao.1), so the wave cannot close | e-probe chk1/chk2 `afterReload {"pressed":"false","visible":true}` ×2; `grep -n 'persist' KF-W13.md:309` → *"persisted with the scene's view state"*; COHESION `:2585` | the orchestrator rules ESC-e-1 (a dated grant of the view-state field in `controlOptionsStore.ts`, read/written by `EasingScene.vue`'s existing ref); a repair unit lands it with a reload witness; re-close |
| C1-2 | MINOR | `test:demo` is not deterministically green: `typing-dots-engine-seam.test.ts > (1)` hit the 5000 ms default timeout on 3 of 7 runs this seat (`import 266.86s` — heavy host contention; an 8th run died on host `ENOSPC` and is excluded). The file is untouched by this wave (not in the 8-sha roster) | ⟨cmd⟩ `npm run test:demo` ×7 → 501/501 ×4 · 500/501 ×3, the same test each time: `Error: Test timed out in 5000ms` at `:82` | a load-sensitive cold dynamic import; route to the next kf test-hygiene seat (an explicit per-test timeout at the witness, assertions untouched, per the V·D59 precedent). Mitigated: 4/7 clean, the close's ×2 figure reproduces |
| C1-3 | MINOR | R-k-1: at 390×844 the contained dock still overlaps the top-right cluster (`@mbabb menu x Share animation`; 3 collisions at `#/cube`) — the part of the owner's OA-6 screenshot the containment gate does not measure | dock probe `coll= 1` / `coll= 3` ×2 | already registered with an owner (orchestrator ruling on `--dock-top-*` or `EditorShell.vue`'s ribbon); mitigated |
| C1-4 | INFO | `chrome-dock-containment.test.ts` is a class-structural witness (jsdom cannot measure boxes); the box measurement is the banked live probe | `:82-100` asserts band classes, `dock-overflow-wrap`, no `overflow-(hidden\|clip)` | none; the live probe carries the gate |

**Successors**: no wave in the LEDGER or `keyframes/waves/*.md` declares an "Opens after KF.W13T" conjunct (⟨cmd⟩ `grep -rn 'KF.W13T' keyframes/waves/ EXECUTION-RUNBOOK.md \| grep -v KF-W13.md` → none), so no successor is blocked by this wave.

**Verdict: NOT-CONFORMANT** — 1 HIGH (C1-1, unrelieved G-KFW13T-6 persistence) · 2 MINOR · 1 INFO; 6/6 claimed GREENs reproduce; honest-RED set = {eslint 6 rows, ESC-k2-1}. Row `:56` stays **PARTIAL**; awaits the orchestrator's rulings on ESC-e-1 (and ESC-k2-1), then a repair unit and a re-close.

**Inheritance note (crash-recovery, 2026-09-22, `claude-opus-5-5[1m]`).** This "## Check 1" and its LEDGER event line were found uncommitted (a killed predecessor Check seat's work on this same unit); inherited paths: `docs/tranches/X/execution/B/KF-W13T.md` · `docs/tranches/X/execution/LEDGER.md`. Judged hunk-by-hunk against the spec and re-measured before commit: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json | grep -c 'error TS'` → **0**; ⟨cmd⟩ `npx eslint demo/app demo/components/instrument/transport demo/components/playback` → **6** errors; ⟨cmd⟩ `grep "^| I-" INBOX.md | grep -c "| UNREAD"` → **0**; E-3 `git diff --stat 390db7b5^..HEAD -- keyframes/waves/ registry/adjudicated/` → empty; kf `EasingScene.vue:80` `const preview = ref<"shown" | "hidden">("shown")` — a plain scene ref, no storage binding (the persistence RED is structural, confirming C1-1); kf `origin...HEAD` `0 0`. Verdict held: **NOT-CONFORMANT**, row stays PARTIAL.

## Repair 1

**SERVED MODEL**: `claude-opus-5-5[1m]` · 2026-09-22 · REPAIR SEAT round 1 over Check 1's register (C1-1..C1-4). Spec `KF-W13.md` read whole (addenda `:307` · `:309` · `:311`); COHESION §0ao.1 `:2581-2585` re-read. Crash recovery: ⟨cmd⟩ `git status --porcelain` → kf: the two untracked `VALUEJS-INBOUND-*` letters only; value.js: ` M CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` — none in this seat's set, none touched; no inherited partial work.

**Ruling search (C1-1)**: ⟨cmd⟩ `grep -rn "ESC-e-1\|controlOptionsStore" docs/tranches/X | grep -v execution/B/KF-W13T.md` → no hit in COHESION, the LEDGER or `KF-W13.md` (the only `ESC-e-1` elsewhere is W5's unrelated arm-D id); ⟨cmd⟩ `grep -n W13T COHESION.md` → last hit `:2623` (§0ap), no later grant. **ESC-e-1 is UNRULED.** The field's home is fixed by §0ao.1 (*"persisted where the scene's other view state lives"*): the `StoredAnimationGroupControlOptions` bucket type at kf `demo/state/controlOptionsStore.ts:11-25` (beside `isControlsPanelOpen` `:18` · `ppMode` `:25`), which is in no KF.W13T writable set. A scene-local `useStorage` inside `demo/scenes/easing/**` would be a SECOND persistence home that contradicts the ruling's "where", and writing the undeclared field through a cast is a masking fallback. Neither is a cure, so none was written.

| defect | cure | commit | gate re-reading (×2) |
|---|---|---|---|
| **C1-1** HIGH · G-KFW13T-6 persistence | **ESCALATED — ESC-e-1 still unruled.** Its only cure is a declared view-state field in `controlOptionsStore.ts` (outside bounds), bound by `EasingScene.vue:80`'s existing `preview` ref, plus a reload witness | — | unchanged: RED on persistence (Check 1's e-probe `afterReload pressed "false"` ×2 stands; no byte moved it) |
| **C1-2** MINOR · `typing-dots-engine-seam.test.ts` 5000 ms timeout | Root: `mountDots`'s paint poll has its own 5 s deadline (`:70`) after the engine's cold dynamic import, and that equals vitest's 5 s default, so under load the runner's timer fired before the seam's own deadline could decide. The fix is a describe-level `{ timeout: 30_000 }` (the case budget now exceeds the poll it contains), with a comment. Assertions are unchanged (V·D59). In bounds: `test/demo/**` (`.e`'s set) | kf **`5e5f4028`** (pushed; `origin...HEAD` `0 0`) | ⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/typing-dots-engine-seam.test.ts` → **4/4 · 4/4**; ⟨cmd⟩ `npm run test:demo` → **61/61 · 501/501** ×2; ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json \| grep -c 'error TS'` → **0 · 0**; ⟨cmd⟩ `npx eslint <the file>` → exit **0**; `git diff --check` clean |
| **C1-3** MINOR · R-k-1 390×844 cluster overlap | Not a one-command cure. It waits on the orchestrator's ruling (`--dock-top-*` vs `EditorShell.vue`'s ribbon), as already registered. **Carried as an escalation**, with no byte | — | unchanged (Check 1's `coll= 1` / `coll= 3` ×2 stands) |
| **C1-4** INFO | none needed | — | — |

**Figures (WRITE-THEN-MEASURE, from the settled bytes at kf `5e5f4028`)**: `test:demo` **61 files / 501 tests** ×2; vue-tsc **0** ×2; kf product bytes this seat **0** (one test file, 6+/1−, ⟨cmd⟩ `git show --stat 5e5f4028`); value.js bytes this seat: this record section plus one LEDGER event line.

**Verdict**: 1 MINOR cured (C1-2). C1-1 (HIGH) is still ESCALATED on ESC-e-1, which has no ruling. C1-3 is carried to its registered owner. Row `:56` stays **PARTIAL** until ESC-e-1 is ruled and a repair unit lands the field with a reload witness, then a re-close.

## Check 2

**SERVED MODEL**: `claude-opus-5-5[1m]` · 2026-09-22 · fresh adversarial L-20 pass 2 over the PARTIAL close as repaired (Repair 1, `0338eec8`); VERIFY-ONLY (0 kf / glass / product bytes). Spec `KF-W13.md` read whole (addenda `:307` · `:309` · `:311`). Crash recovery: ⟨cmd⟩ `git status --porcelain` → kf: the two untracked `VALUEJS-INBOUND-2026-07-{24,27}-*` letters only; value.js: ` M CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` — none in this seat's set, none touched, no inherited partial work. kf `HEAD` `5e5f4028`; ⟨cmd⟩ `git fetch; git rev-list --left-right --count origin/master...HEAD` → `0 0`.

**Ruling search**: ⟨cmd⟩ `grep -n 'ESC-e-1\|ESC-k2-1\|controlOptionsStore' docs/tranches/X/COHESION.md` → **none**; ⟨cmd⟩ `grep -n W13T COHESION.md | tail -1` → `:2623` (§0ap, unchanged since Check 1). **ESC-e-1 and ESC-k2-1 are still UNRULED.**

### Axes

| axis | reading (⟨cmd⟩ → output) | verdict |
|---|---|---|
| (1) claimed GREENs reproduce | G-KFW13T-1 ⟨cmd⟩ `node KF-W13T-k-dock-probe.mjs chk2{a,b}` → `out= 0` at 1440/768/390 × `#/`,`#/cube` (6/6 ×2); coll 390 `#/` **1** · `#/cube` **3** (= R-k-1). G-2 ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json \| grep -c 'error TS'` → **0 · 0**, exit 0; ⟨cmd⟩ `npm run test:demo` → **61/61 · 501/501**, EXIT 0, ×2 (C1-2's flake did not recur). G-3..-6 ⟨cmd⟩ `node KF-W13T-e-probe.mjs chk2{a,b}` → rows 29 · glyphRows 29 (×2); drag `0→795` · click `795→450` · ArrowRight `450→480`, thumbBg `rgba(0, 0, 0, 0)`, 0 pageerrors (×2); clock `0→367.9` / `0→350.3`, tilesMoved · vizMoved true, 0 pageerrors; toggle 1, pressed false→true, visible→absent, a11y visualizer nodes 0, **afterReload `{"pressed":"false","visible":true}`** (×2). eslint ⟨cmd⟩ `npx eslint demo/app demo/components/instrument/transport demo/components/playback` → **6 errors** ×2, same six positions. E13 → 0 UNREAD | 6/6 claimed GREENs reproduce (G-1 · G-2 · G-3 · G-4 · G-5 · E13); G-6 persistence RED reproduces |
| (2) bounds | ⟨cmd⟩ `git show --stat 5e5f4028` → `test/demo/instrument/typing-dots-engine-seam.test.ts` only (6+/1−; `.e`'s `test/demo/**`); the eight earlier shas as re-derived at Check 1; ⟨cmd⟩ `git log --format=%h 390db7b5^..HEAD -- scripts/dev/dev.sh` → empty | GREEN |
| (3) masking | ⟨cmd⟩ `git diff 084a3679..HEAD -- test demo \| grep -cE '^\+.*(\.skip\|\.only\(\|eslint-disable\|@ts-ignore\|@ts-expect-error\|as any\|overflow[-: ]hidden\|!important\|catch)'` → **0**; `5e5f4028` raises a describe budget above its own 5 s poll, assertions untouched (not a narrowed assertion) | GREEN |
| (4) families | 9 kf shas, one meaning each, witness in the same sha | GREEN |
| (5) E-3 | ⟨cmd⟩ `git diff --stat 390db7b5^..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/` → empty | GREEN |
| (6) mail | four-path sweep `-newermt 2026-09-22` → the same Track-A documents, `INBOX.md`, and the three BK letters already rowed; kf coordination empty; newest glass dir BK; ⟨cmd⟩ `grep "^\| I-" INBOX.md \| grep -c "\| UNREAD"` → **0** (tail I-39) | GREEN |
| (7) four-verb | row `:56` = PARTIAL (not IMPLEMENTED), lawful while ESC-e-1 is unruled | GREEN |
| (8) goal at the bytes | OA-6 · OA-7 · OA-8 · OA-9 met as in Check 1; **OA-10 persistence NOT met** — ⟨cmd⟩ `grep -n 'persist\|useStorage\|localStorage' demo/scenes/easing/EasingScene.vue` → only the `:76` comment naming the home; the `preview` ref is unbound to storage | PARTIAL |
| (9) figures | Repair 1's 61/61 · 501/501 ×2 · vue-tsc 0 ×2 · 1 file 6+/1− reproduce | GREEN |

### (10) Honest-RED adjudication

| RED | spec relief | owner named | adjudication |
|---|---|---|---|
| eslint 6 rows (`TimingFunctionPanel.vue:151:9 · 152:9 · 156:5` · `ControlsPaneWrapper.vue:62:58 · 328:5 · 366:9`, `vue/no-mutating-props`) | **YES** — `KF-W13.md:311` (§0ap): *"(granted; cure-or-return by `file:line`)"*; returned by `file:line` at `.k2` | ESC-k2-1 → the orchestrator (§3a carve ruling) | **HONEST-RED** |
| G-KFW13T-6 persistence limb | **NONE** — `KF-W13.md:309` binds *"persisted with the scene's view state"* inside the gate itself; not producer-owned, routed to no successor, named honest-RED by no id; the home (`demo/state/controlOptionsStore.ts`) lies outside every KF.W13T set, so it is correctly ESCALATED — but an escalation is not a relief | ESC-e-1 → the orchestrator (one-field grant), still unruled | **UNRELIEVED** → C2-1 |

### Register

| id | severity | claim | receipt | cure |
|---|---|---|---|---|
| C2-1 | **HIGH** | (= C1-1, unchanged) G-KFW13T-6 RED on persistence with no spec relief; OA-10 is an owner ruling, so the wave cannot close | e-probe chk2a/chk2b `afterReload {"pressed":"false","visible":true}` ×2; COHESION `grep ESC-e-1` → none | the orchestrator rules ESC-e-1 (dated grant of the view-state field in `controlOptionsStore.ts`, bound by `EasingScene.vue`'s `preview` ref); a repair unit lands it with a reload witness; re-close |
| C2-2 | MINOR | (= C1-3) R-k-1: 390×844 contained dock overlaps the top-right cluster | dock probe `coll= 1` / `coll= 3` ×2 | carried to its registered owner (orchestrator ruling on `--dock-top-*` vs `EditorShell.vue`'s ribbon); mitigated |
| C2-3 | INFO | C1-2 confirmed cured: `test:demo` 501/501 ×2 this seat, no timeout | td ×2 EXIT 0 | none |

**Successors**: ⟨cmd⟩ `grep -rn 'KF.W13T' docs/tranches/X/keyframes/waves/ EXECUTION-RUNBOOK.md | grep -v waves/KF-W13.md` → none — no wave declares an "Opens after KF.W13T" conjunct, so no successor is blocked.

**Verdict: NOT-CONFORMANT** — 1 HIGH (C2-1) · 1 MINOR · 1 INFO; 6/6 claimed GREENs reproduce; honest-RED set = {eslint 6 rows (ESC-k2-1)}. Row `:56` stays **PARTIAL**; the LEDGER status cell is not moved (an event line is appended). Awaits the ESC-e-1 ruling, then a repair unit and a re-close.

## Repair 2

**SERVED MODEL**: `claude-opus-5-5[1m]` · 2026-09-22 · REPAIR SEAT round 2 over Check 2's register (C2-1..C2-3). Spec `KF-W13.md` addenda re-read (`:307` · `:309` · `:311`); COHESION §0ao.1 `:2566-2586` re-read. Crash recovery: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → the two untracked `VALUEJS-INBOUND-2026-07-{24,27}-*` letters only; value.js ` M CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` — none in this seat's set, none touched; no inherited partial work. kf `HEAD` = `5e5f4028` (unchanged since Check 2).

**Ruling search**: ⟨cmd⟩ `grep -n 'ESC-e-1\|controlOptionsStore' docs/tranches/X/COHESION.md docs/tranches/X/execution/LEDGER.md` → COHESION **none**; LEDGER only this wave's own row `:56` and event lines (no grant). Latest COHESION addendum is §0aq (Tracks A/C); no KF.W13T grant after §0ap `:2623`. **ESC-e-1 is still UNRULED.**

| defect | cure | commit | gate re-reading |
|---|---|---|---|
| **C2-1** HIGH · G-KFW13T-6 persistence | **ESCALATED — ESC-e-1 unruled.** The only lawful cure is a declared view-state field in kf `demo/state/controlOptionsStore.ts` (the bucket §0ao.1 names: *"persisted where the scene's other view state lives"*), which lies outside every KF.W13T writable set (`.k` · `.e` · `.k2`). A scene-local `localStorage`/`useStorage` in `demo/scenes/easing/**` would sit in bounds but would be a second, parallel persistence home — a workaround, not the spec's cure, so it was not written | — | unchanged: no byte moved; Check 2's e-probe `afterReload pressed "false"` ×2 stands |
| **C2-2** MINOR · R-k-1 390×844 cluster overlap | Not a one-command cure; waits on the orchestrator's ruling (`--dock-top-*` band vs `EditorShell.vue`'s ribbon). **Carried as an escalation**, with no byte | — | unchanged (`coll= 1` / `coll= 3` ×2 stands) |
| **C2-3** INFO | none needed | — | — |

**Figures (WRITE-THEN-MEASURE)**: kf bytes this seat **0**; no gate could move, so none was re-run; Check 2's banked readings at kf `5e5f4028` stand (vue-tsc 0 ×2 · `test:demo` 61/61 · 501/501 ×2). value.js bytes this seat: this section plus one LEDGER event line.

**Verdict**: 0 cured this round; C2-1 (HIGH) ESCALATED on ESC-e-1, C2-2 carried. Row `:56` stays **PARTIAL**. Every further repair round is idle until the orchestrator rules ESC-e-1 (one-field grant in `controlOptionsStore.ts`); a repair unit then lands it with a reload witness, and a re-close follows.

## Check 3

**SERVED MODEL**: `claude-opus-5-5[1m]` · 2026-09-22 · fresh adversarial L-20 pass 3 over the PARTIAL close as twice repaired (Repair 2 `aa0baee1`); VERIFY-ONLY (0 kf / glass / product bytes). Spec `KF-W13.md` read whole (addenda `:303` · `:307` · `:309` · `:311`). Crash recovery: ⟨cmd⟩ `git status --porcelain` → kf: the two untracked `VALUEJS-INBOUND-2026-07-{24,27}-*` letters only; value.js: ` M CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` — none in this seat's set, none touched, no inherited partial work. kf `HEAD` `5e5f4028`; ⟨cmd⟩ `git fetch; git rev-list --left-right --count origin/master...HEAD` → `0 0`.

**Ruling search**: ⟨cmd⟩ `grep -n 'ESC-e-1\|ESC-k2-1\|controlOptionsStore' docs/tranches/X/COHESION.md` → **none**; the newest addendum is still §0aq `:2625` (Tracks A/C; its only KF mention is ESC-PUSH for KF.W13S). **ESC-e-1 and ESC-k2-1 remain UNRULED.**

### Axes

| axis | reading (⟨cmd⟩ → output) | verdict |
|---|---|---|
| (1) claimed GREENs reproduce | G-1 ⟨cmd⟩ `node KF-W13T-k-dock-probe.mjs chk3{a,b}` → run a: `out= 0` at 5/6, **768×1024 `#/cube` `out= 4`** (a `div.dock-layer--summary` `[201,30,567,396]` painted mid-transition while the background `test:demo` ×2 loaded the host); run b `out= 0` 6/6; three isolated re-runs of that cell (`c3c/d/e`) → `out= 0` ×3. Collisions 390 `#/` **1** · `#/cube` **3** (= R-k-1). G-2 ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json \| grep -c 'error TS'` → **0 · 0**; ⟨cmd⟩ `npm run test:demo` → **61/61 · 501/501**, EXIT 0, ×2. G-3..-6 ⟨cmd⟩ `node KF-W13T-e-probe.mjs c3{a,b,c}` → rows 29 · glyphRows 29; drag `0→795` · click `795→450` · ArrowRight `450→480`, thumbBg `rgba(0, 0, 0, 0)`, 0 pageerrors; clock `0→420.1`, tilesMoved · vizMoved true; toggle 1, pressed false→true, visible→absent, a11y visualizer nodes 0, **afterReload `{"pressed":"false","visible":true}`**. eslint ⟨cmd⟩ `npx eslint demo/app demo/components/instrument/transport demo/components/playback` → **6 errors** ×2 (same six positions). E13 → 0 UNREAD | 6/6 claimed GREENs reproduce (G-1 under isolation; see C3-3); G-6 persistence RED reproduces |
| (2) bounds | kf roster unchanged since Check 2 (⟨cmd⟩ `git log --oneline 084a3679..HEAD \| wc -l` → **9**; each sha's `--stat` as Check 1/2); ⟨cmd⟩ `git log --format=%h 390db7b5^..HEAD -- scripts/dev/dev.sh` → empty | GREEN |
| (3) masking | ⟨cmd⟩ `git diff 084a3679..HEAD -- test demo \| grep -cE '^\+.*(\.skip\|\.only\(\|eslint-disable\|@ts-ignore\|@ts-expect-error\|as any\|overflow[-: ]hidden\|!important\|catch)'` → **0** | GREEN |
| (4) families | 9 kf shas, one meaning each, witness in the same sha | GREEN |
| (5) E-3 | ⟨cmd⟩ `git diff --stat 390db7b5^..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/` → empty | GREEN |
| (6) mail | four-path sweep `-newermt 2026-09-22` → the three Track-A documents, `INBOX.md`, the three BK letters already rowed; kf coordination empty; newest glass dir BK; ⟨cmd⟩ `grep "^\| I-" INBOX.md \| grep -c "\| UNREAD"` → **0** | GREEN |
| (7) four-verb | row `:56` = PARTIAL (not IMPLEMENTED) — lawful while ESC-e-1 is unruled | GREEN |
| (8) goal at the bytes | OA-6 · OA-7 · OA-8 · OA-9 met; **OA-10 persistence NOT met** (the `preview` ref in `EasingScene.vue` is bound to no store; reload drops it) | PARTIAL |
| (9) figures | Check 2 / Repair 2 figures (vue-tsc 0 · 61/61 · 501/501 · eslint 6) reproduce ×2 at `5e5f4028` | GREEN |

### (10) Honest-RED adjudication

| RED | spec relief | owner named | adjudication |
|---|---|---|---|
| eslint 6 rows (`TimingFunctionPanel.vue:151:9 · 152:9 · 156:5` · `ControlsPaneWrapper.vue:62:58 · 328:5 · 366:9`, `vue/no-mutating-props`) | **YES** — `KF-W13.md:311` (§0ap): *"(granted; cure-or-return by `file:line`)"*; returned by `file:line` at `.k2` | ESC-k2-1 → the orchestrator (§3a carve ruling) | **HONEST-RED** |
| G-KFW13T-6 persistence limb | **NONE** — `KF-W13.md:309` puts *"persisted across reload"* inside the gate itself; it is not producer-owned, not routed to a successor, and not named honest-RED by id. The escalation is correct (the home `demo/state/controlOptionsStore.ts` is outside every KF.W13T set), but an escalation does not relieve the gate | ESC-e-1 → the orchestrator (one-field grant), still unruled | **UNRELIEVED** → C3-1 |

### Register

| id | severity | claim | receipt | cure |
|---|---|---|---|---|
| C3-1 | **HIGH** | (= C2-1 / C1-1, unchanged) G-KFW13T-6 is RED on persistence with no spec relief. OA-10 is an owner ruling, so the wave cannot close | e-probe c3c `afterReload {"pressed":"false","visible":true}`; COHESION `grep ESC-e-1` → none | the orchestrator rules ESC-e-1 (a dated grant of the view-state field in `controlOptionsStore.ts`, bound by `EasingScene.vue`'s `preview` ref); a repair unit lands it with a reload witness; then re-close |
| C3-2 | MINOR | (= C2-2) R-k-1: at 390×844 the contained dock overlaps the top-right cluster | dock probe `coll= 1` / `coll= 3` ×2 | carried to its registered owner (the orchestrator's ruling on `--dock-top-*` vs `EditorShell.vue`'s ribbon); mitigated |
| C3-3 | INFO | the dock probe is timing-sensitive under host load. One cell (768 `#/cube`) caught a `dock-layer--summary` mid-transition once, while `test:demo` ran concurrently. It read 0 on 4 further runs. This is not a containment defect, and the probe was not modified | chk3a vs chk3b + c3c/d/e | none. Future seats run the probe on an idle host |

**Successors**: ⟨cmd⟩ `grep -rn 'KF.W13T' docs/tranches/X/keyframes/waves/ EXECUTION-RUNBOOK.md | grep -v waves/KF-W13.md` → none (as Check 2). No wave declares an "Opens after KF.W13T" conjunct, so no successor is blocked.

**Verdict: NOT-CONFORMANT**: 1 HIGH (C3-1) · 1 MINOR · 1 INFO. 6/6 claimed GREENs reproduce. The honest-RED set is {eslint 6 rows (ESC-k2-1)}. Row `:56` stays **PARTIAL**, and the LEDGER status cell is not moved (an event line is appended). Three L-20 passes have now returned the same single HIGH, and it waits only on the ESC-e-1 ruling. Further check/repair rounds without that ruling cannot move it.
