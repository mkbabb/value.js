#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.m2 — the A2-VA-X-2 matrix: every route × 360/390/430 × light/dark, run $1 (r1|r2).
# Usage: sh run-x2.sh <tag> [routes] [extra-flag]
cd "$(dirname "$0")"
R=${2:-/,/palettes,/browse,/extract,/mix,/generate,/gradient,/atmosphere,/blob,/admin/users,/admin/names,/admin/audit,/admin/flagged,/admin/tags,/no-such-route}
for t in light dark; do for wh in "360 780" "390 844" "430 932"; do
  set -- $wh
  echo "# load $(uptime | sed 's/.*averages: //')"
  X2_OUT="results/x2-$TAG-$1-$t.json" node probe-x2.mjs $1 $2 $t "$R" $EXTRA 2>&1 | grep -v "^$"
done; done
