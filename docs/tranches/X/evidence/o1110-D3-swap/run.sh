#!/bin/zsh
# usage: run.sh <arm> <tag> [--frames]   serves serve/<arm> on 9483, runs probe-d3, stops the server
D=/Users/mkbabb/.dev-logs/o1110-D3
python3 -m http.server 9483 --bind 127.0.0.1 -d $D/serve/$1 >/dev/null 2>&1 &
S=$!
trap "kill $S 2>/dev/null" EXIT
for i in {1..40}; do curl -sf http://127.0.0.1:9483/ >/dev/null && break; sleep 0.25; done
node $D/probe-d3.mjs http://127.0.0.1:9483/ $D/runs/$2 $3
