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
