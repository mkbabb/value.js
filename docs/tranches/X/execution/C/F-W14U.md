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
