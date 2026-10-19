# SERVED MODEL: claude-opus-5-5
# X-W12U Close 8: isolated re-read (x2) of the one row that failed in one smoke batch only
# (cl8b smoke-perf o24-lcp-identity :100). usage (repo root): sh close8/reread-flakes.sh <tree>
T=${1:?tree}; O=$(pwd)/docs/tranches/X/waves/W12U-evidence/close8/smoke/reread-flakes.txt
echo "SERVED MODEL: claude-opus-5-5" > "$O"
for i in 1 2; do
  for pair in "smoke-perf|e2e/smoke/perf/o24-lcp-identity.spec.ts:100"; do
    P=${pair%%|*}; S=${pair#*|}
    echo "### $S ($P) r$i load1=$(sysctl -n vm.loadavg | awk '{print $2}')" >> "$O"
    ( cd "$T" && VJS_E2E_PORT=9171 VJS_E2E_PERF_PORT=9172 "$HOME/.claude/guard/guarded" --timeout 10 -- \
      npx playwright test "$S" --project="$P" --workers=1 --reporter=list --output="$HOME/.dev-logs/w12u-close8/out/reread" 2>&1 \
      | grep -E '✓|✘|Expected|Received|passed|failed' ) >> "$O"
  done
done
