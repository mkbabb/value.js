# SERVED MODEL: claude-opus-5-5
# X-W12U RESUME 7 open (copy of g2d/o5-run.sh pointing at open7/o5-mv-baseline.mjs): serve a worktree's built dist/gh-pages on a private port and read the
# O-5 GPU witness over it; the server is stopped on exit (trap).
# Usage: sh o5-run.sh <tree> <port> <label> [sittings]
T=$1; P=$2; L=$3; N=${4:-3}
G=/Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence/g2d
cd $T && PERF_PORT=$P node e2e/smoke/perf/serve-built.mjs > /dev/null 2>&1 &
S=$!
trap 'kill $S 2>/dev/null' EXIT
i=0; until curl -sf -o /dev/null http://127.0.0.1:$P/ || [ $i -ge 50 ]; do sleep 0.2; i=$((i+1)); done
echo "load $(uptime | sed 's/.*averages: //')"
node /Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence/open7/o5-mv-baseline.mjs http://127.0.0.1:$P $L $N
