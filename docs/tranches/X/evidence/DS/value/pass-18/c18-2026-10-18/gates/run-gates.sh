#!/bin/zsh
# X-DS value pass 18 (critic V18C): typecheck x2, vitest x2, then e2e x2 — one guarded call per spec, headless, workers 1, own server pair.
cd /Users/mkbabb/Programming/value.js
G=docs/tranches/X/evidence/DS/value/pass-18/c18-2026-10-18/gates
for run in 1 2; do
  ~/.claude/guard/guarded --light --timeout 15 -- npm run -s typecheck > $G/typecheck-run$run.txt 2>&1; echo "exit $?" >> $G/typecheck-run$run.txt
  ~/.claude/guard/guarded --timeout 30 -- npx vitest run --maxWorkers=2 > $G/vitest-run$run.txt 2>&1; echo "exit $?" >> $G/vitest-run$run.txt
done
for run in 1 2; do
  out=$G/e2e-smoke-run$run.txt; : > $out
  for s in e2e/smoke/oracles/o18-contrast-census.spec.ts e2e/smoke/oracles/o15-dock-register.spec.ts e2e/smoke/w12-dock.spec.ts e2e/smoke/page-load.spec.ts e2e/smoke/oracles/o17-easing-composition.spec.ts e2e/smoke/views/gradient.spec.ts e2e/smoke/w12u-x-admin-tags.spec.ts; do
    echo "== $s" >> $out
    VJS_E2E_PORT=9482 VJS_E2E_PERF_PORT=9483 ~/.claude/guard/guarded --timeout 30 -- npx playwright test --project=smoke --workers=1 --reporter=list $s >> $out 2>&1
    echo "exit $?" >> $out
  done
  out=$G/e2e-admin-run$run.txt
  VJS_E2E_PORT=9482 VJS_E2E_PERF_PORT=9483 ~/.claude/guard/guarded --timeout 30 -- npx playwright test --project=smoke-admin --workers=1 --reporter=list > $out 2>&1
  echo "exit $?" >> $out
done
echo GATES-DONE
