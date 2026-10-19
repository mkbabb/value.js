#!/usr/bin/env bash
# F-REL.s1 diagnosis: boot the prod-compose mongo (given tree) with its
# scheduled healthcheck DISABLED (so nothing else talks to it), raise mongod's
# command/accessControl/network log verbosity, then run each candidate
# healthcheck command ONCE by hand (docker exec) in its own log window and
# report what mongod logged for it. Local throwaway stack only, never prod.
# Usage: hc-verbose.sh <fourier-tree>
set -euo pipefail
REPO="$1"; HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO"
export COMPOSE_PROJECT_NAME="fourier-s1-hcv" MONGO_PASSWORD="hc-probe-fixture" ADMIN_TOKEN="hc-probe-fixture"
OV="$(mktemp)"; printf 'services:\n  mongo:\n    healthcheck:\n      disable: true\n' >"$OV"
C=(docker compose -f docker-compose.yml -f docker-compose.prod.yml -f "$OV")
trap '"${C[@]}" down -v --remove-orphans >/dev/null 2>&1 || true; rm -f "$OV"' EXIT
"${C[@]}" up -d --wait --wait-timeout 180 mongo >/dev/null 2>&1
id="$("${C[@]}" ps -q mongo)"
sleep 3
URI_JS="'mongodb://' + encodeURIComponent(process.env.MONGO_INITDB_ROOT_USERNAME) + ':' + encodeURIComponent(process.env.MONGO_INITDB_ROOT_PASSWORD) + '@127.0.0.1:27017/?authSource=admin&tls=true&tlsCAFile=/etc/ssl/mongo-ca.pem&directConnection=true'"
docker exec "$id" mongosh --quiet -u fourier-admin -p hc-probe-fixture --authenticationDatabase admin --tls --tlsCAFile /etc/ssl/mongo-ca.pem \
  --eval 'db.adminCommand({setParameter:1, logComponentVerbosity:{command:{verbosity:2}, accessControl:{verbosity:2}, network:{verbosity:1}}}).ok' >/dev/null
run() { # run <label> <argv...>
  local label="$1"; shift; sleep 2
  local since; since="$(date -u +%Y-%m-%dT%H:%M:%S.000000000Z)"; sleep 1
  local rc=0; docker exec "$id" "$@" >/dev/null 2>&1 || rc=$?
  sleep 2; local T; T="$(mktemp)"; docker logs --since "$since" "$id" >"$T" 2>&1
  echo "== [$label] rc=$rc  accepted=$(grep -c '"Connection accepted"' "$T") authOK=$(grep -c 'Successfully authenticated' "$T") notAuthenticating=$(grep -c 'Connection not authenticating' "$T") authzFailed=$(grep -c 'Checking authorization failed' "$T") unauthorizedReplies=$(grep -c 'Unauthorized' "$T")"
  echo "   commands: $(grep -o '"commandName":"[A-Za-z]*"\|"command":{"[A-Za-z]*"' "$T" | sed 's/.*:"\{0,1\}{\{0,1\}"//; s/"//g' | sort | uniq -c | tr '\n' ' ' | tr -s ' ')"
  grep 'Checking authorization failed\|Unauthorized' "$T" | head -3 | cut -c1-300 || true
  rm -f "$T"
}
run "A pre-.s1 idiom (mongosh -u -p --tls --eval ping)" mongosh -u fourier-admin -p hc-probe-fixture --authenticationDatabase admin --tls --tlsCAFile /etc/ssl/mongo-ca.pem --eval "db.runCommand('ping').ok" --quiet
run "B mongosh --nodb --norc + new Mongo(uri) ping" mongosh --nodb --norc --quiet --eval "quit(new Mongo(${URI_JS}).getDB('admin').runCommand({ping: 1}).ok === 1 ? 0 : 1)"
run "C mongosh --norc <uri> --eval ping" sh -c "mongosh --norc --quiet \"mongodb://fourier-admin:hc-probe-fixture@127.0.0.1:27017/?authSource=admin&tls=true&tlsCAFile=/etc/ssl/mongo-ca.pem&directConnection=true\" --eval \"db.runCommand({ping: 1}).ok\""
run "D B with a wrong password (must fail: rc != 0)" sh -c "MONGO_INITDB_ROOT_PASSWORD=wrong mongosh --nodb --norc --quiet --eval \"quit(new Mongo(${URI_JS}).getDB('admin').runCommand({ping: 1}).ok === 1 ? 0 : 1)\""
