#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4dock: interleaved BEFORE (:5871) / AFTER (:5872) reads x2.
# §0ev.2: readings are taken under load, the 1-minute load recorded beside each.
cd "$(dirname "$0")"
mkdir -p frames
for i in 1 2; do
  for arm in before:5871 after-dev:5872; do
    tag=${arm%%:*}-r$i; port=${arm##*:}
    fr=""; [ $i = 1 ] && fr=$PWD/frames
    echo "$tag start load $(sysctl -n vm.loadavg)"
    OUT_DIR=$PWD node r4dock.mjs http://localhost:$port/ $tag $fr > $tag.out 2>&1
    echo "$tag end load $(sysctl -n vm.loadavg) exit $?"
  done
done
echo DONE
