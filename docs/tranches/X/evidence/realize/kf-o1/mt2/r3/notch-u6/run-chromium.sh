#!/bin/zsh
# U4 notch gate cure, Chromium: served build x2, planted 40 ms frame x2, pre-cure fdb5987f x2. Server stopped on exit.
set -u
P=~/.dev-logs/x-realize-2/keyframes/wt/scripts/probe/kf-stage-and-orbit.mjs
D=~/.dev-logs/x-realize-2/keyframes/notch/chromium-final3; mkdir -p $D
python3 -m http.server 8893 --bind 127.0.0.1 --directory ~/.dev-logs/x-realize-2/keyframes/base-fdb/dist/gh-pages >/dev/null 2>&1 &
S=$!; trap "kill $S" EXIT; sleep 1
for r in 1 2; do
  echo "== prod r$r $(date -u +%H:%M:%S) load $(sysctl -n vm.loadavg)"
  node $P --engine chromium --input cdp --base https://keyframes.babb.dev/ --mode assay --out $D/prod-r$r.json
  echo "== plant r$r $(date -u +%H:%M:%S)"
  node $P --engine chromium --input cdp --base https://keyframes.babb.dev/ --mode assay --plant-long-frame 40 --out $D/plant-r$r.json
  echo "== fdb r$r $(date -u +%H:%M:%S)"
  node $P --engine chromium --input cdp --base http://127.0.0.1:8893/ --host http://127.0.0.1:8893/__kf-assay-host --mode assay --out $D/fdb-r$r.json
done
