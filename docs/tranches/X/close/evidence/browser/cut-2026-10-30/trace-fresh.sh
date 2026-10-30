#!/bin/bash
# SERVED MODEL: claude-opus-5-5
# X.W11.cut: trace.mjs on the lhci cell's binary and flags, one load per new browser, rate per trace.mjs (4x). Inside withserver.sh :8604.
D=docs/tranches/X/close/evidence/browser/cut-2026-10-30
for r in 1 2 3 4; do TRACE_LHCI_CELL=1 TRACE_SETTLE_MS=8000 node $D/trace.mjs http://localhost:8604 1 $D/runs/trace-fresh-$r.json > /dev/null; done
