# SERVED MODEL: claude-opus-5-5
# X.W12U.o5c: serve a worktree's built dist/gh-pages on a private port and run reveal-probe.mjs over it;
# the server is stopped on exit (trap). Usage: sh reveal-run.sh <tree> <port> <label>
T=$1; P=$2; L=$3
cd $T && PERF_PORT=$P node e2e/smoke/perf/serve-built.mjs > /dev/null 2>&1 &
S=$!
trap 'kill $S 2>/dev/null' EXIT
i=0; until curl -sf -o /dev/null http://127.0.0.1:$P/ || [ $i -ge 50 ]; do sleep 0.2; i=$((i+1)); done
echo "load $(uptime | sed 's/.*averages: //')"
node /Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence/o5c/reveal-probe.mjs http://127.0.0.1:$P $L
