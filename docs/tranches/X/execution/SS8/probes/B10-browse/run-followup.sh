#!/bin/bash
# SS8 B10-browse follow-up: re-run cells lost to the dev-server stall + WebKit R-1/R-10.
cd /Users/mkbabb/Programming/value.js
P=docs/tranches/X/execution/SS8/probes/B10-browse
L=docs/tranches/X/execution/SS8/evidence/B10-browse
until curl -s -m 5 -o /dev/null http://localhost:9000/; do sleep 10; done
"$HOME/.claude/guard/guarded" --timeout 12 -- node $P/wall.mjs extra > $L/run-wall-extra.log 2>&1
"$HOME/.claude/guard/guarded" --timeout 12 -- node $P/sfb.mjs chromium r4,geo,r8,r10 > $L/run-sfb-chromium-2.log 2>&1
"$HOME/.claude/guard/guarded" --exclusive webkit --timeout 12 -- node $P/sfb.mjs webkit r1,r10 > $L/run-sfb-webkit.log 2>&1
echo done
