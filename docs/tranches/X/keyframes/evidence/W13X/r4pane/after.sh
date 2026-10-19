#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — r4pane: AFTER x2 once BEFORE x2 is banked (each at load < 25)
d=$(dirname "$0")
until grep -q load-end "$d/before-r2.log" 2>/dev/null; do sleep 15; done
sh "$d/run.sh" http://localhost:5894 after-r1 && sh "$d/run.sh" http://localhost:5894 after-r2
