#!/bin/bash
# SS8 B10-browse: seat-2 completion run (2026-10-19). One guarded browser run at a time.
cd /Users/mkbabb/Programming/value.js
P=docs/tranches/X/execution/SS8/probes/B10-browse
L=docs/tranches/X/execution/SS8/evidence/B10-browse
G="$HOME/.claude/guard/guarded"
until curl -s -m 10 -o /dev/null http://localhost:9000/; do sleep 10; done
"$G" --timeout 15 -- node $P/wall.mjs trace,prod,proddark > $L/run2-wall.log 2>&1; echo "wall $?"
"$G" --timeout 15 -- node $P/wall.mjs extra > $L/run2-wall-extra.log 2>&1; echo "extra $?"
"$G" --timeout 15 -- node $P/sfb.mjs chromium r4,geo,r8,r10 > $L/run2-sfb-chromium.log 2>&1; echo "sfb $?"
"$G" --timeout 15 -- node $P/pager.mjs dom,race,coarse > $L/run2-pager.log 2>&1; echo "pager $?"
"$G" --exclusive webkit --timeout 15 -- node $P/sfb.mjs webkit r1,r10 > $L/run2-sfb-webkit.log 2>&1; echo "webkit $?"
echo done
