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

### F.W14V.c3

Seat `claude-opus-5-5` (SERVED MODEL: claude-opus-5-5), Track C, 2026-09-25. Scope: F-W14V.md addendum (a) (:28-32), COHESION §0dc. Writable: fourier `web/src/**`, `web/e2e/**`.

**Acts, in order**
1. **Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain | grep -E '^.. web/(src|e2e)/'`⟩ → empty. Nothing inherited. fourier HEAD at open = `8e19043` (`.u4`).
2. **Measured the glass seat for the mark (READ-ONLY).** ⟨`grep '"version"' web/node_modules/@mkbabb/glass-ui/package.json`⟩ → `10.1.0`. Glass `master` src at `bc2acc13` is also 10.1.0 (latest tag `v10.1.0`).
   - `dist/components/dock/DockControl.vue.d.ts` has the props `shape · compact · active · type · disabled · as · asChild · class` and one `default` slot.
   - The More-tools trigger is `<DockTrigger for="dropdown">` (`EditorControlsDock.vue:192`). `DockTrigger.vue.d.ts` has the props `for · class` and the slots `default` and `icon`.
   - ⟨`grep -rhoE -- '--dock-control[a-z-]*' dist | sort -u`⟩ → `active-bg · floor · glyph-size · hover-bg · press-bg · radius · safe-inset · size · specular-size`.
   - ⟨`grep -iE 'mark|badge|indicator|dot' dist/components/dock/*.d.ts`⟩ → no mark seat (the hits are the separator's "marker", the crossfade's traveling indicator and reka's layer marker).
   - `active` is not a mark: it is the selected glass seat plus `aria-pressed` ("never a saturated brand hue"), which would mislabel a menu trigger as pressed.
   - **Result: no mark seat → the O-76 addendum plus honest-RED MAGNET-STATE-HIDDEN**, as addendum (a) prescribes.
3. **Measured glass's DropdownMenuItem icon anatomy.**
   - The `DropdownMenuItem` render (`dist/menu-BnmCOa3y.js:186-230`) is `menu__item interactive-item glass-menu-row` around one `default` slot, with no icon slot.
   - `.menu__item` (`dist/styles/glass/overlay-plate.css`) is `display:flex; align-items:center; padding-inline:0.5rem` with **no `gap`**.
   - `components/_shared/menu/menu.css` publishes only `--menu-row-bg` and `--menu-row-lift`. `rowClass-*.js` has no gap either.
   - ⟨`grep -rhoE -- '--(overlay|dropdown|menu)[a-z-]*(gap|icon)[a-z-]*' dist`⟩ → empty.
   - **Result: glass publishes no icon slot or gap**, so the specified cure (glass's anatomy, never a consumer margin) cannot be made at the bytes. No consumer margin was substituted. The ask goes in the same O-76 addendum, with honest-RED **MENU-ICON-GAP**. See Escalations for the ruling this needs.
4. **Wrote the falsifier `web/e2e/f-w14v-c3.spec.ts`** (committed at fourier `1ff403d`). It has two limbs and a frames block:
   - **c3m (the mark):** the magnet goes to radius 0 and then to 4 through its menu field, the menu is closed and the pointer is parked. A seat-agnostic probe then walks the More-tools trigger, its descendants and their `::before`/`::after`. It looks for the magnet's hue (bare `--viz-fourier`, or the in-menu glyph's ink `color-mix(in oklab, var(--viz-fourier) 75%, var(--foreground))`) in color, fill, stroke, background, border, outline, box-shadow or background-image. With the magnet off it must find none; with it on, at least one.
   - **c3g (the gap):** for each of Smooth contour, Simplify contour and Reset to extraction, it measures the gap from the svg's right edge to the label's first glyph (a Range rect). It also reads glass's own gap from a bare `menu__item interactive-item glass-menu-row` row. The assertions are that glass's gap is > 0 and that the measured gap is ≥ max(glass gap, 0.5 px).
   - **Frames:** 1440×900 and 390×844, light and dark. Each takes the closed dock with the magnet on, then the open menu.
5. **Gate readings, headed (`--project=chromium --headed --workers=1`, `BASE_URL=http://localhost:3100`, API :8000):**
   - run 1 (full file) → c3m RED, c3g RED, 1440 L+D frames passed. The 390 frames failed: at 390 the More-tools trigger lies outside the dock's plate, and ⟨Playwright⟩ reported `<div class="dock-plate" aria-hidden="true">…</div> intercepts pointer events` (R-1 below). The frames now open the menu by keyboard (focus the trigger, then Enter) below lg.
   - run 2 (⟨`-g 'c3m|c3g'`⟩) → `2 failed`. c3m: `magnet on … found [] · Expected: > 0 · Received: 0`, while the off limb held (`[]`). c3g: for all three rows, `glass publishes a DropdownMenuItem icon gap · Received: 0` and `icon-to-label gap 0px >= glass's 0px, and not flush · Expected: >= 0.5 · Received: 0`.
   - run 3 (full file) → `2 failed` (c3m, c3g; the same 7 `Received: 0`) and `4 passed (41.6s)` (the four frame cells).
   - ⟨`npx vue-tsc --noEmit`⟩ → exit 0.
6. **Wrote the O-76 addendum** (E-3, beside the letter, which is left unedited): `docs/tranches/X/relay/X-F-BK-TOGGLE-PRESSED-TINT-ADDENDUM-2026-09-25-C3.md` (DOCK-CONTROL-MARK and MENU-ICON-GAP, with the 10.1.0 measurements and additive asks for the 10.x minor). An INBOX.md line was appended. The glass-side mirror and the live relay to glass-ui-2d are owed by seat 0, because glass is READ-ONLY to this seat.
7. **Frames (headed; git-ignored `*.png` under `web/e2e/screenshots/f-w14v/c3/`):** `before-dock-magnet-on-{1440,390}-{light,dark}.png` and `before-menu-{1440,390}-{light,dark}.png`, 8 in all. They were read: `before-menu-1440-light` shows the Smooth, Simplify and Reset glyphs flush against their labels, and the closed dock at magnet 4 shows no sign of the magnet. No cure landed, so there are no "after" frames. The before frames stand as the honest-RED evidence.

**Gates BEFORE → AFTER**

| Gate | BEFORE | AFTER |
|---|---|---|
| mark falsifier (magnet on → mark, off → none) | RED by absence (no falsifier) | **RED ×3** (on → 0 marks; off → none holds). **Honest-RED MAGNET-STATE-HIDDEN** (O-76 addendum (a) §1) |
| menu icon gap ≥ glass DropdownMenuItem gap | RED by absence | **RED ×3** (0 px on 3/3 rows; glass gap 0 = none published). **Honest-RED MENU-ICON-GAP** (O-76 addendum (a) §2), pending a ruling |
| headed frames 1440 + 390, light + dark | none | **GREEN**: 8 frames, and the frame cells passed 4/4 on run 3 |
| vue-tsc | 0 | 0 |

**Residuals**
- **R-1 (routed, not this unit's concern):** at 390×844 the editor dock's row overflows its plate. The More-tools trigger is outside the plate's edge and cannot be reached by pointer (`.dock-plate` intercepts the click; frames `before-menu-390-dark` and the run-1 failure shot). In the light theme the Undo glyph also sits half under Save. UIA-F-88 (the 390 fit) no longer holds. The cause is unmeasured; one candidate is the View options trigger `.u1` added to the row. It is proposed for `.au1` (mobile shell) or a close-time repair. The c3 frames reach the menu by keyboard, which is the trigger's own focus path, and do not mask the defect.

**Escalations**
- **ESC-c3-1 MENU-ICON-GAP:** addendum (a) names only the mark's fallback (the O-76 ask plus honest-RED). For the gap it names only the cure: "glass's `DropdownMenuItem` icon anatomy (its published icon slot or gap), not a consumer margin". Glass 10.1.0 has neither, so the cure cannot be made at the bytes. This seat did not substitute a consumer margin. It asked glass in the same addendum and records honest-RED MENU-ICON-GAP. **Ruling sought:** confirm honest-RED MENU-ICON-GAP with ADOPT-AT-LANDING on glass's answer (the analogue of the mark's ruled path).

**Adjacent edits:** none.

**Commits:** fourier `1ff403d` (the falsifier and frames spec), pushed (⟨`git ls-remote origin m/w1-bump-migration`⟩ → `1ff403d1f871`). value.js: the relay addendum, the INBOX line and this record, committed together below.

### F.W14V.eq2

Seat `claude-opus-5-5` (SERVED MODEL: claude-opus-5-5), Track C, 2026-09-25. Scope: F-W14V.md addendum (b) `.eq2` ruling (:45), COHESION §0dh. Writable: fourier `web/src/**`, `web/e2e/**`.

**Acts, in order**
1. **Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain | grep -E 'web/(src|e2e)/'`⟩ → empty. Nothing inherited. fourier HEAD at open = `1ff403d` (`.c3`).
2. **Measured /equation's shape** (`EquationView.vue` at `1ff403d`, and headed frames `before-{1440,390}-{light,dark}.png`). At lg+ a local `.eq-grid` placed the controls column (`FadingScroll aria-label="Equation controls"` around the Function/Controls and Coefficients `ConfiguratorLayer`s) left of a results column (`.eq-panel-right`: the series `cartoon-card` and the convergence-plot `cartoon-card`). Below lg the Controls/Canvas `SegmentedTabs` pick one. **Verdict: a stage (the series and its plot) plus a controls inspector, the same shape as /visualize, so it moves** (the ruling's "yes" branch). ⟨`grep -rn Configurator src`⟩ → only `/visualize` mounted a `Configurator`.
3. **Measured glass 10.1.0's `Configurator` (READ-ONLY).** `Configurator.vue.d.ts`: `layout?: "attached"|"detached"`, `scrollMode`, `asideSide` (default `right`, the inspector idiom), `asideWidth`, slots `stage` · `controls` · `default` · `footer`. The render (`dist/configurator-CPxIo3q2.js:122-123`) puts `configurator-stage` before the `<aside class="configurator-aside">`, and under `scroll-mode="auto"` wraps the default slot in its own `FadingScroll`. `styles.css` `[data-layout="detached"]{gap: var(--configurator-detached-gap)}`. The aside side is left at glass's default (right), as /visualize has it, because the ruling's point is one page shape.
4. **Falsifier `web/e2e/f-w14v-eq2.spec.ts`** (fourier `0beb3a2`). q1 (1440×900): one `[data-slot=configurator]` with `data-layout="detached"`; `.eq-card` and `.eq-plot-card` in `:scope > .configurator-stage`, 0 `.cartoon-card` there, 0 `.eq-grid`; ≥ 2 `.configurator-layer` in the aside; 0 reset buttons in a `.configurator-layer-body` (resets go in `#actions`); the stage-to-aside gap > 0. q2 (390×844): the Controls tab shows the aside's layers and no stage box (null or 0 height); the Canvas tab shows the series and hides the aside; the stage fits the viewport. Frames 1440/390 × light/dark (390 also on the Canvas tab).
   - BEFORE ⟨`FW14V_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-eq2.spec.ts --project=chromium --headed --workers=1`⟩ ×2 → run 1 `2 failed · 4 passed` (q1 `one glass Configurator on /equation … Expected: 1 Received: 0`; q2 `Expected: 1 Received: 0`; the 4 frame cells passed); run 2 (`-g "q1|q2"`, which also matched the frames through "eq2") → `2 failed · 4 passed`, the same two `Received: 0`. **RED ×2.**
5. **The move** (fourier `0e817fd`, `EquationView.vue`). `<Configurator scroll-mode="auto" layout="detached" class="eq-configurator glass-opaque">`: `#stage` = `.eq-panel-right` (states, series, plot); the default slot (the aside) = `.eq-panel-left-wrap` (`role="group" aria-label="Equation controls"`, the name the column's FadingScroll carried) around the same `.eq-layers` stack. `.glass-opaque` is /visualize's OA-43 choice (both cards solid `--card`). **Retired:** the `.eq-grid` grid and its 360/400/440 column rules (now the aside band `--configurator-aside-{min,max}`, the same values /visualize sets); the column's own `FadingScroll` (glass's `scroll-mode="auto"` port replaces it; its import swapped for `Configurator`); the two `cartoon-card` stamps on `.eq-card` and `.eq-plot-card` (one stage card now; the series and plot are divided by glass's `--configurator-divider` hairline). Below lg, /visualize's three rules are carried (flex column with `min-width:0`; the active stage fills; an inactive stage or aside takes no box, so no empty detached card paints). **No reset exists on /equation** (⟨`grep -n -i reset FunctionInput.vue EqCoefficientsPanel.vue`⟩ → no reset control), so `#actions` stays empty; the lock "resets in #actions" is held by q1's no-reset-in-body limb.
6. **AFTER** ⟨`FW14V_PHASE=after … f-w14v-eq2.spec.ts --project=chromium --headed --workers=1`⟩ ×2 → run 1 `6 passed (26.5s)`, run 2 `6 passed (26.1s)`. **GREEN ×2.** ⟨`npx vue-tsc --noEmit`⟩ → exit 0 (twice, before and after the comment fix). ⟨`npx vitest run`⟩ → `Test Files 15 passed (15)` · `Tests 90 passed (90)`.
7. **Frames (headed; git-ignored under `web/e2e/screenshots/f-w14v/eq2/`)**: `before-` and `after-{1440,390}-{light,dark}.png`, plus `-canvas` at 390: 12 before-and-after frames and 4 canvas frames. Read: `after-1440-light` shows the stage card (series over plot, hairline between) and the controls card on the right, with the page grid in the gap between them; `after-390-dark` shows the Controls tab as one aside card and no stage box; `after-390-light-canvas` shows the stage card only.
8. **Neighbours.** ⟨`playwright test equation-interaction f-w13-radius f-w14-dpr f-w14-control-row f-w14u-shell f-w14u-eq f-w14v-u2 f-w14u-vedit timeline-scrub shell-header --project=chromium --workers=3`⟩ → `67 passed · 3 failed`:
   - f-w13-radius frame 5 (`controls stack top border-radius Expected 16 Received 4`): the layers now sit inside glass's aside card and take glass's concentric radius. Restated (adjacent).
   - f-w14u-eq q114 (`.eq-panel-left` count 0): that FadingScroll column is retired. Restated to `.eq-panel-left-wrap` (adjacent).
   - f-w14-control-row @390 (`.glass-slider` first hidden): glass renders the stage before the aside, so the first slider in DOM is the stage's timeline slider, which is hidden on the Controls tab. Restated to the first rendered slider (adjacent).
   - f-w14u-vedit v88 (the 390 editor dock fit): **pre-existing and not this unit's** (the ESC-u1-2 v88 390 fit, and `.c3`'s R-1). It is /visualize's editor dock; this unit did not touch it.
   - The run also rewrote 12 tracked `web/e2e/screenshots/f-w14/after-page-*.png` evidence frames (the control-row spec's frame side-effect). They were restored with ⟨`git checkout -- <those 12 paths>`⟩; they were this seat's own side-effect and clean at open. The re-runs used `FW14_PHASE=eq2check`, so git-ignored names were written instead.
   - visual-checkpoint item 3 (`.eq-panel-left`, the retired column): restated to the aside card (`.eq-configurator .configurator-aside`). Golden `checkpoint-disclosure-body-chromium-darwin.png` re-baselined with `--update-snapshots` after the diff was read. It shows the same Function/Controls layers, now on glass's opaque aside card with its concentric corners, where the page grid showed through before (400×620 → 424×608).
   - Restated set ×2: ⟨`… f-w14-control-row f-w14u-eq visual-checkpoint f-w13-radius -g "G-h control-row idiom @ 390|q114|disclosure|frame 5"`⟩ → `5 passed` ×2.
   - ⟨`visual-baseline f-w14-uia visualization-ux -g "equation|Equation|notation|Notation|UIA-F-3"`⟩ → `13 passed`.

**Gates BEFORE → AFTER**

| Gate | BEFORE | AFTER |
|---|---|---|
| /equation shape measured | UNMEASURED | **stage + inspector → moved** |
| falsifier q1/q2 (detached Configurator, layers in the aside, no reset in a body, gap; the <lg tabs) | **RED ×2** (0 Configurators) | **GREEN ×2** (6/6, 6/6) |
| headed frames 1440 + 390, light + dark | — | **GREEN**: before 8 and after 8 (incl. 390 canvas) |
| vue-tsc | 0 | 0 |
| vitest | 86/86 (wave baseline) | 90/90 (15 files; the count rose with earlier units) |
| equation neighbours | — | 67 pass · 3 restated then GREEN ×2 · v88 pre-existing (ESC-u1-2) |

**Residuals**
- (R-1) `.eq-status` straddles the series/plot seam as before; now that seam is the stage's hairline, not the gap between two cards. The comment was updated; the behaviour is unchanged.
- (R-2) `style.css`'s `cartoon-card` shim census prose (":216", "`EquationView.vue` using it 5 times") was already stale before this unit and is now 2 lower. The prose was left alone (a different concern; the shim is `.au6`'s cross-app area).

**Escalations:** none.

**Adjacent edits** (COHESION §0bt; the moved shape's oracles):
- `web/e2e/f-w13-radius.spec.ts:127-141`, frame 5: the panels are glass's stage and aside cards on `--radius-card`, and the layer stack's corners are concentric inside the aside (> 0, < card, top = bottom).
- `web/e2e/f-w14u-eq.spec.ts:139-141`, q114: the column is `.eq-panel-left-wrap`.
- `web/e2e/f-w14-control-row.spec.ts:218-221`: wait on the first rendered `.glass-slider`.
- `web/e2e/visual-checkpoint.spec.ts:194`, plus its golden, re-baselined after the diff was read.

**Commits:** fourier `0beb3a2` (the falsifier) · `0e817fd` (the move plus the adjacent oracle edits), pushed (⟨`git ls-remote origin m/w1-bump-migration`⟩ → `0e817fde4ddf`). value.js: this record.

### F.W14V.p

Seat `claude-opus-5-5` (SERVED MODEL: claude-opus-5-5), Track C, 2026-09-25. Scope: F-W14V.md §1 `.p` (:21-24), COHESION §0cz. Writable: fourier `web/src/**`, `web/e2e/**`, `api/**` (not needed: the server half is unchanged).

**Acts, in order**
1. **Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain | grep -E '^.. (web/src|web/e2e|api)/'`⟩ → empty. Nothing inherited. fourier HEAD at open = `0e817fd` (`.eq2`).
2. **Measured the anchors at the true bytes.**
   - `api/routers/visualizations.py:176` → `return errors.owner_required(detail="A session is required to publish.")`, reached only when `resolve_session` returns None. `api/dependencies.py:209-211`: that happens only when **no** `X-Session-Token` header is sent (a bad token is a 401 "Invalid or expired session" instead).
   - `VisualizationView.vue:236-253` `handlePublish`: when signed out it already stopped before the round trip with `toast("Log in to publish to the gallery.", "info")`, a dead-end toast (UIA-F-95, `.vstage`).
   - **The owner frame's cause, reproduced:** a remembered slug with no token (`fourier-user-slug` set, `fourier-user-token` absent). `isLoggedIn` is true, so the save goes out with no session. The real API answers 401 `urn:contract:owner-required`. `workspace.saveVisualization` writes it into `store.error`, and the loader's channel (`useWorkspaceLoader.ts:194`) raises the raw toast "A session is required to publish." over the pane's bottom edge. Frame: the p2 RED failure shot (the owner frame, byte for byte in layout).
   - The shell's existing inline sign-in is `UserSlugBar.vue`'s `Popover` (the "Log in" `DockTrigger` in `AppDock.vue:166`), with its open state held in a local `showLogin`.
   - **Glass Toaster, READ-ONLY:** ⟨`cat dist/components/toast/Toaster.vue.d.ts`⟩ → props `{ position?: "top-left"|"top-center"|"top-right"|"bottom-left"|"bottom-center"|"bottom-right" }` only. The viewport (`dist/toast-DVOwo6GB.js:214-240`) is `fixed top-0 z-toast flex max-h-screen w-full` + `p-4` + `md:max-w-[420px]`, with a per-position edge class. ⟨`grep -n 'offset\|props\|position' glass-ui/src/components/toast/Toaster.vue`⟩ at glass `bc2acc13` (10.1.0) → `:19` `defineProps<{ position?: ToasterPosition }>` only. **No offset prop, no offset token.** `App.vue:146` mounts `<Toaster />` (default `bottom-right`).
3. **Falsifier `web/e2e/f-w14v-p.spec.ts`** (fourier `8aaf925`), served from :3100 against the API on :8000. Sign-in is the real `POST /api/sessions`; only the save and the lift are fulfilled, so a run leaves no public piece behind.
   - **p1:** signed out at 1440. Publish must open `#user-slug-input`, focused; 1.5 s later there must be no "session is required" and no "Log in to publish" text; 0 POSTs before sign-in. Then "Generate a new slug", and "Published to the gallery" must appear: 1 POST carrying the new `fourier-user-token` and 1 PATCH.
   - **p2:** a remembered slug with no token. The save's POST goes to the **real** API, and the spec asserts one 401 from it. The same assertions as p1 follow: the inline sign-in, never the raw toast, and a resume after sign-in.
   - **p3 @1440×900 and @1024×768:** the success toast's box and `.viz-configurator .configurator-aside` must not intersect.
   - **RED ×2 on `0e817fd`:** ⟨`FW14V_PHASE=before BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-p.spec.ts --project=chromium --workers=2`⟩ → `4 failed`. p1 `#user-slug-input … element(s) not found`. p2 hover timed out: the first draft seeded a bogus token, and the page did not load ("Invalid or expired session"), which is not the owner's shape. p2 was redrawn to the no-token shape and not counted from this run. p3 @1440 `Received: 36872.125`, @1024 `Received: 36872.125`. Run 2 (`-g 'p1|p2|1440'`, `--workers=1`) → `3 failed`: p1 the same; p3 @1440 the same. The redrawn p2 ×2 (`-g p2`, two runs) → `1 failed` each: `#user-slug-input … not found`, and the failure shot shows the raw toast "A session is required to publish." over the pane.
4. **The cure** (fourier `69af796`):
   - `stores/auth.ts`: `requestSignIn()` sets `signInRequested` and returns a promise. `endSignInRequest()` settles it with `isLoggedIn`. A second request supersedes the first, which settles `false`. `forgetUser()` ends the local account state, and `logout` now shares it.
   - `UserSlugBar.vue` watches `signInRequested` (immediate) and opens its own popover. `closeLogin()` (called on success, dismiss and Escape) calls `endSignInRequest()`.
   - `lib/api-problem.ts`: `isOwnerRequired(e)`, true for `ApiProblem.is("urn:contract:owner-required")`.
   - `stores/workspace.ts` `saveVisualization` rethrows that typed problem rather than writing `error`, so the loader channel never toasts it.
   - `VisualizationView.vue` `handlePublish`: when signed out it awaits `signInToPublish()` (which closes an open takeover first) and resumes on `true`. `saveSignedIn()` handles the stale shape: on `owner-required` it calls `auth.forgetUser()`, asks for the sign-in, and saves once more on `true`.
   - The "Log in to publish" toast and the view's now-unused `useToast` are removed.
   - **The server contract is unchanged** (no `api/**` edit).
5. **Toast placement: measured, and not cured (see ESC-p-1).** The spec's mechanism, "glass's Toaster offset", is absent at glass 10.1.0 (act 2). Glass's only placement input is `position`, and it cannot clear the pane. At 1024×768 the Configurator is stacked: the aside is `{x 8, y 400, w 1008, h 356}`, full width at the page's bottom. At 390 glass's viewport is `top-0 w-full` for every position (its `sm:` edges). So every bottom position overlaps the aside at 1024, and every top position covers the app dock, which is also where the inline sign-in anchors. No consumer overlay or position was substituted.
6. **Gates after the cure.**
   - ⟨`FW14V_PHASE=after … f-w14v-p.spec.ts -g 'p1|p2' --workers=1`⟩ → `2 passed (20.5s)`. ⟨`FW14V_PHASE=after … f-w14v-p.spec.ts --workers=1`⟩ (full file) → p1 and p2 passed, and `2 failed` for p3 @1440 (`toast {x 1036, y 789, w 388, h 95} over aside {x 1008, y 100, w 424, h 788}`, `Received: 36872.125`) and p3 @1024 (`toast {x 620, y 657} over aside {x 8, y 400, w 1008, h 356}`, `Received: 36872.125`). **p1 and p2 GREEN ×2. p3 RED ×3 at @1440 and ×2 at @1024, unchanged by this cure, as expected.**
   - ⟨`MONGO_TEST_URI=mongodb://127.0.0.1:27018 .venv/bin/python -m pytest api/tests/conformance/test_identity.py::test_owner_required -q`⟩ ×2 → `1 passed in 0.27s`, then `1 passed in 0.23s`. **GREEN unchanged.**
   - ⟨`npx vue-tsc --noEmit`⟩ → exit 0. ⟨`npx vitest run`⟩ → `Test Files 15 passed (15)` · `Tests 90 passed (90)`.
   - Neighbours: ⟨`playwright test f-w14u-vstage f-w14v-u3 f-w14-uia -g 'e95|e183|UIA-F-18' --workers=3`⟩ → `3 passed (19.3s)`. e95 was restated first (see Adjacent edits). ⟨`git status --porcelain`⟩ after the runs → only this unit's edits and `?? .worktrees/`, with no tracked frames rewritten.

**Gates BEFORE → AFTER**

| Gate | BEFORE | AFTER |
|---|---|---|
| e2e: a signed-out Publish reaches the inline sign-in, never the raw toast (p1 signed out; p2 the owner frame's slug-without-session shape against the real 401) | **RED ×2** (no sign-in; p2 shows the raw toast over the pane) | **GREEN ×2** (the sign-in opens and is focused, no toast, and the publish resumes with the new session: 1 POST, 1 PATCH) |
| a toast never overlaps the controls pane (p3 @1440, @1024) | **RED** (36872 px² at both) | **RED ×3 / ×2, honest-RED TOASTER-OFFSET** (ESC-p-1). Glass 10.1.0 has no Toaster offset |
| api `test_owner_required` (MONGO_TEST_URI :27018) | GREEN | **GREEN ×2, unchanged** |
| vue-tsc | 0 | 0 |
| vitest | 90/90 | 90/90 |

**Residuals**
- (R-1) The takeover path (a signed-out Publish from inside the fullscreen takeover closes the takeover, then opens the sign-in) is in the bytes but unmeasured. No gate names it. A focus return from the closing dialog could land on its trigger rather than on the sign-in field. This is proposed for `.au2` (workspace) or the close check.
- (R-2) A stale token (present but unknown to the server) makes every read on `/v/<slug>` fail with "Invalid or expired session" (`dependencies.py:219`), so the piece does not open. Measured by accident in the first p2 draft. This is a different concern from the publish path and is not this unit's. It is proposed for `.au2` (L2-8 area) or a new AUDIT row.
- (R-3) Frames were written git-ignored under `web/e2e/screenshots/f-w14v/p/` (listed with ⟨`ls`⟩): `after-p1-signin-1440`, `after-p2-signin-1440`, `after-p1-published-1440`, and `{before,after}-p3-toast-{1440,1024}`. There is no `before` sign-in frame, because the RED runs failed before the frame step. The before state of p2 is the Playwright failure shot, which shows the raw toast over the pane.

**Escalations**
- **ESC-p-1 TOASTER-OFFSET.** The spec's cure ("their placement uses glass's Toaster offset, not a consumer overlay"; the lock "toast placement via glass Toaster offset") names a glass seat that does not exist at 10.1.0: the Toaster's only input is `position`, and there is no offset prop or token (act 2). Glass's `position` alone cannot clear the pane (act 5: bottom positions overlap the stacked aside at 1024; top positions cover the app dock and the sign-in's anchor; below `sm` every position is `top-0 w-full`). No consumer substitute was made. **Asks:** (a) glass: an additive Toaster offset (a prop or a `--toaster-offset-*` token set, e.g. inline-end/block-end) so a consumer can seat toasts clear of a region, in the 10.x minor. The relay letter is owed by seat 0 (value.js `relay/` and glass are outside this seat's writable set). (b) Ruling sought: confirm honest-RED TOASTER-OFFSET with ADOPT-AT-LANDING (the ESC-c3-1 analogue). The falsifier p3 is committed and stands RED until then.

**Adjacent edits** (COHESION §0bt):
- `web/e2e/f-w14u-vstage.spec.ts:28-29, :274, :290-293`: e95 (UIA-F-95 ⊕ F-245). It asserted one toast containing "log in", which is the copy and behaviour this unit retired. It now asserts 0 toasts and the sign-in field shown, and still 0 POSTs. The title and header line follow.

**Commits:** fourier `8aaf925` (the falsifier) · `69af796` (the cure plus 1 adjacent), pushed (⟨`git ls-remote origin m/w1-bump-migration`⟩ → `69af79642e9e`). value.js: this record.

### F.W14V.au0

SEAT `.au0`, `claude-opus-5-5`, 2026-09-25. Spec `F-W14V.md` read whole (48 lines), with F-W14U.md addendum (e) (`:60-65`), `audit/AUDIT-2-fourier.md` read whole (180 lines; 62 rows, `9c7552d3`), and COHESION §0cy · §0cz · §0da..§0dp. Measure only: no `web/src` write. Writable set: `web/e2e/**`.

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain | grep web/e2e`⟩ → empty. There was no inherited partial work. fourier HEAD = `69af796` (the `.p` close), branch `m/w1-bump-migration`. Servers: ⟨`lsof -iTCP -sTCP:LISTEN`⟩ → node `:3100` (vite), python `:8000` (api), mongod `:27018`.

**Act 1: the re-baseline (addendum (e) bullet 2).** The register audited `798c98f` plus the dirty vdock files (they landed as `7ad6be2`). Each named citation was re-read at fourier HEAD `69af796` with ⟨`grep -n` / `sed -n`⟩ on the true bytes. Where an anchor drifted, the INTENT is recorded at the true bytes.

| Row | Register citation | At HEAD `69af796` (true bytes) | Reading |
|---|---|---|---|
| L1-7 | `CanvasControlsDock.vue:70-92`; `EditorControlsDock.vue:191-211` | `CanvasControlsDock.vue:79-85` `<ViewLayersMenu side="bottom" …>`; `EditorControlsDock.vue:184-190` `<ViewLayersMenu side="top" …>`; one component, `ViewLayersMenu.vue` (`.u1` `64a1865`) | the two popovers are now one component: **CURED-BY-TWIN** UIA-F-79 (`.u1`, CURED at ≥ sm) |
| L1-8 | `EasingPicker.vue:1-56`; `MorphPhaseConfig.vue:58-110`, `:168`; `lib/easings.ts:186-193`, `:202-240`, `:305`, `:310` | `EasingPicker.vue:1-116` (116 lines; `DropdownMenuRadioGroup` `:83-114`); `MorphPhaseConfig.vue:58-112` (`<Select>` … `</Select>`), `:168` `const presets = EASING_PRESETS`; `lib/easings.ts:186-193` (EASING_PRESETS, unmoved), `:204-215` ANIMATION_EASINGS + `:217-225` names/guard, `:305` getEasingSVGPath, `:310` easingCurvePath | two catalogs, two helpers, two choosers still: **OPEN** |
| L1-26 | `FullscreenViewer.vue:54-56`, `:89` | no second stage: `FullscreenViewer.vue:44-49` docblock (an empty host); `VisualizationView.vue:452-545` `<Teleport v-else :to="fsHost" :disabled="!stageInTakeover">` re-hosts the one stage | **CURED-BY-TWIN** UIA-F-14 (`.u1` `64a1865`) |
| L2-2 | `VisualizationView.vue:600-606`, `:731-733`; `FullscreenViewer.vue:250-257` | `VisualizationView.vue:816-818` `.controls-overlay { … bottom: 0.75rem }` and `:1006` (the < sm arm, `bottom: 0.75rem`); FullscreenViewer's `.fs-controls` is deleted (`:192`), and in fullscreen the same `.controls-overlay` is teleported. ⟨`grep -rn 'env(safe-area' web/src`⟩ → `style.css:107` and `PaperView.vue:631` only | **OPEN** (consumer half); glass half O-74 (`--safe-block-end`) |
| L2-8 | `ExportModal.vue:81` (bare; HEAD `:49`) | `ExportModal.vue:81` `<DialogContent>`, still bare (no `scroll`), in a 134-line file | **OPEN** |
| L2-12 | glass `PopoverContent`/`DropdownMenuContent` with no collisionPadding | glass 10.1.0 dist: ⟨`grep -lo collisionPadding dist/*.js`⟩ → `select-fy3vtArm.js` only | **HELD** (glass, UIA-F-56/F-219 · O-74) |
| L2-19 | `AnimationControls.vue:221-222` (dirty) | `AnimationControls.vue:216-218` `width: min(var(--animation-dock-max-width, 960px), calc(100dvw - 1rem))` | **OPEN** (runtime in Act 3: still 6 px) |
| L3-7 | `ExportModal.vue:94-100` (dirty) | `ExportModal.vue:95-100`: six `<LabeledSwitch … layout="horizontal" />` | **OPEN**; glass half O-74 (the LabeledSwitch settings-row arm) |

**Act 2: the instrument.** `web/e2e/f-w14v-au0.spec.ts` (committed in fourier `a30001d` and pushed; ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `a30001d003e9`). It only measures. Each view is framed, and the spec records page errors, console errors, document overflow, every open plate's box and its distance to each viewport edge, and the horizontal scrollers inside the docks. It asserts one thing: the DropdownMenu-parts error is absent. Matrix: {1440×900, 390×844, 768×1024, 1024×768} × {light, dark}, plus the logged-in shell in light at 360×780 and 430×932. Phone widths carry the register's portrait insets (top 47, bottom 34) through CDP `Emulation.setSafeAreaInsetsOverride`. Frames go to `web/e2e/screenshots/f-w14v/au0/` (146 PNG, git-ignored by `web/.gitignore` `*.png`). Metrics go to the scratchpad (`$AU0_METRICS`), not to the repo.
- ⟨`BASE_URL=http://localhost:3100 AU0_METRICS=…/r1 npx playwright test e2e/f-w14v-au0.spec.ts --project=chromium --headed --workers=2 --reporter=line`⟩ → run 1 `10 passed (2.1m)` exit 0; run 2 (`…/r2`) `10 passed (2.1m)` exit 0.
- **Double-run.** A python diff of r1 against r2 over 719 keys (state, docScrollH, plate boxes, dock scrollers) → **0 diffs**. Views: 142 framed and 8 absent per run. The absences are by design: the nav dropdown at 1440/1024 (the inline Sections nav shows there instead) and the floating ToC at 1440/1024 (the desktop drawer shows instead). The Canvas tab took one press in every tabbed cell.
- **Instrument history.** Three earlier attempts were instrument faults, not product findings: (a) at 768 the workspace is tabbed, so the width < 640 guess never pressed Canvas; (b) a `count()` raced the tablist before it hydrated; (c) the phone inline search opens from the floating bar's Search control. After each fix the spec detects the form it meets.

**Act 3: the DropdownMenu-parts re-check (L3 m-dark, the in-flight dock).** Runtime: ⟨r1/r2 `errors`⟩ → **0 page errors, 0 console errors, 0 "DropdownMenu parts must be used within DropdownMenu"** across 10 cells × 2 runs. The m390-dark cell opens the playback dock and its ⋮ menu. Source: the two radio groups (`SpeedSelect.vue:45-60`, `EasingPicker.vue:83-114`) mount only inside `AnimationControls.vue:186-208` `<DropdownMenu>` → `<DropdownMenuContent>` (`:202-207`). **NOT REPRODUCING at HEAD.** The Lens 3 error was the in-flight vdock edit, which landed as `7ad6be2`.

**Act 4: the unread views, measured (r1 = r2).** Figures are read from the settled JSON. Plates are `x,y w×h` with right/bottom gaps.

| View | 1440×900 | 390×844 (inset 34) | 768×1024 | 1024×768 | Note |
|---|---|---|---|---|---|
| document height vs viewport | 900/900 | **878/844** on every route | 1024/1024 | 768/768 | L2-1 reproduces at HEAD; also 814/780 at 360 and 966/932 at 430 (logged in) |
| About | 251,64 336×126 | 28,64 336×114 (L 28, R 26) | 128,64 | 53,64 | fits |
| Inline login | 784,64 336×106 | **0**,64 336×132 (flush left) | 231,64 | 566,64 | L2-12 |
| Nav dropdown | inline nav | 101,64 150×246 | 329,64 154×252 | inline nav | fits |
| Account menu (logged in) | — | 360: **0**,64 293×164; 430: 13,64 | — | — | L2-12; menu rows have no icon gap (X-6) |
| Floating ToC | drawer | 13,144 374×512, **R 3** | 13,144 752×512, **R 3** | drawer | L2-16 now also at tablet |
| Inline paper search | results plate 193–577 (outside the sidebar) | opened from the bar | full-width | results plate 48–406 | X-7 |
| View options | 535,149 166×148 | **0**,195 194×153 (flush left) | 237,195 | 562,161 | L2-12 |
| Equation (Σ) panel | 17,160 448×240 | 25,200 340×265 | 25,200 448×266 | 17,172 448×238 | fits |
| Export | 464,210 512×479 | 20,111 350×623 (fits in portrait) | 128,278 512×468 | 256,147 512×474 | L3-7 stacked labels at 390 (frame) |
| More options (⋮) | 790,222 180×605, B 73 | 149,150 204×617, B 77 | 521,314 210×633, B 77 | 805,367 175×401, **B 0** | X-2 |
| Collapsed playback dock | `animation-dock` 145/102 | 144/110 | 146/110 | 142/102 | L2-13 overflow at every width, not only phones |
| Expanded playback dock layer | fits | **272/266** | **650/644** | fits | L2-19 (6 px) persists |
| Editor dock layer (collapsed / expanded) | 243/185 / fits | 257/183 / **257/193** | 257/186 / 257/255 | 243/181 / fits | L2-15 still scrolls at 390 (64 px hidden; the register had 432/183 at 360) |
| Fullscreen | 0,0 full | full | full | full | the collapsed dock's speed readout paints outside its plate (frame d1440 fullscreen); L2-13 |
| Contour editor | pane = one collapsed Contour layer, about 720 of 790 px empty | stage runs under the 34 px inset | — | — | X-3 |
| Audit Log | framed (the Lens 3 frames were blank) | framed | framed | framed | X-8 |
| /morph | framed | dark framed | framed | framed | L3-15 cite |

**Act 5: new findings (`A2-FO-X-n`).** Each one was read from the frames and the settled metrics of both runs.

| ID | Sev | View | Finding (measured) | Owner | Unit |
|---|---|---|---|---|---|
| A2-FO-X-1 | HIGH | /visualize 1024×768 | At exactly lg width the workspace stacks. The stage is a 1000×285 strip (y 100–385), the playback dock covers its lower half, and the controls sit in a centred column of about 464 px inside a 1000 px card (frames `t1024-*-workspace`, `t1024-light-more-options`). Tablet landscape gets neither the side-by-side form nor a usable stage. | CONSUMER `VisualizationView.vue` side-by-side gate (with L2-4) | `.au1` |
| A2-FO-X-2 | MEDIUM | /visualize ⋮ More options, 1024×768 | The menu reaches the viewport bottom (175×401 at y 367, bottom gap **0**), and the Easing rows below Sine are cut at the edge (frame `t1024-light-more-options`). | GLASS collisionPadding (L2-12, O-74) + CONSUMER `AnimationControls.vue:202` placement | `.au2` (cite L2-12) |
| A2-FO-X-3 | MEDIUM | contour-editor mode ≥ lg | The inspector holds a single collapsed Contour layer, leaving about 720 of the aside's 790 px empty while the editor is the task (frame `d1440-*-contour-editor`). | CONSUMER `VisualizationView.vue` (editor-mode layers) | `.au2` |
| A2-FO-X-4 | MEDIUM | /w Controls tab 768×1024 (and 1024 stacked) | The layers sit in a column of about 464 px centred in a 734 px card, with dead gutters of about 135 px on each side and about 225 px of empty card below (frame `t768-*-workspace-controls-tab`). | CONSUMER sheet-form width (glass Configurator sheet arm if the cap is glass's) | `.au2` |
| A2-FO-X-5 | LOW | logged-in shell 360 | The app dock's layer overflows 334/316 (an 18 px sideways pan) once the Account group mounts. 430 fits. | CONSUMER `AppDock.vue` account group (+ O-65 collapsed form) | `.au1` |
| A2-FO-X-6 | LOW | Account menu (logged in) | "Copy your slug" and "Log out" have no icon-to-label gap, and at 360 the menu is flush left (x 0) (frame `m360-light-loggedin-account`). | GLASS `DropdownMenuItem` icon gap (MENU-ICON-GAP, O-76 addendum (a), ESC-c3-1) + L2-12 | `.au6` (cite) |
| A2-FO-X-7 | LOW | /paper inline search ≥ lg | The results plate breaks out of the 270 px sidebar (x 193–577 against the sidebar's 183–453) over the article's first column (frame `d1440-light-paper-inline-search`). | CONSUMER `PaperSearch` (with L1-1/L1-3) | `.au5` |
| A2-FO-X-8 | LOW | admin Audit Log 1440 | Two filter fields about 620 px wide for short tokens. The "IP hash" header wraps to two lines while Target holds about 1100 px. The action chips are solid saturated green and red, against the F-197 neutral-cue precedent (frame `d1440-*-audit-log`). | CONSUMER `AdminAuditLog.vue` | `.au4` |

**Act 6: row → unit map (62 register rows + 8 X rows).** Dispositions at HEAD `69af796`: **CURED-BY-TWIN** (F.W14U or F.W14V cured it under its UIA twin, which is cited and not redone), **OPEN** (owed by the unit), **HELD** (glass ruling or producer landing; ADOPT-AT-LANDING). Twin statuses were read from the `F-W14U.md` / `F-W14V.md` record tables with ⟨`grep "^| F-NNN "`⟩.

| Unit | OPEN | CURED-BY-TWIN (twin, status) | HELD |
|---|---|---|---|
| `.au1` safe area / mobile shell | L2-1 (878/844 · 814/780 · 966/932), L2-2ˢ, L2-3 (⟨`grep safe-area-inset-left\|right web/src`⟩ → 0), L2-4, L2-5 (F-238 cured the opaque strip only), L2-16 (R 3 at 390 and 768), L3-6ˢ (+O-68), L2-17, **X-1**, **X-5** | — | glass halves L2-2 (`--safe-block-end`), L3-6 (gutter token) |
| `.au2` workspace /w /v | L2-8, L2-15 (257/193 at 390; F-88 consumer CURED, scroll remains), L2-19 (272/266, 650/644), L3-5ˢ, L3-7ˢ, L1-11, L1-16ˢ (F-239 naming CURED; the session gap is glass's), L1-23, L3-9 (Basis wraps 3+2 at 1440), L3-10 (the Image-layer share is cured by F-169/F-74; the tablet/phone first-tab limb is OPEN), **X-2**, **X-3**, **X-4** | L1-7 (F-79 CURED `.u1`), L1-26 (F-14 CURED `.u1`), L3-8 reset row (CONFIGURATOR-HEADER-ACTIONS `239845f`, addendum (b)), L3-11 (F-69, F-165 CURED; cited, not re-framed) | L3-8 label truncation (O-77 LAYER-HEADER-LABEL); glass halves L3-5, L3-7, L1-16 |
| `.au3` equation + morph | L1-5, L1-6 (`EqCoefficientsPanel.vue` still present), **L1-8** (moved here from the plan's `.au2` list: it IS the easing-picker row that `.au3` owns with O-74a E-3), L1-12, L1-13 (⟨`grep -rn cartoon-card web/src`⟩ → 17 hits in 11 files, comments included) | L1-20 (`CollapsibleSection.vue` absent at HEAD; F-114, F-171 CURED), L3-15 (F-115, F-254, F-162, F-234, F-211 CURED) | L1-15 (BL-FW14H-1/-2); easing convergence ADOPT-AT-LANDING O-74a E-3 |
| `.au4` gallery + admin | L1-9, L1-10, L1-27ˢ, L2-9, L2-10, L2-11, L3-1ˢ, L3-2 (F-110 CURED a110 ×2 at F.W14U, but the register saw a regression at 390, so re-measure), L3-3, L3-4, **X-8**; AdminFlaggedPanel cross-cite value X-W12U `.k` | L3-12 (F-99, F-247 CURED), L3-13 (F-189 CURED) | L1-27 Pagination (UIA-F-145), L3-1 SelectTrigger inline arm |
| `.au5` paper | L1-1, L1-19, **X-7** | L1-3 (F-22 cured at HEAD; F-159, F-64 CURED) | L1-2 TocTree, L1-4 search-engine ruling, L1-18 useScrollTo teleport arm (each with its consumer adopt) |
| `.au6` cross-app / lib / shell | L1-14ˢ, L1-17, L1-21, L1-22, L1-24, L1-25 (F-212 cured the writer/reader via `meta.tab`, `router/index.ts:124-187`; `AppDock.vue:54` `tabs` is still a second list); one search-with-glyph component for the 4 sites; useSafeStorage cross-cite value X-W12U `.k` | L1-28 consumer half (⟨`grep -rn animate-spin web/src`⟩ → 0; F-71 CURED) | L1-28 DotRing (UIA-F-72), L2-18ˢ + L3-14 (O-74a E-2, §11), **X-6** (MENU-ICON-GAP, O-76 (a)) |
| glass-only (no unit) | — | — | L2-6, L2-7, L2-12 (login x 0 at 360/390, View options x 0 at 390, account x 0 at 360), L2-13 (collapsed dock 142–146/102–110 at all four widths), L2-14 |

Count (self-count, from the table above): `.au1` 8+2 X · `.au2` 14 register (10 OPEN · 4 CURED-BY-TWIN; L3-8 split, its truncation limb HELD) + 3 X · `.au3` 8 · `.au4` 12 + 1 X · `.au5` 6 + 1 X · `.au6` 9 + 1 X · glass-only 5 → 8+14+8+12+6+9+5 = **62** register rows, plus **8** X rows. CURED-BY-TWIN: L1-3, L1-7, L1-20, L1-26, L3-8 (reset limb), L3-11, L3-12, L3-13, L3-15, plus the L1-28 consumer half = **9 rows + 1 half**. HELD alone (no consumer work): L2-6, L2-7, L2-12, L2-13, L2-14, L1-15, L3-14 = 7 (L2-18ˢ HELD in `.au6`).

**Gates, BEFORE → AFTER:**
- Re-baselined citations for L1-7 L1-8 L1-26 L2-2 L2-8 L2-12 L2-19 L3-7 at HEAD: register anchors at `798c98f`+dirty → **8/8 re-read at `69af796`** (Act 1). **GREEN.**
- DropdownMenu-parts runtime error re-checked: raised at L3 (m-dark, in flight) → **0 in 10 cells × 2 runs**; structurally impossible at HEAD (Act 3). **GREEN.**
- Unread views framed at 1440/390 in both themes, plus 768×1024 and 1024×768, plus the shell at 360/430 light: Lens 3 frames missing or blank → **142 views framed ×2** (and 4 Controls-tab frames), r1 = r2 over 719 keys, `10 passed` ×2 (Acts 2 and 4). **GREEN.**
- Row → unit map with the F.W14U twin cures cited: none → **62 + 8 rows mapped** (Act 6). **GREEN.**
- AUDIT-2 register (baseline row): RED 0/56 dispositioned → **62/62 dispositioned** (9 CURED-BY-TWIN + 1 half · 7 HELD alone · the rest OPEN and homed to `.au1`–`.au6`). The OPEN rows are owed by the family units, not by `.au0`.

**Adjacent edits:** none. **src writes:** none (measure only, per the lock).

**Residuals / notes for the family seats:**
- (R-1) Landscape 844×390 was not in `.au0`'s brief. L2-3, L2-4 and the L2-8 landscape overflow keep the register's measures; `.au1`/`.au2` re-measure landscape with the CDP insets (left 47, right 47, bottom 21).
- (R-2) One plan correction: L1-8 is the easing-picker row, so it goes to `.au3` (with O-74a E-3), not `.au2` as the Unit plan line 11 listed it. The plan table is not rewritten (E-3); this receipt is the correction.
- (R-3) Instrument re-use: every family seat can re-run `f-w14v-au0.spec.ts` with `AU0_METRICS` set to read its surface's plates and scrollers before and after a cure. Its only assertion (the DropdownMenu-parts error absent) stays GREEN.
- (R-4) The `pg 4/110` chip over the phone paper text, and the /morph phone stat strip, are L3-15 citations. They are not new rows.

**Escalations:** none.

**Commits:** fourier `a30001d` (the instrument), pushed. value.js: this record.

### F.W14V.au1

SEAT `.au1`, `claude-opus-5-5`, 2026-09-25. Spec `F-W14V.md` read whole, with `AUDIT-2-fourier.md` Lens 2 (`:83-107`) plus Routing (`:131-145`) and the L3-6 row (`:120`), F-W14U.md addendum (e), and COHESION §0j…§0dp (no ruling after §0dp). Rows (the `.au0` Act 6 map): L2-1, L2-2ˢ, L2-3, L2-4, L2-5, L2-16, L3-6ˢ, L2-17, X-1, X-5. Writable: `web/src/**`, `web/e2e/**`.

**Crash-recovery.** ⟨`git -C fourier-analysis status --porcelain | grep -E 'web/(src|e2e)/'`⟩ → empty. There was no inherited partial work. HEAD = `a30001d`. Servers: node `:3100` (vite), api `:8000`, mongod `:27018`.

**Anchors re-read at the true bytes** (INTENT kept where the lines had drifted): `style.css:106-108` body `padding-bottom: env(safe-area-inset-bottom)` (unmoved); `App.vue:124` h-dvh shell (unmoved); `index.html:5` `viewport-fit=cover` (unmoved); `VisualizationView.vue` tab strip `:369` (the register gave `:267`) and `isDesktop = useMediaQuery("(min-width: 1024px)")` `:106` (register `:74`); `EquationView.vue` strip `:396` (register `:347`) and `isDesktop` `:72` (register `:60`); `.controls-overlay` `:823` (au0 gave `:816`); the paper ToC plate `PaperToc.vue:401` (the register cited `PaperView.vue:528-540`, where only the floating bar's mount remains, `:399-411`); the modal Like `GalleryCardModal.vue:260` (register `:353`); the About link `AppDock.vue:113` (register `:95-110`). The /equation disclosure limb of L2-17 is gone: `CollapsibleSection.vue` is absent at HEAD (L1-20), and its triggers are now glass `ConfiguratorLayer`s (`.eq2`). Those triggers are measured in the falsifier and are ≥ 44 px both before and after.

**Root causes measured** (not just the register's symptoms):
- **X-1:** glass splits the Configurator on `@container (inline-size >= 64rem)` over its shell (`configurator/styles.css`), but the host gated on the viewport (`min-width: 1024px`). The shell sits inside the page margin, so at 1024 viewport the host hid the tabs while glass stacked the grid: the stage was 288 tall and the aside x−stage.r was −1008.
- **L2-1:** the register's cause is the body padding. A second cause surfaced once that padding was gone: /gallery's document measured 1031/844 (portrait) and 574/390 (landscape). The falsifier's own "past the fold" readout named `span.sr-only` (b = 976, 1031). A gallery card's `sr-only` label is `position: absolute` with no positioned ancestor, so it was laid out against the document instead of `<main>`.
- **X-5:** the layer is 316 px wide. The run of faces is 334/324/346/347/330 px on /gallery, /paper, /visualize, /equation and /morph, and it overflows in both the logged-in and logged-out states at 360. The nav trigger's label is the only variable face.

**Act 1: the falsifier** (`web/e2e/f-w14v-au1.spec.ts`, fourier `48eee99`). It has 15 tests, one limb per row, with CDP `Emulation.setSafeAreaInsetsOverride` (portrait T47/B34 at 390; landscape L47/R47/B21 at 844×390). The L2-1 test first asserts that the override actually reads through `env()` (34 and 21).
- **BEFORE** ran on a clean worktree of HEAD `a30001d`, served by its own vite on `:3101` against the same `:8000`. The first attempt on `:3100` was discarded: vite HMR had applied my in-progress edits mid-run.
- ⟨`BASE_URL=http://localhost:3101 npx playwright test e2e/f-w14v-au1.spec.ts --project=chromium --workers=2`⟩ ×2 → r1 `14 failed · 1 passed (3.1m)`, r2 `14 failed · 1 passed (3.8m)`. The one GREEN is the X-5 @390 guard limb (it fits at 390, as `.au0` measured). It was green before, and that is on file.
- BEFORE figures (r2 = r1):

| Row | BEFORE (a30001d) |
|---|---|
| L2-1 | docSH 878/844 (`/paper`, `/v`) and 1031/844 (`/gallery`) portrait; 411/390 and 574/390 landscape; scrollY 34 / 21 / 187 / 184 |
| L2-2ˢ | animation dock bottom 817 in the stage and 832 in fullscreen, against 810 (844−34) |
| L2-3 | Gallery tab [16..], search input [16..528], card [25..]; /v and /equation "Controls" tab [12..109]; /equation layer trigger [26..818]; /paper ToC title [13..773] and "Search paper" [777..831], against [47..797] |
| L2-4 | /v tab row present (x 12, y 88); stage 0 tall under the Controls tab; aside beside the stage −1; the animation dock hidden |
| L2-5 | strip centre off the column centre by 74.5 / 89.5 / 109.5 px (360/390/430), strip left 12 against column 16, on /v and /equation |
| L2-16 | band minus tallest control 18; ToC plate bottom 425 (> 369), left 13 (< 47), right 841 (> 797) |
| L3-6ˢ | 1440 gutters {visualize 8, equation 8, gallery 16}; 390 {16, 16, 16, extractor 8, notFound 16, paper 8} |
| L2-17 | modal Like 34 tall; About link 19.6 |
| X-1 | 1024×768: no tab row, aside − stage.r = −1008, stage 288 tall |
| X-5 | 360: dock layer 334/316 · 324/316 · 346/316 · 347/316 · 330/316 across the five sections |

**Act 2: the cure** (fourier `cad7518`, one commit, 22 files).
- **L2-1:** the body padding is deleted (`style.css`). `<main>` becomes `relative` (`App.vue`), so it is the containing block of what it scrolls.
- **L2-3:** the `.app-shell` class carries `padding-inline: env(safe-area-inset-left, 0px) env(safe-area-inset-right, 0px)`.
- **L2-2ˢ:** `.controls-overlay` bottom is `calc(0.75rem + env(safe-area-inset-bottom, 0px))`. The < 900 arm no longer re-sets the bottom. The same overlay teleports into the takeover, which covers fullscreen.
- **X-1 + L2-4 — `web/src/composables/useWorkspaceForm.ts`:** `split` when the Configurator shell's content box is ≥ 64rem (glass's own threshold). Otherwise `rail` on `(orientation: landscape) and (min-width: 640px)`, otherwise `sheet`. /v and /equation replace `!isDesktop` with `tabbed` (= sheet). Each view's `@media (max-width: 1023px)` sheet rules are re-keyed to `[data-form="sheet"]`.
  - The new `[data-form="rail"]` rules lay the stage (flex 1) and the aside (`clamp(16rem, 38%, 22rem)`) in a row, with glass's detached gap.
  - On /equation the rail puts `.eq-card` and `.eq-plot-card` side by side. The divider moves to the left edge.
  - Short landscape tightens `.app-header` to `--space-residue`. This is the "compact app dock": glass owns the dock's size and ships no compact arm.
  - **INTENT recorded:** the register's arm is `(orientation: landscape) and (max-height: 500px)`. X-1's cure (with L2-4) needs the same side-by-side at 1024×768, so the rail is every landscape form narrower than glass's split.
- **L2-5:** `web/src/components/layout/WorkspaceTabs.vue` is one bar for both views, centred on the column in `--page-gutter`, with no band. Of the register's two arms I took "centred on its axis": glass `SegmentedTabs` has no full-width prop, and no consumer restyle of its internals is lawful.
- **L2-16:** the ToC plate is `w-[calc(100vw - 1rem - env(left) - env(right))]` and `max-h-[min(70dvh, 32rem, calc(var(--reka-popover-content-available-height) - env(bottom) - 0.5rem))]`. The short-landscape `.floating-toc` padding-top is `--space-residue`. Page chip against the plate: "apart" or "plate on top" both before and after. The chip-z limb was not reproduced, so there is nothing to cure.
- **L3-6ˢ:** `:root { --page-gutter: 1rem }` is read by the /v and /equation Configurator margins (8 px at desktop before), the gallery column and its sections (GalleryView, InfiniteGrid, DraftsSection, FeaturedCarousel, AdminBanner, the three admin panels), `.paper-layout` (px-2/sm:px-6 before), `.extractor-page` (padding-inline) and NotFoundCard.
- **L2-17:** the modal `.like-btn` `min-height: 1.5rem` literal is deleted. Glass Button carries `data-control-target`, and its coarse floor is `--touch-target`. The About link is `.about-link` (flex row) with `min-block-size: var(--touch-target)` under `(pointer: coarse)`.
- **X-5:** `.nav-trigger-label` is `display: none` below 24rem. The glyph and chevron stay, and the accessible name ("Navigate — current section …") still carries the section.
- **Adjacent edits (§0bt):**
  - `web/e2e/f-w14u-eq.spec.ts:394-395`: q253 locates the strip row by `.workspace-tabs`, because the `lg:hidden` wrapper it named is retired.
  - `web/e2e/f-w14v-u4.spec.ts:257-260`: u238, the same.
  - Both stay GREEN, with their assertions unchanged (⟨`-g "q253|u238"`⟩ → `3 passed`).
  - `web/e2e/f-w14v-au0.spec.ts:119,154` (fourier `f362b2e`): the plates typed as `Plate[]`, with the `Omit<ViewMetrics>` cast dropped. That was the one vue-tsc error at `a30001d` (TS2352). No assertion changed.

**Gates, BEFORE → AFTER:**
- **Per-row falsifier with CDP insets:** RED ×2 (14/15) → **GREEN ×2** on `:3100` against `:8000` at the committed bytes: ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-au1.spec.ts --project=chromium --workers=2`⟩ → r1 `15 passed (1.3m)` exit 0; r2 `15 passed (1.3m)` exit 0.
- **vue-tsc:** 1 error at `a30001d` (the `.au0` TS2352) → **0**: ⟨`npx vue-tsc --noEmit; echo $?`⟩ → exit 0, 0 `error TS`.
- **vitest:** **GREEN**: ⟨`npx vitest run`⟩ → `Test Files 15 passed (15) · Tests 90 passed (90)`.
- **Frames read** (scratchpad, not committed):
  - 844×390 /v: the rail, stage 64–385 beside the aside, dock above the inset.
  - 844×390 /equation: stage beside the Function layer.
  - 1024×768 /v: the rail, a full-height stage (it was a 288 px strip).
  - 390 /v: the strip centred on the column.
- **Regression sweep:** full chromium e2e on the cured tree, ⟨`npx playwright test --project=chromium --workers=2`⟩ → `19 failed · 3 skipped · 436 passed (16.4m)`. Every failure was re-run on the HEAD `a30001d` worktree (`:3101`) and is the same failure there:
  - contrast-floor ×3, f-w14-residuals G-c1, f-w14-uia UIA-F-17, f-w14u-d d2, f-w14u-vedit v88 (L2-15, `.au2`), f-w14v-c3 c3g/c3m (MAGNET-STATE-HIDDEN / MENU-ICON-GAP) and gallery-admin-a11y ×4 → `13 failed · 57 passed` at HEAD, the identical 13.
  - f-w14v-p p3 ×2 (TOASTER-OFFSET, ESC-p-1) and visual-checkpoint items 1·6·7 / 2 / 5 also fail at HEAD.
  - The one failure green at HEAD, equation-interaction, is a load flake: ⟨`--workers=1`⟩ ×2 on the cured tree → `1 passed` ×2.
  - f-w14v-eq2 flaked under 3 workers (the compute outran its timeouts) and is `6 passed` at `--workers=1`.
  - The tracked `web/e2e/screenshots/f-w14/*.png` the sweep rewrote were restored to HEAD (they are artefacts of this seat's run, not committed).

**Residuals and honest-RED (glass halves, ADOPT-AT-LANDING):**
- L2-2 glass half: the bottom-dock `--safe-block-end` root token (O-74 new ask). The consumer adds `env()` on `.controls-overlay` until it lands.
- L3-6 glass half: a layout-gutter token, with O-68 (absent at glass 10.1.0; ⟨`grep -r gutter dist`⟩ → carousel/turn only). `--page-gutter` is the one consumer line that will read it.
- L2-4 "compact app dock": glass GlassDock has no compact or density arm. The consumer tightened only its own header band (76 → 68 px). The dock's 60 px stays glass's.
- O-77 LAYER-HEADER-LABEL shows in the rail ("De…", "Conto…"), cited, not a new row.

**Escalations:** none.

**Commits:** fourier `48eee99` (falsifier), `cad7518` (cure + adjacent oracles), `f362b2e` (vue-tsc adjacent), pushed (`a30001d..f362b2e`). value.js: this record.

### F.W14V.au2

SERVED MODEL: claude-opus-5-5 · workspace /w /v (AUDIT-2 L2-8 L2-15 L2-19 L3-5ˢ L3-7ˢ L1-7 L1-8 L1-11 L1-16ˢ L1-23; cite L1-26 L3-8..L3-11). fourier base `f362b2e`.

**Crash-recovery (Act 0).** ⟨`git status --porcelain | grep 'web/(src|e2e)/'`⟩ → `?? web/e2e/f-w14v-au2.spec.ts` (160 lines) and `?? web/e2e/zz-au2-probe.spec.ts` (33 lines). Both are the dead predecessor seat's (§0dq: "`.au2` died"). I read both whole. The falsifier's L2-8, L2-15 and L2-19 limbs conform and were kept. Its header named X-2/X-3/X-4 limbs that were never written; those were dropped from the header (see residual R-3). I added the 768 width to L2-19 and appended the L3-5ˢ and L1-11 limbs. The probe was a measuring tool; I reused it for Acts 1–2 and deleted it before the last commit. Inherited paths: `web/e2e/f-w14v-au2.spec.ts` (finished, committed `c8bd170`) and `web/e2e/zz-au2-probe.spec.ts` (deleted, never committed).

**Act 1: measured at HEAD (probe, 1 run each).**
- L2-19: the expanded animation dock's `dock-layer--full` is sw 270 / cw 270 at 390 and 888/888 at 1440. At `69af796`, `.au0` measured 272/266. The `.au1` shell change `cad7518` (gutter and plate width) moved the layer, and the 6 px overflow is gone. There is no `.au2` cure.
- L3-5ˢ: the ancestry from the first `.configurator-layer` up to `aside.configurator-aside` holds no painted box at 1440, 390 or 768: only `viz-panel-left` (padding 8px, transparent) and the wraps. The consumer Card was deleted at `239845f` (addendum (b)). The two rims left are glass's aside card and glass's layer border. The consumer 8 px inset stays: without glass's flush arm it keeps the layer rim off the aside rim.
- L2-15: the editor `dock-layer--full` is 243 px of content inside 167 (360), 197 (390) and 237 (430). The plate at 360 is 310 = 24 padding + 113 persistent (`N pts` Metric 67 + Save 40 + gap) + 6 + 167. The row holds Undo, Redo, separator, Delete, View options and More editor tools. At 360, View options and More editor tools are wholly outside the plate.
- L2-8: glass `DialogContent` `scroll` → `max-h-[calc(100dvh-2rem)] overflow-y-auto` (dist `DialogContent-*.js:118`). ExportModal passes nothing.
- L1-11: /v loaded has one `input[type=file]`, and it is ImageUpload's (it has no testid). The view's `image-file-input` lives inside the empty-state `v-if`. Two `useImageUpload` instances, with the layer's drop target nested in the view's.
- Glass 10.1.0: `LabeledFieldLayout = "default" | "horizontal"` (no settings-row arm, so L3-7ˢ is not landed). The Slider types have no scrub session (L1-16 glass half not landed).

**Act 2: falsifier, RED before (`c8bd170`).** ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-au2.spec.ts --project=chromium --workers=3 --reporter=line`⟩ ×2 at `f362b2e` → run 1 `5 failed · 7 passed`; run 2 `5 failed · 7 passed`. The five failures are the same in both runs:
- L2-8: `{"top":-40.7,"bottom":430.7,"h":471.4,"vh":390,"sh":469,"ch":469,"oy":"visible"}`.
- L2-15 at 360, 390 and 430: scrollers 243/167, 243/197 and 243/237.
- L1-11: "Replace summons the view's one input" fails.

Green before the cure, on both runs: L2-19 at 360/390/430/768/1440 (`[]`) and L3-5ˢ at 1440 and 390 (`painted: []`). These are recorded as green-before-cure findings, cured earlier at `cad7518` and `239845f`. ⟨`npx vitest run src/lib/niceStep.test.ts`⟩ ×2 → `Cannot find module './niceStep'`, so L1-23 is RED ×2.

**Act 3: cures (one commit per meaning, fourier, pushed `f362b2e..1a8112a` to `origin/m/w1-bump-migration`).**
- `60cc819` **L2-8 CURED.** `ExportModal.vue:86` `<DialogContent scroll>` uses glass's own arm. The glass default cap is the O-74 ask, ADOPT-AT-LANDING.
- `58f1d75` **L1-23 CURED.** `web/src/lib/niceStep.ts` `niceStep(raw)` is the one 1-2-5 ladder. `equation/lib/grid.ts` imports it: `niceStep((maxX-minX)/Math.max(4, plotW/60))` gives the same raw step as the deleted `niceStep(range, count)`. `visualization/lib/canvas-drawing/grid.ts` imports it: `niceStep(40/scale)`, with its inline copy deleted. **Location intent:** the register's "L1-24's shared/canvas" does not exist at HEAD (L1-24 belongs to `.au6`). `src/lib/` is the app's home for pure helpers (`time.ts`, `bases.ts`), so the helper went there.
- `e58611d` **L1-16ˢ, consumer half landed.** `FourierTimeline.vue` moved from `visualization/` to `components/shared/`, and the two importers were updated (AnimationControls, equation ConvergenceTimeline). The naming limb was already cured at UIA-F-239. The session cut (axis and readout only) waits for glass Slider's scrub session: **ADOPT-AT-LANDING** (O-74, L1-16 ask).
- `1a8112a` **L1-11 CURED.** VisualizationView is the one upload owner. It holds one `useImageUpload` and one `image-file-input`, placed at the view root outside every `v-if`, and it provides `{openPicker, isDragging, preview}` under `IMAGE_UPLOAD_KEY` (read with `useImageUploadContext()`, which throws if the view is absent). ImageUpload is presentation only: its instance, its input and its nested drop target are deleted. The preview clears on a new `imageSlug` in the owner.

**Act 4: the rows with no code landing.**
- **L2-19: CURED at HEAD by `cad7518`** (`.au1`). The falsifier is GREEN ×2 before and after at 360/390/430/768/1440. No `.au2` edit.
- **L3-5ˢ: CURED-BY-TWIN** at `239845f` (addendum (b); the `.s` Card was deleted). The falsifier is GREEN ×2 before and after. The second rim (the layer border inside glass's aside card) is the glass ConfiguratorLayer flush arm (O-74 rider): **ADOPT-AT-LANDING**. The consumer 8 px inset is kept until then (see Act 1).
- **L3-7ˢ: ADOPT-AT-LANDING** (O-74, the LabeledSwitch settings-row arm, absent at glass 10.1.0). The consumer drops `layout="horizontal"` when the arm lands. No consumer re-layout in the meantime (that would be a copied producer geometry).
- **L1-7: CURED-BY-TWIN** UIA-F-79 (`.u1` `64a1865`, one `ViewLayersMenu` in both docks), cited.
- **L1-8: ADOPT-AT-LANDING** O-74a E-3 (a glass preset strip or select over one named-curve catalogue, after which "the three consumer copies are retired"). Minting a consumer EasingPresetSelect now would build the copy E-3 retires. `.au0` R-2 homes the row's convergence with `.au3`, and it is cited there.
- **Cited under earlier ids:** L1-26 (UIA-F-14, `.u1`), L3-8 reset limb (CONFIGURATOR-HEADER-ACTIONS `239845f`; truncation limb O-77 HELD), L3-9 (UIA-F-238/F-85/F-204), L3-10 (UIA-F-169/F-74; `.au0` notes that the phone first-tab limb is still open), L3-11 (UIA-F-69/F-165).

**Act 5: after the cure (final bytes `1a8112a`).**
- ⟨falsifier⟩ ×2 → run 1 `3 failed · 9 passed (29.6s)`; run 2 `3 failed · 9 passed (27.0s)`. L2-8 now reads `{"top":16,"bottom":374,"h":358,"ch":356,"oy":"auto"}`. L1-11 reads 1 input on /w and 1 on /v, and Replace opens `image-file-input`. L2-19 and L3-5ˢ are green. The 3 failures are L2-15 at 360, 390 and 430 (unchanged 243/167, 243/197, 243/237).
- ⟨vitest `niceStep.test.ts`⟩ ×2 → `2 passed` on both runs.
- Neighbours ⟨`playwright test f-w13-image-empty f-w13-image-controls f-w14u-vstage f-w14v-u4 workspace-flow visualization-ux --project=chromium`⟩ → `50 passed (54.2s)`.
- **vue-tsc** 0 → **0** (⟨`npx vue-tsc --noEmit`⟩ exit 0, 0 `error TS`, run twice on these bytes).
- **vitest** 90/90 (15 files) → **92/92 (16 files)**, `Test Files 16 passed (16) · Tests 92 passed (92)`.

**Escalation ESC-au2-1: L2-15, the expanded editor dock at 360/390/430. Honest-RED; a ruling is needed.** The register's cure is "Per UIA-F-88: tool count against the dock cap". At the true bytes the full row needs 243 px and has 167/197/237, so it is 76/46/6 px short. The row is 5 tools because `.u1` (F-79 / L1-7, one `ViewLayersMenu` in both docks) put View options back beside F-88's More-tools menu. The consumer levers each collide with a standing ruling:
- (a) Fold View layers into More editor tools. This frees 46 px, which fits 390 exactly (197/197) and not 360. It moves the off-default dot onto the More-tools trigger, which §0dc / `.c3` rule must be glass's seat (MAGNET-STATE-HIDDEN). It also splits F-79's one component.
- (b) Drop or move the persistent `N pts` Metric (73 px) when the dock is expanded. This removes information the vedit F-242 unit placed there.
- (c) Move Delete point into the menu. This demotes a primary editing action.

No single lever clears 360, and every lever is a design ruling, not a defect cure. The glass half is UIA-F-215 (the scroll cue), which the register itself lists under "Still RED". Asked: rule which tools leave the ≤ 390 row, or rule L2-15 honest-RED under UIA-F-215 until the cue lands. The falsifier L2-15 limbs stay committed RED (3 named failures).

**Residuals.**
- R-1: the glass halves L2-8 (default cap), L3-5 (flush arm), L3-7 (settings-row arm), L1-16 (Slider scrub session) and L1-8 (O-74a E-3) are ADOPT-AT-LANDING.
- R-2: L3-10's phone first-tab limb is open under F-74 (cited, not taken).
- R-3: `.au0` routed **X-2** (the More options menu at 1024×768 touches the viewport bottom), **X-3** (the ≥ lg contour-editor aside is one collapsed layer) and **X-4** (768×1024 Controls layers capped at 480 px in a 734 px card; `.viz-panel-left-wrap` `max-width: 480px`, measured 144..624 inside 16..752) to `.au2`. This seat's brief did not list them, so they are left OPEN for the check to home. The predecessor's falsifier header named them, but it had no limbs for them.

**Adjacent edits:** none.

**Commits (fourier):** `c8bd170` (falsifier + vitest), `60cc819` (L2-8), `58f1d75` (L1-23), `e58611d` (L1-16ˢ), `1a8112a` (L1-11), pushed. value.js: this record.

### F.W14V.au3

SERVED MODEL: claude-opus-5-5 · equation and morph (AUDIT-2 L1-5 L1-6 L1-12 L1-13; cite L1-15 L1-20 L3-15; the easing pickers = L1-8 per `.au0` R-2, O-74a E-3). fourier base `1a8112a`.

**Act 0: crash recovery and baseline.** ⟨`git -C fourier-analysis status --porcelain | grep -E '^.. web/(src|e2e)/'`⟩ → empty. No predecessor partial work, nothing inherited. ⟨`npx vue-tsc --noEmit; echo $?`⟩ → 0. ⟨`npx vitest run`⟩ → `16 passed (16)` · `92 passed (92)`. Servers :3100 (vite dev), :8000 (uvicorn), :27018 (mongod) are listening.

**Act 1: anchors re-read at `1a8112a`.**
- L1-5: `EquationPanel.vue:37-62` has its own `fetchSimplified` (notation, budget, fetch, energy, abort guard) and a FadingScroll + `v-html` body. `EquationView.vue` `doSimplify` + `simplifyGeneration` (`:290-325`) is the twin. `EquationResult.vue` holds the Copy, the named `tabindex=0` region and the `safe center` fix. **OPEN.**
- L1-6: `visualization/CoefficientsPanel.vue` (21 lines) and `equation/EqCoefficientsPanel.vue` (99 lines) are both ConfiguratorLayer + CoefficientsSpectrum. The #graph fill left at UIA-F-169, so they differ only in sub, empty text and the note. **OPEN.**
- L1-12: at the true bytes 2 of the 4 sites are already gone. `EquationPanel` has used glass `CardTitle` since `.vedit`, and `CollapsibleSection.vue` is absent (L1-20). The two left are `HarmonicLevelGrid.vue:3` `.card-title` (margin `--space-body`) and `MorphPhaseConfig.vue:8` `.config-card-title` (margin `--space-residue`). **OPEN.**
- L1-13: ⟨`grep -rn cartoon-card web/src`⟩ → live wearers are `HarmonicLevelGrid.vue:2`, `MorphPhaseConfig.vue:3`, `MorphShapePreview.vue:18` and `gallery/BatchActionBar.vue:107`, plus the `@utility` at `style.css:255`. The other hits are prose: EquationView, BasisCanvas and AdminAuditLog moved at `.eq2`/`.u4`/F.W14U. **OPEN** (4 wearers + 1 utility).

**Act 2: falsifier, RED before (`9f59faf`).** The new files are `web/e2e/f-w14v-au3.spec.ts` (7 tests) and `web/src/components/equation/composables/useSimplifiedSeries.test.ts` (vitest). ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-au3.spec.ts --project=chromium --workers=1 --reporter=line`⟩ ×2 at `1a8112a` → `7 failed` on both runs, with the same reasons each time:
- L1-5: `the panel has the series' Copy` (count 0).
- L1-6: `one component mounts both (read src/components/visualization/CoefficientsPanel.vue | src/components/equation/EqCoefficientsPanel.vue)`, read off `__vueParentComponent.type.__file` on the dev server.
- L1-12: `Settle Out is a glass CardTitle in a glass Card`.
- L1-13 /morph: `no element wears .cartoon-card`.
- L1-13 /equation and /visualize: `a probe paints no stamp` (a probe `div.cartoon-card` computes `border-top-width: 2px`).
- L1-13 Surface: `data-slot` is not `surface`.

⟨`npx vitest run …/useSimplifiedSeries.test.ts`⟩ ×2 → `Cannot find module './useSimplifiedSeries'`, so it is RED ×2. `a6fa84c` later changed the L1-12 measure from the title-to-next gap to the rung itself (size, the title's block margins, the header's inset), because the gap differs by anatomy between a card with a description and one without. At the before bytes it stays RED on its first assertion (not glass).

**Act 3: cures (fourier).**
- `5b77972` **L1-13 CURED.**
  - The D.W4.a `@utility cartoon-card` and its two comment blocks leave `style.css`. A one-paragraph retirement note takes their place, and the `@property --legend-inset-top` block between them is kept.
  - The three MorphPhaseConfig cards and HarmonicLevelGrid move to glass `Card`, keeping their family inset. FMD-15's `role="group"` moves to an inner host because glass Card binds its own `role`: `card-*.js` `mergeProps($attrs, {role: selected ? "option" : undefined})`, so a passed role is dropped (measured in the bundle).
  - The morph control moves to glass `Surface as="button"` (`data-slot="surface"`). Its hover keeps only the app's state vocabulary (border mix + scale). The cartoon-stamp growth it composed is gone with the class, and no glass shadow is overridden.
  - BatchActionBar moves to `Card size="sm" shadow` inside a sticky `role="group"` host, following AdminAuditLog's toolbar precedent.
  - Wearers go 4 → 0, and the probe paints `0px`.
- `f20ae5b` **L1-6 CURED.** `shared/CoefficientsPanel.vue` has props `components`, `sub?` (the harmonic count when absent, which keeps FR-EQC-12/D3), `renderedTerms?` (the FR-EQC-1 / UIA-F-35 note) and `emptyText?`, and it forwards `#graph`. /visualize passes `sub="Fourier spectrum"` and /equation passes `renderedTerms`. Both twin files are deleted. **Location intent:** the register names `shared/CoefficientsPanel.vue`, which is used as named.
- `e581e20` **L1-5 CURED.**
  - `components/equation/composables/useSimplifiedSeries.ts` owns the whole flow: the POST, `latex`/`latexSigma`/`energy`, `loading`, the named `error` (an abort is never named), the L·M-2 generation rule and the L·M-7 dispose abort.
  - /equation's `doSimplify` keeps only its display key, `result.latex_sigma`, the cache write and the banner. The route's three display refs are the composable's, seeded from the cache.
  - EquationPanel keeps its debounced drive, and its body is `<EquationResult :latex dense>`. It inherits Copy LaTeX, the named keyboard region and the safe-centre fix.
  - EquationResult's region is now glass `FadingScroll` (it renders `tabindex=0` and `role=region` when named). This is required to keep UIA-F-83's end-cue oracle (`f-w14u-vedit` v83, `.fading-scroll` count 1 with `data-fade-end`) through the merge. Without it, the merged renderer would drop the panel's cue. `/equation` gains the same cue.
  - **Adjacent edits:** `web/e2e/f-w14u-vedit.spec.ts:130` and `:608` read the series at `.eq-scroll-region .katex`, because the panel's `.eq-katex` host is gone.

**Act 4: gates AFTER.**
- Falsifier: ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-au3.spec.ts --project=chromium --workers=1 --reporter=line`⟩ ×2 at `a6fa84c` → run 1 `1 failed · 6 passed`, run 2 `1 failed · 6 passed`. **L1-5, L1-6, L1-13 ×4 GREEN ×2.** L1-12 is RED ×2 and ESCALATED (below).
- vitest: ⟨`npx vitest run …/useSimplifiedSeries.test.ts`⟩ ×2 → `5 passed` ×2.
- **vue-tsc 0 → 0** (⟨`npx vue-tsc --noEmit; echo $?`⟩ ×2 → 0).
- **vitest 92/92 (16 files) → 97/97 (17 files)** ×2.
- Neighbours, one reading each on the final bytes:
  - ⟨`… f-w14u-vedit f-w14u-eq f-w14v-u2 equation-interaction`⟩ → `31 passed · 1 failed`. The failure is vedit v88 = L2-15, the `.au2` honest-RED ESC-au2-1.
  - ⟨`… f-w14u-misc f-w14-control-row f-w14v-eq2 f-w14u-eq f-w14-uia equation-interaction`⟩ → `79 passed · 1 failed`. The failure is control-row G-h, on the CardTitle attempt that is now withdrawn (see ESC-au3-1).
  - ⟨`… f-w14-control-row f-w14u-misc f-w14v-au3 f-w14u-admin gallery-admin-a11y f-w14u-vstage visualization-ux f-w14v-au2 f-w14u-vedit --workers=2`⟩ on the final morph bytes → `117 passed · 9 failed`. The nine are L2-15 ×4 (vedit v88 plus au2 360/390/430, ESC-au2-1), L1-12 ×1 (ESC-au3-1), and gallery-admin-a11y ×4 `aria-hidden-focus` on reka focus guards (F.W14U `.admin` R-1, the named set). **G-h control-row is GREEN on the final bytes.**
- Frames written by the neighbour specs (15 `e2e/screenshots/f-w14/after-page-*.png`) were restored to HEAD. They came from this seat's runs and are not cure evidence.

**Citations.**
- **L1-8 (the easing pickers): ADOPT-AT-LANDING, O-74a E-3.** `EasingPicker.vue` and `MorphPhaseConfig.vue`'s Select converge on glass's EasingCurve marker/preset API when E-3 lands, per the lock. They are unchanged here, with no consumer EasingPresetSelect (the copy E-3 retires). This agrees with the `.au2` receipt.
- **L1-15: HELD, BL-FW14H-1/-2.** `components/ui/SliderControl.vue` retires onto glass LabeledSlider when the thumb+fill and inline-value arms land. This is a cite, not an ask.
- **L1-20: CURED-BY-TWIN** (UIA-F-114, F-171). ⟨`ls web/src/components/ui`⟩ → `SliderControl.vue tooltip`; `CollapsibleSection.vue` is absent.
- **L3-15: CURED-BY-TWIN** per `.au0` (UIA-F-115, F-254, F-162, F-234, F-211, F-206, F-119), cited.

**Escalation ESC-au3-1: L1-12, the card-title rung. The specified cure conflicts with the OA-45 type-scale gate; a ruling is needed.**
- **The cure as specified:** glass `Card` + `CardHeader` + `CardTitle` (+ `CardDescription`) at the two surviving sites.
- **It landed and was measured:** every /morph title became a glass CardTitle, and the au3 L1-12 falsifier went GREEN. But `f-w14-control-row` G-h (the OA-45 "one card hierarchy on glass's scales" gate, green before) went RED: `morph: off the type scale` → `Settle Out=23.6694px, Morph=23.6694px, Settle In=23.6694px, Harmonic Levels=23.6694px`.
- **Cause, at glass 10.1.0 bytes:** `dist/components/card/styles.css` `.card-title{font-size: calc(var(--type-body) * 1.272)}`. That is 23.67 px, between glass's own `--type-subheading` 20.352 and `--type-heading` 25.888 (measured on /morph at 1440), so the producer's CardTitle sits off its own named type scale. The old titles sat on `--type-heading`.
- **Not substituted:** restyling CardTitle's size would restyle glass (lock), and masking the G-h limb would be a workaround. So the CardTitle adoption was withdrawn before commit, and the titles keep their hand-set `--type-heading` rung inside the new glass Card (L1-13). L1-12 stays **OPEN**: the au3 L1-12 falsifier is RED ×2, and G-h is GREEN.
- **Ask (rule one):**
  - (a) Glass puts `.card-title` on a named rung (`--type-heading`, or a named card-title token on the scale). A dated addendum beside O-74 records this, and L1-12 is ADOPT-AT-LANDING, with the consumer adopting CardTitle the day it lands.
  - (b) The owner rules CardTitle's 23.67 px acceptable, and G-h's type limb admits the CardTitle rung. The consumer then adopts now.
- Relay: glass is READ-ONLY and the value.js coordination letters are outside this seat's writable set, so the O-74 addendum is for the wave check or root to send.

**Residuals.**
- R-1: L1-12 (ESC-au3-1).
- R-2: L2-15 ×4 and gallery-admin-a11y ×4 are REDs outside this unit (the ESC-au2-1 and F.W14U `.admin` R-1 named set).
- R-3: `f-w14u-admin.spec.ts:414/432/515` still offer `.cartoon-card.sticky` as a fallback after `[data-admin-toolbar]`. It now matches nothing and is harmless, so it was left untouched (it is not this unit's oracle).

**Adjacent edits:** `web/e2e/f-w14u-vedit.spec.ts:130`, `:608` (L1-5, see Act 3).

**Commits (fourier `m/w1-bump-migration`, pushed to `a6fa84c`):** `9f59faf` (falsifier + vitest), `5b77972` (L1-13), `f20ae5b` (L1-6), `e581e20` (L1-5), `a6fa84c` (L1-12 falsifier measure). value.js: this record.

### F.W14V.au4

SERVED MODEL: claude-opus-5-5 · gallery and admin (AUDIT-2 L1-9 L1-10 L1-27ˢ L2-9 L2-10 L2-11 L3-1ˢ L3-2 L3-3 L3-4, plus `.au0`'s X-8; cite L3-12 L3-13; AdminFlaggedPanel cross-cite value X-W12U `.k`). fourier base `a6fa84c`.

**Act 0: crash recovery and baseline.** ⟨`git -C fourier-analysis status --porcelain`⟩ → `?? .worktrees/` only. Nothing was inherited under `web/src` or `web/e2e`. The servers were listening on :3100 (vite dev), :8000 (uvicorn), :27018 (mongod) and :4190. Baseline gates: vue-tsc 0, and vitest 97/97 (17 files) from the `.au3` receipt at these bytes.

**Act 1: anchors re-measured at `a6fa84c`.** A throwaway probe on :3100 over the `fixtures/gallery` stubs measured the following:
- **L3-1: GREEN at HEAD.** At 1440 the users toolbar is one row: search 1263×36 at y166, sort 93×40 at y164, overflow 36×36 at y166, bar 40 tall. X.F.W14U's UIA-F-194 move of Prune into the overflow cured the register's three-row reading. The consumer half is cited. The glass half (an inline SelectTrigger arm) is **ADOPT-AT-LANDING**.
- **L3-2: GREEN at HEAD.** At 390 the flagged row runs x17–373 and its action group x97–262. UIA-F-110 (one visible action plus a menu) replaced the three-button group the register measured. The row is re-verified after L1-27, below.
- **L2-9: OPEN.** At 360, 390 and 430 the card modal's left gutter is 0, against `--space-section` = 20 px.
- **L2-10: OPEN for user rows only.** The user-row checkbox is 16×16 on touch. The card checkbox is already 44×44 (UIA-F-191).
- **L2-11: OPEN.** The audit ledger at 390 is a table, with no card projection.
- **L3-3: OPEN.** At 1440 the tab strip sits at y96 and the search at y146, on two rows. The "N loaded" row was already gone (UIA-F-247).
- **L3-4: OPEN.** At 390 there is one card per row, each 358 wide.
- **X-8: OPEN.** Both filters are 620 px wide. The action chips are solid `bg-success`.
- **L1-9, L1-10 and L1-27 are structural and OPEN.**
  - L1-9: three confirm machines, in GalleryView, AdminUserList and AdminFlaggedPanel.
  - L1-10: the card draws Crown and Bookmark toggles, the modal a ToggleGroup, and the flagged row its own `handleSetTier` fork ("Kept …").
  - L1-27: users and flagged sit on `admin-row.css`, and the pager is written twice (users, audit).
- **Intent at the true bytes:**
  - L1-10 `{refetch}`: the store's `setTier` already patches in place (F.W4 `.d`), so the option is moot. The fork is deleted instead, and the store answers the settled tier.
  - L1-10 flagged setter: after UIA-F-110 the flagged row's setter is one menu item, "Keep". TierControl therefore mounts on the card and in the modal, and the flagged Keep calls the store.

**Act 2: falsifier, RED before (`d83b01c`).** The new files are `web/e2e/f-w14v-au4.spec.ts` (23 cases) and `web/src/composables/useDestructiveConfirm.test.ts` (vitest).
- ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-au4.spec.ts --project=chromium --workers=2 --reporter=line`⟩ ×2 at `a6fa84c` → run 1 `19 failed · 4 passed (58.1s)`, run 2 `19 failed · 4 passed (1.8m)`. The same 19 failed on both runs:
  - L1-9: `owned by components/shared/ConfirmDialog.vue (read components/visualization/GalleryView.vue < App.vue)`.
  - L1-10 ×2: no `[data-slot=tier-mark]`, and "Tier set to saved" is not visible (the fork toasts "Kept").
  - L1-27: no users DataTable.
  - L2-9 ×6: `left gutter 0 vs --space-section 20`.
  - L2-10: `user row checkbox 16x16`.
  - L2-11 ×3: no `.data-table-cards`.
  - L3-3 ×2, L3-4 ×2 and X-8 (`#audit-action-filter 619.84375px`).
  - The 4 that passed are the L3-1 and L3-2 guards (both themes), which were GREEN at HEAD as Act 1 records.
- ⟨`npx vitest run src/composables/useDestructiveConfirm.test.ts`⟩ ×2 → `Cannot find module './useDestructiveConfirm'`, so it is RED ×2.
- **Instrument amendment `d6925e7`.** L2-11's "sideways pan" limb now counts only `overflow-x: auto|scroll` (the `sr-only` and `truncate` clippers are `hidden`, not pans). It also adds the limb the first cure attempt exposed: the target is painted in its card (> 40 px). At the before bytes it is still RED, on the missing card projection.

**Act 3: cures (fourier, pushed to `67d5ba8`).**
- `4bdc59d` **L1-9 CURED.**
  - `composables/useDestructiveConfirm<I>({busy?})` holds the typed pending intent and the in-flight lock. `ask` and dismiss are refused mid-act, and a caller's own `busy` can serve as the lock. The dialog closes after the act settles.
  - `shared/ConfirmDialog.vue` is the one dialog over glass Dialog: `locked` while busy and `deliberate` otherwise, Cancel disabled in flight, `tone` destructive or neutral, and the words in the host's slot.
  - The gallery single/batch confirm, the users confirm (FR-AUL-32's `busy` is the lock) and the flagged delete confirm migrate. Their copy is unchanged.
- `fd22fb9` **L1-10 CURED.**
  - `gallery/TierMark.vue` is the readout (the tier glyph in its tier token; the name is visible when `labelled`; nothing renders for `normal`), used on the card, in the modal and on the flagged row.
  - `gallery/TierControl.vue` is the setter (glass ToggleGroup `type="single"`, three values, a `compact` icon-only arm with named items), used on the card and in the modal.
  - `stores/gallery.ts` `setTier` is the one mutation and returns the settled tier (`null` on failure). The flagged fork is deleted, and its Keep calls the store.
- `edc0a08` **L2-9 CURED.** `w-full` is dropped from DialogContent, so glass's `min(100% - 2*--space-section, 32rem)` holds and the 28rem cap is kept.
- `724957f` **L2-11 CURED, X-8 CURED** (one file, the audit ledger).
  - L2-11: the DataTable is `responsive`. The target's `max-w-0` truncation clamp is scoped to `[td&]`, because the column class also reaches the card value, where it painted the target 0 px wide. The ledger's name rides a labelled region, since glass names only the table projection. The region sets the inherited `text-small`, so the cards read on the OA-50 admin rung.
  - X-8: both filters are capped at `max-w-[20rem]`, and the IP hash header is `whitespace-nowrap`. A destructive verb keeps its solid destructive tone; every other action is a neutral outline chip (the F-197 precedent).
- `1078586` **L3-3 CURED.** At ≥ sm the chrome is one toolbar row: tabs lead and the search trails at its own `--search-measure`. Below sm the tabs come first, then the search.
- `735c459` **L3-4 CURED.**
  - The grid's measure is named once (the inline style had been spelled twice).
  - The host is an inline-size container. Below 30rem of its own width the public grid is `repeat(2, minmax(0,1fr))`.
  - The card is its own container, with a compact arm under 13rem: the title and one meta line (the age), and the basis chips as glyphs (each name kept for a screen reader).
  - **The admin grid keeps one column.** The select box, the three-state TierControl and Delete each need a 44 px touch target, and a 171 px card cannot seat them. Measured on a frame: the admin controls wrapped to three lines.
- `67d5ba8` **L1-27 consumer half CURED, L2-10 CURED.**
  - Users and flagged move onto glass DataTable (`responsive`), one idiom with the audit log. `admin-row.css` is deleted (154 lines), and L3-2's narrow arm goes with it.
  - AdminUserList goes from 879 to 660 lines. It splits into `AdminUserToolbar.vue` and `AdminUserTable.vue`. The User column leads with the row's glass Checkbox at its own size (L2-10: the `h-4 w-4` literal is gone), then the slug on `text-mono-small` and the suspended badge. Entries, Joined and Seen sit on `text-mono-micro`, and the row menu is in `row-actions`. The list keeps the fetch, the selection, the batch bar, the confirm and the pager.
  - The flagged queue is `AdminFlaggedTable.vue`: Entry (the media column, the flags, and the TierMark when notable), then Owner and Posted. Its last column is `AdminFlaggedActions.vue` (Dismiss visible; Keep and Delete in the menu, per UIA-F-110). **Measured:** glass fixes `.data-table-actions` at `width: 2.5rem` (one icon wide, `glass-ui.css`), and at 390 the Dismiss + menu group overran the card title. The actions therefore ride a column, not the seat.
  - A Tier column was tried. It left an empty labelled "Tier" field on every normal row's card, so the tier rides the entry instead.
  - One pager: `shared/Pager.vue` serves users and audit. Each ledger's name rides a labelled region.
- **Location intent.** The register names `shared/ConfirmDialog.vue` and `shared/Pager.vue`, and both are used as named. The composable lives in `composables/` beside `useOffsetPagination`.

**Act 4: gates AFTER (at `67d5ba8`).**
- Falsifier: ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-au4.spec.ts --project=chromium --workers=2 --reporter=line`⟩ ×2 → `23 passed (31.9s)` and `23 passed (29.2s)`. **Every row is GREEN ×2.**
- vitest: ⟨`npx vitest run src/composables/useDestructiveConfirm.test.ts`⟩ → `5 passed`.
- **vue-tsc 0 → 0** (⟨`npx vue-tsc --noEmit; echo $?`⟩ ×2 → 0).
- **vitest 97/97 (17 files) → 102/102 (18 files)** ×2.
- Neighbours, on the final bytes:
  - ⟨`… f-w14v-au4 f-w14-admin-idiom f-w14-admin-table f-w14u-admin gallery-admin-a11y --workers=4`⟩ → `78 passed · 8 failed`. The 8 were:
    - gallery-admin-a11y ×4, `[serious] aria-hidden-focus` on reka's focus guards. This is F.W14U `.admin` R-1, the named set; it is the only axe rule and it was RED at the base too.
    - G-a Users ×4, "meta lines present". Cured before commit by `data-admin-meta` on the Entries/Joined/Seen values.
  - The re-run ⟨`… f-w14-admin-idiom f-w14v-au4`⟩ → `35 passed`.
  - Wide set ⟨`… visual-checkpoint f-w14-uia f-w14-uia-r2 coarse-pointer contrast-floor f-w14u-gallery gallery f-w14u-admin f-w14-admin-table f-w14v-au0 f-w14v-au1 --workers=4`⟩ → `142 passed · 7 failed`. None is from this unit:
    - contrast-floor ×3: morph and grid pairs (`HLG-37[grid-cell-fill]` …, 18 of 36).
    - visual-checkpoint ×3: the spec waits for `Open img-amber-fox-spiral-one`, but since UIA-F-99 the card is named by its title (`Open ${name}`, a label this unit did not touch). Neither these nor the contrast pairs touch this unit's diff. Whether they are in the banked F.W14U close set was not re-derived here; that is for the wave close.
    - f-w14-uia UIA-F-17: a GPU-export flake, `1 passed` when re-run alone.
  - Earlier readings: after L1-9, ⟨`… f-w14u-admin gallery gallery-admin-a11y f-w14u-gallery --workers=3`⟩ → `61 passed · 4 failed`, the same a11y R-1. After L3-3, ⟨`… f-w14u-gallery gallery f-w14-uia`⟩ → `57 passed · 1 failed` (UIA-F-17, flake).
- Frames written by the neighbour specs (24 `e2e/screenshots/f-w14/after-*.png`) were restored to HEAD. They came from this seat's runs and are not cure evidence. This seat's own frames (1440/390, users, flagged, audit, public, admin phone) are in the session scratchpad, not committed.

**Citations.**
- **L3-12: CURED-BY-TWIN** (UIA-F-99, F-247), per `.au0`. The card and the modal lead with `title ?? slug`, and the slug and age are muted meta (read at `GalleryCard.vue` `name`, `GalleryCardModal.vue` `name`).
- **L3-13: CURED-BY-TWIN** (UIA-F-189), per `.au0`.
- **L3-1 consumer half: cured at HEAD** (UIA-F-194), with the guard GREEN ×2 before and after. The glass SelectTrigger inline arm is **ADOPT-AT-LANDING**.
- **L3-2: cured at HEAD** (UIA-F-110). The guard is GREEN ×2 after the DataTable move, and `admin-row.css` (the register's anchor) is deleted.
- **L1-27 glass half: Pagination (UIA-F-145) is ADOPT-AT-LANDING.** `shared/Pager.vue` is the one seat until it lands.
- **AdminFlaggedPanel cross-cite (value X-W12U `.k`).** Fourier's queue is now glass DataTable plus the shared ConfirmDialog, TierMark and Pager idioms. Per the lock there is one owner per app, and nothing here writes to value.js.
- **Glass asks for the wave check to relay** (glass is READ-ONLY, and the value.js letters are outside this seat's set):
  - (a) DataTable's `row-actions` seat is fixed at 2.5rem, so a row with a visible verb beside its menu cannot use it. Ask for a content-sized arm.
  - (b) DataTable names only the table projection (`aria-label` goes to the cards only when `selectable`). Ask for the label on both projections.
  - (c) The L1-9 useConfirm candidate: six sites across three apps repeat the machine, and fourier's is now one composable.

**Residuals.**
- R-1: gallery-admin-a11y ×4 `aria-hidden-focus` (F.W14U `.admin` R-1, the named set). It is unchanged by this unit.
- R-2: the wide-set REDs outside this unit's diff (contrast-floor ×3, visual-checkpoint ×3), for the wave close's full `--workers=1` reading.
- R-3: glass asks (a)–(c) above are unrelayed; they are for the wave check.

**Escalations:** none.

**Adjacent edits** (same concern, and each keeps its assertions):
- `web/e2e/f-w14-uia.spec.ts` UIA-F-42 (a card's title/`dd` fields) and UIA-F-36 (rows by `data-admin-row`).
- `web/e2e/f-w14-admin-table.spec.ts` G-t: rows are `tbody tr` or `.data-table-card`, and pairs that share no edge are skipped.
- `web/e2e/f-w14-admin-idiom.spec.ts` G-a: rows are `tbody tr` or cards; `[data-admin-row]` is counted; the card title/label/value sizes are read; a field's label comes from its column header or its card `dt`.
- `web/e2e/f-w14u-admin.spec.ts`: `openAudit` (table row or card), `flaggedRow` and a193 (rows by `data-admin-row`).
- `web/e2e/f-w14v-au0.spec.ts` `walkAudit` (table row or card).

**Commits (fourier `m/w1-bump-migration`, pushed to `67d5ba8`):**
- `d83b01c`: falsifier + vitest.
- `4bdc59d`: L1-9.
- `fd22fb9`: L1-10.
- `edc0a08`: L2-9.
- `d6925e7`: L2-11 instrument amendment.
- `724957f`: L2-11 + X-8.
- `1078586`: L3-3.
- `41387d5`: L2-11 adjacent oracle waits.
- `735c459`: L3-4.
- `67d5ba8`: L1-27ˢ + L2-10.

value.js: this record.

### F.W14V.au5

SERVED MODEL: claude-opus-5-5. Paper family: A2-FO-L1-1, L1-2ˢ, L1-4ˢ, L1-18ˢ, L1-19; L1-3 cited. fourier `67d5ba8` → `ba4efa9` (pushed; ⟨`git ls-remote origin m/w1-bump-migration`⟩ → `ba4efa9edc82`).

**Act 0: crash recovery and anchors.** ⟨`git status --porcelain`⟩ → `?? .worktrees/` only, so nothing was inherited in `web/src/**` or `web/e2e/**`. Anchors read at the true bytes:
- `PaperToc.vue` was 909 lines, not 998. It held two hand-rolled trees: rail `:246-330` and floating `:417-468`. They differed in row markup, styles and reach. The rail showed depth 2 only on the active chain; the bar showed every level.
- `cd414b2` (F.W14U .paper) had already deleted PaperView's inline Chapters list and its IntersectionObserver. So three renderings had become two before this unit. That part is cited, not redone.
- glass pin: ⟨`grep '"version"' node_modules/@mkbabb/glass-ui/package.json`⟩ → `10.1.0`. Its exports have no `./search` and no TocTree. `useScrollTo(options)` takes `{scrollContainer, totalCount, visibleCount, scrollOffset?, maxAttempts?, treeIndex?}` and has no teleport arm.
- Baseline gates: ⟨`npx vue-tsc --noEmit`⟩ → exit 0. ⟨`npx vitest run`⟩ → `18 files · 102 passed`.

**Act 1: falsifier authored, RED ×2 on the before bytes** (fourier `2412ea0`, `web/e2e/f-w14v-au5.spec.ts`). ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-au5.spec.ts --project=chromium --workers=1`⟩:
- **L1-1 RED ×2.** Rail counts `{0:13, 1:51}`; bar counts `{0:13, 1:51, 2:34}`. Depth 0, rail against bar: font 16px vs 18.27px, disclosure `xs` vs `sm`, numeral 11.52px vs 12.18px. Depth 1: font 12.48px vs 14px, indent 10 vs 12.
- **L1-19 RED ×2.** The `<main>` write log was `[{/morph,400},{/paper,0},{/morph,0}]`, so /morph was restored to 0 instead of 400. Before the /morph probe, the /gallery form of the test logged two `<main>` writes on /paper. Route choice was measured by a probe of `main` scrollHeight/clientHeight: /gallery, /equation, /visualize and /admin fit; /morph is 1330/820.

**Act 2: L1-19 CURED** (`642c87d`).
- `router/index.ts`: added `RouteMeta.ownsScroll`, and /paper declares it. `App.vue`: the shell skips both the record and the restore when the route owns its scroll. PaperView's section-id restore is now the only mechanism on /paper.
- **Intent at the true bytes:** the shell restore that was kept was itself broken on back/forward. On popstate, `beforeEach` recomputed `historyKey()` after the history state had already moved to the target entry. The leaving offset was therefore filed under the arriving entry. The key is now captured when an entry is entered, and at setup for the first entry.
- Result: GREEN ×2.

**Act 3: L1-1 ⊕ L1-2ˢ CURED** (`395d638`). `PaperToc.vue` is deleted and split into three files:
- **`PaperTocTree.vue` (215 lines).** One recursive `<li v-for>` over the injected model and one row markup at every depth: glass Button `sm`, the numeral, and an `xs` chapter disclosure driven by the model's `isExpanded`/`toggleSection`. One reach: an expanded chapter shows every level below it. One active treatment: `aria-current` in `--toc-accent`, with a chapter current on its chain through `isInActiveChain`. The row style is the drawer's (F.W14.r canon, UIA-F-156/F-147).
- **`PaperTocDrawer.vue` (296 lines).** The desktop drawer.
- **`PaperTocBar.vue` (287 lines).** The phone bar. A chosen row emits `navigate`, which closes the Popover.
- **Intent at the true bytes:** the mobile host stays glass Popover, the UIA-F-67 cure that `.au1` L2-16 tuned, rather than the register's Sheet. It is named `PaperTocBar`, not `PaperTocSheet`.
- **L1-2ˢ:** `PaperTocTree` is the one seam that glass's TocTree replaces at landing (ADOPT-AT-LANDING).
- **Adjacent edits (§0bt; no assertion removed):**
  - `web/src/style.css:331-336`: focus-ring selectors changed to `.toc-link` and `.floating-toc-top`.
  - `web/scripts/derive-loops.vitest.ts:35-51` BS-1: 6 native `<li v-for>` in PaperToc.vue became 1 in PaperTocTree.vue. The predicate is RED on the before bytes arithmetically: the prior case pinned 6 there. This was not run.
  - Row selectors moved to `.toc-link[data-depth]`, `.toc-row` and `.toc-list`, scoped to their host, in: `web/e2e/f-w14-residuals.spec.ts:25,63`, `f-w14u-paper.spec.ts:36,118,121,124,136,169,307,347,431,432`, `f-w14u-t.spec.ts:231`, `f-w14-uia.spec.ts:381,386,394` and `paper-performance.spec.ts:99,109,122`.
- Result: GREEN ×2.

**Act 4: L1-4ˢ CURED as far as glass's API allows** (`ba4efa9`).
- glass HEAD `src/composables/search/index.ts` exports `useFuzzySearch, buildIndex, searchIndex, fuzzyMatch, clearSearchCache` and is INTERNAL, with no `./search` key at 10.1.0. The paper engine is therefore consumer-owned. It stops shadowing glass's names: `searchIndex` → `searchPaper`, `clearSearchCache` → `clearPaperSearchCache`, `SearchResult` → `PaperSearchResult`.
- The matcher had already left the fork at `cd414b2` (`wordMatch`); ⟨`grep -rn "prevIdx\|multiTokenFuzzy\|fuzzyMatch" web/src`⟩ → empty.
- Falsifier `web/e2e/unit/paper-search-owner.vitest.ts`: RED ×2 before, `2 failed`, then GREEN ×2.
- The publication ruling and the upstreaming of scoring stay glass's (ADOPT-AT-LANDING).

**Act 5: L1-18ˢ ADOPT-AT-LANDING (no code).** At the true bytes, glass 10.1.0 `useScrollTo` cannot host the windowed article. Measured at `dist/sidebar.js:313-360`:
- It grows a prefix `visibleCount` to `rootIndex + 2`, where fourier windows by offset (`ensureTargetWindow`/`getOffsetFor`).
- It settles on `document.getElementById`, with no owning-section resolution for cross-reference ids (`★NAV-1`).
- It scrolls `behavior: "smooth"` with no PRM arm, has no estimate-then-teleport, and uses a fixed `scrollOffset` in place of the scrim clearance.
- Composing its settle loop now would drop PRM and the far-jump teleport. `useScrollNavigation.ts` therefore stays until glass's teleport arm lands (O-74/O-75 ask).

**L1-3 cited:** the two PaperSearch variants are breakpoint-exclusive (UIA-F-22). L1-1's split keeps exactly one PaperSearch per host (the Drawer's `sidebar` variant and the Bar's `floating` variant), still exclusive through the `isDesktop` v-ifs at `PaperView.vue`. The palette is UIA-F-64, CURED at `cd414b2`.

**Residual, X-7** (routed here by `.au0`, not in this seat's row list): the sidebar results plate runs past the 270 px rail. That is the deliberate UIA-F-59 cure: `PaperSearchDropdown.vue:91-99` says "free to run past the rail, never past the viewport's right margin", with `PANEL_MIN_REM = 24`. Curing X-7 would reverse a prior row's ruling. It is **left OPEN for a ruling**; no code.

**Gates (BEFORE → AFTER, each ×2):**

| Gate | Before | After |
|---|---|---|
| L1-1 e2e | RED ×2 | GREEN ×2 |
| L1-19 e2e | RED ×2 | GREEN ×2 (⟨`playwright test e2e/f-w14v-au5.spec.ts`⟩ → `2 passed` ×2) |
| L1-4 vitest | RED ×2 | GREEN ×2 |
| BS-1 derive-loops | RED (arithmetic, not run) | GREEN ×2 (⟨`vitest run e2e/unit/paper-search-owner.vitest.ts scripts/derive-loops.vitest.ts`⟩ → `10 passed` ×2) |
| vue-tsc | 0 | 0 ×2 |
| vitest | 102/102 (18 files) | **104/104 (19 files) ×2** |

Neighbour oracles, run once after the cure:
- ⟨`playwright test f-w14u-paper f-w14-residuals f-w13-radius paper-performance f-w14v-au1 --project=chromium --workers=1`⟩ → `1 failed · 49 passed`. The one failure is f-w14-residuals **G-c1**, the image-sidebar upload case in the named pre-existing set (`.au1` receipt `:709`). Nothing on the paper is touched by it.
- f-w14-uia "tapping a chapter row…" + f-w14u-t t6 → `3 passed`.

**Commits (fourier):** `2412ea0` (falsifier) · `642c87d` (L1-19) · `395d638` (L1-1 ⊕ L1-2ˢ) · `ba4efa9` (L1-4ˢ). A sibling `35b3464` (F.CT bench) interleaved and was not touched; nor were `bench/` and `tests/test_contour_bench.py`.

**Dispositions:** L1-1 CURED · L1-19 CURED · L1-2ˢ CURED-to-seam + ADOPT-AT-LANDING (TocTree) · L1-4ˢ CURED (names) + ADOPT-AT-LANDING (publication) · L1-18ˢ ADOPT-AT-LANDING (measured) · L1-3 cited · X-7 OPEN for a ruling (conflicts with UIA-F-59). Self-count: 5 rows + 1 cite + 1 X row = 7 dispositions.

### F.W14V.au6

SERVED MODEL: claude-opus-5-5. Cross-app / lib / shell family: A2-FO-L1-14ˢ, L1-17, L1-21, L1-22, L1-24, L1-25, L1-28ˢ; the one search-with-glyph field (F-W14U addendum (e)); the useSafeStorage cross-cite; L2-18ˢ and L3-14 HELD; X-6 cited. fourier `ba4efa9` → `82423c4` (branch `m/w1-bump-migration`).

**Act 0: crash recovery, anchors, baseline.** ⟨`git status --porcelain`⟩ → `?? .worktrees/` only, so nothing was inherited in `web/src/**` or `web/e2e/**`. During the unit a sibling (F.CT) had `bench/contours/harness.py`, `src/fourier_analysis/contours/*.py`, `shortest_tour.py` and `tests/test_shortest_tour.py` dirty; none of them was touched. Baseline gates: ⟨`npx vue-tsc --noEmit`⟩ → exit 0; ⟨`npx vitest run`⟩ → `19 files · 104 passed`. Anchors read at the true bytes (drifts get the intent at the true bytes, recorded per act):
- glass pin 10.1.0. ⟨`cat dist/components/tooltip/index.d.ts`⟩ → `Tooltip · TooltipContent · TooltipTrigger · TooltipProvider` only, with no compact single-component tooltip. ⟨`cat dist/components/input/types.d.ts`⟩ → `InputProps` has no leading-adornment slot or prop. `dist/command-*.js` → `CommandInput` draws its own `Search` glyph.
- ⟨`grep -rn animate-spin web/src | wc -l`⟩ → `0`.
- `useSafeStorage.ts` is no longer byte-identical to value's: ⟨`diff value.js/demo/platform/storage/useSafeStorage.ts fourier-analysis/web/src/composables/useSafeStorage.ts`⟩ → fourier's adds `safeStorage(area)` and `Storage | null` parameters (UIA-F-120/F-213: reading `window.localStorage` itself throws when site data is blocked).
- `FrequencyGraph.vue` had no importer: ⟨`grep -rn FrequencyGraph src e2e scripts`⟩ → comments only. It became an orphan when `9a1d932` (UIA-F-169) kept one amplitude view.
- `problemMessage` already lives in `lib/api-problem.ts` (adminError.ts retired, UIA-F-121). `stores/gallery.ts` imports no component helper. `admin-row.css` is already deleted. `niceStep` is `lib/niceStep.ts` (`.au2` L1-23). `components/ui/` holds `SliderControl.vue` and `tooltip/` only.
- `VisualizationView.vue` no longer imports `useToast`; `composables/useMorphConfig.ts` does. So the 7 importers are gallery store, GalleryView, AdminFlaggedPanel, UserSlugBar, AdminUserList, useWorkspaceLoader and useMorphConfig.
- The search sites: `PaperSearchModal.vue:130` is glass `CommandInput` since UIA-F-64 (`cd414b2`), not a hand-rolled copy. `AdminUserList.vue:384` moved to `AdminUserToolbar.vue` at UIA-F-194. That leaves three hand-rolled hosts.

**Act 1: falsifiers authored, RED ×2 on the before bytes** (fourier `a591669`).
- `web/e2e/unit/f-w14v-au6.vitest.ts` reads the module graph: the file set (`import.meta.glob` keys), the modules' exports, and the specifiers of the importers a row names. ⟨`npx vitest run e2e/unit/f-w14v-au6.vitest.ts`⟩ ×2 → `12 failed (12)` both runs. The limbs: L1-17 (1), L1-21 (1), L1-22 (3, including "every component file has an importer", which caught `FrequencyGraph.vue`), L1-24 (4: a–d), L1-25 (2), and the search field (1).
- `web/e2e/f-w14v-au6.spec.ts` checks L1-24 (d) against the served bytes. ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-au6.spec.ts --project=chromium --workers=1`⟩ ×2 → `1 failed · 1 passed` both runs: the production limb (`:4190` `/demo/shape-extractor` is not the not-found page) failed, and the dev limb passed.

**Act 2: L1-22 CURED** (`950638c`).
- Deleted `evaluateBasis` and the `evaluateChebyshev`/`evaluateLegendre` that only it reached, plus `loadDraftByVisualizationSlug`. The IndexedDB `by-visualization-slug` index is schema and stays.
- `lib/bases.ts` is deleted. Its `fourierPositionsAt` is folded into `lib/evaluators.ts`, which now exports exactly `evaluateFourier` and `fourierPositionsAt`, and its 3 importers were repointed.
- **Intent at the true bytes:** the orphan `FrequencyGraph.vue` is deleted, along with the `#graph` slot that `CoefficientsSpectrum`/`CoefficientsPanel` forwarded to no filler.
- Result: L1-22 limbs RED → GREEN.

**Act 3: L1-21 CURED** (`6fbbf23`).
- `composables/useToast.ts` is deleted. Every site calls glass `toast({ title, description, tone, action })` directly.
- Each toast has a real title, the act itself. UIA-F-214 stands: no tone echo, and ⟨s214⟩ is GREEN.
- A failure's description is the server's own word, from the new `problemDetail` (`problemMessage = problemDetail ?? fallback`).
- The shim's one policy datum (an actionable error waits for the person, UIA-F-214) is `ERROR_TOAST` in `lib/toast-policy.ts`, which error sites spread.
- The publish View action is glass `ToastAction`, built by `viewAction()` in the gallery store (UIA-F-248/F-183).
- Toast oracles ⟨`playwright test f-w14u-shell f-w14u-misc f-w14u-gallery f-w14v-u3 f-w14v-p -g "toast|…"`⟩ → `12 passed · 2 failed`. The 2 are p3 @1440/@1024, the standing honest-RED **TOASTER-OFFSET** (ESC-p-1, `.p` receipt). They show the same 95 px toast box over the aside as `.p` measured.

**Act 4: L1-24 ⊕ L1-17 CURED** (`68eed53`).
- (a) `components/gallery/` holds GalleryView, the Gallery* parts, TierMark and TierControl. `components/admin/` holds Admin* and BatchActionBar. `components/auth/UserSlugBar.vue` is L1-17. `components/visualization/gallery/` is gone.
- (b) `useCanvasSetup` and its `CanvasSurface` type move to `components/shared/canvas/`, and `NotationPills` to `components/shared/`. equation/ now imports nothing from visualization/.
- (c) `components/equation/lib/{grid,harmonics,hit-test}.ts` and `harmonics.test.ts` move into `lib/equation/`.
- (d) `components/dev/FourierShapeExtractor.vue`. Its route is registered only under `import.meta.env.DEV`.
- (e) `components/ui/` keeps `SliderControl` and `tooltip` until L1-15 and L1-14 retire them.
- **Adjacent edits (§0bt, no assertion removed):**
  - `e2e/f-w14-dpr.spec.ts:4`: the `backingSize` import path.
  - `e2e/f-w14v-au4.spec.ts:151`: the `ownedBy` path, `gallery/` → `admin/AdminUserToolbar.vue`.
  - `e2e/f-w14u-misc.spec.ts:392-397`: r120's production read of `/demo/shape-extractor` now asserts the dev-only route's production answer, the not-found h1, still with storage blocked and zero page errors.
- ⟨`playwright test f-w14v-au6 f-w14v-au4 f-w14-dpr f-w14u-misc --project=chromium --workers=1`⟩ → `51 passed (1.9m)`. The preview was rebuilt from these bytes: the stale `:4190` from 03:15 was stopped first so that `webServer` rebuilt it.

**Act 5: L1-25 CURED** (`ef5678e`).
- The route table is `router/routes.ts`. Each section is declared once, on its route: `meta.tab` (kept) plus `meta.nav {label, icon, order}` on the one route that names the section.
- `sectionNav(records)` derives the list and skips alias records. ⟨`node -e …createRouter(…alias:["/visualize"]…).getRoutes()`⟩ → `[['/w/:s?',false],['/visualize',true]]`, so without the skip the alias would be a second Visualize.
- `AppDock` reads `sectionNav(router.getRoutes())` and keeps no list. `getSavedTab` reads the same records.
- **Intent at the true bytes:** `VALID_TABS` and the afterEach writer had already become `meta.tab` (UIA-F-212). The register's `group` is `order` here: there is one group, and `getRoutes()` returns matchers by path rank, not in declaration order.
- The falsifier gained a live memory-history router limb in the same commit.
- ⟨`playwright test f-w14u-shell f-w14u-misc --project=chromium --workers=1`⟩ → `49 passed (1.6m)`.

**Act 6: the search-with-glyph field CURED** (`82423c4`).
- `components/shared/SearchField.vue` has:
  - glass `Input` with the glyph after it in tree order (UIA-F-106);
  - a `<label>` root (MISS-DU4);
  - an `#actions` seat, whose run the host reserves with `--search-field-end`;
  - one anatomy per size;
  - with actions, the engine's cancel glyph withdrawn (UIA-F-184).
- `class`/`style` place the field; every other attribute rides to the Input.
- The three hosts mount it:
  - PaperSearchInput keeps its type register through `:deep(.search-field-input)`.
  - AdminUserToolbar uses `sm`.
  - GallerySearchBar is named by `aria-label`, so the wrapping label's content does not fold the actions' names into it.
- Measured at 1440 (one bounded probe): gallery and paper both show `glyph 16px @ 12px · padStart 40px · h 40`, with padEnd 76 / 36 px. The before values, read from the source rules and not measured: paper 0.8rem @ 0.75rem / 1.875rem, gallery 16px @ 0.75rem / 2.25rem, admin 0.875rem @ 0.5rem / 1.75rem. Admin's `sm` anatomy is now 0.875rem @ 0.5rem / 1.875rem by the rule; it was not probed.
- Consumer-owned until glass Input gains a leading-adornment slot (O-74 §10).
- ⟨`playwright test paper-search f-w14u-paper f-w14-uia f-w14u-admin f-w14v-au4 f-w14u-gallery --project=chromium --workers=1`⟩ → `133 passed · 1 failed`. The failure is f-w14-uia UIA-F-17 `:162` (the Export frame dock control not visible), which is in the named pre-existing set.

**Act 7: the rows without consumer code.**
- **L1-14ˢ ADOPT-AT-LANDING.** At the pin, glass `./tooltip` exports the four decomposed parts and nothing else (Act 0). Deleting `components/ui/tooltip` now would spell three elements at every call site (⟨`grep -rn 'from "@/components/ui/tooltip"' web/src | wc -l`⟩ → `9` files), which is the repetition the row asks glass to end. The shim goes when glass's compact Tooltip lands (O-74 new ask L1-14).
- **L1-28ˢ CURED-BY-TWIN** (`.au0`, confirmed): ⟨`grep -rn animate-spin web/src | wc -l`⟩ → `0`. The glass half (a public DotRing busy primitive, UIA-F-72) is still RED under its id.
- **L1-17 glass half:** the presentation-only DockAccount/SlugIdentity stays a glass candidate. The consumer move is Act 4.
- **useSafeStorage cross-cite** (value X-W12U `.k` item 4): the files are no longer byte-identical. fourier's is the superset: `safeStorage(area)` resolves the area inside the guard, because reading `window.localStorage` itself throws with site data blocked (UIA-F-120/F-213). One owner per app. Unless glass rules a shared home, value's `.k` should adopt fourier's area resolver rather than fourier adopting value's. No fourier code.
- **AdminFlaggedPanel cross-cite:** `.au4` recorded it. The file is now `components/admin/AdminFlaggedPanel.vue`.
- **Easing pickers** (O-74a E-3): `.au3` holds them, ADOPT-AT-LANDING. Not this unit's.
- **A2-FO-L2-18ˢ HELD** and **A2-FO-L3-14 HELD** (O-74a E-2, the §11 type rows): no consumer edit while glass rules on the text-micro coarse step and the ui-scale/emphasis ladder.
- **A2-FO-X-6 cited:** MENU-ICON-GAP (O-76 addendum (a), ESC-c3-1) plus L2-12, both glass-held.

**Act 8: the final regression (full e2e `--workers=1`).** ⟨`FW14_PHASE=au6-r<n> MONGO_URI=mongodb://127.0.0.1:27018/fourier BASE_URL=http://localhost:3100 npx playwright test --workers=1 --reporter=line`⟩ at fourier `82423c4`. The suite is 513 cases: the three projects, with this wave's specs added since the F.W14U banked 401. The `:4190` preview was rebuilt by `webServer` from these bytes.
- **Run 1** (load 67.9 → 27.3): **`23 failed · 3 skipped · 487 passed (33.7m)`**.
  - 21 of the 23 are the standing named set:
    - F.W14U: contrast-floor `:82` ×2 and `:128`; gallery-admin-a11y ×4 (all four `[serious] aria-hidden-focus`, as before); visual-checkpoint `:81 :102 :123`.
    - This wave's honest-REDs: f-w14-residuals G-c1; f-w14u-d d2; f-w14u-vedit v88; f-w14v-au2 L2-15 ×3 (ESC-au2-1); f-w14v-au3 L1-12 (ESC-au3-1); f-w14v-c3 c3m/c3g (MAGNET-STATE-HIDDEN / MENU-ICON-GAP); f-w14v-p p3 ×2 (TOASTER-OFFSET).
  - Two are outside the set:
    - (i) f-w14u-vdock `:279` v181, a 120 s click timeout on the canvas dock's `Export frame` (not visible). `.u4` recorded the same case as run-1-only under load. Alone, ⟨`playwright test e2e/f-w14u-vdock.spec.ts:279 --workers=1`⟩ ×2 → passed ×2.
    - (ii) mobile-chromium visual-checkpoint `:199` (@coarse item 4, the `Auto-select harmonics by Parseval energy` wand button): `3 pixels (ratio 0.01)` differ. It is RED alone ×2 at HEAD and **RED ×2 at the before bytes**. To read the before bytes, `ba4efa9` was served from a scratchpad `git worktree` on `:3199`, run as ⟨`BASE_URL=http://localhost:3199 npx playwright test e2e/visual-checkpoint.spec.ts:199`⟩ ×2 → `3 pixels` both runs, and then torn down. So it predates this unit. au6's only edit on /equation is `FunctionInput.vue`'s NotationPills import path. It is left for the Check. It was GREEN at F.W14U Repair 1 (`a926748`), and the candidate movers are this wave's /equation units (`0e817fd` `.eq2`, `5b77972` `.au3`, `cad7518` `.au1`), which ran no full e2e. Not re-baselined: it is not this unit's golden, and the diff is unread by its owner.
- **Run 2** (load 31.9 → 225.6): **`23 failed · 3 skipped · 487 passed (35.9m)`**.
  - Two earlier launches of this run died in the global seed before any case ran (`TimeoutError: apiRequestContext.post: Timeout 30000ms exceeded`, `POST /api/sessions` through `:3100` while the host was loaded). This was the instrument, not the product: ⟨`curl -X POST :3100/api/sessions`⟩ → `200` in 0.02 s straight after. The third launch ran to the end.
  - ⟨`diff` of the two runs' sorted failure lists⟩ → exactly one line differs: run 1's v181 is run 2's f-w14u-vedit `:149` **v87** (the selected handle's ring opacity read `0.69492 < 0.9` mid-transition).
  - Alone, ⟨`playwright test e2e/f-w14u-vedit.spec.ts:149 --project=chromium --workers=1`⟩ ×2 → `1 passed`, then `1 failed`, so it is intermittent at these bytes. au6 did not touch the contour editor: its visualization/ edits are import paths and the `CanvasSurface` type home only (⟨`git diff -M ba4efa9 82423c4 --stat -- web/src/components/visualization`⟩).
  - Both runs otherwise hold the named set, plus vc `:199`, which predates this unit (above).
- **Reading:** within the named set plus two load-timing intermittents (v181, v87), each GREEN alone at least once, and one pre-existing outside-set RED (vc `:199`, RED at the before bytes). None is attributable to au6 by bytes.

**Gates (BEFORE → AFTER, each ×2):**

| Gate | Before | After |
|---|---|---|
| per-row falsifier `e2e/unit/f-w14v-au6.vitest.ts` | RED ×2 (`12 failed (12)`) | **GREEN ×2** (`12 passed (12)` · `12 passed (12)`) |
| L1-24 (d) served falsifier `e2e/f-w14v-au6.spec.ts` | RED ×2 (prod limb; dev limb passed) | **GREEN** (`2 passed`, in the 51-case neighbour run, and in both full runs) |
| vue-tsc | 0 | **0 ×2** (⟨`npx vue-tsc --noEmit; echo $?`⟩ → `tsc 0` · `tsc 0`) |
| vitest | 104/104 (19 files) | **116/116 (20 files) ×2** |
| full e2e `--workers=1` | named set (banked, F.W14U) | r1 `23 failed · 487 passed` · r2 `23 failed · 487 passed`: named set + v181/v87 intermittents + vc `:199` (pre-existing) |

**Commits (fourier; pushed as ⟨`git push origin 82423c4:refs/heads/m/w1-bump-migration`⟩ → ⟨`git ls-remote origin m/w1-bump-migration`⟩ `82423c443eb4`, a fast-forward that carries only this unit's commits):** `a591669` (falsifiers) · `950638c` (L1-22) · `6fbbf23` (L1-21) · `68eed53` (L1-24 ⊕ L1-17) · `ef5678e` (L1-25, plus the falsifier's live-router limb) · `82423c4` (the search field). Siblings interleaved after `82423c4`: F.CT `4c38b12` `94a60bf` `03e5e1c`, none under `web/`. They were not touched.

**Inherited paths:** none. **Adjacent edits:** `e2e/f-w14-dpr.spec.ts:4`, `e2e/f-w14v-au4.spec.ts:151`, `e2e/f-w14u-misc.spec.ts:392-397` (Act 4, each a path or route move the cure made; no assertion removed).

**Dispositions:**
- CURED: L1-17 (consumer), L1-21, L1-22, L1-24, L1-25, and the search-with-glyph field.
- ADOPT-AT-LANDING: L1-14ˢ (O-74 compact Tooltip); the search field's glass half (O-74 §10 leading adornment); L1-17's glass candidate.
- CURED-BY-TWIN: L1-28ˢ (glass DotRing still RED, UIA-F-72).
- HELD: L2-18ˢ and L3-14 (O-74a E-2).
- Cited: X-6. Cross-cited: useSafeStorage (value X-W12U `.k`; fourier's is the superset) and AdminFlaggedPanel.
- Self-count: 9 register rows (L1-14 L1-17 L1-21 L1-22 L1-24 L1-25 L1-28 L2-18 L3-14) + 1 X row + 1 addendum-(e) item (the field) + 2 cross-cites = 13 dispositions.

**Residuals (for the Check):**
- (R-1) vc `:199` mobile, 3 px on the /equation wand button. RED at the before bytes, so it is not this unit's. It needs its owner to read the diff, or to cure it (candidates `0e817fd`/`5b77972`/`cad7518`).
- (R-2) The v181 and v87 load intermittents (one each, in different runs).
- (R-3) Out of scope and unowned by any unit in the plan: F-W14V.md **addendum (d)** (COHESION §0ds, 2026-09-25: every `web/e2e/**` upload moves to `assets/portraits/daraksha.jpg` through one fixture constant) landed after this wave's plan was written, and no unit row carries it. It is for the close/Check to home.
- **Escalations:** none.

## Close

SERVED MODEL: claude-opus-5-5 · 2026-09-25 · CLOSE SEAT (second sitting), Track C, verify-only, no cure. The spec `F-W14V.md` was read whole at 67 lines, addenda (a)–(g). From the record I read the header through `## Unit plan`, then each receipt's status and commit lines by grep. I also read the late units' receipts: `fourier/evidence/W14V/nav/RECEIPT.md` (`.nav` + `.dm`) and `…/pd/RECEIPT.md` (`.pd`). fourier HEAD = `79ea9f6` (branch `m/w1-bump-migration`, 2 ahead of origin at open). value.js HEAD = `08353549`.

**Crash-recovery.** A killed predecessor close seat left a `## Close` section in this record, uncommitted (⟨`git diff --stat` on this file⟩ → `30 insertions`). I read it whole. It was written before addenda (e)–(g) and before `.nav`, `.dm` and `.pd` landed. It has no gate table and no full-e2e reading, and its "units still owed" line is now stale. Its roster and bounds reading (act 1) and its instrument finding (a sibling's uncommitted `web/src` edits served live by `:3100`) are sound. They are carried below, re-measured at `79ea9f6`, and the section is rewritten in place. fourier's dirty paths all belong to siblings and were not touched: F.CT (`src/fourier_analysis/contours/**`, `bench/contours/harness.py`, `tests/test_contour*.py`, `?? support.py`, `?? test_contour_support.py`) and the 28 `web/e2e/screenshots/f-w14/*.png` (addendum (g), routing 2). The LEDGER was clean.

**Instrument.** ⟨`git diff --quiet HEAD -- web/src api && echo CLEAN`⟩ → `CLEAN` at the start and again after each full run (the `status` line in each run log is empty). So `:3100` served HEAD's `web/src`, and no clean-export `:3199` was needed at this sitting. API `:8000`, mongod `:27018`, preview `:4190` (a sibling's; not stopped).

### Commit roster and bounds (act 1)
- ⟨`git log --format=%h --grep='X.F.W14V' 7ee9b65..HEAD | wc -l`⟩ → `50`. ⟨`git log --format=%h --grep='W14V' 7ee9b65..HEAD`⟩ → 53. The 3 extra are `330fa09` (`.pd` falsifier, subject "F.W14V.pd"), `79ea9f6` (`.nav` + `.dm`), and `0eaff2b` (addendum (d), the daraksha fixture, landed out-of-loop under §0dv, whose body names the wave). The remaining non-wave commits in `7ee9b65..HEAD` are F.CT siblings: `35b3464` `4c38b12` `94a60bf` `03e5e1c`.
- The roster, by unit: `.s2` `b7531e7` · `.u1` `2016861` `64a1865` · `.u2` `f980230` `cc08ffd` `ce002d8` · `.u3` `5c8ce49` `59cf617` `c5a88bc` · `.u4` `e38e082` `8e19043` · `.c3` `1ff403d` · `.eq2` `0beb3a2` `0e817fd` · `.p` `8aaf925` `69af796` · `.au0` `a30001d` · `.au1` `48eee99` `cad7518` `f362b2e` · `.au2` `c8bd170` `60cc819` `58f1d75` `e58611d` `1a8112a` · `.au3` `9f59faf` `5b77972` `f20ae5b` `e581e20` `a6fa84c` · `.au4` `d83b01c` `4bdc59d` `fd22fb9` `edc0a08` `d6925e7` `724957f` `1078586` `41387d5` `735c459` `67d5ba8` · `.au5` `2412ea0` `642c87d` `395d638` `ba4efa9` · `.au6` `a591669` `950638c` `6fbbf23` `68eed53` `ef5678e` `82423c4` · `.pd` `330fa09` · `.nav`+`.dm` `79ea9f6`. Self-count: 50 + 1 + 1 = **52**, plus `0eaff2b` (addendum (d)) = 53, matching the grep.
- **Bounds.** ⟨`for c in $(git log --format=%h --grep='W14V' 7ee9b65..HEAD); do git show --name-only --format= $c | grep -v '^web/'; done`⟩ → only `cc08ffd` (six `api/**` paths plus `src/fourier_analysis/symbolic/latex_rendering.py`) and `f980230` (`api/tests/test_w14v_u2_equation_server.py`). `.u2` owns the `api/**` server limbs (addendum (c)). `latex_rendering.py` is the §0bt adjacent edit `.u2` declares. `330fa09` touches only `web/e2e/f-w14v-pd.spec.ts`. `79ea9f6` touches `AppDock.vue` and `DarkModeToggle.vue` (named by addenda (e)/(f)), plus `f-w14v-nav.spec.ts` and the two owner-ruling re-baselines `f-w14u-shell.spec.ts` and `shell-header.spec.ts`, which the `.nav` receipt names case by case (none deleted). **Landed-wrong: none.**
- value.js receipt commits: `.nav`/`.dm` `864e0382`; `.pd` `501bca0b` (receipt, 24 frames, the O-84 relay `X-F-BK-DOCK-SUMMARY-SQUARE.md` and its INBOX row) and O-84a `f631a774`; §0ea `08353549` ratifies them as homed.

### E13 mail (act 4)
⟨`find <p> -maxdepth 1 -type f -newer V/coordination/INBOX.md`⟩ over value `V/` and `V/coordination`, glass `BK/coordination` and `BL`, keyframes `V/coordination`, and glass `P/` and `Q/coordination` (the path named "atlas P/coordination" in earlier sweeps does not exist under `atlas/`) → **0 files on every path**. The newest letters in scope, O-84, O-84a, O-77a and glass's I-64, are rowed, and §0ea ratified their homing. **0 UNREAD in scope.**

### Residuals (named owners) and escalations
- **ESC-u1-1** (F-81 + F-9's final form, the shared animation pane): renaming the easing keys changes persisted data (`api/models/shared.py:69`), and glass 10.1.0 `Timeline` has no transport. **Owner:** the owner's ruling (re-home to `.au3` with O-74a E-3, plus the easing-name migration); glass for the Timeline transport. Not ruled at §0ea.
- **ESC-u1-2 = ESC-au2-1** (F-79 / L2-15 below sm): the editor dock row needs 243 px and has 167/197/237 px at 360/390/430, so vedit v88 and au2 L2-15 ×3 are RED. **Owner:** the owner's ruling among (a) a glass overflow seat (a new O-row), (b) Delete moves into More tools below sm, (c) an amended lock.
- **ESC-au3-1** (L1-12, the card-title rung): the specified cure conflicts with the OA-45 type-scale gate. **Owner:** the owner's ruling.
- **A2-FO-X-7** (the /paper inline search plate at ≥ lg): OPEN, because it conflicts with UIA-F-59 (`.au5`). **Owner:** the owner's ruling.
- **Honest-RED glass rows, ADOPT-AT-LANDING:**
  - O-77/O-77a LAYER-HEADER-LABEL (`.s2`; §0dy tightens the bar; glass 10.2.0 W-0.3)
  - O-84/O-84a DOCK-SUMMARY-SQUARE + METRIC-TOKEN-JOIN (`.pd`, 6 collapsed cells; pulled into 10.2.0 band 0 by §0ea)
  - MENU-ICON-GAP and MAGNET-STATE-HIDDEN (`.c3`, beside O-76)
  - TOASTER-OFFSET (`.p` p3)
  - O-82 POPOVER-ANCHOR (F-177, F-203)
  - the O-74/O-75 consumer halves (the ˢ rows)
  - L2-12 collisionPadding, HELD (O-74)
  - the §11 type rows L2-18ˢ and L3-14, HELD (O-74a E-2)
  - **Owner:** glass. The next seat is the 10.2.0 repin, which re-reads `f-w14v-pd` and `f-w14v-detached`.
- **Addendum (g), still owed** (homed by §0ea to "Track C, next seat"):
  - (1) the stale G-c1 in `f-w14-residuals`, to be re-baselined to u4's first-upload rule;
  - (2) the 28 uncommitted `web/e2e/screenshots/f-w14/*.png`, to be restored to HEAD or re-captured as a dated capture. They are still ` M` at close.
  - A verify-only seat does neither. **Owner:** Track C's next cure seat.
- **Glass questions from `.nav`, not relayed** (recorded, no owner act yet): (i) the dropdown's current row carries `aria-current` but no visible paint (O-59 / UIA-F-128, glass's half); (ii) `--dock-icon-glyph` (20 px) differs from the 24 px faces glass renders.
- **The `.pd` diagnostic switch:** `FW14V_PD_GLASS_CURE=1` injects the proposed glass rule, in the spec only. It is off by default, so the shipped run reads the true bytes RED. It is a test instrument, not a shim over product paint. I read it as lawful, and the Check should confirm.

### Gates, BEFORE → AFTER (acts 2 and 3; fourier `79ea9f6`; `:3100` → `:8000`)
| Gate (spec §) | BEFORE (Baseline, `7ee9b65`) | AFTER, this seat, ×2 |
|---|---|---|
| vue-tsc (§2) | 0 | ⟨`npx vue-tsc --noEmit`⟩ → exit 0, 0 `error TS` ×2 **GREEN** |
| vitest (§2) | 86/86 (14 files) | ⟨`npx vitest run`⟩ → `20 passed (20)` · `116 passed (116)` ×2 **GREEN** |
| api `owner_required` (`.p` §3) | GREEN | ⟨`MONGO_TEST_URI=… uv run pytest api/tests/conformance/test_identity.py::test_owner_required`⟩ → `1 passed` ×2 **GREEN, unchanged**; ⟨`uv run pytest api/tests`⟩ → `286 passed` |
| `.s2` `f-w14v-detached` headed (§1 .s2 4) | 5/5 ×2 (landed early, `239845f`) | ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-detached.spec.ts --project=chromium --headed --workers=1`⟩ → `5 passed (16.5s)`, `5 passed (15.3s)` **GREEN** |
| every unit falsifier (§2), inside the full runs | per receipts | `f-w14v-{u1,u2,u3,u4,eq2,au1,au4,au5,au6,nav}` and `f-w14v-p` p1/p2: all passed in both runs. Honest-RED limbs, stable in both runs: `.c3` c3m/c3g · `.p` p3 @1440/@1024 · `.au2` L2-15 @360/390/430 · `.au3` L1-12 · `.pd` collapsed ×6 (`f-w14v-pd:104`, 1440/1024/390 × L/D; expanded ×6 GREEN) |
| full e2e `--workers=1` (§2) | named set (F.W14U) | r1 (load 9.5 → ~110): **`33 failed · 3 skipped · 501 passed (33.3m)`** · r2 (load 76 → 110): **`30 failed · 3 skipped · 504 passed (33.4m)`** |

**The full-e2e reading.** ⟨`diff` of the two runs' sorted failure lists⟩ → run 2 is run 1 minus 3 lines. The 30 stable failures are:
- **The named set, 21** (the same 21 as `.au6` Act 8): contrast-floor `:82` ×2 and `:128`; gallery-admin-a11y ×4; visual-checkpoint `:81 :102 :123`; f-w14-residuals G-c1; f-w14u-d d2; f-w14u-vedit v88; au2 L2-15 ×3; au3 L1-12; c3 c3m/c3g; p p3 ×2.
- **vc `:199` mobile**: pre-existing, RED at `ba4efa9` (`.au6` R-1). Carried.
- **`.pd` collapsed ×6**: the new honest-RED DOCK-SUMMARY-SQUARE (O-84/O-84a). This is the expected shape: 6 RED, 6 GREEN.
- **r119 and r212** (`f-w14u-misc.spec.ts:343 :364`): **outside the set, and attributable by bytes to `79ea9f6` (`.nav`)**. Both assert on `.app-dock [aria-current="page"]` (`:337`), the `aria-current` of the inline tab row that addendum (e) deleted. With the menu closed, the dock now carries no `[aria-current]`, so the count is 0. Alone at HEAD, ⟨`playwright test e2e/f-w14u-misc.spec.ts:343 …:364 --project=chromium --workers=1`⟩ ×2 → `2 failed` ×2. Before `.nav` they were GREEN: `.au6` Act 8 at `82423c4` (not among its 23), and the predecessor close's clean `0eaff2b` export (`2 passed`). The `.nav` receipt re-baselined `f-w14u-shell` s151 and `shell-header` but missed these two oracles. They pin the same route-meta facts (UIA-F-119 and F-212) through the removed row. The cure is a §0bt owner-ruling restatement: read the section from the `nav-trigger`'s accessible name or the open menu's `aria-current` item, keep every URL and label, and delete nothing. **Landed-wrong LW-1**, not cured here.

Run 1 only, each GREEN alone or in run 2:
- f-w14-uia UIA-F-17 `:162`: the named pre-existing intermittent (`.au6` receipt). It is GREEN in r2; alone after the runs it gave `1 failed`.
- f-w14u-vedit v87 `:149`: the load intermittent (`.au6` R-2). Alone → `1 passed`.
- f-w14v-au0 d1440-light: `page.waitForTimeout: Page crashed` at `:237` at load ~110, which is the instrument. Alone → `1 passed (31.0s)`.

⟨`git status --porcelain web/src api`⟩ after each run → empty, so the served bytes were HEAD throughout.

### Landed-wrong, escalations, state
- **LW-1** (`.nav`, `79ea9f6`): r119/r212 are RED ×2 at HEAD because their oracles still read the deleted tab row. **Owner:** Track C's next cure seat (the `.nav` owner), as a §0bt owner-ruling restatement. This is not a product defect in the dropdown.
- **Escalations open (the owner's):** ESC-u1-1 · ESC-u1-2 = ESC-au2-1 · ESC-au3-1 · A2-FO-X-7. The §0ea ratification did not rule them.
- **State (§2: "The row flips CLOSED on a CONFORMANT check").** This seat does not stamp CLOSED or VERIFIED. **Verdict: PARTIAL.** Every planned unit and the late `.nav`/`.dm`/`.pd` are landed, and each row is CURED, ADOPT-AT-LANDING or honest-RED with its relayed id. What remains:
  - (1) LW-1;
  - (2) addendum (g)'s G-c1 re-baseline and the 28 PNGs;
  - (3) the four owner escalations above.
  - The honest-RED glass rows ride 10.2.0 (O-77a, O-84, O-84a) and the O-74/O-75/O-76/O-82 rows.
- **Push:** fourier `m/w1-bump-migration` pushed with `330fa09` and `79ea9f6`; value.js pushed with this close.

## Check 1

SERVED MODEL: claude-opus-5-5 · 2026-09-25 · FRESH ADVERSARIAL CHECK (L-20 pass 1), Track C, verify-only, no cure. Spec read whole (67 lines, addenda (a)–(g)); record read header → `## Unit plan` and `## Close`. fourier HEAD = `7e72a98` (= origin; the two commits after `79ea9f6` are F.CT `e2b1474` `7e72a98`, outside this wave). ⟨`git diff --quiet HEAD -- web/src api && echo CLEAN`⟩ → `CLEAN`, so `:3100` serves HEAD. Servers `:3100` `:8000` `:27018` `:4190` listening.

**Verdict: NOT-CONFORMANT.** The Close itself read PARTIAL. Every GREEN it claims reproduces; three REDs carry no relief at the spec bytes.

### Gates reproduced (this seat)
- vue-tsc ⟨`npx vue-tsc --noEmit`⟩ → exit 0 · **GREEN**
- vitest ⟨`npx vitest run`⟩ → `20 passed (20)` · `116 passed (116)` · **GREEN**
- api ⟨`MONGO_TEST_URI=mongodb://127.0.0.1:27018 uv run pytest api/tests/conformance/test_identity.py::test_owner_required`⟩ → `1 passed` · **GREEN, unchanged**
- `.s2` ⟨`BASE_URL=http://localhost:3100 npx playwright test e2e/f-w14v-detached.spec.ts --project=chromium --headed --workers=1`⟩ → `5 passed (17.0s)` · **GREEN**
- `.nav` ⟨`… e2e/f-w14v-nav.spec.ts e2e/f-w14u-misc.spec.ts:343 :364 --project=chromium --workers=1`⟩ → `3 passed` (nav falsifier) · `2 failed` (r119, r212) — LW-1 reproduces
- G-c1 ⟨`… e2e/f-w14-residuals.spec.ts:77 --project=chromium`⟩ → `1 failed` (`toBeVisible` · element not found) — reproduces RED
- vc `:199` ⟨`… e2e/visual-checkpoint.spec.ts:199 --project=mobile-chromium`⟩ → `1 failed` · `3 pixels (ratio 0.01)` — reproduces RED
- The full-e2e figure (33/30 failed) was not re-run (>120 s foreground each; the three targeted reproductions above confirm its outside-set members).

### Axes
- (2) **Bounds HELD.** The Close's roster/bounds reading re-read: only `cc08ffd`/`f980230` leave `web/**` (`.u2`'s addendum-(c) `api/**` limb + the declared §0bt `latex_rendering.py`). ⟨`git -C value.js status --porcelain scripts/dev/dev.sh`⟩ → ` M` (the standing unowned dirt), in no wave commit.
- (3) **Masking HELD.** ⟨`git diff 7ee9b65..79ea9f6 -- web/src web/e2e | grep -E '^\+.*(catch *\(|\.skip\(|fixme|allowlist)'`⟩ → `waitForLoadState("networkidle").catch`/`isVisible().catch` probe tolerance in specs and `catch (e: unknown)` blocks in AdminFlaggedPanel/AdminUserList/useSimplifiedSeries that surface the server's problem detail (abort-aware) — error reporting, not a defect masked. 0 `test.skip`. `FW14V_PD_GLASS_CURE` (`f-w14v-pd.spec.ts:38`) is off by default; the shipped run reads the true bytes RED. Lawful instrument.
- (4) **Families HELD** (one commit per meaning per the roster).
- (5) **E-3 HELD.** ⟨`git diff --stat 4bd63b08..HEAD -- docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/fourier/waves/`⟩ → `F-W14V.md +19`, `F-CT.md +41`, insertions only (dated addenda-beside); registry empty.
- (6) **Mail clean.** ⟨`find <four paths> -maxdepth 1 -type f -newer INBOX.md`⟩ → ∅; ⟨`grep -oE '\| \*\*UNREAD[^|]{0,60}' INBOX.md`⟩ → one hit, prose inside a 2026-09-18 sweep line, no status cell.
- (7) **Four-verb line.** LEDGER `:90` = PARTIAL. Lawful. It does not move at this check.
- (8) **Goal, partly unmet at the bytes.** `.s2`, `.p` p1/p2, `.nav`, `.dm` goals are met. Addendum (g) routing 1 and routing 2 are unexecuted.
- (9) **Figures.** Every figure reproduced here matches the Close.

### Register (severity · claim · receipt · cure)
- **C1-1 HIGH** · LW-1: r119/r212 (`f-w14u-misc.spec.ts:343 :364`) are RED at HEAD. `.nav` (`79ea9f6`) deleted the inline tab row that their `.app-dock [aria-current="page"]` oracle reads. Addendum (e) orders the tests to follow the ruling ("rewritten … named in the receipt"), which gives no RED relief. · receipt: `2 failed` above; GREEN at `82423c4` per the Close · cure: a §0bt owner-ruling restatement in the `.nav` owner's seat (read the section from `nav-trigger`'s accessible name or the open menu's `aria-current` item; keep every URL and label; delete nothing). GREEN ×2.
- **C1-2 HIGH** · addendum (g) routing 1 is unexecuted. G-c1 is RED, and the spec routes it to this wave's `.u4` owner for a re-baseline, not honest-RED. The Close counts it inside the "named 21", which it is not. · receipt: `f-w14-residuals.spec.ts:77` `1 failed` · cure: re-baseline G-c1 to u4's rule (first upload: the stage button busy and no aside bar; replace: the aside bar) as a named §0bt edit, delete nothing. GREEN ×2.
- **C1-3 MEDIUM** · vc `:199` [mobile-chromium] regressed inside this wave. `.u3` measured it GREEN ×2 at `ce002d8` (record `:299`); it was RED at `ba4efa9`. The Close says "Carried" but names no owner and no relief. · receipt: `3 pixels (ratio 0.01)` above · cure: bisect `ce002d8..ba4efa9` (candidates `0e817fd` `5b77972` `cad7518`). Then re-cut the golden with the diff described if the change is intended, or cure the paint.
- **C1-4 MEDIUM** · addendum (g) routing 2 is undecided. The 28 `web/e2e/screenshots/f-w14/*.png` are still ` M` in the working tree. The spec orders the seat to either restore them or commit them as a dated capture. · receipt: ⟨`git status --porcelain web/e2e/screenshots/f-w14`⟩ → 28 ` M` (23 listed of 34 dirty paths; the rest are F.CT's) · cure: `git checkout -- <the 28>`, or commit them as a dated capture with a receipt line.
- **C1-5 MEDIUM** · four owner escalations are open: ESC-u1-1, ESC-u1-2 = ESC-au2-1 (vedit v88, L2-15 ×3 RED), ESC-au3-1 (L1-12 RED), and A2-FO-X-7. §2 admits only CURED, ADOPT-AT-LANDING, or honest-RED with a relayed id. An escalation is a lawful stop, but it is not a close disposition. · cure: the owner's rulings, then the owning seat.
- **INFO** · f-w14-uia UIA-F-17, vedit v87 and au0 d1440-light are load intermittents, each GREEN alone at least once (the Close's reading). They do not block.

### Honest-RED adjudication (axis 10)
**Relieved by spec, owner named (glass, ADOPT-AT-LANDING):**
- `.c3` c3m/c3g: MAGNET-STATE-HIDDEN / MENU-ICON-GAP (add. (a), beside O-76)
- `.p` p3 ×2: TOASTER-OFFSET (§1 `.p` 2)
- `.pd` collapsed ×6: O-84/O-84a DOCK-SUMMARY-SQUARE (add. (f))
- O-77/O-77a LAYER-HEADER-LABEL (add. (b))
- O-82 F-177/F-203 (add. (c))
- L2-12, and L2-18ˢ/L3-14 HELD (O-74/O-74a E-2)

**Relieved as the F.W14U inherited named set** (§2 "except the named honest-RED set"):
- contrast-floor ×3
- gallery-admin-a11y ×4
- vc `:81 :102 :123`
- f-w14u-d d2

**Not relieved:**
- r119 and r212 (C1-1)
- G-c1 (C1-2)
- vc `:199` (C1-3)
- vedit v88, L2-15 ×3 and L1-12 (C1-5): these are owner-held escalations, not spec relief.

### Successors
No wave spec declares "Opens after: F.W14V CLOSED". ⟨`grep -rn W14V docs/tranches/X/fourier/waves/`⟩ → F-CT cites addendum (d) only, as provenance and not as a gate. No successor is blocked.

### State
**NOT-CONFORMANT.** LEDGER `:90` stays PARTIAL. The next act is a Repair seat that takes C1-1 → C1-4. C1-5 waits on the owner.
