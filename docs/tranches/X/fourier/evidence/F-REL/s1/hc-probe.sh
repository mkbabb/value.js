#!/usr/bin/env bash
# F-REL.s1 healthcheck probe: boot ONLY the prod-compose mongo (base + prod
# overlay, fixture creds), let its healthcheck run for WAIT seconds, then count
# mongod's "Checking authorization failed" log lines and the health runs.
# Usage: hc-probe.sh <fourier-repo> <label> [WAIT=75]
set -euo pipefail
REPO="$1"; LABEL="$2"; WAIT="${3:-75}"
cd "$REPO"
export COMPOSE_PROJECT_NAME="fourier-s1-hc"
export MONGO_PASSWORD="hc-probe-fixture" ADMIN_TOKEN="hc-probe-fixture"
C=(docker compose -f docker-compose.yml -f docker-compose.prod.yml)
trap '"${C[@]}" down -v --remove-orphans >/dev/null 2>&1 || true' EXIT
"${C[@]}" up -d --wait --wait-timeout 180 mongo >/dev/null
sleep "$WAIT"
id="$("${C[@]}" ps -q mongo)"
runs="$(docker inspect -f '{{len .State.Health.Log}} {{.State.Health.Status}} {{.State.Health.FailingStreak}}' "$id")"
fails="$(docker logs "$id" 2>&1 | grep -c 'Checking authorization failed' || true)"
authOk="$(docker logs "$id" 2>&1 | grep -c "Successfully authenticated" || true)"
accepted="$(docker logs "$id" 2>&1 | grep -c "\"Connection accepted\"" || true)"
hcmd="$(docker inspect -f '{{index .Config.Healthcheck.Test 2}}' "$id")"
interval="$(docker inspect -f '{{.Config.Healthcheck.Interval}}' "$id")"
mem="$(docker inspect -f '{{.HostConfig.Memory}}' "$id")"
echo "[$LABEL] wait=${WAIT}s interval=${interval} health(last-log-len status streak)=${runs} memLimitBytes=${mem} authFailedLines=${fails} authSucceededLines=${authOk} connectionsAccepted=${accepted} healthcheckArgv2=${hcmd}"
docker logs "$id" 2>&1 | grep 'Checking authorization failed' | head -3 | cut -c1-400 || true
echo "[$LABEL] mongod log msg histogram (attr-free):"
docker logs "$id" 2>&1 | sed -n 's/.*"msg":"\([^"]*\)".*/\1/p' | sort | uniq -c | sort -rn | head -25
