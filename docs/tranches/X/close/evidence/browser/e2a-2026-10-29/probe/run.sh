#!/bin/bash
# inside container: bash /w/run.sh <tag> <project> <grep-or-empty> <spec files...>
# CI-engine (mcr playwright v1.60.0-noble, Linux Chromium/SwiftShader) cell for X.W11.e2a.
set -u
cd /w/tree
export CI=1 HOME=/root
[ -f dist/value.js ] || npm run build >/w/libbuild.log 2>&1 || { echo LIBBUILD-FAIL; exit 1; }
[ -f dist/gh-pages/index.html ] || npm run gh-pages >/w/build.log 2>&1 || { echo BUILD-FAIL; tail -20 /w/build.log; exit 1; }
tag=$1; shift; proj=$1; shift; g=$1; shift
for r in 1 2; do
  if [ -n "$g" ]; then
    npx playwright test --project="$proj" --workers=1 --retries=0 --reporter=line --grep "$g" "$@" > /w/out/$tag-r$r.txt 2>&1
  else
    npx playwright test --project="$proj" --workers=1 --retries=0 --reporter=line "$@" > /w/out/$tag-r$r.txt 2>&1
  fi
  echo "$tag r$r exit $?"
done
