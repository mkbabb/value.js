#!/bin/zsh
# SS-8 B26 — ONE guarded slot: own vite (:9226) + every probe SERIALLY (one browser alive at a time).
# Launch: ~/.claude/guard/guarded --timeout 85 -- zsh chain-all.sh [steps...]
R=/Users/mkbabb/Programming/value.js
P=$R/docs/tranches/X/execution/SS8/probes/B26
E=$R/docs/tranches/X/execution/SS8/evidence/B26-extract-generate-panes
# Served model: the PRODUCTION gh-pages bundle built by this seat (guarded vite build --mode gh-pages
# --outDir node_modules/.cache/ss8-b26-ghp, rebuilt at chain start), served static on :9227 — the dev vite on :9226 wedged at 93% CPU /
# 6.2 GB RSS mid-run (log chain-all-vite9226-wedged.log), as :9000 did.
export APP=http://localhost:9227/
cd $R
GHP=$R/node_modules/.cache/ss8-b26-ghp   # dist/ is swept by other seats' library builds (the first build vanished)
node_modules/.bin/vite build --mode gh-pages --outDir $GHP --emptyOutDir > $E/ghp-build.log 2>&1 || { echo BUILD FAILED; exit 1; }
echo "built $(date +%T) HEAD $(git rev-parse --short HEAD)"
python3 -I -m http.server 9227 --bind ::1 --directory $GHP > $E/static-9227.log 2>&1 &
SPID=$!
trap 'kill $SPID 2>/dev/null' EXIT
until curl -s -m 5 -o /dev/null $APP; do sleep 1; done
if (( $# )); then steps=("$@"); else steps=(extract generate camera r10 o20); fi
for s in $steps; do
  echo "== $s $(date +%T)"
  case $s in
    recon) node $P/recon.mjs ;;
    extract) node $P/extract.mjs ;;
    generate) node $P/generate.mjs ;;
    camera) node $P/camera.mjs ;;
    r10) node $P/r10-graph.mjs ;;
    o20) for i in 1 2; do VJS_E2E_PORT=9227 VJS_E2E_PERF_PORT=9228 npx playwright test --project=smoke --workers=1 --reporter=list e2e/smoke/oracles/o20-generate-plate.spec.ts > $E/o20-run$i.txt 2>&1; echo "o20 run$i rc=$?"; done ;;
    *) node $P/${=s} ;;
  esac
  echo "rc=$? $(date +%T)"
done
