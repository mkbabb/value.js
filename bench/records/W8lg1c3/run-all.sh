# SERVED MODEL: claude-opus-5-5
# X.P.W8.lg1c3 — the whole L-G1 x2 sitting on .ifsemi's bytes (4eaf27fbe), strictly serial, one engine at a time,
# every invocation under ~/.claude/guard/guarded (--light, as .lg1r/.lg1c2: the 3 heavy slots were held by other
# sessions at open; still RSS-capped, timed, descendants reaped); WebKit via --exclusive webkit. Same invocations as .lg1c2.
cd "$(dirname "$0")/../../.." || exit 1
D=bench/records/W8lg1c3; G=~/.claude/guard/guarded
run() { log=$1; shift; { uptime; "$@"; echo "guarded exit $?"; uptime; } > "$log" 2>&1; echo "END $log $(grep 'guarded exit' "$log")"; }
run $D/node/node-read1.log $G --light --timeout 60 -- sh $D/node-read.sh 1 31
run $D/node/node-read2.log $G --light --timeout 60 -- sh $D/node-read.sh 2 31
run $D/browser/chromium-n31-main.log $G --light --timeout 60 -- sh $D/browser-read.sh chromium 31 acc,rej,large-eq "" main
run $D/browser/chromium-n31-eq.log $G --light --timeout 60 -- sh $D/browser-read.sh chromium 31 acc-eq,rej-eq "" eq
run $D/browser/webkit-n31-main.log $G --light --exclusive webkit --timeout 60 -- sh $D/browser-read.sh webkit 31 acc,rej,large-eq "" main
run $D/browser/webkit-n31-eq.log $G --light --exclusive webkit --timeout 60 -- sh $D/browser-read.sh webkit 31 acc-eq,rej-eq "" eq
run $D/browser/firefox-n31-acc.log $G --light --timeout 90 -- sh $D/browser-read.sh firefox 31 acc "" acc
run $D/browser/firefox-n31-rej.log $G --light --timeout 90 -- sh $D/browser-read.sh firefox 31 rej "" rej
run $D/browser/firefox-n31-leq.log $G --light --timeout 90 -- sh $D/browser-read.sh firefox 31 large-eq "" leq
run $D/browser/firefox-n31-eq.log $G --light --timeout 90 -- sh $D/browser-read.sh firefox 31 acc-eq,rej-eq "" eq
run $D/browser/firefox-n31-whole.log $G --light --timeout 90 -- sh $D/browser-read.sh firefox 31 whole parseCssScalar whole
echo ALLDONE
