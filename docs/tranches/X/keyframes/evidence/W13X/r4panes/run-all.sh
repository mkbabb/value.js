#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4panes: interleaved BEFORE (:5881, pristine 2739c16d) / AFTER (:5882, the
# cure bytes) served reads x2, headless real Chrome (§0ei). §0ev.2: readings taken under load, the 1-minute load
# recorded beside each.
cd "$(dirname "$0")"
mkdir -p frames
for i in 1 2; do
  for arm in before:5881 after-dev:5882; do
    tag=${arm%%:*}-r$i; port=${arm##*:}
    fr=""; [ $i = 1 ] && fr=$PWD/frames
    echo "$tag start load $(sysctl -n vm.loadavg)"
    node r4panes.mjs http://localhost:$port/ $tag $fr > $tag.json 2> $tag.err
    echo "$tag exit $? end load $(sysctl -n vm.loadavg)"
  done
done
echo DONE
