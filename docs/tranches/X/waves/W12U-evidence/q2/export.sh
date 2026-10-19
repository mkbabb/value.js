#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q2 — export the COMMITTED bytes of <rev> (default HEAD) to a durable
# tree under ~/.dev-logs (never /tmp, §0eo), with an APFS clone of node_modules,
# so every smoke read is a read of committed bytes, never of another writer's
# dirty paths (§0fh.3 "GREEN readings count only on committed bytes").
# usage (repo root): sh export.sh [rev]  -> prints the tree path
G="$HOME/.claude/guard/guarded --timeout 15 --"; [ -n "$Q_INNER" ] && G=""
REV=$(git rev-parse --short "${1:-HEAD}")
T=$HOME/.dev-logs/w12u-q2/tree-$REV
if [ ! -d "$T" ]; then
  # A detached git WORKTREE, not an archive: some oracles read the repo
  # (o25 `git ls-tree -r HEAD …`), which an archive export cannot answer
  # (r1 on the archived tree: "Command failed: git ls-tree"). Removed with
  # `git worktree remove --force <tree>` when the unit closes.
  mkdir -p "$(dirname "$T")"
  git worktree add --detach "$T" "$REV" > /dev/null 2>&1 || { echo "WORKTREE FAILED $T" >&2; exit 1; }
  cp -cR node_modules "$T/node_modules"
  # api/ carries its own dependency tree (the demo/test programs typecheck
  # through api/src's types — "Cannot find module 'mongodb'" without it).
  [ -d api/node_modules ] && cp -cR api/node_modules "$T/api/node_modules"
  rm -rf "$T"/node_modules/.vite "$T"/node_modules/.vite-*
  # Carry the e2e server's optimized-deps cache from the newest earlier tree
  # (same lockfile, same config): a cold cache makes vite discover deps
  # mid-test and RELOAD the page under it ("Execution context was destroyed",
  # read in r1 smoke-mobile on the first cold tree).
  PREV=$(ls -dt "$HOME"/.dev-logs/w12u-q2/tree-* 2>/dev/null | grep -v "$T" | grep -v '\.log$' | head -1)
  [ -n "$PREV" ] && for c in "$PREV"/node_modules/.vite-e2e-*; do [ -d "$c" ] && cp -cR "$c" "$T/node_modules/"; done
fi
# The demo resolves the library from its BUILT dist/ (mechanism-C, K.W2.5), and
# smoke-perf serves the built gh-pages bundle: build both from these bytes.
if [ ! -f "$T/dist/subpaths/css.js" ]; then
  (cd "$T" && $G npm run build) > "$T.build.log" 2>&1 || { echo "BUILD FAILED $T.build.log" >&2; exit 1; }
fi
if [ ! -d "$T/dist/gh-pages" ]; then
  (cd "$T" && $G npm run gh-pages) >> "$T.build.log" 2>&1 || { echo "GH-PAGES FAILED $T.build.log" >&2; exit 1; }
fi
echo "$T"
