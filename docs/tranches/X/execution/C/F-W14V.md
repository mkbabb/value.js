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
