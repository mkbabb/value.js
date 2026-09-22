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
