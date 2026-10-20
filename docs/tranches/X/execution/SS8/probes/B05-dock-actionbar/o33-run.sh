#!/bin/zsh
# SERVED MODEL: claude-opus-5-5 — SS-8 B05 CURE runner: serve a frozen gh-pages bundle statically
# (the shared :9000 dev server was wedged by HMR churn), run the o33 oracle against it with one
# worker, then stop the server. Usage: o33-run.sh <bundle-dir> <port> <run-name>
set -u
ROOT=/Users/mkbabb/Programming/value.js
python3 -m http.server "$2" --bind 127.0.0.1 --directory "$1" >/dev/null 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
for i in {1..50}; do curl -s -o /dev/null http://127.0.0.1:$2/ && break; perl -e 'select(undef,undef,undef,0.2)'; done
cd $ROOT && ORIGIN=http://127.0.0.1:$2 RUN=$3 npx playwright test -c docs/tranches/X/execution/SS8/probes/B05-dock-actionbar/o33.config.mjs --workers=1
