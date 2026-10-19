#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q sitting 3 — admit each q-batch once under the guard, serially.
# The C batch runs first (no lock). Then W, which holds the machine-wide webkit lock.
Q=docs/tranches/X/waves/W12U-evidence/q
~/.claude/guard/guarded --timeout 100 -- sh $Q/q-batch.sh C
~/.claude/guard/guarded --timeout 120 --exclusive webkit -- sh $Q/q-batch.sh W
