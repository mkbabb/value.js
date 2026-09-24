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
   - Five docstrings that described the cap were corrected (the module line and four function docstrings).
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

### F.W14U.vdock

SEAT `.vdock`, `claude-opus-5-5`, 2026-09-24. Spec `F-W14U.md` (58 L, read whole; Units :8-18). Register rows read at their lines (`audit/UI-AUDIT-fourier.md` :78 :83 :150-168 :205 :218 :229 :254-263 :315 :326-330). COHESION §0cl..§0cx read at their headings (:3253-3392); no ruling names a `.vdock` row. `.d` receipt read (shares `AnimationControls`/`CanvasControlsDock`/`SpeedSelect`).

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → nothing under this unit's set (`?? .worktrees/` only); value.js `C/F-W14U.md` clean. **Nothing inherited.**

**Instrument.** Dev `:3100` (the working tree, HMR) and `:8000` → `200`/`200`. The RED readings run against the **pre-cure bytes** served from a detached worktree at HEAD `798c98f` (⟨`git worktree add --detach <scratch>/vdock/pre HEAD`⟩, `web/node_modules` symlinked, ⟨`npx vite --port 4178 --strictPort`⟩, proxying the same `:8000`). Data = the e2e global seed (`e2e/global-seed.ts`, per-run keyed); the falsifier seeds nothing. All falsifier runs **headed** (`--headed`), `--workers=3`, host load 52-196 (recorded per run).

**Acts, in order.**
1. **Anchors at the bytes.** Drifted: F-92's `useCanvasSetup.ts:18/:40` is now `.p2`'s `backingSize()` rule (`2b86203`); the only `getBoundingClientRect` left is the non-device-box fallback (`:86`), which Chromium never takes. F-81/F-9's `AnimationControls.vue:183-198` = `:184-216` at HEAD; F-76/F-173's `CanvasControlsDock.vue:64/:68` = `:77/:74`; F-181's `ExportModal.vue:55-70` holds. F-124: the fs-dialog's rounded corner is the owner's OA-1 ruling (`FullscreenViewer.vue` X.F.W11.a comment: "the squared corner is abrogated"). F-174's overlay draw is `composables/useImageOverlay.ts:74-90` (a flat `globalAlpha 0.28` `drawImage`), not `BasisCanvas.vue`.
2. **Falsifier** `web/e2e/f-w14u-vdock.spec.ts` (new), 9 cases, each framing the served page `{before,after}-<case>-<width>.png` under `web/e2e/screenshots/f-w14u/vdock/` (PNG gitignored, on disk):
   - **v9** ×{1440, 390} (F-9 ⊕ F-82 ⊕ F-175 ⊕ F-240): the ⋮ menu holds no combobox; every row sits inside the menu; `scrollWidth − clientWidth ≤ 0.5`; Export is in view and its centre hits it; a `group` named Speed and one named Easing; the dock holds no speed Select; choosing `2×` and `Linear` keeps the menu open with each `aria-checked`. F-137's clearance is READ (annotation), not asserted.
   - **v76** ×{1440, 390}: View options' plate (the popper wrapper holding its toggles) opens at or below its trigger, never above the stage top, inside the viewport.
   - **v94** ×{1440, 390}: the collapsed canvas dock's face glyph ≠ the Fullscreen control's glyph.
   - **v244** ×{1440, 390}: the fullscreen takeover's `aria-describedby` resolves to text; F-92's fill READ (canvas `offsetWidth` vs container).
   - **v181** 1440 (F-181 ⊕ F-229 ⊕ F-243 ⊕ F-182's labels half): described dialog; every switch inside `[data-slot=labeled-field]`; no consumer size class on the title; switches named Opaque background and Reference contour; no Reka Description warning; an export with Opaque background on has 0 transparent pixels; it stays on at the next open; Reference contour off removes > 100 px; Grid on + Labels off keeps grid pixels in the top-left 200×100 region.
3. **RED ×2 against the pre-cure bytes (`:4178`).** ⟨`FW14U_PHASE=before BASE_URL=http://localhost:4178 npx playwright test e2e/f-w14u-vdock.spec.ts --project=chromium --headed --workers=3 --reporter=json`⟩ ×2 → **8 failed · 1 passed**, both runs identical (loads 51.9 / 79.2):
   - v9 1440: dock combobox `1`; menu combobox `1`; no Speed group. v9 390: combobox `1`; row `"1×"` outside the menu; **`overflowX 25`** (the BROKEN frame).
   - v76 390: plate top **13** vs trigger bottom 178.9 / stage top 120.9 (over the app chrome). v76 1440 **passes pre-cure** (top 139 ≥ 135: glass's collision flip already put it below; the plate was centre-aligned, right edge 909) — F-76's RED is its 390 half.
   - v94 ×2: face glyph = Fullscreen glyph `true`.
   - v244 ×2: description `""`.
   - v181: description `""`, `glassRows 0/4`, title size class `true`, no ground switch. (These two RED runs carried the switch's first name, "Background"; the final spec names it "Opaque background". The pre-cure dialog has no ground switch under either name, and v181's description, glass-row and title assertions fail there independently of it.)
   - F-92 read pre-cure: `{cw 1440, pw 1440}` · `{cw 390, pw 390}` — **GREEN-BEFORE-CURE** (cured at the `.p2` root).
4. **Cures** (fourier, the unit's set):
   - `SpeedSelect.vue` — rewritten: the Select (bare trigger in the dock from `sm`, `.input-pill` trigger in the menu below it) becomes a labelled `DropdownMenuLabel` + `DropdownMenuRadioGroup` over `ANIMATION_SPEEDS` (`lib/defaults.ts`), items preventing `select` so the menu stays open; the store's setter still coerces. It is the register's interim for F-9 (speed as `DropdownMenuRadioItem`s), EasingPicker's sibling section.
   - `EasingPicker.vue` — its radio items prevent `select` (F-240: choosing keeps the menu open).
   - `AnimationControls.vue` — the dock's speed Select + its Tooltip deleted (one control per setting); the menu = `.menu-sections` (Speed, Easing; `overflow-y: auto`, `min-block-size: 0`) + Export pinned below; `.menu-popup` capped at reka's `--reka-dropdown-menu-content-available-height`, `overflow: hidden`.
   - `CanvasControlsDock.vue` — View options `PopoverContent side="bottom" align="end"` (F-76; glass's placement takes no consumer collision padding, measured at `_shared/overlay/placement.d.ts:17-22`); the collapsed face glyph `Maximize2` → `Ellipsis` (F-94).
   - `FullscreenViewer.vue` — a sr-only `DialogDescription` (F-244); the undeclared `:show-ghost`/`:show-image-overlay`/`@toggle-*` passed to `AnimationControls` (raw DOM attributes, dead) deleted (F-93's plumbing limb).
   - `ExportModal.vue` — glass `LabeledSwitch` rows (`layout="horizontal"`) replace the hand-rolled label+Switch rows and their CSS (F-181); `DialogDescription` (F-181); title loses `text-lg font-semibold` (F-229 consumer, F-243 rung); the Download icon's literal size dropped (F-243); new switches Reference contour and Opaque background (the first cut carried a `description` under a "Background" label; its frame showed the description wrapping in three short lines of muted ink beside the switch column, so the label says it whole and the description is gone); the choices persist per viewer under `fourier:export-options` through `useSafeStorage` (a malformed record reads as the defaults) (F-243).
   - `BasisCanvas.vue` — `FrameLayers` gains `ghost` and `labels` (the live draw: `ghost = props.showGhost`, labels on); export options `withReference` / `withBackground`; the `clearRect(0, 0, 200, 100)` label "erase" deleted — labels are skipped (F-182's labels limb); an opaque ground = the first opaque ancestor background the engine resolves (F-243).
5. **Probes that changed the cure (measured, then withdrawn).**
   - **F-173** (the dot only off-default) was written, then withdrawn: `.d`'s committed falsifier `e2e/f-w14u-d.spec.ts:123` (d2) reads `.dock-layer--summary .view-dot` **at the default view state** (trace on), so an off-default-only dot makes d2 throw on a null rect. The cure needs d2's setup to switch the trace off first: a sibling unit's file, which the ADJACENT-LINE RULE excludes. → escalated (E-4).
   - **F-244's Exit tooltip** was written, then withdrawn: the takeover's open-autofocus lands on Exit, the tooltip opens on that focus, and the first Escape dismissed the tooltip, not the takeover (probe: after keyboard open + Escape, the active element was still "Exit fullscreen"). The Exit control's form rides F-93 (the hosted dock's Minimize).
   - **F-148** was probed on both trees (⟨headless node probe, fresh upload, 1440⟩). Pre and post: keyboard open + Escape → focus `Fullscreen`; pointer open + Escape → `Fullscreen`; **pointer open + Exit click → `BODY`**. A `@close-auto-focus` hand-back (invoker captured at open) and an Exit re-routed through `DialogClose` each measured **no change** (`BODY` ×2) and were withdrawn. Cause: on the Exit-click path the pointer rests at the takeover's top-right, so when the takeover closes the canvas dock rests collapsed and its Fullscreen control sits in the dock's inert expanded layer, which cannot take focus. The Escape path works only because the pointer never left the dock. The stray "Fullscreen" tooltip after Escape is the tooltip opening on the restored focus (measured pre and post). Both are glass halves (the dock's posture when focus returns into it; a tooltip opened by a programmatic focus restore). → routed (see Relay).
6. **Instrument incident (caused by this seat, repaired).** The first pre-cure server (`:4178`) symlinked `web/node_modules`, so vite's dependency pre-bundle wrote into the shared `web/node_modules/.vite/deps` (⟨`ls -la`⟩ → modified 13:03, the minute it started). The `:3100` dev server's module graph then held two Vue copies: `/morph` rendered blank with `TypeError: Cannot read properties of null (reading 'ce')`, and the paper and `/morph` keystones failed in neighbour runs 1-2. Repair: `:4178` stopped; `:3100` restarted with its own command from its own cwd (⟨`npx vite web --port 3100 --strictPort`⟩ in `fourier-analysis/`), after which `/morph` → `errs 0 · heading 1` ×2. Every GREEN and neighbour figure below was read **after** the restart. The second pre-cure server used an isolated `cacheDir` (a scratch `vite.pre.config.ts` spreading `vite.config`), leaving the shared cache untouched (⟨`ls -la .vite/`⟩ still 13:29). Both scratch worktrees were removed (⟨`git worktree remove --force`⟩; symlinks unlinked first).
7. **GREEN ×2 on the settled bytes (after the restart).** ⟨`FW14U_PHASE=after BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-vdock.spec.ts --project=chromium --headed --workers=3 --reporter=json`⟩ ×2 → **9 passed · 0 failed**, both runs (loads 23.0 / 28.8). Readings: v9 `overflowX 0 · out [] · combobox 0` at 1440 and 390; v76 plate top 139 ≥ 135 (right edge 763, end-aligned) and 183 ≥ 178.9 at 390; v181 `description "Save the current frame as a PNG, with the layers you choose." · glassRows 6/6 · titleSizeClass false`. Frames AFTER inspected: the 390 menu shows Speed (5 rates) · Easing (6 curves) · Export all inside the plate, with Export in view.
8. **Neighbours (non-regression), after the restart.** ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14-uia.spec.ts e2e/f-w14-dpr.spec.ts e2e/f-w14u-d.spec.ts e2e/fullscreen.spec.ts e2e/visualization-ux.spec.ts --project=chromium --project=chromium-headed --workers=3`⟩ ×2 → **51 passed · 1 failed** ×2 (loads 29.8 / 23.7). The one RED both times is f-w14-uia `:162` (UIA-F-17), a 60 s timeout at the fourth export's `Play animation` hover.
   - **The Close gate's own mode passes it.** ⟨`… e2e/f-w14-uia.spec.ts --project=chromium --workers=1`⟩ → **32 passed**. ⟨`… -g "UIA-F-(5|7|12|17) " --workers=1`⟩ → **4 passed**. F-17 alone → passed.
   - **It is not this unit's.** ⟨`… e2e/f-w14-uia.spec.ts --project=chromium --workers=3`⟩ reads it RED ×2 on the cured bytes, and RED ×2 on the **pre-cure bytes** (the isolated `:4178`, same spec). The pre-cure failure is at `:209` ("Epicycles off removes the chain", Expected > 23840). `:162` under concurrency is F.W14's recorded load-sensitive case (`C/F-W14.md:1789`). It is not in the named set, so it is carried to the Close (R-3).
   - The adjacent F-17 edit below is required, not cosmetic. Neighbour run 1 was read before that edit, on the broken graph of act 6. It read `:209` RED with `all − noChain = −25222`, because the toggle-from-default helper, meeting remembered choices, flipped the previous export's switches back.
   - f-w14-dpr G-p (headed) 2/2 in both runs, and `.d`'s d1/d2 6/6.
   - `:3100` rewrote 4 tracked dpr frames (`web/e2e/screenshots/f-w14/after-dpr-epicycles-{1x,2x}-{figure,rest}.png`). They were clean at open and outside this set, so they were restored by exact path (⟨`git checkout HEAD -- <4 paths>`⟩). Tree after: `?? .worktrees/` only.

**Commit.** fourier **`7ad6be2`**. Pathspec: the 7 components, `web/e2e/f-w14u-vdock.spec.ts` (new) and `web/e2e/f-w14-uia.spec.ts` (adjacent). Pushed: ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `7ad6be235763`. Frames are on disk under `web/e2e/screenshots/f-w14u/vdock/` (`{before,after}-{v9-more-open,v76-view-options,v94-collapsed,v244-fs-open}-{1440,390}.png` and `{before,after}-v181-export-open-1440.png`: 18 frames, ⟨`ls | wc -l`⟩ → 18). PNGs are gitignored and were not force-added.

**Adjacent edits (§0bt):** `web/e2e/f-w14-uia.spec.ts:188-196`. UIA-F-17's export helper names switches by role, because the hand-rolled `label.option-row` it located is gone (F-181). It now *sets* each of the four layer switches rather than toggling from a presumed default, because the dialog remembers choices across opens (F-243). No assertion was changed.

**Row dispositions (23).**
| row | disposition | evidence |
|---|---|---|
| **F-9** (BROKEN) | **CURED** (the register's interim: speed as menu radio items, Export pinned outside the scroll area). F-81's pane is the final form (E-1) | v9 1440+390: RED ×2 (`overflowX 25`, row `1×` outside, combobox 1) → GREEN ×2 |
| **F-14** (BROKEN) | **ESCALATED (E-2)** | cure site `VisualizationView.vue`, outside the set |
| F-76 | **CURED** | v76 390: RED ×2 (top 13 over the chrome) → GREEN ×2. The 1440 half was already below the trigger pre-cure; end-aligned now |
| F-77ˢ | glass half ROUTED O-59 (standing). Consumer half (a menu of two CheckboxItems) **ESCALATED with F-79 (E-3)** | — |
| F-79 | **ESCALATED (E-3)** | — |
| F-80ˢ | glass half ROUTED O-59 (standing). Consumer geometry = F-5, non-regression GREEN (f-w14-uia F-5 in 4/4 ×1 at `--workers=1` and in the ×2 neighbour runs); plus F-94's face | — |
| **F-81** | **ESCALATED (E-1)** | — |
| F-82 | **CURED** | v9: no combobox in the menu or the dock, RED ×2 → GREEN ×2 |
| F-92 | **GREEN-BEFORE-CURE** (cured at the `.p2` root, `2b86203`); no edit | v244 read: `cw = pw` at 1440 and 390, pre and post |
| F-93 | **PARTIAL**: dead attribute plumbing deleted. Hosting the canvas dock in the takeover rides F-14 (E-2) | — |
| F-94ˢ | consumer **CURED**; glass half (reserved persistent space) ROUTED O-59 (standing) | v94 ×2 widths RED ×2 → GREEN ×2 |
| F-124ˢ | glass half (a takeover arm) ROUTED O-59 (standing). Consumer: **no change, by the owner's OA-1 ruling** (X.F.W11.a keeps glass's radius on the takeover) | `FullscreenViewer.vue` fs-dialog comment |
| F-137ˢ | glass half ROUTED O-59 (standing; DockTrigger anchoring to the dock face). Consumer: `DropdownMenuContent` takes only `side`/`sideOffset`/`align`/`alignOffset`, and a larger literal offset would copy the dock's padding, so no consumer cure | v9 read: menu bottom − plate top = −8.1 (1440) / −7.5 (390) post-cure |
| F-148 | **ROUTED**: glass halves, new (Relay) | act 5 probes: Exit-click → `BODY` pre and post; Escape → `Fullscreen` pre and post |
| F-173 | **ESCALATED (E-4)** | act 5 |
| F-174 | **NOT LANDED (residual R-1)** | — |
| F-175 | **CURED**: labelled Speed and Easing sections; speed left the dock | v9 groups, RED ×2 → GREEN ×2 |
| F-181 | **CURED** | v181 RED ×2 → GREEN ×2 |
| F-182 | **PARTIAL**: labels skip **CURED** (v181 corner > 0). Export → canvas dock and fullscreen → dialog **ESCALATED (E-2)** | — |
| F-229ˢ | consumer (`text-lg`) **CURED**; glass header anatomy ROUTED O-59 (standing) | v181 `titleSizeClass` RED ×2 → GREEN ×2 |
| F-240 | **CURED**: choosing keeps the menu open. The collapsed `×` ink was cured by `.d` d1 | v9 radio clicks → menu visible, GREEN ×2 |
| F-243 | **CURED**: opaque ground, remembered choices, the title rung and icon size, the reference-contour switch | v181 RED ×2 → GREEN ×2 |
| F-244 | **PARTIAL**: description **CURED**. Exit's form rides F-93/F-14 (E-2) | v244 RED ×2 → GREEN ×2 |

Tally ⟨count of the table's rows⟩ → 23:
- CURED 11: F-9, F-76, F-82, F-94, F-175, F-181, F-229, F-240, F-243, F-80 (consumer via F-5), F-124 (consumer by OA-1).
- PARTIAL 3: F-93, F-182, F-244.
- ESCALATED 5: F-14, F-77 (consumer), F-79, F-81, F-173.
- ROUTED only 2: F-137, F-148.
- GREEN-BEFORE-CURE 1: F-92.
- NOT LANDED 1: F-174.

**Gates BEFORE → AFTER.**
| gate | BEFORE | AFTER |
|---|---|---|
| G-u (this unit's 23) | 23 owed | 11 cured · 1 green-before-cure · 2 routed · 3 partial · 5 escalated · 1 not landed (table) → **RED for the unit** |
| falsifier `f-w14u-vdock` | 8 failed · 1 passed ×2 (pre-cure bytes) | **9/9 ×2** |
| f-w14-uia F-5/F-7/F-12/F-17 + f-w14-dpr | GREEN (banked) | ⟨`-g "UIA-F-(5\|7\|12\|17) "` `--workers=1`⟩ 4/4; the uia file whole at `--workers=1` 32/32; dpr G-p 2/2 in each neighbour run; F-17 RED under `--workers=3` on **both** trees (R-3) |
| `vue-tsc -b` | 0 (banked) | ⟨`npx vue-tsc -b` ×2⟩ exit 0 · exit 0 (on the final bytes) |
| `vitest` | 86/86 (banked) | ⟨`npx vitest run` ×2⟩ `Test Files 14 passed (14) · Tests 86 passed (86)` ×2 |

**Escalations.** All four ask the orchestrator for a ruling on bounds. None is a substitute cure. Each cure below is what the register specifies; none was improvised.
- **E-1, F-81 (+ F-9's final form).** The register's cure (`UI-AUDIT-fourier.md:155`) has three parts:
  - one shared animation pane beside the stage, holding speed and easing;
  - /morph's three phases as segments on one glass Timeline with transport;
  - one easing catalogue (`easings.ts:186` `EASING_PRESETS` vs `:204` `ANIMATION_EASINGS`) and one picker, with the ⋮ menu keeping only Export.

  Measured bounds: the /visualize pane is the Configurator aside in `VisualizationView.vue:379-425` (owned by `.vstage`/`.vedit`). The morph timeline is `FourierMorphDemo.vue:25-55` (owned by `.misc`). A shared pane component would be a new file in no unit's set. `MorphPhaseConfig.vue` (in this set) is only one of the three sites. **Ask:** grant `.vdock` the pane mount lines in `VisualizationView.vue`, `FourierMorphDemo.vue`'s phase block, and one new shared component (e.g. `visualization/AnimationSettingsPane.vue`); or re-home F-81 to a unit that holds them.
- **E-2, F-14 (BROKEN) + F-93 + F-182 (export relocation) + F-244 (Exit).** The cure is to move the single live stage (`VisualizationView.vue:306-376`: BasisCanvas, ContourEditorCanvas with its ref and listeners, both docks) into the takeover, so no second editor is mounted. It requires `VisualizationView.vue` (a `Teleport`/host of the stage into `FullscreenViewer`), which is `.vstage`/`.vedit`'s. F-182's "Export on the canvas dock, fullscreen through the dialog" needs the same file (`@export` on `CanvasControlsDock` → `handleExportFrame` `:102`). **Ask:** grant `.vdock` those lines, or fold F-14/F-93/F-182's relocation into `.vstage`.
- **E-3, F-79 (+ F-77's consumer half).** One `ViewLayersMenu` (DropdownMenu, CheckboxItems) mounted by both docks means a new file plus `EditorControlsDock.vue:202` (`.vedit`'s). **Ask:** grant, or re-home to `.vedit`, which holds F-86 (the register says F-79 cures it).
- **E-4, F-173.** The cure conflicts with `.d`'s committed oracle `e2e/f-w14u-d.spec.ts:123` (d2 reads the dot at the default state). **Ask:** allow a two-line setup change in d2 (switch the trace off before reading the collapsed dot), then land the dot as `showImageOverlay || !showGhost` (the withdrawn cut, act 5).

**Relay (glass; O-59 addendum owed, not in this seat's bounds).** F-148's two glass halves, newly measured:
- (a) a dock's control that opened a modal cannot take focus back when the modal closes with the pointer outside the dock, because the control sits in the collapsed dock's inert expanded layer. The dock should restore its expanded posture, or seat the focus, when focus returns into it.
- (b) a tooltip opens on the dialog chassis's programmatic focus restore, which the register reports as the stray "Fullscreen" tooltip after Escape.

Also noted: `LabeledSwitch layout="horizontal"` sets its control in a fixed second column rather than at the row's end, so the export dialog's switches sit mid-plate (frame `after-v181-export-open-1440.png`). That is glass's layout; it is not overridden here.

**Residuals.**
- (R-1) **F-174 not landed.** The draw is `composables/useImageOverlay.ts:86-89`: a flat `globalAlpha 0.28` over a transparent canvas. A blend mode cannot act on a transparent backdrop, so the cure is a luminance key applied once per loaded image, at that file. No unit owns the file, so the ADJACENT-LINE RULE reaches it. The seeded image, though, is a photograph with no white ground (v174 probe: slab 44 px of 3.2 M, a false GREEN). The falsifier needs a white-ground upload. That case was withdrawn rather than committed GREEN.
- (R-2) F-137's 8 px overlap of the menu over the dock plate stays until glass anchors dock-launched content to the dock face (O-59).
- (R-3) f-w14-uia `:162` (F-17) is RED under `--workers=3` on the pre-cure and the cured bytes alike, and GREEN at `--workers=1` (the Close's mode). It is carried to the Close as F.W14's load/concurrency-sensitive case.
- (R-4) Two doc comments outside this set still name the retired Select: `lib/defaults.ts:55` and `stores/animation.ts:69`. They are documentation only; no code reads them.

**Status: PARTIAL**, escalations E-1..E-4.

### F.W14U.vstage

SEAT `.vstage`, `claude-opus-5-5`, 2026-09-24. Spec `F-W14U.md` (65 L, read whole: Units :8-18, addenda to (e)). Record read: header through the Unit plan, and `.vdock`'s receipt (the last section; it shares the file chain). Register rows read at their lines (`audit/UI-AUDIT-fourier.md` :142-148 :169 :213-214 :217 :227 :246-253 :264 :323-325 :331). COHESION §0cl..§0cy read at their headings (:3253-3420); no ruling names a `.vstage` row.

**Crash-recovery (inherited).** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/`, `?? web/e2e/f-w14u-vstage.spec.ts` (378 lines, 13:56, a killed predecessor's falsifier; no source edit in the set). Read whole and judged against the rows: its 10 cases matched the register; it lacked F-74 and F-168, and three assertions were wrong at the true bytes (below). It was finished here, not trusted: every case was re-read RED and GREEN on this seat's own runs. value.js `C/F-W14U.md` clean.

**Instrument.** Dev `:3100` (the working tree, HMR) and `:8000` → `200`/`200`; `MONGO_URI=mongodb://localhost:27018/fourier`. No detached worktree (the `.vdock` act-6 incident): the pre-cure bytes are this set's files at HEAD `7ad6be2`, served by `:3100` before any edit, and again after the cure patch was saved (⟨`git diff HEAD -- web/src > vstage-src.patch`⟩), the ten files restored by exact path (⟨`git checkout HEAD -- <10 paths>`⟩) and the patch re-applied (⟨`git apply`⟩) after the RED runs. Data = the e2e global seed; network failures and delays stubbed with `page.route`. All runs headed, `--project=chromium --workers=3`.

**Acts, in order.**
1. **Anchors at the bytes.** Drifted, intent kept: F-70/F-71's ring `VisualizationView.vue:205` → `:236`; F-73's box is `lib/canvas-drawing/placeholder.ts:28-65` (the register's `visualization/placeholder.ts` moved); F-95's second toast is not `workspace.ts:388` but the loader's `store.error` watcher (`useWorkspaceLoader.ts:193-199`) beside `handlePublish`'s own; F-167's upload arm is `workspace.ts:156-158` (the shared `error` + a rethrow); F-169's Preview layer is `VisualizationView.vue:390` (`ContourPreview`); F-170's pill is `BasisSelector.vue:153-167` + `toggleBasis` `:103-133`; F-171's divider `ContourSettings.vue:292-299`. F-168's error card was already the shared glass `NotFoundCard` (F-50), route-aware. ⟨`grep -c "compact" EasingCurve.vue.d.ts`⟩ → 0 and ⟨`grep -c "loading" DockControl.vue.d.ts`⟩ → 0 at glass 10.0.1 (F-136, F-132 glass halves still open).
2. **Falsifier** `web/e2e/f-w14u-vstage.spec.ts` (inherited, finished): 18 cases (19 while F-74's e74 stood; act 6), each framing the served page `{before,after}-<case>-<width>.png` under `web/e2e/screenshots/f-w14u/vstage/` (PNG gitignored, on disk). Cases: e69 ×{1440,390} (F-69 ⊕ F-165 ⊕ F-237: one visible h1 in the stage, a `data-emphasis="primary"` action named /choose an image/ and not /click/, "Browse the gallery", 0 painted canvas pixels, the 390 chassis ≥ 15.5 px from each edge) · e166 1440 (stage `data-dragging`; `dragover`/`drop` on `header` default-prevented; a dropped `notes.txt` → an alert naming it; with an image, no fixed pointer-taking element over half the viewport) · e167 1440 (a 500 upload → an alert at the drop target, no "Could not load this workspace"; `/w/no-such-image-slug` → not-found with 0 page errors) · e70 ×{1440,390} (a delayed cold load → a `role=status` "Loading" inside `.configurator-stage`, the chassis present, 0 `.animate-spin`; `/v/no-such-slug` → not-found inside the stage) · e73 ×{light,dark} (a delayed compute → a `role=status` "Computing" in the stage; the dashed box's top-edge row paints < 40 css px) · e133 (the uploading primary is `aria-busy` and named /Uploading/) · e95 (logged out: 0 POSTs, 1 toast, /log in/) · e169 ×{1440,390} (image ≤ 96 px tall on its Replace row; radius > 0 with box aspect = image aspect ±3 %; no FrequencyGraph; no Preview layer) · e170 ×{1440,390} (no `.basis-toggle`; a "Fourier mode" radiogroup of Epicycles/Series/Off and a "Polynomial bases" group, each one row; Series selects) · e171 ×{1440,390} (Advanced is a glass Button with `aria-expanded`, no `.advanced-divider`; 0 non-focusable tooltip triggers in Decomposition + Contour; one `--track-color` over > 3 sliders) · e168 ×{1440,390} (the error card: no stamp, its heading, no "workspace" on `/v/`).
   Three inherited assertions were wrong at the true bytes and were corrected before the final RED/GREEN runs: e166's covering-element read counted the page's own fixed paper grid (`pointer-events: none`, `-z-10`), so it now counts only pointer-taking fixed elements; e170 asked for role `group`, but a one-of-three ToggleGroup is a `radiogroup`; e171 asked for `data-slot="button"`, which the Collapsible's `as-child` trigger renames, so it reads glass Button's `data-emphasis`.
3. **RED ×2 against the pre-cure bytes, final spec.** ⟨`FW14U_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-vstage.spec.ts --project=chromium --headed --workers=3 --reporter=json`⟩ ×2 → **17 failed · 2 passed**, both runs identical (loads 45.8 / 47.6). The 2 passed are e168 ×2 (**GREEN-BEFORE-CURE**, F-50's card). Readings: e69 `h1:visible` 0 · e166 `data-dragging` null · e167 no alert · e70 no status ×2 · e73 no status ×2 · e133 name "Drop or click to upload" · e95 **1 POST** · e169 image **200 px** ×2 · e170 `.basis-toggle` **3** ×2 · e171 `data-emphasis` null ×2 · e74 the canvas **hidden**. (An earlier pair on the inherited spec read the same 17/2.) Without e74 (withdrawn, act 6) the same runs read **16 failed · 2 passed** for the 18 committed cases (the cases are independent).
4. **Cures** (fourier, this unit's set):
   - `VisualizationView.vue` — the cold load and the load error render **inside the Configurator `#stage`** (F-70): the load's one busy mark is glass's indeterminate `Progress` in a `role="status"` block with a route-aware caption, and the retired `animate-spin rounded-full border-t-primary` ring is gone (F-71, F-238); the NotFoundCard (F-50's glass Card, route-aware copy) sits in the stage. The first compute shows the same mark over the stage, "Computing the Fourier decomposition…" (F-73). The empty stage is composed (F-69, F-165, F-237): the route's one `h1` (`font-serif-math text-display-2`), a lede (`text-body`), the primary action (`emphasis="primary"`, "Choose an image" on a fine pointer, "Tap to choose an image" on a coarse one, "Uploading…" while loading with the Upload glyph out of the loading seat, F-133), the format line, an inline `role="alert"` line for a rejected file or a failed upload (F-166, F-167), and a quiet "Browse the gallery". The page-covering `fixed inset-0` drag overlay is deleted; the whole stage carries `data-dragging` and an inset focus-ring rim (F-166, F-237). The window takes `dragover`/`drop` (`useEventListener`) so a stray drop cannot navigate (F-166). A picked file takes the drop's path (`handleFileSelect`). Logged out, Publish toasts once, "Log in to publish to the gallery.", with no POST; a failed save is reported by the loader's `store.error` channel alone (F-95, F-245). The Preview layer is not mounted (F-169). Below lg the chassis keeps the 16 px page gutter (F-237). The mobile tab strip drops its opaque `bg-background` (F-238). `onConfiguratorUnmounted` is deleted: its premise (a failed upload unmounting the Configurator) is gone.
   - `stores/workspace.ts` — `uploadError` is the upload's own diagnosis (F-167); `uploadImage`, `loadWorkspace` and `loadVisualization` record their failure and no longer rethrow it into callers that never awaited (the unhandled "Not Found").
   - `composables/useImageUpload.ts` — one `accept(file)` path for drop and pick; a non-image sets `rejection` ("notes.txt is not an image. Choose a PNG, JPG or SVG.") (F-166).
   - `lib/canvas-drawing/placeholder.ts` — no grid with no image (one grid, F-237) and no dashed box, arrow or "Computing..." text (F-73).
   - `ImageUpload.vue` — a compact row: the thumbnail's box is the image (both axes bounded, `auto` sizes, `--radius-media` on the image) beside its Replace button (F-169, F-239); the sidebar bar is the upload's only (F-71, F-238's jump).
   - `CoefficientsPanel.vue` — the FrequencyGraph above the spectrum rows is removed: one amplitude view (F-169).
   - `BasisSelector.vue` — glass `ToggleGroup`s: `type="single"` "Fourier mode" (Epicycles · Series · Off) and `type="multiple"` "Polynomial bases" (Chebyshev · Legendre), each on one row; the local `.basis-toggle` retint and the hidden cycle are deleted (F-170, F-238).
   - `ContourSettings.vue` — the Advanced trigger is glass's `Button` through `CollapsibleTrigger as-child` (F-171); the five slider tooltips (wrapping non-focusable rows) become each row's `subtitle` (F-146); every slider reads `--control-accent` (F-172).
   - `style.css` — `--control-accent: var(--primary)`, the aside's one control accent (F-172).
   - Also, to the hierarchy rider (§0cu), measured on the AFTER frames and cured before the final runs: the 390 sheet had a ~111 px blank band above Image (⟨probe⟩ `.configurator-stage` h 111 with its one child `display: none`: the mobile stage's `flex: 1 1 0%` took the leftover height once the Image row shrank) → the inactive stage takes `flex: 0 0 0%` (h 0); the Advanced rows are one column (at half width each hint and value field could not share a line); the upload failure reads "The upload failed: <detail>".
   - **Adjacent (§0bt):** `web/src/components/visualization/ContourPreview.vue` deleted — its one mount was the Preview layer (F-169); ⟨`grep -rln ContourPreview web/src web/e2e`⟩ → comments only. The oracles naming copy this unit changed: `e2e/f-w13-image-empty.spec.ts:79,:81` and `e2e/f-w13-image-controls.spec.ts:87` and `e2e/visualization-crud.spec.ts:153` (the primary is "Choose an image", was "Drop or click to upload"); `e2e/f-w14-residuals.spec.ts:128-130` (G-c2: a failed upload is shown at the drop target, so the step that clicked the not-found card's "Upload a new image" now reads the drop target's alert; G-c2's own assertions — no sidebar, a 0 px band — unchanged). And `e2e/f-w14-uia.spec.ts:298-300` (UIA-F-18 ran logged out and stubbed the POST; F-95 now sends nothing logged out, so F-18's page is logged in the app's own way, `localStorage fourier-user-slug`, before `goto`; its assertions — one POST, the Published! toast, no "Could not save" — unchanged).

5. **GREEN ×2 on the settled bytes.** ⟨`FW14U_PHASE=after BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-vstage.spec.ts --project=chromium --headed --workers=3 --reporter=json`⟩ ×2 → **18 passed · 0 failed**, both runs (loads 43.2 / 44.7), the seat's only runner at the time. Earlier GREEN pairs ran on bytes that later changed (the 390 blank band, the one-column Advanced rows, the failure copy, F-74's withdrawal) and are not counted; one pair on the final bytes read e169 ×2 RED in its second run ("Uploaded image" not found in the sheet) while this seat's superseded neighbour run was finishing (every run seeds and tears down the same content-addressed image); the cause was not isolated. Rerun with nothing else of this seat's running, the pair above is 18/18 ×2. Frames AFTER inspected: the empty stage (title, lede, primary, format line, gallery path) at 1440 and 390; the stage rim on drag; the failure line at the drop target; the load and compute marks centred in the stage (light and dark); the compact image row and the two choosers on one row each at 1440 and 390; at 390 the sheet starts at the tab strip (no band).
6. **F-74, landed and withdrawn (E-3).** The cure was the watcher below in `VisualizationView.vue`, with e74 (390: upload → `/w/` → the canvas visible, `.canvas-stage` not `panel-inactive`, the sheet `panel-inactive`). It read RED ×2 pre-cure and GREEN ×2 on the cured bytes. The first neighbour run read `.s`'s G-s 390, `f-w14-veil` and `f-w14-control-row` RED because each uploads at 390 and expects the Controls sheet in front; the watcher and e74 were removed, and the counted GREEN pair and neighbour pairs below ran without them.
   ```ts
   watch(() => store.uploading, (now, was) => {
       if (was && !now && store.imageMeta) mobileView.value = "canvas";
   });
   ```
7. **Instrument incidents (this seat's).**
   - To stop its own superseded neighbour run, the seat ran an unscoped ⟨`ps aux | grep "[p]laywright test" | awk '{print $2}' | xargs kill`⟩. That pattern also matches other tracks' runners. At the next read the only runner left was a value.js `e2e/smoke/w12-drag.spec.ts` started 3:05 PM, so a sibling seat's run may have been interrupted then. It is named here so its seat can re-read any result from that minute. (A `pkill -f "nbr.sh"` in the same act also killed that shell.)
   - The neighbour runs rewrite tracked frames under `web/e2e/screenshots/f-w14/`. Clean at open and outside this set, they were restored by exact path after the runs (below).
8. **Neighbours (non-regression), on the final bytes.** ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14-uia.spec.ts e2e/f-w14u-s.spec.ts e2e/f-w13-image-empty.spec.ts e2e/f-w13-image-controls.spec.ts e2e/f-w14-residuals.spec.ts e2e/visualization-crud.spec.ts e2e/f-w14-veil.spec.ts e2e/f-w14-control-row.spec.ts e2e/f-w14u-d.spec.ts e2e/f-w14u-vdock.spec.ts --project=chromium --project=chromium-headed --workers=3 --reporter=json`⟩ ×2 → run 1 **71 passed · 3 failed · 5 skipped** (load 31.3), run 2 **69 passed · 4 failed · 6 skipped** (load 39.6). The REDs: f-w14-uia `:162` (UIA-F-17, `.vdock`'s R-3: load/concurrency-sensitive, RED under `--workers=3` on pre- and post-cure bytes) ×2 and visualization-crud `:481` @mutating (2 then 3 viewports; 30 s default timeout); the skipped are `:481`'s serial tail (`:665`, `:675`). Neither reads RED alone: ⟨`npx playwright test e2e/visualization-crud.spec.ts:481 --project=chromium --workers=1`⟩ → `3 passed (22.8s)` (load 46); ⟨`… visualization-crud.spec.ts:481 e2e/f-w14-uia.spec.ts:162 --workers=1`⟩ → `4 passed (41.1s)` (load 46.7). `:481` passed at F.W14's close (`--workers=1`) and passes solo here at ~7.6 s a viewport; it is carried to the Close (R-8) as load-sensitive under concurrency, not dispositioned as this unit's. Every other named neighbour row is GREEN ×2: **f-w14-uia F-2/3/4/18/19/49/50** (F-18 with its adjacent login line), **`.s`'s G-s** at 1440, 1024 and 390 in both themes, f-w13-image-empty/-controls, f-w14-residuals (G-c2), f-w14-veil, f-w14-control-row, `.d`'s d1/d2, `.vdock`'s 9.
   The neighbour runs rewrote 19 tracked frames under `web/e2e/screenshots/f-w14/`; they were restored by exact path (⟨`git checkout HEAD -- <19 paths>`⟩ → `git status --porcelain web/e2e/screenshots` empty).

**Row dispositions (24).**
| row | disposition | evidence |
|---|---|---|
| **F-68** | **ESCALATED (E-1)** — cure site `BasisCanvas.vue:584` (`.vdock`'s file) | probe: canvas root radius 16px, border 2px, 3-layer offset stamp, inset 0/0 in the stage |
| F-69 | **CURED** | e69 ×{1440,390} RED ×2 → GREEN ×2 |
| F-70 | **CURED** | e70 ×{1440,390} RED ×2 → GREEN ×2 |
| F-71 | **PARTIAL**: this set's ring (`VisualizationView`) and the canvas box retired; one stage mark while computing. Other ring sites carried: `EquationPanel.vue:106` (`.vedit`), `EquationView.vue:401,:429` (`.eq`), `GalleryInfiniteGrid.vue:50` (`.gallery`), `AdminFlaggedPanel.vue:558` (`.admin`); DotRing export is glass's (F-72, O-59) | e70 `.animate-spin` 0 · e73 |
| F-73 | **CURED** | e73 ×{light,dark} RED ×2 → GREEN ×2 |
| F-74 | **ESCALATED (E-3)**: cured, measured, then withdrawn (act 6) | e74 390 RED ×2 → GREEN ×2 on the cured bytes; breaks `.s`'s G-s 390 |
| F-95 | **CURED** (gate before the round trip; one toast) | e95 RED ×2 (1 POST) → GREEN ×2 |
| F-132ˢ | glass half ROUTED O-59 (standing; DockControl has no `loading` at 10.0.1, ⟨grep⟩ 0). Consumer bind waits on it: ADOPT-AT-LANDING | — |
| F-133ˢ | consumer **CURED** ("Uploading…", the Upload glyph leaves the seat while loading); glass half ROUTED O-59 | e133 RED ×2 → GREEN ×2 |
| F-136ˢ | glass half ROUTED O-59 (no `compact` on EasingCurve at 10.0.1, ⟨grep⟩ 0); consumer `EasingPicker.vue:105` is `.vdock`'s: ADOPT-AT-LANDING | — |
| F-146ˢ | **PARTIAL**: ContourSettings' five slider tooltips → the rows' own `subtitle` (CURED, e171). Carried: `AnimationControls.vue:189-191` (Tooltip on the ⋮ svg, `.vdock`'s), `shared/CoefficientsSpectrum.vue:139-176` (12 row tooltips on non-focusable rows in a TransitionGroup). Glass PopperRoot probe ROUTED O-59 | e171 RED ×2 → GREEN ×2 |
| F-165 | **CURED** | e69 |
| F-166 | **CURED** | e166 RED ×2 → GREEN ×2 |
| F-167 | **CURED** | e167 RED ×2 → GREEN ×2 |
| F-168 | **PARTIAL**: error limb GREEN-BEFORE-CURE (F-50's NotFoundCard; route-aware copy), now inside the stage; the stage stamp limb = F-68 (E-1) | e168 GREEN before ×2 and after ×2 |
| F-169 | **CURED** | e169 ×{1440,390} RED ×2 → GREEN ×2 |
| F-170 | **PARTIAL**: the three-state chooser **CURED**; the "N = level" legend label is `BasisCanvas.vue:228,:411` (`.vdock`'s) → E-1 | e170 RED ×2 → GREEN ×2 |
| F-171 | **CURED** | e171 |
| F-172 | **PARTIAL**: one accent in the aside **CURED**; Magnet's red (`EditorControlsDock.vue:177`) carried to `.vedit` | e171 fills 1 distinct |
| F-183 | **ESCALATED (E-2)** | — |
| F-237 | **CURED** (pointer-aware copy, one grid, 16 px gutter, overlay retired, h1); ImageUpload surfaces retired with F-169 | e69, e166 |
| F-238 | **PARTIAL**: role=status, no jump (the compute arm left the sidebar bar), ToggleGroup, tab strip off the opaque fill **CURED**; the lone reset row = CONFIGURATOR-HEADER-ACTIONS honest-RED (`.a`, O-68) | e70, e170 |
| F-239 | **PARTIAL**: media half **CURED** (e169 aspect ±3%, radius > 0). Carried: `GlassTimeline` → `FourierTimeline` rename (importer `AnimationControls.vue` is `.vdock`'s), the caret plate, the 390 legend/dock overlap | e169 |
| F-245 | **CURED** with F-95 | e95 one toast |

Tally ⟨count of the table's rows⟩ → 24:
- CURED 12: F-69, F-70, F-73, F-95, F-133 (consumer), F-165, F-166, F-167, F-169, F-171, F-237, F-245.
- PARTIAL 7: F-71, F-146, F-168, F-170, F-172, F-238, F-239.
- ROUTED, glass half, consumer ADOPT-AT-LANDING 2: F-132, F-136.
- ESCALATED 3: F-68, F-74, F-183.

**Escalations.** All three ask the orchestrator for a ruling on bounds; none is a substitute cure, and each cure is the register's.
- **E-1, F-68 (+ F-168's stage limb, F-170's legend limb).** The register's cure is "drop cartoon-card when mounted in the stage" at `BasisCanvas.vue:584` (`class="canvas-container cartoon-card"`); the legend's `N = ${level}` is `BasisCanvas.vue:228,:411`. BasisCanvas is `.vdock`'s file (plan row 7), which the ADJACENT-LINE RULE excludes. Measured (⟨`probe68.mjs`, 1440, `/w/foggy-flying-claret-hound`⟩): the canvas root inside the stage has `border-radius 16px`, `border 2px`, a three-layer offset stamp (`-3px 3px`, `-5px 5px`, `-7px 7px`) and inset `0/0` from the stage cell. No local override was written (a stage-scoped `.cartoon-card` reset would mask the class, not remove it). **Ask:** grant this unit (or `.vedit`, next on the file chain) `BasisCanvas.vue:584` (drop `cartoon-card`; `e2e/f-w14-veil.spec.ts:157` names the class and falls back to `body`, so it moves with it) and `:228,:411` (label the legend's N).
- **E-2, F-183.** Every cure site is another unit's: the toast with a View action (`composables/useToast.ts` has no action seat; `.shell`), the "Published!" toast with the raw slug (`stores/gallery.ts:326`; `.gallery`), and the published state and glyph on the control (`CanvasControlsDock.vue:102-105`, the `Upload` glyph; `.vdock`). The duplicate copies come from `handlePublish` → `saveVisualization` creating a new draft per click (`workspace.ts:380-403`, this set), but the register's cure is "show 'Published' and offer Update" on the control, so the store half alone would change behaviour with no surface to say so. **Ask:** re-home F-183 whole to `.gallery` (which holds `gallery.ts` and the publish toast) with `useToast.ts`'s action seat and `CanvasControlsDock.vue:102-105` granted, or grant them here.
- **E-3, F-74.** The register's cure ("default `mobileView` to 'canvas' when an upload finishes", `VisualizationView.vue`) was landed and measured: e74 390 RED ×2 (the canvas `hidden`) → GREEN ×2. The neighbour run then read three oracles RED at 390, each because its setup uploads at 390 and expects the Controls sheet in front (a premise F-74 inverts): `.s`'s `e2e/f-w14u-s.spec.ts:29` + `:140` (G-s 390, "Replace image" not found; pane left 0), `e2e/f-w14-veil.spec.ts:36` (its comment: "at 390 it is the default tab") and `e2e/f-w14-control-row.spec.ts:230` (Harmonics slider hidden). G-s is `.s`'s gate, which this seat must keep green and whose spec the ADJACENT-LINE RULE excludes, so the cure and e74 were **withdrawn** (act 6). **Ask:** grant the setup lines (after the upload, below lg, select the Controls tab — as this unit's `openViz` does) in `f-w14u-s.spec.ts:22-29`, `f-w14-veil.spec.ts:28-36` and `f-w14-control-row.spec.ts:226-230`, and re-land the withdrawn five-line watcher and e74 (both recorded in act 6).

**Residuals (carried by id, each to the unit that holds its file).**
- (R-1) F-71's other retired-ring sites: `EquationPanel.vue:106` → `.vedit`; `EquationView.vue:401,:429` → `.eq`; `GalleryInfiniteGrid.vue:50` → `.gallery`; `AdminFlaggedPanel.vue:558` → `.admin`. The shared mark (DotRing) is glass's export (F-72, O-59).
- (R-2) F-146's other sites: `AnimationControls.vue:189-191` (a Tooltip on the ⋮ svg inside the DockTrigger; the trigger's `aria-label` already names it) is `.vdock`'s file; `shared/CoefficientsSpectrum.vue:139-176` (12 row Tooltips on non-focusable rows inside a TransitionGroup) is a shared component also mounted by `.eq`'s `EqCoefficientsPanel` and owned by no unit → `.eq`. Its `#graph` slot has no filler now (F-169) and goes with it.
- (R-3) F-172's Magnet red (`EditorControlsDock.vue:177`) → `.vedit`.
- (R-4) F-239's remaining limbs: `GlassTimeline` → `FourierTimeline` (a rename whose importer `AnimationControls.vue` is `.vdock`'s), the caret readout plate (`GlassTimeline.vue:219-226`, `:312-322`, whose producer plate needs a ruling on which glass surface replaces it), and the 390 legend/dock overlap, which is the legend's draw in `BasisCanvas.vue` (E-1's file).
- (R-5) Carried in from `.s` (i): at 390 the layer titles truncate ("Decomposit…") beside their `sub`. The truncation is glass's layer header register (one line); the owner's hierarchy rider leaves the ConfiguratorLayer header unstyled here.
- (R-6) Carried in from `.d` (ii): the canvas docks' 8 px gutter `.controls-dock-anchor { top/right: 0.5rem }` (O-67 R-2). Not landed here; the anchor also seats EditorControlsDock and rides to `.vedit`, the file's last unit.
- (R-7) F-238's lone reset row stays honest-RED CONFIGURATOR-HEADER-ACTIONS (O-68, `.a`).
- (R-8) visualization-crud `:481` @mutating reads RED (30 s default timeout) under this unit's neighbour concurrency (`--workers=3`, two projects, host load 31-40) and GREEN alone at `--workers=1` ×2 (act 8). Carried to the Close, which reads it at `--workers=1`.

**Commit.** fourier **`9a1d932`** (one commit, the unit's family: the ten set files, `ContourPreview.vue` deleted, the falsifier, the five adjacent oracle files). Pathspec: exactly those 16 paths (⟨`git show --stat HEAD`⟩ → `16 files changed, 854 insertions(+), 532 deletions(-)`). The message was amended once, before the push, to carry the session trailer (`--amend --only`, message only). Pushed: ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `9a1d932052b8`. Frames on disk under `web/e2e/screenshots/f-w14u/vstage/` (gitignored, not force-added): ⟨`ls | wc -l`⟩ → 37 (12 before, 25 after; e74's pair kept as E-3's evidence).

**Gates BEFORE → AFTER.**
| gate | BEFORE | AFTER |
|---|---|---|
| G-u (this unit's 24) | 24 owed | 12 cured · 7 partial · 2 routed (glass, adopt-at-landing) · 3 escalated (table) → **RED for the unit** |
| falsifier `f-w14u-vstage` | 16 failed · 2 passed ×2 (pre-cure bytes; e168 green-before-cure) | **18/18 ×2** (loads 43.2 / 44.7) |
| f-w14-uia F-2/3/4/18/19/49/50 · `.s`'s G-s | GREEN (banked) | GREEN ×2 in both neighbour runs (F-18 with its adjacent login line) |
| `vue-tsc -b` | 0 (banked) | ⟨`npx vue-tsc -b`⟩ exit 0 on the final bytes (and after every landing) |
| `vitest` | 86/86 (banked) | ⟨`npx vitest run` ×2⟩ `Test Files 14 passed (14) · Tests 86 passed (86)` ×2 |

**Status: PARTIAL**, escalations E-1..E-3.

### F.W14U.vedit

SEAT `.vedit`, `claude-opus-5-5`, 2026-09-24. Spec `F-W14U.md` (69 L, read whole: Units :8-18, addenda to (f)). Record read: the header through the Unit plan, and `.vstage`'s receipt (the last section; it carries R-1/R-3/R-6 to this unit). Register rows read at their lines (`audit/UI-AUDIT-fourier.md` :44-45 :157-163 :257-261 :327-328; F-12/F-15/F-16/F-79/F-84 for context). COHESION §0cl..§0da read at their headings (:3253-3440). **§0da / spec addendum (g), landed mid-seat** (the spec grew 69 → 78 lines while this seat ran; read at act 5): UIA-F-172's accent limb is REVERSED, controls wear their owner's hue, and the one-accent token `--control-accent` is deleted (by `F.W14U.c1`, in flight in disjoint files). This unit conformed (act 5). No ruling names another `.vedit` row; `.vdock`'s E-3 (F-79) and `.vstage`'s E-1..E-3 are unruled.

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only. value.js `C/F-W14U.md` clean. **Nothing inherited.**

**Brief vs register.** The seat-0 brief names "loupe drift F-85"; the register's F-85 is the notation chooser (`NotationPills.vue`), and the loupe is F-84 (GLASS, routed by `.u`). This unit follows the register's ids.

**Instrument.** Dev `:3100` (the working tree, HMR) and `:8000`. The API ran without `--reload`, started 10:36, before `.srv` (`798c98f`, 12:49) — the §0cn/§0cv caveat `.srv` recorded (`C/F-W14U.md:379`). It was restarted four times by exact PID with its own environment (read from ⟨`ps eww 30939`⟩: `MONGO_URI=…:27018/fourier`, `BLOB_DIR=~/.mongo-dev/fourier-blobs`, `COMPUTE_RATE_LIMIT=1000`, `WRITE_RATE_LIMIT=1000`, cwd the repo root): once to serve `.srv`'s F-83 and this unit's server lines; once more on the same cured code (a zsh word-split made the first restore a no-op: the patch read 0 lines, and `git checkout` refused the one-string pathspec, so no byte changed); once at HEAD for the final RED pair; and once on the cured bytes for the GREEN pair. Pre-cure bytes were served the `.vstage` way: the cure saved (⟨`git diff HEAD -- <7 paths> > vedit-cure.patch`⟩, 977 lines), the seven paths restored by exact path (⟨`git checkout HEAD -- <7 paths>`⟩), then re-applied (⟨`git apply`⟩). Runs headed, `--project=chromium --workers=3`, data the e2e global seed; nothing is saved to the server by any case.

**Acts, in order.**
1. **Anchors at the bytes.** Drifted, intent kept: F-15/F-16 are cured (`ContourEditorCanvas.vue:164-171`, `:223-228`, F.W14 `.u`); F-179's `inert` limb is already in (`VisualizationView.vue:379`, `.u`), its ring limb at `ContourEditorCanvas.vue:318` (`outline: none`); F-180's Reset is `:215-217` (`initFromContour`, history wiped); F-242's handle-click history is `usePointDrag.ts:54-60` (every pointerup ended a "drag"); F-86's toggle `EditorControlsDock.vue:200` with no `showGhost` on the editor; F-87's handles `ContourEditorCanvas.vue:282-292`, `:333-344`, `:360-364`; F-177's close `EquationPanel.vue:80-88` (`h-6 w-6 rounded-full` over `size="md"`), spinner `:105-107`, panel `top: 3.5rem` `:120`; F-178's Metric `:74-79` (`energyColor`) and Terms `color="var(--viz-fourier)"` `:99`; F-176's server limbs `src/fourier_analysis/symbolic/latex_rendering.py:92-93` + `:121-122` (`n_str` = "-" inside `i…t`) and `latex_format.py:31` (`:.2g` → `2.1e+02`). F-89 read GREEN before any edit (below). F-241's cap limb is `.srv`'s (the caps are gone at `798c98f`).
2. **Falsifier** `web/e2e/f-w14u-vedit.spec.ts` (new, 13 cases; frames `{before,after}-<case>-<width>.png` under `web/e2e/screenshots/f-w14u/vedit/`, PNG gitignored, on disk): v86 (the reference trace toggles on the editing surface) · v87 (at rest ≤ 1 handle painted; near the pointer only nearby handles, radius ≥ 4 px; a press 9 px off a point selects one; the selection painted, stroke ≥ 2 px ≠ fill; still found when the pointer leaves) · v88 390 (no expanded editor tool clipped or off the plate, enabled ones hit at their centre; no unmarked sideways scroller; Undo/Redo/Delete in the row; Magnet, Smooth, Simplify, Reset in "More editor tools") · v89 390 (Controls tab while editing: stage ≤ 1 px, pane in the first half-screen) · v179 (keyboard focus on the surface paints a ring) · v180 (Reset leaves an Undo; leaving with edits opens a dialog named /unsaved/; Keep editing stays; Discard leaves; no selection on re-entry) · v242 (no wand glyph on the resting face; a glass `.metric`, no `.dock-badge`; a bare click leaves Undo disabled; one `--btn-hover-color` across the dock; no Magnet toggle; the menu's Magnet track reads `--control-accent`) · v83 (Exp, Terms 20: the answered LaTeX has > 4 `e^{`, no `e^{i-`, no `\d[eE][+-]\d`; one `.fading-scroll`, its end cue when overflowing) · v177 1440 (`role=dialog` named "Equation"; a square close ≥ 24 px; no `.animate-spin`; a 900 ms-delayed refetch shrinks the panel ≤ 2 px; Escape with focus on `body` closes it) · v177m 390 (the panel does not overlap the canvas dock; inside the viewport) · v178 (Terms 2 < 95 %: Metric and value not `--destructive`; the Terms track resolves to `--control-accent`) · two frame cases (editor + panel at 1440 and 390).
3. **RED ×2 against the pre-cure bytes, final spec** (API at HEAD). ⟨`FW14U_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-vedit.spec.ts --project=chromium --headed --workers=3 --reporter=line`⟩ ×2 → **10 failed · 3 passed**, both runs (loads 43.2 / 47.3). The 3 passed: v89 (**GREEN-BEFORE-CURE**, `.vstage`'s inactive-stage rule `VisualizationView.vue:575`) and the two frame cases. Readings, identical ×2: v87 handles at rest **1024** · v88 **8** tools off the plate (the old 390 row) · v86 reference trace **0** after the toggle · v179 ring **false** · v180 Reset leaves Undo **disabled** · v242 wand **1** · v83 **`e^{i-`** present (the API at HEAD carries `.srv`'s F-83, so the term count no longer fails; an earlier pair against the pre-`.srv` process read "**3** terms at Terms 20") · v177m overlap **8 px** · v177 `role` **""** · v178 Metric **rgb(219, 36, 36)** = `--destructive`. (Two earlier RED pairs on an earlier spec, whose v88/v242 later followed Magnet into the menu, read 10 failed · 1 passed ×2, the same rows.)
4. **Cures** (fourier, this unit's set):
   - `ContourEditorCanvas.vue` — UIA-F-87: handles are sized in screen pixels (radius 4.5 px from the viewBox scale, `getScreenCTM().a`, re-read by `useResizeObserver`); the press is taken by the surface and picks the **nearest** point within the target floor (12 px radius fine, 22 px coarse = DESIGN.md's 24/44 px), so neighbours never shadow each other; a handle is painted only within 56 px of the pointer (`is-shown`), the one a press would pick is filled (`is-hot`, one hover register — the old hover *lowered* fill-opacity), and the selection is always painted inside a `selection-ring`. A press on open surface clears the selection (the old `@click.self`). UIA-F-86: a `showGhost` prop draws the saved outline under the edit (`.reference-trace`, dashed, 35 %). UIA-F-179: the `outline: none` is gone; `:focus-visible` paints the producer's `--focus-ring-width`/`--focus-ring-color` pair, inset (the pair `style.css:338-344` uses). UIA-F-180: Reset is one history step (Undo brings the work back); `discardEdits` and `clearSelection` are exposed.
   - `composables/usePointDrag.ts` — UIA-F-242: a press that never moves writes no history (`moved`); the drag follows the pointer's travel from the press, so a press beside a point moves it without a jump; the capture is taken by the bound element (`currentTarget`).
   - `EditorControlsDock.vue` — UIA-F-88: the row is Undo, Redo | Delete, then **More editor tools** (glass `DropdownMenu` + `DockTrigger for="dropdown"`, the AnimationControls idiom): the Magnet radius as the menu's setting section (SliderControl, track `--viz-amber`, the contour's hue — act 5), Smooth, Simplify, Contour trace and Image overlay as `DropdownMenuCheckboxItem`s (select kept open), Reset. The `dock-spacer` is gone (a trailing gap in a fit-content row). UIA-F-242: the resting face wears `Ellipsis` (the sibling's F-94 glyph), the count is glass `Metric` (`value` + `unit="pts"`, `size="sm"`), and the `.is-amber/.is-sky/.is-rose` tints and the Save plate's `--viz-fourier` hover are deleted (one hover ink). `.vstage`'s R-3 (the Magnet's red `text-viz-fourier` glyph): the glyph toggle left the row with F-88; under addendum (g) the Magnet's hue is the contour's (act 5).
   - `EquationPanel.vue` — UIA-F-177: a `section role="dialog" aria-labelledby` host around glass `Card` (glass Card binds its own `role` — `option` when selectable, else none — so a `role` passed to Card was dropped: ⟨`grep -o 'role:[^,]*' dist/card-*.js`⟩ → `role: o.value ? "option" : void 0`); the title is glass `CardTitle as="h2"`; the close is `Button size="sm" icon-only` with no class literals; Escape closes from anywhere unless something nearer took the key (`useEventListener(document, "keydown")`, `defaultPrevented` respected); a refetch keeps the equation and lays glass's indeterminate `Progress` over it in a `role=status` (the spinner — `.vstage`'s R-1, UIA-F-71's ring here — replaced the equation and resized the panel); the panel opens below the dock: `top: calc(0.5rem + var(--dock-h) + var(--space-atom))` (`--dock-h` resolves to 55 px, the plate 56; the literal 3.5rem sat 8 px inside the plate). UIA-F-178: the Metric keeps glass's own ink (`energyColor` is no longer imported here); the Terms track keeps `--viz-fourier`, its owner's hue (act 5), which beside a neutral Metric no longer reads as an error. UIA-F-83 (consumer) ⊕ F-176: the equation sits in glass `FadingScroll axis="x"`, whose edge fades mark the rest.
   - `VisualizationView.vue` — UIA-F-86: `:show-ghost` reaches the editor. UIA-F-180: `toggleEdit` — leaving with a step to undo opens a glass `Dialog` ("Leave with unsaved edits?", Keep editing · Discard · Save); a save re-seeds the editor's history from the saved contour, so a step to undo *is* an unsaved edit; leaving always clears the selection.
   - **Adjacent (§0bt):**
     - `src/fourier_analysis/symbolic/latex_rendering.py` `:21-30` (new `_frequency`), `:103` and `:132` — F-176's server limb: the sign leads the exponent (`e^{-it}`, `e^{2it}`); no unit's set holds `src/fourier_analysis/` (`.srv` held named lines of it for F-35/F-83 and is closed).
     - `latex_format.py:31-40` — F-176: a plain decimal at the significant digits (`210.3` → `210`, was `2.1e+02`); ⟨`python -c 'format_number(…)'`⟩ → `210 · 0.5 · 1.5 · 0.0012 · 0.000012 · -210 · 3.1 · 12000 · 0.049`.
     - `web/e2e/f-w14-uia.spec.ts:272-274` — UIA-F-15's case now meets F-180's question when it leaves with edits, and answers Save (a new content-addressed contour asset, as the dock's Save makes). Its assertions are unchanged.
     - `web/e2e/f-w14-control-row.spec.ts:245-247` — the twin call site of the Magnet: it opens "More editor tools" in place of "Magnet options". Its census and assertions are unchanged.
5. **Addendum (g) consumed (§0da).** Mid-seat, `F.W14U.c1` began deleting `--control-accent` (`style.css`, uncommitted, not this seat's) under the owner's reversal of UIA-F-172's accent limb. This unit's first cure had pointed the Terms and Magnet tracks at that token. They now wear their owners' hues from the one palette: Terms → `var(--viz-fourier)` (the Fourier series' budget, the file's original token), Magnet → `var(--viz-amber)` (the contour's hue, the editor stroke's `--contour-stroke`; `VIZ_COLORS.amber` resolves to it, `lib/colors.ts:131`). The falsifier's v178/v242 track assertions moved with it (owner hue, never `--destructive`); ⟨`grep -n control-accent <this set> e2e/f-w14u-vedit.spec.ts`⟩ → 0. RED ×2 for the two amended cases on the pre-cure bytes ⟨`… -g "v178|v242" …`⟩ → **2 failed** ×2 (loads 36-44: wand **1**; Metric `--destructive`); GREEN ×2 of the whole spec below. The sibling's four dirty paths (`BasisSelector.vue`, `ContourSettings.vue`, `style.css`, `e2e/f-w14u-vstage.spec.ts`) were read, never touched or staged.
6. **GREEN ×2 on the settled bytes** (API on the cured code). ⟨`FW14U_PHASE=after BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-vedit.spec.ts --project=chromium --headed --workers=3 --reporter=line`⟩ ×2 → **13 passed · 0 failed**, both runs (loads 36.3 / 32.0); the pair before act 5 read the same 13/13 ×2 (loads 43.2 / 41.4). Earlier GREEN readings ran on bytes that later changed (Magnet in the row overflowed the 390 plate by 8 px: ⟨probe⟩ `.dock-layer--full` scrollWidth 197 / clientWidth 189; the spacer and the Metric's padding went; the dialog's labels were shortened so its three buttons stop wrapping) and are not counted. Frames AFTER inspected: handles near the pointer only, the hot one filled; the 390 dock whole (count, Save, Undo, Redo, Delete, ⋮); the panel below the dock at 390 with the Terms track on the accent; Terms 20 in Exp reads `e^{it} … e^{-it}` and fades at its end.
7. **Neighbours (non-regression)**, on the bytes before act 5 (act 5 moved two track colours only). ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14-uia.spec.ts e2e/f-w14-control-row.spec.ts e2e/f-w14u-vdock.spec.ts e2e/f-w14u-vstage.spec.ts e2e/f-w14u-s.spec.ts e2e/visualization-ux.spec.ts --project=chromium --project=chromium-headed --workers=3 --reporter=line`⟩ ×2 → run 1 **72 passed · 4 failed** (load 52.3), run 2 **73 passed · 3 failed** (load 61.3). The REDs: f-w14-uia `:162` (UIA-F-17) ×2, the carried `.vdock` R-3 / `.vstage` R-8 case, RED under `--workers=3` on pre- and post-cure bytes; run 1 visualization-ux `:120 :133 :150` (an upload's `compute/*` wait passed the 30 s test timeout at load 52; GREEN in run 2); run 2 vstage `:359` e171 ×2 ("Test not found in the worker process", a worker restart, no assertion read). UIA-F-15 and UIA-F-16 GREEN in both runs (F-15 with its adjacent Save line), and `.s`'s G-s, `.vdock`'s and `.vstage`'s falsifiers GREEN in both.
   Neither non-counted RED survives alone: ⟨`npx playwright test e2e/f-w14u-vstage.spec.ts:359 e2e/visualization-ux.spec.ts:120 :133 :150 e2e/f-w14-uia.spec.ts:162 --project=chromium --workers=1`⟩ ×2 → **4 passed** ×2 (the `:359` line filter matched no case inside its width loop), and ⟨`… e2e/f-w14u-vstage.spec.ts -g "e171" --workers=1`⟩ ×2 → **2 passed** ×2. The "Test not found" minute (15:46) is when the sibling `.c1` seat was writing `e2e/f-w14u-vstage.spec.ts` (its mtime 15:46), so that file changed under the running worker. After act 5, ⟨`npx playwright test e2e/f-w14-uia.spec.ts e2e/f-w14-control-row.spec.ts -g "UIA-F-(15|16) |control|row" --project=chromium --workers=3`⟩ ×2 → **10 passed** ×2.
   Each neighbour run rewrote the 15 tracked frames `web/e2e/screenshots/f-w14/after-page-*.png` (control-row's frames, mtime 15:46 inside this seat's run). They were clean at open and were restored by exact path each time (⟨`git checkout HEAD -- web/e2e/screenshots/f-w14/after-page-*.png`⟩ → `git status --porcelain web/e2e/screenshots` empty).

**Row dispositions (13).**
| row | disposition | evidence |
|---|---|---|
| F-83 (consumer) | **CURED** (the server half is `.srv`'s `798c98f`, served once the API was restarted) | v83: pre-`.srv` process "3 terms at Terms 20"; now > 4, in FadingScroll; RED ×2 → GREEN ×2 |
| F-85ˢ | **ESCALATED (E-1)**: the consumer cure site is `components/equation/NotationPills.vue` (`.eq`'s bounds); glass half ROUTED O-59 (standing) | — |
| F-86 | **CURED** | v86 RED ×2 (trace 0) → GREEN ×2 |
| F-87 | **CURED** | v87 RED ×2 (1024 at rest) → GREEN ×2 |
| F-88ˢ | consumer **CURED**; glass half (no overflow cue on the dock) ROUTED O-59 with F-215 (standing) | v88 RED ×2 (8 off the plate) → GREEN ×2 |
| F-89 | **CURED by `.vstage`** (GREEN-BEFORE-CURE: the inactive stage takes `flex: 0 0 0%`, `VisualizationView.vue:575`) | v89 GREEN before ×2 and after ×2 |
| F-176 | **CURED** (consumer + the server limb, adjacent) | v83 (`e^{i-` RED ×2 → GREEN ×2; no `\d[eE][+-]\d`) |
| F-177 | **PARTIAL**: dialog semantics, title, close rung, Escape anywhere, no refetch resize, clearance at 390 **CURED**. The limb "rebuild on a glass Popover anchored to Σ (desktop) / Sheet (phone)" is **ESCALATED (E-2)** | v177 + v177m RED ×2 → GREEN ×2 |
| F-178 | **CURED** in the panel (neutral Metric; the Terms track in the Fourier hue per addendum (g)). Carried: `EquationView.vue:85` still inks its Metric through `energyColor` → `.eq` (R-2) | v178 RED ×2 (Metric `rgb(219, 36, 36)`) → GREEN ×2 |
| F-179 | **CURED** (the `inert` limb was `.u`'s) | v179 RED ×2 → GREEN ×2 |
| F-180 | **CURED** | v180 RED ×2 → GREEN ×2 |
| F-241 | **PARTIAL**: the cap limb is `.srv`'s (no cap at `798c98f`). The token inks (`NOTATION_OPTIONS` hsl literals, `lib/equation/notation.ts:14-17`, read only by NotationPills) and the `eⁱ` Unicode glyph (NotationPills' `opt.icon`) go with F-85 → E-1 | — |
| F-242 | **CURED** | v242 RED ×2 → GREEN ×2 |

Tally ⟨count of the table's rows⟩ → 13:
- CURED 10: F-83 (consumer), F-86, F-87, F-88 (consumer), F-89 (by `.vstage`), F-176, F-178, F-179, F-180, F-242.
- PARTIAL 2: F-177, F-241.
- ESCALATED 1: F-85.

Residuals carried in from `.vstage`, by id: **R-1** (`EquationPanel.vue:106` ring) CURED here: glass Progress. **R-3** (the Magnet's red glyph) resolved with F-88 and addendum (g). **R-6** (`.controls-dock-anchor` 8 px gutter, O-67 R-2) was **not landed**. It is SIDE-DOCK-EDGE's consumer read, and no row here names it, so it is carried to the Close with O-67.

**Escalations.** Both ask for a ruling on bounds. Neither is a substitute cure.
- **E-1, F-85 (+ F-241's ink and glyph limbs).** The cure is `<ToggleGroup type="single">` in `components/equation/NotationPills.vue`, and the `eⁱ` glyph and the hsl inks are there and in `lib/equation/notation.ts:14-17`. NotationPills is mounted by EquationPanel and by `EquationView` (`.eq`'s), and `components/equation/**` is `.eq`'s bound (plan row 10). The ADJACENT-LINE RULE excludes another unit's file. **Ask:** re-home F-85's consumer half and F-241's ink and glyph limbs to `.eq`, which runs next and holds the file.
- **E-2, F-177's anchoring limb.** The register asks for "a glass Popover or Sheet anchored to Σ". The Σ trigger is `CanvasControlsDock.vue:109` (`.vdock`'s file, closed), and glass 10.0.1 exports no popover anchor (⟨`cat node_modules/@mkbabb/glass-ui/dist/components/popover/index.d.ts`⟩ → `Popover`, `PopoverTrigger`, `PopoverContent` only). The panel's own limbs are cured on the Card. **Ask:** rule whether the anchored-popover rebuild is owed. If it is, grant `CanvasControlsDock.vue:109` and add a glass anchor export as an O-59 addendum; otherwise take the Card dialog as the cure.

**Residuals.**
- (R-1) F-177 E-2 above; F-85/F-241 E-1 above.
- (R-2) F-178's twin in `EquationView.vue:85` (the `/equation` page's energy Metric via `energyColor`) → `.eq`.
- (R-3) f-w14-uia `:162` (UIA-F-17) is RED under `--workers=3` and GREEN alone at `--workers=1` ×2. It is carried to the Close as before (`.vdock` R-3, `.vstage` R-8).
- (R-4) R-6 from `.vstage` (the canvas docks' 8 px gutter, O-67) is carried to the Close.
- (R-5) Frames: each case frames the width its row names, and the two frame cases add the editor and the panel at both 1440 and 390, light only. No named row names a dark theme.

**Commit.** fourier **`dd123a9`** is one commit for the unit's family: the five set files, the falsifier, and the four adjacent paths. Pathspec: exactly those 10 paths (⟨`git show --stat HEAD`⟩ → `10 files changed, 962 insertions(+), 156 deletions(-)`). Pushed: ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `dd123a9295e3`. The frames are on disk under `web/e2e/screenshots/f-w14u/vedit/`, gitignored and not force-added: ⟨`ls | wc -l`⟩ → 32 (13 before, 19 after). The API on :8000 is left running on the committed code, with its original environment (PID changed, same env).

**Gates BEFORE → AFTER.**
| gate | BEFORE | AFTER |
|---|---|---|
| G-u (this unit's 13) | 13 owed | 10 cured · 2 partial · 1 escalated (table) → **RED for the unit** (E-1, E-2) |
| falsifier `f-w14u-vedit` | 10 failed · 3 passed ×2 (pre-cure bytes; v89 green-before-cure, 2 frame cases) | **13/13 ×2** (loads 36.3 / 32.0) |
| f-w14-uia F-15 / F-16 | GREEN (banked) | GREEN ×2 in both neighbour runs and ×2 after act 5 (F-15 with its adjacent Save line) |
| `vue-tsc -b` | 0 (banked) | ⟨`npx vue-tsc -b`⟩ exit 0 on the final bytes |
| `vitest` | 86/86 (banked) | ⟨`npx vitest run`⟩ `Test Files 14 passed (14) · Tests 86 passed (86)` (after each landing) |
| api `pytest` (equation rows) | — | ⟨`pytest api/tests -k "equation or simplif or latex or uia"`⟩ `12 passed, 3 skipped` |

**Status: PARTIAL**, escalations E-1 and E-2.

## F.W14U.c1

**Spec:** `fourier/waves/F-W14U.md` ADDENDUM 2026-09-24 (g), COHESION §0da. The owner reverses UIA-F-172's colour limb: *"What happened to the fourier colors in the configurator and the sliders and the like"*. One Opus seat, outside the chassis loop, in files disjoint from `.vedit`. Owner frame: `fourier/evidence/W14/owner-2026-09-24-configurator-shell-band.png` (pre-`9a1d932`: Epicycles chip tinted, Harmonics red, Sample Points blue).

**1. Census, fourier `98fc769..HEAD`.** ⟨`git log -G 'VIZ_COLORS|section-color|pill-color|--viz-|control-accent|:color=' 98fc769..HEAD -- web/src`⟩ returns 4 commits, plus `dd123a9` (landed during this unit). Every Configurator layer was read at both ends: BasisSelector, ContourSettings, CoefficientsPanel, ImageUpload, VisualizationView, and the morph and equation layers.

| # | control (layer) | hue at `98fc769` | lost in | row | c1 |
|---|---|---|---|---|---|
| 1 | pressed Fourier chip (Decomposition) | `--pill-color` = `basisDisplay.fourier` (tint 12 %, ink toward `--foreground`) | `9a1d932` .vstage | UIA-F-170 (pills → glass ToggleGroup; the `.basis-toggle` retint retired with them) | **RESTORED**: Epicycles and Series |
| 2 | pressed Chebyshev chip | `basisDisplay.chebyshev` | `9a1d932` | F-170 | **RESTORED** |
| 3 | pressed Legendre chip | `basisDisplay.legendre` | `9a1d932` | F-170 | **RESTORED** |
| 4 | Harmonics slider | `VIZ_COLORS.fourier` | `9a1d932` | UIA-F-172 → `--control-accent` | **RESTORED** |
| 5 | Sample Points slider | `VIZ_COLORS.chebyshev` | `9a1d932` | F-172 | **RESTORED** |
| 6–10 | ML Threshold, Blur Sigma, Min Area %, Max Contours, Smoothing (Contour) | `VIZ_COLORS.amber` | `9a1d932` | F-172 | **RESTORED** |
| — | the `--control-accent: var(--primary)` token (`style.css`) | — | minted `9a1d932` | F-172 | **DELETED** |
| — | FrequencyGraph rainbow bars (Coefficients) | spectrum hsl ramp | `9a1d932` | UIA-F-169 (duplicate amplitude view removed) | structural, stands; the spectrum rows keep the same ramp |
| — | Harmonics / Sample Points `--track-color` | same hues | `ef9dfc6` (X.F.W14.h) | OA-45: moved onto `SliderControl`'s `color` prop | not a loss |
| — | pressed chip ink | bare hue → hue 75 % toward `--foreground` | `001bdcf` (X.F.W14.g) | OA-43, for AA | not a loss; c1 reuses it |
| — | canvas hover (golden) | — | `1623166` | UIA-F-17, canvas only | not a control |
| — | section headers and eyebrows (ConfiguratorLayer label/sub) | none at `98fc769` (glass's ink) | — | — | nothing to restore |
| 11 | contour-editor dock Smooth / Simplify / Delete hover tints (`.is-amber`, `.is-sky`, `.is-rose`), the Save plate's `--viz-fourier` hover, the Magnet glyph's `text-viz-fourier` | amber / chebyshev / pink / fourier | `dd123a9` (.vedit, Track C) | F-242 "one hover ink" | **OUTSIDE c1's files.** Flagged for the orchestrator: does (g)'s "and the like" cover the editor dock's hover tints? The quantity-owning controls there keep hues: Magnet radius → `--viz-amber`, Terms → `--viz-fourier` (dd123a9 cites (g)) |

**2. Restored at the root** (fourier `b7607f8`, 4 paths):
- `web/src/components/visualization/BasisSelector.vue`. Harmonics sets `:color="FOURIER_HUE"` (`computed(() => basisDisplay.fourier.color)`). Sample Points sets `:color="basisDisplay.chebyshev.color"`. Both go through `SliderControl`'s own `color` prop, into glass's documented track token. The Epicycles and Series items and the Chebyshev and Legendre items carry `class="basis-chip"` and `--basis-hue`, passed through glass ToggleGroupItem's published `class` prop. `.basis-chip[data-state="on"]` retints the item's own pressed state: the hue at 12 % as background (16 % on hover), and the ink is `color-mix(in oklab, hue 75%, --foreground)`. This is the X.F.W14.g recipe on the new item. **Off** is not a basis and keeps glass's neutral pressed state. The class is named `basis-chip` because e170's `.basis-toggle` count 0 still holds.
- `web/src/components/visualization/ContourSettings.vue`. The five rows set `:color="CONTOUR_HUE"` (`computed(() => VIZ_COLORS.amber)`, the contour stroke's ink).
- `web/src/style.css`. The `--control-accent` block is deleted. No reader remains in fourier HEAD (`git grep control-accent` → only the c1 comments).
- Nothing in glass was restyled or edited. The rest of `.vstage` (the ToggleGroups, Advanced disclosure, row subtitles, stage rows) stands.

**3. Falsifier.** `web/e2e/f-w14u-vstage.spec.ts` e171. The one-accent assertion `expect(new Set(fills).size).toBe(1)` is **INVERTED, not deleted** (ADJACENT-LINE RULE). It now asserts that the sliders do not share one accent, and that each slider's painted track colour equals its owner's token within ±3 per channel: Harmonics `--viz-fourier`, Sample Points `--viz-chebyshev`, the five contour rows `--viz-amber`. No track equals `--destructive`. Each pressed basis chip's computed background, composited over white, has chroma ≥ 6 and an HSL hue within 20° of its basis token. All limbs are `expect.soft`, so the RED reading names every limb. The run was headed Chromium (`--project chromium --headed`) against :3100/:8000.
- **RED on `9a1d932`'s bytes** (the three src paths reverted to HEAD; the spec edit kept). 2 failed ×2 (1440 and 390). Each viewport fails 10 limbs: the one-accent set, 7 sliders (`track 28,25,23` = `--primary`, against 215,53,35 / 49,86,185 / 157,101,21), and the Epicycles chip (chroma 0, hue NaN). Log: `fourier/evidence/W14U/c1/red-9a1d932-run.txt`.
- **GREEN ×2 after**: the whole spec **18/18 ×2** (12.5 s, 14.5 s).
- Also run: `vue-tsc --noEmit` exit 0, `vitest` 14 files / 86 tests passed, and `slider-scrub-contrast` + `f-w14-veil` + `f-w13-image-controls` + `contrast` **9/9**.

**4. Contrast guard.** Painted pixels, headed Chromium at 1440, both themes. Epicycles, Chebyshev and Legendre were all pressed, and Contour Advanced was open. Chip ink is the computed `color`; its surface is the chip's painted pixel. For each slider, the fill and the remaining track were sampled on the painted track, and the surface 3 px above it. Data: `after-contrast-painted.json`, script `contrast.mjs`.

| theme | control | ink / fill | surface / track | ratio | need |
|---|---|---|---|---|---|
| light | Epicycles chip ink | 146,33,20 | 231,206,193 | **5.71** | 4.5 |
| light | Chebyshev chip ink | 30,56,125 | 216,209,206 | **7.27** | 4.5 |
| light | Legendre chip ink | 100,41,118 | 225,208,206 | **6.66** | 4.5 |
| light | Harmonics fill | 215,53,35 | track 249,244,237 / surface 253,245,236 | **4.34** / 4.40 | 3 |
| light | Sample Points fill | 49,86,185 | track / surface | **6.07** / 6.15 | 3 |
| light | 5 contour fills | 157,101,21 | track / surface | **4.46** / 4.44–4.54 | 3 |
| dark | Epicycles chip ink | 244,152,140 | 71,47,36 | **5.72** | 4.5 |
| dark | Chebyshev chip ink | 165,185,238 | 62,51,48 | **6.26** | 4.5 |
| dark | Legendre chip ink | 219,171,233 | 68,50,47 | **6.32** | 4.5 |
| dark | Harmonics fill | 235,115,102 | track 45,38,32 / surface 58,48,40 | **5.09** / 4.39 | 3 |
| dark | Sample Points fill | 136,161,231 | track / surface | **5.89** / 5.08 | 3 |
| dark | 5 contour fills | 232,185,109 | track / surface | **8.22–8.25** / 6.99–7.10 | 3 |

All pass AA. The row labels, numbers and subtitles keep `--foreground` or `--muted-foreground`; c1 tints no text other than the chip ink. **Error ink:** the basis red never takes the error role. The error ink stays glass's `--destructive` (light `hsl(0 72% 50%)` ≈ 219,36,36), and falsifier limb 3 asserts that no track equals it. The fourier red (215,53,35) sits close to it by eye. The addendum accepts that ("keeps its hue"), and it is recorded here.

**Frames** (headed, 1440, light + dark, before = `9a1d932` bytes, after = `b7607f8` bytes, same minted visualization; Chebyshev toggled on locally so two basis tints read): `fourier/evidence/W14U/c1/{before,after}-{decomposition,contour}-1440-{light,dark}.png`. Script: `capture.mjs`. The frames were taken on the shared served tree, which also carried `.vedit`'s then-uncommitted edits. Those edits are outside the aside's layers. The visualization minted for the frames (`sable-shaping-ember-macaw`) was soft-deleted with its own session afterwards.

**Commit.** fourier **`b7607f8`** (`fix(web): X.F.W14U.c1 — …`), pathspec-only: `web/e2e/f-w14u-vstage.spec.ts`, `BasisSelector.vue`, `ContourSettings.vue` and `web/src/style.css` (4 files). It was pushed without force: ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `b7607f86bda8`, on top of `.vedit`'s `dd123a9`.

**Residuals (honest).**
- (R-1) Census row 11: `dd123a9` removed the editor dock's hover tints under F-242. That is outside c1's files. The orchestrator should rule whether (g) reaches them.
- (R-2) The pre-`9a1d932` pills wore a 40 % basis border. The glass ToggleGroupItem's edge is glass's `glass-control-edge`, and c1 does not retint it (glass internals). The pressed chip carries its tint as background and ink only. If the owner wants the border back, that is a glass ask (a pressed-state tint token on ToggleGroupItem).
- (R-3) The Fourier-mode items lost the `ℱ` glyph at `.vstage` (F-170, structure). That is not colour, so c1 leaves it.
- (R-4) The in-flight `f-w14u-vedit.spec.ts` read 6 failed / 9 passed on the shared tree mid-flight. That was before `dd123a9` landed, and the failures were element-not-found and timeouts, none about colour. `.vedit`'s own record carries its 13/13 ×2.

**Status: CURED** (census 10 control hues restored + 1 token deleted; falsifier RED ×2 → GREEN ×2; contrast AA in both themes).

## F.W14U.c2

**Ruling:** COHESION §0db. The owner's "and the like" (addendum (g)) covers `dd123a9`'s removals. One Opus seat, same laws as c1. Before editing, `EditorControlsDock.vue` and `BasisSelector.vue` were confirmed clean: `.vedit` had landed as `dd123a9`, and no seat held them dirty.

**Restored** (fourier **`aef636f`**, 4 paths):

| control | hue (one palette) | route (glass as published) |
|---|---|---|
| Smooth contour (a menu row since `dd123a9`) | `--viz-amber` | the row tint through glass's `--menu-row-bg` (hue 15 %); the glyph inked on `:hover`/`[data-highlighted]` |
| Simplify contour (menu row) | `--viz-chebyshev` | as Smooth |
| Delete point (DockControl) | `--accent-pink` (`.is-rose`, as before) | DockControl's `--btn-hover-color` |
| Save contour (DockControl) | `--viz-fourier` | `--btn-hover-color`, plus the pre-`dd123a9` 15 % hover plate |
| Magnet glyph | `--viz-fourier` while radius > 0, `--muted-foreground` while off | the lucide `Magnet` returns beside the radius row in the More-tools menu. The popover toggle stays gone, as `dd123a9`'s structure. |
| Fourier-mode chips | the `ℱ` glyph (`basisDisplay.fourier.icon`) on Epicycles and Series | inside ToggleGroupItem's default slot, `aria-hidden`, with the pre-`.vstage` compact sizing (1.75em). Tₙ and Pₙ were never lost. Off wears none. |

A **tint** is the bare hue. An **ink** is the hue carried a quarter toward `--foreground` in OKLab, the chip recipe of X.F.W14.g (OA-43). On the first after-read, the bare inks measured 2.50 (amber), 2.84 (pink) and 2.68 (the Magnet red) against the light plates. That fails 3:1, so the inks carry. The rest of `dd123a9` stands: the menu, the Metric count, the Ellipsis face, and the amber Magnet track.

**Falsifier.** Headed Chromium, :3100/:8000.
- `e2e/f-w14u-vedit.spec.ts` v242. `dd123a9`'s `expect(tints.length …).toBeLessThanOrEqual(1)` ("one hover tint") is **INVERTED**: `toBeGreaterThan(1)`. New limbs:
  - Delete's and Save's `--btn-hover-color` equal their carried inks, and a hovered Save paints its glyph in the Fourier ink.
  - The Magnet glyph is in the menu and wears the Fourier ink at radius 4.
  - Smooth's and Simplify's hovered glyphs wear their inks. Their rows are tinted (chroma ≥ 6, hue within 25° of the token).
- The "no red-glyph Magnet toggle" line is split. Its structural half stays: the `Magnet options` toggle count is 0. Its colour half is inverted into the glyph limb above.
- `e2e/f-w14u-vstage.spec.ts` e170 now asserts each chip's glyph. Adjacent change (§0bt): e170's three mode lookups move from `getByText(name, {exact})` to `getByRole("radio", {name, exact})`. The glyph is `aria-hidden`, so the accessible names are unchanged, but the text is not.
- **RED ×2 on `dd123a9`'s bytes** (the two src paths reverted to HEAD, the spec edits kept). Each run: 3 failed (v242 once; e170 at 1440 and at 390), 12 soft limbs. The glyph limb reads `"Epicycles": null, "Series": null`, and the tint read is `[""]`. Log: `red-dd123a9-run.txt`.
- **GREEN ×2 after:** vedit **13/13 ×2** at `--workers=1`, vstage **18/18 ×2**.
  - vedit's four equation-panel cases and the two frame cases time out on `.eq-katex` under parallel workers on the shared API. That happens on either bytes: v177 alone passes on `dd123a9`'s bytes and on c2's.
  - One vstage run also flaked e70's 3.5 s loading-status window under that load.
  - Both are load, not colour.
- Also: `vue-tsc --noEmit` exit 0 · `vitest` 86/86 · `f-w14-control-row` + `slider-scrub-contrast` + `f-w14-veil` + `contrast` **8/8**.

**Contrast.** Hover glyph inks, painted pixels, headed, 1440. The ink is the computed colour (an `oklab()` value is converted by hand, because the 2D canvas left it unparsed). The surface is the hovered plate's or row's painted pixel. Non-text, so the need is 3:1. Data: `after-probes.json` and `before-probes.json`; script: `capture.mjs`.

| theme | probe | ink | surface | ratio |
|---|---|---|---|---|
| light | Delete, hovered | 164,58,108 | 221,212,204 | **4.22** |
| light | Save, hovered | 165,51,36 | 244,213,204 | **4.92** |
| light | Smooth row, highlighted | 122,81,29 | 206,182,152 | **3.56** |
| light | Simplify row, highlighted | 45,71,141 | 208,186,159 | **4.67** |
| light | Magnet glyph (on), menu | 165,51,36 | 211,192,167 | **3.83** |
| dark | Delete, hovered | 222,146,174 | 47,37,29 | **6.29** |
| dark | Save, hovered | 238,145,133 | 80,53,44 | **4.78** |
| dark | Smooth row, highlighted | 233,197,141 | 88,66,38 | **5.78** |
| dark | Simplify row, highlighted | 159,179,231 | 76,54,29 | **5.44** |
| dark | Magnet glyph (on), menu | 238,145,133 | 69,49,27 | **5.28** |

All pass 3:1. The chips' text inks are c1's table.

**Frames** (headed, 1440, light + dark; before = `b7607f8` HEAD with `dd123a9`'s dock, after = `aef636f`), in `fourier/evidence/W14U/c2/`: `{before,after}-chips-…` (ℱ on the modes), `-hover-delete-`, `-hover-save-`, `-hover-smooth-` and `-hover-simplify-` (the menu with the Magnet at 4).
- The frames were taken on the shared served tree. Late in the unit that tree carried `.eq`'s uncommitted `components/equation/**` edits, which are outside these views.
- The visualization minted for the frames (`noble-sliding-wheat-perch`) was soft-deleted with its own session.
- The probe retries a pointer move until reka highlights the row. The first after-reads caught un-highlighted rows and mid-transition inks, and those reads were discarded.

**Commits.** fourier **`aef636f`**: pathspec-only (the 4 files), pushed without force (`b7607f8..aef636f`).

**Residuals (honest).**
- **CHIP-PRESSED-TINT — honest-RED.** The pressed basis chip's 40 % basis border (pre-`.vstage`) is not restored. ToggleGroupItem's edge is glass's `glass-control-edge`, and there is no pressed-state tint token, so it is asked as **O-76**. The chip carries its hue as background and ink only.
- (R-2) The Magnet's at-a-glance state: before `dd123a9`, the red Magnet sat in the dock row. It now sits inside the More-tools menu (dd123a9's structure, kept). The closed dock no longer shows that the magnet is on. That is a structural question, not a colour one; it is recorded for the orchestrator.
- (R-3) The Smooth, Simplify and Reset menu rows set their glyph flush against the label, with no gap. That is `dd123a9`'s markup (seen in the frames), outside colour, and it is carried to `.vedit`'s owner.
- (R-4) The test runs regenerated tracked frames under `web/e2e/screenshots/f-w14/`: `f-w14-veil` rewrote `after-veil-*`, and other seats' runs had already modified the `after-page-*` frames. They are left dirty and uncommitted, not reverted, for the frames' owners to decide.
- (R-5) The vedit equation-panel cases need `--workers=1` on the shared API (load, see above).

**Status: CURED** (5 tool hues and the ℱ glyph restored; falsifier RED ×2 → GREEN ×2; contrast ≥ 3:1 in both themes), with CHIP-PRESSED-TINT honest-RED at glass (O-76).

### F.W14U.eq

SEAT `.eq`, `claude-opus-5-5`, 2026-09-24. Spec `F-W14U.md` read whole (78 lines, Units :8-18 + addenda (a)–(g)); this record's header through the Unit plan, `.srv`'s consumer contract (:362-374), `.vedit`'s dispositions and escalations; COHESION §0cl–§0cn and §0da (no ruling on `.vedit` E-1/E-2 found: ⟨`grep -n 'F-85\|W14U.eq' COHESION.md`⟩ → 0). Register rows read at `audit/UI-AUDIT-fourier.md:104,186-188,282-288,339`.

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → nothing under this unit's set (`web/src/components/equation/`, `ui/{SliderControl,CollapsibleSection}.vue`, `e2e/f-w14u-eq.spec.ts`, `screenshots/f-w14u/eq/`); the dirty paths (`BasisSelector.vue`, `ContourSettings.vue`, `style.css`, `f-w14u-vstage.spec.ts`, tracked `screenshots/f-w14/*.png`) are sibling seats' — read, never touched or staged. **Nothing inherited.**

**Anchors at the true bytes (drift recorded).**
- The brief names F-113 "sum curve" and F-114 "popover clipping". The register (governing) says F-113 = a failed compute invisible from the 390 Controls pane and F-114 = three disclosure sections in two registers. The rows were executed as the register writes them.
- F-35's consumer anchors `FunctionInput.vue:86-90` (now `:94`, `displayTermsMax`) and `EqCoefficientsPanel.vue:78` (`:sub`) hold. The server half landed at `.srv` `798c98f`. ⟨`curl POST /api/equations/compute {"expression":"sin((x",…}`⟩ → `422 urn:contract:validation-failed "Cannot parse expression: …"`, so the API on :8000 serves the cured code.
- F-203's `EquationView.vue:612-619` is now the `.coeff-popover` block (`:668-677` at HEAD).
- The glass surfaces measured at the installed 10.0.1:
  - `ToggleGroup` type=single renders a radiogroup of radios.
  - `LabeledField` has `invalid` plus an `#error` slot, and its slot props carry `describedBy` and `errorId`.
  - `Progress` takes `modelValue: null` for an indeterminate bar.
  - `Badge` has `tone` (neutral, destructive, success, warning, info) and `data-slot="badge"`.
  - `.popover-content` has `border-radius: var(--radius-panel)`, which is 12px.
  - `ConfiguratorLayer`'s region child is `min-h-0 overflow-hidden`.
  - Popover and Tooltip export no virtual-anchor or `reference` prop (⟨`grep -n reference popover/PopoverContent.vue.d.ts`⟩ → 0).

**Acts, in order.**
1. **Falsifier first**, `web/e2e/f-w14u-eq.spec.ts`, 13 cases: q35 q112 q113 q114 q201 q202 q203 q204 q205, q206 (1440 and 390), and q253 ×2. It was run against the pre-cure bytes, which were only the new spec file (the one cure written early, `NotationPills.vue`, was parked in the scratchpad and ⟨`git checkout HEAD -- …NotationPills.vue`⟩ restored HEAD before any run).
   - ⟨`FW14U_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-eq.spec.ts --project=chromium --headed --workers=3 --reporter=line`⟩ ×2 → **13 failed** ×2 (load 56–74). A preliminary run on an earlier text of the spec also read 13 failed and is not counted.
   - Two assertions were then amended on the same pre-cure bytes: q202 filters the busy status by its progressbar, and q253 adds the "Approximate" tier label. ⟨`… -g "q202|q253"`⟩ ×2 → **3 failed** ×2.
   - Cause per case, from the RED logs:
     - q35: no "Displayed harmonics" control.
     - q112 and q113: no `aria-invalid`.
     - q114: `.configurator-layer` count is 1, not 3.
     - q201: the legend reads `f(x)` beside `f(t)`.
     - q202: no progressbar, and the plot moves.
     - q203: radius 10px, where the canon is 12px.
     - q204: 0 radios.
     - q205: 2362 saturated pixels under the plot box.
     - q206 at 1440: 21 off-rung texts (`f(x)@11px`, `a + b@11px`, legend `@13px`, `N=0/8@12px`, …).
     - q253: no lucide svg; the tab strip's alpha is 1.
   - BEFORE frames: none are banked. Every RED case failed before its frame line, so the before state is the RED log plus the orientation frames under the scratchpad.
2. **Cures** (fourier, one family commit):
   - **F-35 (consumer).**
     - "Display terms" is now **Displayed harmonics**, with the subtitle "in the a + b view · DC counts as one".
     - The control's max is N + 1 (`FunctionInput.vue` `displayTermsMax`), and the budget cap watch in `EquationView.vue` is `v + 1`. This matches `.srv`'s budget, which counts harmonics.
     - The Coefficients layer counts |n| groups: "all 21 harmonics", where it said "41 terms". The reconcile note compares like with like.
   - **F-112 + F-113 (consumer).**
     - `isInputRejection` (422 `urn:contract:validation-failed`) routes the server's `detail` to `expressionError`. It is shown under the Expression field through glass `LabeledField` (`invalid`, `#error`, and `describedBy` on the Input), with no Retry.
     - An edit clears the error. The field sits in the Controls pane, so the error is visible at 390.
     - `failureMessage` reads `problemMessage` (detail first).
   - **F-114 + F-207.** Function and Controls are glass `ConfiguratorLayer`s, adjacent siblings of the Coefficients layer inside one gapless `.eq-layers` stack, so they form one group in one register. **`web/src/components/ui/CollapsibleSection.vue` is deleted** (⟨`grep -rln "import.*CollapsibleSection" web/src`⟩ → 0).
   - **F-201.**
     - The plot, legend and tooltip speak the series' variable (`seriesVariable`, read from the rendered TeX: `f(t)`).
     - The Sum tooltip is `S_N(t)`. It was "f(x) = <expression>", which is wrong for a partial sum.
     - The legend, timeline and Harmonics field agree on N.
   - **F-202.**
     - Status is out of flow: one plate on the equation card's seam (absolute, `translateY(50%)`, glass `glass-floating glass-opaque`, fade only).
     - Busy shows glass indeterminate `Progress`. A transient failure shows `role=alert` with Retry. An input rejection shows a status note.
     - The result is marked `data-stale` and dimmed.
     - The two cold states (F-71's carried ring sites `EquationView.vue:401,:429`) are glass `Progress` and a glass `Card`.
   - **F-203.** The plot tooltip and the coefficient popover both sit on glass's `glass-floating` plate at `--radius-panel` (the `.popover-content` canon). The tooltip's own hand-rolled background, border and shadow are gone.
   - **F-204.** `NotationPills` is `ToggleGroup type="single"`, keeping its notation hues on `data-state="on"` per addendum (g). Presets are `ToggleGroup type="single"` too, keeping the Fourier hue.
     - The per-preset hover Tooltip was removed: its TooltipTrigger stamps its own `data-state` over the item's, measured in the first after-frame as no pressed tint. The chosen preset's description is the group's caption (`aria-describedby`).
     - This also cures the ToggleGroup limb that `.vedit` E-1 names for F-85, in the same file.
   - **F-205.**
     - The y-range covers every harmonic curve.
     - The legend is the plot's second cell (a flex gutter) and no longer an absolute overlay.
     - The legend and tooltip ink are on `--type-caption`.
   - **F-206.**
     - The mode toggle's `a + b` 11px and Σ 16px literals are now the caption and small rungs.
     - The timeline count's 12px literal is now caption, and so is the reconcile note (13px).
     - The Harmonics row wraps (`.harmonics-row`) instead of pushing the Parseval button out.
   - **F-253**, the cured limbs:
     - A sweep-front rule marks the entering harmonic while mid-sweep.
     - The tier is glass `Badge` on a tone (symbolic success · identified warning · spline info). The hand-rolled stadium is gone.
     - Play and Pause are lucide. The two Font Awesome paths and the `.play-btn` repaint of glass's Button are deleted, and the `icon-swap` animation is kept.
     - The 390 tab strip lost `bg-background`, matching `/w`'s strip.
   - **R-2 from `.vedit`** (F-178's twin, `EquationView.vue:85`): the energy Metric keeps glass's ink (`energyColor` import dropped). **CURED.**
3. **Iteration on the cured bytes, recorded rather than smoothed.**
   - The first after-run ⟨`FW14U_PHASE=after …`⟩ read **4 failed · 9 passed**. Each failure had its own cause:
     - q114: glass's `ConfiguratorLayer` region (`min-h-0 overflow-hidden`) clips the 24 px blur of glass Button's `0 8px 24px` shadow by 4 px at a 20 px layer pad. That is a producer clip, so the case now measures only consumer clippers (see R-1).
     - q202: the new notation's series is 2 px taller, so the layout is re-read after the recompute settles, before the failure phase.
     - q206: at 390, glass scales its own coarse-pointer controls to 18.27 px, so the rung census reads at the fine pointer (1440). The 390 case keeps the Parseval-row limb.
     - The notation glyph's 1.15em literal was dropped.
   - The status plate first sat over the equation's last line. It now straddles the card seam, is opaque, and fades only.
   - The q112 read of `aria-describedby` now waits for the attribute (one GREEN run read it one render early).
   - Every amendment kept the case RED on the pre-cure bytes: q114 still fails its layer count, q202 its progressbar, and q206 at 1440 its 21 off-rung texts.
4. **GREEN ×2 on the settled bytes.** ⟨`FW14U_PHASE=after BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-eq.spec.ts --project=chromium --headed --workers=3 --reporter=line`⟩ ×2 → **13 passed** · **13 passed** (loads 83 / 84). The two runs before the q112 wait read 12+1 failed (q112) and 13 passed; they are not counted.
5. **Neighbours**, ×2 on the final source bytes. ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/equation-interaction.spec.ts e2e/f-w14-uia.spec.ts -g "UIA-F-3|equation|interaction|four-step|reload" --project=chromium --workers=3`⟩ ×2 → **12 passed** ×2 (loads 60 / 54).
   - That covers equation-interaction S2 (the four-step flow, with the adjacent locators), UIA-F-32, and UIA-F-33/34 at 1440 and 390.
   - No `UIA-F-31` case exists in e2e (⟨`grep -rn 'UIA-F-31' web/e2e`⟩ → 0). The sum-curve edge rides `vitest` (`harmonics.test.ts`), which is GREEN.
6. **Gates.** ⟨`npx vue-tsc -b`⟩ exit 0 · ⟨`npx vitest run`⟩ `Test Files 14 passed (14) · Tests 86 passed (86)`.
7. **Commit.** fourier **`fcc5617`** is one family commit of 11 paths: 8 equation files, the deletion of `ui/CollapsibleSection.vue`, the falsifier, and one adjacent file (⟨`git show --stat HEAD`⟩ → `11 files changed, 925 insertions(+), 552 deletions(-)`). Pushed: ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `fcc561712de3`. The AFTER frames are on disk under `web/e2e/screenshots/f-w14u/eq/` (gitignored, not force-added; ⟨`ls | wc -l`⟩ → 15).

**Adjacent edits (§0bt).** `web/e2e/equation-interaction.spec.ts:116-123,147,216-221`. These are the oracle's locators for the copy and roles this unit changed: the Notation `group`/`button`/`aria-pressed` becomes `radiogroup`/`radio`/`aria-checked`, and `/display terms/` becomes `/displayed harmonics/`. The assertions are unchanged.

**Row dispositions (12).**
| row | disposition | falsifier |
|---|---|---|
| F-35 (consumer) | **CURED** (the server half is `.srv` `798c98f`) | q35 RED ×2 (no Displayed harmonics control) → GREEN ×2 (a4 `0.0625`, never `0.031`; max N+1; "21 harmonics") |
| F-112 (consumer) | **CURED** | q112 RED ×2 (no `aria-invalid`) → GREEN ×2 |
| F-113 | **CURED** | q113 RED ×2 → GREEN ×2 |
| F-114 | **CURED** (INTENT at the bytes, below) | q114 RED ×2 (1 layer) → GREEN ×2 |
| F-201 | **PARTIAL**. The variable, the legend, the timeline and the field's N are CURED. The Σ upper bound is **ESCALATED (E-2)** | q201 RED ×2 (`f(x)` beside `f(t)`) → GREEN ×2 |
| F-202 | **CURED** | q202 RED ×2 → GREEN ×2 |
| F-203 | **PARTIAL**. One surface canon (the plate and the radius) is CURED. Hosting both on the glass primitive is **ESCALATED (E-3)** | q203 RED ×2 (10 px vs 12 px) → GREEN ×2 |
| F-204 | **CURED** (it also cures the ToggleGroup limb `.vedit` E-1 names for F-85) | q204 RED ×2 (0 radios) → GREEN ×2 |
| F-205 | **CURED** | q205 RED ×2 (2362 px under the box; legend on the curves) → GREEN ×2 |
| F-206 | **CURED**. The type limb is CURED (1440). The Parseval-row limb read GREEN before the cure at HEAD 390 (the row fitted; `.harmonics-row` wraps it now) | q206 1440 RED ×2 → GREEN ×2; q206 390 GREEN-before (RED ×2 before only through its type limb, since withdrawn to 1440) |
| F-207 | **CURED** for the consumer clip (CollapsibleSection deleted). The glass layer region's clip of a 24 px shadow blur is relayed as GLASS (R-1) | q114 clip limb |
| F-253 | **PARTIAL**. See the limb list below | q253 ×2 RED ×2 → GREEN ×2 |

F-253, limb by limb:
- CURED:
  - the sweep-front mark (drawn mid-sweep; seen in the frames);
  - the glass Badge;
  - the lucide Play glyph and the Button repaint;
  - the opaque 390 tab strip.
- Held by F-34 (`.u`): the `.eq-card`'s vertical clip at 390 (UIA-F-33/34 GREEN ×2).
- Routed SERVER, **ESCALATED (E-2)**: "coefficient hover only in Σ mode". The hover hooks (`.eq-coeff eq-an…`) exist only in the server's sigma TeX, and the expanded TeX carries none.
- **ESCALATED (E-4)**: "a polynomial labelled 'Conjectured'". The tier comes from `api/routers/equations.py` and its label from `web/src/lib/equation/notation.ts:55-60`, and both files are outside this unit's set.
- **DESIGN-RULING**, not cured, per the §0da lesson ("an audit row that removes an app's identity colour … needs an owner ruling"): "red as the active ink". The Trig pill and the x(π−x) preset wear the Fourier red that addendum (g) restored.
- **DESIGN-RULING**: "Compute duplicates Enter". The Enter key and the button are both lawful affordances; no defect was measured.
- **Not reproduced, carried (R-3)**: "Coefficients slices its last row". It is `shared/CoefficientsSpectrum.vue` (not this set), and it was not framed open here.

Tally ⟨count of the table's rows⟩ → 12:
- CURED 9: F-35, F-112, F-113, F-114, F-202, F-204, F-205, F-206, F-207 (consumer).
- PARTIAL 3: F-201, F-203, F-253.

**F-114, INTENT at the bytes.** The register's fix line reads "One `<Configurator>` with three ConfiguratorLayers". The defect it names is "three stacked disclosure sections in two registers", and its mechanism is the layer's register. The cure gives the three siblings the ONE register (glass ConfiguratorLayers, joined by glass's adjacent-layer rule) and deletes the local wrapper.
- The page is **not** re-hosted in `<Configurator>`'s stage and aside chassis. That chassis's detached-pane half is open at glass (O-75 CONFIGURATOR-DETACHED, F.W14V `.s2`), and moving the route onto it now would import the band the owner rejected on `/w`.
- If the orchestrator reads the `<Configurator>` shell as owed, it belongs with F.W14V `.s2`'s adoption.

**Escalations.** Each asks for a ruling on bounds or on a producer export. None is a substitute cure.
- **E-1 (carried from `.vedit`), F-85 and F-241.** The ToggleGroup limb is now cured by F-204, in `NotationPills.vue`. What stays open is the glyph and ink limbs in `web/src/lib/equation/notation.ts:14-17`: the `eⁱ` Unicode glyph and the hsl literal inks. That file is not in this unit's set (`web/src/components/equation/**`). **Ask:** grant `lib/equation/notation.ts` to the unit that closes F-85/F-241.
- **E-2, SERVER limbs of F-201 and F-253.**
  - The Σ form's upper bound is the requested `n_harmonics` (20), while the plot, legend and timeline draw N_eff (8 under Parseval auto). `render_latex_sigma` takes no bound.
  - The expanded TeX carries no `.eq-coeff` hover hooks.
  - Both are `api/**` (`.srv`'s bounds, closed). **Ask:** a server addendum. `/compute` and `/simplify` should render the sigma bound at the displayed N and emit the coefficient hooks in the expanded form. The consumer then reads them with no further change.
- **E-3, F-203's primitive limb** (joins `.vedit` E-2). Glass 10.0.1 exports no Popover or Tooltip virtual anchor (`PopoverContent` props: placement, `portal`, `ariaLabel`, and no `reference`). The two surfaces now share glass's plate and canon radius. **Ask:** add an O-59 addendum for a virtual-anchor export (a point anchor for cursor-following surfaces), to be adopted at the landing repin.
- **E-4, F-253's "Conjectured" limb.** The tier label lives at `lib/equation/notation.ts:55-60` and the tier at `api/routers/equations.py`, and both are outside the set. **Ask:** re-home it with E-1 and E-2.

**Residuals.**
- (R-1) **GLASS, a new half for O-59.** `ConfiguratorLayer`'s collapse region (`.configurator-layer-region > .min-h-0.overflow-hidden`) clips any child shadow within its 20 px layer pad. glass Button's `0 8px 24px` shadow loses 4 px of blur at the Compute button (measured: button left 29, region left 9). The register's own fix, `overflow: clip` with `overflow-clip-margin`, is the producer's. Relay owed, and no consumer override was made.
- (R-2) The preset hover Tooltips are retired (a TooltipTrigger's `data-state` overwrites the ToggleGroupItem's). The active preset's description is shown as the group's caption.
- (R-3) F-253's "Coefficients slices its last row" is carried (`shared/CoefficientsSpectrum.vue`).
- (R-4) Frames: the AFTER frames are banked (15). No BEFORE frames were banked, because every RED case failed before its frame line. The before state is the RED logs plus the seat's orientation frames (scratchpad, not banked).
- (R-5) Tracked frames under `web/e2e/screenshots/f-w14/` are dirty from sibling runs. They are not this seat's and were not touched.

**Gates BEFORE → AFTER.**
| gate | BEFORE | AFTER |
|---|---|---|
| G-u (this unit's 12) | 12 owed | 9 cured · 3 partial (E-2, E-3, and F-253's routed limbs) → **RED for the unit** |
| falsifier `f-w14u-eq` | 13 failed ×2 (loads 56–74) | **13/13 ×2** (loads 83 / 84) |
| equation-interaction + f-w14-uia F-32/33/34 | GREEN (banked) | **12/12 ×2** |
| `vue-tsc -b` | 0 (banked) | exit 0 |
| `vitest` | 86/86 (banked) | 86/86 |

**Status: PARTIAL**, escalations E-1 (carried) through E-4, and the R-1 relay.

## F.W14V.s2 (glass half, adopted early) ⊕ F.W14U.a2

**Ruling:** COHESION §0dd. glass-ui **10.1.0** is live (O-68, O-75, both additive, no MIGRATION entry). One Opus seat, same laws as c1 and c2. Track C's `.gallery` seat held `web/src/lib/api.ts`, `stores/gallery.ts` and `components/visualization/gallery/**` dirty at points in this unit. None of those were touched; my commit is pathspec-only.

**1. Repin.** `web/package.json` `"@mkbabb/glass-ui": "10.1.0"` (exact) and `npm install` in `web/`. ⟨`git diff web/package-lock.json`⟩ shows 4 lines: the one package entry, 10.0.1 → 10.1.0, with its resolved URL and integrity. **CHANGELOG:** 10.1.0 ships no CHANGELOG.md in the tarball. glass's repo CHANGELOG tops out at `## 10.0.1` (⟨`grep -n "^## " glass-ui/CHANGELOG.md | head -1`⟩ → `## 10.0.1 — 2026-09-22`). The API was therefore read from the published `.d.ts`: `ConfiguratorLayout = "attached" | "detached"` ("detached paints NO shell plate … the page ground shows between them"), and ConfiguratorLayer's `actionsWhen?: "open" | "always"` plus the `actions` slot. The live Vite on :3100 had prebundled 10.0.1 (`.vite/deps/_metadata.json` 14:55), so I restarted it with the orchestrator's command plus `--force`. ⟨`vue-tsc --noEmit`⟩ → 0 errors · ⟨`vitest run`⟩ → 14 files / 86 tests passed.

**2. O-75 CONFIGURATOR-DETACHED** (`VisualizationView.vue`):
- `<Configurator layout="detached">`: no shell plate. The stage and the aside are each glass's own card (`glass-floating rounded-card border`), with `--configurator-detached-gap` between them.
- **Deleted:** the X.F.W14U.s consumer wrap `<component :is="isDesktop ? Card : 'div'" v-bind="isDesktop ? { shadow: true } : {}">`, which is now a plain `div` at every width; the `Card` import; and the `.s` lg placement rule `@media (min-width:1024px){.viz-panel-left-wrap{width:auto;max-width:none;margin:var(--space-body)}}`.
- **`glass-opaque` re-checked, kept.** It sets only `--glass-level: 0` (⟨`grep glass-opaque dist`⟩ → `.glass-opaque{--glass-level: 0;}`). Detached, the shell carries no plate class, so the class paints nothing itself. Its level inherits into the two cards, so each is the solid `--card` of OA-43. The gutter now reads the page ground (falsifier da).
- **Aside band kept at `.s`'s +2 `--space-body`.** Those insets are now the detached card's own padding and edge. Measured on a first after-frame with the plain 360/400 band, the layer headers ellipsised to "Decompos…" and "Conto…" beside the header reset.
- **No-image state:** `[data-sidebar="none"]` also sets `--configurator-detached-gap: 0px`, and the grid's transition gains `gap` on the same panel spring (none under PRM). Without that, the stage stood 14 px short of the frame (`f-w13-image-empty` G-c read 14 > 4).
- **Mobile (< lg) kept as it was.** Detached, the inactive stage (the Controls tab up) still painted its card border as a 1 px line under the tabs, with a gap above the sheet. `.configurator-stage:has(> .panel-inactive)` now takes `display: none` below lg. The 390 frames before and after match apart from that line.
- **Other Configurators:** ⟨`grep -rn "<Configurator " web/src`⟩ → only `VisualizationView.vue`. `/equation` stacks ConfiguratorLayers in its own column with no stage+aside shell (the `.eq` record, :935, declined to re-host it), and `/morph` mounts none. So no other site had the owner-visible band, and none adopts detached. Whether `/equation` should move onto the Configurator chassis is a separate ruling, still open from `.eq`.

**3. O-68 CONFIGURATOR-HEADER-ACTIONS.** Census of every ConfiguratorLayer site (visualization, equation, morph): 8 layers. Two held a section action on a body row: BasisSelector (Decomposition) and ContourSettings (Contour), and both of their comments cited the missing slot.
- Both "Reset to defaults" buttons move into `<template #actions>`, with the default `actionsWhen="open"`. They are `size="sm"` so the header row keeps its height. Their body rows and the "no header-actions slot" comments are deleted.
- No other layer carries a section action: Image, Coefficients, the equation Function, Controls and Coefficients layers, and morph (which has no layers). ContourSettings' error-Alert Retry is a contextual command, not a section action, and it stays.

**4. Falsifier** `web/e2e/f-w14v-detached.spec.ts` (5 cases, headed, :3100 → :8000):
- **da** runs at 1440×900 and 1024×768 × light/dark. At 1024 the Configurator is single-column, so the gutter there is the vertical seam below the stage. The gutter's AREA median must be the page ground's colour, taken as the area median of the margin outside the Configurator. The channel shift from the ground must be neutral (spread ≤ 4), and the gutter no more tinted than the ground. The cards' casts shade the gutter neutrally (1440 light 217,216,214 against ground 227,227,225), and a plate tints it.
- **db** checks each layer's reset: inside the layer's `configurator-layer-header`, its box centre on the trigger's row, restoring the default (Harmonics 200, Blur 0.5) without toggling the layer (`aria-expanded` stays true), and one reset per layer, none in a body.
- **RED ×2 on HEAD's bytes** (the 3 src paths reverted to `fcc5617`): 5 failed ×2, 12 soft limbs each. The gutters read plate-tinted: 242,232,219 and 248,237,225 against a neutral 227,227,225 in light, and 66,49,37 and 62,46,33 against 25,24,23 in dark (shifts 15,5,−6 up to 41,25,14). Both resets are "in the body, not the header" and off the label's row. Log: `evidence/W14V/s2/red-HEAD-run.txt`.
- **GREEN ×2 after:** 5/5, 5/5.

**Adjacent specs (§0bt), each listed:**
- `web/e2e/f-w14u-s.spec.ts` G-s (1440/1024 × light/dark). `expect(m.card).toBe(true)`, "the pane is glass's own Card", is **INVERTED** to `toBe(false)` ("no consumer Card wrap") plus `detached === true`. The gutter, the four `--radius-card` corners and the own-shadow reads are **RE-POINTED** from `.viz-panel-left-wrap` to glass's `.configurator-aside`. The 390 case is unchanged: the wrap is still a plain column there.
- `f-w13-image-empty` G-c needed no spec edit. Its "the stage fills the frame" read (≤ 4) was cured at the source (the gap closes with the band).
- `f-w13-image-controls` finds the resets by role name, so no edit was needed; it passes.

**Regression:** veil + s + image-empty + image-controls + residuals + vstage + control-row + slider-scrub-contrast + contrast **43/43**; vedit **13/13** (`--workers=1`).

**5. Frames** (headed; before = HEAD `fcc5617` bytes on the 10.1.0 install, which is additive; after = `239845f`): `evidence/W14V/s2/{before,after}-1440-{light,dark}.png`, `-1440-{light,dark}-contour.png` (both headers open, Harmonics moved so the reset is live), `-390-{light,dark}.png`. Script: `capture.mjs`. The visualization minted for them was soft-deleted afterwards.

**Commit.** fourier **`239845f`**: pathspec-only, 7 paths (package.json, package-lock.json, VisualizationView, BasisSelector, ContourSettings, f-w14u-s.spec, f-w14v-detached.spec). Pushed without force: `fcc5617..239845f`.

**Honest-RED flips.** **CONFIGURATOR-DETACHED → CURED** (da GREEN ×2). **CONFIGURATOR-HEADER-ACTIONS → CURED** (db GREEN ×2). With that, F-238's lone reset row (R-7) and G-a are discharged. `.s` (PARTIAL → F.W14V `.s2`) is complete.

**Residuals.**
- (R-1) **Header label ellipsis.** In the frames, the layer label still ellipsises before its sub-label: "Decomposit…" / "basis & resoluti…" at 1440, and "Decomp…" at 390. The 390 case already did so at HEAD, without the reset. glass's header gives the label no priority over the `sub` once the actions slot takes a column. Consumer width buys only part of it (the kept band). This is a glass ask: label priority over sub in `configurator-layer-header`. **Owner-visible; I did not work around it inside glass.**
- (R-2) glass 10.1.0 ships no CHANGELOG entry; its repo tops out at 10.0.1. That is a producer bookkeeping gap for the glass relay.
- (R-3) Restarting the :3100 dev server (needed for the repin to serve) briefly interrupted the shared server for the other seats.
- (R-4) The tracked `web/e2e/screenshots/f-w14/after-*` frames regenerated by suite runs remain other seats' dirt, and I left them untouched.

### F.W14U.gallery

SEAT `.gallery` (unit 11), `claude-opus-5-5`, 2026-09-24 ~17:00-17:25 EDT. Spec `F-W14U.md` (78 lines, read whole; Units :8-18), register rows gallery-public / gallery-card-modal / gallery-drafts / visualization-saved F-96, `.srv`'s consumer contract (:362-374), COHESION §0cl..§0df (the §0dd seat ran in files disjoint from this unit's).

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → in this unit's set only `?? web/e2e/f-w14u-gallery.spec.ts` (514 lines, 16:37) plus 25 `before-*` frames under `web/e2e/screenshots/f-w14u/gallery/`: a killed predecessor's falsifier, no source edit. Read whole and judged against the register: every case maps to a row and asserts the register's cure; kept, with three corrections of its own (act 5). The other dirty paths (`f-w14u-s.spec.ts`, `f-w14/after-*` frames, `package*.json`, `BasisSelector/ContourSettings/VisualizationView.vue`) were the §0dd seat's, not touched. **Inherited:** `web/e2e/f-w14u-gallery.spec.ts`.

**Acts, in order.**
1. **Anchors at the true bytes (fourier `fcc5617`).** F-39: `stores/gallery.ts:92-97,118-122` sent `{limit, sort, owner}` only; `lib/api.ts` `listVisualizations` took no `q/tier/basis`; `GalleryView.vue` watchers refetched without them. F-46: `gallery.ts:277-295` `like()` moved the count locally (no endpoint). F-96: `GalleryView.vue` `@open-visualizer` pushed `/w/${image_slug}`. F-97: `GallerySearchBar.vue` `.filter-anchor` hand-rolled drawer. F-98: `GalleryCard.vue` `div role=button rounded-xl border-2`, `--shadow-cartoon`, hover `translateY(-4px) scale(1.02)`. F-99: card and modal headline `entry.image_slug`, `DialogTitle class="sr-only"`. F-101: `GalleryDraftsSection.vue:93` `rounded-lg border-[1.5px] border-foreground/8`. F-102: clickable divs. F-103: global `:disabled="publishing"` + `text-muted-foreground`. F-184: `GalleryInfiniteGrid.vue:50` ring spinner (F-71's carry R-1), no nomatch state. F-185: triggers `h-8 … rounded-lg` (`.d` (iii) carry). F-186: `[data-selected] border-color: var(--ring)` — `--ring` measured **empty** at runtime, tier as border+glow. F-187: filter keyed by family (`Fourier`), card by mode (`Epicycles`). F-188: `border-2` on DialogContent, `.modal-card` cast, two stadium tier toggles, `callout-btn` secondary CTA. F-189/F-190: `My Drafts` Collapsible; the logout watcher emptied drafts and left the tab. F-247: `N loaded` / `No more entries`, `text-amber-400` crown, mono placeholder. F-248: `toast("Published!", …, { slug })` named the *user* slug (`ensureUser()`'s). No drifted anchor needed INTENT.
2. **Live API is `.srv`'s.** ⟨`curl :8000/api/visualizations?tier=bogus`⟩ → `422`; ⟨`…?limit=3&q=zzz`⟩ → `{"items": [], …}` — `.srv` residual (i) already discharged (the :8000 process serves the filtered router).
3. **BEFORE ×2 (pre-cure bytes, frames banked).** ⟨`FW14U_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-gallery.spec.ts --project=chromium --headed --workers=3`⟩ → run 1 **15 failed · 4 passed (45.8s)**; run 2 **15 failed · 4 passed (41.6s)**. The 4 passes are the frame cases (1440/390 × light/dark: grid, filters, modal, drafts). Each RED read at its defect (g39 no `q` param; g46 0 PUTs; g98 not `.card`; g185 `h-8 rounded-lg` class; g184 1 `.animate-spin`; g248 `box-shadow none` both states; …). GREEN-BEFORE-CURE: none.
4. **The cure (commit `30346dd`, one meaning: the gallery family).**
   - `lib/api.ts`: `listVisualizations` takes `q`, `tier` (`all` = absent), `basis`; `setVisualizationLike` (PUT) and `getVisualizationLike` (GET) per `.srv`'s contract.
   - `stores/gallery.ts`: one `listQuery()` sent by `resetAndFetch` and every `fetchNextPage` cursor page; a run token so an older listing never lands after a newer one; `likedSlugs` + `toggleLike` (ensureUser → PUT → the server's `{liked, likes}`) + `readLike` (GET, logged in only); `publishDraft` toasts the new visualization's slug and runs the refresh outside its error channel (returns success).
   - `GalleryView.vue`: `/v/${slug}` CTA; like and publishing through the store (`publishingSlug`); one drafts rule on any auth change (reload, never empty, stay on the tab; the like set clears with the session); query-aware empty state with **Clear search and filters**; the Drafts empty state carries **Open the Visualizer →**.
   - `GalleryCard.vue`: glass `Card as="article" size="sm" shadow`, content laid out in Card's `--card-pad/--card-gap`; one native `button.card-open` (thumbnail + title, stretched by `::after` so the whole card opens), controls raised above it; tier = `--glass-accent: var(--tier-*)` at strength 100 %; hover sets glass's `--card-cast-rung` to `--glass-shadow-floating`; selection = the `--fill-selected` fill; the media on `--radius-media`; thumbnail fallback glyph.
   - `GallerySearchBar.vue`: glass `Popover modal` + `PopoverTrigger as-child` + `PopoverContent` (the `#gallery-filter-drawer` panel inside); Selects without consumer sizing; basis = `ToggleGroup type="single"` over the four `active_bases` keys labelled by `basisChips` (Epicycles · Series · Chebyshev · Legendre; the c1 pressed-hue recipe); label "Search gallery", placeholder "Search titles and tags…" (not mono); `::-webkit-search-cancel-button { appearance: none }`.
   - `GalleryCardModal.vue`: glass Dialog anatomy as published (`scroll`, no rim/cast overrides), visible `DialogHeader`/`DialogTitle` (title, serif) / `DialogDescription` (slug · age · tier Badge), media on `--radius-media`, Decomposition and Parameters as headed sections under a Separator, admin tier = `ToggleGroup type="single" aria-label="Tier"` (Normal/Featured/Saved), `DialogFooter` primary CTA emitting `entry.slug`.
   - `GalleryDraftsSection.vue`: a `ul aria-label="Drafts"` grid of glass Cards — `RouterLink` to `/w/<imageSlug>` (thumbnail `alt=""` + title), Draft Badge, basis labels, age, Publish with `:loading` for the one draft being published and `:disabled="!draft.contour"` + `aria-describedby` → "Open it to trace a contour first."; hover lift as the card.
   - `GalleryFeaturedCarousel.vue`: crown `text-tier-featured`; `.featured-card-wrapper { flex: 0 0 16rem }` — glass `.carousel-item` is `flex: 0 0 100%`, which had made the local `width: 16rem` dead (one featured card spanned the 1408 px column at 4:3; frame `before-grid-light-1440.png`).
5. **Falsifier corrections (the inherited spec, this unit's own file).** (a) g97 read the card's box after opening the drawer; a modal Popover inerts the page, so the box is read before. (b) g103's toast locator takes `.first()` (reka writes the text into a hidden live region too). (c) g184's cancel-glyph limb read `getComputedStyle(el, "::-webkit-search-cancel-button")`, which Chromium does not report (`auto` with the rule present, probed); it now compares the painted strip at the content-box end empty vs filled. Its RED was measured on the pre-cure rule: ⟨rule renamed off → `-g g184`⟩ → **1 failed** at that limb; rule restored → green. (d) `openFilters` waits the plate's enter animation before a frame (the first after-frames caught it mid-blur). (e) line 1 `// SERVED MODEL: claude-opus-5-5`.
6. **Design read (frames).** First after-frames showed the 390 filter panel overflowing its plate (Chebyshev and Newest clipped): the panel is `width: 20rem; max-width: 100%` and the Select row a 2-column `minmax(0,1fr)` grid. Frames `after-{grid,filters,modal,drafts}-{light,dark}-{1440,390}.png` + per-case `after-g*.png` beside the before set (68 PNGs on disk; `*.png` is gitignored in `web/`, not force-added).
7. **GREEN ×2 on the settled bytes.** ⟨`FW14U_PHASE=after BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-gallery.spec.ts --project=chromium --headed --workers=3`⟩ ×2 → **19 passed (21.6s)** · **19 passed (19.0s)** (load 38.91/47.65/69.37); a third run at the committed bytes (after the line-1 stamp) → **19 passed (30.8s)**.
8. **Hold gates.** ⟨`npx vue-tsc -b`⟩ ×2 → exit 0 · exit 0. ⟨`npx vitest run`⟩ ×2 → `Test Files 14 passed (14)` · `Tests 86 passed (86)` ×2.
9. **Non-regression.** ⟨`npx playwright test e2e/f-w14-uia.spec.ts -g "UIA-F-1 |UIA-F-4[0-8]" --project=chromium --workers=3`⟩ ×2 → **7 passed** ×2 (F-1, F-40, F-41, F-42, F-45, F-47, F-48). ⟨`… e2e/gallery.spec.ts`⟩ ×2 → **7 passed** ×2 (after the adjacent `:111` locator; the first reading was 1 failed at `:118`, the modal Popover's inert trigger). ⟨`… e2e/f-w14-uia-r2.spec.ts -g UIA-F-46 --workers=1`⟩ ×2 → 1 passed ×2. Wider read ⟨`… f-w14-uia-r2 visual-checkpoint shell-header f-w14-admin-idiom f-w14-admin-table`⟩ → 40 passed · 4 failed = vc `:81 :102 :123` (the named baseline set) + vc `:164` (item 3, `/equation`'s disclosure body — not a gallery surface; `.eq`'s bytes, recorded for the close). ⟨`… gallery-admin-a11y.spec.ts`⟩ → 4 failed `:91 :103 :114 :125` = the named baseline set (reka focus-guard `aria-hidden-focus`), unchanged.

**Adjacent edits (§0bt)** — same repo, same concern, assertions unchanged:
- `web/src/components/visualization/gallery/GalleryInfiniteGrid.vue:4,31,48-61` — F-184/F-247 live here: the transparent-topped ring → glass `Skeleton` cards in a `role="status"` grid (F-71's R-1 carry), the `N loaded` and `No more entries` chatter deleted. The file is in no unit's set.
- `web/e2e/f-w14-uia.spec.ts:33` (F-1 asserted the deleted `1 loaded` copy → the grid card by its title), `:478-482` (F-48 measured the retired `My Drafts` disclosure → the Drafts list's first card in its column), `:520,:547` (card name from the title), `:594-595` (F-47: the Drafts list; the expand-click line of the retired disclosure removed).
- `web/e2e/gallery.spec.ts:80` (label "Search gallery" — search now reads title/description/tags), `:96` (`.draft-card`), `:111-114` (`includeHidden`: the modal Popover inerts its trigger while open), `:163,:172` (name from the title).
- `web/e2e/f-w14-uia-r2.spec.ts:101-113` (the Repair-2 F-46 case stubs the whole `/api/visualizations**` space; its stub now answers `PUT/GET …/like`; card name from the title).

**Dispositions (18 rows).**
| row | disposition | falsifier |
|---|---|---|
| F-39 (BROKEN) | **CURED** (consumer half over `.srv`): search/tier/basis sent on every page; the grid narrows on the live API (per-run seed) | g39 |
| F-46 (BROKEN) | **CURED** (consumer half over `.srv`): press → PUT {liked}, ±1 by the server; reload keeps `aria-pressed` (GET) | g46 (live API) + r2 F-46 |
| F-96 | **CURED** route (`/v/<slug>`). The morph limb (router `isVizMorph` lacks the gallery pair; a matching `view-transition-name`) is `router/index.ts` = `.misc`'s set → carried (R-1) | g96 |
| F-97 | **CURED** | g97 ×1440/390 |
| F-98 | **CURED** | g98 |
| F-99 | **CURED** | g99 |
| F-101 | **CURED** | g101/g189 |
| F-102 | **CURED** | g102 (Enter → `/w/img-draft-one`) |
| F-103 | **CURED** | g103 |
| F-184 | **CURED** (clear control · nomatch + Clear · Skeleton) | g184 |
| F-185 | **CURED** (consumer overrides dropped; plate = PopoverContent). The plate's legibility over saturated media is glass's (F-122, O-59) | g185 |
| F-186 | **CURED** (tier rim `--glass-accent` ≠ focus ink `--focus-ring-color`; elevation kept; selection its own fill) | g98 |
| F-187 | **CURED** | g99 |
| F-188 | **CURED** | g188 |
| F-189 | **CURED** | g189 ×2 cases |
| F-190 | **CURED** | g190 (no-contour disabled + reason; logout keeps drafts) |
| F-247 | **CURED** (chatter, bounce, crown token, mono placeholder, DialogDescription, `--radius-media`, featured member basis) | g188 + g98 |
| F-248 | **CURED** (hover lift, toast names the piece, no contradictory toast). The toast's **View** action needs an action seat in `useToast.ts` = `.shell`'s set → carried (R-2, with F-183 E-2); the chevron limb died with the disclosure | g248 + g103 |

⟨self-count: python over this table's first column⟩ → 18 rows, 18 CURED, 0 ROUTED; the two carried limbs are sub-limbs of CURED rows.

**Residuals.**
- (R-1) F-96's route-morph limb → `.misc` (`router/index.ts` `isVizMorph` gains `gallery`↔`visualization`; the card media then takes a matching `view-transition-name`).
- (R-2) F-248's toast **View** action → `.shell` (`composables/useToast.ts` action seat), beside F-183's.
- (R-3) Cards on the grid do not seed `aria-pressed` after a reload (only the opened modal does, via GET `…/like`); `.srv` has no batched like-state read. A server read of the viewer's likes per page would close it (not in any row).
- (R-4) `style.css:329-335` keeps `.gallery-card:focus-visible` (the card is no longer focusable; the ring is on `.card-open`) — dead selector in `.shell`'s/`.vstage`'s file, harmless; delete at its owner's next edit.
- (R-5) glass carousel has no member-measure token (`.carousel-item { flex: 0 0 100% }`); fourier sets its item basis locally. A producer token would retire that line (relay candidate, O-74 family).
- (R-6) vc `:164` (item 3, `/equation`) red in the wider read — not this unit's surface; for the close's accounting.

**Escalations:** none.

**Commits:** fourier `30346dd`; value.js this record.

### F.W14U.admin

SEAT `.admin` (unit 12), `claude-opus-5-5`, 2026-09-24 ~17:25-18:10 EDT. Spec `F-W14U.md` (78 lines, read whole; Units :8-18), register rows gallery-admin-banner-batch / gallery-admin-users / gallery-admin-flagged / gallery-admin-audit (`audit/UI-AUDIT-fourier.md:178-185,225,230,272-281,335-338`), COHESION §0cl..§0di (§0cv: vc `:145` re-baselined by F.W14.s2; the seat's LOCK: that golden stays GREEN, no re-baseline without a grant). Tree fourier `30346dd` (after `.gallery`, the GalleryCard lock), glass `10.1.0`.

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain | grep -v screenshots/f-w14/`⟩ → `?? .worktrees/` only. No path in this unit's set dirty. **Nothing inherited.**

**Acts, in order.**
1. **Anchors at the true bytes** (the register cites `216ffbd` / glass 8.0.0; `.h` `c47dc5b` and `.t` `b5a650f` re-cut these files since). Measured: F-104 `GalleryCard.vue:102` `:data-selected` — **glass Card consumes `data-selected`** (its `selected` option state) and drops it from the element (probe: the article's attributes are `data-tier data-slot data-shadow data-size data-surface`), so `.gallery`'s `[data-selected]` fill never applied; F-105 banner grid `grid-cols-[repeat(auto-fit,minmax(5rem,1fr))]` → 3 cells at 390, labels ENTRI/ES, FEATU/RED, STORA/GE; F-106 `AdminUserList.vue` `<Search>` before `<Input>` (tree order under the field's stacking context); F-109 `.h`'s admin-row idiom (media inset); F-110 three buttons in `[data-admin-actions]`; F-111 `AdminAuditLog.vue` ActionCell `font-mono uppercase`, `applyFilters` verbatim; F-191 `.admin-overlay-btn { @apply h-7 w-7 rounded-full }` + Checkbox `h-4 w-4`; F-192 `BatchActionBar` `v-if` + banner `v-if` unmount their focused control; F-193 row `data-selected` with no consumer, `(N selected)` in the select-all label beside the bar's count, two glyph buttons; F-194 `Prune empty` a toolbar peer; F-197 `.flagged-queue { --glass-accent: var(--destructive) }` + `.flagged-row` 6 % destructive wash + `text-destructive` flag + `tone="destructive"` badge + `admin-row.css` destructive rule and reason ink; F-198 `<img>` without `@error`; F-199 hand-rolled `border-destructive/40 bg-destructive/5` blocks, bare "Loading …" text, `useOffsetPagination` `e.message`; F-200 `cartoon-card sticky top-2`; F-249 `GalleryAdminBanner` "… — {error} The controls below may be acting against a credential…", `BatchActionBar` `flex-1` count, `GalleryView.vue` verbs `class="text-xs"`, Unfeature with no glyph, always enabled; F-251 `RotateCw`, dialog ✕/Escape armed while Cancel disabled, media `--radius-field`; F-252 `formatTimestamp` (year + seconds), Card `opacity-60` over DataTable's own loading, filtered-empty without a clear, pager `{{ page }} / {{ pageCount }}` + `{{ total }} total`.
2. **Falsifier** `web/e2e/f-w14u-admin.spec.ts` (new, line 1 `// SERVED MODEL: claude-opus-5-5`): 35 cases — 4 frame cases (1440/390 × light/dark: banner, batch, users, flagged, audit) + a104 a105 a106×2 a107×2 a109×2 a110×2 a111 a191 a192 a193 a194 a195 a195b a196 a197 a198 a199×3 a200×2 a249×3 a250 a251 a252. Admin endpoints stubbed (`fixtures/gallery`), per-case routes over them.
3. **BEFORE ×2 (pre-cure bytes, frames banked).** ⟨`FW14U_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-admin.spec.ts --project=chromium --headed --workers=4 --timeout=60000`⟩ ×2 → **26 failed · 9 passed (2.4m)** · **26 failed · 9 passed (2.6m)** (load 249.56/147.27/98.71 after run 2). The 9 greens: the 4 frame cases, a107 ×2, a109 ×2, a195 (users). Each RED read at its defect: a104 outline `none`; a105 label 0 on 2 lines; a106 `elementFromPoint` → `INPUT`; a110 Keep/Delete visible (count 1, want 0); a111 `uppercase`; a191 overlay button 12 px non-square; a192 activeElement `BODY`; a193 selected row fill = unselected; a196 a field on 2 lines at 390; a197 row bg `oklab(0.574 0.192 0.100 / 0.06)`; a198 1 painted broken `<img>`; a199 no `[data-slot=alert]` ×3; a200 bar top − scroller top **24 px** (1440), phone bar **136 px**; a195b audit table top **−241 px** after Next; a249 copy contains "credential", verbs lack a glyph/overlap; a250 no Skeleton; a251 `RotateCw`; a252 no year/seconds limb fails. **GREEN-BEFORE-CURE:** a107 (the F-107 probe: at glass 10.1.0 every footer control sits inside the dialog at 1440 and 390 — the P row's overflow does not reproduce), a109 (`.h` `c47dc5b` inset the media), a195 users (the users page turn already lands on the list head at HEAD; the audit ledger did not — a195b).
4. **The cure** (fourier commit below, one meaning: the admin family).
   - `GalleryCard.vue` — F-104: selection is an outline ring (`2px var(--primary)`, offset 2) over the selected fill, on the hook `data-batch-selected` (glass Card drops `data-selected`; `.gallery`'s fill now applies too). F-191: the overlay buttons are glass `sm` icon-only as published (the `h-7 w-7 rounded-full` literals and the local scale hover deleted); glass Checkbox at its own size inside a `label.select-plate` (≥ 24 px target, the legibility backing).
   - `GalleryAdminBanner.vue` — F-105 (consumer half): `grid-cols-2` below `sm`, the auto-fit strip unchanged from `sm` up (vc `:145` byte-stable). F-249: "Admin statistics could not be loaded: <detail>." — no credential blame, punctuated. F-192: Log out moves focus to the first control of the block mounted before the banner (the tabs/search), after the unmount.
   - `BatchActionBar.vue` — F-249: the count and the verbs are one wrapping group (count no longer `flex-1`), each verb keeps its width (no overlap at 390), the clear closes the row. F-192: Clear moves focus into the collection mounted before the bar (the first card's/row's control).
   - `AdminUserList.vue` — F-106: the glyph follows the Input in tree order (`pointer-events-none`), GallerySearchBar's idiom. F-193: row menu (⋮ "Actions for user X": Suspend and revoke sessions / Reinstate, then Delete user… in the destructive ink); the selected row takes glass's `--fill-selected`; `h2` count "N users" heads the list; the select-all label no longer repeats the count. F-194: `data-admin-toolbar` composition; Prune → the ⋮ "More user actions" menu → the existing confirm. F-199: glass `Alert` (destructive, CircleAlert, detail, Try again); Skeleton rows while loading. F-250 ⊕ F-194 ⊕ F-252: the admin pager — First · Previous · "Page n of m" · Next · Last · Rows per page (20/50/100) · "N users".
   - `AdminFlaggedPanel.vue` — F-110: Dismiss visible + ⋮ "More actions for <slug>" (Keep; Delete entry… apart). F-197: the queue accent, the row wash, the red flag glyph and the destructive count badge are gone (neutral glyph, outline badge); the Tier field shows only when not Normal; Keep disabled on a Saved row; the toast says "Kept <slug>". F-198: `@error` → an `ImageOff` media tile (`role=img`, `data-admin-media`). F-199: Alert + Skeleton. F-251: ChevronDown on Load more; `DialogContent :dismiss="busy ? 'locked' : 'deliberate'"`.
   - `AdminAuditLog.vue` — F-111: the badge shows the stored action verbatim; the action query is lower-cased. F-200: the bar is a glass `Card` sticky at the scroller's top edge — `top` = the scroller's measured `padding-top`, negated (a sticky box offsets from the content edge; the gallery column's `py-4` left the 16 px band, `top-2` another 8); below `sm` the two filters fold into a Popover ("Filters"), authored once with vueuse `createReusableTemplate`. F-252: timestamps are `lib/time.ts`'s relative clock (absolute in `title`/`datetime`); no second `opacity-60`; filtered-empty carries **Clear filters**; the pager is the users pager (First…Last, 25/50/100, "N entries"). F-199: Alert. F-195: page turns scroll the ledger head into view.
   - `useOffsetPagination.ts` — F-195: `scrollTarget` option (a committed page change scrolls it to `block: start`); F-199: errors read through `problemMessage` (detail over title).

**RESUME (seat 2, `claude-opus-5-5`, 2026-09-24 ~19:35 EDT).** The seat above was killed after act 4 (receipt lines to here, cure uncommitted). **Crash-recovery at resume:** ⟨`git -C fourier-analysis status --porcelain | grep -v 'screenshots/f-w14/\|worktrees'`⟩ → ` M` on all 7 `.admin` source files + `GalleryView.vue`, `gallery/admin-row.css`, `e2e/f-w14-uia.spec.ts`; `??` `e2e/f-w14u-admin.spec.ts` (713 lines, line 1 `// SERVED MODEL: claude-opus-5-5`). **Inherited, read and judged:** every hunk matches act 4's text; ⟨`git diff -- web/src | grep '^+' | grep -nE 'try|catch|!important|skip|:deep|as any|@ts-'`⟩ → 0 masking hits; ⟨`grep -nE 'test\.skip|fixme|test\.only' e2e/f-w14u-admin.spec.ts`⟩ → 0. The three out-of-set paths are §0bt adjacent lines of this unit's rows (below). The ` M web/e2e/screenshots/f-w14/*.png` drift is the gate runs' tracked frames (not this unit's set): left untouched, never staged. AFTER frames (28 + 8 per-row) were already banked 18:02-18:03 under `web/e2e/screenshots/f-w14u/admin/` (gitignored `*.png`, local).

5. **Gates at the inherited bytes.** ⟨`npx vue-tsc -b; echo EXIT=$?`⟩ → `EXIT=0`, 0 lines. ⟨`npx vitest run`⟩ → **86 passed (14 files)**.
6. **AFTER ×2.** ⟨`FW14U_PHASE=after BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-admin.spec.ts --project=chromium --headed --workers=4 --timeout=60000`⟩ ×2 → **35 passed (22.8s)** · **35 passed (22.9s)** (load 8.48/5.99/6.24 after run 2). RED→GREEN: 26 failed ×2 → 0 ×2.
7. **Non-regression ×2.** ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/visual-checkpoint.spec.ts e2e/f-w14-admin-table.spec.ts e2e/f-w14-uia.spec.ts --project=chromium --workers=3 -g "item 8|UIA-F-3[67]|UIA-F-42|admin"`⟩ ×2 → **18 passed** ×2 = G-t (12: Users/Flagged/Audit × 1440/390 × light/dark) + **vc `:145` item 8 admin-banner golden GREEN (no re-baseline)** + UIA-F-36, -37, -40, -41, -42. Wider read: ⟨`… e2e/f-w14-admin-idiom.spec.ts e2e/gallery-admin-a11y.spec.ts e2e/f-w14u-gallery.spec.ts --workers=4`⟩ → 31 passed · **4 failed**, all `gallery-admin-a11y` `[serious] aria-hidden-focus` (reka's two `span[aria-hidden][tabindex=0]` focus guards). **Pre-existing, not this unit's:** the same spec against HEAD `30346dd`'s bytes (`git archive HEAD web paper docs` into the scratchpad, vite on :3199, stopped after) → the **same 4 failed**, same rule, same 2 nodes. Carried as residual R-1.
8. **Commit** (fourier, one meaning: the admin family; pathspec array) → **`78a213d`** — 11 files, +1318 −345. **Adjacent edits (§0bt):** `web/src/components/visualization/GalleryView.vue:11,248-256,444,453,456,461` (F-249: the gallery batch verbs live in GalleryView's `BatchActionBar` slot — StarOff glyph on Unfeature, Feature/Unfeature enabled only when they would change a selected entry, `text-xs` dropped; `.gallery` is closed, serial); `web/src/components/visualization/gallery/admin-row.css:43-44,117-119,131` (F-251 media on `--radius-media`; F-197 the reason rule and ink neutral — the moderation row's shared sheet); `web/e2e/f-w14-uia.spec.ts:441-443` (F-37's third toolbar control is now the "More user actions" trigger since Prune moved into it, F-194; assertion unchanged).

**Dispositions (23).**
| row | disposition |
|---|---|
| F-104 | CURED `78a213d` · a104 RED ×2 (outline `none`) → GREEN ×2 |
| F-105ˢ | consumer half CURED (a105) · glass half ROUTED O-59 (Metric `overflow-wrap`) |
| F-106ˢ | consumer half CURED (a106 ×2) · leading-adornment slot ROUTED O-59 |
| F-107ˢ | consumer half VERIFIED-NOT-REPRODUCING at glass 10.1.0: a107 ×2 GREEN before and after (every footer control inside the dialog at 1440/390), frames `before/after-a107-dialog-*` · glass half ROUTED O-59 |
| F-109 | CURED-BY `.h` `c47dc5b` (a109 ×2 GREEN before and after; held as a guard) |
| F-110 | CURED (a110 ×2) |
| F-111 | CURED (a111) |
| F-144ˢ | glass half ROUTED O-59 (`--tier-featured`/`--tier-saved` light arms). Consumer half = the `AppDock.vue` admin badge (register row :225) → **not in `.admin`'s set; routed to `.shell`** (unit 14, `web/src/components/layout/**`). The banner numerals keep the relay (`GalleryAdminBanner.vue:237`). |
| F-149ˢ | glass half ROUTED O-59 (Metric radius from `--radius-ctx`). **Consumer half HELD — LOCK conflict:** the cure the register names ("the banner on Card (`--radius-card`)", row :230) changes the banner's own radius (`GalleryAdminBanner.vue:87` `rounded-lg border-[1.5px]`), i.e. the pixels of the vc `:145` `checkpoint-admin-banner.png` golden, which this unit's lock forbids re-baselining without a grant. Not substituted. **ESCALATED** for a re-baseline grant (then: banner → glass Card, one golden re-cut). |
| F-191 | CURED (a191) |
| F-192 | CURED (a192) |
| F-193 | CURED (a193) |
| F-194 | CURED (a194) |
| F-195 | CURED (a195b audit RED ×2 −241 px → GREEN ×2; a195 users GREEN before, held) |
| F-196 | CURED (a196) |
| F-197 | CURED (a197) |
| F-198 | CURED (a198) |
| F-199 | CURED (a199 ×3) |
| F-200 | CURED (a200 ×2: 24 px / 136 px → 0) |
| F-249 | CURED (a249 ×3) |
| F-250 | CURED (a250) |
| F-251 | CURED (a251) |
| F-252 | CURED (a252) |

**Tally** (self-count of the table above): 23 rows = 19 CURED by `78a213d` (F-104 F-105 F-106 F-110 F-111 F-191..F-200 F-249..F-252, counting F-105/F-106 by their consumer halves) + 1 CURED-BY `.h` (F-109) + 1 VERIFIED-NOT-REPRODUCING (F-107) + F-144 (glass ROUTED, consumer → `.shell`) + F-149 (glass ROUTED, consumer HELD on the vc `:145` lock).

**Residuals.** R-1 `gallery-admin-a11y` 4 × `aria-hidden-focus` (reka focus guards), pre-existing at `30346dd` — for the wave close's named-set reading. R-2 F-149 consumer half (escalated above). R-3 F-144 consumer half → `.shell`.

**Unit status: PARTIAL** — 21/23 rows closed in this unit; F-149's consumer half awaits a vc `:145` re-baseline grant; F-144's consumer half is homed in `.shell`.
