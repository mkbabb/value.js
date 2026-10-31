SERVED MODEL: claude-opus-5-5

# X.W11.lhb — the GPU lhci cell on the real-GPU witness binary (COHESION §0gy.6, ESC-W11cut-1 arm (b))

- `lighthouserc.gpu.json` `ci.collect.chromePath` = `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
  the binary `e2e/smoke/perf/real-gpu.ts` launches (`channel: "chrome"`); flags `--use-angle=metal --disable-field-trial-config`.
  Budgets unchanged.
- `lhci-draw.sh <label>`: one `autorun` (collect ×3 + assert) under `guarded --timeout 30 --cpu-cores 0`, gated on the
  §0gx.3 load condition (1-min load ≤ 12 at start and end; wait ≤ 60 min, else UNMEASURED-LOADED). Each row records the
  binary's full version (`--version`, from d2 on) and each LHR's `environment.hostUserAgent` (`lh-row.mjs`).
- `renderer-witness.mjs`: the WebGL renderer on the same binary and flags (one browser, one context, closed in finally).
- `runs/lhci-draws.txt`: every draw, as run. `runs/lhci-<label>.rows.jsonl`: one row per collect. `runs/lhci-<label>.log`:
  the LHCI output. `runs/gh-pages-build.log`: `npm run gh-pages` at `af4876593` (the jsdom `getContext` line is the
  prerender's standing log, present in earlier evidence, exit 0).
- The Chrome for Testing 148 stall is not read here; it stays on INBOX O-123 as that row's evidence.
