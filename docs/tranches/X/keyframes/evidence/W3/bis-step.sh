# SERVED MODEL: claude-opus-5-5 — the per-step bisect runner used by KF.W3.bis (run against the clean worktree)
# usage: step.sh <commit> ; runs in the clean detached worktree
set -u
WT=/Users/mkbabb/Programming/.kf-bis-wt
LOG=/Users/mkbabb/Programming/.kf-bis-logs
c=$1; n=${c/^/-parent}
cd $WT || exit 2
git checkout --quiet --detach "$c" || exit 3
git status --porcelain | head -5
if ! cmp -s package-lock.json $LOG/.lastlock; then
  echo "npm ci @ $c"; ~/.claude/guard/guarded --timeout 15 -- npm ci --no-audit --no-fund > $LOG/$n.npmci.txt 2>&1; echo "npm ci rc=$?"; cp package-lock.json $LOG/.lastlock
fi
rm -rf dist
echo "build @ $c"; ~/.claude/guard/guarded --timeout 15 -- npm run gh-pages > $LOG/$n.build.txt 2>&1; echo "build rc=$?"
for r in 1 2; do
  KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js ~/.claude/guard/guarded --timeout 25 -- npm run demo:correctness -- --only=live-session,live-session-mobile --timeout=600 > $LOG/$n.run$r.txt 2>&1
  echo "run$r rc=$?"
  grep -E '✗|passed:|failed:' $LOG/$n.run$r.txt | cut -c1-260
done
