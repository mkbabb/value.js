#!/bin/bash
# SS8 B10-browse: run every chromium batch, one guarded browser run at a time.
cd /Users/mkbabb/Programming/value.js
P=docs/tranches/X/execution/SS8/probes/B10-browse
L=docs/tranches/X/execution/SS8/evidence/B10-browse
G=("$HOME/.claude/guard/guarded" --timeout 12 --)
"${G[@]}" node $P/wall.mjs prod,proddark > $L/run-wall.log 2>&1
"${G[@]}" node $P/flow.mjs u4,u5,u6,u10 > $L/run-flow.log 2>&1
"${G[@]}" node $P/sfb.mjs chromium r1,r2,r4,geo,r8,r10 > $L/run-sfb-chromium.log 2>&1
"${G[@]}" node $P/pager.mjs dom,race,coarse > $L/run-pager.log 2>&1
echo done
