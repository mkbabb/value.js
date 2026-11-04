#!/bin/sh
# Run under: ~/.claude/guard/guarded --exclusive webkit --timeout 30 -- sh run.sh <outdir> <local-url>
# One node process (= one WebKit browser) per site; each process runs both cells x2 reps.
set -u
D=$(dirname "$0"); O=$1; L=$2
node "$D/probe-0ho-webkit.mjs" local "$L" "$O/local.json"
node "$D/probe-0ho-webkit.mjs" prod https://color.babb.dev/ "$O/prod.json"
