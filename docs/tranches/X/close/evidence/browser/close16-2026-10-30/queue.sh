#!/bin/bash
# close16: the seat's heavy arms, one at a time, each in its own guarded call, in the clean worktree at HEAD.
G=~/.claude/guard/guarded; D=~/.dev-logs/close16; W=/Users/mkbabb/Programming/value.js/.worktrees/close16-wt
Q=$D/queue.out; say(){ echo "$(date +%H:%M:%S) $*" >> $Q; }
until grep -q A-DONE $D/a.out; do /bin/sleep 10; done
say A-seen
cd $W
for r in r1 r2; do $D/draw.sh close16-$r; say "draw $r rc=$?"; done
say "--- gpu ink cell"
C=docs/tranches/X/close/evidence/browser/ref-2026-10-30/probe/gpu.config.ts
for r in 1 2; do
  VJS_E2E_PORT=8623 VJS_E2E_PERF_PORT=8624 W12_REAL_GPU=1 $G --timeout 45 --cpu-cores 0 -- npx playwright test -c $C --project=gpu --project=gpu-renderer --grep "caption leg|0132|renderer of the cell|O-18|SS8-0440" e2e/smoke/oracles/o11-header-gates.spec.ts e2e/smoke/oracles/o33-dock-actionbar-b05.spec.ts e2e/smoke/oracles/o18-contrast-census.spec.ts e2e/smoke/ss8r-ruled-rows.spec.ts > $D/runs/gpu-ink-r$r.json 2> $D/runs/gpu-ink-r$r.err
  say "gpu-ink r$r rc=$?"
done
say "--- boot smoke"
$G --timeout 15 -- node scripts/ci/boot-smoke.mjs --mode=dev --json=$D/runs/boot-dev.json > $D/runs/boot-dev.log 2>&1; say "boot dev rc=$?"
$G --timeout 15 -- node scripts/ci/boot-smoke.mjs --mode=prod-preview --json=$D/runs/boot-prod.json > $D/runs/boot-prod.log 2>&1; say "boot prod rc=$?"
say "--- docker ink cell"
cat > $D/dk/setup.sh <<'S'
cd /w/tree; export CI=1 HOME=/root
[ -d node_modules ] || npm ci --no-audit --no-fund >/w/npmci.log 2>&1 || { echo NPMCI-FAIL; exit 1; }
[ -d dist ] || npm run build >/w/build.log 2>&1 || { echo BUILD-FAIL; exit 1; }
echo SETUP-OK
S
$G --timeout 20 -- docker run --rm --cpus 4 --memory 12g --shm-size=2g -v $D/dk:/w -w /w/tree mcr.microsoft.com/playwright:v1.60.0-noble bash /w/setup.sh > $D/dk/setup.log 2>&1; say "docker setup rc=$? $(tail -1 $D/dk/setup.log | cut -c1-40)"
$G --timeout 60 -- $D/dk/go.sh close16 "caption leg|0132|O-18|SS8-0440" 2 e2e/smoke/oracles/o11-header-gates.spec.ts e2e/smoke/oracles/o33-dock-actionbar-b05.spec.ts e2e/smoke/oracles/o18-contrast-census.spec.ts e2e/smoke/ss8r-ruled-rows.spec.ts > $D/dk/go.log 2>&1; say "docker ink rc=$?"
say "--- gpu lhci"
for r in r1 r2; do bash docs/tranches/X/close/evidence/browser/cut-2026-10-30/lhci-draw.sh close16-$r; say "lhci $r rc=$?"; done
say "--- visual"
VJS_E2E_PORT=8625 VJS_E2E_PERF_PORT=8626 $G --timeout 60 -- npx playwright test --project=visual --workers=1 --retries=0 --reporter=json > $D/runs/visual.json 2> $D/runs/visual.err; say "visual rc=$?"
say QUEUE-DONE
