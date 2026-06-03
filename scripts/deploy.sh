#!/usr/bin/env bash
# value.js/scripts/deploy.sh — constellation deploy standard.
#
# Two independently-deployable surfaces (ADOPTION-ASKS Ask 3 + Ask 5):
#   api      — backend (Hono+Mongo). Deploy is git-push-driven: this target
#              just pushes + pokes the per-repo webhook at
#              deploy.babb.dev/hooks/value-js, then HEALTH-GATES the live
#              endpoint. The actual on-host work (git checkout + compose
#              up + flock + rollback) is scripts/deploy-hook.sh, run ON the
#              host by the adnanh/webhook receiver after HMAC verify. There
#              is NO SSH here, NO secret here (Ask 3).
#   frontend — the demo SPA → Cloudflare Pages via the standard cf recipe
#              (project pre-flight + rollback-target capture + commit-msg
#              ASCII transliteration) (Ask 5).
#
# Usage:  scripts/deploy.sh [all|api|frontend]
# Exit:   0 success+health · 1 deploy failed · 2 usage · 5 env · 6 dep
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
[[ -f "$ROOT/.env" ]] && { set -o allexport; source "$ROOT/.env"; set +o allexport; }

log() { printf '\033[0;32m[deploy]\033[0m %s\n' "$1"; }
err() { printf '\033[0;31m[deploy]\033[0m %s\n' "$1" >&2; }
die() { err "$1"; exit "${2:-1}"; }

# ── Constellation endpoints (the D-era normalized topology) ───────────────────
WEBHOOK_URL="${WEBHOOK_URL:-https://deploy.babb.dev/hooks/value-js}"
API_HEALTH_URL="${API_HEALTH_URL:-https://api.color.babb.dev/palettes}"
GATE_RETRIES="${GATE_RETRIES:-12}"
GATE_INTERVAL="${GATE_INTERVAL:-5}"

# ── api: git-push → webhook poke → health-gate ────────────────────────────────
deploy_api() {
    command -v git >/dev/null 2>&1 || die "git not found" 6
    command -v curl >/dev/null 2>&1 || die "curl not found" 6
    [[ -z "$(git status --porcelain)" ]] || die "working tree dirty — commit or stash before deploy (no silent push of mixed state)" 1

    local branch; branch="$(git branch --show-current)"
    log "pushing $branch to origin (deploy-hook.sh runs ON the host via the webhook receiver)..."
    git push origin "$branch" || die "git push failed" 1

    # Poke the per-repo webhook. The receiver verifies GitHub HMAC and invokes
    # the on-host scripts/deploy-hook.sh (git checkout + compose up + rollback).
    # Real pushes already trigger it via the GitHub webhook; this poke is a
    # belt-and-braces manual nudge and is non-fatal if the receiver 404s a
    # manual GET (the push-trigger is authoritative).
    log "poking $WEBHOOK_URL ..."
    curl -fsS -X POST --max-time 10 "$WEBHOOK_URL" >/dev/null 2>&1 \
        || log "  (manual poke not acknowledged — relying on the git-push webhook trigger)"

    # HEALTH-GATE the live endpoint — its non-zero exit is the deploy verdict.
    log "health-gating $API_HEALTH_URL ..."
    local i code
    for ((i = 1; i <= GATE_RETRIES; i++)); do
        code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 5 "$API_HEALTH_URL" 2>/dev/null || true)"
        if [[ "$code" == "200" ]]; then
            log "health gate GREEN ($API_HEALTH_URL → 200, attempt $i/$GATE_RETRIES)"
            return 0
        fi
        log "  not green yet ($code) — retry $i/$GATE_RETRIES in ${GATE_INTERVAL}s"
        sleep "$GATE_INTERVAL"
    done
    die "health gate RED — $API_HEALTH_URL never returned 200 (the on-host deploy-hook rolls back; investigate: deploy.babb.dev logs)" 1
}

# ── frontend: demo SPA → Cloudflare Pages (standard recipe) ───────────────────
deploy_frontend() {
    command -v node >/dev/null 2>&1 || die "node not found" 6
    : "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN (Pages:Edit + Read) — host/CI only, never committed}"
    : "${CLOUDFLARE_ACCOUNT_ID:?Set CLOUDFLARE_ACCOUNT_ID}"
    local PAGES_PROJECT="${PAGES_PROJECT:-value-js}"
    local PAGES_BRANCH="${PAGES_BRANCH:-master}"
    local BUILD_DIR="dist/gh-pages"

    log "Pre-flight: confirming Pages project '$PAGES_PROJECT' exists..."
    npx --yes wrangler pages project list 2>/dev/null \
        | grep -qE "(^|[[:space:]])${PAGES_PROJECT}([[:space:]]|$)" \
        || die "Pages project '$PAGES_PROJECT' not found (npx wrangler pages project list)" 1

    log "Capturing rollback target (current live deployment)..."
    npx --yes wrangler pages deployment list --project-name "$PAGES_PROJECT" 2>/dev/null \
        | head -5 || true

    log "Building demo SPA (npm run gh-pages → $BUILD_DIR)..."
    npm run gh-pages || die "demo build failed" 1
    [[ -d "$BUILD_DIR" ]] || die "build dir $BUILD_DIR missing after build" 1

    # wrangler 4.x rejects non-printable bytes (this codebase uses U+2014).
    local MSG; MSG="$(git log -1 --pretty=%s | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null || echo deploy)"
    log "Deploying to Cloudflare Pages (project=$PAGES_PROJECT branch=$PAGES_BRANCH)..."
    npx --yes wrangler pages deploy "$BUILD_DIR" \
        --project-name "$PAGES_PROJECT" \
        --branch "$PAGES_BRANCH" \
        --commit-message "$MSG" \
        || die "wrangler pages deploy failed" 1
    log "frontend deployed (https://color.babb.dev)"
}

# ── Dispatch ──────────────────────────────────────────────────────────────────
TARGET="${1:-all}"
case "$TARGET" in
    all)      deploy_api; deploy_frontend ;;
    api)      deploy_api ;;
    frontend) deploy_frontend ;;
    *)        err "usage: scripts/deploy.sh [all|api|frontend]"; exit 2 ;;
esac
log "deploy '$TARGET' complete."