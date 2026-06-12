#!/usr/bin/env bash
# value.js/scripts/deploy-hook.sh — the on-host half of the api deploy (N.W4.B).
#
# This is the tracked, on-host deploy logic that scripts/deploy.sh's header
# already specs (deploy.sh:6-11): the dev's sole manual act is `git push`; the
# host-resident adnanh/webhook receiver verifies the GitHub HMAC-SHA256
# signature and then invokes THIS script locally (NO SSH here, NO secret here —
# the HMAC secret lives only in GitHub's webhook config + the host's untracked
# hooks.json). scripts/deploy.sh pushes + pokes the webhook + health-gates the
# PUBLIC endpoint; this script does the actual on-host work.
#
# ── IT RETIRES THE HOST'S LEGACY dispatch.sh (Ask 3, the 4th/gating migration) ─
# Until now the palette-api deploy directory on the host was an rsync target,
# not a git checkout, so the multiplexed host `dispatch.sh` routed value.js
# pushes through a latent-broken arm (its `git fetch / git reset --hard` would
# fail on a non-git dir; V3 found the wire serving pre-K.W2 code as a result).
# Adopting this hook + converting REPO_DIR to a git checkout is the migration
# that lets value.js's arm LEAVE `dispatch.sh`; it is the gating fourth repo for
# deleting `dispatch.sh` from the shared host (the other three — words,
# speedtest, csp-solver — wait on this one).
#
# Distilled from the constellation standard (mkbabb/deploy/templates/
# deploy-hook.sh) + fourier-analysis/scripts/deploy-hook.sh. It carries the
# four hardening properties the live dispatcher provably lacks:
#   1. flock serialisation        — overlapping triggers serialise per-repo.
#   2. dirty-tree-fail-loud       — never a silent reset --hard over edits.
#   3. a REAL health-gate         — bounded poll of /health; its non-zero exit
#                                   IS the rollback trigger (no `|| echo` swallow).
#   4. rollback-on-rollback       — on gate failure: reset to $prev, REBUILD,
#                                   bring up, RE-GATE to confirm the prior SHA
#                                   came back green.
# (The optional migration step is a no-op here — the api has no migration runner;
# index creation is idempotent in getDb() on every boot.)

set -euo pipefail

# ── CONFIGURATION (palette-api) ───────────────────────────────────────────────
readonly APP="${APP:-palette}"
# The canonical deploy dir — a GIT CHECKOUT (the Ask-3 conversion). The compose
# file lives under api/, so the compose invocation is run from REPO_DIR with an
# explicit -f path (no overlay: api/compose.yaml is the single prod artifact,
# already at the constellation Docker-hardening floor).
readonly REPO_DIR="${REPO_DIR:-/srv/constellation/palette-api}"
COMPOSE=(docker compose -f api/compose.yaml)

# Health-gate port — the SAME loopback port api/compose.yaml binds
# (127.0.0.1:8130:3000), sourced from ${HTTP_PORT:-8130} so the gate and the
# bind cannot drift (the structural fix for the wrong-port class of bug — the
# stale apache-vhost still names :3100).
readonly HEALTH_PORT="${HTTP_PORT:-8130}"
readonly HEALTH_PATH="${HEALTH_PATH:-/health}"
readonly HEALTH_URL="http://127.0.0.1:${HEALTH_PORT}${HEALTH_PATH}"
readonly ROOT_URL="http://127.0.0.1:${HEALTH_PORT}/"
# inv-22 API-root contract: this API's bare root legitimately returns 200
# ({"status":"ok"}) — it is an API origin, NOT an SPA origin (the real frontend
# is CF-Pages-served at color.babb.dev). So ROOT_EXPECT is 200, not the
# SPA-origin 404 fourier uses.
readonly ROOT_EXPECT="${ROOT_EXPECT:-200}"

# Bounded poll — ~60 s total at ~2 s intervals (replaces a blind `sleep`).
readonly GATE_RETRIES="${GATE_RETRIES:-30}"
readonly GATE_INTERVAL="${GATE_INTERVAL:-2}"

# Per-app lockfile + last-known-green marker (host-side, out-of-tree). Named
# per-app so a deploy does NOT block sibling-repo deploys on the shared host.
readonly LOCKFILE="/run/lock/${APP}-deploy.lock"
readonly GREEN_MARKER="/opt/deploy/${APP}-last-green"

# The deployed code lineage is threaded into the container so /health can stamp
# it (the V3 "what code is on the wire?" question, answered structurally).
readonly DEPLOY_SHA_VAR="DEPLOY_COMMIT_SHA"

log() {
    printf '[deploy-hook:%s %s] %s\n' "${APP}" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"
}
die() {
    log "FATAL — $*"
    exit 1
}

# ── Health gate ──────────────────────────────────────────────────────────────
# Returns 0 only when BOTH /health carries the liveness body token AND the root
# returns the declared ROOT_EXPECT code; non-zero on timeout. NO swallow — the
# caller relies on the exit status as the rollback trigger.
health_gate() {
    local attempt
    for ((attempt = 1; attempt <= GATE_RETRIES; attempt++)); do
        local body root_code
        body="$(curl -fsS --max-time 5 "${HEALTH_URL}" 2>/dev/null || true)"
        root_code="$(curl -sS --max-time 5 -o /dev/null -w '%{http_code}' "${ROOT_URL}" 2>/dev/null || true)"
        if [[ "${body}" == *'"status"'*'"ok"'* ]] && [[ "${root_code}" == "${ROOT_EXPECT}" ]]; then
            log "health gate GREEN on :${HEALTH_PORT} (attempt ${attempt}/${GATE_RETRIES}; ${HEALTH_PATH} ok, / -> ${ROOT_EXPECT})"
            return 0
        fi
        sleep "${GATE_INTERVAL}"
    done
    log "health gate FAILED on :${HEALTH_PORT} after ${GATE_RETRIES} attempts (~$((GATE_RETRIES * GATE_INTERVAL))s)"
    return 1
}

# ── Dirty-tree guard ──────────────────────────────────────────────────────────
# A blind `git reset --hard` would silently discard locally-modified tracked
# files (e.g. a host-specific .env applied out-of-band). Fail loud — non-zero
# exit naming the dirty paths — so the operator reconciles the host tree rather
# than the deploy silently destroying config.
assert_clean_tree() {
    local dirty
    dirty="$(git status --porcelain --untracked-files=no)"
    if [[ -n "${dirty}" ]]; then
        log "ABORT — host working tree is DIRTY; tracked changes would be discarded by reset --hard:"
        printf '%s\n' "${dirty}" >&2
        die "reconcile the host tree (commit, stash, or revert the listed paths) before deploying."
    fi
}

# ── Build + bring up ──────────────────────────────────────────────────────────
# NO `build … || build …` fallback (a `||` defeats `set -e` and lets control
# fall through to `up -d` with a half-built image set). set -euo pipefail aborts
# the whole script on a partial build, leaving the running stack untouched.
build_and_up() {
    local sha="$1"
    log "building (build)…"
    "${COMPOSE[@]}" build
    log "bringing up (up -d)…"
    "${COMPOSE[@]}" up -d
    # Thread the lineage into the running api so /health can stamp it. The api
    # service reads ${DEPLOY_COMMIT_SHA}; up -d re-creates the container with the
    # current process env, which we export below in deploy().
    log "api brought up at lineage ${sha}"
}

# ── The deploy body (runs under the flock) ────────────────────────────────────
deploy() {
    cd "${REPO_DIR}"

    git rev-parse --is-inside-work-tree >/dev/null 2>&1 \
        || die "${REPO_DIR} is not a git checkout — the Ask-3 conversion (rsync dir -> git checkout) must be done first."

    # 1. Dirty-tree-fail-loud BEFORE any reset.
    assert_clean_tree

    # 2. Record the rollback target BEFORE the reset. Prefer the recorded
    #    last-known-GREEN SHA; fall back to current HEAD on the first deploy.
    local prev
    if [[ -r "${GREEN_MARKER}" ]] && prev="$(cat "${GREEN_MARKER}")" && [[ -n "${prev}" ]]; then
        log "rollback target = last-known-green ${prev} (from ${GREEN_MARKER})"
    else
        prev="$(git rev-parse HEAD)"
        log "rollback target = current HEAD ${prev} (no green marker yet — first deploy)"
    fi

    # 3. Advance to the pushed SHA (master is production's tracking ref).
    git fetch origin
    git reset --hard origin/master
    local new
    new="$(git rev-parse HEAD)"
    log "advancing ${prev} -> ${new}"

    # 4. Build + up at the new lineage.
    export "${DEPLOY_SHA_VAR}=${new}"
    build_and_up "${new}"

    # 5. The REAL health gate. Its failure is the rollback trigger.
    if health_gate; then
        printf '%s\n' "${new}" >"${GREEN_MARKER}"
        log "DEPLOY OK ${prev} -> ${new} (recorded green)"
        return 0
    fi

    # 6. Rollback-on-rollback: reset to $prev, REBUILD, up, and RE-GATE to
    #    confirm the prior SHA came back green. Exit non-zero so the receiver
    #    logs a failed deploy.
    log "ROLLBACK — health gate failed for ${new}; reverting to ${prev}"
    git reset --hard "${prev}"
    export "${DEPLOY_SHA_VAR}=${prev}"
    build_and_up "${prev}"
    if health_gate; then
        log "ROLLBACK OK — service restored to last-known-good ${prev}; deploy of ${new} rejected"
    else
        log "ALERT — rollback to ${prev} ALSO failed the health gate; the service has no green target. Manual intervention required."
    fi
    return 1
}

# ── Entry point — serialise the whole deploy under the palette lock ──────────
main() {
    log "${APP} deploy-hook invoked (repo arg: ${1:-<none>})"
    mkdir -p "$(dirname "${LOCKFILE}")" 2>/dev/null || true
    exec 9>"${LOCKFILE}"
    flock 9
    deploy
}

main "$@"
