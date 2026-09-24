SERVED MODEL: claude-opus-5-5

# X·F F.W14U — execution record (the fourier UI-audit rows, whole)

Spec: `docs/tranches/X/fourier/waves/F-W14U.md` (58 lines, read whole: Units · Close · addenda §0cq, (b) §0cr, §0cs, §0ct, (c) §0cu, (d) §0cv). Authority: COHESION §0cl (minted) + §0cm..§0cv (read to the file end, :3253-3375); §0i/§0j standing. Register: `audit/UI-AUDIT-fourier.md` (256 rows). Tree: fourier-analysis `m/w1-bump-migration`.

## Open

SEAT 0 (OPEN), `claude-opus-5-5`, 2026-09-24 (execution under the owner's begin-word of 2026-09-17).

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only (nothing under `web/`, `api/`). value.js: `execution/C/F-W14U.md` absent before this seat; no dirty path in this seat's set (the dirty `INBOX.md` hunk is Track B's O-72 row, `B/KF-W13V.md` is Track B's; not touched). **Nothing inherited.**

**Preconditions ("Opens after: F.W14 CLOSED").**
| condition | at the bytes | ledger |
|---|---|---|
| F.W14 CLOSED | ⟨`grep -n "^| F.W14 " LEDGER.md`⟩ → `:85` status **CLOSED 2026-09-17 (honest-RED … G-u→F.W14U)**, RESUME 3 Check 2 CONFORMANT-HONEST-RED at fourier `67ad614` | event line `:762` "→ CLOSED" |
| fourier HEAD = the closed tree | ⟨`git rev-parse --short HEAD`⟩ → `67ad614`; ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `67ad614f2dcf` (= origin) | — |
| named artefacts | `F-W14U.md` present · `audit/UI-AUDIT-fourier.md` 460 lines, 256 `UIA-F` rows (parsed ⟨python over `^| UIA-F-`⟩ → `256`) · `.u` receipt `C/F-W14.md:415-516` + Repair 2 `:780-829` present | — |
| glass installed | ⟨`web/package.json`⟩ `"@mkbabb/glass-ui": "10.0.1"`; node_modules `10.0.1` | — |
| instrument (§0cn/§0cv) | ⟨`curl :3100`⟩ `200` · ⟨`curl :8000/api/gallery/cursor?limit=1`⟩ `200` (`items: []`, fresh DB) · ⟨`nc -z localhost 27018`⟩ succeeded · load 27.19/25.26/21.82 | — |

All preconditions MET.

**E13 Step-0 mail sweep (2026-09-24 ~11:50 EDT).** Paths: (1) value.js `docs/tranches/V/` + `V/coordination/`; (2) glass `docs/tranches/BK/coordination/` — ⟨`ls -td glass-ui/docs/tranches/*/`⟩ → `BL/ BK/ …`: BL is the newest dir but has no `coordination/`; BK/coordination stays the mail path (as every sweep since 09-23 records); (3) keyframes `docs/tranches/V/coordination/`; (4) atlas `docs/tranches/P/coordination/`. ⟨`find <path> -maxdepth 1 -type f -newermt "2026-09-24 00:00"`⟩ → value.js: `INBOX.md` only · glass BK: `valuejs-outbound-2026-09-24-{configurator-header-actions,dock-collapsed-form,side-dock-edge,select-grey-dock-motion}.md` (value.js's own O-65..O-68 mirrors, outbound, rowed) · glass BL: `FORMATION-PROGRESS.md` (glass-internal cursor) · keyframes: none · atlas: none. ⟨`git -C glass-ui log --since "2026-09-24 11:00" --oneline`⟩ → 8 `docs(BL)` formation commits, none addressed to value.js/fourier. Newest inbound rows I-48..I-51 (O-65..O-68 registrations) are rowed. **0 unrowed · 0 UNREAD in F.W14U scope.** No INBOX line appended by this seat: the file carries Track B's uncommitted O-72 hunk, and a pathspec commit of `INBOX.md` would sweep it (the C3-3 contamination §0cp cures); the sweep is recorded here instead.

## Baseline

BEFORE, read-only, fourier `67ad614` (= origin). Probe script committed at `docs/tranches/X/fourier/evidence/W14U/open/s-probe2.mjs`; its frames `s-before-{1440,1024,390}.png` sit beside it on disk (PNG paths there are gitignored; not force-added).

| gate | BEFORE | reading |
|---|---|---|
| **G-u** register (Close 1) | **RED** | 95/256 dispositioned at F.W14's close (`.u` 88 + Repair 2's 7). Owed to this wave: **165 rows** = 136 OPEN consumer (BROKEN F-9 F-14 · 43 HIGH · 65 MEDIUM · 26 LOW) + 24 SPLIT consumer halves + F-39, plus the server cures now granted (`api/**`): F-35, F-83, F-112 (ROUTED-SERVER in `.u`) and F-46's server half. ⟨python over `.u`'s lists `C/F-W14.md:466-469` + the split/server rows, minus Repair 2's 7⟩ → `owed 165` |
| **G-s** detached pane (OA-59) | **RED** | ⟨`s-probe2.mjs`, headless Chromium, a fresh upload `/w/foggy-flying-claret-hound`⟩ → 1440: `.configurator-aside` x1031 w400, right gutter **9 px**, `border-radius 0px`, **no box-shadow**; 390: aside x5 w393, **right −8 px** (past the viewport). Frames `s-before-{1440,1024,390}.png` |
| **G-t** ToC drawer (OA-60) | **RED** | no ToC hide toggle: ⟨`grep -n "localStorage\|drawer" PaperSidebar.vue PaperView.vue`⟩ → 0 storage/drawer hits; two components ⟨`wc -l`⟩ `PaperSidebar.vue 475` + `MobileFloatingToc.vue 473` (DRY owed) |
| **G-d** collapsed dock (OA-57) | honest-RED DOCK-COLLAPSED-FORM (O-65) | producer half open at glass (I-48, D2 pass 2); consumer read owed |
| **G-a** header actions (OA-69) | **RED** | ⟨`grep -n actions node_modules/@mkbabb/glass-ui/dist/components/configurator/ConfiguratorLayer.vue.d.ts`⟩ → 0 hits at installed 10.0.1: `#actions` unpublished (O-68 / I-51) → honest-RED CONFIGURATOR-HEADER-ACTIONS |
| **G-b** blob integrity (§0cv) | **RED** (source + §0cv measurement) | `api/services/image_storage.py:221` `_resolve(uri).read_bytes()` unguarded → `FileNotFoundError` → 500 (the five blob-500 tests of F.W14 Close 2, ESC-C4-1); the dedup-hit branch `:104-132` reads the primary bytes and swallows the failure (`except Exception` → warning), never re-storing the missing file. No live delete was made (dev store not mutated at open) |
| GLASS-SELECT-GREY · SIDE-DOCK-EDGE | honest-RED (O-66 · O-67) | call-site / ancestor-chain reads owed (`.d`); Select call sites ⟨`grep -rln "<Select\b\|SelectTrigger" web/src`⟩ → 5 files |
| `vue-tsc -b` | GREEN | ⟨`npx vue-tsc -b` ×2⟩ → exit 0 · exit 0 |
| `vitest` | GREEN | ⟨`npx vitest run` ×2⟩ → `Test Files 14 passed (14)` · `Tests 86 passed (86)` ×2 |
| full e2e `--workers=1` ×2 | named baseline set (cited) | not re-run at open: F.W14 RESUME 3 Check 2 read it ×2 at the identical HEAD `67ad614` → `11 failed · 184 passed` ×2 = the named set exactly (load 16.7→31.2); the close re-reads it |

**GREEN-BEFORE-CURE:** none. `vue-tsc`/`vitest` are hold gates, not born-RED.

## Unit plan

15 units, **strictly serial** (one at a time; the wave's `Agents` line is "Opus 5.5, every seat"; the orchestrator caps intra-wave concurrency at 1). Order: the addendum units first (§0cq "run before the family units": `.s` → `.t` → `.d`, then `.a`, `.b`), then the server unit (its endpoints feed the BROKEN consumer halves F-35/F-39/F-46), then the families with BROKEN rows first (`.vdock` F-9/F-14 · `.eq` F-35 · `.gallery` F-39/F-46), then the rest. Families follow the register's page sections; row→family is the register's first page (⟨python, coverage check⟩ → `owed 165 covered 165 missing [] extra [] dups []`). Units that share a file (VisualizationView.vue: `.s`/`.vstage`/`.vedit`; `paper/**`: `.t`/`.paper`; GalleryCard.vue: `.gallery`/`.admin`; AppDock.vue: `.d`/`.shell`) are serial by this order.

**Per row (every family unit):** served-page frame BEFORE (headed, 1440 + 390, the themes the row names) → root cure (glass idiom, no local glass copy) → falsifier in the unit's own additive spec `web/e2e/f-w14u-<unit>.spec.ts`, RED against the pre-cure bytes, GREEN ×2 → frame AFTER → disposition in the receipt. GLASS halves: relay-only, cite O-59/O-63, or a dated addendum beside O-59 for a new glass half. Fourier launches export `MONGO_URI=mongodb://localhost:27018/fourier` (§0cn). Frames under `web/e2e/screenshots/f-w14u/<unit>/`.

**Honest-RED ids carried:** named baseline set · GLASS-VEIL-GREY (O-62) · DOCK-TRIGGER-CLIP (O-63) · DOCK-SCROLL-MORPH (O-55) · DOCK-COLLAPSED-FORM (O-65) · GLASS-SELECT-GREY (O-66) · SIDE-DOCK-EDGE (O-67) · CONFIGURATOR-HEADER-ACTIONS (O-68); P-2-ADOPT recorded only if glass ships P-2.

| # | unit | spec § | rows / scope | writable (fourier unless noted; `web/e2e/f-w14u-<unit>.spec.ts` + `web/e2e/screenshots/f-w14u/<unit>/` additive in every web unit) |
|---|---|---|---|---|
| 1 | `.s` | §0cq `.s` :29 + (b) :41-42 | OA-59 detached pane (G-s) | `web/src/components/visualization/VisualizationView.vue` |
| 2 | `.t` | §0cq `.t` :30-37 + (b) :43-45 | OA-60 ToC drawer (G-t); PaperSidebar + MobileFloatingToc → one component | `web/src/components/paper/{PaperSidebar,MobileFloatingToc,PaperView}.vue`, `paperToc.ts`, one new `web/src/components/paper/PaperToc.vue` |
| 3 | `.d` | §0cq `.d` :38 + §0cs :46-47 + §0ct :49-50 | OA-57 consumer half; GLASS-SELECT-GREY call sites; SIDE-DOCK-EDGE ancestor chain | `web/src/components/layout/AppDock.vue`, `web/src/components/visualization/{CanvasControlsDock,EditorControlsDock,AnimationControls}.vue`; consumer grey class/dead prop only at `ContourSettings.vue`, `SpeedSelect.vue`, `gallery/GallerySearchBar.vue`, `gallery/AdminUserList.vue`, `morph/MorphPhaseConfig.vue` |
| 4 | `.a` | (c) §0cu :52-55 | OA-69 CONFIGURATOR-HEADER-ACTIONS | none in fourier (slot unpublished at 10.0.1, pin not in bounds); value.js receipt only |
| 5 | `.b` | (d) §0cv :57-58 | blob integrity (G-b) | `api/services/image_storage.py`, `api/routers/images.py`, new `api/tests/test_blob_integrity.py` |
| 6 | `.srv` | Units :8-18 ("Bounds" :18, `api/**` grant) | server halves F-35 F-39 F-46 F-83 F-112 | `api/**` (routers `equations.py` `visualizations.py` `gallery.py`, models, tests additive); §0bt adjacent: the named lines of `src/fourier_analysis/symbolic/simplification.py:15-31` (F-35) and `latex_rendering.py:32,:104,:143` (F-83) |
| 7 | `.vdock` | Units :8-18 · register visualize-animation-more-menu / -view-options-popover / -fullscreen / -export-modal | 23: **F-9 F-14** (BROKEN) F-76 F-77ˢ F-79 F-80ˢ F-81 F-82 F-92 F-93 F-94ˢ F-124ˢ F-137ˢ F-148ˢ F-173 F-174 F-175 F-181 F-182 F-229ˢ F-240 F-243 F-244 | `web/src/components/visualization/{AnimationControls,SpeedSelect,EasingPicker,CanvasControlsDock,FullscreenViewer,ExportModal,BasisCanvas}.vue`, `web/src/components/morph/MorphPhaseConfig.vue` (F-81's one shared editor), `web/src/lib/easings.ts`, `web/src/components/visualization/composables/useCanvasSetup.ts` |
| 8 | `.vstage` | register visualize-empty / -loading-error / -loaded-image-mode / -publish-flow | 24: F-68 F-69 F-70 F-71 F-73 F-74 F-95 F-132ˢ F-133ˢ F-136ˢ F-146ˢ F-165 F-166 F-167 F-168 F-169 F-170 F-171 F-172 F-183 F-237 F-238 F-239 F-245 | `VisualizationView.vue`, `{ImageUpload,BasisSelector,ContourSettings,CoefficientsPanel,GlassTimeline}.vue`, `visualization/lib/canvas-drawing/**`, `visualization/composables/{useImageUpload,useWorkspaceLoader}.ts`, `web/src/stores/workspace.ts`, `web/src/style.css` |
| 9 | `.vedit` | register visualize-contour-editor / -equation-panel | 13: F-83 (consumer half) F-85ˢ F-86 F-87 F-88ˢ F-89 F-176 F-177 F-178 F-179 F-180 F-241 F-242 | `{ContourEditorCanvas,EditorControlsDock,EquationPanel,VisualizationView}.vue`, `visualization/composables/usePointDrag.ts` |
| 10 | `.eq` | register equation-explorer | 12: **F-35** (BROKEN, consumer half) F-112 (consumer half) F-113 F-114 F-201..F-207 F-253 | `web/src/components/equation/**`, `web/src/components/ui/{SliderControl,CollapsibleSection}.vue` |
| 11 | `.gallery` | register gallery-public / -card-modal / -drafts / visualization-saved F-96 | 18: **F-39 F-46** (BROKEN, consumer halves) F-96 F-97 F-98 F-99 F-101 F-102 F-103 F-184..F-190 F-247 F-248 | `web/src/components/visualization/GalleryView.vue`, `gallery/{GalleryCard,GallerySearchBar,GalleryCardModal,GalleryDraftsSection,GalleryFeaturedCarousel}.vue`, `web/src/stores/gallery.ts`, `web/src/lib/api.ts` |
| 12 | `.admin` | register gallery-admin-banner-batch / -users / -flagged / -audit | 23: F-104 F-105ˢ F-106ˢ F-107ˢ F-109 F-110 F-111 F-144ˢ F-149ˢ F-191..F-200 F-249..F-252 | `gallery/{GalleryAdminBanner,BatchActionBar,AdminUserList,AdminAuditLog,AdminFlaggedPanel,GalleryCard}.vue`, `web/src/composables/useOffsetPagination.ts` |
| 13 | `.paper` | register paper-desktop / -search-inline / -search-modal / -mobile-floating-toc | 18: F-60ˢ F-61 F-64 F-66 F-67 F-147ˢ F-156..F-164 F-234 F-235 F-236 | `web/src/components/paper/**` |
| 14 | `.shell` | register shell-app-dock / -about-popover / -login-inline / -nav-dropdown / toasts | 20: F-52 F-53 F-54 F-55 F-57ˢ F-121 F-128ˢ F-130ˢ F-150..F-155 F-214 F-219ˢ F-231 F-232 F-233 F-256 | `web/src/components/layout/**`, `gallery/{UserSlugBar.vue,adminError.ts}`, `web/src/composables/useToast.ts`, `web/src/App.vue` |
| 15 | `.misc` | register morph-demo / shape-extractor-internal / root-redirect-and-404 / F-246 | 14: F-115 F-117 F-118 F-119 F-120 F-208 F-209 F-210 F-211 F-212 F-213 F-246 F-254 F-255 | `web/src/components/morph/**` (after `.vdock`), `web/src/router/index.ts`, `web/src/stores/auth.ts` (shape extractor = `morph/FourierShapeExtractor.vue`) |

ˢ = SPLIT row: glass half already ROUTED (O-59/O-63); the consumer half is owed here. `.admin` rows exactly: F-104 F-105 F-106 F-107 F-109 F-110 F-111 F-144 F-149 F-191 F-192 F-193 F-194 F-195 F-196 F-197 F-198 F-199 F-200 F-249 F-250 F-251 F-252. `.eq` F-201..F-207 = 7 ids; `.gallery` F-184..F-190 = 7 ids; `.paper` F-156..F-164 = 9 ids; `.shell` F-150..F-155 = 6 ids. Server rows appear in `.srv` and in their consumer family (both halves owed); unique total 165.

**Gates each family unit turns:** G-u for its rows (each CURED with falsifier RED→GREEN ×2, or ROUTED by id) · `vue-tsc -b` 0 · `vitest` GREEN · its own spec ×2 + non-regression of `f-w14-uia*.spec.ts` rows on its surface. **Close (a verify seat, not a unit):** 256/256 dispositioned; full e2e `--workers=1` ×2 with load; REDs ⊆ named set ∪ honest-RED ids.

## Unit receipts

### F.W14U.s

SEAT `.s`, `claude-opus-5-5`, 2026-09-24. Spec `F-W14U.md` §0cq `.s` :29 + (b) §0cr :41-42 (read whole, 58 L); COHESION §0cq/§0cr (+ §0cs..§0cv read to the file end, :3321-3375).

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only; value.js `C/F-W14U.md` clean. **Nothing inherited.**

**Anchors at true bytes (fourier `67ad614`).** ⟨live DOM probe, 1440, fresh upload⟩ → `.viz-configurator` = glass's shell (`configurator-shell glass-floating rounded-panel border overflow-hidden`, 12 px, x8 r8); `.configurator-aside` x1031 w400 r9, `border-inline-start 1px`, radius 0, no shadow; `.viz-panel-left-wrap` fills it (r9, radius 0, no shadow). Glass's aside holds glass's `FadingScroll` (`configurator-controls`); the wrap is fourier's, inside it. At 1024 the glass container rule (`inline-size >= 64rem`) is not met (shell 1006 px), so the aside stacks under the stage. At 390 the column (`[data-slot=configurator]`, fourier's mobile `display:flex`) measured **w393.1 inside a 380 px shell**: the shell grid's single `auto` track took its item's min-content (the section labels' `truncate` text), so the right 8 px sat past the shell edge (clipped there, `right −8`). The spec anchor holds; the one drift is recorded: the "Configurator card" that can show `--radius-card` and a shadow on the pane is glass's **`Card`** primitive (`@mkbabb/glass-ui/card`: `.card { border-radius: var(--radius-card) }`, `shadow` prop → `.card.glass-resting[data-shadow] { box-shadow: var(--card-cast) }`). The shell is one card around stage **and** aside, and glass has no inset mode for its aside (P-1, O-65), so the pane's own card is glass's Card, placed by fourier's layout.

**Acts, in order.**
1. Falsifier `web/e2e/f-w14u-s.spec.ts` (new, 6 cases). At 1440 and 1024, in light and dark, it reads the pane `.viz-panel-left-wrap` and checks four things. The pane must be glass's `.card`. It must sit inside the viewport edge **and** the shell edge (`vw − pane.r > vw − shell.r`). The gap to the stage must be > 0 (beside it: `pane.l − stage.r`; stacked: `pane.t − stage.b`). All four corner radii must equal `--radius-card`, resolved live on `:root`, within ±0.5 px, and `box-shadow ≠ none`. At 390, in light and dark, the pane must NOT be a card and have no shadow (its own form), with `pane.l > 0`, `vw − pane.r > 0` and `pane.r ≤ shell.r`. Frames `e2e/screenshots/f-w14u/s/<phase>-<w>-<scheme>.png`.
2. **RED pre-cure.** The cure diff was saved to the scratchpad and `VisualizationView.vue` was restored to HEAD (own path only). ⟨`FW14U_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-s.spec.ts --project=chromium`⟩ → **6 failed** (1440/1024 ×2: `card` false; 390 ×2: `vw − pane.r` ≤ 0). Frames `before-{1440,1024,390}-{light,dark}.png` written (6).
3. **Cure** (`VisualizationView.vue`, patch re-applied):
   - (a) From lg up, the wrap renders as glass's `Card` with `shadow` (`<component :is="isDesktop ? Card : 'div'" v-bind="isDesktop ? { shadow: true } : {}">`, class and transition unchanged). Below lg it stays the plain `div` sheet.
   - (b) Placement only: `@media (min-width:1024px) .viz-panel-left-wrap { width:auto; max-width:none; margin: var(--space-body) }`. `width:auto` fixes the first after-run, which measured `vw − pane.r = −3`: width 100% plus a margin ran past the band.
   - (c) The aside band `--configurator-aside-{min,max}` is fourier's own token pair. It grows by `2 * var(--space-body)` at each of the three breakpoints. The frame without it showed "Decomposit…"/"resolut…" truncating, with the inset taken out of the content.
   - (d) Mobile: `min-width: 0` on the flex column, so the shell track fits the shell.
   - No glass surface is restyled. The shell, the aside's divider and the Card itself are untouched.
4. **GREEN ×2.** ⟨same command, `FW14U_PHASE=after`⟩ → run 1 **6 passed** · run 2 **6 passed**, with the settled bytes after (c). Frames `after-{1440,1024,390}-{light,dark}.png` (6) were inspected: 1440 shows the card with a gutter on all sides and the section titles whole; 1024 shows the card below the stage with a gutter; 390 shows the sheet inside the viewport.
5. Non-regression on the surface. ⟨`npx playwright test f-w14-veil f-w13-image-empty f-w13-image-controls f-w14-residuals --project=chromium`⟩ → **15 passed**. The veil spec's surface = `--card` = the stage's holds with the Card.

**Gates BEFORE → AFTER.**
| gate | BEFORE | AFTER |
|---|---|---|
| G-s | RED (1440 r9 · radius 0 · no shadow; 390 r −8) | **GREEN**: 1440/1024 card, gutter > 0 from the viewport, shell and stage, 4 × `--radius-card`, own cast; 390 sheet form kept, inside the viewport |
| falsifier | 6 failed (pre-cure bytes) | 6/6 ×2 |
| `vue-tsc -b` | 0 (banked) | ⟨×2⟩ exit 0 · exit 0 |
| `vitest` | 86/86 (banked) | ⟨`npx vitest run` ×2⟩ `14 passed · 86 passed` ×2 |

**Commit.** fourier `10c8e1a` (pathspec: `web/src/components/visualization/VisualizationView.vue`, `web/e2e/f-w14u-s.spec.ts`), pushed (⟨`git ls-remote origin m/w1-bump-migration`⟩ → `10c8e1ad2da1`). Frames are on disk only: `web/.gitignore:1 *.png` ignores them, and they are not force-added (same as seat 0).

**Side effect repaired.** The veil run rewrote four tracked frames `web/e2e/screenshots/f-w14/after-veil-{1440,390}-{light,dark}.png`. They were clean at this seat's open and are outside `.s`'s set, so they were restored to HEAD by exact path. Tree after: `?? .worktrees/` only.

**Adjacent edits:** none.

**Residuals.**
- (i) At 390 the layer titles now truncate ("Decomposit…"). Before, they ran 8 px past the edge and were clipped with the chevrons. This is the layer header's own text register, owed to `.vstage` (the "design hierarchy and space" rider, §0cu).
- (ii) Glass's aside divider (`border-inline-start`) still draws at the stage edge, and the card floats beyond it. It is not restyled. If glass ships the P-1 inset mode it is adopted at the landing repin (O-65).
- (iii) The card is scroll content inside glass's `FadingScroll`, so when the controls overflow, the card's lower edge scrolls into view. This is the placement glass's chassis affords.

**Escalations:** none.

### F.W14U.t

SEAT `.t`, `claude-opus-5-5`, 2026-09-24. Spec `F-W14U.md` §0cq `.t` :30-37 + (b) §0cr :43-45 (read whole, 58 L); COHESION §0cq OA-60 (:3329) + §0cr P-2 (:3342-3344), §0cs..§0cw read to the file end (:3346-3384).

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only; value.js `C/F-W14U.md` clean. **Nothing inherited.**

**Anchors at true bytes (fourier `10c8e1a`).** `PaperSidebar.vue` 475 L + `MobileFloatingToc.vue` 473 L, both injecting the one model (`paperToc.ts` `injectPaperToc`), each re-deriving the helpers; `PaperView.vue:451` mounts the floating bar (`!isDesktop && !mobileTocVisible`), `:476` the rail (`isDesktop`); `.paper-columns` desktop track `220px minmax(0, 48rem)`, `gap: 2rem` (`:717-721`). No hide control, no storage (baseline G-t). The paper is an opaque card surface, so "under the paper" is literal. Glass: no edge-drawer primitive (§0cr, I-48 P-2), so the drawer is fourier's layout.

**Acts, in order.**
1. **Falsifier** `web/e2e/f-w14u-t.spec.ts` (new, 7 cases). **t1+t2** (1440, light and dark): exactly one toggle named `Hide contents`, `aria-expanded=true`, `aria-controls` → one element. The ToC's own scroll is set, then Enter on the toggle. The first frame must show a running `CSSTransition` with ms > 0 under the ToC column. Once settled: `aria-expanded=false`, name `Show contents`, the `Table of contents` nav hidden (`visibility: hidden`), focus still on the toggle, the column ≤ the tab width + 1, the tab's right edge ≤ the paper's left edge + 0.5 and within 24 px of it, and the paper moved left. Enter again (animated): nav visible, focus on the toggle, nav rect and paper rect restored (l/r/t/b ±0.5 px), the nav's `scrollTop` identical. **t3**: hide, reload → still hidden; show, reload → shown. **t4**: storage throws for the ToC key → the ToC shows and the toggle still works. **t5** (`contextOptions.reducedMotion: "reduce"`): no running transition with ms > 0, and the column is collapsed in the first frame. **t6** (390, light and dark): no drawer toggle below lg, and the floating bar opens the ToC. t6 is a frame and non-regression case, GREEN at both phases by design.
2. **RED pre-cure.** ⟨`FW14U_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-t.spec.ts --project=chromium`⟩ → **5 failed, 2 passed** (t1+t2 ×2 and t5: no toggle; t3: click timeout; t4: no toggle; t6 ×2 GREEN). The final spec bytes were re-proven the same way. The cure was saved to the scratchpad, then the three HEAD paper files were checked out by exact path and `PaperToc.vue` removed. The result was again **5 RED** (t1+t2 ×2, t3, t4, t5) and t6 ×2 GREEN. The cure was then re-applied byte-identically. Frames `before-{1440,390}-{light,dark}.png` and `before-390-*-open.png` were written.
3. **t4 scoped (measured).** The first cut threw on *every* storage key. At both phases the page never reached `h1`. ⟨`node probe` with `pageerror` + stacks⟩ → `SecurityError` thrown from `pinia.js getTimelineLayersStateFromStorage`, the dev server's pinia devtools timeline reading storage unguarded at boot. That is a dev-only tool, not this page, so t4 now throws for the ToC's key only. This is recorded in the spec.
4. **Cure.**
   - (a) **One component, two presentations.** New `web/src/components/paper/PaperToc.vue` with the prop `presentation: "rail" | "floating"`. There is one script over the one injected model: `hasChildren`, `plainTitle` and `elementOf` are shared, where each file had its own. `presentation` picks the template branch. Each branch keeps its class vocabulary (`.paper-sidebar`/`.sidebar-*`, `.floating-toc-*`), so every neighbour selector holds. `PaperSidebar.vue` and `MobileFloatingToc.vue` are **deleted** (`git rm`). Only the rail registers the scroll-followed nav (`registerNavEl`), so the floating bar's mount and unmount on scroll can never clear it. The floating disclosure's name now uses the shared `plainTitle`, the same accessible name in both presentations, with math stripped.
   - (b) **The drawer** (rail). A glass `Button size="sm" icon-only` tab (`PanelLeftClose` / `PanelLeftOpen`) is the one control in both states, with `aria-label` Hide/Show contents, `aria-expanded` and `aria-controls` → the nav id. Focus is returned to it with `nextTick` after each toggle. The `aside.paper-sidebar` is the grid's ToC column: open width = `--paper-toc-width` (220px) + `--paper-toc-tab` (`--control-h-sm`, the tab rail = the gutter), and shut width = the tab rail alone. `.paper-toc-drawer` is `overflow: clip` (not `hidden`, so it is no scroll container and `sticky` holds; `overflow-clip-margin: 4px` keeps the nav's offset shadow). The nav keeps its 220 px, so as the column narrows, the paper slides over it and it goes under the paper at the drawer's inline end. It turns `visibility: hidden` only once the slide ends (`transition: visibility 0s linear var(--duration-slow)`), and it is `inert` from the first frame. It never unmounts, so expanding restores its exact place and its own scroll.
   - (c) **Persistence.** `localStorage` key `fourier:paper-toc-open`, read synchronously in setup (a returning reader's shut drawer paints shut, with no slide on arrival). It goes through the tree's existing `useSafeStorage` `safeGetItem`/`safeSetItem`, i.e. the try/catch.
   - (d) **Motion in one place.** Width, clip and end-delayed visibility all sit in `PaperToc.vue`'s `.paper-sidebar` block, `var(--duration-slow) var(--ease-out-expo)`. `@media (prefers-reduced-motion: reduce)` sets `transition: none`, so the change is instant. This block is the **P-2-ADOPT seam**: one glass edge-drawer primitive replaces it at the landing repin.
   - (e) `PaperView.vue`: two imports become one, both mounts become `<PaperToc presentation=…>`, and desktop `.paper-columns` becomes `grid-template-columns: auto minmax(0, 48rem); column-gap: 0; justify-content: center`. `auto` means the column is the ToC's own width. `center` keeps the paper centred in the room the shut column gives back, where `normal` would stretch the auto track and `start` would leave the paper flush left. The open layout is unchanged but for the gutter, 32 → 36 px (`--control-h-sm`, the tab's own size): the paper's left edge moves +4 px at 1440 (frames).
   - No glass surface is copied or restyled.
5. **Adjacent edit (§0bt).** `web/scripts/derive-loops.vitest.ts:35-44`. Its BS-1 oracle filtered on `PaperSidebar.vue`, the file this unit deletes. ⟨`npx vitest run`⟩ → `1 failed | 85 passed` (`expected [] to have a length of 3`). A deriver probe then listed PaperToc.vue's rows: `li@261 sections · li@296 section.subsections · li@313 sub.subsections` (the rail's three native `<li v-for>`), plus the floating branch's `template@424` and `Button@456` callsite. The filter now names `PaperToc.vue` and `host === "li"`. The three assertions (length 3, all native, all `li`) are unchanged, and the title and a comment were updated to match.
6. **GREEN ×2** on the settled bytes. ⟨`FW14U_PHASE=after BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-t.spec.ts --project=chromium`⟩ → run 1 **7 passed** · run 2 **7 passed** (load 17.55/20.32/18.88). Frames `after-{1440,390}-{light,dark}.png`, `after-1440-{light,dark}-hidden.png` and `after-390-*-open.png` were inspected. At 1440 open, the tab sits in the gutter beside the ToC and the layout matches before. At 1440 hidden (dark), the paper is centred and the tab sits at its left edge with the focus ring. At 390 the floating bar is unchanged.
7. **Neighbours.**
   - ⟨`npx playwright test e2e/paper-search.spec.ts e2e/f-w14-residuals.spec.ts e2e/f-w13-radius.spec.ts --project=chromium`⟩ → **11 passed**.
   - ⟨`… e2e/f-w14-uia.spec.ts e2e/f-w14-uia-r2.spec.ts e2e/paper-performance.spec.ts -g "UIA-F-2[0-6]|UIA-F-21|UIA-F-59|UIA-F-6[235]|paper|Paper|sidebar"`⟩ → **21 passed**. That covers F-20, F-22, F-23, F-24, F-25, F-26, F-21 ×4, F-59, F-62 and F-63/65 ×2, the paper-performance ×5, and F-15.
   - ⟨`… e2e/contrast-floor.spec.ts e2e/f-w14-control-row.spec.ts e2e/shell-header.spec.ts e2e/coarse-pointer.spec.ts --project=chromium --project=mobile-chromium`⟩ → **10 passed, 3 failed**. The 3 are contrast-floor `:82` ×2 and `:128`, the **named baseline set**. At pre-cure bytes they read the identical `18 of 36` light and `10 of 36` dark (the same command in the RED run of act 2), so there is no new pair.

**Gates BEFORE → AFTER.**
| gate | BEFORE | AFTER |
|---|---|---|
| G-t drawer (toggle button with `aria-expanded`, slides under the paper to an edge tab, animated; exact restore; per-viewer persistence in try/catch; focus returns; PRM instant) | RED (no toggle; 5 falsifier cases RED) | **GREEN**: t1+t2 ×2, t3, t4, t5 |
| one component, two presentations, no duplicate | RED (`PaperSidebar.vue` 475 L + `MobileFloatingToc.vue` 473 L) | **GREEN**: `PaperToc.vue` 998 L alone. ⟨`ls web/src/components/paper/*.vue`⟩ → `PaperArticleWindow PaperSearch PaperToc PaperView`. ⟨`grep -rn "PaperSidebar.vue\|MobileFloatingToc.vue" web --exclude-dir=node_modules`⟩ → the oracle title (history) and one comment at `src/style.css:298` (not code, not in bounds) |
| paper-search + f-w14-uia F-22..F-25 (+F-20, F-24) + f-w14-uia-r2 paper rows (F-21, F-26, F-59, F-62, F-63/65) | GREEN (banked) | **GREEN** (11 + 21 passed) |
| falsifier | 5 failed · 2 passed (pre-cure bytes, ×2 readings) | 7/7 ×2 |
| `vue-tsc -b` | 0 (banked) | ⟨×2⟩ exit 0 · exit 0 |
| `vitest` | 86/86 (banked) | ⟨`npx vitest run` ×2⟩ `14 passed · 86 passed` ×2 (after the adjacent oracle edit; before it, `1 failed`, act 5) |

**Commit.** fourier `6f1f600`, pathspec: `web/src/components/paper/{PaperSidebar,MobileFloatingToc}.vue` (deleted), `web/src/components/paper/{PaperView,PaperToc}.vue`, `web/e2e/f-w14u-t.spec.ts`, `web/scripts/derive-loops.vitest.ts`. Pushed: ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `6f1f600e887f`. Frames are on disk only, under `web/e2e/screenshots/f-w14u/t/` (`*.png` gitignored, not force-added).

**Side effect repaired.** The neighbour runs rewrote 15 tracked frames `web/e2e/screenshots/f-w14/after-page-*.png`. They were clean at this seat's open and are outside `.t`'s set, so they were restored to HEAD by exact path. Tree after: `?? .worktrees/` only.

**Adjacent edits:** `fourier-analysis/web/scripts/derive-loops.vitest.ts:35-44`. The BS-1 oracle named the deleted `PaperSidebar.vue`, and it now names `PaperToc.vue` (`host === "li"`). No assertion was removed (act 5).

**Relay.** P-2 (no glass edge-drawer-under-content primitive) is already with glass under I-48 / O-65 (§0cr). No new glass half was found, so there is no new mail. **P-2-ADOPT** is not recorded, because glass has not shipped P-2.

**Residuals.**
- (i) Mobile (below lg) has no hide toggle. The floating bar is already a collapsed drawer (a closed dropdown), and the owner's frame and words name the desktop rail ("slide under the paper … to where it is now").
- (ii) Under the dev server, a page whose *every* storage call throws does not boot. Pinia devtools `getTimelineLayersStateFromStorage` is unguarded. This is dev-only tooling outside `.t` and is not a product path (act 3).
- (iii) The open gutter is 36 px instead of 32 (`--control-h-sm`, the tab's own size). The paper's left edge moves +4 px at 1440.
- (iv) `src/style.css:298` still names the two retired files in a comment (`.paper` owns `paper/**`; `style.css` is `.vstage`'s).

**Escalations:** none.

### F.W14U.d

SEAT `.d`, `claude-opus-5-5`, 2026-09-24. Spec `F-W14U.md` §0cq `.d` :38 + §0cs :46-47 + §0ct :49-50 (read whole, 58 L); COHESION §0cq OA-57 (:3321-3340), §0cr, §0cs (:3346-3354), §0ct (:3356-3359), read to the file end (:3384). Relays read whole: `relay/X-ALL-BK-{DOCK-COLLAPSED-FORM,SIDE-DOCK-EDGE,SELECT-GREY-DOCK-MOTION}.md`; glass's own mapping of them `glass-ui/docs/tranches/BL/audit/INBOUND-MAP.md:619-631` (read-only). Owner frames `audit/owner-2026-09-24-{collapsed-dock,side-dock-edge}.png` opened.

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only; value.js `C/F-W14U.md` clean. **Nothing inherited.**

**Both owner frames are fourier's own docks (measured).** The collapsed-dock frame is `AnimationControls.vue`'s dock: the Play/Pause face is `#persistent`, the track is `.mini-progress`, and the count "1" plus the "×" are one glass `Metric` (speed `1`, unit `×`). **The "×" is not a dismiss.** It is the Metric's unit. O-65's "the dismiss × floats detached" reads the unit as a dismiss, and glass's formation should know that. The side-dock frame is `CanvasControlsDock.vue` collapsed: the Maximize summary glyph with the amber `.view-dot`, and the persistent-end Pencil.

**Acts, in order.**
1. **BEFORE frames, headed** (throwaway node probe, since deleted; headed Chromium, DPR 2, a fresh upload of `golden-retriever.webp`, pointer parked off the docks, 4 s settle). Frames `web/e2e/screenshots/f-w14u/d/before-{1440-dark,390-dark,1440-dark-edit}-{dock0,dock1,dock2,full}.png` reproduce both owner frames exactly. Readings at 1440 dark:
   - **app dock** `glass-dock … expanded pinned always-expanded`. `AppDock.vue:71` passes `:collapse="false"`, so it **has no collapsed form**. Nothing to cure.
   - **canvas dock** `collapsed fit-content`: plate [903, 85, w96, h56]; summary [911, 93, 40×40]; persistent-end [951, 93, 40×40]. The plate wraps both seats. The `.view-dot` [938–944 × 102–108] overlaps the glyph [921–941 × 103–123] by 3 × 5 px, which is the collision in the owner's frame.
   - **animation dock** `collapsed`: plate [457, 819, w102]; summary layer [511, 827, **40×40**]; its content `.mini-progress` [504–552] and the Metric (value [558–587.5], unit "×" at 592.3–600.9) run **out of the 40 px summary and past the plate's right edge (559)**.
   - **editor dock** (edit mode): plate [418.7, 819, w178.7] wraps the persistent `N pts` + Save and the Wand summary. Only the rim fades on its left cap (producer, O-67 R-1).
   - At 390 dark (the Canvas tab): the same shapes (animation summary 44×44 with its content at 193–284 past the plate's right edge at 250; the dot [311–317 × 150.5–156.5] on the glyph [292–314 × 151.5–173.5]).
2. **The cause read at the bytes (G-d).**
   - **Producer:** glass `src/components/dock/styles/morph.css:180-199` (read-only, glass HEAD `504ff421`; the installed 10.0.1 behaves the same, as measured) locks `.dock-layer--summary` to `block-size`/`height` = `--dock-layer-height`, `min-width` the same, `aspect-ratio: 1`. The comment says this "guarantees 1:1 even if a consumer's collapsed-slot content is wider than the floor". The plate is sized from that one layer (glass's own map, INBOUND-MAP `:619`), so a summary wider than one seat overflows by design. That is **DOCK-COLLAPSED-FORM, honest-RED (O-65)**.
   - **The consumer's own track** (`.mini-progress` 3rem) is legitimate summary content. The O-65 ask is that the plate wraps "face, track and count", so the track is not shrunk locally.
   - **Consumer cause 1 (cured):** `AnimationControls.vue:176` `<Metric … size="sm" class="summary-speed">` with `:256` `.summary-speed { @apply text-base; color: color-mix(foreground 35%) }`. The class's color is inherited by `.metric__value` only, because glass's `.metric__unit` sets its own `--muted-foreground`. So the value "1" painted at alpha 0.349 while its unit "×" painted opaque. The reading inverted the Metric's hierarchy, and the "×" read as a separate glyph beside the plate, which is the owner's "dismiss". `text-base` never reached the value (`.metric[data-size="sm"] .metric__value` sets it) and only re-based the reading's `0.3em` gap.
   - **Also producer, not cured:** the remaining "1 ×" separation after the cure is glass's `.metric__value { min-inline-size: 3ch }` (`metric/styles.css:66-75`): a left-aligned "1" in a 3ch box, then the 0.3em gap. It belongs to O-65's form (the count seat), so it is recorded rather than overridden.
3. **The Select call sites (GLASS-SELECT-GREY).** ⟨`grep -rln "<Select\b\|SelectTrigger" web/src`⟩ → 5 files, each read at its trigger and items:
   - `ContourSettings.vue:246-260`: `class="w-full"` (layout).
   - `SpeedSelect.vue:30-43`: `speed-trigger` strips the surface to transparent (a deliberate bare trigger); `input-pill` is glass's own register.
   - `GallerySearchBar.vue:136-170`: `w-full h-8 text-sm border border-foreground/12 rounded-lg` (size, rim and radius; no background).
   - `AdminUserList.vue:422-430`: `shrink-0`.
   - `MorphPhaseConfig.vue:58-90`: `w-full`, `text-value` (live).
   - **No `variant` prop and no background class at any site.**
   - Measured on the served page (headless, 1440, `/gallery` with the filter drawer open + `/morph`, light and dark): every visible trigger paints the **identical** `background-image` (the glass plate `linear-gradient(color(srgb 0.204 0.148 0.083 / 0.1) …)` light, `/ 0.14` dark), with `background-color` transparent. The grey is glass's `control-surface` plate (glass map `:623`/`:628`: `--glass-plate-quiet`, O-62's grey). There is **no consumer cause, so none was cured, and GLASS-SELECT-GREY is honest-RED (O-66).** The gallery triggers' `rounded-lg`/`h-8`/border utilities are shape overrides, not grey, and outside this unit's lock ("touched only for consumer-passed grey class/dead prop"), so they were left for `.gallery`.
4. **The canvas docks' ancestor chain (SIDE-DOCK-EDGE)**, both themes, 1440 + 390.
   - Chain (canvas dock and animation dock alike): `.controls-dock-anchor`/`.controls-overlay` (visible) → `.canvas-stage` **overflow hidden** → `.configurator-stage` overflow hidden → `.configurator-shell` overflow hidden. No clip-path, no `contain`.
   - The docks sit inside the clip with an **8 px** gutter (anchor `top/right: 0.5rem`, `VisualizationView.vue:659-664`). The collapsed shadow is glass's `--shadow-dock-collapsed: 0 0 12px …12%`, so the outer ~4 px of a 12 px blur halo is clipped at the stage edge (≈1% alpha at 8 px). That is sub-perceptual, and it is **not** the owner frame's open rim: the rim fades on the plate's *left* cap, 90 px from any clip edge, which is glass's plate composite (O-67 R-1).
   - The 8 px gutter to the stage rim is the consumer placement the owner reads as crowding (O-67 R-2). It lives in `VisualizationView.vue`, which is outside `.d`'s set and owned by `.vstage`/`.vedit`. The ADJACENT-LINE RULE excludes a sibling unit's file, so it is **not edited**. It is carried as residual (ii).
   - **Consumer cause 2 (cured): the badge collision.** `.view-dot` (`top: -1px; right: -3px`) is shared by the expanded 40 px `.view-btn-wrap`, where it lands on the control's corner clear of the Eye glyph, and by the collapsed `.summary-glyph-wrap`, which is only the 20 px glyph box. There, the same offsets put the dot on the Maximize arrow tip. The dot is the consumer's own element (glass map `:631`: "the amber dot is the consumer's"). The glass half, a reserved badge seat, stays O-67 R-3.
5. **Falsifier** `web/e2e/f-w14u-d.spec.ts` (new), with 6 cases: {1440 light, 1440 dark, 390 dark (mobile, Canvas tab)} × {d1, d2}. Each case uploads, parks the pointer, waits for both docks to be `.collapsed`, and waits until every DocumentTimeline animation on them has ended. Scroll-timeline and infinite animations are excluded, following `.s`'s settle; the first cut waited on the dock's scroll-timeline animations and timed out 6/6, which was a probe defect and not a reading.
   - **d1:** in the collapsed animation dock, the `.metric__value` ink alpha is ≥ the `.metric__unit` alpha (resolved through a 1×1 canvas), and the Metric's font size equals its summary host's.
   - **d2:** the `.view-dot` rect ∩ the summary glyph rect = ∅, and the dot lies within the dock plate.
   - Frames: `{before,after}-{1440-light,1440-dark,390-dark}-{animation,canvas}-dock.png`.
6. **RED, pre-cure bytes, ×2.** ⟨`FW14U_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-d.spec.ts --project=chromium --workers=3`⟩ → **6 failed** ×2 (run 1 and run 2 identical). d1 ×3: `Expected: >= 1 · Received: 0.34901960784313724`. d2 ×3: `dot {left 938, top 102, right 944, bottom 108} glyph {left 921, top 103, right 941, bottom 123}` → `Received: false`, and at 390 `dot {311…317 × 150.5…156.5} glyph {292…314 × 151.5…173.5}`. Load 43.0.
7. **Cure** (fourier, two files):
   - (a) `AnimationControls.vue:176`: `class="summary-speed"` is removed from the `<Metric>`, and the `.summary-speed` rule (`:256`) is replaced by a dated comment. The Metric now paints as glass paints it.
   - (b) `CanvasControlsDock.vue`: one rule, `.summary-glyph-wrap > .view-dot { top: auto; right: auto; bottom: 100%; left: 100% }`. On the resting face only, the dot sits just outside the glyph's top-right corner and stays on the plate. There is no new number and no dock override. The expanded `.view-btn-wrap` dot is unchanged. A dated comment names O-67 R-3 as the seat glass will own.
   - No glass surface is restyled, no dock motion is touched (O-66 §2), and no Select site is edited.
8. **GREEN ×2 on the settled bytes.** ⟨same command, `FW14U_PHASE=after`⟩ → **6 passed** ×2 (after the last comment-only edit: runs 3 and 4, `6 passed` · `6 passed`; load 35.6). The AFTER frames were inspected:
   - The canvas dock's dot sits clear above-right of the Maximize glyph, on the plate (1440 dark; headed 390 light `after-headed-390-light-dock1.png`).
   - The animation dock's "1" is now full ink beside its muted "×". The track and count still overflow the fixed 40 px summary: **DOCK-COLLAPSED-FORM stays RED, as ruled.**
   - Headed AFTER frames: `after-headed-{1440,390}-light-{dock0,dock1,dock2,full}.png`.
9. **Neighbours.** ⟨`BASE_URL=… npx playwright test e2e/f-w13-image-controls.spec.ts e2e/f-w14-control-row.spec.ts e2e/fullscreen.spec.ts --project=chromium --workers=3`⟩ → **6 passed**. `f-w14-control-row.spec.ts:39` rewrote the 15 tracked frames `web/e2e/screenshots/f-w14/after-page-*.png`. They were clean at this seat's open and are outside `.d`'s set, so they were restored to HEAD by exact path (`git checkout HEAD -- <15 paths>`). Tree after: `?? .worktrees/` only.

**Gates BEFORE → AFTER.**
| gate | BEFORE | AFTER |
|---|---|---|
| **G-d** collapsed dock, consumer half | RED: consumer cause 1 measured (d1 ×3 RED ×2) | **GREEN** for the consumer: d1 3/3 ×2. App dock: no collapsed form (`:collapse="false"`). Editor dock: plate wraps its seats. Producer half **honest-RED DOCK-COLLAPSED-FORM (O-65)**: summary locked 1:1 at `morph.css:180-199`, plus Metric `3ch` value floor |
| **GLASS-SELECT-GREY** | honest-RED (O-66), call sites unread | **honest-RED (O-66)**: 5/5 sites read; 0 grey class, 0 dead prop; served plate identical at every site = glass's `control-surface` plate |
| **SIDE-DOCK-EDGE** | honest-RED (O-67), chain unread | consumer crowding (dot on glyph) **cured**: d2 3/3 ×2. Rim (R-1) and badge seat (R-3) **honest-RED (O-67)**. Gutter (R-2) consumer placement measured at `VisualizationView.vue:659-664`, out of `.d`'s set → residual (ii) |
| falsifier | 6 failed ×2 | 6/6 ×2 (×4 in all) |
| `vue-tsc -b` | 0 (banked) | ⟨`npx vue-tsc -b` ×2⟩ exit 0 · exit 0 |
| `vitest` | 86/86 (banked) | ⟨`npx vitest run` ×2⟩ `Test Files 14 passed (14) · Tests 86 passed (86)` ×2 |

**Commit.** fourier `b62821d`, with pathspec `web/src/components/visualization/{AnimationControls,CanvasControlsDock}.vue` and `web/e2e/f-w14u-d.spec.ts`. Pushed: ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `b62821d55c49`. Frames are on disk only, under `web/e2e/screenshots/f-w14u/d/` (`*.png` gitignored, not force-added).

**Adjacent edits:** none.

**Relay.** There is no new glass half, so there is no new mail. For the orchestrator's next O-65 exchange, two measured facts about the owner's frame:
- (1) the "×" is the Metric's unit, not a dismiss;
- (2) what separates it from the "1" is glass's `metric__value` `3ch` floor.

Both bear on O-65's "a dismiss is a seat inside the plate" clause.

**Residuals.**
- (i) DOCK-COLLAPSED-FORM, GLASS-SELECT-GREY and SIDE-DOCK-EDGE (R-1 rim, R-3 badge seat) stay honest-RED until the landing repin (glass BL, working 11.0.0). The `.view-dot` rule retires to the glass badge seat when it ships.
- (ii) **The canvas docks' 8 px gutter** (`VisualizationView.vue:659-664`, `.controls-dock-anchor { top/right: 0.5rem }`) is the consumer half of O-67 R-2, the plate crowding the stage rim, most visible at 390 where the plate's corner nears the stage's rounded corner. It is owned by `.vstage`/`.vedit`, so it is carried there. It also clips the outer ~4 px of glass's 12 px collapsed halo (≈1% alpha).
- (iii) The GallerySearchBar triggers' `h-8 rounded-lg border border-foreground/12` override glass's control height, radius and rim. They are not grey, so they were outside this lock, and they are carried to `.gallery` (whose set holds the file).
- (iv) The editor dock's `.is-save { background: foreground 6% }` is a consumer grey fill on a DockControl. It is not a Select, not collapsed-form and not an edge, so it is noted for `.vedit` (UIA register row owner).

**Escalations:** none.

### F.W14U.a

SERVED MODEL: claude-opus-5-5 · 2026-09-24 · spec F-W14U.md (c) §0cu :52-55 · COHESION §0cu :3361-3365 · INBOX I-51 (`:516`, O-68 registered at glass `2efb414c`; early 10.x ship = glass owner item OW-11).

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only; ⟨`git status --porcelain execution/C/F-W14U.md`⟩ → clean. Nothing inherited. fourier HEAD ⟨`git rev-parse --short HEAD`⟩ → `b62821d`.

**Acts (read-only in fourier; the unit's writable set is this record).**
1. Pin and install. ⟨`grep -n '"@mkbabb/glass-ui"' web/package.json`⟩ → `:19 "10.0.1"`; ⟨`grep '"version"' web/node_modules/@mkbabb/glass-ui/package.json`⟩ → `"10.0.1"`.
2. The slot. ⟨`grep -n actions web/node_modules/@mkbabb/glass-ui/dist/components/configurator/ConfiguratorLayer.vue.d.ts`⟩ → no match (exit 1); the declared slots (`:54-56`) are `default?: (props) => any` only. **`#actions` is NOT published at the installed pin.** The lock holds: no fourier write (the pin is out of bounds).
3. Census of every ConfiguratorLayer section. ⟨`grep -rn "<ConfiguratorLayer" web/src`⟩ → 6 sections; body reset rows read at the bytes:

| section (label) | mount file:line | body reset row (the future move into `#actions`) |
|---|---|---|
| Contour | `web/src/components/visualization/ContourSettings.vue:227` | **`:228-242`**: comment `:228-229` ("ConfiguratorLayer has no header-actions slot"), row `<div class="flex items-center justify-end -mt-1 -mb-1">` `:230`, `Tooltip` + `Button emphasis="quiet" icon-only :disabled="isDefault" aria-label="Reset to defaults" @click.stop="resetDefaults"` `:231-241` (`resetDefaults` `:98`, `RotateCcw` import `:22`) |
| Decomposition | `web/src/components/visualization/BasisSelector.vue:136` | **`:137-151`**: comment `:137-138`, row `:139`, Tooltip + Button `:140-150` (`resetDefaults` `:96`, `RotateCcw` import `:11`) |
| Image | `web/src/components/visualization/ImageUpload.vue:64` | none |
| Coefficients | `web/src/components/visualization/CoefficientsPanel.vue:14` | none |
| Preview | `web/src/components/visualization/ContourPreview.vue:59` | none |
| Coefficients (equation) | `web/src/components/equation/EqCoefficientsPanel.vue:72` | none |

   Not in scope, checked: `VisualizationView.vue:254` `<template #actions>` is the load-error plate's slot, not a ConfiguratorLayer; `ui/CollapsibleSection.vue:100` `<slot name="actions" />` is fourier's own disclosure header, not glass's.
4. No local overlay into glass's header. Glass header classes ⟨`grep -rho 'configurator-layer[a-z_-]*' node_modules/@mkbabb/glass-ui/dist | sort | uniq -c`⟩ → `configurator-layer`, `-trigger`, `-region`, `-body`. ⟨`grep -rn 'configurator-layer-trigger\|configurator-layer-region\|configurator-layer-body' web/src`⟩ → 0 hits (exit 1). ⟨`grep -rn Teleport web/src | grep -i 'configurator\|layer-trigger'`⟩ → 0 hits. The only `configurator-layer` selector in fourier is `VisualizationView.vue:557` `.viz-panel-left > :not(.configurator-layer):not(:last-child)` (sibling spacing, excludes the layer; not a header overlay).
5. Double-run. ⟨loop ×2: slot-hits · section files · `aria-label="Reset to defaults"` count · header-selector hits⟩ → `run1 actions=0 sections_files=6 body_resets=2 header_overlay=0` · `run2 actions=0 sections_files=6 body_resets=2 header_overlay=0`. Load 22.95/30.22/28.58.

**Gate G-a.** BEFORE: RED (the open baseline). AFTER: **honest-RED CONFIGURATOR-HEADER-ACTIONS** recorded. `#actions` is unpublished at 10.0.1. The census holds 2 body reset rows in 6 sections, and the header overlay reads 0. The cure is owed at the landing repin that publishes O-68: move the two rows above into `#actions`, delete the body rows and their "no header-actions slot" comments, and falsify RED→GREEN ×2. The producer is glass O-68/I-51, and the early 10.x minor is owner item OW-11.

**Commits:** fourier none (lock). value.js: this receipt only.
**Adjacent edits:** none. **Residuals:** CONFIGURATOR-HEADER-ACTIONS (O-68). **Escalations:** none.

### F.W14U.b

SEAT `.b`, `claude-opus-5-5`, 2026-09-24. Spec `F-W14U.md` addendum (d) §0cv :57-58 (read whole, 58 L); COHESION §0cv :3367-3375 (read to the file end, :3384). Bounds: `api/services/image_storage.py`, `api/routers/images.py`, new `api/tests/test_blob_integrity.py`, this receipt.

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only; nothing in this unit's set. **Nothing inherited.**

**Anchors at the true bytes (fourier `b62821d`).** `image_storage.py:221` `return _resolve(asset.storage_uri).read_bytes(), asset.content_type` (unguarded → `FileNotFoundError` → 500) ✓. Dedup-hit branch `:105-136`, its `try` `:117` … `except Exception:` `:130` → `logger.warning("Thumbnail regeneration failed …")` ✓ (spec cites :104-132; same branch, INTENT at :105-136). `images.py:141/:156/:159` build `FileResponse(_resolve(uri))` with no presence check (Starlette raises `RuntimeError` "does not exist" at send → the global `Exception` handler `main.py:114` → 500); `:178` `image_bytes` (overlay), `:228` `image_tempfile` (extract-contour) ✓.

**Instrument.** api tests need the `web` + `dev` extras and a live Mongo; `conftest.py:30` defaults to `:27017`, so every run sets `MONGO_TEST_URI=mongodb://localhost:27018 MONGO_URI=mongodb://localhost:27018/fourier` (never :27017). No `httpx` in the dependency set (⟨`uv run python -c "import httpx"`⟩ → `ModuleNotFoundError`), so the falsifier drives `api.main.app` through a small raw-ASGI client (routing + middleware + the global handler: the status it reads is the status sent). ⟨`uv run --extra web --extra dev pytest api/tests -q`⟩ BEFORE → `258 passed`.

**Acts.**
1. **Falsifier first** — `api/tests/test_blob_integrity.py` (2 tests, `@requires_mongo`, per-test tmp `blob_dir`, throwaway DB): (a) `test_missing_blob_file_reads_as_not_found`: POST `/api/images` → 200, unlink the blob + thumb files, GET `/blob`, `/thumbnail`, `/overlay` → expect `{404,404,404}`; (b) `test_reupload_restores_missing_blob_file`: upload, unlink both files, re-upload the same bytes → 200, same slug, 1 row; GET `/blob` → 200 with body == the uploaded bytes; GET `/thumbnail` → 200. ⟨`pytest api/tests/test_blob_integrity.py -q` ×2, pre-cure⟩ → `2 failed` ×2: (a) `{'blob': 500, … 'thumbnail': 500} == {… 404}`, (b) `assert 500 == 200`, with the swallow on the record `WARNING … image_storage.py:131 Thumbnail regeneration failed for <slug>`. **RED ×2.**
2. **Cure, `image_storage.py`.** `class BlobNotFound(LookupError)` (carries `uri`) + `resolve_blob(uri) -> Path` = `_resolve` confinement plus `is_file()`, raising `BlobNotFound` — the typed not-found at the read boundary; `image_bytes` reads through `resolve_blob` (so `image_tempfile` does too). Dedup-hit branch rewritten with no broad `except`: `ImageAsset.model_validate(existing)` stays the typed shape contract (C9); the row is content-addressed, so when `_resolve(storage_uri)` is not a file the uploaded `content` is written back to it; the thumbnail is regenerated from `content` and written as a FILE + `thumbnail_uri` (invariant 18). Thumbnail generation — optional by contract (`thumbnail_uri is None` → readers fall back to the primary) — is one `_thumbnail_or_none(content, content_type, label)` shared by the insert path (the former inline `try` at `:145-149`) and the dedup path; its guard is scoped to the PIL encode only, never around a blob read or write.
3. **Cure, `images.py`.** One `@contextmanager _blob_not_found_as_404()` maps `BlobNotFound` → `HTTPException(404, "Image blob not found")`; used at `/blob` and `/thumbnail` (now `resolve_blob`, the `_resolve` import dropped), `/overlay` (`image_bytes`) and `/extract-contour` (`image_tempfile`).
4. **Gates.** ⟨falsifier ×2⟩ → `2 passed` · `2 passed`. ⟨full `pytest api/tests -q` ×2⟩ → `260 passed in 17.06s` · `260 passed in 18.08s` (258 + the 2 new). ⟨`ruff check` per file, HEAD via `--stdin-filename` vs now⟩ → `image_storage.py` 0→0, `images.py` 11→11 (the pre-existing E402 ×10 + F401 `validate_image_slug`, untouched), test 0. ⟨`mypy api/services/image_storage.py api/routers/images.py`⟩ → 0 errors in the two modules (41 elsewhere, pre-existing).
5. **Commit + push.** fourier **`66bb321`** `fix(api): X.F.W14U.b — blob integrity …` (pathspec: the 3 files), pushed ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `66bb321205e5`.

| gate | BEFORE | AFTER |
|---|---|---|
| G-b missing blob → 404/typed, never 500 | RED (500 at /blob /thumbnail /overlay, measured ×2) | **GREEN ×2** (404 ×3) |
| re-upload (dedup-hit, row exists, file missing) re-stores; read 200 | RED (swallowed; /blob 500) | **GREEN ×2** (200, bytes identical, 1 row, thumb 200) |
| falsifier RED→GREEN ×2; full api pytest | 2 RED ×2 · 258 passed | 2/2 GREEN ×2 · **260 passed ×2** |

**Adjacent edits:** none. **Residuals:** none in `api/**`. The dev store's pre-2026-09-24 rows (moved aside by the orchestrator, §0cv) are not touched; any such row now reads 404 and heals on re-upload. **Escalations:** none.

### F.W14U.srv

SEAT `.srv`, `claude-opus-5-5`, 2026-09-24. Spec `F-W14U.md` Units :8-18 ("Bounds" :18, the `api/**` grant for F-35 F-83 F-112 F-39 and F-46's server half), read whole (58 L). Register rows `UI-AUDIT-fourier.md` :104 (F-35), :108 (F-39), :115 (F-46), :157 (F-83), :186 (F-112). COHESION §0cl/§0cm/§0cn/§0cv read; none rules on these rows beyond the grant. Bounds: `api/**` + this receipt; §0bt adjacent at `simplification.py:15-31` and `latex_rendering.py:32,:104,:143` only.

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only. **Nothing inherited.**

**Anchors at the true bytes (fourier `66bb321`).**
- F-35: `simplification.py:15-31` `truncate_by_budget`. The register writes `dc + non_dc[:budget-1]`; the bytes read `remaining = budget - len(dc)`, `kept = dc + non_dc[:remaining]`. It is the same cut by single exponential terms sorted by amplitude, so the INTENT holds at those bytes.
- F-83: `latex_rendering.py:32` `max_terms = 4` ✓ · `:104` `if shown >= 4:` ✓ (exponential) · `:143` `if shown >= 4:` ✓ (polar). `render_latex` takes `budget` but drops it (`:271-281`).
- F-112: `equations.py` `_run` calls `parse_expression` bare. The `ValueError` crosses `submit_compute_job` into the global handler and comes back as 500.
- F-39: `visualizations.py:288-293` `list_visualizations` accepts limit, sort, cursor and owner only ✓. `cursors.paginate` owns the top-level `$or`.
- F-46: no like route (⟨`grep -n like api/routers/*.py`⟩ → only the `liked_ips` projection strip). The model carries `likes: int = 0`.

**Instrument.** Every run sets `MONGO_TEST_URI=mongodb://localhost:27018 MONGO_URI=mongodb://localhost:27018/fourier`, never :27017. ⟨`uv run --extra web --extra dev pytest api/tests -q`⟩ BEFORE → `260 passed in 13.93s`.

**Measured before the cure, through the real ASGI app (`conftest.asgi`).**
- ⟨POST `/api/equations/compute` `x*(pi-x)` on [0, π], trig⟩ → budget 8: `… -0.11\cos(3t) -0.031\cos(4t) \cdots`. Budget 10: `… -0.063\cos(4t) \cdots`. The coefficient depends on where the cut falls (F-35), and the output never holds more than 4 harmonics (F-83).
- ⟨POST compute with `sin((x`, `x +`, `foo(x)` and `1/0`⟩ → `500 {"detail":"Internal server error"}` for all four (F-112).

**Acts.**
1. **Falsifier first.** `api/tests/test_uia_server_rows.py` holds 15 tests:
   - F-35 ×2: a₄ = −0.0625 at budget 8, equal to its value at budget 10. `truncate_by_budget` keeps every `n` together with its `−n`, and `|n|` groups == budget for budgets 2..11.
   - F-83 ×4: compute with `x` (a sawtooth) at budget 6, 15 and 20 has `\sin(` count == budget−1. `/simplify` at budget 20 has 19.
   - F-112 ×6: `sin((x`, `x +`, `foo(x)`, `1/0` and `x*y` each return 422 with type `urn:contract:validation-failed` and a detail. `x*(pi-x)` still returns 200, as a control.
   - F-39 ×1, live Mongo: 4 seeded rows, one of them a draft; 11 queries run over q, tier and basis.
   - F-46 ×2, live Mongo: two sessions and eight verbs, which stays within the production write budget of 10/min. The second test gets 401 with no session and 404 for another owner's draft.
   - The raw-ASGI client moves from `test_blob_integrity.py` into `conftest.asgi`, which adds a `query` argument, and the blob test imports it. That removes a duplicate. None of the blob test's assertions change.
   - ⟨pytest of the file against the pre-cure bytes: `git archive HEAD api src` into scratch, `PYTHONPATH` set to that copy (the imports were checked to resolve there), ×2⟩ → `14 failed, 1 passed` · `14 failed, 1 passed`. The one pass is the F-112 control. The failure reasons match the defects: `-0.031 == -0.0625`; `(2, [-1, 0])` split pair; `2 == 19` sines; `500 == 422`; `q=zzz-no-such` returned all 3; like `404 == 401`.
2. **F-35 cure (adjacent, `simplification.py:15-33`).** `truncate_by_budget` sums `amplitude²` per `|n|` group, ranks the non-DC groups by energy, and keeps the top `budget − has_dc` groups whole plus DC. The display re-sort is unchanged. The function body is the only change.
3. **F-83 cure (adjacent, `latex_rendering.py`).**
   - Removed from `render_trig`: the `max_terms = 4` line (`:32`), its `term_count` counter and its `\cdots`-break.
   - Removed from `render_exponential` and `render_polar`: `shown = 0`, `shown += 1`, and the `if shown >= 4` cdots-break (`:104`, `:143`).
   - Four docstrings that described the cap were corrected.
   - Why removal and not passing `budget` in as `max_terms`: the budget is applied upstream as the kept term set. A cap counted in renderer units (cos and sin separately, or ±n separately) would split the kept harmonics again. So each renderer now renders every term it is given.
4. **F-112 cure (`equations.py`).**
   - `class ExpressionInvalid(ValueError)` and `_parse_function_of_x(expression)`: a `parse_expression` `ValueError`, an undefined function (`AppliedUndef`), a free symbol other than `x`, or `zoo`/`nan`/`±oo` raises `ExpressionInvalid` with a message.
   - `_run` parses through it. The handler catches that one typed exception around `submit_compute_job` and answers `errors.validation_failed(detail=…)`, a 422 `application/problem+json`.
5. **F-39 cure (`visualizations.py` `list_visualizations`).**
   - New params `q` (≤200), `tier` (default `all`) and `basis` (≤64), each written as `Annotated[str, Query(…)] = default` so the handler's existing direct-call tests keep their Python defaults. A first pass with `= Query(...)` defaults read 7 existing direct-call tests RED (`KeyError 'items'`); that was measured and cured this way.
   - Filters: `q` is a `re.escape`d case-insensitive `$regex` over title, description and tags. `tier` is exact, except that `normal` also matches a row with no tier (`$in [normal, None]`). An unknown tier answers 422. `basis` matches a member of `active_bases`.
   - The filters are ANDed through `$and`, because `paginate` owns `$or`.
6. **F-46 cure (`visualizations.py` and a `VisualizationLike` model in `models/visualization.py`).**
   - `PUT /api/visualizations/{slug}/like` with `{liked: bool}` and `GET …/like`. Both require a session (401 `session-invalid` without one) and a readable row (404, since a draft is owner-only).
   - Storage is one `visualization_likes` document whose `_id` is `"{slug}:{user_slug}"`. The primary key enforces uniqueness, so no index is added.
   - A like is an insert, and `$inc likes +1` runs only when the insert succeeds; a `DuplicateKeyError` means the like already exists and nothing changes. An unlike is a `delete_one`, and `$inc −1` runs only when a document was removed, with the filter `likes > 0`.
   - The response is `{slug, liked, likes}`.
7. **Gates.**
   - ⟨falsifier ×2⟩ → `15 passed in 1.76s` · `15 passed in 2.26s`.
   - ⟨full `pytest api/tests -q` ×2⟩ → `275 passed in 12.97s` · `275 passed in 11.98s`, which is 260 plus the 15 new tests.
   - ⟨`ruff check --output-format concise`, HEAD via `--stdin-filename` vs now, per touched file⟩ → equations 1→1 (the existing F401 `FourierTerm`) · visualizations 0→0 · models 0→0 · conftest 0→0 · blob test 0→0 · simplification 1→1 (the existing F401 `numpy`) · latex_rendering 0→0 · new test file 0.
   - ⟨`mypy` on the 5 touched modules, at the HEAD copy vs now, error lines diffed with line numbers dropped⟩ → **0 new** in equations/visualizations after typing the helpers (`_liker` returns `str | Response`; `_parse_function_of_x -> Any`; `AppliedUndef` read through `sp.core.function`, which adds no new untyped import); models/latex 0→0; simplification 1→1.
8. **Commit + push.** fourier **`798c98f`** `fix(api): X.F.W14U.srv — the server halves of UIA-F-35, -83, -112, -39 and -46 …`. It is one commit because the five cures share one falsifier file and the shared ASGI client move. The pathspec is the 8 files. Pushed: ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `798c98fcde2b`.

| gate | BEFORE | AFTER |
|---|---|---|
| F-35 expanded coefficients whole (no split pair) | RED (a₄ −0.031 at budget 8; split `(2, [-1, 0])`) ×2 | **GREEN ×2** (−0.0625 = the budget-10 value; every kept n has −n) |
| F-83 Terms shows up to 20 (no 4-cap) | RED (2 sines at budget 6/15/20; `/simplify` 2 ≠ 19) ×2 | **GREEN ×2** (budget−1 sines + DC; 19 at `/simplify` 20) |
| F-112 invalid f(x) → typed 4xx | RED (500 ×5 inputs) ×2 | **GREEN ×2** (422 `urn:contract:validation-failed` + detail; the valid control stays 200) |
| F-39 q/tier/basis honoured | RED (every query returned all 3) ×2 | **GREEN ×2** (11 queries exact; unknown tier 422) |
| F-46 like persists as a toggle | RED (route 404) ×2 | **GREEN ×2** (1,1,2,1,1,0,0,1; persisted 1; 401/404 guards) |
| api pytest | 260 passed | **275 passed ×2** |

**Contract for the consumer units (`.eq` F-35/F-112 · `.vedit` F-83 · `.gallery` F-39/F-46).**
- **Budget (F-35/F-83).** `budget` counts **harmonics**: `|n|` groups, with DC as one. The expanded `latex` shows every kept harmonic and no longer ends in `\cdots`. In trig form a harmonic is one or two terms (cos and/or sin), and a term below 0.5% of the maximum amplitude is still hidden. `energy_captured` is the energy of the kept groups. `/simplify`'s `term_count` stays `len(kept)`, counted in exponential terms. The panel should scroll or wrap for up to 20 harmonics.
- **F-112.** `POST /api/equations/compute` answers **422 `application/problem+json`** `{type: "urn:contract:validation-failed", title, status: 422, detail}` for an invalid f(x). The `detail` is a message such as `Cannot parse expression: …`, `Unknown function: foo`, `f(x) may depend only on x, not y` or `f(x) is not finite`. Show `detail` under the field with `aria-invalid`, and do not offer Retry on a 4xx. A 429 or 504 is still transient.
- **F-39.** `GET /api/visualizations?q=&tier=&basis=` sits alongside `limit/sort/cursor/owner`:
  - `q` is a case-insensitive substring of the title, description or a tag.
  - `tier` is `featured|saved|normal|all`. An untiered row counts as `normal`, and any other value answers 422.
  - `basis` matches one entry of `active_bases`.
  - Resend the same filters with `cursor` when paging; the `Link: rel=next` header carries only `cursor`, as before.
- **F-46.** `PUT /api/visualizations/{slug}/like` with body `{"liked": true|false}` and an `X-Session-Token` returns `200 {slug, liked, likes}`, and is idempotent per session user. `GET /api/visualizations/{slug}/like` returns the same body and should be used to seed `aria-pressed` after a reload. Errors: 401 `session-invalid` without a session · 404 when the row is unreadable · 400 for a bad slug shape · 429 when the per-IP write budget of 10/min is spent, since a like costs one write.

**Adjacent edits (§0bt).** Both are in the same repo and the same concern, and both are the lines the lock names:
- `src/fourier_analysis/symbolic/simplification.py:15-33`: the body of `truncate_by_budget` (F-35).
- `src/fourier_analysis/symbolic/latex_rendering.py`, 19 lines deleted and 5 docstrings changed, all in the named renderers' cap mechanism (F-83). HEAD `:32` `max_terms = 4`; `:39,:49,:52-55` its `term_count` counter and break; `:72,:103-107` and `:123,:143-147` the `shown` counter and `if shown >= 4` break; docstrings at `:4,:26,:65,:116,:279`.

  The lock asks for "a few lines". The cure is the three named caps together with the counters that exist only to feed them. Leaving the counters as dead code, or passing a cap in the wrong unit, would be a defect, so they are recorded here rather than escalated.

**Residuals.**
- (i) The dev API on :8000 (`uvicorn api.main:app`, no `--reload`, started 10:36) still serves the pre-cure code. A consumer seat that reads these routes live must restart it with the §0cn/§0cv environment (`MONGO_URI=…:27018/fourier`, `BLOB_DIR=~/.mongo-dev/fourier-blobs`, the e2e rate limits). This seat did not restart it: the host instrument is not in its writable set.
- (ii) `render_*_sigma` falls back to the expanded renderer when a series has only negative harmonics (`latex_rendering.py` exponential and polar sigma fallbacks). That fallback now renders every term it is given instead of 4. This affects the sigma form of a one-sided series only, and no row covers it.
- (iii) Existing and unrelated to these rows, seen in the BEFORE output: `\frac{3.3}{2}` prints a₀ where a₀/2 was meant, and `e^{i-t}` at n = −1. They are not in any server row, so they are not touched.

**Escalations:** none.
