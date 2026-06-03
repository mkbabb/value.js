# Constellation dev.sh / deploy.sh standard

The babb.dev constellation runs **one CLI shape** across all 8 repos for local
dev (`scripts/dev.sh`) and deploy (`scripts/deploy.sh`). The surface never
varies; the body is parameterized per SHAPE. value.js **owns** this
standardization effort and is the **DONE + validated** reference.

> **Status:** value.js is DONE (its `scripts/dev.sh` + `scripts/deploy.sh` are
> live and validated this session). The **cross-repo rollout to the 6 siblings
> + deploy is BOOKED, not done** — drafts exist (§4); landing them is a
> cross-repo IMPL step outside this tranche-writing scope.

---

## §1 — The standardized CLI interface

### Subcommands (identical everywhere)

`scripts/dev.sh [SUBCOMMAND] [-- passthrough]` — `up` is the default (bare
invocation == `up`).

| sub | meaning | applies to |
|---|---|---|
| `up` (default) | bring the dev env up in the foreground; trap-teardown on exit | all |
| `down` | tear down everything `up` started (containers, stray pids, `.dev/` artefacts); idempotent | all |
| `status` | report resolved ports + mongo source + child state; exit 0 healthy / 3 partial / 4 down | all |
| `logs` | follow the running stack's logs (`docker compose logs -f` for compose repos; `tail -f .dev/logs/*.log` for native) | all |
| `build` | one-shot production build of every component | library · fullstack · frontend · backend |
| `test` | run the repo's test gate (vitest / pytest / cargo test, + playwright where present) | library · fullstack · frontend · backend |

`infra` (the `deploy` repo) supports only `status` / `build` / `test` (build ==
shellcheck + yamllint of the vended templates; test aliases build); `up` /
`down` / `logs` print a precise "this repo vends templates, it runs no service"
error and exit 6. Unknown subcommands print usage to stderr and exit 2.

### Fail-explicit rule (binding)

`set -euo pipefail` at the top. **Every prerequisite is checked before work
begins.** A failure prints ONE actionable line to stderr (what is missing + the
exact recovery command) and exits with the matching non-zero code. No silent
degradation, no `|| true` on a load-bearing check, no fall-through to a blank
default for a required var. Cleanup is guaranteed by `trap cleanup EXIT INT
TERM` that disarms itself and recursively kills the child process tree
(`kill_tree`) — no orphan mongo / vite / tsx / uvicorn survives a Ctrl-C or a
mid-start failure.

The one sanctioned soft path — native `mongod` fallback when docker is
unavailable — is taken **only with an explicit stderr announcement**, never
silently; if neither docker mongo nor native mongod is reachable, `up` exits 6.

### Exit codes (uniform)

| code | meaning |
|---|---|
| 0 | success (clean `up` teardown, `status` healthy, `build`/`test` passed) |
| 1 | generic failure (a child failed to start; build/test failed) |
| 2 | usage error (unknown subcommand / bad flag) |
| 3 | `status`: partial — some but not all components up |
| 4 | `status`: down — nothing up |
| 5 | missing required env var (the `.env` / `REQUIRED_ENV` contract) |
| 6 | missing required external dep (docker, mongod, uv, cargo, wasm-pack) — or a no-runtime op on `infra` |
| 7 | no free port within the fallback window |

### .env discovery (one discipline)

- Every repo ships a tracked `.env.example`; the real `.env` is gitignored.
- `up` / `build` source `.env` if present (`set -o allexport; source .env; set
  +o allexport`). A missing `.env` is **not** fatal — `.env.example` is the
  defaults source.
- **Required-var contract:** the CONFIG block declares `REQUIRED_ENV=(VAR ...)`.
  Each is checked before any work; a missing one prints the copy-or-export
  recovery line to stderr and exits **5**. No silent empty-value fallback.
- **Dev sentinels:** values safe to default on a laptop (`ADMIN_TOKEN=dev`, the
  local mongo URI) are exported with an explicit sentinel and **logged**.
  Secrets that must never be guessed (prod Cloudflare token, real mongo
  password) go in `REQUIRED_ENV` and fail loud. This mirrors the two-tier
  compose contract: dev `${VAR:-sentinel}`, prod `${VAR:?msg}`.
- The server's own prod `.env` is **never** sourced by dev; dev exports its
  local-only values inline.

### Per-SHAPE behavior

- **library** (glass-ui, keyframes.js) — one Vite dev server. `up`:
  free-port-resolve the Vite port (default 5173), spawn `vite --strictPort`,
  trap-kill. No mongo, no api, no `REQUIRED_ENV`. `build`: `npm run build`;
  `test`: `npm test`.
- **backend** — ensure mongo, start the api with `MONGODB_URI` / `ADMIN_TOKEN`
  / `PORT`, no frontend; same teardown shape. (No pure backend exists today —
  value.js/api composes under the fullstack parent.)
- **fullstack** (value.js, fourier-analysis, speedtest, words, muster) — the
  full shape: (a) **ensure mongo** where needed (docker preferred → native
  `mongod` fallback **announced** → fail loud; never boot a degraded api
  silently unless the app's contract explicitly allows it, in which case it is
  announced — cf. speedtest `MONGO_OPTIONAL=1`); (b) resolve backend + frontend
  ports with TCP-probe auto-fallback (IPv4+IPv6; frontend never collides with
  backend); (c) **sibling watch-builds** for on-disk `file:`-linked
  `@mkbabb/*` deps (one-shot cold build if `dist/` missing, then
  `build:watch`); (d) start backend, wait for its port to bind before the
  frontend (no proxy ECONNREFUSED storm); (e) start frontend pointed at the
  local backend; (f) one recursive `kill_tree` trap reaps the whole tree.
  Compose-native fullstacks (words) run the graph through `docker compose up`;
  process-native fullstacks (value.js, fourier, speedtest, muster) spawn
  children directly.
- **frontend** — fullstack minus the mongo/backend stanza: one Vite port,
  optional proxy target (`VITE_API_*`, default the documented prod API, logged
  when defaulted), sibling watch-builds, trap-kill. (None standalone today.)
- **infra** (deploy) — no runtime. `up` / `down` / `logs` fail loud (exit 6
  with the "vends templates" message); `build` / `test` / `status` run
  `shellcheck templates/*.sh cf/*.sh host/*.sh` + `yamllint` on the vended YAML.

---

## §2 — Canonical reference template

Canonical home: **`deploy/templates/dev.sh`** (in the `deploy` infra repo).
Each repo's `scripts/dev.sh` is this template with its `# ── CONFIG ──` block
filled in; adopters edit ONLY that block, never the runtime below it. **Rollout
of this template to the siblings is BOOKED, not done** (§4).

```bash
#!/usr/bin/env bash
# deploy/templates/dev.sh — the STANDARD local-dev orchestrator template.
# ONE SHAPE, PARAMETERIZED PER REPO. Copy to <app>/scripts/dev.sh, fill ONLY
# the `# ── CONFIG ──` block. Do not edit the runtime below when adopting.
#
# SUBCOMMANDS: up (default) | down | status | logs | build | test
# EXIT CODES:  0 ok · 1 fail · 2 usage · 3 status-partial · 4 status-down
#              5 missing-env · 6 missing-dep · 7 no-free-port
# EXPLICIT-FAILURE RULE: every prerequisite checked before work; a failure
# prints ONE actionable line to stderr + exits non-zero. No silent degrade.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# ╔══ CONFIG (set per repo; the ONLY block an adopter edits) ══╗
PROJECT_NAME="<app>"
SHAPE="fullstack"                 # library | backend | fullstack | frontend | infra
REQUIRED_BINS=(node npm docker)   # checked before any work
REQUIRED_ENV=()                   # fail loud (code 5) if unset and no dev sentinel
BACKEND_PORT_DEFAULT=3000
FRONTEND_PORT_DEFAULT=9000
PORT_FALLBACK_LIMIT=10
BACKEND_READY_TIMEOUT_S=30
NEEDS_MONGO=0                     # 1 for fullstack/backend repos that use it
MONGO_CONTAINER="${PROJECT_NAME}-dev-mongo"
MONGO_IMAGE="mongo:8"
MONGO_PORT=27017
MONGO_DB="${PROJECT_NAME}"
DEV_MONGO_DIR="$ROOT/.dev/mongo"  # native-mongod dbpath fallback
MONGO_READY_TIMEOUT_S=20
SIBLING_WATCH_BUILDS=()           # "<repo-dir>:<dist-entry-artefact>"
SIBLING_FIRST_PASS_TIMEOUT_S=120

DEV_DIR="$ROOT/.dev"; mkdir -p "$DEV_DIR"
LOG_DIR="$DEV_DIR/logs"; mkdir -p "$LOG_DIR"

log()  { printf '[dev] %s\n' "$*"; }
note() { printf '[dev] %s\n' "$*" >&2; }
die()  { printf 'ERROR: %s\n' "$1" >&2; exit "${2:-1}"; }

# ── .env discovery ──
load_env() {
    if [[ -f "$ROOT/.env" ]]; then
        set -o allexport; source "$ROOT/.env"; set +o allexport; log "loaded .env"
    elif [[ -f "$ROOT/.env.example" ]]; then
        note "no .env (using .env.example defaults + dev sentinels); cp .env.example .env to customise"
    fi
}
require_env() {
    local missing=0 v
    for v in "${REQUIRED_ENV[@]:-}"; do
        [[ -z "$v" ]] && continue
        if [[ -z "${!v:-}" ]]; then
            note "$v is unset. Copy .env.example to .env and set it, or export inline: $v=... scripts/dev.sh"
            missing=1
        fi
    done
    [[ $missing -eq 0 ]] || exit 5
}

# ── Dep checks ──
require_bins() {
    local b
    for b in "${REQUIRED_BINS[@]}"; do
        command -v "$b" >/dev/null 2>&1 || die "required binary '$b' not found on PATH (install it, then retry)" 6
    done
    if printf '%s\n' "${REQUIRED_BINS[@]}" | grep -qx docker; then
        docker info >/dev/null 2>&1 || die "docker daemon is not responding (start Docker, then retry)" 6
    fi
}

# ── Port resolution (TCP probe, IPv4+IPv6) ──
port_in_use() {
    (exec 3<>"/dev/tcp/127.0.0.1/$1") 2>/dev/null && return 0
    (exec 3<>"/dev/tcp/::1/$1") 2>/dev/null && return 0
    return 1
}
find_free_port() {
    local label=$1 desired=$2 reserved=${3:-} p attempts=0
    p=$desired
    while [[ $attempts -lt $PORT_FALLBACK_LIMIT ]]; do
        if [[ "$p" != "$reserved" ]] && ! port_in_use "$p"; then
            [[ $p -ne $desired ]] && note "$label default :$desired busy — using :$p"
            echo "$p"; return 0
        fi
        note "$label :$p in use — trying :$((p + 1))"
        p=$((p + 1)); attempts=$((attempts + 1))
    done
    die "$label — no free port within $PORT_FALLBACK_LIMIT slots from :$desired (recover: scripts/dev.sh down)" 7
}

# ── Process management ──
PIDS=()
track() { PIDS+=("$1"); }
kill_tree() {
    local pid=$1 child
    for child in $(pgrep -P "$pid" 2>/dev/null); do kill_tree "$child"; done
    kill "$pid" 2>/dev/null || true
}
MONGO_SOURCE="none"
cleanup() {
    trap - EXIT INT TERM
    exec 2>/dev/null
    printf '\n[dev] shutting down...\n'
    local pid
    for pid in "${PIDS[@]:-}"; do [[ -n "$pid" ]] && kill_tree "$pid"; done
    [[ "$NEEDS_MONGO" == 1 && "$MONGO_SOURCE" == docker ]] && docker rm -f "$MONGO_CONTAINER" >/dev/null 2>&1
    wait 2>/dev/null || true
    exit 0
}

# ── Mongo: docker container preferred → native mongod fallback (announced) → fail ──
ensure_mongo() {
    [[ "$NEEDS_MONGO" == 1 ]] || return 0
    if [[ -n "${MONGODB_URI:-}" && "${MONGODB_URI}" != *localhost* && "${MONGODB_URI}" != *127.0.0.1* ]]; then
        log "MONGODB_URI overridden — operator owns that target; not provisioning local mongo"
        MONGO_SOURCE="external"; return 0
    fi
    if port_in_use "$MONGO_PORT"; then
        log "mongo already listening on :$MONGO_PORT — reusing it"
        MONGO_SOURCE="reused"; return 0
    fi
    if docker info >/dev/null 2>&1; then
        log "starting disposable docker mongo ($MONGO_IMAGE)..."
        docker rm -f "$MONGO_CONTAINER" >/dev/null 2>&1 || true
        docker run -d --name "$MONGO_CONTAINER" -p "127.0.0.1:${MONGO_PORT}:27017" \
            "$MONGO_IMAGE" >/dev/null || die "failed to start docker mongo (check: docker logs $MONGO_CONTAINER)" 6
        MONGO_SOURCE="docker"
        wait_mongo_ready || die "docker mongo did not become ready within ${MONGO_READY_TIMEOUT_S}s" 6
        return 0
    fi
    if command -v mongod >/dev/null 2>&1; then
        note "docker unavailable — FALLING BACK to native mongod at $DEV_MONGO_DIR (announced, not silent)"
        mkdir -p "$DEV_MONGO_DIR"
        mongod --dbpath "$DEV_MONGO_DIR" --port "$MONGO_PORT" --bind_ip 127.0.0.1 >"$LOG_DIR/mongod.log" 2>&1 &
        track $!; MONGO_SOURCE="native"
        wait_mongo_ready || die "native mongod did not become ready (see $LOG_DIR/mongod.log)" 6
        return 0
    fi
    die "no mongo available: docker daemon down AND no native mongod (start Docker, or: brew install mongodb-community)" 6
}
wait_mongo_ready() {
    local i
    for ((i = 0; i < MONGO_READY_TIMEOUT_S; i++)); do
        port_in_use "$MONGO_PORT" && { sleep 1; return 0; }
        sleep 1
    done
    return 1
}

# ── Sibling watch-builds (on-disk file:-linked @mkbabb/* deps) ──
ensure_sibling_watch_builds() {
    local entry sib_path sib_artefact sib_abs sib_name
    for entry in "${SIBLING_WATCH_BUILDS[@]:-}"; do
        [[ -z "$entry" ]] && continue
        sib_path="${entry%%:*}"; sib_artefact="${entry##*:}"
        sib_abs="$ROOT/$sib_path"; sib_name="${sib_path##*/}"
        [[ -d "$sib_abs" ]] || { note "sibling not present at $sib_abs — skip (resolved from npm registry)"; continue; }
        if [[ ! -f "$sib_abs/$sib_artefact" ]]; then
            log "$sib_name dist missing — one-shot build before watch..."
            (cd "$sib_abs" && npm run build 2>&1 | sed "s|^|[$sib_name] |") \
                || die "build failed at $sib_path — fix the sibling before retrying" 1
        fi
        log "starting $sib_name watch-build..."
        (cd "$sib_abs" && npm run build:watch 2>&1 | sed "s|^|[$sib_name] |") 2>/dev/null & track $!
    done
}

# ── Backend-before-frontend gate ──
wait_port_bound() {
    local label=$1 port=$2 timeout=${3:-$BACKEND_READY_TIMEOUT_S} i
    for ((i = 0; i < timeout; i++)); do
        port_in_use "$port" && { log "$label bound on :$port"; return 0; }
        sleep 1
    done
    die "$label failed to bind :$port within ${timeout}s" 1
}

# ╔══ OVERRIDES (adopter replaces these four per repo) ══╗
# start_backend / start_frontend spawn a bg job + `track $!`. do_build / do_test.
start_backend()  { :; }
start_frontend() { npx vite --port "$FRONTEND_PORT" --strictPort >"$LOG_DIR/web.log" 2>&1 & track $!; }
do_build()       { npm run build; }
do_test()        { npm test "$@"; }

cmd_up() {
    require_bins; load_env; require_env
    trap cleanup EXIT INT TERM
    [[ "${#SIBLING_WATCH_BUILDS[@]}" -gt 0 ]] && ensure_sibling_watch_builds
    ensure_mongo
    BACKEND_PORT=$(find_free_port "backend" "${BACKEND_PORT:-$BACKEND_PORT_DEFAULT}")
    FRONTEND_PORT=$(find_free_port "frontend" "${FRONTEND_PORT:-$FRONTEND_PORT_DEFAULT}" "$BACKEND_PORT")
    export BACKEND_PORT FRONTEND_PORT
    if [[ "$SHAPE" == "fullstack" || "$SHAPE" == "backend" ]]; then
        start_backend; wait_port_bound "backend" "$BACKEND_PORT"
    fi
    [[ "$SHAPE" != "backend" ]] && start_frontend
    print_summary
    while true; do sleep 2; done   # idle (bash defers traps inside a bare `wait`)
}
print_summary() {
    cat <<EOF

──────────────────────────────────────
  ${PROJECT_NAME} dev environment
──────────────────────────────────────
  Frontend → http://localhost:${FRONTEND_PORT:-n/a}
  Backend  → http://localhost:${BACKEND_PORT:-n/a}
  Mongo    → ${MONGO_SOURCE} (:${MONGO_PORT})
  Logs     → ${LOG_DIR}/   (scripts/dev.sh logs)
  Ctrl-C to tear down
──────────────────────────────────────

EOF
}
cmd_down() {
    log "tearing down ${PROJECT_NAME}..."
    docker rm -f "$MONGO_CONTAINER" >/dev/null 2>&1 || true
    pkill -f "vite.*--port" 2>/dev/null || true
    pkill -f "tsx watch" 2>/dev/null || true
    rm -f "$DEV_DIR"/*.pids "$DEV_DIR"/*.ports 2>/dev/null || true
    log "down."
}
cmd_status() {
    local up=0 total=0
    if [[ "$NEEDS_MONGO" == 1 ]]; then
        total=$((total + 1))
        if port_in_use "$MONGO_PORT"; then log "mongo  UP   (:$MONGO_PORT)"; up=$((up+1)); else log "mongo  DOWN"; fi
    fi
    total=$((total + 1))
    if port_in_use "${BACKEND_PORT:-$BACKEND_PORT_DEFAULT}"; then log "backend UP"; up=$((up+1)); else log "backend DOWN"; fi
    if [[ "$SHAPE" != "backend" ]]; then
        total=$((total + 1))
        if port_in_use "${FRONTEND_PORT:-$FRONTEND_PORT_DEFAULT}"; then log "frontend UP"; up=$((up+1)); else log "frontend DOWN"; fi
    fi
    [[ $up -eq 0 ]] && exit 4
    [[ $up -lt $total ]] && exit 3
    exit 0
}
cmd_logs() {
    [[ -d "$LOG_DIR" && -n "$(ls -A "$LOG_DIR" 2>/dev/null)" ]] || die "no logs at $LOG_DIR — is the stack up?" 1
    tail -n +1 -f "$LOG_DIR"/*.log
}

SUB="${1:-up}"; shift || true
case "$SUB" in
    up)     cmd_up "$@" ;;
    down)   cmd_down ;;
    status) cmd_status ;;
    logs)   cmd_logs ;;
    build)  require_bins; load_env; do_build ;;
    test)   require_bins; load_env; do_test "$@" ;;
    *)      note "usage: scripts/dev.sh [up|down|status|logs|build|test]"; exit 2 ;;
esac
```

The template is distilled from speedtest/scripts/dev.sh (the maturest existing
reference) + the fourier/words free-port + `.env` discipline + the uniform
subcommand surface.

---

## §3 — value.js reference status: DONE + validated

value.js is the **owning repo** and the validated reference implementation.

- **`scripts/dev.sh`** — SHAPE=fullstack; live and validated this session.
  - Demo (Vue/Vite) → **:9000**; api (Hono/tsx) → **:3000**; demo points at the
    local api via `VITE_API_URL=http://localhost:3000` (else defaults to prod
    `https://api.color.babb.dev` per `demo/@/lib/palette/api/client.ts`).
  - **Mongo is a single-node replica set `rs0`** — NOT a standalone. The api uses
    multi-document transactions (`services.withTransaction` — remix, publish,
    CRUD per the H1 cascade-correctness invariant), which require a replica set;
    a standalone `mongod` rejects them. dev mongo is a docker single-node
    replica set (`--replSet rs0`), `rs.initiate`d idempotently and waited to
    PRIMARY before the api starts. Native `mongod --replSet rs0` is the
    announced fallback (needs `mongosh`); the exported URI carries
    `?replicaSet=rs0`. This is the one place value.js's CONFIG/`ensure_mongo`
    legitimately diverges from the bare-mongo template — the api transaction
    contract demands it.
  - `REQUIRED_ENV=()` — dev sentinels cover `ADMIN_TOKEN=dev` + the local mongo
    URI; `REQUIRED_BINS=(node npm)` with mongo provisioning decided in
    `ensure_mongo`.
- **`scripts/deploy.sh`** — DONE (§5).

value.js validates the full uniform surface (`up`/`down`/`status`/`logs`/`build`
/`test`, the exit-code table, `.env` discovery, fail-explicit, `kill_tree`
teardown) and is the proof that the standard holds for a transaction-using
fullstack.

---

## §4 — Per-repo rollout (BOOKED, not done)

Drafts of each sibling's `scripts/dev.sh` exist (the standard surface, CONFIG +
overrides filled per shape). **Landing them is a BOOKED cross-repo IMPL step —
NOT performed under this tranche-writing scope, and this tranche does NOT write
into sibling repos.** Each is its own per-repo commit when the rollout
dispatches.

| repo | SHAPE | ports (be:fe) | mongo | notable per-repo divergence | rollout |
|---|---|---|---|---|---|
| **value.js** | fullstack | 3000 : 9000 | replica-set rs0 | transaction-mandated single-node replica set | **DONE + validated** |
| fourier-analysis | fullstack | 9100 : 9101 | docker mongo:8.0 | FastAPI/uvicorn (uv) + Vue; `unset VIRTUAL_ENV`; prod TLS `MONGO_URI` treated as operator-owned | **BOOKED** (draft ready) |
| glass-ui | library | — : 5173 | none | single Vite server; npm publish from CI on `v*.*.*` tag; existing release.sh stays | **BOOKED** (draft ready) |
| keyframes.js | library | — : 5173 | none | identical to glass-ui; gh-pages demo on master push + npm on tag (both CI) | **BOOKED** (draft ready) |
| speedtest | fullstack | 9140 : 9141 | optional (`MONGO_OPTIONAL=1`) | maturest reference; sibling watch-builds (glass-ui + keyframes.js); announced degraded-mode contract | **BOOKED** (draft ready) |
| words (floridify) | fullstack (compose-native) | 9110 : 9111 | compose service | whole graph via `docker compose up/down/logs/ps`; `REQUIRED_ENV=(MONGO_PASSWORD)` (no dev sentinel); sibling rsync-sync | **BOOKED** (draft ready) |
| muster | fullstack | 3030 : 5173 | none (`NEEDS_MONGO=0`) | better-sqlite3 in-process; `require_wasm` prereq (csp-wasm/pkg via wasm-pack); private — no publish | **BOOKED** (draft ready) |
| deploy | infra | — | — | no runtime; up/down/logs fail loud (exit 6); build/test == shellcheck + yamllint; **canonical home of `templates/dev.sh`** | **BOOKED** (draft ready) |

Rollout sequencing belongs to the owning cross-repo step; the drafts above are
the input. value.js authors the standard and proves it; it does not commit into
the siblings.

---

## §5 — The deploy.sh standard

Per the constellation **ADOPTION-ASKS Ask 3 + Ask 5**. value.js's
`scripts/deploy.sh` is **DONE**, covering its two independently-deployable
surfaces:

- **api (backend) — Ask 3, git-push-driven.** `deploy.sh api` fails loud on a
  dirty tree, `git push`es the branch, pokes the per-repo webhook
  `deploy.babb.dev/hooks/value-js` (belt-and-braces; the GitHub push-trigger is
  authoritative, so a manual-GET 404 is non-fatal), then **health-gates** the
  live endpoint with bounded retries (`GATE_RETRIES` × `GATE_INTERVAL`). The
  actual on-host work — git checkout + `docker compose up` + flock +
  rollback-on-rollback — is the hardened `scripts/deploy-hook.sh` run ON the
  host by the adnanh/webhook receiver after per-repo HMAC verify. **No SSH, no
  secret in `deploy.sh`** (Ask 3's whole point).
- **frontend (demo SPA) — Ask 5, Cloudflare Pages.** `deploy.sh frontend`
  wraps the standard CF Pages recipe: project pre-flight + rollback-target
  capture + commit-message ASCII transliteration. (speedtest's richer
  `deploy.sh` is the source of this CF recipe — keep it, do not downgrade.)
- `deploy.sh all` (default) runs both. Usage `scripts/deploy.sh [all|api|frontend]`;
  exit `0 success+health · 1 deploy failed · 2 usage · 5 env · 6 dep`.

**Constellation deploy alignment.** Backends ship `scripts/deploy-hook.sh` (the
hardened spine: flock + dirty-tree-fail-loud + bounded health-gate +
rollback-on-rollback), triggered by `git push` → GitHub webhook →
`deploy.babb.dev/hooks/<repo>` (per-repo HMAC, no multiplex dispatcher).
Frontends ship `scripts/deploy.sh` wrapping the CF Pages recipe. Libraries
publish to npm from CI on a `v*.*.*` tag (never from a dev machine). The
two-tier env contract is enforced by compose shell-expansion: dev
`${VAR:-sentinel}`, prod `${VAR:?msg}`.
