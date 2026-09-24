#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.W12.u1: admin-flagged populated legs (1440-dark, 390-light, 390-dark), then dock-color-input 1440 dark.
cd "$(dirname "$0")"
VP=1440 THEME=dark node admin-flagged/capture.mjs > admin-flagged/run-1440-dark.log 2>&1
VP=390 THEME=light node admin-flagged/capture.mjs > admin-flagged/run-390-light.log 2>&1
VP=390 THEME=dark node admin-flagged/capture.mjs > admin-flagged/run-390-dark.log 2>&1
node dock-color-input/capture.mjs 1440 dark >> dock-color-input/run.log 2>&1
echo ALLDONE2
