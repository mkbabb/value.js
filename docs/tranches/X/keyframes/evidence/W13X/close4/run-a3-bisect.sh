#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 3 close: attribute the A3 ghost-rail RED (live-session-mobile) — gh-pages + roster --only=live-session-mobile at each sha (diagnosis only, no cure)
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-close3
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/close4
cd "$WT" || exit 1
for sha in "$@"; do
  git checkout --quiet --detach "$sha" || exit 1
  { echo "# $(date '+%F %T') load: $(uptime | sed 's/.*averages: //') head: $(git rev-parse --short HEAD)"; ~/.claude/guard/guarded --light --timeout 10 -- npm run gh-pages 2>&1 | tail -2; ~/.claude/guard/guarded --light --timeout 15 -- env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1 --only=live-session-mobile 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T')"; } > "$OUT/a3-bisect-$sha.log.txt"
done
git checkout --quiet --detach 099a1627
echo DONE > "$OUT/a3-bisect.done"
