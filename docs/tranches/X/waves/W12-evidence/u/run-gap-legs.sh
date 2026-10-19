#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.W12.u1: re-run the audit instruments' missing legs (copies; OUT = this dir).
cd "$(dirname "$0")"
node palettes-view/capture.mjs "swatchhover__1440__dark,swatchhover__390,offline__390__dark,dragmid__390__light,dock__390__light,menucolor__390__light,focus__390__light,cardhover__390__light,dupe__390__light,scrolled__1440,scrolled__390__light" > palettes-view/run.log 2>&1
for vt in "390 light" "390 dark" "1440 dark"; do node dock-color-input/capture.mjs $vt >> dock-color-input/run.log 2>&1; done
VP=1440 THEME=dark node admin-flagged/capture.mjs > admin-flagged/run-1440-dark.log 2>&1
VP=390 THEME=light node admin-flagged/capture.mjs > admin-flagged/run-390-light.log 2>&1
VP=390 THEME=dark node admin-flagged/capture.mjs > admin-flagged/run-390-dark.log 2>&1
echo ALLDONE
