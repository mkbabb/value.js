#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.KF.W13W close — re-runs .c's falsifier UNCHANGED, 1440+390 x light+dark, tag run<N>.
N=$1; BASE=$2; cd "$(dirname "$0")"
for cfg in "1440 900" "390 844"; do set -- $cfg
  for th in light dark; do
    node ../c/falsifier-ball-on-curve.mjs --base "$BASE" --w $1 --h $2 --theme $th --tag close-run$N-$1-$th > f-run$N-$1-$th.json 2> f-run$N-$1-$th.log; echo "run$N $1 $th EXIT $?"
  done
done
