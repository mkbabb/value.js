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

### F-REL.g

Seat `claude-opus-5-5`, 2026-10-08/09. Spec §Units `.g` (F-REL.md:31), §Why 1 and 5; COHESION §0em, §0ei (headless only), §0eo (logs `~/.dev-logs/frel/g-*`, scratch `~/.fourier-frel/g-*`). **Status: ESCALATED** — every act inside the `.g` bounds landed; master e2e cannot go GREEN from inside them, so master was **not** merged or pushed (pushing master fires the host webhook deploy, R-h2, which is `.d`'s to supervise behind a green master).

**Crash recovery.** ⟨`git status --porcelain`⟩ (fourier) → `web/src/**` (X-DS lane WIP: GalleryCard, BasisSelector, ContourSettings, ImageUpload, VisualizationView, style.css), `web/e2e/screenshots/f-w14/*.png` (rewritten by e2e runs; never committed by this seat) and `.worktrees/`. Nothing in the `.g` set inherited.

**Seat-0 brief.**
- ⟨`git fetch`⟩; ⟨`git show ad62881 | git patch-id --stable`⟩ and ⟨`git show 983cbbf | git patch-id --stable`⟩ → both `ba3fc6e32bc15ff9005f25adc945a2c853af0810`: **983cbbf ≡ ad62881, reconciled**; `983cbbf` is on `m/w1-bump-migration` (⟨`git branch -a --contains 983cbbf`⟩ → local + origin); master is 1 behind only by `ad62881`. ⟨`git merge-tree --write-tree --name-only origin/master HEAD`⟩ → tree `c162dad…`, exit 0, auto-merging `.gitignore` + `deploy-pages.yml`: **the merge is clean and ready** (not performed — see Escalation).
- Local `master` (`02c5d24`) is 17 ahead / 1 behind `origin/master`, but ⟨`git rev-list --count master ^HEAD`⟩ → 0 (all 17 already on m/w1): the merge base for the act is `origin/master`, not the stale local ref.

**Diagnosis of master CI (run 37498214674 and the m/w1 dispatches).**
1. **web job RED on two lint gates** (not only e2e): oxlint `--deny-warnings` 11 findings (6 in `web/src`, 5 in `web/e2e`), then `npm run lint` (eslint `no-duplicate-imports`) 3 errors. `deploy-pages` gates on `workflow_run.conclusion == 'success'`, so the web job alone keeps it skipped.
2. **e2e job "The operation was canceled" ~2 min into Playwright** on every m/w1 run (37870549697, 37874946463; annotations: only `The operation was canceled.`). Root cause measured locally: **the backend's RSS explodes on contour recomputation** — ⟨RSS sampled 2 Hz around single contour-extraction tests⟩ → upload+extract `112→385 MB`; "adjust contour controls" `385 MB→5853 MB`; "strategy switching" `6656 MB→16691 MB` (`~/.dev-logs/frel/g-backend-rss.log`, whole spec: 0.1 G → 17.2 G peak in 60 s). A 16 GB ubuntu-latest runner dies there (test 4 timed out at 31.9 s, then the job is killed). Same path in production: `docker-compose.prod.yml:39` caps the backend at `memory: 2G`, so a parameter change or strategy switch OOM-kills it. `api/**`/`src/fourier_analysis/**` are outside `.g`'s set → **ESC-FREL-g-1**.
3. **The gating suite RED set**, measured on a clean HEAD worktree (`~/.fourier-frel/g-wt`, so the X-DS WIP in the main tree cannot colour it; API :8191 + vite :3192, headless chromium, §0ei).
   - Full suite, 3 workers, no retries, main tree (`g-e2e-diag-2.log`): **26 failed · 514 passed · 3 skipped** of 543.
   - Failing specs re-run serially on the clean tree (`g-e2e-diag-4-clean.log`): **23 failed · 29 passed** — `equation-interaction` S2 and `f-w13-radius` frame 5 pass serially (load flakes at load 400–900, a `waitForResponse` inside a 30 s test timeout), the rest are deterministic.
   - Classified (each read from its `error-context.md`):

| Class | Tests | Reading | Home |
|---|---|---|---|
| glass ADOPT-AT-LANDING (named in their specs) | `f-w14v-au3` L1-12 ×1 · `f-w14v-c3` c3m ×1, c3g ×1 · `f-w14v-pd` collapsed ×6 | "Settle Out is a glass CardTitle…" · `MAGNET-STATE-HIDDEN while 0` · `MENU-ICON-GAP while 0` · `DOCK-SUMMARY-SQUARE while any` | **declared** (act 2) |
| stale oracle | `visual-checkpoint` items 1/2/5 (the card's name) | `Open img-amber-fox-spiral-one` not found; the card and modal are named by `ENTRY.title` (gallery.spec, f-w14-uia, f-w14u-gallery already read it) | **cured** (act 3) |
| visual goldens | `visual-checkpoint` ×5 | darwin goldens drifted by the redesign (card 240×301 → 277×238, disclosure 4 %, tooltip 3 %), and **no `*-linux.png` golden exists at all**, so CI can never pass them (Sept CI: "A snapshot doesn't exist … writing actual") | ESC-FREL-g-3 |
| product contrast | `contrast-floor` ×3 | light 18/36, dark 10/36 pairs under floor (owners F.W4 `.a/.d/.e`); 5 pairs with no re-derivable stack (owners `.b/.c/.e`) | ESC-FREL-g-2 |
| product a11y (producer) | `gallery-admin-a11y` ×4 | axe `aria-hidden-focus` serious: glass `Toaster`'s viewport (`Notifications (F8)`, `@mkbabb/glass-ui/toast`, App.vue:174) renders `span[aria-hidden="true"]` focus proxies that are focusable — no O-row names it yet | ESC-FREL-g-2 (glass mail) |
| product layout/behaviour | `f-w14u-d` d2 ×2 · `f-w14v-p` p3 ×1 | the canvas dock never reaches `.collapsed` after `traceOff` (stays `expanded`; cf. §0el "the shrunken and dock animations … still broken") · at 1024 a toast overlaps the Configurator aside by 33 451 px² | ESC-FREL-g-2 |

**Acts (fourier `m/w1-bump-migration`; `git pull --ff-only` before each commit; pathspec commits; pushed without force).**
1. `4bcdeaa` fix(web · F.REL .g): the oxlint floor — 11 findings cured at their sites, none suppressed (ternary-as-statement → if/else ×3 in `ConvergencePlot.vue`; `new Array(n)` fill loops → `map` ×2 in `svg-fourier.ts`; `?? {}` inside an object spread dropped in `api.ts`; regex-anchor tests → `endsWith` ×3; redundant spread of `map()` dropped; a typed-array spread → `Array.from` because the `page.evaluate` return must stay a plain array).
2. `5493e11` test(e2e · F.REL .g): **the named honest-RED set** — one commit family:
   - `web/playwright.config.ts`: `export const HONEST_RED` (row, spec, title RegExp, failure `token`) naming the four glass rows (L1-12 / O-74b; MAGNET-STATE-HIDDEN and MENU-ICON-GAP / O-76 addendum; DOCK-SUMMARY-SQUARE / O-84 → O-65) = 9 tests; the gating cells (`chromium`, `mobile-chromium`, `chrome-gpu`) `grepInvert` the set; a new `honest-red` project greps exactly it. No `test.skip`, no `test.fixme`, no allowlist.
   - `web/e2e/honest-red-reporter.ts` (new): returns the run status — passes only when every row matches ≥1 test and every matched test failed with the row's own token; fails on a row that now passes (glass landed → adopt and delete the row), matches nothing, is skipped, or is RED for another reason.
   - `.github/workflows/ci.yml` e2e job: step "Honest-RED set (glass ADOPT-AT-LANDING rows) — still RED as declared" (`if: !cancelled()`), after the gating cells.
3. `4d8fb75` test(e2e · F.REL .g): `visual-checkpoint.spec.ts` — the card's open button and the modal are found by `ENTRY.title` (4 sites; oracle only, screenshot comparisons untouched).
4. `c17c1ce` fix(web · F.REL .g): eslint `no-duplicate-imports` — type imports folded into their value imports as inline `type` specifiers (`Tooltip.vue`, `BasisCanvas.vue`).

**Sitting 2 (seat `claude-opus-5-5`, 2026-10-09, under COHESION §0ev — the owner's no-deferral order).** The sitting-1 seat was killed after act 4; its receipt above was found **uncommitted** in this record (inherited, judged conforming against the spec, kept verbatim and finished here).
- **Crash recovery (fourier).** ⟨`git status --porcelain`⟩ → only `web/e2e/screenshots/f-w14/*.png` (rewritten by e2e runs; X-DS's lane) — nothing inside `.g`'s set (`web/playwright.config.ts`, `web/e2e/**` code, `.github/workflows/**`) is dirty. ⟨`git fetch`; `git log --oneline -1 origin/m/w1-bump-migration`⟩ → `c17c1ce` (= local, 0/0); ⟨`git log --oneline -1 origin/master`⟩ → `ad62881` (unmoved).
- **CI after acts 1–4.** ⟨`gh run view 37876128973`⟩ (m/w1 `c17c1ce`, dispatch) → api/tests ✓ · **web ✓** (the lint floor is cured) · production compose boot + health ✓ · **e2e ✗** at "Run Playwright e2e" (the job killed; the honest-RED step never reached). The web job is no longer a blocker; e2e is.
  ⟨`gh run view 37876128973 --log-failed`⟩ (`~/.dev-logs/frel/g2-ci-e2e-37876128973.log:640-642`) → `✘ 4 … upload and extract contours — llama-1.webp` then `##[error]The runner has received a shutdown signal …` / `The operation was canceled.` — the runner itself dies (the OOM signature), the 4th single-image extraction in.
- **ESC-FREL-g-1 sharpened to its root (measured this sitting).** The RSS explosion is **one model's inference**, not a leak:
  - ⟨`PYTHONPATH=. uv run python ~/.fourier-frel/g2/rss.py assets/animals/chef-2.jpeg`⟩ (default `ContourSettings`, 2 Hz RSS poll, kill at 6 GB / 8 GB) → killed both times inside the **first, default** extraction; `faulthandler` stacks (`~/.dev-logs/frel/g2-rss.log`) all sit in `ml.py:198 _predict_one → session.run` (`isolation.py:99 subject_mask → ml.py:211 subject_maps`); peak polled 8541 MB (`g2-rss-poll.log`).
  - ⟨`uv run python ~/.fourier-frel/g2/onnx_peak.py ~/.cache/fourier-analysis/models/birefnet-general-lite.onnx 1024 {1,0}`⟩ (`g2-onnx-peak.log`) → `afterLoadMB 587 peakMB 9049` (ORT CPU arena on) · `afterLoadMB 574 peakMB 7505` (arena and mem-pattern off): **BiRefNet-lite at its 1024² input peaks 7.5–9.0 GB for one inference.** It entered `SUBJECT_MODELS = (U2NET, BIREFNET_LITE)` (`ml.py:90`) at F.CT CT-2 `03e5e1c`; §0eu adopted that pipeline (C) for production.
  - Consequences: CI's 16 GB ubuntu runner dies by the 4th extraction (above); production's `docker-compose.prod.yml` caps the backend at `memory: 2G`, so **every** extraction there OOM-kills the API once `.m`'s baked models are deployed — `.d`'s "contour extraction with the new pipeline" row cannot go GREEN either. Arena flags alone do not bring it under 2 G (7.5 GB measured), so the cure is a pipeline decision (the subject model's input size, the ensemble's membership, or a memory-bounded runtime), owned by `src/fourier_analysis/contours/**` (F.CT / F.REL `.m` scope), outside `.g`'s writable set and not an adjacent line.
- **Not done, and why (no substitute taken).** The merge `m/w1-bump-migration → master` is **not performed**: ⟨`git merge-tree --write-tree --name-only origin/master HEAD`⟩ stays clean (sitting 1), but a master push fires the host webhook deploy (R-h2) of an API whose extraction OOMs at the 2 G cap (ESC-FREL-g-1), and with e2e RED the SPA's `deploy-pages` stays skipped — merging now ships the breakage, not the spec's "SPA ships again". The merge is the first act once G-e2e can turn. No heavy suite was re-run this sitting: the host's 1-min load read ⟨`uptime`⟩ 45 → 80 → 269 → 439 → 647 → 702 across it (resource law: wait while > 40).
- **Gates (BEFORE → AFTER).**

| Gate | BEFORE (open) | AFTER (this unit) | Reading |
|---|---|---|---|
| web lint (oxlint `--deny-warnings` + eslint) | 11 + 3 findings, CI web ✗ | 0; CI web ✓ (run 37876128973) | GREEN (acts 1, 4) |
| web vue-tsc | exit 0 | exit 0 ×2 (`g-vuetsc-3.log`, `g-vuetsc-4.log`, empty = clean) | GREEN (banked sitting 1; no `.g`-set or `web/` byte moved since `c17c1ce`) |
| web vitest | 116/116 | `Tests 116 passed (116)` ×2 (`g-vitest-2.log`, `g-vitest-3.log`) | GREEN (banked) |
| pytest `tests/` | 169 ×2 (banked) | 171 passed (`g-pytest-tests-1.log`, sitting 1) | GREEN ×1 this unit; ×2 banked by `.m` |
| honest-RED set | absent | declared in `playwright.config.ts`; `honest-red` project rc=0 (`g-honest-red-1.log`); falsifier: a row that passes is reported `NOW PASSES` and fails the step (`g-honest-red-falsifier.log`) | GREEN (act 2) |
| **G-e2e master CI** | RED (37498214674) | **RED** — runner killed at the 4th extraction (37876128973); plus ESC-FREL-g-2 (contrast ×3, toaster axe ×4, dock/toast ×3) and ESC-FREL-g-3 (no linux goldens, darwin goldens drifted ×5) | **RED** |
| web e2e ×2 local | RED | not re-run (load > 40 the whole sitting) | RED |

**Escalations (each outside `.g`'s writable set and not an adjacent line).**
- **ESC-FREL-g-1 — the production subject model does not fit its memory.** BiRefNet-lite @1024² peaks 7.5–9.0 GB per inference (above); CI's runner dies and the 2 G production backend would OOM on every extraction. Home: `src/fourier_analysis/contours/ml.py` (`SUBJECT_MODELS`, `BIREFNET_LITE.input_size`) under F.CT / F.REL `.m`, with a ruling on the cure's shape (smaller input, ensemble membership, or a memory-bounded runtime) since §0eu adopted C whole. Falsifier for the cure: `onnx_peak.py`-style peak RSS of one default extraction < the prod cap, and CI e2e passes `contour-extraction.spec.ts` whole.
- **ESC-FREL-g-2 — product defects the gating suite rightly reports.** `contrast-floor` ×3 (F.W4 owners), `gallery-admin-a11y` ×4 (glass `Toaster` focusable `aria-hidden` proxies → a glass O-row by mail; glass is READ-ONLY), `f-w14u-d` d2 ×2 + `f-w14v-p` p3 ×1 (dock never collapses after `traceOff`; toast over the Configurator at 1024). Homes: `web/src/**` (X-DS's concurrent lane) and glass mail.
- **ESC-FREL-g-3 — visual goldens.** `visual-checkpoint` ×5: no `*-linux.png` golden exists, so CI can never pass them, and the darwin goldens drifted with the X-DS redesign. Regenerating goldens is inside `web/e2e/**`, but it is an oracle re-baseline that needs (a) a ruling that the redesigned frames are the accepted state and (b) a linux render (Playwright's container), a heavy run the load forbade this sitting.

**Residuals.** The merge and master push (first act after ESC-FREL-g-1 is cured and G-e2e can turn); e2e ×2 local; CI watch + `deploy-pages` not skipped. **Status: ESCALATED.**

### F-REL.d

Seat `claude-opus-5-5`, 2026-10-09, under COHESION §0ev (no deferral). Spec §Units `.d` (F-REL.md:32-37), §Gates (:37). **Status: ESCALATED** — the production check is built, committed and read against the live host; the deploys it verifies cannot lawfully fire, because both standing deploy paths are fail-closed on a green master CI and `.g` (ESCALATED) left master unmerged behind ESC-FREL-g-1.

**Crash recovery.** ⟨`git status --porcelain scripts/`⟩ (fourier) → empty; ⟨`git status --porcelain docs/tranches/X/fourier/evidence/F-REL/`⟩ (value.js) → the dir did not exist. Nothing inherited.

**Why no deploy (measured, not assumed).**
- ⟨`git log --oneline -1 origin/master`⟩ → `ad62881` (unmoved; `.g` withheld the merge). ⟨`git log --oneline -1 origin/m/w1-bump-migration`⟩ → `fe1749e` (F.CT3) atop `c17c1ce`.
- ⟨`grep -n DEPLOY_BRANCH scripts/deploy-hook.sh`⟩ → `:127 DEPLOY_BRANCH="${FOURIER_DEPLOY_BRANCH:-master}"`, and `:295` asks GitHub for a run with `head_sha=…&branch=master&event=push&status=success` (the M.W3 fail-closed rule): the webhook deploys only a master SHA whose CI succeeded. ⟨`grep -n conclusion .github/workflows/deploy-pages.yml`⟩ → `:55 workflow_run.conclusion == 'success' && head_branch == 'master'`. Master CI's e2e is RED (`.g`: runner killed by BiRefNet-lite's 7.5–9.0 GB inference, ESC-FREL-g-1; plus -g-2, -g-3).
- The merge is `.g`'s act, outside `.d`'s writable set. Taking it here would (a) still deploy nothing (CI RED → both paths skip) and (b) once CI could pass, ship an API whose every extraction OOMs at `docker-compose.prod.yml`'s `memory: 2G`. No substitute deploy (hand-run compose on the host, a manual Pages upload) is lawful under the lock "deploy only via the standing deploy-pages workflow + the webhook".

**Acts.**
1. fourier `94870dc` feat(scripts · F.REL .d): `scripts/prod-verify.mjs` — the six-row headless production check. Chrome headless (§0ei); every API call is a `fetch` from a page on the SPA origin, so the browser enforces the real CORS contract (PATCH/DELETE preflights with `If-Match`, the exposed `ETag`). Rows: session · per image upload, upright (the served thumbnail decoded by `createImageBitmap` is portrait), extract (default `ContourSettings` = the production pipeline), epicycles, create · preview `/v/<slug>` canvas · publish · remix · diff · gallery (public listing carries the row; `/gallery` screenshot) · edit (PATCH + `If-Match` from the exposed `ETag`) · delete every created row · no CORS console errors. Only the first image (repo asset) is published; the EXIF-6 original stays a private draft. When extraction is RED, a drawn contour (the client's `saveContour` path) carries the downstream rows; the extract row stays RED. Pushed to `origin/m/w1-bump-migration` (no deploy fires from that branch).
   - **Adjacent edit:** fourier `.gitignore:68` `!scripts/prod-verify.mjs` — `scripts/*` is ignored with a tracked allow-list; without the entry the probe cannot be committed (same commit).
2. value.js evidence `docs/tranches/X/fourier/evidence/F-REL/` (README with the receipts, `pages-smoke.log`, `openapi-paths-now.txt`, `d-verify-before/{rows.json,probe.log,preview-1440.png,gallery-1440.png}`).

**Readings against the live host (pre-F.REL, `f2fe447`; 1-min load 685 at the read).**
- ⟨`bash scripts/pages-smoke.sh`⟩ → `bundle /assets/index-BYSiPuAh.js carries the API base … health: 200 application/json … CORS: Access-Control-Allow-Origin https://fourier.babb.dev … cert … > 14 days … PASS`, rc 0.
- ⟨`openssl s_client … | openssl x509 -noout -enddate`⟩ → api.fourier `notAfter=Jan  4 15:19:06 2027 GMT` · fourier `notAfter=Dec 22 20:13:07 2026 GMT` (both > 14 d).
- ⟨`curl …/openapi.json`; python path diff vs `~/.fourier-samples/frel-openapi-before.json`⟩ → `34 0.2.0 34 [] True`: **identical to before; no publish/remix/diff path.**
- ⟨`node scripts/prod-verify.mjs https://fourier.babb.dev https://api.fourier.babb.dev ~/.dev-logs/frel/d-verify-before assets/portraits/daraksha.jpg ~/.fourier-samples/daraksha.jpeg`⟩ → rc 1, `10/20 GREEN`:
  - GREEN: session · upload ×2 · **upright ×2** (`w 768 h 1024` for both, the EXIF-6 original included) · epicycles ×2 · create ×2 · preview canvas.
  - RED: extract ×2 (`TypeError: Failed to fetch` — the 500 without a CORS header, §Why 3) · publish 404 · remix 404 · diff (no child) · gallery (not listed) · PATCH (`etagExposed:false`, preflight blocked, §Why 4) · CORS console errors.
  - The two `delete` rows read 401 `owner-required`: a **probe defect** of that run (the token lived in the page and was lost on navigation), fixed before `94870dc` (the token is held by the driver). Not a production reading.

**Gates (BEFORE → AFTER).**

| Gate | BEFORE | AFTER | Reading |
|---|---|---|---|
| G-smoke `pages-smoke.sh` | PASS (open) | PASS (live SPA = the hotfix build; no new SPA shipped) | GREEN as non-regression; the "SPA ships via deploy-pages" half is NOT met |
| G-cert > 14 d | Jan 4 2027 / Dec 22 2026 | same | GREEN |
| G-outage (health polled through the webhook deploy) | n/a | n/a — no deploy fired | NOT READ (no deploy) |
| openapi lists publish/remix/diff | 34 paths, none | 34 paths, none (byte-identical) | **RED** |
| G-d headless production check | RED by construction | probe landed (`94870dc`); live host 10/20 — extract ×2, publish, remix, diff, gallery, PATCH RED | **RED** |

**Escalation ESC-FREL-d-1.** `.d` cannot deploy: both deploy paths are fail-closed on a successful master CI, master is unmerged, and master CI e2e is RED at ESC-FREL-g-1 (BiRefNet-lite @1024² 7.5–9.0 GB/inference vs the 2 G prod cap; home `src/fourier_analysis/contours/ml.py` under F.CT/F.REL `.m`, needs a ruling on the cure's shape) plus ESC-FREL-g-2/-g-3. Order to close: cure g-1 → `.g` merges and turns master CI green → deploy-pages and the webhook fire → `.d` re-sits: poll `/api/health` every 1–2 s through the webhook deploy (G-outage), confirm openapi, run `scripts/prod-verify.mjs` with both images (G-d) — every step scripted and committed now.

**Residuals.**
- Two private **draft** rows left in production by the first probe run (their deletes 401'd on the probe defect above): `mighty-drawing-umber-zebra` (daraksha.jpg) and `rich-pouring-mango-salmon` (the EXIF-6 sample). Owner-only visibility; the anonymous session token was not retained. Removal: admin `DELETE /api/admin/visualizations/<slug>?hard=true` (needs the admin token — owner act), or the `.d` re-sit's admin cleanup.
- The images uploaded (`faded-darting-onyx-yak`, `twilit-cresting-prism-kestrel`) are content-addressed assets with no delete route; neither is public.
- G-outage, openapi, G-d AFTER readings owed to the `.d` re-sit after the deploy.

**Status: ESCALATED** (ESC-FREL-d-1).
