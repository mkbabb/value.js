# F-T7 — the CARRY-LEDGER sweep at fourier master (2026-11-06)

**Unit.** `fourier-DESIGN-TAIL.md` §C F-T7: classify each of the 543 carry rows (F-W1-CARRY 105, F-W4-CARRY 438, one per `- **` row head) at fourier master `11f6eea` as cured at bytes, homed, or open, and publish the open remainder as rows. Master moved to `a224b63` during the sitting; the commits between touch `/paper` windowing (`PaperArticleWindow.vue`, `PaperView.vue`), the latex-paper pin and `scripts/prod-verify.mjs`, so the PAW/PV rows below read as of `11f6eea`. The baseline the carries were audited against is fourier `cd26c65` (2026-07-03, the `d0be` RETAIN-AS-RECORD tree).

**Method (falsifiable, mechanical first, then read).** Each class names its receipt kind:

- **cured (read)** / **open (read)** / **homed (read)**: this seat read the row against the master file and wrote the receipt (file:line or a grep with its count).
- **cured (deleted)**: every file the row is about is gone at master; the receipt names the deleting commit. The defect's site is gone; a successor component that took over the role is not re-read under this class.
- **cured (id-cited at site)**: the row's own banked id (two or more capital letters, e.g. `AA-21`, `FR-EQR-8`) is cited in a cure note at a master source site, and the note carries no hold word. A 10-row random sample was read: 10 of 10 were cure notes at the defect's site.
- **cured (defect token gone)**: a distinctive backticked token from the row's defect clause is present in the cited file at `cd26c65` and absent from all of `web/src` and `api` at master.
- **homed (producer/ruling)**: the row names an O-id or a glass/producer arm and has no cure receipt at master; it is held on that producer or ruling.
- **open (cited lines unchanged)**: every line the row cites at `cd26c65` survives verbatim in the same file at master.
- **open (no cure receipt)**: none of the above found a cure at master. These rows are published open; a later read may still find a cure the grep cannot see.
- **homed (read)** also takes the rows that are not code defects: rulings, locks, negative rosters, provenance laws and the audits' file rosters. They stand in their wave records.

**Second sitting (2026-11-06, master `9b18d3e`).** The first sitting left 123 rows `open (no cure receipt)`. 86 of them were read against their master files, by component: the admin panels (now glass DataTable, Alert, ConfirmDialog), the two docks (glass DockControl), SpeedSelect, DarkModeToggle, the morph config, the legend, and the paper shell. 44 moved to cured (read), 29 to homed (read) and 13 to open (read); the other 37 stay open (no cure receipt). Between `9b18d3e` and the merge `b0d3d0f`, only `scripts/deploy-alert*.sh` changed.

**Counts.**

| Class | Rows |
|---|---|
| cured (defect token gone) | 10 |
| cured (deleted) | 43 |
| cured (id-cited at site) | 97 |
| cured (read) | 132 |
| homed (producer/ruling) | 134 |
| homed (read) | 30 |
| open (cited lines unchanged) | 14 |
| open (no cure receipt) | 37 |
| open (read) | 44 |
| open (read: not located) | 2 |
| **total** | **543** |

**Instruments.** `~/.dev-logs/x-realize-2/fourier/ft7/` (`extract.py`, `classify.py`, `survive.py`, `idcite.py`, `ctx.py`, `final.py`, `judged.json`, `ft7-classified.json`).

## The open remainder (published rows)

| Carry:line | Row | Class | Receipt |
|---|---|---|---|
| F-W1:20 | M-7 (prop-VALUE-axis census amendment) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/BasisSelector.vue |
| F-W1:43 | C-4 (resolver placement) | open (cited lines unchanged) | web/src/components/equation/composables/useCoeffHover.ts: every cited cd26c65 line survives verbatim at master |
| F-W1:44 | fr-BasisCanvas C-4 (no reactive dependency) | open (cited lines unchanged) | web/src/components/visualization/BasisCanvas.vue: every cited cd26c65 line survives verbatim at master |
| F-W1:58 | fr-GalleryCard D-20 (`rounded-full` vs `rounded-badge`) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/gallery/GalleryCard.vue |
| F-W1:95 | C-13 / R-16 (the engine decision) | open (read) | stores/animation.ts still hand-rolls the rAF transport (requestAnimationFrame tick) beside keyframes.js; the engine decision is not taken at master |
| F-W1:96 | C-11 (scalar-tween adoption) | open (cited lines unchanged) | web/src/components/visualization/BasisCanvas.vue: every cited cd26c65 line survives verbatim at master |
| F-W1:104 | MG-ι / C-2 (the remedy constraints) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/App.vue |
| F-W1:113 | PP-REDGATE (the RED gate belongs to the uplift) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/env.d.ts, web/src/components/paper/PaperView.vue |
| F-W1:115 | C-13 (pencil-boil ships raw TS) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/dev/FourierShapeExtractor.vue, web/src/components/ui/tooltip/index.ts |
| F-W1:139 | FR-AFP-19 / FR-AFP-20 / FR-AFP-27 / FR-AFP-44 / M-6 (rest-state tone + | open (cited lines unchanged) | web/src/components/visualization/gallery/AdminFlaggedPanel.vue: every cited cd26c65 line survives verbatim at master |
| F-W1:144 | FR-USB-3 / FR-USB-35 / FR-COB-13 / FR-MSP-5 / FR-EMT-14 (type + geomet | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): — |
| F-W1:145 | FR-COB-16 / D-13 / GAB-5 / MPC-16 / FR-EQC-5 (free cures the uplift la | open (read) | CanvasControlsDock.vue:110 Publish still binds `:active="publishing"` (in-flight drawn as on) |
| F-W1:170 | NWO-4 · census corrections | open (cited lines unchanged) | web/src/components/paper/search/PaperSearchInput.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:18 | CORRECTED DENOMINATORS. | open (cited lines unchanged) | web/src/components/visualization/gallery/GalleryFeaturedCarousel.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:81 | AA-25 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): api/services/database.py, web/src/components/admin/AdminAuditLog.vue |
| F-W4:84 | AA-28 | open (read) | `if (!token) throw` here, but `getAdminToken()!` remains at 3 sites in web/src (idiom not retired) |
| F-W4:90 | AA-36 | open (read) | useOffsetPagination.ts:35 items is a deep `ref<T[]>`, not shallowRef |
| F-W4:92 | AA-38 | open (read) | GalleryView.vue:33 defineAsyncComponent(loadAdminAuditLog) bare: no errorComponent/onError |
| F-W4:94 | AA-40 | open (read) | TargetCell discloses the full target by `title` only (the IP has an sr-only leg; the target does not) |
| F-W4:96 | AA-42 | open (read) | TargetCell keeps `text-foreground/80` |
| F-W4:125 | FR-AFP-42 | open (read) | AdminFlaggedPanel.vue: still zero props and zero emits with the fetch at setup top level (the seam the row names) |
| F-W4:145 | FR-AUL-21 rider | open (read) | AdminUserTable.vue:83 still branches only on `status === "suspended"`; an `orphan-migrated` user renders as healthy |
| F-W4:169 | FR-AUL-57 | open (read) | GalleryView.vue: the admin panels mount through bare `defineAsyncComponent(() => import(...))` with no loading or error component |
| F-W4:176 | AC-C-2 | open (read) | stores/animation.ts:173-186 `startTime = null` then `cycle = floor(elapsed/dur)` -> every restart resumes forward (cycle 0) |
| F-W4:177 | AC-D-12/C-20 | open (read) | AnimationControls.vue currentLevel still ends `return 1` when both payloads are null |
| F-W4:181 | AC-D-7/L-14 | open (read) | role=progressbar + name + value now present (a11y leg cured); the fill/track pair is 25% vs 8% foreground mix, still under the 3:1 non-text floor (contrast leg) |
| F-W4:183 | AC-C-12 | open (read) | BasisCanvas.vue:544 `exportFrame(options: Record<string, boolean> = {})` keeps the open record over a closed vocabulary |
| F-W4:186 | AC-L-4/C-11 | open (read) | AnimationControls.vue:52 Math.round(pos) vs BasisCanvas.vue:295-298 Math.floor + lerp: two level rules |
| F-W4:187 | AC-L-5 | open (read) | the easedT -> level map lives at two sites with two rules (AnimationControls.vue:52, BasisCanvas.vue:295); no shared levelAt composable |
| F-W4:188 | AC-L-16/C-24 | open (read) | AnimationControls still takes activeBases by prop and reads store.basesData/epicycleData directly |
| F-W4:194 | AC-C-21 | open (read) | AnimationControls.vue currentLevel reads epicycleData.components.length, not n_components |
| F-W4:195 | AC-C-22 | open (read) | AnimationControls.vue `activeBases?: string[]` open type |
| F-W4:196 | AC-L-10/C-23 | open (read) | AnimationControls.vue maxWidth default "960px" in the prop and again as the CSS var fallback `var(--animation-dock-max-width, 960px)`; bare string type |
| F-W4:197 | AC-L-11+M-10 | open (read: not located) | persisted speed/easing restore path not located by grep in stores/animation.ts at master |
| F-W4:199 | AC-C-27 | open (read) | `"fourier-epicycles"` literal: 27 occurrences / 11 files at master (no exported constant) |
| F-W4:205 | AC-D-20 | open (read) | the second style block still ships `.menu-popup` unscoped app-wide |
| F-W4:209 | AC-M-6 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/AnimationControls.vue, web/src/components/visualization/EasingPicker.vue |
| F-W4:212 | AC-M-12 | open (read) | MiniProgressReadout and TimelineReadout are functional components rendered in AnimationControls' own render, which reads anim.t: the parent effect still subscribes to the 60 Hz clock |
| F-W4:214 | AC-D-18 | open (read) | `<Transition name="icon-swap" mode="out-in">` at 0.15 s each way remains (INFO) |
| F-W4:217 | AC-D-24 | open (read) | DropdownMenuContent still has no explicit `side` (INFO) |
| F-W4:218 | AC-C-29 | open (read) | web/e2e/visualization-crud.spec.ts:641 the a11y keystone is still `test.fixme` |
| F-W4:226 | SS-C-8 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/SpeedSelect.vue, web/src/components/visualization/VisualizationView.vue |
| F-W4:235 | SS-L-09 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/e2e/settings-persistence.spec.ts, web/src/components/visualization/SpeedSelect.vue |
| F-W4:237 | EP-C/M-4 | open (read) | EasingPicker.vue writes anim.easing on the global store directly; no props/emits |
| F-W4:242 | EP-L/m-1 | open (read) | lib/easings.ts:329 getEasingSVGPath still bare-indexes `ANIMATION_EASINGS[name].fn` |
| F-W4:245 | EP-C/m-6 + LC-zero-coverage | open (read: not located) | the easing menu's covering test was not located by this read (no fixme on it at master; no spec found naming the menu) |
| F-W4:246 | EP-MISSED-F | open (read) | lib/easings.ts keeps two catalogues (EASING_PRESETS :186 and ANIMATION_EASINGS :233) |
| F-W4:249 | EP-L/i-5 | open (read) | EasingPicker.vue template still calls getEasingSVGPath(name) per binding |
| F-W4:250 | ECP-GEO-2 rider | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/auth/UserSlugBar.vue |
| F-W4:251 | ECP-RESOLVER | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/lib/easings.ts |
| F-W4:254 | ECP-FLOOR / BARREL / ONECALL | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/composables/useFourierMorph.ts, web/src/composables/useMorphConfig.ts |
| F-W4:263 | CCD-D-4/L-1/C-3 | open (read) | CanvasControlsDock.vue:110 Publish DockControl has no :disabled while `publishing`; re-entry rests on the parent |
| F-W4:267 | CCD-D-3/L-8/C-8 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/CanvasControlsDock.vue |
| F-W4:274 | CCD-D-10/C-12/C-11 ⊕ ECD-D-12/C-4/C-5 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): — |
| F-W4:276 | CCD-C-9 ⊕ CCD-M-8 ⊕ ECD-C-10/C-11 fold | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): — |
| F-W4:279 | CCD-D-11/L-17 | open (cited lines unchanged) | web/src/components/visualization/CanvasControlsDock.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:288 | CCD-C-26 ⊕ ECD-M-4 | open (read) | web/e2e/visualization-crud.spec.ts:641 the dock-reaching axe keystone is still `test.fixme` |
| F-W4:303 | DMT M-2 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/layout/DarkModeToggle.vue |
| F-W4:315 | FMD-7 | open (read) | useMorphConfig.ts:118-123 the config still reaches the morph through `syncWith`'s pre-flush deep watcher over a spread copy |
| F-W4:319 | FMD-N1 | open (read) | useMorphConfig.ts:92 `computePreviewLevels(config.lowLevel, config.highLevel, …)` still injects the live bounds into the ladder |
| F-W4:320 | FMD-N5 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/morph/FourierMorphDemo.vue |
| F-W4:321 | FMD-N4 ⊕ FMD-N2 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/layout/DarkModeToggle.vue, web/src/components/morph/FourierMorphDemo.vue |
| F-W4:322 | DMT M-4 · M-5 · M-6 · M-7 · M-8 | open (read) | web/src: grep setDisableTransitions -> 0 (the singleton's transition guard is still never called) |
| F-W4:325 | FM-24 | open (read) | useMorphConfig.ts:120 the getter still allocates `{...config}` per run under `deep: true` |
| F-W4:334 | FR-CP-D1 | open (cited lines unchanged) | web/src/components/equation/ConvergencePlot.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:345 | FR-CL-D2 ⊕ M-R2 ⊕ M-R3 ⊕ D-18 | open (read) | ConvergenceLegend.vue:38-46 the legend entries are still bare `<div>`s with pointer handlers, no role or tabindex |
| F-W4:347 | FR-CL-M-R1 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/convergence/ConvergenceLegend.vue |
| F-W4:349 | FR-CL-M-R13 (THE CONTRACT EDIT) | open (read) | ConvergenceLegend.vue:20 `leave: []` still carries no key |
| F-W4:351 | FR-CL-D5 ⊕ D-6/D-L9/C-10.1 ⊕ M-R6 ⊕ M-R8 | open (cited lines unchanged) | web/src/components/equation/convergence/ConvergenceLegend.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:357 | FR-CT-D5/C-4/D-9 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/convergence/ConvergenceTimeline.vue |
| F-W4:361 | FR-CT-M1 | open (read) | ConvergencePlot.vue: still two template roots (`.convergence-container`, `ConvergenceTimeline`) with no `inheritAttrs` |
| F-W4:362 | FR-CP-C7 | open (read) | ConvergencePlot.vue:438 tooltip labels A = harm.amplitude from the regrouped trig series while the DTO ships \|c_n\| (lib/equation/api.ts:43): no reconciliation located |
| F-W4:363 | FR-CP-D10 ⊕ D-12 ⊕ D-16 ⊕ D-17 ⊕ D-18 ⊕ D-19 ⊕ D-20 ⊕ D-21/C-21 ⊕ D-22 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/ConvergencePlot.vue, web/src/components/equation/convergence/ConvergenceLegend.vue |
| F-W4:365 | FR-CP-C24/L-i3 ⊕ FR-CL-D-L13 ⊕ FR-CT-D14/D-19/C-15 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): — |
| F-W4:367 | FR-CP-16 (= FrequencyGraph C-8/L-m4 fold) | open (cited lines unchanged) | src/fourier_analysis/epicycles.py: every cited cd26c65 line survives verbatim at master |
| F-W4:373 | HLG-35 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/morph/HarmonicLevelGrid.vue |
| F-W4:383 | EV-B-1 (= FR-EMT-1) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): api/models/equations.py, api/routers/equations.py |
| F-W4:387 | EV-C·D-02 (+D·D-M7) | open (cited lines unchanged) | web/src/lib/api-problem.ts: every cited cd26c65 line survives verbatim at master |
| F-W4:388 | EV-L·M-3/C·C-29 | open (read) | useEquationCache.ts:100,115 two sessionStorage records (STATE_KEY, RESULT_KEY) with separate write paths |
| F-W4:389 | EV-L·M-2 (+I-2 witness) ⊕ L·M-7 | open (read) | lib/equation/api.ts:27,53 fixed operation-named abort keys `eq-compute`/`eq-simplify` remain |
| F-W4:390 | ⊘ R2-N7 (the abort-identity exhibit) | open (read) | `eq-simplify` is still a module-global operation key (useSimplifiedSeries.ts:67, lib/equation/api.ts:53) |
| F-W4:393 | EV-D·D-B3 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/EquationView.vue, web/src/lib/equation/notation.ts |
| F-W4:395 | EV-D·D-M3 ⊕ M-CP | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/EquationView.vue, web/src/components/visualization/CanvasControlsDock.vue |
| F-W4:397 | EV-D·D-M1 (= FR-EQR-10) ⊕ R2-N1 | open (cited lines unchanged) | web/src/components/equation/EquationView.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:398 | R2-N2 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/EquationView.vue |
| F-W4:411 | ⊘ EQP-M-N11 (the ONE-EDIT lock) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/AnimationControls.vue, web/src/components/visualization/EquationPanel.vue |
| F-W4:414 | FI-L-M3 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/FunctionInput.vue |
| F-W4:419 | EXM-N-16-instance | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/layout/DarkModeToggle.vue, web/src/components/visualization/ExportModal.vue |
| F-W4:449 | ⊘ PAW-52 under LAW-5 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/paper/PaperArticleWindow.vue |
| F-W4:470 | FR-GFC-12 ⊕ -13 ⊕ -15 ⊕ -16 ⊕ -17 ⊕ -18 ⊕ -19 ⊕ -22 ⊕ -25 ⊕ -27 ⊕ -28 | open (cited lines unchanged) | web/src/components/visualization/gallery/GalleryFeaturedCarousel.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:471 | FR-GSB-18 ⊕ FR-GSB-11f ⊕ FR-GSB-20 | open (read) | GallerySearchBar.vue:108 the clear Button is still `v-if="searchQuery"` and nothing refocuses the field |
| F-W4:473 | VV-R2-B | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/e2e/fixtures/gallery.ts, web/src/components/visualization/VisualizationView.vue |
| F-W4:474 | VV-R2-A ⊕ VV-R2-E | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/VisualizationView.vue |
| F-W4:479 | FR-USB-2 ⊕ FR-USB-6 ⊕ FR-USB-7 ⊕ FR-USB-8 ⊕ FR-USB-32 ⊕ FR-USB-27 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/auth/UserSlugBar.vue |
| F-W4:483 | GIG-D-1-residue ⊕ GIG-L-12 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/gallery/GalleryInfiniteGrid.vue, web/src/components/shared/CoefficientsSpectrum.vue |
| F-W4:489 | ⊘ CP-ROW-40 — THE FRAMING-CLUSTER SINGLE CURE | open (cited lines unchanged) | web/src/components/visualization/ContourEditorCanvas.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:504 | FSE-L-M6 ⊕ L-M4 ⊕ D-9/L-i2/C-17 ⊕ D-10 ⊕ D-11 ⊕ D-12 ⊕ D-14 ⊕ D-15 ⊕ D | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/dev/FourierShapeExtractor.vue |

## Every row

| Carry:line | Row | Class | Receipt |
|---|---|---|---|
| F-W1:17 | AA-2 | cured (read) | AdminAuditLog.vue: glass Buttons take emphasis/size/icon-only; no `variant`/`size="icon"` on Button |
| F-W1:18 | FR-COB-2 | cured (deleted) | web/src/components/visualization/CanvasOverlayButton.vue deleted at 5842377 |
| F-W1:19 | D-M3 (budget of record) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:20 | M-7 (prop-VALUE-axis census amendment) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/BasisSelector.vue |
| F-W1:21 | FR-EQR-1 (`copied` → `status`) | cured (id-cited at site) | `FR-EQR-1` cited in the cure note at web/src/components/equation/EquationResult.vue, web/src/composables/useMorphConfig.ts |
| F-W1:22 | FR-EQR-3 (the four console-error gates) | cured (id-cited at site) | `FR-EQR-3` cited in the cure note at web/e2e/gallery.spec.ts |
| F-W1:23 | FR-COB-19 (the stacked single-file instance) | cured (id-cited at site) | `FR-COB-19` cited in the cure note at web/src/components/equation/EquationView.vue |
| F-W1:24 | U-2 (SelectTrigger 8.0.0 delta) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:28 | M-16 / FR-EQC-16 / K-17 (RE-PIN GATE) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:29 | K-1 (the version-lying window) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:30 | FR-EQR-33(c) / GAB-13 (land-or-lose the substrate) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:34 | B-2 (.paper-texture) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:35 | MG-β (`text-admin-label`) | cured (defect token gone) | present at cd26c65, absent from web/src+api at master: `text-admin-label` |
| F-W1:36 | FR-EQC-3 / K-13 (the `.cartoon-card` shim) | cured (read) | style.css: grep `@utility cartoon-card` -> 0 (the local shim is gone; remaining `cartoon-card` hits are the producer utility's consumers) |
| F-W1:37 | FR-NP-13 (`.btn-pill` deletion) | cured (read) | NotationPills.vue: grep `btn-pill` -> 0 |
| F-W1:41 | D-1/BC-1/C-1 | homed (producer/ruling) | names a glass/producer arm |
| F-W1:42 | D-2/BC-5/C-3 (`basis-display.ts` module-eval snapshot) | cured (read) | lib/basis-display.ts no longer exists at master (the module-eval value copy is gone) |
| F-W1:43 | C-4 (resolver placement) | open (cited lines unchanged) | web/src/components/equation/composables/useCoeffHover.ts: every cited cd26c65 line survives verbatim at master |
| F-W1:44 | fr-BasisCanvas C-4 (no reactive dependency) | open (cited lines unchanged) | web/src/components/visualization/BasisCanvas.vue: every cited cd26c65 line survives verbatim at master |
| F-W1:45 | M-β5 (the cure's own gate) | cured (read) | lib/colors.ts:39 HEX_COLOR validates 3/4/6/8-digit hex before conversion |
| F-W1:46 | L-7 · m-9 · M-β6 · M-α5 (palette-cohesion riders) | cured (read) | lib/colors.ts: grep `green:` / VIZ_COLORS.green -> 0 |
| F-W1:47 | HLG-41 (ORDERING EDICT) | cured (read) | HarmonicLevelGrid.vue:38 the only :style left is `--levels-per-row`; the dead VIZ_COLORS.chebyshev bindings are gone |
| F-W1:51 | B-1 (the disclosure hang) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:52 | B-4 (`./animated-digit` deleted) | cured (defect token gone) | present at cd26c65, absent from web/src+api at master: `import { AnimatedDigit } from "@mkbabb/glass-ui/animated-digit"` |
| F-W1:53 | FM-2 (focus-ring registers deleted) | cured (id-cited at site) | `FM-2` cited in the cure note at web/src/style.css |
| F-W1:54 | FR-COB-6 (pressed paint removed) | cured (deleted) | web/src/components/visualization/CanvasOverlayButton.vue deleted at 5842377 |
| F-W1:55 | fr-GalleryCard D-21 (`--shadow-cartoon` sign flip) | cured (read) | GalleryCard.vue: grep `shadow-cartoon` -> 0 (the flipped shadow is not consumed) |
| F-W1:56 | GCM-22 (`p-0` neutraliser dies) | homed (producer/ruling) | hold noted at web/e2e/gallery.spec.ts, web/e2e/visual-checkpoint.spec.ts |
| F-W1:57 | G-DU6 / GCM-50 (Badge rim mechanism change) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:58 | fr-GalleryCard D-20 (`rounded-full` vs `rounded-badge`) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/gallery/GalleryCard.vue |
| F-W1:59 | fr-ContourPreview rows 23/27/30 + FR-EQC-13 (the uplift-delta ledger) | cured (deleted) | web/src/components/visualization/ContourPreview.vue deleted at 9a1d932 |
| F-W1:60 | FR-CP-5 (disclosure chevron) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:61 | FR-CP-13 (the fusing pair) | homed (producer/ruling) | hold noted at web/e2e/visual-checkpoint.spec.ts, web/src/components/visualization/VisualizationView.vue |
| F-W1:62 | fr-ExportModal M-α/M-β/M-γ (three banked cures invert at the uplift) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:63 | FR-TT-5 / FR-TT-6 / FR-TT-9 / FR-TT-14 / FR-TT-24 (the tooltip seam) | cured (id-cited at site) | `FR-TT-24` cited in the cure note at web/src/components/ui/tooltip/Tooltip.vue, web/src/components/ui/tooltip/index.ts |
| F-W1:67 | Census FE §5 / C-4-census break table (the retained-subpath deferral r | homed (producer/ruling) | names a glass/producer arm |
| F-W1:68 | `.dock-separator` RE-CLASSED OUT of the break table | homed (producer/ruling) | names a glass/producer arm |
| F-W1:69 | Dock member deletions | cured (defect token gone) | present at cd26c65, absent from web/src+api at master: `DockIconButton`, `<DockIconButton`, `<HoverPopover` |
| F-W1:70 | D-2/C-2 (the Popover union — primitive-class-change) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:71 | FR-AH-13 (the one row the uplift IMPROVES) | cured (deleted) | web/src/components/layout/AppHeader.vue deleted at 53aaa6f |
| F-W1:72 | FR-AH-22 / FR-AH-24 (header uplift folds) | cured (deleted) | web/src/components/layout/AppHeader.vue deleted at 53aaa6f |
| F-W1:73 | FR-AUL-10 + FR-AUL-45 (`ToastVariant`) | cured (read) | web/src: grep ToastVariant -> 0 |
| F-W1:77 | GAB-2 (the metric uplift is not a rename pass) | cured (id-cited at site) | `GAB-2` cited in the cure note at web/src/components/gallery/GalleryAdminBanner.vue |
| F-W1:78 | D·D-M10 (the energy encoding is DESTROYED, not renamed) | cured (read) | EquationView.vue:564 renders glass Metric; MetricBadge :color is gone |
| F-W1:79 | FR-IC-7 / FR-IC-8 / FR-IC-10 / FR-COB-10 (the metric-badge budget) | cured (deleted) | web/src/components/equation/InfoCard.vue deleted at 5842377; web/src/components/visualization/CanvasOverlayButton.vue deleted at 5842377 |
| F-W1:80 | FR-AFP-18 / FR-GFC-26 / m-2 / D-27 / FR-MSP-11-mapping (metric consume | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W1:84 | B-2 (`--slider-scrub-*` DEFINITION-ABSENT) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:85 | MPC-10 (the cure-rider that makes B-2's cure sound) | homed (producer/ruling) | hold noted at web/e2e/slider-scrub-contrast.spec.ts, web/src/components/ui/SliderControl.vue |
| F-W1:86 | MPC-31 (the ONE-CUT law) | cured (id-cited at site) | `MPC-31` cited in the cure note at web/e2e/slider-scrub-contrast.spec.ts, web/src/components/morph/MorphPhaseConfig.vue |
| F-W1:87 | MPC-21 / BR-1 (`variant="standard"` — delete, don't rename) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:88 | K-8 / SR-1 (`SliderVariant` drift) | cured (id-cited at site) | `SR-1` cited in the cure note at web/src/components/shared/FourierTimeline.vue |
| F-W1:89 | m-21 (`--slider-track-height` is not consumer-tunable) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:90 | PD-1 (the scrub session's sole opener rides a dead channel) | cured (deleted) | web/src/components/visualization/GlassTimeline.vue deleted at 8e19043 |
| F-W1:91 | MPC-32 (8.0.0 cures the coarse slider target) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:95 | C-13 / R-16 (the engine decision) | open (read) | stores/animation.ts still hand-rolls the rAF transport (requestAnimationFrame tick) beside keyframes.js; the engine decision is not taken at master |
| F-W1:96 | C-11 (scalar-tween adoption) | open (cited lines unchanged) | web/src/components/visualization/BasisCanvas.vue: every cited cd26c65 line survives verbatim at master |
| F-W1:97 | fr-App C-11 (the budgeting fact) | cured (read) | AppHeader.vue deleted at 53aaa6f; the persistent header the fact describes is gone |
| F-W1:98 | MPC-14 / C/B-2 (keyframes' own value.js floor) | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W1:102 | L/B-1 + C/B-1 (the import closure fails) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:103 | R2-2 (the version-conditional LAW) | cured (deleted) | web/src/components/equation/InfoCard.vue deleted at 5842377 |
| F-W1:104 | MG-ι / C-2 (the remedy constraints) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/App.vue |
| F-W1:105 | R-18 / C-11 / FR-CP-15 (value.js consumption gap) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:109 | C-1 = C-8 (the peer-graph identity) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:110 | MISS-LC2 (a REQUIRED peer filed NOWHERE) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:111 | C-3 (runtime peers filed as dead devDeps) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:112 | FR-EQC-7 (the vaul-vue lock gate) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:113 | PP-REDGATE (the RED gate belongs to the uplift) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/env.d.ts, web/src/components/paper/PaperView.vue |
| F-W1:114 | PAW-33 / C-19 / MF-12 / C-15+C-16 / C-13 (the manifest pass) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:115 | C-13 (pencil-boil ships raw TS) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/dev/FourierShapeExtractor.vue, web/src/components/ui/tooltip/index.ts |
| F-W1:119 | M-2 (the floor is `^0.9.2`, not `^0.11.2`) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:120 | C-18.2 (the 0.12.0 exclusion) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:121 | L-2 (the empty-loop resume) | cured (deleted) | web/src/components/decorative/SvgFilters.vue deleted at 5dfb744 |
| F-W1:122 | L-i3 / C-18.1 (census count) | homed (read) | a census correction to the record `lane-frontend.md`, not a code defect |
| F-W1:126 | census R3-10 / `:105` fleet row (`lucide-vue-next` → `@lucide/vue`) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:127 | D·D-M11 (sweep amendment) | cured (read) | EquationView.vue: grep `<svg` -> 0 (the hand-inlined Info glyph is gone) |
| F-W1:131 | M-α6 (`--ease-apple-spring` does not exist) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:132 | m-3 / F-3 (`--font-serif-math` declared nowhere) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:133 | FR-COB-24 (the root-font fork) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:134 | D-18/C-13 · D-20 · D-26 (substrate + spelling) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:138 | FR-AFP-3 + FR-AFP-46 + FR-AFP-61 (the light-mode re-ink, with its spli | cured (read) | AdminFlaggedPanel.vue: grep `text-red\|dark:` -> 0; the panel renders glass Alert/Card/Skeleton/ConfirmDialog on tokens (the hardcoded Tailwind reds are gone) |
| F-W1:139 | FR-AFP-19 / FR-AFP-20 / FR-AFP-27 / FR-AFP-44 / M-6 (rest-state tone + | open (cited lines unchanged) | web/src/components/visualization/gallery/AdminFlaggedPanel.vue: every cited cd26c65 line survives verbatim at master |
| F-W1:140 | FR-AFP-28 / FR-AUL-19 (the icon-geometry ladder) | cured (defect token gone) | present at cd26c65, absent from web/src+api at master: `size="icon"` |
| F-W1:141 | FR-AFP-37 (the dialog preset) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:142 | FR-AFP-16 / M-4 / GCM-13 / FR-USB-7 / FR-USB-18 / FR-EQR-13 (the `load | homed (producer/ruling) | hold noted at web/src/components/admin/AdminFlaggedPanel.vue, web/src/components/auth/UserSlugBar.vue |
| F-W1:143 | fr-PaperSearch / fr-PaperSearchDropdown / fr-PaperSearchInput token re | homed (producer/ruling) | names a glass/producer arm |
| F-W1:144 | FR-USB-3 / FR-USB-35 / FR-COB-13 / FR-MSP-5 / FR-EMT-14 (type + geomet | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): — |
| F-W1:145 | FR-COB-16 / D-13 / GAB-5 / MPC-16 / FR-EQC-5 (free cures the uplift la | open (read) | CanvasControlsDock.vue:110 Publish still binds `:active="publishing"` (in-flight drawn as on) |
| F-W1:149 | FR-GIG-5 (NON-CREDIT LOCK) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:150 | PAW-1 / PAW-37 / PAW-51 (the transaction as chartered is INSUFFICIENT) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:151 | FR-FG-20 (zero break surface at 4→7) | cured (deleted) | web/src/components/equation/FrequencyGraph.vue deleted at 950638c |
| F-W1:152 | D:U-2 / PSM-36 / PP-#7 / S-3 / PAW-37 (measured zeros) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:153 | fr-VisualizationView L-13/MAJ-3/MAJ-4 (the uplift's leverage) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:154 | FR-EQC-2 (inaction is a widening) | cured (deleted) | web/src/components/ui/CollapsibleSection.vue deleted at fcc5617; web/src/components/equation/EqCoefficientsPanel.vue deleted at f20ae5b |
| F-W1:158 | ESC-1 · the F.W1 target tag | homed (producer/ruling) | names a glass/producer arm |
| F-W1:159 | ESC-2 · ToC model ownership | cured (deleted) | web/src/components/paper/paperTree.ts deleted at cd414b2; web/src/components/paper/PaperSidebar.vue deleted at 6f1f600 |
| F-W1:160 | ESC-3 · the invisible-picker design | homed (producer/ruling) | names a glass/producer arm |
| F-W1:161 | ESC-4 · easing semantic drift acceptance | cured (id-cited at site) | `ESC-4` cited in the cure note at web/src/lib/easings.ts |
| F-W1:162 | ESC-5 · B-2's regrade price | homed (read) | a regrade-price ruling note (ESC-5), held on the G5 census ruling; not a code defect |
| F-W1:163 | ESC-6 · browser-support band | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W1:167 | NWO-1 · FR-COB-28's consolidated glass-ui BH relay letter | homed (producer/ruling) | names a glass/producer arm |
| F-W1:168 | NWO-2 · the method row (M-16, promoted) | homed (producer/ruling) | names a glass/producer arm |
| F-W1:169 | NWO-3 · MG-ι value.js-side | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W1:170 | NWO-4 · census corrections | open (cited lines unchanged) | web/src/components/paper/search/PaperSearchInput.vue: every cited cd26c65 line survives verbatim at master |
| F-W1:171 | NWO-5 · LATEX-RELAY | homed (producer/ruling) | hold noted at web/env.d.ts |
| F-W1:172 | NWO-6 · pencil-boil producer | homed (producer/ruling) | names a glass/producer arm |
| F-W4:12 | BS-1 · callsite-keyed blindness | cured (read) | eslint.config.js keyed-loop rule names BS-1; web/scripts/derive-loops.ts counts by directive |
| F-W4:13 | BS-2 · dynamic-`:is` blindness | cured (id-cited at site) | `BS-2` cited in the cure note at web/scripts/derive-loops.ts, web/scripts/derive-loops.vitest.ts |
| F-W4:14 | BS-3 · producer-internal loops | cured (id-cited at site) | `BS-3` cited in the cure note at web/scripts/derive-loops.ts, web/scripts/derive-loops.vitest.ts |
| F-W4:15 | BS-4 · `url(#id)` reference edges | cured (deleted) | web/src/components/decorative/SvgFilters.vue deleted at 5dfb744 |
| F-W4:16 | LOOP-SOURCE PROVENANCE | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:17 | DISCLOSURE-STATE GATE | cured (deleted) | web/src/components/ui/CollapsibleSection.vue deleted at fcc5617 |
| F-W4:18 | CORRECTED DENOMINATORS. | open (cited lines unchanged) | web/src/components/visualization/gallery/GalleryFeaturedCarousel.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:19 | REPAIR-UNIT SIZING | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:20 | EVIDENCE STANDARD | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:59 | AA-1 | cured (read) | useOffsetPagination.ts:50-60 generation ticket; AdminAuditLog renders an Alert on `error` with Try again |
| F-W4:60 | AA-3 | cured (read) | ActionCell is glass Badge (tone destructive/neutral); the five raw palette inks are gone |
| F-W4:61 | AA-4 | cured (read) | the chassis is glass Card plates; no `--muted` border literal in AdminAuditLog |
| F-W4:62 | AA-5 | cured (id-cited at site) | `AA-5` cited in the cure note at web/src/components/admin/AdminAuditLog.vue |
| F-W4:63 | AA-6 | cured (id-cited at site) | `AA-6` cited in the cure note at web/src/components/admin/AdminAuditLog.vue |
| F-W4:64 | AA-7 | cured (read) | appliedAction/appliedTarget are the request snapshot; drafts no longer feed fetchFn |
| F-W4:65 | AA-8 | cured (read) | useOffsetPagination.ts:2,120 isAbortError swallows the superseded abort |
| F-W4:66 | AA-9 | cured (read) | the ledger is glass DataTable with labelled columns (auditColumns) |
| F-W4:67 | AA-10 | cured (read) | IpCell renders actor.id whole when there is no ip_hash; the 10-char slice is aria-hidden with the full value sr-only |
| F-W4:68 | AA-11 | cured (read) | footer is the shared Pager component |
| F-W4:69 | AA-12 | cured (read) | DataTable carries aria-busy for its loading status |
| F-W4:70 | AA-13 | cured (read) | sr-only <label for> on both filters |
| F-W4:71 | AA-14 | cured (read) | filters are glass Input; no raw `focus:outline-none` |
| F-W4:72 | AA-15 | cured (read) | components/admin: grep `text-[0.65rem]` -> 0 |
| F-W4:73 | AA-16 | cured (read) | below the container breakpoint the ledger is glass's card-per-row projection |
| F-W4:74 | AA-17 | cured (read) | rows dim in place across page turns (no v-if spinner swap) |
| F-W4:75 | AA-18 | cured (read) | useOffsetPagination.ts:67 onScopeDispose abort |
| F-W4:76 | AA-19 | cured (read) | glass Badge |
| F-W4:77 | AA-20 | cured (read) | raw palette triples gone with the Badge |
| F-W4:78 | AA-21 | cured (read) | autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="search" on both filters |
| F-W4:79 | AA-22 | cured (read) | Button size="sm"; no `h-7` literal |
| F-W4:80 | AA-24 | cured (read) | actionTone splits verbs; `batch_users:delete` -> destructive |
| F-W4:81 | AA-25 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): api/services/database.py, web/src/components/admin/AdminAuditLog.vue |
| F-W4:82 | AA-26 | cured (read) | totalLabel passed to Pager unconditionally (:566) |
| F-W4:83 | AA-27 | cured (read) | lib/api.ts:68-69 inflight.delete on completion |
| F-W4:84 | AA-28 | open (read) | `if (!token) throw` here, but `getAdminToken()!` remains at 3 sites in web/src (idiom not retired) |
| F-W4:85 | AA-29 | cured (read) | AdminAuditLog has no rule-less <style scoped> |
| F-W4:86 | AA-30 | cured (read) | discharge row: derive-loops.ts counts the native v-for |
| F-W4:87 | AA-33 | cured (read) | empty headline branches on hasFilters (:533-535) |
| F-W4:88 | AA-34 | cured (read) | clear button holds its seat and disables (AA-34 note at the site) |
| F-W4:89 | AA-35 | cured (read) | toolbar Card is sticky (barTop) |
| F-W4:90 | AA-36 | open (read) | useOffsetPagination.ts:35 items is a deep `ref<T[]>`, not shallowRef |
| F-W4:91 | AA-37 | cured (read) | admin panels live in components/admin/ |
| F-W4:92 | AA-38 | open (read) | GalleryView.vue:33 defineAsyncComponent(loadAdminAuditLog) bare: no errorComponent/onError |
| F-W4:93 | AA-39 | cured (read) | glyphs aria-hidden; clear named by aria-label |
| F-W4:94 | AA-40 | open (read) | TargetCell discloses the full target by `title` only (the IP has an sr-only leg; the target does not) |
| F-W4:95 | AA-41 | cured (read) | no animate-spin left in AdminAuditLog |
| F-W4:96 | AA-42 | open (read) | TargetCell keeps `text-foreground/80` |
| F-W4:97 | AA-43 | cured (read) | glass Buttons replace the raw disabled:opacity-30 footer |
| F-W4:101 | FR-AFP-5 | cured (read) | AdminFlaggedPanel.vue:280-285 the queue Card is `v-show` with `aria-busy` and `opacity-60` while loading, so a mutation's reload no longer destroys the list subtree |
| F-W4:102 | FR-AFP-6 | cured (id-cited at site) | `FR-AFP-6` cited in the cure note at web/src/components/admin/AdminFlaggedPanel.vue |
| F-W4:103 | FR-AFP-8 rider | cured (id-cited at site) | `FR-AFP-8` cited in the cure note at web/src/components/gallery/GalleryView.vue |
| F-W4:104 | FR-AFP-11 | cured (id-cited at site) | `FR-AFP-11` cited in the cure note at web/src/stores/gallery.ts |
| F-W4:105 | FR-AFP-12 | cured (read) | AdminFlaggedPanel.vue:96/115/190/217 every catch guards `api.isAbortError(e)` |
| F-W4:106 | FR-AFP-14 | cured (id-cited at site) | `FR-AFP-14` cited in the cure note at web/src/components/admin/AdminFlaggedPanel.vue |
| F-W4:107 | FR-AFP-15 | cured (id-cited at site) | `FR-AFP-15` cited in the cure note at web/src/components/admin/AdminFlaggedPanel.vue |
| F-W4:108 | FR-AFP-16 | cured (id-cited at site) | `FR-AFP-16` cited in the cure note at web/src/components/admin/AdminFlaggedPanel.vue |
| F-W4:109 | FR-AFP-17 | cured (read) | AdminFlaggedPanel.vue:188/214 the success toasts carry `tone: "success"` |
| F-W4:110 | FR-AFP-19 rider | homed (read) | AdminFlaggedTable.vue: the rows are glass DataTable cells; the focus ring is the producer's (rides the glass DataTable row actions) |
| F-W4:111 | FR-AFP-21 | cured (read) | AdminFlaggedTable.vue:91 the queue renders the reported image (`thumbnailUrl(item.image_slug)`, media column, UIA-F-198 fallback tile) |
| F-W4:112 | FR-AFP-22 | cured (id-cited at site) | `FR-AFP-22` cited in the cure note at web/src/lib/api-problem.ts |
| F-W4:113 | FR-AFP-23 | cured (id-cited at site) | `FR-AFP-23` cited in the cure note at web/src/components/admin/AdminFlaggedPanel.vue |
| F-W4:114 | FR-AFP-59 | homed (producer/ruling) | hold noted at web/src/lib/types.ts |
| F-W4:115 | FR-AFP-60 | cured (read) | AdminFlaggedPanel.vue: the destructive confirm is glass `ConfirmDialog` (its footer owns order and gap); the hand-rolled DialogFooter is gone |
| F-W4:116 | FR-AFP-67 | homed (producer/ruling) | hold noted at web/src/components/admin/AdminFlaggedPanel.vue |
| F-W4:117 | FR-AFP-25 | cured (id-cited at site) | `FR-AFP-25` cited in the cure note at web/src/components/admin/AdminFlaggedPanel.vue, web/src/lib/api.ts |
| F-W4:118 | FR-AFP-26 | cured (read) | AdminFlaggedPanel.vue: grep `--type-admin-label\|text-admin` -> 0; the table rides `text-small` and glass DataTable's rungs |
| F-W4:119 | FR-AFP-30 | cured (id-cited at site) | `FR-AFP-30` cited in the cure note at web/src/components/admin/AdminFlaggedPanel.vue |
| F-W4:120 | FR-AFP-31 | cured (defect token gone) | present at cd26c65, absent from web/src+api at master: `reasonLabel(reason: string)`, `?? reason` |
| F-W4:121 | FR-AFP-35 | homed (producer/ruling) | hold noted at web/src/components/admin/AdminFlaggedPanel.vue |
| F-W4:122 | FR-AFP-38 | cured (id-cited at site) | `FR-AFP-38` cited in the cure note at web/src/components/admin/BatchActionBar.vue |
| F-W4:123 | FR-AFP-39 | cured (id-cited at site) | `FR-AFP-39` cited in the cure note at web/src/components/admin/BatchActionBar.vue |
| F-W4:124 | FR-AFP-41 (+FR-AFP-68) | homed (producer/ruling) | hold noted at web/src/components/admin/AdminFlaggedPanel.vue, web/src/components/gallery/GalleryView.vue |
| F-W4:125 | FR-AFP-42 | open (read) | AdminFlaggedPanel.vue: still zero props and zero emits with the fetch at setup top level (the seam the row names) |
| F-W4:126 | FR-AFP-43 | cured (read) | AdminFlaggedPanel.vue: the `role=status` region is gone; loading is a persistent `aria-busy` region (:282) and failure a glass Alert `announce="assertive"` |
| F-W4:127 | FR-AFP-45 | cured (read) | AdminFlaggedPanel.vue: grep `XCircle\|Star` -> 0 in the panel and AdminFlaggedTable.vue; the actions are AdminFlaggedActions with text labels |
| F-W4:128 | FR-AFP-58 | cured (id-cited at site) | `FR-AFP-58` cited in the cure note at web/src/components/admin/AdminFlaggedPanel.vue |
| F-W4:129 | FR-AFP-62 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:130 | FR-AFP-63 | homed (producer/ruling) | hold noted at web/src/components/admin/AdminFlaggedTable.vue |
| F-W4:131 | FR-AFP-65 | cured (defect token gone) | present at cd26c65, absent from web/src+api at master: `text-xs text-muted-foreground` |
| F-W4:132 | FR-AFP-50 | cured (read) | AdminFlaggedPanel.vue: the native-div loops are gone; the queue is glass DataTable (AdminFlaggedTable.vue) |
| F-W4:136 | FR-AUL-1 | cured (id-cited at site) | `FR-AUL-1` cited in the cure note at web/src/components/admin/AdminUserList.vue, web/src/components/admin/BatchActionBar.vue |
| F-W4:137 | FR-AUL-2 | homed (producer/ruling) | hold noted at web/src/components/admin/AdminUserList.vue, web/src/composables/useOffsetPagination.ts |
| F-W4:138 | FR-AUL-4 | homed (producer/ruling) | hold noted at web/src/composables/useOffsetPagination.ts |
| F-W4:139 | FR-AUL-5 | cured (id-cited at site) | `FR-AUL-5` cited in the cure note at web/src/components/admin/AdminUserList.vue |
| F-W4:140 | FR-AUL-7 | cured (id-cited at site) | `FR-AUL-7` cited in the cure note at web/src/components/admin/AdminUserTable.vue, web/src/components/admin/AdminUserToolbar.vue |
| F-W4:141 | FR-AUL-8 | cured (id-cited at site) | `FR-AUL-8` cited in the cure note at web/src/components/admin/AdminUserList.vue |
| F-W4:142 | FR-AUL-9 | cured (id-cited at site) | `FR-AUL-9` cited in the cure note at web/src/components/admin/AdminUserList.vue |
| F-W4:143 | FR-AUL-15 | cured (id-cited at site) | `FR-AUL-15` cited in the cure note at web/src/components/admin/AdminUserList.vue |
| F-W4:144 | FR-AUL-19 | cured (read) | AdminUserList.vue/AdminUserTable.vue: grep `h-6\|h-7` -> 0; row actions are one DropdownMenu trigger per row |
| F-W4:145 | FR-AUL-21 rider | open (read) | AdminUserTable.vue:83 still branches only on `status === "suspended"`; an `orphan-migrated` user renders as healthy |
| F-W4:146 | FR-AUL-22 | homed (producer/ruling) | hold noted at web/src/components/admin/AdminUserList.vue, web/src/components/gallery/GalleryView.vue |
| F-W4:147 | FR-AUL-23 | cured (id-cited at site) | `FR-AUL-23` cited in the cure note at web/src/components/admin/AdminUserToolbar.vue |
| F-W4:148 | FR-AUL-24 | cured (read) | AdminUserList.vue:422 the list Card is `v-show` (no `v-if` unmount on reload), so the dialog's restored focus target survives the mutation |
| F-W4:149 | FR-AUL-25 (copy leg) | cured (id-cited at site) | `FR-AUL-25` cited in the cure note at web/src/components/admin/AdminUserList.vue |
| F-W4:150 | FR-AUL-26 | cured (id-cited at site) | `FR-AUL-26` cited in the cure note at web/src/components/admin/AdminUserToolbar.vue |
| F-W4:151 | FR-AUL-29 | cured (read) | AdminUserList.vue:279 `handleSuspend` returns while `busy`; every catch guards `isAbortError` |
| F-W4:152 | FR-AUL-30 | cured (id-cited at site) | `FR-AUL-30` cited in the cure note at web/src/components/admin/AdminUserList.vue, web/src/lib/api.ts |
| F-W4:153 | FR-AUL-32 | cured (id-cited at site) | `FR-AUL-32` cited in the cure note at web/src/components/admin/AdminUserList.vue |
| F-W4:154 | FR-AUL-33 | cured (id-cited at site) | `FR-AUL-33` cited in the cure note at web/src/components/admin/BatchActionBar.vue, web/src/components/gallery/GalleryFeaturedCarousel.vue |
| F-W4:155 | FR-AUL-34 | cured (id-cited at site) | `FR-AUL-34` cited in the cure note at web/src/components/admin/AdminUserList.vue |
| F-W4:156 | FR-AUL-35 | cured (read) | AdminUserTable.vue: the select column is glass DataTable's; the hand-placed select-all column offset is gone |
| F-W4:157 | FR-AUL-36 | cured (id-cited at site) | `FR-AUL-36` cited in the cure note at web/src/components/admin/AdminUserList.vue |
| F-W4:158 | FR-AUL-37 | cured (id-cited at site) | `FR-AUL-37` cited in the cure note at web/src/components/admin/BatchActionBar.vue |
| F-W4:159 | FR-AUL-38 | cured (read) | AdminUserTable.vue:33 glass Checkbox at its own size; grep `h-4 w-4` on Checkbox -> 0 |
| F-W4:160 | FR-AUL-39 | cured (read) | AdminUserList.vue: grep `<style` -> 0 (the empty scoped block is deleted) |
| F-W4:161 | FR-AUL-40 | cured (id-cited at site) | `FR-AUL-40` cited in the cure note at web/src/components/admin/AdminUserToolbar.vue |
| F-W4:162 | FR-AUL-41 | cured (id-cited at site) | `FR-AUL-41` cited in the cure note at web/src/components/admin/AdminUserList.vue, web/src/components/admin/AdminUserToolbar.vue |
| F-W4:163 | FR-AUL-42 | cured (read) | AdminUserTable.vue: cells use the semantic rungs (`text-mono-small`, `text-mono-micro`); the thirteen `text-xs/text-sm` literals are gone from AdminUserList.vue |
| F-W4:164 | FR-AUL-43 | cured (read) | AdminUserList.vue/AdminUserTable.vue: grep `translate` -> 0 (no hover-lift on rows) |
| F-W4:165 | FR-AUL-44 | cured (read) | AdminUserTable.vue:153-155 the singular path says 'Suspend and revoke sessions'; AdminUserList.vue:180 batch confirms name the act and count |
| F-W4:166 | FR-AUL-47 | cured (id-cited at site) | `FR-AUL-47` cited in the cure note at web/src/components/admin/AdminUserList.vue |
| F-W4:167 | FR-AUL-48 | homed (read) | AdminUserTable.vue: rows are glass DataTable; per-row controls fall to one actions menu, the grid semantics are the producer's |
| F-W4:168 | FR-AUL-50 | cured (id-cited at site) | `FR-AUL-50` cited in the cure note at web/src/lib/api-problem.ts |
| F-W4:169 | FR-AUL-57 | open (read) | GalleryView.vue: the admin panels mount through bare `defineAsyncComponent(() => import(...))` with no loading or error component |
| F-W4:170 | FR-AUL-54 | cured (id-cited at site) | `FR-AUL-54` cited in the cure note at web/scripts/derive-loops.ts, web/scripts/derive-loops.vitest.ts |
| F-W4:174 | AC-D-1 | cured (read) | AnimationControls.vue: `.animation-dock:where(.expanded)` deleted (X-OD19 F1 comment); `.transport-face` carries the definite size |
| F-W4:175 | AC-D-4/L-2/C-3 | cured (read) | FullscreenViewer.vue: grep show-ghost\|toggle-ghost\|show-image-overlay -> 0 |
| F-W4:176 | AC-C-2 | open (read) | stores/animation.ts:173-186 `startTime = null` then `cycle = floor(elapsed/dur)` -> every restart resumes forward (cycle 0) |
| F-W4:177 | AC-D-12/C-20 | open (read) | AnimationControls.vue currentLevel still ends `return 1` when both payloads are null |
| F-W4:178 | AC-D-2 | cured (read) | `.play-btn` and its seven-stop rainbow deleted (X-DS F1-01); DockControl's flat [data-active] fill |
| F-W4:179 | AC-D-3 | cured (read) | `.play-btn` focus outline deleted with the button; DockControl carries the producer ring |
| F-W4:180 | AC-D-5 | cured (read) | `.summary-speed` deleted; the collapsed summary is the progress readout alone (X-OD19 F1) |
| F-W4:181 | AC-D-7/L-14 | open (read) | role=progressbar + name + value now present (a11y leg cured); the fill/track pair is 25% vs 8% foreground mix, still under the 3:1 non-text floor (contrast leg) |
| F-W4:182 | AC-D-8/C-19 | cured (read) | stores/animation.ts:32-42 prefersReducedMotion() read live at every decision point (SP-4, G-F4-PRM-CLOCK) |
| F-W4:183 | AC-C-12 | open (read) | BasisCanvas.vue:544 `exportFrame(options: Record<string, boolean> = {})` keeps the open record over a closed vocabulary |
| F-W4:184 | AC-M-2 | cured (read) | `.play-btn` hand-rolled glass deleted; DockControl is the producer's |
| F-W4:185 | AC-M-9 | cured (read) | useWorkspaceLoader.ts: grep `play()` -> 0 (the data watcher no longer resurrects playback) |
| F-W4:186 | AC-L-4/C-11 | open (read) | AnimationControls.vue:52 Math.round(pos) vs BasisCanvas.vue:295-298 Math.floor + lerp: two level rules |
| F-W4:187 | AC-L-5 | open (read) | the easedT -> level map lives at two sites with two rules (AnimationControls.vue:52, BasisCanvas.vue:295); no shared levelAt composable |
| F-W4:188 | AC-L-16/C-24 | open (read) | AnimationControls still takes activeBases by prop and reads store.basesData/epicycleData directly |
| F-W4:189 | AC-L-9/C-7 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:190 | AC-D-11/L-7/C-8/C-26 | cured (read) | FA path literals gone; lucide Pause/Play at size-4 (X-DS DS-F2-C10) |
| F-W4:191 | AC-C-14 | cured (read) | `.summary-speed { @apply text-base }` deleted with the summary speed |
| F-W4:192 | AC-C-15 | cured (read) | MetricBadge and its scoped color deleted from AnimationControls |
| F-W4:193 | AC-C-17 | cured (read) | lib/easings.ts: grep `linear: (t)` -> 0 |
| F-W4:194 | AC-C-21 | open (read) | AnimationControls.vue currentLevel reads epicycleData.components.length, not n_components |
| F-W4:195 | AC-C-22 | open (read) | AnimationControls.vue `activeBases?: string[]` open type |
| F-W4:196 | AC-L-10/C-23 | open (read) | AnimationControls.vue maxWidth default "960px" in the prop and again as the CSS var fallback `var(--animation-dock-max-width, 960px)`; bare string type |
| F-W4:197 | AC-L-11+M-10 | open (read: not located) | persisted speed/easing restore path not located by grep in stores/animation.ts at master |
| F-W4:198 | AC-L-12/C-25 | cured (read) | speed/easing are no longer written from this template (moved to SpeedSelect/EasingPicker); the timeline binds once via TimelineReadout |
| F-W4:199 | AC-C-27 | open (read) | `"fourier-epicycles"` literal: 27 occurrences / 11 files at master (no exported constant) |
| F-W4:200 | AC-D-13 | cured (read) | `::after` sheen deleted with `.play-btn` |
| F-W4:201 | AC-D-15 | cured (read) | one glyph size (size-4) in AnimationControls |
| F-W4:202 | AC-D-16 | cured (read) | AnimationControls' only transition is the icon swap on var(--ease-standard) |
| F-W4:203 | AC-D-17 | cured (read) | `::before` opacity transition and the 9999px radius deleted with `.play-btn` |
| F-W4:204 | AC-D-19 | cured (read) | tooltip and accessible name agree: 'Pause animation' / 'Play animation' at both |
| F-W4:205 | AC-D-20 | open (read) | the second style block still ships `.menu-popup` unscoped app-wide |
| F-W4:206 | AC-D-21 | cured (read) | grep `100dvw - 1rem` -> 0 in AnimationControls |
| F-W4:207 | AC-M-4 | cured (read) | nested backdrop-filter on `.play-btn` deleted with it |
| F-W4:208 | AC-M-5 | cured (read) | the collapsed speed badge is gone; speed reads on its own DockTrigger with aria-label "Playback speed" |
| F-W4:209 | AC-M-6 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/AnimationControls.vue, web/src/components/visualization/EasingPicker.vue |
| F-W4:210 | AC-M-7 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:211 | AC-M-8 | cured (read) | `.mini-fill` width transition deleted (SP-4 / M-8 comment at the site) |
| F-W4:212 | AC-M-12 | open (read) | MiniProgressReadout and TimelineReadout are functional components rendered in AnimationControls' own render, which reads anim.t: the parent effect still subscribes to the 60 Hz clock |
| F-W4:213 | AC-D-14 | cured (read) | FA glyphs replaced by lucide |
| F-W4:214 | AC-D-18 | open (read) | `<Transition name="icon-swap" mode="out-in">` at 0.15 s each way remains (INFO) |
| F-W4:215 | AC-D-22 | cured (read) | import block clean at master |
| F-W4:216 | AC-D-23 | cured (read) | the collapsed summary now surfaces position (MiniProgressReadout), not speed |
| F-W4:217 | AC-D-24 | open (read) | DropdownMenuContent still has no explicit `side` (INFO) |
| F-W4:218 | AC-C-29 | open (read) | web/e2e/visualization-crud.spec.ts:641 the a11y keystone is still `test.fixme` |
| F-W4:219 | AC-L-8 | homed (read) | NO-WAVE-OWNER budget note, not a runtime defect (F.W4 exhaustiveness-sweep budget) |
| F-W4:220 | GT-C-10/D-17 | cured (deleted) | web/src/components/visualization/GlassTimeline.vue deleted at 8e19043 |
| F-W4:221 | GT-C-19 | cured (deleted) | web/src/components/visualization/GlassTimeline.vue deleted at 8e19043 |
| F-W4:222 | SS-D-01/SS-L-04 | cured (read) | SpeedSelect.vue: no fixed rem trigger widths remain |
| F-W4:223 | SS-D-02/SS-L-02/SS-C-5 | cured (read) | SpeedSelect.vue: no literal heights remain; the control rides the producer floor |
| F-W4:224 | SS-D-03/D-11/SS-L-08/SS-C-4/SS-C-11 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:225 | SS-D-04/SS-C-3 | cured (read) | SpeedSelect.vue:67-69 trigger and items share the mono face |
| F-W4:226 | SS-C-8 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/SpeedSelect.vue, web/src/components/visualization/VisualizationView.vue |
| F-W4:227 | SS-D-05 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:228 | SS-D-06 | cured (defect token gone) | present at cd26c65, absent from web/src+api at master: `@apply text-sm` |
| F-W4:229 | SS-D-03-demoted/SS-L-03 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:230 | SS-MISS-HOVER | homed (producer/ruling) | names a glass/producer arm |
| F-W4:231 | SS-D-07 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:232 | SS-D-10/SS-C-14 + MISS-PILL | homed (producer/ruling) | names a glass/producer arm |
| F-W4:233 | SS-L-05/SS-C-13 | cured (id-cited at site) | `SS-L-05` cited in the cure note at web/src/stores/animation.ts |
| F-W4:234 | SS-L-07/SS-C-10 | cured (id-cited at site) | `SS-L-07` cited in the cure note at web/src/lib/defaults.ts, web/src/stores/animation.ts |
| F-W4:235 | SS-L-09 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/e2e/settings-persistence.spec.ts, web/src/components/visualization/SpeedSelect.vue |
| F-W4:236 | EP-D/D-8+L/i-2+C/m-1 | cured (read) | EasingPicker.vue: rows are DropdownMenuRadioItems carrying the label; the dead required `description` strings are not read and the chips are menu radio items (no tooltip owed) |
| F-W4:237 | EP-C/M-4 | open (read) | EasingPicker.vue writes anim.easing on the global store directly; no props/emits |
| F-W4:238 | EP-MISSED-A | homed (producer/ruling) | names a glass/producer arm |
| F-W4:239 | EP-D/D-15 | cured (read) | EasingPicker.vue has no scoped style block at master |
| F-W4:240 | EP-D/D-19 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:241 | EP-D/D-20 | cured (read) | EasingPicker.vue: no `min-width: 9rem`/`repeat(3,1fr)` chip grid; the menu lists radio items |
| F-W4:242 | EP-L/m-1 | open (read) | lib/easings.ts:329 getEasingSVGPath still bare-indexes `ANIMATION_EASINGS[name].fn` |
| F-W4:243 | EP-L/m-2+D/D-22+C/m-3 | cured (read) | EasingPicker.vue: no `as EasingName` casts; isAnimationEasingName narrows |
| F-W4:244 | EP-C/m-2 | cured (read) | stores/animation.ts:9-15 the renaming re-export through the store is retired (note at the site); EasingPicker imports @/lib/easings |
| F-W4:245 | EP-C/m-6 + LC-zero-coverage | open (read: not located) | the easing menu's covering test was not located by this read (no fixme on it at master; no spec found naming the menu) |
| F-W4:246 | EP-MISSED-F | open (read) | lib/easings.ts keeps two catalogues (EASING_PRESETS :186 and ANIMATION_EASINGS :233) |
| F-W4:247 | EP-L/m-6+D/D-23 | cured (defect token gone) | present at cd26c65, absent from web/src+api at master: `repeat(3, 1fr)` |
| F-W4:248 | EP-L/i-3 | cured (read) | EasingPicker.vue: no `@reference`/`@apply` |
| F-W4:249 | EP-L/i-5 | open (read) | EasingPicker.vue template still calls getEasingSVGPath(name) per binding |
| F-W4:250 | ECP-GEO-2 rider | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/auth/UserSlugBar.vue |
| F-W4:251 | ECP-RESOLVER | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/lib/easings.ts |
| F-W4:252 | ECP-GATE | cured (deleted) | web/src/components/visualization/EasingCurvePreview.vue deleted at b9995b3 |
| F-W4:253 | ECP-CARRY-1.4.3 / INVERT | cured (deleted) | web/src/components/visualization/EasingCurvePreview.vue deleted at b9995b3 |
| F-W4:254 | ECP-FLOOR / BARREL / ONECALL | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/composables/useFourierMorph.ts, web/src/composables/useMorphConfig.ts |
| F-W4:255 | ECP-R5-7-adjacent | cured (deleted) | web/src/components/visualization/EasingCurvePreview.vue deleted at b9995b3 |
| F-W4:259 | CCD-1 | cured (read) | CanvasControlsDock.vue: every DockControl carries its own `aria-label` (tree-wide scan: 0 unnamed DockControl) |
| F-W4:260 | ECD-C-3 | cured (read) | EditorControlsDock.vue: every DockControl carries its own `aria-label`, Save included (:136) |
| F-W4:261 | ECD-B-2 | cured (read) | EditorControlsDock.vue:101-118 the summary is never inerted under focus; the trigger lives in the never-inert `#persistent` region |
| F-W4:262 | CCD-M-2 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:263 | CCD-D-4/L-1/C-3 | open (read) | CanvasControlsDock.vue:110 Publish DockControl has no :disabled while `publishing`; re-entry rests on the parent |
| F-W4:264 | CCD-M-1 | cured (read) | VisualizationView.vue:157-161 (UIA-F-180) leaving edit mode asks save, discard or keep editing; nothing re-extracts silently |
| F-W4:265 | CCD-M-3 | cured (read) | FullscreenViewer.vue:45 (FB-1) the fullscreen editor is the wired one; no second tool-less editor |
| F-W4:266 | ECD-M-2 | cured (read) | ContourEditorCanvas.vue:26/:121 declares `showGhost` and paints the ghost path |
| F-W4:267 | CCD-D-3/L-8/C-8 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/CanvasControlsDock.vue |
| F-W4:268 | ECD-D-7 + ECD-D-8/C-12 | cured (read) | EditorControlsDock.vue:39-42 the magnet state reads in text (Off / radius), not by hue alone |
| F-W4:269 | CCD-D-6/L-4/C-6 ⊕ ECD-D-9/L-8 ⊕ ECD-INFO-3 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:270 | CCD-D-5/L-7/C-7 (+D-13/D-14) ⊕ ECD-D-10/L-4 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:271 | CCD-L-2/C-5 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:272 | ECD-D-2/L-3/C-1 (+C-13/C-22; K-8 extension) | homed (producer/ruling) | names a glass/producer arm |
| F-W4:273 | ECD-D-5 + ECD-D-6 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:274 | CCD-D-10/C-12/C-11 ⊕ ECD-D-12/C-4/C-5 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): — |
| F-W4:275 | CCD-D-9/C-15 + CCD-L-22 | cured (read) | CanvasControlsDock.vue:148-155 the collapsed face follows the dock's reactive state (no fixed Pencil) |
| F-W4:276 | CCD-C-9 ⊕ CCD-M-8 ⊕ ECD-C-10/C-11 fold | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): — |
| F-W4:277 | ECD-M-5 ⊕ ECD-M-6 ⊕ ECD-M-7 | cured (read) | EditorControlsDock.vue:151-160 Smooth is `Sparkles`, the resting face is not `Wand2`, `Eye` no longer doubles, the `Image` import is gone |
| F-W4:278 | ECD-D-3+D-13+D-14 (+C-21) | homed (producer/ruling) | names a glass/producer arm |
| F-W4:279 | CCD-D-11/L-17 | open (cited lines unchanged) | web/src/components/visualization/CanvasControlsDock.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:280 | CCD-D-17/L-5/L-11/C-21 | cured (read) | VisualizationView.vue:51-52 ghost and overlay both persist through `useViewState` |
| F-W4:281 | CCD-D-8 | cured (read) | CanvasControlsDock.vue:90-191 every popover/tooltip side is "bottom"; no unpaintable side="top" |
| F-W4:282 | CCD-C-10 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:283 | CCD-M-5 ⊕ CCD-M-6 ⊕ CCD-M-7 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:284 | CCD-D-15 · D-16 · D-18 · L-14/C-23 · L-24-residual · L-25/C-16/D-19/C- | cured (read) | CanvasControlsDock.vue: grep `view-btn-wrap` -> 0 |
| F-W4:285 | ECD-D-15/D-16/C-18 · D-17 · D-19/L-11/C-16 · C-8/L-10/D-20/C-25 · D-21 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:286 | ECD-D-4 | cured (read) | EditorControlsDock.vue: grep `dock-spacer` -> 0 |
| F-W4:287 | ECD-M-3 | cured (read) | VisualizationView.vue:157-161 the history is the dirty flag; a selection is not an edit |
| F-W4:288 | CCD-C-26 ⊕ ECD-M-4 | open (read) | web/e2e/visualization-crud.spec.ts:641 the dock-reaching axe keystone is still `test.fixme` |
| F-W4:289 | CCD-D-20/L-21-addendum · D-21/C-17 · C-20 · M-9 | homed (read) | F-W4 §422 books it as a no-action latent (explicitly not an SS-13 slot); read latent at master |
| F-W4:290 | ⟨CCD R5-7 scope note⟩ | homed (producer/ruling) | names a glass/producer arm |
| F-W4:294 | FR-AH-1 | cured (id-cited at site) | `FR-AH-1` cited in the cure note at web/src/components/layout/DarkModeToggle.vue |
| F-W4:295 | FR-AH-2 · MISS-FONT | cured (id-cited at site) | `FR-AH-2` cited in the cure note at web/src/style.css |
| F-W4:296 | FR-AH-3 (+FR-AH-44/-56) | cured (deleted) | web/src/components/layout/AppHeader.vue deleted at 53aaa6f |
| F-W4:297 | FR-AH-4 | cured (deleted) | web/src/components/layout/AppHeader.vue deleted at 53aaa6f |
| F-W4:298 | FR-AH-5 | cured (deleted) | web/src/components/layout/AppHeader.vue deleted at 53aaa6f |
| F-W4:299 | FR-AH-6 | cured (id-cited at site) | `FR-AH-6` cited in the cure note at web/src/components/visualization/composables/useCanvasHover.ts, web/src/components/visualization/composables/useWorkspaceLoader.ts |
| F-W4:300 | FR-AH-7 | cured (id-cited at site) | `FR-AH-7` cited in the cure note at web/src/composables/useFourierMorph.ts, web/vite.config.ts |
| F-W4:301 | FR-AH-8 ⊕ FR-AH-9 ⊕ FR-AH-20 ⊕ FR-AH-21 ⊕ DMT M-3 ⊕ FMD-5/-6/-9 | homed (producer/ruling) | hold noted at web/src/components/layout/DarkModeToggle.vue, web/src/components/layout/DarkModeToggle.vue |
| F-W4:302 | DMT M-1 | cured (read) | DarkModeToggle.vue:212 `watch(isDark, …)` follows every writer of the global singleton |
| F-W4:303 | DMT M-2 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/layout/DarkModeToggle.vue |
| F-W4:304 | FR-AH-10 (+FR-AH-17) | cured (deleted) | web/src/components/layout/AppHeader.vue deleted at 53aaa6f |
| F-W4:305 | FR-AH-11 (+MISS-3) ⊕ FMD-13 ⊕ FMD-N3 ⊕ FMD-27 | cured (id-cited at site) | `FR-AH-11` cited in the cure note at web/src/style.css |
| F-W4:306 | FR-AH-12 (+FR-AH-18) | cured (deleted) | web/src/components/layout/AppHeader.vue deleted at 53aaa6f |
| F-W4:307 | FR-AH-14 | cured (read) | AppDock.vue:233 nav rows carry aria-current="page"; the menu is a named nav (UIA-F-231) |
| F-W4:308 | FR-AH-15 (+FR-AH-55) | cured (deleted) | web/src/components/layout/AppHeader.vue deleted at 53aaa6f |
| F-W4:309 | FR-AH-16 (+FR-AH-29) ⊕ FM-21 | cured (id-cited at site) | `FM-21` cited in the cure note at web/src/style.css |
| F-W4:310 | FM-1 (= FMD-2) | cured (id-cited at site) | `FM-1` cited in the cure note at web/src/components/decorative/FourierMorphSvg.vue, web/src/components/morph/MorphShapePreview.vue |
| F-W4:311 | FM-2 | cured (id-cited at site) | `FM-2` cited in the cure note at web/src/style.css |
| F-W4:312 | FM-3 (+FM-20 compounding; = FMD-10) ⊕ FMD-N6 | cured (id-cited at site) | `FM-3` cited in the cure note at web/src/components/morph/HarmonicLevelGrid.vue |
| F-W4:313 | FM-20 (= FMD-1) | cured (id-cited at site) | `FM-20` cited in the cure note at web/src/components/morph/FourierMorphDemo.vue, web/src/components/morph/HarmonicLevelGrid.vue |
| F-W4:314 | FMD-4 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:315 | FMD-7 | open (read) | useMorphConfig.ts:118-123 the config still reaches the morph through `syncWith`'s pre-flush deep watcher over a spread copy |
| F-W4:316 | FMD-14 ⊕ FMD-15 | cured (id-cited at site) | `FMD-14` cited in the cure note at web/src/components/morph/MorphPhaseConfig.vue |
| F-W4:317 | FMD-16 | cured (id-cited at site) | `FMD-16` cited in the cure note at web/src/components/morph/HarmonicLevelGrid.vue |
| F-W4:318 | FMD-18 ⊕ FMD-19 | homed (producer/ruling) | hold noted at web/e2e/contrast-pairs.ts, web/src/components/morph/HarmonicLevelGrid.vue |
| F-W4:319 | FMD-N1 | open (read) | useMorphConfig.ts:92 `computePreviewLevels(config.lowLevel, config.highLevel, …)` still injects the live bounds into the ladder |
| F-W4:320 | FMD-N5 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/morph/FourierMorphDemo.vue |
| F-W4:321 | FMD-N4 ⊕ FMD-N2 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/layout/DarkModeToggle.vue, web/src/components/morph/FourierMorphDemo.vue |
| F-W4:322 | DMT M-4 · M-5 · M-6 · M-7 · M-8 | open (read) | web/src: grep setDisableTransitions -> 0 (the singleton's transition guard is still never called) |
| F-W4:323 | DMT N-1 · N-2 · N-3 · N-5 · N-6 · N-7 · N-8 · N-9 · N-12 · N-13 · N-14 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:324 | FM-23 ⊕ FM-22 ⊕ FMD-26 ⊕ FR-AH-37/-53 | cured (id-cited at site) | `FM-23` cited in the cure note at web/src/lib/svg-fourier.ts |
| F-W4:325 | FM-24 | open (read) | useMorphConfig.ts:120 the getter still allocates `{...config}` per run under `deep: true` |
| F-W4:326 | FMD-22 ⊕ FR-AH-31 ⊕ DMT D-M1/L-7/C-5 | cured (id-cited at site) | `FMD-22` cited in the cure note at web/src/composables/useFourierMorph.ts, web/src/lib/scheduler.ts |
| F-W4:327 | FR-AH-19 · -23 · -25 · -26 · -27 · -28 · -32 · -34 · -35 · -36 · -39.. | cured (id-cited at site) | `FR-AH-19` cited in the cure note at web/eslint.config.js |
| F-W4:328 | FR-AH-43 | cured (deleted) | web/src/components/layout/AppHeader.vue deleted at 53aaa6f |
| F-W4:329 | FMD-25 · FMD-28 · FMD-29 · FMD-30 · FMD-31 · FMD-33 · FMD-34 · FMD-35  | cured (id-cited at site) | `FMD-29` cited in the cure note at web/src/style.css |
| F-W4:330 | FM-17..FM-19 / FMD-3 | cured (id-cited at site) | `FM-19` cited in the cure note at web/src/composables/useMorphConfig.ts |
| F-W4:334 | FR-CP-D1 | open (cited lines unchanged) | web/src/components/equation/ConvergencePlot.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:335 | FR-CP-LB2 | cured (read) | ConvergencePlot.vue:103 the tick nulls rafId on its early return; :116 guarded cancel; :566-570 onUnmounted clears playing |
| F-W4:336 | FR-CP-LB3 | cured (read) | ConvergencePlot.vue: grep fullSum -> 0; the curve matrix is computed off `t` (trigHarmonics/dcTerm computeds) |
| F-W4:337 | FR-CP-LM1 (+C-20) | cured (read) | ConvergencePlot.vue:503-509 the watcher passes `old` points/harmonics to snapshotForTransition |
| F-W4:338 | FR-CP-LM2 ⊕ M-L1 | cured (read) | ConvergencePlot.vue:529 watch on props.domain redraws |
| F-W4:339 | FR-CP-LM3 + D-26 | cured (read) | ConvergencePlot.vue:547-552 IntersectionObserver gates the clocks (L-M3 + D-26 note) |
| F-W4:340 | FR-CP-D9/C-2 ⊕ M-D1 (THE CURE CONSTRAINT) | homed (producer/ruling) | names a glass/producer arm |
| F-W4:341 | FR-CP-LM4 + C-12 (+M-L3) | cured (read) | ConvergencePlot.vue: grep tArr -> 0 |
| F-W4:342 | FR-CP-LM5 + C-10 (+M-L2) | cured (read) | ConvergencePlot.vue:219 the per-draw canvas.width reassignment is gone (note at the site) |
| F-W4:343 | FR-CP-LM7 + C-8 | cured (read) | ConvergencePlot.vue:433 the partial sum reads S_N, never "f(x) =" (UIA-F-201) |
| F-W4:344 | FR-CP-D5 | cured (read) | ConvergencePlot.vue:590-591 the plot box is role="img" with a plotDescription label |
| F-W4:345 | FR-CL-D2 ⊕ M-R2 ⊕ M-R3 ⊕ D-18 | open (read) | ConvergenceLegend.vue:38-46 the legend entries are still bare `<div>`s with pointer handlers, no role or tabindex |
| F-W4:346 | FR-CL-D1 + C-3 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:347 | FR-CL-M-R1 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/convergence/ConvergenceLegend.vue |
| F-W4:348 | FR-CL-D9 + D-L2 ⊕ D-L3 + D-L10/C-6.1 ⊕ C-11 ⊕ D-25 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:349 | FR-CL-M-R13 (THE CONTRACT EDIT) | open (read) | ConvergenceLegend.vue:20 `leave: []` still carries no key |
| F-W4:350 | FR-CL-D7 ⊕ D-8 ⊕ D-10 ⊕ M-R7 | cured (read) | ConvergenceLegend.vue:2/:31 the well is glass `FadingScroll` |
| F-W4:351 | FR-CL-D5 ⊕ D-6/D-L9/C-10.1 ⊕ M-R6 ⊕ M-R8 | open (cited lines unchanged) | web/src/components/equation/convergence/ConvergenceLegend.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:352 | FR-CL-C5 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:353 | FR-CL-D3 · D-4 · D-11 · D-12/C-9 · D-13 · D-14/D-L8 · D-16 · C-12 · C- | homed (producer/ruling) | names a glass/producer arm |
| F-W4:354 | ⊘ FR-CL ANCHOR LOCK (K-10) | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:355 | FR-CT-D3/C-2/D-1 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:356 | FR-CT-D4/C-3/D-3 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:357 | FR-CT-D5/C-4/D-9 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/convergence/ConvergenceTimeline.vue |
| F-W4:358 | FR-CT-D5b/C-5 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:359 | FR-CT-D4b (D·D-4) ⊕ D-9 (L·D-9) | homed (producer/ruling) | names a glass/producer arm |
| F-W4:360 | FR-CT-D8/C-12 ⊕ D-6 ⊕ D-10/D-15/C-6 ⊕ D-11/D-12/C-10 ⊕ D-8/C-11 ⊕ D-13 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:361 | FR-CT-M1 | open (read) | ConvergencePlot.vue: still two template roots (`.convergence-container`, `ConvergenceTimeline`) with no `inheritAttrs` |
| F-W4:362 | FR-CP-C7 | open (read) | ConvergencePlot.vue:438 tooltip labels A = harm.amplitude from the regrouped trig series while the DTO ships \|c_n\| (lib/equation/api.ts:43): no reconciliation located |
| F-W4:363 | FR-CP-D10 ⊕ D-12 ⊕ D-16 ⊕ D-17 ⊕ D-18 ⊕ D-19 ⊕ D-20 ⊕ D-21/C-21 ⊕ D-22 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/ConvergencePlot.vue, web/src/components/equation/convergence/ConvergenceLegend.vue |
| F-W4:364 | FR-CP-LM8/C-9 ⊕ L-m4 ⊕ L-m6 ⊕ L-m7 ⊕ L-m9 ⊕ L-m10 ⊕ L-m11 ⊕ L-m12 ⊕ L- | cured (read) | lib/equation/render.ts:14,105 escapeHtml in every KaTeX catch |
| F-W4:365 | FR-CP-C24/L-i3 ⊕ FR-CL-D-L13 ⊕ FR-CT-D14/D-19/C-15 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): — |
| F-W4:366 | FR-CP-§5.1 ⊕ §5.3 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:367 | FR-CP-16 (= FrequencyGraph C-8/L-m4 fold) | open (cited lines unchanged) | src/fourier_analysis/epicycles.py: every cited cd26c65 line survives verbatim at master |
| F-W4:368 | ⊘ FR-CP-R-7 RULING (CoefficientsPanel, two arms split — carried VERBAT | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:369 | FR-FG-12 ⊕ FR-FG-13 ⊕ FR-FG-21 | cured (deleted) | web/src/components/equation/FrequencyGraph.vue deleted at 950638c |
| F-W4:370 | FR-EQC-residue | cured (deleted) | web/src/components/equation/EqCoefficientsPanel.vue deleted at f20ae5b |
| F-W4:371 | FR-CS-i1 | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:372 | HLG-7 | cured (id-cited at site) | `HLG-7` cited in the cure note at web/src/components/morph/HarmonicLevelGrid.vue |
| F-W4:373 | HLG-35 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/morph/HarmonicLevelGrid.vue |
| F-W4:374 | HLG-13 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:375 | HLG-37 | homed (producer/ruling) | hold noted at web/e2e/contrast-floor.spec.ts, web/e2e/contrast-pairs.ts |
| F-W4:376 | HLG-15 ⊕ HLG-16 ⊕ HLG-18 ⊕ HLG-25 ⊕ HLG-26 ⊕ HLG-29 ⊕ HLG-31 ⊕ HLG-33  | homed (producer/ruling) | names a glass/producer arm |
| F-W4:377 | ⊘ HLG-41 ORDERING EDICT | cured (read) | HarmonicLevelGrid.vue:38 the only :style left is `--levels-per-row`; the dead VIZ_COLORS.chebyshev bindings are gone |
| F-W4:378 | HLG-38 ⊕ HLG-39 ⊕ HLG-36 ⊕ HLG-44 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:379 | ⊘ HLG-20 GATE-FALSITY CARRY | homed (producer/ruling) | hold noted at web/e2e/visual-baseline.spec.ts, web/e2e/visualization-ux.spec.ts |
| F-W4:383 | EV-B-1 (= FR-EMT-1) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): api/models/equations.py, api/routers/equations.py |
| F-W4:384 | EV-B-2 (= FunctionInput L-B1/C-1) | cured (id-cited at site) | `EV-B-2` cited in the cure note at web/src/components/equation/EquationView.vue |
| F-W4:385 | EV-L·M-4/C·C-34 (RD-1) ⊕ R2-N6 ⊕ R2-r4 | homed (producer/ruling) | hold noted at web/src/lib/api.ts |
| F-W4:386 | EV-D·D-B4 (= L·M-5 = C·D-07) | cured (read) | EquationView.vue:500,591 `loading` drives aria-busy and the status row |
| F-W4:387 | EV-C·D-02 (+D·D-M7) | open (cited lines unchanged) | web/src/lib/api-problem.ts: every cited cd26c65 line survives verbatim at master |
| F-W4:388 | EV-L·M-3/C·C-29 | open (read) | useEquationCache.ts:100,115 two sessionStorage records (STATE_KEY, RESULT_KEY) with separate write paths |
| F-W4:389 | EV-L·M-2 (+I-2 witness) ⊕ L·M-7 | open (read) | lib/equation/api.ts:27,53 fixed operation-named abort keys `eq-compute`/`eq-simplify` remain |
| F-W4:390 | ⊘ R2-N7 (the abort-identity exhibit) | open (read) | `eq-simplify` is still a module-global operation key (useSimplifiedSeries.ts:67, lib/equation/api.ts:53) |
| F-W4:391 | EV-D·D-B1 (= FR-EQR-9/-11) | cured (read) | web/src: grep info-anchor / copy-pos -> 0 (the 3.25rem cross-component constant is gone) |
| F-W4:392 | EV-D·D-B2 | cured (defect token gone) | present at cd26c65, absent from web/src+api at master: `HoverCardTrigger as-child` |
| F-W4:393 | EV-D·D-B3 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/EquationView.vue, web/src/lib/equation/notation.ts |
| F-W4:394 | EV-M-FR (the clipped focus ring) | homed (producer/ruling) | names a glass/producer arm |
| F-W4:395 | EV-D·D-M3 ⊕ M-CP | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/EquationView.vue, web/src/components/visualization/CanvasControlsDock.vue |
| F-W4:396 | EV-D·D-M6 | cured (read) | EquationView.vue:508,591,601 role=status on the skeleton and status rows; panel aria-busy |
| F-W4:397 | EV-D·D-M1 (= FR-EQR-10) ⊕ R2-N1 | open (cited lines unchanged) | web/src/components/equation/EquationView.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:398 | R2-N2 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/EquationView.vue |
| F-W4:399 | FR-EQR-4 | cured (id-cited at site) | `FR-EQR-4` cited in the cure note at web/src/components/equation/EquationResult.vue, web/src/lib/equation/render.test.ts |
| F-W4:400 | ⊘ FR-EQR-17 — THE DESIGNATED CURE VEHICLE (routing fact; DISSENT-1 liv | cured (id-cited at site) | `FR-EQR-17` cited in the cure note at web/src/lib/equation/render.ts |
| F-W4:401 | FR-EQR-15 / -16 / -19 (the singleton's cargo) | cured (id-cited at site) | `FR-EQR-15` cited in the cure note at web/src/lib/equation/render.ts |
| F-W4:402 | FR-EQR-5 ⊕ FR-EQR-7 ⊕ FR-EQR-26 ⊕ FR-EQR-25 ⊕ FR-EQR-13 | homed (producer/ruling) | hold noted at web/src/components/equation/EquationResult.vue, web/e2e/contrast-floor.spec.ts |
| F-W4:403 | FR-EQR-6 | cured (id-cited at site) | `FR-EQR-6` cited in the cure note at web/e2e/equation-interaction.spec.ts, web/e2e/visualization-ux.spec.ts |
| F-W4:404 | FR-EQR-8 | cured (id-cited at site) | `FR-EQR-8` cited in the cure note at web/src/components/equation/EquationResult.vue |
| F-W4:405 | R2-N3 ⊕ R2-N4 ⊕ R2-r2 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:406 | EV-M-US ⊕ EV-M-TL ⊕ EV-D·D-M4 ⊕ EV-D·D-M2 ⊕ EV-D·D-M13/m2/C·D-13 ⊕ EV- | homed (producer/ruling) | names a glass/producer arm |
| F-W4:407 | EV-L·m-1 ⊕ m-2 ⊕ m-3 ⊕ m-5 ⊕ m-7 ⊕ m-10 ⊕ m-11 ⊕ m-12 ⊕ m-13 ⊕ I-1 ⊕ I | homed (producer/ruling) | names a glass/producer arm |
| F-W4:408 | ⊘ EV reader-unattacked carry (4, flagged) | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:409 | ⊘ EV/EQR ANCHOR LOCK (K-10, TWO records) | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:410 | EQP-D-3/C-5 ⊕ D-2/C-11/M-N4 ⊕ D-4/C-6/D-L16 ⊕ D-5/D-L14/C-11 ⊕ D-6 ⊕ D | homed (producer/ruling) | names a glass/producer arm |
| F-W4:411 | ⊘ EQP-M-N11 (the ONE-EDIT lock) | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/AnimationControls.vue, web/src/components/visualization/EquationPanel.vue |
| F-W4:412 | EQP-M-N12 ⊕ M-N13 ⊕ M-N15 ⊕ M-N16 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:413 | FR-EMT-14 ⊕ FR-EMT-15 ⊕ FR-EMT-18 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:414 | FI-L-M3 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/equation/FunctionInput.vue |
| F-W4:415 | FI-N-5 | homed (producer/ruling) | hold noted at web/src/components/equation/EquationView.vue, web/src/components/equation/FunctionInput.vue |
| F-W4:416 | FI-L-M4 ⊕ L-m6 ⊕ L-m7 ⊕ L-m8 ⊕ L-m9 ⊕ L-m10 ⊕ C-7 ⊕ C-10 ⊕ D-16 ⊕ D-18 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:417 | FR-NP-7 ⊕ FR-NP-8 ⊕ FR-NP-12 ⊕ FR-NP-14 ⊕ FR-NP-15 ⊕ FR-NP-17 ⊕ FR-NP- | cured (id-cited at site) | `FR-NP-14` cited in the cure note at web/src/lib/defaults.ts |
| F-W4:418 | ⊘ FR-NP-2 SUBSTRATE RIDER (F.W0-owned, binding on THIS wave) | cured (id-cited at site) | `FR-NP-2` cited in the cure note at web/scripts/derive-loops.ts, web/scripts/derive-loops.vitest.ts |
| F-W4:419 | EXM-N-16-instance | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/layout/DarkModeToggle.vue, web/src/components/visualization/ExportModal.vue |
| F-W4:423 | PSM-1 (= PV D/B-1 = C-01b) | cured (id-cited at site) | `PSM-1` cited in the cure note at web/e2e/paper-search.spec.ts, web/src/components/paper/PaperSearch.vue |
| F-W4:424 | PSM-2 ⊕ PSM-6 ⊕ PSM-3 (= PV D/B-2 = C-01 = L/D4 = PaperSidebar L-2/C-B | cured (id-cited at site) | `PSM-3` cited in the cure note at web/src/components/paper/PaperView.vue |
| F-W4:425 | PSM-13 ⊕ PSM-4 ⊕ PSM-12 | homed (producer/ruling) | hold noted at web/e2e/contrast-pairs.ts, web/src/components/paper/search/PaperSearchModal.vue |
| F-W4:426 | PSM-5 ⊕ PSM-30 | cured (id-cited at site) | `PSM-5` cited in the cure note at web/src/components/paper/search/paperSearchIndex.ts |
| F-W4:427 | PSM-14 | cured (id-cited at site) | `PSM-14` cited in the cure note at web/e2e/unit/paper-search-scoring.vitest.ts, web/e2e/unit/paper-search.vitest.ts |
| F-W4:428 | PSM-9 | cured (id-cited at site) | `PSM-9` cited in the cure note at web/src/components/paper/search/paperSearchIndex.ts |
| F-W4:429 | PSM-7 (+PSM-39) | cured (id-cited at site) | `PSM-7` cited in the cure note at web/src/components/paper/search/paperSearchIndex.ts |
| F-W4:430 | PSM-8 ⊕ PSM-10 ⊕ PSM-11 ⊕ PSM-27 ⊕ PSM-28 ⊕ PSM-31 | homed (producer/ruling) | hold noted at web/src/components/paper/search/paperSearchIndex.ts, web/src/components/paper/search/searchHelpers.ts |
| F-W4:431 | PSM-15 ⊕ -16 ⊕ -17 ⊕ -18 ⊕ -19 ⊕ -20 ⊕ -21 ⊕ -22 ⊕ -23 ⊕ -25 ⊕ -26 ⊕ - | homed (producer/ruling) | names a glass/producer arm |
| F-W4:432 | PV-L/D1 ⊕ L/D20 ⊕ L/D12 | cured (read) | PaperView.vue:210-217 the restore id is read at entry, before the watcher can clear it |
| F-W4:433 | PV-★MF-1 | cured (id-cited at site) | `MF-1` cited in the cure note at web/src/components/paper/PaperView.vue |
| F-W4:434 | PV-★MF-2 ⊕ D/B-4 ⊕ D/m-6 ⊕ D/m-17 ⊕ D/M-13 | homed (producer/ruling) | hold noted at web/e2e/paper-search.spec.ts, web/src/components/paper/search/PaperSearchInput.vue |
| F-W4:435 | PV-★MF-10 (= PaperSidebar L-10) | cured (id-cited at site) | `MF-10` cited in the cure note at web/e2e/contrast-pairs.ts, web/src/components/paper/PaperView.vue |
| F-W4:436 | PV-D/M-1 ⊕ D/M-2 ⊕ D/M-4 ⊕ D/m-16 ⊕ PaperSidebar D-M10 | cured (read) | useScrollNavigation.ts:64 both smooth-scroll sites consult reduced motion |
| F-W4:437 | PV-D/M-8 ⊕ D/M-9 ⊕ D/M-7 ⊕ ★MF-8 ⊕ PaperSidebar D-B2/D-B3/D-M3 | homed (producer/ruling) | hold noted at web/src/components/paper/PaperPageReadout.vue |
| F-W4:438 | PV-D/M-10 ⊕ D/M-11 ⊕ D/M-12 ⊕ D/M-14 ⊕ D/M-15 ⊕ D/m-14 ⊕ PaperSidebar  | homed (producer/ruling) | names a glass/producer arm |
| F-W4:439 | PS-L-1 ⊕ L-5(a) ⊕ C-M4 ⊕ D-B1 | cured (deleted) | web/src/components/paper/PaperSidebar.vue deleted at 6f1f600; web/src/components/paper/MobileFloatingToc.vue deleted at 6f1f600 |
| F-W4:440 | PS-L-4 (+M6) | cured (deleted) | web/src/components/paper/paperTree.ts deleted at cd414b2; web/src/components/paper/PaperSidebar.vue deleted at 6f1f600 |
| F-W4:441 | ⊘ PS-M2 (RELAY-BEFORE-RENAME LOCK) | cured (deleted) | web/src/components/paper/PaperSidebar.vue deleted at 6f1f600 |
| F-W4:442 | PS-M4 ⊕ M5 ⊕ L-3 ⊕ L-6 ⊕ L-7 ⊕ L-9 ⊕ L-12 ⊕ L-13 ⊕ L-15 ⊕ D-M7(b) ⊕ D- | cured (deleted) | web/src/components/paper/PaperSidebar.vue deleted at 6f1f600 |
| F-W4:443 | PV-D/B-2 body ⊕ L/D2 ⊕ L/D3 ⊕ L/D5+L/D30 ⊕ L/D6 ⊕ L/D8 ⊕ L/D26 ⊕ L/D27 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:444 | PV-★MF-3..★MF-7 ⊕ D/m-1 ⊕ D/m-5 ⊕ D/m-8 ⊕ D/m-9 ⊕ D/m-13 ⊕ D/m-18 ⊕ D/ | homed (producer/ruling) | hold noted at web/src/components/paper/PaperView.vue |
| F-W4:445 | PAW-1 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:446 | ⊘ PAW-44 under LAW-3 (the wave's sharpest sequencing law) | homed (producer/ruling) | hold noted at web/src/components/paper/useScrollNavigation.ts |
| F-W4:447 | ⊘ PAW-30 (double-latent, lands WITH PAW-1) | homed (producer/ruling) | names a glass/producer arm |
| F-W4:448 | ⊘ PAW-47 under LAW-4 | cured (id-cited at site) | `PAW-47` cited in the cure note at web/src/components/paper/useScrollNavigation.ts |
| F-W4:449 | ⊘ PAW-52 under LAW-5 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/paper/PaperArticleWindow.vue |
| F-W4:450 | PAW-8 ⊕ PAW-41 ⊕ PAW-48 ⊕ PAW-40 ⊕ PAW-31 ⊕ PAW-35 ⊕ PAW-54 | cured (id-cited at site) | `PAW-8` cited in the cure note at web/src/components/paper/PaperWindowSection.vue |
| F-W4:451 | PAW-28 ⊕ PAW-45 ⊕ PAW-46 ⊕ PAW-38 ⊕ PAW-39 ⊕ PAW-32 ⊕ PAW-35-comment ⊕ | cured (id-cited at site) | `PAW-50` cited in the cure note at web/e2e/unit/figure-set-equality.vitest.ts, web/vitest.config.ts |
| F-W4:452 | PAW-36 ⊕ PSD-L:§6 ⊕ CS-m-14 ⊕ SF-L-5 | cured (id-cited at site) | `PAW-36` cited in the cure note at web/scripts/derive-loops.ts |
| F-W4:453 | ⊘ CS-i-7 (the tally law) | cured (deleted) | web/src/components/ui/CollapsibleSection.vue deleted at fcc5617 |
| F-W4:454 | FR-TT-1 ⊕ FR-TT-8 ⊕ FR-TT-12 | cured (id-cited at site) | `FR-TT-1` cited in the cure note at web/e2e/visual-checkpoint.spec.ts |
| F-W4:455 | FR-IC-3 ⊕ FR-IC-4 ⊕ FR-IC-5 ⊕ FR-IC-24 ⊕ FR-IC-6 ⊕ FR-IC-10 ⊕ FR-IC-18 | cured (deleted) | web/src/components/equation/InfoCard.vue deleted at 5842377 |
| F-W4:459 | ⊘ FR-GFC-9 / GM-F1 — THE DELETE-OR-REVIVE RULING (this wave's ONE auth | cured (read) | web/src/components/visualization/gallery/GalleryMarquee.vue deleted at d028f0c (D1 RULED DELETE); the ruling is executed |
| F-W4:460 | GM-1 ⊕ GM-2 ⊕ GM-M3 ⊕ GM-M5 ⊕ GM-M6 ⊕ GM-20 | cured (deleted) | web/src/components/visualization/gallery/GalleryMarquee.vue deleted at d028f0c |
| F-W4:461 | GM-3 ⊕ GM-14 ⊕ GM-19 ⊕ GM-5 | cured (deleted) | web/src/components/visualization/gallery/GalleryMarquee.vue deleted at d028f0c |
| F-W4:462 | GM-21 | cured (deleted) | web/src/components/visualization/gallery/GalleryMarquee.vue deleted at d028f0c |
| F-W4:463 | GM-4 ⊕ GM-15 ⊕ GM-6 ⊕ GM-7 ⊕ GM-8 ⊕ GM-9 ⊕ GM-10 ⊕ GM-11 ⊕ GM-12 ⊕ GM- | homed (producer/ruling) | names a glass/producer arm |
| F-W4:464 | GAB-1 | homed (producer/ruling) | hold noted at web/e2e/contrast-floor.spec.ts, web/e2e/contrast-pairs.ts |
| F-W4:465 | GAB-3 ⊕ GAB-4 ⊕ GAB-10 ⊕ GAB-20 ⊕ GAB-21 | homed (producer/ruling) | hold noted at web/src/components/gallery/GalleryAdminBanner.vue, web/src/stores/gallery.ts |
| F-W4:466 | GAB-6 ⊕ GAB-7 ⊕ GAB-8 ⊕ GAB-9 ⊕ GAB-19 ⊕ GAB-22 ⊕ GAB-27 | homed (producer/ruling) | hold noted at web/src/components/gallery/GalleryAdminBanner.vue, web/src/components/gallery/GalleryAdminBanner.vue |
| F-W4:467 | GAB-14 ⊕ GAB-15 ⊕ GAB-17 ⊕ GAB-24 ⊕ GAB-26 ⊕ GAB-28 ⊕ GAB-11-note | cured (id-cited at site) | `GAB-14` cited in the cure note at web/src/components/gallery/GalleryAdminBanner.vue |
| F-W4:468 | FR-GFC-1 (= FR-GSB-1) | cured (id-cited at site) | `FR-GFC-1` cited in the cure note at web/src/stores/gallery.ts |
| F-W4:469 | FR-GFC-2 ⊕ FR-GFC-23 ⊕ FR-GFC-20 | homed (producer/ruling) | hold noted at web/src/components/gallery/GalleryFeaturedCarousel.vue, web/src/components/gallery/GalleryFeaturedCarousel.vue |
| F-W4:470 | FR-GFC-12 ⊕ -13 ⊕ -15 ⊕ -16 ⊕ -17 ⊕ -18 ⊕ -19 ⊕ -22 ⊕ -25 ⊕ -27 ⊕ -28 | open (cited lines unchanged) | web/src/components/visualization/gallery/GalleryFeaturedCarousel.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:471 | FR-GSB-18 ⊕ FR-GSB-11f ⊕ FR-GSB-20 | open (read) | GallerySearchBar.vue:108 the clear Button is still `v-if="searchQuery"` and nothing refocuses the field |
| F-W4:472 | GCM-1 ⊕ GCM-25 ⊕ VV-BLK-1 | cured (id-cited at site) | `GCM-1` cited in the cure note at web/src/components/gallery/GalleryView.vue |
| F-W4:473 | VV-R2-B | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/e2e/fixtures/gallery.ts, web/src/components/visualization/VisualizationView.vue |
| F-W4:474 | VV-R2-A ⊕ VV-R2-E | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/visualization/VisualizationView.vue |
| F-W4:475 | FR-USB-1 | cured (id-cited at site) | `FR-USB-1` cited in the cure note at web/e2e/coarse-pointer.spec.ts, web/playwright.config.ts |
| F-W4:476 | FR-USB-3 | cured (defect token gone) | present at cd26c65, absent from web/src+api at master: `size="icon"` |
| F-W4:477 | FR-USB-4 ⊕ FR-USB-15 ⊕ FR-USB-9 ⊕ FR-USB-36 | cured (id-cited at site) | `FR-USB-9` cited in the cure note at web/src/lib/api-problem.ts |
| F-W4:478 | FR-USB-5 ⊕ FR-USB-12 ⊕ FR-USB-14 ⊕ FR-USB-13 ⊕ FR-USB-33 | homed (producer/ruling) | hold noted at web/e2e/contrast-pairs.ts, web/e2e/gallery.spec.ts |
| F-W4:479 | FR-USB-2 ⊕ FR-USB-6 ⊕ FR-USB-7 ⊕ FR-USB-8 ⊕ FR-USB-32 ⊕ FR-USB-27 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/auth/UserSlugBar.vue |
| F-W4:480 | FR-USB-10 ⊕ FR-USB-11 ⊕ FR-USB-25 ⊕ FR-USB-17..-20 ⊕ -28 ⊕ -29 ⊕ -30 ⊕ | cured (id-cited at site) | `FR-USB-10` cited in the cure note at web/src/components/auth/UserSlugBar.vue |
| F-W4:481 | ⊘ FR-EQR-27 / r2-K7 NORMALIZE-UP SWEEP | homed (producer/ruling) | names a glass/producer arm |
| F-W4:482 | IU-8 ⊕ IU-14 ⊕ IU-25 ⊕ IU-F6 | cured (id-cited at site) | `IU-25` cited in the cure note at web/src/lib/api.ts |
| F-W4:483 | GIG-D-1-residue ⊕ GIG-L-12 | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/gallery/GalleryInfiniteGrid.vue, web/src/components/shared/CoefficientsSpectrum.vue |
| F-W4:484 | GV-L-5 | cured (read) | GalleryView.vue:117-120 the one search timer is cleared before each re-arm; the row's own consequence is killed by the same return (demoted MINOR) |
| F-W4:488 | CP-2 ⊕ CP-16 | cured (deleted) | web/src/components/visualization/ContourPreview.vue deleted at 9a1d932 |
| F-W4:489 | ⊘ CP-ROW-40 — THE FRAMING-CLUSTER SINGLE CURE | open (cited lines unchanged) | web/src/components/visualization/ContourEditorCanvas.vue: every cited cd26c65 line survives verbatim at master |
| F-W4:490 | CP-7 ⊕ CP-42 ⊕ CP-17 ⊕ CP-19 | cured (deleted) | web/src/components/visualization/ContourPreview.vue deleted at 9a1d932 |
| F-W4:491 | CP-6 ⊕ CP-12 ⊕ CP-35 ⊕ CP-34 | cured (deleted) | web/src/components/visualization/ContourPreview.vue deleted at 9a1d932 |
| F-W4:492 | CP-5 ⊕ CP-8 ⊕ CP-9 ⊕ CP-10 ⊕ CP-11 ⊕ CP-18 ⊕ CP-20 ⊕ CP-21 ⊕ CP-25 ⊕ C | cured (deleted) | web/src/components/ui/PathPreview.vue deleted at d63bd93; web/src/components/visualization/ContourPreview.vue deleted at 9a1d932 |
| F-W4:493 | ⊘ CP KILL-6 (NEGATIVE ROSTER, carried) | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:494 | ⊘ CS-K-9 ANCHOR LOCK | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:495 | ⊘ MPC-31 — THE ONE-CUT LAW (carried verbatim) | cured (id-cited at site) | `MPC-31` cited in the cure note at web/e2e/slider-scrub-contrast.spec.ts, web/src/components/morph/MorphPhaseConfig.vue |
| F-W4:496 | MPC-7 ⊕ MPC-8 ⊕ MPC-9 ⊕ MPC-24 ⊕ MPC-25 ⊕ MPC-26 ⊕ MPC-27 ⊕ MPC-30 ⊕ M | cured (id-cited at site) | `MPC-8` cited in the cure note at web/src/components/morph/MorphPhaseConfig.vue |
| F-W4:497 | ⊘ FR-MSP-6 — THE TWO-CHANNEL LOCK (void-cure) | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:498 | ⊘ FR-MSP-10 — the NAME-CURE LOCK | cured (id-cited at site) | `FR-MSP-10` cited in the cure note at web/src/components/morph/MorphShapePreview.vue |
| F-W4:499 | FR-MSP-7 ⊕ FR-MSP-8 ⊕ FR-MSP-9 ⊕ FR-MSP-1 ⊕ FR-MSP-2 ⊕ FR-MSP-3 | homed (producer/ruling) | hold noted at web/e2e/contrast-pairs.ts |
| F-W4:500 | MSP-D-15 ⊕ D-16 ⊕ D-18 ⊕ D-20 ⊕ D-21 ⊕ D-22 ⊕ D-24 ⊕ L-07 ⊕ L-17 ⊕ C-1 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:501 | FSE-D-1 ⊕ FSE-M-4 | homed (producer/ruling) | hold noted at web/src/components/dev/FourierShapeExtractor.vue, web/e2e/visual-baseline.spec.ts |
| F-W4:502 | FSE-D-3 ⊕ D-4 ⊕ D-5 ⊕ D-6/D-7 ⊕ D-8 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:503 | ⊘ FSE-L-B1 — DO-NOT-REGENERATE (negative roster) | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:504 | FSE-L-M6 ⊕ L-M4 ⊕ D-9/L-i2/C-17 ⊕ D-10 ⊕ D-11 ⊕ D-12 ⊕ D-14 ⊕ D-15 ⊕ D | open (no cure receipt) | no deletion, no id citation, no token change found at master; file(s): web/src/components/dev/FourierShapeExtractor.vue |
| F-W4:505 | ⊘ PP-AGGLOM ⊕ PP-SEVLAW (NEGATIVE ROSTER, NO-WAVE-OWNER intake strikes | cured (deleted) | web/src/components/ui/PathPreview.vue deleted at d63bd93 |
| F-W4:506 | PP-PREFLIGHT ⊕ PP-PAR | cured (deleted) | web/src/components/ui/PathPreview.vue deleted at d63bd93; web/src/components/visualization/EasingCurvePreview.vue deleted at b9995b3 |
| F-W4:507 | ⊘ SC-L-§R SCOPE LAW (F.W4 census law) | homed (read) | a record/law row (ruling, lock, roster or provenance note), not a code defect; it stands in the wave record |
| F-W4:508 | FV-1/FV-2 family ⊕ FV-8 ⊕ FV-9 ⊕ FV-11 ⊕ FV-12 ⊕ FV-13 ⊕ FV-14 ⊕ FV-15 | homed (producer/ruling) | hold noted at web/src/components/visualization/FullscreenViewer.vue, web/e2e/fullscreen.spec.ts |
| F-W4:509 | VV-L-15..L-25 ⊕ D-14..D-31 ⊕ VV-R2-D ⊕ M1..M10 ⊕ L-29 | homed (producer/ruling) | names a glass/producer arm |
| F-W4:537 | Shell / header | homed (read) | not a defect row: the audit's file roster (shell / header) |
| F-W4:538 | Morph route | homed (read) | not a defect row: the audit's file roster (morph route) |
| F-W4:539 | Equation route | homed (read) | not a defect row: the audit's file roster |
| F-W4:540 | Visualize route | homed (producer/ruling) | names a glass/producer arm |
| F-W4:541 | Gallery route | homed (read) | not a defect row: the audit's file roster |
| F-W4:542 | Paper route | homed (read) | not a defect row: the audit's file roster |
| F-W4:543 | Shared | homed (read) | not a defect row: the audit's file roster |
| F-W4:544 | Demo harness | homed (read) | not a defect row: the audit's file roster (demo harness) |
