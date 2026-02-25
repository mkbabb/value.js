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
    -e "ssh -p $PORT" \
    ./ "$SERVER:$REMOTE_DIR/"

echo "==> Building and starting containers ..."
ssh -p "$PORT" "$SERVER" "cd $REMOTE_DIR && docker compose up -d --build"

echo "==> Recent logs:"
ssh -p "$PORT" "$SERVER" "cd $REMOTE_DIR && docker compose logs --tail=20 api"

echo ""
echo "==> Smoke test:"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://mbabb.fi.ncsu.edu/colors/palettes || true)
if [ "$STATUS" = "200" ]; then
    echo "    GET /colors/palettes -> $STATUS OK"
else
    echo "    GET /colors/palettes -> $STATUS (expected 200)"
fi

echo "==> Done."
