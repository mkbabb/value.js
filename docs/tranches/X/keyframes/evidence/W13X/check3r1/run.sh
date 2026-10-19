#!/bin/sh
# SERVED MODEL: claude-opus-5-5
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/check3r1
cd /Users/mkbabb/Programming/keyframes-wt-W13X-close || exit 9
for n in 1 2; do
  for g in check lint; do
    f=$E/$g-$n.log.txt; echo "SERVED MODEL: claude-opus-5-5" > $f; echo "HEAD $(git rev-parse --short HEAD) $(date +%H:%M:%S) $(uptime | sed 's/.*averages: //')" >> $f
    npm run $g >> $f 2>&1; echo "EXIT=$?" >> $f; date +%H:%M:%S >> $f
  done
  f=$E/lib-$n.log.txt; echo "SERVED MODEL: claude-opus-5-5" > $f; echo "HEAD $(git rev-parse --short HEAD) $(uptime | sed 's/.*averages: //')" >> $f
  npx vitest run test/group/kfa-31-*.test.ts test/group/kfa-68-*.test.ts test/group/kfa-69-*.test.ts test/engine/kfa-145-*.test.ts test/engine/kfa-70-*.test.ts test/waapi/kfa-135-*.test.ts test/waapi/kfa-28-*.test.ts test/compile/uia-kf-177-css-time.test.ts >> $f 2>&1; echo "EXIT=$?" >> $f
  f=$E/sections-$n.log.txt; echo "SERVED MODEL: claude-opus-5-5" > $f; echo "HEAD $(git rev-parse --short HEAD) $(uptime | sed 's/.*averages: //')" >> $f
  npx vitest run --project demo test/demo/scenes/sections-w13x.test.ts >> $f 2>&1; echo "EXIT=$?" >> $f
done
echo DONE > $E/done.txt
