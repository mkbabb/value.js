# SERVED MODEL: claude-opus-5-5
# X.P.W7P `.z` Z-1/Z-2 — the L-G1 bench of record re-read on the PUBLISHED pins (@mkbabb/bbnf-lang 0.2.0 exact, parse-that 2.0.0
# transitive; value.js 4038dce5a), the .lg1c3 sitting re-pointed: strictly serial, every invocation guarded; node --light,
# browser runs on the browser pool (never --light), WebKit --exclusive webkit. Load is recorded per cell.
cd "$(dirname "$0")/../../.." || exit 1
D=bench/records/W7Pz; G=~/.claude/guard/guarded
run() { log=$1; shift; { uptime; "$@"; echo "guarded exit $?"; uptime; } > "$log" 2>&1; echo "END $log $(grep 'guarded exit' "$log")"; }
run $D/node/node-read1.log $G --light --timeout 60 -- sh $D/node-read.sh 1 31
run $D/node/node-read2.log $G --light --timeout 60 -- sh $D/node-read.sh 2 31
run $D/browser/chromium-n31-main.log $G --timeout 60 -- sh $D/browser-read.sh chromium 31 acc,rej,large-eq "" main
run $D/browser/chromium-n31-eq.log $G --timeout 60 -- sh $D/browser-read.sh chromium 31 acc-eq,rej-eq "" eq
run $D/browser/webkit-n31-main.log $G --exclusive webkit --timeout 60 -- sh $D/browser-read.sh webkit 31 acc,rej,large-eq "" main
run $D/browser/webkit-n31-eq.log $G --exclusive webkit --timeout 60 -- sh $D/browser-read.sh webkit 31 acc-eq,rej-eq "" eq
run $D/browser/firefox-n31-acc.log $G --timeout 90 -- sh $D/browser-read.sh firefox 31 acc "" acc
run $D/browser/firefox-n31-rej.log $G --timeout 90 -- sh $D/browser-read.sh firefox 31 rej "" rej
run $D/browser/firefox-n31-leq.log $G --timeout 90 -- sh $D/browser-read.sh firefox 31 large-eq "" leq
run $D/browser/firefox-n31-eq.log $G --timeout 90 -- sh $D/browser-read.sh firefox 31 acc-eq,rej-eq "" eq
run $D/browser/firefox-n31-whole.log $G --timeout 90 -- sh $D/browser-read.sh firefox 31 whole parseCssScalar whole
echo ALLDONE
