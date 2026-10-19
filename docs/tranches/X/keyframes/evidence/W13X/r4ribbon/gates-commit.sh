#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4ribbon: check and lint ×2 on a CLEAN worktree of the commit
# (the shared tree carries X-DS's live hunks), one run at a time, each a --light guarded run.
# Usage: gates-commit.sh <worktree>
d=$(cd "$(dirname "$0")" && pwd); cd "$1" || exit 1
L() { echo "$1 load=$(sysctl -n vm.loadavg) $(date +%H:%M:%S) kf=$(git rev-parse --short HEAD) dirty=$(git status --porcelain | wc -l | tr -d ' ')" >> "$d/gates-commit.log"; }
: > "$d/gates-commit.log"
for r in 1 2; do
  L "check-r$r start"; ~/.claude/guard/guarded --light --timeout 15 -- npm run check > "$d/check-r$r.log" 2>&1; L "check-r$r EXIT $?"
  L "lint-r$r start"; ~/.claude/guard/guarded --light --timeout 10 -- npm run lint > "$d/lint-r$r.log" 2>&1; L "lint-r$r EXIT $?"
done
L DONE
