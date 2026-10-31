#!/bin/bash
# SERVED MODEL: claude-opus-5-5
# X.W11.cut: the warm dock-mount trace on the gate's cell, then the new-browser load on the gate cell's binary. Inside withserver.sh :8604.
D=docs/tranches/X/close/evidence/browser/cut-2026-10-30; U=http://localhost:8604
node $D/trace.mjs $U 8 $D/runs/trace-warm.json > /dev/null
for r in 1 2 3 4; do FRESH_CHANNEL=chrome node $D/fresh-load.mjs $U 4 8000 $D/runs/fresh-chrome.jsonl chrome-4-$r; done
