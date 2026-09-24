#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.W12.u1: admin-flagged populated legs on the seat's own dev server (:9951; the shared :9000 served a 504 Outdated Optimize Dep for glass-ui/tabs).
cd "$(dirname "$0")"
for vt in "1440 dark" "390 light" "390 dark"; do
  set -- $vt
  BASE=${BASE:-http://localhost:9951} VP=$1 THEME=$2 node admin-flagged/capture.mjs > admin-flagged/run-$1-$2.log 2>&1
done
echo ADMINDONE
