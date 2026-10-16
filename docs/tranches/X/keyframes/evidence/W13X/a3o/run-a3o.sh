#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.a3o (§0fm): A3 oracle + synthetic-ghost falsifier, in a clean detached worktree.
# usage: run-a3o.sh <rev> <tag> <n> [build]   (build=1 rebuilds dist/gh-pages first)
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-open4
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/a3o
G=~/.claude/guard/guarded
cd "$WT" || exit 1
rev=$1; tag=$2; n=$3
{ echo "# $(date '+%F %T') load: $(uptime | sed 's/.*averages: //') head: $(git rev-parse --short HEAD) dirty: $(git status --porcelain -uno | wc -l | tr -d ' ')"
  if [ "$4" = 1 ]; then $G --light --timeout 10 -- npm run gh-pages 2>&1 | tail -2; fi
  $G --light --timeout 15 -- env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1 --only=live-session-mobile 2>&1; echo "EXIT=$?"
  echo "# end $(date '+%T')"; } > "$OUT/a3-$tag-r$n.log.txt"
