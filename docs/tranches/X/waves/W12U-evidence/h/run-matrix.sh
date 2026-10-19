#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.h — run probe-h over the cells. Usage: sh run-matrix.sh <phase> <run-tag> "<cells>"
# Every arm reads :9000; L3-8 reads the named same-tree mirror (:9131, VITE_API_URL set),
# because :9000 serves without VITE_API_URL and its /browse never reaches the stubbed list.
PHASE=$1; RUN=$2; CELLS=${3:-"d1440:light d1440:dark v390:light v390:dark"}
cd "$(dirname "$0")"
for c in $CELLS; do
  t=${c%%:*}; th=${c##*:}
  node probe-h.mjs $t $th $PHASE L3-1,L3-2,L3-4,L3-5,L3-7 results/$PHASE-$RUN-$t-$th.json > results/$PHASE-$RUN-$t-$th.txt 2>&1
  BASE=http://localhost:9131 node probe-h.mjs $t $th $PHASE L3-8 results/$PHASE-$RUN-$t-$th-L3-8.json >> results/$PHASE-$RUN-$t-$th.txt 2>&1
  echo "CELL $t $th done load=$(uptime | sed 's/.*averages: //')"
done
echo MATRIX-EXIT
