#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4pane: one banked served reading at the quiet-host gate (§0er)
# usage: sh run.sh <base> <label>  → <label>.log (+ <label>.json, frames/<label>-*)
d=$(dirname "$0")
sh "$d/wait-quiet.sh" 3600 > "$d/$2.log" || exit 1
{ echo "load-start $(sysctl -n vm.loadavg) $(date +%H:%M:%S)"; timeout 600 node "$d/probe.mjs" "$1" "$2" 2>&1 | cut -c1-600; echo "load-end $(sysctl -n vm.loadavg) $(date +%H:%M:%S)"; } >> "$d/$2.log"
