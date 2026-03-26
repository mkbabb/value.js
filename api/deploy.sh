#!/bin/bash
set -euo pipefail

# Deploys palette API to mbabb server
# Usage: ./deploy.sh

SERVER="mbabb@mbabb.fridayinstitute.net"
PORT=1022
REMOTE_DIR="/home/mbabb/Programming/palette-api"

echo "==> Syncing api/ to $SERVER:$REMOTE_DIR ..."
rsync -avz --delete \
    --exclude node_modules \
    --exclude dist \
    --exclude .env \
    --exclude .env.local \
    --exclude test-results \
    -e "ssh -p $PORT" \
    ./ "$SERVER:$REMOTE_DIR/"

echo "==> Building and starting containers ..."
ssh -p "$PORT" "$SERVER" "cd $REMOTE_DIR && docker compose up -d --build"

echo "==> Container status:"
ssh -p "$PORT" "$SERVER" "cd $REMOTE_DIR && docker compose ps"

echo "==> Recent logs:"
ssh -p "$PORT" "$SERVER" "cd $REMOTE_DIR && docker compose logs --tail=30 api"

echo ""
echo "==> Smoke test:"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://mbabb.fi.ncsu.edu/colors/ || true)
if [ "$STATUS" = "200" ]; then
    echo "    GET /colors/ -> $STATUS OK"
else
    echo "    GET /colors/ -> $STATUS (expected 200)"
fi

echo "==> Done."
