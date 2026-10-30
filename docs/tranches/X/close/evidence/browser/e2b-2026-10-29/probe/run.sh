#!/bin/bash
# usage inside container: bash /w/run.sh <tag> <grep-or-empty> <spec files...>
set -u
cd /w/tree
export CI=1 HOME=/root
if [ ! -d node_modules ]; then npm ci --no-audit --no-fund >/w/npmci.log 2>&1 || { echo NPMCI-FAIL; tail -20 /w/npmci.log; exit 1; }; fi
if [ ! -f dist/value.js ] && [ ! -d dist ]; then npm run build >/w/build.log 2>&1; fi
tag=$1; shift; g=$1; shift
for r in 1 2; do
  if [ -n "$g" ]; then
    npx playwright test --project=smoke --workers=1 --retries=0 --reporter=json --grep "$g" "$@" > /w/out/$tag-r$r.json 2>/w/out/$tag-r$r.err
  else
    npx playwright test --project=smoke --workers=1 --retries=0 --reporter=json "$@" > /w/out/$tag-r$r.json 2>/w/out/$tag-r$r.err
  fi
  echo "$tag r$r exit $?"
done
