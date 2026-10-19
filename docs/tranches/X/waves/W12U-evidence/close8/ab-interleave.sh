# SERVED MODEL: claude-opus-5-5
# X-W12U Close 8 (COHESION §0fw.1): the boot bar as a same-load interleaved A/B. Alternates
# the pre-cure tree (955efaa03, arm "base") and the post tree (arm "post") one sitting at a
# time, N rounds, each sitting = one o5c/o5-mv-run.sh call with 1 sitting, load recorded.
# Verdict: post mean <= base mean AND post max <= base max.
# usage (repo root): sh close8/ab-interleave.sh <baseTree> <postTree> <label> [N=6]
B=${1:?base}; P=${2:?post}; L=${3:?label}; N=${4:-6}
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence
i=1
while [ $i -le $N ]; do
  for arm in base post; do
    if [ $arm = base ]; then T=$B; PORT=8261; else T=$P; PORT=8262; fi
    OUT=$(sh $E/o5c/o5-mv-run.sh $T $PORT $L-$arm-$i 1 2>&1)
    LD=$(echo "$OUT" | sed -n 's/^load //p' | awk '{print $1}')
    BT=$(echo "$OUT" | sed -n 's/.* boot=\([0-9]*\)ms.*/\1/p' | head -1)
    REN=$(echo "$OUT" | grep -o 'ANGLE Metal' | head -1)
    echo "round $i arm=$arm load=$LD boot=${BT:-NA}ms renderer=${REN:-OTHER}"
  done
  i=$((i+1))
done
