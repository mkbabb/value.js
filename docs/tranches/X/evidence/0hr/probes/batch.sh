#!/bin/bash
# X·§0hr: the remaining prod reads, sequential, one browser at a time.
cd /Users/mkbabb/Programming/value.js
L=~/.dev-logs/x-0hr
node $L/kf-daraksha-prod.mjs r1 > $L/kf-r1.log 2>&1; echo "kf r1 $?"
node $L/colour-hash.mjs r1 > $L/colour-r1.log 2>&1; echo "colour r1 $?"
SCHEMES=light node docs/tranches/X/evidence/0hk/od12-aurora/probe-served.mjs https://color.babb.dev/ prod0hr-r1 mob > $L/od12-r1-mob.log 2>&1; echo "od12 r1 mob $?"
SCHEMES=light node docs/tranches/X/evidence/0hk/od12-aurora/probe-served.mjs https://color.babb.dev/ prod0hr-r2 desk > $L/od12-r2-desk.log 2>&1; echo "od12 r2 desk $?"
SCHEMES=light node docs/tranches/X/evidence/0hk/od12-aurora/probe-served.mjs https://color.babb.dev/ prod0hr-r2 mob > $L/od12-r2-mob.log 2>&1; echo "od12 r2 mob $?"
node $L/colour-hash.mjs r2 > $L/colour-r2.log 2>&1; echo "colour r2 $?"
node $L/kf-daraksha-prod.mjs r2 > $L/kf-r2.log 2>&1; echo "kf r2 $?"
echo BATCH-DONE
