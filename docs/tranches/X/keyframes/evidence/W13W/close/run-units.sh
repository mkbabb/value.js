#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.KF.W13W close — re-runs .p/.e/.m/.d served probes UNCHANGED at kf HEAD. Usage: sh run-units.sh <N> <base>
N=$1; B=$2; cd "$(dirname "$0")"
for cfg in "1440 900 light" "390 844 dark"; do set -- $cfg
  node ../p/probe-picker.mjs --base "$B" --w $1 --h $2 --theme $3 --tag close$N > p-run$N-$1-$3.json 2> p-run$N-$1-$3.log; echo "p $1 $3 EXIT $?"
  node ../e/gate.mjs --base "$B" --w $1 --h $2 --theme $3 > e-run$N-$1-$3.json 2> e-run$N-$1-$3.log; echo "e $1 $3 EXIT $?"
done
for v in "390 844" "844 390" "430 932" "932 430"; do set -- $v; for t in light dark; do
  node ../m/census.mjs --base "$B" --w $1 --h $2 --theme $t --out m-run$N-$1x$2-$t.json > m-run$N-$1x$2-$t.log 2>&1; echo "m $1x$2 $t EXIT $? $(head -1 m-run$N-$1x$2-$t.log)"; done; done
for cfg in "1440 900" "390 844"; do set -- $cfg; for t in light dark; do
  node ../d/probe-collapsed-dock.mjs --base "$B" --w $1 --h $2 --theme $t > dclose$N-$1-$t.json 2> dclose$N-$1-$t.log; echo "d $1 $t EXIT $?"; done; done
(cd . && node ../d/summarize.mjs dclose$N)
echo DONE
