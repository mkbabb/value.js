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
