SERVED MODEL: claude-opus-5-5

# F.REL — execution record (Track C · X·F)

Spec: `docs/tranches/X/fourier/waves/F-REL.md` (37 L, read whole). Authority: COHESION §0em (minted), §0eu (precondition), §0ei (headless), §0eo (no durable /tmp); hotfix receipt `docs/tranches/X/fourier/evidence/deploy-hotfix-2026-10-06/RECEIPT.md`. fourier-analysis HEAD at open = `d564234` on `m/w1-bump-migration` (= `origin/m/w1-bump-migration`, 0 ahead/0 behind); `origin/master` = `ad62881`.

## Open

Seat 0 (OPEN), `claude-opus-5-5`, 2026-10-08 (execution under the owner's 2026-09-17 begin-word).

### Preconditions (bytes and ledger)
- **F.W14V CLOSED** — ⟨`grep -n "^| F.W14V" LEDGER.md`⟩ → line 90 `**CLOSED 2026-09-17** (honest-RED: …)`. PASS.
- **F.CT phase 2 CLOSED** — ⟨`sed -n 3740,3750p COHESION.md`⟩ → §0eu: *"Phase 2 is CLOSED, honest-RED … C is the production contour pipeline. F.REL's precondition is satisfied by this ruling."* `F-CT.md` addendum (d) at line 56 records the same. The record's own `## Phase 2` (`execution/C/F-CT.md:89`) ends "Status: F.CT OPEN — bar NOT met" — that line predates §0eu, which rules phase 2 closed honest-RED (phase 3 F.CT3 opens after F.REL). PASS by ruling §0eu.
- Named artefacts: C implemented on `m/w1-bump-migration` through `87ff8ac` + cache-key `e26d48a` — ⟨`git log --oneline -5`⟩ → `d564234 · 01fd861 · 33eedee · e26d48a · 87ff8ac` (the three after `e26d48a` are X-DS web/ commits). ⟨`git diff --stat e26d48a HEAD -- api src tests .github scripts`⟩ → empty (no API/pipeline byte moved since the F.CT close).
- No prior F.REL commits: ⟨`git log --oneline --all --grep="F.REL"`⟩ (fourier) → 0.

### Crash recovery
⟨`git status --porcelain`⟩ (fourier) → 18 modified + 3 untracked, all under `web/e2e/screenshots/f-w14/`, `web/src/components/{morph,visualization}/`, `web/e2e/_ds-f14*`, `.worktrees/` — the X-DS fourier lane's in-flight work, **outside** every F.REL writable set; untouched. Nothing inherited.

### E13 mail sweep
Paths: value `V/` + `V/coordination` · glass `BK/coordination` (+ `BL`, the newest glass tranche dir; it has no `coordination/`) · keyframes `V/coordination` · atlas `P/coordination`. ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ → 0 on every path except glass `BL/FORMATION-PROGRESS.md`, `BL/PLAN.md` (glass's own formation logs, not letters). ⟨`grep -cE "\| *UNREAD" INBOX.md`⟩ → 1, which is line 406's prose sweep line (a 2026-09-22 sweep note, not a mail row). **0 unrowed · 0 UNREAD.**

## Baseline (BEFORE, read-only, 2026-10-08 ~20:20–20:24 local; load 37–45 so heavy suites were not re-run, per the phase-2 resource law)

| Gate | Command | BEFORE | Reading |
|---|---|---|---|
| G-api / pytest ×2 | `uv run pytest tests/` · `uv run pytest api/` | banked at F.CT close (`e26d48a`): 169 ×2 · 302 ×2 | GREEN (banked; api/src/tests byte-identical since — diff empty) |
| G-web vue-tsc | `npx vue-tsc -b --noEmit` (web/, working tree incl. X-DS WIP) | exit 0 | GREEN (not owned by a cure; non-regression) |
| G-web vitest | `npx vitest run` | 20 files · 116 tests passed, exit 0 | GREEN (non-regression) |
| G-e2e master | `gh run view 37498214674` (master `ad62881` CI) | api/tests success · web success · **e2e failure** | **RED** (the .g cure) |
| G-smoke prod | `bash scripts/pages-smoke.sh` | bundle carries api base · health 200 json · ACAO ok · cert > 14 d · PASS | GREEN (the hotfix's smoke; non-regression) |
| G-cert | `openssl s_client … -enddate` | api.fourier `Jan 4 2027` · fourier `Dec 22 2026` | GREEN (> 14 days; non-regression) |
| G-m model dir | `grep -rn FOURIER_MODEL_DIR src api` | 0 hits; `ml.py:30 _CACHE_DIR = Path.home()/".cache"/…`; `docker-compose.prod.yml:25 read_only: true`; `api/Dockerfile` downloads no model | **RED** (the .m cure) |
| G-c CORS | `curl -X OPTIONS -H "Origin: https://fourier.babb.dev" -H "Access-Control-Request-Method: PATCH" -H "Access-Control-Request-Headers: if-match,idempotency-key" https://api.fourier.babb.dev/api/visualizations/x` | **400**; allow-methods `GET, POST, PUT, DELETE, OPTIONS`; allow-headers lacks If-Match/Idempotency-Key; GET carries no `access-control-expose-headers` | **RED** (the .c cure; `api/main.py:62-63`) |
| G-h host API version | `curl https://api.fourier.babb.dev/openapi.json` (saved `~/.fourier-samples/frel-openapi-before.json`) | 34 paths, version 0.2.0; **no** `/publish`, `/remix`, `/diff` path; `POST /api/visualizations/zzz/publish` → 404 | **RED** (host stuck at `f2fe447`; the .h cure) |
| G-d prod e2e check | the six-row headless production check | not runnable until .m/.c/.h/.g land | **RED** by construction |
| G-outage | health polled through the deploy | no deploy at open | n/a until .d |

Pasted (abridged, quote-by-command):
- ⟨`curl -sS -D - https://api.fourier.babb.dev/health`⟩ → `HTTP/1.1 200 OK … {"status":"ok"}` (note: `nginx/*:61 location = /health` is a static nginx return; the backend health is `/api/health` → `{"status":"ok"} 200`).
- ⟨`curl -X OPTIONS … PATCH … /api/visualizations/x`⟩ → `HTTP/1.1 400 Bad Request` · `access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS` · `access-control-allow-headers: Accept, Accept-Language, Authorization, Content-Language, Content-Type, X-Session-Token`.
- ⟨`gh run list --branch master --limit 5`⟩ → CI `failure` 2026-10-06 (`ad62881`) and 2026-06-03 (`9d7c387`); deploy-pages `skipped` on each.
- Web logs: `~/.dev-logs/frel/vuetsc-before.log`, `~/.dev-logs/frel/vitest-before.log`.

greenBeforeCure: none of the owned cures (G-m, G-c, G-h, G-e2e, G-d all RED). The GREENs (pytest/api banked, vue-tsc, vitest, pages-smoke, cert) are non-regression gates the spec names as must-stay-GREEN, not born-RED gates; recorded here as GREEN-before so the close reads them as held, not cured.

## Unit plan

Five units, **strictly serial** (spec §Units order and the chassis note: `.m → .c → .h → .g → .d`), one concurrent, every seat Opus 5.5 (spec §State; owner Opus-only 2026-09-23). Repo = fourier-analysis on `m/w1-bump-migration` until `.g`. Binding on every unit: X-DS's fourier lane commits `web/` on the same branch — `git pull --ff-only` (or a no-force merge) before every commit, never force; pathspec commits; headless only (§0ei); nothing durable in /tmp (§0eo, logs to `~/.dev-logs/frel/`); the phase-2 resource law (pytest scoped + `timeout 1200 -x`; full suite once under `timeout 2400`; wait while 1-min load > 40; never two heavy runs at once; kill own overruns). ESCALATED units do not halt the wave.

Groups: `[[F-REL.m], [F-REL.c], [F-REL.h], [F-REL.g], [F-REL.d]]`.

| Unit | Spec section | Writable | Gates | Locks |
|---|---|---|---|---|
| F-REL.m | §Units `.m` (F-REL.md:20-24) | `src/fourier_analysis/contours/ml.py` (+ the `~/.cache` docstrings in `person.py`, `parts.py`, `lines.py`), `api/**` (incl. `api/Dockerfile`, `api/main.py` error handler, `api/tests/**`), `tests/**` (ml model-dir test), `docker-compose*.yml`, `scripts/**` | G-m: read-only-HOME api test extracts contours with `FOURIER_MODEL_DIR` set; container smoke extracts under `read_only: true`; pytest/api GREEN | model sha256s from the `SubjectModelSpec`s only (one source); baked dir + env + loader in one commit family |
| F-REL.c | §Units `.c` (F-REL.md:25) | `api/main.py`, `api/config.py`, `api/tests/**`, `scripts/**` (local-stack headless probe); `web/src/lib/api.ts` only under the adjacent-line rule | G-c: preflight tests for every client verb and header; `ETag` exposed; headless edit + delete against a local stack | one source of truth for the header list shared with the client |
| F-REL.h | §Units `.h` (F-REL.md:26-30) | `scripts/deploy-hook.sh`, `scripts/**`, `docker-compose*.yml`, `api/Dockerfile`, `api/**` (health route/migrations), `.github/workflows/**`; `nginx/**` only under the adjacent-line rule | G-h: production-compose boot + health on CI; reproduce the host failure from the webhook's own output first | host changed only via the deploy path/config, never the running container |
| F-REL.g | §Units `.g` (F-REL.md:31) | the merge `m/w1-bump-migration → master` (no force), `web/playwright.config.ts` / `web/e2e/**` (named honest-RED set explicit), `.github/workflows/**` | G-e2e: master CI e2e GREEN with the named set explicit (glass ADOPT-AT-LANDING rows in config, never silent skips); vue-tsc/vitest/e2e GREEN ×2 | fetch before merge; never force; merge after a fetch |
| F-REL.d | §Units `.d` (F-REL.md:32-38) | none in code beyond `scripts/**` (a production verify probe); evidence under `value.js/docs/tranches/X/fourier/evidence/F-REL/` | G-smoke, G-cert, G-outage (health polled through the deploy), G-d: the six production rows headless | deploy via standing workflow + webhook only |

## Unit receipts

### F-REL.m

Seat `claude-opus-5-5`, 2026-10-08. Spec §Units `.m` (F-REL.md:16-20 at true bytes; the plan cites 20-24, drifted; INTENT read at the true lines), COHESION §0eu (C's four models sha-pinned) and §0em.

**Crash recovery.** ⟨`git status --porcelain`⟩ (fourier) → only `web/**` (X-DS lane) and `.worktrees/`; nothing in the .m writable set. Nothing inherited.

**Anchors measured.** ⟨`git grep -n _CACHE_DIR`⟩ → `ml.py:30 _CACHE_DIR = Path.home()/".cache"/"fourier-analysis"/"models"`, read by `SubjectModelSpec.path` (ml.py:55). Production uses all six specs (`ensure_model_downloaded`, ml.py:100-109: U2NET + BIREFNET_LITE ensemble at ml.py:197, FACE_DETECTOR YuNet + FACE_PARSER BiSeNet parts.py:93/103, PERSON_PARSER person.py:39, LINE_MODEL contour-768 lines.py:50). `api/main.py:116` `@app.exception_handler(Exception)` — Starlette routes it to the outermost `ServerErrorMiddleware`, outside `CORSMiddleware`. Pre-cure failure reproduced: ⟨`HOME=<chmod 555 dir> uv run python -c "…compute_contours(joseph-fourier.png)…"`⟩ → `PermissionError: [Errno 13] Permission denied: '…/home/.cache'`.

**Acts (fourier `m/w1-bump-migration`).**
1. `871cc1c` fix(api · F.REL .m): the contour models are baked, not fetched — one commit family (loader + env + baked dir):
   - `ml.py`: `MODEL_DIR_ENV = "FOURIER_MODEL_DIR"`, `model_dir()` = the env, else `~/.cache/fourier-analysis/models`; `SubjectModelSpec.path` reads it at call time.
   - `api/Dockerfile` production stage: `ENV FOURIER_MODEL_DIR=/opt/fourier-models` + `RUN uv run --no-sync python -c "…ensure_model_downloaded()"` (the runtime loader: URLs and sha256s from the SubjectModelSpecs, the one source; a mismatch raises and fails the build) `&& chmod -R a=rX`, layered before `COPY . .`.
   - `docker-compose.prod.yml`: `read_only: true` kept; a 3-line comment naming the baked dir and the smoke.
   - docstrings `person.py:23`, `lines.py:12` → `ml.model_dir()`.
   - falsifiers: `api/tests/test_model_dir_readonly.py` (a fresh interpreter, HOME chmod 555, FOURIER_MODEL_DIR = a chmod-555 dir of links to the sha-verified models, runs the API's `compute_contours` on the tracked `assets/portraits/joseph-fourier.png`; asserts contours > 0 and HOME still empty); `tests/test_model_dir.py` (default + env); `scripts/model-smoke.sh` (builds the production stage, reads the backend's `read_only`/`tmpfs`/`cap_drop`/`security_opt` from `docker compose -f docker-compose.yml -f docker-compose.prod.yml config --format json` and refuses unless `read_only: true`, then extracts in the image with `--network=none`, so an unbaked model cannot be fetched).
   - adjacent edit: `.gitignore:60` `!scripts/model-smoke.sh` (the repo ignores `scripts/*` and tracks scripts by negation; without it the falsifier could not be committed).
2. `4d98fa8` fix(api · F.REL .m): an unhandled exception answers the typed problem through CORS:
   - `api/main.py`: the outer `exception_handler(Exception)` is replaced by `UnhandledErrorProblem`, a pure-ASGI boundary added BEFORE `CORSMiddleware` (so it sits inside it): logs, answers `internal_error(instance=path)`; an exception after the response started propagates unchanged. `logger` moved below the imports (ruff E402 9 → 0 on the file).
   - `api/lib/crud/errors.py`: catalog row `internal_error = partial(problem, "urn:contract:internal-error", 500, "Internal server error")`; the two catalog tests take the row (counts 20/21 → 21/22).
   - falsifier `api/tests/test_unhandled_error_cors.py`: drives the full ASGI stack with an `Origin`, a route that raises → asserts 500, `application/problem+json`, `access-control-allow-origin` = the origin, credentials true, the exact problem body. Measured RED on the pre-cure `main.py` (⟨`git show HEAD:api/main.py` as a probe module⟩ → `RuntimeError: an unhandled defect` escaped the stack), GREEN after.
3. Pushed: ⟨`git pull --ff-only && git push origin m/w1-bump-migration`⟩ → `origin/m/w1-bump-migration` = `4d98fa8` (no force; X-DS's `9935f2c` pulled first).

**Gates (BEFORE → AFTER, logs `~/.dev-logs/frel/`).**
| Gate | BEFORE | AFTER |
|---|---|---|
| G-m api test, read-only HOME + FOURIER_MODEL_DIR extracts | RED (no `FOURIER_MODEL_DIR`; the read-only-HOME reproduction raised `PermissionError …/home/.cache`) | GREEN — ⟨`uv run pytest api/tests/test_model_dir_readonly.py`⟩ → 1 passed (inside both full api runs below) |
| G-m container smoke under `read_only: true` | RED (`api/Dockerfile` baked no model) | GREEN ×2 — ⟨`scripts/model-smoke.sh`⟩ → `hardening: --read-only --tmpfs=/tmp --cap-drop=ALL --security-opt=no-new-privileges:true --network=none` · `model dir: /opt/fourier-models · HOME /home/app read-only` · `contours: 59 · points: 9583` · `model-smoke: PASS`; ⟨`SKIP_BUILD=1 scripts/model-smoke.sh`⟩ → the same `59 · 9583 · PASS`. ⟨`docker run --network=none --entrypoint ls fourier-backend:model-smoke -la /opt/fourier-models`⟩ → the six models, `-r--r--r--`, dir `dr-xr-xr-x`. |
| 500 → typed problem WITH CORS | RED (pre-cure probe: the exception escaped; no response through CORS) | GREEN — `test_unhandled_error_cors.py` 1 passed |
| pytest `api/` ×2 | 302 ×2 (banked) | ⟨`timeout 1200 uv run pytest api/ -x -q`⟩ → **307 passed** ×2 (71.2 s, 48.0 s) = 302 + 1 read-only + 1 CORS + 3 catalog-row params |
| pytest `tests/` ×2 | 169 ×2 (banked) | ⟨`timeout 1200 uv run pytest tests/ -x -q`⟩ → **171 passed** ×2 (475.8 s, 431.4 s) = 169 + 2 `test_model_dir.py` |

Resource law: suites run strictly one at a time, each under `timeout 1200 -x`; the first api run waited for the 1-min load to fall to 40 (it read 40.08; 30-66 through the seat).

**Residuals.** (a) `src/fourier_analysis/cli.py:311-322` `_cmd_download_models` swallows a download failure and returns 0; outside the writable set and not on the image path (the Dockerfile calls `ensure_model_downloaded` directly, which raises), so it is recorded, not touched. (b) The image grows by ~527 MB (six models); the layer re-downloads only when `src/` changes. (c) The build context carries the untracked `.worktrees/` (~700 MB transferred) since `.dockerignore` does not exclude it; a build-speed matter for `.h`, not a correctness one. (d) The host deploy itself (does the webhook build run this stage with network?) belongs to `.h`/`.d`.

**Adjacent edits.** `fourier-analysis/.gitignore:60` `!scripts/model-smoke.sh`: same concern (the falsifier script), the repo tracks scripts by negation.

**Escalations.** None. Status: **DONE**.

### F-REL.c

Seat `claude-opus-5-5`, 2026-10-08. Spec §Units `.c` (F-REL.md:21 at true bytes; the plan cites :25, drifted; INTENT read at the true line) and §Why 4; COHESION §0em, §0ei (headless), §0eo (logs under `~/.dev-logs/frel/`).

**Crash recovery.** ⟨`git status --porcelain`⟩ (fourier) → only `web/**` (X-DS lane) and `.worktrees/`; nothing in the .c writable set. Nothing inherited.

**Anchors measured.** `api/main.py:96-102` (true bytes; the brief's :62-63 drifted after `.m`) `allow_methods=["GET","POST","PUT","DELETE","OPTIONS"]`, `allow_headers=["Content-Type","Authorization","X-Session-Token"]`, no `expose_headers`. The client, enumerated by grep: every request goes through `coreFetch` (`web/src/lib/api.ts:237`, the one `fetch(`; `lib/equation/api.ts` calls `apiFetch`); verbs ⟨`grep -rn 'method: "' web/src`⟩ → POST ×15, PUT ×2, PATCH ×1, DELETE ×5 (+ GET, the default); request headers set by assignment `api.ts:201 Authorization · :204 X-Session-Token · :207 If-Match · :210 Idempotency-Key · :226 Content-Type` (+ `:516/:533 If-Match`); response headers read `api.ts:264 headers.get("ETag")` and `api-problem.ts:172 headers.get("RateLimit-Reset")`.

**Acts (fourier `m/w1-bump-migration`).**
1. `9876aad` fix(api · F.REL .c): CORS is complete for the web client, from one source of truth — one commit (cure + falsifiers):
   - `api/config.py`: `CORS_ALLOW_METHODS = (GET, POST, PUT, PATCH, DELETE)`, `CORS_ALLOW_HEADERS = (Authorization, Content-Type, Idempotency-Key, If-Match, X-Session-Token)`, `CORS_EXPOSE_HEADERS = (ETag, RateLimit-Reset)` — the one source; `api/main.py` `CORSMiddleware(allow_methods=…, allow_headers=…, expose_headers=…)` reads them.
   - The one-source lock: `api/tests/test_cors.py` reads the client's bytes (`web/src/**/*.{ts,vue}`: `method: "X"`, `headers["X"] =`/`??=`, `.headers.get("X")`) and asserts set EQUALITY with the three tuples, both directions — a client header added without its allowance, or an allowance the client never sends, fails the api suite.
   - Preflight falsifiers through the full ASGI stack: every verb (5), every verb × header (25), the browser's exact PATCH preflight, an unlisted header → 400, a foreign origin → 400 with no ACAO; `test_etag_is_exposed_to_the_client` (GET with Origin → `access-control-expose-headers` ⊇ {etag, ratelimit-reset}). 37 tests.
   - `scripts/cors-probe.sh` + `scripts/cors-probe.mjs`: boots the API (:8077, Mongo `:27018/fourier_cors_probe`, dropped at exit) and Vite dev (:5187, `VITE_API_URL` = the API, so every call is cross-origin), then headless Chrome (`channel: "chrome", headless: true`) imports `/src/lib/api.ts` and runs session → upload → contour → create → read (ETag) → `updateVisualization` (If-Match) → a PATCH with If-Match + Idempotency-Key + Content-Type + X-Session-Token → `deleteVisualization` (If-Match) → owner read shows `deleted_at`, anonymous read 404; then reads the API access log for the preflights answered and fails on any 4xx/5xx OPTIONS.
   - adjacent edit: `fourier-analysis/.gitignore:61-62` `!scripts/cors-probe.sh`, `!scripts/cors-probe.mjs` (the repo ignores `scripts/*` and tracks by negation; same reason `.m` added `:60`).
2. Pulled ⟨`git pull --ff-only`⟩ → `Already up to date`; pushed ⟨`git push origin m/w1-bump-migration`⟩ → `4d98fa8..9876aad` (no force).

**Gates (BEFORE → AFTER, logs `~/.dev-logs/frel/`).**
| Gate | BEFORE | AFTER |
|---|---|---|
| G-c preflight, every client verb × header | RED — production ⟨`curl -X OPTIONS … PATCH … if-match,idempotency-key`⟩ → 400 (baseline); in-process on the pre-cure `main.py` (⟨`git show HEAD:api/main.py` loaded as the app, the test's preflight driver⟩) → **14 of 30** verb/header preflights refused 400 (`GET/Idempotency-Key`, `GET/If-Match`, `POST/…`, `PUT/…`, `PATCH/*` …) | GREEN — ⟨`uv run pytest api/tests/test_cors.py -q`⟩ → 37 passed (inside both full runs) |
| ETag exposed | RED — pre-cure GET with Origin → `access-control-expose-headers: None` | GREEN — `test_etag_is_exposed_to_the_client` passed |
| one source shared with the client's headers | none (two hand lists, drifted) | GREEN — the three binding tests (set equality, both directions) |
| headless browser edit + delete, local stack (§0ei) | RED by construction (the production preflight 400) | GREEN ×2 — ⟨`scripts/cors-probe.sh`⟩ run 1 and run 2 → `edit.title: F.REL .c cors probe` · `edit2.description: edited with every client header` · `delete: 204` · `owner-read-after-delete.deleted_at: 2026-10-09 00:57:04…` · `anon-read-after-delete: 404 urn:contract:not-found` · ETags read on create/read/edit · preflights answered `OPTIONS /api/contours 200 ×1 · /api/images 200 ×1 · /api/visualizations 200 ×1 · /api/visualizations/<slug> 200 ×4` · `cors-probe.sh: PASS` (logs `cors-probe-run1.log`, `cors-probe-run2.log`) |
| pytest `api/` ×2 | 307 ×2 (after `.m`) | ⟨`timeout 1200 uv run pytest api/ -x -q`⟩ → **344 passed** ×2 (81.3 s, 81.6 s) = 307 + 37 `test_cors.py` (logs `c-api-run1.log`, `c-api-run2.log`) |
| ruff | — | ⟨`ruff check api/main.py api/config.py api/tests/test_cors.py`⟩ → All checks passed; `test_cors.py` formatted |

pytest `tests/` not re-run: no byte under `src/` or `tests/` moved (⟨`git show --stat 9876aad`⟩ → `.gitignore, api/config.py, api/main.py, api/tests/test_cors.py, scripts/cors-probe.{sh,mjs}`); banked 171 ×2 at `.m`.

**Residuals.** (a) `RateLimit-Reset` is exposed beside `ETag`: the client reads it (`api-problem.ts:172`, the 429 backoff) and cross-origin it read `null`; the same gap as ETag, closed by the same one-source rule — recorded as an intent reading of "from one source of truth with the client". (b) `OPTIONS` left `allow_methods` (the client never sends it as a method; Starlette answers preflight itself). (c) `api/main.py:62` lacks one blank line before `class UnhandledErrorProblem` under `ruff format` — pre-existing from `4d98fa8` (`.m`), not reformatted here (another unit's bytes, cosmetic). (d) Production is still RED until `.h`/`.d` deploy `9876aad`; the production preflight read is `.d`'s.

**Adjacent edits.** `fourier-analysis/.gitignore:61-62` (above).

**Escalations.** None. Status: **DONE**.

### F-REL.h

Seat `claude-opus-5-5`, 2026-10-08/09. Spec §Units `.h` (F-REL.md:22-26 at true bytes; the plan and the brief cite :26-30, drifted; INTENT read at the true lines), §Why 2, §State Law (host changed only via its deploy path/config; no force-push); COHESION §0em, §0ei, §0eo (logs `~/.dev-logs/frel/h-*`, scratch worktrees `~/.fourier-frel/`).

**Crash recovery.** ⟨`git status --porcelain`⟩ (fourier) → only `web/**` (X-DS lane: `EquationView.vue`, `AppDock.vue`, `MorphShapePreview.vue`, `NotFoundCard.vue`, `VisualizationView.vue`) and `.worktrees/`; nothing in the .h writable set. Nothing inherited.

**Reproduction (G-h, the host's own output first).**
- Host = `34.197.214.67` (`dig +short api.fourier.babb.dev`), read over ssh read-only (`-p 1022`); nothing on the host was written. ⟨`grep -A3 fourier /opt/deploy/hooks.json`⟩ → the arm executes `/var/www/fourier-analysis/scripts/deploy-hook.sh` (the host tree's own copy, i.e. **`f2fe447`'s hook**, not HEAD's), `environment []`. ⟨`cat /opt/deploy/fourier-last-green`⟩ → `f2fe4470…`; ⟨`git log --oneline -1`⟩ (host tree) → `f2fe447`.
- ⟨`journalctl -u webhook --since "2026-10-06 16:45" --until "16:50"`⟩ (saved `~/.dev-logs/frel/h-webhook-20261006-1645.log`, 701 lines) → `16:45:30 advancing f2fe447… -> ad62881…` · `16:46:30 bringing up (up -d)…` · `Container fourier-analysis-nginx-1 Started` · `16:47:43 health gate FAILED on :8100 after 30 attempts (~60s)` · `ROLLBACK — health gate failed for ad62881…; reverting to f2fe447…` · rebuild + recreate to `16:48:44`. The build succeeded; every container "Started"; the gate never saw the edge answer.
- Local reproduction at `ad62881` (worktree `~/.fourier-frel/master`, certs from `scripts/gen-mongo-certs.sh`, `MONGO_PASSWORD` set, `HTTP_PORT=8191`, the host's two-file overlay): ⟨`docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`⟩ then 10 polls → `health=000 root=000` ×10; ⟨`docker ps -a`⟩ → `nginx-1 Restarting (1)` · `frontend-1 Restarting (1)` · `backend-1 Up` · `mongo-1 healthy`; ⟨`docker logs …-nginx-1`⟩ and `…-frontend-1` → `[emerg] 1#1: chown("/var/cache/nginx/client_temp", 101) failed (1: Operation not permitted)` (log `h-master-containers.log`). The backend booted and answered (`Application startup complete`).
- **Root cause:** H.W4 `fd213d0` levelled the edge nginx and the SPA nginx to `cap_drop: ALL` + `cap_add: NET_BIND_SERVICE` only. The stock nginx master chowns its tmpfs temp dirs to the worker user (CHOWN) and drops its workers to it (SETUID/SETGID); without them it exits at boot and restarts forever. Not env, not migrations, not the health route, not limits (the backend at `ad62881` booted healthy under `read_only` + `cap_drop: ALL`). `f2fe447` predates `fd213d0`, which is why the host stayed green there.
- The same falsifier against the pre-cure bytes: ⟨`PROJECT=frelh-master SKIP_BUILD=1 scripts/prod-compose-smoke.sh`⟩ (in the `ad62881` worktree) → `services not healthy: backend ; frontend ; nginx` · `LIVENESS GET /api/health → 000` · `READINESS GET / → 000` · exit 1; the `[emerg] chown` line ×12 in the dump (`h-smoke-before-master.log`).

**Acts (fourier `m/w1-bump-migration`; pulled `--ff-only` before every commit; pushed without force).**
1. `1aa784a` fix(deploy · F.REL .h): the hardened nginx containers boot — the cure + its CI gate, one family:
   - `docker-compose.prod.yml` frontend + nginx: `cap_add: [NET_BIND_SERVICE, CHOWN, SETUID, SETGID]` (`cap_drop: ALL`, `read_only`, tmpfs, `no-new-privileges` all kept); comments name the measured `[emerg]` and the webhook log.
   - `scripts/prod-compose-smoke.sh` (new): builds the production images, boots the two-file overlay (`up -d --wait`), asserts every service `healthy`, LIVENESS `GET /api/health` → `200 application/json {"status":"ok"}` and READINESS `GET /` → 404 through the edge, dumps `ps` + logs on failure.
   - `.github/workflows/ci.yml`: new job `prod-compose` ("production compose boot + health"); added to `inv-27-evidence` `needs` + its assertion loop, record and summary, so the hook's inv-28 covering-green query never ships a SHA whose production stack does not boot.
2. `18c2077` fix(deploy · F.REL .h): the deploy is health-gated — start new, health-check, then switch:
   - `scripts/deploy-hook.sh`: `build_and_up` (build + `up -d --wait` = in-place recreate) is replaced by `switch_stack` / `switch_back`: build while the old serves; per upstream (backend, frontend) PIN the edge to the serving container by name (`.deploy/edge/<svc>.conf` → `set $<svc>_upstream <container>:<port>;`), START the new one beside it (`up -d --no-deps --no-recreate --scale <svc>=n+1`), WAIT for its own HEALTHCHECK, MOVE the pin (`nginx -t` in the live edge, `nginx -s reload`, then wait until every pre-reload worker PID has exited, ≤150 s), RETIRE the old (graceful `docker stop -t 30`). Never-healthy → the new container is removed, the pin and the old container untouched. Edge config changes: `nginx -t` + graceful reload, never a recreate; mongo `--no-recreate`. `main` runs only when executed, so the falsifier sources the real functions.
   - `docker-compose.prod.yml` nginx: `./nginx:/etc/nginx/conf.d:ro` (directory, so a reset's renamed file is seen by name — retires G.W7's force-recreate) + `./.deploy/edge:/etc/nginx/fourier-upstreams:ro`.
   - `scripts/deploy-switch-smoke.sh` (new; CI `prod-compose` step 2): boots via `prod-compose-smoke.sh`, polls the edge (`/api/health` + `/index.html`, every ~0.4 s, under the backend's 180/min read budget), runs A (good switch of backend + frontend), B (backend image re-tagged to a never-healthy one), C (edge reload).
3. `3af0d6f` fix(ci · F.REL .h): the first CI run (`37870029036`) read mongod `Cannot read certificate file /etc/ssl/mongo.pem` (`InvalidSSLConfiguration`) — the runner writes the PEM 0600 as itself. The host holds it `999:999 0400` (⟨`ls -ln /var/www/fourier-analysis/ssl/`⟩ → `-r-------- 1 999 999 … mongo.pem`); the job now generates the material and hands the PEM to mongod's uid the same way.
4. `1015303` fix(deploy · F.REL .h): the pin directory is tracked (`.deploy/edge/README.md`; `.deploy/edge/*.conf` ignored). ⟨`systemctl show webhook -p User`⟩ → `User=mbabb`: a daemon-created bind source would be root-owned and the hook could never write a pin; `git reset` now creates it as the deploy user before any compose act.

**Measured defects in my own first drafts (fixed before commit, recorded):** (i) switching by Docker DNS (`--scale` alone) routed live requests to the new container while it was still `starting` — the never-healthy container took traffic and its removal cost one `000` → cured by the name pin; (ii) `nginx -s reload` only signals the master, so retiring the old upstream right after it gave one `502` per switch (run 2 at `01:26:08`) → cured by waiting for the pre-reload workers to exit; (iii) the falsifier's own `check "$(…)" $?` read `$?` after the label's command substitution (always 0) → explicit `rc=$?` capture.

**Gates (BEFORE → AFTER; logs `~/.dev-logs/frel/h-*`).**
| Gate | BEFORE | AFTER |
|---|---|---|
| G-h reproduce master's host health-check failure | unexplained (host pinned at `f2fe447`; "Master's API does not come up healthy there") | REPRODUCED — webhook journal (`health gate FAILED on :8100 after 30 attempts` → ROLLBACK) + local prod-compose at `ad62881` → edge + SPA nginx `Restarting (1)`, `[emerg] chown("/var/cache/nginx/client_temp", 101) failed (1: Operation not permitted)`; root cause H.W4 `fd213d0` cap floor |
| production-compose boot + health (local) | RED — ⟨`scripts/prod-compose-smoke.sh`⟩ at `ad62881` → liveness `000`, readiness `000`, exit 1 | GREEN ×3 on a clean worktree (`18c2077` ×2 with full build then reuse; `1015303` ×1) — `LIVENESS GET /api/health → 200 application/json {"status":"ok"}` · `READINESS GET / → 404` · backend/frontend/mongo/nginx `healthy` · `PASS` (`h-final-run{1,2,3}.log`) |
| production-compose boot + health on CI | none (no job; nothing off the host ever booted the prod overlay) | GREEN ×2 — job `prod-compose`: run `37870219377` @ `3af0d6f` (job `113626347167`) and run `37870549697` @ `1015303` (job `113627396669`): both steps success, `[prod-compose-smoke] PASS` (×2 boots per run) and `[deploy-switch-smoke] PASS`. (First run `37870029036` @ `18c2077` RED on the PEM ownership — act 3.) |
| deploy health-gated: new up + healthy before switch; a failed deploy never takes the old down | RED — in-place recreate; ~3 min outage per failed push (16:45:28 → 16:48:44Z) | GREEN — ⟨`scripts/deploy-switch-smoke.sh`⟩ clean tree: run 1 `polled 145 … failed: 0`, run 2 `144 … 0`, run 3 (@`1015303`) `144 … 0`; CI `162 … 0`, `163 … 0`. Each run: A backend + frontend switched (old id retired, new healthy, pin names the new container, 0 failed of ~111 requests); B never-healthy backend `rc 1`, same backend serving + healthy, pin never left it, 0 failed; C edge reload, 0 failed |
| shellcheck `-S warning` on the three scripts | — | clean |

Non-regression: no byte under `api/`, `src/`, `tests/` or `web/` moved (⟨`git diff --stat 9876aad 1015303 -- api src tests web`⟩ → only the X-DS lane's `web/` commits `f76544a`, `188cb91`, none from .h); CI `api/tests` success on both runs. CI `web` and `e2e` are RED on both runs (web: the lint floor, `web/` bytes; e2e: the standing master RED) — `.g`'s gate, untouched by .h.

**Residuals (named, carried to `.d` / the owner).**
- **R-h1 — OWNER ACT before `.d`'s second deploy: the host's hook environment.** The host's `hooks.json` fourier arm passes `environment []` (webhook journal) and `/opt/deploy/.env` carries only `WEBHOOK_SECRET`. HEAD's hook (F.W9 M.W4, unchanged by .h) refuses every deploy without `FOURIER_DEPLOY_ALERT_WEBHOOK` (inv-31, fail-closed by design), and its inv-28 query is unauthenticated without `GITHUB_TOKEN` (60/h rate limit). Setting a watched alert URL is host config the owner holds; this seat did not write it.
- **R-h2 — the first deploy after `.g` runs the host's `f2fe447` hook**, not this one (the webhook executes the host tree's own copy; bash keeps reading the old inode through the reset). That one deploy is the old in-place recreate (fused gate, no CI query): with the cap cure it is expected to pass its gate, but its recreate window is an outage `.d`'s health poll will see. From the second deploy on, the health-gated switch governs.
- **R-h3 — a change to the nginx service definition itself** (image, mounts, caps) recreates the edge (`up -d --no-deps nginx`); one edge can't hold `:8100` twice. Config changes under `nginx/` never do. The `.h` compose change (directory mount + pin mount) is such a change, and it lands inside R-h2's first deploy.
- **R-h4 — `.deploy/edge` pins outlive a manual `docker compose down`**: an operator who recreates the stack by hand should clear `.deploy/edge/*.conf` (a pin names a container that no longer exists). The hook re-pins on every switch; the smoke clears them.
- **R-h5 — local-only build bloat:** the untracked `.worktrees/` (3.0 GB, other seats') is not in `.dockerignore`, so local builds ship ~2 GB of context; the clean-tree worktree runs avoided it and CI/host trees don't carry it. `.dockerignore` is outside this unit's bounds.
- **Docker disk.** My builds filled the Docker VM (58.4 GB, 100%) mid-seat; `value-js-dev-mongo` aborted on `No space left on device` at 01:29:56Z. I removed my own images (`frelh-master-*`, `fourier-prod-smoke-*`, `fourier-switch-smoke-*`) and pruned the unused build cache (30.11 GB), then restarted that container (⟨`docker start value-js-dev-mongo`⟩ → `Up`); it was running before the seat. VM disk after: 30.2 GB free.

**Adjacent edits.** `fourier-analysis/nginx/fourier.conf:24-28` — the pin `include /etc/nginx/fourier-upstreams/*.conf;` after the two default `set` lines (the upstream swap the cure requires; same concern). `fourier-analysis/.gitignore` — `!scripts/prod-compose-smoke.sh`, `!scripts/deploy-switch-smoke.sh` (scripts tracked by negation) and `.deploy/edge/*.conf` (host state). `fourier-analysis/.deploy/edge/README.md` (new) — the tracked pin directory (act 4).

**Escalations.** None blocking `.h`'s gates. R-h1 is an owner act `.d` needs (host hook env: `FOURIER_DEPLOY_ALERT_WEBHOOK`, optionally `GITHUB_TOKEN`). Status: **DONE**.
