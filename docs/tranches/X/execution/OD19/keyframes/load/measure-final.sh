#!/bin/sh
# OD19-ALL keyframes load, final re-measure (2026-10-20): one guarded run.
# vite preview serves the BEFORE build (dist/od19-before, keyframes HEAD before
# the load cures) on 4181 and the FINAL build (dist/od19-final, the cured tree)
# on 4182; load-probe.mjs measures before x1 and final x2, interleaved, then
# route-load.mjs (the committed falsifier) gates the final build twice.
# Usage (from anywhere): ~/.claude/guard/guarded --timeout 40 -- sh measure-final.sh
set -u
KF=/Users/mkbabb/Programming/keyframes.js
HERE=$(cd "$(dirname "$0")" && pwd)
cd "$KF"
# keyframes.js carries no playwright; the gate resolves it from value.js
# (the first pass of this script ran without it and the gate skipped vacuously:
# route-load.mjs now exits 2 on a missing browser).
export KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js
npx vite preview --mode gh-pages --outDir "$KF/dist/od19-before" --port 4181 --strictPort >"$HERE/preview-4181.log" 2>&1 &
P1=$!
npx vite preview --mode gh-pages --outDir "$KF/dist/od19-final" --port 4182 --strictPort >"$HERE/preview-4182.log" 2>&1 &
P2=$!
trap 'kill $P1 $P2 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -sf http://localhost:4181/ >/dev/null && curl -sf http://localhost:4182/ >/dev/null && break; sleep 1; done
node "$HERE/load-probe.mjs" "$HERE/final-before.json" http://localhost:4181/ >/dev/null && echo "before done"
node "$HERE/load-probe.mjs" "$HERE/final-1.json" http://localhost:4182/ >/dev/null && echo "final-1 done"
node "$HERE/load-probe.mjs" "$HERE/final-2.json" http://localhost:4182/ >/dev/null && echo "final-2 done"
KF_DIST="$KF/dist/od19-final" node scripts/observe/demo/route-load.mjs >"$HERE/gate-final-1.txt" 2>&1; echo "gate-1 exit $?"
KF_DIST="$KF/dist/od19-final" node scripts/observe/demo/route-load.mjs >"$HERE/gate-final-2.txt" 2>&1; echo "gate-2 exit $?"
