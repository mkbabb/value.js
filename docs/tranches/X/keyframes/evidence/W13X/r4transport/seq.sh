#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4transport: served readings in sequence (load recorded per reading; §0ev item 2)
d=$(dirname "$0")
one() { { echo "load-start $(sysctl -n vm.loadavg) $(date +%H:%M:%S)"; timeout 900 node "$d/probe.mjs" "$1" "$2" 2>&1 | cut -c1-600; echo "load-end $(sysctl -n vm.loadavg) $(date +%H:%M:%S)"; } > "$d/$2.log" 2>&1; }
for x in "$@"; do one "${x%%,*}" "${x##*,}"; done
echo SEQ-DONE >> "$d/seq-done.log"
