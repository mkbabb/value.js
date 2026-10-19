#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# route-ts-compiler — reproduce every reading of this seat, from the value.js repo root:
#   sh docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/harness/run-all.sh
# Bundles go to $TMPDIR/value-js-w7-route-ts-compiler (never into the repo); readings to ../results/.
# ARMS (harness/build.mjs):
#   retired    THE BASELINE — src/css/grammar.ts + stylesheet.ts @ 2155142b
#   stock      value.js HEAD on published bbnf-lang 0.1.4 + parse-that 0.8.2 (the bench of record's candidate)
#   proto      the seat compiler (closure kernel), value.js actions UNCHANGED (load.ts swapped at bundle time)
#   proto-pos  proto + value.js stylesheet actions on the route's two idioms (TEXT actions, POSITIONAL sequences)
#   emit-pos   proto-pos on the STAGED backend (one emitted JS function per rule)
#   proto-stockascii  proto reproducing bbnf-lang 0.1.4's non-ASCII dispatch defect — equivalence proof only
#   proto-fb3  proto with the 117 `[xX]` first-letter workarounds stripped from every /…/i — F-b-3 proof
#   proto-audit  every routing/guard decision re-checked by the slow path — soundness audit
set -e
H=$(dirname "$0")
node "$H/front-check.mjs"                      # 0.1.4 front-end on parse-that HEAD → identical AST
node "$H/build.mjs"
for a in proto proto-pos emit-pos proto-stockascii proto-fb3; do node "$H/equiv.mjs" $a | grep -v '^    '; done
for a in proto proto-pos emit-pos proto-stockascii proto-fb3; do node "$H/equiv-readers.mjs" $a | tail -1; done
node "$H/audit.mjs"
node "$H/fb3.mjs"
node "$H/modules.mjs"                          # F-b-1: browser build, @import == concatenation
node "$H/facade.mjs"                           # F-b-2 + parse-that 2.x interop
node --expose-gc "$H/bench.mjs" final 11 stock,proto,proto-pos,emit-pos
node "$H/isolated.mjs" 9 2 proto,proto-pos,emit-pos
node "$H/coldstart.mjs" 11
node "$H/compile-phases.mjs"
