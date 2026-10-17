# SERVED MODEL: claude-opus-5-5
# X.W12U.o5b: serve a worktree build and run boot-task-profile.mjs over it; server stopped on exit.
# Usage: sh profile-run.sh <tree> <port> <label> [sittings]
T=$1; P=$2; L=$3; N=${4:-2}
G=/Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence/o5b
cd $T && PERF_PORT=$P node e2e/smoke/perf/serve-built.mjs > /dev/null 2>&1 &
S=$!
trap 'kill $S 2>/dev/null' EXIT
i=0; until curl -sf -o /dev/null http://127.0.0.1:$P/ || [ $i -ge 50 ]; do sleep 0.2; i=$((i+1)); done
echo "load $(uptime | sed 's/.*averages: //')"
node $G/boot-task-profile.mjs http://127.0.0.1:$P $T/dist/gh-pages $L $N
