#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W11.ink (COHESION §0gw.4): the interleaved before/after GPU-cell traces as run
# (r1-r2, then r3-r5). build-before = `vite build --mode gh-pages --sourcemap` with
# ink.ts at 6381e82ae; build-after = the same at 4883db23d (session scratch dirs).
set -e
cd /Users/mkbabb/Programming/value.js
for r in ${RUNS:-1 2 3 4 5}; do
  for v in before after; do
    TASK_MS=20 ~/.claude/guard/guarded --timeout 6 --cpu-cores 0 -- node /Users/mkbabb/Programming/value.js/docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-10-29-ink/probe/ink-walk-trace.mjs /private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/build-$v/dist /Users/mkbabb/Programming/value.js/docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-10-29-ink/runs/ink-trace-$v-r$r.json 8479 > /Users/mkbabb/Programming/value.js/docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-10-29-ink/runs/ink-trace-$v-r$r.log 2>&1
    echo "$v r$r rc=$?"
  done
done
