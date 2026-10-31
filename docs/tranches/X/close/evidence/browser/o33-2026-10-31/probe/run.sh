#!/bin/bash
# SERVED MODEL: claude-opus-5-5 — X.W11.o33 (the .n2 run.sh). Inside the container: <tag> <grep-or-empty> <repeat> <spec files...>
set -u
cd /w/tree
export CI=1 HOME=/root
if [ ! -d node_modules ]; then npm ci --no-audit --no-fund >/w/npmci.log 2>&1 || { echo NPMCI-FAIL; tail -20 /w/npmci.log; exit 1; }; fi
if [ ! -d dist ]; then npm run build >/w/out/build-$(basename $PWD)-$$.log 2>&1; fi
tag=$1; shift; g=$1; shift; n=$1; shift
for r in $(seq 1 "$n"); do
  if [ -n "$g" ]; then
    npx playwright test --project=smoke --workers=1 --retries=0 --reporter=json --grep "$g" "$@" > /w/out/$tag-r$r.json 2>/w/out/$tag-r$r.err
  else
    npx playwright test --project=smoke --workers=1 --retries=0 --reporter=json "$@" > /w/out/$tag-r$r.json 2>/w/out/$tag-r$r.err
  fi
  echo "$tag r$r exit $?"
done
