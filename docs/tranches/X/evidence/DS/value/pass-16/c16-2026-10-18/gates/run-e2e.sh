#!/bin/zsh
# X-DS value pass 16: one guarded call per spec, headless, project smoke, workers 1, own server pair.
cd /Users/mkbabb/Programming/value.js
G=docs/tranches/X/evidence/DS/value/pass-16/c16-2026-10-18/gates
for run in 1 2; do
  out=$G/e2e-smoke-run$run.txt; : > $out
  for s in ${=$(sed 's/^smoke: //' $G/specs.txt)}; do
    echo "== $s" >> $out
    VJS_E2E_PORT=9392 VJS_E2E_PERF_PORT=9393 ~/.claude/guard/guarded --timeout 30 -- npx playwright test --project=smoke --workers=1 --reporter=list $s >> $out 2>&1
    echo "exit $?" >> $out
  done
done
echo done
