SERVED MODEL: claude-opus-5-5

# X·F F.W14V — execution record (Track C)

Spec: `docs/tranches/X/fourier/waves/F-W14V.md` (§1 + addenda (a)(b)(c)); scope also F-W14U.md addenda (e) (AUDIT-2, re-homed by (f)) and (h) (the 26 → 25 open rows, `.u`). Authority: COHESION §0cz · §0da · §0db · §0dc · §0dd · §0dh · §0dp. Repo: fourier-analysis (`web/**`; `api/**` for `.p` and `.u` server limbs). Glass READ-ONLY. Every seat Opus 5.5.

## Open

- **Date:** 2026-09-25 (execution under the owner's 2026-09-17 begin-word, COHESION §0j). Seat 0, Track C, `claude-opus-5-5`. fourier HEAD = `7ee9b65` (branch `m/w1-bump-migration`); value.js HEAD = `4bd63b08`.
- **Crash-recovery:** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only (outside every writable set of this wave; not touched). No record existed (`execution/C/F-W14V.md` absent) → fresh OPEN, not RESUME.
- **Preconditions ("Opens after: F.W14U CLOSED"):**
  - LEDGER `:88` → F.W14U **CLOSED 2026-09-17** (RESUME 1 Check 2 CONFORMANT-HONEST-RED at fourier `7ee9b65`; `:806`). MET.
  - Addendum (b)'s early-landed glass half: ⟨`git merge-base --is-ancestor 239845f HEAD`⟩ → ANCESTOR; ⟨`grep '"@mkbabb/glass-ui"' web/package.json`⟩ → `"10.1.0"` exact; ⟨`grep -n 'layout="detached"' VisualizationView.vue`⟩ → `:361` `<Configurator scroll-mode="auto" layout="detached" class="viz-configurator glass-opaque" …>`; `web/e2e/f-w14v-detached.spec.ts` present (11409 B). MET.
  - Owner frame `fourier/evidence/W14/owner-2026-09-24-configurator-shell-band.png` present and READ (plate-tinted band between stage and pane; the raw "Error · A session is required to publish." toast over the pane's lower edge).
  - F.W14U Repair 1 LW cures in HEAD: `a926748` (LW-1 vc/radius oracles), `56e56a3` (LW-2 admin banner checkpoint), `0e34595` (LW-3 `:4190` preview = Playwright `webServer`, `playwright.config.ts:92-101`). `.u` verifies these, does not redo them.
  - Servers: ⟨`lsof -iTCP -sTCP:LISTEN`⟩ → node `:3100` (vite dev), uvicorn `api.main:app` `:8000` (started 2026-09-24 15:42), mongod `127.0.0.1:27018`. `POST :8000/api/sessions` → 200 token.
- **E13 mail sweep (four paths):** value V/ + V/coordination · glass BK/coordination (BL is the newest tranche dir, no `coordination/`) · keyframes V/coordination · atlas P/coordination. ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ → empty on every path except `glass-ui/docs/tranches/BL/FORMATION-PROGRESS.md` (glass's internal resume cursor, not a letter). Last rowed = I-61 (O-82 CONFIRMED). **0 unrowed addressed to value.js · 0 UNREAD in scope.** Sweep line appended to INBOX.md.

## Baseline

BEFORE, read at fourier `7ee9b65` (= the F.W14U close bytes), read-only.

| Gate | Owner | BEFORE | Note |
|---|---|---|---|
| vue-tsc | close | **0** | ⟨`npx vue-tsc --noEmit; echo $?`⟩ → exit 0, 0 `error TS` |
| vitest | close | **86/86** (14 files) | ⟨`npx vitest run`⟩ → `Test Files 14 passed (14)` · `Tests 86 passed (86)` |
| api `owner_required` contract (`.p` §3) | `.p` | **GREEN** (must stay) | ⟨`MONGO_TEST_URI=mongodb://127.0.0.1:27018 pytest api/tests/conformance/test_identity.py::test_owner_required`⟩ → `1 passed`; ⟨`pytest api/tests/test_crud_lib_errors.py`⟩ → 65 passed (the identity test skips without `MONGO_TEST_URI`) |
| `.s2` G — `e2e/f-w14v-detached.spec.ts` (headed) | `.s2` (verify) | see below | the cure landed early at `239845f` (addendum (b)); a GREEN here is the landed cure, not a pre-cure GREEN |
| `.u` G-u (F.W14U register rows re-homed) | `.u` | **RED 231/256 — 25 open** | banked at F.W14U Repair 2 / RESUME 1 Check 2 (LEDGER `:798` `:806`; fourier unmoved since): 8 ESCALATED ids (F-14 BROKEN, F-81 +F-9, F-79, F-173, F-68, F-183, F-74, F-85) + F-77ˢ + 15 PARTIAL (F-71 F-93 F-146 F-168 F-170 F-172 F-177 F-182 F-201 F-203 F-238 F-239 F-241 F-244 F-253) + F-149ˢ; F-174 already CURED (`7ee9b65`) |
| `.u` LW-1/LW-2/LW-3 | `.u` (verify) | **GREEN (banked)** | cured at F.W14U Repair 1 (`a926748` `56e56a3` `0e34595`); targeted set = named vc `:81 :102 :123` ×2 (LEDGER `:796`) |
| `.c3` magnet-mark + menu icon gap falsifier | `.c3` | **RED by absence** | no falsifier exists; the magnet state is visible only inside More-tools (`dd123a9`); authoring it RED is the unit's first act |
| `.eq2` /equation shape | `.eq2` | **UNMEASURED** | `.eq2` measures first; only `/visualize` mounts a Configurator (`239845f` body) |
| `.p` signed-out Publish reaches sign-in | `.p` | **RED (owner frame)** | no falsifier exists; `api/routers/visualizations.py:176` → `owner_required` "A session is required to publish." surfaces as a raw toast over the pane (owner frame) |
| AUDIT-2 register (F-W14U add. (e)) | `.au0`…`.au6` | **RED 0/56 consumer halves dispositioned** in this wave | 62 rows (`9c7552d3`); 56 consumer halves; 25 glass halves (6 glass-only = ADOPT-AT-LANDING); §11 type rows L3-14/L2-18 HELD (O-74a E-2) |
| full e2e `--workers=1` | close | **named set (10/11 failed ×2), banked** | F.W14U RESUME 1 Check 2 at `7ee9b65` (LEDGER `:806`): r1 `10 failed · 388 passed`, r2 `11 failed · 387 passed`; not re-run here (>120 s; bytes unmoved) |

**`.s2` falsifier, pasted:** ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-detached.spec.ts --project=chromium --headed --workers=1 --reporter=line`⟩ ×2 → run 1 `5 passed (20.4s)` exit 0; run 2 `5 passed (20.2s)` exit 0. **GREEN ×2 at the BEFORE bytes**: this is the addendum (b) cure landed early at `239845f` (it was RED ×2 before that commit, 12 limbs, record `db0058c7`). It is not an R.2 pre-cure GREEN, but it is listed as greenBeforeCure so the finding is on file. `.s2` = verify only.
- **Instrument notes (for every seat):** (1) `BASE_URL` must be set to `http://localhost:3100`. The config defaults to `:3000`, where nothing is served, and a first attempt died in the global seed with `POST /api/sessions → 404` (the `:4190` preview had no API proxy). (2) The `chromium-headed` project `grep`s `GPU_INSTRUMENT` only. The spec's own header prescribes `--project chromium --headed`, and "headed" means that invocation. (3) The `:4190` preview is built by `webServer` on every run unless one is already listening (LW-3).

## Unit plan

The order is strictly serial, one unit at a time (addendum (c) + §0dp): `.s2` (verify) → `.u1` → `.u2` → `.u3` → `.u4` → `.c3` → `.eq2` → `.p` → `.au0` → `.au1` → `.au2` → `.au3` → `.au4` → `.au5` → `.au6`. `.u` is split by surface as addendum (c) allows. `.u1`/`.u2`/`.u3` follow the names addendum (c) gives. `.u4` takes the stage-surface and readout PARTIALs so that no single seat holds all 18 visualize rows. The AUDIT-2 families are grouped by surface, the way F.W14U grouped its UIA rows. A row F.W14U already cured under its UIA twin is cited, not redone (`.au0` marks those). Every seat is Opus 5.5. Every falsifier is served from `:3100` against `:8000` (BASE_URL set), headed with a real GPU for visual gates, RED before and GREEN ×2 after. Glass stays READ-ONLY: glass halves are honest-RED with their O-id, or ADOPT-AT-LANDING. ESCALATED units do not halt the wave. §0da law: an app-identity colour, type or motion row is DESIGN-RULING and is never cured away.

| # | Unit | Rows / scope | Writable (fourier) | Gates |
|---|---|---|---|---|
| 1 | `.s2` | verify addendum (b); O-77 LAYER-HEADER-LABEL honest-RED | none expected (`web/e2e/**` only if an oracle drifted) | f-w14v-detached ×2 GREEN (banked above); gutter px table 1440/1024 L+D; <lg sheet form GREEN |
| 2 | `.u1` | stage/dock: F-14 BROKEN + F-93 F-182 F-244 (the one live stage in the takeover); F-81 + F-9 final form; F-79 + F-77ˢ (one `ViewLayersMenu`); F-173 (d2 setup, §0bt); F-177 honest-RED O-82 | `web/src/**` `web/e2e/**` | falsifier ×2 per row; no second BasisCanvas in DOM in fullscreen |
| 3 | `.u2` | equation: F-85 + F-241 (notation.ts hsl → palette tokens), F-201 + F-253 (server limbs, "Conjectured"), F-203 honest-RED O-82 | `web/src/**` `web/e2e/**` `api/**` (server limbs) | falsifier ×2; api tests GREEN |
| 4 | `.u3` | shell/toasts/admin: F-183 (control-state half), F-149ˢ; verify LW-1/2/3 (vc `:145 :164 :199`, f-w13-radius `:105`, `:4190` webServer) | `web/src/**` `web/e2e/**` | falsifier ×2; vc/radius targeted ×2 |
| 5 | `.u4` | stage surface/readouts: F-68 F-168 F-170 F-74 (neighbour oracles at 390) F-71 F-146 F-172 (non-colour limb only, §0da) F-238 F-239 | `web/src/**` `web/e2e/**` | falsifier ×2; G-u = 256 dispositioned |
| 6 | `.c3` | addendum (a): magnet on-mark on More-tools via glass DockControl seat (else O-76 addendum + honest-RED MAGNET-STATE-HIDDEN); DropdownMenuItem icon gap | `web/src/**` `web/e2e/**` | mark + gap falsifier RED→GREEN ×2; frames 1440/390 L+D |
| 7 | `.eq2` | addendum (b): /equation onto `Configurator layout="detached"` if stage+inspector, else one-line why | `web/src/**` `web/e2e/**` | frames before/after 1440/390 L+D; falsifier ×2 |
| 8 | `.p` | signed-out Publish → inline sign-in (resume after) or pre-click need; toasts never over the pane (glass Toaster offset) | `web/src/**` `web/e2e/**` (`api/**` only if the server half needs it) | e2e signed-out publish ×2; api `test_owner_required` GREEN unchanged |
| 9 | `.au0` | AUDIT-2 re-baseline to HEAD (L1-7 L1-8 L1-26 L2-2 L2-8 L2-12 L2-19 L3-7 citations; DropdownMenu-parts runtime error); frame unread views 1440/390 L+D + 768×1024 + 1024×768 + shell 360/430 light; new `A2-FO-X-n` rows; CDP safe-area override | `web/e2e/**` + evidence under `web/e2e/screenshots/f-w14v/` | measured table; row→unit map |
| 10 | `.au1` | safe area / mobile shell: L2-1 L2-2ˢ L2-3 L2-4 L2-5 L2-16 L3-6ˢ L2-17 | `web/src/**` `web/e2e/**` | falsifier ×2 (CDP insets) |
| 11 | `.au2` | workspace /w /v: L2-8 (BROKEN) L2-15 L2-19 L3-5ˢ L3-7ˢ L1-7 L1-8 L1-11 L1-16ˢ L1-23; cite L1-26 L3-8..L3-11 | `web/src/**` `web/e2e/**` | falsifier ×2 |
| 12 | `.au3` | equation + morph: L1-5 L1-6 L1-12 L1-13; cite L1-15 L1-20 L3-15; easing pickers → O-74a E-3 ADOPT-AT-LANDING | `web/src/**` `web/e2e/**` | falsifier ×2 |
| 13 | `.au4` | gallery + admin: L1-9 L1-10 L1-27ˢ L2-9 L2-10 L2-11 L3-1ˢ L3-2 L3-3 L3-4; cite L3-12 L3-13; AdminFlaggedPanel cross-cite value X-W12U `.k` | `web/src/**` `web/e2e/**` | falsifier ×2 |
| 14 | `.au5` | paper: L1-1 L1-2ˢ L1-4ˢ L1-18ˢ L1-19; cite L1-3 | `web/src/**` `web/e2e/**` | falsifier ×2 |
| 15 | `.au6` | cross-app / lib / shell: L1-14ˢ L1-17 L1-21 L1-22 L1-24 L1-25 L1-28ˢ; one search-with-glyph consumer component (the 4 sites); useSafeStorage cross-cite; L2-18ˢ + L3-14 HELD (O-74a E-2) | `web/src/**` `web/e2e/**` | falsifier ×2; vue-tsc 0; vitest GREEN |

ˢ = consumer half (the glass half rides O-74/O-75 and is ADOPT-AT-LANDING).

## Unit receipts

### F.W14V.s2

SERVED MODEL: claude-opus-5-5 · 2026-09-25 · verify-only (addendum (b), COHESION §0dd/§0dh). Writable: `web/e2e/**`.

**Acts, in order**
1. Crash-recovery: ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only; nothing inherited in `web/e2e/**`.
2. Addendum (b) anchors at fourier `7ee9b65`:
   - ⟨`git merge-base --is-ancestor 239845f HEAD`⟩ → IN_HEAD.
   - ⟨`grep '"@mkbabb/glass-ui"' web/package.json`⟩ → `"10.1.0"` exact; installed `node_modules/@mkbabb/glass-ui/package.json` `"version": "10.1.0"`.
   - Anchor drift, recorded: the view is `web/src/components/visualization/VisualizationView.vue` (not `src/views/`). ⟨`grep -n 'layout="detached"'`⟩ → `:361` `<Configurator scroll-mode="auto" layout="detached" class="viz-configurator glass-opaque" …>`.
   - No `.s` Card wrap: ⟨`grep -n 'Card' VisualizationView.vue`⟩ → only `NotFoundCard` (`:15 :376 :391`) and comments `:489 :674` that name the deleted wrap. There is no `<Card` in the aside.
3. <lg sheet form: ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-s.spec.ts -g "G-s" --project=chromium --headed --workers=1`⟩ ×2 → `6 passed (13.6s)` ×2. That covers the 390 sheet (plain column, no card, no shadow, inside the viewport and the shell) in light and dark, plus the detached aside card at 1440/1024. **GREEN ×2.**
4. `glass-opaque` on `.viz-configurator` (`:361`, rule notes `:347-360`): its `--glass-level: 0` is inherited by glass's two detached cards. The shell itself paints nothing. Measured from the run: `getComputedStyle(.viz-configurator).backgroundColor` = `rgba(0, 0, 0, 0)` and the `[data-slot="configurator"]` grid = `rgba(0, 0, 0, 0)` at all four viewport/scheme cells. **No band.** No consumer rule paints the shell: the `:579-662` rules set only margin, aside bands and flex, and `display:none` on the inactive mobile stage.
5. Instrument edit (this unit's one commit, fourier **`b7531e7`**, `web/e2e/f-w14v-detached.spec.ts` +16/−0): the `da` test now also publishes its measured medians, the shell's computed paint and the O-77 clipped-label list, as a `test.info()` annotation and a console line. These are readings only. No assertion or threshold changed. It was added so the table below is read from the run, not transcribed.
6. Falsifier ×2 at `b7531e7` bytes: ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-detached.spec.ts --project=chromium --headed --workers=1 --reporter=line`⟩ → run 1 `5 passed (21.1s)` exit 0; run 2 `5 passed (21.1s)` exit 0. The two runs before the O-77 reading was added gave `5 passed (21.1s)` / `5 passed (20.6s)`, with identical medians.

**Gutter table** (area medians, sRGB; ground = the page margin left of the Configurator). Identical in all 4 runs:

| viewport | scheme | layout | gap px | gutter | ground | Δ (gutter−ground) | spread | chroma g/ground |
|---|---|---|---|---|---|---|---|---|
| 1440×900 | light | beside | 13.0 | 217,216,215 | 228,227,225 | −11,−11,−10 | 1 | 2/3 |
| 1024×768 | light | below | 13.0 | 214,213,211 | 229,229,227 | −15,−16,−16 | 1 | 3/2 |
| 1440×900 | dark | beside | 13.0 | 31,30,29 | 25,24,22 | +6,+6,+7 | 1 | 2/3 |
| 1024×768 | dark | below | 13.0 | 32,31,30 | 24,23,22 | +8,+8,+8 | 0 | 2/2 |

Reading: the gutter is the page ground, shifted by a neutral shade. Light is darker because of the two cards' casts. Dark is lighter because of the dark-scheme lift. The channel spread is ≤1 (oracle ≤4), and the gutter is no more tinted than the ground. The owner-frame plate read `242,232,219` over `227,227,225` (light) and `66,49,37` over `25,24,23` (dark), which is a warm tint with a spread of 23 or more. That plate is absent. At 1024×768 the shell's own margins put the Configurator under its lg band, so the pane stacks **below** the stage. The measured gutter there is the vertical seam, as the falsifier specifies.

**O-77 LAYER-HEADER-LABEL: honest-RED, recorded, no override.** Measured from the run (leaf text in `.configurator-layer-trigger` with `scrollWidth > clientWidth`):
- 1440×900, light and dark: `Decomposition(184>175)` and `basis & resolution(119>113)`, clipped ×2.
- 1024×768 (stacked, full-width aside): `none`.

The glass half is asked at O-77 (§0dh). No consumer width, label or font override was made. The aside band stays `:614-623` as `.s` set it.

**Gates, BEFORE → AFTER**
- `f-w14v-detached.spec.ts` (headed chromium, :3100): 5/5 ×2 (baseline, the `239845f` early cure) → **5/5 GREEN ×2** at `b7531e7`.
- Gutter px table, 1440×900 + 1024×768, light + dark: gutter = page ground → **GREEN**, table above.
- <lg sheet form (`f-w14u-s.spec.ts` G-s, 390 L+D): → **GREEN ×2** (6/6).
- O-77 LAYER-HEADER-LABEL: → **honest-RED recorded** (measured above; glass-owned).

**Commits:** fourier `b7531e7` (e2e reading). **Adjacent edits:** none. **Inherited paths:** none. **Residuals:** O-77 (glass). **Escalations:** none. The CONFIGURATOR-DETACHED and CONFIGURATOR-HEADER-ACTIONS cures (`239845f`) were verified and not redone.

### F.W14V.u1

SERVED MODEL: claude-opus-5-5 · 2026-09-25 · stage/dock rows (addendum (c); F-W14U.md addendum (h) `.vdock` E-1..E-4, `.vedit` E-2). Writable: `web/src/**`, `web/e2e/**`.

**Acts, in order**
1. Crash-recovery: ⟨`git -C fourier-analysis status --porcelain | grep web/(src|e2e)/`⟩ → nothing; no inherited paths.
2. Anchors at the bytes (HEAD `b7531e7`). E-2's stage is `VisualizationView.vue:393-481` (was `:306-376`; drifted by the `.s2`/`.vstage` comments, intent kept). `FullscreenViewer.vue:115-130` mounted a second `ContourEditorCanvas` (no ref, no listeners) and a second `BasisCanvas`, a second `AnimationControls` and a free `Button.fs-close`. `CanvasControlsDock.vue:79-106` = the View options `Popover` (two unlabelled `DockControl`s); the editor's view rows sat in More editor tools (`EditorControlsDock.vue:205-219`, `dd123a9`). The view defaults: `useViewState.ts` ghost `true`, overlay `false`. The server persists `easing: str = "sine"` (`api/models/shared.py:69`), read for F-81 below.
3. Falsifier authored first: `web/e2e/f-w14v-u1.spec.ts`, 7 cases (u14 and u93 at 1440 and 390; u182, u79 and u173 at 1440). Frames go to `web/e2e/screenshots/f-w14v/u1/{before,after}-*.png` (gitignored).
4. **RED ×2 on the pre-cure bytes** (`:3100` against `:8000`). ⟨`FW14V_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-u1.spec.ts --project=chromium --headed --workers=3`⟩ gave **7 failed** in both runs, with the same limbs each time:
   - u93: "one BasisCanvas in the document": received **2**.
   - u14: the census `toEqual` failed on 3 keys (two canvases, two editors, one `.fs-close`).
   - u182: the ⋮ menu's Export count was 1, not 0.
   - u79: `menu` was not found (the old control was a popover).
   - u173: "no mark at the default view": received **2**.

   These ran against the first draft of the spec. The committed spec differs only in the steps after each first failing assertion (u14's edit step, u173's dismissal); the RED limbs above are the same bytes.
5. Cures (fourier `64a1865`):
   - `FullscreenViewer.vue`: the takeover is now only the chassis (the Dialog, its title, its description) plus an empty `.fs-stage-host`. Both canvases, the second `AnimationControls`, the `.fs-close` Button and their styles are deleted.
   - `VisualizationView.vue`: `<Teleport v-else :to="fsHost" :disabled="!stageInTakeover">` wraps the ONE stage. Opening fullscreen moves the stage into the takeover and closing moves it back. Nothing is remounted.
   - `CanvasControlsDock.vue`: the Fullscreen control becomes `Exit fullscreen` (Minimize glyph, tooltip) while the stage is in the takeover, through `v-model:is-fullscreen`. It gains `Export frame`, which emits `exportFrame` → `handleExportFrame` → the export dialog. It mounts `ViewLayersMenu side="bottom"`. The collapsed-face mark is glass `StatusDot`, shown only when `isViewOffDefault`.
   - `AnimationControls.vue`: the ⋮ menu's Export item and its `exportFrame` emit are deleted (F-182).
   - `ViewLayersMenu.vue` (new): glass `DropdownMenu` + `DockTrigger for="dropdown"` ("View options") + a `DropdownMenuLabel` "View layers" + two `DropdownMenuCheckboxItem`s (Image overlay, Contour trace), which toggle without closing. It shows a `StatusDot` mark only off-default.
   - `EditorControlsDock.vue`: mounts `ViewLayersMenu side="top"`; its two More-tools checkbox rows are deleted.
   - `useViewState.ts`: `VIEW_DEFAULTS` and `isViewOffDefault`, one source for the defaults.
6. **Two defects found by measurement and cured at their cause, not masked:**
   - **(a) `hideOthers` ordering.** On the first cure, the takeover's editor dock read as `aria-hidden` (`getByRole("button",{name:"Save contour"})` → 0 inside the dialog).
     - Cause (instrumented `setAttribute`/`insertBefore` sequence): reka's `DialogContentModal` `useHideOthers` runs as a queued watcher job before the template-ref handoff (post-flush). `aria-hidden` keeps every `[aria-live]` region's ancestors, so it walked the stage while the stage was still in `#app` and marked `.dock-controls`, `.canvas-container` and others. Those marks rode into the takeover.
     - A `flush: "sync"` watcher on the template ref measured no change.
     - Cure: the host is handed up from its `@vue:before-mount` vnode hook, inside the mounting patch. The parent's teleport job then sorts ahead of the chassis watcher. The measured sequence became `host-mounted → host-insert #text → host-insert DIV → hide …`, and nothing inside the takeover is marked.
   - **(b) The Fullscreen toggle.** `showFullscreen = !showFullscreen` made `fullscreen.spec` fail to open (0 dialogs).
     - The control now sets the state it shows (`update:isFullscreen`, `!isFullscreen`), so it is idempotent.
     - The same spec's remaining RED was glass's morph guard (`dock.js` `onClickCapture`: a press whose pointerdown lands while `data-morphing` is set is swallowed). The dock gained a control, so its expansion morph is longer, and the spec now waits for `expanded` and no `data-morphing` before it clicks (setup only).
7. **GREEN ×2 on the settled bytes (`64a1865`):** ⟨`FW14V_PHASE=after BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-u1.spec.ts --project=chromium --headed --workers=3`⟩ → run 1 `7 passed (23.1s)`, run 2 `7 passed (22.5s)`.
   - u14 census `toEqual({canvases:1, canvasesInTakeover:1, editors:1, editorsInTakeover:1, freeExit:0})` passed at 1440 and at 390.
   - A point deleted by key in the takeover leaves Undo enabled on the page after Exit.
   - u93 re-opens the takeover (a new host), and it holds the same one canvas.
8. **Neighbours (non-regression), final bytes.** ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-d.spec.ts e2e/f-w14u-vdock.spec.ts e2e/f-w14u-vedit.spec.ts e2e/fullscreen.spec.ts e2e/f-w14-uia.spec.ts e2e/visualization-ux.spec.ts e2e/visualization-crud.spec.ts e2e/gallery.spec.ts e2e/f-w14v-detached.spec.ts --project=chromium --headed --workers=1`⟩ → `87 passed · 2 failed · 3 skipped`:
   - (i) `visualization-ux :150`, the ExportModal keystone: the same morph-guard press. It is cured in the same commit (wait for `expanded` then no `data-morphing`), then re-read ⟨`… -g ExportModal --repeat-each=4`⟩ → `4 passed`, and crud's ExportModal keystones ⟨`-g ExportModal`⟩ → `3 passed`.
   - (ii) `f-w14u-vedit :198` v88: **ESCALATED**, see ESC-u1-2.
   - `fullscreen.spec` alone ×2 → `1 passed` ×2. `f-w14-uia :162` (F-17) is GREEN at `--workers=1` (it went RED under `--workers=3` once, the standing load-sensitive case R-3 of F.W14U).
9. `vue-tsc --noEmit` ×2 → exit 0, 0 `error TS` ×2. `vitest run` ×2 → `Test Files 14 passed (14) · Tests 86 passed (86)` ×2.

**Adjacent edits (§0bt; each restates an oracle for a control this unit moved or renamed; no assertion deleted):**
- `e2e/f-w14u-d.spec.ts:30,37,60-80,134-136`: the ruled d2 setup. `loadCollapsed` takes a setup step, and `traceOff` switches the trace off through the View options menu, dismisses by pointer and waits until the dock's box holds still (its collapse after an expansion settles in stages). The d2 assertion is unchanged.
- `e2e/f-w14u-vdock.spec.ts`:
  - `:111-113` v9's Export limb is inverted: the ⋮ menu holds no Export. This is the e171 precedent, the F-9 interim's Export limb superseded by F-182.
  - `:146-156` v76 reads the `menuitemcheckbox` row and its popper wrapper; its geometry assertions are unchanged.
  - `:256-258` `openExport` uses the canvas dock's Export.
  - `:362` v174 uses `menuitemcheckbox`.
- `e2e/f-w14-uia.spec.ts`:
  - `:184-188`: the F-17 export path goes through the canvas dock's Export.
  - `:670-693`: F-12's keyboard reach, restated for the menu. Enter opens the menu, the arrow keys reach both rows, and Enter toggles `aria-checked`.
- `e2e/f-w14u-vedit.spec.ts:106-108`: `traceControl` opens the editor dock's View options.
- `e2e/fullscreen.spec.ts:54-58,86-88`: the spec waits for the dock to settle before Fullscreen, and Exit is the hosted dock's control.
- `e2e/visualization-ux.spec.ts:153-161` and `e2e/visualization-crud.spec.ts:662-669`: the ExportModal keystones open Export from the canvas dock. Crud's now-dead `openMoreOptions` helper (`:183-202`) is deleted.

**Rows**

| Row | Disposition | Evidence |
|---|---|---|
| **F-14** (BROKEN) | **CURED**. The one live stage is teleported into the takeover, with the editor's ref, listeners and dock, and an edit survives exit. | u14 1440+390: RED ×2 (census 2/2/1) → GREEN ×2 (1/1/1/1/0) |
| F-93 | **CURED**. The canvas dock is hosted in the takeover, and its Fullscreen control is the Exit. The dead plumbing was already gone (F.W14U). | u93 1440+390 RED ×2 → GREEN ×2 |
| F-182 | **CURED**. Export frame is on the canvas dock and always opens the dialog, inline and in fullscreen. The labels limb was cured at F.W14U. | u182 RED ×2 → GREEN ×2 |
| F-244 | **CURED**. There is no free-floating Exit: Exit is the dock control, with its tooltip. The description was added at F.W14U. The register's "correct the comment after F-13" limb waits on F-13 (glass O-78, 10.2.0). | u14/u93 `freeExit 0` ×2 |
| F-79 | **CURED at ≥ sm**. One `ViewLayersMenu`, with the same rows and order, is mounted by both docks. The editor mount at 390 is ESCALATED (ESC-u1-2). | u79 RED ×2 → GREEN ×2 |
| F-77ˢ | **CURED** (consumer). A menu of labelled CheckboxItems replaces the 336×118 icon plate. Glass's content-fit popover arm (O-59) is no longer consumed here. | u79 |
| F-173 | **CURED**. The mark shows only off-default, as glass `StatusDot`, on View options and on the collapsed face. d2's setup was changed as ruled, and its assertion is unchanged. | u173 RED ×2 → GREEN ×2; d2 3/3 |
| F-177 | **honest-RED O-82 POPOVER-ANCHOR** (glass). No hand-rolled positioning. ⟨`cat node_modules/@mkbabb/glass-ui/dist/components/popover/index.d.ts`⟩ → `Popover`, `PopoverTrigger`, `PopoverContent` only (10.1.0). The panel's own limbs were cured at F.W14U. | — |
| F-81 (+F-9 final form) | **ESCALATED (ESC-u1-1)**. F-9 stays CURED by its interim (banked, v9). | — |

**Escalations**
- **ESC-u1-1, F-81 (the shared animation pane, the phase Timeline with transport, one easing catalogue and one picker).** Measured at the bytes:
  - (1) **Unifying the catalogues is a persisted-data change.** The animation store's six keys (`sine`, `quad`…, `lib/easings.ts:202`) are saved in every visualization (`api/models/shared.py:69` `easing: str = "sine"`) and in `localStorage`. The morph catalogue uses other names (`ease-in-out-sine`…, `:186`). "One catalogue" therefore needs a migration or alias ruling for stored documents. That is a server limb, and addendum (h) grants `api/**` only for F-201/F-253.
  - (2) **Glass's `Timeline` (10.1.0) has no transport.** It exposes `segments`, `current`, `select` and `hover`. "Segments on one glass Timeline with transport" therefore needs either a consumer-built transport, which is a one-off against the owner's "NO one-off instances", or a glass limb.
  - (3) The pane spans /morph, whose easing pickers AUDIT-2 already routes to O-74a E-3 (ADOPT-AT-LANDING) under `.au3`.
  - **Ask:** re-home F-81 into `.au3` with O-74a E-3, and rule the easing-name migration (alias the six stored keys into the one catalogue, or migrate server-side). Nothing was substituted.
- **ESC-u1-2, F-79's editor-dock mount at 390 against UIA-F-88's committed oracle.** Measured (⟨probe, `/v/<seed>` 390×844, editor dock expanded⟩):
  - The dock is 340 px. The persistent Metric and Save take 113 px, which leaves the row 197 px.
  - Undo, Redo, the separator, Delete, View options and More editor tools need 243 px.
  - More editor tools lands at x 359–399, past the plate's right edge at 365. `f-w14u-vedit :198` v88 → `out ["More editor tools"]`, RED at `--workers=1`.
  - Glass 10.1.0 has no dock overflow idiom (GlassDock has no size or overflow prop; DockControl `compact` only auto-sizes an icon, and coarse pointers clamp to 44 px).
  - Every consumer fit that would satisfy v88 moves or drops one of its three named controls or the point count. Each of those is a design choice this seat may not improvise.
  - **Ask:** rule what yields at < sm: (a) a glass dock overflow seat (a new O-row), (b) Delete into More tools at < sm, restating v88, or (c) the one menu reached from the canvas dock alone in edit mode at < sm, amending the lock.

**Residuals**
- (R-1) **UIA-F-13 (glass, O-78, fixed in 10.2.0, not yet published: ⟨`npm view @mkbabb/glass-ui versions`⟩ tops at `10.1.0`).** Menus opened inside the takeover (View options, More editor tools) render under the dialog. Measured: the u14 draft's `menuitem Smooth contour` click was intercepted by `svg.editor-svg` inside the dialog. So F-93's in-takeover menus become usable at the 10.2.0 repin (ADOPT-AT-LANDING), and u14 edits by key rather than through a menu.
- (R-2) Glass dock posture after a keyboard-dismissed dock menu: an Escape hands focus back to the trigger, and the dock stays expanded while it holds focus. That is glass's design. The setups dismiss by pointer.
- (R-3) A pre-existing Vue warning (`Component inside <Transition> renders non-element root node`) comes from `CoefficientsSpectrum`'s TransitionGroup of Tooltips. It fires on load, before any u1 surface, and is not this unit's.

**Gates, BEFORE → AFTER**
- `f-w14v-u1` falsifier: 7/7 RED ×2 → **7/7 GREEN ×2**.
- The fullscreen DOM holds exactly one BasisCanvas and one ContourEditorCanvas (u14/u93 census): 2/2 → **1/1 ×2**.
- `vue-tsc`: 0 → **0 ×2**. `vitest`: 86/86 → **86/86 ×2**.
- Neighbours: 87 passed. v88 is ESCALATED (ESC-u1-2); the ux ExportModal case was cured and re-read ×4.

**Commits:** fourier `2016861` (the falsifier), `64a1865` (the cure plus the adjacent restatements), pushed (`7ee9b65..64a1865` on `m/w1-bump-migration`). **Inherited paths:** none. **Status:** PARTIAL (ESC-u1-1, ESC-u1-2).

### F.W14V.u2

SERVED MODEL: claude-opus-5-5 · 2026-09-25 · equation rows (addendum (c); F-W14U.md addendum (h) `.vedit` E-1, `.eq` E-2/E-3/E-4; §0da, §0dp). Writable: `web/src/**`, `web/e2e/**`, `api/**` (server limbs).

**Acts, in order**
1. Crash-recovery: ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only. No inherited paths. fourier HEAD `64a1865`.
2. Anchors at the bytes. `lib/equation/notation.ts:14-17` → the three hsl literals, as the register says (no drift). The Σ bound: `render_trig_sigma` and its siblings take N = the largest `|n|` of the terms passed. `api/routers/equations.py:127` passed every computed term, so the bound was the requested `n_harmonics`.
   - **Measured root cause of "Conjectured" (INTENT at the bytes):** ⟨`curl :8000/api/equations/compute` for `x*(pi-x)`, `x`, `x**2`⟩ → all three returned `identified`. ⟨`symbolic_fourier_coefficients` called in the main thread vs. a `threading.Thread`⟩ → main: terms; thread: `ValueError('signal only works in main thread of the main interpreter')` → `None`.
   - `integration._timeout` arms `SIGALRM`, and `submit_compute_job` runs the job via `asyncio.to_thread`. So the symbolic tier was dead in the API for every expression. The tier label (`notation.ts:55-60`) is honest; the tier assignment was not.
   - The expanded hover hooks: the cure site is `src/fourier_analysis/symbolic/latex_rendering.py` (outside `api/**`, same repo, same concern). That is the **adjacent edit** below.
3. Falsifiers authored first:
   - `api/tests/test_w14v_u2_equation_server.py`: 11 cases. 10 are falsifiers; 1 is the no-Auto control.
   - `web/e2e/f-w14v-u2.spec.ts`: 5 cases:
     - e85 light and dark: the ink is `var(--viz|section-color-…)`, the hue is within 30° of the authored 6/224/286, and the glyph is `.katex` with no U+2070–209F;
     - e201: Σ bound = the Harmonics field = the legend, under Auto and with Auto off;
     - e253 expanded hover opens `.coeff-popover`;
     - e253 the tier is "Exact".
4. **RED ×2 on the pre-cure bytes.**
   - ⟨`MONGO_TEST_URI=mongodb://127.0.0.1:27018 uv run pytest api/tests/test_w14v_u2_equation_server.py -q`⟩ ×2 → **10 failed, 1 passed** ×2 (the control passes).
   - ⟨`FW14V_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-u2.spec.ts --project=chromium --headed --workers=3`⟩ ×2 → **5 failed** ×2. The limbs were: Trig ink `"hsl(6, 72%, 49%)"` (light and dark); Σ bound `Expected: 8 Received: 20`; expanded `.eq-coeff` not found; the badge read `"Conjectured100.0% energy…"`.
   - A first background run was discarded because it was contaminated: `notation.ts` had been edited while vite served the tree. The file was restored to HEAD bytes for the two counted runs.
5. Cures.
   - **Server** (fourier `cc08ffd`):
     - `api/services/equation_series.py` (new): `compute_series` is module-level, and `ExpressionInvalid` and `parse_function_of_x` moved there from the router. It adds `displayed_n` (min(Parseval effective N, computed N) under `auto_harmonics`, else computed N) and `render_sigma` (Σ over `|n| ≤ shown`).
     - `api/services/computation.py`: `submit_process_job` runs on a `spawn` `ProcessPoolExecutor`, with the same semaphore, the same timeout and the same 429/504. Each task runs on a worker process's main thread, so the symbolic tier's `SIGALRM` timer is live. `shutdown_process_pool` is wired into the `api/main.py` lifespan.
     - `api/routers/equations.py`: `/compute` runs `compute_series` in the process pool. `/simplify` now answers `latex_sigma` at the displayed N.
     - `api/models/equations.py`: `auto_harmonics: bool = False` on both requests (additive; the default keeps the old contract), and `latex_sigma` on `SimplifyResponse`.
   - **Web** (fourier `ce002d8`):
     - `notation.ts`: Trig → `var(--viz-fourier)`, Exp → `var(--section-color-2)`, Polar → `var(--section-color-7)`. These are the one palette's `light-dark()` tokens, with the hues kept per §0da (measured within 30° in both themes). `icon` → `glyph` (TeX).
     - `NotationPills.vue` renders the glyph through `renderLatex(…, { displayMode: false })`.
     - `EquationView.vue`: the request carries `auto_harmonics`, and `displayKey` and the re-render watch include Auto. `doSimplify` writes `displayLatexSigma` and `result.latex_sigma` from the answer.
     - `api.ts` / `types.ts`: the contract fields.
     - `render.ts` `plainLatex`: the hook body may now nest braces two deep (expanded terms hook whole: `\frac{\pi}{2}\cos(2t)`).
     - `render.test.ts` (new) and `notation.test.ts`: the unit floor.
   - **F-203:** honest-RED **O-82 POPOVER-ANCHOR** (glass 10.x exports no virtual anchor). No hand-rolled positioning was built, and there is no case for it.
6. **Instrument (recorded, not smoothed):** the dev API on `:8000` (pid 2546, no `--reload`) was restarted to serve the server bytes.
   - The first two restarts lacked the harness env, and their runs are discarded: `BLOB_DIR` → seed 500 on read-only `/data`, then `COMPUTE_RATE_LIMIT` → 429s.
   - It now runs as `scripts/e2e.sh` prescribes: `.env` sourced; `COMPUTE_RATE_LIMIT=1000`, `WRITE_RATE_LIMIT=1000`, `BLOB_DIR=~/.mongo-dev/fourier-blobs` (§0cv), `MONGO_URI=mongodb://localhost:27018/fourier`, `ADMIN_TOKEN=${ADMIN_TOKEN:-dev}`. ⟨`POST :8000/api/sessions`⟩ → 200.
7. **GREEN ×2 on the settled bytes.**
   - ⟨`FW14V_PHASE=after BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-u2.spec.ts --project=chromium --headed --workers=3`⟩ ×2 → **5 passed** · **5 passed**.
   - ⟨`MONGO_TEST_URI=mongodb://127.0.0.1:27018 uv run pytest api/tests -q`⟩ ×2 → **286 passed** · **286 passed** (baseline 275, plus 11 new; `test_owner_required` included).
   - ⟨`npx vitest run`⟩ → `Test Files 15 passed (15) · Tests 90 passed (90)` (baseline 86/86 + 4 new). ⟨`npx vue-tsc --noEmit; echo $?`⟩ → **0**.
   - Frames: `web/e2e/screenshots/f-w14v/u2/after-*.png` (6, gitignored). Dark 1440: Σ bound 8 = N 8, and the KaTeX glyphs are on the math baseline.
8. **Neighbours.** ⟨`playwright test e2e/f-w14u-eq.spec.ts e2e/equation-interaction.spec.ts e2e/f-w14u-vedit.spec.ts --workers=3`⟩ ×2 → 25 passed · 2 failed ×2:
   - `f-w14u-vedit :198` v88 is the standing **ESC-u1-2** (not this unit's).
   - q35 read `0.062`, because a₄ = −1/16 is now exact (the symbolic tier) and formats to 2 significant digits as `0.062` (it was spline `0.063`). Its string was widened under §0bt (below). ⟨`-g q35 --workers=1`⟩ ×2 → **1 passed** ×2.
   - ⟨`f-w14-uia.spec.ts visualization-ux.spec.ts -g "UIA-F-3|equation|Equation|notation|Notation"`⟩ → **10 passed**.

**Adjacent edits (§0bt)**
- `src/fourier_analysis/symbolic/latex_rendering.py:32-41,68,71,115,144,149`: `_hooked` wraps each expanded term in the Σ renderers' own `\htmlClass{eq-coeff eq-<an|bn|cn|An>}`, with the sign outside so KaTeX keeps the binary spacing. This is the F-253 hover cure's only site (outside `api/**`, same repo, same concern). `render.ts`'s trust set is unchanged (same classes).
- `api/tests/test_uia_server_rows.py:47-53`: `_coefficient_of` reads through the hook before matching. The F-35 assertion is unchanged.
- `web/e2e/f-w14u-eq.spec.ts:82`: `/0\.06(25|3)\b/` → `/0\.06(25|2|3)\b/`. This is the string the oracle asserts for copy this unit changed (the exact tier's `0.062`). The `not 0.031` assertion is unchanged.

**Row dispositions (5 ids).** Tally ⟨count of the table's rows⟩ → 5.

| row | disposition | falsifier |
|---|---|---|
| F-85 (consumer; ToggleGroup limb already CURED by F-204 `fcc5617`) | **CURED**: glyph and ink on tokens and KaTeX | e85 light/dark RED ×2 → GREEN ×2 |
| F-241 (glyph + ink limbs; the cap limb is `.srv`'s) | **CURED** | e85 + `notation.test.ts` |
| F-201 (server limb: the Σ bound) | **CURED**: Σ = the displayed N under Auto and off it | e201 RED ×2 (20 vs 8) → GREEN ×2; api `test_f201_*` RED ×2 → GREEN ×2 |
| F-253 (server limbs: expanded hover; "Conjectured" polynomial) | **CURED**: hooks in the expanded form; the symbolic tier runs in a worker process, so x(π−x), x and x² are Exact | e253 ×2 RED ×2 → GREEN ×2; api `test_f253_*` RED ×2 → GREEN ×2 |
| F-203 (primitive limb) | **honest-RED O-82 POPOVER-ANCHOR**. The plate and radius limb stays CURED (`fcc5617` q203) | none (producer) |

**Gates, BEFORE → AFTER:**
- per-row falsifier: RED (api 10/11 failed ×2; e2e 5/5 failed ×2) → **GREEN ×2** (11/11 · 5/5).
- api pytest: 275 → **286 ×2**.
- vue-tsc: 0 → **0**.
- vitest: 86/86 → **90/90**.

**Residuals.**
- (R-1) `/equation` still recomputes on a notation change (notation stays in `computeKey`). `/simplify` now carries `latex_sigma`, so it *could* be a re-render. That is left as is: it was not asked, and there is no defect.
- (R-2) A pathological expression can still hold a pool worker until the outer `compute_timeout_s`. That is unchanged from the thread path; the per-coefficient 5 s alarm now actually fires.
- (R-3) The Trig glyph `\sin` inherits the item's ink and reads near-foreground on the pressed chip; the label carries the hue. This matches the pre-cure recipe (`.notation-item[data-state=on]`).

**Commits:** fourier `f980230` (falsifiers) · `cc08ffd` (server limbs + 2 adjacent) · `ce002d8` (web + 1 adjacent), pushed (`64a1865..ce002d8` on `m/w1-bump-migration`, ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `ce002d86d365`). **Inherited paths:** none. **Escalations:** none. **Status: DONE** (F-203 honest-RED O-82, as ruled).

### F.W14V.u3

SERVED MODEL: claude-opus-5-5 · 2026-09-25 · shell/admin rows (addendum (c); F-W14U.md addendum (h) `.vstage` E-2 F-183 control-state half, the F-149 LOCK, Close-2 LW-1/LW-2/LW-3; §0dp). Writable: `web/src/**`, `web/e2e/**`.

**Acts, in order**
1. Crash-recovery: ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only. No inherited paths. fourier HEAD `ce002d8`.
2. Anchors at the bytes (INTENT recorded where drifted):
   - F-183 raw slug: `stores/gallery.ts:373` `toast(\`Published ${slug}\`, …, { action: View })` (the register's `:326` drifted; the View seat is `.shell`'s `b744993`, present). Duplicates: `VisualizationView.vue:231-245` `handlePublish` → `workspace.saveVisualization` POSTs a new draft on every press, then PATCH → public. The control: `CanvasControlsDock.vue:87-92` (`Upload` glyph, no published state; the register's `:92`/`:102-105` drifted). `VisualizationUpdate` (`api/models/visualization.py:198`) patches visibility/title/tags only, so an "Update" of content is not a server verb: the cure keys the published state on the body the piece was published from.
   - F-149: `GalleryAdminBanner.vue:87` `<section class="admin-banner … rounded-lg border-[1.5px]">` (10 px) around six `Metric posture="cell"` (glass `components/metric/styles.css`: `border-radius: var(--radius-card)` = 16 px). Record's analysis (F-W14U record `:1113`): banner → glass Card, one golden re-cut.
   - LW: vc `:145 :164 :199`, radius `:105`, `playwright.config.ts:92-101` `webServer` (:4190) all at the named lines.
3. Baseline (before any edit) ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/visual-checkpoint.spec.ts e2e/f-w13-radius.spec.ts --project=chromium --project=mobile-chromium --workers=1`⟩ → `3 failed · 6 passed`: vc `:145 :164 :199`[mobile-chromium] and radius `:56 :83 :105` **GREEN** (LW-1/LW-2 hold at `ce002d8`, no drift); the 3 RED are vc `:81 :102 :123` (not this unit's; see R-1).
4. Falsifier authored first: `web/e2e/f-w14v-u3.spec.ts` (2 cases). e183: one POST + one PATCH; toast "Published to the gallery", no slug text, a View action; the control then reads `Published…` and "Publish to Gallery" is gone; pressing it routes to `/v/<slug>` with posts = 1, patches = 1. e149: the banner has `.card`, its radius = `--radius-card`, 6 cells each ≤ the banner radius.
5. **RED ×2 on the pre-cure bytes** ⟨`FW14V_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-u3.spec.ts --project=chromium --workers=2`⟩ ×2 → **2 failed** ×2: e183 `getByText('Published to the gallery')` not found (the toast read `Published <slug>`); e149 `the banner is a glass Card: Expected true, Received false`.
6. Cures.
   - **F-183** (fourier `c5a88bc`): `stores/workspace.ts` factors `visualizationBody()` (the create body, no visibility; `saveVisualization` spreads it) and records `published = { slug, body }` via `markPublished`; `publishedSlug` is the slug while the working session's body still equals the published one, else null (`reset()` clears it). `stores/gallery.ts` `publish` returns `boolean`, its toast reads `Published “<title>”` or "Published to the gallery" (never the slug) with the View action, and the refetch sits outside the error channel. `VisualizationView.vue` `handlePublish`: a published session routes to `/v/<publishedSlug>` (no POST); a landed publish calls `markPublished`; `:published` passed to the dock. `CanvasControlsDock.vue`: `published` → `GlobeCheck` "Published — open it"; else `Globe` "Publish to Gallery" (the `Upload` glyph retired, the register's distinct-glyph limb).
   - **F-149** (fourier `59cf617`): `GalleryAdminBanner.vue` root is glass `Card as="section" size="sm"` (the `rounded-lg` dropped; `--radius-card` is Card's), `root` ref reads `$el` for F-192's focus neighbour. The amber register (`.admin-banner`, the consumer's own class) is unchanged.
   - **vc `:145` re-baseline (the F-149 LOCK grant, diff read first):** ⟨post-cure run⟩ → `457 pixels (ratio 0.01)`; the diff PNG shows exactly the four corners (10 → 16 px) and the "Admin Mode" label ink (now Card's `--card-foreground`). That is the granted change, so the golden is re-cut once ⟨`npx playwright test e2e/visual-checkpoint.spec.ts:145 --project=chromium --update-snapshots`⟩ → `1 passed`, committed with the cure.
7. **GREEN ×2 on the settled bytes** (`c5a88bc`):
   - ⟨`FW14V_PHASE=after … e2e/f-w14v-u3.spec.ts --project=chromium --workers=1`⟩ ×2 → **2 passed** · **2 passed**.
   - ⟨`… e2e/visual-checkpoint.spec.ts:145 :164 :199 e2e/f-w13-radius.spec.ts:105 --project=chromium --project=mobile-chromium --workers=1`⟩ ×2 → **4 passed** · **4 passed** (`:199` runs in mobile-chromium, `@coarse`).
   - **LW-3:** the `:4190` listener found at open was an orphaned `vite preview` (pid 38086, parent `npm exec`, started 01:31, the `webServer` command left by a killed run, serving a stale `dist/e2e-preview`). It was stopped so the suite's own `webServer` built and served the current bytes. ⟨`… e2e/f-w14u-misc.spec.ts:118 :380 :401 --project=chromium --workers=1`⟩ ×2 → **5 passed** · **5 passed**; ⟨`lsof -iTCP:4190 -sTCP:LISTEN | wc -l`⟩ after each run → `0` (Playwright started and stopped it: managed).
   - Neighbour regression ⟨`… visual-checkpoint f-w13-radius f-w14u-admin f-w14u-shell f-w14u-gallery f-w14u-vstage f-w14-uia --project=chromium --project=mobile-chromium --workers=3`⟩ (before the re-cut) → `4 failed · 132 passed`: vc `:145` (the re-cut above) and vc `:81 :102 :123` (R-1); every family case GREEN, including f-w14-uia UIA-F-18 on its adjusted copy.
   - ⟨`npx vue-tsc --noEmit; echo $?`⟩ → `0`, 0 `error TS`. ⟨`npx vitest run`⟩ → `Test Files 15 passed (15)` · `Tests 90 passed (90)`.

**Adjacent edits (§0bt):** `web/e2e/f-w14-uia.spec.ts:310`: UIA-F-18's toast oracle follows the changed copy (`Published ${saved.slug}` → `Published “${saved.title}”`, the stub carries ENTRY's title). The assertion is otherwise unchanged.

**Gate readings BEFORE → AFTER**

| Gate | BEFORE | AFTER |
|---|---|---|
| F-183 falsifier (e183) | RED ×2 | GREEN ×2 |
| F-149 falsifier (e149) | RED ×2 | GREEN ×2 |
| vc `:145 :164 :199`[mobile-chromium] + f-w13-radius `:105` | GREEN (baseline) | GREEN ×2 (`:145` re-cut, diff described) |
| f-w14u-misc `:118 ×2 :380 ×2 :401` via `webServer` | orphan preview on :4190 (stale bundle) | 5/5 ×2, preview started and stopped by Playwright |
| vue-tsc / vitest | 0 / 86 (banked) | 0 / 90 (15 files; u2 added the unit floor) |

**Rows:** F-183 control-state half **CURED** (falsifier ×2). F-149 consumer half **CURED** (×2). The strict concentric law (cell radius = `--radius-ctx` − inset) is glass's half, **O-59**, ADOPT-AT-LANDING: the cells are 16 px in a 16 px Card with a 12 px inset. LW-1/LW-2/LW-3 **VERIFIED** (`a926748` `56e56a3` `0e34595` hold; `:145` re-cut for F-149).

**Residuals**
- (R-1) vc `:81 :102 :123` are RED at the baseline bytes, both runs. Their oracle `getByRole('button', { name: 'Open img-amber-fox-spiral-one' })` names the card by `image_slug`; since `.gallery` `30346dd` (F-99) the card is named by its title ("Open Amber fox spiral", frame read). This is a stale oracle outside this unit's named set (a different concern: `.gallery`'s F-99 adjacent twins). Routed to the wave close / `.au4` (gallery), not cured here.
- (R-2) A published session that navigates to its own `/v/<slug>` keeps the Published control, and pressing it there is a same-route push, so nothing happens. The piece is already open; no copy is made.
- (R-3) Content "Update" in place is not a server verb (`VisualizationUpdate` has no settings fields). An edited session publishes a new piece, as the new content warrants.

**Escalations:** none.

**Commits:** fourier `5c8ce49` (falsifiers) · `59cf617` (F-149 + vc `:145` re-cut) · `c5a88bc` (F-183 + 1 adjacent), pushed (⟨`git ls-remote origin m/w1-bump-migration`⟩ → `c5a88bc79577`).

### F.W14V.u4

SEAT `.u4`, `claude-opus-5-5`, 2026-09-25. Spec `F-W14V.md` read whole (48 L) and `F-W14U.md` addenda (g)(h) (`:71-89`). Record: header through `## Unit plan`, u1–u3 receipts (by grep). The `.vstage` receipt in `C/F-W14U.md` (`:528-600`, E-1/E-3 and the PARTIAL residuals R-1..R-4) and the register rows (`audit/UI-AUDIT-fourier.md` :142 :145 :148 :227 :249 :251 :253 :324 :325). COHESION §0da, §0db, §0dp (grep-located; no later ruling touches these rows).

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only. Nothing inherited in `web/src/**` or `web/e2e/**`.

**Anchors at the true bytes (fourier `c5a88bc`).**
- F-68 / F-168 stage limb: `BasisCanvas.vue:584` `class="canvas-container cartoon-card"`. Probe at 1440 and 390: 1 stamp in the stage, border 2px, radius 16px, the three-layer offset shadow, bg `rgb(253, 245, 236)`. BasisCanvas mounts only in the stage (⟨`grep -rn '<BasisCanvas' src`⟩ → `VisualizationView.vue:418`).
- F-170 legend: `BasisCanvas.vue:228` (epicycles) and `:411` (bases) draw `N = ${level}`. For epicycles, level counts circles, up to `components.length`: measured `N = 401` with Harmonics 200 (2N + 1). For bases, the level runs through `levels`, which are 1…N (`workspace.ts:370`).
- F-74: `VisualizationView.vue:106` `mobileView` defaults to `"controls"`, and nothing flips it on upload (the watcher was withdrawn at `.vstage` act 6).
- F-71: `animate-spin` 0 across `src` (every carried ring site was retired by `.vedit`, `.eq`, `.gallery` and `.admin`). During the first upload at 1440 there were two marks: the drop-target Button's glass dot ring (`[data-slot=dot-ring]`) and the aside's "Uploading the image" Progress (`ImageUpload.vue:125`). DotRing is not exported by glass 10.1.0 (⟨`grep -c DotRing dist/index.d.ts`⟩ → 0). That is F-72 / O-59.
- F-146: on `/v` load the dev guard fired `[Tooltip] … not an HTML element` and `… not focusable`, plus `<Transition> renders non-element root node` (PopperRoot). The sites were `AnimationControls.vue:184` (a Tooltip on the ⋮ SVG), `EditorControlsDock.vue:187`, `ViewLayersMenu.vue:55` (same shape, u1's new file), `AnimationControls.vue:149` (a comment node was the Tooltip slot's first child), `CoefficientsSpectrum.vue:139` (Tooltips as TransitionGroup children, on non-focusable rows) and `:180` (a Tooltip around a `v-if` Button).
- F-172 non-colour limb: the magnet's on-state was the glyph's hue only (`EditorControlsDock.vue:196` `.is-on`). The field read `0`.
- F-238: role=status, the Progress row, ToggleGroup and tab-strip limbs were cured at `.vstage`. The lone reset row was discharged by `.a2` (CONFIGURATOR-HEADER-ACTIONS CURED, `C/F-W14U.md:1001`).
- F-239: `GlassTimeline.vue` (importers `AnimationControls.vue:10` and `ConvergenceTimeline.vue:25`); the caret plate at `:312-322` (its own popover fill, border, shadow and `--radius-sm`). At 390 the expanded canvas dock spans x 27–365, y 137–193, over the legend (canvas x 16, top at page y ~139).

**Acts.**
1. **Falsifier** `web/e2e/f-w14v-u4.spec.ts` has 11 cases: u68 ×{1440,390}, u170, u74, u71 ×{1440,390}, u146, u172, u238, u239, u239b. Canvas text is read through a `fillText` recorder (init script), so the legend is measured as drawn. Frames go under `web/e2e/screenshots/f-w14v/u4/` (gitignored).
2. **RED ×2 on the pre-cure bytes, final spec** (`src/**` at HEAD; my `src` edits were parked as a patch and the files restored by exact path; nothing else moved). ⟨`FW14V_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-u4.spec.ts --project=chromium --workers=3 --reporter=line`⟩ ×2 → **9 failed · 2 passed**, both runs. The 9 are u68 ×2, u170, u74, u71@1440, u146, u172, u239 and u239b. The two that read green before the cure:
   - **u71@390** (at HEAD the sheet was in front, and its bar was the one visible mark).
   - **u238**. An earlier draft of u238 read the aside's upload bar during the sidebar's entrance, RED ×2 (`u4-before-{1,2}`, 10 failed · 1 passed). Once u238 waits for the sidebar to settle before reading, it passes on the pre-cure bytes. F-238's limbs had already landed (`.vstage` + `.a2`), and u238 is its verification.
3. **Cures** (fourier `8e19043`):
   - `BasisCanvas.vue` (F-68 ⊕ F-168): the root drops `cartoon-card`, so the stage cell is the surface. The epicycles legend reads `k of M circles` (F-170), and the bases legend keeps `N = level` because that level is the Harmonics N. The legend's top comes from a stage-set `--legend-inset-top` (F-239), read on every resize.
   - `labels.ts`: `drawBasisLabels(…, top = 16)`.
   - `style.css`: `@property --legend-inset-top` is registered as a `<length>`, so the computed value is px.
   - `VisualizationView.vue` (F-74, re-landed per E-3): the upload watcher shows the canvas after an upload finishes. It also puts the stage in front at the first upload's start (F-71), so the mark the person started stays in view. The stage sets `--legend-inset-top: 16px`, and below 40rem it sets `calc(0.5rem + var(--dock-h) + 1rem)` (glass's dock token).
   - `ImageUpload.vue` (F-71 ⊕ F-238): the aside's bar shows only for a replace upload (`replacing` is read at the upload's start), so the first upload has one mark, glass's dot ring on the stage button.
   - F-146: the Tooltips are gone from the three bare-SVG dropdown triggers (each trigger's `aria-label` names it; wrapping the trigger would overwrite the menu's `data-state`, the `.eq` R-2 finding). The comment is moved out of the play Tooltip's slot. Coefficient rows are `<li>` children of `TransitionGroup tag="ul"`, and each described row takes `tabindex="0"`. "Show more" carries its `v-if` on the Tooltip.
   - `EditorControlsDock.vue` (F-172 non-colour limb): `magnetReadout` makes radius 0 read "Off". The glyph's Fourier hue stays (§0da).
   - F-239: `GlassTimeline.vue` → `FourierTimeline.vue` (both importers updated). The caret is `glass-floating` at `--radius-panel`, the same plate as the convergence plot readout.
4. **GREEN ×2 on the settled bytes** (the committed tree). ⟨`FW14V_PHASE=after BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-u4.spec.ts --project=chromium --workers=2 --reporter=line`⟩ ×2 → **11 passed (28.9s) · 11 passed (28.2s)**. Frames read: `after-u239-dock-expanded-390` shows the legend ("ℱ Epicycles / 10 of 401 circles") under the expanded dock, the stage with no stamp, and the hues intact.
5. **Adjacent edits (§0bt)**, each under F-74's concern:
   - `e2e/f-w14u-s.spec.ts:28-33`, `e2e/f-w14-veil.spec.ts:35-40` and `e2e/f-w14-control-row.spec.ts:229-234`: E-3's three neighbour oracles, cured at the cause. Below lg, after the upload, the setup waits for the canvas front, then selects Controls. Assertions are unchanged.
   - `e2e/f-w14u-d.spec.ts:35-43`: a 4th oracle of the same shape, found by the neighbour run. Its mobile cell clicked Canvas after waiting on the sheet's "Replace image". It is restated to assert that the Canvas tab is selected and the dock is visible. Assertions are unchanged.
   - `e2e/f-w14-veil.spec.ts:157`: the stage sample moves from `.canvas-container.cartoon-card` (the class F-68 deletes) to the canvas element. `painted()` composites the ancestors, so it reads the same stage surface.
6. **Neighbours (non-regression)**, final bytes. ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14u-s e2e/f-w14-veil e2e/f-w14-control-row e2e/f-w14u-vstage e2e/f-w14u-vedit e2e/f-w14v-u1 e2e/f-w14v-u3 e2e/f-w14u-vdock e2e/f-w14u-d e2e/f-w13-image-empty e2e/f-w13-image-controls e2e/visualization-ux e2e/f-w14v-detached --project=chromium --workers=2`⟩ ×2 → **6 failed · 82 passed** (4.6m), then **5 failed · 83 passed** (3.7m). The REDs:
   - f-w14u-d d1/d2 @390: the 4th F-74 oracle, cured in act 5. ⟨`… f-w14u-d.spec.ts --workers=1`⟩ → 390 cells GREEN.
   - f-w14u-d d2 @1440 light/dark: **pre-existing**. With `src/**` at HEAD `c5a88bc` (patch parked, files restored) ⟨`… -g "1440.*d2" --workers=1`⟩ ×2 → `2 failed`, then `1 failed · 1 passed`. The same flake reads on the cured bytes. The canvas dock stays `expanded` after `traceOff`'s pointer dismissal. That is not this unit's cause: the ViewLayersMenu edit, reverted alone, reads the same.
   - vedit `:198` v88: the standing **ESC-u1-2**.
   - vdock `:279` v181: run 1 only, a 120 s click timeout under the two-worker load. Not reproduced in run 2.
   The neighbour runs rewrote 19 tracked frames under `web/e2e/screenshots/f-w14/`. They were restored by exact path (⟨`git status --porcelain web/e2e/screenshots | awk … | xargs git checkout HEAD --`⟩ → 0 dirty).

**Row dispositions (9 ids).** Tally ⟨count of the table's rows⟩ → 9.
| row | disposition | evidence |
|---|---|---|
| F-68 | **CURED** (E-1 granted by addendum (h)) | u68 ×{1440,390} RED ×2 → GREEN ×2 |
| F-168 | **CURED**. Stage limb via F-68; the error limb was cured at `.vstage` (GREEN-BEFORE-CURE e168) | u68 |
| F-170 | **CURED**. Legend limb: circles named, and the bases N is the Harmonics N. Chooser limb cured at `.vstage` | u170 RED ×2 (`N = 401` > 200) → GREEN ×2 |
| F-74 | **CURED** (E-3). Watcher re-landed; the 3 named oracles plus f-w14u-d's mobile cell cured at the setup | u74 RED ×2 → GREEN ×2 |
| F-71 | **CURED** (consumer): one visible busy mark per flight, no retired ring anywhere. Glass half (the exported dot ring, F-72) **ADOPT-AT-LANDING O-59** | u71@1440 RED ×2 → GREEN ×2; u71@390 green-before ×2 and GREEN after ×2 |
| F-146 | **CURED** (consumer): 0 guard warnings, 0 non-element-root warnings on load. The PopperRoot warning's source was the TransitionGroup of Tooltips, so no glass probe is owed | u146 RED ×2 → GREEN ×2 |
| F-172 | **CURED**, non-colour limb (the magnet reads Off / its radius). The colour limb was REVERSED by the owner (§0da); hues untouched | u172 RED ×2 → GREEN ×2 |
| F-238 | **CURED** (verified). Limbs landed at `.vstage` and `.a2`; u4's F-71 cure also removes the first upload's aside bar | u238 green-before ×2, GREEN ×2 |
| F-239 | **CURED**: rename, caret plate, 390 legend. The media half was cured at `.vstage` | u239 + u239b RED ×2 → GREEN ×2 |

**G-u (the 25 re-homed rows, with u1–u3).** Taking u1 (9 ids: F-14 F-93 F-182 F-244 F-81 F-79 F-77ˢ F-173 F-177), u2 (5), u3 (2) and u4 (9) → 25 = the open set. **Dispositioned: 254/256.** Still owed are u1's **ESC-u1-1** (F-81, easing-name migration and no glass transport) and **ESC-u1-2** (F-79's editor mount at 390 / v88). Both escalations are u1's and await the orchestrator. This unit's 9 are all dispositioned. **G-u is RED at 254/256 on u1's two escalations**, not on any u4 row.

**Gates BEFORE → AFTER.**
| gate | BEFORE | AFTER |
|---|---|---|
| falsifier `f-w14v-u4` | 9 failed · 2 passed ×2 (pre-cure bytes) | **11/11 ×2** |
| G-u | 231/256 banked + u1–u3 | **254/256** (u4's 9 closed; ESC-u1-1, ESC-u1-2 open) |
| `vue-tsc -b` | 0 (banked) | ⟨`npx vue-tsc -b; echo $?`⟩ → 0, after every landing and on the committed bytes |
| `vitest` | 86/86 banked (90/90 at u3's tree) | ⟨`npx vitest run`⟩ ×2 → `Test Files 15 passed (15) · Tests 90 passed (90)` ×2 |

**Residuals.**
- (R-1) f-w14u-d d2 @1440: pre-existing at `c5a88bc` (act 6). The canvas dock can stay expanded after `traceOff`'s pointer dismissal; the file's owner is closed. Carried to the wave Close.
- (R-2) F-71's single idiom waits on glass exporting the dot ring (F-72, O-59). Until then the consumer marks are glass's Button dot ring (an action in flight) and glass's indeterminate Progress (a stage or layer in flight), one per flight.

**Escalations:** none.

**Commits:** fourier `e38e082` (falsifier) and `8e19043` (cures + 5 adjacent oracle files; the rename is recorded as R100), pushed (⟨`git ls-remote origin m/w1-bump-migration`⟩ → `8e19043b703e`).
