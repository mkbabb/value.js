#!/bin/bash
# §0hr.4 prod re-reads ×2, sequential, one browser at a time (each probe launches one Chromium, a context per cell, closed in finally).
cd /Users/mkbabb/Programming/value.js
L=~/.dev-logs/x-0hr/ship/prod; mkdir -p $L
C=docs/tranches/X/evidence/0hr/cure2
for r in r1 r2; do
  node ~/.dev-logs/x-0hr/ship/alias-probe.mjs prod-$r > $L/alias-$r.log 2>&1; echo "alias $r $?"
  BASE=https://color.babb.dev node $C/od11-probe.mjs prod-$r > $L/od11-$r.log 2>&1; echo "od11 $r $?"
  BASE=https://color.babb.dev CELLS="m390:/browse,m430:/browse,land:/,land:/mix,m390:/,d14:/,d14:/browse" node $C/layout-probe.mjs prod-$r > $L/layout-$r.log 2>&1; echo "layout $r $?"
  node ~/.dev-logs/x-0hr/probe-od.mjs ship-$r https://color.babb.dev > $L/od-$r.log 2>&1; echo "od $r $?"
  SCHEMES=light node docs/tranches/X/evidence/0hk/od12-aurora/probe-served.mjs https://color.babb.dev/ ship-$r desk > $L/od12-$r-desk.log 2>&1; echo "od12 $r desk $?"
done
echo BATCH-DONE
