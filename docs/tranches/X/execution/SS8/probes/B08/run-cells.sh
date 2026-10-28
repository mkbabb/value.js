#!/bin/zsh
# SS-8 B08: run each probe cell in its own guarded call (the shared dev server stalls intermittently
# under machine load; one cell per run keeps a stall from voiding the batch). Usage: run-cells.sh <probe.mjs> <out> cell...
cd "$(dirname $0)"; P=$1; OUT=$2; shift 2
for c in "$@"; do
  for try in 1 2; do
    echo "## $(date +%H:%M:%S) $P $c try $try" >> $OUT
    ~/.claude/guard/guarded --timeout 15 -- node $P $c >> $OUT 2>&1 && break
    echo "## cell $c exit $?" >> $OUT
  done
done
echo "## done" >> $OUT
