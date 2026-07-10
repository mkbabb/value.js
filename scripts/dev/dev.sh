#!/usr/bin/env bash
# value.js/scripts/dev/dev.sh — local-dev orchestrator (constellation standard).
# Adopted from deploy/templates/dev.sh. SHAPE=fullstack.
#
#   Vue/Vite demo (vite --port 9000) + Hono/Mongo api (tsx watch src/main.ts,
#   PORT 3000, MONGODB_URI + ADMIN_TOKEN). Demo points at the local api via
#   VITE_API_URL=http://localhost:3000 (else demo defaults to prod
#   https://api.color.babb.dev — see demo/@/lib/palette/api/client.ts).
#
#   Mongo: a disposable docker container is PREFERRED; native mongod
#   (/opt/homebrew/bin/mongod) is used ONLY if docker is unavailable, with an
#   explicit message; if neither works, `up` fails loud (exit 6).
#
# SUBCOMMANDS: up (default) | down | status | logs | build | test
# EXIT CODES:  0 ok · 1 fail · 2 usage · 3 partial · 4 down · 5 env · 6 dep · 7 port
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# ── CONFIG ────────────────────────────────────────────────────────────────────
PROJECT_NAME="value-js"
SHAPE="fullstack"
REQUIRED_BINS=(node npm)         # mongo via docker (preferred) or native mongod — decided in ensure_mongo
REQUIRED_ENV=()                       # dev sentinels cover ADMIN_TOKEN + mongo
BACKEND_PORT_DEFAULT=3000
FRONTEND_PORT_DEFAULT=9000
PORT_FALLBACK_LIMIT=10
BACKEND_READY_TIMEOUT_S=30
NEEDS_MONGO=1
MONGO_CONTAINER="value-js-dev-mongo"
MONGO_IMAGE="mongo:8"
MONGO_PORT=27017
MONGO_DB="palette-db"
DEV_MONGO_DIR="$ROOT/.dev/mongo"
MONGO_READY_TIMEOUT_S=20
# The `file:`-linked `@mkbabb/*` siblings the demo consumes from their published
# `dist/` (N.W1.C / mechanism-C: dist-resolution everywhere, kept fresh by each
# sibling's `build:watch` during co-development — no mid-edit source consumption
# at any hop). Each pair is `<repo-dir>:<dist entry artefact>` — the artefact is
# the file the sibling's `exports["."].import` resolves to, used both as the
# cold-checkout missing-`dist/` probe and as the first-pass completion gate.
# glass-ui's dist also imports `@mkbabb/value.js` (aurora/color paths); that bare
# specifier is aliased to value.js's OWN `dist/value.js` in vite.config.ts, so
# value.js's own `build:watch` keeps that surface fresh too (started below,
# alongside the demo — value.js is the root publisher, not a sibling of itself).
SIBLING_WATCH_BUILDS=(
    "../glass-ui:dist/glass-ui.js"
)
SIBLING_FIRST_PASS_TIMEOUT_S=120
WATCH_BUILD_GATE_TARGETS=()
DEV_DIR="$ROOT/.dev"; mkdir -p "$DEV_DIR"
LOG_DIR="$DEV_DIR/logs"; mkdir -p "$LOG_DIR"

# ── Logging ─────────────────────────────────────────────────────────────────
log()  { printf '[dev] %s\n' "$*"; }
note() { printf '[dev] %s\n' "$*" >&2; }
die()  { printf 'ERROR: %s\n' "$1" >&2; exit "${2:-1}"; }

# ── .env discovery ────────────────────────────────────────────────────────────
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
            note "$v is unset. Copy .env.example to .env and set it, or export inline: $v=... scripts/dev/dev.sh"
            missing=1
        fi
    done
    [[ $missing -eq 0 ]] || exit 5
}

# ── Dep checks ──────────────────────────────────────────────────────────────
require_bins() {
    local b
    for b in "${REQUIRED_BINS[@]}"; do
        command -v "$b" >/dev/null 2>&1 || die "required binary '$b' not found on PATH" 6
    done
    # Mongo provisioning (docker preferred, native mongod fallback) is decided
    # in ensure_mongo — docker is NOT a hard requirement here.
}

# ── Port resolution ───────────────────────────────────────────────────────────
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
    die "$label — no free port within $PORT_FALLBACK_LIMIT slots from :$desired (recover: scripts/dev/dev.sh down)" 7
}

# ── Process management ──────────────────────────────────────────────────────
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
    [[ "$MONGO_SOURCE" == "docker" ]] && docker rm -f "$MONGO_CONTAINER" >/dev/null 2>&1
    rm -f "$DEV_DIR"/*.ports 2>/dev/null || true
    wait 2>/dev/null || true
    exit 0
}

# ── Sibling watch-builds (N.W1.C / mechanism-C: dist-resolution + build:watch) ─
# Keep each `file:`-linked @mkbabb/* sibling's published `dist/` fresh while the
# demo runs against it, so there is never mid-edit SOURCE consumption — the demo
# always resolves a complete, built dist surface. Mirrors the constellation dev.sh.
ensure_sibling_watch_builds() {
    local entry
    for entry in ${SIBLING_WATCH_BUILDS[@]+"${SIBLING_WATCH_BUILDS[@]}"}; do
        local sib_path="${entry%%:*}"
        local sib_artefact="${entry##*:}"
        local sib_abs="$ROOT/$sib_path"
        local sib_name="${sib_path##*/}"

        # A sibling installed from npm (not `file:`-linked) has no repo on disk —
        # nothing to watch-build; the published `dist/` is already in
        # node_modules. Skip cleanly.
        if [[ ! -d "$sib_abs" ]]; then
            note "sibling not present at $sib_abs — skip watch-build"
            continue
        fi

        # Cold-checkout recovery: if `dist/` has no entry artefact yet, run a
        # one-shot `build` first so vite never starts against a half-written
        # `dist/`; the watcher then takes over from a complete tree.
        if [[ ! -f "$sib_abs/$sib_artefact" ]]; then
            log "$sib_name dist missing — one-shot build before watch..."
            ( cd "$sib_abs" && npm run build 2>&1 | sed "s|^|[$sib_name] |" ) || \
                die "build failed at $sib_path — fix the sibling before retrying" 6
        fi

        log "starting $sib_name watch-build..."
        # Subshell-wrapped so $! is the subshell, not the pipeline tail `sed` —
        # kill_tree then walks the whole `vite build --watch` tree.
        ( cd "$sib_abs" && npm run build:watch 2>&1 | sed "s|^|[$sib_name] |" ) 2>/dev/null &
        track "$!"

        # First-pass gate keys on the entry artefact's mtime advancing past the
        # watcher's spawn instant: `vite build --watch` re-emits the artefact at
        # the end of every pass, so a newer mtime is an unambiguous
        # "this pass finished writing" signal.
        WATCH_BUILD_GATE_TARGETS+=("$sib_name:$sib_abs/$sib_artefact:$(date +%s)")
    done
}

# Block until every spawned watcher has completed one full build pass (the entry
# artefact's mtime has advanced past the watcher's spawn instant), so vite never
# races a half-written sibling `dist/`. Mirrors the "wait for backend port to
# bind before starting frontend" gate.
wait_sibling_first_pass() {
    local target
    # `${arr[@]+…}` guard — bash 3.2 (macOS system bash) trips `set -u` on an
    # empty-array `[@]` expansion.
    for target in ${WATCH_BUILD_GATE_TARGETS[@]+"${WATCH_BUILD_GATE_TARGETS[@]}"}; do
        local sib_name="${target%%:*}"
        local rest="${target#*:}"
        local artefact="${rest%:*}"
        local spawned_at="${rest##*:}"

        local deadline=$((SECONDS + SIBLING_FIRST_PASS_TIMEOUT_S)) mtime
        while [[ $SECONDS -lt $deadline ]]; do
            # `stat -f %m` (BSD) — the macOS-native mtime read; dev.sh is a
            # macOS-workstation script (system bash 3.2, BSD coreutils).
            mtime=$(stat -f %m "$artefact" 2>/dev/null || echo 0)
            if [[ "$mtime" -gt "$spawned_at" ]]; then
                log "$sib_name watch-build first pass complete"
                break
            fi
            sleep 0.5
        done
        if [[ $SECONDS -ge $deadline ]]; then
            note "$sib_name watch-build first pass did not complete within ${SIBLING_FIRST_PASS_TIMEOUT_S}s — vite will start anyway (first paint may resolve a stale $sib_name dist/)"
        fi
    done
}

# value.js's OWN `dist/value.js` is consumed by glass-ui's dist via the
# `@mkbabb/value.js` self-alias (vite.config.ts). value.js is the root publisher,
# not a sibling of itself, so its watch is started directly here rather than
# through SIBLING_WATCH_BUILDS.
start_self_watch_build() {
    [[ -f "$ROOT/dist/value.js" ]] || {
        log "value.js dist missing — one-shot library build before watch..."
        ( cd "$ROOT" && npm run build 2>&1 | sed 's|^|[value.js] |' ) || \
            die "value.js library build failed — fix before retrying" 1
    }
    log "starting value.js library watch-build (keeps dist/value.js fresh for glass-ui's dist)..."
    ( cd "$ROOT" && npm run build:watch 2>&1 | sed 's|^|[value.js] |' ) 2>/dev/null &
    track "$!"
}

# ── Mongo: docker-preferred single-node REPLICA SET → native fallback → fail ──
# The api uses multi-document transactions (services.withTransaction — remix,
# publish, CRUD), which REQUIRE a replica set; a standalone mongod rejects them.
# So dev mongo is a single-node replica set `rs0` — exactly as the vitest harness
# (MongoMemoryReplSet). The member host is localhost:$MONGO_PORT so the HOST
# (and the node driver) can reach the primary through the mapped port.
mongo_eval() {  # run a mongosh eval against the dev mongo (docker exec or native)
    if [[ "$MONGO_SOURCE" == "docker" ]]; then
        docker exec "$MONGO_CONTAINER" mongosh --quiet --port 27017 --eval "$1"
    else
        mongosh --quiet --port "$MONGO_PORT" --eval "$1"
    fi
}
rs_is_primary() { mongo_eval 'db.hello().isWritablePrimary' 2>/dev/null | grep -q true; }
ensure_mongo() {
    if [[ -n "${MONGODB_URI:-}" && "${MONGODB_URI}" != *localhost* && "${MONGODB_URI}" != *127.0.0.1* ]]; then
        log "MONGODB_URI overridden — operator owns that target (must be a replica set for transactions)"
        MONGO_SOURCE="external"; return 0
    fi
    if docker info >/dev/null 2>&1; then
        MONGO_SOURCE="docker"
        if [[ -n "$(docker ps -q -f "name=^${MONGO_CONTAINER}$")" ]]; then
            log "reusing running dev mongo container $MONGO_CONTAINER"
        else
            docker rm -f "$MONGO_CONTAINER" >/dev/null 2>&1 || true
            log "starting disposable docker mongo ($MONGO_IMAGE, single-node replica set rs0)..."
            docker run -d --name "$MONGO_CONTAINER" -p "127.0.0.1:${MONGO_PORT}:27017" \
                "$MONGO_IMAGE" --replSet rs0 --bind_ip_all >/dev/null \
                || die "failed to start docker mongo (inspect: docker logs $MONGO_CONTAINER)" 6
        fi
    elif command -v mongod >/dev/null 2>&1 && command -v mongosh >/dev/null 2>&1; then
        note "docker unavailable — FALLING BACK to native mongod (replica set rs0) at $DEV_MONGO_DIR (announced, not silent)"
        mkdir -p "$DEV_MONGO_DIR"
        mongod --replSet rs0 --dbpath "$DEV_MONGO_DIR" --port "$MONGO_PORT" --bind_ip 127.0.0.1 \
            >"$LOG_DIR/mongod.log" 2>&1 &
        track $!; MONGO_SOURCE="native"
    else
        die "no replica-set-capable mongo: docker daemon down AND native mongod+mongosh absent (start Docker, or: brew install mongodb-community mongosh)" 6
    fi
    # 1. wait for mongod to accept connections
    local i ok=0
    for ((i = 0; i < MONGO_READY_TIMEOUT_S; i++)); do
        mongo_eval 'db.runCommand({ping:1})' >/dev/null 2>&1 && { ok=1; break; }
        sleep 1
    done
    [[ $ok -eq 1 ]] || die "mongo ($MONGO_SOURCE) did not accept connections within ${MONGO_READY_TIMEOUT_S}s" 6
    # 2. initiate the replica set (idempotent) — host the HOST can reach
    mongo_eval 'try { rs.status().ok } catch (e) { rs.initiate({_id:"rs0",members:[{_id:0,host:"localhost:'"$MONGO_PORT"'"}]}) }' >/dev/null 2>&1 || true
    # 3. wait for PRIMARY (transactions need a writable primary)
    for ((i = 0; i < MONGO_READY_TIMEOUT_S; i++)); do
        rs_is_primary && { log "mongo ready ($MONGO_SOURCE, rs0 PRIMARY, :$MONGO_PORT)"; return 0; }
        sleep 1
    done
    die "mongo replica set rs0 did not reach PRIMARY within ${MONGO_READY_TIMEOUT_S}s" 6
}

# ── Component startup ─────────────────────────────────────────────────────────
start_backend() {
    [[ -d "$ROOT/api/node_modules" ]] || die "api/node_modules missing — run: npm ci --prefix api" 1
    export PORT="$BACKEND_PORT"
    export MONGODB_URI="mongodb://localhost:${MONGO_PORT}/${MONGO_DB}?replicaSet=rs0"
    export ADMIN_TOKEN="${ADMIN_TOKEN:-dev}"
    export ALLOWED_ORIGINS="http://localhost:${FRONTEND_PORT}"
    log "starting api (Hono/tsx) on :$BACKEND_PORT → mongo ${MONGO_DB}"
    ( cd "$ROOT/api" && npm run dev 2>&1 | sed 's|^|[api] |' ) &
    track $!
}
start_frontend() {
    [[ -d "$ROOT/node_modules" ]] || die "node_modules missing — run: npm ci" 1
    export VITE_API_URL="http://localhost:${BACKEND_PORT}"
    log "starting demo (Vue/Vite) on :$FRONTEND_PORT → VITE_API_URL=$VITE_API_URL"
    ( npx vite --port "$FRONTEND_PORT" --strictPort 2>&1 | sed 's|^|[web] |' ) &
    track $!
}
wait_port_bound() {
    local label=$1 port=$2 timeout=${3:-$BACKEND_READY_TIMEOUT_S} i
    for ((i = 0; i < timeout; i++)); do
        port_in_use "$port" && { log "$label bound on :$port"; return 0; }
        sleep 1
    done
    die "$label failed to bind :$port within ${timeout}s (see $LOG_DIR)" 1
}

# ── Subcommands ───────────────────────────────────────────────────────────────
cmd_up() {
    require_bins
    load_env
    require_env
    trap cleanup EXIT INT TERM
    ensure_mongo
    BACKEND_PORT=$(find_free_port "backend" "${BACKEND_PORT:-$BACKEND_PORT_DEFAULT}")
    FRONTEND_PORT=$(find_free_port "frontend" "${FRONTEND_PORT:-$FRONTEND_PORT_DEFAULT}" "$BACKEND_PORT")
    export BACKEND_PORT FRONTEND_PORT
    { echo "$BACKEND_PORT"; echo "$FRONTEND_PORT"; } > "$DEV_DIR/value-js.ports"
    # Keep the consumed dist surfaces fresh BEFORE vite starts (mechanism-C):
    # value.js's own dist (the self-alias glass-ui's dist imports) + glass-ui's
    # dist (the demo's design system). Both watch-build; wait for the first pass
    # so the dev server never paints against a half-written dist/.
    start_self_watch_build
    ensure_sibling_watch_builds
    start_backend
    wait_port_bound "api" "$BACKEND_PORT"
    wait_sibling_first_pass
    start_frontend
    cat <<EOF

──────────────────────────────────────
  value.js dev environment
──────────────────────────────────────
  Demo (Vite)  → http://localhost:${FRONTEND_PORT}
  API  (Hono)  → http://localhost:${BACKEND_PORT}
  VITE_API_URL → http://localhost:${BACKEND_PORT}
  Mongo        → ${MONGO_SOURCE} (:${MONGO_PORT}/${MONGO_DB})
  ADMIN_TOKEN  → ${ADMIN_TOKEN:-dev}
  Logs         → ${LOG_DIR}/   (scripts/dev/dev.sh logs)
  Ctrl-C to tear down
──────────────────────────────────────

EOF
    while true; do sleep 2; done
}
cmd_down() {
    log "tearing down value.js..."
    docker rm -f "$MONGO_CONTAINER" >/dev/null 2>&1 || true
    pkill -f "vite.*--port 9000" 2>/dev/null || true
    pkill -f "tsx watch src/main.ts" 2>/dev/null || true
    rm -f "$DEV_DIR"/*.ports 2>/dev/null || true
    log "down."
}
cmd_status() {
    local up=0 total=3
    if port_in_use "$MONGO_PORT"; then log "mongo    UP   (:$MONGO_PORT)"; up=$((up+1)); else log "mongo    DOWN"; fi
    if port_in_use "${BACKEND_PORT:-$BACKEND_PORT_DEFAULT}"; then log "api      UP   (:${BACKEND_PORT:-$BACKEND_PORT_DEFAULT})"; up=$((up+1)); else log "api      DOWN"; fi
    if port_in_use "${FRONTEND_PORT:-$FRONTEND_PORT_DEFAULT}"; then log "demo     UP   (:${FRONTEND_PORT:-$FRONTEND_PORT_DEFAULT})"; up=$((up+1)); else log "demo     DOWN"; fi
    [[ $up -eq 0 ]] && exit 4
    [[ $up -lt $total ]] && exit 3
    exit 0
}
cmd_logs() {
    [[ -d "$LOG_DIR" && -n "$(ls -A "$LOG_DIR" 2>/dev/null)" ]] || die "no logs at $LOG_DIR — is the stack up?" 1
    tail -n +1 -f "$LOG_DIR"/*.log
}
do_build() {
    log "building library + demo + api..."
    npm run build
    npm run gh-pages
    ( cd "$ROOT/api" && npm run build )
}
do_test() { npm test "$@"; }

# ── Dispatch ──────────────────────────────────────────────────────────────────
SUB="${1:-up}"; shift || true
case "$SUB" in
    up)     cmd_up "$@" ;;
    down)   cmd_down ;;
    status) cmd_status ;;
    logs)   cmd_logs ;;
    build)  require_bins; load_env; do_build ;;
    test)   require_bins; load_env; do_test "$@" ;;
    *)      note "usage: scripts/dev/dev.sh [up|down|status|logs|build|test]"; exit 2 ;;
esac