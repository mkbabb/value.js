# N.W4-ARTIFACT — Deploy-truth: the committed artifact made TRUE + PROVEN LOCALLY

**Lane**: W4-ARTIFACT (the deploy-artifact half of N.W4 — the Ask-3 wave)
**Branch**: `tranche-f-handoff` · **Date**: 2026-06-11
**Status**: **GREEN** — every artifact is true; the hard local proof passed end-to-end on real Docker.

The lead sequencing decision is honoured: **production tracks master; the final wire deploy
fires at N.W8 after the master merge.** This lane made every artifact TRUE and PROVEN LOCALLY so
that deploy is push-button. NO push to origin; NO production webhook poke; NO commit.

---

## What landed (the four sub-asks)

### W4.A — `api/compose.yaml` single-node replica set `rs0` (the transactions P0)

The committed `compose.yaml` ran a **standalone** `mongod` — so the 14 `withTransaction` sites
threw on the wire (V2). Fix, the standard single-node-rs compose idiom (no sidecar):

- `mongo.command: ["mongod", "--replSet", "rs0", "--bind_ip_all"]`.
- The mongo **healthcheck** performs the one-shot `rs.initiate({_id:"rs0", members:[{_id:0,
  host:"mongo:27017"}]})` **idempotently** — `try { rs.status().ok } catch { rs.initiate(...).ok }
  | grep -q 1`. It reports healthy only once a **PRIMARY** is elected, which is exactly the
  condition `api`'s `depends_on: { mongo: { condition: service_healthy } }` must wait for before it
  opens a transaction-capable connection. No separate init container, no keyfile (auth is off on
  the internal-only network — volumes/auth/hardening kept as-is).
- `MONGODB_URI` gains `?replicaSet=rs0&directConnection=true` (the one-node-rs driver idiom — pins
  the driver to the single seed so first-connect can't stall on the advertised member host).
- Docker hardening floor (`read_only`, `tmpfs`, `cap_drop: ALL`, `no-new-privileges`, resource
  limits, log rotation) untouched — the file was already the constellation reference (D3 §3).

### W4.B — `scripts/deploy-hook.sh` (NEW) — the on-host half deploy.sh already specs

Authored the on-host deploy logic `scripts/deploy.sh:6-11` references but which was **absent** from
the tree (D3 G6 / D6 §2). Idiomatic bash distilled from the constellation standard
(`mkbabb/deploy/templates/deploy-hook.sh`) + the fourier reference, carrying the four hardening
properties the live host dispatcher provably lacks:

1. **flock single-flight** on a per-repo lockfile (`/run/lock/palette-deploy.lock`).
2. **dirty-tree-fail-loud** before any `git reset --hard` (never silently discards host edits).
3. a **REAL health-gate** — bounded poll of `/health` (liveness body token) **AND** `/` for the
   declared `ROOT_EXPECT` (200 — this is an API origin, not an SPA origin, so root legitimately
   returns 200; that is the inv-22 contract for this repo). NO `|| echo` swallow — its non-zero
   exit IS the rollback trigger.
4. **rollback-on-rollback** — on gate failure: `git reset --hard $prev`, REBUILD, up, RE-GATE.

It is config'd for palette-api: `APP=palette`, `REPO_DIR=/srv/constellation/palette-api` (a git
checkout — the Ask-3 conversion), `COMPOSE=(docker compose -f api/compose.yaml)` (single file, no
overlay), `HEALTH_PORT=${HTTP_PORT:-8130}` (sourced from the SAME default the compose bind uses, so
gate and bind cannot drift), no migration step (the api has none — index creation is idempotent in
`getDb()` on every boot). It threads `DEPLOY_COMMIT_SHA=$new` into the bring-up so `/health` stamps
the deployed lineage. The header records that **adopting this hook + the git-checkout conversion is
the gating 4th migration that retires the host's legacy `dispatch.sh`** (Ask 3).

`deploy.sh` alignment: `API_HEALTH_URL` default `https://api.color.babb.dev/palettes` →
`/health`.

### W4.D — `/health`, `/docs`, `/openapi.json` (inv-22-color)

A new **meta router** (`api/src/routes/meta.ts`) mounted at `/` in `index.ts`, plus a flat route
table (`api/src/routes/meta-routes.ts`) that is the single source of truth `/docs` and
`/openapi.json` both render (they cannot drift from each other at runtime). KISS — no new framework
dep; hand-authored from `src/routes/**` (the table is what a reviewer checks against).

- **`GET /health`** — liveness + a **live `db.command({ ping: 1 })`** + version/lineage stamp
  (`version` from api package, `commit` from `DEPLOY_COMMIT_SHA` env). 200 when mongo pings; **503**
  (`status:"degraded"`) when mongo is down, so the deploy-hook gate rolls back on a DB outage. The
  compose `api` healthcheck was re-pointed `/` → `/health`.
- **`GET /docs`** — a self-contained HTML routes index grouped by surface (Meta / Sessions /
  Palettes / Colors / Admin), with method/path/auth/summary.
- **`GET /openapi.json`** — an honest OpenAPI **3.1** spec generated from the route table at module
  load; session/admin routes carry the right `securitySchemes` (`X-Session-Token` apiKey / bearer
  ADMIN_TOKEN). 47 paths.

### Tests (`api/test/routes/meta.test.ts`) — 5 new, all green

`/health` exercised against the suite's ephemeral replica set (asserts `checks.mongo === "ok"` + the
version/lineage stamp); `/docs` asserts 200 text/html + representative routes; `/openapi.json`
asserts 200 application/json + **faithfulness** (every `(path, method)` in the table is in the spec)
+ the security-scheme attachment. **api suite: 219/37** (was 214/36 — +5 tests, +1 file).

---

## THE LOCAL PROOF (the W4 hard gate) — PASSED

Docker daemon was down at lane start; launched Docker Desktop; daemon came up. Full proof on a
scratch project name `valuejs-w4-proof`:

1. `docker compose -f api/compose.yaml -p valuejs-w4-proof up -d --build` → both containers
   **healthy** (mongo healthy = `rs.initiate` ran; api started after `service_healthy`).
2. Mongo confirmed `rs0` **PRIMARY** (`rs.status()`: `set: rs0 | myState: 1 | primary members: 1`).
   api boot log clean (`[migrations] schema invariants OK`).
3. **The 3 endpoints — 200:**
   - `GET /health` → 200 `{"status":"ok","version":"2.0.0","commit":"w4proofSHA01","checks":{"mongo":"ok"},...}`
     (the `commit` proves the lineage stamp; `mongo:"ok"` proves the live ping).
   - `GET /docs` → 200 `text/html`.
   - `GET /openapi.json` → 200 `application/json`, `openapi 3.1.0`, 47 paths.
4. **A real MUTATION crossing a `withTransaction` site:**
   - `POST /sessions` → 201 (registered; got token + userSlug).
   - `POST /palettes` (slug `w4-proof-palette`) → **201** — `createPalette` wraps
     `services.withTransaction`, writing BOTH `palettes` AND `palette_versions` in one transaction.
   - `GET /palettes/w4-proof-palette` → 200 (palette doc committed).
   - `GET .../versions` → **1 version row committed** (the second collection in the same
     transaction). On a standalone mongo `startTransaction()` would have thrown — the 201 + the
     committed version row IS the proof the rs0 artifact executes transactions.
5. Verified the **deploy-hook health_gate** logic against the live stack (health body token + root
   200) → GREEN verdict. `bash -n` + `shellcheck` clean on `deploy-hook.sh`.
6. `docker compose ... down -v` → clean (no leftover containers / volumes / networks).

---

## Gates

- api `tsc --noEmit`: **0 errors**. eslint on the new files: **0**. api suite: **219/37 green**.
- `bash -n` + `shellcheck`: `deploy-hook.sh` clean. (`deploy.sh` carries a pre-existing,
  not-introduced SC1091 *info* note on its `.env` source.)
- Local Docker proof: PASSED (transaction committed on the committed rs0 artifact; 3 endpoints 200).

## inv-N-5 (deployed-truth) — lane contribution

The committed deploy artifact **can now execute transactions** (rs0) — half of inv-N-5 is
discharged structurally and proven. The other half (the **production wire serving HEAD-lineage
code**) is the W4.C deploy, which by the lead's binding sequencing fires at **N.W8** after the
master merge — this lane makes that a push-button (`scripts/deploy.sh api` → webhook →
`deploy-hook.sh`). The `/health` lineage stamp means V3's "what code is on the wire?" is henceforth
a single `curl /health` (`commit`), not a field-by-field envelope diff.

## Out of lane scope (recorded honestly, not silently dropped)

- **W4.C deploy to prod** — deferred to N.W8 by the lead's binding sequencing (no origin push, no
  webhook poke this lane).
- **W4.E vhost refresh** (`api/apache-vhost.conf` stale `:3100` → `:8130`; D3 G8/G15) + the **DEC-9
  NCSU-alias retirement** honest record (V3 found the alias ALIVE, byte-identical, same rate-limit
  pool) — these are host/vhost edits paired with the W4.C wire deploy; folded to N.W8 with the
  deploy. The deploy-hook's port is sourced from `${HTTP_PORT:-8130}` so it is already correct; the
  apache conf is the remaining stale surface.
- **W4.F `deploy-pages.yml` CI-gated CF-Pages** (Ask 5; D3 G1) — the CI-workflow lane, orthogonal to
  the api artifact; not in this lane's ownership (`api/compose.yaml`, `scripts/deploy*.sh`,
  `api/src` routes, `api/test`).

## Files

- `api/compose.yaml` — rs0 + idempotent `rs.initiate` healthcheck; `MONGODB_URI` replicaSet;
  `DEPLOY_COMMIT_SHA` env; api healthcheck → `/health`.
- `scripts/deploy-hook.sh` (NEW, +x) — the on-host hardened hook.
- `scripts/deploy.sh` — `API_HEALTH_URL` → `/health`.
- `api/src/index.ts` — mount the meta router.
- `api/src/routes/meta.ts` (NEW) — `/health` `/docs` `/openapi.json`.
- `api/src/routes/meta-routes.ts` (NEW) — the shipped-route table (single source of truth).
- `api/test/routes/meta.test.ts` (NEW) — 5 tests.
