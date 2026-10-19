#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4ribbon: the unit floor, one heavy run at a time, run under ~/.claude/guard/guarded (COHESION §0fb).
d=$(cd "$(dirname "$0")" && pwd); cd /Users/mkbabb/Programming/keyframes.js || exit 1
L() { echo "$1 load=$(sysctl -n vm.loadavg) $(date +%H:%M:%S) kf=$(git rev-parse --short HEAD)" >> "$d/gates.log"; }
T="test/demo/instrument/r4ribbon-mount-once.test.ts test/demo/instrument/playback-ribbon-contract.test.ts test/demo/instrument/preview-toggle.test.ts test/demo/scenes/easing-preview-persistence.test.ts test/demo/instrument/channel-options-render-edge.test.ts test/demo/instrument/channel-options-w13x.test.ts test/demo/scenes/sections-w13x.test.ts test/demo/scenes/spring-solver-truth.test.ts test/demo/app/scene-swap-w13x.test.ts"
L "lint-r1 start"; npm run lint > "$d/lint-r1.log.txt" 2>&1; L "lint-r1 EXIT $?"
L "check-r2 start"; npm run check > "$d/check-r2.log.txt" 2>&1; L "check-r2 EXIT $?"
L "lint-r2 start"; npm run lint > "$d/lint-r2.log.txt" 2>&1; L "lint-r2 EXIT $?"
for r in 1 2; do L "own-tests-r$r start"; npx vitest run --project demo $T --maxWorkers=2 > "$d/own-tests-r$r.log.txt" 2>&1; L "own-tests-r$r EXIT $?"; done
for r in 1 2; do L "falsifier-GREEN-r$r start"; npx vitest run --project demo test/demo/instrument/r4ribbon-mount-once.test.ts --maxWorkers=2 > "$d/falsifier-GREEN-r$r.log.txt" 2>&1; L "falsifier-GREEN-r$r EXIT $?"; done
npx vite --force --port 5391 --strictPort > "$d/vite.log.txt" 2>&1 &
V=$!
i=0; until grep -q "ready in" "$d/vite.log.txt" || [ $i -ge 120 ]; do sleep 1; i=$((i+1)); done
for r in 1 2; do L "served-count-r$r start"; node "$d/count.mjs" http://localhost:5391/ > "$d/served-count-r$r.log.txt" 2>&1; L "served-count-r$r EXIT $?"; done
kill $V; wait $V 2>/dev/null
L DONE
