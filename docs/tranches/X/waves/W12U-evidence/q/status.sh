#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q — one-screen progress of a run tag: per project passed/failed so far.
cd "$(dirname "$0")" || exit 1
for f in logs/${1:-r1}-*.log.txt; do
  printf "%s ok=%s bad=%s %s\n" "$(basename "$f" .log.txt)" "$(grep -c '^ *✓' "$f")" "$(grep -c '^ *✘' "$f")" "$(grep -c '^### .* end' "$f" | sed 's/1/END/;s/0/running/')"
done
uptime | sed 's/.*load/load/'
