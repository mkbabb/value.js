# SERVED MODEL: claude-opus-5-5
# X.P.W8.lg1 — the node L-G1 read driver: one fresh bench.mjs process per cell (bench/paired/bench.mjs, unchanged).
#   sh bench/records/W8lg1/node-read.sh <read 1|2> <rounds> [cells "class:entry ..."]
# read 1 = arm order as declared (rev 0), read 2 = reversed (rev 1). Load (uptime) is recorded inside every cell.
cd "$(dirname "$0")/../../.." || exit 1
READ=$1; ROUNDS=$2; REV=$((READ - 1))
E="parseCssColor parseCssScalar parseCssValue parseCssValues parseKeyframeSelector parseTimingFunction parseStylesheet"
CELLS=${3:-"$(for c in acc rej; do for e in $E; do printf '%s:%s ' $c $e; done; done)large-eq:parseStylesheet"}
for ce in $CELLS; do
  c=${ce%%:*}; e=${ce#*:}
  node --expose-gc bench/paired/bench.mjs "$e" "$c" product "$ROUNDS" "$REV" "bench/records/W8lg1/node/n${ROUNDS}-read${READ}-${c}-${e}.json" || echo "FAILED $ce"
done
echo "DONE read $READ rounds $ROUNDS"
