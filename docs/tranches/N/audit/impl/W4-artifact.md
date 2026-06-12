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

---

## W4 Verification

**Verifier lane**: independent post-landing audit · **Date**: 2026-06-11 · **Verdict**: **GREEN with two advisory notes**

All commanded checks run from the repo root (`tranche-f-handoff` at commit `0deca84`, the current HEAD — W4 artifact is at `e62567a`).

### 1. `api tsc --noEmit`

```
EXIT: 0
```

0 errors. Gate passes.

### 2. `docker compose -f api/compose.yaml config --quiet` — valid + rs0 present

Config validates (exit 0). The rs0 string appears on three lines of the rendered config:

- `--replSet` (mongod command arg)
- `rs0` (the arg value)
- `MONGODB_URI: mongodb://mongo:27017/palette-db?replicaSet=rs0&directConnection=true`
- `rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "mongo:27017" }] }).ok` (in the healthcheck test command)

Gate passes.

### 3. `api npm test` — 219/37 green

```
Test Files  37 passed (37)
Tests       219 passed (219)
Duration    16.19s
```

Matches the W4 artifact claim of 219/37. Gate passes.

### 4. `bash -n scripts/deploy-hook.sh` + `shellcheck`

Both return exit 0. `shellcheck` (at `/opt/homebrew/bin/shellcheck`) reports no warnings or errors. Gate passes.

### 5. `python3 -c "import yaml; yaml.safe_load(...)"` on `.github/workflows/deploy-pages.yml`

Exit 0 — valid YAML. Gate passes.

### 6. Vhost port == compose port

- `api/apache-vhost.conf`: `ProxyPass / http://127.0.0.1:8130/` (W4.E refresh landed this; prior stale value was `:3100`)
- `api/compose.yaml`: `ports: ["127.0.0.1:8130:3000"]`

**Both are 8130.** They match. Gate passes.

### 7. `docker ps -a | grep w4-proof`

```
CLEAN — no w4-proof containers
```

Teardown was clean; no leftover proof containers. Gate passes.

### 8. Adversarial — deploy-hook.sh failure branch trace

Traced the script's failure branch in full. When `health_gate` returns non-zero (step 5):

1. The script logs `"ROLLBACK — health gate failed for ${new}; reverting to ${prev}"`.
2. `git reset --hard "${prev}"` — restores the source tree to the last-known-green SHA.
3. `export "${DEPLOY_SHA_VAR}=${prev}"` — threads the rollback lineage into the bring-up.
4. `build_and_up "${prev}"` — **rebuilds the image** from the reverted tree and brings the stack up.
5. `health_gate` is called again on the rollback stack.
6. If the rollback health gate passes: logs `"ROLLBACK OK"` and returns.
7. If the rollback health gate also fails: logs `"ALERT — the service has no green target. Manual intervention required."`, then `return 1`.

**The rollback branch is real.** Failed health gate → `git reset --hard $prev` → `build_and_up($prev)` → re-gate. The `set -euo pipefail` header means a failed `build` step during rollback aborts the script rather than falling through to a broken `up -d` — correct. No `|| echo` swallows exist in the gate or the rollback.

One advisory note: the rollback `build_and_up` does NOT clear any intermediate container state before rebuilding — a crashed container left in an `Exited` state could cause `up -d` to attempt to restart rather than re-create. In the standard Compose lifecycle this is benign (`up -d` re-creates exited containers), but it is worth noting for operational awareness on the first rollback exercise.

### 9. Adversarial — `/openapi.json` vs shipped routes spot-diff (6 paths)

The meta-routes table (`api/src/routes/meta-routes.ts`) claims 54 routes. The independent route-file grep found 53 `.get/.post/.patch/.delete` registrations across `palettes/`, `sessions.ts`, `colors.ts`, `admin/`, and `meta.ts`. The 54th is `app.get("/", ...)` in `api/src/index.ts` — not in the meta-router but listed correctly in the table as `{ method: "GET", path: "/" }`. Count reconciled: **54 in table = 53 in routers + 1 in index.ts**. No phantom routes.

Six-path spot-diff (table path → source file):

| Path | Table | Source |
|---|---|---|
| `POST /palettes/:slug/revert` | session | `versionsRouter.post("/:slug/revert", ...)` in `versions.ts` ✓ |
| `GET /admin/users/:slug/palettes` | admin | `router.get("/users/:slug/palettes", ...)` in `admin/users.ts` ✓ |
| `DELETE /admin/tags/:name` | admin | `router.delete("/tags/:name", ...)` in `admin/tags.ts` ✓ |
| `POST /palettes/:slug/publish` | session | `publishRouter.post(...)` in `publish.ts` ✓ |
| `POST /sessions` | none | `sessions.post("/", registrationRateLimit, ...)` in `sessions.ts` ✓ |
| `GET /health` | none | `meta.get("/health", ...)` in `meta.ts` ✓ |

All six match. The `/openapi.json` is generated from the same `ROUTES` table at module load — no drift path. Gate passes.

### 10. Adversarial — `deploy-pages.yml` CI gate condition

The `if` condition on the deploy job:

```yaml
if: >-
    github.event_name == 'workflow_dispatch' ||
    (github.event.workflow_run.conclusion == 'success' &&
     github.event.workflow_run.head_branch == 'master' &&
     github.event.workflow_run.event == 'push')
```

This is the **triple gate** (conclusion, branch, event type). A red CI (conclusion != 'success') does not deploy. A PR run (event == 'pull_request') does not deploy. A non-master branch push does not deploy. `workflow_dispatch` allows a manual re-ship, which is intentional (the artifact records this explicitly). The `workflows: ["CI"]` string matches exactly the `name: CI` in `.github/workflows/ci.yml`. Gate is correctly conditioned.

### 11. DEC-9 disposition review — honest?

The W4-edge lane records DEC-9 (NCSU-alias retirement) honestly in two places:

1. `api/apache-vhost.conf` header comment: "retiring it is an ON-HOST action — it lives in the NCSU box's Apache config, not this repo. ... The N.W8 deploy ceremony carries the action item."
2. `docs/tranches/N/audit/impl/W4-edge.md §"THE DEC-9 RECORD"`: "DEC-9 declared the NCSU alias RETIRED. The N.W4 verification (V3) found that claim FALSE on the wire: the alias is ALIVE and byte-identical to api.color.babb.dev ... This lane CANNOT retire it. I say this plainly: I did not retire it; I recorded the on-host action item."

**The DEC-9 disposition is honest.** DEC-9 cannot be discharged from this repo; the edge lane correctly names it a W8 on-host action (remove the NCSU host's proxy block once `color.babb.dev` serves HEAD-lineage code) and does not claim retirement it could not perform.

### Summary

| Check | Result |
|---|---|
| `api tsc --noEmit` | 0 errors |
| `docker compose config --quiet` | valid; rs0 on 3 lines |
| `api npm test` | 219/37 green |
| `bash -n deploy-hook.sh` | clean |
| `shellcheck deploy-hook.sh` | 0 findings |
| `python3 yaml.safe_load(deploy-pages.yml)` | valid |
| vhost port == compose port | 8130 == 8130 |
| `docker ps -a` w4-proof | CLEAN (teardown verified) |
| rollback branch trace | real; re-gates after rollback rebuild |
| openapi spot-diff 6 paths | all match; 54 routes reconciled |
| deploy-pages.yml gate condition | triple-gate; CI name exact |
| DEC-9 disposition | honest; W8 on-host action recorded |

**Two advisory notes (non-blocking):**

1. **Route table is hand-kept** — the `/openapi.json` faithfulness test in `meta.test.ts` gates table-vs-spec drift, but no automated test gates table-vs-source drift (the test checks that every table entry appears in the spec, not that every source route appears in the table). A source route added without a matching table row would be silently absent from `/docs` and `/openapi.json`. Low risk given review discipline, but worth noting.
2. **Rollback `up -d` exited-container caveat** — documented above (§8). Not a blocking defect; `docker compose up -d` handles exited containers correctly in practice.
