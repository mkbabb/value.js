#!/bin/zsh
# K-D3 WebKit witness on the served build (orbit + assay x2), the U4 notch falsifier (planted 40 ms frame x2), and the pre-cure fdb5987f assay x2. One browser per node run; server stopped on exit.
set -u
P=~/.dev-logs/x-realize-2/keyframes/wt/scripts/probe/kf-stage-and-orbit.mjs
D=~/.dev-logs/x-realize-2/keyframes/notch/webkit; mkdir -p $D
python3 -m http.server 8894 --bind 127.0.0.1 --directory ~/.dev-logs/x-realize-2/keyframes/base-fdb/dist/gh-pages >/dev/null 2>&1 &
S=$!; trap "kill $S" EXIT; sleep 1
for r in 1 2; do
  for m in orbit assay; do
    echo "== prod r$r $m $(date -u +%H:%M:%S) load $(sysctl -n vm.loadavg)"
    node $P --engine webkit --base https://keyframes.babb.dev/ --mode $m --out $D/prod-$m-r$r.json
  done
  echo "== plant r$r $(date -u +%H:%M:%S) load $(sysctl -n vm.loadavg)"
  node $P --engine webkit --base https://keyframes.babb.dev/ --mode assay --plant-long-frame 40 --out $D/plant-r$r.json
  echo "== fdb r$r $(date -u +%H:%M:%S)"
  node $P --engine webkit --base http://127.0.0.1:8894/ --host http://127.0.0.1:8894/__kf-assay-host --mode assay --out $D/fdb-r$r.json
done
