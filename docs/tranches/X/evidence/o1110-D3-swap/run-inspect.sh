#!/bin/zsh
D=/Users/mkbabb/.dev-logs/o1110-D3
python3 -m http.server 9483 --bind 127.0.0.1 -d $D/serve/$1 >/dev/null 2>&1 &
S=$!; trap "kill $S 2>/dev/null" EXIT
for i in {1..40}; do curl -sf http://127.0.0.1:9483/ >/dev/null && break; sleep 0.25; done
mkdir -p $D/runs/inspect-$1; node $D/${3:-inspect.mjs} http://127.0.0.1:9483/ ${4:-$D/runs/inspect-$1} $2
