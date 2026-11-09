#!/bin/zsh
# K-D4 re-read on the currently served build (b74cc693), GPU witness, x2.
set -u
P=~/.dev-logs/x-realize-2/keyframes/wt/scripts/probe/kf-sheet-glide.mjs
D=~/.dev-logs/x-realize-2/keyframes/kd4/prod-b74cc693; mkdir -p $D
for r in 1 2; do
  echo "== r$r $(date -u +%H:%M:%S) load $(sysctl -n vm.loadavg)"
  node $P --base https://keyframes.babb.dev/ --out $D/r$r.json --shots $D/shots-r$r
done
