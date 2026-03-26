#!/bin/bash
set -euo pipefail

# Backup sidecar: runs mongodump on a schedule and prunes old backups.
# Uses a sleep loop (no cron daemon needed in minimal container).

BACKUP_DIR="/backups"
RETAIN_DAYS="${BACKUP_RETAIN_DAYS:-14}"
INTERVAL_SECONDS="${BACKUP_INTERVAL_SECONDS:-21600}" # 6 hours default

log() {
    echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] backup: $*"
}

run_backup() {
    local timestamp
    timestamp="$(date -u '+%Y%m%d-%H%M%S')"
    local target="${BACKUP_DIR}/palette-db-${timestamp}"

    log "Starting backup to ${target}..."

    local auth_args=()
    if [ -n "${MONGO_USER:-}" ] && [ -n "${MONGO_PASSWORD:-}" ]; then
        auth_args=(--username="${MONGO_USER}" --password="${MONGO_PASSWORD}" --authenticationDatabase=admin)
    fi

    mongodump \
        --host="${MONGO_HOST:-mongo}" \
        --port="${MONGO_PORT:-27017}" \
        "${auth_args[@]}" \
        --db="${MONGO_DB:-palette-db}" \
        --out="${target}" \
        --quiet

    log "Backup complete: ${target}"

    # Prune old backups by comparing sortable timestamps
    local cutoff
    cutoff="$(date -u -d "-${RETAIN_DAYS} days" '+%Y%m%d-%H%M%S' 2>/dev/null || date -u -v"-${RETAIN_DAYS}d" '+%Y%m%d-%H%M%S')"

    local pruned=0
    for dir in "${BACKUP_DIR}"/palette-db-*; do
        [ -d "$dir" ] || continue
        local dirname
        dirname="$(basename "$dir")"
        local dir_ts="${dirname#palette-db-}"
        if [[ "$dir_ts" < "$cutoff" ]]; then
            rm -rf "$dir"
            pruned=$((pruned + 1))
        fi
    done

    if [ "$pruned" -gt 0 ]; then
        log "Pruned ${pruned} backup(s) older than ${RETAIN_DAYS} days"
    fi
}

log "Backup sidecar started. Interval: ${INTERVAL_SECONDS}s, Retention: ${RETAIN_DAYS} days"

# Initial backup on startup
run_backup

# Loop
while true; do
    sleep "${INTERVAL_SECONDS}"
    run_backup
done
