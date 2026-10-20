#!/bin/zsh
# One guarded browser slot; the three probe scripts run SERIALLY (one browser alive at a time).
cd /Users/mkbabb/Programming/value.js/docs/tranches/X/execution/SS8/probes/B26
export APP=${APP:-http://localhost:9026/}
for s in "$@"; do echo "== $s $(date +%T)"; node ${=s}; echo "rc=$? $(date +%T)"; done
