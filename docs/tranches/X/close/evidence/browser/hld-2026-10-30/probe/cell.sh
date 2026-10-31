#!/bin/bash
# inside the container: one CI-config run. usage: cell.sh <tag> <playwright args...>; no --reporter, so the config's CI reporters run.
cd /w/tree; export CI=1 HOME=/root
tag=$1; shift
npx playwright test --project=smoke --workers=1 "$@" > /w/out/$tag.log 2>&1
echo "$tag exit $?" | tee -a /w/out/$tag.log
