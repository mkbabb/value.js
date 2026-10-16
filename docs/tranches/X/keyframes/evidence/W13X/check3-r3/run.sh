#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 3 Check 3 runner
D=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/check3-r3; G=/Users/mkbabb/.claude/guard/guarded
cd /Users/mkbabb/Programming/keyframes.js
for r in 1 2; do (echo "# load: $(uptime)"; $G --light -- npm run check; echo EXIT=$?) > $D/kf-check-r$r.log.txt 2>&1; done
for r in 1 2; do (echo "# load: $(uptime)"; $G --light -- npm run lint; echo EXIT=$?) > $D/kf-lint-r$r.log.txt 2>&1; done
cd /Users/mkbabb/Programming/value.js
for r in 1 2; do (echo "# load: $(uptime)"; $G --light -- npx vitest run --maxWorkers=2 test/css test/v4-c1.test.ts test/parser-totality.test.ts test/v4-css-emerging.test.ts; echo EXIT=$?) > $D/vjs-css-r$r.log.txt 2>&1; done
for r in 1 2; do git show HEAD:src/css/bbnf/generated/grammar.js | npx esbuild --minify --loader=js > $D/min.js; echo "r$r $(wc -c < $D/min.js) $(gzip < $D/min.js | wc -c)"; done > $D/vjs-e6.txt; rm -f $D/min.js
cd /Users/mkbabb/Programming/keyframes.js
for r in 1 2; do (echo "# load: $(uptime)"; $G --light --timeout 30 -- npx vitest run --project demo --maxWorkers=2; echo EXIT=$?) > $D/kf-test-demo-r$r.log.txt 2>&1; done
echo DONE > $D/done.txt
