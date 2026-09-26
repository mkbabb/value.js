#!/bin/bash
# SERVED MODEL: claude-opus-5-5
# X.W12U.s1 — re-run every .s1 falsifier on the settled bytes (:9000), light then dark (= the ×2),
# one result file per probe per theme under results/final/. Prints one EXIT line per run.
cd "$(dirname "$0")"
mkdir -p results/final
run() { local name=$1; shift; for t in light dark; do timeout 150 node "$name.mjs" "$@" "$t" > "results/final/$name${*:+-${*// /x}}-$t.txt" 2>&1; echo "$name ${*} $t EXIT $?"; done; }
run probe-color-input
run probe-slug
run probe-share
run probe-blob-geometry
run probe-seal
run probe-admin-mode
run probe-admin-refused
run probe-verdicts
run probe-view-select
run probe-owned-save
run probe-delete-confirm
run probe-dock-low
run probe-theme-row
run probe-login-stays
run probe-space-select
run probe-condense
run probe-tag-anchor 390 844
run probe-tag-anchor 1440 900
run probe-dock-bar 360 780
run probe-dock-bar 1440 900
