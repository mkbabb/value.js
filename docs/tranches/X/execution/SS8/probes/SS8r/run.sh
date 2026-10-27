#!/usr/bin/env bash
# SS-8.r: run named e2e specs in a given worktree on its own port; output to evidence/SS8r/<tag>.txt
# Usage: run.sh <worktree> <tag> <playwright args...>   (launched via ~/.claude/guard/guarded)
set -u
WT=$1; TAG=$2; shift 2
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/SS8/evidence/SS8r
cd "$WT"
export VJS_E2E_PORT=${VJS_E2E_PORT:-8371} VJS_E2E_PERF_PORT=${VJS_E2E_PERF_PORT:-8372}
npx playwright test --workers=1 --reporter=list --output="$E/out-$TAG" "$@" > "$E/$TAG.txt" 2>&1
echo "exit $?" >> "$E/$TAG.txt"
