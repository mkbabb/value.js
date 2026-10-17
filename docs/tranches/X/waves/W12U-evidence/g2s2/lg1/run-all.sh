# SERVED MODEL: claude-opus-5-5
# X.W12U.g2s2 — L-G1 x2 (COHESION §0ev.1 protocol 1; §0ft.1 (ii)) for every entry whose emitted bytes changed
# (entry-diff: 7 of 7), on COMMITTED bytes: run inside the detached worktree <tree> of the product commit.
# The same invocations as bench/records/W8lg1c3/run-all.sh (node reads 1 and 2; chromium, webkit, firefox reps 2),
# strictly serial, one engine at a time, every timing invocation guarded in the HEAVY pool (no --light) (WebKit via --exclusive webkit).
#   sh run-all.sh <tree> <out-dir>
T=$1; O=$2; G=~/.claude/guard/guarded
mkdir -p "$O/node" "$O/browser"; cd "$T" || exit 1
E="parseCssColor parseCssScalar parseCssValue parseCssValues parseKeyframeSelector parseTimingFunction parseStylesheet"
run() { log=$1; shift; { uptime; "$@"; echo "guarded exit $?"; uptime; } > "$log" 2>&1; echo "END $log $(grep 'guarded exit' "$log")"; }
nodeRead() { READ=$1; REV=$((READ - 1)); for c in acc rej; do for e in $E; do
  node --expose-gc bench/paired/bench.mjs "$e" "$c" product 31 "$REV" "$O/node/n31-read${READ}-${c}-${e}.json" || echo "FAILED $c:$e"; done; done
  node --expose-gc bench/paired/bench.mjs parseStylesheet large-eq product 31 "$REV" "$O/node/n31-read${READ}-large-eq-parseStylesheet.json" || echo "FAILED large-eq"; echo "DONE read $READ"; }
browserRead() { ENG=$1; CLASSES=$2; ENTRIES=$3; SUF=$4; TAG="g2s2-${ENG}-n31-${SUF}"
  PAIRED_RERUNS=0 node bench/paired/browser.mjs "$TAG" "$ENG" 2 "$CLASSES" 31 product "$ENTRIES" || { echo "FAILED $TAG"; return 1; }
  mv "bench/records/2026-09-24-x-p-w7-browser-${TAG}.json" "$O/browser/${TAG}.json"; echo "DONE $TAG"; }
run "$O/build.log" $G --light --timeout 20 -- node bench/paired/build.mjs
run "$O/node/node-read1.log" $G --timeout 60 -- sh -c "$(declare -f nodeRead); E='$E'; O='$O'; nodeRead 1"
run "$O/node/node-read2.log" $G --timeout 60 -- sh -c "$(declare -f nodeRead); E='$E'; O='$O'; nodeRead 2"
for spec in "chromium|acc,rej,large-eq||main" "chromium|acc-eq,rej-eq||eq" "webkit|acc,rej,large-eq||main" "webkit|acc-eq,rej-eq||eq" \
  "firefox|acc||acc" "firefox|rej||rej" "firefox|large-eq||leq" "firefox|acc-eq,rej-eq||eq" "firefox|whole|parseCssScalar|whole"; do
  IFS='|' read ENG CL EN SUF <<X
$spec
X
  X=""; [ "$ENG" = webkit ] && X="--exclusive webkit"; TO=60; [ "$ENG" = firefox ] && TO=90
  run "$O/browser/${ENG}-n31-${SUF}.log" $G $X --timeout $TO -- sh -c "$(declare -f browserRead); O='$O'; browserRead $ENG '$CL' '$EN' $SUF"
done
run "$O/bootstrap.log" $G --light --timeout 10 -- sh -c "node bench/paired/bootstrap.mjs --out '$O/bootstrap-gate.json' $O/node/*.json $O/browser/*.json"
echo ALLDONE
