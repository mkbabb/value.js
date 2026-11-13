#!/usr/bin/env bash
# preship.sh — the browser suites, run on the workstation before a ship.
#
# Owner order 2026-11-13: no Playwright in any GitHub Action. CI (ci.yml) runs
# install, lint, typecheck, the node/jsdom unit suite, build and the static
# checks. Everything that launches a browser runs here instead, each lane in
# its own `guarded` call (machine law: one project per call, workers=1, WebKit
# under the machine-wide webkit lock).
#
#   scripts/ci/preship.sh              # every lane, stops at the first red
#   scripts/ci/preship.sh smoke visual # only the named lanes
#
# Lanes: slate browser-unit build smoke visual boot webkit lhci
# `scripts/ci/oracle-slate.mjs` reads this file: every Playwright project must
# appear below as a `--project=` flag or the slate reds.
set -euo pipefail

cd "$(dirname "$0")/../.."
G="$HOME/.claude/guard/guarded"
PW=(npx playwright test --workers=1)

lanes=("$@")
[ ${#lanes[@]} -eq 0 ] && lanes=(slate browser-unit build smoke visual boot webkit lhci)

for lane in "${lanes[@]}"; do
    echo "── preship: $lane"
    case "$lane" in
        slate)
            "$G" --light -- node scripts/ci/oracle-slate.mjs ;;
        browser-unit)
            "$G" -- npm run test:browser-unit ;;
        build)
            "$G" -- sh -c "npm run build && npm run gh-pages" ;;
        smoke)
            "$G" --timeout 90 -- "${PW[@]}" --project=smoke
            "$G" --timeout 90 -- "${PW[@]}" --project=smoke-admin
            "$G" --timeout 90 -- "${PW[@]}" --project=smoke-mobile
            "$G" --timeout 90 -- "${PW[@]}" --project=smoke-reactivity
            "$G" --timeout 90 -- "${PW[@]}" --project=smoke-perf ;;
        visual)
            "$G" --timeout 90 -- "${PW[@]}" --project=visual ;;
        boot)
            "$G" -- node scripts/ci/boot-smoke.mjs --mode=dev
            "$G" -- node scripts/ci/boot-smoke.mjs --mode=prod-preview --build ;;
        webkit)
            "$G" --exclusive webkit --timeout 90 -- "${PW[@]}" --project=smoke-safari
            "$G" --exclusive webkit --timeout 90 -- "${PW[@]}" --project=oracles-safari ;;
        lhci)
            # The real-GPU Lighthouse cell; lighthouserc.gpu.json cites its need
            # for branded Chrome (ANGLE Metal). Needs `npm run gh-pages` first.
            "$G" -- npx --yes @lhci/cli@0.15.x autorun --config=lighthouserc.gpu.json ;;
        *)
            echo "preship: unknown lane '$lane'" >&2
            exit 2 ;;
    esac
done
echo "── preship: all lanes green"
