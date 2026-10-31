#!/bin/bash
# inside the container: the tree's dependencies and build, once.
cd /w/tree; export CI=1 HOME=/root
[ -d node_modules ] || npm ci --no-audit --no-fund >/w/npmci.log 2>&1 || { echo NPMCI-FAIL; tail -20 /w/npmci.log; exit 1; }
[ -d dist ] || npm run build >/w/build.log 2>&1 || { echo BUILD-FAIL; tail -20 /w/build.log; exit 1; }
echo SETUP-OK
