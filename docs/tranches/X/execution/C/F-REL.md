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
